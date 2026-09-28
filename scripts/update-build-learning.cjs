#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { verify } = require('./verify-build-learning.cjs');
const reject = (code, stage, reason) => { throw Object.assign(new Error(code), { safeCode: code, safeStage: stage, safeReason: reason }); };

function regularFile(root, relative, stage) {
  if (typeof relative !== 'string' || !relative || path.isAbsolute(relative) || /[:\\\x00-\x1f]/.test(relative)) reject('UNSAFE_PATH', stage, 'invalid-path-syntax');
  const parts = relative.split('/');
  if (parts.some(part => !part || part === '.' || part === '..')) reject('UNSAFE_PATH', stage, 'invalid-path-segment');
  let current = root;
  for (const part of parts) {
    current = path.join(current, part);
    if (fs.lstatSync(current).isSymbolicLink()) reject('UNSAFE_PATH', stage, 'symlink-component');
  }
  const real = fs.realpathSync(current), rel = path.relative(root, real), stat = fs.statSync(real);
  if (rel === '..' || rel.startsWith(`..${path.sep}`) || path.isAbsolute(rel)) reject('UNSAFE_PATH', stage, 'resolved-outside-root');
  if (!stat.isFile()) reject('UNSAFE_PATH', stage, 'not-regular-file');
  // Both inputs are read-only. Replacement detaches only the active name;
  // existing hardlink aliases retain their original inode and bytes.
  return real;
}

// One writer per ledger. This utility does not infer statuses, modify hashes or
// authorize execution. Startup validation permits structurally valid open issues.
function update(root, ledgerPath, candidatePath, taskId) {
  let lock, lockFd, temporary;
  try {
    if (typeof root !== 'string' || !root || fs.lstatSync(root).isSymbolicLink()) reject('UNSAFE_ROOT');
    root = fs.realpathSync(root);
    if (!fs.statSync(root).isDirectory()) reject('UNSAFE_ROOT');
    if (typeof taskId !== 'string' || !taskId.trim()) reject('INVALID_TASK');
    const ledger = regularFile(root, ledgerPath, 'ledger-validation'), candidate = regularFile(root, candidatePath, 'candidate-validation');
    if (ledger === candidate || (process.platform === 'win32' && ledger.toLowerCase() === candidate.toLowerCase())) reject('CANDIDATE_NOT_DISTINCT');
    lock = `${ledger}.update.lock`;
    try { lockFd = fs.openSync(lock, 'wx', 0o600); }
    catch { reject('UPDATE_LOCK_UNAVAILABLE'); }
    const originalIdentity = fs.statSync(ledger, { bigint: true });
    const candidateIdentity = fs.statSync(candidate, { bigint: true });
    if (candidateIdentity.dev === originalIdentity.dev && candidateIdentity.ino === originalIdentity.ino) reject('CANDIDATE_NOT_DISTINCT');
    const original = fs.readFileSync(ledger), proposed = fs.readFileSync(candidate);
    let identity;
    try { identity = JSON.parse(original.toString('utf8').replace(/^\uFEFF/, '')).taskId; }
    catch { reject('CURRENT_LEDGER_IDENTITY_INVALID'); }
    if (identity !== taskId) reject('CURRENT_LEDGER_IDENTITY_MISMATCH');
    if (!verify(root, candidatePath, { phase: 'Startup', taskId }).ok) reject('CANDIDATE_INVALID');
    if (!fs.readFileSync(candidate).equals(proposed)) reject('CANDIDATE_CHANGED');
    temporary = path.join(path.dirname(ledger), `.${path.basename(ledger)}.${randomUUID()}.candidate`);
    const fd = fs.openSync(temporary, 'wx', fs.statSync(ledger).mode & 0o777);
    try { fs.writeFileSync(fd, proposed); fs.fsyncSync(fd); }
    finally { fs.closeSync(fd); }
    const relativeTemporary = path.relative(root, temporary).split(path.sep).join('/');
    if (!verify(root, relativeTemporary, { phase: 'Startup', taskId }).ok) reject('CANDIDATE_INVALID');
    if (regularFile(root, ledgerPath, 'ledger-recheck') !== ledger) reject('CURRENT_LEDGER_CHANGED');
    const currentIdentity = fs.statSync(ledger, { bigint: true });
    if (currentIdentity.dev !== originalIdentity.dev || currentIdentity.ino !== originalIdentity.ino || !fs.readFileSync(ledger).equals(original)) reject('CURRENT_LEDGER_CHANGED');
    fs.renameSync(temporary, ledger); // Same-directory atomic replacement; never truncate the active ledger.
    temporary = undefined;
    return { ok: true, phase: 'Startup', candidateRetained: true };
  } catch (error) {
    return { ok: false, code: error.safeCode || 'UPDATE_IO_FAILED', ...(error.safeStage ? { stage: error.safeStage, reason: error.safeReason } : {}) };
  } finally {
    if (temporary) { try { fs.unlinkSync(temporary); } catch { /* never touch the active ledger on cleanup failure */ } }
    if (lockFd !== undefined) {
      try { fs.closeSync(lockFd); } finally { try { fs.unlinkSync(lock); } catch { /* stale lock fails the next update closed */ } }
    }
  }
}

function main(args) {
  if (args.length !== 4) {
    process.stderr.write('Usage: node scripts/update-build-learning.cjs <root> <ledger> <candidate> <taskId>\n');
    return 64;
  }
  const result = update(...args);
  process[result.ok ? 'stdout' : 'stderr'].write(`${JSON.stringify(result)}\n`);
  return result.ok ? 0 : 1;
}
if (require.main === module) process.exitCode = main(process.argv.slice(2));
module.exports = { update };
