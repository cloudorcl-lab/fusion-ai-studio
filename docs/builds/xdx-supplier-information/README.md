# XDX Supplier Information

Local artifact: `src/businessObjects/xdx_supplier_information.bo`.

| Function | Inputs | Behavior |
| --- | --- | --- |
| ListSuppliers | limit, offset | One page of suppliers visible to the signed-in user |
| FindSupplierByFullName | supplierName, limit, offset | Full-name equality comparison |
| FindSuppliersByPartialName | supplierName, limit, offset | LIKE contains comparison |
| GetSupplierDetails | suppliers_Id | Full scalar supplier profile |
| ListSupplierAddresses | suppliers_Id, filter, limit, offset | Independently paged addresses |
| ListSupplierSites | suppliers_Id, filter, limit, offset | Independently paged sites |
| ListSupplierContacts | suppliers_Id, filter, limit, offset | Independently paged contacts |

Use limit 25 and offset 0 initially. Results preserve items, count, limit, offset and hasMore. Continue at offset + count while hasMore is true. Stop with an error if hasMore is true but count is zero. SupplierId ascending provides stable ordering, although concurrent supplier changes can affect offset-based paging.

The first three functions project SupplierId, SupplierNumber, Supplier, SupplierType, BusinessRelationship and InactiveDate. Both active and inactive suppliers are included. Return all matches rather than selecting an arbitrary supplier. The four detail functions have no field projection and return the scalar fields provided by Fusion, including nulls; nested child resources are not automatically expanded.

Resolve the supplier first, then pass its SupplierId as `suppliers_Id`; there is no default supplier. Child searches are scoped to that supplier. Their `filter` is a trusted caller-authored REST framework v4 rowmatch expression, not raw natural language. The default selects all child rows. Use documented queryable fields and quote/escape literals appropriately. Live-verified examples: `City='BOCA RATON'`, `SupplierSite='OD US1'`, and `ContactName='Gasol, Jim'`. Each collection orders by its own ID and preserves its own pagination envelope. An empty collection is valid; an API error must not be treated as no matches.

## Input contract

The BO is a declarative REST template, not an input-sanitizing service. Consumers must validate nonempty name inputs, positive integer page sizes (recommended maximum 100), and nonnegative integer offsets. Parameter descriptions do not enforce those limits.

Double embedded apostrophes before passing a name: `O'Brien` becomes `O''Brien`. Do not add enclosing quotes. Percent and underscore retain LIKE wildcard semantics in partial search. Case sensitivity follows the Fusion service collation; case-insensitive or fuzzy matching is not promised. Special-character and collation behavior has not been live-tested. Use ListSuppliers for unfiltered retrieval, rather than a blank search.

Observed verification inputs: `Lee Supplies` for full-name matching and `Lee` for partial matching, derived from the live list response. They are examples only, never runtime defaults. Captured examples include the demo-environment supplier and collection link; do not reuse example IDs or host as deployment configuration.

## Verification and release boundary

Run from the repository root:

```powershell
node .agents/skills/aistudio/scripts/aistudio.js validate-bo --file src/businessObjects/xdx_supplier_information.bo
pwsh -NoProfile -File tests/test-xdx-supplier-information.ps1
pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -PolicyOnly
```

Live REST samples were fetched through the bundled CLI under CASEY.BROWN on eqih-dev21. All seven functions have source-API evidence. The extension passed 16 live cases for Office Depot: one profile and complete collections of 25 addresses, 24 sites and 13 contacts; ID and text filtering, offset paging and empty results passed. Full response data and input values are saved in [live-details](live-details/), with [core summary](live-details/summary.json) and [text-filter summary](live-details/text-filter-summary.json). This proves local function templates against that source API and identity. The BO has not been saved to a remote DRAFT or published; workflow/agent invocation has not been tested.

Reuse retained successful receipts. Only rerun live checks for an authorized changed requirement or invalidated result, using a new `-EvidenceDirectory`; never overwrite retained evidence or refresh immutable first-success examples. The bounded runner requires each collection to fit within 25 rows and fails otherwise. Its text-filter cases are retained separately. The policy-only command above does not authorize work or prove session readiness; follow the canonical Startup/Closeout session receipt gates.

Child query contracts: [addresses](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-addresses-get.html), [sites](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-sites-get.html), and [contacts](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-contacts-get.html).

Sources: [Suppliers REST API](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html), [query syntax](https://docs.oracle.com/en/cloud/saas/procurement/25b/fapra/Resource_Methods.html), and repository Business Object authoring guides.

## POST functions

CreateSupplier, CreateSupplierAddress, CreateSupplierSite and CreateSupplierContact extend the same BO. Each uses explicit field parameters; children also require suppliers_Id. Inputs have no sample defaults. See [POST verification and field contract](xdx_supplier_post_review.md) for original evidence and [SupplierType correction](xdx_supplier_type_correction.md) for the superseding fix. SupplierType is restored as a required create input; supplier 1496 was repaired and verified. Fresh POST supplier 1497 persisted SupplierType=Supplier and SupplierTypeCode=SUPPLIER; all four intended business fields passed read-back.

Run local persisted-evidence checks with: pwsh -NoProfile -File tests/test-xdx-supplier-post-evidence.ps1. Do not repeat creates to refresh receipts.

Supplier 1497 child verification: [addresses](live-post/type-fix/children-1497/ListSupplierAddresses.json), [sites](live-post/type-fix/children-1497/ListSupplierSites.json), [contacts](live-post/type-fix/children-1497/ListSupplierContacts.json). Each returned count 0 and hasMore false. Children created during the original POST cycle belong to 1496, not 1497. See the [compliance audit](xdx_compliance_audit.md) and [time tracker](time-tracker.md) for reconciled status and limits.
