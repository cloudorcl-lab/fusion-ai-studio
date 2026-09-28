'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { inspect } = require('./verify-bo-search-contract.cjs');
const { validateBoSearchContracts } = require('./verify-agentic-app-query-contract.cjs');
const make = (headers, patch = {}) => ({ objectSource: 'ADF_BC', objectProperties: { tools: [{ name: 'ListSuppliers', operationType: 'GET', resourcePath: '/suppliers?q={q}', headers, ...patch }] } });
test('rejects the observed omitted header and framework1 on a query GET', () => {
  assert.equal(inspect(make(undefined), 'fixture').errors.length, 1);
  assert.equal(inspect(make({'REST-Framework-Version':'1'}), 'fixture').errors.length, 1);
});
test('accepts explicit4 and preserves independently supported9', () => {
  for (const v of ['4','9']) assert.deepEqual(inspect(make({'REST-Framework-Version':v}), 'fixture').errors, []);
});
test('catches collection and lookup functions even without q token', () => {
  assert.equal(inspect(make({}, { name:'LookupProcurementBU', resourcePath:'/procurementBusinessUnitsLOV' }), 'fixture').errors.length, 1);
  assert.equal(inspect(make({}, { name:'Read', operationId:'getall_suppliers', resourcePath:'/suppliers' }), 'fixture').errors.length, 1);
});
test('does not rewrite item GET, POST or non-ADF contracts', () => {
  assert.equal(inspect(make({}, { name:'GetSupplier', resourcePath:'/suppliers/{id}' }), 'fixture').checked.length, 0);
  assert.equal(inspect(make({}, { operationType:'POST' }), 'fixture').checked.length, 0);
  const b = make({}); b.objectSource='NonFusionOracleSource'; assert.equal(inspect(b,'fixture').checked.length, 0);
});
test('rejects ambiguous duplicate case-insensitive header names', () => {
  assert.equal(inspect(make({'REST-Framework-Version':'4','rest-framework-version':'1'}), 'fixture').errors.length, 1);
});
test('mandatory workflow preflight rejects referenced missing header but ignores unrelated BOs', () => {
  const bo = make({}); bo.objectCode = 'XDX_TEST';
  const workflow = { specification: { dataPipeline: { pipelineNodes: [{ type:'BO_FUNCTION', metadata:{ businessObjectCode:'XDX_TEST', functionName:'ListSuppliers' } }] } } };
  assert.equal(validateBoSearchContracts(workflow, [bo])[0].code, 'BO_SEARCH_FRAMEWORK_REQUIRED');
  bo.objectProperties.tools[0].headers = {'REST-Framework-Version':'4'};
  assert.deepEqual(validateBoSearchContracts(workflow, [bo]), []);
  bo.objectCode='UNRELATED'; bo.objectProperties.tools[0].headers={};
  assert.deepEqual(validateBoSearchContracts(workflow, [bo]), []);
});
