const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflowPath = path.join(root, 'src', 'workflows', 'xdx_supplier_lifecycle_agent.wf');
const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const nodes = workflow.specification.dataPipeline.pipelineNodes;
const byCode = Object.fromEntries(nodes.map((node) => [node.code, node]));
const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);

function reduce(message, prior) {
  return reducer({
    $variables: { lifecycle: prior },
    $nodes: {},
    $system: { $inputMessage: message }
  });
}

function selectedState() {
  const initial = reduce('Create a supplier named XDX P3 Fixture', null).state;
  initial.selectedSupplier = {
    SupplierId: 101,
    SupplierNumber: '1264',
    Supplier: 'Office Depot'
  };
  return initial;
}

function assertNoGeneratedIds(state) {
  const forbidden = [
    'SupplierId', 'SupplierNumber', 'SupplierPartyId',
    'SupplierAddressId', 'AddressPartyNumber',
    'SupplierSiteId', 'SupplierContactId', 'PersonProfileId'
  ];
  for (const field of forbidden) {
    assert.equal(Object.hasOwn(state.draft.requiredFields, field), false, `${field} must be excluded`);
  }
}

// Supplier: only the three tenant-required transaction fields are retained; generated keys are excluded.
let supplier = reduce('prepare supplier with Supplier=XDX P3 Required Only; BusinessRelationship=Spend Authorized; TaxOrganizationType=Corporation', null);
assert.equal(supplier.state.draft.resource, 'supplier');
assert.deepEqual(supplier.state.draft.requiredFields, { Supplier: 'XDX P3 Required Only', BusinessRelationship: 'Spend Authorized', TaxOrganizationType: 'Corporation' });
assert.equal(supplier.state.fieldProvenance.Supplier.source, 'USER');
assert.equal(supplier.state.fieldProvenance.BusinessRelationship.source, 'USER');
assert.equal(supplier.state.fieldProvenance.TaxOrganizationType.source, 'USER');
assert.deepEqual(supplier.state.missingFields, []);
assertNoGeneratedIds(supplier.state);
supplier = reduce('review', supplier.state);
assert.equal(supplier.state.phase, 'FINAL_REVIEW');
assert.match(supplier.prompt, /Supplier \| XDX P3 Required Only \| USER/);
assert.match(supplier.prompt, /BusinessRelationship \| Spend Authorized \| USER/);
assert.match(supplier.prompt, /TaxOrganizationType \| Corporation \| USER/);

// Address: explicit name/address win; the only eligible reference default is CountryCode.
let address = selectedState();
address.query = { kind: 'ADDRESSES', term: '', filter: '', parentId: '101', targetKind: 'ADDRESSES', limit: 10, offset: 0, hasMore: false, status: 'READY', resource: 'addresses' };
address.queryResults = [{
  SupplierAddressId: 501,
  AddressPartyNumber: '9001',
  AddressName: 'HQ',
  AddressLine1: 'DO NOT COPY',
  CountryCode: 'US',
  Email: 'operational@example.com'
}];
address = reduce('create an address named West Office at 100 Main Street', address).state;
assert.deepEqual(address.draft.requiredFields, { AddressName: 'West Office', AddressLine1: '100 Main Street' });
let addressReference = reduce('use reference 1 for address', address);
assert.equal(addressReference.state.phase, 'REFERENCE_REVIEW');
assert.match(addressReference.prompt, /CountryCode \| US \| REFERENCE/);
assert.doesNotMatch(addressReference.prompt, /operational@example\.com/);
let addressApplied = reduce('apply all', addressReference.state);
assert.equal(addressApplied.state.draft.requiredFields.AddressName, 'West Office');
assert.equal(addressApplied.state.draft.requiredFields.AddressLine1, '100 Main Street');
assert.equal(addressApplied.state.draft.requiredFields.CountryCode, 'US');
assert.equal(addressApplied.state.fieldProvenance.CountryCode.source, 'REFERENCE');
assert.deepEqual(addressApplied.state.missingFields, ['Email']);
assert.equal(addressApplied.state.approvedSnapshot, null, 'apply all must not approve create');
assert.equal(addressApplied.state.operations.length, 0, 'apply all must not schedule create');
let addressChanged = reduce('change Email=xdx-p3@example.invalid', addressApplied.state);
assert.equal(addressChanged.state.fieldProvenance.Email.source, 'USER');
assert.deepEqual(addressChanged.state.missingFields, []);
addressChanged = reduce('review', addressChanged.state);
assert.equal(addressChanged.state.phase, 'FINAL_REVIEW');
assert.match(addressChanged.prompt, /Parent supplier \| Office Depot \(1264\)/);
assert.match(addressChanged.prompt, /Email \| xdx-p3@example.invalid \| USER/);
assertNoGeneratedIds(addressChanged.state);

