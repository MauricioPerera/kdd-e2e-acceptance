# CONTRACT-01 - KDD e2e acceptance

## Criterios de aceptación

- [x] [AC-1] Metadata and sealed tests pass `npm run validate:kdd`.
- [x] [AC-2] Fresh reports and exact case selection pass `npm run test:functional`.
- [x] [AC-3] Report alterations and product mutations are rejected by `npm run test:adversarial`.
- [x] [AC-4] Seven deterministic browser cases pass `npm run test:ui`.
- [x] [AC-5] Board's canonical execution path accepts the sealed oracle with `npm run probe:board`.
- [x] [CI-1] Human-approved policy and oracles pass `npm run verify:quality` in a real CI run.

## Restricciones

Tocar SOLO the files authorized by the independently reviewed quality policy.
- ABORTAR SI the approved baseline is absent, the oracle changes or evidence is inconclusive.

The criteria cite the completed implementation CI run in
`docs/reports/CONTRACT-01-REPORT.md` and `CONTRACT-01-EVIDENCE.json`.
The closure commit changes only this spec, its report and its evidence manifest.
The workflow must authenticate that prior run and reject source drift before
accepting the published closure. Local logs do not grant human baseline approval.
