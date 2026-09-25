'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync, spawn } = require('node:child_process');
const { parseArgs, scopedOutput, appendEvent } = require('../scripts/measure-build-command.cjs');

const wrapper = path.resolve(__dirname, '../scripts/measure-build-command.cjs');
const scratch = fs.mkdtempSync(path.join(__dirname, '.timing-test-'));
let passed = 0;
const base = file => ['--output', file, '--task', 'test-task', '--activity', 'test-activity', '--phase', 'verification', '--category', 'test', '--label', 'safe-label'];
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
    });
    check('nonzero child exit is preserved', () => {
      const result = run('failure.jsonl', process.execPath, ['-e', 'process.exit(23)']);
      assert.equal(result.status, 23);
      assert.equal(validatePair('failure.jsonl', 'failed')[1].childExitCode, 23);
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
