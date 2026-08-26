import { supabaseConfig } from './auth-config.js';
import { professions, findProfessions } from './professions.js';

const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const ru = {
  tagline: 'ЕДИНЫЙ СТРОИТЕЛЬНЫЙ ИНТЕЛЛЕКТ', language: 'Язык', storyKicker: 'ВАШЕ ПРОСТРАНСТВО STRUCTOS', storyTitle: 'Строительный интеллект всегда рядом', storyCopy: 'Сохраняйте объекты, результаты анализа и документы в едином защищённом пространстве.',
  benefitOne: 'Все объекты в одном месте', benefitOneCopy: 'Проекты, договоры и сметы связаны между собой', benefitTwo: 'История анализа', benefitTwoCopy: 'Возвращайтесь к замечаниям и результатам в любое время', benefitThree: 'Паспорт строителя', benefitThreeCopy: 'Персональный 7-значный ID и доступ к полным отчётам', passportLabel: 'ПАСПОРТ СТРОИТЕЛЯ', secureAccess: 'ЗАЩИЩЁННЫЙ ДОСТУП',
  login: 'Войти', register: 'Регистрация', loginHeading: 'Вход в StructOS', loginSubheading: 'Продолжите работу с вашими объектами', registerHeading: 'Регистрация в StructOS', registerSubheading: 'Создайте единое пространство для строительных задач', email: 'Электронная почта', registerEmail: 'Электронная почта', password: 'Пароль', remember: 'Запомнить меня', forgot: 'Забыли пароль?', loginButton: 'Войти в StructOS', noAccount: 'Нет аккаунта?', createAccount: 'Создать аккаунт',
  home: 'На главную', getPassport: 'Получи Паспорт Строителя', languageNote: 'Заполняйте на удобном языке — в профиле данные сохранятся на русском', fullName: 'Имя и фамилия', phone: 'Телефон', city: 'Город', role: 'Основная роль', chooseRole: 'Выберите роль', roleUser: 'Пользователь', roleExecutor: 'Исполнитель', roleSupplier: 'Поставщик', roleAggregator: 'Агрегатор', profession: 'Основная профессия', professionHint: 'Введите название и выберите профессию из списка', professionPlaceholder: 'Начните вводить профессию', professionInvalid: 'Выберите профессию из предложенного списка.', createPassword: 'Придумайте пароль', repeatPassword: 'Повторите пароль', passwordHint: 'Не менее 8 символов, буквы и цифры', agreement: 'Принимаю Пользовательское соглашение и Политику конфиденциальности', registerButton: 'Создать аккаунт', hasAccount: 'Уже есть аккаунт?', goLogin: 'Войти',
  recoveryTitle: 'Восстановление доступа', recoveryCopy: 'Укажите электронную почту — мы отправим ссылку для создания нового пароля.', sendLink: 'Отправить ссылку', backLogin: 'Вернуться ко входу', newPasswordTitle: 'Новый пароль', newPasswordCopy: 'Придумайте новый пароль для аккаунта StructOS.', savePassword: 'Сохранить пароль', securityCopy: 'Пароль передаётся только защищённому сервису авторизации и не хранится на сайте', showPassword: 'Показать пароль', hidePassword: 'Скрыть пароль',
  required: 'Заполните обязательные поля.', passwordsMismatch: 'Пароли не совпадают.', weakPassword: 'Пароль должен содержать не менее 8 символов, буквы и цифры.', backendPending: 'Защищённая регистрация готова к подключению. Данные не отправлены — сначала необходимо создать отдельный сервер StructOS.', loginSuccess: 'Вход выполнен. Аккаунт StructOS подтверждён.', registerSuccess: 'Аккаунт создан. Проверьте почту и подтвердите регистрацию.', resetSuccess: 'Ссылка для восстановления отправлена на указанную почту.', passwordSaved: 'Новый пароль сохранён.', genericError: 'Не удалось выполнить действие. Проверьте данные и попробуйте ещё раз.', working: 'Проверяем…', emailPlaceholder: 'name@company.ru', passwordPlaceholder: 'Минимум 8 символов', fullNamePlaceholder: 'Иван Иванов', cityPlaceholder: 'Москва', repeatPlaceholder: 'Повторите пароль'
};

