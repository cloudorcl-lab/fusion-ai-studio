# Intake and learning register

Current phase: Prebuild A, prior-attempt inventory and dependency-safe purge.
User instruction: use the plan and prompt in temp to start the build; continuous timing confirmed.
Task ID: xdx-supplier-lifecycle-agent-retry-20260923-a-prebuild
Base: TestingWFBuildTools at b5034c666b886af834b1d834db4e8f00848efd6e.
Attempt ID: retry-20260923-a.

## Current phase contract
Read exact DRAFT/PUBLISHED app XDX_SUPPLIER_LIFECYCLE and workflow XDX_SUPPLIER_LIFECYCLE_AGENT, and BOs XDX_SUPPLIER_INFORMATION, XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS, XDX_SUPPLIER_PRODUCT_SERVICE_CATEGORIES. Refresh identity, versions and complete reverse consumers before deletion. Stop on unknown dependency or published copy. A code prefix is not ownership proof. Use supported Studio UI and CLI readback. Preserve Fusion business records, stash, unrelated skill audit and historical evidence. Prior worktree and branch are expected absent; verify independently. No app authoring before the purge exit gate.

The user invoked the execution prompt including its purge bootstrap. Permanent UI deletion remains subject to any tool-required action-time confirmation after inventory. No push or publication authorized.

## Resource inventory and later-phase obligations
The current prebuild phase operates only on AI Studio artifact definitions; no Fusion resource operations or payload design occur. P0 must read matching 26C references for suppliers, addresses, sites, contacts, business classifications, contact addresses, products/services, site assignments and procurement BU LOV. Locate category lookup reference before authoring. Reconcile the receipt and pass Startup again for that expanded scope.

## Applied lessons
- Current handoff supersedes historical clean-base memory: use TestingWFBuildTools, never the diverged clean-base ref.
- Refresh server identity and reverse consumers; Git cannot roll back server deletion.
- Require exact-code absence after each serial delete.
- Distinguish policy PASS, session PASS and runtime acceptance.
- Retry architecture and scope are supplied by temp/xdx_supplier_lifecycle_plan.md: one terminating app-bound Query route, deterministic approvals and minimal BO surface; no speculative scaffolding.
- No previous successful tests count as retry acceptance.

## Open work
Prebuild inventory, dependency proof, purge; unique worktree and clean seed; P0-P9 and Closeout remain pending. Full build incomplete.

2026-09-23 user decision: option 1 approved. Retain all three existing BOs unchanged, build unique retry BOs, continue exact prior DRAFT app/workflow cleanup. Active thread goal set for full P0-P9 and Closeout. User reaffirmed new worktree requirement; no implementation in base.

Prebuild A completed at 2026-09-23T18:57:00Z. Revised scope: exact DRAFT app/workflow deletion with readback, three BOs retained unchanged per user. No new reusable lifecycle rule: existing exact-code/consumer-proof rules prevented unsafe BO deletion. No operation-level lesson because no Fusion resource operation occurred. P0-P9 remain separate downstream work; prebuild Closeout does not close full build.
