# Object lifecycle execution prompt

Model version: **1.0.0**. Status: template; do not execute with unresolved fields.
Replace every `<...>` placeholder. Use repository-relative plan paths and resolved
absolute checkout paths. The completed plan owns build-specific acceptance.

```text
Read docs/handoffs/ACTIVE_HANDOFF.md first.

MODEL_VERSION=1.0.0
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

STARTUP
Start UTC timing at the first action. Verify repository, branch, target environment
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

EXECUTION
Execute the plan's slices in dependency order. Prove the first real app Query
before route expansion and a complete representative transaction before copying
its pattern to further write resources. Execute local and configured tests mapped
to approved requirements. Use ATLAS for allowed next actions; account for unmapped
suggestions explicitly rather than silently expanding scope or claiming coverage.
Complete each slice's build, discrete checks, required cumulative regression,
native/live acceptance and evidence receipt before accepting that slice.
Use the canonical Query preflight before applicable remote actions. Preserve
payload/revision, parent, duplicate and uncertain-result guards. Never replay an
accepted business create to refresh evidence or timing.

CONTINUITY AND RECOVERY
Maintain activity timing, keep-alive deadlines and context checkpoints under the
canonical playbook. After a failure, identify the responsible boundary, repair it
and rerun affected checks before required regression. Preserve uncertain write
identity and reconcile read-only before considering another write.
Pause dependent work for missing authority, blocking source/contract ambiguity,
unrecoverable authentication, changed remote state or unresolved write outcome.
Continue authorized independent work. A passed phase is not a reason to stop.

DELIVERY
Reconcile every approved requirement against independent evidence, including
ordinary reads distinct from create-confirmation GETs. Complete applicable local,
configured and native acceptance; disclose deferrals without calling them passed.
Complete lessons, dependency cleanup, timing and Closeout. Commit only scoped
changes. Push, publish or delete external artifacts only under explicit authority.
Report exact checkout/commit, DRAFT/published state, completeness, material defects
or limitations, elapsed time and evidence locations.
```
