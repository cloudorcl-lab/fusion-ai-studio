#!/usr/bin/env node
'use strict';
// Read-only development aid. ATLAS and the final configured full suite remain authoritative.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])]));
  return value;
}
const same = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
function plan({ repo = process.cwd(), baseline, workflow, tests }) {
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024, stdio: ['ignore', 'pipe', 'pipe'] });
  repo = fs.realpathSync(git('rev-parse', '--show-toplevel').trim());
  function safe(relative) {
    if (!relative || path.isAbsolute(relative) || relative.includes(':') || relative.includes('\\') || relative.split('/').some(p => !p || p === '.' || p === '..')) throw Error('Use repository-relative forward-slash paths without traversal');
    const target = path.resolve(repo, relative);
    const actual = fs.realpathSync(target);
    if (actual !== target || !actual.startsWith(repo + path.sep)) throw Error('Symlink/junction or external path is not supported');
    return target;
  }
  if (!baseline || baseline.startsWith('-')) throw Error('An explicit committed baseline is required');
  const commit = git('rev-parse', '--verify', '--end-of-options', `${baseline}^{commit}`).trim();
  const workflowPath = safe(workflow), testPath = safe(tests);
  const read = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, ''));
  const before = JSON.parse(git('show', `${commit}:${workflow}`));
  const after = read(workflowPath);
  const oldNodes = before.specification?.dataPipeline?.pipelineNodes;
  const nodes = after.specification?.dataPipeline?.pipelineNodes;
  function checkNodes(list) {
    if (!Array.isArray(list) || !list.length || list.some(n => !n || typeof n.code !== 'string' || !n.code || !n.id || !n.type) || new Set(list.map(n => n.code)).size !== list.length || new Set(list.map(n => n.id)).size !== list.length) throw Error('Unsupported or malformed workflow nodes');
  }
  checkNodes(oldNodes); checkNodes(nodes);
  const codes = new Set(nodes.map(n => n.code));
  function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => {
      const p = path.join(dir, e.name);
      if (e.isSymbolicLink()) throw Error('Test symlinks are not supported');
      return e.isDirectory() ? walk(p) : e.isFile() && e.name.endsWith('.json') ? [p] : [];
    });
  }
  const cases = walk(testPath).sort().map(p => {
    safe(path.relative(repo, p).split(path.sep).join('/'));
    const t = read(p);
    if (!t.testName || t.workflow?.workflowCode !== after.workflowCode) throw Error('Malformed test or mismatched workflow: ' + p);
    const steps = t.conversation ? t.conversation.steps : [t];
    if (!Array.isArray(steps) || !steps.length) throw Error('Unsupported conversation: ' + p);
    const paths = steps.map(s => {
      const a = s.pathAssertions || {};
      const parse = name => {
        if (a[name] === undefined) return [];
        if (!Array.isArray(a[name]) || a[name].some(x => !x || typeof x.nodeCode !== 'string')) throw Error('Malformed path assertion: ' + p);
        return a[name].map(x => x.nodeCode);
      };
      const yes = parse('mustExecute'), no = parse('mustNotExecute');
      if (yes.some(n => no.includes(n))) throw Error('Contradictory path assertions: ' + p);
      return { yes, no };
    });
    return { file: path.relative(repo, p).split(path.sep).join('/'), paths };
  });
  if (!cases.length) throw Error('No configured tests found');
  const result = { baseline: commit, workflow, tests, mode: 'none', changedNodes: [], reasons: [], selectedTests: [], atlasAuthoritative: true, finalConfiguredFullSuiteRequired: true, executesTests: false, scope: 'Local Git contracts only; runtime/environment drift is not evaluated' };
  function all(reason) { result.mode = 'all'; result.reasons.push(reason); result.selectedTests = cases.map(t => t.file); return result; }
  // Include staged, unstaged, deleted and untracked files. Any change outside this
  // workflow can alter dependencies, fixtures, test setup or the harness: select all.
  const changed = new Set([...git('diff', '--name-only', '-z', commit, '--').split('\0'), ...git('ls-files', '--others', '--exclude-standard', '-z').split('\0'), ...git('ls-files', '--others', '-z', '--', 'src', tests).split('\0')].filter(Boolean));
  if ([...changed].some(p => p !== workflow)) return all('Dependency, test-definition or unknown repository change');
  const globals = w => { const c = structuredClone(w); delete c.specification.dataPipeline.pipelineNodes; return c; };
  if (!same(globals(before), globals(after))) return all('Global workflow definition changed');
  const oldMap = new Map(oldNodes.map(n => [n.code, n]));
  if (nodes.length !== oldNodes.length || nodes.some(n => !oldMap.has(n.code))) return all('Node added or removed');
  if (nodes.some((n, i) => n.code !== oldNodes[i].code || !same([n.id, n.type, n.outcomes], [oldMap.get(n.code).id, oldMap.get(n.code).type, oldMap.get(n.code).outcomes]))) return all('Graph, node type or declaration order changed');
  result.changedNodes = nodes.filter(n => !same(n, oldMap.get(n.code))).map(n => n.code);
  if (!result.changedNodes.length) { result.reasons.push('No semantic workflow or repository changes'); return result; }
  if (nodes.some(n => result.changedNodes.includes(n.code) && (n.type === 'BO_FUNCTION' || !same(n.inputs, oldMap.get(n.code).inputs)))) return all('BO contract or input binding changed');
  const withoutBody = n => { const c = structuredClone(n); if (c.metadata) delete c.metadata.sourceCode; return c; };
  if (nodes.some(n => result.changedNodes.includes(n.code) && (n.type !== 'CODE' || typeof n.metadata?.sourceCode !== 'string' || typeof oldMap.get(n.code).metadata?.sourceCode !== 'string' || !same(withoutBody(n), withoutBody(oldMap.get(n.code)))))) return all('Unknown or non-CODE-body node contract change');
  if (cases.some(t => t.paths.some(p => [...p.yes, ...p.no].some(n => !codes.has(n))))) return all('Unknown node in path contract');
  if (result.changedNodes.some(n => !cases.some(t => t.paths.some(p => p.yes.includes(n))))) return all('Changed node has no positive test coverage');
  // A test is excluded only when EVERY conversation step explicitly forbids EVERY
  // changed node. Missing assertions are uncertainty, never evidence of exclusion.
  result.selectedTests = cases.filter(t => !t.paths.every(p => result.changedNodes.every(n => p.no.includes(n)))).map(t => t.file);
  result.mode = result.selectedTests.length === cases.length ? 'all' : 'affected';
  result.reasons.push('Only explicit per-step non-execution contracts permit exclusion; this is a development plan, not acceptance evidence');
  return result;
}
if (require.main === module) {
  try {
    const args = process.argv.slice(2), options = {};
    if (args.includes('--help')) {
      console.log('Usage: node scripts/plan-affected-workflow-tests.cjs --baseline <commit/ref> --workflow <repo-relative.wf> --tests <repo-relative-test-dir> [--repo <checkout>]\nRead-only local development plan. Unknown changes select all. ATLAS remains authoritative; final configured full suite is required. No tests, fixture updates, tenant calls or hash rewrites occur.');
    } else {
      for (let i = 0; i < args.length; i += 2) {
        const key = args[i].replace(/^--/, '');
        if (!['baseline', 'workflow', 'tests', 'repo'].includes(key) || !args[i + 1] || options[key]) throw Error('Invalid or repeated argument');
        options[key] = args[i + 1];
      }
      console.log(JSON.stringify(plan(options), null, 2));
    }
  } catch (e) { console.error(JSON.stringify({ mode: 'blocked', error: e.message, finalConfiguredFullSuiteRequired: true, atlasAuthoritative: true })); process.exitCode = 2; }
}
module.exports = { plan };
