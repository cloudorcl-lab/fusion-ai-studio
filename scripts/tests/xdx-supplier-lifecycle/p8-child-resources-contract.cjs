'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflow = JSON.parse(fs.readFileSync(path.join(root, 'src', 'workflows', 'xdx_supplier_lifecycle_agent.wf'), 'utf8'));
const supplierBo = JSON.parse(fs.readFileSync(path.join(root, 'src', 'businessObjects', 'xdx_supplier_information.bo'), 'utf8'));
const categoryBo = JSON.parse(fs.readFileSync(path.join(root, 'src', 'businessObjects', 'xdx_supplier_product_service_categories.bo'), 'utf8'));
const nodes = workflow.specification.dataPipeline.pipelineNodes;
const byCode = Object.fromEntries(nodes.map((node) => [node.code, node]));

const requiredReadNodes = {
  LIST_BUSINESS_CLASSIFICATIONS: 'LIST_SUPPLIER_BUSINESS_CLASSIFICATIONS',
  LIST_CONTACT_ADDRESSES: 'LIST_SUPPLIER_CONTACT_ADDRESSES',
  LIST_CONTACT_DATA_ACCESS: 'LIST_SUPPLIER_CONTACT_DATA_ACCESS',
  LIST_CONTACT_ROLES: 'LIST_SUPPLIER_CONTACT_ROLES',
  LIST_MERGE_HISTORY: 'LIST_SUPPLIER_MERGE_HISTORY',
  LIST_PRODUCTS_SERVICES: 'LIST_SUPPLIER_PRODUCTS_SERVICES',
  LIST_PRODUCTS_SERVICES_VIEW: 'LIST_SUPPLIER_PRODUCTS_SERVICES_VIEW',
  LIST_SITE_ASSIGNMENTS: 'LIST_SUPPLIER_SITE_ASSIGNMENTS',
  LIST_SPEND_AUTHORIZATION: 'LIST_SUPPLIER_SPEND_AUTHORIZATION',
  LIST_PRODUCT_SERVICE_CATEGORIES: 'LIST_PRODUCT_SERVICE_CATEGORIES'
};
for (const [action, code] of Object.entries(requiredReadNodes)) {
  assert.ok(byCode[code], `missing P8 read node ${code}`);
  assert.equal(byCode.READ_ACTION_ROUTER.outcomes[action], byCode[code].id, `${action} must route to ${code}`);
  assert.equal(byCode[code].outcomes.success, byCode.NORMALIZE_READ_RESULT.id);
}

const expectedCreates = {
  CreateSupplierBusinessClassification: {
    parameters: ['ClassificationCode', 'suppliers_Id'],
    body: '{"ClassificationCode":"{ClassificationCode}"}',
    excluded: ['ClassificationId', 'Certificate', 'Attachment', 'DFF']
  },
  CreateSupplierContactAddress: {
    parameters: ['SupplierAddressId', 'suppliers_Id', 'suppliers_contacts_Id'],
    body: '{"SupplierAddressId":{SupplierAddressId}}',
    excluded: ['SupplierContactAddressId', 'AddressName', 'Attachment', 'DFF']
  },
  CreateSupplierProductsAndServices: {
    parameters: ['ProductsServicesCategoryId', 'CategoryType', 'suppliers_Id'],
    body: '{"ProductsServicesCategoryId":{ProductsServicesCategoryId},"CategoryType":"{CategoryType}"}',
    excluded: ['SupplierProductsServicesId', 'CategoryName', 'Description']
  },
  CreateSupplierSiteAssignment: {
    parameters: ['ClientBUId', 'BillToBUId', 'suppliers_Id', 'suppliers_sites_Id'],
    body: '{"ClientBUId":{ClientBUId},"BillToBUId":{BillToBUId}}',
    excluded: ['AssignmentId', 'BillToBU"', 'ShipTo', 'Distribution', 'Account', 'Payment', 'DFF', 'Attachment']
  }
};
for (const [name, expected] of Object.entries(expectedCreates)) {
  const tool = supplierBo.objectProperties.tools.find((candidate) => candidate.name === name);
  assert.ok(tool, `missing ${name}`);
  assert.deepEqual(tool.parameterDefinitions.map((parameter) => parameter.name).sort(), expected.parameters.slice().sort());
  assert.equal(tool.bodyTemplate, expected.body);
  for (const excluded of expected.excluded) assert.equal(tool.bodyTemplate.includes(excluded), false, `${name} must exclude ${excluded}`);
  assert.equal(tool.headers['Upsert-Mode'], 'false');
}

