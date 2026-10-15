// Focused local state proof: no browser, tenant, model or business writes.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { start } from '../../../scripts/xdx-supplier-e2e.mjs';
const root = process.cwd();
const runDir = 'docs/builds/xdx-supplier-e2e-evidence-20261015/runner-proof-state';
const observed = [];
const s = await start({ repoRoot: root, runDir, tab: { getAXStateAndScreenshot() { throw Error('Browser must never execute in local proof'); } },
  target: { appCode: 'LOCAL_FIXTURE', workflowCode: 'LOCAL_FIXTURE', version: 'fixture', host: 'local', surface: 'app-preview' },
  plan: [{ id: 'write', write: true }, { id: 'read' }, { id: 'dependent' }],
  finalize: async () => { observed.push('finalizer-invoked'); return { localFixture: true }; } });
try {
  await s.begin('write');
  await s.reserve({ id: 'write', operationId: 'fixture-op', requestId: 'fixture-request', revision: 1, payload: { Name: 'synthetic' } });
  const disk = JSON.parse(await fs.readFile(s.resultsPath));
  assert.equal(disk.steps[0].reservations[0].disposition, 'uncertain');
  await assert.rejects(s.begin('write', { reason: 'timeout', changedCondition: 'temporary issue resolved' }), /cannot be replayed/);
  observed.push('uncertain-reservation-durable-and-blocks-replay');
  await s.reconcile({ id: 'write', disposition: 'accepted', recordIds: { fixtureId: 'fixture-123' }, evidence: 'local fixture only' });
  await assert.rejects(s.reconcile({ id: 'write', disposition: 'not-created', evidence: 'invalid rollback' }), /cannot be made replayable/);
  assert.equal(JSON.parse(await fs.readFile(s.resultsPath)).records.fixtureId, 'fixture-123');
  observed.push('accepted-id-durable-and-cannot-be-cleared');
  await s.record({ id: 'write', status: 'FAIL', actual: 'Intentional local display failure after accepted fixture write', failureKind: 'test' });
  await s.begin('read');
  await s.record({ id: 'read', status: 'FAIL', actual: 'Intentional local initial failure' });
  await assert.rejects(s.begin('read'), /changed condition/);
  await s.begin('read', { reason: 'fixture changed', changedCondition: 'new expected input' });
  await assert.rejects(s.record({ id: 'read', status: 'PASS', actual: 'Screenshot alone' }), /observed assertions/);
  await s.record({ id: 'read', status: 'PASS', actual: 'Local explicit assertion', assertions: [{ passed: true, evidence: 'fixture assertion' }] });
  const result = await s.finish();
  assert.equal(result.steps[1].attempts.length, 2); assert.equal(result.summary.retryCount, 1);
  assert.equal(result.steps[2].status, 'BLOCKED'); assert.equal(result.summary.connectedJourneyPassed, false);
  assert.ok(observed.includes('finalizer-invoked')); observed.push('one-retry-counted-and-pending-accounted-finalizer-always-called');
  await fs.writeFile('docs/builds/xdx-supplier-e2e-evidence-20261015/runner-proof.json', JSON.stringify({ status: 'PASS', surface: 'local state fixture only', observedUtc: new Date().toISOString(), checks: observed, noBrowserCalls: true, noBusinessWrites: true }, null, 2) + '\n');
  console.log('Runner focused durable-state proof PASS');
} finally { await s.close(); }
