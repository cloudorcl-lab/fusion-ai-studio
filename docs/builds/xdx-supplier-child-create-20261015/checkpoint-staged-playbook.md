# AI Studio Agent App Living Build Playbook

Historical evidence marked E#### is retained in the [private archive locator](ARCHIVED_EVIDENCE.md) after the user-authorized clean restart. It does not establish current deployment or authorize a new run.

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

Complete **Gate 10 — Learn, clean, and hand forward**. That gate owns lesson integration, deduplication, dependency cleanup, verification, change-log evidence and delivery. Apply it to governance tasks as well as app builds; explicitly exclude runtime obligations when no runtime artifacts changed.

**Learning completion gate:** a build is not complete until reusable lessons have been integrated here, dependency drift has been reconciled, and this playbook has passed its own verification checks. “No new lesson” is acceptable only when the build owner explicitly records that the learning review found no evidence-backed change.

## Invocation in every worktree and build

Read the project [BUILD_STANDARD.md](../../BUILD_STANDARD.md) for general execution and measurement requirements before substantive work. It complements this file: the standard owns run metadata, primary time categories, milestones, interaction/usage accounting and delivery reporting; this playbook owns detailed AI Studio lifecycle, source, authority, testing and release gates. Use the same active run records and existing failure/evidence owners.

The tracked root `AGENTS.md` is the automatic Codex entrypoint for this repository. It requires every new Codex session to review `docs/handoffs/ACTIVE_HANDOFF.md` first, and every build, deployment, test cycle, substantial modification, and architecture task to read this playbook and run:

```powershell
pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -PolicyOnly
```

The AI Studio skill repeats the same short gate as a route-specific safeguard. Both entrypoints link here; this file remains the only owner of the detailed lifecycle.

Worktree propagation follows Git history:

1. Commit the changed canonical guidance, entrypoints, verification dependencies and handoff as one scoped governance delivery; unchanged files require no artificial edits.
2. Create future worktrees from a branch that contains that governance commit.
3. Integrate the governance commit into an existing worktree branch before its next build.
4. Continue in the current session after verifying the target checkout/branch, rereading its active handoff and applicable governance, reconciling the current session/task receipt and passing the Startup gate. A new session is optional; worktree creation and governance updates do not require a restart.
5. Treat a worktree that lacks the governance commit or fails the verifier as not ready to build.

At closeout, rerun the verifier after integrating lessons and dependency cleanup. The handoff commit is the invocation mechanism for the next build; uncommitted guidance in another checkout does not propagate.

When reconciling existing checkouts, inventory registered worktrees and locally available branch/ref playbook versions. Select by Git lineage, reviewed content and evidence, rather than worktree name or file modification time. Normalize line endings for content comparison while retaining original byte hashes for provenance. A generated startup seed or ZIP is a delivery snapshot; rebuild it from canonical sources when distribution is requested. Promote verified lessons from uncommitted worktree records at their existing owner, retain their source evidence, and keep unverified code or runtime repairs outside the released baseline. Preserve paused builds and unrelated working-tree changes. This local audit does not establish remote freshness unless remote refs were refreshed.

### Continue in the current session; provide a command when handing off

Worktree creation, governance updates and context checkpoints do not require a new session. At a context checkpoint, save and revalidate the current objective, checkout, evidence, timing and next action before continuing. Reread changed guidance and reconcile the current task receipt; rerun Startup when scope, checkout or reviewed governance changes. Do not treat an in-session directory change as proof that the host session moved. Use the verified target worktree explicitly for commands.

When the user chooses a new session, or the host cannot continue the current one, provide a complete, copyable command to start it. Do not require a restart solely to reload repository instructions that can be read and applied in the current session.

Before handing off, verify the intended existing worktree and branch, save the current handoff/checkpoint/time records, and place the concrete command in both the active handoff and the user-facing response. Use the resolved absolute worktree path, a handoff-first prompt carrying forward the approved objective, and quoting appropriate for the user's shell. Do not create another worktree or require renewed approval of unchanged scope. Explain whether the handoff is user-selected or required by an actual host limitation; a repository governance update is not such a limitation.

PowerShell command template (replace the path and objective with verified values; escape any single quote inside an argument by doubling it):

```powershell
codex -C '<ABSOLUTE_WORKTREE_PATH>' 'Read docs/handoffs/ACTIVE_HANDOFF.md first, then continue the approved <BUILD_OBJECTIVE>.'
```

Verify current local CLI help if the command syntax changes. Providing the command does not prove another session has started or any runtime work has passed. Current-session continuation and new-session entry both require applicable conformance evidence; keep the full build incomplete until its acceptance and Closeout pass.

### Session conformance receipt

MUST apply in every new session and each material task, including repairs and governance work. Policy-only PASS proves instructions are installed, not followed. The default verifier rejects missing session evidence. Repository instructions are the invocation mechanism, not a runtime hook: the checker cannot force a client to invoke it or prove comprehension.

1. Read the handoff first and capture UTC task start in the active time tracker, then read this entire playbook, registry and selected object references. Recover a late start from session metadata and label it retrospective; never backdate an acknowledgement.
2. Put the actual session/task ID, scope, authority, selected references/releases, intended outcomes and required evidence in the existing intake/learning register. Reconcile the previous delivery tail and open actions when resuming.
3. Save a task-specific `xdx_session_<task-id>.json` in the active build directory using the schema below. This is evidence, not a second handoff/playbook. Include reviewed SHA-256 hashes for AGENTS.md, active handoff, canonical playbook, object registry and each selected object reference. Hashes detect drift; they do not prove reading.
4. Cover eight obligation groups exactly once: `learning` (Instruction 1), `intake` (Gate 0 and all intake contracts), `authority` (Gate 1), `objects` (Gate 2 and registry), `verification` (applicable Gates 3–9 and QA), `timing` (time/token controls), `cleanup` (dependency hygiene), `delivery` (Gate 10 and all Definition of Done categories). Explicitly explain excluded activities. Startup permits `planned`; `pass` requires existing local evidence paths; `not-applicable` requires a scope reason. Do not omit app-specific gates silently or run unrelated app tests.
5. Run Startup before substantive work. Update corrections, phase checkpoints and approval waits as they occur. If scope or reviewed guidance changes, reconcile the record and rerun the gate.
6. Before completion, execute missed authorized work or record the blocker. Independently compare intended requirements with evidence, including fields/tasks absent from test inputs. Reconcile every current-status document, label historical results, complete dependency decisions and timing, then set `phase` to `Closeout`. Refresh hashes only after reviewing changed guidance. Closeout rejects planned/unresolved obligations. A blocked handoff must state incomplete; never manufacture PASS.

```powershell
pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -SessionRecord docs/builds/<build-id>/xdx_session_<task-id>.json -SessionId <current-task-id> -Phase Startup
pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -SessionRecord docs/builds/<build-id>/xdx_session_<task-id>.json -SessionId <current-task-id> -Phase Closeout
```

Receipt schema: paths are repository-relative except `repoRoot`; timestamps end in `Z`. Expand `reads`, `objectReferences` and `checks` to their complete inventories.

```json
{
  "schemaVersion": 1,
  "sessionId": "<actual task ID>",
  "repoRoot": "<resolved checkout root>",
  "branch": "<actual branch>",
  "phase": "Startup",
  "startedUtc": "<observed UTC>",
  "checkpointUtc": "<observed UTC>",
  "reads": [{"path": "<reviewed path>", "sha256": "<SHA-256>"}],
  "reviewNotes": "<applied lessons and retrospective limits>",
  "objectReferences": [{"path": "<selected reference>", "release": "<release>"}],
  "noObjectsReason": "<needed only when no objects are in scope>",
  "learningRegister": "docs/builds/<build-id>/intake-and-learning-register.md",
  "failureLedger": "docs/builds/<build-id>/failure-ledger.json",
  "learningTaskId": "<build task identity shared by scoped workers>",
  "learningScope": "<registered scope required for a delegated worker>",
  "timeTracker": "docs/builds/<build-id>/time-tracker.md",
  "checks": [{"id": "<obligation group>", "rule": "<canonical section>", "status": "planned", "reason": "<disposition>", "evidence": []}],
  "unresolved": ["<required action>"],
  "metrics": {"tokens": "<usage or reason unavailable>", "aiUnits": "<usage or reason unavailable>", "timingGaps": "<gaps and cutoff>"}
}
```

Verify policy and session tests, including stale identity/content, missing timing/obligations and incomplete closeout. Keep one canonical lifecycle owner. A checker cannot guarantee compliance by an agent that ignores the entrypoint.

## Document identity

- **Document type:** Living how-to and reference standard
- **Audience:** AI Studio solution architects, builders, QA owners, release owners, and build-orchestration agents
- **Canonical owner:** This file
- **Temporary steward:** The owner of each active agent-app build
- **Applies to:** Every AI Studio agent app and its backing tools, workflows, tests, data, runtime dependencies, and release evidence
- **Last reviewed:** 2026-10-15

## Purpose

This playbook turns lessons from completed builds into preventive controls for all future builds. Its objectives are:

- Better first-pass build quality.
- No architecture or configuration discovery during expensive QA.
- Faster golden-path validation and regression.
- More complete solutions in less elapsed time.
- Less redundant testing and live work without reducing required proof.
- Cleaner dependencies and one authoritative operating standard.
- Continuous improvement from build to build.

Decision priority is accuracy first, completeness second, and elapsed time third. Preserve every required acceptance condition while reducing time. Tokens and AI Units remain diagnostic measures, not success targets, unless the user explicitly sets a cost or capacity constraint. More testing is justified when it resolves a material correctness or coverage risk.

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

#### Continuous failure prevention gate

Learning is part of each implementation cycle, not deferred to Closeout. Maintain one machine-readable `failure-ledger.json` per active build, linked from the intake/learning register. The ledger owns failure status; narrative reviews link to it instead of maintaining competing status. All workers report failures to the coordinator immediately. Capture implementation defects, rejected assumptions, tool/environment errors, semantic QA failures and review findings, including failures caught before remote execution. Distinguish planned acceptance obligations from observed failures.

Declare the approved `scopes` inventory in the ledger; unknown scope names fail the execution gate. Initialize each measured command receipt as an empty file and register its repository-relative path in `commandReceipts` before its first use. The runner rejects unregistered output paths, so later command failures cannot disappear from reconciliation merely by writing to another file.

For every observed failure, before retrying or continuing affected work:

