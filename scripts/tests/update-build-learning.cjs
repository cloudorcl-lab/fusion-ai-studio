'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { update } = require('../update-build-learning.cjs');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'learning-update-'));
const original = JSON.stringify({ schemaVersion: 1, taskId: 'task', scopes: ['supplier'], failures: [], noFailuresReason: 'Synthetic fixture' }, null, 2) + '\n';
const proposed = { schemaVersion: 1, taskId: 'task', scopes: ['supplier'], failures: [{ id: 'F34', observedUtc: '2026-09-28T00:00:00Z', symptom: 'Partial ledger update', scope: 'supplier', blocks: ['supplier'], status: 'open', evidenceGap: 'Synthetic fixture' }] };
let passed = 0;
function reset(candidate = proposed) {
  fs.writeFileSync(path.join(root, 'ledger.json'), original);
  fs.writeFileSync(path.join(root, 'candidate.json'), typeof candidate === 'string' ? candidate : JSON.stringify(candidate));
}
function check(name, fn) { reset(); fn(); passed++; console.log(`PASS ${name}`); }
function unchanged() {
  assert.equal(fs.readFileSync(path.join(root, 'ledger.json'), 'utf8'), original);
  assert.ok(!fs.existsSync(path.join(root, 'ledger.json.update.lock')));
  assert.ok(!fs.readdirSync(root).some(name => name.endsWith('.candidate')));
}
try {
  check('valid candidate atomically replaces ledger and preserves exact candidate bytes', () => {
    const candidate = fs.readFileSync(path.join(root, 'candidate.json'));
    assert.deepEqual(update(root, 'ledger.json', 'candidate.json', 'task'), { ok: true, phase: 'Startup', candidateRetained: true });
    assert.deepEqual(fs.readFileSync(path.join(root, 'ledger.json')), candidate);
    assert.deepEqual(fs.readFileSync(path.join(root, 'candidate.json')), candidate);
  });
  check('closed failure without verification rejects and preserves original bytes', () => {
    const invalid = structuredClone(proposed); invalid.failures[0].status = 'closed';
    reset(invalid);
    assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'CANDIDATE_INVALID');
    unchanged();
  });
  check('malformed JSON and mismatched candidate identity never replace ledger', () => {
    for (const candidate of ['{"taskId":', { ...proposed, taskId: 'other' }]) {
      reset(candidate);
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').ok, false);
      unchanged();
    }
  });
  check('current ledger identity mismatch rejects before replacement', () => {
    assert.equal(update(root, 'ledger.json', 'candidate.json', 'other').code, 'CURRENT_LEDGER_IDENTITY_MISMATCH');
    unchanged();
  });
  check('absolute traversal missing same-file and directory paths reject', () => {
    for (const candidate of [path.join(root, 'candidate.json'), '../candidate.json', './candidate.json', 'missing.json', 'ledger.json', '']) {
      assert.equal(update(root, 'ledger.json', candidate, 'task').ok, false);
      unchanged();
    }
    fs.mkdirSync(path.join(root, 'directory'));
    assert.equal(update(root, 'ledger.json', 'directory', 'task').ok, false);
    unchanged();
  });
  check('path syntax segment and non-file reasons identify only safe guard metadata', () => {
    for (const [candidate, reason] of [['SECRET:PATH', 'invalid-path-syntax'], ['../SECRET', 'invalid-path-segment'], ['directory', 'not-regular-file']]) {
      const result = update(root, 'ledger.json', candidate, 'task');
      assert.deepEqual(result, { ok: false, code: 'UNSAFE_PATH', stage: 'candidate-validation', reason });
      assert.ok(!JSON.stringify(result).includes('SECRET')); unchanged();
    }
    assert.deepEqual(update(root, './ledger.json', 'candidate.json', 'task'), { ok: false, code: 'UNSAFE_PATH', stage: 'ledger-validation', reason: 'invalid-path-segment' });
    unchanged();
  });
  check('resolved escape guard preserves original bytes', () => {
    const realpath = fs.realpathSync, candidate = path.join(root, 'candidate.json');
    fs.realpathSync = (file, ...args) => file === candidate ? path.dirname(root) : realpath(file, ...args);
    try { assert.deepEqual(update(root, 'ledger.json', 'candidate.json', 'task'), { ok: false, code: 'UNSAFE_PATH', stage: 'candidate-validation', reason: 'resolved-outside-root' }); }
    finally { fs.realpathSync = realpath; }
    unchanged();
  });
  check('hardlinked active replacement preserves alias original bytes and identity', () => {
    const active = path.join(root, 'ledger.json'), alias = path.join(root, 'ledger-alias.json');
    fs.linkSync(active, alias); const identity = fs.statSync(alias, { bigint: true });
    try {
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').ok, true);
      assert.equal(fs.readFileSync(alias, 'utf8'), original);
      assert.equal(fs.statSync(alias, { bigint: true }).ino, identity.ino);
      assert.notEqual(fs.statSync(active, { bigint: true }).ino, identity.ino);
      assert.deepEqual(fs.readFileSync(active), fs.readFileSync(path.join(root, 'candidate.json')));
    } finally { fs.unlinkSync(alias); }
  });
  check('invalid candidate and rename failure preserve hardlinked active and alias', () => {
    const active = path.join(root, 'ledger.json'), alias = path.join(root, 'ledger-failure-alias.json');
    fs.linkSync(active, alias); const identity = fs.statSync(alias, { bigint: true });
    const rename = fs.renameSync;
    try {
      fs.writeFileSync(path.join(root, 'candidate.json'), '{}');
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'CANDIDATE_INVALID');
      fs.writeFileSync(path.join(root, 'candidate.json'), JSON.stringify(proposed));
      fs.renameSync = () => { throw Error('simulated'); };
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'UPDATE_IO_FAILED');
      unchanged(); assert.equal(fs.readFileSync(alias, 'utf8'), original);
      assert.equal(fs.statSync(active, { bigint: true }).ino, identity.ino);
    } finally { fs.renameSync = rename; fs.unlinkSync(alias); }
  });
  check('concurrent alias mutation is detected and never overwritten', () => {
    const active = path.join(root, 'ledger.json'), alias = path.join(root, 'ledger-mutation-alias.json');
    fs.linkSync(active, alias); const lstat = fs.lstatSync; let checks = 0;
    const changed = original + ' ';
    fs.lstatSync = (file, ...args) => { if (file === active && ++checks === 2) fs.writeFileSync(alias, changed); return lstat(file, ...args); };
    try {
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'CURRENT_LEDGER_CHANGED');
      assert.equal(fs.readFileSync(active, 'utf8'), changed);
      assert.equal(fs.readFileSync(alias, 'utf8'), changed);
      assert.ok(!fs.existsSync(active + '.update.lock'));
    } finally { fs.lstatSync = lstat; fs.unlinkSync(alias); }
  });
  check('same-byte inode replacement is detected', () => {
    const active = path.join(root, 'ledger.json'), replacement = path.join(root, 'replacement.json');
    const lstat = fs.lstatSync; let checks = 0;
    fs.lstatSync = (file, ...args) => { if (file === active && ++checks === 2) { fs.writeFileSync(replacement, original); fs.renameSync(replacement, active); } return lstat(file, ...args); };
    try { assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'CURRENT_LEDGER_CHANGED'); unchanged(); }
    finally { fs.lstatSync = lstat; }
  });
  check('candidate alias of active ledger is not a distinct proposal', () => {
    const alias = path.join(root, 'same-inode-candidate.json'); fs.linkSync(path.join(root, 'ledger.json'), alias);
    try { assert.equal(update(root, 'ledger.json', 'same-inode-candidate.json', 'task').code, 'CANDIDATE_NOT_DISTINCT'); unchanged(); }
    finally { fs.unlinkSync(alias); }
  });
  check('hard-linked read-only candidate passes without changing its alias', () => {
    const candidate = path.join(root, 'candidate.json'), alias = path.join(root, 'candidate-alias.json');
    const bytes = fs.readFileSync(candidate); fs.linkSync(candidate, alias);
    try {
      assert.ok(fs.statSync(candidate).nlink > 1);
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').ok, true);
      assert.deepEqual(fs.readFileSync(path.join(root, 'ledger.json')), bytes);
      assert.deepEqual(fs.readFileSync(candidate), bytes);
      assert.deepEqual(fs.readFileSync(alias), bytes);
    } finally { fs.unlinkSync(alias); }
  });
  check('invalid hard-linked candidate preserves active ledger and both input aliases', () => {
    reset('{"invalid":true}');
    const candidate = path.join(root, 'candidate.json'), alias = path.join(root, 'invalid-candidate-alias.json');
    const bytes = fs.readFileSync(candidate); fs.linkSync(candidate, alias);
    try {
      assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'CANDIDATE_INVALID');
      assert.deepEqual(fs.readFileSync(candidate), bytes);
      assert.deepEqual(fs.readFileSync(alias), bytes);
      unchanged();
    } finally { fs.unlinkSync(alias); }
  });
  check('directory symlink or Windows junction is rejected for either input', () => {
    fs.symlinkSync(root, path.join(root, 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
    try {
      assert.deepEqual(update(root, 'ledger.json', 'linked/candidate.json', 'task'), { ok: false, code: 'UNSAFE_PATH', stage: 'candidate-validation', reason: 'symlink-component' });
      assert.equal(update(root, 'linked/ledger.json', 'candidate.json', 'task').code, 'UNSAFE_PATH');
      assert.equal(update(path.join(root, 'linked'), 'ledger.json', 'candidate.json', 'task').code, 'UNSAFE_ROOT');
      unchanged();
    } finally { fs.unlinkSync(path.join(root, 'linked')); }
  });
  check('last ledger recheck reports guard stage without publishing candidate', () => {
    const lstat = fs.lstatSync; let ledgerChecks = 0;
    fs.lstatSync = (file, ...args) => {
      if (file === path.join(root, 'ledger.json') && ++ledgerChecks === 2) return { isSymbolicLink: () => true };
      return lstat(file, ...args);
    };
    try { assert.deepEqual(update(root, 'ledger.json', 'candidate.json', 'task'), { ok: false, code: 'UNSAFE_PATH', stage: 'ledger-recheck', reason: 'symlink-component' }); }
    finally { fs.lstatSync = lstat; }
    unchanged();
  });
  check('existing writer lock is retained without changing ledger', () => {
    const lock = path.join(root, 'ledger.json.update.lock'); fs.writeFileSync(lock, 'other-owner');
    assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'UPDATE_LOCK_UNAVAILABLE');
    assert.equal(fs.readFileSync(lock, 'utf8'), 'other-owner');
    fs.unlinkSync(lock); unchanged();
  });
  check('atomic rename failure preserves ledger and cleans owned temporary file', () => {
    const rename = fs.renameSync;
    fs.renameSync = () => { throw Object.assign(new Error('simulated'), { code: 'EPERM' }); };
    try { assert.equal(update(root, 'ledger.json', 'candidate.json', 'task').code, 'UPDATE_IO_FAILED'); }
    finally { fs.renameSync = rename; }
    unchanged();
  });
  check('CLI rejects invalid candidate nonzero without source content disclosure', () => {
    reset('SECRET_INVALID_CONTENT');
    const result = spawnSync(process.execPath, [path.resolve(__dirname, '../update-build-learning.cjs'), root, 'ledger.json', 'candidate.json', 'task'], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.equal(JSON.parse(result.stderr).code, 'CANDIDATE_INVALID');
    assert.ok(!result.stderr.includes('SECRET_INVALID_CONTENT')); unchanged();
  });
  console.log(`Learning ledger update: ${passed} checks PASS`);
} finally {
  const resolved = fs.realpathSync(root);
  assert.equal(path.dirname(resolved).toLowerCase(), fs.realpathSync(os.tmpdir()).toLowerCase());
  assert.ok(path.basename(resolved).startsWith('learning-update-'));
  fs.rmSync(resolved, { recursive: true, force: true });
}
