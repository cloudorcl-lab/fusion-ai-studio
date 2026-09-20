# Execution prompt — XDX Supplier Lifecycle Agent

Copy the block below into a fresh Codex session rooted in the prepared worktree. The plan is the requirement authority; the canonical playbook remains the lifecycle authority.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md FIRST.

Execute docs/builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_plan.md in this already-created worktree:
C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent
Branch: codex/xdx-supplier-lifecycle-agent.
Do not create another worktree, build in the base, import the abandoned implementation, or push to GitHub.

OUTCOME
Implement Ask Oracle -> query -> gather -> validate -> final user approval -> create -> independent persisted confirmation for suppliers and child objects through AI Agents. No Visual Builder. Always show query results to the user with relevant fields only, at most four columns. Keep technical IDs internal. Cover addresses, sites and contacts first, then every additional child reconciled by the Phase 0 inventory. Do not silently redefine “child objects” as those three alone.

STARTUP
1. Read the entire canonical living playbook, object registry, matching supplier/child references and .agents/skills/aistudio/SKILL.md. Read startup contract and only relevant skill references for workflow, variables, CODE, AGENT/LLM, HUMAN CHAT, BO_FUNCTION, BO reuse and conversation tests. Resolve the actual layout before authoring.
2. Review plan, requirement slices, golden-path manifest, architecture self-review, server inventory/baselines, learning register, checkpoint and time tracker. Reconcile the preceding delivery tail.
3. Verify cwd, branch, HEAD, dirty paths and active Git operations. Preserve unrelated work. Use only this worktree's active env.properties; confirm configuration and identity without printing credentials. Do not choose the environment from historical samples.
4. Start continuous UTC timing and a NEW session conformance receipt for this task/worktree. Run both startup-package and living-build policy verifiers, then living-build Startup with the new receipt/session ID. Never reuse the base planning receipt as execution conformance.
5. Finish P0 contracts before artifacts: record exact source/owner/route/terminal/acceptance and authority per requirement; enumerate all supplier child resources, including nested children and supported create operations. Fill additional child slices before implementing them. Record unresolved scope/sensitivity decisions; continue independent authorized work.

REUSE FIRST
The server catalog already found XDX_SUPPLIER_INFORMATION (12 functions) and XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS (1 GET). Review docs/builds/xdx-supplier-lifecycle-agent/xdx_bo_inventory.json and server-baseline/. Reconcile current versions against those baselines and existing src/businessObjects files. Preserve the exact BO codes. Reuse suitable functions; modify/add only what the new contract needs. Inspect downstream consumers before changing shared contracts. Do not force fetch/save over unreviewed changes, create redundant BOs, or treat sample IDs as defaults.
The recommendation search endpoint returned 404 during planning; supported list-supported-business-objects worked. Use documented CLI help and that catalog path; do not reverse-engineer a hidden endpoint. After BO changes validate, perform a version-safe authorized save, retain normalized readback and run affected consumer contract checks.

ARCHITECTURE AND CONVERSATION
Use one root conversational state owner with typed CONVERSATION JSON, deterministic patch validation/merge, revision tracking, root Human Chat collection/approval and guarded BO writes. Prove actual Ask Oracle entry, multi-turn continuity and Human Chat suspension/resume before any POST enablement. A debug-chat success is not Ask Oracle acceptance. Add only the Agent Studio wrapper demanded by the supported entry contract, including every required app stage/test if app-backed.
Agents interpret intent, select read tools and propose structured patches; deterministic code owns allowed fields, transitions, payload construction and the write gate. Do not attach unrestricted create tools to an agent. Keep HUMAN pauses at root, not inside nested loops/child workflows.
Persist user input, selected parent, reference source, draft, field provenance, missing fields, approved snapshot, operation responses/IDs and verification. Do not reset on follow-up messages. Any change invalidates approval. Do not claim durable cross-session recovery or exactly-once writes from CONVERSATION variables alone.

INHERITANCE
For a create with partial input, retrieve similar records first. Display relevant reference choices, preserve explicit user fields, derive only eligible business defaults and show field/value/source. Ask whether to apply all eligible values or change them. That acceptance prepares the draft; it does NOT authorize creation. If no suitable source exists, ask only for missing data. Do not guess or clone GET JSON.
Apply this interaction to every supplier child. Re-resolve foreign references against the target parent/BU. Unique fields, personal identity, operational contact destinations, security/account data and generated/read-only fields are not blanket-copy defaults.

