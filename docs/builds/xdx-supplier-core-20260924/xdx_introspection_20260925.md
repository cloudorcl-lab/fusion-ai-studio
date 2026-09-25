# Supplier Core run introspection — accuracy, completeness and elapsed time

Recorded: 2026-09-25T14:18:38.304Z. Task: xdx-supplier-core-introspection-20260925.
Reviewed delivery: 345de6d; build746478e, repair2cbdecb, governance87120f5, packaging71a1107.
Format and priorities follow the [previous similar review](../xdx-build-introspection-20260924/xdx_introspection_20260924.md). This is an evidence review, not a second playbook or a new runtime acceptance run.

## Assessment

The bounded four-resource build reached initial DRAFT delivery sooner and ultimately satisfied all eight resource/operation requirements. It did not achieve first-pass correctness: the user exposed two404 scenarios caused by one supplier-number/internal-ID defect after initial acceptance. Field-only edits and terminal inference also required rework despite related prior lessons. Browser continuity and detailed activity accounting remain weaker than the installed governance.

The final result is accepted DRAFT, not production deployment. User confirmation covers six manual queries; native create/read-back receipts separately cover the four authorized creates. No accepted write was repeated during repair or this review.

## Measured phase comparison

Sources: [execution tracker](execution-time-tracker.md), [recomputed metrics and source hashes](evidence/xdx_introspection_metrics_20260925.json), previous review above. Intervals include nested tests, tool waits and coordination. Durations are rounded to the nearest second; they are not active labor. Old and new phase labels do not denote equivalent work, so no invented phase-to-phase mapping is made.

| This run | Recorded elapsed | Outcome / limitation |
| --- | ---: | --- |
| P0 bootstrap | 8m15s | Worktree, contracts and Startup |
| P1 supplier query | 43m26s | Native/configured reads; detail display repair |
| P2 supplier create | 41m00s | One approved create and independent GET |
| P3 addresses | 42m22s | Ordinary reads, create and independent GET |
| P4 before inactive interval | 49m31s | Site create/configured proof; native acceptance blocked |
| P4 inactive/authentication gap | 1h21m48s | Recorded blocked interval; exclude from labor claims |
| P4 resumed native reads | 4m25s | Site ordinary read/paging completion |
| P5 contacts and regression repairs | 54m25s | Contact create/read; child edit and terminal-order repairs |
| P6 app/initial Closeout | 13m34s | App acceptance and initial delivery checkpoint |
| Initial execution total | **5h38m48s** | Sep24 20:28:48Z to Sep25 02:07:35.688Z |
| Post-delivery404 repair | **21m48s** | First retained repair clock02:41:09.925Z to03:02:58.078Z; earlier reads and commit tail excluded |
| Governance start through final Git commit | **21m57s** | 03:12:20.745Z to03:34:18Z; includes overlapping base integration, not additive with it |

| Comparable reporting boundary | Previous retry | This run | Interpretation |
| --- | ---: | ---: | --- |
| Initial execution through delivery checkpoint | 9h28m (prior rounded review) | 5h38m48s | About40% shorter observed window, not a controlled speedup |
| This run through recorded user6/6 confirmation | No matched prior boundary | 6h42m36s | Includes testing/interturn intervals; execution time of the user's tests is unknown |
| This run through final local integration commit | No matched prior boundary | 7h05m30s | Includes repair/governance/gaps; exact remote push timestamp not retained |

The initial build commit occurred at02:12:40Z: **5h43m52s** from start, distinct from the earlier checkpoint. Subtracting the documented inactive gap leaves4h16m59s of elapsed time, which still includes waits and mixed activities and must not be called active labor. The prior retry had19 configured workflow cases; this scoped build initially had14. Neither fewer scenarios nor a shorter window proves equivalent scope or improved efficiency. The previous15h14m run remains historical context; the immediately preceding9h28m retry is the primary comparison.

## Accuracy and completeness

