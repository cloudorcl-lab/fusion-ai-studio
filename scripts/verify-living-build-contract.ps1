param(
  [string] $RepoRoot = (Split-Path -Parent $PSScriptRoot)
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

if ($agentsContent) {
  if ((Get-FirstLevelTwoHeading -Content $agentsContent) -notmatch '^## Instruction 1\s+[—-]\s+Learn') {
    Add-ContractFailure 'Learning must be the first actionable section in root AGENTS.md.'
  }
  if (-not $agentsContent.Contains($canonicalRelativePath)) {
    Add-ContractFailure 'Root AGENTS.md must reference the canonical living build playbook path.'
  }
  if (-not $agentsContent.Contains($objectRegistryRelativePath)) {
    Add-ContractFailure 'Root AGENTS.md must reference the object learning registry path.'
  }
  if ($agentsContent -notmatch '(?s)Review\s+`docs/handoffs/ACTIVE_HANDOFF\.md`\s+before any other repository work in every new Codex session\.') {
    Add-ContractFailure 'Root AGENTS.md must require the session-start handoff review.'
  }
  if (-not $agentsContent.Contains('scripts/verify-living-build-contract.ps1')) {
    Add-ContractFailure 'Root AGENTS.md must invoke the living build verifier.'
  }
  if ($agentsContent -notmatch '(?i)fresh Codex run') {
    Add-ContractFailure 'Root AGENTS.md must state the fresh Codex run boundary for updated worktrees.'
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
      foreach ($requiredSection in @('## GET operation', '## POST operation', '### Response JSON', '### Candidate request JSON', '## Evidence and limits', '## Change history')) {
        if (-not $referenceContent.Contains($requiredSection)) {
          Add-ContractFailure "Object reference $referenceName is missing section: $requiredSection"
        }
      }
    }
  }
}

if ($skillContent) {
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

Write-Output 'Living build contract: PASS'
Write-Output "- Canonical owner: $canonicalRelativePath"
Write-Output "- Object learning registry: $objectRegistryRelativePath"
Write-Output '- Startup entrypoint: AGENTS.md'
Write-Output "- Session-start handoff: $activeHandoffRelativePath"
Write-Output '- AI Studio fallback: .agents/skills/aistudio/SKILL.md'
Write-Output '- Worktree rule: integrate the governance commit and start a fresh Codex run'
Write-Output '- Naming rule: XDX codes, display names, files, branches, and worktrees'
