# Root and worktree reconciliation

Task: xdx-playbook-reconciliation-20261012. Local governance audit only; the supplier benchmark remains paused. Evidence inventory was observed 2026-10-13 UTC (2026-10-12 America/Chicago).

## Source selection and codebase

The root is branch `TestingWFBuildTools`, baseline `62e7416`. The only other registered checkout is `.worktrees/xdx-supplier-core-benchmark-20260930-175939`, branch `codex/xdx-supplier-core-benchmark-20260930-175939`, HEAD `9a7aedf`. Fourteen locally available branch/remote refs were inventoried in [inventory.json](evidence/inventory.json). No network fetch was performed; these remote-tracking refs do not establish current remote state.

The latest locally available committed playbook is Git blob `b5ea372f62edeff3dbe748463eb3256c98f0981f`, last changed in `c3a5779` on 2026-09-28. Root, benchmark and retained slice branch contain that blob. Root/worktree working files have equivalent content with different line endings; original byte hashes are retained. The tracked startup seed is an older snapshot. Package assembly explicitly skips that seed and regenerates it from canonical sources. It must not be used to overwrite root policy.

The codebase contains the bundled AI Studio CLI/authoring references, local lifecycle/query/search/learning validators, timing/evidence/provenance helpers, startup templates, install-packet assembly and tests, and prior supplier app/workflow/BO artifacts and acceptance archives. The root package test commands invoke tenant workflow suites, so they are inappropriate for this documentation-only task. Scoped local governance tests are used instead.

## Findings and dispositions

| Finding | Evidence | Disposition |
| --- | --- | --- |
| Root handoff claimed only base existed and pointed to a superseded restart | Git worktree inventory and [paused benchmark source](evidence/benchmark-paused-handoff-source.md) | Replace root transition record with this task and preserve benchmark pause, failed sign-in and undeployed repair limits. |
| Timing example omitted mandatory learning flags | Runner HELP/pre-action source versus original playbook | Add ledger/scope arguments and receipt registration prerequisite. |
| Required-only payload scope was imposed universally | Gate 0 preserves approved business fields; first-slice rule demanded required-only | Require the exact approved payload; use required-only scope when selected by the user. |
| Purge rule required branch absence even when checkpoint branch retained | Root historical handoff and cleanup rule | Verify branch removal only when authorized; move cleanup detail to its cleanup owner. |
| First-slice and closeout instructions had competing repeated procedures | Original playbook | One first-slice acceptance checklist; Instruction 1 points to Gate 10 for closeout. Preserve Query, BO, multi-turn, semantic, transaction and no-replay obligations. |
| App-specific failure IDs/paths remained in universal main body | F16/F32/F33/F34/F35/F39 references | Keep generalized controls in main path and retained case evidence in change history. |
| Root omitted later supplier display-value rejection | [Hash-verified promoted receipts](evidence/promoted-provenance.json) | Update supplier object reference and registry status; corrected code fields remain unaccepted. Preserve first GET verbatim. |
| Worktree pending-state guard used unsupported direct chat history | Existing workflow context reference; B4 route mismatch; local state repair receipts | Clarify declared reader/writer verification at the conversational-state owner. Retain local-versus-saved/configured/native boundaries. |
| Worktree CLI has 133 insertions/7 deletions plus authoring-guide changes | Compared bundled CLI and guide | Do not import: scalar binding and duplicate-stage confirmation changes lack complete released regression/configured acceptance. Shared-successor node assertions are a proposed worktree guide refinement, not promoted product proof. |
| Worktree repeats login safeguards and carries a private clipboard technique | Worktree AGENTS versus root standing approval | Promote only the recorded user skill exclusion and repeated-rejection stop rule. Keep one sign-in owner and use supported current browser tooling; do not promote an unavailable private bridge API. |
| Seed and archived ZIP predate current canonical governance | Package assembly source | Retain as historical distributions. Build and verify a fresh task-local packet to prove canonical assembly; no release ZIP overwrite requested. |

No worktree, branch, business record or runtime artifact was removed or modified. Root `env.properties` and `.playwright-mcp/` remain unrelated user state. Benchmark CLI, workflow, tests, evidence, approvals and failure ledger remain untouched. Retained checkpoint branches are audit history; age alone is not removal authority.

## Verification and limits

Commands and intervals: [commands.jsonl](commands.jsonl). Scope, reviewed hashes and eight obligations: task session receipt. Learning closure: [failure-ledger.json](failure-ledger.json). Timing and limitations: [time-tracker.md](time-tracker.md).

Required checks: scoped document links/fences/diff/immutable-GET review; policy positive/negative regressions; session-compliance regressions; measured-runner regressions; fresh packet assembly and extracted/installed packet verification; refreshed Startup and final Closeout. Results will be recorded in evidence before delivery.

Observed verification: refreshed Startup and scoped document checks passed; policy positive/negative fixtures passed; session-compliance positive/negative cases passed; timing wrapper passed 25 checks. Fresh packet assembly and the extracted/installed package regression passed, including source parity and portable authority removal. The disposable verification ZIP was removed after its hash receipt was captured; the older distributed ZIP was preserved. Exact commands, exit codes and outputs are in [verification-results.json](evidence/verification-results.json). Final session Closeout is recorded separately in `evidence/closeout.txt`.

The local harness encountered a file-in-use rejection while publishing its shared results summary, after the timing child had passed. The correction writes per-check receipts and publishes the aggregate once. The completed timing run was recovered from its original measured receipt and retained output; passing tests were not repeated. Locking ownership is unproven. A rejected duplicate-path patch operation also applied no change and was repaired with a single update. The timing-report export then exposed PowerShell JSON date coercion; preserving date strings restored the UTC argument contract. These and earlier sandbox/search failures are retained as G001–G006 in the task ledger.

Dependency decisions: retain the canonical documents, task audit/verification utilities and immutable source snapshots as local audit evidence. The utilities are historical task helpers, not new mandatory lifecycle tools or future-build defaults. Remove the completed bootstrap initializer after its session receipt is established. Retain older package snapshots, checkpoint branches, paused worktree changes and prior acceptance archives. No current evidence depends on the disposable ZIP. No runtime, skill executable, package-builder or validator implementation changed, so unchanged application suites were excluded.

No Oracle runtime tests, GETs, POSTs, sign-ins or publication were performed. Benchmark F036/F058/F067 and any other benchmark obligations remain owned by its paused build. This governance task does not close or resume that build. Future work must reconcile the governance commit in that checkout and pass its own Startup before substantive work.