1. Record a stable failure ID, observed UTC, symptom, affected scope, blocked scopes and original evidence. Preserve missing historical output as an explicit evidence gap; never reconstruct it as a verbatim receipt. Command failures must link their exact timing run IDs. Intentional negative tests require a separate expected-failure disposition with reason and evidence.
2. Identify the smallest evidenced cause and check whether an existing canonical rule was omitted. Record the correction and audit all affected sibling routes/functions, not only the failing example. Do not promote a hypothesis as a confirmed cause.
3. Add prevention at the existing owner: operation rules in the object registry/reference, lifecycle rules here, supported CLI usage in its skill. Prefer an automated gate or an actual-artifact regression that reproduces the failure and passes after repair. If automation is unsuitable, record why and require an explicit procedural check with evidence. A generic reminder or a log entry alone does not close the failure.
4. Execute the focused verification, record its command, result, reviewer and SHA-256-bound source/evidence paths, and independently review material corrections. Preserve the evidence surface: local, saved BO, configured test and native app are distinct. Changing or retiring a covered source makes its current verification stale; it does not reopen the historical failure or require a ledger edit before repair. Rerun the affected focused check and attach reviewed current proof before affected execution. A verified local correction does not claim runtime acceptance.
5. Run the learning gate before resuming affected work and at every phase exit. `Startup` validates ledger structure, safe paths and immutable evidence but permits recorded open failures and current source drift so repairs remain possible. `Execute` and `PhaseExit` reject unresolved failures or source drift only for blocked scopes matching the next scope or `*`; unrelated authorized work may continue. `Closeout` rejects every unresolved failure and all stale source verification. Invalid paths or corrupted immutable evidence still block every phase. Never waive an in-scope failure by renaming the activity or its scope.

Qualify repaired build tooling with focused regressions before returning to product work. Promote reusable fixes and their dependencies into a committed baseline before starting a replacement worktree. A replacement starts a fresh current failure ledger and inherits the executable prevention checks; preserve the abandoned attempt's ledger as historical evidence rather than importing its mutable source hashes as new-build obligations. Preserve accepted business-write receipts and consumed allocations across every restart. If a corrected process failure recurs, stop the affected phase and diagnose the shared cause before adding more tooling, tests or product scope; do not let repeated gate bookkeeping displace the representative business journey.

A documented workflow-test needs-judge result is a nonterminal continuation only when an explicit command-bound contract verifies fresh report, request and selected-test evidence, exact invocation and workflow identity, passing deterministic checks, and the same semantic rubric and threshold. Preserve the child exit code and archive the original bytes; never label the pending result PASS. Pending judgment permits repair and attachment work but blocks PhaseExit and Closeout. Resolve it only from attached semantic evidence bound to that exact archived run; a failed judgment remains a ledger failure. Unknown, stale or mismatched output receives no continuation exemption.

Ledger updates must be transactional: write a separate candidate and run `node scripts/update-build-learning.cjs . <active-ledger> <candidate> <build-task-id>`. The updater validates Startup integrity before atomic replacement, preserves the original on rejection and checks task identity and concurrent modification. Do not edit the active ledger in place. When an external process holds a hardlink to the ledger, preserve that alias: validate a distinct candidate, write and sync a private exclusive temporary file in the same directory, recheck the original path, device/inode identity and bytes, then atomically replace only the active path. Reject symlink or path escapes, a candidate sharing the active inode, concurrent replacement or content change, and invalid evidence. Never truncate an aliased inode or remove external staging links. This supports the single-writer contract; it is not an atomic compare-and-set guarantee against arbitrary filesystem writers. Reconcile stale evidence through reviewed changes and focused verification; never refresh hashes merely to pass the gate.

Required commands (run from the verified checkout):

```powershell
node scripts/verify-build-learning.cjs . docs/builds/<build-id>/failure-ledger.json Execute <affected-scope> <build-task-id>
node scripts/verify-build-learning.cjs . docs/builds/<build-id>/failure-ledger.json PhaseExit <affected-scope> <build-task-id>
```

The session verifier requires `failureLedger` and `learningTaskId` and invokes the learning gate at Startup/Closeout. A delegated worker whose session identity differs from the build task must declare its registered `learningScope`; its scoped Closeout invokes `PhaseExit`, while the root build's Closeout always checks every failure. Worker closure cannot imply build completion. For build, test, repair and closeout command execution, use the existing timing runner with `--learning-ledger <path> --learning-scope <scope>` (and `--learning-task <build-task-id>` when different from `--task`). It runs the gate before spawning the command. `repair` permits remediation checks against open failures; it does not authorize business creates, release acceptance or resuming the failed route. Browser actions require the same pre-action gate and must be recorded manually because they do not pass through the command runner. Nonzero recorded commands must be reconciled to a failure or an evidenced intentional negative test before further ordinary execution. Semantic failures with exit code zero still require manual capture. Inspect actual artifact field shapes before writing local probes: BO headers are keyed objects, and retained example payloads may already be parsed objects. Do not apply array/string operations by assumption. Inspect each prerequisite exit status before starting a dependent command, including when both tools are invoked from one orchestration call.

At each slice checkpoint, compare tool/test/review outcomes against the ledger, route reusable lessons immediately, and check the sibling-function inventory. At Closeout, confirm preventive files/tests and updated governance are in the scoped local commit handed forward. This verifier cannot discover unreported semantic failures or force an agent to invoke an entrypoint; independent reconciliation and mandatory invocation remain required. Historical completed ledgers are immutable evidence, not newly failing active tasks.

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

The build checkpoint must define and track these measures. Report defects escaping each phase, reopened phases, required scenarios accepted versus required, and elapsed time before consumption metrics. A smaller test count or lower token total is not evidence of equivalent coverage or a better build:

| Objective | Required measure |
| --- | --- |
| Learn first | Prior lessons reviewed and active learning register created before build work |
| Better first-pass quality | Every source, tool, workflow, route, app stage, output contract, model, test, and runtime boundary is present in the approved contract before remote mutation |
| No QA-discovered architecture | No new node class, source link, app stage, route, or boundary envelope is introduced after the live golden path begins, except a classified defect repair |
| Faster QA | Static and file-backed gates run first; one live golden path precedes broad regression; one canonical suite runs after synchronization is clean |
| Fewer live calls | One representative live data path is captured and compatible paths reuse prepared evidence |
| Diagnostic consumption | Record available tokens and AI Units to investigate bottlenecks; preserve complete evidence and required coverage |
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
- Measurable correctness, completeness and elapsed-time targets; optional explicitly requested cost constraints:

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

- Approval inventory and original user authorization source:
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

#### Upfront approval inventory and reuse

At build intake, identify all foreseeable permissions needed by the approved plan, including sign-in/reauthentication, local and DRAFT authoring, live reads, each business-write budget, diagnostic actions, publication and destructive cleanup. Read existing explicit user approvals first. Request any missing required permissions together at the start, with concrete actions and limits; do not ask again for unchanged actions already authorized. Continue independent authorized work while a required answer is pending. An unforeseen action, expanded scope or expired authorization still needs new approval before that action.

Link one build-local approval inventory (for example, `approvals.json`) from the intake. Each entry records the exact user wording and its message/source reference, when it was received, permitted actions, target environment/artifact or operation, budget, validity/expiry, exclusions and revocation/supersession. Distinguish explicit user statements from the coordinator's interpretation. If a limit was not stated, record that fact instead of inventing unlimited authority. Never record credentials or rewrite later approval as authorization that existed earlier.

At Startup, resumption and delegation, read this inventory alongside the current goal and scope. The session's existing `authority` obligation cites the inventory and records which entries cover the next actions. Reuse applicable approvals, including authorized login, without routine reconfirmation. Before an action, match its target, payload/operation identity where required, remaining write budget and validity to the recorded authority. New approval updates the inventory immediately and is included in the next scoped receipt.

The inventory is evidence of user intent, not an executable permission grant or a substitute for platform review, authentication challenges, current business-state checks or deterministic transaction approval. A platform rejection must be respected; report the exact rejected action and reason, retain the original evidence and follow the supported review/approval path. Never use this record to bypass a rejection, MFA/CAPTCHA, or an application's required payload/revision approval. Collecting permissions upfront does not consume a write budget or authorize replay of an accepted or uncertain operation.

### Test contract

Before selecting scenarios, follow the [testing guide](AI_STUDIO_TESTING_GUIDE.md) for test scope and exclusions; this playbook retains lifecycle and acceptance gates.

- Globally descriptive test name:
- Durable scenario ID:
- Purpose and expected path:
- Data-capture policy:
- Representative live baseline:
- Compatible replay scenarios:
- Deterministic assertions:
- Semantic expected outcome and atomic rubric:
- Boundary size budget and consistency groups:
- Target elapsed time with unchanged accuracy and coverage; tokens/AI Units as diagnostics:
- Required HTML report and final-summary evidence:

Establish configured testability during transaction design, before expanding resource slices or consuming their live-write budgets. For exact request-ID/revision approval flows, prove that the installed runner can carry real prior-step state and express the next exact command with all write boundaries fixture-backed or excluded. A shared conversation ID alone is insufficient when each attempt generates fresh IDs. If the required input-binding capability is missing, record that contract gap and resolve it at the test-runner owner before expansion; never weaken production approval controls or count native-only evidence as the separately required configured judged coverage. A proposed repair is not acceptance evidence.

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

Preserve source-backed business intent throughout repair and QA. A tool validation error does not authorize dropping a known valid business field, changing its value, or reducing acceptance criteria, even when the API marks that field optional. Diagnose and repair the responsible tool/contract; if a supported repair is unavailable, stop and ask for help. Compare the intended field set against the final request and persisted response, including omitted expected fields. Do not define success only as equality for the fields that happened to be submitted. Record any user-approved scope change before applying it.

1. Complete Instruction 1.
2. Open the active learning register.
3. Inventory parent and child resource objects, read their entries from the object learning registry, and record the selected references and releases.
4. Complete business, data, architecture, runtime, test, and learning contracts.
5. Identify product-version-sensitive assumptions that require current CLI or runtime verification.
6. Create executable local tests for source keys, calculations, schemas, cardinality, safety vocabulary, and expected examples.
7. Before implementation, map every approved requirement to its resource, operation, entry route, required fields/output, implementation owner and acceptance evidence. Distinguish ordinary read/list flows from create-confirmation GETs; one does not prove the other. Include field-only follow-ups and failure/duplicate/uncertain outcomes when required. Keep unimplemented rows visibly open, reconcile the matrix at every phase exit and Closeout, and never derive the requirement inventory solely from existing tests.
8. Separate required stage-freeze work from optional research, model sweeps, and later-stage features. Name the later gate for deferred work instead of expanding the current build.

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

