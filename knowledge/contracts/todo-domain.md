---
type: 'Task Contract'
title: 'Todo domain behavior'
description: 'Executable contract for the KDD e2e acceptance integration.'
tags: ['kdd', 'e2e', 'acceptance']
task: todo-domain
intent: 'Verify the declared acceptance behavior.'
target: example/todo-model.mjs
signature: 'addTodo, toggleTodo, removeTodo, visibleTodos, remaining'
test_command: 'node --test tests/domain.test.mjs'
budget:
  cyclomatic_max: 8
  nesting_max: 3
tests: tests/domain.test.mjs
tests_sha256: 'e49aeee112ff60c5a79047dfdda9ff6297ef182c63653a0839448bfd1ddc3e15'
touch_only: ['example/todo-model.mjs']
deps_allowed: []
forbids: ['network', 'subprocess', 'llm']
---

# Todo domain behavior

## Intent
Follow the [integration architecture](../architecture.md) and its trust boundary.

## Interface
addTodo, toggleTodo, removeTodo, visibleTodos, remaining

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
