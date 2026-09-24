# Artifact purge execution prompt

Model version: **1.0.0**. Status: template, not authorized for execution.
Replace every placeholder. Invoking an unfilled template grants no authority;
executing a completed one must stay within trusted user instructions naming scope.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first.

MODEL_VERSION=1.0.0
PURGE_ID=<xdx-unique-purge-id>
MODE=<inventory|execute|resume>
REPO_ROOT=<resolved-surviving-checkout-root>
PLAN_PATH=<docs/builds/purge-id/purge-plan.md>
EXPECTED_BASE_BRANCH=<branch>
EXPECTED_BASE_HEAD=<reviewed-commit>
DELETE_REMOTE_BRANCH=false

OBJECTIVE AND AUTHORITY
Apply PLAN_PATH's approved exact-target dispositions, preserve everything outside
scope and retain auditable evidence. Accuracy and completeness precede elapsed time.
This prompt does not create authority. Match each destructive action to trusted
user authorization for its target and lifecycle state. Business records, credentials,
shared artifacts, published copies and remote refs are excluded unless separately
and explicitly authorized; this model does not supply a business-data purge procedure.
Inventory mode performs read-only discovery. Execute/resume may mutate only rows
with valid authority and current passing preconditions. Do not ask again for
unchanged authority already granted; unresolved scope is not implied permission.

STARTUP AND PRESERVATION
Follow the canonical playbook, registry and current-task session gates. Record
UTC start and exact checkout, branch, HEAD, environment and identity without secrets.
Read source evidence and inventory base status, worktree registration and branch tips.
Preserve unique code, reports and evidence outside every deletion target. Verify
the preserved copies and branch integration before local removal. Do not run this
from the worktree being removed. Use the surviving checkout's configuration only.

INVENTORY AND DISPOSITIONS
Use the plan's target manifest as the only scope owner. Verify exact remote code,
ID, DRAFT/PUBLISHED status, version/ETag and ownership. Naming prefixes are not proof.
For each dependency, establish reverse-consumer completeness including pagination
and known-consumer cross-checks. A short list or missing usage view is not proof of
zero consumers. Mark incomplete evidence unknown and retain that dependency.
Record delete, retain-unchanged, already-absent or blocked for each target.
Retention must be reflected in exit criteria; never later require its deletion.
Revalidate installed CLI/UI capabilities; do not assume old tool limitations.

REMOTE EXECUTION
Derive deletion order from the actual dependency graph: consumers before providers.
Serialize mutations. Immediately before each deletion recheck identity, lifecycle,
version and authorized scope. Pause the affected chain on drift or uncertainty.
Use supported tools only. After each action require an independent exact-target
readback. Authentication, transport or permission errors do not establish absence.
If result is uncertain, reconcile before another deletion. Never blindly retry.
Unrelated independent actions may continue only when their authority and dependencies
remain proven. Record retained targets and before/after identity/hash evidence.
Maintain the target Studio context and keep-alive under canonical policy when using UI.

LOCAL EXECUTION
Resolve each exact worktree path physically, check registration and expected branch,
and reject root/base paths, paths outside the approved worktree boundary and junction
or symlink escapes. Preserve dirty/untracked content; do not force removal.
Require the intended branch tip to be contained in the approved preservation ref.
Use normal Git worktree removal and local branch deletion without force. Verify
registration, path and ref after each action. Never guess a Git administrative path
from a folder name. For Windows residuals, use the previously captured actual Git
administrative path, verify confinement and ownership again, and remove only proven
task-owned leftovers with native PowerShell; do not chain shells or widen scope.
An already-absent worktree does not prove its branch or remote artifacts are absent.
Remote branch deletion remains off unless explicitly authorized for an exact remote,
ref and expected tip; do not treat this flag alone as approval. Recheck before action.

RECOVERY AND CLOSEOUT
Resume from retained receipts and fresh readbacks; never replay completed deletions
merely because a prior process was interrupted. Stop the affected action for unknown
consumers, lost identity, drift, unavailable preservation or missing authority.
Git rollback cannot restore tenant state. Report restoration capability honestly.
Reconcile every target and protected asset against its intended disposition. Report
server and local outcomes separately: complete-to-approved-dispositions, partial or
blocked. Retained targets are not deleted; blocked required deletions prevent completion.
Finish timing, lessons and Closeout. Verify base history and unrelated state were
preserved through cleanup; any later scoped receipt commit is an intentional new HEAD.
Commit only records in the surviving checkout. Push/publication require separate
authority. Report exact commit, dispositions, remaining limits and evidence paths.
```
