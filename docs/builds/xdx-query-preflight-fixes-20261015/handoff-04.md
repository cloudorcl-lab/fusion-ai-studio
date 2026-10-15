# Active handoff

Current task: xdx-query-preflight-fixes-20261015, branch TestingWFBuildTools; starting HEAD 179d0061f275755af2384dd4f6e4699afebb7451. User explicitly authorized fixing four Query preflight gaps using sub-agents and TEST ONLY the fixes, and required updating this handoff at every milestone.

Milestone: **Implementation integrated**, observed 2026-10-15T11:38:10.257Z. Single-writer validator repair integrated with 43 focused tests. Root and independent review are checking nested scope, error paths, parallel joins and interpolation; no broad suites or tenant operations. Next: focused GREEN.

Scope: producer availability on every incoming route; unresolved BO/function dependencies; nested BO path inputs and bindings; expression delimiter order. One production-file writer, separate focused-test writer, independent reviewer. No app build, tenant calls, runtime tests, broad suites, deployment or push. Existing env/workspace edits, assets and prior analysis preserved.

Run owners: [build ledger](../builds/xdx-query-preflight-fixes-20261015/build-ledger.json), [intake/learning](../builds/xdx-query-preflight-fixes-20261015/intake-and-learning-register.md), [failure ledger](../builds/xdx-query-preflight-fixes-20261015/failure-ledger.json), [time-tracker.md](../builds/xdx-query-preflight-fixes-20261015/time-tracker.md). Milestone snapshots in this run preserve handoff history; this file remains the only active handoff.

Prior analysis: [report](../builds/xdx-codebase-analysis-20261015/analysis.md). Its results are historical and do not prove the fixes.

Product context retained: user-supplied build-standard integration and supplier design revision 2. Written-spec approval and implementation-plan/execution selection remain the next product-build gates. The analysis does not authorize implementation or change the design's acceptance status.

Current revision record: [build ledger](../builds/xdx-build-standard-design-update-20261014/build-ledger.json), [self-review](../builds/xdx-build-standard-design-update-20261014/self-review.md), [failure ledger](../builds/xdx-build-standard-design-update-20261014/failure-ledger.json), [time-tracker.md](../builds/xdx-build-standard-design-update-20261014/time-tracker.md). Task identity: xdx-build-standard-design-update-20261014. Root BUILD_STANDARD.md now owns general execution/measurement; the canonical playbook remains AI Studio lifecycle owner. Primary timing categories are exclusive; nested command/activity totals are diagnostic. Current design has upfront prerequisites, a complete first-slice milestone, run-ledger/milestone/check/usage accounting and corrected deterministic control-command routing.

Future install packets include the standard. A local scratch packet is used only for verification; no ZIP distribution is released. The packaging transformer labels the exact excluded private archive locator as a source-only reference, with all other missing dependencies still rejected. Original assets remain unchanged; environment/workspace and prior analysis changes remain outside the scoped governance commit.

Design: [written spec](../superpowers/specs/2026-10-14-xdx-supplier-conversation-design.md). Original design-stage [source review](../builds/xdx-supplier-conversation-design-20261014/source-review.json), [approvals](../builds/xdx-supplier-conversation-design-20261014/approvals.json) and [time-tracker.md](../builds/xdx-supplier-conversation-design-20261014/time-tracker.md) remain historical evidence for revision 1. Use the current revision's session receipt and measured Closeout output for this update's gate results. Runtime criteria remain unverified.

Approved behavior: app-local Ask Oracle; fixed getting-started guidance with zero automatic business GETs; supplier/address/site/contact queries; active-only default and explicit inactive reads; classification-only supplier templates; same-parent address/BU/purchasing-purpose site templates; reviewed client/bill-to BU assignments; exact-revision confirmation; no automatic name suffix/upsert; preserved accepted site and separately confirmed missing-assignment continuation.

No live test/write budget has been allocated. Resolve exact target release and lookup/numbering contracts, supported conversation reservation/test-runner state, and current BO readiness before runtime work. Three 26C create pages were inaccessible through the documentation tool; local 26C contracts remain candidate evidence. Never substitute another release or negotiation supplier endpoint merely because its title matches.

Prior local analysis evidence remains uncommitted and unchanged. Existing env.properties/workspace changes were preserved. New implementation must use a fresh XDX worktree from committed current governance after design and plan approval. No earlier archived build is resumed.

Retained: Oracle sample library, reusable skills/CLI/verification tooling, startup and build models, canonical lessons/object references, configured environment and existing stashes. Historical evidence is external; see [archive locator](../lessons/ARCHIVED_EVIDENCE.md). Do not use archived run instructions or accepted/uncertain write allocations as a new-build default.

Retirement record: [plan](../builds/xdx-clean-restart-20261013/purge-plan.md), [verification](../builds/xdx-clean-restart-20261013/evidence/verification.json), [failure ledger](../builds/xdx-clean-restart-20261013/failure-ledger.json), [time-tracker.md](../builds/xdx-clean-restart-20261013/time-tracker.md). Confirm Closeout from the record's evidence.

Next action: user reviews the written design. After approval, prepare the implementation plan; before product artifacts follow agent-app-build-startup/AGENTS.md in a fresh worktree, initialize new requirements/authority/evidence and pass Startup. No saved/runtime acceptance is implied. Existing configured sign-in rejections remain historical; verify usable credentials/account state before any future authorized login and do not retry known unchanged rejected credentials.
