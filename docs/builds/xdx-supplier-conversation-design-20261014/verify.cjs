const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const spec='docs/superpowers/specs/2026-10-14-xdx-supplier-conversation-design.md';
const body=fs.readFileSync(spec,'utf8'),errors=[];
for(const m of body.matchAll(/\]\(([^)]+)\)/g)){
 const p=m[1];if(/^https?:/.test(p))continue;
 if(!fs.existsSync(path.resolve(path.dirname(spec),p.split('#')[0])))errors.push('Missing local link: '+p);
}
if(/\b(?:TODO|TBD)\b/.test(body))errors.push('Unfinished placeholder in design');
if((body.match(/```/g)||[]).length%2)errors.push('Unbalanced code fences');
if(!body.includes('Get started by searching for a supplier. Just say: “Find a supplier like Dell.”'))errors.push('Opening guidance changed');
for(let n=1;n<=13;n++)if(!body.includes('| R'+String(n).padStart(2,'0')+' |'))errors.push('Missing requirement '+n);
const result={checkedUtc:new Date().toISOString(),ok:errors.length===0,errors,spec,sha256:crypto.createHash('sha256').update(body).digest('hex'),boundary:'Document structure, local links and agreed requirement inventory only; no product/runtime acceptance'};
fs.writeFileSync(path.join(__dirname,'verification.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));process.exitCode=errors.length?1:0;
