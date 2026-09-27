'use strict';
const a = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { buildReport } = require('../scripts/build-timing-report.cjs');
const cli = path.resolve(__dirname, '../scripts/measure-build-command.cjs');
const stamp = seconds => new Date(Date.UTC(2026, 0, 1) + seconds * 1000).toISOString();
const window = { from: stamp(0), to: stamp(60), staleMs: 10000 };
const pair = (id, start, end, extra = {}) => [
  { event: 'start', runId: id, startedUtc: stamp(start), taskId: 'task', activityId: id },
  { event: 'end', runId: id, taskId: 'task', activityId: id, startedUtc: stamp(start), endedUtc: stamp(end), exitCode: 0, status: 'succeeded', ...extra },
];
let checks = 0;
function check(name, fn) { fn(); checks++; console.log(`PASS ${name}`); }
const scratch = fs.mkdtempSync(path.join(__dirname, '.timing-report-test-'));
const run = args => spawnSync(process.execPath, [cli, ...args], { cwd: scratch, encoding: 'utf8', timeout: 10000 });
try {
  check('fine activity unions separate simultaneous waits and work without additive labor', () => {
    const typed = (id, start, end, kind) => pair(id, start, end).map(r => ({ ...r, activityKind: kind }));
    const r = buildReport([...typed('exec', 0, 30, 'execution'), ...typed('review', 10, 40, 'review'),
      ...typed('wait', 20, 50, 'human-wait'), ...typed('capture', 30, 35, 'evidence-capture'),
      ...typed('nested', 12, 15, 'review')], window);
    a.equal(r.coveredMs, 50000); a.equal(r.unallocatedMs, 10000);
    a.equal(r.activityCoverageMs, 40000); a.equal(r.humanWaitMs, 30000);
    a.equal(r.activityDuringHumanWaitMs, 20000); a.equal(r.humanWaitWithoutActivityMs, 10000);
    a.equal(r.activityOutsideHumanWaitMs, 20000); a.equal(r.byActivityKind.review.coveredMs, 30000);
    a.equal(r.byActivityKind.review.overlapMs, 3000);
  });
  check('open recovery does not fabricate time; conflicting kinds remain unknown', () => {
    const p = pair('conflict', 1, 4); p[0].activityKind = 'review'; p[1].activityKind = 'execution';
    const r = buildReport([...p, { event: 'start', runId: 'recovery', startedUtc: stamp(10), activityKind: 'context-recovery' }], window);
    a.equal(r.byActivityKind['context-recovery'].coveredMs, 0);
    a.equal(r.byActivityKind['context-recovery'].openIntervalCount, 1);
    a.equal(r.byActivityKind.unknown.coveredMs, 3000); a.equal(r.activityCoverageMs, 0);
    a(r.runs[0].issues.includes('invalid-or-conflicting-activity-kind'));
  });
  check('CLI records all fine activity kinds and preserves legacy wait aliases', () => {
    for (const kind of ['execution', 'review', 'evidence-capture', 'coordination', 'context-recovery', 'human-wait']) {
      for (const state of ['start', 'end']) a.equal(run(['interval', '--output', 'fine.jsonl', '--id', kind, '--task', 'task', '--activity', kind, '--kind', kind, '--state', state]).status, 0);
    }
    const out = run(['report', '--input', 'fine.jsonl', '--from', '2020-01-01T00:00:00Z', '--to', '2100-01-01T00:00:00Z']);
    a.equal(out.status, 0, out.stderr); const r = JSON.parse(out.stdout);
    a.equal(r.runCount, 6); a.equal(r.openIntervals.length, 0);
    a.deepEqual(r.runs.map(row => row.activityKind), ['execution', 'review', 'evidence-capture', 'coordination', 'context-recovery', 'human-wait']);
  });
  check('overlap union, clipping and gaps do not double count nested/concurrent work', () => {
    const r = buildReport([...pair('parent', 5, 30), ...pair('child', 10, 20), ...pair('overlap', 25, 40), ...pair('tail', 55, 65)], window);
    a.equal(r.coveredMs, 40000); a.equal(r.summedIntervalMs, 55000); a.equal(r.overlapMs, 15000); a.equal(r.unallocatedMs, 20000);
    a.deepEqual(r.gaps.map(g => g.durationMs), [5000, 15000]);
    a(r.gaps.every(g => g.attribution === 'unallocated'));
  });
  check('legacy correlation uses task/activity/start, not adjacent events or activity alone', () => {
    const first = pair('same', 1, 3).map(({ runId, ...r }) => r), second = pair('same', 4, 8).map(({ runId, ...r }) => r);
    const r = buildReport([first[0], second[0], second[1], first[1]], window);
    a.equal(r.runCount, 2); a.deepEqual(r.runs.map(x => x.elapsedMs).sort(), [2000, 4000]);
    a(r.runs.every(x => x.elapsedSource === 'timestamps'));
  });
  check('nanosecond-form UTC historical timestamps normalize without invented duration', () => {
    const r = buildReport([{ event: 'start', taskId: 't', activityId: 'a', startedUtc: '2026-01-01T00:00:01.1234567Z' }, { event: 'end', taskId: 't', activityId: 'a', startedUtc: '2026-01-01T00:00:01.1234567Z', endedUtc: '2026-01-01T00:00:02.4567891Z', exitCode: 1, status: 'needs-judge' }], window).runs[0];
    a.equal(r.elapsedMs, 1333); a.equal(r.rawExitCode, 1); a.equal(r.processStatus, 'exited'); a.equal(r.semanticOutcome, 'needs-judge');
  });
  check('zero/nonzero historical process outcomes never imply semantic pass/fail', () => {
    const r = buildReport([...pair('ok', 1, 2), ...pair('nonzero', 2, 3, { exitCode: 1, status: 'failed' })], window);
    a.deepEqual(r.runs.map(x => x.semanticOutcome), ['unknown', 'unknown']);
    a.deepEqual(r.runs.map(x => x.rawExitCode), [0, 1]);
  });
  check('explicit semantic evidence is separate from exit and conflicting annotations are visible', () => {
    const p = pair('judged', 1, 2, { exitCode: 1, status: 'failed' });
    const r = buildReport([...p, { event: 'outcome', runId: 'judged', semanticOutcome: 'needs-judge' }], window);
    a.equal(r.runs[0].semanticOutcome, 'needs-judge'); a.equal(r.runs[0].rawExitCode, 1);
    const conflict = buildReport([...p, { event: 'outcome', runId: 'judged', semanticOutcome: 'passed' }, { event: 'outcome', runId: 'judged', semanticOutcome: 'failed' }], window);
    a.equal(conflict.runs[0].semanticOutcome, 'unknown'); a(conflict.runs[0].issues.includes('conflicting-semantic-outcomes'));
  });
  check('open, unfinished and orphan events cannot silently close or fill unallocated gaps', () => {
    const r = buildReport([{ event: 'start', runId: 'open', startedUtc: stamp(1) }, { event: 'unfinished', runId: 'open', startedUtc: stamp(1), observedUtc: stamp(2) }, { event: 'end', exitCode: 0 }], window);
    a.equal(r.coveredMs, 0); a.equal(r.unallocatedMs, 60000); a(r.runs.find(x => x.id === 'run:open').stale);
    a(r.runs.some(x => x.issues.includes('missing-start')));
    a(r.runs.find(x => x.id === 'run:open').issues.includes('missing-end'));
    a(r.runs.find(x => x.id === 'run:open').issues.includes('stale-open-interval'));
    const orphan = buildReport([pair('orphan', 1, 5)[1]], window);
    a.equal(orphan.coveredMs, 0); a(orphan.runs[0].issues.includes('missing-start'));
  });
  check('reviewed needs-judge to passed lifecycle resolves latest timestamp, retaining history and same-time ambiguity', () => {
    const p = pair('life', 1, 3, { exitCode: 1 });
    const pending = { event: 'outcome', runId: 'life', semanticOutcome: 'needs-judge', observedUtc: stamp(4) };
    const passed = { event: 'outcome', runId: 'life', semanticOutcome: 'passed', observedUtc: stamp(5) };
    const r = buildReport([...p, passed, pending], window).runs[0];
    a.equal(r.semanticOutcome, 'passed'); a.equal(r.rawExitCode, 1); a.equal(r.semanticHistory.length, 2); a.equal(r.issues.length, 0);
    const conflict = buildReport([...p, passed, { ...pending, observedUtc: stamp(5) }], window).runs[0];
    a.equal(conflict.semanticOutcome, 'unknown'); a(conflict.issues.includes('conflicting-semantic-outcomes'));
    const legacy = buildReport([...pair('life', 1, 3, { status: 'needs-judge', exitCode: 1 }), passed], window).runs[0];
    a.equal(legacy.semanticOutcome, 'passed'); a.equal(legacy.semanticHistory[0].semanticOutcome, 'needs-judge');
  });
  check('duplicate archive receipts deduplicate, conflicting starts/ends fail visibly', () => {
    const p = pair('x', 1, 3); const r = buildReport([...p, ...p], window);
    a.equal(r.runCount, 1); a.equal(r.duplicateEvents, 2); a.equal(r.coveredMs, 2000);
    const conflicting = buildReport([...p, { ...p[1], endedUtc: stamp(4) }], window);
    a.equal(conflicting.coveredMs, 0); a(conflicting.runs[0].issues.includes('multiple-ends'));
  });
  check('backwards and conflicting wall clocks are flagged and never silently repaired by elapsedMs', () => {
    const r = buildReport(pair('bad', 5, 2, { elapsedMs: 3000 }), window);
    a.equal(r.coveredMs, 0); a.equal(r.runs[0].durationMs, null); a(r.runs[0].issues.includes('end-before-start'));
    const drift = buildReport(pair('drift', 1, 10, { elapsedMs: 1000 }), window);
    a(drift.runs[0].issues.includes('wall-monotonic-disagreement'));
    a.equal(drift.runs[0].measuredElapsedMs, 1000); a.equal(drift.runs[0].durationMs, 9000);
  });
  check('upper-bound historical manual reconciliation is labeled and raw unknown metadata never echoes', () => {
    const rows = pair('safe', 1, 3, { note: 'Upper-bound elapsed SECRET_TOKEN', command: 'SECRET_COMMAND', env: { secret: 'SECRET_ENV' }, stdout: 'SECRET_OUTPUT', label: 'SECRET_LABEL' });
    const r = buildReport(rows, window); a.equal(r.runs[0].boundaryPrecision, 'observed-upper-bound'); a(!JSON.stringify(r).includes('SECRET'));
  });
  check('invalid window and invalid duration are rejected/flagged', () => {
    a.throws(() => buildReport([], { from: 'bad', to: stamp(3) })); a.throws(() => buildReport([], { from: stamp(4), to: stamp(3) }));
    a(buildReport(pair('invalid', 1, 3, { elapsedMs: -2 }), window).runs[0].issues.includes('invalid-measured-duration'));
  });
  check('CLI explicit observed human/approval/wait boundaries and report are usable', () => {
    for (const kind of ['human', 'approval', 'wait']) for (const state of ['start', 'end']) {
      const r = run(['interval', '--output', 'manual.jsonl', '--id', kind, '--task', 'task', '--activity', kind, '--kind', kind, '--state', state]); a.equal(r.status, 0, r.stderr);
    }
    const report = run(['report', '--input', 'manual.jsonl', '--from', '2020-01-01T00:00:00Z', '--to', '2100-01-01T00:00:00Z']); a.equal(report.status, 0, report.stderr);
    const r = JSON.parse(report.stdout); a.equal(r.runCount, 3); a.equal(r.openIntervals.length, 0); a(r.runs.every(x => x.recordType === 'manual' && x.semanticOutcome === 'unknown'));
  });
  check('CLI outcome annotation retains process code; malformed JSON reports line without leaking content', () => {
    fs.writeFileSync(path.join(scratch, 'command.jsonl'), pair('cli', 1, 3, { exitCode: 1 }).map(JSON.stringify).join('\n') + '\n');
    fs.writeFileSync(path.join(scratch, 'review.json'), '{"review":"needs-judge"}');
    a.equal(run(['outcome', '--output', 'command.jsonl', '--id', 'cli', '--outcome', 'needs-judge', '--evidence', 'review.json']).status, 0);
    fs.appendFileSync(path.join(scratch, 'command.jsonl'), 'SECRET_MALFORMED\n');
    const out = run(['report', '--input', 'command.jsonl', '--from', window.from, '--to', window.to]); a.equal(out.status, 2);
    const r = JSON.parse(out.stdout); a.equal(r.runs[0].rawExitCode, 1); a.equal(r.runs[0].semanticOutcome, 'needs-judge'); a.equal(r.issues[0].line, 4); a(!out.stdout.includes('SECRET'));
    a.equal(r.runs[0].semanticHistory[0].evidence, 'review.json');
    a.equal(r.runs[0].semanticHistory[0].evidenceSha256, require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(scratch, 'review.json'))).digest('hex'));
    a.notEqual(run(['outcome', '--output', 'command.jsonl', '--id', 'cli', '--outcome', 'passed', '--evidence', 'missing.json']).status, 0);
    a.notEqual(run(['outcome', '--output', 'command.jsonl', '--id', 'cli', '--outcome', 'passed', '--evidence', '../outside.json']).status, 0);
  });
  check('new modes preserve contained-file restrictions and reject unsafe metadata/unknown arguments', () => {
    a.notEqual(run(['report', '--input', '../outside.jsonl', '--from', window.from, '--to', window.to]).status, 0);
    const r = run(['outcome', '--output', 'command.jsonl', '--id', 'SECRET\nID', '--outcome', 'passed', '--evidence', 'review.json']); a.notEqual(r.status, 0); a(!r.stderr.includes('SECRET'));
    a.notEqual(run(['report', '--input', 'command.jsonl', '--from', window.from, '--to', window.to, '--extra', 'bad']).status, 0);
    fs.writeFileSync(path.join(scratch, 'open.jsonl'), JSON.stringify(pair('open', 1, 3)[0]) + '\n');
    const open = run(['report', '--input', 'open.jsonl', '--from', window.from, '--to', window.to, '--stale-ms', '10000']);
    a.equal(open.status, 2); a(JSON.parse(open.stdout).runs[0].stale);
  });
  console.log(`Timing report: ${checks} checks PASS`);
} finally {
  const target = fs.realpathSync(scratch);
  a.equal(path.dirname(target).toLowerCase(), fs.realpathSync(__dirname).toLowerCase()); a(path.basename(target).startsWith('.timing-report-test-'));
  fs.rmSync(target, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
