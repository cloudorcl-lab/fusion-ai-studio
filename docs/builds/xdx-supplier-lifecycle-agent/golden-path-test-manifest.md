# MVP Golden-Path Test Manifest

Planned scenarios derived from the requested design. Local/prepared execution is in scope; live writes require the exact payload/count approval described in the plan. No runtime scenario has passed. P8 expands into one identified resource scenario before work, not a generic claim of coverage.

| Golden-path ID | Requirement ID | User journey / trigger | Route | Terminal owner | Deterministic assertion | ATLAS scenario/test | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| G00 | R00 | Reuse existing BOs and reconcile all resource contracts | DISCOVERY | CONTRACT_RECEIPT | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G01 | R01 | Ask Oracle preserves typed state over Human Chat pause/resume | CONVERSATION | REVIEW_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G02 | R02 | Show grounded supplier and child results with at most four columns | QUERY | QUERY_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G03 | R03 | Gather source defaults; apply-all prepares draft and explicit changes win | PREPARE | DRAFT_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G04 | R04 | Create approved supplier and verify every intended field independently | CREATE_SUPPLIER | VERIFIED_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G05 | R05 | Create approved address under resolved supplier and verify | CREATE_ADDRESS | VERIFIED_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G06 | R06 | Create approved site with valid address and BU and verify | CREATE_SITE | VERIFIED_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G07 | R07 | Create approved contact without cloning IDs/accounts and verify | CREATE_CONTACT | VERIFIED_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G08 | R08 | Cover each additional inventoried child through its own contract and journey | CHILD_BY_RESOURCE | VERIFIED_RESPONSE | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |
| G09 | R09 | Reconcile partial/unknown outcomes and prevent repeated submission | RECONCILE | OPERATION_STATUS | Plan phase acceptance and exact field/side-effect checks | Assigned by supported sync plan | Planned | Pending |

G01 includes correction, cancellation, stale approval and new-draft state isolation. G02 includes exact/partial/number selection, ambiguous result, pagination, empty/error distinction and child-parent scope. G03 includes source choice, apply-all, override and absent-reference collection. G04-G07 include rejection/revision, generated-ID omission, valid foreign references and full intended-field readback, using fixtures except the explicitly approved live baseline. G09 covers unknown POST outcome, partial child completion, repeated approval and reconciliation; it must not repeat confirmed creates.

Cumulative phase N includes enabled G01 through GN (G00 is governance evidence), with one canonical configured-mode suite per changed phase after discrete tests and sync completion. Exact executable test paths come from ATLAS, never fabricated in planning.
