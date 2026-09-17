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
| Last evidence review | 2026-09-17 |

Sources: [GET suppliers](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html), [POST supplier](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operations

The collection operation ID is `getall_suppliers`; the item operation ID is `get_suppliers`. The verified local functions cover collection listing, exact-name filtering, contained-name filtering and scalar item detail.

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

## POST operation

The create operation ID is `create_suppliers`. The current 26C OpenAPI request schema has 78 properties and marks `Supplier`, `SupplierNumber` and `SupplierPartyId` as required. Oracle's vendor Example Request Body contains eight fields—`Supplier`, `TaxOrganizationType`, `SupplierType`, `BusinessRelationship`, `DUNSNumber`, `OneTimeSupplierFlag`, `TaxpayerCountry` and `TaxpayerId`—and omits `SupplierNumber` and `SupplierPartyId`.

This contradiction is unresolved. Before any write, confirm the target tenant's supplier-number generation behavior and whether `SupplierPartyId` is generated, conditional, or requires an intentionally selected existing party. Never copy another supplier's party ID. Treat vendor tax and D-U-N-S values as structural examples only; do not copy or fabricate legal identifiers.

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

Add `SupplierNumber` only when current tenant metadata confirms manual numbering. Add `SupplierPartyId` only when the test intentionally converts an approved existing party. Omit server-generated keys, audit fields and optional legal, tax, bank or contact data unless the test explicitly requires approved values.

Use `Upsert-Mode: false` for the first create test. Check for the unique supplier name before the write. After a response or timeout, reconcile by returned ID or unique name before retrying. Verify persisted values by GET and record any server normalization or defaults. Do not assume deletion or rollback is supported.

## Evidence and limits

- [Build verification](../../builds/xdx-supplier-information/verification.md) records live GET evidence for list, exact name, contained name and item detail.
- [List evidence](../../builds/xdx-supplier-information/live-list-suppliers.json) proved one page can have continuation; it did not prove collection completeness.
- [Detail evidence](../../builds/xdx-supplier-information/live-details/GetSupplierDetails-baseline.json) proved one scalar profile response.
- The POST page and Example Request Body were retrieved and parsed with normal certificate validation. No supplier POST was executed.
- Revalidate on API release, OpenAPI, tenant numbering, lookup configuration, authentication, permission or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-09-17 | Supplier BO live GET receipts and Oracle 26C GET/POST documentation | Established Suppliers as the owner for collection/detail GET, response JSON, create-request JSON and the unresolved `SupplierNumber`/`SupplierPartyId` requirement discrepancy. |
