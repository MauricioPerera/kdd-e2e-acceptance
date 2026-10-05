import assert from 'node:assert/strict';
export function checkDomain(model) {
  const source = [{ title: 'One', done: false }, { title: 'Two', done: true }];
  assert.deepEqual(model.addTodo(source, '  Three  '), [...source, { title: 'Three', done: false }]);
  assert.deepEqual(model.addTodo(source, '   '), source);
  const toggled = model.toggleTodo(source, 0, true);
  assert.equal(toggled[0].done, true);
  assert.equal(source[0].done, false);
  assert.deepEqual(model.removeTodo(source, 0), [source[1]]);
  assert.equal(source.length, 2);
  assert.deepEqual(model.visibleTodos(source, 'open'), [source[0]]);
  assert.deepEqual(model.visibleTodos(source, 'done'), [source[1]]);
  assert.deepEqual(model.visibleTodos(source, 'all'), source);
  assert.equal(model.remaining(source), 1);
  assert.equal(model.remaining([]), 0);
}
