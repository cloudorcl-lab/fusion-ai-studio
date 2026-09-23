# AI Studio skill and CLI evaluation

Date: 2026-09-21. Task: `xdx-aistudio-skill-audit-20260921`.

**Verdict: not optimally structured for reliable, efficient delivery.** The package contains useful artifact tools and substantial safeguards, but too much execution control lives in overlapping prose. Its test machinery can account for workflow coverage without establishing that the requested UI works. The strongest evidence supports changing capability validation, acceptance sequencing and orchestration before changing models.

## Scope and evidence limits

- Audited the requested root checkout, branch `TestingWFBuildTools`, HEAD `b1e9b4a87c4bac24c4552bd5e0f732a43c4a4892`: inventory, main app/workflow/test instructions, relevant CLI implementations, governance and one existing CLI regression.
- Build 1's worktree was intentionally deleted. Read retained branch commit `48bcd7b2fd6146c93f3c448d17b73e57f4baf076` without restoring or checking it out. Retained snapshots are in `evidence/build1-*`.
- Build 2 was inspected through saved files only. No command was executed in its working directory; no file, test, process, app or remote state belonging to that build was changed. These are per-file snapshots of an active build, not an atomic or final status assessment.
- Root and build 2 skill entrypoint/CLI contents matched after CRLF normalization when inspected. Raw hashes differed only because of line endings. Build 1 contains additional CLI changes, so its behavior must not be attributed to the root bundle indiscriminately.
- This is a bounded source and retained-evidence audit, not exhaustive validation of every CLI command or independent reproduction of either app. No authenticated environment operations were performed. Host-model identity and comparative model performance were not tested.

## What happened in the two builds

### Build 1: XDX Supplier Workspace

The retained tracker spans 2026-09-18 00:00:55Z through 2026-09-19 06:20:18Z: about **30 hours 19 minutes elapsed**, including gaps, approval waits and interruptions. It does not establish uninterrupted model execution or active labor.

At the September 18 delivery checkpoint it recorded **551 retained jobs, 3,770 known AI Units and 2,663,421 known workflow model tokens**, explicitly excluding missing recording/browser/history usage. These are incomplete retained totals, not a complete bill and not Codex token usage. Despite 91 local checks, an app pass and a 32-pass workflow report (including two historical live-create reports), the full native journey remained unaccepted.

The next QA cycle confirmed 24/24 intended persisted fields, but only 22/24 displayed fields matched: address and contact Email were blank. Child creation used controlled `oraFormSubmit` payloads through Query; that did not prove ordinary native child-button UX. Native InvokeAction continuity remained unaccepted. The records accurately disclosed these limitations; the problem is the amount of work invested before the decisive user experience was established.

Sources: [tracker](evidence/build1-time-tracker.md), [final handoff](evidence/build1-handoff.md), [checkpoint](evidence/build1-checkpoint.md).

### Build 2: XDX Supplier Lifecycle Agent

At the inspected checkpoint, P0-P3 were accepted and P4-P9 plus Closeout remained. P3 recorded workflow 17/17 and app 1/1, plus actual browser checks for reference selection, default application, correction and revision-bound no-write approval. It is more disciplined than build 1 and must not yet be classified as a finished failure.

Nevertheless, the register records three expensive assumption corrections: HUMAN/WAIT topology rejected by the AI Apps runtime; chat history reintroducing old supplier values as fresh patches; and a completed `oraInfoDisplay` Query yielding only `Done` in chat. Ordinary turns, current-message interpretation with deterministic state, and visible Markdown were the recorded repairs. These are observed environment-specific findings, not a universal claim about all Oracle releases.

The P3 pre-browser checkpoint at 06:09:32Z reported expired sign-in; acceptance at 14:14:29Z followed restored sign-in, an interval of about **8 hours 5 minutes**. That is an authentication-blocked acceptance interval, not evidence that the model spent eight hours computing. The tracker reports 3,252,954 aggregate goal tokens later, but explicitly lacks a billing/category breakdown; do not compare that number directly with build 1's workflow tokens.

Sources: [tracker](evidence/build2-time-tracker.md), [checkpoint](evidence/build2-checkpoint.md), [learning register](evidence/build2-intake-and-learning-register.md).

## Ranked findings

### 1. Critical: the real interaction contract is established too late

The playbook puts complete workflow synchronization at Gate 6 and the live golden path at Gate 7. Its separate QA table says golden path before canonical suites, so sequencing is not fully consistent. More fundamentally, neither a graph nor a debug replay establishes native state continuity, click routing or visible chat rendering. Both builds encountered precisely those boundary failures.

