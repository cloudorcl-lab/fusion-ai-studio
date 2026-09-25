# Approved build-process optimization design

Task: xdx-build-process-optimization-20260925. User requested design and implementation after accepting the timing review priorities.

1. Reproduce terminal-owner failure from actual bundled CLI functions using retained workflow/test evidence. Repair the smallest owner; resolve an explicit coverage partition from the current graph rather than declaration order; do not trust observed binding metadata; reject conflicts rather than silently dropping semantic judges. Keep schema/sync safety.
2. Add a read-only affected-test planner comparing an explicit committed baseline with current workflow/BO/test contracts. Select affected approved tests; structural/global/unknown/uncovered changes conservatively select all. Preserve ATLAS-required work and final full configured coverage. Do not rewrite bindings/hashes or run runtime tests automatically.
3. Add a shell-free command timing wrapper recording UTC start/end, elapsed, phase/category, dependency/overlap, rerun reason and exit state. Do not persist raw arguments/environment/output by default; retain unknown/incomplete execution honestly. No background keep-alive claim.
4. Document safe usage at existing lifecycle owners, package current tooling and run source plus installed regression. Batch final source changes before package build.

Decomposition: terminal fix/integration owned by coordinator; independent planner and timing helper may be delegated under newly approved scoped ownership. No shared CLI/workflow edits by helpers. Return tests and exact evidence, not completion assertions. Native app artifacts and BOs remain unchanged.

Acceptance: RED→GREEN regression of actual CLI terminal behavior, ambiguous/stale evidence negatives; conservative selection fixtures proving no omission on uncertainty; timing success/failure/spawn-error/redaction fixtures; policy/session/package checks. No future time saving claimed without matched measurements. Rollback is a scoped Git revert; no tenant rollback needed.

## Review and learning dispositions

- Coverage partitions remain sets; recording format and workflow artifacts are unchanged. Only the shared terminal consumer changes. With no explicit partition, existing default-route inference is retained. Ambiguous, incomplete and disconnected asserted terminals fail closed; existing binding freshness checks remain authoritative.
- Independent review identified an incomplete-path edge case. Added a failing upstream-LLM regression, repaired it, and retained a disconnected-cycle negative. No native CLI/tenant execution is claimed by local extracted-function tests.
- Planner intentionally narrows only CODE source-body edits. Any other changed repository file selects all; future finer dependency analysis needs its own evidence. A clean verified baseline is essential.
- Timer receipts cover wrapped commands only, including wrapper overhead. No whole-build or delegation speedup is claimed. Parent/overlap metadata preserves concurrency without summing nested time.
- Lifecycle lessons update the canonical testing and timing sections, replacing the prior declaration-reordering workaround. No object-reference edits: no resource operation changed or executed.
