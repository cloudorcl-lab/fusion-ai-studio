$ErrorActionPreference = 'Stop'
$base = (Resolve-Path -LiteralPath '.').Path
$expected = 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1'
if ($base -ne $expected) { throw 'Wrong surviving checkout' }
$source = (Resolve-Path -LiteralPath (Join-Path $base '.worktrees/xdx-supplier-core-slice-20260929')).Path
if ($source -ne (Join-Path $base '.worktrees\xdx-supplier-core-slice-20260929')) { throw 'Unexpected source' }
$items = @(Get-ChildItem -LiteralPath $source -Force -Recurse)
if (@($items | Where-Object { $_.Attributes -band [IO.FileAttributes]::ReparsePoint }).Count) { throw 'Reparse point in source' }
$archiveRoot = Join-Path $base '.debug/xdx-paused-slice-20260929'
if (Test-Path -LiteralPath $archiveRoot) { throw 'Archive already exists; inspect before retry' }
[IO.Directory]::CreateDirectory($archiveRoot) | Out-Null
$archive = Join-Path $archiveRoot 'worktree.zip'
$manifest = @($items | Where-Object { -not $_.PSIsContainer } | ForEach-Object {
    [ordered]@{ path = [IO.Path]::GetRelativePath($source, $_.FullName).Replace('\','/'); length = $_.Length; sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant() }
})
$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath (Join-Path $archiveRoot 'manifest.json') -Encoding utf8
Add-Type -AssemblyName System.IO.Compression.FileSystem
[IO.Compression.ZipFile]::CreateFromDirectory($source, $archive, [IO.Compression.CompressionLevel]::Fastest, $false)
$zip = [IO.Compression.ZipFile]::OpenRead($archive)
try {
    $map = @{}
    foreach ($entry in $zip.Entries) { if ($entry.Name) { $map[$entry.FullName.Replace('\','/')] = $entry } }
    if ($map.Count -ne $manifest.Count) { throw 'Archive file count mismatch' }
    foreach ($row in $manifest) {
        $entry = $map[$row.path]
        if (-not $entry -or $entry.Length -ne $row.length) { throw "Archive mismatch: $($row.path)" }
        $stream = $entry.Open()
        try { $digest = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($stream)).ToLowerInvariant() } finally { $stream.Dispose() }
        if ($digest -ne $row.sha256) { throw "Archive hash mismatch: $($row.path)" }
    }
} finally { $zip.Dispose() }
$receipt = [ordered]@{ status = 'verified'; observedUtc = [DateTime]::UtcNow.ToString('o'); source = $source; archive = '.debug/xdx-paused-slice-20260929/worktree.zip'; manifest = '.debug/xdx-paused-slice-20260929/manifest.json'; files = $manifest.Count; archiveSha256 = (Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLowerInvariant(); reparsePoints = 0; configuration = 'Preserved privately inside ignored archive; never stage archive or credentials'; restoration = 'Every file independently hash-verified; tenant IDs and relationships are not restored by this archive' }
$receipt | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath 'docs/builds/xdx-supplier-core-reset-20260929/evidence/paused-slice-preservation.json' -Encoding utf8
$receipt | ConvertTo-Json -Compress
