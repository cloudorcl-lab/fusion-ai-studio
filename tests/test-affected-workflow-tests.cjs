'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { plan } = require('../scripts/plan-affected-workflow-tests.cjs');
function fixture(t) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'affected-tests-'));
  t.after(() => fs.rmSync(repo, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const write = (p, v) => { fs.mkdirSync(path.dirname(path.join(repo, p)), { recursive: true }); fs.writeFileSync(path.join(repo, p), typeof v === 'string' ? v : JSON.stringify(v)); };
  const wf = { workflowCode: 'EXAMPLE', specification: { inputs: [], dataPipeline: { pipelineNodes: [
    { code: 'START', id: 's', type: 'START', outcomes: { success: 'a' } },
    { code: 'A', id: 'a', type: 'CODE', metadata: { sourceCode: 'return 1;' }, outcomes: {}, inputs: [] },
    { code: 'B', id: 'b', type: 'CODE', metadata: { sourceCode: 'return 2;' }, outcomes: {}, inputs: [] }
  ] } } };
  const testcase = (name, yes, no) => ({ testName: name, workflow: { workflowCode: 'EXAMPLE' }, pathAssertions: { mustExecute: yes.map(nodeCode => ({ nodeCode })), mustNotExecute: no.map(nodeCode => ({ nodeCode })) } });
  write('src/example.wf', wf); write('src/example.bo', { code: 'DEPENDENCY' });
  write('test/a.json', testcase('a', ['A'], ['B'])); write('test/b.json', testcase('b', ['B'], ['A']));
  git('init', '-q'); git('add', '.'); git('-c', 'user.name=Local Test', '-c', 'user.email=local@example.invalid', 'commit', '-qm', 'baseline');
  const baseline = git('rev-parse', 'HEAD').trim();
  return { repo, git, write, wf, testcase, run: overrides => plan({ repo, baseline, workflow: 'src/example.wf', tests: 'test', ...overrides }) };
}
test('unchanged selects none, retains authoritative/final gates and leaves files untouched', t => {
  const f = fixture(t), before = f.git('status', '--porcelain');
  const r = f.run(); assert.equal(r.mode, 'none'); assert.deepEqual(r.selectedTests, []);
  assert.equal(r.atlasAuthoritative, true); assert.equal(r.finalConfiguredFullSuiteRequired, true); assert.equal(r.executesTests, false);
  assert.equal(f.git('status', '--porcelain'), before);
});
test('actual body edit selects covered test and excludes only explicit negative path', t => {
  const f = fixture(t); f.wf.specification.dataPipeline.pipelineNodes[1].metadata.sourceCode = 'return 3;'; f.write('src/example.wf', f.wf);
  const before = f.git('diff'); const r = f.run(); assert.equal(r.mode, 'affected'); assert.deepEqual(r.selectedTests, ['test/a.json']); assert.deepEqual(r.changedNodes, ['A']); assert.equal(f.git('diff'), before);
});
for (const kind of ['global', 'edge', 'addition', 'removal', 'order', 'binding', 'bo', 'unknown', 'new-test', 'deleted-test']) test(kind + ' conservatively selects all', t => {
  const f = fixture(t), n = f.wf.specification.dataPipeline.pipelineNodes;
  if (kind === 'global') f.wf.specification.inputs = [{ name: 'new' }];
  if (kind === 'edge') n[0].outcomes.success = 'b';
  if (kind === 'addition') n.push({ code: 'C', id: 'c', type: 'CODE' });
  if (kind === 'removal') n.pop();
  if (kind === 'order') n.reverse();
  if (kind === 'binding') n[1].inputs = [{ name: 'x', value: 'changed' }];
  if (kind === 'bo') f.write('src/example.bo', { code: 'DEPENDENCY', changed: true });
  if (kind === 'unknown') f.write('config.json', { changed: true });
  if (kind === 'new-test') f.write('test/c.json', f.testcase('c', ['A'], []));
  if (kind === 'deleted-test') fs.unlinkSync(path.join(f.repo, 'test/b.json'));
  f.write('src/example.wf', f.wf); assert.equal(f.run().mode, 'all');
});
test('CODE body with no positive coverage selects all', t => {
  const f = fixture(t); f.write('test/b.json', f.testcase('b', [], ['A']));
  f.git('add', '.'); f.git('-c', 'user.name=Local Test', '-c', 'user.email=local@example.invalid', 'commit', '-qm', 'uncovered body');
  f.wf.specification.dataPipeline.pipelineNodes[2].metadata.sourceCode = 'return 99;'; f.write('src/example.wf', f.wf);
  const result = f.run({ baseline: 'HEAD' }); assert.equal(result.mode, 'all'); assert.match(result.reasons.join(' '), /no positive test coverage/);
});
test('conversation exclusion requires every step', t => {
  const f = fixture(t); const tc = f.testcase('conversation', [], []);
  delete tc.pathAssertions; tc.conversation = { steps: [f.testcase('first', ['B'], ['A']), f.testcase('second', ['A'], ['B'])] };
  f.write('test/b.json', tc); f.git('add', '.'); f.git('-c', 'user.name=Local Test', '-c', 'user.email=local@example.invalid', 'commit', '-qm', 'conversation');
  f.wf.specification.dataPipeline.pipelineNodes[1].metadata.sourceCode = 'return 3;'; f.write('src/example.wf', f.wf);
  assert.equal(f.run({ baseline: 'HEAD' }).mode, 'all');
});
test('missing path assertions are uncertainty', t => {
  const f = fixture(t); f.write('test/b.json', { testName: 'b', workflow: { workflowCode: 'EXAMPLE' } }); f.git('add', '.'); f.git('-c', 'user.name=Local Test', '-c', 'user.email=local@example.invalid', 'commit', '-qm', 'unknown path');
  f.wf.specification.dataPipeline.pipelineNodes[1].metadata.sourceCode = 'return 4;'; f.write('src/example.wf', f.wf); assert.equal(f.run({ baseline: 'HEAD' }).mode, 'all');
});
test('ignored source dependency and ignored new tests still select all', t => {
  const f = fixture(t); f.write('.gitignore', 'src/extra.bo\ntest/extra.json\n');
  f.git('add', '.'); f.git('-c', 'user.name=Local Test', '-c', 'user.email=local@example.invalid', 'commit', '-qm', 'ignore patterns');
  f.write('src/extra.bo', { code: 'EXTRA' }); assert.equal(f.run({ baseline: 'HEAD' }).mode, 'all');
  fs.unlinkSync(path.join(f.repo, 'src/extra.bo'));
  f.write('test/extra.json', f.testcase('extra', ['A'], [])); assert.equal(f.run({ baseline: 'HEAD' }).mode, 'all');
});
test('staged BO edits select all', t => {
  const f = fixture(t); f.write('src/example.bo', { code: 'CHANGED' }); f.git('add', 'src/example.bo'); assert.equal(f.run().mode, 'all');
});
test('test-directory junction outside repository is blocked', t => {
  const f = fixture(t), outside = fs.mkdtempSync(path.join(os.tmpdir(), 'affected-outside-'));
  t.after(() => fs.rmSync(outside, { recursive: true, force: true }));
  fs.symlinkSync(outside, path.join(f.repo, 'linked-tests'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => f.run({ tests: 'linked-tests' }), /external path/);
});
for (const kind of ['malformed-workflow', 'malformed-test', 'missing-baseline', 'missing-workflow', 'traversal', 'absolute', 'option-ref', 'contradictory-test']) test(kind + ' blocks', t => {
  const f = fixture(t); const opts = {};
  if (kind === 'malformed-workflow') f.write('src/example.wf', '{broken');
  if (kind === 'malformed-test') f.write('test/a.json', '{broken');
  if (kind === 'missing-baseline') opts.baseline = 'does-not-exist';
  if (kind === 'missing-workflow') opts.workflow = 'missing.wf';
  if (kind === 'traversal') opts.tests = '../test';
  if (kind === 'absolute') opts.tests = f.repo;
  if (kind === 'option-ref') opts.baseline = '--help';
  if (kind === 'contradictory-test') f.write('test/a.json', f.testcase('a', ['A'], ['A']));
  assert.throws(() => f.run(opts));
});
