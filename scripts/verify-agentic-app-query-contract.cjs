#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');

function pipelineCollections(value, found = []) {
  if (!value || typeof value !== 'object') return found;
  if (Array.isArray(value.pipelineNodes)) found.push(value.pipelineNodes);
  for (const child of Object.values(value)) pipelineCollections(child, found);
  return found;
}

function edgeTargets(node) {
  const targets = [];
  for (const target of Object.values(node.outcomes || {})) {
    if (typeof target === 'string' && target.trim()) targets.push(target.trim());
  }
  for (const target of [node.convergenceTargetId, node.metadata?.loopBackNodeId]) {
    if (typeof target === 'string' && target.trim()) targets.push(target.trim());
  }
  return [...new Set(targets)];
}

function countOccurrences(value, token) {
  return value.split(token).length - 1;
}

function validateBindingExpressions(nodes, label = 'root') {
  const failures = [];
  const byCode = new Map(nodes.map((node) => [node.code, node]));
  const byId = new Map(nodes.map((node) => [String(node.id), node]));

  function canReach(source, target) {
    const queue = [String(source.id)];
    const visited = new Set();
    while (queue.length) {
      const id = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);
      if (id === String(target.id)) return true;
      const node = byId.get(id);
      if (node) queue.push(...edgeTargets(node));
    }
    return false;
  }

  for (const node of nodes) {
    for (const input of node.inputs || []) {
      if (typeof input.value !== 'string') continue;
      const value = input.value;
      const opens = countOccurrences(value, '{{');
      const closes = countOccurrences(value, '}}');
      if (opens !== closes) {
        failures.push({
          code: 'WORKFLOW_BINDING_EXPRESSION_MALFORMED',
          message: `${label}: ${node.code || node.id}.${input.name} has an incomplete or unbalanced binding expression.`
        });
        continue;
      }

      const referencedCodes = [...value.matchAll(/\$nodes\.([A-Za-z0-9_]+)/g)].map((match) => match[1]);
      for (const referencedCode of new Set(referencedCodes)) {
        const producer = byCode.get(referencedCode);
        if (!producer) {
          failures.push({
            code: 'WORKFLOW_BINDING_PRODUCER_MISSING',
            message: `${label}: ${node.code || node.id}.${input.name} references missing producer ${referencedCode}.`
          });
        } else if (!canReach(producer, node)) {
          failures.push({
            code: 'WORKFLOW_BINDING_PRODUCER_UNREACHABLE',
            message: `${label}: ${node.code || node.id}.${input.name} references ${referencedCode}, which cannot reach the consumer.`
          });
        }
      }
    }
  }
  return failures;
}

function validateBoFunctionBindings(workflow, businessObjects, label = 'root') {
  const nodes = workflow?.specification?.dataPipeline?.pipelineNodes || [];
  const objectTools = new Map();
  for (const businessObject of businessObjects) {
    objectTools.set(businessObject.objectCode, new Map(
      (businessObject.objectProperties?.tools || []).map((tool) => [tool.name, tool])
    ));
  }

  const failures = [];
  for (const node of nodes.filter((candidate) => candidate.type === 'BO_FUNCTION')) {
    const objectCode = node.metadata?.businessObjectCode;
    const functionName = node.metadata?.functionName;
    const tool = objectTools.get(objectCode)?.get(functionName);
    if (!tool) continue;
    const pathOnly = String(tool.resourcePath || '').split('?', 1)[0];
    const pathTokens = [...pathOnly.matchAll(/\{([^{}]+)\}/g)].map((match) => match[1]);
    const inputs = new Map((node.inputs || []).map((input) => [input.name, input]));
    for (const token of new Set(pathTokens)) {
      const input = inputs.get(token);
      if (!input) {
        failures.push({
          code: 'BO_PATH_TOKEN_INPUT_MISSING',
          message: `${label}: ${node.code || node.id} (${objectCode}.${functionName}) has no input for path token ${token}.`
        });
      } else if (input.value === null || input.value === undefined || String(input.value).trim() === '') {
        failures.push({
          code: 'BO_PATH_TOKEN_INPUT_BLANK',
          message: `${label}: ${node.code || node.id}.${token} is blank for ${objectCode}.${functionName}.`
        });
      }
    }
  }
  return failures;
}

function findQueryRouter(nodes) {
  return nodes.find((node) =>
    node?.outcomes && typeof node.outcomes.Query === 'string' &&
    (node.code === 'APP_STAGE_ROUTER' ||
      (node.inputs || []).some((input) => String(input.value || '').includes('$OraMessageHint')))
  );
}

