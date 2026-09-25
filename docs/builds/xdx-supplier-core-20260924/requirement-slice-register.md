# XDX Supplier Core — requirement register

Version 1.0.0. Exactly four resources and eight operation requirements. All eight requirements have native/persisted acceptance and current configured regression. The plan owns scope; this register owns acceptance status.

| ID | Resource / operation | Acceptance | Owner / slice | Dependencies | Local / configured / native or persisted evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| SUP-READ | Supplier / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P1 / P2 | none | Local read contract PASS; [native list/search/detail/paging](evidence/xdx_p1_native_query.md); [configured 4/4 PASS, judges complete](evidence/xdx_p1_accepted_configured_suite.json); DRAFT 86217469 | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| SUP-CREATE | Supplier / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P1 / P2 | none | Local transaction guards PASS; native supplier1506/300000333814409 complete in evidence/xdx_p2_native_supplier.md; configured5/5 PASS with complete judges in evidence/xdx_p2_accepted_configured_suite.json | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| ADR-READ | Address / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P3 | SupplierId | Native empty/search/selected-detail/paging PASS; address-query-list/detail57/57 transient PASS; evidence/xdx_p3_native_address.md | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| ADR-CREATE | Address / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P3 | SupplierId | Native exact-approved address300000333814416 verified all8fields; local guards PASS; evidence/xdx_p3_native_address.md | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| SITE-READ | Site / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P4 | SupplierId + address + BU | Native empty/search/selected-detail/paging PASS; ordinary configured list/detail and11/11 judged suite; evidence/xdx_p4_native_site.md | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| SITE-CREATE | Site / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P4 | SupplierId + address + BU | Local site contract PASS; native300000333814424 exact-approved create and independent4field/reference GET; evidence/xdx_p4_native_site.md | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| CON-READ | Contact / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P5 | SupplierId | Native empty/exact-name search/selected detail/paging offsets0→2 and ten-field widget PASS; evidence/xdx_p5_native_contact.md | Accepted DRAFT; final14/14 configured PASS, all judges complete |
| CON-CREATE | Contact / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P5 | SupplierId | Native contact300000333814434/profile300000333814434; independent GET matched all three submitted fields, account fields null; evidence/xdx_p5_native_contact.md | Accepted DRAFT; final14/14 configured PASS, all judges complete |



Final acceptance: evidence/xdx_p5_accepted_configured_suite.json (14/14) and evidence/xdx_final_app_summary.txt (app1/1), DRAFT86232573. Scoped ATLAS disposition: xdx_p6_scoped_completion.md. Closeout/delivery tracked separately.

## Post-delivery manual-test404 repair

SUP-READ and ADDR-READ reopened after user404 reports for displayed supplier number1506. Native exact query/detail/address sequence passes on DRAFT86237214. Shared read-reference correction also covered for SITE-READ and CONTACT-READ by actual-CODE tests. No accepted create repeated. Final repair receipt: xdx_manual_testing_results.md and evidence/xdx_number404_native.md; configured regression tracked separately from historical delivery suite.

Final manual confirmation: user reports6/6query scenarios PASS after repair2cbdecb; SUP/ADR/SITE/CON read journeys and supplier no-match included. Preserve earlier failure and agent-retest evidence separately.
