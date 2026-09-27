'use strict';

// Capture-only adapter for an already authorized, already submitted native test.
// Import this module in a browser REPL with filesystem access, or another Node
// host. The caller owns supported browser APIs and supplies capture() exactly
// once. It must extract the COMPLETE target response directly, without manual
// transcription, and return this shape:
// { target, prompt, submittedUtc, settledUtc, loading:false, complete:true,
//   responseText, semanticSnapshot,
//   screenshot:{mimeType:'image/png', complete:true, data:Buffer|Uint8Array} }
// target = { artifactCode, version, lifecycle:'DRAFT'|'PUBLISHED',
//            surface:'app-preview'|'published-app', url }
// version is the exact observed version as a nonblank STRING.
// Bind observed identity to the current artifact before capture; never infer it
// from response prose. Capture must observe a settled response and take the
// screenshot from that same target, with no intervening navigation/submission.
// No driver, submission, polling, retry, auth, redaction or acceptance judge is
// hidden here. Call only on scoped app results, never on login/credential pages.
// A receipt proves recorded adapter observations, not independent authenticity,
// visual correctness, raw model timing, or freshness of tenant state.

const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');

function fail(message) { throw new Error(message); }
function nonblank(value, name) {
  if (typeof value !== 'string' || !value.trim()) fail(`${name} must be a nonblank string`);
  return value;
}
function timestamp(value, name) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) ||
      !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) fail(`${name} must be an exact UTC ISO timestamp`);
  return Date.parse(value);
}
function targetIdentity(target) {
  if (!target || typeof target !== 'object') fail('target required');
  const normalized = {};
  for (const key of ['artifactCode', 'version', 'lifecycle', 'surface', 'url']) normalized[key] = nonblank(target[key], `target.${key}`);
  if (!/^[A-Z][A-Z0-9_]*$/.test(normalized.artifactCode)) fail('Invalid artifact code');
  const surfaces = { 'app-preview': 'DRAFT', 'published-app': 'PUBLISHED' };
  if (surfaces[normalized.surface] !== normalized.lifecycle) fail('Unsupported target surface/lifecycle');
  let url;
  try { url = new URL(normalized.url); } catch { fail('Invalid target URL'); }
  const approvedQuery = url.search === '' || (url.search === '?draft=true' && normalized.surface === 'app-preview');
  if (url.protocol !== 'https:' || url.username || url.password || !approvedQuery || url.hash) fail('Target URL must be HTTPS without credentials/fragment; only preview ?draft=true is allowed');
  return normalized;
}
function sha256(bytes) { return crypto.createHash('sha256').update(bytes).digest('hex'); }

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let i = 0; i < 8; i++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Check PNG container integrity, including every chunk CRC and terminal IEND.
// This detects incomplete transfer; it does not judge screenshot content.
function validatePng(data) {
  if (!(data instanceof Uint8Array)) fail('Screenshot must be binary PNG bytes');
  const bytes = Buffer.from(data);
  if (!bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) fail('Invalid PNG signature');
  let offset = 8;
  let chunks = 0;
  let imageData = false;
  let ended = false;
  while (offset < bytes.length) {
    if (offset + 12 > bytes.length) fail('Incomplete PNG chunk');
    const size = bytes.readUInt32BE(offset);
    const end = offset + size + 12;
    if (end > bytes.length) fail('Incomplete PNG chunk payload');
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    if (crc32(bytes.subarray(offset + 4, end - 4)) !== bytes.readUInt32BE(end - 4)) fail('PNG checksum mismatch');
    if (chunks === 0 && (type !== 'IHDR' || size !== 13 || !bytes.readUInt32BE(offset + 8) || !bytes.readUInt32BE(offset + 12))) fail('Invalid PNG header');
    if (chunks > 0 && type === 'IHDR') fail('Duplicate PNG header');
    if (type === 'IDAT' && size > 0) imageData = true;
    if (type === 'IEND') {
      if (size !== 0 || !imageData || end !== bytes.length) fail('Incomplete PNG image or trailing bytes');
      ended = true;
    }
    offset = end;
    chunks++;
  }
  if (!ended) fail('PNG has no complete IEND');
  return bytes;
}

async function durableWrite(file, bytes) {
  const handle = await fs.open(file, 'wx');
  try { await handle.writeFile(bytes); await handle.sync(); }
  finally { await handle.close(); }
}

