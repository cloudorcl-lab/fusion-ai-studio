# AI Studio Agent App Living Build Playbook

## Instruction 1 — Learn, improve, and hand forward before you build

Every AI Studio agent-app build MUST begin by learning from prior builds and MUST end by improving this playbook for the next build.

At the start of every Codex session in every worktree, review
`docs/handoffs/ACTIVE_HANDOFF.md` before any other repository work. That file
is the single current, repository-wide transition record; replace it when the
active work changes instead of creating competing active handoff documents.

Before architecture design, artifact creation, remote mutation, or testing:

1. Read this entire playbook.
2. Review its change log and the most recent evidence-backed lessons.
3. Review the [object learning registry](objects/README.md), inventory every parent and child resource object in scope, and read each matching object reference.
4. Identify which lifecycle lessons and object references apply to the proposed app, data sources, tools, workflows, app stages, tests, runtime, and release boundary.
5. Create a learning register in the active build checkpoint or work record.
6. Record the playbook rules and object references that the build will enforce, including every rule or operation contract that requires current-product verification.
7. Do not begin the build until the learning register and build intake contract are complete.

During the build:

1. Capture every material correction, delay, failed assumption, missing dependency, repeated test, unnecessary model call, runtime surprise, and successful optimization when it occurs.
2. Record the evidence, root cause, corrective action, time/token impact, and whether the lesson is reusable.
3. Update the active build checkpoint after every material architecture or QA correction. Do not rely on chat history as the only record.
4. Prefer refining an existing rule over adding another overlapping rule or fallback.
5. Record operation-level GET, POST, request JSON, response JSON, schema, filter, paging and object-key lessons in the matching object reference, not in this lifecycle playbook.

Before declaring the build complete:

1. Review the complete learning register.
2. Classify each reusable lesson as lifecycle/architecture guidance or resource-object guidance.
3. Merge lifecycle and architecture lessons into this canonical file:
   `docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md`; merge operation-level object lessons into the matching reference under `docs/lessons/objects/`.
4. Generalize reusable guidance without customer, tenant or run-specific values and refine the correct existing owner when evidence changes or sharpens it.
5. Remove or consolidate duplicate, obsolete, contradictory, and app-specific main-path guidance.
6. Clean stale dependencies, references, scratch artifacts, unused internal paths, superseded tests, and dead configuration that the build introduced or made obsolete. Destructive cleanup of external contracts or persistent data still requires explicit scoped authority.
7. Revalidate every changed command, link, path, lifecycle boundary, and completion rule.
8. Add one evidence-backed row to the change log.
9. Leave the next build with one clearer canonical playbook, not a new competing playbook.

**Learning completion gate:** a build is not complete until reusable lessons have been integrated here, dependency drift has been reconciled, and this playbook has passed its own verification checks. “No new lesson” is acceptable only when the build owner explicitly records that the learning review found no evidence-backed change.

## Invocation in every worktree and build

The tracked root `AGENTS.md` is the automatic Codex entrypoint for this repository. It requires every new Codex session to review `docs/handoffs/ACTIVE_HANDOFF.md` first, and every build, deployment, test cycle, substantial modification, and architecture task to read this playbook and run:

```powershell
pwsh -NoProfile -File scripts/verify-living-build-contract.ps1
```

The AI Studio skill repeats the same short gate as a route-specific safeguard. Both entrypoints link here; this file remains the only owner of the detailed lifecycle.

Worktree propagation follows Git history:

1. Commit this playbook, `AGENTS.md`, `docs/handoffs/ACTIVE_HANDOFF.md`, the AI Studio skill gate, and the verifier together when their contract changes.
2. Create future worktrees from a branch that contains that governance commit.
3. Integrate the governance commit into an existing worktree branch before its next build.
4. Start a fresh Codex run after a worktree first receives or updates the contract because repository instructions are assembled at run start.
5. Treat a worktree that lacks the governance commit or fails the verifier as not ready to build.

At closeout, rerun the verifier after integrating lessons and dependency cleanup. The handoff commit is the invocation mechanism for the next build; uncommitted guidance in another checkout does not propagate.

## Document identity

- **Document type:** Living how-to and reference standard
- **Audience:** AI Studio solution architects, builders, QA owners, release owners, and build-orchestration agents
- **Canonical owner:** This file
- **Temporary steward:** The owner of each active agent-app build
- **Applies to:** Every AI Studio agent app and its backing tools, workflows, tests, data, runtime dependencies, and release evidence
- **Last reviewed:** 2026-09-17

## Purpose

This playbook turns lessons from completed builds into preventive controls for all future builds. Its objectives are:

- Better first-pass build quality.
- No architecture or configuration discovery during expensive QA.
- Faster golden-path validation and regression.
- More complete solutions in less elapsed time.
- Fewer repeated tests, live calls, model tokens, and AI Units.
- Cleaner dependencies and one authoritative operating standard.
- Continuous improvement from build to build.

The governing principle is:

> Testing must verify a complete architecture. It must not be the mechanism that discovers missing architecture, configuration, source links, output contracts, or runtime boundaries.

## How this living document evolves

### Learning lifecycle

Every lesson moves through the same lifecycle:

```text
observe → capture → verify → classify → generalize → integrate → deduplicate → validate → hand forward
```

| Stage | Required action | Evidence required |
| --- | --- | --- |
| Observe | Identify a correction, delay, failure, optimization, or missing dependency. | Command result, artifact diff, report, timing, trace, or direct runtime evidence |
| Capture | Add it to the active build learning register immediately. | Date, artifact, symptom, impact, and evidence link |
| Verify | Reproduce or confirm the behavior and its scope. | Fresh focused check; distinguish local, file-backed, live, DRAFT, and PUBLISHED evidence |
| Classify | Mark it reusable, app-specific, obsolete, conflicting, or unverified. | Reason for classification |
| Generalize | Rewrite reusable guidance without customer-specific names, IDs, paths, prompts, or data values. | Universal trigger, action, gate, and expected evidence |
| Integrate | Update the appropriate existing section of this playbook. | Focused diff to the canonical file |
| Deduplicate | Merge overlapping rules and retire superseded main-path guidance. | Lingering-reference and contradiction check |
| Validate | Check links, commands, structure, terminology, and consistency. | Verification receipt |
| Hand forward | Update the change log and identify any remaining risk. | Change-log row and final build handoff |

### Lesson capture schema

Use this schema in the active build checkpoint:

| Field | Required content |
| --- | --- |
| Build and date | App/build identifier and observation date |
| Lifecycle stage | Intake, data, tools, workflow, app, test, deployment, optimization, or closeout |
| Observation | What happened, stated without speculation |
| Explicit guidance | Which approved requirement or product rule already applied |
| Assumption or deviation | What the build inferred, omitted, or implemented differently |
| Evidence | Artifact, command output, report, trace, timing, or reproduction |
| Root cause | Smallest responsible process, contract, architecture, or tooling cause |
| Correction | What changed and why |
| Cost | Added elapsed time, test runs, tokens, AI Units, or coordination |
| Reusable lesson | Universal rule that would prevent recurrence |
| Playbook action | Add, refine, merge, retire, or no change |
| Dependency action | Dependency added, removed, replaced, verified, or retained with reason |

### Evidence bar for a new rule

A new or changed rule belongs in this playbook only when:

- The observation is supported by direct artifact, tool, test, or runtime evidence.
- Its scope is understood.
- It can be written as a reusable trigger, required action, gate, or decision rule.
- It does not conflict with current AI Studio guidance.
- Any product-version-sensitive statement is marked for revalidation.
- It improves quality, speed, completeness, token efficiency, dependency hygiene, or safety.

Do not add:

- Raw chat recollections without evidence.
- One-off customer facts or resource-object operation details in the universal sections.
- Tenant IDs, artifact IDs, versions, ETags, credentials, or host-specific secrets.
- A new fallback when the correct owner can be repaired.
- A second permanent playbook for the same lifecycle.
- A rule that merely restates another rule.

### Refinement and retirement rules

When new evidence conflicts with existing guidance:

1. Identify the current canonical owner.
2. Determine whether the old rule is wrong, incomplete, release-specific, or still required for an external boundary.
3. Refine or replace the old main-path rule.
4. Delete duplicate internal guidance rather than keeping two active owners.
5. Retain compatibility guidance only when an active external dependency is proven; record an owner, observation method, and retirement trigger.
6. Do not delete persistent data, published external contracts, or source-of-truth objects without explicit scoped confirmation.
7. Verify that the new owner preserves intended behavior and the old path no longer controls the main flow.

## Universal build objectives and measures

### Default communication style

Use terse, direct, professional responses by default. State outcomes, blockers and the next required action briefly. Include only material evidence, limitations and artifact links; expand when the user requests detail or a decision requires it. This communication default does not reduce implementation, verification or hand-forward requirements.

The build checkpoint must define and track these measures:

| Objective | Required measure |
| --- | --- |
| Learn first | Prior lessons reviewed and active learning register created before build work |
| Better first-pass quality | Every source, tool, workflow, route, app stage, output contract, model, test, and runtime boundary is present in the approved contract before remote mutation |
| No QA-discovered architecture | No new node class, source link, app stage, route, or boundary envelope is introduced after the live golden path begins, except a classified defect repair |
| Faster QA | Static and file-backed gates run first; one live golden path precedes broad regression; one canonical suite runs after synchronization is clean |
| Fewer live calls | One representative live data path is captured and compatible paths reuse prepared evidence |
| Fewer tokens | Focused evidence is loaded; oversized boundaries are compacted coherently; broad reruns and premature model sweeps are avoided |
| Complete solution | Workflow and app sync plans are complete, required judges are resolved, and final scoped evidence has no required action |
| Clean dependencies | Every retained dependency has an owner and purpose; obsolete internal dependencies are removed or have an explicit retirement decision |
| Hand forward | Reusable lessons are integrated into the correct lifecycle or object-reference owner and the change logs are current |

## Universal intake contract

Do not authorize remote mutation until all applicable fields are complete.

### Business contract

- App name and code:
- Intended user and authenticated test identity:
- Business decision or task supported:
- Exact golden-path prompt or trigger:
- Required final output fields, widgets, and cardinality:
- Allowed calculations, transformations, rankings, and tie-breaks:
- Missing-data and fallback behavior:
- Advisory, write, approval, and human-review boundaries:
- Approved audience vocabulary:
- Prohibited claims and actions:
- Measurable correctness, latency, token, and AI Unit targets:

### Data and source contract

For every source:

- Source name and type:
- Owning system and authority:
- Stable keys:
- Required fields, units, rows, and relationships:
- Owning tool or connector:
- Owning specialist workflow or agent:
- Allowed use and prohibited inference:
- Missing-data behavior:
- Connectivity, indexing, or access evidence:
- Expected runtime response shape:
- Runnable local contract test:
- Matching object-learning reference and documentation release:
- Masking policy:
- DRAFT/PUBLISHED or environment boundary:

### Architecture contract

- Project layout or explicitly selected app package:
- App code and panel IDs:
- Required app stages:
- User-intent or trigger taxonomy:
- Route table:
- Specialist dependencies by route:
- Sequential dependencies:
- Parallel dependencies and convergence:
- Parent-child input envelopes:
- Parent-child output envelopes and normalization:
- Terminal output owner per route:
- Widget or structured-output contract:
- Error/fallback ownership:
- Provisional model per model-backed node:

### Runtime and authority contract

- Configured host alias, without secrets:
- Expected authenticated identity:
- Existing artifact codes to reconcile:
- Remote DRAFT writes authorized:
- Live reads authorized:
- Live writes authorized:
- Prepared or synthetic branch data authorized:
- Publication authority by artifact:
- External side-effect authority:
- Stop conditions and approver:

### Test contract

- Globally descriptive test name:
- Durable scenario ID:
- Purpose and expected path:
- Data-capture policy:
- Representative live baseline:
- Compatible replay scenarios:
- Deterministic assertions:
- Semantic expected outcome and atomic rubric:
- Boundary size budget and consistency groups:
- Target time, tokens, and AI Units:
- Required HTML report and final-summary evidence:

### Learning contract

- Active learning-register location:
- Build steward:
- Review checkpoints:
- Closeout reviewer:
- Playbook sections likely to change:
- Object references likely to change:
- Dependency-cleanup scope:
- Change-log evidence required:

## Universal dependency map

Every build must maintain this traceable chain:

```text
business outcome
└── app and panel
    └── app-stage and intent routes
        └── supervisor or orchestration workflow
            └── specialist workflows
                └── tools, connectors, BOs, documents, or APIs
                    └── source contracts and permissions

Each artifact
└── focused tests
    └── prepared or live evidence
        └── HTML reports and final summaries
            └── learning register
                └── this living playbook
```

Every dependency must have:

- A single canonical owner.
- A clear consumer.
- A required status or version boundary.
- A validation method.
- A failure behavior.
- A test or explicit reason it is not directly testable.
- A retention reason.
- A retirement trigger when temporary.

## Universal right-first-time build sequence

### Gate 0 — Learn and freeze the contract

1. Complete Instruction 1.
2. Open the active learning register.
3. Inventory parent and child resource objects, read their entries from the object learning registry, and record the selected references and releases.
4. Complete business, data, architecture, runtime, test, and learning contracts.
5. Identify product-version-sensitive assumptions that require current CLI or runtime verification.
6. Create executable local tests for source keys, calculations, schemas, cardinality, safety vocabulary, and expected examples.
7. Separate required stage-freeze work from optional research, model sweeps, and later-stage features. Name the later gate for deferred work instead of expanding the current build.

**Exit evidence:** prior lessons acknowledged, learning register active, contract approved, and source-level tests passing.

### Gate 1 — Prove project and environment identity

1. Resolve legacy versus app-package layout.
2. If multiple app packages exist, require the current request to name the target package.
3. Confirm the configured host and expected environment.
4. Confirm authenticated identity.
5. Reconcile exact artifact codes before writes.
6. Never treat documentation, CLI-help, or another environment's sample IDs, versions, ETags, or tenant-specific values as runtime inputs. Reuse values from authorized current-environment discovery only after confirming their identity, scope and freshness; never make them reusable artifact defaults.
7. Produce one timestamped preflight receipt covering layout, host, identity, authority, source scope, and remote-version safety. Reuse it within the build until configuration, authentication, authority, source scope, or remote state materially changes.

