# Requirement Slice Register

Root artifact owner: XDX_SUPPLIER_LIFECYCLE_AGENT. BOs own source contracts; CODE owns validation/state; the non-suspending Agentic App Query path owns user decisions. P0-P2 are implemented and accepted; P3 is implemented with signed-in runtime acceptance pending; P4-P9 remain open.

| Requirement ID | User outcome / acceptance | Slice | Owner | Dependencies | Deferred? | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| R00 | Reuse existing BOs and reconcile all resource contracts | P0 | Root workflow / source BO | Previous phase; exact resource contract | No | Accepted: 22-child inventory, current BO snapshots, references and validation |
| R01 | Ask Oracle preserves typed state over Human Chat pause/resume | P1 | Root workflow / source BO | Previous phase; exact resource contract | No | Accepted: DRAFT v86037127; 3/3 conversation steps and 73/73 assertions; canonical suite 5/5; app panel 1/1 |
| R02 | Show grounded supplier and child results with at most four columns | P2 | Root workflow / source BO | Previous phase; exact resource contract | No | Accepted: local 12/12, configured child routes 21/21 each, target app preview supplier/address/site/contact |
| R03 | Gather source defaults; apply-all prepares draft and explicit changes win | P3 | Root workflow / source BO | Previous phase; exact resource contract | Signed-in app preview | Local 14/14; validation zero errors; configured conversation 6/6 and 196/196; cumulative workflow 11/11; app 1/1; target app preview blocked by expired browser session |
| R04 | Create approved supplier and verify every intended field independently | P4 | Root workflow / source BO | Previous phase; exact resource contract | Execution pending | Pending |
| R05 | Create approved address under resolved supplier and verify | P5 | Root workflow / source BO | Previous phase; exact resource contract | Execution pending | Pending |
| R06 | Create approved site with valid address and BU and verify | P6 | Root workflow / source BO | Previous phase; exact resource contract | Execution pending | Pending |
| R07 | Create approved contact without cloning IDs/accounts and verify | P7 | Root workflow / source BO | Previous phase; exact resource contract | Execution pending | Pending |
| R08A | Query/create/confirm business classification under the selected supplier using required fields only | P8 | Root workflow / source BO | P4, classification POST research | Live write approval | C04 contract |
| R08B | Query/create/confirm contact-address association in the same supplier scope | P8 | Root workflow / source BO | P5, P7, association POST research | Live write approval | C07 contract |
| R08C | Query contact data access without provisioning access | P8 | Root workflow / source BO | P7 | No | C08 contract |
| R08D | Query contact roles without provisioning roles/accounts | P8 | Root workflow / source BO | P7 | No | C10 contract |
| R08E | Query supplier merge history as immutable audit data | P8 | Root workflow / source BO | P4 | No | C13 contract |
| R08F | Query/create/confirm supplier product/service category association using required fields only | P8 | Root workflow / source BO | P4, category lookup and POST research | Live write approval | C14 contract |
| R08G | Query products/services view and identify it as read-only view of R08F | P8 | Root workflow / source BO | R08F | No | C15 contract |
| R08H | Query/create/confirm site assignment with resolved client BU and required fields only | P8 | Root workflow / source BO | P6, BU lookup, assignment POST research | Live write approval | C20 contract |
| R08I | Query spend-authorization request history without submitting/resubmitting | P8 | Root workflow / source BO | P4 | No | C22 contract |
| R09 | Reconcile partial/unknown outcomes and prevent repeated submission | P9 | Root workflow / source BO | Previous phase; exact resource contract | Execution pending | Pending |

Explicit exclusions: C02/C09/C11/C12/C18/C19 DFFs, C03/C05/C17 attachments and C21 third-party payment relationships have no workflow or test route. Payment fields and all other optional create fields are omitted under the user's 2026-09-22 scope direction.
