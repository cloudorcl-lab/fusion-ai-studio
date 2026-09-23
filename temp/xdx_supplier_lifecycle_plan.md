# XDX Supplier Lifecycle Agent — optimized phased plan

Status: reusable implementation plan revised from the completed 2026-09-23 build.
This file describes the next clean implementation. It does not authorize new tenant
writes, publication or destructive cleanup by itself.

## Goal

Deliver a customer-ready AI Agent Studio Agentic App that queries, prepares,
approves, creates and independently confirms the required-field supplier lifecycle:

`supplier -> address -> site -> contact -> four retained transaction children`

The app must use the target AI Agent Studio surface, keep results to at most four
business columns, keep technical IDs internal, execute each accepted POST once and
confirm persistence through an independent scoped GET.

## Scope and authority

Included:

- Supplier, address, site and contact query/create/confirm golden paths.
- Business classification, contact-address association, products/services
  association and site-assignment query/create/confirm paths.
- A dedicated minimal supplier BO plus the two required reference lookup BOs.

Excluded:

- Every DFF and attachment resource.
- Payment behavior and third-party payment relationships.
- Optional create fields that the transaction does not require.
- Query-only children that do not supply, guard or verify an included transaction,
  including contact data access, contact roles, merge history, products/services
  view and spend-authorization history.
- Account provisioning, workflow publication, destructive cleanup and speculative
  test routes.

Only duplicate prevention and uncertain-result retry blocking are retained as
negative controls. Once authorized tests pass, proceed with authorized POSTs without
an additional operator pause; the app still requires final approval of the exact
payload and parent.

## Architecture

Use one app-bound root workflow with an OraMessageHint router and separate terminal
owners for `InitDisplay` and `Query`. Every Query invocation must terminate without
a reachable `HUMAN` or `WAIT` node. Multi-turn behavior uses supported app or
conversation input and self-contained parent resolution; it must not depend on a
suspended workflow continuation.

Agents interpret intent and propose structured values. Deterministic nodes own:

- allowed-field filtering and types;
- current supplier/child/reference resolution;
- state revision and approval invalidation;
- required-field-only payload construction;
- duplicate guard and write authorization;
- operation-result capture and persisted-GET comparison.

BO functions own Oracle operations. Every REST path token binds to the current
authoritative producer on every incoming route. A producer, reducer, router or BO
change invalidates the downstream binding proof.

Change necessity: the XDX BOs provide Oracle operations, while the app still needs
bounded intent handling, parent selection, required-field review, approval binding,
write ordering and visible confirmation. Add only those workflow boundaries.

TDD Route: off / skipped. The required BUILD -> DISCRETE TEST -> CUMULATIVE TEST
cycle supplies contract and regression evidence; no artificial RED phase is added.

## Lessons converted into design constraints

| Prior failure or delay | Mandatory prevention |
| --- | --- |
| Global Fusion Ask used instead of the target app | Record target AI Agent Studio artifact identity and DRAFT/published state before every runtime prompt. |
| App Query reached Human/wait | Run structural Query preflight before any remote action; every Query terminates. |
| Child BO received a blank parent and returned 404 | Execute a configured case through the actual BO node and assert its resolved path key before accepting the route. |
| Fixture replay bypassed malformed interpolation | Validate balanced bindings and reachable producers before remote execution. |
| Address POST omitted its required purpose | Address payload contract includes one approved purpose flag; purchasing golden path uses `AddressPurposeOrderingFlag=true`. |
| Email-only contact POST failed | Minimum contact identity is `FirstName`, `LastName`, `Email`; no account provisioning. |
| Category lookup value was reused as association type | Products/services association uses `CategoryType=BROWSING`. |
| Site assignment omitted bill-to BU | Submit and verify both `ClientBUId` and `BillToBUId`. |
| Persisted projection omitted a submitted field | Expand the read-only GET projection; never repeat the POST merely to verify. |
| Volatile `capture.jobId` caused repeated fixture apply rejection | Use the generated template exactly and exclude volatile capture metadata from editable/model-generated payloads. |
| Browser expired during CLI loops | Poll the same signed-in Studio tab between action groups and at least every five minutes. |
| Broad suites and planner scenarios amplified rework | One focused case per slice; one golden case per enabled route cumulatively; defer all unapproved planner scenarios. |

