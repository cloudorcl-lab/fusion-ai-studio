# Supplier Merge History

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/mergeHistory`; item key: `mergeHistoryUniqID`.
- Documented operations: GET collection/item only. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-merge-history.html).
- Current BO: `ListSupplierMergeHistory`; preserve audit chronology and paging.
- Write contract: none. History is never synthesized or modified.
- First successful BO GET sample (2026-09-23, DRAFT app preview): `{"items":[],"count":0,"hasMore":false}` for supplier `300000333814250`. The app reported a successful empty result, distinct from an execution error.

Change history: 2026-09-23 — recorded the first successful empty GET in the target AI Agent Studio app preview.
