# AI Studio Test Suite Result

Total: 15
Passed: 15
Failed: 0
Needs Judge: 0

Workflow suites: 1 backing workflow report(s)
App suite: test-reports/apps/xdx_supplier_core_app_20260924/suite-result.html

## App Suite Summary

App tests: 1/1 passed, 0 failed, 0 need judge.

## Backing Workflow Suite Summaries

1. XDX Supplier Core 20260924
   Status: passed
   Report: [suite-result.html](test-reports/workflows/xdx_supplier_core_20260924/suite-result.html)
   Tests: 14/14 passed, 0 failed, 0 need judge

   Metrics:
   - Token data: observed for 14/14 cases; input 222134; output 11821; total 233955.
   - AI units: 270 total (54 token units, 14/14 cases computed).
   - Latency: total workflow time 492.1s across 14/14 model-backed cases.

   Optimization:
   - Model optimization is available for this workflow. 14 passing tests exercise model-backed nodes.
   - Next action: Run node-level model optimization sweep. To run it, reply: Run the model optimization sweep for this workflow and summarize the best model placement per LLM node.
   - Creates a fresh node-level sweep, runs every candidate profile, judges results, and generates the sweep report.
   - The sweep reports recommendations only. Applying model changes requires a separate approval.
   - For a workflow-wide model comparison instead, reply: Run a workflow-level model optimization sweep.

## Action Required

None.
