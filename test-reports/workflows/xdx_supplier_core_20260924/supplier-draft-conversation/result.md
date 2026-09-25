# Workflow Conversation Test Result: supplier-draft-conversation

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Goal:** Prove field-only draft continuity and no-write guards before creating a supplier.
**Data Source:** File replay
**Evaluation:** Hybrid
**Steps:** 5

## Conversation Journey

| # | Step | Type | Intent | Interaction | Outcome | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | prepare-supplier-draft | chat | Prepare a supplier named XDX Replay Supplier Initial with BusinessRelationship Spend Authorized and TaxOrganizationType Corporation. | Prepare a supplier named XDX Replay Supplier Initial with BusinessRelationship Spend Authorized and TaxOrganizationType Corporation. | <oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Required fields supplied. Draft only; no POST. Enter review supplier when ready. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Initial"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay> | passed |
| 2 | edit-supplier-name | chat | Change Supplier to XDX Replay Supplier Revised. | Change Supplier to XDX Replay Supplier Revised. | <oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Required fields supplied. Draft only; no POST. Enter review supplier when ready. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay> | passed |
| 3 | review-supplier-payload | chat | review supplier | review supplier | <oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Review all submitted fields. To approve this exact snapshot, enter: approve supplier 2fd42cd7-05ed-4573-be98-ad30d8130f0b revision 2. Approval alone does not create. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay> | passed |
| 4 | reject-stale-request | chat | create supplier stale-request revision 1 | create supplier stale-request revision 1 | <oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Stale request or revision. Review the current draft; no create authorized. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay> | passed |
| 5 | cancel-supplier-draft | chat | cancel supplier | cancel supplier | <oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Draft cancelled. No create is authorized. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay> | passed |

## Step 1: prepare-supplier-draft

