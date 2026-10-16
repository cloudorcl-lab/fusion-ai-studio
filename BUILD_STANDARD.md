# Build execution and measurement standard

For implementation, generation, deployment, architecture and substantial verification, read this standard before substantive work. Keep tracking proportionate for brief questions and minor edits. This is the project owner of general execution and measurement requirements. The [AI Studio living playbook](docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md) remains the owner of AI Studio lifecycle gates, authority, resource evidence, testing and release.

Run-intake template; fill the values in the active run ledger:

```text
Deliver [OUTCOME] using [SOURCE/PROJECT] to [DESTINATION].
Done means [OBSERVABLE CHECKS AND REQUIRED DELIVERABLES].
```

## Success criteria

State observable success criteria and unresolved assumptions before dependent work.

Record a release contract in the existing intake: the buyer outcome, deadline when applicable (otherwise explicitly unset), launch must-haves, approved manual handoffs, exclusions, and acceptance evidence. Separate the first usable release from the broader product vision. A milestone list is not a release contract. Scope reductions or date changes require user approval unless already authorized; schedule pressure never waives safety or turns missing evidence into PASS.

## Execution

Check prerequisites early: tool availability, supported execution mode, authentication, permissions, environment access and required inputs.
Inventory installed, supported CLIs and saved connection mechanisms before choosing browser administration. Prefer the direct supported tool for repeatable operations (for example SQLcl for database scripts); record a concrete reason when the browser is required. Local access proves only that execution channel, not access from the application's consuming runtime.
Prove one representative example end to end before scaling.
Reuse existing sources, scripts, tests and verified artifacts where applicable.
Continue through routine reversible work and retain authorization within scope.
Ask only when missing information or a required approval blocks progress.
Run checks appropriate to the change. Repeat broader checks when new changes, failures or unresolved concerns justify them.

Before expanding a build, the coordinator must link the current representative-journey acceptance receipt from the existing requirement/evidence record. Feature, output-format and infrastructure expansion count even when they use the same resource. For AI Studio, the playbook's Mandatory first-slice fast-fail gate defines the required proof and permitted discovery/repair while blocked. Component counts, artifact saves and completed reviews are not substitutes for a usable journey.

### Bounded execution and repair decisions

Before a potentially long operation, record its total deadline, progress signal, retained process/session handle when available, and supported cancellation/recovery route in the existing command or activity record. A polling/yield interval is not a total timeout. Default metadata, administrative and download operations to a five-minute total deadline unless documented behavior justifies a different bound before dispatch; do not impose this default on an already budgeted business operation. Use bounded waits and retain the original handle. At the deadline, stop dependent dispatch, inspect completion/side effects and cancel only through supported controls when safe. If the tool cannot yield or honor its deadline, record that limitation before dispatch; use an available supported bounded alternative. After an observed timeout overrun, do not repeat that mechanism until the execution boundary is corrected or a supported alternative is justified. Never infer cancellation or replay an uncertain write.

For each failing contract boundary, record a repair budget before the next attempt: by default, two materially different repair candidates or 30 minutes of observed active repair, whichever occurs first. These are architecture-review triggers, not permission to weaken acceptance or stop all independent work. Preserve the boundary identity and cumulative attempts across renamed failures, agents and turns. At exhaustion, freeze dependent expansion and record the evidence, remaining hypothesis, smallest supported design, and reviewer decision in the existing learning register. Resume only with a reviewed bounded plan; a scope reduction needs user approval unless already authorized. A new patch or a local PASS alone does not reset the budget. Missing elapsed telemetry does not disable the attempt limit.

At each existing milestone/checkpoint, report the currently usable buyer outcome, remaining critical dependencies, forecast and confidence with supporting evidence, and the scope/date trade-off when delivery is at risk. Budget exhaustion or a newly disproven critical assumption requires a delivery decision: a bounded repair, supported architecture change, approved smaller release/manual handoff, or an explicit blocker/date decision. Do not automatically choose another patch. Keep component completion, integrated journey acceptance and release readiness separate; file, fix, review and simulation-pass counts do not establish delivery progress.

### Enforcement boundary

Use the existing requirement/evidence manifest, failure ledger and gated command runner; do not add a parallel progress ledger. Before expansion or delivery, the coordinator and reviewer must check the required receipts and explicitly withhold clearance when proof is missing. Existing validators check their declared structural/hash contracts, not whether a buyer completed an unobserved journey. Record manual/native evidence and enforcement limitations honestly. These requirements do not authorize new tests, business writes, or extra approval requests for already authorized work.

