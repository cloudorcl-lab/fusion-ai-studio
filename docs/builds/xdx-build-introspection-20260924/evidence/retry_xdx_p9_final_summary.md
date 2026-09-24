App test summary
App: XDX Supplier Lifecycle
Status: passed

Reports:
- Consolidated report: [consolidated-suite-result.html](test-reports/apps/xdx_supplier_lifecycle/consolidated-suite-result.html)
- App suite report: [suite-result.html](test-reports/apps/xdx_supplier_lifecycle/suite-result.html)

Tests: 1/1 passed, 0 failed, 0 need judge

Backing workflow suite summaries

Workflow: XDX Supplier Lifecycle Agent
Status: passed
Report: [suite-result.html](test-reports/workflows/xdx_supplier_lifecycle_agent/suite-result.html)
Tests: 19/19 passed, 0 failed, 0 need judge

Metrics:
- Token data: observed for 19/19 cases; input 870927; output 69679; total 940606.
- AI units: 755 total (151 token units, 19/19 cases computed).
- Latency: total workflow time 413.6s across 19/19 model-backed cases.

Optimization:
- Model optimization is available for this workflow. 19 passing tests exercise model-backed nodes.
- Next action: Run node-level model optimization sweep. To run it, reply: Run the model optimization sweep for this workflow and summarize the best model placement per LLM node.
- Creates a fresh node-level sweep, runs every candidate profile, judges results, and generates the sweep report.
- The sweep reports recommendations only. Applying model changes requires a separate approval.
- For a workflow-wide model comparison instead, reply: Run a workflow-level model optimization sweep.
