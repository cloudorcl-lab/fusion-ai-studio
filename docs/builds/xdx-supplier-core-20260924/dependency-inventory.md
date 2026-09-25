# Supplier Core dependency and evidence inventory

| Dependency / path | Owner and consumer | Authority / status | Evidence / failure behavior | Disposition |
| --- | --- | --- | --- | --- |
| src/apps/xdx_supplier_core_app_20260924.app | App 300000334039940; supplierCorePanel | New task-owned DRAFT; PRC/SUPPLIER; workflow development draft enabled | Native preview identity verified; no publish | Retain |
| src/workflows/xdx_supplier_core_20260924.wf | Workflow 300000334039939; all eight planned rows | New task-owned DRAFT; current version in normalized artifact | All eight native requirements accepted; configured14/14 and app1/1 accepted; Closeout/delivery tracked separately | Retain |
| src/businessObjects/xdx_supplier_core_data_20260924.bo | BO 300000334039938; new workflow only | New task-owned; supplier/address/site/contact list/detail GET and create POST only, twelve functions | Scoped read functions validate; preflight blocks invalid keys | Retain exact twelve-function boundary |
| Existing src/businessObjects artifacts | Existing consumers unknown | Prior BOs are preserved unchanged | Retained supplier sample reused for schema; not live acceptance | Retain unchanged |
| Active worktree env.properties | Runtime configuration owner | Only active checkout; eqih-dev21 / CASEY.BROWN verified | Host credential access needed; credentials never in evidence | Retain unchanged |
| Canonical playbook and five resource references | Governance/API owners | Committed fedb09a ancestry; current session reviewed hashes | Startup PASS; Closeout pending | Retain; update only new reusable evidence |
| test/workflows/xdx_supplier_core_20260924 | Supplier/address/site/contact tests | Two planner stages, ordinary Query routes and four draft conversations | Real recorded list/detail, baseline reuse, guidance no BO; local judges required | Retain current; update affected tests per later graph edits |
| scripts/xdx-supplier-core-contract.test.cjs | Local contract regression | Source-based deterministic checks | Paging, escaping, keys, scalar detail rendering and operation boundary | Extend per slice |
| test-reports/workflows and evidence/xdx_p1_* | P1 receipts | Reports are bounded to their workflow versions | First configured suite 3/4, detail grounding failure retained; P1 and P2 repaired acceptance retained | Preserve accepted/failed receipts before reports are replaced |
| xdx_build_p1.cjs, xdx_finish_p1.cjs, xdx_fix_read_render.cjs and CLI argument JSON | Task-owned authoring scratch | Non-idempotent historical authoring, not final runtime owners | Do not rerun; current .wf/.bo/.app are authoritative | Retire after preserving useful receipts at cleanup |
| Chrome tab 676647338 | Native DRAFT acceptance | Casey Brown session restored; all native requirements accepted; same-tab keep-alive continues; new openings use /hcmUI/redwoodAI | Same-tab observations and deadlines in execution tracker | Retain through acceptance/handoff |
| .debug recording/judge scratch | CLI test lifecycle | Current request/response continuations only | Apply/attach using supported CLI; cleanup after receipt preservation | Retire consumed scratch only |

Current accepted test records: supplier1506/300000333814409 and address300000333814416/party1486638, each created once and independently verified. Preserve these records; never replay accepted POSTs. Site300000333814424 also accepted once with current BU lookup; contact300000333814434/profile300000333814434 also accepted once; final configured14/14 and app1/1 accepted. No publication. Current exact artifacts and evidence own the runtime; historical authoring scripts are cleanup candidates. Final app tests accepted; Closeout/delivery tracked in the session receipt.

Existing XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS.getall_procurementBusinessUnitsLOV is a verified unchanged GET dependency of FETCH_SITE_BU_REFERENCE. Scope is site field lookup only, complete bounded page500; incomplete or inconsistent result withholds writes. Runtime/current dependency inspection: evidence/xdx_p4_existing_bu_functions.json. Site actual-CODE contract: scripts/xdx-site-core-contract.test.cjs. No existingBO mutation.



P6 cleanup: consumed build-root authoring/repair/test-runner scripts retired after all workflow runs completed. See evidence/xdx_cleanup_manifest.json for exact paths and hashes. Their historical names in logs are provenance, not active dependencies. Canonical runtime .wf/.bo/.app, five actual-CODE tests, workflow/app test definitions and all accepted/failure receipts remain. Active app suite31148 invokes CLI directly and consumes no retired script.

## Supplier-number404 repair

Retain existing BO functions, graph, models and app unchanged. Four read-preparer CODE owners gain verified number mapping; new local contract and exact3step conversation regression retained as failure protection. Native receipts and before-code evidence retained. Temporary CLI argument files retire after final regression/judging. Prior accepted records unchanged.
