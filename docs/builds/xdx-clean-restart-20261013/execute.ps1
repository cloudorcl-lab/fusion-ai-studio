$ErrorActionPreference = 'Stop'
$record = 'docs/builds/xdx-clean-restart-20261013'
. "$record/path-contract.ps1"
$root = (Resolve-Path '.').Path
$preserved = Get-Content -Raw -LiteralPath "$record/evidence/preservation.json" | ConvertFrom-Json
if (-not $preserved.ok) { throw 'Preservation not verified' }
$archive = $preserved.archive
$plan = Get-Content -Raw -LiteralPath (Join-Path $archive 'plan.json') | ConvertFrom-Json -Depth 30
if ($plan.root -ne $root -or (& git rev-parse HEAD).Trim() -ne $plan.baseHead) { throw 'Base identity drift' }
if ((Get-FileHash -LiteralPath (Join-Path $archive 'history.bundle')).Hash.ToLowerInvariant() -ne $preserved.bundleSha256) { throw 'Bundle drift' }
$baseFiles = Get-Content -Raw -LiteralPath (Join-Path $archive 'base-files.json') | ConvertFrom-Json
function Assert-Target([string]$relative) {
  $p=[IO.Path]::GetFullPath((Join-Path $root $relative))
  if (-not $p.StartsWith($root+'\',[StringComparison]::OrdinalIgnoreCase) -or $p -eq $root -or $relative -match '^(\.git(/|$)|\.agents(/|$)|aiapps(/|$)|env\.properties$)' -or $relative.StartsWith($record)) { throw 'Unsafe base retirement target' }
  return $p
}
foreach($relative in $plan.targets) {
  $p=Assert-Target $relative
  foreach($f in $baseFiles | Where-Object { $_.path -eq $relative -or $_.path.StartsWith($relative+'/') }) {
    if ((Get-FileHash -LiteralPath (Join-Path $root $f.path)).Hash.ToLowerInvariant() -ne $f.sha256) { throw 'Retirement source drift' }
  }
  if (@(Get-RetirementReparsePoints $p).Count) { throw 'Reparse point blocks removal' }
}
$index=0
foreach($w in $plan.worktrees) {
  $index++;$p=(Resolve-Path -LiteralPath $w.worktree).Path;$boundary=Join-Path $root '.worktrees'
  if (-not $p.StartsWith($boundary+'\',[StringComparison]::OrdinalIgnoreCase)) { throw 'Worktree confinement failed' }
  if ((& git -C $p rev-parse HEAD).Trim() -ne $w.HEAD) { throw 'Linked HEAD drift' }
  $manifest=Get-Content -Raw -LiteralPath (Join-Path $archive "linked-$index-files.json") | ConvertFrom-Json
  foreach($f in $manifest) { if((Get-FileHash -LiteralPath (Join-Path $p $f.path)).Hash.ToLowerInvariant() -ne $f.sha256) {throw 'Linked source drift'} }
  if(@(Get-ChildItem -LiteralPath $p -Recurse -Force -File).Count -ne $manifest.Count){throw 'Linked inventory drift'}
  # Exact dirty checkout retirement is explicitly authorized; preservation is already verified.
  & git worktree remove --force $p
  if($LASTEXITCODE -ne 0){throw 'Exact worktree removal failed; inspect retained archive and actual state before recovery'}
  if(Test-Path -LiteralPath $p){
    if([IO.Path]::GetFullPath($p).StartsWith($boundary+'\',[StringComparison]::OrdinalIgnoreCase)){
      Get-ChildItem -LiteralPath $p -Recurse -Force | ForEach-Object { $_.Attributes=$_.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly) }
      (Get-Item -LiteralPath $p -Force).Attributes=(Get-Item -LiteralPath $p -Force).Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)
      Remove-Item -LiteralPath $p -Recurse -Force
    }
  }
  if(Test-Path -LiteralPath $p){throw 'Physical worktree remains'}
}
$remaining=@(& git worktree list --porcelain | Where-Object {$_ -like 'worktree *'})
if($remaining.Count -ne 1 -or [IO.Path]::GetFullPath(($remaining[0] -split ' ',2)[1]) -ne $root){throw 'Unexpected remaining registration'}
foreach($b in $plan.branches) {
  if(((& git rev-parse $b.ref).Trim()) -ne $b.tip){throw 'Retired local ref drift'}
  # Compare-and-delete the captured local ref; do not mutate remote refs or stashes.
  & git update-ref -d $b.ref $b.tip
  if($LASTEXITCODE -ne 0){throw 'Expected-tip local ref deletion failed'}
}
foreach($relative in $plan.targets){
  $p=Assert-Target $relative
  if(Test-Path -LiteralPath $p){
    $item=Get-Item -LiteralPath $p -Force
    if($item.PSIsContainer){Get-ChildItem -LiteralPath $p -Recurse -Force | ForEach-Object {$_.Attributes=$_.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)}}
    $item.Attributes=$item.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)
    Remove-Item -LiteralPath $p -Recurse -Force
  }
  if(Test-Path -LiteralPath $p){throw 'Base target remains'}
}
$container=Join-Path $root '.worktrees'
if((Test-Path -LiteralPath $container) -and @(Get-ChildItem -LiteralPath $container -Force).Count -eq 0){Remove-Item -LiteralPath $container -Force}
$receipt=[ordered]@{ok=$true;linkedWorktreesRemoved=@($plan.worktrees).Count;localAttemptRefsRemoved=@($plan.branches).Count;baseTargetsRemoved=@($plan.targets).Count;remainingRegisteredCheckouts=$remaining.Count;archive=$archive;observedUtc=[DateTime]::UtcNow.ToString('o');tenantChanged=$false;remoteRefsChanged=$false;configurationChanged=$false}
$receipt | ConvertTo-Json | Set-Content -LiteralPath "$record/evidence/removal.json"
$receipt | ConvertTo-Json
