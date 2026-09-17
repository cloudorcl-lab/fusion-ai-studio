# XDX Supplier Information - intake and learning register

## Current task: supplier 1497 children — 2026-09-17

Execution checkpoint: three creates and their GETs passed at 20:13:05 UTC; address 300000333813850, site 300000333813859 and contact 300000333813861. A final parent GET additionally verified SupplierType and the other intended parent fields, making eight live invocations total. No POST retry. Local preparation initially selected request-authoring mode; explicit response mode corrected the command purpose without dropping fields, before any live call. This reusable CLI lesson is recorded in the object registry; additional generated-field evidence is linked in all three child references. No new canonical lifecycle change or dependency is needed. Local `.bo` inspection also briefly used JavaScript require instead of JSON parsing; corrected locally without artifact change.

Task `01a0b0fa-7cba-7b43-aacd-d86136194d00`. User explicitly requests child creation for supplier 1497, extending the same BO/test-record work. Authorize one XDX address, site and contact under SupplierId 300000333813822, on eqih-dev21, with persisted GET verification and local receipts. Reuse the already approved Lee-based physical address, procurement BU and purpose flags; generate numeric-suffixed XDX child names and example.invalid destinations. Existing parent/child GET data, successful 1496 request shapes and retained exact Oracle 26C schemas/examples are usable; no additional Lee discovery is needed. Review all four object references and existing generated-field/uniqueness limits. No new supplier, account provisioning, remote BO deployment, deletion or push. No new app architecture/worktree, workflow sync, judge, model or AI Unit metering applies. Stop after uncertainty or failed field/relationship assertion; retain partial records and do not automatically retry POST. Required proof: all intended child fields, new IDs, correct supplier path, site-to-new-address link, contact account fields null, parent identity/SupplierType preserved; seven GET/POST invocations planned. Unchanged BO/CLI checks may be reused. Closeout: object evidence promotion, current status/handoff, timing, Startup/Closeout gate and scoped commit.

## Compliance audit intake — 2026-09-17

Current user scope: explain missed canonical activities, repair session conformance and perform outstanding authorized activities. Read the full canonical and object registry; selected all four existing Oracle 26C / API 11.13.18.05 supplier references. Policy verifier passes. Governance/evidence repair on the existing branch; no new app/worktree or model. Preserve unrelated ZIP/environment/workspace changes. Reuse successful POST and parent GET evidence; perform only the missing 1497 child GETs requested earlier. No create, PATCH, delete, remote BO save, publication or push is needed. Acceptance: requirement-by-requirement audit, reconciled current status, missing child receipts, session-specific positive/negative gate checks, timing through delivery, links and scoped local commit. Current task id and start are in time-tracker.md.

## Timing recovery checkpoint — 2026-09-17

User requested recovering all available timing and making tracking a MUST. Scope: local session metadata and retained receipt review only. Recovered 11 completed root turns, per-inference tokens, inter-turn gaps and 38 BO invocation receipts in [time-tracker.md](time-tracker.md) and its JSON ledger. No live operations repeated. Missing active-labor subdivisions, child-agent runtime, older-session intervals and AI Units are explicitly unavailable. Runtime counters and timestamp boundaries reconcile separately; receipt time is not added to turn time. Canonical timing controls and Definition of Done now require continuous capture, recovery and delivery reconciliation. Living-build positive/negative regression passes, including removal of the mandatory policy. No object-operation lesson changed; this is lifecycle guidance. Preserve unrelated changes and hand forward a scoped local commit.

## Approved scope

Historical original GET scope follows. Later POST, correction and compliance-audit entries supersede it; current status is in verification.md and ACTIVE_HANDOFF.md. Historical pending-approval or commit-pending wording below is retained as dated process evidence, not an open action.

User approved the three-function design and required intermediate build steps on 2026-09-16. This is a standalone Business Object, not a new agentic app; the new-app worktree and app/ATLAS gates do not apply. Work on the existing `TestingWFBuildTools` branch and preserve unrelated changes to `env.properties`, the supplied ZIP, and the workspace file.

