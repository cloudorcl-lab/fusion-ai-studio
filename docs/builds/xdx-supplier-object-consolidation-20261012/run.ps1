param([ValidateSet('Startup','Author','Verify','Deliver')][string]$Mode)
$ErrorActionPreference='Stop'
$taskId='xdx-supplier-object-consolidation-20261012'
$taskDir="docs/builds/$taskId"
function Invoke-TaskCommand([string]$label,[string]$category,[string[]]$child) {
  $output=@(& node scripts/measure-build-command.cjs --output "$taskDir/commands.jsonl" --task $taskId --activity $label --phase $Mode --category $category --label $label --learning-ledger "$taskDir/failure-ledger.json" --learning-scope supplier-documentation -- @child 2>&1)
  $code=$LASTEXITCODE
  [IO.File]::WriteAllText((Join-Path (Get-Location) "$taskDir/evidence/$label.txt"),($output -join "`n")+"`n")
  Write-Output "$label exit=$code"
  if($code-ne 0){throw "Task command failed: $label; original output retained"}
}
if($Mode-eq 'Startup') {
  Invoke-TaskCommand 'startup' 'repair' @('pwsh','-NoProfile','-File','scripts/verify-living-build-contract.ps1','-SessionRecord',"$taskDir/xdx_session_$taskId.json",'-SessionId',$taskId,'-Phase','Startup')
} elseif($Mode-eq 'Author') {
  Invoke-TaskCommand 'literal-authoring' 'repair' @('node',"$taskDir/task.cjs",'author')
} elseif($Mode-eq 'Verify') {
  & node "$taskDir/task.cjs" refresh
  if($LASTEXITCODE-ne 0){throw 'Receipt refresh failed'}
  Invoke-TaskCommand 'refreshed-startup' 'repair' @('pwsh','-NoProfile','-File','scripts/verify-living-build-contract.ps1','-SessionRecord',"$taskDir/xdx_session_$taskId.json",'-SessionId',$taskId,'-Phase','Startup')
  Invoke-TaskCommand 'documents' 'repair' @('node',"$taskDir/task.cjs",'verify')
  & node "$taskDir/task.cjs" close-authoring-failure
  if($LASTEXITCODE-ne 0){throw 'Authoring finding review failed'}
  & node scripts/update-build-learning.cjs . "$taskDir/failure-ledger.json" "$taskDir/failure-ledger.candidate.json" $taskId
  if($LASTEXITCODE-ne 0){throw 'Transactional finding closure failed'}
  Invoke-TaskCommand 'policy-regression' 'test' @('pwsh','-NoProfile','-File','tests/test-living-build-contract.ps1')
  & git diff --check
  if($LASTEXITCODE-ne 0){throw 'Whitespace check failed'}
} else {
  & node "$taskDir/task.cjs" closeout
  if($LASTEXITCODE-ne 0){throw 'Receipt closeout failed'}
  Invoke-TaskCommand 'closeout' 'closeout' @('pwsh','-NoProfile','-File','scripts/verify-living-build-contract.ps1','-SessionRecord',"$taskDir/xdx_session_$taskId.json",'-SessionId',$taskId,'-Phase','Closeout')
  $allowed=@('docs/lessons/objects/oracle-fusion-procurement-suppliers.md','docs/lessons/objects/README.md','docs/handoffs/ACTIVE_HANDOFF.md')
  if((& git rev-parse --show-toplevel).Trim()-ne 'C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1'){throw 'Wrong checkout'}
  if((& git branch --show-current).Trim()-ne 'TestingWFBuildTools'){throw 'Wrong branch'}
  foreach($name in @(& git diff --cached --name-only)){if($name-notin $allowed-and -not $name.StartsWith("$taskDir/")){throw 'Unrelated staged files; commit withheld'}}
  & git add -- @allowed $taskDir
  if($LASTEXITCODE-ne 0){throw 'Scoped staging failed'}
  & git diff --cached --check
  if($LASTEXITCODE-ne 0){throw 'Staged whitespace failed'}
  & git commit -m 'Consolidate reusable Supplier object lessons'
  if($LASTEXITCODE-ne 0){throw 'Commit failed'}
  & git log -1 --format='%h %s'
  & git status --short
}
