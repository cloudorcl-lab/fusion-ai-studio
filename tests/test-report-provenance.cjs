'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { refresh } = require('../scripts/refresh-test-report-provenance.cjs');
const bundle = fs.readFileSync(path.join(__dirname, '../.agents/skills/aistudio/scripts/aistudio.js'), 'utf8');
function actual(name, end) { return vm.runInNewContext(bundle.slice(bundle.indexOf('function ' + name + '('), bundle.indexOf(end, bundle.indexOf('function ' + name + '('))) + '\n' + name); }
const select = actual('xdxValidateReportSelection', 'function xdxAttachmentRunLabel');
const attachLabel = actual('xdxAttachmentRunLabel', 'async function $ge');
function fixture(t) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'report-provenance-'));
  t.after(() => fs.rmSync(cwd, { recursive: true, force: true }));
  const write = (file, value) => fs.writeFileSync(path.join(cwd, file), JSON.stringify(value));
  const report = { testName: 'one', workflowCode: 'XDX_W', workflow: { workflowCode: 'XDX_W', version: 7 }, appCode: 'XDX_APP', runLabel: 'app-final', status: 'passed', evaluationMode: 'hybrid', judge: { status: 'passed' }, deterministic: { passed: true } };
  const group = { kind: 'app', appCode: 'XDX_APP', workflowCode: 'XDX_W', version: 7, runLabel: 'app-final', tests: ['one'], reports: ['result.json'] };
  write('result.json', report);
  return { cwd, write, report, group, run: () => refresh({ cwd, manifest: { schemaVersion: 1, groups: [group] } }) };
}
test('actual attachment owner infers run label and rejects mismatched explicit label before mutation', () => {
  assert.equal(attachLabel({ runLabel: 'final' }), 'final');
  assert.equal(attachLabel({}), undefined);
  assert.throws(() => attachLabel({ runLabel: 'final' }, 'other'), /does not match/);
  assert.throws(() => attachLabel({}, 'final'), /does not match/);
  assert.throws(() => attachLabel({ runLabel: '' }), /Invalid/);
  const block = bundle.slice(bundle.indexOf('const selectedReport ='), bundle.indexOf('const h = l.reportRootDir', bundle.indexOf('const selectedReport =')));
  assert.ok(block.indexOf('xdxAttachmentRunLabel') < block.indexOf('await IB('));
  assert.match(block, /runLabel: selectedRunLabel/);
});
test('actual summary owner rejects stale labels and missing/wrong saved versions', () => {
  select({ runLabel: 'final', workflow: { version: 7 } }, 'final', '7');
  assert.throws(() => select({ runLabel: 'old', workflow: { version: 7 } }, 'final', '7'), /run-label/);
  assert.throws(() => select({ runLabel: 'final', workflow: { version: 6 } }, 'final', '7'), /workflow-version/);
  assert.throws(() => select({ runLabel: 'final' }, 'final', '7'), /workflow-version/);
});
test('derive current judgment from individual source while leaving stale suite and source bytes unchanged', t => {
  const f = fixture(t);
  f.write('suite.json', { runLabel: 'app-final', summary: { needsJudge: 1 }, results: [{ testName: 'one', workflowCode: 'XDX_W', status: 'needs-judge', reportPath: 'result.json' }] });
  f.group.reports = ['suite.json'];
  const before = fs.readdirSync(f.cwd).map(file => [file, fs.readFileSync(path.join(f.cwd, file), 'utf8')]);
  const r = f.run();
  assert.equal(r.status, 'passed'); assert.equal(r.groups[0].summary.needsJudge, 0);
  assert.equal(r.executesTests, false); assert.equal(r.finalAcceptance, false);
  assert.equal(r.sources.length, 2); assert.ok(r.sources.every(s => /^[a-f0-9]{64}$/.test(s.sha256)));
  assert.deepEqual(fs.readdirSync(f.cwd).map(file => [file, fs.readFileSync(path.join(f.cwd, file), 'utf8')]), before);
});
for (const kind of ['version', 'label', 'workflow', 'app', 'duplicate', 'unexpected', 'pending-pass', 'missing-judge', 'unknown-status', 'suite-source', 'false-judge', 'deterministic-failure', 'failed-step']) test('reject ' + kind, t => {
  const f = fixture(t);
  if (kind === 'version') f.report.workflow.version = 6;
  if (kind === 'label') f.report.runLabel = 'old';
  if (kind === 'workflow') f.report.workflowCode = 'OTHER';
  if (kind === 'app') f.report.appCode = 'OTHER';
  if (kind === 'duplicate') f.group.reports.push('result.json');
  if (kind === 'unexpected') f.report.testName = 'other';
  if (kind === 'pending-pass') f.report.judge.status = 'pending';
  if (kind === 'missing-judge') delete f.report.judge;
  if (kind === 'unknown-status') f.report.status = 'unknown';
  if (kind === 'false-judge') f.report.judge.passed = false;
  if (kind === 'deterministic-failure') f.report.deterministicFailures = ['mismatch'];
  if (kind === 'failed-step') f.report.steps = [{ status: 'failed' }];
  if (kind === 'suite-source') { f.write('suite.json', { results: [{ testName: 'other', workflowCode: 'XDX_W', reportPath: 'result.json' }] }); f.group.reports = ['suite.json']; }
  f.write('result.json', f.report); assert.throws(f.run);
});
test('missing expected coverage and pending judges remain incomplete', t => {
  const f = fixture(t); f.group.tests.push('two'); assert.equal(f.run().status, 'incomplete');
  f.group.tests.pop(); f.report.status = 'needs-judge'; f.report.judge.status = 'pending'; f.write('result.json', f.report); assert.equal(f.run().status, 'incomplete');
});
test('separate app and workflow labels are explicit and independently version-checked', t => {
  const f = fixture(t); f.write('wf.json', { ...f.report, runLabel: 'workflow-final' });
  const group = { ...f.group, kind: 'workflow', runLabel: 'workflow-final', reports: ['wf.json'] }; delete group.appCode;
  const r = refresh({ cwd: f.cwd, manifest: { schemaVersion: 1, groups: [f.group, group] } });
  assert.equal(r.status, 'passed'); assert.deepEqual(r.groups.map(g => g.runLabel), ['app-final', 'workflow-final']);
});
test('actual summary selects labeled directories, rejects empty/version drift, and suppresses stale pending-judge counts', async () => {
  let reports = [{ testName: 'one', appCode: 'A', workflowCode: 'W', runLabel: 'app-final', workflow: { version: 7 }, status: 'passed' }];
  const calls = [];
  const appSuite = { scope: { type: 'app', appCode: 'A' }, runLabel: 'app-final', summary: { total: 1, passed: 0, failed: 0, needsJudge: 1 }, results: [{ testName: 'one', reportPath: 'individual.json' }] };
  const context = {
    v: path, Zi: async () => ({ app: { appCode: 'A' }, appFile: 'a.app', actions: [], backingWorkflowSyncPlans: [{ workflow: { workflowCode: 'W' } }] }),
    vw: async () => ({}), MT: () => undefined, tB: () => [], xn: (_, kind) => kind === 'application' ? 'apps' : 'workflows',
    jT: (_, __, label) => { calls.push(['app-label', label]); return 'app-suite'; },
    io: async file => file.includes('consolidated-') ? undefined : file.endsWith('individual.json') ? reports[0] : file.endsWith('wf.json') ? { results: [{ workflowCode: 'W', runLabel: 'workflow-final', workflow: { version: 7 } }] } : appSuite,
    UT: value => !!value, xge: async () => [], zT: async () => reports, HT: async (_, label) => { calls.push(['scan-label', label]); return []; }, Ef: async () => { throw new Error('generic fallback forbidden'); }, pe: () => true,
    Pge: rows => ({ total: rows.length, passed: rows.length, failed: 0, needsJudge: 0 }), Rge: async () => true, Bx: () => 'passed', hn: xs => xs, ut: x => x,
    kB: async options => { calls.push(['workflow-selection', options.runLabel, options.workflowSuiteDir]); return [{ reportPath: 'wf.json' }]; }, de: x => x && typeof x === 'object', Nge: () => true,
    xdxValidateReportSelection: select, Oge: () => {}, r_: ({ counts }) => ({ issueSummary: counts.needsJudge ? 'STALE PENDING' : undefined }), qT: x => x, fB: () => undefined, Ege: () => {},
  };
  const start = bundle.indexOf('async function $ge('), end = bundle.indexOf('async function Dge(', start);
  const summary = vm.runInNewContext(bundle.slice(start, end) + '\n$ge', context);
  const options = { cwd: process.cwd(), filePath: 'a.app', runLabel: 'app-final', workflowRunLabel: 'workflow-final', workflowVersion: '7' };
  const result = await summary(options);
  assert.ok(!result.summaryText.includes('STALE PENDING'));
  assert.deepEqual(calls.slice(0, 2), [['app-label', 'app-final'], ['scan-label', 'app-final']]);
  assert.deepEqual(calls[2], ['workflow-selection', 'workflow-final', path.join('workflows', 'suites', 'workflow-final')]);
  reports[0].workflow.version = 6; await assert.rejects(summary(options), /workflow-version/);
  reports = []; await assert.rejects(summary(options), /No individual app reports/);
});
