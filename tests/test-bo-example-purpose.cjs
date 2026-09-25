// Local guidance only: never fetches a sample or executes POST.
const {spawnSync}=require('node:child_process');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const input={Supplier:'XDX OFFLINE PURPOSE FIXTURE',BusinessRelationship:'SPEND_AUTHORIZED',TaxOrganizationType:'Corporation'};
function guidance(extra={}) {
  const proc=spawnSync(process.execPath,['.agents/skills/aistudio/scripts/aistudio.js','get-bo-function-example-guidance','--file','src/businessObjects/xdx_supplier_core_data_20260924.bo','--args',JSON.stringify({functionName:'create_suppliers',currentSampleInputValues:input,...extra})],{cwd:root,encoding:'utf8'});
  assert.equal(proc.status,0,proc.stderr);
  const response=JSON.parse(proc.stdout);assert.equal(response.ok,true,proc.stdout);return response.result;
}
const implicit=guidance();assert.equal(implicit.exampleMode,'payload');assert.equal(implicit.readyToFetch,false);assert.equal(implicit.missingRequiredInputs.length,0);
const request=guidance({examplePurpose:'request'});assert.equal(request.exampleMode,'payload');assert.equal(request.readyToFetch,false);
const response=guidance({examplePurpose:'response'});assert.equal(response.exampleMode,'fetchResponse');assert.equal(response.readyToFetch,true);assert.deepEqual(response.currentSampleInputValues,input);
const missing=guidance({examplePurpose:'response',currentSampleInputValues:{}});assert.equal(missing.readyToFetch,false);assert.equal(missing.missingRequiredInputs.length,3);
const conflict=guidance({examplePurpose:'response',conflictingInputs:[{name:'Supplier',modelValue:'A',parsedValue:'B'}]});assert.equal(conflict.readyToFetch,false);assert.equal(conflict.conflictingInputs.length,1);
console.log('BO example purpose: PASS (implicit/request/response/missing/conflicting; no tenant calls)');
