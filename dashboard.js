import { supabaseConfig } from './auth-config.js';

const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const copy = {
  RU: {
    language: 'Язык', balance: 'Баланс', bonuses: 'Бонусы', hello: 'Здравствуйте,', builderPassport: 'Паспорт строителя', complete: 'Заполнить', quickStart: 'БЫСТРЫЙ СТАРТ', analysis: 'Анализ', configure: 'Настроить', project: 'Проект', contract: 'Договор', estimate: 'Смета', of: 'из', workSpace: 'РАБОЧЕЕ ПРОСТРАНСТВО', objects: 'Объекты', add: 'Добавить', attention: 'Требует внимания', allGood: 'Всё в порядке', space: 'Пространство', spaceDescription: 'Ваше интерактивное поле быстрых функций', settings: 'Настройка', chooseWidgets: 'Выберите быстрые функции', done: 'Готово', dragHint: 'Удерживайте и перемещайте карточки', myObjects: 'Мои объекты', available: 'Доступно', addObject: 'Добавить объект', noObjects: 'Объектов пока нет', noObjectsCopy: 'Добавьте первый объект и свяжите с ним проект, договор и смету.', createObject: 'Создать объект', myProfile: 'Мой профиль', edit: 'Редактировать', tariffSubscription: 'Тарифы и подписка', userTariff: 'Пользователь', balanceBonuses: 'Баланс и бонусы', connections: 'Связи и контакты', home: 'Главная', profile: 'Профиль', invitations: 'Приглашения', invite: 'Пригласить', notifications: 'Уведомления', documents: 'Мои документы', logout: 'Выйти', copied: 'ID скопирован', objectName: 'Название объекта', objectPlaceholder: 'Например, Марушкино', cancel: 'Отмена', create: 'Создать', objectCreated: 'Объект добавлен', comingSoon: 'Раздел уже подготовлен и будет наполняться вашими данными.', goAnalysis: 'Перейти к анализу', openMain: 'Открыть главную', profileSaved: 'Данные профиля сохранены', widgetAnalysis: 'Анализы', widgetObjects: 'Объекты', widgetDocuments: 'Документы', widgetActs: 'Акты', widgetAttention: 'Внимание', widgetPassport: 'Паспорт', quickFunction: 'Быстрая функция'
  },
  EN: {
    language: 'Language', balance: 'Balance', bonuses: 'Bonuses', hello: 'Hello,', builderPassport: 'Builder Passport', complete: 'Complete', quickStart: 'QUICK START', analysis: 'Analysis', configure: 'Configure', project: 'Project', contract: 'Contract', estimate: 'Estimate', of: 'of', workSpace: 'WORKSPACE', objects: 'Objects', add: 'Add', attention: 'Needs attention', allGood: 'Everything is fine', space: 'Space', spaceDescription: 'Your interactive field of quick functions', settings: 'Settings', chooseWidgets: 'Choose quick functions', done: 'Done', dragHint: 'Hold and move cards', myObjects: 'My objects', available: 'Available', addObject: 'Add object', noObjects: 'No objects yet', noObjectsCopy: 'Add your first object and connect a project, contract, and estimate.', createObject: 'Create object', myProfile: 'My profile', edit: 'Edit', tariffSubscription: 'Plans and subscription', userTariff: 'User', balanceBonuses: 'Balance and bonuses', connections: 'Connections and contacts', home: 'Home', profile: 'Profile', invitations: 'Invitations', invite: 'Invite', notifications: 'Notifications', documents: 'My documents', logout: 'Log out', copied: 'ID copied', objectName: 'Object name', objectPlaceholder: 'For example, Marushkino', cancel: 'Cancel', create: 'Create', objectCreated: 'Object added', comingSoon: 'This section is ready and will be filled with your data.', goAnalysis: 'Go to analysis', openMain: 'Open home page', profileSaved: 'Profile saved', widgetAnalysis: 'Analysis', widgetObjects: 'Objects', widgetDocuments: 'Documents', widgetActs: 'Acts', widgetAttention: 'Attention', widgetPassport: 'Passport', quickFunction: 'Quick function'
  },
  KY: {
    language: 'Тил', balance: 'Баланс', bonuses: 'Бонустар', hello: 'Саламатсызбы,', builderPassport: 'Куруучунун паспорту', complete: 'Толтуруу', quickStart: 'ТЕЗ БАШТОО', analysis: 'Талдоо', configure: 'Жөндөө', project: 'Долбоор', contract: 'Келишим', estimate: 'Смета', of: 'ичинен', workSpace: 'ИШ МЕЙКИНДИГИ', objects: 'Объекттер', add: 'Кошуу', attention: 'Көңүл буруу керек', allGood: 'Баары жайында', space: 'Мейкиндик', spaceDescription: 'Ыкчам функциялардын интерактивдүү талаасы', settings: 'Жөндөө', chooseWidgets: 'Ыкчам функцияларды тандаңыз', done: 'Даяр', dragHint: 'Карточкаларды кармап жылдырыңыз', myObjects: 'Менин объекттерим', available: 'Жеткиликтүү', addObject: 'Объект кошуу', noObjects: 'Азырынча объект жок', noObjectsCopy: 'Биринчи объектти кошуп, долбоорду, келишимди жана сметаны байланыштырыңыз.', createObject: 'Объект түзүү', myProfile: 'Менин профилим', edit: 'Түзөтүү', tariffSubscription: 'Тарифтер жана жазылуу', userTariff: 'Колдонуучу', balanceBonuses: 'Баланс жана бонустар', connections: 'Байланыштар жана контакттар', home: 'Башкы бет', profile: 'Профиль', invitations: 'Чакыруулар', invite: 'Чакыруу', notifications: 'Билдирүүлөр', documents: 'Менин документтерим', logout: 'Чыгуу', copied: 'ID көчүрүлдү', objectName: 'Объекттин аталышы', objectPlaceholder: 'Мисалы, Марушкино', cancel: 'Жокко чыгаруу', create: 'Түзүү', objectCreated: 'Объект кошулду', comingSoon: 'Бөлүм даяр жана сиздин маалыматтарыңыз менен толтурулат.', goAnalysis: 'Талдоого өтүү', openMain: 'Башкы бетти ачуу', profileSaved: 'Профиль сакталды', widgetAnalysis: 'Талдоолор', widgetObjects: 'Объекттер', widgetDocuments: 'Документтер', widgetActs: 'Актылар', widgetAttention: 'Көңүл буруу', widgetPassport: 'Паспорт', quickFunction: 'Ыкчам функция'
  },
  TJ: {
    language: 'Забон', balance: 'Тавозун', bonuses: 'Бонусҳо', hello: 'Салом,', builderPassport: 'Шиносномаи сохтмончӣ', complete: 'Пур кардан', quickStart: 'ОҒОЗИ ЗУД', analysis: 'Таҳлил', configure: 'Танзим', project: 'Лоиҳа', contract: 'Шартнома', estimate: 'Смета', of: 'аз', workSpace: 'ФАЗОИ КОРӢ', objects: 'Объектҳо', add: 'Илова кардан', attention: 'Диққат лозим', allGood: 'Ҳама чиз хуб аст', space: 'Фазо', spaceDescription: 'Майдони интерактивии вазифаҳои зуд', settings: 'Танзимот', chooseWidgets: 'Вазифаҳои зудро интихоб кунед', done: 'Тайёр', dragHint: 'Кортҳоро нигоҳ дошта, ҳаракат диҳед', myObjects: 'Объектҳои ман', available: 'Дастрас', addObject: 'Иловаи объект', noObjects: 'Ҳоло объект нест', noObjectsCopy: 'Объекти аввалро илова кунед ва лоиҳа, шартнома ва сметаро пайваст намоед.', createObject: 'Сохтани объект', myProfile: 'Профили ман', edit: 'Таҳрир', tariffSubscription: 'Тарифҳо ва обуна', userTariff: 'Истифодабаранда', balanceBonuses: 'Тавозун ва бонусҳо', connections: 'Алоқаҳо ва тамосҳо', home: 'Асосӣ', profile: 'Профил', invitations: 'Даъватҳо', invite: 'Даъват кардан', notifications: 'Огоҳиҳо', documents: 'Ҳуҷҷатҳои ман', logout: 'Баромадан', copied: 'ID нусха шуд', objectName: 'Номи объект', objectPlaceholder: 'Масалан, Марушкино', cancel: 'Бекор кардан', create: 'Сохтан', objectCreated: 'Объект илова шуд', comingSoon: 'Бахш омода аст ва бо маълумоти шумо пур карда мешавад.', goAnalysis: 'Гузариш ба таҳлил', openMain: 'Кушодани саҳифаи асосӣ', profileSaved: 'Профил нигоҳ дошта шуд', widgetAnalysis: 'Таҳлилҳо', widgetObjects: 'Объектҳо', widgetDocuments: 'Ҳуҷҷатҳо', widgetActs: 'Санадҳо', widgetAttention: 'Диққат', widgetPassport: 'Шиноснома', quickFunction: 'Вазифаи зуд'
  }
};

