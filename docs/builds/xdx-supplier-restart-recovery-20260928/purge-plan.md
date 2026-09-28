# Supplier restart purge plan

Model1.0.1. Current mode: approved exact purge. User confirmed: Yes, purge local and DRAFT artifacts. Preservation and current-task Startup passed; installed baseline qualification passed. User explicitly requested stop, analyze, record, fix, purge this build and restart with fixes.

Surviving checkout: C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1, TestingWFBuildTools, initialHEAD3d7369038bd5c496ed6046ad5c58179dae5d5828. Abandoned checkout: .worktrees/xdx-supplier-core-rebuild-20260928, branch codex/xdx-supplier-core-rebuild-20260928, same initialHEAD. Actual Git administrative path: .git/worktrees/xdx-supplier-core-rebuild-20260928. All workers stopped; browser refresh explicitly stopped. No purge process runs from deletion target.

| Exact target | Recorded identity | Intended disposition | Required evidence |
| --- | --- | --- | --- |
| Studio app XDX_SUPPLIER_CORE | id300000334161225,version1,ETag17 | Delete after current readback | Current identity, artifact export, independent absence |
| Workflow XDX_SUPPLIER_CORE | id300000334161224,DRAFT86517154 | Delete DRAFT after app | Current identity/lifecycle, export, independent absence |
| BO XDX_SUPPLIER_CORE_SUPPLIERS | id300000334163769 | Delete if exact ownership and dependency clearance | Current definition, current consumer inventory and independent absence; otherwise retain with explicit unresolved disposition |
| Local worktree .worktrees/xdx-supplier-core-rebuild-20260928 | branch above,HEAD3d736903 | Remove after preservation/promotion | Hash-verified archive of all unique files outside target; committed fixes in surviving base; no remaining child process; confined physical path/no reparse points |
| Local branch codex/xdx-supplier-core-rebuild-20260928 | initialHEAD3d736903, no commits yet | Non-force delete after integration/tip verification | Tip still integrated in surviving base; branch absent after removal |
| Supplier business record | SupplierId300000334073700,number1511 | Preserve unchanged | Accepted POST/GET receipts and carried budget; no DELETE or replay |
| Other business records/artifacts,env.properties,remote Git refs | Outside scope | Preserve unchanged | Base status/config hash and exact target manifest |

Dependency order: app→workflow→BO. Fresh exact readback immediately before each deletion. Naming prefix alone is not authority. Unknown consumers are not treated as zero. No publication/push or remote branch deletion. Source exports cannot guarantee recovery of original server IDs or tenant relationships.

Preservation: private base .debug/worktree-archives/xdx-supplier-core-rebuild-20260928-stopped/ holds verified archive and manifest. Configuration preserved privately outside archive/staging and compared by hash without printing contents. All task files, including ignored test reports, must have a preservation disposition. Retain meaningful failure and acceptance receipts in surviving restart record; promote only reusable governance/tooling/tests/object lessons, never abandoned product code as the new implementation.

Local removal: verify exact registered path/branch/admin path; reject base/root and reparse escapes. Preserve every changed/untracked/ignored file first. Existing committed tip already belongs to base; verify again. Restore only archived task-owned tracked content and remove only manifest-enumerated archived untracked content if needed to make normal Git removal possible. No reset, clean, force worktree removal, global prune, wildcard deletion or cross-shell destructive commands. Revalidate path confinement before each recursive removal. Verify registration, path and local ref separately.

Restart: unique new XDX branch/worktree from the committed fixed tooling release. New current session receipt and failure ledger, inherited prevention checks and current policy. Carry accepted A-supplier and seven remaining allocations; do not create a replacement A supplier or renew budget. First prove one supplier prepare/edit/review/approve/create/GET journey, then child slices. Tooling qualification must pass before tenant build actions.
