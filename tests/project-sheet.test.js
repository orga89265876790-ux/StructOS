import test from 'node:test';
import assert from 'node:assert/strict';
import { projectSourceKey, sheetQuestionMatches, updateSheetQuestion, describeProjectOriginal } from '../project-sheet.js';

const scope = { ownerId: 'owner', objectId: 'project', versionId: 'v1', sheetId: 'sheet-2' };

test('source keys isolate users and document versions', () => {
  const file = { name: 'чертёж.pdf', size: 100, lastModified: 500 };
  assert.equal(projectSourceKey('owner', file), projectSourceKey('owner', { ...file }));
  assert.notEqual(projectSourceKey('other', file), projectSourceKey('owner', file));
  assert.notEqual(projectSourceKey('owner', { ...file, lastModified: 501 }), projectSourceKey('owner', file));
});

test('deleting and restoring a question preserves its answer and other sheets', () => {
  const first = { ...scope, id: 'q1', text: 'Вопрос', answer: { text: 'Ответ' } };
  const second = { ...first, id: 'q2', sheetId: 'sheet-3' };
  const removed = updateSheetQuestion([first, second], scope, 'q1', { deletedAt: '2026-09-23' });
  assert.equal(removed[0].deletedAt, '2026-09-23');
  assert.deepEqual(removed[0].answer, first.answer);
  assert.deepEqual(removed[1], second);
  assert.equal(updateSheetQuestion(removed, scope, 'q1', { deletedAt: null })[0].deletedAt, null);
});

test('updates cannot affect a different owner, project, version or sheet', () => {
  const question = { ...scope, id: 'q', text: 'Вопрос' };
  for (const key of ['ownerId', 'objectId', 'versionId', 'sheetId']) {
    assert.equal(sheetQuestionMatches(question, { ...scope, [key]: 'other' }), false);
    assert.throws(() => updateSheetQuestion([question], { ...scope, [key]: 'other' }, 'q', { deletedAt: 'now' }));
  }
  const changed = updateSheetQuestion([question], scope, 'q', { objectId: 'other', id: 'other', text: 'Ответ' });
  assert.equal(changed[0].objectId, 'project');
  assert.equal(changed[0].id, 'q');
});

test('legacy questions remain associated with their original project and sheet', () => {
  const legacy = { objectId: 'project', versionId: 'v1', sheetId: 'sheet-2' };
  assert.equal(sheetQuestionMatches(legacy, scope), true);
  assert.equal(sheetQuestionMatches(legacy, { ...scope, sheetId: 'sheet-1' }), false);
});

test('an image creates one original-file entry instead of demonstration drawings', async () => {
  const result = await describeProjectOriginal({ name: 'план.png', type: 'image/png' });
  assert.equal(result.sheets.length, 1);
  assert.equal(result.sheets[0].originalPage, true);
  assert.equal(result.sheets[0].pageNumber, 1);
});
