param([string]$RepoRoot = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$bo = Get-Content (Join-Path $RepoRoot 'src/businessObjects/xdx_supplier_information.bo') -Raw | ConvertFrom-Json
function Assert-Contract([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}
Assert-Contract ($bo.objectCode -ceq 'XDX_SUPPLIER_INFORMATION') 'Wrong BO identity.'
$allFunctions = @($bo.objectProperties.tools)
$functions = @($allFunctions | Where-Object operationType -eq 'GET')
$expected = @('ListSuppliers', 'FindSupplierByFullName', 'FindSuppliersByPartialName', 'GetSupplierDetails', 'ListSupplierAddresses', 'ListSupplierSites', 'ListSupplierContacts')
Assert-Contract ($functions.Count -eq 7) 'Expected seven read-only functions.'
Assert-Contract ($allFunctions.Count -eq 11) 'Expected seven GET and four POST functions.'
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
$postContracts=@{
 CreateSupplier=@('create_suppliers','/fscmRestApi/resources/11.13.18.05/suppliers')
 CreateSupplierAddress=@('create_suppliers-addresses','/fscmRestApi/resources/11.13.18.05/suppliers/{suppliers_Id}/child/addresses')
 CreateSupplierSite=@('create_suppliers-sites','/fscmRestApi/resources/11.13.18.05/suppliers/{suppliers_Id}/child/sites')
 CreateSupplierContact=@('create_suppliers-contacts','/fscmRestApi/resources/11.13.18.05/suppliers/{suppliers_Id}/child/contacts')
}
foreach($name in $postContracts.Keys){
 $fn=@($allFunctions|Where-Object name -ceq $name)
 Assert-Contract ($fn.Count -eq 1) "Missing or duplicate POST function $name."
 $fn=$fn[0]
 Assert-Contract ($fn.operationType -ceq 'POST' -and $fn.operationId -ceq $postContracts[$name][0]) "Wrong create operation for $name."
 Assert-Contract ($fn.resourcePath -ceq $postContracts[$name][1]) "Wrong create endpoint for $name."
 Assert-Contract ($fn.bodyTemplate.StartsWith('{') -and $fn.bodyTemplate.EndsWith('}') -and -not $fn.bodyTemplate.Contains('{requestBody}')) "POST must use explicit field tokens for $name."
 $null=$fn.bodyTemplate|ConvertFrom-Json -ErrorAction Stop
 Assert-Contract ($fn.useNativeAuthentication -and $fn.headers.'Upsert-Mode' -ceq 'false') "Create must use native authentication and prohibit upsert for $name."
 Assert-Contract ($fn.headers.'REST-Framework-Version' -ceq '4' -and $fn.headers.'Content-Type' -ceq 'application/json') "Incorrect POST headers for $name."
 $expectedParams=@{
  CreateSupplier=@('Supplier','TaxOrganizationType','BusinessRelationship','SupplierType')
  CreateSupplierAddress=@('AddressName','CountryCode','AddressLine1','City','State','PostalCode','AddressPurposeOrderingFlag','AddressPurposeRemitToFlag','AddressPurposeRFQOrBiddingFlag','Email','suppliers_Id')
  CreateSupplierSite=@('SupplierSite','ProcurementBUId','SupplierAddressName','SitePurposePurchasingFlag','SitePurposePayFlag','SitePurposeSourcingOnlyFlag','suppliers_Id')
  CreateSupplierContact=@('FirstName','LastName','Email','AdministrativeContactFlag','suppliers_Id')
 }[$name]
 Assert-Contract (@(Compare-Object $expectedParams @($fn.parameterDefinitions.name)).Count -eq 0) "Unexpected POST input contract for $name."
 foreach($p in $fn.parameterDefinitions){Assert-Contract ([string]::IsNullOrEmpty($p.defaultValue)) "Create inputs must not default to sample values for $name."}
 foreach($forbidden in @('SupplierId','SupplierPartyId','SupplierNumber','SupplierAddressId','SupplierSiteId','SupplierContactId','PersonProfileId','CreatedBy','CreationDate')){Assert-Contract (-not $fn.bodyTemplate.Contains('"'+$forbidden+'":')) "Generated/audit field exposed in $name."}
}
Write-Output 'Supplier BO contract: PASS (seven GET contracts and four POST endpoint/body/authentication contracts).'
Write-Output 'Local verification only; this does not rerun live requests or prove remote BO deployment.'
