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
  'LIST_PROCUREMENT_BUS', 'CHECK_SITE_DUPLICATE', 'PREPARE_SITE_CREATE', 'SITE_CREATE_ROUTER',
  'SAVE_SITE_EXECUTING_STATE', 'CREATE_SUPPLIER_SITE', 'NORMALIZE_SITE_CREATE',
  'SAVE_SITE_CREATE_RESULT_STATE', 'SITE_VERIFY_ROUTER', 'VERIFY_CREATED_SITE',
  'COMPARE_SITE_VERIFICATION', 'SAVE_VERIFIED_SITE_STATE'
]) assert.ok(byCode[code], `missing P6 node ${code}`);

const siteTool = bo.objectProperties.tools.find((tool) => tool.name === 'CreateSupplierSite');
assert.ok(siteTool, 'CreateSupplierSite BO function is required');
assert.deepEqual(
  siteTool.parameterDefinitions.map((parameter) => parameter.name).sort(),
  ['ProcurementBUId', 'SitePurposePurchasingFlag', 'SupplierAddressName', 'SupplierSite', 'suppliers_Id'].sort()
);
assert.equal(
  siteTool.bodyTemplate,
  '{"SupplierSite":"{SupplierSite}","ProcurementBUId":{ProcurementBUId},"SupplierAddressName":"{SupplierAddressName}","SitePurposePurchasingFlag":{SitePurposePurchasingFlag}}'
);
for (const excluded of ['SitePurposePayFlag', 'SitePurposeSourcingOnlyFlag', 'PaymentTermsId', 'SupplierSiteId', 'DFF']) {
  assert.equal(siteTool.bodyTemplate.includes(excluded), false, `${excluded} must be excluded from the site POST`);
}

const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
const prepareCreate = new Function('$context', byCode.PREPARE_SITE_CREATE.metadata.sourceCode);
const normalizeCreate = new Function('$context', byCode.NORMALIZE_SITE_CREATE.metadata.sourceCode);
const compareVerification = new Function('$context', byCode.COMPARE_SITE_VERIFICATION.metadata.sourceCode);

function reduce(message, prior) {
  return reducer({
    $variables: { lifecycle: prior },
    $nodes: { HUMAN_COLLECT: { $feedbackReceived: '' } },
    $system: { $inputMessage: message }
  });
}

function approvedSite() {
  let state = reduce('create a supplier named seed', null).state;
  state.selectedSupplier = { SupplierId: '300000333814250', SupplierNumber: '1504', Supplier: 'XDX SL 20260923-011716' };
  state = reduce('prepare site with SupplierSite=XDX SITE 20260923; ProcurementBUId=300000046987012; SupplierAddressName=XDX HQ 20260923-022800; SitePurposePurchasingFlag=true', state).state;
  state.fieldProvenance.ProcurementBUId = { source: 'REFERENCE' };
  state.fieldProvenance.SupplierAddressName = { source: 'REFERENCE' };
  const review = reduce('review', state);
  assert.equal(review.state.phase, 'FINAL_REVIEW');
  const approved = reduce('approve', review.state);
  assert.equal(approved.action, 'CHECK_SITE_DUPLICATE');
  return approved;
}

const approved = approvedSite();
assert.equal(approved.state.query.parentId, '300000333814250');
assert.equal(approved.state.query.filter, "SupplierSite='XDX SITE 20260923'");
assert.deepEqual(approved.state.operations[0].payload, {
  SupplierSite: 'XDX SITE 20260923',
  ProcurementBUId: '300000046987012',
  SupplierAddressName: 'XDX HQ 20260923-022800',
  SitePurposePurchasingFlag: 'true'
});

function prepare(preflight, reduced = approved) {
  return prepareCreate({
    $nodes: {
      REDUCE_LIFECYCLE: { $output: { result: reduced } },
      CHECK_SITE_DUPLICATE: { $output: preflight }
    }
  });
}

const duplicate = prepare({ items: [{ SupplierSiteId: 1 }], count: 1, hasMore: false, limit: 2, offset: 0 });
assert.equal(duplicate.action, 'RETURN');
assert.equal(duplicate.state.operations[0].status, 'DUPLICATE_BLOCKED');

const executing = prepare({ items: [], count: 0, hasMore: false, limit: 2, offset: 0 });
assert.equal(executing.action, 'CREATE');
assert.equal(executing.state.phase, 'EXECUTING');

