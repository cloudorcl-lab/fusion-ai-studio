# Oracle 26C Supplier Resource Inventory

Inventory date: 2026-09-22. Product: Oracle Fusion Cloud Procurement 26C. API path version: `11.13.18.05`. Authoritative operation index: <https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/rest-endpoints.html>.

The inventory covers every resource beneath `/suppliers/{SupplierId}` in the 26C endpoint index. Supplier actions such as spend-authorization submission, external validation, scores, signals and recent-supplier marking are actions on the parent rather than child resource objects and are outside this build's create-child contract. Attachment `FileContents` and `FileWebImage` enclosures are transport facets of an attachment, not independent lifecycle records; the workflow never displays or persists binary content.

| ID | Resource / parent chain | Oracle methods | Current XDX BO function | Lifecycle disposition |
| --- | --- | --- | --- | --- |
| C01 | Addresses | GET, POST, PATCH | `ListSupplierAddresses`, `CreateSupplierAddress` | Core query/create/confirm in P5 |
| C02 | Addresses / Party Site DFF | GET | `ListSupplierAddressDFF` | Considered; excluded by user scope (ignore DFFs) |
| C03 | Attachments | GET, POST, PATCH, DELETE | `ListSupplierAttachments`, `CreateSupplierAttachment` | Considered; excluded by user scope (ignore attachments) |
| C04 | Business Classifications | GET, POST, PATCH, DELETE | `ListSupplierBusinessClassifications` | P8 create; create BO function required after field research |
| C05 | Business Classifications / Attachments | GET, POST, PATCH, DELETE | `ListSupplierBusinessClassificationAttachments` | Considered; excluded by user scope (ignore attachments) |
| C06 | Contacts | GET, POST, PATCH | `ListSupplierContacts`, `CreateSupplierContact` | Core query/create/confirm in P7 |
| C07 | Contacts / Contact Addresses | GET, POST, DELETE | `ListSupplierContactAddresses` | P8 create association; create BO function required |
| C08 | Contacts / Data Access | GET | `ListSupplierContactDataAccess` | Query-only; Oracle Supplier resource exposes no create operation |
| C09 | Contacts / Person DFF | GET | `ListSupplierContactDFF` | Considered; excluded by user scope (ignore DFFs) |
| C10 | Contacts / Roles | GET | `ListSupplierContactRoles` | Query-only; no account or role provisioning |
| C11 | Supplier DFF | GET, POST, PATCH | `ListSupplierDFF` | Considered; excluded by user scope (ignore DFFs) |
| C12 | Supplier Global DFF | GET, POST, PATCH | `ListSupplierGlobalDFF` | Considered; excluded by user scope (ignore DFFs) |
| C13 | Merge History | GET | `ListSupplierMergeHistory` | Query-only audit history |
| C14 | Products and Services | GET, POST, DELETE | `ListSupplierProductsAndServices` | P8 create category association; create BO function required |
| C15 | Products and Services View | GET | `ListSupplierProductsAndServicesView` | Query-only view of C14 |
| C16 | Sites | GET, POST, PATCH | `ListSupplierSites`, `CreateSupplierSite` | Core query/create/confirm in P6 |
| C17 | Sites / Attachments | GET, POST, PATCH, DELETE | `ListSupplierSiteAttachments` | Considered; excluded by user scope (ignore attachments) |
| C18 | Sites / DFF | GET, POST, PATCH | `ListSupplierSiteDFF` | Considered; excluded by user scope (ignore DFFs) |
| C19 | Sites / Global DFF | GET, POST, PATCH | `ListSupplierSiteGlobalDFF` | Considered; excluded by user scope (ignore DFFs) |
| C20 | Sites / Assignments | GET, POST, PATCH | `ListSupplierSiteAssignments` | P8 create after C16; create BO function and client-BU lookup required |
| C21 | Sites / Third-Party Payment Relationships | GET, POST, PATCH | `ListSupplierSiteThirdPartyPaymentRelationships` | Considered; excluded by user scope (ignore payment and third-party relationships) |
| C22 | Spend Authorization Requests | GET | `ListSupplierSpendAuthorizationApprovalRequests` | Query-only approval history; no submit/resubmit action in this build |

## Create-slice order and research gates

Core work proceeds supplier, address, site, then contact. P8 create work is limited to business classification, contact-address association, products-and-services association and site assignment. Each P8 create slice must first add a BO function only after its exact Oracle operation page, request schema, field descriptions, Example Request Body, keys, requiredness and uniqueness are recorded in the matching object reference.

DFFs, attachments, payment behavior and third-party payment relationships are excluded by explicit user direction. Their rows remain in this inventory only to prove they were considered; the workflow has no route or tool for them. All enabled create payloads use required business fields only. Optional source fields are not inherited, displayed as proposed defaults or submitted. If the user later places an excluded resource or optional field in scope, it receives its own contract, manifest row, exact approval, discrete test and cumulative regression before enablement.

All query routes preserve Oracle paging, keep technical keys internal, show at most four business columns and distinguish empty results from errors. A successful BO GET for a resource with no captured sample triggers the registry's capture-once rule; no GET is run solely to populate documentation.