For delegated work, supply verified literal input/evidence paths, the exact executable and registered command-receipt path, the required host execution context, and each command’s JSON or TEXT output contract. Register scoped task identities in the shared intake and tracker before dispatch. Use the supported follow-up operation to activate a completed worker; an unacknowledged message is not active execution.

## Required parallel-agent execution

For every build, deployment and test run, use parallel agents wherever independent, authorized work can proceed safely. This is the default execution requirement. At intake and each phase transition, identify independent work packages, assign available agents and record ownership and dependencies in the run ledger. If work must remain serial, record the specific dependency, shared-resource conflict, unavailable agent capacity or disproportionate coordination overhead; reassess when that constraint changes.

Give each agent a bounded task, exact checkout/branch, owned files or artifacts, inputs, permitted actions, expected evidence and stop conditions. Keep one coordinator accountable for integration and one writer per shared file, remote artifact, browser session or dependent transaction chain. Parallelize independent build modules, deployment preparation or independent deployment targets, and authorized isolated tests or evidence review. Serialize conflicting mutations and dependent rollout steps. Delegation preserves all approval, test-scope and business-write limits, including an instruction not to test.

The canonical playbook's Delegated build ownership section owns AI Studio-specific execution controls. Record each assignment and its timing using the attribution requirements below; reconcile all workers before phase exit.

## Mandatory handoff master

`docs/handoffs/ACTIVE_HANDOFF.md` is the repository-wide **handoff master** and single authoritative current transition record. Keeping it current is a **MUST for effective build execution**, in every session and worktree.

Update the master at build start, at every milestone before starting the next, whenever scope, decisions, approvals, status or blockers materially change, on pause/resume, and before ending a work turn or handing work forward. Reconcile verified commit, save, deployment and validation results as soon as they are known; replace pending-action wording when the action completes.

Each update must identify the current objective, checkout/branch, verified state, evidence links, unresolved work or blockers, and exact next action. Include source/artifact identifiers and commit references when available. Link the authoritative run ledger and failure/evidence records rather than duplicate their mutable details. Replace stale current-state content; retain history in run records instead of creating competing active handoffs.

A milestone or build is incomplete while the handoff master is stale. Reconcile it with the actual delivered state before reporting completion.

## Build tracking

Start tracking before substantive work. Assign a unique run ID and record:

- Outcome, scope, success criteria, source version and destination.
- Prompt/template version and relevant tool versions.
- Starting branch and commit, where applicable.
- Start time and timezone.

Maintain one authoritative build ledger per run under `docs/builds/<run-id>/`. Reuse it when resuming the same run. The ledger owns run metadata, exclusive primary timing, milestones, interaction counts, verification and usage. Link existing command receipts and the canonical failure ledger; keep failure status at its existing owner rather than copy mutable status into the build ledger.

Use these separate primary time categories:

- Active execution, including ordinary tool execution.
- Blocking tool or environment waits.
- Waiting for required user information or approval.
- Scheduling or agent idle time.
- Paused or interrupted time.

Record category transitions as they occur. Avoid overlapping categories. Report total elapsed time separately from category totals. A pending approval while independent work continues is active execution with an approval-pending tag; count required-user wait only when it actually blocks work. Nested tool intervals and command/activity categories are diagnostic measurements, not additional primary elapsed time.

Label inferred intervals and gaps. Do not attribute scheduling latency to the user or present estimates as exact measurements. For unavailable scheduling or interruption telemetry, record the limitation; do not manufacture category transitions or continuous active work across turns.

Report run duration from the authoritative build ledger, naming its start and cutoff. Goal-tracker elapsed, command coverage, scenario runtime and summed agent effort are separate measurements. Recover later gate/commit tails from retained receipts without inventing their category; preserve earlier cutoffs and qualify missing intervals. Phase labels must describe mixed work rather than imply an unsupported coding-versus-testing labor split.

### Time-recording procedure

Use the active run's build-ledger.json as the sole timing source; time-tracker.md and status messages summarize it. Apply this procedure prospectively; never fill historical gaps with estimated labor.

