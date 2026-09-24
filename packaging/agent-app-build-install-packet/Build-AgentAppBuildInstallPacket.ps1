[CmdletBinding()]
param([Parameter(Mandatory)][string]$OutputPath)
$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '../..')).Path
$output = [IO.Path]::GetFullPath($OutputPath)
if (Test-Path -LiteralPath $output) { throw "Output already exists: $output" }
$stage = Join-Path ([IO.Path]::GetTempPath()) ('xdx-packet-' + [guid]::NewGuid())
$tempPrefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if (-not [IO.Path]::GetFullPath($stage).StartsWith($tempPrefix, [StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe staging path' }
try {
  $packet = Join-Path $stage 'agent-app-build-install-packet'
  $seed = Join-Path $packet 'agent-app-build-startup/repository-seed'
  New-Item -ItemType Directory -Path $seed -Force | Out-Null
  $provenance = [Collections.Generic.List[object]]::new()
  function Copy-Source([string]$relative, [string]$target) {
    $source = Join-Path $repo $relative
    New-Item -ItemType Directory -Path (Split-Path -Parent $target) -Force | Out-Null
    Copy-Item -LiteralPath $source -Destination $target
    $provenance.Add([ordered]@{path=[IO.Path]::GetRelativePath($packet,$target).Replace('\','/'); source=$relative; sourceSha256=(Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant()})
  }
  $startupFiles = @(& git -C $repo ls-files -- agent-app-build-startup)
  if ($LASTEXITCODE -ne 0) { throw 'Startup inventory failed' }
  foreach ($relative in $startupFiles) {
    if ($relative -like 'agent-app-build-startup/repository-seed/*') { continue }
    Copy-Source $relative (Join-Path $packet $relative)
  }
  $canonical = @('AGENTS.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md',
    'scripts/verify-living-build-contract.ps1','scripts/verify-session-compliance.cjs',
    'scripts/verify-agentic-app-query-contract.cjs','scripts/tests/verify-agentic-app-query-contract.cjs',
    'tests/test-living-build-contract.ps1','tests/test-session-compliance.cjs','tests/test-build-time-record.ps1')
  $dependencies = @(& git -C $repo ls-files -- .agents/skills/aistudio docs/lessons/objects docs/build-models)
  if ($LASTEXITCODE -ne 0) { throw 'Dependency inventory failed' }
  foreach ($relative in @($canonical) + @($dependencies)) { Copy-Source $relative (Join-Path $seed $relative) }
  Copy-Source 'agent-app-build-startup/templates/active-handoff.md' (Join-Path $seed 'docs/handoffs/ACTIVE_HANDOFF.md')
  foreach ($name in @('INSTALL.md','Install-AgentAppBuildStartup.ps1','Verify-AgentAppBuildInstallPacket.ps1')) {
    Copy-Source "packaging/agent-app-build-install-packet/packet-files/$name" (Join-Path $packet $name)
  }
  # Historical build receipts are not distributable dependencies. Preserve their
  # labels and original paths as source-only references, never as broken links.
  $transforms = [Collections.Generic.List[object]]::new()
  foreach ($file in Get-ChildItem -LiteralPath $packet -Recurse -File -Force -Filter '*.md') {
    $original = [IO.File]::ReadAllText($file.FullName)
    $updated = [regex]::Replace($original, '\[([^\]]+)\]\(([^)]+)\)', {
      param($m)
      $link = ($m.Groups[2].Value -split '#')[0]
      if (-not $link -or $link -match '^(https?://|mailto:|<)' -or $link.Contains('<')) { return $m.Value }
      $resolved = [IO.Path]::GetFullPath((Join-Path $file.DirectoryName $link))
      # Startup links in seeded models resolve after activation at the target root.
      $activated = $resolved.Replace($seed, $packet)
      if ((Test-Path -LiteralPath $resolved) -or ($resolved.StartsWith($seed) -and (Test-Path -LiteralPath $activated))) { return $m.Value }
      $sourceRelative = [IO.Path]::GetRelativePath($seed, $resolved).Replace('\','/')
      if ($sourceRelative -notmatch '^(docs/builds/|src/)') { throw "Unresolved portable dependency: $link in $($file.FullName)" }
      $transforms.Add([ordered]@{path=[IO.Path]::GetRelativePath($packet,$file.FullName).Replace('\','/');link=$m.Groups[2].Value;reason='Source-only reference; target is not in portable payload'})
      return ($m.Groups[1].Value + ' (source-only reference: ' + $m.Groups[2].Value + ')')
    })
    if ($updated -ne $original) { [IO.File]::WriteAllText($file.FullName,$updated) }
  }
  $commit = (& git -C $repo rev-parse HEAD).Trim()
  if ($LASTEXITCODE -ne 0) { throw 'Source commit unavailable' }
  $payload = @(Get-ChildItem -LiteralPath $packet -Recurse -File -Force | Sort-Object FullName | ForEach-Object {
    [ordered]@{path=[IO.Path]::GetRelativePath($packet,$_.FullName).Replace('\','/');sha256=(Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()}
  })
  [ordered]@{schemaVersion=1;packetName='agent-app-build-install-packet';generatedAtUtc=[DateTime]::UtcNow.ToString('o');sourceCommit=$commit;sourceState='Working source snapshot; per-file source hashes authoritative';models=@{objectLifecycle='1.0.1';artifactPurge='1.0.1'};sources=@($provenance);portableReferenceTransforms=@($transforms);payload=$payload} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $packet 'PACKET-MANIFEST.json') -Encoding utf8
  & (Join-Path $packet 'Verify-AgentAppBuildInstallPacket.ps1') -PacketRoot $packet
  New-Item -ItemType Directory -Path (Split-Path -Parent $output) -Force | Out-Null
  [IO.Compression.ZipFile]::CreateFromDirectory($stage,$output)
  "Created: $output"
} finally { if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force } }
