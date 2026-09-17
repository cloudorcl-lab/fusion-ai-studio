const fs=require('node:fs'), os=require('node:os'), path=require('node:path'), cp=require('node:child_process'), crypto=require('node:crypto'), assert=require('node:assert/strict');
const {verify}=require('../scripts/verify-session-compliance.cjs');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'xdx-session-contract-'));
try {
  const git=cp.spawnSync('git',['init','-b','audit',root],{encoding:'utf8'}); assert.equal(git.status,0,git.stderr);
  const files=['AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md','docs/builds/test/time-tracker.md','docs/builds/test/intake.md'];
  for(const p of files){fs.mkdirSync(path.dirname(path.join(root,p)),{recursive:true});fs.writeFileSync(path.join(root,p),'current-task time-tracker.md');}
  const record={schemaVersion:1,sessionId:'current-task',repoRoot:fs.realpathSync(root),branch:'audit',phase:'Closeout',startedUtc:new Date(Date.now()-1000).toISOString(),checkpointUtc:new Date().toISOString(),objectReferences:[],noObjectsReason:'Governance fixture',reviewNotes:'Applicable timing and closeout rules reviewed',reads:files.slice(0,4).map(p=>({path:p,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex')})),learningRegister:files[5],timeTracker:files[4],checks:['learning','intake','authority','objects','verification','timing','cleanup','delivery'].map(id=>({id,status:'pass',rule:'Fixture rule',reason:'Fixture evidence',evidence:[files[5]]})),unresolved:[],metrics:{tokens:'Not available in fixture',aiUnits:'No workflow',timingGaps:'None'}};
  const run=(r,phase='Closeout',id='current-task')=>{fs.writeFileSync(path.join(root,'record.json'),JSON.stringify(r));return verify(root,'record.json',id,phase);};
  assert.deepEqual(run(record),[]);
  const negative=(name,mutate,pattern)=>{const r=structuredClone(record);mutate(r);assert(run(r).some(x=>pattern.test(x)),name);};
  negative('old session',r=>r.sessionId='previous-task',/identity mismatch/);
  negative('stale read',r=>r.reads[0].sha256='old',/stale reviewed/);
  negative('absent tracker',r=>r.timeTracker='missing.md',/timeTracker/);
  negative('missing obligation',r=>r.checks.pop(),/obligation/);
  negative('pending closeout',r=>r.checks[4].status='planned',/Unresolved obligation/);
  negative('empty pass evidence',r=>r.checks[4].evidence=[],/Missing evidence/);
  negative('unexplained NA',r=>{r.checks[3].status='not-applicable';r.checks[3].reason='';},/disposition/);
  negative('remaining activity',r=>r.unresolved=['child GET pending'],/remain unresolved/);
  negative('metrics omitted',r=>delete r.metrics,/Missing metric/);
  negative('path escape',r=>r.timeTracker='../outside.md',/timeTracker/);
  negative('wrong branch',r=>r.branch='elsewhere',/branch mismatch/);
  const planned=structuredClone(record);planned.phase='Startup';planned.checks[4].status='planned';assert.deepEqual(run(planned,'Startup'),[]);
  console.log('Session compliance: PASS (startup/closeout positives and 11 negative cases)');
} finally {
  const resolved=fs.realpathSync(root), temp=fs.realpathSync(os.tmpdir());
  assert(path.relative(temp,resolved).startsWith('xdx-session-contract-'));
  fs.rmSync(resolved,{recursive:true,force:true});
}
