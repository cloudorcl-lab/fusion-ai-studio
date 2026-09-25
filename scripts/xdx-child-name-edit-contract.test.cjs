const fs=require('fs'),assert=require('node:assert/strict');
const nodes=JSON.parse(fs.readFileSync('src/workflows/xdx_supplier_core_20260924.wf')).specification.dataPipeline.pipelineNodes;
const run=(name,c)=>new Function('$context',nodes.find(n=>n.code===name).metadata.sourceCode)(c);
for(const [resource,field] of [['address','AddressName'],['site','SupplierSite'],['contact','LastName']]){
 const state={tx:{status:'draft',parentId:'300000333814409',parentName:'XDX Parent',requestId:'request-a',revision:2,payload:{[field]:'Before',Email:'retained@example.invalid'},approval:{revision:2},reviewedPayload:'old'},read:{}};
 const c={$app:{$OraMessageHint:'Query'},$system:{$inputMessage:'Change '+field+' to XDX Revised.'},$variables:{[resource+'State']:structuredClone(state)},$nodes:{EXTRACT_READ:{$output:{intent:'list',supplierId:'999',[resource+'Patch']:{[field]:'Wrong'}}}}};
 assert.equal(run('PREPARE_TRANSACTION',c).route,resource,'Literal field must route despite wrong model intent');
 const result=run('PREPARE_'+resource.toUpperCase(),c).state.tx;
 assert.equal(result.payload[field],'XDX Revised');assert.equal(result.parentId,state.tx.parentId);assert.equal(result.payload.Email,state.tx.payload.Email);assert.equal(result.revision,3);assert.equal(result.approval,null);
 c.$variables[resource+'State']={...state,tx:{...state.tx,status:'pending'}};
 assert.equal(run('PREPARE_'+resource.toUpperCase(),c).state.tx.payload[field],'Before','Pending write must remain frozen');
 c.$system.$inputMessage='delete '+resource;
 assert.equal(run('PREPARE_TRANSACTION',c).route,'read','Destructive request cannot enter draft route');
}
console.log('PASS: child name edits route deterministically, preserve parent and unedited fields, invalidate approval, and freeze pending writes.');
