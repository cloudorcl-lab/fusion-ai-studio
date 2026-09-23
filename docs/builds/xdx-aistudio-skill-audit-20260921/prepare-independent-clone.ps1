$ErrorActionPreference = 'Stop'
$sourceRepo = 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1'
$candidateRepo = 'C:\Users\dasu\Documents\GitHub\fusion-ai-studio-skill-hardening'
$baseline = 'b1e9b4a87c4bac24c4552bd5e0f732a43c4a4892'
$branch = 'codex/xdx-aistudio-skill-hardening'
$taskId = 'xdx-skill-clone-bootstrap-20260921'
$relative = 'docs/builds/xdx-aistudio-skill-hardening'
$destination = Join-Path $candidateRepo $relative
$auditSource = Join-Path $sourceRepo 'docs/builds/xdx-aistudio-skill-audit-20260921'
function Invoke-CandidateGit {
    param([string[]]$Arguments)
    $result = & git -C $candidateRepo @Arguments
    if ($LASTEXITCODE -ne 0) { throw "Candidate git failed: $($Arguments -join ' ')" }
    return $result
}
if ((Invoke-CandidateGit -Arguments @('rev-parse','HEAD')) -ne $baseline) { throw 'Unexpected clone baseline' }
if ((Invoke-CandidateGit -Arguments @('branch','--show-current')) -ne $branch) { throw 'Unexpected clone branch' }
if (-not (Test-Path -LiteralPath "$candidateRepo\.git" -PathType Container)) { throw 'Independent .git directory required' }
if (Test-Path -LiteralPath "$candidateRepo\.git\objects\info\alternates") { throw 'Shared object store found' }
if (-not (Test-Path -LiteralPath "$sourceRepo\env.properties" -PathType Leaf)) { throw 'Source environment file is missing' }
Invoke-CandidateGit -Arguments @('sparse-checkout','set','--no-cone','/*','!/.worktrees/') | Out-Null
Copy-Item -LiteralPath "$sourceRepo\env.properties" -Destination "$candidateRepo\env.properties"
$environmentHash = (Get-FileHash -LiteralPath "$sourceRepo\env.properties").Hash
if ((Get-FileHash -LiteralPath "$candidateRepo\env.properties").Hash -ne $environmentHash) { throw 'Environment copy mismatch' }
if (Invoke-CandidateGit -Arguments @('remote')) { throw 'Clone must have no configured remote' }
if (Test-Path -LiteralPath $destination) { throw 'Refusing to overwrite an existing bootstrap record' }
$sourceHandoffHash = (Get-FileHash "$sourceRepo\docs\handoffs\ACTIVE_HANDOFF.md").Hash
New-Item -ItemType Directory -Path "$destination\evidence" -Force | Out-Null
foreach ($name in @('before-after-and-rollback-plan.md','audit.md')) {
    Copy-Item -LiteralPath (Join-Path $auditSource $name) -Destination (Join-Path $destination $name)
}
foreach ($name in @('snapshot.json','build1-time-tracker.md','build1-handoff.md','build1-checkpoint.md','build2-time-tracker.md','build2-checkpoint.md','build2-intake-and-learning-register.md')) {
    Copy-Item -LiteralPath "$auditSource\evidence\$name" -Destination "$destination\evidence\$name"
}
$restart = "codex -C '$candidateRepo' 'Read docs/handoffs/ACTIVE_HANDOFF.md first. Continue the approved AI Studio skill-hardening plan in this independent clone: complete Wave 0 and Wave 1 only, preserving the canonical playbook and all lessons. Establish this session''s conformance receipt. Keep all work local and offline; do not access or alter the original repository, the running supplier build, shared configuration or Oracle runtime. Stop before Wave 2 or promotion.'"
Set-Content -LiteralPath "$destination\restart-command.txt" -Value $restart
$handoff = @'
# Active Handoff

Active work: AI Studio skill hardening, isolated tooling project. The user approved creating this independent clone and requested a fresh-session start. This is not a supplier app continuation.

## Workspace and baseline

