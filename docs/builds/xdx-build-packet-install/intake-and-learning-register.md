# Build Intake and Learning Register

Build: `xdx-build-packet-install`; requirement INSTALL-01; repository `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1`; branch `TestingWFBuildTools`. Installation targets the existing repository explicitly selected by the user; this is not a new app build.

## Business contract

Install and activate the supplied packet with logged, reversible changes. Required outputs: startup package, active governance, matching bundled skill, populated records and rollback evidence. Acceptance: required local checks pass and unrelated files retain their hashes. App codes, UI outputs, calculations and authenticated app users do not apply to local installation.

## Data and source contract

Source: `docs/agent-app-build-install-packet.zip`; exact source commit and SHA-256 in the installation baseline. Manifest owns payload integrity. Preserve existing project files using baseline hashes, backups and scoped Git changes. No customer data in records. Stop on missing files or unexplained hash drift.

## Architecture contract

Use the supplied mapping: root AGENTS and skill route to one canonical playbook. Seed remains an immutable delivery snapshot. CLI and references remain at the packet version. No app package, panels, routes, models or runtime envelopes are introduced; no redesign required.

## Runtime and authority contract

User authorized local installation and activation. Git, PowerShell and Node are prerequisites. No host identity verification, Fusion reads/writes, publication, prepared runtime data or push is needed or authorized. Stop on unexpected target drift, failed backup or verification.

## Test contract

INSTALL-LOCAL-01 covers packet and installed hashes, living-build contract and positive/negative regression, startup verifier, CLI syntax/help and unchanged-file proof. Evidence: `docs/installations/2026-09-16-build-packet/`. Live baselines, semantic judges, HTML runtime reports and ATLAS do not apply. Tokens and AI Units unavailable.

## Learning contract

Installation agent owns preflight and closeout review. Apply baseline recovery, complete dependency closure, one lifecycle owner and fresh-session rules. No additional evidence-backed playbook change found. Retain backups and receipts. Future app builds must populate their own intake.
