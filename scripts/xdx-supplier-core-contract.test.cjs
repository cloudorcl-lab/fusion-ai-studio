const assert=require('node:assert/strict'),fs=require('node:fs');
const workflow=JSON.parse(fs.readFileSync('src/workflows/xdx_supplier_core_20260924.wf'));
const nodes=workflow.specification.dataPipeline.pipelineNodes;
function code(name,ctx){return new Function('$context',nodes.find(n=>n.code===name).metadata.sourceCode)(ctx);}
function context(request,state={},message=''){return {$app:{$OraMessageHint:'Query'},$system:{$inputMessage:message},$variables:{readState:state},$nodes:{EXTRACT_READ:{$output:request}}};}
let c=context({intent:'search',name:"O'Brien",limit:5,offset:0});
assert.equal(code('PREPARE_READ',c).q,"Supplier='O''Brien'");
assert.match(code('PREPARE_READ',context({intent:'list',limit:26,offset:0})).error,/page size/);
assert.match(code('PREPARE_READ',context({}, {},'next page')).error,/No next page/);
let state={q:"Supplier='O''Brien'",limit:5,nextOffset:5,selectedSupplierId:'300000047414679'};
let next=code('PREPARE_READ',context({},state,'next page'));
assert.deepEqual([next.q,next.offset,next.limit,next.error],[state.q,5,5,'']);
let detail=code('PREPARE_READ',context({intent:'detail'},state));
assert.equal(detail.supplierId,state.selectedSupplierId);
assert.match(code('PREPARE_READ',context({intent:'detail',supplierId:'1/addresses'},state)).error,/Choose/);
let raw={items:[{SupplierId:state.selectedSupplierId,Supplier:'Test'}],count:1,offset:0,limit:5,hasMore:false};
c.$nodes.PREPARE_READ={$output:{result:{q:'SupplierId>0',limit:5,offset:0,previous:{}}}};
c.$nodes.FETCH_SUPPLIERS={$output:raw};
assert.equal(code('SHAPE_SUPPLIERS',c).state.selectedSupplierId,state.selectedSupplierId);
raw.count=2;assert.match(code('SHAPE_SUPPLIERS',c).state.view.error,/invalid paging/);
c.$nodes.PREPARE_READ.$output.result=detail;
c.$nodes.FETCH_SUPPLIER_DETAIL={$output:{SupplierId:'99',Supplier:'Wrong'}};
assert.match(code('SHAPE_DETAIL',c).state.view.error,/could not be verified/);
c.$nodes.FETCH_SUPPLIER_DETAIL={$output:{SupplierId:detail.supplierId,Supplier:'Quote " and backslash \\ supplier',SupplierNumber:'1255'}};
let rendered=code('SHAPE_DETAIL',c).state.view.widget;
let widget=JSON.parse(rendered.replace(/^<oraInfoDisplay[^>]*>/,'').replace(/<\/oraInfoDisplay>$/,''));
assert.equal(widget.properties.cols.length,10);
assert.equal(widget.properties.rows[0].cells[2],'Quote " and backslash \\ supplier');
assert(!/count:|offset:|hasMore:|nextOffset:/.test(widget.description),'Scalar detail must not fabricate paging');
c.$nodes.PREPARE_READ.$output.result={q:'SupplierId>0',limit:5,offset:0,previous:{}};
c.$nodes.FETCH_SUPPLIERS={$output:{items:[],count:0,offset:0,limit:5,hasMore:false}};
rendered=code('SHAPE_SUPPLIERS',c).state.view.widget;
assert(rendered.includes('No suppliers match'));
assert(!rendered.includes('Use next page'));
const bo=JSON.parse(fs.readFileSync('src/businessObjects/xdx_supplier_core_data_20260924.bo'));
assert(bo.objectProperties.tools.every(t=>['getall_suppliers','get_suppliers','create_suppliers','getall_suppliers_addresses','get_suppliers_addresses','create_suppliers_addresses','getall_suppliers_sites','get_suppliers_sites','create_suppliers_sites','getall_suppliers_contacts','get_suppliers_contacts','create_suppliers_contacts'].includes(t.name)));
assert.equal(bo.objectProperties.tools.length,12);
assert.equal(bo.objectProperties.tools.find(t=>t.name==='get_suppliers').operationType,'GET');
console.log('PASS: read filter escaping, bounds, conversation paging, selected detail, key guard, response paging integrity and scoped BO operations.');

