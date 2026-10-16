# Build Intake and Learning Register

## Build contract

| Field | Value |
| --- | --- |
| Build ID | `<BUILD-ID>` |
| Worktree | `<ABSOLUTE-WORKTREE-PATH>` |
| Branch | `<BRANCH>` |
| MVP outcome | `<OUTCOME>` |
| Included requirement IDs | `<REQ-IDS>` |
| Deferred milestones | `<MILESTONES>` |
| Remote mutation authority | `<AUTHORIZED / NOT AUTHORIZED>` |
| Test authority | MVP golden paths only unless explicitly expanded |
| Approval inventory | `<BUILD-DIRECTORY>/approvals.json` or one equivalent linked record; read at Startup/resume/delegation |

## Release contract

Complete under BUILD_STANDARD.md Success criteria; this table is the run's single release-contract record.

| Buyer outcome | Deadline or unset | Launch must-have requirement IDs | Approved manual handoffs | Exclusions and approval evidence | Acceptance evidence | Forecast/confidence and critical dependencies |
| --- | --- | --- | --- | --- | --- | --- |

## Component map

Complete before implementation under the playbook Architecture contract. Components are observable boundaries, not necessarily separate artifacts. Integrate in the listed order into one thin connected journey.

| Component / requirement IDs | Responsibility | Input/output contract | Dependencies and feasibility proof | Owner | Smallest authorized acceptance check | Repair budget | Integration order / accepted candidate |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Simulation and decision budget

Complete only for applicable simulations under the playbook Test contract. Use approved supplied scenarios and honor restrictions on new tests. Record exits and decisions here; link failures to the existing failure ledger.

| Component / scenario IDs | Uncertainty or release decision | Minimum fixture / external boundary | Expected evidence and exit condition | Attempt/time budget | Result, limits and next decision |
| --- | --- | --- | --- | --- | --- |

## Learning register

| Build / date | Lifecycle stage / slice | Observation | Explicit guidance | Assumption / deviation | Evidence | Root cause | Correction | Cost | Reusable lesson / classification | Playbook action | Dependency action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Detailed intake fields

Fill every applicable field below; mark non-applicable fields with a reason.

Do not authorize remote mutation until all applicable fields are complete.

### Business contract

- App name and code:
- Intended user and authenticated test identity:
- Business decision or task supported:
- Exact golden-path prompt or trigger:
- Required final output fields, widgets, and cardinality:
- Allowed calculations, transformations, rankings, and tie-breaks:
- Missing-data and fallback behavior:
- Advisory, write, approval, and human-review boundaries:
- Approved audience vocabulary:
- Prohibited claims and actions:
- Measurable correctness, latency, token, and AI Unit targets:

### Data and source contract

For every source:

- Source name and type:
- Owning system and authority:
- Stable keys:
- Required fields, units, rows, and relationships:
- Owning tool or connector:
- Owning specialist workflow or agent:
- Allowed use and prohibited inference:
- Missing-data behavior:
- Connectivity, indexing, or access evidence:
- Expected runtime response shape:
- Runnable local contract test:
- Masking policy:
- DRAFT/PUBLISHED or environment boundary:

### Architecture contract

- Project layout or explicitly selected app package:
- App code and panel IDs:
- Required app stages:
- User-intent or trigger taxonomy:
- Route table:
- Specialist dependencies by route:
- Sequential dependencies:
- Parallel dependencies and convergence:
- Parent-child input envelopes:
- Parent-child output envelopes and normalization:
- Terminal output owner per route:
- Widget or structured-output contract:
- Error/fallback ownership:
- Provisional model per model-backed node:

### Runtime and authority contract

- Approval inventory: follow canonical **Upfront approval inventory and reuse**; collect foreseeable missing permissions at intake and reuse existing explicit approvals.
- For each approval: exact user wording and original message/source, received time, permitted actions, target, budget, validity/expiry, exclusions, revocation/supersession; separate interpretation from quotation.
- Current session authority obligation: applicable approval entry IDs and next actions; unresolved permissions and independent authorized work.
- Platform review remains authoritative; the inventory cannot override rejection/challenges or replace transaction-specific approval. Unforeseen scope expansion requires new approval; never backdate later consent.
- Configured host alias, without secrets:
- Expected authenticated identity:
- Existing artifact codes to reconcile:
- Remote DRAFT writes authorized:
- Live reads authorized:
- Live writes authorized:
- Prepared or synthetic branch data authorized:
- Publication authority by artifact:
- External side-effect authority:
- Stop conditions and approver:

### Test contract

- Globally descriptive test name:
- Durable scenario ID:
- Purpose and expected path:
- Data-capture policy:
- Representative live baseline:
- Compatible replay scenarios:
- Deterministic assertions:
- Semantic expected outcome and atomic rubric:
- Boundary size budget and consistency groups:
- Target time, tokens, and AI Units:
- Required HTML report and final-summary evidence:

### Learning contract

- Active learning-register location:
- Build steward:
- Review checkpoints:
- Closeout reviewer:
- Playbook sections likely to change:
- Dependency-cleanup scope:
- Change-log evidence required:
