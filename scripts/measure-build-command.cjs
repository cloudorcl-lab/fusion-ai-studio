#!/usr/bin/env node
'use strict';

// Arguments, environment and process output deliberately never enter the receipt.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { randomUUID } = require('node:crypto');
const { spawn } = require('node:child_process');

const HELP = `Usage: node scripts/measure-build-command.cjs
  --output <cwd-relative-or-contained-absolute.jsonl>
  --task <id> --activity <id> --phase <name>
  --category <build|test|repair|coordination|wait|closeout> --label <safe-label>
  --learning-ledger <repository-relative.json> --learning-scope <scope>
  [--learning-task <ledger-task-id>]
  [--continuation-contract <contained-contract.json>]
  [--parent <activity-id>] [--dependency <id>] [--overlap <id>]
  [--activity-kind <execution|review|evidence-capture|coordination|context-recovery|human-wait>]
  [--rerun-reason <safe-text>] -- <executable> [arguments...]

Output parent must already exist. Metadata is public evidence: never put secrets
in labels or IDs. Child stdin/stdout/stderr are inherited, not saved. Executables
run without a shell; invoke node or pwsh explicitly for scripts. Each invocation
has a unique runId; group events by runId, not adjacent lines. Start without end
means outcome unknown, not failure or success. Concurrent appends use a bounded
exclusive lock; a stale .lock must be investigated manually. No process-tree
management, browser keep-alive, token or AI Unit collection is performed.
Build/test require Execute learning clearance; closeout requires Closeout.
Repair requires structural Startup clearance and does not authorize business
creates. Coordination/wait do not require learning flags. Ledger task defaults
to --task. A blocked learning gate never launches the child.
Initialize an empty receipt file during intake and register its repository-relative
path in ledger.commandReceipts. The selected --output must be registered there.
Actual AI Studio node CLI calls also require readable credential-cache metadata
and access before launch. Permission denial requires host credential access;
this wrapper never changes permissions or reads credential contents.
Optional --continuation-contract recognizes only an explicitly bound single
run-workflow-test with pending local hybrid judging. It retains exit 1, archives
validated evidence and records needs-judge, never PASS. Category must be test or repair.
Contract fields: kind=workflow-test-needs-local-judge-v1, testName, testFile,
workflowCode, workflowStatus, workflowVersion, dataSource, report, judgeRequest.
Paths are confined repository-relative files; report/request parents must exist.
Use outcome with the same run ID and attached report as evidence to resolve it.
Unresolved continuations block PhaseExit/Closeout. Report locks are exclusive;
investigate stale .learning-lock files, never automatically remove another owner.

Additional modes (same command owner):
  report --input <contained.jsonl> [--input <contained.jsonl> ...]
    --from <UTC> --to <UTC> [--stale-ms <milliseconds>]
  interval --output <contained.jsonl> --id <unique-id> --task <id>
    --activity <id> --kind <execution|review|evidence-capture|coordination|context-recovery|human-wait|human|approval|wait> --state <start|end>
  outcome --output <contained.jsonl> --id <run-id>
    --outcome <passed|failed|needs-judge|unknown> --evidence <relative-path>
Report emits JSON to stdout. Intervals record observed boundaries now, not
retrospective guesses. Outcome annotations require separate reviewed evidence;
neither a zero nor nonzero process exit proves semantic acceptance.
`;

