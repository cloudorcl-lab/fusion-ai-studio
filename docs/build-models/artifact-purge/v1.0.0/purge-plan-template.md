# <Build/attempt> — artifact purge plan

Model version: **1.0.0**. Status: **UNFILLED / NOT AUTHORIZED FOR EXECUTION**.
Purge ID: `<id>`. Prepared UTC: `<time>`. Revision: `<revision>`.
Mode: `<inventory|execute|resume>`. Source model commit: `<commit>`.

Resolve placeholders before execution. Mark excluded items explicitly. This plan
records authority; it does not grant it. Follow the canonical playbook by reference.

## 1. Objective, identity and exclusions

- Intended retirement outcome: `<exact attempt and reason>`.
- Surviving repository/checkout, branch and baseline HEAD: `<identity>`.
- Environment/configuration and authenticated identity evidence: `<receipt, no secrets>`.
- Authorized server/local scope and trusted instruction: `<source>`.
- Exclusions: business data, unrelated artifacts, credentials, stashes and `<others>`.
- Published-state policy: `<excluded or exact separately authorized versions>`.
- Remote-ref deletion: `<false by default; exact authority if enabled>`.

## 2. Exact target/disposition manifest

One row per remote artifact, worktree and branch. Do not use code prefixes/wildcards
as scope. Separate server lifecycle copies and local/remote refs.

| Target ID | Type / environment / exact code or path/ref | ID / version / status or expected tip | Ownership evidence | Intended disposition | Authority source | Readback / acceptance |
| --- | --- | --- | --- | --- | --- | --- |
| `<id>` | `<exact target>` | `<identity>` | `<proof>` | `<delete/retain-unchanged/already-absent/blocked>` | `<source>` | `<proof required>` |

Already-absent is an observed outcome, not a substitute for independent readback.
Unknown ownership/dependencies block deletion. Approved retention is acceptable;
do not leave another section demanding deletion of the same target.

## 3. Dependency proof and deletion sequence

| Provider target | Known consumers | Discovery method / pagination | Completeness and known-consumer check | Required prior deletions | Disposition |
| --- | --- | --- | --- | --- | --- |
| `<provider>` | `<consumers>` | `<method>` | `<complete/unknown with evidence>` | `<IDs>` | `<decision>` |

Derive consumer-before-provider order from this graph. A missing known workflow
invalidates catalog completeness even if a tool labels the result “all workflows.”
Shared/unknown-consumer BOs remain unchanged. Removing functions is a separate
consumer-aware modification, not a substitute for an unauthorized whole-BO purge.

## 4. Independent preservation and rollback limits

| Asset/evidence | Preserved location outside deletion scope | Hash / commit / verification | Restoration capability and limits |
| --- | --- | --- | --- |
| `<code/reports/receipts>` | `<surviving location>` | `<proof>` | `<proven/untested/unavailable>` |

Preserve work before deleting its only checkout. Source exports may support
recreation but do not prove tenant rollback, original IDs or relationships can be
restored. Stop if required recoverability is unavailable. Record baseline stashes,
unrelated files and configuration without exposing contents or secrets.

## 5. Local worktree and ref proof

- Exact physical worktree path and approved boundary: `<paths>`.
- Registration, actual Git administrative directory and branch: `<observed values>`.
- Expected tip and containment in preservation/base ref: `<proof>`.
- Dirty/untracked state and preservation disposition: `<receipt>`.
- Junction/symlink confinement and process/handle state: `<evidence>`.
- Local branch deletion condition: `<integration verified; non-force only>`.
- Remote/ref expected tip and authority, if included: `<otherwise excluded>`.

Do not remove the surviving base, an unintegrated branch or unpreserved changes.
For residual cleanup, use only captured actual paths with revalidated ownership.
Do not use reset, clean, force removal, global prune or wildcard deletion.

## 6. Execution phases and exits

| Phase | Action | Exit evidence | Failure behavior |
| --- | --- | --- | --- |
| P0 | Identity, current-task Startup, inventory and preservation | Exact scope, authority, dependency and preservation receipts | Inventory only while unresolved |
| P1 | Approved remote consumers | Current identity/version, deletion and independent absence | Pause affected chain on drift/uncertainty |
| P2 | Approved unused providers | Complete zero-consumer proof and independent absence, or approved retention | Retain unknown/shared dependencies |
| P3 | Approved worktree and refs | Clean preserved state, integration, path/registration/ref proof | No force; preserve and record blocker |
| P4 | Reconciliation and Closeout | Every approved disposition verified; protected state preserved | Partial/blocked when required work remains |

Refresh versions immediately before mutation. Record exact action, start/end UTC,
result and readback per target. Check supported CLI/UI capabilities at execution
time. No deletion command is embedded as an unattended bulk script.

## 7. Rerun and uncertainty handling

| Observed state | Required next step |
| --- | --- |
| Exact target already absent | Verify absence and skip mutation; inspect remaining targets independently |
| Deletion result lost/timed out | Read exact current state before deciding another action |
| Inventory incomplete or consumer unknown | Retain provider; resolve or obtain explicit retention disposition |
| Version, code, lifecycle or branch tip drift | Stop affected action and reconcile scope/authority |
| Worktree unregistered but residual files remain | Revalidate actual captured paths, preserved state and confinement before bounded cleanup |
| Permission/authentication error | Restore supported access; never count error as not-found |
| Dirty/unintegrated local branch | Preserve; do not force-delete |

## 8. Completion and delivery

Report server and local status separately. Completion means all approved
dispositions are satisfied, not that every inventoried object was deleted.
Record exact deleted, retained, already-absent and blocked targets. Verify protected
state through cleanup, then separately record the intentional receipt commit's new
HEAD. Retained remote refs are unchanged; authorized remote deletions are exceptions
listed explicitly. Never claim unchanged base HEAD after committing new records.

Evidence directory outside deletion scope: `<path>`.
Timing, learning register, session Closeout and handoff: `<paths>`.
Remaining limitations and next action: `<none or specific boundaries>`.
