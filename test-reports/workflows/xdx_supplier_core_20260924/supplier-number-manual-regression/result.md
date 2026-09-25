# Workflow Conversation Test Result: supplier-number-manual-regression

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86237214)
**Goal:** Manual steps 1-3 resolve displayed SupplierNumber to the verified SupplierId before REST access.
**Data Source:** File replay
**Evaluation:** Hybrid
**Steps:** 3

## Conversation Journey

| # | Step | Type | Intent | Interaction | Outcome | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | query-supplier-name | chat | Find supplier XDX Core Supplier 20260924 2130 | Find supplier XDX Core Supplier 20260924 2130 | <oraInfoDisplay key="supplierRead">{"patternId":"multiRecordWidget","title":"Supplier query results","description":"Page of supplier results. count: 1, offset: 0, hasMore: false, nextOffset: Not specified. No next page. Use a returned Supplier ID for detail.","properties":{"cols":["Supplier ID","Supplier number","Supplier","Supplier type","Business relationship","Inactive date"],"rows":[{"cells":["300000333814409","1506","XDX Core Supplier 20260924 2130","Not specified","Spend Authorized","Not specified"]}]}}</oraInfoDisplay> | passed |
| 2 | read-supplier-number | chat | Show details for supplier 1506 | Show details for supplier 1506 | <oraInfoDisplay key="supplierRead">{"patternId":"multiRecordWidget","title":"Supplier detail","description":"Verified scalar supplier profile for 300000333814409.","properties":{"cols":["Supplier ID","Supplier number","Supplier","Supplier type","Business relationship","Inactive date","Status","Alternate name","Tax organization type","Corporate website"],"rows":[{"cells":["300000333814409","1506","XDX Core Supplier 20260924 2130","Not specified","Spend Authorized","Not specified","ACTIVE","Not specified","Corporation","Not specified"]}]}}</oraInfoDisplay> | passed |
| 3 | read-address-number | chat | Show addresses for supplier 1506 | Show addresses for supplier 1506 | <oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Supplier addresses","description":"Supplier XDX Core Supplier 20260924 2130 (300000333814409). count: 1, offset: 0, hasMore: false. No next page.","properties":{"cols":["SupplierAddressId","AddressName","CountryCode","AddressLine1","City","State","PostalCode","Email","AddressPurposeOrderingFlag","AddressPartyNumber","Status","InactiveDate"],"rows":[{"cells":["300000333814416","XDX Core Address 20260924","US","5000 CARTER DR.","LOS ANGELES","CA","90032","xdx-core-address-20260924@example.invalid","true","1486638","ACTIVE","4712-12-31"]}]}}</oraInfoDisplay> | passed |

## Step 1: query-supplier-name