const copy = {
  RU: ru,
  EN: { ...ru, tagline: 'UNIFIED CONSTRUCTION INTELLIGENCE', language: 'Language', storyKicker: 'YOUR STRUCTOS WORKSPACE', storyTitle: 'Construction intelligence always at hand', storyCopy: 'Keep projects, analysis results and documents in one secure workspace.', benefitOne: 'All projects in one place', benefitOneCopy: 'Projects, contracts and estimates stay connected', benefitTwo: 'Analysis history', benefitTwoCopy: 'Return to findings and results at any time', benefitThree: 'Builder Passport', benefitThreeCopy: 'A personal 7-digit ID and access to full reports', passportLabel: 'BUILDER PASSPORT', secureAccess: 'SECURE ACCESS', login: 'Sign in', register: 'Register', loginHeading: 'Sign in to StructOS', loginSubheading: 'Continue working with your projects', registerHeading: 'Create a StructOS account', registerSubheading: 'Create one workspace for your construction tasks', email: 'Email', registerEmail: 'Email', password: 'Password', remember: 'Remember me', forgot: 'Forgot password?', loginButton: 'Sign in to StructOS', noAccount: 'No account yet?', createAccount: 'Create account', fullName: 'Full name', phone: 'Phone', city: 'City', role: 'Primary role', chooseRole: 'Choose a role', roleUser: 'User', roleWorker: 'Worker', roleForeman: 'Foreman / team leader', roleEngineer: 'Engineer / technical office', roleContractor: 'Contractor', roleCustomer: 'Customer', roleSupplier: 'Supplier', roleOther: 'Other role', createPassword: 'Create a password', repeatPassword: 'Repeat password', passwordHint: 'At least 8 characters, letters and numbers', agreement: 'I accept the Terms of Use and Privacy Policy', registerButton: 'Create account', hasAccount: 'Already have an account?', goLogin: 'Sign in', recoveryTitle: 'Restore access', recoveryCopy: 'Enter your email and we will send a link to create a new password.', sendLink: 'Send link', backLogin: 'Back to sign in', newPasswordTitle: 'New password', newPasswordCopy: 'Create a new password for your StructOS account.', savePassword: 'Save password', securityCopy: 'Your password is sent only to the secure authentication service and is not stored on this site', showPassword: 'Show password', hidePassword: 'Hide password', required: 'Complete the required fields.', passwordsMismatch: 'Passwords do not match.', weakPassword: 'Use at least 8 characters with letters and numbers.', backendPending: 'Secure authentication is ready to connect. No data was sent — a dedicated StructOS server must be created first.', loginSuccess: 'Signed in. Your StructOS account is confirmed.', registerSuccess: 'Account created. Check your email to confirm registration.', resetSuccess: 'A recovery link has been sent to your email.', passwordSaved: 'Your new password has been saved.', genericError: 'The action could not be completed. Check your details and try again.', working: 'Checking…', fullNamePlaceholder: 'John Smith', cityPlaceholder: 'London', repeatPlaceholder: 'Repeat password' },
  TJ: { ...ru, tagline: 'ЗЕҲНИ ЯГОНАИ СОХТМОНӢ', language: 'Забон', storyKicker: 'ФАЗОИ STRUCTOS-И ШУМО', storyTitle: 'Зеҳни сохтмонӣ ҳамеша дар паҳлуи шумост', storyCopy: 'Объектҳо, натиҷаҳои таҳлил ва ҳуҷҷатҳоро дар як фазои ҳифзшуда нигоҳ доред.', benefitOne: 'Ҳама объектҳо дар як ҷой', benefitOneCopy: 'Лоиҳаҳо, шартномаҳо ва сметаҳо бо ҳам пайвастанд', benefitTwo: 'Таърихи таҳлил', benefitTwoCopy: 'Ҳар вақт ба эродҳо ва натиҷаҳо баргардед', benefitThree: 'Шиносномаи сохтмончӣ', benefitThreeCopy: 'ID-и шахсии 7-рақама ва дастрасӣ ба ҳисоботи пурра', passportLabel: 'ШИНОСНОМАИ СОХТМОНЧӢ', secureAccess: 'ДАСТРАСИИ ҲИФЗШУДА', login: 'Ворид шудан', register: 'Бақайдгирӣ', loginHeading: 'Воридшавӣ ба StructOS', loginSubheading: 'Корро бо объектҳои худ идома диҳед', registerHeading: 'Бақайдгирӣ дар StructOS', registerSubheading: 'Барои вазифаҳои сохтмонӣ фазои ягона созед', email: 'Почтаи электронӣ', registerEmail: 'Почтаи электронӣ', password: 'Рамз', remember: 'Маро дар хотир доред', forgot: 'Рамзро фаромӯш кардед?', loginButton: 'Ба StructOS ворид шудан', noAccount: 'Ҳисоб надоред?', createAccount: 'Эҷоди ҳисоб', fullName: 'Ному насаб', phone: 'Телефон', city: 'Шаҳр', role: 'Нақши асосӣ', chooseRole: 'Нақшро интихоб кунед', roleUser: 'Истифодабаранда', roleWorker: 'Коргар', roleForeman: 'Прораб / сардори гурӯҳ', roleEngineer: 'Муҳандис / ПТО', roleContractor: 'Пудратчӣ', roleCustomer: 'Фармоишгар', roleSupplier: 'Таъминкунанда', roleOther: 'Нақши дигар', createPassword: 'Рамз эҷод кунед', repeatPassword: 'Рамзро такрор кунед', passwordHint: 'Камаш 8 аломат, ҳарфҳо ва рақамҳо', agreement: 'Шартҳои истифода ва сиёсати махфиятро қабул мекунам', registerButton: 'Эҷоди ҳисоб', hasAccount: 'Аллакай ҳисоб доред?', goLogin: 'Ворид шудан', recoveryTitle: 'Барқарор кардани дастрасӣ', recoveryCopy: 'Почтаро ворид кунед — пайванди эҷоди рамзи навро мефиристем.', sendLink: 'Фиристодани пайванд', backLogin: 'Бозгашт ба воридшавӣ', newPasswordTitle: 'Рамзи нав', newPasswordCopy: 'Барои ҳисоби StructOS рамзи нав эҷод кунед.', savePassword: 'Нигоҳ доштани рамз', securityCopy: 'Рамз танҳо ба хидмати ҳифзшудаи авторизатсия фиристода мешавад ва дар сайт нигоҳ дошта намешавад', showPassword: 'Намоиши рамз', hidePassword: 'Пинҳон кардани рамз', required: 'Майдонҳои ҳатмиро пур кунед.', passwordsMismatch: 'Рамзҳо мувофиқат намекунанд.', weakPassword: 'Рамз бояд камаш 8 аломат, ҳарф ва рақам дошта бошад.', backendPending: 'Авторизатсияи ҳифзшуда барои пайвастшавӣ омода аст. Маълумот фиристода нашуд — аввал сервери алоҳидаи StructOS лозим аст.', loginSuccess: 'Воридшавӣ иҷро шуд.', registerSuccess: 'Ҳисоб эҷод шуд. Почтаро барои тасдиқ санҷед.', resetSuccess: 'Пайванди барқароркунӣ ба почта фиристода шуд.', passwordSaved: 'Рамзи нав нигоҳ дошта шуд.', genericError: 'Амал иҷро нашуд. Маълумотро санҷед.', working: 'Санҷиш…', fullNamePlaceholder: 'Иван Иванов', cityPlaceholder: 'Душанбе' },
  KY: { ...ru, tagline: 'БИРДИКТҮҮ КУРУЛУШ ИНТЕЛЛЕКТИ', language: 'Тил', storyKicker: 'СИЗДИН STRUCTOS МЕЙКИНДИГИҢИЗ', storyTitle: 'Курулуш интеллекти ар дайым жаныңызда', storyCopy: 'Объекттерди, талдоо жыйынтыктарын жана документтерди бир корголгон мейкиндикте сактаңыз.', benefitOne: 'Бардык объекттер бир жерде', benefitOneCopy: 'Долбоорлор, келишимдер жана сметалар өз ара байланышта', benefitTwo: 'Талдоо тарыхы', benefitTwoCopy: 'Эскертүүлөргө жана жыйынтыктарга каалаган убакта кайтыңыз', benefitThree: 'Куруучунун паспорту', benefitThreeCopy: 'Жеке 7 орундуу ID жана толук отчетторго жетүү', passportLabel: 'КУРУУЧУНУН ПАСПОРТУ', secureAccess: 'КОРГОЛГОН КИРҮҮ', login: 'Кирүү', register: 'Катталуу', loginHeading: 'StructOSко кирүү', loginSubheading: 'Объекттериңиз менен иштөөнү улантыңыз', registerHeading: 'StructOSто катталуу', registerSubheading: 'Курулуш милдеттери үчүн бирдиктүү мейкиндик түзүңүз', email: 'Электрондук почта', registerEmail: 'Электрондук почта', password: 'Сырсөз', remember: 'Мени эстеп калуу', forgot: 'Сырсөздү унуттуңузбу?', loginButton: 'StructOSко кирүү', noAccount: 'Аккаунтуңуз жокпу?', createAccount: 'Аккаунт түзүү', fullName: 'Аты-жөнү', phone: 'Телефон', city: 'Шаар', role: 'Негизги роль', chooseRole: 'Ролду тандаңыз', roleUser: 'Колдонуучу', roleWorker: 'Жумушчу', roleForeman: 'Прораб / бригадир', roleEngineer: 'Инженер / ПТО', roleContractor: 'Подрядчы', roleCustomer: 'Заказчы', roleSupplier: 'Жеткирүүчү', roleOther: 'Башка роль', createPassword: 'Сырсөз түзүңүз', repeatPassword: 'Сырсөздү кайталаңыз', passwordHint: 'Кеминде 8 белги, тамгалар жана сандар', agreement: 'Колдонуу шарттарын жана купуялык саясатын кабыл алам', registerButton: 'Аккаунт түзүү', hasAccount: 'Аккаунтуңуз барбы?', goLogin: 'Кирүү', recoveryTitle: 'Кирүүнү калыбына келтирүү', recoveryCopy: 'Электрондук почтаңызды жазыңыз — жаңы сырсөз үчүн шилтеме жөнөтөбүз.', sendLink: 'Шилтемени жөнөтүү', backLogin: 'Кирүүгө кайтуу', newPasswordTitle: 'Жаңы сырсөз', newPasswordCopy: 'StructOS аккаунту үчүн жаңы сырсөз түзүңүз.', savePassword: 'Сырсөздү сактоо', securityCopy: 'Сырсөз корголгон авторизация кызматына гана берилет жана сайтта сакталбайт', showPassword: 'Сырсөздү көрсөтүү', hidePassword: 'Сырсөздү жашыруу', required: 'Милдеттүү талааларды толтуруңуз.', passwordsMismatch: 'Сырсөздөр дал келбейт.', weakPassword: 'Сырсөз кеминде 8 белги, тамга жана сан камтышы керек.', backendPending: 'Коопсуз авторизация туташтырууга даяр. Маалымат жөнөтүлгөн жок — алгач StructOS үчүн өзүнчө сервер түзүү керек.', loginSuccess: 'Кирүү аткарылды.', registerSuccess: 'Аккаунт түзүлдү. Почтаңызды текшериңиз.', resetSuccess: 'Калыбына келтирүү шилтемеси почтага жөнөтүлдү.', passwordSaved: 'Жаңы сырсөз сакталды.', genericError: 'Аракет аткарылган жок. Маалыматты текшериңиз.', working: 'Текшерүү…', fullNamePlaceholder: 'Аты-жөнү', cityPlaceholder: 'Бишкек' },
  TR: { ...ru, tagline: 'BİRLEŞİK İNŞAAT ZEKÂSI', language: 'Dil', storyKicker: 'STRUCTOS ÇALIŞMA ALANINIZ', storyTitle: 'İnşaat zekâsı her zaman yanınızda', storyCopy: 'Projeleri, analiz sonuçlarını ve belgeleri tek bir güvenli alanda saklayın.', benefitOne: 'Tüm projeler tek yerde', benefitOneCopy: 'Projeler, sözleşmeler ve keşifler birbiriyle bağlantılı', benefitTwo: 'Analiz geçmişi', benefitTwoCopy: 'Bulgulara ve sonuçlara istediğiniz zaman dönün', benefitThree: 'İnşaatçı Pasaportu', benefitThreeCopy: 'Kişisel 7 haneli kimlik ve tam raporlara erişim', passportLabel: 'İNŞAATÇI PASAPORTU', secureAccess: 'GÜVENLİ ERİŞİM', login: 'Giriş', register: 'Kayıt', loginHeading: "StructOS'a giriş", loginSubheading: 'Projelerinizle çalışmaya devam edin', registerHeading: "StructOS'a kayıt", registerSubheading: 'İnşaat görevleriniz için tek bir alan oluşturun', email: 'E-posta', registerEmail: 'E-posta', password: 'Şifre', remember: 'Beni hatırla', forgot: 'Şifrenizi mi unuttunuz?', loginButton: "StructOS'a giriş", noAccount: 'Hesabınız yok mu?', createAccount: 'Hesap oluştur', fullName: 'Ad soyad', phone: 'Telefon', city: 'Şehir', role: 'Ana rol', chooseRole: 'Rol seçin', roleUser: 'Kullanıcı', roleWorker: 'Çalışan', roleForeman: 'Şantiye şefi / ekip lideri', roleEngineer: 'Mühendis / teknik ofis', roleContractor: 'Yüklenici', roleCustomer: 'Müşteri', roleSupplier: 'Tedarikçi', roleOther: 'Diğer rol', createPassword: 'Şifre oluşturun', repeatPassword: 'Şifreyi tekrarlayın', passwordHint: 'En az 8 karakter, harf ve rakam', agreement: 'Kullanım Koşullarını ve Gizlilik Politikasını kabul ediyorum', registerButton: 'Hesap oluştur', hasAccount: 'Zaten hesabınız var mı?', goLogin: 'Giriş', recoveryTitle: 'Erişimi kurtar', recoveryCopy: 'E-postanızı girin; yeni şifre oluşturma bağlantısı gönderelim.', sendLink: 'Bağlantıyı gönder', backLogin: 'Girişe dön', newPasswordTitle: 'Yeni şifre', newPasswordCopy: 'StructOS hesabınız için yeni bir şifre oluşturun.', savePassword: 'Şifreyi kaydet', securityCopy: 'Şifreniz yalnızca güvenli kimlik doğrulama hizmetine gönderilir ve sitede saklanmaz', showPassword: 'Şifreyi göster', hidePassword: 'Şifreyi gizle', required: 'Zorunlu alanları doldurun.', passwordsMismatch: 'Şifreler eşleşmiyor.', weakPassword: 'Şifre en az 8 karakter, harf ve rakam içermelidir.', backendPending: 'Güvenli kimlik doğrulama bağlantıya hazır. Veri gönderilmedi; önce ayrı bir StructOS sunucusu oluşturulmalıdır.', loginSuccess: 'Giriş başarılı.', registerSuccess: 'Hesap oluşturuldu. E-postanızı kontrol edin.', resetSuccess: 'Kurtarma bağlantısı e-postanıza gönderildi.', passwordSaved: 'Yeni şifreniz kaydedildi.', genericError: 'İşlem tamamlanamadı. Bilgileri kontrol edin.', working: 'Kontrol ediliyor…', fullNamePlaceholder: 'Ad Soyad', cityPlaceholder: 'İstanbul' }
};

