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
