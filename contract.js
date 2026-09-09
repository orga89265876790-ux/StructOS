const CONTRACT_STORAGE_KEY = 'structos-contract-workspace-v1';
const CONTRACT_OBJECTS_KEY = 'structos-objects-v1';
const CONTRACT_TASKS_KEY = 'structos-contract-tasks-v1';
const CONTRACT_DB_NAME = 'structos-contract-originals-v1';
const CONTRACT_DB_STORE = 'originals';
const CONTRACT_MAX_FILE_SIZE = 100 * 1024 * 1024;

const CONTRACT_ROLES = Object.freeze({
  customer: 'Заказчик',
  general: 'Генподрядчик',
  contractor: 'Подрядчик',
  subcontractor: 'Субподрядчик',
  supplier: 'Поставщик',
  other: 'Другая сторона'
});

const CONTRACT_SECTIONS = Object.freeze([
  ['subject', 'Предмет договора', /предмет|объ[её]м работ|обязуется выполнить|выполнить (?:комплекс|работы)|поставк/i],
  ['price', 'Стоимость', /цен[а-яё]*|стоимост|тв[её]рдая цена|ориентировочн/iu],
  ['payment', 'Оплата', /порядок оплат|оплата|оплачива|расч[её]т|плат[её]ж|кс-2|кс-3/i],
  ['advance', 'Аванс', /аванс|предоплат/i],
  ['deadlines', 'Сроки', /срок|начал[оа] работ|окончан|график/i],
  ['extras', 'Дополнительные работы', /дополнительн.*работ|допработ|неучтенн/i],
  ['user-duty', 'Обязанности пользователя', /подрядчик обязан|исполнитель обязан|поставщик обязан/i],
  ['other-duty', 'Обязанности второй стороны', /заказчик обязан|генподрядчик обязан/i],
  ['acceptance', 'Приёмка работ', /приемк|приёмк|акт выполн|рассматривает результат|замечан|кс-2|мотивированн.*отказ/i],
  ['executive', 'Исполнительная документация', /исполнительн.*документ|исполнительн.*схем|акты скрытых/i],
  ['materials', 'Материалы', /материал/i],
  ['equipment', 'Оборудование', /оборудован/i],
  ['penalties', 'Штрафы и пени', /штраф|пен(?:я|и|ю|ей)|неустойк/i],
  ['retentions', 'Удержания', /удерж(?:ан|ив|ива|ать|ит)|гарантийн.*резерв/i],
  ['warranty', 'Гарантия', /гарант/i],
  ['safety', 'Охрана труда', /охран[аы] труда|техник[аеи] безопас|пожарн/i],
  ['price-change', 'Изменение стоимости', /изменени[ея].*цен|изменени[ея].*стоимост|индексац/i],
  ['term-change', 'Изменение сроков', /продлен|продлева|изменени[ея].*срок/i],
  ['suspension', 'Приостановка работ', /приостанов|остановк[аи] работ/i],
  ['termination', 'Расторжение договора', /расторж|односторонн.*(?:отказ|поряд)|вправе отказ/i],
  ['force-majeure', 'Форс-мажор', /форс[- ]?мажор|непреодолим.*сил/i],
  ['disputes', 'Споры', /спор|арбитраж|претензионн/i],
  ['special', 'Особые условия', /особые услов|прочие услов/i],
  ['attachments', 'Приложения', /приложени/i]
]);

const CONTRACT_SECTION_MAP = new Map(CONTRACT_SECTIONS.map(([id, title]) => [id, title]));

const MISSING_CONDITIONS = Object.freeze([
  { id: 'ks-review', title: 'Срок согласования КС-2 / КС-3', test: /кс-2|кс-3/i, why: 'Без точного срока подписание актов и начало оплаты могут затягиваться.', proposal: 'Заказчик обязан рассмотреть представленные Подрядчиком КС-2 и КС-3 и подписать их либо направить мотивированный письменный отказ в течение 5 (пяти) рабочих дней с даты получения.' },
  { id: 'docs-review', title: 'Срок проверки исполнительной документации', test: /исполнительн.*документ.{0,180}(?:дн|срок)|(?:дн|срок).{0,180}исполнительн.*документ/is, why: 'Неопределённая проверка документов способна остановить приёмку и оплату.', proposal: 'Заказчик проверяет исполнительную документацию в течение 5 (пяти) рабочих дней. При отсутствии мотивированных замечаний в этот срок документация считается принятой.' },
  { id: 'idle-pay', title: 'Оплата простоя по вине Заказчика', test: /оплат.{0,80}прост|прост.{0,80}оплат/is, why: 'Бригада и техника могут простаивать без компенсации.', proposal: 'Документально подтверждённый простой по причинам, зависящим от Заказчика, оплачивается Заказчиком исходя из согласованной стоимости ресурсов. Срок выполнения работ продлевается на период простоя.' },
  { id: 'extras-order', title: 'Порядок согласования дополнительных работ', test: /дополнительн.*работ/i, why: 'Устно порученные работы часто становятся неоплачиваемыми.', proposal: 'Дополнительные работы выполняются только после письменного согласования состава, стоимости и влияния на сроки. Работы, порученные уполномоченным представителем Заказчика письменно, подлежат оплате.' },
  { id: 'design-change', title: 'Продление срока при изменении проекта', test: /изменени[ея].{0,100}проект.{0,160}срок|срок.{0,160}изменени[ея].{0,100}проект/is, why: 'Изменения проекта создают задержку, которая иначе может считаться просрочкой Подрядчика.', proposal: 'При изменении проектной или рабочей документации сроки выполнения работ продлеваются на период согласования изменений и выполнения вызванных ими дополнительных работ.' },
  { id: 'workfront', title: 'Срок передачи фронта работ', test: /передач[аи].{0,80}фронт.{0,100}(?:дн|дат|срок)|(?:дн|дат|срок).{0,100}передач[аи].{0,80}фронт/is, why: 'Без даты передачи площадки невозможно объективно определить начало просрочки.', proposal: 'Заказчик передаёт Подрядчику готовый фронт работ по акту не позднее согласованной даты начала работ. До передачи фронта работ течение срока выполнения работ не начинается.' },
  { id: 'customer-delay', title: 'Ответственность Заказчика за задержку', test: /ответственност.{0,100}заказчик|пен(?:я|и|ю|ей).{0,100}заказчик/is, why: 'Ответственность сторон становится несбалансированной.', proposal: 'При нарушении Заказчиком срока оплаты Подрядчик вправе требовать пеню в размере 0,1% от просроченной суммы за каждый день просрочки, но не более 10% такой суммы.' },
  { id: 'price-change-order', title: 'Порядок изменения цены', test: /изменени[ея].{0,100}(?:цен|стоимост)/i, why: 'Рост объёма или изменение решений могут остаться внутри первоначальной цены.', proposal: 'Цена договора изменяется только письменным дополнительным соглашением, в том числе при изменении объёма, проектных решений, исходных данных или обязательных требований после заключения договора.' }
]);

const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
const escapeXml = (value) => String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;' })[char]);
const uid = (prefix = 'contract') => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
const clone = (value) => typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value));
const nowIso = () => new Date().toISOString();
const asText = (value, max = 4000) => String(value ?? '').trim().slice(0, max);
const formatDateTime = (value) => value ? new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
const formatMoney = (value) => Number.isFinite(Number(value)) ? new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(Number(value)) : asText(value) || 'Не обнаружено';
const normalizeSpace = (value) => asText(value, 120000).replace(/\r/g, '').replace(/[\t\u00a0]+/g, ' ').replace(/ {2,}/g, ' ');
const fileExtension = (name) => String(name || '').split('.').pop()?.toLowerCase() || '';
const riskLabel = (risk) => ({ critical: 'Критично', attention: 'Требует внимания', normal: 'Нормально' })[risk] || 'Не определено';
const riskIcon = (risk) => ({ critical: '🔴', attention: '🟡', normal: '🟢' })[risk] || '⚪';

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}

function blankWorkspace() {
  return { schema: 1, records: [], selectedId: null };
}

function normalizeDecision(value) {
  const action = ['keep', 'modified', 'deleted'].includes(value?.action) ? value.action : 'keep';
  return { action, text: asText(value?.text, 12000), reason: asText(value?.reason, 1000), updatedAt: value?.updatedAt || null, actor: asText(value?.actor, 120) || 'Пользователь', acceptedStructos: Boolean(value?.acceptedStructos) };
}

function normalizeRecord(record) {
  if (!record || typeof record !== 'object') return null;
  const clauses = Array.isArray(record.clauses) ? record.clauses.filter((item) => item?.id && item?.originalText != null).slice(0, 180) : [];
  const additions = Array.isArray(record.additions) ? record.additions.filter((item) => item?.id && item?.text).slice(0, 120) : [];
  const decisions = Object.fromEntries(Object.entries(record.decisions || {}).map(([key, value]) => [key, normalizeDecision(value)]));
  return {
    ...record,
    id: asText(record.id, 160) || uid(),
    createdAt: record.createdAt || nowIso(),
    updatedAt: record.updatedAt || record.createdAt || nowIso(),
    role: CONTRACT_ROLES[record.role] ? record.role : 'contractor',
    objectId: asText(record.objectId, 180),
    objectName: asText(record.objectName, 180),
    original: { ...record.original, immutable: true, name: asText(record.original?.name, 240) || 'Договор', previewText: asText(record.original?.previewText, 120000) },
    metadata: record.metadata && typeof record.metadata === 'object' ? record.metadata : {},
    clauses,
    decisions,
    additions,
    versions: Array.isArray(record.versions) ? record.versions.slice(0, 50) : [],
    missing: Array.isArray(record.missing) ? record.missing : [],
    calendar: Array.isArray(record.calendar) ? record.calendar : [],
    chat: Array.isArray(record.chat) ? record.chat.slice(-40) : [],
    audit: Array.isArray(record.audit) ? record.audit.slice(-250) : []
  };
}

function loadWorkspace() {
  const saved = readJson(CONTRACT_STORAGE_KEY, blankWorkspace());
  const records = Array.isArray(saved.records) ? saved.records.map(normalizeRecord).filter(Boolean) : [];
  const selectedId = records.some((record) => record.id === saved.selectedId) ? saved.selectedId : records[0]?.id || null;
  return { schema: 1, records, selectedId };
}

let workspace = loadWorkspace();
let pendingFile = null;
let pendingObjectId = '';
let loadingMessage = '';
let toastTimer = null;
const view = { product: 'analysis', section: 'overview', mode: 'simple', chatOpen: false, clauseFilter: 'all', selectedVersionId: null };

function saveWorkspace() {
  workspace.records = workspace.records.map(normalizeRecord).filter(Boolean);
  try { localStorage.setItem(CONTRACT_STORAGE_KEY, JSON.stringify(workspace)); }
  catch (error) { console.warn('StructOS Contract local save failed:', error); }
}

function currentRecord() {
  return workspace.records.find((record) => record.id === workspace.selectedId) || null;
}

function updateRecord(record) {
  record.updatedAt = nowIso();
  const index = workspace.records.findIndex((item) => item.id === record.id);
  if (index >= 0) workspace.records[index] = normalizeRecord(record);
  else workspace.records.unshift(normalizeRecord(record));
  workspace.selectedId = record.id;
  saveWorkspace();
}

function appendAudit(record, entry) {
  record.audit ||= [];
  record.audit.push({
    id: uid('audit'),
    at: nowIso(),
    actor: currentActor(),
    type: asText(entry.type, 60),
    clauseId: asText(entry.clauseId, 160),
    number: asText(entry.number, 60),
    before: asText(entry.before, 12000),
    after: asText(entry.after, 12000),
    reason: asText(entry.reason, 1000),
    source: entry.source === 'structos' ? 'structos' : 'user'
  });
  record.audit = record.audit.slice(-250);
}

function showContractToast(message) {
  let toast = document.querySelector('[data-contract-toast]');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'contract-toast';
    toast.dataset.contractToast = '';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 3200);
}

function openContractDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(CONTRACT_DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(CONTRACT_DB_STORE)) request.result.createObjectStore(CONTRACT_DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function storeOriginal(id, file) {
  const db = await openContractDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(CONTRACT_DB_STORE, 'readwrite');
    tx.objectStore(CONTRACT_DB_STORE).put(file, id);
    tx.oncomplete = () => { db.close(); resolve(true); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

async function getOriginal(id) {
  const db = await openContractDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(CONTRACT_DB_STORE, 'readonly').objectStore(CONTRACT_DB_STORE).get(id);
    request.onsuccess = () => { db.close(); resolve(request.result || null); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}

function objectRegistry() {
  const records = readJson(CONTRACT_OBJECTS_KEY, []);
  return Array.isArray(records) ? records.filter((item) => item?.id && item?.name) : [];
}

function linkedObject(record) {
  return objectRegistry().find((item) => String(item.id) === String(record?.objectId)) || null;
}

function sectionForText(text) {
  const priority = ['penalties', 'retentions', 'extras', 'executive', 'advance', 'payment', 'acceptance', 'suspension', 'termination', 'force-majeure', 'disputes', 'warranty', 'safety', 'price-change', 'term-change', 'attachments', 'materials', 'equipment', 'deadlines', 'subject', 'price', 'user-duty', 'other-duty', 'special'];
  for (const sectionId of priority) {
    const match = CONTRACT_SECTIONS.find(([id]) => id === sectionId);
    if (match?.[2].test(text)) return sectionId;
  }
  return 'special';
}

function sectionTitle(section) {
  return CONTRACT_SECTION_MAP.get(section) || 'Особые условия';
}

function clauseRisk(text, section) {
  const critical = /вправе не оплачивать|оплат[ае] не подлеж(?:ит|ат)|без дополнительной оплаты|все необходим(?:ые|ое).{0,100}работ(?:ы|а).{0,100}(?:входят|включ[её]н[а-яё]*)|односторонн(?:ем|ий).{0,80}(?:порядке|отказ)|(?:штраф|пен(?:я|и|ю|ей)|неустойк).{0,150}(?:10|20|30|50|100)\s*%|удерж(?:ан|ив).{0,80}(?:20|30|50)\s*%/isu;
  if (critical.test(text)) return { level: 'critical', why: 'Условие может привести к неоплате, крупному удержанию или одностороннему прекращению договора.' };
  const attention = /штраф|пен(?:я|и|ю|ей)|неустойк|удерж(?:ан|ив)|в течение|исполнительн.*документ|мотивированн.*отказ|гарант|дополнительн.*работ|приостанов|расторж/is;
  if (attention.test(text) || ['payment', 'deadlines', 'acceptance', 'retentions', 'warranty', 'termination', 'term-change', 'price-change'].includes(section)) return { level: 'attention', why: 'Пункт влияет на деньги, сроки или порядок приёмки и требует проверки перед подписанием.' };
  return { level: 'normal', why: 'Прямой критический риск автоматическими правилами не обнаружен.' };
}

function simpleMeaning(section, role) {
  const side = CONTRACT_ROLES[role] || 'пользователь';
  const meanings = {
    subject: `Здесь определено, какие работы или поставку должен выполнить ${side.toLowerCase()}.`,
    price: 'Здесь зафиксировано, что входит в цену и можно ли её изменить.',
    payment: 'Пункт определяет, какие документы запускают оплату и сколько придётся ждать деньги.',
    advance: 'Пункт определяет размер и условия использования аванса.',
    deadlines: 'Здесь указано, когда начинаются и заканчиваются работы и от каких событий зависит срок.',
    extras: 'Пункт объясняет, как согласовать и получить оплату за работы сверх исходного объёма.',
    acceptance: 'Здесь описано, как передать результат работ и что считается принятием.',
    executive: 'Без перечисленных документов приёмку и оплату могут задержать.',
    materials: 'Пункт распределяет, кто закупает, передаёт и отвечает за материалы.',
    equipment: 'Пункт распределяет ответственность за оборудование.',
    penalties: 'Здесь указано, за какое нарушение и сколько могут взыскать.',
    retentions: 'Часть заработанных денег могут временно удержать до выполнения условий.',
    warranty: 'Пункт определяет срок и порядок бесплатного устранения недостатков.',
    safety: 'Нужно соблюдать правила площадки и требования безопасности.',
    'price-change': 'Здесь указано, когда договорную цену можно пересмотреть.',
    'term-change': 'Здесь указано, когда можно законно перенести срок.',
    suspension: 'Пункт определяет, можно ли остановить работы и что для этого требуется.',
    termination: 'Пункт описывает, кто и при каких условиях может прекратить договор.',
    'force-majeure': 'Пункт описывает действия при чрезвычайных обстоятельствах вне контроля сторон.',
    disputes: 'Здесь определён порядок претензий и место рассмотрения спора.',
    attachments: 'Приложения являются частью договора и могут содержать объём, цену и график.',
    'user-duty': 'Это конкретное действие, которое должна выполнить выбранная сторона.',
    'other-duty': 'Это конкретное действие, которое должна выполнить вторая сторона.',
    special: 'Это дополнительное условие, которое действует вместе с остальными пунктами.'
  };
  return meanings[section] || meanings.special;
}

function recommendationFor(section, risk) {
  if (risk === 'normal') return 'Оставить, если формулировка соответствует фактическим договорённостям сторон.';
  const values = {
    payment: 'Зафиксировать конкретный срок проверки документов и оплаты, а также момент начала его отсчёта.',
    extras: 'Разрешить выполнение дополнительных работ только после письменного поручения и согласования цены и срока.',
    deadlines: 'Связать начало срока с передачей фронта работ, проекта и необходимых исходных данных.',
    penalties: 'Ограничить общую сумму санкций и сделать ответственность сторон взаимной.',
    retentions: 'Указать точный процент, основание, срок возврата и запрет иных удержаний.',
    acceptance: 'Добавить срок приёмки и правило о принятии при отсутствии мотивированного отказа.',
    executive: 'Закрыть перечень документов и ограничить срок их проверки.',
    termination: 'Добавить срок уведомления и оплату фактически выполненных работ и закупленных материалов.'
  };
  return values[section] || 'Уточнить формулировку, срок, ответственных лиц и финансовые последствия.';
}

function proposalFor(section) {
  const values = {
    payment: 'Оплата принятых работ производится в течение 10 (десяти) рабочих дней с даты подписания КС-2 и КС-3. Заказчик обязан подписать документы либо направить мотивированный отказ в течение 5 (пяти) рабочих дней с даты получения.',
    extras: 'Дополнительные работы выполняются после письменного согласования сторонами их состава, стоимости и влияния на срок. Письменное поручение уполномоченного представителя Заказчика является основанием для оплаты таких работ.',
    deadlines: 'Срок выполнения работ исчисляется с даты передачи по акту готового фронта работ, утверждённой документации и необходимых исходных данных. Задержка со стороны Заказчика автоматически продлевает срок на соответствующий период.',
    penalties: 'Размер пени составляет 0,1% от стоимости просроченного обязательства за каждый день просрочки, но не более 10% такой стоимости. Ответственность применяется взаимно к обеим сторонам.',
    retentions: 'Общий размер удержаний не может превышать 5% цены принятых работ. Удержанная сумма возвращается в течение 10 рабочих дней после наступления указанного в договоре основания.',
    acceptance: 'Заказчик рассматривает результат работ и переданные документы в течение 5 рабочих дней и подписывает акт либо направляет мотивированный перечень замечаний. При отсутствии ответа работы считаются принятыми.',
    executive: 'Исчерпывающий перечень исполнительной документации установлен приложением к договору. Заказчик проверяет комплект в течение 5 рабочих дней и направляет единый перечень замечаний.',
    termination: 'При расторжении договора Заказчик оплачивает фактически выполненные работы, принятые материалы и документально подтверждённые расходы Подрядчика в течение 10 рабочих дней.',
    suspension: 'Подрядчик вправе приостановить работы после письменного уведомления, если Заказчик не передал фронт работ, документацию или допустил просрочку оплаты более 10 рабочих дней. Срок работ продлевается на период приостановки.',
    warranty: 'Гарантийный срок исчисляется с даты подписания итогового акта. Подрядчик устраняет подтверждённые недостатки в разумный согласованный срок; гарантия не распространяется на дефекты эксплуатации и действия третьих лиц.'
  };
  return values[section] || 'Стороны обязуются согласовать точный порядок исполнения настоящего условия, ответственных лиц, сроки и последствия нарушения в письменной форме.';
}

function relatedClausesFor(record, clause) {
  const map = {
    payment: ['acceptance', 'executive', 'retentions'],
    acceptance: ['payment', 'executive', 'warranty'],
    executive: ['acceptance', 'payment'],
    deadlines: ['term-change', 'suspension', 'penalties'],
    'term-change': ['deadlines', 'suspension', 'penalties'],
    extras: ['price', 'price-change', 'deadlines'],
    penalties: ['price', 'deadlines', 'payment'],
    retentions: ['payment', 'warranty', 'acceptance'],
    termination: ['payment', 'acceptance', 'materials'],
    warranty: ['acceptance', 'retentions']
  };
  const sections = map[clause.section] || [];
  return sections.map((section) => record.clauses.find((item) => item.id !== clause.id && item.section === section)).filter(Boolean).slice(0, 3);
}

function contextualProposal(record, clause) {
  const role = record.role;
  const isCustomerSide = role === 'customer';
  const isSupplier = role === 'supplier';
  if (clause.section === 'payment') {
    if (isSupplier) return 'Оплата поставленного товара производится в течение 10 (десяти) рабочих дней с даты передачи товара и подписания товарной накладной или УПД. Покупатель обязан подписать документ либо направить мотивированные замечания в течение 3 (трёх) рабочих дней с даты получения.';
    if (isCustomerSide) return 'Оплата принятого результата работ производится в течение 15 (пятнадцати) рабочих дней после получения надлежаще оформленных КС-2, КС-3 и согласованного договором комплекта исполнительной документации. Заказчик рассматривает документы и направляет единый мотивированный перечень замечаний в течение 7 (семи) рабочих дней.';
  }
  if (clause.section === 'extras' && isCustomerSide) return 'Дополнительные работы выполняются только на основании предварительного письменного поручения Заказчика и подписанного сторонами соглашения о составе, стоимости и влиянии на сроки. Работы, выполненные без такого согласования, оплачиваются только в случаях, прямо предусмотренных законом.';
  if (clause.section === 'deadlines' && isCustomerSide) return 'Подрядчик приступает к работам после передачи фронта работ и утверждённой документации и завершает их в сроки календарного графика. Продление допускается на документально подтверждённый период препятствий, о которых Подрядчик письменно уведомил Заказчика без необоснованной задержки.';
  if (clause.section === 'termination' && isCustomerSide) return 'Заказчик вправе отказаться от договора, письменно уведомив Подрядчика не менее чем за 10 (десять) рабочих дней. До даты прекращения стороны фиксируют объём фактически выполненных работ, переданные материалы, недостатки и подлежащую оплате сумму.';
  if (isSupplier && clause.section === 'extras') return 'Изменение количества, ассортимента или характеристик товара допускается только по письменной заявке Покупателя и после согласования сторонами цены и нового срока поставки.';
  if (isSupplier && clause.section === 'deadlines') return 'Срок поставки исчисляется с даты получения согласованной заявки и предусмотренного договором аванса. Просрочка Покупателя в передаче данных или оплате автоматически переносит срок поставки на соответствующий период.';
  if (isSupplier && clause.section === 'acceptance') return 'Покупатель проверяет количество, комплектность и явные недостатки товара при передаче, подписывает накладную или УПД либо оформляет мотивированный акт расхождений. Скрытые недостатки заявляются в течение гарантийного срока с подтверждающими материалами.';
  if (isSupplier && clause.section === 'warranty') return 'Гарантийный срок исчисляется с даты передачи товара. Поставщик устраняет подтверждённый производственный недостаток в согласованный срок; гарантия не распространяется на нарушение правил хранения, монтажа или эксплуатации Покупателем и третьими лицами.';
  return clause.proposedText || proposalFor(clause.section);
}

function extractNumber(value) {
  const normalized = String(value || '').replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

function firstMatch(text, pattern, fallback = 'Не обнаружено') {
  const match = text.match(pattern);
  return asText(match?.[1], 240) || fallback;
}

function findClause(clauses, matcher) {
  return clauses.find((clause) => matcher.test(clause.originalText)) || null;
}

async function extractPdfText(file) {
  const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
  const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  const pdf = await loadingTask.promise;
  const pages = [];
  for (let index = 1; index <= pdf.numPages; index += 1) {
    const page = await pdf.getPage(index);
    const content = await page.getTextContent();
    let lastY = null;
    const lines = [];
    let line = '';
    content.items.forEach((item) => {
      const y = Math.round(Number(item.transform?.[5]) || 0);
      if (lastY !== null && Math.abs(y - lastY) > 3 && line.trim()) {
        lines.push(line.trim());
        line = '';
      }
      line += `${item.str || ''} `;
      lastY = y;
    });
    if (line.trim()) lines.push(line.trim());
    pages.push(lines.join('\n'));
  }
  return { text: pages.join('\f'), pages: pdf.numPages, method: 'PDF text layer' };
}

async function extractDocxText(file) {
  const { default: JSZip } = await import('jszip');
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const documentXml = await zip.file('word/document.xml')?.async('string');
  if (!documentXml) throw new Error('DOCX document.xml is missing');
  const withBreaks = documentXml
    .replace(/<w:br[^>]*w:type=["']page["'][^>]*\/>/g, '<w:t>[[STRUCTOS_PAGE_BREAK]]</w:t>')
    .replace(/<w:tab\s*\/>/g, '\t')
    .replace(/<\/w:p>/g, '\n');
  const parsed = new DOMParser().parseFromString(withBreaks, 'application/xml');
  const parserError = parsed.querySelector('parsererror');
  if (parserError) {
    const raw = withBreaks.replace(/<[^>]+>/g, ' ');
    return { text: raw, pages: null, method: 'DOCX XML' };
  }
  return { text: (parsed.documentElement.textContent || '').replace(/\[\[STRUCTOS_PAGE_BREAK\]\]/g, '\f'), pages: null, method: 'DOCX XML' };
}

async function extractContractText(file) {
  const extension = fileExtension(file.name);
  if (extension === 'pdf') return extractPdfText(file);
  if (extension === 'docx') return extractDocxText(file);
  if (['txt', 'md', 'rtf'].includes(extension) || /^text\//i.test(file.type)) return { text: await file.text(), pages: null, method: 'Текстовый файл' };
  return { text: '', pages: null, method: 'Требуется OCR / серверное распознавание' };
}

function splitClauses(text) {
  const pages = normalizeSpace(text).split('\f');
  const clauses = [];
  let current = null;
  const push = () => {
    if (!current?.text?.trim()) return;
    const originalText = asText(current.text, 8000);
    const section = sectionForText(`${current.title} ${originalText}`);
    const risk = clauseRisk(originalText, section);
    clauses.push({
      id: uid('clause'),
      number: current.number,
      title: current.title || sectionTitle(section),
      section,
      originalText,
      simple: simpleMeaning(section, 'contractor'),
      required: requiredAction(originalText, section),
      risk: risk.level,
      why: risk.why,
      recommendation: recommendationFor(section, risk.level),
      proposedText: proposalFor(section),
      source: { page: current.page, section: sectionTitle(section), clause: current.number }
    });
  };

  pages.forEach((pageText, pageIndex) => {
    const lines = pageText.split(/\n+/).map((line) => line.trim()).filter(Boolean);
    lines.forEach((line) => {
      const numbered = line.match(/^(\d+(?:\.\d+){0,4})[.)]?\s+(.+)$/u);
      if (numbered) {
        push();
        const rest = numbered[2].trim();
        const titleCandidate = rest.length < 90 && !/[.;:]$/.test(rest) ? rest : '';
        current = { number: numbered[1], title: titleCandidate, text: rest, page: pageIndex + 1 };
      } else if (current) current.text += `\n${line}`;
      else if (line.length > 40) current = { number: `S.${clauses.length + 1}`, title: '', text: line, page: pageIndex + 1 };
    });
  });
  push();

  if (!clauses.length) {
    normalizeSpace(text).split(/\n{2,}|(?<=[.!?])\s+(?=[А-ЯA-Z])/u).filter((part) => part.trim().length > 40).slice(0, 120).forEach((part, index) => {
      const originalText = asText(part, 8000);
      const section = sectionForText(originalText);
      const risk = clauseRisk(originalText, section);
      clauses.push({ id: uid('clause'), number: `S.${index + 1}`, title: sectionTitle(section), section, originalText, simple: simpleMeaning(section, 'contractor'), required: requiredAction(originalText, section), risk: risk.level, why: risk.why, recommendation: recommendationFor(section, risk.level), proposedText: proposalFor(section), source: { page: 1, section: sectionTitle(section), clause: `S.${index + 1}` } });
    });
  }
  return clauses.slice(0, 180);
}

function requiredAction(text, section) {
  const values = {
    payment: 'Передать документы, запускающие оплату, и зафиксировать дату их получения второй стороной.',
    advance: 'Проверить условия получения, зачёта и возврата аванса.',
    deadlines: 'Зафиксировать дату фактического старта и все препятствия актами и письмами.',
    extras: 'Не начинать дополнительные работы без письменного согласования.',
    acceptance: 'Передать результат и комплект документов по подтверждаемому каналу.',
    executive: 'Собрать и передать полный комплект исполнительной документации.',
    penalties: 'Контролировать событие и срок, за нарушение которых начисляется санкция.',
    retentions: 'Проверить основание и дату возврата каждой удерживаемой суммы.',
    warranty: 'Принять и устранить подтверждённое гарантийное замечание в согласованный срок.',
    safety: 'Назначить ответственных и соблюдать правила охраны труда на объекте.'
  };
  if (values[section]) return values[section];
  const sentence = text.split(/[.!?]\s/)[0];
  return sentence.length < 220 ? sentence : 'Проверить указанное обязательство и назначить ответственного.';
}

function applyRoleToClauses(clauses, role) {
  return clauses.map((clause) => ({ ...clause, simple: simpleMeaning(clause.section, role) }));
}

function detectMetadata(text, clauses, fileName) {
  const compact = normalizeSpace(text);
  const priceClause = clauses.find((item) => /цен[аы]|стоимост/i.test(item.originalText) && /\d[\d\s]*(?:руб|₽)/i.test(item.originalText))
    || clauses.find((item) => item.section === 'price')
    || findClause(clauses, /цен[аы]|стоимост/i);
  const paymentClause = clauses.find((item) => /(?:оплата|оплачива|расч[её]т|плат[её]ж).{0,180}(?:в течение|не позднее|дн|акт|кс-2|кс-3)/is.test(item.originalText))
    || clauses.find((item) => item.section === 'payment')
    || findClause(clauses, /оплат|плат[её]ж|расч[её]т/i);
  const advanceClause = clauses.find((item) => item.section === 'advance') || findClause(clauses, /аванс|предоплат/i);
  const deadlineClause = clauses.find((item) => item.section === 'deadlines' && /начал[оа] работ|окончани[ея] работ|завершить|срок выполнения/i.test(item.originalText))
    || clauses.find((item) => item.section === 'deadlines')
    || findClause(clauses, /начал[оа] работ|окончани[ея] работ|завершить|срок выполнения/i);
  const warrantyClause = clauses.find((item) => item.section === 'warranty' && /гарантийн(?:ый|ого) срок.{0,100}(?:составляет|равен|месяц|год|дн)/is.test(item.originalText))
    || clauses.find((item) => item.section === 'warranty')
    || findClause(clauses, /гарант/i);
  const retentionClause = clauses.find((item) => item.section === 'retentions') || findClause(clauses, /удерж(?:ан|ив|ива|ать|ит)/i);
  const attachmentClause = findClause(clauses, /приложени/i);
  const amendmentClause = findClause(clauses, /дополнительн(?:ое|ые) соглашени/i);
  const headerClause = clauses.find((item) => /(?:договор|контракт).{0,100}№|заказчик\s*[:—-]|подрядчик\s*[:—-]/is.test(item.originalText));
  const subjectClause = clauses.find((item) => item.section === 'subject') || findClause(clauses, /предмет договора|обязуется выполнить|выполнить комплекс/i);
  const rawPrice = firstMatch(priceClause?.originalText || compact, /(?:цена|стоимость)(?:\s+договора|\s+работ)?[^\d]{0,80}([\d][\d\s]*(?:[,.]\d{1,2})?)\s*(?:руб|₽)/i);
  const priceValue = extractNumber(rawPrice);
  const number = firstMatch(compact || fileName, /(?:договор|контракт)(?:\s+[\p{L}-]+){0,3}\s*№\s*([^\s,;]+)/iu, firstMatch(fileName, /(?:договор|contract)[-_\s]*(?:№|n)?[-_\s]*([\p{L}\d._/-]+)/iu));
  const date = firstMatch(compact, /(?:договор[^\n]{0,100})?(?:от\s*)?([0-3]?\d[./-][01]?\d[./-](?:19|20)?\d{2})/iu);
  const customer = firstMatch(compact, /заказчик\s*[:—-]\s*([^\n;]{3,160})/iu);
  const contractor = firstMatch(compact, /(?:ген)?подрядчик\s*[:—-]\s*([^\n;]{3,160})/iu);
  const object = firstMatch(compact, /(?:объект(?:а)?|адрес объекта)\s*[:—-]\s*([^\n;]{3,180})/iu);
  const advance = firstMatch(advanceClause?.originalText || '', /(?:аванс|предоплат)[^\d]{0,100}([\d][\d\s]*(?:[,.]\d+)?\s*(?:%|руб(?:лей|ля|.)?|₽))/iu);
  const paymentTerm = firstMatch(paymentClause?.originalText || '', /((?:в течение|не позднее)\s+\d+\s*(?:рабочих|календарных)?\s*дн(?:я|ей|и)[^.]*)/iu);
  const warranty = firstMatch(warrantyClause?.originalText || '', /((?:\d+|один|два|три|пять)\s*(?:год(?:а|ов)?|месяц(?:а|ев)?|дн(?:ей|я)))/iu);
  const retention = firstMatch(retentionClause?.originalText || '', /([\d]+(?:[,.]\d+)?\s*%|[\d][\d\s]+\s*(?:руб|₽))/iu);
  const start = firstMatch(deadlineClause?.originalText || compact, /(?:начал[оа] работ|приступить)[^\d]{0,80}([0-3]?\d[./-][01]?\d[./-](?:19|20)?\d{2})/iu);
  const end = firstMatch(deadlineClause?.originalText || compact, /(?:окончан(?:ие|ия) работ|завершить)[^\d]{0,80}([0-3]?\d[./-][01]?\d[./-](?:19|20)?\d{2})/iu);
  return {
    number,
    date,
    customer,
    contractor,
    object,
    subject: subjectClause ? asText(subjectClause.originalText, 280) : 'Не обнаружено',
    price: priceValue ?? rawPrice,
    advance,
    paymentOrder: paymentClause ? asText(paymentClause.originalText, 420) : 'Не обнаружено',
    paymentTerm,
    start,
    end,
    warranty,
    retention,
    attachments: attachmentClause ? asText(attachmentClause.originalText, 320) : 'Не обнаружено',
    amendments: amendmentClause ? asText(amendmentClause.originalText, 320) : 'Не обнаружено',
    sources: {
      number: headerClause?.id || '', date: headerClause?.id || '', customer: headerClause?.id || '', contractor: headerClause?.id || '', object: headerClause?.id || '',
      price: priceClause?.id || '', payment: paymentClause?.id || '', advance: advanceClause?.id || '', deadline: deadlineClause?.id || '', warranty: warrantyClause?.id || '', retention: retentionClause?.id || '', attachments: attachmentClause?.id || '', amendments: amendmentClause?.id || '', subject: subjectClause?.id || ''
    }
  };
}

function detectCalendar(text, clauses, metadata) {
  const events = [];
  const add = (title, when, clause, kind = 'date') => {
    if (!when || when === 'Не обнаружено' || events.some((item) => item.title === title && item.when === when)) return;
    events.push({ id: uid('event'), title, when, kind, sourceClauseId: clause?.id || '' });
  };
  const deadlineClause = clauses.find((item) => item.id === metadata.sources?.deadline);
  add('Начало работ', metadata.start, deadlineClause);
  add('Окончание работ', metadata.end, deadlineClause);
  const paymentClause = clauses.find((item) => item.id === metadata.sources?.payment);
  add('Срок оплаты', metadata.paymentTerm, paymentClause, 'relative');
  const warrantyClause = clauses.find((item) => item.id === metadata.sources?.warranty);
  add('Гарантийный срок', metadata.warranty, warrantyClause, 'period');
  const representedClauses = new Set([deadlineClause?.id, paymentClause?.id, warrantyClause?.id].filter(Boolean));
  clauses.forEach((clause) => {
    if (representedClauses.has(clause.id)) return;
    const match = clause.originalText.match(/((?:в течение|не позднее)\s+\d+\s*(?:рабочих|календарных)?\s*дн(?:я|ей|и)[^.]*)/iu);
    if (match) add(sectionTitle(clause.section), asText(match[1], 180), clause, 'relative');
  });
  return events.slice(0, 40);
}

function detectMissing(text) {
  return MISSING_CONDITIONS.filter((item) => !item.test.test(text)).map((item) => ({ ...item, risk: ['idle-pay', 'extras-order', 'workfront'].includes(item.id) ? 'critical' : 'attention', addedId: '' }));
}

function analyzeTextRecord({ text, file, role, objectId = '', objectName = '', origin = 'upload', pages = null, method = '' }) {
  const baseClauses = applyRoleToClauses(splitClauses(text), role);
  const metadata = detectMetadata(text, baseClauses, file?.name || 'Договор');
  if (objectName && metadata.object === 'Не обнаружено') metadata.object = objectName;
  const record = {
    id: uid('contract'),
    createdAt: nowIso(),
    updatedAt: nowIso(),
    role,
    objectId,
    objectName: objectName || (metadata.object !== 'Не обнаружено' ? metadata.object : ''),
    origin,
    original: {
      immutable: true,
      name: file?.name || `Договор № ${metadata.number}`,
      size: Number(file?.size) || 0,
      type: file?.type || 'text/plain',
      storedAt: nowIso(),
      previewText: asText(text, 120000),
      pages,
      extractionMethod: method,
      extractionStatus: baseClauses.length ? 'ready' : 'needs-recognition'
    },
    metadata,
    clauses: baseClauses,
    decisions: Object.fromEntries(baseClauses.map((clause) => [clause.id, normalizeDecision({ action: 'keep' })])),
    additions: [],
    versions: [],
    missing: detectMissing(text),
    calendar: detectCalendar(text, baseClauses, metadata),
    chat: []
  };
  return normalizeRecord(record);
}

function makeEmptyUploadedRecord({ file, role, objectId = '', objectName = '', method = '' }) {
  return normalizeRecord({
    id: uid('contract'), createdAt: nowIso(), updatedAt: nowIso(), role, objectId, objectName, origin: 'upload',
    original: { immutable: true, name: file.name, size: file.size, type: file.type, storedAt: nowIso(), previewText: '', pages: null, extractionMethod: method, extractionStatus: 'needs-recognition' },
    metadata: { number: firstMatch(file.name, /(?:договор|contract)[-_\s]*(?:№|n)?[-_\s]*([\p{L}\d._/-]+)/iu), date: 'Не обнаружено', customer: 'Не обнаружено', contractor: 'Не обнаружено', object: objectName || 'Не обнаружено', subject: 'Не обнаружено', price: 'Не обнаружено', advance: 'Не обнаружено', paymentOrder: 'Не обнаружено', paymentTerm: 'Не обнаружено', start: 'Не обнаружено', end: 'Не обнаружено', warranty: 'Не обнаружено', retention: 'Не обнаружено', attachments: 'Не обнаружено', amendments: 'Не обнаружено', sources: {} },
    clauses: [], decisions: {}, additions: [], versions: [], missing: [], calendar: [], chat: []
  });
}

function demoContractText() {
  return `ДОГОВОР ПОДРЯДА № 47-ЭОМ\nот 01.09.2026\nЗаказчик: ООО «СтройЗаказ»\nПодрядчик: ООО «Монтаж Про»\nОбъект: Производственный корпус, г. Москва\n\n1.1 Подрядчик обязуется выполнить комплекс электромонтажных работ по проектной документации, а Заказчик обязуется принять и оплатить результат.\n1.2 Все необходимые для завершения объекта работы считаются включёнными в цену договора и дополнительной оплате не подлежат.\f2.1 Стоимость работ составляет 5 200 000 рублей. Цена является твёрдой.\n2.2 Заказчик выплачивает аванс 20% в течение 5 рабочих дней после подписания договора.\n2.3 Оплата выполненных работ производится в течение 30 рабочих дней после подписания КС-2 и КС-3 Заказчиком.\n2.4 Заказчик вправе удерживать 10% стоимости каждого акта до окончания гарантийного срока.\f3.1 Начало работ — 15.09.2026. Окончание работ — 20.12.2026.\n3.2 Подрядчик обязан соблюдать календарный график. Изменение проекта не является безусловным основанием для продления срока.\n3.3 За просрочку Подрядчик уплачивает пеню 0,1% от цены договора за каждый день просрочки, но не более 20% цены договора.\f4.1 Подрядчик передаёт исполнительную документацию одновременно с КС-2.\n4.2 Заказчик рассматривает результаты работ и вправе направить замечания. Срок рассмотрения не установлен.\n4.3 Гарантийный срок составляет 36 месяцев с даты подписания итогового акта.\n5.1 Заказчик вправе отказаться от договора в одностороннем порядке, уведомив Подрядчика за 3 календарных дня.\n6.1 Приложение №1 — смета; Приложение №2 — календарный график.`;
}

function createDemoRecord() {
  const text = demoContractText();
  const blob = new File([text], 'Демонстрационный договор №47-ЭОМ.txt', { type: 'text/plain' });
  const record = analyzeTextRecord({ text, file: blob, role: 'contractor', objectName: 'Производственный корпус, г. Москва', origin: 'demo', pages: 4, method: 'Демонстрационный текст' });
  record.original.demo = true;
  return { record, blob };
}

function clauseById(record, id) {
  return record.clauses.find((item) => item.id === id) || record.additions.find((item) => item.id === id) || null;
}

function decisionFor(record, clause) {
  if (clause.added) return normalizeDecision({ action: clause.deleted ? 'deleted' : 'modified', text: clause.text, reason: clause.reason, updatedAt: clause.updatedAt, actor: clause.actor, acceptedStructos: clause.acceptedStructos });
  return normalizeDecision(record.decisions[clause.id]);
}

function effectiveText(record, clause) {
  if (clause.added) return clause.text;
  const decision = decisionFor(record, clause);
  return decision.action === 'modified' ? decision.text : clause.originalText;
}

function allWorkingClauses(record, decisions = record.decisions, additions = record.additions) {
  const result = [];
  record.clauses.forEach((clause) => {
    const decision = normalizeDecision(decisions?.[clause.id]);
    result.push({ ...clause, workingAction: decision.action, workingText: decision.action === 'modified' ? decision.text : clause.originalText, workingReason: decision.reason, acceptedStructos: decision.acceptedStructos });
    additions.filter((item) => item.afterId === clause.id).forEach((item) => result.push({ ...item, added: true, workingAction: item.deleted ? 'deleted' : 'added', workingText: item.text, workingReason: item.reason }));
  });
  additions.filter((item) => !item.afterId || !record.clauses.some((clause) => clause.id === item.afterId)).forEach((item) => result.push({ ...item, added: true, workingAction: item.deleted ? 'deleted' : 'added', workingText: item.text, workingReason: item.reason }));
  return result;
}

function changeStats(record, decisions = record.decisions, additions = record.additions) {
  const values = Object.values(decisions || {}).map(normalizeDecision);
  return {
    changed: values.filter((item) => item.action === 'modified').length,
    deleted: values.filter((item) => item.action === 'deleted').length + (additions || []).filter((item) => item.deleted).length,
    added: (additions || []).filter((item) => !item.deleted).length
  };
}

function sourceLabel(clause) {
  if (clause?.added || clause?.source?.generated) return 'Предложение StructOS — отсутствует в исходном договоре';
  const source = clause?.source || {};
  return `Договор → стр. ${source.page || '—'} → ${source.section || sectionTitle(clause?.section)} → пункт ${source.clause || clause?.number || '—'}`;
}

function sourceButton(clause, compact = false) {
  if (!clause || clause.added || clause.source?.generated) return `<span class="contract-source is-generated">${escapeHtml(sourceLabel(clause))}</span>`;
  return `<button class="contract-source${compact ? ' is-compact' : ''}" type="button" data-contract-source="${escapeHtml(clause.id)}"><span>${escapeHtml(sourceLabel(clause))}</span><i>${compact ? '↗' : 'Показать в договоре'}</i></button>`;
}

function recordTitle(record) {
  const number = record.metadata?.number;
  return number && number !== 'Не обнаружено' ? `Договор № ${number}` : record.original.name;
}

function recordStatus(record) {
  if (record.original.extractionStatus !== 'ready') return { className: 'needs', label: 'Нужно распознать текст' };
  const critical = record.clauses.filter((item) => item.risk === 'critical').length;
  if (critical) return { className: 'critical', label: `${critical} критических риска` };
  return { className: 'ready', label: 'Разбор готов' };
}

function renderTop(record) {
  const stats = record ? changeStats(record) : { changed: 0, deleted: 0, added: 0 };
  return `<header class="contract-command">
    <div class="contract-command-brand"><button class="contract-back" type="button" data-open-panel="projects" aria-label="Вернуться к проектам">←</button><span class="contract-command-mark" aria-hidden="true">≡</span><div><span>STRUCTOS</span><strong>Contract</strong><small>анализ · переговоры · свой договор</small></div></div>
    <div class="contract-command-actions">
      ${record ? `<label class="contract-record-select"><span>Открытый договор</span><select data-contract-record>${workspace.records.map((item) => `<option value="${escapeHtml(item.id)}"${item.id === record.id ? ' selected' : ''}>${escapeHtml(recordTitle(item))}</option>`).join('')}</select></label>` : ''}
      <button class="contract-button is-quiet" type="button" data-contract-action="upload">＋ Загрузить договор</button>
    </div>
  </header>
  <nav class="contract-products" aria-label="Продукты StructOS Contract">
    <button type="button" data-contract-product="analysis" class="${view.product === 'analysis' ? 'is-active' : ''}"><span>01</span><strong>Анализ договора</strong><small>что подписываете</small></button>
    <button type="button" data-contract-product="negotiation" class="${view.product === 'negotiation' ? 'is-active' : ''}"><span>02</span><strong>Переговоры и редактура</strong><small>${record ? `${stats.changed + stats.deleted + stats.added} изменений` : 'было / стало'}</small></button>
    <button type="button" data-contract-product="builder" class="${view.product === 'builder' ? 'is-active' : ''}"><span>03</span><strong>Собрать свой договор</strong><small>на основе или с нуля</small></button>
  </nav>`;
}

function renderStart() {
  const linkedContracts = objectRegistry().flatMap((object) => (object.files || []).filter((file) => file.kind === 'contract').map((file) => ({ object, file })));
  return `<section class="contract-start">
    <div class="contract-start-copy"><span class="contract-kicker">STRUCTOS CONTRACT · ТРИ ЯДРА</span><h1>Договор становится понятным<br>до того, как вы его подпишете</h1><p>Загрузите договор, выберите свою сторону — StructOS разложит деньги, сроки, обязанности, штрафы и каждый значимый пункт. Оригинал останется неизменным.</p><div class="contract-start-actions"><button class="contract-button is-primary" type="button" data-contract-action="upload">Загрузить и разобрать</button><button class="contract-button" type="button" data-contract-action="build-new">Создать договор с нуля</button><button class="contract-link-button" type="button" data-contract-action="demo">Открыть демонстрацию</button></div></div>
    <aside class="contract-original-promise"><span class="contract-lock" aria-hidden="true">▣</span><strong>Оригинал защищён</strong><p>Загруженный файл сохраняется отдельно. Изменения создают новую редакцию и полную историю.</p><ul><li>оригинал не перезаписывается</li><li>удалённые пункты остаются в истории</li><li>каждый вывод связан с источником</li></ul></aside>
    ${linkedContracts.length ? `<section class="contract-linked-list"><header><div><span class="contract-kicker">ИЗ ВАШИХ ОБЪЕКТОВ</span><h2>Договоры, готовые к разбору</h2></div></header>${linkedContracts.slice(0, 8).map(({ object, file }) => `<article><span>≡</span><div><strong>${escapeHtml(file.name)}</strong><small>${escapeHtml(object.name)} · ${formatMoney(file.size ? `${Math.ceil(file.size / 1024)} КБ` : 'файл')}</small></div><button type="button" data-contract-linked-upload="${escapeHtml(object.id)}">Выбрать файл</button></article>`).join('')}</section>` : ''}
    <div class="contract-flow-strip"><span>Загрузить</span><i>→</i><span>Выбрать сторону</span><i>→</i><span>Понять риски</span><i>→</i><span>Изменить</span><i>→</i><span>Получить договор</span></div>
  </section>`;
}

function renderLoading() {
  return `<section class="contract-loading" role="status" aria-live="polite"><div class="contract-loading-mark"><span></span><span></span><span></span></div><span class="contract-kicker">STRUCTOS CONTRACT ANALYSIS</span><h1>${escapeHtml(loadingMessage || 'Разбираем договор')}</h1><p>Оригинальный файл уже защищён. StructOS извлекает пункты и связывает каждый вывод с источником.</p><div class="contract-loading-line"><i></i></div></section>`;
}

function renderModeSwitch() {
  return `<div class="contract-mode-switch" role="group" aria-label="Режим просмотра">
    ${[['simple', 'Просто'], ['detailed', 'Подробно'], ['original', 'Оригинал']].map(([id, label]) => `<button type="button" data-contract-mode="${id}" class="${view.mode === id ? 'is-active' : ''}">${label}</button>`).join('')}
  </div>`;
}

function renderWorkspace(record) {
  if (view.product === 'builder') return renderBuilder(record);
  const status = recordStatus(record);
  return `<section class="contract-workspace">
    <div class="contract-record-head">
      <div><div class="contract-record-meta"><span class="contract-status is-${status.className}">${escapeHtml(status.label)}</span><span>${escapeHtml(CONTRACT_ROLES[record.role])}</span><span>${escapeHtml(record.objectName || 'Не связан с объектом')}</span>${record.original.demo ? '<span class="is-demo">Демонстрация</span>' : ''}</div><h1>${escapeHtml(recordTitle(record))}</h1><p>${escapeHtml(record.original.name)} · оригинал сохранён ${formatDateTime(record.original.storedAt)}</p></div>
      <div class="contract-record-head-actions">${renderModeSwitch()}<button class="contract-icon-button" type="button" data-contract-action="download-original" title="Скачать оригинал" aria-label="Скачать оригинал">⇩</button></div>
    </div>
    ${record.original.extractionStatus !== 'ready' ? renderRecognitionNotice(record) : ''}
    <div class="contract-workspace-grid">
      ${renderWorkspaceNav(record)}
      <main class="contract-main-surface">${renderSection(record)}</main>
      ${renderDecisionRail(record)}
    </div>
    ${renderFinalActions(record)}
    ${renderChat(record)}
  </section>`;
}

function renderRecognitionNotice(record) {
  return `<section class="contract-recognition-notice"><span>!</span><div><strong>Текст в файле не распознан</strong><p>StructOS сохранил оригинал, но не формирует юридические выводы без текста-источника. Для скана или старого DOC вставьте распознанный текст — выдуманные условия не появятся.</p></div><button class="contract-button is-primary" type="button" data-contract-action="paste-text">Вставить текст договора</button></section>`;
}

function renderWorkspaceNav(record) {
  const critical = record.clauses.filter((item) => item.risk === 'critical').length;
  const attention = record.clauses.filter((item) => item.risk === 'attention').length;
  const changed = changeStats(record);
  const sections = view.product === 'negotiation'
    ? [['clauses', 'Редактор пунктов', changed.changed + changed.deleted], ['missing', 'Чего не хватает', record.missing.filter((item) => !item.addedId).length], ['versions', 'Версии договора', record.versions.length], ['crosscheck', 'Связать документы', 0]]
    : [['overview', 'Паспорт договора', 0], ['meaning', 'Что это значит', 0], ['money', 'Деньги', 0], ['calendar', 'Календарь', record.calendar.length], ['unpaid', 'За что не заплатят', critical], ['risks', 'Штрафы и риски', critical + attention], ['sections', 'Разделы договора', record.clauses.length], ['clauses', 'Все пункты', record.clauses.length], ['missing', 'Чего не хватает', record.missing.length], ['crosscheck', 'Проект ↔ Смета ↔ Договор', 0], ['versions', 'Версии', record.versions.length]];
  return `<aside class="contract-section-nav"><span class="contract-nav-label">${view.product === 'analysis' ? 'РАЗБОР ДОГОВОРА' : 'РАБОЧАЯ РЕДАКЦИЯ'}</span>${sections.map(([id, label, count]) => `<button type="button" data-contract-section="${id}" class="${view.section === id ? 'is-active' : ''}"><span>${escapeHtml(label)}</span>${count ? `<b>${count}</b>` : '<i>›</i>'}</button>`).join('')}</aside>`;
}

function renderDecisionRail(record) {
  const stats = changeStats(record);
  const critical = record.clauses.filter((item) => item.risk === 'critical').length;
  const attention = record.clauses.filter((item) => item.risk === 'attention').length;
  return `<aside class="contract-decision-rail">
    <section><span class="contract-kicker">ВАШЕ РЕШЕНИЕ</span><div class="contract-score-ring" style="--score:${Math.max(8, 100 - critical * 17 - attention * 4)}"><strong>${Math.max(8, 100 - critical * 17 - attention * 4)}</strong><small>из 100</small></div><p>${critical ? 'Есть условия, которые могут привести к потере денег.' : 'Критических условий не обнаружено автоматическими правилами.'}</p></section>
    <section class="contract-change-mini"><div><span>Изменено</span><b>${stats.changed}</b></div><div><span>Удалено</span><b>${stats.deleted}</b></div><div><span>Добавлено</span><b>${stats.added}</b></div></section>
    <button class="contract-button is-primary" type="button" data-contract-action="save-version">Сохранить редакцию</button>
    <button class="contract-button" type="button" data-contract-section-jump="missing">Добавить защитные пункты</button>
    <small class="contract-legal-note">StructOS помогает выявлять и формулировать условия, но не заменяет индивидуальную консультацию юриста.</small>
  </aside>`;
}

function renderSection(record) {
  if (view.mode === 'original') return renderOriginal(record);
  const renderer = {
    overview: renderPassport,
    meaning: renderMeaning,
    money: renderMoney,
    calendar: renderCalendar,
    unpaid: renderUnpaid,
    risks: renderRisks,
    sections: renderSections,
    clauses: renderClauses,
    missing: renderMissing,
    crosscheck: renderCrosscheck,
    versions: renderVersions
  }[view.section] || renderPassport;
  return renderer(record);
}

function surfaceHead(kicker, title, copyText = '', action = '') {
  return `<header class="contract-surface-head"><div><span class="contract-kicker">${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2>${copyText ? `<p>${escapeHtml(copyText)}</p>` : ''}</div>${action}</header>`;
}

function metadataSource(record, key) {
  return clauseById(record, record.metadata?.sources?.[key]);
}

function passportCell(record, label, value, sourceKey = '') {
  const missing = value == null || value === '' || value === 'Не обнаружено';
  const display = sourceKey === 'price' && !missing ? formatMoney(value) : asText(value) || 'Не обнаружено';
  const source = sourceKey ? metadataSource(record, sourceKey) : null;
  const manual = Boolean(record.metadata?.manual?.[sourceKey]);
  return `<article class="contract-passport-cell${missing ? ' is-missing' : ''}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(display)}</strong>${manual ? '<small>Уточнено пользователем; оригинал не изменён</small>' : ''}${source ? sourceButton(source, true) : `<small>${missing ? 'В договоре не обнаружено' : manual ? 'Рабочие данные' : 'Данные договора'}</small>`}</article>`;
}

function renderPassport(record) {
  const critical = record.clauses.filter((item) => item.risk === 'critical').length;
  const attention = record.clauses.filter((item) => item.risk === 'attention').length;
  const normal = record.clauses.filter((item) => item.risk === 'normal').length;
  const meta = record.metadata;
  return `<section class="contract-surface">
    ${surfaceHead('ПАСПОРТ ДОГОВОРА', 'Главное на одном экране', 'Сначала факты, затем риски. Каждое найденное значение связано с пунктом договора.', '<button class="contract-button" type="button" data-contract-action="edit-passport">Проверить данные</button>')}
    <div class="contract-passport-hero"><div><span>ДОГОВОР №</span><strong>${escapeHtml(meta.number || 'Не обнаружено')}</strong><small>${escapeHtml(meta.date || 'Дата не обнаружена')}</small>${metadataSource(record, 'number') ? sourceButton(metadataSource(record, 'number'), true) : ''}</div><div><span>ВЫ АНАЛИЗИРУЕТЕ КАК</span><strong>${escapeHtml(CONTRACT_ROLES[record.role])}</strong><small>Все выводы показаны с этой позиции</small></div><span class="contract-passport-lock">ОРИГИНАЛ<br>НЕИЗМЕНЯЕМ</span></div>
    <div class="contract-passport-grid">
      ${passportCell(record, 'Заказчик', meta.customer, 'customer')}
      ${passportCell(record, 'Подрядчик', meta.contractor, 'contractor')}
      ${passportCell(record, 'Объект', meta.object, 'object')}
      ${passportCell(record, 'Предмет договора', meta.subject, 'subject')}
      ${passportCell(record, 'Стоимость', meta.price, 'price')}
      ${passportCell(record, 'Аванс', meta.advance, 'advance')}
      ${passportCell(record, 'Срок начала', meta.start, 'deadline')}
      ${passportCell(record, 'Срок окончания', meta.end, 'deadline')}
      ${passportCell(record, 'Гарантия', meta.warranty, 'warranty')}
    </div>
    <div class="contract-passport-secondary">
      ${passportCell(record, 'Порядок оплаты', meta.paymentOrder, 'payment')}
      ${passportCell(record, 'Удержания', meta.retention, 'retention')}
      ${passportCell(record, 'Приложения', meta.attachments, 'attachments')}
      ${passportCell(record, 'Дополнительные соглашения', meta.amendments, 'amendments')}
    </div>
    <div class="contract-risk-summary"><button type="button" data-contract-section-jump="risks" class="is-critical"><span>Критические риски</span><strong>${critical}</strong><small>могут повлиять на деньги</small></button><button type="button" data-contract-section-jump="risks" class="is-attention"><span>Требует внимания</span><strong>${attention}</strong><small>проверить перед подписью</small></button><button type="button" data-contract-section-jump="sections" class="is-normal"><span>Нормальные условия</span><strong>${normal}</strong><small>явных рисков не найдено</small></button></div>
    <section class="contract-first-conclusion"><span>КЛЮЧЕВОЙ ВЫВОД</span><p>${critical ? `До подписания проверьте ${critical} критических ${critical === 1 ? 'условие' : 'условия'}: они могут привести к неоплате, удержанию или несбалансированному расторжению.` : record.clauses.length ? 'Критических рисков автоматическими правилами не обнаружено. Проверьте пункты, отмеченные жёлтым.' : 'Выводы не сформированы: в исходном файле пока нет распознанного текста.'}</p><button type="button" data-contract-section-jump="risks">Открыть риски →</button></section>
  </section>`;
}

function rolePatterns(role) {
  if (role === 'customer') return { own: /заказчик (?:обязан|обязуется)|обязанност[ьи] заказчик/i, other: /подрядчик (?:обязан|обязуется)|исполнитель (?:обязан|обязуется)/i };
  if (role === 'general') return { own: /генподрядчик (?:обязан|обязуется)|заказчик (?:обязан|обязуется)/i, other: /субподрядчик (?:обязан|обязуется)|подрядчик (?:обязан|обязуется)/i };
  if (role === 'supplier') return { own: /поставщик (?:обязан|обязуется)/i, other: /покупатель (?:обязан|обязуется)|заказчик (?:обязан|обязуется)/i };
  return { own: /подрядчик (?:обязан|обязуется)|субподрядчик (?:обязан|обязуется)|исполнитель (?:обязан|обязуется)/i, other: /заказчик (?:обязан|обязуется)|генподрядчик (?:обязан|обязуется)/i };
}

function obligationCards(record, type) {
  const patterns = rolePatterns(record.role);
  const pattern = type === 'own' ? patterns.own : patterns.other;
  const items = record.clauses.filter((clause) => pattern.test(clause.originalText)).slice(0, 12);
  if (!items.length) return '<div class="contract-empty-inline"><strong>В договоре не обнаружено</strong><p>StructOS не создаёт обязанность, которой нет в исходном тексте.</p></div>';
  return items.map((clause) => `<article class="contract-obligation"><span>${type === 'own' ? 'ВАМ НУЖНО' : 'ДРУГАЯ СТОРОНА'}</span><p>${escapeHtml(clause.required || simpleMeaning(clause.section, record.role))}</p>${sourceButton(clause, true)}</article>`).join('');
}

function renderMeaning(record) {
  const subjectClause = metadataSource(record, 'subject');
  return `<section class="contract-surface">
    ${surfaceHead('ПРОСТЫМИ СЛОВАМИ', 'Что этот договор означает для вас', `Позиция: ${CONTRACT_ROLES[record.role]}. Только обязательства, найденные в исходном договоре.`)}
    <div class="contract-meaning-lead"><span aria-hidden="true">“</span><div><p>${subjectClause ? subjectClause.simple : 'Предмет договора в распознанном тексте не обнаружен. StructOS не достраивает его без исходного пункта.'}</p>${subjectClause ? sourceButton(subjectClause, true) : ''}</div></div>
    <div class="contract-obligation-columns"><section><header><span class="is-user">01</span><div><h3>Что обязаны сделать вы</h3><p>${escapeHtml(CONTRACT_ROLES[record.role])}</p></div></header>${obligationCards(record, 'own')}</section><section><header><span class="is-other">02</span><div><h3>Что обязана сделать другая сторона</h3><p>По исходному договору</p></div></header>${obligationCards(record, 'other')}</section></div>
    <section class="contract-meaning-warning"><strong>Важно</strong><p>Если действие не найдено в договоре, StructOS показывает «В договоре не обнаружено», а не достраивает условие самостоятельно.</p></section>
  </section>`;
}

function renderMoney(record) {
  const meta = record.metadata;
  const moneyRisks = record.clauses.filter((item) => ['penalties', 'retentions'].includes(item.section) && item.risk !== 'normal');
  const price = Number(meta.price);
  const riskPercents = moneyRisks.map((item) => [...item.originalText.matchAll(/(\d+(?:[,.]\d+)?)\s*%/g)].map((match) => Number(match[1].replace(',', '.'))).filter(Number.isFinite)).filter((values) => values.length).map((values) => Math.max(...values));
  const potentialPercent = riskPercents.length ? Math.min(100, riskPercents.reduce((sum, value) => sum + value, 0)) : null;
  const maximum = Number.isFinite(price) && potentialPercent != null ? price * potentialPercent / 100 : null;
  const paymentClause = metadataSource(record, 'payment');
  const penaltyClause = record.clauses.find((item) => item.section === 'penalties');
  const stagedPayment = paymentClause && /этап|промежуточн|ежемесяч|по мере выполн/is.test(paymentClause.originalText) ? asText(paymentClause.originalText, 240) : 'В договоре не обнаружено';
  const dependsOnCustomer = paymentClause && /после подписания|после приемки|после приёмки|заказчик.{0,80}(?:подпис|соглас)/is.test(paymentClause.originalText);
  return `<section class="contract-surface">
    ${surfaceHead('ДЕНЬГИ', 'Когда и сколько вы получите', 'Финансовые условия собраны отдельно от юридического текста.')}
    <div class="contract-money-grid">
      ${passportCell(record, 'Цена договора', meta.price, 'price')}
      ${passportCell(record, 'Аванс', meta.advance, 'advance')}
      ${passportCell(record, 'Промежуточные платежи', stagedPayment, 'payment')}
      ${passportCell(record, 'Срок оплаты', meta.paymentTerm, 'payment')}
      ${passportCell(record, 'Гарантийное удержание', meta.retention, 'retention')}
      ${passportCell(record, 'Другие удержания', record.clauses.find((item) => item.section === 'retentions')?.originalText || 'Не обнаружено', 'retention')}
      ${passportCell(record, 'Штрафы и пени', penaltyClause?.originalText || 'Не обнаружено')}
      <article class="contract-passport-cell ${maximum == null ? 'is-missing' : ''}"><span>Максимальная потенциальная сумма</span><strong>${maximum == null ? 'Не удалось рассчитать' : escapeHtml(formatMoney(maximum))}</strong><small>${maximum == null ? 'Нет однозначной базы и предела в тексте' : `${potentialPercent}% цены · сумма найденных предельных санкций и удержаний`}</small></article>
    </div>
    <section class="contract-payment-route"><header><span>ПУТЬ ДО ДЕНЕГ</span><strong>${escapeHtml(meta.paymentTerm || 'Срок не обнаружен')}</strong></header><div>${['Работы выполнены', 'Документы переданы', 'Проверка', 'Подписание', 'Срок ожидания', 'Деньги'].map((label, index) => `<span><b>${index + 1}</b><em>${label}</em></span>${index < 5 ? '<i>→</i>' : ''}`).join('')}</div>${paymentClause ? sourceButton(paymentClause) : '<p class="contract-not-found">Порядок оплаты в договоре не обнаружен.</p>'}</section>
    ${dependsOnCustomer ? `<section class="contract-money-alert"><span>!</span><div><strong>Срок оплаты зависит от действия Заказчика</strong><p>Отсчёт начинается после подписания или согласования. Если срок такого действия не установлен, оплату можно затягивать.</p>${sourceButton(paymentClause, true)}</div><button type="button" data-contract-clause-propose="${escapeHtml(paymentClause.id)}">Предложить защитную редакцию</button></section>` : ''}
    <section class="contract-money-original"><h3>Порядок оплаты в оригинале</h3><p>${escapeHtml(meta.paymentOrder || 'В договоре не обнаружено')}</p>${paymentClause ? sourceButton(paymentClause) : ''}</section>
  </section>`;
}

function renderCalendar(record) {
  return `<section class="contract-surface">
    ${surfaceHead('КАЛЕНДАРЬ ДОГОВОРА', 'Все даты и сроки', 'Абсолютные даты и относительные сроки собраны из найденных пунктов.', '<button class="contract-button" type="button" data-contract-action="create-tasks">Создать задачи в объекте</button>')}
    ${record.calendar.length ? `<div class="contract-timeline">${record.calendar.map((item, index) => { const clause = clauseById(record, item.sourceClauseId); return `<article><span><b>${String(index + 1).padStart(2, '0')}</b></span><div><small>${item.kind === 'date' ? 'ДАТА' : item.kind === 'period' ? 'ПЕРИОД' : 'ОТНОСИТЕЛЬНЫЙ СРОК'}</small><h3>${escapeHtml(item.title)}</h3><strong>${escapeHtml(item.when)}</strong>${clause ? sourceButton(clause, true) : ''}</div></article>`; }).join('')}</div>` : '<div class="contract-empty-surface"><span>◷</span><h3>Даты и сроки не обнаружены</h3><p>StructOS не создаёт календарные события без источника в договоре.</p></div>'}
    <section class="contract-calendar-link"><div><span class="contract-kicker">СВЯЗЬ С ОБЪЕКТОМ</span><h3>${escapeHtml(record.objectName || 'Объект не выбран')}</h3><p>После связи сроки договора можно превратить в задачи полного цикла.</p></div><button class="contract-button" type="button" data-contract-action="link-object">${record.objectId ? 'Изменить объект' : 'Связать с объектом'}</button></section>
  </section>`;
}

function unpaidItems(record) {
  const patterns = [
    { test: /дополнительн.*работ|допработ/i, title: 'Несогласованные дополнительные работы', copy: 'Если порядок согласования не соблюдён, работы могут оспорить или не оплатить.' },
    { test: /исполнительн.*документ/i, title: 'Не передана исполнительная документация', copy: 'Приёмку и оплату могут задержать до передачи комплекта документов.' },
    { test: /все необходим(?:ые|ое).{0,100}работ(?:ы|а).{0,120}(?:входят|включ[её]н[а-яё]*)|без дополнительной оплаты|оплат[ае] не подлеж(?:ит|ат)/isu, title: 'Работы считаются включёнными в цену', copy: 'Даже неуказанный объём могут потребовать выполнить без дополнительной оплаты.' },
    { test: /нарушени[ея].{0,80}срок|просроч/i, title: 'Нарушен срок выполнения работ', copy: 'Возможны пени, удержания или отказ от договора.' },
    { test: /замечан|мотивированн.*отказ/i, title: 'Не устранены замечания', copy: 'Подписание актов и срок оплаты могут не начаться.' }
  ];
  return patterns.flatMap((config) => {
    const clause = record.clauses.find((item) => config.test.test(item.originalText));
    return clause ? [{ ...config, clause }] : [];
  });
}

function renderUnpaid(record) {
  const items = unpaidItems(record);
  return `<section class="contract-surface">
    ${surfaceHead('ЗА ЧТО МОГУТ НЕ ЗАПЛАТИТЬ', 'Финансовые стоп‑факторы', 'Только сценарии, которые подтверждаются конкретным пунктом договора.')}
    ${items.length ? `<div class="contract-unpaid-list">${items.map((item, index) => `<article><span class="contract-unpaid-index">${String(index + 1).padStart(2, '0')}</span><div><small>${riskIcon(item.clause.risk)} ${riskLabel(item.clause.risk)}</small><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.copy)}</p>${sourceButton(item.clause)}</div><button type="button" data-contract-clause-propose="${escapeHtml(item.clause.id)}">Как защититься</button></article>`).join('')}</div>` : '<div class="contract-empty-surface"><span>✓</span><h3>Подтверждённых стоп‑факторов не найдено</h3><p>Проверьте полный раздел рисков и отсутствующие условия.</p></div>'}
  </section>`;
}

function penaltyAmount(record, clause) {
  const percents = [...clause.originalText.matchAll(/(\d+(?:[,.]\d+)?)\s*%/g)].map((match) => Number(match[1].replace(',', '.'))).filter(Number.isFinite);
  const price = Number(record.metadata.price);
  if (!percents.length) return 'Не удалось рассчитать';
  const max = Math.max(...percents);
  return Number.isFinite(price) ? `${max}% · до ${formatMoney(price * max / 100)}` : `${max}% · база расчёта требует проверки`;
}

function renderRisks(record) {
  const items = record.clauses.filter((item) => item.risk !== 'normal').sort((a, b) => (a.risk === 'critical' ? -1 : 1) - (b.risk === 'critical' ? -1 : 1));
  return `<section class="contract-surface">
    ${surfaceHead('ШТРАФЫ И РИСКИ', 'Что может произойти', 'Финансовые и юридические риски с причиной, источником и предлагаемым действием.')}
    ${items.length ? `<div class="contract-risk-table"><div class="contract-risk-table-head"><span>Риск</span><span>Последствие</span><span>Сумма / предел</span><span>Действие</span></div>${items.map((clause) => `<article class="is-${clause.risk}"><div><small>${riskIcon(clause.risk)} ${riskLabel(clause.risk)}</small><strong>${escapeHtml(sectionTitle(clause.section))}</strong>${sourceButton(clause, true)}</div><p>${escapeHtml(clause.why)}</p><b>${escapeHtml(['penalties', 'retentions'].includes(clause.section) ? penaltyAmount(record, clause) : 'Зависит от события')}</b><button type="button" data-contract-clause-propose="${escapeHtml(clause.id)}">Изменить</button></article>`).join('')}</div>` : '<div class="contract-empty-surface"><span>✓</span><h3>Явных рисков не найдено</h3><p>Автоматические правила не обнаружили критических или требующих внимания условий.</p></div>'}
  </section>`;
}

function renderSections(record) {
  const groups = new Map(CONTRACT_SECTIONS.map(([id, title]) => [id, { id, title, clauses: [] }]));
  record.clauses.forEach((clause) => groups.get(clause.section)?.clauses.push(clause));
  return `<section class="contract-surface">
    ${surfaceHead('СТРУКТУРА ДОГОВОРА', 'Понятные разделы вместо поиска по страницам', 'Если важный раздел не найден, это показано прямо.')}
    <div class="contract-section-map">${[...groups.values()].map((group) => { const risks = group.clauses.map((item) => item.risk); const risk = risks.includes('critical') ? 'critical' : risks.includes('attention') ? 'attention' : group.clauses.length ? 'normal' : 'missing'; return `<button type="button" class="is-${risk}" data-contract-section-filter="${escapeHtml(group.id)}"><span>${group.clauses.length ? riskIcon(risk) : '—'}</span><div><strong>${escapeHtml(group.title)}</strong><small>${group.clauses.length ? `${group.clauses.length} ${group.clauses.length === 1 ? 'пункт' : 'пунктов'}` : 'В договоре не обнаружено'}</small></div><i>→</i></button>`; }).join('')}</div>
  </section>`;
}

function renderClauseCard(record, clause) {
  const decision = decisionFor(record, clause);
  const deleted = clause.added ? clause.deleted : decision.action === 'deleted';
  const changed = clause.added || decision.action === 'modified';
  const currentText = effectiveText(record, clause);
  return `<article class="contract-clause is-${clause.risk || 'attention'}${deleted ? ' is-deleted' : ''}${changed ? ' is-changed' : ''}" data-contract-clause-card="${escapeHtml(clause.id)}">
    <header><div><span>${clause.added ? 'НОВЫЙ ПУНКТ' : `ПУНКТ ${escapeHtml(clause.number)}`}</span><h3>${escapeHtml(clause.title || sectionTitle(clause.section))}</h3></div><div><span class="contract-risk-pill is-${clause.risk || 'attention'}">${riskIcon(clause.risk)} ${riskLabel(clause.risk)}</span>${deleted ? '<span class="contract-change-pill is-delete">Удалено пользователем</span>' : changed ? '<span class="contract-change-pill">Рабочая редакция изменена</span>' : ''}</div></header>
    ${deleted ? `<div class="contract-deleted-copy"><div><p>Пункт исключён из рабочей редакции. Оригинальный текст сохранён в истории.</p><small>${escapeHtml(decision.actor || clause.actor || 'Пользователь')} · ${formatDateTime(decision.updatedAt || clause.updatedAt)}${decision.reason || clause.reason ? ` · ${escapeHtml(decision.reason || clause.reason)}` : ''}</small></div><button type="button" data-contract-clause-restore="${escapeHtml(clause.id)}">Вернуть пункт</button></div>` : `
      ${view.mode === 'detailed' || changed ? `<div class="contract-clause-original"><span>${clause.added ? 'ИСТОЧНИК' : 'ОРИГИНАЛЬНЫЙ ТЕКСТ'}</span><p>${clause.added ? 'В исходном договоре отсутствовал.' : escapeHtml(clause.originalText)}</p></div>` : ''}
      ${changed ? `<div class="contract-clause-current"><span>СТАЛО</span><p>${escapeHtml(currentText)}</p></div>` : ''}
      <div class="contract-clause-explain"><div><span>ПРОСТЫМИ СЛОВАМИ</span><p>${escapeHtml(clause.simple || simpleMeaning(clause.section, record.role))}</p></div><div><span>ЧТО ТРЕБУЕТСЯ ОТ ВАС</span><p>${escapeHtml(clause.required || 'Проверить условие и назначить ответственное лицо.')}</p></div></div>
      ${view.mode === 'detailed' ? `<div class="contract-clause-analysis"><div><span>ПОЧЕМУ ${riskLabel(clause.risk).toUpperCase()}</span><p>${escapeHtml(clause.why || 'Требуется оценка в контексте договора.')}</p></div><div><span>РЕКОМЕНДАЦИЯ STRUCTOS</span><p>${escapeHtml(clause.recommendation || recommendationFor(clause.section, clause.risk))}</p></div></div>` : ''}
      ${view.mode === 'detailed' && !clause.added ? `<div class="contract-clause-proposed"><div><span>ПРЕДЛАГАЕМАЯ РЕДАКЦИЯ STRUCTOS</span><p>${escapeHtml(contextualProposal(record, clause))}</p></div><button type="button" data-contract-clause-propose="${escapeHtml(clause.id)}">Рассмотреть вариант</button></div>` : ''}
    `}
    ${sourceButton(clause)}
    <footer>${deleted ? `<button type="button" data-contract-clause-restore="${escapeHtml(clause.id)}">Оставить как есть</button>` : `<button type="button" data-contract-clause-keep="${escapeHtml(clause.id)}">Оставить как есть</button><button type="button" data-contract-clause-edit="${escapeHtml(clause.id)}">Изменить</button><button class="is-danger" type="button" data-contract-clause-delete="${escapeHtml(clause.id)}">Удалить</button><button class="is-structos" type="button" data-contract-clause-propose="${escapeHtml(clause.id)}">Предложить вариант StructOS</button><button type="button" data-contract-clause-add-after="${escapeHtml(clause.id)}">＋ Пункт после этого</button>`}</footer>
  </article>`;
}

function filteredClauses(record) {
  const all = [...record.clauses, ...record.additions.map((item) => ({ ...item, added: true }))];
  if (view.clauseFilter === 'all') return all;
  if (view.clauseFilter === 'changed') return all.filter((item) => item.added || decisionFor(record, item).action !== 'keep');
  if (['critical', 'attention', 'normal'].includes(view.clauseFilter)) return all.filter((item) => item.risk === view.clauseFilter);
  return all.filter((item) => item.section === view.clauseFilter);
}

function renderClauses(record) {
  const clauses = filteredClauses(record);
  return `<section class="contract-surface">
    ${surfaceHead('РЕДАКТОР ДОГОВОРА', 'Каждый пункт — отдельное решение', 'Оригинал защищён. Любое действие записывается только в рабочую редакцию.', '<button class="contract-button is-primary" type="button" data-contract-action="add-clause">＋ Добавить пункт</button>')}
    <div class="contract-clause-filters">${[['all', 'Все'], ['critical', 'Красные'], ['attention', 'Жёлтые'], ['changed', 'Изменённые']].map(([id, label]) => `<button type="button" data-contract-clause-filter="${id}" class="${view.clauseFilter === id ? 'is-active' : ''}">${label}</button>`).join('')}</div>
    <div class="contract-clause-list">${clauses.length ? clauses.map((clause) => renderClauseCard(record, clause)).join('') : '<div class="contract-empty-surface"><span>≡</span><h3>Пунктов по этому фильтру нет</h3><p>Выберите другой фильтр или добавьте новый пункт.</p></div>'}</div>
  </section>`;
}

function renderMissing(record) {
  const items = record.missing;
  return `<section class="contract-surface">
    ${surfaceHead('ЧЕГО НЕ ХВАТАЕТ', 'Важные условия, которых нет в договоре', 'Это не выводы из исходного текста. Каждый вариант явно отмечен как предложение StructOS.')}
    ${items.length ? `<div class="contract-missing-list">${items.map((item, index) => `<article class="is-${item.risk}"><header><span>${String(index + 1).padStart(2, '0')}</span><div><small>${riskIcon(item.risk)} ${riskLabel(item.risk)}</small><h3>${escapeHtml(item.title)}</h3></div>${item.addedId ? '<b>Добавлено ✓</b>' : ''}</header><p><strong>Почему это важно:</strong> ${escapeHtml(item.why)}</p><div><span>ПРЕДЛОЖЕНИЕ STRUCTOS — ОТСУТСТВУЕТ В ИСХОДНОМ ДОГОВОРЕ</span><p>${escapeHtml(item.proposal)}</p></div><button type="button" data-contract-add-missing="${escapeHtml(item.id)}" ${item.addedId ? 'disabled' : ''}>${item.addedId ? 'Добавлено в редакцию' : 'Добавить в мою редакцию'}</button></article>`).join('')}</div>` : '<div class="contract-empty-surface"><span>✓</span><h3>Базовый набор условий найден</h3><p>StructOS не обнаружил пропусков по текущему чек‑листу.</p></div>'}
  </section>`;
}

function renderCrosscheck(record) {
  const object = linkedObject(record);
  const files = object?.files || [];
  const project = files.find((item) => item.kind === 'project');
  const estimate = files.find((item) => item.kind === 'estimate');
  const contract = files.find((item) => item.kind === 'contract');
  const broadClause = record.clauses.find((item) => /все необходим(?:ые|ое).{0,100}работ(?:ы|а).{0,140}(?:входят|включ[её]н[а-яё]*)|без дополнительной оплаты/isu.test(item.originalText));
  const structuredProject = project && ['analysisData', 'analysisResult', 'result', 'extractedData', 'items', 'positions', 'works', 'specification'].some((key) => project[key] != null);
  const structuredEstimate = estimate && ['analysisData', 'analysisResult', 'result', 'extractedData', 'items', 'positions', 'rows', 'works'].some((key) => estimate[key] != null);
  return `<section class="contract-surface">
    ${surfaceHead('ПЕРЕКРЁСТНАЯ ПРОВЕРКА', 'Проект ↔ Спецификация ↔ Смета ↔ Договор', 'StructOS показывает только подтверждённое наличие документов и выводы с источником.', '<button class="contract-button" type="button" data-contract-action="link-object">Связать с объектом</button>')}
    <div class="contract-document-chain">${[['project', 'Проект', project], ['spec', 'Спецификация', structuredProject ? project : null], ['estimate', 'Смета', estimate], ['contract', 'Договор', contract || record.original]].map(([id, label, file], index) => `<article class="${file ? 'is-ready' : 'is-missing'}"><span>${file ? '✓' : '—'}</span><strong>${label}</strong><small>${file ? escapeHtml(file.name || record.original.name) : 'Не связан'}</small></article>${index < 3 ? '<i>↔</i>' : ''}`).join('')}</div>
    ${!object ? '<div class="contract-crosscheck-note"><strong>Сначала свяжите договор с объектом</strong><p>После связи StructOS увидит, какие проект, спецификация и смета относятся к этому договору.</p></div>' : `
      <section class="contract-crosscheck-object"><span>ОБЪЕКТ</span><h3>${escapeHtml(object.name)}</h3><p>${files.length} связанных документа</p></section>
      <div class="contract-crosscheck-results">
        ${broadClause ? `<article class="is-critical"><span>🔴</span><div><strong>Обнаружена широкая формулировка о включённых работах</strong><p>Она создаёт риск выполнения проектного объёма, которого нет в смете, без дополнительной оплаты.</p>${sourceButton(broadClause, true)}</div><button type="button" data-contract-clause-propose="${escapeHtml(broadClause.id)}">Изменить</button></article>` : ''}
        ${project && !structuredProject ? '<article class="is-wait"><span>◷</span><div><strong>Проект связан, но его позиции ещё не разобраны</strong><p>После анализа проекта появится проверка работ и материалов против договора.</p></div></article>' : ''}
        ${estimate && !structuredEstimate ? '<article class="is-wait"><span>◷</span><div><strong>Смета связана, но её позиции ещё не разобраны</strong><p>После анализа сметы появится проверка обязанностей, отсутствующих в стоимости.</p></div></article>' : ''}
        ${!project ? '<article class="is-missing"><span>—</span><div><strong>Проект не загружен</strong><p>Проверка объёма работ по проекту недоступна.</p></div></article>' : ''}
        ${!estimate ? '<article class="is-missing"><span>—</span><div><strong>Смета не загружена</strong><p>Проверка стоимости договорных обязанностей недоступна.</p></div></article>' : ''}
        ${structuredProject || structuredEstimate ? '<article class="is-ready"><span>✓</span><div><strong>Структурированные данные готовы</strong><p>Связанные результаты будут использованы серверным анализом без переноса неподтверждённых позиций.</p></div></article>' : ''}
      </div>`}
  </section>`;
}

function versionSnapshot(record, versionId) {
  const version = record.versions.find((item) => item.id === versionId);
  return version ? { decisions: version.decisions || {}, additions: version.additions || [] } : { decisions: record.decisions, additions: record.additions };
}

function renderVersions(record) {
  const stats = changeStats(record);
  return `<section class="contract-surface">
    ${surfaceHead('ВЕРСИИ ДОГОВОРА', 'Оригинал и каждая сохранённая редакция', 'Оригинал нельзя перезаписать. Новая версия создаётся отдельным снимком.', '<button class="contract-button is-primary" type="button" data-contract-action="save-version">Сохранить новую редакцию</button>')}
    <div class="contract-version-list">
      <article class="is-original"><span class="contract-version-node">00</span><div><small>НЕИЗМЕНЯЕМЫЙ ИСТОЧНИК</small><h3>Оригинал</h3><p>${escapeHtml(record.original.name)}</p><time>${formatDateTime(record.original.storedAt)}</time></div><strong>Изменений: 0</strong><div class="contract-version-actions"><button type="button" data-contract-action="download-original">Скачать</button><button type="button" data-contract-mode="original">Открыть</button></div></article>
      ${record.versions.map((version, index) => { const versionStats = version.stats || changeStats(record, version.decisions, version.additions); return `<article><span class="contract-version-node">${String(index + 1).padStart(2, '0')}</span><div><small>СОХРАНЁННАЯ РЕДАКЦИЯ</small><h3>${escapeHtml(version.label || `Редакция ${index + 1}`)}</h3><p>${escapeHtml(version.actor || 'Пользователь')} · ${versionStats.changed} изм. · ${versionStats.deleted} удал. · ${versionStats.added} доб.</p><time>${formatDateTime(version.createdAt)}</time></div><strong>Изменений: ${versionStats.changed + versionStats.deleted + versionStats.added}</strong><div class="contract-version-actions"><button type="button" data-contract-version-open="${escapeHtml(version.id)}">Открыть</button><button type="button" data-contract-version-compare="${escapeHtml(version.id)}">Сравнить</button><button type="button" data-contract-version-download="${escapeHtml(version.id)}">Скачать</button><button type="button" data-contract-version-new="${escapeHtml(version.id)}">Новая редакция</button></div></article>`; }).join('')}
      <article class="is-current"><span class="contract-version-node">••</span><div><small>ТЕКУЩАЯ РАБОЧАЯ РЕДАКЦИЯ</small><h3>Несохранённые изменения</h3><p>${stats.changed} изменено · ${stats.deleted} удалено · ${stats.added} добавлено</p><time>Обновлено ${formatDateTime(record.updatedAt)}</time></div><strong>${stats.changed + stats.deleted + stats.added}</strong><button class="contract-button" type="button" data-contract-action="save-version">Сохранить</button></article>
    </div>
  </section>`;
}

function renderOriginal(record) {
  const text = record.original.previewText;
  return `<section class="contract-surface contract-original-view">
    ${surfaceHead('ОРИГИНАЛ', record.original.name, 'Режим только для чтения. Изменения применяются исключительно к отдельной рабочей редакции.', '<button class="contract-button" type="button" data-contract-action="download-original">Скачать оригинал</button>')}
    <div class="contract-original-banner"><span>▣</span><div><strong>Оригинал защищён от изменений</strong><p>Дата сохранения: ${formatDateTime(record.original.storedAt)} · ${record.original.pages ? `${record.original.pages} стр.` : 'количество страниц не определено'}</p></div></div>
    ${text ? `<article class="contract-paper"><header><span>STRUCTOS SOURCE VIEW</span><strong>${escapeHtml(recordTitle(record))}</strong></header>${text.split('\f').map((page, index) => `<section id="contract-page-${index + 1}"><span class="contract-paper-page">СТРАНИЦА ${index + 1}</span><pre>${highlightOriginalPage(record, page, index + 1)}</pre></section>`).join('')}</article>` : '<div class="contract-empty-surface"><span>▤</span><h3>Предпросмотр текста недоступен</h3><p>Оригинальный файл сохранён. Скачайте его или вставьте распознанный текст для просмотра и анализа.</p><button class="contract-button is-primary" type="button" data-contract-action="paste-text">Вставить текст</button></div>'}
  </section>`;
}

function highlightOriginalPage(record, page, pageNumber) {
  let html = escapeHtml(page);
  record.clauses.filter((clause) => Number(clause.source?.page || 1) === pageNumber).forEach((clause) => {
    const target = escapeHtml(clause.originalText);
    if (target && html.includes(target)) html = html.replace(target, `<mark id="contract-source-${escapeHtml(clause.id)}">${target}</mark>`);
  });
  return html;
}

function renderFinalActions(record) {
  return `<footer class="contract-final-actions"><div><span class="contract-kicker">ГОТОВЫЕ ДОКУМЕНТЫ</span><h2>Завершите работу с договором</h2><p>Все документы формируются из текущей рабочей редакции. Оригинал не меняется.</p></div><div>
    <button type="button" data-contract-action="save-version"><span>01</span><strong>Сохранить редакцию</strong><small>создать новую версию</small></button>
    <button type="button" data-contract-export="protocol"><span>02</span><strong>Протокол разногласий</strong><small>PDF / DOCX</small></button>
    <button type="button" data-contract-export="changes"><span>03</span><strong>Файл изменений</strong><small>было / стало</small></button>
    <button type="button" data-contract-export="corrected"><span>04</span><strong>Исправленный договор</strong><small>чистая редакция</small></button>
    <button type="button" data-contract-export-direct="docx"><span>05</span><strong>Скачать DOCX</strong><small>чистая редакция</small></button>
    <button type="button" data-contract-export-direct="pdf"><span>06</span><strong>Скачать PDF</strong><small>чистая редакция</small></button>
    <button type="button" data-contract-action="link-object"><span>07</span><strong>Связать с объектом</strong><small>${escapeHtml(record.objectName || 'не связан')}</small></button>
  </div></footer>`;
}

function renderChat(record) {
  const messages = record.chat || [];
  return `<button class="contract-chat-toggle${view.chatOpen ? ' is-open' : ''}" type="button" data-contract-action="toggle-chat"><span aria-hidden="true">OS</span><strong>Спросить StructOS</strong><small>о договоре</small></button>
    <aside class="contract-chat${view.chatOpen ? ' is-open' : ''}" aria-hidden="${view.chatOpen ? 'false' : 'true'}">
      <header><div><span>OS</span><div><strong>StructOS о договоре</strong><small>Ответы только с источниками</small></div></div><button type="button" data-contract-action="toggle-chat" aria-label="Закрыть">×</button></header>
      <div class="contract-chat-suggestions">${['Когда мне должны заплатить?', 'Какие пункты самые опасные?', 'Могут не оплатить допработы?', 'Добавь пункт об оплате простоя'].map((question) => `<button type="button" data-contract-chat-question="${escapeHtml(question)}">${escapeHtml(question)}</button>`).join('')}</div>
      <div class="contract-chat-messages" data-contract-chat-messages>${messages.length ? messages.map((message) => `<article class="is-${message.role}"><span>${message.role === 'user' ? 'ВЫ' : 'OS'}</span><div><p>${escapeHtml(message.text)}</p>${message.sourceClauseId ? sourceButton(clauseById(record, message.sourceClauseId), true) : ''}${message.action ? `<button type="button" data-contract-chat-action="${escapeHtml(message.action.type)}" data-contract-chat-payload="${escapeHtml(message.action.payload || '')}">${escapeHtml(message.action.label)}</button>` : ''}</div></article>`).join('') : '<div class="contract-chat-welcome"><span>≡</span><strong>Спросите договор человеческим языком</strong><p>Я покажу пункт, объясню риск и предложу действие.</p></div>'}</div>
      <form data-contract-chat-form><label><span class="sr-only">Вопрос о договоре</span><textarea name="question" rows="1" maxlength="600" placeholder="Например: когда мне должны заплатить?"></textarea></label><button type="submit" aria-label="Отправить">↑</button></form>
    </aside>`;
}

function renderBuilder(record) {
  return `<section class="contract-builder">
    <header class="contract-builder-hero"><span class="contract-kicker">STRUCTOS CONTRACT BUILDER</span><h1>Собрать свой договор</h1><p>Это отдельное ядро Contract: создайте редакцию на основе загруженного документа или сформируйте договор с нуля.</p></header>
    <div class="contract-builder-paths"><article class="is-source"><span>01</span><h2>На основе загруженного договора</h2><p>Оставляйте нужные пункты, меняйте условия, удаляйте лишнее и добавляйте защитные формулировки. Оригинал останется отдельным.</p><ul><li>редактор каждого пункта</li><li>предложения StructOS</li><li>протокол разногласий</li><li>чистая новая редакция</li></ul>${record ? `<button class="contract-button is-primary" type="button" data-contract-action="edit-current">Редактировать ${escapeHtml(recordTitle(record))}</button>` : '<button class="contract-button is-primary" type="button" data-contract-action="upload">Загрузить договор</button>'}</article><article class="is-new"><span>02</span><h2>Создать договор с нуля</h2><p>Ответьте на вопросы о сторонах, работах, деньгах, сроках и гарантиях. StructOS подготовит структуру, которую можно редактировать теми же инструментами.</p><ul><li>договор подряда или поставки</li><li>деньги и этапы оплаты</li><li>дополнительные работы</li><li>приёмка и документация</li></ul><button class="contract-button is-primary" type="button" data-contract-action="build-new">Начать конструктор</button></article></div>
    ${workspace.records.length ? `<section class="contract-builder-records"><header><span class="contract-kicker">ВАШИ ДОГОВОРЫ</span><h2>Продолжить работу</h2></header><div>${workspace.records.map((item) => { const stats = changeStats(item); return `<button type="button" data-contract-open-record="${escapeHtml(item.id)}"><span>≡</span><div><strong>${escapeHtml(recordTitle(item))}</strong><small>${escapeHtml(item.original.name)} · ${stats.changed + stats.deleted + stats.added} изменений</small></div><i>→</i></button>`; }).join('')}</div></section>` : ''}
  </section>`;
}

function ensureContractDialog() {
  let dialog = document.querySelector('[data-contract-dialog]');
  if (dialog) return dialog;
  dialog = document.createElement('dialog');
  dialog.className = 'contract-dialog';
  dialog.dataset.contractDialog = '';
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.body.append(dialog);
  return dialog;
}

function closeContractDialog() {
  const dialog = document.querySelector('[data-contract-dialog]');
  if (dialog?.open) dialog.close();
}

function openContractDialog({ kicker = 'STRUCTOS CONTRACT', title, copyText = '', body, submitLabel = '', onSubmit = null, wide = false }) {
  const dialog = ensureContractDialog();
  dialog.classList.toggle('is-wide', wide);
  dialog.innerHTML = `<form class="contract-dialog-window" data-contract-dialog-form><header><div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2>${copyText ? `<p>${escapeHtml(copyText)}</p>` : ''}</div><button type="button" data-contract-dialog-close aria-label="Закрыть">×</button></header><div class="contract-dialog-body">${body}</div>${submitLabel ? `<footer><button class="contract-button" type="button" data-contract-dialog-close>Отмена</button><button class="contract-button is-primary" type="submit">${escapeHtml(submitLabel)}</button></footer>` : ''}</form>`;
  dialog.querySelectorAll('[data-contract-dialog-close]').forEach((button) => button.addEventListener('click', closeContractDialog));
  const form = dialog.querySelector('[data-contract-dialog-form]');
  if (onSubmit) form.addEventListener('submit', async (event) => { event.preventDefault(); await onSubmit(new FormData(form), form); });
  dialog.showModal();
  requestAnimationFrame(() => (dialog.querySelector('.contract-dialog-body input:not([type="hidden"]),.contract-dialog-body textarea,.contract-dialog-body select') || dialog.querySelector('button'))?.focus());
  return { dialog, form };
}

function uploadSetup(file) {
  const objects = objectRegistry();
  const selectedObject = objects.find((item) => String(item.id) === String(pendingObjectId));
  openContractDialog({
    title: 'Кем вы являетесь в договоре?',
    copyText: 'StructOS выполнит весь анализ с позиции выбранной стороны.',
    body: `<section class="contract-upload-file"><span>≡</span><div><strong>${escapeHtml(file.name)}</strong><small>${Math.max(1, Math.ceil(file.size / 1024))} КБ · оригинал будет сохранён отдельно</small></div><b>✓</b></section>
      <fieldset class="contract-role-picker"><legend>Ваша сторона</legend>${Object.entries(CONTRACT_ROLES).map(([id, label], index) => `<label><input type="radio" name="role" value="${id}" ${id === 'contractor' ? 'checked' : ''}><span><b>${String(index + 1).padStart(2, '0')}</b><strong>${escapeHtml(label)}</strong></span></label>`).join('')}</fieldset>
      <label class="contract-dialog-field"><span>Связать с объектом <small>необязательно</small></span><select name="objectId"><option value="">Не связывать сейчас</option>${objects.map((item) => `<option value="${escapeHtml(item.id)}"${selectedObject?.id === item.id ? ' selected' : ''}>${escapeHtml(item.name)}</option>`).join('')}</select></label>
      <div class="contract-dialog-safety"><span>▣</span><p><strong>Оригинал никогда не перезаписывается.</strong> Все последующие изменения будут отдельной рабочей редакцией.</p></div>`,
    submitLabel: 'Начать анализ',
    onSubmit: async (data) => {
      const role = String(data.get('role') || 'contractor');
      const objectId = String(data.get('objectId') || '');
      closeContractDialog();
      await analyzeUploadedFile(file, role, objectId);
    },
    wide: true
  });
}

async function analyzeUploadedFile(file, role, objectId) {
  const object = objectRegistry().find((item) => String(item.id) === objectId);
  const recordId = uid('contract');
  loadingMessage = 'Сохраняем неизменяемый оригинал';
  renderContract();
  try { await storeOriginal(recordId, file); }
  catch (error) { console.warn('Original contract storage failed:', error); }
  loadingMessage = 'Извлекаем текст и нумерацию пунктов';
  renderContract();
  let extraction = { text: '', pages: null, method: 'Требуется распознавание' };
  try { extraction = await extractContractText(file); }
  catch (error) { console.warn('Contract text extraction failed:', error); extraction.method = 'Ошибка извлечения — требуется распознавание'; }
  const hasText = extraction.text.replace(/\s/g, '').length > 120;
  loadingMessage = hasText ? 'Связываем выводы с пунктами договора' : 'Проверяем доступность текста';
  renderContract();
  let record = hasText
    ? analyzeTextRecord({ text: extraction.text, file, role, objectId, objectName: object?.name || '', pages: extraction.pages, method: extraction.method })
    : makeEmptyUploadedRecord({ file, role, objectId, objectName: object?.name || '', method: extraction.method });
  record.id = recordId;
  record.original.storedAt = nowIso();
  updateRecord(record);
  loadingMessage = '';
  view.product = 'analysis';
  view.section = 'overview';
  view.mode = 'simple';
  pendingFile = null;
  pendingObjectId = '';
  renderContract();
  showContractToast(hasText ? 'Разбор договора готов' : 'Оригинал сохранён. Для выводов нужен распознанный текст.');
}

function openPasteText(record) {
  openContractDialog({
    title: 'Вставить распознанный текст',
    copyText: 'Пункты будут построены только по этому тексту. Исходный файл останется неизменным.',
    body: `<label class="contract-dialog-field"><span>Текст договора</span><textarea name="contractText" rows="15" maxlength="600000" placeholder="Вставьте полный текст с номерами пунктов…"></textarea></label><div class="contract-dialog-safety"><span>i</span><p>Если между страницами поставить разрыв страницы, StructOS сохранит номер страницы в источнике. Обычный текст без разрывов будет привязан к странице 1.</p></div>`,
    submitLabel: 'Разобрать текст',
    onSubmit: async (data, form) => {
      const text = String(data.get('contractText') || '').trim();
      if (text.length < 120) { showContractToast('Вставьте не менее 120 символов текста договора'); form.querySelector('textarea').focus(); return; }
      const analyzed = analyzeTextRecord({ text, file: { name: record.original.name, size: record.original.size, type: record.original.type }, role: record.role, objectId: record.objectId, objectName: record.objectName, origin: record.origin, method: 'Текст вставлен пользователем' });
      record.metadata = analyzed.metadata;
      record.clauses = analyzed.clauses;
      record.decisions = analyzed.decisions;
      record.additions = [];
      record.missing = analyzed.missing;
      record.calendar = analyzed.calendar;
      record.original.previewText = asText(text, 120000);
      record.original.extractionMethod = 'Текст вставлен пользователем';
      record.original.extractionStatus = 'ready';
      updateRecord(record);
      closeContractDialog();
      renderContract();
      showContractToast('Текст разобран. Выводы связаны с найденными пунктами.');
    },
    wide: true
  });
}

function openPassportEditor(record) {
  const meta = record.metadata;
  const fields = [['number', 'Номер договора'], ['date', 'Дата договора'], ['customer', 'Заказчик'], ['contractor', 'Подрядчик'], ['object', 'Объект'], ['subject', 'Предмет договора'], ['price', 'Стоимость, ₽'], ['advance', 'Аванс'], ['paymentTerm', 'Срок оплаты'], ['start', 'Начало работ'], ['end', 'Окончание работ'], ['warranty', 'Гарантия'], ['retention', 'Удержания']];
  openContractDialog({ title: 'Проверить паспорт договора', copyText: 'Исправление паспортных данных не меняет текст оригинала.', body: `<div class="contract-dialog-grid">${fields.map(([id, label]) => `<label class="contract-dialog-field"><span>${escapeHtml(label)}</span><input name="${id}" value="${escapeHtml(meta[id] === 'Не обнаружено' ? '' : meta[id])}" placeholder="Не обнаружено"></label>`).join('')}</div>`, submitLabel: 'Сохранить данные', onSubmit: (data) => {
    const beforeValues = Object.fromEntries(fields.map(([id]) => [id, meta[id]]));
    const before = fields.map(([id, label]) => `${label}: ${meta[id] ?? 'Не обнаружено'}`).join('; ');
    fields.forEach(([id]) => { const value = asText(data.get(id), id === 'subject' ? 800 : 240); meta[id] = id === 'price' ? (extractNumber(value) ?? (value || 'Не обнаружено')) : (value || 'Не обнаружено'); });
    meta.manual ||= {};
    fields.forEach(([id]) => { if (String(beforeValues[id] ?? '') !== String(meta[id] ?? '')) meta.manual[id] = true; });
    record.objectName = meta.object !== 'Не обнаружено' ? meta.object : record.objectName;
    appendAudit(record, { type: 'passport-updated', before, after: fields.map(([id, label]) => `${label}: ${meta[id] ?? 'Не обнаружено'}`).join('; '), reason: 'Данные проверены пользователем' });
    updateRecord(record); closeContractDialog(); renderContract(); showContractToast('Паспорт договора обновлён');
  }, wide: true });
}

function openObjectLink(record) {
  const objects = objectRegistry();
  if (!objects.length) { showContractToast('Сначала создайте объект в разделе «Проекты»'); return; }
  openContractDialog({ title: 'Связать договор с объектом', copyText: 'Это позволит сопоставить договор с проектом, спецификацией и сметой.', body: `<label class="contract-dialog-field"><span>Объект</span><select name="objectId" required><option value="">Выберите объект</option>${objects.map((item) => `<option value="${escapeHtml(item.id)}"${String(item.id) === String(record.objectId) ? ' selected' : ''}>${escapeHtml(item.name)}</option>`).join('')}</select></label>`, submitLabel: 'Связать', onSubmit: (data) => {
    const object = objects.find((item) => String(item.id) === String(data.get('objectId')));
    if (!object) return;
    record.objectId = String(object.id); record.objectName = object.name; if (record.metadata.object === 'Не обнаружено') record.metadata.object = object.name;
    updateRecord(record); closeContractDialog(); renderContract(); showContractToast('Договор связан с объектом');
  } });
}

function openBuilderForm() {
  openContractDialog({
    kicker: 'STRUCTOS CONTRACT BUILDER',
    title: 'Создать договор с нуля',
    copyText: 'Заполните ключевые условия. После создания каждый пункт откроется в редакторе.',
    body: `<div class="contract-builder-form">
      <section><h3>1. Договор и стороны</h3><div class="contract-dialog-grid"><label class="contract-dialog-field"><span>Тип договора</span><select name="type"><option>Договор подряда</option><option>Договор субподряда</option><option>Договор поставки</option><option>Смешанный договор</option></select></label><label class="contract-dialog-field"><span>Номер</span><input name="number" placeholder="Например, 47-ЭОМ"></label><label class="contract-dialog-field"><span>Заказчик</span><input name="customer" required placeholder="Организация или ФИО"></label><label class="contract-dialog-field"><span>Подрядчик / Поставщик</span><input name="contractor" required placeholder="Организация или ФИО"></label></div></section>
      <section><h3>2. Объект и объём</h3><div class="contract-dialog-grid"><label class="contract-dialog-field"><span>Объект</span><input name="object" required placeholder="Название и адрес"></label><label class="contract-dialog-field is-wide"><span>Виды работ / предмет поставки</span><textarea name="works" rows="3" required placeholder="Что именно должен выполнить Подрядчик"></textarea></label><label class="contract-dialog-field"><span>Материалы</span><select name="materials"><option>Материалы Подрядчика</option><option>Материалы Заказчика</option><option>По ведомости разделения поставки</option></select></label><label class="contract-dialog-field"><span>Исполнительная документация</span><input name="executive" value="Передаётся вместе с актами выполненных работ"></label></div></section>
      <section><h3>3. Деньги</h3><div class="contract-dialog-grid"><label class="contract-dialog-field"><span>Стоимость, ₽</span><input name="price" type="number" min="0" step="0.01" required></label><label class="contract-dialog-field"><span>Аванс</span><input name="advance" placeholder="Например, 20%"></label><label class="contract-dialog-field is-wide"><span>Порядок оплаты</span><textarea name="payment" rows="2" required>Оплата производится в течение 10 рабочих дней после подписания КС-2 и КС-3. Заказчик рассматривает документы в течение 5 рабочих дней.</textarea></label><label class="contract-dialog-field"><span>Удержания</span><input name="retention" placeholder="Нет или процент и возврат"></label><label class="contract-dialog-field"><span>Штрафы</span><input name="penalty" value="0,1% за день, но не более 10% обязательства"></label></div></section>
      <section><h3>4. Сроки и приёмка</h3><div class="contract-dialog-grid"><label class="contract-dialog-field"><span>Начало работ</span><input name="start" placeholder="Дата или событие"></label><label class="contract-dialog-field"><span>Окончание работ</span><input name="end" placeholder="Дата или период"></label><label class="contract-dialog-field"><span>Гарантия</span><input name="warranty" value="24 месяца"></label><label class="contract-dialog-field"><span>Приёмка</span><input name="acceptance" value="5 рабочих дней на подписание или мотивированный отказ"></label><label class="contract-dialog-field is-wide"><span>Дополнительные работы</span><textarea name="extras" rows="2">Выполняются после письменного согласования состава, стоимости и влияния на сроки.</textarea></label><label class="contract-dialog-field is-wide"><span>Другие условия</span><textarea name="other" rows="3" placeholder="Особые условия, простой, порядок доступа, режим работ…"></textarea></label></div></section>
    </div>`,
    submitLabel: 'Сформировать первоначальный договор',
    onSubmit: async (data) => {
      const value = Object.fromEntries(data.entries());
      const text = buildContractText(value);
      const file = new File([text], `${safeFileName(value.type)} №${safeFileName(value.number || 'без номера')}.txt`, { type: 'text/plain' });
      const record = analyzeTextRecord({ text, file, role: /поставк/i.test(value.type) ? 'supplier' : 'contractor', objectName: value.object, origin: 'builder', method: 'Создано StructOS Contract' });
      record.metadata = { ...record.metadata, number: value.number || 'Без номера', date: new Intl.DateTimeFormat('ru-RU').format(new Date()), customer: value.customer, contractor: value.contractor, object: value.object, subject: value.works, price: extractNumber(value.price) ?? value.price, advance: value.advance || 'Не предусмотрен', paymentTerm: value.payment, start: value.start || 'Не указано', end: value.end || 'Не указано', warranty: value.warranty || 'Не указано', retention: value.retention || 'Не предусмотрено' };
      record.original.generated = true;
      record.clauses = record.clauses.map((clause) => ({ ...clause, source: { ...clause.source, generated: true }, addedByStructos: true }));
      record.missing = detectMissing(text);
      try { await storeOriginal(record.id, file); } catch {}
      updateRecord(record);
      closeContractDialog();
      view.product = 'negotiation'; view.section = 'clauses'; view.mode = 'detailed';
      renderContract();
      showContractToast('Первоначальный договор создан. Проверьте каждый пункт.');
    },
    wide: true
  });
}

function buildContractText(value) {
  const lines = [
    `${value.type || 'ДОГОВОР ПОДРЯДА'} № ${value.number || 'БЕЗ НОМЕРА'}`,
    `Заказчик: ${value.customer}`,
    `Подрядчик: ${value.contractor}`,
    `Объект: ${value.object}`,
    `1.1 Подрядчик обязуется выполнить следующие работы: ${value.works}. Заказчик обязуется принять и оплатить результат в соответствии с настоящим договором.`,
    `1.2 ${value.materials || 'Материалы предоставляются в соответствии с согласованной ведомостью.'}. Стороны оформляют передачу материалов документально.`,
    `2.1 Стоимость работ составляет ${value.price || '0'} рублей. Изменение стоимости допускается только письменным дополнительным соглашением сторон.`,
    value.advance ? `2.2 Заказчик выплачивает аванс в размере ${value.advance}. Порядок зачёта аванса указывается в актах выполненных работ.` : '2.2 Аванс договором не предусмотрен.',
    `2.3 ${value.payment}.`,
    value.retention ? `2.4 Удержания: ${value.retention}. Иные удержания допускаются только по письменному соглашению сторон или на основании закона.` : '2.4 Гарантийные и иные удержания не предусмотрены.',
    `3.1 Начало работ: ${value.start || 'после передачи готового фронта работ по акту'}. Окончание работ: ${value.end || 'по согласованному календарному графику'}.`,
    '3.2 При задержке передачи фронта работ, документации, материалов Заказчика или согласований срок выполнения работ продлевается на соответствующий период.',
    `4.1 Дополнительные работы: ${value.extras || 'выполняются только после письменного согласования состава, стоимости и срока'}.`,
    `5.1 Приёмка: ${value.acceptance || 'Заказчик подписывает акт или направляет мотивированный отказ в течение 5 рабочих дней'}.`,
    `5.2 Исполнительная документация: ${value.executive || 'передаётся вместе с актами выполненных работ'}.`,
    `6.1 Гарантийный срок составляет ${value.warranty || '24 месяца'} с даты подписания итогового акта.`,
    `7.1 Ответственность сторон: ${value.penalty || 'пеня 0,1% за день, но не более 10% стоимости просроченного обязательства'}. Ответственность применяется взаимно.`,
    '8.1 Документально подтверждённый простой по вине Заказчика оплачивается Заказчиком, а срок работ продлевается на период простоя.',
    '9.1 Подрядчик вправе приостановить работы после письменного уведомления при непередаче фронта работ, документации или просрочке оплаты более 10 рабочих дней.',
    '10.1 При расторжении Заказчик оплачивает фактически выполненные работы, принятые материалы и подтверждённые расходы Подрядчика.',
    '11.1 Споры разрешаются в претензионном порядке. Срок ответа на претензию — 10 рабочих дней.',
    value.other ? `12.1 Особые условия: ${value.other}.` : '12.1 Иные условия оформляются письменными дополнительными соглашениями.'
  ];
  return lines.join('\n');
}

function openClauseEditor(record, clause, initialText = null, acceptedStructos = false) {
  const before = clause.added ? clause.text : clause.originalText;
  const current = initialText ?? effectiveText(record, clause);
  openContractDialog({ title: `${clause.added ? 'Новый пункт' : `Пункт ${clause.number}`} — изменить`, copyText: 'Оригинальный текст останется в истории.', body: `<div class="contract-before-after"><section><span>БЫЛО</span><p>${escapeHtml(clause.added ? 'Пункт отсутствовал в исходном договоре.' : before)}</p></section><label><span>СТАЛО</span><textarea name="text" rows="9" required maxlength="12000">${escapeHtml(current)}</textarea></label></div><label class="contract-dialog-field"><span>Причина изменения <small>попадёт в файл «Было / Стало»</small></span><textarea name="reason" rows="2" maxlength="1000">${escapeHtml(decisionFor(record, clause).reason || '')}</textarea></label>`, submitLabel: 'Сохранить новую редакцию', onSubmit: (data) => {
    const text = asText(data.get('text'), 12000); const reason = asText(data.get('reason'), 1000);
    const previousText = effectiveText(record, clause);
    if (clause.added) { clause.text = text; clause.reason = reason; clause.updatedAt = nowIso(); clause.actor = currentActor(); clause.acceptedStructos = acceptedStructos || clause.acceptedStructos; }
    else record.decisions[clause.id] = normalizeDecision({ action: text === clause.originalText ? 'keep' : 'modified', text, reason, updatedAt: nowIso(), actor: currentActor(), acceptedStructos });
    appendAudit(record, { type: text === before ? 'clause-kept' : 'clause-modified', clauseId: clause.id, number: clause.number, before: previousText, after: text, reason, source: acceptedStructos ? 'structos' : 'user' });
    updateRecord(record); closeContractDialog(); renderContract(); showContractToast('Рабочая редакция пункта сохранена');
  }, wide: true });
}

function openClauseDelete(record, clause) {
  openContractDialog({ title: `Удалить ${clause.added ? 'новый пункт' : `пункт ${clause.number}`} из редакции?`, copyText: 'Оригинал не будет уничтожен. Действие сохранится в истории.', body: `<section class="contract-delete-preview"><span>БУДЕТ СОХРАНЕНО В ИСТОРИИ</span><p>${escapeHtml(clause.added ? clause.text : clause.originalText)}</p></section><label class="contract-dialog-field"><span>Комментарий к удалению <small>необязательно</small></span><textarea name="reason" rows="3" maxlength="1000" placeholder="Почему пункт нужно исключить"></textarea></label>`, submitLabel: 'Удалить из рабочей редакции', onSubmit: (data) => {
    const reason = asText(data.get('reason'), 1000);
    const previousText = effectiveText(record, clause);
    if (clause.added) { clause.deleted = true; clause.reason = reason; clause.updatedAt = nowIso(); clause.actor = currentActor(); }
    else record.decisions[clause.id] = normalizeDecision({ action: 'deleted', reason, updatedAt: nowIso(), actor: currentActor() });
    appendAudit(record, { type: 'clause-deleted', clauseId: clause.id, number: clause.number, before: previousText, after: 'Удалено', reason });
    updateRecord(record); closeContractDialog(); renderContract(); showContractToast('Пункт удалён из рабочей редакции; оригинал сохранён');
  } });
}

function openStructosProposal(record, clause) {
  const proposal = contextualProposal(record, clause);
  const related = relatedClausesFor(record, clause);
  const { dialog } = openContractDialog({ kicker: 'ПРЕДЛОЖЕНИЕ STRUCTOS', title: clause.added ? clause.title : `Пункт ${clause.number} — ${sectionTitle(clause.section)}`, copyText: `Вариант сформирован с позиции «${CONTRACT_ROLES[record.role]}» и учитывает связанные деньги, документы и сроки.`, body: `<div class="contract-proposal-compare"><section><span>ОРИГИНАЛ</span><p>${escapeHtml(clause.added ? clause.text : clause.originalText)}</p></section><section><span>ПРЕДЛОЖЕНИЕ STRUCTOS</span><p data-contract-proposal-text>${escapeHtml(proposal)}</p></section></div><div class="contract-proposal-reason"><article><span>ПОЧЕМУ ИЗМЕНИТЬ</span><p>${escapeHtml(clause.why || 'Формулировка требует уточнения.')}</p></article><article><span>ЧТО УЛУЧШИТСЯ</span><p>${escapeHtml(clause.recommendation || recommendationFor(clause.section, clause.risk))}</p></article><article><span>ВОЗМОЖНЫЕ ПОСЛЕДСТВИЯ</span><p>Вторая сторона может предложить иной срок, предел ответственности или процедуру. Зафиксируйте итог письменно.</p></article></div>${related.length ? `<section class="contract-proposal-related"><span>СВЯЗАННЫЕ ПУНКТЫ, УЧТЁННЫЕ В РЕДАКЦИИ</span><div>${related.map((item) => sourceButton(item, true)).join('')}</div></section>` : ''}<footer class="contract-proposal-actions"><button class="contract-button" type="button" data-proposal-reject>Отклонить</button><button class="contract-button" type="button" data-proposal-edit>Редактировать</button><button class="contract-button is-primary" type="button" data-proposal-accept>Принять вариант</button></footer>`, wide: true });
  dialog.querySelector('[data-proposal-reject]').addEventListener('click', closeContractDialog);
  dialog.querySelector('[data-proposal-edit]').addEventListener('click', () => { closeContractDialog(); openClauseEditorWithText(record, clause, proposal, true); });
  dialog.querySelector('[data-proposal-accept]').addEventListener('click', () => {
    const previousText = effectiveText(record, clause);
    if (clause.added) { clause.text = proposal; clause.acceptedStructos = true; clause.updatedAt = nowIso(); }
    else record.decisions[clause.id] = normalizeDecision({ action: 'modified', text: proposal, reason: clause.recommendation || 'Рекомендация StructOS', updatedAt: nowIso(), actor: currentActor(), acceptedStructos: true });
    appendAudit(record, { type: 'structos-proposal-accepted', clauseId: clause.id, number: clause.number, before: previousText, after: proposal, reason: clause.recommendation || 'Рекомендация StructOS', source: 'structos' });
    updateRecord(record); closeContractDialog(); renderContract(); showContractToast('Вариант StructOS принят в рабочую редакцию');
  });
}

function openClauseEditorWithText(record, clause, text, acceptedStructos = false) {
  openClauseEditor(record, clause, text, acceptedStructos);
}

function currentActor() {
  return asText(document.querySelector('[data-user-name]')?.textContent, 120) || 'Пользователь';
}

function structosClauseFromInstruction(instruction) {
  const normalized = instruction.toLowerCase();
  const missing = MISSING_CONDITIONS.find((item) => (normalized.includes('прост') && item.id === 'idle-pay') || (normalized.includes('доп') && item.id === 'extras-order') || (normalized.includes('фронт') && item.id === 'workfront') || (normalized.includes('цен') && item.id === 'price-change-order') || (normalized.includes('проект') && normalized.includes('срок') && item.id === 'design-change'));
  if (missing) return { title: missing.title, section: sectionForText(missing.proposal), text: missing.proposal, why: missing.why };
  const section = sectionForText(instruction);
  return { title: sectionTitle(section), section, text: `Стороны согласовали следующее условие: ${instruction.replace(/[.]+$/, '')}. Порядок исполнения, срок и подтверждающие документы фиксируются сторонами в письменной форме.`, why: 'Пункт сформирован по инструкции пользователя и требует согласования со второй стороной.' };
}

function createAddition(record, { afterId = '', title, section, text, reason = '', risk = 'attention', acceptedStructos = false }) {
  const item = {
    id: uid('new-clause'), number: 'NEW', title: title || sectionTitle(section), section: section || sectionForText(text), text: asText(text, 12000), originalText: '', simple: simpleMeaning(section || sectionForText(text), record.role), required: requiredAction(text, section || sectionForText(text)), risk, why: reason || 'Пункт отсутствовал в исходном договоре и добавлен в рабочую редакцию.', recommendation: 'Проверить взаимосвязь с остальными пунктами и согласовать со второй стороной.', proposedText: text, afterId, added: true, source: { generated: true }, reason, updatedAt: nowIso(), actor: currentActor(), acceptedStructos, deleted: false
  };
  record.additions.push(item);
  appendAudit(record, { type: 'clause-added', clauseId: item.id, number: item.number, before: 'Отсутствовал', after: item.text, reason: item.reason, source: acceptedStructos ? 'structos' : 'user' });
  updateRecord(record);
  return item;
}

function openAddClause(record, afterId = '') {
  const { dialog, form } = openContractDialog({ title: 'Добавить новый пункт', copyText: 'Напишите текст сами или опишите, что должен сформировать StructOS.', body: `<fieldset class="contract-add-mode"><label><input type="radio" name="mode" value="manual" checked><span><strong>Написать самостоятельно</strong><small>Ваш точный текст пункта</small></span></label><label><input type="radio" name="mode" value="structos"><span><strong>Попросить StructOS</strong><small>Например: «простой по вине заказчика оплачивается»</small></span></label></fieldset><label class="contract-dialog-field"><span data-contract-add-label>Текст нового пункта</span><textarea name="instruction" rows="7" required maxlength="12000" placeholder="Введите текст пункта…"></textarea></label><label class="contract-dialog-field"><span>Причина добавления <small>необязательно</small></span><textarea name="reason" rows="2" maxlength="1000"></textarea></label>`, submitLabel: 'Добавить в рабочую редакцию', onSubmit: (data) => {
    const instruction = asText(data.get('instruction'), 12000); const mode = String(data.get('mode'));
    const generated = mode === 'structos' ? structosClauseFromInstruction(instruction) : { title: sectionTitle(sectionForText(instruction)), section: sectionForText(instruction), text: instruction, why: asText(data.get('reason'), 1000) };
    createAddition(record, { afterId, ...generated, reason: asText(data.get('reason'), 1000) || generated.why, acceptedStructos: mode === 'structos' });
    closeContractDialog(); view.product = 'negotiation'; view.section = 'clauses'; view.clauseFilter = 'changed'; renderContract(); showContractToast('Новый пункт добавлен в рабочую редакцию');
  }, wide: true });
  form.querySelectorAll('input[name="mode"]').forEach((input) => input.addEventListener('change', () => {
    const structos = form.querySelector('input[name="mode"]:checked')?.value === 'structos';
    form.querySelector('[data-contract-add-label]').textContent = structos ? 'Что должен предусматривать новый пункт' : 'Текст нового пункта';
    form.querySelector('textarea[name="instruction"]').placeholder = structos ? 'Например: Добавь пункт, что простой по вине Заказчика оплачивается' : 'Введите готовый текст пункта…';
  }));
}

function addMissingCondition(record, missingId) {
  const missing = record.missing.find((item) => item.id === missingId);
  if (!missing || missing.addedId) return;
  const item = createAddition(record, { title: missing.title, section: sectionForText(missing.proposal), text: missing.proposal, reason: missing.why, risk: missing.risk, acceptedStructos: true });
  missing.addedId = item.id;
  updateRecord(record);
  renderContract();
  showContractToast('Защитный пункт добавлен в рабочую редакцию');
}

function restoreClause(record, clause) {
  const previousText = clause.added ? (clause.deleted ? 'Удалено' : clause.text) : (decisionFor(record, clause).action === 'deleted' ? 'Удалено' : effectiveText(record, clause));
  if (clause.added) { clause.deleted = false; clause.updatedAt = nowIso(); }
  else record.decisions[clause.id] = normalizeDecision({ action: 'keep' });
  appendAudit(record, { type: 'clause-restored', clauseId: clause.id, number: clause.number, before: previousText, after: clause.added ? clause.text : clause.originalText });
  updateRecord(record); renderContract(); showContractToast('Пункт возвращён в рабочую редакцию');
}

function keepClause(record, clause) {
  const previousText = effectiveText(record, clause);
  if (!clause.added) record.decisions[clause.id] = normalizeDecision({ action: 'keep' });
  appendAudit(record, { type: 'clause-kept', clauseId: clause.id, number: clause.number, before: previousText, after: clause.originalText });
  updateRecord(record); renderContract(); showContractToast('Оригинальная редакция пункта сохранена');
}

function openSaveVersion(record) {
  const next = record.versions.length + 1;
  const stats = changeStats(record);
  openContractDialog({ title: `Сохранить редакцию ${next}`, copyText: `${stats.changed} изменено · ${stats.deleted} удалено · ${stats.added} добавлено`, body: `<label class="contract-dialog-field"><span>Название версии</span><input name="label" value="Редакция ${next}" maxlength="120" required></label><label class="contract-dialog-field"><span>Комментарий <small>необязательно</small></span><textarea name="comment" rows="3" maxlength="1000" placeholder="Например, редакция после переговоров с Заказчиком"></textarea></label><div class="contract-dialog-safety"><span>▣</span><p>Будет создан отдельный снимок. Оригинал и предыдущие версии не изменятся.</p></div>`, submitLabel: 'Сохранить версию', onSubmit: (data) => {
    const version = { id: uid('revision'), label: asText(data.get('label'), 120) || `Редакция ${next}`, comment: asText(data.get('comment'), 1000), createdAt: nowIso(), actor: currentActor(), decisions: clone(record.decisions), additions: clone(record.additions), stats: changeStats(record) };
    record.versions.push(version); appendAudit(record, { type: 'version-saved', number: version.label, reason: version.comment }); updateRecord(record); closeContractDialog(); view.section = 'versions'; renderContract(); showContractToast(`${version.label} сохранена`);
  } });
}

function openVersionCompare(record, versionId) {
  const version = record.versions.find((item) => item.id === versionId);
  if (!version) return;
  const rows = allWorkingClauses(record, version.decisions, version.additions).filter((item) => item.added || item.workingAction !== 'keep');
  openContractDialog({ kicker: 'СРАВНЕНИЕ ВЕРСИЙ', title: `Оригинал ↔ ${version.label}`, copyText: `${rows.length} изменённых мест`, body: rows.length ? `<div class="contract-version-compare">${rows.map((item) => `<article><header><strong>${item.added ? 'Новый пункт' : `Пункт ${escapeHtml(item.number)}`}</strong><span>${item.workingAction === 'deleted' ? 'Удалён' : item.added ? 'Добавлен' : 'Изменён'}</span></header><div><section><small>БЫЛО</small><p>${escapeHtml(item.added ? 'Отсутствовал' : item.originalText)}</p></section><section><small>СТАЛО</small><p>${escapeHtml(item.workingAction === 'deleted' ? 'Удалено' : item.workingText)}</p></section></div></article>`).join('')}</div>` : '<div class="contract-empty-inline"><strong>Изменений нет</strong></div>', wide: true });
}

function openVersionDocument(record, versionId) {
  const version = record.versions.find((item) => item.id === versionId);
  if (!version) return;
  const groups = correctedClauses(record, { decisions: version.decisions, additions: version.additions });
  openContractDialog({ kicker: 'СОХРАНЁННАЯ ВЕРСИЯ', title: version.label, copyText: `${formatDateTime(version.createdAt)} · ${version.actor || 'Пользователь'}`, body: `<article class="contract-version-document">${groups.map((group, groupIndex) => `<section><h3>${groupIndex + 1}. ${escapeHtml(group.title)}</h3>${group.items.map((item, itemIndex) => `<p><b>${groupIndex + 1}.${itemIndex + 1}</b> ${escapeHtml(item.workingText)}</p>`).join('')}</section>`).join('')}</article>`, wide: true });
}

function restoreVersionAsDraft(record, versionId) {
  const version = record.versions.find((item) => item.id === versionId);
  if (!version) return;
  record.decisions = clone(version.decisions || {});
  record.additions = clone(version.additions || []);
  appendAudit(record, { type: 'version-restored', number: version.label, reason: 'Создана новая рабочая редакция на основе сохранённой версии' });
  updateRecord(record);
  view.product = 'negotiation'; view.section = 'clauses'; view.clauseFilter = 'changed';
  renderContract(); showContractToast(`Создана рабочая редакция на основе «${version.label}»`);
}

async function showSource(record, clause) {
  if (!clause || clause.added) return;
  const originalAvailable = Boolean(await getOriginal(record.id).catch(() => null));
  const { dialog } = openContractDialog({ kicker: 'ИСТОЧНИК В ДОГОВОРЕ', title: `Пункт ${clause.number}`, copyText: sourceLabel(clause), body: `<article class="contract-source-preview"><span>ОРИГИНАЛЬНЫЙ ТЕКСТ</span><p>${escapeHtml(clause.originalText)}</p></article><div class="contract-dialog-safety"><span>${originalAvailable ? '✓' : 'i'}</span><p>${originalAvailable ? 'Оригинальный файл сохранён на этом устройстве. Его можно открыть отдельно.' : 'В локальном хранилище доступен текст пункта; бинарный исходный файл не найден.'}</p></div>${originalAvailable ? '<footer class="contract-proposal-actions"><button class="contract-button is-primary" type="button" data-source-open-file>Открыть оригинал</button><button class="contract-button" type="button" data-source-open-text>Показать в режиме «Оригинал»</button></footer>' : ''}`, wide: true });
  dialog.querySelector('[data-source-open-file]')?.addEventListener('click', async () => {
    const preview = window.open('about:blank', '_blank');
    if (preview) preview.opener = null;
    const file = await getOriginal(record.id);
    if (!file) { preview?.close(); return; }
    const url = URL.createObjectURL(file);
    if (preview) preview.location.href = `${url}${file.type === 'application/pdf' ? `#page=${clause.source.page || 1}` : ''}`;
    else downloadBlob(file, record.original.name);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  });
  dialog.querySelector('[data-source-open-text]')?.addEventListener('click', () => { closeContractDialog(); view.mode = 'original'; renderContract(); requestAnimationFrame(() => (document.getElementById(`contract-source-${clause.id}`) || document.querySelector(`#contract-page-${clause.source.page || 1}`))?.scrollIntoView({ behavior: 'smooth', block: 'center' })); });
}

async function downloadOriginal(record) {
  const file = await getOriginal(record.id).catch(() => null);
  if (file) { downloadBlob(file, record.original.name); return; }
  if (record.original.previewText) { downloadBlob(new Blob([record.original.previewText], { type: 'text/plain;charset=utf-8' }), `${safeFileName(recordTitle(record))}-original.txt`); return; }
  showContractToast('Оригинальный файл недоступен на этом устройстве');
}

function createObjectTasks(record) {
  if (!record.objectId) { openObjectLink(record); return; }
  if (!record.calendar.length) { showContractToast('В договоре не обнаружены сроки для задач'); return; }
  const tasks = readJson(CONTRACT_TASKS_KEY, []);
  const known = new Set(tasks.map((item) => `${item.contractId}:${item.eventId}`));
  record.calendar.forEach((item) => { const key = `${record.id}:${item.id}`; if (!known.has(key)) tasks.push({ id: uid('task'), contractId: record.id, objectId: record.objectId, eventId: item.id, title: item.title, due: item.when, sourceClauseId: item.sourceClauseId, createdAt: nowIso(), status: 'planned' }); });
  localStorage.setItem(CONTRACT_TASKS_KEY, JSON.stringify(tasks.slice(-500)));
  showContractToast(`${record.calendar.length} событий связаны с объектом`);
}

function changedRows(record, snapshot = { decisions: record.decisions, additions: record.additions }) {
  const rows = [];
  record.clauses.forEach((clause) => {
    const decision = normalizeDecision(snapshot.decisions?.[clause.id]);
    if (decision.action === 'keep') return;
    rows.push({ number: clause.number, title: clause.title || sectionTitle(clause.section), action: decision.action === 'deleted' ? 'Удалён' : 'Изменён', before: clause.originalText, after: decision.action === 'deleted' ? 'Удалено' : decision.text, reason: decision.reason || (decision.acceptedStructos ? clause.recommendation : 'Изменение пользователя') });
  });
  (snapshot.additions || []).filter((item) => !item.deleted).forEach((item) => rows.push({ number: 'Новый', title: item.title || sectionTitle(item.section), action: 'Добавлен', before: 'Отсутствовал', after: item.text, reason: item.reason || 'Добавлен пользователем' }));
  return rows;
}

function auditTypeLabel(type) {
  return ({
    'clause-added': 'пункт добавлен',
    'clause-modified': 'пункт изменён',
    'clause-deleted': 'пункт удалён',
    'clause-restored': 'пункт восстановлен',
    'clause-kept': 'оставлена исходная редакция',
    'structos-proposal-accepted': 'принято предложение StructOS',
    'version-saved': 'версия сохранена',
    'version-restored': 'версия открыта как рабочая редакция',
    'passport-updated': 'паспорт договора уточнён'
  })[type] || type || 'действие';
}

function correctedClauses(record, snapshot = { decisions: record.decisions, additions: record.additions }) {
  const working = allWorkingClauses(record, snapshot.decisions, snapshot.additions).filter((item) => item.workingAction !== 'deleted');
  const grouped = [];
  CONTRACT_SECTIONS.forEach(([sectionId, title]) => {
    const items = working.filter((item) => item.section === sectionId);
    if (items.length) grouped.push({ sectionId, title, items });
  });
  const leftovers = working.filter((item) => !CONTRACT_SECTION_MAP.has(item.section));
  if (leftovers.length) grouped.push({ sectionId: 'other', title: 'Прочие условия', items: leftovers });
  return grouped;
}

function exportModel(record, type, snapshot = { decisions: record.decisions, additions: record.additions }, label = '') {
  const rows = changedRows(record, snapshot);
  const stats = { changed: rows.filter((item) => item.action === 'Изменён').length, deleted: rows.filter((item) => item.action === 'Удалён').length, added: rows.filter((item) => item.action === 'Добавлен').length };
  const base = { title: '', subtitle: `${recordTitle(record)} · ${record.metadata.date || 'дата не обнаружена'}`, fileName: '', paragraphs: [], table: null };
  if (type === 'protocol') {
    return { ...base, title: 'ПРОТОКОЛ РАЗНОГЛАСИЙ', fileName: `Протокол-разногласий-${safeFileName(recordTitle(record))}`, paragraphs: [`К договору: ${recordTitle(record)}`, `Заказчик: ${record.metadata.customer || 'Не обнаружено'}`, `Подрядчик: ${record.metadata.contractor || 'Не обнаружено'}`, `Редакция: ${label || 'Текущая рабочая редакция'}`, `Дата формирования: ${new Intl.DateTimeFormat('ru-RU').format(new Date())}`], table: { headers: ['№ пункта', 'Было', 'Предлагается', 'Причина изменения'], rows: rows.map((item) => [item.number, item.before, item.after, item.reason]) }, empty: 'Изменённых, удалённых или добавленных пунктов нет.' };
  }
  if (type === 'changes') {
    const paragraphs = [`Название договора: ${record.original.name}`, `Номер: ${record.metadata.number || 'Не обнаружено'}`, `Стороны: ${record.metadata.customer || 'Не обнаружено'} / ${record.metadata.contractor || 'Не обнаружено'}`, `Дата первоначального документа: ${record.metadata.date || 'Не обнаружено'}`, `Дата изменений: ${new Intl.DateTimeFormat('ru-RU').format(new Date())}`, `Изменено пунктов: ${stats.changed}. Удалено: ${stats.deleted}. Добавлено: ${stats.added}.`, ''];
    rows.forEach((item) => paragraphs.push(`Пункт ${item.number} — ${item.title}`, `Было: ${item.before}`, `Действие: ${item.action.toLowerCase()}`, `Стало: ${item.after}`, `Причина: ${item.reason}`, ''));
    if (!rows.length) paragraphs.push('Изменений нет.');
    if (record.audit?.length) {
      paragraphs.push('', 'ЖУРНАЛ РЕДАКТИРОВАНИЯ');
      record.audit.forEach((entry) => {
        paragraphs.push(`${formatDateTime(entry.at)} · ${entry.actor || 'Пользователь'} · ${auditTypeLabel(entry.type)}${entry.number ? ` · ${entry.number}` : ''}${entry.source === 'structos' ? ' · StructOS' : ''}`);
        if (entry.before) paragraphs.push(`Было на этом шаге: ${entry.before}`);
        if (entry.after) paragraphs.push(`Стало на этом шаге: ${entry.after}`);
        if (entry.reason) paragraphs.push(`Причина: ${entry.reason}`);
        paragraphs.push('');
      });
    }
    return { ...base, title: 'ФАЙЛ ИЗМЕНЕНИЙ — БЫЛО / СТАЛО', fileName: `Было-стало-${safeFileName(recordTitle(record))}`, paragraphs };
  }
  const paragraphs = [`${recordTitle(record)}`, `Дата: ${record.metadata.date || new Intl.DateTimeFormat('ru-RU').format(new Date())}`, `Заказчик: ${record.metadata.customer || 'Не обнаружено'}`, `Подрядчик: ${record.metadata.contractor || 'Не обнаружено'}`, `Объект: ${record.metadata.object || 'Не обнаружено'}`, `Предмет: ${record.metadata.subject || 'Не обнаружено'}`, ''];
  correctedClauses(record, snapshot).forEach((group, groupIndex) => {
    paragraphs.push(`${groupIndex + 1}. ${group.title}`);
    group.items.forEach((item, itemIndex) => paragraphs.push(`${groupIndex + 1}.${itemIndex + 1} ${item.workingText}`));
    paragraphs.push('');
  });
  paragraphs.push('РЕКВИЗИТЫ И ПОДПИСИ СТОРОН', `Заказчик: ${record.metadata.customer || '________________'}`, `Подрядчик: ${record.metadata.contractor || '________________'}`, '', 'Приложения:', record.metadata.attachments || 'В договоре не обнаружено');
  return { ...base, title: 'ИСПРАВЛЕННАЯ РЕДАКЦИЯ ДОГОВОРА', fileName: `Исправленный-${safeFileName(recordTitle(record))}`, paragraphs };
}

function safeFileName(value) {
  return String(value || 'договор').replace(/[<>:"/\\|?*\u0000-\u001F]+/g, '-').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 100);
}

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = name; document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

async function pdfBlob(model) {
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([import('pdfmake/build/pdfmake.js'), import('pdfmake/build/vfs_fonts.js')]);
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs || pdfFonts?.vfs || pdfFonts;
  const content = [
    { text: 'StructOS', style: 'brand' },
    { text: model.title, style: 'title' },
    { text: model.subtitle, style: 'subtitle' },
    ...model.paragraphs.map((text) => text === '' ? { text: ' ', margin: [0, 4] } : { text, style: /^\d+\.\s|РЕКВИЗИТЫ|Пункт\s/u.test(text) ? 'heading' : 'body' })
  ];
  if (model.table) {
    const rows = model.table.rows.length ? model.table.rows : [['—', model.empty, '—', '—']];
    content.push({
      table: {
        headerRows: 1,
        widths: [45, '*', '*', '*'],
        body: [
          model.table.headers.map((text) => ({ text, bold: true, color: '#ffffff', fillColor: '#075bc7' })),
          ...rows.map((row) => row.map((text) => ({ text: String(text || '—'), margin: 4 })))
        ]
      },
      layout: { fillColor: (rowIndex) => rowIndex > 0 && rowIndex % 2 === 0 ? '#f2f7ff' : null, hLineColor: '#bfd4ee', vLineColor: '#bfd4ee' }
    });
  }
  const definition = { pageSize: 'A4', pageMargins: [42, 48, 42, 48], footer: (page, pages) => ({ columns: [{ text: 'Сделано на StructOS · www.structOS.ru', color: '#71829a', fontSize: 8 }, { text: `${page} / ${pages}`, alignment: 'right', color: '#71829a', fontSize: 8 }], margin: [42, 10] }), content, styles: { brand: { fontSize: 11, bold: true, color: '#0875ee', characterSpacing: 2, margin: [0, 0, 0, 12] }, title: { fontSize: 19, bold: true, color: '#071d40', margin: [0, 0, 0, 5] }, subtitle: { fontSize: 9, color: '#60718d', margin: [0, 0, 0, 18] }, heading: { fontSize: 11, bold: true, color: '#071d40', margin: [0, 8, 0, 4] }, body: { fontSize: 9.5, lineHeight: 1.35, color: '#172b47', margin: [0, 2] } }, defaultStyle: { font: 'Roboto' } };
  return new Promise((resolve) => pdfMake.createPdf(definition).getBlob(resolve));
}

async function docxBlob(model) {
  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  const paragraphXml = (text, style = '') => `<w:p>${style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : ''}<w:r><w:t xml:space="preserve">${escapeXml(text)}</w:t></w:r></w:p>`;
  const tableXml = model.table ? `<w:tbl><w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="9BB8DC"/><w:left w:val="single" w:sz="4" w:color="9BB8DC"/><w:bottom w:val="single" w:sz="4" w:color="9BB8DC"/><w:right w:val="single" w:sz="4" w:color="9BB8DC"/><w:insideH w:val="single" w:sz="4" w:color="9BB8DC"/><w:insideV w:val="single" w:sz="4" w:color="9BB8DC"/></w:tblBorders></w:tblPr>${[model.table.headers, ...(model.table.rows.length ? model.table.rows : [['—', model.empty, '—', '—']])].map((row, rowIndex) => `<w:tr>${row.map((cell) => `<w:tc><w:tcPr><w:tcW w:w="0" w:type="auto"/>${rowIndex === 0 ? '<w:shd w:fill="075BC7"/>' : ''}</w:tcPr><w:p><w:r>${rowIndex === 0 ? '<w:rPr><w:b/><w:color w:val="FFFFFF"/></w:rPr>' : ''}<w:t xml:space="preserve">${escapeXml(cell)}</w:t></w:r></w:p></w:tc>`).join('')}</w:tr>`).join('')}</w:tbl>` : '';
  const body = [paragraphXml('StructOS', 'Brand'), paragraphXml(model.title, 'Title'), paragraphXml(model.subtitle, 'Subtitle'), ...model.paragraphs.map((text) => paragraphXml(text || ' ', /^\d+\.\s|РЕКВИЗИТЫ|Пункт\s/u.test(text) ? 'Heading1' : 'Normal')), tableXml].join('');
  zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`);
  zip.folder('_rels').file('.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`);
  zip.folder('word').file('document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>`);
  zip.folder('word').file('styles.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:sz w:val="20"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="34"/><w:color w:val="071D40"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="071D40"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Brand"><w:name w:val="Brand"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:color w:val="0875EE"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:rPr><w:color w:val="60718D"/><w:sz w:val="18"/></w:rPr></w:style></w:styles>`);
  zip.folder('word').folder('_rels').file('document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
  zip.folder('docProps').file('core.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${escapeXml(model.title)}</dc:title><dc:creator>StructOS</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${nowIso()}</dcterms:created></cp:coreProperties>`);
  return zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', compression: 'DEFLATE' });
}

async function exportContract(record, type, format, snapshot = null, label = '') {
  const model = exportModel(record, type, snapshot || { decisions: record.decisions, additions: record.additions }, label);
  showContractToast(`Формируем ${format.toUpperCase()}…`);
  try {
    const blob = format === 'pdf' ? await pdfBlob(model) : await docxBlob(model);
    downloadBlob(blob, `${model.fileName}.${format}`);
    showContractToast(`${format.toUpperCase()} готов`);
  } catch (error) { console.error('Contract export failed:', error); showContractToast('Не удалось сформировать файл'); }
}

function openExportChoice(record, type, snapshot = null, label = '') {
  const names = { protocol: 'Протокол разногласий', changes: 'Файл «Было / Стало»', corrected: 'Исправленный договор' };
  const { dialog } = openContractDialog({ title: names[type] || 'Экспорт договора', copyText: 'Выберите формат. Файл будет сформирован из текущей рабочей редакции.', body: `<div class="contract-export-choice"><button type="button" data-export-format="docx"><span>W</span><strong>DOCX</strong><small>Для редактирования в Word</small></button><button type="button" data-export-format="pdf"><span>PDF</span><strong>PDF</strong><small>Для просмотра и отправки</small></button></div>` });
  dialog.querySelectorAll('[data-export-format]').forEach((button) => button.addEventListener('click', () => { closeContractDialog(); exportContract(record, type, button.dataset.exportFormat, snapshot, label); }));
}

function chatAnswer(record, question) {
  const lower = question.toLowerCase();
  const payment = metadataSource(record, 'payment');
  const extras = record.clauses.find((item) => item.section === 'extras');
  const suspension = record.clauses.find((item) => item.section === 'suspension');
  const critical = record.clauses.filter((item) => item.risk === 'critical');
  const penalties = record.clauses.filter((item) => ['penalties', 'retentions'].includes(item.section));
  const clauseNumber = question.match(/пункт\s*(\d+(?:\.\d+)*)/iu)?.[1];
  const namedClause = clauseNumber ? record.clauses.find((item) => item.number === clauseNumber) : null;
  if (/добав(?:ь|ить).{0,80}пункт|оплат.{0,40}прост/i.test(lower)) {
    const instruction = /прост/i.test(lower) ? 'Простой по вине Заказчика оплачивается, а срок работ продлевается на период простоя' : question.replace(/^.*?добав(?:ь|ить)\s*(?:пункт)?[,.:\s-]*/iu, '');
    return { text: 'Подготовлю новый пункт и добавлю его только в рабочую редакцию. В исходном договоре такого условия нет.', action: { type: 'add-instruction', payload: instruction, label: 'Добавить пункт в редакцию' } };
  }
  if (/измени|изменить/i.test(lower) && namedClause) return { text: `Нашёл пункт ${namedClause.number}. Открою его редактор с оригиналом и полем новой редакции.`, sourceClauseId: namedClause.id, action: { type: 'edit-clause', payload: namedClause.id, label: 'Изменить пункт' } };
  if (/когда.{0,30}(?:заплат|оплат)|срок оплат/i.test(lower)) {
    if (!payment) return { text: 'Срок и запускающее событие оплаты в распознанном тексте не обнаружены. Рекомендую добавить конкретный срок проверки документов и оплаты.', action: { type: 'go-missing', label: 'Посмотреть отсутствующие условия' } };
    return { text: `По найденному пункту: ${record.metadata.paymentTerm !== 'Не обнаружено' ? record.metadata.paymentTerm : asText(payment.originalText, 360)}. Проверьте, зависит ли начало срока от подписания документов Заказчиком.`, sourceClauseId: payment.id, action: { type: 'propose-clause', payload: payment.id, label: 'Предложить безопасную редакцию' } };
  }
  if (/доп(?:олнительн)?.{0,30}работ|не оплат/i.test(lower)) {
    if (!extras) return { text: 'Порядок согласования дополнительных работ не обнаружен. Без письменного поручения, цены и влияния на срок возникает риск неоплаты.', action: { type: 'add-instruction', payload: 'Дополнительные работы выполняются после письменного согласования состава, стоимости и влияния на сроки', label: 'Добавить защитный пункт' } };
    return { text: 'Оплата дополнительных работ зависит от соблюдения порядка согласования, указанного в договоре. До письменного согласования лучше не начинать такой объём.', sourceClauseId: extras.id, action: { type: 'propose-clause', payload: extras.id, label: 'Усилить пункт' } };
  }
  if (/максимальн.{0,30}штраф|штраф|пен(?:я|и|ю|ей)|удерж(?:ан|ив|ива|ать|ит)/i.test(lower)) {
    if (!penalties.length) return { text: 'Штрафы, пени или удержания в распознанном тексте не обнаружены.' };
    const worst = penalties.sort((a, b) => (b.originalText.match(/\d+\s*%/) ? 1 : 0) - (a.originalText.match(/\d+\s*%/) ? 1 : 0))[0];
    return { text: `Наиболее заметное финансовое условие: ${penaltyAmount(record, worst)}. Точная сумма зависит от базы и периода начисления в пункте.`, sourceClauseId: worst.id, action: { type: 'go-risks', label: 'Открыть все риски' } };
  }
  if (/приостанов|остановить работ/i.test(lower)) {
    if (!suspension) return { text: 'Право приостановить работы в распознанном договоре не обнаружено. Это важный защитный механизм при непередаче фронта, документов или просрочке оплаты.', action: { type: 'add-instruction', payload: 'Подрядчик вправе приостановить работы после письменного уведомления при непередаче фронта, документации или просрочке оплаты; срок продлевается на период приостановки', label: 'Добавить пункт о приостановке' } };
    return { text: 'В договоре есть условие о приостановке. Перед остановкой работ соблюдите установленный порядок уведомления.', sourceClauseId: suspension.id };
  }
  if (/опасн|критич|что лучше изменить/i.test(lower)) {
    if (!critical.length) return { text: 'Критических пунктов автоматическими правилами не обнаружено. Проверьте жёлтые условия о деньгах, сроках и приёмке.', action: { type: 'go-risks', label: 'Открыть риски' } };
    return { text: `Обнаружено ${critical.length} критических ${critical.length === 1 ? 'условие' : 'условия'}. В первую очередь проверьте «${sectionTitle(critical[0].section)}»: ${critical[0].why}`, sourceClauseId: critical[0].id, action: { type: 'go-risks', label: 'Показать все опасные пункты' } };
  }
  if (/протокол разноглас/i.test(lower)) return { text: 'Сформирую протокол из всех изменённых, удалённых и новых пунктов текущей рабочей редакции.', action: { type: 'export-protocol', label: 'Сформировать протокол' } };
  if (/сформир.{0,30}редакц|исправленн.{0,20}договор/i.test(lower)) return { text: 'Подготовлю чистую редакцию: удалённые пункты будут исключены, изменённые заменены, новые вставлены, а нумерация приведена в порядок.', action: { type: 'export-corrected', label: 'Сформировать редакцию' } };
  if (namedClause) return { text: `${simpleMeaning(namedClause.section, record.role)} Риск: ${riskLabel(namedClause.risk)}. ${namedClause.why}`, sourceClauseId: namedClause.id, action: { type: 'propose-clause', payload: namedClause.id, label: 'Предложить изменение' } };
  const fallback = record.clauses.find((item) => item.risk !== 'normal') || record.clauses[0];
  if (!fallback) return { text: 'Текст договора пока не распознан, поэтому я не могу дать вывод без источника. Вставьте распознанный текст договора.' };
  return { text: 'Я не нашёл однозначный ответ по формулировке вопроса. Показываю ближайший связанный пункт — проверьте его исходный текст.', sourceClauseId: fallback.id, action: { type: 'edit-clause', payload: fallback.id, label: 'Открыть пункт' } };
}

function askContract(record, question) {
  const text = asText(question, 600);
  if (!text) return;
  record.chat.push({ id: uid('message'), role: 'user', text, createdAt: nowIso() });
  record.chat.push({ id: uid('message'), role: 'assistant', ...chatAnswer(record, text), createdAt: nowIso() });
  record.chat = record.chat.slice(-40);
  updateRecord(record);
  renderContract();
  requestAnimationFrame(() => { const messages = document.querySelector('[data-contract-chat-messages]'); if (messages) messages.scrollTop = messages.scrollHeight; });
}

function handleChatAction(record, type, payload) {
  if (type === 'add-instruction') {
    const generated = structosClauseFromInstruction(payload || 'Добавить защитное условие');
    createAddition(record, { ...generated, reason: generated.why, acceptedStructos: true });
    view.product = 'negotiation'; view.section = 'clauses'; view.clauseFilter = 'changed'; view.chatOpen = false; renderContract(); showContractToast('Новый пункт добавлен в рабочую редакцию'); return;
  }
  if (type === 'edit-clause') { const clause = clauseById(record, payload); if (clause) openClauseEditor(record, clause); return; }
  if (type === 'propose-clause') { const clause = clauseById(record, payload); if (clause) openStructosProposal(record, clause); return; }
  if (type === 'go-risks') { view.product = 'analysis'; view.section = 'risks'; view.chatOpen = false; renderContract(); return; }
  if (type === 'go-missing') { view.product = 'analysis'; view.section = 'missing'; view.chatOpen = false; renderContract(); return; }
  if (type === 'export-protocol') openExportChoice(record, 'protocol');
  if (type === 'export-corrected') openExportChoice(record, 'corrected');
}

function handleContractClick(event) {
  const button = event.target.closest('button');
  if (!button) return;
  const record = currentRecord();
  if (button.dataset.openPanel === 'projects') { document.querySelector('[data-tab="projects"]')?.click(); return; }
  if (button.dataset.contractProduct) {
    view.product = button.dataset.contractProduct;
    if (view.product === 'analysis' && !['overview', 'meaning', 'money', 'calendar', 'unpaid', 'risks', 'sections', 'clauses', 'missing', 'crosscheck', 'versions'].includes(view.section)) view.section = 'overview';
    if (view.product === 'negotiation') view.section = 'clauses';
    renderContract(); return;
  }
  if (button.dataset.contractMode) { view.mode = button.dataset.contractMode; renderContract(); return; }
  if (button.dataset.contractSection) { view.section = button.dataset.contractSection; renderContract(); return; }
  if (button.dataset.contractSectionJump) { view.section = button.dataset.contractSectionJump; renderContract(); return; }
  if (button.dataset.contractSectionFilter) { view.section = 'clauses'; view.clauseFilter = button.dataset.contractSectionFilter; renderContract(); return; }
  if (button.dataset.contractClauseFilter) { view.clauseFilter = button.dataset.contractClauseFilter; renderContract(); return; }
  if (button.dataset.contractOpenRecord) { workspace.selectedId = button.dataset.contractOpenRecord; saveWorkspace(); view.product = 'analysis'; view.section = 'overview'; renderContract(); return; }
  if (button.dataset.contractLinkedUpload) { pendingObjectId = button.dataset.contractLinkedUpload; document.querySelector('[data-contract-file-input]')?.click(); return; }
  if (button.dataset.contractChatQuestion && record) { askContract(record, button.dataset.contractChatQuestion); return; }
  if (button.dataset.contractChatAction && record) { handleChatAction(record, button.dataset.contractChatAction, button.dataset.contractChatPayload); return; }
  if (button.dataset.contractSource && record) { showSource(record, clauseById(record, button.dataset.contractSource)); return; }
  if (button.dataset.contractClauseEdit && record) { openClauseEditor(record, clauseById(record, button.dataset.contractClauseEdit)); return; }
  if (button.dataset.contractClauseDelete && record) { openClauseDelete(record, clauseById(record, button.dataset.contractClauseDelete)); return; }
  if (button.dataset.contractClauseRestore && record) { restoreClause(record, clauseById(record, button.dataset.contractClauseRestore)); return; }
  if (button.dataset.contractClauseKeep && record) { keepClause(record, clauseById(record, button.dataset.contractClauseKeep)); return; }
  if (button.dataset.contractClausePropose && record) { openStructosProposal(record, clauseById(record, button.dataset.contractClausePropose)); return; }
  if (button.dataset.contractClauseAddAfter && record) { openAddClause(record, button.dataset.contractClauseAddAfter); return; }
  if (button.dataset.contractAddMissing && record) { addMissingCondition(record, button.dataset.contractAddMissing); return; }
  if (button.dataset.contractVersionCompare && record) { openVersionCompare(record, button.dataset.contractVersionCompare); return; }
  if (button.dataset.contractVersionOpen && record) { openVersionDocument(record, button.dataset.contractVersionOpen); return; }
  if (button.dataset.contractVersionDownload && record) { const version = record.versions.find((item) => item.id === button.dataset.contractVersionDownload); if (version) openExportChoice(record, 'corrected', { decisions: version.decisions, additions: version.additions }, version.label); return; }
  if (button.dataset.contractVersionNew && record) { restoreVersionAsDraft(record, button.dataset.contractVersionNew); return; }
  if (button.dataset.contractExport && record) { openExportChoice(record, button.dataset.contractExport); return; }
  if (button.dataset.contractExportDirect && record) { exportContract(record, 'corrected', button.dataset.contractExportDirect); return; }
  const action = button.dataset.contractAction;
  if (!action) return;
  if (action === 'upload') { pendingObjectId = ''; document.querySelector('[data-contract-file-input]')?.click(); }
  if (action === 'demo') { const demo = createDemoRecord(); storeOriginal(demo.record.id, demo.blob).catch(() => {}); updateRecord(demo.record); view.product = 'analysis'; view.section = 'overview'; renderContract(); }
  if (action === 'build-new') openBuilderForm();
  if (action === 'edit-current' && record) { view.product = 'negotiation'; view.section = 'clauses'; view.mode = 'detailed'; renderContract(); }
  if (action === 'paste-text' && record) openPasteText(record);
  if (action === 'edit-passport' && record) openPassportEditor(record);
  if (action === 'link-object' && record) openObjectLink(record);
  if (action === 'create-tasks' && record) createObjectTasks(record);
  if (action === 'add-clause' && record) openAddClause(record);
  if (action === 'save-version' && record) openSaveVersion(record);
  if (action === 'download-original' && record) downloadOriginal(record);
  if (action === 'toggle-chat') { view.chatOpen = !view.chatOpen; renderContract(); }
}

function handleContractChange(event) {
  const recordSelect = event.target.closest('[data-contract-record]');
  if (recordSelect) { workspace.selectedId = recordSelect.value; saveWorkspace(); view.section = 'overview'; view.mode = 'simple'; renderContract(); return; }
  const fileInput = event.target.closest('[data-contract-file-input]');
  if (!fileInput) return;
  const file = fileInput.files?.[0];
  fileInput.value = '';
  if (!file) return;
  if (file.size > CONTRACT_MAX_FILE_SIZE) { showContractToast('Файл больше 100 МБ'); return; }
  const supported = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'heic', 'txt', 'rtf'].includes(fileExtension(file.name));
  if (!supported) { showContractToast('Поддерживаются PDF, DOCX, DOC, изображения и TXT'); return; }
  pendingFile = file;
  uploadSetup(file);
}

function handleChatSubmit(event) {
  const form = event.target.closest('[data-contract-chat-form]');
  if (!form) return;
  event.preventDefault();
  const record = currentRecord();
  if (!record) return;
  const textarea = form.querySelector('textarea[name="question"]');
  askContract(record, textarea.value);
}

function renderContract() {
  const root = document.querySelector('[data-contract-app]');
  if (!root) return;
  const record = currentRecord();
  root.innerHTML = `<div class="contract-app-shell">${renderTop(record)}${loadingMessage ? renderLoading() : record ? renderWorkspace(record) : (view.product === 'builder' ? renderBuilder(null) : renderStart())}</div><input data-contract-file-input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,.txt,.rtf,image/*" hidden>`;
}

const contractRoot = document.querySelector('[data-contract-app]');
if (contractRoot) {
  contractRoot.addEventListener('click', handleContractClick);
  contractRoot.addEventListener('change', handleContractChange);
  contractRoot.addEventListener('submit', handleChatSubmit);
  document.querySelector('[data-language]')?.addEventListener('change', () => requestAnimationFrame(renderContract));
  renderContract();
}
