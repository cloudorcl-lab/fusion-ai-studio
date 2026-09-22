# Rollback and uninstall

These steps reverse local startup-pack installation and activation. The installer
copies only `agent-app-build-startup/`; it does not activate root files, install
global tools, or deploy Fusion artifacts. There is no automatic uninstaller.

## Before installation or upgrade

1. Record the absolute target repository path, branch, `git rev-parse HEAD`, and
   `git status --short --untracked-files=all`. For a repository without a commit,
   make a baseline commit first. Preserve unrelated edits separately; Git does
   not back up untracked or ignored files.
2. Keep the original ZIP and `PACKET-MANIFEST.json` outside the target repository.
   Record the manifest `sourceCommit` and ZIP SHA-256 (`Get-FileHash -Algorithm
   SHA256`). That source commit identifies the packet producer, not the target's
   pre-install baseline.
3. Back up existing destination files and any uncommitted/ignored project data
   to a reviewed location outside the repository. Confirm the backup is readable.
4. Record each activated target path, whether it was added or merged, its prior
   version or backup, and the dedicated installation/activation commit SHA.
   Include any root instruction edits, seed files and materialized build records.
   Keep unrelated work out of that commit. Record upgrade commits separately.

## Failed install or folder-only uninstall

If verification fails before copying, inspect the target: there may be nothing
to undo. A copy or post-copy verification failure can leave a partial directory;
the installer refuses that existing directory on retry.

1. Stop processes using the installed folder. Confirm the recorded repository,
   inspect `agent-app-build-startup/` (including hidden files), and preserve any
   edits or evidence added after installation. If root activation started, also
   follow the activated-repository steps below.
2. Move only that exact folder into the external recovery location. This removes
   it from the active repository while retaining a recoverable copy. Substitute
   real, reviewed paths; the recovery directory must already exist:

   ```powershell
   $ErrorActionPreference = 'Stop'
   $targetRoot = (Resolve-Path -LiteralPath 'C:/path/to/target-repository').Path
   $recoveryRoot = (Resolve-Path -LiteralPath 'C:/path/to/external-recovery').Path
   $installed = Join-Path $targetRoot 'agent-app-build-startup'
   $targetPrefix = $targetRoot.TrimEnd('\', '/') + [IO.Path]::DirectorySeparatorChar
   if ($recoveryRoot.Equals($targetRoot, [StringComparison]::OrdinalIgnoreCase) -or
       $recoveryRoot.StartsWith($targetPrefix, [StringComparison]::OrdinalIgnoreCase)) {
     throw 'Recovery directory must be outside the target repository.'
   }
   $folder = Get-Item -LiteralPath $installed -Force
   if (-not $folder.PSIsContainer -or $folder.Parent.FullName -ne $targetRoot -or
       ($folder.Attributes -band [IO.FileAttributes]::ReparsePoint)) {
     throw 'Expected a real startup folder directly beneath the target repository.'
   }
   $archive = Join-Path $recoveryRoot ('agent-app-build-startup-' + [guid]::NewGuid())
   if (Test-Path -LiteralPath $archive) { throw 'Recovery destination already exists.' }
   Move-Item -LiteralPath $installed -Destination $archive
   if ((Test-Path -LiteralPath $installed) -or -not (Test-Path -LiteralPath $archive)) {
     throw 'Folder removal verification failed.'
   }
   Write-Output "Retained recovery copy: $archive"
   ```

3. Inspect the retained copy and target Git diff/status. Confirm root files and
   unrelated files are unchanged. If the folder was tracked, review and commit
   only its removal. Keep the recovery copy until retention requirements allow
   its explicit deletion; do not delete the target repository or its parent.
4. For failed installation, verify the original packet, correct the reported
   failure, then reinstall into the now-absent destination. For undoing a
   folder-only removal, move the retained folder back only when the exact
   destination is absent. Reverify a complete restored package; a partial failed
   installation is evidence, not a usable rollback version.

## Rollback after root activation

Removing the startup folder does **not** undo activation. Review the recorded
activation delta across root `AGENTS.md`, the canonical playbook, living-build
verifier/test, `.agents/skills/aistudio/`, `docs/handoffs/ACTIVE_HANDOFF.md`, and
materialized `docs/builds/<build-id>/` records.

1. Preserve current work and evidence; start with a clean index/worktree for a
   Git reversal. Review `git show --stat <activation-commit>` and
   `git show <activation-commit>` against the installation receipt.
2. For a dedicated, non-merge installation/activation commit, use
   `git revert --no-commit <activation-commit>`. Review `git diff --cached` and
   resolve conflicts while preserving later project changes. If the inverse is
   wrong, `git revert --abort` applies while a revert is in progress; after a
   successful no-commit revert, there may be no operation to abort. In that case,
   restore only reviewed affected paths from the pre-revert HEAD, provided the
   starting worktree/index was clean. Do not use a repository-wide hard reset.
3. For mixed commits or uncommitted activation, manually reverse only the
   recorded pack changes using the baseline/backup. Restore pre-existing content;
   remove a newly added file only after confirming no later consumer needs it.
   Never delete the entire `.agents`, `docs`, `scripts`, or `tests` directory.
4. Preserve populated handoffs, learning records, customer artifacts, reports,
   data and secrets. Remove or repoint references to retired startup files.
   Inspect `git worktree list`: other worktrees retain their own copies and need
   separate reviewed propagation. Do not remove worktrees or branches as part
   of uninstall.
5. Verify the remaining repository's own tests and instruction links. If the
   living-build contract remains, run its verifier and regression test. If it
   has intentionally been removed, record that this repository is no longer
   build-ready under that contract; a missing verifier is not a passing check.
6. Review the final diff/status and commit the scoped reversal. Record baseline,
   reversed commit(s), preserved files and verification in the retained project
   handoff or external recovery receipt. Reread changed active governance and
   reconcile current-task Startup evidence; a new session is optional. Remove
   any remaining startup folder using the steps above.

## Upgrade rollback and full uninstall boundary

For an upgrade, reverse only the dedicated upgrade commit(s), newest first,
using the activation procedure. Restore the previous complete AI Studio skill
version together; do not mix CLI and reference versions. Restore the previous
startup folder from its verified ZIP or backup, preserving local customizations,
and run that version's startup and retained governance checks. Never overwrite
an existing folder with the installer.

A full local uninstall combines activation reversal with folder removal. It
does not reverse live Fusion saves/publication, remove customer data, revoke
access, remove credentials, or uninstall Git, Node.js or PowerShell. Any such
work needs its own exact target, authority and recovery procedure. Retain ZIPs,
backups and project evidence according to the project's retention requirements.
