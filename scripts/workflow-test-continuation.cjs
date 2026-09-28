'use strict';
// Structured opt-in continuation evidence. Never executes child commands.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { isDeepStrictEqual: equal } = require('node:util');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
function parseJSON(value){try{return JSON.parse(value);}catch{throw Error('INVALID_CONTINUATION_JSON');}}
function file(root, relative, optional = false) {
  if (typeof relative !== 'string' || !relative || (/[\\:\x00-\x1f]/.test(relative)) || path.isAbsolute(relative) || relative.split('/').some(x => !x || x === '.' || x === '..')) throw Error('UNSAFE_PATH');
  root = fs.realpathSync(root);
  const parts = relative.split('/');
  let current = root;
  for (let i = 0; i < parts.length; i++) {
    current = path.join(current, parts[i]);
    let stat;
    try { stat = fs.lstatSync(current); } catch (e) { if (optional && i === parts.length - 1 && e.code === 'ENOENT') return null; throw e; }
    if (stat.isSymbolicLink() || (i === parts.length - 1 ? !stat.isFile() : !stat.isDirectory())) throw Error('UNSAFE_PATH');
  }
  const bytes = fs.readFileSync(current);
  return { sha256: hash(bytes), bytes, mtimeMs: fs.statSync(current).mtimeMs };
}
function prepare(root, contract, startedUtc) {
  if (contract?.kind !== 'workflow-test-needs-local-judge-v1' || !Number.isFinite(Date.parse(startedUtc))) throw Error('INVALID_CONTRACT');
  for (const key of ['testName','workflowCode','workflowStatus','dataSource','testFile','report','judgeRequest']) if (typeof contract[key] !== 'string' || !contract[key]) throw Error('INVALID_CONTRACT');
  if (!Number.isSafeInteger(contract.workflowVersion) || contract.workflowVersion <= 0 || contract.report === contract.judgeRequest) throw Error('INVALID_CONTRACT');
  const test = file(root, contract.testFile);
  return { contract: structuredClone(contract), startedUtc, testSha256: test.sha256, testBase64: test.bytes.toString('base64'),
    before: [contract.report, contract.judgeRequest].map(p => file(root, p, true)?.sha256 || null) };
}
function evaluate(prepared, processResult, endedUtc, files, testSha256) {
  try {
    if (processResult.childExitCode !== 1 || processResult.signal || processResult.interruptSignal || processResult.spawnError) throw Error('PROCESS_NOT_CONTINUATION');
    const c = prepared.contract, start = Date.parse(prepared.startedUtc), end = Date.parse(endedUtc);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end < start) throw Error('INVALID_WINDOW');
    if (testSha256 !== prepared.testSha256) throw Error('TEST_CHANGED');
    // Windows observed a judge mtime 2.2722 ms after child-close UTC. File
    // metadata clocks do not establish the upper execution boundary. Freshness
    // still requires changed bytes, lower mtime and exact in-window report times.
    if (files.some((f,i) => f.sha256 === prepared.before[i] || f.mtimeMs < start)) throw Error('STALE_EVIDENCE');
    const [r,j] = files.map(f => parseJSON(f.bytes.toString('utf8').replace(/^\uFEFF/,'')));
    const created = Date.parse(r.createdAt), began = Date.parse(r.startedAt), finished = Date.parse(r.finishedAt);
    if (![created,began,finished].every(t => Number.isFinite(t) && t >= start && t <= end) || finished < began) throw Error('STALE_EVIDENCE');
    const workflow = {workflowCode:c.workflowCode,status:c.workflowStatus,version:c.workflowVersion};
    if (!Number.isInteger(r.judge?.minimumScore) || r.judge.minimumScore < 1 || r.judge.minimumScore > 5 || r.status !== 'needs-judge' || r.evaluationMode !== 'hybrid' || r.judge?.status !== 'pending' || r.judge?.provider !== 'local') throw Error('NOT_PENDING_JUDGE');
    if (r.workflowCode !== c.workflowCode || !equal(r.workflow,workflow) || !equal(j.workflow,workflow)) throw Error('IDENTITY_MISMATCH');
    for (const k of ['testName','testFile','dataSource']) if (r[k] !== c[k] || j[k] !== c[k]) throw Error('IDENTITY_MISMATCH');
    if (j.evaluationMode !== 'hybrid' || j.reportPath !== c.report) throw Error('IDENTITY_MISMATCH');
    const selectedTest=parseJSON(Buffer.from(prepared.testBase64,'base64'));
    const criteria=value=>{
      if(!Array.isArray(value)||!value.length)throw Error('INVALID_JUDGE_CONTRACT');
      const out=value.map(x=>typeof x==='string'?x:x?.criterion);
      if(out.some(x=>typeof x!=='string'||!x.trim())||new Set(out).size!==out.length)throw Error('INVALID_JUDGE_CONTRACT');
      return out;
    };
    if(selectedTest.judge?.minimumScore!==r.judge.minimumScore||j.judge?.minimumScore!==r.judge.minimumScore||
       !equal(criteria(selectedTest.judge?.rubric),criteria(r.judgeAssertions))||!equal(criteria(j.judge?.rubric),criteria(r.judgeAssertions))||
       typeof selectedTest.judge?.expectedOutcome!=='string'||!selectedTest.judge.expectedOutcome.trim()||j.judge?.expectedOutcome!==selectedTest.judge.expectedOutcome)throw Error('JUDGE_CONTRACT_MISMATCH');
    const d = r.deterministic;
    if (d?.passed !== true || !Array.isArray(d.failures) || d.failures.length || !Array.isArray(d.checks) || !d.checks.length || !d.checks.every(x=>x.passed===true) || !equal(d,j.deterministic)) throw Error('DETERMINISTIC_FAILURE');
    if (typeof r.run?.finalOutput !== 'string' || !r.run.finalOutput.trim() || r.run.finalOutput !== j.finalOutput || r.run.workflowCode !== c.workflowCode || r.run.finishReason === 'error') throw Error('OUTPUT_MISMATCH');
    return {ok:true,status:'continuation',semanticOutcome:'needs-judge',childExitCode:1,exitCode:1,
      evidence:files.map((f,i)=>({path:[c.report,c.judgeRequest][i],sha256:f.sha256})),
      // Caller must retain these bytes immutably before attach rewrites reports.
      snapshots:files.map(f=>f.bytes)};
  } catch (e) { return {ok:false,reason:/^[A-Z_]+$/.test(e.message)?e.message:'INVALID_EVIDENCE'}; }
}

