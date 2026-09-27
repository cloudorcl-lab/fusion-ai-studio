# Build Time Tracker

Record observed values only. `unavailable` is valid; do not substitute zero or an estimate for missing workflow time, tokens, or AI Units.

| Timestamp | Activity | Elapsed | Tokens | AI Units | Outcome | Evidence |
| --- | --- | --- | --- | --- | --- | --- |

## Activity intervals

The existing append helper populates the summary table above only. It does not
capture these intervals automatically. Use `node scripts/measure-build-command.cjs --help`
for shell-free command intervals in a linked JSONL receipt. Group by runId; an
unmatched start is unknown completion. Never sum parallel or nested durations.
The wrapper does not collect token/AI Unit metrics or renew browser sessions.
Record observed boundaries here or link
tool-emitted evidence; keep missing intervals unallocated. Do not add overlapping
or nested durations to task elapsed time.

| Activity ID | Phase | Category | Start UTC | End UTC | Parent / overlap IDs | Outcome | Evidence / missing-value reason |
| --- | --- | --- | --- | --- | --- | --- | --- |

Categories: build, test, repair, coordination, wait, closeout, unallocated.

Activity kinds: execution, review, evidence-capture, coordination,
context-recovery, human-wait. Record live boundaries with the timing CLI's
`interval` mode; add `--activity-kind` to command measurements. Generate unioned
coverage with `report`; per-kind totals overlap and are not additive labor.
Report work during human waits and waits without observed work separately.
Retrospective intervals must cite observed source timestamps and be labeled;
do not backdate live interval events. Unknown gaps remain unallocated.

## Browser continuity when acceptance is pending

Record observed state, not inferred renewal. Use the canonical keep-alive deadline and capability fallback.

| Observed UTC | Tab / artifact | Authentication | Action / result | Next due UTC | Reminder handle or unavailable reason |
| --- | --- | --- | --- | --- | --- |
