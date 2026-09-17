param([string]$RepoRoot = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$bo = Get-Content (Join-Path $RepoRoot 'src/businessObjects/xdx_supplier_information.bo') -Raw | ConvertFrom-Json
function Assert-Contract([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}
Assert-Contract ($bo.objectCode -ceq 'XDX_SUPPLIER_INFORMATION') 'Wrong BO identity.'
$functions = @($bo.objectProperties.tools)
$expected = @('ListSuppliers', 'FindSupplierByFullName', 'FindSuppliersByPartialName', 'GetSupplierDetails', 'ListSupplierAddresses', 'ListSupplierSites', 'ListSupplierContacts')
Assert-Contract ($functions.Count -eq 7) 'Expected seven read-only functions.'
Assert-Contract (@(Compare-Object $expected @($functions.name)).Count -eq 0) 'Function set changed.'
foreach ($fn in $functions) {
  Assert-Contract ($fn.operationType -ceq 'GET') "Unsafe operation: $($fn.name)"
  Assert-Contract ($fn.useNativeAuthentication -eq $true) 'Native authentication required.'
  Assert-Contract ($fn.headers.'REST-Framework-Version' -ceq '4') 'Query syntax requires pinned framework version.'
  $sample = $fn.sampleQueries[0]
  Assert-Contract ($sample.sampleType -eq 'response' -and $sample.description.Length -gt 0) 'Required response example missing.'
  $payload = $sample.query
  if ($fn.name -eq 'GetSupplierDetails' -or $fn.name -in @('ListSupplierAddresses','ListSupplierSites','ListSupplierContacts')) {
    Assert-Contract ($fn.resourcePath.StartsWith('/fscmRestApi/resources/11.13.18.05/suppliers/{suppliers_Id}')) 'Supplier-scoped endpoint required.'
    $parent = @($fn.parameterDefinitions | Where-Object name -eq 'suppliers_Id')
    Assert-Contract ($parent.Count -eq 1 -and [string]::IsNullOrEmpty($parent[0].defaultValue)) 'Parent ID must be supplied, never defaulted.'
    if ($fn.name -eq 'GetSupplierDetails') {
      Assert-Contract ($fn.resourcePath.EndsWith('{suppliers_Id}?onlyData=true')) 'Details must not expand children automatically.'
      Assert-Contract ($null -ne $payload.SupplierId -and $payload.Supplier.Length -gt 0) 'Detail response lacks supplier identity.'
      continue
    }
    $childContract = @{
      ListSupplierAddresses = @('addresses','SupplierAddressId')
      ListSupplierSites = @('sites','SupplierSiteId')
      ListSupplierContacts = @('contacts','SupplierContactId')
    }[$fn.name]
    $childKey = $childContract[1]
    Assert-Contract ($fn.resourcePath.Contains('/child/'+$childContract[0]+'?')) 'Wrong child endpoint.'
    Assert-Contract ($fn.resourcePath.Contains('q={filter}&orderBy='+$childKey+':asc')) 'Child filtering or stable order missing.'
    Assert-Contract (($fn.parameterDefinitions | Where-Object name -eq 'filter').defaultValue -eq ($childKey+' is not null')) 'All-records filter default changed.'
  } else {
  Assert-Contract ($fn.resourcePath.StartsWith('/fscmRestApi/resources/11.13.18.05/suppliers?')) 'Unexpected endpoint.'
  Assert-Contract ($fn.resourcePath.Contains('orderBy=SupplierId:asc')) 'Stable paging order missing.'
  Assert-Contract ($fn.resourcePath.Contains('fields=SupplierId,SupplierNumber,Supplier,SupplierType,BusinessRelationship,InactiveDate&')) 'Output projection changed.'
    $childKey = $null
  }
  Assert-Contract ($fn.resourcePath.Contains('limit={limit}&offset={offset}')) 'Paging inputs missing.'
  foreach ($key in @('limit', 'offset')) {
    $parameter = @($fn.parameterDefinitions | Where-Object name -eq $key)
    Assert-Contract ($parameter.Count -eq 1 -and $parameter[0].dataType -eq 'integer') "Invalid $key parameter."
  }
  Assert-Contract (($fn.parameterDefinitions | Where-Object name -eq 'limit').defaultValue -eq '25') 'Wrong default limit.'
  Assert-Contract (($fn.parameterDefinitions | Where-Object name -eq 'offset').defaultValue -eq '0') 'Wrong default offset.'
  Assert-Contract ($payload.count -eq @($payload.items).Count) 'Captured response count does not match its items.'
  foreach ($key in @('items', 'count', 'hasMore', 'limit', 'offset')) {
    Assert-Contract ($key -in $payload.PSObject.Properties.Name) "Paging envelope lost $key."
  }
  foreach ($item in $payload.items) {
    if ($childKey) {
      Assert-Contract ($null -ne $item.$childKey) 'Child response missing its stable ID.'
      continue
    }
    foreach ($key in @('SupplierId', 'SupplierNumber', 'Supplier', 'SupplierType', 'BusinessRelationship', 'InactiveDate')) {
      Assert-Contract ($key -in $item.PSObject.Properties.Name) "Captured supplier missing $key."
    }
  }
}
$list = $functions | Where-Object name -eq 'ListSuppliers'
$full = $functions | Where-Object name -eq 'FindSupplierByFullName'
$partial = $functions | Where-Object name -eq 'FindSuppliersByPartialName'
Assert-Contract (-not $list.resourcePath.Contains('?q=')) 'List must not impose a name filter.'
Assert-Contract ($full.resourcePath.Contains("q=Supplier='{supplierName}'&")) 'Full name must use equality.'
Assert-Contract ($partial.resourcePath.Contains("q=Supplier like '%{supplierName}%'&")) 'Partial name must search within the entire name.'
foreach ($fn in @($full, $partial)) {
  Assert-Contract ([string]::IsNullOrEmpty(($fn.parameterDefinitions | Where-Object name -eq 'supplierName').defaultValue)) 'Tenant-specific supplier must not be a default.'
}
$baseline = $list.sampleQueries[0].query.items[0]
Assert-Contract ($baseline.SupplierId -in $full.sampleQueries[0].query.items.SupplierId) 'Full-name example lost baseline supplier.'
Assert-Contract ($baseline.SupplierId -in $partial.sampleQueries[0].query.items.SupplierId) 'Partial-name example lost baseline supplier.'
Assert-Contract ($full.sampleQueries[0].query.items[0].Supplier -ceq $baseline.Supplier) 'Full-name example returned a different name.'
Write-Output 'Supplier BO contract: PASS (GET-only, query semantics, paging, captured response contracts).'
Write-Output 'Local verification only; this does not rerun live requests or prove remote BO deployment.'
