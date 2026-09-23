param(
  [string] $RepoRoot = (Split-Path -Parent $PSScriptRoot),
  [switch] $PolicyOnly,
  [string] $SessionRecord,
  [string] $SessionId,
  [ValidateSet('Startup', 'Closeout')][string] $Phase = 'Startup'
)

$ErrorActionPreference = 'Stop'

$canonicalRelativePath = 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md'
$activeHandoffRelativePath = 'docs/handoffs/ACTIVE_HANDOFF.md'
$objectRegistryRelativePath = 'docs/lessons/objects/README.md'
$retiredPlaybookName = 'AltaLink_AI_Studio_Lessons_Learned_and_Next_Build_Playbook.md'
$repoRootPath = [System.IO.Path]::GetFullPath($RepoRoot)
$agentsPath = Join-Path $repoRootPath 'AGENTS.md'
$playbookPath = Join-Path $repoRootPath $canonicalRelativePath
$activeHandoffPath = Join-Path $repoRootPath $activeHandoffRelativePath
$objectRegistryPath = Join-Path $repoRootPath $objectRegistryRelativePath
$skillPath = Join-Path $repoRootPath '.agents/skills/aistudio/SKILL.md'
$queryContractRelativePath = 'scripts/verify-agentic-app-query-contract.cjs'
$queryContractTestRelativePath = 'scripts/tests/verify-agentic-app-query-contract.cjs'
$queryContractPath = Join-Path $repoRootPath $queryContractRelativePath
$queryContractTestPath = Join-Path $repoRootPath $queryContractTestRelativePath
$lessonsPath = Join-Path $repoRootPath 'docs/lessons'
$retiredPlaybookPath = Join-Path $lessonsPath $retiredPlaybookName
$failures = [System.Collections.Generic.List[string]]::new()

function Add-ContractFailure {
  param([Parameter(Mandatory)][string] $Message)
  $script:failures.Add($Message)
}

function Read-RequiredFile {
  param(
    [Parameter(Mandatory)][string] $Path,
    [Parameter(Mandatory)][string] $Label
  )

  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    Add-ContractFailure "$Label is missing: $Path"
    return $null
  }

  return Get-Content -LiteralPath $Path -Raw
}

function Get-FirstLevelTwoHeading {
  param([AllowNull()][string] $Content)

  if ([string]::IsNullOrWhiteSpace($Content)) {
    return $null
  }

  $match = [regex]::Match($Content, '(?m)^##\s+.+$')
  if ($match.Success) {
    return $match.Value.Trim()
  }

  return $null
}

$agentsContent = Read-RequiredFile -Path $agentsPath -Label 'Root AGENTS.md'
$playbookContent = Read-RequiredFile -Path $playbookPath -Label 'Canonical living build playbook'
$objectRegistryContent = Read-RequiredFile -Path $objectRegistryPath -Label 'Object learning registry'
$skillContent = Read-RequiredFile -Path $skillPath -Label 'AI Studio skill entrypoint'
$queryContractContent = Read-RequiredFile -Path $queryContractPath -Label 'Agentic App Query contract validator'
$queryContractTestContent = Read-RequiredFile -Path $queryContractTestPath -Label 'Agentic App Query contract regression test'

