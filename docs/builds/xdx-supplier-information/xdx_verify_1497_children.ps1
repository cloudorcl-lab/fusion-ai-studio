param([switch]$Execute)
$ErrorActionPreference = 'Stop'
if (-not $Execute) { throw 'Live read requires explicit -Execute; do not rerun for documentation.' }
$repo = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../../..'))
$cli = Join-Path $repo '.agents/skills/aistudio/scripts/aistudio.js'
$source = Join-Path $repo 'src/businessObjects/xdx_supplier_information.bo'
$dest = Join-Path $PSScriptRoot 'live-post/type-fix/children-1497'
if (Test-Path -LiteralPath (Join-Path $dest 'summary.json')) { throw 'Completed evidence exists; no routine refresh permitted.' }
New-Item -ItemType Directory -Path $dest -Force | Out-Null
$scratch = Join-Path ([IO.Path]::GetTempPath()) ('xdx_1497_' + [guid]::NewGuid().ToString('N') + '.bo')
$argsFile = [IO.Path]::ChangeExtension($scratch, '.json')
Copy-Item -LiteralPath $source -Destination $scratch
$before = (Get-FileHash -LiteralPath $source).Hash
$records = @()
try {
  foreach ($c in @(@{function='ListSupplierAddresses'; key='SupplierAddressId'}, @{function='ListSupplierSites'; key='SupplierSiteId'}, @{function='ListSupplierContacts'; key='SupplierContactId'})) {
    $file = Join-Path $dest ($c.function + '.json')
    if (Test-Path -LiteralPath $file) { throw 'Partial evidence exists; review before repeating a GET.' }
    $inputs = @{suppliers_Id='300000333813822'; filter=($c.key + ' is not null'); limit='25'; offset='0'}
    @{functionName=$c.function; exampleIndex=1; sampleInputValues=$inputs; description='Requested child verification for XDX supplier 1497.'} | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $argsFile
    $start = [DateTimeOffset]::UtcNow
    $watch = [Diagnostics.Stopwatch]::StartNew()
    $raw = @(& node $cli do-fetch-bo-function-example-sample --file $scratch --args ('@' + $argsFile) 2>&1)
    $exitCode = $LASTEXITCODE
    $watch.Stop()
    if ($exitCode) { throw ($raw -join "`n") }
    $lines = @($raw | ForEach-Object { $_.ToString() })
    $i = [Array]::IndexOf($lines, '{')
    if ($i -lt 0) { throw 'Missing CLI JSON envelope' }
    $envelope = ($lines[$i..($lines.Length-1)] -join "`n") | ConvertFrom-Json
    if (-not $envelope.ok) { throw 'Unsuccessful CLI envelope' }
    $payload = $envelope.result.payload | ConvertFrom-Json
    $receipt = [ordered]@{timestampUtc=$start.ToString('o'); supplierNumber='1497'; supplierId='300000333813822'; function=$c.function; inputs=$inputs; elapsedSeconds=$watch.Elapsed.TotalSeconds; response=$payload}
    $receipt | ConvertTo-Json -Depth 60 | Set-Content -LiteralPath $file
    foreach($field in @('items','count','limit','offset','hasMore')) { if ($field -notin $payload.PSObject.Properties.Name) { throw "Missing $field" } }
    if ($payload.count -ne @($payload.items).Count -or $payload.offset -ne 0 -or $payload.hasMore) { throw 'Incomplete or inconsistent child collection; retain evidence for continuation.' }
    foreach($item in $payload.items) { if ('SupplierId' -in $item.PSObject.Properties.Name -and [string]$item.SupplierId -ne '300000333813822') { throw 'Wrong supplier parent' } }
    $records += @{function=$c.function; count=$payload.count; hasMore=$payload.hasMore; evidence=($c.function+'.json'); elapsedSeconds=$watch.Elapsed.TotalSeconds}
  }
  if ((Get-FileHash -LiteralPath $source).Hash -ne $before) { throw 'Delivery BO changed unexpectedly' }
  @{status='PASS'; supplierId='300000333813822'; supplierNumber='1497'; cases=$records; scope='Three requested source API child GETs; parent proof reused from ../new-after.json; no child creation.'} | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath (Join-Path $dest 'summary.json')
  $records | ForEach-Object { Write-Output ("{0}: count={1}; hasMore={2}" -f $_.function,$_.count,$_.hasMore) }
} finally {
  Remove-Item -LiteralPath $scratch -ErrorAction SilentlyContinue
  Remove-Item -LiteralPath $argsFile -ErrorAction SilentlyContinue
}
