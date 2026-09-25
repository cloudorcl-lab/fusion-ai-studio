# Workflow Conversation Test Result: contact-draft-conversation

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Goal:** Preserve the supplier and two unedited contact fields across draft edit and review, then cancel without POST.
**Data Source:** File replay
**Evaluation:** Hybrid
**Steps:** 4

## Conversation Journey

| # | Step | Type | Intent | Interaction | Outcome | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | prepare-contact-draft | chat | Prepare contact for Supplier ID 300000333814409: FirstName XDX; LastName ReplayContactInitial; Email xdx-replay-contact@example.invalid. | Prepare contact for Supplier ID 300000333814409: FirstName XDX; LastName ReplayContactInitial; Email xdx-replay-contact@example.invalid. | <oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Required fields supplied. Draft only; no POST. Enter review contact. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactInitial"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay> | passed |
| 2 | edit-contact-name | chat | Change LastName to ReplayContactRevised. | Change LastName to ReplayContactRevised. | <oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Required fields supplied. Draft only; no POST. Enter review contact. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactRevised"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay> | passed |
| 3 | review-contact-payload | chat | review contact | review contact | <oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Review every submitted field and supplier parent. To approve this snapshot, enter: approve contact 12c7c434-e4c0-4cb9-94f3-288efd4b74fc revision 2. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactRevised"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay> | passed |
| 4 | cancel-contact-draft | chat | cancel contact | cancel contact | <oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Draft cancelled. No create authorized. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactRevised"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay> | passed |

## Step 1: prepare-contact-draft

**Status:** passed
**Type:** chat
**Intent:** Prepare contact for Supplier ID 300000333814409: FirstName XDX; LastName ReplayContactInitial; Email xdx-replay-contact@example.invalid.
**Context Step IDs:** None (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Prepare contact for Supplier ID 300000333814409: FirstName XDX; LastName ReplayContactInitial; Email xdx-replay-contact@example.invalid.",
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
<oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Required fields supplied. Draft only; no POST. Enter review contact. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactInitial"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay>
~~~

## Step 2: edit-contact-name

**Status:** passed
**Type:** chat
**Intent:** Change LastName to ReplayContactRevised.
**Context Step IDs:** prepare-contact-draft (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Change LastName to ReplayContactRevised.",
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
<oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Required fields supplied. Draft only; no POST. Enter review contact. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactRevised"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay>
~~~

## Step 3: review-contact-payload

**Status:** passed
**Type:** chat
**Intent:** review contact
**Context Step IDs:** prepare-contact-draft, edit-contact-name (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "review contact",
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
<oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Review every submitted field and supplier parent. To approve this snapshot, enter: approve contact 12c7c434-e4c0-4cb9-94f3-288efd4b74fc revision 2. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactRevised"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay>
~~~

## Step 4: cancel-contact-draft

**Status:** passed
**Type:** chat
**Intent:** cancel contact
**Context Step IDs:** prepare-contact-draft, review-contact-payload (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "cancel contact",
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
<oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Contact draft","description":"Draft cancelled. No create authorized. Request 12c7c434-e4c0-4cb9-94f3-288efd4b74fc, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["FirstName","XDX"]},{"cells":["LastName","ReplayContactRevised"]},{"cells":["Email","xdx-replay-contact@example.invalid"]}]}}</oraInfoDisplay>
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
| prepare-contact-draft | PASS | Draft guards precede display | PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_ENTRY -> FETCH_CONTACT_PARENT -> CHECK_CONTACT_PARENT -> STORE_CONTACT_PARENT -> CONTACT_OPERATION -> CONTACT_DISPLAY |
| edit-contact-name | PASS | Draft guards precede display | PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_ENTRY -> CONTACT_DISPLAY |
| review-contact-payload | PASS | Draft guards precede display | PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_ENTRY -> CONTACT_DISPLAY |
| cancel-contact-draft | PASS | Draft guards precede display | PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_CONTACT -> STORE_CONTACT_PREPARED -> CONTACT_ENTRY -> CONTACT_DISPLAY |

### Node Count Checks

| Step | Assertion | Node Code | Expected | Observed | Status |
| --- | --- | --- | --- | --- | --- |
| prepare-contact-draft | No contact POST | CREATE_CONTACT | exactly 0 | 0 | PASS |
| edit-contact-name | No contact POST | CREATE_CONTACT | exactly 0 | 0 | PASS |
| review-contact-payload | No contact POST | CREATE_CONTACT | exactly 0 | 0 | PASS |
| cancel-contact-draft | No contact POST | CREATE_CONTACT | exactly 0 | 0 | PASS |