From the project root:

```powershell
node .agents\skills\aistudio\scripts\aistudio.js whoami
```

**Exit evidence:** layout, host, identity, authority, and exact-code reconciliation agree.

### Gate 2 — Build and verify data dependencies

1. Validate source files or object schemas locally.
2. Create tools, connectors, BOs, document sources, or APIs from the approved source manifest.
3. Apply remote mutations serially per artifact.
4. Confirm document indexing, connector access, BO functions, permissions, and expected response shapes as applicable.
5. Validate each local artifact with the matching CLI command.
6. Record the owner and consumer for every source dependency.
7. Reuse a current-environment invocation pattern already proven for the same artifact type and source boundary. Do not repeat a discarded path unless product version, schema, permission, or the original failure condition changed.
8. For a published or indexed source, use the minimum complete lifecycle: one validated save, observe processing to its terminal state, one canonical fetch, and one local revalidation. Repeat only after a material source/tool change or a concrete mismatch.
9. If a no-force canonical fetch stops after server-managed indexing or publication advances lifecycle fields, fetch to non-overwriting scratch, prove the diff is lifecycle-only, adopt the canonical lifecycle state locally, and never force over unreviewed content.
10. A rendered delimited document may collapse repeated empty cells. Keep the one-call Tool answer as evidence, map only unambiguous typed identifiers into an internal normalization envelope, and deterministically compare every required identifier with the local source contract. Do not invent positional values or make a large Agent reserialize the source repeatedly.
11. For read-only collection retrieval from a Document Tool, prove the direct `RAG_DOCUMENT_TOOL` path first: build the complete dynamic question in deterministic Code, bind the Tool input to that whole output expression, parse the fixed `value` and `citations` boundary deterministically, and validate scope, natural-key uniqueness, required fields, and runtime-derived cardinality. Confirm the resolved business key in a live node-input trace. Do not begin with an Agent-owned collection rewrite, manifest fan-out, or per-record loop; add multiple calls only after direct Tool evidence proves the complete source set cannot be returned.

Example:

```powershell
node .agents\skills\aistudio\scripts\aistudio.js validate-tool --file src\tools\<tool>.tool
```

**Exit evidence:** every source dependency is available, validated, owned, and mapped to a consumer.

#### Object-specific API and Business Object references

The [object learning registry](objects/README.md) owns operation-level GET, POST, request JSON, response JSON, schema, filter, paging, key and object-specific documentation-retrieval guidance. Before creating or changing an API or Business Object dependency, select and read every matching parent and child resource reference and record them in the active intake. Write-test intake must include local-sample suitability, the documentation cross-reference, and any provisional assumption and its success/failure decision; follow the registry's policy before live testing.

If a required object reference is missing, incomplete or stale for the selected release, inspect the exact current specification and authorized evidence, then create or update that reference before relying on the behavior. Keep tenant values and raw run evidence in the build record. An object reference does not expand live-read, live-write, remote-save, publication or cleanup authority.

After a resource object's first successful GET through a BO, add the result once to its object reference if no first-success sample exists. Use retained evidence when the first success predates the reference. Never execute, append, replace or refresh a routine GET for documentation. Large or capture-restricted results may use an exact bounded excerpt with a durable link to the complete authorized response.

This playbook owns the lifecycle: complete object discovery before architecture, validate artifacts before mutation, serialize writes, distinguish local/live/DRAFT/PUBLISHED evidence, capture authorized proof and route reusable operation findings back to the correct object reference. Do not copy detailed object contracts back into this file.

### Gate 3 — Build complete specialists

Each specialist must contain:

- One explicit role and business boundary.
- Exact assigned tools or data sources.
- Source trust and prompt-injection boundary.
- Complete tool-call or connector contract.
- Calculations and transformations.
- Cardinality and required-field invariants.
- Missing-source behavior.
- Advisory, approval, and side-effect boundaries.
- One terminal output contract.
- A focused golden-path test.

After structural work:

```powershell
node .agents\skills\aistudio\scripts\aistudio.js do-prettify-workflow --file src\workflows\<workflow>.wf
node .agents\skills\aistudio\scripts\aistudio.js validate-workflow --file src\workflows\<workflow>.wf
node .agents\skills\aistudio\scripts\aistudio.js do-save-workflow --file src\workflows\<workflow>.wf
```

Treat the remote-normalized DRAFT returned by a successful save as the new local source of truth.

Runtime evidence owns the node-output envelope. When an Agent node's captured final response is exposed directly as `$context.$nodes.<NODE>.$output`, bind that value directly. Do not assume a nested `.output` field without a captured schema or successful runtime example.

When a DRAFT parent can execute a PUBLISHED child, treat the observed published response as an active compatibility boundary. Normalize stable structured output plus each directly observed published prose shape in deterministic code, and retain a focused parser check for every supported shape. The compatibility owner is the parent boundary; retire the exception only after runtime evidence proves the child contract is stable across the relevant lifecycle status.

Do not assume that a DRAFT workflow can execute another DRAFT workflow as a child. Before introducing a thin adapter or pass-through parent, prove that exact lifecycle boundary with a live request. If the platform rejects the child execution, keep the app bound directly to the canonical DRAFT workflow or call an already executable PUBLISHED dependency; do not retain an extra model hop that adds latency without owning a distinct contract.

Normalize machine-readable fields at that boundary before presentation. In particular, strip sentence punctuation accidentally captured after ISO timestamps, validate required keys and row counts, sort in deterministic code, and align dependent records by stable identifiers instead of trusting model-emitted order.

When an LLM derives numeric results, do not rely on prompt-only verification:

1. Treat extracted values as candidates.
2. Recompute and validate arithmetic, row cardinality, keys, required fields,
   and ordering in deterministic code where feasible.
3. Run the separately required LLM verification against the original source.
4. Put a structural condition before every presentation route and permit
   values through only when both checks pass.
5. Use a fixed value-withholding terminal when either check fails.
6. Define sign semantics explicitly for metrics such as schedule variance;
   never leave positive/negative interpretation to presentation wording.

**Exit evidence:** clean validation, canonical DRAFT, explicit source contract, and one passing focused test.

### Gate 4 — Build orchestration as interfaces

Before testing the supervisor or orchestrator:

- Encode every app stage and user-intent route in the graph.
- Assign one terminal output owner per materially different route.
- Define every child workflow's input and output envelope.
- Normalize wrapped or serialized child output immediately after its boundary.
- Use named request-builder logic when downstream work depends on upstream output.
- Mark sequential dependencies explicitly.
- Parallelize only independent work.
- Define one convergence point and deterministic downstream ownership.
- Use exact returns for fixed safety boundaries when model variability adds no value.

For app-backed workflows, route required stages using
`$context.$app.$OraMessageHint`. Do not combine multiple app-stage behaviors in
one generic LLM or agent prompt.

