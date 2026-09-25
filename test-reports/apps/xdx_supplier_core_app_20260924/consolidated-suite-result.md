# AI Studio Test Suite Result

Total: 16
Passed: 16
Failed: 0
Needs Judge: 0

Workflow suites: 1 backing workflow report(s)
App suite: test-reports/apps/xdx_supplier_core_app_20260924/suite-result.html

## App Suite Summary

App tests: 1/1 passed, 0 failed, 0 need judge.

Reports:
- Consolidated report: [consolidated-suite-result.html](test-reports/apps/xdx_supplier_core_app_20260924/consolidated-suite-result.html)
- App suite: passed 1/1, report: [suite-result.html](test-reports/apps/xdx_supplier_core_app_20260924/suite-result.html)

## Backing Workflow Suite Summaries

1. Workflow 1
   Status: passed
   Report: [suite-result.html](test-reports/workflows/xdx_supplier_core_20260924/suite-result.html)
   Tests: 15/15 passed, 0 failed, 0 need judge

   Metrics:
   - Token data: observed for 15/15 cases; input 246770; output 13018; total 259788.
   - AI units: 300 total (60 token units, 15/15 cases computed).
   - Latency: total workflow time 553.3s across 15/15 model-backed cases.

   Optimization:
   - Model optimization is available for this workflow. 15 passing tests exercise model-backed nodes.
   - Next action: Run node-level model optimization sweep. To run it, reply: Run the model optimization sweep for this workflow and summarize the best model placement per LLM node.
   - Creates a fresh node-level sweep, runs every candidate profile, judges results, and generates the sweep report.
   - The sweep reports recommendations only. Applying model changes requires a separate approval.
   - For a workflow-wide model comparison instead, reply: Run a workflow-level model optimization sweep.

## Action Required

None.
