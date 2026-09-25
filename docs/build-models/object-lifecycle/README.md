# Object lifecycle build model

Current version: **1.1.0** — 2026-09-25.

Use this model to prepare a new object-based AI Studio app build. It is a launch
and planning structure, not another lifecycle playbook or authorization to execute.
Accuracy and completeness take priority over elapsed time.

1. Copy the [plan template](v1.1.0/plan-template.md) to a tracked build directory
   `docs/builds/<build-id>/plan.md`. Fill every section and resolve blocking inputs.
2. Initialize the existing startup registers linked in the plan. They own
   requirements and tests; do not maintain duplicate matrices in the plan.
3. Copy the [execution prompt](v1.1.0/execution-prompt.md) to that build directory,
   fill its parameters and link the completed plan. Review scope and authority.
4. Execute only the completed prompt. New/retry app builds use a new worktree;
   resume uses the verified existing build worktree and retained checkpoint.

See the [supplier worked example](v1.1.0/supplier-worked-example.md) for how to
instantiate the structure. It is illustrative, not an executable request or new
transaction approval. The original supplier prompt/plan remain historical sources;
this model has no operational dependency on `temp/`.

## Ownership and versions

- [Canonical playbook](../../lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md): lifecycle gates.
- [Object registry](../../lessons/objects/README.md): operation contracts and evidence.
- [Startup package](../../../agent-app-build-startup/README.md): mechanics and record templates.
- Execution prompt: identity, authority and launch instructions.
- Completed plan: approved scope, architecture decisions, dependency order and slice exits.
- Registers: requirement and test inventories, evidence and progress.

Pin `modelVersion`, repository commit and reviewed governance hashes in each build.
This version references live canonical guidance; it is not a standalone frozen
governance distribution. Do not silently migrate an active build. Publish changes
in a new version directory: major for incompatible structure, minor for compatible
new sections, patch for corrections. Update this index and the change log.
Installed ZIPs are not rebuilt by editing these repository documents.

## Change log

| Version | Date | Change | Validation |
| --- | --- | --- | --- |
| 1.0.0 | 2026-09-24 | Initial reusable prompt/plan pair, supplier example, explicit mode/authority/coverage and slice structure | Local link/structure checks and governance/startup checks in the [delivery record](../../builds/xdx-object-build-model-20260924/intake-and-learning-register.md); no new live build claimed |
| 1.0.1 | 2026-09-24 | Align startup, scoped test completion and preservation dispositions with canonical governance | Local governance audit; no new tenant build |
| 1.1.0 | 2026-09-25 | BO-first readiness/write budgets, bounded delegation, conservative affected tests plus ATLAS/final coverage, automatic timing, exact identifier acceptance, explicit Gate 9 and continuity dispositions | Local link/structure review and restart-preparation governance receipts; no new runtime acceptance or measured speedup claimed |
