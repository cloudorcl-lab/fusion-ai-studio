# Supplier retry purge — execution plan
Model version 1.0.0. Task xdx-supplier-retry-purge-20260924.
User instruction: run the purge; current completed retry scope from active handoff.
Environment eqih-dev21; surviving base TestingWFBuildTools at 3b53882.
No Fusion business data or remote branch deletion. Preserve unrelated temp deletions.

| Target | Intended disposition | Preconditions |
| --- | --- | --- |
| XDX_SUPPLIER_LIFECYCLE DRAFT app id300000333988549 v1 | Delete | Exact UI identity/current metadata; no published copy; independent readback |
| XDX_SUPPLIER_LIFECYCLE_AGENT DRAFT id300000333987487 v86153667 | Delete after app | Exact identity/current metadata; lifecycle check; independent readback |
| XDX_SUPPLIER_RETRY_20260923_A id300000333987486 | Hold unchanged | Complete consumer proof unavailable; no deletion |
| XDX_PROCUREMENT_BU_RETRY_20260923_A id300000333996545 | Hold unchanged | Complete consumer proof unavailable; no deletion |
| XDX_SUPPLIER_CATEGORY_RETRY_20260923_A id300000334011571 | Hold unchanged | Complete consumer proof unavailable; no deletion |
| Original three BOs | Excluded / retained unchanged | Prior retention authorization persists |
| Retry worktree/branch at6c85117 | Hold | Clean but unintegrated in base; no force removal |
| Fusion suppliers/children, published artifacts, remote refs | Excluded | No mutation |

Preservation: verified xdx_retry_history.bundle outside worktree contains retry ref,
requires base ancestor7497e16; original branch/worktree retained. Remote prefetches
and hashes in evidence/xdx_inventory.json. App diff versus local is id only;
workflow matches exactly; BO diffs are context/restResourceIdentifier metadata.
CLI published app not found; workflow reports not found with200OK; verify UI.
Catalog25 omits known workflow: never infer zero consumers.
Receipt and timing remain in surviving base. Git does not restore deleted server state.
Partial purge must explicitly report held targets; no complete claim while required scope unresolved.

## Final approved disposition
User approved retaining all three retry BOs and the existing retry branch as archive, with verified bundle as additional preservation. Only clean worktree removal authorized despite unintegrated status. Executed and verified: worktree registration, path and captured administrative directory absent. BO and archive branch deletion are no longer required.
