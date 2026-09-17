[CmdletBinding()]
param(
  [Parameter(Mandatory)][string]$SupplierId,
  [Parameter(Mandatory)][string]$SupplierName,
  [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot),
  [string]$EvidenceDirectory = '',
  [switch]$UpdateExamples
)
$ErrorActionPreference = 'Stop'
$cli = Join-Path $RepoRoot '.agents/skills/aistudio/scripts/aistudio.js'
$source = Join-Path $RepoRoot 'src/businessObjects/xdx_supplier_information.bo'
$evidence = Join-Path $RepoRoot 'docs/builds/xdx-supplier-information/live-details'
if ($EvidenceDirectory) { $evidence = [IO.Path]::GetFullPath($EvidenceDirectory) }
$scratch = Join-Path ([IO.Path]::GetTempPath()) ('xdx_supplier_information_' + [guid]::NewGuid().ToString('N') + '.bo')
$argsFile = [IO.Path]::ChangeExtension($scratch, '.json')
$results = [Collections.Generic.List[object]]::new()
New-Item -ItemType Directory -Path $evidence -Force | Out-Null
Copy-Item -LiteralPath $source -Destination $scratch

function Invoke-Bo([string]$Command, [string]$File, [hashtable]$Arguments) {
  $Arguments | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $argsFile
  $raw = @(& node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON $cli $Command --file $File --args ('@' + $argsFile))
  if ($LASTEXITCODE) { throw ($raw -join "`n") }
  $start = [Array]::IndexOf($raw, '{')
  if ($start -lt 0) { throw 'CLI returned no JSON envelope.' }
  $result = ($raw[$start..($raw.Length - 1)] -join "`n") | ConvertFrom-Json
  if (-not $result.ok) { throw 'CLI returned an unsuccessful envelope.' }
  return $result.result
}

function Invoke-Case([string]$Function, [string]$Case, [hashtable]$Inputs, [string]$File) {
  $guidance = Invoke-Bo 'get-bo-function-example-guidance' $File @{functionName=$Function; currentSampleInputValues=$Inputs}
  $ready = Invoke-Bo 'prepare-bo-function-example-inputs' $File @{
    functionName=$Function; sampleInputValues=$Inputs
    rawUserReply='test each part against live system. show or save data for verification.'
  }
  if (-not $guidance.readyToFetch -or -not $ready.readyToFetch -or $ready.needsClarification) { throw 'Sample inputs not ready.' }
  $start = [DateTimeOffset]::UtcNow
  $timer = [Diagnostics.Stopwatch]::StartNew()
  $result = Invoke-Bo 'do-fetch-bo-function-example-sample' $File @{
    functionName=$Function; exampleIndex=1; sampleInputValues=$Inputs
    description="Live $Function $Case response for resolved supplier $SupplierName."
  }
  $timer.Stop()
  $payload = $result.payload | ConvertFrom-Json
  $record = [ordered]@{
    timestampUtc=$start.ToString('o'); function=$Function; case=$Case; inputs=$Inputs
    elapsedSeconds=[Math]::Round($timer.Elapsed.TotalSeconds,3); response=$payload
  }
  $relative = ($Function + '-' + $Case + '.json')
  $record | ConvertTo-Json -Depth 60 | Set-Content -LiteralPath (Join-Path $evidence $relative)
  $results.Add([pscustomobject]@{function=$Function; case=$Case; elapsedSeconds=$record.elapsedSeconds; evidence=$relative})
  return $payload
}

function Assert-Collection($Payload, [string]$Key, [int]$Offset) {
  foreach ($field in @('items','count','limit','offset','hasMore')) {
    if ($field -notin $Payload.PSObject.Properties.Name) { throw "Missing collection field $field" }
  }
  if ($Payload.count -ne @($Payload.items).Count -or $Payload.offset -ne $Offset) { throw 'Count/offset mismatch.' }
  if (@($Payload.items | ForEach-Object { $_.$Key } | Sort-Object -Unique).Count -ne $Payload.count) { throw 'Duplicate child IDs.' }
  if ($Payload.hasMore -and $Payload.count -eq 0) { throw 'Pagination cannot progress.' }
  foreach ($item in $Payload.items) {
    if ($null -eq $item.$Key) { throw 'Missing child ID.' }
    if ('SupplierId' -in $item.PSObject.Properties.Name -and [string]$item.SupplierId -ne $SupplierId) { throw 'Wrong parent supplier.' }
  }
}

try {
  $baselineFile = if ($UpdateExamples) { $source } else { $scratch }
  $details = Invoke-Case 'GetSupplierDetails' 'baseline' @{suppliers_Id=$SupplierId} $baselineFile
  if ([string]$details.SupplierId -ne $SupplierId -or $details.Supplier -cne $SupplierName) { throw 'Supplier details identity mismatch.' }
  Write-Output 'GetSupplierDetails: PASS (identity verified).'
  foreach ($config in @(
    @{name='ListSupplierAddresses'; key='SupplierAddressId'},
    @{name='ListSupplierSites'; key='SupplierSiteId'},
    @{name='ListSupplierContacts'; key='SupplierContactId'}
  )) {
    $name=$config.name; $key=$config.key
    $inputs=@{suppliers_Id=$SupplierId; filter=($key+' is not null'); limit='25'; offset='0'}
    $baseline = Invoke-Case $name 'baseline' $inputs $baselineFile
    Assert-Collection $baseline $key 0
    if ($baseline.hasMore) { throw "Baseline exceeds 25 rows; paginate before assessing full coverage for $name." }
    if ($baseline.count -gt 0) {
      $firstId=[string]$baseline.items[0].$key
      $inputs.filter=$key+'='+$firstId
      $filtered=Invoke-Case $name 'filtered' $inputs $scratch
      Assert-Collection $filtered $key 0
      if ($filtered.count -ne 1 -or [string]$filtered.items[0].$key -ne $firstId -or $filtered.hasMore) { throw 'Filter did not isolate expected child.' }
    }
    $inputs.filter=$key+' is not null'; $inputs.limit='1'; $inputs.offset='1'
    $page=Invoke-Case $name 'offset-one' $inputs $scratch
    Assert-Collection $page $key 1
    $expectedCount=if($baseline.count -gt 1){1}else{0}
    if ($page.count -ne $expectedCount -or $page.hasMore -ne ($baseline.count -gt 2)) { throw 'Paging result differs from baseline.' }
    if ($expectedCount -eq 1 -and [string]$page.items[0].$key -ne [string]$baseline.items[1].$key) { throw 'Page order differs from baseline.' }
    $inputs.filter=$key+' is null'; $inputs.limit='25'; $inputs.offset='0'
    $empty=Invoke-Case $name 'empty' $inputs $scratch
    Assert-Collection $empty $key 0
    if ($empty.count -ne 0 -or $empty.hasMore) { throw 'Empty filter did not return an empty terminal page.' }
    Write-Output "$name`: PASS ($($baseline.count) rows; filter, paging, empty response verified)."
  }
  [ordered]@{status='PASS'; supplierId=$SupplierId; supplierName=$SupplierName; cases=$results; scope='Live source API through local BO definitions; no remote BO deployment.'} |
    ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $evidence 'summary.json')
} finally {
  Remove-Item -LiteralPath $scratch -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $argsFile -ErrorAction SilentlyContinue
}
