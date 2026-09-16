# Build packet installation receipt

- Target: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1`
- Branch: `TestingWFBuildTools`
- Baseline HEAD: `3f4a1e380df7be2d30e6b21e6223aec4f97ef1cf`
- Source: `docs/agent-app-build-install-packet.zip`; exact SHA-256 is in `baseline.json`.
- Packet producer commit: `fc2dce08c39dcbbe6fe447e71d50a97bdb15feea`.
- Installed: `agent-app-build-startup/`, 85 files, using the packet's supplied installer.
- Recovery directory: `C:\Users\dasu\AppData\Local\Temp\fusion-ai-studio-1-install-20260916-134951`.
- Root activation: subsequently authorized and completed. See `ACTIVATION-RECEIPT.md`; its rollback procedure supersedes folder-only rollback below.
- Initial folder installation was uncommitted; activation is recorded in a dedicated local commit. The original modified ZIP and untracked `fusion-ai-studio-1.code-workspace` remain excluded.

## Evidence

`install-transcript.txt` records the supplied installer and embedded verification output. `PACKET-MANIFEST.json` records payload hashes. `verification.json` records the independent post-install checks: all 85 installed files matched the manifest; all 302 pre-existing files matched their baseline SHA-256 hashes. Packet, packaged living-build contract, and startup verification passed. These are local installation checks, not live Fusion validation.

`before-files.json` records pre-install file hashes without file contents. The external recovery directory contains copies of the original ZIP, workspace file, manifest, baseline, transcript, and extracted installer. The evidence files in this directory are durable repository-local copies; the external recovery location is under Windows Temp and may be cleaned by the operating system. Retain the original ZIP and this receipt with project backups.

## Roll back this folder-only installation

Inspect and preserve any edits made after installation. Run the following PowerShell commands only when rollback is wanted. They move the installed folder into a recovery directory without deleting it. Root activation, if performed later, requires its own recorded reversal.

```powershell
$ErrorActionPreference = 'Stop'
$targetRoot = (Resolve-Path -LiteralPath 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1').Path
$installedPath = Join-Path $targetRoot 'agent-app-build-startup'
$folder = Get-Item -LiteralPath $installedPath -Force
if (-not $folder.PSIsContainer -or $folder.Parent.FullName -ne $targetRoot -or
    ($folder.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
  throw 'Unexpected installation path; stop for review.'
}
$recoveryRoot = 'C:\Users\dasu\AppData\Local\Temp\fusion-ai-studio-1-install-20260916-134951'
$targetPrefix = $targetRoot.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar
$recoveryRoot = [IO.Path]::GetFullPath($recoveryRoot)
if ($recoveryRoot.Equals($targetRoot, [StringComparison]::OrdinalIgnoreCase) -or
    $recoveryRoot.StartsWith($targetPrefix, [StringComparison]::OrdinalIgnoreCase)) {
  throw 'Recovery directory must be outside the repository.'
}
New-Item -ItemType Directory -Path $recoveryRoot -Force | Out-Null
$archive = Join-Path $recoveryRoot ('removed-startup-' + [guid]::NewGuid())
if (Test-Path -LiteralPath $archive) { throw 'Recovery destination exists.' }
Move-Item -LiteralPath $installedPath -Destination $archive
if ((Test-Path -LiteralPath $installedPath) -or -not (Test-Path -LiteralPath $archive)) {
  throw 'Rollback verification failed.'
}
Write-Output "Preserved installed folder: $archive"
git -C $targetRoot status --short --untracked-files=all
```

Keep `docs/installations/2026-09-16-build-packet/` as the audit record. Do not reset the repository or restore the modified ZIP from Git: that would discard pre-existing work. No pre-existing target files need restoration for this folder-only installation.
