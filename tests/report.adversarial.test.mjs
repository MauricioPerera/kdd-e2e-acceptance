import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateReport } from '../src/report-validator.mjs';
import { fixture } from './support/fixtures.mjs';

const alterations = {
  oldReport: r => { r.run.startedAt = '2000-01-01T00:00:00.000Z'; },
  futureReport: r => { r.run.finishedAt = '2099-01-01T00:00:00.000Z'; },
  otherCommit: r => { r.run.vcs.commit = 'b'.repeat(40); },
  dirtyCheckout: r => { r.run.vcs.dirty = true; },
  failedRun: r => { r.run.status = 'failed'; r.run.exitCode = 1; },
  emptySelection: r => { r.run.results = []; r.run.summary.selected = 0; },
  missingCase: r => { r.run.results.pop(); },
  extraCase: r => { const x = structuredClone(r.run.results[0]); x.id = 'c'.repeat(64); x.testId += 'extra'; x.titlePath = ['extra']; r.run.results.push(x); },
  duplicateCase: r => { r.run.results[1] = structuredClone(r.run.results[0]); },
  wrongTarget: r => { r.run.results[0].targetId = 'mobile'; },
  wrongFile: r => { r.run.results[0].file = 'tests/other.e2e.ts'; },
  wrongAgent: r => { r.run.results[0].agent = 'alternative'; },
  repeatedCase: r => { r.run.results[0].repeat = 1; },
  skippedCase: r => { r.run.results[0].status = 'skipped'; },
  flakyCase: r => { r.run.results[0].status = 'flaky'; },
  retry: r => { r.run.results[0].attempts.push(structuredClone(r.run.results[0].attempts[0])); },
  failedAttempt: r => { r.run.results[0].attempts[0].status = 'failed'; },
  unfinishedCleanup: r => { r.run.results[0].attempts[0].cleanup = 'incomplete'; },
  modelCalls: r => { r.run.usage.maxModelCallsInStep = 1; },
  modelTokens: r => { r.run.usage.modelTokens = 10; },
  incorrectSummary: r => { r.run.summary.passed = 6; },
  unsupportedSchema: r => { r.schemaVersion = 'report-99'; },
  missingField: r => { delete r.run.finishedAt; },
  arbitraryField: r => { r.run.unrecognized = true; },
  wrongProject: r => { r.run.project.id = 'other.project'; },
  wrongRunner: r => { r.run.runner.name = 'other'; },
  wrongVersion: r => { r.run.runner.version = '0.1.0'; },
  missingVcs: r => { delete r.run.vcs; },
  setupInsteadOfTest: r => { r.run.results[0].kind = 'setup'; },
  pastAttempt: r => { r.run.results[0].attempts[0].startedAt = '2000-01-01T00:00:00.000Z'; },
};
for (const [name, alter] of Object.entries(alterations)) {
  test(`rejects ${name}`, () => {
    const { report, expected } = fixture();
    alter(report);
    assert.throws(() => validateReport(report, expected), { code: 'E2E_EVIDENCE_INVALID' });
  });
}
test('rejects an empty expected set instead of accepting zero tests', () => {
  const { report, expected } = fixture();
  expected.manifest = { ...expected.manifest, expectedCases: [] };
  assert.throws(() => validateReport(report, expected), { code: 'E2E_EVIDENCE_INVALID' });
});
test('rejects duplicated expected cases', () => {
  const { report, expected } = fixture();
  expected.manifest = { ...expected.manifest, expectedCases: [expected.manifest.expectedCases[0], expected.manifest.expectedCases[0]] };
  assert.throws(() => validateReport(report, expected), { code: 'E2E_EVIDENCE_INVALID' });
});
