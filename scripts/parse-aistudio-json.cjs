#!/usr/bin/env node
'use strict';

// Transport parsing only. Callers must separately check the command's semantic
// result (for example ok/readyToFetch); parsed JSON is not acceptance evidence.
function failure(code, message) { return Object.assign(new Error(message), { code }); }
function recognizedAuthLine(line) {
  // Exact successful refresh diagnostics observed alongside the existing auth
  // prefix. Do not strip arbitrary Refresh/OAuth messages or error lines.
  return line.startsWith('[aistudio-auth]') ||
    /^Refreshing base scope urn:opc:resource:fusion:[A-Za-z0-9-]+:fusion-ai\/ using refresh token\.$/.test(line) ||
    line === 'Refresh token rotated by identity provider.' ||
    /^Refreshed OAuth token for scope urn:opc:resource:fusion:[A-Za-z0-9-]+:fusion-ai\/\.$/.test(line);
}
function parse(text, { exitCode } = {}) {
  if (!Number.isInteger(exitCode) || exitCode !== 0) {
    throw failure('AI_STUDIO_COMMAND_FAILED', 'AI Studio command did not report a successful process exit');
  }
  if (typeof text !== 'string') throw failure('AI_STUDIO_JSON_INVALID', 'AI Studio output must be text');
  const clean = text.replace(/^\uFEFF/, '').split(/\r?\n/)
    .filter(line => !recognizedAuthLine(line)).join('\n');
  try { return JSON.parse(clean); }
  catch { throw failure('AI_STUDIO_JSON_INVALID', 'AI Studio output is not one valid JSON document after recognized auth lines'); }
}

function main(args) {
  if (args.length !== 2 || !/^-?\d+$/.test(args[1])) {
    process.stderr.write('Usage: node scripts/parse-aistudio-json.cjs <output-file> <observed-exit-code>\n');
    return 64;
  }
  try {
    // Reject process failure before reading or parsing a potentially misleading payload.
    const exitCode = Number(args[1]);
    if (!Number.isInteger(exitCode) || exitCode !== 0) parse('', { exitCode });
    const value = parse(require('node:fs').readFileSync(args[0], 'utf8'), { exitCode });
    process.stdout.write(`${JSON.stringify(value)}\n`);
    return 0;
  } catch (error) {
    // Never print raw output, paths or JSON parser excerpts, which may contain secrets.
    const code = ['AI_STUDIO_COMMAND_FAILED', 'AI_STUDIO_JSON_INVALID'].includes(error?.code) ? error.code : 'AI_STUDIO_OUTPUT_UNREADABLE';
    process.stderr.write(`${code}\n`);
    return 1;
  }
}

if (require.main === module) process.exitCode = main(process.argv.slice(2));
module.exports = { parse };
