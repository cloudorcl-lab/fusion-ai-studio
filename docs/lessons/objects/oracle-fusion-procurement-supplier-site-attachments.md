# Supplier Site Attachments

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/sites/{SupplierSiteId}/child/attachments`; item key: `attachmentsUniqID`.
- Documented operations: GET, POST, PATCH, DELETE plus LOB enclosures. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierSiteAttachments`; metadata only; create function is not yet present.

## POST

Retain resolved supplier/site parent keys. Research exact attachment fields, category/datatype, requiredness, size/type and duplicate rules before implementation. Omit returned own IDs. File contents never enter visible conversation state.

First successful BO GET sample: none. Untested: live GET/POST and tenant categories.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
