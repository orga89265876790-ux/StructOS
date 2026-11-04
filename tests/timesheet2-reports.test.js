import test from 'node:test';
import assert from 'node:assert/strict';
import {reportsForWeek} from '../timesheet2-reports.js';
test('photos follow selected week, regardless of capture or upload date',()=>{
 const records=[{id:'a',week:'2026-10-26',createdAt:'2026-11-04T10:00:00Z'},{id:'b',week:'2026-11-02',createdAt:'2026-11-04T11:00:00Z'}];
 for(const kind of ['work','people']){assert.deepEqual(reportsForWeek(records,kind,'2026-10-26'),[records[0]]);assert.deepEqual(reportsForWeek(records,kind,'2026-11-02'),[records[1]]);assert.deepEqual(reportsForWeek(records,kind,'2026-11-09'),[]);}
 assert.equal(records.length,2);
});
test('tools and projects remain visible across weeks with original creation dates',()=>{
 const records=[{id:'a',week:'2026-10-26',createdAt:'2026-11-04T10:00:00Z'}];
 for(const kind of ['tools','project'])for(const week of ['2026-10-19','2026-11-09'])assert.deepEqual(reportsForWeek(records,kind,week),records);
});

import {validateMediaBatch} from '../timesheet2-reports.js';
test('media selection accepts 1–15 photos and videos, rejects empty, excess and other files',()=>{
 const photo=new Blob(['photo'],{type:'image/png'}),video=new Blob(['video'],{type:'video/mp4'});
 assert.doesNotThrow(()=>validateMediaBatch([photo]));assert.doesNotThrow(()=>validateMediaBatch([...Array(14).fill(photo),video]));
 assert.throws(()=>validateMediaBatch([]));assert.throws(()=>validateMediaBatch(Array(16).fill(photo)));assert.throws(()=>validateMediaBatch([new Blob(['pdf'],{type:'application/pdf'})]));
});
