#!/usr/bin/env node
/** Actual-capture evidence deck. Never executes application operations. */
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';

const DEFAULT_SKILL = path.join(os.homedir(), '.codex/plugins/cache/openai-primary-runtime/presentations/26.1013.11914/skills/presentations');
const DEFAULT_RUNTIME = path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies');
const STATUS = new Set(['PASS', 'FAIL', 'BLOCKED', 'PENDING']);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const textValue = value => typeof value === 'string' ? value : JSON.stringify(value ?? 'Not recorded');
const relative = (root, file) => path.relative(root, file).split(path.sep).join('/');
const safeDate = value => value && Number.isFinite(Date.parse(value)) ? value : 'Not recorded';
const wrapText = (value, width = 94) => String(value).split('\n').map(line => {
  const lines = []; let current = '';
  for (const word of line.split(/\s+/)) {
    if (current && current.length + word.length + 1 > width) { lines.push(current); current = word; }
    else current += `${current ? ' ' : ''}${word}`;
  }
  lines.push(current); return lines.join('\n');
}).join('\n');

export function validateResults(data) {
  if (!data || typeof data.runId !== 'string' || !data.runId.trim() || !Array.isArray(data.steps)) throw new Error('results requires runId and steps array');
  const ids = new Set();
  for (const step of data.steps) {
    if (!step.id || ids.has(step.id) || !STATUS.has(step.status)) throw new Error(`Invalid/duplicate step or status: ${step.id}`);
    ids.add(step.id);
    if (!Array.isArray(step.captures) || !Array.isArray(step.retries)) throw new Error(`${step.id} requires captures/retries arrays`);
    for (const capture of step.captures) {
      if (typeof capture.path !== 'string' || !capture.path || path.isAbsolute(capture.path) || capture.path.includes('\\') || capture.path.split('/').includes('..') || capture.path.includes(':')) throw new Error(`${step.id}: capture path must be repository relative`);
    }
  }
  return data;
}

export function captureSlideTitle(step, capture) {
  const title = capture.title || step.title || step.id;
  // Reviewer-confirmed screen descriptions override historical action-stage keys.
  return /in progress|error|failed|failure|blocked/i.test(title) ? title : `${title}: ${(capture.stage || 'screen').replaceAll('-', ' ')}`;
}

