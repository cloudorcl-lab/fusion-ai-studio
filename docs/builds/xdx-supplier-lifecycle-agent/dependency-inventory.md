# Dependency and Evidence Inventory

| Dependency | Owner / consumer | Boundary / validation | Decision |
| --- | --- | --- | --- |
| XDX_SUPPLIER_INFORMATION | Server BO / root lifecycle | 12 functions observed; baseline ETag2; no function execution in planning | Reuse; compare/adopt before modification |
| XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS | Server BO / site resolution | 1 GET; baseline ETag1; lookup does not imply write permission | Reuse; resource reference needed before use |
| server-baseline/*.bo | Build evidence / compatibility review | Immutable fetched definitions; hashes in bootstrap receipt | Retain evidence, never deploy this directory |
| lifecycle CONVERSATION JSON | Root workflow / all routes | P1 pause/resume and scope proof required | Implement once |
| Native Ask Oracle entry | Platform / user | Actual UI integration unverified | Prove in P1 |
| env.properties | Active worktree / CLI | Inherited approved base configuration; no values copied into prose | Verify active configuration at startup |
| Core object references | Canonical object registry / contracts | 26C, API11.13.18.05; tenant-scoped historical evidence | Retain; revalidate per slice |
| Additional child/BU contracts | Canonical object registry / P0,P8 | Missing references block reliance | Create only from researched evidence |
| ATLAS fixtures/judges/reports | Supported CLI / acceptance | No new tests yet; fixtures cannot prove browser success | Create in execution; preserve required reports |
| Failed implementation | Retired attempt / none | No checkout or code reused | Retain abandonment decision only |
