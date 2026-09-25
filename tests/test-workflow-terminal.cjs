const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../.agents/skills/aistudio/scripts/aistudio.js'), 'utf8');
const names = ['OC','db','wt','Ct','li','ew','Q_','nL','jo','Wo','Ip','tL','Bse','Wse','Hl','Lse','xC','_se','Se','G_','DC','$C','QE','VC','JC'];
const code = names.map(name => {
 const start = source.indexOf('function '+name+'(');
 assert(start >= 0, 'Missing actual CLI function '+name);
 const end = source.indexOf('\n}', start);
 assert(end > start);
 return source.slice(start, end+2);
}).join('\n');
const ctx = vm.createContext({O: new Proxy({}, {get:(_,key)=>key})});
const semanticTypesStart = source.indexOf('fse = /*');
assert(semanticTypesStart >= 0);
vm.runInContext('const '+source.slice(semanticTypesStart, source.indexOf(']);', semanticTypesStart)+3)+'\n'+code, ctx);
const node=(id,type='CODE',next)=>({id,code:id,type,outcomes:next ? {next}: {}});
const workflow = nodes => ({specification:{dataPipeline:{pipelineNodes:nodes}}});
const graph=()=>workflow([node('START','START','ROUTE'),node('DISPLAY','LLM','END'),node('ROUTE','SWITCH','DISPLAY'),node('END','END')]);
const resolve=(wf,codes,extra={})=>ctx.OC({workflow:wf,pathAssertions:{mustExecute:codes,mustNotExecute:[]},...extra});
test('coverage declaration order does not determine terminal',()=>assert.equal(resolve(graph(),['DISPLAY','ROUTE']),'DISPLAY'));
test('object path entries and reordered declarations retain terminal',()=>{
 const wf=graph(); wf.specification.dataPipeline.pipelineNodes.reverse();
 assert.equal(resolve(wf,[{nodeCode:'DISPLAY'},{nodeCode:'ROUTE'}]),'DISPLAY');
});
test('recorded coverage partition resolves without treating it as a sequence',()=>{
 const result=ctx.Lse({workflow:graph(),run:{nodeResults:{START:{},ROUTE:{},DISPLAY:{},END:{}}}});
 assert.equal(ctx.OC({workflow:graph(),pathAssertions:result}),'DISPLAY');
});
test('literal RETURN after LLM is terminal',()=>assert.equal(resolve(workflow([node('LLM','LLM','RETURN'),node('RETURN','RETURN','END'),node('END','END')]),['RETURN','LLM']),'RETURN'));
test('nonassertable connector does not create a second terminal',()=>assert.equal(resolve(workflow([node('A','CODE','ADD'),node('ADD','ADD','B'),node('B','LLM')]),['B','A']),'B'));
test('disconnected or conflicting terminals fail closed',()=>assert.throws(()=>resolve(workflow([node('A','LLM'),node('B','LLM')]),['A','B']),/terminal|ambiguous/i));
test('cycle without a terminal fails closed',()=>assert.throws(()=>resolve(workflow([node('A','CODE','B'),node('B','CODE','A')]),['B','A']),/terminal|ambiguous/i));
test('unknown asserted node fails closed',()=>assert.throws(()=>resolve(graph(),['DISPLAY','UNKNOWN']),/unknown/i));
test('empty explicit path never fabricates terminal',()=>assert.equal(resolve(graph(),[]),undefined));
test('unselected executable path is not silently traversed',()=>assert.throws(()=>resolve(workflow([node('A','CODE','MISSING'),node('MISSING','CODE','B'),node('B','LLM')]),['B','A']),/terminal|ambiguous/i));
test('stale or conflicting observed metadata cannot override current graph',()=>assert.equal(resolve(graph(),['DISPLAY','ROUTE'],{pathBinding:{workflowDefinitionHash:'stale',observedTerminalNodeCode:'ROUTE'}}),'DISPLAY'));
test('selected convergent branches have one terminal',()=>assert.equal(resolve(workflow([node('A','CODE','C'),node('B','CODE','C'),node('C','LLM')]),['C','B','A']),'C'));

test('partial path cannot promote an upstream LLM to terminal',()=>assert.throws(()=>resolve(workflow([node('A','LLM','B'),node('B','CODE')]),['A']),/terminal|continuation/i));
test('disconnected cycle beside terminal fails closed',()=>assert.throws(()=>resolve(workflow([node('A','CODE','B'),node('B','CODE','A'),node('C','LLM')]),['A','B','C']),/disconnected/i));

test('nested loop boundary resolves to outer terminal',()=>{
 const loop=node('LOOP','LOOP','DISPLAY');
 loop.metadata={dataPipeline:{rootNode:'INNER_START',pipelineNodes:[node('INNER_START','START','BODY'),node('BODY','CODE','INNER_END'),node('INNER_END','END')]}};
 assert.equal(resolve(workflow([loop,node('DISPLAY','LLM')]),['DISPLAY','BODY','LOOP']),'DISPLAY');
});
test('referenceable block returns to caller terminal',()=>{
 const block=node('BLOCK','REFERENCEABLEBLOCK');
 block.metadata={dataPipeline:{rootNode:'INNER_START',pipelineNodes:[node('INNER_START','START','BODY'),node('BODY','CODE','INNER_END'),node('INNER_END','END')]}};
 const ref=node('REF','REFERENCE','DISPLAY');ref.metadata={referenceableBlockId:'BLOCK'};
 assert.equal(resolve(workflow([ref,block,node('DISPLAY','LLM')]),['DISPLAY','BODY','REF']),'DISPLAY');
});

test('actual conversation semantic gate accepts graph terminal with unordered coverage',()=>{
 const step={stepId:'query',pathAssertions:{mustExecute:['DISPLAY','ROUTE'],mustNotExecute:[]},judge:{expectedOutcome:'Display result',rubric:[]}};
 assert.doesNotThrow(()=>ctx.JC({workflow:graph(),conversation:{steps:[step]}}));
 assert.equal(step.judge.expectedOutcome,'Display result');
});
test('actual semantic gate still rejects unsupported terminal and expected wait',()=>{
 const judge={expectedOutcome:'Display result',rubric:[]};
 assert.throws(()=>ctx.JC({workflow:workflow([node('A')]),conversation:{steps:[{stepId:'code',pathAssertions:{mustExecute:['A']},judge}]}}),/not a supported semantic judge target/);
 assert.throws(()=>ctx.JC({workflow:graph(),conversation:{steps:[{stepId:'wait',expectedWait:{nodeCode:'WAIT',nodeType:'WAIT'},judge}]}}),/not a supported semantic judge target/);
});