export function buildSlidePlan(data, inputPath, findings = []) {
  validateResults(data);
  const slides = [{ kind: 'opening', title: 'Supplier workflow evidence', notes: `Run: ${data.runId}\nSource: ${inputPath}` }];
  slides.push({ kind: 'scope', title: 'Run scope and environment', notes: JSON.stringify(data.target ?? {}, null, 2) });
  const timeline = [];
  for (const step of data.steps) {
    const common = `Step: ${step.id}\nObject: ${step.object}\nScenario: ${step.scenario}\nOutcome: ${step.status}\nExpected: ${textValue(step.expected)}\nActual: ${textValue(step.actual)}\nRecord IDs: ${textValue(step.recordIds)}\nFallback: ${Boolean(step.fallback)}\nRetries: ${JSON.stringify(step.retries)}\nSource results: ${inputPath}`;
    if (!step.captures.length) timeline.push({ kind: 'no-capture', title: step.title || step.id, step, orderUtc: step.endedUtc, notes: `${common}\nNo screenshot exists for this step. No screenshot has been fabricated.` });
    for (const capture of step.captures) {
      const title = captureSlideTitle(step, capture);
      timeline.push({ kind: 'capture', title, step, capture, orderUtc: capture.observedUtc, notes: `${common}\nRecorded action/stage key: ${capture.stage || 'Not recorded'}\nObserved UTC: ${safeDate(capture.observedUtc)}\nScreenshot: ${capture.path}\nSemantic evidence: ${capture.semanticPath || 'Not recorded'}\nCapture notes: ${textValue(capture.notes)}\nTiming qualification: Some retained setup captures use persistence time rather than original acquisition time. See run limitations.` });
    }
  }
  timeline.sort((a, b) => (Date.parse(a.orderUtc) || 0) - (Date.parse(b.orderUtc) || 0));
  slides.push(...timeline);
  const objects = [...new Set(data.steps.map(step => step.object))];
  for (let index = 0; index < objects.length; index += 4) slides.push({ kind: 'coverage', title: 'Coverage by object', objects: objects.slice(index, index + 4), notes: 'Counts represent planned step outcomes. The extra Test harness finding is separate from the business plan. Fallback outcomes remain separate from the original connected journey.' });
  const records = data.steps.filter(step => Object.keys(step.recordIds ?? {}).length);
  if (!records.length) slides.push({ kind: 'records', title: 'Retained records', records: [], notes: 'No record IDs recorded in result file.' });
  for (let index = 0; index < records.length; index += 2) slides.push({ kind: 'records', title: 'Retained records', records: records.slice(index, index + 2), notes: JSON.stringify(records.slice(index, index + 2).map(step => ({ stepId: step.id, recordIds: step.recordIds })), null, 2) });
  slides.push({ kind: 'closing', title: 'Run results and timing', notes: `Durable result tracking started UTC: ${safeDate(data.startedUtc)}\nFirst UI submission UTC: ${safeDate(data.uiFirstSubmittedUtc)}\nUI execution ended UTC: ${safeDate(data.endedUtc)}\nConnected outcomes exclude fallback tests. A complete report does not imply a passing connected journey.\nTiming source: result timestamps, separate from build ledger effort. Retained setup capture metadata may be persistence time.\n${JSON.stringify(data.timing ?? {})}` });
  const nonPassing = data.steps.filter(step => step.status !== 'PASS');
  for (let index = 0; index < nonPassing.length; index += 2) slides.push({ kind: 'outcomes', title: 'Failures and blocked stages', steps: nonPassing.slice(index, index + 2), notes: JSON.stringify(nonPassing.slice(index, index + 2).map(step => ({ id: step.id, status: step.status, actual: step.actual, fallback: step.fallback })), null, 2) });
  const limitations = data.limitations ?? [];
  for (let index = 0; index < limitations.length; index += 4) slides.push({ kind: 'limitations', title: 'Evidence scope and limitations', limitations: limitations.slice(index, index + 4), notes: limitations.slice(index, index + 4).join('\n\n') });
  for (const finding of findings) {
    const applicationFinding = ['F010', 'F011'].includes(finding.id) && ['contact', 'assignment'].includes(finding.scope);
    slides.push({ kind: 'implementation', title: `${applicationFinding ? 'Application finding' : 'Implementation appendix'}: ${finding.id}`, finding, applicationFinding, notes: `${applicationFinding ? 'Application failure retained. No product repair claimed.' : 'Implementation or preflight finding. Separate from application test results.'}\n${JSON.stringify(finding, null, 2)}` });
  }
  return slides;
}

async function runtimeModules() {
  const directory = process.env.RUNTIME_NODE_MODULES || process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || path.join(DEFAULT_RUNTIME, 'node/node_modules');
  const req = createRequire(path.join(directory, '__runtime__.cjs'));
  const entry = req.resolve('@oai/artifact-tool');
  process.env.RUNTIME_NODE_MODULES = directory;
  return import(pathToFileURL(entry).href);
}

