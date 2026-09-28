# Requirement Slice Register

Task: xdx-supplier-core-restart-20260928. Definitions are independent of test inventory; current acceptance belongs only to evidence-manifest.json.

| ID | Resource/operation | Outcome | Slice/owner | Dependencies | Evidence required |
| --- | --- | --- | --- | --- | --- |
| R1 | supplier query | List/search exact and contains, displayed-number resolution, scalar detail and complete paging | supplier/root | Saved supplier BO | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R2 | supplier create | Prepare/edit/review/exact approval, duplicate preflight, one B POST, independent GET and no replay | supplier/root | Saved supplier BO | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R3 | address query | Parent-scoped list/filter/detail/paging with verified supplier key | address/root | Supplier and matching child BO | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R4 | address create | Same-parent eight-field address, field edit/approval and direct A/native B GET verification | address/root | Supplier and matching child BO | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R5 | site query | Parent-scoped site list/filter/detail/paging and relationship display | site/root | Supplier, address, BU BOs | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R6 | site create | Current BU lookup, same-parent address, typed four-field exact approval and A/B persistence | site/root | Supplier, address, BU BOs | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R7 | contact query | Parent-scoped contact list/filter/detail/paging; minimal personal data | contact/root | Supplier and matching child BO | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |
| R8 | contact create | Three-field contact edit/approval and A/B persistence without accounts | contact/root | Supplier and matching child BO | Local actual bindings; saved BO; configured judged route; native settled widget; persisted GET for creates |

Every create requires field-only follow-up, exact revision/payload, stale-approval rejection, duplicate prevention, accepted/uncertain no-replay and honest failure state. Ordinary queries are separate from create verification.
