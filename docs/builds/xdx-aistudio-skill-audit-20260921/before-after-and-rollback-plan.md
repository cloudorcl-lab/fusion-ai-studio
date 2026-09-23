# AI Studio skills: proposed improvement and rollback plan

Task: `xdx-aistudio-improvement-plan-20260921`.

Status: **PROPOSED — planning only. No fixes, rollout or benchmark executions authorized by this document.**

## Recommendation and alternatives

Recommend a staged improvement in an isolated candidate checkout: establish a reproducible baseline, reconcile ownership and instructions, then automate only the repeated work that measurement justifies. Preserve the project playbook as critical canonical memory. Do not replace it with a summary, remove lessons to hit a token target, or relax its full-read/startup/closeout requirements in the initial change.

| Approach | Benefit | Limitation | Decision |
| --- | --- | --- | --- |
| Documentation corrections only | Smallest change and rollback; resolves naming, scope and authority contradictions | Leaves repetitive manual execution and weak timing attribution | First implementation wave |
| Staged corrections plus measured execution automation | Addresses correctness, repetition and diagnosability while preserving existing tools | Requires bounded new tests and a later design decision for coordinator behavior | Recommended overall direction |
| Rewrite/rebundle CLI and reorganize everything together | Could provide cleaner internals eventually | Large regression surface; makes cause, benefit and rollback hard to isolate | Defer |

## Protected boundaries

- Never write to, run tests from, save/fetch into, switch branches in, or otherwise operate on `.worktrees/xdx-supplier-lifecycle-agent` during this work.
- Do not modify its app, workflow, BOs, browser session, credentials, environment file, reports, timers or remote artifacts. Do not cancel processes or perform login/keepalive work for it.
- Do not change the base checkout's active `.agents/skills`, root `AGENTS.md`, playbook or pre-existing modified handoff while the ongoing build runs. Current work writes only this audit directory.
- Do not install a global skill, alter plugin registrations or rewrite shared Codex configuration.
- Do not restore or import the retired Supplier Workspace implementation. Retained failures may inform independently reproduced regression fixtures; importing its code is not part of this plan.
- No production, tenant or business-data operation is part of the offline comparison. No credentials or `env.properties` are copied into comparison fixtures.
- Inspection is not activation. Candidate instructions are used only in explicitly launched candidate sessions, with their resolved paths recorded.

## Isolation after approval

For maximum isolation, prefer a separate local Git clone with its own `.git`, rather than a linked worktree sharing Git administration with the running build. This is tooling development, not a new app build.

