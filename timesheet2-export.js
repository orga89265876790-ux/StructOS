import {reportRecords,reportsForWeek} from './timesheet2-reports.js';

const sections={people:'Фотоотчёт людей',work:'Фотоотчёт работ',tools:'Инструмент',history:'История',sheet:'Табель',estimate:'Смета',materials:'Материалы'};
const safe=v=>String(v||'Файл').replace(/[\\/:*?"<>|\x00-\x1f]/g,'-').slice(-120);
const stamp=v=>new Date(v).toLocaleString('ru-RU');
const rub=v=>(Number(v||0)/100).toFixed(2).replace('.',',');
const csv=rows=>new Blob(['\uFEFF'+rows.map(row=>row.map(v=>{
 let s=String(v??'');if(typeof v==='string' && /^\s*[=+@-]/.test(s) && !/^-?\d+(,\d+)?$/.test(s))s="'"+s;
 return '"'+s.replaceAll('"','""')+'"';
}).join(';')).join('\r\n')],{type:'text/csv'});

// ZIP STORE: retain original media Blobs; calculate checksums one chunk at a time.
const crcTable=Uint32Array.from({length:256},(_,n)=>{for(let i=0;i<8;i++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n;});
async function zip(files){
 const parts=[],directory=[];let offset=0,dirSize=0;
 const header=(size,fields)=>{const a=new Uint8Array(size),v=new DataView(a.buffer);for(const [i,n,width] of fields)v[width===4?'setUint32':'setUint16'](i,n,true);return a;};
 const limit=()=>{throw Error('Архив слишком большой. Выберите меньше разделов.');};
 if(files.length>=65535)limit();
 for(const [path,blob] of files){
  const name=new TextEncoder().encode(path);if(offset+30+name.length+blob.size>=0xffffffff)limit();
  let crc=0xffffffff;
  for(let i=0;i<blob.size;i+=1048576){const bytes=new Uint8Array(await blob.slice(i,i+1048576).arrayBuffer());for(const b of bytes)crc=crcTable[(crc^b)&255]^(crc>>>8);}
  crc=(crc^0xffffffff)>>>0;
  const fields=[[4,20],[6,2048],[12,33],[14,crc,4],[18,blob.size,4],[22,blob.size,4],[26,name.length]];
  parts.push(header(30,[[0,0x04034b50,4],...fields]),name,blob);
  directory.push(header(46,[[0,0x02014b50,4],[4,20],...fields.map(([i,n,w])=>[i+2,n,w]),[42,offset,4]]),name);
  offset+=30+name.length+blob.size;dirSize+=46+name.length;
 }
 if(offset+dirSize>=0xffffffff)limit();
 return new Blob([...parts,...directory,header(22,[[0,0x06054b50,4],[8,files.length],[10,files.length],[12,dirSize,4],[16,offset,4]])],{type:'application/zip'});
}

export async function buildArchive(selected,{owner,o,week,dates,totals,settlement,weekSummary},read=reportRecords){
 const files=[],rows=o.weeks?.[week]?.rows||[];
 for(const key of selected){
  const title=sections[key];let table;
  if(['people','work','tools'].includes(key)){
   const records=reportsForWeek(await read(JSON.stringify([owner,o.id,key])),key,week);
   if(key==='tools')table=[['Дата внесения','Наименование','Количество'],...records.map(r=>[stamp(r.createdAt),r.name,r.quantity])];
   else{
    table=[['Файл',key==='people'?'Дата и время съёмки':'Дата и время добавления','Комментарий']];
    for(const [i,r] of records.entries()){
     const date=r.capturedAt||r.createdAt,name=(i+1)+'_'+safe(r.filename);
     files.push([title+'/'+name,r.file]);table.push([name,stamp(date),r.comment]);
    }
   }
  }else if(key==='sheet'){
   const t=weekSummary(rows);
   table=[['№','ФИО','Должность','Ставка','Норма',...dates,'Итого дней','Штраф','Премия','Выплачено','Зарплата','Итого начислено'],...rows.map((r,i)=>[i+1,r.name,r.position,rub(r.rateCents),r.norm,...r.hours,totals(r).days,rub(r.fineCents),rub(r.bonusCents),rub(r.paidCents),rub(totals(r).pay),rub(settlement(r))]),['Итого','Отмечено людей: '+t.people,'','','',...t.daily,t.days,...['fine','bonus','paid','pay','net'].map(k=>rub(t[k]))]];
  }else if(key==='history'){
   const names=new Map(),events=[],kinds={extra:'Начисление',fine:'Штраф',paid:'Выплата',bonus:'Премия',dismiss:'Увольнение',restore:'Восстановление'};
   for(const [w,s] of Object.entries(o.weeks||{}).sort())for(const r of s.rows){if(r.name)names.set(r.id,r.name);for(const e of r.entries||[])events.push({...e,person:r.id,date:w});}
   for(const e of o.employmentEvents||[])events.push({...e,person:e.id});
   table=[['Дата и время','ФИО','Операция','Неделя / дата действия','Сумма','Комментарий'],...events.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(e=>[stamp(e.createdAt),names.get(e.person),kinds[e.kind],e.date,e.cents==null?'':rub(e.cents),e.comment])];
  }else{files.push([title+'.txt',new Blob([title+': записей пока нет.'])]);continue;}
  files.push([(['work','people'].includes(key)?title+'/':'')+title+'.csv',csv(table)]);
 }
 return zip(files);
}

export function showExport(dialog,context){
 dialog.setAttribute('aria-label','Скачать данные объекта');
 dialog.innerHTML='<form><h2>Что скачать?</h2><p class="t2-hint" data-period></p>'+Object.entries(sections).map(([k,v])=>'<label class="t2-export-option"><input type="checkbox" name="section" value="'+k+'" '+(k==='sheet'?'checked':'')+'>'+v+(['estimate','materials'].includes(k)?' · пока пусто':'')+'</label>').join('')+'<p role="status"></p><div><button type="button" class="outline-button">Отмена</button><button type="submit" class="primary-button">Скачать ZIP</button></div></form>';
 dialog.querySelector('[data-period]').textContent=context.o.name+' · Табель и фотоотчёты: '+context.dates[0]+' — '+context.dates[6]+'. Инструмент и история: за всё время.';
 const form=dialog.querySelector('form'),submit=form.querySelector('[type=submit]'),cancel=form.querySelector('[type=button]'),status=form.querySelector('[role=status]');
 form.onchange=()=>{submit.disabled=!form.querySelector('input:checked');};cancel.onclick=()=>dialog.close();
 form.onsubmit=async e=>{e.preventDefault();const selected=new FormData(form).getAll('section');if(!selected.length||submit.disabled)return;
  form.querySelectorAll('input,button').forEach(el=>el.disabled=true);status.textContent='Готовим архив…';
  try{const blob=await buildArchive(selected,context);if(!dialog.open||!form.isConnected)return;const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=safe(context.o.name)+'_'+context.week+'.zip';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);dialog.close();}
  catch(err){status.textContent=err.message||'Не удалось подготовить архив.';}
  finally{form.querySelectorAll('input,button').forEach(el=>el.disabled=false);}
 };dialog.showModal();
}
