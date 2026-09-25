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
  [--parent <activity-id>] [--dependency <id>] [--overlap <id>]
  [--rerun-reason <safe-text>] -- <executable> [arguments...]

Output parent must already exist. Metadata is public evidence: never put secrets
in labels or IDs. Child stdin/stdout/stderr are inherited, not saved. Executables
run without a shell; invoke node or pwsh explicitly for scripts. Each invocation
has a unique runId; group events by runId, not adjacent lines. Start without end
means outcome unknown, not failure or success. Concurrent appends use a bounded
exclusive lock; a stale .lock must be investigated manually. No process-tree
management, browser keep-alive, token or AI Unit collection is performed.
`;

function parseArgs(argv) {
  if (argv.length === 1 && argv[0] === '--help') return { help: true };
  const values = { dependency: [], overlap: [] };
  const single = new Set(['output', 'task', 'activity', 'phase', 'category', 'label', 'parent', 'rerun-reason']);
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
      if (error.code !== 'EEXIST' || attempt === 49) throw error;
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

async function measure(options) {
  const output = scopedOutput(options.output);
  const startedUtc = new Date().toISOString();
  const start = process.hrtime.bigint();
  const base = {
    schemaVersion: 1, runId: randomUUID(), taskId: options.task,
    activityId: options.activity, phase: options.phase, category: options.category,
    label: options.label, executable: path.win32.basename(path.basename(options.executable)),
    parentActivityId: options.parent || null, dependencyIds: options.dependency,
    overlapIds: options.overlap, rerunReason: options['rerun-reason'] || null,
    startedUtc,
  };
  const metrics = { tokens: null, aiUnits: null, workflowElapsedMs: null, availability: 'Not collected by command timing wrapper' };
  appendEvent(output, { ...base, event: 'start', status: 'running', metrics });
  let finished = false;
  let child;
  let interrupted = null;
  let spawnError = null;
  const stamp = () => ({ observedUtc: new Date().toISOString(), elapsedMs: Number(process.hrtime.bigint() - start) / 1e6 });
  const emit = event => {
    try { appendEvent(output, { ...base, ...stamp(), ...event, metrics }); return true; }
    catch { process.stderr.write('Timing receipt append failed; execution outcome may be incomplete.\n'); return false; }
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
    const recorded = emit({
      event: 'end', endedUtc: new Date().toISOString(),
      status: spawnError ? 'spawn-failed' : interrupted ? 'interrupted' : result.signal ? 'signaled' : result.code === 0 ? 'succeeded' : 'failed',
      exitCode, childExitCode: result.code, signal: result.signal, interruptSignal: interrupted, spawnError,
    });
    finished = true;
    return !recorded && exitCode === 0 ? 74 : exitCode ?? 1;
  } finally {
    process.removeListener('exit', onExit);
    process.removeListener('SIGINT', onInt);
    process.removeListener('SIGTERM', onTerm);
  }
}

async function main(argv) {
  let options;
  try { options = parseArgs(argv); }
  catch (error) { process.stderr.write(`Timing arguments rejected: ${error.message}. See --help.\n`); return 64; }
  if (options.help) { process.stdout.write(HELP); return 0; }
  try { return await measure(options); }
  catch { process.stderr.write('Timing setup failed; child execution was not confirmed. Check receipt path and lock.\n'); return 74; }
}

if (require.main === module) main(process.argv.slice(2)).then(code => { process.exitCode = code; });
module.exports = { parseArgs, scopedOutput, appendEvent, measure, main };
