# Agent-App Build Startup Contract

This package configures a new AI Studio agent-app build. It is not a second
lifecycle owner; the target repository's canonical living playbook remains
authoritative.

## Non-negotiable startup order

1. Read `docs/handoffs/ACTIVE_HANDOFF.md` at the target repository first, then
   the canonical playbook. Activate and commit the ZIP's repository seed before
   beginning a build, following `INSTALL.md`; reread the activated governance and
   reconcile the current session/task receipt before the Startup gate. A new
   session is optional.
2. Create a **new Git worktree** for this app build. Do not build in the base
   checkout or reuse an existing worktree.
3. Run `scripts/Verify-AgentAppBuildStartup.ps1` from this package and
   `scripts/verify-living-build-contract.ps1` from the target repository root.
4. Initialize the build records from `templates/` under the new worktree's
   active build directory.
   Use `templates/active-handoff.md` for the one canonical handoff path.
5. Read `.agents/skills/aistudio/SKILL.md` and only the prompt references that
   match the requested artifact.
6. Complete the requirement-slice register and architecture self-review before
   creating an artifact, saving a DRAFT, recording a test, or running a suite.

## Context reset

At 70–75% context usage, stop at a safe checkpoint. Update the active handoff,
checkpoint, and time tracker; record the next smallest action; then revalidate
the checkpoint and current task evidence before continuing into a new material
edit, record-now operation, suite, deployment, or push. A new session is optional.

## MVP and test boundary

Start with the approved MVP golden-path manifest. A test is allowed only when
it maps to one approved requirement ID, route, terminal owner, and acceptance
criterion. Exploratory scenarios, prompt variants, duplicate paths, broad
edge-case matrices, model sweeps, deferred routes, and tests outside the
manifest require explicit user approval.

ATLAS sync plans are the authoritative next-action source for allowed tests.
Do one current plan action, refresh the plan, and do not invent a test merely
because it looks useful for coverage.

## Architecture self-review

Decompose each requirement into the smallest independently verifiable slice:

```text
requirement -> acceptance -> source/tool -> owner -> route -> terminal output
-> deterministic check -> golden-path test -> evidence receipt
```

Before adding any artifact, route, test, or dependency, complete the
architecture self-review. Each slice has one owner and one terminal output
owner. Deferred work belongs in a named future milestone, not in speculative
artifacts or tangential tests.

## Repository-wide Agent Studio naming convention

For every new Agent Studio artifact created anywhere in this repository,
including every branch and worktree:

- Artifact codes use `XDX_<UPPER_SNAKE_CASE>`.
- Local artifact filenames use `xdx_<lower_snake_case>.<extension>` and retain
  the artifact type's required extension.
- Display names that normally contain spaces use
  `XDX <Human Readable Name>`.
- New build branches use `codex/xdx-<lower-kebab-case>`; for example,
  `codex/xdx-epm-form-definition-designer`.
- New build worktrees use `.worktrees/xdx-<lower-kebab-case>`; for example,
  `.worktrees/xdx-epm-form-definition-designer`.
- Example workflow code: `XDX_EPM_FORM_DEFINITION_DESIGNER`.
- Example local workflow file: `xdx_epm_form_definition_designer.wf`.
- Example display name: `XDX EPM Form Definition Designer`.
- Do not rename an existing artifact, branch, or worktree solely to apply this
  convention unless an explicit migration is authorized.
