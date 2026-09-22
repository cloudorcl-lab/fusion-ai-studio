# Supplier Contact Person DFF

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/contacts/{SupplierContactId}/child/DFF`; item key: `PersonProfileId`.
- Documented operations: GET collection/item only. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-contacts-person-dynamic-flexfields.html).
- Current BO: `ListSupplierContactDFF`.
- Write contract: none in this resource tree; never infer POST from supplier/site DFF resources.
- First successful BO GET sample: none. Untested: configured segments and live security.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
