# Procurement Business Units List of Values

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/procurementBusinessUnitsLOV`; stable returned key: `ProcurementBUId`.
- Documented/current use: GET only for authenticated BU/action lookup. The current `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS.getall_procurementBusinessUnitsLOV` BO preserves paging and orders by BU ID/action.
- Contract: collapse choices by exact BU ID only after checking name consistency. Lookup visibility is not supplier-site or assignment write authority. Preserve `count`, `limit`, `offset`, `hasMore`.
- Write contract: none.
- First successful BO GET sample: none; capture the first already-authorized success once.
- Untested boundaries: live function execution, data security, duplicate action rows and paging.

Change history: 2026-09-22 — created from current server BO ETag 1; no live function execution.
