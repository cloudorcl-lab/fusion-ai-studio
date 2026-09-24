# Local verification

- pwsh -NoProfile -File tests/test-living-build-contract.ps1: PASS; positive and negative governance fixtures.
- node tests/test-session-compliance.cjs: PASS; Startup/Closeout positives and 11 negative cases.
- pwsh -NoProfile -File agent-app-build-startup/scripts/Verify-AgentAppBuildStartup.ps1: PASS.
- Timing helper test initially exposed edit syntax and newline-comparison issues; repaired before final passing run. No tenant tests or business transactions.
- pwsh -NoProfile -File tests/test-build-time-record.ps1: final PASS (placement, repeated append, UTC, escaping, invalid tracker unchanged).
- Markdown check: 14 changed/new model documents, 54 local links, zero unresolved links or unbalanced fences.
- git diff --check: PASS. Frozen model v1.0.0 directories: no diff.