if ($agentsContent) {
  foreach ($marker in @('-SessionRecord', '-SessionId', '-Phase Closeout')) {
    if (-not $agentsContent.Contains($marker)) { Add-ContractFailure "Root AGENTS.md must invoke session conformance: $marker" }
  }
  if ((Get-FirstLevelTwoHeading -Content $agentsContent) -notmatch '^## Instruction 1\s+[—-]\s+Learn') {
    Add-ContractFailure 'Learning must be the first actionable section in root AGENTS.md.'
  }
  if (-not $agentsContent.Contains($canonicalRelativePath)) {
    Add-ContractFailure 'Root AGENTS.md must reference the canonical living build playbook path.'
  }
  if (-not $agentsContent.Contains($objectRegistryRelativePath)) {
    Add-ContractFailure 'Root AGENTS.md must reference the object learning registry path.'
  }
  if ($agentsContent -notmatch '(?i)first successful BO GET') {
    Add-ContractFailure 'Root AGENTS.md must enforce capture-once documentation for the first successful BO GET.'
  }
  if ($agentsContent -notmatch '(?s)Review\s+`docs/handoffs/ACTIVE_HANDOFF\.md`\s+before any other repository work in every new Codex session\.') {
    Add-ContractFailure 'Root AGENTS.md must require the session-start handoff review.'
  }
  if (-not $agentsContent.Contains('scripts/verify-living-build-contract.ps1')) {
    Add-ContractFailure 'Root AGENTS.md must invoke the living build verifier.'
  }
  if (-not $agentsContent.Contains('node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>')) {
    Add-ContractFailure 'Root AGENTS.md must require the Agentic App Query preflight before remote execution.'
  }
  foreach ($marker in @('Reread the active handoff and applicable governance', 'A new session is optional')) {
    if (-not $agentsContent.Contains($marker)) {
      Add-ContractFailure "Root AGENTS.md must state the in-session governance revalidation rule: $marker"
    }
  }
  if ($agentsContent -notmatch '(?i)before declaring a build complete') {
    Add-ContractFailure 'Root AGENTS.md must contain the completion and hand-forward gate.'
  }
  foreach ($marker in @(
    'XDX_<UPPER_SNAKE_CASE>',
    'xdx_<lower_snake_case>.<extension>',
    'XDX <Human Readable Name>',
    'codex/xdx-epm-form-definition-designer',
    '.worktrees/xdx-epm-form-definition-designer'
  )) {
    if (-not $agentsContent.Contains($marker)) {
      Add-ContractFailure "Root AGENTS.md must contain XDX naming policy marker: $marker"
    }
  }
}

if (-not (Test-Path -LiteralPath $activeHandoffPath -PathType Leaf)) {
  Add-ContractFailure "Active handoff is missing: $activeHandoffPath"
}

if ($playbookContent) {
  if (-not $playbookContent.Contains('### Session conformance receipt')) {
    Add-ContractFailure 'Canonical session conformance receipt procedure is missing.'
  }
  if ($playbookContent -notmatch '(?m)^### MUST: continuous timing and reconciliation\s*$') {
    Add-ContractFailure 'The canonical playbook must retain the mandatory timing reconciliation policy.'
  }
  if ($playbookContent -notmatch '(?m)^### Mandatory first-slice fast-fail gate\s*$') {
    Add-ContractFailure 'The canonical playbook must retain the first-slice fast-fail gate.'
  }
  if ($playbookContent -notmatch '(?m)^### Mandatory signed-in browser keep-alive\s*$') {
    Add-ContractFailure 'The canonical playbook must retain the signed-in browser keep-alive rule.'
  }
  if ((Get-FirstLevelTwoHeading -Content $playbookContent) -notmatch '^## Instruction 1\s+[—-]\s+Learn') {
    Add-ContractFailure 'Learning must remain the first actionable section in the canonical playbook.'
  }
  if ($playbookContent -notmatch '(?m)^## Invocation in every worktree and build\s*$') {
    Add-ContractFailure 'The canonical playbook must document invocation in every worktree and build.'
  }
  if ($playbookContent -notmatch '(?i)root `AGENTS\.md`') {
    Add-ContractFailure 'The canonical playbook must identify root AGENTS.md as the automatic Codex entrypoint.'
  }
  if (-not $playbookContent.Contains('objects/README.md')) {
    Add-ContractFailure 'The canonical playbook must route object-level learning through the object registry.'
  }
  if ($playbookContent -notmatch '(?i)first successful GET through a BO') {
    Add-ContractFailure 'The canonical playbook must retain the capture-once first-success BO GET lifecycle rule.'
  }
  foreach ($retiredHeading in @(
    '#### API and Business Object source contracts',
    '#### Live API verification and evidence',
    '#### Generated write-test payloads and vendor-example comparison',
    '#### Browser-free documentation retrieval'
  )) {
    if ($playbookContent.Contains($retiredHeading)) {
      Add-ContractFailure "Object-level detailed guidance returned to the canonical playbook: $retiredHeading"
    }
  }
}

