# Workflow Test Result: address-query-detail

**Status:** PASSED
**Workflow:** XDX_SUPPLIER_CORE_20260924 (DRAFT v86232573)
**Scenario:** custom user test
**Test Intent:** Verify ordinary parent-scoped address detail independently of create confirmation.
**Data Source:** file
**Evaluation:** hybrid
**Workflow Time:** 16029 ms (sum of node times)
**Test Run Time:** 17468 ms
**Test File:** `test/workflows/xdx_supplier_core_20260924/address-query-detail.json`
**JSON Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\address-query-detail\result.json`
**Markdown Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\address-query-detail\result.md`
**HTML Report:** `C:\Users\dasu\Documents\GitHub\fusion-ai-studio-1\.worktrees\xdx-supplier-core-20260924\test-reports\workflows\xdx_supplier_core_20260924\address-query-detail\result.html`

## Test Intent

**Type:** custom user test
**Intent:** Verify ordinary parent-scoped address detail independently of create confirmation.

## Invocation

**Message:** `Show address detail for SupplierAddressId 300000333814416 under Supplier ID 300000333814409.`
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
<oraInfoDisplay key="addressCore">{"patternId":"multiRecordWidget","title":"Address detail","description":"Supplier XDX Core Supplier 20260924 2130 (300000333814409). Verified selected address.","properties":{"cols":["SupplierAddressId","AddressName","CountryCode","AddressLine1","City","State","PostalCode","Email","AddressPurposeOrderingFlag","AddressPartyNumber","Status","InactiveDate"],"rows":[{"cells":["300000333814416","XDX Core Address 20260924","US","5000 CARTER DR.","LOS ANGELES","CA","90032","xdx-core-address-20260924@example.invalid","true","1486638","ACTIVE","4712-12-31"]}]}}</oraInfoDisplay>
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
| PASS | PREPARE_ADDRESS executes | Must execute | PREPARE_ADDRESS | Executed |
| PASS | STORE_ADDRESS_PREPARED executes | Must execute | STORE_ADDRESS_PREPARED | Executed |
| PASS | ADDRESS_ENTRY executes | Must execute | ADDRESS_ENTRY | Executed |
| PASS | ADDRESS_DISPLAY executes | Must execute | ADDRESS_DISPLAY | Executed |
| PASS | FETCH_ADDRESS_PARENT executes | Must execute | FETCH_ADDRESS_PARENT | Executed |
| PASS | CHECK_ADDRESS_PARENT executes | Must execute | CHECK_ADDRESS_PARENT | Executed |
| PASS | STORE_ADDRESS_PARENT executes | Must execute | STORE_ADDRESS_PARENT | Executed |
| PASS | ADDRESS_OPERATION executes | Must execute | ADDRESS_OPERATION | Executed |
| PASS | FETCH_ADDRESS_DETAIL executes | Must execute | FETCH_ADDRESS_DETAIL | Executed |
| PASS | SHAPE_ADDRESS_DETAIL executes | Must execute | SHAPE_ADDRESS_DETAIL | Executed |
| PASS | STORE_ADDRESS_DETAIL executes | Must execute | STORE_ADDRESS_DETAIL | Executed |
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
| PASS | FETCH_ADDRESSES stays inactive | Must not execute | FETCH_ADDRESSES | Not executed |
| PASS | SHAPE_ADDRESSES stays inactive | Must not execute | SHAPE_ADDRESSES | Not executed |
| PASS | STORE_ADDRESS_LIST stays inactive | Must not execute | STORE_ADDRESS_LIST | Not executed |
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
**Terminal Output Owner:** `ADDRESS_DISPLAY`
**Status:** passed
**Provider:** local
**Overall Score:** 5/5
**Minimum Score:** 4/5
**Summary:** Correct supplier409/address416 and all twelve projected fields, grounded in the retained parent and address GETs.

### Criterion Results

| Status | Assertion | Criterion | Notes |
| --- | --- | --- | --- |
| PASS | Response stays grounded in recorded data | The output is grounded in the replayed test data. | Parent409 and address416 match both recorded GET inputs and responses; no other record is introduced. |
| PASS | Grounded parent and address | The output is grounded in the replayed test data. It identifies supplier300000333814409 and address300000333814416, and presents all returned projected fields accurately, including all eight business fields. | All eight submitted business fields plus address ID, party1486638, ACTIVE status and4712-12-31 inactive date are displayed exactly as returned. |
| PASS | Complete native address output | Uses a supported oraInfoDisplay widget with honest nulls and no write claim. Scalar detail must not invent paging. | Supported multiRecordWidget shows one verified selected address and no fabricated collection paging or write claim. |

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

Workflow time: 16029 ms (sum of node times)
Test run time: 17468 ms (includes CLI overhead)
Token usage: observed from runtime events

