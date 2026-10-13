$ErrorActionPreference='Stop'
$root=(Resolve-Path '.').Path
$base='docs/builds/xdx-clean-restart-20261013'
$archive=(Get-Content -Raw "$base/evidence/preservation.json"|ConvertFrom-Json).archive
$plan=Get-Content -Raw (Join-Path $archive 'plan.json')|ConvertFrom-Json
if(((& git rev-parse HEAD).Trim()) -ne $plan.baseHead){throw 'Base HEAD drift before scoped delivery'}
if(@(& git diff --cached --name-only).Count){throw 'Preexisting staged changes must be preserved'}
& git -c core.safecrlf=false add --all -- docs src test scripts/tests/xdx-supplier-lifecycle tests package.json ATTEMPTS.md
if($LASTEXITCODE -ne 0){throw 'Scoped staging failed'}
$staged=@(& git diff --cached --name-only)
foreach($p in $staged){if($p -eq 'env.properties' -or $p -notmatch '^(docs/|src/|test/|scripts/tests/xdx-supplier-lifecycle/|tests/|package\.json$|ATTEMPTS\.md$)'){throw 'Unrelated staged file'}}
& git -c core.safecrlf=false diff --cached --check
if($LASTEXITCODE -ne 0){throw 'Staged diff check failed'}
& git commit --quiet -m 'Retire local attempts and reset custom supplier workspace'
if($LASTEXITCODE -ne 0){throw 'Scoped commit failed'}
$head=(& git rev-parse HEAD).Trim()
if(((& git rev-parse HEAD^).Trim()) -ne $plan.baseHead){throw 'Unexpected committed parent'}
$status=@(& git status --porcelain=v1)
if($status.Count -ne 1 -or $status[0] -ne ' M env.properties'){throw 'Unexpected post-delivery working-tree changes'}
$original=@(Get-Content -Raw (Join-Path $archive 'base-files.json')|ConvertFrom-Json)|Where-Object path -eq 'env.properties'
if((Get-FileHash -LiteralPath env.properties).Hash.ToLowerInvariant() -ne $original.sha256){throw 'Configuration drift'}
$result=[ordered]@{ok=$true;commit=$head;parent=$plan.baseHead;remainingWorkingTreeChange='Preserved unstaged environment configuration';registeredCheckouts=@(& git worktree list --porcelain|Where-Object {$_ -like 'worktree *'}).Count;archive=$archive;observedUtc=[DateTime]::UtcNow.ToString('o');pushPerformed=$false}
$result|ConvertTo-Json|Set-Content -LiteralPath (Join-Path $archive 'delivery.json')
$result|ConvertTo-Json
