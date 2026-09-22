# Supplier Global DFF

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/globalDFF`; item key: `VendorId`.
- Documented operations: GET, POST, PATCH. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierGlobalDFF`.

## POST

The payload depends on configured global segments. Exact metadata, writable fields and requiredness are absent from the generic contract, so current scope is query-only. Do not create an empty context row or infer segment names. `VendorId` remains the resolved parent/key.

First successful BO GET sample: none. Untested: configured segments and live GET/POST.

Change history: 2026-09-22 — created from Oracle 26C inventory; create deferred pending configured segment metadata.