export async function generateDeck({ resultsPath, repoRoot = process.cwd(), outputDir, skillDir = process.env.PRESENTATIONS_SKILL_DIR || DEFAULT_SKILL }) {
  const startedUtc = new Date().toISOString();
  const root = await fs.realpath(repoRoot);
  const source = path.resolve(root, resultsPath);
  const dataBytes = await fs.readFile(source);
  const data = validateResults(JSON.parse(dataBytes.toString('utf8').replace(/^\uFEFF/, '')));
  const ledgerPath = path.join(path.dirname(source), 'failure-ledger.json');
  const ledgerBytes = await fs.readFile(ledgerPath).catch(() => null);
  const findings = ledgerBytes ? JSON.parse(ledgerBytes.toString('utf8').replace(/^\uFEFF/, '')).failures : [];
  const slides = buildSlidePlan(data, relative(root, source), findings);
  const base = path.resolve(root, outputDir || path.join(path.dirname(relative(root, source)), 'deck'));
  const inside = path.relative(root, base);
  if (!inside || inside.startsWith('..') || path.isAbsolute(inside)) throw new Error('Deck output must be a subdirectory of repository root');
  await fs.mkdir(base, { recursive: true });
  const revision = new Date().toISOString().replace(/[:.]/g, '-');
  const workspace = path.join(base, revision);
  const staging = path.join(workspace, 'private');
  const finalDir = path.join(workspace, 'output');
  const renderDir = path.join(workspace, 'renders');
  for (const dir of [staging, finalDir, renderDir]) await fs.mkdir(dir, { recursive: true });
  const { Presentation, PresentationFile, FileBlob } = await runtimeModules();
  const helpers = await import(pathToFileURL(path.join(skillDir, 'container_tools/artifact_tool_utils.mjs')).href);
  const font = helpers.resolvePresentationFont();
  // The skill requires one operation marker immediately before authoring.
  const marked = spawnSync(process.execPath, [path.join(skillDir, 'container_tools/mark_artifact_operation_started.mjs'), '--operation-kind', 'create', '--expected-output-count', '1', '--output-format', 'pptx'], { cwd: skillDir, encoding: 'utf8', shell: false });
  if (marked.error || marked.status !== 0) throw new Error(`Artifact operation marker failed: ${marked.error?.message || marked.stderr}`);
  const presentation = Presentation.create({ slideSize: { width: 1600, height: 900 } });
  const manifest = [];
  const captureIssues = [];
  const body = (slide, value, top = 190, fontSize = 30, height = 620, bold = false) => {
    const shape = slide.shapes.add({ geometry: 'textbox', position: { left: 60, top, width: 1480, height }, fill: 'none', line: { fill: 'none', width: 0 } });
    shape.text = String(value);
    // text.style is an assignment surface. Do not read it to mutate a subfield.
    shape.text.style = { typeface: font, fontSize, color: '#25354A', bold };
    return shape;
  };
  for (const [index, item] of slides.entries()) {
    const slide = presentation.slides.add();
    slide.background.fill = '#FFFFFF';
    body(slide, item.title, 30, item.kind === 'opening' ? 56 : 42, 100, true);
    const label = item.step ? `${item.step.id}    Step result: ${item.step.status}${item.step.fallback ? '    FALLBACK TEST' : ''}` : `Run ${data.runId}`;
    body(slide, label, 132, 24, 44);
    slide.speakerNotes.text = item.notes;
    const record = { slide: index + 1, kind: item.kind, stepId: item.step?.id ?? null, notesPresent: Boolean(item.notes), capturePath: item.capture?.path ?? null };
    if (item.kind === 'capture') {
      try {
        const absolute = await fs.realpath(path.join(root, item.capture.path));
        const rel = path.relative(root, absolute);
        if (rel.startsWith('..') || path.isAbsolute(rel)) throw new Error('Screenshot escapes repository');
        const bytes = await fs.readFile(absolute);
        const contentType = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ? 'image/png' : bytes[0] === 255 && bytes[1] === 216 ? 'image/jpeg' : null;
        if (!contentType) throw new Error('Only actual PNG/JPEG screenshot files are supported');
        slide.images.add({ blob: new Uint8Array(bytes), contentType, alt: `${item.step.id}: ${item.title}`, fit: 'contain', position: { left: 24, top: 184, width: 1552, height: 684 } });
        record.captureSha256 = hash(bytes);
        record.embedded = true;
      } catch (error) {
        captureIssues.push({ stepId: item.step.id, capturePath: item.capture.path, error: error.message });
        record.embedded = false;
        body(slide, `Screenshot unavailable\n${item.capture.path}\n${error.message}`, 220);
        slide.speakerNotes.text += `\nCapture delivery error: ${error.message}`;
      }
    } else if (item.kind === 'opening') {
      body(slide, `Supplier, Address, Contact, Site and Site Assignment\n\nActual workflow screens and recorded outcomes\n\n${data.startedUtc || 'Start not recorded'}`, 240, 34);
    } else if (item.kind === 'scope') {
      body(slide, `Application: ${data.target?.appCode || 'Not recorded'}\nWorkflow: ${data.target?.workflowCode || 'Not recorded'}\nVersion: ${data.target?.version || 'Not recorded'}\nHost: ${data.target?.host || 'Not recorded'}\nSurface: ${data.target?.surface || 'Not recorded'}\n\nDirect and template scenarios where supported\nQuery, create and independent readback`, 200, 30);
    } else if (item.kind === 'no-capture') {
      body(slide, `Expected: ${textValue(item.step.expected)}\n\nObserved: ${textValue(item.step.actual)}\n\nNo screen capture recorded`, 220, 30);
    } else if (item.kind === 'coverage') {
      body(slide, item.objects.map(object => {
        const steps = data.steps.filter(step => step.object === object);
        const counts = [...STATUS].map(status => `${status} ${steps.filter(step => step.status === status).length}`).join('    ');
        return `${object}\n${counts}\nFallback steps ${steps.filter(step => step.fallback).length}`;
      }).join('\n\n'), 200, 28);
    } else if (item.kind === 'records') {
      body(slide, item.records.length ? item.records.map(step => `${step.id}${step.fallback ? ' (fallback)' : ''}\n${Object.entries(step.recordIds).map(([key, value]) => `${key}: ${value}`).join('\n')}`).join('\n\n') : 'No retained record IDs recorded', 220, 28);
    } else if (item.kind === 'outcomes') {
      body(slide, wrapText(item.steps.map(step => `${step.title}: ${step.status}${step.fallback ? ' (fallback)' : ''}\n${step.actual}`).join('\n\n')), 210, 27);
    } else if (item.kind === 'limitations') {
      body(slide, item.limitations.join('\n\n'), 210, 28);
    } else if (item.kind === 'implementation') {
      const symptom = item.finding.id === 'F012' ? 'Some screenshot captions described completion while the image still showed processing.' : item.finding.symptom;
      const correction = item.finding.id === 'F012' ? 'Retained all original images. Labeled processing and error frames accurately. Preserved later completed screens and added a final Assignment result capture without repeating a request. Final package review records delivery acceptance.' : item.finding.id === 'F011' ? 'No product repair claimed. The standalone Assignment query remains FAIL. Embedded Assignment creation and readback remain separately PASS. No unchanged retry.' : item.finding.correction;
      body(slide, wrapText(`${item.applicationFinding ? 'Application test failure retained. No product repair claimed.' : 'Implementation/preflight finding, separate from business outcomes'}\n\nScope: ${item.finding.scope}    Ledger status at deck generation: ${item.finding.status}\n\n${symptom}\n\nDisposition: ${correction || 'Open at this evidence snapshot. See speaker notes and failure ledger.'}`), 210, 27);
    } else {
      const connected = data.steps.filter(step => !step.fallback);
      const journey = connected.length && connected.every(step => step.status === 'PASS') ? 'PASS' : connected.some(step => step.status === 'FAIL') ? 'FAIL' : 'INCOMPLETE';
      const pending = data.steps.filter(step => step.status === 'PENDING').length;
      const elapsed = data.startedUtc && data.endedUtc ? (Date.parse(data.endedUtc) - Date.parse(data.startedUtc)) / 1000 : null;
      const uiElapsed = data.uiFirstSubmittedUtc && data.endedUtc ? (Date.parse(data.endedUtc) - Date.parse(data.uiFirstSubmittedUtc)) / 1000 : null;
      const harness = data.steps.filter(step => step.object === 'Test harness');
      const business = data.steps.filter(step => step.object !== 'Test harness');
      body(slide, `Connected journey: ${journey}\nPlanned journey: ${business.length} steps (includes setup identity)\n${business.filter(step => step.status === 'PASS').length} PASS, ${business.filter(step => step.status === 'FAIL').length} FAIL, ${business.filter(step => step.status === 'BLOCKED').length} BLOCKED\nAdditional harness findings: ${harness.length}\nReport accounting: ${pending ? `${pending} pending` : 'All steps have final outcomes'}\nBusiness retries: ${data.steps.reduce((sum, step) => sum + step.retries.length, 0)}\nScreens captured: ${data.steps.reduce((sum, step) => sum + step.captures.length, 0)}\nDurable result window: ${elapsed === null ? 'Not recorded' : `${elapsed.toFixed(1)} seconds`}\nFirst UI request to execution end: ${uiElapsed === null ? 'Not recorded' : `${uiElapsed.toFixed(1)} seconds`}\n\nFallback tests demonstrate separate downstream coverage`, 200, 30);
    }
    manifest.push(record);
  }
  const candidatePath = path.join(staging, 'candidate.pptx');
  await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
  const finalPath = path.join(finalDir, 'xdx-supplier-workflow-evidence.pptx');
  const pythonExecutable = process.env.RUNTIME_PYTHON || path.join(DEFAULT_RUNTIME, 'python/python.exe');
  const finalized = await helpers.finalizePresentation({ workspaceDir: workspace, candidatePath, finalPath, pythonExecutable, integrityValidatorPath: path.join(skillDir, 'container_tools/inspect_presentation_package_integrity.py'), layoutValidatorPath: path.join(skillDir, 'container_tools/inspect_presentation_layout_geometry.py'), layoutArgs: ['--expected-slide-size-emu', '15240000,8572500', '--validate-heading-fit'], fontPolicy: { basis: 'design', families: [font] }, explicitTotalSlideCount: slides.length, verifyArtifactToolImport: true, receiptPath: path.join(staging, 'validation.json') });
  const delivered = await PresentationFile.importPptx(await FileBlob.load(finalPath));
  for (const [index, slide] of delivered.slides.items.entries()) {
    const png = await delivered.export({ slide, format: 'png', scale: 1 });
    await fs.writeFile(path.join(renderDir, `slide-${String(index + 1).padStart(3, '0')}.png`), new Uint8Array(await png.arrayBuffer()));
  }
  const inspection = await delivered.inspect({ kind: 'slide,notes,image', maxChars: 10000000 });
  await fs.writeFile(path.join(staging, 'inspection.ndjson'), inspection.ndjson);
  const inspected = inspection.ndjson.split(/\r?\n/).filter(Boolean).map(line => JSON.parse(line));
  const report = { schemaVersion: 1, runId: data.runId, startedUtc, endedUtc: new Date().toISOString(), sourceResults: relative(root, source), sourceSha256: hash(dataBytes), failureLedgerSnapshotSha256: ledgerBytes ? hash(ledgerBytes) : null, implementationFindingIds: findings.map(item => item.id), finalPath: relative(root, finalPath), finalSha256: finalized.finalSha256, renderDirectory: relative(root, renderDir), slideCount: slides.length, plannedCaptureCount: data.steps.reduce((sum, step) => sum + step.captures.length, 0), mappedCaptureCount: manifest.filter(slide => slide.capturePath).length, embeddedCaptureCount: manifest.filter(slide => slide.embedded).length, notesCount: manifest.filter(slide => slide.notesPresent).length, deliveredNotesCount: inspected.filter(item => item.kind === 'notes' && item.text).length, deliveredImageCount: inspected.filter(item => item.kind === 'image').length, captureIssues, slides: manifest, visualReview: 'PENDING. Inspect every final slide PNG before delivery.', applicationAcceptance: 'Determined only by source result assertions, not deck generation.', toolingSmoke: Boolean(data.toolingSmoke) };
  await fs.writeFile(path.join(base, 'deck-review.json'), JSON.stringify(report, null, 2) + '\n');
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (!args[0] || args[0] === '--help') console.log('Usage: node scripts/xdx-supplier-e2e-deck.mjs <repository-relative-results.json> [repository-relative-output-directory]\nUses official cached artifact-tool runtime, or RUNTIME_NODE_MODULES/RUNTIME_PYTHON overrides. Does not execute application tests.');
  else generateDeck({ resultsPath: args[0], outputDir: args[1] }).then(report => console.log(JSON.stringify({ finalPath: report.finalPath, slideCount: report.slideCount, embeddedCaptureCount: report.embeddedCaptureCount, captureIssues: report.captureIssues, visualReview: report.visualReview }))).catch(error => { console.error(error.stack); process.exitCode = 1; });
}