- Clone: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-skill-hardening`.
- Branch: `codex/xdx-aistudio-skill-hardening`.
- Baseline: `b1e9b4a87c4bac24c4552bd5e0f732a43c4a4892`; baseline tag: `xdx-skill-hardening-baseline-20260921`.
- Independent `.git`; cloned with `--no-hardlinks`, no alternates and no configured remote. `.worktrees/` is excluded by local sparse-checkout.
- At the user's explicit request, root `env.properties` is an exact verified copy of the base checkout's current file. Reuse it; do not rebuild, retarget or display secret contents. It is the sole environment authority if a later task authorizes runtime work. Its presence does not authorize runtime calls now.
- Git history retains committed historical configuration and artifacts. This is a local development clone, not a sanitized distribution. No browser state or secret-store entries were copied. Global authentication may exist on the host; this setup is workflow isolation, not a security sandbox.

## Read next

Read the entire canonical [playbook](../lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md), [object registry](../lessons/objects/README.md), [before/after and rollback plan](../builds/xdx-aistudio-skill-hardening/before-after-and-rollback-plan.md), [scope and acceptance](../builds/xdx-aistudio-skill-hardening/scope-and-acceptance.md), [checkpoint](../builds/xdx-aistudio-skill-hardening/checkpoint.md), [intake](../builds/xdx-aistudio-skill-hardening/intake-and-learning-register.md), and [time tracker](../builds/xdx-aistudio-skill-hardening/time-tracker.md). The canonical playbook remains the sole lifecycle owner and critical lesson memory.

## Approved next work

Continue Wave 0 and Wave 1 of the proposed plan in this clone only: establish the fixed local comparison fixtures and lesson-preservation matrix, then reconcile instruction ownership, naming, authority, guided versus approved execution, and verification assurance across all three `.agents/skills` entries. Preserve the CLI initially. No fixes have been applied yet. The six-scenario benchmark design and its resource cap must be settled before model benchmark execution; start with offline deterministic fixtures.

The plan's historical PROPOSED label describes when it was written. Current authority is this handoff and the user's acceptance of the isolated setup/initial staged work. Wave 2 code automation, CLI rewrite, live pilot, package activation and promotion are not authorized. Do not re-ask whether to create a clone or repeat unchanged design approval.

Establish a new session/task identity, verify policy, and pass your own Startup receipt before substantive changes. The bootstrap receipt is only setup evidence. This is an existing independent tooling checkout, not a new app build: do not create another clone/worktree or run app scaffold commands.

## Hard isolation and correctness boundaries

- Never operate on `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1`, its running `.worktrees\xdx-supplier-lifecycle-agent`, or their apps, BOs, workflows, tests, sessions, credentials or environment. The retained audit evidence here is sufficient historical context.
- Do not invoke Oracle authentication, discovery, fetch, save, recording, runtime tests, publication or business writes. Do not use shared browser sessions or update global skills/plugins/settings.
- Resolve skills and CLI references from THIS clone. If the session skill catalog points to the original repository, explicitly use the clone-local `.agents/skills` files and script paths. Do not silently fall back to another checkout.
- Keep the playbook and object-reference lessons intact. Do not remove or weaken authority, evidence, full-read or Closeout obligations to achieve speed targets. Reconcile contradictions in the correct owner and retain traceability.
- Treat copied build evidence as historical diagnostic evidence only, not current acceptance, reusable payloads or permission. Do not import the retired supplier implementation.
- Keep changes scoped and locally committed. No push, merge, package installation or promotion. The original running build receives nothing from this clone.
- Stop at the Wave 1 review boundary with before/after results, complete rollback evidence and the candidate diff. Later promotion must wait for the running build to finish and its new lessons to be reconciled.

## Restart

A fresh session is required so this checkout's instructions load before implementation. Use the command below. Scope/authority is unchanged; the next session creates its own receipt.

```powershell
__RESTART__
```
'@
Set-Content -LiteralPath "$candidateRepo\docs\handoffs\ACTIVE_HANDOFF.md" -Value $handoff.Replace('__RESTART__',$restart)
$scope = @'
# Scope and acceptance

Scope is structural improvement of all three skills: `aistudio`, `aistudio-apps-succession-management`, and `aistudio-apps-warehouse-operations-shortages`. The two historical supplier attempts are supporting evidence, not the organizing model or target app.

Canonical ownership: project playbook owns lifecycle/lessons; object registry owns operation contracts; base skill owns mechanisms/routing; companions own domain knowledge and guided choices. Preserve guided onboarding as a supported use case while separating it from approved-delivery execution.

Verified structural findings to recheck before editing:

- Project XDX naming conflicts with companion SP and WO requirements.
- The two companion workflow guides share 123 exact nonblank lines, guardrails 111, and handoff guides 103; identify the true common owner and packaging requirements before deduplication.
- Companions require menus/pauses and rereading the base skill at every handoff. Do not reopen unchanged scoped approvals.
- Companion proposals default to direct validation with tests deferred; base defaults to test synchronization. Preserve explicit user opt-outs but distinguish scaffold assurance from deliverable acceptance.
- Base guides mix operation procedures, UI assumptions, CLI references, examples and troubleshooting. Route by the active operation without erasing lessons.
- Companion handoffs are prose, with no executable coordinator. New coordinator code belongs to deferred Wave 2, not Wave 1.
- No runnable app examples exist in the base sample directory. Any future example must carry an honest evidence boundary.

Acceptance for initial work: no lost canonical obligation; correct naming/authority/scope for the fixed scenarios; no repeated unnecessary approval; no assertion that static/replay checks prove browser acceptance; no weakened write guards; required existing local tests pass; all edits remain within this clone; no runtime or remote operation.

Before/after efficiency targets are proposed measurements, not achieved results. No customer-ready claim follows from local fixtures. Keep the six-scenario comparison and rollback scope in the main plan.
'@
Set-Content -LiteralPath "$destination\scope-and-acceptance.md" -Value $scope
$now = [DateTime]::UtcNow.ToString('o')
Set-Content -LiteralPath "$destination\checkpoint.md" -Value "# Checkpoint`n`nTask: $taskId. Independent clone setup complete; Wave 0/1 implementation has NOT begun. Baseline $baseline. Current branch $branch. Begin with the active handoff, then current-session Startup receipt and offline baseline fixtures. No active subprocess, workflow run or remote operation retained. Read the plan for rollback; keep the baseline tag unchanged."
Set-Content -LiteralPath "$destination\intake-and-learning-register.md" -Value "# Intake and learning register`n`nTask: $taskId. User explicitly requested creation of the agreed independent clone and instructions to restart. Setup-only authority: clone committed baseline, prepare local handoff/plan/baseline manifest, verify independence and commit setup records. No fixes or runtime work in this session. Next-session initial scope is Wave 0/1 only.`n`nFull canonical playbook, registry and AGENTS reviewed earlier in this conversation; clone copies represent the same committed policy. No API resource operation is being authored or tested, so object-specific references are not applicable to setup. Preserve all lessons and original work. No new lifecycle or operation lesson is asserted; no policy update is required.`n`nHistorical audit copies are evidence, not current session receipts. Current setup receipt is xdx_session_$taskId.json."
Set-Content -LiteralPath "$destination\time-tracker.md" -Value "# Time tracker`n`nTask: $taskId. First observed setup checkpoint: 2026-09-21T16:04:33.7597718Z. Preliminary read interval before that is unmeasured. Clone and handoff checkpoint: $now. Tool time is nested in elapsed, not additive. No model benchmark or AI Studio runtime usage. Host model token split unavailable. Commit/final-response tail will remain outside the final checkpoint."
$files = Invoke-CandidateGit -Arguments @('ls-files','--','.agents/skills','AGENTS.md','docs/lessons','scripts/verify-living-build-contract.ps1','scripts/verify-session-compliance.cjs','tests/test-living-build-contract.ps1','tests/test-session-compliance.cjs','tests/test-bo-real-lookup-values.cjs')
$inventory = foreach ($file in $files) {
    $full = Join-Path $candidateRepo $file
    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) { throw "Missing baseline file: $file" }
    @{path=$file;sha256=(Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash.ToLowerInvariant()}
}
@{baselineCommit=$baseline;capturedUtc=$now;files=@($inventory);note='SHA-256 records checkout bytes; Git commit owns canonical blobs. Line ending changes must not be mistaken for semantic differences.'} | ConvertTo-Json -Depth 6 | Set-Content "$destination\baseline-manifest.json"
Invoke-CandidateGit -Arguments @('tag','xdx-skill-hardening-baseline-20260921',$baseline) | Out-Null
$reads = foreach ($file in @('AGENTS.md','docs/handoffs/ACTIVE_HANDOFF.md','docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md','docs/lessons/objects/README.md')) {
    @{path=$file;sha256=(Get-FileHash -LiteralPath (Join-Path $candidateRepo $file)).Hash.ToLowerInvariant()}
}
$checks = foreach ($group in @('learning','intake','authority','objects','verification','timing','cleanup','delivery')) {
    @{id=$group;rule='Canonical session conformance, scoped clone bootstrap';status='planned';reason='Verify isolated local hand-forward without build implementation or runtime operations.';evidence=@()}
}
$receipt = @{schemaVersion=1;sessionId=$taskId;repoRoot=$candidateRepo;branch=$branch;phase='Startup';startedUtc='2026-09-21T16:04:33.7597718Z';checkpointUtc=$now;reads=@($reads);reviewNotes='Same committed governance as reviewed source; new clone-local handoff reviewed in this setup. Independent setup only; no supplier work resumed.';objectReferences=@();noObjectsReason='No API resource operation authored or tested';learningRegister="$relative/intake-and-learning-register.md";timeTracker="$relative/time-tracker.md";checks=@($checks);unresolved=@('Verify clone isolation and handoff');metrics=@{tokens='Host token split unavailable';aiUnits='No workflow runtime invoked';timingGaps='Initial read interval and final response tail unmetered'}}
$recordPath = "$relative/xdx_session_$taskId.json"
$receipt | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $candidateRepo $recordPath)
& pwsh -NoProfile -File "$candidateRepo\scripts\verify-living-build-contract.ps1" -RepoRoot $candidateRepo -PolicyOnly
if ($LASTEXITCODE -ne 0) { throw 'Policy verification failed' }
& pwsh -NoProfile -File "$candidateRepo\scripts\verify-living-build-contract.ps1" -RepoRoot $candidateRepo -SessionRecord $recordPath -SessionId $taskId -Phase Startup
if ($LASTEXITCODE -ne 0) { throw 'Setup Startup failed' }
$actualGitDir = Invoke-CandidateGit -Arguments @('rev-parse','--absolute-git-dir')
$commonGitDir = Invoke-CandidateGit -Arguments @('rev-parse','--path-format=absolute','--git-common-dir')
if ([IO.Path]::GetFullPath($actualGitDir) -ne [IO.Path]::GetFullPath("$candidateRepo\.git")) { throw 'Unexpected Git dir' }
if ([IO.Path]::GetFullPath($commonGitDir) -ne [IO.Path]::GetFullPath("$candidateRepo\.git")) { throw 'Shared Git administration' }
foreach ($item in $inventory) {
    if ((Get-FileHash (Join-Path $candidateRepo $item.path)).Hash.ToLowerInvariant() -ne $item.sha256) { throw "Baseline modified: $($item.path)" }
}
if ((Get-FileHash "$sourceRepo\docs\handoffs\ACTIVE_HANDOFF.md").Hash -ne $sourceHandoffHash) { throw 'Source handoff changed during setup' }
if ((Get-FileHash -LiteralPath "$candidateRepo\env.properties").Hash -ne $environmentHash) { throw 'Environment copy changed during setup' }
$verification = @{capturedUtc=[DateTime]::UtcNow.ToString('o');baselineCommit=$baseline;candidateBranch=$branch;gitDirectory=$actualGitDir;commonGitDirectory=$commonGitDir;noAlternates=$true;noHardlinksRequested=$true;remoteCount=0;environmentReusedByUserRequest=$true;environmentSha256=$environmentHash;environmentCopyMatches=$true;baselineFileCount=@($inventory).Count;baselineFilesUnchanged=$true;sourceHandoffUnchanged=$true;runtimeOperations=0;implementationChanges=0;note='Commit ID after bootstrap is obtained from git log; this receipt is setup evidence only. Configuration reuse does not grant runtime authority.'}
$verification | ConvertTo-Json -Depth 5 | Set-Content "$destination\verification.json"
$receipt.phase='Closeout'
$receipt.checkpointUtc=[DateTime]::UtcNow.ToString('o')
$receipt.unresolved=@()
foreach ($check in $receipt.checks) {
    if ($check.id -eq 'objects') { $check.status='not-applicable';$check.reason='No API object operations';continue }
    $check.status='pass';$check.reason='Local clone/bootstrap scope verified; implementation and runtime acceptance remain pending.';$check.evidence=@("$relative/verification.json","$relative/time-tracker.md","$relative/intake-and-learning-register.md")
}
Add-Content "$destination\time-tracker.md" "`nDelivery checkpoint: $($receipt.checkpointUtc). Policy/Startup and clone isolation passed; baseline source files unchanged. Commit and final response tail excluded."
$receipt | ConvertTo-Json -Depth 8 | Set-Content (Join-Path $candidateRepo $recordPath)
& pwsh -NoProfile -File "$candidateRepo\scripts\verify-living-build-contract.ps1" -RepoRoot $candidateRepo -SessionRecord $recordPath -SessionId $taskId -Phase Closeout
if ($LASTEXITCODE -ne 0) { throw 'Setup Closeout failed' }
Invoke-CandidateGit -Arguments @('add','--','docs/handoffs/ACTIVE_HANDOFF.md',$relative) | Out-Null
Invoke-CandidateGit -Arguments @('diff','--cached','--check') | Out-Null
Invoke-CandidateGit -Arguments @('commit','-m','Prepare isolated AI Studio skill hardening handoff') | Write-Output
Invoke-CandidateGit -Arguments @('status','--short') | Write-Output
Invoke-CandidateGit -Arguments @('log','-1','--format=%H %s') | Write-Output
Write-Output $restart
