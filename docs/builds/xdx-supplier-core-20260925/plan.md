# XDX Supplier Core — next build plan

Plan/model version: **1.1.0**,2026-09-25. Build:`xdx-supplier-core-20260925`. Status: **PREPARED / NOT STARTED**. No runtime result or write authority is supplied by this document. [Execution prompt](execution-prompt.md), [requirements](requirement-slice-register.md) and [golden manifest](golden-path-test-manifest.md) are fresh launch inputs. The [canonical playbook](../../lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md) owns lifecycle; [model1.1.0](../../build-models/object-lifecycle/v1.1.0/plan-template.md) owns reusable structure.

## Outcome and exclusions

One native Oracle AI Studio DRAFT Agentic App supports ordinary query/list/detail and approved create for **suppliers, supplier addresses, supplier sites and supplier contacts only**. Retain conversational query → prepare → field edit → review → exact create approval → guarded POST → independent persisted GET → complete native result. Accuracy, completeness and elapsed time are priorities.

No assignments, classifications, products/services/categories, contact-address associations, contact roles/data access, spend authorization, merge history, DFF/global DFF, attachments, bank/payment/third-party-payment objects or account provisioning. No persisted UPDATE/PATCH/DELETE, batch create, PDF, email or custom UI. Editing an unsent transaction draft is allowed. Procurement BU GET is a read-only site-field dependency, not a separate lifecycle. Never add an excluded child to bypass a prerequisite.

The eight-row requirement register is the acceptance owner. Ordinary reads are separately proven from confirmation GETs. All results begin OPEN; historical acceptance is learning evidence, never this build's result.

## Launch identity and source revision

Base:`C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1`, branch`TestingWFBuildTools`.
New branch:`codex/xdx-supplier-core-20260925`.
New worktree:`C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1/.worktrees/xdx-supplier-core-20260925`.

At launch resolve and record the exact committed base SHA containing governance59fd032, this plan, model1.1.0 and the completed [restart preparation](../xdx-supplier-core-restart-preparation-20260925/intake-and-learning-register.md). Inspect the actual purge receipt; preparation does not imply every old provider was deleted. Verify required files are tracked and unchanged against that commit. Create the worktree from this resolved SHA; stop on path/branch collision. Never build in base or reuse the old worktree silently. Use only the active checkout's configuration; verify eqih-dev21 and expected identity before tenant action without printing credentials.

| Artifact | New exact code | Local file |
| --- | --- | --- |
| App | XDX_SUPPLIER_CORE_APP_20260925 | src/apps/xdx_supplier_core_app_20260925.app |
| Workflow | XDX_SUPPLIER_CORE_20260925 | src/workflows/xdx_supplier_core_20260925.wf |
| BO | XDX_SUPPLIER_CORE_DATA_20260925 | src/businessObjects/xdx_supplier_core_data_20260925.bo |

Verify layout and exact-code absence before creation. Use XDX display names. Collision is a reconciliation stop, never overwrite authority. All browser openings use `https://fa-eqih-dev21-saasfademo1.ds-fa.oraclepdemos.com/hcmUI/redwoodAI`, then navigate to the exact app's **Run app preview**.

## Field and source contracts

Read the [object registry](../../lessons/objects/README.md) and each reference below at launch. Retained references describe26C/API11.13.18.05; revalidate changed or unresolved product/tenant facts before dependent execution. Do not copy schemas or historical IDs into this plan as runtime defaults.

| Resource | Required boundary | Contract owner |
| --- | --- | --- |
| Supplier | Displayed SupplierNumber versus internal SupplierId; tenant-required relationship/organization fields and generated omissions | [Suppliers](../../lessons/objects/oracle-fusion-procurement-suppliers.md) |
| Address | Correct supplier parent, conditional ordering purpose, address-country metadata and controlled destination | [Addresses](../../lessons/objects/oracle-fusion-procurement-supplier-addresses.md) |
| Site | Same-supplier address and validated BU, purchasing purpose; unresolved uniqueness scope remains explicit | [Sites](../../lessons/objects/oracle-fusion-procurement-supplier-sites.md) |
| Contact | Parent, approved test identity and controlled destination; no account provisioning or generated-ID input | [Contacts](../../lessons/objects/oracle-fusion-procurement-supplier-contacts.md) |
| BU GET only | Identity/name consistency and complete paging before site selection | [Procurement BU LOV](../../lessons/objects/oracle-fusion-procurement-procurement-business-units-lov.md) |