Object.assign(copy.EN, { home: 'Home', getPassport: 'Get your Builder Passport', languageNote: 'Fill in the form in any language — profile data will be stored in Russian', role: 'Primary role', chooseRole: 'Choose a role', roleUser: 'User', roleExecutor: 'Contractor / worker', roleSupplier: 'Supplier', roleAggregator: 'Aggregator', profession: 'Primary profession', professionHint: 'Type a profession and select it from the list', professionPlaceholder: 'Start typing a profession', professionInvalid: 'Select a profession from the suggested list.' });
Object.assign(copy.TJ, { home: 'Ба саҳифаи асосӣ', getPassport: 'Шиносномаи сохтмончиро гиред', languageNote: 'Бо забони бароҳат пур кунед — маълумот дар профил ба русӣ нигоҳ дошта мешавад', role: 'Нақши асосӣ', chooseRole: 'Нақшро интихоб кунед', roleUser: 'Истифодабаранда', roleExecutor: 'Иҷрокунанда', roleSupplier: 'Таъминкунанда', roleAggregator: 'Агрегатор', profession: 'Касби асосӣ', professionHint: 'Номи касбро ворид карда, аз рӯйхат интихоб кунед', professionPlaceholder: 'Навиштани касбро оғоз кунед', professionInvalid: 'Касбро аз рӯйхати пешниҳодшуда интихоб кунед.' });
Object.assign(copy.KY, { home: 'Башкы бетке', getPassport: 'Куруучунун паспортун алыңыз', languageNote: 'Ыңгайлуу тилде толтуруңуз — профилдеги маалымат орус тилинде сакталат', role: 'Негизги роль', chooseRole: 'Ролду тандаңыз', roleUser: 'Колдонуучу', roleExecutor: 'Аткаруучу', roleSupplier: 'Жеткирүүчү', roleAggregator: 'Агрегатор', profession: 'Негизги кесип', professionHint: 'Кесипти жаза баштап, тизмеден тандаңыз', professionPlaceholder: 'Кесипти жаза баштаңыз', professionInvalid: 'Кесипти сунушталган тизмеден тандаңыз.' });
Object.assign(copy.TR, { home: 'Ana sayfa', getPassport: 'İnşaatçı Pasaportunuzu alın', languageNote: 'Formu istediğiniz dilde doldurun — profil verileri Rusça kaydedilir', role: 'Ana rol', chooseRole: 'Rol seçin', roleUser: 'Kullanıcı', roleExecutor: 'Uygulayıcı', roleSupplier: 'Tedarikçi', roleAggregator: 'Aracı', profession: 'Ana meslek', professionHint: 'Mesleği yazmaya başlayın ve listeden seçin', professionPlaceholder: 'Mesleği yazmaya başlayın', professionInvalid: 'Önerilen listeden bir meslek seçin.' });

