# XDX Supplier Core — build plan

Plan version: **1.0.0**, 2026-09-24. Model: **object-lifecycle 1.0.1** from `96ea23dec003a7061cfe1c110bd4ac56cf3b7a10`.
Build ID: `xdx-supplier-core-20260924`. Mode: new scoped rebuild.
Status: **P0–P6 complete; DRAFT accepted, supplier-number repair verified, user six-query retest PASS, and governance integrated/pushed at 345de6d.** See [run introspection](xdx_introspection_20260925.md) and [manual results](xdx_manual_testing_results.md). Later user authority allowed Git/base synchronization; publication remains excluded. Original plan scope and historical checkpoints below are preserved.

## 1. Outcome and exact scope

Deliver one native Oracle AI Studio Agentic App for ordinary query/list/detail and approved create of **suppliers, supplier addresses, supplier sites and supplier contacts only**. Preserve the earlier conversational query → prepare → field edit → review → explicit create approval → create → independent persisted GET interaction. Accuracy, completeness and elapsed time are the priorities.

**No other sub-objects.** Exclude site assignments, business classifications, products/services/categories, contact-address associations, contact roles, contact data access, spend authorization, merge history, DFF/global DFF, attachments, bank/payment/third-party-payment objects and user-account provisioning. No UPDATE/PATCH/DELETE business operations, batch creation, PDF generation, email sending, separate custom UI or extra app features. Changing an unsent draft is allowed; it is not an update of a persisted record.

Procurement BU lookup is a GET-only dependency for the site's required BU field. It has no separate user journey, CRUD flow, approval route or child-object lifecycle. Supplier/address selection uses the four in-scope resources. Do not add a missing sub-object to bypass a site prerequisite; report the specific blocker instead.

Release target: locally committed artifacts and accepted **DRAFT app** in `eqih-dev21`, verified against the active checkout's configuration before any remote action. No publish/push is requested.

## 2. Requirements and acceptance

The [requirement register](requirement-slice-register.md) is the single eight-row acceptance matrix. The [golden-path manifest](golden-path-test-manifest.md) maps tests to those rows. A create-confirmation GET does not replace an ordinary query test. Every row must have local, configured and native/persisted evidence as applicable before completion.

Query behavior: resolve the supplier before child access, distinguish list/detail, show grounded business fields and pagination, provide stable selection and honest empty/error states. No inherited four-column limit. Present all intended submitted fields in the review, and the persisted result after creation; omit raw debug envelopes from the user flow.

## 3. Object contracts and field scope

Use the canonical [object registry](../../lessons/objects/README.md); these references own API details. Release reviewed: 26C; API `11.13.18.05`. Revalidate only changed or unresolved contract/configuration facts before dependent execution.

| Resource | Operations | Parent / reference dependency | Contract |
| --- | --- | --- | --- |
| Supplier | Query/list/detail, create, persisted verification | No parent; returned SupplierId owns child scope | [Suppliers](../../lessons/objects/oracle-fusion-procurement-suppliers.md) |
| Address | Query/list/detail, create, persisted verification | Selected SupplierId; returned SupplierAddressId | [Addresses](../../lessons/objects/oracle-fusion-procurement-supplier-addresses.md) |
| Site | Query/list/detail, create, persisted verification | Selected SupplierId, same-supplier address, validated ProcurementBUId | [Sites](../../lessons/objects/oracle-fusion-procurement-supplier-sites.md) |
| Contact | Query/list/detail, create, persisted verification | Selected SupplierId; returned SupplierContactId | [Contacts](../../lessons/objects/oracle-fusion-procurement-supplier-contacts.md) |
| Site field lookup only | GET | BU identity for site creation; no BU writes | [Procurement BU LOV](../../lessons/objects/oracle-fusion-procurement-procurement-business-units-lov.md) |

