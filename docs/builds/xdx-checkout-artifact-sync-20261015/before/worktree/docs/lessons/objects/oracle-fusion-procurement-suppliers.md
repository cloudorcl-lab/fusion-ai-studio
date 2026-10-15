# Oracle Fusion Procurement Suppliers object reference

This is the single reusable lessons reference for the parent **Supplier** resource. Any build that reads, searches, resolves or creates suppliers should use it. Historical receipts substantiate the rules; their tenant values, artifact names and IDs are not new-build defaults.

## Reuse in another build

1. Pin the target environment, REST version and documentation release. Review the GET/POST contracts below against the exact operation specification and current saved BO before relying on them.
2. Declare which supplier operations and business fields the build requires. Use the key/filter/paging contract for reads and the field classification for writes; preserve approved optional fields.
3. Reuse retained samples only within their demonstrated scope. Resolve current supplier references from authorized source data; historical IDs or display lookup values cannot become defaults.
4. Record the selected reference and unresolved limits in the build intake. Run applicable local gates, then prove only the required saved-BO and app boundaries within the build's authority.
5. Add verified operation findings here. Keep full run receipts in build evidence and leave the first-success GET sample unchanged.

The [object registry](README.md) owns shared API evidence and sample policies. The [living playbook](../AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md) owns architecture, approval, first-slice, workflow, native UI and lifecycle gates. This reference grants no read, write or deployment authority.

## Identity and scope

| Field | Contract |
| --- | --- |
| Product / resource | Oracle Fusion Cloud Procurement / Suppliers |
| Reviewed REST collection | `/fscmRestApi/resources/11.13.18.05/suppliers` |
| Reviewed documentation release | 26C; revalidate for another release |
| Collection GET / item GET / create IDs | `getall_suppliers` / `get_suppliers` / `create_suppliers` |
| Item REST key | `SupplierId` (internal key) |
| Displayed business identifier | `SupplierNumber`; resolve to the internal key |
| Evidence review | 2026-10-12; retained evidence only, no new runtime calls |

