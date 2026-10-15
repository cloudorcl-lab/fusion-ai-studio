const fs=require('fs'),cp=require('child_process'),crypto=require('crypto');
const dir='docs/builds/xdx-supplier-child-create-20261015',file='src/workflows/xdx_supplier_conversation.wf',hash=()=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const before=hash(),w=JSON.parse(fs.readFileSync(file)),nodes=w.specification.dataPipeline.pipelineNodes;
const codes=['XDX_VERIFY_CHILD_RESULT','XDX_PRESENT_CONTROL_RESULT','XDX_RETURN_CHILD_RESPONSE'];
fs.writeFileSync(dir+'/xdx_child_identity_before.json',JSON.stringify({sha256:before,nodes:nodes.filter(n=>codes.includes(n.code))},null,2)+'\n');
const helper=String.raw`
function acceptedChildText(response,recorded){
 const attempts=response.attempt?[response.attempt]:response.attempts;
 if(!Array.isArray(attempts)||attempts.length!==1)return null;
 const a=attempts[0];if(!a||a.status!=='accepted'||['address','contact'].indexOf(a.kind)<0)return null;
 const address=a.kind==='address',key=address?'SupplierAddressId':'SupplierContactId';
 const lines=[response.message||'Recorded child creation outcome.'];
 if(recorded)lines.push('Previously recorded creation outcome. No new creation or verification was performed for this display.');
 lines.push('Kind: '+a.kind,'Mode: '+a.mode,'Status: '+a.status,'Verification: '+a.verification,'Request: '+a.requestId+' revision '+a.revision);
 if(a.suppliers_Id!==undefined&&a.suppliers_Id!==null)lines.push('Parent supplier ID: '+a.suppliers_Id);
 if(a.mode==='template'&&a.sourceId!==undefined&&a.sourceId!==null)lines.push('Source '+a.kind+' ID: '+a.sourceId);
 if(a[key]!==undefined&&a[key]!==null)lines.push('Created '+a.kind+' ID: '+a[key]);
 const own=response.item&&String(response.item[key])===String(a[key])?response.item:null,generated=address?'AddressPartyNumber':'PersonProfileId';
 const generatedValue=Object.prototype.hasOwnProperty.call(a,generated)?a[generated]:own&&Object.prototype.hasOwnProperty.call(own,generated)?own[generated]:undefined;
 if(generatedValue!==undefined&&generatedValue!==null)lines.push(generated+': '+generatedValue);
 lines.push(a.verification==='verified'?'Saved required fields verified against the approved payload:':'Submitted required fields (saved values not verified):');
 const fields=address?['AddressName','CountryCode','AddressLine1','City','State','PostalCode','Email','AddressPurposeOrderingFlag']:['FirstName','LastName','Email'];
 fields.forEach(function(field){if(a.payload&&Object.prototype.hasOwnProperty.call(a.payload,field))lines.push(field+': '+a.payload[field]);});
 return lines.join('\n');
}
`;
function apply(code,args,label){const patch=dir+'/xdx_child_identity_'+label+'_patch.json';fs.writeFileSync(patch,JSON.stringify(args,null,2)+'\n');const option=label==='return'?'--inputs-patch':'--metadata-patch';const r=cp.spawnSync(process.execPath,['.agents/skills/aistudio/scripts/aistudio.js','do-modify-node','--file',file,'--node-code',code,option,'@'+patch],{encoding:'utf8',timeout:300000});fs.writeFileSync(dir+'/xdx_child_identity_'+label+'_stdout.json',r.stdout||'');fs.writeFileSync(dir+'/xdx_child_identity_'+label+'_stderr.txt',r.stderr||'');if(r.status!==0||JSON.parse(r.stdout).ok===false)throw Error(label+' modification failed');}
let verify=nodes.find(n=>n.code===codes[0]).metadata.sourceCode,mark="return {state:state,operation:'display'};";
if(verify.split(mark).length!==2)throw Error('Unique verify return missing');verify=verify.replace(mark,"state.response.acceptedText=acceptedChildText(state.response,false);"+mark)+helper;
let present=nodes.find(n=>n.code===codes[1]).metadata.sourceCode,anchor='return {operation:evaluation.operation,state:state};';
if(present.split(anchor).length!==2)throw Error('Unique control return missing');present=present.replace(anchor,"const acceptedText=acceptedChildText(state.response,true);if(acceptedText)state.response.acceptedText=acceptedText;\nreturn {operation:acceptedText&&evaluation.operation==='display'?'child_preflight':evaluation.operation,state:state};")+helper;
apply(codes[0],{sourceCode:verify},'verify');apply(codes[1],{sourceCode:present},'present');
apply(codes[2],{returnValue:'{{$context.$variables.supplierState.response.acceptedText ? $context.$variables.supplierState.response.acceptedText : $context.$nodes.XDX_CHILD_QUERY_RESPONSE.$output}}'},'return');
const receipt={before,after:hash(),changedNodes:codes,graphChanged:false,terminalShape:'plaintext, matching retained configured run.finalOutput',helperSha256:crypto.createHash('sha256').update(helper).digest('hex'),frozenRouting:'Returned control operation child_preflight; persisted nextOperation remains display so child phase guards no-op and BO switches skip.',runtimeAttempts:0,remoteCalls:0};
fs.writeFileSync(dir+'/xdx_child_identity_repair_receipt.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