1. Validate source files or object schemas locally. For a templated BO request body, instantiate its exact template with typed local values and parse the resulting JSON before remote execution; generic artifact validation alone may miss an unclosed body. This check complements interpolation and path-token validation.
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

#### BO readiness before workflow integration

For each resource slice, build and prove its BO functions before wiring dependent workflow BO nodes. This is a per-dependency gate, not a requirement to finish every BO in the project before any workflow work. Independent workflow design and local state/approval logic may proceed against the frozen interface while the BO gate is open; dependent remote save/runtime acceptance may not.

1. Freeze the BO contract: exact resource/operation, internal keys versus displayed identifiers, parent references, required and conditional writable fields, generated omissions, request types, response shape, filtering/paging, and error/empty behavior. Use the object registry for operation detail.
2. Validate the serialized BO locally, render and parse exact request templates, and check parameter/schema contracts. Artifact validation alone is not live BO proof.
3. Invoke the actual saved BO functions independently of the business workflow using supported tooling: required ordinary collection/search/detail GETs and scoped parent keys; then, where authorized, one POST followed by an independent persisted GET using the returned key. A raw REST call bypassing the BO does not prove its configuration. For local negative/edge coverage, reuse retained responses rather than causing extra business writes.
4. Allocate the write-evidence budget before execution. Direct BO POST proof and native approval-to-POST proof are distinct. If both are required, the plan must provide separately authorized transactions; do not silently spend a one-create budget twice. Reuse existing matching evidence only within its demonstrated artifact, environment and payload boundary. If direct execution conflicts with required app-mediated approval, withhold that POST, mark the gate blocked and resolve the authorized test route before dependent integration. Never replay an accepted POST to obtain another receipt.
5. Hand forward a BO readiness receipt naming function/artifact versions or hashes, target identity without secrets, exact inputs, observed outputs/errors, returned IDs, persisted comparisons, timing and limitations. The integrating owner verifies the evidence against the actual BO. Missing, fixture-only or mismatched live evidence leaves the relevant gate open.
6. After readiness, test the actual workflow producer-to-BO consumer bindings, identifier resolution and native user journey. BO success does not prove workflow state, approval or presentation. Changes to BO contract, function/template, target or producer invalidate the affected proof; repeat only the applicable read/local checks and reconcile write evidence without duplicate creation.

### Delegated build ownership

Delegate bounded work only when useful independent work exists and authority permits delegation. A BO specialist may own both BO build and its local/direct testing; a different reviewer or the coordinating agent must check its receipt before integration. Delegation does not expand business-write authority or replace configured semantic judges.

| Work package | Parallel work allowed | Integration condition |
| --- | --- | --- |
| Resource contract research | Independent references and retained-sample analysis | Reviewed field/key/provenance contract; no speculative live calls |
| BO build and test | Separate BO files/artifacts with independent inputs; local tests may run concurrently | BO readiness receipt and independent review before dependent workflow wiring |
| Workflow logic | Independent modules or proposed patches against frozen BO interfaces | One workflow writer integrates; actual bindings/state/approval gates pass |
| Test design and evidence review | Exact prompts, negative cases, rubric review and retained trace analysis | Approved manifest and current source versions; no unapproved suite expansion |
| App presentation | Local widget/schema work against agreed output contracts | Backing workflow acceptance before native app acceptance |
| Documentation and packaging | Separate owned files or staged proposals | Final source frozen; target-checkout package verification before release |

Assign one writer per file and remote artifact. If several resources share one BO file, one BO owner assembles it; resource specialists return contracts or patch proposals instead of editing or saving it concurrently. Do not split production artifacts solely to increase agent count. Separate Git worktrees do not isolate tenant state, credentials, browser sessions or business records.

Every assignment records task/requirement IDs, exact checkout/branch and allowed paths/artifacts, input dependencies and frozen interface, permitted operations/target, write budget and approval conditions, acceptance commands, output receipt, stop conditions and handoff owner. Give references to approved environment configuration, never copy credentials into messages. Workers follow the same handoff, object-learning and session-receipt gates within their scope.

The coordinator owns dependency order, the mutation queue, one shared-browser owner, fixture/accepted-ID ledger and final integration/Closeout. Serialize writes to the same artifact and all operations sharing a parent/fixture chain; parallelize only genuinely independent authorized actions. Reserve each live operation before dispatch and retain its process/operation handle. On timeout or uncertain outcome, freeze the operation and reconcile by read before any reassignment or retry. Do not let two agents independently create the same fixture or replay another agent's accepted write. Cancel/pause dependent work when its source contract changes.

Measure the critical-path elapsed time and coordination/rework separately where observed. Parallelism is an implementation choice, not evidence of speedup. Inline work remains appropriate for a small change or one shared mutable artifact.

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

Normalize machine-readable fields at that boundary before presentation. In particular, strip sentence punctuation accidentally captured after ISO timestamps. For Email fields extracted from longer unquoted prose, distinguish sentence punctuation from a bare, quoted or explicit field literal at the deterministic field boundary; preserve literal values and reject invalid domain labels rather than silently altering them. Reproduce the observed extraction defect against the actual serialized CODE and qualify both direct/template patches and field-only edits while preserving parent/revision state. Validate required keys and row counts, sort in deterministic code, and align dependent records by stable identifiers instead of trusting model-emitted order.

Include exact application commands in the prepared visible summary, not only in a separate field the renderer may omit. Apply the same presentation contract to every resource. Verify a nonterminal page displays its exact next-page command and a terminal/empty page displays none; verify request/revision commands remain intact. A correct producer value alone does not prove the native widget exposes it.

For conversational transactions, keep read selection separate from each transaction draft patch. Route a named parent into the active child draft explicitly, bind the declared conversation variable at its observed runtime path, and prove field-only follow-ups preserve that owner. Deterministic merge, revision, approval and attempt state must authorize writes; model reconstruction from chat history cannot replace missing state. When the UI advertises exact review, approval or create commands, normalize those full-message commands in one deterministic request owner before routing; incidental model intent or reconstructed fields must not reset the draft. Apply the same rule to supported unambiguous field-only edit commands: route by the named field, merge only its supplied value, and preserve the existing parent even when model extraction supplies a conflicting intent or parent. Test that conflict against actual serialized CODE and the conversation replay. Preserve the existing raw-command, exact-payload and revision gates. For explicit references to the selected parent when preparing a new supplier or child template, resolve the parent from stored selection before considering model-derived IDs or search terms. Apply this precedence to each template route as well as ordinary reads; if no selection exists, ask for one. Preserve explicitly named or numbered alternative parents. Verify after switching between parents and cancelling an earlier draft, with conflicting model extraction supplied to the actual CODE contract. After an uncertain write attempt, every reconciliation or read-error message must preserve that prior uncertainty and distinguish "no new create submitted" from "no create ever attempted"; a pending title alone does not qualify a contradictory description.

Prove reservation survival across the actual failure path before binding a write. A conversation-scoped assignment does not by itself establish persistence after an unhandled job abort or atomic exclusion between concurrent jobs. Use supported error edges and deterministic frozen-result handling where required, preserve the prior attempt identity, and test a later safe request in the same native conversation. Disabled native submission controls plus observed reserved-state preservation establish only the tested ordinary entry-channel boundary; they do not prove universal server locking, arbitrary parallel callers or unhandled-abort durability. Retain those limits and prevent automatic replay after any accepted or uncertain attempt.

Before accepting conversational state, inspect the serialized workflow's declared conversation variables and every reader/writer against the supported [workflow context contract](../../.agents/skills/aistudio/references/prompts/workflow-vibe.md). Direct system chat-history access cannot supply deterministic pending-draft or approval state; model chat-history metadata supplies model context only. A passing local state simulation or undeployed variable repair leaves saved-DRAFT, configured multi-turn and native persistence acceptance open.

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

Do not infer that InitDisplay state is available to the first Query from successful Query-to-Query paging. Test the advertised next-page command as the first Query in a fresh preview. When cross-stage read-state availability is unproven or not observed, a supported bounded read command may carry validated list position explicitly; derive it from the verified offset and returned count, use deterministic ordering, and preserve the original filter for filtered results. Generate the full command deterministically and display it unchanged. Native initial-to-first-Query and subsequent-page proof remains separate from file-backed semantic replay.

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

Process one workflow at a time and one mutating action at a time. Gate numbers identify responsibilities, not a requirement to finish broad regression before live proof: complete the first slice's local/focused checks, prove its Gate 7 live golden path, then expand routes and run required cumulative/final suites. Reuse that current golden-path receipt; do not replay an accepted write.

The approved requirement register and test manifest bound ATLAS actions. Account for every suggested action as required, outside scope, or blocked, with a reason and evidence. An outside-scope suggestion does not authorize execution or block independent approved work. If `finalSummaryAllowed` remains false solely because of documented outside-scope suggestions or a verified supported-tool representation limitation, retain that raw result and a scoped completion receipt proving all approved scenarios current, passed and judged. For a representation limitation, record the tool/version boundary and independently reconcile every affected required obligation to a current executed configured test/step, its observed branch transition and attached passing judge; explain why the actual stage and prior conversation state satisfy the requirement. No required obligation may remain missing, unexecuted or unresolved. Never rewrite the planner result, relabel an in-scope obligation outside scope, or use this exception for a required failure, missing recording, judge or coverage gap. If tooling cannot execute the approved coverage within scope, record a tooling blocker.

```powershell
node .agents\skills\aistudio\scripts\aistudio.js get-workflow-test-sync-plan --file src\workflows\<workflow>.wf --recommended-batch-only true --format focused-json
```