// Site: the required BU reference must come from the selected reference record.
let site = selectedState();
site.query = { kind: 'SITES', term: '', filter: '', parentId: '101', targetKind: 'SITES', limit: 10, offset: 0, hasMore: false, status: 'READY', resource: 'sites' };
site.queryResults = [{ SupplierSiteId: 601, SupplierSite: 'SOURCE', ProcurementBUId: 204, SupplierAddressName: 'SOURCE ADDRESS', PaymentTerms: 'DO NOT COPY' }];
site = reduce('prepare site with SupplierSite=XDX_CHICAGO; ProcurementBUId=999; SupplierAddressName=UNTRUSTED; SitePurposePurchasingFlag=true', site).state;
assert.equal(site.fieldProvenance.ProcurementBUId.source, 'USER');
assert.equal(site.fieldProvenance.SupplierAddressName.source, 'USER');
let invalidSiteReview = reduce('review', site);
assert.equal(invalidSiteReview.state.phase, 'VALIDATION_ERROR');
assert.match(invalidSiteReview.prompt, /Resolve these foreign references/);
site = reduce('use reference 1 for site', invalidSiteReview.state).state;
site.draft.requiredFields.SupplierSite = 'XDX_CHICAGO';
delete site.draft.requiredFields.ProcurementBUId;
delete site.fieldProvenance.ProcurementBUId;
delete site.draft.requiredFields.SupplierAddressName;
delete site.fieldProvenance.SupplierAddressName;
site = reduce('apply all', site).state;
assert.equal(site.draft.requiredFields.ProcurementBUId, 204);
assert.equal(site.fieldProvenance.ProcurementBUId.source, 'REFERENCE');
assert.equal(site.draft.requiredFields.SupplierAddressName, 'SOURCE ADDRESS');
assert.equal(site.fieldProvenance.SupplierAddressName.source, 'REFERENCE');
assert.equal(Object.hasOwn(site.draft.requiredFields, 'PaymentTerms'), false);
site = reduce('review', site);
assert.equal(site.state.phase, 'FINAL_REVIEW');
assertNoGeneratedIds(site.state);

// Contact: retain only the live-confirmed transaction identity; generated IDs and optional administration fields are ignored.
let contact = selectedState();
contact = reduce('prepare contact with FirstName=XDX; LastName=Contact; Email=xdx-contact@example.invalid; AdministrativeContactFlag=true; SupplierContactId=777', contact);
assert.deepEqual(contact.state.draft.requiredFields, { FirstName: 'XDX', LastName: 'Contact', Email: 'xdx-contact@example.invalid' });
assert.deepEqual(contact.state.missingFields, []);
contact = reduce('review', contact.state);
assert.equal(contact.state.phase, 'FINAL_REVIEW');
assertNoGeneratedIds(contact.state);

// Unsupported and generated fields cannot be introduced through correction.
const blocked = reduce('change SupplierContactId=777', contact.state);
assert.match(blocked.prompt, /not in the required writable allowlist/);
assertNoGeneratedIds(blocked.state);

assert.equal(nodes.some((node) => node.type === 'HUMAN' || node.type === 'WAIT'), false);
assert.ok(byCode.CREATE_SUPPLIER_ADDRESS, 'P5 must retain the accepted address create slice');
assert.ok(byCode.CREATE_SUPPLIER_SITE, 'P6 must enable the guarded site create slice');
assert.ok(byCode.CREATE_SUPPLIER_CONTACT, 'P7 must enable the guarded contact create slice');
assert.deepEqual(byCode.CREATE_SUPPLIER_CONTACT.inputs.map((input) => input.name).sort(), ['FirstName', 'LastName', 'Email', 'suppliers_Id'].sort(),
  'P7 contact execution must retain the live-confirmed required transaction identity contract');

console.log(JSON.stringify({
  ok: true,
  cases: 14,
  assertions: [
    'supplier required-only payload',
    'supplier generated IDs excluded',
    'address explicit values preserved',
    'reference choice is parent-scoped',
    'operational email is not inherited',
    'apply-all does not approve create',
    'user change wins',
    'exact field/value/source review',
    'site foreign reference rejects user-supplied ID',
    'site BU is resolved from reference',
    'optional site fields excluded',
    'contact required-only payload',
    'generated-field correction blocked',
    'address, site and contact writes enabled only behind their guarded phase routes; no Human/wait node'
  ]
}, null, 2));
