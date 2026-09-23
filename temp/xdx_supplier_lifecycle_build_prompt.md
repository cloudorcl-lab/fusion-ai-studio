# Optimized execution prompt — XDX Supplier Lifecycle Agent

Use this prompt for a clean implementation or rebuild. The phased plan at
`temp/xdx_supplier_lifecycle_plan.md` owns scope and acceptance. The canonical
living-build playbook and object references remain authoritative.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first.

Execute temp/xdx_supplier_lifecycle_plan.md in the authorized XDX worktree and
branch. Verify the checkout before editing. Use only that checkout's
env.properties and never print credentials. Preserve unrelated work.

OUTCOME
Deliver an AI Agent Studio Agentic App for the required-field supplier lifecycle:
supplier -> address -> site -> contact, followed by the retained in-scope child
resources in the plan. Query results use at most four useful business columns.
Every accepted create is followed by an independent scoped GET. Keep technical
IDs internal unless needed for evidence.

SCOPE FENCE
- Implement only fields required by the transaction and confirmed object contract.
- Exclude all DFFs, attachments, payment behavior, third-party-payment
  relationships and other optional fields.
- Retain only two negative controls: duplicate prevention and uncertain-result
  retry blocking.
- Do not add speculative routes, alternate prompts, model sweeps or planner-generated
  scenarios outside the approved golden-path manifest.
- Do not use Fusion Ask, Digital Assistant or another chatbot for acceptance.
  Runtime and UI evidence must come from the target AI Agent Studio workflow or
  the target application's Run app preview.

STARTUP GATE
1. Read the canonical playbook, objects/README.md, every matching object reference,
   the AI Studio skill and the build records named by the active handoff.
2. Establish a current session-conformance receipt and continuous UTC timing.
   Run PolicyOnly, Startup and the startup-package verifier before substantive work.
3. Reconcile current server BO versions and consumers before reuse or modification.
   Never overwrite an unreviewed newer remote version.
4. Complete the requirement slices, architecture review and golden-path manifest.
   ATLAS plans may schedule only manifest-mapped tests.
5. Record the exact AI Agent Studio surface, app/workflow code and DRAFT or
   published state before any runtime prompt.

MANDATORY FAST-FAIL GATE
Before expanding beyond one representative supplier-query slice:
1. Build the minimum app shell and Query route.
2. Ensure every app Query invocation terminates. No reachable HUMAN or WAIT node
   is allowed anywhere on the Query graph, including nested, convergence and
   loopback edges.
3. Run:
   node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>
4. Save the minimal DRAFT only after that command passes.
5. In the target AI Agent Studio Run app preview, execute one real Query through
   the bound workflow and confirm the correct app identity and terminal response.
6. Execute one configured BO case through the actual BO node with the resolved
   parent path input. Injecting a child response into a downstream normalizer is
   not acceptance.

Do not build more child routes, conversations or cumulative suites until all six
steps pass. Rerun the Query-contract command after every graph, producer, BO
function or binding change and before every remote save, sync, record-now action
or runtime test.

ARCHITECTURE
- Use one app-bound root workflow with an OraMessageHint router and distinct
  terminal owners for InitDisplay and Query.
- Every Query is self-contained and ends in the same invocation. Preserve
  multi-turn business context only through supported app/conversation input;
  never rely on suspended workflow state.
- Agents may interpret intent and propose structured values. Deterministic nodes
  own allowed-field validation, parent resolution, payload construction,
  approval revision and write gating. Agents do not receive unrestricted POST tools.
- A changed value invalidates the prior approval snapshot.
- Each BO REST path token must be bound to the current authoritative producer on
  every incoming route. A resolver/preparer change invalidates downstream proof.

KNOWN REQUIRED-FIELD BASELINE
Read the current object references before using these values; they are a starting
baseline, not a substitute for current verification.
- Address: one purpose flag is required for the purchasing path; use only
  AddressPurposeOrderingFlag=true unless the transaction requires another purpose.
- Contact: use the minimum identity FirstName, LastName and Email; never provision
  an account as a side effect.
- Products/services association: submit ProductsServicesCategoryId and
  CategoryType=BROWSING. Do not reuse the SUPPLIER lookup taxonomy value.
- Site assignment: submit both ClientBUId and BillToBUId; use the same explicitly
  selected BU when that is the approved transaction.
- Omit generated IDs from POST payloads and capture them from the response.

WRITE GATE FOR EACH OBJECT
Before the first POST for a resource:
1. Read its object reference and retained GET/POST evidence. Do not rerun a GET
   merely to refresh documentation.
