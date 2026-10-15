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

For delegated work, supply verified literal input/evidence paths, the exact executable and registered command-receipt path, the required host execution context, and each command’s JSON or TEXT output contract. Register scoped task identities in the shared intake and tracker before dispatch. Use the supported follow-up operation to activate a completed worker; an unacknowledged message is not active execution.

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

Track milestones:

- Prerequisites verified.
- First representative result verified.
- Full implementation or generation completed.
- Validation completed.
- Deliverables and handoff completed.

For each milestone, record its timestamp, outcome and evidence location, and apply the mandatory handoff-master update above. Report time to the first verified result and time to final verified delivery. Keep design/document verification distinct from a working application's first end-to-end result.

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
