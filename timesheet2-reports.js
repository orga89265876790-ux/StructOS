const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const titles = {work:'Фотоотчёт работ',people:'Фотоотчёт людей',project:'Проект',tools:'Инструмент'};
const stamp = value => new Date(value).toLocaleString('ru-RU', {dateStyle:'short',timeStyle:'medium'});
export function reportsForWeek(records,kind,week) { return kind==='work'||kind==='people'?records.filter(record=>record.week===week):records; }
let database;
function openDatabase() {
 if(database)return database;
 database=new Promise((resolve,reject)=>{
  const request=indexedDB.open('structos-timesheet2-reports-v1',1);
  request.onupgradeneeded=()=>{const store=request.result.createObjectStore('records',{keyPath:'id'});store.createIndex('scope','scope');};
  request.onsuccess=()=>{const db=request.result;db.onversionchange=()=>{db.close();database=null;};resolve(db);};
  request.onerror=()=>reject(Error('Не удалось открыть хранилище отчётов.'));
  request.onblocked=()=>reject(Error('Закройте другие вкладки StructOS и повторите.'));
 }).catch(error=>{database=null;throw error;});
 return database;
}
export async function reportRecords(scope) {
 const db=await openDatabase();return new Promise((resolve,reject)=>{const request=db.transaction('records').objectStore('records').index('scope').getAll(scope);request.onsuccess=()=>resolve(request.result.sort((a,b)=>a.createdAt.localeCompare(b.createdAt)));request.onerror=()=>reject(Error('Не удалось прочитать отчёты.'));});
}
export function validateMediaBatch(files) {
 if(!files.length||files.length>15)throw Error('Выберите от 1 до 15 фото или видео за один раз.');
 if(files.some(file=>!file.size||!(/^(image|video)\//.test(file.type))))throw Error('Можно добавить только фотографии и видео.');
}
export async function saveReport(record) { return saveReports([record]); }
export async function saveReports(records) {
 if(!records.length||records.length>15)throw Error('Можно сохранить от 1 до 15 файлов за один раз.');
 for(const record of records){
 if(!record.scope || !titles[record.kind])throw Error('Не выбран объект.');
 if(record.kind==='tools'){
  if(!record.name?.trim() || !Number.isSafeInteger(record.quantity) || record.quantity<=0)throw Error('Введите наименование и количество больше нуля.');
 }else{
  if(!(record.file instanceof Blob) || !record.file.size)throw Error('Добавьте файл.');
  if(record.kind==='work' && !(/^(image|video)\//.test(record.file.type)))throw Error('Выберите фото или видео.');
  if(record.kind==='people' && (!record.capturedAt || !record.comment?.trim()))throw Error('Сделайте фото и напишите комментарий.');
 }
 }
 const db=await openDatabase();return new Promise((resolve,reject)=>{const tx=db.transaction('records','readwrite');for(const record of records)tx.objectStore('records').add(record);tx.oncomplete=()=>resolve();tx.onerror=tx.onabort=()=>reject(Error('Не удалось сохранить. Возможно, на устройстве недостаточно места.'));});
}
export function openReportDialog({owner,objectId,objectName,week,kind}) {
 const scope=JSON.stringify([owner,objectId,kind]);
 const weekly=kind==='work'||kind==='people';
 const period=weekly?'Неделя с '+week.split('-').reverse().join('.'):'За всё время по объекту';
 const dialog=document.createElement('dialog');dialog.className='t2-dialog t2-report-dialog';dialog.setAttribute('aria-label',titles[kind]);
 dialog.innerHTML=`<header class="t2-report-head"><h2>${titles[kind]}</h2><button type="button" class="outline-button" data-close aria-label="Закрыть">×</button></header><p class="t2-hint">${escape(objectName)} · ${period}<br>Сохраняется на этом устройстве в браузере.</p><button type="button" class="primary-button" data-add-report>+ ${kind==='people'?'Сделать фото':'Добавить'}</button><p role="alert"></p><div data-editor></div><div data-records aria-live="polite"></div>`;
 document.body.append(dialog);
 const $=selector=>dialog.querySelector(selector);
 let stream=null,draft=null,busy=false,closed=false,cameraRequest=0;
 const urls=new Set();const urlFor=blob=>{const url=URL.createObjectURL(blob);urls.add(url);return url;};
 const stopCamera=()=>{cameraRequest++;stream?.getTracks().forEach(track=>track.stop());stream=null;};
 const error=reason=>{if(closed)return;$('[role=alert]').textContent=reason.message||'Не удалось выполнить действие.';};
 const clearEditor=()=>{stopCamera();draft=null;$('[data-editor]').replaceChildren();$('[data-add-report]').disabled=false;};
 function cleanup(){if(closed)return;closed=true;stopCamera();urls.forEach(url=>URL.revokeObjectURL(url));dialog.remove();}
 dialog.addEventListener('close',cleanup);
 $('[data-close]').onclick=()=>dialog.close();
 async function renderRecords(){
  const records=reportsForWeek(await reportRecords(scope),kind,week);if(closed)return;
  $('[data-records]').innerHTML=records.length?records.map((record,i)=>{
   if(kind==='tools')return `<article class="t2-report-record t2-tool-record"><span>${i+1}</span><div><strong>${escape(record.name)}</strong><small class="t2-tool-date">Добавлено: ${stamp(record.createdAt)}</small></div><span>${record.quantity} шт.</span></article>`;
   const url=urlFor(record.file),photo=kind!=='project',video=record.file.type.startsWith('video/');
   return `<article class="t2-report-record">${photo?(video?`<video controls playsinline preload="metadata" src="${url}" aria-label="Видеоотчёт"></video>`:`<a href="${url}" target="_blank" rel="noopener"><img src="${url}" alt="${escape(titles[kind])}" loading="lazy"></a>`):`<strong>${i+1}. ${escape(record.filename)}</strong>`}<small>${kind==='people'?'Снято':'Добавлено'}: ${stamp(record.capturedAt||record.createdAt)}</small>${record.comment?`<p>${escape(record.comment)}</p>`:''}<a href="${url}" download="${escape(record.filename)}">${photo?(video?'Скачать видео':'Скачать фото'):'Скачать проект'}</a></article>`;
  }).join(''):'<p class="t2-hint">Записей пока нет.</p>';
 }
 function editorForm(content){
  $('[data-editor]').innerHTML=`<form data-report-form>${content}<div class="t2-report-actions"><button type="button" class="outline-button" data-cancel>Отмена</button><button type="submit" class="primary-button">Сохранить</button></div></form>`;
  $('[data-cancel]').onclick=clearEditor;
  $('[data-report-form]').onsubmit=async event=>{
   event.preventDefault();if(busy)return;const form=event.currentTarget;if(!form.reportValidity())return;
   const record={id:crypto.randomUUID(),scope,kind,week,createdAt:new Date().toISOString()};
   if(kind==='tools'){record.name=form.elements.toolName.value.trim();record.quantity=Number(form.elements.quantity.value);}
   else{const file=kind==='people'?draft?.file:form.elements.file.files[0];Object.assign(record,{file,filename:kind==='people'?draft?.filename:file?.name,comment:form.elements.comment.value.trim(),capturedAt:kind==='people'?draft?.capturedAt:null});}
   busy=true;form.querySelector('[type=submit]').disabled=true;$('[role=alert]').textContent='';
   try{if(kind==='work'){const files=[...form.elements.file.files];validateMediaBatch(files);await saveReports(files.map(file=>({...record,id:crypto.randomUUID(),file,filename:file.name})));}else await saveReport(record);if(closed)return;clearEditor();await renderRecords();}
   catch(reason){if(!closed)error(reason);}
   finally{busy=false;if(form.isConnected)form.querySelector('[type=submit]').disabled=false;}
  };
 }
 async function startCamera(){
  if(!navigator.mediaDevices?.getUserMedia)throw Error('Камера недоступна. Откройте StructOS по HTTPS в браузере с доступом к камере.');
  const request=++cameraRequest;
  $('[data-editor]').innerHTML='<p class="t2-hint">Разрешите доступ к камере…</p><button type="button" class="outline-button" data-cancel>Отмена</button>';
  $('[data-cancel]').onclick=clearEditor;
  let nextStream;
  try{nextStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1920},height:{ideal:1080}},audio:false});}
  catch{if(request!==cameraRequest||closed)return;clearEditor();throw Error('Не удалось открыть камеру. Разрешите доступ к ней и нажмите «+ Сделать фото» ещё раз.');}
  if(closed||request!==cameraRequest){nextStream.getTracks().forEach(track=>track.stop());return;}
  stream=nextStream;
  $('[data-editor]').innerHTML='<video autoplay playsinline muted data-camera></video><div class="t2-report-actions"><button type="button" class="outline-button" data-cancel>Отмена</button><button type="button" class="primary-button" data-capture disabled>Сделать фото</button></div>';
  const video=$('[data-camera]');video.srcObject=stream;
  $('[data-cancel]').onclick=clearEditor;
  video.onloadeddata=()=>{if($('[data-capture]'))$('[data-capture]').disabled=false;};
  video.play().catch(()=>{if(!closed){clearEditor();error(Error('Не удалось запустить камеру. Повторите попытку.'));}});
  $('[data-capture]').onclick=async()=>{
   try{
    if(!video.videoWidth)throw Error('Подождите, пока камера будет готова.');
    $('[data-capture]').disabled=true;
    const capturedAt=new Date().toISOString(),canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;canvas.getContext('2d').drawImage(video,0,0);
    const file=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',0.9));
    if(closed||request!==cameraRequest)return;if(!file)throw Error('Не удалось сделать фото. Повторите попытку.');
    stopCamera();draft={file,capturedAt,filename:`people-${capturedAt.replace(/[:.]/g,'-')}.jpg`};
    editorForm(`<img class="t2-captured-photo" src="${urlFor(file)}" alt="Сделанный снимок"><small>Снято: ${stamp(capturedAt)}</small><label>Комментарий к фото<textarea name="comment" required maxlength="2000" rows="3" placeholder="Кто на фото, что зафиксировано"></textarea></label>`);
   }catch(reason){error(reason);if($('[data-capture]'))$('[data-capture]').disabled=false;}
  };
 }
 $('[data-add-report]').onclick=async()=>{
  $('[role=alert]').textContent='';$('[data-add-report]').disabled=true;
  try{
   if(kind==='people'){await startCamera();return;}
   if(kind==='tools')editorForm('<label>Наименование инструмента<input name="toolName" required maxlength="180" placeholder="Например, перфоратор"></label><label>Количество, шт.<input name="quantity" type="number" required min="1" max="1000000" step="1" inputmode="numeric" value="1"></label>');
   else editorForm(`<label>${kind==='work'?'Фото и видео — от 1 до 15 файлов':'Файл проекта'}<input name="file" type="file" required ${kind==='work'?'accept="image/*,video/*" multiple':''}></label><label>Комментарий<textarea name="comment" maxlength="2000" rows="3" placeholder="${kind==='work'?'Описание выполненных работ':'Комментарий к проекту'}"></textarea></label>`);
  }catch(reason){error(reason);$('[data-add-report]').disabled=false;}
 };
 dialog.showModal();renderRecords().catch(error);
}