- Artifact: `src/businessObjects/xdx_supplier_information.bo`, code `XDX_SUPPLIER_INFORMATION`, display name `XDX Supplier Information`.
- Source: Fusion Suppliers REST collection `/fscmRestApi/resources/11.13.18.05/suppliers`, ADF BC, family PRC, product SUPPLIER (confirmed by live BO catalog).
- Outcome: list suppliers, find by complete name, or find by contained name text.
- Approved functions: `ListSuppliers`, `FindSupplierByFullName`, `FindSuppliersByPartialName`; GET only, native Fusion authentication.
- Return supplier ID, number, name, type and business relationship, plus the native collection paging envelope. Preserve all matches rather than choosing an arbitrary supplier.
- Pagination: explicit limit and offset, default page size 25, deterministic ordering; callers continue only while `hasMore` is true.
- Empty results: an empty collection is valid. A failed request must remain an error, not an empty result.
- Search boundaries: document API matching and escaping semantics; no fuzzy-name claims. Confirm name filters from the API contract before finalizing.
- Authority: local creation and validation, authenticated metadata reads and required read-only build verification. No remote BO save, publication, supplier writes, or Git push.
- Environment: eqih-dev21; CLI identity CASEY.BROWN established in this session. No credentials belong in build records.
- Runtime examples: do not invent supplier names or supplier payloads. Required sample inputs must come from explicit user input or authorized discovery.

## Acceptance and verification plan

| Requirement | Owner / check |
| --- | --- |
| SUP-01 list | ListSuppliers GET collection; paging inputs and output envelope |
| SUP-02 full name | FindSupplierByFullName equality filter; no arbitrary first-row selection |
| SUP-03 partial name | FindSuppliersByPartialName contains filter; documented literal escaping |
| SUP-04 safe contract | Three GET-only functions, exact XDX identity, native auth, bounded projected fields |
| SUP-05 valid delivery | Bundled validate-bo, focused source contract checks, governance verifier, current handoff and time record |

No workflow, tool, app, model, replay suite, or semantic judge is introduced. No model optimization applies. The CLI owns BO serialization; use its mutation commands and inspect the resulting file. Target no unnecessary model calls or repeat live queries. Accuracy precedes speed.

## Lessons and dependency decisions

| Observation | Evidence / correction | Playbook action |
| --- | --- | --- |
| Read handoff and canonical playbook before artifact work; verifier passes | Session preflight; maintain one current handoff | Enforce existing rules |
| AI-assisted BO search returned HTTP 404 | Direct `list-supported-business-objects` succeeds; source metadata obtained without speculative API calls | App-specific environment limitation; no universal change yet |
| CLI authentication messages precede JSON on stdout | Parse the JSON envelope after the first standalone opening brace | Retain only metadata summaries, not credential logs |

Retain the canonical CLI, existing skill references, public Suppliers API documentation, this BO and its focused validation evidence. Installed seed stays an immutable delivery snapshot. No new library or service is needed. Remove task-only scratch once evidence no longer depends on it.

## Sources

- https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html
- `.agents/skills/aistudio/references/prompts/business-object-builder.md`
- `.agents/skills/aistudio/references/prompts/business-object-cli-compat.md`
- `docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md`

## Checkpoint

### Active POST extension — 2026-09-17

User clarification after approval-review rejection: inspect local object JSON first; when unusable, live reads are authorized; the remaining live create/verification scope stays the same. Cross-reference exact documentation before testing. For own-resource IDs omitted by the POST example, test derivation as a provisional assumption; record successful evidence, or stop and ask for help after failure. Local inspection confirms retained Lee data contains only projected supplier fields; full profile and all three retained child collections belong to Office Depot. Therefore Lee profile/child reads are needed, while the saved Lee ID/name/type/relationship can be reused. No adequate retained GET is being refreshed. Four exact Oracle 26C schemas/examples were already retrieved and parsed; final field-by-field payload comparison remains required.

User approved four POST functions and the full live test cycle, using Lee Supplies (or Lee Suppliers) as the basis and XDX-prefixed supplier, address, site and contact names. This supersedes the historical GET-only authority below for this extension. Extend the existing BO on TestingWFBuildTools; retain all seven GET definitions and immutable first-success samples. Local authoring and live source-API creates/read-back checks are authorized. No remote BO save, publication, account provisioning or Git push is needed for this scope.

