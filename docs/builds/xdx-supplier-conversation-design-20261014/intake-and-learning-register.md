# xdx-supplier-conversation-design-20261014

Scope: prepare and self-review a written design for approved supplier conversational lookup and template-based supplier/site creation. User approved app-local Ask Oracle, existing permissions, supplier/address/site/contact reads, supplier/site/assignment creates, reviewed drafts, exact names, disambiguation, active-only default and partial-assignment recovery. Startup greeting is fixed guidance with zero business GETs.

Authority: [approvals](approvals.json). Product implementation, new build worktree, test execution, tenant access, remote writes, publication and push are excluded this stage. A new implementation worktree from committed governance is required before product artifacts.

Selected references: docs/lessons/objects/oracle-fusion-procurement-suppliers.md, docs/lessons/objects/oracle-fusion-procurement-supplier-sites.md, docs/lessons/objects/oracle-fusion-procurement-supplier-site-assignments.md, docs/lessons/objects/oracle-fusion-procurement-supplier-addresses.md, docs/lessons/objects/oracle-fusion-procurement-supplier-contacts.md; release26C/API11.13.18.05. Canonical governance reviewed earlier in this continuous session and reconciled by current hashes; selected child references read in this design intake. Exact current-release create-page retrieval unavailable; no alternate resource/release substituted. Source review: [source-review](source-review.json).

Applied lessons: keys vs business numbers; child-specific source proof; no clone API assumption; writable allowlists; code/display uncertainty; non-suspending Query; declared conversation state; first-slice configured/native evidence before expansion; write-budget reconciliation; partial outcome retention; no automatic retry after uncertainty.

Learning: failure ledger owns tooling/discovery observations. No new generated field or tenant operation confirmed, no samples changed. Context telemetry/reset/reminder controls unavailable. No browser or keep-alive obligation.

Closeout learning review: no new reusable operation/lifecycle rule established. Existing canonical owners apply; no canonical policy or immutable sample change. Design and evidence retained. Unrelated analysis/config/workspace changes preserved.
