'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const { spawnSync, spawn } = require('node:child_process');
const { parseArgs, scopedOutput, appendEvent, checkCredentialAccess } = require('../scripts/measure-build-command.cjs');

const wrapper = path.resolve(__dirname, '../scripts/measure-build-command.cjs');
const scratch = fs.mkdtempSync(path.join(__dirname, '.timing-test-'));
let passed = 0;
const emptyLedger = { schemaVersion: 1, taskId: 'test-task', scopes: ['supplier', 'contacts'], failures: [], noFailuresReason: 'No failures observed in synthetic timing fixture', commandReceipts: [] };
fs.writeFileSync(path.join(scratch, 'learning.json'), JSON.stringify(emptyLedger));
const base = file => {
  // Each independent case owns a registered receipt; never clear existing events.
  const ledger = `${path.basename(file)}.learning.json`;
  const target = path.resolve(scratch, file);
  if (path.dirname(target) === scratch && path.extname(target) === '.jsonl' && !fs.existsSync(target)) fs.writeFileSync(target, '');
  fs.writeFileSync(path.join(scratch, ledger), JSON.stringify({ ...emptyLedger, commandReceipts: [file] }));
  return ['--output', file, '--task', 'test-task', '--activity', 'test-activity', '--phase', 'verification', '--category', 'test', '--label', 'safe-label', '--learning-ledger', ledger, '--learning-scope', 'supplier'];
};
const events = file => fs.readFileSync(path.join(scratch, file), 'utf8').trim().split('\n').map(JSON.parse);
const run = (file, executable, args = [], extra = []) => spawnSync(process.execPath, [wrapper, ...base(file), ...extra, '--', executable, ...args], { cwd: scratch, encoding: 'utf8', timeout: 10000 });
function check(name, fn) { fn(); passed++; console.log(`PASS ${name}`); }
async function settleChildren(argumentSets) {
  return Promise.allSettled(argumentSets.map((args, i) => new Promise((resolve, reject) => {
    let stderr = '';
    let spawnError;
    const child = spawn(process.execPath, args, { cwd: scratch, stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true, timeout: 10000 });
    child.stderr.on('data', data => { stderr = (stderr + data.toString()).slice(-4096); });
    child.once('error', error => { spawnError = error; });
    // close follows error/exit after stdio closes; every sibling must settle
    // before assertion or cleanup, including when one child fails early.
    child.once('close', (code, signal) => code === 0 && !spawnError ? resolve() : reject(new Error(`Parallel child ${i} failed: code=${code}, signal=${signal}, spawn=${spawnError?.code || 'none'}, stderr=${stderr}`)));
  })));
}
function validatePair(file, expectedStatus) {
  const rows = events(file);
  assert.deepEqual(rows.map(row => row.event), ['start', 'end']);
  assert.equal(rows[0].runId, rows[1].runId);
  assert.equal(rows[1].status, expectedStatus);
  assert.match(rows[0].startedUtc, /^\d{4}-.*Z$/);
  assert.match(rows[1].endedUtc, /^\d{4}-.*Z$/);
  assert.ok(rows[1].elapsedMs >= 0);
  assert.equal(rows[1].metrics.tokens, null);
  assert.equal(rows[1].metrics.aiUnits, null);
  return rows;
}

