[CmdletBinding()]
param([string]$PackageRoot = (Split-Path -Parent $PSScriptRoot))

$root = (Resolve-Path -LiteralPath $PackageRoot -ErrorAction Stop).Path
$required = @(
  'AGENTS.md','README.md','scripts/New-AgentAppBuildWorktree.ps1',
  'scripts/Verify-AgentAppBuildStartup.ps1','scripts/Add-BuildTimeRecord.ps1',
  'docs/operations/ARCHITECTURE_SELF_REVIEW.md','docs/operations/TEST_GUARDRAILS.md',
  'docs/operations/CONTEXT_RESET.md','docs/operations/TIME_TRACKER.md',
  'docs/operations/AISTUDIO_ATLAS.md','templates/intake-and-learning-register.md',
  'templates/requirement-slice-register.md','templates/golden-path-test-manifest.md',
  'templates/checkpoint.md','templates/delivery-receipt.md',
  'templates/active-handoff.md','templates/dependency-inventory.md','templates/time-tracker.md',
  'docs/operations/PROJECT_STRUCTURE.md','docs/operations/CARRY_FORWARD_INVENTORY.md',
  'docs/operations/ROLLBACK_UNINSTALL.md'
)
foreach ($relative in $required) {
  if (-not (Test-Path -LiteralPath (Join-Path $root $relative))) { throw "Missing required package file: $relative" }
}
$agents = Get-Content -Raw -LiteralPath (Join-Path $root 'AGENTS.md')
foreach ($marker in @('new Git worktree','70–75%','MVP golden-path manifest','ATLAS sync plans','architecture self-review')) {
  if (-not $agents.Contains($marker)) { throw "AGENTS.md is missing required policy marker: $marker" }
}
foreach ($marker in @(
  'XDX_<UPPER_SNAKE_CASE>',
  'xdx_<lower_snake_case>.<extension>',
  'XDX <Human Readable Name>',
  'codex/xdx-epm-form-definition-designer',
  '.worktrees/xdx-epm-form-definition-designer'
)) {
  if (-not $agents.Contains($marker)) { throw "AGENTS.md is missing XDX naming policy marker: $marker" }
}
Write-Output "Agent-app build startup package: PASS"
