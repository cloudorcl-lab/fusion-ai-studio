const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflow = JSON.parse(fs.readFileSync(path.join(root, 'src', 'workflows', 'xdx_supplier_lifecycle_agent.wf'), 'utf8'));
const bo = JSON.parse(fs.readFileSync(path.join(root, 'src', 'businessObjects', 'xdx_supplier_information.bo'), 'utf8'));
const nodes = workflow.specification.dataPipeline.pipelineNodes;
const byCode = Object.fromEntries(nodes.map((node) => [node.code, node]));
const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
const preparer = new Function('$context', byCode.PREPARE_SUPPLIER_CREATE.metadata.sourceCode);
const normalizer = new Function('$context', byCode.NORMALIZE_SUPPLIER_CREATE.metadata.sourceCode);
const verifier = new Function('$context', byCode.COMPARE_SUPPLIER_VERIFICATION.metadata.sourceCode);

function reduce(message, prior) {
  return reducer({ $variables: { lifecycle: prior }, $nodes: {}, $system: { $inputMessage: message } });
}

function prepare(reduced, duplicateOutput) {
  return preparer({
    $nodes: {
      REDUCE_LIFECYCLE: { $output: { result: reduced } },
      CHECK_SUPPLIER_DUPLICATE: duplicateOutput === undefined ? undefined : { $output: duplicateOutput }
    }
  });
}

function normalize(prepared, createOutput) {
  return normalizer({
    $nodes: {
      PREPARE_SUPPLIER_CREATE: { $output: { result: prepared } },
      CREATE_SUPPLIER: createOutput === undefined ? undefined : { $output: createOutput }
    }
  });
}

function verify(normalized, verificationOutput) {
  return verifier({
    $nodes: {
      NORMALIZE_SUPPLIER_CREATE: { $output: { result: normalized } },
      VERIFY_CREATED_SUPPLIER: verificationOutput === undefined ? undefined : { $output: verificationOutput }
    }
  });
}

const createFunction = bo.objectProperties.tools.find((tool) => tool.name === 'CreateSupplier');
const findFunction = bo.objectProperties.tools.find((tool) => tool.name === 'FindSuppliersByValidatedFilter');
assert.ok(createFunction);
assert.ok(findFunction);
assert.match(findFunction.resourcePath, /fields=[^&]*TaxOrganizationType/);
assert.equal(createFunction.bodyTemplate, '{"Supplier":"{Supplier}","BusinessRelationship":"{BusinessRelationship}","TaxOrganizationType":"{TaxOrganizationType}"}');
assert.deepEqual(createFunction.parameterDefinitions.map((parameter) => parameter.name), ['Supplier', 'BusinessRelationship', 'TaxOrganizationType']);
for (const excluded of ['SupplierId', 'SupplierNumber', 'SupplierPartyId', 'SupplierType', 'DFF', 'Attachment', 'Payment']) {
  assert.equal(createFunction.bodyTemplate.includes(excluded), false, `${excluded} must not be submitted`);
}

let reduced = reduce('prepare supplier with Supplier=XDX P4 Required Only; BusinessRelationship=Spend Authorized; TaxOrganizationType=Corporation', null);
assert.deepEqual(reduced.state.draft.requiredFields, { Supplier: 'XDX P4 Required Only', BusinessRelationship: 'Spend Authorized', TaxOrganizationType: 'Corporation' });
reduced = reduce('review', reduced.state);
assert.equal(reduced.state.phase, 'FINAL_REVIEW');
reduced = reduce('approve', reduced.state);
assert.equal(reduced.action, 'CHECK_SUPPLIER_DUPLICATE');
assert.equal(reduced.state.phase, 'APPROVED');
assert.deepEqual(reduced.state.approvedSnapshot.normalizedPayload, { Supplier: 'XDX P4 Required Only', BusinessRelationship: 'Spend Authorized', TaxOrganizationType: 'Corporation' });
assert.equal(reduced.state.operations.length, 1);
assert.equal(reduced.state.operations[0].status, 'APPROVED');
assert.deepEqual(reduced.state.operations[0].payload, { Supplier: 'XDX P4 Required Only', BusinessRelationship: 'Spend Authorized', TaxOrganizationType: 'Corporation' });

const preflightUnknown = prepare(reduced, undefined);
assert.equal(preflightUnknown.action, 'RETURN');
assert.equal(preflightUnknown.state.phase, 'UNKNOWN');
assert.equal(preflightUnknown.state.operations[0].status, 'PREFLIGHT_UNKNOWN');
assert.match(preflightUnknown.prompt, /before any create or retry/i);

const duplicate = prepare(reduced, { items: [{ Supplier: 'XDX P4 Required Only' }], count: 1, hasMore: false, limit: 2, offset: 0 });
assert.equal(duplicate.action, 'RETURN');
assert.equal(duplicate.state.phase, 'VALIDATION_ERROR');
assert.equal(duplicate.state.operations[0].status, 'DUPLICATE_BLOCKED');
assert.match(duplicate.prompt, /No create was submitted/);

const prepared = prepare(reduced, { items: [], count: 0, hasMore: false, limit: 2, offset: 0 });
assert.equal(prepared.action, 'CREATE');
assert.equal(prepared.state.phase, 'EXECUTING');
assert.equal(prepared.state.operations[0].status, 'SUBMISSION_STARTED');
assert.deepEqual(Object.keys(prepared.state.operations[0].payload), ['Supplier', 'BusinessRelationship', 'TaxOrganizationType']);

