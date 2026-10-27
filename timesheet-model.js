// Amounts are stored as integer kopecks. Payroll only uses completed days.
export const TIMESHEET_VERSION = 1;
const clone = (value) => JSON.parse(JSON.stringify(value));
const id = () => globalThis.crypto.randomUUID();
const now = () => new Date().toISOString();
export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || '') && !Number.isNaN(Date.parse(`${value}T12:00:00Z`)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
}
function checkDate(value) { if (!validDate(value)) throw new Error('Выберите корректную дату.'); return value; }
function text(value, max = 180) {
  const result = String(value || '').trim().replace(/\s+/g, ' ');
  if (!result || result.length > max) throw new Error(`Заполните поле: не более ${max} символов.`);
  return result;
}
export function moneyInput(value) {
  const number = String(value).trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(number) || Number(number) > 100000000) throw new Error('Введите сумму от 0 до 100 000 000, не более двух знаков после запятой.');
  return Math.round(Number(number) * 100);
}
function whole(value, min, max) {
  if (String(value).trim() === '' || !Number.isInteger(Number(value)) || Number(value) < min || Number(value) > max) throw new Error(`Введите целое число часов от ${min} до ${max}.`);
  return Number(value);
}
const audit = (sheet, kind, employeeId, data = {}) => sheet.history.push({ id: id(), at: now(), kind, employeeId, ...data });
const getEmployee = (sheet, employeeId) => {
  const employee = sheet.employees.find((item) => item.id === employeeId);
  if (!employee) throw new Error('Сотрудник не найден.');
  return employee;
};
function dayDate(sheet, date) {
  checkDate(date);
  if (date < sheet.startDate || date > today()) throw new Error('Дата должна быть между началом работ и сегодняшним днём.');
}
export function availableOn(employee, date) {
  return employee.periods.some((period) => period.from <= date && (!period.to || date <= period.to));
}
export const entryAmount = (entry) => entry ? Math.round(entry.hours * entry.rateCents / entry.dayHours) : 0;
export function addEmployee(sheet, input, date) {
  dayDate(sheet, date);
  const rateCents = moneyInput(input.rate);
  if (!rateCents) throw new Error('Ставка должна быть больше нуля.');
  const employee = { id: id(), name: text(input.name), dayHours: whole(input.dayHours, 1, 24), rateCents, createdAt: now(), dismissed: false, periods: [{ from: date, to: null }] };
  sheet.employees.push(employee);
  audit(sheet, 'added', employee.id, { date, name: employee.name, rateCents, dayHours: employee.dayHours });
  return employee;
}
export function createSheet(input) {
  const startDate = checkDate(input.startDate);
  if (startDate > today()) throw new Error('Дата начала работ не может быть позже сегодняшней.');
  const sheet = { id: id(), objectName: text(input.objectName), projectName: text(input.projectName), startDate, createdAt: now(), employees: [], days: {}, fines: [], payments: [], history: [] };
  if (!input.employees?.length) throw new Error('Добавьте хотя бы одного сотрудника.');
  for (const employee of input.employees) addEmployee(sheet, employee, startDate);
  return sheet;
}
export function setEmployment(sheet, employeeId, dismissed, date) {
  dayDate(sheet, date);
  const employee = getEmployee(sheet, employeeId);
  if (employee.dismissed === dismissed) return;
  const last = employee.periods.at(-1);
  if (date < (last.to || last.from)) throw new Error('Выберите дату не раньше последнего приёма или увольнения сотрудника.');
  if (dismissed) {
    if (Object.entries(sheet.days).some(([key, day]) => key > date && day.entries[employeeId]?.hours > 0)) throw new Error('У сотрудника есть часы после этой даты. Выберите более позднюю дату увольнения.');
    last.to = date;
  } else employee.periods.push({ from: date, to: null });
  employee.dismissed = dismissed;
  audit(sheet, dismissed ? 'dismissed' : 'restored', employeeId, { date });
}
export function saveDraft(sheet, date, hours) {
  dayDate(sheet, date);
  const previous = sheet.days[date];
  if (previous?.status === 'completed') throw new Error('Сначала нажмите «Редактировать день».');
  const entries = { ...(previous?.entries || {}) };
  for (const [employeeId, value] of Object.entries(hours)) {
    const employee = getEmployee(sheet, employeeId);
    const count = whole(value === '' ? 0 : value, 0, 24);
    if (!availableOn(employee, date) && count > 0) throw new Error('Дата выходит за период работы сотрудника.');
    const old = entries[employeeId];
    entries[employeeId] = { hours: count, dayHours: old?.dayHours || employee.dayHours, rateCents: old?.rateCents ?? employee.rateCents };
  }
  sheet.days[date] = { ...previous, entries, status: 'draft', updatedAt: now() };
}
export function completeDay(sheet, date) {
  dayDate(sheet, date);
  const day = sheet.days[date];
  if (!day) throw new Error('Сначала введите часы.');
  if (day.status === 'completed') return;
  for (const [employeeId, entry] of Object.entries(day.entries)) {
    const before = day.lastCompletedEntries?.[employeeId];
    if (entry.hours || before?.hours) audit(sheet, 'accrual', employeeId, { date, hours: entry.hours, amountCents: entryAmount(entry), previousAmountCents: before ? entryAmount(before) : null, rateCents: entry.rateCents, dayHours: entry.dayHours });
  }
  day.status = 'completed';
  day.completedAt = now();
  day.lastCompletedEntries = clone(day.entries);
}
export function reopenDay(sheet, date) {
  const day = sheet.days[date];
  if (day?.status !== 'completed') throw new Error('Этот день ещё не завершён.');
  day.status = 'draft';
  audit(sheet, 'reopened', null, { date });
}
export function addFine(sheet, input) {
  getEmployee(sheet, input.employeeId);
  dayDate(sheet, input.date);
  const amountCents = moneyInput(input.amount);
  if (!amountCents) throw new Error('Сумма штрафа должна быть больше нуля.');
  const fine = { id: id(), employeeId: input.employeeId, date: input.date, amountCents, comment: text(input.comment, 1000), createdAt: now() };
  sheet.fines.push(fine);
  audit(sheet, 'fine', input.employeeId, { date: fine.date, amountCents, comment: fine.comment, fineId: fine.id });
  return fine;
}
export function periodSummary(sheet, employeeId, from, to) {
  checkDate(from); checkDate(to);
  if (from > to) throw new Error('Начало периода должно быть не позже окончания.');
  const within = (date) => date >= from && date <= to;
  const rows = Object.entries(sheet.days).filter(([date, day]) => within(date) && day.status === 'completed' && day.entries[employeeId]?.hours > 0);
  const gross = rows.reduce((total, [, day]) => total + entryAmount(day.entries[employeeId]), 0);
  const fines = sheet.fines.filter((fine) => fine.employeeId === employeeId && within(fine.date));
  const deducted = fines.reduce((total, fine) => total + fine.amountCents, 0);
  const paid = sheet.payments.filter((payment) => payment.employeeId === employeeId).reduce((total, payment) => total + Object.entries(payment.allocations).reduce((sum, [date, amount]) => sum + (within(date) ? amount : 0), 0), 0);
  return { gross, deducted, paid, remaining: gross - deducted - paid, days: rows.length, hours: rows.reduce((sum, [, day]) => sum + day.entries[employeeId].hours, 0), fines };
}
export function addPayment(sheet, input) {
  getEmployee(sheet, input.employeeId);
  if (input.from < sheet.startDate || input.to > today()) throw new Error('Выберите период между началом работ и сегодняшним днём.');
  const summary = periodSummary(sheet, input.employeeId, input.from, input.to);
  if (Object.entries(sheet.days).some(([date, day]) => date >= input.from && date <= input.to && day.status !== 'completed' && (day.entries[input.employeeId]?.hours > 0 || day.lastCompletedEntries?.[input.employeeId]?.hours > 0))) throw new Error('Сначала завершите или сохраните редактируемые дни выбранного периода.');
  const amountCents = moneyInput(input.amount);
  if (!amountCents) throw new Error('Введите сумму выплаты больше нуля.');
  const allocations = {};
  let remaining = amountCents;
  // Allocate to dates, not opaque ranges: overlapping periods never double count a payment.
  for (const date of Object.keys(sheet.days).sort().filter((key) => key >= input.from && key <= input.to)) {
    const debt = Math.max(0, periodSummary(sheet, input.employeeId, date, date).remaining);
    const amount = Math.min(debt, remaining);
    if (amount) allocations[date] = amount;
    remaining -= amount;
  }
  if (remaining) allocations[input.to] = (allocations[input.to] || 0) + remaining;
  const comment = String(input.comment || '').trim();
  if (comment.length > 1000) throw new Error('Комментарий: не более 1000 символов.');
  const payment = { id: id(), employeeId: input.employeeId, from: input.from, to: input.to, amountCents, comment, allocations, createdAt: now(), summary };
  sheet.payments.push(payment);
  audit(sheet, 'payment', input.employeeId, { from: payment.from, to: payment.to, amountCents, comment });
  return payment;
}
export function workedDays(sheet, employeeId, through) {
  return Object.entries(sheet.days).filter(([date, day]) => date <= through && day.entries[employeeId]?.hours > 0).length;
}
export function createTimesheetStore(storage, ownerId) {
  if (!ownerId || ownerId === 'local') throw new Error('Войдите в личный кабинет, чтобы открыть табели.');
  const key = `structos-timesheets-v1:${ownerId}`;
  function read() {
    const raw = storage.getItem(key);
    if (!raw) return { version: TIMESHEET_VERSION, ownerId, revision: 0, sheets: [] };
    let value;
    try { value = JSON.parse(raw); } catch { throw new Error('Не удалось прочитать сохранённые табели. Данные не перезаписаны.'); }
    if (value.version !== TIMESHEET_VERSION || value.ownerId !== ownerId || !Array.isArray(value.sheets)) throw new Error('Формат сохранённых табелей не поддерживается. Данные не изменены.');
    return value;
  }
  let state = read();
  return {
    key,
    read: () => clone(state),
    reload() { state = read(); return clone(state); },
    change(update) {
      const latest = read();
      if (latest.revision !== state.revision) throw new Error('Табель изменён в другой вкладке. Обновите страницу перед сохранением.');
      const next = clone(state);
      update(next);
      next.revision++;
      next.updatedAt = now();
      try { storage.setItem(key, JSON.stringify(next)); }
      catch { throw new Error('Не удалось сохранить данные на устройстве. Проверьте свободное место.'); }
      state = next;
      return clone(state);
    }
  };
}
