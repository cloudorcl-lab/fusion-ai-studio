# Workflow Conversation Test Result: address-draft-conversation

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Goal:** Preserve the supplier and seven unedited address fields across draft edit and review, then cancel without POST.
**Data Source:** File replay
**Evaluation:** Hybrid
**Steps:** 4

## Conversation Journey

| # | Step | Type | Intent | Interaction | Outcome | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | prepare-address-draft | chat | Prepare address for Supplier ID 300000333814409: AddressName XDX Replay Draft; CountryCode US; AddressLine1 5000 CARTER DR.; City LOS ANGELES; State CA; PostalCode 90032; Email xdx-address@example.invalid; AddressPurposeOrderingFlag true. | Prepare address for Supplier ID 300000333814409: AddressName XDX Replay Draft; CountryCode US; AddressLine1 5000 CARTER DR.; City LOS ANGELES; State CA; PostalCode 90032; Email xdx-address@example.invalid; AddressPurposeOrderingFlag true. | <oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Required fields supplied. Draft only; no POST. Enter review address. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Draft"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay> | passed |
| 2 | edit-address-name | chat | Change AddressName to XDX Replay Address Revised. | Change AddressName to XDX Replay Address Revised. | <oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Required fields supplied. Draft only; no POST. Enter review address. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Address Revised"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay> | passed |
| 3 | review-address-payload | chat | review address | review address | <oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Review every submitted field and supplier parent. To approve this snapshot, enter: approve address 011553aa-49f8-41d0-94c2-b22c8d4ce3a0 revision 2. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Address Revised"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay> | passed |
| 4 | cancel-address-draft | chat | cancel address | cancel address | <oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Draft cancelled. No create authorized. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Address Revised"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay> | passed |

## Step 1: prepare-address-draft

