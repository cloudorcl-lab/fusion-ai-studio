# XDX Supplier Core20260925 — golden-path test manifest

Version1.1.0. **Fresh planned build; no tests executed.** Every scenario maps to one of the eight [requirements](requirement-slice-register.md). Scenario IDs below are durable; instantiate exact prompts, inputs, function/terminal codes and evidence paths during authoring before execution. Do not copy old test PASS, runtime IDs or excluded-resource suites.

## BO prerequisite scenarios

| ID | Requirement | Independent BO proof before dependent integration | State |
| --- | --- | --- | --- |
| BO-SUP-READ | SUP-READ | Actual saved supplier functions: ordinary collection/search/detail, keys/schema/paging; local negative/empty checks | OPEN |
| BO-SUP-CREATE | SUP-CREATE | Render exact typed template; authorized A supplier POST once; independent persisted GET compares all intended fields and generated identifiers | OPEN / launch authority required |
| BO-ADR-READ | ADR-READ | Actual saved address GET functions under verified supplier parent; collection/query/detail and response scope | OPEN |
| BO-ADR-CREATE | ADR-CREATE | Exact typed template; authorized A address POST once under supplier A; independent GET and purpose/parent comparison | OPEN / launch authority required |
| BO-SITE-READ | SITE-READ | Actual saved site GET functions under verified supplier parent; collection/query/detail and response scope | OPEN |
| BO-SITE-CREATE | SITE-CREATE | Exact typed template; current preserved-provider BU GET; authorized A site POST once under supplier A/address A; independent GET verifies submitted values and references | OPEN / launch authority required |
| BO-CON-READ | CON-READ | Actual saved contact GET functions under verified supplier parent; collection/query/detail and response scope | OPEN |
| BO-CON-CREATE | CON-CREATE | Exact typed template; authorized A contact POST once under supplier A; independent GET verifies fields/IDs and no account request | OPEN / launch authority required |

These are the actual dated BO's prerequisites, independently reviewed by someone other than its builder. Raw REST or injected fixture outputs do not prove BO configuration. A and B chains are separately reserved under [the plan's authority contract](plan.md#authority-and-two-chain-operation-ledger); maximum two accepted creates per resource only when the user launch explicitly authorizes both.

## Native/configured journeys

| ID | Requirement | Route / terminal owner to bind | Required new-build evidence | State |
| --- | --- | --- | --- | --- |
| GP-SUP-READ | SUP-READ | supplier.read / one dedicated valid terminal | Actual BO-backed target-app Query, selected list/detail, correct number→ID mapping, paging, honest empty/error result and finished widget rendering | OPEN |
| GP-SUP-CREATE | SUP-CREATE | supplier.create / one dedicated valid terminal | B draft→field-only edit→review→exact approval→POST→independent GET→complete native result; actual producer/consumer guards | OPEN |
| GP-ADR-READ | ADR-READ | address.read / one dedicated valid terminal | Ordinary parent-scoped BO list/query/detail, paging/empty behavior and completed native result | OPEN |
| GP-ADR-CREATE | ADR-CREATE | address.create / one dedicated valid terminal | B complete approved transaction, stable parent across edit, ordering purpose and independent persisted comparison | OPEN |
| GP-SITE-READ | SITE-READ | site.read / one dedicated valid terminal | Ordinary parent-scoped BO list/query/detail, paging/empty behavior and completed native result | OPEN |
| GP-SITE-CREATE | SITE-CREATE | site.create / one dedicated valid terminal | B complete approved transaction; correct supplier/address/BU and purchasing purpose; independent persisted comparison | OPEN |
| GP-CON-READ | CON-READ | contact.read / one dedicated valid terminal | Ordinary parent-scoped BO list/query/detail, paging/empty behavior and completed native result | OPEN |
| GP-CON-CREATE | CON-CREATE | contact.create / one dedicated valid terminal | B complete approved transaction, correct parent/identity, independent persisted comparison and no account provisioning | OPEN |

The first GP-SUP-READ must use the exact app **Run app preview** and execute its BO; InitDisplay or workflow debug cannot replace it. Prove the complete representative supplier transaction before adapting transaction logic to children. Required configured tests preserve their evaluation modes and semantic judges. Terminal ownership follows valid current observed/graph evidence; inactive assertion ordering or a missing judge is not an acceptable shortcut.

## Exact manual query sequence

Surface: **XDX Supplier Core App20260925, DRAFT, Run app preview**. Use one conversation. Before execution replace `<new-supplier-name>` and `<displayed-supplier-number>` with the same newly verified record from the current build and store the resulting exact strings. Never substitute SupplierId for its displayed number. The table is a script template, not an executed result.

| Step | Exact prompt template | Requirement | Expected | State |
| --- | --- | --- | --- | --- |
| 1 | `Find supplier <new-supplier-name>` | SUP-READ | Correct supplier row, visible number and verified internal mapping | OPEN |
| 2 | `Show details for supplier <displayed-supplier-number>` | SUP-READ | Correct selected supplier; no number-as-REST-ID request or404 | OPEN |
| 3 | `Show addresses for supplier <displayed-supplier-number>` | ADR-READ | Same supplier's address results, including current-chain record when created | OPEN |
| 4 | `Show sites for supplier <displayed-supplier-number>` | SITE-READ | Same supplier's site results; no implicit BU/assignment write | OPEN |
| 5 | `Show contacts for supplier <displayed-supplier-number>` | CON-READ | Same supplier's contact results; no account operation | OPEN |
| 6 | `Find supplier XDX_NO_MATCH_20260925_987654` | SUP-READ | Honest empty result if absent; if an existing record matches, choose and record another scoped no-match value before this test | OPEN |

Preserve user-reported prompt, expected/actual/error, surface and known preceding steps. Record observation/recording time separately from unknown execution time. Retain original failure and subsequent retest; user confirmation is distinct from agent observation. All new statuses remain OPEN here until evidence is recorded.

## Bounded guard and regression coverage

Bind local no-write guards to the corresponding CREATE requirement; bind unresolved/ambiguous displayed number and missing/stale parent to the READ/child requirement. Cover exact approval/edit commands under conflicting extraction, malformed interpolation, actual template parsing and producer→BO binding equality. A blank replay BO input event requires actual producer plus exact binding assertions and independent live proof; it does not permit fabricated input evidence.

After a committed accepted baseline, affected-test selection is the union of `plan-affected-workflow-tests.cjs`, required ATLAS actions and changed-contract tests. Unknown/uncovered changes select all; planner output does not rewrite test hashes, grant authority or remove required judges. Before final acceptance run the full approved configured workflow/app coverage once after authoring/sync is current. Account for outside-scope suggestions explicitly, without importing excluded-resource scenarios. No accepted POST is replayed for regression. Final configured/native acceptance, exact-prompt coverage and Gate9 model-sweep disposition are all **OPEN**.
