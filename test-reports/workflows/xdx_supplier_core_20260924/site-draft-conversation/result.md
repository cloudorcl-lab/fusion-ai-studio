# Workflow Conversation Test Result: site-draft-conversation

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Goal:** Preserve supplier, BU, address and purpose across field-only edit and review; cancel without POST.
**Data Source:** File replay
**Evaluation:** Hybrid
**Steps:** 4

## Conversation Journey

| # | Step | Type | Intent | Interaction | Outcome | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | prepare-site-draft | chat | Prepare site for Supplier ID 300000333814409: SupplierSite XDX Replay Site; ProcurementBUId 300000046987012; SupplierAddressName XDX Core Address 20260924; SitePurposePurchasingFlag true. | Prepare site for Supplier ID 300000333814409: SupplierSite XDX Replay Site; ProcurementBUId 300000046987012; SupplierAddressName XDX Core Address 20260924; SitePurposePurchasingFlag true. | <oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Site references verified. Draft only; enter review site. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay> | passed |
| 2 | edit-site-name | chat | Change SupplierSite to XDX Replay Site Revised. | Change SupplierSite to XDX Replay Site Revised. | <oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Required fields supplied. Draft only; no POST. Enter review site. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site Revised"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay> | passed |
| 3 | review-site-payload | chat | review site | review site | <oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Review all four submitted fields, supplier, resolved address and BU. To approve this snapshot, enter: approve site 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17 revision 2. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site Revised"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay> | passed |
| 4 | cancel-site-draft | chat | cancel site | cancel site | <oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Draft cancelled. No create authorized. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site Revised"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay> | passed |

## Step 1: prepare-site-draft

