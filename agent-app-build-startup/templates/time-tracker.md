# Build Time Tracker

Record observed values only. `unavailable` is valid; do not substitute zero or an estimate for missing workflow time, tokens, or AI Units.

| Timestamp | Activity | Elapsed | Tokens | AI Units | Outcome | Evidence |
| --- | --- | --- | --- | --- | --- | --- |

## Activity intervals

The existing append helper populates the summary table above only. It does not
capture these intervals automatically. Record observed boundaries here or link
tool-emitted evidence; keep missing intervals unallocated. Do not add overlapping
or nested durations to task elapsed time.

| Activity ID | Phase | Category | Start UTC | End UTC | Parent / overlap IDs | Outcome | Evidence / missing-value reason |
| --- | --- | --- | --- | --- | --- | --- | --- |

Categories: build, test, repair, coordination, wait, closeout, unallocated.
