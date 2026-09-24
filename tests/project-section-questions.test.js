import test from 'node:test';
import assert from 'node:assert/strict';
import { createSectionQuestionsStore, answerFromProject } from '../project-section-questions.js';
import { PROJECT_NOTE_SECTIONS, createProjectNotesStore } from '../project-notebook.js';
const memory = () => { const data = new Map(); return { getItem: k => data.get(k), setItem: (k, v) => data.set(k, v) }; };
const scope = { objectId: 'project', versionId: 'version', sectionId: 'risks' };

test('every project section accepts its own notes', () => {
  const store = createProjectNotesStore(memory(), 'user');
  assert.equal(Object.keys(PROJECT_NOTE_SECTIONS).length, 14);
  for (const sectionId of Object.keys(PROJECT_NOTE_SECTIONS)) store.save({ ...scope, sectionId, text: 'Заметка' });
  assert.equal(store.list('project').length, 14);
  assert.equal(store.list('project', { sectionId: 'risks' }).length, 1);
});

test('question history is isolated by owner, project, version and section', () => {
  const storage = memory(), store = createSectionQuestionsStore(storage, 'user');
  const item = store.add(scope, 'Вопрос');
  for (const key of ['objectId', 'versionId', 'sectionId']) {
    const other = { ...scope, [key]: 'other' };
    assert.equal(store.list(other).length, 0);
    assert.throws(() => store.update(other, item.id, { deletedAt: 'now' }));
  }
  assert.equal(createSectionQuestionsStore(storage, 'other').list(scope).length, 0);
  assert.equal(createSectionQuestionsStore(storage, 'user').list(scope).length, 1);
});

test('delete and restore preserve questions and answers; identity cannot be overwritten', () => {
  const store = createSectionQuestionsStore(memory(), 'user'), item = store.add(scope, 'Вопрос');
  store.update(scope, item.id, { answer: { text: 'Ответ' }, sectionId: 'other', id: 'other' });
  store.update(scope, item.id, { deletedAt: 'now' });
  assert.equal(store.list(scope).length, 0);
  store.update(scope, item.id, { deletedAt: null });
  assert.equal(store.list(scope)[0].answer.text, 'Ответ');
  assert.equal(store.list(scope)[0].id, item.id);
});

test('invalid storage and failed writes do not silently lose questions', () => {
  const storage = memory(), store = createSectionQuestionsStore(storage, 'user');
  assert.throws(() => store.add(scope, ' '));
  assert.throws(() => store.add(scope, 'a'.repeat(2001)));
  storage.setItem('structos-project-section-questions-v1:user', '{}');
  assert.throws(() => store.add(scope, 'Вопрос'));
  assert.equal(storage.getItem('structos-project-section-questions-v1:user'), '{}');
});

test('answers require actual evidence and speak about the project', () => {
  assert.match(answerFromProject('Высота щита?', { source: 'PDF', evidence: [] }).text, /этого проекта/);
  const answer = answerFromProject('Высота щита?', { source: 'PDF', evidence: ['Высота щита 1,5 м [Страница PDF 12]'] });
  assert.equal(answer.status, 'evidence');
  assert.match(answer.text, /Страница PDF 12/);
  assert.equal(answerFromProject('Высота щита?', { source: 'PDF', evidence: ['Высота щита 1,5 м'], isDemo: true }).status, 'needs-data');
});