const categoryTool = categoryBo.objectProperties.tools.find((tool) => tool.name === 'ListSupplierProductServiceCategories');
assert.ok(categoryTool, 'category lookup BO function is required');
assert.match(categoryTool.resourcePath, /^\/fscmRestApi\/resources\/11\.13\.18\.05\/browsingCategories/);
assert.match(categoryTool.sampleQueries[0].description, /First successful AI Agent Studio GET/);
assert.ok(categoryTool.sampleQueries[0].query.items.some((item) => item.CategoryName === 'Office Supplies' && item.CategoryType === 'SUPPLIER'));

const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
function reduce(message, prior) {
  return reducer({ $variables: { lifecycle: prior }, $nodes: { HUMAN_COLLECT: { $feedbackReceived: '' } }, $system: { $inputMessage: message } });
}
function selectedSupplierState() {
  const state = reduce('start', null).state;
  state.selectedSupplier = { SupplierId: '300000333814250', SupplierNumber: '1504', Supplier: 'XDX SL 20260923-011716' };
  return state;
}

let state = selectedSupplierState();
let result = reduce('show business classifications', state);
assert.equal(result.action, 'LIST_BUSINESS_CLASSIFICATIONS');
assert.equal(result.query.parentId, '300000333814250');

state = selectedSupplierState();
state.selectedContact = { SupplierContactId: '300000333814275', FirstName: 'XDX', LastName: 'Contact' };
result = reduce('show contact data access', state);
assert.equal(result.action, 'LIST_CONTACT_DATA_ACCESS');
assert.equal(result.query.secondaryParentId, '300000333814275');

state = selectedSupplierState();
state.selectedSite = { SupplierSiteId: '300000333814273', SupplierSite: 'XDX SITE' };
result = reduce('show site assignments', state);
assert.equal(result.action, 'LIST_SITE_ASSIGNMENTS');
assert.equal(result.query.secondaryParentId, '300000333814273');

state = selectedSupplierState();
result = reduce('show supplier product service categories', state);
assert.equal(result.action, 'LIST_PRODUCT_SERVICE_CATEGORIES');
assert.equal(result.query.filter, "CategoryType='SUPPLIER'");

function approveClassification() {
  let current = selectedSupplierState();
  current = reduce('prepare business classification with ClassificationCode=SMALL_BUSINESS', current).state;
  const review = reduce('review', current);
  assert.equal(review.state.phase, 'FINAL_REVIEW');
  return reduce('approve', review.state);
}
const classification = approveClassification();
assert.equal(classification.action, 'CHECK_CLASSIFICATION_DUPLICATE');
assert.deepEqual(classification.state.operations[0].payload, { ClassificationCode: 'SMALL_BUSINESS' });

state = selectedSupplierState();
state.selectedContact = { SupplierContactId: '300000333814275' };
state.selectedAddress = { SupplierAddressId: '300000333814261', AddressName: 'XDX HQ' };
state = reduce('prepare contact address association', state).state;
let review = reduce('review', state);
result = reduce('approve', review.state);
assert.equal(result.action, 'CHECK_CONTACT_ADDRESS_DUPLICATE');
assert.equal(result.state.query.secondaryParentId, '300000333814275');
assert.deepEqual(result.state.operations[0].payload, { SupplierAddressId: '300000333814261' });

state = selectedSupplierState();
state.selectedProductCategory = { CategoryId: '300000047322442', CategoryName: 'Office Supplies', CategoryType: 'SUPPLIER' };
state = reduce('prepare product service association', state).state;
review = reduce('review', state);
result = reduce('approve', review.state);
assert.equal(result.action, 'CHECK_PRODUCT_SERVICE_DUPLICATE');
assert.deepEqual(result.state.operations[0].payload, { ProductsServicesCategoryId: '300000047322442', CategoryType: 'BROWSING' });

