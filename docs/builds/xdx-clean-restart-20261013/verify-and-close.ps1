$ErrorActionPreference='Stop'
$b='docs/builds/xdx-clean-restart-20261013'
$archive=(Get-Content -Raw "$b/evidence/preservation.json"|ConvertFrom-Json).archive
$plan=Get-Content -Raw (Join-Path $archive 'plan.json')|ConvertFrom-Json
Copy-Item -LiteralPath .git/config -Destination (Join-Path $archive 'git-config-before-reference-cleanup')
foreach($branch in $plan.branches){
 $section='branch.'+$branch.ref.Substring(11)
 $keys=@(& git config --local --name-only --get-regexp ('^'+[regex]::Escape($section)+'\.'))
 if($keys.Count){& git config --local --remove-section $section;if($LASTEXITCODE -ne 0){throw 'Retired branch config cleanup failed'}}
}
function Measure-Local([string]$activity,[string]$label,[string[]]$child){
 & node scripts/measure-build-command.cjs --output "$b/commands.jsonl" --task xdx-clean-restart-20261013 --activity $activity --phase verification --category test --label $label --learning-ledger "$b/failure-ledger.json" --learning-scope purge -- @child
 if($LASTEXITCODE -ne 0){throw "Verification failed: $activity"}
}
& node "$b/record.cjs" refresh
& pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -SessionRecord "$b/xdx_session_xdx-clean-restart-20261013.json" -SessionId xdx-clean-restart-20261013 -Phase Startup
if($LASTEXITCODE -ne 0){throw 'Refreshed Startup failed'}
Measure-Local 'purge-verification' 'protected-state-and-absence' @('node',"$b/verify.cjs")
Measure-Local 'startup-package' 'retained-startup-package' @('pwsh','-NoProfile','-File','agent-app-build-startup/scripts/Verify-AgentAppBuildStartup.ps1')
Measure-Local 'query-gate-regression' 'retained-query-gate' @('node','scripts/tests/verify-agentic-app-query-contract.cjs')
Measure-Local 'session-regression' 'retained-session-gate' @('node','tests/test-session-compliance.cjs')
Measure-Local 'policy-regression' 'retained-living-build-policy' @('pwsh','-NoProfile','-File','tests/test-living-build-contract.ps1')
& node "$b/record.cjs" closeout
& node scripts/measure-build-command.cjs --output "$b/commands.jsonl" --task xdx-clean-restart-20261013 --activity closeout --phase closeout --category closeout --label clean-restart-closeout --learning-ledger "$b/failure-ledger.json" --learning-scope purge -- pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -SessionRecord "$b/xdx_session_xdx-clean-restart-20261013.json" -SessionId xdx-clean-restart-20261013 -Phase Closeout | Tee-Object -FilePath "$b/evidence/closeout.txt"
if($LASTEXITCODE -ne 0){throw 'Closeout failed'}
