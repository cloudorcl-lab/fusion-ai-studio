# Tooling usage and boundaries

The canonical playbook owns lifecycle requirements. These examples document the local tools delivered by task xdx-tooling-efficiency-20260927.

## Activity tracking

Use `node scripts/measure-build-command.cjs --help`. Command mode accepts `--activity-kind execution|review|evidence-capture|coordination|context-recovery|human-wait`. Use `interval` start/end around unwrapped work, with a unique ID shared by the two boundaries. Use `report --input <journal.jsonl> --from <UTC> --to <UTC>` to derive coverage. Human wait can overlap independent work; the report separates that intersection. Open intervals and unallocated gaps are not measured labor. An exit code is not a semantic verdict; attach an `outcome` with reviewed evidence when appropriate.

## Candidate screening

Before new optimization, freeze critical tests and full required coverage. Execute each critical test through the supported CLI with the candidate overrides and a distinct label, attach required judgments, then evaluate:

```text
node scripts/screen-model-candidate.cjs <screen-contract.json>
```

Contract fields: `schemaVersion:1`, `workflowCode`, `version`, `runLabel`, `screeningTests` (test names), `finalTests` (complete test names), `evidence` (objects with repository-relative `path` and SHA256 `sha256`). Evidence contains actual individual result JSON or a suite's `results`. Update evidence hashes only after a reviewed judgment attachment. Exit 2 rejects on confirmed contract failure, 3 means incomplete, 0 only permits full regression. No command is executed by the screen. Complete candidate/combined and final saved-version suites remain mandatory; the previous Supplier full-profile protocol is unchanged.

The existing `plan-affected-workflow-tests.cjs` remains the conservative development test selector. Union its selection with ATLAS required actions. Unknown/dependency changes select all. It never authorizes mutation or replaces final coverage.

## Exact report provenance

The supported app final-summary command now accepts `--run-label <app-label> --workflow-run-label <workflow-label> --workflow-version <saved-version>`. Explicit selection cannot fall back to generic history. Single-report app judge attachment infers its report label and rejects a conflicting flag before changing the report.

To derive a fresh local aggregate from retained source reports:

```text
node scripts/refresh-test-report-provenance.cjs <report-manifest.json>
```

Manifest: `schemaVersion:1`, `groups:[{kind:"workflow"|"app", workflowCode, version, runLabel, tests:[test names], reports:[explicit paths], appCode (app only)}]`. Suite indices provide individual report paths; current individual judgments supply results. Output is JSON with source hashes, missing coverage and explicit `finalAcceptance:false`. Redirect into a new evidence file if needed. It does not modify historical aggregates, attach judges or run tests.

## Native capture

Import `captureNativeEvidence` and `createCuaCapture` from `scripts/capture-native-evidence.cjs` in the authorized browser REPL. Bind the actual target tab first. The CUA adapter calls documented `getAXStateAndScreenshot` once, then invokes a product-specific tested result parser. The parser must extract observed target/prompt/full response/loading state, with the recorded submission timestamp. It must reject collapsed/virtualized/incomplete results. Exact target identity and screenshot are required; login pages must never be captured.

Capture creates one exclusive ID directory, saves exact prompt/response/AX/PNG and writes the hash receipt last. Capture is not submission or acceptance; no retry exists. Current tests prove the adapter with local mocks, not a live Oracle extractor. Application-specific parser/selector integration remains necessary at the next native test; this task does not claim a live capture or recover old screenshots.

## Single evidence manifest

```text
node scripts/build-evidence-status.cjs <evidence-manifest.json> status json
node scripts/build-evidence-status.cjs <evidence-manifest.json> gaps md
```

Manifest: `schemaVersion:1`, `taskId`, `sources:[{path,sha256}]` for the frozen implementation, `requirements:[{id,description,status,evidence:[{path,sha256,checks:[{pointer:"/status",equals:"passed"}]}]}]`. Status is pending/passed/failed/not-applicable; not-applicable requires `reason`. Every pass needs JSON evidence checks. Source drift, missing files, wrong hashes or failed checks block Closeout eligibility. Views status/requirements/gaps/closeout all read this owner. The declared inventory still needs independent review against user requirements; this is local evidence validation, not tenant verification.

Consolidate final review after source freeze. Generate status views instead of manually maintaining conflicting copies. Preserve handoff authority/recovery notes and link this task's manifest and time tracker. No future speedup is claimed from local tests.
