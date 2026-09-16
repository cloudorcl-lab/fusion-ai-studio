# Repository Instructions

Review `docs/handoffs/ACTIVE_HANDOFF.md` before any other repository work in every new Codex session. This applies in every worktree. Keep that file as the single current, repository-wide transition record; replace its contents when the active work changes rather than creating competing active handoff documents.

## Instruction 1 — Learn before every build

For every build, deployment, test cycle, substantial modification, or architecture task in every worktree of this repository:

1. Read the entire canonical playbook at `docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md` before planning or modifying artifacts.
2. Run `pwsh -NoProfile -File scripts/verify-living-build-contract.ps1` from the repository root. If it fails, repair the startup contract before continuing.
3. Create or update the active build's learning register and intake contract as defined by the playbook.
4. Apply relevant evidence-backed lessons during design, implementation, testing, deployment, and optimization.

These instructions are loaded at the start of a Codex run. After a worktree first receives or updates this contract, start a fresh Codex run in that worktree before beginning the next build.

## Quality and architecture

- Deliver customer-deployable tools and software. Double-check the repository, worktree, file paths, filenames, variants, logic, configuration, and test evidence.
- Optimize architecture for accuracy first and speed second.
- Unless another application form is required, build applications as web apps.
- For a new project or architecture, brainstorm and recommend an implementation design before implementation. This design-first gate is not required for code fixes or QA-result reporting.
- Preserve unrelated working-tree changes and never include them in a scoped commit.
- Use the canonical playbook as the detailed lifecycle owner. Do not create a competing build playbook in another file.

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

## Completion and hand-forward gate

Before declaring a build complete:

1. Review the active learning register and integrate each reusable, evidence-backed lesson into the canonical playbook.
2. Refine or retire overlapping, obsolete, contradictory, and app-specific main-path guidance instead of adding duplicate owners.
3. Reconcile dependencies, stale references, scratch artifacts, tests, and configuration according to the playbook's cleanup boundaries.
4. Update the playbook change log, or explicitly record that the evidence review produced no reusable change.
5. Run `pwsh -NoProfile -File scripts/verify-living-build-contract.ps1` and all artifact-specific verification required by the playbook.
6. Commit the governance and lesson changes to the branch handed to the next build so future worktrees inherit them.

The build is not complete while this gate or any applicable playbook Definition of Done item remains open.

## Startup mechanics

For each new app build, follow `agent-app-build-startup/AGENTS.md`: create a new Git worktree from committed governance, run both startup and living-build verifiers, initialize templates in `docs/builds/<build-id>/`, and complete requirement slices, architecture self-review and the approved MVP golden-path manifest before artifact work. ATLAS sync plans determine test actions. At 70–75% context usage, update the handoff, checkpoint and time tracker and start a fresh session. The canonical playbook remains the lifecycle owner; the installed seed is a delivery snapshot.
