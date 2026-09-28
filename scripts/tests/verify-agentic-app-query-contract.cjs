'use strict';

const assert = require('node:assert/strict');
const {
  validateBindingExpressions,
  validateBoFunctionBindings,
  validateWorkflow,
  edgeTargets,
} = require('../verify-agentic-app-query-contract.cjs');

function workflow(nodes) {
  return { specification: { dataPipeline: { pipelineNodes: nodes } } };
}

function baseNodes(consumerInput = '{{$context.$nodes.PREPARE_PARENT.$output.result.parentId}}') {
  return [
    { id: '1', code: 'APP_STAGE_ROUTER', type: 'SWITCH', outcomes: { Query: '2' } },
    { id: '2', code: 'PREPARE_PARENT', type: 'CODE', outcomes: { success: '3' } },
    {
      id: '3',
      code: 'LIST_CHILDREN',
      type: 'BO_FUNCTION',
      metadata: { businessObjectCode: 'XDX_TEST', functionName: 'ListChildren' },
      inputs: [{ name: 'parents_Id', value: consumerInput }],
      outcomes: { success: '4' },
    },
    { id: '4', code: 'END', type: 'END', outcomes: {} },
  ];
}

const businessObjects = [{
  objectCode: 'XDX_TEST',
  objectProperties: {
    tools: [{
      name: 'ListChildren',
      resourcePath: '/resources/parents/{parents_Id}/child/items?limit={limit}',
    }],
  },
}];

assert.deepEqual(validateWorkflow(workflow(baseNodes())), []);
assert.deepEqual(validateBindingExpressions(baseNodes()), []);
assert.deepEqual(validateBoFunctionBindings(workflow(baseNodes()), businessObjects), []);

assert.equal(
  validateBindingExpressions(baseNodes('{{$context.$nodes.PREPARE_PARENT.$output.result.parentId}'))[0].code,
  'WORKFLOW_BINDING_EXPRESSION_MALFORMED'
);
assert.equal(
  validateBindingExpressions(baseNodes('{{$context.$nodes.MISSING_PARENT.$output.result.parentId}}'))[0].code,
  'WORKFLOW_BINDING_PRODUCER_MISSING'
);

const missingInput = baseNodes();
missingInput[2].inputs = [];
assert.equal(
  validateBoFunctionBindings(workflow(missingInput), businessObjects)[0].code,
  'BO_PATH_TOKEN_INPUT_MISSING'
);

const blankInput = baseNodes('');
assert.equal(
  validateBoFunctionBindings(workflow(blankInput), businessObjects)[0].code,
  'BO_PATH_TOKEN_INPUT_BLANK'
);

const waitNodes = baseNodes();
waitNodes.splice(2, 0, { id: '5', code: 'WAIT_FOR_USER', type: 'WAIT', outcomes: { success: '3' } });
waitNodes[1].outcomes.success = '5';
assert.ok(validateWorkflow(workflow(waitNodes)).some((failure) => failure.code === 'APP_QUERY_SUSPENSION_UNSUPPORTED'));

// Error handlers are executable Query paths, including from terminal nodes.
for (const type of ['HUMAN', 'WAIT']) {
  const nodes = baseNodes();
  nodes[3].metadata = { errorNodeId: '5' };
  nodes.push({ id: '5', code: 'ERROR_HANDLER', type, outcomes: {} });
  const failures = validateWorkflow(workflow(nodes));
  assert.ok(failures.some(f => f.code === 'APP_QUERY_SUSPENSION_UNSUPPORTED' && f.message.includes('ERROR_HANDLER')), `${type} error-only path must be rejected`);
}
const missingError = baseNodes();
missingError[2].metadata.errorNodeId = 'MISSING_HANDLER';
assert.ok(validateWorkflow(workflow(missingError)).some(f => f.code === 'APP_QUERY_EDGE_TARGET_MISSING' && f.message.includes('MISSING_HANDLER')));

const chainedError = baseNodes();
chainedError[3].metadata = { errorNodeId: '5' };
chainedError.push({ id: '5', code: 'ERROR_ADAPTER', type: 'CODE', metadata: { errorNodeId: '6' }, outcomes: {} });
chainedError.push({ id: '6', code: 'ERROR_WAIT', type: 'WAIT', outcomes: {} });
assert.ok(validateWorkflow(workflow(chainedError)).some(f => f.code === 'APP_QUERY_SUSPENSION_UNSUPPORTED' && f.message.includes('ERROR_ADAPTER -> ERROR_WAIT')));

const safeError = baseNodes();
safeError[3].metadata = { errorNodeId: '5' };
safeError.push({ id: '5', code: 'SAFE_ERROR', type: 'CODE', metadata: { errorNodeId: '4' }, outcomes: { success: '4' } });
assert.deepEqual(validateWorkflow(workflow(safeError)), []);
assert.deepEqual(edgeTargets(safeError[4]), ['4']);

const unreachableError = baseNodes();
unreachableError.push({ id: '5', code: 'OTHER_STAGE', type: 'CODE', metadata: { errorNodeId: '6' }, outcomes: {} });
unreachableError.push({ id: '6', code: 'UNREACHABLE_WAIT', type: 'WAIT', outcomes: {} });
assert.deepEqual(validateWorkflow(workflow(unreachableError)), []);

console.log('Agentic App Query validator tests: PASS');
