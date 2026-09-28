#!/usr/bin/env node
'use strict';
const fs = require('node:fs');

// ADF rowmatch needs an explicit compatible framework. See objects/README.md.
function inspect(bo, file) {
  const checked = [], errors = [];
  for (const fn of bo.objectProperties?.tools || []) {
    if (fn.operationType !== 'GET') continue;
    const searchable = /[?&]q=/.test(fn.resourcePath || '') ||
      /^getall_/i.test(fn.operationId || '') || /^(find|search|list|lookup|resolve)/i.test(fn.name || '');
    if (!searchable) continue;
    if (!/^ADF_BC/.test(fn.resourceType || bo.objectSource || '')) continue;
    const entries = Object.entries(fn.headers || {}).filter(([k]) => k.toLowerCase() === 'rest-framework-version');
    const version = entries.length === 1 ? String(entries[0][1]) : '';
    checked.push({ file, functionName: fn.name, frameworkVersion: version || null });
    if (!/^[2-9]$/.test(version)) errors.push(`${file}:${fn.name}: requires one explicit supported REST-Framework-Version (2..9); verify compatibility through saved BO reads`);
  }
  return { checked, errors };
}
if (require.main === module) {
  const files = process.argv.slice(2), checked = [], errors = [];
  if (!files.length) errors.push('Usage: node scripts/verify-bo-search-contract.cjs <file.bo> [...]');
  for (const file of files) {
    try { const r = inspect(JSON.parse(fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '')), file); checked.push(...r.checked); errors.push(...r.errors); }
    catch (e) { errors.push(`${file}: ${e.message}`); }
  }
  console.log(JSON.stringify({ ok: errors.length === 0, checked, errors }, null, 2));
  process.exitCode = errors.length ? 1 : 0;
}
module.exports = { inspect };
