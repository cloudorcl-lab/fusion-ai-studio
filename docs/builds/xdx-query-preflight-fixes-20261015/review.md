# Independent Query preflight review

Disposition: approved within the four authorized repairs; no remaining blocking findings. Reviewer task: `xdx-query-preflight-fixes-20261015-review`. Reviewed branch: `TestingWFBuildTools`, starting HEAD `179d0061f275755af2384dd4f6e4699afebb7451`. Root owns integration, gates and completion.

Reviewed final source SHA-256: `ea393bbc51a4eb18187eb591e8610b1d821ff537a17e193da9a2db4cd5d7607e` (`scripts/verify-agentic-app-query-contract.cjs`). Reviewed final test SHA-256: `b948443f7b951774642562e5e0911af6965fb029c8662809c87a90bfb852990b` (`scripts/tests/verify-agentic-app-query-contract.cjs`). These match the root-executed [final receipt](review-green.json), observed 2026-10-15T11:41:43.640Z: child exit 0, 45/45 focused cases passed, plus retained legacy assertions. The reviewer inspected the [raw output](review-green.output.txt) and did not execute tests or tenant operations.

## Requirement assessment

| Repair | Independent assessment |
| --- | --- |
| Every-route producer availability | Two-state traversal preserves first-arrival unavailability across bypasses, disconnected producers, cycles, self references and producer error paths. Dedicated PARALLEL summaries preserve documented completed-branch output without treating convergence as an executable shortcut. Positive and conditional-negative fixtures cover that compatibility. |
| Unresolved BO/functions | Root and nested BO nodes fail closed with separate object/function diagnostics. The real local CLI fixture proves an absent BO directory no longer produces PASS. |
| Nested path inputs and bindings | Pipeline ownership, declared roots and lexical lookup preserve local shadowing and ancestor boundaries. Nested missing/blank path inputs, stale/qualified producers and bypasses are covered. Documented LOOP currentItem/index and qualified body-node paths remain valid. Query-only parameters remain outside REST path-token requirements. |
| Delimiter order | Scanner rejects closing-before-opening, nested delimiters and empty expressions; preserves multiple expressions, object braces and quoted delimiter text. Existing malformed-expression diagnostic remains intact. |

## Review findings and resolution

Two material route omissions were reported before approval and reproduced by root as exactly two failing added fixtures in [review RED](review-red.json), with original output retained in [review-red.output.txt](review-red.output.txt). Their status belongs to the [failure ledger](failure-ledger.json), not this narrative.

- Generic convergence bypass: the earlier implementation dropped convergence whenever any outcome existed. The final `availabilityTargets` at source lines 107–113 limits branch-join suppression to SWITCH, CONDITION and PARALLEL; a CODE convergence bypass remains an incoming route. The matching negative fixture now passes.
- PARALLEL loopback bypass: the earlier atomic fan-in summary omitted loopback metadata. The final summary at source lines 149–160 enqueues the loopback using pre-completion availability, preserving the bypass without granting completed parallel output. The matching negative fixture now passes.

The final source and tests were independently reread after both corrections. The existing `edgeTargets` suspension traversal and existing search-contract integration remain intact. The added playbook paragraph refines the existing REST-binding owner and states the static/runtime boundary; the BUILD_STANDARD milestone correction retains one active handoff and historical ledger snapshots.

## Limits

This approval covers local static validation and focused synthetic CLI regressions only. It establishes neither runtime values/types nor general workflow topology validity, native execution, tenant behavior or full JavaScript expression syntax. PARALLEL topology validation beyond producer availability remains outside scope.

Qualified outputs inside the current or ancestor loop body are supported. Reading an individual inner iteration's output from outside the completed loop is conservatively rejected: the local loop reference documents qualified paths but supplies no guaranteed aggregation/cardinality contract for that outside use. No demonstrated existing safe outside-loop behavior was found that makes this a blocking regression. Any future support needs an explicit source-backed aggregation contract and focused fixtures.

No source/test edits, broad suites, app/runtime tests, tenant calls or deployment were performed by this reviewer. Only this review evidence file was written. Scoped/root Closeout and the final delivery remain the coordinator's responsibility.