Operation sources: [GET suppliers](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html), [POST supplier](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-post.html), [26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

Addresses, sites, contacts, DFFs, attachments and other children have separate operation owners in the [registry](README.md#references). Supplier detail does not prove child completeness or child write contracts. Read the matching child reference when a build includes that child.

## GET operations

### Identity and request construction

Treat SupplierNumber and SupplierId as different identifiers even when both contain digits. Resolve a displayed number to exactly one verified supplier row before constructing item or child paths. Preserve the verified number-to-ID mapping in selection state; withhold ambiguous, missing or conflicting selections. Keep explicit internal-ID input distinct. The native repair evidence proves same-conversation selection-based resolution, not a general standalone SupplierNumber filter.

Generated BO parameter names such as `suppliers_Id` can differ from business field names. Preserve the actual operation parameter name and bind its value to the resolved SupplierId; neither the name nor numeric syntax establishes key meaning. Use no sample-ID default.

| Behavior | Retained contract and reuse rule |
| --- | --- |
| Summary projection | `SupplierId`, `SupplierNumber`, `Supplier`, `SupplierType`, `BusinessRelationship`, `InactiveDate`; extend only for approved consumers |
| Exact-name query | `q=Supplier='<escaped literal>'` |
| Contains query | `q=Supplier like '%<escaped literal>%'`; LIKE is not fuzzy matching |
| Ordering | `SupplierId:asc` for the proven deterministic traversal |
| Page inputs | Historical baseline `limit=25`, `offset=0`; caller enforces positive bounded limits and nonnegative offsets |
| Continuation | Advance offset by returned `count` only while `hasMore` is true; a full page or a first page does not prove completeness |
| Item detail | `/suppliers/{SupplierId}?onlyData=true`; scalar profile, separate from child collections |
| Empty result | Successful collection with zero items; retain transport, parse, authentication and service errors as errors |

The caller owns nonempty search validation, query-literal escaping and bounds; declarative templates do not enforce them. Special-character escaping, case collation and arbitrary partial filters are not established by the retained simple-name examples.

### Search framework and acceptance

Set an explicit supported `REST-Framework-Version` under the [shared ADF search contract](README.md#adf-find-and-search-get-framework-contract). Version `4` is the retained supplier saved-BO baseline, not a universal forced version. Preserve independently justified versions after their own compatibility review.

The same contains input returned zero before the saved header repair and known rows afterward; this does not establish the original server default. Verify both known-hit exact and contains queries, returned keys and paging through the actual saved BO wherever supported. An empty-only test or local header inspection is insufficient. Include duplicate-name preflight and identifier-resolution consumers in the same function inventory. A header/function/target change invalidates its affected proof.

Before an in-scope save, follow the registry's `node scripts/verify-bo-search-contract.cjs <file.bo>` gate. For an app-bound workflow, the existing `node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>` gate also checks referenced functions. Neither local gate proves live filtering or workflow/UI acceptance.

### Response JSON

Preserve the native collection envelope. This is a structural example; `0` and angle-bracket values are placeholders:

```json
{
  "items": [
    {
      "SupplierId": 0,
      "SupplierNumber": "<displayed number>",
      "Supplier": "<name>",
      "SupplierType": "<type>",
      "BusinessRelationship": "<relationship>",
      "InactiveDate": null
    }
  ],
  "count": 1,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

An item GET returns a scalar object rather than this collection envelope. Preserve required fields, types, nulls and any required transport metadata; assert identity, count and unique keys against the actual response. A projected summary is not a full profile, and a full scalar profile is not every nested resource.

## POST operation

### Schema and evidence precedence

The retained 26C OpenAPI schema has 78 request properties and marks `Supplier`, `SupplierNumber` and `SupplierPartyId` required. Its vendor Example Request Body contains eight fields—Supplier, TaxOrganizationType, SupplierType, BusinessRelationship, DUNSNumber, OneTimeSupplierFlag, TaxpayerCountry and TaxpayerId—and omits the last two required identifiers.

Record this discrepancy explicitly. Examples are structural evidence, not exhaustive requirements or generated-field proof. Compare the exact operation schema, descriptions, retained writable GET values and tenant behavior before authoring a payload. Reconcile new contradictions rather than inventing identifiers or copying the whole GET. Vendor legal/tax/D-U-N-S values are not reusable business data.

### Autogenerated fields

These omission rules are verified for the retained eqih-dev21 / API 11.13.18.05 numbering configuration. Revalidate for another tenant or changed numbering configuration. Each additional generated field needs its own evidence.

| Field | Request treatment | Response handling | Evidence |
| --- | --- | --- | --- |
| `SupplierId` | Omit the new resource's ID | Capture the returned internal key for verification and child paths | Omitted-field successful POST/readback, 2026-09-17; later direct/native corroboration |
| `SupplierNumber` | Omit when confirmed service-generated | Capture the displayed number, preserving its response type | User confirmation and omitted-field successful POST, 2026-09-17; retained schema still marks it required |
| `SupplierPartyId` | Omit when confirmed service-generated | Capture the returned party ID | Same user confirmation and successful omitted-field POST; retained schema still marks it required |

Do not infer generation from a GET value or an absent vendor-example field alone. Parent/foreign references remain independently classified; blanket ID omission is not a contract.

### Current-target POST verification (2026-10-14)

In eqil-dev21/API11.13.18.05, saved XDX_SUPPLIERS CreateSupplier accepted the authorized four-field request (Supplier plus SupplierType=Supplier, BusinessRelationship=Spend Authorized, TaxOrganizationType=Corporation) using framework4, application/json and Upsert-Mode:false. SupplierId, SupplierNumber and SupplierPartyId were omitted and generated as 300000340604720, 1501 and 300000340604721. Native saved GetSupplier independently returned the created identity, ACTIVE status and every intended business field unchanged. This resolves the schema/example omission hypothesis for this tested target configuration; it does not prove all tenant configurations or arbitrary lookup values. The item projection omits SupplierPartyId; its generation is established by the POST response. Do not copy these new IDs into later create requests.

Supplier remains required with maximum360 characters; the three approved display classifications retain maximum80. The exact proposed name had no match before creation; uniqueness normalization/case semantics remain unproven. No duplicate POST was attempted. Evidence: [direct readiness](../../builds/xdx-supplier-workspace-20261014/supplier-direct-readiness.json), direct-post-parsed.json and direct-post-readback.json in the same build. First-success GET sample unchanged.

Native app corroboration in the same target: the exact reviewed four-field request created XDX Dell Clone Native 20261014 with generated SupplierNumber1502. The saved graph omits the number and validates an independent item GET before reporting success; a separate native number1502 detail request then displayed the same name and all three classifications. This is native UI plus saved-graph evidence; raw new SupplierId and SupplierPartyId were not exported and are not claimed from this observation. See [native readiness](../../builds/xdx-supplier-workspace-20261014/native-supplier-readiness.json). No repeat POST; first-success GET sample unchanged.

### Required and unique fields

| Field / constraint | Requiredness and scope | Reuse rule |
| --- | --- | --- |
| `Supplier` | Required in retained 26C schema; maximum 360 characters | Name uniqueness was user-confirmed for the target supplier collection on 2026-09-17. Generate an approved distinctive name, check collision scope when authorized, and retain unknown normalization rules. No duplicate-name POST test is established. |
| Business relationship | Name-only creates were rejected; earlier target-tenant success used `BusinessRelationship=Spend Authorized` | Required classification and writable display/code representation must be reconciled for the current operation. The later display-value failure below prevents treating that value as a current default. |
| Tax organization type | Earlier target-tenant success required `TaxOrganizationType=Corporation` | Reconcile current lookup representation and value; this is not authorization to add tax identifiers. |
| `SupplierType` | Writable string, maximum 80 characters in retained 26C evidence; optional schema status does not remove approved business intent | If required by the build, preserve it independently of submitted-field comparisons. Successful retained `SupplierType=Supplier` produced `SupplierTypeCode=SUPPLIER`; this pair is scoped evidence, not a universal default. |
| Other fields | Include only writable, approved business fields | Required-only scope applies when the user selected it. Other builds may require optional fields; preserve their exact values and types. |

Requiredness, lookup membership and uniqueness are different constraints. Historical/partial GET data cannot prove current name absence. Case, whitespace normalization, service duplicate matching and other uniqueness constraints remain unverified. BusinessRelationship is a supplier classification, distinct from third-party payment relationship child operations.

### Display values versus code fields

Earlier approved display-field creates/readbacks passed. A later benchmark attempt on 2026-09-30 submitted `Spend Authorized` and `Corporation` and received HTTP 400 / Oracle `25072` at `/BusinessRelationship`; its receipt reports no confirmed create. The cause is not established as configuration drift, execution-surface difference or another request difference.

The local repair candidate mapped to `BusinessRelationshipCode=SPEND_AUTHORIZED` and `TaxOrganizationTypeCode=CORPORATION` while preserving labels for review. Its record's `acceptedCanonicalValues` name does not establish successful service acceptance: no successful POST/persisted GET for that corrected mapping is retained. Keep both the earlier success and later failure, and reconcile the current saved BO before another authorized create. Do not submit both display and code fields or substitute one for another without a reviewed operation contract.

### Candidate request JSON

Historical three-field display shape, for review only; current reuse requires the lookup reconciliation above:

```json
{
  "Supplier": "<unique approved name>",
  "BusinessRelationship": "<validated current relationship>",
  "TaxOrganizationType": "<validated current type>"
}
```

Extend the writable allowlist only for the approved build's fields; retain SupplierType when required. Omit confirmed generated IDs, read-only/audit fields and unapproved legal, tax, bank or contact data. Build each value's provenance from retained data, resolved references or approved distinctive test values under the [POST preparation policy](README.md#post-test-data-preparation-policy).

For a templated request, validate the exact template and rendered JSON with intended types before dispatch. Request-example authoring and live response capture are separate purposes: follow the registry's `examplePurpose: "response"`, `exampleMode: "fetchResponse"` and `readyToFetch: true` contract when using the applicable bundled CLI live sample route. These flags grant no write authority; do not change business data to bypass a purpose mismatch.

### Persistence and correction lessons

Use `Upsert-Mode: false` for the reviewed first-create test and perform the authorized unique-name precheck. Freeze the exact payload/attempt identity before execution. After success or an uncertain response, reconcile by returned internal ID or unique name before deciding whether another write is safe. Never replay accepted or uncertain creates for documentation or another receipt; deletion/rollback support is not established.

Independently compare every approved field with the persisted item GET, including fields accidentally omitted from the submitted request. Capture generated IDs, defaults and normalization. In the retained SupplierType failure, a CLI placeholder classifier rejected a valid lookup value; dropping the field caused a separate business-intent defect. The repaired classifier, explicitly authorized single-field PATCH and fresh POST/readbacks proved the correction. That history does not authorize automatic PATCH or another create in a future build. Repair the supported contract or seek help while preserving intended fields.

## Evidence and limits

Historical target scope: eqih-dev21 / API 11.13.18.05 unless the linked receipt states otherwise. Evidence is retained once below; run-specific IDs and artifact versions remain in those receipts. Direct source API, saved BO, workflow and native app evidence establish different boundaries.

| Evidence | Established lesson / boundary |
| --- | --- |
| API learning review (archived evidence E0080), GET verification (archived evidence E0081), list (archived evidence E0082), detail (archived evidence E0083) | Source-API collection, exact/contains, paging and scalar identity. A 25-row page had continuation; local/source checks did not prove remote BO deployment or all children. |
| Original POST/readback (archived evidence E0084) | Generated identifiers omitted and returned; schema/example discrepancy remains scoped to numbering behavior. |
| SupplierType correction (archived evidence E0085) | Valid lookup false positive and independent missing-field coverage; PATCH/readback and fresh POST/readback preserved type/code. Earlier omission receipts did not cover that requirement. |
| Number-as-ID native repair (archived evidence E0086) | Same-conversation query -> supplier detail -> child path used the verified internal key; unknown/ambiguous numbers withheld. No general standalone number-filter proof. |
| Native supplier acceptance (archived evidence E0087), direct A readiness (archived evidence E0088), native B independent GET (archived evidence E0089) | Later generated-ID and exact-field persistence corroboration. Direct A and native B proof remain distinct; no exported native B POST trace is claimed. |
| 2026-09-28 direct saved-BO POST input (archived evidence E0090), POST result (archived evidence E0091), GET input (archived evidence E0092), GET result (archived evidence E0093) | Exact three display fields persisted and three omitted IDs generated. Direct saved-BO A proof only; no native-app, B or concurrent-lock acceptance. |
| Supplier query-header repair (archived evidence E0094) | Same contains input began returning known rows after saved header4; exact, paging and detail checks passed. Other resource/number routes require separate proof. |
| Later POST rejection (archived evidence E0095), local code-field candidate (archived evidence E0096) | Earlier display success is historical; corrected code mapping has no retained successful POST/readback. No retry authorized by these receipts. |

Revalidate on documentation/API release, schema, numbering, lookup configuration, target, authentication/permission, saved BO function/template/header or consumer-binding changes. Unproven boundaries include special-character/case filtering, current duplicate semantics, corrected code-field creates, deletion/rollback, standalone number lookup and universal concurrency protection. Supplier proof never substitutes for a child resource's own contract and acceptance.
## First successful BO GET sample

Captured once from `XDX_SUPPLIER_INFORMATION.ListSuppliers`; evidence run recorded 2026-09-16 19:20:11 -05:00. Source: the retained first response example in Retained first response example (archived evidence E0097). This sample is immutable; later supplier GETs do not replace it.

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


## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-10-14 | Authorized eqil-dev21 direct BO POST/GET and separate native app POST/readback | Verified direct omitted ID/number/party ID generation; corroborated native generated number1502 and four-field persistence with UI/saved-graph evidence. Two distinct approved transactions, no replay. |
| 2026-10-12 | Existing Supplier reference and retained source receipts | Consolidate parent lessons for reuse; replace repeated narratives with evidence matrix, preserve unresolved lookup mapping and immutable first GET. No live calls. |
| 2026-10-12 | Reconciled benchmark evidence (archived evidence E0098) | Promote the retained 2026-09-30 display-value POST rejection; distinguish the code-field candidate from accepted behavior, qualify historical payload guidance, and preserve the immutable first GET. No live calls. |
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

### Current-target compound filter verification (2026-10-14)

Saved XDX_SUPPLIERS on eqil-dev21/framework4 resolved `SupplierNumber='1255'` to Dell Inc./SupplierId300000047414679. A semicolon followed by a grouped predicate returned400/29140; replacing that separator with `and` succeeded: `SupplierNumber='1255' and (InactiveDate is null or InactiveDate > '2026-10-14')`. Build deterministic compound queries with the verified AND form and retain parentheses around OR. Status is returned but is not in the operation's documented q attributes. This proves syntax and a known null-date match, not future-date or boundary-date eligibility. Derive runtime date from documented context, never this evidence date. Evidence: `docs/builds/xdx-supplier-workspace-20261014/native-read-extension.json` and `active-filter-failure.json`. First GET sample remains unchanged. Grammar source: https://docs.oracle.com/en/middleware/developer-tools/adf/12.2.1.4/develop/consuming-adf-restful-web-services.html
