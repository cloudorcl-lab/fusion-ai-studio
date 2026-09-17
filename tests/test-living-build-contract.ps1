$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$verifierPath = Join-Path $repoRoot 'scripts/verify-living-build-contract.ps1'

if (-not (Test-Path -LiteralPath $verifierPath -PathType Leaf)) {
  throw "Expected living-build verifier at $verifierPath"
}

function Invoke-ContractVerifier {
  param(
    [Parameter(Mandatory)]
    [string] $TargetRoot
  )

  $output = & pwsh -NoProfile -File $verifierPath -RepoRoot $TargetRoot 2>&1
  return [pscustomobject]@{
    ExitCode = $LASTEXITCODE
    Output = @($output) -join "`n"
  }
}

$positive = Invoke-ContractVerifier -TargetRoot $repoRoot
if ($positive.ExitCode -ne 0) {
  throw "Repository living-build contract failed:`n$($positive.Output)"
}

if (-not $positive.Output.Contains('Living build contract: PASS')) {
  throw "Expected a PASS receipt from the living-build verifier, received:`n$($positive.Output)"
}

$rootAgents = Get-Content -Raw -LiteralPath (Join-Path $repoRoot 'AGENTS.md')
foreach ($required in @(
  'docs/lessons/objects/README.md',
  'XDX_<UPPER_SNAKE_CASE>',
  'xdx_<lower_snake_case>.<extension>',
  'XDX <Human Readable Name>',
  'codex/xdx-epm-form-definition-designer',
  '.worktrees/xdx-epm-form-definition-designer'
)) {
  if (-not $rootAgents.Contains($required)) { throw "Root AGENTS.md is missing XDX naming policy: $required" }
}

$handoffFixtureRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("living-build-handoff-contract-{0}" -f [guid]::NewGuid().ToString('N'))
$resolvedHandoffFixtureRoot = [System.IO.Path]::GetFullPath($handoffFixtureRoot)
$resolvedTempRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())

if (-not $resolvedHandoffFixtureRoot.StartsWith($resolvedTempRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Refusing to create a handoff fixture outside the system temporary directory: $resolvedHandoffFixtureRoot"
}

New-Item -ItemType Directory -Path (Join-Path $handoffFixtureRoot 'docs/lessons') -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $handoffFixtureRoot '.agents/skills/aistudio') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $repoRoot 'AGENTS.md') -Destination (Join-Path $handoffFixtureRoot 'AGENTS.md')
Copy-Item -LiteralPath (Join-Path $repoRoot 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md') -Destination (Join-Path $handoffFixtureRoot 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md')
Copy-Item -LiteralPath (Join-Path $repoRoot 'docs/lessons/objects') -Destination (Join-Path $handoffFixtureRoot 'docs/lessons/objects') -Recurse
New-Item -ItemType Directory -Path (Join-Path $handoffFixtureRoot 'docs/handoffs') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $repoRoot 'docs/handoffs/ACTIVE_HANDOFF.md') -Destination (Join-Path $handoffFixtureRoot 'docs/handoffs/ACTIVE_HANDOFF.md')
Copy-Item -LiteralPath (Join-Path $repoRoot '.agents/skills/aistudio/SKILL.md') -Destination (Join-Path $handoffFixtureRoot '.agents/skills/aistudio/SKILL.md')

try {
  $handoffAgentsPath = Join-Path $handoffFixtureRoot 'AGENTS.md'
  $handoffAgentsContent = Get-Content -LiteralPath $handoffAgentsPath -Raw
  $originalAgentsContent = $handoffAgentsContent
  $handoffAgentsContent = [regex]::Replace($handoffAgentsContent, '(?s)Review\s+`docs/handoffs/ACTIVE_HANDOFF\.md`\s+before any other repository work in every new Codex session\.', '')
  Set-Content -LiteralPath $handoffAgentsPath -Value $handoffAgentsContent -NoNewline

  $handoffNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($handoffNegative.ExitCode -eq 0) {
    throw 'Expected a repository fixture without the session-start handoff review rule to fail living-build verification.'
  }

  if (-not $handoffNegative.Output.Contains('session-start handoff review')) {
    throw "Expected the missing session-start handoff review rule to be reported, received:`n$($handoffNegative.Output)"
  }

  $namingAgentsContent = $originalAgentsContent.Replace('XDX_<UPPER_SNAKE_CASE>', 'BAD_<UPPER_SNAKE_CASE>')
  Set-Content -LiteralPath $handoffAgentsPath -Value $namingAgentsContent -NoNewline
  $namingNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($namingNegative.ExitCode -eq 0) {
    throw 'Expected a repository fixture without the XDX code marker to fail living-build verification.'
  }

  if (-not $namingNegative.Output.Contains('XDX naming policy marker')) {
    throw "Expected the missing XDX naming marker to be reported, received:`n$($namingNegative.Output)"
  }

  Set-Content -LiteralPath $handoffAgentsPath -Value $originalAgentsContent -NoNewline
  $objectRegistryFixturePath = Join-Path $handoffFixtureRoot 'docs/lessons/objects/README.md'
  Remove-Item -LiteralPath $objectRegistryFixturePath -Force
  $objectRegistryNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($objectRegistryNegative.ExitCode -eq 0) {
    throw 'Expected a repository fixture without the object learning registry to fail living-build verification.'
  }

  if (-not $objectRegistryNegative.Output.Contains('Object learning registry is missing')) {
    throw "Expected the missing object learning registry to be reported, received:`n$($objectRegistryNegative.Output)"
  }
}
finally {
  if (Test-Path -LiteralPath $handoffFixtureRoot) {
    Remove-Item -LiteralPath $handoffFixtureRoot -Recurse -Force
  }
}

$fixtureRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("living-build-contract-{0}" -f [guid]::NewGuid().ToString('N'))
$resolvedTempRoot = [System.IO.Path]::GetFullPath([System.IO.Path]::GetTempPath())
$resolvedFixtureRoot = [System.IO.Path]::GetFullPath($fixtureRoot)

if (-not $resolvedFixtureRoot.StartsWith($resolvedTempRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw "Refusing to create a test fixture outside the system temporary directory: $resolvedFixtureRoot"
}

New-Item -ItemType Directory -Path $fixtureRoot | Out-Null

try {
  $negative = Invoke-ContractVerifier -TargetRoot $fixtureRoot
  if ($negative.ExitCode -eq 0) {
    throw 'Expected an incomplete repository fixture to fail living-build verification.'
  }

  if (-not $negative.Output.Contains('Living build contract: FAIL')) {
    throw "Expected a FAIL receipt for the negative fixture, received:`n$($negative.Output)"
  }
}
finally {
  if (Test-Path -LiteralPath $fixtureRoot) {
    Remove-Item -LiteralPath $fixtureRoot -Recurse -Force
  }
}

Write-Output 'Living build contract test: PASS (positive repository and handoff, naming, object-registry, incomplete negative fixtures)'
