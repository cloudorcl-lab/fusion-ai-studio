[CmdletBinding()]
param([Parameter(Mandatory)][string]$ZipPath)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
& (Join-Path $PSScriptRoot 'test-agent-app-build-packet-models.ps1') -ZipPath $ZipPath
$fixture = Join-Path ([IO.Path]::GetTempPath()) ('xdx-packet-test-' + [guid]::NewGuid())
$prefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if (-not [IO.Path]::GetFullPath($fixture).StartsWith($prefix,[StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe fixture' }
function Assert-SourceParity([string]$sourcePath, $entry) {
    if ((Get-FileHash -LiteralPath $sourcePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sourceSha256) {
      # Git may change text line endings at checkout. Payload bytes remain strictly
      # hash-checked; only source comparison permits equivalent LF/CRLF text.
      $normalized = [IO.File]::ReadAllText($sourcePath).Replace("`r`n", "`n")
      $textHash = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($normalized))).ToLowerInvariant()
      if (-not $entry.sourceTextSha256 -or $textHash -ne $entry.sourceTextSha256) { throw "Source drift: $($entry.source)" }
    }
}
try {
  Expand-Archive -LiteralPath $ZipPath -DestinationPath $fixture
  $sourceFixture = Join-Path $fixture 'source-line-endings.txt'
  [IO.File]::WriteAllText($sourceFixture, "first`nsecond`n")
  $hash = (Get-FileHash $sourceFixture -Algorithm SHA256).Hash.ToLowerInvariant()
  $sourceEntry = [pscustomobject]@{source='fixture';sourceSha256=$hash;sourceTextSha256=$hash}
  Assert-SourceParity $sourceFixture $sourceEntry
  [IO.File]::WriteAllText($sourceFixture, "first`r`nsecond`r`n")
  Assert-SourceParity $sourceFixture $sourceEntry
  [IO.File]::WriteAllText($sourceFixture, "first`r`nchanged`r`n")
  $driftRejected = $false
  try { Assert-SourceParity $sourceFixture $sourceEntry } catch { if ($_.Exception.Message -match 'Source drift') { $driftRejected = $true } else { throw } }
  if (-not $driftRejected) { throw 'Substantive source change accepted' }
  $packet = Join-Path $fixture 'agent-app-build-install-packet'
  $verify = Join-Path $packet 'Verify-AgentAppBuildInstallPacket.ps1'
  & $verify -PacketRoot $packet
  $manifest = Get-Content -Raw (Join-Path $packet 'PACKET-MANIFEST.json') | ConvertFrom-Json
  foreach ($entry in $manifest.sources) {
    Assert-SourceParity (Join-Path $repo $entry.source) $entry
    $transformed = @($manifest.portableReferenceTransforms | Where-Object path -eq $entry.path).Count -gt 0
    if (-not $transformed -and (Get-FileHash -LiteralPath (Join-Path $packet $entry.path) -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sourceSha256) { throw "Source parity failed: $($entry.path)" }
  }
  if (@($manifest.payload | Where-Object { $_.path -match '(^|/)(env\.properties|docs/builds|\.git|node_modules)(/|$)' }).Count) { throw 'Excluded state packaged' }
  $portableAgents = Get-Content -Raw -LiteralPath (Join-Path $packet 'agent-app-build-startup/repository-seed/AGENTS.md')
  if ($portableAgents -match 'Standing user approval — testing sign-in|user authorizes login and reauthentication') { throw 'Repository-specific sign-in authority exported' }
  $sourceAgents = Get-Content -Raw -LiteralPath (Join-Path $repo 'AGENTS.md')
  if ($sourceAgents -match '(?m)^## Standing user approval — testing sign-in') {
    if (@($manifest.portableReferenceTransforms | Where-Object { $_.path -eq 'agent-app-build-startup/repository-seed/AGENTS.md' -and $_.section -eq 'Standing user approval — testing sign-in' }).Count -ne 1) { throw 'Missing local-authority transformation provenance' }
  }
  # Independently reject an omitted tool/test even when its manifest entry was
  # also removed. Hash checks alone cannot discover a missing dependency.
  $manifestPath = Join-Path $packet 'PACKET-MANIFEST.json'
  $manifestBytes = [IO.File]::ReadAllBytes($manifestPath)
  $agentsRelative = 'agent-app-build-startup/repository-seed/AGENTS.md'
  $agentsPath = Join-Path $packet $agentsRelative
  $agentsBytes = [IO.File]::ReadAllBytes($agentsPath)
  try {
    Add-Content -LiteralPath $agentsPath -Value "`n## Standing user approval — testing sign-in`nLocal-only test approval."
    $mutated = [Text.Encoding]::UTF8.GetString($manifestBytes) | ConvertFrom-Json
    ($mutated.payload | Where-Object path -eq $agentsRelative).sha256 = (Get-FileHash -LiteralPath $agentsPath -Algorithm SHA256).Hash.ToLowerInvariant()
    $mutated | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding utf8
    $rejected = $false
    try { & $verify -PacketRoot $packet } catch {
      if ($_.Exception.Message -eq 'Repository-specific standing sign-in approval must not be distributed.') { $rejected = $true } else { throw }
    }
    if (-not $rejected) { throw 'Exported local authority accepted with refreshed manifest hash' }
  } finally {
    [IO.File]::WriteAllBytes($agentsPath,$agentsBytes)
    [IO.File]::WriteAllBytes($manifestPath,$manifestBytes)
  }
  foreach ($dependency in @('tests/test-workflow-runtime-path-candidate.cjs','tests/test-workflow-runtime-path-recording.cjs','tests/test-workflow-runtime-path-metadata.cjs','tests/fixtures/workflow-runtime-path-retained.json',
    'scripts/verify-workflow-test-capture-policy.cjs','scripts/tests/verify-workflow-test-capture-policy.cjs',
    'scripts/workflow-test-continuation.cjs','scripts/tests/workflow-test-continuation.cjs',
    'scripts/build-timing-report.cjs','scripts/screen-model-candidate.cjs','scripts/build-evidence-status.cjs',
    'scripts/refresh-test-report-provenance.cjs','scripts/capture-native-evidence.cjs',
    'tests/test-build-timing-report.cjs','tests/test-build-evidence.cjs','tests/test-report-provenance.cjs','tests/test-native-evidence.cjs')) {
    $relative = 'agent-app-build-startup/repository-seed/' + $dependency
    $dependencyPath = Join-Path $packet $relative
    $dependencyBytes = [IO.File]::ReadAllBytes($dependencyPath)
    try {
      Remove-Item -LiteralPath $dependencyPath
      $mutated = [Text.Encoding]::UTF8.GetString($manifestBytes) | ConvertFrom-Json
      $mutated.payload = @($mutated.payload | Where-Object path -ne $relative)
      $mutated | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding utf8
      $rejected = $false
      try { & $verify -PacketRoot $packet } catch {
        if ($_.Exception.Message -eq "Missing required seed payload: $dependency") { $rejected = $true } else { throw }
      }
      if (-not $rejected) { throw "Missing dependency accepted: $dependency" }
    } finally {
      [IO.File]::WriteAllBytes($dependencyPath,$dependencyBytes)
      [IO.File]::WriteAllBytes($manifestPath,$manifestBytes)
    }
  }
  $install = Join-Path $fixture 'installed'
  $installer = Join-Path $packet 'Install-AgentAppBuildStartup.ps1'
  & $installer -PacketRoot $packet -DestinationRoot $install
  foreach ($entry in $manifest.payload | Where-Object { $_.path.StartsWith('agent-app-build-startup/') }) {
    if ((Get-FileHash -LiteralPath (Join-Path $install $entry.path)).Hash.ToLowerInvariant() -ne $entry.sha256) { throw 'Installed parity failed' }
  }
  $refused = $false
  try { & $installer -PacketRoot $packet -DestinationRoot $install } catch { if ($_.Exception.Message -match 'destination already exists') { $refused = $true } else { throw } }
  if (-not $refused) { throw 'Existing destination accepted' }
  $seed = Join-Path $install 'agent-app-build-startup/repository-seed'
  Get-ChildItem -LiteralPath $seed -Force | Copy-Item -Destination $install -Recurse
  foreach ($command in @('tests/test-living-build-contract.ps1','tests/test-build-time-record.ps1')) {
    & pwsh -NoProfile -File (Join-Path $install $command)
    if ($LASTEXITCODE -ne 0) { throw "Activated test failed: $command" }
  }
  foreach ($command in @('tests/test-workflow-runtime-path-candidate.cjs','tests/test-workflow-runtime-path-recording.cjs','tests/test-workflow-runtime-path-metadata.cjs',
    'scripts/tests/verify-workflow-test-capture-policy.cjs',
    'scripts/tests/workflow-test-continuation.cjs','tests/test-session-compliance.cjs','scripts/tests/verify-agentic-app-query-contract.cjs','tests/test-affected-workflow-tests.cjs','tests/test-measure-build-command.cjs','tests/test-workflow-terminal.cjs',
    'tests/test-build-timing-report.cjs','tests/test-build-evidence.cjs','tests/test-report-provenance.cjs','tests/test-native-evidence.cjs')) {
    & node (Join-Path $install $command)
    if ($LASTEXITCODE -ne 0) { throw "Activated test failed: $command" }
  }
  $target = Join-Path $packet 'agent-app-build-startup/AGENTS.md'
  $bytes = [IO.File]::ReadAllBytes($target)
  Add-Content -LiteralPath $target -Value 'tampered'
  $rejected = $false
  try { & $verify -PacketRoot $packet } catch { if ($_.Exception.Message -match 'hash mismatch') { $rejected = $true } else { throw } }
  if (-not $rejected) { throw 'Tampering accepted' }
  [IO.File]::WriteAllBytes($target,$bytes)
  $extra = Join-Path $packet 'unexpected.txt'
  Set-Content -LiteralPath $extra -Value 'unexpected'
  $rejected = $false
  try { & $verify -PacketRoot $packet } catch { if ($_.Exception.Message -match 'inventory differs') { $rejected = $true } else { throw } }
  if (-not $rejected) { throw 'Unexpected payload accepted' }
  Remove-Item -LiteralPath $extra
  "Install packet regression: PASS; $($manifest.payload.Count) payload files; source/installed parity, activation checks, overwrite refusal, tamper and extra-file rejection."
} finally { if (Test-Path -LiteralPath $fixture) { Remove-Item -LiteralPath $fixture -Recurse -Force } }
