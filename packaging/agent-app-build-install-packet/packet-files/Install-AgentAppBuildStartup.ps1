[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$PacketRoot,
  [Parameter(Mandatory)][string]$DestinationRoot
)

$ErrorActionPreference = 'Stop'
$packet = (Resolve-Path -LiteralPath $PacketRoot -ErrorAction Stop).Path
& (Join-Path $packet 'Verify-AgentAppBuildInstallPacket.ps1') -PacketRoot $packet

if (-not (Test-Path -LiteralPath $DestinationRoot)) { New-Item -ItemType Directory -Path $DestinationRoot -Force | Out-Null }
$destination = Join-Path ((Resolve-Path -LiteralPath $DestinationRoot).Path) 'agent-app-build-startup'
if (Test-Path -LiteralPath $destination) { throw "Startup package destination already exists: $destination" }

Copy-Item -LiteralPath (Join-Path $packet 'agent-app-build-startup') -Destination $destination -Recurse
& (Join-Path $destination 'scripts\Verify-AgentAppBuildStartup.ps1') -PackageRoot $destination
Write-Output "Agent-app build startup package installed: $destination"
