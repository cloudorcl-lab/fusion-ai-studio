'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { screen } = require('../scripts/screen-model-candidate.cjs');
const { evaluate, render, pointer } = require('../scripts/build-evidence-status.cjs');
const contract = () => ({schemaVersion:1, workflowCode:'XDX_TEST', version:42, runLabel:'candidate-1', screeningTests:['a','b'], finalTests:['a','b','c']});
const result = name => ({testName:name, workflow:{workflowCode:'XDX_TEST',version:42},runLabel:'candidate-1',status:'passed',evaluationMode:'hybrid',judge:{status:'passed',passed:true},deterministicFailures:[]});
test('screening stops on confirmed contract failure before remaining cases', () => {
  const a=result('a'); a.status='failed'; a.deterministicFailures=['invalid JSON'];
  const r=screen(contract(),[a]); assert.equal(r.decision,'reject'); assert.deepEqual(r.missing,['b']); assert.equal(r.accepted,false);
});
test('judge and environment uncertainty never reject as model defect or pass', () => {
  for(const status of ['needs-judge','error']) { const a=result('a'); a.status=status; delete a.judge; assert.equal(screen(contract(),[a,result('b')]).decision,'incomplete'); }
});
test('complete screen remains only eligible and preserves final inventory', () => {
  const r=screen(contract(),[result('a'),result('b')]); assert.equal(r.decision,'eligible-for-full-regression'); assert.equal(r.accepted,false); assert.equal(r.finalSavedVersionAcceptanceRequired,true); assert.deepEqual(r.finalTests,['a','b','c']);
});
test('semantic failure rejects and hidden pending conversation step blocks', () => {
  const a=result('a'); a.judge.passed=false; assert.equal(screen(contract(),[a]).decision,'reject');
  a.judge.passed=true; a.steps=[{status:'needs-judge',evaluationMode:'hybrid'}]; assert.equal(screen(contract(),[a,result('b')]).decision,'incomplete');
});
test('conversation cannot hide failed aggregate judge or absent step evidence', () => {
  const a=result('a'); a.steps=[{status:'passed',evaluationMode:'deterministic',deterministicFailures:[]}]; a.judge={status:'failed'};
  assert.equal(screen(contract(),[a,result('b')]).decision,'reject');
  a.judge={status:'passed',passed:true}; a.steps=[{evaluationMode:'deterministic'}];
  assert.equal(screen(contract(),[a,result('b')]).decision,'incomplete');
  a.steps=[{status:'passed',evaluationMode:'deterministic',deterministicFailures:[]}]; a.judge={status:'pending'};
  assert.equal(screen(contract(),[a,result('b')]).decision,'incomplete');
});
test('wrong workflow version label duplicate or unknown results fail closed', () => {
  for(const alter of [r=>r.workflow.version=41,r=>r.workflow.workflowCode='OTHER',r=>r.runLabel='old',r=>r.status='unknown',r=>r.testName='other',r=>delete r.deterministicFailures]) { const a=result('a'); alter(a); assert.throws(()=>screen(contract(),[a])); }
  assert.throws(()=>screen(contract(),[result('a'),result('a')]));
});
test('malformed screening contracts cannot omit final obligations', () => {
  for(const alter of [c=>c.finalTests=[],c=>c.finalTests=['a'],c=>c.screeningTests=['a','a'],c=>delete c.version]) {const c=contract();alter(c);assert.throws(()=>screen(c,[]));}
});
function fixture(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'xdx-evidence-')); t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const bytes=JSON.stringify({version:42,runLabel:'current',summary:{failed:0,needsJudge:0},status:'passed'}); fs.writeFileSync(path.join(root,'proof.json'),bytes);
  const ref={path:'proof.json',sha256:createHash('sha256').update(bytes).digest('hex'),checks:[{pointer:'/version',equals:42},{pointer:'/runLabel',equals:'current'},{pointer:'/status',equals:'passed'},{pointer:'/summary/needsJudge',equals:0}]};
  return {root,manifest:{schemaVersion:1,taskId:'test',sources:[{path:ref.path,sha256:ref.sha256}],requirements:[{id:'R1',description:'current proof',status:'passed',evidence:[ref]}]}};
}
test('one manifest drives all views and remains read-only', t=>{const {root,manifest}=fixture(t);const r=evaluate(manifest,root);assert.equal(r.closeoutEligible,true);for(const v of ['status','requirements','gaps','closeout'])assert.match(render(r,v),/test: complete/);assert.deepEqual(fs.readdirSync(root),['proof.json']);});
test('changed source or wrong version blocks instead of accepting stale pass',t=>{const {root,manifest}=fixture(t);manifest.requirements[0].evidence[0].checks[0].equals=43;assert.equal(evaluate(manifest,root).status,'incomplete');fs.appendFileSync(path.join(root,'proof.json'),' ');assert.match(evaluate(manifest,root).gaps[0].issues[0],/Stale/);});
test('missing evidence, missing checks and pending requirements block',t=>{const {root,manifest}=fixture(t);const row=manifest.requirements[0];row.evidence[0].checks=[];assert.equal(evaluate(manifest,root).closeoutEligible,false);row.evidence=[];assert.equal(evaluate(manifest,root).closeoutEligible,false);row.status='pending';assert.equal(evaluate(manifest,root).closeoutEligible,false);});
test('traversal and missing evidence field block',t=>{const {root,manifest}=fixture(t);const ref=manifest.requirements[0].evidence[0];ref.path='../proof.json';assert.equal(evaluate(manifest,root).closeoutEligible,false);ref.path='proof.json';ref.checks=[{pointer:'/missing',equals:null}];assert.equal(evaluate(manifest,root).closeoutEligible,false);});
test('duplicate requirement and empty manifest rejected; not-applicable requires reason',t=>{const {root,manifest}=fixture(t);manifest.requirements.push(manifest.requirements[0]);assert.throws(()=>evaluate(manifest,root));manifest.requirements=[];assert.throws(()=>evaluate(manifest,root));manifest.requirements=[{id:'NA',description:'No remote calls',status:'not-applicable'}];assert.equal(evaluate(manifest,root).closeoutEligible,false);manifest.requirements[0].reason='Local tooling';assert.equal(evaluate(manifest,root).closeoutEligible,true);});
test('JSON pointers decode escapes and never read inherited values',()=>{assert.equal(pointer({'a/b':{'~':1}},'/a~1b/~0'),1);assert.throws(()=>pointer({},'/toString'));assert.throws(()=>pointer({},'/~2'));});
test('missing frozen source inventory or changed implementation blocks all views',t=>{const {root,manifest}=fixture(t);manifest.sources=[];assert.equal(evaluate(manifest,root).closeoutEligible,false);manifest.sources=[{path:'missing.cjs',sha256:'a'.repeat(64)}];const r=evaluate(manifest,root);assert.equal(r.closeoutEligible,false);assert.match(render(r,'gaps'),/Source:/);});
