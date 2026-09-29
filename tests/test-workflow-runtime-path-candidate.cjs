'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const source = fs.readFileSync(path.join(__dirname, '../.agents/skills/aistudio/scripts/aistudio.js'), 'utf8');
// Extract actual bundle functions and only their direct function dependencies.
// No planner implementation is copied or replaced by a test stub.
const loaded = new Map();
function load(name) {
  if (loaded.has(name)) return;
  const match = new RegExp('^function ' + name.replace(/[$]/g, '\$&') + '\\(', 'm').exec(source);
  const start = match ? match.index : -1;
  if (start < 0) return;
  let end = source.indexOf('}', start), code;
  while (end >= 0) {
    code = source.slice(start, end + 1);
    try { new vm.Script(code); break; } catch { end = source.indexOf('}', end + 1); }
  }
  assert(end > start, 'Unterminated bundle function ' + name);
  loaded.set(name, code);
  for (const m of code.matchAll(/(?<![\w.$])([A-Za-z_$][\w$]*)\s*\(/g)) load(m[1]);
}
for (const name of ['atlasRuntimePathCandidate', 'atlasValidateRuntimePathCandidate', 'atlasTopologyBranchNeedsValidation', 'q_', 'Zse', 'wle', 'Hn', 'Jo', 'xp']) load(name);
const ctx = vm.createContext({ O: new Proxy({}, { get: (_, key) => key }), Dp: createHash, structuredClone });
const semanticTypesStart = source.indexOf('fse = /*');
assert(semanticTypesStart >= 0);
const stagesStart = source.indexOf('const yo = [');
assert(stagesStart >= 0);
vm.runInContext(source.slice(stagesStart, source.indexOf('];', stagesStart) + 2) + '\nconst ' + source.slice(semanticTypesStart, source.indexOf(']);', semanticTypesStart) + 3) + '\n' + [...loaded.values()].join('\n'), ctx);
const node = (id, type, outcomes = {}, value) => ({ id, code: id, type, outcomes, inputs: value ? [{ name: 'expression', value }] : [] });
function fixture() {
  const workflow = { workflowCode: 'XDX_TEST', specification: { dataPipeline: { rootNode: 'START', variables: [{ name: 'state', type: 'object', scope: 'CONVERSATION' }], pipelineNodes: [
    node('START', 'START', { success: 'GUARD' }),
    node('GUARD', 'CONDITION', { true: 'BLOCK', false: 'ROUTER' }, '{{$context.$variables.state.frozen}}'),
    node('BLOCK', 'RETURN', { success: 'END' }),
    node('ROUTER', 'SWITCH', { InitDisplay: 'DISPLAY', Query: 'QUERY' }, '{{$context.$app.$OraMessageHint}}'),
    node('DISPLAY', 'LLM', { success: 'END' }), node('QUERY', 'LLM', { success: 'END' }), node('END', 'END')
  ] } } };
  const input = { message: '', triggerType: 'app', parameters: { appHint: 'InitDisplay' } };
  const pathAssertions = { mustExecute: ['GUARD', 'ROUTER', 'DISPLAY'], mustNotExecute: ['BLOCK', 'QUERY'] };
  const scenario = { id: 'app-init-display', scenarioKind: 'app-stage', requiresRuntimePathValidation: true, pathSource: 'predicted', appStage: 'InitDisplay', suggestedInput: input, expectedPath: { mustExecute: ['GUARD', 'BLOCK'], mustNotExecute: ['ROUTER', 'DISPLAY', 'QUERY'] } };
  const definition = { validateRuntimePath: true, pathAssertions };
  return { workflow, input, scenario, definition, dataCapturePolicy: 'record-now' };
}
function candidate(f = fixture()) {
  assert.equal(typeof ctx.atlasRuntimePathCandidate, 'function', 'Actual candidate helper must exist');
  return ctx.atlasRuntimePathCandidate(f);
}
function observation(f = fixture()) {
  return { candidate: candidate(f), workflow: f.workflow, testFile: { input: f.input, scenario: { id: f.scenario.id, custom: false }, pathAssertions: f.definition.pathAssertions }, run: { workflowCode: f.workflow.workflowCode, input: f.input, finishReason: 'stop', nodeResults: { START: {}, GUARD: {}, ROUTER: {}, DISPLAY: {}, END: {} }, executionTrace: ['START','GUARD','ROUTER','DISPLAY','END'].map(nodeCode => ({ nodeCode })) } };
}
function rejects(fn, expected) {
  assert.throws(fn, error => !['ReferenceError','AssertionError','TypeError'].includes(error.name) && (expected instanceof RegExp ? expected.test(error.message) : true));
}
const validate = value => { assert.equal(typeof ctx.atlasValidateRuntimePathCandidate, 'function'); return ctx.atlasValidateRuntimePathCandidate(value); };

test('candidate opt-in absent leaves ordinary strict scenario matching intact', () => {
  const f = fixture(); delete f.definition.validateRuntimePath;
  assert.equal(candidate(f), undefined);
  rejects(() => ctx.wle({ testName: 'init-display', scenario: f.scenario, suppliedPathAssertions: f.definition.pathAssertions, expectedPath: f.scenario.expectedPath }), /differ|conflict/);
});
test('unresolved state condition remains a prediction requiring runtime validation', () => {
  const f = fixture(), guard = f.workflow.specification.dataPipeline.pipelineNodes[1];
  for (const value of ['{{$context.$variables.state.frozen}}', '{{!$context.$variables.state.frozen}}']) {
    guard.inputs[0].value = value;
    const r = ctx.Zse({ node: guard, input: f.input, nodesByCode: new Map(), dependencies: [] });
    assert.equal(r.requiresRuntimePathValidation, true);
  }
});
test('known input-derived true and false condition routing is preserved', () => {
  const guard = node('C', 'CONDITION', { true: 'YES', false: 'NO' }, "{{$context.$triggers.REST.$input.choice === 'yes'}}");
  for (const [choice, expected] of [['yes', 'YES'], ['no', 'NO']]) {
    const r = ctx.Zse({ node: guard, input: { triggerType: 'rest', parameters: { choice } }, nodesByCode: new Map(), dependencies: [] });
    assert.equal(r.target, expected); assert.equal(r.inputDerived, true);
  }
});
test('valid candidate binds exact scenario input and workflow with off-path stops', () => {
  const f = fixture(), c = candidate(f);
  assert.equal(c.scenarioId, f.scenario.id); assert.equal(c.inputHash, ctx.Hn(f.input)); assert.equal(c.workflowDefinitionHash, ctx.Jo(f.workflow));
  assert.deepEqual(JSON.parse(JSON.stringify(c.pathAssertions)), f.definition.pathAssertions);
  assert.deepEqual(Array.from(ctx.xp(c.pathAssertions)).sort(), ['BLOCK','QUERY']);
  assert.doesNotThrow(() => validate(observation(f)));
});
for (const mode of ['record-later','model-generated','baseline-replay']) test('candidate rejects unobserved capture policy ' + mode, () => { const f=fixture(); f.dataCapturePolicy=mode; rejects(()=>candidate(f)); });
test('forged binding, malformed opt-in, proven and custom scenarios reject', () => {
  for (const change of [f=>f.definition.pathBinding={derivedFrom:'live_execution'},f=>f.definition.validateRuntimePath='true',f=>f.scenario.requiresRuntimePathValidation=false,f=>f.scenario.scenarioKind='custom',f=>delete f.scenario,f=>f.definition.scenario={custom:true},f=>f.definition.scenario={custom:false,id:'other-scenario'}]) {const f=fixture();change(f);rejects(()=>candidate(f));}
});
test('candidate requires complete disjoint known path partition', () => {
  for (const change of [p=>p.mustNotExecute.pop(),p=>p.mustExecute.push('UNKNOWN'),p=>p.mustNotExecute.push('DISPLAY'),p=>p.mustExecute=[]]) {const f=fixture();change(f.definition.pathAssertions);rejects(()=>candidate(f));}
});
test('candidate rejects unsupported loop reference parallel and suspension nodes', () => {
  for (const type of ['LOOP','WHILE','REFERENCE','PARALLEL','HUMAN','WAIT']) {const f=fixture();f.workflow.specification.dataPipeline.pipelineNodes[1].type=type;rejects(()=>candidate(f),type);}
});
test('app candidate cannot change stage or select the wrong stage terminal', () => {
  const inputWrong=fixture();inputWrong.input={...inputWrong.input,parameters:{appHint:'Query'}};rejects(()=>candidate(inputWrong));
  const pathWrong=fixture();pathWrong.definition.pathAssertions={mustExecute:['GUARD','ROUTER','QUERY'],mustNotExecute:['BLOCK','DISPLAY']};rejects(()=>candidate(pathWrong));
});
test('target branch must select its exact successor, not just include condition', () => {
  const f=fixture();f.scenario.scenarioKind='branch-path';f.scenario.targetBranch={nodeCode:'GUARD',outcome:'true'};rejects(()=>candidate(f));
  f.scenario.targetBranch.outcome='false';assert.doesNotThrow(()=>validate(observation(f)));
});
test('target branch rejects indistinguishable sibling outcomes sharing its destination',()=>{
  const f=fixture(); f.scenario.scenarioKind='branch-path'; f.scenario.targetBranch={nodeCode:'GUARD',outcome:'false'};
  f.workflow.specification.dataPipeline.pipelineNodes[1].outcomes.alternate='ROUTER';
  rejects(()=>candidate(f));
});
test('stale workflow or different input cannot validate the candidate', () => {
  const a=observation();a.workflow.specification.dataPipeline.pipelineNodes[1].inputs[0].value='changed';rejects(()=>validate(a));
  const b=observation();b.testFile.input={...b.testFile.input,message:'Different'};rejects(()=>validate(b));
});
test('observation rejects missing expected nodes and unexpected executable nodes', () => {
  const missing=observation();delete missing.run.nodeResults.DISPLAY;rejects(()=>validate(missing));
  const extra=observation();extra.run.nodeResults.BLOCK={};rejects(()=>validate(extra));
});
for (const finishReason of ['error','paused','wait','Workflow completed with error']) test('observation rejects completion '+finishReason,()=>{const o=observation();o.run.finishReason=finishReason;rejects(()=>validate(o));});
test('stage and branch cannot be forged after admission',()=>{
  const stage=observation();stage.candidate.appStage='Query';rejects(()=>validate(stage));
  const branch=observation();branch.candidate.targetBranch={nodeCode:'GUARD',outcome:'true'};rejects(()=>validate(branch));
});
test('coverage declaration order is set-valued but observed execution order is authoritative',()=>{
  const f=fixture(); f.definition.pathAssertions.mustExecute.reverse();
  assert.doesNotThrow(()=>validate(observation(f)));
  const wrong=observation(); wrong.run.nodeResults={START:{},ROUTER:{},GUARD:{},DISPLAY:{},END:{}};
  rejects(()=>validate(wrong));
});
test('convergent switch destinations require a unique complete candidate route',()=>{
  const f=fixture(), nodes=f.workflow.specification.dataPipeline.pipelineNodes;
  nodes[1].outcomes={true:'BLOCK',false:'ROUTER',alternate:'ROUTER',shortcut:'DISPLAY'};
  assert.doesNotThrow(()=>validate(observation(f)));
});
test('stop result with paused node or explicit error still rejects',()=>{
  const paused=observation(); paused.run.pausedNode='DISPLAY'; rejects(()=>validate(paused));
  const error=observation(); error.run.error='failed'; rejects(()=>validate(error));
});

test('retained Supplier InitDisplay structural projection admits candidate without promoting custom coverage',()=>{
  const fixturePath=path.join(__dirname,'fixtures/workflow-runtime-path-retained.json');
  const snapshot=fs.readFileSync(fixturePath,'utf8');
  const fixture=JSON.parse(snapshot),{workflow,retained,run}=fixture;
  assert.equal(fixture.schemaVersion,1);assert.equal(workflow.specification.dataPipeline.pipelineNodes.length,34);
  assert.equal(fixture.provenance.length,3);for(const source of fixture.provenance)assert.match(source.sha256,/^[a-f0-9]{64}$/);
  assert.equal(retained.scenario.custom,true);
  const scenario={id:'app-init-display',scenarioKind:'app-stage',appStage:'InitDisplay',requiresRuntimePathValidation:true,pathSource:'predicted',suggestedInput:retained.input};
  const f={workflow,input:retained.input,scenario,definition:{validateRuntimePath:true,pathAssertions:retained.pathAssertions},dataCapturePolicy:'record-now'};
  const c=candidate(f);
  assert.doesNotThrow(()=>validate({candidate:c,workflow,testFile:{...retained,scenario:{id:scenario.id,custom:false}},run}));
  rejects(()=>validate({candidate:c,workflow,testFile:retained,run}));
  assert.equal(fs.readFileSync(fixturePath,'utf8'),snapshot);
});

test('F37 unresolved flat topology branch is eligible without changing its predicted partition',()=>{
  assert.equal(typeof ctx.atlasTopologyBranchNeedsValidation,'function');
  const f=fixture(), nodes=f.workflow.specification.dataPipeline.pipelineNodes;
  const options={workflow:f.workflow,pathAssertions:f.definition.pathAssertions,input:f.input};
  const before=JSON.stringify(options);
  assert.equal(ctx.atlasTopologyBranchNeedsValidation(options),true);
  assert.equal(JSON.stringify(options),before);
  assert.match(source,/requiresRuntimePathValidation: atlasTopologyBranchNeedsValidation\(\{ workflow: e, pathAssertions: pt, input: xt \? yy\(e, xt, f\) : \{ message: "" \} \}\)/);
  const branch={...f.scenario,scenarioKind:'branch-path',targetBranch:{nodeCode:'GUARD',outcome:'false'},requiresRuntimePathValidation:ctx.atlasTopologyBranchNeedsValidation(options)};
  assert.doesNotThrow(()=>candidate({...f,scenario:branch}));
  nodes[1].inputs[0].value='{{$context.$app.$OraMessageHint}}'; nodes[1].type='SWITCH';
  assert.equal(ctx.atlasTopologyBranchNeedsValidation(options),false);
});

test('F37 nonflat unsupported paths remain outside topology branch eligibility',()=>{
  assert.equal(typeof ctx.atlasTopologyBranchNeedsValidation,'function');
  for(const type of ['LOOP','WHILE','PARALLEL','REFERENCE','REFERENCEABLEBLOCK','MULTI_AGENT','HUMAN','WAIT']){
    const f=fixture();f.workflow.specification.dataPipeline.pipelineNodes[1].type=type;
    assert.equal(ctx.atlasTopologyBranchNeedsValidation({workflow:f.workflow,pathAssertions:f.definition.pathAssertions,input:f.input}),false);
  }
  const f=fixture();f.workflow.specification.dataPipeline.pipelineNodes[1].metadata={dataPipeline:{}};
  assert.equal(ctx.atlasTopologyBranchNeedsValidation({workflow:f.workflow,pathAssertions:f.definition.pathAssertions,input:f.input}),false);
});

test('F37 eligibility invalidates only affected deferrals and retains legacy false fingerprints',()=>{
  const s={id:'site-bu-display',expectedPath:{mustExecute:['DISPLAY'],mustNotExecute:['CREATE']},targetBranch:{nodeCode:'BU',outcome:'display'},recommendedDataCapturePolicy:'model-generated'};
  const legacy=ctx.q_(s);
  assert.equal(ctx.q_({...s,requiresRuntimePathValidation:false}),legacy);
  assert.notEqual(ctx.q_({...s,requiresRuntimePathValidation:true}),legacy);
  assert.equal(ctx.q_({...s,id:'stateful-create',requiresRuntimePathValidation:false}),ctx.q_({...s,id:'stateful-create'}));
});
