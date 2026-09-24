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
$row = "| $([DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ss.fffZ')) | $(Clean $Activity) | $(Clean $Elapsed) | $(Clean $Tokens) | $(Clean $AIUnits) | $(Clean $Outcome) | $(Clean $Evidence) |"
$lines = [Collections.Generic.List[string]]::new()
$lines.AddRange([string[]](Get-Content -LiteralPath $TrackerPath))
$header = '| Timestamp | Activity | Elapsed | Tokens | AI Units | Outcome | Evidence |'
$index = $lines.IndexOf($header)
if ($index -lt 0 -or $index + 1 -ge $lines.Count -or $lines[$index + 1] -notmatch '^\|[ :|-]+\|$') {
  throw 'Expected summary table header and separator are missing; tracker unchanged.'
}
$insert = $index + 2
while ($insert -lt $lines.Count -and $lines[$insert].StartsWith('|')) { $insert++ }
$lines.Insert($insert, $row)
Set-Content -LiteralPath $TrackerPath -Value $lines
Write-Output "Time record appended: $TrackerPath"
