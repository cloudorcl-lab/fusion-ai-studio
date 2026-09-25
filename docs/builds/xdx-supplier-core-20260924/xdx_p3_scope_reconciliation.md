# P3 scope reconciliation

Raw plan evidence/xdx_p3_sync_plan.json is unchanged. Canonical Gate6 and the eight approved requirements govern coverage. This extends xdx_p2_scope_reconciliation.md; required behavior is never waived to satisfy a planner flag.

| Suggested scenario(s) | Disposition |
| --- | --- |
| app-init-display; app-query | Required; refresh affected tests and run configured evaluation. |
| app-init-display-TRANSACTION_ROUTE-display-path; app-init-display-TRANSACTION_ROUTE-preflight-path; app-init-display-TRANSACTION_ROUTE-address-path | Outside supported startup invocation. InitDisplay deterministically returns supplier read. Real Query transaction and address routes are covered below. |
| app-init-display-READ_ALLOWED-false-path; app-init-display-IS_LIST-false-path | Outside supported startup invocation. Existing custom Query guidance/detail cover the real validation/detail behaviors. |
| SUPPLIER_WRITE_ROUTE-write-path; SUPPLIER_WRITE_ROUTE-verify-path; SUPPLIER_WRITE_ROUTE-display-path; CREATE_HAS_ID-true-path; CREATE_HAS_ID-false-path | Prior P2 disposition retained: successful exact-approved native transaction, actual-CODE guards and configured draft conversation. Standalone scenarios cannot establish required prior request/review/approval state. No accepted POST replay or invented prior state. |
| ADDRESS_ENTRY-display-path | Required behavior represented by address-draft-conversation edit/review/cancel and native exact controls. Extra standalone artifact would duplicate those checks. |
| ADDRESS_ENTRY-parent-path | Required behavior represented by recorded address-query-list/detail and first conversation prepare. |
| ADDRESS_OPERATION-display-path | Required behavior represented by parent-verified prepare in address-draft-conversation and native prepare; wrong parent guarded by actual-CODE contract. |
| ADDRESS_OPERATION-list-path | Required behavior represented by address-query-list plus native empty, exact-name and real two-page continuation under Office Depot. |
| ADDRESS_OPERATION-detail-path | Required behavior represented by address-query-detail plus native selected-address continuation without repeated keys. |
| ADDRESS_OPERATION-preflight-path; ADDRESS_WRITE_ROUTE-write-path; ADDRESS_HAS_ID-true-path | Required behavior executed by one native exact-approved create and independent persisted GET, address300000333814416 under supplier300000333814409. No standalone test can reach this path without earlier runtime identity/review/approval. Accepted POST is never replayed. |
| ADDRESS_WRITE_ROUTE-verify-path | Uncertain-outcome read-only reconciliation covered by actual-CODE guards; no artificial uncertain live mutation. Standalone prior-state scenario is unsupported. |
| ADDRESS_WRITE_ROUTE-display-path | Duplicate and invalid approval withholding covered by actual-CODE guard tests; exact approval and state continuity separately proven natively/configured. No duplicate POST probe. |
| ADDRESS_HAS_ID-false-path | Missing-ID outcome remains pending and blocks retry in actual-CODE tests. Do not induce a failed live write to increase branch counts. |

Acceptance still requires all eight current supplier/address configured tests and judges. Native result is not substituted for an outstanding configured failure. Raw planner finalSummaryAllowed may remain false for the accounted unsupported/duplicate suggestions; retain scoped receipt. Later site/contact work invalidates affected paths and requires appropriate regression.
