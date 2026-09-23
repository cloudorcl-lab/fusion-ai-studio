'use strict';

const assert = require('node:assert/strict');
const {
  validateBindingExpressions,
  validateBoFunctionBindings,
  validateWorkflow,
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

console.log('Agentic App Query validator tests: PASS');
