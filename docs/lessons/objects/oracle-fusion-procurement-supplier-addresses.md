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
| Last evidence review | 2026-09-17 |

Sources: [GET supplier addresses](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-addresses-get.html), [POST supplier address](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-addresses-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operation

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

Captured once from `XDX_SUPPLIER_INFORMATION.ListSupplierAddresses` at `2026-09-16T20:15:25.2865354-05:00`. [Complete retained JSON](../../builds/xdx-supplier-information/live-details/ListSupplierAddresses-baseline.json) contains 25 items. The excerpt below preserves the exact first item and original envelope values; 24 remaining items are omitted from this document. Later address GETs do not replace this sample.

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
  "AddressPurposeOrderingFlag": true,
  "AddressPurposeRemitToFlag": false,
  "AddressPurposeRFQOrBiddingFlag": false
}
```

Resolve country and subdivision codes from the target environment. Do not copy an operational address or email destination from a GET response. Preview the parent supplier, purposes and notification effect before execution. Verify the created address by returned `SupplierAddressId` and parent-scoped GET. No address POST has been executed.

## Evidence and limits

- [Core live summary](../../builds/xdx-supplier-information/live-details/summary.json) records baseline, ID filter, offset paging and empty-result checks.
- [Text-filter summary](../../builds/xdx-supplier-information/live-details/text-filter-summary.json) records a City equality check.
- The verified baseline contained 25 terminal rows for one authorized supplier. That count is evidence for one run, not a universal cardinality.
- Partial text, special-character and case behavior remain unverified.
- Revalidate on API release, OpenAPI, address validation, lookup, parent identity, permission or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-09-17 | First retained `ListSupplierAddresses` BO response | Added immutable first-success GET excerpt and link to complete JSON; later GET evidence does not refresh it. |
| 2026-09-17 | Parent-scoped live GET receipts and Oracle 26C GET/POST documentation | Established Supplier Addresses as the owner for GET filtering/paging, response JSON, create-request JSON and the unresolved `CountryCode`/`Email` vendor-example discrepancy. |
