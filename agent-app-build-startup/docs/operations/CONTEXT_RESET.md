# Context Reset Protocol

## Trigger

When context consumption reaches 70–75%, create a safe checkpoint before any new material edit, test recording, suite execution, deployment, publication, or push.

## Required checkpoint

1. Replace the active handoff with the current objective, repository, worktree, branch, HEAD, completed slices, evidence, blockers, scope boundary, and next smallest action.
2. Update the build checkpoint with requirement/test IDs, current ATLAS plan, and the exact command/result receipt.
3. Append a time-tracker record with elapsed time and known or unavailable token/AI Unit telemetry.
4. State whether the current worktree matches the checkpoint.
5. Start a fresh agent session. The fresh session reads the handoff first and verifies the recorded state before continuing.

## Never do after trigger

- Continue from memory alone.
- Start a new route, artifact, test, suite, optimization sweep, or external mutation before the fresh session validates the checkpoint.
