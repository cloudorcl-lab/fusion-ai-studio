# Optimization verification

Task: xdx-build-process-optimization-20260925. Observed checkpoint 2026-09-25T16:10:11.915Z.

- Terminal: actual bundled function regression initially RED (declaration order); independent review added partial-path RED. Final14/14 PASS. Includes RETURN ownership, nonassertable connectors, unknown/incomplete/disconnected paths and stale metadata. No explicit partition retains existing default-route inference.
- Retained Supplier Core explicit partitions:30 PASS, including reversed assertion order and comparison with recorded terminals where available; see retained-terminal-verification.json. This is local compatibility, not native runtime proof.
- Planner:26 fixture tests PASS. Only CODE-body changes can select fewer cases; all other repository changes conservatively select all. ATLAS and final configured coverage remain required. No tests or business writes executed by planning.
- Timing:12 checks PASS including literal shell metacharacters, receipt redaction, concurrent writers, failures and unfinished state. See timing-helper-evidence.md and timing-verification.jsonl.
- CLI syntax, living policy regressions and task Startup PASS. Both help commands verified locally.
- Install packet regression PASS:137payload files, source/installed parity, activation of all new tests, overwrite refusal, tamper/extra-file rejection, LF/CRLF equivalence and substantive source-drift rejection. Canonical ZIP replaced only after PASS.
- Git diff whitespace PASS. Runtime artifacts/test definitions/BOs unchanged; no tenant/network business operation. Existing accepted creates never replayed.

Command timings are in commands.jsonl. Installed verification is required packaging proof, not a repeat tenant regression. End-to-end speedup is unmeasured. No pending implementation TODO remains; base integration and exact remote SHA checks are the delivery steps.

## Target-checkout failure and repair boundary

The first base-installed regression failed (2026-09-25T16:12:23.944Z–16:13:20.124Z,56179.2542ms). Timing tests reached11checks, then Windows EPERM during cleanup masked the original parallel-child error. The first source-install PASS remains historical, not final base acceptance. Repair waits for every child before scoped cleanup and preserves original diagnostics; do not infer an underlying production lock cause without evidence. Base receipt retains the failure. Shared terminal compatibility expanded to16PASS with nested-loop and referenceable-block cases. Final package/base revalidation remains required after repair.

Repair evidence: the original masked concurrent exception is unrecoverable. Separate30-by-eight probes reproduced EPERM and isolated it to exclusive lock acquisition. The helper now retries only Windows acquisition EPERM within the unchanged bound; it never removes another owner's lock. Harness failures wait for all siblings and retain stderr. Timing14checks and matched240writers/zero failures PASS; see timing-helper-evidence.md and timing-concurrency-repair.json. Terminal suite now18PASS, including actual conversation semantic judge gate; no judge removal or hash rewrite.

2026-09-25T16:21:11.794Z: corrected137-file packet installed regression PASS, activating terminal18, planner26 and timing14checks plus policy/session/Query/helper gates and all package negatives. Canonical ZIP replaced after PASS. Target-checkout acceptance of the corrected packet remains in the separately tracked base integration task.

2026-09-25T16:23:15.939Z: corrected target-checkout install regression PASS137files, terminal18/planner26/timing14checks, all policy/session/Query/helper and packaging rejection checks. The original target failure and successful repair rerun are both retained in base-commands.jsonl. No runtime artifact/test-definition/BO changes in Git range2118aa8..c64cdc4. Thirty-five document links and fences checked. Three unrelated base deletions remain unstaged.
