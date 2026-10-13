const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const id='xdx-supplier-object-consolidation-20261012',dir='docs/builds/'+id;
const object='docs/lessons/objects/oracle-fusion-procurement-suppliers.md';
const receipt=dir+'/xdx_session_'+id+'.json';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const reviewed=['AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md',object];
const reads=()=>reviewed.map(p=>({path:p,sha256:hash(p)}));
const now=new Date().toISOString();
if(process.argv[2]==='init') {
  if(fs.existsSync(receipt)) throw Error('Existing receipt; initialize only once');
  fs.mkdirSync(dir+'/evidence',{recursive:true});
  fs.copyFileSync(object,dir+'/evidence/suppliers-before.md');
  fs.copyFileSync('docs/handoffs/ACTIVE_HANDOFF.md',dir+'/evidence/previous-handoff.md');
  fs.writeFileSync(dir+'/commands.jsonl','');
  write(dir+'/failure-ledger.json',{schemaVersion:1,taskId:id,scopes:['supplier-documentation'],commandReceipts:[dir+'/commands.jsonl'],failures:[],noFailuresReason:'Editorial consolidation of existing evidence; no failed executions or new runtime defects observed.'});
  fs.writeFileSync(dir+'/intake-and-learning-register.md',`# Supplier object consolidation\n\nTask: ${id}.\n\nUser authority: consolidate Supplier object lessons into one reusable Markdown file. Existing owner: ${object}. Parent Suppliers only, Oracle Procurement 26C / API 11.13.18.05. Child operations remain independently owned; no child contracts change.\n\nRead: canonical lifecycle playbook in full, object registry, existing Supplier reference and retained supplier API-learning, type-correction, filter-repair and number-resolution evidence. Applied lessons: one resource/one owner, immutable first GET, business fields versus schema optionality, explicit evidence surfaces, preserve unverified code-field mapping and original failure receipts.\n\nScope: rewrite existing reference for reuse, consolidate repeated historical narratives into evidence table, update registry pointer and single active handoff, scoped local verification and commit. No new app/architecture, source schema, runtime artifact, tenant call, live sample refresh, distribution rebuild, branch/worktree change, publication or push. Gates 1–9 runtime activities are excluded; Gate 0 is this intake, Gate 10 is evidence/document cleanup and delivery.\n\nAcceptance: all parent key/query/paging/create/schema/generated-ID/uniqueness/type-field lessons covered; initial sample unchanged; historical display-value success and later rejection both retained; code-field repair remains unverified; links/anchors/JSON and policy gates pass; scoped Closeout and commit.\n\nDependency decisions: retain prior run evidence and child references; replace repeated narratives at the existing object owner; no competing reusable Supplier Markdown file; preserve paused benchmark and unrelated root changes. No reusable lifecycle change is needed.\n`);
  fs.writeFileSync(dir+'/time-tracker.md',`# Time tracker\n\nTask: ${id}.\n\nFirst retained UTC observation: 2026-10-13T02:27:03.7207592Z, after initial handoff/policy reading. Earlier start metadata unavailable; earlier reading duration remains unallocated, not invented. Observed receipt initialization: ${now}.\n\nThe prior reconciliation commit/response tail and inter-turn gap are historical, not this task's labor. Context telemetry, reminder/reset controls and consumption counters are unavailable. Browser acceptance is excluded. Commands are nested within task elapsed; commands.jsonl retains actual intervals. Approval/tool scheduling and unwrapped review are not inferred labor.\n`);
  write(receipt,{schemaVersion:1,sessionId:id,repoRoot:fs.realpathSync('.'),branch:'TestingWFBuildTools',phase:'Startup',startedUtc:now,checkpointUtc:now,reads:reads(),reviewNotes:'Supplier parent-only editorial consolidation using retained evidence; canonical lifecycle and child owners remain separate.',objectReferences:[{path:object,release:'26C / API 11.13.18.05'}],learningRegister:dir+'/intake-and-learning-register.md',failureLedger:dir+'/failure-ledger.json',learningTaskId:id,timeTracker:dir+'/time-tracker.md',checks:['learning','intake','authority','objects','verification','timing','cleanup','delivery'].map(k=>({id:k,rule:k==='objects'?'Object registry and Suppliers reference':k==='timing'?'MUST: continuous timing and reconciliation':'Instruction 1 / scoped '+k+' obligation',status:'planned',reason:'Supplier reference consolidation only; local evidence and applicable governance checks are required; runtime gates excluded.',evidence:[]})),unresolved:['Consolidate and verify Supplier lessons'],metrics:{tokens:'Usage unavailable from task tools',aiUnits:'No tenant calls; counters unavailable',timingGaps:'Earlier reading duration and unwrapped intervals explained in tracker; final tail separately excluded'}});
} else if(process.argv[2]==='record-authoring-failure') {
  const source=dir+'/consolidate.cjs',retained=dir+'/evidence/failed-authoring-source.txt';
  fs.copyFileSync(source,retained);
  write(dir+'/evidence/authoring-failure.json',{observedUtc:now,symptom:'Markdown backticks terminated a JavaScript template literal; node reported SyntaxError: Unexpected number before the document write.',source:retained,sourceSha256:hash(retained),noDocumentMutation:hash(object)===hash(dir+'/evidence/suppliers-before.md'),evidenceGap:'Original tool stderr retained in conversation; this is a captured summary. Unwrapped failed authoring invocation has no timing run ID.'});
  const ledger=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
  ledger.failures.push({id:'S001',observedUtc:now,symptom:'Supplier document authoring helper failed to parse before mutation.',scope:'supplier-documentation',blocks:['supplier-documentation'],status:'fixed',occurrenceEvidence:[{path:dir+'/evidence/authoring-failure.json',sha256:hash(dir+'/evidence/authoring-failure.json')}],evidenceGap:'Unwrapped authoring command; no measured run ID. Original error summarized with source preserved.',cause:'Markdown backticks were interpreted as JavaScript template delimiters.',correction:'Treat the literal document source as data; extract between exact markers without executing the invalid helper.'});
  write(dir+'/failure-ledger.candidate.json',ledger);
} else if(process.argv[2]==='author') {
  const source=fs.readFileSync(dir+'/evidence/failed-authoring-source.txt','utf8');
  const tick=String.fromCharCode(96),start='const document=String.raw'+tick,end='\n'+tick+';';
  const a=source.indexOf(start),b=source.lastIndexOf(end);
  if(a<0||b<=a)throw Error('Literal Markdown boundaries missing');
  const before=fs.readFileSync(dir+'/evidence/suppliers-before.md','utf8');
  const sample=before.match(/## First successful BO GET sample\r?\n[\s\S]*?(?=\r?\n## POST operation)/)[0];
  const history=before.match(/## Change history[\s\S]*$/)[0].replace('| --- | --- | --- |','| --- | --- | --- |\n| 2026-10-12 | Existing Supplier reference and retained source receipts | Consolidate parent lessons for reuse; replace repeated narratives with evidence matrix, preserve unresolved lookup mapping and immutable first GET. No live calls. |');
  fs.writeFileSync(object,source.slice(a+start.length,b)+sample+'\n\n'+history);
  console.log('Literal document source adopted; sample/history preserved');
} else if(process.argv[2]==='close-authoring-failure') {
  const proof=dir+'/evidence/document-verification.json';
  if(JSON.parse(fs.readFileSync(proof)).errors.length)throw Error('Document verification required');
  const ledger=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
  const row=ledger.failures.find(f=>f.id==='S001');
  row.status='closed';row.prevention={kind:'procedure',owner:'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',rule:'Literal-file authoring and Playbook self-verification: validate serialized content before claiming completion',reason:'Task-local document helper; literal source parsing and actual JSON/link/sample verification are sufficient, no runtime code changed.'};
  row.verification={result:'pass',command:'node '+dir+'/task.cjs verify',reviewer:'Codex root review of document and retained source',evidence:[{path:proof,sha256:hash(proof)}],sources:[{path:object,sha256:hash(object)},{path:dir+'/task.cjs',sha256:hash(dir+'/task.cjs')}]};
  write(dir+'/failure-ledger.candidate.json',ledger);
} else if(process.argv[2]==='verify') {
  const errors=[];
  for(const file of [object,'docs/lessons/objects/README.md','docs/handoffs/ACTIVE_HANDOFF.md']) {
    const text=fs.readFileSync(file,'utf8');
    if((text.match(/^```/gm)||[]).length%2) errors.push(file+': unbalanced fences');
    for(const m of text.matchAll(/```json\s*\n([\s\S]*?)\n```/g)) { try{JSON.parse(m[1]);}catch(e){errors.push(file+': invalid JSON example');} }
    for(const m of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const [link,anchor]=m[1].split('#');
      if(/^(https?:|mailto:)/.test(link)||link.includes('<')) continue;
      const target=link?path.resolve(path.dirname(file),link):file;
      if(!fs.existsSync(target)) {errors.push(file+': broken link '+m[1]);continue;}
      if(anchor&&target.endsWith('.md')) {
        const heads=[...fs.readFileSync(target,'utf8').matchAll(/^#+\s+(.+)$/gm)].map(x=>x[1].trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-'));
        if(!heads.includes(anchor)) errors.push(file+': missing anchor '+m[1]);
      }
    }
  }
  const section=s=>s.match(/## First successful BO GET sample\r?\n([\s\S]*?)(?=\r?\n## |$)/)[1].replace(/\r\n/g,'\n').trim();
  if(section(fs.readFileSync(object,'utf8'))!==section(fs.readFileSync(dir+'/evidence/suppliers-before.md','utf8'))) errors.push('Immutable first GET section changed');
  const required=['## GET operations','### Response JSON','## POST operation','### Autogenerated fields','### Required and unique fields','### Candidate request JSON','## Evidence and limits','## Reuse in another build','## Change history'];
  for(const h of required) if(!fs.readFileSync(object,'utf8').includes(h)) errors.push('Missing '+h);
  const proof={observedUtc:now,checkedFiles:[object,'docs/lessons/objects/README.md','docs/handoffs/ACTIVE_HANDOFF.md'],errors,sampleUnchanged:!errors.includes('Immutable first GET section changed'),sourceHash:hash(object),scope:'Local documentation only; no runtime success or new schema behavior claimed'};
  write(dir+'/evidence/document-verification.json',proof);
  console.log(errors.length?'FAIL\n'+errors.join('\n'):'PASS: links/anchors, JSON, fences, required contracts, immutable first GET');
  process.exitCode=errors.length?1:0;
} else if(['refresh','closeout'].includes(process.argv[2])) {
  const r=JSON.parse(fs.readFileSync(receipt));r.reads=reads();r.checkpointUtc=now;r.phase=process.argv[2]==='closeout'?'Closeout':'Startup';
  r.reviewNotes='Reviewed consolidated supplier rules against original reference and retained evidence; no new operation contract facts promoted. Child and lifecycle owners preserved.';
  if(r.phase==='Closeout') {
    if(JSON.parse(fs.readFileSync(dir+'/evidence/document-verification.json')).errors.length) throw Error('Document verification not passed');
    r.unresolved=[];
    r.checks.forEach(c=>{c.status='pass';c.reason='Scoped documentation consolidation accepted; runtime/tenant/app/distribution gates excluded by intake.';c.evidence=[dir+'/intake-and-learning-register.md',dir+'/evidence/document-verification.json'];if(c.id==='timing')c.evidence=[dir+'/time-tracker.md',dir+'/commands.jsonl'];if(c.id==='verification')c.evidence.push(dir+'/evidence/policy-regression.txt');});
    fs.appendFileSync(dir+'/time-tracker.md',`\nDelivery checkpoint: ${now}. Consolidation and local verification complete. Earlier unmeasured reading and unwrapped review durations remain unallocated; no active tenant process or human-only wait. Final gate/commit/response tail excluded except where retained in command receipts. Tokens/AI Units unavailable; no live calls.\n`);
    fs.appendFileSync(dir+'/intake-and-learning-register.md','\nCloseout learning review: evidence-backed parent Supplier rules consolidated at their existing owner; historical runs retained once in evidence matrix/history; no new generated-field confirmation; no lifecycle rule change. All required lesson categories and unchanged-sample evidence reconciled.\n');
  }
  write(receipt,r);
} else throw Error('Expected init, verify, refresh or closeout');
console.log('Task mode '+process.argv[2]+' observed '+now);