## Path Assertions

| Step | Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-contact-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| prepare-contact-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| prepare-contact-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| prepare-contact-draft | PASS | PREPARE_CONTACT executes | Must execute | PREPARE_CONTACT | Executed |
| prepare-contact-draft | PASS | STORE_CONTACT_PREPARED executes | Must execute | STORE_CONTACT_PREPARED | Executed |
| prepare-contact-draft | PASS | CONTACT_ENTRY executes | Must execute | CONTACT_ENTRY | Executed |
| prepare-contact-draft | PASS | FETCH_CONTACT_PARENT executes | Must execute | FETCH_CONTACT_PARENT | Executed |
| prepare-contact-draft | PASS | CHECK_CONTACT_PARENT executes | Must execute | CHECK_CONTACT_PARENT | Executed |
| prepare-contact-draft | PASS | STORE_CONTACT_PARENT executes | Must execute | STORE_CONTACT_PARENT | Executed |
| prepare-contact-draft | PASS | CONTACT_OPERATION executes | Must execute | CONTACT_OPERATION | Executed |
| prepare-contact-draft | PASS | CONTACT_DISPLAY executes | Must execute | CONTACT_DISPLAY | Executed |
| prepare-contact-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| prepare-contact-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| prepare-contact-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| prepare-contact-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| prepare-contact-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| prepare-contact-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| prepare-contact-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| prepare-contact-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| prepare-contact-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| prepare-contact-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| prepare-contact-draft | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| prepare-contact-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| prepare-contact-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| prepare-contact-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| prepare-contact-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| prepare-contact-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| prepare-contact-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| prepare-contact-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| prepare-contact-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| prepare-contact-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| prepare-contact-draft | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| prepare-contact-draft | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| prepare-contact-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| prepare-contact-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| prepare-contact-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| prepare-contact-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| prepare-contact-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| prepare-contact-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| prepare-contact-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| prepare-contact-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| prepare-contact-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| prepare-contact-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| prepare-contact-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| prepare-contact-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| prepare-contact-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| prepare-contact-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| prepare-contact-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| prepare-contact-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| prepare-contact-draft | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| prepare-contact-draft | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| prepare-contact-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| prepare-contact-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| prepare-contact-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| prepare-contact-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| prepare-contact-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| prepare-contact-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| prepare-contact-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| prepare-contact-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| prepare-contact-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| prepare-contact-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| prepare-contact-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| prepare-contact-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| prepare-contact-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| prepare-contact-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| prepare-contact-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| prepare-contact-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| prepare-contact-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| prepare-contact-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| prepare-contact-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| prepare-contact-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| prepare-contact-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| prepare-contact-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| prepare-contact-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| prepare-contact-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| prepare-contact-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| prepare-contact-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| prepare-contact-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| prepare-contact-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| prepare-contact-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| prepare-contact-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| prepare-contact-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| prepare-contact-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| prepare-contact-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| prepare-contact-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| prepare-contact-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| prepare-contact-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| prepare-contact-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| prepare-contact-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| prepare-contact-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| prepare-contact-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| prepare-contact-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| prepare-contact-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| prepare-contact-draft | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| prepare-contact-draft | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| edit-contact-name | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| edit-contact-name | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| edit-contact-name | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| edit-contact-name | PASS | PREPARE_CONTACT executes | Must execute | PREPARE_CONTACT | Executed |
| edit-contact-name | PASS | STORE_CONTACT_PREPARED executes | Must execute | STORE_CONTACT_PREPARED | Executed |
| edit-contact-name | PASS | CONTACT_ENTRY executes | Must execute | CONTACT_ENTRY | Executed |
| edit-contact-name | PASS | CONTACT_DISPLAY executes | Must execute | CONTACT_DISPLAY | Executed |
| edit-contact-name | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| edit-contact-name | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| edit-contact-name | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| edit-contact-name | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| edit-contact-name | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| edit-contact-name | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| edit-contact-name | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| edit-contact-name | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| edit-contact-name | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| edit-contact-name | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| edit-contact-name | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| edit-contact-name | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| edit-contact-name | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| edit-contact-name | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| edit-contact-name | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| edit-contact-name | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| edit-contact-name | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| edit-contact-name | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| edit-contact-name | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| edit-contact-name | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| edit-contact-name | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| edit-contact-name | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| edit-contact-name | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| edit-contact-name | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| edit-contact-name | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| edit-contact-name | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| edit-contact-name | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| edit-contact-name | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| edit-contact-name | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| edit-contact-name | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| edit-contact-name | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| edit-contact-name | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| edit-contact-name | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| edit-contact-name | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| edit-contact-name | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| edit-contact-name | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| edit-contact-name | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| edit-contact-name | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| edit-contact-name | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| edit-contact-name | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| edit-contact-name | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| edit-contact-name | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| edit-contact-name | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| edit-contact-name | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| edit-contact-name | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| edit-contact-name | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| edit-contact-name | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| edit-contact-name | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| edit-contact-name | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| edit-contact-name | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| edit-contact-name | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| edit-contact-name | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| edit-contact-name | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| edit-contact-name | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| edit-contact-name | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| edit-contact-name | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| edit-contact-name | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| edit-contact-name | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| edit-contact-name | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| edit-contact-name | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| edit-contact-name | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| edit-contact-name | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| edit-contact-name | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| edit-contact-name | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| edit-contact-name | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| edit-contact-name | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| edit-contact-name | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| edit-contact-name | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| edit-contact-name | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| edit-contact-name | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| edit-contact-name | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| edit-contact-name | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| edit-contact-name | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| edit-contact-name | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| edit-contact-name | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| edit-contact-name | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| edit-contact-name | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| edit-contact-name | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| edit-contact-name | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| edit-contact-name | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| edit-contact-name | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| edit-contact-name | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| edit-contact-name | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| edit-contact-name | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| edit-contact-name | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| edit-contact-name | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| edit-contact-name | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| edit-contact-name | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| edit-contact-name | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| edit-contact-name | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| edit-contact-name | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| edit-contact-name | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| edit-contact-name | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| edit-contact-name | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| edit-contact-name | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| edit-contact-name | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| edit-contact-name | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| edit-contact-name | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| edit-contact-name | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| edit-contact-name | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| review-contact-payload | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| review-contact-payload | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| review-contact-payload | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| review-contact-payload | PASS | PREPARE_CONTACT executes | Must execute | PREPARE_CONTACT | Executed |
| review-contact-payload | PASS | STORE_CONTACT_PREPARED executes | Must execute | STORE_CONTACT_PREPARED | Executed |
| review-contact-payload | PASS | CONTACT_ENTRY executes | Must execute | CONTACT_ENTRY | Executed |
| review-contact-payload | PASS | CONTACT_DISPLAY executes | Must execute | CONTACT_DISPLAY | Executed |
| review-contact-payload | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| review-contact-payload | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| review-contact-payload | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| review-contact-payload | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| review-contact-payload | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| review-contact-payload | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| review-contact-payload | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| review-contact-payload | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| review-contact-payload | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| review-contact-payload | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| review-contact-payload | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| review-contact-payload | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| review-contact-payload | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| review-contact-payload | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| review-contact-payload | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| review-contact-payload | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| review-contact-payload | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| review-contact-payload | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| review-contact-payload | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| review-contact-payload | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| review-contact-payload | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| review-contact-payload | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| review-contact-payload | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| review-contact-payload | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| review-contact-payload | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| review-contact-payload | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| review-contact-payload | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| review-contact-payload | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| review-contact-payload | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| review-contact-payload | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| review-contact-payload | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| review-contact-payload | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| review-contact-payload | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| review-contact-payload | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| review-contact-payload | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| review-contact-payload | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| review-contact-payload | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| review-contact-payload | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| review-contact-payload | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| review-contact-payload | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| review-contact-payload | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| review-contact-payload | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| review-contact-payload | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| review-contact-payload | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| review-contact-payload | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| review-contact-payload | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| review-contact-payload | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| review-contact-payload | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| review-contact-payload | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| review-contact-payload | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| review-contact-payload | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| review-contact-payload | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| review-contact-payload | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| review-contact-payload | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| review-contact-payload | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| review-contact-payload | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| review-contact-payload | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| review-contact-payload | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| review-contact-payload | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| review-contact-payload | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| review-contact-payload | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| review-contact-payload | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| review-contact-payload | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| review-contact-payload | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| review-contact-payload | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| review-contact-payload | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| review-contact-payload | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| review-contact-payload | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| review-contact-payload | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| review-contact-payload | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| review-contact-payload | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| review-contact-payload | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| review-contact-payload | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| review-contact-payload | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| review-contact-payload | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| review-contact-payload | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| review-contact-payload | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| review-contact-payload | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| review-contact-payload | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| review-contact-payload | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| review-contact-payload | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| review-contact-payload | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| review-contact-payload | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| review-contact-payload | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| review-contact-payload | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| review-contact-payload | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| review-contact-payload | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| review-contact-payload | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| review-contact-payload | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| review-contact-payload | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| review-contact-payload | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| review-contact-payload | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| review-contact-payload | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| review-contact-payload | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| review-contact-payload | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| review-contact-payload | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| review-contact-payload | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| review-contact-payload | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| review-contact-payload | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| review-contact-payload | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| cancel-contact-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| cancel-contact-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| cancel-contact-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| cancel-contact-draft | PASS | PREPARE_CONTACT executes | Must execute | PREPARE_CONTACT | Executed |
| cancel-contact-draft | PASS | STORE_CONTACT_PREPARED executes | Must execute | STORE_CONTACT_PREPARED | Executed |
| cancel-contact-draft | PASS | CONTACT_ENTRY executes | Must execute | CONTACT_ENTRY | Executed |
| cancel-contact-draft | PASS | CONTACT_DISPLAY executes | Must execute | CONTACT_DISPLAY | Executed |
| cancel-contact-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| cancel-contact-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| cancel-contact-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| cancel-contact-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| cancel-contact-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| cancel-contact-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| cancel-contact-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| cancel-contact-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| cancel-contact-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| cancel-contact-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| cancel-contact-draft | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| cancel-contact-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| cancel-contact-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| cancel-contact-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| cancel-contact-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| cancel-contact-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| cancel-contact-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| cancel-contact-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| cancel-contact-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| cancel-contact-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| cancel-contact-draft | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| cancel-contact-draft | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| cancel-contact-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| cancel-contact-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| cancel-contact-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| cancel-contact-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| cancel-contact-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| cancel-contact-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| cancel-contact-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| cancel-contact-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| cancel-contact-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| cancel-contact-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| cancel-contact-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| cancel-contact-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| cancel-contact-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| cancel-contact-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| cancel-contact-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| cancel-contact-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| cancel-contact-draft | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| cancel-contact-draft | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| cancel-contact-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| cancel-contact-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| cancel-contact-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| cancel-contact-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| cancel-contact-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| cancel-contact-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| cancel-contact-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| cancel-contact-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| cancel-contact-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| cancel-contact-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| cancel-contact-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| cancel-contact-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| cancel-contact-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| cancel-contact-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| cancel-contact-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| cancel-contact-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| cancel-contact-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| cancel-contact-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| cancel-contact-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| cancel-contact-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| cancel-contact-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| cancel-contact-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| cancel-contact-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| cancel-contact-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| cancel-contact-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| cancel-contact-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| cancel-contact-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| cancel-contact-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| cancel-contact-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| cancel-contact-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| cancel-contact-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| cancel-contact-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| cancel-contact-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| cancel-contact-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| cancel-contact-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| cancel-contact-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| cancel-contact-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| cancel-contact-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| cancel-contact-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| cancel-contact-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| cancel-contact-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| cancel-contact-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| cancel-contact-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| cancel-contact-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| cancel-contact-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| cancel-contact-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| cancel-contact-draft | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| cancel-contact-draft | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |

