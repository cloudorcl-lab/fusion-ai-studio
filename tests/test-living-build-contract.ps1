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

  $output = & pwsh -NoProfile -File $verifierPath -RepoRoot $TargetRoot -PolicyOnly 2>&1
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
$missingSessionOutput = @(& pwsh -NoProfile -File $verifierPath 2>&1) -join "`n"
if ($LASTEXITCODE -eq 0 -or -not $missingSessionOutput.Contains('SessionRecord and SessionId are required')) { throw 'Default verifier accepted missing session evidence.' }
$bypassOutput = @(& pwsh -NoProfile -File $verifierPath -PolicyOnly -SessionId fake 2>&1) -join "`n"
if ($LASTEXITCODE -eq 0 -or -not $bypassOutput.Contains('cannot bypass a session check')) { throw 'PolicyOnly bypassed session validation.' }
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
New-Item -ItemType Directory -Path (Join-Path $handoffFixtureRoot 'scripts/tests') -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $repoRoot 'scripts/verify-agentic-app-query-contract.cjs') -Destination (Join-Path $handoffFixtureRoot 'scripts/verify-agentic-app-query-contract.cjs')
Copy-Item -LiteralPath (Join-Path $repoRoot 'scripts/tests/verify-agentic-app-query-contract.cjs') -Destination (Join-Path $handoffFixtureRoot 'scripts/tests/verify-agentic-app-query-contract.cjs')

