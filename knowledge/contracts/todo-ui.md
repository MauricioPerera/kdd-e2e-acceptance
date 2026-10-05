---
type: 'Task Contract'
title: 'Run deterministic UI acceptance'
description: 'Executable contract for the KDD e2e acceptance integration.'
tags: ['kdd', 'e2e', 'acceptance']
task: todo-ui
intent: 'Verify the declared acceptance behavior.'
target: src/oracle.mjs
signature: 'runAcceptance() -> locally_verified evidence'
test_command: 'node --test tests/ui-oracle.test.mjs'
budget:
  cyclomatic_max: 8
  nesting_max: 3
tests: tests/ui-oracle.test.mjs
tests_sha256: '811467e9f8205a9a3f41fde7702ae6a01621dd218c76797e4d248aedab4d2b15'
touch_only: ['src/oracle.mjs']
deps_allowed: []
forbids: ['llm']
---

# Run deterministic UI acceptance

## Intent
Follow the [integration architecture](../architecture.md) and its trust boundary.

## Interface
runAcceptance() -> locally_verified evidence

## Invariants
- Observed results must satisfy the reviewed acceptance criteria.
- Tests and their imported helpers must remain protected by the quality policy.

## Examples
- Correct behavior passes the declared command.
- A changed outcome is rejected by its relevant assertion.

## Do / Don't
- DO: use deterministic assertions and retain actual evidence.
- DON'T: infer approval from a test hash or a green local process.

## Tests
The declared oracle was written before implementation. Complementary adversarial
checks and dependency protection are part of the project quality policy.

## Constraints
PARAR y reportar si implementation requires changing the protected oracle.
This initial profile uses structural budgets; no complexity measurement is claimed.