Object.assign(copy.RU, { shareEarn: 'Поделись — за регистрацию +200 бонусов', share: 'Поделиться', referralCopied: 'Реферальная ссылка скопирована', passportFirstRewardShort: '+200 за первое заполнение', passportFullRewardShort: '+500 за 100%', topUp: 'Пополнить', topUpAmount: 'Сумма пополнения', topUpHint: 'За каждый пополненный рубль начисляется 10% бонусами', balanceHistory: 'История пополнений', bonusHistory: 'История начислений', noOperations: 'Операций пока нет', balanceTopUp: 'Пополнение баланса', topUpBonus: 'Бонус 10% за пополнение', passportFirstReward: 'Первое заполнение Паспорта строителя', passportFullReward: 'Полностью заполненный Паспорт строителя', referralReward: 'Регистрация по вашей ссылке', bonusRules: 'Как начисляются бонусы', analyze: 'Анализировать', analysisStarted: 'StructOS проверяет загруженные данные и формирует результат.', analysisComplete: 'Анализ завершён', analysisCompleteCopy: 'Результат сохранён. Выберите следующее действие.', viewReport: 'Посмотреть отчёт', startObject: 'Запустить объект', report: 'Отчёт', invalidAmount: 'Введите сумму больше нуля', credited: 'Баланс пополнен, бонусы начислены' });
Object.assign(copy.EN, { shareEarn: 'Share — get +200 bonuses for registration', share: 'Share', referralCopied: 'Referral link copied', passportFirstRewardShort: '+200 for first completion', passportFullRewardShort: '+500 for 100%', topUp: 'Top up', topUpAmount: 'Top-up amount', topUpHint: 'Every deposited ruble earns 10% in bonuses', balanceHistory: 'Top-up history', bonusHistory: 'Bonus history', noOperations: 'No transactions yet', balanceTopUp: 'Balance top-up', topUpBonus: '10% top-up bonus', passportFirstReward: 'First Builder Passport completion', passportFullReward: 'Completed Builder Passport', referralReward: 'Registration through your link', bonusRules: 'How bonuses are earned', analyze: 'Analyze', analysisStarted: 'StructOS is checking the uploaded data and preparing the result.', analysisComplete: 'Analysis complete', analysisCompleteCopy: 'The result has been saved. Choose the next action.', viewReport: 'View report', startObject: 'Start object', report: 'Report', invalidAmount: 'Enter an amount greater than zero', credited: 'Balance topped up and bonuses credited' });
Object.assign(copy.KY, { shareEarn: 'Бөлүшүңүз — катталуу үчүн +200 бонус', share: 'Бөлүшүү', referralCopied: 'Шилтеме көчүрүлдү', passportFirstRewardShort: 'Биринчи толтурууга +200', passportFullRewardShort: '100% үчүн +500', topUp: 'Толуктоо', topUpAmount: 'Толуктоо суммасы', topUpHint: 'Ар бир толукталган рубль үчүн 10% бонус берилет', balanceHistory: 'Толуктоолор тарыхы', bonusHistory: 'Бонустар тарыхы', noOperations: 'Азырынча операция жок', balanceTopUp: 'Балансты толуктоо', topUpBonus: 'Толуктоо үчүн 10% бонус', passportFirstReward: 'Куруучунун паспортун биринчи толтуруу', passportFullReward: 'Куруучунун паспорту толук толтурулду', referralReward: 'Сиздин шилтеме аркылуу катталуу', bonusRules: 'Бонустар кантип берилет', analyze: 'Талдоо', analysisStarted: 'StructOS жүктөлгөн маалыматтарды текшерип жатат.', analysisComplete: 'Талдоо аяктады', analysisCompleteCopy: 'Натыйжа сакталды. Кийинки аракетти тандаңыз.', viewReport: 'Отчётту көрүү', startObject: 'Объектти ишке киргизүү', report: 'Отчёт', invalidAmount: 'Нөлдөн чоң сумманы жазыңыз', credited: 'Баланс толукталды, бонустар берилди' });
Object.assign(copy.TJ, { shareEarn: 'Мубодила кунед — барои бақайдгирӣ +200 бонус', share: 'Мубодила', referralCopied: 'Пайванди даъват нусха шуд', passportFirstRewardShort: '+200 барои пуркунии аввал', passportFullRewardShort: '+500 барои 100%', topUp: 'Пур кардан', topUpAmount: 'Маблағи пуркунӣ', topUpHint: 'Барои ҳар рубли пуршуда 10% бонус дода мешавад', balanceHistory: 'Таърихи пуркунӣ', bonusHistory: 'Таърихи бонусҳо', noOperations: 'Ҳоло амалиёт нест', balanceTopUp: 'Пуркунии тавозун', topUpBonus: '10% бонус барои пуркунӣ', passportFirstReward: 'Пуркунии аввали шиносномаи сохтмончӣ', passportFullReward: 'Шиносномаи сохтмончӣ пурра пур шуд', referralReward: 'Бақайдгирӣ тавассути пайванди шумо', bonusRules: 'Бонусҳо чӣ гуна дода мешаванд', analyze: 'Таҳлил кардан', analysisStarted: 'StructOS маълумоти боршударо месанҷад ва натиҷаро омода мекунад.', analysisComplete: 'Таҳлил анҷом ёфт', analysisCompleteCopy: 'Натиҷа нигоҳ дошта шуд. Амали навбатиро интихоб кунед.', viewReport: 'Дидани ҳисобот', startObject: 'Оғози объект', report: 'Ҳисобот', invalidAmount: 'Маблағи аз сифр зиёдро ворид кунед', credited: 'Тавозун пур ва бонусҳо дода шуданд' });

let language = copy[localStorage.getItem('structos-language')] ? localStorage.getItem('structos-language') : 'RU';
let currentId = '4 820 197';
let authClient = null;
let toastTimer;
const DEMO_SESSION_KEY = 'structos-demo-session';
const FINANCE_KEY = 'structos-finance-v1';
let selectedAnalysis = 'project';
let analysisTimer;

function loadFinance() {
  try {
    const saved = JSON.parse(localStorage.getItem(FINANCE_KEY) || 'null');
    if (saved && Number.isFinite(saved.balance) && Number.isFinite(saved.bonuses)) return saved;
  } catch {}
  return {
    balance: 0,
    bonuses: 200,
    balanceHistory: [],
    bonusHistory: [{ key: 'passportFirstReward', amount: 200, date: new Date().toISOString() }],
    rewards: { passportFirst: true, passportFull: false }
  };
}

const finance = loadFinance();

function tr(key) { return copy[language]?.[key] ?? copy.RU[key] ?? key; }

function applyLanguage(next) {
  language = copy[next] ? next : 'RU';
  localStorage.setItem('structos-language', language);
  root.lang = { RU: 'ru', KY: 'ky', TJ: 'tg', EN: 'en' }[language];
  $('[data-language]').value = language;
  $$('[data-i18n]').forEach((element) => { element.textContent = tr(element.dataset.i18n); });
  renderFinance();
  renderReferral();
  renderWidgets();
  renderWidgetPicker();
}

