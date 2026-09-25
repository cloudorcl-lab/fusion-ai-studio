# XDX Supplier Core — golden-path manifest

Version 1.0.0. Approved scope is the eight requirements below. Instantiate durable test IDs during authoring without adding resource operations. Each scenario maps to one requirement; shared invariant checks may support several requirements. Configured replay is distinct from native and live acceptance.

| Scenario | Requirement | Route / terminal owner | Required evidence | Execution state |
| --- | --- | --- | --- | --- |
| GP-SUP-READ | SUP-READ | supplier.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Accepted; final configured14/14 with complete judges |
| GP-SUP-CREATE | SUP-CREATE | supplier.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Accepted; final configured14/14 with complete judges |
| GP-ADR-READ | ADR-READ | address.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Accepted; final configured14/14 with complete judges |
| GP-ADR-CREATE | ADR-CREATE | address.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Accepted; final configured14/14 with complete judges |
| GP-SITE-READ | SITE-READ | site.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Accepted P4 native empty/search/selected-detail/paging; final configured14/14 with all judges |
| GP-SITE-CREATE | SITE-CREATE | site.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Accepted P4 exact-approved create300000333814424 and independent GET; final configured14/14 with all judges |
| GP-CON-READ | CON-READ | contact.read / one dedicated route terminal in core workflow | Real BO-backed native query; list/detail, selection, paging and empty/error behavior | Native accepted, evidence/xdx_p5_native_contact.md; final configured14/14 with all judges |
| GP-CON-CREATE | CON-CREATE | contact.create / one dedicated route terminal in core workflow | Native draft/edit/review/approval/result; persisted intended values and parent relationships | Native accepted, contact300000333814434, evidence/xdx_p5_native_contact.md; final configured14/14 with all judges |

Focused negative checks: bind stale-approval/cancel/duplicate/unknown-write cases to the corresponding CREATE requirement; missing or wrong parent to child requirements; malformed binding/types and widget structure to the affected route. Use local contracts for deterministic guards and scoped native proof for actual conversation state. Do not perform unsafe live negative mutations or execute every resource × prompt permutation. Exact cases and evidence IDs are recorded before running; no fixed count substitutes for required behavior.

## Manual-test404 repair regression

New custom `supplier-number-manual-regression`: exact prompts1-3 in order, same conversation, query-only. Derived retained GET fixtures; runtime assertions require actual PREPARE_READ/PREPARE_ADDRESS outputs to equal the selected SupplierId and local contract asserts exact corresponding BO bindings. Native app steps1-3 independently verify live paths and rendered complete outputs. Prior14 configured tests/app1 remain historical baseline; this targeted repair does not alter BOs, topology, write logic, terminal prompts or app configuration.