const supabaseUrl = supabaseConfig.url || import.meta.env?.VITE_SUPABASE_URL;
const supabaseKey = supabaseConfig.publishableKey || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY;
let authClient = null;
const DEMO_SESSION_KEY = 'structos-demo-session';
const DEMO_EMAIL = 'str@str.com';
const DEMO_PASSWORD = 'str';

async function initAuthClient() {
  if (!supabaseUrl || !supabaseKey) return;
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.112.3/+esm');
    authClient = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    authClient.auth.onAuthStateChange((event) => { if (event === 'PASSWORD_RECOVERY') setMode('newPassword', false); });
  } catch {
    authClient = null;
  }
}
let language = copy[localStorage.getItem('structos-language')] ? localStorage.getItem('structos-language') : 'RU';
let mode = 'login';
let professionActiveIndex = -1;

function tr(key) { return copy[language]?.[key] ?? ru[key] ?? key; }

function applyLanguage(nextLanguage) {
  language = copy[nextLanguage] ? nextLanguage : 'RU';
  localStorage.setItem('structos-language', language);
  root.lang = { RU: 'ru', EN: 'en', TJ: 'tg', KY: 'ky', TR: 'tr' }[language];
  $('.auth-language').value = language;
  $$('[data-auth-i18n]').forEach((element) => { element.textContent = tr(element.dataset.authI18n); });
  const login = $('[data-auth-form="login"]');
  const register = $('[data-auth-form="register"]');
  login.elements.email.placeholder = tr('emailPlaceholder');
  login.elements.password.placeholder = tr('passwordPlaceholder');
  register.elements.fullName.placeholder = tr('fullNamePlaceholder');
  register.elements.email.placeholder = tr('emailPlaceholder');
  register.elements.city.placeholder = tr('cityPlaceholder');
  register.elements.professionDisplay.placeholder = tr('professionPlaceholder');
  register.elements.password.placeholder = tr('passwordPlaceholder');
  register.elements.passwordConfirm.placeholder = tr('repeatPlaceholder');
  $$('.password-toggle').forEach((button) => { const input = $('input', button.parentElement); button.setAttribute('aria-label', tr(input.type === 'password' ? 'showPassword' : 'hidePassword')); });
  updateHeading();
  if (!$('.profession-options').hidden) renderProfessionOptions(register.elements.professionDisplay.value);
  document.title = `${mode === 'register' ? tr('registerHeading') : tr('loginHeading')} — StructOS`;
}

