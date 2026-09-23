# Supplier Contact Roles

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/contacts/{SupplierContactId}/child/roles`; item key: `RoleId`.
- Documented operations: GET collection/item only. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierContactRoles`.
- Write contract: none in this resource tree. The workflow does not provision accounts or roles.
- First successful BO GET sample (2026-09-23, DRAFT app preview): `{"items":[],"count":0,"hasMore":false}` for supplier `300000333814250` and selected contact `300000333814275`. The app reported a successful empty result, distinct from an execution error.

Change history: 2026-09-23 — recorded the first successful parent-scoped empty GET in the target AI Agent Studio app preview.
