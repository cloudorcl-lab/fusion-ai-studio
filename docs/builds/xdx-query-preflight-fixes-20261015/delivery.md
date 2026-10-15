# Query preflight repair delivery

Task `xdx-query-preflight-fixes-20261015`, branch `TestingWFBuildTools`, starting HEAD `179d0061f275755af2384dd4f6e4699afebb7451`.

Four repairs in `scripts/verify-agentic-app-query-contract.cjs`:

- Track completed producer output on every incoming route; reject bypasses, disconnected/self references, first-iteration cycles and failed-producer output. Preserve error, loopback and non-control convergence edges, with documented parallel fan-in semantics.
- Reject unresolved local BO and function definitions instead of skipping their path checks. The CLI resolves from its existing sibling BO directory and fails closed when that directory cannot supply a referenced contract.
- Validate nested BO path inputs and nested expressions using pipeline entries and lexical scopes. Preserve available ancestor/local producers, nearest-scope shadowing, loop currentItem/index and qualified body producers.
- Validate ordered, nonempty interpolation segments with quoted text and object-brace handling. This is not a full JavaScript parser.

## Focused evidence

Only the existing validator test owner was executed: `node scripts/tests/verify-agentic-app-query-contract.cjs`. It includes four real local CLI fixtures against temporary synthetic files. No broad test suite, Oracle CLI workflow tests, remote operation or tenant call ran. Required policy/session/learning/evidence gates and scoped diff checks are governance verification, separate from product tests.

| Checkpoint | Result | Evidence |
| --- | --- | --- |
| Initial RED, unchanged validator | 29 expected failing / 9 passing | `focused-red.json`, raw output retained |
| First repaired run | 42/43; rejection diagnostic omitted qualified inner identity | `focused-green.json`, original failure retained |
| Diagnostic correction | 43/43 | `focused-green-final.json` |
| Independent-review RED | Two expected edge-preservation failures; 43 passing | `review-red.json` |
| Final focused GREEN | **45/45 plus retained legacy assertions** | `review-green.json`, raw output retained |
| Independent review | Approved; no remaining blockers within four repairs | `review.md`, exact source/test hashes |

Three sub-agents owned tests, implementation and independent review; the parent alone owned gates, execution, shared ledgers, handoff and integration. Each had a scoped Startup receipt. No shared production/test file had concurrent writers. Test author used the existing packaged test file, so no packaging dependency was added and no packet was built or released.

## Learning and handoff

`BUILD_STANDARD.md` now explicitly requires updating the active handoff at every milestone before proceeding. This run updated the single active handoff at each recorded milestone and retained numbered historical snapshots. The existing playbook REST-binding section was refined with the verified preflight requirements; resource-object contracts were unchanged.

Failure/prevention status belongs to `failure-ledger.json`, command measurements to `commands.jsonl`, primary timing/milestones to `build-ledger.json`. Existing unrelated environment/workspace edits, assets and prior analysis remain outside this delivery. No application artifact changed. Source repairs, regression tests, lesson changes, run evidence and handoff form the scoped local commit; no push is authorized or performed.

## Limits and measurement

Static checks do not establish runtime nonblank values, value types, full workflow topology validity, live BO availability or native app behavior. Direct search-only helper resolution remains scoped to supplied definitions; the command preflight invokes the recursive BO-resolution gate before PASS. Qualified inner outputs within the current/ancestor body are supported; outside-loop per-iteration output aggregation is conservatively rejected until an explicit aggregation/cardinality contract exists.

The run ledger reports the observed task window, first verified fixed result and mutually exclusive primary categories. Initial prerequisite reads precede the captured start and remain unallocated; scheduling latency cannot be isolated. Nested command/subagent time is not additive. Bootstrap diagnostic/read-command errors were recorded separately; no additional product rework was needed beyond the diagnostic correction and two review-discovered edge omissions. Parent/subagent token counters are unavailable; tenant calls are zero. The final response/commit tail lies outside the recorded delivery checkpoint.

Next comparable repair: retain the existing packaged test owner and audit every special edge when changing producer availability; continue updating the single handoff before each next milestone.
