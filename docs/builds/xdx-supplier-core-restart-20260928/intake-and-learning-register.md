# Supplier Core restart intake

Task/session: xdx-supplier-core-restart-20260928. Reviewed 2026-09-28T14:52:22.972Z. Object lifecycle model1.2.0. Corrected baseline b91f6f4; canonical playbook is lifecycle owner. Scope and authority: goal-prompt.txt and approvals.json. Failure status owner: failure-ledger.json.

Business: procurement supplier administrator using Oracle Fusion eqih-dev21 as CASEY.BROWN. Fresh XDX Supplier Core native web app. InitDisplay shows bounded live supplier list, number/name/relationship and paging; Query handles ordinary searches/details plus reviewed creates. One primary panel; no launch context required. No outbound communications or unrequested action integrations. Required creates are conversation commands with exact payload/revision approval. No optional business subobjects, legal/tax IDs, accounts, updates or deletes.

Data inventory (26C / API11.13.18.05):
- docs/lessons/objects/oracle-fusion-procurement-suppliers.md
- docs/lessons/objects/oracle-fusion-procurement-supplier-addresses.md
- docs/lessons/objects/oracle-fusion-procurement-supplier-sites.md
- docs/lessons/objects/oracle-fusion-procurement-supplier-contacts.md
- docs/lessons/objects/oracle-fusion-procurement-procurement-business-units-lov.md
Suppliers are parent; addresses/sites/contacts require resolved SupplierId; sites additionally require same-parent address and current numeric ProcurementBUId. Never use SupplierNumber as REST key. Preserve native paging and service errors. All q/find/list/lookup consumers require explicit REST-Framework-Version4 and resource-specific known-hit proof. Revalidate saved functions against current target before integration; old success is not new BO proof.

Retained samples: canonical first-success samples and preserved A1511 POST/GET are usable for contract preparation; no documentation-only refresh. New address/contact values must be controlled test values; exact child payloads, current reference lookups and documentation crosschecks are prerequisites to their writes. Supplier body: Supplier, BusinessRelationship, TaxOrganizationType only. Address: eight approved fields including ordering=true. Site: four fields including dynamic numeric BU and purchasing=true. Contact: FirstName, LastName, controlled Email; no account fields. Exact payload files are prepared per slice, not invented here.

Prevention: inherit tested shared query gate, safe JSON parser, measured runner, ATLAS observed-route correction and learning source-drift separation. Historical failure closure stays immutable; fresh applicable source proof is required before execution. Qualifier:167-file installed regression passed in recovery. New ledger starts empty; do not import45historical mutable obligations. Every failure goes into ledger before retry with cause, correction, sibling audit, focused proof and owner. Stop repeated process churn at the shared cause.

Architecture and acceptance: plan.md, requirement-slice-register.md and golden-path-test-manifest.md. Evidence status solely evidence-manifest.json. Schema/local checks never substitute for saved BO/native proof. A direct supplier write is already consumed; validate rebuilt read surface and retained exact POST contract without replay. No claim of fresh direct POST for rebuilt BO. Preserve that provenance limitation.

Timing: time-tracker.md; commands.jsonl registered before use. Context telemetry/reset/reminder scheduling unavailable; checkpoint every slice and before external mutations, manually observe same Studio tab at most5minutes and safe activity at4minutes while testing pending. No current artifact exists in replacement yet.
