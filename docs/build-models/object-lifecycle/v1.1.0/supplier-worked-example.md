# Supplier Core — worked example

Model version: **1.1.0**. Status: illustrative, not executable or authorized.
This applies the [Supplier Core introspection](../../../builds/xdx-supplier-core-20260924/xdx_introspection_20260925.md)
and [process changes](../../../builds/xdx-build-process-optimization-20260925/plan.md).
It does not claim the historical run followed this sequence. Historical IDs,
permissions and acceptance never become defaults for a future build. Version 1.0.1
retains the broader example; this example covers four resources only.

## Outcome and requirements

Query and create suppliers, addresses, sites and contacts. No other sub-objects,
persisted update/delete, payments, attachments or account provisioning. Procurement
BU lookup is a read-only site dependency, not another application journey.

| Requirement pair | Resource | Dependency | Independent acceptance |
| --- | --- | --- | --- |
| SUP-READ / SUP-CREATE | Supplier | Identity contract | Ordinary search/detail; approved create and persisted GET |
| ADR-READ / ADR-CREATE | Address | Supplier key, postal/purpose contract | Ordinary list/detail; approved create and persisted GET |
| SITE-READ / SITE-CREATE | Site | Supplier, address, procurement BU | Ordinary list/detail; approved create and persisted GET |
| CON-READ / CON-CREATE | Contact | Supplier, contact identity | Ordinary list/detail; approved create/GET without provisioning |

The requirement register also covers field edits, exact approval, revision invalidation,
duplicate checks and uncertain results. Bind rows to matching
[object references](../../../lessons/objects/README.md). Confirmation GET does not prove
ordinary READ acceptance. These rows do not prescribe a test count or expand scope.

## Dependency sequence and delegation

| Package | Owner and parallel preparation | Exit before dependent integration |
| --- | --- | --- |
| Contracts | Researchers on separate references or proposals | Reviewed keys, fields, schemas and provenance |
| Supplier BO | BO owner, independent local-test/review support | Saved functions; direct GET and authorized POST/persisted GET receipt |
| Child BOs | Same writer for shared BO; independent contract preparation | Each child's direct proof using verified parent/reference keys |
| Workflow foundation | Workflow owner designs local state/approval logic against frozen interfaces | BO receipt reviewed, actual bindings verified, first native Query accepted |
| Representative transaction | Coordinator controls mutations/browser; separate reviewer | Prepare/edit/review/exact approval/authorized POST/GET/display accepted |
| Remaining slices | Extend proven transaction pattern in dependency order | Separate read/create requirements and affected regression accepted |
| Final acceptance | Coordinator and evidence reviewer | Exact prompts, final configured coverage, DRAFT native acceptance and Closeout |

A BO specialist may build and test its BO; another owner reviews readiness. A shared
BO has one writer; do not split production artifacts solely to distribute edits.
Assignments specify exact paths, frozen interfaces, write budgets, stop conditions and
receipts. Coordinator owns mutation scheduling, browser and accepted-ID ledger.
Separate worktrees do not isolate tenant state. Follow the canonical delegated-ownership
gate; contracts, local tests and evidence review can proceed independently.

## Write budget and example address slice

Direct BO POST and native approval-to-POST are distinct proofs. If both are required,
separately authorize a direct-test transaction and a native-test transaction. Operator
permission is not app payload/revision approval. If only one create is permitted, or
every POST must follow app approval, withhold the conflicting direct POST and resolve
the authorized route before dependent integration. Reuse evidence only within its
proven artifact, environment and payload scope.

- **Prerequisites:** supplier readiness, parent key, address contract, reviewed saved-BO
  receipt and explicit write budget.
- **Local checks:** exact request-template JSON, identity types, parent bindings,
  field-only edits, revision invalidation and widget envelope.
- **Workflow checks:** actual producer-to-BO inputs, ordinary address list/detail,
  query-first selection and ambiguous/unknown identifier behavior.
- **Native proof:** Run app review/approval journey, separately authorized transaction
  if required, independent persisted GET and ordinary rendered address results.
- **Recovery:** retain uncertain request identity; reconcile read-only. Never replay
  an accepted POST for another layer, agent, timing sample or documentation.

## Efficient verification without omitted acceptance

For CODE-body-only changes, compare an explicit verified Git commit using
`scripts/plan-affected-workflow-tests.cjs`. Exclusion requires explicit non-execution
on every step and positive coverage elsewhere. Unknown, structural, BO and binding
changes select all or block. Union with ATLAS-required actions; complete the final
configured suite. Selection does not authorize repeated writes; use matching retained
evidence/fixtures only where the approved manifest permits them.

Inventory exact prompts such as `Find supplier <name>`, `Show details for supplier
<displayed-number>` and child-list prompts. Preserve the preceding query and same
conversation. An internal SupplierId prompt does not cover a displayed SupplierNumber
prompt. Record expected/actual results, target surface, original failures and retests;
distinguish user confirmation from observed evidence and unknown execution times.

Use maintained CLI graph-based terminal inference. Repair ambiguous/incomplete path
contracts instead of reordering declarations to obtain a preferred terminal. Run Query
preflight and actual serialized CODE/request checks before applicable remote actions.

## Timing, continuity and delivery

Wrap executable build/test commands with `scripts/measure-build-command.cjs`, recording
safe phase/activity, dependency, overlap and rerun metadata. Keep task/wait/browser
boundaries in the human tracker. Unmatched starts and missing intervals remain unknown;
never sum nested/parallel command durations into elapsed task time or claim speedup
from parallelism alone. Historical durations have different scope/acceptance boundaries.

Observe the exact Studio tab under canonical keep-alive deadlines while native
acceptance is pending; record reminder capability or manual fallback. CLI authentication
does not prove browser continuity. Checkpoint at 70–75% context and validate on resume.

Record Gate 9 model optimization as required now or deferred to a named gate with
baseline rationale. Process improvements alone do not authorize a model sweep. Settle
source/governance before packaging, verify installed and target-checkout parity, then
complete Closeout at the approved DRAFT boundary. Git push, publication and artifact
purge require separate authority; this example grants none.