Prepare minimal required business payloads from the exact references and approved inputs. Record field provenance, tenant conditionality, requested values, generated omissions, uniqueness/normalization limitations and intended persisted comparisons. Do not remove a requested valid field to make tooling pass. Use suitable retained GET evidence; only retrieve missing information within authority. Do not refresh immutable first-success samples or copy operational email/legal identifiers. For supported CLI POST example execution, apply the registry's explicit response-purpose contract; request-example mode is not write proof.

## Authority and two-chain operation ledger

This is preparation only. The future user launch must explicitly authorize in-scope DRAFT artifact saves, reads and the proposed **maximum two accepted creates per resource**, eight new business records overall. Reserve one direct-BO fixture chain A and one native-app fixture chain B:

| Resource | Direct BO readiness chain A | Native application acceptance chain B | Initial state |
| --- | --- | --- | --- |
| Supplier | At most one new supplier | At most one separate new supplier | NOT AUTHORIZED / NOT EXECUTED |
| Address | At most one under supplier A | At most one under supplier B | NOT AUTHORIZED / NOT EXECUTED |
| Site | At most one under supplier A/address A | At most one under supplier B/address B | NOT AUTHORIZED / NOT EXECUTED |
| Contact | At most one under supplier A | At most one under supplier B | NOT AUTHORIZED / NOT EXECUTED |

The launch's explicit grant is recorded as authority; table text alone grants nothing. Native B transactions additionally require exact payload/revision approval in the app. Direct A payloads must meet the launch's approved test-data scope and be frozen/reviewed before execution; an agent-authored proposal cannot supply missing human authority. If the launch authorizes only one chain, stop before dependent POST testing and resolve which proof/transaction is authorized. Never double-spend a one-create budget or treat native approval as permission for an additional direct POST.

One coordinator reserves each operation before dispatch, tracks environment, payload hash, parent chain, request/process handle, status and returned IDs, and serializes mutations. An uncertain response freezes that reservation until read-only reconciliation; never retry because a receipt is missing. Definite rejected attempts require recorded diagnosis and materially corrected preflight within existing authority. Extra accepted creates exceed this plan and require separate scope approval. Reuse accepted evidence, never POST for timing, documentation or replay refresh.

Preserve all existing BOs and business records, including old providers retained for unknown consumers. Create only the newly dated BO; do not change the existing BU provider. Historical supplier1506/300000333814409, address300000333814416, site300000333814424 and contact300000333814434 are preservation references, not values or create defaults for this run. Retain earlier archives, reports and accepted-write evidence. No runtime-build purge or business-data deletion is authorized.

## Architecture and delegated ownership

Retain one app-bound terminating workflow, deterministic state/write guards and bounded model extraction, backed by the newly dated BO for the four resources. Reuse the preserved read-only BU provider without modification. App stages are InitDisplay and Query; add InvokeAction only for exposed controls. No reachable HUMAN/WAIT in Query. Models propose allowlisted patches; deterministic code owns routing, merge, field-only edits, requiredness, revision, parent selection, approval invalidation and uncertain-attempt state. Exact review/create commands have one parser owner. Keep read selection separate from transaction patches.

| Package | Assigned ownership at launch | Concurrent work and handoff |
| --- | --- | --- |
| Contract research | Bounded resource researchers | References/retained data only; no competing BO edits |
| BO build and direct test | One BO specialist, sole writer of the shared dated BO | Integrates frozen contracts; executes reserved authorized operations; returns readiness receipt |
| Workflow | One workflow writer | Local state/approval logic may proceed against frozen interfaces; dependent integration waits for BO readiness |
| Independent QA | Coordinator or a separate reviewer | Checks actual BO/function versions, inputs/outputs, persisted comparisons and exact user prompts before integration |
| Native integration | Coordinator, sole shared-browser owner | Serial app operations, write queue, final acceptance and Closeout |

