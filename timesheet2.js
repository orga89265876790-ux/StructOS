const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cash = n => new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB'}).format(n/100);
export function dateKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
export function weekStart(value) { const d=new Date(value+'T12:00:00'); if(Number.isNaN(+d)) throw Error('Выберите дату'); d.setDate(d.getDate()-(d.getDay()+6)%7); return dateKey(d); }
export function weekDates(start) { return Array.from({length:7},(_,i)=>{const d=new Date(start+'T12:00:00');d.setDate(d.getDate()+i);return dateKey(d);}); }
export function totals(row) { const hours=row.hours.reduce((a,b)=>a+Number(b||0),0);return {hours,days:row.hours.filter(h=>Number(h)>0).length,pay:row.hours.reduce((sum,h)=>sum+Math.round(Number(h||0)*row.rateCents/row.norm),0)}; }
const blank = () => ({id:crypto.randomUUID(),name:'',position:'',rateCents:0,norm:8,hours:Array(7).fill('')});
export function newWeek(previous) { return {rows:previous?.rows.length ? previous.rows.map(r=>({...r,hours:Array(7).fill('')})) : [blank()]}; }
export function carryRoster(weeks, start) {
 const people = new Map();
 Object.keys(weeks).filter(d=>d<start).sort().forEach(date=>weeks[date].rows.forEach(row=>{if(row.name.trim())people.set(row.id,row);}));
 const rows = (weeks[start]?.rows || []).map(row=>({...row,hours:[...row.hours]}));
 for(const person of people.values()) {
  const existing=rows.find(row=>row.id===person.id);
  if(!existing) rows.push({...person,hours:Array(7).fill('')});
  else if(!existing.name.trim() && !existing.hours.some(h=>Number(h)>0)) Object.assign(existing,{name:person.name,position:person.position,rateCents:person.rateCents,norm:person.norm});
 }
 const meaningful=rows.filter(r=>r.name.trim()||r.position.trim()||r.rateCents||r.hours.some(h=>Number(h)>0));
 return {...weeks[start],rows:meaningful.length?meaningful:(rows.length?rows:[blank()])};
}
export function weekSummary(rows) {
 const marked=rows.filter(r=>r.hours.some(h=>Number(h)>0));
 return {people:new Set(marked.map(r=>r.id)).size,days:rows.reduce((s,r)=>s+totals(r).days,0),hours:rows.reduce((s,r)=>s+totals(r).hours,0),pay:rows.reduce((s,r)=>s+totals(r).pay,0),daily:Array.from({length:7},(_,i)=>new Set(rows.filter(r=>Number(r.hours[i])>0).map(r=>r.id)).size)};
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
 function save(){const form=$('[data-t2-form]');if(!form)return;if(!form.reportValidity())throw Error('Проверьте поля: часы — целое число от 0 до 24, норма — от 1 до 24.');const rows=[...form.querySelectorAll('tbody tr')].map(tr=>({id:tr.dataset.row,name:tr.querySelector('[name=name]').value.trim(),position:tr.querySelector('[name=position]').value.trim(),rateCents:Math.round(Number(tr.querySelector('[name=rate]').value||0)*100),norm:Number(tr.querySelector('[name=norm]').value),hours:[...tr.querySelectorAll('[data-hour]')].map(i=>i.value===''?'':Number(i.value))}));change(next=>{next.objects.find(o=>o.id===objectId).weeks[monday]={rows};});$('[data-t2-status]').textContent='Сохранено';$('[data-t2-status]').classList.remove('t2-error');updateTotals();}
 function ensureWeek(start){const merged=carryRoster(object().weeks,start);if(JSON.stringify(object().weeks[start])===JSON.stringify(merged))return;change(next=>{next.objects.find(o=>o.id===objectId).weeks[start]=merged;});}
 function updateTotals(){const week=object()?.weeks?.[monday];if(!week)return;let days=0,hours=0,pay=0;week.rows.forEach(r=>{const t=totals(r),tr=$(`[data-row="${r.id}"]`);if(tr){tr.querySelector('[data-days]').textContent=t.days;tr.querySelector('[data-hours]').textContent=t.hours;tr.querySelector('[data-pay]').textContent=cash(t.pay);}days+=t.days;hours+=t.hours;pay+=t.pay;});const summary=weekSummary(week.rows);$('[data-total]').textContent=`Итого: отмечено людей — ${summary.people} · общая зарплата — ${cash(summary.pay)}`;
 $('[data-t2-people]').textContent=summary.people;
 root.querySelectorAll('[data-t2-daily]').forEach((cell,i)=>{cell.textContent=summary.daily[i]+' чел.';});
 $('[data-t2-total-days]').textContent=summary.days;$('[data-t2-total-hours]').textContent=summary.hours;$('[data-t2-total-pay]').textContent=cash(summary.pay);}
 function render(){const o=object();root.innerHTML=`<header class="t2-head"><h1>Табель 2</h1>${!o?'<button type="button" class="primary-button" data-t2-create>+ Создать объект</button>':'<button type="button" class="outline-button" data-t2-back>← К объектам</button>'}</header><p data-t2-status role="status" aria-live="polite"></p>`;
 if(!o){root.insertAdjacentHTML('beforeend',`<div class="t2-objects">${data.objects.map(o=>`<button type="button" data-t2-open="${o.id}"><strong>${esc(o.name)}</strong><span>${o.weeks?'Открыть табель →':'Создать табель →'}</span></button>`).join('')}</div>${!data.objects.length?'<p>Создайте объект, затем откройте его и создайте табель.</p>':''}<p class="t2-hint">Сохраняется в этом браузере, отдельно для вашего аккаунта.</p>`);return;}
 root.insertAdjacentHTML('beforeend',`<h2 class="t2-name">${esc(o.name)}</h2>`);
 if(!o.weeks){root.insertAdjacentHTML('beforeend','<button type="button" class="primary-button" data-t2-start>Создать табель</button>');return;}
 const dates=weekDates(monday),labels=['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
 root.insertAdjacentHTML('beforeend',`<div class="t2-week"><button type="button" class="outline-button" data-t2-shift="-7" aria-label="Предыдущая неделя">←</button><label>Неделя с понедельника<input type="date" data-t2-date value="${monday}"></label><span>${dates[0].split('-').reverse().join('.')} — ${dates[6].split('-').reverse().join('.')}</span><button type="button" class="outline-button" data-t2-shift="7" aria-label="Следующая неделя">→</button></div><p class="t2-hint">Ставка за полный день. Норма по умолчанию 8 ч — можно изменить у каждого сотрудника. Итоги — за выбранную неделю. Таблицу можно прокручивать вправо.</p><form data-t2-form><div class="t2-scroll" tabindex="0" aria-label="Табель за неделю"><table><thead><tr><th>№</th><th>ФИО</th><th>Должность</th><th>Ставка, ₽/день</th><th>Норма, ч/день</th>${dates.map((d,i)=>`<th>${labels[i]}<small>${d.slice(8)}.${d.slice(5,7)}</small></th>`).join('')}<th>Итого дней</th><th>Итого часов</th><th>Зарплата</th></tr></thead><tbody>${o.weeks[monday].rows.map((r,i)=>`<tr data-row="${r.id}"><td>${i+1}</td><td><input name="name" aria-label="ФИО, строка ${i+1}" maxlength="180" value="${esc(r.name)}" placeholder="ФИО"></td><td><input name="position" aria-label="Должность, строка ${i+1}" maxlength="120" value="${esc(r.position)}" placeholder="Должность"></td><td><input name="rate" aria-label="Ставка, строка ${i+1}" type="number" min="0" max="100000000" step="0.01" inputmode="decimal" value="${r.rateCents?r.rateCents/100:''}"></td><td><input name="norm" aria-label="Норма часов, строка ${i+1}" type="number" required min="1" max="24" step="1" value="${r.norm}"></td>${r.hours.map((h,j)=>`<td><input data-hour="${j}" type="number" min="0" max="24" step="1" inputmode="numeric" aria-label="${labels[j]}, часы, строка ${i+1}" value="${h}"></td>`).join('')}<td data-days></td><td data-hours></td><td data-pay></td></tr>`).join('')}</tbody><tfoot><tr><th colspan="5" scope="row">Итого · отмечено людей: <span data-t2-people>0</span></th>${labels.map((label)=>`<td data-t2-daily aria-label="${label}: количество отмеченных людей">0 чел.</td>`).join('')}<td data-t2-total-days>0</td><td data-t2-total-hours>0</td><td data-t2-total-pay>0 ₽</td></tr></tfoot></table></div><footer><button type="button" class="outline-button" data-t2-add>+ Добавить строку</button><strong data-total></strong><button type="submit" class="primary-button">Сохранить табель</button></footer></form>`);updateTotals();
 }
 const dialog=document.createElement('dialog');dialog.className='t2-dialog';dialog.setAttribute('aria-label','Создать объект');document.body.append(dialog);
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;try{
 if(b.hasAttribute('data-t2-create')){dialog.innerHTML='<form><h2>Создать объект</h2><label>Название объекта<input name="name" required maxlength="180" autofocus></label><div><button type="button" class="outline-button" data-close>Отмена</button><button class="primary-button" type="submit">Создать</button></div><p role="alert"></p></form>';dialog.querySelector('[data-close]').onclick=()=>dialog.close();dialog.querySelector('form').onsubmit=e=>{e.preventDefault();try{const name=dialog.querySelector('input').value.trim();if(!name)throw Error('Введите название объекта');const id=crypto.randomUUID();change(next=>next.objects.push({id,name,weeks:null}));objectId=id;dialog.close();render();}catch(err){dialog.querySelector('p').textContent=err.message;}};dialog.showModal();}
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
