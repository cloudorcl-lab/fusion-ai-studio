# Attempt 001: XDX Supplier Workspace

**FAILED — abandoned by user on 2026-09-19. Not customer-deployable. No GitHub upload of the failed implementation.**

The local attempt reviewed had HEAD `9441388bb0c5280e334a72e9ba4a310c363fa9c3` and uncommitted implementation files. This commit identifies its baseline, not a complete committed release. The base retains this assessment, not a dependency or continuation pointer to that checkout. Runtime artifacts, payloads and failed-branch changes have not been imported.

## Requirements and scope

The original Agent Studio web app design covered supplier search/selection, supplier and address/site/contact creation, complete persisted-data display, PDF download and reviewed summary email. The approved revision moved PDF/email to Phase II. Phase I still required query, create, independent persisted verification and complete real UI display for all four resource types. PDF/email deferral is an approved scope change, not a Phase I defect.

The later four-field guided supplier journey was explicitly approved. Its success was limited to that reduced scope; it did not satisfy the complete supplier-and-children application.

## Design evaluation

Sound choices included reuse of the existing BO, deterministic validation/paging/write sequencing, explicit parent-child relationships, a versioned dossier, exact review and revision checks, preservation of intended fields, and GET reconciliation of partial or uncertain writes. These produced useful persistence evidence and prevented an unsafe workaround that would disable stale-form protection.

The critical unproven assumption was that a native form action would restore the workflow state needed to validate the active form, revision and reviewed snapshot. Correct field transport and a matching top-level app conversation ID did not establish workflow-level continuity. Read, form, write, recovery, lookup and presentation behavior accumulated around that assumption before a browser golden path proved it.

One focused workflow was a reasonable starting design, but its stateful route graph interacted poorly with the ATLAS path predictor and drove repeated test-authoring/CLI repairs. Retained findings include impossible combined reference-fetch predictions, stale observed bindings and a judge-only update repair. These were additional engineering work, not evidence that the user journey worked. Complete subdivision references, network-abort durability and atomic concurrent duplicate protection remained outside reduced acceptance.

## Prompt evaluation

The original base planning prompt and later Phase I build prompt were reviewed. The latter correctly required real UI evidence, independent intended-field comparisons, exact review before writes, incomplete-state honesty, no repeated successful POSTs, ATLAS synchronization and honest usage accounting. It explicitly excluded communications from Phase I. Core business requirements were present; blaming prompt wording alone is unsupported.

The principal gap was sequencing specificity: general lifecycle correctness was required, but a minimal native open -> edit -> review -> cancel continuity proof was not an explicit prerequisite to expanding the workflow and broad suite. Extensive completion requirements lacked a concrete failed-hypothesis budget or checkpoint forcing a design decision after repeated boundary failures. Usage tracking was required without an agreed numerical budget. The base also retained older full-scope planning while the build used revised scope, adding status drift.

Execution is more decisive than those prompt weaknesses: by 04:05 UTC, form transport still needed UI evidence and browser startup had failed, yet integration and test expansion continued. Later browser deferral was user-authorized; that explains part of the delay and is not unauthorized work. It nevertheless left the highest-risk interaction unproven while downstream work accumulated.

## Reconstructed attempts

These are evidence-backed phases, not an invented count of every fix or model call. Times are UTC.

| Time | Attempt or decision | Observed outcome | Remaining gap |
| --- | --- | --- | --- |
| Sep 18 00:00–02:34 | Bootstrap, restart checks, environment correction, Phase I split and reference validation | Startup and scoped reference work progressed | No application interaction proof; repeated restart checks were not implementation progress |
| Sep 18 03:17–05:00 | Read routes, forms, startup panels and ATLAS prediction repairs | Local and scoped runtime checks grew; browser bridge failed | Native form submission/state transport unproved |
| Sep 18 13:36–17:56 | Write/recovery integration, lookup selectors, live acceptance and coverage repairs | Five authorized creates/readbacks succeeded; 261 retained jobs and 1,870 known AI Units by 17:51 | Browser acceptance deferred; temporary subdivision restriction and sync work remained |
| Sep 18 18:46–19:17 | Native review and search/paging controls | Review returned “Form is stale; reopen it before submitting” after action-open and query-open; Query paging retained state | Failure narrowed to action continuity, not general API or conversation failure |
| Sep 18 20:00–20:45 | Reduced boundary probes and alias experiment | Query state persisted; native action lacked prior workspace and independent scalar; separate workflow conversations observed; alias hypothesis failed and was reverted | Backend mechanism unproved; correct top-level ID/payload did not restore workflow state |
| Sep 18 21:40–22:58 | Approved guided Query redesign | Four-field entry/review/cancel passed in Chrome; 91 local tests, 30 current workflow cases plus 2 historical reports, one app test passed | Reduced interaction success; native continuity and complete child UX unaccepted |
| Sep 19 06:00–06:20 | Renewed four-create query/create/query QA | All 24 intended persisted fields matched; parent/address/BU relationships correct; one of each child in dossier | Only 22/24 displayed fields matched; two Email fields blank; children used controlled Query payloads, not ordinary guided/native entry |
| Sep 19 | User termination | Attempt classified FAILED and retired from active base handoff | No completion or release claim survives termination |