if ($objectRegistryContent) {
  if ($objectRegistryContent -notmatch '(?m)^# Object learning registry\s*$') {
    Add-ContractFailure 'The object registry must retain its reference-document identity.'
  }
  if ($objectRegistryContent -notmatch '(?m)^## First successful BO GET sample policy\s*$') {
    Add-ContractFailure 'The object registry must define the capture-once first-success BO GET sample policy.'
  }

  $requiredObjectReferences = @(
    'oracle-fusion-procurement-suppliers.md',
    'oracle-fusion-procurement-supplier-addresses.md',
    'oracle-fusion-procurement-supplier-sites.md',
    'oracle-fusion-procurement-supplier-contacts.md'
  )

  foreach ($referenceName in $requiredObjectReferences) {
    if (-not $objectRegistryContent.Contains($referenceName)) {
      Add-ContractFailure "Object registry is missing required reference: $referenceName"
      continue
    }

    $referencePath = Join-Path (Split-Path -Parent $objectRegistryPath) $referenceName
    $referenceContent = Read-RequiredFile -Path $referencePath -Label "Object reference $referenceName"
    if ($referenceContent) {
      foreach ($requiredSection in @('## GET operation', '## First successful BO GET sample', '## POST operation', '### Response JSON', '### Candidate request JSON', '## Evidence and limits', '## Change history')) {
        if (-not $referenceContent.Contains($requiredSection)) {
          Add-ContractFailure "Object reference $referenceName is missing section: $requiredSection"
        }
      }
    }
  }
}

if ($skillContent) {
  if (-not $skillContent.Contains('-SessionRecord')) { Add-ContractFailure 'AI Studio skill must invoke session conformance.' }
  $startHereFirstItem = [regex]::Match($skillContent, '(?ms)^## Start Here\s*\r?\n\s*1\.\s+([^\r\n]+)')
  if (-not $startHereFirstItem.Success) {
    Add-ContractFailure 'The AI Studio skill must have a numbered Start Here sequence.'
  }
  elseif (-not $startHereFirstItem.Groups[1].Value.Contains($activeHandoffRelativePath)) {
    Add-ContractFailure 'The active handoff review must be the first Start Here action in the AI Studio skill.'
  }

  $startHereSecondItem = [regex]::Match($skillContent, '(?ms)^## Start Here\s*\r?\n\s*1\.\s+[^\r\n]+\r?\n\s*2\.\s+([^\r\n]+)')
  if (-not $startHereSecondItem.Success -or -not $startHereSecondItem.Groups[1].Value.Contains($canonicalRelativePath)) {
    Add-ContractFailure 'The canonical playbook gate must be the second Start Here action in the AI Studio skill.'
  }

  $startHereThirdItem = [regex]::Match($skillContent, '(?ms)^## Start Here\s*\r?\n\s*1\.\s+[^\r\n]+\r?\n\s*2\.\s+[^\r\n]+\r?\n\s*3\.\s+([^\r\n]+)')
  if (-not $startHereThirdItem.Success -or -not $startHereThirdItem.Groups[1].Value.Contains($objectRegistryRelativePath)) {
    Add-ContractFailure 'The object learning registry gate must be the third Start Here action in the AI Studio skill.'
  }
  if ($startHereThirdItem.Groups[1].Value -notmatch '(?i)first successful BO GET') {
    Add-ContractFailure 'The AI Studio skill must enforce capture-once documentation for the first successful BO GET.'
  }
  if (-not $skillContent.Contains('node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>')) {
    Add-ContractFailure 'The AI Studio skill must require the Agentic App Query preflight before remote execution.'
  }
}