DEFERRED FIELD RESEARCH — REQUIRED BEFORE EACH WRITE SLICE
Research the exact current Oracle operation schema, field descriptions and Example Request Body only when preparing that slice, as planned. Start with retained evidence. Classify every candidate field as writable business value, generated own ID, parent/foreign reference, unique/non-copyable, read-only/audit or unresolved. Record requiredness, conditional rules, uniqueness scope, provenance and evidence. Omit generated IDs, capture response IDs, validate foreign references. Never remove all IDs indiscriminately. Resolve conflicts before writes; record every newly confirmed autogenerated field in its canonical object reference. Do not refresh frozen first-success samples.

PHASE LOOP — DO NOT SKIP
for each phase P0 through P9, including each P8 child subphase:
  A. Read the last checkpoint. Confirm this phase's inputs/authority and exact manifest scenarios.
  B. BUILD the smallest complete slice. Keep one owner per behavior. No future-phase scaffolding without a requirement.
  C. DISCRETE TEST: run meaningful local state/payload/source checks and matching artifact validation. Prettify/validate changed workflows. Obtain the focused ATLAS sync plan, execute ONE manifest-mapped action, finish its model-data/judge continuation, refresh and repeat until synchronization is current. Use supported conversation-test context for root HUMAN/WAIT scenarios.
  D. If discrete acceptance fails: classify the failure, preserve evidence, fix the smallest responsible owner, rerun the affected test only. Do not advance, weaken acceptance or rerun an unchanged broad suite.
  E. CUMULATIVE TEST: once discrete and synchronization gates pass, run ONE configured-mode regression covering all enabled requirements through this phase and the new interaction boundaries. Use recorded BO responses/approved fixtures for write paths. Never repeat live POSTs to run regression. Omit evaluation-mode overrides and judge-provider unless explicitly authorized; file mode may still use models. Resolve required judges and use final-summary commands without rerunning solely to refresh reports.
  F. If cumulative acceptance fails, return to D. After correction repeat the required cumulative gate once. Stop repetitive unchanged reproductions and isolate the responsible boundary after two observations without new evidence.
  G. Check real Ask Oracle evidence appropriate to this phase, expected versus submitted versus persisted fields (including omissions), four-column displays, state continuity, approval and no duplicate writes. Backend success alone does not pass UI acceptance.
  H. Record commands, artifact versions, local/replay/live status, test counts, pending judges, reports, time/tokens/AI Units, failures and next action. Mark phase accepted only with the required evidence; checkpoint then proceed automatically to the next authorized phase without asking “continue?”.

PHASE ORDER
P0: contracts, exhaustive resource inventory and BO reuse reconciliation.
P1: actual Ask Oracle + no-write typed-state/Human Chat/revision/cancel proof.
P2: supplier and child query, visible <=4-column results and stable selection.
P3: source-based inheritance, missing-input collection, complete exact draft review.
P4: supplier create, generated response IDs and independent GET confirmation.
P5: address create, approved defaults and parent-scoped confirmation.
P6: site create, validated BU/address dependencies and confirmation.
P7: contact create, approved identity/defaults and confirmation.
P8: one query/create/confirm child slice at a time for remaining inventoried resources.
P9: cumulative end-to-end Ask Oracle acceptance, recovery evidence and closeout.

WRITE BOUNDARIES
Require final user approval of the exact normalized payload/revision/parent for every create. Approval of inherited defaults is separate. Serially create parent then dependent children; save each returned operation result/ID before the next write. Verify every intended field by independent GET. For timeout, partial result, lost state or repeated approval, reconcile first; never blindly retry or delete records as rollback. Do not expose a write path with unproven concurrent-submit protection.
The planning request did not authorize new live test records. Complete local/fixture work, prepare concrete exact payloads and present the environment/count/controlled test identities for the first required live-write approval. Reuse accepted records across later phases; no allowance transfers from the failed attempt. Do not repeatedly seek approval for unchanged authorized actions. Obtain additional scoped authority only for new sensitive side effects, changed scope, publication, destructive cleanup or newer-remote overwrite. BO modification is authorized as necessary to this build, subject to compatibility and version checks.

STOP/HANDOFF
Continue until all phases are accepted or a concrete external/authority blocker prevents the next required action. Report partial work honestly. At the required context threshold, checkpoint and update the single ACTIVE_HANDOFF.md and timing; provide a complete codex -C restart command carrying forward this same plan. Do not create a competing handoff.
Never publish workflows via CLI. Never push this branch without user instruction. Do not call the build complete while an included child, UI journey, field, required test/judge or closeout gate is unresolved.

FINAL DELIVERY
Reconcile scope against evidence; distinguish replay, live, DRAFT and published results. Integrate evidence-backed lessons into the existing playbook/object owners, reconcile dependencies, retain needed reports, remove only task-owned obsolete scratch, update attempts status, complete time/delivery records, pass current-session Closeout, and commit only this task's changes to the new branch. Present the CLI-generated scoped Validation and Insights with test counts, metrics and limitations. Report actual Ask Oracle acceptance and any remaining publication boundary separately.
```
