#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { inspect: inspectSearchContract } = require('./verify-bo-search-contract.cjs');

function validateBoSearchContracts(workflow, businessObjects) {
  const used = new Map();
  for (const nodes of pipelineCollections(workflow)) for (const node of nodes) {
    if (node.type !== 'BO_FUNCTION') continue;
    const code = node.metadata?.businessObjectCode;
    if (!used.has(code)) used.set(code, new Set());
    used.get(code).add(node.metadata?.functionName);
  }
  return businessObjects.flatMap(bo => {
    const names = used.get(bo.objectCode);
    if (!names) return [];
    const scoped = { ...bo, objectProperties: { ...bo.objectProperties, tools: (bo.objectProperties?.tools || []).filter(fn => names.has(fn.name)) } };
    return inspectSearchContract(scoped, bo.objectCode).errors.map(message => ({ code: 'BO_SEARCH_FRAMEWORK_REQUIRED', message }));
  });
}

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
  for (const target of [node.convergenceTargetId, node.metadata?.loopBackNodeId, node.metadata?.errorNodeId]) {
    if (typeof target === 'string' && target.trim()) targets.push(target.trim());
  }
  return [...new Set(targets)];
}

// Keep lexical pipeline ownership: flattening these collections loses both entry
// semantics and the distinction between an ancestor and a sibling producer.
function bindingScope(pipeline, parent = null, container = null, label = 'root') {
  const nodes = pipeline.pipelineNodes;
  const scope = { nodes, parent, container, label, children: [],
    byCode: new Map(nodes.map(node => [node.code, node])),
    byId: new Map(nodes.map(node => [String(node.id), node])) };
  const root = pipeline.rootNode;
  if (root !== undefined && root !== null && String(root).trim()) {
    scope.entries = [String(typeof root === 'object' ? root.id : root)];
  } else {
    const starts = nodes.filter(node => node.type === 'START');
    const router = findQueryRouter(nodes);
    const incoming = new Set(nodes.flatMap(edgeTargets));
    scope.entries = starts.length ? starts.map(node => String(node.id))
      : router ? [String(router.id)]
        : nodes.filter(node => !incoming.has(String(node.id))).map(node => String(node.id));
  }
  function collect(value, owner) {
    if (!value || typeof value !== 'object') return;
    if (Array.isArray(value.pipelineNodes)) {
      scope.children.push(bindingScope(value, scope, owner, `${label}/${owner.code || owner.id}`));
      return;
    }
    for (const child of Object.values(value)) collect(child, owner);
  }
  for (const node of nodes) for (const value of Object.values(node)) collect(value, node);
  return scope;
}

function expressionsAreOrdered(value) {
  let inExpression = false;
  let braces = 0;
  let quote = null;
  let escaped = false;
  let expressionStart = 0;
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    const pair = value.slice(i, i + 2);
    if (!inExpression) {
      if (pair === '}}') return false;
      if (pair === '{{') { inExpression = true; expressionStart = i + 2; i++; }
      continue;
    }
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (pair === '{{') return false;
    if (pair === '}}' && braces === 0) {
      if (!value.slice(expressionStart, i).trim()) return false;
      inExpression = false;
      i++;
      continue;
    }
    if (char === '{') braces++;
    else if (char === '}' && braces > 0) braces--;
  }
  return !inExpression;
}

function availabilityTargets(node) {
  // A convergence declaration is a join, not a shortcut around the branches.
  const branchTargets = Object.values(node.outcomes || {}).filter(target => typeof target === 'string' && target.trim()).map(target => target.trim());
  const hasBranchJoin = ['SWITCH', 'CONDITION', 'PARALLEL'].includes(node.type) && branchTargets.length > 0;
  return [...new Set([...branchTargets,
    ...(!hasBranchJoin && node.convergenceTargetId ? [String(node.convergenceTargetId)] : []),
    ...[node.metadata?.loopBackNodeId, node.metadata?.errorNodeId].filter(target => typeof target === 'string' && target.trim()).map(target => target.trim())])];
}

