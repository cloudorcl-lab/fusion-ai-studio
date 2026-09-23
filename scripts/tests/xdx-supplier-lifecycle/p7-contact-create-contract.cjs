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
  'CHECK_CONTACT_DUPLICATE', 'PREPARE_CONTACT_CREATE', 'CONTACT_CREATE_ROUTER',
  'SAVE_CONTACT_EXECUTING_STATE', 'CREATE_SUPPLIER_CONTACT', 'NORMALIZE_CONTACT_CREATE',
  'SAVE_CONTACT_CREATE_RESULT_STATE', 'CONTACT_VERIFY_ROUTER', 'VERIFY_CREATED_CONTACT',
  'COMPARE_CONTACT_VERIFICATION', 'SAVE_VERIFIED_CONTACT_STATE'
]) assert.ok(byCode[code], `missing P7 node ${code}`);

const contactTool = bo.objectProperties.tools.find((tool) => tool.name === 'CreateSupplierContact');
assert.ok(contactTool, 'CreateSupplierContact BO function is required');
assert.deepEqual(contactTool.parameterDefinitions.map((parameter) => parameter.name).sort(), ['FirstName', 'LastName', 'Email', 'suppliers_Id'].sort());
assert.equal(contactTool.bodyTemplate, '{"FirstName":"{FirstName}","LastName":"{LastName}","Email":"{Email}"}');
for (const excluded of ['AdministrativeContactFlag', 'InactiveDate', 'SupplierContactId', 'PersonProfileId', 'UserName', 'Phone', 'DFF']) {
  assert.equal(contactTool.bodyTemplate.includes(excluded), false, `${excluded} must be excluded from the contact POST`);
}

const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
const prepareCreate = new Function('$context', byCode.PREPARE_CONTACT_CREATE.metadata.sourceCode);
const normalizeCreate = new Function('$context', byCode.NORMALIZE_CONTACT_CREATE.metadata.sourceCode);
const compareVerification = new Function('$context', byCode.COMPARE_CONTACT_VERIFICATION.metadata.sourceCode);

function reduce(message, prior) {
  return reducer({ $variables: { lifecycle: prior }, $nodes: { HUMAN_COLLECT: { $feedbackReceived: '' } }, $system: { $inputMessage: message } });
}

function approvedContact() {
  let state = reduce('create a supplier named seed', null).state;
  state.selectedSupplier = { SupplierId: '300000333814250', SupplierNumber: '1504', Supplier: 'XDX SL 20260923-011716' };
  state = reduce('prepare contact with FirstName=XDX; LastName=ContactP7; Email=xdx-contact-p7@example.invalid', state).state;
  const review = reduce('review', state);
  assert.equal(review.state.phase, 'FINAL_REVIEW');
  const approved = reduce('approve', review.state);
  assert.equal(approved.action, 'CHECK_CONTACT_DUPLICATE');
  return approved;
}

const approved = approvedContact();
assert.equal(approved.state.query.parentId, '300000333814250');
assert.equal(approved.state.query.filter, "Email='xdx-contact-p7@example.invalid'");
assert.deepEqual(approved.state.operations[0].payload, { FirstName: 'XDX', LastName: 'ContactP7', Email: 'xdx-contact-p7@example.invalid' });

function prepare(preflight, reduced = approved) {
  return prepareCreate({ $nodes: { REDUCE_LIFECYCLE: { $output: { result: reduced } }, CHECK_CONTACT_DUPLICATE: { $output: preflight } } });
}

const duplicate = prepare({ items: [{ SupplierContactId: 1 }], count: 1, hasMore: false, limit: 2, offset: 0 });
assert.equal(duplicate.action, 'RETURN');
assert.equal(duplicate.state.operations[0].status, 'DUPLICATE_BLOCKED');

const executing = prepare({ items: [], count: 0, hasMore: false, limit: 2, offset: 0 });
assert.equal(executing.action, 'CREATE');
assert.equal(executing.state.phase, 'EXECUTING');