## Semantic Evaluation

| Scope | Status | Score | Summary |
| --- | --- | --- | --- |
| prepare-contact-draft | passed | 5/5 | Three-field contact draft retains parent and unedited fields, then safely cancels. |
| edit-contact-name | passed | 5/5 | Three-field contact draft retains parent and unedited fields, then safely cancels. |
| review-contact-payload | passed | 5/5 | Three-field contact draft retains parent and unedited fields, then safely cancels. |
| cancel-contact-draft | passed | 5/5 | Three-field contact draft retains parent and unedited fields, then safely cancels. |

### Criterion Results

| Scope | Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- | --- |
| prepare-contact-draft | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | Parent409/name matches the GET; XDX, ReplayContactInitial and the invalid-domain test email match the initial request. The complete contact draft widget explicitly says no POST. |
| edit-contact-name | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | The complete contact draft shows the same parent409 and three supplied fields; the output requests exact revision2 approval or cancels the draft, without a create-success claim. |
| edit-contact-name | PASS | Preserved parent and unedited fields | Supplier remains300000333814409; LastName is ReplayContactRevised. FirstName XDX and Email xdx-replay-contact@example.invalid remain from the initial step without being repeated by edit or review. | Only LastName changes to ReplayContactRevised. FirstName XDX and xdx-replay-contact@example.invalid persist; request12c7c434 remains stable and revision2 is preserved through review. |
| review-contact-payload | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | The complete contact draft shows the same parent409 and three supplied fields; the output requests exact revision2 approval or cancels the draft, without a create-success claim. |
| review-contact-payload | PASS | Preserved parent and unedited fields | Supplier remains300000333814409; LastName is ReplayContactRevised. FirstName XDX and Email xdx-replay-contact@example.invalid remain from the initial step without being repeated by edit or review. | Only LastName changes to ReplayContactRevised. FirstName XDX and xdx-replay-contact@example.invalid persist; request12c7c434 remains stable and revision2 is preserved through review. |
| cancel-contact-draft | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | The complete contact draft shows the same parent409 and three supplied fields; the output requests exact revision2 approval or cancels the draft, without a create-success claim. |

