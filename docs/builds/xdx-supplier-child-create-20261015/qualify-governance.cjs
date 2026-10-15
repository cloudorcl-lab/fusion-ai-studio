const fs=require('node:fs'),cp=require('node:child_process'),crypto=require('node:crypto');
const d=__dirname+'/',source='scripts/verify-agentic-app-query-contract.cjs',test='scripts/tests/verify-agentic-app-query-contract.cjs';
const r=cp.spawnSync(process.execPath,[test],{encoding:'utf8',timeout:30000,windowsHide:true});
fs.writeFileSync(d+'governance-qualification.output.txt',(r.stdout||'')+(r.stderr||''));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
fs.writeFileSync(d+'governance-qualification.json',JSON.stringify({ok:r.status===0,exitCode:r.status,observedUtc:new Date().toISOString(),source:{path:source,sha256:hash(source)},test:{path:test,sha256:hash(test)},scope:'Shared validator convergence only:45base focused cases plus retained SET_FIELDS assertions. No address/contact scenario or tenant operation.'},null,2));
console.log(JSON.stringify({exitCode:r.status,output:'governance-qualification.output.txt'}));process.exitCode=r.status===0?0:1;
