import test from 'node:test';
import assert from 'node:assert/strict';
import {weekStart,weekDates,totals,newWeek} from '../timesheet2.js';
test('weeks begin on Monday, including year boundaries',()=>{assert.equal(weekStart('2026-11-08'),'2026-11-02');assert.equal(weekStart('2027-01-01'),'2026-12-28');assert.equal(weekDates('2026-12-28')[6],'2027-01-03');});
test('weekly pay includes partial days and overtime without changing prior weeks',()=>{const row={name:'Иван',rateCents:700000,norm:8,hours:[8,4,0,'',10,0,0]};assert.deepEqual(totals(row),{days:3,hours:22,pay:1925000});const week=newWeek({rows:[row]});assert.equal(totals(week.rows[0]).pay,0);week.rows[0].rateCents=900000;assert.equal(totals(row).pay,1925000);});

import {carryRoster,weekSummary} from '../timesheet2.js';
test('late additions appear in already-created future weeks without losing hours or duplicating staff',()=>{
 const a={id:'a',name:'Иван',position:'Монтажник',rateCents:700000,norm:8,hours:[8,4,'','','','','']};
 const b={...a,id:'b',name:'Пётр',hours:Array(7).fill('')};
 const weeks={'2026-11-02':{rows:[a,b]},'2026-11-09':{rows:[{...a,hours:[6,'','','','','','']}]}};
 const merged=carryRoster(weeks,'2026-11-09');assert.equal(merged.rows.length,2);assert.equal(merged.rows[0].hours[0],6);assert.deepEqual(merged.rows[1].hours,Array(7).fill(''));
 weeks['2026-11-09']=merged;assert.equal(carryRoster(weeks,'2026-11-09').rows.length,2);
 assert.equal(weeks['2026-11-02'].rows[0].hours[0],8);
});
test('weekly headcount counts each marked person once and ignores unmarked employees',()=>{
 const row={id:'a',name:'Иван',rateCents:700000,norm:8,hours:[8,4,0,'',0,0,0]};
 const result=weekSummary([row,{...row,id:'b',hours:Array(7).fill('')}]);
 assert.equal(result.people,1);assert.equal(result.days,2);assert.equal(result.hours,12);assert.equal(result.pay,1050000);assert.deepEqual(result.daily,[1,1,0,0,0,0,0]);
});
