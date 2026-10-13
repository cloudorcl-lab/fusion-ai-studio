$ErrorActionPreference='Stop'
$base='docs/builds/xdx-clean-restart-20261013'
. "$base/path-contract.ps1"
$archive=(Get-Content -Raw "$base/evidence/preservation.json"|ConvertFrom-Json).archive
$plan=Get-Content -Raw (Join-Path $archive 'plan.json')|ConvertFrom-Json
$root=(Resolve-Path '.').Path
$registered=@(& git worktree list --porcelain | Where-Object {$_ -like 'worktree *'})
if($registered.Count -ne 1){throw 'Unexpected registered worktree'}
$i=0;$checked=0;$readonly=0
foreach($w in $plan.worktrees){
 $i++;$p=(Resolve-Path -LiteralPath $w.worktree).Path
 if(-not $p.StartsWith((Join-Path $root '.worktrees')+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Residual outside exact boundary'}
 if(@(Get-RetirementReparsePoints $p).Count){throw 'Residual reparse point'}
 $manifest=Get-Content -Raw (Join-Path $archive "linked-$i-files.json")|ConvertFrom-Json
 $byPath=@{};foreach($f in $manifest){$byPath[$f.path]=$f.sha256}
 foreach($f in Get-ChildItem -LiteralPath $p -Recurse -Force -File){
  $rel=[IO.Path]::GetRelativePath($p,$f.FullName).Replace('\','/')
  if(-not $byPath.ContainsKey($rel) -or (Get-FileHash -LiteralPath $f.FullName).Hash.ToLowerInvariant() -ne $byPath[$rel]){throw 'Residual not independently preserved'}
  $checked++
 }
 $readonly+=@(Get-ChildItem -LiteralPath $p -Recurse -Force -Directory | Where-Object {($_.Attributes -band [IO.FileAttributes]::ReadOnly) -ne 0}).Count
 $pointer=[IO.File]::ReadAllText((Join-Path $archive "linked-$i/.git")).Trim()
 if(-not $pointer.StartsWith('gitdir: ')){throw 'No captured actual administrative path'}
 $admin=[IO.Path]::GetFullPath($pointer.Substring(8))
 if(-not $admin.StartsWith((Join-Path $root '.git/worktrees')+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Unsafe administrative residual'}
 if(Test-Path -LiteralPath $admin){if(@(Get-RetirementReparsePoints $admin).Count){throw 'Administrative reparse point'}}
}
$r=[ordered]@{ok=$true;remainingFilesMatchArchive=$checked;readonlyDirectories=$readonly;registeredLinkedWorktrees=0;administrativePathFromPreservedPointer=$true;noRemovalPerformed=$true;observedUtc=[DateTime]::UtcNow.ToString('o')}
$r|ConvertTo-Json|Set-Content "$base/evidence/residual-preflight.json"
$r|ConvertTo-Json
