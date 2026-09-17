# XDX Supplier Information - intake and learning register

## Approved scope

User approved the three-function design and required intermediate build steps on 2026-09-16. This is a standalone Business Object, not a new agentic app; the new-app worktree and app/ATLAS gates do not apply. Work on the existing `TestingWFBuildTools` branch and preserve unrelated changes to `env.properties`, the supplied ZIP, and the workspace file.

- Artifact: `src/businessObjects/xdx_supplier_information.bo`, code `XDX_SUPPLIER_INFORMATION`, display name `XDX Supplier Information`.
- Source: Fusion Suppliers REST collection `/fscmRestApi/resources/11.13.18.05/suppliers`, ADF BC, family PRC, product SUPPLIER (confirmed by live BO catalog).
- Outcome: list suppliers, find by complete name, or find by contained name text.
- Approved functions: `ListSuppliers`, `FindSupplierByFullName`, `FindSuppliersByPartialName`; GET only, native Fusion authentication.
- Return supplier ID, number, name, type and business relationship, plus the native collection paging envelope. Preserve all matches rather than choosing an arbitrary supplier.
- Pagination: explicit limit and offset, default page size 25, deterministic ordering; callers continue only while `hasMore` is true.
- Empty results: an empty collection is valid. A failed request must remain an error, not an empty result.
- Search boundaries: document API matching and escaping semantics; no fuzzy-name claims. Confirm name filters from the API contract before finalizing.
- Authority: local creation and validation, authenticated metadata reads and required read-only build verification. No remote BO save, publication, supplier writes, or Git push.
- Environment: eqih-dev21; CLI identity CASEY.BROWN established in this session. No credentials belong in build records.
- Runtime examples: do not invent supplier names or supplier payloads. Required sample inputs must come from explicit user input or authorized discovery.

## Acceptance and verification plan

| Requirement | Owner / check |
| --- | --- |
| SUP-01 list | ListSuppliers GET collection; paging inputs and output envelope |
| SUP-02 full name | FindSupplierByFullName equality filter; no arbitrary first-row selection |
| SUP-03 partial name | FindSuppliersByPartialName contains filter; documented literal escaping |
| SUP-04 safe contract | Three GET-only functions, exact XDX identity, native auth, bounded projected fields |
| SUP-05 valid delivery | Bundled validate-bo, focused source contract checks, governance verifier, current handoff and time record |

No workflow, tool, app, model, replay suite, or semantic judge is introduced. No model optimization applies. The CLI owns BO serialization; use its mutation commands and inspect the resulting file. Target no unnecessary model calls or repeat live queries. Accuracy precedes speed.

## Lessons and dependency decisions

| Observation | Evidence / correction | Playbook action |
| --- | --- | --- |
| Read handoff and canonical playbook before artifact work; verifier passes | Session preflight; maintain one current handoff | Enforce existing rules |
| AI-assisted BO search returned HTTP 404 | Direct `list-supported-business-objects` succeeds; source metadata obtained without speculative API calls | App-specific environment limitation; no universal change yet |
| CLI authentication messages precede JSON on stdout | Parse the JSON envelope after the first standalone opening brace | Retain only metadata summaries, not credential logs |

Retain the canonical CLI, existing skill references, public Suppliers API documentation, this BO and its focused validation evidence. Installed seed stays an immutable delivery snapshot. No new library or service is needed. Remove task-only scratch once evidence no longer depends on it.

## Sources

- https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-suppliers-get.html
- `.agents/skills/aistudio/references/prompts/business-object-builder.md`
- `.agents/skills/aistudio/references/prompts/business-object-cli-compat.md`
- `docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md`

## Checkpoint

Metadata discovery complete. Author the local BO through the CLI, then validate and reconcile evidence. Build remains in progress.

## Closeout review

- Artifact created through `do-create-bo`, `do-create-bo-function-from-operation` and documented BO mutation commands; all three functions retain the GET collection operation and native authentication.
- Three source-API sample reads succeeded. List returned one row with hasMore true; exact `Lee Supplies` and partial `Lee` each returned the same supplier, count 1, hasMore false.
- `validate-bo` reports ok true, errorCount 0. Focused local source/response contract passes.
- The example selector is one-based: exampleIndex 1 targets the first example; exampleDescription selects an existing example, while description sets the new text. Two selector errors occurred before any request; corrected through returned CLI errors without modifying framework code.
- Captured example query is an object after CLI normalization. A local assertion initially assumed a serialized string; corrected without repeating the successful list request.
- Query version 4 is pinned. Apostrophe quoting, LIKE wildcard semantics and caller-enforced input bounds are documented. No claim of exhaustive live special-character, case-collation, or multi-page coverage.
- No new runtime dependency, obsolete source path, or remote state was introduced. Keep the CLI and seed unchanged; only task-owned temporary JSON arguments require cleanup.
- Evidence review produced no reusable playbook change: existing source-evidence, no-fabricated-example, focused-repair and lifecycle-boundary rules cover the observations. CLI-specific details stay in this build record.
- Local implementation and scoped checks are complete; final governance/diff checks and scoped commit are recorded in verification.md. No remote deployment claimed.

## Requested ListSuppliers live retest
User explicitly requested a fresh live ListSuppliers test and visible results. Scope: one default page (limit 25, offset 0), GET only, verify returned count, unique IDs and paging fields. Use a temporary BO copy to preserve the delivery artifact. Save the returned page and measured elapsed time; no remote BO save or supplier mutation. Existing playbook source-evidence and focused-test rules apply.
