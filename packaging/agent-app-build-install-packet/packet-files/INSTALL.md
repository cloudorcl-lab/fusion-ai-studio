# Agent-App Build Startup Install Packet

The packet contains startup mechanics and a `repository-seed/` with the canonical
playbook, root governance, verifier/test, and complete bundled AI Studio skill
(CLI, references and sample index). Project-specific records are blank templates.
No customer app, credentials, environment configuration or build-report directories are included. Object references retain historical examples and their scope limitations. Source-only references are labeled explicitly; the manifest records every portable link transformation and original source hash.

## Prerequisites

- PowerShell 7, Git, and a writable target repository.
- Node.js capable of running the bundled CLI (help tested with Node 25.9.0;
  this is the tested version, not a claimed minimum).
- Target Fusion access is needed only for later authorized live work.

## Install and activate

Before changing the target, follow the baseline and backup checklist in
[Rollback and uninstall](agent-app-build-startup/docs/operations/ROLLBACK_UNINSTALL.md#before-installation-or-upgrade).
Record installation and activation in dedicated commits so they can be reversed
without including unrelated project changes.

1. Extract the ZIP, preserving the `agent-app-build-install-packet` directory.
   From that directory run:

   ```powershell
   pwsh -NoProfile -File ./Verify-AgentAppBuildInstallPacket.ps1 -PacketRoot $PWD
   pwsh -NoProfile -File ./Install-AgentAppBuildStartup.ps1 `
     -PacketRoot $PWD -DestinationRoot C:/path/to/target-repository
   ```

2. The installer copies only `agent-app-build-startup/`. It refuses an existing
   package directory and does not overwrite root instructions. For an upgrade,
   extract to a separate review directory, compare with the installed version,
   and apply reviewed changes through the target repository's Git workflow.

3. Activate `agent-app-build-startup/repository-seed/` at the target root using
   the mapping below. Review existing files before merging; never recursively
   copy over an existing repository. Adding the startup folder alone does not
   make a repository build-ready.

   | Seed path | Target path / action |
   | --- | --- |
   | `AGENTS.md` | Root `AGENTS.md`; preserve target instructions while merging learning, naming, verification and completion gates. |
   | `docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md` | Same path; target's single canonical lifecycle owner. Review/merge if already present. |
   | `scripts/` and `tests/` | Merge the supplied policy, session, Query and timing validators and their regression tests at the same paths. |
   | `docs/lessons/objects/` and `docs/build-models/` | Merge the operation references and versioned build/purge models at the same paths. |
   | `.agents/skills/aistudio/` | Same directory; keep CLI, skill and references at a consistent version. |
   | `docs/handoffs/ACTIVE_HANDOFF.md` | Same path; fill current project state, authority and next action. |

4. Materialize package `templates/` in `docs/builds/<build-id>/`, except the
   handoff which has the canonical path above. Fill all six intake sections,
   requirements, golden paths, dependency inventory and checkpoint. Initialize
   `time-tracker.md` before using `scripts/Add-BuildTimeRecord.ps1`. Review
   `docs/operations/CARRY_FORWARD_INVENTORY.md` and `PROJECT_STRUCTURE.md` in the
   installed startup folder. Adopt its compatible startup mechanics into root
   instructions; do not replace the root lifecycle contract with package mechanics.

5. From the target root, verify the activated files:

   ```powershell
   pwsh -NoProfile -File scripts/verify-living-build-contract.ps1 -PolicyOnly
   pwsh -NoProfile -File tests/test-living-build-contract.ps1
   pwsh -NoProfile -File agent-app-build-startup/scripts/Verify-AgentAppBuildStartup.ps1
   node .agents/skills/aistudio/scripts/aistudio.js --help
   ```

6. Commit the activated governance, skill and startup package to the target
   branch. Create future worktrees from that commit, for example with the
   package's `New-AgentAppBuildWorktree.ps1` using branch `codex/xdx-example`
   and worktree `.worktrees/xdx-example`. A new session is optional. Read the target handoff and canonical guidance, initialize the current-task receipt, then run the verifier with -SessionRecord, -SessionId and -Phase Startup. PolicyOnly validates installation, not session readiness. Resume an existing build only after verifying its checkpoint and checkout.

The XDX convention is carried forward unchanged for new artifacts only. The
seed is a delivery snapshot, not another editable playbook owner. Maintain the
activated target files; reconcile later packet versions through reviewed Git
changes. The AI Studio sample index currently contains no deployable app samples;
authoring references and the project tree are examples, not deployable artifacts.

## Rollback and uninstall

Follow [Rollback and uninstall](agent-app-build-startup/docs/operations/ROLLBACK_UNINSTALL.md)
for failed installation recovery, folder-only uninstall, activated-repository
rollback and upgrade rollback. The guide remains available inside the installed
folder. Removing that folder alone does not undo root activation or live Fusion
changes; preserve the baseline, backups and activation receipt before reversal.

## Verification boundary

`PACKET-MANIFEST.json` records SHA-256 for every payload file. Verification checks
the inventory, hashes, required seed artifacts, startup contract, living-build
contract and canonical playbook links. Hashes detect payload changes relative to
the manifest; they are not a digital signature. Local package verification does
not establish target authentication, live app behavior or deployment readiness.