- Eight of eight scoped requirements have retained native/persisted and configured acceptance: [requirement register](requirement-slice-register.md). Supplier, address, site and contact only; BU GET is a dependency, not another journey.
- Initial workflow14/14 and app1/1 passed. Those successes failed to cover the exact displayed-number prompts later given to the user.
- Manual steps2 and3 failed404. They share one root cause: numeric SupplierNumber1506 was passed as the internal REST key instead of resolving SupplierId300000333814409. Treat this as two failed scenarios, not two independent root causes.
- Repair proved the exact three-turn sequence,358/358 assertions with semantic judges, native steps1–3, and six actual-CODE suites. The user subsequently reported6/6PASS. The resulting aggregate15 workflow cases includes retained historical14; it is not a fresh15-case run.
- Original failures and final confirmations remain separate in [manual results](xdx_manual_testing_results.md). The six-step query list does not replace the earlier create/approval/persisted evidence.
- Scoped ATLAS reconciliation retained47 excluded suggestions and required judges. The app wrapper limitation and direct configured fallback remain disclosed, not disguised as an unqualified planner-complete result.

## What worked, and what did not carry forward early enough

| Previous improvement | This run's evidence | Assessment |
| --- | --- | --- |
| Freeze complete resource/operation scope | Four resources, eight requirements; ordinary reads distinguished from confirmation GETs | Better structural completeness; exact displayed-ID user journey still escaped |
| Complete one representative transaction before replication | Supplier prepare/edit/review/approve/create/GET preceded child transactions | Applied; four accepted records preserved |
| Deterministic advertised commands | Child field-only address edit still misrouted during P5 and required repair | Partially applied too late; explicit field-edit adversarial extraction belongs before copying the pattern |
| Early body/key/widget checks | Local Query guards held; detail widget and number-key meaning still required repair | Syntax coverage was stronger than semantic key and native-output coverage |
| Focused reruns and final required evidence |404 repair added one exact conversation; no fresh broad runtime suite or repeated POST | Applied during repair; initial authoring still incurred terminal-order and stale-judge churn |
| Browser continuity and clean context recovery | Timing audit lists13 observation gaps over5min, one containing the long inactive interval; repair also has unclocked observations | Not demonstrated continuously; policy presence is not execution proof |
| Activity-level timing and honest accounting | Phase boundaries and inactive gap retained; build/test/repair categories still mixed | Better disclosure, insufficient precision for an exact rework/labor allocation |

The [continuity audit](evidence/xdx_timing_continuity_audit.md) does not prove that no browser action occurred between observations, nor that a specific missed deadline caused logout. No supported reminder, context meter or reset control was available. Closing the policy/template TODO implemented a fallback; it did not implement a scheduler or demonstrate future compliance.

## Rework and delivery findings

1. **Escaped user journey:** I accepted internal-ID coverage without the displayed supplier-number sequence. The next run must execute the exact user-facing list before first handoff, using the real app preview and the intended same-conversation prerequisites. Existing REST-binding and exact-prompt owners now cover this; no new duplicate rule is needed.
2. **Repeated prior defect classes:** field-only edits and terminal-owner ordering were already known classes. Apply their existing actual-CODE and semantic-owner checks before expanding resources and immediately after formatting/test updates. Passing downstream fixtures cannot substitute for producer/input correctness.
3. **Wrong diagnostic surface and replay visibility:** the standalone debugger lacked app context; a replay override blanked the BO input event. These were evidence/tooling boundaries, not reasons to weaken app acceptance. The repair retained producer-plus-binding proof and independent native execution.
4. **Packaging rework:** base integration exposed LF/CRLF-only source drift after the ZIP had passed in the worktree. The fix preserves exact payload hashes and allows normalized text-source comparison, with real content-change rejection. Validate the final package in the target checkout; batch settled documentation edits before the final build to avoid avoidable rebuilds. No duration saving is claimed.
5. **Status drift:** plan.md still led with P5/P6 pending despite later appended completion. This review replaces that current status and corrects register aliases ADDR-READ/CONTACT-READ to the existing ADR-READ/CON-READ IDs. Historical evidence stays intact. Existing session reconciliation already requires this; the defect was missed execution, not missing policy.
6. **Communication:** repeated user requests for terse status show that written communication policy alone was insufficient. Future status should say remaining work, blocker and next action; do not make the user repeatedly reconstruct progress.

## Diagnostic consumption, not the success criterion

| Accepted run only | Workflow cases/steps | Tokens | AI Units | Aggregate workflow time |
| --- | --- | ---: | ---: | ---: |
| Prior retry final summary | 19 cases | 940606 | 755 | 413.6s |
| Core original final suite | 14 cases | 233955 | 270 | 492.1s |
| Core exact-number repair | 3 conversation steps | 25833 | 30 | 61.155s |