const stale = approvedSite();
stale.state.selectedSupplier.SupplierId = '999';
const staleBlocked = prepare({ items: [], count: 0, hasMore: false, limit: 2, offset: 0 }, stale);
assert.equal(staleBlocked.action, 'RETURN');
assert.equal(staleBlocked.state.operations[0].status, 'STALE_APPROVAL_BLOCKED');

const unknown = normalizeCreate({
  $nodes: {
    PREPARE_SITE_CREATE: { $output: { result: executing } },
    CREATE_SUPPLIER_SITE: { $output: {} }
  }
});
assert.equal(unknown.action, 'RETURN');
assert.equal(unknown.state.phase, 'UNKNOWN');

const returned = normalizeCreate({
  $nodes: {
    PREPARE_SITE_CREATE: { $output: { result: executing } },
    CREATE_SUPPLIER_SITE: { $output: {
      SupplierSiteId: 300000333999002,
      SupplierSite: 'XDX SITE 20260923'
    } }
  }
});
assert.equal(returned.action, 'VERIFY');
assert.equal(returned.state.query.filter, 'SupplierSiteId=300000333999002');

const persisted = {
  SupplierSiteId: 300000333999002,
  SupplierSite: 'XDX SITE 20260923',
  ProcurementBUId: 300000046987012,
  SupplierAddressName: 'XDX HQ 20260923-022800',
  SitePurposePurchasingFlag: true
};
const verified = compareVerification({
  $nodes: {
    NORMALIZE_SITE_CREATE: { $output: { result: returned } },
    VERIFY_CREATED_SITE: { $output: { items: [persisted], count: 1, hasMore: false, limit: 2, offset: 0 } }
  }
});
assert.equal(verified.state.phase, 'COMPLETE');
assert.equal(verified.state.operations[0].status, 'VERIFIED');
assert.deepEqual(verified.state.verification.checks, ['SupplierSite', 'ProcurementBUId', 'SupplierAddressName', 'SitePurposePurchasingFlag', 'SupplierSiteId']);

const mismatch = compareVerification({
  $nodes: {
    NORMALIZE_SITE_CREATE: { $output: { result: returned } },
    VERIFY_CREATED_SITE: { $output: { items: [{ ...persisted, SupplierAddressName: 'wrong' }], count: 1, hasMore: false, limit: 2, offset: 0 } }
  }
});
assert.equal(mismatch.state.phase, 'PARTIAL');

assert.equal(byCode.READ_ACTION_ROUTER.outcomes.LIST_PROCUREMENT_BUS, byCode.LIST_PROCUREMENT_BUS.id);
assert.equal(byCode.READ_ACTION_ROUTER.outcomes.CHECK_SITE_DUPLICATE, byCode.CHECK_SITE_DUPLICATE.id);
assert.equal(byCode.SAVE_SITE_EXECUTING_STATE.outcomes.success, byCode.CREATE_SUPPLIER_SITE.id);
assert.equal(byCode.VERIFY_CREATED_SITE.outcomes.success, byCode.COMPARE_SITE_VERIFICATION.id);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /COMPARE_SITE_VERIFICATION/);
assert.equal(nodes.some((node) => node.type === 'HUMAN' || node.type === 'WAIT'), false);

for (const input of byCode.CREATE_SUPPLIER_SITE.inputs) {
  assert.match(input.value, /PREPARE_SITE_CREATE/, `${input.name} must bind the guarded prepared state`);
}
for (const input of byCode.VERIFY_CREATED_SITE.inputs.filter((candidate) => ['suppliers_Id', 'filter'].includes(candidate.name))) {
  assert.match(input.value, /NORMALIZE_SITE_CREATE/, `${input.name} must bind the post-result verification state`);
}

console.log(JSON.stringify({
  ok: true,
  cases: 12,
  assertions: [
    'required business site payload excludes payment fields',
    'BU and address provenance required',
    'parent-scoped duplicate preflight',
    'duplicate blocks POST',
    'stale parent blocks POST',
    'EXECUTING persists before POST',
    'unknown result blocks retry',
    'generated site key captured',
    'independent generated-ID GET',
    'exact persisted relationship comparison',
    'mismatch remains partial',
    'non-suspending producer-to-consumer graph'
  ]
}, null, 2));