**Status:** passed
**Type:** chat
**Intent:** Prepare a supplier named XDX Replay Supplier Initial with BusinessRelationship Spend Authorized and TaxOrganizationType Corporation.
**Context Step IDs:** None (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Prepare a supplier named XDX Replay Supplier Initial with BusinessRelationship Spend Authorized and TaxOrganizationType Corporation.",
  "triggerType": "app",
  "parameters": {
    "OraAppContext": "",
    "appHint": "Query",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Required fields supplied. Draft only; no POST. Enter review supplier when ready. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Initial"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay>
~~~

## Step 2: edit-supplier-name

**Status:** passed
**Type:** chat
**Intent:** Change Supplier to XDX Replay Supplier Revised.
**Context Step IDs:** prepare-supplier-draft (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Change Supplier to XDX Replay Supplier Revised.",
  "triggerType": "app",
  "parameters": {
    "OraAppContext": "",
    "appHint": "Query",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Required fields supplied. Draft only; no POST. Enter review supplier when ready. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay>
~~~

## Step 3: review-supplier-payload

**Status:** passed
**Type:** chat
**Intent:** review supplier
**Context Step IDs:** edit-supplier-name (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "review supplier",
  "triggerType": "app",
  "parameters": {
    "OraAppContext": "",
    "appHint": "Query",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Review all submitted fields. To approve this exact snapshot, enter: approve supplier 2fd42cd7-05ed-4573-be98-ad30d8130f0b revision 2. Approval alone does not create. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay>
~~~

## Step 4: reject-stale-request

**Status:** passed
**Type:** chat
**Intent:** create supplier stale-request revision 1
**Context Step IDs:** review-supplier-payload (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "create supplier stale-request revision 1",
  "triggerType": "app",
  "parameters": {
    "OraAppContext": "",
    "appHint": "Query",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Stale request or revision. Review the current draft; no create authorized. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay>
~~~

## Step 5: cancel-supplier-draft

**Status:** passed
**Type:** chat
**Intent:** cancel supplier
**Context Step IDs:** reject-stale-request (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "cancel supplier",
  "triggerType": "app",
  "parameters": {
    "OraAppContext": "",
    "appHint": "Query",
    "OraUserContext": ""
  }
}
```

### Workflow Output

~~~text
<oraInfoDisplay key="supplierTransaction">{"patternId":"multiRecordWidget","title":"Supplier draft","description":"Draft cancelled. No create is authorized. Request 2fd42cd7-05ed-4573-be98-ad30d8130f0b, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier","XDX Replay Supplier Revised"]},{"cells":["BusinessRelationship","Spend Authorized"]},{"cells":["TaxOrganizationType","Corporation"]}]}}</oraInfoDisplay>
~~~

## Verification Summary

| Verification | Status | Result |
| --- | --- | --- |
| Node order and counts | PASSED | 10/10 passed |
| Path assertions | PASSED | 565/565 passed |
| Semantic evaluation | PASSED | 7/7 passed |
| Workflow run checks | PASSED | 7/7 passed |
| Output checks | PASSED | 10/10 passed |

## Node Order and Count

### Required Relative Order

Other nodes may execute between the listed nodes.

| Step | Status | Assertion | Required Relative Order | Observed or Failure |
| --- | --- | --- | --- | --- |
| prepare-supplier-draft | PASS | Draft passes deterministic guard before display | PREPARE_TRANSACTION -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY |
| edit-supplier-name | PASS | Draft passes deterministic guard before display | PREPARE_TRANSACTION -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY |
| review-supplier-payload | PASS | Draft passes deterministic guard before display | PREPARE_TRANSACTION -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY |
| reject-stale-request | PASS | Draft passes deterministic guard before display | PREPARE_TRANSACTION -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY |
| cancel-supplier-draft | PASS | Draft passes deterministic guard before display | PREPARE_TRANSACTION -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> STORE_PREPARED_TRANSACTION -> SUPPLIER_TRANSACTION_DISPLAY |

### Node Count Checks

| Step | Assertion | Node Code | Expected | Observed | Status |
| --- | --- | --- | --- | --- | --- |
| prepare-supplier-draft | No supplier POST | CREATE_SUPPLIER | exactly 0 | 0 | PASS |
| edit-supplier-name | No supplier POST | CREATE_SUPPLIER | exactly 0 | 0 | PASS |
| review-supplier-payload | No supplier POST | CREATE_SUPPLIER | exactly 0 | 0 | PASS |
| reject-stale-request | No supplier POST | CREATE_SUPPLIER | exactly 0 | 0 | PASS |
| cancel-supplier-draft | No supplier POST | CREATE_SUPPLIER | exactly 0 | 0 | PASS |

## Path Assertions

| Step | Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-supplier-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| prepare-supplier-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| prepare-supplier-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| prepare-supplier-draft | PASS | STORE_PREPARED_TRANSACTION executes | Must execute | STORE_PREPARED_TRANSACTION | Executed |
| prepare-supplier-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY executes | Must execute | SUPPLIER_TRANSACTION_DISPLAY | Executed |
| prepare-supplier-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| prepare-supplier-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| prepare-supplier-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| prepare-supplier-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| prepare-supplier-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| prepare-supplier-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| prepare-supplier-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| prepare-supplier-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| prepare-supplier-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| prepare-supplier-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| prepare-supplier-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| prepare-supplier-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| prepare-supplier-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| prepare-supplier-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| prepare-supplier-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| prepare-supplier-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| prepare-supplier-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| prepare-supplier-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| prepare-supplier-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| prepare-supplier-draft | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| prepare-supplier-draft | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| prepare-supplier-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| prepare-supplier-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| prepare-supplier-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| prepare-supplier-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| prepare-supplier-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| prepare-supplier-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| prepare-supplier-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| prepare-supplier-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| prepare-supplier-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| prepare-supplier-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| prepare-supplier-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| prepare-supplier-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| prepare-supplier-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| prepare-supplier-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| prepare-supplier-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| prepare-supplier-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| prepare-supplier-draft | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| prepare-supplier-draft | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| prepare-supplier-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| prepare-supplier-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| prepare-supplier-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| prepare-supplier-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| prepare-supplier-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| prepare-supplier-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| prepare-supplier-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| prepare-supplier-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| prepare-supplier-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| prepare-supplier-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| prepare-supplier-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| prepare-supplier-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| prepare-supplier-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| prepare-supplier-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| prepare-supplier-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| prepare-supplier-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| prepare-supplier-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| prepare-supplier-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| prepare-supplier-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| prepare-supplier-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| prepare-supplier-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| prepare-supplier-draft | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| prepare-supplier-draft | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| prepare-supplier-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| prepare-supplier-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| prepare-supplier-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| prepare-supplier-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| prepare-supplier-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| prepare-supplier-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| prepare-supplier-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| prepare-supplier-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| prepare-supplier-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| prepare-supplier-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| prepare-supplier-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| prepare-supplier-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| prepare-supplier-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| prepare-supplier-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| prepare-supplier-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| prepare-supplier-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| prepare-supplier-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| prepare-supplier-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| prepare-supplier-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| prepare-supplier-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| prepare-supplier-draft | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| prepare-supplier-draft | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| prepare-supplier-draft | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| edit-supplier-name | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| edit-supplier-name | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| edit-supplier-name | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| edit-supplier-name | PASS | STORE_PREPARED_TRANSACTION executes | Must execute | STORE_PREPARED_TRANSACTION | Executed |
| edit-supplier-name | PASS | SUPPLIER_TRANSACTION_DISPLAY executes | Must execute | SUPPLIER_TRANSACTION_DISPLAY | Executed |
| edit-supplier-name | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| edit-supplier-name | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| edit-supplier-name | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| edit-supplier-name | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| edit-supplier-name | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| edit-supplier-name | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| edit-supplier-name | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| edit-supplier-name | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| edit-supplier-name | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| edit-supplier-name | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| edit-supplier-name | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| edit-supplier-name | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| edit-supplier-name | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| edit-supplier-name | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| edit-supplier-name | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| edit-supplier-name | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| edit-supplier-name | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| edit-supplier-name | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| edit-supplier-name | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| edit-supplier-name | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| edit-supplier-name | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| edit-supplier-name | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| edit-supplier-name | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| edit-supplier-name | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| edit-supplier-name | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| edit-supplier-name | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| edit-supplier-name | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| edit-supplier-name | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| edit-supplier-name | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| edit-supplier-name | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| edit-supplier-name | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| edit-supplier-name | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| edit-supplier-name | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| edit-supplier-name | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| edit-supplier-name | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| edit-supplier-name | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| edit-supplier-name | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| edit-supplier-name | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| edit-supplier-name | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| edit-supplier-name | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| edit-supplier-name | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| edit-supplier-name | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| edit-supplier-name | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| edit-supplier-name | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| edit-supplier-name | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| edit-supplier-name | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| edit-supplier-name | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| edit-supplier-name | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| edit-supplier-name | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| edit-supplier-name | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| edit-supplier-name | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| edit-supplier-name | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| edit-supplier-name | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| edit-supplier-name | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| edit-supplier-name | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| edit-supplier-name | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| edit-supplier-name | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| edit-supplier-name | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| edit-supplier-name | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| edit-supplier-name | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| edit-supplier-name | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| edit-supplier-name | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| edit-supplier-name | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| edit-supplier-name | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| edit-supplier-name | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| edit-supplier-name | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| edit-supplier-name | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| edit-supplier-name | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| edit-supplier-name | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| edit-supplier-name | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| edit-supplier-name | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| edit-supplier-name | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| edit-supplier-name | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| edit-supplier-name | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| edit-supplier-name | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| edit-supplier-name | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| edit-supplier-name | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| edit-supplier-name | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| edit-supplier-name | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| edit-supplier-name | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| edit-supplier-name | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| edit-supplier-name | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| edit-supplier-name | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| edit-supplier-name | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| edit-supplier-name | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| edit-supplier-name | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| edit-supplier-name | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| edit-supplier-name | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| edit-supplier-name | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| edit-supplier-name | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| edit-supplier-name | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| review-supplier-payload | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| review-supplier-payload | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| review-supplier-payload | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| review-supplier-payload | PASS | STORE_PREPARED_TRANSACTION executes | Must execute | STORE_PREPARED_TRANSACTION | Executed |
| review-supplier-payload | PASS | SUPPLIER_TRANSACTION_DISPLAY executes | Must execute | SUPPLIER_TRANSACTION_DISPLAY | Executed |
| review-supplier-payload | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| review-supplier-payload | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| review-supplier-payload | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| review-supplier-payload | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| review-supplier-payload | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| review-supplier-payload | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| review-supplier-payload | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| review-supplier-payload | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| review-supplier-payload | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| review-supplier-payload | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| review-supplier-payload | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| review-supplier-payload | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| review-supplier-payload | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| review-supplier-payload | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| review-supplier-payload | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| review-supplier-payload | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| review-supplier-payload | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| review-supplier-payload | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| review-supplier-payload | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| review-supplier-payload | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| review-supplier-payload | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| review-supplier-payload | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| review-supplier-payload | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| review-supplier-payload | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| review-supplier-payload | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| review-supplier-payload | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| review-supplier-payload | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| review-supplier-payload | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| review-supplier-payload | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| review-supplier-payload | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| review-supplier-payload | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| review-supplier-payload | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| review-supplier-payload | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| review-supplier-payload | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| review-supplier-payload | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| review-supplier-payload | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| review-supplier-payload | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| review-supplier-payload | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| review-supplier-payload | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| review-supplier-payload | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| review-supplier-payload | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| review-supplier-payload | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| review-supplier-payload | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| review-supplier-payload | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| review-supplier-payload | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| review-supplier-payload | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| review-supplier-payload | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| review-supplier-payload | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| review-supplier-payload | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| review-supplier-payload | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| review-supplier-payload | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| review-supplier-payload | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| review-supplier-payload | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| review-supplier-payload | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| review-supplier-payload | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| review-supplier-payload | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| review-supplier-payload | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| review-supplier-payload | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| review-supplier-payload | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| review-supplier-payload | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| review-supplier-payload | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| review-supplier-payload | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| review-supplier-payload | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| review-supplier-payload | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| review-supplier-payload | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| review-supplier-payload | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| review-supplier-payload | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| review-supplier-payload | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| review-supplier-payload | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| review-supplier-payload | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| review-supplier-payload | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| review-supplier-payload | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| review-supplier-payload | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| review-supplier-payload | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| review-supplier-payload | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| review-supplier-payload | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| review-supplier-payload | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| review-supplier-payload | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| review-supplier-payload | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| review-supplier-payload | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| review-supplier-payload | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| review-supplier-payload | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| review-supplier-payload | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| review-supplier-payload | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| review-supplier-payload | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| review-supplier-payload | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| review-supplier-payload | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| review-supplier-payload | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| review-supplier-payload | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| review-supplier-payload | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| review-supplier-payload | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| reject-stale-request | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| reject-stale-request | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| reject-stale-request | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| reject-stale-request | PASS | STORE_PREPARED_TRANSACTION executes | Must execute | STORE_PREPARED_TRANSACTION | Executed |
| reject-stale-request | PASS | SUPPLIER_TRANSACTION_DISPLAY executes | Must execute | SUPPLIER_TRANSACTION_DISPLAY | Executed |
| reject-stale-request | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| reject-stale-request | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| reject-stale-request | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| reject-stale-request | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| reject-stale-request | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| reject-stale-request | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| reject-stale-request | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| reject-stale-request | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| reject-stale-request | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| reject-stale-request | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| reject-stale-request | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| reject-stale-request | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| reject-stale-request | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| reject-stale-request | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| reject-stale-request | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| reject-stale-request | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| reject-stale-request | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| reject-stale-request | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| reject-stale-request | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| reject-stale-request | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| reject-stale-request | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| reject-stale-request | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| reject-stale-request | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| reject-stale-request | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| reject-stale-request | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| reject-stale-request | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| reject-stale-request | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| reject-stale-request | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| reject-stale-request | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| reject-stale-request | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| reject-stale-request | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| reject-stale-request | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| reject-stale-request | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| reject-stale-request | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| reject-stale-request | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| reject-stale-request | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| reject-stale-request | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| reject-stale-request | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| reject-stale-request | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| reject-stale-request | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| reject-stale-request | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| reject-stale-request | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| reject-stale-request | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| reject-stale-request | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| reject-stale-request | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| reject-stale-request | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| reject-stale-request | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| reject-stale-request | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| reject-stale-request | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| reject-stale-request | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| reject-stale-request | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| reject-stale-request | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| reject-stale-request | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| reject-stale-request | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| reject-stale-request | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| reject-stale-request | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| reject-stale-request | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| reject-stale-request | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| reject-stale-request | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| reject-stale-request | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| reject-stale-request | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| reject-stale-request | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| reject-stale-request | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| reject-stale-request | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| reject-stale-request | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| reject-stale-request | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| reject-stale-request | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| reject-stale-request | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| reject-stale-request | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| reject-stale-request | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| reject-stale-request | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| reject-stale-request | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| reject-stale-request | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| reject-stale-request | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| reject-stale-request | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| reject-stale-request | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| reject-stale-request | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| reject-stale-request | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| reject-stale-request | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| reject-stale-request | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| reject-stale-request | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| reject-stale-request | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| reject-stale-request | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| reject-stale-request | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| reject-stale-request | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| reject-stale-request | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| reject-stale-request | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| reject-stale-request | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| reject-stale-request | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| reject-stale-request | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| reject-stale-request | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| reject-stale-request | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| reject-stale-request | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| reject-stale-request | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| reject-stale-request | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| reject-stale-request | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| cancel-supplier-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| cancel-supplier-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| cancel-supplier-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| cancel-supplier-draft | PASS | STORE_PREPARED_TRANSACTION executes | Must execute | STORE_PREPARED_TRANSACTION | Executed |
| cancel-supplier-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY executes | Must execute | SUPPLIER_TRANSACTION_DISPLAY | Executed |
| cancel-supplier-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| cancel-supplier-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| cancel-supplier-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| cancel-supplier-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| cancel-supplier-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| cancel-supplier-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| cancel-supplier-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| cancel-supplier-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| cancel-supplier-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| cancel-supplier-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| cancel-supplier-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| cancel-supplier-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| cancel-supplier-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| cancel-supplier-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| cancel-supplier-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| cancel-supplier-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| cancel-supplier-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| cancel-supplier-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| cancel-supplier-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| cancel-supplier-draft | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| cancel-supplier-draft | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| cancel-supplier-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| cancel-supplier-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| cancel-supplier-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| cancel-supplier-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| cancel-supplier-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| cancel-supplier-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| cancel-supplier-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| cancel-supplier-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| cancel-supplier-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| cancel-supplier-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| cancel-supplier-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| cancel-supplier-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| cancel-supplier-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| cancel-supplier-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| cancel-supplier-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| cancel-supplier-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| cancel-supplier-draft | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| cancel-supplier-draft | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| cancel-supplier-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| cancel-supplier-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| cancel-supplier-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| cancel-supplier-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| cancel-supplier-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| cancel-supplier-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| cancel-supplier-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| cancel-supplier-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| cancel-supplier-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| cancel-supplier-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| cancel-supplier-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| cancel-supplier-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| cancel-supplier-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| cancel-supplier-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| cancel-supplier-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| cancel-supplier-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| cancel-supplier-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| cancel-supplier-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| cancel-supplier-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| cancel-supplier-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| cancel-supplier-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| cancel-supplier-draft | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| cancel-supplier-draft | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| cancel-supplier-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| cancel-supplier-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| cancel-supplier-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| cancel-supplier-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| cancel-supplier-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| cancel-supplier-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| cancel-supplier-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| cancel-supplier-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| cancel-supplier-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| cancel-supplier-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| cancel-supplier-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| cancel-supplier-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| cancel-supplier-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| cancel-supplier-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| cancel-supplier-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| cancel-supplier-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| cancel-supplier-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| cancel-supplier-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| cancel-supplier-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| cancel-supplier-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| cancel-supplier-draft | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| cancel-supplier-draft | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| cancel-supplier-draft | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |

## Semantic Evaluation

| Scope | Status | Score | Summary |
| --- | --- | --- | --- |
| prepare-supplier-draft | passed | 5/5 | Grounded three-field supplier draft with continuity, stale request withholding and cancellation. |
| edit-supplier-name | passed | 5/5 | Grounded three-field supplier draft with continuity, stale request withholding and cancellation. |
| review-supplier-payload | passed | 5/5 | Grounded three-field supplier draft with continuity, stale request withholding and cancellation. |
| reject-stale-request | passed | 5/5 | Grounded three-field supplier draft with continuity, stale request withholding and cancellation. |
| cancel-supplier-draft | passed | 5/5 | Grounded three-field supplier draft with continuity, stale request withholding and cancellation. |

### Criterion Results

| Scope | Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- | --- |
| prepare-supplier-draft | PASS | Grounded native draft | The output is grounded in the input and conversation state, presents a supported oraInfoDisplay widget, and does not claim a business record was created. | Complete supported supplier draft contains the supplied name, Spend Authorized and Corporation; output is explicitly draft/review/stale rejection/cancellation, never a create-success claim. |
| edit-supplier-name | PASS | Grounded native draft | The output is grounded in the input and conversation state, presents a supported oraInfoDisplay widget, and does not claim a business record was created. | Complete supported supplier draft contains the supplied name, Spend Authorized and Corporation; output is explicitly draft/review/stale rejection/cancellation, never a create-success claim. |
| edit-supplier-name | PASS | Preserved unedited fields | BusinessRelationship remains Spend Authorized and TaxOrganizationType remains Corporation from the initial step; Supplier is XDX Replay Supplier Revised. | Only Supplier becomes XDX Replay Supplier Revised; Spend Authorized and Corporation remain unchanged across edit and review at revision2. |
| review-supplier-payload | PASS | Grounded native draft | The output is grounded in the input and conversation state, presents a supported oraInfoDisplay widget, and does not claim a business record was created. | Complete supported supplier draft contains the supplied name, Spend Authorized and Corporation; output is explicitly draft/review/stale rejection/cancellation, never a create-success claim. |
| review-supplier-payload | PASS | Preserved unedited fields | BusinessRelationship remains Spend Authorized and TaxOrganizationType remains Corporation from the initial step; Supplier is XDX Replay Supplier Revised. | Only Supplier becomes XDX Replay Supplier Revised; Spend Authorized and Corporation remain unchanged across edit and review at revision2. |
| reject-stale-request | PASS | Grounded native draft | The output is grounded in the input and conversation state, presents a supported oraInfoDisplay widget, and does not claim a business record was created. | Complete supported supplier draft contains the supplied name, Spend Authorized and Corporation; output is explicitly draft/review/stale rejection/cancellation, never a create-success claim. |
| cancel-supplier-draft | PASS | Grounded native draft | The output is grounded in the input and conversation state, presents a supported oraInfoDisplay widget, and does not claim a business record was created. | Complete supported supplier draft contains the supplied name, Spend Authorized and Corporation; output is explicitly draft/review/stale rejection/cancellation, never a create-success claim. |

## Workflow Run Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-supplier-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| edit-supplier-name | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| review-supplier-payload | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| reject-stale-request | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| cancel-supplier-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| Conversation | PASS | conversationStepOrder | conversationStepOrder | prepare-supplier-draft -> edit-supplier-name -> review-supplier-payload -> reject-stale-request -> cancel-supplier-draft | Verified |
| Conversation | PASS | conversationIdReuse | conversationIdReuse | Every executed step uses one conversation ID. | Verified |

## Output Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-supplier-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| prepare-supplier-draft | PASS | Expected business result | contains | XDX Replay Supplier Initial | Found "XDX Replay Supplier Initial" |
| edit-supplier-name | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| edit-supplier-name | PASS | Expected business result | contains | XDX Replay Supplier Revised | Found "XDX Replay Supplier Revised" |
| review-supplier-payload | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| review-supplier-payload | PASS | Expected business result | contains | Review all submitted fields. | Found "Review all submitted fields." |
| reject-stale-request | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| reject-stale-request | PASS | Expected business result | contains | Stale request or revision. | Found "Stale request or revision." |
| cancel-supplier-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| cancel-supplier-draft | PASS | Expected business result | contains | Draft cancelled. | Found "Draft cancelled." |

## Runtime Metrics

Workflow time: 98646 ms (sum of node times)
Test run time: 104549 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 40817 | 1962 | 42779 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| cancel-supplier-draft:EXTRACT_READ | 892 | 218 | 1110 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| cancel-supplier-draft:SUPPLIER_TRANSACTION_DISPLAY | 7253 | 149 | 7402 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-supplier-name:EXTRACT_READ | 899 | 233 | 1132 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-supplier-name:SUPPLIER_TRANSACTION_DISPLAY | 7261 | 157 | 7418 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-supplier-draft:EXTRACT_READ | 910 | 254 | 1164 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-supplier-draft:SUPPLIER_TRANSACTION_DISPLAY | 7261 | 157 | 7418 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| reject-stale-request:EXTRACT_READ | 897 | 234 | 1131 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| reject-stale-request:SUPPLIER_TRANSACTION_DISPLAY | 7260 | 156 | 7416 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-supplier-payload:EXTRACT_READ | 892 | 216 | 1108 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-supplier-payload:SUPPLIER_TRANSACTION_DISPLAY | 7292 | 188 | 7480 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 10
Total AI Units: 50

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| cancel-supplier-draft:EXTRACT_READ | 892 | 218 | 1 | 5 | premium | general |
| cancel-supplier-draft:SUPPLIER_TRANSACTION_DISPLAY | 7253 | 149 | 1 | 5 | premium | general |
| edit-supplier-name:EXTRACT_READ | 899 | 233 | 1 | 5 | premium | general |
| edit-supplier-name:SUPPLIER_TRANSACTION_DISPLAY | 7261 | 157 | 1 | 5 | premium | general |
| prepare-supplier-draft:EXTRACT_READ | 910 | 254 | 1 | 5 | premium | general |
| prepare-supplier-draft:SUPPLIER_TRANSACTION_DISPLAY | 7261 | 157 | 1 | 5 | premium | general |
| reject-stale-request:EXTRACT_READ | 897 | 234 | 1 | 5 | premium | general |
| reject-stale-request:SUPPLIER_TRANSACTION_DISPLAY | 7260 | 156 | 1 | 5 | premium | general |
| review-supplier-payload:EXTRACT_READ | 892 | 216 | 1 | 5 | premium | general |
| review-supplier-payload:SUPPLIER_TRANSACTION_DISPLAY | 7292 | 188 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| prepare-supplier-draft:EXTRACT_READ | 11048 | 10941 | 1 runtime detail; see JSON report |
| prepare-supplier-draft:SUPPLIER_TRANSACTION_DISPLAY | 7608 | 7501 | 1 runtime detail; see JSON report |
| edit-supplier-name:EXTRACT_READ | 15276 | 15197 | 1 runtime detail; see JSON report |
| edit-supplier-name:SUPPLIER_TRANSACTION_DISPLAY | 7060 | 6981 | 1 runtime detail; see JSON report |
| review-supplier-payload:EXTRACT_READ | 4545 | 4442 | 1 runtime detail; see JSON report |
| review-supplier-payload:SUPPLIER_TRANSACTION_DISPLAY | 10629 | 10550 | 1 runtime detail; see JSON report |
| reject-stale-request:EXTRACT_READ | 16362 | 15870 | 1 runtime detail; see JSON report |
| reject-stale-request:SUPPLIER_TRANSACTION_DISPLAY | 5895 | 5803 | 1 runtime detail; see JSON report |
| cancel-supplier-draft:EXTRACT_READ | 9981 | 9898 | 1 runtime detail; see JSON report |
| cancel-supplier-draft:SUPPLIER_TRANSACTION_DISPLAY | 10242 | 10166 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 910; 7261; 899; 7261; 892; 7292; 897; 7260; 892; 7253 |
| outputTokens | 254; 157; 233; 157; 216; 188; 234; 156; 218; 149 |

## Test Data

| Step | Data Source | Evaluation |
| --- | --- | --- |
| prepare-supplier-draft | File replay | Hybrid |
| edit-supplier-name | File replay | Hybrid |
| review-supplier-payload | File replay | Hybrid |
| reject-stale-request | File replay | Hybrid |
| cancel-supplier-draft | File replay | Hybrid |

## Workflow Run

### Execution Timeline

| Step | Phase Sequence | Node | Event |
| --- | --- | --- | --- |
| prepare-supplier-draft | 1 | START | NODE_EXECUTED |
| prepare-supplier-draft | 2 | EXTRACT_READ | NODE_START |
| prepare-supplier-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| prepare-supplier-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| prepare-supplier-draft | 5 | STORE_PREPARED_TRANSACTION | NODE_EXECUTED |
| prepare-supplier-draft | 6 | SUPPLIER_TRANSACTION_DISPLAY | NODE_START |
| edit-supplier-name | 1 | START | NODE_EXECUTED |
| edit-supplier-name | 2 | EXTRACT_READ | NODE_START |
| edit-supplier-name | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| edit-supplier-name | 4 | TRANSACTION_ROUTE | NODE_START |
| edit-supplier-name | 5 | STORE_PREPARED_TRANSACTION | NODE_EXECUTED |
| edit-supplier-name | 6 | SUPPLIER_TRANSACTION_DISPLAY | NODE_START |
| review-supplier-payload | 1 | START | NODE_EXECUTED |
| review-supplier-payload | 2 | EXTRACT_READ | NODE_START |
| review-supplier-payload | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| review-supplier-payload | 4 | TRANSACTION_ROUTE | NODE_START |
| review-supplier-payload | 5 | STORE_PREPARED_TRANSACTION | NODE_EXECUTED |
| review-supplier-payload | 6 | SUPPLIER_TRANSACTION_DISPLAY | NODE_START |
| reject-stale-request | 1 | START | NODE_EXECUTED |
| reject-stale-request | 2 | EXTRACT_READ | NODE_START |
| reject-stale-request | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| reject-stale-request | 4 | TRANSACTION_ROUTE | NODE_START |
| reject-stale-request | 5 | STORE_PREPARED_TRANSACTION | NODE_EXECUTED |
| reject-stale-request | 6 | SUPPLIER_TRANSACTION_DISPLAY | NODE_START |
| cancel-supplier-draft | 1 | START | NODE_EXECUTED |
| cancel-supplier-draft | 2 | EXTRACT_READ | NODE_START |
| cancel-supplier-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| cancel-supplier-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| cancel-supplier-draft | 5 | STORE_PREPARED_TRANSACTION | NODE_EXECUTED |
| cancel-supplier-draft | 6 | SUPPLIER_TRANSACTION_DISPLAY | NODE_START |

### Other Observed Nodes

| Node | Observed |
| --- | --- |
| EXTRACT_READ | 5 |
| PREPARE_TRANSACTION | 5 |
| START | 5 |
| STORE_PREPARED_TRANSACTION | 5 |
| SUPPLIER_TRANSACTION_DISPLAY | 5 |
| TRANSACTION_ROUTE | 5 |

## Report Files

- JSON report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-draft-conversation\result.json`
- Markdown report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-draft-conversation\result.md`
- Test file: `test/workflows/xdx_supplier_core_20260924/supplier-draft-conversation.json`
