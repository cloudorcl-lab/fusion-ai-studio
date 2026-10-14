[CmdletBinding()]
param([Parameter(Mandatory)][string]$PacketRoot)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path -LiteralPath $PacketRoot -ErrorAction Stop).Path
$manifestPath = Join-Path $root 'PACKET-MANIFEST.json'
if (-not (Test-Path -LiteralPath $manifestPath)) { throw "Packet manifest does not exist: $manifestPath" }

foreach ($required in @('INSTALL.md', 'Install-AgentAppBuildStartup.ps1', 'Verify-AgentAppBuildInstallPacket.ps1', 'agent-app-build-startup')) {
  if (-not (Test-Path -LiteralPath (Join-Path $root $required))) { throw "Missing required packet artifact: $required" }
}

$manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
if ($manifest.schemaVersion -ne 1 -or $manifest.packetName -ne 'agent-app-build-install-packet') { throw 'Unsupported packet manifest.' }
if (-not $manifest.payload -or $manifest.payload.Count -eq 0) { throw 'Packet manifest has no payload entries.' }
$listedPaths = @($manifest.payload | ForEach-Object { $_.path })
$seedPrefix = 'agent-app-build-startup/repository-seed/'
$modelIndex = 'docs/build-models/object-lifecycle/README.md'
if (($seedPrefix + $modelIndex) -notin $listedPaths) { throw "Missing required seed payload: $modelIndex" }
$modelIndexText = [IO.File]::ReadAllText((Join-Path $root ($seedPrefix + $modelIndex)))
$modelMatches = [regex]::Matches($modelIndexText, '(?m)^Current version: \*\*(\d+\.\d+\.\d+)\*\*')
if ($modelMatches.Count -ne 1) { throw 'Object lifecycle index must declare exactly one current version.' }
$objectLifecycleVersion = $modelMatches[0].Groups[1].Value
if ($manifest.models.objectLifecycle -cne $objectLifecycleVersion) { throw 'Object lifecycle manifest version differs from canonical current version.' }
$selectedModelFiles = @('plan-template.md','execution-prompt.md','supplier-worked-example.md') | ForEach-Object { "docs/build-models/object-lifecycle/v$objectLifecycleVersion/$_" }
foreach ($relative in @(
  'AGENTS.md', 'BUILD_STANDARD.md', 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',
  'docs/handoffs/ACTIVE_HANDOFF.md', 'scripts/verify-living-build-contract.ps1',
  'tests/test-living-build-contract.ps1', 'scripts/verify-session-compliance.cjs', 'tests/test-session-compliance.cjs',
  'scripts/verify-agentic-app-query-contract.cjs','scripts/tests/verify-agentic-app-query-contract.cjs',
  'scripts/verify-bo-search-contract.cjs','scripts/verify-bo-search-contract.test.cjs',
  'scripts/verify-build-learning.cjs','scripts/tests/verify-build-learning.cjs',
  'scripts/workflow-test-continuation.cjs','scripts/tests/workflow-test-continuation.cjs',
  'scripts/parse-aistudio-json.cjs','scripts/tests/parse-aistudio-json.cjs',
  'scripts/verify-workflow-test-capture-policy.cjs','scripts/tests/verify-workflow-test-capture-policy.cjs',
  'scripts/update-build-learning.cjs','scripts/tests/update-build-learning.cjs',
  'scripts/plan-affected-workflow-tests.cjs','scripts/measure-build-command.cjs',
  'scripts/build-timing-report.cjs','scripts/screen-model-candidate.cjs','scripts/build-evidence-status.cjs',
  'scripts/refresh-test-report-provenance.cjs','scripts/capture-native-evidence.cjs',
    'tests/test-workflow-runtime-path-candidate.cjs','tests/test-workflow-runtime-path-recording.cjs','tests/test-workflow-runtime-path-metadata.cjs','tests/fixtures/workflow-runtime-path-retained.json',
    'tests/test-affected-workflow-tests.cjs','tests/test-measure-build-command.cjs','tests/test-workflow-terminal.cjs',
    'tests/test-build-timing-report.cjs','tests/test-build-evidence.cjs','tests/test-report-provenance.cjs','tests/test-native-evidence.cjs',
    'docs/lessons/objects/README.md',
  'docs/build-models/artifact-purge/v1.0.1/purge-prompt.md', '.agents/skills/aistudio/SKILL.md',
  '.agents/skills/aistudio/scripts/aistudio.js',
  '.agents/skills/aistudio/references/prompts/index.md',
  '.agents/skills/aistudio/resources/app-samples/index.md'
) + $selectedModelFiles) {
  if (($seedPrefix + $relative) -notin $listedPaths) { throw "Missing required seed payload: $relative" }
}

