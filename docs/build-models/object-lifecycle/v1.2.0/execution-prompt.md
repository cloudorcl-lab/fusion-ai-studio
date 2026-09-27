# Object lifecycle execution prompt

Model version: **1.2.0**. Status: template; do not execute with unresolved fields.
Replace every `<...>` placeholder. Use repository-relative plan paths and resolved
absolute checkout paths. The completed plan owns build-specific acceptance.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first.

MODEL_VERSION=1.2.0
BUILD_ID=<xdx-domain-build-id>
MODE=<new|resume|retry>
REPO_ROOT=<resolved-absolute-base-root>
BASE_REF=<reviewed-committed-ref>
BUILD_BRANCH=<codex/xdx-domain-attempt>
BUILD_WORKTREE=<resolved-root/.worktrees/xdx-domain-attempt>
PLAN_PATH=<docs/builds/build-id/plan.md>

OBJECTIVE
Deliver the approved outcomes in PLAN_PATH. Accuracy comes first, completeness
second, elapsed time third. Do not trade required evidence for fewer tests or
lower consumption. Tokens and AI Units are diagnostic unless explicitly constrained.

AUTHORITATIVE INPUTS
Use PLAN_PATH for scope and acceptance; the repository canonical living-build
playbook for lifecycle; selected object references for API contracts; and the
startup package for bootstrap mechanics. Record this model version, source commit
and current reviewed hashes. Preserve settled decisions and existing authorization.
Surface a material conflict before dependent work; never resolve it by silently
dropping a requirement or weakening an acceptance condition.

SCOPE AND AUTHORITY
Follow the plan's resource/operation inventory, exclusions and authority matrix.
Distinguish permission to run a business transaction from the app's exact
payload/revision approval. A template, plan, unique code or passing test does not
itself authorize a write, publication or deletion.
Reconcile previously accepted and uncertain operations before allocating any new
test transaction. Record authorized total, consumed count and remaining balance per
resource and chain. A new model version, prompt, worktree or retry never resets the
budget. Zero remaining creates prohibits POST even when new live proof is desired;
retain matching historical proof and label any changed-boundary gap explicitly.

STARTUP
Start UTC timing at the first action and confirm it has started. Verify repository, branch, target environment
and existing work. Use only the active checkout's env.properties; never print it.
For new/retry, create a new worktree from committed governance under the approved
identity. Verify its registration, branch and HEAD; copy only the necessary root
configuration without displaying it. Never overwrite or silently reuse an existing
path/branch. For resume, verify the existing build worktree and checkpoint instead.
For retry, apply only the plan's separately authorized prior-artifact dispositions.
Retained/unknown-consumer artifacts remain unchanged; cleanup is not a default
prerequisite when a reviewed isolated-artifact disposition permits continuation.
Initialize the existing startup records, complete requirements/architecture/test
intake, read applicable guidance and pass current-task Startup and package gates.
Do not treat historical acceptance as proof for changed artifacts.
For testing sign-in, use existing applicable repository/user authorization and the
active checkout's configured URL/credentials before requesting human assistance.
Clear both form fields, fill once, submit once and inspect the result. Do not log
secrets or bypass challenges. Record actual human-required waits separately from
automatic authentication and independent work. Generic templates confer no login
authority and never export a tenant-specific standing approval.

EXECUTION
Execute the plan's slices in dependency order. Before dependent workflow integration,
freeze each resource BO interface, validate its actual serialized templates, and prove
the saved BO functions directly: ordinary required GETs and, when authorized, POST
followed by independent persisted GET. Raw REST and fixtures are not BO proof.
Hand forward a versioned readiness receipt for independent review. Direct BO POST
and native approval-to-POST need distinct authorized transaction budgets; if authority
conflicts, block that write gate and resolve the route. Never spend a one-create
budget twice or replay an accepted create. Prove the first real app Query
before route expansion and a complete representative transaction before copying
its pattern to further write resources. Execute local and configured tests mapped
to approved requirements. Use ATLAS for allowed next actions; account for unmapped
suggestions explicitly rather than silently expanding scope or claiming coverage.
Complete each slice's build and discrete checks, then native/live golden-path proof,
required regression and evidence receipt. For CODE-only incremental work, use the
canonical affected-test helper against an explicit verified commit if useful; union
its selection with ATLAS-required actions. Unknown changes select all or block.
Final configured coverage remains required. Use canonical Gate 6 for
scoped completion when ATLAS proposes outside-scope scenarios.
Use the canonical Query preflight before applicable remote actions. Preserve
payload/revision, parent, duplicate and uncertain-result guards. Never replay an
accepted business create to refresh evidence or timing.

