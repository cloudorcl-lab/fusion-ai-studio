'use strict';

// Companion implementation; measure-build-command.cjs remains the public CLI.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const outcomes = new Set(['passed', 'failed', 'needs-judge', 'unknown']);
const activityKinds = ['execution', 'review', 'evidence-capture', 'coordination', 'context-recovery', 'human-wait'];
const waitKinds = ['human', 'approval', 'wait', 'human-wait'];
const idPattern = /^[A-Za-z0-9_.:-]{1,256}$/;
const safeId = value => typeof value === 'string' && idPattern.test(value) ? value : null;
const safeEvidence = value => typeof value === 'string' && /^[A-Za-z0-9_./-]{1,256}$/.test(value) && !value.startsWith('/') && !value.split('/').includes('..') ? value : null;
const digest = value => createHash('sha256').update(String(value)).digest('hex');
function utc(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?Z$/.test(value)) return null;
  const result = Date.parse(value);
  return Number.isFinite(result) ? result : null;
}
const iso = value => value === null ? null : new Date(value).toISOString();

function union(intervals) {
  const merged = [];
  for (const [start, end] of intervals.slice().sort((a, b) => a[0] - b[0])) {
    if (!merged.length || start > merged.at(-1)[1]) merged.push([start, end]);
    else merged.at(-1)[1] = Math.max(end, merged.at(-1)[1]);
  }
  return merged;
}

