# Build execution and measurement standard

For implementation, generation, deployment, architecture and substantial verification, read this standard before substantive work. Keep tracking proportionate for brief questions and minor edits. This is the project owner of general execution and measurement requirements. The [AI Studio living playbook](docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md) remains the owner of AI Studio lifecycle gates, authority, resource evidence, testing and release.

Run-intake template; fill the values in the active run ledger:

```text
Deliver [OUTCOME] using [SOURCE/PROJECT] to [DESTINATION].
Done means [OBSERVABLE CHECKS AND REQUIRED DELIVERABLES].
```

## Success criteria

State observable success criteria and unresolved assumptions before dependent work.

## Execution

Check prerequisites early: tool availability, supported execution mode, authentication, permissions, environment access and required inputs.
Prove one representative example end to end before scaling.
Reuse existing sources, scripts, tests and verified artifacts where applicable.
Continue through routine reversible work and retain authorization within scope.
Ask only when missing information or a required approval blocks progress.
Run checks appropriate to the change. Repeat broader checks when new changes, failures or unresolved concerns justify them.

## Required parallel-agent execution

For every build, deployment and test run, use parallel agents wherever independent, authorized work can proceed safely. This is the default execution requirement. At intake and each phase transition, identify independent work packages, assign available agents and record ownership and dependencies in the run ledger. If work must remain serial, record the specific dependency, shared-resource conflict, unavailable agent capacity or disproportionate coordination overhead; reassess when that constraint changes.

Give each agent a bounded task, exact checkout/branch, owned files or artifacts, inputs, permitted actions, expected evidence and stop conditions. Keep one coordinator accountable for integration and one writer per shared file, remote artifact, browser session or dependent transaction chain. Parallelize independent build modules, deployment preparation or independent deployment targets, and authorized isolated tests or evidence review. Serialize conflicting mutations and dependent rollout steps. Delegation preserves all approval, test-scope and business-write limits, including an instruction not to test.

The canonical playbook's Delegated build ownership section owns AI Studio-specific execution controls. Record each assignment and its timing using the attribution requirements below; reconcile all workers before phase exit.

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

For each milestone, record its timestamp, executing agentId and assignmentId, outcome and evidence location. Report time to the first verified result and time to final verified delivery. Keep design/document verification distinct from a working application's first end-to-end result.

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
