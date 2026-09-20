# Active Handoff

Active work: XDX Supplier Lifecycle Agent, attempt 002. Planning task: `xdx-supplier-lifecycle-plan-20260920`. The user requested a phased plan, a build/discrete-test/cumulative-test execution prompt and a discrete new worktree, reusing existing XDX supplier server BOs where suitable.

Read the [plan](../builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_plan.md), [execution prompt](../builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_build_prompt.md), [checkpoint](../builds/xdx-supplier-lifecycle-agent/checkpoint.md), [intake](../builds/xdx-supplier-lifecycle-agent/intake-and-learning-register.md) and [time-tracker.md](../builds/xdx-supplier-lifecycle-agent/time-tracker.md). The canonical living playbook remains the lifecycle owner.

Target: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent`, branch `codex/xdx-supplier-lifecycle-agent`. See the build verification receipt for checkout/commit evidence. Use this existing prepared worktree; do not create another. The next session must establish its own current worktree Session conformance receipt; the base planning receipt is not execution conformance.

Design: Ask Oracle entry; agent-driven query/create lifecycle; relevant query results in tables of at most four columns; gather defaults from similar records and ask apply-all/change; separate final exact-payload approval; generated IDs omitted under per-object contracts; independent GET plus actual UI confirmation. No Visual Builder. Detailed field research happens before each create slice. P0 inventories all children; addresses/sites/contacts are the first core phases.

Live discovery found `XDX_SUPPLIER_INFORMATION` (12 functions) and `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` (1 GET). Catalog lookup succeeded after recommendation search HTTP404. Definitions fetched without force into `server-baseline/`; no server BO modification or supplier data write occurred. Reconcile current versions and consumers before adopting/modifying BOs.

Runtime implementation/tests remain pending. Continue P0 then the phase loop; do not reconfirm unchanged design. Before the first new live-create test, obtain scoped approval for concrete payloads/environment/count. Old attempt allowances do not transfer. No GitHub push, workflow CLI publication, destructive external cleanup or account provisioning is authorized. Use active worktree-root `env.properties` only.

Attempt 001 remains FAILED and retired; do not resume, merge, cherry-pick, publish or push its implementation. See [ATTEMPTS.md](../../ATTEMPTS.md). New work starts from base governance, not the retired branch.

Fresh session is required by the canonical playbook because repository instructions must load in the new worktree before artifact work. Start with:

```powershell
codex -C 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent' 'Read docs/handoffs/ACTIVE_HANDOFF.md first, then execute docs/builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_build_prompt.md and its phased plan. Continue the approved build/test cycle in this worktree; preserve all authority gates.'
```
