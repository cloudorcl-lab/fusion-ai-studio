'use strict';
// Read-only derivation: never starts a test, attaches a judge, or updates source reports.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
function required(value, name) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${name} is required`);
  return value;
}
function identity(report, expected) {
  for (const key of ['workflowCode', 'runLabel']) {
    if (report[key] !== expected[key]) throw new Error(`${key} mismatch for ${report.testName || 'report'}`);
  }
  if (String(report.workflow?.version ?? '') !== String(expected.version)) throw new Error(`workflow version mismatch for ${report.testName || 'report'}`);
  if (report.workflow?.workflowCode && report.workflow.workflowCode !== expected.workflowCode) throw new Error('nested workflowCode mismatch');
}
function contradictoryPass(report) {
  if (report.judge?.passed === false || ['pending', 'error', 'failed'].includes(report.judge?.status) || report.deterministic?.passed === false || report.deterministicFailures?.length > 0 || report.deterministic?.failures?.length > 0) return true;
  if (report.evaluationMode === 'hybrid' && report.judge?.status !== 'passed') return true;
  return Array.isArray(report.steps) && report.steps.some(step => ['failed', 'needs-judge'].includes(step.status) || contradictoryPass(step));
}
function refresh({ cwd = process.cwd(), manifest }) {
  const sources = [];
  function read(file) {
    required(file, 'source report path');
    const absolute = fs.realpathSync(path.resolve(cwd, file));
    const bytes = fs.readFileSync(absolute);
    sources.push({ path: absolute, sha256: crypto.createHash('sha256').update(bytes).digest('hex') });
    return JSON.parse(bytes);
  }
  if (manifest?.schemaVersion !== 1 || !Array.isArray(manifest.groups) || !manifest.groups.length) throw new Error('schemaVersion 1 and nonempty groups required');
  const groups = manifest.groups.map(group => {
    for (const key of ['workflowCode', 'runLabel']) required(group[key], key);
    if (!['app', 'workflow'].includes(group.kind)) throw new Error('kind must be app or workflow');
    if (!['string', 'number'].includes(typeof group.version) || !/^[1-9]\d*$/.test(String(group.version))) throw new Error('positive saved version required');
    if (!Array.isArray(group.tests) || !group.tests.length || group.tests.some(x => typeof x !== 'string' || !x.trim()) || new Set(group.tests).size !== group.tests.length) throw new Error('unique nonempty expected tests required');
    if (!Array.isArray(group.reports) || !group.reports.length) throw new Error('explicit reports required');
    if (group.kind === 'app') required(group.appCode, 'appCode');
    const reports = group.reports.flatMap(file => {
      const report = read(file);
      // A suite index supplies paths only. Its stale status never wins over individuals.
      if (!Array.isArray(report.results)) return [report];
      if (report.runLabel !== undefined && report.runLabel !== group.runLabel) throw new Error('suite runLabel mismatch');
      return report.results.map(row => {
        const source = read(row.reportPath);
        if (row.testName !== source.testName || row.workflowCode !== source.workflowCode) throw new Error('suite source identity mismatch');
        return source;
      });
    });
    const seen = new Set();
    for (const report of reports) {
      identity(report, group);
      if (group.kind === 'app' && report.appCode !== group.appCode) throw new Error('appCode mismatch');
      if (!group.tests.includes(report.testName) || seen.has(report.testName)) throw new Error('unexpected or duplicate test: ' + report.testName);
      seen.add(report.testName);
      if (!['passed', 'failed', 'needs-judge'].includes(report.status)) throw new Error('unknown report status');
      if (report.status === 'passed' && contradictoryPass(report)) throw new Error('contradictory passed report or incomplete hybrid judge');
    }
    const missing = group.tests.filter(test => !seen.has(test));
    const summary = { expected: group.tests.length, total: reports.length, passed: reports.filter(r => r.status === 'passed').length, failed: reports.filter(r => r.status === 'failed').length, needsJudge: reports.filter(r => r.status === 'needs-judge').length };
    return { kind: group.kind, workflowCode: group.workflowCode, version: group.version, runLabel: group.runLabel, ...(group.appCode ? { appCode: group.appCode } : {}), summary, missing, status: summary.failed ? 'failed' : missing.length || summary.needsJudge ? 'incomplete' : 'passed' };
  });
  return { schemaVersion: 1, generatedUtc: new Date().toISOString(), executesTests: false, sourceReportsModified: false, finalAcceptance: false, status: groups.some(g => g.status === 'failed') ? 'failed' : groups.every(g => g.status === 'passed') ? 'passed' : 'incomplete', groups, sources };
}
module.exports = { refresh, identity };
if (require.main === module) {
  try {
    if (process.argv.length !== 3) throw new Error('Usage: node scripts/refresh-test-report-provenance.cjs <manifest.json> (JSON to stdout)');
    const result = refresh({ manifest: JSON.parse(fs.readFileSync(process.argv[2], 'utf8')) });
    process.stdout.write(JSON.stringify(result, null, 2) + '\n');
    if (result.status !== 'passed') process.exitCode = 1;
  } catch (error) { process.stderr.write(error.message + '\n'); process.exitCode = 1; }
}
