# Address fixed ordering repair proof

Native owner reported POST sample preflight error before HTTP: Sample response fetch for POST functions requires bodyTemplate to be valid JSON. No address accepted. Prior rendered-body checks missed the unrendered native parser boundary.

Repair scoped to approved purchasing-address contract: literal boolean AddressPurposeOrderingFlag:true in body, no dynamic flag parameter. Exact eight business fields preserved; seven strings still escaped once. False ordering is unsupported and must be rejected by workflow before review/approval. No toolkit change, no string coercion, no omitted field, no live retry by BO owner.

Scratch: bo-address-fixed-ordering.bo SHA256 abafad120f5922db328e1c9566290395ab243a5cfc9d02247e956692c0d528da.
Patch: bo-address-fixed-ordering-patch.json.
Source BO untouched pending coordinator native save and canonical fetch.

Checks:
- node tests/xdx-supplier-core-20260925-bo.cjs docs/builds/xdx-supplier-core-20260925/bo-address-fixed-ordering.bo : PASS5 template cases, JSON.parse unrendered body, ordering===true, no flag token, exact8 fields, original supplier definitions/samples preserved.
- node .agents/skills/aistudio/scripts/aistudio.js validate-bo --file docs/builds/xdx-supplier-core-20260925/bo-address-fixed-ordering.bo : result.ok=true, errorCount=0.

Coordinator owns native repair/save/samples/canonical source reconciliation. Earlier bo-address-local-receipt.md dynamic-boolean contract is superseded by this repair. Historical fixture payload remains identical, including boolean true; sample runtime-input JSON must remove the no-longer-dynamic flag key while retaining it in business payload approval.
