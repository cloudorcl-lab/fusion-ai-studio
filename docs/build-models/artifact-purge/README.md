# Artifact purge model

Current version: **1.0.1** — 2026-09-24.

Reusable planning for exact-scope AI Studio artifact and Git worktree retirement.
This model does not authorize or execute deletion. Accuracy and completeness take
priority over elapsed time; an approved retention outcome is valid.

1. Populate the [purge plan](v1.0.1/purge-plan-template.md) in a tracked
   `docs/builds/<purge-id>/` directory in the surviving checkout.
2. Establish exact targets, independent preservation, dependency evidence and
   trusted user authorization. Unknown consumers mean retain, not presumed absence.
3. Populate the [execution prompt](v1.0.1/purge-prompt.md) and point it at that plan.
   Use inventory mode first when authority or target identity is unresolved.
4. Execute only within established authority; record each disposition and readback.

The [supplier example](v1.0.1/supplier-worked-example.md) demonstrates retention
when complete BO consumer proof is unavailable. It is not a live purge request.
The [build model](../object-lifecycle/README.md) is its separate companion: a retry
does not require deleting retained shared artifacts.

## Ownership and versioning

The [canonical playbook](../../lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md)
owns lifecycle/authority/cleanup rules; this model supplies launch and plan structure.
The [object registry](../../lessons/objects/README.md) owns operation contracts.
Historical source: supplier purge prompt at commit b5034c6. No operational dependency
on temp files or a supplier-specific purge plan remains.

Pin model version, source commit and reviewed governance hashes in the purge record.
Publish revisions in new version directories: major for incompatible structure,
minor for compatible additions, patch for corrections. The index identifies the
current version. Canonical references remain live; this is not a frozen install ZIP.

| Version | Date | Change | Validation |
| --- | --- | --- | --- |
| 1.0.0 | 2026-09-24 | Parameterized prompt/plan; explicit retention, dependency completeness, preservation and partial recovery | Local document checks and scenario walkthroughs in the [delivery record](../../builds/xdx-purge-model-20260924/intake-and-learning-register.md); no actual purge |
| 1.0.1 | 2026-09-24 | Align startup, scoped test completion and preservation dispositions with canonical governance | Local governance audit; no new tenant build |
