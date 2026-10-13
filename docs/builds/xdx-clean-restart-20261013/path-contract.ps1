function Get-RetirementReparsePoints([string]$LiteralPath) {
  $item=Get-Item -LiteralPath $LiteralPath -Force -ErrorAction Stop
  $items=@($item)
  if($item.PSIsContainer){$items+=@(Get-ChildItem -LiteralPath $LiteralPath -Recurse -Force -ErrorAction Stop)}
  return @($items | Where-Object { ($_.Attributes -band [IO.FileAttributes]::ReparsePoint) -ne 0 })
}
