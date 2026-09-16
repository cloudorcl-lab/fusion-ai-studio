# Carry-forward Inventory

The ZIP builder assembles `repository-seed/` from current canonical sources.
That directory is delivery material: activate its files at the matching target
repository paths, then maintain only the target's canonical owners. Do not edit
the delivery snapshot as a second lifecycle policy.

| Dependency | Delivery | Target / reuse decision |
| --- | --- | --- |
| Canonical playbook | Exact build-time copy in `repository-seed/docs/lessons/` | Same repository-relative path; merge evidence-backed updates if already present. |
| Root instruction contract | Exact source `AGENTS.md` in `repository-seed/` | Review and merge at repository root; retains required XDX policy. |
| Governance verifier and regression test | Exact sources in seed `scripts/` and `tests/` | Same paths; run after activation. |
| AI Studio skill, CLI, authoring examples and references | All tracked files under seed `.agents/skills/aistudio/` | Same path; carry the complete version together. Recheck help for product-sensitive commands. |
| Active handoff | Blank `templates/active-handoff.md`, also staged at seed canonical path | Fill current project facts; do not copy this repository's active handoff. |
| Intake / learning | `templates/intake-and-learning-register.md` | Fill all six playbook intake contracts in active build records. |
| Requirements, golden paths, checkpoint, delivery | Existing templates | Fill project-specific acceptance and evidence. |
| Dependency and evidence inventory | `templates/dependency-inventory.md` | Record owners, consumers, boundaries, validation, cleanup and limitations. |
| App / workflow / tool samples | Bundled authoring references plus `PROJECT_STRUCTURE.md` | Structural examples only; the bundled app-sample index currently has no deployable samples. Generate with current CLI. |
| Architecture, test, context-reset and timing mechanics | `docs/operations/` and package `scripts/` | Reusable steps; canonical playbook controls lifecycle. |
| Rollback and uninstall | `docs/operations/ROLLBACK_UNINSTALL.md` | Capture baseline/backup, reverse activation by owned changes, retain folder recovery copy and project evidence. |
| Customer artifacts, data, reports, replay, environment and secrets | Deliberately excluded | Generate or capture in the new project under its approved contract. |
| Git, PowerShell, Node.js and Fusion access | External prerequisites | Install supported tools locally; configure authorized target access separately. |

Verification must prove required dependency presence as well as manifest hashes:
hashes alone cannot detect an artifact that the producer forgot to include.
