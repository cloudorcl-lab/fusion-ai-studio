# XDX Supplier Information

Local artifact: `src/businessObjects/xdx_supplier_information.bo`.

| Function | Inputs | Behavior |
| --- | --- | --- |
| ListSuppliers | limit, offset | One page of suppliers visible to the signed-in user |
| FindSupplierByFullName | supplierName, limit, offset | Full-name equality comparison |
| FindSuppliersByPartialName | supplierName, limit, offset | LIKE contains comparison |

Use limit 25 and offset 0 initially. Results preserve items, count, limit, offset and hasMore. Continue at offset + count while hasMore is true. Stop with an error if hasMore is true but count is zero. SupplierId ascending provides stable ordering, although concurrent supplier changes can affect offset-based paging.

Fields: SupplierId, SupplierNumber, Supplier, SupplierType, BusinessRelationship and InactiveDate. Both active and inactive suppliers are included. Return all matches rather than selecting an arbitrary supplier.

## Input contract

The BO is a declarative REST template, not an input-sanitizing service. Consumers must validate nonempty name inputs, positive integer page sizes (recommended maximum 100), and nonnegative integer offsets. Parameter descriptions do not enforce those limits.

Double embedded apostrophes before passing a name: `O'Brien` becomes `O''Brien`. Do not add enclosing quotes. Percent and underscore retain LIKE wildcard semantics in partial search. Case sensitivity follows the Fusion service collation; case-insensitive or fuzzy matching is not promised. Special-character and collation behavior has not been live-tested. Use ListSuppliers for unfiltered retrieval, rather than a blank search.

Observed verification inputs: `Lee Supplies` for full-name matching and `Lee` for partial matching, derived from the live list response. They are examples only, never runtime defaults. Captured examples include the demo-environment supplier and collection link; do not reuse example IDs or host as deployment configuration.

## Verification and release boundary

Run from the repository root:

```powershell
node .agents/skills/aistudio/scripts/aistudio.js validate-bo --file src/businessObjects/xdx_supplier_information.bo
pwsh -NoProfile -File tests/test-xdx-supplier-information.ps1
pwsh -NoProfile -File scripts/verify-living-build-contract.ps1
```

Live REST samples were fetched through the bundled CLI under CASEY.BROWN on eqih-dev21. All three functions returned the expected supplier and paging envelopes. This proves local function templates against that source API and identity. The BO has not been saved to a remote DRAFT or published; workflow/agent invocation has not been tested.

Sources: [Suppliers REST API](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html), [query syntax](https://docs.oracle.com/en/cloud/saas/procurement/25b/fapra/Resource_Methods.html), and repository Business Object authoring guides.
