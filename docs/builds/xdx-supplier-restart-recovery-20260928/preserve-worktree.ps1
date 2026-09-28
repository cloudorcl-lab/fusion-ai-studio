$ErrorActionPreference='Stop'
$base=(Resolve-Path 'C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1').Path
$source=(Resolve-Path "$base/.worktrees/xdx-supplier-core-rebuild-20260928").Path
if($source -ne [IO.Path]::GetFullPath("$base/.worktrees/xdx-supplier-core-rebuild-20260928")){throw 'Unexpected source'}
$destination="$base/.debug/worktree-archives/xdx-supplier-core-rebuild-20260928-stopped"
if(Test-Path -LiteralPath $destination){throw 'Archive collision'}
$items=@(Get-ChildItem -LiteralPath $source -Recurse -Force)
if(@($items | Where-Object {$_.Attributes -band [IO.FileAttributes]::ReparsePoint}).Count){throw 'Reparse point in source'}
New-Item -ItemType Directory -Path $destination | Out-Null
$files=@($items | Where-Object {-not $_.PSIsContainer -and $_.FullName -ne "$source\.git" -and $_.FullName -ne "$source\env.properties"})
$zipPath="$destination/snapshot.zip"
$zip=[IO.Compression.ZipFile]::Open($zipPath,[IO.Compression.ZipArchiveMode]::Create)
$manifest=@()
try {
  foreach($file in $files){
    $relative=[IO.Path]::GetRelativePath($source,$file.FullName).Replace('\','/')
    if($relative.StartsWith('../') -or [IO.Path]::IsPathRooted($relative)){throw 'Archive path escape'}
    $hash=(Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip,$file.FullName,$relative,[IO.Compression.CompressionLevel]::Optimal) | Out-Null
    $manifest += [ordered]@{path=$relative;bytes=$file.Length;sha256=$hash}
  }
} finally {$zip.Dispose()}
$check=[IO.Compression.ZipFile]::OpenRead($zipPath)
try {
  if($check.Entries.Count -ne $manifest.Count){throw 'Archive count mismatch'}
  foreach($item in $manifest){
    $entry=$check.GetEntry($item.path)
    if(-not $entry -or $entry.Length -ne $item.bytes){throw "Archive length mismatch: $($item.path)"}
    $stream=$entry.Open()
    try {$hash=[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($stream)).ToLowerInvariant()}
    finally {$stream.Dispose()}
    if($hash -ne $item.sha256){throw "Archive hash mismatch: $($item.path)"}
  }
} finally {$check.Dispose()}
Copy-Item -LiteralPath "$source/env.properties" -Destination "$destination/env.properties"
$configurationHash=(Get-FileHash -LiteralPath "$source/env.properties").Hash.ToLowerInvariant()
if((Get-FileHash -LiteralPath "$destination/env.properties").Hash.ToLowerInvariant() -ne $configurationHash){throw 'Configuration preservation mismatch'}
[ordered]@{source=$source;observedUtc=[DateTime]::UtcNow.ToString('o');files=$manifest} | ConvertTo-Json -Depth 8 | Set-Content "$destination/manifest.json" -Encoding utf8
[ordered]@{
  status='PASS';source=$source;archive=$zipPath;archiveSha256=(Get-FileHash -LiteralPath $zipPath).Hash.ToLowerInvariant();files=$manifest.Count
  manifestSha256=(Get-FileHash -LiteralPath "$destination/manifest.json").Hash.ToLowerInvariant()
  configuration='Preserved separately in private ignored archive; never staged';configurationSha256=$configurationHash
  gitAdministrativePath="$base/.git/worktrees/xdx-supplier-core-rebuild-20260928"
  boundaries='Every archived file decompressed and SHA256 verified; excludes only Git administrative pointer and separately preserved env.properties. No deletion performed.'
} | ConvertTo-Json -Depth 8 | Set-Content "$base/docs/builds/xdx-supplier-restart-recovery-20260928/preservation-receipt.json" -Encoding utf8
Write-Output "Preservation PASS: $($manifest.Count) files individually verified; configuration preserved privately."
