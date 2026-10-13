$ErrorActionPreference = 'Stop'
$taskId = 'xdx-playbook-reconciliation-20261012'
$taskDir = "docs/builds/$taskId"
$expectedRoot = 'C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1'
$expectedBranch = 'TestingWFBuildTools'
$actualRoot = (& git rev-parse --show-toplevel).Trim()
$actualBranch = (& git branch --show-current).Trim()
if ($actualRoot -ne $expectedRoot -or $actualBranch -ne $expectedBranch) { throw 'Delivery checkout/branch mismatch' }
$allowed = @('AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md','docs/lessons/objects/oracle-fusion-procurement-suppliers.md')
function Assert-ScopedIndex {
  foreach ($name in @(& git diff --cached --name-only)) {
    if ($name -notin $allowed -and -not $name.StartsWith("$taskDir/")) { throw "Unrelated staged file; commit withheld: $name" }
  }
}
Assert-ScopedIndex
$gate = @(& node scripts/measure-build-command.cjs --output "$taskDir/commands.jsonl" --task $taskId --activity delivery-gate --phase delivery --category closeout --label delivery-gate --learning-ledger "$taskDir/failure-ledger.json" --learning-scope governance -- pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -SessionRecord "$taskDir/xdx_session_$taskId.json" -SessionId $taskId -Phase Closeout 2>&1)
$gateCode = $LASTEXITCODE
[IO.File]::WriteAllText((Join-Path (Get-Location) "$taskDir/evidence/delivery-gate.txt"), ($gate -join "`n") + "`n")
if ($gateCode -ne 0) { throw 'Delivery gate failed' }
& git add -- @allowed $taskDir
if ($LASTEXITCODE -ne 0) { throw 'Scoped staging failed' }
Assert-ScopedIndex
& git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged whitespace check failed' }
$inventory = Get-Content -Raw -LiteralPath "$taskDir/evidence/inventory.json" | ConvertFrom-Json
$worktreePath = '.worktrees/xdx-supplier-core-benchmark-20260930-175939'
$worktreeStatus = (@(& git -C $worktreePath status --short) -join "`n").Trim()
if ($worktreeStatus -ne $inventory.worktreeStatus) { throw 'Paused worktree changed during audit; delivery review required' }
Write-Output "Delivery identity: $actualRoot / $actualBranch"
& git diff --cached --stat
& git commit -m 'Reconcile root playbook and retained worktree lessons'
if ($LASTEXITCODE -ne 0) { throw 'Scoped governance commit failed' }
& git log -1 --format='%h %s'
& git status --short
