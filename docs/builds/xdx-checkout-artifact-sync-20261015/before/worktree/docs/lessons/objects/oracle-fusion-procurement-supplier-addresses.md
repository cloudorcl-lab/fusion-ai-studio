# Oracle Fusion Procurement Supplier Addresses object reference

## Identity and scope

| Field | Value |
| --- | --- |
| Product | Oracle Fusion Cloud Procurement |
| Resource object | Supplier Addresses |
| REST collection | `/fscmRestApi/resources/11.13.18.05/suppliers/{SupplierId}/child/addresses` |
| Documentation release | 26C |
| Required parent key | Live-resolved `SupplierId` |
| Stable item key | `SupplierAddressId` |
| Last evidence review | 2026-10-15 |

Sources: [GET supplier addresses](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-addresses-get.html), [POST supplier address](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-addresses-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operation

Follow the [shared ADF find/search GET framework contract](README.md#adf-find-and-search-get-framework-contract) for every filtered function and its consumers. This build selects explicit header version `4`; retain any independently justified supported version. The supplier native repair does not prove this resource's other query paths.

Parent identity follows the [Suppliers GET key contract](oracle-fusion-procurement-suppliers.md#get-operations): a displayed SupplierNumber must resolve to SupplierId before this child path is constructed. Preserve the selected supplier and reject unresolved or ambiguous number references.

The collection operation ID is `getall_suppliers-addresses`. Resolve the parent supplier first and pass its business `SupplierId`; the generated local BO parameter is named `suppliers_Id`. Do not embed a sample parent ID as a default.

| Behavior | Contract |
| --- | --- |
| Parent scope | Every result must belong to the requested supplier |
| Filter | Trusted REST framework v4 rowmatch expression; default selects all child rows |
| Verified filters | Equality by `SupplierAddressId` and equality by `City` |
| Ordering | `SupplierAddressId:asc` |
| Pagination | Independent `limit`, `offset`, `count` and `hasMore` envelope |
| Empty result | Valid empty collection; an API error is not an empty result |

Raw natural language must not become the `q` filter. The caller owns field allowlisting, type checks, literal quoting and escaping.

### Response JSON

```json
{
  "items": [
    {
      "SupplierAddressId": 0,
      "AddressName": "<value>",
      "CountryCode": "<value>",
      "AddressLine1": "<value>",
      "City": "<value>",
      "State": "<value>",
      "PostalCode": "<value>"
    }
  ],
  "count": 1,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

The native item contains additional scalar fields. The shown fields document the structural contract, not a projection or reusable data record.

## First successful BO GET sample

Captured once from `XDX_SUPPLIER_INFORMATION.ListSupplierAddresses` at `2026-09-16T20:15:25.2865354-05:00`. Complete retained JSON (archived evidence E0035) contains 25 items. The excerpt below preserves the exact first item and original envelope values; 24 remaining items are omitted from this document. Later address GETs do not replace this sample.

```json
{
  "items": [
    {
      "SupplierAddressId": 300000047507644,
      "AddressName": "OD US1",
      "CountryCode": "US",
      "Country": "United States",
      "AddressLine1": "6600 N MILITARY TRL",
      "AddressLine2": null,
      "AddressLine3": null,
      "AddressLine4": null,
      "City": "BOCA RATON",
      "State": "FL",
      "PostalCode": "33496",
      "PostalCodeExtension": "2434",
      "Province": null,
      "County": "PALM BEACH",
      "Building": null,
      "FloorNumber": null,
      "PhoneticAddress": null,
      "LanguageCode": "US",
      "Language": "American English",
      "Addressee": null,
      "GlobalLocationNumber": null,
      "AdditionalAddressAttribute1": null,
      "AdditionalAddressAttribute2": null,
      "AdditionalAddressAttribute3": null,
      "AdditionalAddressAttribute4": null,
      "AdditionalAddressAttribute5": null,
      "FormattedAddress": "6600 N MILITARY TRL,BOCA RATON, FL 33496 PALM BEACH",
      "AddressPurposeOrderingFlag": true,
      "AddressPurposeRemitToFlag": true,
      "AddressPurposeRFQOrBiddingFlag": false,
      "PhoneCountryCode": null,
      "PhoneAreaCode": null,
      "PhoneNumber": null,
      "PhoneExtension": null,
      "FaxCountryCode": null,
      "FaxAreaCode": null,
      "FaxNumber": null,
      "Email": null,
      "InactiveDate": "4712-12-31",
      "Status": "ACTIVE",
      "CreationDate": "2013-11-12T15:49:20.398-06:00",
      "CreatedBy": "CALVIN.ROTH",
      "LastUpdateDate": "2018-12-04T14:14:57.692-06:00",
      "LastUpdatedBy": "CALVIN.ROTH",
      "AddressPartyNumber": "1150"
    }
  ],
  "count": 25,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

## POST operation

The create operation ID is `create_suppliers-addresses`. The 26C OpenAPI request schema has 38 properties and marks `CountryCode` and `Email` as required. The nine-field vendor example uses `Country` and omits both `CountryCode` and `Email`. Resolve this contradiction against current metadata before execution.

### Autogenerated fields

| Field | POST treatment | Evidence and scope |
| --- | --- | --- |
| `SupplierAddressId` | Omit the new address ID and capture the returned value | Historical eqih-dev21 / 11.13.18.05 omitted-field POST, 2026-09-17 (archived evidence E0036). Current eqil-dev21 / API11.13.18.05 /26C corroboration, 2026-10-15: actual saved CreateSupplierAddress native runner omitted this ID and generated `300000340604810`; independent same-parent GetSupplierAddress confirmed it. [POST](../../builds/xdx-supplier-child-create-20261015/address-bo-post-attempt.json), [GET](../../builds/xdx-supplier-child-create-20261015/address-bo-readback.json). Scope remains the tested numbering configuration. |
| `AddressPartyNumber` | Omit; retain generated response value and its type | Historical eqih omitted-field request/response above. Current eqil-dev21 / API11.13.18.05 /26C corroboration, 2026-10-15: actual saved CreateSupplierAddress native runner omitted this field and returned string `1501634`; independent same-parent GET confirmed it and all eight approved fields, including ordering `true`. Same [POST](../../builds/xdx-supplier-child-create-20261015/address-bo-post-attempt.json) and [GET](../../builds/xdx-supplier-child-create-20261015/address-bo-readback.json); revalidate across changed tenant numbering configuration. |

Current-task corroboration: on 2026-09-27, saved CreateAddress A omitted SupplierAddressId and AddressPartyNumber and generated 300000334073608/1486641 under supplier300000334073550. Native-app B generated 300000334073619/1486642 under 300000334073601. Independent parent-scoped GetAddress calls confirmed both generated values and all eight approved fields, including ordering true. A runtime comparison (archived evidence E0037) and B independent comparison (archived evidence E0038), with frozen native review (archived evidence E0039), corroborate existing omission treatment in eqih-dev21 / API 11.13.18.05. Native observations are root-recorded; retained evidence was independently reviewed. No accepted POST replay, broadened requiredness or uniqueness claim; first GET remains unchanged.

2026-09-28 restart corroboration: saved CreateAddress omitted both generated fields and returned SupplierAddressId300000334073742 / AddressPartyNumber1486643 under supplier300000334073700. Independent same-parent GetAddress matched all eight approved fields including literal orderingtrue. POST receipt (archived evidence E0040) and GET comparison (archived evidence E0041) corroborate existing omission treatment in eqih-dev21 / API11.13.18.05. No new requiredness or uniqueness claim; immutable first GET unchanged.
Native B address corroboration on 2026-09-28: exact reviewed eight-field payload under supplier300000334073731 generated SupplierAddressId300000334073749. Workflow independent GET and a separate native Query matched all eight fields; later Review retained accepted/frozen state. Native create (archived evidence E0042) and independent read/freeze proof (archived evidence E0043). AddressPartyNumber was not inspected in this B presentation; no new claim about it. Same tenant/API scope; immutable first GET unchanged.

Native direct-app corroboration, 2026-10-15 in the same eqil-dev21/API11.13.18.05 target: the exact eight-field request omitted both IDs; native Query reported accepted/verified SupplierAddressId `300000340604867`, with independent GET showing AddressPartyNumber `1501635` and all eight final fields. [Native observation](../../builds/xdx-supplier-child-create-20261015/address-native-direct-observation.json) is UI plus saved-graph evidence, not a raw POST trace or new transport-type claim. The saved-BO response above remains the string-type evidence; no accepted write was repeated.

Current eqil-dev21 native template corroboration (2026-10-15): approved required-only Address payload omitted own SupplierAddressId and AddressPartyNumber; one accepted workflow POST returned own300000340604918 and party1501636, followed by independent GET verification of all8submitted fields. Source300000047414694 remained distinct. Evidence: [native template observation](../../builds/xdx-supplier-child-create-20261015/address-native-template-observation.json). Existing autogenerated-field scope and first-success GET sample are unchanged.

### Required and unique field constraints

Additional confirmation: the 1497 address POST (archived evidence E0044) again omitted SupplierAddressId and AddressPartyNumber and received both, with persisted GET (archived evidence E0045), on 2026-09-17 in the same tenant/release. This supplements the generated-field evidence without changing the immutable first-success sample.

| Field | Requiredness | Uniqueness scope | Test-data treatment | Evidence |
| --- | --- | --- | --- | --- |
| `AddressName` | Present in the vendor example; requiredness is not established by the reviewed schema's required list | Within the selected supplier parent: `(SupplierId, AddressName)` | Generate a distinctive address name for that supplier; compare with available saved addresses under the same parent | User-confirmed uniqueness, 2026-09-17; no duplicate-name POST tested |
| At least one address-purpose flag | Conditionally required by the tenant: one of `AddressPurposeOrderingFlag`, `AddressPurposeRemitToFlag`, or `AddressPurposeRFQOrBiddingFlag` must be true | Per address | For the streamlined purchasing golden path, send only `AddressPurposeOrderingFlag: true`; omit the other purpose flags | Tenant rejection `POZ-2130428`, 2026-09-23, when all purpose flags were omitted |

Do not impose collection-wide address-name uniqueness across different suppliers. Confirm requiredness, length and normalization from the exact Oracle operation documentation before executing a create; this user confirmation establishes uniqueness scope only. Saved addresses cannot prove current absence if their capture is incomplete or stale.

### Candidate request JSON

```json
{
  "AddressName": "<unique approved test address name>",
  "CountryCode": "<validated code>",
  "AddressLine1": "<approved test address>",
  "City": "<approved city>",
  "State": "<validated subdivision>",
  "PostalCode": "<approved postal code>",
  "Email": "<controlled test destination>",
  "AddressPurposeOrderingFlag": true
}
```

Resolve country and subdivision codes from authorized evidence. Reuse a source physical address only when the user explicitly approves that basis; never copy an operational email destination. Preview the parent supplier and purposes before execution. The authorized 2026-09-17 Lee-based test supplied CountryCode and a non-deliverable Email, succeeded and passed parent-scoped GET verification. This does not resolve whether Email may be omitted. Request fields and evidence are in the POST review (archived evidence E0046).

The 2026-09-24 XDX Supplier Core native DRAFT acceptance omitted SupplierAddressId and AddressPartyNumber, returned300000333814416 and1486638 under supplier300000333814409, and independently verified all eight approved business fields including ordering=true. See native receipt (archived evidence E0047). This corroborates existing generated-field treatment in eqih-dev21 / 11.13.18.05; it does not broaden requiredness or uniqueness, and the immutable first GET sample is unchanged.

## Evidence and limits

- Core live summary (archived evidence E0048) records baseline, ID filter, offset paging and empty-result checks.
- Text-filter summary (archived evidence E0049) records a City equality check.
- The verified baseline contained 25 terminal rows for one authorized supplier. That count is evidence for one run, not a universal cardinality.
- Partial text, special-character and case behavior remain unverified.
- Revalidate on API release, OpenAPI, address validation, lookup, parent identity, permission or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-10-15 | Actual saved BO native CreateSupplierAddress and independent GetSupplierAddress, [ADDR-01 POST](../../builds/xdx-supplier-child-create-20261015/address-bo-post-attempt.json) / [GET](../../builds/xdx-supplier-child-create-20261015/address-bo-readback.json) | Corroborated omitted/generated SupplierAddressId and AddressPartyNumber in eqil-dev21 / API11.13.18.05 /26C, same parent and exact eight-field persistence. Raw saved-BO proof retained; separate [native direct-app corroboration](../../builds/xdx-supplier-child-create-20261015/address-native-direct-observation.json) verifies address300000340604867/party1501635 and eight fields through UI/saved graph, without new raw transport or broader numbering claims. Aligned the streamlined candidate with the approved eight fields (only ordering=true). Native template independently verified generated address300000340604918/party1501636 and all eight fields with distinct source identity ([observation](../../builds/xdx-supplier-child-create-20261015/address-native-template-observation.json)). Immutable first GET unchanged; no accepted create repeated. |
| 2026-09-28 | [Shared query-framework policy and supplier-only native repair](README.md#adf-find-and-search-get-framework-contract) | Link all filtered GET uses to the explicit-header and known-hit regression owner; no new supplier-addresses runtime proof or first-success sample change is claimed. |
| 2026-09-27 | Rebuild addresses608/619 with independent parent-scoped GET | Corroborated generated address/party IDs and eight-field persistence; retained parent scope and immutable first GET. |
| 2026-09-25 | Direct saved CreateAddress and independent same-parent GetAddress, address 300000333814490 | Corroborated omitted/generated SupplierAddressId and AddressPartyNumber and eight persisted fields; preserved tenant scope and immutable first GET. |
| 2026-09-25 | Supplier Core number404 repair and user-confirmed six-step manual query acceptance | Link parent-number resolution to the Suppliers GET owner; no new child API or write behavior claimed. |
| 2026-09-24 | XDX Supplier Core exact-approved native POST and independent GET | Corroborated existing generated-field treatment and required payload in the tested tenant; retained first GET sample and unresolved uniqueness limits. |
| 2026-09-23 | Live create rejection `POZ-2130428` under supplier 1504 | Established the tenant's conditional purpose requirement. The streamlined golden path now sends only `AddressPurposeOrderingFlag: true`; the rejected POST created no address. |
| 2026-09-17 | Supplier 1497 child POST/GET | Added same-tenant confirmation of generated address ID/party number and all ten submitted fields. |
| 2026-09-17 | Authorized POST request/response and parent-scoped GET under live-post | Confirmed omitted generated IDs for the tested tenant and recorded POST/schema limits; immutable first-success GET sample preserved. |
| 2026-09-17 | User confirmation | Recorded supplier-parent-scoped `AddressName` uniqueness; kept requiredness distinct and GET samples unchanged. |
| 2026-09-17 | First retained `ListSupplierAddresses` BO response | Added immutable first-success GET excerpt and link to complete JSON; later GET evidence does not refresh it. |
| 2026-09-17 | Parent-scoped live GET receipts and Oracle 26C GET/POST documentation | Established Supplier Addresses as the owner for GET filtering/paging, response JSON, create-request JSON and the unresolved `CountryCode`/`Email` vendor-example discrepancy. |
