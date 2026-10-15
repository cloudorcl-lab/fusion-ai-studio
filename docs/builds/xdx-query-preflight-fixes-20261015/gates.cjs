'use strict';
const fs=require('node:fs'),cp=require('node:child_process'),path=require('node:path');
const id='xdx-query-preflight-fixes-20261015',dir=__dirname,label=process.argv[2]||'closeout';
const results=[];
for(const suffix of ['-tests','-implementation','-review','']){
 const session=id+suffix,args=['-NoProfile','-File','scripts/verify-living-build-contract.ps1','-SessionRecord','docs/builds/'+id+'/xdx_session_'+session+'.json','-SessionId',session,'-Phase','Closeout'];
 const r=cp.spawnSync('pwsh',args,{encoding:'utf8',timeout:30000,windowsHide:true});
 fs.writeFileSync(path.join(dir,label+(suffix||'-root')+'.output.txt'),(r.stdout||'')+(r.stderr||''));
 results.push({session,exitCode:r.status,error:r.error?.message||null});if(r.status!==0)break;
}
fs.writeFileSync(path.join(dir,label+'.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify(results,null,2));process.exitCode=results.length===4&&results.every(r=>r.exitCode===0)?0:1;
