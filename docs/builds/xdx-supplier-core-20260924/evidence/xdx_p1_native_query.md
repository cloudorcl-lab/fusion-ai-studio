# P1 native supplier Query evidence
Observed at 2026-09-24T20:54:09.3793624Z in Chrome tab 676647338.
Target XDX_SUPPLIER_CORE_APP_20260924, Draft preview launched via Run app preview; URL /hcmUI/redwoodAI/xdx_supplier_core_app_20260924?draft=true.
InitDisplay completed with five real rows and six columns; count 5, offset 0, hasMore true, nextOffset 5.
Native prompt: Find supplier named Dell Inc.
Completed response (loading cleared): Supplier Query Results, exactly one data row, SupplierId 300000047414679, SupplierNumber 1255, Supplier Dell Inc., SupplierType Not specified, BusinessRelationship Spend Authorized, InactiveDate Not specified. Paging count 1, offset 0, hasMore false.
First target-native Query architecture gate passed. Full SUP-READ remains incomplete pending scalar item detail, paging continuity and configured acceptance. No business writes performed.
Replay init-display passed 11/11 deterministic assertions, DRAFT version 86215432, duration 36968ms. Judge skipped transiently; configured acceptance pending. Fixture preserves five real rows, removes irrelevant context ETags, sets hasMore false under CLI compacted collection policy; it does not replace native paging evidence.

2026-09-24T21:02:49.5853073Z native state continuity PASS: list page size 2 returned Lee Supplies/Staffing Services at offset 0; follow-up next page returned JGA/Dell Inc. at offset 2, count 2, hasMore true, nextOffset 4. No ID/offset repeated in follow-up. Declared CONVERSATION readState is available at documented direct variable path across target app Query turns. Native detail test now in flight.

2026-09-24T21:05:59.5072245Z Native scalar detail PASS: SupplierId 300000047414679, 1255, Dell Inc., SupplierType null, Spend Authorized, InactiveDate null, Status ACTIVE, AlternateName Dell Inc, TaxOrganizationType Corporation, CorporateWebsite www.dell.com. All ten columns visible in rendered screenshot, one detail row, no loading. Follow-up without repeated ID now in progress.

2026-09-24T21:11:59.0046425Z selected supplier follow-up without ID returned the same Dell Inc. ten-field detail. Empty exact-name search XDX NO MATCH CORE 20260924 completed: count0, offset0, hasMore false, heading No suppliers match. Minor presentation improvement pending: omit unavailable next-page guidance and internal column names from empty view.

2026-09-24T21:20:29.3345917Z repaired DRAFT 86217469 native detail complete: ten correct fields, scalar profile description, no fabricated paging. Configured suite now 4/4 PASS, zero failures/judges, 64/64 deterministic checks. Source evidence xdx_p1_accepted_configured_suite.json. SUP-READ P1 accepted; later graph changes require affected regression and P6 final app acceptance.