Proposed candidate directory: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-skill-hardening`.

Proposed candidate branch: `codex/xdx-aistudio-skill-hardening`.

Clone from an explicitly selected committed local baseline with `--no-hardlinks`; verify no object alternates or shared administrative directory. The reviewed base HEAD is `b1e9b4a87c4bac24c4552bd5e0f732a43c4a4892`, but it must be reconciled at execution time rather than silently assuming it is still the correct baseline. Do not copy unrelated dirty files. Do not create the candidate until implementation is approved. The proposed sibling directory is outside this session's writable root; obtain required filesystem authorization at execution time or choose an approved isolated directory. A sandbox exception does not authorize remote effects.

Keep an immutable baseline snapshot and candidate files inside that independent repository. Confirm in every benchmark that the assistant loads the intended candidate/base skill files rather than the installed base checkout paths. Start a fresh session for changed governance as required by the playbook. Candidate handoff/receipts are candidate-local; do not repoint the running build's handoff.

## Before and after

| Area | Before | Proposed after | Proof | Rollback unit |
| --- | --- | --- | --- | --- |
| Canonical lessons | Valuable playbook and object registry; some obligations restated elsewhere | Same canonical memory, with an explicit mapping from applicable lesson to owning instruction/check | Every existing obligation has a preserved location or reviewed equivalent; no unaccounted deletion | Policy/mapping commit |
| Policy ownership | Base, companions and project prescribe overlapping rules; SP/WO naming conflicts with XDX | Project policy supplies naming/authority/quality; base owns mechanisms; companions own domain content | Cross-skill fixtures produce XDX names, honor scope, preserve existing artifacts and do not invent authority | Instruction correction commit |
| Companion behavior | Mandatory menus, pauses and repeated base reads; direct-validation opt-out embedded in proposal | Explicit guided/scaffold versus approved-delivery behavior; accepted decisions carried in scoped state | Guided flow still asks material questions; approved delivery does not reopen settled choices; scaffold is never labeled release-ready | Companion behavior commit |
| Reference loading | Large mixed-purpose guides; repeated shared text | Short task routes, detailed references by operation; common companion rules maintained once | Route/packaging checks resolve all required references; critical lessons remain available and mandatory | Reference/package commit |
| Shared companion rules | Independently maintained workflow, guardrail and handoff copies | One maintained source; generated copies when standalone distribution requires them | Source-to-package parity and clean regeneration; no editing generated owners | Source plus generated-output commit |
| Test selection | Plan-driven sequential calls; tests may follow implementation topology | Approved requirement manifest controls allowed scenarios; valid evidence reused until an explicit dependency changes | Same accepted coverage, no unrelated tests, stale results rejected, no fabricated pass | Test-orchestration commit |
| Runtime capability | Important entry-surface assumptions discovered during later QA | Small capability proof precedes expanding the build; unknown support stays unknown | Native path evidence in a separate authorized pilot; offline fixtures cannot claim this proof | Procedure/validator commit |
| Execution and timing | Assistant manually maintains many transitions and narrative timing records | Event-derived action timings and, if justified, bounded resumable execution around supported CLI commands | Each action records purpose/outcome; waits and retries are attributable; restart/recovery does not repeat uncertain writes | Telemetry/coordinator commit |
| Acceptance | Static, replay and app debug evidence can dominate progress reporting | Separate static, workflow, business persistence and actual UI acceptance statuses | A failed/missing required UI journey prevents delivery acceptance even if sync is complete | Acceptance/reporting commit |
| CLI distribution | One bundled script, weak local version/provenance visibility | Preserve bundle initially; record version/hash and supported command contracts | Existing black-box tests and package integrity pass | Manifest/test commit |

Do not rename existing artifacts to enforce new-resource naming. Companion changes must preserve legitimate guided use and explicit user opt-outs while accurately labeling the resulting assurance level. Automatic discovery or a test plan never grants live-write authority.

## Wave 0 — establish the baseline

After approval, capture:

1. Exact repository, branch, HEAD, baseline/candidate paths and dirty-state inventory.
2. Hashes and inventories of all three skills, policy/registry, relevant verifier/tests and startup-package dependencies. Keep credentials and application data out of the snapshot.
3. A lesson-preservation matrix for every applicable canonical obligation, not merely keyword counts. A hash proves identity, not semantic preservation.
4. A fixed six-scenario comparison set with identical inputs and independently written expected results.

Proposed comparison scenarios:

| Scenario | Required evidence |
| --- | --- |
| Approved app plan and already-selected package | No repeated consent/package loop; scoped deterministic next action |
| Each domain companion creating new artifacts | Project naming wins; existing artifacts remain protected; domain requirements retained |
| Standalone workflow versus app-backed workflow | Correct references and stage contract; no invented runtime capability |
| Read/review/cancel with a write-capable dependency | No business write without exact authority; approval cannot be inferred from test generation |
| Affected-test repair and unchanged neighbor | Only invalidated coverage reruns; unrelated evidence remains current |
| Failed/ambiguous operation followed by restart | Typed blocker; no repeated uncertain write; honest pending acceptance |

Use local fixtures and controlled mock CLI responses for orchestration comparisons. These do not prove Oracle runtime behavior. Do not use retained customer payloads as generic fixtures.

## Wave 1 — correct structure without changing the CLI

Candidate files: `.agents/skills/aistudio/SKILL.md`; the two companion `SKILL.md` files and their `references/{workflow,guardrails,aistudio-handoff}.md`; only the base prompt references affected by concrete contradictions.

Work:

- Resolve naming, inherited authority, scaffold/delivery assurance and guided/approved-execution conflicts.
- Preserve material user decisions and scoped approvals; ask only when scope or authority actually changes.
- Remove UI-only assumptions from CLI execution guidance while retaining UI-specific guidance under an explicit route.
- Replace duplicated policy with references to its canonical owner. Do not move lifecycle ownership out of the playbook.
- Produce the lesson-preservation and before/after behavior diff before accepting the wave.

Verification: existing policy/session checks, focused naming/authority/routing fixtures, reference integrity, and the fixed comparison scenarios. Do not rewrite the CLI or claim reduced build latency from document size alone.

## Wave 2 — add measurement and bounded automation only if warranted

First expose timings with minimal supported command instrumentation. Reuse existing CLI plans, report formats and session verifiers; do not introduce a competing planner, evaluation system or lifecycle owner.

Candidate code locations, subject to confirming existing ownership during implementation: `scripts/xdx_aistudio_run_ledger.cjs`, `scripts/xdx_aistudio_sync_driver.cjs` and focused `tests/test-xdx-aistudio-*.cjs`. These are proposals, not existing commands.

The driver may execute a supported deterministic step or return a typed request for model input. It must stop for new authority, changed contracts, unknown state or exhausted limits. Maintain action IDs, relevant input/artifact hashes, attempt counts, approvals, result locations and resume state. Serialize writes per artifact; introduce no parallel runtime testing initially.

Remote execution remains disabled in offline comparisons. A timeout or lost result for a mutation is an uncertain outcome: reconcile persisted state through an authorized path before retrying. Never make a generic retry mechanism replay creates.

Record explicit invalidation rules: runtime artifact, input, relevant source contract, rubric or environment changes invalidate the evidence they affect; an unchanged document/report presentation alone does not justify rerunning business operations. Do not cache around live state or authorization changes.

TDD route for future executable contract changes: auto/strict under the planning skill's shared-contract criteria, using focused failing fixtures before repair. Documentation-only edits use semantic review and structural checks. No tests are added merely to mirror prose formatting.

## Wave 3 — packaging and pilot

Add sanitized executable examples only for contracts with demonstrated support. Retain one source for common companion rules and generate package copies if needed. Include metadata/compatibility bounds and reproducible artifact hashes. Do not add a second playbook.

Inspect the actual install-packet assembly owner before changing distribution. `agent-app-build-startup/repository-seed/` is a generated/delivery snapshot, not an independently maintained governance source. Existing root tests and startup verification are known surfaces; discover the packaging command rather than inventing one. Confirm whether companions are included and whether the delivery is intended to contain all three skills.

Pilot only after offline gates pass, in a separate authorized environment or after the ongoing build has ended. A separate artifact code is not sufficient isolation when tenant state, authentication or shared BOs are involved. The pilot must prove one real user journey before expanding coverage. Pilot authority, data and rollback are reviewed separately; no business mutation is implied by approval of this tooling plan.

## Before/after measurement and acceptance

Run the same six scenarios against baseline and candidate, with the same model configuration, fixture inputs and tool contracts. Use three paired repetitions per scenario where affordable; alternate order and report warm/cold cache conditions. This is diagnostic sampling, not a claim of statistical certainty. Agree the resource cap before running the model benchmark.

Measure separately:

- Requirement acceptance, safety/authority violations and missing evidence.
- Total elapsed, measured tool wall time, external/user wait time, and residual coordination interval. The residual includes inference and client/network overhead; do not label it measured model reasoning time.
- Model turns, tool invocations, repeated actions, failed attempts, sync refreshes and unnecessary revalidations.
- Actual input/output/cached tokens when exposed; runtime AI Units separately. Never equate document words or goal aggregate counters with billed tokens.
- Loaded reference volume and percentage of preserved lesson obligations correctly applied.

Hard gates: no weakened authority or quality condition; all fixed acceptance criteria pass; no lost lesson; no mutation of protected paths; all required existing regression checks pass; rollback rehearsal succeeds. A scaffold may pass scaffold acceptance without passing release acceptance, and reports must say so.

Proposed improvement targets, to approve with the benchmark: at least 30% fewer orchestration tool calls and 20% lower median end-to-end elapsed time on the bounded scenarios, with no quality regression. These are evaluation targets, not promised production savings. If targets are missed, examine the breakdown and stop expanding the refactor. Do not relax correctness to achieve them.

## Rollback

### Before promotion

Stop candidate execution and retain evidence. The base and running build remain on their original files, so no production rollback is needed. Keep the candidate available for diagnosis; deletion is optional and separately scoped. No recursive deletion is required to recover.

### After a future approved promotion

1. Record the exact promotion commits, delivered file list, previous release manifest and previous instruction hashes before activation. Use one coherent commit per independently reviewable wave; do not bundle unrelated edits.
2. Stop starting new sessions with the candidate release. Quiesce any affected active test/driver operation and preserve its state. Do not change loaded instructions underneath an active build.
3. In a clean integration checkout, revert the exact promoted commits in reverse dependency order, using `git revert` rather than reset, force-push or overwriting working files. A conflict is a review boundary, not permission to discard subsequent work.
4. If newer valid lessons were added after promotion, preserve them and produce a targeted revert. Restore prior execution behavior without erasing newly confirmed project memory.
5. Rebuild and verify the package from the reverted canonical sources. Check the previous manifest, existing regressions and the unchanged acceptance criteria. Remove/unregister any coordinator hook only if it was actually installed; the initial design adds none globally.
6. Start a fresh session in the intended consumer checkout with its existing approved objective and required startup receipt. Existing worktrees adopt or revert the release explicitly; rollback of one branch does not update other worktrees automatically.

Git rollback restores local tooling and instructions only. It cannot undo supplier records, emails, external side effects or elapsed costs. This plan deliberately performs no such effects; any later live pilot requires a separate reconciliation/compensation plan.

### Rollback rehearsal

Before promotion, exercise apply -> local checks -> revert -> local checks in a disposable clone. Verify the scoped files return to the baseline hashes, unrelated sentinel files remain unchanged, and no remote operation occurs. For packaging, compare both source and extracted/install output with the appropriate manifest. A successful `git revert` exit alone is insufficient.

## Promotion and approval boundaries

This document requests review of the design; it does not authorize implementation. Recommended next approval is **Wave 0 and Wave 1 in isolation only**. Review the concrete diff and measured results before authorizing Wave 2.

Promotion is a separate final decision on a concrete tested candidate. Do not merge, install or copy it into the base checkout, running worktree, global skills or future-build seed while the current build is running. When that build ends, reconcile any legitimate lessons/tooling changes it produced before promotion; do not overwrite them with an older snapshot.

Future builds may opt into the approved candidate after promotion and a fresh session. Migrating the current app to changed tooling is a separate decision, never a side effect of this work.

## Plan verification

Reviewed against the current canonical playbook, object registry, startup contract, three-skill audit, exact base HEAD and current dirty-state inventory. Reviewed policy hashes remain unchanged from this conversation's full reads. No resource object operation is being designed or tested in this planning task.

Planning output is limited to this audit directory. Source/tooling improvements, runtime acceptance and actual rollback are not claimed complete. The plan contains no executable destructive rollback script because commit IDs and promoted paths do not exist yet; concrete commands and manifests must be generated from the reviewed candidate at rollout time.
