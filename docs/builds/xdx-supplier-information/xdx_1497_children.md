# Supplier 1497 child creation

Created on eqih-dev21 as CASEY.BROWN, 2026-09-17, following the user's explicit request. Parent: **XDX Lee Supplies 20260917152534**, SupplierNumber **1497**, SupplierId **300000333813822**.

| Child | Name | Generated ID | Persisted verification |
| --- | --- | --- | --- |
| Address | XDX Lee US1 1497 20260917201046 | 300000333813850 | [GET](live-post/children-1497-create/address-get.json) |
| Site | XDX Lee US1 1497 20260917201046 | 300000333813859 | [GET](live-post/children-1497-create/site-get.json) |
| Contact | XDX Ryan / XDX Lee 1497 20260917201046 | 300000333813861 | [GET](live-post/children-1497-create/contact-get.json) |

All **20 independently enumerated intended fields** match POST and GET responses. Each GET used supplier 1497's child path and the returned child ID, returning one terminal matching record. The site references new address 300000333813850 and procurement BU 300000046987012. Contact UserName and UserAccountStatus are null; no user account was provisioned. Test emails use example.invalid. [Parent GET after creation](live-post/children-1497-create/parent-after.json) verifies SupplierType=Supplier, SupplierTypeCode=SUPPLIER and unchanged intended parent fields.

[Execution summary](live-post/children-1497-create/summary.json) · [Prepared requests, source provenance and Oracle cross-reference](live-post/children-1497-create/plan.json) · [Preflight](live-post/children-1497-create/preflight.json).

Local evidence was usable: retained 1497 parent/empty-child responses, authorized Lee-based values, successful 1496 child payloads and exact Oracle 26C schemas/examples. No new Lee discovery or documentation GET was needed. Numeric XDX suffixes replace child business names; generated IDs were omitted; parent and BU references retained. Contact InactiveDate omission reuses prior successful tenant-scoped evidence. Site/contact duplicate-key semantics remain unproven; this run is not a duplicate-name test.

The first execution stopped in local preparation because default POST guidance selected request-payload authoring (`examplePurpose=request`, `readyToFetch=false`, no input conflicts). Explicit `examplePurpose=response` passed preparation with every supplied field unchanged. No live call or POST-attempt marker existed before that correction. The successful run performed three POSTs and four GETs; a final parent GET then confirmed parent-field preservation. No POST was retried. The registry now records the response-mode lesson; object references retain additional generated-field confirmation. No new lifecycle rule was needed.

The runner [xdx_create_1497_children.ps1](xdx_create_1497_children.ps1) is retained as execution evidence and refuses rerun when any POST attempt exists. Requests, POST/GET responses, preparations, attempt markers and timings are retained under live-post/children-1497-create. A local read-only check is `node tests/test-xdx-supplier-1497-children.cjs`; it validates the independent field inventory, generated keys, parent paths, new-address relationship and final parent preservation. Do not rerun creates for documentation.

The delivery BO and CLI are unchanged. These are source-API results through local BO templates, not remote BO deployment or workflow execution. Records remain live. Earlier empty-child receipts describe the state before this creation and remain immutable. No deletion, publication or Git push occurred.
