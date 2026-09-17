const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const {spawnSync} = require('node:child_process');
const repo = path.resolve(__dirname, '..');
const cli = path.join(repo, '.agents/skills/aistudio/scripts/aistudio.js');
const code = fs.readFileSync(cli, 'utf8');
// Exercise the shipped input guard without starting its authenticated fetch path.
const legacyStart = code.indexOf('function $A(');
const start = legacyStart >= 0 ? legacyStart : code.indexOf('function f0('), end = code.indexOf('function Nn(', start);
assert(start > 0 && end > start, 'Shipped BO validation functions not found; update test seam after CLI replacement.');
const context = vm.createContext({Lp: fn => fn.parameterDefinitions});
vm.runInContext(code.slice(start, end), context);
const fn = {parameterDefinitions:[{name:'Supplier'},{name:'SupplierType'},{name:'SupplierTypeCode'}]};
assert.doesNotThrow(()=>context.X4(fn,{Supplier:'XDX Lee Supplies',SupplierType:'Supplier',SupplierTypeCode:'SUPPLIER'}),'Real lookup values must not be classified by matching another parameter name.');
for(const value of ['<SupplierType>','{SupplierType}','${SupplierType}','TODO','replace-me']){
 assert.throws(()=>context.X4(fn,{SupplierType:value}),/illustrative/,'Explicit placeholders must remain rejected.');
}
const dir = fs.mkdtempSync(path.join(os.tmpdir(),'xdx-bo-real-values-'));
try {
 const file = path.join(dir,'xdx_supplier_information.bo'), argsFile=path.join(dir,'args.json');
 fs.copyFileSync(path.join(repo,'src/businessObjects/xdx_supplier_information.bo'),file);
 const run=args=>{
  fs.writeFileSync(argsFile,JSON.stringify(args));
  const p=spawnSync(process.execPath,['--disable-warning=MODULE_TYPELESS_PACKAGE_JSON',cli,'do-modify-bo-function-example','--file',file,'--args','@'+argsFile],{cwd:repo,encoding:'utf8'});
  const output=p.stdout+'\n'+p.stderr;
  return {status:p.status,output};
 };
 const payload={Supplier:'XDX Lee Supplies',SupplierType:'Supplier',SupplierTypeCode:'SUPPLIER'};
 const good=run({functionName:'CreateSupplier',exampleIndex:1,patch:{description:'Real source-backed lookup values regression.',payload:JSON.stringify(payload)}});
 assert.equal(good.status,0,good.output);
 const stored=JSON.parse(fs.readFileSync(file)).objectProperties.tools.find(f=>f.name==='CreateSupplier').sampleQueries[0].query;
 assert.deepEqual(stored,payload);
 const baseline=fs.readFileSync(file,'utf8');
 const bad=run({functionName:'CreateSupplier',exampleIndex:1,patch:{description:'Reject unresolved token.',payload:JSON.stringify({...payload,SupplierType:'<SupplierType>'})}});
 assert.notEqual(bad.status,0,bad.output);
 assert.match(bad.output,/Placeholder-like/);
 assert.equal(fs.readFileSync(file,'utf8'),baseline,'Rejected example must not mutate the artifact.');
 console.log('BO real lookup values: PASS (fetch guard, real CLI example write, placeholder rejection, unchanged file on failure).');
} finally {
 assert(path.resolve(dir).startsWith(path.resolve(os.tmpdir())+path.sep),'Cleanup must stay inside the test temporary directory root.');
 fs.rmSync(dir,{recursive:true,force:true});
}
