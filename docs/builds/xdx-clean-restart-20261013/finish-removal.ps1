$ErrorActionPreference='Stop'
$record='docs/builds/xdx-clean-restart-20261013'
. "$record/path-contract.ps1"
$root=(Resolve-Path '.').Path
$preserved=Get-Content -Raw "$record/evidence/preservation.json"|ConvertFrom-Json
$archive=$preserved.archive
$plan=Get-Content -Raw (Join-Path $archive 'plan.json')|ConvertFrom-Json
if($plan.root -ne $root -or (& git rev-parse HEAD).Trim() -ne $plan.baseHead){throw 'Base identity drift'}
if((Get-FileHash -LiteralPath (Join-Path $archive 'history.bundle')).Hash.ToLowerInvariant() -ne $preserved.bundleSha256){throw 'Bundle drift'}
$remaining=@(& git worktree list --porcelain | Where-Object {$_ -like 'worktree *'})
if($remaining.Count -ne 1 -or [IO.Path]::GetFullPath(($remaining[0] -split ' ',2)[1]) -ne $root){throw 'Unexpected registration'}
foreach($w in $plan.worktrees){if(Test-Path -LiteralPath $w.worktree){throw 'Physical linked worktree remains'}}
$baseFiles=Get-Content -Raw (Join-Path $archive 'base-files.json')|ConvertFrom-Json
function Assert-Target([string]$relative){
 $p=[IO.Path]::GetFullPath((Join-Path $root $relative))
 if(-not $p.StartsWith($root+'\',[StringComparison]::OrdinalIgnoreCase) -or $p -eq $root -or $relative -match '^(\.git(/|$)|\.agents(/|$)|aiapps(/|$)|env\.properties$)' -or $relative.StartsWith($record)){throw 'Unsafe base target'}
 return $p
}
foreach($relative in $plan.targets){
 $p=Assert-Target $relative
 foreach($f in $baseFiles | Where-Object {$_.path -eq $relative -or $_.path.StartsWith($relative+'/')}){
  if((Get-FileHash -LiteralPath (Join-Path $root $f.path)).Hash.ToLowerInvariant() -ne $f.sha256){throw 'Retirement source drift'}
 }
 if(@(Get-RetirementReparsePoints $p).Count){throw 'Target reparse point'}
}
foreach($b in $plan.branches){
 if((& git rev-parse $b.ref).Trim() -ne $b.tip){throw 'Local ref drift'}
 & git update-ref -d $b.ref $b.tip
 if($LASTEXITCODE -ne 0){throw 'Expected-tip local ref deletion failed'}
}
foreach($relative in $plan.targets){
 $p=Assert-Target $relative
 $item=Get-Item -LiteralPath $p -Force
 if($item.PSIsContainer){Get-ChildItem -LiteralPath $p -Recurse -Force | ForEach-Object {$_.Attributes=$_.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)}}
 $item.Attributes=$item.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)
 Remove-Item -LiteralPath $p -Recurse -Force
 if(Test-Path -LiteralPath $p){throw 'Target remains'}
}
$container=Join-Path $root '.worktrees'
if((Test-Path -LiteralPath $container) -and @(Get-ChildItem -LiteralPath $container -Force).Count -eq 0){(Get-Item $container -Force).Attributes=[IO.FileAttributes]::Directory;Remove-Item -LiteralPath $container -Force}
$r=[ordered]@{ok=$true;linkedWorktreesRemoved=@($plan.worktrees).Count;localAttemptRefsRemoved=@($plan.branches).Count;baseTargetsRemoved=@($plan.targets).Count;remainingRegisteredCheckouts=1;archive=$archive;observedUtc=[DateTime]::UtcNow.ToString('o');tenantChanged=$false;remoteRefsChanged=$false;configurationChanged=$false}
$r|ConvertTo-Json|Set-Content "$record/evidence/removal.json"
$r|ConvertTo-Json
