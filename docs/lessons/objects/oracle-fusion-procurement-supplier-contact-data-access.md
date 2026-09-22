# Supplier Contact Data Access

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/contacts/{SupplierContactId}/child/dataaccess`; item key: `dataaccessUniqID`.
- Documented operations: GET collection/item only. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-contacts-data-access.html).
- Current BO: `ListSupplierContactDataAccess`; preserve parent scope and paging.
- Write contract: none in this resource tree. No account provisioning or access grants.
- First successful BO GET sample: none. Untested: live GET and permission redaction.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
