# Supplier Merge History

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/mergeHistory`; item key: `mergeHistoryUniqID`.
- Documented operations: GET collection/item only. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-merge-history.html).
- Current BO: `ListSupplierMergeHistory`; preserve audit chronology and paging.
- Write contract: none. History is never synthesized or modified.
- First successful BO GET sample: none. Untested: live GET and history visibility.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
