#!/usr/bin/env node
'use strict';
// Inspect accumulated results after each critical case. Never execute/replay tests.
const fs = require('node:fs');
const { readEvidence } = require('./build-evidence-status.cjs');
function screen(contract, reports) {
  if (contract?.schemaVersion !== 1 || !contract.workflowCode || contract.version === undefined || !contract.runLabel || !Array.isArray(contract.screeningTests) || !contract.screeningTests.length || !Array.isArray(contract.finalTests) || !contract.finalTests.length) throw Error('Missing screening contract');
  for (const list of [contract.screeningTests, contract.finalTests]) if (list.some(t => typeof t !== 'string' || !t) || new Set(list).size !== list.length) throw Error('Invalid test inventory');
  if (contract.screeningTests.some(t => !contract.finalTests.includes(t))) throw Error('Screening must be a subset of final coverage');
  const seen = new Set(), failures = [], pending = [], passed = [];
  for (const r of reports) {
    if (!r || !contract.screeningTests.includes(r.testName) || seen.has(r.testName)) throw Error('Unexpected or duplicate screening result');
    seen.add(r.testName);
    if (r.workflow?.workflowCode !== contract.workflowCode || String(r.workflow?.version) !== String(contract.version) || r.runLabel !== contract.runLabel) throw Error('Report provenance mismatch');
    if (!['passed','failed','needs-judge','error'].includes(r.status)) throw Error('Unknown report status');
    if (!Array.isArray(r.deterministicFailures)) throw Error('Missing deterministic contract evidence');
    const steps = Array.isArray(r.steps) ? r.steps : [r];
    if (!steps.length) throw Error('Empty conversation report');
    const contractFailure = steps.some(s => (Array.isArray(s.deterministicFailures) && s.deterministicFailures.length > 0) || s.judge?.passed === false || s.judge?.status === 'failed') || r.deterministicFailures.length > 0 || r.judge?.passed === false || r.judge?.status === 'failed';
    if (contractFailure) failures.push(r.testName);
    else if (r.status !== 'passed' || r.evaluationMode !== 'deterministic' && (r.judge?.status !== 'passed' || r.judge?.passed !== true) || steps.some(s => s.status !== 'passed' || !Array.isArray(s.deterministicFailures) || s.evaluationMode !== 'deterministic' && (s.judge?.status !== 'passed' || s.judge?.passed !== true))) pending.push(r.testName);
    else passed.push(r.testName);
  }
  const missing = contract.screeningTests.filter(t => !seen.has(t));
  const decision = failures.length ? 'reject' : pending.length || missing.length ? 'incomplete' : 'eligible-for-full-regression';
  return { schemaVersion: 1, decision, workflowCode: contract.workflowCode, version: contract.version, runLabel: contract.runLabel, failures, pending, missing, passed, finalTests: contract.finalTests, finalSavedVersionAcceptanceRequired: true, accepted: false, executesTests: false };
}
function main(args) {
  if (args.length === 1 && args[0] === '--help') { console.log('Usage: node scripts/screen-model-candidate.cjs <contract.json>\nContract: schemaVersion=1, workflowCode, version, runLabel, screeningTests, finalTests, evidence=[{path,sha256}]. Evidence contains individual results or a suite results array. Run after each critical case/judgment. Exit 0=eligible for full regression, 2=reject, 3=incomplete; never final acceptance.'); return 0; }
  if (args.length !== 1) throw Error('Expected one screening contract');
  const c = JSON.parse(fs.readFileSync(args[0], 'utf8').replace(/^\uFEFF/, ''));
  if (!Array.isArray(c.evidence)) throw Error('Missing evidence inventory');
  const reports = c.evidence.flatMap(ref => { const r = JSON.parse(readEvidence(process.cwd(), ref).toString('utf8').replace(/^\uFEFF/, '')); return Array.isArray(r.results) ? r.results : [r]; });
  const result = screen(c, reports); console.log(JSON.stringify(result, null, 2));
  return result.decision === 'reject' ? 2 : result.decision === 'incomplete' ? 3 : 0;
}
if (require.main === module) { try { process.exitCode = main(process.argv.slice(2)); } catch(e) { console.error(e.message); process.exitCode = 64; } }
module.exports = { screen, main };
