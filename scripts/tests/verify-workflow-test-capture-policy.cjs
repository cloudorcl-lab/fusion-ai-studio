'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),{createHash}=require('node:crypto');
const {verifyPositiveBaseline:verify}=require('../verify-workflow-test-capture-policy.cjs');
function fixture(t){
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'capture-policy-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  const write=(name,value)=>fs.writeFileSync(path.join(root,name),typeof value==='string'?value:JSON.stringify(value));
  const ref=name=>({path:name,sha256:createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex')});
  write('workflow.wf',{workflowCode:'XDX_TEST',version:1});
  write('baseline.json',{workflow:{workflowCode:'XDX_TEST'},testData:{status:'ready',capturePolicy:'record-now',nodes:{READ:{response:{id:1},capture:{mode:'raw'}}}}});
  // Structural projection of actual list-workflow-tests text; no inferred JSON schema.
  write('inventory.txt','Workflow Tests\nTotal: 1, ready: 1, pending: 0\nWorkflow filter: XDX_TEST\nXDX_TEST  query  ready  record-now  file  hybrid  baseline.json\n');
  write('definition.json',{input:{message:'Alternate'},testDataOverrides:{READ:{response:{id:2},capture:{mode:'model-generated'}}}});
  const job={args:['do-generate-workflow-test','--file','workflow.wf','--data-capture-policy','model-generated','--base-test-file','baseline.json','--definition','@definition.json'],capturePolicyEvidence:{workflow:ref('workflow.wf'),baseline:ref('baseline.json'),inventory:ref('inventory.txt')}};
  return {root,write,ref,job,run:()=>verify(job,root)};
}
test('positive public inventory and ready baseline allow minimal model overrides without mutation',t=>{
  const f=fixture(t),before=fs.readFileSync(path.join(f.root,'baseline.json'));assert.equal(f.run().policy,'model-generated');assert.deepEqual(fs.readFileSync(path.join(f.root,'baseline.json')),before);
});
test('baseline replay allows input-only definition and rejects even empty override/full-data properties',t=>{
  const f=fixture(t);f.job.args[4]='baseline-replay';f.write('definition.json',{input:{message:'Alternate'}});assert.equal(f.run().policy,'baseline-replay');
  for(const key of ['testData','testDataOverrides']){f.write('definition.json',{[key]:{}});assert.throws(f.run,/forbids/);}
});
test('observed full standalone testData mistake blocked, no-baseline absence never inferred',t=>{
  const f=fixture(t);f.write('definition.json',{testData:{nodes:{READ:{response:{id:2}}}}});assert.throws(f.run,/full testData/);
  delete f.job.capturePolicyEvidence;assert.throws(f.run,/positive baseline evidence/);
});
for(const name of ['--file','--base-test-file','--definition','--data-capture-policy'])test(name+' missing duplicate and equal-form selectors rejected',t=>{
  const f=fixture(t),original=[...f.job.args],i=original.indexOf(name);
  for(const args of [original.filter((_,j)=>j!==i&&j!==i+1),[...original,name,original[i+1]],[...original,name+'='+original[i+1]]]){f.job.args=args;assert.throws(f.run,/one explicit/);}
});
for(const name of ['workflow.wf','baseline.json','inventory.txt'])test('changed '+name+' invalidates capture evidence',t=>{const f=fixture(t);f.write(name,'changed');assert.throws(f.run,/evidence changed/);});
test('workflow and baseline selectors and identities cannot be substituted',t=>{
  const f=fixture(t);f.job.args[2]='other.wf';assert.throws(f.run,/selector mismatch/);f.job.args[2]='workflow.wf';
  f.write('baseline.json',{workflow:{workflowCode:'OTHER'},testData:{status:'ready',capturePolicy:'record-now'}});f.job.capturePolicyEvidence.baseline=f.ref('baseline.json');assert.throws(f.run,/workflow mismatch/);
});
test('unready or synthetic baseline rejected even with matching hashes',t=>{
  const f=fixture(t);for(const data of [{status:'pending',capturePolicy:'record-now'},{status:'ready',capturePolicy:'model-generated'}]){f.write('baseline.json',{workflow:{workflowCode:'XDX_TEST'},testData:data});f.job.capturePolicyEvidence.baseline=f.ref('baseline.json');assert.throws(f.run,/ready/);}
});
test('ready non-record-now baselines remain valid for replay',t=>{
  const f=fixture(t);f.job.args[4]='baseline-replay';f.write('definition.json',{input:{message:'Replay'}});
  for(const capturePolicy of ['record-later','model-generated','baseline-replay']){
    f.write('baseline.json',{workflow:{workflowCode:'XDX_TEST'},testData:{status:'ready',capturePolicy,nodes:{}}});f.job.capturePolicyEvidence.baseline=f.ref('baseline.json');assert.equal(f.run().policy,'baseline-replay');
  }
});
test('model overrides must be nonempty, synthetic, and change baseline responses',t=>{
  const f=fixture(t);
  for(const value of [{},{testDataOverrides:{}},{testDataOverrides:{READ:{capture:{mode:'raw'},response:{id:2}}}},{testDataOverrides:{READ:{capture:{mode:'model-generated'}}}},{testDataOverrides:{READ:{capture:{mode:'model-generated'},response:{id:1}}}},{testDataOverrides:{READ:{input:{changed:true},capture:{mode:'model-generated'},response:{id:1}}}}]){
    f.write('definition.json',value);assert.throws(f.run,/nonempty|model-generated|identical/);
  }
  f.write('baseline.json',{workflow:{workflowCode:'XDX_TEST'},testData:{status:'ready',capturePolicy:'record-now',nodes:{READ:{response:{a:1,b:2},input:{old:true},jobId:'old-job',capture:{mode:'raw',responseTruncated:false}}}}});f.job.capturePolicyEvidence.baseline=f.ref('baseline.json');
  f.write('definition.json',{testDataOverrides:{READ:{response:{b:2,a:1},capture:{mode:'model-generated'}}}});assert.throws(f.run,/identical/);
});
test('inventory must identify exact workflow and baseline path',t=>{
  const f=fixture(t);for(const value of ['Workflow filter: OTHER\nX baseline.json','Workflow filter: XDX_TEST\nX other.json']){f.write('inventory.txt',value);f.job.capturePolicyEvidence.inventory=f.ref('inventory.txt');assert.throws(f.run,/does not identify/);}
});
test('invalid hashes, traversal and symlinks cannot supply evidence',t=>{
  const f=fixture(t);f.job.capturePolicyEvidence.inventory.sha256='wrong';assert.throws(f.run,/SHA256/);
  f.job.capturePolicyEvidence.inventory=f.ref('inventory.txt');f.job.capturePolicyEvidence.inventory.path='../inventory.txt';assert.throws(f.run,/confined/);
  fs.symlinkSync(f.root,path.join(f.root,'linked'),'junction');f.job.capturePolicyEvidence.inventory.path='linked/inventory.txt';assert.throws(f.run,/symlink/);
});
test('malformed definitions and wrapped overrides fail; other operations and recording retain compatibility',t=>{
  const f=fixture(t);for(const value of [[],{testDataOverrides:{nodes:{}}},{testDataOverrides:[]}]){f.write('definition.json',value);assert.throws(f.run,/definition|overrides/);}
  for(const policy of ['record-now','record-later'])assert.equal(verify({args:['do-generate-workflow-test','--data-capture-policy',policy]},f.root),undefined);
  assert.equal(verify({args:['get-workflow-test-sync-plan']},f.root),undefined);
});