## Workflow Run Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-contact-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| edit-contact-name | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| review-contact-payload | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| cancel-contact-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| Conversation | PASS | conversationStepOrder | conversationStepOrder | prepare-contact-draft -> edit-contact-name -> review-contact-payload -> cancel-contact-draft | Verified |
| Conversation | PASS | conversationIdReuse | conversationIdReuse | Every executed step uses one conversation ID. | Verified |

## Output Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-contact-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| prepare-contact-draft | PASS | Expected contact draft outcome | contains | Required fields supplied. | Found "Required fields supplied." |
| edit-contact-name | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| edit-contact-name | PASS | Expected contact draft outcome | contains | ReplayContactRevised | Found "ReplayContactRevised" |
| review-contact-payload | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| review-contact-payload | PASS | Expected contact draft outcome | contains | Review every submitted field and supplier parent. | Found "Review every submitted field and supplier parent." |
| cancel-contact-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| cancel-contact-draft | PASS | Expected contact draft outcome | contains | Draft cancelled. No create authorized. | Found "Draft cancelled. No create authorized." |

## Runtime Metrics

Workflow time: 63160 ms (sum of node times)
Test run time: 68541 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 32833 | 1736 | 34569 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| cancel-contact-draft:CONTACT_DISPLAY | 7294 | 189 | 7483 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| cancel-contact-draft:EXTRACT_READ | 892 | 216 | 1108 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-contact-name:CONTACT_DISPLAY | 7301 | 196 | 7497 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-contact-name:EXTRACT_READ | 899 | 233 | 1132 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-contact-draft:CONTACT_DISPLAY | 7300 | 195 | 7495 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-contact-draft:EXTRACT_READ | 922 | 261 | 1183 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-contact-payload:CONTACT_DISPLAY | 7333 | 228 | 7561 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-contact-payload:EXTRACT_READ | 892 | 218 | 1110 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 8
Total AI Units: 40

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| cancel-contact-draft:CONTACT_DISPLAY | 7294 | 189 | 1 | 5 | premium | general |
| cancel-contact-draft:EXTRACT_READ | 892 | 216 | 1 | 5 | premium | general |
| edit-contact-name:CONTACT_DISPLAY | 7301 | 196 | 1 | 5 | premium | general |
| edit-contact-name:EXTRACT_READ | 899 | 233 | 1 | 5 | premium | general |
| prepare-contact-draft:CONTACT_DISPLAY | 7300 | 195 | 1 | 5 | premium | general |
| prepare-contact-draft:EXTRACT_READ | 922 | 261 | 1 | 5 | premium | general |
| review-contact-payload:CONTACT_DISPLAY | 7333 | 228 | 1 | 5 | premium | general |
| review-contact-payload:EXTRACT_READ | 892 | 218 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| prepare-contact-draft:EXTRACT_READ | 7882 | 7778 | 1 runtime detail; see JSON report |
| prepare-contact-draft:FETCH_CONTACT_PARENT | 45 |  | 0 runtime details; see JSON report |
| prepare-contact-draft:CONTACT_DISPLAY | 6357 | 6271 | 1 runtime detail; see JSON report |
| edit-contact-name:EXTRACT_READ | 10873 | 10790 | 1 runtime detail; see JSON report |
| edit-contact-name:CONTACT_DISPLAY | 6488 | 6406 | 1 runtime detail; see JSON report |
| review-contact-payload:EXTRACT_READ | 8431 | 8329 | 1 runtime detail; see JSON report |
| review-contact-payload:CONTACT_DISPLAY | 5912 | 5836 | 1 runtime detail; see JSON report |
| cancel-contact-draft:EXTRACT_READ | 5635 | 5530 | 1 runtime detail; see JSON report |
| cancel-contact-draft:CONTACT_DISPLAY | 11537 | 11458 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 922; 7300; 899; 7301; 892; 7333; 892; 7294 |
| outputTokens | 261; 195; 233; 196; 218; 228; 216; 189 |

