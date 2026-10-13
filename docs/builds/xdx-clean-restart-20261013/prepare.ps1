$ErrorActionPreference = 'Stop'
$root = (Resolve-Path '.').Path
$record = 'docs/builds/xdx-clean-restart-20261013'
if ((& git branch --show-current).Trim() -ne 'TestingWFBuildTools') { throw 'Unexpected surviving branch' }
if ((& git rev-parse HEAD).Trim() -ne '95859610d5972a820bc6473a8c3c37a78cb3a660') { throw 'Base HEAD drift' }
$archiveParent = 'C:\Users\dasu\Documents\CodexArchives'
$archive = Join-Path $archiveParent ('fusion-ai-studio-clean-restart-' + [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss'))
if ([IO.Path]::GetFullPath($archive).StartsWith($root + '\',[StringComparison]::OrdinalIgnoreCase)) { throw 'Archive must be independent' }
if (Test-Path -LiteralPath $archive) { throw 'Archive collision' }
New-Item -ItemType Directory -Path $archive -Force | Out-Null
& git status --porcelain=v1 | Set-Content -LiteralPath (Join-Path $archive 'root-status.txt')
& git worktree list --porcelain | Set-Content -LiteralPath (Join-Path $archive 'worktrees-before.txt')
& git for-each-ref --format='%(refname) %(objectname)' | Set-Content -LiteralPath (Join-Path $archive 'refs-before.txt')
$rows = @(); $row = @{}
foreach ($line in & git worktree list --porcelain) {
  if ([string]::IsNullOrEmpty($line)) { if ($row.Count) { $rows += [pscustomobject]$row; $row=@{} }; continue }
  $parts=$line -split ' ',2; $row[$parts[0]]=$parts[1]
}
if ($row.Count) { $rows += [pscustomobject]$row }
$linked = @($rows | Where-Object { [IO.Path]::GetFullPath($_.worktree) -ne $root })
$boundary = Join-Path $root '.worktrees'
foreach ($w in $linked) {
  $physical=(Resolve-Path -LiteralPath $w.worktree).Path
  if (-not $physical.StartsWith($boundary+'\',[StringComparison]::OrdinalIgnoreCase) -or $physical -eq $root) { throw 'Worktree outside exact approved boundary' }
  if ((& git -C $physical rev-parse HEAD).Trim() -ne $w.HEAD) { throw 'Linked HEAD drift' }
}
$branches=@(& git for-each-ref --format='%(refname) %(objectname)' refs/heads | ForEach-Object { $v=$_ -split ' ',2; if ($v[0] -like 'refs/heads/codex/xdx-*') { [pscustomobject]@{ref=$v[0];tip=$v[1]} } })
$targets=@('src','test','temp','.debug','test-reports','.playwright-mcp','docs/attempts','docs/installations','docs/assets','ATTEMPTS.md','docs/TODO.md','scripts/tests/xdx-supplier-lifecycle','tests/test-bo-example-purpose.cjs','tests/test-bo-real-lookup-values.cjs')
$targets += @(Get-ChildItem -LiteralPath (Join-Path $root 'tests') -File | Where-Object Name -like 'test-xdx-supplier-*' | ForEach-Object { [IO.Path]::GetRelativePath($root,$_.FullName).Replace('\','/') })
$targets += @(Get-ChildItem -LiteralPath (Join-Path $root 'docs/builds') -Directory | Where-Object Name -ne 'xdx-clean-restart-20261013' | ForEach-Object { [IO.Path]::GetRelativePath($root,$_.FullName).Replace('\','/') })
$targets = @($targets | Where-Object { Test-Path -LiteralPath (Join-Path $root $_) } | Sort-Object -Unique)
$plan=[ordered]@{schemaVersion=1;root=$root;baseHead=(& git rev-parse HEAD).Trim();archive=$archive;worktrees=$linked;branches=$branches;targets=$targets;preparedUtc=[DateTime]::UtcNow.ToString('o');authority='User requested purge of worktrees/references and custom supplier artifacts/tests/build history; no remote or tenant changes.'}
$plan | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $archive 'plan.json')
Add-Type -TypeDefinition @'
using System; using System.IO; using System.Collections.Generic; using System.Security.Cryptography; using System.Text.Json;
public class PreservedFile { public string path {get;set;} public long bytes {get;set;} public string sha256 {get;set;} }
public static class RestartPreservation {
  static string Hash(string p) { using(var f=File.OpenRead(p)) using(var h=SHA256.Create()) return Convert.ToHexString(h.ComputeHash(f)).ToLowerInvariant(); }
  static void Walk(string root,string dir,string dest,List<PreservedFile> rows,bool baseCopy) {
    foreach(var item in Directory.EnumerateFileSystemEntries(dir)) {
      var relative=Path.GetRelativePath(root,item).Replace('\\','/');
      if(baseCopy && (relative==".git" || relative==".worktrees")) continue;
      var attr=File.GetAttributes(item); if((attr&FileAttributes.ReparsePoint)!=0) throw new Exception("Reparse point blocks preservation");
      var target=Path.Combine(dest,relative);
      if((attr&FileAttributes.Directory)!=0) {Directory.CreateDirectory(target); Walk(root,item,dest,rows,baseCopy);}
      else {Directory.CreateDirectory(Path.GetDirectoryName(target));File.Copy(item,target,false);rows.Add(new PreservedFile {path=relative,bytes=new FileInfo(item).Length,sha256=Hash(item)});}
    }
  }
  public static PreservedFile[] Copy(string root,string dest,string manifest,bool baseCopy) {
    Directory.CreateDirectory(dest);var rows=new List<PreservedFile>();Walk(root,root,dest,rows,baseCopy);
    foreach(var r in rows) if(Hash(Path.Combine(dest,r.path))!=r.sha256 || Hash(Path.Combine(root,r.path))!=r.sha256) throw new Exception("Preservation hash mismatch");
    File.WriteAllText(manifest,JsonSerializer.Serialize(rows,new JsonSerializerOptions{WriteIndented=true}));return rows.ToArray();
  }
}
'@
$baseFiles=[RestartPreservation]::Copy($root,(Join-Path $archive 'base'),(Join-Path $archive 'base-files.json'),$true)
$total=$baseFiles.Count;$index=0
foreach($w in $linked) { $index++; $files=[RestartPreservation]::Copy($w.worktree,(Join-Path $archive "linked-$index"),(Join-Path $archive "linked-$index-files.json"),$false); $total+=$files.Count }
$bundle=Join-Path $archive 'history.bundle'
& git bundle create $bundle --all
if($LASTEXITCODE -ne 0) {throw 'Bundle create failed'}
& git bundle verify $bundle 2>&1 | Set-Content -LiteralPath (Join-Path $archive 'bundle-verification.txt')
if($LASTEXITCODE -ne 0) {throw 'Bundle verify failed'}
$bundleHeads=@(& git bundle list-heads $bundle)
foreach($b in $branches){ if(-not ($bundleHeads -contains "$($b.tip) $($b.ref)")) {throw 'Attempt branch missing from bundle'} }
$receipt=[ordered]@{ok=$true;archive=$archive;files=$total;linkedWorktrees=$linked.Count;localAttemptBranches=$branches.Count;retirementTargets=$targets.Count;bundleSha256=(Get-FileHash -LiteralPath $bundle).Hash.ToLowerInvariant();baseManifestSha256=(Get-FileHash -LiteralPath (Join-Path $archive 'base-files.json')).Hash.ToLowerInvariant();verifiedUtc=[DateTime]::UtcNow.ToString('o');privacy='Private external archive contains configuration; do not stage/publish it';restoration='File and full Git-history preservation verified; restore not exercised'}
$receipt | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath "$record/evidence/preservation.json"
$receipt | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $archive 'preservation.json')
$receipt | ConvertTo-Json -Depth 5
