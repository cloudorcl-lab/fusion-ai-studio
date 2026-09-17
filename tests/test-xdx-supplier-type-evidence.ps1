param([string]$RepoRoot=(Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference='Stop'
$root=Join-Path $RepoRoot 'docs/builds/xdx-supplier-information/live-post'
function Assert([bool]$condition,[string]$message){if(-not $condition){throw $message}}
$source=(Get-Content "$root/lee-profile.json" -Raw|ConvertFrom-Json).response
$bo=Get-Content (Join-Path $RepoRoot 'src/businessObjects/xdx_supplier_information.bo') -Raw|ConvertFrom-Json
$fn=$bo.objectProperties.tools|Where-Object name -eq CreateSupplier
$intended=@('Supplier','SupplierType','TaxOrganizationType','BusinessRelationship')
$template=$fn.bodyTemplate|ConvertFrom-Json
Assert (@(Compare-Object $intended @($template.PSObject.Properties.Name)).Count -eq 0) 'Expected business fields missing from create template'
Assert (@(Compare-Object $intended @($fn.parameterDefinitions.name)).Count -eq 0) 'Expected create input missing'
Assert ($fn.sampleQueries[0].query.SupplierType -ceq $source.SupplierType) 'Create example dropped source SupplierType'
$request=Get-Content "$root/type-fix/restored-create-request.json" -Raw|ConvertFrom-Json
Assert ($request.SupplierType -ceq $source.SupplierType) 'Prepared request dropped expected business field'
$before=(Get-Content "$root/type-fix/original-before.json" -Raw|ConvertFrom-Json).response
$patch=Get-Content "$root/type-fix/original-patch.json" -Raw|ConvertFrom-Json
$after=(Get-Content "$root/type-fix/original-after.json" -Raw|ConvertFrom-Json).response
Assert ($patch.status -ceq 'SUCCESS') 'Repair did not succeed'
Assert ($before.SupplierId -eq $after.SupplierId -and $after.SupplierId -eq 300000333813790) 'Repair affected wrong supplier'
Assert ($patch.inputs.SupplierType -ceq $source.SupplierType) 'Repair request changed source value'
Assert ($after.SupplierType -ceq $source.SupplierType -and $after.SupplierTypeCode -ceq $source.SupplierTypeCode) 'Persisted supplier type mismatch'
foreach($field in @('Supplier','SupplierNumber','SupplierPartyId','TaxOrganizationType','BusinessRelationship')){Assert ($before.$field -ceq $after.$field) "Repair changed unrelated business field $field"}
Write-Output 'SupplierType correction: PASS (intended create fields, real source value, scoped PATCH and persisted original supplier type/code).'
$newRequest=Get-Content "$root/type-fix/create-request.json" -Raw|ConvertFrom-Json
$created=Get-Content "$root/type-fix/new-create.json" -Raw|ConvertFrom-Json
$newRead=(Get-Content "$root/type-fix/new-after.json" -Raw|ConvertFrom-Json).response
Assert ($created.status -ceq 'SUCCESS') 'Restored POST did not succeed'
Assert ($newRequest.Supplier -match '^XDX Lee Supplies [0-9]+$') 'Retest name violates approved prefix/suffix'
Assert ($created.response.SupplierId -ne $after.SupplierId -and $newRead.SupplierId -eq $created.response.SupplierId) 'Retest supplier identity mismatch'
Assert (@(Compare-Object $intended @($newRequest.PSObject.Properties.Name)).Count -eq 0) 'Final live request omitted an intended field'
foreach($field in $intended){
 Assert ($created.inputs.$field -ceq $newRequest.$field) "POST input mismatch: $field"
 Assert ($created.response.$field -ceq $newRequest.$field -and $newRead.$field -ceq $newRequest.$field) "POST/read-back mismatch: $field"
 if($field -ne 'Supplier'){Assert ($newRequest.$field -ceq $source.$field) "Lost source business meaning: $field"}
}
Assert ($newRead.SupplierTypeCode -ceq $source.SupplierTypeCode) 'POST retest code mismatch'
Write-Output 'Fresh Supplier POST retest: PASS (all four intended fields and derived type code persisted; approved XDX numeric-suffixed name).'