Do not infer separate writable sandboxes from sub-agent identities: worktree/files/tenant are shared. Partition exclusive files, require a reviewed receipt, pause consumers when the source contract changes, and reconcile uncertain operations before reassignment. Parallelism is used only where useful independent work exists; measure elapsed overlap and coordination rather than asserting speedup.

Architecture review is OPEN until launch verifies stage routes, dependency envelopes, stable query-selection mapping, supported state persistence, exact approval contract and native widget shape. Self-review and registers must be complete before artifact mutation. Strict test-first TDD is not imposed; meaningful actual-artifact checks and regressions are mandatory.

## Delivery order and exit gates

| Phase | Work | Required exit before dependent expansion |
| --- | --- | --- |
| P0 Bootstrap | New worktree, identity/authority, references, fresh receipt/intake/timing/operation ledger, architecture self-review | Current Startup and startup-package checks; two-chain authority recorded or dependent POST work blocked |
| P1 BO supplier → native supplier Query | Freeze supplier contract; exact saved BO local template/types; direct ordinary GETs, authorized A POST and independent GET; independent readiness review; wire supplier Query | Actual saved BO proof plus real DRAFT app Query, rendered number/ID mapping, list/detail and empty/paging behavior |
| P2 Native supplier transaction | B prepare, field-only edit, review, exact approval, guarded POST, independent GET and native result | Complete representative transaction accepted before adapting pattern to child workflows |
| P3 Address BO → address workflow | Direct BO read/local/direct A POST/GET and reviewed readiness before dependent address integration | Separate ordinary reads plus complete B transaction, parent ownership and ordering purpose |
| P4 Site BO → site workflow | Direct BO proofs; current BU GET and same-chain address; reviewed readiness | Separate ordinary reads plus complete B transaction; supplier/address/BU relationships verified; no extra child operation |
| P5 Contact BO → contact workflow | Direct BO proofs and reviewed readiness before dependent contact integration | Separate ordinary reads plus complete B transaction; intended fields and no account provisioning |
| P6 Final acceptance and Gate9 | Exact manual sequence, final full approved configured workflow/app coverage, judges/native evidence; explicit performance disposition | All eight rows accepted; no required deferred test/judge, hidden write or unmeasured optimization claim |
| P7 Closeout | Learning, dependency cleanup, final timing, current-task Closeout and scoped local commit | Verified DRAFT report; no publish/push unless launch explicitly changes boundary |

BO readiness is per resource, not a requirement to complete all BOs before any useful workflow design. For each dependency: freeze keys/types/response/error/paging contract; execute the actual serialized BO request template with typed values and parse JSON; validate the BO; save serially; independently execute actual saved BO functions; collect authorized direct POST→independent persisted GET; review artifact/function versions or hashes and exact inputs/outputs. A raw REST bypass or fixture injection is insufficient. Existing BO evidence may be reused only if it proves the actual unchanged artifact/operation/environment boundary; a new dated BO starts unproven. No dependent workflow BO integration or remote acceptance until that operation's gate passes. Read-only workflow work can proceed separately while write proof is blocked.

## Verification and efficiency

Run actual CODE/template tests for field-only edits under conflicting extraction, approval invalidation/cancel, unresolved/ambiguous number selection, wrong/stale parent, blank path tokens and malformed interpolation. Test no-write guards locally; do not spend live-create budget on adversarial mutation probes. Before applicable remote action and after graph/BO/producer/binding changes run:

```powershell
node scripts/verify-agentic-app-query-contract.cjs src/workflows/xdx_supplier_core_20260925.wf
```

Use the corrected CLI terminal resolver: current observed path and valid graph-consistent terminal evidence own the semantic judge. Inactive-node assertion order is not terminal ownership. Stale/conflicting evidence must be diagnosed; never remove a required judge to pass sync. Verify actual producer→BO bindings even when replay overrides blank BO input events, retaining independent live proof.

