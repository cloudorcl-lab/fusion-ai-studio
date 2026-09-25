const assert=require('node:assert/strict'),fs=require('fs');
const nodes=JSON.parse(fs.readFileSync('src/workflows/xdx_supplier_core_20260924.wf')).specification.dataPipeline.pipelineNodes;
for(const n of nodes.filter(n=>n.type==='CODE'))new Function('$context',n.metadata.sourceCode);
function run(code,ctx){return new Function('$context',nodes.find(n=>n.code===code).metadata.sourceCode)(ctx);}
const payload={AddressName:'XDX "A" \\ Test',CountryCode:'US',AddressLine1:'5000 CARTER DR.',City:'LOS ANGELES',State:'CA',PostalCode:'90032',Email:'xdx-address@example.invalid',AddressPurposeOrderingFlag:true};
function ctx(message,intent,patch={},state={},supplierId=''){return {$app:{$OraMessageHint:'Query'},$system:{$inputMessage:message},$workflow:{$jobId:'address-request'},$variables:{addressState:structuredClone(state),readState:{}},$nodes:{EXTRACT_READ:{$output:{intent,addressPatch:patch,supplierId,limit:5,offset:0}}}};}
let c=ctx('prepare address','prepare_address',payload,{},'300000333814409');
let result=run('PREPARE_ADDRESS',c);assert.equal(result.route,'parent');assert.equal(result.operation,'draft');let s=result.state;
c.$variables.addressState=s;c.$nodes.PREPARE_ADDRESS={$output:{result}};c.$nodes.FETCH_ADDRESS_PARENT={$output:{SupplierId:'999',Supplier:'Wrong'}};
assert.equal(run('CHECK_ADDRESS_PARENT',c).operation,'display');assert(run('CHECK_ADDRESS_PARENT',c).state.widget.includes('No address operation'));
c.$nodes.FETCH_ADDRESS_PARENT={$output:{SupplierId:'300000333814409',Supplier:'XDX Parent'}};s=run('CHECK_ADDRESS_PARENT',c).state;assert.equal(s.tx.parentName,'XDX Parent');
assert(s.widget.includes('Required fields supplied.'),'Valid email with letter s must be accepted after CLI serialization');
for(const Email of ['has space@example.invalid','double@@example.invalid','no-domain']){const bad=structuredClone(s);bad.tx.payload.Email=Email;assert(run('PREPARE_ADDRESS',ctx('review address','review_address',{},bad)).state.widget.includes('valid address email'));}
result=run('PREPARE_ADDRESS',ctx('edit name','edit_address',{AddressName:'XDX Revised'},s));s=result.state;assert.equal(s.tx.revision,2);assert.equal(s.tx.payload.Email,payload.Email);
assert.equal(run('PREPARE_ADDRESS',ctx('approve address address-request revision 2','approve_address',{},s)).state.tx.approval,null);
s=run('PREPARE_ADDRESS',ctx('review address','review_address',{},s)).state;
s=run('PREPARE_ADDRESS',ctx('approve address address-request revision 2','approve_address',{},s)).state;assert(s.tx.approval);
const cancelled=run('PREPARE_ADDRESS',ctx('cancel address','cancel_address',{},s)).state;assert.equal(cancelled.tx.status,'cancelled');assert.equal(cancelled.tx.approval,null);
const changed=run('PREPARE_ADDRESS',ctx('change parent','edit_address',{},s,'300000333814410'));assert.equal(changed.state.tx.approval,null);assert.equal(changed.route,'parent');assert.equal(changed.state.tx.parentName,'');
assert.equal(run('PREPARE_ADDRESS',ctx('create address address-request revision 1','create_address',{},s)).route,'display');
result=run('PREPARE_ADDRESS',ctx('create address address-request revision 2','create_address',{},s));assert.equal(result.route,'parent');assert.equal(result.operation,'preflight');
c=ctx('','',{},s);c.$nodes.CHECK_ADDRESS_DUPLICATE={$output:{items:[{SupplierAddressId:'77',AddressName:'XDX Revised'}],count:1,hasMore:false,offset:0}};assert.equal(run('AUTHORIZE_ADDRESS_WRITE',c).next,'display');
c.$nodes.CHECK_ADDRESS_DUPLICATE.$output={items:[],count:0,hasMore:false,offset:0};result=run('AUTHORIZE_ADDRESS_WRITE',c);assert.equal(result.next,'write');assert.equal(result.state.tx.status,'pending');assert.equal(result.state.tx.approval,null);
const denied=ctx('','',{},s);denied.$nodes.CHECK_ADDRESS_DUPLICATE={$output:{}};assert.equal(run('AUTHORIZE_ADDRESS_WRITE',denied).next,'display');
denied.$nodes.CHECK_ADDRESS_DUPLICATE.$output={items:[],count:0,hasMore:false,offset:0};denied.$variables.addressState.tx.approval.payload='tampered';assert.equal(run('AUTHORIZE_ADDRESS_WRITE',denied).next,'display');
const bo=JSON.parse(fs.readFileSync('src/businessObjects/xdx_supplier_core_data_20260924.bo'));const f=bo.objectProperties.tools.find(f=>f.name==='create_suppliers_addresses');const body=JSON.parse(f.bodyTemplate.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g,(_,k)=>String(result.escaped[k])));assert.deepEqual(body,s.tx.payload);assert.equal(typeof body.AddressPurposeOrderingFlag,'boolean');
s=result.state;assert.equal(run('PREPARE_ADDRESS',ctx('prepare another','prepare_address',payload,s,'300000333814409')).route,'display');
const reconcile=ctx('','',{},s);reconcile.$nodes.CHECK_ADDRESS_DUPLICATE={$output:{items:[{SupplierAddressId:'300000999',AddressName:s.tx.payload.AddressName}],count:1,hasMore:false,offset:0}};assert.equal(run('AUTHORIZE_ADDRESS_WRITE',reconcile).next,'verify');
reconcile.$nodes.CHECK_ADDRESS_DUPLICATE.$output.items=[];reconcile.$nodes.CHECK_ADDRESS_DUPLICATE.$output.count=0;assert.equal(run('AUTHORIZE_ADDRESS_WRITE',reconcile).next,'display');
c=ctx('','',{},s);c.$nodes.CREATE_ADDRESS={$output:{}};assert.equal(run('CAPTURE_ADDRESS_CREATE',c).valid,false);
c.$nodes.CREATE_ADDRESS.$output={SupplierAddressId:'300000999',AddressPartyNumber:'123'};s=run('CAPTURE_ADDRESS_CREATE',c).state;c.$variables.addressState=s;c.$nodes.GET_CREATED_ADDRESS={$output:{...s.tx.payload,SupplierAddressId:'300000999',AddressPartyNumber:'123'}};assert.equal(run('VERIFY_ADDRESS_CREATE',c).state.tx.status,'verified');
assert(run('PREPARE_ADDRESS',ctx('create address address-request revision 2','create_address',{},c.$variables.addressState)).state.widget.includes('No second POST'));
c.$variables.addressState=s;c.$nodes.GET_CREATED_ADDRESS.$output={...s.tx.payload,SupplierAddressId:'300000999',Email:'wrong@example.invalid'};s.tx.status='pending';assert.equal(run('VERIFY_ADDRESS_CREATE',c).state.tx.status,'pending');
let read={read:{parentId:'300000333814409',parentName:'XDX Parent',limit:5,offset:0,q:'SupplierAddressId>0'},tx:{}};c=ctx('','',{},read);c.$nodes.FETCH_ADDRESSES={$output:{items:[],count:0,hasMore:false,offset:0,limit:5}};assert(run('SHAPE_ADDRESSES',c).state.widget.includes('No addresses match'));
c.$nodes.FETCH_ADDRESSES.$output={items:[{...payload,SupplierAddressId:'300000999'}],count:1,hasMore:true,offset:0,limit:5};read=run('SHAPE_ADDRESSES',c).state;assert.equal(read.read.nextOffset,5);assert.equal(read.read.selectedId,'300000999');
result=run('PREPARE_ADDRESS',ctx('next address page','next_address',{},read));assert.equal(result.state.read.offset,5);assert.equal(result.parentId,'300000333814409');
c=ctx('','',{},read);c.$nodes.FETCH_ADDRESS_DETAIL={$output:{...payload,SupplierAddressId:'300000999'}};const widget=JSON.parse(run('SHAPE_ADDRESS_DETAIL',c).state.widget.replace(/^<oraInfoDisplay[^>]*>/,'').replace(/<\/oraInfoDisplay>$/,''));assert.equal(widget.properties.cols.length,12);assert(!/hasMore/.test(widget.description));
console.log('PASS: address parent validation, field-only merge, parent-change approval invalidation, stale/cancel boundary, scoped duplicate guard, pending attempt, exact boolean JSON, persisted comparison, no retry, list paging and scalar detail.');
