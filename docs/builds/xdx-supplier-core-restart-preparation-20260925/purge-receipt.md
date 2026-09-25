# Purge and restart preparation receipt

Observed through 2026-09-25T16:59:32Z. Environment eqih-dev21, identity CASEY.BROWN; browser Casey Brown. User-authorized disposable DRAFT build purge only.

- Exported exact current app300000334039940, workflow300000334039939 and BO300000334039938 before deletion; hashes in evidence/inventory.json. PUBLISHED exact fetches found no copies.
- UI deleted XDX_SUPPLIER_CORE_APP_20260924 first. Application search showed no applications; authenticated do-fetch-app --status DRAFT returned Application "XDX_SUPPLIER_CORE_APP_20260924" not found.
- UI deleted XDX_SUPPLIER_CORE_20260924 next. Workflow row and recent item disappeared; authenticated do-fetch-workflow --status DRAFT returned Workflow not found: 200 OK. No transport/auth failure used as absence.
- Retained BO independently fetched after purge, SHA2568497a41fdac6ed1ee1a1962a1d2b64d41e89f754eef6eec3d8109861ed45117e equals before. Catalog25 omitted the known draft workflow, so reverse-consumer completeness is unknown. No BO deletion or modification. No business-resource request/write/delete performed.
- Deleted exactly81 archived local paths in evidence/local-delete-manifest.json; retained original BO. Archive evidence/xdx_supplier_core_retired_files.zip has108 entries with per-entry source hashes verified before removal; ZIP SHA256414346a3185f0477771abd921a1ebcd10036177c1a85fa6451161ccdb26ecbd6.
- Clean old worktree was integrated at59fd032. Normal git worktree remove unregistered it but Windows denied residual directory removal. Verified both exact physical target paths, excluded reparse points, then removed only old worktree and captured .git/worktrees/xdx-supplier-core-20260924 residuals with native PowerShell. Deleted merged local branch using git branch -d. Git inventory now shows base only. Remote old branch retained.
- New prompt, plan, eight OPEN requirements and golden manifest prepared under ../xdx-supplier-core-20260925. Object-lifecycle model1.1.0 introduced; older versions retained. No new build started. Separate proposed direct/native create budgets require explicit future launch grant.

Validation and Git delivery will be appended after execution. Existing canonical rules already cover consumer preservation and Windows cleanup; no additional lifecycle/object rule is warranted. Model1.1.0 is the reusable change record; no duplicate playbook owner created.

## Verification

PASS: new model four-file/15-link review; fresh build four-file/16-link review, eight OPEN requirement rows and balanced fences. Coordinator reviewed the complete prompt, plan, requirement register and golden manifest. git diff --cached --check passed. No active package.json command references the six removed artifact-specific scripts.

PASS: install packet build and tests/test-agent-app-build-install-packet.ps1;140 payload files, source/installed parity, activation, overwrite refusal, tamper/extra-file rejection; governance/session negatives, Query validator,26 affected-selection tests,14 timing checks,18 terminal tests. Validated packet promoted to docs/agent-app-build-install-packet.zip. No runtime suite required for retirement/documentation; no new runtime acceptance claimed. Command intervals are in commands.jsonl.

Git delivery scope: TestingWFBuildTools only, preserving the three unrelated temp deletions. Remote retired branch remains59fd032. Closeout precedes the scoped commit; exact pushed commit and remote equality are reported in the final response. Restart must resolve the committed preparation state, not a dirty checkout.
