# XDX Supplier Lifecycle Agent — phased build plan

Status: implementation plan prepared; runtime acceptance has not begun. Planning task: `xdx-supplier-lifecycle-plan-20260920`.

## Goal and authority

Deliver Ask Oracle → query → prepare create → validate → explicit approval → create → independently confirm persisted results for suppliers and their child objects. Oracle AI Agents own the conversation. No Visual Builder, cloned record submission, or native custom form lifecycle is part of this design.

The user authorized this plan, a separate new worktree, and reuse/modification of existing server BOs whose names/codes start with XDX and contain Supplier. Implement in `.worktrees/xdx-supplier-lifecycle-agent`, branch `codex/xdx-supplier-lifecycle-agent`, from the committed base, never from the abandoned attempt. The base remains available. No GitHub push is requested. Verify the target checkout, reread applicable governance and pass current-task Startup before artifact implementation; a new session is optional.

The canonical [living playbook](../../lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md) owns lifecycle policy. This document owns only this build's scope, phases and acceptance. [Execution prompt](xdx_supplier_lifecycle_build_prompt.md) drives it; [requirement register](requirement-slice-register.md) and [golden-path manifest](golden-path-test-manifest.md) map evidence.

## Architecture recommendation

Use one root conversational workflow, `XDX_SUPPLIER_LIFECYCLE_AGENT`, with tool-grounded agent extraction, deterministic validation/state updates, top-level Human Chat collection and approval, and guarded BO calls. Expose it through the real Ask Oracle entry point in Phase 1. Prove that deployment/entry configuration rather than assuming a workflow debug chat is Ask Oracle acceptance. Add an Agent Studio app wrapper only if the supported Ask Oracle contract requires one; then complete every required app stage and its tests. Do not add a standalone web UI or Visual Builder.

Keep parent/child conversational pauses in the root workflow. First implement small complete query, prepare, review and execution slices within this owner. Split into specialists only when a distinct contract justifies the dependency and its DRAFT/PUBLISHED execution boundary is proven. Agents can choose read tools and propose structured field patches; they cannot bypass the deterministic approval gate or invoke POST tools directly. Use BO_FUNCTION nodes for guarded writes.

Technology: installed `.agents/skills/aistudio`, supported bundled CLI, native workflow variables, CODE/SET_FIELDS, AGENT or structured LLM extraction, root HUMAN CHAT, SWITCH, BO_FUNCTION and native Ask Oracle. Accuracy precedes speed; record actual model/version per model node, no speculative model sweeps.

Change necessity: existing BOs provide backend functions, but do not provide conversation state, reference-value review, approval binding, write ordering or user-visible confirmation. Implement only those missing workflow boundaries. The BO remains the source-operation owner; the root state reducer owns drafts; the write gate owns side effects; each route has one terminal response owner. Do not restore failed implementation artifacts.

TDD Route: off / skipped for strict test-first ordering; authority is the user's build → discrete test → cumulative test cycle. Meaningful contract, regression, conversation and browser checks remain mandatory. Planning documents receive structural checks, not artificial unit tests.

## Server reuse baseline

Live metadata discovery on 2026-09-20 authenticated as CASEY.BROWN using the active base configuration. Recommendation search returned HTTP404; supported catalog lookup succeeded. The XDX catalog page had `hasMore=false`. [Inventory](xdx_bo_inventory.json) contains two matching objects:

| Existing BO | Observed functions | Planned consumer |
| --- | --- | --- |
| `XDX_SUPPLIER_INFORMATION` | 8 GET; 4 POST; 12 total | Supplier query/detail, address/site/contact query and create |
| `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` | 1 GET | Site BU reference resolution; never infer write permission from lookup visibility |

Immutable fetched definitions are under `server-baseline/`. They are evidence, not a second deployable owner. Current baseline ETags are respectively 2 and 1; recheck before a future save, never embed these as defaults. Metadata discovery is not function execution proof. No supplier data GET/POST or remote artifact mutation occurred during planning.

