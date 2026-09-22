const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflowPath = path.join(root, 'src', 'workflows', 'xdx_supplier_lifecycle_agent.wf');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const nodes = workflow.specification.dataPipeline.pipelineNodes;
const byCode = Object.fromEntries(nodes.map((node) => [node.code, node]));

for (const code of [
  'READ_ACTION_ROUTER',
  'FIND_SUPPLIERS_BY_NAME',
  'FIND_SUPPLIERS_BY_NUMBER',
  'LIST_SUPPLIER_ADDRESSES',
  'LIST_SUPPLIER_SITES',
  'LIST_SUPPLIER_CONTACTS',
  'NORMALIZE_READ_RESULT',
  'SAVE_READ_STATE'
]) assert.ok(byCode[code], `missing P2 node ${code}`);

const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
const normalizer = new Function('$context', byCode.NORMALIZE_READ_RESULT.metadata.sourceCode);

function reduce(message, prior, feedback = '') {
  return reducer({
    $variables: { lifecycle: prior },
    $nodes: { HUMAN_COLLECT: { $feedbackReceived: feedback } },
    $system: { $inputMessage: message }
  });
}

function normalize(reduced, output) {
  const nodesContext = { REDUCE_LIFECYCLE: { $output: { result: reduced } } };
  const codeByAction = {
    SEARCH_NAME: 'FIND_SUPPLIERS_BY_NAME',
    SEARCH_NUMBER: 'FIND_SUPPLIERS_BY_NUMBER',
    LIST_ADDRESSES: 'LIST_SUPPLIER_ADDRESSES',
    LIST_SITES: 'LIST_SUPPLIER_SITES',
    LIST_CONTACTS: 'LIST_SUPPLIER_CONTACTS'
  };
  nodesContext[codeByAction[reduced.action]] = { $output: output };
  return normalizer({ $nodes: nodesContext });
}

function sampleState() {
  return reduce('Create a supplier named XDX Query Contract', null).state;
}

const nameSearch = reduce('find supplier Office Depot', sampleState());
assert.equal(nameSearch.action, 'SEARCH_NAME');
assert.equal(nameSearch.query.term, 'Office Depot');
assert.equal(nameSearch.query.limit, 10);
assert.equal(nameSearch.query.offset, 0);

const blocked = reduce('find supplier ACME%; q=Status=ACTIVE', sampleState());
assert.equal(blocked.action, 'PROMPT');
assert.equal(blocked.state.phase, 'VALIDATION_ERROR');
assert.match(blocked.prompt, /safe supplier name/i);

const numberSearch = reduce('find supplier number 1264', sampleState());
assert.equal(numberSearch.action, 'SEARCH_NUMBER');
assert.equal(numberSearch.query.filter, "SupplierNumber='1264'");

const supplierPage = normalize(nameSearch, {
  items: [
    { SupplierId: 101, SupplierNumber: '1264', Supplier: 'Office Depot', SupplierType: 'Supplier', BusinessRelationship: 'Spend Authorized' },
    { SupplierId: 102, SupplierNumber: '2000', Supplier: 'Office Depot East', SupplierType: 'Supplier', BusinessRelationship: 'Prospective' }
  ],
  count: 2,
  hasMore: true,
  limit: 10,
  offset: 0
});
assert.equal(supplierPage.state.phase, 'SELECT');
assert.equal(supplierPage.state.queryResults.length, 2);
assert.deepEqual(supplierPage.state.selectionKeys, ['101', '102']);
assert.match(supplierPage.prompt, /Supplier number \| Supplier \| Type \| Relationship/);
assert.match(supplierPage.prompt, /Reply select 1 or select 2/);
assert.equal(supplierPage.prompt.includes('SupplierId'), false, 'internal IDs must not be displayed');

const selected = reduce('select 2', supplierPage.state);
assert.equal(selected.action, 'PROMPT');
assert.equal(selected.state.selectedSupplier.SupplierId, 102);
assert.equal(selected.state.selectedSupplier.Supplier, 'Office Depot East');

const child = reduce('show addresses', selected.state);
assert.equal(child.action, 'LIST_ADDRESSES');
assert.equal(child.query.parentId, '102');
const addressPage = normalize(child, {
  items: [{ SupplierAddressId: 501, AddressName: 'HQ', City: 'Austin', State: 'TX', Country: 'United States' }],
  count: 1,
  hasMore: false,
  limit: 10,
  offset: 0
});
assert.equal(addressPage.state.selectedSupplier.SupplierId, 102, 'child query must preserve selected parent');
assert.match(addressPage.prompt, /Address \| City \| State \| Country/);
assert.equal(addressPage.prompt.includes('SupplierAddressId'), false);

const nextPage = reduce('next', supplierPage.state);
assert.equal(nextPage.action, 'SEARCH_NAME');
assert.equal(nextPage.query.offset, 10);

const empty = normalize(nameSearch, { items: [], count: 0, hasMore: false, limit: 10, offset: 0 });
assert.equal(empty.state.query.status, 'EMPTY');
assert.match(empty.prompt, /No suppliers matched/);
assert.notEqual(empty.state.phase, 'UNKNOWN');

assert.equal(byCode.READ_ACTION_ROUTER.outcomes.PROMPT, byCode.PROJECT_RESPONSE_TEXT.id);
assert.equal(byCode.SAVE_LIFECYCLE.outcomes.success, byCode.READ_ACTION_ROUTER.id);
assert.equal(byCode.SAVE_READ_STATE.outcomes.success, byCode.PROJECT_RESPONSE_TEXT.id);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /NORMALIZE_READ_RESULT/);
assert.match(
  byCode.LIFECYCLE_TERMINAL.inputs.find((input) => input.name === 'condition').value,
  /action !== 'PROMPT'/,
  'completed reads must return through the Ask Oracle Query terminal'
);

for (const code of ['FIND_SUPPLIERS_BY_NAME', 'FIND_SUPPLIERS_BY_NUMBER', 'LIST_SUPPLIER_ADDRESSES', 'LIST_SUPPLIER_SITES', 'LIST_SUPPLIER_CONTACTS']) {
  assert.equal(byCode[code].type, 'BO_FUNCTION');
  assert.equal(byCode[code].metadata.businessObjectCode, 'XDX_SUPPLIER_INFORMATION');
  assert.notEqual(byCode[code].metadata.processJson, false, 'BO JSON processing must remain enabled');
  assert.ok(byCode[code].outputSpecification, `${code} must carry a resolved output contract`);
}

console.log(JSON.stringify({
  ok: true,
  cases: 9,
  assertions: [
    'safe name search',
    'supplier-number filter',
    'injection-like filter rejected',
    'four-column supplier projection',
    'disambiguation',
    'selected-parent child scope',
    'paging continuity',
    'empty results distinct from errors',
    'read-only BO topology'
  ]
}, null, 2));
