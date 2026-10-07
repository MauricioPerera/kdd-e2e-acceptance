# CONTRACT-02 - Acceptance hardening

## Criterios de aceptación

- [x] [AC-1] Unselected executed results and non-filtered skips are rejected by `npm run test:adversarial`.
- [x] [AC-2] Model events and nonzero event token counts are rejected by `npm run test:adversarial`.
- [x] [AC-3] Malformed URLs return 400 while the fixture remains available in `npm run test:functional`.
- [x] [AC-4] Seven deterministic Chromium cases still pass `npm run test:ui`.
- [x] [AC-5] Metadata and declared commands pass `npm run validate:kdd`, and the canonical executor passes `npm run probe:board`.
- [x] [CI-1] The independently reviewed new baseline passes `npm run verify:quality` in an authenticated CI run.

## Restricciones

Tocar SOLO the candidate files reviewed for this hardening: the report validator,
its adversarial tests and fixture helper, the fixture server and its regression
test, package.json, quality.json, the report-validation contract and this spec.
After successful CI, the closure may change this spec and its exact
docs/reports/CONTRACT-02-REPORT.md and CONTRACT-02-EVIDENCE.json paths.
- ABORTAR SI a baseline is presented as approved without an explicit human review,
  or test execution produces inconclusive evidence.

Closed against authenticated cross-platform CI run https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37672478622
(attempt 1, approved commit 95be705c94b143854bdfae6ba3ab9622e86a0dbc).
See docs/reports/CONTRACT-02-REPORT.md and CONTRACT-02-EVIDENCE.json for the
criterion evidence and artifact audit. The human approval was explicit; it was
not inferred from HEAD, a hash or CONTRACT-01. CONTRACT-01 and its reports
retain their historical validation and do not certify this revision.
