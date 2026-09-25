# Supplier Core manual testing results

Run: user-executed six-step query script following build delivery at commit `746478e`.
Recorded UTC: 2026-09-25T02:36:35Z (recording time; execution time not supplied).
Initial evidence source: user report in this conversation. Subsequent diagnosis and native retest are recorded below.

## Initial run (historical)

| Step | Prompt | Result |
| --- | --- | --- |
| 1 | Find supplier XDX Core Supplier 20260924 2130 | Not reported |
| 2 | Show details for supplier 1506 | **FAIL404 — user reported; agent native retest PASS after repair** |
| 3 | Show addresses for supplier 1506 | **FAIL404 — user reported; agent native retest PASS after repair** |
| 4 | Show sites for supplier 1506 | Not reported |
| 5 | Show contacts for supplier 1506 | Not reported |
| 6 | Find supplier XDX_NO_MATCH_987654 | Not reported |

Step 2 expected: details for supplier number 1506, XDX Core Supplier 20260924 2130.
Actual: user stated "#2 failed." Specific response, error and failure mechanism not supplied.

Initial disposition (superseded by later fix authorization): open manual-test failure. User explicitly instructed recording only; do not fix yet. No diagnosis, runtime rerun, artifact change or remote save performed. Prior acceptance receipts remain historical evidence and do not resolve this newly reported failure.

## Repair authorization and clarified results

User reports both step 2 and step 3 fail with HTTP 404. Step 3 exact prompt: `Show addresses for supplier 1506`. Expected: XDX Core Address 20260924. Browser observation: `Node FETCH_ADDRESS_PARENT failed with error: Request failed with status 404 and error family CLIENT_ERROR`, target workflow DRAFT in Chrome tab676647338. User authorizes diagnosis and fix; no publish/push. Steps 1,4,5,6 remain unreported.

## Applied repair and retest

DRAFT86237214 / ETag18. Corrected read preparation to map displayed SupplierNumber to SupplierId from verified conversation query rows, preserving exact IDs, transaction state and child scope. Unknown/ambiguous numbers require selection rather than REST access. Native app exact steps1-3 PASS; see [repair evidence](evidence/xdx_number404_native.md). Configured regression PASS:3/3steps,358/358 assertions, all semantic judges complete. Closeout receipt records final governance verification.

## User-confirmed final manual results

Recorded UTC: 2026-09-25T03:11:24Z. User reported "all pass" for the six-step test list after repair commit `2cbdecb`. Execution timestamps and individual response captures were not supplied. This is user-reported acceptance; no additional agent rerun was performed.

| Step | Exact test prompt | Expected result | Final result |
| --- | --- | --- | --- |
| 1 | Find supplier XDX Core Supplier 20260924 2130 | Supplier 1506 | PASS — user confirmed |
| 2 | Show details for supplier 1506 | Correct supplier details | PASS — user confirmed |
| 3 | Show addresses for supplier 1506 | XDX Core Address 20260924 | PASS — user confirmed |
| 4 | Show sites for supplier 1506 | XDX Core Site 20260924 | PASS — user confirmed |
| 5 | Show contacts for supplier 1506 | CoreContact20260924, XDX | PASS — user confirmed |
| 6 | Find supplier XDX_NO_MATCH_987654 | No matching suppliers | PASS — user confirmed |

Disposition: all six manual scenarios accepted by the user. Initial steps2/3 failures and repair evidence remain preserved above. No new artifact or runtime changes.
