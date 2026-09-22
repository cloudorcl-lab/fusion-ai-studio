# Supplier Site Global DFF

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/sites/{SupplierSiteId}/child/globalDFF`; item key: `VendorSiteId`.
- Documented operations: GET, POST, PATCH. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierSiteGlobalDFF`.

## POST

Create is configuration-dependent. Current scope is query-only until exact current global segments, writable fields and requiredness are known. Never submit an empty flexfield row or guess segment names.

First successful BO GET sample: none. Untested: configured segments and live GET/POST.

Change history: 2026-09-22 — created from Oracle 26C inventory; create deferred pending configured segment metadata.
