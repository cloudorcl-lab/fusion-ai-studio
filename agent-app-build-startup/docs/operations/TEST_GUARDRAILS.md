# MVP Test Guardrails

## Test inventory authority

The approved golden-path manifest is the allowed test inventory for the MVP. Every test must cite exactly one requirement ID, route, terminal owner, and acceptance criterion. ATLAS may identify synchronization work, but it does not authorize a new business scenario outside this inventory.

## Required order

1. Local deterministic source, schema, key, calculation, and output-contract checks for the approved MVP slice.
2. One golden-path test for each required user journey.
3. One focused workflow or app test for each completed slice.
4. One canonical configured-mode suite only after the current ATLAS sync plan reports `finalSummaryAllowed: true` with no required action or judge.

## Explicit-approval list

Do not create, record, run, or attach exploratory scenarios, prompt variations, broad edge-case matrices, duplicate paths, tests for deferred features, tests for hidden controls, or model optimization sweeps without explicit user approval.

## ATLAS loop

1. Read the current focused sync plan.
2. Execute one approved action that maps to the golden-path manifest.
3. Validate only the affected test deterministically when required.
4. Refresh the same plan.
5. Stop and request direction when the next action is outside the manifest.

Never use a full suite to discover the next test action. A recorder failure or non-recordable branch is a scoped deferral with honest evidence, not permission to invent synthetic coverage.