## Why the extended attempt failed

1. **A necessary interaction contract remained unproved.** Native review could not recover state required by the safety guards. Query controls worked, excluding universal state or supplier API failure. This is the deepest confirmed boundary, not a proven Oracle backend root cause.
2. **Verification breadth preceded the decisive usability proof.** Workflow assertions, fixtures and POST/GET operations tested different boundaries from a native click. They could not resolve the missing proof. Continued synchronization and repairs increased effort without making the original journey acceptable.
3. **The approved workaround reduced coverage.** Guided Query restored a supplier-only path. Broader child/dossier logic was not fully reintegrated as an accepted journey. Controlled child submissions demonstrated persistence, not ordinary child entry.
4. **Final display correctness still failed.** Two persisted Email values rendered blank. The address defect appeared before a second email field existed, so duplicate field IDs alone cannot be asserted as the explanation. Persistence success does not repair review/display fidelity. The mechanism remains unknown.
5. **Process overhead and status drift obscured remaining work.** Restart handling, environment correction, reference discovery, test-tool repair, scope transitions and usage reconciliation consumed time. The base handoff still described bootstrap rather than the final state. Evidence cannot assign all elapsed time or quantify each contributor's share.

Causal assessment: contributing architecture/process weaknesses are supported; technical root-cause closure is absent. Whether the state and display defects share an upstream cause is unknown. No new reproduction, platform repair or supplier write was performed for this review. Delivery failure is established even though technical mechanisms remain partly unresolved.

## Time and cost

The retained tracker spans 2026-09-18T00:00:55.888Z through 2026-09-19T06:20:18.408Z: **30 h 19 m 22.520 s of calendar span**, including gaps, user waits and nested tool work. This is not continuous active labor. Earlier planning, delivery tails and some review starts are outside or incompletely measured.

The latest retained ledger summary records **551 jobs, 3,770 known AI Units and 2,663,421 known model tokens**, with two jobs lacking AI Unit data and additional overwritten/recording/browser gaps. These are partial retained figures, not total build cost. The final four-create browser cycle exposed no unit/token telemetry. Overlapping suite summaries and cumulative session counters have not been added together.

## Future design decision

Do not restart this implementation by default. If a replacement is separately authorized, first prove one small, no-write native open/edit/review/cancel cycle with paired workflow identity and state observations. Stop expansion if it fails; require a supported state mechanism or an approved interaction redesign. Then integrate one supplier and one child through exact review, authorized create, persisted comparison and every intended displayed field. Agree a retry/time/unit budget at intake. Preserve the existing guards and distinguish backend, workflow, browser and publication evidence.

This recommendation is not new build approval. The canonical playbook already requires a real InvokeAction path and golden-path-first QA; this review creates no competing policy.

## Evidence and retention

Locally reviewed sources: revised phased plan and build prompt; intake/learning register; time tracker; native state diagnostic (Sep 18 19:17); guided-delivery record (Sep 18 22:58); persisted verification (Sep 19 06:17); browser-observation transcription; final handoff. [SHA-256 fingerprints](../builds/xdx-attempt-review/source-fingerprints.json) identify inspected versions without checkout links. Browser observations are labeled transcriptions, not newly collected raw traces. Historical tests were reviewed, not rerun.

Existing base planning documents are retired historical records; old checkout/branch commands are removed. Remaining document filenames are not live worktree dependencies. Local Git registration and historical objects remain to preserve evidence and uncommitted work; no history rewrite, checkout deletion or external-record deletion occurred.

Publication controls and verification are in the [review receipt](../builds/xdx-attempt-review/verification.md). Only base review/retirement metadata may be committed for hand-forward. The failed implementation must not be merged, cherry-picked or uploaded. Local guards are safeguards, not server-side GitHub policy; deliberate bypass or another clone is outside enforcement.
