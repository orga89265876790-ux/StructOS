import { createTimesheetStore, createSheet, addEmployee, setEmployment, saveDraft, completeDay, reopenDay, addFine, addPayment, periodSummary, workedDays, availableOn, entryAmount, today, validDate } from './timesheet-model.js';

const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
const money = (cents) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 2 }).format(cents / 100);
const dateText = (date) => new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
const timeText = (date) => new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(date));
const plus = '<span class="ts-plus" aria-hidden="true">+</span>';

export function timesheetSnapshot(ownerId) {
  if (!ownerId || ownerId === 'local') return null;
  return createTimesheetStore(localStorage, ownerId).read();
}

export function mountTimesheet({ root, ownerId, onChange = () => {} }) {
  if (!root) return;
  let store;
  try { store = createTimesheetStore(localStorage, ownerId); }
  catch (error) { root.innerHTML = `<p class="ts-error" role="alert">${escape(error.message)}</p>`; return; }
  let state = store.read();
  let selectedId = null;
  let selectedDate = today();
  let calendarMonth = selectedDate.slice(0, 7);
  let showFormer = false;
  let modalBusy = false;
  let returnFocus;
  const dialog = document.createElement('dialog');
  dialog.className = 'ts-dialog';
  dialog.setAttribute('aria-labelledby', 'ts-dialog-title');
  document.body.append(dialog);
  const sheet = () => state.sheets.find((item) => item.id === selectedId);
  const $ = (selector, scope = root) => scope.querySelector(selector);
  const $$ = (selector, scope = root) => [...scope.querySelectorAll(selector)];
  function errorMessage(error, scope = root) {
    const status = $('[data-ts-error]', scope);
    if (status) { status.hidden = false; status.textContent = error.message || 'Не удалось сохранить данные.'; }
  }
  function change(update) {
    state = store.change(update);
    Promise.resolve().then(onChange).catch(() => {});
  }
  const changeSheet = (update) => change((next) => update(next.sheets.find((item) => item.id === selectedId)));
  function checkedHours() {
    const values = {};
    for (const input of $$('[data-ts-hours]')) {
      if (!input.reportValidity()) throw new Error('Проверьте часы: целое число от 0 до 24.');
      values[input.dataset.tsHours] = input.value;
    }
    return values;
  }
  function guardInputs() { checkedHours(); }
  function openDialog(title, body) {
    returnFocus = document.activeElement;
    dialog.innerHTML = `<header class="ts-dialog-head"><h2 id="ts-dialog-title">${title}</h2><button type="button" class="ts-icon-button" data-ts-close aria-label="Закрыть">×</button></header>${body}<p class="ts-error" data-ts-error role="alert" hidden></p>`;
    dialog.showModal();
  }
  dialog.addEventListener('click', (event) => { if (event.target.closest('[data-ts-close]')) dialog.close(); });
  dialog.addEventListener('close', () => { if (returnFocus?.isConnected) returnFocus.focus(); });
  function submitForm(callback) {
    $('form', dialog).addEventListener('submit', (event) => {
      event.preventDefault();
      if (modalBusy) return;
      modalBusy = true;
      try { callback(new FormData(event.currentTarget)); dialog.close(); render(); }
      catch (error) { errorMessage(error, dialog); }
      finally { modalBusy = false; }
    });
  }
  const field = (label, name, type = 'text', value = '', extra = '') => `<label class="ts-field">${label}<input name="${name}" type="${type}" value="${escape(value)}" ${extra}></label>`;
  const footer = (label) => `<footer class="ts-form-footer"><button class="outline-button" type="button" data-ts-close>Отмена</button><button class="primary-button" type="submit">${label}</button></footer>`;
  function employeeFields() {
    return `<fieldset class="ts-employee-fields"><legend>Сотрудник</legend>${field('ФИО одной строкой', 'name', 'text', '', 'required maxlength="180" autocomplete="name" placeholder="Иванов Иван Иванович"')}<div class="ts-two-fields">${field('Рабочий день, часов', 'dayHours', 'number', '8', 'required min="1" max="24" step="1" inputmode="numeric"')}${field('Ставка за день, ₽', 'rate', 'number', '', 'required min="0.01" max="100000000" step="0.01" inputmode="decimal" placeholder="7 000"')}</div><button class="ts-text-button ts-remove-employee" type="button">Убрать строку</button></fieldset>`;
  }
  function createDialog() {
    openDialog('Создать табель', `<form class="ts-form">${field('Название объекта', 'objectName', 'text', '', 'required maxlength="180" placeholder="Например, Курьяново"')}${field('Название проекта', 'projectName', 'text', '', 'required maxlength="180"')}${field('Дата начала работ', 'startDate', 'date', today(), `required max="${today()}"`)}<div data-ts-employee-fields>${employeeFields()}</div><button type="button" class="ts-text-button" data-ts-more-person>${plus} Добавить ещё сотрудника</button><p class="ts-note">Ставка за день ÷ часы рабочего дня × отработанные часы.</p>${footer('Создать табель')}</form>`);
    $('[data-ts-more-person]', dialog).onclick = () => $('[data-ts-employee-fields]', dialog).insertAdjacentHTML('beforeend', employeeFields());
    $('[data-ts-employee-fields]', dialog).onclick = (event) => {
      if (event.target.closest('.ts-remove-employee') && $$('.ts-employee-fields', dialog).length > 1) event.target.closest('fieldset').remove();
    };
    submitForm((data) => {
      const employees = $$('.ts-employee-fields', dialog).map((element) => ({ name: $('[name="name"]', element).value, dayHours: $('[name="dayHours"]', element).value, rate: $('[name="rate"]', element).value }));
      const created = createSheet({ objectName: data.get('objectName'), projectName: data.get('projectName'), startDate: data.get('startDate'), employees });
      change((next) => next.sheets.push(created));
      selectedId = created.id; selectedDate = created.startDate; calendarMonth = selectedDate.slice(0, 7);
    });
  }
  function addEmployeeDialog() {
    openDialog('Добавить сотрудника', `<form class="ts-form">${employeeFields()}${field('Дата начала работы сотрудника', 'joined', 'date', selectedDate, `required min="${sheet().startDate}" max="${today()}"`)}${footer('Добавить сотрудника')}</form>`);
    $('.ts-remove-employee', dialog).remove();
    submitForm((data) => changeSheet((current) => addEmployee(current, { name: data.get('name'), dayHours: data.get('dayHours'), rate: data.get('rate') }, data.get('joined'))));
  }
  function fineDialog(employeeId) {
    const employee = sheet().employees.find((item) => item.id === employeeId);
    openDialog('Оштрафовать сотрудника', `<p class="ts-dialog-person">${escape(employee.name)}</p><form class="ts-form">${field('Дата штрафа', 'date', 'date', selectedDate, `required min="${sheet().startDate}" max="${today()}"`)}${field('Сумма штрафа, ₽', 'amount', 'number', '', 'required min="0.01" max="100000000" step="0.01" inputmode="decimal"')}<label class="ts-field">Комментарий<textarea name="comment" required maxlength="1000" rows="3" placeholder="Причина штрафа"></textarea></label>${footer('Сохранить штраф')}</form>`);
    submitForm((data) => changeSheet((current) => addFine(current, { employeeId, date: data.get('date'), amount: data.get('amount'), comment: data.get('comment') })));
  }
  const employeeOptions = (selected) => sheet().employees.map((employee) => `<option value="${employee.id}" ${employee.id === selected ? 'selected' : ''}>${escape(employee.name)}${employee.dismissed ? ' · уволен' : ''}</option>`).join('');
  function paymentDialog() {
    openDialog('Выплатить зарплату', `<form class="ts-form"><label class="ts-field">Сотрудник<select name="employeeId" required>${employeeOptions()}</select></label><div class="ts-two-fields">${field('Период с', 'from', 'date', sheet().startDate, `required min="${sheet().startDate}" max="${today()}"`)}${field('По включительно', 'to', 'date', selectedDate, `required min="${sheet().startDate}" max="${today()}"`)}</div><div data-ts-pay-summary aria-live="polite"></div>${field('Сумма выплаты, ₽', 'amount', 'number', '', 'required min="0.01" max="100000000" step="0.01" inputmode="decimal"')}<p class="ts-note" data-ts-overpayment></p><label class="ts-field">Комментарий к выплате<textarea name="comment" maxlength="1000" rows="2" placeholder="Например, перевод на карту"></textarea></label><p class="ts-note">Запись фиксирует выплату в табеле. Перевод денег выполняется отдельно.</p>${footer('Записать выплату')}</form>`);
    const form = $('form', dialog);
    function summary() {
      const data = new FormData(form);
      try {
        const result = periodSummary(sheet(), data.get('employeeId'), data.get('from'), data.get('to'));
        $('[data-ts-pay-summary]', dialog).innerHTML = `<div class="ts-pay-totals"><div><span>Начислено</span><strong>${money(result.gross)}</strong></div><div><span>Штрафы</span><strong>−${money(result.deducted)}</strong></div><div><span>Уже выплачено</span><strong>${money(result.paid)}</strong></div><div class="ts-pay-balance"><span>${result.remaining < 0 ? 'Переплата' : 'Осталось выплатить'}</span><strong>${money(Math.abs(result.remaining))}</strong></div></div>${result.fines.length ? `<div class="ts-fine-list"><b>Штрафы за выбранный период</b>${result.fines.map((fine) => `<p>${escape(dateText(fine.date))} · ${money(fine.amountCents)}<br><span>${escape(fine.comment)}</span></p>`).join('')}</div>` : '<p class="ts-note">Штрафов за этот период нет.</p>'}<p class="ts-note">Начисления только за завершённые дни. Выплаты распределяются по датам, поэтому учитываются и в пересекающихся периодах.</p>`;
        const amount = Number(data.get('amount')) * 100;
        $('[data-ts-overpayment]', dialog).textContent = amount > Math.max(result.remaining, 0) ? `Сумма выше остатка на ${money(amount - Math.max(result.remaining, 0))}. Разница будет учтена как аванс / переплата.` : '';
      } catch (error) { $('[data-ts-pay-summary]', dialog).innerHTML = `<p class="ts-error">${escape(error.message)}</p>`; }
    }
    form.addEventListener('input', summary); form.addEventListener('change', summary); summary();
    submitForm((data) => changeSheet((current) => addPayment(current, { employeeId: data.get('employeeId'), from: data.get('from'), to: data.get('to'), amount: data.get('amount'), comment: data.get('comment') })));
  }
  function historyDialog() {
    openDialog('История сотрудника', `<label class="ts-field">ФИО<select data-ts-history-person>${employeeOptions()}</select></label><div data-ts-history-content></div>`);
    function history() {
      const employee = sheet().employees.find((item) => item.id === $('[data-ts-history-person]', dialog).value);
      const totals = periodSummary(sheet(), employee.id, sheet().startDate, today());
      const names = { added: 'Сотрудник добавлен', dismissed: 'Увольнение', restored: 'Восстановление', fine: 'Штраф', payment: 'Выплата зарплаты', reopened: 'День открыт для редактирования', accrual: 'Начисление за день' };
      const entries = sheet().history.filter((event) => event.employeeId === employee.id || (event.kind === 'reopened' && sheet().days[event.date]?.entries[employee.id])).slice().reverse();
      $('[data-ts-history-content]', dialog).innerHTML = `<div class="ts-history-person"><strong>${escape(employee.name)}</strong><p>Дата ввода: ${escape(timeText(employee.createdAt))}</p><p>Ставка: ${money(employee.rateCents)} / ${employee.dayHours} ч · ${employee.dismissed ? 'Уволен' : 'Работает'}</p><p>Начислено: ${money(totals.gross)} · Штрафы: ${money(totals.deducted)} · Выплачено: ${money(totals.paid)}</p></div><ol class="ts-history-list">${entries.map((event) => `<li><time>${escape(timeText(event.at))}</time><strong>${names[event.kind] || 'Изменение'}${event.amountCents != null ? ` · ${money(event.amountCents)}` : ''}</strong>${event.date ? `<p>Дата работы: ${escape(dateText(event.date))}</p>` : ''}${event.kind === 'accrual' ? `<p>${event.hours} ч · ставка ${money(event.rateCents)} / ${event.dayHours} ч${event.previousAmountCents != null ? ` · до исправления: ${money(event.previousAmountCents)}` : ''}</p>` : ''}${event.kind === 'added' ? `<p>Ставка ${money(event.rateCents)} / ${event.dayHours} ч</p>` : ''}${event.from ? `<p>Период: ${escape(dateText(event.from))} — ${escape(dateText(event.to))}</p>` : ''}${event.comment ? `<p>${escape(event.comment)}</p>` : ''}</li>`).join('')}</ol>`;
    }
    $('[data-ts-history-person]', dialog).onchange = history; history();
  }
  function calendarMarkup(current) {
    const [year, month] = calendarMonth.split('-').map(Number);
    const first = new Date(year, month - 1, 1);
    const offset = (first.getDay() + 6) % 7;
    const count = new Date(year, month, 0).getDate();
    const caption = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(first);
    return `<section class="ts-calendar" aria-label="Календарь табеля"><header><button type="button" class="ts-icon-button" data-ts-month="-1" aria-label="Предыдущий месяц">‹</button><strong>${caption}</strong><button type="button" class="ts-icon-button" data-ts-month="1" aria-label="Следующий месяц">›</button></header><div class="ts-weekdays">${['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => `<span>${day}</span>`).join('')}</div><div class="ts-calendar-grid">${'<span></span>'.repeat(offset)}${Array.from({ length: count }, (_, index) => {
      const date = `${calendarMonth}-${String(index + 1).padStart(2, '0')}`;
      const status = current.days[date]?.status;
      return `<button type="button" data-ts-date="${date}" class="${date === selectedDate ? 'is-selected ' : ''}${status === 'completed' ? 'is-completed' : status === 'draft' ? 'is-draft' : ''}" ${date < current.startDate || date > today() ? 'disabled' : ''} aria-pressed="${date === selectedDate}" aria-label="${dateText(date)}${status === 'completed' ? ', день завершён' : status === 'draft' ? ', черновик' : ''}">${index + 1}<i aria-hidden="true">${status === 'completed' ? '✓' : status === 'draft' ? '·' : ''}</i></button>`;
    }).join('')}</div><p class="ts-note"><span class="ts-completed-dot">✓</span> Завершён · <b>·</b> Черновик</p></section>`;
  }
  function employeeCard(current, employee) {
    const day = current.days[selectedDate];
    const entry = day?.entries[employee.id];
    const locked = day?.status === 'completed' || !availableOn(employee, selectedDate);
    return `<article class="ts-person ${employee.dismissed ? 'is-dismissed' : ''}" data-ts-person="${employee.id}"><div class="ts-person-name"><h3>${escape(employee.name)}</h3><small>${money(employee.rateCents)} / ${employee.dayHours} ч${employee.dismissed ? ' · уволен' : ''}</small><div class="ts-person-actions"><button class="ts-text-button" type="button" data-ts-employment="${employee.id}">${employee.dismissed ? 'Восстановить сотрудника' : 'Уволить'}</button><button class="ts-text-button" type="button" data-ts-fine="${employee.id}">Оштрафовать</button></div></div><div class="ts-person-numbers"><label class="ts-field">Часов за день<input type="number" data-ts-hours="${employee.id}" value="${entry?.hours ?? ''}" min="0" max="24" step="1" inputmode="numeric" placeholder="0" aria-label="Часы: ${escape(employee.name)}" ${locked ? 'disabled' : ''}></label><div class="ts-number"><span>Дней по датам</span><strong data-ts-worked-days>${workedDays(current, employee.id, selectedDate)}</strong></div><div class="ts-number ts-salary"><span>Зарплата за день</span><strong data-ts-salary>${money(entryAmount(entry))}</strong></div></div></article>`;
  }
  function render() {
    const current = sheet();
    root.innerHTML = `<header class="ts-top"><div><span class="eyebrow">УЧЁТ РАБОЧЕГО ВРЕМЕНИ</span><h1 id="timesheet-title">Табель</h1></div><button class="primary-button" type="button" data-ts-create>${plus} Создать табель</button></header><p class="ts-error" data-ts-error role="alert" hidden></p>`;
    if (!current) {
      root.insertAdjacentHTML('beforeend', state.sheets.length ? `<p class="ts-objects-intro">Выберите объект, чтобы открыть учёт сотрудников и рабочих дней.</p><div class="ts-object-cards">${state.sheets.map((item) => `<button type="button" class="ts-object-card" data-ts-open="${item.id}"><span class="ts-object-card-icon" aria-hidden="true">▦</span><span class="ts-object-card-content"><strong>${escape(item.objectName)}</strong><span>${escape(item.projectName)}</span><small>Начало работ: ${dateText(item.startDate)}</small><small>Сотрудников: ${item.employees.filter((employee) => !employee.dismissed).length} · Завершено дней: ${Object.values(item.days).filter((day) => day.status === 'completed').length}</small><b>Открыть учёт →</b></span></button>`).join('')}</div>` : '<div class="ts-empty"><span aria-hidden="true">▦</span><h2>Первый рабочий день начинается здесь</h2><p>Создайте табель объекта, добавьте сотрудников и отмечайте часы по датам.</p></div>');
      return;
    }
    root.insertAdjacentHTML('beforeend', '<button class="ts-text-button ts-back-objects" type="button" data-ts-back>← К объектам</button>');
    if (selectedDate < current.startDate) selectedDate = current.startDate;
    const completed = current.days[selectedDate]?.status === 'completed';
    const relevant = current.employees.filter((employee) => availableOn(employee, selectedDate) || current.days[selectedDate]?.entries[employee.id]?.hours > 0);
    const active = relevant.filter((employee) => !employee.dismissed);
    const former = current.employees.filter((employee) => employee.dismissed);
    const dayPeople = relevant.filter((employee) => current.days[selectedDate]?.entries[employee.id]?.hours > 0);
    root.insertAdjacentHTML('beforeend', `<section class="ts-object"><div class="ts-selected-object"><h2>${escape(current.objectName)}</h2><p>${escape(current.projectName)}</p></div><p>Начало работ: ${dateText(current.startDate)}</p></section><div class="ts-layout"><aside>${calendarMarkup(current)}<p class="ts-storage-note">Табели сохраняются в этом браузере, отдельно для вашего аккаунта. На другие устройства автоматически не переносятся.</p></aside><div class="ts-workspace"><div class="ts-day-head"><div><h2>${dateText(selectedDate)}</h2><span class="ts-status ${completed ? 'is-completed' : ''}">${completed ? '✓ День завершён' : current.days[selectedDate] ? 'Черновик сохранён' : 'День не заполнен'}</span></div>${field('Перейти к дате', 'selectedDate', 'date', selectedDate, `data-ts-jump required min="${current.startDate}" max="${today()}"`)}</div><div class="ts-actions"><button class="outline-button" type="button" data-ts-add>${plus} Добавить сотрудника</button><button class="outline-button" type="button" data-ts-pay>Выплатить зарплату</button><button class="ts-text-button" type="button" data-ts-history>История сотрудника</button></div><div class="ts-filters"><label><input type="checkbox" data-ts-show ${showFormer ? 'checked' : ''}>Показать всех работавших сотрудников</label><label><input type="checkbox" data-ts-hide ${!showFormer ? 'checked' : ''}>Скрыть уволенных сотрудников</label></div>${completed && dayPeople.length ? `<p class="ts-note">Работали: ${dayPeople.map((employee) => escape(employee.name)).join(', ')}.</p>` : ''}${completed && !dayPeople.length ? '<p class="ts-note">В этот день никто не работал.</p>' : ''}<div class="ts-people">${active.map((employee) => employeeCard(current, employee)).join('')}${!active.length ? '<p class="ts-note">На выбранную дату активных сотрудников нет.</p>' : ''}</div>${former.length ? `<details class="ts-former" ${showFormer ? 'open' : ''}><summary>Уволенные сотрудники <span>${former.length}</span></summary><p class="ts-note">История и начисления сохранены. Сотрудника можно восстановить.</p>${former.map((employee) => employeeCard(current, employee)).join('')}</details>` : ''}<footer class="ts-day-footer"><div><span>Итого за выбранный день</span><strong data-ts-day-total></strong><small data-ts-day-count></small></div><button class="primary-button" type="button" data-ts-finish>${completed ? 'Редактировать день' : 'Завершить день'}</button></footer><p class="ts-note">«Дней по датам» — число дат с часами от начала работ до выбранной даты. Неполный рабочий день оплачивается пропорционально часам.</p><div class="ts-cumulative" data-ts-cumulative></div></div></div>`);
    updateNumbers();
  }
  function updateNumbers() {
    const current = sheet();
    const day = current.days[selectedDate];
    for (const card of $$('[data-ts-person]')) {
      $('[data-ts-salary]', card).textContent = money(entryAmount(day?.entries[card.dataset.tsPerson]));
      $('[data-ts-worked-days]', card).textContent = workedDays(current, card.dataset.tsPerson, selectedDate);
    }
    const entries = Object.values(day?.entries || {});
    $('[data-ts-day-total]').textContent = money(entries.reduce((total, entry) => total + entryAmount(entry), 0));
    $('[data-ts-day-count]').textContent = `${entries.filter((entry) => entry.hours > 0).length} чел. · ${entries.reduce((total, entry) => total + entry.hours, 0)} ч`;
    const totals = current.employees.map((employee) => periodSummary(current, employee.id, current.startDate, selectedDate));
    const total = (key) => totals.reduce((sum, entry) => sum + entry[key], 0);
    $('[data-ts-cumulative]').innerHTML = `<span>За завершённые дни до ${dateText(selectedDate)}</span><div><p>Начислено <strong>${money(total('gross'))}</strong></p><p>Штрафы <strong>${money(total('deducted'))}</strong></p><p>Выплачено <strong>${money(total('paid'))}</strong></p><p>Остаток <strong>${money(total('remaining'))}</strong></p></div>`;
  }
  root.addEventListener('input', (event) => {
    const input = event.target.closest('[data-ts-hours]');
    if (!input || !input.validity.valid) return;
    try {
      changeSheet((current) => saveDraft(current, selectedDate, { [input.dataset.tsHours]: input.value }));
      $('[data-ts-error]').hidden = true;
      $('.ts-status').textContent = 'Черновик сохранён';
      updateNumbers();
    } catch (error) { errorMessage(error); }
  });
  root.addEventListener('toggle', (event) => {
    if (!event.target.matches('.ts-former')) return;
    showFormer = event.target.open;
    $('[data-ts-show]').checked = showFormer;
    $('[data-ts-hide]').checked = !showFormer;
  }, true);
  root.addEventListener('change', (event) => {
    try {
      guardInputs();
      if (event.target.matches('[data-ts-jump]')) {
        if (!event.target.reportValidity() || !validDate(event.target.value)) return;
        selectedDate = event.target.value; calendarMonth = selectedDate.slice(0, 7); render();
      }
      if (event.target.matches('[data-ts-show]')) { showFormer = event.target.checked; render(); }
      if (event.target.matches('[data-ts-hide]')) { showFormer = !event.target.checked; render(); }
    } catch (error) { errorMessage(error); }
  });
  root.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    try {
      guardInputs();
      if (button.dataset.tsOpen) {
        selectedId = button.dataset.tsOpen;
        selectedDate = today(); calendarMonth = selectedDate.slice(0, 7); showFormer = false;
        render();
      }
      if (button.hasAttribute('data-ts-back')) { selectedId = null; render(); }
      if (button.hasAttribute('data-ts-create')) createDialog();
      if (button.hasAttribute('data-ts-add')) addEmployeeDialog();
      if (button.hasAttribute('data-ts-pay')) paymentDialog();
      if (button.hasAttribute('data-ts-history')) historyDialog();
      if (button.dataset.tsFine) fineDialog(button.dataset.tsFine);
      if (button.dataset.tsEmployment) {
        const employee = sheet().employees.find((item) => item.id === button.dataset.tsEmployment);
        changeSheet((current) => setEmployment(current, employee.id, !employee.dismissed, selectedDate));
        render();
      }
      if (button.dataset.tsDate) { selectedDate = button.dataset.tsDate; render(); }
      if (button.dataset.tsMonth) {
        const [year, month] = calendarMonth.split('-').map(Number);
        const next = new Date(year, month - 1 + Number(button.dataset.tsMonth), 1);
        calendarMonth = `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, '0')}`;
        render();
      }
      if (button.hasAttribute('data-ts-finish')) {
        const completed = sheet().days[selectedDate]?.status === 'completed';
        const hours = checkedHours();
        changeSheet((current) => {
          if (completed) reopenDay(current, selectedDate);
          else { saveDraft(current, selectedDate, hours); completeDay(current, selectedDate); }
        });
        render();
      }
    } catch (error) { errorMessage(error); }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === store.key) errorMessage(new Error('Табель изменён в другой вкладке. Обновите страницу, чтобы продолжить.'));
  });
  const panel = root.closest('[data-panel="timesheet"]');
  if (panel) new MutationObserver(() => {
    if (!panel.hidden) { selectedId = null; render(); }
  }).observe(panel, { attributes: true, attributeFilter: ['hidden'] });
  render();
}
