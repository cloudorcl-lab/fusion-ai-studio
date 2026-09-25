# Workflow Test Result: site-query-list

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Scenario:** custom user test
**Test Intent:** Verify ordinary parent-scoped site exact-name query independently of create confirmation.
**Data Source:** file
**Evaluation:** hybrid
**Workflow Time:** 16708 ms (sum of node times)
**Test Run Time:** 18314 ms
**Test File:** `test/workflows/xdx_supplier_core_20260924/site-query-list.json`
**JSON Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\site-query-list\result.json`
**Markdown Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\site-query-list\result.md`
**HTML Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\site-query-list\result.html`

## Test Intent

**Type:** custom user test
**Intent:** Verify ordinary parent-scoped site exact-name query independently of create confirmation.

## Invocation

**Message:** `Find site with exact SupplierSite XDX Core Site 20260924 for Supplier ID 300000333814409, page size 1.`
**Trigger Type:** app
**Single Turn:** no

```json
{
  "appHint": "Query",
  "OraAppContext": "",
  "OraUserContext": ""
}
```

## Final Output

```text
<oraInfoDisplay key="siteCore">{"patternId":"multiRecordWidget","title":"Supplier sites","description":"Supplier XDX Core Supplier 20260924 2130 (300000333814409). count: 1, offset: 0, hasMore: false. No next page.","properties":{"cols":["SupplierSiteId","SupplierSite","ProcurementBUId","SupplierAddressName","SitePurposePurchasingFlag","ProcurementBU","SupplierAddressId","Status","InactiveDate"],"rows":[{"cells":["300000333814424","XDX Core Site 20260924","300000046987012","XDX Core Address 20260924","true","US1 Business Unit","300000333814416","ACTIVE","Not specified"]}]}}</oraInfoDisplay>
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
| PASS | PREPARE_SITE executes | Must execute | PREPARE_SITE | Executed |
| PASS | STORE_SITE_PREPARED executes | Must execute | STORE_SITE_PREPARED | Executed |
| PASS | SITE_ENTRY executes | Must execute | SITE_ENTRY | Executed |
| PASS | FETCH_SITE_PARENT executes | Must execute | FETCH_SITE_PARENT | Executed |
| PASS | CHECK_SITE_PARENT executes | Must execute | CHECK_SITE_PARENT | Executed |
| PASS | STORE_SITE_PARENT executes | Must execute | STORE_SITE_PARENT | Executed |
| PASS | SITE_OPERATION executes | Must execute | SITE_OPERATION | Executed |
| PASS | FETCH_SITES executes | Must execute | FETCH_SITES | Executed |
| PASS | SHAPE_SITES executes | Must execute | SHAPE_SITES | Executed |
| PASS | STORE_SITE_LIST executes | Must execute | STORE_SITE_LIST | Executed |
| PASS | SITE_DISPLAY executes | Must execute | SITE_DISPLAY | Executed |
| PASS | PREPARE_READ stays inactive | Must not execute | PREPARE_READ | Not executed |
| PASS | READ_ALLOWED stays inactive | Must not execute | READ_ALLOWED | Not executed |
| PASS | READ_GUIDANCE stays inactive | Must not execute | READ_GUIDANCE | Not executed |
| PASS | IS_LIST stays inactive | Must not execute | IS_LIST | Not executed |
| PASS | FETCH_SUPPLIERS stays inactive | Must not execute | FETCH_SUPPLIERS | Not executed |
| PASS | SHAPE_SUPPLIERS stays inactive | Must not execute | SHAPE_SUPPLIERS | Not executed |
| PASS | STORE_LIST_STATE stays inactive | Must not execute | STORE_LIST_STATE | Not executed |
| PASS | DISPLAY_STAGE stays inactive | Must not execute | DISPLAY_STAGE | Not executed |
| PASS | INIT_DISPLAY stays inactive | Must not execute | INIT_DISPLAY | Not executed |
| PASS | SUPPLIER_READ_DISPLAY stays inactive | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| PASS | FETCH_SUPPLIER_DETAIL stays inactive | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| PASS | SHAPE_DETAIL stays inactive | Must not execute | SHAPE_DETAIL | Not executed |
| PASS | STORE_DETAIL_STATE stays inactive | Must not execute | STORE_DETAIL_STATE | Not executed |
| PASS | STORE_PREPARED_TRANSACTION stays inactive | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| PASS | SUPPLIER_TRANSACTION_DISPLAY stays inactive | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| PASS | CHECK_SUPPLIER_DUPLICATE stays inactive | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| PASS | AUTHORIZE_SUPPLIER_WRITE stays inactive | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| PASS | STORE_PREFLIGHT_TRANSACTION stays inactive | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| PASS | SUPPLIER_WRITE_ROUTE stays inactive | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| PASS | CREATE_SUPPLIER stays inactive | Must not execute | CREATE_SUPPLIER | Not executed |
| PASS | CAPTURE_SUPPLIER_CREATE stays inactive | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| PASS | STORE_CREATE_RECEIPT stays inactive | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| PASS | CREATE_HAS_ID stays inactive | Must not execute | CREATE_HAS_ID | Not executed |
| PASS | GET_CREATED_SUPPLIER stays inactive | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| PASS | VERIFY_SUPPLIER_CREATE stays inactive | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| PASS | STORE_VERIFIED_TRANSACTION stays inactive | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| PASS | PREPARE_ADDRESS stays inactive | Must not execute | PREPARE_ADDRESS | Not executed |
| PASS | STORE_ADDRESS_PREPARED stays inactive | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| PASS | ADDRESS_ENTRY stays inactive | Must not execute | ADDRESS_ENTRY | Not executed |
| PASS | ADDRESS_DISPLAY stays inactive | Must not execute | ADDRESS_DISPLAY | Not executed |
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
| PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |


## Semantic Evaluation

**Judge Contract:** model-authored
**Terminal Output Owner:** `SITE_DISPLAY`
**Status:** passed
**Provider:** local
**Overall Score:** 5/5
**Minimum Score:** 4/5
**Summary:** Grounded nine-field site result with correct parent and references.

### Criterion Results

| Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- |
| PASS | Response stays grounded in recorded data | The output is grounded in the replayed test data. | Parent409/site424 match recorded parent and site GETs; no extra record appears. |
| PASS | Grounded fields | The output is grounded in the replayed test data. Correct supplier300000333814409 and site300000333814424, all four submitted fields and returned BU/address/status/date fields are shown accurately. | All nine fields match: site name, BU012/US1, address name/416, purchasingtrue, ACTIVE and null inactive date. |
| PASS | Native read shape | One supported oraInfoDisplay widget has honest missing values and no write claim. Count, offset and continuation match the recorded envelope. | Supported widget reports count1/offset0/hasMorefalse, No next page and an honest missing inactive date; no write claim. |

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

Workflow time: 16708 ms (sum of node times)
Test run time: 18314 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 8221 | 428 | 8649 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 919 | 231 | 1150 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| SITE_DISPLAY | 7302 | 197 | 7499 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 2
Total AI Units: 10

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 919 | 231 | 1 | 5 | premium | general |
| SITE_DISPLAY | 7302 | 197 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| EXTRACT_READ | 9117 | 9014 | 1 runtime detail; see JSON report |
| FETCH_SITE_PARENT | 47 |  | 0 runtime details; see JSON report |
| FETCH_SITES | 45 |  | 0 runtime details; see JSON report |
| SITE_DISPLAY | 7499 | 7411 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 919; 7302 |
| outputTokens | 231; 197 |

## Test Data

Capture policy: record-now

| Node | Node Type | Capture Mode | Truncated | Items | Response Bytes |
| --- | --- | --- | --- | --- | --- |
| FETCH_SITE_PARENT | BO_FUNCTION | raw | no |  | 803 |
| FETCH_SITES | BO_FUNCTION | raw | no | 1 | 562 |

## Workflow Run

**Conversation ID:** workflow-test-site-query-list-153870b7-ea37-4990-b138-6c2b2394c600
**Job ID:** 8ba337c2-df64-4174-8c1a-802c074419e5
**Finish Reason:** stop
**Raw Event Count:** 40

| Node | Events | Input Captured | Output Captured |
| --- | --- | --- | --- |
| START | NODE_EXECUTED | yes | yes |
| EXTRACT_READ | NODE_START, NODE_END | yes | yes |
| PREPARE_TRANSACTION | NODE_EXECUTED | yes | yes |
| TRANSACTION_ROUTE | NODE_START, NODE_END | yes | yes |
| PREPARE_SITE | NODE_EXECUTED | yes | yes |
| STORE_SITE_PREPARED | NODE_EXECUTED | yes | yes |
| SITE_ENTRY | NODE_START, NODE_END | yes | yes |
| FETCH_SITE_PARENT | NODE_START, NODE_END | yes | yes |
| CHECK_SITE_PARENT | NODE_EXECUTED | yes | yes |
| STORE_SITE_PARENT | NODE_EXECUTED | yes | yes |
| SITE_OPERATION | NODE_START, NODE_END | yes | yes |
| FETCH_SITES | NODE_START, NODE_END | yes | yes |
| SHAPE_SITES | NODE_EXECUTED | yes | yes |
| STORE_SITE_LIST | NODE_EXECUTED | yes | yes |
| SITE_DISPLAY | NODE_START, NODE_END | yes | yes |
