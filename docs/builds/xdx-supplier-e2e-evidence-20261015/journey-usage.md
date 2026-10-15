# Concrete supplier journey

`scripts/xdx_supplier_e2e_journey.mjs` exports `runSupplierJourney` and its 21-step declarative `supplierJourneyPlan`. It drives the already bound supported CUA Studio preview; it does not open another browser or invoke a standalone browser driver. The new manifest explicitly accounts for the connected Assignment blocked by the missing connected Site (`ASN-CON` immediately after `SITE-CON`), reusing that original dependency capture without a request or write. The retained adaptive run has 21 result rows comprising 20 business rows and one separate harness-failure row; those historical IDs/counts are not rewritten to match the reusable manifest.

```javascript
const {runSupplierJourney, settleSupplierPreview} = await import(
  'file:///C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1/scripts/xdx_supplier_e2e_journey.mjs'
);
await runSupplierJourney({
  tab, repoRoot: 'C:/Users/dasu/Documents/GitHub/fusion-ai-studio-1',
  runDir: 'docs/builds/<new-approved-run>',
  target: verifiedTarget, token: '<stable-unique-token>',
  sourceSupplier: verifiedSourceSupplier,
  fallbackSite: verifiedFallbackSite,
  preAction: actualGovernanceAndAuthorityGate,
  settle: settleSupplierPreview,
  // Optional: inspect: additionalRawTraceEvidenceInspector,
  onFailure: captureFailureAndApplyScopedPrevention,
  hostFinalize: generatePresentationUsingHostContext
});
```

The source supplier must supply independently observed displayed `number`, `name`, and `classifications` containing exactly the reviewed SupplierType, BusinessRelationship and TaxOrganizationType. Its internal `id` is optional when the ordinary UI does not expose it; supply it only from retained current verified mapping. Resolve these from the current target; historical Dell/1255 is not a reusable default. The fallback Site must supply its current same-parent `id` and reviewed four-field `payload` (SupplierSite, numeric ProcurementBUId, SupplierAddressName, literal purchasing flag). The script replaces only the new Site name. Preserve a verified source address and assignment-pair record with those inputs.

`fallbackSite.assignments` is mandatory for Site Confirm and contains the exact independently observed source pairs `{ClientBUId,BillToBUId}`. An empty array is valid only when the verified source has no assignments. The script compares all visible reviewed pairs and the total write count before freezing `{site,assignments}` as the transaction reservation. Proposed Site field parsing stops before the Parent supplier and Source site blocks, so a source Site name cannot substitute for a missing proposed new name.

`preAction` receives `{id,prompt,stage,target,reservation,session}` before each UI request and must run the real scoped gate and authority checks, returning true only when permitted. On Confirm it receives the frozen request ID, revision and exact payload before the runner durably reserves the write. `onFailure` must persist failures and verified prevention at their existing owner before affected work continues; unrelated scenarios may continue where their scoped gates permit. These callbacks are mandatory governance integration, not application mocks.

The built-in `observeNativeSupplierCapture` reads actual native response fields, generated IDs, independently-verified status, parent identity, empty collections and populated Site rows/continuation. No custom business observer is required for the captured native shapes. It labels this boundary `native-ui-rendered-verification` and never claims raw BO input/output metadata proof. An optional `inspect` extension receives `{capture,session}` for additional retained raw-trace evidence. Return only observations grounded in that actual AX/screenshot or retained current native readback trace:

```javascript
{
  fields: { /* exact observed business-field values, never intended inputs */ },
  ids: {SupplierId, SupplierNumber, parentSupplierId, SupplierAddressId,
        SupplierContactId, SupplierSiteId},
  assertions: [{name,passed,evidence}],
  readbackVerified: true, readbackEvidence: '<actual retained evidence path>',
  relationshipVerified: true, relationshipEvidence: '<actual parent/readback binding evidence>',
  collectionVerified: true, itemCount: 1, collectionEvidence: '<actual collection evidence>',
  assignmentsVerified: true,
  assignments: [{AssignmentId,ClientBUId,BillToBUId}],
  assignmentEvidence: '<actual retained Site assignment verification trace>'
}
```

Omit unavailable fields instead of filling them from the plan. The built-in parser handles visible reviewed values and IDs; an extension may add separately observed metadata. The native independently-verified label is assessed together with actual IDs, parent and field equality; the label alone never establishes PASS. Empty Address, Contact and Site messages have separate contracts. A populated Site page requires actual unique Site IDs and the advertised continuation/terminal marker; this proves the displayed page, not complete backend cardinality. Unknown native shapes remain failures instead of fabricated acceptance.

