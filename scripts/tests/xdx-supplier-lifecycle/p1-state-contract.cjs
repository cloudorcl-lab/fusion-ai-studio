const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..', '..', '..');
const workflowPath = path.join(root, 'src', 'workflows', 'xdx_supplier_lifecycle_agent.wf');
const appPath = path.join(root, 'src', 'apps', 'xdx_supplier_lifecycle.app');
const schemaPath = path.join(root, 'src', 'contracts', 'xdx_supplier_lifecycle_state.schema.json');

const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const app = JSON.parse(fs.readFileSync(appPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
const nodes = workflow.specification.dataPipeline.pipelineNodes;
const byCode = Object.fromEntries(nodes.map((node) => [node.code, node]));
const reducer = new Function('$context', byCode.REDUCE_LIFECYCLE.metadata.sourceCode);
const scalarResponseExpression = '{{$context.$nodes.PROJECT_RESPONSE_TEXT.$output.result}}';

function reduce(message, prior, feedback = '') {
  return reducer({
    $variables: { lifecycle: prior },
    $nodes: { HUMAN_COLLECT: { $feedbackReceived: feedback } },
    $system: { $inputMessage: message }
  });
}

function assertState(state) {
  assert.equal(typeof state, 'object');
  assert.deepEqual(
    Object.keys(state).sort(),
    schema.required.slice().sort(),
    'state must contain exactly the schema-required top-level fields'
  );
  assert.equal(state.schemaVersion, 1);
  assert.ok(schema.properties.phase.enum.includes(state.phase));
  assert.ok(Number.isInteger(state.revision) && state.revision >= 1);
  assert.equal(Array.isArray(state.operations), true);
  assert.equal(state.operations.length, 0, 'P1 must not schedule writes');
}

assert.equal(workflow.aiAppsCompatibleFlag, true);
assert.equal(app.specification.applicationMetadata.queryAgent, 'XDX_SUPPLIER_LIFECYCLE_AGENT');
assert.equal(app.specification.applicationMetadata.enableFileUpload, false);
assert.equal(byCode.APP_STAGE_ROUTER.outcomes.Query, byCode.REDUCE_LIFECYCLE.id);
assert.equal(byCode.APP_STAGE_ROUTER.outcomes.success, undefined);
assert.equal(
  byCode.APP_STAGE_ROUTER.inputs.find((input) => input.name === 'caseExpression').value,
  '{{$context.$app.$OraMessageHint}}'
);
assert.equal(byCode.HUMAN_COLLECT.metadata.channelType, 'CHAT');
assert.equal(byCode.HUMAN_COLLECT.metadata.approvalEnabledFlag, false);
assert.equal(byCode.HUMAN_COLLECT.metadata.feedbackEnabledFlag, true);
assert.equal(byCode.HUMAN_COLLECT.metadata.loopBackNodeId, byCode.REDUCE_LIFECYCLE.id);
assert.equal(byCode.LIFECYCLE_TERMINAL.outcomes.true, byCode.QUERY_RESPONSE.id);
assert.equal(byCode.QUERY_RESPONSE.type, 'LLM');
assert.ok(byCode.PROJECT_RESPONSE_TEXT, 'workflow must project the reducer response to a scalar');
assert.equal(byCode.PROJECT_RESPONSE_TEXT.type, 'CODE');
assert.equal(byCode.PROJECT_RESPONSE_TEXT.metadata.returnType, 'string');
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /REDUCE_LIFECYCLE/);
assert.match(byCode.PROJECT_RESPONSE_TEXT.metadata.sourceCode, /return reduced\.prompt/);
assert.equal(byCode.SAVE_LIFECYCLE.outcomes.success, byCode.READ_ACTION_ROUTER.id);
assert.equal(byCode.READ_ACTION_ROUTER.outcomes.PROMPT, byCode.PROJECT_RESPONSE_TEXT.id);
assert.equal(byCode.PROJECT_RESPONSE_TEXT.outcomes.success, byCode.LIFECYCLE_TERMINAL.id);
assert.equal(byCode.HUMAN_COLLECT.inputs[0].value.messageTemplate.message, scalarResponseExpression);
const queryPrompt = byCode.QUERY_RESPONSE.inputs.find((input) => input.name === 'prompt').value;
const querySystemPrompt = byCode.QUERY_RESPONSE.inputs.find((input) => input.name === 'systemPrompt').value;
assert.equal(queryPrompt, `RESPONSE_TEXT:\n${scalarResponseExpression}`);
assert.match(querySystemPrompt, /Output exactly the RESPONSE_TEXT block contents/);

const immediateCancel = reduce('cancel supplier lifecycle request', null);
assertState(immediateCancel.state);
assert.equal(immediateCancel.terminal, true);
assert.equal(immediateCancel.state.phase, 'CANCELLED');
assert.equal(immediateCancel.state.revision, 1);

let result = reduce('Create a supplier named XDX State Contract', null);
assertState(result.state);
assert.equal(result.state.phase, 'GATHER');
assert.equal(result.state.revision, 1);
assert.equal(result.terminal, false);

result = reduce('', result.state, 'review');
assertState(result.state);
assert.equal(result.state.phase, 'FINAL_REVIEW');
assert.equal(result.state.revision, 2);

result = reduce('', result.state, 'Change the supplier name to XDX Revised');
assertState(result.state);
assert.equal(result.state.phase, 'GATHER');
assert.equal(result.state.revision, 3);
assert.equal(result.state.approvedSnapshot, null);

const stale = reduce('', result.state, 'approve');
assertState(stale.state);
assert.equal(stale.terminal, false);
assert.equal(stale.state.phase, 'GATHER');
assert.equal(stale.state.approvedSnapshot, null);

const reviewed = reduce('', stale.state, 'review');
const approved = reduce('', reviewed.state, 'approve');
assertState(approved.state);
assert.equal(approved.terminal, true);
assert.equal(approved.state.phase, 'APPROVED');
assert.equal(approved.state.approvedSnapshot.requestId, approved.state.requestId);
assert.equal(approved.state.approvedSnapshot.revision, approved.state.revision);
assert.deepEqual(approved.state.approvedSnapshot.normalizedPayload, approved.state.draft.requiredFields);

const cancelled = reduce('', result.state, 'cancel');
assertState(cancelled.state);
assert.equal(cancelled.terminal, true);
assert.equal(cancelled.state.phase, 'CANCELLED');
assert.equal(cancelled.state.approvedSnapshot, null);

const workflowText = fs.readFileSync(workflowPath, 'utf8');
for (const excluded of ['Attachment', 'DFF', 'ThirdPartyPayment', 'PaymentRelationship']) {
  assert.equal(workflowText.includes(excluded), false, `excluded resource leaked into P1 workflow: ${excluded}`);
}

console.log(JSON.stringify({
  ok: true,
  cases: 8,
  assertions: [
    'Ask Oracle Query route',
    'first-turn cancellation reaches the deterministic terminal path',
    'typed conversation state',
    'Human Chat loopback',
    'revision continuity',
    'correction invalidates approval',
    'stale approval rejected',
    'cancel/approve produce zero writes'
  ]
}, null, 2));
