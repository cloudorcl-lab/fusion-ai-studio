# Supplier Core learning reconciliation

Governance hand-forward after repair commit `2cbdecb` and user confirmation that all six manual query tests pass. Runtime remains DRAFT86237214 / ETag18. No new runtime test, model change or remote mutation is implied by this review.

| Improvement or finding | Evidence | Canonical owner and disposition |
| --- | --- | --- |
| Displayed supplier number must resolve to internal supplier ID | [Original reproduction](evidence/xdx_number404_before.json), [native repair](evidence/xdx_number404_native.md) | Suppliers GET reference already records the exact mapping; playbook REST-binding rule now covers identifier meaning as well as syntax. Child references link to that owner. |
| Exact manual wording and conversation sequence were missing from earlier internal-ID coverage | [Manual results](xdx_manual_testing_results.md), [configured regression](../../../test/workflows/xdx_supplier_core_20260924/supplier-number-manual-regression.json) | Existing exact-prompt inventory rule refined; preserve displayed identifiers and preceding turns. New three-step regression retained. |
| Manual failures must remain reproducible and separate from final acceptance | [Manual results](xdx_manual_testing_results.md) | Existing QA owner now requires exact prompt, expected/actual result, surface, known sequence and evidence provenance. Initial404s preserved; later6/6PASS is explicitly user-reported. |
| Workflow debugger is not equivalent to the bound app preview | [Native repair receipt](evidence/xdx_number404_native.md) | Existing mandatory Studio-context section refined: scripts state app preview and conversation prerequisite. The debugger null response remains a rejected substitute for app proof. |
| BO replay input can be blank despite correct real producer output | [Retained assertion failure](evidence/xdx_number404_replay_input_assertion_failure.json), [scoped verification](evidence/xdx_number404_scoped_verification.md) | Existing binding owner refined: prove actual producer value and exact binding, plus independent live execution. Do not infer request correctness from fixture output. |
| Explicit field-only edits must preserve draft parent and untouched fields | [P5 routing failure](evidence/xdx_p5_address_edit_routing_failure.json), [native edit regression](evidence/xdx_p6_native_edit_regression.md) | Already integrated in playbook Gate3 and actual-CODE tests; no duplicate rule added. |
| Terminal declaration/assertion ordering affects semantic-owner inference | [Scoped completion](xdx_p6_scoped_completion.md), [stale judge reference](evidence/xdx_p6_detail_stale_judge_reference.json) | Already integrated in QA ordering guidance; preserve semantic judges and actual terminal owner. |
| Serialized CODE and request templates need direct execution checks | [Final acceptance](xdx_acceptance.md), [local contracts](../../../scripts/xdx-supplier-core-contract.test.cjs) | Existing Gate2/Gate3 and Query preflight own this; no new parallel guidance. |
| Minimal approved fields, generated IDs and parent relationships must survive create/read-back | [Native supplier](evidence/xdx_p2_native_supplier.md), [address](evidence/xdx_p3_native_address.md), [site](evidence/xdx_p4_native_site.md), [contact](evidence/xdx_p5_native_contact.md) | All four POST references already contain corroboration. Immutable first GET samples remain unchanged; no new requiredness or uniqueness claim. |
| BU lookup is a bounded site dependency, not a new business journey | [Site receipt](evidence/xdx_p4_native_site.md) | Existing BU LOV reference preserves first observed choice and raw-envelope limits; no additional subobjects or writes. |
| ATLAS suggestions need explicit scope accounting; fallback must be documented | [Original scoped mapping](xdx_p6_scoped_completion.md), [repair scope](evidence/xdx_number404_scoped_verification.md) | Existing Gate6 scoped completion owner retained. Raw47 suggestions are not rewritten or claimed executed. App fallback and final judged evidence remain disclosed. |
| Keep-alive and elapsed-time evidence must not overclaim continuity | [Timing audit](evidence/xdx_timing_continuity_audit.md), [time tracker](execution-time-tracker.md) | Existing five-minute same-tab rule and timing owner retained. Prior gaps remain acknowledged; no scheduler automation or uninterrupted compliance claimed. |
| Terse communication and optimization scope are explicit | [Approved plan](plan.md), [learning register](intake-and-learning-register.md) | Existing communication default and Gate9 retained. Optimization was deferred by plan; passing correctness is not a model benchmark. |
| Final summaries can combine retained historical and new tests | [Repair scoped verification](evidence/xdx_number404_scoped_verification.md) | Current records explicitly distinguish original14workflow/app1 baseline, new3step358-assertion regression, native observations and user6/6manual acceptance. No broad rerun claimed. |

Optional product work remains outside approved scope: standalone supplier-number lookup without a prior query and a separately requested model optimization sweep. They are not part of this completed repair or evidence of current behavior. The later user instruction authorizes closing both repository TODOs; their policy owners, shared templates and prevention tests are now reconciled. Supported reminder/telemetry/reset tools were inventoried and unavailable; the documented manual fallback is implemented, without claiming automatic session renewal.

Verification for this hand-forward: current-task Startup and Closeout, living-build positive/negative regressions, session-compliance regressions, changed-document local links, whitespace and exact scoped Git diff. Existing artifact/native acceptance is reused because runtime artifacts and test definitions are unchanged.

## Earlier introspection and document audit

The seven next-build outcomes in [the September 24 introspection](../xdx-build-introspection-20260924/xdx_introspection_20260924.md) were checked against current owners:

| Outcome | Current disposition |
| --- | --- |
| Complete acceptance inventory | Gate0 and requirement-slice register already implemented; manual number prompts now close the escaped query gap. |
| Representative complete transaction before replication | Gates6/7 and approved golden-path manifest already implemented; accepted records are not replayed. |
| Deterministic advertised commands | Gate3 and actual serialized CODE contracts already implemented. |
| Early template/binding/widget checks | Gate2, Query preflight and native acceptance owners already implemented. |
| Affected reruns with required final coverage | Gate6 scoped completion and current evidence provenance already implemented. |
| Browser/context continuity | Both TODO and current base wording reconciled into shared lifecycle policy, templates and negative checks. No supported scheduler/control was found; explicit fallback documented. |
| Observed activity boundaries and overlaps | Existing activity-interval table and UTC append helper retained. Missing historical timing cannot be reconstructed; no automatic collector claimed. |

Earlier audit records and frozen model versions remain historical. Current model1.0.1 delegates lifecycle to the canonical playbook. The startup context operation now points to that owner, replacing duplicate thresholds. The install packet is regenerated from current source and tested; checked-in older seed is explicitly an installation snapshot, not runtime authority. No supplier artifact, BO, model or business record changed in this governance task.

Local prevention commands: `node tests/test-bo-example-purpose.cjs`, `pwsh -NoProfile -File tests/test-living-build-contract.ps1`, `node tests/test-session-compliance.cjs`; package/startup and source-link checks are recorded in the verification receipt.
