import { answerFromProjectSheet, escapeProjectText as escape, projectQuestionHistoryMarkup } from './project-notebook.js';

export function projectSourceKey(ownerId, file) {
  return JSON.stringify([ownerId || 'local', String(file.name || ''), Number(file.size) || 0, Number(file.lastModified) || 0]);
}

let sourceDatabase;
function sourceDB() {
  if (!sourceDatabase) sourceDatabase = new Promise((resolve, reject) => {
    const request = indexedDB.open('structos-project-originals-v1', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => { sourceDatabase = null; reject(request.error); };
  });
  return sourceDatabase;
}

export async function saveProjectOriginal(ownerId, metadata, file) {
  const db = await sourceDB();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('files', 'readwrite');
    transaction.objectStore('files').put(file, projectSourceKey(ownerId, metadata));
    transaction.oncomplete = resolve;
    transaction.onerror = transaction.onabort = () => reject(transaction.error || new Error('Original was not saved'));
  });
}

export async function readProjectOriginal(ownerId, metadata) {
  const db = await sourceDB();
  return new Promise((resolve, reject) => {
    const request = db.transaction('files', 'readonly').objectStore('files').get(projectSourceKey(ownerId, metadata));
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

let pdfRuntime;
export async function openProjectPdf(file) {
  pdfRuntime ||= Promise.all([import('pdfjs-dist/build/pdf.mjs'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(([pdf, worker]) => {
    pdf.GlobalWorkerOptions.workerSrc = worker.default;
    return pdf;
  }).catch((error) => { pdfRuntime = null; throw error; });
  const pdf = await pdfRuntime;
  const resourceBase = new URL(import.meta.env.DEV ? './node_modules/pdfjs-dist/' : './pdfjs/', document.baseURI).href;
  const task = pdf.getDocument({
    data: new Uint8Array(await file.arrayBuffer()), isEvalSupported: false,
    standardFontDataUrl: `${resourceBase}standard_fonts/`, cMapUrl: `${resourceBase}cmaps/`,
    cMapPacked: true, wasmUrl: `${resourceBase}wasm/`
  });
  task.onPassword = () => { void task.destroy(); };
  return task.promise;
}

export async function describeProjectOriginal(file) {
  if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') return { sheets: [{ number: 1, pageNumber: 1, title: file.name, description: 'Откройте исходный файл проекта для просмотра.', originalPage: true }] };
  const pdf = await openProjectPdf(file);
  try {
    const sheets = [];
    for (let number = 1; number <= pdf.numPages; number += 1) {
      // Detailed text is read from the original when this sheet is opened.
      sheets.push({ number, pageNumber: number, title: `Страница ${number}`, description: 'Оригинал страницы PDF. Откройте чертёж, чтобы рассмотреть детали и задать вопрос.', originalPage: true });
    }
    return { sheets, pageCount: pdf.numPages };
  } finally { await pdf.loadingTask.destroy(); }
}

export function sheetQuestionMatches(item, scope) {
  return item.objectId === scope.objectId && item.versionId === scope.versionId && item.sheetId === scope.sheetId
    && (!item.ownerId || item.ownerId === scope.ownerId);
}

export function updateSheetQuestion(records, scope, id, patch) {
  let found = false;
  const updated = records.map((item) => {
    if (item.id !== id || !sheetQuestionMatches(item, scope)) return item;
    found = true;
    return { ...item, ...patch, id: item.id, objectId: item.objectId, versionId: item.versionId, sheetId: item.sheetId, ownerId: item.ownerId };
  });
  if (!found) throw new Error('Question not found in this sheet');
  return updated;
}

export function mountProjectSheetPage({ rootElement, object, version, sheet, ownerId, context, loadQuestions, saveQuestions, onQuestionsChanged, onClose, onOriginalMetadata = () => {}, readOriginal = readProjectOriginal, openPdf = openProjectPdf }) {
  const scope = { ownerId, objectId: object.id, versionId: version.id, sheetId: sheet.id };
  const page = document.createElement('section');
  page.className = 'project-sheet-page';
  const inputId = `sheet-question-${Math.random().toString(36).slice(2)}`;
  page.innerHTML = `<button class="outline-button project-section-back" type="button" data-sheet-back>← К листам проекта</button><header class="project-sheet-page-heading"><small>${escape(object.name)}</small><h2>Лист ${escape(sheet.number)} · ${escape(sheet.title)}</h2></header><section class="project-original-panel"><header><span aria-hidden="true">▤</span><div><small>ОРИГИНАЛ ЧЕРТЕЖА</small><strong>${escape(version.name)}</strong><p data-original-page-label></p></div></header><p data-original-status role="status" aria-live="polite">Открываем оригинал…</p><div class="project-original-actions"><a class="primary-button" data-original-open target="_blank" rel="noopener" hidden>Открыть чертёж полностью ↗</a><a class="outline-button" data-original-download hidden>↓ Скачать исходный файл</a><button class="outline-button" type="button" data-original-choose>Выбрать оригинал</button><input type="file" data-original-file hidden /></div><div class="project-drawing-toolbar" hidden><label>Страница PDF <select data-pdf-page aria-label="Страница PDF"></select></label><button type="button" class="outline-button" data-zoom-out aria-label="Уменьшить чертёж">−</button><span data-zoom-label>100%</span><button type="button" class="outline-button" data-zoom-in aria-label="Увеличить чертёж">+</button></div><div class="project-original-viewport" hidden><canvas aria-label="Оригинал чертежа"></canvas><img alt="Оригинал чертежа" hidden /></div></section><section class="project-sheet-dialogue"><header><h3>Вопросы и ответы по листу</h3><span data-sheet-question-total>0</span></header><p class="project-answer-hint">Ответы — по тексту и сохранённым данным выбранного листа. Если данных нет, StructOS сообщит об этом. Вопросы и ответы сохраняются на этом устройстве.</p><form class="project-sheet-ask"><label for="${inputId}">Задать вопрос StructOS</label><textarea id="${inputId}" rows="3" maxlength="400" required placeholder="Например: какая высота установки указана на чертеже?"></textarea><button class="primary-button" type="submit">Задать вопрос</button><p data-question-status role="status" aria-live="polite"></p></form><div data-question-undo hidden></div><div class="project-sheet-conversation" aria-label="История вопросов и ответов"></div></section>`;
  rootElement.append(page);
  const $ = (selector) => page.querySelector(selector);
  const status = $('[data-original-status]');
  const questionStatus = $('[data-question-status]');
  const history = $('.project-sheet-conversation');
  const input = $('textarea');
  const submit = $('.project-sheet-ask button');
  const mappingKey = `structos-sheet-page-v1:${JSON.stringify([ownerId, object.id, version.id, sheet.id])}`;
  let pageNumber = Number(sheet.pageNumber) || 1;
  try { pageNumber = Number(localStorage.getItem(mappingKey)) || pageNumber; } catch {}
  let originalURL, pdf, renderTask, disposed = false, generation = 0, scale = 1, loading = true, currentContext = context, lastDeleted = null;
  const source = () => `${version.name} · страница PDF ${pageNumber} · лист ${sheet.number}`;
  function historyMarkup() {
    const questions = loadQuestions().filter((item) => sheetQuestionMatches(item, scope) && !item.deletedAt);
    $('[data-sheet-question-total]').textContent = String(questions.length);
    history.innerHTML = questions.length ? projectQuestionHistoryMarkup(questions) : '<p class="project-notes-empty">Пока нет вопросов. Задайте первый вопрос по этому чертежу.</p>';
    for (const [index, article] of [...history.querySelectorAll('.project-question-entry')].entries()) {
      const remove = document.createElement('button');
      remove.className = 'outline-button project-question-delete';
      remove.type = 'button';
      remove.textContent = 'Удалить вопрос';
      remove.dataset.questionDelete = questions[index].id;
      article.append(remove);
    }
    const undo = $('[data-question-undo]');
    undo.hidden = !lastDeleted;
    undo.innerHTML = lastDeleted ? '<span>Вопрос и ответ удалены.</span> <button type="button" class="outline-button" data-question-restore>Восстановить</button>' : '';
    onQuestionsChanged();
  }
  function saveAnswer(question, isNew) {
    if (loading) { questionStatus.textContent = 'Подождите, пока откроется выбранный лист.'; return; }
    try {
      const answer = answerFromProjectSheet(question.text, currentContext);
      const answered = { ...question, answer, answeredAt: new Date().toISOString() };
      const records = loadQuestions();
      saveQuestions(isNew ? [...records, answered] : updateSheetQuestion(records, scope, question.id, answered));
      if (isNew) input.value = '';
      questionStatus.textContent = answer.status === 'evidence' ? 'Вопрос и ответ сохранены' : 'Вопрос сохранён. Для ответа недостаточно данных этого листа';
      historyMarkup();
    } catch { questionStatus.textContent = 'Не удалось сохранить. Скопируйте текст или попробуйте ещё раз.'; }
  }
  $('.project-sheet-ask').addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    saveAnswer({ ...scope, id: `question-${crypto.randomUUID()}`, sheetNumber: sheet.number, sheetTitle: sheet.title, pageNumber, text, createdAt: new Date().toISOString() }, true);
  });
  page.addEventListener('click', (event) => {
    const remove = event.target.closest('[data-question-delete]');
    const restore = event.target.closest('[data-question-restore]');
    const retry = event.target.closest('[data-project-question-retry]');
    if (!remove && !restore && !retry) return;
    try {
      if (retry) {
        const question = loadQuestions().find((item) => item.id === retry.dataset.projectQuestionRetry && sheetQuestionMatches(item, scope) && !item.deletedAt);
        if (question && (!question.pageNumber || question.pageNumber === pageNumber)) saveAnswer(question, false);
        else if (question) questionStatus.textContent = `Для этого вопроса выберите страницу PDF ${question.pageNumber}.`;
        return;
      }
      const id = remove?.dataset.questionDelete || lastDeleted;
      saveQuestions(updateSheetQuestion(loadQuestions(), scope, id, { deletedAt: remove ? new Date().toISOString() : null }));
      lastDeleted = remove ? id : null;
      historyMarkup();
    } catch { questionStatus.textContent = 'Изменение не сохранено. Попробуйте ещё раз.'; }
  });
  async function renderPdf() {
    const token = ++generation;
    const previousRender = renderTask;
    previousRender?.cancel();
    loading = true; submit.disabled = true;
    currentContext = { source: source(), evidence: [] };
    status.textContent = 'Открываем страницу чертежа…';
    try {
      if (previousRender) await previousRender.promise.catch(() => {});
      if (disposed || token !== generation) return;
      const pdfPage = await pdf.getPage(pageNumber);
      if (disposed || token !== generation) return;
      const viewportBox = $('.project-original-viewport');
      const available = Math.max(260, viewportBox.clientWidth || page.clientWidth || 700);
      const base = pdfPage.getViewport({ scale: 1 });
      const zoom = Math.min(available / base.width, 1.5) * scale;
      const viewport = pdfPage.getViewport({ scale: zoom });
      const pixelRatio = Math.min(globalThis.devicePixelRatio || 1, 2, Math.sqrt(16000000 / (viewport.width * viewport.height)));
      const canvas = $('canvas');
      canvas.width = Math.max(1, Math.floor(viewport.width * pixelRatio)); canvas.height = Math.max(1, Math.floor(viewport.height * pixelRatio));
      canvas.style.width = `${viewport.width}px`; canvas.style.height = `${viewport.height}px`;
      renderTask = pdfPage.render({ canvas, viewport, transform: [pixelRatio, 0, 0, pixelRatio, 0, 0] });
      await renderTask.promise;
      if (disposed || token !== generation) return;
      const content = await pdfPage.getTextContent();
      if (disposed || token !== generation) return;
      let line = '', lastY;
      const lines = [];
      for (const item of content.items) {
        const y = Math.round(item.transform?.[5] || 0);
        if (lastY !== undefined && Math.abs(y - lastY) > 3 && line.trim()) { lines.push(line.trim()); line = ''; }
        line += `${item.str || ''} `; lastY = y;
        if (item.hasEOL) { lines.push(line.trim()); line = ''; }
      }
      if (line.trim()) lines.push(line.trim());
      currentContext = { source: source(), evidence: lines.filter(Boolean), isDemo: false };
      status.textContent = lines.length ? 'Оригинал открыт. Можно увеличить чертёж или открыть его полностью.' : 'Чертёж открыт. На этой странице нет текстового слоя; для ответов по скану потребуется распознавание.';
      $('[data-original-open]').href = `${originalURL}#page=${pageNumber}`;
      $('[data-original-page-label]').textContent = `Страница ${pageNumber} из ${pdf.numPages}`;
    } catch (error) {
      if (error?.name !== 'RenderingCancelledException' && token === generation && !disposed) status.textContent = 'Не удалось отобразить страницу. Откройте исходный файл по кнопке выше.';
    } finally {
      if (!disposed && token === generation) { loading = false; submit.disabled = false; }
    }
  }
  async function showOriginal(file) {
    if (disposed) return;
    loading = true; submit.disabled = true;
    currentContext = { source: `${version.name} · лист ${sheet.number}`, evidence: [] };
    if (originalURL) URL.revokeObjectURL(originalURL);
    originalURL = URL.createObjectURL(file);
    const open = $('[data-original-open]'), download = $('[data-original-download]');
    open.href = originalURL; open.hidden = false;
    download.href = originalURL; download.download = version.name; download.hidden = false;
    const kind = file.type || version.type || '';
    if (kind === 'application/pdf' || /\.pdf$/i.test(version.name)) {
      try {
        pdf = await openPdf(file);
        if (disposed) { await pdf.loadingTask.destroy(); return; }
        onOriginalMetadata({ pageCount: pdf.numPages, sheets: Array.from({ length: pdf.numPages }, (_, index) => ({ number: index + 1, pageNumber: index + 1, title: `Страница ${index + 1}`, description: 'Оригинал страницы PDF. Откройте чертёж, чтобы рассмотреть детали и задать вопрос.', originalPage: true })) });
        const selection = $('[data-pdf-page]');
        selection.innerHTML = Array.from({ length: pdf.numPages }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
        if (pageNumber < 1 || pageNumber > pdf.numPages || !Number.isInteger(pageNumber)) {
          loading = false; submit.disabled = true;
          status.textContent = 'Номер листа не совпадает со страницей PDF. Выберите нужную страницу ниже.';
          selection.insertAdjacentHTML('afterbegin', '<option value="" selected>Выберите страницу</option>');
          $('.project-drawing-toolbar').hidden = false;
          return;
        }
        selection.value = String(pageNumber);
        $('.project-drawing-toolbar').hidden = false;
        $('.project-original-viewport').hidden = false;
        await renderPdf();
      } catch { status.textContent = 'PDF не удалось прочитать. Возможно, он защищён паролем или повреждён. Можно открыть исходный файл отдельно.'; loading = false; submit.disabled = false; }
    } else if (/^image\/(png|jpeg|webp|gif)$/.test(kind) || /\.(png|jpe?g|webp|gif)$/i.test(version.name)) {
      onOriginalMetadata({ pageCount: 1, sheets: [{ number: 1, pageNumber: 1, title: version.name, description: 'Оригинал изображения проекта.', originalPage: true }] });
      $('canvas').hidden = true;
      const image = $('img'); image.src = originalURL; image.hidden = false;
      $('.project-original-viewport').hidden = false;
      status.textContent = 'Оригинал изображения открыт. Для увеличения нажмите «Открыть чертёж полностью». Для ответов по изображению потребуется распознавание.';
      loading = false; submit.disabled = false;
    } else {
      status.textContent = 'Скачайте оригинал и откройте в программе для этого формата. Просмотр здесь доступен для PDF и изображений.';
      open.hidden = true; loading = false; submit.disabled = false;
    }
  }
  $('[data-pdf-page]').addEventListener('change', async (event) => {
    const selected = Number(event.target.value);
    if (!Number.isInteger(selected) || selected < 1 || selected > pdf.numPages) return;
    pageNumber = selected; scale = 1;
    $('[data-zoom-label]').textContent = '100%';
    $('.project-original-viewport').hidden = false;
    try { localStorage.setItem(mappingKey, String(pageNumber)); } catch {}
    await renderPdf();
  });
  for (const [selector, delta] of [['[data-zoom-in]', .5], ['[data-zoom-out]', -.5]]) $(selector).addEventListener('click', () => {
    if (!pdf || loading || pageNumber < 1 || pageNumber > pdf.numPages) return;
    scale = Math.max(.5, Math.min(4, scale + delta));
    $('[data-zoom-label]').textContent = `${Math.round(scale * 100)}%`;
    void renderPdf();
  });
  $('[data-original-choose]').addEventListener('click', () => $('[data-original-file]').click());
  $('[data-original-file]').addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || disposed) return;
    if (file.name !== version.name || (version.size && file.size !== version.size)) { status.textContent = `Выберите исходный файл «${version.name}» того же размера. Другой файл нужно добавить как новую версию проекта.`; return; }
    $('[data-original-choose]').disabled = true;
    try {
      await saveProjectOriginal(ownerId, version, file);
      renderTask?.cancel();
      if (pdf) await pdf.loadingTask.destroy();
      pdf = null;
      await showOriginal(file);
    } catch { status.textContent = 'Оригинал не удалось сохранить. Освободите место на устройстве и выберите файл ещё раз.'; }
    finally { if (!disposed) $('[data-original-choose]').disabled = false; }
  });
  function dispose() {
    if (disposed) return;
    disposed = true; ++generation;
    renderTask?.cancel();
    void pdf?.loadingTask.destroy();
    if (originalURL) URL.revokeObjectURL(originalURL);
    observer.disconnect();
  }
  const observer = new MutationObserver(() => { if (!page.isConnected) dispose(); });
  observer.observe(document.body, { childList: true, subtree: true });
  $('[data-sheet-back]').addEventListener('click', () => { dispose(); page.remove(); onClose(); });
  historyMarkup();
  $('[data-sheet-back]').focus();
  $('[data-original-choose]').disabled = true;
  void (async () => {
    try {
      const file = await readOriginal(ownerId, version);
      if (disposed) return;
      if (file) await showOriginal(file);
      else { status.textContent = 'Оригинала нет на этом устройстве. Нажмите «Выбрать оригинал» и укажите ранее загруженный файл. История вопросов сохранена.'; loading = false; submit.disabled = false; }
    } catch { if (!disposed) { status.textContent = 'Не удалось прочитать оригинал на устройстве. Попробуйте выбрать файл ещё раз.'; loading = false; submit.disabled = false; } }
    finally { if (!disposed) $('[data-original-choose]').disabled = false; }
  })();
  return { page, dispose };
}