const blockedRetry = reduce('approve', prepared.state);
assert.equal(blockedRetry.terminal, true);
assert.match(blockedRetry.prompt, /reconciliation before any retry/i);
assert.equal(blockedRetry.state.operations.length, 1);

const unknown = normalize(prepared, undefined);
assert.equal(unknown.action, 'RETURN');
assert.equal(unknown.state.phase, 'UNKNOWN');
assert.equal(unknown.state.operations[0].status, 'UNKNOWN');
assert.equal(unknown.state.verification.status, 'RECONCILE_REQUIRED');

const createdOutput = {
  SupplierId: '300000999000001',
  SupplierNumber: 'XDX9001',
  Supplier: 'XDX P4 Required Only',
  SupplierPartyId: '300000999000002',
  SupplierType: 'Supplier',
  BusinessRelationship: 'Spend Authorized',
  TaxOrganizationType: 'Corporation'
};
const normalized = normalize(prepared, createdOutput);
assert.equal(normalized.action, 'VERIFY');
assert.equal(normalized.state.phase, 'VERIFYING');
assert.equal(normalized.state.operations[0].status, 'RETURNED');
assert.deepEqual(normalized.state.operations[0].responseIdentifiers, {
  SupplierId: '300000999000001',
  SupplierNumber: 'XDX9001'
});

const verificationRow = {
  SupplierId: '300000999000001',
  SupplierNumber: 'XDX9001',
  Supplier: 'XDX P4 Required Only',
  SupplierType: 'Supplier',
  BusinessRelationship: 'Spend Authorized',
  TaxOrganizationType: 'Corporation'
};
const verified = verify(normalized, { items: [verificationRow], count: 1, hasMore: false, limit: 2, offset: 0 });
assert.equal(verified.state.phase, 'COMPLETE');
assert.equal(verified.state.operations[0].status, 'VERIFIED');
assert.equal(verified.state.operations[0].verification, 'PASSED');
assert.deepEqual(verified.state.verification.checks, ['Supplier', 'BusinessRelationship', 'TaxOrganizationType', 'SupplierId', 'SupplierNumber']);
assert.match(verified.prompt, /independently verified/);
assert.match(verified.prompt, /XDX P4 Required Only/);
assert.match(verified.prompt, /XDX9001/);

const mismatch = verify(normalized, { items: [{ ...verificationRow, Supplier: 'Different Supplier' }], count: 1, hasMore: false, limit: 2, offset: 0 });
assert.equal(mismatch.state.phase, 'PARTIAL');
assert.equal(mismatch.state.operations[0].status, 'VERIFY_MISMATCH');
assert.match(mismatch.prompt, /Reconcile before continuing/);

assert.equal(byCode.READ_ACTION_ROUTER.outcomes.CHECK_SUPPLIER_DUPLICATE, byCode.CHECK_SUPPLIER_DUPLICATE.id);
assert.equal(byCode.SUPPLIER_CREATE_ROUTER.outcomes.CREATE, byCode.SAVE_EXECUTING_STATE.id);
assert.equal(byCode.SAVE_EXECUTING_STATE.outcomes.success, byCode.CREATE_SUPPLIER.id);
assert.equal(byCode.CREATE_SUPPLIER.outcomes.success, byCode.NORMALIZE_SUPPLIER_CREATE.id);
assert.equal(byCode.NORMALIZE_SUPPLIER_CREATE.outcomes.success, byCode.SAVE_CREATE_RESULT_STATE.id);
assert.equal(byCode.SAVE_CREATE_RESULT_STATE.outcomes.success, byCode.SUPPLIER_VERIFY_ROUTER.id);
assert.equal(byCode.SUPPLIER_VERIFY_ROUTER.outcomes.VERIFY, byCode.VERIFY_CREATED_SUPPLIER.id);
assert.equal(byCode.VERIFY_CREATED_SUPPLIER.outcomes.success, byCode.COMPARE_SUPPLIER_VERIFICATION.id);
assert.equal(byCode.COMPARE_SUPPLIER_VERIFICATION.outcomes.success, byCode.SAVE_VERIFIED_SUPPLIER_STATE.id);
assert.equal(byCode.CREATE_SUPPLIER.inputs.length, 3);
assert.equal(byCode.CREATE_SUPPLIER.inputs[0].name, 'Supplier');
assert.match(byCode.CREATE_SUPPLIER.inputs[0].value, /approvedSnapshot\.normalizedPayload\.Supplier/);
assert.equal(byCode.CREATE_SUPPLIER.inputs[1].name, 'BusinessRelationship');
assert.match(byCode.CREATE_SUPPLIER.inputs[1].value, /approvedSnapshot\.normalizedPayload\.BusinessRelationship/);
assert.equal(byCode.CREATE_SUPPLIER.inputs[2].name, 'TaxOrganizationType');
assert.match(byCode.CREATE_SUPPLIER.inputs[2].value, /approvedSnapshot\.normalizedPayload\.TaxOrganizationType/);
assert.equal(nodes.some((node) => node.type === 'HUMAN' || node.type === 'WAIT'), false);

console.log(JSON.stringify({
  ok: true,
  cases: 12,
  assertions: [
    'tenant-required-field-only CreateSupplier contract',
    'generated and optional fields omitted',
    'exact approval snapshot and operation ledger',
    'preflight failure blocks create',
    'duplicate match blocks create',
    'unique preflight enters EXECUTING',
    'EXECUTING state blocks repeated approval',
    'unknown POST result requires reconciliation',
    'returned generated keys are persisted before verification',
    'independent GET compares intended field and generated keys',
    'verification mismatch remains partial',
    'graph persists execution and result state before dependent calls'
  ]
}, null, 2));
