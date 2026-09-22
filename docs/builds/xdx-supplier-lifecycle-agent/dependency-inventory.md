# Dependency and Evidence Inventory

| Dependency | Owner / consumer | Boundary / validation | Decision |
| --- | --- | --- | --- |
| XDX_SUPPLIER_INFORMATION | Server BO / root lifecycle | Current ETag8 has 32 functions: 24 GET and 8 POST; local ETag-free 11-function copy was stale; both current and adopted copies validate with zero errors | Adopt exact current server definition locally; never overwrite newer remote work |
| XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS | Server BO / site resolution | Current ETag1, one GET; lookup does not imply write permission; current definition validates with zero errors | Adopt exact current server definition locally |
| server-baseline/*.bo | Build evidence / compatibility review | Immutable fetched definitions; hashes in bootstrap receipt | Retain evidence, never deploy this directory |
| lifecycle CONVERSATION JSON | Root workflow / all routes | P1 pause/resume and scope proof required | Implement once |
| Native Ask Oracle entry | Agentic App `queryAgent` / user | Supported app contract routes `$context.$app.$OraMessageHint=Query` to a dedicated workflow path; actual UI deployment remains unverified | Create app wrapper in P1 and prove the real signed-in entry |
| env.properties | Active worktree / CLI | Inherited approved base configuration; no values copied into prose | Verify active configuration at startup |
| Core object references | Canonical object registry / contracts | 26C, API11.13.18.05; tenant-scoped historical evidence | Retain; revalidate per slice |
| Additional child/BU contracts | Canonical object registry / P0,P8 | 19 additional child references plus BU LOV reference created from 26C/current BO evidence; detailed create schemas remain per-slice gates | Use resource-inventory.md; do not enable a create before its reference is complete |
| Current server snapshots | Build evidence / compatibility review | Supplier ETag8 and BU ETag1 fetched read-only on 2026-09-22; both validate | Retain under server-current; do not deploy from evidence directory |
| Excluded child families | Scope owner / root lifecycle | DFFs, attachments, payment and third-party-payment relationships explicitly excluded before workflow construction | Retain inventory evidence; expose no route/tool/test |
| ATLAS fixtures/judges/reports | Supported CLI / acceptance | No new tests yet; fixtures cannot prove browser success | Create in execution; preserve required reports |
| Failed implementation | Retired attempt / none | No checkout or code reused | Retain abandonment decision only |
