# Optimized execution prompt — XDX Supplier Lifecycle Agent

Use this prompt for a clean implementation or rebuild. The phased plan at
`temp/xdx_supplier_lifecycle_plan.md` owns scope and acceptance. The canonical
living-build playbook and object references remain authoritative.

Before running it, replace `<attempt-id>` with a unique lower-kebab identifier,
for example `retry-20260924-a`. Run the prompt from the governed base checkout,
not from an old supplier lifecycle worktree.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first.

ATTEMPT_ID=<attempt-id>
BASE_REF=TestingWFBuildTools
RETRY_BRANCH=codex/xdx-supplier-lifecycle-agent-<attempt-id>
RETRY_WORKTREE=C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent-<attempt-id>
BUILD_ID=xdx-supplier-lifecycle-agent-<attempt-id>

Execute the bootstrap below, then execute temp/xdx_supplier_lifecycle_plan.md in
the new XDX worktree and branch. Use only that worktree's env.properties and never
print credentials. Preserve unrelated work.

PREVIOUS-ATTEMPT PURGE
1. From the governed base checkout, execute
   temp/xdx_supplier_lifecycle_purge_prompt.md for the exact previous attempt.
2. Treat already-absent local targets as a verified no-op. Refresh server versions,
   consumers and DRAFT/published state before deletion.
3. Do not create the retry worktree until the purge prompt has a passing receipt or
   an explicit shared-BO retention disposition. Fusion business records are never
   part of this purge.

WORKTREE CREATION AND CLEAN-SEED GATE
1. Validate ATTEMPT_ID against `^[a-z0-9]+(?:-[a-z0-9]+)*$`. Resolve the repository
   root, BASE_REF, RETRY_BRANCH and RETRY_WORKTREE. Stop if the branch is registered,
   the path exists, the base has unresolved Git operations, or scoped base changes
   would be overwritten. Never reset, clean, stash, prune or reuse an old worktree.
2. Confirm BASE_REF contains the current handoff, canonical playbook, object registry,
   this prompt, the phased plan and the purge prompt. Record its exact commit.
3. Create the retry with:
   `git worktree add -b <RETRY_BRANCH> <RETRY_WORKTREE> <BASE_REF>`.
   Read back `git worktree list --porcelain`, branch and HEAD from the new path.
4. If the governed base has `env.properties` and the new worktree does not, copy it
   directly to the new root without displaying its contents. Do not copy `.debug`,
   `test-reports`, credentials caches or any other generated state.
5. In the new worktree, reread the handoff, playbook and object registry. Create a
   task-specific Startup receipt under `docs/builds/<BUILD_ID>/` and pass PolicyOnly,
   Startup and the startup-package verifier before modifying tracked artifacts.
6. Establish a clean implementation seed in the retry branch by removing only these
   tracked prior-build artifacts when present:
   - `src/apps/xdx_supplier_lifecycle.app`
   - `src/workflows/xdx_supplier_lifecycle_agent.wf`
   - `src/businessObjects/xdx_supplier_information.bo`
   - `src/businessObjects/xdx_supplier_procurement_business_units.bo`
   - `src/businessObjects/xdx_supplier_product_service_categories.bo`
   - `src/contracts/xdx_supplier_lifecycle_state.schema.json`
   - `scripts/tests/xdx-supplier-lifecycle/`
   - `test/apps/xdx_supplier_lifecycle/`
   - `test/workflows/xdx_supplier_lifecycle_agent/`
7. Preserve `docs/builds/xdx-supplier-lifecycle-agent/` as historical evidence and
   preserve the optimized prompt, plan, canonical lessons, object references and
   unrelated repository files. Create fresh current records only under
   `docs/builds/<BUILD_ID>/`; historical success never satisfies retry acceptance.
8. Verify the exact removal manifest, absence of generated `.debug`/`test-reports`,
   current receipt, clean scope and preservation list. Commit this boundary on the
   retry branch as `chore: initialize clean supplier lifecycle retry <attempt-id>`.
   Rerun Startup after the commit and do no app/BO/workflow authoring until it passes.

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
- Do not implement query-only children that do not supply, guard or verify an
  included transaction.

PREBUILD SERVER CLEANUP GATE
Before creating the retry artifacts, require the passing receipt from
temp/xdx_supplier_lifecycle_purge_prompt.md and the reviewed procedure in
docs/builds/xdx-supplier-lifecycle-agent/server-purge-and-bo-streamlining-plan.md.
Refresh exact server versions and consumers first. Delete in dependency order:
DRAFT app, DRAFT workflow, dedicated lookup BOs, then the supplier BO only after
zero external consumers are proven and the exact destructive action is authorized.
Require exact-code not-found read-back after every deletion. Stop on version drift,
an unknown consumer, a published copy or an unexpected dependency. Server artifact
deletion never implies deletion of Fusion supplier business data.

For the retry, create a dedicated minimal BO surface. Retain only transaction
query/create/verification functions plus required reference lookups. Do not copy the
completed 36-function supplier BO into the new build.

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
     contact-address association, products/services and site assignment.
P9 — one integrated target-app golden journey, final configured suites and Closeout.

PACE AND STOP RULES
- Target no more than eight focused execution hours for P0-P9, excluding the
  prior-attempt purge, retry-worktree bootstrap, user login, tenant outage and
  product-service outage.
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
