# Install packet verification

Generated 2026-09-24T20:03:39.369Z.

Delivery: docs/agent-app-build-install-packet.zip
SHA-256: db713b52d9ef3e5c9a69b6b50d411864569fdbe1a091d219b7294061effbe277
Size: 1104388 bytes. Payload: 132 files.

Commands executed:
- pwsh -NoProfile -File packaging/agent-app-build-install-packet/Build-AgentAppBuildInstallPacket.ps1 -OutputPath temp/xdx-install-packet-final.zip — PASS.
- pwsh -NoProfile -File tests/test-agent-app-build-install-packet.ps1 -ZipPath temp/xdx-install-packet-final.zip — PASS.

Verified extracted hashes and inventory, current-source and installed parity, installation into clean temporary target, overwrite refusal, tamper rejection, extra-file rejection, and activated policy/session/Query/timing regressions. Delivered ZIP copied from that tested candidate; its hash is recorded above.

No tenant action or app deployment. Historical object examples remain; build directories and credentials excluded. Generated seed uses a blank handoff. Manifest records source-only historical link transformations.
