# Supplier Products and Services View

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/productsAndServicesView`; item key: `SupplierProductsServicesId`.
- Documented operations: GET collection/item only. Source: [26C endpoint index](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html).
- Current BO: `ListSupplierProductsAndServicesView`.
- Write contract: none; this is the read-only view of products/services associations.
- First successful BO GET sample (2026-09-23, DRAFT app preview): `{"items":[{"SupplierProductsServicesId":"300000333814294","CategoryName":"Computer Supplies","CategoryType":"BROWSING","CategoryPath":"POR_CATEGORY_HIERARCHY_ROOT"}],"count":1,"hasMore":false}`.

Change history: 2026-09-23 — recorded the first successful target-app GET after the retained product/service association was created.
