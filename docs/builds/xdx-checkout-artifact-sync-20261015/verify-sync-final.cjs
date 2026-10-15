const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');
const wt = 'D:/Temp/worktrees/xdx-supplier-workspace-20261014';
const d = 'docs/builds/xdx-checkout-artifact-sync-20261015/';
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const manifest = JSON.parse(fs.readFileSync(d + 'sync-manifest.json'));
let verified = 0;
for (const row of manifest.copied) {
  // The manifest retains the copy-time master; current masters are checked below.
  if (row.path === 'docs/handoffs/ACTIVE_HANDOFF.md') continue;
  if (hash(row.to + '/' + row.path) !== row.sha256) throw Error('Changed copied evidence ' + row.path);
  verified++;
}
for (const p of ['scripts/verify-agentic-app-query-contract.cjs', 'scripts/tests/verify-agentic-app-query-contract.cjs', 'scripts/verify-build-learning.cjs', 'docs/handoffs/ACTIVE_HANDOFF.md']) {
  if (hash(p) !== hash(wt + '/' + p)) throw Error('Shared mismatch ' + p);
}
const qualification = JSON.parse(fs.readFileSync('docs/builds/xdx-supplier-child-create-20261015/governance-qualification.json'));
if (hash(qualification.source.path) !== qualification.source.sha256 || hash(qualification.test.path) !== qualification.test.sha256) throw Error('Retained validator proof stale');
for (const row of JSON.parse(fs.readFileSync(d + 'before-manifest.json'))) {
  if (row.preserveOnly) {
    const root = row.side === 'base' ? process.cwd() : wt;
    if (hash(root + '/' + row.path) !== row.sha256) throw Error('Preserved source/config changed ' + row.path);
  } else if (hash(row.backup) !== row.sha256) throw Error('Backup changed ' + row.backup);
}
const docs = ['BUILD_STANDARD.md', 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md', 'docs/lessons/AI_STUDIO_TESTING_GUIDE.md', 'docs/lessons/objects/README.md', 'docs/lessons/objects/oracle-fusion-standard-lookups-lov.md', ...['suppliers', 'supplier-addresses', 'supplier-contacts', 'supplier-sites', 'supplier-site-assignments'].map(x => 'docs/lessons/objects/oracle-fusion-procurement-' + x + '.md')];
let links = 0;
for (const root of [process.cwd(), wt]) {
  for (const p of docs) {
    const s = fs.readFileSync(root + '/' + p, 'utf8');
    if ((s.match(/^\s*```/gm) || []).length % 2) throw Error('Fence mismatch ' + p);
    for (const match of s.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      const target = match[1].replace(/^<|>$/g, '').split('#')[0];
      if (!target || /^(?:https?:|mailto:|app:)/i.test(target) || target.includes('<')) continue;
      if (!fs.existsSync(path.resolve(root, path.dirname(p), target))) throw Error('Missing doc link ' + root + '/' + p + ' -> ' + target);
      links++;
    }
  }
}
const productDelta = cp.execFileSync('git', ['diff', '--name-only', 'HEAD', '--', 'src', 'test', 'tests/xdx-'], {cwd: wt, encoding: 'utf8'}).trim();
if (productDelta) throw Error('Product source delta ' + productDelta);
const proof = {
  observedUtc: new Date().toISOString(), result: 'pass', transfersVerified: verified,
  mutableMasterCheck: 'Current masters match exactly; original transfer hash remains historical',
  linksVerified: links,
  retainedValidatorQualification: 'Exact source/test hashes current; reuse existing 45 cases plus 7 SET_FIELDS assertions; no test rerun',
  preservation: 'Before-copy hashes, source app/workflow and active configs unchanged; colliding bytes preserved',
  productDelta,
  reviewReports: [d + 'validator-review.json', d + 'docs-review.json'],
  pptSha256: hash('docs/builds/xdx-supplier-e2e-evidence-20261015/deliverables/xdx_supplier_workflow_evidence.pptx')
};
fs.writeFileSync(d + 'verification.json', JSON.stringify(proof, null, 2) + '\n');
console.log(JSON.stringify(proof, null, 2));
