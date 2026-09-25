# Intake and learning register
Task: xdx-worktree-purge-20260925
Authority: user requested purge of any worktrees and related artifacts in this repository.
Scope: sole linked checkout .worktrees/xdx-supplier-core-20260925, its exact Git registration and fully integrated branch codex/xdx-supplier-core-20260925.
Baseline: TestingWFBuildTools at bda27eaf124a64fad8e8dedf0135bff4b56cf46a; three pre-existing temp deletions remain untouched.
Preservation: copy five untracked bootstrap records with SHA-256 validation before removing originals; no unique commits, ignored files or changed tracked files in target. Historical build documents and unmerged historical branches retained. No business objects, remote artifacts, credentials or remote refs in scope.
Model: artifact-purge 1.0.1 at bda27ea. Gates 1-9 app/runtime tests excluded because no app implementation or remote mutation occurs. Verification: copy hashes, unchanged target tip, clean target, no junction escapes, Git/path/ref readback and protected base status.
Deletion class: local derived checkout and integrated branch; preserved evidence remains under this record. Canonical owner: surviving base. External boundary: none. User authority already granted for local worktree purge.
Plan: Startup; preserve records; repair Linux registration to physical Windows path; normal worktree removal; normal integrated-branch deletion; reconcile handoff and Closeout; scoped local receipt commit. No push.
Learning: existing exact-path and preservation rules apply. No new reusable lesson warranted; host path mismatch is handled by Git worktree repair.