Site creation is durably accepted with its ID while its test status remains pending because that completion screen omits BU/address/purpose values. The already-planned ordinary Site detail step supplies those actual fields, joins the same Site ID and reviewed parent, and resolves the original create assessment. It performs no extra request beyond the plan. Assignment verification reuses the original Site completion capture and its actual assignment IDs, BU pairs and verification labels; it never captures the later unrelated assignment-query screen as proof. A standalone assignment request that returns Site details is FAIL; an explicitly unsupported assignment request is BLOCKED.

Native child Review validates displayed supplier number and name. The accepted supplier's internal-ID mapping persists independently; the post/readback relationship assertion checks the current internal parent when that verified mapping is available. Ordinary detail screens are assessed only for fields they render; the richer create/readback receipt owns generated IDs and submitted flags. All built-in parsing is restricted to the response container, excluding echoed user messages and sibling startup widgets.

Each create captures preparation, exact Review and exact Confirm stages; every request captures input before submission and its full settled result. Parent/value mismatches prevent Confirm. Connected first-Site and ordinary standalone Assignment query gaps are recorded while fallback coverage continues. No direct Supplier/Site mode is invented where the current workflow supports templates only.

The supplied settle helper requires an observed processing state (textbox absent or a processing label present), followed by the returned textbox with no processing text. It does not accept the stale ready screen immediately after Enter. If processing completes too fast to observe, it fails conservatively; provide a source-backed completion predicate in a custom settle callback rather than resubmit an uncertain create.

Use `resume:true` only after reconciling the previous runner owner/lock and current target. Use the same token and original inputs. PASS steps are skipped. Accepted/uncertain writes are never resubmitted; their IDs persist even when assertions fail. An attempted failed step needs an explicit `retries[stepId]={reason,changedCondition}` entry before another execution. There is no numeric retry limit. A lost conversation requires separately observed state reconciliation; supplying record IDs alone does not restore pending request approval state.

The host finalizer always receives persisted results and generates the PPT through the existing deck generator in supported host context. Preserve raw screen/AX files, all failures and blocked rows, and distinguish completed test accounting from connected business acceptance. This worker qualified changed pure functions on retained actual screenshots/AX and did not execute the reusable module against the live UI. Root executed the current business journey adaptively through the same evidence runner; the final reusable orchestrator has not replayed those successful writes.

## Focused native parser qualification

```json
{
  "observedUtc": "2026-10-15T20:59:45.467Z",
  "result": "PASS",
  "checks": 9,
  "scope": "Pure parser actual AX fixtures plus wrong-parent and echoed-user-prompt negatives; no UI or tenant calls",
  "sourceSha256": "3727eacf11ffe6d92992923920e8499a5f1d45c5feae5ff80ae0c867d41ddc33",
  "fixtures": [
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/supplier-query-result-002.txt",
      "sha256": "8b387fde9ba8c8b9ad17874377ec13d62e5d1c7b8604b9501404e66a1918c53c"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/supplier-readback-details-002.txt",
      "sha256": "ccf142be21bc49828d0efa24c86c6dc08e3b5e7347945f8e9ec65b24b57a0520"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-query-result-002.txt",
      "sha256": "798cc546538e8fb30f4e4121f7a9b1b5463da42a240b41dcc8a91dc1138f7d80"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-direct-review-ready-004.txt",
      "sha256": "addb82ebc447bf01430e46246b1f6c31919564e13630dd53284b7966b0d05ea2"
    }
  ]
}
```

### Final Address post/detail parser qualification

```json
{
  "observedUtc": "2026-10-15T21:00:49.194Z",
  "result": "PASS",
  "checks": 12,
  "scope": "Final actual native response parser repair only; wrong-parent and echoed prompt negative, post identity/flag vs ordinary detail visibility separation",
  "sourceSha256": "788cbb08bea542bb93a606d0b9421aec5e837e0eb9c6286f8a6e8d6bccb092a2",
  "fixtures": [
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-direct-review-ready-004.txt",
      "sha256": "addb82ebc447bf01430e46246b1f6c31919564e13630dd53284b7966b0d05ea2"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-direct-created-readback-006.txt",
      "sha256": "557448732b2a68d9b78f6638b2965876ead80bec22c270fce49d582169089890"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-readback-details-002.txt",
      "sha256": "5e50739d1aa4f1f746ed412d666e5d4c201aefc591954a9368d58d3bc433d748"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-query-result-002.txt",
      "sha256": "798cc546538e8fb30f4e4121f7a9b1b5463da42a240b41dcc8a91dc1138f7d80"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/supplier-readback-details-002.txt",
      "sha256": "ccf142be21bc49828d0efa24c86c6dc08e3b5e7347945f8e9ec65b24b57a0520"
    }
  ]
}
```

