# Oracle Fusion Procurement Supplier Contacts object reference

## Identity and scope

| Field | Value |
| --- | --- |
| Product | Oracle Fusion Cloud Procurement |
| Resource object | Supplier Contacts |
| REST collection | `/fscmRestApi/resources/11.13.18.05/suppliers/{SupplierId}/child/contacts` |
| Documentation release | 26C |
| Required parent key | Live-resolved `SupplierId` |
| Stable item key | `SupplierContactId` |
| Last evidence review | 2026-09-17 |

Sources: [GET supplier contacts](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-contacts-get.html), [POST supplier contact](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-contacts-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operation

The collection operation ID is `getall_suppliers-contacts`. Resolve the parent supplier first. The generated local parameter `suppliers_Id` carries its business `SupplierId` and has no default.

| Behavior | Contract |
| --- | --- |
| Parent scope | Every result must belong to the requested supplier |
| Filter | Trusted REST framework v4 rowmatch expression |
| Verified filters | Equality by `SupplierContactId` and equality by `ContactName` |
| Ordering | `SupplierContactId:asc` |
| Pagination | Independent `limit`, `offset`, `count` and `hasMore` envelope |
| Empty result | Valid empty collection; an API error is not an empty result |

Contact responses can contain personal data. Retain only the fields and evidence authorized by the build's capture policy.

### Response JSON

```json
{
  "items": [
    {
      "SupplierContactId": 0,
      "ContactName": "<value>",
      "FirstName": "<value>",
      "LastName": "<value>",
      "Email": "<value>",
      "InactiveDate": null
    }
  ],
  "count": 1,
  "hasMore": false,
  "limit": 25,
  "offset": 0
}
```

The displayed values are placeholders. Do not reuse operational contact data from evidence as test input.

## POST operation

The create operation ID is `create_suppliers-contacts`. The 26C OpenAPI request schema has 24 properties and marks `Email` and `InactiveDate` as required. The seven-field vendor example contains `Salutation`, `FirstName`, `LastName`, `AdministrativeContactFlag`, `MobileCountryCode`, `MobileAreaCode` and `MobileNumber`, while omitting both schema-required fields. Resolve whether `InactiveDate` must be explicitly null and confirm current email requirements before execution.

### Candidate request JSON

```json
{
  "FirstName": "<approved test value>",
  "LastName": "<unique approved test value>",
  "Email": "<controlled test destination>",
  "InactiveDate": null,
  "AdministrativeContactFlag": false
}
```

Use a controlled test identity and notification destination. Do not copy an operational person's name, email or telephone number. Preview whether contact creation triggers notifications or downstream access. Verify a successful write by returned `SupplierContactId` and parent-scoped GET. No contact POST has been executed.

## Evidence and limits

- [Core live summary](../../builds/xdx-supplier-information/live-details/summary.json) records baseline, ID filter, offset paging and empty-result checks.
- [Text-filter summary](../../builds/xdx-supplier-information/live-details/text-filter-summary.json) records a contact-name equality check.
- The verified baseline contained 13 terminal rows for one authorized supplier. This is not a universal cardinality.
- Partial text, special-character and case behavior remain unverified.
- Revalidate on API release, OpenAPI, contact/notification policy, lookup, permission, masking policy or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-09-17 | Parent-scoped live GET receipts and Oracle 26C GET/POST documentation | Established Supplier Contacts as the owner for GET filtering/paging, response JSON, create-request JSON, personal-data handling and the unresolved `Email`/`InactiveDate` vendor-example discrepancy. |
