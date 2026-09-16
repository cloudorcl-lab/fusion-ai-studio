[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$TrackerPath,
  [Parameter(Mandatory)][string]$Activity,
  [Parameter(Mandatory)][string]$Outcome,
  [string]$Elapsed = 'unavailable',
  [string]$Tokens = 'unavailable',
  [string]$AIUnits = 'unavailable',
  [string]$Evidence = 'unavailable'
)

if (-not (Test-Path -LiteralPath $TrackerPath)) { throw "Time tracker does not exist: $TrackerPath" }
function Clean([string]$value) { return ($value -replace '[\r\n|]', ' ').Trim() }
$row = "| $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss K') | $(Clean $Activity) | $(Clean $Elapsed) | $(Clean $Tokens) | $(Clean $AIUnits) | $(Clean $Outcome) | $(Clean $Evidence) |"
Add-Content -LiteralPath $TrackerPath -Value $row
Write-Output "Time record appended: $TrackerPath"
