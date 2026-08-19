const pageCopy = {
  RU: {
    tagline: 'ЕДИНЫЙ СТРОИТЕЛЬНЫЙ ИНТЕЛЛЕКТ',
    section: 'Раздел StructOS',
    home: 'На главную',
    message: 'Страница подготовлена. Содержимое этого раздела мы создадим на следующем этапе.',
    loginMessage: 'Страница входа подготовлена. Авторизацию и личный кабинет мы подключим на следующем этапе.',
    titles: { login: 'Вход в StructOS', features: 'Возможности', pricing: 'Тарифы', video: 'Видео презентация', demo: 'Демо версия' }
  },
  EN: {
    tagline: 'UNIFIED CONSTRUCTION INTELLIGENCE', section: 'StructOS section', home: 'Home',
    message: 'The page is ready. We will create the content for this section at the next stage.',
    loginMessage: 'The sign-in page is ready. Authentication and the personal account will be connected at the next stage.',
    titles: { login: 'Sign in to StructOS', features: 'Features', pricing: 'Pricing', video: 'Video presentation', demo: 'Demo version' }
  },
  TJ: {
    tagline: 'ЗЕҲНИ ЯГОНАИ СОХТМОНӢ', section: 'Бахши StructOS', home: 'Ба саҳифаи асосӣ',
    message: 'Саҳифа омода аст. Мундариҷаи ин бахшро дар марҳилаи навбатӣ месозем.',
    loginMessage: 'Саҳифаи воридшавӣ омода аст. Авторизатсия ва кабинети шахсиро дар марҳилаи навбатӣ мепайвандем.',
    titles: { login: 'Воридшавӣ ба StructOS', features: 'Имкониятҳо', pricing: 'Тарифҳо', video: 'Муаррифии видеоӣ', demo: 'Нусхаи намоишӣ' }
  },
  KG: {
    tagline: 'БИРДИКТҮҮ КУРУЛУШ ИНТЕЛЛЕКТИ', section: 'StructOS бөлүмү', home: 'Башкы бетке',
    message: 'Барак даяр. Бул бөлүмдүн мазмунун кийинки этапта түзөбүз.',
    loginMessage: 'Кирүү барагы даяр. Авторизацияны жана жеке кабинетти кийинки этапта туташтырабыз.',
    titles: { login: 'StructOSко кирүү', features: 'Мүмкүнчүлүктөр', pricing: 'Тарифтер', video: 'Видео презентация', demo: 'Демо версия' }
  },
  TR: {
    tagline: 'BİRLEŞİK İNŞAAT ZEKÂSI', section: 'StructOS bölümü', home: 'Ana sayfa',
    message: 'Sayfa hazır. Bu bölümün içeriğini bir sonraki aşamada oluşturacağız.',
    loginMessage: 'Giriş sayfası hazır. Kimlik doğrulama ve kişisel hesabı bir sonraki aşamada bağlayacağız.',
    titles: { login: "StructOS'a giriş", features: 'Özellikler', pricing: 'Fiyatlandırma', video: 'Video sunumu', demo: 'Demo sürümü' }
  }
};

const language = pageCopy[localStorage.getItem('structos-language')] ? localStorage.getItem('structos-language') : 'RU';
const copy = pageCopy[language];
const page = document.body.dataset.page;
const theme = localStorage.getItem('structos-theme') === 'dark' ? 'dark' : 'light';
const languageCodes = { RU: 'ru', EN: 'en', TJ: 'tg', KG: 'ky', TR: 'tr' };

document.documentElement.dataset.theme = theme;
document.documentElement.lang = languageCodes[language];
document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#06101d' : '#f4f9ff';
document.querySelector('[data-page-title]').textContent = copy.titles[page];
document.querySelector('[data-page-message]').textContent = page === 'login' ? copy.loginMessage : copy.message;
document.querySelector('[data-page-kicker]').textContent = copy.section;
document.querySelector('[data-page-tagline]').textContent = copy.tagline;
document.querySelectorAll('[data-home-label]').forEach((element) => { element.textContent = copy.home; });
document.title = `${copy.titles[page]} — StructOS`;
