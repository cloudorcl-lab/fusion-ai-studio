import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const sourcePath=path.resolve('scripts/xdx-supplier-e2e-deck.mjs');
await fs.access(sourcePath);
const { captureSlideTitle, buildSlidePlan }=await import(pathToFileURL(sourcePath).href);
const run='docs/builds/xdx-supplier-e2e-evidence-20261015';
const input=JSON.parse(await fs.readFile(`${run}/results.json`,'utf8'));
const ledger=JSON.parse(await fs.readFile(`${run}/failure-ledger.json`,'utf8'));
const expected={
 'address-query/result':'Address query in progress',
 'address-direct/draft-ready':'Address preparation in progress',
 'address-direct/review-ready':'Address review in progress',
 'address-direct/created-readback':'Address confirmation in progress',
 'contact-template/draft-ready':'Contact template preparation failed'
};
const checks=[];
for(const [key,title] of Object.entries(expected)){
 const [stepId,stage]=key.split('/'); const step=input.steps.find(s=>s.id===stepId); const capture=step.captures.find(c=>c.stage===stage);
 assert.equal(captureSlideTitle(step,capture),title); checks.push({key,title,passed:true});
}
const plan=buildSlidePlan(input,`${run}/results.json`,ledger.failures);
assert.equal(plan.filter(s=>s.kind==='capture').length,62);
for(const id of ['F010','F011']) {const item=plan.find(s=>s.finding?.id===id);assert.equal(item.applicationFinding,true);assert.equal(item.title,`Application finding: ${id}`);checks.push({key:id,passed:true,classification:'Application failure, no repair claim'});}
const source='scripts/xdx-supplier-e2e-deck.mjs';
const report={schemaVersion:1,kind:'Actual caption function qualification, no UI or business test',observedUtc:new Date().toISOString(),source:{path:source,sha256:createHash('sha256').update(await fs.readFile(source)).digest('hex')},checks,captureCount:62,result:'PASS'};
await fs.writeFile(`${run}/deck-caption-qualification.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
