import test from 'node:test';
import assert from 'node:assert/strict';
import {weekStart,weekDates,totals,newWeek} from '../timesheet2.js';
test('weeks begin on Monday, including year boundaries',()=>{assert.equal(weekStart('2026-11-08'),'2026-11-02');assert.equal(weekStart('2027-01-01'),'2026-12-28');assert.equal(weekDates('2026-12-28')[6],'2027-01-03');});
test('weekly pay includes partial days and overtime without changing prior weeks',()=>{const row={name:'Иван',rateCents:700000,norm:8,hours:[8,4,0,'',10,0,0]};assert.deepEqual(totals(row),{days:3,hours:22,pay:1925000});const week=newWeek({rows:[row]});assert.equal(totals(week.rows[0]).pay,0);week.rows[0].rateCents=900000;assert.equal(totals(row).pay,1925000);});
