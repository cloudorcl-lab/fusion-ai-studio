# Supplier lifecycle — worked example

Model version: **1.0.1**. Status: illustrative, not executable or authorized.
Historical source: supplier planning commits 83c80da and b5034c6; completed retry
6c85117. This retrospectively applies the improved structure; it does not claim
the original build followed it. See the [introspection](../../../builds/xdx-build-introspection-20260924/xdx_introspection_20260924.md).
Historical IDs, permissions and acceptance are not defaults for a future build.

## Outcome and scope

Query, prepare, review, create and independently confirm eight supplier resources.
For this example, use at most four useful business columns and keep technical IDs
internal. Exclude DFFs, attachments, payments, account provisioning and unrelated
query-only children. Those choices are build-specific, not universal template rules.

## Resource/operation inventory

Each READ requirement needs an ordinary app read/list route and rendered evidence.
Each CREATE requirement needs preparation/review, exact approval, one accepted POST
and independent persisted comparison. Confirmation GETs do not prove READ rows.

| Requirement IDs | Resource | Parent/reference prerequisites | Coverage |
| --- | --- | --- | --- |
| SUP-READ / SUP-CREATE | Supplier | Approved identity contract | Ordinary search/read; create and confirmation |
| ADR-READ / ADR-CREATE | Address | Supplier, postal/purpose contract | Ordinary list; create and confirmation |
| SITE-READ / SITE-CREATE | Site | Supplier, address, procurement BU | Ordinary list; create and confirmation |
| CON-READ / CON-CREATE | Contact | Supplier, identity contract | Ordinary list; create/confirm without provisioning |
| CLS-READ / CLS-CREATE | Classification | Supplier, classification reference | Ordinary list; create and confirmation |
| CA-READ / CA-CREATE | Contact-address | Contact and address under intended supplier | Ordinary list; association create and confirmation |
| PS-READ / PS-CREATE | Products/services | Supplier, valid category | Ordinary list; association create and confirmation |
| SA-READ / SA-CREATE | Site assignment | Site, approved client/bill-to BUs | Ordinary list; assignment create and confirmation |

Bind each row to its matching [object reference](../../../lessons/objects/README.md)
and current release before execution. Sixteen operation requirements are not a
prescribed test count. Additional approved requirements cover field edits, review,
approval invalidation, duplicate prevention and uncertain outcomes. Multi-turn tests
may support several rows only when their assertions establish every required outcome.

## Architecture and sequence

The historical scope used one app-bound workflow with separate InitDisplay/Query
terminal owners and non-suspending Query invocations. Deterministic owners handle
transaction patches, exact commands, revisions, references, payloads and write gates.
An LLM proposes structured candidates. This is an example, not mandatory topology.

| Phase | Improved exit |
| --- | --- |
| Setup | Verified worktree/environment, artifact dispositions, Startup, complete requirement matrix |
| First query | Supplier native Query and configured BO path pass |
| Transaction foundation | First supplier prepare/edit/review/approve/create/GET/display journey passes |
| Address | ADR-READ and ADR-CREATE accepted separately |
| Site | SITE-READ and SITE-CREATE accepted with actual parent/reference bindings |
| Contact | CON-READ and CON-CREATE accepted without provisioning |
| Remaining children | CLS, CA, PS and SA read/create pairs accepted in dependency order |
| Closeout | Every operation and applicable interaction/invariant requirement maps to accepted evidence |

## Example slice: contact-address association

- **Outcome:** approved association plus ordinary subsequent listing; CA-READ/CA-CREATE.
- **Prerequisites:** accepted contact/address, same-parent proof and current object contract.
- **Scope:** association only; no contact update or account side effect.
- **Implementation:** dedicated draft patch, parent resolver, exact command owner and read terminal.
- **Local checks:** parent propagation, rendered payload JSON, identity types, revision invalidation and widget envelope.
- **Configured tests:** manifest-mapped read case and create conversation; actual BO paths and forbidden writes asserted.
- **Cumulative gate:** accepted dependent routes and applicable shared-state/negative controls.
- **Native/live acceptance:** target app review, one authorized create, independent GET and ordinary native list.
- **Evidence:** versions, parent/reference match, submitted values, generated key, rendered result and timing.
- **Recovery:** reconcile uncertain outcomes read-only; never repeat an accepted POST.
- **Exit:** both operation requirements and applicable interaction/invariant evidence accepted.

## Authority, retry and timing

Keep operator transaction permission separate from app payload/revision approval.
When prior BO consumers cannot be completely enumerated, retain BOs unchanged.
Create uniquely coded new artifacts only under an approved disposition. Record
remote codes independently of local branch/worktree names. Do not make deletion
of an explicitly retained BO a prerequisite elsewhere in the plan.

Use dependency-based estimates and measured activity intervals. The historical
9h28m versus 15h14m windows are not validated estimates for a different object.
Exact build/test labor splits were unavailable. Track missing intervals as
unallocated and measure escaped defects, reopened phases, completeness and time.
