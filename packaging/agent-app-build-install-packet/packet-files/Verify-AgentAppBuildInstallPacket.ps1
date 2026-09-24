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
foreach ($relative in @(
  'AGENTS.md', 'docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',
  'docs/handoffs/ACTIVE_HANDOFF.md', 'scripts/verify-living-build-contract.ps1',
  'tests/test-living-build-contract.ps1', 'scripts/verify-session-compliance.cjs', 'tests/test-session-compliance.cjs',
  'scripts/verify-agentic-app-query-contract.cjs','scripts/tests/verify-agentic-app-query-contract.cjs',
  'docs/lessons/objects/README.md','docs/build-models/object-lifecycle/v1.0.1/execution-prompt.md',
  'docs/build-models/artifact-purge/v1.0.1/purge-prompt.md', '.agents/skills/aistudio/SKILL.md',
  '.agents/skills/aistudio/scripts/aistudio.js',
  '.agents/skills/aistudio/references/prompts/index.md',
  '.agents/skills/aistudio/resources/app-samples/index.md'
)) {
  if (($seedPrefix + $relative) -notin $listedPaths) { throw "Missing required seed payload: $relative" }
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
