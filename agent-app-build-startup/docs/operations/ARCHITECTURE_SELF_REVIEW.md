# Architecture Self-Review

Complete this before creating or materially changing an AI Studio artifact.

## Required decomposition

| Requirement ID | Acceptance criterion | Smallest slice | Data/source owner | Artifact owner | Route | Terminal owner | Deterministic check | Golden-path test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<REQ-ID>` | `<observable result>` | `<one discrete behavior>` | `<source>` | `<artifact>` | `<route>` | `<node>` | `<command/check>` | `<GP-ID>` |

## Self-review gate

- Every requested behavior maps to one or more discrete slices; no slice has unrelated requirements.
- Each source, tool, workflow, app panel, route, test, and terminal output has one canonical owner.
- Each slice names its required input, output contract, authority boundary, failure behavior, and evidence receipt.
- Apply the canonical **BO readiness before workflow integration** gate per resource; name the BO proof receipt before dependent workflow wiring.
- When delegating, apply canonical **Delegated build ownership**: disjoint paths/artifacts, one writer, explicit authority and dependencies, independent receipt review, and one coordinator for shared live operations.
- Build specialists before supervisors; complete backing workflows before app integration.
- No component, route, artifact, dependency, test, or fallback exists without a mapped requirement and acceptance criterion.
- Defer unapproved requirements to a named milestone. Do not create partial implementation or tests for them.

## Stop condition

Stop and return to requirements when a source, owner, terminal output, route, authority boundary, or acceptance criterion is unknown.
