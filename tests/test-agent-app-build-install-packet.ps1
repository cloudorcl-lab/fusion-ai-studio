[CmdletBinding()]
param([Parameter(Mandatory)][string]$ZipPath)
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
$fixture = Join-Path ([IO.Path]::GetTempPath()) ('xdx-packet-test-' + [guid]::NewGuid())
$prefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if (-not [IO.Path]::GetFullPath($fixture).StartsWith($prefix,[StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe fixture' }
try {
  Expand-Archive -LiteralPath $ZipPath -DestinationPath $fixture
  $packet = Join-Path $fixture 'agent-app-build-install-packet'
  $verify = Join-Path $packet 'Verify-AgentAppBuildInstallPacket.ps1'
  & $verify -PacketRoot $packet
  $manifest = Get-Content -Raw (Join-Path $packet 'PACKET-MANIFEST.json') | ConvertFrom-Json
  foreach ($entry in $manifest.sources) {
    if ((Get-FileHash -LiteralPath (Join-Path $repo $entry.source) -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sourceSha256) { throw "Source drift: $($entry.source)" }
    $transformed = @($manifest.portableReferenceTransforms | Where-Object path -eq $entry.path).Count -gt 0
    if (-not $transformed -and (Get-FileHash -LiteralPath (Join-Path $packet $entry.path) -Algorithm SHA256).Hash.ToLowerInvariant() -ne $entry.sourceSha256) { throw "Source parity failed: $($entry.path)" }
  }
  if (@($manifest.payload | Where-Object { $_.path -match '(^|/)(env\.properties|docs/builds|\.git|node_modules)(/|$)' }).Count) { throw 'Excluded state packaged' }
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
  foreach ($command in @('tests/test-session-compliance.cjs','scripts/tests/verify-agentic-app-query-contract.cjs')) {
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
