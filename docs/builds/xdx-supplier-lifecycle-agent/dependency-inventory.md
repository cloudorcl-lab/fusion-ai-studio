# Dependency and Evidence Inventory

| Dependency | Owner / consumer | Boundary / validation | Decision |
| --- | --- | --- | --- |
| XDX_SUPPLIER_INFORMATION | Server BO / root lifecycle | DRAFT definition provides the supplier and retained child GET/POST operations used by workflow version `86078581`; local validation and configured execution pass | Retain the adopted local definition and current DRAFT binding; recheck ETag before any later mutation |
| XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS | Server BO / site resolution | Current ETag1, one GET; lookup does not imply write permission; current definition validates with zero errors | Adopt exact current server definition locally |
| server-baseline/*.bo | Build evidence / compatibility review | Immutable fetched definitions; hashes in bootstrap receipt | Retain evidence, never deploy this directory |
| Lifecycle conversation JSON | Root workflow / all routes | Current configured multi-turn cases cover query, review, create guard, confirmation, reconciliation and retained child reads | Retain as canonical replay evidence; no live POST replay |
| Native Ask Oracle entry | Agentic App `queryAgent` / user | Target DRAFT **Run app preview** routes `$context.$app.$OraMessageHint=Query` through the non-suspending workflow and passed the integrated read journey | Retain DRAFT acceptance; publication remains outside authorized scope |
| env.properties | Active worktree / CLI | Inherited approved base configuration; no values copied into prose | Verify active configuration at startup |
| Core object references | Canonical object registry / contracts | 26C, API11.13.18.05; tenant-scoped historical evidence | Retain; revalidate per slice |
| Additional child/BU contracts | Canonical object registry / P0,P8 | All retained child references plus BU LOV were reviewed; four create-capable P8 resources have required-field POST and persisted-GET evidence | Retain object references as the operation-level owners |
| Current server snapshots | Build evidence / compatibility review | Supplier ETag8 and BU ETag1 fetched read-only on 2026-09-22; both validate | Retain under server-current; do not deploy from evidence directory |
| Excluded child families | Scope owner / root lifecycle | DFFs, attachments, payment and third-party-payment relationships explicitly excluded before workflow construction | Retain inventory evidence; expose no route/tool/test |
| ATLAS fixtures/judges/reports | Supported CLI / acceptance | Current canonical workflow suite passes 35/35 and app suite 1/1; target DRAFT preview separately proves browser runtime | Retain canonical test definitions and reports; scratch request envelopes removed after judge attachment |
| Failed implementation | Retired attempt / none | No checkout or code reused | Retain abandonment decision only |