Validate the platform's permitted app-stage terminal node types before optimizing a first-paint route. If a deterministic CODE or RETURN terminal is rejected, build the complete bounded display in code and use the smallest supported LLM or AGENT terminal as an exact pass-through. Prove the observed node path and final structure; do not reintroduce unrelated startup work to satisfy the terminal constraint.

**Exit evidence:** every declared stage and intent reaches exactly one valid terminal owner, and every dependency boundary has a tested envelope.

### Gate 5 — Build the complete app

1. Wire every top-level panel to the intended workflow.
2. Define panel identity, app-stage behavior, display prompts, widgets, actions, and communication boundaries.
3. Ensure every required stage has a real backing workflow route.
4. Keep DRAFT workflow usage explicit during development.
5. Validate and save the app only after its backing workflows are structurally valid.
6. When startup usability requires in-context navigation, put concise guidance and supported widget link fields in the startup display and bind them to existing app actions. A separate `InitActions` rail does not prove those choices are discoverable inside the startup panel. Enable actions on the `InitDisplay` terminal and prove that links remain lazy until selected.
7. Treat every widget `ora.Invoke(...)` or app `agentCommand` as a distinct `InvokeAction` lifecycle. The backing workflow stage switch must route `InvokeAction` to one existing follow-up owner that parses the action payload and selects the requested branch; do not add a duplicate parser or rerun `InitDisplay`. Preserve the startup response when the product supports it so the branch result appears below it. A `Query`-hint test with the same JSON payload proves only branch parsing, not the click lifecycle: retain at least one real `appHint: InvokeAction` path attempt and its observed routing evidence. At acceptance, inventory every visible action code and prove the complete action -> app stage -> route case -> dependency chain -> terminal-owner mapping with a focused contract. A future-stage control must be hidden, disabled, or clearly labeled incomplete, and the active handoff must name that boundary; do not call the app working while a visible control lacks its route-to-terminal contract. If the test synchronizer predicts a different default path and rejects the observed action route, record the tooling blocker explicitly instead of weakening the workflow or relabeling the click as `Query`.
8. When visual order requires a fixed startup panel above a replaceable response panel, do not rely on `agentCommand` or action-preservation flags to choose the response destination. Give the startup and response areas separate top-level panel owners, pass the selected route through app context, and refresh only the response-panel workflow. Prove on screen that the startup panel remains unchanged, the selected result appears only below it, and a later selection replaces the prior lower result without exposing lifecycle text such as `InvokeAction`.

```powershell
node .agents\skills\aistudio\scripts\aistudio.js validate-app --file src\apps\<app>.app
node .agents\skills\aistudio\scripts\aistudio.js do-save-app --file src\apps\<app>.app
```

**Exit evidence:** app validation is clean and every panel resolves to a valid workflow and output contract.

### Gate 6 — Complete workflow test synchronization

Process one workflow at a time and one mutating action at a time.

```powershell
node .agents\skills\aistudio\scripts\aistudio.js get-workflow-test-sync-plan --file src\workflows\<workflow>.wf --recommended-batch-only true --format focused-json
```

After each focused action:

1. Complete required recording, replay, compaction, model-data, or judge authoring.
2. Validate only the affected test deterministically.
3. Refresh the focused plan.
4. Continue until `finalSummaryAllowed: true` and no create/update action remains.

When a topology edit removes nodes and the current CLI rejects an in-place test update because the existing path assertions reference those removed node codes:

1. Confirm the changed workflow itself validates and the latest sync plan identifies the test as obsolete or out of sync.
2. Delete only that source-controlled workflow test through `do-delete-workflow-test --test-file <path>`; keep the deletion recoverable in Git.
3. Refresh the focused sync plan and recreate the scenario from the current topology through the normal single-action loop.
4. Never bypass the stale-path check by hand-editing final test JSON or weakening the current expected path.

Do not run a full suite while authoring actions or required data continuations remain.

If a required false or safety branch depends only on non-recordable Agent or LLM outputs and the current CLI exposes no supported replay injection point:

1. Preserve the authoritative source unchanged.
2. Make at most the two materially different path attempts required by the sync contract.
3. Mark the scenario unable to generate when both attempts reach the valid branch.
4. Prove the gate expression and exact literal withholding response with a deterministic static contract.
5. Record the residual coverage limitation in the final summary and learning register.

When a `record-now` parent route reaches its intended branch but the recorder
persists a `WORKFLOW` child response as null, do not treat the observed route as
a passing replay and do not fabricate replacement child data. Fetch the current
child DRAFT to distinguish recorder failure from workflow drift, retry once
with the same valid route input, then register a scoped `recording-failed`
deferral if the null response repeats. Retain focused child and authenticated
browser evidence separately; the deferred parent replay was not executed.

An accounted deferred scenario may advance to app synchronization only when the latest sync plan reports `finalSummaryAllowed: true`, the canonical suite is current, deterministic checks pass, and no required judge remains. Do not describe the deferred runtime branch as executed.

Then run one canonical configured-mode workflow suite. Omit
`--evaluation-mode` so tests retain their configured modes. Omit
`--judge-provider` so local judging remains the default unless the user
explicitly requests remote judging.

```powershell
node .agents\skills\aistudio\scripts\aistudio.js run-workflow-tests --workflow-code <WORKFLOW_CODE>
node .agents\skills\aistudio\scripts\aistudio.js get-workflow-test-final-summary --file src\workflows\<workflow>.wf
```

**Exit evidence:** current final summary, human-facing HTML report, zero failures, and zero unresolved required judges.

### Gate 7 — Prove one live golden path

Run one representative live request only after sources, artifacts, DRAFTs, routes, and focused tests are current.

The golden path must prove:

- Correct environment and tested artifact status.
- Expected trigger, app stage, and intent route.
- Expected tool or specialist boundary.
- Required complete final answer or widget.
- No prohibited claim or side effect.
- Total time, workflow time, tokens, AI Units, and observed model.

For a live app with streamed or progressively rendered widgets, do not treat the first visible rows as completion. Wait until the loading state clears, then assert the final heading, exact row count, replacement behavior, and required visual priorities. Capture both semantic DOM evidence and a rendered screenshot when layout, order, color, or table design is part of the contract.

If it fails, classify the issue before changing anything:

1. Requirement or baseline defect.
2. Architecture or workflow defect.
3. Test assertion defect.
4. Test-data or replay defect.
5. Environment, permission, or indexing defect.
6. DRAFT/PUBLISHED mismatch.
7. Nondeterminism or formatting fragility.

Repair only the smallest responsible owner and rerun only the affected test.

Model-compacted replay is not proof that a child boundary has one response shape. Capture at least one current live child response for every changed boundary, compare it with replay, and add deterministic compatibility checks before broad regression. If replay masks a live variation, repair the boundary parser rather than weakening the user-visible contract.

### Gate 8 — Complete app synchronization and regression

App-wide synchronization begins only after all required backing workflow loops are complete.

```powershell
node .agents\skills\aistudio\scripts\aistudio.js get-app-test-sync-plan --file src\apps\<app>.app
node .agents\skills\aistudio\scripts\aistudio.js do-sync-app-tests --file src\apps\<app>.app
node .agents\skills\aistudio\scripts\aistudio.js get-app-test-final-summary --file src\apps\<app>.app
```

