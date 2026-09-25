# Workflow Test Result: supplier-query-detail

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Scenario:** custom user test
**Test Intent:** Verify supplier scalar detail through the supported native Query route.
**Data Source:** file
**Evaluation:** hybrid
**Workflow Time:** 11647 ms (sum of node times)
**Test Run Time:** 15433 ms
**Test File:** `test/workflows/xdx_supplier_core_20260924/supplier-query-detail.json`
**JSON Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-query-detail\result.json`
**Markdown Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-query-detail\result.md`
**HTML Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-query-detail\result.html`

## Test Intent

**Type:** custom user test
**Intent:** Verify supplier scalar detail through the supported native Query route.

## Invocation

**Message:** `Show supplier detail for Supplier ID 300000047414679.`
**Trigger Type:** app
**Single Turn:** no

```json
{
  "OraAppContext": "",
  "appHint": "Query",
  "OraUserContext": ""
}
```

## Final Output

```text
<oraInfoDisplay key="supplierRead">{"patternId":"multiRecordWidget","title":"Supplier detail","description":"Verified scalar supplier profile for 300000047414679.","properties":{"cols":["Supplier ID","Supplier number","Supplier","Supplier type","Business relationship","Inactive date","Status","Alternate name","Tax organization type","Corporate website"],"rows":[{"cells":["300000047414679","1255","Dell Inc.","Not specified","Spend Authorized","Not specified","ACTIVE","Dell Inc","Corporation","www.dell.com"]}]}}</oraInfoDisplay>
```

## Verification Summary

| Verification | Status | Result |
| --- | --- | --- |
| Path assertions | PASSED | 113/113 passed |
| Semantic evaluation | PASSED | 3/3 passed |
| Workflow run checks | PASSED | 1/1 passed |
| Output checks | PASSED | 1/1 passed |

## Path Assertions

| Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- |
| PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| PASS | PREPARE_READ executes | Must execute | PREPARE_READ | Executed |
| PASS | READ_ALLOWED executes | Must execute | READ_ALLOWED | Executed |
| PASS | IS_LIST executes | Must execute | IS_LIST | Executed |
| PASS | DISPLAY_STAGE executes | Must execute | DISPLAY_STAGE | Executed |
| PASS | FETCH_SUPPLIER_DETAIL executes | Must execute | FETCH_SUPPLIER_DETAIL | Executed |
| PASS | SHAPE_DETAIL executes | Must execute | SHAPE_DETAIL | Executed |
| PASS | STORE_DETAIL_STATE executes | Must execute | STORE_DETAIL_STATE | Executed |
| PASS | SUPPLIER_READ_DISPLAY executes | Must execute | SUPPLIER_READ_DISPLAY | Executed |
| PASS | FETCH_SUPPLIERS is withheld | Must not execute | FETCH_SUPPLIERS | Not executed |
| PASS | SHAPE_SUPPLIERS is withheld | Must not execute | SHAPE_SUPPLIERS | Not executed |
| PASS | STORE_LIST_STATE is withheld | Must not execute | STORE_LIST_STATE | Not executed |
| PASS | STORE_PREPARED_TRANSACTION is withheld | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| PASS | CHECK_SUPPLIER_DUPLICATE is withheld | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| PASS | AUTHORIZE_SUPPLIER_WRITE is withheld | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| PASS | STORE_PREFLIGHT_TRANSACTION is withheld | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| PASS | SUPPLIER_WRITE_ROUTE is withheld | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| PASS | CREATE_SUPPLIER is withheld | Must not execute | CREATE_SUPPLIER | Not executed |
| PASS | CAPTURE_SUPPLIER_CREATE is withheld | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| PASS | STORE_CREATE_RECEIPT is withheld | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| PASS | CREATE_HAS_ID is withheld | Must not execute | CREATE_HAS_ID | Not executed |
| PASS | GET_CREATED_SUPPLIER is withheld | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| PASS | VERIFY_SUPPLIER_CREATE is withheld | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| PASS | STORE_VERIFIED_TRANSACTION is withheld | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| PASS | FETCH_ADDRESS_PARENT stays inactive | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| PASS | CHECK_ADDRESS_PARENT stays inactive | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| PASS | STORE_ADDRESS_PARENT stays inactive | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| PASS | ADDRESS_OPERATION stays inactive | Must not execute | ADDRESS_OPERATION | Not executed |
| PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
| PASS | FETCH_ADDRESS_DETAIL stays inactive | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| PASS | SHAPE_ADDRESS_DETAIL stays inactive | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| PASS | STORE_ADDRESS_DETAIL stays inactive | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| PASS | ADDRESS_DUPLICATE_INPUT stays inactive | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| PASS | CHECK_ADDRESS_DUPLICATE stays inactive | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| PASS | AUTHORIZE_ADDRESS_WRITE stays inactive | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| PASS | STORE_ADDRESS_ATTEMPT stays inactive | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| PASS | ADDRESS_WRITE_ROUTE stays inactive | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| PASS | CREATE_ADDRESS stays inactive | Must not execute | CREATE_ADDRESS | Not executed |
| PASS | CAPTURE_ADDRESS_CREATE stays inactive | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| PASS | STORE_ADDRESS_RECEIPT stays inactive | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| PASS | ADDRESS_HAS_ID stays inactive | Must not execute | ADDRESS_HAS_ID | Not executed |
| PASS | GET_CREATED_ADDRESS stays inactive | Must not execute | GET_CREATED_ADDRESS | Not executed |
| PASS | VERIFY_ADDRESS_CREATE stays inactive | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| PASS | STORE_ADDRESS_VERIFIED stays inactive | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| PASS | PREPARE_SITE stays inactive | Must not execute | PREPARE_SITE | Not executed |
| PASS | STORE_SITE_PREPARED stays inactive | Must not execute | STORE_SITE_PREPARED | Not executed |
| PASS | SITE_ENTRY stays inactive | Must not execute | SITE_ENTRY | Not executed |
| PASS | FETCH_SITE_PARENT stays inactive | Must not execute | FETCH_SITE_PARENT | Not executed |
| PASS | CHECK_SITE_PARENT stays inactive | Must not execute | CHECK_SITE_PARENT | Not executed |
| PASS | STORE_SITE_PARENT stays inactive | Must not execute | STORE_SITE_PARENT | Not executed |
| PASS | SITE_OPERATION stays inactive | Must not execute | SITE_OPERATION | Not executed |
| PASS | FETCH_SITES stays inactive | Must not execute | FETCH_SITES | Not executed |
| PASS | SHAPE_SITES stays inactive | Must not execute | SHAPE_SITES | Not executed |
| PASS | STORE_SITE_LIST stays inactive | Must not execute | STORE_SITE_LIST | Not executed |
| PASS | FETCH_SITE_DETAIL stays inactive | Must not execute | FETCH_SITE_DETAIL | Not executed |
| PASS | SHAPE_SITE_DETAIL stays inactive | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| PASS | STORE_SITE_DETAIL stays inactive | Must not execute | STORE_SITE_DETAIL | Not executed |
| PASS | SITE_REFERENCE_INPUT stays inactive | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| PASS | FETCH_SITE_ADDRESS_REFERENCE stays inactive | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| PASS | FETCH_SITE_BU_REFERENCE stays inactive | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| PASS | CHECK_SITE_REFERENCES stays inactive | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| PASS | STORE_SITE_REFERENCES stays inactive | Must not execute | STORE_SITE_REFERENCES | Not executed |
| PASS | SITE_REFERENCES_ROUTE stays inactive | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| PASS | SITE_DUPLICATE_INPUT stays inactive | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| PASS | CHECK_SITE_DUPLICATE stays inactive | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| PASS | AUTHORIZE_SITE_WRITE stays inactive | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| PASS | STORE_SITE_ATTEMPT stays inactive | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| PASS | SITE_WRITE_ROUTE stays inactive | Must not execute | SITE_WRITE_ROUTE | Not executed |
| PASS | CREATE_SITE stays inactive | Must not execute | CREATE_SITE | Not executed |
| PASS | CAPTURE_SITE_CREATE stays inactive | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| PASS | STORE_SITE_RECEIPT stays inactive | Must not execute | STORE_SITE_RECEIPT | Not executed |
| PASS | SITE_HAS_ID stays inactive | Must not execute | SITE_HAS_ID | Not executed |
| PASS | GET_CREATED_SITE stays inactive | Must not execute | GET_CREATED_SITE | Not executed |
| PASS | VERIFY_SITE_CREATE stays inactive | Must not execute | VERIFY_SITE_CREATE | Not executed |
| PASS | STORE_SITE_VERIFIED stays inactive | Must not execute | STORE_SITE_VERIFIED | Not executed |
| PASS | PREPARE_CONTACT stays inactive | Must not execute | PREPARE_CONTACT | Not executed |
| PASS | STORE_CONTACT_PREPARED stays inactive | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| PASS | CONTACT_ENTRY stays inactive | Must not execute | CONTACT_ENTRY | Not executed |
| PASS | FETCH_CONTACT_PARENT stays inactive | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| PASS | CHECK_CONTACT_PARENT stays inactive | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| PASS | STORE_CONTACT_PARENT stays inactive | Must not execute | STORE_CONTACT_PARENT | Not executed |
| PASS | CONTACT_OPERATION stays inactive | Must not execute | CONTACT_OPERATION | Not executed |
| PASS | FETCH_CONTACTS stays inactive | Must not execute | FETCH_CONTACTS | Not executed |
| PASS | SHAPE_CONTACTS stays inactive | Must not execute | SHAPE_CONTACTS | Not executed |
| PASS | STORE_CONTACT_LIST stays inactive | Must not execute | STORE_CONTACT_LIST | Not executed |
| PASS | FETCH_CONTACT_DETAIL stays inactive | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| PASS | SHAPE_CONTACT_DETAIL stays inactive | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| PASS | STORE_CONTACT_DETAIL stays inactive | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| PASS | CONTACT_DUPLICATE_INPUT stays inactive | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| PASS | CHECK_CONTACT_DUPLICATE stays inactive | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| PASS | AUTHORIZE_CONTACT_WRITE stays inactive | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| PASS | STORE_CONTACT_ATTEMPT stays inactive | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| PASS | CONTACT_WRITE_ROUTE stays inactive | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| PASS | CREATE_CONTACT stays inactive | Must not execute | CREATE_CONTACT | Not executed |
| PASS | CAPTURE_CONTACT_CREATE stays inactive | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| PASS | STORE_CONTACT_RECEIPT stays inactive | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| PASS | CONTACT_HAS_ID stays inactive | Must not execute | CONTACT_HAS_ID | Not executed |
| PASS | GET_CREATED_CONTACT stays inactive | Must not execute | GET_CREATED_CONTACT | Not executed |
| PASS | VERIFY_CONTACT_CREATE stays inactive | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| PASS | STORE_CONTACT_VERIFIED stays inactive | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| PASS | READ_GUIDANCE is withheld | Must not execute | READ_GUIDANCE | Not executed |
| PASS | INIT_DISPLAY is withheld | Must not execute | INIT_DISPLAY | Not executed |
| PASS | SUPPLIER_TRANSACTION_DISPLAY is withheld | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
| PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |


## Semantic Evaluation

**Judge Contract:** model-authored
**Terminal Output Owner:** `SUPPLIER_READ_DISPLAY`
**Status:** passed
**Provider:** local
**Overall Score:** 5/5
**Minimum Score:** 4/5
**Summary:** Complete ten-field Dell scalar profile, grounded in GET with no paging or child/write claims.

### Criterion Results

| Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- |
| PASS | Response stays grounded in recorded data | The output is grounded in the replayed test data. | Selected supplier300000047414679 is the recorded GET input and returned ID. |
| PASS | Grounded detail | The output is grounded in the replayed test data. Supplier ID, number, name, type, relationship, inactive date, status, alternate name, tax organization type and website are accurate. | Number1255, Dell Inc., Spend Authorized, ACTIVE, alternate Dell Inc, Corporation and www.dell.com match; null type/date are Not specified. |
| PASS | Complete native detail | A supported oraInfoDisplay widget presents all ten fields and identifies the selected supplier, with no fabricated children or writes. | One supported multiRecordWidget presents all ten projected fields with the selected ID and no invented children, pagination or writes. |

### Unsupported Claims

None.

## Workflow Run Checks

| Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- |
| PASS | Workflow completed without error | Workflow completed without error | Workflow execution must not finish with error. | Verified |

## Output Checks

| Status | Assertion | Check | Expected | Observed or Failure |
| --- | --- | --- | --- | --- |
| PASS | Final output produced | Final output produced | Workflow execution must produce a final answer. | Verified |



## Runtime Metrics

Workflow time: 11647 ms (sum of node times)
Test run time: 15433 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 8208 | 373 | 8581 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 903 | 220 | 1123 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| SUPPLIER_READ_DISPLAY | 7305 | 153 | 7458 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 2
Total AI Units: 10

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 903 | 220 | 1 | 5 | premium | general |
| SUPPLIER_READ_DISPLAY | 7305 | 153 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| EXTRACT_READ | 5816 | 5739 | 1 runtime detail; see JSON report |
| FETCH_SUPPLIER_DETAIL | 46 |  | 0 runtime details; see JSON report |
| SUPPLIER_READ_DISPLAY | 5785 | 5712 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 903; 7305 |
| outputTokens | 220; 153 |

## Test Data

Capture policy: record-now

| Node | Node Type | Capture Mode | Truncated | Items | Response Bytes |
| --- | --- | --- | --- | --- | --- |
| FETCH_SUPPLIER_DETAIL | BO_FUNCTION | raw | no |  | 827 |

## Workflow Run

**Conversation ID:** workflow-test-supplier-query-detail-cf84907c-79c0-465e-9e1a-5615782a08fd
**Job ID:** 622cb024-cfb8-4187-b77e-d862b0fbf040
**Finish Reason:** stop
**Raw Event Count:** 30

| Node | Events | Input Captured | Output Captured |
| --- | --- | --- | --- |
| START | NODE_EXECUTED | yes | yes |
| EXTRACT_READ | NODE_START, NODE_END | yes | yes |
| PREPARE_TRANSACTION | NODE_EXECUTED | yes | yes |
| TRANSACTION_ROUTE | NODE_START, NODE_END | yes | yes |
| PREPARE_READ | NODE_EXECUTED | yes | yes |
| READ_ALLOWED | NODE_EXECUTED | yes | yes |
| IS_LIST | NODE_EXECUTED | yes | yes |
| FETCH_SUPPLIER_DETAIL | NODE_START, NODE_END | yes | yes |
| SHAPE_DETAIL | NODE_EXECUTED | yes | yes |
| STORE_DETAIL_STATE | NODE_EXECUTED | yes | yes |
| DISPLAY_STAGE | NODE_START, NODE_END | yes | yes |
| SUPPLIER_READ_DISPLAY | NODE_START, NODE_END | yes | yes |