function applyTheme(next) {
  const theme = next === 'light' ? 'light' : 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('structos-theme', theme);
  $('meta[name="theme-color"]').content = theme === 'dark' ? '#061631' : '#f6faff';
  $('[data-theme-toggle]').setAttribute('aria-pressed', String(theme === 'dark'));
}

function showToast(message) {
  const toast = $('[data-toast]');
  clearTimeout(toastTimer);
  toast.textContent = `✓  ${message}`;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2000);
}

function formattedId(value) {
  const digits = String(value).replace(/\D/g, '').padStart(7, '0').slice(-7);
  return `${digits[0]} ${digits.slice(1, 4)} ${digits.slice(4)}`;
}

function idFromUuid(uuid) {
  let hash = 2166136261;
  for (const char of uuid) { hash ^= char.charCodeAt(0); hash = Math.imul(hash, 16777619); }
  return 1000000 + (Math.abs(hash >>> 0) % 9000000);
}

async function copyId() {
  const value = currentId.replaceAll(' ', '');
  try { await navigator.clipboard.writeText(value); }
  catch {
    const input = document.createElement('input'); input.value = value; document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
  }
  showToast(tr('copied'));
}

function saveFinance() {
  localStorage.setItem(FINANCE_KEY, JSON.stringify(finance));
}

