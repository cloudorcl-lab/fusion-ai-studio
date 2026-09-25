# P2 ATLAS scope reconciliation

Raw current plan: evidence/xdx_p2_final_sync_plan.json, retained unchanged. Canonical Gate 6 and the approved eight-row manifest govern this reconciliation.

Required startup/list/detail/guidance tests have current path partitions; five-step supplier-draft-conversation proves prepare, field-only edit, review, stale request rejection and cancellation through real Query conversation state. No recordable write is permitted in that scripted test.

| Suggested scenario | Classification and evidence |
| --- | --- |
| app-init-display-TRANSACTION_ROUTE-display-path | Outside supported startup invocation: PREPARE_TRANSACTION returns read unconditionally for InitDisplay. Real Query display covered by supplier-draft-conversation. |
| app-init-display-TRANSACTION_ROUTE-preflight-path | Outside supported startup invocation: InitDisplay never authorizes a write. Native exact-reviewed Query transaction covers real preflight. |
| app-init-display-READ_ALLOWED-false-path | Outside supported startup invocation: fixed valid startup list. Real Query validation covered by supplier-query-guidance. |
| app-init-display-IS_LIST-false-path | Outside supported startup invocation: fixed list intent. Real Query detail covered by supplier-query-detail. |
| SUPPLIER_WRITE_ROUTE-write-path | Outside supported standalone invocation: requires request identity, review and approval established in earlier turns. Required behavior executed natively once; supplier1506/300000333814409 and complete persisted result retained in xdx_p2_native_supplier.md. Do not replay accepted POST or inject fabricated prior state. |
| SUPPLIER_WRITE_ROUTE-verify-path | Outside supported standalone invocation: requires an earlier uncertain attempt. Local actual-CODE contract covers read-only reconciliation; no uncertain live write was induced. |
| SUPPLIER_WRITE_ROUTE-display-path | Outside supported standalone invocation: requires prior approved/pending state. Local actual-CODE contract covers duplicate/error/invalid approval and blocks POST. Native stale revision also visibly withheld. |
| CREATE_HAS_ID-true-path | Outside supported standalone invocation. Required path occurred in the accepted native transaction, reaching independent persisted GET and verified result. |
| CREATE_HAS_ID-false-path | Outside supported standalone invocation. Actual-CODE contract proves uncertain/missing-ID receipt cannot retry. No artificial live failed create is authorized merely for branch counts. |

Configured scripted tests cannot interpolate a newly generated request ID into later exact approval commands: conversation-authoring explicitly prohibits invented step placeholders. Native exact identity/revision approval plus local actual-CODE guards provide the required write evidence; this limitation is not represented as configured POST replay. No required business behavior is waived. P2 completion still requires current configured suite and all judges. Retain raw finalSummaryAllowed=false for unsupported suggested combinations.
