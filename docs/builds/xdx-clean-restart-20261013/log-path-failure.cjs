const fs=require('node:fs'),crypto=require('node:crypto');
const b='docs/builds/xdx-clean-restart-20261013',p=`${b}/failure-ledger.json`,l=JSON.parse(fs.readFileSync(p));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const end=fs.readFileSync(`${b}/commands.jsonl`,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse).find(e=>e.event==='end'&&e.activityId==='retirement');
const occurrence=`${b}/evidence/path-check-failure.json`;
fs.writeFileSync(occurrence,JSON.stringify({observedUtc:end.endedUtc,runId:end.runId,observedError:'Reparse point blocks removal',dispatchedRemoval:false,cause:'Get-ChildItem -LiteralPath <file> -Attributes ReparsePoint returns the explicit file even without that attribute. Nine ordinary file targets triggered the old check.',originalOutput:'Observed tool error retained in conversation; this is a summary, not a verbatim full receipt.'},null,2)+'\n');
const existing=l.failures.find(f=>f.id==='P001');
const f=existing||{id:'P001',observedUtc:end.endedUtc,scope:'purge',blocks:['purge'],status:'open',symptom:'Ordinary explicit file paths were misclassified as reparse points; purge stopped before mutation.',commandRunIds:[end.runId],occurrenceEvidence:[{path:occurrence,sha256:sha(occurrence)}],cause:'PowerShell explicit-file Get-ChildItem enumeration bypasses the requested attribute filter.'};
if(!existing)l.failures.push(f);
if(process.argv[2]==='close'){
 f.status='closed';f.correction='Inspect the target and directory descendants and test the ReparsePoint bit explicitly.';
 f.prevention={kind:'regression',owner:'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',rule:'Cleanup rules: literal file and directory targets require explicit reparse attribute-bit checks',reason:'Actual-target regression reproduces nine prior false positives and verifies zero corrected false positives; attribute predicate still rejects reparse flags.'};
 f.verification={result:'pass',command:`pwsh -NoProfile -File ${b}/path-check.ps1`,reviewer:'Codex root review of all target enumeration and source-bound focused result',evidence:[{path:`${b}/evidence/path-contract-pass.json`,sha256:sha(`${b}/evidence/path-contract-pass.json`)}],sources:[`${b}/path-contract.ps1`,`${b}/path-check.ps1`,`${b}/execute.ps1`].map(path=>({path,sha256:sha(path)}))};
}
delete l.noFailuresReason;fs.writeFileSync(p,JSON.stringify(l,null,2)+'\n');
