import { readFileSync } from 'node:fs';
export const manifest = JSON.parse(readFileSync(new URL('../../acceptance.json', import.meta.url), 'utf8'));
const sample = JSON.parse(readFileSync(new URL('../fixtures/passed.report.json', import.meta.url), 'utf8'));
export function fixture() {
  const report = structuredClone(sample);
  const startedAt = Date.now() - 500;
  report.run.startedAt = new Date(startedAt + 1).toISOString();
  report.run.finishedAt = new Date(startedAt + 400).toISOString();
  report.run.vcs = { commit: 'a'.repeat(40), branch: 'test', dirty: false };
  report.run.project.id = manifest.projectId;
  for (const result of report.run.results) {
    result.attempts[0].startedAt = report.run.startedAt;
    result.attempts[0].durationMs = 1;
  }
  return { report, expected: { manifest, startedAt, finishedAt: Date.now(), commit: 'a'.repeat(40) } };
}
