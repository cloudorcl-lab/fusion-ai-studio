# XDX Supplier Core next-run goal prompt

- **Version:** 1.0.0
- **Status:** Approved next-run goal
- **Created:** 2026-09-30
- **Scope:** From-scratch benchmark build for supplier, address, contact, and site query and controlled-create capabilities
- **Authority boundary:** DRAFT only; zero live business POSTs unless the user grants a new bounded write budget
- **Supersedes for the next build:** `restart-session-prompt.txt`

## Prompt

Set the following as the persistent goal for this run. Continue autonomously until the goal is achieved or a genuine external blocker requires user action.

### Goal

From a clean Git worktree and clean Oracle AI Studio tenant state, benchmark a from-scratch build of a DRAFT Agentic App that can:

1. Query and create suppliers.
2. Query and create supplier addresses.
3. Query and create supplier contacts.
4. Query and create supplier sites.
5. Query procurement business units as reference data for supplier-site creation.

The finished app must guide a user through discovery, preparation, review, explicit approval, execution, and result confirmation. Optimize for correctness first and measured speed second.

### Starting point

Repository: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1`

Begin in the base checkout and read, in this order:

1. `docs/handoffs/ACTIVE_HANDOFF.md`
2. `docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md`
3. `docs/lessons/objects/README.md`
4. The object references for suppliers, supplier addresses, supplier contacts, supplier sites, and procurement business units
5. The current object-lifecycle testing model, including version 1.2.0 if it remains current
6. `agent-app-build-startup/AGENTS.md`

Treat the handoff as the authoritative starting state. Do not repeat the completed XDX purge and do not restore files or server artifacts from the abandoned Supplier Core implementation.

### Clean benchmark rules

Create a uniquely named branch and worktree from the latest committed base governance:

- Branch: `codex/xdx-supplier-core-benchmark-<timestamp>`
- Worktree: `.worktrees/xdx-supplier-core-benchmark-<timestamp>`

Verify the branch, checkout, commit, worktree registration, and active handoff before substantive work.

This is a from-scratch implementation benchmark. Reuse governance, object documentation, verified lessons, schemas, and retained test fixtures. Do not reuse the previous workflow, BO implementations, generated artifacts, or unverified partial edits.

Use the gated timing runner for every build, test, deployment, repair, browser, optimization, and closeout action. Measure observed working time only. Do not include idle or overnight time.

### Governance startup

Before artifact work:

1. Run the policy-only living-build verifier.
2. Create a new session/task identity.
3. Record hashes of every required governance document.
4. Initialize the build directory, learning register, intake contract, failure ledger, checkpoint, time tracker, and golden-path manifest.
5. Run the living-build Startup gate with the session record and session ID.
6. Inventory every parent and child object involved.
7. Record the selected object references and applicable Oracle documentation releases.
8. Produce a concise implementation design and architecture self-review.
9. Confirm the approved MVP sequence below.

A missing or failed Startup receipt blocks artifact work except work needed to repair the gate.

### Naming

Use these canonical names unless authoritative discovery proves a collision:

- Agentic App display name: `XDX Supplier Core`
- App/workflow code: `XDX_SUPPLIER_CORE`
- Local workflow filename: `xdx_supplier_core.wf`

Use corresponding XDX names for BOs:

- `XDX_SUPPLIER_CORE_SUPPLIERS`
- `XDX_SUPPLIER_CORE_ADDRESSES`
- `XDX_SUPPLIER_CORE_CONTACTS`
- `XDX_SUPPLIER_CORE_SITES`
- `XDX_SUPPLIER_CORE_PROCUREMENT_BUSINESS_UNITS`

Use `xdx_<lower_snake_case>` local filenames with each artifact type's required extension.

### Architecture

Keep each resource contract explicit and independently testable. Do not create a generic catch-all BO that obscures object-specific paths, keys, writable fields, required fields, paging, or errors.

Each query resource must support the documented operations relevant to that object, including:

- Exact identifier or exact-code lookup
- Exact name lookup where supported
- Contains or search lookup where supported
- Detail lookup by resource key
- Paging and bounded result handling
- Clear empty-result behavior
- Validation and server-error behavior

Known-hit readiness must be proved against the actual saved BO or native execution surface. Empty-result tests alone are not proof of a working query.

Child-resource operations must carry the correct parent identifiers:

- Supplier address under the selected supplier
- Supplier contact under the selected supplier
- Supplier site under the selected supplier
- Procurement business unit lookup used as GET-only reference data for site preparation

Create flows must follow this state machine:

1. Discover or select the parent.
2. Collect proposed values.
3. Validate writable and required fields.
4. Prepare a draft request without executing it.
5. Allow corrections.
6. Present a review containing the exact pending request.
7. Require an explicit approval tied to the real pending request ID and revision.
8. Execute exactly once.
9. Capture generated identifiers and the complete result.
10. Perform readback only when authorized and useful.
11. Return a clear success, rejection, validation failure, or uncertain-outcome result.

Do not seed approval values, silently upsert, automatically replay uncertain writes, weaken approval controls, or substitute a GET response for a POST payload.

### Implementation sequence

#### Slice 0 — Runner and contract readiness

- Prove the configured test runner can carry real state between conversation steps.
- Prove request IDs, revisions, selected parent IDs, and approval state can be passed into later turns.
- If the runner still has the known FILE-only scalar-binding gap, capture it in the failure ledger and integrate prevention at the correct owner.
- Preserve production approval guards. Do not alter production logic merely to accommodate a test-runner limitation.

#### Slice 1 — Supplier vertical slice

Build and fully accept supplier query and controlled-create behavior before starting any child resource.

The supplier slice is not complete until it has:

- Local schema and contract validation
- Saved BO validation
- Known-hit query proof
- Workflow query-contract verification
- Deterministic configured conversation tests
- Stateful prepare, revise, approve, execute, and reject paths
- Semantic judgments attached to the same configured runs
- Signed-in native app proof for the applicable UX
- Failure-prevention evidence for every retry
- Measured timing and a slice-acceptance record

Do not expand to addresses, contacts, or sites until this entire slice passes.

#### Slice 2 — Supplier addresses

Implement and accept query and controlled-create behavior under a selected supplier. Include parent-key handling, documented required fields, uniqueness behavior, rejection, correction, approval, and result capture.

#### Slice 3 — Supplier contacts

Implement and accept query and controlled-create behavior under a selected supplier. Include documented identity, communication, parent-key, validation, uniqueness, approval, and result handling.

#### Slice 4 — Supplier sites

Implement and accept query and controlled-create behavior under a selected supplier. Use the procurement-business-unit BO as GET-only reference data. Prove that site preparation carries the correct supplier and procurement-BU identifiers.

#### Slice 5 — Integrated app

Prove that a configured user can:

- Find a supplier
- Review supplier details
- Prepare a new supplier
- Find and manage addresses for a selected supplier
- Find and manage contacts for a selected supplier
- Find and manage sites for a selected supplier
- Select a procurement business unit when preparing a site
- Revise or reject a pending create
- Explicitly approve a pending create
- Receive a precise final result without duplicate execution

### Testing and evidence model

Keep these evidence surfaces separate:

1. Local artifact and schema validation
2. Saved BO readiness
3. Configured conversation tests
4. Semantic judgments
5. Signed-in native app execution
6. Live business-write evidence
7. Production monitoring

Use ATLAS-style build-time testing and simulation. Do not describe METRO production monitoring as build-time acceptance.

Before every BO save, and after any BO function, path, query, paging, or header change, run:

```text
node scripts/verify-bo-search-contract.cjs <bo-file>
```

Before the first remote workflow save, sync, record action, or runtime test, and after every graph, producer, binding, BO-function, or path-token change, run:

```text
node scripts/verify-agentic-app-query-contract.cjs <workflow-file>
```

Configured tests must use real multi-turn state. A shared conversation ID alone is insufficient. Carry the actual request ID, revision, selected record identifiers, and approval decision between steps.

Attach deterministic checks and semantic judgments to the same configured run. A `needs-judge` result is nonterminal. Native execution does not replace configured judged coverage.

Include at least:

- Known-hit exact query
- Known-hit contains/search query
- Detail query
- Paging or bounded-list behavior
- Empty result
- Invalid input
- Server-error handling
- Prepare without execution
- Edit and revision increment
- Rejection without execution
- Approval with the exact current revision
- Stale or mismatched approval rejection
- Duplicate-execution prevention
- Successful result capture using retained fixtures
- Uncertain-outcome behavior without automatic replay
- Parent-child identifier propagation

### Live-write authority

The previous eight accepted business records exhausted the historical write budget. This run begins with ZERO authorized live business POSTs.

Build and validate all create capabilities using retained approved fixtures, deterministic FILE-backed simulations, configured tests, and non-writing native proof where possible. Historical write evidence may inform contracts but does not count as current-run acceptance.

Do not issue a supplier, address, contact, or site POST without a new explicit bounded authorization.

If live-write acceptance becomes the only remaining gap, first complete every independent build and test activity. Then present one consolidated, reviewable request for a bounded budget. Recommend at most:

- One direct BO create and one native approved create per resource
- Eight accepted creates total across supplier, address, contact, and site
- Failed technical attempts do not authorize retries automatically
- Every retry requires failure capture and verified prevention first

Do not consume any approved write until the full request, approval, capture, and duplicate-prevention sequence is ready.

### Authentication

Login and reauthentication are already authorized using the active checkout's `env.properties` and configured Oracle application. Follow normal identity-provider redirects. Clear the username and password fields before filling them once, submit once, and inspect the result.

Never print, copy into evidence, or stage credentials.

If MFA, CAPTCHA, an interactive challenge, or another human-only decision blocks progress, close the current timing interval, record the blocker, and stop without polling.

### Failure prevention

For every failure:

1. Stop before retrying.
2. Record the command or action, timestamp, phase, observed error, and affected artifact in `failure-ledger.json`.
3. Diagnose the cause.
4. Add prevention at the existing responsible owner.
5. Run the scoped learning/prevention gate.
6. Verify that prevention.
7. Only then retry.

A logged failure without verified prevention remains unresolved and blocks slice acceptance and Closeout.

### Benchmark reporting

Capture observed durations for:

- Startup and governance intake
- Architecture and golden-path preparation
- BO discovery and implementation
- Supplier vertical slice
- Address slice
- Contact slice
- Site and procurement-BU slice
- Integrated app and native UX
- Configured tests and semantic judging
- Repairs and retries
- Optimization
- Cleanup and Closeout

Also record:

- Artifact count
- Test count by evidence surface
- Passed, failed, and nonterminal judgments
- Remote saves and syncs
- Live POST count, which must remain zero without new authorization
- Failure count and prevented recurrences
- First-slice elapsed time
- Total observed build time

Do not estimate unobserved time.

### Completion

The goal is complete only when:

- All required BOs and the Agentic App exist in DRAFT.
- The supplier vertical slice passed before child expansion.
- Supplier, address, contact, and site query/create contracts are implemented.
- Procurement-business-unit lookup is implemented as GET-only.
- Required validators pass against the final artifacts.
- Configured conversation tests and attached semantic judgments pass.
- Native signed-in UX proof is recorded where authorized.
- No duplicate or uncontrolled write path exists.
- Every failure has verified prevention.
- The final optimization pass is measured and does not weaken correctness.
- Scratch artifacts and stale references are reconciled.
- Reusable lessons are routed to the canonical playbook or matching object references without creating competing guidance.
- The living-build Closeout gate passes.
- The final scoped changes are committed locally without unrelated files.

Keep everything DRAFT. Do not publish, deploy to production, push, merge, or alter unrelated tenant records.

If the only incomplete item is live-write proof withheld by the zero-write boundary, report the build as technically complete with live-write acceptance explicitly pending authorization. Do not represent fixture-backed or historical evidence as current live acceptance.

In progress reports, lead with:

1. Remaining work
2. Current evidence
3. Actual blocker
4. Next action