An unresolved state-dependent branch is a prediction, not an observed route. Keep its runtime-validation requirement explicit, including topology-derived branch scenarios; propagate eligibility from the existing routing analysis instead of silently defaulting it to false. Eligibility changes must invalidate stale planning-blocker fingerprints without editing stored blockers or implying executed coverage. Where the supported tooling permits candidate-path bootstrap, use an explicit bounded candidate tied to the exact scenario, input and workflow definition. For observed generic branches without an authoritative suggested input, resolve retained input only from a matching noncustom sync-plan scenario ID and kind; preserve app-stage behavior and input/workflow hash validation. Verify recognition for both app-stage and generic branch scenarios. Retain off-path breakpoints; validate the observed stage, terminal and any explicit target-branch obligation before storing the normal live binding. Reject partial or unexpected execution, ambiguous branch evidence and stale identity, including graph changes during retry recovery. Never manufacture a binding, relabel custom evidence as canonical coverage or change correct application routing to satisfy a prediction. Adoption must reconcile the observed path, its dependent recordable-data metadata and routing-decision context. Rebuild downstream outcome hints from the observed node partition: emit an outcome only when exactly one immediate edge is established; omit ambiguous non-target labels, including labels sharing a successor. Preserve the explicit target-branch obligation and never retain a contradicted predicted hint. Verify canonical recognition, metadata consistency and required replay/judgment separately. Tooling repairs must ship their actual-function, lifecycle and negative regressions with the install packet so future builds inherit the correction.

For model-compacted recordings, follow the existing [workflow test-data envelope policy](../../.agents/skills/aistudio/references/prompts/workflow-test-authoring.md), including its compacted-collection rules. Validate compatibility with downstream request assumptions before apply; a compacted fixture is not evidence of complete live population and requires no new GET merely for documentation.

After each focused action:

1. Complete required recording, replay, compaction, model-data, or judge authoring.
2. Validate only the affected test deterministically.
3. Refresh the focused plan.
4. Continue until `finalSummaryAllowed: true` and no required create/update action remains, or satisfy the documented scoped completion rule above.

Copy scenario identifiers from the current focused plan's `coverageExecution.nextAction.scenarioId`; never reconstruct them from test names, action labels or node codes. Some commands accept aliases that other commands reject. Before dispatching a scenario-ID command, bind the invocation to the plan hash and workflow file and require an exact ID match. Refresh the plan after mutations; a valid hash proves the referenced snapshot, not that it is the newest plan. Reject missing plan evidence, altered IDs/hashes, duplicate flags and a different workflow before the CLI runs.

Choose capture policy from the actual data change. An input-only branch does not justify relabeling an unchanged baseline response as model-generated or inventing response differences to satisfy an override hint. Preserve baseline request/response provenance when replay is compatible. If the new request needs a different live response, ordinary `record-now` can capture an authorized GET-only canonical route without a base fixture or model overrides; prove the full path partition and exclude every write boundary before dispatch. Explicit candidate-path validation requires `requiresRuntimePathValidation: true`; a predicted `pathSource` alone does not establish eligibility. Keep transient replay proof separate from configured semantic acceptance. After a ready baseline is established, use scripts/verify-workflow-test-capture-policy.cjs verifyPositiveBaseline for batch-generated synthetic/replay cases: bind the selected workflow, baseline and public test inventory by hash; reject full replacement data, replay overrides, empty synthetic overrides and identical response overrides before CLI dispatch. The helper is an opt-in established-baseline profile, not an unconditional startup gate; valid no-baseline/no-recordable generation remains governed by the public CLI contract. A structural response difference alone does not establish meaningful test intent: review why each override is necessary, and never remove transport links merely to satisfy a difference check.

Keep FILE producer evidence separate from actual BO input evidence. Output-only FILE overrides can yield blank mocked BO input events even when real CODE producers execute; never replace those events with fixture input metadata or assert blank values as success. Assert the real producer query, parent and paging values in FILE mode, verify the exact serialized producer-to-BO bindings, and retain a separate matching authorized GET recording with actual BO inputs when that boundary proof is required. Reuse adequate current recorded evidence; record only missing proof, never refresh for documentation. Preserve any failed input assertions and state the evidence boundary. This is not a waiver of live BO or configured semantic acceptance. The underlying mock-event cause remains unresolved.


When a topology edit removes nodes and the current CLI rejects an in-place test update because the existing path assertions reference those removed node codes:

1. Confirm the changed workflow itself validates and the latest sync plan identifies the test as obsolete or out of sync.
2. Delete only that source-controlled workflow test through `do-delete-workflow-test --test-file <path>`; keep the deletion recoverable in Git.
3. Refresh the focused sync plan and recreate the scenario from the current topology through the normal single-action loop.
4. Never bypass the stale-path check by hand-editing final test JSON or weakening the current expected path.

Do not run a full suite while in-scope authoring actions or required data continuations remain. Before an expensive regression, run the actual serialized routing/key tests and Query contract gate, then validate every retained fixture through supported local CLI validators on disposable copies. Bind the readiness receipt to source, tests and fixtures; reject it after any covered file changes. Include prior routing and fixture failures as focused negative checks, without weakening runtime assertions.

Verify a proposed literal-output assertion against the actual terminal node. In the installed test planner, semantic rubric prose beginning "Returns exactly ..." can be misclassified as a literal return. When source inspection and the current LLM terminal prove that false classification, preserve the semantic requirement and rephrase the rubric through supported authoring commands; never assert equality to descriptive prose. Retain the failed warning, unchanged input/fixtures/path contract and focused passing result. This is a documented planner limitation, not a framework fix.

Keep planner-owned standard rubric IDs and criterion text unchanged; place additional requirements under unique custom IDs. Inspect the generated test as well as the authoring definition for duplicate rubric IDs before runtime. If malformed generated metadata prevents both supported update and deletion before either can apply a repair, retain the original and source-backed CLI limitation, repair only that metadata locally within authorized repair scope, prove input/data/path/assertions/defaults unchanged, then resume supported validation. This narrow fallback does not permit weaker criteria, hidden state injection or broader framework edits.

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

An accounted deferred scenario may advance to app synchronization only when the latest sync plan reports `finalSummaryAllowed: true` (or meets the scoped completion rule above), the canonical suite is current, deterministic checks pass, and no required judge remains. Do not describe the deferred runtime branch as executed.

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

Validate the supported widget envelope before native acceptance, including the oraInfoDisplay key, patternId, title, description and pattern-specific properties. Finding expected words in a response string does not prove a widget rendered; retain the target app result after loading completes.

Keep retrieved-record and uncreated-draft rendering mutually exclusive and bound to the current output. A draft must not inherit identifiers from a preceding lookup or read-selection state. Explicitly omit identifiers absent from the current verified result, even when terminal chat history is disabled. Test a detail lookup followed by draft preparation and a field-only edit in the same native conversation; verify unchanged fields, revision and request identity, and absence of the prior record number.

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
3. When optimization is in scope, establish a passing semantic baseline first. For an extractor or other intermediate semantic node, inspect its raw output against the prompt-derived field, type and omission contract as well as the final business result. A downstream deterministic correction can preserve the business result while hiding extraction defects. Record those separately; block optimization when the target baseline fails its required contract, and do not copy defective baseline values into expected results.
4. Measure one model-backed node at a time.
5. Compare accuracy and evidence preservation first, complete requirement coverage second, and elapsed/workflow/node latency third. Use tokens and AI Units to diagnose bottlenecks or satisfy an explicit constraint, never to justify weaker acceptance.
6. Reject any candidate that loses required fields, records, grounding, safety, widgets, or user-visible semantics.
7. Apply approved model changes separately.
8. Rerun the affected test and one final scoped regression.

For new optimization runs, freeze a small critical-case screening inventory before candidate execution, including affected structured-output and safety contracts. After each case and required judgment, use `node scripts/screen-model-candidate.cjs <contract.json>` against exact hash-bound, version/run-labeled results. A confirmed contract failure rejects the candidate immediately; pending judges, missing cases and environment errors remain incomplete. Passing screening only permits full regression; it never accepts a placement or replaces combined-placement and final saved-version acceptance. Use separate run labels for screening and full coverage. Do not retroactively relabel earlier full-profile measurements or execute extra business writes to screen a model.

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

### Mandatory AI Agent Studio test context

Every workflow, app, runtime and UI test in this lifecycle MUST run in an AI Agent Studio context that is explicitly bound to the target artifact. Qualifying surfaces include the target workflow's supported Studio test/debug runner, ATLAS invoked for that workflow, and the target application's **Run app preview** or a published-app launch whose Studio artifact identity is recorded. Before sending a test prompt, record the Studio surface, target artifact code and lifecycle state (for example DRAFT preview or published).

The global Fusion **Ask** chat, Oracle Digital Assistant, a generic Ask Oracle link, and every other unrelated chatbot are not AI Agent Studio test surfaces and cannot satisfy runtime or UI acceptance. If a prompt lands in one of those surfaces, stop there, label the attempt rejected for wrong test context, return to the target artifact in AI Agent Studio and rerun only from its bound test surface. Never treat a plausible chatbot response as target-artifact evidence.

Every manual test script must name its intended surface and conversation prerequisite. For app journeys, direct the tester to the target app's **Run app preview** and state whether steps share one conversation. A standalone workflow debugger can omit required app-stage context; its response does not replace native app proof. Verify the actual open surface when investigating a reported failure.

### Agentic App Query routes are non-suspending

Verify intended terminal reachability after structural mutation, layout normalization and saved DRAFT readback, not only before save. Avoid multiplying unrelated transaction stages through serial skip/action switches: structurally impossible state combinations still expand tooling path space. Keep completed transaction branches at their own supported semantic terminal and RETURN, or use phase-guarded linear deterministic stages where equivalent; retain individual joins for essential BO-selection switches. In the 2026-10-15 supplier-child extension, structural paths grew from483,330 to37,937,154 and two metadata commands exceeded five minutes; isolating the child terminal reduced paths to483,996 and bounded formatting/context retrieval completed. This is observed authoring performance, not a claim about the CLI internal algorithm. Inspect actual normalized error branches: sharing a normal terminal may produce END; each persisted error continuation needs a retained explicit terminal RETURN. Evidence: [topology review](../builds/xdx-supplier-child-create-20261015/xdx_address_topology_repair_review.json), [normalization finding](../builds/xdx-supplier-child-create-20261015/xdx_child_error_finding.json), [successful context](../builds/xdx-supplier-child-create-20261015/xdx_child_context_receipt.json). For nested switches, give each switch its own convergence owner before the enclosing join; sharing the same downstream join across nested switches can be normalized into premature END branches. Assert every successful route reaches its stage-specific display terminal and every explicit error RETURN remains terminal. Validator success and non-suspension checks alone do not prove this behavior. At variable boundaries, handle the observed runtime representation: a JSON-stringified assignment may be supplied as an object. Test both forms against actual serialized CODE and give fallible post-attempt transformations a supported error route that preserves the attempt.

