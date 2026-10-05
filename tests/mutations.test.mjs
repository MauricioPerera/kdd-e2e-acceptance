import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { checkDomain } from './support/domain-oracle.mjs';
const source = readFileSync(new URL('../example/todo-model.mjs', import.meta.url), 'utf8');
const defects = [
  ['empty submissions allowed', "if (clean === '') return todos;", "if (false) return todos;"],
  ['titles retain surrounding whitespace', 'const clean = title.trim();', 'const clean = title;'],
  ['completion ignored', '{ ...todo, done }', '{ ...todo, done: todo.done }'],
  ['delete ignored', 'i !== index', 'true'],
  ['remaining includes completed items', '!todo.done', 'true'],
];
for (const [name, before, after] of defects) {
  test(`domain oracle detects product mutation: ${name}`, async () => {
    assert.equal(source.split(before).length - 1, 1, 'exact mutation anchor');
    const directory = mkdtempSync(path.join(tmpdir(), 'kdd-e2e-mutation-'));
    const file = path.join(directory, 'todo-model.mjs');
    writeFileSync(file, source.replace(before, after));
    const mutant = await import(pathToFileURL(file).href);
    assert.throws(() => checkDomain(mutant), assert.AssertionError);
  });
}
