# Build introspection — accuracy, completeness and elapsed time

Recorded UTC: 2026-09-24T16:08:18.418Z
Task: xdx-build-introspection-20260924
Checkout: base repository, branch TestingWFBuildTools.
Historical build: retry branch, delivery commit 6c85117.
This is a retrospective evidence record, not a second build playbook.

## Priority and scope

User decision: accuracy first, completeness second, elapsed time third. Tokens and AI Units are diagnostics unless an explicit constraint applies. The previous response overemphasized consumption. Fewer tests are not an improvement unless required coverage and confidence remain intact.

This task promotes reviewed lifecycle guidance into base and tests local governance. It does not change the completed application, merge the retry branch wholesale, execute tenant operations or implement a background browser scheduler. Operation-level lessons remain owned by object references on the retry branch; promotion of those files and their complete dependency closure is outside this lifecycle-only change.

## Measured phase comparison

Elapsed windows include build, test, repairs, coordination and waits. They are not active labor. Prior planning/bootstrap work is excluded from the old execution window; retry includes its purge/startup interval. Workload and acceptance boundaries differ, so 38% is observed elapsed reduction, not a controlled performance benchmark.

| Phase | Activities | Previous | Retry | Change |
| --- | --- | --- | --- | --- |
| Startup/P0/P1 | Contracts, setup, first query | 2h 28m | 54m | 94m faster |
| P2 | Address/site/contact reads, paging, native/configured checks | 2h 46m | 46m | 120m faster |
| P3–P5 | Draft/review/approval, supplier/address create and verification | 4h 22m | 1h 39m | 163m faster |
| P6–P8 | Remaining resource create/read flows and acceptance | 4h 46m | 5h 13m | 27m slower |
| P9/Closeout | Integrated regression, repairs, evidence, cleanup | 52m | 56m | 4m slower |
| Total | Execution through delivery checkpoint | 15h 14m | 9h 28m | 5h 46m faster, approximately 38% |

Old UTC boundaries: 2026-09-22 16:56:59.177, 19:25:16.555, 22:11:08.878; 2026-09-23 02:33:10.280, 07:19:01.404, 08:11:07.457.
Retry UTC boundaries: 2026-09-23 18:38:10, 19:32:32, 20:18:48, 21:57:43; 2026-09-24 03:10:44.056, 04:06:23.593.
Old P1 was reopened during P2. Old P9 uses the retained final-suite checkpoint, not a precise test-start stopwatch. Phase comparisons are grouped recorded windows, not identical acceptance milestones.

Correction: the earlier 3h / 1h12m / 1h1m subdivision of P6–P8 was unsupported and is withdrawn. Only the combined 5h13m and approximately 1h12m of later additional read-flow work are supported. Exact build/test/repair/idle splits remain unavailable. No transactions were rerun to recover timing.

## What I should improve next

1. Define complete acceptance coverage upfront. Map every approved requirement, resource and operation to its implementation and acceptance evidence. A post-create GET does not prove an ordinary read/list flow.
2. Prove one complete representative journey before replicating it: preparation, field-only edit, review, approval, one POST, independent GET and native display.
3. Make advertised exact commands deterministic. Preserve raw approval, payload/revision, fresh reference, duplicate and uncertain-result guards.
4. Catch integration defects earlier: render and parse exact BO body templates; validate parent bindings, typed identity comparisons and widget structure against retained runtime evidence.
5. Reduce redundant reruns while preserving coverage. Use affected tests for classified repairs, then required final configured acceptance. Assertion counts and scenario counts are not completeness measures.
6. Maintain keep-alive and checkpoint deadlines through active waits and context recovery. Distinguish recorded deadlines from implemented automation and revalidate after inactive intervals.
7. Record activity-level boundaries and overlaps. Report escaped defects, reopened phases, completeness and elapsed time before token consumption.

## Inputs that would accelerate the next build

1. An agreed completeness checklist: required resources, operations, exclusions and acceptance criteria.
2. Representative end-to-end examples: inputs, displays, approval behavior and failure handling.
3. Valid tenant reference data: business units, categories, classifications and designated test records.
4. Scoped transaction authorization upfront: permitted creates, naming and cleanup boundaries. Preserve authorization already supplied; do not request it again unchanged.
5. Ready environment access: roles, browser authentication and working CLI credentials.
6. Early decisions on ambiguous required fields, duplicate behavior and UI expectations.

The user already supplied a plan and transaction approvals. These are useful intake inputs, not justification for attributing agent defects or incomplete timing to the user.

## Evidence-backed lessons and disposition

| Observation | Evidence | Smallest correction / canonical owner | Validation boundary |
| --- | --- | --- | --- |
| Exact Review/Create commands intermittently routed as preparation | Retry final summary and tracker P9 | Gate 3: one deterministic request owner; preserve authorization guards | Historical focused, cumulative and native repair acceptance; no runtime rerun here |
| Child draft omitted explicit parent; field-only edits lost intended state | Retry P3/P7 tracker and P7 acceptance | Gate 3: separate read selection and transaction patch; bind actual runtime state | Historical accepted repair, resource-specific checks still required |
| Generic validation missed malformed BO body | Retry P4 tracker | Gate 2: render exact body with typed values and parse JSON locally | Retained incident supports control; local policy verification is not new BO proof |
| Text assertions passed while native widget display failed | Retry P1/P5 tracker | Gate 7: supported envelope and native rendered result | Historical native acceptance; no new UI test |
| CLI updates reordered path assertions | Retry P3/P4/P6 tracker | QA rerun owner: preserve observed terminal order | Historical corrected configured tests |
| Three required read flows were reconciled late | Retry tracker late read acceptance | Gate 0 and Definition of Done: independent requirement matrix | Process amendment; time saving awaits a future build |
| Browser continuity missed during approval/context gaps | P6 acceptance and tracker | Existing keep-alive owner: next due time, inactive-gap disclosure, resume check | Scheduler remains proposed, not implemented or proven |
| Phase clocks did not support exact labor categories; retrospective invented a split | Prior response correction and retained tracker | Existing timing owner: categorized intervals, overlap IDs, unallocated time | No fabricated reconstruction; automated collection remains proposed |
| ID string/number mismatch caused uncertain site confirmation | P6 acceptance | Existing boundary normalization principle; retain object-specific evidence on retry branch | Normalize identity only; do not loosen business-value comparisons |

No new duplicate playbook or automatic retry policy is introduced. The five existing retry playbook amendments are promoted into base along with the scoped process refinements. Improvements are not claimed to have reduced future-build time until measured on a comparable build.

## Evidence and verification

- [Retained source manifest](evidence/xdx_source_manifest.json): source commit, original paths and lowercase SHA-256.
- [Retry tracker](evidence/retry_time-tracker.md): frozen historical copy; its original relative links are provenance, not relocated live links.
- [Previous tracker](../xdx-supplier-lifecycle-agent/time-tracker.md).
- [Retry final summary](evidence/retry_xdx_p9_final_summary.md).
- [Site acceptance](evidence/retry_xdx_p6_acceptance.md).
- [Contact acceptance](evidence/retry_xdx_p7_acceptance.md).
- [Current governance timing](time-tracker.md).
- Verification receipt: evidence/xdx_verification.txt, populated by this task's local checks.

Retained source documents are snapshots. Their original relative links require the source branch/path in the manifest. No secrets or environment configuration were copied.