2. Resolve the parent and all foreign references in the target scope.
3. Define the exact required-field-only payload, generated omissions, uniqueness
   scope, duplicate query and independent persisted-GET projection.
4. Add or update the focused contract test and make it pass locally.
5. Run the Query-contract preflight and artifact validation.
6. Run one configured discrete AI Agent Studio case and the lean cumulative suite.
7. Show the exact normalized payload and parent in the agent flow for final user
   approval. Inherited/default acceptance does not authorize creation.
8. After applicable tests pass, continue with the already-authorized POST without
   a separate operator approval pause. Execute one POST, capture the generated ID,
   then perform an independent scoped GET.

If a failure may have crossed a POST boundary, freeze the payload and perform a
read-only reconciliation. Never repeat the write until absence is proven and the
payload is materially corrected. Two unchanged failures at one boundary stop the
remote cycle and require root-cause correction plus a newly passing focused test.

BUILD -> DISCRETE TEST -> CUMULATIVE TEST
For every phase and child slice:
A. BUILD the smallest complete route. Do not scaffold later phases.
B. DISCRETE TEST the real producer-to-consumer path, required payload, terminal
   response and MUST/MUST-NOT-execute behavior. Run only the affected configured
   case. Complete model-data or judge continuation in the same action.
C. CUMULATIVE TEST once using one golden case per enabled route plus the two
   approved negative controls. Do not run planner-generated atomic variants.
D. On failure, classify it, fix the smallest owner and rerun only the affected
   discrete case. Run the cumulative gate once after correction. Never rerun an
   unchanged broad suite to gather more evidence.
E. Record exact command, JSON-generation time, Node wall time, workflow time,
   parse/review time, tests, assertions, tokens, AI Units and result. Record null
   with a reason when a measurement is unavailable.

FIXTURE AND CLI HYGIENE
- Use the CLI-generated replayDataPayloadTemplate and consistencyGroups exactly.
  Do not handcraft wrappers, add nodes or omit required conversation turns.
- Keep immutable raw artifacts out of the editable payload. Do not place volatile
  jobId or finishReason in model-generated overrides. Remove only volatile capture
  metadata when the generated apply request would otherwise compare it as content.
- Validate one fixture end-to-end before applying the pattern in bulk.
- Treat needs-model-test-data and needs-judge as continuations, not failures.
- On Windows, run every authenticated AI Studio CLI command with host credential-
  store access from the first attempt. Keep local deterministic checks restricted.

BROWSER KEEP-ALIVE
While signed-in target-app acceptance is pending, retain one identified AI Agent
Studio tab. Poll or refresh that same tab between remote action groups and at least
every five minutes. Log UTC time, tab identity, artifact context, authentication
state, action and result. CLI authentication does not prove the browser is alive.
Stop target-app testing on logout, wrong app or wrong chatbot until the target
Studio context is restored.

PHASE ORDER
P0 — scope, object contracts, BO reuse, manifest and session gates.
P1 — minimum app shell plus first real Run app Query/BO fast-fail proof.
P2 — supplier, address, site and contact reads with real parent bindings.
P3 — deterministic preparation, required-field validation, revision and exact
     no-write approval review.
P4 — supplier create and persisted GET.
P5 — address create and persisted GET.
P6 — site create and persisted GET.
P7 — contact create and persisted GET.
P8 — one retained child slice at a time in dependency order: classifications,
     contact-address association, products/services, site assignment, then the
     retained query-only resources.
P9 — one integrated target-app golden journey, final configured suites and Closeout.

PACE AND STOP RULES
- Target no more than eight focused execution hours for the full retained scope,
  excluding user login, tenant outage and product-service outage.
- At each two-hour checkpoint, compare accepted slices with elapsed time. If no
  new slice passed, stop broad execution and diagnose the blocking boundary.
- Stop after the same failure signature appears twice without new evidence.
- Keep the approved goal active through checkpoints. At 70-75% context, update
  the handoff, checkpoint and time tracker, revalidate, and continue; a new session
  is optional.
- Continue automatically after passed gates. Ask only for a real authority,
  privacy, publication, destructive-cleanup or external-state blocker.

CLOSEOUT
Run final local validation, configured workflow/app suites, the integrated target
AI Agent Studio journey and the living-build Closeout receipt. Reconcile the
learning register, object references, dependencies and task-owned scratch. Commit
only scoped changes. Push or publish only when authorized. Report DRAFT versus
published state, exact test counts, timing, tokens/AI Units and remaining limits.
```
