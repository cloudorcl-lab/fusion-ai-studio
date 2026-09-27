'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { captureNativeEvidence, createCuaCapture, validatePng } = require('../scripts/capture-native-evidence.cjs');
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');
const target = { artifactCode: 'XDX_TEST', version: '100', lifecycle: 'DRAFT', surface: 'app-preview', url: 'https://example.com/studio' };
const prompt = 'Exact prompt\nwith whitespace  ';
const submittedUtc = '2026-01-01T00:00:00.000Z';
function snapshot(overrides = {}) {
  return { target, prompt, submittedUtc, settledUtc: '2026-01-01T00:00:02.000Z', loading: false, complete: true,
    responseText: 'A complete response\nwith table rows\n', semanticSnapshot: 'document\n  heading\n  table\n    row value',
    screenshot: { mimeType: 'image/png', complete: true, data: png }, ...overrides };
}
async function setup(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'native-evidence-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return { outputDir: root, id: 'case-1', prompt, target, submittedUtc };
}

test('complete callback observations persist exact bytes, hashes and timing; no automatic acceptance', async t => {
  const options = await setup(t);
  let calls = 0;
  const observed = snapshot({ responseText: 'x'.repeat(100000) + '\ncomplete end' });
  const { directory, receipt } = await captureNativeEvidence({ ...options, capture: async () => { calls++; return observed; } });
  assert.equal(calls, 1);
  assert.equal(receipt.acceptance, 'not-evaluated');
  assert.equal(receipt.submissionToSettledObservationMs, 2000);
  assert.deepEqual(receipt.target, target);
  assert.equal(await fs.readFile(path.join(directory, 'prompt.txt'), 'utf8'), prompt);
  assert.equal(await fs.readFile(path.join(directory, 'response.txt'), 'utf8'), observed.responseText);
  assert.equal(await fs.readFile(path.join(directory, 'semantic-snapshot.txt'), 'utf8'), observed.semanticSnapshot);
  for (const file of receipt.files) {
    const data = await fs.readFile(path.join(directory, file.path));
    assert.equal(data.length, file.bytes);
    assert.equal(crypto.createHash('sha256').update(data).digest('hex'), file.sha256);
  }
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(directory, 'receipt.json'), 'utf8')), receipt);
});

for (const [name, changes, message] of [
  ['version mismatch', { target: { ...target, version: '99' } }, /target mismatch/],
  ['surface mismatch', { target: { ...target, surface: 'global-chat' } }, /surface/],
  ['prompt mismatch', { prompt: prompt.trim() }, /submission identity/],
  ['submission mismatch', { submittedUtc: '2026-01-01T00:00:01.000Z' }, /submission identity/],
  ['loading response', { loading: true }, /settled and complete/],
  ['unknown completeness', { complete: undefined }, /settled and complete/],
  ['blank response', { responseText: '' }, /responseText/],
  ['missing semantic snapshot', { semanticSnapshot: undefined }, /semanticSnapshot/],
  ['invalid timestamp date', { settledUtc: '2026-02-30T00:00:01.000Z' }, /timestamp/],
  ['reversed timestamp', { settledUtc: '2025-01-01T00:00:01.000Z' }, /timestamp order/],
  ['future timestamp', { settledUtc: '2099-01-01T00:00:01.000Z' }, /timestamp order/],
  ['incomplete screenshot', { screenshot: { mimeType: 'image/png', complete: false, data: png } }, /screenshot/],
  ['truncated screenshot', { screenshot: { mimeType: 'image/png', complete: true, data: png.subarray(0, -1) } }, /Incomplete PNG/]
]) {
  test(`rejects ${name} without receipt or retry`, async t => {
    const options = await setup(t);
    let calls = 0;
    await assert.rejects(captureNativeEvidence({ ...options, capture: async () => { calls++; return snapshot(changes); } }), message);
    assert.equal(calls, 1);
    await assert.rejects(fs.stat(path.join(options.outputDir, options.id, 'receipt.json')), { code: 'ENOENT' });
    const failure = JSON.parse(await fs.readFile(path.join(options.outputDir, options.id, 'failure.json'), 'utf8'));
    assert.equal(failure.stage, 'validation');
    assert.equal(failure.retryPerformed, false);
  });
}

test('exclusive id prevents callback replay and protects existing evidence', async t => {
  const options = await setup(t);
  let calls = 0;
  const capture = async () => { calls++; return snapshot(); };
  const first = await captureNativeEvidence({ ...options, capture });
  await assert.rejects(captureNativeEvidence({ ...options, capture }), { code: 'EEXIST' });
  assert.equal(calls, 1);
  assert.deepEqual(JSON.parse(await fs.readFile(path.join(first.directory, 'receipt.json'), 'utf8')), first.receipt);
});

