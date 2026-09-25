const assert=require('node:assert/strict'),fs=require('fs');
const nodes=JSON.parse(fs.readFileSync('src/workflows/xdx_supplier_core_20260924.wf')).specification.dataPipeline.pipelineNodes;
const run=(code,ctx)=>new Function('$context',nodes.find(n=>n.code===code).metadata.sourceCode)(ctx);
const payload={FirstName:'XDX',LastName:'Core "Quote" \\ Contact',Email:'xdx-contact@example.invalid'};
function ctx(message,intent,patch={},state={},supplierId=''){return {$app:{$OraMessageHint:'Query'},$system:{$inputMessage:message},$workflow:{$jobId:'contact-request'},$variables:{contactState:structuredClone(state),readState:{}},$nodes:{EXTRACT_READ:{$output:{intent,contactPatch:patch,supplierId,limit:2,offset:0}}}};}
let c=ctx('prepare contact','prepare_contact',payload,{},'300000333814409'),result=run('PREPARE_CONTACT',c),s=result.state;
assert.equal(result.route,'parent');assert.equal(result.operation,'draft');
c.$variables.contactState=s;c.$nodes.PREPARE_CONTACT={$output:{result}};c.$nodes.FETCH_CONTACT_PARENT={$output:{SupplierId:'99',Supplier:'Wrong'}};
assert.equal(run('CHECK_CONTACT_PARENT',c).operation,'display');
c.$nodes.FETCH_CONTACT_PARENT.$output={SupplierId:'300000333814409',Supplier:'XDX Parent'};s=run('CHECK_CONTACT_PARENT',c).state;
assert.equal(s.tx.parentName,'XDX Parent');assert(s.widget.includes('Required fields supplied.'));
for(const Email of ['has space@example.invalid','double@@example.invalid','no-domain']){const bad=structuredClone(s);bad.tx.payload.Email=Email;assert(run('PREPARE_CONTACT',ctx('review contact','review_contact',{},bad)).state.widget.includes('valid contact email'));}
for(const field of ['FirstName','LastName','Email']){const bad=structuredClone(s);delete bad.tx.payload[field];assert(run('PREPARE_CONTACT',ctx('review contact','review_contact',{},bad)).state.widget.includes('Required: '+field));}
assert(run('PREPARE_CONTACT',ctx('edit contact','edit_contact',{UserName:'forbidden'},s)).state.widget.includes('unsupported field'));
result=run('PREPARE_CONTACT',ctx('edit last name','edit_contact',{LastName:'XDX Revised'},s));s=result.state;assert.equal(s.tx.revision,2);assert.equal(s.tx.payload.Email,payload.Email);assert.equal(s.tx.payload.FirstName,'XDX');
assert.equal(run('PREPARE_CONTACT',ctx('approve contact contact-request revision 2','approve_contact',{},s)).state.tx.approval,null);
s=run('PREPARE_CONTACT',ctx('review contact','review_contact',{},s)).state;
s=run('PREPARE_CONTACT',ctx('approve contact contact-request revision 2','approve_contact',{},s)).state;assert(s.tx.approval);
const cancelled=run('PREPARE_CONTACT',ctx('cancel contact','cancel_contact',{},s)).state;assert.equal(cancelled.tx.status,'cancelled');assert.equal(cancelled.tx.approval,null);
const changed=run('PREPARE_CONTACT',ctx('change parent','edit_contact',{},s,'300000333814410'));assert.equal(changed.state.tx.approval,null);assert.equal(changed.route,'parent');assert.equal(changed.state.tx.parentName,'');
assert.equal(run('PREPARE_CONTACT',ctx('create contact contact-request revision 1','create_contact',{},s)).route,'display');
result=run('PREPARE_CONTACT',ctx('create contact contact-request revision 2','create_contact',{},s));assert.equal(result.route,'parent');assert.equal(result.operation,'preflight');
c=ctx('','',{},s);assert.equal(run('CONTACT_DUPLICATE_INPUT',c).q,"Email='xdx-contact@example.invalid'");
c.$nodes.CHECK_CONTACT_DUPLICATE={$output:{items:[{SupplierContactId:'77',Email:payload.Email}],count:1,hasMore:false,offset:0}};assert.equal(run('AUTHORIZE_CONTACT_WRITE',c).next,'display');
c.$nodes.CHECK_CONTACT_DUPLICATE.$output={items:[],count:0,hasMore:false,offset:0};result=run('AUTHORIZE_CONTACT_WRITE',c);assert.equal(result.next,'write');assert.equal(result.state.tx.status,'pending');assert.equal(result.state.tx.approval,null);
const bo=JSON.parse(fs.readFileSync('src/businessObjects/xdx_supplier_core_data_20260924.bo')),f=bo.objectProperties.tools.find(f=>f.name==='create_suppliers_contacts');
const body=JSON.parse(f.bodyTemplate.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g,(_,k)=>String(result.escaped[k])));assert.deepEqual(body,s.tx.payload);assert.deepEqual(Object.keys(body).sort(),['Email','FirstName','LastName']);
const denied=ctx('','',{},s);denied.$nodes.CHECK_CONTACT_DUPLICATE={$output:{}};assert.equal(run('AUTHORIZE_CONTACT_WRITE',denied).next,'display');
denied.$nodes.CHECK_CONTACT_DUPLICATE.$output={items:[],count:0,hasMore:false,offset:0};denied.$variables.contactState.tx.approval.payload='tampered';assert.equal(run('AUTHORIZE_CONTACT_WRITE',denied).next,'display');
s=result.state;assert.equal(run('PREPARE_CONTACT',ctx('prepare another','prepare_contact',payload,s,'300000333814409')).route,'display');assert.equal(run('PREPARE_CONTACT',ctx('cancel contact','cancel_contact',{},s)).state.tx.status,'pending');
const reconcile=ctx('','',{},s);reconcile.$nodes.CHECK_CONTACT_DUPLICATE={$output:{items:[{SupplierContactId:'300000999',Email:payload.Email}],count:1,hasMore:false,offset:0}};assert.equal(run('AUTHORIZE_CONTACT_WRITE',reconcile).next,'verify');
for(const response of [{items:[],count:0,hasMore:false,offset:0},{items:[{SupplierContactId:'300000999',Email:payload.Email},{SupplierContactId:'300001000',Email:payload.Email}],count:2,hasMore:false,offset:0}]){reconcile.$nodes.CHECK_CONTACT_DUPLICATE.$output=response;assert.equal(run('AUTHORIZE_CONTACT_WRITE',reconcile).next,'display');}
c=ctx('','',{},s);c.$nodes.CREATE_CONTACT={$output:{}};assert.equal(run('CAPTURE_CONTACT_CREATE',c).valid,false);
c.$nodes.CREATE_CONTACT.$output={SupplierContactId:'300000999',PersonProfileId:'300001001'};s=run('CAPTURE_CONTACT_CREATE',c).state;c.$variables.contactState=s;c.$nodes.GET_CREATED_CONTACT={$output:{...s.tx.payload,SupplierContactId:'300000999',PersonProfileId:'300001001',ContactName:'Revised, XDX',UserName:null,UserAccountStatus:null}};
let verified=run('VERIFY_CONTACT_CREATE',c).state;assert.equal(verified.tx.status,'verified');assert.equal(verified.tx.personProfileId,'300001001');assert(verified.widget.includes('UserAccountStatus'));
assert(run('PREPARE_CONTACT',ctx('create contact contact-request revision 2','create_contact',{},verified)).state.widget.includes('No second POST'));
for(const patch of [{Email:'wrong@example.invalid'},{UserName:'unexpected'},{UserAccountStatus:'A'},{PersonProfileId:null}]){c.$variables.contactState=structuredClone(s);c.$variables.contactState.tx.status='pending';const old=c.$nodes.GET_CREATED_CONTACT.$output;c.$nodes.GET_CREATED_CONTACT.$output={...old,...patch};assert.equal(run('VERIFY_CONTACT_CREATE',c).state.tx.status,'pending');c.$nodes.GET_CREATED_CONTACT.$output=old;}
let read={read:{parentId:'300000333814409',parentName:'XDX Parent',limit:2,offset:0,q:'SupplierContactId>0'},tx:{}};c=ctx('','',{},read);c.$nodes.FETCH_CONTACTS={$output:{items:[],count:0,hasMore:false,offset:0,limit:2}};assert(run('SHAPE_CONTACTS',c).state.widget.includes('No contacts match'));
c.$nodes.FETCH_CONTACTS.$output={items:[{...payload,SupplierContactId:'300000999'}],count:1,hasMore:true,offset:0,limit:2};read=run('SHAPE_CONTACTS',c).state;assert.equal(read.read.nextOffset,2);assert.equal(read.read.selectedId,'300000999');
result=run('PREPARE_CONTACT',ctx('next contact page','next_contact',{},read));assert.equal(result.state.read.offset,2);assert.equal(result.parentId,'300000333814409');
result=run('PREPARE_CONTACT',ctx('show selected contact','detail_contact',{},read));assert.equal(result.state.read.selectedId,'300000999');
c=ctx('','',{},read);c.$nodes.FETCH_CONTACT_DETAIL={$output:{...payload,SupplierContactId:'300000999'}};const widget=JSON.parse(run('SHAPE_CONTACT_DETAIL',c).state.widget.replace(/^<oraInfoDisplay[^>]*>/,'').replace(/<\/oraInfoDisplay>$/,''));assert.equal(widget.properties.cols.length,10);assert(!/hasMore/.test(widget.description));
const attempt=nodes.find(n=>n.code==='STORE_CONTACT_ATTEMPT'),write=nodes.find(n=>n.code==='CONTACT_WRITE_ROUTE'),create=nodes.find(n=>n.code==='CREATE_CONTACT');assert.equal(attempt.outcomes.success,write.id);assert.equal(write.outcomes.write,create.id);
assert(nodes.findIndex(n=>n.code==='CONTACT_DISPLAY')>nodes.findIndex(n=>n.code==='VERIFY_CONTACT_CREATE'));
console.log('PASS: contact three-field contract, parent scope, exact approval, duplicate email withholding, pending before POST, no retry, generated IDs, account-null verification, selected detail and paging.');