Do not repeatedly call app sync to clear unfinished workflow actions. Resume the first required workflow action instead.

**Exit evidence:** app tests and widgets pass, required judges are resolved, scoped reports are current, and no action is required.

### Gate 9 — Optimize only when required, after correctness

1. Decide whether optimization is required in the current stage or belongs to a later performance or release gate.
2. A passing incremental stage may reuse a current, evidence-backed model placement for the same node purpose and risk. Record the actual runtime model and metrics, then defer a sweep unless the inherited baseline fails, the environment changed, or optimization was explicitly requested.
3. When optimization is in scope, establish a passing semantic baseline first.
4. Measure one model-backed node at a time.
5. Compare quality, evidence preservation, AI Units, workflow latency, node latency, and tokens.
6. Reject any candidate that loses required fields, records, grounding, safety, widgets, or user-visible semantics.
7. Apply approved model changes separately.
8. Rerun the affected test and one final scoped regression.

Do not treat an isolated node recommendation as proof that a combined cross-workflow placement is safe. Deferred optimization must name its future gate and must not block the current stage freeze.

### Gate 10 — Learn, clean, and hand forward

This gate is mandatory and returns to Instruction 1.

1. Review the active learning register and all material corrections.
2. Integrate reusable lifecycle and architecture lessons into this playbook and operation-level resource lessons into the matching object references.
3. Refine or retire conflicting guidance.
4. Reconcile the final dependency graph.
5. Remove obsolete internal dependencies when safe and authorized.
6. Give every retained temporary or compatibility dependency an owner and retirement trigger.
7. Clean scratch artifacts only after final evidence no longer depends on them. Judge attachment with scratch cleanup can remove request envelopes immediately; focused checks that run afterward must read canonical test artifacts, not attach-time request scratch.
8. Verify final links, commands, reports, statuses, metrics, and playbook structure.
9. Update the change log.
10. Hand off one canonical playbook and one explicit release boundary.
11. Before an authorized branch handoff, run one mutation-aware delivery receipt covering the exact repository, worktree, branch, HEAD, upstream target, task-owned diff, required environment/configuration match, retired-alias checks, and push authority. Reuse current artifact QA when no runtime artifact, source, configuration, or test changed; rerun only the checks invalidated by the hand-forward delta.
12. Push only the authorized branch, read the remote ref back, and prove its SHA exactly matches local HEAD. Record branch tracking explicitly; a branch push does not imply a PR, merge, application publication, or external side effect.
13. When the default checkout contains unrelated local commits or working-tree state, promote governance from a clean task-owned worktree based on the refreshed remote default. Push only the fast-forward governance commit, preserve the user's checkout, and report its resulting divergence instead of merging, rebasing, or bundling unrelated history.

**Exit evidence:** final build evidence plus a verified living-playbook update and, when push is authorized, an exact local/remote branch-SHA match.

## Golden-path-first QA standard

| Stage | Scope | Data/evaluation | Run condition | Exit |
| --- | --- | --- | --- | --- |
| Learning preflight | Prior lessons and build contract | Read-only review | First action | Applicable rules recorded |
| Source contract | Files, objects, or APIs | Local deterministic | Before AI Studio authoring | Schemas, keys, calculations, and expected examples pass |
| Static artifacts | Tools, workflows, app | Local validation | After each structural batch | Zero validation errors |
| Specialist golden paths | One focused test per specialist | Prepared evidence or one representative live capture | Each specialist canonical | Correct path and complete domain output |
| Orchestrator golden path | One exact user prompt or trigger | Live | Complete topology current | Correct route, output, safety, and acceptable time |
| Targeted repair | Only affected scenario | File-backed deterministic, then configured mode if semantic | Classified failure | Specific defect fixed |
| Workflow canonical suites | One workflow at a time | Per-test data and configured evaluation | Sync plan clean | Zero failed and zero required pending judges |
| App panel lifecycle | Required panel/stage | Representative baseline and compatible replay | Backing workflows current | Widget and semantic contract pass |
| App-scoped final | App plus backing workflows | Configured mode | App sync clean | Current final summary and no required action |
| Model optimization | One node at a time | Measured sweep | All correctness gates pass | Approved placement with no quality loss |
| Learning closeout | Build register and dependency map | Evidence review | Before completion claim | Playbook updated and dependency drift closed |

### Rules that prevent unnecessary tests

- Never run a full suite to discover the next sync action.
- Never run a canonical suite while artifact or test authoring remains.
- Never rerun a passing suite merely to refresh summary prose.
- Judge attachment refreshes reports; do not run a confirmation suite afterward.
- Do not run deterministic mode after the final configured-mode suite.
- Do not run workspace-wide suites for a focused workflow or panel request.
- Do not run app sync for workflow-only scope.
- Record one representative path and replay compatible paths.
- Before claiming replay savings, classify recordable versus non-recordable nodes. File mode replays supported recorded boundaries but may still execute model-backed Agent or LLM nodes.
- Do not repeat live data calls for a test-only assertion change.
- Do not run model sweeps while architecture, sync, or semantics are unstable.
- Do not run a model sweep for every incremental stage when a current evidence-backed placement already satisfies the same accuracy contract; defer it to the named performance or release gate.
- After a classified failure, run only the affected test until it passes.
- Before judge attachment, compare each expected outcome with the current
  terminal route semantics. A sync-current path may still carry a stale
  milestone rubric; refresh only that judge contract and rerun only its
  affected test.
- Before the final summary, reconcile every approved user prompt against the source-controlled test inventory. Add and run only missing exact-prompt cases, then attach their judges once; do not reopen already-current artifact or app tests.
- Use final-summary commands and existing HTML reports rather than rebuilding evidence from large JSON or rerunning tests.
- Do not rerun artifact suites for a documentation-only learning hand-forward. Run the living-build verifier and scoped document, link, terminology, and diff checks, then verify the exact remote SHA after the authorized push.

## Time, token, and AI Unit controls

Every test or sweep must record:

| Timestamp | Artifact/test | Purpose | Mode | Elapsed | Workflow time | Input tokens | Output tokens | AI Units | Result | Rerun reason |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- |

Required controls:

1. Load the smallest evidence set that can answer the current question.
2. Keep one active owner for requirements, architecture, tests, and lessons.
3. Serialize mutations; parallelize only independent read-only work or approved independent execution.
4. Record one representative live path and reuse compatible evidence.
5. Compact oversized recordable boundaries as complete consistency groups.
6. Keep deterministic checks stable and semantic rubrics atomic.
7. Stop broad reruns after the first failure.
8. Use exact golden prompts rather than exploratory prompt churn.
9. Measure models by node purpose after correctness.
10. Preserve final reports so no rerun is needed for handoff.
11. Record the cost of rework in the learning register; invisible rework cannot improve the next build.
12. Treat settled source, publication, draft, and side-effect authority as locked build inputs. Reopen them only when the requested scope or target state changes.
13. Reuse the active preflight receipt; rerun only the checks invalidated by a material configuration, identity, authority, source, or remote-state change.

## Dependency hygiene and anti-entropy

### Required dependency inventory

At closeout, inventory:

- Source files, documents, BOs, APIs, and connectors.
- Tool artifacts and credentials or permission dependencies.
- Specialist and supervisor workflows.
- App panels, agents, stages, actions, communications, and widgets.
- Tests, replay baselines, masking profiles, judge contracts, and reports.
- Environment files and host/identity assumptions.
- Scratch files, temporary payloads, detached processes, and generated intermediates.
- Documentation links, prompts, templates, and playbooks.

### Cleanup decision

For each dependency, choose one:

| Decision | Requirement |
| --- | --- |
| Retain | Active owner, consumer, validation, and reason |
| Replace | New canonical owner and migration evidence |
| Retire internal path | Main-path, lingering-reference, negative, and boundary checks |
| Compatibility exception | Proven external dependency, observation method, and retirement trigger |
| Persistent-state hold | Exact target, risk, rollback note, and explicit scoped authority before deletion |

### Cleanup rules

For a reusable build or install packet, inventory the dependency closure before
delivery: include canonical guidance and its runnable verification/tooling
dependencies, and provide blank structures for project-specific handoffs,
intake, sources, tests, and evidence. Assemble universal guidance from its
canonical source at package-build time rather than maintaining a second copy.
Verify required-file presence and local guidance links independently of manifest
hashes, then exercise the extracted and installed package. Name external
prerequisites and distinguish structural examples from executable samples;
never carry customer configuration, credentials, or prior runtime evidence as
new-project defaults. Include recovery instructions for every installation
phase: capture a target baseline and backups before changes, distinguish copied
files from merged activation changes, and document failed-install recovery,
upgrade rollback and uninstall. Keep recovery guidance available after install;
verify removal scope while preserving later project work and external state.

- One behavior has one canonical owner.
- Do not keep old and new internal paths active “for safety.”
- Fix missing behavior in the correct owner instead of adding another fallback.
- Remove stale internal references when their owner is retired.
- Do not retain unused tools, nodes, routes, tests, prompts, or configuration without a documented dependency.
- Do not copy environment-specific IDs or secrets into reusable files.
- Do not delete uploaded source-of-truth data, external contracts, permissions, or persistent records without explicit scoped confirmation.
- Clean `.debug` and temporary test-data operations only after no active continuation references them.
- Keep human-facing HTML reports and the final scoped evidence required for audit and handoff.
- Do not create another permanent lessons playbook; improve this file.

## Stuck-process decision table

| Symptom | Inspect first | Correct action | Avoid |
| --- | --- | --- | --- |
| No visible deployment | Process exit state, remote code/status, local normalized file, report timestamp | Determine whether the write completed, failed, or never reached the server | Duplicate save |
| Quiet recording or suite | Attached process/session state, trace/report modification times | Keep the original process attached and poll its returned session while evidence advances; stop only on failure or exceeded documented threshold | Detach, lose the session identifier, or restart because console is quiet |
| Sandboxed credential error | Whether server was reached and host credential store is available | Retry the same command with host credential-store access | Reauthenticate without `AUTH_REQUIRED` |
| `AUTH_REQUIRED` | Returned recovery instructions | Complete supported recovery and retry original command once | Persist raw credentials |
| Remote/local mismatch | Code, version, ETag, and remote-newer status | Save only within version-safety rules; ask before overwriting newer remote DRAFT | Unreviewed force |
| `needs-model-test-data` | Exact template, consistency groups, managed path | Fill and apply the complete template atomically | Truncated previews or invented nodes |
| `needs-judge` | Exact request and report | Create and attach required result; use refreshed reports | Calling it a pass or rerunning suite |
| App sync blocked | Latest app plan and first required workflow action | Resume the workflow loop | Repeated app sync |
| Live/file mismatch | Status, version, replay binding, and provenance | Classify runtime versus replay cause | Weakening contracts without evidence |

## Model-placement standard

Choose a provisional model by node purpose, then verify it:

| Node purpose | Initial consideration | Required proof |
| --- | --- | --- |
| Closed-set classification | Lower-cost model may be sufficient | Correct taxonomy, safety route, latency, and cost |
| Bounded source extraction | Lower-cost model may be sufficient | Complete fields/records and no unsupported values |
| Deterministic calculation wrapper | Prefer code over an LLM when feasible | Exact arithmetic and stable contract |
| Route-specific factual response | Narrow model may be sufficient | Complete route contract and semantic score |
| Executive synthesis | Begin with quality-first model | Evidence preservation, nuance, safety, and usefulness |
| Structured widget generation | Begin with quality-first model | Valid structure plus correct user-visible semantics |
| Safe action suggestions | Begin with quality-first model | Helpful, bounded, non-operational suggestions |

Never make a model choice permanent from price or speed alone. Quality loss includes omitted rows, missing evidence, unsupported claims, altered safety boundaries, malformed widgets, or degraded business usefulness.

For model-backed numeric paths, include repeated or concurrent canonical cases.
If a cheaper model fails a deterministic gate intermittently, move the affected
nodes to the accuracy-first supported model and verify the actual runtime model
identifier. Optimize cost only after the stronger placement passes the complete
contract.

## Universal Definition of Done

### Learning and hand-forward

- [ ] This playbook was the first build instruction reviewed.
- [ ] Every in-scope parent and child resource was matched to the object registry, and the selected references and releases were recorded in intake.
- [ ] The active learning register captured material corrections and optimizations.
- [ ] Reusable lessons were generalized and integrated into their correct lifecycle or object-reference owner.
- [ ] Duplicate, obsolete, conflicting, and app-specific main-path guidance was refined or removed.
- [ ] The change log was updated.
- [ ] The next build can apply the updated rules without reading the prior chat.

### Contract and architecture

- [ ] Business, data, architecture, runtime, test, and learning contracts are complete.
- [ ] Every source has one owner and permitted use.
- [ ] Every required app stage and intent is real and routable.
- [ ] Every route has one terminal output owner.
- [ ] Parent-child envelopes and normalization are explicit.
- [ ] Sequential and parallel dependencies are intentional.
- [ ] Required fields, widgets, records, calculations, and safety boundaries are tested.

### Runtime

- [ ] Project layout, host, and authenticated identity match the approved target.
- [ ] Exact artifact codes were reconciled before writes.
- [ ] Changed artifacts match canonical remote DRAFTs.
- [ ] Dependency status distinguishes DRAFT and PUBLISHED behavior.
- [ ] Publication and external side effects remain within explicit authority.

### QA and evidence

- [ ] One live golden path passed before broad regression.
- [ ] Each resource object with a successful BO GET has one immutable first-success sample; later GETs did not append, replace or refresh it.
- [ ] Every required workflow sync plan permits final summary.
- [ ] Zero required tests failed.
- [ ] Zero required judges remain.
- [ ] App synchronization has no required backing action.
- [ ] Required app panel tests and widget contracts passed.
- [ ] Scoped final summaries and HTML reports are current.
- [ ] Timings, tokens, AI Units, and model placement are recorded.

### Dependency hygiene

