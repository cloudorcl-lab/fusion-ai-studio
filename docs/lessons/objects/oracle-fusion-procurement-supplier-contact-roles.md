# Supplier Contact Roles

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/contacts/{SupplierContactId}/child/roles`; item key: `RoleId`.
- Documented operations: GET collection/item only. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierContactRoles`.
- Write contract: none in this resource tree. The workflow does not provision accounts or roles.
- First successful BO GET sample: none. Untested: live GET and permission redaction.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
