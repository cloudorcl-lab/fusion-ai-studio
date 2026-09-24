# XDX Supplier Core — execution prompt

Version 1.0.0, 2026-09-24. Based on object-lifecycle model 1.0.1.
Prepared for the next user-launched build; authoring this prompt does not execute it.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first.
Execute docs/builds/xdx-supplier-core-20260924/plan.md.

BUILD_ID=xdx-supplier-core-20260924
MODE=new-scoped-rebuild
BASE_REPO=C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1
BASE_BRANCH=TestingWFBuildTools
BUILD_BRANCH=codex/xdx-supplier-core-20260924
BUILD_WORKTREE=C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1/.worktrees/xdx-supplier-core-20260924
MODEL_VERSION=1.0.1

Deliver native Agentic App query and create flows for exactly:
1. Suppliers
2. Supplier addresses
3. Supplier sites
4. Supplier contacts

NO OTHER SUB-OBJECTS. No assignments, classifications, products/services/categories,
contact-address associations, roles, data access, spend authorization, merge history,
DFFs, global DFFs, attachments, payments, third-party payments or user provisioning.
BU GET is only a read-only site-field lookup; do not build a BU lifecycle.
No update/delete of persisted business records, PDF, email, batch create or custom UI.

Use the plan as the scope owner and its eight-row requirement register as acceptance.
Accuracy, completeness and elapsed time come before consumption optimization.
Retain prior applicable authorization; distinguish it from exact-payload approval
inside the app. Do not infer publication, deletion or broader-scope authority.

Start and acknowledge UTC build timing at the first execution action. Resolve the
committed base revision containing this plan and record it. Create and verify the
new worktree and branch from that revision, preserving unrelated base changes.
Never resume the removed prior worktree or build in base. Verify target layout and
use only the active checkout's configuration without exposing secrets.

Read canonical governance and the four resource references plus site BU lookup.
Initialize current execution records separately from the planning receipt. Review
requirements, architecture and golden-path manifest; pass Startup/package gates.
Revalidate current eqih-dev21 identity, contracts and proposed exact-code availability.
Retain existing BOs, historical records and archive evidence unchanged. No purge.
Create only the app, workflow and narrowly scoped BO named in the plan.

Execute P0–P6 in dependency order. Prove the actual DRAFT app Query with real BO
execution first. Prove one complete supplier transaction before copying that pattern
to address, site and contact. Query/list/detail acceptance is independent of the
GET used to confirm a create. Complete all eight requirement rows.

Keep Query terminating and app-bound. Models propose patches; deterministic code
owns merge, validation, revision, parent binding, approval and write authorization.
Use supported widgets and verify completed native rendering. Run the canonical
Query preflight before applicable remote actions and after graph/BO/binding changes.
Keep approved payloads exact. Never replay an accepted POST. Reconcile any uncertain
write read-only before another attempt; cancel or stale approval submits nothing.

Run focused checks, required affected regression and final configured acceptance.
Use canonical Gate 6 to account for ATLAS suggestions outside scope without running
them or claiming they passed. Required failures, judges and missing native evidence
remain blockers. Do not import the prior broader suite or add a child route to fix
a lookup/prerequisite issue. Continue independent authorized work when possible.

Maintain activity timing, keep-alive deadlines and 70–75% context checkpoints.
At completion reconcile eight requirements, actual artifact versions, persisted
writes, lessons and dependencies. Pass current-task Closeout and commit scoped work.
Report DRAFT acceptance, evidence, elapsed time and limitations. No push/publication.
```