Reviewed canonical playbook and registry; selected Oracle 26C Suppliers, Supplier Addresses, Supplier Sites and Supplier Contacts references under docs/lessons/objects/. Living-build verifier passed. Current CLI identity CASEY.BROWN on eqih-dev21 verified through host credential store. Initial sandbox credential failure was resolved by the documented unsandboxed retry.

Design: CreateSupplier, CreateSupplierAddress, CreateSupplierSite, CreateSupplierContact in the existing BO. Each owns one POST request and native response. Child functions require an explicit parent SupplierId. Supplier and address precede site creation; contacts use the new supplier. Omit confirmed generated SupplierNumber/SupplierPartyId; classify other fields against exact documentation. Use distinct XDX names; retained data only establishes known collisions, not current absence. Reuse retained Lee values where available; fetch missing Lee details only when needed for the newly authorized live test. Exclude legal identifiers and operational email/telephone destinations; do not provision contact user accounts.

Acceptance: all eleven functions validate; original seven GET definitions unchanged; four successful POST responses with generated keys; parent-scoped read-back confirms submitted fields and relationships; GET regression exercises lookup, paging, filtering and empty responses; negative cases must avoid creating unwanted records. Persist requests/responses, timing and assertions. No automatic POST retry after uncertainty: reconcile by unique name first. A partial success is retained and reported, never silently rolled back or recreated.

Learning register: capture schema discrepancies, generated fields and normalization in the four existing object references; keep run-specific data under live-post. Closeout requires focused local/live evidence, governance checks, current handoff/time record and a scoped commit. No new app, workflow, model, judge or ATLAS suite is introduced.

Local BO authoring and source-API verification complete, including the approved detail extension below. Current evidence and delivery boundaries are recorded in verification.md.

## Closeout review

- Artifact created through `do-create-bo`, `do-create-bo-function-from-operation` and documented BO mutation commands; all three functions retain the GET collection operation and native authentication.
- Three source-API sample reads succeeded. List returned one row with hasMore true; exact `Lee Supplies` and partial `Lee` each returned the same supplier, count 1, hasMore false.
- `validate-bo` reports ok true, errorCount 0. Focused local source/response contract passes.
- The example selector is one-based: exampleIndex 1 targets the first example; exampleDescription selects an existing example, while description sets the new text. Two selector errors occurred before any request; corrected through returned CLI errors without modifying framework code.
- Captured example query is an object after CLI normalization. A local assertion initially assumed a serialized string; corrected without repeating the successful list request.
- Query version 4 is pinned. Apostrophe quoting, LIKE wildcard semantics and caller-enforced input bounds are documented. No claim of exhaustive live special-character, case-collation, or multi-page coverage.
- No new runtime dependency, obsolete source path, or remote state was introduced. Keep the CLI and seed unchanged; only task-owned temporary JSON arguments require cleanup.
- Evidence review produced no reusable playbook change: existing source-evidence, no-fabricated-example, focused-repair and lifecycle-boundary rules cover the observations. CLI-specific details stay in this build record.
- Local implementation and scoped checks are complete; final governance/diff checks and scoped commit are recorded in verification.md. No remote deployment claimed.

## Requested ListSuppliers live retest
User explicitly requested a fresh live ListSuppliers test and visible results. Scope: one default page (limit 25, offset 0), GET only, verify returned count, unique IDs and paging fields. Use a temporary BO copy to preserve the delivery artifact. Save the returned page and measured elapsed time; no remote BO save or supplier mutation. Existing playbook source-evidence and focused-test rules apply.

## Requested Office Depot full-name test
User requested live FindSupplierByFullName for Office Depot and all non-null returned fields. Scope: exact-name GET, limit 25, offset 0; preserve artifact through temporary copy; check every returned name and paging completeness. Existing source-evidence rules apply; no broader field projection or deployment requested.