The lower Core token count did not correspond to lower aggregate workflow time in these unequal suites. These are not matched model benchmarks or whole-build totals. Failed/authoring runs, orchestration, cached-token allocation and app aggregate usage are not fully accounted. Never add these nested durations to elapsed windows. No model sweep was required by the approved plan; deferral was appropriate, but should have been stated clearly at handoff when the user asked.

## Next-run priorities and success evidence

| Priority | Apply existing owner | Success evidence |
| --- | --- | --- |
| 1 | Exact manual wording and identifier semantics before delivery | Query by name then detail/address/site/contact by displayed number; unknown/ambiguous values withheld; complete app output |
| 2 | Reuse transaction contracts before each new resource | Actual serialized producer/binding, conflicting extraction, field-only edits and exact approval pass before native writes |
| 3 | Execute continuity fallback, not just record deadlines | Timestamped same-tab checks while active; gaps and inactive intervals explicit; recovery Startup and retained processes verified |
| 4 | Freeze and verify delivery once at the actual target | Final source links/status/package parity pass in target checkout before Git push; no unnecessary runtime rerun |
| 5 | Capture usable activity boundaries | Separate observed repair/test/wait intervals and overlaps; no guessed retrospective allocations |

No new business input is needed from the user. Scope, permissions and reference records were already sufficient. Authentication needed human recovery, but that does not excuse agent-side coverage or continuity failures. Future input collection should ask only for genuinely missing scope/data, not repeat prior authorizations.

## Disposition and limits

Existing canonical owners already cover these lessons; **the initial retrospective added no new playbook or object rule; the later user-approved BO-first amendment below refines lifecycle governance**. The prior governance/package improvements remain in345de6d. This review adds the comparison, evidence arithmetic and two status corrections. Policy and regression presence are implementation evidence; a later comparable build must demonstrate effectiveness. No runtime, browser, model optimization or business operation was executed for this review.

Verification and timing: [current review tracker](xdx_introspection_tracker_20260925.md). Source timestamps and hash manifest are in the computed metrics file. The previous review and original receipts remain immutable; this report identifies later corrections without rewriting history.

## BO-first and delegation amendment

User-approved follow-up: BOs are the core dependency. This run built and locally validated their functions per resource, but direct live BO proof was not completed as a distinct gate before workflow integration; live GET/POST evidence was obtained through workflow/native journeys. That is a build-process gap, separate from the later workflow supplier-number defect.

Implemented in the canonical Gate2 extension: per-resource BO contract → local serialized validation → actual BO GET / authorized POST / independent GET → independently reviewed readiness receipt → workflow bindings/state/approval → native app. Independent design/local logic may proceed in parallel, but dependent remote integration waits. Direct and native write proofs have separate budgets and authorization; historical accepted creates are never replayed to retrofit this new gate.

BO build and test can be handed to one scoped specialist. A coordinator or independent reviewer checks its receipt before integration. For this app's single12-function BO, one writer owns the BO file and remote artifact; parallel resource agents can supply contract research and patch proposals. Supplier proof precedes dependent address/site/contact operations; site depends on the verified address and BU. Existing artifacts are not split or rebuilt for delegation.

Other bounded packages: source-contract research; independent workflow logic proposals; exact-prompt/negative test design; semantic/evidence review; local widget validation; documentation and packaging. Shared workflow edits, browser use, tenant mutations, fixture ownership and final acceptance remain coordinated. Separate worktrees do not isolate tenant state.

Shared architecture/dependency templates now capture assignment ownership, frozen interfaces, acceptance evidence, direct/native write budgets, process handles and returned IDs. Policy regressions reject missing BO-first/delegation controls; regenerated package carries the same guidance. This is governance implementation, not proof of faster parallel execution or newly tested BOs. Future builds must measure the effect.

## Implemented optimization follow-up

User-approved design applied in task xdx-build-process-optimization-20260925: shared terminal inference repaired without workflow declaration/hash churn; conservative CODE-change test planner; shell-free command timing;137-file install packet activates their regressions. [Design and constraints](../xdx-build-process-optimization-20260925/plan.md), [verification](../xdx-build-process-optimization-20260925/verification.md) and [timing](../xdx-build-process-optimization-20260925/time-tracker.md). BO-first and scoped delegation rules above remain authoritative. Helpers independently delivered planner/timing; coordinator reviewed and integrated. No matched future build yet establishes time savings. No accepted business writes or native runtime tests repeated.
