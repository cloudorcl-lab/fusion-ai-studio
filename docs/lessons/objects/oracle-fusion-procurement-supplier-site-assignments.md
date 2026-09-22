# Supplier Site Assignments

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/sites/{SupplierSiteId}/child/assignments`; item key: `AssignmentId`.
- Documented operations: GET, POST, PATCH. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierSiteAssignments`; create function is not yet present.

## POST

Resolve supplier, site and client business unit in scope. Record exact request fields, conditional bill-to/ship-to/account references, requiredness, parent-scoped uniqueness and Example Request Body before implementation. Omit returned `AssignmentId`; never infer write authority from BU lookup visibility.

First successful BO GET sample: none. Untested: live GET/POST and current user's BU data security.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
