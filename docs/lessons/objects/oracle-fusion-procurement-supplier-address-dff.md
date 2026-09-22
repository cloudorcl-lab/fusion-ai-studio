# Supplier Address Party Site DFF

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/addresses/{SupplierAddressId}/child/DFF`; item key: `PartySiteId`.
- Documented operations: GET collection and item. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `XDX_SUPPLIER_INFORMATION.ListSupplierAddressDFF`; parent keys must come from exact supplier/address selection; preserve `count`, `limit`, `offset`, `hasMore`.
- Write contract: none exposed by this resource tree. Never infer POST from other DFF resources.
- First successful BO GET sample: none; capture the first already-authorized success once.
- Untested boundaries: tenant segments, security and paging. Revalidate on release, configured-segment or BO-template change.

Change history: 2026-09-22 — created from the 26C inventory and current server BO ETag 8; no live function execution.
