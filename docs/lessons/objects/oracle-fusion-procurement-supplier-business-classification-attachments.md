# Supplier Business Classification Attachments

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/businessClassifications/{ClassificationId}/child/attachments`; item key: `attachmentsUniqID`.
- Documented operations: GET, POST, PATCH, DELETE plus LOB enclosures. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierBusinessClassificationAttachments`; metadata only; create function is not yet present.

## POST

Research exact attachment schema after the business-classification contract. Omit returned own IDs; retain both resolved parent keys. File contents never enter visible workflow state. Exact category, datatype, filename/content-type, size and duplicate rules block live use until recorded.

First successful BO GET sample: none. Untested: live GET/POST and tenant attachment categories.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