function applyPassportRewards(progress) {
  finance.rewards ||= { passportFirst: false, passportFull: false };
  const now = new Date().toISOString();
  let changed = false;
  if (progress > 0 && !finance.rewards.passportFirst) {
    finance.rewards.passportFirst = true;
    finance.bonuses += 200;
    finance.bonusHistory.unshift({ key: 'passportFirstReward', amount: 200, date: now });
    changed = true;
  }
  if (progress >= 100 && !finance.rewards.passportFull) {
    finance.rewards.passportFull = true;
    finance.bonuses += 500;
    finance.bonusHistory.unshift({ key: 'passportFullReward', amount: 500, date: now });
    changed = true;
  }
  if (changed) saveFinance();
}

function formatMoney(value) {
  return `${new Intl.NumberFormat(root.lang || 'ru-RU', { maximumFractionDigits: 2 }).format(value)} ₽`;
}

function renderFinance() {
  $$('[data-balance-value]').forEach((item) => { item.textContent = formatMoney(finance.balance); });
  $$('[data-bonus-value]').forEach((item) => { item.textContent = new Intl.NumberFormat(root.lang || 'ru-RU').format(finance.bonuses); });
  $$('[data-finance-summary]').forEach((item) => { item.textContent = `${formatMoney(finance.balance)} · ${finance.bonuses}`; });
}

function referralUrl() {
  const url = new URL('./', window.location.href);
  url.searchParams.set('r', currentId.replaceAll(' ', ''));
  url.hash = '';
  return url.href;
}

function renderReferral() {
  $$('[data-referral-short]').forEach((item) => { item.textContent = `StructOS · r/${currentId.replaceAll(' ', '')}`; });
}

async function copyReferral() {
  try { await navigator.clipboard.writeText(referralUrl()); }
  catch {
    const input = document.createElement('input'); input.value = referralUrl(); document.body.append(input); input.select(); document.execCommand('copy'); input.remove();
  }
  showToast(tr('referralCopied'));
}

async function shareReferral() {
  if (navigator.share) {
    try { await navigator.share({ title: 'StructOS', text: tr('shareEarn'), url: referralUrl() }); return; }
    catch (error) { if (error?.name === 'AbortError') return; }
  }
  await copyReferral();
}

async function initAuth() {
  const demoSession = JSON.parse(localStorage.getItem(DEMO_SESSION_KEY) || 'null');
  if (demoSession?.email === 'str@str.com') {
    currentId = formattedId(demoSession.id || '4820197');
    $$('[data-user-name]').forEach((item) => { item.textContent = demoSession.name || 'StructOS'; });
    $$('[data-user-role]').forEach((item) => { item.textContent = demoSession.role || tr('userTariff'); });
    $$('[data-user-id]').forEach((item) => { item.textContent = currentId; });
    renderReferral();
    return;
  }
  const supabaseUrl = supabaseConfig.url || import.meta.env?.VITE_SUPABASE_URL;
  const supabaseKey = supabaseConfig.publishableKey || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) { window.location.replace('login.html#login'); return; }
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.112.3/+esm');
    authClient = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    const { data, error } = await authClient.auth.getUser();
    if (error || !data?.user) { window.location.replace('login.html#login'); return; }
    const user = data.user;
    const meta = user.user_metadata || {};
    const fullName = String(meta.full_name || user.email?.split('@')[0] || 'Пользователь').trim();
    const role = String(meta.primary_role || tr('userTariff'));
    currentId = formattedId(meta.structos_id || idFromUuid(user.id));
    $$('[data-user-name]').forEach((item) => { item.textContent = fullName; });
    $$('[data-user-role]').forEach((item) => { item.textContent = role; });
    $$('[data-user-id]').forEach((item) => { item.textContent = currentId; });
    renderReferral();
  } catch (error) {
    console.warn('StructOS auth is unavailable:', error);
  }
}