**Status:** passed
**Type:** chat
**Intent:** Prepare site for Supplier ID 300000333814409: SupplierSite XDX Replay Site; ProcurementBUId 300000046987012; SupplierAddressName XDX Core Address 20260924; SitePurposePurchasingFlag true.
**Context Step IDs:** None (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Prepare site for Supplier ID 300000333814409: SupplierSite XDX Replay Site; ProcurementBUId 300000046987012; SupplierAddressName XDX Core Address 20260924; SitePurposePurchasingFlag true.",
  "triggerType": "app",
  "parameters": {
    "appHint": "Query",
    "OraAppContext": "",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Site references verified. Draft only; enter review site. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay>
~~~

## Step 2: edit-site-name

**Status:** passed
**Type:** chat
**Intent:** Change SupplierSite to XDX Replay Site Revised.
**Context Step IDs:** prepare-site-draft (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Change SupplierSite to XDX Replay Site Revised.",
  "triggerType": "app",
  "parameters": {
    "appHint": "Query",
    "OraAppContext": "",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Required fields supplied. Draft only; no POST. Enter review site. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site Revised"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay>
~~~

## Step 3: review-site-payload

**Status:** passed
**Type:** chat
**Intent:** review site
**Context Step IDs:** prepare-site-draft, edit-site-name (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "review site",
  "triggerType": "app",
  "parameters": {
    "appHint": "Query",
    "OraAppContext": "",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Review all four submitted fields, supplier, resolved address and BU. To approve this snapshot, enter: approve site 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17 revision 2. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site Revised"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay>
~~~

## Step 4: cancel-site-draft

**Status:** passed
**Type:** chat
**Intent:** cancel site
**Context Step IDs:** prepare-site-draft, review-site-payload (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "cancel site",
  "triggerType": "app",
  "parameters": {
    "appHint": "Query",
    "OraAppContext": "",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Site draft","description":"Draft cancelled. No create authorized. Request 8a4fe53e-77cc-402e-b9f3-ad3cb3fc2a17, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["SupplierSite","XDX Replay Site Revised"]},{"cells":["ProcurementBUId","300000046987012"]},{"cells":["SupplierAddressName","XDX Core Address 20260924"]},{"cells":["SitePurposePurchasingFlag","true"]},{"cells":["Resolved SupplierAddressId","300000333814416"]},{"cells":["Procurement BU","US1 Business Unit"]}]}}</oraInfoDisplay>
~~~

## Verification Summary

| Verification | Status | Result |
| --- | --- | --- |
| Node order and counts | PASSED | 8/8 passed |
| Path assertions | PASSED | 452/452 passed |
| Semantic evaluation | PASSED | 6/6 passed |
| Workflow run checks | PASSED | 6/6 passed |
| Output checks | PASSED | 8/8 passed |

## Node Order and Count

### Required Relative Order

Other nodes may execute between the listed nodes.

| Step | Status | Assertion | Required Relative Order | Observed or Failure |
| --- | --- | --- | --- | --- |
| prepare-site-draft | PASS | Draft guards precede display | PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_ENTRY -> FETCH_SITE_PARENT -> CHECK_SITE_PARENT -> STORE_SITE_PARENT -> SITE_OPERATION -> SITE_REFERENCE_INPUT -> FETCH_SITE_ADDRESS_REFERENCE -> FETCH_SITE_BU_REFERENCE -> CHECK_SITE_REFERENCES -> STORE_SITE_REFERENCES -> SITE_REFERENCES_ROUTE -> SITE_DISPLAY |
| edit-site-name | PASS | Draft guards precede display | PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_ENTRY -> SITE_DISPLAY |
| review-site-payload | PASS | Draft guards precede display | PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_ENTRY -> FETCH_SITE_PARENT -> CHECK_SITE_PARENT -> STORE_SITE_PARENT -> SITE_OPERATION -> SITE_REFERENCE_INPUT -> FETCH_SITE_ADDRESS_REFERENCE -> FETCH_SITE_BU_REFERENCE -> CHECK_SITE_REFERENCES -> STORE_SITE_REFERENCES -> SITE_REFERENCES_ROUTE -> SITE_DISPLAY |
| cancel-site-draft | PASS | Draft guards precede display | PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_SITE -> STORE_SITE_PREPARED -> SITE_ENTRY -> SITE_DISPLAY |

### Node Count Checks

| Step | Assertion | Node Code | Expected | Observed | Status |
| --- | --- | --- | --- | --- | --- |
| prepare-site-draft | No site POST | CREATE_SITE | exactly 0 | 0 | PASS |
| edit-site-name | No site POST | CREATE_SITE | exactly 0 | 0 | PASS |
| review-site-payload | No site POST | CREATE_SITE | exactly 0 | 0 | PASS |
| cancel-site-draft | No site POST | CREATE_SITE | exactly 0 | 0 | PASS |

## Path Assertions

| Step | Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-site-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| prepare-site-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| prepare-site-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| prepare-site-draft | PASS | PREPARE_SITE executes | Must execute | PREPARE_SITE | Executed |
| prepare-site-draft | PASS | STORE_SITE_PREPARED executes | Must execute | STORE_SITE_PREPARED | Executed |
| prepare-site-draft | PASS | SITE_ENTRY executes | Must execute | SITE_ENTRY | Executed |
| prepare-site-draft | PASS | FETCH_SITE_PARENT executes | Must execute | FETCH_SITE_PARENT | Executed |
| prepare-site-draft | PASS | CHECK_SITE_PARENT executes | Must execute | CHECK_SITE_PARENT | Executed |
| prepare-site-draft | PASS | STORE_SITE_PARENT executes | Must execute | STORE_SITE_PARENT | Executed |
| prepare-site-draft | PASS | SITE_OPERATION executes | Must execute | SITE_OPERATION | Executed |
| prepare-site-draft | PASS | SITE_REFERENCE_INPUT executes | Must execute | SITE_REFERENCE_INPUT | Executed |
| prepare-site-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE executes | Must execute | FETCH_SITE_ADDRESS_REFERENCE | Executed |
| prepare-site-draft | PASS | FETCH_SITE_BU_REFERENCE executes | Must execute | FETCH_SITE_BU_REFERENCE | Executed |
| prepare-site-draft | PASS | CHECK_SITE_REFERENCES executes | Must execute | CHECK_SITE_REFERENCES | Executed |
| prepare-site-draft | PASS | STORE_SITE_REFERENCES executes | Must execute | STORE_SITE_REFERENCES | Executed |
| prepare-site-draft | PASS | SITE_REFERENCES_ROUTE executes | Must execute | SITE_REFERENCES_ROUTE | Executed |
| prepare-site-draft | PASS | SITE_DISPLAY executes | Must execute | SITE_DISPLAY | Executed |
| prepare-site-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| prepare-site-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| prepare-site-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| prepare-site-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| prepare-site-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| prepare-site-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| prepare-site-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| prepare-site-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| prepare-site-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| prepare-site-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| prepare-site-draft | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| prepare-site-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| prepare-site-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| prepare-site-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| prepare-site-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| prepare-site-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| prepare-site-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| prepare-site-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| prepare-site-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| prepare-site-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| prepare-site-draft | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| prepare-site-draft | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| prepare-site-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| prepare-site-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| prepare-site-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| prepare-site-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| prepare-site-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| prepare-site-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| prepare-site-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| prepare-site-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| prepare-site-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| prepare-site-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| prepare-site-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| prepare-site-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| prepare-site-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| prepare-site-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| prepare-site-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| prepare-site-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| prepare-site-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| prepare-site-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| prepare-site-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| prepare-site-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| prepare-site-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| prepare-site-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| prepare-site-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| prepare-site-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| prepare-site-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| prepare-site-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| prepare-site-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| prepare-site-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| prepare-site-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| prepare-site-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| prepare-site-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| prepare-site-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| prepare-site-draft | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| prepare-site-draft | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| prepare-site-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| prepare-site-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| prepare-site-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| prepare-site-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| prepare-site-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| prepare-site-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| prepare-site-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| prepare-site-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| prepare-site-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| prepare-site-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| prepare-site-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| prepare-site-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| prepare-site-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| prepare-site-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| prepare-site-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| prepare-site-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| prepare-site-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| prepare-site-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| prepare-site-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| prepare-site-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| prepare-site-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| prepare-site-draft | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| prepare-site-draft | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| edit-site-name | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| edit-site-name | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| edit-site-name | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| edit-site-name | PASS | PREPARE_SITE executes | Must execute | PREPARE_SITE | Executed |
| edit-site-name | PASS | STORE_SITE_PREPARED executes | Must execute | STORE_SITE_PREPARED | Executed |
| edit-site-name | PASS | SITE_ENTRY executes | Must execute | SITE_ENTRY | Executed |
| edit-site-name | PASS | SITE_DISPLAY executes | Must execute | SITE_DISPLAY | Executed |
| edit-site-name | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| edit-site-name | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| edit-site-name | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| edit-site-name | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| edit-site-name | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| edit-site-name | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| edit-site-name | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| edit-site-name | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| edit-site-name | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| edit-site-name | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| edit-site-name | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| edit-site-name | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| edit-site-name | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| edit-site-name | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| edit-site-name | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| edit-site-name | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| edit-site-name | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| edit-site-name | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| edit-site-name | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| edit-site-name | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| edit-site-name | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| edit-site-name | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| edit-site-name | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| edit-site-name | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| edit-site-name | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| edit-site-name | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| edit-site-name | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| edit-site-name | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| edit-site-name | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| edit-site-name | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| edit-site-name | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| edit-site-name | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| edit-site-name | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| edit-site-name | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| edit-site-name | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| edit-site-name | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| edit-site-name | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| edit-site-name | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| edit-site-name | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| edit-site-name | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| edit-site-name | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| edit-site-name | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| edit-site-name | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| edit-site-name | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| edit-site-name | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| edit-site-name | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| edit-site-name | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| edit-site-name | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| edit-site-name | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| edit-site-name | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| edit-site-name | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| edit-site-name | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| edit-site-name | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| edit-site-name | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| edit-site-name | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| edit-site-name | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| edit-site-name | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| edit-site-name | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| edit-site-name | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| edit-site-name | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| edit-site-name | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| edit-site-name | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| edit-site-name | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| edit-site-name | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| edit-site-name | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| edit-site-name | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| edit-site-name | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| edit-site-name | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| edit-site-name | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| edit-site-name | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| edit-site-name | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| edit-site-name | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| edit-site-name | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| edit-site-name | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| edit-site-name | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| edit-site-name | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| edit-site-name | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| edit-site-name | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| edit-site-name | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| edit-site-name | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| edit-site-name | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| edit-site-name | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| edit-site-name | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| edit-site-name | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| edit-site-name | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| edit-site-name | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| edit-site-name | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| edit-site-name | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| edit-site-name | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| edit-site-name | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| edit-site-name | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| edit-site-name | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| edit-site-name | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| edit-site-name | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| edit-site-name | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| edit-site-name | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| edit-site-name | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| edit-site-name | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| edit-site-name | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| edit-site-name | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| review-site-payload | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| review-site-payload | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| review-site-payload | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| review-site-payload | PASS | PREPARE_SITE executes | Must execute | PREPARE_SITE | Executed |
| review-site-payload | PASS | STORE_SITE_PREPARED executes | Must execute | STORE_SITE_PREPARED | Executed |
| review-site-payload | PASS | SITE_ENTRY executes | Must execute | SITE_ENTRY | Executed |
| review-site-payload | PASS | FETCH_SITE_PARENT executes | Must execute | FETCH_SITE_PARENT | Executed |
| review-site-payload | PASS | CHECK_SITE_PARENT executes | Must execute | CHECK_SITE_PARENT | Executed |
| review-site-payload | PASS | STORE_SITE_PARENT executes | Must execute | STORE_SITE_PARENT | Executed |
| review-site-payload | PASS | SITE_OPERATION executes | Must execute | SITE_OPERATION | Executed |
| review-site-payload | PASS | SITE_REFERENCE_INPUT executes | Must execute | SITE_REFERENCE_INPUT | Executed |
| review-site-payload | PASS | FETCH_SITE_ADDRESS_REFERENCE executes | Must execute | FETCH_SITE_ADDRESS_REFERENCE | Executed |
| review-site-payload | PASS | FETCH_SITE_BU_REFERENCE executes | Must execute | FETCH_SITE_BU_REFERENCE | Executed |
| review-site-payload | PASS | CHECK_SITE_REFERENCES executes | Must execute | CHECK_SITE_REFERENCES | Executed |
| review-site-payload | PASS | STORE_SITE_REFERENCES executes | Must execute | STORE_SITE_REFERENCES | Executed |
| review-site-payload | PASS | SITE_REFERENCES_ROUTE executes | Must execute | SITE_REFERENCES_ROUTE | Executed |
| review-site-payload | PASS | SITE_DISPLAY executes | Must execute | SITE_DISPLAY | Executed |
| review-site-payload | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| review-site-payload | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| review-site-payload | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| review-site-payload | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| review-site-payload | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| review-site-payload | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| review-site-payload | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| review-site-payload | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| review-site-payload | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| review-site-payload | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| review-site-payload | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| review-site-payload | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| review-site-payload | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| review-site-payload | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| review-site-payload | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| review-site-payload | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| review-site-payload | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| review-site-payload | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| review-site-payload | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| review-site-payload | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| review-site-payload | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| review-site-payload | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| review-site-payload | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| review-site-payload | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| review-site-payload | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| review-site-payload | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| review-site-payload | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| review-site-payload | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| review-site-payload | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| review-site-payload | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| review-site-payload | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| review-site-payload | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| review-site-payload | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| review-site-payload | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| review-site-payload | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| review-site-payload | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| review-site-payload | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| review-site-payload | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| review-site-payload | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| review-site-payload | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| review-site-payload | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| review-site-payload | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| review-site-payload | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| review-site-payload | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| review-site-payload | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| review-site-payload | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| review-site-payload | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| review-site-payload | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| review-site-payload | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| review-site-payload | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| review-site-payload | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| review-site-payload | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| review-site-payload | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| review-site-payload | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| review-site-payload | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| review-site-payload | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| review-site-payload | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| review-site-payload | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| review-site-payload | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| review-site-payload | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| review-site-payload | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| review-site-payload | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| review-site-payload | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| review-site-payload | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| review-site-payload | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| review-site-payload | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| review-site-payload | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| review-site-payload | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| review-site-payload | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| review-site-payload | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| review-site-payload | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| review-site-payload | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| review-site-payload | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| review-site-payload | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| review-site-payload | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| review-site-payload | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| review-site-payload | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| review-site-payload | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| review-site-payload | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| review-site-payload | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| review-site-payload | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| review-site-payload | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| review-site-payload | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| review-site-payload | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| review-site-payload | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| review-site-payload | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| review-site-payload | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| review-site-payload | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| review-site-payload | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| review-site-payload | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| cancel-site-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| cancel-site-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| cancel-site-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| cancel-site-draft | PASS | PREPARE_SITE executes | Must execute | PREPARE_SITE | Executed |
| cancel-site-draft | PASS | STORE_SITE_PREPARED executes | Must execute | STORE_SITE_PREPARED | Executed |
| cancel-site-draft | PASS | SITE_ENTRY executes | Must execute | SITE_ENTRY | Executed |
| cancel-site-draft | PASS | SITE_DISPLAY executes | Must execute | SITE_DISPLAY | Executed |
| cancel-site-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| cancel-site-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| cancel-site-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| cancel-site-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| cancel-site-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| cancel-site-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| cancel-site-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| cancel-site-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| cancel-site-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| cancel-site-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| cancel-site-draft | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| cancel-site-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| cancel-site-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| cancel-site-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| cancel-site-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| cancel-site-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| cancel-site-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| cancel-site-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| cancel-site-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| cancel-site-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| cancel-site-draft | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| cancel-site-draft | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| cancel-site-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| cancel-site-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| cancel-site-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| cancel-site-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| cancel-site-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| cancel-site-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| cancel-site-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| cancel-site-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| cancel-site-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| cancel-site-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| cancel-site-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| cancel-site-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| cancel-site-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| cancel-site-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| cancel-site-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| cancel-site-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| cancel-site-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| cancel-site-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| cancel-site-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| cancel-site-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| cancel-site-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| cancel-site-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| cancel-site-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| cancel-site-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| cancel-site-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| cancel-site-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| cancel-site-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| cancel-site-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| cancel-site-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| cancel-site-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| cancel-site-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| cancel-site-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| cancel-site-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| cancel-site-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| cancel-site-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| cancel-site-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| cancel-site-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| cancel-site-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| cancel-site-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| cancel-site-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| cancel-site-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| cancel-site-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| cancel-site-draft | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| cancel-site-draft | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| cancel-site-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| cancel-site-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| cancel-site-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| cancel-site-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| cancel-site-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| cancel-site-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| cancel-site-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| cancel-site-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| cancel-site-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| cancel-site-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| cancel-site-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| cancel-site-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| cancel-site-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| cancel-site-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| cancel-site-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| cancel-site-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| cancel-site-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| cancel-site-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| cancel-site-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| cancel-site-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| cancel-site-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| cancel-site-draft | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| cancel-site-draft | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |

## Semantic Evaluation

| Scope | Status | Score | Summary |
| --- | --- | --- | --- |
| prepare-site-draft | passed | 5/5 | Grounded four-field site draft and stable parent/address/BU references. |
| edit-site-name | passed | 5/5 | Grounded four-field site draft and stable parent/address/BU references. |
| review-site-payload | passed | 5/5 | Grounded four-field site draft and stable parent/address/BU references. |
| cancel-site-draft | passed | 5/5 | Grounded four-field site draft and stable parent/address/BU references. |

### Criterion Results

| Scope | Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- | --- |
| prepare-site-draft | PASS | Grounded draft | The output is grounded in explicit fields, recorded reference GETs and prior conversation. A supported oraInfoDisplay shows correct supplier, four business fields and known references without a create-success claim. | Complete supported site draft shows supplier409, explicit name, BU012/US1, address416/name and purchasingtrue from retained reference GETs; no create-success claim. |
| edit-site-name | PASS | Grounded draft | The output is grounded in explicit fields, recorded reference GETs and prior conversation. A supported oraInfoDisplay shows correct supplier, four business fields and known references without a create-success claim. | Complete supported site draft shows supplier409, explicit name, BU012/US1, address416/name and purchasingtrue from retained reference GETs; no create-success claim. |
| edit-site-name | PASS | Retained fields and parent | Supplier remains300000333814409; SupplierSite is XDX Replay Site Revised. ProcurementBUId300000046987012, SupplierAddressName XDX Core Address 20260924 and purchasing=true remain from initial preparation without being repeated in edit/review; reviewed references match recorded data. | Only SupplierSite changes to XDX Replay Site Revised; parent409, BU012, address name and purchasingtrue remain. Review retains verified address416 and US1 reference values at revision2. |
| review-site-payload | PASS | Grounded draft | The output is grounded in explicit fields, recorded reference GETs and prior conversation. A supported oraInfoDisplay shows correct supplier, four business fields and known references without a create-success claim. | Complete supported site draft shows supplier409, explicit name, BU012/US1, address416/name and purchasingtrue from retained reference GETs; no create-success claim. |
| review-site-payload | PASS | Retained fields and parent | Supplier remains300000333814409; SupplierSite is XDX Replay Site Revised. ProcurementBUId300000046987012, SupplierAddressName XDX Core Address 20260924 and purchasing=true remain from initial preparation without being repeated in edit/review; reviewed references match recorded data. | Only SupplierSite changes to XDX Replay Site Revised; parent409, BU012, address name and purchasingtrue remain. Review retains verified address416 and US1 reference values at revision2. |
| cancel-site-draft | PASS | Grounded draft | The output is grounded in explicit fields, recorded reference GETs and prior conversation. A supported oraInfoDisplay shows correct supplier, four business fields and known references without a create-success claim. | Complete supported site draft shows supplier409, explicit name, BU012/US1, address416/name and purchasingtrue from retained reference GETs; no create-success claim. |

## Workflow Run Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-site-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| edit-site-name | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| review-site-payload | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| cancel-site-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| Conversation | PASS | conversationStepOrder | conversationStepOrder | prepare-site-draft -> edit-site-name -> review-site-payload -> cancel-site-draft | Verified |
| Conversation | PASS | conversationIdReuse | conversationIdReuse | Every executed step uses one conversation ID. | Verified |

## Output Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-site-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| prepare-site-draft | PASS | Expected site draft outcome | contains | Site references verified. | Found "Site references verified." |
| edit-site-name | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| edit-site-name | PASS | Expected site draft outcome | contains | XDX Replay Site Revised | Found "XDX Replay Site Revised" |
| review-site-payload | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| review-site-payload | PASS | Expected site draft outcome | contains | Review all four submitted fields | Found "Review all four submitted fields" |
| cancel-site-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| cancel-site-draft | PASS | Expected site draft outcome | contains | Draft cancelled. No create authorized. | Found "Draft cancelled. No create authorized." |

## Runtime Metrics

Workflow time: 78688 ms (sum of node times)
Test run time: 84993 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 33072 | 1980 | 35052 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| cancel-site-draft:EXTRACT_READ | 892 | 218 | 1110 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| cancel-site-draft:SITE_DISPLAY | 7349 | 244 | 7593 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-site-name:EXTRACT_READ | 900 | 234 | 1134 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-site-name:SITE_DISPLAY | 7356 | 251 | 7607 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-site-draft:EXTRACT_READ | 938 | 280 | 1218 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-site-draft:SITE_DISPLAY | 7352 | 247 | 7599 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-site-payload:EXTRACT_READ | 892 | 218 | 1110 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-site-payload:SITE_DISPLAY | 7393 | 288 | 7681 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 8
Total AI Units: 40

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| cancel-site-draft:EXTRACT_READ | 892 | 218 | 1 | 5 | premium | general |
| cancel-site-draft:SITE_DISPLAY | 7349 | 244 | 1 | 5 | premium | general |
| edit-site-name:EXTRACT_READ | 900 | 234 | 1 | 5 | premium | general |
| edit-site-name:SITE_DISPLAY | 7356 | 251 | 1 | 5 | premium | general |
| prepare-site-draft:EXTRACT_READ | 938 | 280 | 1 | 5 | premium | general |
| prepare-site-draft:SITE_DISPLAY | 7352 | 247 | 1 | 5 | premium | general |
| review-site-payload:EXTRACT_READ | 892 | 218 | 1 | 5 | premium | general |
| review-site-payload:SITE_DISPLAY | 7393 | 288 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| prepare-site-draft:EXTRACT_READ | 10666 | 10561 | 1 runtime detail; see JSON report |
| prepare-site-draft:FETCH_SITE_PARENT | 46 |  | 0 runtime details; see JSON report |
| prepare-site-draft:FETCH_SITE_ADDRESS_REFERENCE | 46 |  | 0 runtime details; see JSON report |
| prepare-site-draft:FETCH_SITE_BU_REFERENCE | 48 |  | 0 runtime details; see JSON report |
| prepare-site-draft:SITE_DISPLAY | 5973 | 5873 | 1 runtime detail; see JSON report |
| edit-site-name:EXTRACT_READ | 18703 | 18603 | 1 runtime detail; see JSON report |
| edit-site-name:SITE_DISPLAY | 9684 | 9592 | 1 runtime detail; see JSON report |
| review-site-payload:EXTRACT_READ | 8813 | 8725 | 1 runtime detail; see JSON report |
| review-site-payload:FETCH_SITE_PARENT | 46 |  | 0 runtime details; see JSON report |
| review-site-payload:FETCH_SITE_ADDRESS_REFERENCE | 46 |  | 0 runtime details; see JSON report |
| review-site-payload:FETCH_SITE_BU_REFERENCE | 16 |  | 0 runtime details; see JSON report |
| review-site-payload:SITE_DISPLAY | 10672 | 10588 | 1 runtime detail; see JSON report |
| cancel-site-draft:EXTRACT_READ | 7729 | 7654 | 1 runtime detail; see JSON report |
| cancel-site-draft:SITE_DISPLAY | 6200 | 6112 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 938; 7352; 900; 7356; 892; 7393; 892; 7349 |
| outputTokens | 280; 247; 234; 251; 218; 288; 218; 244 |

## Test Data

| Step | Data Source | Evaluation |
| --- | --- | --- |
| prepare-site-draft | File replay | Hybrid |
| edit-site-name | File replay | Hybrid |
| review-site-payload | File replay | Hybrid |
| cancel-site-draft | File replay | Hybrid |

## Workflow Run

### Execution Timeline

| Step | Phase Sequence | Node | Event |
| --- | --- | --- | --- |
| prepare-site-draft | 1 | START | NODE_EXECUTED |
| prepare-site-draft | 2 | EXTRACT_READ | NODE_START |
| prepare-site-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| prepare-site-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| prepare-site-draft | 5 | PREPARE_SITE | NODE_EXECUTED |
| prepare-site-draft | 6 | STORE_SITE_PREPARED | NODE_EXECUTED |
| prepare-site-draft | 7 | SITE_ENTRY | NODE_START |
| prepare-site-draft | 8 | FETCH_SITE_PARENT | NODE_START |
| prepare-site-draft | 9 | CHECK_SITE_PARENT | NODE_EXECUTED |
| prepare-site-draft | 10 | STORE_SITE_PARENT | NODE_EXECUTED |
| prepare-site-draft | 11 | SITE_OPERATION | NODE_START |
| prepare-site-draft | 12 | SITE_REFERENCE_INPUT | NODE_EXECUTED |
| prepare-site-draft | 13 | FETCH_SITE_ADDRESS_REFERENCE | NODE_START |
| prepare-site-draft | 14 | FETCH_SITE_BU_REFERENCE | NODE_START |
| prepare-site-draft | 15 | CHECK_SITE_REFERENCES | NODE_EXECUTED |
| prepare-site-draft | 16 | STORE_SITE_REFERENCES | NODE_EXECUTED |
| prepare-site-draft | 17 | SITE_REFERENCES_ROUTE | NODE_START |
| prepare-site-draft | 18 | SITE_DISPLAY | NODE_START |
| edit-site-name | 1 | START | NODE_EXECUTED |
| edit-site-name | 2 | EXTRACT_READ | NODE_START |
| edit-site-name | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| edit-site-name | 4 | TRANSACTION_ROUTE | NODE_START |
| edit-site-name | 5 | PREPARE_SITE | NODE_EXECUTED |
| edit-site-name | 6 | STORE_SITE_PREPARED | NODE_EXECUTED |
| edit-site-name | 7 | SITE_ENTRY | NODE_START |
| edit-site-name | 8 | SITE_DISPLAY | NODE_START |
| review-site-payload | 1 | START | NODE_EXECUTED |
| review-site-payload | 2 | EXTRACT_READ | NODE_START |
| review-site-payload | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| review-site-payload | 4 | TRANSACTION_ROUTE | NODE_START |
| review-site-payload | 5 | PREPARE_SITE | NODE_EXECUTED |
| review-site-payload | 6 | STORE_SITE_PREPARED | NODE_EXECUTED |
| review-site-payload | 7 | SITE_ENTRY | NODE_START |
| review-site-payload | 8 | FETCH_SITE_PARENT | NODE_START |
| review-site-payload | 9 | CHECK_SITE_PARENT | NODE_EXECUTED |
| review-site-payload | 10 | STORE_SITE_PARENT | NODE_EXECUTED |
| review-site-payload | 11 | SITE_OPERATION | NODE_START |
| review-site-payload | 12 | SITE_REFERENCE_INPUT | NODE_EXECUTED |
| review-site-payload | 13 | FETCH_SITE_ADDRESS_REFERENCE | NODE_START |
| review-site-payload | 14 | FETCH_SITE_BU_REFERENCE | NODE_START |
| review-site-payload | 15 | CHECK_SITE_REFERENCES | NODE_EXECUTED |
| review-site-payload | 16 | STORE_SITE_REFERENCES | NODE_EXECUTED |
| review-site-payload | 17 | SITE_REFERENCES_ROUTE | NODE_START |
| review-site-payload | 18 | SITE_DISPLAY | NODE_START |
| cancel-site-draft | 1 | START | NODE_EXECUTED |
| cancel-site-draft | 2 | EXTRACT_READ | NODE_START |
| cancel-site-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| cancel-site-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| cancel-site-draft | 5 | PREPARE_SITE | NODE_EXECUTED |
| cancel-site-draft | 6 | STORE_SITE_PREPARED | NODE_EXECUTED |
| cancel-site-draft | 7 | SITE_ENTRY | NODE_START |
| cancel-site-draft | 8 | SITE_DISPLAY | NODE_START |

### Other Observed Nodes

| Node | Observed |
| --- | --- |
| CHECK_SITE_PARENT | 2 |
| CHECK_SITE_REFERENCES | 2 |
| EXTRACT_READ | 4 |
| FETCH_SITE_ADDRESS_REFERENCE | 2 |
| FETCH_SITE_BU_REFERENCE | 2 |
| FETCH_SITE_PARENT | 2 |
| PREPARE_SITE | 4 |
| PREPARE_TRANSACTION | 4 |
| SITE_DISPLAY | 4 |
| SITE_ENTRY | 4 |
| SITE_OPERATION | 2 |
| SITE_REFERENCE_INPUT | 2 |
| SITE_REFERENCES_ROUTE | 2 |
| START | 4 |
| STORE_SITE_PARENT | 2 |
| STORE_SITE_PREPARED | 4 |
| STORE_SITE_REFERENCES | 2 |
| TRANSACTION_ROUTE | 4 |

## Report Files

- JSON report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\site-draft-conversation\result.json`
- Markdown report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\site-draft-conversation\result.md`
- Test file: `test/workflows/xdx_supplier_core_20260924/site-draft-conversation.json`