function parseArgs(argv) {
  if (argv.length === 1 && argv[0] === '--help') return { help: true };
  const values = { dependency: [], overlap: [] };
  const single = new Set(['output', 'task', 'activity', 'phase', 'category', 'label', 'parent', 'rerun-reason', 'activity-kind', 'learning-ledger', 'learning-scope', 'learning-task', 'continuation-contract']);
  let split = -1;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--') { split = i; break; }
    const key = argv[i].startsWith('--') ? argv[i].slice(2) : '';
    if (!single.has(key) && key !== 'dependency' && key !== 'overlap') throw new Error('Invalid option');
    const value = argv[++i];
    if (!value || value.startsWith('--') || /[\x00-\x1f\x7f]/.test(value)) throw new Error('Invalid option value');
    if (key !== 'output' && value.length > 256) throw new Error('Metadata exceeds 256 characters');
    if (key === 'dependency' || key === 'overlap') {
      if (values[key].length === 32) throw new Error('Too many relationship IDs');
      values[key].push(value);
    } else {
      if (Object.hasOwn(values, key)) throw new Error('Duplicate option');
      values[key] = value;
    }
  }
  for (const key of ['output', 'task', 'activity', 'phase', 'category', 'label']) {
    if (!values[key]) throw new Error('Missing required option');
  }
  if (!['build', 'test', 'repair', 'coordination', 'wait', 'closeout'].includes(values.category)) throw new Error('Invalid category');
  if (values['activity-kind'] && !require('./build-timing-report.cjs').activityKinds.includes(values['activity-kind'])) throw new Error('Invalid activity kind');
  if (split < 0 || !argv[split + 1] || argv[split + 1].includes('\0')) throw new Error('Missing executable');
  return { ...values, executable: argv[split + 1], args: argv.slice(split + 2) };
}

function scopedOutput(value, cwd = process.cwd()) {
  const root = fs.realpathSync(cwd);
  const output = path.resolve(root, value);
  const contained = candidate => {
    const relative = path.relative(root, candidate);
    return relative !== '' && relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
  };
  if (!contained(output) || path.extname(output) !== '.jsonl') throw new Error('Receipt must be a contained .jsonl file');
  const parent = fs.realpathSync(path.dirname(output));
  if (parent !== root && !contained(parent)) throw new Error('Receipt parent escapes cwd');
  for (const candidate of [output, `${output}.lock`]) {
    try {
      const stat = fs.lstatSync(candidate);
      if (stat.isSymbolicLink() || !stat.isFile()) throw new Error('Receipt and lock must be regular files');
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return output;
}

// A single lock-protected append and fsync per event; never truncate old evidence.
function appendEvent(output, event) {
  const lock = `${output}.lock`;
  let lockFd;
  for (let attempt = 0; attempt < 50; attempt++) {
    try { lockFd = fs.openSync(lock, 'wx', 0o600); break; }
    catch (error) {
      // Windows can return EPERM while another owner's deleted lock is still
      // pending filesystem handle release. Retry acquisition only, retaining
      // the same bound and never removing or taking over another owner's lock.
      const contended = error.code === 'EEXIST' || (process.platform === 'win32' && error.code === 'EPERM');
      if (!contended || attempt === 49) { error.timingStage = 'lock-acquisition'; throw error; }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 10);
    }
  }
  try {
    const fd = fs.openSync(output, 'a', 0o600);
    try { fs.writeFileSync(fd, `${JSON.stringify(event)}\n`); fs.fsyncSync(fd); }
    finally { fs.closeSync(fd); }
  } finally { fs.closeSync(lockFd); fs.unlinkSync(lock); }
}

function signalCode(signal) { return 128 + (os.constants.signals[signal] || 1); }
function safeErrorCode(error) {
  const code = /^[A-Z0-9_]+$/.test(error?.code || '') ? error.code : 'UNAVAILABLE';
  return error?.timingStage === 'lock-acquisition' ? `${code}, lock-acquisition` : code;
}

function learningClearance(options, output) {
  if (['coordination', 'wait'].includes(options.category)) return true;
  const phases = { build: 'Execute', test: 'Execute', closeout: 'Closeout', repair: 'Startup' };
  let errors;
  if (!phases[options.category] || !options['learning-ledger'] || !options['learning-scope']) {
    errors = ['Execution requires a supported category, --learning-ledger and --learning-scope'];
  } else {
    try {
      const result = require('./verify-build-learning.cjs').verify(process.cwd(), options['learning-ledger'], {
        phase: phases[options.category], scope: options['learning-scope'], taskId: options['learning-task'] || options.task,
      });
      if (result?.ok === true && Array.isArray(result.errors) && result.errors.length === 0) {
        const ledger = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), options['learning-ledger']), 'utf8').replace(/^\uFEFF/, ''));
        const relative = path.relative(fs.realpathSync(process.cwd()), output).split(path.sep).join('/');
        if (Array.isArray(ledger.commandReceipts) && ledger.commandReceipts.includes(relative)) return true;
        errors = ['Selected output must be an existing receipt registered in ledger.commandReceipts'];
      } else errors = Array.isArray(result?.errors) && result.errors.length ? result.errors : ['Learning verifier returned no valid clearance'];
    } catch { errors = ['Learning verifier unavailable; execution withheld']; }
  }
  // Verifier diagnostics only: never serialize child arguments, environment or output.
  process.stderr.write('Learning gate blocked child execution:\n');
  for (const error of errors.slice(0, 10)) process.stderr.write(`- ${String(error).replace(/[\x00-\x1f\x7f]/g, ' ').slice(0, 240)}\n`);
  if (errors.length > 10) process.stderr.write('- Additional learning errors omitted; inspect the ledger verifier.\n');
  return false;
}

