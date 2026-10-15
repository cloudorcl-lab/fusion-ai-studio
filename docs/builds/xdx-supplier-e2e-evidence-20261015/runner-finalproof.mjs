// Two focused local repair branches. Actual retained evidence is READ ONLY.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { start } from '../../../scripts/xdx-supplier-e2e.mjs';
const root = process.cwd();
const prefix = 'docs/builds/xdx-supplier-e2e-evidence-20261015';
const hash = value => createHash('sha256').update(value).digest('hex');
const originalPath = path.join(root, prefix, 'results.json');
const originalBytes = await fs.readFile(originalPath);
const originalHash = hash(originalBytes);
const original = JSON.parse(originalBytes);
const fixtureDir = `${prefix}/runner-finalproof-state`;
await fs.mkdir(path.join(root, fixtureDir));
await fs.writeFile(path.join(root, fixtureDir, 'results.json'), originalBytes, { flag: 'wx' });
const inertTab = { getAXStateAndScreenshot() { throw Error('No UI calls permitted'); } };
const options = { tab: inertTab, repoRoot: root, runDir: fixtureDir, resume: true, target: original.target };
await assert.rejects(start({ ...options, plan: [{ id: 'SUP-C' }] }), /step-ID inventory differs/);
assert.deepEqual(await fs.readdir(path.join(root, fixtureDir)), ['results.json']);
assert.equal(hash(await fs.readFile(path.join(root, fixtureDir, 'results.json'))), originalHash);
const priorEventCount = original.events.length;
const session = await start({ ...options, plan: original.steps.map(step => ({ id: step.id })),
  finalize: async () => ({ status: 'host-render-requested', resultsPath: 'fixture-only' }) });
const completed = await session.finish();
const addedEvents = completed.events.slice(priorEventCount);
assert.equal(completed.presentation.status, 'host-render-requested');
assert.equal(completed.presentation.artifactCompletionVerified, false);
assert.ok(addedEvents.some(event => event.type === 'presentation-pending'));
assert.ok(!addedEvents.some(event => event.type === 'presentation-finished'));
assert.equal(hash(await fs.readFile(originalPath)), originalHash);
const proof = { result: 'PASS', observedUtc: new Date().toISOString(), surface: 'local retained-results copy only',
  branches: [
    { name: 'Mismatched resume inventory', result: 'PASS', observations: 'Rejected before lock/journal/results mutation; retained copy unchanged' },
    { name: 'Queued host deck finalizer', result: 'PASS', observations: 'Matching resume allowed; queued callback retained as pending; no presentation-finished event emitted' }
  ],
  actualResultsSha256BeforeAndAfter: originalHash,
  runnerSha256: hash(await fs.readFile(path.join(root, 'scripts/xdx-supplier-e2e.mjs'))),
  noBrowserCalls: true, noBusinessWrites: true, unchangedCaptureLogic: true };
await fs.writeFile(path.join(root, prefix, 'runner-finalproof.json'), JSON.stringify(proof, null, 2) + '\n', { flag: 'wx' });
console.log('Runner final safety proof PASS: 2 branches, actual retained run unchanged');
