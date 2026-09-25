# Supplier Core DRAFT acceptance

All eight approved requirements are verified in eqih-dev21 as CASEY.BROWN. Scope remains supplier/address/site/contact query and create only. No publish/push, excluded subobjects, account provisioning, business updates/deletes or existing BO changes.

| Requirement | Native/persisted evidence | Current regression |
| --- | --- | --- |
| SUP-READ | evidence/xdx_p1_native_query.md: ordinary list/search/detail/empty/paging | Four-resource configured suite14/14, all judges |
| SUP-CREATE | evidence/xdx_p2_native_supplier.md: exact approval, one POST, independent GET, complete three-field result | Supplier draft continuity and local transaction guards |
| ADR-READ | evidence/xdx_p3_native_address.md: ordinary empty/search/selected detail/paging | Address list/detail tests and local source contract |
| ADR-CREATE | Same P3 receipt: one POST, eight-field independent GET and native result | Address draft and final native edit/review/cancel regression |
| SITE-READ | evidence/xdx_p4_native_site.md: ordinary empty/search/detail/paging, completed after reauthentication | Site list/detail tests and local source contract |
| SITE-CREATE | Same P4 receipt: one POST and independent supplier/address/BU verification | Four-field draft/reference tests and local guards |
| CON-READ | evidence/xdx_p5_native_contact.md: ordinary empty/exact search/selected detail/paging | Contact list/detail tests and local source contract |
| CON-CREATE | Same P5 receipt: one POST, independent three-field GET, generated IDs, null account fields | Three-field draft continuity and local guards |

Accepted chain: supplier1506/300000333814409; address300000333814416/party1486638; site300000333814424; contact300000333814434/profile300000333814434. Never replay accepted POSTs. No further business create is needed. Final temporary address draftc22182c3-d55a-4ce8-8f68-9b236f1a5fff was cancelled without approval or POST.

Current artifacts: app300000334039940 DRAFTv1 ETag1; workflow300000334039939 DRAFT86232573 ETag17; BO300000334039938 has exactly twelve functions. Existing procurement BU provider is a read-only site-field dependency. The app explicitly uses the workflow DRAFT while developing. Runtime observed model: oci-agent/openai.gpt-5-mini. No optimization sweep was requested or run.

Verification: five actual-CODE contract suites, Query preflight and artifact validators passed. Policy/session regression passed, including eleven negative session cases. Current configured workflow14/14 and app InitDisplaypanel1/1 passed with all judges attached once. Authoritative summaries: evidence/xdx_final_workflow_summary.txt and evidence/xdx_final_app_summary.txt. Final source-controlled reports retain individual, workflow, app and consolidated HTML/JSON evidence. Native proof is separate from replay; no scripted suite replayed accepted creates.

Limits: raw ATLAS still suggests47 unsupported startup combinations or duplicate standalone scenarios; all are explicitly accounted in xdx_p6_scoped_completion.md under canonical Gate6. The app sync wrapper does not recognize that exception and stopped before execution; the documented direct configured app-suite fallback and authoritative final summary passed. Planner results/framework gates were not altered. This is DRAFT acceptance, not published deployment. Conversation approval/attempt state is not a cross-session atomic idempotency service. Name/email duplicate preflight is conservative; database uniqueness is not claimed.

Timing: execution-time-tracker.md owns elapsed phases and gaps. Final workflow runs observed222134 input/11821 output/233955 total tokens,270AIUnits and492.1s nested workflow time. App elapsed57602ms; its result does not expose aggregate token/AIUnit metrics. Cached-token and orchestration allocation are unavailable. Prior attempts are retained and are not included in final-suite totals. Recorded keep-alive gaps and an inactive/auth-blocked interval prevent a claim of continuous five-minute compliance; see evidence/xdx_timing_continuity_audit.md. No causal claim links a particular gap to logout.

Delivery: current-task Startup and Closeout PASS. Retain the verified snapshot on the local codex branch with the scoped delivery commit; no remote publication/push is authorized.