Delegate approved bounded independent packages with exact paths/artifacts, frozen
interfaces, write budgets, acceptance commands and return receipts. One writer owns
each shared BO/workflow; coordinator owns mutations, browser and accepted-ID ledger.
A different reviewer checks BO build/test receipts before integration.
Test exact user prompts, displayed identifier versus internal key, and conversation
prerequisites. Resolve semantic terminals from the current graph using the maintained
CLI; repair its owner instead of using declaration reordering as a workaround.
Apply canonical Gate 9 explicitly: record whether model optimization is required now
or deferred to a named gate. Process optimization alone does not authorize a sweep.
When authorized, freeze critical screening cases and complete final coverage first.
Evaluate exact hash-bound candidate reports after each critical case and judgment
with scripts/screen-model-candidate.cjs. Reject a confirmed contract failure early;
missing evidence, environment errors or pending judges remain incomplete. Passing
screening only permits full regression. Keep separate screening/full run labels;
combined-placement and final saved-version acceptance remain mandatory.

Select exact app/workflow run labels and saved workflow version in final summaries.
Use scripts/refresh-test-report-provenance.cjs for a read-only derived aggregate
after judgment attachment; preserve originals and never rerun tests to refresh a
report. Generic historical pointers cannot prove current acceptance.
For native evidence, use scripts/capture-native-evidence.cjs through the supported
bound browser adapter only after a product-specific result extractor is tested.
Retain exact prompt, target/version, submission/settled timestamps, complete result,
AX snapshot and screenshot hashes. The adapter does not submit, retry or judge.
If extraction is unavailable, record that limitation and retain observed native
evidence under the canonical policy; mocks are not live capture acceptance.

CONTINUITY AND RECOVERY
Maintain activity timing, keep-alive deadlines and context checkpoints under the
canonical playbook. After a failure, identify the responsible boundary, repair it
and rerun affected checks before required regression. Preserve uncertain write
identity and reconcile read-only before considering another write.
Pause dependent work for missing authority, blocking source/contract ambiguity,
unrecoverable authentication, changed remote state or unresolved write outcome.
Continue authorized independent work. A passed phase is not a reason to stop.
Wrap executable build/test commands with scripts/measure-build-command.cjs under
canonical timing policy; retain task/wait boundaries separately. Record dependencies,
overlap and rerun reasons; do not sum nested/parallel durations. Unmatched starts and
unobserved intervals remain unknown. Establish same-tab keep-alive and context
checkpoints, recording unavailable reminder/meter capabilities and manual checks.
Use interval boundaries and --activity-kind for execution, review, evidence-capture,
coordination, context-recovery and human-wait. Generate unioned timing with the
wrapper's report mode: separate work during human waits, wait without observed work
and unallocated gaps. Do not sum category totals or infer labor/idle from gaps.
Maintain one evidence-manifest.json with frozen source hashes, requirement IDs and
hash-bound evidence checks. Generate status/requirements/gaps/closeout views through
scripts/build-evidence-status.cjs. Retain requirement definitions in their register;
do not keep a second manually edited acceptance matrix. Missing/stale evidence or
source drift blocks eligibility; local manifest validation is not live-state proof.

DELIVERY
Reconcile every approved requirement against independent evidence, including
ordinary reads distinct from create-confirmation GETs. Complete applicable local,
configured and native acceptance; disclose deferrals without calling them passed.
Complete lessons, dependency cleanup, timing and Closeout after one consolidated
review of frozen sources and their current evidence.
Reconcile manifest coverage, operation balances, authentication waits, timing gaps
and delivery tail; keep historical records immutable. Commit only scoped
changes. Push, publish or delete external artifacts only under explicit authority.
Report exact checkout/commit, DRAFT/published state, completeness, material defects
or limitations, elapsed time and evidence locations.
```
