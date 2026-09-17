# API learning review — 2026-09-17

Evidence register only. Reusable guidance is owned by [the canonical playbook](../../lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md), Gate 2 API subsections. The user explicitly requested recording lessons for all API domains and future sessions.

## Intake

Documentation and memory hand-forward only. Baseline: fusion-ai-studio-1, TestingWFBuildTools, HEAD 3c1f444. No runtime, credential, configuration, installed-packet or remote-state changes. Preserve unrelated ZIP, env.properties and workspace changes. Architecture review is unnecessary for this documentation-only consolidation. Full canonical review and living-build preflight passed.

## Evidence and decisions

| Observation / evidence | Reusable lesson or scoped interpretation |
| --- | --- |
| Commit 3c1f444: seven-function BO validates, original three functions unchanged | Extend coherent ownership boundaries; distinguish summaries, detail and child collections |
| [Verification](verification.md), [13 core cases](live-details/summary.json), [three text filters](live-details/text-filter-summary.json) | Assert identity, parent scope, stable IDs, business filters, paging and empty results, not just HTTP success |
| [List page](live-list-suppliers.json) has 25 rows with continuation; child baselines are terminal | Page size is not dataset completeness; child collections paginate independently |
| Summary functions project six fields; detail has no projection or child expansion | Full scalar profile is not proof of every nested resource; preserve existing projection contracts |
| Declarative query templates and descriptions do not enforce validation | Caller owns escaping and input bounds; disclose untested special-character and case behavior |
| Discovery search returned HTTP 404 while supported catalog/spec commands worked | Verify the exact operation; do not guess endpoints from names or error responses |
| CLI auth diagnostics precede JSON; validator has outer ok and nested result.ok/errorCount | Parse the actual envelope and inspect nested validity; keep auth logs out of evidence |
| This CLI uses one-based exampleIndex; exampleDescription selects, description sets; sampleQueries[0].query becomes an object | Version-specific observations to recheck through current help/readback, not universal API rules |
| Sample capture modifies the BO; additional cases used temporary copies | Preserve delivery examples, retain evidence, then remove task-owned scratch |
| Operation-generated suppliers_Id differs from business SupplierId vocabulary | Preserve canonical parameter names and provide live-resolved parent keys without defaults |
| [BO guide](../../../.agents/skills/aistudio/references/prompts/business-object-builder.md) supports POST/PUT/PATCH request examples | Request example authoring is separate from write execution and deployment |
| User requested agent-generated JSON plus comparison with vendor Example Request Body | Adopt schema + writable GET values + valid reference IDs + unique test keys; compare example, preview effects, execute within existing authority, verify by readback, retain evidence |
| GET profiles include audit/generated fields absent from create requests | Do not clone an entire GET or replace every ID; classify generated IDs versus existing references |
| web.run rejected the public page with “URL … is not safe to open (non-retryable error)”; Chrome displayed it | Hosted-tool cause unresolved; the message is not evidence that the page is unsafe |
| Local Invoke-WebRequest failed with inner “No credentials are available in the security package”; curl reported Schannel SEC_E_NO_CREDENTIALS | Separate local sandbox TLS/security-context failure from hosted web-tool rejection |
| Scoped approved requests outside sandbox returned HTTP 200 with normal certificate validation | Verified browser-free route; no TLS bypass, credential requirement, plugin installation or repair of web.run |
| Supplier page contained 185 parseable JSON blocks; first was a schema; request heading was a styled p | Select semantic request-example section, HTML-decode and parse its code block; do not assume h3 or first JSON block |
| No explicit web_search setting found in inspected local config | Effective runtime mode and relation to failure remain unproven; do not change config on speculation |
| Startup/handoff/playbook/time/scoped-commit rules already apply | Retain one lifecycle owner and promote committed governance to future worktrees; installed seed stays a snapshot |

## Browser-free retrieval receipts

Session checks on 2026-09-17 returned HTTP 200 and valid Example Request Body JSON for each public Oracle 26C URL below. Requests used bounded timeouts, no application credentials and normal certificate validation. An initial extractor assumed heading tags and failed; correcting it for the observed styled paragraph resolved extraction.

| Operation page | Parsed request example |
| --- | --- |
| [Supplier create](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-post.html) | 8 top-level fields |
| [Address create](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-addresses-post.html) | 9 top-level fields |
| [Site create](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-sites-post.html) | Extensive optional-field example |
| [Contact create](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-supplierid-child-contacts-post.html) | 7 top-level fields |

The supplier example omits SupplierId, SupplierNumber and SupplierPartyId while the rendered request schema marks some omitted fields required. Reconcile this discrepancy with descriptions, current metadata and tenant numbering behavior before a write; do not invent IDs or follow examples blindly. Documentation examples were parsed, not executed.

## Closeout boundary

Earlier build receipts saying “no reusable playbook change” describe their then-current closeout. This later review supersedes that conclusion with cross-domain learning promotion, retrieval evidence and the write-test design. POST execution remains untested; no POST function, remote save, publication or push is part of this review. Browser-free access was demonstrated for these pages, not guaranteed for every site.

Retain existing CLI, skill references and live evidence; no new dependency or parallel playbook. Memory receives a short cross-domain pointer with no tenant data or credentials. Existing runtime QA is reused for this documentation-only change. Tokens/AI Units are unavailable, not estimated.

Verification: living-build and startup-package verifiers PASS; changed-document local links and code fences PASS; scoped whitespace checks PASS. Reviewed new main-path rules for cross-domain scope and kept operation-specific evidence here. No runtime tests rerun. Canonical playbook remains the single lifecycle owner; skill and installed seed were not duplicated or edited.