### Pinned Contact parser qualification (corrected fixture selection)

```json
{
  "observedUtc": "2026-10-15T21:04:33.879Z",
  "result": "PASS",
  "checks": 12,
  "fixturePreconditions": "Exact stage selection; one actual-parent mutation and one echoed-message replacement explicitly required",
  "scope": "Contact-specific empty/inline parent/direct-post/ordinary detail parser only; actual fixtures with wrong-parent plus echoed-user negative. No UI calls.",
  "sourceSha256": "075e205ed5abf71a05ebababcb5010741829bfc4793d51e7814265ab5e1e6555",
  "fixtures": [
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/contact-query-result-002.txt",
      "sha256": "a6fa19327a232e0e8e238481063fdbcdceb7304ff2e711e9f110cc0569b9d85b"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/contact-direct-draft-ready-002.txt",
      "sha256": "650403dc5455d7640f44b75cac2bac29b01c2395697b93b725d31c3f92c786b3"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/contact-direct-created-readback-006.txt",
      "sha256": "c9a44aca18a00e2f0e403c2dbc4598b8918595f30648c54e29f10a3eb86509f0"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/contact-readback-details-002.txt",
      "sha256": "19b556887000426bce6893d22a7b19ebd23be391586925fa01c376bb955b6f06"
    }
  ]
}
```

### Final Site and assignment parser qualification

```json
{
  "observedUtc": "2026-10-15T21:09:33.686Z",
  "result": "PASS",
  "checks": 9,
  "scope": "Final Site parser actual reviewed proposal vs source blocks; exact assignment pairs/count; accepted IDs/assignment verification; ordinary Site field normalization. No UI calls.",
  "sourceSha256": "26c67963030562fa27d38c7382e2b9c07036481bc4bf25dc3fc8e00b6b9d75b3",
  "fixtures": [
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-fallback-create-review-ready-004.txt",
      "sha256": "be4e7fa0f242c21aca7a5b1862bb23735004e823e48ff5a4bf4f00b350caad02"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-fallback-create-created-readback-006.txt",
      "sha256": "6e63585542d34e92e56ba16018e5c7bb746d828a866a6cdef7dfea8cd064cffd"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-fallback-readback-details-002.txt",
      "sha256": "333622e5ab7c4bceb1546f298acf60fd65a63db601dc2a2a5a0f8c3b0a4021b1"
    }
  ]
}
```

### Final business observer and Site reconciliation qualification

```json
{
  "observedUtc": "2026-10-15T21:14:22.789Z",
  "result": "PASS",
  "checks": 18,
  "scope": "Final built-in native observer and deferred Site reconciliation; no custom business callbacks; resource-specific empty/populated page, wrong-route classification, Site readback mismatch and original-assignment-evidence negatives; no UI/tenant calls",
  "sourceSha256": "041efc634a4ff9bd4c6f2aa15c56bd4e9943e02f2091581fa68b5e200cd09664",
  "fixtures": [
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/supplier-create-created-readback-007.txt",
      "sha256": "99833cf956f113b3b890d7ad22661df7a5dd8f5ffc321884fef006f99c41264d"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/address-direct-created-readback-006.txt",
      "sha256": "557448732b2a68d9b78f6638b2965876ead80bec22c270fce49d582169089890"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/contact-direct-created-readback-006.txt",
      "sha256": "c9a44aca18a00e2f0e403c2dbc4598b8918595f30648c54e29f10a3eb86509f0"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-query-result-002.txt",
      "sha256": "ab8553d5a84c5c873758b5c04b7c4cb365aadc20392a42d23b277a6e6a0df0a8"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-fallback-query-result-lower-section-003.txt",
      "sha256": "cdff0404184bf60aac2875f2eed1b39332ebb57c9631d3bb9363bb01f51b00e7"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-fallback-create-created-readback-006.txt",
      "sha256": "6e63585542d34e92e56ba16018e5c7bb746d828a866a6cdef7dfea8cd064cffd"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/site-fallback-readback-details-002.txt",
      "sha256": "333622e5ab7c4bceb1546f298acf60fd65a63db601dc2a2a5a0f8c3b0a4021b1"
    },
    {
      "path": "docs/builds/xdx-supplier-e2e-evidence-20261015/screens/assignment-query-result-002.txt",
      "sha256": "6457091d555180e7f248fa65b04748511ebcd8c097779c97048a028850ec5865"
    }
  ]
}
```