function buildReport(records, { from, to, staleMs = 300000 }) {
  const begin = utc(from), cutoff = utc(to);
  if (begin === null || cutoff === null || cutoff < begin || !Number.isFinite(staleMs) || staleMs < 0) throw new Error('Invalid report window');
  const groups = new Map(), issues = [], seen = new Set();
  let duplicateEvents = 0;
  for (const [index, row] of records.entries()) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) { issues.push({ index, issue: 'invalid-event' }); continue; }
    // Exact duplicate archived events count once; never echo unknown/raw fields.
    const fingerprint = digest(JSON.stringify(row));
    if (seen.has(fingerprint)) { duplicateEvents++; continue; }
    seen.add(fingerprint);
    const run = safeId(row.runId);
    const legacy = typeof row.taskId === 'string' && typeof row.activityId === 'string' && utc(row.startedUtc) !== null;
    const key = run ? `run:${run}` : legacy ? `legacy:${digest(JSON.stringify([row.taskId, row.activityId, utc(row.startedUtc)]))}` : `unmatched:${index}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const runs = [];
  for (const [key, rows] of groups) {
    const starts = rows.filter(r => r.event === 'start'), ends = rows.filter(r => r.event === 'end');
    const annotations = rows.filter(r => r.event === 'outcome');
    const localIssues = [];
    const unknown = rows.filter(r => !['start', 'end', 'outcome', 'interrupt', 'unfinished'].includes(r.event));
    if (unknown.length) localIssues.push('unknown-event-kind');
    if (starts.length !== 1) localIssues.push(starts.length ? 'multiple-starts' : 'missing-start');
    if (!ends.length) localIssues.push('missing-end');
    if (ends.length > 1) localIssues.push('multiple-ends');
    const startValues = [...new Set(rows.filter(r => r.event !== 'outcome').map(r => utc(r.startedUtc)).filter(v => v !== null))];
    if (startValues.length > 1) localIssues.push('conflicting-start-timestamps');
    const start = startValues.length === 1 ? startValues[0] : null;
    const endRow = ends.length === 1 ? ends[0] : null;
    const end = endRow ? utc(endRow.endedUtc) ?? utc(endRow.observedUtc) : null;
    if (start === null) localIssues.push('missing-valid-start-time');
    if (endRow && end === null) localIssues.push('missing-valid-end-time');
    if (end !== null && start !== null && end < start) localIssues.push('end-before-start');
    const valid = start !== null && end !== null && end >= start && starts.length === 1 && ends.length === 1;
    const durationMs = valid ? end - start : null;
    const measured = endRow?.elapsedMs;
    const measuredMs = typeof measured === 'number' && Number.isFinite(measured) && measured >= 0 ? measured : null;
    if (measured !== undefined && measuredMs === null) localIssues.push('invalid-measured-duration');
    // Monotonic elapsed and wall timestamps may differ; never use elapsed to
    // fabricate wall endpoints or silently replace an inconsistent clock.
    if (durationMs !== null && measuredMs !== null && Math.abs(durationMs - measuredMs) > 1000) localIssues.push('wall-monotonic-disagreement');
    const semanticHistory = annotations.map(r => ({ observedUtc: iso(utc(r.observedUtc)), semanticOutcome: outcomes.has(r.semanticOutcome) ? r.semanticOutcome : 'unknown',
      evidence: safeEvidence(r.evidence), evidenceSha256: /^[a-f0-9]{64}$/.test(r.evidenceSha256 || '') ? r.evidenceSha256 : null }));
    const endSemantic = outcomes.has(endRow?.semanticOutcome) && endRow.semanticOutcome !== 'unknown' ? endRow.semanticOutcome : endRow?.status === 'needs-judge' ? 'needs-judge' : null;
    if (endSemantic) semanticHistory.unshift({ observedUtc: iso(end), semanticOutcome: endSemantic, evidence: null, evidenceSha256: null });
    if (annotations.some(r => !outcomes.has(r.semanticOutcome))) localIssues.push('invalid-semantic-outcome');
    const semantic = semanticHistory.map(r => r.semanticOutcome);
    if (!semantic.length && outcomes.has(endRow?.semanticOutcome)) semantic.push(endRow.semanticOutcome);
    if (!semantic.length && endRow?.status === 'needs-judge') semantic.push('needs-judge');
    const uniqueSemantic = [...new Set(semantic)];
    let semanticOutcome = uniqueSemantic.length === 1 ? uniqueSemantic[0] : 'unknown';
    if (uniqueSemantic.length > 1) {
      const ordered = semanticHistory.every(r => r.observedUtc !== null);
      const latest = ordered ? Math.max(...semanticHistory.map(r => utc(r.observedUtc))) : null;
      const lastOutcomes = new Set(semanticHistory.filter(r => utc(r.observedUtc) === latest).map(r => r.semanticOutcome));
      if (ordered && lastOutcomes.size === 1) semanticOutcome = [...lastOutcomes][0];
      else localIssues.push('conflicting-semantic-outcomes');
    }
    const rawExitCode = Number.isInteger(endRow?.exitCode) ? endRow.exitCode : null;
    const childExitCode = Number.isInteger(endRow?.childExitCode) ? endRow.childExitCode : null;
    const processStatus = ['spawn-failed', 'interrupted', 'signaled'].includes(endRow?.status) ? endRow.status : endRow?.processStatus === 'exited' || rawExitCode !== null ? 'exited' : endRow ? 'unknown' : 'unobserved';
    const recordType = rows.some(r => r.recordType === 'manual') ? 'manual' : 'command';
    const open = !endRow;
    const last = Math.max(...rows.map(r => utc(r.observedUtc) ?? utc(r.startedUtc)).filter(v => v !== null), -Infinity);
    const stale = open && Number.isFinite(last) && cutoff - last > staleMs;
    if (stale) localIssues.push('stale-open-interval');
    const uncertainBoundary = rows.some(r => typeof r.note === 'string' && /upper.bound/i.test(r.note));
    const meta = starts[0] || endRow || {};
    const declaredKinds = [...new Set(rows.filter(r => r.event !== 'outcome' && r.activityKind !== undefined).map(r => r.activityKind))];
    let activityKind = declaredKinds.length === 1 && activityKinds.includes(declaredKinds[0]) ? declaredKinds[0] : null;
    if (declaredKinds.length && !activityKind) localIssues.push('invalid-or-conflicting-activity-kind');
    if (!declaredKinds.length) activityKind = waitKinds.includes(meta.boundaryKind) || meta.category === 'wait' ? 'human-wait' : meta.category === 'coordination' ? 'coordination' : recordType === 'command' ? 'execution' : 'unknown';
    runs.push({ id: key, taskId: safeId(meta.taskId), activityId: safeId(meta.activityId), recordType,
      boundaryKind: waitKinds.includes(meta.boundaryKind) ? meta.boundaryKind : null,
      activityKind: activityKind || 'unknown',
      category: ['build', 'test', 'repair', 'coordination', 'wait', 'closeout'].includes(meta.category) ? meta.category : null,
      startedUtc: iso(start), endedUtc: iso(end), durationMs, measuredElapsedMs: measuredMs,
      elapsedMs: measuredMs ?? durationMs, elapsedSource: measuredMs !== null ? 'monotonic-record' : durationMs !== null ? 'timestamps' : 'unavailable',
      processStatus, rawExitCode, childExitCode, semanticOutcome, semanticHistory, open, stale,
      boundaryPrecision: uncertainBoundary ? 'observed-upper-bound' : 'observed',
      issues: localIssues, _interval: valid ? [start, end] : null });
  }
  const clip = interval => interval && interval[1] > begin && interval[0] < cutoff ? [Math.max(begin, interval[0]), Math.min(cutoff, interval[1])] : null;
  const intervals = runs.map(r => clip(r._interval)).filter(Boolean), merged = union(intervals);
  const sum = xs => xs.reduce((n, [s, e]) => n + e - s, 0);
  let cursor = begin;
  const gaps = [];
  for (const [start, end] of merged) { if (start > cursor) gaps.push([cursor, start]); cursor = end; }
  if (cursor < cutoff) gaps.push([cursor, cutoff]);
  const coveredMs = sum(merged);
  const byActivityKind = Object.fromEntries([...activityKinds, 'unknown'].map(kind => {
    const matching = runs.filter(r => r.activityKind === kind);
    const bounded = matching.map(r => clip(r._interval)).filter(Boolean);
    const coverage = sum(union(bounded));
    return [kind, { coveredMs: coverage, summedIntervalMs: sum(bounded), overlapMs: sum(bounded) - coverage,
      openIntervalCount: matching.filter(r => r.open).length }];
  }));
  const waits = union(runs.filter(r => r.activityKind === 'human-wait').map(r => clip(r._interval)).filter(Boolean));
  const active = union(runs.filter(r => activityKinds.includes(r.activityKind) && r.activityKind !== 'human-wait').map(r => clip(r._interval)).filter(Boolean));
  // Intersection of merged sets: wait time can coincide with independent work.
  let waitWithActivityMs = 0, ai = 0, wi = 0;
  while (ai < active.length && wi < waits.length) {
    waitWithActivityMs += Math.max(0, Math.min(active[ai][1], waits[wi][1]) - Math.max(active[ai][0], waits[wi][0]));
    if (active[ai][1] <= waits[wi][1]) ai++; else wi++;
  }
  return { schemaVersion: 1, window: { from: iso(begin), to: iso(cutoff), durationMs: cutoff - begin },
    runCount: runs.length, duplicateEvents, closedIntervalCount: intervals.length,
    coveredMs, summedIntervalMs: sum(intervals), overlapMs: sum(intervals) - coveredMs,
    unallocatedMs: cutoff - begin - coveredMs,
    byActivityKind,
    activityCoverageMs: sum(active), humanWaitMs: sum(waits),
    activityDuringHumanWaitMs: waitWithActivityMs,
    humanWaitWithoutActivityMs: sum(waits) - waitWithActivityMs,
    activityOutsideHumanWaitMs: sum(active) - waitWithActivityMs,
    gaps: gaps.map(([s, e]) => ({ from: iso(s), to: iso(e), durationMs: e - s, attribution: 'unallocated' })),
    coverage: merged.map(([s, e]) => ({ from: iso(s), to: iso(e) })),
    openIntervals: runs.filter(r => r.open).map(r => r.id), issues,
    limitations: ['Coverage is wall-clock union of bounded receipts, not exclusive causal attribution.',
      'Activity groups overlap and are not additive. Activity coverage is observed intervals, not measured labor.',
      'Open/invalid intervals do not fill gaps. Gaps are not automatically human, approval, idle or model time.',
      'Process exits are not semantic outcomes. Historical process succeeded/failed statuses do not prove acceptance.',
      'Upper-bound observations and wall/monotonic discrepancies remain explicit.'],
    runs: runs.map(({ _interval, ...run }) => run) };
}

function options(argv, allowed, repeated = []) {
  const result = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i]?.replace(/^--/, ''), value = argv[i + 1];
    if (!argv[i]?.startsWith('--') || !allowed.includes(key) || !value || /[\x00-\x1f\x7f]/.test(value)) throw new Error('Invalid mode option');
    if (repeated.includes(key)) (result[key] ||= []).push(value);
    else { if (Object.hasOwn(result, key)) throw new Error('Duplicate mode option'); result[key] = value; }
  }
  return result;
}

function main(argv, { scopedOutput, appendEvent }) {
  try {
    const mode = argv[0];
    if (mode === 'report') {
      const o = options(argv.slice(1), ['input', 'from', 'to', 'stale-ms'], ['input']);
      if (!o.input?.length) throw new Error('Missing input');
      const rows = [], parseIssues = [];
      o.input.forEach((file, source) => fs.readFileSync(scopedOutput(file), 'utf8').split(/\r?\n/).forEach((line, index) => {
        if (!line.trim()) return;
        try { rows.push(JSON.parse(line)); } catch { parseIssues.push({ source, line: index + 1, issue: 'invalid-json' }); }
      }));
      const report = buildReport(rows, { from: o.from, to: o.to, staleMs: o['stale-ms'] === undefined ? undefined : Number(o['stale-ms']) });
      report.issues.push(...parseIssues);
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
      return report.issues.length || report.runs.some(r => r.issues.length) ? 2 : 0;
    }
    const o = options(argv.slice(1), mode === 'interval' ? ['output', 'id', 'task', 'activity', 'kind', 'state'] : ['output', 'id', 'outcome', 'evidence']);
    if (!safeId(o.id)) throw new Error('Invalid ID');
    const output = scopedOutput(o.output), now = new Date().toISOString();
    if (mode === 'outcome') {
      if (!outcomes.has(o.outcome) || !safeEvidence(o.evidence)) throw new Error('Invalid evidence or outcome');
      const root = fs.realpathSync(process.cwd()), evidencePath = fs.realpathSync(path.resolve(root, o.evidence));
      const relative = path.relative(root, evidencePath);
      if (!relative || relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || !fs.statSync(evidencePath).isFile()) throw new Error('Evidence escapes cwd or is not a file');
      const evidenceSha256 = createHash('sha256').update(fs.readFileSync(evidencePath)).digest('hex');
      appendEvent(output, { schemaVersion: 2, event: 'outcome', runId: o.id, observedUtc: now, semanticOutcome: o.outcome, evidence: o.evidence, evidenceSha256 });
    } else {
      if (!safeId(o.task) || !safeId(o.activity) || ![...waitKinds, ...activityKinds].includes(o.kind) || !['start', 'end'].includes(o.state)) throw new Error('Invalid boundary');
      appendEvent(output, { schemaVersion: 2, recordType: 'manual', event: o.state, runId: o.id,
        taskId: o.task, activityId: o.activity, boundaryKind: o.kind, observedUtc: now,
        activityKind: waitKinds.includes(o.kind) ? 'human-wait' : o.kind,
        ...(o.state === 'start' ? { startedUtc: now } : { endedUtc: now }) });
    }
    return 0;
  } catch { process.stderr.write('Timing mode rejected: check options, contained paths and receipt format; no raw input echoed.\n'); return 64; }
}

module.exports = { buildReport, union, main, activityKinds };
