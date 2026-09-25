# Supplier-number404 repair native verification

Observed by 2026-09-25T02:56:18.077Z; Chrome tab676647338, CASEY.BROWN, app XDX_SUPPLIER_CORE_APP_20260924 DRAFT preview bound to workflow XDX_SUPPLIER_CORE_20260924 DRAFT86237214 ETag18.

Original reported workflow debugger showed FETCH_ADDRESS_PARENT404. Actual serialized pre-fix CODE reproduced SupplierId1506 for both manual prompts despite verified selected ID300000333814409; see xdx_number404_before.json. An initial post-save standalone debugger search returned null without an app stage; this was not accepted as app proof. Navigated from the approved redwoodAI root through Applications, exact app, Run app preview.

Same-conversation live read-only sequence, waiting for Done and rendered output:
1. Find supplier XDX Core Supplier 20260924 2130 — PASS; one row ID300000333814409, number1506, Spend Authorized; count1 offset0 hasMorefalse.
2. Show details for supplier 1506 — PASS; rendered Supplier detail with all10 projected columns, same ID/number/name, ACTIVE, Corporation, honest Not specified nulls.
3. Show addresses for supplier 1506 — PASS; rendered Supplier addresses, parent XDX Core Supplier 20260924 2130 (300000333814409), one row300000333814416 / XDX Core Address 20260924, US,5000 CARTER DR.,LOS ANGELES,CA,90032,xdx-core-address-20260924@example.invalid,orderingtrue,party1486638,ACTIVE,inactive4712-12-31; count1 offset0 hasMorefalse.

No POST, publication or push. Steps4-6 remain user-unreported; local CODE contracts cover the same corrected number resolution for sites and contacts.

Supported boundary: numbers resolve from verified supplier query rows in the same conversation. Unknown or ambiguous numbers are withheld with query-first guidance; they are never substituted as REST keys. Explicit Supplier ID remains supported. No standalone number collection lookup was added.
