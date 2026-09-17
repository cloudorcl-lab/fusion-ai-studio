param([switch]$Execute)
$ErrorActionPreference='Stop'
if (-not $Execute) { throw 'Explicit -Execute required for the three authorized persistent child creates.' }
$repo=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
$cli=Join-Path $repo '.agents/skills/aistudio/scripts/aistudio.js'
$source=Join-Path $repo 'src/businessObjects/xdx_supplier_information.bo'
$dir=Join-Path $PSScriptRoot 'live-post/children-1497-create'
$plan=Get-Content -LiteralPath (Join-Path $dir 'plan.json') -Raw | ConvertFrom-Json -AsHashtable
if ($plan.supplierId -ne '300000333813822' -or $plan.cases.Count -ne 3) { throw 'Unexpected execution scope' }
foreach($c in $plan.cases) { if (Test-Path -LiteralPath (Join-Path $dir ($c.resource+'-attempt.json'))) { throw 'A POST attempt exists; reconcile retained state before any rerun.' } }
$scratch=Join-Path ([IO.Path]::GetTempPath()) ('xdx_1497_create_'+[guid]::NewGuid().ToString('N')+'.bo')
$argsFile=[IO.Path]::ChangeExtension($scratch,'.json')
Copy-Item -LiteralPath $source -Destination $scratch
$hash=(Get-FileHash -LiteralPath $source).Hash
function Invoke-Cli([string]$Command,[hashtable]$Arguments) {
  $Arguments | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $argsFile
  $raw=@(& node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON $cli $Command --file $scratch --args ('@'+$argsFile) 2>&1)
  if($LASTEXITCODE) { throw ($raw -join "`n") }
  $lines=@($raw|ForEach-Object {$_.ToString()});$i=[Array]::IndexOf($lines,'{')
  if($i -lt 0) { throw 'Missing CLI JSON envelope' }
  $r=($lines[$i..($lines.Length-1)] -join "`n")|ConvertFrom-Json
  if(-not $r.ok) { throw 'Unsuccessful CLI envelope' };return $r.result
}
function Invoke-Receipt([string]$Function,[string]$Label,[hashtable]$Inputs) {
  $start=[DateTimeOffset]::UtcNow;$timer=[Diagnostics.Stopwatch]::StartNew()
  try {
    $r=Invoke-Cli 'do-fetch-bo-function-example-sample' @{functionName=$Function;examplePurpose='response';sampleInputValues=$Inputs;description='Authorized supplier 1497 child creation and persisted verification.'}
    $payload=$r.payload|ConvertFrom-Json;$timer.Stop()
    @{timestampUtc=$start.ToString('o');function=$Function;inputs=$Inputs;elapsedSeconds=$timer.Elapsed.TotalSeconds;response=$payload;status='SUCCESS'}|ConvertTo-Json -Depth 80|Set-Content -LiteralPath (Join-Path $dir ($Label+'.json'))
    return $payload
  } catch { $timer.Stop();@{timestampUtc=$start.ToString('o');function=$Function;elapsedSeconds=$timer.Elapsed.TotalSeconds;error=$_.Exception.Message;status='FAILED_OR_UNCERTAIN'}|ConvertTo-Json -Depth 5|Set-Content -LiteralPath (Join-Path $dir ($Label+'-failure.json'));throw }
}
function Assert-Fields($Payload,[hashtable]$Expected) {
  foreach($k in $Expected.Keys) { if($k -notin $Payload.PSObject.Properties.Name -or $Payload.$k -cne $Expected[$k]) { throw "Intended field mismatch: $k" } }
}
try {
  # All local input preparations finish before any POST.
  foreach($c in $plan.cases) {
    $r=Invoke-Cli 'prepare-bo-function-example-inputs' @{functionName=$c.fn;examplePurpose='response';sampleInputValues=$c.inputs;rawUserReply='create child objects for supplier 1497.'}
    $r|ConvertTo-Json -Depth 20|Set-Content -LiteralPath (Join-Path $dir ($c.resource+'-preparation.json'))
    if(-not $r.readyToFetch -or $r.needsClarification) { throw 'Create inputs not ready' }
    foreach($k in $c.inputs.Keys) { if($r.acceptedSampleInputValues.$k -cne $c.inputs[$k]) { throw "Prepared input changed: $k" } }
  }
  $parent=Invoke-Receipt 'GetSupplierDetails' 'parent-before' @{suppliers_Id=$plan.supplierId}
  Assert-Fields $parent @{SupplierId=[long]$plan.supplierId;SupplierNumber='1497';Supplier=$plan.supplierName;SupplierType='Supplier';SupplierTypeCode='SUPPLIER'}
  $created=@();$addressId=$null
  foreach($c in $plan.cases) {
    @{startedUtc=[DateTimeOffset]::UtcNow.ToString('o');function=$c.fn;request=($c.resource+'-request.json');warning='Do not retry automatically after this marker.'}|ConvertTo-Json|Set-Content -LiteralPath (Join-Path $dir ($c.resource+'-attempt.json'))
    $post=Invoke-Receipt $c.fn ($c.resource+'-post') $c.inputs
    Assert-Fields $post $c.expected
    $key=[string]$post.($c.key);if(-not $key) { throw 'Missing generated child key' }
    if($c.resource -eq 'address') {$addressId=$key}
    if($c.resource -eq 'site' -and [string]$post.SupplierAddressId -ne $addressId) { throw 'Site does not reference new address' }
    $get=Invoke-Receipt $c.get ($c.resource+'-get') @{suppliers_Id=$plan.supplierId;filter=($c.key+'='+$key);limit='25';offset='0'}
    if($get.count -ne 1 -or @($get.items).Count -ne 1 -or $get.hasMore -or [string]$get.items[0].($c.key) -ne $key) { throw 'Persisted child identity/collection mismatch' }
    Assert-Fields $get.items[0] $c.expected
    if($c.resource -eq 'site' -and [string]$get.items[0].SupplierAddressId -ne $addressId) { throw 'Persisted site address mismatch' }
    if($c.resource -eq 'contact' -and ($null -ne $get.items[0].UserName -or $null -ne $get.items[0].UserAccountStatus)) { throw 'Unexpected contact account state' }
    $created+=@{resource=$c.resource;id=$key;fieldsVerified=$c.fields.Count;post=($c.resource+'-post.json');get=($c.resource+'-get.json')}
    Write-Output ("{0}: created and GET verified, ID {1}" -f $c.resource,$key)
  }
  if((Get-FileHash -LiteralPath $source).Hash -ne $hash) { throw 'Delivery BO changed' }
  @{status='PASS';completedUtc=[DateTimeOffset]::UtcNow.ToString('o');supplierId=$plan.supplierId;supplierNumber='1497';created=$created;intendedFieldsVerified=20;sourceArtifactUnchanged=$true;scope='Three child POSTs plus parent identity GET and three child verification GETs; no remote BO deployment.'}|ConvertTo-Json -Depth 12|Set-Content -LiteralPath (Join-Path $dir 'summary.json')
} finally { Remove-Item -LiteralPath $scratch -ErrorAction SilentlyContinue;Remove-Item -LiteralPath $argsFile -ErrorAction SilentlyContinue }
