export function addTodo(todos, title) {
  const clean = title.trim();
  if (clean === '') return todos;
  return [...todos, { title: clean, done: false }];
}
function validIndex(todos, index) { return Number.isInteger(index) && index >= 0 && index < todos.length; }
export function toggleTodo(todos, index, done) {
  if (!validIndex(todos, index)) return todos;
  return todos.map((todo, i) => i === index ? { ...todo, done } : todo);
}
export function removeTodo(todos, index) {
  if (!validIndex(todos, index)) return todos;
  return todos.filter((_todo, i) => i !== index);
}
export function visibleTodos(todos, filter) {
  if (filter === 'open') return todos.filter(todo => todo.done === false);
  if (filter === 'done') return todos.filter(todo => todo.done);
  return todos;
}
export function remaining(todos) { return todos.filter(todo => !todo.done).length; }