Prepare minimal required business payloads from those references and approved input. Preserve tenant-confirmed supplier relationship/organization fields, address ordering purpose, site address/BU/purchasing purpose and contact identity/email requirements. Do not infer requiredness from one successful example or suppress a requested field to make a test pass. Exclude generated IDs, optional payment fields and excluded child collections from writes. Record each field's source, conditional requirement and omission reason in the build intake; do not duplicate API schemas here.

Reuse retained GET data only when suitable and authorized. Copy eligible reference defaults into a draft only after showing their source; explicit user input wins. Never copy generated IDs, foreign parent relationships or operational notification destinations. Validate uniqueness/duplicate criteria in the correct parent scope; unresolved contact/site uniqueness is a scoped risk to reconcile, not a reason to probe with duplicate POSTs.

## 4. Recommended architecture and self-review

Retain the proven architectural boundaries: one app-backed, terminating workflow using native app stages and deterministic routing/state/write guards, with bounded model extraction. Start with one BO containing only functions needed for the four resource operations plus the site BU lookup. Add no specialist or separate lookup app without an evidenced dependency reason.

- Native `InitDisplay` and `Query` terminals; implement `InvokeAction` only for controls actually exposed. No reachable HUMAN/WAIT in an app Query path.
- One deterministic state owner separates ordinary read selection from each transaction draft. Preserve field-only edits, payload revision and selected parent between supported turns; prove real runtime persistence before expansion.
- Agents propose allowlisted patches and read intents. CODE/SET_FIELDS validates types, merges drafts and invalidates approval after any material change. BO_FUNCTION performs writes only behind the deterministic gate.
- Final approval binds request identity, exact normalized payload, revision and parent. Reference-default acceptance is not write approval. Cancel/reject/stale approval submits nothing.
- Track uncertain attempts and reconcile read-only before retrying; conversation state alone is not an atomic idempotency guarantee. Never replay an accepted POST to refresh UI or timing evidence.
- Supported widget structures show selections, complete review and final persisted values. Prove rendering after loading completes, not merely matching response text.

Self-review: the four resource owners share one conversation/state contract; no excluded child route, hidden control or speculative helper is required. A real target-app Query and one complete supplier transaction are early architecture acceptance gates. Repairs stay at the failing boundary.

TDD Route: off / strict ordering skipped, preserving the user's build → discrete check → cumulative check sequence. Meaningful contract and regression tests remain mandatory.

## 5. Identity, authority and preservation

Future worktree: `C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1/.worktrees/xdx-supplier-core-20260924`.
Future branch: `codex/xdx-supplier-core-20260924`.
Create from the committed `TestingWFBuildTools` revision containing this plan; record its resolved SHA at launch. Fail on a conflicting existing path/branch rather than silently reusing it. Only the new checkout's `env.properties` supplies runtime configuration; do not expose its contents.

| Artifact | Proposed code | Local file |
| --- | --- | --- |
| App | XDX_SUPPLIER_CORE_APP_20260924 | src/apps/xdx_supplier_core_app_20260924.app |
| Workflow | XDX_SUPPLIER_CORE_20260924 | src/workflows/xdx_supplier_core_20260924.wf |
| BO | XDX_SUPPLIER_CORE_DATA_20260924 | src/businessObjects/xdx_supplier_core_data_20260924.bo |

Resolve target package layout and check exact-code availability at startup before creation. Display names start with `XDX`. A collision requires reconciliation, never overwrite.

Planning authority is this request. Prior session authorization for in-scope artifact work and business creates remains recorded; do not ask again merely because a new plan exists. This planning task does not launch that work. Once launched, each native create still requires the app's exact-payload approval and current environment/parent/duplicate checks. Publication, business deletion, unrelated mutation and broader scope are excluded.

The old DRAFT app/workflow are already deleted. Retain all existing shared/retry BOs unchanged, including the three retry codes from the [purge result](../xdx-supplier-retry-purge-20260924/evidence/xdx_purge_result.json). Consumer completeness remains unknown. Use the new exact-code BO rather than modifying retained providers. Preserve the archive branch, bundle, reports and existing Fusion records. No further purge is a build prerequisite.

## 6. Delivery slices and dependency order

| Slice | Build and focused check | Native/live exit before expansion | Regression / evidence |
| --- | --- | --- | --- |
| P0 Intake/bootstrap | New worktree, identity/authority, selected references, current session receipt and local contract readiness | No tenant mutation until Startup and applicable preflight pass | Initialize checkpoint, dependency register and build timing; keep this planning receipt separate |
| P1 Supplier query | App stages, deterministic routing, real BO GET bindings, list/detail widgets | Actual target DRAFT app Query executes the supplier BO and renders grounded results | SUP-READ accepted before broader test authoring |
| P2 Supplier transaction | Prepare, field-only edit, review, approve, guarded POST and independent GET | Exactly one accepted supplier create; complete native review and persisted result | SUP-CREATE; approval/duplicate/unknown-result invariants; current P1 regression |
| P3 Addresses | Parent-scoped reads and complete address transaction | ADR-READ separately; one accepted address POST plus independent GET and native result | ADR-CREATE; parent binding and required ordering-purpose proof; affected accepted-route regression |
| P4 Sites | Parent/address resolution, BU GET, reads and complete site transaction | SITE-READ separately; one accepted site POST plus independent GET confirming supplier/address/BU | SITE-CREATE; no assignment or payment routes; affected accepted-route regression |
| P5 Contacts | Parent-scoped reads and complete contact transaction | CON-READ separately; one accepted contact POST plus independent GET and native result | CON-CREATE; no account/role/association routes; affected accepted-route regression |
| P6 Acceptance/closeout | Reconcile all eight rows, configured tests and native evidence | No required failure, judge or unexplained coverage gap | Final scoped regression, lessons, dependency cleanup, Closeout and scoped commit |

One accepted create per resource is the initial live acceptance budget, not four repeated suites of creates. A definite failed attempt is recorded and repaired; uncertain outcomes are reconciled first. Additional creates need a specific unmet requirement and must remain within existing authority. Use one approved fixture chain where possible: supplier → address → site; contact depends only on supplier. Preserve historical test data without treating old acceptance as this build's runtime proof.

## 7. Verification strategy

Follow canonical Gate 6 for ATLAS scope reconciliation. Every scenario maps to the manifest; outside-scope suggestions do not expand this plan. Validate actual binding interpolation, nonblank REST path keys, rendered JSON types, approval invalidation, parent ownership and terminal routing locally before remote tests. Run the canonical Query preflight before the first remote save/sync/record/runtime action and after applicable changes.

Prove the first live Query and complete representative transaction before broad regression. Then complete discrete checks and affected cumulative checks for each slice; run final configured workflow/app acceptance after required authoring is current. Distinguish static, replay, native and independent persisted evidence. No standalone test exists merely to increase counts. Existing test artifacts with excluded resources are not imported into the new suite.

## 8. Timing, continuity and release

At execution launch start a separate UTC build record. Record phase/activity intervals, build/test/repair/wait categories, overlaps and gaps. Keep the Studio session alive on the canonical schedule while native acceptance is pending; record actual deadlines and inactive gaps. At 70–75% context, checkpoint the single active handoff and current task evidence; a fresh session is optional.

After required acceptance, route reusable lessons to existing owners, preserve accepted-write receipts, reconcile exact artifact versions and dependencies, run Closeout and commit scoped changes. Report the eight-row completion matrix, DRAFT state, outstanding limitations and actual timing. Do not publish, push or rebuild the generic install ZIP merely for this app-specific plan.

## 9. Remaining runtime inputs

No scope decision is open. At P0 verify current environment/authentication, exact-code availability, supported state binding, required field metadata and authorized test values. At P4 resolve a valid procurement BU and same-supplier address. Historical IDs and names are not defaults. Missing inputs block only dependent work; no excluded sub-object may be added as a workaround.



Execution acceptance2026-09-25: P0–P5 accepted; all eight native/persisted requirements complete, current configured workflow14/14 and app1/1 PASS. P6 functional acceptance verified; Closeout and scoped local delivery are tracked in the session receipt and handoff. No publication/push.
