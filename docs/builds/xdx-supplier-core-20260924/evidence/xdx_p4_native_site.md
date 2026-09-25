# P4 native site evidence

Target: eqih-dev21 native Supplier Core DRAFT preview, tab676647338. Scope read/create sites only, no assignments/payment/subobjects. Exact supplier1506 /300000333814409 and accepted address300000333814416 / XDX Core Address 20260924 are the fixture chain. Existing BU BO is read-only and unchanged.

Workflow DRAFT86223036 ETag12; local actual-CODE site/reference/approval/body/persistence/paging tests and validators PASS. No site write accepted yet.

Ordinary list submitted under supplier300000333814409 at the KEEP-032 timestamp; result pending. Native exact approval remains required before the one authorized create. Never replay accepted supplier/address POSTs.

2026-09-24T22:52:22.1868850Z: Ordinary site list PASS: supplier XDX Core Supplier 20260924 2130 /300000333814409, count0/offset0/hasMorefalse and honest No sites match. Separate from later create verification. Prepared site draft with explicit accepted address and purchasing=true; current BU field choices requested, no historical default supplied.

2026-09-24T22:53:09.2193450Z: Native prepare request94302bdb-aa5b-4224-b365-c2afc8766c91 revision1 displayed accepted supplier/address, purchasing=true and current US1 Business Unit300000046987012. No BU value was supplied in preparation. First successful lookup result recorded once in canonical reference; raw action-row envelope not exposed. Explicit field-only edit selected returned BU and changed SupplierSite to XDX Core Site 20260924; result pending.

2026-09-24T22:55:14.9392381Z: Native field-only edit retained same request and increased revision1->2. Complete review revalidated references and displayed SupplierSite XDX Core Site 20260924, ProcurementBUId300000046987012, SupplierAddressName XDX Core Address 20260924, purchasing=true, parent300000333814409, resolved address300000333814416 and US1 Business Unit. Exact approval submitted, no POST yet.

2026-09-24T22:55:57.0150783Z: Native approval persisted exact four-field snapshot and both references. Submitted create once for request94302bdb-aa5b-4224-b365-c2afc8766c91 revision2. Outcome pending independent GET; never replay.

2026-09-24T22:57:51.2300257Z: Native create PASS. Generated SupplierSiteId300000333814424. Independent same-parent GET confirmed all four fields, resolved SupplierAddressId300000333814416 and US1 Business Unit. Complete result table visually verified by screenshot. Exactly one accepted site POST; never replay.
2026-09-25T00:58:08.2242669Z: After reauthentication, ordinary exact site search PASS: count1/offset0/hasMorefalse; all9fields match accepted site300000333814424, correct parent/address/BU. Then Show selected site detail without repeated keys PASS; all9fields, no fabricated paging. Native real-page continuation under retained Office Depot parent300000047507596 now in progress. No POST repeated.

2026-09-25T00:59:36.711Z: Native ordinary paging PASS under Office Depot300000047507596. Page0 count2/offset0/hasMoretrue returned300000047507684 OD US1 and300000051065956 OD France. Exact next site page (no repeated parent/limit) retained parent, offset2/count2/hasMoretrue and returned300000076247063 OD Progress US and300000095598386 OD Univ US. All nine columns rendered. Together with separate empty/search/selected-detail and accepted create/persisted receipts, P4 native acceptance complete. Configured11/11 PASS, all judges attached in xdx_p4_accepted_configured_suite.json. No writes replayed.