Phase 0 compares fetched definitions with `src/businessObjects/xdx_supplier_information.bo`; adopt a reviewed canonical local copy and add the BU BO under `src/businessObjects/xdx_supplier_procurement_business_units.bo`. Preserve exact server codes. Inspect dependencies before modifying shared functions. Prefer compatible function additions or corrections; changing an existing consumer's contract requires an impact decision, version-safe save and regression. No duplicate BO merely to avoid examining reuse. Do not force over local or server changes. Validate only after adoption/modification; use supported save/fetch and retain before/after evidence.

Potential changes to evaluate, not predetermined defects: exact safe number/name filters; minimum projections for reference selection; safe JSON encoding; optional versus mandatory template tokens; supported item verification; field coverage for approved defaults; resource functions for additional children. Existing templates may require more inputs than the actual API; distinguish template requiredness from Oracle requiredness.

## Interaction contract

Every new query/create starts with Ask Oracle. The user can query then create, or request a create directly. Query results always appear before selection or follow-on action, using at most four relevant columns; never display the raw GET record or technical IDs by default.

| Resource | Default result columns (maximum four) |
| --- | --- |
| Supplier | Supplier number, Supplier name, Supplier type, Business relationship |
| Address | Address name, Address, Country, Status |
| Site | Site name, Procurement BU, Address name, Status |
| Contact | Contact name, Job title, Email, Status |

Use only fields returned/resolved by the source. Do not manufacture status or absent data; mark unavailable or choose a relevant grounded field. Show page boundaries and offer next page; do not call one page the complete collection. Contact email appears only when relevant and permitted. Selection uses stable internal keys bound to displayed results, not row-position guesses.

For “create an address named West Office at [user address]”, retain name/address, resolve the supplier, query suitable existing addresses, and show reference choices if ambiguous. Read the selected record's eligible business defaults; show a compact field/value/source review and ask whether to apply all eligible values or make changes. This approval prepares the draft only. User-entered fields win. Cross-supplier reuse must be explicit and foreign references must be re-resolved in the target scope. If no suitable reference exists, ask for the missing fields. Never invent them.

The same process applies to supplier, site, contact and each additional child: identify reference, propose eligible values, collect exceptions, validate, show the exact proposed business changes and parent, obtain final creation approval, submit, read back and confirm. Two-column field/value sections can show the complete intended write without violating the four-column table limit. Do not hide material defaults to make the preview shorter.

## State and ID contracts to prove

Declare one typed CONVERSATION object, `lifecycle`, with explicit JSON schema, schemaVersion, phase, revision, requestId, selectedSupplier, queryResults/selectionKeys, referenceRecord, draft (supplier and child arrays), fieldProvenance, missingFields, approvedSnapshot, operations and verification. Store typed JSON objects/arrays rather than repeatedly stringifying the whole conversation. Use JOB variables only for transient computation. Bound response storage to needed fields, operation status and identifiers; protect personal data and never store credentials.

An agent produces a schema-validated patch. CODE checks fields, types, provenance and allowed transitions, then SET_FIELDS saves the merged state. Initialize only when absent or when the user explicitly starts a new draft. Follow-up messages must not reset previous inputs. Each change advances revision and invalidates prior approval. Human approval must bind to requestId, revision, exact normalized payload and target parent. No self-approval, old approval, raw source instruction or user text masquerading as a tool result can authorize a write.

States: QUERY → SELECT → GATHER → REFERENCE_REVIEW → VALIDATE → FINAL_REVIEW → APPROVED → EXECUTING → VERIFYING → COMPLETE. REJECTED/CANCELLED end without writes; VALIDATION_ERROR returns to collection; PARTIAL and UNKNOWN reconcile before further writes. Reference review acceptance never transitions directly to execution.

Store each operation's prepared payload, approved revision, submitted/returned status, response identifiers and verification outcome before scheduling the next dependent operation. Supplier precedes children; address precedes any site referring to it; contacts require the selected supplier. Execute sequentially initially. No automatic compensation/delete. If state persistence fails after a POST, halt and reconcile through scoped GET. A conversation variable is not proven durable storage or an atomic idempotency lock. Prove pause/resume behavior; do not claim cross-session recovery, crash-proof exactly-once writes or concurrent-submit protection without evidence. If native execution cannot prevent duplicate concurrent writes, stop live enablement until a supported durable control is designed.