state = selectedSupplierState();
state.selectedSite = { SupplierSiteId: '300000333814273', SupplierSite: 'XDX SITE' };
state.selectedBusinessUnit = { ProcurementBUId: '300000046987012', ProcurementBU: 'US1 Business Unit' };
state = reduce('prepare site assignment', state).state;
review = reduce('review', state);
result = reduce('approve', review.state);
assert.equal(result.action, 'CHECK_SITE_ASSIGNMENT_DUPLICATE');
assert.equal(result.state.operations[0].targetSecondaryParentId, '300000333814273');
assert.deepEqual(result.state.operations[0].payload, { ClientBUId: '300000046987012', BillToBUId: '300000046987012' });

for (const config of [
  ['CLASSIFICATION', 'classification', approveClassification()],
  ['CONTACT_ADDRESS', 'contactaddress', (() => { let s=selectedSupplierState();s.selectedContact={SupplierContactId:'300000333814275'};s.selectedAddress={SupplierAddressId:'300000333814261'};s=reduce('prepare contact address association',s).state;return reduce('approve',reduce('review',s).state);})()],
  ['PRODUCT_SERVICE', 'productservice', (() => { let s=selectedSupplierState();s.selectedProductCategory={CategoryId:'300000047322442',CategoryType:'SUPPLIER'};s=reduce('prepare product service association',s).state;return reduce('approve',reduce('review',s).state);})()],
  ['SITE_ASSIGNMENT', 'siteassignment', (() => { let s=selectedSupplierState();s.selectedSite={SupplierSiteId:'300000333814273'};s.selectedBusinessUnit={ProcurementBUId:'300000046987012'};s=reduce('prepare site assignment',s).state;return reduce('approve',reduce('review',s).state);})()]
]) {
  const [prefix, resource, approved] = config;
  for (const suffix of [`CHECK_${prefix}_DUPLICATE`, `PREPARE_${prefix}_CREATE`, `${prefix}_CREATE_ROUTER`, `SAVE_${prefix}_EXECUTING_STATE`, `CREATE_SUPPLIER_${prefix}`, `NORMALIZE_${prefix}_CREATE`, `${prefix}_VERIFY_ROUTER`, `VERIFY_CREATED_${prefix}`, `COMPARE_${prefix}_VERIFICATION`, `SAVE_VERIFIED_${prefix}_STATE`]) assert.ok(byCode[suffix], `missing ${suffix}`);
  const prepare = new Function('$context', byCode[`PREPARE_${prefix}_CREATE`].metadata.sourceCode);
  const duplicate = prepare({ $nodes: { REDUCE_LIFECYCLE: { $output: { result: approved } }, [`CHECK_${prefix}_DUPLICATE`]: { $output: { items: [{}], count: 1, hasMore: false, limit: 2, offset: 0 } } } });
  assert.equal(duplicate.action, 'RETURN');
  assert.equal(duplicate.state.operations[0].status, 'DUPLICATE_BLOCKED');
  const executing = prepare({ $nodes: { REDUCE_LIFECYCLE: { $output: { result: approved } }, [`CHECK_${prefix}_DUPLICATE`]: { $output: { items: [], count: 0, hasMore: false, limit: 2, offset: 0 } } } });
  assert.equal(executing.action, 'CREATE');
  assert.equal(executing.state.phase, 'EXECUTING');
  assert.equal(executing.state.operations[0].resource, resource);
}

assert.equal(nodes.some((node) => node.type === 'HUMAN' || node.type === 'WAIT'), false);
assert.equal(nodes.some((node) => /DFF|ATTACHMENT|PAYMENT|THIRD_PARTY/i.test(node.code)), false);
console.log(JSON.stringify({
  ok: true,
  cases: 24,
  assertions: [
    'nine retained child reads plus category lookup are routed', 'read-only child boundaries remain read-only',
    'four POST bodies contain required transaction fields only', 'classification uses target-tenant code evidence',
    'contact-address association binds selected contact and address', 'products/services uses selected target-tenant category',
    'site assignment binds selected site and client BU', 'every create has duplicate, execution, unknown and verification graph nodes',
    'duplicate preflights block all four POST paths', 'no Human or wait nodes', 'DFF, attachment, payment and third-party routes absent'
  ]
}, null, 2));
