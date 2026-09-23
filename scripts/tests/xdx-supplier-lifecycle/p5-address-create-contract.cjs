'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflow = JSON.parse(fs.readFileSync(path.join(root, 'src', 'workflows', 'xdx_supplier_lifecycle_agent.wf'), 'utf8'));
const bo = JSON.parse(fs.readFileSync(path.join(root, 'src', 'businessObjects', 'xdx_supplier_information.bo'), 'utf8'));
const nodes = workflow.specification.dataPipeline.pipelineNodes;
const byCode = Object.fromEntries(nodes.map((node) => [node.code, node]));

for (const code of [
  'CHECK_ADDRESS_DUPLICATE', 'PREPARE_ADDRESS_CREATE', 'ADDRESS_CREATE_ROUTER',
  'SAVE_ADDRESS_EXECUTING_STATE', 'CREATE_SUPPLIER_ADDRESS', 'NORMALIZE_ADDRESS_CREATE',
  'SAVE_ADDRESS_CREATE_RESULT_STATE', 'ADDRESS_VERIFY_ROUTER', 'VERIFY_CREATED_ADDRESS',
  'COMPARE_ADDRESS_VERIFICATION', 'SAVE_VERIFIED_ADDRESS_STATE'
]) assert.ok(byCode[code], `missing P5 node ${code}`);

const addressTool = bo.objectProperties.tools.find((tool) => tool.name === 'CreateSupplierAddress');
assert.ok(addressTool, 'CreateSupplierAddress BO function is required');
assert.deepEqual(
  addressTool.parameterDefinitions.map((parameter) => parameter.name).sort(),
  ['AddressLine1', 'AddressName', 'CountryCode', 'Email', 'suppliers_Id'].sort()
);
assert.deepEqual(JSON.parse(addressTool.bodyTemplate), {
  AddressName: '{AddressName}',
  AddressLine1: '{AddressLine1}',
  CountryCode: '{CountryCode}',
  Email: '{Email}',
  AddressPurposeOrderingFlag: true
});
for (const excluded of ['City', 'State', 'PostalCode', 'AddressPurposeRemitToFlag', 'AddressPurposeRFQOrBiddingFlag', 'SupplierAddressId', 'AddressPartyNumber']) {
  assert.equal(addressTool.bodyTemplate.includes(excluded), false, `${excluded} must be excluded from the address POST`);
}

const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
const prepareCreate = new Function('$context', byCode.PREPARE_ADDRESS_CREATE.metadata.sourceCode);
const normalizeCreate = new Function('$context', byCode.NORMALIZE_ADDRESS_CREATE.metadata.sourceCode);
const compareVerification = new Function('$context', byCode.COMPARE_ADDRESS_VERIFICATION.metadata.sourceCode);

function reduce(message, prior) {
  return reducer({
    $variables: { lifecycle: prior },
    $nodes: { HUMAN_COLLECT: { $feedbackReceived: '' } },
    $system: { $inputMessage: message }
  });
}

function approvedAddress() {
  let state = reduce('create a supplier named seed', null).state;
  state.selectedSupplier = { SupplierId: '300000333814250', SupplierNumber: '1504', Supplier: 'XDX SL 20260923-011716' };
  state = reduce('prepare address with AddressName=XDX HQ 20260923; AddressLine1=100 Main St; CountryCode=US; Email=xdx-address@example.invalid', state).state;
  const review = reduce('review', state);
  assert.equal(review.state.phase, 'FINAL_REVIEW');
  const approved = reduce('approve', review.state);
  assert.equal(approved.action, 'CHECK_ADDRESS_DUPLICATE');
  return approved;
}

const approved = approvedAddress();
assert.equal(approved.state.query.parentId, '300000333814250');
assert.equal(approved.state.query.filter, "AddressName='XDX HQ 20260923'");
assert.deepEqual(approved.state.operations[0].payload, {
  AddressName: 'XDX HQ 20260923',
  AddressLine1: '100 Main St',
  CountryCode: 'US',
  Email: 'xdx-address@example.invalid'
});

function prepare(preflight, reduced = approved) {
  return prepareCreate({
    $nodes: {
      REDUCE_LIFECYCLE: { $output: { result: reduced } },
      CHECK_ADDRESS_DUPLICATE: { $output: preflight }
    }
  });
}

const duplicate = prepare({ items: [{ SupplierAddressId: 1 }], count: 1, hasMore: false, limit: 2, offset: 0 });
assert.equal(duplicate.action, 'RETURN');
assert.equal(duplicate.state.operations[0].status, 'DUPLICATE_BLOCKED');

const executing = prepare({ items: [], count: 0, hasMore: false, limit: 2, offset: 0 });
assert.equal(executing.action, 'CREATE');
assert.equal(executing.state.phase, 'EXECUTING');
assert.equal(executing.state.operations[0].status, 'SUBMISSION_STARTED');