Before an application binds a workflow as `applicationMetadata.queryAgent`, resolve the workflow's `Query` stage target and traverse every structurally reachable root and nested edge, including `outcomes`, `convergenceTargetId`, `metadata.loopBackNodeId` and `metadata.errorNodeId`. If any reachable node is `HUMAN` or `WAIT`, the application/workflow contract is incompatible. Fail local validation, save or sync preflight, phase acceptance and final-summary eligibility with a diagnostic that records the application code, workflow code, stage, offending node code and type, and the complete path.

`aiAppsCompatibleFlag`, an app-shaped trigger sent to a workflow debug runner, and passing workflow `HUMAN` or `WAIT` conversation tests do not waive this rule. Those results establish workflow-debug behavior only. Keep a suspending conversation in a standalone workflow that is not an Agentic App `queryAgent`, or redesign every app `Query` invocation to terminate through supported non-suspending nodes.

The first Query-stage acceptance gate for every Agentic App must execute one live expected user path through the target application's **Run app preview** or the published target application. An `InitDisplay` app test, workflow debug test, local expression assertion or other stage cannot substitute for this proof. Do not accept the phase or expand downstream tests until this exact path passes.

### Prove every REST path binding after a producer change

For every `BO_FUNCTION` REST path token, prove before remote save that every incoming route resolves the matching node input from the current authoritative producer to a nonblank, type-valid value. Introducing or changing a resolver, preparer, normalizer or router invalidates prior binding evidence. Rebind every downstream consumer and rerun the focused binding tests before saving the DRAFT.

Validate identifier meaning as well as syntax. Displayed business numbers and internal REST keys may both be numeric. Test the identifier users actually see and type; resolve it through verified source data before constructing a path. Cover ambiguous, absent and conflicting selections without silently using a different record. Resource-specific key mappings belong in the object references.

A child route is not accepted by separately proving its parent lookup and injecting a mocked child response into a downstream normalizer. The configured golden path must execute the child BO node and trace that its path key equals the resolved parent key. Every enabled child BO needs at least one configured case in which the node MUST execute; a suite whose only assertions say the child node does not execute cannot satisfy that child's acceptance gate.

When a replay override suppresses or blanks the BO's input event, retain that evidence and assert the actual upstream producer output plus its exact consumer binding. Keep independent live execution evidence for the path; fixture output alone cannot establish correct request construction. Classify a replay-observability failure separately from an application defect, and preserve strict key equality when moving the assertion to an observable boundary.

Shared validation must inventory every `{pathToken}` in the referenced BO operation and require a matching workflow input. For each route reaching the BO node, it must reject a blank value, missing or unreachable producer, stale pre-transform owner, wrong-resource filter, or incompatible type. Regression fixtures must cover each supported route, including selection-state and self-contained parent-resolution paths, plus mutations for stale bindings, blank parents and missing producers.

Resolve each referenced BO and function locally before claiming this preflight passed; an unresolved definition blocks the gate. Apply binding and path-token checks to nested pipelines with their own entries and lexical producer scope. Prove completed producer output on every incoming consumer route, including error, loop and convergence edges, while preserving documented parallel fan-in and loop-item semantics. Check interpolation delimiter order and nonempty expressions as well as balanced braces. These static checks do not establish runtime values, types or per-iteration aggregation; retain the separate configured/native evidence requirements above.

### Reject known failures before remote execution

Use the repository preflight for every app-bound workflow before a remote save, sync, record-now action or runtime test. The preflight must fail locally when an Agentic App Query route reaches `HUMAN` or `WAIT`, when a REST path token is blank or bound to a stale producer, or when the exact required payload contract is incomplete. A text search or a passing mocked downstream normalizer is insufficient; use graph reachability and execute the actual producer-to-consumer binding contract.

Validate interpolation delimiters before every remote execution. Each `{{...}}` expression must have balanced opening and closing delimiters, including expressions embedded inside a larger prompt. Author expression-bearing changes from literal files, assert the intended replacement count, and inspect the final serialized binding after mutation and save; shell expansion can silently prevent an otherwise valid replacement. For accepted transaction presentation, derive source, created and parent identities from their distinct frozen authoritative fields; a terminal model must not relabel the created ID as the template source. Apply the same deterministic renderer to fresh independent readback and frozen accepted-request recall. Claim verified saved fields only when actual readback verified the accepted attempt; otherwise label them submitted and not verified. Clear stale accepted text on unrelated, uncertain or new-draft responses. Prove accepted recall traverses no write or unnecessary read before verifying its display on the existing accepted record. For display isolation, execute the actual producer-to-terminal selection with prior transaction state present: a clean presentation object alone does not prove the terminal consumes it. File replay can bypass interpolation when a fixture supplies the BO result directly, so a passing replay does not excuse malformed BO inputs. Reject the artifact locally with `WORKFLOW_BINDING_EXPRESSION_MALFORMED`; repair the binding, rerun its discrete contract, and then resume the runtime step without repeating a POST that may already have succeeded.

For Windows repository discovery, pass an existing literal directory to `rg` and put filename patterns in `-g` (for example, `rg -n pattern .agents/skills/aistudio/references/prompts -g "*.md"`). Do not put `*` in the directory argument: PowerShell does not expand that argument for ripgrep. Inventory planned files before reading them and use the retained installed command catalog for exact CLI names.

On Windows, every AI Studio CLI command that reads or writes authenticated tenant state must start with host credential-store access. This includes remote fetch, save, sync, record-now, workflow/app tests and BO execution. Prefer the restricted shell for deterministic file validation and local contract tests when the required measured runner can spawn and persist its receipts there. If that wrapper fails before dispatch with `EPERM`, verify that no child ran, retain the failure and reuse the verified host execution context for that build's measured commands; do not repeatedly rediscover the same boundary or claim its underlying cause is proven. If a command returns `CredWrite failed with Win32 error 1312`, classify it as a local execution-context rejection, do not alter the artifact or authentication configuration, and retry the unchanged command once with host credential access.

After any remote failure that may have crossed a POST boundary, freeze the payload and operation identity. Perform a scoped read-only reconciliation before deciding whether another write is safe. Never rebuild and replay merely because the response is missing, partial or timed out. Two unchanged failures at the same boundary stop remote execution and require a recorded root-cause correction plus a newly passing focused preflight before one further attempt.

### Mandatory first-slice fast-fail gate

Before expanding beyond the first resource into child routes or cumulative suites, require one current acceptance receipt bound to exact source/test versions and the same representative business journey. Scope the required proof to the approved requirement matrix, including ordinary read/list/search/paging obligations:

1. Local Query-contract preflight passes.
2. The target AI Agent Studio **Run app preview** identity is verified and a live Query through the real app-bound workflow reaches its expected terminal response.
3. Configured execution proves the actual BO node and resolved path inputs. Configured multi-turn transaction coverage has attached passing semantic judgments; native-only success, deterministic-only checks and planner deferrals cannot replace it.
4. For transactions, prove prior-step request-ID/revision binding support before spending live-write budget. Cover prepare, field-only edit, review, exact approval/create, reservation, capture, independent persisted GET and native display. Keep write boundaries fixture-backed or excluded in replay; reuse accepted live writes without replenishing allocations.

`InitDisplay`, workflow debug, mocked downstream output and assertions that a BO node did not execute cannot replace the applicable Query/BO proof. Record unresolved obligations in the receipt. A missing runner capability blocks expansion and must be repaired at its existing owner.

For a write slice, finish the matching object-reference review and the exact approved payload contract before the first POST. Apply required-field-only scope when the user selected it; preserve any other approved business fields under Gate 0. Identify tenant-confirmed conditional fields, autogenerated omissions, uniqueness scope, duplicate preflight and independent persisted GET. Record a tenant-rejected minimal payload in the object reference and executable slice test before expanding. Never repeat an accepted create to complete acceptance; use retained write evidence and safe read-only continuation.

### Context continuity and recovery

At Startup, record whether context-usage telemetry, reminder scheduling and reset/compact controls are available. At 70% context, stop starting new work and safely finish or pause the current action. Before 75%, reconcile the active handoff, checkpoint and time tracker. Capture the exact checkout/branch/HEAD, task, accepted record IDs that must never be recreated, running process handles, pending approvals, browser tab/authentication/next deadline and next executable action. Use a supported reset/compact control if available; never invent a control or claim a reset occurred.

If telemetry or controls are unavailable, record that limitation, checkpoint at every completed requirement slice and before long waits or external mutations, and leave an explicit new-session handoff if continuity cannot be maintained. After context recovery, read the handoff first, verify checkout, check the same browser tab when acceptance is pending, poll retained processes and revalidate Startup before substantive work. The checkpoint template records this state; it does not automate enforcement.

### Mandatory signed-in browser keep-alive

