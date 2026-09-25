# P4 site contract and implementation design

Scope: ordinary parent-scoped site list/detail and one exact-approved create. Four payload fields only: SupplierSite, ProcurementBUId, SupplierAddressName, SitePurposePurchasingFlag. No site assignments or payment configuration.

The existing deterministic address transaction design will be adapted with siteState ownership, separate read selection and transaction state. Native exact request/revision controls, approval invalidation, pending-before-POST, duplicate withholding, and read-only uncertainty reconciliation remain mandatory.

Before draft review and again before write, verify the selected supplier, resolve exactly one address by exact name under that supplier, require ordering-purpose true, and validate the explicit BU against the current read-only LOV. Bind approval to supplier, all four payload fields, resolved address ID and BU name. A changed or unavailable reference invalidates approval and withholds write. BU visibility is lookup evidence, not independent write authority; the existing authorized build/test scope governs creation. No hidden historical BU default.

Use the accepted supplier300000333814409 and address300000333814416 / XDX Core Address 20260924 for the native fixture chain. A current GET must confirm references before use. SupplierSiteId is generated and omitted. Verify all four submitted fields plus the expected resolved SupplierAddressId via a separate same-parent GET after one POST.

Site duplicate-name scope remains unresolved by canonical documentation, including whether BU participates. Conservatively withhold any same-parent exact-name match; use a distinctive name, do not probe with duplicate POSTs or claim global uniqueness. Lookup duplicate action rows may collapse to one BU only if all names match. Incomplete or ambiguous lookup results cannot authorize a write.

Sources: canonical supplier-sites and procurement-business-units-lov references (26C). Current official [BU GET](https://docs.oracle.com/en/cloud/saas/procurement/26c/fapra/op-procurementbusinessunitslov-get.html) confirms ProcurementBU/ProcurementBUId/AgentAction filters, envelope paging and GET-only operation. Retained site-documentation.json owns reviewed requiredness and field limits. No new architecture or scope expansion.

Acceptance: actual-CODE reference/approval/body/uncertainty tests; native ordinary reads separately from the one complete prepare/edit/review/approve/create/GET transaction; affected configured tests and semantic judges. P4 implementation follows P3 configured acceptance.

Implementation dependency decision: supplier-scoped operation metadata cannot resolve getall_procurementBusinessUnitsLOV (read-only dry-run returned Operation not found). Current preserved XDX_SUPPLIER_PROCUREMENT_BUSINESS_UNITS was inspected and exposes the needed GET with limit/offset. Reuse it unchanged instead of retargeting the core BO metadata or creating another artifact. Lookup requests one bounded page500; only a complete, internally consistent envelope may authorize selection. An incomplete envelope withholds site approval/write. Current reference visibility does not grant additional authority. Evidence: evidence/xdx_p4_existing_bu_functions.json.
