# Oracle Fusion Standard Lookups LOV

Read-only resource /fscmRestApi/resources/11.13.18.05/standardLookupsLOV. Documentation26C, operation getall_standardLookupsLOV. Source: https://docs.oracle.com/en/cloud/saas/applications-common/26c/farca/openapi.json . Full retained specification: docs/builds/xdx-supplier-workspace-20261014/common26c-openapi.json.

## GET contract

Native collection items/count/hasMore/limit/offset. Fields LookupType(string,max30), LookupCode(string,max30), Meaning(string,max80) are non-null; Description and Tag nullable. Composite identity is lookup type plus code. Do not interpret a displayed meaning as an internal key. Use bounded limit/offset and explicit REST-Framework-Version4, subject to saved-BO known-hit compatibility.

LookupTypeFinder accepts LookupType, LookupCode and ActiveDate(date). LookupTypeAllRowsFinder omits the active-date condition. Do not use all-rows membership as proof a choice is currently enabled. Keep lookup family/source identity explicit: standard, common and set-enabled are different resources. Current eqil-dev21 saved BO returned all three supplier lookup groups with the active-date finder and explicit framework4. Compatibility is scoped to this tenant/API, not universal.

## Supplier consumer

Supplier documentation names POZ_VENDOR_TYPE, ORA_POZ_BUSINESS_RELATIONSHIP and POZ_ORGANIZATION_TYPE for the three approved classification fields. Current tenant standardLookupsLOV returned all three named groups; see current readiness receipt. Reject partial, empty, ambiguous or wrong-type lookup results as validation failures, not valid edits. Preserve inherited values and user draft revision while lookup validation is pending.

## POST

No write operation is in scope. Lookup configuration must never be changed by this app.

## First successful BO GET sample

Captured once from ListSupplierClassifications on2026-10-14. Complete retained response: [first response](../../builds/xdx-supplier-workspace-20261014/classification-first-response.json). Exactly36 items, count36, hasMore=false, limit100, offset0. Bounded excerpt below is the exact first item;35 items and links omitted.

    {"LookupType":"ORA_POZ_BUSINESS_RELATIONSHIP","LookupCode":"NONE","Meaning":"None"}

Saved function identity and subsequent known-hit readiness: [receipt](../../builds/xdx-supplier-workspace-20261014/classification-readiness.json). Presence in a lookup is not proof every classification combination satisfies supplier POST business rules; service rejection remains authoritative.

## Change history

2026-10-14: source contract derived from exact public26C specification; saved BO and supplier-family evidence pending.