function reachesBefore(scope, entries, target, stop) {
  const pending = [...entries];
  const seen = new Set();
  while (pending.length) {
    const id = pending.pop();
    if (id === stop || seen.has(id)) continue;
    if (id === target) return true;
    seen.add(id);
    const node = scope.byId.get(id);
    if (node) pending.push(...availabilityTargets(node));
  }
  return false;
}

function outputAvailability(scope, producer, consumer, entries = scope.entries, activeParallels = new Set()) {
  const target = String(consumer.id);
  const pending = entries.map(id => ({ id, available: false }));
  const seen = new Set();
  const result = { reached: false, unavailable: false, escaped: false };
  while (pending.length) {
    const { id, available } = pending.pop();
    const key = `${id}:${available}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (id === target) {
      result.reached = true;
      if (!available) result.unavailable = true;
      continue;
    }
    const node = scope.byId.get(id);
    if (!node) { result.escaped = true; continue; }
    const branches = Object.values(node.outcomes || {}).map(String);
    const join = String(node.convergenceTargetId || '');
    if (node.type === 'PARALLEL' && branches.length >= 2 && scope.byId.has(join) && !activeParallels.has(id)
      && !reachesBefore(scope, branches, target, join)) {
      const nested = new Set([...activeParallels, id]);
      const summaries = branches.map(entry => outputAvailability(scope, producer, scope.byId.get(join), [entry], nested));
      if (summaries.every(summary => summary.reached && !summary.escaped)) {
        // All branches complete before fan-in; any guaranteed branch output is
        // then available. A conditional producer within a branch is insufficient.
        pending.push({ id: join, available: available || node === producer || summaries.some(summary => !summary.unavailable) });
        const error = node.metadata?.errorNodeId;
        if (error) pending.push({ id: String(error), available: node === producer ? false : available });
        const loopBack = node.metadata?.loopBackNodeId;
        if (loopBack) pending.push({ id: String(loopBack), available: node === producer ? false : available });
        continue;
      }
    }
    const targets = availabilityTargets(node);
    if (!targets.length) result.escaped = true;
    for (const next of targets) {
      const failed = next === String(node.metadata?.errorNodeId || '');
      pending.push({ id: next, available: node === producer ? !failed && node.type !== 'PARALLEL' : available });
    }
  }
  return result;
}

function resolveProducer(scope, parts, consumer) {
  let owner = scope;
  let boundary = consumer;
  while (owner && !owner.byCode.has(parts[0])) {
    boundary = owner.container;
    owner = owner.parent;
  }
  if (!owner) return null;
  let producer = owner.byCode.get(parts[0]);
  let index = 1;
  // Within a loop body, its item/index exist while the container is running;
  // the container's completed $output does not yet exist.
  if (producer === boundary && owner !== scope && producer.type === 'LOOP'
    && (parts[index] === '$currentItem' || parts[index] === '$currentItemIndex')) return { currentItem: true };
  while (parts[index] && !parts[index].startsWith('$')) {
    const child = owner.children.find(candidate => candidate.container === producer && candidate.byCode.has(parts[index]));
    if (!child) return null;
    producer = child.byCode.get(parts[index++]);
    if (child === scope) { owner = child; boundary = consumer; }
    else if (isScopeAncestor(child, scope)) {
      owner = child;
      let descendant = scope;
      while (descendant.parent !== child) descendant = descendant.parent;
      boundary = descendant.container;
    } else return null; // An inner iteration's output is not a root-scope producer.
  }
  if (producer === boundary && owner !== scope && producer.type === 'LOOP'
    && (parts[index] === '$currentItem' || parts[index] === '$currentItemIndex')) return { currentItem: true };
  return { scope: owner, producer, consumer: boundary };
}

function isScopeAncestor(candidate, scope) {
  for (let current = scope.parent; current; current = current.parent) if (current === candidate) return true;
  return false;
}

function validateBindingExpressions(nodes, label = 'root', pipeline = { pipelineNodes: nodes }) {
  const failures = [];
  const root = bindingScope(pipeline, null, null, label);
  function validateScope(scope) {
  for (const node of scope.nodes) {
    for (const input of node.inputs || []) {
      if (typeof input.value !== 'string') continue;
      const value = input.value;
      if (!expressionsAreOrdered(value)) {
        failures.push({
          code: 'WORKFLOW_BINDING_EXPRESSION_MALFORMED',
          message: `${scope.label}: ${node.code || node.id}.${input.name} has an incomplete or unbalanced binding expression.`
        });
        continue;
      }

      const references = [...value.matchAll(/\$nodes\.([A-Za-z0-9_]+(?:\.[A-Za-z0-9_$]+)*)/g)].map(match => match[1]);
      for (const reference of new Set(references)) {
        const resolved = resolveProducer(scope, reference.split('.'), node);
        if (!resolved) {
          failures.push({
            code: 'WORKFLOW_BINDING_PRODUCER_MISSING',
            message: `${scope.label}: ${node.code || node.id}.${input.name} references missing producer ${reference}.`
          });
        } else if (!resolved.currentItem) {
          const { scope: producerScope, producer, consumer } = resolved;
          const availability = outputAvailability(producerScope, producer, consumer);
          if (producer !== consumer && availability.reached && !availability.unavailable) continue;
          const reachable = reachesBefore(producerScope, [String(producer.id)], String(consumer.id));
          failures.push({
            code: reachable ? 'WORKFLOW_BINDING_PRODUCER_NOT_DOMINATING' : 'WORKFLOW_BINDING_PRODUCER_UNREACHABLE',
            message: `${scope.label}: ${node.code || node.id}.${input.name} references ${reference}, whose completed output is not available on every incoming route to the consumer.`
          });
        }
      }
    }
  }
  for (const child of scope.children) validateScope(child);
  }
  validateScope(root);
  return failures;
}

function validateBoFunctionBindings(workflow, businessObjects, label = 'root') {
  const collections = pipelineCollections(workflow);
  const objectTools = new Map();
  for (const businessObject of businessObjects) {
    objectTools.set(businessObject.objectCode, new Map(
      (businessObject.objectProperties?.tools || []).map((tool) => [tool.name, tool])
    ));
  }

  const failures = [];
  for (const nodes of collections) for (const node of nodes.filter((candidate) => candidate.type === 'BO_FUNCTION')) {
    const objectCode = node.metadata?.businessObjectCode;
    const functionName = node.metadata?.functionName;
    const tools = objectTools.get(objectCode);
    if (!tools) {
      failures.push({ code: 'BO_OBJECT_UNRESOLVED',
        message: `${label}: ${node.code || node.id} references unresolved local business object ${objectCode || '<blank>'} (${functionName || '<blank>'}).` });
      continue;
    }
    const tool = tools.get(functionName);
    if (!tool) {
      failures.push({ code: 'BO_FUNCTION_UNRESOLVED',
        message: `${label}: ${node.code || node.id} references unresolved function ${objectCode}.${functionName || '<blank>'}.` });
      continue;
    }
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
    ...validateBindingExpressions(rootNodes, 'root', workflow.specification.dataPipeline),
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
    ...validateBoSearchContracts(workflow, businessObjects),
  ];
  if (failures.length) {
    console.error('Agentic App Query contract: FAIL');
    for (const failure of failures) console.error(`- ${failure.code}: ${failure.message}`);
    return 1;
  }
  console.log('Agentic App Query contract: PASS');
  console.log(`- Workflow: ${workflow.workflowCode || path.basename(file)}`);
  console.log('- Query route has no reachable HUMAN or WAIT node.');
  console.log('- Workflow binding expressions are ordered and reference available producers in their pipeline scopes.');
  console.log('- Referenced local BO functions resolve and their path tokens have nonblank workflow inputs.');
  console.log('- Referenced ADF search GET functions declare a compatible REST framework header.');
  return 0;
}

if (require.main === module) process.exitCode = main(process.argv);

module.exports = {
  edgeTargets,
  findQueryRouter,
  validateBindingExpressions,
  validateBoFunctionBindings,
  validateBoSearchContracts,
  validateQueryPipeline,
  validateWorkflow,
};
