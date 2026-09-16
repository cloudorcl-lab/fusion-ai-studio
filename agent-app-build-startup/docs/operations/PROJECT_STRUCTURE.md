# Project Structure Example

This is a structure, not a deployable sample. Choose legacy `src` or an explicitly
selected `app-pkg/<package>` using the bundled skill's layout rules. Do not create
both for the same app. Use the CLI to generate current schemas; never reuse sample
IDs, versions, ETags, environment values, or evidence as live project values.

```text
<repository>/
  AGENTS.md
  .agents/skills/aistudio/       # complete bundled route, CLI, prompts and sample index
  docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md
  docs/handoffs/ACTIVE_HANDOFF.md
  docs/builds/<build-id>/
    intake-and-learning-register.md
    requirement-slice-register.md
    golden-path-test-manifest.md
    dependency-inventory.md
    checkpoint.md
    delivery-receipt.md
    time-tracker.md             # initialize from template; append using Add-BuildTimeRecord.ps1
  scripts/verify-living-build-contract.ps1
  tests/test-living-build-contract.ps1
  src/                         # OR app-pkg/<selected-package>/src/
    apps/xdx_example.app
    workflows/xdx_example.wf
    tools/xdx_example.tool
```

The `.app`, `.wf`, and `.tool` entries above are illustrative paths only. The
bundled skill's `references/prompts/artifact-conventions.md` owns other artifact
types and required extensions. Test-authoring references and CLI sync plans own
test/replay/report paths; do not invent those paths or final test JSON.

For configuration, use current CLI help and supported authentication setup to
record the approved host alias and expected identity locally. This pack supplies
no tenant configuration or credentials. Run `whoami` only when live identity
verification is authorized. A help smoke test proves local command loading only.
