# Supplier DFF

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/DFF`; item key: `VendorId`.
- Documented operations: GET, POST, PATCH. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierDFF`.

## POST

The payload is tenant-configuration-dependent. A nonempty segment schema, context value, writable fields and requiredness must be discovered from current metadata before a create function or live approval is possible. `VendorId` is a resolved parent/key, not a generic value to copy. Current lifecycle scope is query-only with the create gap disclosed.

First successful BO GET sample: none. Untested: configured segments and live GET/POST.

Change history: 2026-09-22 — created from Oracle 26C inventory; create deferred pending configured segment metadata.