// Documented CUA API (cua.rewriteDocumentation, 2026-09-27): the bound tab's
// getAXStateAndScreenshot({ disableDiffing:true, emit:false }) returns
// { state:string, screenshot?:Uint8Array }. No browser driver is introduced.
// Example, inside the authorized persistent CUA REPL after binding `tab`:
// const { captureNativeEvidence, createCuaCapture } = await import(moduleUrl);
// await captureNativeEvidence({ outputDir, id, prompt, target, submittedUtc,
//   capture: createCuaCapture(tab, parseObservedAppResult) });
// parseObservedAppResult(fullState) is a product-specific, TESTED extraction
// callback. It must return target, exact prompt, submission receipt timestamp,
// loading, complete and the complete responseText from observed result content.
// Do not echo expected identity or assert completeness without observation.
// Missing/collapsed/virtualized content must return complete:false. This helper
// retains the unmodified full AX state; it does not invent an Oracle parser.
function createCuaCapture(tab, readResult) {
  if (!tab || typeof tab.getAXStateAndScreenshot !== 'function' || typeof readResult !== 'function') fail('CUA tab and observed-result parser required');
  return async () => {
    const pair = await tab.getAXStateAndScreenshot({ disableDiffing: true, emit: false });
    const settledUtc = new Date().toISOString();
    nonblank(pair?.state, 'CUA semantic state');
    const result = await readResult(pair.state);
    return { ...result, settledUtc, semanticSnapshot: pair.state,
      screenshot: { mimeType: 'image/png', complete: pair.screenshot instanceof Uint8Array, data: pair.screenshot } };
  };
}

async function captureNativeEvidence({ outputDir, id, prompt, target, submittedUtc, capture }) {
  nonblank(outputDir, 'outputDir');
  if (typeof id !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,99}$/.test(id)) fail('Invalid capture id');
  nonblank(prompt, 'prompt');
  const expectedTarget = targetIdentity(target);
  const submittedMs = timestamp(submittedUtc, 'submittedUtc');
  if (submittedMs > Date.now()) fail('Submission timestamp is in the future');
  if (typeof capture !== 'function') fail('capture callback required');
  // Resolve existing parent once; disallow symlink/junction evidence roots.
  const root = path.resolve(outputDir);
  const stat = await fs.lstat(root);
  if (!stat.isDirectory() || stat.isSymbolicLink() || path.resolve(await fs.realpath(root)).toLowerCase() !== root.toLowerCase()) fail('Evidence root must be a real existing directory');
  const directory = path.join(root, id);
  await fs.mkdir(directory); // EEXIST is intentional: do not overwrite/replay.
  const startedUtc = new Date().toISOString();
  let stage = 'capture';
  try {
    const observed = await capture(); // exactly once; never retry or submit
    stage = 'validation';
    if (!observed || typeof observed !== 'object') fail('Missing capture snapshot');
    if (JSON.stringify(targetIdentity(observed.target)) !== JSON.stringify(expectedTarget)) fail('Observed target mismatch');
    if (observed.prompt !== prompt || observed.submittedUtc !== submittedUtc) fail('Observed submission identity mismatch');
    if (observed.loading !== false || observed.complete !== true) fail('Response is not confirmed settled and complete');
    const settledMs = timestamp(observed.settledUtc, 'settledUtc');
    if (settledMs < submittedMs || settledMs > Date.now()) fail('Invalid settled timestamp order');
    nonblank(observed.responseText, 'responseText');
    nonblank(observed.semanticSnapshot, 'semanticSnapshot');
    if (observed.screenshot?.mimeType !== 'image/png' || observed.screenshot.complete !== true) fail('Complete PNG screenshot required');
    const png = validatePng(observed.screenshot.data);
    const data = [
      ['prompt.txt', Buffer.from(prompt, 'utf8')],
      ['response.txt', Buffer.from(observed.responseText, 'utf8')],
      ['semantic-snapshot.txt', Buffer.from(observed.semanticSnapshot, 'utf8')],
      ['screenshot.png', png]
    ];
    stage = 'persistence';
    const files = [];
    for (const [name, bytes] of data) {
      await durableWrite(path.join(directory, name), bytes);
      files.push({ path: name, bytes: bytes.length, sha256: sha256(bytes) });
    }
    const receipt = { schemaVersion: 1, id, status: 'captured', target: expectedTarget,
      submittedUtc, settledUtc: observed.settledUtc, captureStartedUtc: startedUtc,
      captureCompletedUtc: new Date().toISOString(), submissionToSettledObservationMs: settledMs - submittedMs,
      acceptance: 'not-evaluated', provenance: 'injected-authorized-browser-capture', files };
    // Commit marker is LAST. Consumers must require receipt.json and validate
    // its hashes, never infer success from a directory or partial response.
    await durableWrite(path.join(directory, 'receipt.json'), JSON.stringify(receipt, null, 2) + '\n');
    return { directory, receipt };
  } catch (error) {
    // Never persist a callback error (it could contain credentials or page text).
    await durableWrite(path.join(directory, 'failure.json'), JSON.stringify({ schemaVersion: 1, id, status: 'capture-failed', stage, observedUtc: new Date().toISOString(), retryPerformed: false }) + '\n').catch(() => {});
    if (stage === 'capture') throw new Error('Native capture callback failed; no retry performed');
    throw error;
  }
}

module.exports = { captureNativeEvidence, createCuaCapture, validatePng };
if (require.main === module) {
  console.log('Import captureNativeEvidence(options) from an authorized browser REPL/Node host. This capture-only adapter has no submit or retry CLI. See module contract.');
}
