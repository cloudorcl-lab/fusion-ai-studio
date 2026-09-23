# Active Handoff

Post-closeout hardening task `xdx-supplier-lifecycle-rework-hardening-20260923` made repeated-failure prevention mandatory for the next Agentic App implementation. Before any remote save, sync, record-now action or runtime test, run `node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>` and rerun it after each graph, producer, BO function or binding change. The root contract, AI Studio skill and living-build verifier enforce this command. The canonical playbook also blocks suite expansion until one real target-app Query plus configured BO route passes and requires a five-minute same-tab AI Agent Studio keep-alive while signed-in acceptance is pending. See [time-tracker.md](../builds/xdx-supplier-lifecycle-agent/time-tracker.md) and [verification.md](../builds/xdx-supplier-lifecycle-agent/verification.md).

Active work: XDX Supplier Lifecycle Agent, execution task `xdx-supplier-lifecycle-execution-20260922`. Worktree: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent`; branch: `codex/xdx-supplier-lifecycle-agent`. Use this worktree and its root `env.properties`; never expose configuration values. Do not create another worktree.

P0-P9 implementation, required DRAFT runtime acceptance and the session Closeout verifier pass. The branch handoff is the scoped commit containing this record. Publication, push and destructive external cleanup are outside the authorized scope.

Current records: [plan](../builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_plan.md), [checkpoint](../builds/xdx-supplier-lifecycle-agent/checkpoint.md), [verification](../builds/xdx-supplier-lifecycle-agent/verification.md), [delivery receipt](../builds/xdx-supplier-lifecycle-agent/delivery-receipt.md), [learning register](../builds/xdx-supplier-lifecycle-agent/intake-and-learning-register.md) and [time tracker](../builds/xdx-supplier-lifecycle-agent/time-tracker.md).

The delivered scope is required transaction fields only. DFFs, attachments, payment behavior, third-party payment relationships and optional create fields are excluded. The two negative controls are duplicate prevention and uncertain-result retry blocking.

Current artifacts and runtime evidence:

- Workflow `XDX_SUPPLIER_LIFECYCLE_AGENT`, DRAFT version `86078581`, has 136 pipeline nodes including START/END and no reachable `HUMAN` or `WAIT` node.
- App `XDX_SUPPLIER_LIFECYCLE`, DRAFT, binds that workflow as its Query agent.
- Business objects: `XDX_SUPPLIER_INFORMATION`, `XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS` and `XDX_SUPPLIER_PRODUCT_SERVICE_CATEGORIES`.
- Canonical workflow suite passes 35/35 with zero failed or pending judges. It records 34,148 input tokens, 9,381 output tokens, 685 AI Units and 111.9 seconds of model-backed workflow time.
- Canonical app suite passes 1/1 with zero failed or pending judges.
- The focused ATLAS plan has zero executable actions, 59 disclosed deferred redundant atomic scenarios and `finalSummaryAllowed: true`.
- Signed-in target AI Agent Studio **Run app preview** passed supplier 1504 → address → site → contact plus every retained P8 read. Empty contact-data-access, contact-role, merge-history and spend-authorization collections returned explicit successful empty results.
- During local Closeout, a later keep-alive reload found that the retained browser session had expired to Oracle Cloud Sign In. This occurred after runtime acceptance and caused no repeated runtime test or POST. The login page remains marked for handoff.

Accepted live chain:

- Supplier `SupplierId=300000333814250`, supplier number 1504
- Address `SupplierAddressId=300000333814261`
- Site `SupplierSiteId=300000333814273`
- Contact `SupplierContactId=300000333814275`
- Business classification `ClassificationId=300000333814290`
- Contact-address association `SupplierContactAddressId=300000333814291`
- Product/service association `SupplierProductsServicesId=300000333814294`
- Site assignment `AssignmentId=300000333814296`

Every accepted create was executed once and independently read back. Failed or uncertain attempts were reconciled through read-only GET before a materially changed request. No accepted POST was repeated.

Final local validation now passes the Query preflight, validator regressions, P1-P8 contract scripts, workflow validation, all three BO validations and app validation. The first Closeout batch exposed a stale state schema and an overbroad excluded-resource string assertion; both were corrected, the failure receipt was retained, and the full 15-command batch then passed.

The current receipt records all eight obligations as passed with no unresolved item. The final documentation-sensitive Closeout rerun must pass immediately before the scoped commit. Mark the active goal complete only after that commit is created and the worktree is clean.

## Active goal for the session

Preserve this exact objective with no token budget:

> Complete the XDX Supplier Lifecycle Agent according to `docs/builds/xdx-supplier-lifecycle-agent/xdx_supplier_lifecycle_plan.md`: deliver and verify the Ask Oracle query → create → confirm lifecycle for suppliers and every inventoried in-scope child object, reuse or safely modify the approved XDX supplier Business Objects, and complete every build, discrete-test, cumulative-test and Closeout gate. Keep the goal active across checkpoints and mark it complete only when required runtime acceptance and evidence pass.

A new session is optional. If a later session is needed, use:

```powershell
codex -C 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-lifecycle-agent' 'Read docs/handoffs/ACTIVE_HANDOFF.md first, then continue the approved XDX Supplier Lifecycle Agent active goal through Closeout.'
```
