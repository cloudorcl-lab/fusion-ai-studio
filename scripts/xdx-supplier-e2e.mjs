/** Supported-CUA evidence runner. Browser access is injected, never Playwright/CDP. */
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash, randomUUID } from 'node:crypto';
import { createRequire } from 'node:module';
import { Buffer } from 'node:buffer';
// CUA's module loader accepts .js/.mjs imports; use Node's documented CJS
// bridge for the existing PNG validator instead of duplicating its logic.
const { validatePng } = createRequire(import.meta.url)('./capture-native-evidence.cjs');

const now = () => new Date().toISOString();
const hash = x => createHash('sha256').update(x).digest('hex');
const safe = x => { if (!/^[a-zA-Z0-9_-]+$/.test(x)) throw Error('Unsafe step/stage identifier'); return x; };
const json = x => JSON.stringify(x, null, 2) + '\n';
const metadata = p => ({ id: safe(p.id), object: p.object, scenario: p.scenario,
  title: p.title || p.id, expected: p.expected || '', dependencies: p.dependencies || [],
  write: p.write === true, status: 'PENDING', actual: '', recordIds: {}, fallback: false,
  retries: [], attempts: [], captures: [], reservations: [], assertions: [] });

async function durable(file, data, exclusive = false) {
  const temp = exclusive ? file : `${file}.${randomUUID()}.tmp`;
  const handle = await fs.open(temp, 'wx');
  try { await handle.writeFile(data); await handle.sync(); } finally { await handle.close(); }
  if (!exclusive) await fs.rename(temp, file);
}