**Recommendation:** introduce a small, explicitly authorized capability probe before full topology and coverage expansion. Prove the intended entry surface, state across two turns, exact review/cancel behavior and visible output with zero business writes. For create capability, use a separately authorized minimal write/read-back slice. Then expand scope. Preserve accuracy and authorization; change when evidence is obtained.

### 2. Critical: app-test PASS covers a narrower surface than app usability

`references/prompts/app-test-authoring.md:35` says phase-one app tests target InitDisplay. `scripts/aistudio.js:65300` explicitly runs the workflow debug app-stage route. Widget assertions are derived from the app/workflow being built; absent explicit layout contracts, validation can fall back to structure alone (`app-test-authoring.md:248`). This is useful contract testing, but it is not browser acceptance.

**Recommendation:** report separate statuses for static validity, workflow execution, persisted business results, and browser journey. A required user journey must remain failing/unverified regardless of sync completion. Tie acceptance to independently specified expected fields and actual interactions, including blank-field rendering, stale approval and repeated confirmation. `finalSummaryAllowed` means generation is accounted; it must never stand in for release acceptance.

### 3. High: instruction loading is much larger than the routing structure suggests

The package has **58 Markdown files, 844,483 bytes and 111,741 whitespace-delimited words**. The eight core entrypoint/app/workflow/testing files total **58,862 words**; the mandatory playbook adds **10,834**, before node guides, object contracts and project state. This is a file-volume measure, not a measured prompt-token charge; selective loading and caching affect actual cost. Nevertheless, several routed references are extremely broad: workflow tests 150,580 bytes; workflow authoring 114,497; app master 69,132.

**Recommendation:** retain a short router and split guides by executable task: create minimal app, add read route, add review/write route, repair one test, run acceptance. Load only the active procedure and relevant schema. Keep full command syntax in help/schema output. Move archived examples and uncommon troubleshooting out of the mandatory path. Apply the same scoping to the playbook; shortening SKILL.md alone will not remove mandatory rereading.

This follows established guidance on concise skills, progressive disclosure and evaluations as the measure of effectiveness: [Anthropic skill authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices).

### 4. High: instructions disagree on authority, interaction and execution context

Concrete examples:

- `SKILL.md:105` keeps artifacts local unless remote work is explicitly requested; `workflow-test-authoring.md:274` directs draft creation/save without another confirmation when remote state is missing or not newer. The latter needs an explicit inherited-authority condition.
- `workflow-test-authoring.md:93` permits supported live recording through write-like nodes without a separate decision, whereas the playbook requires scoped live-write authority. A test scenario is not an authorization grant.
- `workflow-test-authoring.md:99` prohibits progress narration until the loop finishes. That obscures long-running failure and conflicts with this session's communication requirements.
- `app-best-practices.md:15` requires follow-up confirmation even after detailed requirements; SKILL.md repeats current-message-only package selection. These can reopen settled choices rather than preserve a scoped approval record.
- `workflow-vibe.md:12` assumes a currently open Builder UI workflow, while the skill is executing against repository files.
- `app-best-practices.md:65` broadly discourages CODE for significant core functionality, although deterministic state validation, revision checks and approval enforcement are central to this task.

**Recommendation:** one authority record with explicit scopes; one CLI-oriented execution contract; narrow model use to interpretation and synthesis. Delete overlapping rules after moving their valid requirements to the correct owner. Higher-priority user/session instructions already resolve some conflicts in this run, but the package should not depend on the model repeatedly adjudicating them.

### 5. High: the model performs too much mechanical orchestration

The sync protocol requires the assistant to select a single action, retrieve judge context, author JSON, generate, inspect persisted JSON, possibly repair or compact it, validate, refresh the plan and repeat. It later grades its own output and attaches results. Much of this is deterministic state management.

The code already has useful focused plans and two-attempt branch deferrals. I found no task-wide elapsed/cost/no-progress limit exposed by the reviewed test-run command interfaces. Some internal helpers accept timeouts; that is not an end-to-end build budget. The prose repeatedly requires continuation until all actions are accounted.

**Recommendation:** a resumable deterministic coordinator should execute authorized actions until it needs a model-authored decision, a new approval, or encounters a concrete blocker. Persist action IDs, input/artifact hashes, attempt counts, results and costs. Enforce configured elapsed and repetition limits; stop a no-progress cycle while retaining its evidence. Keep mutations serialized per artifact. This should wrap supported CLI contracts rather than reverse-engineer hidden endpoints.

