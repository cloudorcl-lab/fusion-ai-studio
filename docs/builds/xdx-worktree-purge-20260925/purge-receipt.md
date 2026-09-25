# Local worktree purge receipt

Task: xdx-worktree-purge-20260925

Completed local disposition:
- Removed sole linked worktree `.worktrees/xdx-supplier-core-20260925` and exact `.git/worktrees/xdx-supplier-core-20260925` metadata.
- Deleted fully integrated local branch `codex/xdx-supplier-core-20260925` at bda27eaf124a64fad8e8dedf0135bff4b56cf46a using `git branch -d`.
- Preserved five unique untracked startup records in `preserved-bootstrap/`; every copy matched the original SHA-256 in `preservation-manifest.json` before source removal. No ignored files or modified tracked files were found.
- Git registration originally used /mnt/c paths. `git worktree repair` corrected it. Normal removal unregistered the checkout but hit Windows permissions; native PowerShell removed only the two resolved, reparse-free residual paths.

Verified: only surviving base appears in Git worktree inventory; exact checkout and metadata paths absent; removed branch absent; prune dry-run empty. Base HEAD remained bda27ea through deletion. Three pre-existing temp deletions unchanged.

Retained: historical build documentation, reusable tooling, preparation templates and evidence archives; base and release branches; three historical unmerged local branches (`codex/xdx-agent-app-clean-base`, `codex/xdx-supplier-lifecycle-agent-retry-20260923-a`, `codex/xdx-supplier-workspace`). These contain unique history and have no remaining checkout. Remote refs, server artifacts and business data were not changed or revalidated. This is local worktree cleanup, not a server purge.

Recovery: recreate the removed checkout at bda27ea using Git and restore the five files to the manifest's original relative paths. Preserved records are historical, not active build instructions. No unique committed history was deleted.

Learning review: no new reusable lifecycle or object change. Existing exact-path preservation rules cover the observed Windows residual handling.

Delivery: local scoped receipt/handoff commit follows Closeout. No push authorized or performed. Functional app tests are not applicable; validation is Git/path/hash evidence plus session gates.
