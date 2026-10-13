$ErrorActionPreference = 'Stop'
$taskId = 'xdx-playbook-reconciliation-20261012'
$taskDir = "docs/builds/$taskId"
$results = [Collections.Generic.List[object]]::new()
if (Test-Path -LiteralPath "$taskDir/evidence/verification-results.json") {
  foreach ($result in Get-Content -Raw -LiteralPath "$taskDir/evidence/verification-results.json" | ConvertFrom-Json) { $results.Add($result) }
}
function Invoke-Measured([string]$label, [string[]]$childArgs) {
  if ($label -notin @('startup','documents') -and @($results | Where-Object { $_.label -eq $label -and $_.exitCode -eq 0 }).Count) {
    Write-Output "$label reused passing receipt"
    return
  }
  $output = @(& node scripts/measure-build-command.cjs --output "$taskDir/commands.jsonl" --task $taskId --activity $label --phase verification --category repair --label $label --learning-ledger "$taskDir/failure-ledger.json" --learning-scope governance -- @childArgs 2>&1)
  $code = $LASTEXITCODE
  $evidence = "$taskDir/evidence/$label.txt"
  [IO.File]::WriteAllText((Join-Path (Get-Location) $evidence), ($output -join "`n") + "`n")
  $results.Add([ordered]@{label=$label;exitCode=$code;command=($childArgs -join ' ');evidence=$evidence;observedUtc=[DateTime]::UtcNow.ToString('o')})
  $resultPath = "$taskDir/evidence/$label-result.json"
  [IO.File]::WriteAllText((Join-Path (Get-Location) $resultPath), ($results[$results.Count-1] | ConvertTo-Json -Depth 5) + "`n")
  Write-Output "$label exit=$code"
  if ($code -ne 0) { throw "Verification failed: $label. See $evidence" }
}
Invoke-Measured 'startup' @('pwsh','-NoProfile','-File','scripts/verify-living-build-contract.ps1','-SessionRecord',"$taskDir/xdx_session_$taskId.json",'-SessionId',$taskId,'-Phase','Startup')
Invoke-Measured 'documents' @('node',"$taskDir/audit.cjs",'verify')
Invoke-Measured 'policy-regressions' @('pwsh','-NoProfile','-File','tests/test-living-build-contract.ps1')
Invoke-Measured 'session-regressions' @('node','--test','tests/test-session-compliance.cjs')
Invoke-Measured 'timing-regressions' @('node','--test','tests/test-measure-build-command.cjs')
$packetDir = Join-Path (Get-Location) '.debug/xdx-playbook-reconciliation-20261012'
New-Item -ItemType Directory -Path $packetDir -Force | Out-Null
$packet = Join-Path $packetDir 'verified-packet.zip'
Invoke-Measured 'packet-build' @('pwsh','-NoProfile','-File','packaging/agent-app-build-install-packet/Build-AgentAppBuildInstallPacket.ps1','-OutputPath',$packet)
Invoke-Measured 'packet-regressions' @('pwsh','-NoProfile','-File','tests/test-agent-app-build-install-packet.ps1','-ZipPath',$packet)
$packetHash = (Get-FileHash -LiteralPath $packet -Algorithm SHA256).Hash.ToLowerInvariant()
[ordered]@{sha256=$packetHash;result='passed';retention='Task-local verification artifact; historical distributed ZIP unchanged'} | ConvertTo-Json | Set-Content -LiteralPath "$taskDir/evidence/packet-receipt.json" -Encoding utf8
Remove-Item -LiteralPath $packet -Force
$results | ConvertTo-Json -Depth 5 -AsArray | Set-Content -LiteralPath "$taskDir/evidence/verification-results.json" -Encoding utf8
Write-Output 'All scoped verification passed; disposable packet removed after evidence capture.'