function classify(root, prepared, processResult, endedUtc) {
  try { return evaluate(prepared,processResult,endedUtc,[prepared.contract.report,prepared.contract.judgeRequest].map(p=>file(root,p)),file(root,prepared.contract.testFile).sha256); }
  catch { return {ok:false,reason:'INVALID_EVIDENCE'}; }
}
function bindCommand(root,options,c,testBytes) {
  const exe=path.basename(options.executable).toLowerCase();
  const args=options.args;
  if(!['test','repair'].includes(options.category)||!['node','node.exe'].includes(exe)||!Array.isArray(args)||args.length<4||path.resolve(root,args[0])!==path.resolve(root,'.agents/skills/aistudio/scripts/aistudio.js')||args[1]!=='run-workflow-test') throw Error('CONTINUATION_COMMAND_MISMATCH');
  const opts={};
  for(let i=2;i<args.length;i+=2){const key=args[i],value=args[i+1];if(!['--test-file','--data-source','--evaluation-mode','--judge-provider','--workflow-status'].includes(key)||!value||Object.hasOwn(opts,key))throw Error('CONTINUATION_COMMAND_MISMATCH');opts[key]=value;}
  if(opts['--workflow-status']!==c.workflowStatus||opts['--test-file']!==c.testFile||opts['--data-source']!==c.dataSource||(opts['--evaluation-mode']&&opts['--evaluation-mode']!=='hybrid')||(opts['--judge-provider']&&opts['--judge-provider']!=='local'))throw Error('CONTINUATION_COMMAND_MISMATCH');
  const test=parseJSON(testBytes || file(root,c.testFile).bytes);
  if(test.testName!==c.testName||test.workflow?.workflowCode!==c.workflowCode||(!opts['--evaluation-mode']&&test.defaults?.evaluationMode!=='hybrid'))throw Error('CONTINUATION_TEST_MISMATCH');
  return {command:'run-workflow-test',testFile:c.testFile,dataSource:c.dataSource,category:options.category,executable:options.executable,args:[...args]};
}
function begin(root,options,startedUtc) {
  const c=parseJSON(file(root,options['continuation-contract']).bytes);
  const binding=bindCommand(root,options,c),locks=[];
  try {
    // Both names are owned for the duration. A stale lock requires investigation.
    for(const p of [c.report,c.judgeRequest].sort()){
      file(root,p,true);const target=path.resolve(root,p)+'.learning-lock';const fd=fs.openSync(target,'wx',0o600);fs.closeSync(fd);locks.push(target);
    }
    return {root,prepared:prepare(root,c,startedUtc),binding,release(){for(const p of locks)fs.unlinkSync(p);}};
  }catch(e){for(const p of locks)fs.unlinkSync(p);throw e;}
}
function archive(root,relative,data){
  // Caller-selected parent is already confined by the receipt owner; recheck.
  file(root,relative,true);
  const bytes=Buffer.from(JSON.stringify(data));
  const fd=fs.openSync(path.resolve(root,relative),'wx',0o600);
  try{fs.writeFileSync(fd,bytes);fs.fsyncSync(fd);}finally{fs.closeSync(fd);}
  return {path:relative,sha256:hash(bytes)};
}
function finish(session,processResult,endedUtc,archivePath,runId){
  const {root,prepared}=session;
  const files=[prepared.contract.report,prepared.contract.judgeRequest].map(p=>file(root,p));
  const result=evaluate(prepared,processResult,endedUtc,files,file(root,prepared.contract.testFile).sha256);
  if(!result.ok)return null;
  const ref=archive(root,archivePath,{schemaVersion:1,kind:'workflow-test-needs-local-judge-v1',runId,prepared,binding:session.binding,processResult,endedUtc,files:files.map(f=>({sha256:f.sha256,mtimeMs:f.mtimeMs,base64:f.bytes.toString('base64')}))});
  return {status:'continuation',semanticOutcome:'needs-judge',continuation:ref};
}
function readArchive(root,ref){
  if(!ref||!/^[a-f0-9]{64}$/.test(ref.sha256||''))throw Error('INVALID_CONTINUATION_ARCHIVE');
  const f=file(root,ref.path);if(f.sha256!==ref.sha256)throw Error('CONTINUATION_ARCHIVE_CHANGED');return parseJSON(f.bytes);
}
function verifyPending(root,event){
  if(event.event!=='end'||event.status!=='continuation'||event.semanticOutcome!=='needs-judge'||event.exitCode!==1||event.childExitCode!==1||event.processStatus!=='exited'||event.signal||event.interruptSignal||event.spawnError)throw Error('INVALID_CONTINUATION_EVENT');
  const a=readArchive(root,event.continuation);
  if(a.schemaVersion!==1||a.kind!=='workflow-test-needs-local-judge-v1'||a.runId!==event.runId||a.prepared.startedUtc!==event.startedUtc||a.endedUtc!==event.endedUtc||a.binding?.command!=='run-workflow-test'||a.binding.testFile!==a.prepared.contract.testFile||a.binding.dataSource!==a.prepared.contract.dataSource)throw Error('CONTINUATION_IDENTITY_MISMATCH');
  const testBytes=Buffer.from(a.prepared.testBase64,'base64');
  if(hash(testBytes)!==a.prepared.testSha256||!equal(bindCommand(root,a.binding,a.prepared.contract,testBytes),a.binding))throw Error('CONTINUATION_COMMAND_MISMATCH');
  for(const key of ['childExitCode','signal','interruptSignal','spawnError']) if((a.processResult?.[key]??null)!==(event[key]??null))throw Error('CONTINUATION_PROCESS_MISMATCH');
  const files=a.files.map(f=>{const bytes=Buffer.from(f.base64,'base64');if(hash(bytes)!==f.sha256)throw Error('CONTINUATION_SNAPSHOT_CHANGED');return {...f,bytes};});
  const result=evaluate(a.prepared,a.processResult,a.endedUtc,files,a.prepared.testSha256);if(!result.ok)throw Error('INVALID_CONTINUATION_CONTRACT');
  return {archive:a,report:parseJSON(files[0].bytes),request:parseJSON(files[1].bytes)};
}
function checkResolution(pending,final,outcome){
  if(!['passed','failed'].includes(outcome)||final.status!==outcome||final.judge?.status!==outcome||final.judge.provider!=='local')throw Error('INVALID_ATTACHED_RESULT');
  const strip=x=>{const y=structuredClone(x);delete y.status;delete y.judge;return y;};
  if(!equal(strip(final),strip(pending.report)))throw Error('ATTACHED_RUN_MISMATCH');
  const j=final.judge,min=pending.report.judge.minimumScore;
  if(!Number.isInteger(j.score)||j.score<1||j.score>5||j.minimumScore!==min||j.passed!==(j.score>=min)||j.passed!==(outcome==='passed')||!Number.isFinite(Date.parse(j.attachedAt))||Date.parse(j.attachedAt)<Date.parse(pending.archive.endedUtc)||!Array.isArray(j.criterionResults)||!Array.isArray(j.unsupportedClaims)||typeof j.summary!=='string'||!j.summary.trim())throw Error('INVALID_ATTACHED_JUDGE');
  const criteria=pending.report.judgeAssertions.map(x=>x.criterion);
  if(j.criterionResults.length!==criteria.length||new Set(j.criterionResults.map(x=>x.criterion)).size!==criteria.length||!j.criterionResults.every(x=>criteria.includes(x.criterion)&&typeof x.passed==='boolean'&&typeof x.notes==='string'&&x.notes.trim()))throw Error('ATTACHED_CRITERIA_MISMATCH');
}
function resolveOutcome(root,end,outcome,evidence,archivePath){
  const pending=verifyPending(root,end),f=file(root,evidence),final=parseJSON(f.bytes);
  checkResolution(pending,final,outcome);
  return archive(root,archivePath,{schemaVersion:1,kind:'workflow-test-attached-local-judge-v1',runId:end.runId,pendingSha256:end.continuation.sha256,outcome,base64:f.bytes.toString('base64'),sha256:f.sha256});
}
function verifyResolution(root,end,event){
  if(event.event!=='outcome'||event.runId!==end.runId)throw Error('INVALID_RESOLUTION_EVENT');
  const a=readArchive(root,event.continuationResolution),pending=verifyPending(root,end);
  if(a.kind!=='workflow-test-attached-local-judge-v1'||a.schemaVersion!==1||a.runId!==end.runId||a.pendingSha256!==end.continuation.sha256||a.outcome!==event.semanticOutcome)throw Error('RESOLUTION_IDENTITY_MISMATCH');
  const bytes=Buffer.from(a.base64,'base64');if(hash(bytes)!==a.sha256)throw Error('ATTACHED_SNAPSHOT_CHANGED');
  checkResolution(pending,parseJSON(bytes),a.outcome);return a.outcome;
}
module.exports={prepare,classify,bindCommand,begin,finish,verifyPending,resolveOutcome,verifyResolution};
