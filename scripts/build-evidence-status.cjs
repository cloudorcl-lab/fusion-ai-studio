#!/usr/bin/env node
'use strict';
// Local evidence only. No execution, network, inferred passes or latest pointers.
const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
function readEvidence(root, ref) {
  if (!ref || typeof ref.path !== 'string' || !/^[a-f0-9]{64}$/.test(ref.sha256 || '')) throw Error('Evidence needs path and SHA256');
  if (path.isAbsolute(ref.path) || ref.path.includes(':') || ref.path.includes('\\') || ref.path.split('/').some(p => !p || p === '.' || p === '..')) throw Error('Unsafe evidence path');
  const base = fs.realpathSync(root), file = fs.realpathSync(path.resolve(base, ref.path));
  if (!file.startsWith(base + path.sep) || !fs.statSync(file).isFile()) throw Error('Evidence escapes repository or is not a file');
  const bytes = fs.readFileSync(file);
  if (createHash('sha256').update(bytes).digest('hex') !== ref.sha256) throw Error('Stale evidence hash');
  return bytes;
}
function pointer(value, p) {
  if (typeof p !== 'string' || !p.startsWith('/') || /~(?![01])/u.test(p)) throw Error('Invalid JSON pointer');
  for (const key of p.slice(1).split('/').map(s => s.replace(/~1/g, '/').replace(/~0/g, '~'))) {
    if (value === null || typeof value !== 'object' || !Object.hasOwn(value, key)) throw Error('Missing evidence field');
    value = value[key];
  }
  return value;
}
function evaluate(manifest, root = process.cwd()) {
  if (manifest?.schemaVersion !== 1 || typeof manifest.taskId !== 'string' || !manifest.taskId || !Array.isArray(manifest.requirements) || !manifest.requirements.length) throw Error('Invalid evidence manifest');
  const sourceIssues = [];
  if (!Array.isArray(manifest.sources) || !manifest.sources.length) sourceIssues.push('Missing frozen source inventory');
  for (const source of manifest.sources || []) {
    try { readEvidence(root, source); } catch (e) { sourceIssues.push(`${source.path || 'unknown'}: ${e.message}`); }
  }
  const ids = new Set();
  const requirements = manifest.requirements.map(row => {
    if (!row || typeof row.id !== 'string' || !row.id || ids.has(row.id) || typeof row.description !== 'string' || !['pending','passed','failed','not-applicable'].includes(row.status)) throw Error('Invalid or duplicate requirement');
    ids.add(row.id);
    const issues = [];
    if (row.status === 'not-applicable' && !row.reason?.trim()) issues.push('Missing applicability reason');
    if (row.status === 'passed' && (!Array.isArray(row.evidence) || !row.evidence.length)) issues.push('Pass has no evidence');
    for (const ref of row.evidence || []) {
      try {
        const bytes = readEvidence(root, ref);
        if (!Array.isArray(ref.checks) || !ref.checks.length) throw Error('Evidence needs explicit JSON checks');
        const data = JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/, ''));
        for (const check of ref.checks) {
          if (!Object.hasOwn(check, 'equals') || JSON.stringify(pointer(data, check.pointer)) !== JSON.stringify(check.equals)) throw Error('Evidence check failed');
        }
      } catch (error) { issues.push(`${ref.path || 'unknown'}: ${error.message}`); }
    }
    return { id: row.id, description: row.description, status: issues.length ? 'blocked' : row.status, reason: row.reason || null, issues, evidence: row.evidence || [] };
  });
  const gaps = requirements.filter(r => !['passed','not-applicable'].includes(r.status));
  return { schemaVersion: 1, taskId: manifest.taskId, status: gaps.length || sourceIssues.length ? 'incomplete' : 'complete', closeoutEligible: !gaps.length && !sourceIssues.length, requirements, gaps, sourceIssues, executesTests: false, scope: 'Only explicitly declared requirements and hash-bound local evidence; no live-state verification' };
}
function render(report, view = 'status') {
  if (!['status','requirements','gaps','closeout'].includes(view)) throw Error('Unknown view');
  const rows = view === 'gaps' ? report.gaps : report.requirements;
  return `# ${report.taskId}: ${report.status}\n\nCloseout eligible: ${report.closeoutEligible}\n\n${rows.map(r => `- ${r.id}: ${r.status} — ${r.description}${r.issues.length ? ` (${r.issues.join('; ')})` : ''}`).join('\n')}\n${report.sourceIssues.map(s => `- Source: ${s}`).join('\n')}\n${report.scope}\n`;
}
function main(args) {
  if (args.length === 1 && args[0] === '--help') { console.log('Usage: node scripts/build-evidence-status.cjs <manifest.json> [status|requirements|gaps|closeout] [json|md]\nRead-only; stdout is the generated view. Exact hashes and JSON checks are mandatory for passed requirements.'); return 0; }
  if (args.length < 1 || args.length > 3) throw Error('Expected manifest, optional view and format');
  const report = evaluate(JSON.parse(fs.readFileSync(args[0], 'utf8').replace(/^\uFEFF/, '')));
  const view = args[1] || 'status', format = args[2] || 'json';
  if (!['json','md'].includes(format)) throw Error('Invalid format');
  const md = render(report, view);
  console.log(format === 'md' ? md : JSON.stringify(report, null, 2));
  return report.closeoutEligible ? 0 : 2;
}
if (require.main === module) { try { process.exitCode = main(process.argv.slice(2)); } catch (e) { console.error(e.message); process.exitCode = 64; } }
module.exports = { readEvidence, pointer, evaluate, render, main };