function professionMatches(query) {
  if (!String(query || '').trim()) return professions.slice(0, 40);
  return findProfessions(query, 40);
}

function closeProfessionOptions() {
  const options = $('.profession-options');
  options.hidden = true;
  $('.profession-input').setAttribute('aria-expanded', 'false');
  professionActiveIndex = -1;
}

function chooseProfession(profession) {
  const register = $('[data-auth-form="register"]');
  register.elements.professionDisplay.value = profession.ru;
  register.elements.professionDisplay.dataset.profession = profession.ru;
  $('input[name="profession"]', register).value = profession.ru;
  register.elements.professionDisplay.setCustomValidity('');
  closeProfessionOptions();
}

function renderProfessionOptions(query = '') {
  const options = $('.profession-options');
  const matches = professionMatches(query);
  options.replaceChildren(...matches.map((profession, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'option';
    button.dataset.profession = profession.ru;
    button.setAttribute('aria-selected', String(index === professionActiveIndex));
    button.innerHTML = `<strong>${profession.ru}</strong><small>${tr('profession')}</small>`;
    button.addEventListener('mousedown', (event) => event.preventDefault());
    button.addEventListener('click', () => chooseProfession(profession));
    return button;
  }));
  options.hidden = matches.length === 0;
  $('.profession-input').setAttribute('aria-expanded', String(matches.length > 0));
}

