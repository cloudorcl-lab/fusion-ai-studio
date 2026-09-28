$ErrorActionPreference = 'Stop'
$base = (Resolve-Path '.').Path
$recordDir = Join-Path $base 'docs/builds/xdx-supplier-worktree-retirement-20260928'
$receipt = Get-Content (Join-Path $recordDir 'preservation.json') -Raw | ConvertFrom-Json
$expected = [IO.Path]::GetFullPath((Join-Path $base '.worktrees/xdx-supplier-core-rebuild-20260926'))
$target = (Resolve-Path -LiteralPath $receipt.target).Path
if ($target -ne $expected -or $target -eq $base) { throw 'Exact target confinement failed' }
if ($receipt.status -ne 'passed') { throw 'Archive not verified' }
if ((Get-FileHash -LiteralPath $receipt.archivePath -Algorithm SHA256).Hash.ToLower() -ne $receipt.archiveSha256) { throw 'Archive drift' }
if ((Get-FileHash -LiteralPath $receipt.manifestPath -Algorithm SHA256).Hash.ToLower() -ne $receipt.manifestSha256) { throw 'Manifest drift' }
$inputPath = Join-Path (Split-Path -Parent $receipt.archivePath) 'cleanup-inputs.json'
$inventory = Get-Content -LiteralPath $inputPath -Raw | ConvertFrom-Json
if ($inventory.target -ne $target -or $inventory.head -ne $receipt.head) { throw 'Cleanup inventory mismatch' }
if ((& git -C $target rev-parse HEAD).Trim() -ne $receipt.head) { throw 'Target HEAD drift' }
if ((& git rev-parse refs/heads/codex/xdx-supplier-core-rebuild-20260926).Trim() -ne $receipt.head) { throw 'Preserved branch drift' }
if ((Get-FileHash -LiteralPath (Join-Path $base 'env.properties') -Algorithm SHA256).Hash.ToLower() -ne $inventory.baseEnvSha256) { throw 'Base configuration drift' }
$all = @(Get-ChildItem -LiteralPath $target -Force -Recurse)
if (((Get-Item -LiteralPath $target).Attributes -band [IO.FileAttributes]::ReparsePoint) -or @($all | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count) { throw 'Reparse point blocks cleanup' }
$files = @($all | Where-Object { -not $_.PSIsContainer })
$manifest = @(Get-Content -LiteralPath $receipt.manifestPath -Raw | ConvertFrom-Json)
if ($files.Count -ne $manifest.Count) { throw 'Source file inventory drift' }
$map = @{}
foreach ($row in $manifest) {
  $full = [IO.Path]::GetFullPath((Join-Path $target $row.path))
  if (-not $full.StartsWith($target + [IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Manifest escape' }
  if ((Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash.ToLower() -ne $row.sha256) { throw 'Source changed after archive' }
  $map[$row.path] = $row
}
# The user authorized removing this worktree. Every discarded working-tree byte
# has just been checked against its verified independent archive. Remove exact
# extra files only, and restore only the archived tracked delta to permit normal
# Git removal. No reset, clean, force worktree removal or global prune.
$started = [DateTime]::UtcNow.ToString('o')
foreach ($relative in $inventory.extras) {
  if (-not $map.ContainsKey($relative)) { throw 'Unarchived extra file' }
  $full = [IO.Path]::GetFullPath((Join-Path $target $relative))
  if (-not $full.StartsWith($target + [IO.Path]::DirectorySeparatorChar,[StringComparison]::OrdinalIgnoreCase)) { throw 'Deletion escape' }
  if ((Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash.ToLower() -ne $map[$relative].sha256) { throw 'Extra file drift' }
  Remove-Item -LiteralPath $full -Force
}
if ($inventory.dirty.Count -gt 0) {
  & git --literal-pathspecs -c core.longpaths=true -C $target restore --worktree -- @($inventory.dirty)
  if ($LASTEXITCODE -ne 0) { throw 'Exact archived delta restoration failed' }
}
$status = @(& git -c core.longpaths=true -C $target status --porcelain --untracked-files=all)
if ($LASTEXITCODE -ne 0 -or $status.Count -gt 0) { throw 'Target not clean; no worktree removal attempted' }
& git -c core.longpaths=true worktree remove $target
$removeExit = $LASTEXITCODE
$registered = @(& git worktree list --porcelain)
if ($removeExit -ne 0) { throw 'Git removal incomplete; inspect exact residual and registration before continuing' }
if (Test-Path -LiteralPath $target) { throw 'Worktree path remains' }
if ($registered -contains ('worktree ' + $target.Replace('\','/'))) { throw 'Worktree registration remains' }
if ((& git rev-parse refs/heads/codex/xdx-supplier-core-rebuild-20260926).Trim() -ne $receipt.head) { throw 'Retained branch changed' }
if ((Get-FileHash -LiteralPath (Join-Path $base 'env.properties') -Algorithm SHA256).Hash.ToLower() -ne $inventory.baseEnvSha256) { throw 'Base config changed' }
$result = [ordered]@{status='passed';target=$target;pathAbsent=$true;registrationAbsent=$true;retainedBranch=$receipt.branch;retainedHead=$receipt.head;archivedExtrasRemoved=$inventory.extras.Count;archivedTrackedDeltaRestored=$inventory.dirty.Count;archivePath=$receipt.archivePath;archiveSha256=$receipt.archiveSha256;baseConfigurationUnchanged=$true;serverActions=0;startedUtc=$started;completedUtc=[DateTime]::UtcNow.ToString('o')}
$result | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $recordDir 'purge-receipt.json')
[pscustomobject]$result | Select-Object status,pathAbsent,registrationAbsent,archivedExtrasRemoved,baseConfigurationUnchanged | ConvertTo-Json
