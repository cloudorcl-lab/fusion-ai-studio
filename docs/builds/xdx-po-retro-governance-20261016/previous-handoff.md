# Active handoff — Inventory Planning export analysis

Task xdx-inventory-planning-analysis-20261015. Read-only analysis of D:/Temp/worktrees/xx-inventory-planning-command-center; coordinator checkout C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1, branch TestingWFBuildTools. Target is an artifact export without Git metadata, not a Git worktree.

Five artifacts and all eleven BO function references present; all hashes match retrieval manifest. Review: 84 top-level/93 total nodes; eight prioritized findings, including query filter normalization, stale convergence target, invalid error producer, empty-plan crash, PAB alignment, policy shape, missing search headers and unused action. Source defects and offline probes are separated from unobserved runtime behavior.

[Analysis](../builds/xdx-inventory-planning-analysis-20261015/analysis.md), [evidence](../builds/xdx-inventory-planning-analysis-20261015/analysis-evidence.json), [verification](../builds/xdx-inventory-planning-analysis-20261015/report-verification.json), [ledger](../builds/xdx-inventory-planning-analysis-20261015/build-ledger.json), [failures](../builds/xdx-inventory-planning-analysis-20261015/failure-ledger.json). Previous handoff preserved in this run. No product changes, tenant requests, saves, writes or tests. Query CLI fails; its BO resolution is legacy-layout limited; direct binding check resolves all BOs and flags two missing search headers. Runtime readiness unproven.

No repair was requested. Next action, if requested: establish a proper checkout, review approved repair scope and fix the confirmed source contracts before runtime acceptance. Prior supplier evidence and accepted transaction restrictions remain in the preserved previous handoff. No commit or push performed for this analysis.

[Time tracker](../builds/xdx-inventory-planning-analysis-20261015/time-tracker.md). Analysis delivery checkpoint covers 248.977 seconds after initialization; initial reading and final gate tail excluded.