if ($queryContractContent) {
  foreach ($marker in @(
    'APP_QUERY_SUSPENSION_UNSUPPORTED',
    'WORKFLOW_BINDING_EXPRESSION_MALFORMED',
    'WORKFLOW_BINDING_PRODUCER_MISSING',
    'BO_PATH_TOKEN_INPUT_MISSING',
    'BO_PATH_TOKEN_INPUT_BLANK'
  )) {
    if (-not $queryContractContent.Contains($marker)) {
      Add-ContractFailure "Agentic App Query validator is missing required rejection: $marker"
    }
  }
}

if ($queryContractTestContent) {
  foreach ($marker in @(
    'APP_QUERY_SUSPENSION_UNSUPPORTED',
    'WORKFLOW_BINDING_EXPRESSION_MALFORMED',
    'WORKFLOW_BINDING_PRODUCER_MISSING',
    'BO_PATH_TOKEN_INPUT_MISSING',
    'BO_PATH_TOKEN_INPUT_BLANK'
  )) {
    if (-not $queryContractTestContent.Contains($marker)) {
      Add-ContractFailure "Agentic App Query regression test is missing required case: $marker"
    }
  }
}

if (Test-Path -LiteralPath $retiredPlaybookPath) {
  Add-ContractFailure "Retired competing playbook returned: $retiredPlaybookPath"
}

if (Test-Path -LiteralPath $lessonsPath -PathType Container) {
  $canonicalOwners = @(
    Get-ChildItem -LiteralPath $lessonsPath -File -Filter '*.md' |
      Where-Object {
        (Get-Content -LiteralPath $_.FullName -TotalCount 1) -eq '# AI Studio Agent App Living Build Playbook'
      }
  )

  if ($canonicalOwners.Count -ne 1) {
    Add-ContractFailure "Expected exactly one living build playbook owner in docs/lessons; found $($canonicalOwners.Count)."
  }
  elseif ($canonicalOwners[0].FullName -ne [System.IO.Path]::GetFullPath($playbookPath)) {
    Add-ContractFailure "Living build playbook ownership moved from the canonical path to $($canonicalOwners[0].FullName)."
  }
}

if ($failures.Count -gt 0) {
  Write-Output 'Living build contract: FAIL'
  foreach ($failure in $failures) {
    Write-Output "- $failure"
  }
  exit 1
}

if ($PolicyOnly -and ($SessionRecord -or $SessionId)) {
  Write-Output 'Living build contract: FAIL - PolicyOnly cannot bypass a session check.'
  exit 1
}
if (-not $PolicyOnly) {
  if (-not $SessionRecord -or -not $SessionId) {
    Write-Output 'Living build contract: FAIL - SessionRecord and SessionId are required; PolicyOnly checks policy structure, not session readiness.'
    exit 1
  }
  & node (Join-Path $PSScriptRoot 'verify-session-compliance.cjs') $repoRootPath $SessionRecord $SessionId $Phase
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

Write-Output 'Living build contract: PASS'
if ($PolicyOnly) { Write-Output '- Policy structure only; session execution has not been verified.' }
Write-Output "- Canonical owner: $canonicalRelativePath"
Write-Output "- Object learning registry: $objectRegistryRelativePath"
Write-Output '- Startup entrypoint: AGENTS.md'
Write-Output "- Session-start handoff: $activeHandoffRelativePath"
Write-Output '- AI Studio fallback: .agents/skills/aistudio/SKILL.md'
Write-Output '- Worktree rule: integrate governance, reread it and pass applicable Startup checks; a new session is optional'
Write-Output '- Naming rule: XDX codes, display names, files, branches, and worktrees'