function validateQueryPipeline(nodes, label = 'root') {
  const byId = new Map(nodes.map((node) => [String(node.id), node]));
  const router = findQueryRouter(nodes);
  if (!router) {
    return [{ code: 'APP_QUERY_ROUTE_MISSING', message: `${label}: no Agentic App Query route was found.` }];
  }

  const queryTarget = String(router.outcomes.Query || '').trim();
  if (!queryTarget || !byId.has(queryTarget)) {
    return [{
      code: 'APP_QUERY_TARGET_MISSING',
      message: `${label}: ${router.code || router.id}.Query targets missing node ${queryTarget || '<blank>'}.`
    }];
  }

  const failures = [];
  const queue = [{ id: queryTarget, path: [router.code || String(router.id)] }];
  const visited = new Set();
  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current.id)) continue;
    visited.add(current.id);
    const node = byId.get(current.id);
    if (!node) {
      failures.push({
        code: 'APP_QUERY_EDGE_TARGET_MISSING',
        message: `${label}: reachable path ${current.path.join(' -> ')} targets missing node ${current.id}.`
      });
      continue;
    }
    const nodeCode = node.code || String(node.id);
    const nextPath = [...current.path, nodeCode];
    if (node.type === 'HUMAN' || node.type === 'WAIT') {
      failures.push({
        code: 'APP_QUERY_SUSPENSION_UNSUPPORTED',
        message: `${label}: Agentic App Query reaches ${nodeCode} (${node.type}) via ${nextPath.join(' -> ')}.`
      });
    }
    for (const target of edgeTargets(node)) queue.push({ id: target, path: nextPath });
  }
  return failures;
}

function validateWorkflow(workflow) {
  const rootNodes = workflow?.specification?.dataPipeline?.pipelineNodes;
  if (!Array.isArray(rootNodes)) {
    return [{ code: 'WORKFLOW_PIPELINE_MISSING', message: 'Workflow specification.dataPipeline.pipelineNodes is missing.' }];
  }
  const failures = [
    ...validateQueryPipeline(rootNodes),
    ...validateBindingExpressions(rootNodes),
  ];
  const queryRouter = findQueryRouter(rootNodes);
  if (queryRouter) {
    const byId = new Map(rootNodes.map((node) => [String(node.id), node]));
    const queue = [String(queryRouter.outcomes.Query || '')];
    const visited = new Set();
    while (queue.length) {
      const id = queue.shift();
      if (!id || visited.has(id)) continue;
      visited.add(id);
      const node = byId.get(id);
      if (!node) continue;
      const nested = pipelineCollections(node).filter((collection) => collection !== rootNodes);
      for (const nodes of nested) {
        for (const nestedNode of nodes) {
          if (nestedNode.type === 'HUMAN' || nestedNode.type === 'WAIT') {
            failures.push({
              code: 'APP_QUERY_SUSPENSION_UNSUPPORTED',
              message: `nested under ${node.code || node.id}: ${nestedNode.code || nestedNode.id} (${nestedNode.type}) is part of the Query route.`
            });
          }
        }
      }
      queue.push(...edgeTargets(node));
    }
  }
  return failures;
}

function main(argv) {
  const fileArg = argv[2];
  if (!fileArg) {
    console.error('Usage: node scripts/verify-agentic-app-query-contract.cjs <workflow.wf>');
    return 2;
  }
  const file = path.resolve(fileArg);
  const workflow = JSON.parse(fs.readFileSync(file, 'utf8'));
  const businessObjectDirectory = path.resolve(path.dirname(file), '..', 'businessObjects');
  const businessObjects = fs.existsSync(businessObjectDirectory)
    ? fs.readdirSync(businessObjectDirectory)
      .filter((name) => name.endsWith('.bo'))
      .map((name) => JSON.parse(fs.readFileSync(path.join(businessObjectDirectory, name), 'utf8')))
    : [];
  const failures = [
    ...validateWorkflow(workflow),
    ...validateBoFunctionBindings(workflow, businessObjects),
  ];
  if (failures.length) {
    console.error('Agentic App Query contract: FAIL');
    for (const failure of failures) console.error(`- ${failure.code}: ${failure.message}`);
    return 1;
  }
  console.log('Agentic App Query contract: PASS');
  console.log(`- Workflow: ${workflow.workflowCode || path.basename(file)}`);
  console.log('- Query route has no reachable HUMAN or WAIT node.');
  console.log('- Workflow binding expressions are balanced and reference reachable producers.');
  console.log('- Local BO path tokens have nonblank workflow inputs.');
  return 0;
}

if (require.main === module) process.exitCode = main(process.argv);

module.exports = {
  edgeTargets,
  findQueryRouter,
  validateBindingExpressions,
  validateBoFunctionBindings,
  validateQueryPipeline,
  validateWorkflow,
};
