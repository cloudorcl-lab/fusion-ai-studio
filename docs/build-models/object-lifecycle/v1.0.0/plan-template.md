# <Display name> — object lifecycle build plan

Model version: **1.0.0**. Status: **UNFILLED / NOT APPROVED FOR EXECUTION**.
Build ID: `<build-id>`. Mode: `<new|resume|retry>`.
Prepared UTC: `<timestamp>`. Approved scope/authority source: `<source>`.
Source model commit: `<commit>`. Completed plan revision: `<revision>`.

Replace placeholders and example rows; use `not applicable — reason` where needed.
Do not mark the plan executable while decision-changing inputs remain unresolved.

## 1. Outcome and scope

- User/role and business outcome: `<outcome>`.
- Required journeys and outputs: `<journeys, fields, cardinality, UX>`.
- Included resource operations: `<read/list/create/update/etc. as approved>`.
- Explicit exclusions: `<operations, fields, side effects>`.
- Completion evidence and release boundary: `<DRAFT or approved published target>`.
- Priority: accuracy, completeness, elapsed time. Optional explicit constraints: `<none or limits>`.

## 2. Requirement and acceptance inventory

Initialize the existing [requirement register](../../../../agent-app-build-startup/templates/requirement-slice-register.md)
in the build directory; link it here: `<completed register path>`.
It is the single requirement matrix. Inventory each resource × operation × required
entry route independently. Ordinary read/list, preparation, approval, mutation and
persisted verification are separate requirements when included. Include required
field-only follow-ups and error behavior; never derive scope from existing tests.

Every row identifies output/fields, owner, dependencies, slice and local/configured/
native evidence. Exclusions need an explicit reason. At every exit reconcile required
rows, not just the number of passing tests.

## 3. Object contracts and source readiness

Link matching canonical object references rather than copying their payload rules.

| Resource | Operation | Parent/key and dependency | Reference/release | Required business fields beyond schema minimum | Evidence freshness / unresolved input |
| --- | --- | --- | --- | --- | --- |
| `<resource>` | `<operation>` | `<parent and reference keys>` | `<reference>` | `<fields or none>` | `<status>` |

For writes, each reference/intake must establish required/conditional fields,
generated omissions, valid reference values, uniqueness scope, duplicate query,
complete absence criteria and independent persisted projection. Record retained
sample suitability and missing-data reads. No refresh solely for documentation.
Unknown fields or lookup semantics block only dependent work until resolved.

## 4. Architecture and state ownership

- App stages, panels and actual entry routes: `<mapping>`.
- Workflow boundaries and rationale: `<one or more, justified by dependencies>`.
- BO functions derived from included operations: `<inventory, not a preset count>`.
- State owner and observed runtime binding: `<read selection, per-transaction draft>`.
- Deterministic owners: `<field validation, parent resolution, merge/revision, exact commands, payload and write gates>`.
- Model responsibilities: `<bounded interpretation/extraction; no write authority>`.
- UI contract: `<supported widget envelope, fields, paging and terminal owner>`.
- Approval invalidation and uncertain-attempt state: `<behavior>`.
- Architecture self-review and applicable Query preflight: `<receipt>`.
- Test development posture: `<project-required or selected approach and reason>`.

Do not inherit a fixed workflow count or column limit merely from the supplier example.

## 5. Authority and artifact dispositions

| Action/target/environment | Operator authorization source | App approval requirement | Exact scope/limits | Status |
| --- | --- | --- | --- | --- |
| `<artifact save or business operation>` | `<trusted instruction>` | `<payload/revision or N/A>` | `<scope>` | `<authorized/pending/excluded>` |

| Existing artifact / local path | Disposition | Ownership / consumer evidence | Version/identity proof | Required authority / exit receipt |
| --- | --- | --- | --- | --- |
| `<exact target or none for new build>` | `<reuse/create-new/retain-unchanged/delete>` | `<evidence or unknown>` | `<proof>` | `<source/receipt>` |

Cleanup is optional, separately scoped and never inferred from retry mode. Unknown
consumer completeness prohibits deletion/reuse modification; an approved isolated
new-code disposition may allow the build to proceed. Record unique remote codes as
well as branch/worktree names. Git isolation does not isolate tenant objects/data.

## 6. Dependency graph and sequence