const stale = approvedAddress();
stale.state.selectedSupplier.SupplierId = '999';
const staleBlocked = prepare({ items: [], count: 0, hasMore: false, limit: 2, offset: 0 }, stale);
assert.equal(staleBlocked.action, 'RETURN');
assert.equal(staleBlocked.state.operations[0].status, 'STALE_APPROVAL_BLOCKED');

const unknown = normalizeCreate({
  $nodes: {
    PREPARE_ADDRESS_CREATE: { $output: { result: executing } },
    CREATE_SUPPLIER_ADDRESS: { $output: {} }
  }
});
assert.equal(unknown.action, 'RETURN');
assert.equal(unknown.state.phase, 'UNKNOWN');
assert.equal(unknown.state.operations[0].responseIdentifiers, null);

const returned = normalizeCreate({
  $nodes: {
    PREPARE_ADDRESS_CREATE: { $output: { result: executing } },
    CREATE_SUPPLIER_ADDRESS: { $output: {
      SupplierAddressId: 300000333999001,
      AddressPartyNumber: '900001',
      AddressName: 'XDX HQ 20260923'
    } }
  }
});
assert.equal(returned.action, 'VERIFY');
assert.equal(returned.state.phase, 'VERIFYING');
assert.equal(returned.state.query.filter, 'SupplierAddressId=300000333999001');

const persisted = {
  SupplierAddressId: 300000333999001,
  AddressPartyNumber: '900001',
  AddressName: 'XDX HQ 20260923',
  AddressLine1: '100 Main St',
  CountryCode: 'US',
  Email: 'xdx-address@example.invalid'
};
const verified = compareVerification({
  $nodes: {
    NORMALIZE_ADDRESS_CREATE: { $output: { result: returned } },
    VERIFY_CREATED_ADDRESS: { $output: { items: [persisted], count: 1, hasMore: false, limit: 2, offset: 0 } }
  }
});
assert.equal(verified.state.phase, 'COMPLETE');
assert.equal(verified.state.operations[0].status, 'VERIFIED');
assert.deepEqual(verified.state.verification.checks, ['AddressName', 'AddressLine1', 'CountryCode', 'Email', 'SupplierAddressId', 'AddressPartyNumber']);

const mismatch = compareVerification({
  $nodes: {
    NORMALIZE_ADDRESS_CREATE: { $output: { result: returned } },
    VERIFY_CREATED_ADDRESS: { $output: { items: [{ ...persisted, Email: '' }], count: 1, hasMore: false, limit: 2, offset: 0 } }
  }
});
assert.equal(mismatch.state.phase, 'PARTIAL');
assert.equal(mismatch.state.operations[0].status, 'VERIFY_MISMATCH');

assert.equal(byCode.READ_ACTION_ROUTER.outcomes.CHECK_ADDRESS_DUPLICATE, byCode.CHECK_ADDRESS_DUPLICATE.id);
assert.equal(byCode.SAVE_ADDRESS_EXECUTING_STATE.outcomes.success, byCode.CREATE_SUPPLIER_ADDRESS.id);
assert.equal(byCode.SAVE_ADDRESS_CREATE_RESULT_STATE.outcomes.success, byCode.ADDRESS_VERIFY_ROUTER.id);
assert.equal(byCode.VERIFY_CREATED_ADDRESS.outcomes.success, byCode.COMPARE_ADDRESS_VERIFICATION.id);
assert.equal(byCode.SAVE_VERIFIED_ADDRESS_STATE.outcomes.success, byCode.PROJECT_RESPONSE_TEXT.id);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /COMPARE_ADDRESS_VERIFICATION/);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /NORMALIZE_ADDRESS_CREATE/);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /PREPARE_ADDRESS_CREATE/);
assert.equal(nodes.some((node) => node.type === 'HUMAN' || node.type === 'WAIT'), false);

for (const input of byCode.CREATE_SUPPLIER_ADDRESS.inputs) {
  assert.match(input.value, /PREPARE_ADDRESS_CREATE/, `${input.name} must bind the guarded prepared state`);
}
for (const input of byCode.VERIFY_CREATED_ADDRESS.inputs.filter((candidate) => ['suppliers_Id', 'filter'].includes(candidate.name))) {
  assert.match(input.value, /NORMALIZE_ADDRESS_CREATE/, `${input.name} must bind the post-result verification state`);
}

console.log(JSON.stringify({
  ok: true,
  cases: 12,
  assertions: [
    'required-transaction-field-only BO payload including minimum ordering purpose',
    'optional, generated, other-purpose and payment-adjacent fields excluded',
    'approval binds exact payload and supplier parent',
    'parent-scoped duplicate preflight',
    'duplicate blocks POST',
    'stale parent blocks POST',
    'EXECUTING persists before POST',
    'unknown result blocks retry',
    'generated address keys captured before GET',
    'independent parent-scoped GET compares all intended fields',
    'mismatch remains partial',
    'non-suspending producer-to-consumer graph'
  ]
}, null, 2));