async function main() {
  let primaryError;
  try {
    const gated = (ledger, category = 'test', scope = 'supplier', extras = []) => {
      fs.writeFileSync(path.join(scratch, 'case-learning.json'), JSON.stringify({ ...ledger, commandReceipts: ['gated.jsonl'] }));
      const args = base('gated.jsonl');
      args[args.indexOf('--category') + 1] = category;
      args[args.indexOf('--learning-ledger') + 1] = 'case-learning.json';
      args[args.indexOf('--learning-scope') + 1] = scope;
      return spawnSync(process.execPath, [wrapper, ...args, ...extras, '--', process.execPath, '-e', 'require("fs").writeFileSync("child-side-effect", "ran")', 'SECRET_ARGUMENT'], { cwd: scratch, encoding: 'utf8', timeout: 10000 });
    };
    const resetSideEffect = () => { if (fs.existsSync(path.join(scratch, 'child-side-effect'))) fs.unlinkSync(path.join(scratch, 'child-side-effect')); };
    const openFailure = { id: 'F1', observedUtc: '2026-09-28T00:00:00Z', symptom: 'Synthetic search failure', scope: 'supplier', blocks: ['supplier'], status: 'open', evidenceGap: 'Synthetic fixture has no original runtime event' };
    check('open scope blocks child before timing or side effects and keeps arguments private', () => {
      const result = gated({ ...emptyLedger, failures: [openFailure] });
      assert.equal(result.status, 65, result.stderr);
      assert.match(result.stderr, /Learning gate blocked/);
      assert.ok(!result.stderr.includes('SECRET_ARGUMENT'));
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      assert.equal(fs.readFileSync(path.join(scratch, 'gated.jsonl'), 'utf8'), '');
    });
    check('unaffected valid scope passes and repair permits structurally valid open work', () => {
      for (const [category, scope] of [['build', 'contacts'], ['repair', 'supplier']]) {
        const result = gated({ ...emptyLedger, failures: [openFailure] }, category, scope);
        assert.equal(result.status, 0, result.stderr);
        assert.equal(fs.readFileSync(path.join(scratch, 'child-side-effect'), 'utf8'), 'ran');
        resetSideEffect();
      }
    });
    check('Closeout rejects unresolved failures outside requested scope', () => {
      assert.equal(gated({ ...emptyLedger, failures: [openFailure] }, 'closeout', 'contacts').status, 65);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
    });
    check('unknown scope cannot bypass an open failure with a typo', () => {
      const result = gated({ ...emptyLedger, failures: [openFailure] }, 'test', 'suplier');
      assert.equal(result.status, 65, result.stderr);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
    });
    check('missing flags and mismatched task block; explicit ledger task allows worker identity', () => {
      for (const key of ['--learning-ledger', '--learning-scope']) {
        const args = base('missing-learning.jsonl'); args.splice(args.indexOf(key), 2);
        const result = spawnSync(process.execPath, [wrapper, ...args, '--', process.execPath, '-e', 'require("fs").writeFileSync("child-side-effect", "ran")'], { cwd: scratch, encoding: 'utf8' });
        assert.equal(result.status, 65, result.stderr);
        assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      }
      const otherTask = { ...emptyLedger, taskId: 'root-task' };
      assert.equal(gated(otherTask).status, 65);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      assert.equal(gated(otherTask, 'test', 'supplier', ['--learning-task', 'root-task']).status, 0);
      resetSideEffect();
    });
    check('closed current evidence passes and stale source reopens before child launch', () => {
      fs.mkdirSync(path.join(scratch, 'docs/lessons'), { recursive: true });
      fs.writeFileSync(path.join(scratch, 'docs/lessons/rule.md'), 'Prevent recurrence');
      fs.writeFileSync(path.join(scratch, 'source.js'), 'original');
      fs.writeFileSync(path.join(scratch, 'proof.json'), '{"pass":true}');
      const ref = file => ({ path: file, sha256: createHash('sha256').update(fs.readFileSync(path.join(scratch, file))).digest('hex') });
      const closed = { ...openFailure, status: 'closed', cause: 'Missing local contract', correction: 'Added contract', prevention: { kind: 'gate', owner: 'docs/lessons/rule.md', rule: 'Check source before continuation' }, verification: { evidence: [ref('proof.json')], sources: [ref('source.js')], command: 'synthetic fixture', result: 'pass', reviewer: 'test-owner' } };
      const ledger = { ...emptyLedger, failures: [closed] };
      assert.equal(gated(ledger).status, 0);
      resetSideEffect();
      fs.writeFileSync(path.join(scratch, 'source.js'), 'changed');
      const result = gated(ledger);
      assert.equal(result.status, 65, result.stderr);
      assert.match(result.stderr, /stale hash/);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
    });
    check('exported measure enforces the gate while coordination and wait remain optional', () => {
      const options = parseArgs([...base('direct-gate.jsonl'), '--', process.execPath, '-e', 'require("fs").writeFileSync("child-side-effect", "ran")']);
      delete options['learning-ledger'];
      const driver = `require(${JSON.stringify(wrapper)}).measure(${JSON.stringify(options)}).then(code=>process.exitCode=code)`;
      const result = spawnSync(process.execPath, ['-e', driver], { cwd: scratch, encoding: 'utf8' });
      assert.equal(result.status, 65, result.stderr);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      for (const category of ['coordination', 'wait']) {
        const args = base(`${category}.jsonl`);
        args[args.indexOf('--category') + 1] = category;
        args.splice(args.indexOf('--learning-ledger'), 2);
        args.splice(args.indexOf('--learning-scope'), 2);
        const optional = spawnSync(process.execPath, [wrapper, ...args, '--', process.execPath, '-e', ''], { cwd: scratch, encoding: 'utf8' });
        assert.equal(optional.status, 0, optional.stderr);
        validatePair(`${category}.jsonl`, 'succeeded');
      }
    });
    check('unregistered output blocks; failed child blocks the next command until learning is captured', () => {
      const args = base('registered.jsonl');
      const ledgerFile = path.join(scratch, args[args.indexOf('--learning-ledger') + 1]);
      fs.writeFileSync(ledgerFile, JSON.stringify(emptyLedger));
      const invoke = source => spawnSync(process.execPath, [wrapper, ...args, '--', process.execPath, '-e', source], { cwd: scratch, encoding: 'utf8' });
      const blocked = invoke('require("fs").writeFileSync("child-side-effect", "ran")');
      assert.equal(blocked.status, 65, blocked.stderr);
      assert.match(blocked.stderr, /registered/);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      fs.writeFileSync(ledgerFile, JSON.stringify({ ...emptyLedger, commandReceipts: ['registered.jsonl'] }));
      fs.unlinkSync(path.join(scratch, 'registered.jsonl'));
      assert.equal(invoke('').status, 65);
      assert.ok(!fs.existsSync(path.join(scratch, 'registered.jsonl')));
      fs.writeFileSync(path.join(scratch, 'registered.jsonl'), '');
      args[args.indexOf('--output') + 1] = path.join(scratch, 'registered.jsonl');
      assert.equal(invoke('process.exit(23)').status, 23);
      const retry = invoke('require("fs").writeFileSync("child-side-effect", "ran")');
      assert.equal(retry.status, 65, retry.stderr);
      assert.match(retry.stderr, /unlogged failed command/);
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      assert.equal(events('registered.jsonl').length, 2);
      const failedRun = events('registered.jsonl')[1].runId;
      fs.writeFileSync(ledgerFile, JSON.stringify({ ...emptyLedger, commandReceipts: ['registered.jsonl'], failures: [{ ...openFailure, commandRunIds: [failedRun] }] }));
      assert.equal(invoke('require("fs").writeFileSync("child-side-effect", "ran")').status, 65);
      args[args.indexOf('--category') + 1] = 'repair';
      assert.equal(invoke('').status, 0);
    });
    check('AI Studio cache preflight distinguishes denied missing and accessible metadata without reading contents', () => {
      const options = { executable: process.execPath, args: ['.agents/skills/aistudio/scripts/aistudio.js', 'do-create-workflow'] };
      const fakeHome = path.join(scratch, 'fake-home');
      let accesses = 0;
      const allowed = { lstatSync: () => ({}), accessSync: () => { accesses++; }, readFileSync: () => assert.fail('must never read credential contents') };
      assert.deepEqual(checkCredentialAccess(options, { fsApi: allowed, homeDir: fakeHome, cwd: scratch }), { ok: true, checked: true });
      assert.equal(accesses, 1);
      for (const method of ['lstatSync', 'accessSync']) for (const code of ['EPERM', 'EACCES']) {
        const denied = { ...allowed, [method]: () => { throw Object.assign(new Error('SECRET_CONTEXT'), { code }); } };
        assert.deepEqual(checkCredentialAccess(options, { fsApi: denied, homeDir: fakeHome, cwd: scratch }), { ok: false, checked: true, code: 'HOST_CREDENTIAL_ACCESS_REQUIRED' });
      }
      const missing = { ...allowed, lstatSync: () => { throw Object.assign(new Error('missing'), { code: 'ENOENT' }); } };
      assert.deepEqual(checkCredentialAccess(options, { fsApi: missing, homeDir: fakeHome, cwd: scratch }), { ok: true, checked: true, cacheMissing: true });
      const forbidden = { lstatSync: () => assert.fail('unrelated/help commands must skip') };
      for (const args of [['other.js'], ['.agents/skills/aistudio/scripts/aistudio.js', '--help']]) {
        assert.deepEqual(checkCredentialAccess({ ...options, args }, { fsApi: forbidden, homeDir: fakeHome, cwd: scratch }), { ok: true, checked: false });
      }
    });
    check('denied AI Studio cache access blocks before child launch or timing append', () => {
      const script = path.join(scratch, '.agents/skills/aistudio/scripts/aistudio.js');
      fs.mkdirSync(path.dirname(script), { recursive: true });
      fs.writeFileSync(script, 'require("fs").writeFileSync("child-side-effect", "ran")');
      const options = parseArgs([...base('cache-denied.jsonl'), '--', process.execPath, script, 'do-create-workflow']);
      const driver = `const f=require('node:fs'),p=require('node:path'),o=require('node:os'); const c=p.join(o.homedir(),'.config','aistudio-cli','credentials.json'); const original=f.lstatSync; f.lstatSync=(file,...args)=>{if(file===c)throw Object.assign(new Error('SECRET_CONTEXT'),{code:'EPERM'});return original(file,...args)}; require(${JSON.stringify(wrapper)}).measure(${JSON.stringify(options)}).then(code=>process.exitCode=code);`;
      const result = spawnSync(process.execPath, ['-e', driver], { cwd: scratch, encoding: 'utf8' });
      assert.equal(result.status, 77, result.stderr);
      assert.match(result.stderr, /HOST_CREDENTIAL_ACCESS_REQUIRED/);
      assert.ok(!result.stderr.includes('SECRET_CONTEXT'));
      assert.ok(!fs.existsSync(path.join(scratch, 'child-side-effect')));
      assert.equal(fs.readFileSync(path.join(scratch, 'cache-denied.jsonl'), 'utf8'), '');
    });
    check('explicit fine activity kind is retained and invalid kind never launches', () => {
      const result = run('review-kind.jsonl', process.execPath, ['-e', ''], ['--activity-kind', 'review']);
      assert.equal(result.status, 0, result.stderr);
      assert(events('review-kind.jsonl').every(row => row.activityKind === 'review'));
      assert.throws(() => parseArgs([...base('x.jsonl'), '--activity-kind', 'unknown-kind', '--', 'node']));
    });
    check('success, passthrough, metadata and unavailable metrics', () => {
      const result = run('success.jsonl', process.execPath, ['-e', 'console.log("visible stdout"); console.error("visible stderr")'], ['--dependency', 'bo-proof', '--overlap', 'other-task', '--parent', 'phase-parent', '--rerun-reason', 'changed-parser']);
      assert.equal(result.status, 0, result.stderr);
      assert.match(result.stdout, /visible stdout/);
      assert.match(result.stderr, /visible stderr/);
      const [, end] = validatePair('success.jsonl', 'succeeded');
      assert.deepEqual(end.dependencyIds, ['bo-proof']);
      assert.deepEqual(end.overlapIds, ['other-task']);
      assert.equal(end.parentActivityId, 'phase-parent');
      assert.equal(end.rerunReason, 'changed-parser');
      assert.equal(end.exitCode, 0);
      assert.equal(end.processStatus, 'exited');
      assert.equal(end.semanticOutcome, 'unknown');
    });
    check('nonzero child exit is preserved', () => {
      const result = run('failure.jsonl', process.execPath, ['-e', 'process.exit(23)']);
      assert.equal(result.status, 23);
      assert.equal(validatePair('failure.jsonl', 'failed')[1].childExitCode, 23);
      assert.equal(events('failure.jsonl')[1].semanticOutcome, 'unknown');
    });
    check('spawn failure is sanitized and retained', () => {
      const result = run('spawn.jsonl', path.join(scratch, 'nonexistent-program'), ['SECRET_ARGUMENT']);
      assert.equal(result.status, 127);
      assert.equal(validatePair('spawn.jsonl', 'spawn-failed')[1].spawnError, 'ENOENT');
      assert.ok(!result.stderr.includes('SECRET_ARGUMENT'));
    });
    check('start is durable before child begins', () => {
      const source = 'const f=require("node:fs"); const rows=f.readFileSync("start.jsonl","utf8").trim().split("\\n").map(JSON.parse); if(rows.length!==1||rows[0].event!=="start") process.exit(19);';
      assert.equal(run('start.jsonl', process.execPath, ['-e', source]).status, 0);
      validatePair('start.jsonl', 'succeeded');
    });
    check('args with spaces and shell metacharacters remain literal; receipts redact args, environment and output', () => {
      const values = ['value with spaces', '& echo SECRET_OUTPUT', '$(SECRET_COMMAND)', '; SECRET_SEMICOLON', '"quoted"', '%SECRET_ENV%'];
      const script = 'require("node:assert/strict").deepEqual(process.argv.slice(1),JSON.parse(process.env.TIMING_EXPECTED_ARGS)); console.log("SECRET_OUTPUT");';
      const result = spawnSync(process.execPath, [wrapper, ...base('literal.jsonl'), '--', process.execPath, '-e', script, ...values], { cwd: scratch, encoding: 'utf8', timeout: 10000, env: { ...process.env, TIMING_EXPECTED_ARGS: JSON.stringify(values), SECRET_ENV: 'SECRET_ENV_VALUE' } });
      assert.equal(result.status, 0, result.stderr);
      validatePair('literal.jsonl', 'succeeded');
      const receipt = fs.readFileSync(path.join(scratch, 'literal.jsonl'), 'utf8');
      assert.ok(!receipt.includes('SECRET'));
      assert.ok(!receipt.includes('TIMING_EXPECTED_ARGS'));
      assert.ok(!receipt.includes(script));
      assert.ok(!receipt.includes(path.dirname(process.execPath)));
    });
    check('parser rejects missing, duplicate, unknown, oversized and malformed metadata', () => {
      assert.throws(() => parseArgs([]));
      assert.throws(() => parseArgs([...base('x.jsonl'), '--task', 'duplicate', '--', 'node']));
      assert.throws(() => parseArgs([...base('x.jsonl'), '--unknown', 'a', '--', 'node']));
      assert.throws(() => parseArgs([...base('x.jsonl'), '--parent', 'x'.repeat(257), '--', 'node']));
      assert.throws(() => parseArgs([...base('x.jsonl'), '--parent', 'line\nbreak', '--', 'node']));
      assert.deepEqual(parseArgs(['--help']), { help: true });
    });
    check('output cannot escape cwd or use missing parent; setup failure does not launch child', () => {
      assert.throws(() => scopedOutput('../outside.jsonl', scratch));
      assert.throws(() => scopedOutput('missing/x.jsonl', scratch));
      assert.throws(() => scopedOutput('x.txt', scratch));
      const result = run('../outside.jsonl', process.execPath, ['-e', 'require("fs").writeFileSync("UNEXPECTED", "launched")']);
      assert.equal(result.status, 74);
      assert.ok(!fs.existsSync(path.join(scratch, 'UNEXPECTED')));
    });
    check('stale lock fails without deleting another writer lock or launching child', () => {
      fs.writeFileSync(path.join(scratch, 'locked.jsonl.lock'), 'existing-owner');
      const result = run('locked.jsonl', process.execPath, ['-e', 'require("fs").writeFileSync("UNEXPECTED", "launched")']);
      assert.equal(result.status, 74);
      assert.equal(fs.readFileSync(path.join(scratch, 'locked.jsonl.lock'), 'utf8'), 'existing-owner');
      assert.ok(!fs.existsSync(path.join(scratch, 'UNEXPECTED')));
      fs.unlinkSync(path.join(scratch, 'locked.jsonl.lock'));
    });
    check('completion append failure cannot report successful measured completion', () => {
      const result = run('end-failure.jsonl', process.execPath, ['-e', 'require("fs").writeFileSync("end-failure.jsonl.lock", "external-lock")']);
      assert.equal(result.status, 74);
      assert.match(result.stderr, /outcome may be incomplete/);
      assert.deepEqual(events('end-failure.jsonl').map(row => row.event), ['start']);
      assert.equal(fs.readFileSync(path.join(scratch, 'end-failure.jsonl.lock'), 'utf8'), 'external-lock');
      fs.unlinkSync(path.join(scratch, 'end-failure.jsonl.lock'));
    });
    check('safe manual interrupt records request and child outcome', () => {
      // Emitting the actual handler event is portable; Windows process.kill on the
      // wrapper itself forcibly terminates it and cannot exercise JS signal handlers.
      const options = parseArgs([...base('interrupt.jsonl'), '--', process.execPath, '-e', 'setTimeout(()=>{},30000)']);
      const driver = `const {measure}=require(${JSON.stringify(wrapper)}); measure(${JSON.stringify(options)}).then(code=>process.exitCode=code); setTimeout(()=>process.emit('SIGINT'),250);`;
      const result = spawnSync(process.execPath, ['-e', driver], { cwd: scratch, encoding: 'utf8', timeout: 10000 });
      assert.equal(result.status, 130, result.stderr);
      const rows = events('interrupt.jsonl');
      assert.deepEqual(rows.map(row => row.event), ['start', 'interrupt', 'end']);
      assert.equal(rows[2].status, 'interrupted');
      assert.equal(rows[2].interruptSignal, 'SIGINT');
    });
    check('early wrapper exit records unfinished without invented child success', () => {
      const options = parseArgs([...base('unfinished.jsonl'), '--', process.execPath, '-e', 'setTimeout(()=>{},300)']);
      const driver = `const {measure}=require(${JSON.stringify(wrapper)}); measure(${JSON.stringify(options)}); setTimeout(()=>process.exit(42),100);`;
      const result = spawnSync(process.execPath, ['-e', driver], { cwd: scratch, encoding: 'utf8', timeout: 10000 });
      assert.equal(result.status, 42);
      const rows = events('unfinished.jsonl');
      assert.deepEqual(rows.map(row => row.event), ['start', 'unfinished']);
      assert.equal(rows[1].status, 'unknown');
      assert.ok(!Object.hasOwn(rows[1], 'childExitCode'));
    });
    if (process.platform === 'win32') check('transient Windows lock-acquisition EPERM retries without lock takeover', () => {
      const target = path.join(scratch, 'transient.jsonl');
      const original = fs.openSync;
      let attempts = 0;
      fs.openSync = (...args) => {
        if (args[0] === `${target}.lock` && attempts++ === 0) throw Object.assign(new Error('simulated delete-pending'), { code: 'EPERM' });
        return original(...args);
      };
      try { appendEvent(target, { event: 'verified' }); }
      finally { fs.openSync = original; }
      assert.equal(attempts, 2);
      assert.deepEqual(events('transient.jsonl'), [{ event: 'verified' }]);
      assert.ok(!fs.existsSync(`${target}.lock`));
    });
    const failedSibling = await settleChildren([
      ['-e', 'console.error("forced-test-failure");process.exit(37)'],
      ['-e', 'setTimeout(()=>require("fs").writeFileSync("sibling-completed", "yes"),250)'],
    ]);
    check('failed concurrent child is retained only after delayed sibling completes', () => {
      assert.equal(failedSibling[0].status, 'rejected');
      assert.match(failedSibling[0].reason.message, /code=37.*forced-test-failure/s);
      assert.equal(failedSibling[1].status, 'fulfilled');
      assert.equal(fs.readFileSync(path.join(scratch, 'sibling-completed'), 'utf8'), 'yes');
    });
    const concurrent = await settleChildren(Array.from({ length: 8 }, (_, i) => [wrapper, ...base('parallel.jsonl'), '--', process.execPath, '-e', `setTimeout(()=>{},${i * 5})`]));
    const failures = concurrent.filter(result => result.status === 'rejected').map(result => result.reason);
    if (failures.length) throw new AggregateError(failures, 'Concurrent timing writers failed after all child handles closed');
    check('concurrent writers append complete lines and distinct correlated pairs', () => {
      const rows = events('parallel.jsonl');
      assert.equal(rows.length, 16);
      const ids = [...new Set(rows.map(row => row.runId))];
      assert.equal(ids.length, 8);
      for (const id of ids) assert.deepEqual(rows.filter(row => row.runId === id).map(row => row.event), ['start', 'end']);
      assert.ok(!fs.existsSync(path.join(scratch, 'parallel.jsonl.lock')));
    });
    console.log(`Timing wrapper: ${passed} checks PASS`);
  } catch (error) { primaryError = error; }
  finally {
    // Only this exact mkdtemp directory under tests belongs to this invocation.
    try {
      const resolved = fs.realpathSync(scratch);
      assert.equal(path.dirname(resolved).toLowerCase(), fs.realpathSync(__dirname).toLowerCase());
      assert.ok(path.basename(resolved).startsWith('.timing-test-'));
      fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
    catch (cleanupError) {
      if (primaryError) primaryError = new AggregateError([primaryError, cleanupError], 'Timing test failed; scoped cleanup also failed');
      else primaryError = cleanupError;
    }
  }
  if (primaryError) throw primaryError;
}
main().catch(error => { console.error(error); process.exitCode = 1; });
