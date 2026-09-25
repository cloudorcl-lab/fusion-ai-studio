# Command timing implementation receipt

Scope: delegated local helper and its tests only; no tenant operation, business write, artifact change or Git operation. Shared Startup gate passed before implementation. Coordinator owns integration, package and Closeout.

Files: [helper](../../../scripts/measure-build-command.cjs) and [tests](../../../tests/test-measure-build-command.cjs).

## Verification

`node tests/test-measure-build-command.cjs`: 12 checks PASS. Initial 11 checks passed directly and through the wrapper. Adding a completion-append-failure case justified the final run through the actual wrapper: [UTC and monotonic timing](timing-verification.jsonl), 2026-09-25T16:04:59.389Z through 16:05:02.988Z, 3598.6336 ms, exit 0. Earlier 11-check evidence is retained; these runs are not performance benchmarks.

Checks cover successful child stdout/stderr passthrough; nonzero exit preservation; sanitized spawn failure; durable start before execution; literal spaces, quotes and shell metacharacters; no persisted args/environment/stdout/stderr; CLI rejection; cwd containment and setup failure preventing execution; stale-lock preservation; completion append failure returning 74 with unmatched start rather than success; interrupt handler forwarding and receipt; early wrapper exit with unknown outcome; eight concurrent writers with complete correlated JSONL pairs. Scratch cleanup verifies its exact resolved per-test directory under tests before deletion.

## Usage and boundaries

```powershell
node scripts/measure-build-command.cjs --output docs/builds/xdx-build-process-optimization-20260925/commands.jsonl --task xdx-build-process-optimization-20260925 --activity local-check --phase verification --category test --label local-check -- node tests/test-measure-build-command.cjs
```

Optional `--parent`, repeated `--dependency` and `--overlap`, and `--rerun-reason` capture activity relationships. Use public, nonsecret labels and IDs. Output must have an existing parent within the current working directory; the helper rejects path escapes and observed symlinks. Executables run with `shell: false`; use an explicit interpreter for scripts. Console output remains visible to the caller and its existing host logs; this helper does not capture or redact that console stream.

Every invocation has a unique runId shared by its events. Read correlated events by runId, not adjacency; concurrent commands may interleave. Each append acquires an exclusive lock for a single synchronous write and fsync, waiting at most approximately 0.5 seconds for contention. A stale lock is preserved for operator investigation. Start append failure prevents execution. End append failure emits a warning and changes a successful child exit to 74, while retaining a nonzero child's exit. The append protocol assumes a local filesystem and trusted directory ownership; it is not a distributed locking protocol or protection against hostile path races.

Elapsed time is monotonic wrapper duration through observed child closure, including timing/spawn overhead. UTC is separately recorded; clock changes cannot make the monotonic duration negative. Parent or overlapping intervals must not be added to enclosing elapsed time. Tokens, AI Units and workflow time are explicitly unavailable.

SIGINT/SIGTERM handlers record a request, forward it to the direct child and await child closure. Handler testing emits the actual process event because Windows external process termination bypasses JavaScript signal handlers. The helper does not manage grandchildren or promise cancellation of external business operations. A normal early wrapper exit records an unfinished event when possible; forced termination or power loss can leave only start, meaning outcome unknown. No elapsed completion, successful cancellation or child result may be inferred from that unmatched start. Do not rerun a possibly completed business operation for missing timing evidence.

No automated keep-alive, browser check, scheduler, wall-time saving or labor measurement is claimed. No environment/configuration snapshot is saved. Metadata itself is caller-supplied and must not contain credentials.

## Installed-test concurrency repair

The later target-installed regression failed after eleven checks, before its concurrent-writer assertion. Its `finally` cleanup raised Windows EPERM and masked the original failure. The harness used fail-fast `Promise.all` and discarded concurrent stderr, so cleanup could begin while sibling processes still held the directory. That original exception is unrecoverable; it is not asserted identical to the separately reproduced production race below.

The harness now awaits every child's `close` through `Promise.allSettled`, retains bounded stderr, and reports failures only after all children settle. Scoped cleanup uses five bounded retries at 100 ms and preserves the original failure alongside any cleanup error. A deterministic case forces one child to fail with exit37 and stderr while a delayed sibling writes its completion marker; it proves settlement and error preservation before cleanup. No production-process cancellation or external retry is introduced.

Focused production diagnosis reproduced two EPERM failures in 30 batches of eight writers. A second 30-by-eight probe instrumented filesystem calls and reproduced three EPERM failures, all at `openSync(lock, 'wx')`; none was observed at lstat or unlink. This is consistent with Windows delete-pending file handles during exclusive lock acquisition. The production correction permits Windows EPERM to retry only that acquisition, within the existing fifty-attempt/approximately 0.5-second bound. It never removes an existing lock or retries somebody else's operation. Sanitized diagnostics now expose error code and `lock-acquisition` stage without paths, arguments or environment.

The final suite passed **14 checks on Windows**, including the deterministic simulated acquisition EPERM and delayed-sibling failure cases (13 portable checks elsewhere). A matched [30-by-eight post-repair probe](timing-concurrency-repair.json) completed **240 writers, zero failures**, 2026-09-25T16:18:13.929Z–16:18:23.932Z,10001.8958 ms. This supports the scoped repair; it is neither universal concurrency proof nor evidence of build-speed improvement. Root owns refreshed package and target-installed verification.
