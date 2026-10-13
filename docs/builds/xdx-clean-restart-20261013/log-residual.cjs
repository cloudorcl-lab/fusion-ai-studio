const fs=require('node:fs'),crypto=require('node:crypto');
const b='docs/builds/xdx-clean-restart-20261013',p=`${b}/failure-ledger.json`,l=JSON.parse(fs.readFileSync(p));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const end=fs.readFileSync(`${b}/commands.jsonl`,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse).find(e=>e.event==='end'&&e.activityId==='retirement-retry');
const occurrence=`${b}/evidence/windows-residual-failure.json`;
fs.writeFileSync(occurrence,JSON.stringify({runId:end.runId,observedUtc:end.endedUtc,error:'Git worktree remove returned Permission denied for the physical checkout and its administrative directory.',observedState:'Root is the sole registered checkout; readonly physical and administrative residues remain. Branch/base target deletion did not start.',cause:'Observed ReadOnly attributes on remaining directories; source hashes prove residual data was independently preserved.'},null,2)+'\n');
let f=l.failures.find(f=>f.id==='P002');if(!f){f={id:'P002',observedUtc:end.endedUtc,scope:'purge',blocks:['purge'],status:'open',symptom:'Git unregistered the checkout but left read-only physical and administrative residuals.',commandRunIds:[end.runId],occurrenceEvidence:[{path:occurrence,sha256:sha(occurrence)}],cause:'ReadOnly directory attributes blocked physical Git removal; registration and file removal had different outcomes.'};l.failures.push(f);}
if(process.argv[2]==='close'){
f.status='closed';f.correction='Use captured exact physical and administrative paths, verify every remaining file against the archive, clear only ReadOnly attributes and remove residuals with native PowerShell.';
f.prevention={kind:'procedure',owner:'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',rule:'Cleanup rules / approved Windows worktree purges require separate registration/path proof and bounded readonly residual recovery',reason:'Environment-specific residual state; full archived-source and actual-pointer preflight passed, with exact-path native recovery and independent final absence checks required.'};
f.verification={result:'pass',command:`pwsh -NoProfile -File ${b}/residual-preflight.ps1`,reviewer:'Codex root review of preserved-pointer confinement, residual hashes and directory attributes',evidence:[{path:`${b}/evidence/residual-preflight.json`,sha256:sha(`${b}/evidence/residual-preflight.json`)}],sources:[`${b}/residual-preflight.ps1`,`${b}/remove-residual.ps1`].map(path=>({path,sha256:sha(path)}))};
}
fs.writeFileSync(p,JSON.stringify(l,null,2)+'\n');
