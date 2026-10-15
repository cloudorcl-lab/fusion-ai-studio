# Supplier evidence runner

Root is the sole browser/business-write owner. The reusable entry point is `scripts/xdx-supplier-e2e.mjs`; no external browser driver is installed. Import it in the supported persistent CUA REPL after binding the actual Studio app-preview tab and verifying observed target identity.

```js
var { start, run } = await import('file:///C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1/scripts/xdx-supplier-e2e.mjs');
var session = await start({ tab,
  repoRoot: 'C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1',
  runDir: 'docs/builds/xdx-supplier-e2e-evidence-20261015',
  target: observedTarget,
  plan: approvedSteps,
  resume: false
});
```

`observedTarget` contains appCode, workflowCode, version, host and surface (`app-preview` or `published-app`). These are observed runtime values, not historical defaults. Each approved step contains id, object, scenario, title, expected, dependencies and write. IDs are unique letters/digits/underscore/hyphen. The plan-review JSON provides reviewed prompt templates and gaps; the coordinator supplies exact current parent/source IDs and expected business assertions.

The adaptive helper calls use the same durable state owner as automation:

1. `await session.begin(id)` begins the initial execution. A later attempt requires `{reason,changedCondition}`; the initial execution is not a retry.
2. `await session.capture({id,stage,title,notes})` saves the actual screenshot and full unmodified AX state. Call at each meaningful screen, before advancing. An already observed `{state,screenshot}` pair may be supplied as `pair` to preserve that exact observation.
3. `await session.request({id,prompt,stage,submit,settle,reservation})` fills the observed single textbox, captures the entered prompt, durably reserves an optional write, invokes the caller's documented submit control, and captures the settled pair returned by its observed-completion callback. It never infers settlement or business PASS from words.
4. Before manually submitting Confirm, call `reserve({id,operationId,requestId,revision,payload})` with exact reviewed values. Persisted reservation becomes uncertain *before dispatch*. Never call reserve for ordinary query/preparation/review.
5. Reconcile the write using `reconcile({id,disposition,recordIds,evidence})`. Accepted and uncertain writes block replay. Only observed read-only reconciliation proving `not-created` can make a reservation retryable. Accepted IDs cannot be cleared.
6. `record({id,status,actual,assertions,recordIds,fallback,failureKind})` records PASS/FAIL/BLOCKED. PASS requires a nonempty array of `{passed:true,evidence}` assertions. Assertions are the coordinator's observed independent field/relationship verification, not a screenshot-only judgment. Failure kind may distinguish test from execution failures.
7. `await session.finish()` accounts for pending rows as BLOCKED, writes the summary and invokes the PowerPoint finalizer, even when tests failed. A queued host callback emits `presentation-pending`; only a callback returning an existing repository-bounded `finalPath` with matching `finalSha256` emits `presentation-finished`. `close()` only checkpoints/releases the lock and does not claim the run finished.

`run({...options,plan})` orchestrates executable steps in order. Each step provides `async action({session,tab,fallback})`, returning the explicit outcome accepted by record. Optional `fallback(session)` resolves valid existing records when dependencies failed. Original blocked connected rows must remain separate from labeled fallback rows. All stage exceptions are recorded and later executable stages continue. Finalization always runs. There is no numerical retry limit and no automatic retry loop.

Resume with the same target and `resume:true`. A nonempty supplied plan must contain the exact same unique step-ID inventory as the retained run; a mismatch is rejected before a lock or event write. Do not resume an adaptive run with the different IDs of the concrete full-journey entry point. PASS rows are skipped by run; accepted/uncertain writes remain frozen. A runner.lock prevents simultaneous owners. After a crashed process, inspect results.json and runner-events.jsonl, reconcile the prior owner and uncertain writes, and only then remove its stale lock manually. Never erase accepted IDs or reservations. A crash between journal append and state replacement may leave a newer journal event: reconcile both retained files before resuming.

```powershell
node scripts/xdx-supplier-e2e.mjs status docs/builds/xdx-supplier-e2e-evidence-20261015
node scripts/xdx-supplier-e2e.mjs finalize docs/builds/xdx-supplier-e2e-evidence-20261015
```

Finalization alone does not submit prompts or repeat creates. Use the repository gated timing runner and configured runtime for build/test/finalizer commands, as documented by the active run. The deck script may also be invoked directly through that wrapper.

The focused local durable-state proof uses only an injected inert tab and fixture IDs. Its PASS does not establish CUA import compatibility, native workflow acceptance or real business writes. Those are separately recorded by the coordinator.