function checkCredentialAccess(options, { fsApi = fs, homeDir = os.homedir(), cwd = process.cwd() } = {}) {
  const executable = path.win32.basename(path.basename(options.executable || '')).toLowerCase();
  if (!['node', 'node.exe'].includes(executable) || !Array.isArray(options.args)) return { ok: true, checked: false };
  const expected = path.resolve(cwd, '.agents/skills/aistudio/scripts/aistudio.js');
  const same = candidate => process.platform === 'win32' ? candidate.toLowerCase() === expected.toLowerCase() : candidate === expected;
  const index = options.args.findIndex(arg => typeof arg === 'string' && same(path.resolve(cwd, arg)));
  if (index < 0 || options.args[index + 1] === 'help' || options.args.slice(index + 1).some(arg => ['--help', '-h'].includes(arg))) return { ok: true, checked: false };
  const cache = path.join(homeDir, '.config', 'aistudio-cli', 'credentials.json');
  try {
    fsApi.lstatSync(cache);
    fsApi.accessSync(cache, fs.constants.R_OK);
    return { ok: true, checked: true };
  } catch (error) {
    if (error.code === 'ENOENT') return { ok: true, checked: true, cacheMissing: true };
    return { ok: false, checked: true, code: ['EACCES', 'EPERM'].includes(error.code) ? 'HOST_CREDENTIAL_ACCESS_REQUIRED' : 'CREDENTIAL_ACCESS_CHECK_FAILED' };
  }
}

