$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$helper = Join-Path $root 'agent-app-build-startup/scripts/Add-BuildTimeRecord.ps1'
$tracker = Join-Path ([IO.Path]::GetTempPath()) ([IO.Path]::GetRandomFileName())
try {
  Copy-Item -LiteralPath (Join-Path $root 'agent-app-build-startup/templates/time-tracker.md') -Destination $tracker
  $before = Get-Content -Raw -LiteralPath $tracker
  & $helper -TrackerPath $tracker -Activity "build|one`nline" -Outcome 'passed'
  & $helper -TrackerPath $tracker -Activity 'test two' -Outcome 'passed'
  $after = Get-Content -Raw -LiteralPath $tracker
  $parts = $after -split '## Activity intervals', 2
  if ($parts.Count -ne 2 -or ($parts[1] -replace '\r', '') -ne (($before -split '## Activity intervals', 2)[1] -replace '\r', '')) { throw 'Interval section changed' }
  $rows = @($parts[0] -split "`r?`n" | Where-Object { $_ -match '^\| \d{4}-' })
  if ($rows.Count -ne 2) { throw 'Summary rows misplaced or lost' }
  foreach ($row in $rows) {
    if ($row -notmatch '^\| \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \|' -or ($row.ToCharArray() | Where-Object { $_ -eq '|' }).Count -ne 8) { throw 'Invalid UTC or escaped row' }
  }
  Set-Content -LiteralPath $tracker -Value 'No summary table'
  $original = [IO.File]::ReadAllText($tracker)
  $rejected = $false
  try { & $helper -TrackerPath $tracker -Activity 'invalid' -Outcome 'invalid' } catch { $rejected = $true }
  if (-not $rejected -or [IO.File]::ReadAllText($tracker) -ne $original) { throw 'Malformed tracker was modified' }
  'Build time helper: PASS (placement, repeated append, UTC, escaping, invalid tracker unchanged)'
} finally { Remove-Item -LiteralPath $tracker -ErrorAction SilentlyContinue }
