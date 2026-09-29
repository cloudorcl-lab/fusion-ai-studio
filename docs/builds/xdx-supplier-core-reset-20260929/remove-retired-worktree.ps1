$ErrorActionPreference='Stop'
$repo=(Resolve-Path -LiteralPath '.').Path
$expected='C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1'
if($repo -ne $expected){throw 'Wrong repository'}
$target=Join-Path $repo '.worktrees\xdx-supplier-core-restart-20260928'
$resolved=(Resolve-Path -LiteralPath $target).Path
if($resolved -ne $target){throw 'Unexpected resolved target'}
$items=@(Get-Item -LiteralPath $target -Force)+@(Get-ChildItem -LiteralPath $target -Force -Recurse)
if(@($items|Where-Object {$_.Attributes -band [IO.FileAttributes]::ReparsePoint}).Count){throw 'Reparse point detected'}
$manifest=@(Get-Content -Raw -LiteralPath '.debug/xdx-retired-20260929/manifest.json'|ConvertFrom-Json)
$files=@($items|Where-Object {-not $_.PSIsContainer})
if($files.Count -ne $manifest.Count){throw 'Preservation file count changed'}
foreach($entry in $manifest){
 $file=[IO.Path]::GetFullPath((Join-Path $target $entry.path))
 if(-not $file.StartsWith($target+'\',[StringComparison]::OrdinalIgnoreCase)){throw 'Manifest path escapes target'}
 $item=Get-Item -LiteralPath $file -Force
 if($item.Length -ne $entry.length -or (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sha256){throw "Preserved file changed: $($entry.path)"}
}
$archive=Get-FileHash -LiteralPath '.debug/xdx-retired-20260929/worktree.zip' -Algorithm SHA256
if($archive.Hash.ToLowerInvariant() -ne '61cc222cc1f9a6301f9cdedd26f0689e8804d21e0cf6b54038eafe3c05d1e6b1'){throw 'Archive hash changed'}
$registration=& git worktree list --porcelain
if($LASTEXITCODE -ne 0 -or -not ($registration -match 'worktree .*xdx-supplier-core-restart-20260928$')){throw 'Expected registration absent'}
$executing=@(Get-CimInstance Win32_Process | Where-Object {$_.Name -match '^(node|python|java)\.exe$' -and $_.CommandLine -like '*xdx-supplier-core-restart-20260928*'})
if($executing.Count){throw 'Retired task still has executing processes'}
# Exact, verified, privately archived disposable worktree only. No cross-shell deletion.
foreach($item in $items){if($item.Attributes -band ([IO.FileAttributes]::ReadOnly -bor [IO.FileAttributes]::Hidden -bor [IO.FileAttributes]::System)){$item.Attributes=$item.Attributes -band (-bnot ([IO.FileAttributes]::ReadOnly -bor [IO.FileAttributes]::Hidden -bor [IO.FileAttributes]::System))}}
Remove-Item -LiteralPath $target -Recurse
if(Test-Path -LiteralPath $target){throw 'Physical worktree remains'}
& git worktree remove $target
if($LASTEXITCODE -ne 0){throw 'Physical removal done; exact Git unregistration failed'}
$after=& git worktree list --porcelain
if($LASTEXITCODE -ne 0 -or ($after -match 'worktree .*xdx-supplier-core-restart-20260928$')){throw 'Git registration remains'}
[ordered]@{status='passed';observedUtc=[DateTime]::UtcNow.ToString('o');target=$target;filesVerified=$files.Count;archiveSha256=$archive.Hash.ToLowerInvariant();physicalAbsent=$true;registrationAbsent=$true;historicalBranchRetained='codex/xdx-supplier-core-restart-20260928';businessData='untouched'}|ConvertTo-Json|Set-Content -LiteralPath 'docs/builds/xdx-supplier-core-reset-20260929/evidence/worktree-removal.json'
Write-Output 'Exact worktree removal and unregistration: PASS'
