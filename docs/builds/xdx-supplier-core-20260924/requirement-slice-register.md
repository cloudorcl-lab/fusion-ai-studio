# XDX Supplier Core — requirement register

Version 1.0.0. Exactly four resources and eight operation requirements. All evidence pending; planning is not runtime acceptance. The plan owns scope; this register owns acceptance status.

| ID | Resource / operation | Acceptance | Owner / slice | Dependencies | Local / configured / native or persisted evidence | Status |
| --- | --- | --- | --- | --- | --- | --- |
| SUP-READ | Supplier / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P1 / P2 | none | Pending | Not started |
| SUP-CREATE | Supplier / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P1 / P2 | none | Pending | Not started |
| ADR-READ | Address / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P3 | SupplierId | Pending | Not started |
| ADR-CREATE | Address / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P3 | SupplierId | Pending | Not started |
| SITE-READ | Site / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P4 | SupplierId + address + BU | Pending | Not started |
| SITE-CREATE | Site / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P4 | SupplierId + address + BU | Pending | Not started |
| CON-READ | Contact / READ | Ordinary list/query and selected detail; correct scope, grounded output and paging | Core workflow / P5 | SupplierId | Pending | Not started |
| CON-CREATE | Contact / CREATE | Prepare, field-only edit, review, exact approval, one accepted POST, independent GET and complete native result | Core workflow / P5 | SupplierId | Pending | Not started |
