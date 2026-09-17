# XDX Supplier Workspace — reusable build prompt

Use after reviewing the [proposed plan](xdx_supplier_workspace_plan.md). This prompt is a build instruction draft, not evidence that implementation, publication or live tests are approved.

```text
Build XDX Supplier Workspace, an Oracle Fusion AI Agent Studio web app, following the approved supplier-workspace plan. Accuracy comes before speed. Communicate tersely. Deliver these five outcomes:
1. Query suppliers and their addresses, sites and contacts.
2. Create a supplier alone, a supplier with selected children, or children for an existing supplier.
3. Verify persisted results using GET and display complete authorized data.
4. Download the full selected supplier dossier as a PDF.
5. Send a reviewed supplier SUMMARY IN THE EMAIL BODY ONLY. No attachments. PDF download is independent.

STARTUP AND INTAKE
Read docs/handoffs/ACTIVE_HANDOFF.md first, then the entire canonical playbook at docs/lessons/AI_STUDIO_AGENT_APP_LIVING_BUILD_PLAYBOOK.md, the object registry and all four supplier resource references. Follow the aistudio skill and current app-ingestion guidance. Record start time immediately; initialize the current session receipt, intake, learning register and time tracker. Pass the canonical Startup gate with the current session identity.

Confirm the proposed intake checkpoint before app artifacts: business outcome, users, source, first-load experience, query/create/export/email actions, side effects, launch context and acceptance evidence. Carry forward the confirmed summary-only email choice. Resolve material business gaps; discover technical IDs and capabilities yourself. Do not reinterpret a request for a plan as authorization to implement.

For the approved new build, follow agent-app-build-startup/AGENTS.md: committed current governance, branch codex/xdx-supplier-workspace, worktree .worktrees/xdx-supplier-workspace, fresh Codex run and build records under docs/builds/xdx-supplier-workspace/. Run both required verifiers. Complete requirement slices, architecture self-review and approved MVP golden-path manifest before artifact work. Preserve unrelated changes. Follow XDX artifact naming.

DESIGN AND CAPABILITY PROOF
Prefer one app-backed workflow with explicit routes and reuse src/businessObjects/xdx_supplier_information.bo (XDX_SUPPLIER_INFORMATION). Inspect its seven GET and four POST contracts; existing source-API evidence does not prove remote BO or app operation. Extend only for approved requirements. Initial children are addresses, sites and contacts; no updates/deletes, bulk import, bank details, site assignments or contact-user provisioning.

Use deterministic validation, pagination, write sequencing and persisted-field comparison. Use the model for intent and grounded summaries. Apply actual supported app lifecycle, template and communications contracts. Prove PDF generation/download and an approved email sender/channel early. Local PDF/email template configuration alone is not runtime proof; HCM email tool types alone do not prove procurement suitability. If native capability is insufficient, identify a concrete approved integration and its dependencies. Do not substitute a draft email for sending or silently drop either output requirement.

QUERY AND COMPLETE DATA
Start with search and Create Supplier, without catalog preload. Validate optional launch context. Resolve ambiguous suppliers through explicit user selection; child-only queries resolve their supplier first. Support documented identifiers and filters without interpolating raw prose into REST expressions. Resolve valid reference inputs through supported lookups.

Maintain one versioned structured dossier with supplier identity, all authorized scalar parent fields, all authorized fields and every page of selected child collections, counts, capture times, selected scope and errors. All details includes all three child types. Preserve nulls and distinguish zero records, omitted scope, restricted data and failed retrieval. Detect duplicate/non-advancing pages. Never label truncated or failed retrieval complete. Separate reads are not an atomic snapshot. Screen, PDF and email use the same reviewed data version; avoid repeatedly passing the entire dossier through a model.

CREATE AND VERIFY
Freeze the intended business-field inventory independently of the BO template. Preserve SupplierType and every approved field; do not silently drop inputs to make a tool call pass. Inspect retained local JSON/object samples first. Use live reads only when retained data is unusable and scope allows. Cross-reference the exact versioned Oracle schema and Example Request Body before constructing POST payloads; save provenance and documentation release.

Separate requiredness, uniqueness and generated own IDs from parent/foreign references. Use confirmed generated-ID evidence. If an ID appears in retained GET data but is omitted from the vendor POST example, test the hypothesis that Fusion derives it, within authorized scope. Omission alone is not proof. If the test succeeds, record the evidence in the matching object reference; if it fails, revise the assumption and ask for help where necessary. Never clone source record IDs.

Show editable forms and the exact operation set for confirmation. Create parent first when needed, address before its dependent site and contacts under the resolved parent. Retain returned IDs and per-operation receipts. Compare the intended inventory against request, POST response and verification GET, including missing expected fields. Show persisted fields, defaults, generated IDs and operation outcomes.

Prevent duplicate submissions. For partial or uncertain outcomes, reconcile saved IDs/state before retrying only unresolved work. Never blindly repeat successful POSTs or claim transaction rollback. Present successful records alongside failed steps and retain the draft.

OUTPUTS AND ACCEPTANCE
PDF contains the full selected dossier, all rows/fields, nulls, counts and timestamps, with readable continued tables. Render and inspect every page, compare field/record parity and prove download. Label incomplete exports.

Email contains only a concise grounded summary, including supplier identity/type, relevant details, child counts or creation outcomes, capture time and incomplete scope. Let the user review recipients, subject and body before Send. Do not infer recipients from supplier contacts. Use an approved sender, prevent duplicate sends and retain the actual provider receipt. Distinguish accepted from delivered. Attach nothing.

Implement slices: capability/intake; query/dossier; create/GET confirmation; PDF; summary email; integrated acceptance. Test ambiguity, empty and multi-page results, field coverage, relationship integrity, partial/uncertain writes, PDF completeness, send cancellation and duplicate prevention. Follow current ATLAS synchronization and validate the real app UI. Use XDX-prefixed unique test names and controlled email recipients only within established live-test authorization; do not infer blanket write/send/publication/push authority from this prompt.

Save scoped local evidence and exact links. Track elapsed time, tokens and AI Units where available; label gaps/unavailability honestly. At hand-forward, review learnings, update the canonical owner or matching object references only where evidence warrants, and record when no reusable change is needed. Update the single active handoff, timing and current Closeout receipt; run required verification and commit only scoped deliverables. Do not claim the app complete until all five outcomes have actual acceptance evidence. Report blockers and remaining approval boundaries precisely.
```