async function measure(options) {
  const output = scopedOutput(options.output);
  if (!learningClearance(options, output)) return 65;
  const access = checkCredentialAccess(options);
  if (!access.ok) {
    process.stderr.write(`${access.code}: AI Studio child execution withheld; use the authorized host credential-access context.\n`);
    return 77;
  }
  const startedUtc = new Date().toISOString();
  const continuationSession = options['continuation-contract'] ? require('./workflow-test-continuation.cjs').begin(process.cwd(), options, startedUtc) : null;
  const start = process.hrtime.bigint();
  const base = {
    schemaVersion: 1, runId: randomUUID(), taskId: options.task,
    activityId: options.activity, phase: options.phase, category: options.category,
    activityKind: options['activity-kind'] || (options.category === 'coordination' ? 'coordination' : options.category === 'wait' ? 'human-wait' : 'execution'),
    label: options.label, executable: path.win32.basename(path.basename(options.executable)),
    parentActivityId: options.parent || null, dependencyIds: options.dependency,
    overlapIds: options.overlap, rerunReason: options['rerun-reason'] || null,
    startedUtc,
  };
  const metrics = { tokens: null, aiUnits: null, workflowElapsedMs: null, availability: 'Not collected by command timing wrapper' };
  try { appendEvent(output, { ...base, event: 'start', status: 'running', metrics }); }
  catch (error) { continuationSession?.release(); throw error; }
  let finished = false;
  let child;
  let interrupted = null;
  let spawnError = null;
  const stamp = () => ({ observedUtc: new Date().toISOString(), elapsedMs: Number(process.hrtime.bigint() - start) / 1e6 });
  const emit = event => {
    try { appendEvent(output, { ...base, ...stamp(), ...event, metrics }); return true; }
    catch (error) { process.stderr.write(`Timing receipt append failed (${safeErrorCode(error)}); execution outcome may be incomplete.\n`); return false; }
  };
  const onExit = () => {
    if (!finished) emit({ event: 'unfinished', status: 'unknown', reason: 'Wrapper exited without observing child completion' });
  };
  const onSignal = signal => {
    if (finished) return;
    interrupted = interrupted || signal;
    emit({ event: 'interrupt', status: 'termination-requested', signal });
    if (child) { try { child.kill(signal); } catch { /* completion remains unverified until close */ } }
  };
  const onInt = () => onSignal('SIGINT');
  const onTerm = () => onSignal('SIGTERM');
  process.once('exit', onExit);
  process.on('SIGINT', onInt);
  process.on('SIGTERM', onTerm);
  try {
    const result = await new Promise(resolve => {
      try {
        child = spawn(options.executable, options.args, { shell: false, stdio: 'inherit', windowsHide: true });
        child.once('error', error => { spawnError = /^[A-Z0-9_]+$/.test(error.code || '') ? error.code : 'SPAWN_ERROR'; });
        child.once('close', (code, signal) => resolve({ code, signal }));
      } catch { spawnError = 'SPAWN_ERROR'; resolve({ code: null, signal: null }); }
    });
    const exitCode = interrupted ? signalCode(interrupted) : spawnError ? 127 : result.signal ? signalCode(result.signal) : result.code;
    const endedUtc = new Date().toISOString();
    let continuation = null;
    if (continuationSession) {
      try {
        continuation = require('./workflow-test-continuation.cjs').finish(continuationSession,
          { childExitCode: result.code, signal: result.signal, interruptSignal: interrupted, spawnError }, endedUtc,
          path.relative(process.cwd(), output).split(path.sep).join('/') + '.' + base.runId + '.continuation.json', base.runId);
      } catch { /* Unknown evidence never exempts a nonzero process. */ }
    }
    const recorded = emit({
      event: 'end', endedUtc,
      status: spawnError ? 'spawn-failed' : interrupted ? 'interrupted' : result.signal ? 'signaled' : result.code === 0 ? 'succeeded' : 'failed',
      exitCode, childExitCode: result.code, signal: result.signal, interruptSignal: interrupted, spawnError,
      processStatus: spawnError ? 'spawn-failed' : interrupted ? 'interrupted' : result.signal ? 'signaled' : 'exited',
      semanticOutcome: 'unknown',
      ...(continuation || {}),
    });
    finished = true;
    return !recorded && exitCode === 0 ? 74 : exitCode ?? 1;
  } finally {
    continuationSession?.release();
    process.removeListener('exit', onExit);
    process.removeListener('SIGINT', onInt);
    process.removeListener('SIGTERM', onTerm);
  }
}

async function main(argv) {
  if (['report', 'interval', 'outcome'].includes(argv[0])) {
    return require('./build-timing-report.cjs').main(argv, { scopedOutput, appendEvent });
  }
  let options;
  try { options = parseArgs(argv); }
  catch (error) { process.stderr.write(`Timing arguments rejected: ${error.message}. See --help.\n`); return 64; }
  if (options.help) { process.stdout.write(HELP); return 0; }
  try { return await measure(options); }
  catch (error) { process.stderr.write(`Timing setup failed (${safeErrorCode(error)}); child execution was not confirmed. Check receipt path and lock.\n`); return 74; }
}

if (require.main === module) main(process.argv.slice(2)).then(code => { process.exitCode = code; });
module.exports = { parseArgs, scopedOutput, appendEvent, measure, main, checkCredentialAccess };
