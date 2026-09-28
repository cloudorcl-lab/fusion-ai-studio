'use strict';
const assert = require('node:assert/strict');
const { parse } = require('../parse-aistudio-json.cjs');
let passed = 0;
function check(name, fn) { fn(); passed++; console.log(`PASS ${name}`); }
const valid = text => parse(text, { exitCode: 0 });
const invalid = text => assert.throws(() => valid(text), { code: 'AI_STUDIO_JSON_INVALID' });

check('observed credential log shape plus BO payload preserves nested response string', () => {
  const envelope = { ok: true, command: 'do-fetch-bo-function-example-sample', result: { payload: JSON.stringify({ items: [{ SupplierId: 123, Supplier: 'Known Supplier' }], count: 1, hasMore: false }) } };
  const output = '[aistudio-auth] Loading credentials from configured passphrase.\r\n[aistudio-auth] Resolving credentials (interactive=true, forceReauthorize=false)...\r\n[aistudio-auth] Loaded cached credentials from disk.\r\n[aistudio-auth] Credential resolution finished successfully.\r\n' + JSON.stringify(envelope, null, 2);
  assert.deepEqual(valid(output), envelope);
  assert.equal(JSON.parse(valid(output).result.payload).items[0].SupplierId, 123);
});
check('plain JSON BOM whitespace and escaped content survive unchanged', () => {
  const value = { text: 'quotes " slash \\ newline\n[aistudio-auth] literal inside string', unicode: 'é中', empty: '', values: [null, false, 0] };
  assert.deepEqual(valid('\uFEFF\r\n ' + JSON.stringify(value) + '\r\n'), value);
  assert.equal(valid('false'), false);
});
check('recognized unprefixed refresh diagnostics preserve the complete JSON document', () => {
  const lines = ['Refreshing base scope urn:opc:resource:fusion:test-pod:fusion-ai/ using refresh token.', 'Refresh token rotated by identity provider.', 'Refreshed OAuth token for scope urn:opc:resource:fusion:test-pod:fusion-ai/.'];
  const value = { ok: true, result: { products: [{ value: 'SUPPLIER' }], text: lines.join('\n') } };
  assert.deepEqual(valid(lines.join('\r\n') + '\r\n' + JSON.stringify(value)), value);
  for (const line of lines) assert.deepEqual(valid(line + '\n{}'), {});
});
check('near-match refresh lines raw errors and trailing garbage remain rejected', () => {
  for (const line of [
    'Refreshing base scope arbitrary using refresh token.',
    'Refreshing base scope urn:opc:resource:fusion:test-pod:fusion-ai/ using refresh token. ERROR',
    'Refresh token rotated by identity provider. trailing',
    ' Refresh token rotated by identity provider.',
    'Refreshed OAuth token for scope https://example.invalid/.',
    'Refreshed OAuth token for scope urn:opc:resource:fusion:test-pod:fusion-ai/. ERROR',
    'ERROR: Refresh token rotated by identity provider.',
    'Refresh token failed: invalid_grant',
  ]) invalid(line + '\n{}');
});
check('only complete lines with exact anchored auth prefix are removed', () => {
  invalid(' [aistudio-auth] log\n{}');
  invalid('[other-prefix] log\n{}');
  invalid('leading [aistudio-auth] log\n{}');
  invalid('[aistudio-auth-other] log\n{}');
  invalid('{} [aistudio-auth] trailing');
  assert.deepEqual(valid('{}\n[aistudio-auth] trailing full log line'), {});
});
check('malformed JSON multiple documents and trailing garbage remain errors', () => {
  for (const text of ['', '[aistudio-auth] only log', '{"bad":}', '{}\n{}', '{}\ntrailing', 'undefined']) invalid(text);
});
check('nonzero unknown and invalid exit codes reject before parsing', () => {
  for (const exitCode of [1, 23, -1, null, undefined, '0', 0.5, NaN]) {
    assert.throws(() => parse('{"ok":true}', { exitCode }), { code: 'AI_STUDIO_COMMAND_FAILED' });
  }
  assert.throws(() => parse(null, { exitCode: 7 }), { code: 'AI_STUDIO_COMMAND_FAILED' });
});
check('semantic failure remains failure data for caller rather than invented acceptance', () => {
  const error = { ok: false, error: { code: 'READ_REJECTED', message: 'Request rejected' } };
  assert.deepEqual(valid(JSON.stringify(error)), error);
});
check('type and parser errors never echo source content', () => {
  invalid(null);
  try { valid('{SECRET_VALUE'); assert.fail('must reject'); }
  catch (error) { assert.equal(error.code, 'AI_STUDIO_JSON_INVALID'); assert.ok(!error.message.includes('SECRET_VALUE')); }
});
check('CLI with failed process rejects before file read and emits no payload', () => {
  const { spawnSync } = require('node:child_process');
  const cli = require('node:path').resolve(__dirname, '../parse-aistudio-json.cjs');
  const result = spawnSync(process.execPath, [cli, 'NONEXISTENT_SECRET_PATH', '7'], { encoding: 'utf8' });
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr.trim(), 'AI_STUDIO_COMMAND_FAILED');
  const malformed = spawnSync(process.execPath, [cli, __filename, '0'], { encoding: 'utf8' });
  assert.equal(malformed.status, 1);
  assert.equal(malformed.stdout, '');
  assert.equal(malformed.stderr.trim(), 'AI_STUDIO_JSON_INVALID');
});
console.log(`AI Studio JSON parser: ${passed} checks PASS`);
