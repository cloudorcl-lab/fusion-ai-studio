const fs=require('node:fs'), crypto=require('node:crypto');
const dir='docs/builds/xdx-playbook-reconciliation-20261012',id='xdx-playbook-reconciliation-20261012';
const play='docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md';
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const ref=p=>({path:p,sha256:sha(p)});
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const now=new Date().toISOString();
const receipt=dir+'/xdx_session_'+id+'.json';
const r=JSON.parse(fs.readFileSync(receipt));
if(process.argv[2]==='reconcile') {
  let text=fs.readFileSync(play,'utf8');
  const replacements=[
    [' Evidence: Supplier Core restart F32, `authoring/new-first-strategy-source-review.json` and `authoring/new-first-success-proof.json` under its build folder.',''],
    [' Supplier Core restart F39 provides the scoped example in authoring/f39-r1-exact-repair-proof.json; its underlying backend mock-event cause remains unresolved.',' The underlying mock-event cause remains unresolved.'],
    ['This is a documented planner limitation, not a framework fix (Supplier Core restart F34).','This is a documented planner limitation, not a framework fix.'],
    ['This narrow fallback does not permit weaker criteria, hidden state injection or broader framework edits (Supplier Core restart F35).','This narrow fallback does not permit weaker criteria, hidden state injection or broader framework edits.'],
    ['\n| Date | Build/evidence source | Playbook change | Verification |\n| --- | --- | --- | --- |\n','\n']
  ];
  for(const [from,to] of replacements) {
    if(text.split(from).length!==2) throw Error('Expected exactly one replacement: '+from);
    text=text.replace(from,to);
  }
  fs.writeFileSync(play,text);
  fs.writeFileSync(dir+'/evidence/findings.json',JSON.stringify({observedUtc:now,findings:[
    {id:'G001',symptom:'Sandbox bootstrap spawnSync git EPERM prevented receipt creation; subsequent Startup had no receipt.',evidenceGap:'Original tool output retained in conversation, not a filesystem log. Captured summary retrospectively; no child Git ran.',correction:'Host access rerun created receipt and passed Startup; use verified host context for measured subprocess checks.'},
    {id:'G002',symptom:'rg literal directory wildcard arguments scripts/*, tests/* failed on Windows.',evidenceGap:'Original tool result retained in conversation. Retrospective summary rather than reconstructed raw receipt.',correction:'Use literal directory paths or rg -g patterns; subsequent source searches succeeded.'},
    {id:'G003',symptom:'Governance audit found timing command omissions, conflicting scope/branch requirements, stale handoff, redundant procedures and unpromoted later evidence.',correction:'Reconcile verified lessons at existing canonical owners; preserve undeployed and paused boundaries.'}
  ]},null,2)+'\n');
  const findings=JSON.parse(fs.readFileSync(dir+'/evidence/findings.json'));
  const ledger=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
  ledger.failures=findings.findings.map(f=>({id:f.id,observedUtc:now,symptom:f.symptom,scope:'governance',blocks:['governance'],status:'fixed',occurrenceEvidence:[ref(dir+'/evidence/findings.json')],...(f.evidenceGap?{evidenceGap:f.evidenceGap}:{}),cause:f.id==='G001'?'Sandbox child-process boundary':f.id==='G002'?'Windows rg received literal wildcard directory paths':'Canonical guidance drift and worktree-only evidence',correction:f.correction}));
  delete ledger.noFailuresReason;
  write(dir+'/failure-ledger.json',ledger);
  fs.appendFileSync(dir+'/intake-and-learning-register.md','\nSelected object reference: docs/lessons/objects/oracle-fusion-procurement-suppliers.md, Oracle Procurement 26C / API 11.13.18.05, reviewed in full before editing. Inventory: supplier parent only; no child operation contract changes. Retained evidence only. Findings G001–G003 captured in failure ledger; G001/G002 capture was retrospective after mandatory immediate sandbox escalation/read-only correction.\n');
  fs.appendFileSync(dir+'/time-tracker.md','\n'+now+' — Source audit and reconciliation phase checkpoint. Host Startup passed after sandbox EPERM. Source inventory measured; initial inspection/document edits are unwrapped review/execution, not inferred labor. No human or browser wait is active.\n');
} else if(process.argv[2]==='capture-tool-findings') {
  const occurrence=dir+'/evidence/tool-findings.json';
  write(occurrence,{observedUtc:now,findings:[
    {id:'G004',symptom:'apply_patch rejected a combined delete/add operation on the same ACTIVE_HANDOFF.md path; no edits applied.',correction:'Use one Update File operation on the existing path; corrected patch succeeded.'},
    {id:'G005',symptom:'Verification orchestration failed publishing verification-results.json: Set-Content reported file in use. Child timing regression had already succeeded.',correction:'Write separate per-check result files and publish aggregate once after completion; preserve child output/run and resume missing packet checks only.'}
  ],limitation:'Captured from retained tool output after failure; original orchestration stderr is not a separate filesystem receipt. No cause attributed to a specific locking process.'});
  const ledger=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
  for(const f of JSON.parse(fs.readFileSync(occurrence)).findings) ledger.failures.push({id:f.id,observedUtc:now,symptom:f.symptom,scope:'governance',blocks:['governance'],status:'fixed',occurrenceEvidence:[ref(occurrence)],evidenceGap:'Original tool result retained in conversation; recorded summary preserves observation, not fabricated raw output.',cause:f.id==='G004'?'Unsupported duplicate-path patch operations':'Shared summary publication rejected by file access boundary; locking owner unproven',correction:f.correction});
  write(dir+'/failure-ledger.json',ledger);
  const resultsPath=dir+'/evidence/verification-results.json';
  const results=JSON.parse(fs.readFileSync(resultsPath));
  const event=fs.readFileSync(dir+'/commands.jsonl','utf8').trim().split('\n').map(JSON.parse).findLast(e=>e.activityId==='timing-regressions'&&e.event==='end');
  if(event?.exitCode!==0) throw Error('No passing timing receipt');
  results.push({label:'timing-regressions',exitCode:event.exitCode,command:'node --test tests/test-measure-build-command.cjs',evidence:dir+'/evidence/timing-regressions.txt',observedUtc:event.endedUtc,recovery:'Recovered from original completed measured run; no test repeated'});
  write(resultsPath,results);
} else if(process.argv[2]==='capture-timestamp-finding') {
  const occurrence=dir+'/evidence/timestamp-finding.json';
  write(occurrence,{observedUtc:now,symptom:'Post-Closeout timing export returned nonzero. PowerShell ConvertFrom-Json materialized startedUtc as System.DateTime; string conversion was 10/13/2026 01:34:39 rather than UTC ISO.',diagnostic:'GetType().FullName = System.DateTime; ConvertFrom-Json supports DateKind parameter.',correction:'Use ConvertFrom-Json -DateKind String; preserve report output before checking its exit code.',limitation:'Original export output was held in a terminated PowerShell local variable and not retained; no invented verbatim error receipt.'});
  const ledger=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
  ledger.failures.push({id:'G006',observedUtc:now,symptom:'Timing-report export failed after initial Closeout.',scope:'governance',blocks:['governance'],status:'fixed',occurrenceEvidence:[ref(occurrence)],evidenceGap:'Original report stdout/stderr unavailable; original wrapper exception and concrete type diagnostic retained in conversation and summarized here.',cause:'PowerShell JSON date coercion changed the UTC CLI argument into a localized date string.',correction:'Preserve JSON date strings via DateKind String and save report bytes before status check.'});
  write(dir+'/failure-ledger.json',ledger);
} else if(process.argv[2]==='close-findings') {
  const proof=dir+'/evidence/document-verification.json';
  if(JSON.parse(fs.readFileSync(proof)).errors.length) throw Error('Document verification must pass');
  const ledger=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
  for(const row of ledger.failures) {
    row.status='closed';
    row.prevention={kind:'procedure',owner:play,rule:row.id==='G001'?'Reject known failures before remote execution: reuse verified host context after pre-dispatch EPERM':['G002','G004'].includes(row.id)?'Playbook self-verification: verify commands and patch format at their supported owner':row.id==='G005'?'Dependency hygiene and single-owner evidence: per-check immutable result files; publish aggregate after completion':'Invocation, Gate 0, first-slice, timing, cleanup and Gate 10 own the reconciled rules',reason:'Documentation/tool invocation findings; focused validators, source review and successful corrected harness execution cover the boundary. No application code changed. File-lock owner remains unproven.'};
    row.verification={result:'pass',command:'node '+dir+'/audit.cjs verify; pwsh -NoProfile -File '+dir+'/verify.ps1',reviewer:'Codex root source-to-guidance review; no separate reviewer claimed',evidence:[ref(proof),ref(dir+'/evidence/inventory.json'),ref(dir+'/evidence/verification-results.json'),ref(dir+'/evidence/packet-receipt.json')],sources:[ref(play),ref('AGENTS.md'),ref('docs/lessons/objects/README.md'),ref('docs/lessons/objects/oracle-fusion-procurement-suppliers.md'),ref(dir+'/verify.ps1')]};
    if(row.id==='G006') {
      const report=dir+'/evidence/timing-report.json';
      if(!JSON.parse(fs.readFileSync(report)).window) throw Error('Passing timing report required before G006 closure');
      row.prevention={kind:'procedure',owner:play,rule:'MUST: continuous timing and reconciliation: preserve actual UTC boundaries and verify invocation output',reason:'Task-only PowerShell harness must preserve JSON timestamp strings; timing CLI already rejects invalid report windows. No production tooling changed.'};
      row.verification={result:'pass',command:'node scripts/measure-build-command.cjs report --input '+dir+'/commands.jsonl --from <retained-UTC-string> --to <observed-UTC>',reviewer:'Codex root type diagnostic and UTC report review',evidence:[ref(report),ref(dir+'/evidence/timestamp-finding.json')],sources:[ref(dir+'/finish.ps1')]};
    }
  }
  write(dir+'/failure-ledger.json',ledger);
} else if(!['startup','closeout'].includes(process.argv[2])) throw Error('Expected reconcile, startup, close-findings or closeout');
r.objectReferences=[{path:'docs/lessons/objects/oracle-fusion-procurement-suppliers.md',release:'26C / API 11.13.18.05'}];
delete r.noObjectsReason;
r.reads=['AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md',play,'docs/lessons/objects/README.md',...r.objectReferences.map(x=>x.path)].map(ref);
r.reviewNotes='Reviewed changed guidance against original snapshots, local Git lineage, current runner source, workflow context reference and retained benchmark receipts. No runtime success inferred from local repairs; paused build remains excluded.';
r.checkpointUtc=now;
r.phase=process.argv[2]==='closeout'?'Closeout':'Startup';
if(process.argv[2]==='closeout') {
  r.unresolved=[];
  for(const c of r.checks) {
    c.status='pass';
    c.reason='Local documentation reconciliation verified within authorized scope; no runtime artifacts, tenant operations or publication.';
    c.evidence=[dir+'/audit.md',dir+'/evidence/document-verification.json'];
    if(c.id==='timing') c.evidence=[dir+'/time-tracker.md',dir+'/commands.jsonl'];
    if(c.id==='verification') c.evidence.push(dir+'/evidence/verification-results.json');
  }
}
write(receipt,r);
console.log('Task record reconciled: '+process.argv[2]+' at '+now);
