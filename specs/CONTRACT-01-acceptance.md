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

The human-approved reference 882d32039e754d63329265e5822fa042d72d9a7f passed on Ubuntu 24.04 and Windows
in attempt 2 of https://github.com/MauricioPerera/kdd-e2e-acceptance/actions/runs/37367733608.
The separate closure commit contains only this spec, its report and its evidence
manifest. The workflow authenticates that earlier successful run through GitHub
and rejects implementation or control changes after the cited revision.
Previous cancelled attempts remain in Git history; local logs do not grant
human baseline approval. Details and scope are in docs/reports/CONTRACT-01-REPORT.md.
