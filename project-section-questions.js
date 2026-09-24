import { PROJECT_NOTE_SECTIONS, answerFromProjectSheet, escapeProjectText as escape } from './project-notebook.js';
import { readProjectOriginal, openProjectPdf } from './project-sheet.js';

export function createSectionQuestionsStore(storage, ownerId) {
  const key = `structos-project-section-questions-v1:${ownerId || 'local'}`;
  const read = () => {
    const records = JSON.parse(storage.getItem(key) || '[]');
    if (!Array.isArray(records)) throw new Error('История повреждена');
    return records;
  };
  const matches = (item, scope) => ['objectId', 'versionId', 'sectionId'].every(key => item[key] === scope[key]);
  const write = records => storage.setItem(key, JSON.stringify(records));
  return {
    list: scope => read().filter(item => matches(item, scope) && !item.deletedAt),
    add(scope, text) {
      text = String(text || '').trim();
      if (!text || text.length > 2000 || !scope.objectId || !scope.versionId || !PROJECT_NOTE_SECTIONS[scope.sectionId]) throw new Error('Проверьте вопрос и раздел');
      const item = { objectId: scope.objectId, versionId: scope.versionId, sectionId: scope.sectionId, id: crypto.randomUUID(), text, createdAt: new Date().toISOString() };
      write([...read(), item]);
      return item;
    },
    update(scope, id, patch) {
      const records = read();
      const item = records.find(item => item.id === id && matches(item, scope));
      if (!item) throw new Error('Вопрос не найден');
      // Identity and scope must never be changed by an answer or deletion.
      const updated = { ...item };
      for (const key of ['answer', 'deletedAt']) if (Object.hasOwn(patch, key)) updated[key] = patch[key];
      write(records.map(record => record === item ? updated : record));
    }
  };
}

export function answerFromProject(question, context) {
  const answer = answerFromProjectSheet(question, context);
  return { ...answer, text: answer.text.replaceAll('этого листа', 'этого проекта').replaceAll('данные листа', 'данные проекта'), source: context.source };
}

// Read only actual source bytes. Demonstration cards are never evidence.
export async function readProjectQuestionContext(ownerId, version, isActive = () => true) {
  const file = await readProjectOriginal(ownerId, version);
  if (!file) return { source: version.name, evidence: [], notice: 'Оригинала нет на этом устройстве. Выберите его в разделе «Оригинал проекта по листам» и повторите вопрос.' };
  if (file.type !== 'application/pdf' && !/\.pdf$/i.test(version.name)) return { source: version.name, evidence: [], notice: 'Для ответов по этому формату требуется распознавание. Сейчас поиск поддерживает текстовый PDF.' };
  const pdf = await openProjectPdf(file);
  const evidence = [];
  let characters = 0;
  try {
    for (let number = 1; number <= pdf.numPages; number++) {
      if (!isActive()) throw new Error('Страница закрыта');
      const page = await pdf.getPage(number);
      const content = await page.getTextContent();
      let line = '', lastY;
      const add = () => {
        if (line.trim()) {
          const text = line.trim();
          characters += text.length;
          evidence.push(`${text} [Страница PDF ${number}]`);
        }
        line = '';
      };
      for (const item of content.items) {
        const y = Math.round(item.transform?.[5] || 0);
        if (lastY !== undefined && Math.abs(y - lastY) > 3) add();
        line += `${item.str || ''} `;
        lastY = y;
        if (item.hasEOL) add();
      }
      add();
      page.cleanup();
      if (characters > 2000000 && number < pdf.numPages) return { source: version.name, evidence, notice: `Поиск выполнен только по первым ${number} страницам: достигнут предел объёма текста.` };
    }
    return { source: version.name, evidence, notice: evidence.length ? '' : 'В PDF нет текстового слоя. Для вопросов по сканам необходимо распознавание.' };
  } finally { await pdf.loadingTask.destroy(); }
}

