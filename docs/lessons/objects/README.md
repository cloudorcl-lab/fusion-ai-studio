# Object learning registry

This registry routes AI Studio builders and QA owners to evidence-backed guidance for the exact REST resource objects used by a build. It is a reference index, not a second lifecycle playbook. The canonical lifecycle remains [AI Studio Agent App Living Build Playbook](../AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md).

## Required use

During build intake:

1. Inventory every REST or Business Object resource used by the proposed build, including child resources.
2. Read each matching object reference before architecture, payload design, artifact mutation or live testing.
3. Record the selected references, documented release and any required current-product revalidation in the active intake and learning register.
4. If no matching reference exists, create one from current specification and direct evidence before relying on undocumented behavior.

At closeout, update the matching object reference with reusable, verified operation behavior. Keep tenant IDs, credentials, customer data, raw request and response bodies, and run-specific timing in the build evidence. Promote only lifecycle or architecture rules that apply across resource objects to the canonical playbook.

An object reference does not authorize a live read, write, remote artifact save, publication or cleanup. The active build authority contract controls those actions.

## Documentation evidence

Use the exact operation page and version-matched specification for the selected release. For browser-free retrieval, require a successful HTTPS status, expected final URL and content type, bounded timeout and normal certificate validation; never send application credentials to a public documentation host. A failure in one hosted or local retrieval tool does not prove the page is unavailable.

Locate the semantic Example Request Body section, HTML-decode its code block and parse that block as JSON. Do not assume the first JSON block is the request example or that the section uses a particular heading element. Compare the example with the request schema and field descriptions, record contradictions in the object reference, and treat all vendor values as structural examples. Preserve source URL, release and retrieval date in the build evidence.

## References

| Product and resource object | Methods covered | Reference | Evidence status |
| --- | --- | --- | --- |
| Oracle Fusion Procurement Suppliers | GET, POST, request and response JSON | [Suppliers](oracle-fusion-procurement-suppliers.md) | GET live verified; POST documentation parsed, not executed |
| Oracle Fusion Procurement Supplier Addresses | GET, POST, request and response JSON | [Supplier addresses](oracle-fusion-procurement-supplier-addresses.md) | GET live verified; POST documentation parsed, not executed |
| Oracle Fusion Procurement Supplier Sites | GET, POST, request and response JSON | [Supplier sites](oracle-fusion-procurement-supplier-sites.md) | GET live verified; POST documentation parsed, not executed |
| Oracle Fusion Procurement Supplier Contacts | GET, POST, request and response JSON | [Supplier contacts](oracle-fusion-procurement-supplier-contacts.md) | GET live verified; POST documentation parsed, not executed |

## Reference contract

Each object reference must state:

- Product, resource path, API version and documentation release.
- Supported operation IDs and methods.
- Stable parent and item keys.
- GET filters, projection, ordering, pagination and response JSON contract.
- POST or other write schemas, required and conditional fields, generated fields, references and request JSON contract.
- Vendor-example differences and unresolved schema contradictions.
- Directly verified behavior, evidence links and untested boundaries.
- Revalidation triggers and last evidence date.
- Change history tied to direct evidence.

One file owns one resource object. Parent and child resources receive separate references when their paths, keys, paging or write contracts differ.