foreach ($relative in $selectedModelFiles) {
  $modelText = [IO.File]::ReadAllText((Join-Path $root ($seedPrefix + $relative)))
  $versions = [regex]::Matches($modelText, '(?m)^Model version: \*\*(\d+\.\d+\.\d+)\*\*')
  if ($versions.Count -ne 1 -or $versions[0].Groups[1].Value -cne $objectLifecycleVersion) { throw "Object lifecycle model metadata mismatch: $relative" }
  $filename = [IO.Path]::GetFileName($relative)
  if (-not $modelIndexText.Contains("(v$objectLifecycleVersion/$filename)")) { throw "Object lifecycle current index link missing: $relative" }
  if ($filename -eq 'execution-prompt.md') {
    $promptVersions = [regex]::Matches($modelText, '(?m)^MODEL_VERSION=(\d+\.\d+\.\d+)\r?$')
    if ($promptVersions.Count -ne 1 -or $promptVersions[0].Groups[1].Value -cne $objectLifecycleVersion) { throw 'Object lifecycle execution prompt version mismatch.' }
  }
}
if (@($listedPaths | Select-Object -Unique).Count -ne $listedPaths.Count) { throw 'Duplicate packet manifest paths.' }
$actualPaths = @(Get-ChildItem -LiteralPath $root -Recurse -File -Force | ForEach-Object {
  [IO.Path]::GetRelativePath($root, $_.FullName).Replace('\', '/')
} | Where-Object { $_ -ne 'PACKET-MANIFEST.json' })
if (Compare-Object $listedPaths $actualPaths) { throw 'Packet file inventory differs from manifest.' }
foreach ($entry in $manifest.payload) {
  if ([string]::IsNullOrWhiteSpace($entry.path) -or [IO.Path]::IsPathRooted($entry.path) -or $entry.path -match '(^|[\\/])\.\.([\\/]|$)') {
    throw "Unsafe packet manifest path: $($entry.path)"
  }
  $path = Join-Path $root $entry.path
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Missing packet payload file: $($entry.path)" }
  $actual = (Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash.ToLowerInvariant()
  if ($actual -ne $entry.sha256) { throw "Packet payload hash mismatch: $($entry.path)" }
}

& (Join-Path $root 'agent-app-build-startup\scripts\Verify-AgentAppBuildStartup.ps1') -PackageRoot (Join-Path $root 'agent-app-build-startup')
$seed = Join-Path $root 'agent-app-build-startup/repository-seed'
if ((Get-Content -Raw -LiteralPath (Join-Path $seed 'AGENTS.md')) -match '(?m)^## Standing user approval — testing sign-in') {
  throw 'Repository-specific standing sign-in approval must not be distributed.'
}
& pwsh -NoProfile -File (Join-Path $seed 'scripts/verify-living-build-contract.ps1') -RepoRoot $seed -PolicyOnly
if ($LASTEXITCODE -ne 0) { throw 'Packaged living build contract failed.' }
# Every local link in the canonical playbook must resolve within the delivered seed.
$playbook = Join-Path $seed 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md'
foreach ($match in [regex]::Matches((Get-Content -Raw -LiteralPath $playbook), '\[[^\]]+\]\(([^)]+)\)')) {
  $link = $match.Groups[1].Value
  if ($link -match '^(https?://|#)') { continue }
  $linkedPath = Join-Path (Split-Path -Parent $playbook) ($link -split '#')[0]
  if (-not (Test-Path -LiteralPath $linkedPath)) { throw "Missing playbook dependency: $link" }
}
Write-Output 'Agent-app build install packet: PASS'
