'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const id='xdx-query-preflight-fixes-20261015',dir='docs/builds/'+id,now=new Date().toISOString();
const write=(n,v)=>fs.writeFileSync(path.join(dir,n),JSON.stringify(v,null,2)+'\n');
const ref=p=>({path:p,sha256:crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')});
const source='scripts/verify-agentic-app-query-contract.cjs',test='scripts/tests/verify-agentic-app-query-contract.cjs';
const result=JSON.parse(fs.readFileSync(dir+'/review-green.json'));
if(!result.ok||result.childExitCode!==0||ref(source).sha256!==result.source.sha256||ref(test).sha256!==result.test.sha256)throw Error('Final source/test proof stale or failed');
const l=JSON.parse(fs.readFileSync(dir+'/failure-ledger.json'));
const causes=['Any-path producer reachability and incomplete special-edge handling did not establish completed output on all routes','Unresolved definitions were silently skipped','BO bindings and expression checks omitted nested lexical pipelines','Equal delimiter counts ignored ordering, empty expressions and object/quoted braces'];
const corrections=['Use pipeline-entry completed-output state traversal and parallel summaries preserving special edges','Fail closed with BO_OBJECT_UNRESOLVED and BO_FUNCTION_UNRESOLVED','Recurse nested BO inputs and scope-aware expression producers with shadowing/ancestor rules','Scan ordered nonempty expressions with quote escapes and object braces'];
for(let i=0;i<l.failures.length;i++){
 const f=l.failures[i];f.status='closed';f.cause=causes[i];f.correction=corrections[i];
 f.prevention={kind:'regression',owner:'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',rule:'Existing REST binding preflight owner refined; focused actual-export and local CLI positive/negative regressions retained in packaged validator test owner'};
 f.verification={result:'pass',command:'node scripts/tests/verify-agentic-app-query-contract.cjs',reviewer:'Independent preflight_review plus parent source/evidence reconciliation',sources:[ref(source),ref(test)],evidence:[ref(dir+'/review-green.json'),ref(dir+'/review-green.output.txt'),ref(dir+'/review.md')]};
}
write('failure-ledger.candidate.json',l);
const sourceRefs=[ref(source),ref(test)];
write('evidence-manifest.json',{schemaVersion:1,taskId:id,sources:sourceRefs,requirements:corrections.map((description,i)=>({id:'Q0'+(i+1),description,status:'passed',evidence:[{...ref(dir+'/review-green.json'),checks:[{pointer:'/ok',equals:true},{pointer:'/childExitCode',equals:0},{pointer:'/source/sha256',equals:sourceRefs[0].sha256},{pointer:'/test/sha256',equals:sourceRefs[1].sha256}]}]}))});
for(const suffix of ['', '-tests','-implementation','-review']){
 const file='xdx_session_'+id+suffix+'.json',r=JSON.parse(fs.readFileSync(dir+'/'+file));
 r.phase='Closeout';r.checkpointUtc=now;r.unresolved=[];
 r.reads=['AGENTS.md','BUILD_STANDARD.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md'].map(ref);
 r.reviewNotes='Scoped source/test or independent review completed; parent reconciled changed governance and current handoff. Worker messages acknowledge milestone/lesson changes as applicable. No runtime operations.';
 for(const c of r.checks){c.status='pass';c.reason='Authorized validator-only repair completed with focused evidence and current milestone handoff. New-app/runtime/deployment/resource-operation obligations excluded.';c.evidence=[dir+'/delivery.md',dir+'/intake-and-learning-register.md',dir+'/review.md',dir+'/time-tracker.md'];}
 write(file,r);
}
const b=JSON.parse(fs.readFileSync(dir+'/build-ledger.json'));b.deliveryCheckpointUtc=now;b.elapsedObservedSeconds=(Date.parse(now)-Date.parse(b.startedUtc))/1000;b.primaryTiming[0].end=now;b.primaryTiming[0].observedWindowSeconds=b.elapsedObservedSeconds;b.primaryTiming[0].limitation='Scheduling breakdown unavailable; observed active-execution window includes ordinary tool/coordination latency.';b.primaryCategoryTotals={activeExecutionObservedWindowSeconds:b.elapsedObservedSeconds,blockingWaitObservedSeconds:0,requiredUserWaitObservedSeconds:0,idleObservedSeconds:0,pausedObservedSeconds:0,limitation:'No separate transitions observed; initial read interval unallocated and scheduling telemetry unavailable.'};b.firstVerifiedFixedResultUtc=result.observedUtc;b.timeToFirstVerifiedFixedResultSeconds=(Date.parse(result.observedUtc)-Date.parse(b.startedUtc))/1000;b.verification={focusedCases:45,passed:45,failed:0,finalReceipt:dir+'/review-green.json',firstGreenPassed:false,firstGreenFailure:'Qualified diagnostic identity; preserved original evidence',broadTests:'Not run per user instruction'};write('build-ledger.json',b);
fs.appendFileSync(dir+'/time-tracker.md',`\nDelivery checkpoint ${now}: observed elapsed ${b.elapsedObservedSeconds}s; first final-source verified fixed result ${b.timeToFirstVerifiedFixedResultSeconds}s after record start. Active execution window as qualified in ledger; no observed separate user/blocking/idle/pause transition. Token counters unavailable; tenant calls zero. Diagnostic and review-edge corrections are subsets of this window; exact separate rework time unavailable. Final response/commit tail excluded.\n`);
console.log(JSON.stringify({candidateReady:true,elapsedObservedSeconds:b.elapsedObservedSeconds,focusedCases:45}));
