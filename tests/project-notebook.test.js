import test from 'node:test';
import assert from 'node:assert/strict';
import { createProjectNotesStore, answerFromProjectSheet, projectQuestionHistoryMarkup } from '../project-notebook.js';

function memoryStorage() {
  const values = new Map();
  return { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
}
const input = { objectId: 'project-a', versionId: 'version-1', sectionId: 'sheets', text: 'Проверить привязку' };

test('notes persist and are isolated by account, project, section and version', () => {
  const storage = memoryStorage();
  const store = createProjectNotesStore(storage, 'owner-a');
  store.save(input);
  store.save({ ...input, versionId: 'version-2', sectionId: 'spec' });
  store.save({ ...input, objectId: 'project-b' });
  assert.equal(createProjectNotesStore(storage, 'owner-a').list('project-a').length, 2);
  assert.equal(store.list('project-a', { versionId: 'version-1', sectionId: 'sheets' }).length, 1);
  assert.equal(createProjectNotesStore(storage, 'owner-b').list('project-a').length, 0);
});

test('editing preserves note identity, creation time and origin; deletion can be undone', () => {
  const store = createProjectNotesStore(memoryStorage(), 'owner');
  const note = store.save(input);
  const edited = store.save({ ...note, text: 'Уточнено', sectionId: 'notes', versionId: 'version-2' });
  assert.equal(edited.id, note.id);
  assert.equal(edited.createdAt, note.createdAt);
  assert.equal(edited.sectionId, 'sheets');
  assert.equal(edited.versionId, 'version-1');
  assert.throws(() => store.save({ ...note, objectId: 'project-b' }));
  store.setDeleted('project-a', note.id, true);
  assert.equal(store.list('project-a').length, 0);
  store.setDeleted('project-a', note.id, false);
  assert.equal(store.list('project-a')[0].text, 'Уточнено');
});

test('invalid input, corrupted storage and failed writes never replace existing data', () => {
  const storage = memoryStorage();
  const store = createProjectNotesStore(storage, 'owner');
  store.save(input);
  assert.throws(() => store.save({ ...input, text: '  ' }));
  assert.throws(() => store.save({ ...input, text: 'x'.repeat(2001) }));
  const blocked = createProjectNotesStore({ getItem: storage.getItem, setItem() { throw new Error('quota'); } }, 'owner');
  assert.throws(() => blocked.save(input));
  assert.equal(store.list('project-a').length, 1);
  const broken = createProjectNotesStore({ getItem: () => '{broken', setItem() { assert.fail('must not write'); } }, 'owner');
  assert.throws(() => broken.save(input));
});

test('answers quote only matching facts from the selected sheet', () => {
  const result = answerFromProjectSheet('Какая высота установки щита?', { source: 'Лист 2', evidence: ['Высота установки щита 1,5 м.', 'На листе указаны кабельные линии.'] });
  assert.equal(result.status, 'evidence');
  assert.equal(result.source, 'Лист 2');
  assert.match(result.text, /Высота установки щита 1,5 м/);
  assert.doesNotMatch(result.text, /кабельные линии/);
  assert.equal(answerFromProjectSheet('Что изображено на листе?', { source: 'Лист 2', evidence: ['План освещения второго этажа.'] }).status, 'evidence');
});

test('missing, unrelated and demo data cannot produce a factual answer', () => {
  for (const context of [{ evidence: [] }, { evidence: ['Высота установки щита 1,5 м.'] }, { evidence: ['Автомат С16.'], isDemo: true }]) {
    assert.equal(answerFromProjectSheet('Какой автомат?', { source: 'Лист 2', ...context }).status, 'needs-data');
  }
});

test('question text, answers and sources render as text rather than HTML', () => {
  const markup = projectQuestionHistoryMarkup([{ id: 'q', createdAt: new Date().toISOString(), text: '<img src=x onerror=alert(1)>', answer: { text: '<script>alert(1)</script>', source: '<source>', status: 'evidence' } }]);
  assert.doesNotMatch(markup, /<img|<script|<source>/);
  assert.match(markup, /&lt;script&gt;/);
});
