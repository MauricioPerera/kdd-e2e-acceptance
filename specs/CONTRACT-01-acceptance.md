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

The initial implementation run passed on both platforms. Its closure run
authenticated the prior evidence on Windows, but GitHub cancelled Linux twice
because no hosted runner was assigned. The new candidate requests the same
Ubuntu 24.04 image used by the successful implementation run directly.
Keep this revision open until its reviewed workflow passes in both environments,
then publish a separate closure commit citing that new run. Previous reports
remain in Git history; local logs do not grant human baseline approval.
