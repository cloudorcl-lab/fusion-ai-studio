$ErrorActionPreference = 'Stop'
$base = (Resolve-Path '.').Path
$target = Join-Path $base '.worktrees/xdx-supplier-core-rebuild-20260926'
$archiveDir = Join-Path $base '.debug/worktree-archives/xdx-supplier-core-rebuild-20260926-868e10b'
$recordDir = Join-Path $base 'docs/builds/xdx-supplier-worktree-retirement-20260928'
if ((Resolve-Path $target).Path -ne [IO.Path]::GetFullPath($target)) { throw 'Target identity mismatch' }
$head = (& git -C $target rev-parse HEAD).Trim()
if ($head -ne '868e10bab1052b814b3f5a0b05f7fa99901ab229') { throw 'Worktree HEAD drift' }
& git check-ignore -- .debug/worktree-archives/xdx-supplier-core-rebuild-20260926-868e10b/snapshot.zip | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Archive must be ignored' }
New-Item -ItemType Directory -Path $archiveDir -Force | Out-Null
Add-Type -TypeDefinition @'
using System;
using System.IO;
using System.IO.Compression;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text.Json;
public class RetiredFile { public string path {get;set;} public long bytes {get;set;} public string sha256 {get;set;} }
public static class VerifiedWorktreeArchive {
  static string Hash(Stream s) { using(var h=SHA256.Create()) return Convert.ToHexString(h.ComputeHash(s)).ToLowerInvariant(); }
  static void Walk(string root,string dir,List<string> files) {
    foreach(var p in Directory.EnumerateFileSystemEntries(dir)) {
      var a=File.GetAttributes(p); if((a&FileAttributes.ReparsePoint)!=0) throw new Exception("Reparse point blocks archive");
      if((a&FileAttributes.Directory)!=0) Walk(root,p,files); else files.Add(p);
    }
  }
  public static RetiredFile[] Create(string root,string destination,string manifest) {
    var files=new List<string>(); Walk(root,root,files); files.Sort(StringComparer.Ordinal); var rows=new List<RetiredFile>();
    using(var output=new FileStream(destination,FileMode.CreateNew,FileAccess.Write))
    using(var zip=new ZipArchive(output,ZipArchiveMode.Create)) {
      foreach(var file in files) {
        var relative=Path.GetRelativePath(root,file).Replace('\\','/');
        var entry=zip.CreateEntry(relative,CompressionLevel.Fastest);
        using(var input=new FileStream(file,FileMode.Open,FileAccess.Read,FileShare.Read)) {
          var hash=Hash(input);var size=input.Length;input.Position=0;
          using(var dest=entry.Open()) input.CopyTo(dest);
          rows.Add(new RetiredFile {path=relative,bytes=size,sha256=hash});
        }
      }
    }
    var expected=new Dictionary<string,RetiredFile>(StringComparer.Ordinal);
    foreach(var row in rows) expected.Add(row.path,row);
    using(var zip=ZipFile.OpenRead(destination)) {
      if(zip.Entries.Count!=rows.Count) throw new Exception("Archive count mismatch");
      foreach(var e in zip.Entries) {
        if(!expected.Remove(e.FullName,out var row) || e.Length!=row.bytes) throw new Exception("Archive identity mismatch");
        using(var stream=e.Open()) if(Hash(stream)!=row.sha256) throw new Exception("Archive hash mismatch");
        using(var stream=File.OpenRead(Path.Combine(root,row.path))) if(Hash(stream)!=row.sha256) throw new Exception("Source drift during archive");
      }
    }
    if(expected.Count!=0) throw new Exception("Missing archive entries");
    File.WriteAllText(manifest,JsonSerializer.Serialize(rows,new JsonSerializerOptions {WriteIndented=true}));
    return rows.ToArray();
  }
}
'@
$started = [DateTime]::UtcNow.ToString('o')
$archive = Join-Path $archiveDir 'snapshot.zip'
$manifest = Join-Path $archiveDir 'files.json'
$rows = [VerifiedWorktreeArchive]::Create($target,$archive,$manifest)
$receipt = [ordered]@{status='passed';target=$target;branch='codex/xdx-supplier-core-rebuild-20260926';head=$head;archivePath=$archive;manifestPath=$manifest;archiveSha256=(Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash.ToLower();manifestSha256=(Get-FileHash -LiteralPath $manifest -Algorithm SHA256).Hash.ToLower();files=$rows.Count;bytes=($rows | Measure-Object bytes -Sum).Sum;archiveBytes=(Get-Item -LiteralPath $archive).Length;startedUtc=$started;verifiedUtc=[DateTime]::UtcNow.ToString('o');verification='Every ZIP entry count/size/SHA256 and current source SHA256 matched; no reparse points';privacy='Private local ignored archive includes configuration; never stage, publish or execute recovered helpers'}
$receipt | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $recordDir 'preservation.json')
[pscustomobject]$receipt | Select-Object status,files,bytes,archiveBytes,verifiedUtc | ConvertTo-Json
