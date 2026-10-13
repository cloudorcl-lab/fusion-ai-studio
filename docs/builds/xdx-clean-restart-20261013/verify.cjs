const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const b='docs/builds/xdx-clean-restart-20261013';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const p=read(`${b}/evidence/preservation.json`),plan=read(path.join(p.archive,'plan.json')),manifest=read(path.join(p.archive,'base-files.json'));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const git=(...a)=>cp.execFileSync('git',a,{encoding:'utf8'}).trim();
const worktrees=git('worktree','list','--porcelain').split(/\r?\n/).filter(s=>s.startsWith('worktree '));
if(worktrees.length!==1||path.resolve(worktrees[0].slice(9))!==process.cwd())throw Error('Linked registration remains');
for(const target of plan.targets)if(fs.existsSync(target))throw Error(`Retired target remains: ${target}`);
if(fs.existsSync('.worktrees'))throw Error('Worktree container remains');
const refs=git('for-each-ref','--format=%(refname)').split(/\r?\n/);
for(const branch of plan.branches)if(refs.includes(branch.ref))throw Error('Retired local ref remains');
const previousRefs=fs.readFileSync(path.join(p.archive,'refs-before.txt'),'utf8').replace(/^\uFEFF/,'').split(/\r?\n/).filter(Boolean);
for(const line of previousRefs){const [ref,tip]=line.split(' ');if(plan.branches.some(b=>b.ref===ref))continue;if(git('rev-parse',ref)!==tip)throw Error('Protected ref drift');}
if(hash(path.join(p.archive,'history.bundle'))!==p.bundleSha256)throw Error('Bundle drift');
let retained=0;
for(const f of manifest){
 if(plan.targets.some(t=>f.path===t||f.path.startsWith(t+'/')))continue;
 if(f.path.startsWith('docs/builds/')||f.path.startsWith('docs/lessons/')||f.path.startsWith('docs/build-models/')||f.path==='docs/handoffs/ACTIVE_HANDOFF.md'||f.path==='package.json'||f.path==='tests/fixtures/workflow-runtime-path-retained.json'||f.path==='tests/test-workflow-runtime-path-candidate.cjs')continue;
 if(!fs.existsSync(f.path)||hash(f.path)!==f.sha256)throw Error(`Protected file drift: ${f.path}`);
 retained++;
}
const walk=p=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
let samples=0,links=0;
const sample=text=>{const m=/^## .*First successful BO GET sample.*$/im.exec(text);if(!m)return null;const rest=text.slice(m.index+m[0].length),next=/^## /m.exec(rest);const section=next?rest.slice(0,next.index):rest;return [...section.matchAll(/```json\r?\n([\s\S]*?)\r?\n```/g)].map(m=>m[1]);};
for(const file of walk('docs/lessons/objects').filter(p=>p.endsWith('.md'))){
 const old=fs.readFileSync(path.join(p.archive,'base',file),'utf8'),current=fs.readFileSync(file,'utf8');
 const original=sample(old);if(original){if(JSON.stringify(original)!==JSON.stringify(sample(current)))throw Error('Immutable first-success JSON drift');samples++;}
}
const docs=[...walk('docs/lessons'),...walk('docs/build-models')].filter(p=>p.endsWith('.md'));
for(const file of docs){const text=fs.readFileSync(file,'utf8');for(const m of text.matchAll(/\]\(([^)]+)\)/g)){const target=m[1].split('#')[0];if(!target||/^(https?:|mailto:)/.test(target)||target.includes('<'))continue;if(!fs.existsSync(path.resolve(path.dirname(file),target)))throw Error(`Dangling retained link: ${file}: ${target}`);links++;}}
const retiredNames=plan.worktrees.flatMap(w=>[path.basename(w.worktree),w.branch?.replace('refs/heads/','')]).filter(Boolean);
const textFiles=['AGENTS.md','package.json',...docs,...walk('.agents').filter(p=>/\.(md|js|json)$/.test(p)),...walk('scripts').filter(p=>/\.(ps1|cjs)$/.test(p)),...walk('tests').filter(p=>/\.(ps1|cjs|json)$/.test(p))];
for(const file of textFiles){const text=fs.readFileSync(file,'utf8');if(retiredNames.some(n=>text.includes(n)))throw Error(`Concrete retired-worktree reference remains: ${file}`);}
const configNames=cp.spawnSync('git',['config','--local','--name-only','--get-regexp','^branch\\.'],{encoding:'utf8'}).stdout;
if(plan.branches.some(b=>configNames.includes(`branch.${b.ref.slice(11)}.`)))throw Error('Retired branch configuration remains');
const result={ok:true,observedUtc:new Date().toISOString(),registeredCheckouts:1,retiredLocalRefs:plan.branches.length,absentBaseTargets:plan.targets.length,protectedFilesHashMatched:retained,immutableFirstGetSamples:samples,retainedLinksChecked:links,remainingBranches:git('branch','--format=%(refname:short)').split(/\r?\n/),runtimeOrTenantChanges:false,archive:p.archive};
fs.writeFileSync(`${b}/evidence/verification.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