## Approved supplier detail extension (2026-09-17 UTC)
Extend the existing BO with GetSupplierDetails, ListSupplierAddresses, ListSupplierSites and ListSupplierContacts. Preserve the original three functions. User approved each part being tested against live Fusion with saved response evidence. Scope is local authoring and GET-only API tests for Office Depot, whose ID was obtained by the explicitly requested live name lookup. Child lists accept SupplierId, a documented REST rowmatch filter with an all-records default, limit and offset; each preserves its own paging envelope. Parent identity is mandatory and never defaults to a sample ID. Detail returns scalar supplier profile fields without automatic child expansion. Empty collections remain valid; errors remain errors. Acceptance SUP-06 through SUP-09: each new function validates and returns the correct parent-scoped shape; child filtering, paging and empty results are verified. No remote BO save, publication, writes or new dependencies. Reuse existing source-evidence, focused-test and hand-forward rules; capture CLI-specific corrections here.

Extension closeout: SUP-06 through SUP-09 passed with 16 live GET checks, including child ID and text equality filters, offset paging and empty collections. Office Depot returned 25 addresses, 24 sites and 13 contacts, each terminal. CLI-authored source uses canonical `suppliers_Id`, mandatory with no default. Original three function definitions are unchanged. Seven-function validation, focused contract and both governance verifiers pass. Saved data is intentional verification evidence requested by the user; task-only temporary BO and argument files were cleaned. No new dependencies or remote state. Evidence review produced no reusable playbook change; existing source-contract, scoped-test and release-boundary rules remain sufficient. A one-off PowerShell text-test parsing typo was corrected before any API request.

## Cross-domain learning promotion (2026-09-17)
User requested all lessons be recorded for future sessions and APIs. The documentation-only intake, evidence classifications, retrieval diagnosis, write-test design and closeout are in [api-learning-review.md](api-learning-review.md). The initial placement in the living playbook Gate 2 is historical and is superseded by the approved object-learning ownership restructure below. No runtime changes or live retests are required.

## Approved object-learning ownership restructure (2026-09-17)

The user approved moving operation-level GET, POST, request JSON, response JSON, filter, paging and schema lessons out of the canonical lifecycle playbook. The new ownership model is one reference document per REST resource object under `docs/lessons/objects/`, with `docs/lessons/objects/README.md` as the required intake registry. Suppliers, supplier addresses, supplier sites and supplier contacts each require their own reference. The canonical playbook and root `AGENTS.md` retain lifecycle routing, authority and evidence gates and require future builds to review and update only the relevant object references.

Scope is documentation and governance only: add the registry and four object references; retire the detailed operation guidance from the canonical playbook; update repository entrypoint, verifier, evidence register, handoff and time record. Preserve tenant-specific values and raw responses in this build record. Do not modify the BO, run live APIs, save or publish remote artifacts, change the installed startup seed or ZIP, push Git state, or touch unrelated `env.properties` and workspace changes. Verification requires the living-build contract, object-registry link and ownership checks, Markdown link/code-fence checks, whitespace review and a scoped diff.

## Approved first-success GET sample policy (2026-09-17)

Use only previously retained BO GET evidence; do not execute another GET. Add a first-success sample section to Suppliers, Supplier Addresses, Supplier Sites and Supplier Contacts. For each distinct BO GET operation, retain the earliest successful response once. Later successful GETs must not append, replace or refresh the object sample. Large or capture-restricted responses may use an exact bounded excerpt plus a link to the complete authorized evidence. Update repository routing and verification so future builds enforce this capture-once rule. No runtime, BO, remote, installed-seed, ZIP, environment or push change is authorized.

## POST extension closeout — 2026-09-17

### Reopened SupplierType correction

Final correction checkpoint: user explicitly approved the additional XDX numeric-suffixed create. New supplier 1497 / 300000333813822 passed POST and GET with all four intended business fields, SupplierType=Supplier and SupplierTypeCode=SUPPLIER. Original 1496 is also repaired. The earlier pending-approval checkpoint below is superseded. Seven GET definitions are unchanged; three child POST contracts/examples are unchanged except serializer-generated parameter-row IDs. CLI regression, corrected BO contract, type-intent/live evidence, historical child evidence and BO validation pass. No further live operations are required; commit scoped repair and canonical guidance after final governance/link/diff checks.

