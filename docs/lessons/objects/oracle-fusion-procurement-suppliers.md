# Oracle Fusion Procurement Suppliers object reference

## Identity and scope

| Field | Value |
| --- | --- |
| Product | Oracle Fusion Cloud Procurement |
| Resource object | Suppliers |
| REST collection | `/fscmRestApi/resources/11.13.18.05/suppliers` |
| Documentation release | 26C |
| Stable business key used for item navigation | `SupplierId` |
| Local BO evidence owner | `XDX_SUPPLIER_INFORMATION` |
| Last evidence review | 2026-10-12 (retained evidence; no new live calls) |

Sources: [GET suppliers](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html), [POST supplier](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operations

Follow the [shared ADF find/search GET framework contract](README.md#adf-find-and-search-get-framework-contract) for every filtered function and its consumers. This build selects explicit header version `4`; retain any independently justified supported version. The current supplier native contains/exact proof does not prove every other query path.

The collection operation ID is `getall_suppliers`; the item operation ID is `get_suppliers`. The verified local functions cover collection listing, exact-name filtering, contained-name filtering and scalar item detail.

`SupplierNumber` is a displayed business identifier, not the REST `SupplierId`. Resolve a number to exactly one verified supplier row before constructing item or child-resource paths; numeric syntax alone cannot establish identifier identity. In a selection-based conversation, preserve the returned number-to-ID mapping and withhold unresolved or ambiguous references with query-first guidance. Keep explicit ID input distinct. The [Supplier Core manual regression](../../builds/xdx-supplier-core-20260924/evidence/xdx_number404_native.md) reproduced number-as-ID preparation and verified the corrected query, detail and address sequence in the native DRAFT app on 2026-09-25. This does not establish standalone number-filter support or change the immutable first GET sample.

| Behavior | Contract |
| --- | --- |
| Collection projection | `SupplierId`, `SupplierNumber`, `Supplier`, `SupplierType`, `BusinessRelationship`, `InactiveDate` |
| Exact-name filter | `q=Supplier='<escaped literal>'` |
| Contained-name filter | `q=Supplier like '%<escaped literal>%'` |
| Ordering | `SupplierId:asc` for deterministic page traversal |
| Pagination | Start with `limit=25`, `offset=0`; advance by returned `count` only while `hasMore` is true |
| Empty result | Valid collection with zero items; transport or service errors remain errors |
| Item detail | `/suppliers/{SupplierId}?onlyData=true`; returns scalar profile fields and does not prove child-resource completeness |

The declarative query template does not escape literals or enforce bounds. Its caller must validate nonempty search text, escape REST query literals, enforce positive limits and nonnegative offsets, and avoid presenting LIKE behavior as fuzzy matching. Special-character and case-collation behavior remain unverified.

### Response JSON

Collection functions preserve the native paging envelope:

```json
{
  "items": [
    {
      "SupplierId": 0,
      "SupplierNumber": "<value>",
      "Supplier": "<value>",
      "SupplierType": "<value>",
      "BusinessRelationship": "<value>",
      "InactiveDate": null
    }
  ],
  "count": 1,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

`SupplierId: 0` is a type placeholder, not a reusable ID. Item detail returns a single scalar object rather than this collection envelope.

## First successful BO GET sample

Captured once from `XDX_SUPPLIER_INFORMATION.ListSuppliers`; evidence run recorded 2026-09-16 19:20:11 -05:00. Source: the retained first response example in [xdx_supplier_information.bo](../../../src/businessObjects/xdx_supplier_information.bo). This sample is immutable; later supplier GETs do not replace it.

```json
{
  "items": [
    {
      "SupplierId": 300000047414503,
      "SupplierNumber": "1252",
      "Supplier": "Lee Supplies",
      "SupplierType": "Supplier",
      "BusinessRelationship": "Spend Authorized",
      "InactiveDate": null
    }
  ],
  "count": 1,
  "hasMore": true,
  "limit": 1,
  "offset": 0,
  "links": [
    {
      "rel": "self",
      "href": "https://fa-eqih-dev21-saasfademo1.ds-fa.oraclepdemos.com:443/fscmRestApi/resources/11.13.18.05/suppliers",
      "name": "suppliers",
      "kind": "collection"
    }
  ]
}
```

The later 25-row list retest and supplier-detail GET remain verification evidence; they do not create or refresh this first-success sample.

## POST operation

The create operation ID is `create_suppliers`. The current 26C OpenAPI request schema has 78 properties and marks `Supplier`, `SupplierNumber` and `SupplierPartyId` as required. Oracle's vendor Example Request Body contains eight fields—`Supplier`, `TaxOrganizationType`, `SupplierType`, `BusinessRelationship`, `DUNSNumber`, `OneTimeSupplierFlag`, `TaxpayerCountry` and `TaxpayerId`—and omits `SupplierNumber` and `SupplierPartyId`.

For the current supplier-create testing context, the user confirmed on 2026-09-17 that both fields are autogenerated. The authorized POST subsequently succeeded with both omitted and returned generated values; the published schema still marks them required. Revalidate before applying this behavior to another tenant or changed numbering configuration. Treat vendor tax and D-U-N-S values as structural examples only; do not copy or fabricate legal identifiers.

### Autogenerated fields

| Field | POST request treatment | Result handling | Evidence |
| --- | --- | --- | --- |
| `SupplierNumber` | Omit; the service generates the supplier number | Capture the generated value from the successful response | User confirmation and successful omitted-field POST, 2026-09-17, eqih-dev21 / API 11.13.18.05; [request and response](../../builds/xdx-supplier-information/live-post/create-supplier.json) |
| `SupplierPartyId` | Omit; the service generates the supplier party ID | Capture the generated value from the successful response | User confirmation and successful omitted-field POST, 2026-09-17, eqih-dev21 / API 11.13.18.05; same receipt |
| `SupplierId` | Omit the new resource ID | Capture the returned ID for child paths and verification | Successful omitted-field POST, 2026-09-17, eqih-dev21 / API 11.13.18.05; same receipt; initial omission hypothesis supported by POST example |

Current-task corroboration: the 20260926 rebuild in eqih-dev21 / API 11.13.18.05 omitted SupplierId, SupplierNumber and SupplierPartyId in both exact three-field creates. Direct saved-BO A generated 300000334073550/1509/300000334073551; native-app B generated 300000334073601/1510/300000334073602. Separate saved supplier GETs matched all three submitted fields and generated identifiers. [A independent readiness](../../builds/xdx-supplier-core-rebuild-20260926/qa-supplier-runtime-readiness.json) and [B independent verification](../../builds/xdx-supplier-core-rebuild-20260926/native-b-supplier-independent-verification.json) preserve distinct direct-BO and native-observed/separate-GET evidence; no exported native POST trace is claimed. These results corroborate existing omission treatment for this tenant; immutable first GET and requiredness/uniqueness limits are unchanged.

Fresh 20260928 A corroboration in eqih-dev21 / API 11.13.18.05: the native saved-BO `XDX_SUPPLIER_CORE_SUPPLIERS.CreateSupplier` [input](../../builds/xdx-supplier-core-rebuild-20260928/native-bo-review/A-post-input.txt) submitted exactly `Supplier=XDX Supplier Core 20260928 A`, `BusinessRelationship=Spend Authorized` and `TaxOrganizationType=Corporation`, omitting all three generated identifiers. Its [POST result](../../builds/xdx-supplier-core-rebuild-20260928/native-bo-review/A-post-result.txt) returned `SupplierId=300000334073700`, `SupplierNumber="1511"` and `SupplierPartyId=300000334073701`. A separate `GetSupplier` [input](../../builds/xdx-supplier-core-rebuild-20260928/native-bo-review/A-get-input.txt) used that internal SupplierId; its [result](../../builds/xdx-supplier-core-rebuild-20260928/native-bo-review/A-get-result.txt) independently matched the three submitted fields and generated identifiers. This is A direct native saved-BO proof only, not B or native-app acceptance. It corroborates the existing table above without changing schema requiredness, uniqueness limits or the immutable first GET sample. The accepted POST must not be replayed.

Do not send placeholder values or copy these fields from a prior GET. Additional autogenerated fields must be documented with their own evidence rather than inferred from their names.

### Required and unique fields

| Field | Requiredness | Uniqueness scope | Test-data treatment | Evidence |
| --- | --- | --- | --- | --- |
| `Supplier` | Required by the reviewed 26C request schema | Target supplier collection | Generate a distinctive test name within the documented 360-character limit; do not copy a supplier name from saved GET data | Requiredness/length: reviewed Oracle 26C schema; uniqueness: user confirmation, 2026-09-17; no duplicate-name POST tested |
| `BusinessRelationship` | Required by the eqih-dev21 runtime for this create route | Tenant lookup | Use a tenant-validated lookup value and show it in the exact review; this supplier classification is separate from the excluded third-party payment relationship child resource | HTTP 400 `POZ_REST_DUAL_ATR_VAL_ERR`, 2026-09-23; earlier successful eqih-dev21 POST used `Spend Authorized` |
| `TaxOrganizationType` | Required by the eqih-dev21 runtime for this create route | Tenant lookup | Use a tenant-validated lookup value and show it in the exact review; do not add tax identifiers | HTTP 400 `POZ_REST_DUAL_ATR_VAL_ERR`, 2026-09-23; earlier successful eqih-dev21 POST used `Corporation` |

Case, whitespace normalization and the service's exact duplicate-matching behavior remain unverified. Saved GET data can identify known collisions but cannot prove current collection-wide uniqueness.

Later retained evidence limits the historical display-value contract: on 2026-09-30 the benchmark POST submitted `BusinessRelationship=Spend Authorized` and `TaxOrganizationType=Corporation` and received HTTP 400 / Oracle `25072` at `/BusinessRelationship`. The retained [failure receipt](../../builds/xdx-playbook-reconciliation-20261012/evidence/supplier-post-business-relationship-failure.json) reports no confirmed create. This contradicts treating the earlier display values as a currently proven create contract, but does not establish whether the cause is lookup configuration, execution surface or another request difference.

The worktree's [code-field repair record](../../builds/xdx-playbook-reconciliation-20261012/evidence/supplier-create-code-field-repair.json) proposes exactly `Supplier`, `BusinessRelationshipCode=SPEND_AUTHORIZED` and `TaxOrganizationTypeCode=CORPORATION` while preserving display labels for review. Despite its `acceptedCanonicalValues` label, that record is local repair evidence: no successful POST or persisted readback of this corrected mapping was retained. Reconcile the exact saved BO and current operation contract before any newly authorized create; neither this warning nor the candidate authorizes a retry. Earlier accepted display-field writes remain historical evidence.

### Candidate request JSON

Generate the first request from an explicit writable-field allowlist. This is a review shape, not a proven executable payload:

```json
{
  "Supplier": "<unique approved test name>",
  "SupplierType": "<validated tenant value>",
  "BusinessRelationship": "<validated tenant value>",
  "TaxOrganizationType": "<validated tenant value>",
  "OneTimeSupplierFlag": true
}
```

For the historical `XDX_SUPPLIER_LIFECYCLE_AGENT` build, the user narrowed the transaction to required fields only and explicitly excluded every optional field. A live 2026-09-23 attempt proved that eqih-dev21 rejects a supplier-name-only payload and requires `BusinessRelationship` plus `TaxOrganizationType`. Its then-accepted three-field shape was:

```json
{
  "Supplier": "<unique approved test name>",
  "BusinessRelationship": "<validated tenant value>",
  "TaxOrganizationType": "<validated tenant value>"
}
```

This historical build-specific scope omits `SupplierType`, `OneTimeSupplierFlag` and every other optional property. It also omits generated `SupplierId`, `SupplierNumber` and `SupplierPartyId`. `BusinessRelationship` here is the supplier's required business classification; it is not the excluded third-party payment relationship child resource. The later rejection above requires current reconciliation before reuse.

Omit `SupplierNumber` and `SupplierPartyId` for this test, following the confirmed autogenerated-field contract above. Omit other confirmed server-generated keys, audit fields and optional legal, tax, bank or contact data unless the test explicitly requires approved values.

Use `Upsert-Mode: false` for the first create test. Check for the unique supplier name before the write. After a response or timeout, reconcile by returned ID or unique name before retrying. Verify persisted values by GET and record any server normalization or defaults. Do not assume deletion or rollback is supported.

The 2026-09-24 XDX Supplier Core native DRAFT acceptance omitted SupplierId and SupplierNumber, returned SupplierId300000333814409 and SupplierNumber1506, and independently verified the exact three submitted fields under eqih-dev21 / 11.13.18.05. See [native receipt](../../builds/xdx-supplier-core-20260924/evidence/xdx_p2_native_supplier.md). This corroborates existing generated-field treatment without broadening requiredness or uniqueness scope; the immutable first GET sample is unchanged.

## Evidence and limits

- The 20260928 A [native saved-BO POST](../../builds/xdx-supplier-core-rebuild-20260928/native-bo-review/A-post-result.txt) and [independent item GET](../../builds/xdx-supplier-core-rebuild-20260928/native-bo-review/A-get-result.txt) corroborate exact three-field persistence and generated identifier omission in this tenant. They establish neither native-app acceptance nor concurrent no-replay protection.

- [Build verification](../../builds/xdx-supplier-information/verification.md) records live GET evidence for list, exact name, contained name and item detail.
- [List evidence](../../builds/xdx-supplier-information/live-list-suppliers.json) proved one page can have continuation; it did not prove collection completeness.
- [Detail evidence](../../builds/xdx-supplier-information/live-details/GetSupplierDetails-baseline.json) proved one scalar profile response.
- The POST page and Example Request Body were retrieved and parsed with normal certificate validation. The original 2026-09-17 POST omitted SupplierType after a CLI false-positive error; this was a business-intent failure, not acceptable optional-field treatment. The CLI classifier was repaired, SupplierType restored to the BO, and the original test supplier repaired by single-field PATCH and verified by GET. A separately authorized fresh POST then preserved SupplierType=Supplier and derived SupplierTypeCode=SUPPLIER, verified by GET. See [SupplierType correction](../../builds/xdx-supplier-information/xdx_supplier_type_correction.md). Never drop a known valid lookup value merely because a tool calls it illustrative.
- Revalidate on API release, OpenAPI, tenant numbering, lookup configuration, authentication, permission or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-10-12 | [Reconciled benchmark evidence](../../builds/xdx-playbook-reconciliation-20261012/audit.md) | Promote the retained 2026-09-30 display-value POST rejection; distinguish the code-field candidate from accepted behavior, qualify historical payload guidance, and preserve the immutable first GET. No live calls. |
| 2026-09-28 | Fresh A supplier1511 direct native saved-BO POST and separate GetSupplier | Corroborated omitted/generated SupplierId, SupplierNumber and SupplierPartyId with exact three-field persistence; limited proof to A direct saved BO, preserved immutable first GET and existing requiredness/uniqueness scope. |
| 2026-09-28 | [Shared query-framework policy and supplier-only native repair](README.md#adf-find-and-search-get-framework-contract) | Link all filtered GET uses to the shared owner; native saved ListSuppliers contains/exact retest confirms header4 repair in this tenant. Other routes remain separately gated; first-success sample unchanged. |
| 2026-09-27 | Rebuild A1509/B1510 direct saved-BO and native/separate-GET evidence | Corroborated existing omitted/generated supplier identifiers with exact three-field persistence; preserved evidence-surface distinction, tenant scope and first GET. |
| 2026-09-25 | Current Supplier Core direct saved BO POST/GET for supplier 1507 and native observed verified widget for supplier 1508 | Corroborated omitted/generated SupplierId, SupplierNumber and SupplierPartyId; distinguished retained A responses from B native widget and saved-graph evidence without raw response export. Same-tenant scope and immutable first GET preserved. |
| 2026-09-25 | Supplier Core manual steps 2 and 3 returned404; actual-CODE reproduction and native repaired sequence | Distinguish displayed SupplierNumber from REST SupplierId; require verified mapping before supplier/child path construction. |
| 2026-09-24 | XDX Supplier Core exact-approved native POST and independent GET | Corroborated existing generated-field treatment and required payload in the tested tenant; retained first GET sample and unresolved uniqueness limits. |
| 2026-09-23 | XDX Supplier Lifecycle live runtime attempt plus retained successful eqih-dev21 create receipt | Corrected the build-specific required-field contract: add `BusinessRelationship` and `TaxOrganizationType`; preserve omission of optional, generated, payment, DFF, attachment and third-party-payment fields. |
| 2026-09-22 | Current XDX Supplier Lifecycle Agent user scope and P4 contract | Recorded the build-specific required-field-only supplier payload: submit only `Supplier`; omit generated IDs and all optional fields. No POST executed. |
| 2026-09-17 | CLI regression, SupplierType PATCH/GET correction and fresh POST/GET | Recorded cross-parameter placeholder false positive and mandatory preservation of source-backed SupplierType; both repaired record and new-create type/code are live verified. |
| 2026-09-17 | Authorized POST request/response and parent-scoped GET under live-post | Confirmed omitted generated IDs for the tested tenant and recorded POST/schema limits; immutable first-success GET sample preserved. |
| 2026-09-17 | User confirmation and previously reviewed Oracle schema | Recorded required supplier-name uniqueness and POST test-data generation scope; retained GET samples unchanged. |
| 2026-09-17 | User confirmed both fields are autogenerated | Recorded `SupplierNumber` and `SupplierPartyId` under POST; omit both from the current create request and capture generated response values. No API execution. |
| 2026-09-17 | First retained `ListSuppliers` BO response | Added immutable first-success GET sample; later GET evidence does not refresh it. |
| 2026-09-17 | Supplier BO live GET receipts and Oracle 26C GET/POST documentation | Established Suppliers as the owner for collection/detail GET, response JSON, create-request JSON and the unresolved `SupplierNumber`/`SupplierPartyId` requirement discrepancy. |
