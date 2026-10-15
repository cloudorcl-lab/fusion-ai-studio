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

// Focused regressions: removing any corresponding validation must make these fail.
const test = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

function bindingFailure(failures, producer, consumer) {
  assert.ok(failures.some(f => f.code.startsWith('WORKFLOW_BINDING_PRODUCER_') &&
    f.message.includes(producer) && f.message.includes(consumer)), JSON.stringify(failures));
}

test('producer output must exist on every incoming consumer route', () => {
  const nodes = baseNodes();
  nodes[0].outcomes.Query = '5';
  nodes.push({ id: '5', code: 'CHOOSE_PARENT', type: 'SWITCH', outcomes: { prepare: '2', bypass: '3' } });
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

test('a disconnected producer cannot qualify through a path to the consumer', () => {
  const nodes = baseNodes();
  nodes[0].outcomes.Query = '3';
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

test('an upstream error path cannot bypass the required producer', () => {
  const nodes = baseNodes();
  nodes[0].metadata = { errorNodeId: '3' };
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

test('a failed producer cannot supply its success output to its error handler', () => {
  const nodes = baseNodes();
  nodes[1].outcomes.success = '4';
  nodes[1].metadata = { errorNodeId: '3' };
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

test('self references cannot use output from an earlier loop iteration as current output', () => {
  const nodes = baseNodes('{{$context.$nodes.LIST_CHILDREN.$output.result.parentId}}');
  nodes[2].metadata.loopBackNodeId = '3';
  bindingFailure(validateBindingExpressions(nodes), 'LIST_CHILDREN', 'LIST_CHILDREN');
});

test('a producer shared before both consumer branches remains valid', () => {
  const nodes = baseNodes();
  nodes[1].outcomes.success = '5';
  nodes.push({ id: '5', code: 'CHOOSE_CHILDREN', type: 'SWITCH', outcomes: { first: '3', second: '6' } });
  nodes.push({ id: '6', code: 'SECOND_CHILD_ROUTE', type: 'CODE', outcomes: { success: '3' } });
  assert.deepEqual(validateBindingExpressions(nodes), []);
});

function nestedWorkflow(value = '{{$context.$nodes.PREPARE_PARENT.$output.result.parentId}}') {
  const nodes = baseNodes();
  nodes[2] = {
    id: '3', code: 'ITERATE_CHILDREN', type: 'LOOP', outcomes: { success: '4' },
    metadata: { body: { pipelineNodes: [
      { id: 'n1', code: 'PREPARE_LOCAL', type: 'CODE', outcomes: { success: 'n2' } },
      { id: 'n2', code: 'NESTED_CHILDREN', type: 'BO_FUNCTION',
        metadata: { businessObjectCode: 'XDX_TEST', functionName: 'ListChildren' },
        inputs: [{ name: 'parents_Id', value }], outcomes: { success: 'n3' } },
      { id: 'n3', code: 'NESTED_END', type: 'END', outcomes: {} },
    ] } },
  };
  return workflow(nodes);
}

function nestedConsumer(wf) {
  return wf.specification.dataPipeline.pipelineNodes[2].metadata.body.pipelineNodes[1];
}

for (const nested of [false, true]) {
  const scope = nested ? 'nested' : 'root';
  for (const missing of ['object', 'function']) {
    test(`${scope} BO dependency fails closed when ${missing} cannot be resolved`, () => {
      const wf = nested ? nestedWorkflow() : workflow(baseNodes());
      const node = nested ? nestedConsumer(wf) : wf.specification.dataPipeline.pipelineNodes[2];
      node.metadata[missing === 'object' ? 'businessObjectCode' : 'functionName'] = 'XDX_ABSENT';
      const failures = validateBoFunctionBindings(wf, businessObjects);
      const expected = missing === 'object' ? 'BO_OBJECT_UNRESOLVED' : 'BO_FUNCTION_UNRESOLVED';
      assert.ok(failures.some(f => f.code === expected && f.message.includes('XDX_ABSENT') &&
        f.message.includes(node.code)), JSON.stringify(failures));
    });
  }
}

for (const value of [undefined, '', '  ', null]) {
  test(`nested BO path token rejects ${value === undefined ? 'missing input' : JSON.stringify(value)}`, () => {
    const wf = nestedWorkflow(value);
    if (value === undefined) nestedConsumer(wf).inputs = [];
    const failures = validateBoFunctionBindings(wf, businessObjects);
    const expected = value === undefined ? 'BO_PATH_TOKEN_INPUT_MISSING' : 'BO_PATH_TOKEN_INPUT_BLANK';
    assert.ok(failures.some(f => f.code === expected && f.message.includes('NESTED_CHILDREN') &&
      f.message.includes('parents_Id')), JSON.stringify(failures));
  });
}

test('nested malformed binding is checked by the workflow entry point', () => {
  const failures = validateWorkflow(nestedWorkflow('{{$context.$nodes.PREPARE_PARENT.$output.result.parentId}'));
  assert.ok(failures.some(f => f.code === 'WORKFLOW_BINDING_EXPRESSION_MALFORMED' &&
    f.message.includes('NESTED_CHILDREN')), JSON.stringify(failures));
});

test('nested binding rejects a stale missing producer', () => {
  bindingFailure(validateWorkflow(nestedWorkflow('{{$context.$nodes.RETIRED_PARENT.$output.id}}')),
    'RETIRED_PARENT', 'NESTED_CHILDREN');
});

test('nested binding rejects a parent producer bypassed before the container', () => {
  const wf = nestedWorkflow();
  wf.specification.dataPipeline.pipelineNodes[0].outcomes.Query = '3';
  bindingFailure(validateWorkflow(wf), 'PREPARE_PARENT', 'NESTED_CHILDREN');
});

test('nested binding rejects local producer bypass', () => {
  const wf = nestedWorkflow('{{$context.$nodes.PREPARE_LOCAL.$output.id}}');
  const nested = wf.specification.dataPipeline.pipelineNodes[2].metadata.body.pipelineNodes;
  nested.unshift({ id: 'n0', code: 'CHOOSE_LOCAL', type: 'SWITCH', outcomes: { prepare: 'n1', bypass: 'n2' } });
  bindingFailure(validateWorkflow(wf), 'PREPARE_LOCAL', 'NESTED_CHILDREN');
});

for (const producer of ['PREPARE_PARENT', 'PREPARE_LOCAL']) {
  test(`nested binding accepts available ${producer} output`, () => {
    const wf = nestedWorkflow(`{{$context.$nodes.${producer}.$output.id}}`);
    assert.deepEqual(validateWorkflow(wf), []);
    assert.deepEqual(validateBoFunctionBindings(wf, businessObjects), []);
  });
}

test('nested producer names resolve to the nearest scope', () => {
  const wf = nestedWorkflow('{{$context.$nodes.PREPARE_PARENT.$output.id}}');
  const local = wf.specification.dataPipeline.pipelineNodes[2].metadata.body.pipelineNodes;
  local[0].code = 'PREPARE_PARENT';
  wf.specification.dataPipeline.pipelineNodes[0].outcomes.Query = '3';
  assert.deepEqual(validateWorkflow(wf), []);
});

test('an unavailable local shadow cannot fall back to an available ancestor', () => {
  const wf = nestedWorkflow();
  const local = wf.specification.dataPipeline.pipelineNodes[2].metadata.body.pipelineNodes;
  local[0].code = 'PREPARE_PARENT';
  local.unshift({ id: 'n0', code: 'CHOOSE_LOCAL', type: 'SWITCH', outcomes: { prepare: 'n1', bypass: 'n2' } });
  bindingFailure(validateWorkflow(wf), 'PREPARE_PARENT', 'NESTED_CHILDREN');
});

test('a cycle cannot make a producer that runs after the consumer available', () => {
  const nodes = baseNodes();
  nodes[0].outcomes.Query = '3';
  nodes[2].outcomes.success = '2';
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

function parallelNodes(conditional = false) {
  return [
    { id: '1', code: 'APP_STAGE_ROUTER', type: 'SWITCH', outcomes: { Query: '2' } },
    { id: '2', code: 'FETCH_IN_PARALLEL', type: 'PARALLEL', outcomes: { '0': conditional ? '6' : '3', '1': '4' }, convergenceTargetId: '5' },
    { id: '3', code: 'PREPARE_PARENT', type: 'CODE', outcomes: { success: '5' } },
    { id: '4', code: 'PREPARE_OTHER', type: 'CODE', outcomes: { success: '5' } },
    { id: '5', code: 'JOIN_CHILDREN', type: 'CODE', inputs: [{ name: 'parent', value: '{{$context.$nodes.PREPARE_PARENT.$output.id}}' }], outcomes: {} },
    ...(conditional ? [{ id: '6', code: 'CHOOSE_PARALLEL_PARENT', type: 'SWITCH', outcomes: { prepare: '3', bypass: '5' } }] : []),
  ];
}

test('parallel convergence may consume an output guaranteed by a completed branch', () => {
  assert.deepEqual(validateBindingExpressions(parallelNodes()), []);
});

test('parallel convergence rejects a producer skipped inside its own branch', () => {
  bindingFailure(validateBindingExpressions(parallelNodes(true)), 'PREPARE_PARENT', 'JOIN_CHILDREN');
});

test('a non-control convergence edge cannot bypass the required producer', () => {
  const nodes = baseNodes();
  nodes[0].outcomes.Query = '5';
  nodes.push({ id: '5', code: 'ROUTE_PARENT', type: 'CODE',
    outcomes: { success: '2' }, convergenceTargetId: '3' });
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

test('a parallel loopback edge cannot bypass the producer after convergence', () => {
  const nodes = [
    { id: '1', code: 'APP_STAGE_ROUTER', type: 'SWITCH', outcomes: { Query: '2' } },
    { id: '2', code: 'FETCH_IN_PARALLEL', type: 'PARALLEL', outcomes: { '0': '3', '1': '4' },
      convergenceTargetId: '5', metadata: { loopBackNodeId: '7' } },
    { id: '3', code: 'FETCH_FIRST', type: 'CODE', outcomes: { success: '5' } },
    { id: '4', code: 'FETCH_SECOND', type: 'CODE', outcomes: { success: '5' } },
    { id: '5', code: 'JOIN_FETCHES', type: 'CODE', outcomes: { success: '6' } },
    { id: '6', code: 'PREPARE_PARENT', type: 'CODE', outcomes: { success: '7' } },
    { id: '7', code: 'LIST_CHILDREN', type: 'CODE', outcomes: {},
      inputs: [{ name: 'parent', value: '{{$context.$nodes.PREPARE_PARENT.$output.id}}' }] },
  ];
  bindingFailure(validateBindingExpressions(nodes), 'PREPARE_PARENT', 'LIST_CHILDREN');
});

// Documented LOOP context and qualified body-node paths must survive recursive validation.
function documentedLoopWorkflow(value) {
  const wf = nestedWorkflow(value);
  const loop = wf.specification.dataPipeline.pipelineNodes[2];
  const body = loop.metadata.body;
  body.rootNode = 'start_loop';
  body.pipelineNodes.unshift({ id: 'start_loop', code: 'START_LOOP', type: 'START', outcomes: { success: 'n1' } });
  loop.inputs = [{ name: 'collection', type: 'array', value: '{{ [] }}' }];
  loop.metadata = { loopType: 'SEQUENTIAL', dataPipeline: body };
  return wf;
}

for (const suffix of ['$currentItem.id', '$currentItemIndex']) {
  test(`documented loop context ${suffix} is available within the body`, () => {
    const wf = documentedLoopWorkflow(`{{$context.$nodes.ITERATE_CHILDREN.${suffix}}}`);
    assert.deepEqual(validateWorkflow(wf), []);
  });
}

test('qualified inner producer output is available after its local execution', () => {
  const wf = documentedLoopWorkflow('{{$context.$nodes.ITERATE_CHILDREN.PREPARE_LOCAL.$output.id}}');
  assert.deepEqual(validateWorkflow(wf), []);
});

test('qualified inner producer names must resolve beyond the existing container', () => {
  const wf = documentedLoopWorkflow('{{$context.$nodes.ITERATE_CHILDREN.RETIRED_INNER.$output.id}}');
  bindingFailure(validateWorkflow(wf), 'RETIRED_INNER', 'NESTED_CHILDREN');
});

test('qualified inner producer must execute before its local consumer', () => {
  const wf = documentedLoopWorkflow('{{$context.$nodes.ITERATE_CHILDREN.PREPARE_LOCAL.$output.id}}');
  const body = wf.specification.dataPipeline.pipelineNodes[2].metadata.dataPipeline;
  body.pipelineNodes[0].outcomes.success = 'n2';
  bindingFailure(validateWorkflow(wf), 'PREPARE_LOCAL', 'NESTED_CHILDREN');
});

for (const value of ['}} text {{', '{{ outer {{ inner }} end }}', '{{}}', '{{  }}', 'prefix }} middle {{ 1 }} suffix {{']) {
  test(`interpolation rejects malformed delimiter order or content: ${JSON.stringify(value)}`, () => {
    const failures = validateBindingExpressions(baseNodes(value));
    assert.ok(failures.some(f => f.code === 'WORKFLOW_BINDING_EXPRESSION_MALFORMED'), JSON.stringify(failures));
  });
}

for (const value of [
  'prefix {{ 1 }} middle {{ 2 }} suffix',
  '{{ ({ parent: { id: 42 } }) }}',
  '{{ ({parent:{id:42}}) }}',
  '{{ "literal {{ and }}" }}',
]) {
  test(`interpolation preserves valid expressions: ${JSON.stringify(value)}`, () => {
    assert.deepEqual(validateBindingExpressions(baseNodes(value)), []);
  });
}

function runFixture(t, wf, objects) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'xdx-query-preflight-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.mkdirSync(path.join(directory, 'workflows'));
  if (objects !== undefined) {
    fs.mkdirSync(path.join(directory, 'businessObjects'));
    objects.forEach((bo, index) => fs.writeFileSync(path.join(directory, 'businessObjects', `xdx_fixture_${index}.bo`), JSON.stringify(bo)));
  }
  const file = path.join(directory, 'workflows', 'xdx_query_fixture.wf');
  fs.writeFileSync(file, JSON.stringify(wf));
  const result = spawnSync(process.execPath, [path.resolve(__dirname, '../verify-agentic-app-query-contract.cjs'), file], {
    encoding: 'utf8', timeout: 10000, windowsHide: true,
  });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}

test('real CLI rejects a BO reference when the local BO directory is absent', t => {
  const result = runFixture(t, workflow(baseNodes()));
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /FAIL/);
  assert.match(result.output, /XDX_TEST/);
});

test('real CLI rejects an unresolved nested BO function', t => {
  const wf = nestedWorkflow();
  nestedConsumer(wf).metadata.functionName = 'XDX_ABSENT_FUNCTION';
  const result = runFixture(t, wf, businessObjects);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /XDX_ABSENT_FUNCTION/);
});

test('real CLI rejects a nested missing path token', t => {
  const wf = nestedWorkflow();
  nestedConsumer(wf).inputs = [];
  const result = runFixture(t, wf, businessObjects);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /BO_PATH_TOKEN_INPUT_MISSING/);
});

test('real CLI accepts resolved nested BO bindings without requiring query-only parameters', t => {
  const result = runFixture(t, nestedWorkflow(), businessObjects);
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /contract: PASS/);
});

// Assignment metadata is checked in every pipeline, including nested loop bodies.
for (const field of ['type', 'scope', 'typeSpecification']) {
  for (const nested of [false, true]) {
    const nodes = baseNodes();
    const assignment = { id: '5', code: 'PERSIST_STATE', type: 'SET_FIELDS', inputs: [{ name: 'state', value: '{}', [field]: 'declaration-only' }], outcomes: {} };
    if (nested) nodes.push({ id: '6', code: 'LOOP', type: 'LOOP', body: { pipelineNodes: [assignment] }, outcomes: {} });
    else nodes.push(assignment);
    assert.ok(validateWorkflow(workflow(nodes)).some(f => f.code === 'SET_FIELDS_DECLARATION_METADATA' && f.message.includes(field)), `${field} must be rejected in ${nested ? 'nested' : 'root'} assignments`);
  }
}
const leanNodes = baseNodes();
leanNodes.push({ id: '5', code: 'PERSIST_STATE', type: 'SET_FIELDS', inputs: [{ id: 'state-input', name: 'state', value: '{}' }], outcomes: {} });
const declaredWorkflow = workflow(leanNodes);
declaredWorkflow.specification.dataPipeline.variables = [{ id: 'state', name: 'state', type: 'object', scope: 'CONVERSATION', typeSpecification: '{"type":"object"}' }];
assert.deepEqual(validateWorkflow(declaredWorkflow), []);


