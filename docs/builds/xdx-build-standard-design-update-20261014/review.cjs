const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const dir=path.relative(process.cwd(),__dirname).replaceAll('\\','/'),hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const spec='docs/superpowers/specs/2026-10-14-xdx-supplier-conversation-design.md',body=fs.readFileSync(spec,'utf8');
const files=['BUILD_STANDARD.md','AGENTS.md',spec,'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md'];
const errors=[];
for(const p of files){
 const t=fs.readFileSync(p,'utf8');
 if((t.match(/```/g)||[]).length%2)errors.push(p+': unbalanced fences');
 for(const m of t.matchAll(/\]\(([^)]+)\)/g)){
  const link=m[1].split('#')[0];if(!link||/^https?:|mailto:|</.test(link)||link.includes('<'))continue;
  if(!fs.existsSync(path.resolve(path.dirname(p),link)))errors.push(p+': missing link '+link);
 }
}
if(!body.includes('D -->|Exact control command| F'))errors.push('Control commands must bypass model interpretation');
if(!body.includes('## 10. Build execution and measurement contract'))errors.push('Missing standard application');
if(!body.includes('Get started by searching for a supplier. Just say: “Find a supplier like Dell.”'))errors.push('Approved opening changed');
for(let n=1;n<=13;n++)if(!body.includes('| R'+String(n).padStart(2,'0')+' |'))errors.push('Missing approved requirement '+n);
const result={checkedUtc:new Date().toISOString(),ok:errors.length===0,errors,sourceHashes:files.map(p=>({path:p,sha256:hash(p)})),assetInputHashes:['assets/BUILD_STANDARD.md','assets/opening for agents.md'].map(p=>({path:p,sha256:hash(p)})),designCorrection:'Prior diagram routed exact controls through language interpretation, contradicting the stated deterministic command contract. Revised diagram routes exact controls directly to state validation.',boundary:'Document structure, source links, unchanged business requirements and deterministic diagram routing; no runtime acceptance'};
fs.writeFileSync(path.join(__dirname,'review.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));process.exitCode=errors.length?1:0;
