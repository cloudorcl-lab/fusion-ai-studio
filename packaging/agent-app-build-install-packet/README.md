# Install packet packaging

Build from this checkout's canonical source:

```powershell
pwsh -NoProfile -File packaging/agent-app-build-install-packet/Build-AgentAppBuildInstallPacket.ps1 -OutputPath temp/new-install-packet.zip
pwsh -NoProfile -File tests/test-agent-app-build-install-packet.ps1 -ZipPath temp/new-install-packet.zip
```

The builder refuses an existing output. Replace the delivered ZIP only after these checks pass. The tracked delivery is `docs/agent-app-build-install-packet.zip`.

Startup files are inventoried from Git, excluding the stale generated repository-seed. The seed is assembled from current canonical governance, all tracked AI Studio skill files, object references, versioned models and applicable validators/tests. The handoff comes from the blank startup template. No environment files, application source or build-report directories are packaged.

Object references retain historical examples. Links to excluded `docs/builds/` and `src/` evidence become labeled source-only references; all such transformations and original source hashes are recorded in the manifest. Other unresolved dependencies fail the build. Startup-relative model links resolve after activation. This is a generated portable snapshot, never a second editable governance owner.

The manifest identifies the base commit and per-file working-source hashes so local tooling corrections are not falsely described as already committed. SHA-256 provides integrity, not authenticity. Tests verify extraction, source/installed parity, clean activation, governance/session/Query/timing regressions, existing-destination refusal and tampered/extra-file rejection. No live Fusion or deployment claim follows from these tests.

Packaging tooling was recovered from the neighboring Alta-Link checkout and adapted to this repository's current layout and session contract on 2026-09-24. The earlier generated ZIP had stale verifier/session instructions; regenerate from source rather than patching that snapshot.