- [ ] Every retained dependency has an owner, consumer, and reason.
- [ ] Superseded internal paths and references were retired or have a documented decision.
- [ ] Compatibility exceptions have active evidence and retirement triggers.
- [ ] Scratch and temporary artifacts were cleaned after evidence preservation.
- [ ] No persistent-state or external-contract cleanup occurred without scoped authority.
- [ ] This file remains the single canonical playbook.

## Copy/paste kickoff prompt for every new build

```text
Instruction 1: Read docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md and docs/lessons/objects/README.md in full before planning or changing anything. Inventory every parent and child resource object, read each matching object reference, and record the selected references and releases in the active learning register. Apply prior lessons to the intake and architecture. During the build, capture evidence-backed lessons, corrections, delays, token/time costs, and dependency changes. Before completion, route lifecycle and architecture lessons to the canonical playbook, route GET/POST/JSON/schema/filter/paging lessons to the matching object references, refine or retire stale guidance, clean dependency drift, validate the documentation, and update the relevant change records.

Build this Oracle Fusion AI Studio agent app using a contract-first, golden-path-first lifecycle.

ARTIFACT
- App name/code: <APP_NAME> / <APP_CODE>
- Required workflows and codes: <LIST>
- Required tools/data artifacts and codes: <LIST>
- Target project or explicitly named app package: <PATH_OR_PACKAGE>

BUSINESS OUTCOME
- User and authenticated test identity: <ROLE_AND_IDENTITY>
- Business goal: <GOAL>
- Exact golden-path prompt/trigger: <PROMPT_OR_TRIGGER>
- Required output fields, widgets, and cardinality: <CONTRACT>
- Calculations, rankings, and tie-breaks: <RULES>

DATA AND DEPENDENCIES
- Approved sources: <LIST>
- Required object-learning references and releases: <LIST>
- Source-to-tool-to-specialist mapping: <TABLE>
- Required keys, fields, units, relationships, and row counts: <LIST>
- Expected runtime response shapes: <CONTRACT>
- Runnable local source tests: <PATHS>
- Masking policy: <PROFILE_OR_NONE>
- Dependency owner and retirement trigger for every temporary dependency: <TABLE>

APP AND WORKFLOW CONTRACT
- Required app stages: <LIST>
- Route taxonomy: <LIST>
- Specialist dependencies by route: <TABLE>
- Sequential/parallel/convergence boundaries: <TABLE>
- Child input/output envelopes and normalization: <CONTRACT>
- Terminal output owner per route: <TABLE>
- Widget/structured-output contract: <CONTRACT>
- Provisional model per node: <TABLE>

SAFETY AND AUTHORITY
- Approved audience vocabulary: <LIST>
- Prohibited claims/actions: <LIST>
- Human-review and approval boundaries: <TEXT>
- Remote DRAFT writes: <AUTHORIZED_OR_NOT>
- Live reads/writes: <AUTHORIZED_OR_NOT>
- Prepared branch data: <AUTHORIZED_OR_NOT>
- Publication and external side effects: <AUTHORIZED_SCOPE_OR_NOT>

TEST AND EFFICIENCY CONTRACT
- Focused tests and durable scenario IDs: <TABLE>
- Representative live baseline and replay plan: <TABLE>
- Deterministic checks and semantic rubrics: <TABLE>
- Boundary budgets and compaction groups: <TABLE>
- Time, token, and AI Unit targets: <TABLE>

EXECUTION RULES
1. Learn first and open the learning register.
2. Validate source contracts before AI Studio authoring.
3. Reconcile environment identity and exact artifact codes before mutation.
4. Build data dependencies before specialists.
5. Complete each specialist before the orchestrator.
6. Complete every app stage, route, boundary, normalizer, and terminal before live QA.
7. Process one workflow sync action at a time until finalSummaryAllowed is true.
8. Run one exact live golden path before broad regression.
9. Repair only the classified responsible owner and rerun only the affected test.
10. Run one canonical configured-mode suite per completed workflow, resolve judges without rerunning, then complete app sync and final summary.
11. Optimize models only after correctness.
12. Learn and clean before completion: merge lifecycle lessons into the canonical playbook, merge operation-level lessons into the matching object references, retire duplicate or stale guidance, reconcile dependencies, update the relevant change records, and verify the documentation owners.

STOP CONDITIONS
- User stop.
- Authentication cannot be recovered through the supported flow.
- Required source, input, permission, or live data is unavailable.
- A newer remote DRAFT would be overwritten without approval.
- Prepared data, publication, external side effects, destructive cleanup, or a material business decision requires new authority.

Do not stop because the task is long, a process is quiet, one test passed or failed, or sync actions remain. Inspect progress evidence before declaring a stall. Do not run broad regression before the golden path.
```

## Verified AI Studio references

Recheck current local CLI help and references when the bundled AI Studio skill changes.

- [AI Studio skill](../../.agents/skills/aistudio/SKILL.md)
- [Workflow authoring](../../.agents/skills/aistudio/references/prompts/workflow-vibe.md)
- [Workflow debugging](../../.agents/skills/aistudio/references/prompts/workflow-debug.md)
- [Workflow test authoring](../../.agents/skills/aistudio/references/prompts/workflow-test-authoring.md)
- [App intake](../../.agents/skills/aistudio/references/prompts/app-ingestion.md)
- [App best practices](../../.agents/skills/aistudio/references/prompts/app-best-practices.md)
- [App authoring](../../.agents/skills/aistudio/references/prompts/app-vibe-master.md)
- [App test authoring](../../.agents/skills/aistudio/references/prompts/app-test-authoring.md)
- [Tool authoring](../../.agents/skills/aistudio/references/prompts/tools-builder.md)
- [Business Object authoring](../../.agents/skills/aistudio/references/prompts/business-object-builder.md)
- [Business Object CLI compatibility](../../.agents/skills/aistudio/references/prompts/business-object-cli-compat.md)
- [Artifact conventions](../../.agents/skills/aistudio/references/prompts/artifact-conventions.md)
- [Workflow node references](../../.agents/skills/aistudio/references/prompts/workflow-node-prompts/index.md)

## Playbook self-verification

After every update:

1. Confirm Instruction 1 remains the first actionable section.
2. Confirm the main body is customer-, tenant-, app-, and data-set agnostic.
3. Confirm app-specific evidence is confined to the case-study or change-log sections.
4. Resolve every local Markdown link.
5. Check code fences and tables.
6. Scan for placeholders outside the copy/paste template.
7. Verify all CLI commands against current local help.
8. Scan for duplicate or contradictory rules.
9. Confirm dependency cleanup guidance did not authorize persistent-state deletion.
10. Confirm the learning and hand-forward gate appears in the build sequence and Definition of Done.
11. Review the diff to ensure the update refined one canonical owner rather than adding another.
12. Confirm detailed GET, POST, request/response JSON, schema, filter, paging and object-key guidance remains in `docs/lessons/objects/` rather than this lifecycle playbook.
12. Record the verification result in the active build handoff.

## Change log