function tx(message,intent,patch={},state={}){const ctx=context({intent,patch},{} ,message);ctx.$variables.transactionState=structuredClone(state);ctx.$workflow={$jobId:'request-a'};ctx.$system.$currentDateTime='2026-09-24T21:00:00Z';return code('PREPARE_TRANSACTION',ctx);}
let draft=tx('Prepare supplier','prepare_supplier',{Supplier:'XDX Test',BusinessRelationship:'Spend Authorized',TaxOrganizationType:'Corporation'}).state;
assert.equal(draft.revision,1);
draft=tx('Change supplier name','edit_supplier',{Supplier:'XDX "Quote" \\ Test'},draft).state;
assert.equal(draft.revision,2);assert.equal(draft.payload.TaxOrganizationType,'Corporation');
assert.equal(tx('create supplier request-a revision 2','create_supplier',{},draft).route,'display');
assert.equal(tx('approve supplier request-a revision 2','approve_supplier',{},draft).state.approval,null);
draft=tx('review supplier','review_supplier',{},draft).state;
assert(draft.view.widget.includes('TaxOrganizationType'));
draft=tx('approve supplier request-a revision 2','approve_supplier',{},draft).state;
assert.equal(draft.approval.payload,JSON.stringify(draft.payload));
const approved=structuredClone(draft);
let edited=tx('Change name','edit_supplier',{Supplier:'XDX Changed'},draft).state;
assert.equal(edited.approval,null);assert.equal(edited.reviewedPayload,'');
assert.equal(tx('create supplier request-a revision 2','create_supplier',{},edited).route,'display');
assert.equal(tx('create supplier wrong-request revision 2','create_supplier',{},approved).route,'display');
assert.equal(tx('please create supplier request-a revision 2','create_supplier',{},approved).route,'display');
const cancelled=tx('cancel supplier','cancel_supplier',{},approved).state;
assert.equal(tx('create supplier request-a revision 2','create_supplier',{},cancelled).route,'display');
let prepared=tx('create supplier request-a revision 2','create_supplier',{},approved);
assert.equal(prepared.route,'preflight');
function preflight(state,raw){return code('AUTHORIZE_SUPPLIER_WRITE',{$system:{$currentDateTime:'2026-09-24T21:00:00Z'},$nodes:{PREPARE_TRANSACTION:{$output:{result:{state:structuredClone(state)}}},CHECK_SUPPLIER_DUPLICATE:{$output:raw}}});}
assert.equal(preflight(approved,{items:[{SupplierId:'123',Supplier:approved.payload.Supplier}],count:1,hasMore:false,offset:0}).next,'display');
assert.equal(preflight(approved,{error:'service failure'}).next,'display');
const tampered=structuredClone(approved);tampered.payload.Supplier='Changed after approval';
assert.equal(preflight(tampered,{items:[],count:0,hasMore:false,offset:0}).next,'display');
const authorized=preflight(approved,{items:[],count:0,hasMore:false,offset:0});
assert.equal(authorized.next,'write');assert.equal(authorized.state.status,'pending');assert.equal(authorized.state.approval,null);
const post=bo.objectProperties.tools.find(t=>t.name==='create_suppliers');
const renderedBody=post.bodyTemplate.replace(/\{(Supplier|BusinessRelationship|TaxOrganizationType)\}/g,(_,key)=>authorized.state.escaped[key]);
assert.deepEqual(JSON.parse(renderedBody),approved.payload,'Rendered body must equal exact approved payload, including quote/backslash values');
assert.equal(post.headers['Upsert-Mode'],'false');
assert.equal(tx('create supplier request-a revision 2','create_supplier',{},authorized.state).route,'display');
assert.equal(tx('Prepare another','prepare_supplier',{Supplier:'Another'},authorized.state).state.requestId,'request-a');
assert.equal(preflight(authorized.state,{items:[],count:0,hasMore:false,offset:0}).next,'display');
const reconciled=preflight(authorized.state,{items:[{SupplierId:'123',Supplier:approved.payload.Supplier}],count:1,hasMore:false,offset:0});
assert.equal(reconciled.next,'verify');
let receipt=code('CAPTURE_SUPPLIER_CREATE',{$variables:{transactionState:structuredClone(authorized.state)},$nodes:{CREATE_SUPPLIER:{$output:{error:'timeout'}}}});
assert.equal(receipt.valid,false);assert.equal(receipt.state.status,'pending');
let verifyContext={$variables:{transactionState:{...structuredClone(authorized.state),supplierId:'123'}},$nodes:{GET_CREATED_SUPPLIER:{$output:{...approved.payload,SupplierId:'123',SupplierNumber:'test-number'}}}};
let verified=code('VERIFY_SUPPLIER_CREATE',verifyContext).state;
assert.equal(verified.status,'verified');
assert.equal(tx('create supplier request-a revision 2','create_supplier',{},verified).route,'display');
verifyContext.$variables.transactionState.status='pending';verifyContext.$nodes.GET_CREATED_SUPPLIER.$output.TaxOrganizationType='Wrong';
assert.equal(code('VERIFY_SUPPLIER_CREATE',verifyContext).state.status,'pending');
console.log('PASS: supplier field-only merge, exact review/request/revision approval, invalidation/cancel, duplicate and uncertain-outcome guards, JSON body equality, persisted verification and no accepted-write replay.');

