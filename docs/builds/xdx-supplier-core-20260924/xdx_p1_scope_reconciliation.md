# P1 ATLAS scope reconciliation

Owner: GP-SUP-READ / SUP-READ, plan section 7 and canonical Gate 6.
Current raw plan: evidence/xdx_p1_full_sync_plan.json, unchanged.

- app-init-display: required startup list; current replay path all 14 executable nodes classified, 16/16 assertions PASS.
- app-query: required real user list Query; baseline replay path 16/16 PASS, native independent real Query passed.
- app-init-display-READ_ALLOWED-false-path: outside supported invocation scope. PREPARE_READ replaces InitDisplay extraction with fixed valid list limit=5 offset=0, so this branch cannot occur in startup. Do not inject a fabricated CODE failure or alter startup behavior. Cover real validation through custom supplier-query-guidance, appHint Query.
- app-init-display-IS_LIST-false-path: outside supported invocation scope. Startup sets intent=list, so item detail cannot occur in InitDisplay. Cover required detail through custom supplier-query-detail with appHint Query and observed supplier ID 300000047414679.

No required Query behavior is waived. Complete custom detail/guidance and configured judging plus native coverage before scoped SUP-READ acceptance. Preserve finalSummaryAllowed=false if it remains solely for these unsupported startup combinations. App-wide acceptance remains pending.

2026-09-24T21:20:29.3345917Z scoped P1 completion: required startup/list Query/detail Query/guidance Query configured tests all passed and judged; native list/search/detail/selection/paging and empty coverage retained. Unsupported startup combinations remain honestly unexecuted in raw planner result. No required read gap is waived. Later changes require affected regression.
