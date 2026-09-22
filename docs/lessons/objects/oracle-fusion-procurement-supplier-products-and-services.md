# Supplier Products and Services

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/productsAndServices`; item key: `SupplierProductsServicesId`.
- Documented operations: GET, POST, DELETE. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierProductsAndServices`; create function is not yet present.

## POST

Resolve an existing valid products/services category for the selected supplier. Record exact request fields, category lookup, requiredness, parent-scoped uniqueness and Example Request Body before implementation. Omit the returned association ID; do not invent a category or copy an existing supplier's association ID.

First successful BO GET sample: none. Untested: live GET/POST, category lookup and duplicate behavior.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
