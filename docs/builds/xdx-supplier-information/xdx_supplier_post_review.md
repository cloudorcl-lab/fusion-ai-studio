# Supplier POST extension — verification receipt

**SupplierType acceptance correction:** the original cycle omitted a known valid business field and therefore did not satisfy full business intent. The [SupplierType correction](xdx_supplier_type_correction.md) supersedes the historical limitation below: the CLI and BO are fixed, supplier 1496 is repaired and verified, and fresh POST supplier 1497 passed intended-field and persisted-type checks. Historical receipts below remain unchanged.

Four POST functions added to XDX_SUPPLIER_INFORMATION and executed successfully on eqih-dev21 as CASEY.BROWN, 2026-09-17. All seven original GET definitions and immutable object GET samples are preserved. This proves source API execution through local BO definitions; remote BO DRAFT/PUBLISHED deployment and workflow execution were not requested or tested.

## Created records

| Resource | Name | Generated ID |
| --- | --- | --- |
| Supplier | XDX Lee Supplies 0917133857 | 300000333813790; number 1496; party 300000333813791 |
| Address | XDX Lee US1 0917133857 | 300000333813797; party number 1486630 |
| Site | XDX Lee US1 0917133857 | 300000333813806 |
| Contact | FirstName XDX Ryan; LastName XDX Lee 0917133857 | 300000333813808; person profile 300000333813808 |

The site references the new address ID. All children were posted and retrieved under the new supplier. Records remain in the live system; no cleanup/deletion or duplicate create was performed. Contact UserName and UserAccountStatus are null.

## Data and documentation cross-reference

Local JSON was inspected first. Retained Lee data contained only projected supplier fields; full profile and child samples were Office Depot data. Following explicit user clarification, only missing Lee profile/address/site/contact evidence was retrieved. Address and site discovery pages each contained 25 rows with hasMore true; one matched address/site pair was sufficient, so full source collection completeness is not claimed. Contact discovery returned 18 rows, terminal.

Exact Oracle 26C request schemas, descriptions and semantic Example Request Body were retrieved with normal TLS validation and parsed separately: [supplier](live-post/supplier-documentation.json), [address](live-post/address-documentation.json), [site](live-post/site-documentation.json), [contact](live-post/contact-documentation.json). The [field-by-field provenance](live-post/field-provenance.json) records all 23 submitted fields, source values, generated values, foreign references, schema types/limits, requiredness, vendor-example coverage and intentional differences.

| Difference | Tested treatment and evidence |
| --- | --- |
| SupplierNumber and SupplierPartyId required by schema but absent from vendor example | Omitted per user confirmation; generated successfully. SupplierId also omitted and generated. |
| Resource IDs present in source GET but absent from create example | Initially treated as provisional Fusion-derived IDs. Address ID/party number, site ID and contact ID/person profile were omitted, then confirmed by successful responses. Parent SupplierId and ProcurementBUId were retained references. |
| Address CountryCode and Email absent from vendor example but schema-required | Both supplied. Physical fields copied from explicitly approved Lee basis; Email replaced with non-deliverable example.invalid test destination. Omission not tested. |
| Site address relationship | New address name replaces old Lee address name; Fusion returned the new address ID. ProcurementBUId copied from the selected Lee site. |
| Contact InactiveDate schema-required but absent from vendor example | Omitted; create and GET returned null. This is observed tenant behavior, not a universal schema correction. |
| SupplierType | CLI falsely classified actual Lee label Supplier and code SUPPLIER as illustrative. Optional field omitted; Fusion returned null. Type cloning is not implemented by this minimal function. |
| Legal identifiers, operational destinations and audit fields | Not copied. No tax/D-U-N-S/bank data, source contact email/phone or user-account provisioning. |

XDX names include a run suffix; the exact supplier name returned zero matches before creation. Parent-scoped child names are new under this newly created supplier. Source discovery was partial and is not claimed as a global uniqueness proof.

## BO contract and invocation

CreateSupplier, CreateSupplierAddress, CreateSupplierSite and CreateSupplierContact use explicit field tokens, native authentication, JSON Content-Type, REST-Framework-Version 4 and Upsert-Mode false. Children require suppliers_Id. No parameter has a tenant/sample default. Each function exposes its bounded tested field set; optional fields outside that template require a deliberate BO extension. Caller validation remains necessary for lengths, business values, uniqueness and JSON escaping.

Templates must be valid JSON before substitution: quote placeholders even for numeric/boolean parameters, and preserve their typed parameter metadata. Live POST/read-back proved this form accepts procurement BU numbers and boolean flags. Whole-JSON requestBody tokens were rejected by CLI illustrative-value validation; unquoted boolean placeholders were rejected as invalid template JSON. Both were local preflight errors, not Fusion ID-generation failures. Failed attempts are retained with descriptive filenames. The first error receipt lacks its error text because of the original capture helper; the observed error was: Sample input values look illustrative for requestBody.

Concrete request examples are in the BO. Complete successful responses are retained externally in live-post/create-*.json. An optional attempt to insert the full captured response into a BO example was also rejected as placeholder-like; no illustrative flag or false response was substituted. The BO validator passes with its concrete request examples.

## Verification

- Four successful creates; 23 submitted fields matched both POST responses and persisted GETs.
- Nineteen live GET regression checks passed: 13 core profile/child ID-filter/paging/empty cases, three supplier list/full/partial lookups and three child text filters.
- Original seven GET definitions unchanged by structural JSON comparison; original sample sections unchanged.
- BO validator: zero issues. Local GET/POST contract and saved POST evidence assertions pass.
- Living-build verifier and positive/negative governance regression pass. Changed Markdown code fences/local links and scoped whitespace checks pass.
- No negative POST was issued; empty-result GET paths are covered. No exhaustive tenant configuration, duplicate-write, transport-timeout, special-character or alternative business-type coverage is claimed.

Runnable local checks: tests/test-xdx-supplier-information.ps1 and tests/test-xdx-supplier-post-evidence.ps1. Live GET runner: tests/test-xdx-supplier-details-live.ps1 with SupplierId 300000333813790, SupplierName matching the table, and a new EvidenceDirectory. Never rerun creates just to refresh documentation or overwrite retained receipts.

## Learning and delivery

Object references own generated-field confirmations and scoped schema discrepancies. Registry owns local-first reuse and provisional-ID tests. Canonical playbook owns lifecycle routing and terse communication default. No new dependencies, remote save, publication, Git push or changes to unrelated environment/ZIP/workspace files. Initial approval-review rejection was resolved by explicit user clarification; all live operations above were subsequently approved.
