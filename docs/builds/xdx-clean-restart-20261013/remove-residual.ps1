$ErrorActionPreference='Stop'
$base='docs/builds/xdx-clean-restart-20261013'
. "$base/path-contract.ps1"
$archive=(Get-Content -Raw "$base/evidence/preservation.json"|ConvertFrom-Json).archive
$plan=Get-Content -Raw (Join-Path $archive 'plan.json')|ConvertFrom-Json
$root=(Resolve-Path '.').Path
$i=0
foreach($w in $plan.worktrees){
 $i++;$physical=[IO.Path]::GetFullPath($w.worktree)
 $pointer=[IO.File]::ReadAllText((Join-Path $archive "linked-$i/.git")).Trim()
 $admin=[IO.Path]::GetFullPath($pointer.Substring(8))
 foreach($pair in @(@($physical,(Join-Path $root '.worktrees')), @($admin,(Join-Path $root '.git/worktrees')))){
  $target=$pair[0];$boundary=$pair[1]
  if(-not $target.StartsWith($boundary+'\',[StringComparison]::OrdinalIgnoreCase) -or $target -eq $root){throw 'Residual confinement failed'}
  if(Test-Path -LiteralPath $target){
   if(@(Get-RetirementReparsePoints $target).Count){throw 'Residual reparse point'}
   Get-ChildItem -LiteralPath $target -Recurse -Force | ForEach-Object {$_.Attributes=$_.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)}
   $item=Get-Item -LiteralPath $target -Force;$item.Attributes=$item.Attributes -band (-bnot [IO.FileAttributes]::ReadOnly)
   Remove-Item -LiteralPath $target -Recurse -Force
  }
  if(Test-Path -LiteralPath $target){throw 'Residual remains'}
 }
}
@{ok=$true;physicalAndAdministrativeResidualsRemoved=$true;observedUtc=[DateTime]::UtcNow.ToString('o')}|ConvertTo-Json|Set-Content "$base/evidence/residual-removal.json"
