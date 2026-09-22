export const PROJECT_NOTE_SECTIONS = Object.freeze({
  sheets: 'Оригинал проекта по листам',
  spec: 'Весь проект по спецификации',
  visual: 'Визуальный разбор',
  extra: 'Доп. работы',
  notes: 'Мои заметки к проекту'
});

export const escapeProjectText = (value) => String(value ?? '').replace(/[&<>"']/g, (symbol) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[symbol]));

export function createProjectNotesStore(storage, ownerId) {
  const key = `structos-project-notes-v1:${ownerId || 'local'}`;
  const read = () => {
    const raw = storage.getItem(key);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('Повреждено хранилище заметок');
    return data;
  };
  const write = (data) => storage.setItem(key, JSON.stringify(data));
  return {
    all: read,
    list(objectId, { sectionId, versionId } = {}) {
      return read().filter((note) => note.objectId === objectId && !note.deletedAt
        && (!sectionId || note.sectionId === sectionId) && (!versionId || note.versionId === versionId))
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    },
    save(input) {
      const text = String(input.text || '').trim();
      if (!text || text.length > 2000) throw new Error('Введите заметку от 1 до 2000 символов');
      if (!input.objectId || !input.versionId || !PROJECT_NOTE_SECTIONS[input.sectionId]) throw new Error('Не выбран проект или раздел');
      const data = read();
      const old = input.id ? data.find((note) => note.id === input.id && note.objectId === input.objectId && !note.deletedAt) : null;
      if (input.id && !old) throw new Error('Заметка уже изменена или удалена. Откройте раздел заново');
      const now = new Date().toISOString();
      const note = old ? { ...old, text, updatedAt: now } : {
        id: `note-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`,
        objectId: input.objectId, versionId: input.versionId, versionName: String(input.versionName || ''),
        sectionId: input.sectionId, text, createdAt: now, updatedAt: now
      };
      write(old ? data.map((item) => item.id === note.id ? note : item) : [...data, note]);
      return note;
    },
    setDeleted(objectId, id, deleted) {
      const data = read();
      const note = data.find((item) => item.objectId === objectId && item.id === id);
      if (!note) throw new Error('Заметка не найдена');
      write(data.map((item) => item === note ? { ...item, deletedAt: deleted ? new Date().toISOString() : null } : item));
    }
  };
}

// Extractive answers only: every returned fragment is present in this sheet's
// saved analysis. Demo data and generic installation guesses are never evidence.
export function answerFromProjectSheet(question, { source, evidence = [], isDemo = false }) {
  const missing = { status: 'needs-data', source, text: 'В сохранённых данных этого листа нет сведений для ответа. Нужен распознанный оригинал или уточнение проектировщика. Вопрос сохранён.' };
  if (isDemo || !evidence.length) return missing;
  const normalize = (text) => String(text).toLowerCase().replace(/ё/g, 'е');
  const query = normalize(question);
  const stop = new Set('какая какой какие какое как что где когда почему зачем сколько можно нужно надо этот этом этого лист листе листа проект проекта расскажи покажи объясни пожалуйста должен должна быть для про есть или при это мне'.split(' '));
  const tokens = [...new Set((query.match(/[\p{L}\p{N}-]+/gu) || []).filter((word) => word.length > 2 && !stop.has(word)).map((word) => word.length > 5 ? word.slice(0, -2) : word))];
  const summary = /(?:что|содержание|описание).*(?:листе|лист|показано|изображено)|(?:что здесь|опиши лист)/u.test(query);
  const fragments = [...new Set(evidence.flatMap((value) => String(value).split(/\n+|(?<=[.!?])\s+(?=[А-ЯA-Z])/u)).map((value) => value.trim()).filter(Boolean))];
  const ranked = fragments.map((text, index) => ({ text, index, score: tokens.reduce((score, token) => score + (normalize(text).includes(token) ? 1 : 0), 0) }))
    .filter((entry) => summary || (tokens.length > 0 && entry.score >= Math.min(tokens.length, 2)))
    .sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 4);
  if (!ranked.length) return missing;
  return { status: 'evidence', source, text: `В данных этого листа найдено:\n\n${ranked.map((item) => `• ${item.text.slice(0, 1600)}`).join('\n\n')}\n\nЭто выдержки из сохранённого разбора. Если они не отвечают на вопрос полностью, уточните вопрос или запросите пояснение проектировщика.` };
}

const dateLabel = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('ru', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
};

export function projectQuestionHistoryMarkup(questions) {
  const escape = escapeProjectText;
  return questions.map((item) => `<article class="project-question-entry"><header><strong>Ваш вопрос</strong><time>${escape(dateLabel(item.createdAt))}</time></header><p>${escape(item.text)}</p><section class="project-answer ${item.answer?.status === 'evidence' ? 'has-evidence' : ''}"><strong>StructOS · ответ по данным листа</strong><p>${escape(item.answer?.text || 'Вопрос сохранён. Нажмите «Получить ответ», чтобы проверить доступные данные листа.')}</p>${item.answer?.source ? `<small>Источник: ${escape(item.answer.source)}</small>` : ''}</section>${!item.answer || item.answer.status === 'needs-data' ? `<button class="outline-button" type="button" data-project-question-retry="${escape(item.id)}">${item.answer ? 'Проверить данные ещё раз' : 'Получить ответ'}</button>` : ''}</article>`).join('');
}

export function bindProjectNotes({ rootElement, object, version, ownerId, showToast, onChange = () => {} }) {
  const escape = escapeProjectText;
  const store = createProjectNotesStore(localStorage, ownerId);
  const contexts = ['sheets', 'spec', 'visual', 'extra', 'notes'];
  const statusText = 'Заметки сохраняются на этом устройстве. Общий список находится в «Мои заметки к проекту».';
  let deletedNoteId = null;
  const listFor = (sectionId) => store.list(object.id, sectionId === 'notes' ? {} : { sectionId, versionId: version.id });
  const fail = (error, scope) => {
    const text = error?.name === 'QuotaExceededError' ? 'Память устройства заполнена. Заметка не сохранена — скопируйте текст.' : 'Не удалось сохранить заметку. Текст оставлен в поле; попробуйте ещё раз.';
    const status = scope?.querySelector('[data-note-status]');
    if (status) status.textContent = text;
    showToast(text);
  };
  for (const sectionId of contexts) {
    const section = rootElement.querySelector(`#project-block-${sectionId}`);
    if (!section) continue;
    const panel = document.createElement('section');
    panel.className = 'project-notes-panel';
    panel.dataset.projectNotesPanel = sectionId;
    panel.innerHTML = `<header><div><small>ЛИЧНЫЕ ЗАПИСИ</small><h3>${sectionId === 'notes' ? 'Все заметки этого проекта' : 'Мои заметки к разделу'}</h3></div><span data-notes-count>0</span></header><form data-project-note-form="${sectionId}"><label for="project-note-${sectionId}">${sectionId === 'notes' ? 'Добавить общую заметку' : 'Оставить заметку'}</label><textarea id="project-note-${sectionId}" name="text" rows="3" maxlength="2000" required placeholder="Запишите мысль, уточнение или задачу по проекту…"></textarea><footer><small>До 2000 символов</small><button class="primary-button" type="submit">Сохранить заметку</button></footer><p class="project-note-status" data-note-status role="status" aria-live="polite"></p></form><p class="project-notes-hint">${statusText}</p>${sectionId === 'notes' ? '<label class="project-notes-filter">Раздел<select data-note-filter><option value="">Все разделы</option>' + Object.entries(PROJECT_NOTE_SECTIONS).map(([key, title]) => `<option value="${key}">${escape(title)}</option>`).join('') + '</select></label>' : ''}<div data-note-undo hidden></div><div class="project-notes-list" data-notes-list></div>`;
    section.querySelector('.project-deep-section-head')?.after(panel);
    panel.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = panel.querySelector('textarea');
      if (!input.value.trim()) { input.focus(); return; }
      try {
        store.save({ objectId: object.id, versionId: version.id, versionName: version.name, sectionId, text: input.value });
        input.value = '';
        panel.querySelector('[data-note-status]').textContent = 'Заметка сохранена';
        refresh();
        onChange();
      } catch (error) { fail(error, panel); }
    });
    panel.querySelector('[data-note-filter]')?.addEventListener('change', () => renderList(panel, sectionId));
    panel.addEventListener('click', (event) => {
      const button = event.target.closest('[data-note-action]');
      if (!button) return;
      const { noteId, noteAction } = button.dataset;
      try {
        if (noteAction === 'undo') {
          store.setDeleted(object.id, deletedNoteId, false);
          deletedNoteId = null;
          refresh();
          onChange();
          return;
        }
        const note = store.list(object.id).find((item) => item.id === noteId);
        if (!note) return;
        if (noteAction === 'delete') {
          store.setDeleted(object.id, noteId, true);
          deletedNoteId = noteId;
          refresh();
          onChange();
        } else if (noteAction === 'edit') {
          const card = button.closest('[data-note-card]');
          card.innerHTML = `<form class="project-note-edit"><label for="edit-${escape(note.id)}">Изменить заметку</label><textarea id="edit-${escape(note.id)}" rows="4" maxlength="2000" required>${escape(note.text)}</textarea><footer><button class="primary-button" type="submit">Сохранить изменения</button><button class="outline-button" type="button" data-cancel-note-edit>Отмена</button></footer><p data-note-status role="status"></p></form>`;
          const form = card.querySelector('form');
          form.querySelector('textarea').focus();
          form.querySelector('[data-cancel-note-edit]').addEventListener('click', () => renderList(panel, sectionId));
          form.addEventListener('submit', (submitEvent) => {
            submitEvent.preventDefault();
            const text = form.querySelector('textarea').value.trim();
            if (!text) { form.querySelector('textarea').focus(); return; }
            try { store.save({ ...note, text }); refresh(); onChange(); }
            catch (error) { fail(error, form); }
          });
        }
      } catch (error) { fail(error, panel); }
    });
  }
  function renderList(panel, sectionId) {
    const notes = listFor(sectionId);
    const filter = panel.querySelector('[data-note-filter]')?.value;
    const visible = filter ? notes.filter((note) => note.sectionId === filter) : notes;
    panel.querySelector('[data-notes-count]').textContent = String(notes.length);
    panel.querySelector('[data-notes-list]').innerHTML = visible.length ? visible.map((note) => `<article class="project-note-card" data-note-card="${escape(note.id)}"><header><strong>${escape(PROJECT_NOTE_SECTIONS[note.sectionId])}</strong><time>${escape(dateLabel(note.updatedAt))}</time></header><small>${escape(note.versionName || 'Файл проекта')}${note.versionId !== version.id ? ' · другая версия' : ''}</small><p>${escape(note.text)}</p><footer><button class="outline-button" type="button" data-note-action="edit" data-note-id="${escape(note.id)}">Изменить</button><button class="outline-button" type="button" data-note-action="delete" data-note-id="${escape(note.id)}">Удалить</button></footer></article>`).join('') : '<p class="project-notes-empty">Заметок пока нет. Добавьте первую запись выше.</p>';
    const undo = panel.querySelector('[data-note-undo]');
    undo.hidden = !deletedNoteId;
    undo.innerHTML = deletedNoteId ? '<span>Заметка удалена.</span> <button class="outline-button" type="button" data-note-action="undo">Восстановить</button>' : '';
  }
  function refresh() {
    try {
      rootElement.querySelectorAll('[data-project-notes-panel]').forEach((panel) => renderList(panel, panel.dataset.projectNotesPanel));
      const total = store.list(object.id).length;
      const count = rootElement.querySelector('[data-project-section="notes"] em');
      if (count) count.textContent = total ? `Заметок: ${total} · Открыть →` : 'Открыть раздел →';
    } catch {
      rootElement.querySelectorAll('[data-notes-list]').forEach((list) => { list.textContent = 'Не удалось прочитать заметки. Сохранённые данные не изменены.'; });
    }
  }
  refresh();
}
