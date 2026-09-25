# Workflow Test Result: query

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Scenario:** sync-plan app-stage
**Test Intent:** Verify the workflow routes the Agentic App Query trigger context through its dedicated app-stage path and returns the expected app-stage output.
**Data Source:** file
**Evaluation:** hybrid
**Workflow Time:** 14821 ms (sum of node times)
**Test Run Time:** 16698 ms
**Test File:** `test/workflows/xdx_supplier_core_20260924/query.json`
**JSON Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\query\result.json`
**Markdown Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\query\result.md`
**HTML Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\query\result.html`

## Test Intent

**Type:** sync-plan app-stage
**Intent:** Verify the workflow routes the Agentic App Query trigger context through its dedicated app-stage path and returns the expected app-stage output.

## Invocation

**Message:** `List suppliers, page size 5.`
**Trigger Type:** app
**Single Turn:** no

```json
{
  "appHint": "Query",
  "OraUserContext": "",
  "OraAppContext": ""
}
```

## Final Output

```text
<oraInfoDisplay key="supplierRead">{"patternId":"multiRecordWidget","title":"Supplier query results","description":"Page of supplier results. count: 5, offset: 0, hasMore: false, nextOffset: Not specified. No next page. Use a returned Supplier ID for detail.","properties":{"cols":["Supplier ID","Supplier number","Supplier","Supplier type","Business relationship","Inactive date"],"rows":[{"cells":["300000047414503","1252","Lee Supplies","Supplier","Spend Authorized","Not specified"]},{"cells":["300000047414571","1253","Staffing Services","Services","Spend Authorized","Not specified"]},{"cells":["300000047414635","1254","JGA","Supplier","Spend Authorized","Not specified"]},{"cells":["300000047414679","1255","Dell Inc.","Not specified","Spend Authorized","Not specified"]},{"cells":["300000047507113","1256","US Gas and Electric","Not specified","Spend Authorized","Not specified"]}]}}</oraInfoDisplay>
```

## Verification Summary

| Verification | Status | Result |
| --- | --- | --- |
| Path assertions | PASSED | 113/113 passed |
| Semantic evaluation | PASSED | 4/4 passed |
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
| PASS | FETCH_SUPPLIERS executes | Must execute | FETCH_SUPPLIERS | Executed |
| PASS | SHAPE_SUPPLIERS executes | Must execute | SHAPE_SUPPLIERS | Executed |
| PASS | STORE_LIST_STATE executes | Must execute | STORE_LIST_STATE | Executed |
| PASS | DISPLAY_STAGE executes | Must execute | DISPLAY_STAGE | Executed |
| PASS | SUPPLIER_READ_DISPLAY executes | Must execute | SUPPLIER_READ_DISPLAY | Executed |
| PASS | STORE_PREPARED_TRANSACTION does not execute | Must not execute | STORE_PREPARED_TRANSACTION | Not executed |
| PASS | SUPPLIER_TRANSACTION_DISPLAY does not execute | Must not execute | SUPPLIER_TRANSACTION_DISPLAY | Not executed |
| PASS | CHECK_SUPPLIER_DUPLICATE does not execute | Must not execute | CHECK_SUPPLIER_DUPLICATE | Not executed |
| PASS | AUTHORIZE_SUPPLIER_WRITE does not execute | Must not execute | AUTHORIZE_SUPPLIER_WRITE | Not executed |
| PASS | STORE_PREFLIGHT_TRANSACTION does not execute | Must not execute | STORE_PREFLIGHT_TRANSACTION | Not executed |
| PASS | SUPPLIER_WRITE_ROUTE does not execute | Must not execute | SUPPLIER_WRITE_ROUTE | Not executed |
| PASS | CREATE_SUPPLIER does not execute | Must not execute | CREATE_SUPPLIER | Not executed |
| PASS | CAPTURE_SUPPLIER_CREATE does not execute | Must not execute | CAPTURE_SUPPLIER_CREATE | Not executed |
| PASS | STORE_CREATE_RECEIPT does not execute | Must not execute | STORE_CREATE_RECEIPT | Not executed |
| PASS | CREATE_HAS_ID does not execute | Must not execute | CREATE_HAS_ID | Not executed |
| PASS | GET_CREATED_SUPPLIER does not execute | Must not execute | GET_CREATED_SUPPLIER | Not executed |
| PASS | VERIFY_SUPPLIER_CREATE does not execute | Must not execute | VERIFY_SUPPLIER_CREATE | Not executed |
| PASS | STORE_VERIFIED_TRANSACTION does not execute | Must not execute | STORE_VERIFIED_TRANSACTION | Not executed |
| PASS | PREPARE_ADDRESS does not execute | Must not execute | PREPARE_ADDRESS | Not executed |
| PASS | STORE_ADDRESS_PREPARED does not execute | Must not execute | STORE_ADDRESS_PREPARED | Not executed |
| PASS | ADDRESS_ENTRY does not execute | Must not execute | ADDRESS_ENTRY | Not executed |
| PASS | ADDRESS_DISPLAY does not execute | Must not execute | ADDRESS_DISPLAY | Not executed |
| PASS | FETCH_ADDRESS_PARENT does not execute | Must not execute | FETCH_ADDRESS_PARENT | Not executed |
| PASS | CHECK_ADDRESS_PARENT does not execute | Must not execute | CHECK_ADDRESS_PARENT | Not executed |
| PASS | STORE_ADDRESS_PARENT does not execute | Must not execute | STORE_ADDRESS_PARENT | Not executed |
| PASS | ADDRESS_OPERATION does not execute | Must not execute | ADDRESS_OPERATION | Not executed |
| PASS | FETCH_ADDRESSES does not execute | Must not execute | FETCH_ADDRESSES | Not executed |
| PASS | SHAPE_ADDRESSES does not execute | Must not execute | SHAPE_ADDRESSES | Not executed |
| PASS | STORE_ADDRESS_LIST does not execute | Must not execute | STORE_ADDRESS_LIST | Not executed |
| PASS | FETCH_ADDRESS_DETAIL does not execute | Must not execute | FETCH_ADDRESS_DETAIL | Not executed |
| PASS | SHAPE_ADDRESS_DETAIL does not execute | Must not execute | SHAPE_ADDRESS_DETAIL | Not executed |
| PASS | STORE_ADDRESS_DETAIL does not execute | Must not execute | STORE_ADDRESS_DETAIL | Not executed |
| PASS | ADDRESS_DUPLICATE_INPUT does not execute | Must not execute | ADDRESS_DUPLICATE_INPUT | Not executed |
| PASS | CHECK_ADDRESS_DUPLICATE does not execute | Must not execute | CHECK_ADDRESS_DUPLICATE | Not executed |
| PASS | AUTHORIZE_ADDRESS_WRITE does not execute | Must not execute | AUTHORIZE_ADDRESS_WRITE | Not executed |
| PASS | STORE_ADDRESS_ATTEMPT does not execute | Must not execute | STORE_ADDRESS_ATTEMPT | Not executed |
| PASS | ADDRESS_WRITE_ROUTE does not execute | Must not execute | ADDRESS_WRITE_ROUTE | Not executed |
| PASS | CREATE_ADDRESS does not execute | Must not execute | CREATE_ADDRESS | Not executed |
| PASS | CAPTURE_ADDRESS_CREATE does not execute | Must not execute | CAPTURE_ADDRESS_CREATE | Not executed |
| PASS | STORE_ADDRESS_RECEIPT does not execute | Must not execute | STORE_ADDRESS_RECEIPT | Not executed |
| PASS | ADDRESS_HAS_ID does not execute | Must not execute | ADDRESS_HAS_ID | Not executed |
| PASS | GET_CREATED_ADDRESS does not execute | Must not execute | GET_CREATED_ADDRESS | Not executed |
| PASS | VERIFY_ADDRESS_CREATE does not execute | Must not execute | VERIFY_ADDRESS_CREATE | Not executed |
| PASS | STORE_ADDRESS_VERIFIED does not execute | Must not execute | STORE_ADDRESS_VERIFIED | Not executed |
| PASS | PREPARE_SITE does not execute | Must not execute | PREPARE_SITE | Not executed |
| PASS | STORE_SITE_PREPARED does not execute | Must not execute | STORE_SITE_PREPARED | Not executed |
| PASS | SITE_ENTRY does not execute | Must not execute | SITE_ENTRY | Not executed |
| PASS | SITE_DISPLAY does not execute | Must not execute | SITE_DISPLAY | Not executed |
| PASS | FETCH_SITE_PARENT does not execute | Must not execute | FETCH_SITE_PARENT | Not executed |
| PASS | CHECK_SITE_PARENT does not execute | Must not execute | CHECK_SITE_PARENT | Not executed |
| PASS | STORE_SITE_PARENT does not execute | Must not execute | STORE_SITE_PARENT | Not executed |
| PASS | SITE_OPERATION does not execute | Must not execute | SITE_OPERATION | Not executed |
| PASS | FETCH_SITES does not execute | Must not execute | FETCH_SITES | Not executed |
| PASS | SHAPE_SITES does not execute | Must not execute | SHAPE_SITES | Not executed |
| PASS | STORE_SITE_LIST does not execute | Must not execute | STORE_SITE_LIST | Not executed |
| PASS | FETCH_SITE_DETAIL does not execute | Must not execute | FETCH_SITE_DETAIL | Not executed |
| PASS | SHAPE_SITE_DETAIL does not execute | Must not execute | SHAPE_SITE_DETAIL | Not executed |
| PASS | STORE_SITE_DETAIL does not execute | Must not execute | STORE_SITE_DETAIL | Not executed |
| PASS | SITE_REFERENCE_INPUT does not execute | Must not execute | SITE_REFERENCE_INPUT | Not executed |
| PASS | FETCH_SITE_ADDRESS_REFERENCE does not execute | Must not execute | FETCH_SITE_ADDRESS_REFERENCE | Not executed |
| PASS | FETCH_SITE_BU_REFERENCE does not execute | Must not execute | FETCH_SITE_BU_REFERENCE | Not executed |
| PASS | CHECK_SITE_REFERENCES does not execute | Must not execute | CHECK_SITE_REFERENCES | Not executed |
| PASS | STORE_SITE_REFERENCES does not execute | Must not execute | STORE_SITE_REFERENCES | Not executed |
| PASS | SITE_REFERENCES_ROUTE does not execute | Must not execute | SITE_REFERENCES_ROUTE | Not executed |
| PASS | SITE_DUPLICATE_INPUT does not execute | Must not execute | SITE_DUPLICATE_INPUT | Not executed |
| PASS | CHECK_SITE_DUPLICATE does not execute | Must not execute | CHECK_SITE_DUPLICATE | Not executed |
| PASS | AUTHORIZE_SITE_WRITE does not execute | Must not execute | AUTHORIZE_SITE_WRITE | Not executed |
| PASS | STORE_SITE_ATTEMPT does not execute | Must not execute | STORE_SITE_ATTEMPT | Not executed |
| PASS | SITE_WRITE_ROUTE does not execute | Must not execute | SITE_WRITE_ROUTE | Not executed |
| PASS | CREATE_SITE does not execute | Must not execute | CREATE_SITE | Not executed |
| PASS | CAPTURE_SITE_CREATE does not execute | Must not execute | CAPTURE_SITE_CREATE | Not executed |
| PASS | STORE_SITE_RECEIPT does not execute | Must not execute | STORE_SITE_RECEIPT | Not executed |
| PASS | SITE_HAS_ID does not execute | Must not execute | SITE_HAS_ID | Not executed |
| PASS | GET_CREATED_SITE does not execute | Must not execute | GET_CREATED_SITE | Not executed |
| PASS | VERIFY_SITE_CREATE does not execute | Must not execute | VERIFY_SITE_CREATE | Not executed |
| PASS | STORE_SITE_VERIFIED does not execute | Must not execute | STORE_SITE_VERIFIED | Not executed |
| PASS | PREPARE_CONTACT does not execute | Must not execute | PREPARE_CONTACT | Not executed |
| PASS | STORE_CONTACT_PREPARED does not execute | Must not execute | STORE_CONTACT_PREPARED | Not executed |
| PASS | CONTACT_ENTRY does not execute | Must not execute | CONTACT_ENTRY | Not executed |
| PASS | CONTACT_DISPLAY does not execute | Must not execute | CONTACT_DISPLAY | Not executed |
| PASS | FETCH_CONTACT_PARENT does not execute | Must not execute | FETCH_CONTACT_PARENT | Not executed |
| PASS | CHECK_CONTACT_PARENT does not execute | Must not execute | CHECK_CONTACT_PARENT | Not executed |
| PASS | STORE_CONTACT_PARENT does not execute | Must not execute | STORE_CONTACT_PARENT | Not executed |
| PASS | CONTACT_OPERATION does not execute | Must not execute | CONTACT_OPERATION | Not executed |
| PASS | FETCH_CONTACTS does not execute | Must not execute | FETCH_CONTACTS | Not executed |
| PASS | SHAPE_CONTACTS does not execute | Must not execute | SHAPE_CONTACTS | Not executed |
| PASS | STORE_CONTACT_LIST does not execute | Must not execute | STORE_CONTACT_LIST | Not executed |
| PASS | FETCH_CONTACT_DETAIL does not execute | Must not execute | FETCH_CONTACT_DETAIL | Not executed |
| PASS | SHAPE_CONTACT_DETAIL does not execute | Must not execute | SHAPE_CONTACT_DETAIL | Not executed |
| PASS | STORE_CONTACT_DETAIL does not execute | Must not execute | STORE_CONTACT_DETAIL | Not executed |
| PASS | CONTACT_DUPLICATE_INPUT does not execute | Must not execute | CONTACT_DUPLICATE_INPUT | Not executed |
| PASS | CHECK_CONTACT_DUPLICATE does not execute | Must not execute | CHECK_CONTACT_DUPLICATE | Not executed |
| PASS | AUTHORIZE_CONTACT_WRITE does not execute | Must not execute | AUTHORIZE_CONTACT_WRITE | Not executed |
| PASS | STORE_CONTACT_ATTEMPT does not execute | Must not execute | STORE_CONTACT_ATTEMPT | Not executed |
| PASS | CONTACT_WRITE_ROUTE does not execute | Must not execute | CONTACT_WRITE_ROUTE | Not executed |
| PASS | CREATE_CONTACT does not execute | Must not execute | CREATE_CONTACT | Not executed |
| PASS | CAPTURE_CONTACT_CREATE does not execute | Must not execute | CAPTURE_CONTACT_CREATE | Not executed |
| PASS | STORE_CONTACT_RECEIPT does not execute | Must not execute | STORE_CONTACT_RECEIPT | Not executed |
| PASS | CONTACT_HAS_ID does not execute | Must not execute | CONTACT_HAS_ID | Not executed |
| PASS | GET_CREATED_CONTACT does not execute | Must not execute | GET_CREATED_CONTACT | Not executed |
| PASS | VERIFY_CONTACT_CREATE does not execute | Must not execute | VERIFY_CONTACT_CREATE | Not executed |
| PASS | STORE_CONTACT_VERIFIED does not execute | Must not execute | STORE_CONTACT_VERIFIED | Not executed |
| PASS | READ_GUIDANCE does not execute | Must not execute | READ_GUIDANCE | Not executed |
| PASS | FETCH_SUPPLIER_DETAIL does not execute | Must not execute | FETCH_SUPPLIER_DETAIL | Not executed |
| PASS | SHAPE_DETAIL does not execute | Must not execute | SHAPE_DETAIL | Not executed |
| PASS | STORE_DETAIL_STATE does not execute | Must not execute | STORE_DETAIL_STATE | Not executed |
| PASS | INIT_DISPLAY does not execute | Must not execute | INIT_DISPLAY | Not executed |


## Semantic Evaluation

**Judge Contract:** model-authored
**Terminal Output Owner:** `SUPPLIER_READ_DISPLAY`
**Status:** passed
**Provider:** local
**Overall Score:** 5/5
**Minimum Score:** 4/5
**Summary:** Grounded five-row supplier page with accurate fixture paging and complete supported widget.

### Criterion Results

| Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- |
| PASS | Response stays grounded in recorded data | The output is grounded in the replayed test data. | All five rows match FETCH_SUPPLIERS supplier numbers1252–1256 and their supplied names, types and relationships; null values are explicitly Not specified. |
| PASS | Supplier facts match the BO | The output is grounded in the replayed test data. All returned suppliers and supplied columns are represented accurately without invented records; missing values are explicit. | All five rows match FETCH_SUPPLIERS supplier numbers1252–1256 and their supplied names, types and relationships; null values are explicitly Not specified. |
| PASS | Paging is clear | Count, offset, continuation and next offset match the recorded page and no full-catalog claim is made. | The fixture contains count5, offset0, hasMorefalse; the widget reports those values and no next page without claiming full catalog coverage. |
| PASS | Supported table and guidance | Output uses a supported oraInfoDisplay multiRecordWidget with properties rows and cols, and concise supplier query guidance; no raw debug envelope. | The final output is a complete oraInfoDisplay multiRecordWidget with six columns, five rows and selected-ID guidance. |

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

Workflow time: 14821 ms (sum of node times)
Test run time: 16698 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 8313 | 480 | 8793 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 898 | 217 | 1115 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| SUPPLIER_READ_DISPLAY | 7415 | 263 | 7678 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 2
Total AI Units: 10

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| EXTRACT_READ | 898 | 217 | 1 | 5 | premium | general |
| SUPPLIER_READ_DISPLAY | 7415 | 263 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| EXTRACT_READ | 7185 | 7111 | 1 runtime detail; see JSON report |
| FETCH_SUPPLIERS | 45 |  | 0 runtime details; see JSON report |
| SUPPLIER_READ_DISPLAY | 7591 | 7511 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 898; 7415 |
| outputTokens | 217; 263 |

## Test Data

Capture policy: baseline-replay

| Node | Node Type | Capture Mode | Truncated | Items | Response Bytes |
| --- | --- | --- | --- | --- | --- |
| FETCH_SUPPLIERS | BO_FUNCTION | model-compacted | yes | 5 | 1079 |

## Workflow Run

**Conversation ID:** workflow-test-query-6b879d2e-c2ca-48cd-a50c-9356288d4912
**Job ID:** 956afd39-196c-4eca-98c1-2e1c4e4ffa8f
**Finish Reason:** stop
**Raw Event Count:** 40

| Node | Events | Input Captured | Output Captured |
| --- | --- | --- | --- |
| START | NODE_EXECUTED | yes | yes |
| EXTRACT_READ | NODE_START, NODE_END | yes | yes |
| PREPARE_TRANSACTION | NODE_EXECUTED | yes | yes |
| TRANSACTION_ROUTE | NODE_START, NODE_END | yes | yes |
| PREPARE_READ | NODE_EXECUTED | yes | yes |
| READ_ALLOWED | NODE_EXECUTED | yes | yes |
| IS_LIST | NODE_EXECUTED | yes | yes |
| FETCH_SUPPLIERS | NODE_START, NODE_END | yes | yes |
| SHAPE_SUPPLIERS | NODE_EXECUTED | yes | yes |
| STORE_LIST_STATE | NODE_EXECUTED | yes | yes |
| DISPLAY_STAGE | NODE_START, NODE_END | yes | yes |
| SUPPLIER_READ_DISPLAY | NODE_START, NODE_END | yes | yes |
