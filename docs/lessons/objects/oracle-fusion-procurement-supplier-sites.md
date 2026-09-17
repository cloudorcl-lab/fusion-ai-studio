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
| Last evidence review | 2026-09-17 |

Sources: [GET supplier sites](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-sites-get.html), [POST supplier site](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-sites-post.html), and [Oracle 26C OpenAPI](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/openapi.json).

## GET operation

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

## First successful BO GET sample

Captured once from `XDX_SUPPLIER_INFORMATION.ListSupplierSites` at `2026-09-16T20:15:38.4574151-05:00`. [Complete retained JSON](../../builds/xdx-supplier-information/live-details/ListSupplierSites-baseline.json) contains 24 items and every returned site property. This bounded excerpt copies selected fields from the exact first item and preserves the original envelope values; remaining fields and 23 items are omitted. Later site GETs do not replace this sample.

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

### Candidate request JSON

Start from the smallest schema-aligned review shape and add only approved requirements:

```json
{
  "SupplierSite": "<unique approved site code>",
  "ProcurementBUId": 0
}
```

Replace `0` with a current, authorized business-unit ID resolved in the target environment. Confirm whether an existing supplier address, site purpose or pay/procurement configuration is conditionally required. Do not mix code and display-name variants without current metadata. Do not copy vendor-example carrier, payment terms, tolerance, currency, hold or communication values.

Verify a successful write by returned `SupplierSiteId` and parent-scoped GET. Compare server defaults separately from submitted values. No site POST has been executed.

## Evidence and limits

- [Core live summary](../../builds/xdx-supplier-information/live-details/summary.json) records baseline, ID filter, offset paging and empty-result checks.
- [Text-filter summary](../../builds/xdx-supplier-information/live-details/text-filter-summary.json) records a site-name equality check.
- The verified baseline contained 24 terminal rows for one authorized supplier. This is not a universal cardinality.
- Partial text, special-character and case behavior remain unverified.
- Revalidate on API release, OpenAPI, procurement-business-unit configuration, supplier-address state, lookup, permission or local BO definition changes.

## Change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-09-17 | First retained `ListSupplierSites` BO response | Added immutable first-success GET excerpt and link to complete JSON; later GET evidence does not refresh it. |
| 2026-09-17 | Parent-scoped live GET receipts and Oracle 26C GET/POST documentation | Established Supplier Sites as the owner for GET filtering/paging, response JSON, minimal create-request design and environment-specific site references. |
