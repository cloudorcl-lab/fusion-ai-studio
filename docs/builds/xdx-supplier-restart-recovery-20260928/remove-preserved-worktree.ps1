$ErrorActionPreference = 'Stop'
$basePath = (Resolve-Path '.').Path
$targetPath = [IO.Path]::GetFullPath((Join-Path $basePath '.worktrees/xdx-supplier-core-rebuild-20260928'))
$archivePath = Join-Path $basePath '.debug/worktree-archives/xdx-supplier-core-rebuild-20260928-stopped'
$recordPath = Join-Path $basePath 'docs/builds/xdx-supplier-restart-recovery-20260928'
$receipt = Get-Content "$recordPath/preservation-receipt.json" -Raw | ConvertFrom-Json
$manifest = Get-Content "$archivePath/manifest.json" -Raw | ConvertFrom-Json
if ($targetPath -ne $receipt.source -or $targetPath -ne $manifest.source -or -not $targetPath.StartsWith($basePath + '\.worktrees\')) { throw 'Target confinement mismatch' }
foreach ($itemPath in @($basePath, (Join-Path $basePath '.worktrees'), $targetPath)) {
  if ((Get-Item -LiteralPath $itemPath -Force).Attributes -band [IO.FileAttributes]::ReparsePoint) { throw 'Reparse path rejected' }
}
$inventory = @(Get-ChildItem -LiteralPath $targetPath -Recurse -Force)
if ($inventory | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }) { throw 'Reparse descendant rejected' }
if ((Get-FileHash "$archivePath/snapshot.zip").Hash.ToLowerInvariant() -ne $receipt.archiveSha256 -or (Get-FileHash "$archivePath/manifest.json").Hash.ToLowerInvariant() -ne $receipt.manifestSha256) { throw 'Archive integrity mismatch' }
$byPath = @{}
foreach ($row in $manifest.files) { $byPath[$row.path] = $row }
foreach ($item in $inventory | Where-Object { -not $_.PSIsContainer }) {
  $relative = [IO.Path]::GetRelativePath($targetPath, $item.FullName).Replace('\','/')
  if ($relative -eq '.git') { continue }
  $expected = if ($relative -eq 'env.properties') { $receipt.configurationSha256 } else { $byPath[$relative].sha256 }
  if (-not $expected -or (Get-FileHash -LiteralPath $item.FullName).Hash.ToLowerInvariant() -ne $expected) { throw "Unpreserved or changed file: $relative" }
}
$branch = git -C $targetPath -c core.excludesFile=.git/info/exclude branch --show-current
if ($branch -ne 'codex/xdx-supplier-core-rebuild-20260928') { throw 'Wrong branch' }
git merge-base --is-ancestor $branch HEAD
if ($LASTEXITCODE -ne 0) { throw 'Unintegrated committed tip' }
$tracked = @(git -C $targetPath -c core.excludesFile=.git/info/exclude ls-files)
$trackedSet = @{}
foreach ($name in $tracked) { $trackedSet[$name] = $true }
$changed = @(git -C $targetPath -c core.excludesFile=.git/info/exclude diff HEAD --name-only)
if ($changed.Count) {
  git -C $targetPath -c core.excludesFile=.git/info/exclude restore --source=HEAD --staged --worktree -- @changed
  if ($LASTEXITCODE -ne 0) { throw 'Scoped archived restore failed' }
}
foreach ($item in $inventory | Where-Object { -not $_.PSIsContainer }) {
  $relative = [IO.Path]::GetRelativePath($targetPath, $item.FullName).Replace('\','/')
  if ($relative -eq '.git' -or $trackedSet.ContainsKey($relative)) { continue }
  if (-not $byPath.ContainsKey($relative) -and $relative -ne 'env.properties') { throw 'Unlisted deletion rejected' }
  Remove-Item -LiteralPath $item.FullName
}
git -c core.excludesFile=.git/info/exclude worktree remove $targetPath
if ($LASTEXITCODE -ne 0) { throw 'Normal worktree removal failed' }
git -c core.excludesFile=.git/info/exclude branch -d $branch
if ($LASTEXITCODE -ne 0) { throw 'Normal branch removal failed' }
$registered = git worktree list --porcelain
if ((Test-Path -LiteralPath $targetPath) -or ($registered -match 'worktree .*xdx-supplier-core-rebuild-20260928')) { throw 'Worktree remains' }
git show-ref --verify --quiet "refs/heads/$branch"
if ($LASTEXITCODE -eq 0) { throw 'Branch remains' }
@{ status='PASS'; observedUtc=[DateTime]::UtcNow.ToString('o'); target=$targetPath; branch=$branch; preservation=$receipt.archiveSha256; method='Hash-verified exact files, scoped restore, normal worktree remove, non-force branch delete'; businessRecordsDeleted=0 } | ConvertTo-Json | Set-Content "$recordPath/local-purge-result.json"
Write-Output 'Local worktree and branch purge PASS; preserved archive retained.'