**Status:** passed
**Type:** chat
**Intent:** Find supplier XDX Core Supplier 20260924 2130
**Context Step IDs:** None (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Find supplier XDX Core Supplier 20260924 2130",
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
<oraInfoDisplay key="supplierRead">{"patternId":"multiRecordWidget","title":"Supplier query results","description":"Page of supplier results. count: 1, offset: 0, hasMore: false, nextOffset: Not specified. No next page. Use a returned Supplier ID for detail.","properties":{"cols":["Supplier ID","Supplier number","Supplier","Supplier type","Business relationship","Inactive date"],"rows":[{"cells":["300000333814409","1506","XDX Core Supplier 20260924 2130","Not specified","Spend Authorized","Not specified"]}]}}</oraInfoDisplay>
~~~

## Step 2: read-supplier-number

**Status:** passed
**Type:** chat
**Intent:** Show details for supplier 1506
**Context Step IDs:** query-supplier-name (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Show details for supplier 1506",
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
<oraInfoDisplay key="supplierRead">{"patternId":"multiRecordWidget","title":"Supplier detail","description":"Verified scalar supplier profile for 300000333814409.","properties":{"cols":["Supplier ID","Supplier number","Supplier","Supplier type","Business relationship","Inactive date","Status","Alternate name","Tax organization type","Corporate website"],"rows":[{"cells":["300000333814409","1506","XDX Core Supplier 20260924 2130","Not specified","Spend Authorized","Not specified","ACTIVE","Not specified","Corporation","Not specified"]}]}}</oraInfoDisplay>
~~~

## Step 3: read-address-number

**Status:** passed
**Type:** chat
**Intent:** Show addresses for supplier 1506
**Context Step IDs:** read-supplier-number (prior steps supplied to semantic judging)
**Conversation State:** established

### Interaction

```json
{
  "message": "Show addresses for supplier 1506",
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
<oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Supplier addresses","description":"Supplier XDX Core Supplier 20260924 2130 (300000333814409). count: 1, offset: 0, hasMore: false. No next page.","properties":{"cols":["SupplierAddressId","AddressName","CountryCode","AddressLine1","City","State","PostalCode","Email","AddressPurposeOrderingFlag","AddressPartyNumber","Status","InactiveDate"],"rows":[{"cells":["300000333814416","XDX Core Address 20260924","US","5000 CARTER DR.","LOS ANGELES","CA","90032","xdx-core-address-20260924@example.invalid","true","1486638","ACTIVE","4712-12-31"]}]}}</oraInfoDisplay>
~~~

## Verification Summary

| Verification | Status | Result |
| --- | --- | --- |
| Node order and counts | PASSED | 6/6 passed |
| Path assertions | PASSED | 339/339 passed |
| Node assertions | PASSED | 2/2 passed |
| Semantic evaluation | PASSED | 6/6 passed |
| Workflow run checks | PASSED | 5/5 passed |
| Output checks | PASSED | 6/6 passed |

## Node Order and Count

### Required Relative Order

Other nodes may execute between the listed nodes.

| Step | Status | Assertion | Required Relative Order | Observed or Failure |
| --- | --- | --- | --- | --- |
| query-supplier-name | PASS | Query resolves before displaying | EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_READ -> READ_ALLOWED -> IS_LIST -> FETCH_SUPPLIERS -> SHAPE_SUPPLIERS -> STORE_LIST_STATE -> DISPLAY_STAGE -> SUPPLIER_READ_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_READ -> READ_ALLOWED -> IS_LIST -> FETCH_SUPPLIERS -> SHAPE_SUPPLIERS -> STORE_LIST_STATE -> DISPLAY_STAGE -> SUPPLIER_READ_DISPLAY |
| read-supplier-number | PASS | Query resolves before displaying | EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_READ -> READ_ALLOWED -> IS_LIST -> FETCH_SUPPLIER_DETAIL -> SHAPE_DETAIL -> STORE_DETAIL_STATE -> DISPLAY_STAGE -> SUPPLIER_READ_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_READ -> READ_ALLOWED -> IS_LIST -> FETCH_SUPPLIER_DETAIL -> SHAPE_DETAIL -> STORE_DETAIL_STATE -> DISPLAY_STAGE -> SUPPLIER_READ_DISPLAY |
| read-address-number | PASS | Query resolves before displaying | EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_ENTRY -> FETCH_ADDRESS_PARENT -> CHECK_ADDRESS_PARENT -> STORE_ADDRESS_PARENT -> ADDRESS_OPERATION -> FETCH_ADDRESSES -> SHAPE_ADDRESSES -> STORE_ADDRESS_LIST -> ADDRESS_DISPLAY | START -> EXTRACT_READ -> PREPARE_TRANSACTION -> TRANSACTION_ROUTE -> PREPARE_ADDRESS -> STORE_ADDRESS_PREPARED -> ADDRESS_ENTRY -> FETCH_ADDRESS_PARENT -> CHECK_ADDRESS_PARENT -> STORE_ADDRESS_PARENT -> ADDRESS_OPERATION -> FETCH_ADDRESSES -> SHAPE_ADDRESSES -> STORE_ADDRESS_LIST -> ADDRESS_DISPLAY |

### Node Count Checks

| Step | Assertion | Node Code | Expected | Observed | Status |
| --- | --- | --- | --- | --- | --- |
| query-supplier-name | No supplier create | CREATE_SUPPLIER | exactly 0 | 0 | PASS |
| read-supplier-number | No supplier create | CREATE_SUPPLIER | exactly 0 | 0 | PASS |
| read-address-number | No supplier create | CREATE_SUPPLIER | exactly 0 | 0 | PASS |

## Path Assertions

| Step | Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| query-supplier-name | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| query-supplier-name | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| query-supplier-name | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| query-supplier-name | PASS | PREPARE_READ executes | Must execute | PREPARE_READ | Executed |
| query-supplier-name | PASS | READ_ALLOWED executes | Must execute | READ_ALLOWED | Executed |
| query-supplier-name | PASS | IS_LIST executes | Must execute | IS_LIST | Executed |
| query-supplier-name | PASS | FETCH_SUPPLIERS executes | Must execute | FETCH_SUPPLIERS | Executed |
| query-supplier-name | PASS | SHAPE_SUPPLIERS executes | Must execute | SHAPE_SUPPLIERS | Executed |
| query-supplier-name | PASS | STORE_LIST_STATE executes | Must execute | STORE_LIST_STATE | Executed |
| query-supplier-name | PASS | DISPLAY_STAGE executes | Must execute | DISPLAY_STAGE | Executed |
| query-supplier-name | PASS | SUPPLIER_READ_DISPLAY executes | Must execute | SUPPLIER_READ_DISPLAY | Executed |
| query-supplier-name | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| query-supplier-name | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| query-supplier-name | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| query-supplier-name | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| query-supplier-name | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| query-supplier-name | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| query-supplier-name | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| query-supplier-name | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| query-supplier-name | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| query-supplier-name | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| query-supplier-name | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| query-supplier-name | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| query-supplier-name | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| query-supplier-name | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| query-supplier-name | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| query-supplier-name | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| query-supplier-name | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| query-supplier-name | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| query-supplier-name | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| query-supplier-name | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| query-supplier-name | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| query-supplier-name | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| query-supplier-name | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| query-supplier-name | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| query-supplier-name | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| query-supplier-name | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| query-supplier-name | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| query-supplier-name | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| query-supplier-name | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| query-supplier-name | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| query-supplier-name | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| query-supplier-name | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| query-supplier-name | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| query-supplier-name | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| query-supplier-name | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| query-supplier-name | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| query-supplier-name | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| query-supplier-name | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| query-supplier-name | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| query-supplier-name | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| query-supplier-name | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| query-supplier-name | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| query-supplier-name | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| query-supplier-name | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| query-supplier-name | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| query-supplier-name | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| query-supplier-name | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| query-supplier-name | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| query-supplier-name | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| query-supplier-name | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| query-supplier-name | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| query-supplier-name | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| query-supplier-name | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| query-supplier-name | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| query-supplier-name | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| query-supplier-name | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| query-supplier-name | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| query-supplier-name | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| query-supplier-name | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| query-supplier-name | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| query-supplier-name | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| query-supplier-name | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| query-supplier-name | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| query-supplier-name | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| query-supplier-name | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| query-supplier-name | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| query-supplier-name | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| query-supplier-name | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| query-supplier-name | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| query-supplier-name | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| query-supplier-name | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| query-supplier-name | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| query-supplier-name | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| query-supplier-name | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| query-supplier-name | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| query-supplier-name | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| query-supplier-name | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| query-supplier-name | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| query-supplier-name | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| query-supplier-name | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| query-supplier-name | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| query-supplier-name | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| query-supplier-name | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| query-supplier-name | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| query-supplier-name | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| query-supplier-name | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| query-supplier-name | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| query-supplier-name | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| query-supplier-name | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| query-supplier-name | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| read-supplier-number | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| read-supplier-number | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| read-supplier-number | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| read-supplier-number | PASS | PREPARE_READ executes | Must execute | PREPARE_READ | Executed |
| read-supplier-number | PASS | READ_ALLOWED executes | Must execute | READ_ALLOWED | Executed |
| read-supplier-number | PASS | IS_LIST executes | Must execute | IS_LIST | Executed |
| read-supplier-number | PASS | DISPLAY_STAGE executes | Must execute | DISPLAY_STAGE | Executed |
| read-supplier-number | PASS | FETCH_SUPPLIER_DETAIL executes | Must execute | FETCH_SUPPLIER_DETAIL | Executed |
| read-supplier-number | PASS | SHAPE_DETAIL executes | Must execute | SHAPE_DETAIL | Executed |
| read-supplier-number | PASS | STORE_DETAIL_STATE executes | Must execute | STORE_DETAIL_STATE | Executed |
| read-supplier-number | PASS | SUPPLIER_READ_DISPLAY executes | Must execute | SUPPLIER_READ_DISPLAY | Executed |
| read-supplier-number | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| read-supplier-number | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| read-supplier-number | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| read-supplier-number | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| read-supplier-number | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| read-supplier-number | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| read-supplier-number | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| read-supplier-number | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| read-supplier-number | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| read-supplier-number | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| read-supplier-number | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| read-supplier-number | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| read-supplier-number | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| read-supplier-number | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| read-supplier-number | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| read-supplier-number | PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| read-supplier-number | PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| read-supplier-number | PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| read-supplier-number | PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| read-supplier-number | PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| read-supplier-number | PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| read-supplier-number | PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| read-supplier-number | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| read-supplier-number | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| read-supplier-number | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| read-supplier-number | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| read-supplier-number | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| read-supplier-number | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| read-supplier-number | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| read-supplier-number | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| read-supplier-number | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| read-supplier-number | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| read-supplier-number | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| read-supplier-number | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| read-supplier-number | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| read-supplier-number | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| read-supplier-number | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| read-supplier-number | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| read-supplier-number | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| read-supplier-number | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| read-supplier-number | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| read-supplier-number | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| read-supplier-number | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| read-supplier-number | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| read-supplier-number | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| read-supplier-number | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| read-supplier-number | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| read-supplier-number | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| read-supplier-number | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| read-supplier-number | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| read-supplier-number | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| read-supplier-number | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| read-supplier-number | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| read-supplier-number | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| read-supplier-number | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| read-supplier-number | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| read-supplier-number | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| read-supplier-number | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| read-supplier-number | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| read-supplier-number | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| read-supplier-number | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| read-supplier-number | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| read-supplier-number | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| read-supplier-number | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| read-supplier-number | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| read-supplier-number | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| read-supplier-number | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| read-supplier-number | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| read-supplier-number | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| read-supplier-number | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| read-supplier-number | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| read-supplier-number | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| read-supplier-number | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| read-supplier-number | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| read-supplier-number | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| read-supplier-number | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| read-supplier-number | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| read-supplier-number | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| read-supplier-number | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| read-supplier-number | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| read-supplier-number | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| read-supplier-number | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| read-supplier-number | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| read-supplier-number | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| read-supplier-number | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| read-supplier-number | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| read-supplier-number | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| read-supplier-number | PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| read-supplier-number | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| read-supplier-number | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |
| read-address-number | PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| read-address-number | PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| read-address-number | PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| read-address-number | PASS | PREPARE_ADDRESS executes | Must execute | PREPARE_ADDRESS | Executed |
| read-address-number | PASS | STORE_ADDRESS_PREPARED executes | Must execute | STORE_ADDRESS_PREPARED | Executed |
| read-address-number | PASS | ADDRESS_ENTRY executes | Must execute | ADDRESS_ENTRY | Executed |
| read-address-number | PASS | FETCH_ADDRESS_PARENT executes | Must execute | FETCH_ADDRESS_PARENT | Executed |
| read-address-number | PASS | CHECK_ADDRESS_PARENT executes | Must execute | CHECK_ADDRESS_PARENT | Executed |
| read-address-number | PASS | STORE_ADDRESS_PARENT executes | Must execute | STORE_ADDRESS_PARENT | Executed |
| read-address-number | PASS | ADDRESS_OPERATION executes | Must execute | ADDRESS_OPERATION | Executed |
| read-address-number | PASS | FETCH_ADDRESSES executes | Must execute | FETCH_ADDRESSES | Executed |
| read-address-number | PASS | SHAPE_ADDRESSES executes | Must execute | SHAPE_ADDRESSES | Executed |
| read-address-number | PASS | STORE_ADDRESS_LIST executes | Must execute | STORE_ADDRESS_LIST | Executed |
| read-address-number | PASS | ADDRESS_DISPLAY executes | Must execute | ADDRESS_DISPLAY | Executed |
| read-address-number | PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| read-address-number | PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| read-address-number | PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| read-address-number | PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| read-address-number | PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| read-address-number | PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| read-address-number | PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| read-address-number | PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| read-address-number | PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| read-address-number | PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| read-address-number | PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| read-address-number | PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| read-address-number | PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| read-address-number | PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| read-address-number | PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| read-address-number | PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| read-address-number | PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| read-address-number | PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| read-address-number | PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| read-address-number | PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| read-address-number | PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| read-address-number | PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| read-address-number | PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| read-address-number | PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| read-address-number | PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| read-address-number | PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| read-address-number | PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| read-address-number | PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| read-address-number | PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| read-address-number | PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| read-address-number | PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| read-address-number | PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| read-address-number | PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| read-address-number | PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| read-address-number | PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| read-address-number | PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| read-address-number | PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| read-address-number | PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| read-address-number | PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| read-address-number | PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| read-address-number | PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| read-address-number | PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| read-address-number | PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| read-address-number | PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| read-address-number | PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| read-address-number | PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| read-address-number | PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| read-address-number | PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| read-address-number | PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| read-address-number | PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| read-address-number | PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| read-address-number | PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| read-address-number | PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| read-address-number | PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| read-address-number | PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| read-address-number | PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| read-address-number | PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| read-address-number | PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| read-address-number | PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| read-address-number | PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| read-address-number | PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| read-address-number | PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| read-address-number | PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| read-address-number | PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| read-address-number | PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| read-address-number | PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| read-address-number | PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| read-address-number | PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| read-address-number | PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| read-address-number | PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| read-address-number | PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| read-address-number | PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| read-address-number | PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| read-address-number | PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| read-address-number | PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| read-address-number | PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| read-address-number | PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| read-address-number | PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| read-address-number | PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| read-address-number | PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| read-address-number | PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| read-address-number | PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| read-address-number | PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| read-address-number | PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| read-address-number | PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| read-address-number | PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| read-address-number | PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| read-address-number | PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| read-address-number | PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| read-address-number | PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| read-address-number | PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| read-address-number | PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| read-address-number | PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| read-address-number | PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| read-address-number | PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| read-address-number | PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| read-address-number | PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| read-address-number | PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| read-address-number | PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |

## Node Assertions

| Step | Status | Assertion | Node Code | Occurrence | Asserted Value | Operator | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| read-supplier-number | PASS | Resolved supplier ID feeds REST binding | PREPARE_READ | last | output/result/supplierId | equals | "300000333814409" | string (15 characters) |
| read-address-number | PASS | Resolved supplier ID feeds REST binding | PREPARE_ADDRESS | last | output/result/parentId | equals | "300000333814409" | string (15 characters) |

## Semantic Evaluation

| Scope | Status | Score | Summary |
| --- | --- | --- | --- |
| query-supplier-name | passed | 5/5 | The single row matches supplier ID300000333814409, number1506 and all six fixture fields. Complete multiRecordWidget; count1 offset0 hasMorefalse and nulls are accurately displayed. |
| read-supplier-number | passed | 5/5 | The ten scalar fields match the retained supplier fixture, including ACTIVE and Corporation; number1506 resolves to the supplier from the previous step. Complete ten-column oraInfoDisplay with honest nulls, no fabricated children or write claims. |
| read-address-number | passed | 5/5 | All twelve projected address fields match address300000333814416, and the description preserves the supplier resolved in earlier turns. Complete address widget, count1 offset0 hasMorefalse, true ordering purpose, no404 or create claim. |

### Criterion Results

| Scope | Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- | --- |
| query-supplier-name | PASS | Correct supplier and complete grounded output | The output is grounded in the replayed test data, preserves every projected field and uses the supplier selected in the preceding query where applicable. No fabricated record or write claim. | The single row matches supplier ID300000333814409, number1506 and all six fixture fields. |
| query-supplier-name | PASS | Supported native output | Output is a complete supported oraInfoDisplay widget with accurate paging for lists and honest missing values. | Complete multiRecordWidget; count1 offset0 hasMorefalse and nulls are accurately displayed. |
| read-supplier-number | PASS | Correct supplier and complete grounded output | The output is grounded in the replayed test data, preserves every projected field and uses the supplier selected in the preceding query where applicable. No fabricated record or write claim. | The ten scalar fields match the retained supplier fixture, including ACTIVE and Corporation; number1506 resolves to the supplier from the previous step. |
| read-supplier-number | PASS | Supported native output | Output is a complete supported oraInfoDisplay widget with accurate paging for lists and honest missing values. | Complete ten-column oraInfoDisplay with honest nulls, no fabricated children or write claims. |
| read-address-number | PASS | Correct supplier and complete grounded output | The output is grounded in the replayed test data, preserves every projected field and uses the supplier selected in the preceding query where applicable. No fabricated record or write claim. | All twelve projected address fields match address300000333814416, and the description preserves the supplier resolved in earlier turns. |
| read-address-number | PASS | Supported native output | Output is a complete supported oraInfoDisplay widget with accurate paging for lists and honest missing values. | Complete address widget, count1 offset0 hasMorefalse, true ordering purpose, no404 or create claim. |

## Workflow Run Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| query-supplier-name | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| read-supplier-number | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| read-address-number | PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |
| Conversation | PASS | conversationStepOrder | conversationStepOrder | query-supplier-name -> read-supplier-number -> read-address-number | Verified |
| Conversation | PASS | conversationIdReuse | conversationIdReuse | Every executed step uses one conversation ID. | Verified |

## Output Checks

| Step | Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- | --- |
| query-supplier-name | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| query-supplier-name | PASS | Expected business record is displayed | contains | XDX Core Supplier 20260924 2130 | Found "XDX Core Supplier 20260924 2130" |
| read-supplier-number | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| read-supplier-number | PASS | Expected business record is displayed | contains | Corporation | Found "Corporation" |
| read-address-number | PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |
| read-address-number | PASS | Expected business record is displayed | contains | XDX Core Address 20260924 | Found "XDX Core Address 20260924" |

## Runtime Metrics

Workflow time: 61155 ms (sum of node times)
Test run time: 66180 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 24636 | 1197 | 25833 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| query-supplier-name:EXTRACT_READ | 903 | 228 | 1131 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| query-supplier-name:SUPPLIER_READ_DISPLAY | 7314 | 162 | 7476 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| read-address-number:ADDRESS_DISPLAY | 7315 | 210 | 7525 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| read-address-number:EXTRACT_READ | 897 | 220 | 1117 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| read-supplier-number:EXTRACT_READ | 897 | 219 | 1116 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| read-supplier-number:SUPPLIER_READ_DISPLAY | 7310 | 158 | 7468 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 6
Total AI Units: 30

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| query-supplier-name:EXTRACT_READ | 903 | 228 | 1 | 5 | premium | general |
| query-supplier-name:SUPPLIER_READ_DISPLAY | 7314 | 162 | 1 | 5 | premium | general |
| read-address-number:ADDRESS_DISPLAY | 7315 | 210 | 1 | 5 | premium | general |
| read-address-number:EXTRACT_READ | 897 | 220 | 1 | 5 | premium | general |
| read-supplier-number:EXTRACT_READ | 897 | 219 | 1 | 5 | premium | general |
| read-supplier-number:SUPPLIER_READ_DISPLAY | 7310 | 158 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| query-supplier-name:EXTRACT_READ | 10193 | 10111 | 1 runtime detail; see JSON report |
| query-supplier-name:FETCH_SUPPLIERS | 48 |  | 0 runtime details; see JSON report |
| query-supplier-name:SUPPLIER_READ_DISPLAY | 9915 | 9833 | 1 runtime detail; see JSON report |
| read-supplier-number:EXTRACT_READ | 17219 | 17139 | 1 runtime detail; see JSON report |
| read-supplier-number:FETCH_SUPPLIER_DETAIL | 46 |  | 0 runtime details; see JSON report |
| read-supplier-number:SUPPLIER_READ_DISPLAY | 6975 | 6916 | 1 runtime detail; see JSON report |
| read-address-number:EXTRACT_READ | 7666 | 7590 | 1 runtime detail; see JSON report |
| read-address-number:FETCH_ADDRESS_PARENT | 48 |  | 0 runtime details; see JSON report |
| read-address-number:FETCH_ADDRESSES | 47 |  | 0 runtime details; see JSON report |
| read-address-number:ADDRESS_DISPLAY | 8998 | 8898 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 903; 7314; 897; 7310; 897; 7315 |
| outputTokens | 228; 162; 219; 158; 220; 210 |

## Test Data

| Step | Data Source | Evaluation |
| --- | --- | --- |
| query-supplier-name | File replay | Hybrid |
| read-supplier-number | File replay | Hybrid |
| read-address-number | File replay | Hybrid |

## Workflow Run

### Execution Timeline

| Step | Phase Sequence | Node | Event |
| --- | --- | --- | --- |
| query-supplier-name | 1 | START | NODE_EXECUTED |
| query-supplier-name | 2 | EXTRACT_READ | NODE_START |
| query-supplier-name | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| query-supplier-name | 4 | TRANSACTION_ROUTE | NODE_START |
| query-supplier-name | 5 | PREPARE_READ | NODE_EXECUTED |
| query-supplier-name | 6 | READ_ALLOWED | NODE_EXECUTED |
| query-supplier-name | 7 | IS_LIST | NODE_EXECUTED |
| query-supplier-name | 8 | FETCH_SUPPLIERS | NODE_START |
| query-supplier-name | 9 | SHAPE_SUPPLIERS | NODE_EXECUTED |
| query-supplier-name | 10 | STORE_LIST_STATE | NODE_EXECUTED |
| query-supplier-name | 11 | DISPLAY_STAGE | NODE_START |
| query-supplier-name | 12 | SUPPLIER_READ_DISPLAY | NODE_START |
| read-supplier-number | 1 | START | NODE_EXECUTED |
| read-supplier-number | 2 | EXTRACT_READ | NODE_START |
| read-supplier-number | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| read-supplier-number | 4 | TRANSACTION_ROUTE | NODE_START |
| read-supplier-number | 5 | PREPARE_READ | NODE_EXECUTED |
| read-supplier-number | 6 | READ_ALLOWED | NODE_EXECUTED |
| read-supplier-number | 7 | IS_LIST | NODE_EXECUTED |
| read-supplier-number | 8 | FETCH_SUPPLIER_DETAIL | NODE_START |
| read-supplier-number | 9 | SHAPE_DETAIL | NODE_EXECUTED |
| read-supplier-number | 10 | STORE_DETAIL_STATE | NODE_EXECUTED |
| read-supplier-number | 11 | DISPLAY_STAGE | NODE_START |
| read-supplier-number | 12 | SUPPLIER_READ_DISPLAY | NODE_START |
| read-address-number | 1 | START | NODE_EXECUTED |
| read-address-number | 2 | EXTRACT_READ | NODE_START |
| read-address-number | 3 | PREPARE_TRANSACTION | NODE_EXECUTED |
| read-address-number | 4 | TRANSACTION_ROUTE | NODE_START |
| read-address-number | 5 | PREPARE_ADDRESS | NODE_EXECUTED |
| read-address-number | 6 | STORE_ADDRESS_PREPARED | NODE_EXECUTED |
| read-address-number | 7 | ADDRESS_ENTRY | NODE_START |
| read-address-number | 8 | FETCH_ADDRESS_PARENT | NODE_START |
| read-address-number | 9 | CHECK_ADDRESS_PARENT | NODE_EXECUTED |
| read-address-number | 10 | STORE_ADDRESS_PARENT | NODE_EXECUTED |
| read-address-number | 11 | ADDRESS_OPERATION | NODE_START |
| read-address-number | 12 | FETCH_ADDRESSES | NODE_START |
| read-address-number | 13 | SHAPE_ADDRESSES | NODE_EXECUTED |
| read-address-number | 14 | STORE_ADDRESS_LIST | NODE_EXECUTED |
| read-address-number | 15 | ADDRESS_DISPLAY | NODE_START |

### Other Observed Nodes

| Node | Observed |
| --- | --- |
| ADDRESS_DISPLAY | 1 |
| ADDRESS_ENTRY | 1 |
| ADDRESS_OPERATION | 1 |
| CHECK_ADDRESS_PARENT | 1 |
| DISPLAY_STAGE | 2 |
| EXTRACT_READ | 3 |
| FETCH_ADDRESS_PARENT | 1 |
| FETCH_ADDRESSES | 1 |
| FETCH_SUPPLIER_DETAIL | 1 |
| FETCH_SUPPLIERS | 1 |
| IS_LIST | 2 |
| PREPARE_ADDRESS | 1 |
| PREPARE_READ | 2 |
| PREPARE_TRANSACTION | 3 |
| READ_ALLOWED | 2 |
| SHAPE_ADDRESSES | 1 |
| SHAPE_DETAIL | 1 |
| SHAPE_SUPPLIERS | 1 |
| START | 3 |
| STORE_ADDRESS_LIST | 1 |
| STORE_ADDRESS_PARENT | 1 |
| STORE_ADDRESS_PREPARED | 1 |
| STORE_DETAIL_STATE | 1 |
| STORE_LIST_STATE | 1 |
| SUPPLIER_READ_DISPLAY | 2 |
| TRANSACTION_ROUTE | 3 |

## Report Files

- JSON report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-number-manual-regression\result.json`
- Markdown report: `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-number-manual-regression\result.md`
- Test file: `test/workflows/xdx_supplier_core_20260924/supplier-number-manual-regression.json`
