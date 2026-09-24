# Agent-App Build Startup Contract

This package configures a new AI Studio agent-app build. It is not a second
lifecycle owner; the target repository's canonical living playbook remains
authoritative.

## Non-negotiable startup order

1. Read the target repository's active handoff, canonical playbook and applicable object references. When installing a ZIP into an unconfigured repository, activate and commit its seed following INSTALL.md. In this already configured repository, use committed current governance; do not reinstall an older seed. A new session is optional.
2. For new/retry builds, create a **new Git worktree** from the reviewed committed ref. For resume, verify the existing build worktree, branch, HEAD and checkpoint; do not create another attempt. Never silently reuse a conflicting path or branch.
3. Initialize build records from templates/ in the target build directory, including the learning register, time tracker and current-task session receipt. Read the existing handoff before replacing it with the current transition record.
4. Run this package's scripts/Verify-AgentAppBuildStartup.ps1. From the target repository root run scripts/verify-living-build-contract.ps1 -PolicyOnly, then follow the canonical session procedure with -SessionRecord, -SessionId and -Phase Startup. A policy-only PASS is not session readiness.
5. Read `.agents/skills/aistudio/SKILL.md` and only the prompt references that
   match the requested artifact.
6. Complete the requirement-slice register and architecture self-review before
   creating an artifact, saving a DRAFT, recording a test, or running a suite.
7. For every Agentic App workflow, run
   `node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>` before the
   first remote save, sync, record-now action or runtime test and after every
   graph, producer, BO function or binding change. Stop on failure and record
   the exact command plus PASS receipt in the active time tracker.

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
