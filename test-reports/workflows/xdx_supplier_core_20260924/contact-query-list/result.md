# Workflow Test Result: contact-query-list

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Scenario:** custom user test
**Test Intent:** Verify ordinary parent-scoped contact exact-name query independently of create confirmation.
**Data Source:** file
**Evaluation:** hybrid
**Workflow Time:** 14625 ms (sum of node times)
**Test Run Time:** 16223 ms
**Test File:** `test/workflows/xdx_supplier_core_20260924/contact-query-list.json`
**JSON Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\contact-query-list\result.json`
**Markdown Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\contact-query-list\result.md`
**HTML Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\contact-query-list\result.html`

## Test Intent

**Type:** custom user test
**Intent:** Verify ordinary parent-scoped contact exact-name query independently of create confirmation.

## Invocation

**Message:** `Find contact with exact ContactName CoreContact20260924, XDX under Supplier ID 300000333814409, limit 1.`
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
<oraInfoDisplay key="contactCore">{"patternId":"multiRecordWidget","title":"Supplier contacts","description":"Supplier XDX Core Supplier 20260924 2130 (300000333814409). count: 1, offset: 0, hasMore: false. No next page.","properties":{"cols":["SupplierContactId","ContactName","FirstName","LastName","Email","PersonProfileId","Status","InactiveDate","UserName","UserAccountStatus"],"rows":[{"cells":["300000333814434","CoreContact20260924, XDX","XDX","CoreContact20260924","xdx-core-contact-20260924@example.invalid","300000333814434","ACTIVE","Not specified","Not specified","Not specified"]}]}}</oraInfoDisplay>
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
| PASS | PREPARE_CONTACT executes | Must execute | PREPARE_CONTACT | Executed |
| PASS | STORE_CONTACT_PREPARED executes | Must execute | STORE_CONTACT_PREPARED | Executed |
| PASS | CONTACT_ENTRY executes | Must execute | CONTACT_ENTRY | Executed |
| PASS | FETCH_CONTACT_PARENT executes | Must execute | FETCH_CONTACT_PARENT | Executed |
| PASS | CHECK_CONTACT_PARENT executes | Must execute | CHECK_CONTACT_PARENT | Executed |
| PASS | STORE_CONTACT_PARENT executes | Must execute | STORE_CONTACT_PARENT | Executed |
| PASS | CONTACT_OPERATION executes | Must execute | CONTACT_OPERATION | Executed |
| PASS | FETCH_CONTACTS executes | Must execute | FETCH_CONTACTS | Executed |
| PASS | SHAPE_CONTACTS executes | Must execute | SHAPE_CONTACTS | Executed |
| PASS | STORE_CONTACT_LIST executes | Must execute | STORE_CONTACT_LIST | Executed |
| PASS | CONTACT_DISPLAY executes | Must execute | CONTACT_DISPLAY | Executed |
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
| PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |


## Semantic Evaluation

**Judge Contract:** model-authored
**Terminal Output Owner:** `CONTACT_DISPLAY`
**Status:** passed
**Provider:** local
**Overall Score:** 5/5
**Minimum Score:** 4/5
**Summary:** Correct parent-scoped contact434 with all ten projected fields and accurate collection paging.

### Criterion Results

| Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- |
| PASS | Response stays grounded in recorded data | The output is grounded in the replayed test data. | The recorded parent and collection inputs select supplier409/contact434; the widget shows that same record only. |
| PASS | Grounded contact fields | The output is grounded in the replayed test data. It identifies supplier300000333814409 and contact300000333814434; all three submitted identity/email fields, ContactName, generated profile ID, status/date and account scalar fields are faithful. | Name XDX/CoreContact20260924, email, ContactName, profile434 and ACTIVE match the response; null inactive/account fields are Not specified. |
| PASS | Native read shape | Supported oraInfoDisplay widget has honest missing values and no create or account-provisioning claim. Count, offset and continuation match the recorded collection envelope. | Complete multiRecordWidget reports count1/offset0/hasMorefalse and No next page; no create or account-provisioning claim. |

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

Workflow time: 14625 ms (sum of node times)
Test run time: 16223 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 8220 | 428 | 8648 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| CONTACT_DISPLAY | 7302 | 197 | 7499 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| EXTRACT_READ | 918 | 231 | 1149 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 2
Total AI Units: 10

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| CONTACT_DISPLAY | 7302 | 197 | 1 | 5 | premium | general |
| EXTRACT_READ | 918 | 231 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| EXTRACT_READ | 9107 | 9026 | 1 runtime detail; see JSON report |
| FETCH_CONTACT_PARENT | 46 |  | 0 runtime details; see JSON report |
| FETCH_CONTACTS | 46 |  | 0 runtime details; see JSON report |
| CONTACT_DISPLAY | 5426 | 5346 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 918; 7302 |
| outputTokens | 231; 197 |

## Test Data

Capture policy: record-now

| Node | Node Type | Capture Mode | Truncated | Items | Response Bytes |
| --- | --- | --- | --- | --- | --- |
| FETCH_CONTACT_PARENT | BO_FUNCTION | raw | no |  | 803 |
| FETCH_CONTACTS | BO_FUNCTION | raw | no | 1 | 561 |

## Workflow Run

**Conversation ID:** workflow-test-contact-query-list-7a5ec733-df3e-4e55-9d9f-d241a8aa620d
**Job ID:** 35a621fc-692d-4713-b6c8-c2bc576ad14b
**Finish Reason:** stop
**Raw Event Count:** 40

| Node | Events | Input Captured | Output Captured |
| --- | --- | --- | --- |
| START | NODE_EXECUTED | yes | yes |
| EXTRACT_READ | NODE_START, NODE_END | yes | yes |
| PREPARE_TRANSACTION | NODE_EXECUTED | yes | yes |
| TRANSACTION_ROUTE | NODE_START, NODE_END | yes | yes |
| PREPARE_CONTACT | NODE_EXECUTED | yes | yes |
| STORE_CONTACT_PREPARED | NODE_EXECUTED | yes | yes |
| CONTACT_ENTRY | NODE_START, NODE_END | yes | yes |
| FETCH_CONTACT_PARENT | NODE_START, NODE_END | yes | yes |
| CHECK_CONTACT_PARENT | NODE_EXECUTED | yes | yes |
| STORE_CONTACT_PARENT | NODE_EXECUTED | yes | yes |
| CONTACT_OPERATION | NODE_START, NODE_END | yes | yes |
| FETCH_CONTACTS | NODE_START, NODE_END | yes | yes |
| SHAPE_CONTACTS | NODE_EXECUTED | yes | yes |
| STORE_CONTACT_LIST | NODE_EXECUTED | yes | yes |
| CONTACT_DISPLAY | NODE_START, NODE_END | yes | yes |
