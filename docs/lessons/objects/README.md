# Object learning registry

This registry routes AI Studio builders and QA owners to evidence-backed guidance for the exact REST resource objects used by a build. It is a reference index, not a second lifecycle playbook. The canonical lifecycle remains [AI Studio Agent App Living Build Playbook](../AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md).

## Required use

During build intake:

1. Inventory every REST or Business Object resource used by the proposed build, including child resources.
2. Read each matching object reference before architecture, payload design, artifact mutation or live testing.
3. Record the selected references, documented release and any required current-product revalidation in the active intake and learning register.
4. If no matching reference exists, create one from current specification and direct evidence before relying on undocumented behavior.

At closeout, update the matching object reference with reusable, verified operation behavior. Keep credentials and complete run receipts in the build evidence. An object reference may retain one approved first-success BO GET sample under the capture-once policy below. Promote only lifecycle or architecture rules that apply across resource objects to the canonical playbook.

An object reference does not authorize a live read, write, remote artifact save, publication or cleanup. The active build authority contract controls those actions.

## Documentation evidence

Use the exact operation page and version-matched specification for the selected release. For browser-free retrieval, require a successful HTTPS status, expected final URL and content type, bounded timeout and normal certificate validation; never send application credentials to a public documentation host. A failure in one hosted or local retrieval tool does not prove the page is unavailable.

Locate the semantic Example Request Body section, HTML-decode its code block and parse that block as JSON. Do not assume the first JSON block is the request example or that the section uses a particular heading element. Compare the example with the request schema and field descriptions, record contradictions in the object reference, and treat all vendor values as structural examples. Preserve source URL, release and retrieval date in the build evidence.

## ADF find and search GET framework contract

Every ADF Business Components find/search GET using `q` must explicitly set a supported `REST-Framework-Version` header in the saved BO function. Inventory all consumers, including ordinary exact/contains search, duplicate preflight, displayed-number resolution, parent-scoped child filtering and procurement-BU lookup; a function used for both list and search inherits the same contract. Do not rely on an unspecified server default or fix only the user-visible contains route. Record the selected version and its compatibility evidence in the matching object reference. Preserve an independently justified version such as `9`; changes require source and response-contract review, not a blanket downgrade.

Oracle's [framework-version guidance](https://docs.oracle.com/en/cloud/saas/sales/faaps/Set_the_REST_Framework_Version.html) explains that version selection controls query interpretation and can change response structure. Its version 2-and-later query behavior differs from version 1; version 9 also changes high-precision number representation and wildcard escaping. [ADF REST consumption guidance](https://docs.oracle.com/en/middleware/developer-tools/adf/12.2.1.4/develop/consuming-adf-restful-web-services.html) supplies the framework/query reference. Select the version compatible with the exact resource and required query syntax; this policy does not apply ADF behavior to non-ADF APIs.

Before accepting filtered GET behavior, locally verify the saved function header and run known-hit exact and contains checks through the actual saved BO/native function surface wherever those query modes are supported. Record exact input, saved identity/version, returned known key and paging envelope. An empty-result-only check cannot establish that a filter works. Apply equivalent known-hit field/parent/number checks to filtered lookup routes that do not offer text contains; prove their own source boundaries before integration. Preserve transport/parse/service errors as errors, never empty lists. A header change invalidates affected query proof and may require response-shape checks. Reuse already captured matching results; never repeat business POSTs or refresh immutable first-success GET samples for this rule.

