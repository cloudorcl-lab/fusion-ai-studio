# Workflow Test Result: supplier-query-guidance

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Scenario:** custom user test
**Test Intent:** Verify unsupported Query is withheld with scope guidance and no BO execution.
**Data Source:** file
**Evaluation:** hybrid
**Workflow Time:** 18301 ms (sum of node times)
**Test Run Time:** 19243 ms
**Test File:** `test/workflows/xdx_supplier_core_20260924/supplier-query-guidance.json`
**JSON Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-query-guidance\result.json`
**Markdown Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-query-guidance\result.md`
**HTML Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\supplier-query-guidance\result.html`

## Test Intent

**Type:** custom user test
**Intent:** Verify unsupported Query is withheld with scope guidance and no BO execution.

## Invocation

**Message:** `Delete the selected supplier.`
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
<oraInfoDisplay key="supplierGuidance">{"patternId":"cardWidget","title":"Supplier request guidance","properties":{"subject":"Request not executed","summary":"Supported reads are supplier, address, site and contact list, exact-name search, next page and selected detail. Child reads require a selected supplier."}}</oraInfoDisplay>
```

## Verification Summary

| Verification | Status | Result |
| --- | --- | --- |
| Path assertions | PASSED | 113/113 passed |
| Semantic evaluation | PASSED | 2/2 passed |
| Workflow run checks | PASSED | 1/1 passed |
| Output checks | PASSED | 2/2 passed |

## Path Assertions

| Status | Assertion | Requirement | Node Code | Observed or Failure |
| --- | --- | --- | --- | --- |
| PASS | EXTRACT_READ executes | Must execute | EXTRACT_READ | Executed |
| PASS | PREPARE_TRANSACTION executes | Must execute | PREPARE_TRANSACTION | Executed |
| PASS | TRANSACTION_ROUTE executes | Must execute | TRANSACTION_ROUTE | Executed |
| PASS | PREPARE_READ executes | Must execute | PREPARE_READ | Executed |
| PASS | READ_ALLOWED executes | Must execute | READ_ALLOWED | Executed |
| PASS | READ_GUIDANCE executes | Must execute | READ_GUIDANCE | Executed |
| PASS | IS_LIST is withheld | Must not execute | IS_LIST | Not executed |
| PASS | FETCH_SUPPLIERS is withheld | Must not execute | FETCH_SUPPLIERS | Not executed |
| PASS | SHAPE_SUPPLIERS is withheld | Must not execute | SHAPE_SUPPLIERS | Not executed |
| PASS | STORE_LIST_STATE is withheld | Must not execute | STORE_LIST_STATE | Not executed |
| PASS | DISPLAY_STAGE is withheld | Must not execute | DISPLAY_STAGE | Not executed |
| PASS | INIT_DISPLAY is withheld | Must not execute | INIT_DISPLAY | Not executed |
| PASS | SUPPLIER_READ_DISPLAY is withheld | Must not execute | SUPPLIER_READ_DISPLAY | Not executed |
| PASS | FETCH_SUPPLIER_DETAIL is withheld | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| PASS | SHAPE_DETAIL is withheld | Must not execute | SHAPE_DETAIL | Not executed |
| PASS | STORE_DETAIL_STATE is withheld | Must not execute | STORE_DETAIL_STATE | Not executed |
| PASS | STORE_PREPARED_TRANSACTION is withheld | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| PASS | SUPPLIER_TRANSACTION_DISPLAY is withheld | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
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
| PASS | SITE_DISPLAY stays inactive | Must not execute | SITE_DISPLAY | Not executed |
| PASS | CONTACT_DISPLAY stays inactive | Must not execute | CONTACT_DISPLAY | Not executed |


## Semantic Evaluation

**Judge Contract:** model-authored
**Terminal Output Owner:** `READ_GUIDANCE`
**Status:** passed
**Provider:** local
**Overall Score:** 5/5
**Minimum Score:** 4/5
**Summary:** Unsupported request withheld with truthful four-resource read guidance.

### Criterion Results

| Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- |
| PASS | Response stays grounded in recorded data | The output is grounded in the replayed test data. | The response uses the request-validation result; no service data or business operation is fabricated. |
| PASS | Honest scope guidance | The output is grounded in the replayed test data and request validation result. It explains supported read operations and does not claim deletion, creation or a service result. | The supported cardWidget says Request not executed and names supplier/address/site/contact list, exact-name search, paging and selected detail with required child parent. No delete/create claim. |

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
| PASS | Explains supported read operations | contains | Supported reads are supplier, address, site and contact list, exact-name search, next page and selected detail. Child reads require a selected supplier. | Found "Supported reads are supplier, address, site and contact list, exact-name search, next page and selected detail. Child reads require a selected supplier." |



## Runtime Metrics

Workflow time: 18301 ms (sum of node times)
Test run time: 19243 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 8118 | 311 | 8429 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 895 | 216 | 1111 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| READ_GUIDANCE | 7223 | 95 | 7318 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 2
Total AI Units: 10

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 895 | 216 | 1 | 5 | premium | general |
| READ_GUIDANCE | 7223 | 95 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| EXTRACT_READ | 12753 | 12647 | 1 runtime detail; see JSON report |
| READ_GUIDANCE | 5548 | 5472 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 895; 7223 |
| outputTokens | 216; 95 |

## Test Data

Capture policy: model-generated

| Node | Node Type | Capture Mode | Truncated | Items | Response Bytes |
| --- | --- | --- | --- | --- | --- |

## Workflow Run

**Conversation ID:** workflow-test-supplier-query-guidance-96ee33c8-c5c7-4172-a854-e421d93add52
**Job ID:** 6ed943bb-36d0-40a2-af7e-e6b5bb8b36a7
**Finish Reason:** stop
**Raw Event Count:** 18

| Node | Events | Input Captured | Output Captured |
| --- | --- | --- | --- |
| START | NODE_EXECUTED | yes | yes |
| EXTRACT_READ | NODE_START, NODE_END | yes | yes |
| PREPARE_TRANSACTION | NODE_EXECUTED | yes | yes |
| TRANSACTION_ROUTE | NODE_START, NODE_END | yes | yes |
| PREPARE_READ | NODE_EXECUTED | yes | yes |
| READ_ALLOWED | NODE_EXECUTED | yes | yes |
| READ_GUIDANCE | NODE_START, NODE_END | yes | yes |
