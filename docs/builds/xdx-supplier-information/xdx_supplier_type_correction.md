# SupplierType correction

## Result

Existing XDX supplier 1496 (SupplierId 300000333813790) was repaired with a single-field PATCH. Its subsequent GET returns SupplierType **Supplier** and SupplierTypeCode **SUPPLIER**, matching retained Lee Supplies evidence. Name, number, party ID, tax organization and business relationship are unchanged.

CreateSupplier again requires SupplierType and its concrete request example includes the source value. The bundled CLI false-positive validator is repaired. After explicit approval for one additional XDX numeric-suffixed supplier, the fresh POST and read-back passed: **XDX Lee Supplies 20260917152534**, supplier number **1497**, SupplierId **300000333813822**, SupplierType **Supplier**, SupplierTypeCode **SUPPLIER**. The new record remains live. No new children were needed for this focused correction.

## Root cause and repair

The shipped CLI placeholder classifier compared every value against every function parameter name after normalization. SupplierType=Supplier and SupplierTypeCode=SUPPLIER matched the unrelated Supplier parameter. Both fetch-input validation and example-payload validation used this faulty rule.

Removed parameter-name equality as placeholder evidence at the shared classifier; removed its unused helpers. Explicit placeholder markers remain rejected. No illustrative flag, fabricated input, credential workaround or API bypass was used. This is a focused repair to the shipped CLI bundle; rerun the regression when replacing/upgrading that bundle.

The earlier implementation error was separate: dropping SupplierType reduced business intent to satisfy a tool. Submitted-field comparisons then passed because they did not assert expected omitted fields. The new contract independently requires Supplier, SupplierType, TaxOrganizationType and BusinessRelationship. Canonical Gate 0 now prohibits silent omission and requires repair or escalation; the object registry requires intended-field reconciliation.

## Documentation and provenance

- Source values: [retained Lee GET](live-post/lee-profile.json), reused without refreshing it.
- POST contract: [retained Oracle 26C request schema/example](live-post/supplier-documentation.json). SupplierType is a writable string with maximum length 80 and is present in the vendor create example.
- PATCH cross-reference: [captured field schema and request example](live-post/type-fix/patch-documentation.json), retrieved from Oracle's exact 26C update-supplier page with normal certificate validation. Only SupplierType was patched; no IDs or other fields were changed.
- [Before](live-post/type-fix/original-before.json), [PATCH](live-post/type-fix/original-patch.json), [after GET](live-post/type-fix/original-after.json), [summary](live-post/type-fix/repair-summary.json).
- [Restored create contract](live-post/type-fix/restored-create-request.json), [actual new POST request](live-post/type-fix/create-request.json), [POST response](live-post/type-fix/new-create.json), [persisted GET](live-post/type-fix/new-after.json), and [new summary](live-post/type-fix/new-summary.json). Original omission receipts remain immutable.

## Verification

- tests/test-bo-real-lookup-values.cjs: reproduced the precise false-positive error before repair; passes after repair. Covers actual fetch guard, supported CLI example mutation with real values, explicit-placeholder rejection and no mutation on rejection.
- tests/test-xdx-supplier-information.ps1: passes with SupplierType required in the independent expected POST input set.
- tests/test-xdx-supplier-type-evidence.ps1: passes intended-field checks, live PATCH/read-back equality, unrelated-field preservation and the fresh POST/GET against all four intended business fields and derived type code.
- CLI syntax and BO validation pass. Original seven GET definitions are unchanged. Child POST behavior and examples are unchanged; the CLI renumbered generated parameter-row IDs after the new SupplierType parameter.
- Previous four-create/19-GET receipts remain historical evidence. They did not prove SupplierType preservation and must not be used as complete acceptance for that requirement.

Scope: local BO and CLI repair plus source-API PATCH/GET and fresh POST/GET proof. No remote BO deployment, workflow execution, new child writes, deletion or Git push.

The automatic review initially rejected an extra create; the user's explicit XDX numeric-suffix approval resolved it. An initial local input-preparation attempt misparsed a paraphrase mentioning "supplier" as a supplied name; using the user's exact reply preserved both provenance and correct parsed inputs. This stopped before POST; there was one successful new create, with no retry after mutation.