## Mandatory fast-fail milestone

Before building the second business route, all of these must pass:

1. Local artifact validation.
2. `node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>`.
3. Minimal DRAFT save with exact app/workflow identity recorded.
4. One live Query from the target application's Run app preview.
5. One configured test that executes the real BO node with a nonblank resolved key.
6. One correct terminal response with no internal label or boundary leakage.

An `InitDisplay` test, workflow debug, mocked normalizer result or MUST-NOT-execute
assertion cannot replace this milestone. Failure blocks route and suite expansion.

## Object payload baseline

The matching object reference is authoritative and must be reread before the slice.
The known minimum baseline is:

| Object | Required transaction baseline | Generated/optional boundary |
| --- | --- | --- |
| Supplier | Current supplier reference and tenant-required business identity from its object contract | Omit generated supplier IDs and all optional/DFF/attachment/payment fields |
| Address | Required postal fields plus one purpose; purchasing path uses `AddressPurposeOrderingFlag=true` | Omit generated address IDs and unused purpose flags |
| Site | `SupplierSite`, `ProcurementBUId`, approved address reference and purchasing purpose when required | Omit payment, invoice, transport and optional configuration |
| Contact | `FirstName`, `LastName`, `Email` | No account, role, data-access, phone or optional identity fields |
| Products/services | `ProductsServicesCategoryId`, `CategoryType=BROWSING` | Never submit lookup taxonomy `SUPPLIER` as association type |
| Site assignment | `ClientBUId`, `BillToBUId` | Omit ship-to, account, distribution, tax and optional references |

Business classifications and contact-address associations use their matching object
references and same-parent proof before POST. Every object has a duplicate query and
an independent persisted-GET projection defined before its write is enabled.

## Test model

Each phase follows the same sequence:

1. **BUILD:** implement the smallest complete route and no future scaffolding.
2. **DISCRETE TEST:** local contract, artifact validation, Query preflight and one
   configured AI Agent Studio case through the real nodes.
3. **CUMULATIVE TEST:** one golden case per enabled route plus duplicate and
   uncertain-result controls. Run once after the discrete gate passes.
4. **RUNTIME ACCEPTANCE:** use the target Run app preview when the phase changes
   user-visible behavior or reaches a live transaction boundary.
5. **RECEIPT:** record JSON-generation, Node wall, workflow and parse/review time,
   tests/assertions, tokens, AI Units, artifact versions and next action.

On failure, rerun only the affected discrete case after correction, then run the
cumulative gate once. The same failure signature twice without new evidence stops
execution for root-cause diagnosis. A broad unchanged rerun is prohibited.

Fixture rules:

- Use CLI-generated payload templates and consistency groups exactly.
- Validate one representative fixture before bulk application.
- Treat `needs-model-test-data` and `needs-judge` as continuations.
- Never copy truncated previews or invent wrapper shapes.
- Keep volatile recorder metadata out of editable/model-generated overrides.
- Use host credential-store access from the first authenticated CLI command.

## Phased delivery

### Prebuild — server review and purge — target 25–40 minutes

- Execute
  `docs/builds/xdx-supplier-lifecycle-agent/server-purge-and-bo-streamlining-plan.md`.
- Refresh exact ids, versions/ETags, DRAFT/published state and reverse consumers.
- After explicit exact-target authorization, delete in dependency order: DRAFT app,
  DRAFT workflow, dedicated lookup BOs, then the supplier BO only if it has no
  external consumer.
- Require exact-code absence proof after every deletion. Do not treat Git source as
  rollback for server deletion and do not delete Fusion business records.
- Start the retry from a clean implementation seed containing governance, object
  lessons and this prompt/plan, without the completed app/workflow/BO/test artifacts.

Exit: every authorized old server artifact is absent, every retained shared artifact
has a recorded owner, and the new worktree cannot inherit the completed build.

### P0 — Startup and contracts — target 20–30 minutes