export function bindProjectSectionQuestions({ rootElement, object, version, ownerId, storage = localStorage, readContext = readProjectQuestionContext }) {
  const store = createSectionQuestionsStore(storage, ownerId);
  let contextPromise;
  for (const [sectionId, title] of Object.entries(PROJECT_NOTE_SECTIONS)) {
    const section = rootElement.querySelector(`#project-block-${sectionId}`);
    if (!section || section.querySelector('[data-section-questions]')) continue;
    const scope = { objectId: object.id, versionId: version.id, sectionId };
    const panel = document.createElement('section');
    panel.className = 'project-section-assistant';
    panel.dataset.sectionQuestions = sectionId;
    const inputId = `project-question-${sectionId}`;
    panel.innerHTML = `<header><span aria-hidden="true">✦</span><div><small>ВОПРОСЫ STRUCTOS · ${escape(title)}</small><h3>Задавайте любые вопросы по проекту, сейчас разберёмся</h3></div></header><p class="project-answer-hint">Полноценный ИИ пока не подключён. Сейчас доступен поиск выдержек из текстового PDF всего проекта с указанием страниц. История сохраняется на этом устройстве отдельно для каждого раздела.</p><form><label for="${inputId}">Ваш вопрос по проекту</label><textarea id="${inputId}" rows="3" maxlength="2000" required placeholder="Что хотите уточнить по проекту?"></textarea><button type="submit" class="primary-button">Задать вопрос</button></form><p role="status" aria-live="polite" data-question-status></p><div data-question-undo hidden></div><div class="project-sheet-conversation" data-section-question-history></div>`;
    section.querySelector('.project-deep-section-head')?.after(panel);
    const input = panel.querySelector('textarea'), status = panel.querySelector('[data-question-status]');
    const history = panel.querySelector('[data-section-question-history]');
    const submit = panel.querySelector('[type="submit"]');
    let busy = false, deletedId = null;
    const render = () => {
      try {
        const records = store.list(scope);
        history.innerHTML = records.length ? records.map(item => `<article class="project-question-entry"><header><strong>Ваш вопрос</strong><time>${escape(new Date(item.createdAt).toLocaleString('ru-RU'))}</time></header><p>${escape(item.text)}</p><section class="project-answer"><strong>StructOS · поиск по проекту</strong><p>${escape(item.answer?.text || 'Вопрос сохранён. Ответ пока не получен.')}</p>${item.answer?.source ? `<small>Источник: ${escape(item.answer.source)}</small>` : ''}</section><footer>${!item.answer || item.answer.status !== 'evidence' ? `<button type="button" class="outline-button" data-question-retry="${escape(item.id)}" ${busy ? 'disabled' : ''}>Повторить поиск</button>` : ''}<button type="button" class="outline-button" data-question-delete="${escape(item.id)}">Удалить вопрос</button></footer></article>`).join('') : '<p class="project-notes-empty">Здесь появятся ваши вопросы и ответы по проекту.</p>';
        const undo = panel.querySelector('[data-question-undo]');
        undo.hidden = !deletedId;
        undo.innerHTML = deletedId ? '<span>Вопрос и ответ удалены.</span> <button type="button" class="outline-button" data-question-restore>Восстановить</button>' : '';
      } catch { status.textContent = 'Историю не удалось прочитать. Сохранённые данные не изменены.'; }
    };
    const respond = async item => {
      busy = true; submit.disabled = true; render();
      status.textContent = 'Ищем в тексте проекта…';
      try {
        contextPromise ||= readContext(ownerId, version, () => panel.isConnected).catch(error => { contextPromise = null; throw error; });
        const context = await contextPromise;
        if (!context.evidence.length) contextPromise = null;
        if (!panel.isConnected) return;
        const answer = answerFromProject(item.text, context);
        if (context.notice) answer.text += `\n\n${context.notice}`;
        if (store.list(scope).some(record => record.id === item.id)) store.update(scope, item.id, { answer });
        status.textContent = 'Поиск завершён. ИИ-ответ не формировался.';
      } catch { if (panel.isConnected) status.textContent = 'Ответ получить не удалось. Вопрос сохранён — попробуйте повторить поиск.'; }
      finally { busy = false; submit.disabled = false; if (panel.isConnected) render(); }
    };
    panel.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      if (busy || !input.value.trim()) return;
      try {
        const item = store.add(scope, input.value);
        input.value = '';
        void respond(item);
      } catch { status.textContent = 'Вопрос не сохранён. Скопируйте текст и проверьте свободное место на устройстве.'; }
    });
    panel.addEventListener('click', event => {
      const button = event.target.closest('[data-question-delete], [data-question-restore], [data-question-retry]');
      if (!button) return;
      try {
        if (button.hasAttribute('data-question-retry')) {
          if (busy) return;
          const item = store.list(scope).find(item => item.id === button.dataset.questionRetry);
          contextPromise = null;
          if (item) void respond(item);
        } else if (button.hasAttribute('data-question-delete')) {
          store.update(scope, button.dataset.questionDelete, { deletedAt: new Date().toISOString() });
          deletedId = button.dataset.questionDelete;
          render();
        } else if (deletedId) {
          store.update(scope, deletedId, { deletedAt: null });
          deletedId = null;
          render();
        }
      } catch { status.textContent = 'Изменение не сохранено. Попробуйте ещё раз.'; }
    });
    render();
  }
}