function applyTheme(theme) {
  const dark = theme === 'dark';
  root.dataset.theme = dark ? 'dark' : 'light';
  localStorage.setItem('structos-theme', dark ? 'dark' : 'light');
  $('meta[name="theme-color"]').content = dark ? '#06101d' : '#f4f9ff';
  $('.auth-theme').setAttribute('aria-pressed', String(dark));
}

function updateHeading() {
  const heading = mode === 'register' ? 'registerHeading' : mode === 'login' ? 'loginHeading' : mode === 'newPassword' ? 'newPasswordTitle' : 'recoveryTitle';
  const subheading = mode === 'register' ? 'registerSubheading' : mode === 'login' ? 'loginSubheading' : mode === 'newPassword' ? 'newPasswordCopy' : 'recoveryCopy';
  $('[data-auth-heading]').textContent = tr(heading);
  $('[data-auth-subheading]').textContent = tr(subheading);
}

function setMode(nextMode, updateHash = true) {
  mode = ['login', 'register', 'recovery', 'newPassword'].includes(nextMode) ? nextMode : 'login';
  $$('[data-auth-form]').forEach((form) => { form.hidden = form.dataset.authForm !== mode; });
  $$('[data-auth-tab]').forEach((tab) => tab.setAttribute('aria-selected', String(tab.dataset.authTab === mode)));
  $('.auth-tabs').classList.toggle('register-active', mode === 'register');
  $('.auth-panel').classList.toggle('is-recovery', mode === 'recovery' || mode === 'newPassword');
  $('.auth-feedback').hidden = true;
  updateHeading();
  document.title = `${mode === 'register' ? tr('registerHeading') : tr('loginHeading')} — StructOS`;
  if (updateHash && (mode === 'login' || mode === 'register' || mode === 'recovery')) history.replaceState(null, '', `#${mode}`);
}