- Pass policy, session Startup and startup-package verification.
- Create a dedicated minimal BO contract. Retain 17 supplier transaction functions
  plus the two required lookup functions; do not copy the 36-function BO.
- Confirm resource inventory, exclusions, object references, requirements,
  architecture and golden-path manifest.
- Start time tracking and same-tab keep-alive logging.

Exit: no unresolved scope, source owner, required field, authority or test mapping.

### P1 — App shell and first Query — target 30–45 minutes

- Build only the app-stage router, supplier query path and terminal response.
- Pass the mandatory fast-fail milestone in the target Run app preview.

Exit: the correct app executes one real supplier BO Query with no Human/wait path.

### P2 — Core reads — target 30–45 minutes

- Add address, site and contact reads.
- Prove selected-state and self-contained prompts bind each child BO to the resolved
  supplier ID.
- Render at most four grounded business columns and distinguish empty from error.

Exit: each actual child BO executes in one configured case; no blank/stale parent.

### P3 — Preparation and approval — target 30–45 minutes

- Add required-field collection, reference resolution, deterministic draft merge,
  revision tracking and exact no-write payload review.
- Any edit invalidates approval. Default/reference acceptance remains separate from
  final creation approval.

Exit: one configured conversation proves state continuity and exact payload review
without a POST.

### P4 — Supplier create — target 25–35 minutes

- Pass the supplier object contract, duplicate preflight, discrete and cumulative
  gates.
- Execute one authorized POST and independent persisted GET.

Exit: generated key captured; every submitted field and omission reconciled.

### P5 — Address create — target 25–35 minutes

- Use the retained purpose requirement before the first request.
- Execute one POST and parent-scoped GET.

Exit: address fields and generated keys match; no repeated POST.

### P6 — Site create — target 30–45 minutes

- Resolve the approved procurement BU and address reference.
- Execute one required-field POST and parent-scoped GET.

Exit: site, BU, address and purchasing purpose match.

### P7 — Contact create — target 25–35 minutes

- Use minimum approved identity `FirstName`, `LastName`, `Email`.
- Execute one POST and GET; verify no account was provisioned.

Exit: identity and generated key match with no unintended side effect.

### P8 — Remaining retained children — target 70–90 minutes total

Implement one complete slice at a time in dependency order:

1. Business classification.
2. Contact-address association after address and contact.
3. Products/services association with `CategoryType=BROWSING`.
4. Site assignment after site, with both BU IDs.

Each write slice passes its object contract, discrete case, lean cumulative suite,
single POST and independent GET before the next slice begins.

### P9 — Integrated acceptance and Closeout — target 30–45 minutes

- Run one target-app golden journey across supplier, address, site, contact and all
  retained children.
- Run final configured workflow and app suites once.
- Reconcile accepted writes, object lessons, dependencies and task-owned scratch.
- Pass living-build Closeout and create one scoped commit.

Exit: zero failed tests, zero required pending judges, no repeated accepted POST,
and clear DRAFT/published status.

## Pace controls

Target: no more than eight focused execution hours for the complete retained scope,
excluding login wait, tenant outage and product-service outage.

At every two-hour checkpoint record accepted slices, rework count and the next
blocking boundary. If no new slice passed, stop suite expansion and diagnose. If
rework exceeds 25% of measured execution time, stop and simplify the owner, fixture
or test boundary before continuing.

At 70–75% context usage, update the active handoff, checkpoint and time tracker,
then revalidate before continuing. A new session is optional.

## Verification and completion

Completion requires:

- Policy, current-session Startup and Closeout PASS.
- Query-contract validator and all local phase contracts PASS.
- One configured golden case per enabled route and only the two approved negative
  controls.
- Target AI Agent Studio Run app preview acceptance.
- One accepted POST per create transaction followed by independent GET.
- Required-field object references updated only for new evidence.
- Timing, tokens, AI Units, failures and unavailable metrics recorded.
- Server-purge before/after inventory and exact absence receipts recorded.
- Scoped commit on the authorized branch; push/publication only under current
  authorization.

The final report distinguishes local, fixture, configured, live DRAFT and published
evidence and states any remaining external boundary.
