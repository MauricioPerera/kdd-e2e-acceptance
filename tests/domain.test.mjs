import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as model from '../example/todo-model.mjs';
import { checkDomain } from './support/domain-oracle.mjs';
test('todo domain satisfies add, toggle, remove, filter and count invariants', () => checkDomain(model));
test('user content remains literal data', () => {
  const text = '<script>alert(1)</script>';
  assert.equal(model.addTodo([], text)[0].title, text);
});
test('invalid item indices cannot delete or complete another item', () => {
  const input = [{ title: 'Keep', done: false }];
  for (const index of [-1, 1, 0.5, NaN]) {
    assert.deepEqual(model.removeTodo(input, index), input);
    assert.deepEqual(model.toggleTodo(input, index, true), input);
  }
});
