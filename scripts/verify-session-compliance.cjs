// Evidence validation only: never executes a live operation or claims to prove comprehension.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');

function verify(root, recordPath, sessionId, phase) {
  root = fs.realpathSync(root);
  const errors = [];
  const fail = message => errors.push(message);
  const local = relative => {
    if (typeof relative !== 'string' || !relative || path.isAbsolute(relative)) throw Error('Expected repository-relative evidence path');
    const full = fs.realpathSync(path.resolve(root, relative));
    const rel = path.relative(root, full);
    if (rel === '..' || rel.startsWith('..' + path.sep) || path.isAbsolute(rel) || !fs.statSync(full).isFile()) throw Error('Evidence must be a file within this checkout');
    return full;
  };
  let r;
  try { r = JSON.parse(fs.readFileSync(local(recordPath), 'utf8')); }
  catch (e) { return ['Session record unavailable or invalid: ' + e.message]; }
  if (r.schemaVersion !== 1) fail('Unsupported session record schema');
  if (!sessionId || r.sessionId !== sessionId) fail('Session identity mismatch');
  if (!['Startup', 'Closeout'].includes(phase)) fail('Invalid session phase');
  if (path.resolve(r.repoRoot || '') !== root) fail('Session repository mismatch');
  const branch = cp.spawnSync('git', ['-C', root, 'branch', '--show-current'], {encoding:'utf8'});
  if (branch.status !== 0 || !r.branch || branch.stdout.trim() !== r.branch) fail('Session branch mismatch');
  for (const k of ['startedUtc','checkpointUtc']) {
    if (typeof r[k] !== 'string' || !r[k].endsWith('Z') || !Number.isFinite(Date.parse(r[k]))) fail('Missing UTC ' + k);
  }
  if (Date.parse(r.checkpointUtc) < Date.parse(r.startedUtc) || Date.parse(r.checkpointUtc) > Date.now() + 60000) fail('Invalid checkpoint interval');
  const required = ['AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md'];
  if (!Array.isArray(r.objectReferences)) fail('Missing object inventory');
  else for (const ref of r.objectReferences) {
    if (!ref.path?.startsWith('docs/lessons/objects/') || !ref.release) fail('Invalid object reference or documentation release');
    else required.push(ref.path);
  }
  if (!r.objectReferences?.length && !r.noObjectsReason?.trim()) fail('Empty object inventory needs a scope reason');
  for (const name of required) {
    const read = r.reads?.find(x => x.path === name);
    try {
      const hash = crypto.createHash('sha256').update(fs.readFileSync(local(name))).digest('hex');
      if (!read || read.sha256 !== hash) fail('Missing or stale reviewed document: ' + name);
    } catch (e) { fail(name + ': ' + e.message); }
  }
  if (!r.reviewNotes?.trim()) fail('Missing applied-learning review notes');
  for (const name of ['learningRegister','timeTracker']) {
    try {
      const text = fs.readFileSync(local(r[name]), 'utf8');
      if (!text.includes(sessionId)) fail(name + ' must reference this session/task identity');
    } catch (e) { fail(name + ': ' + e.message); }
  }
  const groups = ['learning','intake','authority','objects','verification','timing','cleanup','delivery'];
  if (!Array.isArray(r.checks) || r.checks.length !== groups.length) fail('Session requires all eight obligation groups exactly once');
  for (const id of groups) {
    const matches = (r.checks || []).filter(c => c.id === id);
    const c = matches[0];
    if (matches.length !== 1 || !c?.reason?.trim() || !c?.rule?.trim()) { fail('Missing obligation disposition: ' + id); continue; }
    if (!(phase === 'Startup' ? ['pass','planned','not-applicable'] : ['pass','not-applicable']).includes(c.status)) fail('Unresolved obligation: ' + id);
    if (c.status === 'pass' && (!Array.isArray(c.evidence) || c.evidence.length === 0)) fail('Missing evidence for ' + id);
    for (const p of c.evidence || []) { try { local(p); } catch(e) { fail(id + ': ' + e.message); } }
  }
  if (phase === 'Closeout') {
    if (r.phase !== 'Closeout') fail('Record is not at closeout');
    if (!Array.isArray(r.unresolved) || r.unresolved.length) fail('Required actions remain unresolved');
    for (const k of ['tokens','aiUnits','timingGaps']) if (!r.metrics?.[k]?.trim()) fail('Missing metric or unavailability reason: ' + k);
    try {
      if (!fs.readFileSync(local('docs/handoffs/ACTIVE_HANDOFF.md'),'utf8').includes(path.basename(r.timeTracker))) fail('Handoff must link the active time tracker');
    } catch(e) { fail(e.message); }
  }
  return errors;
}
module.exports = {verify};
if (require.main === module) {
  const failures = verify(...process.argv.slice(2));
  console.log(failures.length ? 'Session compliance: FAIL\n- ' + failures.join('\n- ') : 'Session compliance: PASS');
  process.exitCode = failures.length ? 1 : 0;
}
