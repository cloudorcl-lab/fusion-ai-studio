# XDX Supplier Core — golden-path manifest

Version 1.0.0. Approved scope is the eight requirements below. Instantiate durable test IDs during authoring without adding resource operations. Each scenario maps to one requirement; shared invariant checks may support several requirements. Configured replay is distinct from native and live acceptance.

| Scenario | Requirement | Route / terminal owner | Required evidence | Execution state |
| --- | --- | --- | --- | --- |
| GP-SUP-READ | SUP-READ | supplier.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Not started |
| GP-SUP-CREATE | SUP-CREATE | supplier.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Not started |
| GP-ADR-READ | ADR-READ | address.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Not started |
| GP-ADR-CREATE | ADR-CREATE | address.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Not started |
| GP-SITE-READ | SITE-READ | site.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Not started |
| GP-SITE-CREATE | SITE-CREATE | site.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Not started |
| GP-CON-READ | CON-READ | contact.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Not started |
| GP-CON-CREATE | CON-CREATE | contact.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Not started |

Focused negative checks: bind stale-approval/cancel/duplicate/unknown-write cases to the corresponding CREATE requirement; missing or wrong parent to child requirements; malformed binding/types and widget structure to the affected route. Use local contracts for deterministic guards and scoped native proof for actual conversation state. Do not perform unsafe live negative mutations or execute every resource × prompt permutation. Exact cases and evidence IDs are recorded before running; no fixed count substitutes for required behavior.