// Unsupported destructive verbs must not inherit a model-proposed draft/read action.
{
 const workflow=JSON.parse(require('fs').readFileSync('src/workflows/xdx_supplier_core_20260924.wf'));
 const node=code=>workflow.specification.dataPipeline.pipelineNodes.find(n=>n.code===code);
 for(const intent of ['cancel_supplier','prepare_supplier','list','prepare_address']){
  const context={$app:{$OraMessageHint:'Query'},$variables:{},$system:{$inputMessage:'Delete the selected supplier.'},$nodes:{EXTRACT_READ:{$output:{intent,limit:5,offset:0}}}};
  assert.equal(new Function('$context',node('PREPARE_TRANSACTION').metadata.sourceCode)(context).route,'read');
  assert.match(new Function('$context',node('PREPARE_READ').metadata.sourceCode)(context).error,/Supported reads/);
 }
 console.log('PASS: destructive request withholding is independent of model intent.');
}


// Explicit field edit in an existing draft is not delegated to read-intent classification.
{
 const workflow=JSON.parse(require('fs').readFileSync('src/workflows/xdx_supplier_core_20260924.wf'));
 const prepare=workflow.specification.dataPipeline.pipelineNodes.find(n=>n.code==='PREPARE_TRANSACTION');
 const draft={requestId:'existing-draft',revision:1,status:'draft',payload:{Supplier:'Initial',BusinessRelationship:'Spend Authorized',TaxOrganizationType:'Corporation'},approval:null};
 const c={$app:{$OraMessageHint:'Query'},$variables:{transactionState:draft},$system:{$inputMessage:'Change Supplier to XDX Replay Supplier Revised.'},$nodes:{EXTRACT_READ:{$output:{intent:'search',name:'XDX Replay Supplier Revised',patch:{}}}}};
 const changed=new Function('$context',prepare.metadata.sourceCode)(c);assert.equal(changed.route,'display');assert.equal(changed.state.payload.Supplier,'XDX Replay Supplier Revised');assert.equal(changed.state.revision,2);assert.equal(changed.state.payload.BusinessRelationship,'Spend Authorized');assert.equal(changed.state.payload.TaxOrganizationType,'Corporation');
 console.log('PASS: explicit supplier field edit stays in the existing draft despite a model search misclassification.');
}