test('callback failure is sanitized, durable, and is never retried', async t => {
  const options = await setup(t);
  let calls = 0;
  await assert.rejects(captureNativeEvidence({ ...options, capture: async () => { calls++; throw new Error('password=DO-NOT-RECORD'); } }), /^Error: Native capture callback failed; no retry performed$/);
  assert.equal(calls, 1);
  const text = await fs.readFile(path.join(options.outputDir, options.id, 'failure.json'), 'utf8');
  assert.ok(!text.includes('DO-NOT-RECORD'));
  assert.equal(JSON.parse(text).stage, 'capture');
});

test('partial persistence cannot produce a success receipt or overwrite a file', async t => {
  const options = await setup(t);
  await assert.rejects(captureNativeEvidence({ ...options, capture: async () => {
    await fs.writeFile(path.join(options.outputDir, options.id, 'response.txt'), 'existing protected bytes', { flag: 'wx' });
    return snapshot();
  } }), { code: 'EEXIST' });
  const directory = path.join(options.outputDir, options.id);
  assert.equal(await fs.readFile(path.join(directory, 'response.txt'), 'utf8'), 'existing protected bytes');
  await assert.rejects(fs.stat(path.join(directory, 'receipt.json')), { code: 'ENOENT' });
  assert.equal(JSON.parse(await fs.readFile(path.join(directory, 'failure.json'), 'utf8')).stage, 'persistence');
});

test('concurrent same-id capture has only one callback owner', async t => {
  const options = await setup(t);
  let calls = 0;
  const capture = async () => { calls++; return snapshot(); };
  const results = await Promise.allSettled([
    captureNativeEvidence({ ...options, capture }), captureNativeEvidence({ ...options, capture })
  ]);
  assert.equal(calls, 1);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  assert.equal(results.find(result => result.status === 'rejected').reason.code, 'EEXIST');
});

test('rejects unsafe identity and output before callback', async t => {
  const options = await setup(t);
  let calls = 0;
  const capture = async () => { calls++; return snapshot(); };
  for (const override of [ { id: '../escape' }, { target: { ...target, url: 'https://example.com/?token=secret' } },
    { target: { ...target, url: 'https://user:pass@example.com/' } }, { target: { ...target, lifecycle: 'PUBLISHED' } },
    { submittedUtc: '2099-01-01T00:00:00.000Z' } ]) {
    await assert.rejects(captureNativeEvidence({ ...options, ...override, capture }));
  }
  assert.equal(calls, 0);
});

test('PNG corruption and missing terminal fail', () => {
  assert.deepEqual(validatePng(png), png);
  const corrupt = Buffer.from(png); corrupt[45] ^= 1;
  assert.throws(() => validatePng(corrupt), /checksum/);
  assert.throws(() => validatePng(png.subarray(0, -12)), /IEND/);
  assert.throws(() => validatePng(Buffer.concat([png, Buffer.from('extra')])));
  assert.throws(() => validatePng(png.toString('base64')), /binary/);
});

test('exact draft=true preview URL is supported without allowing token query parameters', async t => {
  const options = await setup(t);
  const preview = { ...target, url: 'https://example.com/hcmUI/redwoodAI/XDX_TEST?draft=true' };
  const saved = await captureNativeEvidence({ ...options, target: preview, capture: async () => snapshot({ target: preview }) });
  assert.equal(saved.receipt.target.url, preview.url);
  for (const suffix of ['?draft=true&token=secret', '?draft=true&draft=true', '?draft=false', '?draft=true#token']) {
    await assert.rejects(captureNativeEvidence({ ...options, id: 'bad-query', target: { ...target, url: 'https://example.com/studio' + suffix }, capture: async () => assert.fail('must not capture') }));
  }
});

test('CUA adapter invokes documented combined capture once and retains full state', async t => {
  const options = await setup(t);
  let calls = 0;
  const fullState = 'observed artifact XDX_TEST\ncomplete response table';
  const tab = { async getAXStateAndScreenshot(argument) {
    calls++;
    assert.deepEqual(argument, { disableDiffing: true, emit: false });
    return { state: fullState, screenshot: png };
  } };
  const capture = createCuaCapture(tab, state => { assert.equal(state, fullState); return snapshot(); });
  const saved = await captureNativeEvidence({ ...options, capture });
  assert.equal(calls, 1);
  assert.equal(await fs.readFile(path.join(saved.directory, 'semantic-snapshot.txt'), 'utf8'), fullState);
});

test('CUA adapter cannot accept missing screenshot from a supported optional result', async t => {
  const options = await setup(t);
  const capture = createCuaCapture({ async getAXStateAndScreenshot() { return { state: 'state' }; } }, () => snapshot());
  await assert.rejects(captureNativeEvidence({ ...options, capture }), /screenshot/);
});
