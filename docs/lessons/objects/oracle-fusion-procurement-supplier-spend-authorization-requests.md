# Supplier Spend Authorization Requests

- Product/release: Oracle Fusion Cloud Procurement 26C; API `11.13.18.05`.
- Collection: `/suppliers/{SupplierId}/child/spendAuthorizationApprovalRequests`; item key: `AuthorizationRequestId`.
- Documented operations: GET collection/item only. Source: [26C operation page](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/api-suppliers-spend-authorization-requests.html).
- Current BO: `ListSupplierSpendAuthorizationApprovalRequests`.
- Write contract: none on the child resource. Parent submit/resubmit actions are separately excluded from this build.
- First successful BO GET sample: none. Untested: live GET and approval-history visibility.

Change history: 2026-09-22 — created from Oracle 26C inventory; no live function execution.
