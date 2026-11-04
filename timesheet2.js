const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cash = n => new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB'}).format(n/100);
export function dateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function weekStart(value) { const d=new Date(value+'T12:00:00'); if(Number.isNaN(+d)) throw Error('Выберите дату'); d.setDate(d.getDate()-(d.getDay()+6)%7); return dateKey(d); }
export function weekDates(start) { return Array.from({length:7},(_,i)=>{const d=new Date(start+'T12:00:00');d.setDate(d.getDate()+i);return dateKey(d);}); }
export function totals(row) { const hours=row.hours.reduce((a,b)=>a+Number(b||0),0);return {hours,days:row.hours.filter(h=>Number(h)>0).length,pay:(row.extraCents||0)+row.hours.reduce((sum,h)=>sum+Math.round(Number(h||0)*row.rateCents/row.norm),0)}; }
export function settlement(row) { return totals(row).pay + (row.bonusCents||0) - (row.fineCents||0) - (row.paidCents||0); }
const resetWeek = r => ({...r,hours:Array(7).fill(''),fineCents:0,bonusCents:0,paidCents:0,extraCents:0,entries:[]});
const hasEntries = r => r.hours.some(h=>Number(h)>0)||r.fineCents||r.bonusCents||r.paidCents||r.extraCents;
const blank = () => ({id:crypto.randomUUID(),name:'',position:'',rateCents:0,norm:8,hours:Array(7).fill('')});
export function newWeek(previous) { return {rows:previous?.rows.length ? previous.rows.filter(r=>!r.dismissedOn).map(resetWeek) : [blank()]}; }
export function carryRoster(weeks, start, dismissals = {}, restorations = {}) {
 const people = new Map();
 Object.keys(weeks).filter(d=>d<start).sort().forEach(date=>weeks[date].rows.forEach(row=>{if(row.name.trim())people.set(row.id,row);}));
 const eligible = id => (!dismissals[id] || start<=weekStart(dismissals[id])) && (!restorations[id] || weekDates(start)[6]>=restorations[id]);
 const rows = (weeks[start]?.rows || []).filter(row=>eligible(row.id) || hasEntries(row) || !!restorations[row.id]).map(row=>({...row,hours:[...row.hours]}));
 for(const person of people.values()) {
  if(!eligible(person.id))continue;
  const existing=rows.find(row=>row.id===person.id);
  if(!existing) rows.push(resetWeek(person));
  else if(!existing.name.trim() && !existing.hours.some(h=>Number(h)>0)) Object.assign(existing,{name:person.name,position:person.position,rateCents:person.rateCents,norm:person.norm});
 }
 const meaningful=rows.filter(r=>r.name.trim()||r.position.trim()||r.rateCents||r.hours.some(h=>Number(h)>0));
 return {...weeks[start],rows:meaningful.length?meaningful:(rows.length?rows:[blank()])};
}
export function weekSummary(rows) {
 const marked=rows.filter(r=>r.hours.some(h=>Number(h)>0));
 return {people:new Set(marked.map(r=>r.id)).size,days:rows.reduce((s,r)=>s+totals(r).days,0),hours:rows.reduce((s,r)=>s+totals(r).hours,0),pay:rows.reduce((s,r)=>s+totals(r).pay,0),net:rows.reduce((s,r)=>s+settlement(r),0),fine:rows.reduce((s,r)=>s+(r.fineCents||0),0),bonus:rows.reduce((s,r)=>s+(r.bonusCents||0),0),paid:rows.reduce((s,r)=>s+(r.paidCents||0),0),daily:Array.from({length:7},(_,i)=>new Set(rows.filter(r=>Number(r.hours[i])>0).map(r=>r.id)).size)};
}
export function dayLocked(object, id, date) { return !!object.dismissals?.[id] || !!(object.restorations?.[id] && date<object.restorations[id]); }
export function addEntry(object, start, id, kind, cents) {
 if(!['extra','bonus','fine','paid'].includes(kind) || !Number.isSafeInteger(cents) || cents<=0 || cents>10000000000)throw Error('Введите положительную сумму до 100 000 000 ₽');
 if(dayLocked(object,id,weekDates(start)[6]))throw Error('Записи сотрудника закрыты. Сначала восстановите сотрудника и выберите неделю с даты восстановления.');
 const row=object.weeks[start]?.rows.find(r=>r.id===id);
 if(!row)throw Error('Сотрудника нет в выбранной неделе. Выберите нужную неделю.');
 row[kind+'Cents']=(row[kind+'Cents']||0)+cents;
 (row.entries??=[]).push({id:crypto.randomUUID(),kind,cents,createdAt:new Date().toISOString()});
}
export function setEmployment(object,id,restoreDate,today=dateKey(new Date())) {
 object.dismissals??={};object.restorations??={};object.employmentEvents??=[];
 if(restoreDate!==null){
  if(!object.dismissals[id])throw Error('Сотрудник уже работает');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(restoreDate)||dateKey(new Date(restoreDate+'T12:00:00'))!==restoreDate||restoreDate<object.dismissals[id])throw Error('Дата восстановления должна быть не раньше даты увольнения');
  object.restorations[id]=restoreDate;delete object.dismissals[id];
 }else{if(object.dismissals[id])throw Error('Сотрудник уже уволен');object.dismissals[id]=today;}
 object.employmentEvents.push({id,kind:restoreDate===null?'dismiss':'restore',date:restoreDate||today,createdAt:new Date().toISOString()});
}
export function mountTimesheet2(root, owner) {
 if(!root)return;
 if(!owner || owner==='local'){root.textContent='Войдите в кабинет для работы с табелем.';return;}
 const key='structos-timesheet2-v1:'+owner;
 let data,objectId=null,monday=weekStart(dateKey(new Date()));
 function read(){const raw=localStorage.getItem(key);if(!raw)return {version:1,revision:0,objects:[]};const value=JSON.parse(raw);if(value.version!==1||!Array.isArray(value.objects))throw Error('Не удалось прочитать табели. Сохранённые данные не изменены.');return value;}
 try{data=read();}catch(e){root.textContent=e.message;return;}
 const $=s=>root.querySelector(s);
 const object=()=>data.objects.find(o=>o.id===objectId);
 function change(fn){const latest=read();if(latest.revision!==data.revision)throw Error('Данные изменены в другой вкладке. Обновите страницу.');const next=structuredClone(data);fn(next);next.revision++;try{localStorage.setItem(key,JSON.stringify(next));}catch{throw Error('Не удалось сохранить. Проверьте свободное место на устройстве.');}data=next;}
 function fail(e){$('[data-t2-status]').textContent=e.message;$('[data-t2-status]').classList.add('t2-error');}
 function save(){const form=$('[data-t2-form]');if(!form)return;if(!form.reportValidity())throw Error('Проверьте поля: часы — целое число от 0 до 24, норма — от 1 до 24.');const rows=[...form.querySelectorAll('tbody tr')].map(tr=>({...object().weeks[monday].rows.find(r=>r.id===tr.dataset.row),id:tr.dataset.row,name:tr.querySelector('[name=name]').value.trim(),position:tr.querySelector('[name=position]').value.trim(),rateCents:Math.round(Number(tr.querySelector('[name=rate]').value||0)*100),norm:Number(tr.querySelector('[name=norm]').value),...Object.fromEntries(['fine','bonus','paid'].map(k=>[k+'Cents',Math.round(Number(tr.querySelector(`[name=${k}]`).value||0)*100)])),hours:[...tr.querySelectorAll('[data-hour]')].map(i=>i.value===''?'':Number(i.value))}));change(next=>{const o=next.objects.find(o=>o.id===objectId);o.weeks[monday]={rows:rows.map(r=>{const old=o.weeks[monday].rows.find(p=>p.id===r.id);if(dayLocked(o,r.id,weekDates(monday)[6]))return old;return {...r,...(dayLocked(o,r.id,monday)?{rateCents:old.rateCents,norm:old.norm}:{}),hours:r.hours.map((h,i)=>dayLocked(o,r.id,weekDates(monday)[i])?old.hours[i]:h)};})};});$('[data-t2-status]').textContent='Сохранено';$('[data-t2-status]').classList.remove('t2-error');updateTotals();}
 function ensureWeek(start){const merged=carryRoster(object().weeks,start,object().dismissals,object().restorations);if(JSON.stringify(object().weeks[start])===JSON.stringify(merged))return;change(next=>{next.objects.find(o=>o.id===objectId).weeks[start]=merged;});}
 function updateTotals(){const week=object()?.weeks?.[monday];if(!week)return;let days=0,hours=0,pay=0;week.rows.forEach(r=>{const t=totals(r),tr=$(`[data-row="${r.id}"]`);if(tr){tr.querySelector('[data-days]').textContent=t.days;tr.querySelector('[data-net]').textContent=cash(settlement(r));tr.querySelector('[data-pay]').textContent=cash(t.pay);}days+=t.days;hours+=t.hours;pay+=t.pay;});const summary=weekSummary(week.rows);$('[data-total]').textContent=`Итого: отмечено людей — ${summary.people} · зарплата — ${cash(summary.pay)} · итого начислено — ${cash(summary.net)}`;
 $('[data-t2-people]').textContent=summary.people;
 root.querySelectorAll('[data-t2-daily]').forEach((cell,i)=>{cell.textContent=summary.daily[i]+' чел.';});
 $('[data-t2-total-days]').textContent=summary.days;['fine','bonus','paid','net'].forEach(k=>$(`[data-t2-total-${k}]`).textContent=cash(summary[k]));$('[data-t2-total-pay]').textContent=cash(summary.pay);}
 function render(){const o=object();root.innerHTML=`<header class="t2-head"><h1>Табель 2</h1>${!o?'<button type="button" class="primary-button" data-t2-create>+ Создать объект</button>':'<button type="button" class="outline-button" data-t2-back>← К объектам</button>'}</header><p data-t2-status role="status" aria-live="polite"></p>`;
 if(!o){root.insertAdjacentHTML('beforeend',`<div class="t2-objects">${data.objects.map(o=>`<button type="button" data-t2-open="${o.id}"><strong>${esc(o.name)}</strong><span>${o.weeks?'Открыть табель →':'Создать табель →'}</span></button>`).join('')}</div>${!data.objects.length?'<p>Создайте объект, затем откройте его и создайте табель.</p>':''}<p class="t2-hint">Сохраняется в этом браузере, отдельно для вашего аккаунта.</p>`);return;}
 root.insertAdjacentHTML('beforeend',`<h2 class="t2-name">${esc(o.name)}</h2>`);
 if(!o.weeks){root.insertAdjacentHTML('beforeend','<button type="button" class="primary-button" data-t2-start>Создать табель</button>');return;}
 const dates=weekDates(monday),labels=['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
 root.insertAdjacentHTML('beforeend',`<div class="t2-week"><button type="button" class="outline-button" data-t2-shift="-7" aria-label="Предыдущая неделя">←</button><label>Неделя с понедельника<input type="date" data-t2-date value="${monday}"></label><span>${dates[0].split('-').reverse().join('.')} — ${dates[6].split('-').reverse().join('.')}</span><button type="button" class="outline-button" data-t2-shift="7" aria-label="Следующая неделя">→</button></div><p class="t2-hint">Ставка за полный день. Норма по умолчанию 8 ч — можно изменить у каждого сотрудника. Итого начислено = зарплата + премия − штраф − выплачено, за выбранную неделю. Таблицу можно прокручивать вправо.</p><form data-t2-form><div class="t2-scroll" tabindex="0" aria-label="Табель за неделю"><table><thead><tr><th>№</th><th>ФИО</th><th>Должность</th><th>Ставка, ₽/день</th><th>Норма, ч/день</th>${dates.map((d,i)=>`<th>${labels[i]}<small>${d.slice(8)}.${d.slice(5,7)}</small></th>`).join('')}<th>Итого дней</th><th>Штраф</th><th>Премия</th><th>Выплачено</th><th>Зарплата</th><th>Итого начислено</th></tr></thead><tbody>${o.weeks[monday].rows.slice().sort((a,b)=>Number(!!o.dismissals?.[a.id])-Number(!!o.dismissals?.[b.id])).map((r,i)=>`<tr data-row="${r.id}" class="${o.dismissals?.[r.id]?'t2-dismissed':''}"><td>${i+1}</td><td><input name="name" aria-label="ФИО, строка ${i+1}" maxlength="180" value="${esc(r.name)}" placeholder="ФИО">${o.dismissals?.[r.id]?`<small class="t2-dismiss-date">Уволен ${o.dismissals[r.id].split('-').reverse().join('.')}</small>`:''}</td><td><input name="position" aria-label="Должность, строка ${i+1}" maxlength="120" value="${esc(r.position)}" placeholder="Должность"></td><td><input name="rate" aria-label="Ставка, строка ${i+1}" type="number" min="0" max="100000000" step="0.01" inputmode="decimal" value="${r.rateCents?r.rateCents/100:''}"></td><td><input name="norm" aria-label="Норма часов, строка ${i+1}" type="number" required min="1" max="24" step="1" value="${r.norm}"></td>${r.hours.map((h,j)=>`<td class="${o.dismissals?.[r.id] && (Number(h)>0 || dates[j]>=o.dismissals[r.id])?'t2-dismiss-day':''}"><input data-hour="${j}" type="number" min="0" max="24" step="1" inputmode="numeric" aria-label="${labels[j]}, часы, строка ${i+1}" value="${h}"></td>`).join('')}<td data-days></td>${['fine','bonus','paid'].map((k,j)=>`<td><input name="${k}" aria-label="${['Штраф','Премия','Выплачено'][j]}, строка ${i+1}" type="number" min="0" max="100000000" step="0.01" inputmode="decimal" value="${r[k+'Cents']?r[k+'Cents']/100:''}"></td>`).join('')}<td data-pay></td><td data-net></td></tr>`).join('')}</tbody><tfoot><tr><th colspan="5" scope="row">Итого · отмечено людей: <span data-t2-people>0</span></th>${labels.map((label)=>`<td data-t2-daily aria-label="${label}: количество отмеченных людей">0 чел.</td>`).join('')}<td data-t2-total-days>0</td><td data-t2-total-fine>0 ₽</td><td data-t2-total-bonus>0 ₽</td><td data-t2-total-paid>0 ₽</td><td data-t2-total-pay>0 ₽</td><td data-t2-total-net>0 ₽</td></tr></tfoot></table></div><footer><button type="button" class="outline-button" data-t2-add>+ Добавить строку</button><button type="button" class="outline-button" data-t2-employee>Сотрудник</button><strong data-total></strong><button type="submit" class="primary-button">Сохранить табель</button></footer></form>`);o.weeks[monday].rows.forEach(r=>{const tr=$(`[data-row="${r.id}"]`),locked=dayLocked(o,r.id,dates[6]);tr.classList.toggle('t2-locked',locked);tr.querySelectorAll('input').forEach(input=>{const day=input.dataset.hour;input.disabled=day!==undefined?dayLocked(o,r.id,dates[Number(day)]):(['rate','norm'].includes(input.name)?dayLocked(o,r.id,dates[0]):locked);if(input.disabled)input.closest('td').classList.add('t2-locked-cell');});tr.querySelectorAll('[name=fine],[name=bonus],[name=paid]').forEach(input=>input.readOnly=true);});updateTotals();
 }
 const dialog=document.createElement('dialog');dialog.className='t2-dialog';dialog.setAttribute('aria-label','Создать объект');document.body.append(dialog);
 function openEmployee(){
 const o=object(),people=new Map();Object.keys(o.weeks).sort().forEach(start=>o.weeks[start].rows.forEach(r=>{if(r.name.trim())people.set(r.id,r);}));
 if(!people.size)throw Error('Сначала введите ФИО сотрудника в таблице.');
 dialog.setAttribute('aria-label','Сотрудник');
 dialog.innerHTML=`<form data-employee-form><h2>Сотрудник</h2><label>Выберите сотрудника<select name="employee">${[...people.values()].map(r=>`<option value="${r.id}">${esc(r.name)}${o.dismissals?.[r.id]?' — уволен':''}</option>`).join('')}</select></label><p class="t2-hint">Начисления добавляются к суммам недели ${monday.split('-').reverse().join('.')}.</p><label>Вид начисления<select name="kind"><option value="extra">Начисление к зарплате</option><option value="bonus">Премия</option><option value="fine">Штраф</option><option value="paid">Выплачено</option></select></label><label>Сумма, ₽<input name="amount" type="number" min="0.01" max="100000000" step="0.01" inputmode="decimal"></label><button type="button" class="outline-button" data-employment></button><label data-restore-label hidden>Восстановить с даты<input name="restoreDate" type="date"></label><p data-employee-state class="t2-hint"></p><p role="alert"></p><div><button type="button" class="outline-button" data-close>Отмена</button><button type="submit" class="primary-button">Сохранить</button></div></form>`;
 const form=dialog.querySelector('form'),employee=form.elements.employee;let employmentAction=false;
 const state=()=>{const dismissed=object().dismissals?.[employee.value];form.querySelector('[data-employment]').textContent=dismissed?'Восстановить сотрудника':'Уволить сотрудника';form.querySelector('[data-restore-label]').hidden=!(employmentAction&&dismissed);form.elements.restoreDate.required=!!(employmentAction&&dismissed);form.elements.restoreDate.min=dismissed||'';form.elements.kind.closest('label').hidden=employmentAction;form.elements.amount.closest('label').hidden=employmentAction;form.elements.kind.disabled=employmentAction;form.elements.amount.disabled=employmentAction;form.elements.amount.required=!employmentAction;form.querySelector('[data-employee-state]').textContent=employmentAction?(dismissed?'Укажите дату восстановления и нажмите «Сохранить».':'После сохранения сотрудник будет уволен сегодняшним числом. Все его прежние записи будут закрыты для редактирования.'):(dismissed?'Сотрудник уволен. Для новых записей восстановите его.':'Каждая сохранённая сумма прибавляется к предыдущим.');};
 employee.onchange=()=>{employmentAction=false;form.querySelector('[role=alert]').textContent='';state();};
 form.querySelector('[data-employment]').onclick=()=>{employmentAction=!employmentAction;state();};
 form.querySelector('[data-close]').onclick=()=>dialog.close();
 form.onsubmit=e=>{e.preventDefault();try{change(next=>{const o=next.objects.find(o=>o.id===objectId);if(employmentAction)setEmployment(o,employee.value,o.dismissals?.[employee.value]?form.elements.restoreDate.value:null);else addEntry(o,monday,employee.value,form.elements.kind.value,Math.round(Number(form.elements.amount.value)*100));});ensureWeek(monday);dialog.close();render();$('[data-t2-status]').textContent='Сохранено';}catch(err){form.querySelector('[role=alert]').textContent=err.message;}};
 state();dialog.showModal();
 }
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;try{
 if(b.hasAttribute('data-t2-employee')){save();openEmployee();}
 if(b.hasAttribute('data-t2-create')){dialog.setAttribute('aria-label','Создать объект');dialog.innerHTML='<form><h2>Создать объект</h2><label>Название объекта<input name="name" required maxlength="180" autofocus></label><div><button type="button" class="outline-button" data-close>Отмена</button><button class="primary-button" type="submit">Создать</button></div><p role="alert"></p></form>';dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.querySelector('form').onsubmit=e=>{e.preventDefault();try{const name=dialog.querySelector('input').value.trim();if(!name)throw Error('Введите название объекта');const id=crypto.randomUUID();change(next=>next.objects.push({id,name,weeks:null}));objectId=id;dialog.close();render();}catch(err){dialog.querySelector('p').textContent=err.message;}};dialog.showModal();}
 if(b.dataset.t2Open){objectId=b.dataset.t2Open;if(object().weeks)ensureWeek(monday);render();}
 if(b.hasAttribute('data-t2-back')){save();objectId=null;render();}
 if(b.hasAttribute('data-t2-start')){change(next=>next.objects.find(o=>o.id===objectId).weeks={[monday]:newWeek()});render();}
 if(b.hasAttribute('data-t2-add')){save();change(next=>next.objects.find(o=>o.id===objectId).weeks[monday].rows.push(blank()));render();}
 if(b.dataset.t2Shift){save();const d=new Date(monday+'T12:00:00');d.setDate(d.getDate()+Number(b.dataset.t2Shift));const next=dateKey(d);ensureWeek(next);monday=next;render();}
 }catch(err){fail(err);}});
 root.addEventListener('submit',e=>{if(e.target.matches('[data-t2-form]')){e.preventDefault();try{save();}catch(err){fail(err);}}});
 root.addEventListener('change',e=>{try{if(e.target.matches('[data-t2-date]')){save();const next=weekStart(e.target.value);ensureWeek(next);monday=next;render();}else if(e.target.closest('[data-t2-form]'))save();}catch(err){fail(err);}});
 root.addEventListener('input',e=>{if(e.target.closest('[data-t2-form]')){try{save();}catch(err){fail(err);}}});
 window.addEventListener('storage',e=>{if(e.key===key)fail(Error('Табель изменён в другой вкладке. Обновите страницу.'));});
 const panel=root.closest('[data-panel]');new MutationObserver(()=>{if(!panel.hidden){objectId=null;render();}}).observe(panel,{attributes:true,attributeFilter:['hidden']});render();
}
