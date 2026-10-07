# CONTRACT-02 - Acceptance hardening candidate

## Criterios de aceptación

- [ ] [AC-1] Unselected executed results and non-filtered skips are rejected by `npm run test:adversarial`.
- [ ] [AC-2] Model events and nonzero event token counts are rejected by `npm run test:adversarial`.
- [ ] [AC-3] Malformed URLs return 400 while the fixture remains available in `npm run test:functional`.
- [ ] [AC-4] Seven deterministic Chromium cases still pass `npm run test:ui`.
- [ ] [AC-5] Metadata and declared commands pass `npm run validate:kdd`, and the canonical executor passes `npm run probe:board`.
- [ ] [CI-1] The independently reviewed new baseline passes `npm run verify:quality` in an authenticated CI run.

## Restricciones

Tocar SOLO the candidate files reviewed for this hardening: the report validator,
its adversarial tests and fixture helper, the fixture server and its regression
test, package.json, quality.json, the report-validation contract and this spec.
- ABORTAR SI a baseline is presented as approved without an explicit human review,
  or test execution produces inconclusive evidence.

This spec remains open until independently authenticated CI evidence supports
closure. CONTRACT-01 and its reports retain their historical validation; they do
not certify this candidate. The protected-control changes require a new reviewed
baseline. No approval is inferred from HEAD, a hash, or the historical manifest.
