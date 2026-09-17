const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.join(__dirname,'../docs/builds/xdx-supplier-information/live-post/children-1497-create');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,n+'.json'),'utf8'));
const plan=read('plan'),summary=read('summary'),parent=read('parent-before').response;
assert.equal(parent.SupplierNumber,'1497');assert.equal(String(parent.SupplierId),'300000333813822');assert.equal(parent.SupplierType,'Supplier');assert.equal(parent.SupplierTypeCode,'SUPPLIER');
const after=read('parent-after').response;
for(const k of ['SupplierId','SupplierNumber','Supplier','SupplierType','SupplierTypeCode','BusinessRelationship','TaxOrganizationType']) assert.deepEqual(after[k],parent[k],'Parent preservation: '+k);
const expected={address:['AddressName','CountryCode','AddressLine1','City','State','PostalCode','Email','AddressPurposeOrderingFlag','AddressPurposeRemitToFlag','AddressPurposeRFQOrBiddingFlag'],site:['SupplierSite','ProcurementBUId','SupplierAddressName','SitePurposePurchasingFlag','SitePurposePayFlag','SitePurposeSourcingOnlyFlag'],contact:['FirstName','LastName','Email','AdministrativeContactFlag']};
const keys={address:'SupplierAddressId',site:'SupplierSiteId',contact:'SupplierContactId'};let checked=0;
for(const [resource,fields] of Object.entries(expected)){
 const request=read(resource+'-request'),post=read(resource+'-post'),get=read(resource+'-get');
 assert.deepEqual(Object.keys(request).sort(),[...fields].sort());
 assert.equal(post.inputs.suppliers_Id,'300000333813822');assert.equal(get.inputs.suppliers_Id,'300000333813822');
 assert.equal(get.response.count,1);assert.equal(get.response.items.length,1);assert.equal(get.response.hasMore,false);
 const persisted=get.response.items[0];assert.equal(persisted[keys[resource]],post.response[keys[resource]]);assert(post.response[keys[resource]]>0);assert(!(keys[resource] in request));
 assert.equal(get.inputs.filter,keys[resource]+'='+post.response[keys[resource]]);
 for(const k of fields){assert.deepEqual(post.response[k],request[k],resource+' POST '+k);assert.deepEqual(persisted[k],request[k],resource+' GET '+k);checked++;}
 assert.deepEqual(plan.cases.find(x=>x.resource===resource).expected,request);
}
const address=read('address-get').response.items[0],site=read('site-get').response.items[0],contact=read('contact-get').response.items[0];
assert(address.AddressName.startsWith('XDX '));assert(site.SupplierSite.startsWith('XDX '));assert(contact.FirstName.startsWith('XDX '));assert(contact.LastName.startsWith('XDX '));
assert(address.AddressPartyNumber);assert.equal(site.SupplierAddressId,address.SupplierAddressId);assert.equal(site.SupplierAddressName,address.AddressName);assert.equal(site.ProcurementBUId,300000046987012);
assert(contact.PersonProfileId);assert.equal(contact.UserName,null);assert.equal(contact.UserAccountStatus,null);assert.equal(contact.AdministrativeContactFlag,false);
assert(address.Email.endsWith('@example.invalid'));assert(contact.Email.endsWith('@example.invalid'));
assert.equal(summary.status,'PASS');assert.equal(summary.created.length,3);assert.equal(checked,20);assert.equal(summary.intendedFieldsVerified,checked);
console.log('Supplier 1497 children: PASS (3 POST/GET pairs, 20 intended fields, generated IDs, parent paths, address relationship, no account provisioning)');