When signed-in target-app acceptance is pending and CLI work continues, retain one identified AI Agent Studio tab and observe that same tab between remote action groups and at least once every five minutes. AX reads, screenshots and other passive observations establish visible state but are not session activity. During prolonged CLI work, at four-minute intervals use a safe, already-authorized read-only request or navigation on the clean target-app surface, then observe its completed result and authentication state; neither activity nor observation guarantees session renewal. Record UTC timestamp, tab identity, visible Studio artifact context, authentication state, the actual request/navigation and result separately from passive observation in the active timing log. Track the next due UTC time and check it before and after long tool waits, context recovery and approval-pending intervals while the agent remains active. At Startup, inventory supported reminder controls; schedule a four-minute reminder when available so the five-minute observation limit has a margin. Record the reminder handle or its unavailability. A written deadline is not proof of automated keep-alive. Without a supported reminder, check manually before each action group and use tool waits of at most 60 seconds while acceptance is pending. During a blocked or inactive turn, record that continuity is unverified and recheck authentication before resuming. Never issue a POST or other business mutation solely for keep-alive, reload a dirty draft, or use token/DOM workarounds. If no safe authorized activity is available, preserve the draft, record that limitation and use non-destructive observation without claiming renewal. CLI token health does not prove the browser session is alive. A logout, wrong application or unrelated chatbot stops target-app testing until the same target context is visibly restored.

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
- For labeled app runs, attachment infers the source report's run label and rejects a conflicting requested label. Select exact app/workflow labels and saved workflow version in the final summary. When repairing a historical aggregate, use `node scripts/refresh-test-report-provenance.cjs <manifest.json>` with explicit source identities; never rerun tests to refresh prose or silently substitute generic latest pointers.
- Do not run deterministic mode after the final configured-mode suite.
- Do not run workspace-wide suites for a focused workflow or panel request.
- Do not run app sync for workflow-only scope.
- Record one representative path and replay compatible paths.
- Before claiming replay savings, classify recordable versus non-recordable nodes. File mode replays supported recorded boundaries but may still execute model-backed Agent or LLM nodes.
- Do not repeat live data calls for a test-only assertion change.
- Do not run model sweeps while architecture, sync, or semantics are unstable.
- Do not run a model sweep for every incremental stage when a current evidence-backed placement already satisfies the same accuracy contract; defer it to the named performance or release gate.
- After a classified failure, run only the affected test until it passes. For incremental CODE-body changes, use `node scripts/plan-affected-workflow-tests.cjs --baseline <last-verified-commit> --workflow src/workflows/<workflow>.wf --tests test/workflows/<workflow>` as a read-only development aid. A test is excluded only when every step explicitly forbids every changed node and the change has positive coverage elsewhere. Graph/global/BO/binding/non-CODE/other repository changes select all; malformed or unsafe inputs block. ATLAS remains authoritative: union its required actions with this plan, preserve mutation authorization and never replay an accepted create. This local Git plan cannot detect tenant/environment drift and never replaces final configured coverage.
- After a CLI test update, verify the terminal against the current graph and observed result. Coverage partitions are sets, not execution sequences: the bundled CLI resolves the unique downstream asserted terminal and rejects ambiguous/disconnected paths. Preserve the semantic judge and existing hash/binding checks. Do not reorder workflow declarations to compensate for tooling inference; repair the shared owner and run `node --test tests/test-workflow-terminal.cjs`. Retained observed metadata alone cannot override the current graph.
- Before judge attachment, compare each expected outcome with the current
  terminal route semantics. A sync-current path may still carry a stale
  milestone rubric; refresh only that judge contract and rerun only its
  affected test.
- Before the final summary, reconcile every approved user prompt against the source-controlled test inventory. Preserve the exact wording, displayed identifier, preceding steps and conversation continuity; an equivalent-looking internal-ID prompt does not cover a business-number prompt. Add and run only missing exact-prompt cases, then attach their judges once; do not reopen already-current artifact or app tests. For user-reported manual results, retain the prompt, expected result, actual response/error, target surface and known preceding sequence. Mark missing information as unreported rather than inferred; record recording time separately from unknown execution time. Preserve original failures alongside repair and retest results, and distinguish user confirmation from agent-observed evidence. A recording-only instruction does not authorize diagnosis or repair until the user changes that scope.
- Use final-summary commands and existing HTML reports rather than rebuilding evidence from large JSON or rerunning tests.
- Do not rerun artifact suites for a documentation-only learning hand-forward. Run the living-build verifier and scoped document, link, terminology, and diff checks, then verify the exact remote SHA after the authorized push.

## Time, token, and AI Unit controls

### MUST: continuous timing and reconciliation

When the user directs unattended work with no waiting, reuse standing login authority and attempt the normal supported sign-in. If a human-only challenge or missing authority blocks progress, record the observed stop time and blocker, close active timing intervals, and end the run without polling or an open human-wait interval. A later turn begins a new observed interval; inter-turn time is not work. Historical missing boundaries remain qualified and must not be repaired by inventing continuous effort.

Every build, test cycle, repair and governance task MUST maintain the active build's `time-tracker.md` from its first action. Record UTC start, phase checkpoints, pause/resume or approval-pending intervals, and a delivery checkpoint before reporting completion or handing off. Include authoring, documentation, debugging, rework, verification and closeout, not only successful API calls.

The tracker MUST distinguish observed task/turn elapsed time, tool or BO invocation elapsed time, inter-turn gaps and overlapping work. Never add nested tool durations, API receipts or parallel-agent durations to enclosing elapsed time. An approval may remain pending during independent active work; record that as active execution with an approval-pending tag, not as overlapping required-user wait or human effort.

Keep one authoritative build ledger in the active `docs/builds/<run-id>/` directory for BUILD_STANDARD.md accounting. Link the canonical failure ledger and command receipts rather than copy mutable status. Primary wall-time categories are mutually exclusive: active execution (including ordinary tools), blocking tool/environment wait, required-user wait, scheduling/agent idle, and paused/interrupted time. Observe transitions as they occur; leave missing timing or scheduling telemetry as labeled gaps. Existing command categories and activity-kind intervals are separate diagnostic dimensions that can overlap. Their totals are not the primary category partition and must not be added as labor.

Record the outcome, scope, observable success criteria, source/prompt/template/tool versions, initial branch/commit, start UTC and timezone before substantive work. Record timestamped prerequisite, first representative result, full implementation/generation, validation and handoff milestones. Track necessary versus repeated interactions, first-pass check results, local/stub versus live proof and reliable parent/subagent/service usage. Rework is a measured subset of primary time, never another elapsed category. Report first-result and verified-delivery time with gaps and cutoff; design/document checks do not establish an application end-to-end result. Keep this accounting lightweight and preserve applicable authorization.

Use `node scripts/measure-build-command.cjs --output docs/builds/<build-id>/commands.jsonl --task <task-id> --activity <activity-id> --phase <phase> --category test --label <safe-label> --learning-ledger docs/builds/<build-id>/failure-ledger.json --learning-scope <registered-scope> -- node <test-script>` for command intervals. Initialize and register the receipt under the continuous failure prevention gate before first use. Run `--help` for category-specific gates, dependency, overlap and rerun metadata. The wrapper records UTC, monotonic elapsed and exit state, executes without a shell, and persists no raw arguments, environment or process output. Metadata must contain no secrets. Group events by runId; unmatched starts mean unknown completion. It does not measure unwrapped work, tokens, AI Units, browser renewal or process-tree termination. Use its `interval` mode for observed human, approval and wait boundaries, `outcome` for evidence-backed semantic dispositions, and `report` for overlap-aware coverage, open/stale intervals and unallocated gaps. Preserve raw process exit separately from semantic acceptance; a needs-judge exit is not a failed workflow. Missing historical elapsed values may be derived from retained start/end timestamps and must remain labeled as such. Continue the human-readable tracker for task boundaries, waits and unallocated gaps.

For each activity, record a stable activity ID, phase, category (build, test, repair, coordination, wait or closeout), observed UTC start/end, outcome, evidence and parent/overlap IDs. Prefer tool-emitted timing when available; otherwise record explicit boundaries as work proceeds. Keep an unallocated category for intervals without evidence. Phase windows are elapsed time, not a build-versus-test labor split. Compare prior runs only with declared scope, start/end cutoffs and acceptance boundaries; group phases with missing timestamps instead of allocating invented durations.

Use the existing timing CLI's `interval` mode for unwrapped execution, review, evidence-capture, coordination, context-recovery and human-wait boundaries; use `--activity-kind` for measured commands. Start/end observations are recorded as they occur. Its `report` mode unions overlaps by activity kind and separates work during human waits, wait without observed work, and unallocated time. Category totals overlap and must not be summed as labor. Keep retrospective recovery explicitly labeled with source timestamps rather than backdating live interval events.

Maintain one hash-bound requirement/evidence manifest for current status. `node scripts/build-evidence-status.cjs <manifest.json> <status|requirements|gaps|closeout> <json|md>` renders all views from that owner and blocks missing, stale or mismatched evidence. It verifies only declared local evidence, not live state or an independently complete requirement inventory. Human handoffs retain authority, recovery and next actions; generated views must not become competing editable status owners. Freeze sources before one consolidated final review and reconcile the delivery tail explicitly.

Missing tracking MUST be reconstructed from available session timestamps and retained receipts during the current task. Label retrospective values, cite evidence and its cutoff, retain earlier history, and state the reason for every unrecoverable interval. Never invent start times, active labor, token usage or AI Units; do not rerun live operations solely to recover timing.

Before completion, the agent MUST reconcile the tracker through the delivery checkpoint, record available input/output/cached tokens and AI Units (or why unavailable), link it from the active handoff, and report material gaps. The final-response/commit tail after that checkpoint remains explicitly outside the captured interval until a later session can recover it. A missing tracker or unexplained timing gap blocks completion. The living-build verifier protects this policy; task-level reconciliation remains an evidence review obligation.

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

Before promoting retained evidence into an existing checkout, inventory destination collisions. Preserve differing existing bytes independently, then merge only reviewed task-owned files and verify their hashes. An exclusive directory-copy failure is not proof that nothing was copied; inspect prior completed steps before retry.

For approved Windows worktree purges, use terminating PowerShell errors and verify physical path and Git registration separately before writing PASS. Verify branch absence only when branch deletion was authorized; retained checkpoint branches are valid audit history. Normal Git removal can unregister a checkout while leaving readonly directories or a hidden `.git` pointer. After preserved-state and exact-path checks, clear only the blocking attributes on those owned residuals and remove them with native PowerShell. Process exit alone does not prove removal.

Check the target item itself and directory descendants for the explicit `ReparsePoint` attribute bit before retirement. Do not rely on `Get-ChildItem -LiteralPath <file> -Attributes ReparsePoint` to filter an explicitly named file: it can return that ordinary file. Verify file and directory targets independently before deletion.

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

- [ ] Business, data, architecture, runtime, test, and learning contracts are complete. The requirement-to-evidence matrix contains no unresolved required row, including required reads not exercised by create confirmation.
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
- [ ] Every required workflow sync plan permits final summary or meets the documented Gate 6 scoped completion rule; raw planner results and scope reconciliation are retained.
- [ ] Zero required tests failed.
- [ ] Zero required judges remain.
- [ ] App synchronization has no required backing action.
- [ ] Required app panel tests and widget contracts passed.
- [ ] Scoped final summaries and HTML reports are current.
- [ ] Timings, tokens, AI Units, and model placement are recorded. Reconcile the active time tracker through a delivery checkpoint, link it in the handoff, and explain every gap under the mandatory timing policy.

### Dependency hygiene

- [ ] Every retained dependency has an owner, consumer, and reason.
- [ ] Superseded internal paths and references were retired or have a documented decision.
- [ ] Compatibility exceptions have active evidence and retirement triggers.
- [ ] Scratch and temporary artifacts were cleaned after evidence preservation.
- [ ] No persistent-state or external-contract cleanup occurred without scoped authority.
- [ ] This file remains the single canonical playbook.

## Copy/paste kickoff prompt for every new build