function setFeedback(message, type = 'info') {
  const feedback = $('.auth-feedback');
  feedback.textContent = message;
  feedback.dataset.type = type;
  feedback.hidden = false;
}

function setBusy(form, busy) {
  const button = $('.auth-submit', form);
  button.disabled = busy;
  button.classList.toggle('is-loading', busy);
}

function validate(form) {
  if (form.dataset.authForm === 'register' && !form.elements.professionDisplay.dataset.profession) {
    form.elements.professionDisplay.setCustomValidity(tr('professionInvalid'));
  }
  if (!form.checkValidity()) { form.reportValidity(); setFeedback(tr('required'), 'error'); return false; }
  const password = form.elements.password?.value || '';
  const confirm = form.elements.passwordConfirm?.value;
  if (password && (!/[A-Za-zА-Яа-яЁё]/.test(password) || !/\d/.test(password) || password.length < 8)) { setFeedback(tr('weakPassword'), 'error'); form.elements.password.focus(); return false; }
  if (confirm !== undefined && password !== confirm) { setFeedback(tr('passwordsMismatch'), 'error'); form.elements.passwordConfirm.focus(); return false; }
  return true;
}

function friendlyError(error) {
  if (!error?.message) return tr('genericError');
  const known = /invalid login credentials/i.test(error.message) ? tr('genericError') : error.message;
  return known;
}

async function submitLogin(form) {
  const email = form.elements.email.value.trim().toLowerCase();
  const password = form.elements.password.value;
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify({ email: DEMO_EMAIL, name: 'StructOS', role: 'Пользователь', id: '4 820 197' }));
    setFeedback(tr('loginSuccess'), 'success');
    setTimeout(() => window.location.assign('dashboard.html'), 350);
    return;
  }
  if (!validate(form)) return;
  if (!authClient) { setFeedback(tr('backendPending'), 'info'); return; }
  setBusy(form, true);
  const { error } = await authClient.auth.signInWithPassword({ email, password });
  setBusy(form, false);
  if (error) setFeedback(friendlyError(error), 'error'); else { setFeedback(tr('loginSuccess'), 'success'); setTimeout(() => window.location.assign('dashboard.html'), 450); }
}

async function submitRegister(form) {
  if (!validate(form)) return;
  if (!authClient) { setFeedback(tr('backendPending'), 'info'); return; }
  setBusy(form, true);
  const redirect = new URL('login.html#login', window.location.href).href;
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);
  const structosId = String(1000000 + (randomValues[0] % 9000000));
  const { data, error } = await authClient.auth.signUp({
    email: form.elements.email.value.trim(),
    password: form.elements.password.value,
    options: { emailRedirectTo: redirect, data: { structos_id: structosId, full_name: form.elements.fullName.value.trim(), phone: form.elements.phone.value.trim(), city: form.elements.city.value.trim(), primary_role: form.elements.role.value, primary_profession: form.elements.professionDisplay.dataset.profession } }
  });
  setBusy(form, false);
  if (error) setFeedback(friendlyError(error), 'error'); else { setFeedback(tr('registerSuccess'), 'success'); form.reset(); updateStrength(''); if (data?.session) setTimeout(() => window.location.assign('dashboard.html'), 450); }
}

