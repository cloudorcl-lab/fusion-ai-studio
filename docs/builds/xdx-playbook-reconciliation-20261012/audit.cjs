const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');
const dir = 'docs/builds/xdx-playbook-reconciliation-20261012';
const wt = '.worktrees/xdx-supplier-core-benchmark-20260930-175939';
const play = 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md';
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const git = args => cp.execFileSync('git', args, {encoding:'utf8'}).trim();
const write = (p,v) => fs.writeFileSync(dir+'/'+p, typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
if (process.argv[2] === 'inventory') {
  const refs = git(['for-each-ref','--format=%(refname)','refs/heads','refs/remotes']).split('\n');
  const versions = refs.map(ref => {
    const result = cp.spawnSync('git',['rev-parse',ref+':'+play],{encoding:'utf8'});
    return {ref,playbookBlob:result.status===0?result.stdout.trim():null,
      lastPlaybookCommit:git(['log','-1','--format=%H %cI %s',ref,'--',play])};
  });
  const names = git(['ls-files']).split('\n');
  write('evidence/inventory.json',{observedUtc:new Date().toISOString(),rootHead:git(['rev-parse','HEAD']),rootBranch:git(['branch','--show-current']),worktrees:git(['worktree','list','--porcelain']),versions,playbooks:[play,wt+'/'+play,'agent-app-build-startup/repository-seed/'+play].map(p=>({path:p,sha256:hash(p)})),trackedFiles:names.length,artifactCounts:Object.fromEntries(['.app','.wf','.bo','.tool'].map(ext=>[ext,names.filter(n=>n.endsWith(ext)).length])),preservedRootChanges:git(['status','--short','--','env.properties','.playwright-mcp']),worktreeStatus:git(['-C',wt,'status','--short'])});
  fs.copyFileSync(play,dir+'/evidence/root-playbook-before.md');
  fs.copyFileSync('docs/handoffs/ACTIVE_HANDOFF.md',dir+'/evidence/root-handoff-before.md');
  fs.copyFileSync(wt+'/docs/handoffs/ACTIVE_HANDOFF.md',dir+'/evidence/benchmark-paused-handoff-source.md');
  const sourceDir = wt+'/docs/builds/xdx-supplier-core-benchmark-20260930/evidence/';
  const evidence = ['supplier-post-business-relationship-failure.json','supplier-create-code-field-repair.json','supplier-create-conversation-b4-analysis.json','supplier-state-guard-repair-pass.json','supplier-state-query-contract-pass.txt'];
  const copies = evidence.map(name=>{
    const dest = dir+'/evidence/'+name;
    if(fs.existsSync(dest)) throw Error('Evidence destination collision: '+dest);
    fs.copyFileSync(sourceDir+name,dest);
    if(hash(dest)!==hash(sourceDir+name)) throw Error('Copy hash mismatch');
    return {source:sourceDir+name,destination:dest,sha256:hash(dest)};
  });
  write('evidence/promoted-provenance.json',{copiedUtc:new Date().toISOString(),copies});
  console.log('Inventory and immutable source snapshots captured; '+versions.length+' local refs reviewed.');
} else if (process.argv[2] === 'verify') {
  const files = [play,'AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/objects/README.md','docs/lessons/objects/oracle-fusion-procurement-suppliers.md'];
  const errors=[];
  for(const p of files) {
    const text=fs.readFileSync(p,'utf8');
    if((text.match(/^```/gm)||[]).length%2) errors.push(p+': unbalanced fences');
    for(const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const link=match[1].split('#')[0];
      if(!link || /^(https?:|mailto:)/.test(link) || link.includes('<')) continue;
      if(!fs.existsSync(path.resolve(path.dirname(p),link))) errors.push(p+': missing '+link);
    }
  }
  const text=fs.readFileSync(play,'utf8');
  const sample=s=>s.match(/## First successful BO GET sample\r?\n([\s\S]*?)(?=\r?\n## )/)[1];
  if(sample(fs.readFileSync('docs/lessons/objects/oracle-fusion-procurement-suppliers.md','utf8'))!==sample(fs.readFileSync(dir+'/evidence/suppliers-reference-before.md','utf8'))) errors.push('First-success supplier GET sample changed');
  if(!text.includes('--learning-ledger docs/builds/<build-id>/failure-ledger.json --learning-scope <registered-scope>')) errors.push('Timing command lacks required learning flags');
  const main=text.split('## Change log')[0];
  if(/Supplier Core restart F\d|authoring\/f39|new-first-success-proof/.test(main)) errors.push('App-specific main-path evidence remains');
  if(!text.includes('Scope the required proof') || !text.includes('Configured multi-turn')) errors.push('First-slice acceptance requirements missing');
  const diff=cp.spawnSync('git',['diff','--check'],{encoding:'utf8'});
  if(diff.status!==0) errors.push(diff.stdout+diff.stderr);
  write('evidence/document-verification.json',{checkedUtc:new Date().toISOString(),files,errors,limitations:'Local documentation integrity and scoped source checks; no tenant acceptance or remote-ref refresh.'});
  console.log(errors.length?'Document verification FAIL\n'+errors.join('\n'):'Document verification PASS: links, fences, timing flags, first-slice obligations, agnostic main body, immutable GET and whitespace');
  process.exitCode=errors.length?1:0;
} else throw Error('Expected inventory or verify');