1. At the first observed timestamp of each working turn, open a primary interval with UTC start, category, task/object and activity. Record any earlier discovery or recovery time as unallocated when its start is unknown.
2. On a category change, close the previous interval and open the next at the same observed timestamp. Keep active execution, blocking tool/environment wait, required-user wait, idle and interruption mutually exclusive. Ordinary tool execution stays inside active execution; command durations are diagnostic subsets and must not be added again.
3. Close the interval before yielding, stopping or handing off. Never leave an active interval running across turns. After an unexpected interruption, use the last reliable observation as the cutoff, label it retrospective, and leave the remaining gap unallocated.
4. At approximately 30 minutes of recorded active execution, and whenever an object or phase completes, record a checkpoint with object, completed work, remaining work, blocker, category totals and estimate to finish. Label estimates as forecasts. Routine progress messages can be more frequent; a checkpoint does not authorize tests.
5. At each status checkpoint, show recorded active execution, blocking wait, required-user wait, idle/interrupted time, unallocated time and wall-clock elapsed separately. A missing observation is unknown, not zero. Report command/test elapsed separately and retain any test-meter reset boundary.
6. At task end, close all intervals and report timing coverage and limitations. Do not call wall-clock elapsed, command elapsed or a goal tracker labor time. Historical incomplete coverage remains incomplete.

### Agent attribution and concurrent time

Every activity and timing interval must identify agentId (actual canonical agent identity, including the primary agent), parentAgentId (null for the primary), assignmentId, activityId, phase, task/object, category, observed startUtc/endUtc, outcome and evidence reference. Record agent roles and assignment ownership in the run ledger. Link command receipts by activityId when the timing tool has no agent metadata field; do not invent unsupported CLI flags. Unknown historical agent identities remain unknown.

Workers return their observed intervals and timing limitations with each checkpoint and final receipt. The coordinator merges these into the authoritative ledger; workers must not concurrently edit that shared ledger. Record dispatch-to-return elapsed separately from observed active execution: an outstanding agent can be idle or waiting.

Keep categories exclusive within each agent. Agent intervals may overlap across agents. Preserve the exclusive run-level wall-clock timeline separately: any observed active worker makes that period run-level active execution, even if the coordinator is waiting. Report per-agent active/wait totals, summed agent effort, and overlap-aware run elapsed separately; summed agent effort can exceed wall-clock elapsed and is not human labor. Do not add nested tool durations again or infer speedup without comparable baseline evidence. Checkpoints and final reports identify which agent completed each object/activity and disclose missing timing coverage.

Track milestones:

- Prerequisites verified.
- First representative result verified.
- Full implementation or generation completed.
- Validation completed.
- Deliverables and handoff completed.

For each milestone, record its timestamp, executing agentId and assignmentId, outcome and evidence location in the run ledger, and apply the mandatory handoff-master update above. Report time to the first verified result and time to final verified delivery. Keep design/document verification distinct from a working application's first end-to-end result.

Track failures and rework:

- What failed and the observed evidence.
- Cause: confirmed, suspected or unknown.
- Corrective action and its result.
- Time spent on rework, where measurable.
- Whether the cause was an agent mistake, unclear requirement, tool issue, environment issue or external dependency.

Rework time is a subset of the categories above, not additional elapsed time. Do not assign causes without evidence or retry an unchanged failure without a defensible reason.

Track interaction overhead:

- Clarification and approval requests, with the reason for each.
- Repeated requests already answered or authorized.
- User corrections that changed execution or required rework.
- Agent turns needed to recover existing context.

Distinguish necessary interaction from avoidable repetition.

Track verification:

- Checks planned, executed, passed, failed and not run.
- Whether each check passed on its first execution.
- Local/stub results separately from live environment results.
- Scenario attempts, conversation turns, assertions, judgments and business writes as separate counts, using the [testing guide](docs/lessons/AI_STUDIO_TESTING_GUIDE.md#attempt-budgets-and-result-counts).
- User-accepted verification exceptions separately from observed test PASS; retain the original unobserved or failed result.
- Remaining defects, limitations and unverified success criteria.

Track usage only when reliable counters are available:

- Input, cached input, output and reasoning tokens.
- Counter source, measurement interval and whether values are cumulative.
- Parent-agent, subagent and external-service usage separately.

Cached input is a subset of input; reasoning may be a subset of output. Do not double-count subsets. Report unavailable usage as unavailable. Do not convert tokens into cost without verified pricing and billing semantics. Keep tracking lightweight; do not repeatedly inspect full session history to refresh counters.

## Delivery and handoff

Finish with:

- Deliverable links and verification evidence.
- Completed and unmet success criteria.
- Elapsed time and separate primary category totals.
- Time to first verified result.
- Failures, rework and avoidable interaction counts.
- Usage totals with their measurement limitations.
- Current branch/commit and a concise handoff, where applicable.
- One or two evidence-backed improvements for the next comparable run.

Call the build complete only when required success criteria are verified. If blocked, preserve the current state and report the exact blocker, remaining work and what would enable progress.
