param([string]$RepoRoot=(Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference='Stop'
$root=Join-Path $RepoRoot 'docs/builds/xdx-supplier-information/live-post'
function Assert([bool]$Condition,[string]$Message){if(-not $Condition){throw $Message}}
$plan=Get-Content "$root/run-plan.json" -Raw|ConvertFrom-Json
$supplier=(Get-Content "$root/create-supplier.json" -Raw|ConvertFrom-Json).response
$address=(Get-Content "$root/create-address.json" -Raw|ConvertFrom-Json).response
$checks=0
foreach($config in @(
 @('supplier','SupplierId','GetSupplierDetails','Supplier'),
 @('address','SupplierAddressId','ListSupplierAddresses','AddressName'),
 @('site','SupplierSiteId','ListSupplierSites','SupplierSite'),
 @('contact','SupplierContactId','ListSupplierContacts','LastName')
)){
 $kind=$config[0];$key=$config[1]
 $receipt=Get-Content "$root/create-$kind.json" -Raw|ConvertFrom-Json
 $request=Get-Content "$root/$kind-request.json" -Raw|ConvertFrom-Json
 $doc=Get-Content "$root/$kind-documentation.json" -Raw|ConvertFrom-Json
 Assert ($receipt.status -ceq 'SUCCESS') "$kind POST did not succeed"
 Assert ($null -ne $receipt.response.$key -and $receipt.response.$key -gt 0) "$kind generated key missing"
 Assert ($key -notin $request.PSObject.Properties.Name) "$kind request copied resource ID"
 Assert ($receipt.response.($config[3]).StartsWith('XDX')) "$kind name lacks XDX prefix"
 if($kind -ne 'supplier'){Assert ($receipt.inputs.suppliers_Id -eq [string]$supplier.SupplierId) "$kind POST targeted wrong parent"}
 $read=(Get-Content "$root/regression/$($config[2])-baseline.json" -Raw|ConvertFrom-Json).response
 if($kind -eq 'supplier'){$persisted=$read}else{
  Assert ($read.count -eq 1 -and -not $read.hasMore) "$kind new parent must have exactly one child"
  $persisted=$read.items[0]
 }
 Assert ($persisted.$key -eq $receipt.response.$key) "$kind read-back identity mismatch"
 foreach($p in $request.PSObject.Properties){
  Assert ($null -ne $doc.requestSchema.properties.($p.Name)) "$kind undocumented writable field $($p.Name)"
  Assert ($receipt.response.($p.Name) -ceq $p.Value) "$kind response mismatch for $($p.Name)"
  Assert ($persisted.($p.Name) -ceq $p.Value) "$kind persisted mismatch for $($p.Name)"
  if($p.Value -is [bool]){Assert ($persisted.($p.Name) -is [bool]) "$kind boolean type lost"}
  $checks++
 }
 Write-Output "$kind`: POST and persisted fields PASS ($key=$($persisted.$key))"
}
Assert ($supplier.Supplier -ceq $plan.supplierName) 'Run identity mismatch'
Assert ($supplier.SupplierId -ne $plan.sourceSupplierId) 'Source supplier was reused'
foreach($field in @('SupplierNumber','SupplierPartyId')){Assert ($supplier.$field -and $field -notin (Get-Content "$root/supplier-request.json" -Raw|ConvertFrom-Json).PSObject.Properties.Name) "Unproven generated field $field"}
$site=(Get-Content "$root/create-site.json" -Raw|ConvertFrom-Json).response
Assert ($site.SupplierAddressId -eq $address.SupplierAddressId) 'Site linked to wrong address'
Assert ($site.SupplierAddressId -ne $plan.sourceAddressId) 'Site linked to original Lee address'
$contact=(Get-Content "$root/create-contact.json" -Raw|ConvertFrom-Json).response
Assert ($contact.PersonProfileId -and [string]::IsNullOrEmpty($contact.UserName)) 'Contact profile missing or user account unexpectedly provisioned'
$regression=Get-Content "$root/regression/summary.json" -Raw|ConvertFrom-Json
Assert ($regression.status -ceq 'PASS' -and $regression.cases.Count -eq 13) 'Core GET regression incomplete'
$extra=Get-Content "$root/regression-extras-summary.json" -Raw|ConvertFrom-Json
Assert ($extra.status -ceq 'PASS' -and $extra.cases.Count -eq 6) 'Supplementary GET regression incomplete'
Write-Output "Supplier POST evidence: PASS (4 creates, $checks submitted fields read back, generated IDs, child scope, address relationship and 19 GET checks)."
