# XDX Supplier Lifecycle Child Resource Slice Review

Date: 2026-09-22
Build: `XDX_SUPPLIER_LIFECYCLE_AGENT`
Source inventory: [resource-inventory.md](resource-inventory.md)

Use this document to keep, remove or modify child-resource slices before their write implementation begins. Mark the decision in each section. A removed slice must also be removed from the plan, manifest, workflow routes and completion criteria before Closeout.

The estimates reflect observed progress in this build. They include contract review, required-field-only design, Business Object work, local contract tests, configured AI Agent Studio discrete and cumulative tests, target AI Agent Studio app-preview acceptance, evidence reconciliation and documentation. They exclude time waiting for live-POST approval, tenant outages and product defects. Shared framework work can reduce later slices, so the ranges should not be added as a rigid schedule.

## Review summary

| Slice | Mode | Dependency chain | Estimated effort | Decision |
| --- | --- | --- | ---: | --- |
| Supplier addresses | Query + create + confirm | Supplier | 45–75 min | Keep / Remove / Modify |
| Supplier sites | Query + create + confirm | Supplier → address → procurement BU | 60–90 min | Keep / Remove / Modify |
| Supplier contacts | Query + create + confirm | Supplier | 45–75 min | Keep / Remove / Modify |
| Business classifications | Query + create + confirm | Supplier → classification lookup | 60–120 min | Keep / Remove / Modify |
| Contact-address associations | Query + create + confirm | Supplier → contact + address | 45–90 min | Keep / Remove / Modify |
| Contact data access | Query only | Supplier → contact | 25–45 min | Keep / Remove / Modify |
| Contact roles | Query only | Supplier → contact | 25–45 min | Keep / Remove / Modify |
| Merge history | Query only | Supplier | 25–45 min | Keep / Remove / Modify |
| Products and services | Query + create + confirm | Supplier → category lookup | 60–120 min | Keep / Remove / Modify |
| Products and services view | Query only | Supplier; complements products/services | 25–45 min | Keep / Remove / Modify |
| Site assignments | Query + create + confirm | Supplier → site → client BU | 75–120 min | Keep / Remove / Modify |
| Spend authorization history | Query only | Supplier | 25–45 min | Keep / Remove / Modify |

Expected child-slice implementation effort after the current P2 test closure is approximately **9–15 focused hours**. Integrated P9 acceptance and Closeout remain separate shared gates. Live POST work cannot begin until the exact environment, record count, controlled identity and required-field-only payload are presented and approved.

## Slice 1 — Supplier addresses

**Decision:** Keep / Remove / Modify

**Description:** Query, prepare, explicitly approve, create and independently confirm an address under the selected supplier. The create payload contains only fields required by the current operation contract and the user's transaction. Generated address identifiers are omitted and captured from the response. Query output is limited to four business columns.

**Dependencies:** A uniquely resolved supplier and live `SupplierId`; current country/subdivision evidence; parent-scoped `AddressName` collision check; resolved Oracle documentation discrepancy around `CountryCode` and `Email`; exact live-POST approval. This slice must pass before a site that refers to the new address.

**Estimated time:** 45–75 minutes.

**Acceptance:** Configured AI Agent Studio tests execute `CreateSupplierAddress`; the target app shows the exact approval snapshot; a parent-scoped independent GET matches every submitted field and captures the generated address key.

## Slice 2 — Supplier sites

**Decision:** Keep / Remove / Modify

**Description:** Query, prepare, explicitly approve, create and independently confirm a supplier site. The write is limited to required business fields; payment, invoice, transportation, communication and other optional defaults stay out of the payload.

**Dependencies:** A uniquely resolved supplier; an existing or newly confirmed supplier address when the transaction requires one; an authorized procurement business unit resolved in the target environment; current `SupplierSite` and `ProcurementBUId` requiredness; exact live-POST approval.

**Estimated time:** 60–90 minutes.

**Acceptance:** Configured AI Agent Studio tests execute `CreateSupplierSite`; the target app identifies the selected supplier, address and procurement BU before approval; an independent parent-scoped GET confirms submitted values and the generated site key.

## Slice 3 — Supplier contacts

**Decision:** Keep / Remove / Modify

**Description:** Query, prepare, explicitly approve, create and independently confirm a supplier contact without provisioning a user account. The payload contains only required identity/contact fields. It does not copy source-person identifiers, operational destinations, roles, data access or other optional values.

**Dependencies:** A uniquely resolved supplier; an approved controlled test identity and non-operational destination; resolution of current `Email` and `InactiveDate` requiredness for the target tenant; exact live-POST approval.

**Estimated time:** 45–75 minutes.

**Acceptance:** Configured AI Agent Studio tests execute `CreateSupplierContact`; the exact identity is approved in the target app; an independent GET confirms submitted fields, generated identifiers and no unintended account provisioning.

## Slice 4 — Business classifications

**Decision:** Keep / Remove / Modify

**Description:** Query and create a classification record under the selected supplier. Only transaction-required classification fields are collected and submitted. Attachments, optional certification metadata and audit fields remain excluded unless the transaction makes a documented field mandatory.

**Dependencies:** A uniquely resolved supplier; exact Oracle POST schema and example; valid target-tenant `ClassificationCode`; date and certifying-reference rules when conditionally required; parent-scoped uniqueness behavior; a new create BO function; exact live-POST approval.

**Estimated time:** 60–120 minutes.

**Acceptance:** The create BO and configured AI Agent Studio case execute; the target app shows the required-field-only payload; an independent parent-scoped GET confirms the association and generated `ClassificationId`.

