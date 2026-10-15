const fs=require('fs'),cp=require('child_process'),crypto=require('crypto');const dir='docs/builds/xdx-supplier-child-create-20261015',file='src/workflows/xdx_supplier_conversation.wf',cli='.agents/skills/aistudio/scripts/aistudio.js';const w=JSON.parse(fs.readFileSync(file)),nodes=w.specification.dataPipeline.pipelineNodes,prepare=nodes.find(n=>n.code==='XDX_PREPARE_SUPPLIER_REQUEST'),validate=nodes.find(n=>n.code==='XDX_VALIDATE_CHILD_DRAFT'),before=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
fs.writeFileSync(dir+'/xdx_child_email_before.json',JSON.stringify({sourceHash:before,nodes:[prepare,validate]},null,2)+'\n');
const normalization=String.raw`// Only an unquoted model-extracted Email token in natural-language prose loses sentence punctuation.
 // Whole-message explicit field syntax remains literal and is independently validated.
 const explicitEmailLiteral=/^\s*Email\s*[:=]/i.test(raw);
 if(!fieldEdit&&!explicitEmailLiteral&&intent&&(intent.intent==='child_create'||activeChild&&intent.intent==='edit')&&intent.childPatch&&typeof intent.childPatch.Email==='string'){
  const email=intent.childPatch.Email,messageEnd=raw.replace(/\s+$/,'');
  if(/[.!?]$/.test(email)&&messageEnd.slice(-email.length)===email){
   const prefix=messageEnd.slice(0,-email.length);
   if(!prefix||/[\s:=]$/.test(prefix)){
    intent=JSON.parse(JSON.stringify(intent));
    intent.childPatch.Email=email.replace(/[.!?]+$/,'');
   }
  }
 }
 `;
let source=prepare.metadata.sourceCode;const anchor="if(activeChild&&(fieldEdit||intent&&intent.intent==='edit')){";if(source.indexOf(anchor)<0||source.indexOf(anchor)!==source.lastIndexOf(anchor))throw Error('Email shared boundary anchor not unique');source=source.replace(anchor,normalization+anchor);
let validation=validate.metadata.sourceCode;const emailAnchor=String.raw`!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.Email)`;if(!validation.includes(emailAnchor))throw Error('Email validator anchor missing');validation=validation.replace(emailAnchor,emailAnchor+String.raw`||!/^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(p.Email.slice(p.Email.lastIndexOf('.')+1))`);
function apply(code,value,label){const p=dir+'/xdx_child_email_'+label+'_patch.json';fs.writeFileSync(p,JSON.stringify({sourceCode:value},null,2)+'\n');const r=cp.spawnSync(process.execPath,[cli,'do-modify-node','--file',file,'--node-code',code,'--metadata-patch','@'+p],{encoding:'utf8',timeout:300000});fs.writeFileSync(dir+'/xdx_child_email_'+label+'_stdout.json',r.stdout||'');fs.writeFileSync(dir+'/xdx_child_email_'+label+'_stderr.txt',r.stderr||'');if(r.status!==0)throw Error(label+' exit '+r.status);const result=JSON.parse(r.stdout);if(result.ok===false)throw Error(label+' okfalse');}
apply(prepare.code,source,'normalization');apply(validate.code,validation,'validation');const receipt={before,after:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),changedNodes:[prepare.code,validate.code],scope:'Only model-extracted unquoted terminal Email punctuation in longer natural-language requests; whole-message explicit field literals and quoted tokens preserved. Final domain label must end alphanumeric.',graphChanged:false,remoteCalls:0,runtimeAttempts:0};fs.writeFileSync(dir+'/xdx_child_email_repair_receipt.json',JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
