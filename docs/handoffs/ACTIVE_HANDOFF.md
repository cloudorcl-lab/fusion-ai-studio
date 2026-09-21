# Active Handoff

Active work: XDX Supplier Lifecycle Agent. Planning task: `xdx-supplier-lifecycle-plan-20260920`. The user requested a phased plan, a build/discrete-test/cumulative-test execution prompt and a discrete new worktree, reusing existing XDX supplier server BOs where suitable.

Read the [plan](../builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_plan.md), [execution prompt](../builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_build_prompt.md), [checkpoint](../builds/xdx-supplier-lifecycle-agent/checkpoint.md), [intake](../builds/xdx-supplier-lifecycle-agent/intake-and-learning-register.md) and [time-tracker.md](../builds/xdx-supplier-lifecycle-agent/time-tracker.md). The canonical living playbook remains the lifecycle owner.

Target: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent`, branch `codex/xdx-supplier-lifecycle-agent`, handoff baseline `b1e9b4a87c4bac24c4552bd5e0f732a43c4a4892`. See the build verification receipt for checkout evidence. Use this existing prepared worktree; do not create another. The next session must establish its own current worktree Session conformance receipt; the completed base planning receipt is not execution conformance.

Design: Ask Oracle entry; agent-driven query/create lifecycle; relevant query results in tables of at most four columns; gather defaults from similar records and ask apply-all/change; separate final exact-payload approval; generated IDs omitted under per-object contracts; independent GET plus actual UI confirmation. No Visual Builder. Detailed field research happens before each create slice. P0 inventories all children; addresses/sites/contacts are the first core phases.

Live discovery found `XDX_SUPPLIER_INFORMATION` (12 functions) and `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` (1 GET). Catalog lookup succeeded after recommendation search HTTP404. Definitions fetched without force into `server-baseline/`; no server BO modification or supplier data write occurred. Reconcile current versions and consumers before adopting/modifying BOs.

Runtime implementation/tests remain pending. The first execution action after startup is to finish P0 contracts. Then run the plan's BUILD → DISCRETE TEST → CUMULATIVE TEST cycle through P9 without reconfirming unchanged design. Before the first new live-create test, obtain scoped approval for concrete payloads/environment/count. No GitHub push, workflow CLI publication, destructive external cleanup or account provisioning is authorized. Use active worktree-root `env.properties` only.

## Active goal for the restarted session

Create one active goal with this objective before executing the plan:

> Complete the XDX Supplier Lifecycle Agent according to `docs/builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_plan.md`: deliver and verify the Ask Oracle query → create → confirm lifecycle for suppliers and every inventoried in-scope child object, reuse or safely modify the approved XDX supplier Business Objects, and complete every build, discrete-test, cumulative-test and Closeout gate. Keep the goal active across checkpoints and mark it complete only when required runtime acceptance and evidence pass.

Do not set a token budget unless the user supplies one. If the work crosses a session boundary, update this handoff, checkpoint and time tracker, then restart with the same goal objective. A planning or local-validation result cannot complete the goal.

Fresh session is required by the canonical playbook because repository instructions must load in the new worktree before artifact work. Start with:

```powershell
codex -C 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent' 'Read docs/handoffs/ACTIVE_HANDOFF.md first. Create one active goal using the exact objective in its Active goal for the restarted session section, with no token budget. Then establish the new worktree session-conformance receipt and execute docs/builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_build_prompt.md and its phased plan. Continue the BUILD -> DISCRETE TEST -> CUMULATIVE TEST cycle through runtime acceptance and Closeout; keep the goal active across checkpoints and mark it complete only after all required evidence passes.'
```