function setPanel(name) {
  const next = ['home', 'space', 'objects', 'profile'].includes(name) ? name : 'home';
  $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== next; panel.classList.toggle('is-active', panel.dataset.panel === next); });
  $$('[data-tab]').forEach((button) => { button.classList.toggle('is-active', button.dataset.tab === next); });
  history.replaceState(null, '', `#${next}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeMenu();
}

function openMenu() {
  const drawer = $('#side-drawer');
  drawer.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false');
  $('[data-menu-open]').setAttribute('aria-expanded', 'true');
  $('.drawer-backdrop').hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  const drawer = $('#side-drawer');
  drawer.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true');
  $('[data-menu-open]').setAttribute('aria-expanded', 'false');
  $('.drawer-backdrop').hidden = true;
  document.body.style.overflow = '';
}

const widgetDefinitions = {
  analysis: { label: 'widgetAnalysis', icon: '⌁', hint: '3' },
  objects: { label: 'widgetObjects', icon: '⌂', hint: '0 / 1' },
  documents: { label: 'widgetDocuments', icon: '▤', hint: '0' },
  acts: { label: 'widgetActs', icon: '✓', hint: '∞' },
  attention: { label: 'widgetAttention', icon: '!', hint: '0' },
  passport: { label: 'widgetPassport', icon: '◇', hint: '40%' }
};
const defaultWidgets = ['analysis', 'objects', 'documents', 'passport'];
let selectedWidgets = JSON.parse(localStorage.getItem('structos-space-widgets') || 'null') || defaultWidgets;
let widgetPositions = JSON.parse(localStorage.getItem('structos-space-positions') || '{}');

function defaultPosition(index) {
  const cols = window.innerWidth >= 900 ? 4 : window.innerWidth >= 620 ? 3 : 2;
  return { x: 16 + (index % cols) * (window.innerWidth >= 620 ? 160 : 148), y: 58 + Math.floor(index / cols) * 120 };
}

function renderWidgets() {
  const canvas = $('[data-space-canvas]');
  if (!canvas) return;
  $$('.space-widget', canvas).forEach((item) => item.remove());
  selectedWidgets.forEach((id, index) => {
    const definition = widgetDefinitions[id]; if (!definition) return;
    const position = widgetPositions[id] || defaultPosition(index);
    const card = document.createElement('button');
    card.type = 'button'; card.className = 'space-widget'; card.dataset.widget = id;
    card.style.left = `${position.x}px`; card.style.top = `${position.y}px`;
    card.innerHTML = `<span>${definition.icon}</span><strong>${tr(definition.label)}</strong><small>${definition.hint} · ${tr('quickFunction')}</small>`;
    card.addEventListener('click', () => { if (!card.dataset.moved) openView(id === 'analysis' ? 'project' : id); });
    enableWidgetDrag(card, canvas);
    canvas.append(card);
  });
}

function enableWidgetDrag(card, canvas) {
  let startX = 0, startY = 0, originX = 0, originY = 0, moved = false;
  card.addEventListener('pointerdown', (event) => {
    card.setPointerCapture(event.pointerId); startX = event.clientX; startY = event.clientY; originX = card.offsetLeft; originY = card.offsetTop; moved = false; card.classList.add('is-dragging');
  });
  card.addEventListener('pointermove', (event) => {
    if (!card.hasPointerCapture(event.pointerId)) return;
    const dx = event.clientX - startX, dy = event.clientY - startY; moved ||= Math.abs(dx) + Math.abs(dy) > 5;
    const x = Math.max(0, Math.min(canvas.clientWidth - card.offsetWidth, originX + dx));
    const y = Math.max(0, Math.min(canvas.clientHeight - card.offsetHeight - 28, originY + dy));
    card.style.left = `${x}px`; card.style.top = `${y}px`;
  });
  card.addEventListener('pointerup', (event) => {
    if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
    card.classList.remove('is-dragging'); card.dataset.moved = moved ? 'true' : '';
    widgetPositions[card.dataset.widget] = { x: card.offsetLeft, y: card.offsetTop };
    localStorage.setItem('structos-space-positions', JSON.stringify(widgetPositions));
    setTimeout(() => { delete card.dataset.moved; }, 0);
  });
}

function renderWidgetPicker() {
  const picker = $('[data-widget-picker]'); if (!picker) return;
  picker.replaceChildren(...Object.entries(widgetDefinitions).map(([id, definition]) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = `widget-choice${selectedWidgets.includes(id) ? ' is-selected' : ''}`; button.textContent = tr(definition.label);
    button.addEventListener('click', () => { selectedWidgets = selectedWidgets.includes(id) ? selectedWidgets.filter((item) => item !== id) : [...selectedWidgets, id]; localStorage.setItem('structos-space-widgets', JSON.stringify(selectedWidgets)); renderWidgetPicker(); renderWidgets(); });
    return button;
  }));
}

function showDialog(title, copyText, extra = '') {
  const dialog = $('[data-dialog]');
  $('[data-dialog-content]').innerHTML = `<div class="dialog-content"><h2>${title}</h2><p>${copyText}</p>${extra}</div>`;
  if (!dialog.open) dialog.showModal();
}

function historyMarkup(items, bonus = false) {
  if (!items.length) return `<div class="history-empty">${tr('noOperations')}</div>`;
  const formatter = new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric' });
  return `<div class="transaction-list">${items.map((item) => `<div class="transaction-row"><span><strong>${tr(item.key)}</strong><small>${formatter.format(new Date(item.date))}</small></span><b>+${bonus ? item.amount : formatMoney(item.amount)}</b></div>`).join('')}</div>`;
}

function openBalanceDialog() {
  showDialog(tr('balance'), tr('topUpHint'), `<div class="topup-form"><label><span>${tr('topUpAmount')}</span><input data-topup-amount type="number" inputmode="decimal" min="1" step="1" placeholder="1000" /></label><button class="primary-button" type="button" data-topup>${tr('topUp')}</button></div><section class="history-section"><h3>${tr('balanceHistory')}</h3>${historyMarkup(finance.balanceHistory)}</section>`);
  $('[data-topup]')?.addEventListener('click', () => {
    const input = $('[data-topup-amount]');
    const amount = Math.round(Number(input.value) * 100) / 100;
    if (!Number.isFinite(amount) || amount <= 0) { input.focus(); showToast(tr('invalidAmount')); return; }
    const bonus = Math.round(amount * 10) / 100;
    const date = new Date().toISOString();
    finance.balance += amount;
    finance.bonuses = Math.round((finance.bonuses + bonus) * 100) / 100;
    finance.balanceHistory.unshift({ key: 'balanceTopUp', amount, date });
    finance.bonusHistory.unshift({ key: 'topUpBonus', amount: bonus, date });
    saveFinance(); renderFinance();
    $('[data-dialog]').close(); showToast(tr('credited')); openBalanceDialog();
  });
}

function openBonusDialog() {
  const rules = `<div class="bonus-rules"><div><b>10%</b><span>${tr('topUpHint')}</span></div><div><b>+200</b><span>${tr('passportFirstReward')}</span></div><div><b>+500</b><span>${tr('passportFullReward')}</span></div><div><b>+200</b><span>${tr('referralReward')}</span></div></div>`;
  showDialog(tr('bonuses'), tr('bonusRules'), `${rules}<section class="history-section"><h3>${tr('bonusHistory')}</h3>${historyMarkup(finance.bonusHistory, true)}</section>`);
}

function selectAnalysis(type) {
  selectedAnalysis = ['project', 'contract', 'estimate'].includes(type) ? type : 'project';
  $$('[data-analysis-type]').forEach((card) => {
    const selected = card.dataset.analysisType === selectedAnalysis;
    card.classList.toggle('is-selected', selected);
    card.setAttribute('aria-pressed', String(selected));
  });
}

function runAnalysis() {
  const title = tr(selectedAnalysis);
  clearTimeout(analysisTimer);
  showDialog(`${tr('analysis')}: ${title}`, tr('analysisStarted'), '<div class="analysis-loader"><span></span><span></span><span></span></div>');
  analysisTimer = setTimeout(() => {
    if (!$('[data-dialog]').open) return;
    showDialog(tr('analysisComplete'), tr('analysisCompleteCopy'), `<div class="result-actions"><button class="outline-button" type="button" data-view-report>${tr('viewReport')}</button><button class="primary-button" type="button" data-start-object>${tr('startObject')}</button></div>`);
    $('[data-view-report]')?.addEventListener('click', () => showDialog(`${tr('report')}: ${title}`, tr('comingSoon'), `<div class="dialog-options"><div class="dialog-option"><span>StructOS ${title}</span><span>→</span></div></div>`));
    $('[data-start-object]')?.addEventListener('click', () => { $('[data-dialog]').close(); openObjectDialog(); });
  }, 1100);
}

function openView(view) {
  if (view === 'profile') { setPanel('profile'); return; }
  if (view === 'objects') { setPanel('objects'); return; }
  if (view === 'project' || view === 'contract' || view === 'estimate' || view === 'analysis') {
    const title = view === 'contract' ? tr('contract') : view === 'estimate' ? tr('estimate') : view === 'analysis' ? tr('analysis') : tr('project');
    showDialog(title, tr('comingSoon'), `<div class="dialog-options"><a class="primary-button dialog-option" href="index.html">${tr('goAnalysis')}<span>→</span></a></div>`); return;
  }
  if (view === 'balance') { openBalanceDialog(); return; }
  if (view === 'bonuses') { openBonusDialog(); return; }
  const labels = { subscription: 'tariffSubscription', invitations: 'invitations', invite: 'invite', notifications: 'notifications', documents: 'documents', connections: 'connections', settings: 'settings', acts: 'widgetActs', attention: 'attention', passport: 'builderPassport' };
  showDialog(tr(labels[view] || 'settings'), tr('comingSoon'), `<div class="dialog-options"><div class="dialog-option"><span>StructOS</span><span>→</span></div></div>`);
}

function openObjectDialog() {
  showDialog(tr('addObject'), tr('noObjectsCopy'), `<div class="object-form"><label><span class="sr-only">${tr('objectName')}</span><input data-object-name maxlength="80" placeholder="${tr('objectPlaceholder')}" /></label><button class="primary-button" type="button" data-create-object>${tr('create')}</button></div>`);
  setTimeout(() => $('[data-object-name]')?.focus(), 40);
  $('[data-create-object]')?.addEventListener('click', () => { const name = $('[data-object-name]').value.trim(); if (!name) { $('[data-object-name]').focus(); return; } $('[data-dialog]').close(); showToast(tr('objectCreated')); });
}

async function logout() {
  localStorage.removeItem(DEMO_SESSION_KEY);
  if (authClient) await authClient.auth.signOut();
  window.location.replace('login.html#login');
}

$('[data-language]').addEventListener('change', (event) => applyLanguage(event.target.value));
$('[data-theme-toggle]').addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
$('[data-menu-open]').addEventListener('click', openMenu);
$$('[data-menu-close]').forEach((button) => button.addEventListener('click', closeMenu));
$$('[data-copy-id]').forEach((button) => button.addEventListener('click', copyId));
$$('[data-copy-referral]').forEach((button) => button.addEventListener('click', copyReferral));
$$('[data-share-referral]').forEach((button) => button.addEventListener('click', shareReferral));
$$('[data-tab]').forEach((button) => button.addEventListener('click', () => setPanel(button.dataset.tab)));
$$('[data-open-panel]').forEach((button) => button.addEventListener('click', () => setPanel(button.dataset.openPanel)));
$$('[data-open-view]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.openView)));
$$('[data-action]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.action)));
$$('[data-analysis-type]').forEach((button) => button.addEventListener('click', () => selectAnalysis(button.dataset.analysisType)));
$('[data-run-analysis]').addEventListener('click', runAnalysis);
$$('[data-add-object]').forEach((button) => button.addEventListener('click', openObjectDialog));
$('[data-profile-menu]').addEventListener('click', () => $('.drawer-group').classList.toggle('is-open'));
$('[data-logout]').addEventListener('click', logout);
$('[data-space-settings]').addEventListener('click', () => { $('[data-space-toolbar]').hidden = false; });
$('[data-space-done]').addEventListener('click', () => { $('[data-space-toolbar]').hidden = true; });
$('[data-edit-profile]').addEventListener('click', () => showDialog(tr('edit'), tr('comingSoon')));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { renderWidgets(); });

applyPassportRewards(40);
applyTheme(localStorage.getItem('structos-theme') === 'light' ? 'light' : 'dark');
applyLanguage(language);
renderWidgetPicker();
renderWidgets();
selectAnalysis(selectedAnalysis);
setPanel(location.hash.slice(1) || 'home');
await initAuth();

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
