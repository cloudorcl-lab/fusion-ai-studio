#!/usr/bin/env node
'use strict';
// Read-only declared learning evidence. Never runs commands, repairs files or infers unreported failures.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const text = v => typeof v === 'string' && v.trim().length > 0;
const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
function utc(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,7})?Z$/.test(value)) return false;
  const time = Date.parse(value);
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 19) === value.slice(0, 19);
}
function confinedFile(root, relative, allowMissing = false) {
  if (!text(relative) || path.isAbsolute(relative) || /[:\\\x00-\x1f]/.test(relative)) throw Error('unsafe repository-relative path');
  const parts = relative.split('/');
  if (parts.some(p => !p || p === '.' || p === '..')) throw Error('unsafe path segment');
  let target = root;
  for (const part of parts) {
    target = path.join(target, part);
    let stat;
    try { stat = fs.lstatSync(target); }
    catch (error) { if (allowMissing && error.code === 'ENOENT') return null; throw error; }
    if (stat.isSymbolicLink()) throw Error('symlink/reparse path is prohibited');
  }
  const actual = fs.realpathSync(target), rel = path.relative(root, actual);
  if (rel.startsWith('..' + path.sep) || rel === '..' || path.isAbsolute(rel) || !fs.statSync(actual).isFile()) throw Error('path escapes root or is not a file');
  return actual;
}
function verify(root, ledgerPath, { phase, scope, taskId } = {}) {
  const errors = [], failures = [];
  const report = { ok: false, phase, scope: scope || null, taskId: taskId || null, failures, errors, executesCommands: false,
    limitation: 'Checks only declared failures and local hash-bound evidence; does not discover unreported errors or prove live state.' };
  try {
    if (!['Startup', 'Execute', 'PhaseExit', 'Closeout'].includes(phase)) throw Error('invalid phase');
    if (['Execute', 'PhaseExit'].includes(phase) && !text(scope)) throw Error('scope is required for Execute/PhaseExit');
    if (!text(taskId)) throw Error('taskId is required');
    if (!text(root) || fs.lstatSync(root).isSymbolicLink()) throw Error('root must be a real directory');
    root = fs.realpathSync(root);
    if (!fs.statSync(root).isDirectory()) throw Error('root must be a directory');
    const ledger = JSON.parse(fs.readFileSync(confinedFile(root, ledgerPath), 'utf8').replace(/^\uFEFF/, ''));
    if (!object(ledger) || ledger.schemaVersion !== 1 || ledger.taskId !== taskId || !Array.isArray(ledger.failures)) throw Error('invalid ledger schema or task identity');
    if (!Array.isArray(ledger.scopes) || !ledger.scopes.length || ledger.scopes.some(v => !text(v) || v !== v.trim() || v === '*') || new Set(ledger.scopes).size !== ledger.scopes.length) throw Error('scopes requires unique nonempty registered names');
    const scopes = new Set(ledger.scopes);
    if (['Execute', 'PhaseExit'].includes(phase) && !scopes.has(scope)) throw Error('requested scope is not registered in ledger');
    if (!ledger.failures.length && !text(ledger.noFailuresReason)) throw Error('empty ledger requires noFailuresReason');
    const ids = new Set(), mappedRuns = new Set();
    for (const row of ledger.failures) {
      const issues = [], sourceDrift = [];
      const label = object(row) && text(row.id) ? row.id : '<invalid entry>';
      const requireText = (v, name) => { if (!text(v)) issues.push(`${name} is required`); };
      const references = (refs, name, required, currentSources = false) => {
        if (refs === undefined && !required) return;
        if (!Array.isArray(refs) || (required && !refs.length)) { issues.push(`${name} requires evidence references`); return; }
        const paths = new Set();
        for (const ref of refs) {
          try {
            if (!object(ref) || !/^[a-f0-9]{64}$/.test(ref.sha256 || '')) throw Error('reference requires SHA256');
            const file = confinedFile(root, ref.path, currentSources);
            if (paths.has(ref.path)) throw Error('duplicate evidence path');
            paths.add(ref.path);
            if (file === null) { sourceDrift.push(`${name} ${ref.path}: missing source`); continue; }
            if (createHash('sha256').update(fs.readFileSync(file)).digest('hex') !== ref.sha256) {
              if (currentSources) sourceDrift.push(`${name} ${ref.path}: stale hash`);
              else throw Error('stale hash');
            }
          } catch (error) { issues.push(`${name} ${ref?.path || '<missing>'}: ${error.message}`); }
        }
      };
      if (!object(row)) issues.push('entry must be an object');
      else {
        requireText(row.id, 'id');
        if (ids.has(row.id)) issues.push('duplicate id');
        ids.add(row.id);
        if (!utc(row.observedUtc)) issues.push('observedUtc must be a valid UTC timestamp');
        requireText(row.symptom, 'symptom'); requireText(row.scope, 'scope');
        if (!scopes.has(row.scope)) issues.push('failure scope is not registered');
        if (Array.isArray(row.blocks) && row.blocks.some(v => v !== '*' && !scopes.has(v))) issues.push('blocked scope is not registered');
        if (row.commandRunIds !== undefined) {
          if (!Array.isArray(row.commandRunIds) || row.commandRunIds.some(v => !text(v)) || new Set(row.commandRunIds).size !== row.commandRunIds.length) issues.push('commandRunIds must be unique nonempty strings');
          else row.commandRunIds.forEach(v => mappedRuns.add(v));
        }
        if (!Array.isArray(row.blocks) || !row.blocks.length || row.blocks.some(b => !text(b)) || new Set(row.blocks).size !== row.blocks.length) issues.push('blocks requires unique nonempty scope names');
        if (!['open', 'fixed', 'closed'].includes(row.status)) issues.push('invalid status');
        if (row.evidenceGap !== undefined && !text(row.evidenceGap)) issues.push('evidenceGap must explain missing original evidence');
        const hasOccurrence = Array.isArray(row.occurrenceEvidence) && row.occurrenceEvidence.length > 0;
        if (!hasOccurrence && !text(row.evidenceGap)) issues.push('original occurrenceEvidence or explicit evidenceGap required');
        references(row.occurrenceEvidence, 'occurrenceEvidence', hasOccurrence);
        if (row.status === 'closed') {
          requireText(row.cause, 'cause'); requireText(row.correction, 'correction');
          if (!object(row.prevention)) issues.push('prevention is required');
          else {
            if (!['regression', 'gate', 'procedure'].includes(row.prevention.kind)) issues.push('invalid prevention kind');
            requireText(row.prevention.rule, 'prevention rule');
            if (row.prevention.kind === 'procedure') requireText(row.prevention.reason, 'procedure reason explaining why prevention is not automated');
            try {
              const owner = row.prevention.owner;
              if (typeof owner !== 'string' || !/^(docs\/lessons\/|(?:\.agents\/|\.codex\/)?skills\/)/.test(owner)) throw Error('prevention owner must be canonical lessons or skill within root');
              confinedFile(root, owner);
            } catch (error) { issues.push(`prevention owner: ${error.message}`); }
          }
          if (!object(row.verification)) issues.push('verification is required');
          else {
            references(row.verification.evidence, 'verification evidence', true);
            references(row.verification.sources, 'verification sources', true, true);
            requireText(row.verification.command, 'verification command'); requireText(row.verification.reviewer, 'verification reviewer');
            if (row.verification.result !== 'pass') issues.push('verification result must be pass');
          }
        } else if (row.verification !== undefined) {
          if (!object(row.verification)) issues.push('verification must be an object');
          else { references(row.verification.evidence, 'verification evidence', false); references(row.verification.sources, 'verification sources', false, true); }
        }
        const unresolved = row.status !== 'closed' || issues.length > 0;
        if (phase === 'Closeout' && unresolved) issues.push('Closeout requires this failure closed with current evidence');
        if (['Execute', 'PhaseExit'].includes(phase) && unresolved && Array.isArray(row.blocks) && (row.blocks.includes('*') || row.blocks.includes(scope))) issues.push(`unresolved failure blocks scope ${scope}`);
      }
      failures.push({ id: label, status: issues.length && row?.status === 'closed' ? 'reopened' : row?.status || 'invalid', evidenceGap: row?.evidenceGap || null, issues, sourceDrift });
      errors.push(...issues.map(message => `${label}: ${message}`));
      // Source drift is a current execution obligation, not corruption of historical proof.
      const applicable = Array.isArray(row?.blocks) && (row.blocks.includes('*') || row.blocks.includes(scope));
      if (phase === 'Closeout' || (['Execute', 'PhaseExit'].includes(phase) && applicable)) errors.push(...sourceDrift.map(message => `${label}: ${message}`));
    }
    const expectedRuns = new Set();
    if (ledger.expectedFailureRuns !== undefined && !Array.isArray(ledger.expectedFailureRuns)) throw Error('expectedFailureRuns must be an array');
    for (const expected of ledger.expectedFailureRuns || []) {
      if (!object(expected) || !text(expected.runId) || !text(expected.reason) || expectedRuns.has(expected.runId) || mappedRuns.has(expected.runId)) throw Error('invalid/duplicate/ambiguous expected failure run');
      expectedRuns.add(expected.runId);
      if (!Array.isArray(expected.evidence) || !expected.evidence.length) throw Error('expected failure requires hash-bound evidence');
      for (const ref of expected.evidence) {
        if (!object(ref) || !/^[a-f0-9]{64}$/.test(ref.sha256 || '')) throw Error('expected failure evidence requires SHA256');
        if (createHash('sha256').update(fs.readFileSync(confinedFile(root, ref.path))).digest('hex') !== ref.sha256) throw Error('expected failure evidence stale hash');
      }
    }
    if (ledger.commandReceipts !== undefined && (!Array.isArray(ledger.commandReceipts) || ledger.commandReceipts.some(v => !text(v)) || new Set(ledger.commandReceipts).size !== ledger.commandReceipts.length)) throw Error('commandReceipts must be unique repository-relative paths');
    for (const receipt of ledger.commandReceipts || []) {
      const lines = fs.readFileSync(confinedFile(root, receipt), 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(v => v.trim());
      const events = lines.map(line => JSON.parse(line));
      const pendingRuns = new Map();
      for (const event of events) {
        if (event?.event === 'end' && (event.continuation || event.status === 'continuation')) {
          if (pendingRuns.has(event.runId)) throw Error('duplicate continuation end');
          require('./workflow-test-continuation.cjs').verifyPending(root,event);
          pendingRuns.set(event.runId,event);
        }
      }
      for (const [runId, end] of pendingRuns) {
        const resolutions = events.filter(e=>e.event==='outcome'&&e.runId===runId);
        let resolved = false;
        for (const event of resolutions) {
          const outcome = require('./workflow-test-continuation.cjs').verifyResolution(root,end,event);
          if (outcome === 'passed') resolved = true;
        }
        if (['PhaseExit','Closeout'].includes(phase) && !resolved) errors.push('pending local judge continuation: ' + runId);
      }
      for (const event of events) {
        if (!object(event) || !text(event.runId) || !text(event.event)) throw Error('malformed command receipt event');
        if (!['end', 'outcome'].includes(event.event)) continue;
        if (event.event === 'outcome' && !['passed', 'failed', 'needs-judge', 'unknown'].includes(event.semanticOutcome)) throw Error('malformed semantic outcome');
        for (const key of ['exitCode', 'childExitCode']) if (event[key] != null && !Number.isInteger(event[key])) throw Error('malformed command receipt exit code');
        const continuation = event.event === 'end' && pendingRuns.get(event.runId) === event;
        const failed = !continuation && ((event.exitCode != null && event.exitCode !== 0) || (event.childExitCode != null && event.childExitCode !== 0) || ['failed','spawn-failed','interrupted','signaled'].includes(event.status) || event.processStatus === 'failed' || event.semanticOutcome === 'failed');
        if (failed && !mappedRuns.has(event.runId) && !expectedRuns.has(event.runId)) errors.push('unlogged failed command run: ' + event.runId + ' in ' + receipt);
      }
    }
  } catch (error) { errors.push(error.message); }
  report.ok = errors.length === 0;
  return report;
}
function main(args) {
  if (args.length === 1 && args[0] === '--help') { console.log('Usage: node scripts/verify-build-learning.cjs <root> <ledger.json> <Startup|Execute|PhaseExit|Closeout> <scope|-> <taskId>\nRead-only. Execute/PhaseExit require scope. No commands are executed.'); return 0; }
  if (args.length !== 5) { console.log(JSON.stringify({ ok: false, errors: ['Expected root ledger phase scope taskId'], executesCommands: false })); return 1; }
  const [root, ledger, phase, scope, taskId] = args;
  const result = verify(root, ledger, { phase, scope: scope === '-' ? undefined : scope, taskId });
  console.log(JSON.stringify(result, null, 2)); return result.ok ? 0 : 1;
}
if (require.main === module) process.exitCode = main(process.argv.slice(2));
module.exports = { verify };
