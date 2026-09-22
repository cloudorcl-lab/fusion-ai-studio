# Supplier Business Classifications

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/businessClassifications`; item key: `ClassificationId`.
- Documented operations: GET, POST, PATCH, DELETE. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-business-classifications.html).
- Current BO: `ListSupplierBusinessClassifications`; create function is not yet present.

## POST

Create is in scope only after exact request schema, lookup `ClassificationCode`, dates, certifying-agency/contact references, requiredness, uniqueness and Example Request Body are recorded. `ClassificationId` is the resource's own ID and is provisionally omitted pending documentation/live confirmation. Status and audit fields remain read-only unless exact documentation says otherwise.

First successful BO GET sample: none. Untested: live GET/POST, tenant lookup values and approval behavior.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