Use the versioned [object lifecycle build model](../build-models/object-lifecycle/README.md) for the execution prompt and plan. Fill and pin the selected version in the tracked build directory. The completed plan owns scope; this playbook owns lifecycle. For cleanup, use the [artifact purge model](../build-models/artifact-purge/README.md). Do not maintain a second kickoff prompt here.

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
6. Confine placeholders to labeled schemas, intake fields and command/templates; examples are not executable runtime inputs.
7. Verify added or changed CLI commands against current local help. Reuse recorded command verification when the command and CLI version are unchanged; revalidate on version drift or contradictory behavior.
8. Scan for duplicate or contradictory rules.
9. Confirm dependency cleanup guidance did not authorize persistent-state deletion.
10. Confirm the learning and hand-forward gate appears in the build sequence and Definition of Done.
11. Review the diff to ensure the update refined one canonical owner rather than adding another.
12. Confirm detailed GET, POST, request/response JSON, schema, filter, paging and object-key guidance remains in `docs/lessons/objects/` rather than this lifecycle playbook.
13. Record the verification result in the active build handoff.

## Change log

| Date | Evidence | Change | Verification |
| --- | --- | --- | --- |
| 2026-10-14 | User instruction: required creation fields only; exclude optional fields, DFFs and KFFs; use a testing guide | Add the testing-guide scope owner and link it from the test contract without duplicating its rules. | Scoped link/content review and living-build Startup gate; no new product acceptance claim. |
| 2026-10-14 | User-supplied execution/tracking assets; build-standard design-update record | Promote root BUILD_STANDARD.md as general execution/measurement owner; add AGENTS.md invocation, reconcile exclusive primary timing with nested diagnostic intervals, and carry the standard in future install packets. Existing AI Studio lifecycle gates remain here. | Scoped document, policy/session, existing governance and install-packet checks; no application or tenant activity. |
| 2026-10-13 | User-authorized clean local restart; [retirement record](../builds/xdx-clean-restart-20261013/purge-plan.md) | Retain reusable governance while moving retired attempt artifacts/history and raw provenance to a verified independent archive. Replace removed-source links with archival citations and refine literal-file reparse checks at the existing cleanup owner. | File/history preservation, scoped path regression, independent registration/ref/physical absence and immutable first-GET JSON checks; no tenant cleanup or runtime acceptance. |
| 2026-10-12 | Root/worktree reconciliation (archived evidence E0001) and retained source snapshots | Confirm latest locally available playbook lineage; consolidate closeout/first-slice ownership, restore gated timing flags, separate approved payload scope from required-only scope, constrain branch-deletion checks to authority, and remove app-specific main-path evidence. Clarify declared conversational state using the existing workflow context contract. | Scoped document, policy/session, timing and package checks in the audit; no tenant execution or acceptance of worktree-only CLI/state repairs. |
| 2026-09-29 | User-directed reset and lesson application (archived evidence E0002) | Require configured and judged first-slice acceptance before expansion; explicit no-wait stop boundaries; preserve and qualify reusable tooling before retirement. | Recovery receipts separate local checks from replacement acceptance; historical timing remains qualified. |
| 2026-09-28 | Supplier Core restart F32 recurrence, preflight proof (archived evidence E0003) | Add opt-in established-baseline capture-policy preflight; preserve valid startup/no-baseline routes and exact raw provenance. | Actual rejected command blocked locally, corrected replay accepted,17focused plus15existing checks pass. Portable delivery integration remains a Closeout obligation. |
| 2026-09-28 | Supplier Core restart F39, bounded repair proof (archived evidence E0004) | Separate FILE producer checks from actual GET input proof; never substitute fixture metadata for runtime inputs. Correct judge expectations to explicit output requirements. | Exact-name actual GET q/limit/offset and140FILE checks passed; configured judgment remains pending. |
| 2026-09-28 | Supplier Core restart F37, closure proof (archived evidence E0005) | Propagate unresolved flat topology-branch eligibility through existing candidate checks and blocker identity. Rebuild observed routing metadata from unique immediate edges; omit ambiguous non-target labels while preserving exact targets. | 47 candidate/metadata/recording regressions and independent review pass, including generic branch retained-input adoption. Site GET-only observation, deterministic FILE replay and corrected canonical recognition retained. All15 existing capture/rubric owners unchanged. Full configured semantic acceptance remains pending. |
| 2026-09-28 | Supplier Core scenario identity preflight (archived evidence E0006), F16/F20 | Require exact scenario IDs from the current focused plan, with plan hash and workflow checks before scenario commands. Command-specific aliases must not be reconstructed from test names. | Eight local identity checks and existing batch regressions pass; no tenant calls. Plan recency and full configured acceptance remain separate obligations. |
| 2026-09-28 | Supplier Core restart capture-mode proof (archived evidence E0007), native paging repair (archived evidence E0008), rubric wording proof (archived evidence E0009), rubric identity proof (archived evidence E0010) | Refine existing capture policy, visible-command preparation and test authoring rules: preserve response provenance; require actual candidate eligibility; prepare commands in summaries across resources; distinguish semantic criteria from literal-return heuristics and preserve standard rubric ownership. | GET-only recording and focused FILE checks pass; native greeting/list/next/terminal paging pass on86564577. Documented planner limitations remain; full configured/stateful coverage and optimization are not implied. |
| 2026-09-28 | Supplier Core display binding regression (archived evidence E0011), native retest (archived evidence E0012), and current failure ledger F21/F30 | Refine existing interpolation and Windows execution-context rules: assert literal replacements and final terminal input selection; reuse the verified measured-runner context after pre-dispatch EPERM. | Actual serialized contains/exact/page selection preserves accepted state without exposing it; graph/Query preflight and same-conversation native contains retest pass. Configured suite and full build acceptance remain separate. |
| 2026-09-28 | Stopped-build analysis and retained repair (archived evidence E0013) | Separate historical failure closure from scoped current source verification; qualify and commit reusable tooling before a replacement build. Retain bounded observed-path bootstrap, dependent metadata reconciliation and packaged regressions. | Planner40 tests and canonical InitDisplay34 checks plus7 semantic criteria passed; learning verifier21 tests and runner/continuation regressions passed. The product attempt was abandoned; no full workflow acceptance claim. |
| 2026-09-28 | Handled-error native diagnostic (archived evidence E0014) and fresh-preview positional paging (archived evidence E0015) | Refine conversational attempt durability limits and first-Query cross-stage paging proof; include supported error edges in Query reachability. | Ordinary native handled-error freezing and fresh-preview pages passed; exact source preservation and local regressions retained. Current-version configured semantic replay remains pending; no universal lock, unhandled-abort or POST acceptance claim. |
| 2026-09-28 | Supplier Core user directive after exact diagnostic approval interruption; build-local approvals inventory | Add upfront permission inventory, original-wording provenance and reuse through the existing authority obligation. Preserve new-scope and platform-review boundaries; no retroactive authorization. | Focused policy/template review and living-build Startup validation; inventory records authority, not runtime acceptance. |
| 2026-09-28 | User-approved continuous learning intervention; preserved attempt and corrective analysis (archived evidence E0016) | Make evidence-bound failure capture, canonical prevention, scoped resume gates and phase-exit reconciliation mandatory during implementation. Integrate session/command gates; preserve semantic failure outcomes and require registered command receipts. | Learning gate, runner, session, policy and startup regressions; independent bypass review; packaged dependency verification. The original ledger remains in the hash-verified private archive; business acceptance remains separate. |
| 2026-09-28 | Supplier worktree retirement audit (archived evidence E0017) | Promote previously worktree-only uncertainty wording, representation-limit reconciliation, fixture readiness, raw-output, active keep-alive and semantic-outcome refinements while retaining newer base screening/report/timing controls. | Retained commit868e10b and verified private archive; local policy/link/first-sample checks. No new tenant execution or write authority. |