| Date | Build/evidence source | Playbook change | Verification |
| --- | --- | --- | --- |
| 2026-09-17 | Explicit user request during Supplier POST testing | Set terse, direct, professional communication as the canonical default without reducing quality gates. | Scoped document and living-build checks. |
| 2026-09-17 | User clarification in Supplier POST extension; object registry policy history | Made local-sample suitability, documentation cross-reference and provisional-assumption decisions explicit write-test intake evidence; detailed policy remains in the object registry. | Living-build verifier and scoped documentation checks required; no runtime success inferred from guidance. |
| 2026-09-17 | [Supplier first-success GET samples](objects/README.md) | Added capture-once lifecycle rule: retain one first successful BO GET sample per resource object, use saved evidence when the success predates documentation, and never rerun or refresh routine GETs for samples. | Existing BO and baseline JSON only; sample-to-source comparison, JSON parsing, links, living-build positive/negative tests and whitespace checks required. No GET executed. |
| 2026-09-17 | [Supplier object-learning ownership restructure](objects/README.md) | Moved operation-level GET, POST, request/response JSON, schema, filter, paging and object-key guidance to one reference per resource object. Added required registry routing at intake and closeout while preserving this file as the lifecycle and architecture owner. | Living-build contract, registry ownership/link checks, Markdown structure and scoped diff required; prior live GET and documentation receipts reused without runtime calls. |
| 2026-09-17 | API/BO read testing, write-test design and documentation retrieval review; [evidence register](../builds/xdx-supplier-information/api-learning-review.md) | Added cross-domain API/BO contracts, live evidence boundaries, schema-and-vendor-example comparison for generated write tests, and scoped browser-free retrieval diagnosis. Refined sample-ID reuse to permit authorized current-environment references without embedding defaults. | Documentation-only review; live GET evidence retained; four public POST pages retrieved and request examples parsed without a browser. POST execution remains untested. Governance/link/structure checks recorded in the evidence register. |
| 2026-08-26 | Living-playbook review | Generalized the document for every agent-app build; made learning the first instruction; added mandatory capture, refinement, dependency cleanup, anti-entropy, self-verification, and hand-forward gates; retired the app-specific canonical filename. | Passed file, link, structure, terminology, command, and lingering-reference checks. |
| 2026-08-26 | Worktree invocation review | Added the tracked root startup contract, AI Studio skill safeguard, deterministic verifier, fresh-run boundary, and Git propagation rule so every worktree invokes one canonical playbook. | RED test detected the missing verifier; focused contract and negative-fixture checks required before handoff. |
| 2026-08-27 | AltaLink Capital Investment Financial Steward | Added the deterministic-plus-independent-verifier display gate, explicit signed-metric semantics, and repeated numeric-path model-placement rule. | Source and workflow contract tests passed; workflow 4/4 and app 1/1 suites passed on GPT-5 Mini high. |
| 2026-08-27 | Capital Steward Stage 1 efficiency review | Added reusable preflight receipts, proven-path reuse, minimal indexed-source lifecycle, replayability disclosure, locked authority inputs, and stage-scoped optimization deferral. | Living-build contract, Markdown structure, links, terminology, and duplicate-rule checks passed. |
| 2026-08-28 | AltaLink startup-action defect repair | Required widget/app commands to have a real `InvokeAction` workflow-stage route, preserve startup content, and use real lifecycle evidence rather than `Query`-substitute tests; added an explicit synchronizer-blocker boundary for rejected observed paths. | Supervisor DRAFT accepted the new stage route; live app-trigger recording reached the requested sourcing branch; focused material and supplier tests plus the startup app test passed. |
| 2026-08-27 | Capital Steward Stage 2 Explain | Added lifecycle-only no-force reconciliation, runtime-owned Agent output envelopes, bounded normalization for collapsed blank delimited fields, honest handling of non-injectable safety branches, and an exact-prompt inventory gate before final summary. | Source/workflow contracts, Tool/workflow/app validators, workflow 9/9, and app 2/2 passed; six missing exact-prompt cases were run without reopening current app tests, and the non-injectable false path is statically proven and explicitly deferred after two valid-branch observations. |
| 2026-08-27 | Capital Steward Stage 2 branch hand-forward | Added a mutation-aware delivery receipt, documentation-only QA reuse rule, and exact local/remote SHA readback so lesson commits reach the authorized branch without reopening unchanged artifact suites. | Living-build, scoped Markdown/link/terminology/diff checks, authorized branch push, and remote-ref readback required at handoff. |
| 2026-08-27 | Capital Steward origin-level learning promotion | Added isolated default-branch governance promotion so unrelated local commits are never bundled into a learning sync; retired the remaining alternate-environment references from the promoted tree. | Refreshed origin base, focused governance diff, living-build positive/negative tests, single-owner/link/alias checks, and exact remote-ref readback required at handoff. |
| 2026-08-28 | Origin artifact retirement | Retired a branch-specific application bundle after confirming an independent preserved owner. | Scoped inventory, non-consumer check, negative source scan, preserved-owner verification, and origin ref readback required. |
| 2026-08-31 | Session-start handoff governance | Made one tracked active handoff the first review in every new session and extended the root, AI Studio, and verifier gates to prevent bypass. | Living-build verifier plus focused positive and negative contract fixtures. |
| 2026-09-01 | Capital Steward Explain MVP retrieval correction | Added the direct Document Tool collection rule: deterministic full-question builder, one `RAG_DOCUMENT_TOOL` call, fixed-boundary parsing, resolved-key trace proof, and escalation to fan-out only after direct incompleteness evidence. | Focused contract RED/GREEN, workflow validation, and live DRAFT trace returned the resolved active project, all dynamic records, and deterministic totals. |
| 2026-09-01 | Capital Steward Act visible-control repair | Extended the existing InvokeAction owner with an acceptance-time inventory from every visible action through app stage, route case, dependency chain, and terminal owner; future-stage controls must be unavailable or explicitly labeled and handed forward. | Focused route contract failed on the missing Act child, then passed after the minimal parent repair; parent/workflow/app validation, supported UI publication, PUBLISHED readback, and selected-project browser proof pass. |
| 2026-09-01 | Capital Steward M6 workflow-test closeout | Added pre-attachment judge-semantic reconciliation and strengthened quiet-process handling to retain and poll the original CLI session. | Four authorized record-now paths passed 34/34 each; stale Detect and opening-summary rubrics were refreshed with focused reruns; aggregate attachment produced a 14/14 parent suite with zero pending judges. |
| 2026-09-02 | Capital Steward M7 parent-route test synchronization | Clarified that an observed correct route is not a usable record-now artifact when a child-workflow response is persisted as null. Require two retry observations, fetch the current child DRAFT to rule out local/remote drift, then register a scoped recorder-failure deferral; retain independent browser and focused workflow evidence rather than inventing synthetic child output. | Five route recordings, including the new Capitalize route, reached their expected branches twice but retained null child responses; the focused plan became deferred-only with no executable action remaining. |
| 2026-09-16 | Install packet dependency audit | Added build-time canonical dependency assembly, blank project carry-forwards, independent completeness checks, and extracted/installed verification. | Packet source-parity, missing-dependency, tamper, installation and governance regression checks required for delivery. |
| 2026-09-16 | Startup recovery review | Extended package dependency hygiene with baseline, per-phase recovery, upgrade rollback and scoped uninstall instructions retained after installation. | Packaged/installed recovery guide parity, recovery fixture and startup/governance regressions required for delivery. |