Before each create slice, perform the deferred object-specific research: exact release operation schema, field descriptions, vendor Example Request Body and retained evidence. Classify EVERY payload candidate as writable business field, generated own ID, resolved parent/foreign ID, unique/non-copyable field, read-only/audit, or unresolved. Capture requiredness, conditional rules, uniqueness scope and provenance. Unknown classifications block submission. Omit generated own IDs and retain returned values; resolve valid foreign IDs; never blanket-remove all IDs or clone the source record. Existing object references are scoped evidence, not universal tenant rules. Record new confirmations in those references immediately; keep first-success samples unchanged.

## Ordered phases and gates

Every phase performs BUILD → DISCRETE TEST → CUMULATIVE TEST → checkpoint. Phase 0 and the first no-write proof must pass before enabling writes. A passing backend call cannot waive the actual Ask Oracle interaction gate.

| Phase | Build and exact change boundary | Discrete acceptance | Cumulative exit |
| --- | --- | --- | --- |
| P0 — freeze/reuse | Reconcile environment, BO baseline and consumers; inventory supplier resources/children; fill intake, manifests, dependency map and field-contract research schedule | Known BO code/function/path/schema maps; safe adoption diff; no artifact or data write during discovery | Governance Startup PASS, architecture review complete; runtime/publication and exact live-test authority recorded |
| P1 — conversational spine, no writes | `src/workflows/xdx_supplier_lifecycle_agent.wf`; typed state, patch reducer, root Human collection/review, Ask Oracle binding | Multi-turn values and revision survive actual entry point, correction and approval; cancellation/stale approval produce zero writes | All P1 state/guard cases plus real Ask Oracle evidence pass; no POST enabled |
| P2 — query/select | Read routes via reused BO, safe filters/paging, child lists, deterministic four-column projection | Supplier search by name/number, visible results, disambiguation, selected parent and child scoping | P1 + query routes; errors distinct from empty results; no state reset |
| P3 — gather/inherit/review | Reference selection, writable allowlists, provenance, apply-all/change collection, complete final preview | Address name/address only leads to grounded defaults; apply-all does not approve create; user changes retained | P1–P3 across supplier/address/site/contact fixture contracts; generated IDs excluded and foreign refs validated |
| P4 — supplier create | Supplier field research, request builder and approval gate, guarded CreateSupplier, response ledger and independent detail GET | Approved exact payload only; generated supplier keys captured; every intended value compared to persisted record | Earlier paths plus supplier create/cancel/revise/duplicate guard; first authorized live supplier can become child parent |
| P5 — address create | Address contract, inherited purposes/defaults, CreateSupplierAddress and parent-scoped verification | Minimal user request → reference review → final approve → address GET matches; generated own ID omitted | P1–P5; selected supplier unchanged; prior supplier need not be recreated |
| P6 — site create | Site contract, BU lookup and address resolution, CreateSupplierSite | Approved BU/address belong to target; own ID omitted; persisted site relationships and values match | P1–P6; address-before-site dependency and all previous journeys remain passing |
| P7 — contact create | Contact contract, eligible default review, new identity/destinations, CreateSupplierContact | No source person's IDs/account/security copied; exact approved contact fields persist and display correctly | P1–P7; no blank-field UI masking or unintended account provisioning |
| P8 — remaining children | One subphase per child in the P0 inventory, in dependency order; reuse/add BO functions only after its contract is known | Each child gets query, reference-value review, exact approval, create and independent GET; one manifest row per requirement | Previously completed children plus this child pass before the next; inventory coverage reconciled |
| P9 — integrated acceptance | Final Ask Oracle journeys and partial/unknown reconciliation, evidence closeout and dependency cleanup | Supplier → address → site → contact; separate existing-parent child requests; approve/change/cancel, visible business confirmation | All enabled manifest scenarios, configured-mode suites, required judges and actual UI proofs pass; no required action remains |

