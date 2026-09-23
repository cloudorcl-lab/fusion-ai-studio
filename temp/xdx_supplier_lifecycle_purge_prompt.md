# Rerunnable purge prompt — XDX Supplier Lifecycle attempts

Use this prompt from the governed base checkout before a retry and after an
abandoned or completed attempt. Replace every required placeholder. Invoking the
completed prompt authorizes deletion only for the exact listed task-owned server
artifacts, worktree and integrated local branch after all safety gates pass.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first. Then read the canonical living-build
playbook, object registry, the current attempt records and
docs/builds/xdx-supplier-lifecycle-agent/server-purge-and-bo-streamlining-plan.md.

PURGE_ID=<unique-lower-kebab-id>
REPO_ROOT=C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1
WORKTREE_PATH=<exact-absolute-attempt-worktree-path>
LOCAL_BRANCH=<exact-local-attempt-branch>
BASE_BRANCH=TestingWFBuildTools
APP_CODE=XDX_SUPPLIER_LIFECYCLE
WORKFLOW_CODE=XDX_SUPPLIER_LIFECYCLE_AGENT
SUPPLIER_BO_CODE=XDX_SUPPLIER_INFORMATION
BU_BO_CODE=XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS
CATEGORY_BO_CODE=XDX_SUPPLIER_PRODUCT_SERVICE_CATEGORIES
DELETE_REMOTE_BRANCH=false

AUTHORITY AND BOUNDARIES
- This invocation authorizes deletion of the exact task-owned targets above after
  version, dependency, ownership, integration and path checks pass.
- It does not authorize deleting Fusion suppliers or child business records,
  unrelated AI Studio artifacts, shared BOs with external consumers, stashes,
  unrelated local files, base history or remote branches when
  DELETE_REMOTE_BRANCH=false.
- Stop on a changed code/id/version after inventory, an unknown dependency, dirty
  or unintegrated worktree state, a path outside REPO_ROOT/.worktrees, or any target
  mismatch. Never use force, reset, clean, global prune or wildcard deletion.

GOVERNED STARTUP
1. Record UTC start, exact scope, authority and preserved resources in the active
   time tracker and learning register.
2. Establish a task-specific session-conformance receipt and pass PolicyOnly and
   Startup. No object reference is changed unless this purge discovers new verified
   operation behavior.
3. Record current BASE_BRANCH HEAD, worktree registrations, branch tips, active Git
   operations, stash list and scoped status. Preserve unique evidence before any
   destructive action.

SERVER INVENTORY
1. Use the active REPO_ROOT env.properties without displaying credentials. Run the
   first authenticated AI Studio CLI command with host credential-store access.
2. Read exact DRAFT and PUBLISHED state for APP_CODE and WORKFLOW_CODE. Fetch the
   three BOs by exact code. Record ids, versions/ETags, statuses, function counts,
   hashes and authenticated environment identity.
3. Record reverse consumers for every BO from the AI Studio dependency/usage view
   or an equivalent complete catalog check. Expected task consumer:
   WORKFLOW_CODE. A code prefix or filename is not ownership proof.
4. Keep one identified AI Agent Studio management tab alive between action groups
   and at least every five minutes. Log tab identity, artifact context,
   authentication state, action and result.

SERVER PURGE
1. The installed CLI does not provide whole-app, whole-workflow or whole-BO delete
   commands. Use the AI Studio management UI for deletion and the CLI for exact-code
   read-back.
2. Delete APP_CODE DRAFT first. If a published copy exists, stop and record it unless
   this invocation explicitly listed that published version for deletion. Require an
   exact-code not-found read-back before continuing.
3. Delete WORKFLOW_CODE DRAFT. Require exact-code not-found read-back.
4. Delete CATEGORY_BO_CODE, then BU_BO_CODE, only after each has zero remaining
   consumers. Require exact-code not-found read-back after each.
5. Delete SUPPLIER_BO_CODE only after a complete dependency review proves zero
   external consumers. If it is shared, retain the whole BO, record every consumer,
   and stop the whole-BO step. Remove task-owned functions only through a separate
   version-safe change with consumer regression evidence; do not infer authorization.
6. Repeat exact DRAFT/PUBLISHED app and workflow reads plus BO fetches. Server purge
   passes only when every authorized target is absent and every retained shared
   target has an explicit disposition.

LOCAL WORKTREE PURGE
1. Resolve WORKTREE_PATH and REPO_ROOT. Require WORKTREE_PATH to be an exact child
   of REPO_ROOT/.worktrees and to match `git worktree list --porcelain` when
   registered. Confirm LOCAL_BRANCH and its tip from that worktree.
2. Require a clean tracked/untracked target or record an exact preservation plan.
   Prove the branch tip is contained in BASE_BRANCH before branch deletion. If it is
   not integrated, stop and retain both worktree and branch; do not force deletion.
3. From the safe base checkout, run
   `git worktree remove <WORKTREE_PATH>` without `--force`.
4. Read back worktree registration and path existence. On Windows, if Git has
   unregistered the target but exact task-owned residual directories remain, resolve
   and prove both the worktree path and its `.git/worktrees/<name>` administrative
   path are inside REPO_ROOT, then remove only those two paths with native PowerShell.
   Never widen the deletion scope.
5. After registration and both paths are absent, delete LOCAL_BRANCH with
   `git branch -d <LOCAL_BRANCH>`. Do not use `-D`.
6. When DELETE_REMOTE_BRANCH=false, make no remote-ref mutation. When true, require
   separate explicit confirmation naming the remote and exact branch immediately
   before deletion.

CLOSEOUT
1. Prove exact server dispositions, worktree absence, Git administrative-path
   absence, local-branch absence, preserved base HEAD, preserved stashes, preserved
   unrelated files and unchanged remote refs.
2. Record the first removal attempt, any bounded Windows residual cleanup, exact
   commands, timings and results. Never hide partial failures.
3. Update the active handoff and durable purge evidence. Set the task receipt to
   Closeout, refresh reviewed hashes and pass the living-build Closeout verifier.
4. Commit only purge records to BASE_BRANCH. Push only when separately authorized.
5. Report server purge as complete, partial or blocked; local purge as complete or
   blocked; and state explicitly that Fusion business records were untouched.
```
