# PO Recovery retrospective: base policy comparison

Task xdx-po-retro-governance-20261016. Scope: documentation-only refinement in base TestingWFBuildTools; no product rebuild, tests or tenant execution.

| Evidence | Existing base owner | Gap and refinement |
| --- | --- | --- |
| F094/F122 state loss and malformed document contexts | Gate 3 conversational state; Gate 5 action lifecycle | Require explicit observed stage-state transport and bounded-size round-trip before history/batch/format expansion. |
| Final INVALID_PREVIEW_ACTION despite local checks | Gate 7 and first-slice fast-fail | Connected journey on one candidate, including required post-action documents/downloads; incompatible historical passes cannot qualify it. |
| F125 locally closed with native pending | Continuous failure prevention | Keep current requirement pending independently of historical correction closure. |
| Persistence implemented before Studio connectivity; later deprecated | Gate 2 readiness | Consumer-runtime probe before dependent infrastructure expansion; local connectivity has a narrower evidence boundary. |
| F026/F027/F034 browser SQL and timeout overruns | BUILD_STANDARD prerequisites; stuck-process table | Discover direct tools first, declare total deadline and recovery, prohibit repeating failed timeout mechanism without correction. |
| Repeated repair variants and bookkeeping | Existing recurrence stop rule | Two candidates or 30 observed active minutes triggers independent architecture decision; counter survives turns/renames. |

The base already required first-slice proof, real InvokeAction evidence, exact versions, no unchanged retries, and one authoritative ledger. This update narrows enforcement ambiguity rather than adding another playbook. Defaults for deadlines/repair review are prospective operating choices, not empirically established optimal limits. They may be changed with recorded evidence and review; scope reductions require existing or new user authorization.

## Evidence and measurement limits

Copied original run receipts are retained under evidence/ with po- prefixes. The failure ledger contains 127 entries, including process/tooling findings; these are not 127 independent product defects. The build start was 2026-10-14T22:25:58.7012848Z and failed stop 2026-10-16T15:49:04.324Z, approximately 41.38 hours elapsed. Recorded browser overruns were 25083.4424 and 3369.4865 seconds; their internal cause and precise productive-time allocation remain unknown. User-deprecated persistence and excluded email delivery are scope amendments, not unresolved delivery obligations.

## Enforcement and verification

Mandatory controls are checked by coordinator/reviewer receipts at expansion and delivery. Existing structural/session/hash validators remain unchanged and cannot prove an unobserved native journey or force agent invocation. No new test files, tests, hooks, runtime enforcement or product code were added. Independent reviewer /root/retro_policy_review returned PASS on the exact policy diff. Existing policy and session gates plus scoped diff/link checks provide documentation verification, not evidence of future build success.

## Approved release/component/simulation refinement

Follow-up discussion identified missing release discipline: component contracts before implementation, simulation decisions and exits, product-versus-harness failure classification, and a working baseline preserved through increments. Added these to existing owners and three compact sections to the startup intake template. BUILD_STANDARD owns release commitments and delivery decisions; the playbook owns component and simulation lifecycle. No additional permanent guide or test suite. See release-simulation-verification.json for current exact policy hashes and independent review.
