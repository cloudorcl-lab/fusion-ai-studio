# Supplier build compliance audit — 2026-09-17

## What happened

The prior guide already required elapsed time, tokens, AI Units, rework capture and closeout review. The agent captured successful BO invocation time but did not consistently maintain task timing or reconcile all delivery records. This was a failure to follow existing instructions, not absence of a timing requirement. The user had to identify the omission.

The executable verifier checked installed text, headings and reference presence. It did not inspect the current task's tracker, applicable obligations or evidence. Consequently it could pass despite incomplete execution. Commit f25adf7 recovered timing but only protected the new timing heading; it did not close that enforcement gap. The counterexample is direct: the old verifier passed while the README and verification receipt remained stale and 1497 child GETs were absent.

There were separate contributing defects: a CLI placeholder false positive led the agent to drop SupplierType; the submitted-field-only test then missed the omission. That defect was repaired in bb8320f with independent expected-field assertions and live correction. Successful artifact tests were incorrectly treated as sufficient closeout evidence. A full playbook review and clear prose alone did not prevent these omissions.

This audit does not claim access failure, missing guidance, or an unread initial handoff as a proven cause. The earlier startup investigation found the first repository read followed the user's reminder and did read the handoff. Reading/comprehension before that reminder is not established. No claim about hidden agent reasoning is needed: omitted records, stale documents and the verifier's actual checks are observable.

## Obligation and activity reconciliation

| Canonical requirement | Finding | Disposition and evidence |
| --- | --- | --- |
| Instruction 1: handoff, entire playbook, registry and object review | Review existed; proof of execution was weak | Current audit read all four Oracle 26C references; session receipt binds review to hashes and current task. Historical startup order cannot be repaired retroactively. |
| Universal intake / Gate 0 | Standalone BO scope and later POST extension recorded; older GET-only sections looked current | Current scope at top of intake, verification and handoff; old sections explicitly historical. No new app architecture required. |
| Gate 1: environment, identity, authority and exact artifact | Retained approved eqih-dev21/CASEY.BROWN source-API receipts; no deployment authority | Reused existing environment/identity evidence. Three missing child GETs only; sandbox credential-store failure recovered using documented host retry. |
| Gate 2: local data first and documentation cross-reference | Initially inadequately scoped; corrected during original POST work | Retained local-suitability review, four exact 26C schema/example receipts and field provenance. No new documentation fetch or source-sample refresh needed. |
| Intended business fields | SupplierType omission was a failed acceptance criterion | bb8320f restores it, repairs 1496 and verifies fresh POST/GET for 1497. Existing intended-field assertions reused; no repeat write. |
| Parent and child GET verification | 1496 children verified; 1497 parent verified, child collections not read | Missing address/site/contact GETs now each return count 0, hasMore false. [Summary](live-post/type-fix/children-1497/summary.json). This does not create children under 1497. |
| Generated IDs, requiredness and uniqueness | Generated-field evidence present; Site/Contact uniqueness dispositions absent | Added explicit schema-backed constraints and unresolved uniqueness scope to matching object references. No unsupported duplicate-key inference or negative POST. |
| Immutable first-success samples | Existing samples retained; README advertised overwrite/refresh | Retired that instruction. New 1497 reads use a temporary BO and separate evidence directory; delivered BO unchanged. |
| Gates 3–6 and 8: specialist/workflow/app, synchronization, judges and HTML suite reports | Not applicable to standalone BO or governance repair | No workflow/app was created or changed. Existing Markdown/JSON source-API evidence is the delivery report; no fabricated ATLAS/HTML suite result. |
| Gate 7: golden path before broader regression | Original four creates and 19 GET checks retained | Reuse passing historical tests; new reads fill only the missing requirement. Local evidence is not remote DRAFT/PUBLISHED runtime proof. |
| Gate 9: model optimization | Not applicable | No model-backed node or workflow AI Unit metering; no sweep, model choice or price claim. |
| Time/token controls | Original capture partial; first recovery excluded its delivery tail | Recovered prior tail (40.438 seconds), current task start and checkpoints; session usage at delivery. [Tracker](time-tracker.md). No nested-duration double counting. |
| Gate 10 / Definition of Done: dependency cleanup and evidence | README, verification, intake and handoff not fully reconciled | Updated current status; retained artifact/CLI/tests/schema receipts with clear owners. Audit runner retained to explain exactly three reads and refuses completed-evidence rerun. No scratch remains at delivery. |
| Propagation and hand-forward | Policy existed in Git, but current-session execution was not gated | Root AGENTS and AI Studio route require current Startup/Closeout receipt. Default verifier refuses missing session context. Local governance commit required; push not authorized. One current worktree observed. |

## Prevention and validation

Decision: code-change at the existing verifier boundary plus canonical/entrypoint repair. More MUST prose alone is insufficient. The helper validates actual session identity, checkout/branch, reviewed file hashes, tracker/register linkage, all eight obligation groups, evidence existence, timing/metric dispositions and unresolved actions. Policy-only mode is explicitly installation validation and cannot be combined with session arguments to bypass checks. No new runtime service, dependency or second lifecycle owner is introduced.

The change preserves policy-fixture testing through explicit PolicyOnly and routes active work through Startup/Closeout. Negative checks cover previous-session reuse, stale reviewed content, missing tracker/group/evidence, unexplained exclusions, pending work, missing metrics, wrong branch and invalid paths. A startup plan is allowed; the same pending work is rejected at closeout. Root entrypoint removal is also tested.

The remaining boundary is explicit: these are evidence checks invoked through repository instructions. They cannot force an arbitrary client to invoke them, prove understanding from a file hash, or prove semantic correctness from a claimed PASS. Human/agent evidence review remains required. New worktrees must inherit the governance commit and start a fresh run. The installed seed/ZIP is a historical delivery snapshot, not the active lifecycle owner; the unrelated modified ZIP is preserved and not repackaged.

## Retention and release boundary

Retain the existing BO, bundled CLI fix, four object references, immutable source/API receipts and focused tests. Retain this audit and session JSON as build evidence; future tasks use new receipts rather than rewriting prior ones. Historical failed/preflight records remain diagnostic evidence. Unrelated environment, ZIP and workspace edits stay outside the commit. No live records deleted, additional suppliers created, remote BO saved/published, app tests run or branch pushed.

Verification results and delivery timing are linked from the current session receipt and time tracker. Source artifact tests from bb8320f remain valid because this audit does not change the BO or shipped CLI.
