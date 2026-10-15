# Supplier workflow evidence run

[Open the PowerPoint](deliverables/xdx_supplier_workflow_evidence.pptx): 90 slides, 62 original screenshots and 90 speaker notes. Every recorded step has an outcome. The deck preserves intermediate loading frames with accurate captions, failures and fallback coverage.

## Results

The live UI run completed with **16 PASS, 3 FAIL and 2 BLOCKED**, across 20 planned rows including setup plus one separate harness finding. Native business retries: **0**. Six business writes were accepted once and retained.

- Supplier 1503, internal ID 300000340604948.
- Direct Address 300000340604955 and template Address 300000340604962 under Supplier 1503.
- Direct Contact 300000340604973 under Supplier 1503.
- Fallback Site 300000340604984 and Assignment 300000340604987 under existing Dell Supplier 1255.

Application failures: Contact template preparation failed before a new create; a standalone Assignment query returned Site details. The connected first Site and its Assignment were blocked because this workflow requires a same-supplier source Site. Fallback success does not establish a passing connected new-supplier journey. The separate harness failure assumed Address paging labels on the Contact empty-state screen; assessment was corrected using the same capture without another UI request.

## Script entry point

[The full journey module](../../../scripts/xdx_supplier_e2e_journey.mjs) exports `runSupplierJourney`. [Invocation and integration contracts](journey-usage.md) describe its supported CUA browser binding, observed target/source inputs, governance callbacks and host PowerPoint finalizer. Supporting modules provide durable capture, no-replay reservations, retry tracking and deck generation.

The reusable fresh plan has 21 business steps, including an explicit blocked connected-Assignment row and separate template readbacks. This run used adaptive execution through the durable runner while the concrete wrapper was qualified against its actual retained snapshots. **The final wrapper was not replayed against live records.** Its observer passed 18 focused local checks; the final plan-only change reused those unchanged checks after an exact source-impact qualification.

Resume this historical adaptive run through its [durable runner](runner-usage.md), preserving its existing step inventory and IDs. Do not substitute the fresh wrapper's different inventory or repeat accepted writes. A mismatched resume plan rejects before state mutation. Fresh execution requires a new approved run directory and a distinct stable token. This run's removal of numerical attempt limits does not change standing policy for future runs.

Read results without invoking the application:

```powershell
node scripts/xdx-supplier-e2e.mjs status docs/builds/xdx-supplier-e2e-evidence-20261015
```

The browser driver must run in the supported CUA context. A standalone Node invocation cannot operate the user's browser. The host deck finalizer must return an existing, hash-verified artifact; queued rendering remains pending.

## Evidence and qualifications

[Results](results.json) own step outcomes and record IDs. [Delivery](delivery.json) identifies the verified PPT. Immutable final deck input snapshots retain the exact render inputs before presentation-delivery metadata was added. [Deck qualification](deck-final-qualification.json) accounts for all screenshots, notes, rendering and visual review. [Failure ledger](failure-ledger.json) preserves implementation findings and explicitly retained product failures, without claiming product repairs.

The actual UI ran from 20:46:53.218 through 21:09:17.973 UTC on 2026-10-15. Durable-result initialization occurred later than the first UI request and is a separate timestamp. The build ledger and timing report own overall timing. Some retained setup captures have persistence timestamps rather than original acquisition timestamps. AX readiness and screenshot paint were separate observations; corrected notes disclose the affected intermediate frames.

Private drafts, renders, snapshots and small local qualification fixtures are retained to substantiate observed failures and corrections. They are diagnostic evidence, not application dependencies or demo screenshots. The run owner may archive them after evidence retention decisions; no tenant record cleanup occurred.
