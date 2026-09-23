# Supplier Spend Authorization Requests

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/spendAuthorizationApprovalRequests`; item key: `AuthorizationRequestId`.
- Documented operations: GET collection/item only. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-spend-authorization-requests.html).
- Current BO: `ListSupplierSpendAuthorizationApprovalRequests`.
- Write contract: none on the child resource. Parent submit/resubmit actions are separately excluded from this build.
- First successful BO GET sample (2026-09-23, DRAFT app preview): `{"items":[],"count":0,"hasMore":false}` for supplier `300000333814250`. The app reported a successful empty result, distinct from an execution error.

Change history: 2026-09-23 — recorded the first successful empty GET in the target AI Agent Studio app preview; write actions remain excluded.
