const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = fs.realpathSync('.');
const old = path.join(root, '.worktrees/xdx-supplier-core-restart-20260928');
const build = 'docs/builds/xdx-supplier-core-reset-20260929';
const oldBuild = 'docs/builds/xdx-supplier-core-restart-20260928';
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const copied = [];
function preserveAndCopy(relative) {
  const source = path.join(old, relative), target = path.join(root, relative);
  const info = fs.lstatSync(source);
  if (info.isSymbolicLink()) throw Error('Source link rejected');
  if (info.isDirectory()) {
    fs.mkdirSync(target, {recursive:true});
    for (const name of fs.readdirSync(source)) preserveAndCopy(path.join(relative,name));
    return;
  }
  const bytes = fs.readFileSync(source);
  if (fs.existsSync(target) && !fs.readFileSync(target).equals(bytes)) {
    const prior = path.join(root,'.debug/xdx-retired-20260929/base-before-promotion',relative);
    if (fs.existsSync(prior)) throw Error('Prior preservation collision');
    fs.mkdirSync(path.dirname(prior),{recursive:true});
    fs.copyFileSync(target,prior);
  }
  fs.mkdirSync(path.dirname(target),{recursive:true});
  fs.writeFileSync(target,bytes);
  if (hash(fs.readFileSync(target))!==hash(bytes)) throw Error('Copy verification failed');
  copied.push({path:relative.replaceAll('\\','/'),sha256:hash(bytes)});
}
preserveAndCopy(oldBuild);
const play='docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md';
let text=fs.readFileSync(play,'utf8');
const anchor='### Mandatory first-slice fast-fail gate';
const paragraph='Before expanding beyond the first resource, require a current first-slice acceptance receipt covering native behavior, configured multi-turn execution and attached passing semantic judgments for the same required journey. For transactions, establish prior-step request-ID/revision binding support before spending live-write budget; exercise real preparation, edit, review, approval, reservation, capture and independent verification with each write boundary fixture-backed or excluded in replay. Native-only success, deterministic-only checks and planner deferrals do not satisfy this prerequisite. Keep ordinary read/list/search/paging obligations in the first resource requirement matrix. A missing runner capability blocks expansion and is repaired at that existing owner; the receipt identifies exact source/test versions and unresolved obligations. Reuse retained accepted writes without replenishing their allocations.';
if (!text.includes(anchor)) throw Error('Missing gate owner');
text=text.replace(anchor,anchor+'\n\n'+paragraph);
text=text.replace('Every build, test cycle, repair and governance task MUST maintain','When the user directs unattended work with no waiting, reuse standing login authority and attempt the normal supported sign-in. If a human-only challenge or missing authority blocks progress, record the observed stop time and blocker, close active timing intervals, and end the run without polling or an open human-wait interval. A later turn begins a new observed interval; inter-turn time is not work. Historical missing boundaries remain qualified and must not be repaired by inventing continuous effort.\n\nEvery build, test cycle, repair and governance task MUST maintain');
text=text.replace('Supplier Core restart F36 records the late-discovered gap; its proposed repair is not acceptance evidence.','A proposed repair is not acceptance evidence.');
text=text.replace('### Cleanup rules','### Cleanup rules\n\nBefore promoting retained evidence into an existing checkout, inventory destination collisions. Preserve differing existing bytes independently, then merge only reviewed task-owned files and verify their hashes. An exclusive directory-copy failure is not proof that nothing was copied; inspect prior completed steps before retry.');
text=text.replace('| --- | --- | --- | --- |\n| 2026-09-28 | Supplier Core restart F32','| --- | --- | --- | --- |\n| 2026-09-29 | [User-directed reset and lesson application](../builds/xdx-supplier-core-reset-20260929/intake-and-learning-register.md) | Require configured and judged first-slice acceptance before expansion; explicit no-wait stop boundaries; preserve and qualify reusable tooling before retirement. | Recovery receipts separate local checks from replacement acceptance; historical timing remains qualified. |\n| 2026-09-28 | Supplier Core restart F32');
fs.writeFileSync(play,text);
let agents=fs.readFileSync('AGENTS.md','utf8');
agents=agents.replace(/- User-approved 2026-09-28: before expanding[^\r\n]*/, '- Before expanding resource slices, satisfy the canonical playbook\'s Mandatory first-slice fast-fail gate, including configured conversation tests and attached semantic judgments.');
fs.writeFileSync('AGENTS.md',agents);
const proof={status:'passed',observedUtc:new Date().toISOString(),files:copied.length,copied,priorBaseFiles:'.debug/xdx-retired-20260929/base-before-promotion',lessonOwner:play};
fs.writeFileSync(build+'/evidence/lesson-promotion.json',JSON.stringify(proof,null,2)+'\n');
console.log(JSON.stringify({status:proof.status,files:proof.files,lessonOwner:play}));