| Slice ID | Resource/capability | Prerequisites | Requirement IDs | Exit milestone |
| --- | --- | --- | --- | --- |
| `<slice>` | `<capability>` | `<none or earlier slices>` | `<IDs>` | `<observable acceptance>` |

Use actual foreign-reference dependencies, not a copied supplier ordering. Identify
independent preparation tasks without parallelizing dependent mutations.

## 7. Representative milestones

1. **First query:** local validation and Query preflight, exact target app identity,
   native Query, actual BO execution with resolved inputs and correct terminal.
2. **First transaction, when in scope:** prepare, field-only edit, review, exact
   approval/create, one authorized mutation, independent GET and native display.
   Record operation-specific semantics for non-create mutations. Retain accepted
   write evidence; do not create again merely to complete later UI checks.

Exit evidence: `<test IDs, versions and native receipts>`. Read-only builds mark
the transaction milestone not applicable with a scope reason.

## 8. Repeatable delivery slice

Repeat this section for each slice in the dependency table.

### <Slice ID> — <outcome>

- **Outcome:** `<user-visible behavior and requirement IDs>`.
- **Prerequisites:** `<accepted dependencies and current references>`.
- **Scope:** `<resource, operations, fields, exclusions>`.
- **Implementation:** `<files/artifact codes, state and terminal owners>`.
- **Local checks:** `<actual bindings, rendered JSON, types, invariants and widget structure>`.
- **Configured tests:** `<manifest IDs, real nodes and required/forbidden paths>`.
- **Cumulative gate:** `<current accepted routes affected and required suite boundary>`.
- **Native/live acceptance:** `<target surface, exact journey, permitted mutation and independent verification>`.
- **Evidence:** `<versions, tests, persisted values, rendered result and timing>`.
- **Failure recovery:** `<uncertain-write reconciliation and smallest-owner repair>`.
- **Exit criteria:** `<all required rows accepted, judges resolved, no unexplained omissions>`.
- **Estimate:** `<range, assumptions, excluded waits; not permission to weaken acceptance>`.

## 9. Verification strategy

Initialize the existing [golden-path manifest](../../../../agent-app-build-startup/templates/golden-path-test-manifest.md);
link its completed build copy: `<path>`. Every executed scenario maps to an approved
requirement and expected route. Select end-to-end negative scenarios by the object's
risks; do not copy a universal limit of two. Identify local invariant checks
separately and map them to the same approved requirements.

Define discrete, cumulative and final configured gates. After a repair run affected
checks, then required regression. Reuse unchanged evidence only with matching
artifact/version/scope and justified provenance. Record unmapped ATLAS suggestions
and tool limitations; a deferral is not execution. Native rendering and persisted
verification cannot be replaced by fixture assertions or response text matching.

## 10. Timing, continuity and recovery

Use the [time tracker](../../../../agent-app-build-startup/templates/time-tracker.md)
and canonical timing policy. Record phase/activity boundaries, categories, overlap,
waits, rework and unavailable intervals. Use estimates with assumptions; threshold
decisions require measured inputs. Track accepted/required slices, escaped defects,
reopened phases and elapsed time. Do not sum nested tool time into task elapsed time.

Record keep-alive deadline, checkpoint location and resume action. Distinguish
implemented reminders from manual deadlines; revalidate after inactive intervals.
Failure/recovery scope: `<local rollback, remote reconciliation, blockers>`.

## 11. Closeout and delivery

- Reconcile every required matrix row and manifest scenario, including ordinary reads.
- Resolve required failures/judges and state local, fixture, live/native and release limits.
- Reconcile accepted writes and retained evidence without repeating mutations.
- Review lessons and dependencies; route findings to existing canonical owners.
- Validate links, configuration boundaries and scoped diff; finish timing and Closeout.
- Commit scoped artifacts and report the exact checkout/commit. Push/publication only as authorized.
- Delivery owner and evidence locations: `<paths>`.

## 12. Open decisions and revisions

| Decision | Blocking slice | Owner | Evidence/input needed | Disposition |
| --- | --- | --- | --- | --- |
| `<decision or none>` | `<slice>` | `<owner>` | `<input>` | `<open/resolved>` |

| Revision/date | Approved change | Affected requirements/tests | Authority |
| --- | --- | --- | --- |
| `<revision>` | `<change>` | `<IDs>` | `<source>` |