Aggregate Token Usage

| Input Tokens | Output Tokens | Total Tokens | Model |
| --- | --- | --- | --- |
| 8213 | 423 | 8636 | oci-agent/openai.gpt-5-mini |

| Node | Input Tokens | Output Tokens | Total Tokens | Model | Source |
| --- | --- | --- | --- | --- | --- |
| ADDRESS_DISPLAY | 7300 | 195 | 7495 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |
| EXTRACT_READ | 913 | 228 | 1141 | oci-agent/openai.gpt-5-mini | computed:inputTokens+outputTokens, nodeProgressMessage.nodeStepInfo.details[0].inputTokens, nodeProgressMessage.nodeStepInfo.details[0].modelName, nodeProgressMessage.nodeStepInfo.details[0].outputTokens |


AI Units: computed
Total Token Units: 2
Total AI Units: 10

| Node | Input | Output | Token Units | AI Units | Model Type | Action Type |
| --- | --- | --- | --- | --- | --- | --- |
| ADDRESS_DISPLAY | 7300 | 195 | 1 | 5 | premium | general |
| EXTRACT_READ | 913 | 228 | 1 | 5 | premium | general |

| Node | Node Time (ms) | LLM Call Time (ms) | Details |
| --- | --- | --- | --- |
| EXTRACT_READ | 9010 | 8908 | 1 runtime detail; see JSON report |
| FETCH_ADDRESS_PARENT | 47 |  | 0 runtime details; see JSON report |
| FETCH_ADDRESS_DETAIL | 46 |  | 0 runtime details; see JSON report |
| ADDRESS_DISPLAY | 6926 | 6851 | 1 runtime detail; see JSON report |

| Observed Field | Values |
| --- | --- |
| modelName | "oci-agent/openai.gpt-5-mini"; "oci-agent/openai.gpt-5-mini" |
| inputTokens | 913; 7300 |
| outputTokens | 228; 195 |

## Test Data

Capture policy: record-now

| Node | Node Type | Capture Mode | Truncated | Items | Response Bytes |
| --- | --- | --- | --- | --- | --- |
| FETCH_ADDRESS_PARENT | BO_FUNCTION | raw | no |  | 793 |
| FETCH_ADDRESS_DETAIL | BO_FUNCTION | raw | no |  | 349 |

## Workflow Run

**Conversation ID:** workflow-test-address-query-detail-aee067b8-fee5-4480-9b08-080c244dee62
**Job ID:** bd46895a-fcdd-439a-8fd0-256461d4dc92
**Finish Reason:** stop
**Raw Event Count:** 39

| Node | Events | Input Captured | Output Captured |
| --- | --- | --- | --- |
| START | NODE_EXECUTED | yes | yes |
| EXTRACT_READ | NODE_START, NODE_END | yes | yes |
| PREPARE_TRANSACTION | NODE_EXECUTED | yes | yes |
| TRANSACTION_ROUTE | NODE_START, NODE_END | yes | yes |
| PREPARE_ADDRESS | NODE_EXECUTED | yes | yes |
| STORE_ADDRESS_PREPARED | NODE_EXECUTED | yes | yes |
| ADDRESS_ENTRY | NODE_START, NODE_END | yes | yes |
| FETCH_ADDRESS_PARENT | NODE_START, NODE_END | yes | yes |
| CHECK_ADDRESS_PARENT | NODE_EXECUTED | yes | yes |
| STORE_ADDRESS_PARENT | NODE_EXECUTED | yes | yes |
| ADDRESS_OPERATION | NODE_START, NODE_END | yes | yes |
| FETCH_ADDRESS_DETAIL | NODE_START, NODE_END | yes | yes |
| SHAPE_ADDRESS_DETAIL | NODE_EXECUTED | yes | yes |
| STORE_ADDRESS_DETAIL | NODE_EXECUTED | yes | yes |
| ADDRESS_DISPLAY | NODE_START, NODE_END | yes | yes |



## Assertion Suggestions

- `XDX Core Address 20260924` from `FETCH_ADDRESS_DETAIL`: Appears verbatim in finalOutput and comes from replayed testData.
- `LOS ANGELES` from `FETCH_ADDRESS_DETAIL`: Appears verbatim in finalOutput and comes from replayed testData.
- `XDX Core Supplier 20260924 2130` from `FETCH_ADDRESS_PARENT`: Appears verbatim in finalOutput and comes from replayed testData.
- `5000 CARTER DR.` from `FETCH_ADDRESS_DETAIL`: Appears verbatim in finalOutput and comes from replayed testData.
- `xdx-core-address-20260924@example.invalid` from `FETCH_ADDRESS_DETAIL`: Appears verbatim in finalOutput and comes from replayed testData.
