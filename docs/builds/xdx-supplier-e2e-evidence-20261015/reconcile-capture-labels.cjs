const fs = require('node:fs');
const r = 'docs/builds/xdx-supplier-e2e-evidence-20261015/';
const file = r + 'results.json';
const result = JSON.parse(fs.readFileSync(file));
const changes = [
  ['address-query', 'result', 'Address query in progress'],
  ['address-direct', 'draft-ready', 'Address preparation in progress'],
  ['address-direct', 'review-ready', 'Address review in progress'],
  ['address-direct', 'created-readback', 'Address confirmation in progress'],
];
const corrections = [];
for (const [id, stage, title] of changes) {
  const capture = result.steps.find(s => s.id === id).captures.find(c => c.stage === stage);
  if (!capture) throw Error('Missing reviewed capture');
  corrections.push({ path: capture.path, previousTitle: capture.title, previousNotes: capture.notes });
  capture.title = title;
  capture.notes = 'Actual image shows intermediate processing. Its AX snapshot already reports completion, so image and semantics are separate observations. The following entered-request screen visibly retains the completed prior result. No request or accepted create was repeated.';
  capture.imageObservation = 'intermediate-loading';
}
const failure = result.steps.find(s => s.id === 'contact-template').captures.find(c => c.stage === 'draft-ready');
corrections.push({ path: failure.path, previousTitle: failure.title, previousNotes: failure.notes });
failure.title = 'Contact template preparation failed';
failure.notes = 'Actual source-check error before any new create. No Review, Confirm or write reservation was issued.';
failure.imageObservation = 'preparation-error';
result.captureLimitations = [
  'AX and screenshot paint are not atomic. Four Address images show loading while AX reports completion. Completed screens remain visible in the following entered-request captures. Titles identify processing honestly.',
  'Retained setup/query-input observations were acquired earlier than persistence timestamps.',
  'Final Assignment failure has an additional fully painted read-only capture. No test request was repeated.',
];
fs.writeFileSync(file, JSON.stringify(result, null, 2) + '\n');
fs.writeFileSync(r + 'capture-metadata-corrections.json', JSON.stringify({
  observedUtc: new Date().toISOString(), corrections, preservedOriginalImages: true,
  uiRequestsReplayed: 0, captureCount: result.steps.reduce((n, s) => n + s.captures.length, 0),
}, null, 2) + '\n');
console.log('Five reviewed capture labels reconciled; original image bytes retained.');
