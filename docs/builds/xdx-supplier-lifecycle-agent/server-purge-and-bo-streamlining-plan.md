# XDX Supplier Lifecycle server purge and BO streamlining plan

Review date: 2026-09-23  
Environment identity: authenticated AI Studio tenant session as `CASEY.BROWN`  
Authority in this task: read-only server review and local planning. No remote
artifact or business-data deletion was executed.

## Server inventory

Read-only CLI fetches confirmed these current server artifacts:

| Type | Code | State | Version / identifier | Current dependency |
| --- | --- | --- | --- | --- |
| Agentic App | `XDX_SUPPLIER_LIFECYCLE` | DRAFT only | version 1, id `300000333951268` | Binds `XDX_SUPPLIER_LIFECYCLE_AGENT` as query agent |
| Workflow | `XDX_SUPPLIER_LIFECYCLE_AGENT` | DRAFT only | version `86078581`, ETag `30` | 40 BO nodes across the three BOs below |
| Business Object | `XDX_SUPPLIER_INFORMATION` | present | id `300000333852429` | 38 workflow-node references, 22 unique functions |
| Business Object | `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` | present | id `300000333870232` | one workflow-node reference |
| Business Object | `XDX_SUPPLIER_PRODUCT_SERVICE_CATEGORIES` | present | id `300000333968268` | one workflow-node reference |

Published lookups for the exact app and workflow codes returned not found. The
installed CLI can fetch the artifacts and can delete individual functions from a
local BO definition, but it does not expose a whole-app, whole-workflow or whole-BO
delete command. The destructive purge therefore requires the AI Studio management
UI, followed by CLI read-back proving absence.

The supplier BO predates parts of this build and may be shared. The current CLI
does not provide a complete reverse-consumer index. A whole-BO delete is blocked
until the AI Studio dependency view or an equivalent catalog-wide consumer search
proves that no app or workflow outside this build references it. Code ownership or
an `XDX_` prefix is not sufficient proof.

## Dependency-safe purge procedure

Estimated focused time: 25–40 minutes if no external consumer or version drift is
found. An external consumer turns the BO step into a separate migration decision.

1. Refresh the exact DRAFT app, DRAFT workflow and three BO definitions. Record
   codes, ids, versions/ETags, statuses, function counts and hashes. Stop if any
   value changed after this review.
2. Check the AI Studio dependency/usage view for each BO and record every consumer.
   The only expected consumer is `XDX_SUPPLIER_LIFECYCLE_AGENT`. Stop on any other
   consumer until it is explicitly migrated or retained.
3. Retain the committed source artifacts, object references, tests and this review
   as rollback/rebuild material. Server deletion has no Git rollback.
4. Delete DRAFT app `XDX_SUPPLIER_LIFECYCLE`. Read it back by exact code and require
   not found before continuing.
5. Delete DRAFT workflow `XDX_SUPPLIER_LIFECYCLE_AGENT`. Read it back by exact code
   and require not found before continuing.
6. Delete the dedicated lookup BOs in this order, with exact-code absence proof
   after each:
   1. `XDX_SUPPLIER_PRODUCT_SERVICE_CATEGORIES`
   2. `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS`
7. For `XDX_SUPPLIER_INFORMATION`:
   - delete the whole BO only when the consumer review proves zero remaining
     consumers and the user authorizes that exact deletion;
   - if another consumer exists, retain the BO, map which functions it uses, and
     remove only task-owned unused functions after a version-safe local edit,
     validation, save and consumer regression test;
   - for the retry, create a dedicated minimal XDX supplier BO rather than extending
     a shared 36-function BO.
8. Repeat exact-code fetches for DRAFT and PUBLISHED app/workflow states and fetches
   for all three BO codes. Close the purge only when every authorized target is
   absent and unexpected targets are untouched.
9. Record deletion commands/UI actions, timestamps, operator, before/after ids and
   results in the time tracker. Run living-build Closeout before local worktree
   cleanup.

This procedure removes AI Studio definitions. It does not delete suppliers,
addresses, sites, contacts or other Fusion business records created during testing.
Any business-data disposition requires a separate object-specific authorization and
rollback method.

## BO streamlining assessment

The current server BO surface contains 38 functions: 36 supplier functions and two
one-function lookup BOs. The current workflow uses 24 unique functions, including
five query-only routes that are not required by a create transaction. The proposed
retry surface contains 19 functions: 17 supplier functions plus the two lookup
functions. This is a 50% reduction overall and a reduction of the supplier BO from
36 to 17 functions.

Keep these supplier functions:

- `FindSuppliersByPartialName`
- `FindSuppliersByValidatedFilter`
- `ListSupplierAddresses`
- `ListSupplierSites`
- `ListSupplierContacts`
- `CreateSupplier`
- `CreateSupplierAddress`
- `CreateSupplierSite`
- `CreateSupplierContact`
- `ListSupplierBusinessClassifications`
- `CreateSupplierBusinessClassification`
- `ListSupplierContactAddresses`
- `CreateSupplierContactAddress`
- `ListSupplierProductsAndServices`
- `CreateSupplierProductsAndServices`
- `ListSupplierSiteAssignments`
- `CreateSupplierSiteAssignment`

Keep the separate lookup functions
`getall_procurementBusinessUnitsLOV` and
`ListSupplierProductServiceCategories`. Their resource roots and reference domains
are distinct, so combining them into the supplier BO would weaken ownership and
version isolation without reducing runtime calls.

Remove from the retry BO:

- all 11 DFF, attachment and third-party-payment functions;
- unused generic functions `ListSuppliers`, `FindSupplierByFullName` and
  `GetSupplierDetails`;
- query-only `ListSupplierContactDataAccess`, `ListSupplierContactRoles`,
  `ListSupplierMergeHistory`, `ListSupplierProductsAndServicesView` and
  `ListSupplierSpendAuthorizationApprovalRequests`.

The retained POST templates already contain only the approved transaction fields.
The next BO should also add explicit `fields=` projections to the address, site and
contact GETs and keep each verification projection to submitted fields plus the
generated key. This reduces response size, generated schema size and prompt/test
parsing while preserving duplicate and persisted-GET assertions.

Do not edit the current server BO in place for the retry. Purge it when proven
dedicated, or leave it intact when shared, then create a clean minimal BO under a
new retry code. This keeps the retry independent from stale functions, examples and
consumer assumptions.