After a committed accepted baseline exists, run `node scripts/plan-affected-workflow-tests.cjs --baseline <recorded-commit> --workflow src/workflows/xdx_supplier_core_20260925.wf --tests test/workflows/xdx_supplier_core_20260925`. Use only a verified current checkout. Before that baseline, use full applicable checks. Union planner selections with required ATLAS actions and changed-contract cases; uncertainty, uncovered or structural changes choose all. The planner neither authorizes tenant actions nor rewrites bindings/hashes. Reconcile every suggestion against scope, retaining exclusions explicitly. Never exclude a required failure, missing recording or judge. Run one final full approved configured suite after authoring is current, and retain actual modes/judges and HTML reports. No repeated full suite merely for summary prose.

Manual testing uses the exact six-step sequence in the manifest, in one **Run app preview** conversation after substituting the newly returned supplier name/number. Store each exact prompt, expected/actual result, surface, sequence, timestamps and provenance. Never substitute an internal-ID prompt for a displayed-number test. Rendered widgets must finish loading before acceptance.

## Timing, continuity and Gate9

Start UTC timing at the first launch action and acknowledge it. At P0 initialize execution records from current startup templates, including intake/learning register, time-tracker, checkpoint, dependency inventory and session receipt. Do not reuse this preparation's receipt as runtime conformance. Run both `agent-app-build-startup/scripts/Verify-AgentAppBuildStartup.ps1` and PolicyOnly, then current-task Startup with reviewed hashes in the verified new worktree.

Use `scripts/measure-build-command.cjs` with explicit task/activity/phase/category, safe label, dependency/overlap IDs and rerun reason for supported commands. Its output stays inside the active cwd; invoke explicit executables without a shell. An unmatched start is an unknown outcome, not retry permission. Maintain browser/manual/wait/unallocated intervals separately and never add nested or concurrent durations to enclosing elapsed time. Tokens/AI Units unavailable remain unavailable. Example, once the workflow exists:

```powershell
node scripts/measure-build-command.cjs --output docs/builds/xdx-supplier-core-20260925/commands.jsonl --task xdx-supplier-core-20260925 --activity query-preflight --phase P1 --category test --label query-preflight -- node scripts/verify-agentic-app-query-contract.cjs src/workflows/xdx_supplier_core_20260925.wf
```

Record context telemetry, reminder and compact/reset capabilities at Startup. While native acceptance is pending, retain one identified Studio tab; observe it at least every five minutes, with four-minute reminders only where supported. Record next deadlines and gaps; manual fallback and CLI authentication do not prove automatic renewal. Check before/after long waits, keep waits ≤60seconds while acceptance is pending, and do not refresh dirty UI. At70–75%context checkpoint/revalidate per canonical continuity procedure. Keep user updates terse.

At canonical Gate9, after correctness, record accepted runtime model/node/workflow latency, available tokens/AI Units and scope-matched evidence. **Default disposition: model sweep deferred to a separately authorized performance gate.** If the launch explicitly requests model optimization, execute one-node-at-a-time measured alternatives after correctness, preserve accuracy/coverage, apply only evidenced improvements, then affected and final scoped regression. This decision must appear in P6 and Closeout; recording latency is not a model sweep or proof of speedup. No new accepted POST is required to benchmark.

At completion reconcile all requirements, versions, operation reservations, approved versus submitted/persisted fields, tests/judges, model disposition, dependencies, lessons and timing. Pass current-task Closeout and commit scoped work. New runtime-build default remains **no publish and no push**. Separate permission to synchronize preparation does not authorize runtime publication/push.

## Launch-time inputs still open

Exact source/preparation commit and purge disposition; two-chain write grant; current environment/authentication; exact-code availability; current valid test inputs/metadata/BU/address references; architecture/runtime state proof; optional explicit model-sweep request. These are validation/authority gates, not completed evidence. Missing input blocks only its dependent work; never widen scope to bypass it.