| 2026-09-27 | Supplier Core pending-outcome adjudication (archived evidence E0018) and reviewed repair (archived evidence E0019) | Refined the existing conversational transaction-state owner: later error messages must preserve an uncertain prior attempt and distinguish no new create from no earlier attempt. | Independent review found contradictory deterministic wording despite safe no-replay state. Eight focused and114 total local checks passed; four-message-only preservation and DRAFT readback verified. Configured acceptance and Closeout remain separate. |
| 2026-09-26 | Supplier Core priority fixes (archived evidence E0020) | Refined existing timing and regression owners: explicit interval/outcome receipts, overlap/gap reporting, hash-bound local fixture/routing readiness and raw intermediate-output accuracy before model optimization. | Historical mixed timing schemas and retained extraction defects motivated these controls; task verification and optimization disposition remain in the linked build evidence. No business POST or runtime model change was needed. |
| 2026-09-25 | Supplier Core user keep-alive correction; native verification (archived evidence E0021) and timing evidence (archived evidence E0022) | Refined the existing signed-in browser keep-alive owner: distinguish passive observation from safe authorized read-only activity, retain four-minute activity/reminder margin and five-minute observation limit, and never guarantee renewal or use writes, dirty reloads or token/DOM workarounds. | Session expiry observed21:57Z despite passive checks; user restored login and corrected the lapse22:02Z. Native read-only verification resumed; policy/session checks required. This is an evidence-backed control correction, not a demonstrated guarantee against expiry. |
| 2026-09-25 | Supplier Core representation review (archived evidence E0023) and independent executed coverage (archived evidence E0024) | Refined the existing Gate6 scoped-completion rule for verified supported-tool representation limits; retained all required obligations, actual stage/state semantics, attached judges and raw planner status. | DRAFT86301560 workflow19/19 with128 attached judgments and app1/1 passed; independent43-obligation review verified245 mapped trace transitions and70 archived hashes. Raw planner false retained; model optimization/final regression remain separate. |
| 2026-09-27 | Tooling efficiency (archived evidence E0025) | Add prospective fail-fast candidate screening, exact labeled report selection, one hash-bound status manifest and fine activity/wait overlap reporting. Preserve complete final acceptance and historical evidence. | Local failure/provenance/coverage regressions and installed-packet checks; live native parser integration and future speed savings are not claimed. |
| 2026-09-25 | Implemented build-process optimizations (archived evidence E0026) | Repair terminal inference at the CLI owner; add conservative affected-test planning and shell-free command timing; activate their regressions in the distributable packet. Batch settled tooling/governance before packaging; verify installed and target-checkout source parity. | Local actual-function regressions, retained path contracts, planner/timing negative fixtures and installed packet verification; future end-to-end savings unmeasured. |
| 2026-09-25 | Supplier Core BO-first introspection amendment (archived evidence E0027) | Gate independent BO contract/direct-function proof before dependent workflow integration; define scoped delegation, single writers, mutation ownership, write-budget separation and independent receipt review. | Policy negative fixtures, startup/package checks and documentation review; no new tenant execution or claimed delegation speedup. |
| 2026-09-25 | Supplier Core manual failure and learning review (archived evidence E0028) | Close repository TODOs with shared continuity/capability controls, checkpoint templates and POST-purpose prevention regression. Refine existing test-surface, REST-binding and exact-prompt owners: preserve user identifier semantics and conversation prerequisites; retain manual failure/retest provenance; distinguish replay input visibility from live request proof. | Actual-CODE RED/GREEN, native repaired steps1-3, configured358/358 assertions with all judges, and user-confirmed6/6 manual tests; documentation governance checks retained in the learning receipt. |
| 2026-09-24 | Next-run governance audit (archived evidence E0029) | Reconcile live-first test order and scoped ATLAS completion; consolidate kickoff into versioned models; reuse unchanged command evidence | Policy/session regressions and scoped document review; future run speed unmeasured |
| 2026-09-25 | Supplier Core P5 replay repairs | Refine existing conversation and terminal-order owners: preserve explicit field edits against conflicting extraction; recheck semantic terminal inference after declaration reordering. | Retained address edit routing failure, actual-CODE child edit contract, and repaired four-step address replay474/474 on DRAFT86232573. No accepted POST replayed. |
| 2026-09-24 | Timestamped retry introspection (archived evidence E0030) | Prioritize accuracy/completeness/elapsed time; require independent requirement coverage, complete representative transaction proof, activity-level timing and explicit keep-alive continuity limits. Promote retained retry amendments into base without merging runtime artifacts. | Local governance regression and document checks recorded in the introspection verification receipt; future-build speed and scheduler automation are unproven. |
| 2026-09-24 | XDX Supplier Lifecycle retry P3-P7 corrections and final read acceptance | Refine existing source, state, native-widget and test owners with exact rendered-body JSON validation, separate read/transaction patch state, canonical widget envelope checks, observed-terminal ordering after test updates and deterministic ownership of exact transaction control commands. | Retained P3-P7 acceptance, eleven local contracts, retained 19-case slice suite, focused command-repair replay and native review/approval/edit/read regression; final cumulative acceptance tracked in the build receipt. No accepted POST repeated. |
| 2026-09-23 | XDX Supplier Lifecycle rework-concentration audit | Make the first real app Query plus configured BO route a prerequisite for suite expansion; require five-minute same-tab Studio keep-alive while browser acceptance is pending. | Root and skill require the reusable Query preflight; living-build negative fixtures reject missing policy, missing skill instruction and missing validator; current workflow and validator regression suite pass. |
| 2026-09-23 | XDX Supplier Lifecycle malformed child binding and controlled POST recovery | Require balanced interpolation validation before remote execution, because fixture replay can bypass malformed BO inputs; preserve the read-only reconciliation rule before any retry after an uncertain POST boundary. | Query validator rejects malformed delimiters, missing producers, blank path tokens and reachable waits; corrected current workflow passes; accepted live creates were not repeated. |
| 2026-09-22 | XDX Supplier Lifecycle repeated-rejection review | Require reusable local Query graph and REST-binding preflight, host credential-store execution for authenticated AI Studio CLI commands, and read-only reconciliation after any uncertain POST boundary. | Query guard negative fixtures for reachable Human, Wait, loopback and nested suspension; XDX child producer/consumer tests for address, site and contact; current workflow preflight and focused contract suite. |
| 2026-09-22 | Explicit user correction during XDX Supplier Lifecycle signed-in testing | Require every runtime/UI test to originate from an AI Agent Studio surface bound to the target artifact. Reject global Fusion Ask, Digital Assistant and other chatbot evidence. | XDX draft app identity and DRAFT state verified in the Applications list; first query run from **Run app preview**; generic Fusion Ask attempt retained only as rejected-context evidence. |
| 2026-09-22 | XDX Supplier Lifecycle Agent repeated runtime-boundary audit | Declare Agentic App Query routes non-suspending; require structural traversal for reachable `HUMAN`/`WAIT` nodes and a live target-app Query golden path before phase acceptance. | Independent audit showed P1 used a workflow-debug Human continuation while the only app test exercised `InitDisplay`; target DRAFT preview rejected the reachable Human/wait architecture. |
| 2026-09-22 | XDX Supplier Lifecycle child-route 404 audit | Require route-complete REST path-token binding proof after every producer change and configured child-node execution evidence before DRAFT save or phase acceptance. | Independent audit found the new prepared parent state was not connected to address/site/contact BO inputs; local tests had injected child responses after the skipped boundary. |
| 2026-09-22 | Explicit user correction after supplier worktree bootstrap | Removed mandatory fresh-session boundaries for worktree creation, governance changes and context checkpoints. Require in-session rereview, checkout verification and current-task Startup instead; retain optional restart commands. Supersedes the restart requirement in the 2026-09-18 and 2026-08-26 history rows. | Policy and session regressions, startup package checks and scoped governance Closeout recorded in the supplier build evidence. |
| 2026-09-18 | User requested an executable restart command after a directory-only handoff | Require a verified, shell-quoted fresh-session command in the handoff and user response at every restart boundary; preserve approved scope. | Local codex help, exact path/branch, command parsing, documentation and session gates. |
| 2026-09-17 | Supplier compliance audit | Require a current session conformance receipt with reviewed hashes, all obligation dispositions, timing and evidence; distinguish policy installation from execution; reject incomplete closeout. Reconcile status documents and outstanding requested activities. | Policy/session positive and negative checks; missed evidence recovery; scoped delivery review. |
| 2026-09-17 | Partial Supplier POST timing | Require continuous timing, retrospective recovery, gap/overlap accounting and delivery checkpoints. | Initial heading-only test was insufficient; session conformance now checks actual tracker and dispositions. |
| 2026-09-17 | SupplierType omission after CLI placeholder false positive | Prohibit silently dropping source-backed business fields to satisfy tools; require intended-field coverage plus persisted-value verification and repair/help escalation. | CLI regression must fail before repair and pass afterward; restored BO field and live correction/create/read-back required. |
| 2026-09-17 | Explicit user request during Supplier POST testing | Set terse, direct, professional communication as the canonical default without reducing quality gates. | Scoped document and living-build checks. |
| 2026-09-17 | User clarification in Supplier POST extension; object registry policy history | Made local-sample suitability, documentation cross-reference and provisional-assumption decisions explicit write-test intake evidence; detailed policy remains in the object registry. | Living-build verifier and scoped documentation checks required; no runtime success inferred from guidance. |
| 2026-09-17 | [Supplier first-success GET samples](objects/README.md) | Added capture-once lifecycle rule: retain one first successful BO GET sample per resource object, use saved evidence when the success predates documentation, and never rerun or refresh routine GETs for samples. | Existing BO and baseline JSON only; sample-to-source comparison, JSON parsing, links, living-build positive/negative tests and whitespace checks required. No GET executed. |
| 2026-09-17 | [Supplier object-learning ownership restructure](objects/README.md) | Moved operation-level GET, POST, request/response JSON, schema, filter, paging and object-key guidance to one reference per resource object. Added required registry routing at intake and closeout while preserving this file as the lifecycle and architecture owner. | Living-build contract, registry ownership/link checks, Markdown structure and scoped diff required; prior live GET and documentation receipts reused without runtime calls. |
| 2026-09-17 | API/BO read testing, write-test design and documentation retrieval review; evidence register (archived evidence E0031) | Added cross-domain API/BO contracts, live evidence boundaries, schema-and-vendor-example comparison for generated write tests, and scoped browser-free retrieval diagnosis. Refined sample-ID reuse to permit authorized current-environment references without embedding defaults. | Documentation-only review; live GET evidence retained; four public POST pages retrieved and request examples parsed without a browser. POST execution remains untested. Governance/link/structure checks recorded in the evidence register. |
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

| 2026-10-15 | Supplier Workspace selected-template failure B077 | Extend the existing conversational state owner to selected-parent template precedence across supplier and site routes. | Actual CODE reproduced conflicting parent selection; four focused regressions and saved normalized draft87973505 pass. Configured cross-turn repair acceptance remains pending; no additional business writes. |

| 2026-10-15 | Supplier Workspace B013 assignment metadata gate | Enforce the existing assignment-versus-declaration contract in the mandatory Query validator: reject type, scope and typeSpecification on root or nested SET_FIELDS assignment inputs while retaining valid variable declarations. | Existing gate regression suite and saved workflow Query check pass; exact current assignment/source continuity recorded in restored-assignment-stage-continuity.json under the active build. No tenant scenario or business write added. |
| 2026-10-15 | Supplier child CREATE F006/F007/F014, [failure ledger](../builds/xdx-supplier-child-create-20261015/failure-ledger.json) | Refine existing terminal topology and deterministic field-boundary owners: avoid child/legacy path crossproducts, preserve normalized error exits, and distinguish Email sentence punctuation from literal values. | Saved corrected DRAFT88007237; focused actual-CODE21checks, inner workflow validation and Query preflight PASS. Repaired Address configured conversation835checks and attached judgmentPASS; both native direct journeys independently verified. Accepted business writes frozen. |
| 2026-10-15 | Shared Query preflight convergence, [qualification](../builds/xdx-supplier-child-create-20261015/governance-qualification.json) | Tighten existing preflight owner for local BO/function resolution, nested lexical pipelines, completed producer coverage across incoming routes, and interpolation order/nonempty expressions while retaining assignment metadata checks. | 45 reported regression cases plus retained top-level SET_FIELDS assertions passed; exact validator/test source hashes remain current. Corrected saved child workflow Query check passed. Static qualification only; resource runtime evidence stays separate. |
| 2026-10-15 | Supplier child F016 accepted identity, [delta review](../builds/xdx-supplier-child-create-20261015/identity-delta-impact-review.json) | Refine the existing display owner for authoritative source/created identity and deterministic fresh/frozen accepted rendering without transaction replay. | Saved DRAFT88010729; ten actual CODE/RETURN contract groups, independent review, inner validation and Query preflight PASS. All four current configured conversations have attached passing judgments. Native Address fresh and frozen accepted displays PASS without replay; corrected Contact-specific native display remains blocked by lost conversation state. |
