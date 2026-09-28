[CmdletBinding()]
param([Parameter(Mandatory)][string]$ZipPath)
$ErrorActionPreference = 'Stop'
$fixture = Join-Path ([IO.Path]::GetTempPath()) ('xdx-packet-model-test-' + [guid]::NewGuid())
$prefix = [IO.Path]::GetFullPath([IO.Path]::GetTempPath()).TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
if (-not [IO.Path]::GetFullPath($fixture).StartsWith($prefix,[StringComparison]::OrdinalIgnoreCase)) { throw 'Unsafe fixture' }
$checks = 0
try {
  Expand-Archive -LiteralPath $ZipPath -DestinationPath $fixture
  $packet = Join-Path $fixture 'agent-app-build-install-packet'
  $verify = Join-Path $packet 'Verify-AgentAppBuildInstallPacket.ps1'
  $manifestPath = Join-Path $packet 'PACKET-MANIFEST.json'
  $manifestBytes = [IO.File]::ReadAllBytes($manifestPath)
  $manifest = Get-Content -Raw -LiteralPath $manifestPath | ConvertFrom-Json
  $seedPrefix = 'agent-app-build-startup/repository-seed/'
  $index = Get-Content -Raw -LiteralPath (Join-Path $packet ($seedPrefix + 'docs/build-models/object-lifecycle/README.md'))
  $version = [regex]::Match($index,'(?m)^Current version: \*\*(\d+\.\d+\.\d+)\*\*').Groups[1].Value
  if (-not $version -or $manifest.models.objectLifecycle -cne $version) { throw 'Builder did not select canonical current version.' }
  if ($manifest.models.artifactPurge -ne '1.0.1') { throw 'Independent artifact-purge version was changed.' }
  & $verify -PacketRoot $packet | Out-Null
  $checks++
  function Reject-Mutation([string]$expected) {
    $rejected = $false
    try { & $verify -PacketRoot $packet | Out-Null } catch {
      if ($_.Exception.Message -eq $expected) { $rejected = $true } else { throw }
    }
    if (-not $rejected) { throw "Model contract mutation was accepted: $expected" }
  }
  try {
    $manifest.models.objectLifecycle = '0.0.0'
    $manifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding utf8
    Reject-Mutation 'Object lifecycle manifest version differs from canonical current version.'
    $checks++
  } finally { [IO.File]::WriteAllBytes($manifestPath,$manifestBytes) }
  foreach ($name in @('plan-template.md','execution-prompt.md','supplier-worked-example.md')) {
    $relative = "docs/build-models/object-lifecycle/v$version/$name"
    $payloadPath = $seedPrefix + $relative
    $file = Join-Path $packet $payloadPath
    $bytes = [IO.File]::ReadAllBytes($file)
    try {
      Remove-Item -LiteralPath $file
      $mutated = [Text.Encoding]::UTF8.GetString($manifestBytes) | ConvertFrom-Json
      $mutated.payload = @($mutated.payload | Where-Object path -ne $payloadPath)
      $mutated | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding utf8
      Reject-Mutation "Missing required seed payload: $relative"
      $checks++
    } finally { [IO.File]::WriteAllBytes($file,$bytes); [IO.File]::WriteAllBytes($manifestPath,$manifestBytes) }
    try {
      $text = [IO.File]::ReadAllText($file).Replace("Model version: **$version**",'Model version: **0.0.0**')
      [IO.File]::WriteAllText($file,$text)
      $mutated = [Text.Encoding]::UTF8.GetString($manifestBytes) | ConvertFrom-Json
      ($mutated.payload | Where-Object path -eq $payloadPath).sha256 = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()
      $mutated | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding utf8
      Reject-Mutation "Object lifecycle model metadata mismatch: $relative"
      $checks++
    } finally { [IO.File]::WriteAllBytes($file,$bytes); [IO.File]::WriteAllBytes($manifestPath,$manifestBytes) }
    if ($name -eq 'execution-prompt.md') {
      try {
        [IO.File]::WriteAllText($file,[IO.File]::ReadAllText($file).Replace("MODEL_VERSION=$version",'MODEL_VERSION=0.0.0'))
        $mutated = [Text.Encoding]::UTF8.GetString($manifestBytes) | ConvertFrom-Json
        ($mutated.payload | Where-Object path -eq $payloadPath).sha256 = (Get-FileHash -LiteralPath $file -Algorithm SHA256).Hash.ToLowerInvariant()
        $mutated | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $manifestPath -Encoding utf8
        Reject-Mutation 'Object lifecycle execution prompt version mismatch.'
        $checks++
      } finally { [IO.File]::WriteAllBytes($file,$bytes); [IO.File]::WriteAllBytes($manifestPath,$manifestBytes) }
    }
  }
  Write-Output "Packet model contract: $checks checks PASS; canonical object lifecycle $version; artifact-purge remains independent."
} finally { if (Test-Path -LiteralPath $fixture) { Remove-Item -LiteralPath $fixture -Recurse -Force } }