async function submitRecovery(form) {
  if (!validate(form)) return;
  if (!authClient) { setFeedback(tr('backendPending'), 'info'); return; }
  setBusy(form, true);
  const redirect = new URL('login.html', window.location.href).href;
  const { error } = await authClient.auth.resetPasswordForEmail(form.elements.email.value.trim(), { redirectTo: redirect });
  setBusy(form, false);
  if (error) setFeedback(friendlyError(error), 'error'); else setFeedback(tr('resetSuccess'), 'success');
}

async function submitNewPassword(form) {
  if (!validate(form)) return;
  if (!authClient) { setFeedback(tr('backendPending'), 'info'); return; }
  setBusy(form, true);
  const { error } = await authClient.auth.updateUser({ password: form.elements.password.value });
  setBusy(form, false);
  if (error) setFeedback(friendlyError(error), 'error'); else { setFeedback(tr('passwordSaved'), 'success'); setTimeout(() => setMode('login'), 900); }
}

function updateStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Za-zА-Яа-яЁё]/.test(password) && /\d/.test(password)) score += 1;
  if (/[A-ZА-ЯЁ]/.test(password) && /[a-zа-яё]/.test(password)) score += 1;
  if (/[^A-Za-zА-Яа-яЁё\d]/.test(password) || password.length >= 12) score += 1;
  $$('.password-strength > span').forEach((bar, index) => bar.classList.toggle('active', index < score));
}

$$('[data-auth-tab]').forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.authTab)));
$$('[data-switch-auth]').forEach((button) => button.addEventListener('click', () => setMode(button.dataset.switchAuth)));
$('[data-open-recovery]').addEventListener('click', () => setMode('recovery'));
$('.auth-language').addEventListener('change', (event) => applyLanguage(event.target.value));
$('.auth-theme').addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
$$('.password-toggle').forEach((button) => button.addEventListener('click', () => { const input = $('input', button.parentElement); input.type = input.type === 'password' ? 'text' : 'password'; button.classList.toggle('is-visible', input.type === 'text'); button.setAttribute('aria-label', tr(input.type === 'password' ? 'showPassword' : 'hidePassword')); }));
$('[data-auth-form="register"] input[name="password"]').addEventListener('input', (event) => updateStrength(event.target.value));
const professionInput = $('.profession-input');
professionInput.addEventListener('focus', () => renderProfessionOptions(professionInput.value));
professionInput.addEventListener('input', () => {
  $('input[name="profession"]', $('[data-auth-form="register"]')).value = '';
  delete professionInput.dataset.profession;
  professionInput.setCustomValidity(tr('professionInvalid'));
  professionActiveIndex = -1;
  renderProfessionOptions(professionInput.value);
});
professionInput.addEventListener('keydown', (event) => {
  const choices = $$('.profession-options button');
  if (!choices.length) return;
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    professionActiveIndex = event.key === 'ArrowDown' ? Math.min(professionActiveIndex + 1, choices.length - 1) : Math.max(professionActiveIndex - 1, 0);
    choices.forEach((choice, index) => choice.setAttribute('aria-selected', String(index === professionActiveIndex)));
    choices[professionActiveIndex]?.scrollIntoView({ block: 'nearest' });
  }
  if (event.key === 'Enter' && professionActiveIndex >= 0) {
    event.preventDefault();
    const profession = professions.find(({ ru: name }) => name === choices[professionActiveIndex].dataset.profession);
    if (profession) chooseProfession(profession);
  }
  if (event.key === 'Escape') closeProfessionOptions();
});
professionInput.addEventListener('blur', () => setTimeout(() => {
  closeProfessionOptions();
  if (!professionInput.dataset.profession) professionInput.setCustomValidity(tr('professionInvalid'));
}, 120));
$$('[data-auth-form]').forEach((form) => form.addEventListener('submit', (event) => { event.preventDefault(); if (form.dataset.authForm === 'login') submitLogin(form); if (form.dataset.authForm === 'register') submitRegister(form); if (form.dataset.authForm === 'recovery') submitRecovery(form); if (form.dataset.authForm === 'newPassword') submitNewPassword(form); }));
window.addEventListener('hashchange', () => {
  if (location.hash === '#register') setMode('register', false);
  if (location.hash === '#login') setMode('login', false);
  if (location.hash === '#recovery') setMode('recovery', false);
});

applyTheme(localStorage.getItem('structos-theme') === 'dark' ? 'dark' : 'light');
setMode(location.hash === '#register' ? 'register' : location.hash === '#recovery' ? 'recovery' : 'login', false);
applyLanguage(language);
void initAuthClient();
