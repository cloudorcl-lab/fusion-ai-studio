'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=process.cwd(), base='docs/builds/xdx-supplier-core-reset-20260929/evidence';
const targets=[['app','XDX_SUPPLIER_CORE'],['workflow','XDX_SUPPLIER_CORE'],...['SUPPLIERS','ADDRESSES','CONTACTS','SITES','PROCUREMENT_BUSINESS_UNITS'].map(x=>['bo','XDX_SUPPLIER_CORE_'+x])];
const results=[];
for(const [kind,code] of targets){
 const dir=path.join(base,'exact-readback',kind+'-'+code); fs.mkdirSync(dir,{recursive:true});
 const args=['.agents/skills/aistudio/scripts/aistudio.js','do-fetch-'+kind,'--code',code,'--dir',dir,...(kind==='bo'?[]:['--status','DRAFT'])];
 const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',timeout:120000});
 const out=(r.stdout||'')+(r.stderr||''); fs.writeFileSync(path.join(dir,'result.txt'),out);
 const absence=/not found|could not find|no .*found|does not exist/i.test(out)&&!r.error;
 results.push({kind,code,observedUtc:new Date().toISOString(),exitCode:r.status,absenceResponse:absence,evidence:path.join(dir,'result.txt').replaceAll('\\','/')});
 console.log(JSON.stringify(results.at(-1)));
 if(!absence) break;
}
fs.writeFileSync(path.join(base,'exact-readback.json'),JSON.stringify({results,nativeCorroboration:['app-absent.txt','workflow-absent.txt','all-bos-absent.txt'],complete:results.length===7&&results.every(x=>x.absenceResponse)},null,2)+'\n');
process.exitCode=results.length===7&&results.every(x=>x.absenceResponse)?0:1;
