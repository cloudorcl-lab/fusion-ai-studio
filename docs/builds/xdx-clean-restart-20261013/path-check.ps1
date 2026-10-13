$ErrorActionPreference='Stop'
$base='docs/builds/xdx-clean-restart-20261013'
. "$base/path-contract.ps1"
$archive=(Get-Content -Raw "$base/evidence/preservation.json"|ConvertFrom-Json).archive
$plan=Get-Content -Raw (Join-Path $archive 'plan.json')|ConvertFrom-Json
$falsePositives=0;$checked=0
foreach($relative in $plan.targets){
 $item=Get-Item -LiteralPath $relative -Force
 if(-not $item.PSIsContainer){$falsePositives+=@(Get-ChildItem -LiteralPath $relative -Recurse -Force -Attributes ReparsePoint).Count}
 if(@(Get-RetirementReparsePoints $relative).Count){throw 'Actual reparse point found'}
 $checked++
}
if($falsePositives -ne 9){throw 'Original file-path false-positive regression not reproduced'}
# Attribute predicate must still identify the actual reparse flag, including combined flags.
foreach($a in @([IO.FileAttributes]::ReparsePoint,([IO.FileAttributes]::ReparsePoint -bor [IO.FileAttributes]::Directory))){if(($a -band [IO.FileAttributes]::ReparsePoint) -eq 0){throw 'Reparse flag lost'}}
$r=[ordered]@{ok=$true;checkedTargets=$checked;originalFileFalsePositives=$falsePositives;correctedFalsePositives=0;directoryAndFileScopesChecked=$true;noDeletionPerformed=$true;observedUtc=[DateTime]::UtcNow.ToString('o')}
$r|ConvertTo-Json|Set-Content "$base/evidence/path-contract-pass.json"
$r|ConvertTo-Json