## Test Data

| Step | Data Source | Evaluation |
| --- | --- | --- |
| prepare-contact-draft | File replay | Hybrid |
| edit-contact-name | File replay | Hybrid |
| review-contact-payload | File replay | Hybrid |
| cancel-contact-draft | File replay | Hybrid |

## Workflow Run

### Execution Timeline

| Step | Phase Sequence | Node | Event |
| --- | --- | --- | --- |
| prepare-contact-draft | 1 | START | NODE_EXECUTED |
| prepare-contact-draft | 2 | EXTRACT_READ | NODE_START |
| prepare-contact-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| prepare-contact-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| prepare-contact-draft | 5 | PREPARE_CONTACT | NODE_EXECUTED |
| prepare-contact-draft | 6 | STORE_CONTACT_PREPARED | NODE_EXECUTED |
| prepare-contact-draft | 7 | CONTACT_ENTRY | NODE_START |
| prepare-contact-draft | 8 | FETCH_CONTACT_PARENT | NODE_START |
| prepare-contact-draft | 9 | CHECK_CONTACT_PARENT | NODE_EXECUTED |
| prepare-contact-draft | 10 | STORE_CONTACT_PARENT | NODE_EXECUTED |
| prepare-contact-draft | 11 | CONTACT_OPERATION | NODE_START |
| prepare-contact-draft | 12 | CONTACT_DISPLAY | NODE_START |
| edit-contact-name | 1 | START | NODE_EXECUTED |
| edit-contact-name | 2 | EXTRACT_READ | NODE_START |
| edit-contact-name | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| edit-contact-name | 4 | TRANSACTION_ROUTE | NODE_START |
| edit-contact-name | 5 | PREPARE_CONTACT | NODE_EXECUTED |
| edit-contact-name | 6 | STORE_CONTACT_PREPARED | NODE_EXECUTED |
| edit-contact-name | 7 | CONTACT_ENTRY | NODE_START |
| edit-contact-name | 8 | CONTACT_DISPLAY | NODE_START |
| review-contact-payload | 1 | START | NODE_EXECUTED |
| review-contact-payload | 2 | EXTRACT_READ | NODE_START |
| review-contact-payload | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| review-contact-payload | 4 | TRANSACTION_ROUTE | NODE_START |
| review-contact-payload | 5 | PREPARE_CONTACT | NODE_EXECUTED |
| review-contact-payload | 6 | STORE_CONTACT_PREPARED | NODE_EXECUTED |
| review-contact-payload | 7 | CONTACT_ENTRY | NODE_START |
| review-contact-payload | 8 | CONTACT_DISPLAY | NODE_START |
| cancel-contact-draft | 1 | START | NODE_EXECUTED |
| cancel-contact-draft | 2 | EXTRACT_READ | NODE_START |
| cancel-contact-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| cancel-contact-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| cancel-contact-draft | 5 | PREPARE_CONTACT | NODE_EXECUTED |
| cancel-contact-draft | 6 | STORE_CONTACT_PREPARED | NODE_EXECUTED |
| cancel-contact-draft | 7 | CONTACT_ENTRY | NODE_START |
| cancel-contact-draft | 8 | CONTACT_DISPLAY | NODE_START |

### Other Observed Nodes

| Node | Observed |
| --- | --- |
| CHECK_CONTACT_PARENT | 1 |
| CONTACT_DISPLAY | 4 |
| CONTACT_ENTRY | 4 |
| CONTACT_OPERATION | 1 |
| EXTRACT_READ | 4 |
| FETCH_CONTACT_PARENT | 1 |
| PREPARE_CONTACT | 4 |
| PREPARE_TRANSACTION | 4 |
| START | 4 |
| STORE_CONTACT_PARENT | 1 |
| STORE_CONTACT_PREPARED | 4 |
| TRANSACTION_ROUTE | 4 |

## Report Files

- JSON report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\contact-draft-conversation\result.json`
- Markdown report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\contact-draft-conversation\result.md`
- Test file: `test/workflows/xdx_supplier_core_20260924/contact-draft-conversation.json`
