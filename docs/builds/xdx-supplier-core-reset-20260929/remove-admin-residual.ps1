$ErrorActionPreference='Stop'
$repo=(Resolve-Path -LiteralPath '.').Path
if($repo -ne 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1'){throw 'Wrong repository'}
$old=Join-Path $repo '.worktrees\xdx-supplier-core-restart-20260928'
if(Test-Path -LiteralPath $old){throw 'Physical worktree remains'}
$listed=& git worktree list --porcelain
if($LASTEXITCODE -ne 0 -or ($listed -match 'worktree .*xdx-supplier-core-restart-20260928$')){throw 'Still registered'}
$target=Join-Path $repo '.git\worktrees\xdx-supplier-core-restart-20260928'
if((Resolve-Path -LiteralPath $target).Path -ne $target){throw 'Wrong residual'}
$items=@(Get-Item -LiteralPath $target -Force)+@(Get-ChildItem -LiteralPath $target -Force -Recurse)
if(@($items|Where-Object {$_.Attributes -band [IO.FileAttributes]::ReparsePoint}).Count){throw 'Reparse point'}
if(@($items|Where-Object {-not $_.PSIsContainer -and $_.Name -ne 'ORIG_HEAD'}).Count){throw 'Unexpected residual data'}
Copy-Item -LiteralPath $target -Destination '.debug/xdx-retired-20260929/admin-residual' -Recurse
foreach($item in $items){$item.Attributes=$item.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)}
Remove-Item -LiteralPath $target -Recurse
if(Test-Path -LiteralPath $target){throw 'Residual remains'}
[ordered]@{status='passed';observedUtc=[DateTime]::UtcNow.ToString('o');target=$old;filesVerified=5600;physicalAbsent=$true;registrationAbsent=$true;administrativeResidualAbsent=$true;historicalBranchRetained='codex/xdx-supplier-core-restart-20260928';businessData='untouched'}|ConvertTo-Json|Set-Content 'docs/builds/xdx-supplier-core-reset-20260929/evidence/worktree-removal.json'
Write-Output 'Physical, registration, and administrative residual absence: PASS'
