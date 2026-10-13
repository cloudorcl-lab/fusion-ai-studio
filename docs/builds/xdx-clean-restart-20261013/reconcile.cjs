const fs=require('node:fs'),path=require('node:path');
const base='docs/builds/xdx-clean-restart-20261013';
const archive=JSON.parse(fs.readFileSync(`${base}/evidence/preservation.json`,'utf8').replace(/^\uFEFF/, '')).archive;
const refs=[];
function walk(p){return fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);}
const files=[...walk('docs/lessons'),...walk('docs/build-models'),...walk('agent-app-build-startup')].filter(p=>p.endsWith('.md'));
for(const file of files){
 let text=fs.readFileSync(file,'utf8');
 text=text.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(all,label,target)=>{
  if(/^(https?:|mailto:|#)/.test(target)||target.includes('<'))return all;
  const resolved=path.resolve(path.dirname(file),target.split('#')[0]);
  const rel=path.relative(process.cwd(),resolved).replaceAll('\\','/');
  if(!/^(docs\/builds\/|src\/)/.test(rel)&&!/(?:\.\.\/)+builds\/xdx-|(?:\.\.\/)+src\//.test(target))return all;
  const id=`E${String(refs.length+1).padStart(4,'0')}`;
  refs.push({id,document:file.replaceAll('\\','/'),label,originalTarget:target,originalRepositoryPath:rel});
  const safeLabel=/^xdx_supplier.*\.(bo|wf|app)$/.test(label)?'Retained first response example':label;
  return `${safeLabel} (archived evidence ${id})`;
 });
 fs.writeFileSync(file,text);
}
fs.writeFileSync(path.join(archive,'citation-index.json'),JSON.stringify(refs,null,2)+'\n');
fs.writeFileSync('docs/lessons/ARCHIVED_EVIDENCE.md',`# Archived evidence\n\nThe user retired prior local attempts for a clean restart on 2026-10-13. Reusable lessons and immutable first-success GET JSON remain; historical source artifacts and build records are preserved outside the active checkout. References marked archived evidence E#### map to the private citation index. They are historical evidence, not instructions to resume an old build or proof of current tenant state.\n\nPrivate archive: ${archive.replaceAll('\\','/')}\n\nThe archive contains base and linked-checkout snapshots, SHA-256 file manifests, a verified full Git-history bundle and citation-index.json. Recovery has not been exercised. No tenant cleanup or acceptance is claimed.\n`);
for(const file of ['docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md']){
 const text=fs.readFileSync(file,'utf8');
 const link=file.endsWith('objects/README.md')?'../ARCHIVED_EVIDENCE.md':'ARCHIVED_EVIDENCE.md';
 const note=`\nHistorical evidence marked E#### is retained in the [private archive locator](${link}) after the user-authorized clean restart. It does not establish current deployment or authorize a new run.\n`;
 fs.writeFileSync(file,text.replace(/^(# .+\r?\n)/,'$1'+note));
}
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));pkg.name='fusion-ai-studio-workspace';fs.writeFileSync('package.json',JSON.stringify(pkg,null,2)+'\n');
fs.writeFileSync('docs/handoffs/ACTIVE_HANDOFF.md',`# Active handoff\n\nCurrent state: clean local restart on branch TestingWFBuildTools. Prior linked checkouts, local attempt branches, custom supplier artifacts/tests and mutable build history have been retired. No previous build is active or scheduled for resumption. No tenant artifacts, business data or remote refs were changed.\n\nRetained: Oracle sample library, reusable skills/CLI/verification tooling, startup and build models, canonical lessons/object references, configured environment and existing stashes. Historical evidence is external; see [archive locator](../lessons/ARCHIVED_EVIDENCE.md). Do not use archived run instructions or accepted/uncertain write allocations as a new-build default.\n\nRetirement record: [plan](../builds/xdx-clean-restart-20261013/purge-plan.md), [verification](../builds/xdx-clean-restart-20261013/evidence/verification.json), [failure ledger](../builds/xdx-clean-restart-20261013/failure-ledger.json), [time-tracker.md](../builds/xdx-clean-restart-20261013/time-tracker.md). Confirm Closeout from the record's evidence.\n\nNext build: obtain the new objective, follow agent-app-build-startup/AGENTS.md from committed current governance, create a fresh worktree, initialize new requirements/authority/evidence and pass Startup before artifact work. No saved/runtime acceptance is implied by this local cleanup. Existing configured sign-in rejections remain historical; verify usable credentials/account state before any future authorized login and do not retry known unchanged rejected credentials.\n`);
fs.writeFileSync(`${base}/evidence/reconciliation.json`,JSON.stringify({ok:true,archivedCitations:refs.length,observedUtc:new Date().toISOString(),firstSuccessJsonChanged:false,sourceArtifactChanges:'retirement only'},null,2)+'\n');
console.log(JSON.stringify({ok:true,archivedCitations:refs.length}));
