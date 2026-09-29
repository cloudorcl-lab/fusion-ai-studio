'use strict';
// Opt-in POSITIVE-BASELINE PROFILE for builds with an established baseline.
// Not a universal generation gate: valid no-baseline/no-recordable-node authoring
// is outside this profile. Never install it as an unconditional startup policy.
// Does not discover baselines, run CLI commands, or change capture policies.
const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const {isDeepStrictEqual}=require('node:util');
const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const own=(v,k)=>Object.prototype.hasOwnProperty.call(v,k);
function file(root,relative){
  if(typeof relative!=='string'||!relative||path.isAbsolute(relative)||/[:\\\x00-\x1f]/.test(relative)||relative.split('/').some(p=>!p||p==='.'||p==='..'))throw Error('Capture preflight requires confined repository-relative files');
  let current=root;
  for(const part of relative.split('/')){current=path.join(current,part);if(fs.lstatSync(current).isSymbolicLink())throw Error('Capture preflight prohibits symlink files');}
  if(!fs.statSync(current).isFile())throw Error('Capture preflight requires a regular file');
  return fs.readFileSync(current);
}
function referenced(root,ref){
  if(!object(ref)||!/^[a-f0-9]{64}$/.test(ref.sha256||''))throw Error('Capture policy requires SHA256-bound evidence');
  const bytes=file(root,ref.path);
  if(createHash('sha256').update(bytes).digest('hex')!==ref.sha256)throw Error('Capture policy evidence changed');
  return bytes;
}
const json=bytes=>JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/,''));
function selector(args,name,required=true){
  const flags=args.filter(v=>v===name||v.startsWith(name+'='));
  if(!flags.length&&!required)return undefined;
  const index=args.indexOf(name),value=args[index+1];
  if(flags.length!==1||flags[0]!==name||!value||value.startsWith('--'))throw Error('Capture preflight requires one explicit '+name+' value');
  return value;
}
function verifyPositiveBaseline(job,root=process.cwd()){
  const args=job?.args;
  if(!Array.isArray(args)||args[0]!=='do-generate-workflow-test')return;
  if(!args.every(v=>typeof v==='string'))throw Error('Capture preflight requires string arguments');
  const policy=selector(args,'--data-capture-policy');
  if(!['record-now','record-later','model-generated','baseline-replay'].includes(policy))throw Error('Capture preflight requires a documented capture policy');
  if(!['model-generated','baseline-replay'].includes(policy))return;
  root=fs.realpathSync(root);
  const workflowPath=selector(args,'--file'),basePath=selector(args,'--base-test-file'),definition=selector(args,'--definition');
  if(!definition.startsWith('@')||definition.length===1)throw Error('Capture preflight requires an @definition file');
  const evidence=job.capturePolicyEvidence;
  if(!object(evidence))throw Error('Capture policy requires declared positive baseline evidence; standalone no-baseline authoring is not established');
  if(evidence.workflow?.path!==workflowPath||evidence.baseline?.path!==basePath)throw Error('Capture policy workflow/base selector mismatch');
  const workflow=json(referenced(root,evidence.workflow)),baseline=json(referenced(root,evidence.baseline));
  const publicText=referenced(root,evidence.inventory).toString('utf8').replace(/^\uFEFF/,'');
  if(typeof workflow.workflowCode!=='string'||!workflow.workflowCode||baseline.workflow?.workflowCode!==workflow.workflowCode)throw Error('Capture policy baseline workflow mismatch');
  // Bind the declared positive source to the actual public table without inferring
  // column widths, readiness discovery, or the absence of any other baseline.
  const lines=publicText.split(/\r?\n/);
  if(!lines.includes('Workflow filter: '+workflow.workflowCode)||!lines.some(line=>line.trimEnd().endsWith(' '+basePath)))throw Error('Capture policy public inventory does not identify workflow/baseline');
  if(baseline.testData?.status!=='ready')throw Error('Capture policy baseline must be ready');
  if(policy==='model-generated'&&baseline.testData.capturePolicy!=='record-now')throw Error('Positive recorded-baseline profile requires ready record-now for model overrides');
  const value=json(file(root,definition.slice(1)));
  if(!object(value))throw Error('Capture policy definition must be an object');
  if(own(value,'testData'))throw Error('Capture policy forbids full testData with a ready baseline; use testDataOverrides');
  if(policy==='baseline-replay'&&own(value,'testDataOverrides'))throw Error('Capture policy baseline-replay forbids testDataOverrides');
  if(own(value,'testDataOverrides')&&(!object(value.testDataOverrides)||own(value.testDataOverrides,'nodes')))throw Error('Capture policy overrides must be keyed directly by node code');
  if(policy==='model-generated'){
    if(!object(value.testDataOverrides)||!Object.keys(value.testDataOverrides).length)throw Error('Model generation requires nonempty branch-forcing overrides in this profile');
    for(const [code,override] of Object.entries(value.testDataOverrides)){
      if(!object(override)||override.capture?.mode!=='model-generated'||!own(override,'response'))throw Error('Branch-forcing overrides require model-generated capture and an explicit response');
      // Input changes and removal of capture/transport metadata do not change
      // the mocked response and cannot justify synthetic-data classification.
      if(isDeepStrictEqual(override.response,baseline.testData.nodes?.[code]?.response))throw Error('Branch-forcing override response is identical to baseline');
    }
  }
  return {policy,baseline:basePath,workflow:workflowPath};
}
module.exports={verifyPositiveBaseline};
