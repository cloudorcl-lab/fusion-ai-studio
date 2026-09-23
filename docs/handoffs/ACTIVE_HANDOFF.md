# Active Handoff

Active task: `xdx-supplier-lifecycle-server-purge-plan-20260923` on base branch
`TestingWFBuildTools` in
`C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1`.

The completed XDX Supplier Lifecycle Agent and prevention controls are preserved in
Git. This task reviewed the current AI Studio server artifacts without mutating
them, evaluated the related BO surface, and extended the retry inputs with a
dependency-safe server purge gate.

Read-only server evidence confirmed:

- DRAFT app `XDX_SUPPLIER_LIFECYCLE`, version 1; no published copy found.
- DRAFT workflow `XDX_SUPPLIER_LIFECYCLE_AGENT`, version `86078581`, ETag `30`;
  no published copy found.
- BOs `XDX_SUPPLIER_INFORMATION` (36 functions),
  `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` (one function) and
  `XDX_SUPPLIER_PRODUCT_SERVICE_CATEGORIES` (one function).

The exact review and conditional deletion order are in
[server-purge-and-bo-streamlining-plan.md](../builds/xdx-supplier-lifecycle-agent/server-purge-and-bo-streamlining-plan.md),
with compact evidence in
[xdx_server_purge_review_20260923.json](../builds/xdx-supplier-lifecycle-agent/evidence/xdx_server_purge_review_20260923.json).
No server artifact or Fusion business record was deleted.

The optimized retry uses a dedicated 19-function BO surface: 17 supplier
transaction functions plus two reference lookups. It removes 11 excluded
DFF/attachment/third-party-payment functions, three unused generic supplier
functions and five transaction-irrelevant query-only functions. The current main
supplier BO may be shared, so whole-BO deletion remains blocked until the AI Studio
dependency view proves zero external consumers.

Reusable inputs:

- [optimized execution prompt](../../temp/xdx_supplier_lifecycle_build_prompt.md)
- [optimized phased plan](../../temp/xdx_supplier_lifecycle_plan.md)

Before the retry build, obtain exact-target destructive authorization, refresh all
ids and versions, and purge in dependency order: DRAFT app, DRAFT workflow,
dedicated lookup BOs, then the supplier BO only after consumer proof. Require
exact-code not-found read-back after every deletion. The installed CLI has no
whole-app/workflow/BO delete command, so deletion uses the AI Studio management UI
and CLI read-back.

Preserve the unrelated untracked skill-audit directory and safety stash
`pre-fast-forward-preserve-base-edits-20260923`. Server-side artifact cleanup and
old-worktree removal remain future destructive actions; this planning task only
prepares reviewable instructions and evidence. Command and review timing is retained
in the active [time tracker](../builds/xdx-supplier-lifecycle-agent/time-tracker.md).