Checkpoint: shared classifier repair passed a failing-then-passing regression; other ten BO functions are unchanged. Original supplier was repaired and read back with Supplier/SUPPLIER. A new supplier POST was rejected by automatic approval review as an additional persistent record lacking explicit approval; question pending. Scope is not silently reduced: local POST contract and existing-record repair are verified, new POST replay remains unverified. Temporary repair setup required parameter-description completion, duplicate-header avoidance and a brace correction, all before any live mutation. Documentation links/fences, CLI syntax, BO validation, intended-field tests and living-build verifier pass. Source-backed-field preservation guidance is integrated in canonical Gate 0 and the object registry.

User required fixing and retesting the dropped SupplierType and preventing recurrence. Source Lee GET already contains SupplierType=Supplier and SupplierTypeCode=SUPPLIER. Previous submitted-field-only tests were insufficient: they passed after the expected field was removed. Scope: repair the shipped CLI's cross-parameter placeholder false positive, retain explicit-placeholder rejection, restore SupplierType to CreateSupplier, PATCH only the task-created supplier 300000333813790 to repair its type, perform one new XDX supplier POST with the restored field, verify both by GET, and add intended-field assertions. No child changes, publication, push or deletion. CLI regression reproduced the exact false positive before repair and passes after removing parameter-name equality as placeholder evidence. All seven original GET functions remain unchanged.

Four creates and 19 GET regression checks passed; 23 submitted fields match persisted records. Full evidence, request/schema/example cross-reference, generated-field confirmations, CLI preflight failures and limits are in xdx_supplier_post_review.md. Original GET definitions and immutable samples preserved. Final functions use explicit typed field tokens in valid JSON templates, superseding the initial whole-JSON requestBody proposal. SupplierType omitted after CLI rejected real label/code; null result disclosed. No ID omission failed in Fusion. No speculative retry or cleanup write performed. Reusable local-first/ID-hypothesis guidance was refined in the object registry; canonical playbook links it and records terse communication default. Scoped final checks and commit complete hand-forward.

Current audit task identity: 01a0b0b0-2efa-7502-8fdf-427f5bdc8e95.

## Compliance audit closeout

Current task 01a0b0b0-2efa-7502-8fdf-427f5bdc8e95: eight obligation groups reconciled in xdx_compliance_audit.md. Missing 1497 child GETs completed (three terminal empty collections); stale status and overwrite guidance retired; Site/Contact unknown uniqueness scopes recorded from retained schema. Session gate, policy regression, link/fence checks and child JSON assertions pass. No artifact-runtime change or repeated POST. Timing and token cutoff are in xdx_compliance_verification.json. Remaining work after the delivery checkpoint is the scoped governance commit/final response; no required feature or live action remains.

1497 child closeout: independent retained-evidence test PASS; all 20 fields, generated keys, site-address relationship, null account fields and final parent preservation verified. Source BO/CLI unchanged; local link/fence and immutable-sample comparisons PASS. Shared operation lesson and generated-field evidence integrated; no new reusable lifecycle change. Retain guarded execution runner, requests/responses/attempt markers and focused test for audit; task preparation scratch removed. Eight-group disposition is in the current session receipt; no required live work remains.

## Supplier app planning intake

Task 01a0b110-d7b6-7580-acd7-13938dd0c04b: user requests plan first and an effective build prompt for supplier/child query, create, complete persisted display, PDF and email. Planning documents only in the existing evidence directory; no app/workflow artifact, remote read/write or email send. Reuse full canonical and four object-reference review from this session; hashes bind unchanged sources. Inspect current app-ingestion, template/communication and startup-worktree guidance. Recommended app target XDX Supplier Workspace; actual build needs approved scope and a new governed worktree/fresh run. Plan must cover pagination, full authorized data, input completeness, explicit create/send review, partial writes, PDF and email capability proof, output verification and scoped acceptance. PDF generation/download and summary-email sending are dependencies to prove, not implementation claims. User confirmed email body summary only; no attachment. All current artifact runtime suites are not applicable to planning; verify document links, coverage and session gate.

Planning closeout: proposed design and reusable build prompt cover all five requested outcomes. Email summary only is confirmed; platform/persona and remaining intake assumptions await review. No implementation or live operations performed. Existing rules cover the identified risks; no new reusable canonical or object-reference change was warranted. Plan/prompt links and fences checked; current session Closeout gate required before delivery.