## Slice 5 — Contact-address associations

**Decision:** Keep / Remove / Modify

**Description:** Query and create an association between an existing supplier contact and an existing address under the same supplier. This slice does not create a postal address.

**Dependencies:** A uniquely resolved supplier, contact and address; proof that both child records belong to the same supplier; exact POST request field and uniqueness rule; a new create BO function; exact live-POST approval. Address and contact slices must already be accepted when newly created records are used.

**Estimated time:** 45–90 minutes.

**Acceptance:** The target app displays both sides of the association before approval; the configured AI Agent Studio test executes the create BO; an independent scoped GET confirms the association and captures any generated association key.

## Slice 6 — Contact data access

**Decision:** Keep / Remove / Modify

**Description:** Query the data-access records exposed for a selected supplier contact. Oracle exposes GET only for this child resource, so the slice discloses that it cannot create or change access.

**Dependencies:** A uniquely resolved supplier and contact; parent-chain binding through both keys; permission-aware field projection; the existing `ListSupplierContactDataAccess` BO.

**Estimated time:** 25–45 minutes.

**Acceptance:** A configured AI Agent Studio test executes the GET BO, preserves supplier/contact scope, distinguishes no rows from errors and renders no more than four business columns in the target app.

## Slice 7 — Contact roles

**Decision:** Keep / Remove / Modify

**Description:** Query the roles currently exposed for a selected supplier contact. The supplier REST child exposes GET only; the agent does not provision roles or accounts.

**Dependencies:** A uniquely resolved supplier and contact; parent-chain binding; permission-aware projection; the existing `ListSupplierContactRoles` BO.

**Estimated time:** 25–45 minutes.

**Acceptance:** A configured AI Agent Studio test executes the role GET in the correct parent scope, and the target app renders the supported fields while clearly stating the read-only boundary.

## Slice 8 — Merge history

**Decision:** Keep / Remove / Modify

**Description:** Query supplier merge-history records for the selected supplier. This is read-only audit history and has no create or update path.

**Dependencies:** A uniquely resolved supplier; current permission and visibility behavior; the existing `ListSupplierMergeHistory` BO.

**Estimated time:** 25–45 minutes.

**Acceptance:** A configured AI Agent Studio test executes the parent-scoped GET, correctly distinguishes empty history from an error and presents no more than four useful business columns in the target app.

## Slice 9 — Products and services

**Decision:** Keep / Remove / Modify

**Description:** Query and create a products-and-services category association for the selected supplier. The agent associates an existing valid category; it does not invent or create a category.

**Dependencies:** A uniquely resolved supplier; exact POST schema and example; an authorized target-tenant category lookup; parent-scoped duplicate behavior; a new create BO function; exact live-POST approval.

**Estimated time:** 60–120 minutes.

**Acceptance:** The target app displays the resolved category before approval; the configured AI Agent Studio test executes the create BO; an independent scoped GET confirms the association and generated key.

## Slice 10 — Products and services view

**Decision:** Keep / Remove / Modify

**Description:** Query the read-only view of supplier products and services. This slice can provide richer display confirmation for the writable association in Slice 9, but it has no POST operation.

**Dependencies:** A uniquely resolved supplier; projection mapping for the view; the existing `ListSupplierProductsAndServicesView` BO. If Slice 9 is removed, decide whether this standalone read view still has user value.

**Estimated time:** 25–45 minutes.

**Acceptance:** A configured AI Agent Studio test executes the view GET, returns the correct supplier's categories and renders no more than four business columns in the target app.

## Slice 11 — Site assignments

**Decision:** Keep / Remove / Modify

**Description:** Query and create an assignment for an existing supplier site. The payload is limited to required assignment fields; optional bill-to, ship-to and account references are included only when current Oracle rules make them conditionally required for the approved transaction.

**Dependencies:** A uniquely resolved supplier and site; an authorized client business unit resolved in the target environment; exact conditional-field and uniqueness rules; current-user BU data security; a new create BO function; exact live-POST approval. The site slice must already be accepted.

**Estimated time:** 75–120 minutes.

**Acceptance:** The target app identifies the site and client BU before approval; the configured AI Agent Studio test executes the create BO; an independent scoped GET confirms submitted fields and the generated `AssignmentId`.

## Slice 12 — Spend authorization history

**Decision:** Keep / Remove / Modify

**Description:** Query spend-authorization request history for the selected supplier. The child resource exposes GET only. Submit and resubmit actions on the supplier parent remain outside this build.

**Dependencies:** A uniquely resolved supplier; permission-aware projection; the existing `ListSupplierSpendAuthorizationApprovalRequests` BO.

**Estimated time:** 25–45 minutes.

**Acceptance:** A configured AI Agent Studio test executes the parent-scoped GET, distinguishes no history from failure and renders no more than four business columns in the target app with the read-only boundary disclosed.

## Explicitly excluded resources

The following inventoried resources are not implementation slices: every supplier, address, contact, site and classification DFF; all attachments and attachment binary facets; site third-party payment relationships; and all payment behavior. They were considered and excluded by user direction. No workflow route, BO write, test payload or completion requirement should be created for them.

## Recommended sequence

1. Close the reopened P2 configured child-read tests.
2. Implement address, site and contact in dependency order.
3. Implement business classifications and products/services after their lookup contracts are proven.
4. Implement contact-address associations after address and contact acceptance.
5. Implement site assignments after site acceptance and BU resolution.
6. Add retained query-only slices in one shared read-routing pass.
7. Run one cumulative AI Agent Studio workflow/app cycle, integrated runtime acceptance and Closeout.