**Status:** passed
**Type:** chat
**Intent:** Prepare address for Supplier ID 300000333814409: AddressName XDX Replay Draft; CountryCode US; AddressLine1 5000 CARTER DR.; City LOS ANGELES; State CA; PostalCode 90032; Email xdx-address@example.invalid; AddressPurposeOrderingFlag true.
**Context Step IDs:** None (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Prepare address for Supplier ID 300000333814409: AddressName XDX Replay Draft; CountryCode US; AddressLine1 5000 CARTER DR.; City LOS ANGELES; State CA; PostalCode 90032; Email xdx-address@example.invalid; AddressPurposeOrderingFlag true.",
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
<oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Required fields supplied. Draft only; no POST. Enter review address. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 1.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Draft"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay>
~~~

## Step 2: edit-address-name

**Status:** passed
**Type:** chat
**Intent:** Change AddressName to XDX Replay Address Revised.
**Context Step IDs:** prepare-address-draft (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Change AddressName to XDX Replay Address Revised.",
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
<oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Required fields supplied. Draft only; no POST. Enter review address. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Address Revised"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay>
~~~

## Step 3: review-address-payload

**Status:** passed
**Type:** chat
**Intent:** review address
**Context Step IDs:** prepare-address-draft, edit-address-name (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "review address",
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
<oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Review every submitted field and supplier parent. To approve this snapshot, enter: approve address 011553aa-49f8-41d0-94c2-b22c8d4ce3a0 revision 2. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Address Revised"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay>
~~~

## Step 4: cancel-address-draft

**Status:** passed
**Type:** chat
**Intent:** cancel address
**Context Step IDs:** prepare-address-draft, review-address-payload (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "cancel address",
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
<oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address draft","description":"Draft cancelled. No create authorized. Request 011553aa-49f8-41d0-94c2-b22c8d4ce3a0, revision 2.","properties":{"cols":["Field","Value"],"rows":[{"cells":["Supplier ID","300000333814409"]},{"cells":["Supplier","XDX Core Supplier 20260924 2130"]},{"cells":["AddressName","XDX Replay Address Revised"]},{"cells":["CountryCode","US"]},{"cells":["AddressLine1","5000 CARTER DR."]},{"cells":["City","LOS ANGELES"]},{"cells":["State","CA"]},{"cells":["PostalCode","90032"]},{"cells":["Email","xdx-address@example.invalid"]},{"cells":["AddressPurposeOrderingFlag","true"]}]}}</oraInfoDisplay>
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
| prepare-address-draft | PASS | Draft guards precede display | PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_ENTRY -> FETCH_ADDRESS_PARENT -> CHECK_ADDRESS_PARENT -> STORE_ADDRESS_PARENT -> ADDRESS_OPERATION -> ADDRESS_DISPLAY |
| edit-address-name | PASS | Draft guards precede display | PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_ENTRY -> ADDRESS_DISPLAY |
| review-address-payload | PASS | Draft guards precede display | PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_ENTRY -> ADDRESS_DISPLAY |
| cancel-address-draft | PASS | Draft guards precede display | PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_ENTRY -> ADDRESS_DISPLAY |

### Node Count Checks

| Step | Assertion | Node Code | Expected | Observed | Status |
| --- | --- | --- | --- | --- | --- |
| prepare-address-draft | No address POST | CREATE_ADDRESS | exactly 0 | 0 | PASS |
| edit-address-name | No address POST | CREATE_ADDRESS | exactly 0 | 0 | PASS |
| review-address-payload | No address POST | CREATE_ADDRESS | exactly 0 | 0 | PASS |
| cancel-address-draft | No address POST | CREATE_ADDRESS | exactly 0 | 0 | PASS |

## Path Assertions

| Step | Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-address-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| prepare-address-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| prepare-address-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| prepare-address-draft | PASS | PREPARE_ADDRESS executes | Must execute | PREPARE_ADDRESS | Executed |
| prepare-address-draft | PASS | STORE_ADDRESS_PREPARED executes | Must execute | STORE_ADDRESS_PREPARED | Executed |
| prepare-address-draft | PASS | ADDRESS_ENTRY executes | Must execute | ADDRESS_ENTRY | Executed |
| prepare-address-draft | PASS | FETCH_ADDRESS_PARENT executes | Must execute | FETCH_ADDRESS_PARENT | Executed |
| prepare-address-draft | PASS | CHECK_ADDRESS_PARENT executes | Must execute | CHECK_ADDRESS_PARENT | Executed |
| prepare-address-draft | PASS | STORE_ADDRESS_PARENT executes | Must execute | STORE_ADDRESS_PARENT | Executed |
| prepare-address-draft | PASS | ADDRESS_OPERATION executes | Must execute | ADDRESS_OPERATION | Executed |
| prepare-address-draft | PASS | ADDRESS_DISPLAY executes | Must execute | ADDRESS_DISPLAY | Executed |
| prepare-address-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| prepare-address-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| prepare-address-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| prepare-address-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| prepare-address-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| prepare-address-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| prepare-address-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| prepare-address-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| prepare-address-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| prepare-address-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| prepare-address-draft | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| prepare-address-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| prepare-address-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| prepare-address-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| prepare-address-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| prepare-address-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| prepare-address-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| prepare-address-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| prepare-address-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| prepare-address-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| prepare-address-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| prepare-address-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| prepare-address-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| prepare-address-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| prepare-address-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| prepare-address-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| prepare-address-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| prepare-address-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| prepare-address-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| prepare-address-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| prepare-address-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| prepare-address-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| prepare-address-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| prepare-address-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| prepare-address-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| prepare-address-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| prepare-address-draft | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| prepare-address-draft | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| prepare-address-draft | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| prepare-address-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| prepare-address-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| prepare-address-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| prepare-address-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| prepare-address-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| prepare-address-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| prepare-address-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| prepare-address-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| prepare-address-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| prepare-address-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| prepare-address-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| prepare-address-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| prepare-address-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| prepare-address-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| prepare-address-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| prepare-address-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| prepare-address-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| prepare-address-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| prepare-address-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| prepare-address-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| prepare-address-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| prepare-address-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| prepare-address-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| prepare-address-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| prepare-address-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| prepare-address-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| prepare-address-draft | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| prepare-address-draft | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| prepare-address-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| prepare-address-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| prepare-address-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| prepare-address-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| prepare-address-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| prepare-address-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| prepare-address-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| prepare-address-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| prepare-address-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| prepare-address-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| prepare-address-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| prepare-address-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| prepare-address-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| prepare-address-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| prepare-address-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| prepare-address-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| prepare-address-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| prepare-address-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| prepare-address-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| prepare-address-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| prepare-address-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| prepare-address-draft | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| prepare-address-draft | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| edit-address-name | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| edit-address-name | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| edit-address-name | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| edit-address-name | PASS | PREPARE_ADDRESS executes | Must execute | PREPARE_ADDRESS | Executed |
| edit-address-name | PASS | STORE_ADDRESS_PREPARED executes | Must execute | STORE_ADDRESS_PREPARED | Executed |
| edit-address-name | PASS | ADDRESS_ENTRY executes | Must execute | ADDRESS_ENTRY | Executed |
| edit-address-name | PASS | ADDRESS_DISPLAY executes | Must execute | ADDRESS_DISPLAY | Executed |
| edit-address-name | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| edit-address-name | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| edit-address-name | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| edit-address-name | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| edit-address-name | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| edit-address-name | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| edit-address-name | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| edit-address-name | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| edit-address-name | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| edit-address-name | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| edit-address-name | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| edit-address-name | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| edit-address-name | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| edit-address-name | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| edit-address-name | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| edit-address-name | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| edit-address-name | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| edit-address-name | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| edit-address-name | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| edit-address-name | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| edit-address-name | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| edit-address-name | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| edit-address-name | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| edit-address-name | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| edit-address-name | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| edit-address-name | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| edit-address-name | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| edit-address-name | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| edit-address-name | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| edit-address-name | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| edit-address-name | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| edit-address-name | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| edit-address-name | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| edit-address-name | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| edit-address-name | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| edit-address-name | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| edit-address-name | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| edit-address-name | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| edit-address-name | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| edit-address-name | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| edit-address-name | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| edit-address-name | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| edit-address-name | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| edit-address-name | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| edit-address-name | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| edit-address-name | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| edit-address-name | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| edit-address-name | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| edit-address-name | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| edit-address-name | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| edit-address-name | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| edit-address-name | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| edit-address-name | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| edit-address-name | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| edit-address-name | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| edit-address-name | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| edit-address-name | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| edit-address-name | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| edit-address-name | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| edit-address-name | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| edit-address-name | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| edit-address-name | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| edit-address-name | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| edit-address-name | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| edit-address-name | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| edit-address-name | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| edit-address-name | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| edit-address-name | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| edit-address-name | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| edit-address-name | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| edit-address-name | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| edit-address-name | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| edit-address-name | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| edit-address-name | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| edit-address-name | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| edit-address-name | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| edit-address-name | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| edit-address-name | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| edit-address-name | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| edit-address-name | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| edit-address-name | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| edit-address-name | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| edit-address-name | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| edit-address-name | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| edit-address-name | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| edit-address-name | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| edit-address-name | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| edit-address-name | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| edit-address-name | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| edit-address-name | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| edit-address-name | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| edit-address-name | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| edit-address-name | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| edit-address-name | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| edit-address-name | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| edit-address-name | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| edit-address-name | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| edit-address-name | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| edit-address-name | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| edit-address-name | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| edit-address-name | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| edit-address-name | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| edit-address-name | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| edit-address-name | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| edit-address-name | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| edit-address-name | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| review-address-payload | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| review-address-payload | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| review-address-payload | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| review-address-payload | PASS | PREPARE_ADDRESS executes | Must execute | PREPARE_ADDRESS | Executed |
| review-address-payload | PASS | STORE_ADDRESS_PREPARED executes | Must execute | STORE_ADDRESS_PREPARED | Executed |
| review-address-payload | PASS | ADDRESS_ENTRY executes | Must execute | ADDRESS_ENTRY | Executed |
| review-address-payload | PASS | ADDRESS_DISPLAY executes | Must execute | ADDRESS_DISPLAY | Executed |
| review-address-payload | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| review-address-payload | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| review-address-payload | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| review-address-payload | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| review-address-payload | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| review-address-payload | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| review-address-payload | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| review-address-payload | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| review-address-payload | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| review-address-payload | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| review-address-payload | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| review-address-payload | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| review-address-payload | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| review-address-payload | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| review-address-payload | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| review-address-payload | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| review-address-payload | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| review-address-payload | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| review-address-payload | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| review-address-payload | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| review-address-payload | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| review-address-payload | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| review-address-payload | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| review-address-payload | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| review-address-payload | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| review-address-payload | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| review-address-payload | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| review-address-payload | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| review-address-payload | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| review-address-payload | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| review-address-payload | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| review-address-payload | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| review-address-payload | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| review-address-payload | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| review-address-payload | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| review-address-payload | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| review-address-payload | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| review-address-payload | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| review-address-payload | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| review-address-payload | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| review-address-payload | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| review-address-payload | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| review-address-payload | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| review-address-payload | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| review-address-payload | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| review-address-payload | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| review-address-payload | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| review-address-payload | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| review-address-payload | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| review-address-payload | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| review-address-payload | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| review-address-payload | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| review-address-payload | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| review-address-payload | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| review-address-payload | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| review-address-payload | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| review-address-payload | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| review-address-payload | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| review-address-payload | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| review-address-payload | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| review-address-payload | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| review-address-payload | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| review-address-payload | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| review-address-payload | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| review-address-payload | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| review-address-payload | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| review-address-payload | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| review-address-payload | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| review-address-payload | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| review-address-payload | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| review-address-payload | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| review-address-payload | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| review-address-payload | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| review-address-payload | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| review-address-payload | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| review-address-payload | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| review-address-payload | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| review-address-payload | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| review-address-payload | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| review-address-payload | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| review-address-payload | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| review-address-payload | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| review-address-payload | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| review-address-payload | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| review-address-payload | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| review-address-payload | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| review-address-payload | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| review-address-payload | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| review-address-payload | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| review-address-payload | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| review-address-payload | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| review-address-payload | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| review-address-payload | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| review-address-payload | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| review-address-payload | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| review-address-payload | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| review-address-payload | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| review-address-payload | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| review-address-payload | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| review-address-payload | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| review-address-payload | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| review-address-payload | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| review-address-payload | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| review-address-payload | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| review-address-payload | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| review-address-payload | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| cancel-address-draft | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| cancel-address-draft | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| cancel-address-draft | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| cancel-address-draft | PASS | PREPARE_ADDRESS executes | Must execute | PREPARE_ADDRESS | Executed |
| cancel-address-draft | PASS | STORE_ADDRESS_PREPARED executes | Must execute | STORE_ADDRESS_PREPARED | Executed |
| cancel-address-draft | PASS | ADDRESS_ENTRY executes | Must execute | ADDRESS_ENTRY | Executed |
| cancel-address-draft | PASS | ADDRESS_DISPLAY executes | Must execute | ADDRESS_DISPLAY | Executed |
| cancel-address-draft | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| cancel-address-draft | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| cancel-address-draft | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| cancel-address-draft | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| cancel-address-draft | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| cancel-address-draft | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| cancel-address-draft | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| cancel-address-draft | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| cancel-address-draft | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| cancel-address-draft | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| cancel-address-draft | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| cancel-address-draft | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| cancel-address-draft | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| cancel-address-draft | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| cancel-address-draft | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| cancel-address-draft | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| cancel-address-draft | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| cancel-address-draft | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| cancel-address-draft | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| cancel-address-draft | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| cancel-address-draft | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| cancel-address-draft | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| cancel-address-draft | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| cancel-address-draft | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| cancel-address-draft | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| cancel-address-draft | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| cancel-address-draft | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| cancel-address-draft | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| cancel-address-draft | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| cancel-address-draft | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| cancel-address-draft | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| cancel-address-draft | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| cancel-address-draft | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| cancel-address-draft | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| cancel-address-draft | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| cancel-address-draft | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| cancel-address-draft | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| cancel-address-draft | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| cancel-address-draft | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| cancel-address-draft | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| cancel-address-draft | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| cancel-address-draft | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| cancel-address-draft | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| cancel-address-draft | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| cancel-address-draft | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| cancel-address-draft | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| cancel-address-draft | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| cancel-address-draft | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| cancel-address-draft | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| cancel-address-draft | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| cancel-address-draft | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| cancel-address-draft | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| cancel-address-draft | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| cancel-address-draft | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| cancel-address-draft | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| cancel-address-draft | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| cancel-address-draft | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| cancel-address-draft | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| cancel-address-draft | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| cancel-address-draft | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| cancel-address-draft | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| cancel-address-draft | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| cancel-address-draft | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| cancel-address-draft | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| cancel-address-draft | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| cancel-address-draft | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| cancel-address-draft | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| cancel-address-draft | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| cancel-address-draft | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| cancel-address-draft | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| cancel-address-draft | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| cancel-address-draft | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| cancel-address-draft | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| cancel-address-draft | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| cancel-address-draft | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| cancel-address-draft | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| cancel-address-draft | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| cancel-address-draft | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| cancel-address-draft | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| cancel-address-draft | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| cancel-address-draft | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| cancel-address-draft | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| cancel-address-draft | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| cancel-address-draft | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| cancel-address-draft | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| cancel-address-draft | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| cancel-address-draft | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| cancel-address-draft | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| cancel-address-draft | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| cancel-address-draft | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| cancel-address-draft | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| cancel-address-draft | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| cancel-address-draft | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| cancel-address-draft | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |

## Semantic Evaluation

| Scope | Status | Score | Summary |
| --- | --- | --- | --- |
| prepare-address-draft | passed | 5/5 | Grounded address draft continuity and safe exact review/cancel. |
| edit-address-name | passed | 5/5 | Grounded address draft continuity and safe exact review/cancel. |
| review-address-payload | passed | 5/5 | Grounded address draft continuity and safe exact review/cancel. |
| cancel-address-draft | passed | 5/5 | Grounded address draft continuity and safe exact review/cancel. |

### Criterion Results

| Scope | Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- | --- |
| prepare-address-draft | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | Supplier409/name and all eight address fields match the initial request and parent GET; a complete two-column draft widget makes no create claim. |
| edit-address-name | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | Supplier409/name and all eight address fields match the initial request and parent GET; a complete two-column draft widget makes no create claim. |
| edit-address-name | PASS | Preserved parent and unedited fields | Supplier remains300000333814409; AddressName is XDX Replay Address Revised. CountryCode US, AddressLine1 5000 CARTER DR., City LOS ANGELES, State CA, PostalCode90032, Email xdx-address@example.invalid and ordering=true remain from the initial step without being repeated by the edit or review request. | AddressName alone becomes XDX Replay Address Revised; US, street, city, state, postal code, email and orderingtrue persist under supplier409. Request011553aa remains stable and revision2 is preserved at review. |
| review-address-payload | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | Supplier409/name and all eight address fields match the initial request and parent GET; a complete two-column draft widget makes no create claim. |
| review-address-payload | PASS | Preserved parent and unedited fields | Supplier remains300000333814409; AddressName is XDX Replay Address Revised. CountryCode US, AddressLine1 5000 CARTER DR., City LOS ANGELES, State CA, PostalCode90032, Email xdx-address@example.invalid and ordering=true remain from the initial step without being repeated by the edit or review request. | AddressName alone becomes XDX Replay Address Revised; US, street, city, state, postal code, email and orderingtrue persist under supplier409. Request011553aa remains stable and revision2 is preserved at review. |
| cancel-address-draft | PASS | Grounded parent and complete draft | The output is grounded in the supplied fields, replayed supplier data and prior conversation. It displays a supported oraInfoDisplay widget and makes no create-success claim. | Complete revised draft remains visible; the result states Draft cancelled. No create authorized, without claiming a write. |

## Workflow Run Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-address-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| edit-address-name | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| review-address-payload | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| cancel-address-draft | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| Conversation | PASS | conversationStepOrder | conversationStepOrder | prepare-address-draft -> edit-address-name -> review-address-payload -> cancel-address-draft | Verified |
| Conversation | PASS | conversationIdReuse | conversationIdReuse | Every executed step uses one conversation ID. | Verified |

## Output Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| prepare-address-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| prepare-address-draft | PASS | Expected address draft outcome | contains | Required fields supplied. | Found "Required fields supplied." |
| edit-address-name | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| edit-address-name | PASS | Expected address draft outcome | contains | XDX Replay Address Revised | Found "XDX Replay Address Revised" |
| review-address-payload | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| review-address-payload | PASS | Expected address draft outcome | contains | Review every submitted field and supplier parent. | Found "Review every submitted field and supplier parent." |
| cancel-address-draft | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| cancel-address-draft | PASS | Expected address draft outcome | contains | Draft cancelled. No create authorized. | Found "Draft cancelled. No create authorized." |

## Runtime Metrics

Workflow time: 79648 ms (sum of node times)
Test run time: 85324 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 33110 | 1959 | 35069 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| cancel-address-draft:ADDRESS_DISPLAY | 7356 | 251 | 7607 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| cancel-address-draft:EXTRACT_READ | 892 | 218 | 1110 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-address-name:ADDRESS_DISPLAY | 7363 | 258 | 7621 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| edit-address-name:EXTRACT_READ | 900 | 234 | 1134 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-address-draft:ADDRESS_DISPLAY | 7362 | 257 | 7619 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| prepare-address-draft:EXTRACT_READ | 949 | 232 | 1181 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-address-payload:ADDRESS_DISPLAY | 7396 | 291 | 7687 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| review-address-payload:EXTRACT_READ | 892 | 218 | 1110 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 8
Total AI Units: 40

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| cancel-address-draft:ADDRESS_DISPLAY | 7356 | 251 | 1 | 5 | premium | general |
| cancel-address-draft:EXTRACT_READ | 892 | 218 | 1 | 5 | premium | general |
| edit-address-name:ADDRESS_DISPLAY | 7363 | 258 | 1 | 5 | premium | general |
| edit-address-name:EXTRACT_READ | 900 | 234 | 1 | 5 | premium | general |
| prepare-address-draft:ADDRESS_DISPLAY | 7362 | 257 | 1 | 5 | premium | general |
| prepare-address-draft:EXTRACT_READ | 949 | 232 | 1 | 5 | premium | general |
| review-address-payload:ADDRESS_DISPLAY | 7396 | 291 | 1 | 5 | premium | general |
| review-address-payload:EXTRACT_READ | 892 | 218 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| prepare-address-draft:EXTRACT_READ | 12288 | 12208 | 1 runtime detail; see JSON report |
| prepare-address-draft:FETCH_ADDRESS_PARENT | 45 |  | 0 runtime details; see JSON report |
| prepare-address-draft:ADDRESS_DISPLAY | 10416 | 10341 | 1 runtime detail; see JSON report |
| edit-address-name:EXTRACT_READ | 11599 | 11139 | 1 runtime detail; see JSON report |
| edit-address-name:ADDRESS_DISPLAY | 10502 | 10425 | 1 runtime detail; see JSON report |
| review-address-payload:EXTRACT_READ | 9046 | 8968 | 1 runtime detail; see JSON report |
| review-address-payload:ADDRESS_DISPLAY | 10734 | 10659 | 1 runtime detail; see JSON report |
| cancel-address-draft:EXTRACT_READ | 7841 | 7736 | 1 runtime detail; see JSON report |
| cancel-address-draft:ADDRESS_DISPLAY | 7177 | 7098 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 949; 7362; 900; 7363; 892; 7396; 892; 7356 |
| outputTokens | 232; 257; 234; 258; 218; 291; 218; 251 |

## Test Data

| Step | Data Source | Evaluation |
| --- | --- | --- |
| prepare-address-draft | File replay | Hybrid |
| edit-address-name | File replay | Hybrid |
| review-address-payload | File replay | Hybrid |
| cancel-address-draft | File replay | Hybrid |

## Workflow Run

### Execution Timeline

| Step | Phase Sequence | Node | Event |
| --- | --- | --- | --- |
| prepare-address-draft | 1 | START | NODE_EXECUTED |
| prepare-address-draft | 2 | EXTRACT_READ | NODE_START |
| prepare-address-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| prepare-address-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| prepare-address-draft | 5 | PREPARE_ADDRESS | NODE_EXECUTED |
| prepare-address-draft | 6 | STORE_ADDRESS_PREPARED | NODE_EXECUTED |
| prepare-address-draft | 7 | ADDRESS_ENTRY | NODE_START |
| prepare-address-draft | 8 | FETCH_ADDRESS_PARENT | NODE_START |
| prepare-address-draft | 9 | CHECK_ADDRESS_PARENT | NODE_EXECUTED |
| prepare-address-draft | 10 | STORE_ADDRESS_PARENT | NODE_EXECUTED |
| prepare-address-draft | 11 | ADDRESS_OPERATION | NODE_START |
| prepare-address-draft | 12 | ADDRESS_DISPLAY | NODE_START |
| edit-address-name | 1 | START | NODE_EXECUTED |
| edit-address-name | 2 | EXTRACT_READ | NODE_START |
| edit-address-name | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| edit-address-name | 4 | TRANSACTION_ROUTE | NODE_START |
| edit-address-name | 5 | PREPARE_ADDRESS | NODE_EXECUTED |
| edit-address-name | 6 | STORE_ADDRESS_PREPARED | NODE_EXECUTED |
| edit-address-name | 7 | ADDRESS_ENTRY | NODE_START |
| edit-address-name | 8 | ADDRESS_DISPLAY | NODE_START |
| review-address-payload | 1 | START | NODE_EXECUTED |
| review-address-payload | 2 | EXTRACT_READ | NODE_START |
| review-address-payload | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| review-address-payload | 4 | TRANSACTION_ROUTE | NODE_START |
| review-address-payload | 5 | PREPARE_ADDRESS | NODE_EXECUTED |
| review-address-payload | 6 | STORE_ADDRESS_PREPARED | NODE_EXECUTED |
| review-address-payload | 7 | ADDRESS_ENTRY | NODE_START |
| review-address-payload | 8 | ADDRESS_DISPLAY | NODE_START |
| cancel-address-draft | 1 | START | NODE_EXECUTED |
| cancel-address-draft | 2 | EXTRACT_READ | NODE_START |
| cancel-address-draft | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| cancel-address-draft | 4 | TRANSACTION_ROUTE | NODE_START |
| cancel-address-draft | 5 | PREPARE_ADDRESS | NODE_EXECUTED |
| cancel-address-draft | 6 | STORE_ADDRESS_PREPARED | NODE_EXECUTED |
| cancel-address-draft | 7 | ADDRESS_ENTRY | NODE_START |
| cancel-address-draft | 8 | ADDRESS_DISPLAY | NODE_START |

### Other Observed Nodes

| Node | Observed |
| --- | --- |
| ADDRESS_DISPLAY | 4 |
| ADDRESS_ENTRY | 4 |
| ADDRESS_OPERATION | 1 |
| CHECK_ADDRESS_PARENT | 1 |
| EXTRACT_READ | 4 |
| FETCH_ADDRESS_PARENT | 1 |
| PREPARE_ADDRESS | 4 |
| PREPARE_TRANSACTION | 4 |
| START | 4 |
| STORE_ADDRESS_PARENT | 1 |
| STORE_ADDRESS_PREPARED | 4 |
| TRANSACTION_ROUTE | 4 |

## Report Files

- JSON report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\address-draft-conversation\result.json`
- Markdown report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\address-draft-conversation\result.md`
- Test file: `test/workflows/xdx_supplier_core_20260924/address-draft-conversation.json`
