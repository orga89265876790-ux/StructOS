import test from 'node:test';
import assert from 'node:assert/strict';
import { createSheet, addEmployee, setEmployment, saveDraft, completeDay, reopenDay, addFine, addPayment, periodSummary, workedDays, availableOn, entryAmount, createTimesheetStore, validDate } from '../timesheet-model.js';

const first = '2026-01-10';
const second = '2026-01-11';
const third = '2026-01-12';
function fixture() { return createSheet({ objectName: 'Курьяново', projectName: 'ЭОМ', startDate: first, employees: [{ name: 'Иванов Иван Иванович', dayHours: 8, rate: '7000' }] }); }
function finish(sheet, date, hours = 8) { saveDraft(sheet, date, { [sheet.employees[0].id]: hours }); completeDay(sheet, date); }
function summary(sheet, from = first, to = third) { return periodSummary(sheet, sheet.employees[0].id, from, to); }
const storage = () => { const map = new Map(); return { getItem: (key) => map.get(key) || null, setItem: (key, value) => map.set(key, value) }; };

test('partial days, overtime and integer kopeck rounding', () => {
  const s = fixture(); const eid = s.employees[0].id;
  finish(s, first, 4); finish(s, second, 10);
  assert.equal(summary(s).gross, 1225000);
  assert.equal(summary(s).days, 2);
  assert.equal(workedDays(s, eid, first), 1);
  assert.equal(entryAmount({ hours: 1, dayHours: 3, rateCents: 10000 }), 3333);
});
test('draft hours do not accrue until a day is completed, repeat completion is idempotent', () => {
  const s = fixture(); saveDraft(s, first, { [s.employees[0].id]: 8 });
  assert.equal(summary(s).gross, 0);
  completeDay(s, first); const events = s.history.length; completeDay(s, first);
  assert.equal(s.history.length, events); assert.equal(summary(s).gross, 700000);
  assert.throws(() => saveDraft(s, first, { [s.employees[0].id]: 4 }), /Редактировать/);
});
test('edits replace the accrual and retain the original amount in history', () => {
  const s = fixture(); finish(s, first); reopenDay(s, first); finish(s, first, 4);
  assert.equal(summary(s).gross, 350000);
  const last = s.history.at(-1); assert.equal(last.previousAmountCents, 700000); assert.equal(last.amountCents, 350000);
  reopenDay(s, first); finish(s, first, 0); assert.equal(summary(s).gross, 0); assert.equal(summary(s).days, 0);
});
test('fine is displayed and deducted once; partial payment is accounted', () => {
  const s = fixture(); const employeeId = s.employees[0].id; finish(s, first);
  addFine(s, { employeeId, date: first, amount: '500', comment: 'Опоздание' });
  addPayment(s, { employeeId, from: first, to: first, amount: '3000', comment: 'Карта' });
  assert.deepEqual([summary(s).gross, summary(s).deducted, summary(s).paid, summary(s).remaining], [700000, 50000, 300000, 350000]);
  assert.equal(summary(s).fines[0].comment, 'Опоздание');
  assert.ok(s.history.every((event) => event.id && event.at));
});
test('overlapping periods account for payments by actual work date', () => {
  const s = fixture(); const employeeId = s.employees[0].id; finish(s, first); finish(s, second);
  addPayment(s, { employeeId, from: first, to: second, amount: '9000' });
  assert.equal(summary(s, first, first).paid, 700000);
  assert.equal(summary(s, second, second).paid, 200000);
  addPayment(s, { employeeId, from: second, to: third, amount: '5000' });
  assert.equal(summary(s).remaining, 0);
});
test('overpayments and edits after payment retain paid amounts', () => {
  const s = fixture(); const employeeId = s.employees[0].id; finish(s, first);
  addPayment(s, { employeeId, from: first, to: first, amount: '8000' });
  assert.equal(summary(s).remaining, -100000);
  reopenDay(s, first); finish(s, first, 4);
  assert.equal(summary(s).remaining, -450000); assert.equal(summary(s).paid, 800000);
});
test('payment cannot be recorded while its work days are unfinished, including edits to zero', () => {
  const s = fixture(); const employeeId = s.employees[0].id; finish(s, first); reopenDay(s, first); saveDraft(s, first, { [employeeId]: 0 });
  assert.throws(() => addPayment(s, { employeeId, from: first, to: first, amount: 1 }), /завершите/);
});
test('dismissal preserves payroll, restoration enables later dates', () => {
  const s = fixture(); const employee = s.employees[0]; finish(s, first);
  setEmployment(s, employee.id, true, first);
  assert.equal(summary(s).gross, 700000); assert.equal(availableOn(employee, second), false);
  assert.throws(() => saveDraft(s, second, { [employee.id]: 8 }), /период/);
  setEmployment(s, employee.id, false, third); assert.equal(availableOn(employee, third), true);
  assert.equal(availableOn(employee, second), false); finish(s, third);
  assert.equal(summary(s).gross, 1400000);
});
test('cannot dismiss before previously recorded work or add hours before employee joined', () => {
  const s = fixture(); finish(s, third);
  assert.throws(() => setEmployment(s, s.employees[0].id, true, second), /часы после/);
  const employee = addEmployee(s, { name: 'Петров Пётр', dayHours: 10, rate: 5000 }, second);
  assert.throws(() => saveDraft(s, first, { [employee.id]: 5 }), /период/);
});
test('invalid hours, money, names and dates are rejected', () => {
  const s = fixture(); const eid = s.employees[0].id;
  for (const hours of [-1, 25, 2.5, 'bad']) assert.throws(() => saveDraft(s, first, { [eid]: hours }));
  for (const rate of ['-4', '0', '0.001', 'Infinity', 'abc']) assert.throws(() => addEmployee(s, { name: 'Имя', dayHours: 8, rate }, first));
  assert.equal(validDate('2026-02-30'), false);
  assert.throws(() => periodSummary(s, eid, third, first));
  assert.throws(() => saveDraft(s, '2026-01-01', { [eid]: 8 }));
  assert.throws(() => addFine(s, { employeeId: eid, date: first, amount: 50, comment: ' ' }));
});
test('rate and workday snapshots preserve historical salary', () => {
  const s = fixture(); finish(s, first);
  s.employees[0].rateCents = 900000; s.employees[0].dayHours = 10;
  reopenDay(s, first); finish(s, first, 4);
  assert.equal(summary(s).gross, 350000);
});
test('storage survives reload and is isolated by account', () => {
  const mem = storage(); const a = createTimesheetStore(mem, 'account-a'); a.change((data) => data.sheets.push(fixture()));
  assert.equal(createTimesheetStore(mem, 'account-a').read().sheets.length, 1);
  assert.equal(createTimesheetStore(mem, 'account-b').read().sheets.length, 0);
  assert.throws(() => createTimesheetStore(mem, 'local'));
});
test('concurrent tab writes do not silently overwrite newer records', () => {
  const mem = storage(); const a = createTimesheetStore(mem, 'a'); const b = createTimesheetStore(mem, 'a');
  a.change((data) => data.sheets.push(fixture()));
  assert.throws(() => b.change((data) => data.sheets.push(fixture())), /другой вкладке/);
  assert.equal(b.reload().sheets.length, 1);
});
test('failed storage writes do not mutate state; corrupt data is not overwritten', () => {
  const a = createTimesheetStore({ getItem: () => null, setItem: () => { throw Error('full'); } }, 'a');
  assert.throws(() => a.change((data) => data.sheets.push(fixture())), /сохранить/);
  assert.equal(a.read().sheets.length, 0);
  assert.throws(() => createTimesheetStore({ getItem: () => '{oops', setItem: () => assert.fail() }, 'a'), /перезаписаны/);
});
