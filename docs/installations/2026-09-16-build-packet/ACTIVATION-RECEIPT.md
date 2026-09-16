# Activation receipt

The user explicitly authorized installation and activation in this repository on 2026-09-16.

- Repository: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1`.
- Branch: `TestingWFBuildTools`.
- Baseline HEAD: `3f4a1e380df7be2d30e6b21e6223aec4f97ef1cf`.
- Dedicated commit subject: `Install and activate agent-app build packet with rollback records`.
- Resolve the exact commit: `git log -1 --format=%H -- docs/installations/2026-09-16-build-packet/ACTIVATION-RECEIPT.md`.
- Durable external backup: `C:\Users\dasu\Documents\Codex-Install-Backups\fusion-ai-studio-1-20260916-134951`.

## Changes and evidence

`activation-plan.json` records every seed target, prior hash, seed hash and action: five additions, two replacements and 57 unchanged files. Replacements are `.agents/skills/aistudio/SKILL.md` and `.agents/skills/aistudio/scripts/aistudio.js`; their original bytes are preserved under the external backup's `before/` directory. The CLI adds the packet's `list-remote-applications` command; this installation validates loading, not server behavior.

Root AGENTS preserves the user's quality, accuracy-first, webapp and design-first instructions and adopts package startup mechanics. The handoff contains actual project state. Seven build records are initialized in `docs/builds/xdx-build-packet-install/`. The startup folder and audit files are new. The playbook is the canonical lifecycle owner; the packaged seed remains a delivery snapshot. No additional reusable playbook rule was warranted.

`activation-transcript.txt` records target writes. `activation-verification.txt` records the living-build verifier, positive/negative regression, startup verifier, CLI syntax/help, activated seed parity, playbook link checks and preservation of 300 unrelated pre-existing files. CLI help is retained in `cli-help.txt`. The initial installation proved all 85 installed payload hashes; the package was not edited during activation.

The source ZIP and workspace file retain their original hashes and are excluded from the dedicated commit. No environment files, app artifacts or remote state were changed. No push occurred. Start a fresh Codex run before the next build.

## Rollback

1. Preserve any work created after activation and inspect the exact installation commit with `git show --stat <commit>` and `git show <commit>`. Use the commit lookup above or the external `commit-receipt.json`.
2. With a clean index and worktree, reverse only that dedicated commit using `git revert --no-commit <commit>`. Review the inverse before committing it. Do not run a repository-wide reset. Preserve the modified ZIP and workspace file separately before preparing a clean rollback worktree; never discard them.
3. If activation is uncommitted or later changes conflict, use `activation-plan.json` and the external `before/` backups to restore only the two replaced files. Remove or archive only added paths owned by this installation after preserving later edits: root AGENTS, the canonical playbook, active handoff, verifier/test, startup folder and this installation's build records. Do not delete entire `.agents`, `docs`, `scripts` or `tests` directories.
4. Keep the audit and external recovery copies. Reverting the commit removes its repository-local evidence; the external copy remains. The folder-move procedure in `INSTALL-RECEIPT.md` is only for the startup folder and does not undo activation.
5. Verify restored file hashes against `before-files.json` and the two originals against `activation-plan.json`. Inspect Git status. Full reversal intentionally removes this living-build contract; missing governance after rollback is not a passing build-ready state. Start a fresh Codex run after rollback.

The original ZIP, workspace file and original skill files are backed up outside Windows Temp. Rollback was documented and backed by hash-verified originals; it was not executed on this repository.

## Whitespace review

The full staged whitespace check reports six inherited/generated lines: three in the immutable packet seed (`app-vibe-master.md:678` and `aistudio.js:11143,14368`) and the standard `Configuration Name:` line in each of three PowerShell transcripts. These files are preserved byte-for-byte for payload integrity or audit evidence. The scoped authored-change whitespace check excludes only the supplied startup folder and those three transcripts. This is an explicit evidence-format exception, not a functional test failure.
