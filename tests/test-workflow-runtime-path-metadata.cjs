'use strict';
const test=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'), path=require('node:path'), vm=require('node:vm'), {createHash}=require('node:crypto');
const source=fs.readFileSync(path.join(__dirname,'../.agents/skills/aistudio/scripts/aistudio.js'),'utf8');
const loaded=new Map();
function load(name){
  if(loaded.has(name))return;
  const match=new RegExp('^function '+name.replace(/[$]/g,'\\$')+'\\(','m').exec(source);if(!match)return;
  let code,end=source.indexOf('}',match.index);
  while(end>=0){code=source.slice(match.index,end+1);try{new vm.Script(code);break;}catch{end=source.indexOf('}',end+1);}}
  assert(end>=0);loaded.set(name,code);
  for(const m of code.matchAll(/(?<![\w.$])([A-Za-z_$][\w$]*)\s*\(/g))load(m[1]);
}
for(const name of ['Wce','atlasObservedScenarioData','atlasScenarioCapturePolicy'])load(name);
const ctx=vm.createContext({O:new Proxy({},{get:(_,key)=>key}),Dp:createHash});
const stages=source.indexOf('const yo = [');assert(stages>=0);
vm.runInContext(source.slice(stages,source.indexOf('];',stages)+2)+'\n'+[...loaded.values()].join('\n'),ctx);
const plain=x=>JSON.parse(JSON.stringify(x));
const nodes=new Map(['FETCH_SUPPLIERS','XDX_FAILURE_READ','FETCH_DETAIL'].map(code=>[code,{code,type:'BO_FUNCTION'}]));
nodes.set('DISPLAY',{code:'DISPLAY',type:'LLM'});
function scenario(){return{id:'app-init-display',suggestedTestName:'init-display',scenarioKind:'app-stage',appStage:'InitDisplay',notes:[],pathSource:'predicted',requiresRuntimePathValidation:true,recordablePath:['FETCH_SUPPLIERS','XDX_FAILURE_READ'],dataPathSignature:'FETCH_SUPPLIERS,XDX_FAILURE_READ',expectedPath:{mustExecute:['FETCH_SUPPLIERS','XDX_FAILURE_READ','DISPLAY'],mustNotExecute:['FETCH_DETAIL']}};}
test('actual observed adoption drops predicted-only records and adds newly observed records',()=>{
  const s=scenario(), assertions={mustExecute:['FETCH_DETAIL','DISPLAY'],mustNotExecute:['FETCH_SUPPLIERS','XDX_FAILURE_READ']};
  const adopted=ctx.Wce({scenario:s,testFile:{pathAssertions:assertions,input:{}},runtimeValidatedTestNames:new Set([s.id])});
  const actual=ctx.atlasObservedScenarioData(adopted,nodes);
  assert.deepEqual(plain(actual.recordablePath),['FETCH_DETAIL']);assert.equal(actual.dataPathSignature,'FETCH_DETAIL');
  assert.equal(actual.pathSource,'observed');assert.equal(actual.requiresRuntimePathValidation,false);
  assert.deepEqual(s.recordablePath,['FETCH_SUPPLIERS','XDX_FAILURE_READ']);
});
test('observed path without records clears stale inventory and signature',()=>{
  const s={...scenario(),pathSource:'observed',expectedPath:{mustExecute:['DISPLAY'],mustNotExecute:['FETCH_SUPPLIERS','XDX_FAILURE_READ','FETCH_DETAIL']}};
  const actual=ctx.atlasObservedScenarioData(s,nodes);assert.deepEqual(plain(actual.recordablePath),[]);assert.equal(actual.dataPathSignature,'');
});
test('predictions and loop-boundary replay retain their separate data contracts',()=>{
  const s=scenario();assert.equal(ctx.atlasObservedScenarioData(s,nodes),s);
  const loop={...s,pathSource:'observed',coverage:{role:'loop-boundary'}};assert.equal(ctx.atlasObservedScenarioData(loop,nodes),loop);
});
for(const kind of ['primary-path','app-stage','branch-path'])test('unproven '+kind+' cannot be downgraded to baseline replay',()=>{
  let calls=0;const actual=ctx.atlasScenarioCapturePolicy({...scenario(),scenarioKind:kind},()=>{calls++;return{dataCapturePolicy:'baseline-replay',baseTestFile:'old.json'};});
  assert.deepEqual(plain(actual),{dataCapturePolicy:'record-now'});assert.equal(calls,0);
});
test('observed scenarios and unsupported candidate kinds retain ordinary capture policy',()=>{
  const baseline={dataCapturePolicy:'baseline-replay',baseTestFile:'ready.json'};
  assert.equal(ctx.atlasScenarioCapturePolicy({...scenario(),requiresRuntimePathValidation:false},()=>baseline),baseline);
  assert.equal(ctx.atlasScenarioCapturePolicy({...scenario(),scenarioKind:'loop-boundary'},()=>baseline),baseline);
});

test('F37 observed routing replaces stale lookup outcomes without guessing shared-successor labels',()=>{
  const branch=(code,outcomes)=>({id:code,code,type:'SWITCH',outcomes,inputs:[{name:'caseExpression',value:'{{$context.$variables.route}}'}]});
  const all=[branch('ROUTE_OPERATION',{site:'GET_SITE',supplier:'GET_SUPPLIER'}),
    {id:'GET_SITE',code:'GET_SITE',type:'BO_FUNCTION'},
    branch('ROUTE_SITE_ADDRESS',{address:'RESOLVE_ADDRESS',bu:'SITE_BU_INPUT',display:'SITE_BU_INPUT'}),
    {id:'SITE_BU_INPUT',code:'SITE_BU_INPUT',type:'CODE'},
    branch('ROUTE_SITE_BU',{bu:'LIST_BU',display:'DISPLAY'}),
    {id:'DISPLAY',code:'DISPLAY',type:'LLM'},
    ...['GET_SUPPLIER','RESOLVE_ADDRESS','LIST_BU'].map(code=>({id:code,code,type:'BO_FUNCTION'}))];
  const byCode=new Map(all.map(n=>[n.code,n]));
  const s={...scenario(),pathSource:'observed',targetBranch:{nodeCode:'ROUTE_OPERATION',outcome:'site'},
    expectedPath:{mustExecute:['ROUTE_OPERATION','GET_SITE','ROUTE_SITE_ADDRESS','SITE_BU_INPUT','ROUTE_SITE_BU','DISPLAY'],mustNotExecute:['GET_SUPPLIER','RESOLVE_ADDRESS','LIST_BU']},
    routingDecisionContext:[{nodeCode:'ROUTE_SITE_ADDRESS',expectedOutcome:'address'},{nodeCode:'ROUTE_SITE_BU',expectedOutcome:'bu'},{nodeCode:'SKIPPED_ROUTER',expectedOutcome:'wrong'}]};
  const before=JSON.stringify(s),actual=ctx.atlasObservedScenarioData(s,byCode),routing=actual.routingDecisionContext;
  assert(routing.find(r=>r.nodeCode==='ROUTE_OPERATION'),'Observed routing must be rebuilt from the adopted path');
  assert.equal(routing.find(r=>r.nodeCode==='ROUTE_OPERATION').expectedOutcome,'site');
  assert.equal(routing.find(r=>r.nodeCode==='ROUTE_SITE_BU').expectedOutcome,'display');
  assert.equal(Object.hasOwn(routing.find(r=>r.nodeCode==='ROUTE_SITE_ADDRESS'),'expectedOutcome'),false);
  assert.equal(routing.some(r=>r.nodeCode==='SKIPPED_ROUTER'),false);
  assert.deepEqual(plain(actual.targetBranch),s.targetBranch);
  assert.deepEqual(plain(actual.recordablePath),['GET_SITE']);
  assert.equal(JSON.stringify(s),before);
});

function genericBranchBinding(){
  const s={...scenario(),id:'ROUTE_SITE-parent-path',suggestedTestName:'route-site-parent-path',scenarioKind:'branch-path',targetBranch:{nodeCode:'ROUTE_SITE',outcome:'parent'}};
  delete s.appStage;
  const input={message:'Show site 784 for supplier 1512',triggerType:'app',parameters:{appHint:'Query'}};
  const testFile={input,scenario:{custom:false,source:'sync-plan',id:s.id,kind:'branch-path'},pathAssertions:{mustExecute:['FETCH_DETAIL','DISPLAY'],mustNotExecute:['FETCH_SUPPLIERS','XDX_FAILURE_READ']}};
  testFile.pathBinding={derivedFrom:'live_execution',inputHash:ctx.Hn(input),workflowDefinitionHash:'current-workflow'};
  return{scenario:s,testFile,currentWorkflowDefHash:'current-workflow'};
}
test('F37 generic branch adopts current matching persisted input when no authoritative suggestion exists',()=>{
  const e=genericBranchBinding(),actual=ctx.Wce(e);
  assert.equal(actual.pathSource,'observed');
  assert.equal(actual.requiresRuntimePathValidation,false);
  assert.deepEqual(plain(actual.expectedPath),e.testFile.pathAssertions);
  assert.deepEqual(plain(actual.targetBranch),e.scenario.targetBranch);
});
test('F37 generic fallback rejects stale hashes and custom or mismatched scenario identity',()=>{
  for(const change of [
    e=>e.testFile.input.message='Changed input',
    e=>e.testFile.pathBinding.workflowDefinitionHash='stale-workflow',
    e=>e.testFile.scenario.custom=true,
    e=>e.testFile.scenario.source='user',
    e=>e.testFile.scenario.id='OTHER-parent-path',
    e=>e.testFile.scenario.kind='primary-path',
    e=>e.scenario.scenarioKind='switch-value',
    e=>e.scenario.appStage='InitDisplay',
    e=>delete e.testFile.scenario
  ]){const e=genericBranchBinding();change(e);assert.equal(ctx.Wce(e).pathSource,'predicted');}
});
test('F37 generic branch keeps authoritative suggested input precedence',()=>{
  const e=genericBranchBinding();e.scenario.suggestedInput={message:'Authoritative input'};
  assert.equal(ctx.Wce(e).pathSource,'predicted');
  e.scenario.suggestedInput=e.testFile.input;
  assert.equal(ctx.Wce(e).pathSource,'observed');
  for(const input of [null,{}]){const f=genericBranchBinding();f.scenario.suggestedInput=input;assert.equal(ctx.Wce(f).pathSource,'predicted');}
});
