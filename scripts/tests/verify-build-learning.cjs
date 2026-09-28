'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');
const { verify } = require('../verify-build-learning.cjs');
const cli = path.resolve(__dirname, '../verify-build-learning.cjs');
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'learning-contract-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (p, value) => { const f = path.join(root, p); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, value); };
  write('docs/lessons/rule.md', 'canonical rule'); write('source.cjs', 'source'); write('proof.json', '{"result":"pass"}'); write('failure.txt', 'observed failure');
  const ref = p => ({ path: p, sha256: createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex') });
  const closed = () => ({ id: 'F1', observedUtc: '2026-09-28T00:00:00.1234567Z', symptom: 'Known query failed', cause: 'Missing header', scope: 'supplier', blocks: ['supplier'], status: 'closed', occurrenceEvidence: [ref('failure.txt')], correction: 'Added explicit header', prevention: { kind: 'gate', owner: 'docs/lessons/rule.md', rule: 'Check header' }, verification: { evidence: [ref('proof.json')], sources: [ref('source.cjs')], command: 'DO NOT EXECUTE THIS', result: 'pass', reviewer: 'independent-reviewer' } });
  const ledger = { schemaVersion: 1, taskId: 'task', scopes: ['supplier', 'other'], failures: [closed()] };
  const run = (phase = 'Startup', scope, overrides = {}) => { write('ledger.json', JSON.stringify(ledger)); return verify(root, 'ledger.json', { phase, scope, taskId: 'task', ...overrides }); };
  return { root, write, ref, closed, ledger, run };
}
test('missing ledger, invalid identity/schema, duplicate ids and impossible UTC dates fail closed', t => {
  const f = fixture(t);
  assert.equal(verify(f.root, 'missing.json', {phase:'Startup',taskId:'task'}).ok, false);
  assert.equal(f.run('Startup', null, {taskId:'wrong'}).ok, false);
  f.ledger.schemaVersion=2; assert.equal(f.run().ok,false);f.ledger.schemaVersion=1;
  f.ledger.failures.push(f.closed());assert.equal(f.run().ok,false);f.ledger.failures.pop();
  for(const date of ['2026-02-30T00:00:00Z','2026-09-28','2026-09-28T00:00:00+00:00']) {f.ledger.failures[0].observedUtc=date;assert.equal(f.run().ok,false,date)}
});
for (const change of ['changed','removed']) test(`current source ${change} is scoped drift without reopening historical closure`, t => {
  const f=fixture(t);assert.equal(f.run('Closeout').ok,true);
  if(change==='changed') f.write('source.cjs','changed'); else fs.unlinkSync(path.join(f.root,'source.cjs'));
  for(const [phase,scope,ok] of [['Startup',undefined,true],['Execute','other',true],['PhaseExit','other',true],['Execute','supplier',false],['PhaseExit','supplier',false],['Closeout',undefined,false]]) {
    const r=f.run(phase,scope);assert.equal(r.ok,ok,`${phase}/${scope}`);assert.equal(r.failures[0].status,'closed');assert.equal(r.failures[0].issues.length,0);assert.equal(r.failures[0].sourceDrift.length,1);
  }
  assert.equal(JSON.parse(fs.readFileSync(path.join(f.root,'ledger.json'))).failures[0].status,'closed');
  f.ledger.failures[0].blocks=['*'];assert.equal(f.run('Execute','other').ok,false);assert.equal(f.run('PhaseExit','other').ok,false);
});

for(const field of ['occurrenceEvidence','evidence']) for(const change of ['tampered','missing']) test(`${field} ${change} remains globally blocking in every phase`,t=>{
  const f=fixture(t), target=field==='occurrenceEvidence'?'failure.txt':'proof.json';
  if(change==='tampered')f.write(target,'tampered');else fs.unlinkSync(path.join(f.root,target));
  for(const [phase,scope] of [['Startup'],['Execute','other'],['PhaseExit','other'],['Closeout']]) assert.equal(f.run(phase,scope).ok,false,phase);
});

test('source syntax, traversal, missing ancestor traversal and symlinks remain global structural failures',t=>{
  const f=fixture(t), ref=f.ledger.failures[0].verification.sources[0];
  for(const bad of ['../absent.cjs','missing/../source.cjs','C:/absent.cjs','missing\\source.cjs']) {
    ref.path=bad;for(const [phase,scope]of [['Startup'],['Execute','other'],['PhaseExit','other'],['Closeout']])assert.equal(f.run(phase,scope).ok,false,bad);
  }
  ref.path='missing/source.cjs';ref.sha256='invalid';assert.equal(f.run().ok,false);
  ref.sha256=f.ref('source.cjs').sha256;
  fs.symlinkSync(path.join(f.root,'docs'),path.join(f.root,'linked'),'junction');ref.path='linked/absent.cjs';assert.equal(f.run().ok,false);
  ref.path='missing/source.cjs';assert.equal(f.run().ok,true);assert.equal(f.run('Execute','supplier').ok,false);
});
test('open and fixed failures allowed at Startup but block declared scopes and all Closeout',t=>{
  const f=fixture(t);for(const status of ['open','fixed']) {f.ledger.failures[0].status=status;assert.equal(f.run().ok,true);assert.equal(f.run('Execute','other').ok,true);assert.equal(f.run('Execute','supplier').ok,false);assert.equal(f.run('PhaseExit','supplier').ok,false);assert.equal(f.run('Closeout').ok,false)}
  f.ledger.failures[0].blocks=['*'];assert.equal(f.run('Execute','other').ok,false);assert.equal(f.run('Execute').ok,false);
});
test('empty ledger needs explicit no-failure reason',t=>{const f=fixture(t);f.ledger.failures=[];assert.equal(f.run().ok,false);f.ledger.noFailuresReason='No observed failures';assert.equal(f.run('Closeout').ok,true)});
test('missing original evidence needs disclosed gap; closure still needs later verification',t=>{
  const f=fixture(t);delete f.ledger.failures[0].occurrenceEvidence;assert.equal(f.run().ok,false);f.ledger.failures[0].evidenceGap='Original output lost; later reproduction retained in proof';assert.equal(f.run('Closeout').ok,true);assert.match(f.run().failures[0].evidenceGap,/lost/);f.ledger.failures[0].verification.evidence=[];assert.equal(f.run('Closeout').ok,false);
});
test('procedure needs non-automation rationale and canonical owner',t=>{
  const f=fixture(t);const p=f.ledger.failures[0].prevention;p.kind='procedure';assert.equal(f.run().ok,false);p.reason='Requires direct native UI observation';assert.equal(f.run('Closeout').ok,true);p.owner='source.cjs';assert.equal(f.run().ok,false);p.owner='docs/lessons/missing.md';assert.equal(f.run().ok,false);
});
test('relative traversal absolute backslash and symlink evidence are rejected',t=>{
  const f=fixture(t);for(const bad of ['../proof.json','/proof.json','C:/proof.json','docs/../proof.json','docs\\proof.json']) {f.ledger.failures[0].verification.evidence[0].path=bad;assert.equal(f.run().ok,false,bad)}
  const out=fs.mkdtempSync(path.join(os.tmpdir(),'learning-outside-'));t.after(()=>fs.rmSync(out,{recursive:true,force:true}));fs.writeFileSync(path.join(out,'proof.json'),'outside');fs.symlinkSync(out,path.join(f.root,'linked'),'junction');f.ledger.failures[0].verification.evidence[0].path='linked/proof.json';assert.equal(f.run().ok,false);
});
test('in-root symlink owner still prohibited and ledger itself confined',t=>{
  const f=fixture(t);fs.symlinkSync(path.join(f.root,'docs/lessons'),path.join(f.root,'rules'),'junction');f.ledger.failures[0].prevention.owner='docs/lessons/../../rules/rule.md';assert.equal(f.run().ok,false);assert.equal(verify(f.root,'../ledger.json',{phase:'Startup',taskId:'task'}).ok,false);
});
test('failed command ends must map to captured failure even at Startup',t=>{
  const f=fixture(t);f.ledger.commandReceipts=['commands.jsonl'];f.write('commands.jsonl',JSON.stringify({event:'end',runId:'r1',exitCode:1,status:'failed'})+'\n');assert.equal(f.run().ok,false);f.ledger.failures[0].commandRunIds=['r1'];assert.equal(f.run('Closeout').ok,true);f.write('commands.jsonl',JSON.stringify({event:'end',runId:'r2',exitCode:0,semanticOutcome:'failed'})+'\n');assert.equal(f.run().ok,false);
});
test('intentional failing tests need reason and current hashed exception evidence',t=>{
  const f=fixture(t);f.ledger.commandReceipts=['commands.jsonl'];f.write('commands.jsonl',JSON.stringify({event:'end',runId:'negative',exitCode:2})+'\n');f.ledger.expectedFailureRuns=[{runId:'negative',reason:'Intentional negative fixture',evidence:[f.ref('proof.json')]}];assert.equal(f.run().ok,true);f.ledger.expectedFailureRuns[0].reason='';assert.equal(f.run().ok,false);f.ledger.expectedFailureRuns[0].reason='negative';f.write('proof.json','changed');assert.equal(f.run().ok,false);
});
test('malformed command receipts and failed processes cannot evade coverage',t=>{
  const f=fixture(t);f.ledger.commandReceipts=['commands.jsonl'];for(const event of [{event:'end',runId:'r',exitCode:'1'},{event:'end',runId:'r',exitCode:0,status:'spawn-failed'},null]) {f.write('commands.jsonl',JSON.stringify(event)+'\n');assert.equal(f.run().ok,false)}f.write('commands.jsonl','not json');assert.equal(f.run().ok,false);
});
test('CLI is zero-side-effect for success and failure and never executes recorded command',t=>{
  const f=fixture(t);f.ledger.failures[0].verification.command=`node -e "require('fs').writeFileSync('forbidden','x')"`;f.run();
  const before=fs.readFileSync(path.join(f.root,'ledger.json'));
  const args=[cli,f.root,'ledger.json','Closeout','-','task'];const good=spawnSync(process.execPath,args,{cwd:f.root,encoding:'utf8'});assert.equal(good.status,0,good.stdout+good.stderr);assert.equal(JSON.parse(good.stdout).executesCommands,false);assert.deepEqual(fs.readFileSync(path.join(f.root,'ledger.json')),before);assert.equal(fs.existsSync(path.join(f.root,'forbidden')),false);
  f.write('source.cjs','stale');const bad=spawnSync(process.execPath,args,{cwd:f.root,encoding:'utf8'});assert.equal(bad.status,1);assert.equal(JSON.parse(bad.stdout).ok,false);assert.deepEqual(fs.readFileSync(path.join(f.root,'ledger.json')),before);
});
test('later semantic failed outcome after zero exit must be captured and cannot be erased by later pass',t=>{
  const f=fixture(t);f.ledger.commandReceipts=['commands.jsonl'];const events=[{event:'start',runId:'semantic',status:'running'},{event:'end',runId:'semantic',exitCode:0,status:'succeeded'},{event:'outcome',runId:'semantic',semanticOutcome:'failed',evidence:'proof.json'},{event:'outcome',runId:'semantic',semanticOutcome:'passed',evidence:'proof.json'}];f.write('commands.jsonl',events.map(e=>JSON.stringify(e)).join('\n')+'\n');assert.equal(f.run().ok,false);f.ledger.failures[0].commandRunIds=['semantic'];assert.equal(f.run('Closeout').ok,true);
});
test('unrecognized noFiles/noSources annotations never waive mandatory closed source evidence',t=>{const f=fixture(t);f.ledger.failures[0].verification.sources=[];f.ledger.failures[0].verification.noFiles=true;f.ledger.failures[0].verification.noSourcesReason='Not applicable';assert.equal(f.run('Closeout').ok,false)});
test('registered scopes reject typo bypass and unknown entry/block scopes',t=>{
  const f=fixture(t);f.ledger.failures[0].status='open';assert.equal(f.run('Execute','suplier').ok,false);assert.equal(f.run('PhaseExit','SUPlier').ok,false);assert.equal(f.run('Execute','other').ok,true);
  f.ledger.failures[0].scope='missing';assert.equal(f.run().ok,false);f.ledger.failures[0].scope='supplier';f.ledger.failures[0].blocks=['typo'];assert.equal(f.run().ok,false);f.ledger.failures[0].blocks=['*'];assert.equal(f.run().ok,true);assert.equal(f.run('Execute','other').ok,false);
  for(const scopes of [undefined,[],['supplier','supplier'],['supplier','*'],['supplier',' trailing ']]){f.ledger.scopes=scopes;assert.equal(f.run().ok,false)}
});