try {
  $sessionAgentsPath = Join-Path $handoffFixtureRoot 'AGENTS.md'
  $sessionAgentsOriginal = Get-Content -LiteralPath $sessionAgentsPath -Raw
  foreach ($marker in @('Reread the active handoff and applicable governance', 'A new session is optional')) {
    Set-Content -LiteralPath $sessionAgentsPath -Value $sessionAgentsOriginal.Replace($marker, 'REMOVED') -NoNewline
    $revalidationNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
    if ($revalidationNegative.ExitCode -eq 0 -or -not $revalidationNegative.Output.Contains('in-session governance revalidation rule')) {
      throw "Missing in-session continuation policy was not rejected: $marker"
    }
  }
  Set-Content -LiteralPath $sessionAgentsPath -Value $sessionAgentsOriginal -NoNewline
  Set-Content -LiteralPath $sessionAgentsPath -Value $sessionAgentsOriginal.Replace('node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>', 'REMOVED QUERY PREFLIGHT') -NoNewline
  $queryPolicyNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($queryPolicyNegative.ExitCode -eq 0 -or -not $queryPolicyNegative.Output.Contains('Query preflight before remote execution')) {
    throw 'Missing root Agentic App Query preflight policy was not rejected.'
  }
  Set-Content -LiteralPath $sessionAgentsPath -Value $sessionAgentsOriginal -NoNewline

  $fixtureSkillPath = Join-Path $handoffFixtureRoot '.agents/skills/aistudio/SKILL.md'
  $fixtureSkillOriginal = Get-Content -LiteralPath $fixtureSkillPath -Raw
  Set-Content -LiteralPath $fixtureSkillPath -Value $fixtureSkillOriginal.Replace('node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>', 'REMOVED QUERY PREFLIGHT') -NoNewline
  $querySkillNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($querySkillNegative.ExitCode -eq 0 -or -not $querySkillNegative.Output.Contains('AI Studio skill must require the Agentic App Query preflight')) {
    throw 'Missing AI Studio skill Query preflight policy was not rejected.'
  }
  Set-Content -LiteralPath $fixtureSkillPath -Value $fixtureSkillOriginal -NoNewline

  Remove-Item -LiteralPath (Join-Path $handoffFixtureRoot 'scripts/verify-agentic-app-query-contract.cjs') -Force
  $queryValidatorNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($queryValidatorNegative.ExitCode -eq 0 -or -not $queryValidatorNegative.Output.Contains('Agentic App Query contract validator is missing')) {
    throw 'Missing Agentic App Query validator was not rejected.'
  }
  Copy-Item -LiteralPath (Join-Path $repoRoot 'scripts/verify-agentic-app-query-contract.cjs') -Destination (Join-Path $handoffFixtureRoot 'scripts/verify-agentic-app-query-contract.cjs')

  Set-Content -LiteralPath $sessionAgentsPath -Value $sessionAgentsOriginal.Replace('-SessionRecord', '-OldRecord') -NoNewline
  $sessionNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($sessionNegative.ExitCode -eq 0 -or -not $sessionNegative.Output.Contains('must invoke session conformance')) { throw 'Missing startup session gate was not rejected.' }
  Set-Content -LiteralPath $sessionAgentsPath -Value $sessionAgentsOriginal -NoNewline
  $timingPolicyPath = Join-Path $handoffFixtureRoot 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md'
  $timingPolicyOriginal = Get-Content -LiteralPath $timingPolicyPath -Raw
  Set-Content -LiteralPath $timingPolicyPath -Value $timingPolicyOriginal.Replace('### MUST: continuous timing and reconciliation', '### Timing') -NoNewline
  $timingNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($timingNegative.ExitCode -eq 0 -or -not $timingNegative.Output.Contains('mandatory timing reconciliation policy')) {
    throw 'Expected missing mandatory timing reconciliation policy to fail verification.'
  }
  Set-Content -LiteralPath $timingPolicyPath -Value $timingPolicyOriginal -NoNewline
  foreach ($policyMarker in @('### Mandatory first-slice fast-fail gate', '### Mandatory signed-in browser keep-alive')) {
    Set-Content -LiteralPath $timingPolicyPath -Value $timingPolicyOriginal.Replace($policyMarker, '### REMOVED') -NoNewline
    $fastFailNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
    if ($fastFailNegative.ExitCode -eq 0) {
      throw "Expected missing mandatory playbook rule to fail verification: $policyMarker"
    }
  }
  Set-Content -LiteralPath $timingPolicyPath -Value $timingPolicyOriginal -NoNewline
  foreach ($marker in @('#### BO readiness before workflow integration', '### Delegated build ownership', 'Direct BO POST proof and native approval-to-POST proof are distinct', 'Assign one writer per file and remote artifact', 'BO readiness receipt and independent review', '### Context continuity and recovery', 'At 70% context', 'Before 75%', 'four-minute reminder', 'reminder handle or its unavailability', 'accepted record IDs', 'poll retained processes and revalidate Startup')) {
    Set-Content -LiteralPath $timingPolicyPath -Value $timingPolicyOriginal.Replace($marker, 'REMOVED') -NoNewline
    $negative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
    if ($negative.ExitCode -eq 0 -or -not $negative.Output.Contains('Missing build-process prevention policy')) { throw "Build-process regression accepted missing rule: $marker" }
  }
  Set-Content -LiteralPath $timingPolicyPath -Value $timingPolicyOriginal -NoNewline
  $purposePath = Join-Path $handoffFixtureRoot 'docs/lessons/objects/README.md'
  $purposeOriginal = Get-Content -LiteralPath $purposePath -Raw
  foreach ($marker in @('examplePurpose: "response"', 'exampleMode: "fetchResponse"', 'readyToFetch: true', 'neither flag supplies write authorization')) {
    Set-Content -LiteralPath $purposePath -Value $purposeOriginal.Replace($marker, 'REMOVED') -NoNewline
    $negative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
    if ($negative.ExitCode -eq 0 -or -not $negative.Output.Contains('Missing POST example-purpose prevention policy')) { throw "Purpose regression accepted missing rule: $marker" }
  }
  Set-Content -LiteralPath $purposePath -Value $purposeOriginal -NoNewline
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
  $objectRegistryFixtureContent = Get-Content -LiteralPath $objectRegistryFixturePath -Raw
  Set-Content -LiteralPath $objectRegistryFixturePath -Value $objectRegistryFixtureContent.Replace('## First successful BO GET sample policy', '## Sample policy') -NoNewline
  $objectSamplePolicyNegative = Invoke-ContractVerifier -TargetRoot $handoffFixtureRoot
  if ($objectSamplePolicyNegative.ExitCode -eq 0) {
    throw 'Expected a repository fixture without the first-success BO GET sample policy to fail living-build verification.'
  }

  if (-not $objectSamplePolicyNegative.Output.Contains('capture-once first-success BO GET sample policy')) {
    throw "Expected the missing first-success BO GET sample policy to be reported, received:`n$($objectSamplePolicyNegative.Output)"
  }

  Set-Content -LiteralPath $objectRegistryFixturePath -Value $objectRegistryFixtureContent -NoNewline
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

Write-Output 'Living build contract test: PASS (optional-session positive; revalidation, session, timing, handoff, naming, sample-policy, object-registry and incomplete negative fixtures)'