P0 child inventory is exhaustive for the selected supplier REST resource, including nested children and create capability. Addresses, sites and contacts are the first confirmed core slices, not a claim that they exhaust supplier children. For each other child record endpoint, parent chain, supported operations, sensitivity/permissions, reusable BO, field research and acceptance. Unsupported/read-only children get explicit supported behavior and a disclosed gap; business scope or additional sensitive side effects need a concrete decision. Do not silently omit children or mark the entire lifecycle complete with unresolved requested coverage. P8 subphases are instantiated from that inventory before their implementation.

## Test cycle and evidence

For phase N, build the smallest contract-complete slice; prettify/validate changed artifacts; get the focused ATLAS plan; execute its next manifest-mapped action; finish model-data and judge continuations; refresh until synchronization is current. Test the affected slice first. After it passes, run one cumulative configured-mode suite over all enabled scenarios through N using file-backed evidence where compatible. New phase changes justify this regression; unchanged documentation does not. File mode may still execute model nodes. Never replay POST side effects to obtain cumulative coverage.

Cumulative means coverage of every previously accepted requirement and its interactions with the new slice, not repeated live creation. Reuse recorded BO responses and fixture operation ledgers for write paths; use scoped readbacks for the approved live baseline. Record fixtures honestly and never present them as runtime proof. Runtime conversation tests use fresh identities and supported root HUMAN/WAIT topology. UI proof is separate from CLI conversation proof.

On failure: stop phase advancement; classify requirement, workflow, contract, replay, environment, lifecycle or display defect; preserve evidence; repair the smallest owner; rerun only affected discrete tests; after passing, run the phase's cumulative regression once. Never weaken the expected business fields, stale-review protection or confirmation guard. Two unchanged reproductions with no new evidence trigger a checkpoint and isolated diagnosis, not full rebuild/replay loops.

Live POST authority is not created by this planning request. Before the first live-create test, present exact test payloads, target environment, count and controlled identities for user approval; retain approvals in the manifest. Recommended bounded baseline is one supplier, address, site and contact, reused through subsequent phases, plus one per specifically approved P8 child. No old attempt's consumed write allowance transfers. Continue all authorized fixture/local work while awaiting a required live decision. Normal end-user operation always requires its own exact-payload confirmation.

Measure elapsed time, actual model, tokens and AI Units from receipts; mark unavailable values honestly. Targets: zero required failures, zero unresolved required judges, 100% intended-field verification, 0 unapproved POSTs, at most four displayed columns and no duplicate operation in the proven execution scope. Set latency/token budgets from P1 observations before live expansion; no ungrounded performance claims.

## Files and ownership

Active build records: this plan, execution prompt, intake-and-learning-register.md, requirement-slice-register.md, golden-path-test-manifest.md, architecture-self-review.md, dependency-inventory.md, checkpoint.md, delivery-receipt.md, time-tracker.md, task session receipts and `evidence/`. Only `docs/handoffs/ACTIVE_HANDOFF.md` is the active handoff.

Runtime: root workflow at `src/workflows/xdx_supplier_lifecycle_agent.wf`; canonical reused BOs under `src/businessObjects/`; optional app/agent/tool files only after P1 proves they are required. Put meaningful state/payload contract checks in `scripts/tests/xdx-supplier-lifecycle/`; let supported CLI author ATLAS test paths. Do not create fake artifacts or tests during planning.

Compatibility: retain existing BO identities and consumers. No abandoned app code is imported. Baseline snapshots are retained read-only for diff/recovery, never automatically deployed. Rollback of a BO definition is version-checked and must preserve later edits; business records are not rolled back through deletion. Worktree owner is the executing Codex task; cleanup follows accepted integration or explicit abandonment with evidence preservation.

## Completion

Only claim build complete when the object inventory is reconciled, every included query/create/confirm journey passes in Ask Oracle, all intended fields and foreign relationships match independent persisted GET, required cumulative tests/judges pass, shared BO consumers remain compatible, and canonical Closeout/learning/cleanup gates pass. Clearly distinguish local, replay, live, DRAFT and published evidence. If deployment needs publication, use the supported UI with explicit authority; never publish workflows via CLI. Commit scoped source/evidence/governance to the new branch; do not push without user instruction.
