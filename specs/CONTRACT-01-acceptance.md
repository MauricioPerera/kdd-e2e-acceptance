# CONTRACT-01 - KDD e2e acceptance

## Criterios de aceptación

- [ ] [AC-1] Metadata and sealed tests pass `npm run validate:kdd`.
- [ ] [AC-2] Fresh reports and exact case selection pass `npm run test:functional`.
- [ ] [AC-3] Report alterations and product mutations are rejected by `npm run test:adversarial`.
- [ ] [AC-4] Seven deterministic browser cases pass `npm run test:ui`.
- [ ] [AC-5] Board's canonical execution path accepts the sealed oracle with `npm run probe:board`.
- [ ] [CI-1] Human-approved policy and oracles pass `npm run verify:quality` in a real CI run.

## Restricciones

Tocar SOLO the files authorized by the independently reviewed quality policy.
- ABORTAR SI the approved baseline is absent, the oracle changes or evidence is inconclusive.

The spec remains open until verified CI evidence is available. Local logs do not
close these checkboxes or grant human baseline approval.
