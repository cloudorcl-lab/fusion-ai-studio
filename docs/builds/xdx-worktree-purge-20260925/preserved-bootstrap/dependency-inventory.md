# Dependency and Evidence Inventory

| Dependency / path | Type | Owner | Consumer / requirement | Source authority / permitted use | Status / version boundary | Validation / evidence | Failure behavior | Retain / replace / retire | Retirement trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `src/businessObjects/xdx_supplier_core_data_20260925.bo` | dated BO | BO owner | all eight requirements | four scoped resources only | not created | pending | block dependent integration | retain | build closeout decision |
| `src/businessObjects/xdx_supplier_procurement_business_units.bo` | preserved BO | existing owner | SITE-CREATE | GET-only BU lookup | preserve unchanged | current lookup required before site POST | block site POST | retain | none |
| `src/workflows/xdx_supplier_core_20260925.wf` | dated workflow | workflow owner | all native journeys | DRAFT only | not created | pending | block app runtime | retain | build closeout decision |
| `src/apps/xdx_supplier_core_app_20260925.app` | dated app | coordinator | native journeys | DRAFT only | not created | pending | block native runtime | retain | build closeout decision |
| selected object references | governance | contract researcher | BO/workflow | read-only 26C/API contract | reviewed startup | session receipt | block unsafe contract | retain | release change |

## Evidence receipt

| Timestamp | Requirement / scenario | Local / replay / live / DRAFT / PUBLISHED | Exact command or trigger | Result / report | Elapsed / tokens / AI Units | Limitation / rerun reason |
| --- | --- | --- | --- | --- | --- | --- |

## BO readiness and delegated assignment

| Field | Assigned value / evidence |
| --- | --- |
| Task / requirement / worker / integrating reviewer | all BO functions / pending scoped BO owner / independent QA reviewer |
| Checkout / branch / allowed files and remote artifacts | current worktree and branch; one dated BO only |
| Input dependency / frozen interface / invalidation condition | selected object contract; invalidated by BO template/function/target change |
| Allowed operations / target / approval boundary | local validation, authorized scoped reads and A writes; exact native approval separate |
| Direct BO and native write budgets / operation reservation | A/B each one per resource; eight accepted maximum; no reservation allocated yet |
| Actual BO GET / POST / independent GET evidence | pending |
| Artifact hash/version and source provenance | pending |
| Local checks / independent review / integration gate | pending |
| Accepted IDs / process handles / uncertain outcomes | none |
| Stop conditions / next owner / timing limits | uncertain operation freezes chain; no replay |
