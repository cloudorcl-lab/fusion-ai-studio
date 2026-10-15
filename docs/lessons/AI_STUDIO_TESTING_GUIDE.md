# AI Studio testing guide

This guide owns test scope and scenario selection. The [living build playbook](AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md) owns lifecycle gates and evidence. Use the existing [workflow test authoring guide](../../.agents/skills/aistudio/references/prompts/workflow-test-authoring.md) and [app test authoring guide](../../.agents/skills/aistudio/references/prompts/app-test-authoring.md) for supported commands and execution procedures.

## Supplier creation and subobjects

User constraint recorded 2026-10-14: **Test only fields required to completely create a supplier and its subobjects. Do not test optional fields, descriptive flexfields (DFFs), or key flexfields (KFFs).** This applies to supplier, address, contact, site and site-assignment creation.

Before preparing a creation scenario, identify the required fields and parent/reference relationships from the exact POST documentation and applicable retained tenant evidence in [object references](objects/README.md). Include conditional requirements necessary for the selected complete business flow. A schema-required list alone may omit tenant/business requirements; record contradictions and their evidence instead of guessing. Presence in an example or a successful larger payload does not establish requiredness. Omit generated identifiers.

Use realistic, complete creation journeys and independently verify the resulting required fields and relationships. Do not add optional-field variations, DFF/KFF scenarios, or sequential omission probes to discover the smallest technically accepted payload. A successful accepted transaction must not be repeated for coverage. Existing business-write budgets and exact transaction approvals still apply.

A testing-only restriction changes verification scope; it does not remove approved product fields or copy behavior unless the user also changes the product requirements. When the user narrows scope, stop pending excluded tests and update the active test manifest. Retain completed results as historical evidence; do not rerun excluded cases. Previously copied optional fields do not justify further optional-field testing. Expand this scope only after an explicit later user instruction.

## Attempt budgets and result counts

Define the meter before dispatch: object, scenario unit, charge point (including preflight or blocked attempts), pass condition, reset trigger and separately authorized business-write limit. Apply the current user-directed five-attempts-per-object rule and reset after a fully successful test, including every required attached judgment. Preserve cumulative attempt/failure/reset history. A reset never replenishes accepted-write authority; a new instruction supersedes the meter prospectively and is recorded with its original wording.

| Count | Meaning |
| --- | --- |
| Scenario attempt | One dispatched configured conversation or native journey, charged under the approved manifest |
| Turn | One input/output step within a conversation; several turns may belong to one attempt |
| Assertion | One path, payload, output or ordering check; many assertions can inspect one trace without another call |
| Judgment | Required semantic evaluation attached to the executed report; pending attachment is not a completed PASS |
| Business write | An actual accepted or uncertain POST; tracked independently from test counters and never replayed for another receipt |

Report current-scope PASS separately from historical aggregate reports. Retain raw process exits: a supported needs-judge continuation may exit nonzero while awaiting attachment, so process failure alone does not establish a failed business scenario. Repeat a successful check only when its preceding logic or an evidenced dependency changed; record that invalidation before dispatch. Test-only repairs preserve the semantic requirements and do not authorize another live write.

## Transaction test readiness

Before a charged scenario, reconcile the current saved workflow, authored test and fixture contracts:

1. Match the exact prompt to the actual BO function and key: an explicit item ID needs its item-read contract and scalar envelope; a name search needs its collection/find contract. Check parent/reference inputs, complete expected writable fields and every recordable boundary before execution.
2. After a saved definition change, follow the supported conversation-test full-update procedure before refreshing observed bindings. A refresh flag does not bypass stale-binding checks. Generated bindings and permutations of unordered path partitions are metadata; preserve authored criteria and ordered execution assertions when comparing provenance.
3. Prove prior-step request/revision binding and the actual producer-to-terminal selection with distinct parent, template-source and created IDs. Reuse retained payload/readback values for local checks before spending live-write budget; keep authoritative identity out of unconstrained presentation prose.
4. Use the command’s declared JSON or TEXT capture contract. Inspect an already-created local artifact after a capture/parse error before deciding whether any authoring mutation should run again.

The playbook’s [Gate 7](AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md#gate-7--prove-one-live-golden-path) owns native display ordering and conversation preservation. Local, fixture, saved-BO and native evidence prove their own surfaces. Preserve unobserved native proof and an explicit user-accepted verification exception as separate facts.

## Change record

- 2026-10-14: User explicitly excluded optional fields, DFFs and KFFs and requested this constraint in a testing guide. Established this guide as the scope owner; command mechanics remain in existing authoring guides.

- 2026-10-15: Clarified that test exclusions do not silently narrow approved product behavior after the SupplierType inheritance scope mismatch was found. No optional-field scenarios or new write authority added.

- 2026-10-15: [Supplier creation retrospective](../builds/xdx-supplier-retro-20261015/retrospective.md) clarified attempt/reset versus write authority, result-count units, current-scope reporting and transaction fixture/binding/capture readiness; no broader tests or write authority added.