### 6. High: generated assertions and local judging share the builder's assumptions

`workflow-test-authoring.md:24` derives semantic contracts from terminal nodes and their prompts; line 634 directs the local assistant to evaluate the output and write its own judge result. This is useful development feedback, but an omitted business requirement may be absent from both implementation and tests. Strong JSON/result validation does not make the acceptance oracle independent.

**Recommendation:** freeze a small requirements-owned acceptance manifest first. Use deterministic comparisons for required values, identities, arithmetic and side effects. Use a separately scoped semantic evaluator for subjective criteria; keep it from rewriting acceptance criteria. Measure this skill on a fixed set of representative builds and known failures, not only on tests generated from each resulting workflow.

### 7. Medium-high: missing runnable examples and surface-specific capability contracts

`resources/app-samples/index.md` explicitly contains no samples. HUMAN guidance explains supported workflow use without establishing the app-surface restriction recorded by build 2. Large prose references therefore leave basic integration patterns to be rediscovered.

**Recommendation:** versioned, sanitized executable fixtures for read-only Ask Oracle, multi-turn review/cancel, and one authorized create/read-back pattern. Label their tenant/release evidence and limits. Generate or validate a capability matrix keyed by entry surface, artifact type and tested release. Unsupported or unknown combinations should be detected before authoring the full app.

### 8. Medium: CLI maintainability and distribution need strengthening

There is one shipped script under this skill: `aistudio.js`, **2,935,917 bytes / 72,576 lines**, with bundled, abbreviated symbols. No source modules, source map or package manifest were present under the audited skill. A single distribution bundle is not inherently bad; making it the local patch surface is fragile. The existing regression extracts functions by textual symbol boundaries and explicitly says to update that seam after replacement.

Build 1's retained CLI differs from root by 213 changed lines, including app-hint reachability and conversation-branch coverage support. Build 2 still records four stateful/unreachable single-turn deferrals. This shows the importance of a versioned tool contract; it does not prove those old patches should be copied back. Preserve the deleted-worktree boundary. Reproduce relevant failure cases independently and fix the maintained source owner if warranted.

**Recommendation:** retain the bundle for delivery but maintain modular source, reproducible packaging, a version/provenance manifest and black-box regressions. The inspected `--version` invocation failed as an option missing a value. Five local help invocations took 192–240 ms, so startup overhead does not explain a 24-hour build. Syntax and the existing BO lookup regression passed; these checks say nothing about native UI correctness.

## Recommended implementation design and order

Use the existing CLI behind a small deterministic execution layer. Keep LLM work for ambiguous requirements, bounded language interpretation and semantic assessment. Preserve the existing environment authority, version safety, generated-ID handling, serialized mutation, exact approval and persisted read-back controls.

1. Establish acceptance and capability probes first. Prove one usable vertical slice before adding all child operations.
2. Reconcile conflicting instructions and reduce mandatory context to a task-specific procedure. Do not simply delete safeguards to shorten prompts.
3. Add resumable orchestration with hard, configurable limits and separate acceptance status. Generate receipts and timing from events rather than asking the model to maintain several parallel narratives.
4. Add known-good fixtures and an independent skill benchmark. Re-run the same bounded tasks with the same model and compare accepted-journey success, time to first usable slice, failed attempts, remote calls and separate host/runtime token usage. Report authentication/approval waits separately.
5. Modularize and version the CLI only after preserving its current behavior with targeted regressions. Do not bulk-import build 1 or modify build 2 while it runs.

There is no evidence here that switching away from GPT-6 would resolve these structural problems. Nor is there evidence for a promised speedup factor. The measurable target should be successful required user journeys with bounded rework, not more passing generated assertions.

## Verification and disposition

- `node --check .agents/skills/aistudio/scripts/aistudio.js`: passed.
- `node tests/test-bo-real-lookup-values.cjs`: passed actual local CLI example write, legitimate lookup acceptance, placeholder rejection and unchanged artifact on rejection; fixture used a temporary directory.
- `run-app-test --help`: passed; confirmed the debug-route boundary.
- Policy and scoped audit Startup receipt: passed. Detailed snapshots and hashes: [snapshot.json](evidence/snapshot.json).
- No skill, CLI, build 2, runtime app, business data, governance policy or Git branch was changed. Only this audit directory was added in the base checkout. Existing modified handoff was preserved.
- Proposed changes remain recommendations. No new object-operation rule is established by this audit. Policy redesign/lesson promotion and customer-release acceptance are outside this review's completion boundary.