Before each in-scope BO save, run `node scripts/verify-bo-search-contract.cjs <file.bo>` and retain its PASS receipt; rerun after a function, resource path or header change. This local gate checks ADF collection/find/search/list/lookup/resolve GET functions (including q filters), rejects missing/duplicate headers and version1, and permits explicit versions2–9 only as syntactic candidates. It does not prove tenant support, compatibility or returned data. The mandatory `node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>` also enforces this contract for the exact BO functions referenced by that workflow, without expanding the gate to unrelated resources. A failure blocks the respective save/execution boundary; known-hit saved-BO acceptance remains separately required.
Supplier-specific header selection and known-hit evidence are consolidated in the [Suppliers search contract](oracle-fusion-procurement-suppliers.md#search-framework-and-acceptance). Other resources require their own scoped acceptance; shared policy is not proof that their routes passed.

## POST test-data preparation policy

For every POST test, inspect available retained BO GET samples and complete linked responses first. Record whether they match the requested resource, parent and necessary fields. Reuse usable data; when required data is missing or unusable, perform only the missing live reads within the user's authorization. Never refresh adequate samples merely to prepare data or documentation. A GET response is not a create payload: cross-reference each candidate against the exact Oracle operation documentation, request schema, field descriptions and Example Request Body before testing.

Before presenting the payload:

1. Identify required and conditional fields, writable fields, types, formats, lengths and valid lookup values. Record conflicts between schema, prose and examples; do not treat examples as exhaustive.
2. Classify each ID as autogenerated, an existing parent/foreign reference, caller-supplied or unresolved. Confirm and save autogenerated-field behavior in the matching object's POST section under the policy below. Omit confirmed autogenerated IDs; preserve only valid, correctly scoped references. Do not copy all GET IDs or replace every ID indiscriminately.

   When a created resource's own ID appears in retained GET data but is absent from the documented POST example, initially hypothesize that Fusion derives it and omit it in the first authorized test. Record this as a provisional assumption, including any schema conflict, not as confirmed documentation behavior. Parent/foreign references remain independently classified and must not be omitted indiscriminately. If the create succeeds and returns the omitted ID, record the generated-field evidence and continue. If the omission test fails, preserve the request/error, reassess the hypothesis, and ask the user for help before trying a revised assumption. Never blindly retry after an uncertain result.
3. Analyze Oracle documentation for uniqueness requirements, including required fields that must also be unique. Record each field or composite key, requiredness, uniqueness scope (resource collection, parent or other documented boundary), normalization/case rules when known, evidence and unresolved constraints in the object's POST section. Requiredness and uniqueness are separate constraints.
4. Generate distinctive test values for unique business keys within documented length and format limits. Do not copy an existing GET value into a unique create field. For child objects, include the resolved parent in the uniqueness key; do not infer global uniqueness from parent-scoped uniqueness.
5. Compare candidates with available GET data in the correct scope. A partial or historical sample cannot establish current absence; label collision checks accordingly. A distinctive name is not proof of uniqueness. Any later live collision check must fit the active authorization and cannot override a no-GET instruction.
6. Record the final payload's field provenance: copied from retained GET, generated test value, resolved reference, omitted autogenerated field or unresolved input. Compare the JSON with Oracle documentation and save the mapping and intentional differences in the build evidence. Reuse only approved business data; do not invent legal identifiers or copy operational communication destinations.

7. Reconcile the intended business-field set against the final payload before execution. A known source lookup value rejected as illustrative is a tool defect to diagnose, not permission to omit the field. Schema-optional does not mean business-optional. Include explicit assertions for expected fields and values that might otherwise disappear from the submitted-field comparison. Ask for help if the tool cannot be repaired through an authorized path.

Concrete requiredness and uniqueness constraints belong in each resource's POST section: see the [Supplier field contract](oracle-fusion-procurement-suppliers.md#required-and-unique-fields) and [Supplier addresses](oracle-fusion-procurement-supplier-addresses.md). Review other objects independently. Keep the first-success GET samples unchanged.

For the bundled CLI's live POST sample execution, set `examplePurpose: "response"` explicitly in input preparation and fetch. Default POST guidance can select request-payload authoring and report `readyToFetch: false` with no missing/conflicting inputs; that is not evidence of invalid business fields. Check the returned mode and current local command help, preserve the payload, and complete preparation before mutation. For authorized live execution, require `exampleMode: "fetchResponse"` and `readyToFetch: true`; neither flag supplies write authorization. Request-example authoring remains a valid separate purpose. Never change business fields merely to bypass a purpose mismatch. This behavior was confirmed during [supplier 1497 child creation](../../builds/xdx-supplier-information/xdx_1497_children.md); revalidate when the CLI changes.

For the native BO **Fetch Sample Data** POST runner, validate both the exact unrendered `bodyTemplate` as JSON and the rendered request with its intended JSON types before dispatch. Rendered-only checks do not prove the native preflight accepts the template: an unquoted dynamic boolean token was rejected before HTTP as invalid template JSON. When the approved operation contract requires a fixed boolean value, a literal JSON boolean with no dynamic input may preserve that contract; keep the field in the reviewed business payload and reject unsupported alternatives before approval. Do not generalize a fixed value to a dynamic contract, quote/coerce a boolean to bypass validation, or drop an intended field. Otherwise repair the supported typed-template boundary before execution. This native-runner finding is scoped to the [address preflight and fixed-ordering repair](../../builds/xdx-supplier-core-20260925/bo-address-fixed-ordering-receipt.md); it does not change the CLI response-purpose rule above or authorize a POST retry.

Typed sample-template clarification (2026-09-28): authorized inspection of the bundled CLI sample renderer confirms that a **whole-string** JSON placeholder such as `"ProcurementBUId":"{ProcurementBUId}"` is structurally replaced with a number when the matching token parameter has `isToken: true` and `dataType: "integer"`. The renderer parses the raw JSON first, applies parameter types, then serializes. This is a type-preserving template contract, not permission to send a numeric field as a string. Missing integer metadata defaults to string; embedded text is not an equivalent placeholder. Validate positive safe-integer IDs before rendering. See the [source review](../../builds/xdx-supplier-core-restart-20260928/authoring/site-typed-template-source-review.json). This establishes the bundled CLI behavior only; saved native BO and workflow execution remain separate required acceptance surfaces. Do not infer deployed implementation equivalence from matching error text.

## Autogenerated-field learning policy

Every confirmation that a field is autogenerated must be recorded in the matching resource object's reference during the current task. Apply this rule whenever:

- The user confirms that the value is autogenerated.
- An authorized test confirms that the service generates the value.
- Authoritative documentation explicitly confirms that the value is autogenerated.

Add or update the field's entry under the object's POST section, normally in `Autogenerated fields`. Record the exact field name, request omission or conditional-input rule, response handling, evidence source, confirmation date, API release and applicable tenant/configuration scope. Link documentation or retained test evidence; label user confirmation as such. Each source independently triggers recording; user or documentation confirmation does not require a new test before it can be recorded.

For test evidence, establish that the field was omitted from the submitted request and generated by the service; a value appearing in a GET response alone does not prove autogeneration. An example omitting a field alone is not documentation confirmation. Preserve conflicting evidence and its scope rather than silently replacing it or asserting universal behavior.

Update the existing field entry and change history instead of creating duplicate guidance. Record newly confirmed fields and additional evidence even when the first-success GET sample is already frozen; never refresh that sample as part of this learning update. This rule applies independently to every parent and child object. It does not authorize extra API calls.

## First successful BO GET sample policy

1. After the first successful GET through a BO for a resource object, add one `First successful BO GET sample` section to that object's reference if none exists.
2. Use the exact first successful response already produced by the BO. Record function, capture time, release and durable evidence path.
3. Do not execute a GET solely to create or refresh documentation. If the first success predates the reference, use the earliest retained successful response.
4. Capture once. Later GETs must not append, replace or refresh the sample.
5. For a large or capture-restricted response, include an exact bounded excerpt and link the complete authorized JSON evidence. State every omission.
6. A changed API release or resource identity receives a new version-specific reference and its own first successful sample; it does not overwrite the earlier sample.

## References

| Product and resource object | Methods covered | Reference | Evidence status |
| --- | --- | --- | --- |
| Oracle Fusion Procurement Suppliers | GET, POST, request and response JSON | [Suppliers — reusable consolidated lessons](oracle-fusion-procurement-suppliers.md) | One parent-object owner; historical GET/POST/read-back verified, later display-value rejection retained, corrected code-field acceptance pending |
| Oracle Fusion Procurement Supplier Addresses | GET, POST, request and response JSON | [Supplier addresses](oracle-fusion-procurement-supplier-addresses.md) | GET and one authorized POST/read-back live verified; tenant-scoped limits recorded |
| Oracle Fusion Procurement Supplier Sites | GET, POST, request and response JSON | [Supplier sites](oracle-fusion-procurement-supplier-sites.md) | GET and one authorized POST/read-back live verified; tenant-scoped limits recorded |
| Oracle Fusion Procurement Supplier Contacts | GET, POST, request and response JSON | [Supplier contacts](oracle-fusion-procurement-supplier-contacts.md) | GET and one authorized POST/read-back live verified; tenant-scoped limits recorded |
| Oracle Fusion Procurement Supplier Address DFF | GET | [Supplier address DFF](oracle-fusion-procurement-supplier-address-dff.md) | 26C operation inventory; live BO execution pending |
| Oracle Fusion Procurement Supplier Attachments | GET, POST | [Supplier attachments](oracle-fusion-procurement-supplier-attachments.md) | 26C operation inventory and current BO contract; live execution pending |
| Oracle Fusion Procurement Supplier Business Classifications | GET, POST | [Supplier business classifications](oracle-fusion-procurement-supplier-business-classifications.md) | 26C operation inventory; detailed POST contract pending |
| Oracle Fusion Procurement Supplier Business Classification Attachments | GET, POST | [Business classification attachments](oracle-fusion-procurement-supplier-business-classification-attachments.md) | 26C operation inventory; detailed POST contract pending |
| Oracle Fusion Procurement Supplier Contact Addresses | GET, POST | [Supplier contact addresses](oracle-fusion-procurement-supplier-contact-addresses.md) | 26C operation inventory; detailed POST contract pending |
| Oracle Fusion Procurement Supplier Contact Data Access | GET | [Supplier contact data access](oracle-fusion-procurement-supplier-contact-data-access.md) | 26C read-only operation inventory; live BO execution pending |
| Oracle Fusion Procurement Supplier Contact DFF | GET | [Supplier contact DFF](oracle-fusion-procurement-supplier-contact-dff.md) | 26C read-only operation inventory; live BO execution pending |
| Oracle Fusion Procurement Supplier Contact Roles | GET | [Supplier contact roles](oracle-fusion-procurement-supplier-contact-roles.md) | 26C read-only operation inventory; live BO execution pending |
| Oracle Fusion Procurement Supplier DFF | GET, POST | [Supplier DFF](oracle-fusion-procurement-supplier-dff.md) | Configuration-dependent write contract; query only in current scope |
| Oracle Fusion Procurement Supplier Global DFF | GET, POST | [Supplier global DFF](oracle-fusion-procurement-supplier-global-dff.md) | Configuration-dependent write contract; query only in current scope |
| Oracle Fusion Procurement Supplier Merge History | GET | [Supplier merge history](oracle-fusion-procurement-supplier-merge-history.md) | 26C read-only operation inventory; live BO execution pending |
| Oracle Fusion Procurement Supplier Products and Services | GET, POST | [Supplier products and services](oracle-fusion-procurement-supplier-products-and-services.md) | 26C operation inventory; detailed POST contract pending |
| Oracle Fusion Procurement Supplier Products and Services View | GET | [Supplier products and services view](oracle-fusion-procurement-supplier-products-and-services-view.md) | 26C read-only view inventory; live BO execution pending |
| Oracle Fusion Procurement Supplier Site Attachments | GET, POST | [Supplier site attachments](oracle-fusion-procurement-supplier-site-attachments.md) | 26C operation inventory; detailed POST contract pending |
| Oracle Fusion Procurement Supplier Site DFF | GET, POST | [Supplier site DFF](oracle-fusion-procurement-supplier-site-dff.md) | Configuration-dependent write contract; query only in current scope |
| Oracle Fusion Procurement Supplier Site Global DFF | GET, POST | [Supplier site global DFF](oracle-fusion-procurement-supplier-site-global-dff.md) | Configuration-dependent write contract; query only in current scope |
| Oracle Fusion Procurement Supplier Site Assignments | GET, POST | [Supplier site assignments](oracle-fusion-procurement-supplier-site-assignments.md) | 26C operation inventory; detailed POST contract pending |
| Oracle Fusion Procurement Supplier Site Third-Party Payment Relationships | GET, POST | [Supplier site third-party payment relationships](oracle-fusion-procurement-supplier-site-third-party-payment-relationships.md) | Sensitive write excluded pending separate authority |
| Oracle Fusion Procurement Supplier Spend Authorization Requests | GET | [Supplier spend authorization requests](oracle-fusion-procurement-supplier-spend-authorization-requests.md) | 26C read-only operation inventory; live BO execution pending |
| Oracle Fusion Procurement Procurement Business Units LOV | GET | [Procurement business units LOV](oracle-fusion-procurement-procurement-business-units-lov.md) | Current BO contract inventoried; live execution pending |

## Reference contract

Each object reference must state:

- Product, resource path, API version and documentation release.
- Supported operation IDs and methods.
- Stable parent and item keys.
- GET filters, projection, ordering, pagination and response JSON contract.
- POST or other write schemas, required and conditional fields, generated fields, references and request JSON contract.
- Under each POST section, record confirmed autogenerated fields, omission rules, response handling, evidence source and applicable environment/configuration scope. Distinguish user confirmation from live verification; do not infer child-resource behavior from the parent.
- Vendor-example differences and unresolved schema contradictions.
- Directly verified behavior, evidence links and untested boundaries.
- One immutable first-success BO GET sample, or an explicit statement that no successful BO GET exists.
- Revalidation triggers and last evidence date.
- Change history tied to direct evidence.

One file owns one resource object. Parent and child resources receive separate references when their paths, keys, paging or write contracts differ.

## Policy change history

| Date | Evidence | Change |
| --- | --- | --- |
| 2026-10-12 | User-requested Supplier-object consolidation | Point to the single reusable Suppliers reference for supplier-specific header evidence and field constraints; retain shared policies here and child-resource owners separately. |
| 2026-09-28 | [Supplier native filter repair](../../builds/xdx-supplier-core-rebuild-20260928/supplier-filter-repair.md), retained BO header4 and user-confirmed all-find/search scope | Require explicit supported framework for every ADF q GET and known-hit saved-BO regression; version4 for this build, preserve independently justified versions. Supplier runtime proof only; first GET samples unchanged. |
| 2026-09-25 | Native address POST sample preflight rejection and exact-field fixed-ordering repair | Require unrendered native-template JSON and rendered typed-payload checks; allow a literal only for an approved invariant contract without coercion or field loss. |
| 2026-09-17 | Supplier 1497 local preparation and successful POST/GET receipts | Explicit response-example mode for live POST execution; distinguish request-authoring mode from missing business inputs. |
| 2026-09-17 | Explicit user clarification during Supplier POST extension | Require a recorded local-sample suitability check before missing-data live reads; cross-reference schema, descriptions and vendor example; test omitted own-resource IDs as provisional derivation assumptions and request help after a failed assumption test. |
