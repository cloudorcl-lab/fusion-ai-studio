# Build Intake and Learning Register

## Build contract

| Field | Value |
| --- | --- |
| Build ID | xdx-supplier-core-20260925 |
| Worktree | /mnt/c/Users/dasu/Documents/GitHub/fusion-ai-studio-1/.worktrees/xdx-supplier-core-20260925 |
| Branch | codex/xdx-supplier-core-20260925 @ bda27ea |
| MVP outcome | Native DRAFT query/create for supplier, address, site and contact resources only. |
| Included requirement IDs | SUP-READ, SUP-CREATE, ADR-READ, ADR-CREATE, SITE-READ, SITE-CREATE, CON-READ, CON-CREATE |
| Deferred milestones | Publish/push; model sweep unless required by Gate 9; all excluded supplier resources. |
| Remote mutation authority | DRAFT saves and two serialized fixture chains authorized; maximum two accepted creates per resource/eight total; native POST requires in-app exact payload/revision approval. |
| Test authority | Approved golden-path manifest and required ATLAS union only. |

## Learning register

| Build / date | Lifecycle stage / slice | Observation | Explicit guidance | Assumption / deviation | Evidence | Root cause | Correction | Cost | Reusable lesson / classification | Playbook action | Dependency action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| xdx-supplier-core-20260925 / 2026-09-25 | P0 | Linux shell has no `pwsh`; Windows PowerShell host is present. | Run current session verifier. | None. | `time-tracker.md` | Host tool layout. | Use `powershell.exe` for verifier; do not treat policy gate as passed until receipt succeeds. | pending | App-specific execution environment | no change pending evidence | retain host invocation boundary |

## Detailed intake fields

### Business contract

- App name and code: XDX Supplier Core App 20260925 / XDX_SUPPLIER_CORE_APP_20260925.
- Intended user and authenticated test identity: reobserve before tenant action; prior preparation observed CASEY.BROWN.
- Business decision or task supported: bounded supplier lifecycle query and approved single-record creation.
- Exact golden-path prompt or trigger: the six prompts in `golden-path-test-manifest.md`.
- Required final output fields, widgets, and cardinality: selected supplier number-to-ID mapping; list/detail or honest empty/error; review and native result for approved create.
- Allowed calculations, transformations, rankings, and tie-breaks: deterministic key mapping, field-only draft merge, revision-bound approval; no ranking.
- Missing-data and fallback behavior: deterministic honest empty/error; no inferred parent or ID.
- Advisory, write, approval, and human-review boundaries: no update/delete/batch/email/account provisioning; exact native payload/revision approval gates POST.
- Approved audience vocabulary: supplier, address, site, contact, business unit.
- Prohibited claims and actions: all exclusions in `plan.md`.
- Measurable correctness, latency, token, and AI Unit targets: correctness/completeness before elapsed time; tokens and AI Units unavailable unless CLI reports them.

### Data and source contract

- Source name and type: dated BO for four supplier resources; preserved BO `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` GET-only lookup.
- Owning system and authority: Oracle Fusion Procurement 26C/API 11.13.18.05; active eqih-dev21 configuration.
- Stable keys: SupplierId/SupplierNumber; SupplierAddressId; SupplierSiteId; SupplierContactId; ProcurementBUId.
- Required fields, units, rows, and relationships: frozen per selected references before each resource operation; child operations retain verified supplier parent; site also retains address/BU.
- Owning tool or connector: new dated BO; preserved BU BO without modification.
- Owning specialist workflow or agent: one app-bound dated workflow; coordinator owns integration.
- Allowed use and prohibited inference: BO reads and authorized single creates only; no guessed keys/payloads.
- Missing-data behavior: no write; return empty/error and retain state.
- Connectivity, indexing, or access evidence: pending current identity preflight.
- Expected runtime response shape: collection envelopes preserve items/count/hasMore/limit/offset; creates return generated item keys.
- Runnable local contract test: query-contract verifier plus resource-specific deterministic tests to be added before implementation.
- Masking policy: no secrets; no operational email/legal values in artifacts or logs.
- DRAFT/PUBLISHED or environment boundary: DRAFT only; no publication.

### Architecture contract

- Project layout or explicitly selected app package: legacy `src` layout; no `app-pkg` present.
- App code and panel IDs: XDX_SUPPLIER_CORE_APP_20260925; panel identifiers pending app schema creation.
- Required app stages: InitDisplay and Query; InvokeAction only if exposed controls require it.
- User-intent or trigger taxonomy: supplier/address/site/contact read and create; exact review/approve/create/edit/cancel commands.
- Route table: pending architecture self-review.
- Specialist dependencies by route: dated BO resource function; site BU GET only.
- Sequential dependencies: parent supplier; site address and BU; all writes serialized per fixture chain.
- Parallel dependencies and convergence: contract research/local workflow design only; one BO writer and one workflow writer.
- Parent-child input envelopes: one state envelope with selection, draft, revision, approval and attempt guards.
- Parent-child output envelopes and normalization: deterministic normalized collection/item/create result envelope.
- Terminal output owner per route: one valid dedicated terminal per route, pending review.
- Widget or structured-output contract: native rendered list/detail/review/result, pending schema.
- Error/fallback ownership: deterministic guard terminal.
- Provisional model per model-backed node: bounded extraction only; model changes deferred to Gate 9.

### Runtime and authority contract

- Configured host alias, without secrets: eqih-dev21; verify current configuration before remote action.
- Expected authenticated identity: reobserve.
- Existing artifact codes to reconcile: new exact dated BO/workflow/app codes; preserved BU provider only.
- Remote DRAFT writes authorized: yes, user launch; serially.
- Live reads authorized: yes, scoped resources and BU lookup.
- Live writes authorized: yes, A and B fixture chains with the stated limits.
- Prepared or synthetic branch data authorized: only approved test data; values must be frozen in operation ledger before POST.
- Publication authority by artifact: none.
- External side-effect authority: no email/account provisioning; no business updates/deletes.
- Stop conditions and approver: uncertain write, collision, unapproved payload, stale approval, wrong identity/environment; user is approver for scope changes.

### Test contract

- Globally descriptive test name: resource/operation golden scenario IDs in current manifest.
- Durable scenario ID: all eight BO/GP IDs plus exact manual prompts.
- Purpose and expected path: ordinary reads separately from create confirmation; A direct proof and B native proof.
- Data-capture policy: mask operational contact values; retain only approved fixture evidence.
- Representative live baseline: current first app Query before child expansion.
- Compatible replay scenarios: local negative guards only; never replay accepted POST.
- Deterministic assertions: binding, state, parent, approval, typed template and interpolation checks.
- Semantic expected outcome and atomic rubric: current terminal route only; preserve required judge.
- Boundary size budget and consistency groups: current source tests only; no unrelated ATLAS expansion.
- Target time, tokens, and AI Units: record observed values; no invented figures.
- Required HTML report and final-summary evidence: final configured workflow/app report after test authoring is current.

### Learning contract

- Active learning-register location: this file.
- Build steward: coordinator.
- Review checkpoints: BO readiness each resource; first supplier app query; representative native supplier creation; final closeout.
- Closeout reviewer: independent QA reviewer.
- Playbook sections likely to change: none unless current evidence identifies a reusable gap.
- Dependency-cleanup scope: dated BO/workflow/app/tests/records only; preserve existing BOs and records.
- Change-log evidence required: explicit no-change or evidence-backed canonical update.
