# Oracle Fusion Procurement Supplier Sites object reference

## Identity and scope

| Field | Value |
| --- | --- |
| Product | Oracle Fusion Cloud Procurement |
| Resource object | Supplier Sites |
| REST collection | `/fscmRestApi/resources/11.13.18.05/suppliers/{SupplierId}/child/sites` |
| Documentation release | 26C |
| Required parent key | Live-resolved `SupplierId` |
| Stable item key | `SupplierSiteId` |
| Last evidence review | 2026-09-27 |

Sources: [GET supplier sites](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-sites-get.html), [POST supplier site](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-sites-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operation

Follow the [shared ADF find/search GET framework contract](README.md#adf-find-and-search-get-framework-contract) for every filtered function and its consumers. This build selects explicit header version `4`; retain any independently justified supported version. The supplier native repair does not prove this resource's other query paths.

Parent identity follows the [Suppliers GET key contract](oracle-fusion-procurement-suppliers.md#get-operations): a displayed SupplierNumber must resolve to SupplierId before this child path is constructed. Preserve the selected supplier and reject unresolved or ambiguous number references.

The collection operation ID is `getall_suppliers-sites`. Resolve the parent supplier first. The local BO exposes that parent as `suppliers_Id`; no sample ID is a valid default.

| Behavior | Contract |
| --- | --- |
| Parent scope | Every result must belong to the requested supplier |
| Filter | Trusted REST framework v4 rowmatch expression |
| Verified filters | Equality by `SupplierSiteId` and equality by `SupplierSite` |
| Ordering | `SupplierSiteId:asc` |
| Pagination | Independent `limit`, `offset`, `count` and `hasMore` envelope |
| Empty result | Valid empty collection; preserve service errors as errors |

### Response JSON

```json
{
  "items": [
    {
      "SupplierSiteId": 0,
      "SupplierSite": "<value>",
      "ProcurementBUId": 0,
      "ProcurementBU": "<value>",
      "SupplierAddressName": "<value>",
      "InactiveDate": null
    }
  ],
  "count": 1,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

The full native site response is much larger. Do not infer that the displayed structural fields are the complete item schema.

The 2026-09-25 saved-BO probe returned `SupplierSiteId`, `SupplierAddressId` and `ProcurementBUId` as decimal strings in both its retained POST and independent GET responses, while the approved request supplied `ProcurementBUId` as a JSON number. Validate returned identifiers and compare a canonical decimal representation without losing integer precision; this response-boundary normalization does not permit quoting/coercing a numeric request field, hardcoding a BU, or substituting a displayed identifier. This is observed probe response behavior, not a claim that every REST/client path returns strings. See the current-task POST evidence below.

## First successful BO GET sample

Captured once from `XDX_SUPPLIER_INFORMATION.ListSupplierSites` at `2026-09-16T20:15:38.4574151-05:00`. Complete retained JSON (archived evidence E0067) contains 24 items and every returned site property. This bounded excerpt copies selected fields from the exact first item and preserves the original envelope values; remaining fields and 23 items are omitted. Later site GETs do not replace this sample.

```json
{
  "items": [
    {
      "SupplierSiteId": 300000047507684,
      "SupplierSite": "OD US1",
      "ProcurementBUId": 300000046987012,
      "ProcurementBU": "US1 Business Unit",
      "SupplierAddressId": 300000047507644,
      "SupplierAddressName": "OD US1",
      "Address": "6600 N MILITARY TRL,BOCA RATON, FL 33496 PALM BEACH",
      "InactiveDate": null,
      "Status": "ACTIVE",
      "SitePurposeSourcingOnlyFlag": false,
      "SitePurposePurchasingFlag": true,
      "SitePurposeProcurementCardFlag": false,
      "SitePurposePayFlag": true,
      "SitePurposePrimaryPayFlag": true,
      "IncomeTaxReportingSiteFlag": false,
      "B2BCommunicationMethodCode": "NONE",
      "B2BCommunicationMethod": "No",
      "PayOnReceiptFlag": true,
      "InvoiceSummaryLevelCode": "RECEIPT",
      "InvoiceSummaryLevel": "Receipt",
      "ReceiptRoutingId": 3,
      "ReceiptRouting": "Direct delivery",
      "InvoiceMatchOptionCode": "R",
      "InvoiceMatchOption": "Receipt",
      "CreationDate": "2013-11-12T15:52:16.736-06:00",
      "CreatedBy": "CALVIN.ROTH",
      "LastUpdateDate": "2016-04-12T10:12:45.406-05:00",
      "LastUpdatedBy": "CALVIN.ROTH"
    }
  ],
  "count": 24,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

## POST operation

The create operation ID is `create_suppliers-sites`. The 26C OpenAPI request schema has 120 properties and marks `ProcurementBUId` and `SupplierSite` as required. Oracle's vendor example includes those fields plus a large set of purchasing, receiving, invoicing, payment, transportation and communication defaults. Those IDs, codes, names, tolerances and operational settings are examples, not portable values.

### Autogenerated fields

| Field | POST treatment | Evidence and scope |
| --- | --- | --- |
| `SupplierSiteId` | Omit the new site ID; capture the generated response value | Successful omitted-field POST, 2026-09-17, eqih-dev21 / 11.13.18.05; request and response (archived evidence E0068). Initial derivation hypothesis confirmed for this scope. |

Current-task corroboration: on 2026-09-27, actual saved CreateSite A accepted the four-field body with a dynamic numeric ProcurementBUId and generated SupplierSiteId 300000334073627 under supplier300000334073550/address300000334073608. Native-app B generated 300000334073630 under supplier300000334073601/address300000334073619. Both used current complete US1 Business Unit lookup ID 300000046987012; independent GetSite comparisons confirmed all four approved fields and same-chain relationships. A runtime comparison (archived evidence E0069) and frozen B independent comparison (archived evidence E0070) corroborate existing generated-ID treatment. Decimal-string response identifiers are compared after exact validation; the request BU remains a JSON number. A POST Address=null followed by GET-computed Address is outside the submitted four-field equality check, not a missing approved field. Same-tenant/API11.13.18.05 evidence does not broaden uniqueness or requiredness; first GET remains unchanged.

`SupplierAddressId` remains a foreign reference, not a new-site generated ID. The successful request identified the newly created address by `SupplierAddressName`; Fusion resolved its ID. `ProcurementBUId` was supplied from the selected Lee site. Do not omit required parent or business-unit references under the generated-ID policy.

Current restart corroboration (2026-09-28): the supported saved-definition BO CLI omitted SupplierSiteId, created site300000334073781 under supplier300000334073700, and independently retrieved it by that returned key. All four intended fields persisted, including numeric ProcurementBUId300000046987012 and purchasingtrue; SupplierAddressName resolved to same-parent address300000334073742. Exact payload and persisted comparison (archived evidence E0071). This proves the direct CLI surface only; native workflow acceptance remains separate. No new uniqueness claim or first-GET replacement.

Native restart corroboration (2026-09-28): saved workflow86558941 created B-site300000334073784 once, after field-only edit, exact revision2 review and approval, under supplier300000334073731/address300000334073749. The workflow independent GetSite matched the same four fields and numeric BU selection; accepted state and no-replay message displayed. Native create receipt (archived evidence E0072). This confirms generated SupplierSiteId on the native workflow surface; separate ordinary query and final configured acceptance are tracked independently. No first-success GET replacement.

### Requiredness and uniqueness review

Additional confirmation: the 1497 site POST (archived evidence E0073) omitted SupplierSiteId and returned a generated value; GET (archived evidence E0074) confirmed it and resolved SupplierAddressName to the newly created address ID, on 2026-09-17 in the same tenant/release. No generated-field or uniqueness scope is broadened.

The retained 26C schema (archived evidence E0075) requires `SupplierSite` (maximum 240 characters) and `ProcurementBUId`. Its reviewed descriptions do not establish the duplicate-name key or case/normalization rules. Uniqueness scope is therefore unresolved, including whether procurement BU participates with supplier parent and site name; do not assert global or parent-only uniqueness. The successful test used a distinctive name under a newly created parent and verified the address/BU relationship. No duplicate POST was attempted. Revalidate this constraint before a test that depends on collision semantics.

### Candidate request JSON

Start from the smallest schema-aligned review shape and add only approved requirements:

```json
{
  "SupplierSite": "<unique approved site code>",
  "ProcurementBUId": 0,
  "SupplierAddressName": "<resolved address name>",
  "SitePurposePurchasingFlag": true
}
```

Replace `0` with a current, authorized business-unit ID resolved in the target environment. Confirm whether an existing supplier address, site purpose or pay/procurement configuration is conditionally required. Do not mix code and display-name variants without current metadata. Do not copy vendor-example carrier, payment terms, tolerance, currency, hold or communication values.

The 2026-09-23 XDX Supplier Lifecycle acceptance created site `300000333814273` under supplier `300000333814250` with exactly the four fields shown above. The business unit and address were selected from live references, `SupplierSiteId` was omitted and generated, the purchasing-purpose flag persisted as `true`, and an independent parent-scoped GET by generated ID matched all four intended fields and both relationships. Payment purposes, payment configuration, DFFs, attachments and every other optional field were omitted. This is evidence for the tested tenant and release; it does not broaden the unresolved uniqueness scope.

Verify a successful write by returned `SupplierSiteId` and parent-scoped GET. Compare server defaults separately from submitted values. The authorized 2026-09-17 create and read-back passed, including the new address relationship and submitted procurement BU and purpose flags; see the POST review (archived evidence E0076).

The 2026-09-24 XDX Supplier Core native DRAFT acceptance omitted SupplierSiteId and returned300000333814424 under supplier300000333814409. Independent GET matched all four approved fields, resolved SupplierAddressId300000333814416 and current US1 Business Unit300000046987012. See native receipt (archived evidence E0077). No assignment/payment fields were submitted. This corroborates existing generated-ID treatment in eqih-dev21 / 11.13.18.05 without resolving duplicate-name uniqueness; immutable first GET sample unchanged.

## Evidence and limits

- Core live summary (archived evidence E0078) records baseline, ID filter, offset paging and empty-result checks.
- Text-filter summary (archived evidence E0079) records a site-name equality check.
- The verified baseline contained 24 terminal rows for one authorized supplier. This is not a universal cardinality.
- Partial text, special-character and case behavior remain unverified.
- Revalidate on API release, OpenAPI, procurement-business-unit configuration, supplier-address state, lookup, permission or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-09-28 | [Shared query-framework policy and supplier-only native repair](README.md#adf-find-and-search-get-framework-contract) | Link all filtered GET uses to the explicit-header and known-hit regression owner; no new supplier-sites runtime proof or first-success sample change is claimed. |
| 2026-09-27 | Rebuild sites627/630, numeric-BU requests and independent GET | Corroborated generated site IDs and exact parent/address/BU relationships; retained decimal-string response boundary and distinguished derived Address from four intended fields. |
| 2026-09-25 | Actual saved CreateSite probe and independent persisted GetSite, site 300000333814509 | Corroborated generated SupplierSiteId, four-field numeric-BU request and same-chain relationships; recorded observed decimal-string response keys without request coercion. Immutable first GET preserved. |
| 2026-09-25 | Supplier Core number404 repair and user-confirmed six-step manual query acceptance | Link parent-number resolution to the Suppliers GET owner; no new child API or write behavior claimed. |
| 2026-09-24 | XDX Supplier Core exact-approved native POST and independent GET | Corroborated existing generated-field treatment and required payload in the tested tenant; retained first GET sample and unresolved uniqueness limits. |
| 2026-09-23 | XDX Supplier Lifecycle one-POST site acceptance and independent GET | Confirmed the required-field-only four-field request, generated `SupplierSiteId 300000333814273`, resolved BU/address relationships and omitted payment/optional fields; retained first-success GET sample unchanged. |
| 2026-09-17 | Supplier 1497 child POST/GET | Added generated site ID and new-address relationship confirmation; six intended fields matched. |
| 2026-09-17 | Retained 26C schema reviewed during compliance audit | Explicitly recorded requiredness, name length and unresolved duplicate-key scope; no new POST. |
| 2026-09-17 | Authorized POST request/response and parent-scoped GET under live-post | Confirmed omitted generated IDs for the tested tenant and recorded POST/schema limits; immutable first-success GET sample preserved. |
| 2026-09-17 | First retained `ListSupplierSites` BO response | Added immutable first-success GET excerpt and link to complete JSON; later GET evidence does not refresh it. |
| 2026-09-17 | Parent-scoped live GET receipts and Oracle 26C GET/POST documentation | Established Supplier Sites as the owner for GET filtering/paging, response JSON, minimal create-request design and environment-specific site references. |
