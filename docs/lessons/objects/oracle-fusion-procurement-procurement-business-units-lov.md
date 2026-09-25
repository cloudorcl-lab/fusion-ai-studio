# Procurement Business Units List of Values

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/procurementBusinessUnitsLOV`; stable returned key: `ProcurementBUId`.
- Documented/current use: GET only for authenticated BU/action lookup. The current `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS.getall_procurementBusinessUnitsLOV` BO preserves paging and orders by BU ID/action.
- Contract: collapse choices by exact BU ID only after checking name consistency. Lookup visibility is not supplier-site or assignment write authority. Preserve `count`, `limit`, `offset`, `hasMore`.
- Write contract: none.
- First successful BO GET: native observed result below, retained once; raw action envelope was not exposed.
- Evidence limits: native live lookup confirmed for CASEY.BROWN; broader data-security behavior, live duplicate-action cases and multipage behavior remain untested.

Change history: 2026-09-22 — created from current server BO ETag 1; no live function execution.
2026-09-24 — retained the first already-authorized native site lookup observation below; bounded the visible distinct choice separately from the unexposed raw action envelope.

## First successful BO GET observation — 2026-09-24

The authorized native site-preparation path in XDX Supplier Core executed the preserved `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS.getall_procurementBusinessUnitsLOV` function with limit500/offset0. Its verified complete response produced this distinct current choice:

| ProcurementBUId | ProcurementBU |
| --- | --- |
| 300000046987012 | US1 Business Unit |

Evidence: [native site receipt](../../builds/xdx-supplier-core-20260924/evidence/xdx_p4_native_site.md), request94302bdb-aa5b-4224-b365-c2afc8766c91 revision1, eqih-dev21 / CASEY.BROWN. This is the first successful native BO result, retained once. The display collapses exact-ID action rows after checking name consistency; raw action-row count and actions were not exposed and are not invented here. No routine GET was rerun for documentation. The workflow rejected incomplete paging and inconsistent names before offering the choice. This proves this authorized account's observed lookup only, not universal visibility or site-write authority.