/** Start or explicitly resume one single-writer session in a persistent CUA REPL. */
export async function start({ tab, runDir, target, plan = [], resume = false, finalize, repoRoot }) {
  if (!tab || typeof tab.getAXStateAndScreenshot !== 'function') throw Error('Bound supported CUA tab required');
  if (typeof repoRoot !== 'string' || !repoRoot.trim()) throw Error('Explicit repository root required');
  const root = path.resolve(repoRoot), directory = path.resolve(root, runDir);
  if (directory === root || !directory.startsWith(root + path.sep)) throw Error('runDir must be inside repository');
  await fs.mkdir(directory, { recursive: true });
  const resultsPath = path.join(directory, 'results.json');
  let result;
  try { result = JSON.parse(await fs.readFile(resultsPath, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (result && !resume) throw Error('Existing run requires explicit resume; no create replay performed');
  if (result && target && JSON.stringify(result.target) !== JSON.stringify(target)) throw Error('Resume target changed');
  if (result && plan.length) {
    const supplied = plan.map(p => safe(p.id));
    const retained = result.steps.map(s => s.id);
    if (new Set(supplied).size !== supplied.length || new Set(retained).size !== retained.length ||
      supplied.length !== retained.length || supplied.some(id => !retained.includes(id)))
      throw Error('Resume plan step-ID inventory differs from retained run; no mutation performed');
  }
  if (!result) {
    for (const key of ['appCode', 'workflowCode', 'version', 'host', 'surface'])
      if (!String(target?.[key] || '').trim()) throw Error(`Observed target.${key} required`);
    if (!['app-preview', 'published-app'].includes(target.surface)) throw Error('Target must be Studio-bound app surface');
    result = { schemaVersion: 1, runId: path.basename(directory), startedUtc: now(), endedUtc: null,
      target, steps: plan.map(metadata), events: [], records: {} };
    if (new Set(result.steps.map(s => s.id)).size !== result.steps.length) throw Error('Duplicate plan step IDs');
  }
  const lockPath = path.join(directory, 'runner.lock');
  const lock = await fs.open(lockPath, 'wx').catch(() => { throw Error('Runner already open, or stale lock: reconcile prior owner before resuming'); });
  await lock.writeFile(json({ owner: randomUUID(), startedUtc: now() })); await lock.sync();
  let closed = false;
  const relative = p => path.relative(root, p).replaceAll('\\', '/');
  const persist = async () => durable(resultsPath, json(result));
  const event = async (type, detail) => {
    const entry = { observedUtc: now(), type, ...detail };
    const journal = await fs.open(path.join(directory, 'runner-events.jsonl'), 'a');
    try { await journal.writeFile(JSON.stringify(entry) + '\n'); await journal.sync(); } finally { await journal.close(); }
    result.events.push(entry); await persist(); return entry;
  };
  const step = id => { const s = result.steps.find(s => s.id === id); if (!s) throw Error(`Unknown planned step ${id}`); return s; };
  const session = {
    result, resultsPath,
    async add(spec) { if (result.steps.some(s => s.id === spec.id)) throw Error('Duplicate step'); result.steps.push(metadata(spec)); await persist(); },
    async request({ id, prompt, stage = 'request', submit, settle, reservation }) {
      if (typeof prompt !== 'string' || !prompt.trim() || typeof submit !== 'function' || typeof settle !== 'function')
        throw Error('Prompt plus documented submit and observed settle callbacks required');
      await tab.playwright.getByRole('textbox').fill(prompt);
      await session.capture({ id, stage: `${safe(stage)}-entered`, notes: prompt });
      if (reservation) await session.reserve({ ...reservation, id });
      await event('request-dispatch', { id, prompt, stage });
      // Caller supplies the documented control and observes loading/completion;
      // no guessed polling or result-text inference lives in this runner.
      await submit(tab);
      const pair = await settle(tab);
      return session.capture({ id, stage: `${stage}-result`, notes: prompt, pair });
    },
    async capture({ id, stage, title, notes = '', pair }) {
      const s = step(id); safe(stage);
      const observed = pair || await tab.getAXStateAndScreenshot({ disableDiffing: true, emit: false });
      if (typeof observed.state !== 'string' || !observed.state) throw Error('Full AX state required');
      const source = observed.screenshot;
      if (!ArrayBuffer.isView(source) || source.BYTES_PER_ELEMENT !== 1)
        throw Error('Screenshot must be binary PNG or JPEG bytes');
      // Bridge the CUA typed-array realm to the existing native PNG validator.
      // Preserve the exact actual bytes and format; never transcode evidence.
      const bytes = Buffer.from(source.buffer, source.byteOffset, source.byteLength);
      let image, extension, mimeType;
      if (bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) {
        image = validatePng(bytes); extension = 'png'; mimeType = 'image/png';
      } else if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 &&
        bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9) {
        image = bytes; extension = 'jpg'; mimeType = 'image/jpeg';
      } else throw Error('Unsupported or incomplete screenshot image');
      const name = `${safe(id)}-${safe(stage)}-${String(s.captures.length + 1).padStart(3, '0')}`;
      const captureDir = path.join(directory, 'screens'); await fs.mkdir(captureDir, { recursive: true });
      const imagePath = path.join(captureDir, `${name}.${extension}`), semanticPath = path.join(captureDir, `${name}.txt`);
      await durable(imagePath, image, true); await durable(semanticPath, observed.state, true);
      const capture = { path: relative(imagePath), semanticPath: relative(semanticPath), title: title || s.title,
        stage, observedUtc: now(), notes, mimeType, sha256: hash(image), semanticSha256: hash(observed.state) };
      s.captures.push(capture); await event('capture', { id, capture }); return { ...capture, state: observed.state };
    },
    async begin(id, retry) {
      const s = step(id);
      if (s.write && s.reservations.some(r => r.disposition !== 'not-created')) throw Error('Accepted/uncertain write cannot be replayed; reconcile read-only');
      if (s.attempts.length) {
        if (!retry?.reason || !retry?.changedCondition) throw Error('Retry requires reason and changed condition/evidenced temporary failure');
        s.retries.push({ number: s.retries.length + 1, reason: retry.reason, changedCondition: retry.changedCondition, startedUtc: now() });
      }
      s.attempts.push({ number: s.attempts.length + 1, startedUtc: now(), status: 'PENDING' });
      s.status = 'PENDING'; await event('begin', { id, attempt: s.attempts.length });
    },
    async reserve({ id, operationId, requestId, revision, payload, write = true }) {
      const s = step(id); if (!write) throw Error('Reservation is for business writes');
      if (!operationId || !requestId || revision == null || !payload) throw Error('Exact operation/request/revision/payload required');
      if (s.reservations.some(r => r.disposition !== 'not-created')) throw Error('Write already accepted or uncertain');
      s.write = true;
      const reservation = { operationId, requestId, revision, payload, reservedUtc: now(), disposition: 'uncertain', recordIds: {} };
      s.reservations.push(reservation); await event('write-reserved', { id, reservation }); return reservation;
    },
    async reconcile({ id, disposition, recordIds = {}, evidence }) {
      const s = step(id), r = s.reservations.at(-1);
      if (!r || !['accepted', 'not-created', 'uncertain'].includes(disposition) || !evidence) throw Error('Reservation and observed reconciliation evidence required');
      if (r.disposition === 'accepted' && disposition !== 'accepted') throw Error('Accepted record cannot be made replayable');
      if (disposition === 'accepted' && !Object.keys(recordIds).length) throw Error('Accepted IDs required');
      Object.assign(r, { disposition, recordIds, evidence, reconciledUtc: now() });
      Object.assign(s.recordIds, recordIds); Object.assign(result.records, recordIds);
      await event('write-reconciled', { id, disposition, recordIds, evidence });
    },
    async record({ id, status, actual, assertions = [], recordIds = {}, fallback = false, failureKind }) {
      const s = step(id);
      if (!['PASS', 'FAIL', 'BLOCKED'].includes(status) || !actual) throw Error('Explicit status and observed actual required');
      if (status === 'PASS' && (!assertions.length || assertions.some(a => a.passed !== true || !a.evidence)))
        throw Error('PASS requires all observed assertions and evidence; screenshot/prose alone is insufficient');
      Object.assign(s, { status, actual, assertions, fallback, failureKind, endedUtc: now() });
      Object.assign(s.recordIds, recordIds); Object.assign(result.records, recordIds);
      if (s.attempts.length) Object.assign(s.attempts.at(-1), { status, actual, endedUtc: s.endedUtc });
      if (s.retries.length && s.retries.at(-1).endedUtc == null) Object.assign(s.retries.at(-1), { status, endedUtc: s.endedUtc });
      await event('outcome', { id, status, actual, recordIds, fallback });
    },
    async finish({ pendingReason = 'No executable action completed; see dependency/capability evidence' } = {}) {
      if (closed) throw Error('Session closed');
      try {
        for (const s of result.steps.filter(s => s.status === 'PENDING')) await session.record({ id: s.id, status: 'BLOCKED', actual: pendingReason });
        result.endedUtc = now(); result.summary = { counts: Object.fromEntries(['PASS', 'FAIL', 'BLOCKED'].map(k => [k, result.steps.filter(s => s.status === k).length])),
          retryCount: result.steps.reduce((n, s) => n + s.retries.length, 0),
          connectedJourneyPassed: result.steps.every(s => s.status === 'PASS' && !s.fallback) };
        await event('run-finished', { summary: result.summary });
        try {
          const finalizer = finalize || (async () => {
            const { generateDeck } = await import('./xdx-supplier-e2e-deck.mjs');
            return generateDeck({ resultsPath: relative(resultsPath), repoRoot: root, outputDir: relative(path.join(directory, 'presentation')) });
          });
          const presentation = await finalizer({ resultsPath, result, runDir: directory });
          let verifiedCompletion = false;
          if (typeof presentation?.finalPath === 'string' && /^[a-f0-9]{64}$/i.test(presentation.finalSha256 || '')) {
            const artifactPath = path.resolve(root, presentation.finalPath);
            if (artifactPath.startsWith(root + path.sep)) {
              const actualPath = await fs.realpath(artifactPath);
              if (actualPath.startsWith(root + path.sep) && (await fs.stat(actualPath)).isFile())
                verifiedCompletion = hash(await fs.readFile(actualPath)) === presentation.finalSha256.toLowerCase();
            }
          }
          result.presentation = { ...presentation, status: verifiedCompletion ? 'complete' : (presentation?.status || 'pending'),
            artifactCompletionVerified: verifiedCompletion };
          if (!verifiedCompletion && result.presentation.status === 'complete') result.presentation.status = 'pending';
          await event(verifiedCompletion ? 'presentation-finished' : 'presentation-pending', {
            artifactCompletionVerified: verifiedCompletion
          });
        } catch (error) { result.presentationError = String(error.message); await persist(); throw error; }
        return result;
      } finally { await session.close(); }
    },
    async close() { if (!closed) { await persist(); await lock.close(); await fs.unlink(lockPath); closed = true; } }
  };
  await event(resume ? 'run-resumed' : 'run-started', {}); return session;
}

/** Each action owns documented CUA interaction and an explicit observed assertion. */
export async function run(options) {
  const session = await start(options);
  try {
    for (const spec of options.plan || []) {
      const current = session.result.steps.find(s => s.id === spec.id);
      if (current.status === 'PASS') continue;
      try {
        const blocked = (spec.dependencies || []).filter(id => session.result.steps.find(s => s.id === id)?.status !== 'PASS');
        const fallback = blocked.length && typeof spec.fallback === 'function' ? await spec.fallback(session) : null;
        if (blocked.length && !fallback) { await session.record({ id: spec.id, status: 'BLOCKED', actual: `Dependencies: ${blocked.join(', ')}` }); continue; }
        if (typeof spec.action !== 'function') { await session.record({ id: spec.id, status: 'BLOCKED', actual: 'No supported executable action supplied for capability' }); continue; }
        await session.begin(spec.id, spec.retry);
        const outcome = await spec.action({ session, tab: options.tab, fallback });
        await session.record({ ...outcome, id: spec.id, fallback: Boolean(fallback) });
      } catch (error) {
        await session.capture({ id: spec.id, stage: 'failure', notes: String(error.message) }).catch(async captureError => {
          await session.record({ id: spec.id, status: 'FAIL', actual: `${error.message}; capture failed: ${captureError.message}`, failureKind: 'execution' });
        });
        await session.record({ id: spec.id, status: 'FAIL', actual: String(error.message), failureKind: 'execution' });
      }
    }
  } finally { await session.finish(); }
  return session.result;
}

async function cli() {
  const [command, input] = process.argv.slice(2);
  if (command === 'status') { const r = JSON.parse(await fs.readFile(path.join(input, 'results.json'), 'utf8')); console.log(json({ runId: r.runId, summary: r.summary, steps: r.steps.map(s => ({ id: s.id, status: s.status, retries: s.retries.length })) })); }
  else if (command === 'finalize') { const { generateDeck } = await import('./xdx-supplier-e2e-deck.mjs'); console.log(json(await generateDeck({ resultsPath: path.join(input, 'results.json') }))); }
  else console.log('Supported CUA REPL: import {start,run} from file:///ABS/scripts/xdx-supplier-e2e.mjs; run({tab,runDir,target,plan,resume:false}). CLI: node scripts/xdx-supplier-e2e.mjs status <runDir> | finalize <runDir>. No standalone browser driver; use a bound authorized CUA tab.');
}
if (typeof process !== 'undefined' && process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url)
  cli().catch(e => { console.error(e.message); process.exitCode = 1; });
