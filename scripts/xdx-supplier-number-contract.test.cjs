const fs = require('fs');
const assert = require('node:assert/strict');
const nodes = JSON.parse(fs.readFileSync('src/workflows/xdx_supplier_core_20260924.wf')).specification.dataPipeline.pipelineNodes;
const id = '300000333814409';
function context(prompt, intent, candidate = '1506') {
  return {$app: {$OraMessageHint: 'Query'}, $system: {$inputMessage: prompt},
    $variables: {readState: {selectedSupplierId: id, view: {
      columns: ['SupplierId', 'SupplierNumber', 'Supplier'],
      rows: [[Number(id), '1506', 'XDX Core Supplier 20260924 2130']]
    }}}, $nodes: {EXTRACT_READ: {$output: {intent, supplierId: candidate, limit: 5, offset: 0}}}};
}
function run(code, c) {
  return new Function('$context', nodes.find(n => n.code === code).metadata.sourceCode)(structuredClone(c));
}
assert.equal(run('PREPARE_READ', context('Show details for supplier 1506', 'detail')).supplierId, id);
for (const [resource, plural] of [['address', 'addresses'], ['site', 'sites'], ['contact', 'contacts']]) {
  const code = 'PREPARE_' + resource.toUpperCase();
  const c = context('Show ' + plural + ' for supplier 1506', 'list_' + resource);
  c.$variables[resource + 'State'] = {read: {parentId: '999'}, tx: {status: 'draft', payload: {Email: 'preserved@example.invalid'}}};
  const result = run(code, c);
  assert.equal(result.route, 'parent');
  assert.equal(result.parentId, id, 'Number must override an unrelated old child selection');
  assert.equal(result.state.tx.payload.Email, 'preserved@example.invalid');
  c.$system.$inputMessage = 'Show ' + plural + ' for supplier number 999999';
  assert.equal(run(code, c).route, 'display', 'Unresolved number must never become a REST parent key');
}
const explicit = context('Show details for supplier ID ' + id, 'detail', id);
assert.equal(run('PREPARE_READ', explicit).supplierId, id);
const unknown = context('Show details for supplier 999999', 'detail', '999999');
assert.ok(run('PREPARE_READ', unknown).error);
assert.equal(run('PREPARE_READ', unknown).supplierId, '');
const missing = context('Show details for supplier 1506', 'detail');
missing.$variables.readState = {};
assert.ok(run('PREPARE_READ', missing).error);
const ambiguous = context('Show details for supplier 1506', 'detail');
ambiguous.$variables.readState.view.rows.push([123, '1506', 'Conflicting result']);
assert.match(run('PREPARE_READ', ambiguous).error, /ambiguous/);
const selected = context('Show selected supplier details', 'detail', '');
assert.equal(run('PREPARE_READ', selected).supplierId, id);
for (const [fetch, producer, field] of [
  ['FETCH_SUPPLIER_DETAIL', 'PREPARE_READ', 'supplierId'],
  ['FETCH_ADDRESS_PARENT', 'PREPARE_ADDRESS', 'parentId'],
  ['FETCH_SITE_PARENT', 'PREPARE_SITE', 'parentId'],
  ['FETCH_CONTACT_PARENT', 'PREPARE_CONTACT', 'parentId']
]) {
  const binding = nodes.find(n => n.code === fetch).inputs.find(i => i.name === 'suppliers_Id');
  assert.equal(binding.value, '{{$context.$nodes.' + producer + '.$output.result.' + field + '}}');
}
console.log('PASS: exact manual prompts resolve supplier number to verified ID; all three child routes, explicit ID, selected detail, unknown and ambiguous references protected.');
