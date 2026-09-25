# P2 native supplier transaction evidence

Started 2026-09-24T21:30:59.2466154Z; target XDX_SUPPLIER_CORE_APP_20260924, native Run app preview, signed-in CASEY.BROWN, tab676647338. Current workflow DRAFT86218211 / ETag6.

Intended initial draft: Supplier XDX Core Supplier 20260924 2130 Draft; BusinessRelationship Spend Authorized; TaxOrganizationType Corporation. Relationship and organization values explicitly supplied from current verified Dell Inc. profile, not hidden defaults. Planned field-only name edit to XDX Core Supplier 20260924 2130. Other two required values must persist.

First prepare on v86218110 produced a partial draft missing Supplier and correctly withheld operation. No POST. Extractor prompt repaired to put explicit new supplier name in patch.Supplier. Corrected prepare is in flight. No review approval/create yet. No business record created.

Local tests PASS request identity/revision/exact payload gates, field-only merge, stale/cancel/duplicate/uncertain safeguards, rendered JSON body equality and independent GET match. Runtime state still requires native proof for this transaction; readState continuity is already proven separately.

2026-09-24T21:36:45.3473988Z: Corrected prepare confirmed request 5a0d49a2-9307-4ebb-b706-a09806fed1b0 revision1. Field-only edit preserved identity/other fields and advanced to revision2. Native review visibly shows Supplier=XDX Core Supplier 20260924 2130; BusinessRelationship=Spend Authorized; TaxOrganizationType=Corporation. Exact revision2 approval submitted; no create submitted yet.

2026-09-24T21:37:48.5889015Z: Exact approval revision2 visibly accepted. Deliberate stale create revision1 visibly withheld: Stale request or revision, no create authorized. Current reviewed payload remains revision2. Preparing single current-revision create; do not repeat if uncertain.

2026-09-24T21:38:10.2978855Z: Single exact create command revision2 submitted in native preview, response pending. Treat outcome uncertain until persisted verification; NEVER replay POST.

2026-09-24T21:38:52.0588960Z: SUCCESS native result and screenshot inspected. SupplierId=300000333814409; SupplierNumber=1506; Supplier=XDX Core Supplier 20260924 2130; BusinessRelationship=Spend Authorized; TaxOrganizationType=Corporation. Independent persisted GET matched every intended field; status verified. Exactly one current-revision create submitted. Accepted POST MUST NOT be replayed. Native representative supplier transaction complete; configured and affected read regression remain.

2026-09-24T22:00:23.3862244Z: Latest DRAFT guidance verified natively with harmless weather question. Visible card: Request not executed; supported supplier list/exact-name/next/detail guidance. The earlier native delete-negative prompt was rejected before submission, so no native deletion claim. Browser returned to builder unexpectedly during first harmless question; reopened same-tab preview, observed current startup and completed harmless check. Prior accepted supplier evidence retained; never replayed.
