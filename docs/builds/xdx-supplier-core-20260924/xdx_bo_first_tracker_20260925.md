# BO-first and delegation governance

Task: xdx-bo-first-delegation-20260925. First observed clock: 2026-09-25T15:19:07.7797197Z. Tracking persisted 2026-09-25T15:19:34.961Z; earlier read/design discussion unallocated.

User approved BO-first changes from introspection and asked which work, including BO build/test, can be delegated. Design: per-resource BO dependency gates, one writer per shared artifact, scoped sub-agent assignments, independent evidence review and coordinator-controlled integration/serial mutations. No sub-agent or live test is needed to edit this governance.

Full canonical playbook and registry reviewed in the preceding introspection; current relevant sections and startup templates rereviewed. This is a lifecycle change, not a resource schema/operation change. No tenant calls, existing BO edits or accepted POST replay. Prior base/Git-sync authorization retained. Manual context checkpointing; browser acceptance not pending.

Checks: policy positive/negative regression, startup/package build and install parity, source links, current session Startup/Closeout. Package integrity stays byte-exact; normalized source comparisons retain current portability fix.

2026-09-25T15:23:06.6766086Z: BO-first/delegation controls implemented. PASS: living-build policy regression including five new missing-policy negatives; Startup package verifier; generated ZIP and full installation regression (132 files, source/installed parity, activation, LF/CRLF equivalence, substantive source-drift/tamper/extra-file/overwrite rejection). PASS:41 changed-document links and git diff --check. ZIP SHA256 b5c6a8333dea3acc97ea5ba87486712df785344e21a8958c80a778d72c975bf9. Process34354 completed; none active. No runtime artifact or operation changed, no actual delegated tenant test and no speedup claim. Base/Git integration follows.