const stale = approvedContact();
stale.state.selectedSupplier.SupplierId = '999';
const staleBlocked = prepare({ items: [], count: 0, hasMore: false, limit: 2, offset: 0 }, stale);
assert.equal(staleBlocked.action, 'RETURN');
assert.equal(staleBlocked.state.operations[0].status, 'STALE_APPROVAL_BLOCKED');

const unknown = normalizeCreate({ $nodes: { PREPARE_CONTACT_CREATE: { $output: { result: executing } }, CREATE_SUPPLIER_CONTACT: { $output: {} } } });
assert.equal(unknown.action, 'RETURN');
assert.equal(unknown.state.phase, 'UNKNOWN');

const returned = normalizeCreate({
  $nodes: {
    PREPARE_CONTACT_CREATE: { $output: { result: executing } },
    CREATE_SUPPLIER_CONTACT: { $output: { SupplierContactId: 300000333999003, PersonProfileId: 300000333999003, FirstName: 'XDX', LastName: 'ContactP7', Email: 'xdx-contact-p7@example.invalid' } }
  }
});
assert.equal(returned.action, 'VERIFY');
assert.equal(returned.state.query.filter, 'SupplierContactId=300000333999003');
assert.deepEqual(returned.state.operations[0].responseIdentifiers, { SupplierContactId: '300000333999003', PersonProfileId: '300000333999003' });

const persisted = { SupplierContactId: 300000333999003, PersonProfileId: 300000333999003, FirstName: 'XDX', LastName: 'ContactP7', Email: 'xdx-contact-p7@example.invalid', UserName: null, UserAccountStatus: null };
const verified = compareVerification({ $nodes: { NORMALIZE_CONTACT_CREATE: { $output: { result: returned } }, VERIFY_CREATED_CONTACT: { $output: { items: [persisted], count: 1, hasMore: false, limit: 2, offset: 0 } } } });
assert.equal(verified.state.phase, 'COMPLETE');
assert.deepEqual(verified.state.verification.checks, ['FirstName', 'LastName', 'Email', 'SupplierContactId', 'PersonProfileId', 'NoUserAccount']);

const accountMismatch = compareVerification({ $nodes: { NORMALIZE_CONTACT_CREATE: { $output: { result: returned } }, VERIFY_CREATED_CONTACT: { $output: { items: [{ ...persisted, UserName: 'UNEXPECTED' }], count: 1, hasMore: false, limit: 2, offset: 0 } } } });
assert.equal(accountMismatch.state.phase, 'PARTIAL');

assert.equal(byCode.READ_ACTION_ROUTER.outcomes.CHECK_CONTACT_DUPLICATE, byCode.CHECK_CONTACT_DUPLICATE.id);
assert.equal(byCode.SAVE_CONTACT_EXECUTING_STATE.outcomes.success, byCode.CREATE_SUPPLIER_CONTACT.id);
assert.equal(byCode.VERIFY_CREATED_CONTACT.outcomes.success, byCode.COMPARE_CONTACT_VERIFICATION.id);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /COMPARE_CONTACT_VERIFICATION/);
assert.equal(nodes.some((node) => node.type === 'HUMAN' || node.type === 'WAIT'), false);
for (const input of byCode.CREATE_SUPPLIER_CONTACT.inputs) assert.match(input.value, /PREPARE_CONTACT_CREATE/);
for (const input of byCode.VERIFY_CREATED_CONTACT.inputs.filter((candidate) => ['suppliers_Id', 'filter'].includes(candidate.name))) assert.match(input.value, /NORMALIZE_CONTACT_CREATE/);

console.log(JSON.stringify({
  ok: true,
  cases: 12,
  assertions: [
    'required contact identity payload', 'optional administrative/account fields excluded', 'parent-scoped exact-email preflight',
    'duplicate blocks POST', 'stale parent blocks POST', 'EXECUTING persists before POST',
    'unknown result blocks retry', 'generated contact/person keys captured', 'independent generated-ID GET',
    'exact persisted email comparison', 'unexpected account provisioning fails', 'non-suspending producer-to-consumer graph'
  ]
}, null, 2));
