const fs = require('fs');
const cp = require('child_process');
const crypto = require('crypto');
const wt = 'D:/Temp/worktrees/xdx-supplier-workspace-20261014';
const d = 'docs/builds/xdx-checkout-artifact-sync-20261015/';
const basePaths = ['.gitattributes', 'docs/handoffs/ACTIVE_HANDOFF.md', 'docs/lessons/objects/README.md', 'docs/lessons/objects/oracle-fusion-standard-lookups-lov.md', 'scripts/verify-agentic-app-query-contract.cjs', 'scripts/tests/verify-agentic-app-query-contract.cjs', d.slice(0,-1), ...['common26c-openapi.json', 'classification-first-response.json', 'classification-readiness.json', 'classification-saved-functions.txt', 'classification-saved-get.txt'].map(x => 'docs/builds/xdx-supplier-workspace-20261014/' + x)];
const worktreePaths = ['.gitattributes', 'BUILD_STANDARD.md', 'docs/handoffs/ACTIVE_HANDOFF.md', 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md', 'docs/lessons/AI_STUDIO_TESTING_GUIDE.md', 'docs/lessons/objects/README.md', ...['suppliers', 'supplier-addresses', 'supplier-contacts', 'supplier-sites', 'supplier-site-assignments'].map(x => 'docs/lessons/objects/oracle-fusion-procurement-' + x + '.md'), 'scripts/verify-build-learning.cjs', 'scripts/xdx-supplier-e2e.mjs', 'scripts/xdx-supplier-e2e-deck.mjs', 'scripts/xdx_supplier_e2e_journey.mjs', 'docs/builds/xdx-supplier-e2e-evidence-20261015', d.slice(0,-1)];
const summaries = [];
for (const [root, allowed] of [[process.cwd(), basePaths], [wt, worktreePaths]]) {
  const names = () => cp.execFileSync('git', ['diff', '--cached', '--name-only'], {cwd: root, encoding:'utf8'}).trim().split('\n').filter(Boolean);
  const outside = list => list.filter(p => !allowed.some(a => p === a || p.startsWith(a + '/')));
  if (outside(names()).length) throw Error('Unrelated staged content in ' + root);
  cp.execFileSync('git', ['rm', '--cached', '--ignore-unmatch', '--', d+'before/base/.gitattributes', d+'before/worktree/.gitattributes'], {cwd:root, stdio:'pipe'});
  cp.execFileSync('git', ['add', '--', ...allowed], {cwd:root, stdio:'pipe'});
  // Existing cached blobs may retain normalization from the old nested policy.
  cp.execFileSync('git', ['add', '--renormalize', '--', ...allowed], {cwd:root, stdio:'pipe'});
  const selected = names();
  if (outside(selected).length) throw Error('Unscoped staged content');
  const entries = cp.execFileSync('git', ['ls-files', '--stage', '-z'], {cwd:root, encoding:'utf8'}).split('\0').filter(Boolean);
  const blobs = new Map(entries.map(x => {const i=x.indexOf('\t'); return [x.slice(i+1), x.slice(0,i).split(' ')[1]];}));
  for (const p of selected) {
    if (p === '.gitattributes') continue;
    const b = fs.readFileSync(root+'/'+p);
    const blob = crypto.createHash('sha1').update(Buffer.from('blob '+b.length+'\0')).update(b).digest('hex');
    if (blob !== blobs.get(p)) throw Error('Staged bytes differ '+p);
  }
  summaries.push({root, stagedFiles:selected.length, unexpected:[], exactStagedBytes:true});
}
fs.writeFileSync(d+'staging-proof.json', JSON.stringify({observedUtc:new Date().toISOString(), result:'pass', summaries},null,2)+'\n');
console.log(JSON.stringify(summaries,null,2));
