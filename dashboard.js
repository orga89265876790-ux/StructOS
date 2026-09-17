import { supabaseConfig } from './auth-config.js';
import { professions } from './professions.js';
import { metroDirectory } from './metro-directory.js';
import { createOfflineSyncEngine } from './offline-sync.js';

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

Object.assign(copy.RU, { shareEarn: 'Поделись — за регистрацию +200 бонусов', share: 'Поделиться', referralCopied: 'Реферальная ссылка скопирована', passportFirstRewardShort: '+200 за первое заполнение', passport65RewardShort: '+300 при заполнении свыше 65%', topUp: 'Пополнить', topUpAmount: 'Сумма пополнения', topUpHint: 'За каждый пополненный рубль начисляется 10% бонусами', balanceHistory: 'История пополнений', bonusHistory: 'История начислений', noOperations: 'Операций пока нет', balanceTopUp: 'Пополнение баланса', topUpBonus: 'Бонус 10% за пополнение', passportFirstReward: 'Первое заполнение Паспорта строителя', passport65Reward: 'Паспорт строителя заполнен свыше 65%', referralReward: 'Регистрация по вашей ссылке', bonusRules: 'Как начисляются бонусы', analyze: 'Анализировать', analysisStarted: 'StructOS проверяет загруженные данные и формирует результат.', analysisComplete: 'Анализ завершён', analysisCompleteCopy: 'Результат сохранён. Выберите следующее действие.', viewReport: 'Посмотреть отчёт', startObject: 'Запустить объект', report: 'Отчёт', invalidAmount: 'Введите сумму больше нуля', credited: 'Баланс пополнен, бонусы начислены' });
Object.assign(copy.EN, { shareEarn: 'Share — get +200 bonuses for registration', share: 'Share', referralCopied: 'Referral link copied', passportFirstRewardShort: '+200 for first completion', passport65RewardShort: '+300 when completion exceeds 65%', topUp: 'Top up', topUpAmount: 'Top-up amount', topUpHint: 'Every deposited ruble earns 10% in bonuses', balanceHistory: 'Top-up history', bonusHistory: 'Bonus history', noOperations: 'No transactions yet', balanceTopUp: 'Balance top-up', topUpBonus: '10% top-up bonus', passportFirstReward: 'First Builder Passport completion', passport65Reward: 'Builder Passport completion exceeded 65%', referralReward: 'Registration through your link', bonusRules: 'How bonuses are earned', analyze: 'Analyze', analysisStarted: 'StructOS is checking the uploaded data and preparing the result.', analysisComplete: 'Analysis complete', analysisCompleteCopy: 'The result has been saved. Choose the next action.', viewReport: 'View report', startObject: 'Start object', report: 'Report', invalidAmount: 'Enter an amount greater than zero', credited: 'Balance topped up and bonuses credited' });
Object.assign(copy.KY, { shareEarn: 'Бөлүшүңүз — катталуу үчүн +200 бонус', share: 'Бөлүшүү', referralCopied: 'Шилтеме көчүрүлдү', passportFirstRewardShort: 'Биринчи толтурууга +200', passport65RewardShort: '65%дан ашса +300', topUp: 'Толуктоо', topUpAmount: 'Толуктоо суммасы', topUpHint: 'Ар бир толукталган рубль үчүн 10% бонус берилет', balanceHistory: 'Толуктоолор тарыхы', bonusHistory: 'Бонустар тарыхы', noOperations: 'Азырынча операция жок', balanceTopUp: 'Балансты толуктоо', topUpBonus: 'Толуктоо үчүн 10% бонус', passportFirstReward: 'Куруучунун паспортун биринчи толтуруу', passport65Reward: 'Куруучунун паспорту 65%дан ашык толтурулду', referralReward: 'Сиздин шилтеме аркылуу катталуу', bonusRules: 'Бонустар кантип берилет', analyze: 'Талдоо', analysisStarted: 'StructOS жүктөлгөн маалыматтарды текшерип жатат.', analysisComplete: 'Талдоо аяктады', analysisCompleteCopy: 'Натыйжа сакталды. Кийинки аракетти тандаңыз.', viewReport: 'Отчётту көрүү', startObject: 'Объектти ишке киргизүү', report: 'Отчёт', invalidAmount: 'Нөлдөн чоң сумманы жазыңыз', credited: 'Баланс толукталды, бонустар берилди' });
Object.assign(copy.TJ, { shareEarn: 'Мубодила кунед — барои бақайдгирӣ +200 бонус', share: 'Мубодила', referralCopied: 'Пайванди даъват нусха шуд', passportFirstRewardShort: '+200 барои пуркунии аввал', passport65RewardShort: '+300 ҳангоми зиёда аз 65%', topUp: 'Пур кардан', topUpAmount: 'Маблағи пуркунӣ', topUpHint: 'Барои ҳар рубли пуршуда 10% бонус дода мешавад', balanceHistory: 'Таърихи пуркунӣ', bonusHistory: 'Таърихи бонусҳо', noOperations: 'Ҳоло амалиёт нест', balanceTopUp: 'Пуркунии тавозун', topUpBonus: '10% бонус барои пуркунӣ', passportFirstReward: 'Пуркунии аввали шиносномаи сохтмончӣ', passport65Reward: 'Шиносномаи сохтмончӣ зиёда аз 65% пур шуд', referralReward: 'Бақайдгирӣ тавассути пайванди шумо', bonusRules: 'Бонусҳо чӣ гуна дода мешаванд', analyze: 'Таҳлил кардан', analysisStarted: 'StructOS маълумоти боршударо месанҷад ва натиҷаро омода мекунад.', analysisComplete: 'Таҳлил анҷом ёфт', analysisCompleteCopy: 'Натиҷа нигоҳ дошта шуд. Амали навбатиро интихоб кунед.', viewReport: 'Дидани ҳисобот', startObject: 'Оғози объект', report: 'Ҳисобот', invalidAmount: 'Маблағи аз сифр зиёдро ворид кунед', credited: 'Тавозун пур ва бонусҳо дода шуданд' });

Object.assign(copy.RU, {
  upload: 'Загрузить', uploadProject: 'Загрузить проект', uploadContract: 'Загрузить договор', uploadEstimate: 'Загрузить смету',
  oneFilePerCategory: 'Один файл в каждой категории', objectNameHint: 'Объединим проект, договор и смету в одном объекте', objectRequired: 'Укажите название объекта',
  selectFile: 'Выберите файл', dropFile: 'или перетащите его сюда', deviceFile: 'Файл с устройства', photoOrCamera: 'Фото / камера', replace: 'Заменить', deleteFile: 'Удалить файл',
  allowedFormats: 'Форматы', maxFileSize: 'Максимальный размер', userUploadPlan: 'Тариф «Пользователь»: 1 файл в категории · хранилище 1 ГБ',
  onlyOneFile: 'В категорию можно добавить только один файл', fileTooLarge: 'Файл превышает допустимый размер', unsupportedFormat: 'Этот формат файла не поддерживается', fileSelected: 'Файл выбран', fileDeleted: 'Файл удалён', uploadComplete: 'Файл добавлен в личный кабинет', uploadFirst: 'Сначала загрузите проект, договор или смету',
  filesReady: 'Файлы готовы к анализу', analysisFilesCount: 'файл(а)'
});
Object.assign(copy.EN, {
  upload: 'Upload', uploadProject: 'Upload project', uploadContract: 'Upload contract', uploadEstimate: 'Upload estimate',
  oneFilePerCategory: 'One file in each category', objectNameHint: 'We will combine the project, contract, and estimate in one object', objectRequired: 'Enter the object name',
  selectFile: 'Choose a file', dropFile: 'or drag it here', deviceFile: 'File from device', photoOrCamera: 'Photo / camera', replace: 'Replace', deleteFile: 'Delete file',
  allowedFormats: 'Formats', maxFileSize: 'Maximum size', userUploadPlan: 'User plan: 1 file per category · 1 GB storage',
  onlyOneFile: 'Only one file can be added to this category', fileTooLarge: 'The file exceeds the allowed size', unsupportedFormat: 'This file format is not supported', fileSelected: 'File selected', fileDeleted: 'File deleted', uploadComplete: 'File added to your account', uploadFirst: 'Upload a project, contract, or estimate first',
  filesReady: 'Files are ready for analysis', analysisFilesCount: 'file(s)'
});
Object.assign(copy.KY, {
  upload: 'Жүктөө', uploadProject: 'Долбоорду жүктөө', uploadContract: 'Келишимди жүктөө', uploadEstimate: 'Сметаны жүктөө',
  oneFilePerCategory: 'Ар бир категорияда бир файл', objectNameHint: 'Долбоор, келишим жана смета бир объектке бириктирилет', objectRequired: 'Объекттин атын жазыңыз',
  selectFile: 'Файлды тандаңыз', dropFile: 'же бул жерге сүйрөңүз', deviceFile: 'Түзмөктөн файл', photoOrCamera: 'Сүрөт / камера', replace: 'Алмаштыруу', deleteFile: 'Файлды өчүрүү',
  allowedFormats: 'Форматтар', maxFileSize: 'Эң чоң өлчөм', userUploadPlan: '«Колдонуучу» тарифи: категорияга 1 файл · 1 ГБ сактагыч',
  onlyOneFile: 'Категорияга бир гана файл кошууга болот', fileTooLarge: 'Файлдын өлчөмү чектен ашты', unsupportedFormat: 'Бул файл форматы колдоого алынбайт', fileSelected: 'Файл тандалды', fileDeleted: 'Файл өчүрүлдү', uploadComplete: 'Файл жеке кабинетке кошулду', uploadFirst: 'Адегенде долбоор, келишим же смета жүктөңүз',
  filesReady: 'Файлдар талдоого даяр', analysisFilesCount: 'файл'
});
Object.assign(copy.TJ, {
  upload: 'Бор кардан', uploadProject: 'Бор кардани лоиҳа', uploadContract: 'Бор кардани шартнома', uploadEstimate: 'Бор кардани смета',
  oneFilePerCategory: 'Дар ҳар гурӯҳ як файл', objectNameHint: 'Лоиҳа, шартнома ва смета дар як объект муттаҳид мешаванд', objectRequired: 'Номи объектро ворид кунед',
  selectFile: 'Файлро интихоб кунед', dropFile: 'ё онро ба ин ҷо кашед', deviceFile: 'Файл аз дастгоҳ', photoOrCamera: 'Акс / камера', replace: 'Иваз кардан', deleteFile: 'Нест кардани файл',
  allowedFormats: 'Форматҳо', maxFileSize: 'Андозаи ҳадди аксар', userUploadPlan: 'Тарифи «Истифодабаранда»: 1 файл дар гурӯҳ · 1 ГБ ҷой',
  onlyOneFile: 'Дар гурӯҳ танҳо як файл илова мешавад', fileTooLarge: 'Андозаи файл аз ҳад зиёд аст', unsupportedFormat: 'Ин формати файл дастгирӣ намешавад', fileSelected: 'Файл интихоб шуд', fileDeleted: 'Файл нест шуд', uploadComplete: 'Файл ба кабинети шахсӣ илова шуд', uploadFirst: 'Аввал лоиҳа, шартнома ё сметаро бор кунед',
  filesReady: 'Файлҳо барои таҳлил омодаанд', analysisFilesCount: 'файл'
});

Object.assign(copy.RU, { refreshPage: 'Обновить страницу', memoryUsed: 'Память', profileFullReward: 'Профиль заполнен на 100%', storageB: 'Б', storageKb: 'КБ', storageMb: 'МБ', storageGb: 'ГБ' });
Object.assign(copy.EN, { refreshPage: 'Refresh page', memoryUsed: 'Storage', profileFullReward: 'Profile completed to 100%', storageB: 'B', storageKb: 'KB', storageMb: 'MB', storageGb: 'GB' });
Object.assign(copy.KY, { refreshPage: 'Баракты жаңыртуу', memoryUsed: 'Эстутум', profileFullReward: 'Профиль 100% толтурулду', storageB: 'Б', storageKb: 'КБ', storageMb: 'МБ', storageGb: 'ГБ' });
Object.assign(copy.TJ, { refreshPage: 'Нав кардани саҳифа', memoryUsed: 'Хотира', profileFullReward: 'Профил 100% пур шуд', storageB: 'Б', storageKb: 'КБ', storageMb: 'МБ', storageGb: 'ГБ' });

Object.assign(copy.RU, { uploadedObjects: 'Загруженные объекты', noUploadedObjects: 'Загруженных объектов пока нет', uploaded: 'Загружен', uploadedAt: 'Загружен', readyStatus: 'Готов к запуску', addToObject: 'Добавить в объект', newObject: 'Создать новый объект', chooseObjectDocument: 'Выберите раздел объекта', notUploaded: 'Не загружено', openObject: 'Открыть карточку объекта', analyzeObject: 'Анализировать объект' });
Object.assign(copy.EN, { uploadedObjects: 'Uploaded objects', noUploadedObjects: 'No uploaded objects yet', uploaded: 'Uploaded', uploadedAt: 'Uploaded', readyStatus: 'Ready to launch', addToObject: 'Add to object', newObject: 'Create a new object', chooseObjectDocument: 'Choose an object section', notUploaded: 'Not uploaded', openObject: 'Open object card', analyzeObject: 'Analyze object' });
Object.assign(copy.KY, { uploadedObjects: 'Жүктөлгөн объекттер', noUploadedObjects: 'Азырынча жүктөлгөн объект жок', uploaded: 'Жүктөлдү', uploadedAt: 'Жүктөлдү', readyStatus: 'Ишке даяр', addToObject: 'Объектке кошуу', newObject: 'Жаңы объект түзүү', chooseObjectDocument: 'Объекттин бөлүмүн тандаңыз', notUploaded: 'Жүктөлгөн жок', openObject: 'Объекттин картасын ачуу', analyzeObject: 'Объектти талдоо' });
Object.assign(copy.TJ, { uploadedObjects: 'Объектҳои боршуда', noUploadedObjects: 'Ҳоло объекти боршуда нест', uploaded: 'Бор шуд', uploadedAt: 'Бор шуд', readyStatus: 'Омода ба оғоз', addToObject: 'Ба объект илова кардан', newObject: 'Объекти нав сохтан', chooseObjectDocument: 'Бахши объектро интихоб кунед', notUploaded: 'Бор нашудааст', openObject: 'Кушодани корти объект', analyzeObject: 'Таҳлили объект' });

Object.assign(copy.RU, { forceRefresh: 'Принудительно обновить', resizeHint: 'Размер: двумя пальцами или потяните за угол', onField: 'Уже на поле', addToField: 'Добавить на поле', widgetTasks: 'Список дел', widgetTeam: 'Команда', widgetFinance: 'Финансы' });
Object.assign(copy.EN, { forceRefresh: 'Force refresh', resizeHint: 'Resize with two fingers or drag the corner', onField: 'Already on the field', addToField: 'Add to the field', widgetTasks: 'To-do list', widgetTeam: 'Team', widgetFinance: 'Finance' });
Object.assign(copy.KY, { forceRefresh: 'Мажбурлап жаңыртуу', resizeHint: 'Эки манжа менен же бурчун тартып өлчөмүн өзгөртүңүз', onField: 'Талаада бар', addToField: 'Талаага кошуу', widgetTasks: 'Иштер тизмеси', widgetTeam: 'Команда', widgetFinance: 'Каржы' });
Object.assign(copy.TJ, { forceRefresh: 'Навсозии маҷбурӣ', resizeHint: 'Бо ду ангушт ё кашидани кунҷ андозаро иваз кунед', onField: 'Дар майдон аст', addToField: 'Ба майдон илова кардан', widgetTasks: 'Рӯйхати корҳо', widgetTeam: 'Даста', widgetFinance: 'Молия' });

Object.assign(copy.RU, {
  money: 'Деньги', quickCashflow: 'Короткие договора', cashflowDescription: 'Короткий финансовый учёт по каждому объекту', noCashObjects: 'Объектов для учёта пока нет', noCashObjectsCopy: 'Добавьте объект, укажите его стоимость и ведите полученные суммы и расходы.',
  objectCost: 'Стоимость объекта', workByFact: 'Работаю от факта выполнения', paymentByFact: 'Оплата по факту', received: 'Получено', expense: 'Расход', totalReceived: 'Итого получено', totalExpense: 'Итого расход', remainingFromCost: 'Осталось от стоимости объекта', income: 'Доход', balanceResult: 'Баланс: доход − расход', comment: 'Комментарий', addIncome: 'Добавить доход', addExpense: 'Добавить расход', createCashObject: 'Создать финансовый объект', cashObjectCreated: 'Объект добавлен в быстрый учёт', amountRequired: 'Укажите сумму и комментарий', noEntries: 'Записей пока нет',
  widgetAppearance: 'Оформление блока', doubleTapHint: 'Двойное касание открывает оформление', blockColor: 'Внутренний цвет', pulseBlock: 'Пульсация блока',
  widgetDrawing: 'Рисование', drawing: 'Рисование', lineColor: 'Цвет', lineWidth: 'Толщина', undo: 'Отменить', clearDrawing: 'Очистить', stylusHint: 'Рисуйте пальцем, стилусом или Apple Pencil', uploadBackground: 'Загрузить файл', save: 'Сохранить', viewSaved: 'Сохранённое', format: 'Формат', shareDrawing: 'Отправить', savedDrawings: 'Сохранённые рисунки', noSavedDrawings: 'Сохранённых рисунков пока нет', loadDrawing: 'Открыть', drawingSaved: 'Рисунок сохранён', backgroundLoaded: 'Страница загружена для рисования', drawingShareReady: 'Файл подготовлен', newSketch: 'Новый эскиз',
  todoList: 'Список дел', todoEmpty: 'Добавьте первое дело', newTask: 'Новое дело', addTask: 'Добавить дело', taskAdded: 'Дело добавлено', taskDeleted: 'Дело удалено', deleteTask: 'Удалить дело', deleteTaskConfirm: 'Удалить это дело?', dueDate: 'Дата выполнения', overdueTask: 'Просрочено', todayTask: 'Сегодня', nextTask: 'Следующее дело', futureTask: 'Запланировано', completedTask: 'Выполнено'
});
Object.assign(copy.EN, {
  money: 'Money', quickCashflow: 'Short contracts', cashflowDescription: 'Simple financial tracking for each object', noCashObjects: 'No tracked objects yet', noCashObjectsCopy: 'Add an object, set its value, and record received amounts and expenses.',
  objectCost: 'Object value', workByFact: 'Work by actual completion', paymentByFact: 'Payment by actual completion', received: 'Received', expense: 'Expense', totalReceived: 'Total received', totalExpense: 'Total expense', remainingFromCost: 'Remaining from object value', income: 'Income', balanceResult: 'Balance: income − expense', comment: 'Comment', addIncome: 'Add income', addExpense: 'Add expense', createCashObject: 'Create financial object', cashObjectCreated: 'Object added to quick tracking', amountRequired: 'Enter an amount and comment', noEntries: 'No entries yet',
  widgetAppearance: 'Block appearance', doubleTapHint: 'Double tap opens appearance settings', blockColor: 'Inner color', pulseBlock: 'Pulse block',
  widgetDrawing: 'Drawing', drawing: 'Drawing', lineColor: 'Color', lineWidth: 'Width', undo: 'Undo', clearDrawing: 'Clear', stylusHint: 'Draw with a finger, stylus, or Apple Pencil', uploadBackground: 'Upload file', save: 'Save', viewSaved: 'Saved', format: 'Format', shareDrawing: 'Share', savedDrawings: 'Saved drawings', noSavedDrawings: 'No saved drawings yet', loadDrawing: 'Open', drawingSaved: 'Drawing saved', backgroundLoaded: 'Page loaded for drawing', drawingShareReady: 'File prepared', newSketch: 'New sketch',
  todoList: 'To-do list', todoEmpty: 'Add your first task', newTask: 'New task', addTask: 'Add task', taskAdded: 'Task added', taskDeleted: 'Task deleted', deleteTask: 'Delete task', deleteTaskConfirm: 'Delete this task?', dueDate: 'Due date', overdueTask: 'Overdue', todayTask: 'Today', nextTask: 'Next task', futureTask: 'Scheduled', completedTask: 'Completed'
});
Object.assign(copy.KY, {
  money: 'Акча', quickCashflow: 'Кыска келишимдер', cashflowDescription: 'Ар бир объект боюнча кыска каржы эсеби', noCashObjects: 'Эсеп үчүн объект жок', noCashObjectsCopy: 'Объект кошуп, баасын, түшкөн акчаны жана чыгашаны жазыңыз.',
  objectCost: 'Объекттин баасы', workByFact: 'Аткарылган иш боюнча иштейм', paymentByFact: 'Факт боюнча төлөм', received: 'Алынды', expense: 'Чыгаша', totalReceived: 'Бардыгы алынды', totalExpense: 'Бардык чыгаша', remainingFromCost: 'Объекттин баасынан калды', income: 'Киреше', balanceResult: 'Баланс: киреше − чыгаша', comment: 'Комментарий', addIncome: 'Киреше кошуу', addExpense: 'Чыгаша кошуу', createCashObject: 'Каржы объектисин түзүү', cashObjectCreated: 'Объект тез эсепке кошулду', amountRequired: 'Сумманы жана комментарийди жазыңыз', noEntries: 'Жазуу жок',
  widgetAppearance: 'Блоктун көрүнүшү', doubleTapHint: 'Эки жолу тийүү көрүнүштү ачат', blockColor: 'Ички түс', pulseBlock: 'Блоктун пульсациясы',
  widgetDrawing: 'Сүрөт тартуу', drawing: 'Сүрөт тартуу', lineColor: 'Түс', lineWidth: 'Калыңдык', undo: 'Артка кайтаруу', clearDrawing: 'Тазалоо', stylusHint: 'Манжа, стилус же Apple Pencil менен тартыңыз', uploadBackground: 'Файл жүктөө', save: 'Сактоо', viewSaved: 'Сакталгандар', format: 'Формат', shareDrawing: 'Жөнөтүү', savedDrawings: 'Сакталган сүрөттөр', noSavedDrawings: 'Сүрөттөр жок', loadDrawing: 'Ачуу', drawingSaved: 'Сүрөт сакталды', backgroundLoaded: 'Барак сүрөт тартууга жүктөлдү', drawingShareReady: 'Файл даяр', newSketch: 'Жаңы эскиз',
  todoList: 'Иштер тизмеси', todoEmpty: 'Биринчи ишти кошуңуз', newTask: 'Жаңы иш', addTask: 'Иш кошуу', taskAdded: 'Иш кошулду', taskDeleted: 'Иш өчүрүлдү', deleteTask: 'Ишти өчүрүү', deleteTaskConfirm: 'Бул ишти өчүрөсүзбү?', dueDate: 'Аткаруу күнү', overdueTask: 'Мөөнөтү өттү', todayTask: 'Бүгүн', nextTask: 'Кийинки иш', futureTask: 'Пландаштырылган', completedTask: 'Аткарылды'
});
Object.assign(copy.TJ, {
  money: 'Пул', quickCashflow: 'Шартномаҳои кӯтоҳ', cashflowDescription: 'Ҳисоби кӯтоҳи молиявӣ барои ҳар объект', noCashObjects: 'Объект барои ҳисоб нест', noCashObjectsCopy: 'Объектро илова карда, арзиш, маблағи гирифташуда ва хароҷотро ворид кунед.',
  objectCost: 'Арзиши объект', workByFact: 'Аз рӯи иҷрои воқеӣ кор мекунам', paymentByFact: 'Пардохт аз рӯи факт', received: 'Гирифта шуд', expense: 'Хароҷот', totalReceived: 'Ҳамагӣ гирифта шуд', totalExpense: 'Ҳамагӣ хароҷот', remainingFromCost: 'Аз арзиши объект монд', income: 'Даромад', balanceResult: 'Тавозун: даромад − хароҷот', comment: 'Шарҳ', addIncome: 'Иловаи даромад', addExpense: 'Иловаи хароҷот', createCashObject: 'Сохтани объекти молиявӣ', cashObjectCreated: 'Объект ба ҳисоби зуд илова шуд', amountRequired: 'Маблағ ва шарҳро ворид кунед', noEntries: 'Сабт нест',
  widgetAppearance: 'Намуди блок', doubleTapHint: 'Ду бор ламс намудро мекушояд', blockColor: 'Ранги дохилӣ', pulseBlock: 'Набзи блок',
  widgetDrawing: 'Расмкашӣ', drawing: 'Расмкашӣ', lineColor: 'Ранг', lineWidth: 'Ғафсӣ', undo: 'Бекор кардан', clearDrawing: 'Тоза кардан', stylusHint: 'Бо ангушт, стилус ё Apple Pencil кашед', uploadBackground: 'Бор кардани файл', save: 'Нигоҳ доштан', viewSaved: 'Нигоҳшудаҳо', format: 'Формат', shareDrawing: 'Фиристодан', savedDrawings: 'Расмҳои нигоҳшуда', noSavedDrawings: 'Расм нест', loadDrawing: 'Кушодан', drawingSaved: 'Расм нигоҳ дошта шуд', backgroundLoaded: 'Саҳифа барои расмкашӣ бор шуд', drawingShareReady: 'Файл омода шуд', newSketch: 'Эскизи нав',
  todoList: 'Рӯйхати корҳо', todoEmpty: 'Кори аввалро илова кунед', newTask: 'Кори нав', addTask: 'Иловаи кор', taskAdded: 'Кор илова шуд', taskDeleted: 'Кор нест шуд', deleteTask: 'Нест кардани кор', deleteTaskConfirm: 'Ин кор нест карда шавад?', dueDate: 'Санаи иҷро', overdueTask: 'Муҳлат гузашт', todayTask: 'Имрӯз', nextTask: 'Кори навбатӣ', futureTask: 'Банақшагирифта', completedTask: 'Иҷро шуд'
});

Object.assign(copy.RU, {
  expandObject: 'Развернуть', collapseObject: 'Свернуть', finishObject: 'Завершить объект', reopenObject: 'Вернуть в работу', completedObject: 'Объект завершён', objectReopened: 'Объект возвращён в работу', deleteCashObjectConfirm: 'Удалить финансовый объект со всеми разделами и документами?', cashObjectDeleted: 'Объект удалён', saveCost: 'Сохранить стоимость', costSaved: 'Стоимость объекта сохранена', addSection: 'Добавить раздел', createSection: 'Новый раздел объекта', sectionName: 'Название раздела', sectionPlaceholder: 'Например, Электромонтажные работы', sectionCreated: 'Раздел добавлен', sectionDeleted: 'Раздел удалён', deleteSection: 'Удалить раздел', deleteSectionConfirm: 'Удалить раздел со всеми расчётами и документами?', mainSection: 'Основной раздел', sectionCalculations: 'Расчёты раздела', incomeExpenseTable: 'Доходы и расходы', sectionReport: 'Скачать расчёты', workStatement: 'Ведомость выполненных работ', workAct: 'Акт выполненных работ', recordNumber: '№ записи', workName: 'Наименование работ', unit: 'Ед. измерения', quantity: 'Количество', price: 'Цена', rowTotal: 'Итого', addRow: 'Добавить строку', removeRow: 'Удалить строку', preparedBy: 'Составлен', performedBy: 'Выполнено', acceptedBy: 'Принято', fullName: 'ФИО', signature: 'Роспись', fillDate: 'Дата заполнения', documentSaved: 'Документ сохранён в разделе', saveInSection: 'Сохранить в разделе', downloadPdf: 'Скачать PDF', downloadExcel: 'Скачать Excel', sharePdf: 'Отправить PDF', shareExcel: 'Отправить Excel', reportReady: 'Файл подготовлен', shareUnavailable: 'Отправка недоступна — файл скачан', madeInStructos: 'Сделано в Структос', website: 'www.structOS.ru', regularAccounting: 'Основной расчёт', actualAccounting: 'Оплата по факту', entryType: 'Тип записи', date: 'Дата', amount: 'Сумма', reportIncome: 'Получено / доход', reportExpense: 'Расход', sectionFinanceReport: 'Доходы и расходы раздела', objectSummary: 'Итоги по объекту', saved: 'Сохранено'
});
Object.assign(copy.EN, {
  expandObject: 'Expand', collapseObject: 'Collapse', finishObject: 'Complete object', reopenObject: 'Return to work', completedObject: 'Object completed', objectReopened: 'Object returned to work', deleteCashObjectConfirm: 'Delete this financial object with all sections and documents?', cashObjectDeleted: 'Object deleted', saveCost: 'Save value', costSaved: 'Object value saved', addSection: 'Add section', createSection: 'New object section', sectionName: 'Section name', sectionPlaceholder: 'For example, Electrical works', sectionCreated: 'Section added', sectionDeleted: 'Section deleted', deleteSection: 'Delete section', deleteSectionConfirm: 'Delete this section with all calculations and documents?', mainSection: 'Main section', sectionCalculations: 'Section calculations', incomeExpenseTable: 'Income and expenses', sectionReport: 'Download calculations', workStatement: 'Completed works statement', workAct: 'Completed works act', recordNumber: 'Record No.', workName: 'Work name', unit: 'Unit', quantity: 'Quantity', price: 'Price', rowTotal: 'Total', addRow: 'Add row', removeRow: 'Remove row', preparedBy: 'Prepared by', performedBy: 'Performed by', acceptedBy: 'Accepted by', fullName: 'Full name', signature: 'Signature', fillDate: 'Date completed', documentSaved: 'Document saved in the section', saveInSection: 'Save in section', downloadPdf: 'Download PDF', downloadExcel: 'Download Excel', sharePdf: 'Share PDF', shareExcel: 'Share Excel', reportReady: 'File prepared', shareUnavailable: 'Sharing unavailable — file downloaded', madeInStructos: 'Made in StructOS', website: 'www.structOS.ru', regularAccounting: 'Main calculation', actualAccounting: 'Payment by actual completion', entryType: 'Entry type', date: 'Date', amount: 'Amount', reportIncome: 'Received / income', reportExpense: 'Expense', sectionFinanceReport: 'Section income and expenses', objectSummary: 'Object summary', saved: 'Saved'
});
Object.assign(copy.KY, {
  expandObject: 'Жайып көрсөтүү', collapseObject: 'Жыйноо', finishObject: 'Объектти бүтүрүү', reopenObject: 'Ишке кайтаруу', completedObject: 'Объект бүттү', objectReopened: 'Объект ишке кайтарылды', deleteCashObjectConfirm: 'Объектти бардык бөлүмдөрү жана документтери менен өчүрөсүзбү?', cashObjectDeleted: 'Объект өчүрүлдү', saveCost: 'Бааны сактоо', costSaved: 'Объекттин баасы сакталды', addSection: 'Бөлүм кошуу', createSection: 'Жаңы бөлүм', sectionName: 'Бөлүмдүн аталышы', sectionPlaceholder: 'Мисалы, Электромонтаж иштери', sectionCreated: 'Бөлүм кошулду', sectionDeleted: 'Бөлүм өчүрүлдү', deleteSection: 'Бөлүмдү өчүрүү', deleteSectionConfirm: 'Бөлүмдү бардык эсептери жана документтери менен өчүрөсүзбү?', mainSection: 'Негизги бөлүм', sectionCalculations: 'Бөлүмдүн эсептери', incomeExpenseTable: 'Киреше жана чыгаша', sectionReport: 'Эсептерди жүктөө', workStatement: 'Аткарылган иштердин ведомосту', workAct: 'Аткарылган иштердин актысы', recordNumber: 'Жазуу №', workName: 'Иштин аталышы', unit: 'Өлчөө бирдиги', quantity: 'Саны', price: 'Баасы', rowTotal: 'Жыйынтык', addRow: 'Сап кошуу', removeRow: 'Сапты өчүрүү', preparedBy: 'Түзгөн', performedBy: 'Аткарган', acceptedBy: 'Кабыл алган', fullName: 'Аты-жөнү', signature: 'Колу', fillDate: 'Толтурулган күнү', documentSaved: 'Документ бөлүмдө сакталды', saveInSection: 'Бөлүмдө сактоо', downloadPdf: 'PDF жүктөө', downloadExcel: 'Excel жүктөө', sharePdf: 'PDF жөнөтүү', shareExcel: 'Excel жөнөтүү', reportReady: 'Файл даяр', shareUnavailable: 'Жөнөтүү жеткиликсиз — файл жүктөлдү', madeInStructos: 'StructOS ичинде жасалды', website: 'www.structOS.ru', regularAccounting: 'Негизги эсеп', actualAccounting: 'Факт боюнча төлөм', entryType: 'Жазуунун түрү', date: 'Күнү', amount: 'Суммасы', reportIncome: 'Алынды / киреше', reportExpense: 'Чыгаша', sectionFinanceReport: 'Бөлүмдүн кирешеси жана чыгашасы', objectSummary: 'Объект боюнча жыйынтык', saved: 'Сакталды'
});
Object.assign(copy.TJ, {
  expandObject: 'Кушодан', collapseObject: 'Пӯшидан', finishObject: 'Анҷоми объект', reopenObject: 'Ба кор баргардондан', completedObject: 'Объект анҷом ёфт', objectReopened: 'Объект ба кор баргашт', deleteCashObjectConfirm: 'Объект бо ҳамаи бахшҳо ва ҳуҷҷатҳо нест карда шавад?', cashObjectDeleted: 'Объект нест шуд', saveCost: 'Нигоҳ доштани арзиш', costSaved: 'Арзиши объект нигоҳ дошта шуд', addSection: 'Иловаи бахш', createSection: 'Бахши нави объект', sectionName: 'Номи бахш', sectionPlaceholder: 'Масалан, Корҳои барқӣ', sectionCreated: 'Бахш илова шуд', sectionDeleted: 'Бахш нест шуд', deleteSection: 'Нест кардани бахш', deleteSectionConfirm: 'Бахш бо ҳамаи ҳисобҳо ва ҳуҷҷатҳо нест карда шавад?', mainSection: 'Бахши асосӣ', sectionCalculations: 'Ҳисобҳои бахш', incomeExpenseTable: 'Даромад ва хароҷот', sectionReport: 'Бор кардани ҳисобҳо', workStatement: 'Ведомости корҳои иҷрошуда', workAct: 'Санади корҳои иҷрошуда', recordNumber: '№ сабт', workName: 'Номи кор', unit: 'Воҳиди ченак', quantity: 'Миқдор', price: 'Нарх', rowTotal: 'Ҳамагӣ', addRow: 'Иловаи сатр', removeRow: 'Нест кардани сатр', preparedBy: 'Тартиб дод', performedBy: 'Иҷро кард', acceptedBy: 'Қабул кард', fullName: 'Ному насаб', signature: 'Имзо', fillDate: 'Санаи пуркунӣ', documentSaved: 'Ҳуҷҷат дар бахш нигоҳ дошта шуд', saveInSection: 'Дар бахш нигоҳ доштан', downloadPdf: 'Бор кардани PDF', downloadExcel: 'Бор кардани Excel', sharePdf: 'Фиристодани PDF', shareExcel: 'Фиристодани Excel', reportReady: 'Файл омода шуд', shareUnavailable: 'Фиристодан дастнорас — файл бор шуд', madeInStructos: 'Дар StructOS сохта шуд', website: 'www.structOS.ru', regularAccounting: 'Ҳисоби асосӣ', actualAccounting: 'Пардохт аз рӯи факт', entryType: 'Навъи сабт', date: 'Сана', amount: 'Маблағ', reportIncome: 'Гирифта шуд / даромад', reportExpense: 'Хароҷот', sectionFinanceReport: 'Даромад ва хароҷоти бахш', objectSummary: 'Ҷамъбасти объект', saved: 'Нигоҳ шуд'
});

Object.assign(copy.RU, {
  openMoneyObject: 'Открыть', backToMoneyObjects: 'К объектам', noSections: 'Разделов пока нет', noSectionsCopy: 'Нажмите «Добавить раздел» и выберите способ расчёта.', workByContract: 'Работа по договору', workByFact: 'Оплата по факту выполнения', contractAmount: 'Стоимость договора', enterContractAmount: 'Введите сумму договора', chooseSectionMode: 'Выберите хотя бы один вариант расчёта', contractAccounting: 'Расчёт по договору', receivedAdvances: 'Получено авансов', remainingContract: 'Осталось от договора', totalAdvances: 'Итого авансов', totalExpenses: 'Итого расходов', advanceBalance: 'Остаток от аванса', addAdvance: 'Добавить аванс', ownFundsAccounting: 'Собственные средства', ownInvested: 'Вложил собственных средств', returnedFromAdvance: 'Вернул из аванса', ownFundsRemaining: 'Осталось вернуть собственных', totalOwnInvested: 'Итого вложено собственных', totalOwnReturned: 'Итого возвращено', addOwnFunds: 'Добавить собственные', addOwnReturn: 'Добавить возврат', reportHistory: 'История отчётов', noReports: 'Сохранённых отчётов пока нет', reportSavedToHistory: 'Отчёт сохранён в истории', repeatDownload: 'Скачать повторно', repeatShare: 'Поделиться повторно', reportType: 'Тип отчёта', objectSections: 'Разделы объекта', sectionMode: 'Способ расчёта', advance: 'Аванс', ownFundsEntry: 'Собственные средства', ownReturnEntry: 'Возврат собственных', noCashObjectsCopy: 'Добавьте объект и ведите его финансовые разделы.'
});
Object.assign(copy.EN, {
  openMoneyObject: 'Open', backToMoneyObjects: 'Back to objects', noSections: 'No sections yet', noSectionsCopy: 'Select “Add section” and choose an accounting method.', workByContract: 'Work under contract', workByFact: 'Payment by actual completion', contractAmount: 'Contract value', enterContractAmount: 'Enter the contract value', chooseSectionMode: 'Choose at least one accounting method', contractAccounting: 'Contract accounting', receivedAdvances: 'Advances received', remainingContract: 'Remaining under contract', totalAdvances: 'Total advances', totalExpenses: 'Total expenses', advanceBalance: 'Advance balance', addAdvance: 'Add advance', ownFundsAccounting: 'Own funds', ownInvested: 'Own funds invested', returnedFromAdvance: 'Returned from advance', ownFundsRemaining: 'Own funds still due', totalOwnInvested: 'Total own funds invested', totalOwnReturned: 'Total returned', addOwnFunds: 'Add own funds', addOwnReturn: 'Add return', reportHistory: 'Report history', noReports: 'No saved reports yet', reportSavedToHistory: 'Report saved to history', repeatDownload: 'Download again', repeatShare: 'Share again', reportType: 'Report type', objectSections: 'Object sections', sectionMode: 'Accounting method', advance: 'Advance', ownFundsEntry: 'Own funds', ownReturnEntry: 'Own funds return', noCashObjectsCopy: 'Add an object and manage its financial sections.'
});
Object.assign(copy.KY, {
  openMoneyObject: 'Ачуу', backToMoneyObjects: 'Объекттерге', noSections: 'Бөлүмдөр азырынча жок', noSectionsCopy: '«Бөлүм кошуу» басып, эсеп түрүн тандаңыз.', workByContract: 'Келишим боюнча иш', workByFact: 'Аткарылган иш боюнча төлөм', contractAmount: 'Келишимдин суммасы', enterContractAmount: 'Келишимдин суммасын жазыңыз', chooseSectionMode: 'Эсептин жок дегенде бир түрүн тандаңыз', contractAccounting: 'Келишим боюнча эсеп', receivedAdvances: 'Алынган аванстар', remainingContract: 'Келишим боюнча калды', totalAdvances: 'Бардык аванстар', totalExpenses: 'Бардык чыгашалар', advanceBalance: 'Аванстын калдыгы', addAdvance: 'Аванс кошуу', ownFundsAccounting: 'Өз каражаты', ownInvested: 'Өз каражатымдан салдым', returnedFromAdvance: 'Аванстан кайтарды', ownFundsRemaining: 'Өз каражатына кайтаруу калды', totalOwnInvested: 'Бардыгы өз каражатымдан', totalOwnReturned: 'Бардыгы кайтарылды', addOwnFunds: 'Өз каражатын кошуу', addOwnReturn: 'Кайтаруу кошуу', reportHistory: 'Отчёттордун тарыхы', noReports: 'Сакталган отчёт жок', reportSavedToHistory: 'Отчёт тарыхта сакталды', repeatDownload: 'Кайра жүктөө', repeatShare: 'Кайра бөлүшүү', reportType: 'Отчёттун түрү', objectSections: 'Объекттин бөлүмдөрү', sectionMode: 'Эсеп түрү', advance: 'Аванс', ownFundsEntry: 'Өз каражаты', ownReturnEntry: 'Өз каражатын кайтаруу', noCashObjectsCopy: 'Объект кошуп, анын каржы бөлүмдөрүн жүргүзүңүз.'
});
Object.assign(copy.TJ, {
  openMoneyObject: 'Кушодан', backToMoneyObjects: 'Ба объектҳо', noSections: 'Ҳоло бахш нест', noSectionsCopy: '«Иловаи бахш»-ро пахш карда, тарзи ҳисобро интихоб кунед.', workByContract: 'Кор аз рӯи шартнома', workByFact: 'Пардохт аз рӯи иҷрои воқеӣ', contractAmount: 'Маблағи шартнома', enterContractAmount: 'Маблағи шартномаро ворид кунед', chooseSectionMode: 'Ақаллан як тарзи ҳисобро интихоб кунед', contractAccounting: 'Ҳисоб аз рӯи шартнома', receivedAdvances: 'Пешпардохтҳои гирифташуда', remainingContract: 'Аз шартнома монд', totalAdvances: 'Ҳамаи пешпардохтҳо', totalExpenses: 'Ҳамаи хароҷот', advanceBalance: 'Бақияи пешпардохт', addAdvance: 'Иловаи пешпардохт', ownFundsAccounting: 'Маблағи шахсӣ', ownInvested: 'Маблағи шахсӣ гузоштам', returnedFromAdvance: 'Аз пешпардохт баргардонд', ownFundsRemaining: 'Баргардонидани маблағи шахсӣ монд', totalOwnInvested: 'Ҳамагӣ маблағи шахсӣ', totalOwnReturned: 'Ҳамагӣ баргардонда шуд', addOwnFunds: 'Иловаи маблағи шахсӣ', addOwnReturn: 'Иловаи баргардонӣ', reportHistory: 'Таърихи ҳисоботҳо', noReports: 'Ҳоло ҳисоботи нигоҳшуда нест', reportSavedToHistory: 'Ҳисобот дар таърих нигоҳ шуд', repeatDownload: 'Боз бор кардан', repeatShare: 'Боз фиристодан', reportType: 'Навъи ҳисобот', objectSections: 'Бахшҳои объект', sectionMode: 'Тарзи ҳисоб', advance: 'Пешпардохт', ownFundsEntry: 'Маблағи шахсӣ', ownReturnEntry: 'Баргардонии маблағи шахсӣ', noCashObjectsCopy: 'Объект илова карда, бахшҳои молиявии онро идора кунед.'
});

Object.assign(copy.RU, { documentName: 'Название документа', documentNumber: 'Номер документа', statementName: 'Название ведомости', statementNumber: 'Номер ведомости', actName: 'Название акта', actNumber: 'Номер акта' });
Object.assign(copy.EN, { documentName: 'Document name', documentNumber: 'Document number', statementName: 'Statement name', statementNumber: 'Statement number', actName: 'Act name', actNumber: 'Act number' });
Object.assign(copy.KY, { documentName: 'Документтин аталышы', documentNumber: 'Документтин номери', statementName: 'Ведомосттун аталышы', statementNumber: 'Ведомосттун номери', actName: 'Актынын аталышы', actNumber: 'Актынын номери' });
Object.assign(copy.TJ, { documentName: 'Номи ҳуҷҷат', documentNumber: 'Рақами ҳуҷҷат', statementName: 'Номи ведомост', statementNumber: 'Рақами ведомост', actName: 'Номи санад', actNumber: 'Рақами санад' });

Object.assign(copy.RU, {
  readyObjects: 'Готовые к запуску объекты', activeObjects: 'Объекты действующие', noReadyObjects: 'После анализа проекты появятся здесь', noActiveObjects: 'Действующих объектов пока нет', noActiveObjectsCopy: 'Проанализируйте проект и запустите его из блока готовых объектов.',
  analyzed: 'Проанализирован', started: 'Запущен', inWork: 'В работе', start: 'Запустить', deleteObject: 'Удалить объект', attachedDocuments: 'документа(ов)', objectReady: 'Объект добавлен в готовые к запуску', objectStarted: 'Объект запущен и перенесён в действующие', objectDeleted: 'Объект удалён из готовых',
  activeLimitTitle: 'Лимит действующих объектов', activeLimitCopy: 'На тарифе «Пользователь» доступен 1 действующий объект. Дополнительный объект можно подключить за 199 ₽.'
});
Object.assign(copy.EN, {
  readyObjects: 'Objects ready to launch', activeObjects: 'Active objects', noReadyObjects: 'Analyzed projects will appear here', noActiveObjects: 'No active objects yet', noActiveObjectsCopy: 'Analyze a project and launch it from the ready objects section.',
  analyzed: 'Analyzed', started: 'Started', inWork: 'In progress', start: 'Launch', deleteObject: 'Delete object', attachedDocuments: 'document(s)', objectReady: 'Object added to ready-to-launch', objectStarted: 'Object launched and moved to active', objectDeleted: 'Object removed from ready list',
  activeLimitTitle: 'Active object limit', activeLimitCopy: 'The User plan includes 1 active object. An additional object can be added for 199 ₽.'
});
Object.assign(copy.KY, {
  readyObjects: 'Ишке киргизүүгө даяр объекттер', activeObjects: 'Иштеп жаткан объекттер', noReadyObjects: 'Талданган долбоорлор бул жерде көрүнөт', noActiveObjects: 'Иштеп жаткан объекттер азырынча жок', noActiveObjectsCopy: 'Долбоорду талдап, даяр объекттер бөлүмүнөн ишке киргизиңиз.',
  analyzed: 'Талданды', started: 'Ишке кирди', inWork: 'Иш жүрүп жатат', start: 'Ишке киргизүү', deleteObject: 'Объектти өчүрүү', attachedDocuments: 'документ', objectReady: 'Объект ишке киргизүүгө даяр тизмеге кошулду', objectStarted: 'Объект ишке кирип, иштеп жаткандарга өттү', objectDeleted: 'Объект даяр тизмеден өчүрүлдү',
  activeLimitTitle: 'Иштеп жаткан объекттердин чеги', activeLimitCopy: '«Колдонуучу» тарифинде 1 иштеп жаткан объект бар. Кошумча объектти 199 ₽ үчүн кошсо болот.'
});
Object.assign(copy.TJ, {
  readyObjects: 'Объектҳои омода ба оғоз', activeObjects: 'Объектҳои фаъол', noReadyObjects: 'Лоиҳаҳои таҳлилшуда дар ин ҷо пайдо мешаванд', noActiveObjects: 'Ҳоло объекти фаъол нест', noActiveObjectsCopy: 'Лоиҳаро таҳлил карда, аз бахши объектҳои омода оғоз кунед.',
  analyzed: 'Таҳлил шуд', started: 'Оғоз шуд', inWork: 'Дар кор', start: 'Оғоз кардан', deleteObject: 'Нест кардани объект', attachedDocuments: 'ҳуҷҷат', objectReady: 'Объект ба рӯйхати омода илова шуд', objectStarted: 'Объект оғоз ва ба фаъол гузаронида шуд', objectDeleted: 'Объект аз рӯйхати омода нест шуд',
  activeLimitTitle: 'Маҳдудияти объектҳои фаъол', activeLimitCopy: 'Дар тарифи «Истифодабаранда» 1 объекти фаъол дастрас аст. Объекти иловагӣ 199 ₽ арзиш дорад.'
});

Object.assign(copy.RU, {
  newDrawing: 'Новый рисунок', drawingUnsavedTitle: 'Текущий рисунок не сохранён', drawingUnsavedCopy: 'Сохранить текущий рисунок перед созданием нового?', saveCurrentDrawing: 'Сохранить текущий', discardCurrentDrawing: 'Сбросить текущий', nameDrawing: 'Название рисунка', drawingNameRequired: 'Введите название рисунка', newDrawingReady: 'Новый рисунок готов', noColor: 'Без цвета',
  allObjects: 'Все действующие объекты', activeObjectsCount: 'Активных', fullCycleObject: 'Полный цикл', quickObject: 'Быстрый', completedListObject: 'Завершён', reorderObjectsHint: 'Активные объекты можно менять местами перетаскиванием', dragObject: 'Изменить порядок объекта', orderSaved: 'Порядок объектов сохранён', openObjectAction: 'Войти в объект', rename: 'Переименовать', renameObject: 'Изменить название объекта', renameSection: 'Изменить название раздела', enterNewName: 'Введите новое название', nameUpdated: 'Название изменено'
});
Object.assign(copy.EN, {
  newDrawing: 'New drawing', drawingUnsavedTitle: 'The current drawing is not saved', drawingUnsavedCopy: 'Save the current drawing before starting a new one?', saveCurrentDrawing: 'Save current', discardCurrentDrawing: 'Discard current', nameDrawing: 'Drawing name', drawingNameRequired: 'Enter a drawing name', newDrawingReady: 'New drawing ready', noColor: 'No color',
  allObjects: 'All active objects', activeObjectsCount: 'Active', fullCycleObject: 'Full cycle', quickObject: 'Quick', completedListObject: 'Completed', reorderObjectsHint: 'Drag active objects to change their order', dragObject: 'Change object order', orderSaved: 'Object order saved', openObjectAction: 'Open object', rename: 'Rename', renameObject: 'Change object name', renameSection: 'Change section name', enterNewName: 'Enter a new name', nameUpdated: 'Name updated'
});
Object.assign(copy.KY, {
  newDrawing: 'Жаңы сүрөт', drawingUnsavedTitle: 'Учурдагы сүрөт сакталган жок', drawingUnsavedCopy: 'Жаңы сүрөттү баштоодон мурун учурдагыны сактайсызбы?', saveCurrentDrawing: 'Учурдагыны сактоо', discardCurrentDrawing: 'Учурдагыны өчүрүү', nameDrawing: 'Сүрөттүн аталышы', drawingNameRequired: 'Сүрөттүн аталышын жазыңыз', newDrawingReady: 'Жаңы сүрөт даяр', noColor: 'Түссүз',
  allObjects: 'Бардык иштеп жаткан объекттер', activeObjectsCount: 'Активдүү', fullCycleObject: 'Толук цикл', quickObject: 'Тез', completedListObject: 'Аяктады', reorderObjectsHint: 'Активдүү объекттерди сүйрөп иреттеңиз', dragObject: 'Объекттин тартибин өзгөртүү', orderSaved: 'Объекттердин тартиби сакталды', openObjectAction: 'Объектке кирүү', rename: 'Атын өзгөртүү', renameObject: 'Объекттин атын өзгөртүү', renameSection: 'Бөлүмдүн атын өзгөртүү', enterNewName: 'Жаңы аталышты жазыңыз', nameUpdated: 'Аталышы өзгөртүлдү'
});
Object.assign(copy.TJ, {
  newDrawing: 'Расми нав', drawingUnsavedTitle: 'Расми ҷорӣ нигоҳ дошта нашудааст', drawingUnsavedCopy: 'Пеш аз расми нав расми ҷориро нигоҳ дорем?', saveCurrentDrawing: 'Нигоҳ доштани ҷорӣ', discardCurrentDrawing: 'Партофтани ҷорӣ', nameDrawing: 'Номи расм', drawingNameRequired: 'Номи расмро ворид кунед', newDrawingReady: 'Расми нав омода аст', noColor: 'Бе ранг',
  allObjects: 'Ҳамаи объектҳои фаъол', activeObjectsCount: 'Фаъол', fullCycleObject: 'Давраи пурра', quickObject: 'Зуд', completedListObject: 'Анҷом ёфт', reorderObjectsHint: 'Объектҳои фаъолро кашида тартиб диҳед', dragObject: 'Тағйири тартиби объект', orderSaved: 'Тартиби объектҳо нигоҳ дошта шуд', openObjectAction: 'Кушодани объект', rename: 'Иваз кардани ном', renameObject: 'Иваз кардани номи объект', renameSection: 'Иваз кардани номи бахш', enterNewName: 'Номи навро ворид кунед', nameUpdated: 'Ном иваз шуд'
});

Object.assign(copy.RU, {
  money: 'Быстрый объект', ownInvested: 'Вложены собственные средства', returnedFromAdvance: 'Закрыто из оплаты', ownFundsRemaining: 'Осталось (разница)', totalOwnInvested: 'Вложены собственные средства', totalOwnReturned: 'Закрыто из оплаты', addOwnFunds: 'Добавить собственные средства', addOwnReturn: 'Добавить закрытие из оплаты', ownFundsEntry: 'Вложены собственные средства', ownReturnEntry: 'Закрыто из оплаты',
  peopleAssigned: 'Выставил(а) людей', overallSectionsBalance: 'Общий баланс разделов', contractBalancesTotal: 'Баланс по договору', factBalancesTotal: 'Баланс по факту', downloadOverallReport: 'Скачать общий подробный отчёт', overallDetailedReport: 'Общий подробный отчёт', allObjectSections: 'Все разделы объекта', sectionBalance: 'Баланс раздела',
  editCashEntry: 'Корректировать запись', saveChanges: 'Сохранить изменения', entryUpdated: 'Запись и все итоги обновлены', entryFieldsRequired: 'Укажите сумму, дату и комментарий'
});
Object.assign(copy.EN, {
  money: 'Quick object', ownInvested: 'Own funds invested', returnedFromAdvance: 'Covered from payment', ownFundsRemaining: 'Remaining (difference)', totalOwnInvested: 'Own funds invested', totalOwnReturned: 'Covered from payment', addOwnFunds: 'Add own funds', addOwnReturn: 'Add payment coverage', ownFundsEntry: 'Own funds invested', ownReturnEntry: 'Covered from payment',
  peopleAssigned: 'People assigned', overallSectionsBalance: 'Overall sections balance', contractBalancesTotal: 'Contract balance', factBalancesTotal: 'Actual-payment balance', downloadOverallReport: 'Download full overall report', overallDetailedReport: 'Full overall report', allObjectSections: 'All object sections', sectionBalance: 'Section balance',
  editCashEntry: 'Edit entry', saveChanges: 'Save changes', entryUpdated: 'Entry and all totals updated', entryFieldsRequired: 'Enter an amount, date, and comment'
});
Object.assign(copy.KY, {
  money: 'Тез объект', ownInvested: 'Өз каражаты салынды', returnedFromAdvance: 'Төлөмдөн жабылды', ownFundsRemaining: 'Калды (айырма)', totalOwnInvested: 'Өз каражаты салынды', totalOwnReturned: 'Төлөмдөн жабылды', addOwnFunds: 'Өз каражатын кошуу', addOwnReturn: 'Төлөмдөн жабууну кошуу', ownFundsEntry: 'Өз каражаты салынды', ownReturnEntry: 'Төлөмдөн жабылды',
  peopleAssigned: 'Адамдарды чыгардым', overallSectionsBalance: 'Бөлүмдөрдүн жалпы балансы', contractBalancesTotal: 'Келишим боюнча баланс', factBalancesTotal: 'Факт боюнча баланс', downloadOverallReport: 'Жалпы толук отчётту жүктөө', overallDetailedReport: 'Жалпы толук отчёт', allObjectSections: 'Объекттин бардык бөлүмдөрү', sectionBalance: 'Бөлүмдүн балансы',
  editCashEntry: 'Жазууну түзөтүү', saveChanges: 'Өзгөртүүлөрдү сактоо', entryUpdated: 'Жазуу жана бардык жыйынтыктар жаңырды', entryFieldsRequired: 'Сумманы, күндү жана комментарийди жазыңыз'
});
Object.assign(copy.TJ, {
  money: 'Объекти зуд', ownInvested: 'Маблағи шахсӣ гузошта шуд', returnedFromAdvance: 'Аз пардохт пӯшида шуд', ownFundsRemaining: 'Монд (фарқият)', totalOwnInvested: 'Маблағи шахсӣ гузошта шуд', totalOwnReturned: 'Аз пардохт пӯшида шуд', addOwnFunds: 'Иловаи маблағи шахсӣ', addOwnReturn: 'Иловаи пӯшиш аз пардохт', ownFundsEntry: 'Маблағи шахсӣ гузошта шуд', ownReturnEntry: 'Аз пардохт пӯшида шуд',
  peopleAssigned: 'Одамонро фиристодам', overallSectionsBalance: 'Тавозуни умумии бахшҳо', contractBalancesTotal: 'Тавозун аз рӯи шартнома', factBalancesTotal: 'Тавозун аз рӯи факт', downloadOverallReport: 'Бор кардани ҳисоботи умумии муфассал', overallDetailedReport: 'Ҳисоботи умумии муфассал', allObjectSections: 'Ҳамаи бахшҳои объект', sectionBalance: 'Тавозуни бахш',
  editCashEntry: 'Таҳрири сабт', saveChanges: 'Нигоҳ доштани тағйирот', entryUpdated: 'Сабт ва ҳамаи натиҷаҳо нав шуданд', entryFieldsRequired: 'Маблағ, сана ва шарҳро ворид кунед'
});

Object.assign(copy.RU, {
  workByContract: 'Работа по договорам', workByFact: 'Работа по факту выполнения', contractAccounting: 'Работа по договорам', actualAccounting: 'Работа по факту выполнения',
  receivedAdvanceClosure: 'Получено в аванс/закрытие', completedWorkVolume: 'Выполненный объём работ', factAdvanceCompletion: 'Оплата выработки', actuallyCompleted: 'Выполненная выработка',
  totalReceivedAdvanceClosure: 'Итого получено в аванс/закрытие', totalCompletedWorkVolume: 'Итого выполненный объём работ', totalFactAdvanceCompletion: 'Итого оплата выработки', totalActuallyCompleted: 'Итого выполненная выработка',
  addReceivedAdvanceClosure: 'Добавить аванс/закрытие', addCompletedWorkVolume: 'Добавить выполненный объём', addFactAdvanceCompletion: 'Добавить оплату выработки', addActuallyCompleted: 'Добавить выполненную выработку',
  overallContractBalance: 'Общий баланс по договорам', overallFactExecutionBalance: 'Общий баланс по факту выполнения', reportIndicator: 'Показатель',
  totalContractsAmount: 'Общая сумма договоров', contractProduction: 'Выработка по договорам', receivedFromCustomer: 'Получено от заказчика', totalOwnFundsInvested: 'Вложено собственных средств',
  contractProductionRemaining: 'Остаток от договора', paidProductionRemaining: 'Остаток от оплаченной выработки', overallIncome: 'Общий доход', overallExpense: 'Общий расход', executionRemaining: 'Остаток от выполнения', allOwnFundsInvested: 'Общая сумма вложенных средств',
  sectionsBreakdown: 'Разбивка по разделам', incomingFunds: 'Поступления', completedWorks: 'Выполнение', totalIncomingFunds: 'Итого поступлений', totalCompletedWorks: 'Итого выполнение', totalBalance: 'Итого баланс',
  fullCashflowReport: 'Полный отчёт', generalReport: 'Общий отчёт', objectReport: 'Отчёт по объекту', allCashObjects: 'Все объекты'
});
Object.assign(copy.EN, {
  workByContract: 'Work under contracts', workByFact: 'Work by actual completion', contractAccounting: 'Work under contracts', actualAccounting: 'Work by actual completion',
  receivedAdvanceClosure: 'Received as advance/closure', completedWorkVolume: 'Completed work volume', factAdvanceCompletion: 'Production payment', actuallyCompleted: 'Completed production',
  totalReceivedAdvanceClosure: 'Total received as advance/closure', totalCompletedWorkVolume: 'Total completed work volume', totalFactAdvanceCompletion: 'Total production payment', totalActuallyCompleted: 'Total completed production',
  addReceivedAdvanceClosure: 'Add advance/closure', addCompletedWorkVolume: 'Add completed volume', addFactAdvanceCompletion: 'Add production payment', addActuallyCompleted: 'Add completed production',
  overallContractBalance: 'Overall balance under contracts', overallFactExecutionBalance: 'Overall balance by actual completion', reportIndicator: 'Indicator',
  totalContractsAmount: 'Total contract value', contractProduction: 'Production under contracts', receivedFromCustomer: 'Received from customer', totalOwnFundsInvested: 'Own funds invested',
  contractProductionRemaining: 'Remaining under contracts', paidProductionRemaining: 'Remaining paid production', overallIncome: 'Total income', overallExpense: 'Total expense', executionRemaining: 'Remaining from completion', allOwnFundsInvested: 'Total own funds invested',
  sectionsBreakdown: 'Breakdown by section', incomingFunds: 'Receipts', completedWorks: 'Completion', totalIncomingFunds: 'Total receipts', totalCompletedWorks: 'Total completion', totalBalance: 'Total balance',
  fullCashflowReport: 'Full report', generalReport: 'Overall report', objectReport: 'Object report', allCashObjects: 'All objects'
});
Object.assign(copy.KY, {
  workByContract: 'Келишимдер боюнча иш', workByFact: 'Иш жүзүндө аткаруу боюнча иш', contractAccounting: 'Келишимдер боюнча иш', actualAccounting: 'Иш жүзүндө аткаруу боюнча иш',
  receivedAdvanceClosure: 'Аванс/жабуу катары алынды', completedWorkVolume: 'Аткарылган иштердин көлөмү', factAdvanceCompletion: 'Өндүрүм үчүн төлөм', actuallyCompleted: 'Аткарылган өндүрүм',
  totalReceivedAdvanceClosure: 'Бардыгы аванс/жабуу катары алынды', totalCompletedWorkVolume: 'Аткарылган иштердин жалпы көлөмү', totalFactAdvanceCompletion: 'Өндүрүм үчүн жалпы төлөм', totalActuallyCompleted: 'Жалпы аткарылган өндүрүм',
  addReceivedAdvanceClosure: 'Аванс/жабуу кошуу', addCompletedWorkVolume: 'Аткарылган көлөмдү кошуу', addFactAdvanceCompletion: 'Өндүрүм төлөмүн кошуу', addActuallyCompleted: 'Аткарылган өндүрүмдү кошуу',
  overallContractBalance: 'Келишимдер боюнча жалпы баланс', overallFactExecutionBalance: 'Иш жүзүндө аткаруу боюнча жалпы баланс', reportIndicator: 'Көрсөткүч',
  totalContractsAmount: 'Келишимдердин жалпы суммасы', contractProduction: 'Келишимдер боюнча өндүрүм', receivedFromCustomer: 'Заказчыдан алынды', totalOwnFundsInvested: 'Өз каражаты салынды',
  contractProductionRemaining: 'Келишим боюнча калды', paidProductionRemaining: 'Төлөнгөн өндүрүмдөн калды', overallIncome: 'Жалпы киреше', overallExpense: 'Жалпы чыгаша', executionRemaining: 'Аткаруудан калган сумма', allOwnFundsInvested: 'Салынган өз каражатынын жалпы суммасы',
  sectionsBreakdown: 'Бөлүмдөр боюнча бөлүштүрүү', incomingFunds: 'Түшүүлөр', completedWorks: 'Аткаруу', totalIncomingFunds: 'Жалпы түшүүлөр', totalCompletedWorks: 'Жалпы аткаруу', totalBalance: 'Жалпы баланс',
  fullCashflowReport: 'Толук отчёт', generalReport: 'Жалпы отчёт', objectReport: 'Объект боюнча отчёт', allCashObjects: 'Бардык объекттер'
});
Object.assign(copy.TJ, {
  workByContract: 'Кор аз рӯи шартномаҳо', workByFact: 'Кор аз рӯи иҷрои воқеӣ', contractAccounting: 'Кор аз рӯи шартномаҳо', actualAccounting: 'Кор аз рӯи иҷрои воқеӣ',
  receivedAdvanceClosure: 'Ҳамчун пешпардохт/бастан гирифта шуд', completedWorkVolume: 'Ҳаҷми корҳои иҷрошуда', factAdvanceCompletion: 'Пардохти иҷро', actuallyCompleted: 'Иҷрои анҷомшуда',
  totalReceivedAdvanceClosure: 'Ҳамагӣ ҳамчун пешпардохт/бастан гирифта шуд', totalCompletedWorkVolume: 'Ҳаҷми умумии корҳои иҷрошуда', totalFactAdvanceCompletion: 'Ҳамагӣ пардохти иҷро', totalActuallyCompleted: 'Ҳамагӣ иҷрои анҷомшуда',
  addReceivedAdvanceClosure: 'Иловаи пешпардохт/бастан', addCompletedWorkVolume: 'Иловаи ҳаҷми иҷрошуда', addFactAdvanceCompletion: 'Иловаи пардохти иҷро', addActuallyCompleted: 'Иловаи иҷрои анҷомшуда',
  overallContractBalance: 'Тавозуни умумӣ аз рӯи шартномаҳо', overallFactExecutionBalance: 'Тавозуни умумӣ аз рӯи иҷрои воқеӣ', reportIndicator: 'Нишондиҳанда',
  totalContractsAmount: 'Маблағи умумии шартномаҳо', contractProduction: 'Иҷро аз рӯи шартномаҳо', receivedFromCustomer: 'Аз фармоишгар гирифта шуд', totalOwnFundsInvested: 'Маблағи шахсӣ гузошта шуд',
  contractProductionRemaining: 'Бақия аз шартнома', paidProductionRemaining: 'Бақия аз иҷрои пардохтшуда', overallIncome: 'Даромади умумӣ', overallExpense: 'Хароҷоти умумӣ', executionRemaining: 'Бақия аз иҷро', allOwnFundsInvested: 'Маблағи умумии шахсии гузошташуда',
  sectionsBreakdown: 'Тақсимот аз рӯи бахшҳо', incomingFunds: 'Воридот', completedWorks: 'Иҷро', totalIncomingFunds: 'Ҳамагӣ воридот', totalCompletedWorks: 'Ҳамагӣ иҷро', totalBalance: 'Тавозуни умумӣ',
  fullCashflowReport: 'Ҳисоботи пурра', generalReport: 'Ҳисоботи умумӣ', objectReport: 'Ҳисоботи объект', allCashObjects: 'Ҳамаи объектҳо'
});

Object.assign(copy.RU, {
  reportPreviewTitle: 'Предпросмотр отчёта', reportPreviewHint: 'Проверьте содержание и оформление перед скачиванием или отправкой.', closePreview: 'Закрыть просмотр',
  widgetCalendar: 'Календарь', calendar: 'Календарь', calendarHint: 'Дела и даты в одном месте', previousMonth: 'Предыдущий месяц', nextMonth: 'Следующий месяц', today: 'Сегодня', selectedDate: 'Выбранная дата', noCalendarEvents: 'На эту дату дел нет', addTaskForDate: 'Добавить дело на эту дату',
  invitedObject: 'По приглашению', demoInvitedObjectName: 'Демо-объект «Северный квартал»', invitedToObject: 'Вы приглашены работать на этом объекте', invitedRole: 'Ваша роль', invitedBy: 'Пригласил', invitedAt: 'Дата приглашения', objectParticipant: 'Участник объекта', invitedDocumentsHint: 'Документы и доступы будут появляться здесь по мере предоставления владельцем объекта.', ownerWillShare: 'Файл пока не предоставлен владельцем объекта'
});
Object.assign(copy.EN, {
  reportPreviewTitle: 'Report preview', reportPreviewHint: 'Review the content and layout before downloading or sharing.', closePreview: 'Close preview',
  widgetCalendar: 'Calendar', calendar: 'Calendar', calendarHint: 'Tasks and dates in one place', previousMonth: 'Previous month', nextMonth: 'Next month', today: 'Today', selectedDate: 'Selected date', noCalendarEvents: 'No tasks for this date', addTaskForDate: 'Add a task for this date',
  invitedObject: 'By invitation', demoInvitedObjectName: 'Demo object “Northern Quarter”', invitedToObject: 'You have been invited to work on this object', invitedRole: 'Your role', invitedBy: 'Invited by', invitedAt: 'Invitation date', objectParticipant: 'Object participant', invitedDocumentsHint: 'Documents and permissions will appear here when the object owner provides them.', ownerWillShare: 'The object owner has not provided this file yet'
});
Object.assign(copy.KY, {
  reportPreviewTitle: 'Отчётту алдын ала көрүү', reportPreviewHint: 'Жүктөөдөн же жөнөтүүдөн мурун мазмунун жана көрүнүшүн текшериңиз.', closePreview: 'Көрүүнү жабуу',
  widgetCalendar: 'Календарь', calendar: 'Календарь', calendarHint: 'Иштер жана күндөр бир жерде', previousMonth: 'Мурунку ай', nextMonth: 'Кийинки ай', today: 'Бүгүн', selectedDate: 'Тандалган күн', noCalendarEvents: 'Бул күнгө иштер жок', addTaskForDate: 'Бул күнгө иш кошуу',
  invitedObject: 'Чакыруу боюнча', demoInvitedObjectName: 'Демо-объект «Түндүк квартал»', invitedToObject: 'Сиз бул объектте иштөөгө чакырылдыңыз', invitedRole: 'Сиздин ролуңуз', invitedBy: 'Чакырган', invitedAt: 'Чакыруу күнү', objectParticipant: 'Объекттин катышуучусу', invitedDocumentsHint: 'Объекттин ээси берген сайын документтер жана укуктар бул жерде пайда болот.', ownerWillShare: 'Объекттин ээси файлды азырынча берген жок'
});
Object.assign(copy.TJ, {
  reportPreviewTitle: 'Пешнамоиши ҳисобот', reportPreviewHint: 'Пеш аз боргирӣ ё фиристодан муҳтаво ва намуди онро санҷед.', closePreview: 'Пӯшидани пешнамоиш',
  widgetCalendar: 'Тақвим', calendar: 'Тақвим', calendarHint: 'Корҳо ва санаҳо дар як ҷо', previousMonth: 'Моҳи гузашта', nextMonth: 'Моҳи оянда', today: 'Имрӯз', selectedDate: 'Санаи интихобшуда', noCalendarEvents: 'Барои ин сана кор нест', addTaskForDate: 'Иловаи кор барои ин сана',
  invitedObject: 'Бо даъват', demoInvitedObjectName: 'Демо-объекти «Маҳаллаи шимолӣ»', invitedToObject: 'Шумо барои кор дар ин объект даъват шудаед', invitedRole: 'Нақши шумо', invitedBy: 'Даъваткунанда', invitedAt: 'Санаи даъват', objectParticipant: 'Иштирокчии объект', invitedDocumentsHint: 'Ҳуҷҷатҳо ва дастрасӣ баъди пешниҳоди соҳиби объект дар ин ҷо пайдо мешаванд.', ownerWillShare: 'Соҳиби объект ҳоло ин файлро пешниҳод накардааст'
});

Object.assign(copy.RU, {
  passportLink: 'Паспорт', builderPassportDescription: 'Отдельный профессиональный паспорт с единым управлением доступом', sharedDataHint: 'Совпадающие данные синхронизируются с профилем автоматически в обе стороны.', personalData: 'Личные данные', photo: 'Фото', addPhoto: 'Добавить фото', changePhoto: 'Изменить фото', removePhoto: 'Удалить фото', structosId: 'StructOS ID', surname: 'Фамилия', givenName: 'Имя', patronymic: 'Отчество', birthDate: 'Дата рождения', maritalStatus: 'Семейное положение', selectStatus: 'Выберите статус', singleStatus: 'Не женат / не замужем', marriedStatus: 'Женат / замужем', divorcedStatus: 'Разведён(а)', widowedStatus: 'Вдовец / вдова', nationality: 'Национальность', citizenship: 'Гражданство', permanentResidence: 'Страна постоянного проживания', foreignDocuments: 'Документы для работы не в своей стране', patentAvailable: 'Патент есть', workPermitAvailable: 'Разрешение на работу есть', workGeography: 'Где можно предлагать работу', workGeographyHint: 'Выберите страну и город. Можно добавить несколько направлений.', workCountry: 'Страна', workCity: 'Город', addCountryCity: 'Добавить страну и город', removeLocation: 'Удалить направление', mostImportantPassport: 'САМОЕ ВАЖНОЕ В ПАСПОРТЕ', mostImportantHint: 'Поиск, предложения и доступ к данным — в одном месте', contractorSearch: 'Участвовать в поиске как подрядчик', employeeSearch: 'Участвовать в поиске как сотрудник', tenderParticipation: 'Участвовать в тендерах на объект', employmentOffers: 'Получать предложения по трудоустройству', objectOffers: 'Получать предложения по объектам', makePassportAvailable: 'Сделать доступным', chooseVisibleData: 'Выбрать доступные данные', visibleDataHint: 'Только отмеченные данные будут видны и попадут в отправляемый паспорт.', yes: 'Да', no: 'Нет', savePassport: 'Сохранить паспорт', passportSaved: 'Паспорт строителя сохранён', photoError: 'Выберите изображение размером до 8 МБ', profileEditorTitle: 'Редактирование профиля', profileEditorHint: 'Профиль остаётся отдельным. Совпадающие поля сразу обновят Паспорт строителя.', profileOnlyFields: 'Данные только профиля', phone: 'Телефон', profileCity: 'Город профиля', profession: 'Профессия', selectCountry: 'Выберите или введите страну', enterCity: 'Выберите или введите город'
});
Object.assign(copy.EN, {
  passportLink: 'Passport', builderPassportDescription: 'A separate professional passport with unified access settings', sharedDataHint: 'Matching information syncs with your profile automatically in both directions.', personalData: 'Personal information', photo: 'Photo', addPhoto: 'Add photo', changePhoto: 'Change photo', removePhoto: 'Remove photo', structosId: 'StructOS ID', surname: 'Last name', givenName: 'First name', patronymic: 'Patronymic', birthDate: 'Date of birth', maritalStatus: 'Marital status', selectStatus: 'Select status', singleStatus: 'Single', marriedStatus: 'Married', divorcedStatus: 'Divorced', widowedStatus: 'Widowed', nationality: 'Nationality', citizenship: 'Citizenship', permanentResidence: 'Country of permanent residence', foreignDocuments: 'Documents for working abroad', patentAvailable: 'Work patent available', workPermitAvailable: 'Work permit available', workGeography: 'Where work may be offered', workGeographyHint: 'Choose a country and city. You can add several locations.', workCountry: 'Country', workCity: 'City', addCountryCity: 'Add country and city', removeLocation: 'Remove location', mostImportantPassport: 'MOST IMPORTANT IN THE PASSPORT', mostImportantHint: 'Search, offers and data access in one place', contractorSearch: 'Participate in contractor search', employeeSearch: 'Participate in employee search', tenderParticipation: 'Participate in project tenders', employmentOffers: 'Receive employment offers', objectOffers: 'Receive project offers', makePassportAvailable: 'Make available', chooseVisibleData: 'Choose visible data', visibleDataHint: 'Only selected data will be visible and included in the shared passport.', yes: 'Yes', no: 'No', savePassport: 'Save passport', passportSaved: 'Builder Passport saved', photoError: 'Choose an image up to 8 MB', profileEditorTitle: 'Edit profile', profileEditorHint: 'Your profile stays separate. Matching fields will immediately update the Builder Passport.', profileOnlyFields: 'Profile-only information', phone: 'Phone', profileCity: 'Profile city', profession: 'Profession', selectCountry: 'Select or enter a country', enterCity: 'Select or enter a city'
});
Object.assign(copy.KY, {
  passportLink: 'Паспорт', builderPassportDescription: 'Ар бир талаага жеткиликтүүлүк жөндөөсү бар өзүнчө кесиптик паспорт', sharedDataHint: 'Дал келген маалыматтар профиль менен эки тарапка автоматтык шайкештешет.', personalData: 'Жеке маалыматтар', photo: 'Сүрөт', addPhoto: 'Сүрөт кошуу', changePhoto: 'Сүрөттү өзгөртүү', removePhoto: 'Сүрөттү өчүрүү', structosId: 'StructOS ID', surname: 'Фамилия', givenName: 'Аты', patronymic: 'Атасынын аты', birthDate: 'Туулган күнү', maritalStatus: 'Үй-бүлөлүк абалы', selectStatus: 'Абалды тандаңыз', singleStatus: 'Бойдок', marriedStatus: 'Үй-бүлөлүү', divorcedStatus: 'Ажырашкан', widowedStatus: 'Жесир', nationality: 'Улуту', citizenship: 'Жарандыгы', permanentResidence: 'Туруктуу жашаган өлкө', foreignDocuments: 'Чет өлкөдө иштөө документтери', patentAvailable: 'Патент бар', workPermitAvailable: 'Иштөөгө уруксат бар', workGeography: 'Кайсы жерде иш сунушталсын', workGeographyHint: 'Өлкө жана шаар тандаңыз. Бир нече багыт кошууга болот.', workCountry: 'Өлкө', workCity: 'Шаар', addCountryCity: 'Өлкө жана шаар кошуу', removeLocation: 'Багытты өчүрүү', openAccess: 'Ачык жеткиликтүү', shareByLink: 'Шилтеме аркылуу бөлүшүү', privacyHint: 'Ар бир талаада эки белги тең демейки боюнча күйгүзүлгөн.', searchSettings: 'Издөө жана сунуштар', participateSearch: 'Издөөгө катышуу', receiveJobOffers: 'Жумуш сунуштарын алуу', receiveVolumeOffers: 'Иш көлөмдөрү боюнча сунуштарды алуу', passportAvailable: 'Куруучунун паспортун жеткиликтүү кылуу', savePassport: 'Паспортту сактоо', passportSaved: 'Куруучунун паспорту сакталды', photoError: '8 МБга чейинки сүрөт тандаңыз', profileEditorTitle: 'Профилди түзөтүү', profileEditorHint: 'Профиль өзүнчө бойдон калат. Дал келген талаалар паспортту дароо жаңыртат.', profileOnlyFields: 'Профилге гана тиешелүү маалыматтар', phone: 'Телефон', profileCity: 'Профилдеги шаар', profession: 'Кесип', selectCountry: 'Өлкөнү тандаңыз же жазыңыз', enterCity: 'Шаарды тандаңыз же жазыңыз'
});
Object.assign(copy.TJ, {
  passportLink: 'Шиноснома', builderPassportDescription: 'Шиносномаи касбии алоҳида бо идораи дастрасӣ барои ҳар майдон', sharedDataHint: 'Маълумоти якхела бо профил ба ҳар ду самт худкор ҳамоҳанг мешавад.', personalData: 'Маълумоти шахсӣ', photo: 'Акс', addPhoto: 'Иловаи акс', changePhoto: 'Иваз кардани акс', removePhoto: 'Нест кардани акс', structosId: 'StructOS ID', surname: 'Насаб', givenName: 'Ном', patronymic: 'Номи падар', birthDate: 'Санаи таваллуд', maritalStatus: 'Вазъи оилавӣ', selectStatus: 'Вазъро интихоб кунед', singleStatus: 'Муҷаррад', marriedStatus: 'Оиладор', divorcedStatus: 'Ҷудошуда', widowedStatus: 'Бева', nationality: 'Миллат', citizenship: 'Шаҳрвандӣ', permanentResidence: 'Кишвари истиқомати доимӣ', foreignDocuments: 'Ҳуҷҷатҳои кор дар кишвари дигар', patentAvailable: 'Патент ҳаст', workPermitAvailable: 'Иҷозаи кор ҳаст', workGeography: 'Дар куҷо кор пешниҳод шавад', workGeographyHint: 'Кишвар ва шаҳрро интихоб кунед. Якчанд самт илова кардан мумкин.', workCountry: 'Кишвар', workCity: 'Шаҳр', addCountryCity: 'Иловаи кишвар ва шаҳр', removeLocation: 'Нест кардани самт', openAccess: 'Дар дастрасии кушода', shareByLink: 'Бо пайванд мубодила кардан', privacyHint: 'Ҳар ду интихоб барои ҳар майдон аз аввал фаъол аст.', searchSettings: 'Ҷустуҷӯ ва пешниҳодҳо', participateSearch: 'Дар ҷустуҷӯ иштирок кардан', receiveJobOffers: 'Пешниҳоди кор гирифтан', receiveVolumeOffers: 'Пешниҳоди ҳаҷми кор гирифтан', passportAvailable: 'Шиносномаи сохтмончиро дастрас кардан', savePassport: 'Нигоҳ доштани шиноснома', passportSaved: 'Шиносномаи сохтмончӣ нигоҳ дошта шуд', photoError: 'Акси то 8 МБ интихоб кунед', profileEditorTitle: 'Таҳрири профил', profileEditorHint: 'Профил алоҳида мемонад. Майдонҳои якхела шиносномаро фавран нав мекунанд.', profileOnlyFields: 'Маълумоти танҳо барои профил', phone: 'Телефон', profileCity: 'Шаҳри профил', profession: 'Касб', selectCountry: 'Кишварро интихоб ё ворид кунед', enterCity: 'Шаҳрро интихоб ё ворид кунед'
});

Object.assign(copy.KY, {
  mostImportantPassport: 'ПАСПОРТТОГУ ЭҢ МААНИЛҮҮ НЕРСЕ', mostImportantHint: 'Издөө, сунуштар жана маалыматка жетүү бир жерде', contractorSearch: 'Подрядчы катары издөөгө катышуу', employeeSearch: 'Кызматкер катары издөөгө катышуу', tenderParticipation: 'Объект боюнча тендерлерге катышуу', employmentOffers: 'Жумушка орношуу сунуштарын алуу', objectOffers: 'Объекттер боюнча сунуштарды алуу', makePassportAvailable: 'Жеткиликтүү кылуу', chooseVisibleData: 'Жеткиликтүү маалыматтарды тандоо', visibleDataHint: 'Белгиленген маалыматтар гана көрүнөт жана жөнөтүлгөн паспортко кирет.', yes: 'Ооба', no: 'Жок'
});
Object.assign(copy.TJ, {
  mostImportantPassport: 'МУҲИМТАРИН ДАР ШИНОСНОМА', mostImportantHint: 'Ҷустуҷӯ, пешниҳодҳо ва дастрасӣ ба маълумот дар як ҷо', contractorSearch: 'Ҳамчун пудратчӣ дар ҷустуҷӯ иштирок кардан', employeeSearch: 'Ҳамчун корманд дар ҷустуҷӯ иштирок кардан', tenderParticipation: 'Дар тендерҳои объект иштирок кардан', employmentOffers: 'Пешниҳодҳои шуғл гирифтан', objectOffers: 'Пешниҳодҳои объект гирифтан', makePassportAvailable: 'Дастрас кардан', chooseVisibleData: 'Интихоби маълумоти дастрас', visibleDataHint: 'Танҳо маълумоти интихобшуда намоён ва ба шиносномаи фиристодашуда дохил мешавад.', yes: 'Ҳа', no: 'Не'
});

Object.assign(copy.RU, { copyIdLabel: 'Копировать ID', shareResume: 'Поделиться резюме', sharePassport: 'Поделиться паспортом', resume: 'Резюме', resumeReady: 'Резюме подготовлено', passportLinkCopied: 'Ссылка на паспорт скопирована', passportAccessRequired: 'Сначала включите «Сделать доступным»', businessTrips: 'Командировки', menu: 'Меню', collapseMenu: 'Свернуть меню' });
Object.assign(copy.EN, { copyIdLabel: 'Copy ID', shareResume: 'Share résumé', sharePassport: 'Share passport', resume: 'Résumé', resumeReady: 'Résumé is ready', passportLinkCopied: 'Passport link copied', passportAccessRequired: 'Enable “Make available” first', businessTrips: 'Business trips', menu: 'Menu', collapseMenu: 'Collapse menu' });
Object.assign(copy.KY, { copyIdLabel: 'ID көчүрүү', shareResume: 'Резюме бөлүшүү', sharePassport: 'Паспортту бөлүшүү', resume: 'Резюме', resumeReady: 'Резюме даяр', passportLinkCopied: 'Паспорт шилтемеси көчүрүлдү', passportAccessRequired: 'Адегенде «Жеткиликтүү кылуу» күйгүзүңүз', businessTrips: 'Иш сапарлар', menu: 'Меню', collapseMenu: 'Менюну жыйноо' });
Object.assign(copy.TJ, { copyIdLabel: 'Нусхаи ID', shareResume: 'Мубодилаи резюме', sharePassport: 'Мубодилаи шиноснома', resume: 'Резюме', resumeReady: 'Резюме омода шуд', passportLinkCopied: 'Пайванди шиноснома нусха шуд', passportAccessRequired: 'Аввал «Дастрас кардан»-ро фаъол кунед', businessTrips: 'Сафарҳои корӣ', menu: 'Меню', collapseMenu: 'Ҷамъ кардани меню' });

Object.assign(copy.RU, { selectNationality: 'Начните вводить национальность', selectCountry: 'Начните вводить страну', enterCity: 'Начните вводить город', chooseFromList: 'Выберите вариант из списка', noMatches: 'Совпадений не найдено', selectCountryFirst: 'Сначала выберите страну' });
Object.assign(copy.EN, { selectNationality: 'Start typing a nationality', selectCountry: 'Start typing a country', enterCity: 'Start typing a city', chooseFromList: 'Choose an option from the list', noMatches: 'No matches found', selectCountryFirst: 'Choose a country first' });
Object.assign(copy.KY, { selectNationality: 'Улутту жаза баштаңыз', selectCountry: 'Өлкөнү жаза баштаңыз', enterCity: 'Шаарды жаза баштаңыз', chooseFromList: 'Тизмеден вариантты тандаңыз', noMatches: 'Дал келген вариант жок', selectCountryFirst: 'Адегенде өлкөнү тандаңыз' });
Object.assign(copy.TJ, { selectNationality: 'Навиштани миллатро оғоз кунед', selectCountry: 'Навиштани кишварро оғоз кунед', enterCity: 'Навиштани шаҳрро оғоз кунед', chooseFromList: 'Аз рӯйхат интихоб кунед', noMatches: 'Мувофиқат ёфт нашуд', selectCountryFirst: 'Аввал кишварро интихоб кунед' });

Object.assign(copy.RU, {
  residenceCity: 'Город проживания', nearestMetro: 'Ближайшее метро', selectMetro: 'Начните вводить станцию метро', noMetroMatches: 'Для этого города станции метро не найдены', fullYears: 'Полных лет', contactPhone: 'Телефон для связи', contactEmail: 'Email для связи', messengerLinked: 'Привязан ли мессенджер к StructOS?', messengerMissingHint: 'Это нужно исправить, чтобы быть среди первых получателей лучших предложений и повышать деловую активность.', activeMessengers: 'Активные мессенджеры', maxMessenger: 'MAX', telegramMessenger: 'Telegram', whatsappMessenger: 'WhatsApp',
  preferredSchedule: 'Желаемый график', chooseWeekdays: 'Выбрать дни недели', anySchedule: 'Любой график', nightShifts: 'Ночные смены', bestCallTime: 'Когда лучше звонить?', timeFrom: 'С', timeTo: 'До', weekdayMon: 'Пн', weekdayTue: 'Вт', weekdayWed: 'Ср', weekdayThu: 'Чт', weekdayFri: 'Пт', weekdaySat: 'Сб', weekdaySun: 'Вс', scheduleDaysTitle: 'Дни желаемого графика', scheduleDaysHint: 'Отметьте все подходящие дни недели.', done: 'Готово',
  professions: 'Профессии', professionDirectoryHint: 'Начните вводить профессию и выберите её из строительного справочника.', selectProfession: 'Начните вводить профессию', workExperience: 'Опыт работы', experienceYears: 'Лет', addProfession: 'Добавить профессию', removeProfession: 'Удалить профессию', skills: 'Навыки, которыми владею', skillsHint: 'Например: ПНР электрика, ПНР слаботочка, сварка.', skillPlaceholder: 'Введите навык', addSkill: 'Добавить навык', removeSkill: 'Удалить навык', duplicateSkill: 'Такой навык уже добавлен',
  analyzeDocument: 'Анализировать', analyzingDocument: 'Анализируем документ', analyzingDocumentHint: 'StructOS обрабатывает выбранный файл и готовит его страницу анализа.', deleteDocument: 'Удалить', deleteDocumentTitle: 'Удалить документ?', deleteDocumentHint: 'Файл и его история версий будут удалены из этого объекта.', documentDeleted: 'Документ удалён'
});
Object.assign(copy.EN, {
  residenceCity: 'City of residence', nearestMetro: 'Nearest metro', selectMetro: 'Start typing a metro station', noMetroMatches: 'No metro stations found for this city', fullYears: 'Full years', contactPhone: 'Contact phone', contactEmail: 'Contact email', messengerLinked: 'Is a messenger linked to StructOS?', messengerMissingHint: 'Fix this to be among the first to receive the best offers and improve your business activity.', activeMessengers: 'Active messengers', maxMessenger: 'MAX', telegramMessenger: 'Telegram', whatsappMessenger: 'WhatsApp',
  preferredSchedule: 'Preferred schedule', chooseWeekdays: 'Choose weekdays', anySchedule: 'Any schedule', nightShifts: 'Night shifts', bestCallTime: 'Best time to call', timeFrom: 'From', timeTo: 'To', weekdayMon: 'Mon', weekdayTue: 'Tue', weekdayWed: 'Wed', weekdayThu: 'Thu', weekdayFri: 'Fri', weekdaySat: 'Sat', weekdaySun: 'Sun', scheduleDaysTitle: 'Preferred workdays', scheduleDaysHint: 'Select all suitable weekdays.', done: 'Done',
  professions: 'Professions', professionDirectoryHint: 'Start typing and choose a trade from the construction directory.', selectProfession: 'Start typing a profession', workExperience: 'Work experience', experienceYears: 'Years', addProfession: 'Add profession', removeProfession: 'Remove profession', skills: 'Skills', skillsHint: 'For example: electrical commissioning, low-current commissioning, welding.', skillPlaceholder: 'Enter a skill', addSkill: 'Add skill', removeSkill: 'Remove skill', duplicateSkill: 'This skill has already been added',
  analyzeDocument: 'Analyze', analyzingDocument: 'Analyzing document', analyzingDocumentHint: 'StructOS is processing the selected file and preparing its analysis page.', deleteDocument: 'Delete', deleteDocumentTitle: 'Delete document?', deleteDocumentHint: 'The file and its version history will be removed from this object.', documentDeleted: 'Document deleted'
});
Object.assign(copy.KY, {
  residenceCity: 'Жашаган шаар', nearestMetro: 'Жакынкы метро', selectMetro: 'Метро станциясын жаза баштаңыз', noMetroMatches: 'Бул шаар үчүн метро станциялары табылган жок', fullYears: 'Толук жашы', contactPhone: 'Байланыш телефону', contactEmail: 'Байланыш email', messengerLinked: 'Мессенжер StructOS менен байланышканбы?', messengerMissingHint: 'Мыкты сунуштарды биринчилерден болуп алуу жана ишкердик активдүүлүктү жогорулатуу үчүн муну оңдоңуз.', activeMessengers: 'Активдүү мессенжерлер', maxMessenger: 'MAX', telegramMessenger: 'Telegram', whatsappMessenger: 'WhatsApp',
  preferredSchedule: 'Каалаган график', chooseWeekdays: 'Аптанын күндөрүн тандоо', anySchedule: 'Каалаган график', nightShifts: 'Түнкү сменалар', bestCallTime: 'Качан чалуу ыңгайлуу?', timeFrom: 'Башы', timeTo: 'Аягы', weekdayMon: 'Дш', weekdayTue: 'Шш', weekdayWed: 'Шр', weekdayThu: 'Бш', weekdayFri: 'Жм', weekdaySat: 'Иш', weekdaySun: 'Жк', scheduleDaysTitle: 'Каалаган иш күндөрү', scheduleDaysHint: 'Ыңгайлуу күндөрдүн баарын белгилеңиз.', done: 'Даяр',
  professions: 'Кесиптер', professionDirectoryHint: 'Кесипти жаза баштап, курулуш маалымдамасынан тандаңыз.', selectProfession: 'Кесипти жаза баштаңыз', workExperience: 'Иш тажрыйбасы', experienceYears: 'Жыл', addProfession: 'Кесип кошуу', removeProfession: 'Кесипти өчүрүү', skills: 'Көндүмдөр', skillsHint: 'Мисалы: электр ПНР, аз ток ПНР, ширетүү.', skillPlaceholder: 'Көндүмдү жазыңыз', addSkill: 'Көндүм кошуу', removeSkill: 'Көндүмдү өчүрүү', duplicateSkill: 'Бул көндүм мурда кошулган',
  analyzeDocument: 'Талдоо', analyzingDocument: 'Документ талданууда', analyzingDocumentHint: 'StructOS тандалган файлды иштеп, талдоо барагын даярдап жатат.', deleteDocument: 'Өчүрүү', deleteDocumentTitle: 'Документ өчүрүлсүнбү?', deleteDocumentHint: 'Файл жана версиялар тарыхы бул объекттен өчүрүлөт.', documentDeleted: 'Документ өчүрүлдү'
});
Object.assign(copy.TJ, {
  residenceCity: 'Шаҳри истиқомат', nearestMetro: 'Метрои наздиктарин', selectMetro: 'Навиштани истгоҳи метроро оғоз кунед', noMetroMatches: 'Барои ин шаҳр истгоҳи метро ёфт нашуд', fullYears: 'Солҳои пурра', contactPhone: 'Телефони тамос', contactEmail: 'Email барои тамос', messengerLinked: 'Оё мессенҷер ба StructOS пайваст аст?', messengerMissingHint: 'Барои гирифтани беҳтарин пешниҳодҳо дар қатори аввал ва баланд кардани фаъолияти корӣ инро ислоҳ кунед.', activeMessengers: 'Мессенҷерҳои фаъол', maxMessenger: 'MAX', telegramMessenger: 'Telegram', whatsappMessenger: 'WhatsApp',
  preferredSchedule: 'Ҷадвали дилхоҳ', chooseWeekdays: 'Интихоби рӯзҳои ҳафта', anySchedule: 'Ҳар гуна ҷадвал', nightShifts: 'Бастҳои шабона', bestCallTime: 'Кай занг задан беҳтар аст?', timeFrom: 'Аз', timeTo: 'То', weekdayMon: 'Дш', weekdayTue: 'Сш', weekdayWed: 'Чш', weekdayThu: 'Пш', weekdayFri: 'Ҷм', weekdaySat: 'Шб', weekdaySun: 'Яш', scheduleDaysTitle: 'Рӯзҳои кори дилхоҳ', scheduleDaysHint: 'Ҳамаи рӯзҳои мувофиқро интихоб кунед.', done: 'Тайёр',
  professions: 'Касбҳо', professionDirectoryHint: 'Касбро навишта, аз феҳристи сохтмон интихоб кунед.', selectProfession: 'Навиштани касбро оғоз кунед', workExperience: 'Таҷрибаи корӣ', experienceYears: 'Сол', addProfession: 'Иловаи касб', removeProfession: 'Нест кардани касб', skills: 'Малакаҳо', skillsHint: 'Масалан: ПНР барқ, ПНР ҷараёни паст, кафшер.', skillPlaceholder: 'Малакаро нависед', addSkill: 'Иловаи малака', removeSkill: 'Нест кардани малака', duplicateSkill: 'Ин малака аллакай илова шудааст',
  analyzeDocument: 'Таҳлил кардан', analyzingDocument: 'Ҳуҷҷат таҳлил мешавад', analyzingDocumentHint: 'StructOS файли интихобшударо коркард ва саҳифаи таҳлилро омода мекунад.', deleteDocument: 'Нест кардан', deleteDocumentTitle: 'Ҳуҷҷат нест карда шавад?', deleteDocumentHint: 'Файл ва таърихи версияҳои он аз объект нест мешаванд.', documentDeleted: 'Ҳуҷҷат нест шуд'
});

Object.assign(copy.RU, {
  connections: 'Привязать к StructOS', connectionsHint: 'Подключите сети и контакты к одному профилю StructOS.', personalDataMirrorHint: 'Это единые личные данные: изменения здесь сразу сохраняются и отображаются в Паспорте строителя.', notSpecified: 'Не указано', editPersonalData: 'Изменить личные данные', contactAndLocation: 'Контакты и место проживания', professionalData: 'Профессиональные данные',
  accountReward: '+150 бонусов', rewardOnce: 'Можно получить один раз', linkAccount: 'Привязать', linkedAccount: 'Привязано', accountLinked: 'Аккаунт привязан. +150 бонусов начислено.', accountAlreadyLinked: 'Этот аккаунт уже привязан, повторный бонус не начисляется.', accountLinkReward: 'Привязка аккаунта к StructOS', testConnectionTitle: 'Привязка к StructOS', testConnectionHint: 'В тестовом аккаунте подключение подтверждается внутри StructOS. Проверка через сервис будет добавлена при запуске интеграции.', confirmTestConnection: 'Подтвердить привязку', missingConnectionData: 'Сначала укажите эти данные в блоке «Личные данные».', fillPersonalData: 'Заполнить личные данные', mergeAccounts: 'Объединить аккаунты', mergeAccountsHint: 'Здесь можно будет объединить несколько учётных записей StructOS без потери проектов и бонусов.', inDevelopment: 'В разработке', linkedCount: 'Привязано', availableAccountBonus: 'Доступно за все привязки',
  yandexAccount: 'Яндекс', vkAccount: 'ВК', telegramAccount: 'Telegram', whatsappAccount: 'WhatsApp', maxAccount: 'MAX', phoneAccount: 'Телефон', emailAccount: 'Email',
  professions: 'Профессии', professionDirectoryHint: 'Введите профессию, специализацию или систему. В справочнике 450 строительных профессий и сочетаний, включая все основные направления слаботочных систем.'
});
Object.assign(copy.EN, {
  connections: 'Link to StructOS', connectionsHint: 'Connect networks and contact methods to one StructOS profile.', personalDataMirrorHint: 'This is shared personal data: changes save immediately and appear in the Builder Passport.', notSpecified: 'Not specified', editPersonalData: 'Edit personal data', contactAndLocation: 'Contacts and residence', professionalData: 'Professional data',
  accountReward: '+150 bonuses', rewardOnce: 'Available once', linkAccount: 'Link', linkedAccount: 'Linked', accountLinked: 'Account linked. +150 bonuses credited.', accountAlreadyLinked: 'This account is already linked; no repeat bonus is awarded.', accountLinkReward: 'Account linked to StructOS', testConnectionTitle: 'Link to StructOS', testConnectionHint: 'In the test account, linking is confirmed inside StructOS. Provider verification will be added with the integration launch.', confirmTestConnection: 'Confirm linking', missingConnectionData: 'Add this information in Personal data first.', fillPersonalData: 'Fill personal data', mergeAccounts: 'Merge accounts', mergeAccountsHint: 'This will merge several StructOS accounts without losing projects or bonuses.', inDevelopment: 'In development', linkedCount: 'Linked', availableAccountBonus: 'Available for all links',
  yandexAccount: 'Yandex', vkAccount: 'VK', telegramAccount: 'Telegram', whatsappAccount: 'WhatsApp', maxAccount: 'MAX', phoneAccount: 'Phone', emailAccount: 'Email',
  professions: 'Professions', professionDirectoryHint: 'Type a trade, specialty, or system. The directory contains 450 construction roles and combinations, including the main low-voltage disciplines.'
});
Object.assign(copy.KY, { connections: 'StructOS менен байланыштыруу', connectionsHint: 'Тармактарды жана байланыштарды бир StructOS профилине кошуңуз.', notSpecified: 'Көрсөтүлгөн эмес', editPersonalData: 'Жеке маалыматтарды өзгөртүү', accountReward: '+150 бонус', rewardOnce: 'Бир жолу гана', linkAccount: 'Байлоо', linkedAccount: 'Байланган', mergeAccounts: 'Аккаунттарды бириктирүү', inDevelopment: 'Иштелип жатат' });
Object.assign(copy.TJ, { connections: 'Пайваст кардан ба StructOS', connectionsHint: 'Шабакаҳо ва тамосҳоро ба як профили StructOS пайваст кунед.', notSpecified: 'Нишон дода нашудааст', editPersonalData: 'Тағйири маълумоти шахсӣ', accountReward: '+150 бонус', rewardOnce: 'Танҳо як бор', linkAccount: 'Пайваст кардан', linkedAccount: 'Пайваст шуд', mergeAccounts: 'Якҷо кардани аккаунтҳо', inDevelopment: 'Дар таҳия' });
Object.assign(copy.RU, { demoVersion: 'Демо-версия', executorPlan: 'Исполнитель', supplierPlan: 'Поставщик', aggregatorPlan: 'Агрегатор', choosePlan: 'Выберите тариф и подписку', planSelectionHint: 'Выбор сохраняется в профиле и определяет доступные возможности кабинета.', currentPlan: 'Выбран', planSelected: 'Тариф и подписка сохранены', moneyBalance: 'Денежный баланс', bonusBalance: 'Бонусный баланс', financeHubHint: 'Управляйте денежным балансом, бонусами и историей операций в одном месте.', financeHistoryHint: 'Нажмите на нужный баланс, чтобы открыть его историю.', newBonusRulesHint: 'Новые способы получения бонусов будут добавляться в этот список.' });
Object.assign(copy.EN, { demoVersion: 'Demo version', executorPlan: 'Contractor', supplierPlan: 'Supplier', aggregatorPlan: 'Aggregator', choosePlan: 'Choose a plan and subscription', planSelectionHint: 'Your selection is saved in the profile and controls the available workspace features.', currentPlan: 'Selected', planSelected: 'Plan and subscription saved', moneyBalance: 'Money balance', bonusBalance: 'Bonus balance', financeHubHint: 'Manage your money balance, bonuses, and transaction history in one place.', financeHistoryHint: 'Select a balance to open its history.', newBonusRulesHint: 'New ways to earn bonuses will be added to this list.' });
Object.assign(copy.KY, { demoVersion: 'Демо-версия', executorPlan: 'Аткаруучу', supplierPlan: 'Жеткирүүчү', aggregatorPlan: 'Агрегатор', choosePlan: 'Тарифти жана жазылууну тандаңыз', planSelectionHint: 'Тандоо профилде сакталат жана кабинеттин жеткиликтүү мүмкүнчүлүктөрүн аныктайт.', currentPlan: 'Тандалды', planSelected: 'Тариф жана жазылуу сакталды', moneyBalance: 'Акча балансы', bonusBalance: 'Бонус балансы', financeHubHint: 'Акча балансын, бонустарды жана операциялар тарыхын бир жерден башкарыңыз.', financeHistoryHint: 'Тарыхын ачуу үчүн керектүү балансты басыңыз.', newBonusRulesHint: 'Бонус алуунун жаңы жолдору ушул тизмеге кошулат.' });
Object.assign(copy.TJ, { demoVersion: 'Демо-версия', executorPlan: 'Иҷрокунанда', supplierPlan: 'Таъминкунанда', aggregatorPlan: 'Агрегатор', choosePlan: 'Тариф ва обунаро интихоб кунед', planSelectionHint: 'Интихоб дар профил нигоҳ дошта шуда, имкониятҳои дастрасро муайян мекунад.', currentPlan: 'Интихоб шуд', planSelected: 'Тариф ва обуна нигоҳ дошта шуд', moneyBalance: 'Тавозуни пулӣ', bonusBalance: 'Тавозуни бонусӣ', financeHubHint: 'Тавозуни пулӣ, бонусҳо ва таърихи амалиётро дар як ҷо идора кунед.', financeHistoryHint: 'Барои кушодани таърих тавозуни лозимиро интихоб кунед.', newBonusRulesHint: 'Роҳҳои нави гирифтани бонусҳо ба ин рӯйхат илова мешаванд.' });
Object.assign(copy.RU, { editedReportSaved: 'Новая редакция отчёта сохранена', deletePreviousReportQuestion: 'Удалить предыдущий отчёт?', deletePreviousReport: 'Да, удалить предыдущий', keepBothReports: 'Нет, оставить оба', previousReportDeleted: 'Новая редакция сохранена, предыдущий отчёт удалён', bothReportVersionsSaved: 'Оба отчёта сохранены в истории' });
Object.assign(copy.EN, { editedReportSaved: 'New report revision saved', deletePreviousReportQuestion: 'Delete the previous report?', deletePreviousReport: 'Yes, delete previous', keepBothReports: 'No, keep both', previousReportDeleted: 'New revision saved and the previous report deleted', bothReportVersionsSaved: 'Both reports were saved in history' });
Object.assign(copy.KY, { editedReportSaved: 'Отчёттун жаңы редакциясы сакталды', deletePreviousReportQuestion: 'Мурунку отчёт өчүрүлсүнбү?', deletePreviousReport: 'Ооба, мурункусун өчүрүү', keepBothReports: 'Жок, экөөнү тең калтыруу', previousReportDeleted: 'Жаңы редакция сакталды, мурунку отчёт өчүрүлдү', bothReportVersionsSaved: 'Эки отчёт тең тарыхта сакталды' });
Object.assign(copy.TJ, { editedReportSaved: 'Таҳрири нави ҳисобот нигоҳ дошта шуд', deletePreviousReportQuestion: 'Ҳисоботи пешина нест карда шавад?', deletePreviousReport: 'Ҳа, пешинаро нест кардан', keepBothReports: 'Не, ҳар дуро нигоҳ доштан', previousReportDeleted: 'Таҳрири нав нигоҳ дошта шуд, ҳисоботи пешина нест карда шуд', bothReportVersionsSaved: 'Ҳар ду ҳисобот дар таърих нигоҳ дошта шуданд' });

Object.assign(copy.RU, { followOurChannel: 'Подпишись на наш канал', followOurChannelHint: 'Новости StructOS, обновления функций и важные объявления.' });
Object.assign(copy.EN, { followOurChannel: 'Follow our channel', followOurChannelHint: 'StructOS news, feature updates, and important announcements.' });
Object.assign(copy.KY, { followOurChannel: 'Биздин каналга жазылыңыз', followOurChannelHint: 'StructOS жаңылыктары, функциялардын жаңыртуулары жана маанилүү жарыялар.' });
Object.assign(copy.TJ, { followOurChannel: 'Ба канали мо обуна шавед', followOurChannelHint: 'Ахбори StructOS, навсозиҳои функсияҳо ва эълонҳои муҳим.' });

Object.assign(copy.RU, { myProjects: 'Мои проекты', myProjectsDescription: 'Все загруженные проекты и их путь до завершения', projectPackages: 'Проектов', uploadProject: 'Загрузить проект', noMyProjects: 'Проектов пока нет', noMyProjectsCopy: 'Загрузите проект, договор или смету — карточка проекта появится здесь автоматически.', projectDocuments: 'Документы проекта', lastProjectUpdate: 'Обновлён' });
Object.assign(copy.EN, { myProjects: 'My projects', myProjectsDescription: 'All uploaded projects from upload to completion', projectPackages: 'Projects', uploadProject: 'Upload project', noMyProjects: 'No projects yet', noMyProjectsCopy: 'Upload a project, contract, or estimate and its project card will appear here automatically.', projectDocuments: 'Project documents', lastProjectUpdate: 'Updated' });
Object.assign(copy.KY, { myProjects: 'Менин долбоорлорум', myProjectsDescription: 'Жүктөөдөн аяктаганга чейинки бардык долбоорлор', projectPackages: 'Долбоорлор', uploadProject: 'Долбоор жүктөө', noMyProjects: 'Азырынча долбоор жок', noMyProjectsCopy: 'Долбоорду, келишимди же сметаны жүктөңүз — долбоор картасы бул жерде автоматтык пайда болот.', projectDocuments: 'Долбоордун документтери', lastProjectUpdate: 'Жаңыртылды' });
Object.assign(copy.TJ, { myProjects: 'Лоиҳаҳои ман', myProjectsDescription: 'Ҳамаи лоиҳаҳо аз боркунӣ то анҷом', projectPackages: 'Лоиҳаҳо', uploadProject: 'Бор кардани лоиҳа', noMyProjects: 'Ҳоло лоиҳа нест', noMyProjectsCopy: 'Лоиҳа, шартнома ё сметаро бор кунед — корти лоиҳа худкор дар ин ҷо пайдо мешавад.', projectDocuments: 'Ҳуҷҷатҳои лоиҳа', lastProjectUpdate: 'Нав шуд' });

Object.assign(copy.RU, {
  quickStart: 'Быстрый старт', myProjects: 'Проекты', myProjectsDescription: 'Объекты, проекты, договоры и сметы в одной структуре', projectObjects: 'Объектов', projectDocuments: 'Проект · Договор · Смета', noMyProjects: 'Объектов пока нет', noMyProjectsCopy: 'Создайте объект, дайте проекту понятное название и загрузите нужные документы.',
  invitationsHomeHint: 'Доступ к объектам и командам', notificationsHomeHint: 'Важные события по вашим объектам', chooseAction: 'Выберите действие', quickProjectAnalysis: 'Быстрый анализ проекта', quickProjectAnalysisHint: 'Создать объект, загрузить проект и запустить анализ', quickProjectStart: 'Быстрый старт проекта', quickObjectStart: 'Быстрый старт объекта', quickObjectStartHint: 'Создать короткий объект для доходов, расходов и отчётов', inDevelopment: 'В разработке',
  projectObjectWizard: 'Создание объекта', objectNameStep: 'Название объекта', projectNameStep: 'Название проекта', documentsStep: 'Документы', stepOf: 'Шаг', continueAction: 'Продолжить', backAction: 'Назад', giveProjectName: 'Дайте своё название проекту', projectNamePlaceholder: 'Например, Электроснабжение БЦ «Северный»', projectNameHint: 'Это название будет видно в списке проектов, договоре и смете.', uploadDocuments: 'Загрузите документы', uploadDocumentsHint: 'Можно загрузить один, два или все три документа. StructOS проанализирует только загруженное.', documentOptional: 'Необязательно', documentRequired: 'Обязательно', chooseDocument: 'Выбрать файл', changeDocument: 'Заменить файл', analyzeAll: 'Анализировать всё', objectSaved: 'Объект создан', projectNameRequired: 'Укажите название проекта', documentsRequired: 'Загрузите хотя бы один документ',
  contractNumberPending: 'Номер будет извлечён при анализе договора', estimateForProject: 'Смета проекта', documentNotLoaded: 'Документ ещё не загружен', pendingAnalysis: 'Ожидает анализа', analyzeLoadedDocuments: 'Анализировать загруженное', analyzingDocuments: 'Анализируем документы', analyzingDocumentsHint: 'StructOS отдельно обрабатывает каждый загруженный файл.', allDocumentsAnalyzed: 'Все загруженные документы проанализированы', allDocumentsAnalyzedCopy: 'Результаты сохранены отдельно по проекту, договору и смете.', invitationsCenter: 'Входящие приглашения', noNewNotifications: 'Новых уведомлений нет', noNewNotificationsHint: 'Важные события по объектам появятся здесь.', contractNumberLabel: 'Договор №'
});
Object.assign(copy.EN, {
  quickStart: 'Quick start', myProjects: 'Projects', myProjectsDescription: 'Objects, projects, contracts, and estimates in one structure', projectObjects: 'Objects', projectDocuments: 'Project · Contract · Estimate', noMyProjects: 'No objects yet', noMyProjectsCopy: 'Create an object, give the project a clear name, and upload the required documents.',
  invitationsHomeHint: 'Access to objects and teams', notificationsHomeHint: 'Important events for your objects', chooseAction: 'Choose an action', quickProjectAnalysis: 'Quick project analysis', quickProjectAnalysisHint: 'Create an object, upload a project, and start analysis', quickProjectStart: 'Quick project start', quickObjectStart: 'Quick object start', quickObjectStartHint: 'Create a short object for income, expenses, and reports', inDevelopment: 'In development',
  projectObjectWizard: 'Create object', objectNameStep: 'Object name', projectNameStep: 'Project name', documentsStep: 'Documents', stepOf: 'Step', continueAction: 'Continue', backAction: 'Back', giveProjectName: 'Give the project your own name', projectNamePlaceholder: 'For example, Power supply for Northern Business Center', projectNameHint: 'This name will be visible in the project, contract, and estimate list.', uploadDocuments: 'Upload documents', uploadDocumentsHint: 'Upload one, two, or all three documents. StructOS analyzes only what is uploaded.', documentOptional: 'Optional', documentRequired: 'Required', chooseDocument: 'Choose file', changeDocument: 'Replace file', analyzeAll: 'Analyze all', objectSaved: 'Object created', projectNameRequired: 'Enter a project name', documentsRequired: 'Upload at least one document',
  contractNumberPending: 'The number will be extracted during contract analysis', estimateForProject: 'Project estimate', documentNotLoaded: 'Document has not been uploaded', pendingAnalysis: 'Awaiting analysis', analyzeLoadedDocuments: 'Analyze uploaded files', analyzingDocuments: 'Analyzing documents', analyzingDocumentsHint: 'StructOS processes each uploaded file separately.', allDocumentsAnalyzed: 'All uploaded documents have been analyzed', allDocumentsAnalyzedCopy: 'Results are saved separately for the project, contract, and estimate.', invitationsCenter: 'Incoming invitations', noNewNotifications: 'No new notifications', noNewNotificationsHint: 'Important object events will appear here.', contractNumberLabel: 'Contract No.'
});
Object.assign(copy.KY, {
  quickStart: 'Тез баштоо', myProjects: 'Долбоорлор', myProjectsDescription: 'Объекттер, долбоорлор, келишимдер жана сметалар бир түзүмдө', projectObjects: 'Объекттер', projectDocuments: 'Долбоор · Келишим · Смета', noMyProjects: 'Азырынча объект жок', noMyProjectsCopy: 'Объект түзүп, долбоорго түшүнүктүү ат берип, керектүү документтерди жүктөңүз.',
  invitationsHomeHint: 'Объекттерге жана командаларга кирүү', notificationsHomeHint: 'Объекттер боюнча маанилүү окуялар', chooseAction: 'Аракетти тандаңыз', quickProjectAnalysis: 'Долбоорду тез талдоо', quickProjectAnalysisHint: 'Объект түзүп, долбоорду жүктөп, талдоону баштоо', quickProjectStart: 'Долбоорду тез баштоо', quickObjectStart: 'Объектти тез баштоо', quickObjectStartHint: 'Киреше, чыгаша жана отчет үчүн кыска объект түзүү', inDevelopment: 'Иштелип жатат',
  projectObjectWizard: 'Объект түзүү', objectNameStep: 'Объекттин аталышы', projectNameStep: 'Долбоордун аталышы', documentsStep: 'Документтер', stepOf: 'Кадам', continueAction: 'Улантуу', backAction: 'Артка', giveProjectName: 'Долбоорго өз аталышыңызды бериңиз', projectNamePlaceholder: 'Мисалы, «Түндүк» ББ электр менен камсыздоо', projectNameHint: 'Бул аталыш долбоор, келишим жана смета тизмесинде көрүнөт.', uploadDocuments: 'Документтерди жүктөңүз', uploadDocumentsHint: 'Бир, эки же үч документти тең жүктөөгө болот. StructOS жүктөлгөндөрдү гана талдайт.', documentOptional: 'Милдеттүү эмес', documentRequired: 'Милдеттүү', chooseDocument: 'Файл тандоо', changeDocument: 'Файлды алмаштыруу', analyzeAll: 'Баарын талдоо', objectSaved: 'Объект түзүлдү', projectNameRequired: 'Долбоордун аталышын жазыңыз', documentsRequired: 'Жок дегенде бир документ жүктөңүз',
  contractNumberPending: 'Номер келишим талданганда алынат', estimateForProject: 'Долбоордун сметасы', documentNotLoaded: 'Документ жүктөлө элек', pendingAnalysis: 'Талдоону күтүп жатат', analyzeLoadedDocuments: 'Жүктөлгөндөрдү талдоо', analyzingDocuments: 'Документтер талданууда', analyzingDocumentsHint: 'StructOS ар бир файлды өзүнчө иштетет.', allDocumentsAnalyzed: 'Бардык жүктөлгөн документтер талданды', allDocumentsAnalyzedCopy: 'Натыйжалар долбоор, келишим жана смета боюнча өзүнчө сакталды.', invitationsCenter: 'Кирген чакыруулар', noNewNotifications: 'Жаңы билдирүү жок', noNewNotificationsHint: 'Объекттер боюнча маанилүү окуялар бул жерде чыгат.', contractNumberLabel: 'Келишим №'
});
Object.assign(copy.TJ, {
  quickStart: 'Оғози зуд', myProjects: 'Лоиҳаҳо', myProjectsDescription: 'Объектҳо, лоиҳаҳо, шартномаҳо ва сметаҳо дар як сохтор', projectObjects: 'Объектҳо', projectDocuments: 'Лоиҳа · Шартнома · Смета', noMyProjects: 'Ҳоло объект нест', noMyProjectsCopy: 'Объект созед, ба лоиҳа номи фаҳмо диҳед ва ҳуҷҷатҳои лозимро бор кунед.',
  invitationsHomeHint: 'Дастрасӣ ба объектҳо ва гурӯҳҳо', notificationsHomeHint: 'Рӯйдодҳои муҳими объектҳо', chooseAction: 'Амалро интихоб кунед', quickProjectAnalysis: 'Таҳлили зуди лоиҳа', quickProjectAnalysisHint: 'Объект созед, лоиҳаро бор карда, таҳлилро оғоз кунед', quickProjectStart: 'Оғози зуди лоиҳа', quickObjectStart: 'Оғози зуди объект', quickObjectStartHint: 'Объекти кӯтоҳ барои даромад, хароҷот ва ҳисобот созед', inDevelopment: 'Дар таҳия',
  projectObjectWizard: 'Сохтани объект', objectNameStep: 'Номи объект', projectNameStep: 'Номи лоиҳа', documentsStep: 'Ҳуҷҷатҳо', stepOf: 'Қадам', continueAction: 'Идома', backAction: 'Ба қафо', giveProjectName: 'Ба лоиҳа номи худро диҳед', projectNamePlaceholder: 'Масалан, Таъминоти барқи МТ «Шимолӣ»', projectNameHint: 'Ин ном дар рӯйхати лоиҳа, шартнома ва смета дида мешавад.', uploadDocuments: 'Ҳуҷҷатҳоро бор кунед', uploadDocumentsHint: 'Як, ду ё ҳар се ҳуҷҷатро бор кардан мумкин. StructOS танҳо ҳуҷҷатҳои боршударо таҳлил мекунад.', documentOptional: 'Ихтиёрӣ', documentRequired: 'Ҳатмӣ', chooseDocument: 'Интихоби файл', changeDocument: 'Иваз кардани файл', analyzeAll: 'Ҳамаро таҳлил кардан', objectSaved: 'Объект сохта шуд', projectNameRequired: 'Номи лоиҳаро ворид кунед', documentsRequired: 'Ақаллан як ҳуҷҷатро бор кунед',
  contractNumberPending: 'Рақам ҳангоми таҳлили шартнома гирифта мешавад', estimateForProject: 'Сметаи лоиҳа', documentNotLoaded: 'Ҳуҷҷат ҳанӯз бор нашудааст', pendingAnalysis: 'Интизори таҳлил', analyzeLoadedDocuments: 'Таҳлили ҳуҷҷатҳои боршуда', analyzingDocuments: 'Ҳуҷҷатҳо таҳлил мешаванд', analyzingDocumentsHint: 'StructOS ҳар файли боршударо алоҳида коркард мекунад.', allDocumentsAnalyzed: 'Ҳамаи ҳуҷҷатҳои боршуда таҳлил шуданд', allDocumentsAnalyzedCopy: 'Натиҷаҳо барои лоиҳа, шартнома ва смета алоҳида нигоҳ дошта шуданд.', invitationsCenter: 'Даъватҳои воридшуда', noNewNotifications: 'Огоҳии нав нест', noNewNotificationsHint: 'Рӯйдодҳои муҳими объектҳо дар ин ҷо пайдо мешаванд.', contractNumberLabel: 'Шартнома №'
});

Object.assign(copy.RU, { projectNameStep: 'Раздел проекта', giveProjectName: 'Укажите раздел проекта', projectNamePlaceholder: 'Например, Электроснабжение', projectNameHint: 'Загруженный проект будет сохранён внутри этого раздела.', projectNameRequired: 'Укажите раздел проекта', deleteProject: 'Удалить проект', deleteProjectTitle: 'Удаление проекта', deleteProjectHint: 'Удалить проект, связанный объект и все загруженные документы?', projectDeleted: 'Проект удалён', expandProject: 'Развернуть проект', collapseProject: 'Свернуть проект', renameProject: 'Переименовать проект', renameContract: 'Переименовать договор', renameEstimate: 'Переименовать смету' });
Object.assign(copy.EN, { projectNameStep: 'Project section', giveProjectName: 'Enter the project section', projectNamePlaceholder: 'For example, Electrical supply', projectNameHint: 'The uploaded project will be saved inside this section.', projectNameRequired: 'Enter the project section', deleteProject: 'Delete project', deleteProjectTitle: 'Delete project', deleteProjectHint: 'Delete the project, its object, and all uploaded documents?', projectDeleted: 'Project deleted', expandProject: 'Expand project', collapseProject: 'Collapse project', renameProject: 'Rename project', renameContract: 'Rename contract', renameEstimate: 'Rename estimate' });
Object.assign(copy.KY, { projectNameStep: 'Долбоор бөлүмү', giveProjectName: 'Долбоор бөлүмүн көрсөтүңүз', projectNamePlaceholder: 'Мисалы, Электр менен камсыздоо', projectNameHint: 'Жүктөлгөн долбоор ушул бөлүмдүн ичинде сакталат.', projectNameRequired: 'Долбоор бөлүмүн көрсөтүңүз', deleteProject: 'Долбоорду өчүрүү', deleteProjectTitle: 'Долбоорду өчүрүү', deleteProjectHint: 'Долбоор, ага байланышкан объект жана бардык документтер өчүрүлсүнбү?', projectDeleted: 'Долбоор өчүрүлдү', expandProject: 'Долбоорду жайуу', collapseProject: 'Долбоорду жыйноо', renameProject: 'Долбоордун атын өзгөртүү', renameContract: 'Келишимдин атын өзгөртүү', renameEstimate: 'Сметанын атын өзгөртүү' });
Object.assign(copy.TJ, { projectNameStep: 'Бахши лоиҳа', giveProjectName: 'Бахши лоиҳаро нишон диҳед', projectNamePlaceholder: 'Масалан, Таъминоти барқ', projectNameHint: 'Лоиҳаи боршуда дар дохили ҳамин бахш нигоҳ дошта мешавад.', projectNameRequired: 'Бахши лоиҳаро нишон диҳед', deleteProject: 'Нест кардани лоиҳа', deleteProjectTitle: 'Нест кардани лоиҳа', deleteProjectHint: 'Лоиҳа, объекти вобаста ва ҳамаи ҳуҷҷатҳо нест карда шаванд?', projectDeleted: 'Лоиҳа нест шуд', expandProject: 'Кушодани лоиҳа', collapseProject: 'Пӯшидани лоиҳа', renameProject: 'Иваз кардани номи лоиҳа', renameContract: 'Иваз кардани номи шартнома', renameEstimate: 'Иваз кардани номи смета' });

Object.assign(copy.RU, { newVersion: 'Новая версия', uploadChanges: 'Подгрузить изменения', uploadAndCompare: 'Загрузить и сравнить', revisionUploadHint: 'Старый файл останется в истории. После загрузки StructOS сразу сравнит предыдущую и новую версии.', currentStoredVersion: 'Текущая сохранённая версия', versionHistory: 'История версий', versionNumber: 'Версия', versions: 'версии', versionComparison: 'Сравнение версий', comparisonInProgress: 'Сравниваем версии', comparisonInProgressCopy: 'Проверяем предыдущий и новый файл и сохраняем найденные изменения.', comparisonComplete: 'Сравнение завершено', comparisonCompleteCopy: 'Новая версия сохранена. Ниже показано, что изменилось по доступным данным файлов.', viewComparison: 'Посмотреть сравнение', previousVersion: 'Предыдущая версия', currentVersion: 'Новая версия', fileNameLabel: 'Название файла', fileSizeLabel: 'Размер файла', fileFormatLabel: 'Формат файла', fileModifiedLabel: 'Изменён на устройстве', uploadDate: 'Дата загрузки', before: 'Было', after: 'Стало', changed: 'Изменено', unchanged: 'Без изменений', metadataDifferences: 'Найденные различия', contentDifferences: 'Содержимое документа', contentComparisonPending: 'Ожидает серверного разбора', contentComparisonPendingCopy: 'Названия, форматы, размеры и даты изменения уже сопоставлены. Отличия по листам, строкам и содержимому появятся после подключения серверного извлечения — StructOS не придумывает отсутствующие данные.', changesFound: 'изменений найдено', sameFileSelected: 'Выбран тот же файл. Для новой версии укажите изменённый файл.', versionSaved: 'Новая версия сохранена и сравнена' });
Object.assign(copy.EN, { newVersion: 'New version', uploadChanges: 'Upload changes', uploadAndCompare: 'Upload and compare', revisionUploadHint: 'The previous file stays in history. StructOS will compare the old and new versions immediately after upload.', currentStoredVersion: 'Current saved version', versionHistory: 'Version history', versionNumber: 'Version', versions: 'versions', versionComparison: 'Version comparison', comparisonInProgress: 'Comparing versions', comparisonInProgressCopy: 'Checking the previous and new file and saving the detected changes.', comparisonComplete: 'Comparison complete', comparisonCompleteCopy: 'The new version is saved. The available file-level changes are shown below.', viewComparison: 'View comparison', previousVersion: 'Previous version', currentVersion: 'New version', fileNameLabel: 'File name', fileSizeLabel: 'File size', fileFormatLabel: 'File format', fileModifiedLabel: 'Modified on device', uploadDate: 'Upload date', before: 'Before', after: 'After', changed: 'Changed', unchanged: 'Unchanged', metadataDifferences: 'Detected differences', contentDifferences: 'Document content', contentComparisonPending: 'Awaiting server extraction', contentComparisonPendingCopy: 'Names, formats, sizes, and modification dates have been compared. Sheet, row, and content differences will appear after server extraction is connected; StructOS does not invent missing data.', changesFound: 'changes found', sameFileSelected: 'This is the same file. Choose a changed file for a new version.', versionSaved: 'New version saved and compared' });
Object.assign(copy.KY, { newVersion: 'Жаңы версия', uploadChanges: 'Өзгөртүүлөрдү жүктөө', uploadAndCompare: 'Жүктөп салыштыруу', revisionUploadHint: 'Мурунку файл тарыхта калат. Жүктөлгөндөн кийин StructOS эски жана жаңы версияны дароо салыштырат.', currentStoredVersion: 'Учурдагы сакталган версия', versionHistory: 'Версиялар тарыхы', versionNumber: 'Версия', versions: 'версия', versionComparison: 'Версияларды салыштыруу', comparisonInProgress: 'Версиялар салыштырылууда', comparisonInProgressCopy: 'Мурунку жана жаңы файл текшерилип, табылган өзгөрүүлөр сакталууда.', comparisonComplete: 'Салыштыруу аяктады', comparisonCompleteCopy: 'Жаңы версия сакталды. Файл боюнча жеткиликтүү өзгөрүүлөр төмөндө көрсөтүлдү.', viewComparison: 'Салыштырууну көрүү', previousVersion: 'Мурунку версия', currentVersion: 'Жаңы версия', fileNameLabel: 'Файлдын аты', fileSizeLabel: 'Файлдын өлчөмү', fileFormatLabel: 'Файлдын форматы', fileModifiedLabel: 'Түзмөктө өзгөртүлгөн', uploadDate: 'Жүктөлгөн күнү', before: 'Болгон', after: 'Болду', changed: 'Өзгөрдү', unchanged: 'Өзгөргөн жок', metadataDifferences: 'Табылган айырмалар', contentDifferences: 'Документтин мазмуну', contentComparisonPending: 'Сервердик талдоону күтүп жатат', contentComparisonPendingCopy: 'Аталыштар, форматтар, өлчөмдөр жана өзгөртүү даталары салыштырылды. Барактар, саптар жана мазмун боюнча айырмалар сервердик талдоо кошулганда чыгат; StructOS жок маалыматты ойлоп таппайт.', changesFound: 'өзгөрүү табылды', sameFileSelected: 'Ошол эле файл тандалды. Жаңы версия үчүн өзгөртүлгөн файлды тандаңыз.', versionSaved: 'Жаңы версия сакталды жана салыштырылды' });
Object.assign(copy.TJ, { newVersion: 'Версияи нав', uploadChanges: 'Бор кардани тағйирот', uploadAndCompare: 'Бор кардан ва муқоиса намудан', revisionUploadHint: 'Файли пешина дар таърих мемонад. Баъди боркунӣ StructOS версияи кӯҳна ва навро фавран муқоиса мекунад.', currentStoredVersion: 'Версияи ҷории захирашуда', versionHistory: 'Таърихи версияҳо', versionNumber: 'Версия', versions: 'версия', versionComparison: 'Муқоисаи версияҳо', comparisonInProgress: 'Версияҳо муқоиса мешаванд', comparisonInProgressCopy: 'Файли пешина ва нав санҷида шуда, тағйироти ёфтшуда нигоҳ дошта мешаванд.', comparisonComplete: 'Муқоиса анҷом ёфт', comparisonCompleteCopy: 'Версияи нав нигоҳ дошта шуд. Тағйироти дастрас дар поён нишон дода шудааст.', viewComparison: 'Дидани муқоиса', previousVersion: 'Версияи пешина', currentVersion: 'Версияи нав', fileNameLabel: 'Номи файл', fileSizeLabel: 'Андозаи файл', fileFormatLabel: 'Формати файл', fileModifiedLabel: 'Дар дастгоҳ тағйир ёфт', uploadDate: 'Санаи боркунӣ', before: 'Буд', after: 'Шуд', changed: 'Тағйир ёфт', unchanged: 'Бетағйир', metadataDifferences: 'Фарқиятҳои ёфтшуда', contentDifferences: 'Мазмуни ҳуҷҷат', contentComparisonPending: 'Интизори таҳлили серверӣ', contentComparisonPendingCopy: 'Ном, формат, андоза ва санаи тағйир муқоиса шуданд. Фарқияти варақҳо, сатрҳо ва мазмун пас аз пайвасти таҳлили серверӣ пайдо мешавад; StructOS маълумоти набударо намесозад.', changesFound: 'тағйирот ёфт шуд', sameFileSelected: 'Ҳамин файл интихоб шуд. Барои версияи нав файли тағйирёфтаро интихоб кунед.', versionSaved: 'Версияи нав нигоҳ дошта ва муқоиса шуд' });

Object.assign(copy.RU, { openDocument: 'Открыть', replaceDocument: 'Заменить', chooseReportDocument: 'Что открыть?', chooseReportDocumentHint: 'Выберите результат по одному из загруженных документов.', analysisNotReady: 'Документ ещё не проанализирован', analysisNotReadyHint: 'Сначала запустите анализ этого объекта, после чего откроется детальная страница.', runAnalysisNow: 'Анализировать сейчас', projectAnalysis: 'Детальный анализ проекта', backToProjects: 'К моим проектам', sourceFile: 'Источник', analyzedDataOnly: 'StructOS показывает только данные, извлечённые из загруженного файла. Недостающие значения не додумываются.', commercialProposal: 'Коммерческое предложение', projectBySheets: 'Проект по листам', projectBySystems: 'Проект по системам', projectMaterials: 'Материалы проекта', billOfQuantities: 'Ведомость объёмов работ', section: 'Раздел', sheetNumber: 'Лист', sheetName: 'Наименование листа', system: 'Система', sheets: 'Листы', materials: 'Материалы', materialName: 'Наименование материала', works: 'Работы', markType: 'Марка / тип', source: 'Источник', statusLabel: 'Статус', extractionPending: 'Данные ожидают извлечения', extractionPendingCopy: 'Структура вкладки подготовлена. Строки появятся после подключения серверного анализа файла.', analyzedDocumentPage: 'Страница анализа подготовлена', analyzedDocumentPageCopy: 'Файл сохранён и выбран. Детальную структуру этого документа разберём следующим этапом.' });
Object.assign(copy.EN, { openDocument: 'Open', replaceDocument: 'Replace', chooseReportDocument: 'What would you like to open?', chooseReportDocumentHint: 'Choose a result for one of the uploaded documents.', analysisNotReady: 'Document has not been analyzed yet', analysisNotReadyHint: 'Run the object analysis first to unlock its detailed page.', runAnalysisNow: 'Analyze now', projectAnalysis: 'Detailed project analysis', backToProjects: 'Back to my projects', sourceFile: 'Source', analyzedDataOnly: 'StructOS shows only data extracted from the uploaded file. Missing values are not invented.', commercialProposal: 'Commercial proposal', projectBySheets: 'Project by sheets', projectBySystems: 'Project by systems', projectMaterials: 'Project materials', billOfQuantities: 'Bill of quantities', section: 'Section', sheetNumber: 'Sheet', sheetName: 'Sheet name', system: 'System', sheets: 'Sheets', materials: 'Materials', materialName: 'Material name', works: 'Works', markType: 'Mark / type', source: 'Source', statusLabel: 'Status', extractionPending: 'Data extraction pending', extractionPendingCopy: 'The tab structure is ready. Rows will appear after server-side file analysis is connected.', analyzedDocumentPage: 'Analysis page is ready', analyzedDocumentPageCopy: 'The file is saved and selected. We will define this document’s detailed structure next.' });
Object.assign(copy.KY, { openDocument: 'Ачуу', replaceDocument: 'Алмаштыруу', chooseReportDocument: 'Эмнени ачуу керек?', chooseReportDocumentHint: 'Жүктөлгөн документтердин биринин жыйынтыгын тандаңыз.', analysisNotReady: 'Документ али талдана элек', analysisNotReadyHint: 'Деталдуу баракты ачуу үчүн адегенде объектти талдаңыз.', runAnalysisNow: 'Азыр талдоо', projectAnalysis: 'Долбоорду деталдуу талдоо', backToProjects: 'Менин долбоорлорума', sourceFile: 'Булак', analyzedDataOnly: 'StructOS жүктөлгөн файлдан алынган маалыматты гана көрсөтөт. Жетишпеген маанилер ойлоп табылбайт.', commercialProposal: 'Коммерциялык сунуш', projectBySheets: 'Долбоор барактар боюнча', projectBySystems: 'Долбоор системалар боюнча', projectMaterials: 'Долбоордун материалдары', billOfQuantities: 'Иш көлөмдөрүнүн ведомосту', section: 'Бөлүм', sheetNumber: 'Барак', sheetName: 'Барактын аталышы', system: 'Система', sheets: 'Барактар', materials: 'Материалдар', materialName: 'Материалдын аталышы', works: 'Иштер', markType: 'Марка / түрү', source: 'Булак', statusLabel: 'Статус', extractionPending: 'Маалымат чыгарылышын күтүп жатат', extractionPendingCopy: 'Бөлүмдүн түзүмү даяр. Сервердик талдоо кошулгандан кийин саптар пайда болот.', analyzedDocumentPage: 'Талдоо барагы даяр', analyzedDocumentPageCopy: 'Файл сакталды жана тандалды. Бул документтин деталдуу түзүмүн кийинки этапта талкуулайбыз.' });
Object.assign(copy.TJ, { openDocument: 'Кушодан', replaceDocument: 'Иваз кардан', chooseReportDocument: 'Чиро кушоем?', chooseReportDocumentHint: 'Натиҷаи яке аз ҳуҷҷатҳои боршударо интихоб кунед.', analysisNotReady: 'Ҳуҷҷат ҳанӯз таҳлил нашудааст', analysisNotReadyHint: 'Барои кушодани саҳифаи муфассал аввал таҳлили объектро оғоз кунед.', runAnalysisNow: 'Ҳозир таҳлил кардан', projectAnalysis: 'Таҳлили муфассали лоиҳа', backToProjects: 'Ба лоиҳаҳои ман', sourceFile: 'Манбаъ', analyzedDataOnly: 'StructOS танҳо маълумоти аз файли боршуда гирифташударо нишон медиҳад. Маълумоти набуда сохта намешавад.', commercialProposal: 'Пешниҳоди тиҷоратӣ', projectBySheets: 'Лоиҳа аз рӯи варақҳо', projectBySystems: 'Лоиҳа аз рӯи системаҳо', projectMaterials: 'Маводи лоиҳа', billOfQuantities: 'Рӯйхати ҳаҷми корҳо', section: 'Бахш', sheetNumber: 'Варақ', sheetName: 'Номи варақ', system: 'Система', sheets: 'Варақҳо', materials: 'Мавод', materialName: 'Номи мавод', works: 'Корҳо', markType: 'Тамға / навъ', source: 'Манбаъ', statusLabel: 'Ҳолат', extractionPending: 'Интизори гирифтани маълумот', extractionPendingCopy: 'Сохтори ҷадвал омода аст. Пас аз пайвасти таҳлили серверӣ сатрҳо пайдо мешаванд.', analyzedDocumentPage: 'Саҳифаи таҳлил омода аст', analyzedDocumentPageCopy: 'Файл нигоҳ дошта ва интихоб шуд. Сохтори муфассали ин ҳуҷҷатро дар марҳилаи навбатӣ муайян мекунем.' });

Object.assign(copy.RU, { commercialProposals: 'Коммерческие предложения', commercialProposalsDescription: 'КП по каждому объекту, проекту и разделу работ', proposalWorkspaceHint: 'Проект или смета превращаются в понятную структуру работ и материалов', noCommercialProposals: 'Коммерческих предложений пока нет', noCommercialProposalsCopy: 'Загрузите проект или смету в объект — здесь появится подготовка КП.', buildCommercialProposal: 'Создать КП', openCommercialProposal: 'Открыть КП', documentsTab: 'Документы', proposalAwaitingAnalysis: 'Файл загружен и готов к созданию КП', proposalReady: 'КП подготовлено', proposalSource: 'Исходный файл', proposalObjectTabHint: 'StructOS соберёт работы, объёмы и материалы для расчёта предложения', uploadProjectOrEstimate: 'Загрузить проект или смету' });
Object.assign(copy.EN, { commercialProposals: 'Commercial proposals', commercialProposalsDescription: 'A proposal for every object, project and work section', proposalWorkspaceHint: 'A project or estimate becomes a clear structure of work and materials', noCommercialProposals: 'No commercial proposals yet', noCommercialProposalsCopy: 'Upload a project or estimate to an object and proposal preparation will appear here.', buildCommercialProposal: 'Create proposal', openCommercialProposal: 'Open proposal', documentsTab: 'Documents', proposalAwaitingAnalysis: 'The file is uploaded and ready for proposal generation', proposalReady: 'Proposal prepared', proposalSource: 'Source file', proposalObjectTabHint: 'StructOS organizes work, quantities and materials for proposal pricing', uploadProjectOrEstimate: 'Upload a project or estimate' });
Object.assign(copy.KY, { commercialProposals: 'Коммерциялык сунуштар', commercialProposalsDescription: 'Ар бир объект, долбоор жана иш бөлүмү үчүн КП', proposalWorkspaceHint: 'Долбоор же смета иштердин жана материалдардын түшүнүктүү түзүмүнө айланат', noCommercialProposals: 'Коммерциялык сунуштар азырынча жок', noCommercialProposalsCopy: 'Объектке долбоор же смета жүктөңүз — бул жерде КП даярдоо пайда болот.', buildCommercialProposal: 'КП түзүү', openCommercialProposal: 'КПны ачуу', documentsTab: 'Документтер', proposalAwaitingAnalysis: 'Файл жүктөлдү жана КП түзүүгө даяр', proposalReady: 'КП даярдалды', proposalSource: 'Баштапкы файл', proposalObjectTabHint: 'StructOS сунушту эсептөө үчүн иштерди, көлөмдөрдү жана материалдарды чогултат', uploadProjectOrEstimate: 'Долбоор же смета жүктөө' });
Object.assign(copy.TJ, { commercialProposals: 'Пешниҳодҳои тиҷоратӣ', commercialProposalsDescription: 'Пешниҳод барои ҳар объект, лоиҳа ва бахши кор', proposalWorkspaceHint: 'Лоиҳа ё смета ба сохтори фаҳмои корҳо ва мавод табдил меёбад', noCommercialProposals: 'Пешниҳоди тиҷоратӣ ҳоло нест', noCommercialProposalsCopy: 'Лоиҳа ё сметаро ба объект бор кунед — омодасозии пешниҳод дар ин ҷо пайдо мешавад.', buildCommercialProposal: 'Сохтани пешниҳод', openCommercialProposal: 'Кушодани пешниҳод', documentsTab: 'Ҳуҷҷатҳо', proposalAwaitingAnalysis: 'Файл бор шуд ва барои сохтани пешниҳод омода аст', proposalReady: 'Пешниҳод омода шуд', proposalSource: 'Файли аслӣ', proposalObjectTabHint: 'StructOS корҳо, ҳаҷмҳо ва маводро барои ҳисоб ҷамъ мекунад', uploadProjectOrEstimate: 'Бор кардани лоиҳа ё смета' });

Object.assign(copy.RU, {
  proposalCreateProjectHint: 'Загрузите проект — StructOS соберёт КП по работам и материалам.',
  proposalCreateEstimateHint: 'Загрузите смету — StructOS разложит позиции для нового КП.',
  proposalSectionField: 'Раздел', proposalSectionPlaceholder: 'Например, Электроснабжение',
  proposalFileHint: 'Один файл для одного коммерческого предложения', createCommercialProposal: 'Создать КП',
  creatingCommercialProposal: 'Создаём КП и запускаем анализ…', commercialProposalCreated: 'КП создано и проанализировано',
  proposalByProject: 'КП по проекту', proposalByEstimate: 'КП по смете', foundByIntelligence: 'Найдено интеллектом',
  proposalSmr: 'КП на СМР', proposalMaterials: 'КП материалы', proposalRequired: 'Потребуется',
  specificationProjectWorks: 'По спецификации проекта', outsideSpecificationProjectWorks: 'Вне спецификации по проекту',
  possibleProjectWorks: 'Работы возможные по проекту', proposalAssociatedWorks: 'Сопутствующие работы',
  proposalEquipment: 'Оборудование', proposalMaterialItems: 'Материалы', toolsAndConsumables: 'Инструмент и расходник',
  consumableMaterials: 'Расходные материалы', laborHourCosts: 'Затраты на человеко-часы',
  positionsCount: 'позиций', quantityCount: 'кол-во', personHoursUnit: 'чел.-ч',
  proposalFoundSummary: 'Структура заполняется только данными, найденными при анализе файла.'
});
Object.assign(copy.EN, {
  proposalCreateProjectHint: 'Upload a project and StructOS will assemble a work and materials proposal.',
  proposalCreateEstimateHint: 'Upload an estimate and StructOS will organize its items into a new proposal.',
  proposalSectionField: 'Section', proposalSectionPlaceholder: 'For example, Power supply',
  proposalFileHint: 'One file per commercial proposal', createCommercialProposal: 'Create proposal',
  creatingCommercialProposal: 'Creating the proposal and starting analysis…', commercialProposalCreated: 'Proposal created and analyzed',
  proposalByProject: 'Project proposal', proposalByEstimate: 'Estimate proposal', foundByIntelligence: 'Found by intelligence',
  proposalSmr: 'Construction works proposal', proposalMaterials: 'Materials proposal', proposalRequired: 'Required',
  specificationProjectWorks: 'From the project specification', outsideSpecificationProjectWorks: 'Outside the project specification',
  possibleProjectWorks: 'Possible project work', proposalAssociatedWorks: 'Associated work',
  proposalEquipment: 'Equipment', proposalMaterialItems: 'Materials', toolsAndConsumables: 'Tools and consumables',
  consumableMaterials: 'Consumable materials', laborHourCosts: 'Labour-hour costs',
  positionsCount: 'items', quantityCount: 'quantity', personHoursUnit: 'person-hours',
  proposalFoundSummary: 'The structure contains only data found while analyzing the file.'
});
Object.assign(copy.KY, {
  proposalCreateProjectHint: 'Долбоорду жүктөңүз — StructOS иштер жана материалдар боюнча КП түзөт.',
  proposalCreateEstimateHint: 'Сметаны жүктөңүз — StructOS позицияларды жаңы КП үчүн бөлүштүрөт.',
  proposalSectionField: 'Бөлүм', proposalSectionPlaceholder: 'Мисалы, Электр менен камсыздоо',
  proposalFileHint: 'Бир коммерциялык сунуш үчүн бир файл', createCommercialProposal: 'КП түзүү',
  creatingCommercialProposal: 'КП түзүлүп, талдоо башталууда…', commercialProposalCreated: 'КП түзүлүп, талданды',
  proposalByProject: 'Долбоор боюнча КП', proposalByEstimate: 'Смета боюнча КП', foundByIntelligence: 'Интеллект тапты',
  proposalSmr: 'Курулуш-монтаж иштерине КП', proposalMaterials: 'Материалдарга КП', proposalRequired: 'Керектелет',
  specificationProjectWorks: 'Долбоордун спецификациясы боюнча', outsideSpecificationProjectWorks: 'Долбоордун спецификациясынан тышкары',
  possibleProjectWorks: 'Долбоор боюнча мүмкүн болгон иштер', proposalAssociatedWorks: 'Коштоочу иштер',
  proposalEquipment: 'Жабдуулар', proposalMaterialItems: 'Материалдар', toolsAndConsumables: 'Аспап жана сарпталуучу нерсе',
  consumableMaterials: 'Сарпталуучу материалдар', laborHourCosts: 'Адам-саат чыгымдары',
  positionsCount: 'позиция', quantityCount: 'саны', personHoursUnit: 'адам-саат',
  proposalFoundSummary: 'Түзүм файлды талдоодо табылган маалыматтар менен гана толтурулат.'
});
Object.assign(copy.TJ, {
  proposalCreateProjectHint: 'Лоиҳаро бор кунед — StructOS барои корҳо ва мавод КП месозад.',
  proposalCreateEstimateHint: 'Сметаро бор кунед — StructOS мавқеъҳоро барои КП-и нав ҷудо мекунад.',
  proposalSectionField: 'Бахш', proposalSectionPlaceholder: 'Масалан, Таъминоти барқ',
  proposalFileHint: 'Барои як пешниҳоди тиҷоратӣ як файл', createCommercialProposal: 'Сохтани КП',
  creatingCommercialProposal: 'КП сохта шуда, таҳлил оғоз меёбад…', commercialProposalCreated: 'КП сохта ва таҳлил шуд',
  proposalByProject: 'КП аз рӯи лоиҳа', proposalByEstimate: 'КП аз рӯи смета', foundByIntelligence: 'Интеллект пайдо кард',
  proposalSmr: 'КП барои корҳои сохтмонӣ', proposalMaterials: 'КП барои мавод', proposalRequired: 'Лозим мешавад',
  specificationProjectWorks: 'Аз рӯи мушаххасоти лоиҳа', outsideSpecificationProjectWorks: 'Берун аз мушаххасоти лоиҳа',
  possibleProjectWorks: 'Корҳои эҳтимолии лоиҳа', proposalAssociatedWorks: 'Корҳои ҳамроҳ',
  proposalEquipment: 'Таҷҳизот', proposalMaterialItems: 'Мавод', toolsAndConsumables: 'Асбоб ва масрафшаванда',
  consumableMaterials: 'Маводи масрафшаванда', laborHourCosts: 'Хароҷоти одам-соат',
  positionsCount: 'мавқеъ', quantityCount: 'миқдор', personHoursUnit: 'одам-соат',
  proposalFoundSummary: 'Сохтор танҳо бо маълумоти ҳангоми таҳлили файл ёфташуда пур мешавад.'
});
Object.assign(copy.RU, { proposalCreateFailed: 'Не удалось создать КП' });
Object.assign(copy.EN, { proposalCreateFailed: 'Could not create the proposal' });
Object.assign(copy.KY, { proposalCreateFailed: 'КП түзүү мүмкүн болгон жок' });
Object.assign(copy.TJ, { proposalCreateFailed: 'КП сохта нашуд' });

Object.assign(copy.RU, {
  myProjectsDescription: 'Четыре независимых рабочих раздела и запуск объекта в один клик',
  commercialProposalsDescription: 'Самостоятельный раздел для создания и хранения КП',
  proposalWorkspaceHint: 'Файлы и результаты хранятся только здесь и не создают объект',
  noCommercialProposalsCopy: 'Заполните один из блоков выше — созданное КП сохранится только в этом разделе.',
  commercialProposalCreated: 'КП создано, проанализировано и сохранено в этом разделе',
  proposalSectionStorage: 'Отдельный раздел · объект не создаётся'
});
Object.assign(copy.EN, {
  myProjectsDescription: 'Four independent workspaces and one-click object launch',
  commercialProposalsDescription: 'An independent workspace for creating and storing proposals',
  proposalWorkspaceHint: 'Files and results stay here and do not create an object',
  noCommercialProposalsCopy: 'Complete either form above. The proposal will be stored only in this workspace.',
  commercialProposalCreated: 'Proposal created, analyzed, and saved in this workspace',
  proposalSectionStorage: 'Independent workspace · no object is created'
});
Object.assign(copy.KY, {
  myProjectsDescription: 'Төрт өз алдынча иш бөлүмү жана объектти бир чыкылдатуу менен ишке киргизүү',
  commercialProposalsDescription: 'КП түзүү жана сактоо үчүн өз алдынча бөлүм',
  proposalWorkspaceHint: 'Файлдар жана жыйынтыктар ушул жерде гана сакталат, объект түзүлбөйт',
  noCommercialProposalsCopy: 'Жогорудагы блоктордун бирин толтуруңуз — КП ушул бөлүмдө гана сакталат.',
  commercialProposalCreated: 'КП түзүлүп, талданып, ушул бөлүмдө сакталды',
  proposalSectionStorage: 'Өз алдынча бөлүм · объект түзүлбөйт'
});
Object.assign(copy.TJ, {
  myProjectsDescription: 'Чор бахши мустақили корӣ ва оғози объект бо як клик',
  commercialProposalsDescription: 'Бахши мустақил барои сохтан ва нигоҳ доштани КП',
  proposalWorkspaceHint: 'Файлҳо ва натиҷаҳо танҳо дар ҳамин ҷо мемонанд ва объект намесозанд',
  noCommercialProposalsCopy: 'Яке аз блокҳои болоро пур кунед — КП танҳо дар ҳамин бахш нигоҳ дошта мешавад.',
  commercialProposalCreated: 'КП сохта, таҳлил ва дар ҳамин бахш нигоҳ дошта шуд',
  proposalSectionStorage: 'Бахши мустақил · объект сохта намешавад'
});

Object.assign(copy.RU, {
  renameCommercialProposal: 'Переименовать КП', deleteCommercialProposal: 'Удалить КП',
  renameCommercialProposalHint: 'Измените название объекта и раздел. Файл и результаты анализа сохранятся.',
  commercialProposalRenamed: 'Название КП изменено',
  deleteCommercialProposalHint: 'Файл и результаты анализа будут удалены только из раздела КП.',
  commercialProposalDeleted: 'КП удалено'
});
Object.assign(copy.EN, {
  renameCommercialProposal: 'Rename proposal', deleteCommercialProposal: 'Delete proposal',
  renameCommercialProposalHint: 'Change the object name and section. The file and analysis results will remain saved.',
  commercialProposalRenamed: 'Proposal name updated',
  deleteCommercialProposalHint: 'The file and analysis results will be deleted only from the proposals workspace.',
  commercialProposalDeleted: 'Proposal deleted'
});
Object.assign(copy.KY, {
  renameCommercialProposal: 'КП атын өзгөртүү', deleteCommercialProposal: 'КП өчүрүү',
  renameCommercialProposalHint: 'Объекттин жана бөлүмдүн атын өзгөртүңүз. Файл жана талдоо жыйынтыгы сакталат.',
  commercialProposalRenamed: 'КП аталышы өзгөртүлдү',
  deleteCommercialProposalHint: 'Файл жана талдоо жыйынтыгы КП бөлүмүнөн гана өчүрүлөт.',
  commercialProposalDeleted: 'КП өчүрүлдү'
});
Object.assign(copy.TJ, {
  renameCommercialProposal: 'Иваз кардани номи КП', deleteCommercialProposal: 'Нест кардани КП',
  renameCommercialProposalHint: 'Номи объект ва бахшро иваз кунед. Файл ва натиҷаҳои таҳлил нигоҳ дошта мешаванд.',
  commercialProposalRenamed: 'Номи КП иваз шуд',
  deleteCommercialProposalHint: 'Файл ва натиҷаҳои таҳлил танҳо аз бахши КП нест карда мешаванд.',
  commercialProposalDeleted: 'КП нест карда шуд'
});

Object.assign(copy.RU, {
  proposalWorkspaceTitle: 'Коммерческое предложение', backToProposalList: 'К списку КП',
  proposalWorkspacePageHint: 'Выберите раздел, заполните цены и соберите нужные позиции в своё КП.',
  proposalOtherExpenses: 'Прочие расходы', proposalBySpecificationShort: 'По спецификации',
  proposalByProjectShort: 'По проекту', proposalAdditionalWorksShort: 'Доп. работы',
  proposalAssociatedShort: 'Сопутствующие', myCommercialProposal: 'Моё КП',
  proposalLineName: 'Наименование работ (услуг)', sendToMyProposal: 'Отправить в «Моё КП»',
  saveMyProposalSelection: 'Сохранить в «Моё КП»', myProposalSelectionSaved: 'Выбранные позиции сохранены в «Моё КП»',
  removeFromMyProposal: 'Удалить из «Моё КП»', emptyProposalGroup: 'В этом разделе позиции пока не найдены',
  emptyMyProposal: 'Отметьте нужные строки в других разделах и сохраните их в «Моё КП».',
  totalWorkTypes: 'Итого видов работ', totalProposalPrice: 'Итого цена', totalTax: 'Итого налог',
  proposalPriceMode: 'Расчёт цены', pricesWithTax: 'Цена включает налог — вычесть из стоимости',
  pricesWithoutTax: 'Цена без налога — добавить к стоимости', priceCash: 'Цена: наличными',
  priceIncludesVat22: 'Цены: НДС 22%', priceIncludesTax6: 'Цены: Налог 6%',
  priceIncludesVat5: 'Цены: НДС 5%', priceExcludesVat22: 'Цены: НДС 22%',
  priceExcludesVat5: 'Цены: НДС 5%', priceExcludesTax6: 'Цены: Налог 6%',
  priceBeforeTax: 'Итого без налога', taxAmount: 'Налог', priceWithTax: 'Цена с налогом',
  proposalGrossPrice: 'Общая цена', priceTotalWithoutTax: 'Цена итого без налога', priceTotalWithTax: 'Цена итого с налогом',
  includedUnitPriceWithoutTax: 'Цена за ед.', includedTotalWithoutTax: 'Итого цена',
  includedUnitPriceWithTax: 'Цена за ед. с', includedTotalWithTax: 'Итого с', includedTaxTotal: 'Итого налог',
  selectUpToTwoTaxModes: 'Можно выбрать не более двух режимов налогообложения',
  downloadProposal: 'Скачать', viewProposal: 'Посмотреть', shareProposal: 'Поделиться',
  chooseProposalFragments: 'Какие фрагменты КП использовать?',
  chooseProposalFragmentsHint: 'Отметьте разделы, которые войдут в выбранное действие.',
  selectProposalFragments: 'Выберите хотя бы один фрагмент КП', proposalFragmentPositions: 'позиций',
  addOwnProposalPosition: 'Добавить свою позицию', ownProposalPosition: 'Своя позиция',
  ownProposalPositionHint: 'Добавьте строку вручную в выбранный раздел коммерческого предложения.',
  ownProposalPositionName: 'Наименование работы, услуги или материала', ownProposalPositionNamePlaceholder: 'Например: Монтаж кабельного лотка',
  saveProposalPosition: 'Добавить позицию', proposalPositionAdded: 'Своя позиция добавлена',
  deleteOwnProposalPosition: 'Удалить свою позицию', ownProposalPositionDeleted: 'Своя позиция удалена',
  laborCalculationTitle: 'Расчёт человеко-часов', employeeDailyCost: 'Стоимость сотрудника в день',
  workingHoursPerDay: 'Рабочих часов в дне', hourlyEmployeeCost: 'Стоимость 1 часа', hoursUnit: 'ч',
  laborCalculationFormula: 'Стоимость 1 часа = стоимость сотрудника в день ÷ рабочих часов. Итого = часов работы × стоимость 1 часа.',
  workHours: 'Часов работы', totalLaborCost: 'Итого стоимость', totalManHours: 'Итого человеко-часов',
  laborWorkName: 'Наименование работ (из «Моё КП»)', laborWorksFromMyProposal: 'Работы из «Моё КП»',
  emptyLaborProposal: 'Добавьте работы в «Моё КП» или создайте свою позицию в этом разделе.',
  proposalPartiesHeading: 'Участники коммерческого предложения', proposalSender: 'Отправитель', proposalRecipient: 'Получатель', proposalOrganization: 'Организация', proposalSectionNameLabel: 'Название раздела',
  proposalSenderName: 'ФИО отправителя', proposalSenderOrganization: 'Организация отправителя', proposalSenderPhone: 'Телефон отправителя',
  proposalRecipientName: 'ФИО получателя', proposalRecipientOrganization: 'Организация получателя',
  proposalGreeting: 'Здравствуйте.', proposalIntro: 'Благодарим за проявленный интерес, предлагаем Вам рассмотреть наше коммерческое предложение.',
  proposalClosing: 'Будем рады сотрудничеству и готовы обсудить условия и сроки.', proposalRespectfully: 'С уважением,',
  proposalFinalSummary: 'Итоги коммерческого предложения', proposalSummaryPriceTotal: 'Цена итого',
  proposalSummaryPriceWithTax: 'Цена итого ({tax})', proposalSummaryTaxTotal: 'Итого ({tax})',
  proposalSummaryPositions: 'Всего позиций в КП', proposalTaxNotSelected: 'налог не выбран'
});
Object.assign(copy.EN, {
  proposalWorkspaceTitle: 'Commercial proposal', backToProposalList: 'Back to proposals',
  proposalWorkspacePageHint: 'Choose a section, enter prices, and collect the required lines in your proposal.',
  proposalOtherExpenses: 'Other expenses', proposalBySpecificationShort: 'By specification',
  proposalByProjectShort: 'By project', proposalAdditionalWorksShort: 'Additional works',
  proposalAssociatedShort: 'Associated works', myCommercialProposal: 'My proposal',
  proposalLineName: 'Work or service name', sendToMyProposal: 'Send to “My proposal”',
  saveMyProposalSelection: 'Save to “My proposal”', myProposalSelectionSaved: 'Selected lines saved to “My proposal”',
  removeFromMyProposal: 'Remove from “My proposal”', emptyProposalGroup: 'No lines were found in this section yet',
  emptyMyProposal: 'Select lines in the other sections and save them to “My proposal”.',
  totalWorkTypes: 'Total work types', totalProposalPrice: 'Total price', totalTax: 'Total tax',
  proposalPriceMode: 'Price calculation', pricesWithTax: 'Tax included — subtract it from the price',
  pricesWithoutTax: 'Tax excluded — add it to the price', priceCash: 'Price: cash',
  priceIncludesVat22: 'Prices: VAT 22% included', priceIncludesTax6: 'Prices: 6% tax included',
  priceIncludesVat5: 'Prices: VAT 5% included', priceExcludesVat22: 'Prices: VAT 22% excluded',
  priceExcludesVat5: 'Prices: VAT 5% excluded', priceExcludesTax6: 'Prices: 6% tax excluded',
  priceBeforeTax: 'Total before tax', taxAmount: 'Tax', priceWithTax: 'Price with tax',
  proposalGrossPrice: 'Total price', priceTotalWithoutTax: 'Final price without tax', priceTotalWithTax: 'Final price with tax',
  includedUnitPriceWithoutTax: 'Unit price', includedTotalWithoutTax: 'Total price',
  includedUnitPriceWithTax: 'Unit price with', includedTotalWithTax: 'Total with', includedTaxTotal: 'Total tax',
  selectUpToTwoTaxModes: 'You can select no more than two tax modes',
  downloadProposal: 'Download', viewProposal: 'View', shareProposal: 'Share',
  chooseProposalFragments: 'Which proposal fragments should be used?',
  chooseProposalFragmentsHint: 'Select the sections to include in this action.',
  selectProposalFragments: 'Select at least one proposal fragment', proposalFragmentPositions: 'lines',
  addOwnProposalPosition: 'Add your own line', ownProposalPosition: 'Custom line',
  ownProposalPositionHint: 'Add a line manually to the selected commercial proposal section.',
  ownProposalPositionName: 'Work, service, or material name', ownProposalPositionNamePlaceholder: 'For example: Cable tray installation',
  saveProposalPosition: 'Add line', proposalPositionAdded: 'Custom line added',
  deleteOwnProposalPosition: 'Delete custom line', ownProposalPositionDeleted: 'Custom line deleted',
  laborCalculationTitle: 'Labor-hour calculation', employeeDailyCost: 'Employee daily cost',
  workingHoursPerDay: 'Working hours per day', hourlyEmployeeCost: 'Cost per hour', hoursUnit: 'h',
  laborCalculationFormula: 'Cost per hour = employee daily cost ÷ working hours. Total = work hours × cost per hour.',
  workHours: 'Work hours', totalLaborCost: 'Total cost', totalManHours: 'Total labor hours',
  laborWorkName: 'Work name (from “My proposal”)', laborWorksFromMyProposal: 'Works from “My proposal”',
  emptyLaborProposal: 'Add works to “My proposal” or create a custom line in this section.',
  proposalPartiesHeading: 'Commercial proposal parties', proposalSender: 'Sender', proposalRecipient: 'Recipient', proposalOrganization: 'Organization', proposalSectionNameLabel: 'Section name',
  proposalSenderName: 'Sender full name', proposalSenderOrganization: 'Sender organization', proposalSenderPhone: 'Sender phone',
  proposalRecipientName: 'Recipient full name', proposalRecipientOrganization: 'Recipient organization',
  proposalGreeting: 'Hello.', proposalIntro: 'Thank you for your interest. Please consider our commercial proposal.',
  proposalClosing: 'We will be glad to cooperate and are ready to discuss the terms and schedule.', proposalRespectfully: 'Sincerely,',
  proposalFinalSummary: 'Commercial proposal totals', proposalSummaryPriceTotal: 'Total price',
  proposalSummaryPriceWithTax: 'Total price ({tax})', proposalSummaryTaxTotal: 'Total ({tax})',
  proposalSummaryPositions: 'Total proposal lines', proposalTaxNotSelected: 'tax not selected'
});
Object.assign(copy.KY, {
  proposalWorkspaceTitle: 'Коммерциялык сунуш', backToProposalList: 'КП тизмесине',
  proposalWorkspacePageHint: 'Бөлүмдү тандап, бааларды толтуруп, керектүү позицияларды өз КПңызга чогултуңуз.',
  proposalOtherExpenses: 'Башка чыгымдар', proposalBySpecificationShort: 'Спецификация боюнча',
  proposalByProjectShort: 'Долбоор боюнча', proposalAdditionalWorksShort: 'Кошумча иштер',
  proposalAssociatedShort: 'Коштоочу иштер', myCommercialProposal: 'Менин КП',
  proposalLineName: 'Иштин (кызматтын) аталышы', sendToMyProposal: '«Менин КПга» жөнөтүү',
  saveMyProposalSelection: '«Менин КПга» сактоо', myProposalSelectionSaved: 'Тандалган позициялар «Менин КПга» сакталды',
  removeFromMyProposal: '«Менин КПдан» өчүрүү', emptyProposalGroup: 'Бул бөлүмдө позициялар азырынча табылган жок',
  emptyMyProposal: 'Башка бөлүмдөрдөн саптарды белгилеп, «Менин КПга» сактаңыз.',
  totalWorkTypes: 'Иш түрлөрүнүн жыйынтыгы', totalProposalPrice: 'Жалпы баа', totalTax: 'Жалпы салык',
  proposalPriceMode: 'Бааны эсептөө', pricesWithTax: 'Салык баага кирет — нарктан алып салуу',
  pricesWithoutTax: 'Салык баага кирбейт — наркка кошуу', priceCash: 'Баасы: накталай',
  priceIncludesVat22: 'Баалар: КНС 22% менен', priceIncludesTax6: 'Баалар: салык 6% менен',
  priceIncludesVat5: 'Баалар: КНС 5% менен', priceExcludesVat22: 'Баалар: КНС 22% жок',
  priceExcludesVat5: 'Баалар: КНС 5% жок', priceExcludesTax6: 'Баалар: салык 6% жок',
  priceBeforeTax: 'Салыксыз жыйынтык', taxAmount: 'Салык', priceWithTax: 'Салык менен баа',
  proposalGrossPrice: 'Жалпы баа', priceTotalWithoutTax: 'Салыксыз акыркы баа', priceTotalWithTax: 'Салык менен акыркы баа',
  includedUnitPriceWithoutTax: 'Бирдик баасы', includedTotalWithoutTax: 'Жалпы баа',
  includedUnitPriceWithTax: 'Бирдик баасы, салык менен', includedTotalWithTax: 'Салык менен жыйынтык', includedTaxTotal: 'Салыктын жыйынтыгы',
  selectUpToTwoTaxModes: 'Экиден ашык салык режимин тандоого болбойт',
  downloadProposal: 'Жүктөө', viewProposal: 'Көрүү', shareProposal: 'Бөлүшүү',
  chooseProposalFragments: 'КПнын кайсы бөлүктөрү колдонулсун?',
  chooseProposalFragmentsHint: 'Бул аракетке кире турган бөлүмдөрдү белгилеңиз.',
  selectProposalFragments: 'КПнын жок дегенде бир бөлүгүн тандаңыз', proposalFragmentPositions: 'позиция',
  addOwnProposalPosition: 'Өз позицияңызды кошуу', ownProposalPosition: 'Өз позициясы',
  ownProposalPositionHint: 'Тандалган коммерциялык сунуш бөлүмүнө сапты кол менен кошуңуз.',
  ownProposalPositionName: 'Иштин, кызматтын же материалдын аталышы', ownProposalPositionNamePlaceholder: 'Мисалы: Кабелдик лотокту орнотуу',
  saveProposalPosition: 'Позицияны кошуу', proposalPositionAdded: 'Өз позициясы кошулду',
  deleteOwnProposalPosition: 'Өз позициясын өчүрүү', ownProposalPositionDeleted: 'Өз позициясы өчүрүлдү',
  laborCalculationTitle: 'Адам-саатты эсептөө', employeeDailyCost: 'Кызматкердин бир күндүк баасы',
  workingHoursPerDay: 'Бир күндөгү жумуш сааты', hourlyEmployeeCost: '1 сааттын баасы', hoursUnit: 'с',
  laborCalculationFormula: '1 сааттын баасы = кызматкердин бир күндүк баасы ÷ жумуш сааты. Жыйынтык = жумуш сааты × 1 сааттын баасы.',
  workHours: 'Жумуш сааты', totalLaborCost: 'Жалпы нарк', totalManHours: 'Жалпы адам-саат',
  laborWorkName: 'Иштин аталышы («Менин КПдан»)', laborWorksFromMyProposal: '«Менин КПдагы» иштер',
  emptyLaborProposal: 'Иштерди «Менин КПга» кошуңуз же бул бөлүмдө өз позицияңызды түзүңүз.',
  proposalPartiesHeading: 'Коммерциялык сунуштун тараптары', proposalSender: 'Жөнөтүүчү', proposalRecipient: 'Алуучу', proposalOrganization: 'Уюм', proposalSectionNameLabel: 'Бөлүмдүн аталышы',
  proposalSenderName: 'Жөнөтүүчүнүн аты-жөнү', proposalSenderOrganization: 'Жөнөтүүчүнүн уюму', proposalSenderPhone: 'Жөнөтүүчүнүн телефону',
  proposalRecipientName: 'Алуучунун аты-жөнү', proposalRecipientOrganization: 'Алуучунун уюму',
  proposalGreeting: 'Саламатсызбы.', proposalIntro: 'Кызыгуу көрсөткөнүңүз үчүн ыраазычылык билдиребиз жана коммерциялык сунушубузду карап чыгууну сунуштайбыз.',
  proposalClosing: 'Кызматташууга кубанычта болобуз жана шарттар менен мөөнөттөрдү талкуулоого даярбыз.', proposalRespectfully: 'Урматтоо менен,',
  proposalFinalSummary: 'Коммерциялык сунуштун жыйынтыгы', proposalSummaryPriceTotal: 'Жыйынтык баа',
  proposalSummaryPriceWithTax: 'Жыйынтык баа ({tax})', proposalSummaryTaxTotal: 'Жыйынтык ({tax})',
  proposalSummaryPositions: 'КПдагы позициялардын саны', proposalTaxNotSelected: 'салык тандалган жок'
});
Object.assign(copy.TJ, {
  proposalWorkspaceTitle: 'Пешниҳоди тиҷоратӣ', backToProposalList: 'Ба рӯйхати КП',
  proposalWorkspacePageHint: 'Бахшро интихоб кунед, нархҳоро ворид кунед ва мавқеъҳои лозимро дар КП-и худ ҷамъ намоед.',
  proposalOtherExpenses: 'Хароҷоти дигар', proposalBySpecificationShort: 'Аз рӯи мушаххасот',
  proposalByProjectShort: 'Аз рӯи лоиҳа', proposalAdditionalWorksShort: 'Корҳои иловагӣ',
  proposalAssociatedShort: 'Корҳои ҳамроҳ', myCommercialProposal: 'КП-и ман',
  proposalLineName: 'Номи кор (хизмат)', sendToMyProposal: 'Ба «КП-и ман» фиристодан',
  saveMyProposalSelection: 'Дар «КП-и ман» нигоҳ доштан', myProposalSelectionSaved: 'Мавқеъҳои интихобшуда дар «КП-и ман» нигоҳ дошта шуданд',
  removeFromMyProposal: 'Аз «КП-и ман» нест кардан', emptyProposalGroup: 'Дар ин бахш ҳоло мавқеъ ёфт нашуд',
  emptyMyProposal: 'Сатрҳоро дар бахшҳои дигар интихоб карда, дар «КП-и ман» нигоҳ доред.',
  totalWorkTypes: 'Ҷамъи намудҳои кор', totalProposalPrice: 'Нархи умумӣ', totalTax: 'Андози умумӣ',
  proposalPriceMode: 'Ҳисоби нарх', pricesWithTax: 'Андоз дар нарх аст — аз арзиш тарҳ кардан',
  pricesWithoutTax: 'Андоз дар нарх нест — ба арзиш илова кардан', priceCash: 'Нарх: нақдӣ',
  priceIncludesVat22: 'Нархҳо: бо ААИ 22%', priceIncludesTax6: 'Нархҳо: бо андози 6%',
  priceIncludesVat5: 'Нархҳо: бо ААИ 5%', priceExcludesVat22: 'Нархҳо: бе ААИ 22%',
  priceExcludesVat5: 'Нархҳо: бе ААИ 5%', priceExcludesTax6: 'Нархҳо: бе андози 6%',
  priceBeforeTax: 'Ҷамъ бе андоз', taxAmount: 'Андоз', priceWithTax: 'Нарх бо андоз',
  proposalGrossPrice: 'Нархи умумӣ', priceTotalWithoutTax: 'Нархи ниҳоӣ бе андоз', priceTotalWithTax: 'Нархи ниҳоӣ бо андоз',
  includedUnitPriceWithoutTax: 'Нархи воҳид', includedTotalWithoutTax: 'Нархи умумӣ',
  includedUnitPriceWithTax: 'Нархи воҳид бо', includedTotalWithTax: 'Ҷамъ бо', includedTaxTotal: 'Ҷамъи андоз',
  selectUpToTwoTaxModes: 'На бештар аз ду реҷаи андозро интихоб кардан мумкин аст',
  downloadProposal: 'Бор кардан', viewProposal: 'Дидан', shareProposal: 'Мубодила',
  chooseProposalFragments: 'Кадом қисмҳои КП истифода шаванд?',
  chooseProposalFragmentsHint: 'Бахшҳоеро, ки ба ин амал дохил мешаванд, интихоб кунед.',
  selectProposalFragments: 'Ҳадди ақал як қисми КП-ро интихоб кунед', proposalFragmentPositions: 'мавқеъ',
  addOwnProposalPosition: 'Илова кардани мавқеи худ', ownProposalPosition: 'Мавқеи худ',
  ownProposalPositionHint: 'Сатрро дастӣ ба бахши интихобшудаи пешниҳоди тиҷоратӣ илова кунед.',
  ownProposalPositionName: 'Номи кор, хизмат ё мавод', ownProposalPositionNamePlaceholder: 'Масалан: Насби новаи кабелӣ',
  saveProposalPosition: 'Илова кардани мавқеъ', proposalPositionAdded: 'Мавқеи худ илова шуд',
  deleteOwnProposalPosition: 'Нест кардани мавқеи худ', ownProposalPositionDeleted: 'Мавқеи худ нест шуд',
  laborCalculationTitle: 'Ҳисоби соатҳои меҳнатӣ', employeeDailyCost: 'Арзиши якрӯзаи корманд',
  workingHoursPerDay: 'Соатҳои корӣ дар як рӯз', hourlyEmployeeCost: 'Арзиши 1 соат', hoursUnit: 'с',
  laborCalculationFormula: 'Арзиши 1 соат = арзиши якрӯзаи корманд ÷ соатҳои корӣ. Ҷамъ = соатҳои кор × арзиши 1 соат.',
  workHours: 'Соатҳои кор', totalLaborCost: 'Арзиши умумӣ', totalManHours: 'Ҷамъи одам-соат',
  laborWorkName: 'Номи кор (аз «КП-и ман»)', laborWorksFromMyProposal: 'Корҳо аз «КП-и ман»',
  emptyLaborProposal: 'Корҳоро ба «КП-и ман» илова кунед ё дар ин бахш мавқеи худро созед.',
  proposalPartiesHeading: 'Тарафҳои пешниҳоди тиҷоратӣ', proposalSender: 'Фиристанда', proposalRecipient: 'Қабулкунанда', proposalOrganization: 'Ташкилот', proposalSectionNameLabel: 'Номи бахш',
  proposalSenderName: 'Ному насаби фиристанда', proposalSenderOrganization: 'Ташкилоти фиристанда', proposalSenderPhone: 'Телефони фиристанда',
  proposalRecipientName: 'Ному насаби қабулкунанда', proposalRecipientOrganization: 'Ташкилоти қабулкунанда',
  proposalGreeting: 'Салом.', proposalIntro: 'Барои таваҷҷуҳатон ташаккур мегӯем ва пешниҳод мекунем, ки пешниҳоди тиҷоратии моро баррасӣ намоед.',
  proposalClosing: 'Мо аз ҳамкорӣ шод хоҳем шуд ва омодаем шартҳо ва муҳлатҳоро баррасӣ кунем.', proposalRespectfully: 'Бо эҳтиром,',
  proposalFinalSummary: 'Ҷамъбасти пешниҳоди тиҷоратӣ', proposalSummaryPriceTotal: 'Нархи ҷамъбастӣ',
  proposalSummaryPriceWithTax: 'Нархи ҷамъбастӣ ({tax})', proposalSummaryTaxTotal: 'Ҷамъ ({tax})',
  proposalSummaryPositions: 'Шумораи мавқеъҳо дар КП', proposalTaxNotSelected: 'андоз интихоб нашудааст'
});

Object.assign(copy.RU, { proposalUnitShort: 'Ед. изм.', proposalQuantityShort: 'Кол-во' });
Object.assign(copy.EN, { proposalUnitShort: 'Unit', proposalQuantityShort: 'Qty' });
Object.assign(copy.KY, { proposalUnitShort: 'Өлч. бир.', proposalQuantityShort: 'Саны' });
Object.assign(copy.TJ, { proposalUnitShort: 'Воҳ. чен.', proposalQuantityShort: 'Миқдор' });

Object.assign(copy.RU, { proposalCustomTax: 'Свой налог', proposalCustomTaxApply: 'Применить свой налог', proposalCustomTaxName: 'Название налога', proposalCustomTaxRate: 'Ставка', proposalCustomTaxNamePlaceholder: 'Например: Региональный налог', proposalCustomTaxCombineHint: 'Можно применять одновременно с любыми выбранными налогами.' });
Object.assign(copy.EN, { proposalCustomTax: 'Custom tax', proposalCustomTaxApply: 'Apply custom tax', proposalCustomTaxName: 'Tax name', proposalCustomTaxRate: 'Rate', proposalCustomTaxNamePlaceholder: 'For example: Regional tax', proposalCustomTaxCombineHint: 'Can be applied together with any selected taxes.' });
Object.assign(copy.KY, { proposalCustomTax: 'Өз салыгыңыз', proposalCustomTaxApply: 'Өз салыгын колдонуу', proposalCustomTaxName: 'Салыктын аталышы', proposalCustomTaxRate: 'Чен', proposalCustomTaxNamePlaceholder: 'Мисалы: Аймактык салык', proposalCustomTaxCombineHint: 'Каалаган тандалган салыктар менен бирге колдонсо болот.' });
Object.assign(copy.TJ, { proposalCustomTax: 'Андози худ', proposalCustomTaxApply: 'Андози худро татбиқ кардан', proposalCustomTaxName: 'Номи андоз', proposalCustomTaxRate: 'Меъёр', proposalCustomTaxNamePlaceholder: 'Масалан: Андози минтақавӣ', proposalCustomTaxCombineHint: 'Метавонад ҳамзамон бо ҳар гуна андози интихобшуда истифода шавад.' });

Object.assign(copy.RU, {
  proposalToolsHint: 'Необходимый инструмент и расходники к нему, для производства работ, кол-во выставляется пользователем.',
  proposalLaborHoursHint: 'Загрузите позиции из нужных разделов и укажите время работы по каждой позиции. Ниже StructOS рассчитает общее количество часов, срок и стоимость проекта.',
  loadSpecification: 'Загрузить спецификацию', laborSourceDialogTitle: 'Загрузить спецификацию',
  laborSourceDialogHint: 'Выберите, из каких разделов загрузить позиции для расчёта времени работы.',
  loadSelectedPositions: 'Загрузить позиции', laborSourceSelectionRequired: 'Выберите хотя бы один раздел',
  laborSourcesSelected: 'Выбрано источников: {count}', laborSpecificationLoaded: 'Позиции для расчёта загружены',
  totalHoursShort: 'Итого часов', onePersonDuration: '1 человек', daysUnit: 'дн.', peopleUnit: 'чел.', staffRole: 'Должность',
  laborWorkersCost: 'Стоимость работ', workersCount: 'Количество людей', projectDuration: 'Срок выполнения',
  projectTeam: 'Управление проектом', foreman: 'Прораб', projectManager: 'Руководитель проекта',
  staffQuantity: 'Количество', dailyRate: 'Стоимость дня', staffTotalCost: 'Стоимость за проект',
  totalProjectCost: 'Стоимость всего проекта'
});
Object.assign(copy.EN, {
  proposalToolsHint: 'Required tools and related consumables for carrying out the works. Quantities are entered by the user.',
  proposalLaborHoursHint: 'Load lines from the required sections and enter the work time for each line. StructOS will calculate total hours, duration, and project cost below.',
  loadSpecification: 'Load specification', laborSourceDialogTitle: 'Load specification',
  laborSourceDialogHint: 'Choose the sections from which to load lines for work-time calculation.',
  loadSelectedPositions: 'Load lines', laborSourceSelectionRequired: 'Select at least one section',
  laborSourcesSelected: 'Sources selected: {count}', laborSpecificationLoaded: 'Calculation lines loaded',
  totalHoursShort: 'Total hours', onePersonDuration: '1 person', daysUnit: 'days', peopleUnit: 'people', staffRole: 'Role',
  laborWorkersCost: 'Work cost', workersCount: 'Number of people', projectDuration: 'Completion time',
  projectTeam: 'Project management', foreman: 'Foreman', projectManager: 'Project manager',
  staffQuantity: 'Quantity', dailyRate: 'Daily rate', staffTotalCost: 'Project cost',
  totalProjectCost: 'Total project cost'
});
Object.assign(copy.KY, {
  proposalToolsHint: 'Иштерди аткаруу үчүн керектүү аспаптар жана аларга сарпталуучу нерселер. Санды колдонуучу өзү көрсөтөт.',
  proposalLaborHoursHint: 'Керектүү бөлүмдөрдөн позицияларды жүктөп, ар бирине жумуш убактысын көрсөтүңүз. StructOS жалпы саатты, мөөнөттү жана долбоордун наркын эсептейт.',
  loadSpecification: 'Спецификацияны жүктөө', laborSourceDialogTitle: 'Спецификацияны жүктөө',
  laborSourceDialogHint: 'Жумуш убактысын эсептөө үчүн позициялар кайсы бөлүмдөрдөн жүктөлөрүн тандаңыз.',
  loadSelectedPositions: 'Позицияларды жүктөө', laborSourceSelectionRequired: 'Жок дегенде бир бөлүмдү тандаңыз',
  laborSourcesSelected: 'Тандалган булактар: {count}', laborSpecificationLoaded: 'Эсептөө позициялары жүктөлдү',
  totalHoursShort: 'Жалпы саат', onePersonDuration: '1 адам', daysUnit: 'күн', peopleUnit: 'адам', staffRole: 'Кызмат',
  laborWorkersCost: 'Иштин наркы', workersCount: 'Адамдардын саны', projectDuration: 'Аткаруу мөөнөтү',
  projectTeam: 'Долбоорду башкаруу', foreman: 'Прораб', projectManager: 'Долбоор жетекчиси',
  staffQuantity: 'Саны', dailyRate: 'Бир күндүк баа', staffTotalCost: 'Долбоор үчүн нарк',
  totalProjectCost: 'Долбоордун жалпы наркы'
});
Object.assign(copy.TJ, {
  proposalToolsHint: 'Асбобҳои зарурӣ ва масрафшавандаҳои онҳо барои иҷрои кор. Миқдорро корбар ворид мекунад.',
  proposalLaborHoursHint: 'Мавқеъҳоро аз бахшҳои лозим бор карда, вақти кори ҳар мавқеъро нишон диҳед. StructOS соатҳои умумӣ, муҳлат ва арзиши лоиҳаро ҳисоб мекунад.',
  loadSpecification: 'Бор кардани мушаххасот', laborSourceDialogTitle: 'Бор кардани мушаххасот',
  laborSourceDialogHint: 'Интихоб кунед, ки мавқеъҳо барои ҳисоби вақти кор аз кадом бахшҳо бор шаванд.',
  loadSelectedPositions: 'Бор кардани мавқеъҳо', laborSourceSelectionRequired: 'Ақаллан як бахшро интихоб кунед',
  laborSourcesSelected: 'Манбаъҳои интихобшуда: {count}', laborSpecificationLoaded: 'Мавқеъҳои ҳисоб бор шуданд',
  totalHoursShort: 'Ҷамъи соатҳо', onePersonDuration: '1 нафар', daysUnit: 'рӯз', peopleUnit: 'нафар', staffRole: 'Вазифа',
  laborWorkersCost: 'Арзиши кор', workersCount: 'Шумораи одамон', projectDuration: 'Муҳлати иҷро',
  projectTeam: 'Идоракунии лоиҳа', foreman: 'Прораб', projectManager: 'Роҳбари лоиҳа',
  staffQuantity: 'Миқдор', dailyRate: 'Арзиши як рӯз', staffTotalCost: 'Арзиши лоиҳа',
  totalProjectCost: 'Арзиши умумии лоиҳа'
});

Object.assign(copy.RU, {
  proposalProjectGroupHint: 'Это все позиции спецификации и пропущенные позиции из спецификации, которые есть в проекте.',
  proposalAdditionalWorksHint: 'Работы, не отобразившиеся в проекте и спецификации, но которые, возможно, потребуются.',
  proposalAssociatedWorksHint: 'Работы, возможные для монтажа. Укажите, каким видам работ сопутствует каждая позиция.',
  proposalSpecProjectColumn: 'Спец/проект', proposalSpecShort: 'Спец', proposalProjectShort: 'Проект',
  proposalAssociatedForColumn: 'Сопут. д/работ', proposalAssociatedForPlaceholder: 'Для каких работ'
});
Object.assign(copy.EN, {
  proposalProjectGroupHint: 'All specification lines and lines omitted from the specification but present in the project.',
  proposalAdditionalWorksHint: 'Works not shown in the project or specification that may still be required.',
  proposalAssociatedWorksHint: 'Works that may be required for installation. Specify which work each line accompanies.',
  proposalSpecProjectColumn: 'Spec/project', proposalSpecShort: 'Spec', proposalProjectShort: 'Project',
  proposalAssociatedForColumn: 'Associated with', proposalAssociatedForPlaceholder: 'Which works'
});
Object.assign(copy.KY, {
  proposalProjectGroupHint: 'Спецификациядагы бардык позициялар жана спецификацияда жок, бирок долбоордо бар позициялар.',
  proposalAdditionalWorksHint: 'Долбоордо жана спецификацияда көрсөтүлбөгөн, бирок талап кылынышы мүмкүн болгон иштер.',
  proposalAssociatedWorksHint: 'Монтаж үчүн мүмкүн болгон иштер. Ар бир позиция кайсы иштерге коштоочу экенин көрсөтүңүз.',
  proposalSpecProjectColumn: 'Спец/долбоор', proposalSpecShort: 'Спец', proposalProjectShort: 'Долбоор',
  proposalAssociatedForColumn: 'Коштоочу иш', proposalAssociatedForPlaceholder: 'Кайсы иштер үчүн'
});
Object.assign(copy.TJ, {
  proposalProjectGroupHint: 'Ҳамаи мавқеъҳои мушаххасот ва мавқеъҳое, ки дар мушаххасот нестанд, вале дар лоиҳа ҳастанд.',
  proposalAdditionalWorksHint: 'Корҳое, ки дар лоиҳа ва мушаххасот нишон дода нашудаанд, вале мумкин аст лозим шаванд.',
  proposalAssociatedWorksHint: 'Корҳои имконпазир барои монтаж. Нишон диҳед, ки ҳар мавқеъ ба кадом корҳо ҳамроҳ аст.',
  proposalSpecProjectColumn: 'Мушах./лоиҳа', proposalSpecShort: 'Мушах.', proposalProjectShort: 'Лоиҳа',
  proposalAssociatedForColumn: 'Кори ҳамроҳ', proposalAssociatedForPlaceholder: 'Барои кадом корҳо'
});

Object.assign(copy.RU, {
  excludedUnitPriceWithoutTax: 'Цена за ед.', excludedTotalWithoutTax: 'Итого цена',
  excludedUnitPriceWithTax: 'Цена за ед. с', excludedTotalWithTax: 'Итого цена с', excludedTaxTotal: 'Итого',
  proposalSpecificationEquipmentShort: 'Оборудование по спец-ии', proposalSpecificationMaterialsShort: 'Материал по спец-ии',
  proposalPossibleEquipmentShort: 'Возможное оборуд-ие', proposalPossibleMaterialsShort: 'Возможные материалы',
  proposalSpecificationWorksHint: 'Здесь находятся все работы, указанные в спецификации.',
  proposalProjectGroupHint: 'Здесь находятся все работы из спецификации, а также работы по проекту, пропущенные в спецификации.',
  proposalAssociatedWorksHint: 'Здесь находятся работы, сопутствующие монтажу материалов и оборудования по спецификации, а также работам из вкладок «Доп. работы» и «По проекту».',
  proposalMyWorksHint: 'Здесь находятся все работы, добавленные вами для формирования собственного КП.',
  proposalEquipmentHint: 'Здесь находится всё необходимое для выполнения работ оборудование.',
  proposalMaterialsHint: 'Здесь находятся все необходимые для выполнения работ материалы.',
  proposalPossibleEquipmentHint: 'Здесь находится оборудование, необходимое для выполнения работ и, возможно, пропущенное в проекте и спецификации.',
  proposalPossibleMaterialsHint: 'Здесь находятся материалы, необходимые для выполнения работ и, возможно, пропущенные в проекте и спецификации.',
  proposalToolsHint: 'Здесь находятся все инструменты, электроинструменты и расходники к ним, которые потребуются для работы. Количество вы указываете самостоятельно.',
  proposalConsumableMaterialsHint: 'Здесь находятся все возможные расходные материалы для монтажа оборудования и материалов по спецификации.',
  proposalLaborHoursHint: 'Здесь собраны все позиции спецификации и сохранённые позиции из «Моё КП». Если позиция добавлена вручную, StructOS не рассчитывает для неё часы — проставьте их самостоятельно.',
  laborWorksFromSpecification: 'Работы из спецификации', laborWorkName: 'Наименование работ'
});
Object.assign(copy.EN, {
  excludedUnitPriceWithoutTax: 'Unit price', excludedTotalWithoutTax: 'Total price',
  excludedUnitPriceWithTax: 'Unit price with', excludedTotalWithTax: 'Total price with', excludedTaxTotal: 'Total',
  proposalSpecificationEquipmentShort: 'Equipment by specification', proposalSpecificationMaterialsShort: 'Materials by specification',
  proposalPossibleEquipmentShort: 'Possible equipment', proposalPossibleMaterialsShort: 'Possible materials',
  proposalSpecificationWorksHint: 'This section contains all works listed in the specification.',
  proposalProjectGroupHint: 'This section contains all works from the specification and project works omitted from the specification.',
  proposalAssociatedWorksHint: 'This section contains works associated with installing specification materials and equipment, as well as works from “Additional works” and “By project”.',
  proposalMyWorksHint: 'This section contains all works you added to create your own commercial proposal.',
  proposalEquipmentHint: 'This section contains all equipment required to perform the works.',
  proposalMaterialsHint: 'This section contains all materials required to perform the works.',
  proposalPossibleEquipmentHint: 'This section contains equipment required for the works that may have been omitted from the project and specification.',
  proposalPossibleMaterialsHint: 'This section contains materials required for the works that may have been omitted from the project and specification.',
  proposalToolsHint: 'This section contains all tools, power tools, and their consumables required for the works. Enter the quantities yourself.',
  proposalConsumableMaterialsHint: 'This section contains all possible consumable materials for installing specification equipment and materials.',
  proposalLaborHoursHint: 'This section contains all specification lines and saved lines from “My proposal”. For a manually added line, StructOS does not calculate hours; enter them yourself.',
  laborWorksFromSpecification: 'Works from specification', laborWorkName: 'Work name'
});
Object.assign(copy.KY, {
  excludedUnitPriceWithoutTax: 'Бирдик баасы', excludedTotalWithoutTax: 'Жалпы баа',
  excludedUnitPriceWithTax: 'Салык менен бирдик баасы', excludedTotalWithTax: 'Салык менен жалпы баа', excludedTaxTotal: 'Жыйынтык',
  proposalSpecificationEquipmentShort: 'Спецификациядагы жабдуу', proposalSpecificationMaterialsShort: 'Спецификациядагы материал',
  proposalPossibleEquipmentShort: 'Мүмкүн болгон жабдуу', proposalPossibleMaterialsShort: 'Мүмкүн болгон материалдар',
  proposalSpecificationWorksHint: 'Бул жерде спецификацияда көрсөтүлгөн бардык иштер жайгашкан.',
  proposalProjectGroupHint: 'Бул жерде спецификациядагы бардык иштер жана спецификацияда өткөрүлүп кеткен долбоордук иштер жайгашкан.',
  proposalAssociatedWorksHint: 'Бул жерде спецификациядагы материалдарды жана жабдууларды монтаждоого, ошондой эле «Кошумча иштер» жана «Долбоор боюнча» бөлүмдөрүндөгү иштерге коштоочу иштер жайгашкан.',
  proposalMyWorksHint: 'Бул жерде өзүңүздүн КПңызды түзүү үчүн сиз кошкон бардык иштер жайгашкан.',
  proposalEquipmentHint: 'Бул жерде иштерди аткарууга керектүү бардык жабдуулар жайгашкан.',
  proposalMaterialsHint: 'Бул жерде иштерди аткарууга керектүү бардык материалдар жайгашкан.',
  proposalPossibleEquipmentHint: 'Бул жерде иштерге керектүү жана долбоордо же спецификацияда өткөрүлүп кетиши мүмкүн болгон жабдуулар жайгашкан.',
  proposalPossibleMaterialsHint: 'Бул жерде иштерге керектүү жана долбоордо же спецификацияда өткөрүлүп кетиши мүмкүн болгон материалдар жайгашкан.',
  proposalToolsHint: 'Бул жерде иштерге керектүү бардык аспаптар, электр аспаптары жана алардын сарпталуучу бөлүктөрү жайгашкан. Санды өзүңүз көрсөтөсүз.',
  proposalConsumableMaterialsHint: 'Бул жерде спецификациядагы жабдууларды жана материалдарды монтаждоого керектүү бардык мүмкүн болгон сарпталуучу материалдар жайгашкан.',
  proposalLaborHoursHint: 'Бул жерде спецификациядагы бардык позициялар жана «Менин КПдан» сакталган позициялар чогултулган. Кол менен кошулган позициянын саатын StructOS эсептебейт — саатты өзүңүз киргизиңиз.',
  laborWorksFromSpecification: 'Спецификациядагы иштер', laborWorkName: 'Иштин аталышы'
});
Object.assign(copy.TJ, {
  excludedUnitPriceWithoutTax: 'Нархи воҳид', excludedTotalWithoutTax: 'Нархи умумӣ',
  excludedUnitPriceWithTax: 'Нархи воҳид бо', excludedTotalWithTax: 'Нархи умумӣ бо', excludedTaxTotal: 'Ҷамъ',
  proposalSpecificationEquipmentShort: 'Таҷҳизот аз рӯи мушаххасот', proposalSpecificationMaterialsShort: 'Мавод аз рӯи мушаххасот',
  proposalPossibleEquipmentShort: 'Таҷҳизоти имконпазир', proposalPossibleMaterialsShort: 'Маводи имконпазир',
  proposalSpecificationWorksHint: 'Дар ин ҷо ҳамаи корҳои дар мушаххасот зикршуда ҷойгиранд.',
  proposalProjectGroupHint: 'Дар ин ҷо ҳамаи корҳои мушаххасот ва корҳои лоиҳа, ки дар мушаххасот гузаронда шудаанд, ҷойгиранд.',
  proposalAssociatedWorksHint: 'Дар ин ҷо корҳои ҳамроҳи монтажи мавод ва таҷҳизоти мушаххасот, инчунин корҳои бахшҳои «Корҳои иловагӣ» ва «Аз рӯи лоиҳа» ҷойгиранд.',
  proposalMyWorksHint: 'Дар ин ҷо ҳамаи корҳое, ки шумо барои сохтани КП-и худ илова кардаед, ҷойгиранд.',
  proposalEquipmentHint: 'Дар ин ҷо тамоми таҷҳизоти барои иҷрои кор зарур ҷойгир аст.',
  proposalMaterialsHint: 'Дар ин ҷо ҳамаи маводи барои иҷрои кор зарур ҷойгиранд.',
  proposalPossibleEquipmentHint: 'Дар ин ҷо таҷҳизоти барои кор зарур ва эҳтимол дар лоиҳа ё мушаххасот гузаронда ҷойгир аст.',
  proposalPossibleMaterialsHint: 'Дар ин ҷо маводи барои кор зарур ва эҳтимол дар лоиҳа ё мушаххасот гузаронда ҷойгиранд.',
  proposalToolsHint: 'Дар ин ҷо ҳамаи асбобҳо, асбобҳои барқӣ ва масрафшавандаҳои онҳо барои кор ҷойгиранд. Миқдорро худатон нишон медиҳед.',
  proposalConsumableMaterialsHint: 'Дар ин ҷо ҳамаи маводи масрафшавандаи эҳтимолӣ барои монтажи таҷҳизот ва маводи мушаххасот ҷойгиранд.',
  proposalLaborHoursHint: 'Дар ин ҷо ҳамаи мавқеъҳои мушаххасот ва мавқеъҳои нигоҳдошташуда аз «КП-и ман» ҷамъ шудаанд. Барои мавқеи дастӣ StructOS соатҳоро ҳисоб намекунад — онҳоро худатон ворид кунед.',
  laborWorksFromSpecification: 'Корҳо аз мушаххасот', laborWorkName: 'Номи кор'
});

Object.assign(copy.RU, { detailedProjectAnalysis: 'Детально разобрать проект', contractsUnderReview: 'Договоры на рассмотрении', detailedContractAnalysis: 'Детально разобрать договор', estimateAnalysis: 'Анализ сметы', createProposalByProject: 'Создать КП по проекту', createProposalByEstimate: 'Создать КП по смете', turnkeyObject: 'Запустить объект в один клик', projectMailings: 'Рассылки предложений', mailWorkOffers: 'Рассылка предложений на работу (В разработке)', mailContractOffers: 'Рассылка предложений взять подряд (В разработке)', mailSupplyOffers: 'Рассылка предложений на поставку (В разработке)', projectMenuPrepared: 'Кнопка «{name}» подготовлена. Наполним этот раздел следующим этапом.' });
Object.assign(copy.EN, { detailedProjectAnalysis: 'Detailed project analysis', contractsUnderReview: 'Contracts under review', detailedContractAnalysis: 'Analyze contract in detail', estimateAnalysis: 'Estimate analysis', createProposalByProject: 'Create proposal from project', createProposalByEstimate: 'Create proposal from estimate', turnkeyObject: 'Launch an object in one click', projectMailings: 'Offer mailings', mailWorkOffers: 'Send job offers (In development)', mailContractOffers: 'Send contract offers (In development)', mailSupplyOffers: 'Send supply offers (In development)', projectMenuPrepared: 'The “{name}” button is ready. We will build out this section next.' });
Object.assign(copy.KY, { detailedProjectAnalysis: 'Долбоорду толук талдоо', contractsUnderReview: 'Каралуудагы келишимдер', detailedContractAnalysis: 'Келишимди толук талдоо', estimateAnalysis: 'Сметаны талдоо', createProposalByProject: 'Долбоор боюнча КП түзүү', createProposalByEstimate: 'Смета боюнча КП түзүү', turnkeyObject: 'Объектти бир чыкылдатуу менен ишке киргизүү', projectMailings: 'Сунуштарды жөнөтүү', mailWorkOffers: 'Жумуш сунуштарын жөнөтүү (Иштелип жатат)', mailContractOffers: 'Подряд алуу сунуштарын жөнөтүү (Иштелип жатат)', mailSupplyOffers: 'Жеткирүү сунуштарын жөнөтүү (Иштелип жатат)', projectMenuPrepared: '«{name}» баскычы даяр. Бул бөлүмдү кийинки этапта толтурабыз.' });
Object.assign(copy.TJ, { detailedProjectAnalysis: 'Таҳлили муфассали лоиҳа', contractsUnderReview: 'Шартномаҳо дар баррасӣ', detailedContractAnalysis: 'Таҳлили муфассали шартнома', estimateAnalysis: 'Таҳлили смета', createProposalByProject: 'Сохтани пешниҳод аз рӯи лоиҳа', createProposalByEstimate: 'Сохтани пешниҳод аз рӯи смета', turnkeyObject: 'Оғози объект бо як клик', projectMailings: 'Фиристодани пешниҳодҳо', mailWorkOffers: 'Фиристодани пешниҳодҳои корӣ (Дар таҳия)', mailContractOffers: 'Фиристодани пешниҳодҳои пудратӣ (Дар таҳия)', mailSupplyOffers: 'Фиристодани пешниҳодҳои таъминот (Дар таҳия)', projectMenuPrepared: 'Тугмаи «{name}» омода аст. Ин бахшро дар марҳилаи навбатӣ пур мекунем.' });

Object.assign(copy.RU, { pushNotificationsTitle: 'Уведомления на телефоне', pushNotificationsHint: 'Получайте важные события StructOS, даже когда веб-приложение закрыто.', pushEnabled: 'Push-уведомления подключены', pushLocalOnly: 'Уведомления разрешены на этом устройстве', pushDisabled: 'Push-уведомления не подключены', pushDenied: 'Уведомления заблокированы в настройках телефона', pushInstallRequired: 'Добавьте StructOS на экран «Домой»', pushUnsupported: 'Этот браузер не поддерживает push-уведомления', enablePush: 'Включить уведомления', disablePush: 'Отключить', testPush: 'Проверить уведомление', pushEnabledToast: 'Уведомления StructOS подключены', pushDisabledToast: 'Уведомления отключены на этом устройстве', pushTestSent: 'Проверочное уведомление отправлено', pushInstallHint: 'На iPhone нажмите «Поделиться» → «На экран Домой», откройте StructOS с нового значка и включите уведомления.', pushDeniedHint: 'Разрешите уведомления для StructOS в настройках телефона.', pushAccountHint: 'Для серверных уведомлений войдите в личный аккаунт StructOS. Локальная проверка уже доступна.', pushError: 'Не удалось подключить уведомления. Попробуйте ещё раз.', pushTestTitle: 'StructOS на связи', pushTestBody: 'Уведомления работают. Важные события по объектам появятся здесь.' });
Object.assign(copy.EN, { pushNotificationsTitle: 'Phone notifications', pushNotificationsHint: 'Receive important StructOS events even when the web app is closed.', pushEnabled: 'Push notifications are connected', pushLocalOnly: 'Notifications are allowed on this device', pushDisabled: 'Push notifications are not connected', pushDenied: 'Notifications are blocked in the phone settings', pushInstallRequired: 'Add StructOS to your Home Screen', pushUnsupported: 'This browser does not support push notifications', enablePush: 'Enable notifications', disablePush: 'Disable', testPush: 'Test notification', pushEnabledToast: 'StructOS notifications are connected', pushDisabledToast: 'Notifications are disabled on this device', pushTestSent: 'Test notification sent', pushInstallHint: 'On iPhone, tap Share → Add to Home Screen, open StructOS from its new icon, then enable notifications.', pushDeniedHint: 'Allow notifications for StructOS in your phone settings.', pushAccountHint: 'Sign in to your StructOS account for server notifications. Local testing is already available.', pushError: 'Notifications could not be connected. Try again.', pushTestTitle: 'StructOS is connected', pushTestBody: 'Notifications work. Important project events will appear here.' });
Object.assign(copy.KY, { pushNotificationsTitle: 'Телефондогу билдирүүлөр', pushNotificationsHint: 'Веб-тиркеме жабык болгондо да StructOS окуяларын алыңыз.', pushEnabled: 'Push-билдирүүлөр туташты', pushLocalOnly: 'Бул түзмөктө билдирүүлөргө уруксат берилди', pushDisabled: 'Push-билдирүүлөр туташкан жок', pushDenied: 'Билдирүүлөр телефондун жөндөөлөрүндө бөгөттөлгөн', pushInstallRequired: 'StructOSту башкы экранга кошуңуз', pushUnsupported: 'Бул браузер push-билдирүүлөрдү колдобойт', enablePush: 'Билдирүүлөрдү күйгүзүү', disablePush: 'Өчүрүү', testPush: 'Билдирүүнү текшерүү', pushEnabledToast: 'StructOS билдирүүлөрү туташты', pushDisabledToast: 'Бул түзмөктө билдирүүлөр өчүрүлдү', pushTestSent: 'Текшерүү билдирүүсү жөнөтүлдү', pushInstallHint: 'iPhoneдо «Бөлүшүү» → «Башкы экранга» басып, StructOSту жаңы белгиден ачыңыз.', pushDeniedHint: 'Телефондун жөндөөлөрүндө StructOS билдирүүлөрүнө уруксат бериңиз.', pushAccountHint: 'Сервердик билдирүүлөр үчүн StructOS аккаунтуңузга кириңиз.', pushError: 'Билдирүүлөрдү туташтыруу мүмкүн болгон жок.', pushTestTitle: 'StructOS байланышта', pushTestBody: 'Билдирүүлөр иштейт. Маанилүү объект окуялары ушул жерде чыгат.' });
Object.assign(copy.TJ, { pushNotificationsTitle: 'Огоҳиҳо дар телефон', pushNotificationsHint: 'Ҳатто ҳангоми пӯшида будани веб-барнома рӯйдодҳои StructOS-ро гиред.', pushEnabled: 'Push-огоҳиҳо пайваст шуданд', pushLocalOnly: 'Огоҳиҳо дар ин дастгоҳ иҷозат дода шудаанд', pushDisabled: 'Push-огоҳиҳо пайваст нестанд', pushDenied: 'Огоҳиҳо дар танзимоти телефон баста шудаанд', pushInstallRequired: 'StructOS-ро ба экрани асосӣ илова кунед', pushUnsupported: 'Ин браузер push-огоҳиҳоро дастгирӣ намекунад', enablePush: 'Фаъол кардани огоҳиҳо', disablePush: 'Хомӯш кардан', testPush: 'Санҷидани огоҳӣ', pushEnabledToast: 'Огоҳиҳои StructOS пайваст шуданд', pushDisabledToast: 'Огоҳиҳо дар ин дастгоҳ хомӯш шуданд', pushTestSent: 'Огоҳии санҷишӣ фиристода шуд', pushInstallHint: 'Дар iPhone «Мубодила» → «Ба экрани асосӣ»-ро пахш карда, StructOS-ро аз нишонаи нав кушоед.', pushDeniedHint: 'Дар танзимоти телефон огоҳиҳои StructOS-ро иҷозат диҳед.', pushAccountHint: 'Барои огоҳиҳои серверӣ ба ҳисоби StructOS ворид шавед.', pushError: 'Огоҳиҳо пайваст нашуданд. Боз кӯшиш кунед.', pushTestTitle: 'StructOS дар алоқа', pushTestBody: 'Огоҳиҳо кор мекунанд. Рӯйдодҳои муҳими объектҳо дар ин ҷо пайдо мешаванд.' });

Object.assign(copy.RU, {
  editContractAmount: 'Изменить общую стоимость договора', contractAmountSaved: 'Общая стоимость договора изменена',
  sectionSourceDocuments: 'Проект, договор и смета', sectionSourceDocumentsHint: 'Исходные файлы сохраняются без редактора. Их можно открыть или добавить новой версией.',
  sectionAttachmentSaved: 'Файл добавлен в раздел', sectionAttachmentOpenFailed: 'Не удалось открыть файл. Добавьте его заново.', sectionAttachmentSaveFailed: 'Не удалось сохранить файл на устройстве'
});
Object.assign(copy.EN, {
  editContractAmount: 'Change total contract value', contractAmountSaved: 'Total contract value updated',
  sectionSourceDocuments: 'Project, contract, and estimate', sectionSourceDocumentsHint: 'Source files are stored without an editor. You can open them or add a new version.',
  sectionAttachmentSaved: 'File added to the section', sectionAttachmentOpenFailed: 'The file could not be opened. Please add it again.', sectionAttachmentSaveFailed: 'The file could not be saved on this device'
});
Object.assign(copy.KY, {
  editContractAmount: 'Келишимдин жалпы суммасын өзгөртүү', contractAmountSaved: 'Келишимдин жалпы суммасы өзгөртүлдү',
  sectionSourceDocuments: 'Долбоор, келишим жана смета', sectionSourceDocumentsHint: 'Баштапкы файлдар редакторсуз сакталат. Аларды ачууга же жаңы версиясын кошууга болот.',
  sectionAttachmentSaved: 'Файл бөлүмгө кошулду', sectionAttachmentOpenFailed: 'Файлды ачуу мүмкүн болгон жок. Аны кайра кошуңуз.', sectionAttachmentSaveFailed: 'Файлды түзмөктө сактоо мүмкүн болгон жок'
});
Object.assign(copy.TJ, {
  editContractAmount: 'Тағйири арзиши умумии шартнома', contractAmountSaved: 'Арзиши умумии шартнома тағйир ёфт',
  sectionSourceDocuments: 'Лоиҳа, шартнома ва смета', sectionSourceDocumentsHint: 'Файлҳои аслӣ бе муҳаррир нигоҳ дошта мешаванд. Онҳоро кушодан ё версияи нав илова кардан мумкин аст.',
  sectionAttachmentSaved: 'Файл ба бахш илова шуд', sectionAttachmentOpenFailed: 'Файл кушода нашуд. Онро аз нав илова кунед.', sectionAttachmentSaveFailed: 'Файл дар дастгоҳ нигоҳ дошта нашуд'
});

Object.assign(copy.RU, {
  workStatement: 'Ведомость объемов работ', organizationDocuments: 'Документы организаций', organizationDocumentsHint: 'Карточки Исполнителя и Заказчика автоматически заполняют ведомости и акты всех разделов объекта.',
  contractor: 'Исполнитель', customer: 'Заказчик', partyType: 'Тип карточки', legalEntity: 'Организация', individual: 'Физическое лицо', companyName: 'Компания', inn: 'ИНН', kpp: 'КПП', passportSeriesNumber: 'Серия и номер паспорта',
  uploadOrganizationCard: 'Загрузить карточку или паспорт', organizationCardSaved: 'Карточка организации сохранена', organizationFileSaved: 'Документ организации сохранён', organizationFileOpenFailed: 'Не удалось открыть документ организации', manualDetails: 'Заполнить вручную', uploadedDocuments: 'Загруженные документы', noOrganizationFile: 'Файл ещё не загружен',
  preparedBy: 'Составил', performedBy: 'Выполнил', acceptedBy: 'Принял', confirmedBy: 'Подтвердил', seal: 'Печать', justification: 'Обоснование', documentDate: 'Дата документа', changeSavedAt: 'Изменения внесены',
  expandOrganizationDocuments: 'Развернуть документы организаций', collapseOrganizationDocuments: 'Свернуть документы организаций', documentObject: 'Объект', documentSection: 'Раздел', objectPlaceholderDocument: 'Введите наименование объекта', sectionPlaceholderDocument: 'Введите наименование раздела',
  generateAct: 'Сформировать акт', generateStatement: 'Сформировать ведомость', documentRequiredFields: 'Заполните название документа, объект и раздел', documentParties: 'Стороны документа', editDocument: 'Редактировать', deleteDocument: 'Удалить', deleteDocumentConfirm: 'Удалить этот документ из истории?', documentDeleted: 'Документ удалён из истории'
});
Object.assign(copy.EN, {
  workStatement: 'Statement of work quantities', organizationDocuments: 'Organization documents', organizationDocumentsHint: 'Contractor and Customer cards automatically fill statements and acts for every section of the object.',
  contractor: 'Contractor', customer: 'Customer', partyType: 'Card type', legalEntity: 'Organization', individual: 'Individual', companyName: 'Company', inn: 'Tax ID', kpp: 'Registration code', passportSeriesNumber: 'Passport series and number',
  uploadOrganizationCard: 'Upload organization card or passport', organizationCardSaved: 'Organization card saved', organizationFileSaved: 'Organization document saved', organizationFileOpenFailed: 'Organization document could not be opened', manualDetails: 'Enter manually', uploadedDocuments: 'Uploaded documents', noOrganizationFile: 'No file uploaded yet',
  preparedBy: 'Prepared by', performedBy: 'Performed by', acceptedBy: 'Accepted by', confirmedBy: 'Confirmed by', seal: 'Seal', justification: 'Justification', documentDate: 'Document date', changeSavedAt: 'Changes saved',
  expandOrganizationDocuments: 'Expand organization documents', collapseOrganizationDocuments: 'Collapse organization documents', documentObject: 'Object', documentSection: 'Section', objectPlaceholderDocument: 'Enter object name', sectionPlaceholderDocument: 'Enter section name',
  generateAct: 'Create act', generateStatement: 'Create statement', documentRequiredFields: 'Enter the document name, object, and section', documentParties: 'Document parties', editDocument: 'Edit', deleteDocument: 'Delete', deleteDocumentConfirm: 'Delete this document from history?', documentDeleted: 'Document deleted from history'
});
Object.assign(copy.KY, {
  workStatement: 'Иш көлөмдөрүнүн ведомосту', organizationDocuments: 'Уюмдардын документтери', organizationDocumentsHint: 'Аткаруучунун жана Заказчынын карточкалары объекттин бардык бөлүмдөрүндөгү ведомость менен актыларды автоматтык толтурат.',
  contractor: 'Аткаруучу', customer: 'Заказчы', partyType: 'Карточканын түрү', legalEntity: 'Уюм', individual: 'Жеке жак', companyName: 'Компания', inn: 'ИНН', kpp: 'КПП', passportSeriesNumber: 'Паспорттун сериясы жана номери',
  uploadOrganizationCard: 'Карточканы же паспортту жүктөө', organizationCardSaved: 'Уюмдун карточкасы сакталды', organizationFileSaved: 'Уюмдун документи сакталды', organizationFileOpenFailed: 'Уюмдун документи ачылган жок', manualDetails: 'Кол менен толтуруу', uploadedDocuments: 'Жүктөлгөн документтер', noOrganizationFile: 'Файл али жүктөлө элек',
  preparedBy: 'Түзгөн', performedBy: 'Аткарган', acceptedBy: 'Кабыл алган', confirmedBy: 'Ырастаган', seal: 'Мөөр', justification: 'Негиздеме', documentDate: 'Документтин күнү', changeSavedAt: 'Өзгөртүү киргизилди',
  expandOrganizationDocuments: 'Уюмдардын документтерин ачуу', collapseOrganizationDocuments: 'Уюмдардын документтерин жыйноо', documentObject: 'Объект', documentSection: 'Бөлүм', objectPlaceholderDocument: 'Объекттин аталышын жазыңыз', sectionPlaceholderDocument: 'Бөлүмдүн аталышын жазыңыз',
  generateAct: 'Акт түзүү', generateStatement: 'Ведомость түзүү', documentRequiredFields: 'Документтин аталышын, объектти жана бөлүмдү толтуруңуз', documentParties: 'Документтин тараптары', editDocument: 'Өзгөртүү', deleteDocument: 'Өчүрүү', deleteDocumentConfirm: 'Бул документ тарыхтан өчүрүлсүнбү?', documentDeleted: 'Документ тарыхтан өчүрүлдү'
});
Object.assign(copy.TJ, {
  workStatement: 'Ведомости ҳаҷми корҳо', organizationDocuments: 'Ҳуҷҷатҳои ташкилотҳо', organizationDocumentsHint: 'Карточкаҳои Иҷрокунанда ва Фармоишгар ведомост ва санадҳои ҳамаи бахшҳои объектро худкор пур мекунанд.',
  contractor: 'Иҷрокунанда', customer: 'Фармоишгар', partyType: 'Навъи карточка', legalEntity: 'Ташкилот', individual: 'Шахси воқеӣ', companyName: 'Ширкат', inn: 'ИНН', kpp: 'КПП', passportSeriesNumber: 'Серия ва рақами шиноснома',
  uploadOrganizationCard: 'Карточка ё шиносномаро бор кунед', organizationCardSaved: 'Карточкаи ташкилот нигоҳ дошта шуд', organizationFileSaved: 'Ҳуҷҷати ташкилот нигоҳ дошта шуд', organizationFileOpenFailed: 'Ҳуҷҷати ташкилот кушода нашуд', manualDetails: 'Дастӣ пур кардан', uploadedDocuments: 'Ҳуҷҷатҳои боршуда', noOrganizationFile: 'Файл ҳанӯз бор нашудааст',
  preparedBy: 'Тартиб дод', performedBy: 'Иҷро кард', acceptedBy: 'Қабул кард', confirmedBy: 'Тасдиқ кард', seal: 'Мӯҳр', justification: 'Асосноккунӣ', documentDate: 'Санаи ҳуҷҷат', changeSavedAt: 'Тағйирот ворид шуд',
  expandOrganizationDocuments: 'Кушодани ҳуҷҷатҳои ташкилотҳо', collapseOrganizationDocuments: 'Пӯшидани ҳуҷҷатҳои ташкилотҳо', documentObject: 'Объект', documentSection: 'Бахш', objectPlaceholderDocument: 'Номи объектро ворид кунед', sectionPlaceholderDocument: 'Номи бахшро ворид кунед',
  generateAct: 'Ташкили санад', generateStatement: 'Ташкили ведомост', documentRequiredFields: 'Номи ҳуҷҷат, объект ва бахшро пур кунед', documentParties: 'Тарафҳои ҳуҷҷат', editDocument: 'Таҳрир', deleteDocument: 'Нест кардан', deleteDocumentConfirm: 'Ин ҳуҷҷат аз таърих нест карда шавад?', documentDeleted: 'Ҳуҷҷат аз таърих нест шуд'
});

Object.assign(copy.RU, {
  companyName: 'Наименование', manualDetails: 'Реквизиты для ручного ввода',
  organizationCardSaved: 'Реквизиты сохранены', organizationFileSaved: 'Документ сохранён',
  uploadOrganizationCard: 'Загрузить карточку организации', uploadPassport: 'Загрузить паспорт',
  replaceOrganizationCard: 'Заменить карточку организации', replacePassport: 'Заменить паспорт',
  organizationCardFile: 'Карточка организации', passportFile: 'Паспорт',
  noOrganizationFile: 'Карточка организации не загружена', noPassportFile: 'Паспорт не загружен',
  passportSeries: 'Серия', passportNumber: 'Номер', saveOrganizationDetails: 'Сохранить реквизиты',
  previewUploadedDocument: 'Просмотреть документ', removeUploadedDocument: 'Удалить документ',
  deleteOrganizationFileTitle: 'Удалить загруженный документ?', deleteOrganizationFileHint: 'Файл будет удалён из карточки. Введённые вручную реквизиты сохранятся.',
  organizationFileDeleted: 'Документ удалён из карточки', organizationFileDeleteFailed: 'Не удалось удалить документ',
  organizationPreviewTitle: 'Просмотр документа', organizationPreviewHint: 'Проверьте документ, скачайте его или отправьте прямо из просмотра.',
  previewUnavailable: 'Этот формат нельзя показать внутри приложения, но файл можно скачать или отправить.',
  downloadDocument: 'Скачать', sendDocument: 'Отправить', shareFileFallback: 'Отправка файлов недоступна — документ скачан',
  changePartyTypeTitle: 'Изменить тип карточки?', changePartyTypeHint: 'Загруженный документ относится к текущему типу и будет удалён. Ручные реквизиты сохранятся.', changePartyType: 'Изменить тип'
});
Object.assign(copy.EN, {
  companyName: 'Name', manualDetails: 'Details for manual entry',
  organizationCardSaved: 'Details saved', organizationFileSaved: 'Document saved',
  uploadOrganizationCard: 'Upload organization card', uploadPassport: 'Upload passport',
  replaceOrganizationCard: 'Replace organization card', replacePassport: 'Replace passport',
  organizationCardFile: 'Organization card', passportFile: 'Passport',
  noOrganizationFile: 'Organization card not uploaded', noPassportFile: 'Passport not uploaded',
  passportSeries: 'Series', passportNumber: 'Number', saveOrganizationDetails: 'Save details',
  previewUploadedDocument: 'Preview document', removeUploadedDocument: 'Delete document',
  deleteOrganizationFileTitle: 'Delete the uploaded document?', deleteOrganizationFileHint: 'The file will be removed from the card. Manually entered details will remain.',
  organizationFileDeleted: 'Document removed from the card', organizationFileDeleteFailed: 'Could not delete the document',
  organizationPreviewTitle: 'Document preview', organizationPreviewHint: 'Review, download, or share the document directly from this preview.',
  previewUnavailable: 'This format cannot be displayed in the app, but you can download or share the file.',
  downloadDocument: 'Download', sendDocument: 'Share', shareFileFallback: 'File sharing is unavailable — the document was downloaded',
  changePartyTypeTitle: 'Change card type?', changePartyTypeHint: 'The uploaded document belongs to the current type and will be deleted. Manual details will remain.', changePartyType: 'Change type'
});
Object.assign(copy.KY, {
  companyName: 'Аталышы', manualDetails: 'Кол менен киргизүү үчүн реквизиттер',
  organizationCardSaved: 'Реквизиттер сакталды', organizationFileSaved: 'Документ сакталды',
  uploadOrganizationCard: 'Уюмдун карточкасын жүктөө', uploadPassport: 'Паспортту жүктөө',
  replaceOrganizationCard: 'Уюмдун карточкасын алмаштыруу', replacePassport: 'Паспортту алмаштыруу',
  organizationCardFile: 'Уюмдун карточкасы', passportFile: 'Паспорт',
  noOrganizationFile: 'Уюмдун карточкасы жүктөлгөн жок', noPassportFile: 'Паспорт жүктөлгөн жок',
  passportSeries: 'Сериясы', passportNumber: 'Номери', saveOrganizationDetails: 'Реквизиттерди сактоо',
  previewUploadedDocument: 'Документти көрүү', removeUploadedDocument: 'Документти өчүрүү',
  deleteOrganizationFileTitle: 'Жүктөлгөн документ өчүрүлсүнбү?', deleteOrganizationFileHint: 'Файл карточкадан өчүрүлөт. Кол менен киргизилген реквизиттер сакталат.',
  organizationFileDeleted: 'Документ карточкадан өчүрүлдү', organizationFileDeleteFailed: 'Документти өчүрүү мүмкүн болгон жок',
  organizationPreviewTitle: 'Документти көрүү', organizationPreviewHint: 'Документти текшерип, жүктөп алыңыз же ушул жерден жөнөтүңүз.',
  previewUnavailable: 'Бул формат колдонмонун ичинде көрсөтүлбөйт, бирок файлды жүктөп же жөнөтсө болот.',
  downloadDocument: 'Жүктөп алуу', sendDocument: 'Жөнөтүү', shareFileFallback: 'Файл жөнөтүү жеткиликтүү эмес — документ жүктөлдү',
  changePartyTypeTitle: 'Карточканын түрү өзгөртүлсүнбү?', changePartyTypeHint: 'Жүктөлгөн документ учурдагы түргө тиешелүү жана өчүрүлөт. Кол менен киргизилген реквизиттер сакталат.', changePartyType: 'Түрүн өзгөртүү'
});
Object.assign(copy.TJ, {
  companyName: 'Ном', manualDetails: 'Реквизитҳо барои воридкунии дастӣ',
  organizationCardSaved: 'Реквизитҳо нигоҳ дошта шуданд', organizationFileSaved: 'Ҳуҷҷат нигоҳ дошта шуд',
  uploadOrganizationCard: 'Бор кардани карточкаи ташкилот', uploadPassport: 'Бор кардани шиноснома',
  replaceOrganizationCard: 'Иваз кардани карточкаи ташкилот', replacePassport: 'Иваз кардани шиноснома',
  organizationCardFile: 'Карточкаи ташкилот', passportFile: 'Шиноснома',
  noOrganizationFile: 'Карточкаи ташкилот бор нашудааст', noPassportFile: 'Шиноснома бор нашудааст',
  passportSeries: 'Серия', passportNumber: 'Рақам', saveOrganizationDetails: 'Нигоҳ доштани реквизитҳо',
  previewUploadedDocument: 'Дидани ҳуҷҷат', removeUploadedDocument: 'Нест кардани ҳуҷҷат',
  deleteOrganizationFileTitle: 'Ҳуҷҷати боршуда нест карда шавад?', deleteOrganizationFileHint: 'Файл аз карточка нест мешавад. Реквизитҳои дастӣ нигоҳ дошта мешаванд.',
  organizationFileDeleted: 'Ҳуҷҷат аз карточка нест шуд', organizationFileDeleteFailed: 'Ҳуҷҷатро нест кардан муяссар нашуд',
  organizationPreviewTitle: 'Намоиши ҳуҷҷат', organizationPreviewHint: 'Ҳуҷҷатро санҷед, бор кунед ё аз ҳамин ҷо фиристед.',
  previewUnavailable: 'Ин формат дар дохили барнома намоиш дода намешавад, вале файлро бор ё фиристодан мумкин аст.',
  downloadDocument: 'Бор кардан', sendDocument: 'Фиристодан', shareFileFallback: 'Фиристодани файл дастрас нест — ҳуҷҷат бор карда шуд',
  changePartyTypeTitle: 'Навъи карточка тағйир дода шавад?', changePartyTypeHint: 'Ҳуҷҷати боршуда ба навъи ҷорӣ тааллуқ дорад ва нест мешавад. Реквизитҳои дастӣ нигоҳ дошта мешаванд.', changePartyType: 'Тағйири навъ'
});

Object.assign(copy.RU, { profileActivity: 'Активность', profileActivityHint: 'Активность в StructOS усиливает ваш профиль и повышает позицию в выдаче.' });
Object.assign(copy.EN, { profileActivity: 'Activity', profileActivityHint: 'Activity in StructOS strengthens your profile and improves its position in search results.' });
Object.assign(copy.KY, { profileActivity: 'Активдүүлүк', profileActivityHint: 'StructOS ичиндеги активдүүлүк профилиңизди күчөтүп, издөө жыйынтыгындагы ордуңузду жогорулатат.' });
Object.assign(copy.TJ, { profileActivity: 'Фаъолият', profileActivityHint: 'Фаъолият дар StructOS профили шуморо қавӣ карда, мавқеи онро дар натиҷаҳои ҷустуҷӯ баланд мебардорад.' });

Object.assign(copy.RU, { statistics: 'Статистика', online: 'online', registeredUsers: 'Зарегистрировано пользователей', referralContribution: 'Ваш вклад по ссылке', personalReferralLink: 'Личная реферальная ссылка', referralRecommendationReward: '+150 рублей за рекомендацию', shareEarn: 'StructOS — +150 рублей за рекомендацию', referralReward: 'Рекомендация по вашей ссылке' });
Object.assign(copy.EN, { statistics: 'Statistics', online: 'online', registeredUsers: 'Registered users', referralContribution: 'Your referral contribution', personalReferralLink: 'Personal referral link', referralRecommendationReward: '₽150 per recommendation', shareEarn: 'StructOS — ₽150 per recommendation', referralReward: 'Recommendation through your link' });
Object.assign(copy.KY, { statistics: 'Статистика', online: 'online', registeredUsers: 'Катталган колдонуучулар', referralContribution: 'Шилтеме боюнча салымыңыз', personalReferralLink: 'Жеке рефералдык шилтеме', referralRecommendationReward: 'Ар бир сунуш үчүн +150 рубль', shareEarn: 'StructOS — ар бир сунуш үчүн +150 рубль', referralReward: 'Сиздин шилтеме аркылуу сунуш' });
Object.assign(copy.TJ, { statistics: 'Омор', online: 'online', registeredUsers: 'Истифодабарандагони бақайдгирифташуда', referralContribution: 'Саҳми шумо аз рӯи пайванд', personalReferralLink: 'Пайванди шахсии рефералӣ', referralRecommendationReward: '+150 рубл барои ҳар тавсия', shareEarn: 'StructOS — +150 рубл барои ҳар тавсия', referralReward: 'Тавсия тавассути пайванди шумо' });

Object.assign(copy.RU, { ourRental: 'Наша Аренда', vehicleFleet: 'Автопарк', rentalTools: 'Инструмент', rentalPreparingLaunch: 'Блок готовится к запуску' });
Object.assign(copy.EN, { ourRental: 'Our Rental', vehicleFleet: 'Vehicle fleet', rentalTools: 'Tools', rentalPreparingLaunch: 'The section is preparing for launch' });
Object.assign(copy.KY, { ourRental: 'Биздин ижара', vehicleFleet: 'Автопарк', rentalTools: 'Инструменттер', rentalPreparingLaunch: 'Бөлүм ишке кирүүгө даярдалып жатат' });
Object.assign(copy.TJ, { ourRental: 'Иҷораи мо', vehicleFleet: 'Автопарк', rentalTools: 'Асбобҳо', rentalPreparingLaunch: 'Бахш барои оғоз омода мешавад' });

Object.assign(copy.RU, {
  launchProject: 'Запустить проект', startObjectQuestion: 'Желаете начать объект?', fullCycleChoice: 'Полного цикла', quickObjectChoice: 'Быстрый объект',
  fullCycleChoiceHint: 'Полный цикл ведения объекта', quickObjectChoiceHint: 'Название, раздел и документы будут перенесены в быстрый объект',
  quickObjectSetup: 'Запуск быстрого объекта', quickObjectSetupHint: 'Проверьте название и раздел, затем выберите один вариант работы.',
  quickObjectName: 'Название быстрого объекта', chooseOneWorkMode: 'Выберите один вариант работы', linkedProjectDocuments: 'Документы из проекта',
  linkedProjectDocumentsHint: 'Все загруженные документы будут добавлены в раздел быстрого объекта.', linkedFromProject: 'Из проекта',
  launchQuickObject: 'Запустить быстрый объект', quickObjectFromProjectCreated: 'Быстрый объект создан и открыт', quickObjectFromProjectUpdated: 'Быстрый объект обновлён и открыт'
});
Object.assign(copy.EN, {
  launchProject: 'Launch project', startObjectQuestion: 'Would you like to start an object?', fullCycleChoice: 'Full cycle', quickObjectChoice: 'Quick object',
  fullCycleChoiceHint: 'Full-cycle object management', quickObjectChoiceHint: 'The name, section, and documents will be transferred to a quick object',
  quickObjectSetup: 'Launch quick object', quickObjectSetupHint: 'Check the name and section, then choose one work mode.',
  quickObjectName: 'Quick object name', chooseOneWorkMode: 'Choose one work mode', linkedProjectDocuments: 'Project documents',
  linkedProjectDocumentsHint: 'All uploaded documents will be added to the quick-object section.', linkedFromProject: 'From project',
  launchQuickObject: 'Launch quick object', quickObjectFromProjectCreated: 'Quick object created and opened', quickObjectFromProjectUpdated: 'Quick object updated and opened'
});
Object.assign(copy.KY, {
  launchProject: 'Долбоорду баштоо', startObjectQuestion: 'Объектти баштайсызбы?', fullCycleChoice: 'Толук цикл', quickObjectChoice: 'Ыкчам объект',
  fullCycleChoiceHint: 'Объектти толук цикл менен жүргүзүү', quickObjectChoiceHint: 'Аталыш, бөлүм жана документтер ыкчам объектке өткөрүлөт',
  quickObjectSetup: 'Ыкчам объектти баштоо', quickObjectSetupHint: 'Аталышты жана бөлүмдү текшерип, иштин бир вариантын тандаңыз.',
  quickObjectName: 'Ыкчам объекттин аталышы', chooseOneWorkMode: 'Иштин бир вариантын тандаңыз', linkedProjectDocuments: 'Долбоордун документтери',
  linkedProjectDocumentsHint: 'Бардык жүктөлгөн документтер ыкчам объекттин бөлүмүнө кошулат.', linkedFromProject: 'Долбоордон',
  launchQuickObject: 'Ыкчам объектти баштоо', quickObjectFromProjectCreated: 'Ыкчам объект түзүлүп ачылды', quickObjectFromProjectUpdated: 'Ыкчам объект жаңыртылып ачылды'
});
Object.assign(copy.TJ, {
  launchProject: 'Оғози лоиҳа', startObjectQuestion: 'Мехоҳед объектро оғоз кунед?', fullCycleChoice: 'Давраи пурра', quickObjectChoice: 'Объекти зуд',
  fullCycleChoiceHint: 'Идоракунии пурраи объект', quickObjectChoiceHint: 'Ном, бахш ва ҳуҷҷатҳо ба объекти зуд гузаронда мешаванд',
  quickObjectSetup: 'Оғози объекти зуд', quickObjectSetupHint: 'Ном ва бахшро санҷида, як тарзи корро интихоб кунед.',
  quickObjectName: 'Номи объекти зуд', chooseOneWorkMode: 'Як тарзи корро интихоб кунед', linkedProjectDocuments: 'Ҳуҷҷатҳои лоиҳа',
  linkedProjectDocumentsHint: 'Ҳамаи ҳуҷҷатҳои боршуда ба бахши объекти зуд илова мешаванд.', linkedFromProject: 'Аз лоиҳа',
  launchQuickObject: 'Оғози объекти зуд', quickObjectFromProjectCreated: 'Объекти зуд сохта ва кушода шуд', quickObjectFromProjectUpdated: 'Объекти зуд нав ва кушода шуд'
});

Object.assign(copy.RU, {
  workOrMaterialName: 'Наименование работы / материала', sourceCatalogTitle: 'Подсказки из проекта и сметы',
  sourceCatalogReady: 'позиций доступно. Начните вводить название и выберите совпадение.',
  sourceCatalogPending: 'Проект или смета подключены. Позиции появятся после извлечения данных из документа.',
  sourceCatalogEmpty: 'Загрузите проект или смету в этот раздел, чтобы получать подсказки.',
  sourceCatalogLoading: 'Проверяем позиции в загруженных документах…', sourceCatalogFreeInput: 'Если нужной работы или материала нет — введите своё название в свободной форме.'
});
Object.assign(copy.EN, {
  workOrMaterialName: 'Work / material name', sourceCatalogTitle: 'Suggestions from project and estimate',
  sourceCatalogReady: 'items available. Start typing and choose a match.',
  sourceCatalogPending: 'A project or estimate is connected. Items will appear after document data is extracted.',
  sourceCatalogEmpty: 'Upload a project or estimate to this section to get suggestions.',
  sourceCatalogLoading: 'Checking items in uploaded documents…', sourceCatalogFreeInput: 'If the work or material is not listed, enter your own name freely.'
});
Object.assign(copy.KY, {
  workOrMaterialName: 'Иштин / материалдын аталышы', sourceCatalogTitle: 'Долбоор жана сметадан сунуштар',
  sourceCatalogReady: 'позиция жеткиликтүү. Аталышты жаза баштап, дал келгенин тандаңыз.',
  sourceCatalogPending: 'Долбоор же смета тиркелген. Документтен маалымат алынгандан кийин позициялар чыгат.',
  sourceCatalogEmpty: 'Сунуштарды алуу үчүн бул бөлүмгө долбоор же смета жүктөңүз.',
  sourceCatalogLoading: 'Жүктөлгөн документтердеги позициялар текшерилүүдө…', sourceCatalogFreeInput: 'Керектүү иш же материал жок болсо, өз аталышыңызды эркин жазыңыз.'
});
Object.assign(copy.TJ, {
  workOrMaterialName: 'Номи кор / мавод', sourceCatalogTitle: 'Пешниҳодҳо аз лоиҳа ва смета',
  sourceCatalogReady: 'мавқеъ дастрас аст. Номро навишта, мувофиқро интихоб кунед.',
  sourceCatalogPending: 'Лоиҳа ё смета пайваст аст. Пас аз гирифтани маълумот аз ҳуҷҷат мавқеъҳо пайдо мешаванд.',
  sourceCatalogEmpty: 'Барои гирифтани пешниҳодҳо ба ин бахш лоиҳа ё смета бор кунед.',
  sourceCatalogLoading: 'Мавқеъҳои ҳуҷҷатҳои боршуда санҷида мешаванд…', sourceCatalogFreeInput: 'Агар кор ё маводи лозим набошад, номи худро озодона ворид кунед.'
});

Object.assign(copy.RU, {
  uploadedFiles: 'Загруженные файлы', uploadAdditionalFile: 'Загрузить дополнительный файл', additionalFile: 'Дополнительный файл',
  revisionUploadHint: 'Существующие файлы останутся отдельными блоками. Новый файл сохранится отдельно и будет ждать собственного анализа.',
  uploadAndCompare: 'Сохранить дополнительный файл', versionSaved: 'Дополнительный файл сохранён. Запустите его анализ отдельно.',
  openAnalysisResult: 'Открыть результат', fileBlockHint: 'Нажмите на файл, чтобы показать результат анализа ниже.',
  fileAnalysisResult: 'Результат анализа файла', fileAwaitingAnalysis: 'Файл ожидает отдельного анализа',
  fileAwaitingAnalysisCopy: 'Нажмите «Анализировать». Результат этого файла не смешивается с результатами остальных версий.',
  compareProjects: 'Сравнить проекты', compareContracts: 'Сравнить договоры', compareEstimates: 'Сравнить сметы',
  projectComparison: 'Сравнение проектов', contractComparison: 'Сравнение договоров', estimateComparison: 'Сравнение смет',
  comparedFiles: 'Сравниваемые файлы', showDifferences: 'Показать различия', hideDifferences: 'Скрыть различия',
  comparisonNeedsAnalysis: 'Сначала проанализируйте оба файла', comparisonNeedsAnalysisCopy: 'Сравнение станет доступно после отдельного анализа каждого выбранного файла.',
  positionsAdded: 'Добавлено позиций', positionsRemoved: 'Удалено позиций', positionsChanged: 'Изменено позиций',
  positionAdded: 'Добавлено', positionRemoved: 'Удалено', positionChanged: 'Изменено', noExtractedDifferences: 'По извлечённым позициям различий не найдено.',
  deleteFileVersion: 'Удалить этот файл?', deleteFileVersionCopy: 'Будет удалён только выбранный файл. Остальные файлы и результаты анализа сохранятся.',
  fileVersionDeleted: 'Выбранный файл удалён', latestFile: 'Последний файл'
});
Object.assign(copy.EN, {
  uploadedFiles: 'Uploaded files', uploadAdditionalFile: 'Upload another file', additionalFile: 'Additional file',
  revisionUploadHint: 'Existing files remain as separate cards. The new file is saved separately and waits for its own analysis.',
  uploadAndCompare: 'Save additional file', versionSaved: 'Additional file saved. Run its analysis separately.',
  openAnalysisResult: 'Open result', fileBlockHint: 'Select a file to show its analysis result below.',
  fileAnalysisResult: 'File analysis result', fileAwaitingAnalysis: 'This file is awaiting separate analysis',
  fileAwaitingAnalysisCopy: 'Select Analyze. This file’s result remains separate from every other version.',
  compareProjects: 'Compare projects', compareContracts: 'Compare contracts', compareEstimates: 'Compare estimates',
  projectComparison: 'Project comparison', contractComparison: 'Contract comparison', estimateComparison: 'Estimate comparison',
  comparedFiles: 'Compared files', showDifferences: 'Show differences', hideDifferences: 'Hide differences',
  comparisonNeedsAnalysis: 'Analyze both files first', comparisonNeedsAnalysisCopy: 'Comparison becomes available after each selected file is analyzed separately.',
  positionsAdded: 'Items added', positionsRemoved: 'Items removed', positionsChanged: 'Items changed',
  positionAdded: 'Added', positionRemoved: 'Removed', positionChanged: 'Changed', noExtractedDifferences: 'No differences were found in the extracted items.',
  deleteFileVersion: 'Delete this file?', deleteFileVersionCopy: 'Only the selected file will be deleted. Other files and analysis results remain.',
  fileVersionDeleted: 'Selected file deleted', latestFile: 'Latest file'
});
Object.assign(copy.KY, {
  uploadedFiles: 'Жүктөлгөн файлдар', uploadAdditionalFile: 'Кошумча файл жүктөө', additionalFile: 'Кошумча файл',
  revisionUploadHint: 'Мурунку файлдар өзүнчө блок болуп калат. Жаңы файл өзүнчө сакталып, өзүнүн талдоосун күтөт.',
  uploadAndCompare: 'Кошумча файлды сактоо', versionSaved: 'Кошумча файл сакталды. Аны өзүнчө талдоону баштаңыз.',
  openAnalysisResult: 'Натыйжаны ачуу', fileBlockHint: 'Төмөндө талдоо натыйжасын көрүү үчүн файлды басыңыз.',
  fileAnalysisResult: 'Файлды талдоонун натыйжасы', fileAwaitingAnalysis: 'Файл өзүнчө талдоону күтүп жатат',
  fileAwaitingAnalysisCopy: '«Талдоо» баскычын басыңыз. Бул файлдын натыйжасы башка версияларга аралашпайт.',
  compareProjects: 'Долбоорлорду салыштыруу', compareContracts: 'Келишимдерди салыштыруу', compareEstimates: 'Сметаларды салыштыруу',
  projectComparison: 'Долбоорлорду салыштыруу', contractComparison: 'Келишимдерди салыштыруу', estimateComparison: 'Сметаларды салыштыруу',
  comparedFiles: 'Салыштырылган файлдар', showDifferences: 'Айырманы көрсөтүү', hideDifferences: 'Айырманы жашыруу',
  comparisonNeedsAnalysis: 'Адегенде эки файлды тең талдаңыз', comparisonNeedsAnalysisCopy: 'Ар бир файл өзүнчө талдангандан кийин салыштыруу жеткиликтүү болот.',
  positionsAdded: 'Кошулган позициялар', positionsRemoved: 'Өчүрүлгөн позициялар', positionsChanged: 'Өзгөргөн позициялар',
  positionAdded: 'Кошулду', positionRemoved: 'Өчүрүлдү', positionChanged: 'Өзгөрдү', noExtractedDifferences: 'Алынган позициялар боюнча айырма табылган жок.',
  deleteFileVersion: 'Бул файл өчүрүлсүнбү?', deleteFileVersionCopy: 'Тандалган файл гана өчүрүлөт. Калган файлдар жана талдоо натыйжалары сакталат.',
  fileVersionDeleted: 'Тандалган файл өчүрүлдү', latestFile: 'Акыркы файл'
});
Object.assign(copy.TJ, {
  uploadedFiles: 'Файлҳои боршуда', uploadAdditionalFile: 'Бор кардани файли иловагӣ', additionalFile: 'Файли иловагӣ',
  revisionUploadHint: 'Файлҳои пешина ҳамчун блокҳои алоҳида мемонанд. Файли нав алоҳида нигоҳ дошта шуда, таҳлили худро интизор мешавад.',
  uploadAndCompare: 'Нигоҳ доштани файли иловагӣ', versionSaved: 'Файли иловагӣ нигоҳ дошта шуд. Таҳлили онро алоҳида оғоз кунед.',
  openAnalysisResult: 'Кушодани натиҷа', fileBlockHint: 'Барои нишон додани натиҷаи таҳлил дар поён файлро пахш кунед.',
  fileAnalysisResult: 'Натиҷаи таҳлили файл', fileAwaitingAnalysis: 'Файл таҳлили алоҳидаро интизор аст',
  fileAwaitingAnalysisCopy: '«Таҳлил кардан»-ро пахш кунед. Натиҷаи ин файл бо версияҳои дигар омехта намешавад.',
  compareProjects: 'Муқоисаи лоиҳаҳо', compareContracts: 'Муқоисаи шартномаҳо', compareEstimates: 'Муқоисаи сметаҳо',
  projectComparison: 'Муқоисаи лоиҳаҳо', contractComparison: 'Муқоисаи шартномаҳо', estimateComparison: 'Муқоисаи сметаҳо',
  comparedFiles: 'Файлҳои муқоисашаванда', showDifferences: 'Нишон додани фарқият', hideDifferences: 'Пинҳон кардани фарқият',
  comparisonNeedsAnalysis: 'Аввал ҳар ду файлро таҳлил кунед', comparisonNeedsAnalysisCopy: 'Пас аз таҳлили алоҳидаи ҳар як файл муқоиса дастрас мешавад.',
  positionsAdded: 'Мавқеъҳои иловашуда', positionsRemoved: 'Мавқеъҳои ҳазфшуда', positionsChanged: 'Мавқеъҳои тағйирёфта',
  positionAdded: 'Илова шуд', positionRemoved: 'Ҳазф шуд', positionChanged: 'Тағйир ёфт', noExtractedDifferences: 'Дар мавқеъҳои гирифташуда фарқият ёфт нашуд.',
  deleteFileVersion: 'Ин файл нест карда шавад?', deleteFileVersionCopy: 'Танҳо файли интихобшуда нест мешавад. Файлҳо ва натиҷаҳои дигар нигоҳ дошта мешаванд.',
  fileVersionDeleted: 'Файли интихобшуда нест шуд', latestFile: 'Файли охирин'
});

Object.assign(copy.RU, {
  quickProjectAnalysisHint: 'Загрузить проект, договор или смету и запустить отдельный анализ',
  quickDocumentChoiceHint: 'Загрузите проект, договор или смету. Можно добавить несколько документов — каждый анализируется отдельно.',
  projectEstimate: 'Смета', installationEstimate: 'Смета на монтаж', installationWorks: 'Монтажные работы',
  associatedWorks: 'Сопутствующие работы, необходимые для монтажа', projectMaterialsEquipment: 'Материалы и оборудование из проекта',
  associatedInstallationMaterials: 'Сопутствующие монтажу материалы', extractedFromProject: 'Извлечено из проекта', identifiedByAnalysis: 'Выявлено анализом',
  estimateGroupPending: 'Позиции появятся после извлечения данных из загруженного проекта.', estimateAnalysisSummary: 'Работы, материалы и оборудование разделены по назначению и источнику.'
});
Object.assign(copy.EN, {
  quickProjectAnalysisHint: 'Upload a project, contract, or estimate and run a separate analysis',
  quickDocumentChoiceHint: 'Upload a project, contract, or estimate. You can add several documents; each is analyzed separately.',
  projectEstimate: 'Estimate', installationEstimate: 'Installation estimate', installationWorks: 'Installation works',
  associatedWorks: 'Associated works required for installation', projectMaterialsEquipment: 'Project materials and equipment',
  associatedInstallationMaterials: 'Associated installation materials', extractedFromProject: 'Extracted from project', identifiedByAnalysis: 'Identified by analysis',
  estimateGroupPending: 'Items will appear after data is extracted from the uploaded project.', estimateAnalysisSummary: 'Works, materials, and equipment are grouped by purpose and source.'
});
Object.assign(copy.KY, {
  quickProjectAnalysisHint: 'Долбоорду, келишимди же сметаны жүктөп, өзүнчө талдоону баштоо',
  quickDocumentChoiceHint: 'Долбоорду, келишимди же сметаны жүктөңүз. Бир нече документ кошсо болот — ар бири өзүнчө талданат.',
  projectEstimate: 'Смета', installationEstimate: 'Монтаж сметасы', installationWorks: 'Монтаж иштери',
  associatedWorks: 'Монтаж үчүн керектүү коштоочу иштер', projectMaterialsEquipment: 'Долбоордогу материалдар жана жабдуулар',
  associatedInstallationMaterials: 'Монтажга керектүү коштоочу материалдар', extractedFromProject: 'Долбоордон алынды', identifiedByAnalysis: 'Талдоо аныктады',
  estimateGroupPending: 'Позициялар жүктөлгөн долбоордон маалымат алынгандан кийин чыгат.', estimateAnalysisSummary: 'Иштер, материалдар жана жабдуулар максаты жана булагы боюнча бөлүндү.'
});
Object.assign(copy.TJ, {
  quickProjectAnalysisHint: 'Лоиҳа, шартнома ё сметаро бор карда, таҳлили алоҳидаро оғоз кунед',
  quickDocumentChoiceHint: 'Лоиҳа, шартнома ё сметаро бор кунед. Якчанд ҳуҷҷат илова кардан мумкин — ҳар кадом алоҳида таҳлил мешавад.',
  projectEstimate: 'Смета', installationEstimate: 'Сметаи монтаж', installationWorks: 'Корҳои монтажӣ',
  associatedWorks: 'Корҳои ҳамроҳи барои монтаж зарур', projectMaterialsEquipment: 'Мавод ва таҷҳизоти лоиҳа',
  associatedInstallationMaterials: 'Маводи ҳамроҳи монтаж', extractedFromProject: 'Аз лоиҳа гирифта шуд', identifiedByAnalysis: 'Бо таҳлил муайян шуд',
  estimateGroupPending: 'Позицияҳо пас аз гирифтани маълумот аз лоиҳаи боршуда пайдо мешаванд.', estimateAnalysisSummary: 'Корҳо, мавод ва таҷҳизот аз рӯи вазифа ва манбаъ ҷудо шуданд.'
});
Object.assign(copy.RU, { deleteSectionAttachment: 'Удалить', deleteSectionAttachmentTitle: 'Удалить документ из раздела?', deleteSectionAttachmentHint: 'Выбранный документ и вся его история версий будут удалены. Остальные файлы раздела сохранятся.', sectionAttachmentDeleted: 'Документ удалён из раздела', sectionAttachmentDeleteFailed: 'Не удалось удалить документ' });
Object.assign(copy.EN, { deleteSectionAttachment: 'Delete', deleteSectionAttachmentTitle: 'Delete document from this section?', deleteSectionAttachmentHint: 'The selected document and its entire version history will be deleted. Other section files will remain.', sectionAttachmentDeleted: 'Document deleted from section', sectionAttachmentDeleteFailed: 'Could not delete document' });
Object.assign(copy.KY, { deleteSectionAttachment: 'Өчүрүү', deleteSectionAttachmentTitle: 'Документ бөлүмдөн өчүрүлсүнбү?', deleteSectionAttachmentHint: 'Тандалган документ жана анын бардык версиялары өчүрүлөт. Бөлүмдүн башка файлдары сакталат.', sectionAttachmentDeleted: 'Документ бөлүмдөн өчүрүлдү', sectionAttachmentDeleteFailed: 'Документти өчүрүү мүмкүн болгон жок' });
Object.assign(copy.TJ, { deleteSectionAttachment: 'Нест кардан', deleteSectionAttachmentTitle: 'Ҳуҷҷат аз бахш нест карда шавад?', deleteSectionAttachmentHint: 'Ҳуҷҷати интихобшуда ва тамоми таърихи версияҳои он нест мешавад. Файлҳои дигари бахш нигоҳ дошта мешаванд.', sectionAttachmentDeleted: 'Ҳуҷҷат аз бахш нест шуд', sectionAttachmentDeleteFailed: 'Ҳуҷҷатро нест кардан муяссар нашуд' });
Object.assign(copy.RU, {
  peopleAssigned: 'Выставить людей', aggregatorWindow: 'Окно агрегатора', aggregatorWindowHint: 'Табель людей, смен, переработки и выплат', addStaffingPerson: 'Добавить человека', staffingPeople: 'Людей в табеле', activeShifts: 'Открыто смен', totalOvertime: 'Переработка', totalPayroll: 'К выплате',
  shiftDate: 'Дата', weekday: 'День недели', workerFullName: 'ФИО', structosWorkerId: 'ID StructOS', plannedShift: 'Смена по плану', actualShift: 'Фактическая смена', shiftFrom: 'С', shiftTo: 'До', shiftRate: 'Выход, ₽', overtimeHours: 'Переработка, ч', overtimePay: 'Переработка, ₽', salaryPay: 'З/П, ₽', penalty: 'Штраф, ₽', penaltyComment: 'Комментарий к штрафу',
  openShift: 'Открыть смену', closeShift: 'Закрыть смену', shiftClosed: 'Смена закрыта', shiftNotOpened: 'Ещё не открыта', shiftOpenedAt: 'Открыта', shiftClosedAt: 'Закрыта', deleteShift: 'Удалить строку', deleteShiftConfirm: 'Удалить эту смену из табеля?', noStaffingShifts: 'Добавьте первого человека в табель смен.', staffingRequiredFields: 'Заполните ФИО, 7-значный ID StructOS, дату, время смены и стоимость выхода.', shiftOpened: 'Смена открыта, время зафиксировано', shiftClosedToast: 'Смена закрыта, зарплата рассчитана', shiftDeleted: 'Смена удалена',
  overtimeFormula: 'Переработка считается только сверх плановой смены: выход ÷ плановые часы × часы переработки.', staffingNumber: '№', startStaffingDay: 'Начать новый день', staffingDayTotal: 'Итого за день', staffingRegisterTotal: 'Итого по табелю', staffingPeopleShort: 'Людей', staffingShiftRatesTotal: 'Выходы', staffingPenaltiesTotal: 'Штрафы', staffingDayCreated: 'Новый день добавлен'
});
Object.assign(copy.EN, {
  aggregatorWindow: 'Aggregator window', aggregatorWindowHint: 'People, shifts, overtime and payroll register', addStaffingPerson: 'Add person', staffingPeople: 'People in register', activeShifts: 'Open shifts', totalOvertime: 'Overtime', totalPayroll: 'To be paid',
  shiftDate: 'Date', weekday: 'Weekday', workerFullName: 'Full name', structosWorkerId: 'StructOS ID', plannedShift: 'Planned shift', actualShift: 'Actual shift', shiftFrom: 'From', shiftTo: 'To', shiftRate: 'Shift rate', overtimeHours: 'Overtime, h', overtimePay: 'Overtime pay', salaryPay: 'Salary', penalty: 'Penalty', penaltyComment: 'Penalty comment',
  openShift: 'Open shift', closeShift: 'Close shift', shiftClosed: 'Shift closed', shiftNotOpened: 'Not opened yet', shiftOpenedAt: 'Opened', shiftClosedAt: 'Closed', deleteShift: 'Delete row', deleteShiftConfirm: 'Delete this shift from the register?', noStaffingShifts: 'Add the first person to the shift register.', staffingRequiredFields: 'Enter full name, a 7-digit StructOS ID, date, planned shift time and shift rate.', shiftOpened: 'Shift opened and time recorded', shiftClosedToast: 'Shift closed and salary calculated', shiftDeleted: 'Shift deleted',
  overtimeFormula: 'Overtime is counted only beyond the planned shift: shift rate ÷ planned hours × overtime hours.', staffingNumber: 'No.', startStaffingDay: 'Start new day', staffingDayTotal: 'Day total', staffingRegisterTotal: 'Register total', staffingPeopleShort: 'People', staffingShiftRatesTotal: 'Shift rates', staffingPenaltiesTotal: 'Penalties', staffingDayCreated: 'New day added'
});
Object.assign(copy.KY, {
  aggregatorWindow: 'Агрегатор терезеси', aggregatorWindowHint: 'Адамдардын, сменалардын, ашыкча иштин жана төлөмдөрдүн табели', addStaffingPerson: 'Адам кошуу', staffingPeople: 'Табелдеги адамдар', activeShifts: 'Ачык сменалар', totalOvertime: 'Ашыкча иш', totalPayroll: 'Төлөнөт',
  shiftDate: 'Дата', weekday: 'Аптанын күнү', workerFullName: 'Аты-жөнү', structosWorkerId: 'StructOS ID', plannedShift: 'Пландагы смена', actualShift: 'Иш жүзүндөгү смена', shiftFrom: 'Башы', shiftTo: 'Аягы', shiftRate: 'Чыгуу, ₽', overtimeHours: 'Ашыкча иш, с', overtimePay: 'Ашыкча төлөм, ₽', salaryPay: 'Айлык, ₽', penalty: 'Айып, ₽', penaltyComment: 'Айыпка комментарий',
  openShift: 'Сменаны ачуу', closeShift: 'Сменаны жабуу', shiftClosed: 'Смена жабылды', shiftNotOpened: 'Али ачыла элек', shiftOpenedAt: 'Ачылды', shiftClosedAt: 'Жабылды', deleteShift: 'Сапты өчүрүү', deleteShiftConfirm: 'Бул смена табелден өчүрүлсүнбү?', noStaffingShifts: 'Смена табелине биринчи адамды кошуңуз.', staffingRequiredFields: 'Аты-жөнүн, 7 орундуу StructOS IDни, датаны, сменанын убактысын жана чыгуу баасын толтуруңуз.', shiftOpened: 'Смена ачылып, убакыт белгиленди', shiftClosedToast: 'Смена жабылып, айлык эсептелди', shiftDeleted: 'Смена өчүрүлдү',
  overtimeFormula: 'Ашыкча иш пландагы сменадан кийин гана эсептелет: чыгуу ÷ пландагы сааттар × ашыкча сааттар.', staffingNumber: '№', startStaffingDay: 'Жаңы күндү баштоо', staffingDayTotal: 'Күндүн жыйынтыгы', staffingRegisterTotal: 'Табелдин жыйынтыгы', staffingPeopleShort: 'Адам', staffingShiftRatesTotal: 'Чыгуулар', staffingPenaltiesTotal: 'Айыптар', staffingDayCreated: 'Жаңы күн кошулду'
});
Object.assign(copy.TJ, {
  aggregatorWindow: 'Равзанаи агрегатор', aggregatorWindowHint: 'Ҷадвали одамон, бастҳо, изофакорӣ ва пардохтҳо', addStaffingPerson: 'Иловаи одам', staffingPeople: 'Одамон дар ҷадвал', activeShifts: 'Бастҳои кушода', totalOvertime: 'Изофакорӣ', totalPayroll: 'Барои пардохт',
  shiftDate: 'Сана', weekday: 'Рӯзи ҳафта', workerFullName: 'Ному насаб', structosWorkerId: 'StructOS ID', plannedShift: 'Басти нақшавӣ', actualShift: 'Басти воқеӣ', shiftFrom: 'Аз', shiftTo: 'То', shiftRate: 'Баромад, ₽', overtimeHours: 'Изофакорӣ, с', overtimePay: 'Пули изофакорӣ, ₽', salaryPay: 'Музд, ₽', penalty: 'Ҷарима, ₽', penaltyComment: 'Шарҳи ҷарима',
  openShift: 'Кушодани баст', closeShift: 'Пӯшидани баст', shiftClosed: 'Баст пӯшида шуд', shiftNotOpened: 'Ҳанӯз кушода нест', shiftOpenedAt: 'Кушода шуд', shiftClosedAt: 'Пӯшида шуд', deleteShift: 'Нест кардани сатр', deleteShiftConfirm: 'Ин баст аз ҷадвал нест карда шавад?', noStaffingShifts: 'Одами аввалро ба ҷадвали бастҳо илова кунед.', staffingRequiredFields: 'Ному насаб, StructOS ID-и 7-рақама, сана, вақти баст ва арзиши баромадро пур кунед.', shiftOpened: 'Баст кушода ва вақт сабт шуд', shiftClosedToast: 'Баст пӯшида ва музд ҳисоб шуд', shiftDeleted: 'Баст нест шуд',
  overtimeFormula: 'Изофакорӣ танҳо баъд аз басти нақшавӣ ҳисоб мешавад: баромад ÷ соатҳои нақшавӣ × соатҳои изофа.', staffingNumber: '№', startStaffingDay: 'Оғози рӯзи нав', staffingDayTotal: 'Ҷамъ барои рӯз', staffingRegisterTotal: 'Ҷамъ аз рӯи ҷадвал', staffingPeopleShort: 'Одам', staffingShiftRatesTotal: 'Баромадҳо', staffingPenaltiesTotal: 'Ҷаримаҳо', staffingDayCreated: 'Рӯзи нав илова шуд'
});
Object.assign(copy.RU, { acceptInvitation: 'Принять приглашение', invitationAccepted: 'Приглашение принято', invitationPending: 'Ожидает решения', declineInvitation: 'Отклонить приглашение', declineInvitationTitle: 'Отклонить приглашение?', declineInvitationHint: 'Приглашение будет удалено из входящих и объект больше не будет показываться в списке.', invitationDeclined: 'Приглашение отклонено', expandExplanation: 'Развернуть поле пояснений', collapseExplanation: 'Свернуть поле пояснений' });
Object.assign(copy.EN, { acceptInvitation: 'Accept invitation', invitationAccepted: 'Invitation accepted', invitationPending: 'Awaiting your response', declineInvitation: 'Decline invitation', declineInvitationTitle: 'Decline this invitation?', declineInvitationHint: 'The invitation will be removed from your inbox and the object will no longer appear in the list.', invitationDeclined: 'Invitation declined', expandExplanation: 'Expand explanation field', collapseExplanation: 'Collapse explanation field' });
Object.assign(copy.KY, { acceptInvitation: 'Чакырууну кабыл алуу', invitationAccepted: 'Чакыруу кабыл алынды', invitationPending: 'Чечим күтүлүүдө', declineInvitation: 'Чакырууну четке кагуу', declineInvitationTitle: 'Чакыруу четке кагылсынбы?', declineInvitationHint: 'Чакыруу киргендерден өчүрүлөт жана объект тизмеде мындан ары көрүнбөйт.', invitationDeclined: 'Чакыруу четке кагылды', expandExplanation: 'Түшүндүрмө талаасын кеңейтүү', collapseExplanation: 'Түшүндүрмө талаасын жыйноо' });
Object.assign(copy.TJ, { acceptInvitation: 'Қабули даъват', invitationAccepted: 'Даъват қабул шуд', invitationPending: 'Дар интизори қарор', declineInvitation: 'Рад кардани даъват', declineInvitationTitle: 'Даъват рад карда шавад?', declineInvitationHint: 'Даъват аз воридот хориҷ мешавад ва объект дигар дар рӯйхат намоиш дода намешавад.', invitationDeclined: 'Даъват рад карда шуд', expandExplanation: 'Кушодани майдони тавзеҳот', collapseExplanation: 'Пӯшидани майдони тавзеҳот' });

Object.assign(copy.RU, {
  cabinetWelcomeTagline: 'ЕДИНЫЙ СТРОИТЕЛЬНЫЙ ИНТЕЛЛЕКТ', cabinetWelcomeA11y: 'Вход в личный кабинет',
  cabinetWelcomeUserRole: 'Пользователь', cabinetWelcomeExecutorRole: 'Исполнитель', cabinetWelcomeSupplierRole: 'Поставщик', cabinetWelcomeAggregatorRole: 'Агрегатор',
  cabinetWelcomeUserOne: 'Единый', cabinetWelcomeUserTwo: 'Строительный', cabinetWelcomeUserThree: 'Интеллект в России №1',
  cabinetWelcomeExecutorOne: 'Создавайте КП первым.', cabinetWelcomeExecutorTwo: 'Запускайте проект в один клик.', cabinetWelcomeExecutorThree: 'Создавайте свою репутацию.',
  cabinetWelcomeSupplierOne: 'Предлагайте быстрее.', cabinetWelcomeSupplierTwo: 'Будьте там, где есть реальная потребность.',
  cabinetWelcomeAggregatorOne: 'Собирайте команды быстрее.', cabinetWelcomeAggregatorTwo: 'Управляйте людьми точнее.'
});
Object.assign(copy.EN, {
  cabinetWelcomeTagline: 'UNIFIED CONSTRUCTION INTELLIGENCE', cabinetWelcomeA11y: 'Entering your account',
  cabinetWelcomeUserRole: 'User', cabinetWelcomeExecutorRole: 'Contractor', cabinetWelcomeSupplierRole: 'Supplier', cabinetWelcomeAggregatorRole: 'Aggregator',
  cabinetWelcomeUserOne: 'Unified', cabinetWelcomeUserTwo: 'Construction', cabinetWelcomeUserThree: 'Intelligence in Russia No. 1',
  cabinetWelcomeExecutorOne: 'Create proposals first.', cabinetWelcomeExecutorTwo: 'Launch a project in one click.', cabinetWelcomeExecutorThree: 'Build your reputation.',
  cabinetWelcomeSupplierOne: 'Make offers faster.', cabinetWelcomeSupplierTwo: 'Be where there is real demand.',
  cabinetWelcomeAggregatorOne: 'Build teams faster.', cabinetWelcomeAggregatorTwo: 'Manage people with greater precision.'
});
Object.assign(copy.KY, {
  cabinetWelcomeTagline: 'БИРДИКТҮҮ КУРУЛУШ ИНТЕЛЛЕКТИ', cabinetWelcomeA11y: 'Жеке кабинетке кирүү',
  cabinetWelcomeUserRole: 'Колдонуучу', cabinetWelcomeExecutorRole: 'Аткаруучу', cabinetWelcomeSupplierRole: 'Жеткирүүчү', cabinetWelcomeAggregatorRole: 'Агрегатор',
  cabinetWelcomeUserOne: 'Бирдиктүү', cabinetWelcomeUserTwo: 'Курулуш', cabinetWelcomeUserThree: 'Россиядагы №1 интеллект',
  cabinetWelcomeExecutorOne: 'КПны биринчи түзүңүз.', cabinetWelcomeExecutorTwo: 'Долбоорду бир баскыч менен ишке киргизиңиз.', cabinetWelcomeExecutorThree: 'Өз аброюңузду түзүңүз.',
  cabinetWelcomeSupplierOne: 'Сунуштарды тезирээк бериңиз.', cabinetWelcomeSupplierTwo: 'Чыныгы муктаждык бар жерде болуңуз.',
  cabinetWelcomeAggregatorOne: 'Командаларды тезирээк чогултуңуз.', cabinetWelcomeAggregatorTwo: 'Адамдарды так башкарыңыз.'
});
Object.assign(copy.TJ, {
  cabinetWelcomeTagline: 'ЗЕҲНИ ЯГОНАИ СОХТМОНӢ', cabinetWelcomeA11y: 'Воридшавӣ ба кабинети шахсӣ',
  cabinetWelcomeUserRole: 'Истифодабаранда', cabinetWelcomeExecutorRole: 'Иҷрокунанда', cabinetWelcomeSupplierRole: 'Таъминкунанда', cabinetWelcomeAggregatorRole: 'Агрегатор',
  cabinetWelcomeUserOne: 'Ягона', cabinetWelcomeUserTwo: 'Сохтмонӣ', cabinetWelcomeUserThree: 'Зеҳн дар Русия №1',
  cabinetWelcomeExecutorOne: 'Пешниҳоди тиҷоратиро аввал созед.', cabinetWelcomeExecutorTwo: 'Лоиҳаро бо як пахш оғоз кунед.', cabinetWelcomeExecutorThree: 'Обрӯи худро созед.',
  cabinetWelcomeSupplierOne: 'Тезтар пешниҳод кунед.', cabinetWelcomeSupplierTwo: 'Дар ҷое бошед, ки талаботи воқеӣ ҳаст.',
  cabinetWelcomeAggregatorOne: 'Дастаҳоро тезтар ҷамъ кунед.', cabinetWelcomeAggregatorTwo: 'Одамонро дақиқтар идора кунед.'
});

Object.assign(copy.RU, {
  syncTitle: 'СИНХРОНИЗАЦИЯ', syncSubtitle: 'Синхронизируйте данные, записав их на телефон, для работы офлайн без интернета.',
  syncInternetAvailable: 'ИНТЕРНЕТ ЕСТЬ', syncOnlineFlow: 'Телефон ↔ StructOS Cloud', syncInternetLost: 'ИНТЕРНЕТ ПРОПАЛ', syncOfflineFlow: 'Телефон продолжает работать', syncInternetRestored: 'ИНТЕРНЕТ ПОЯВИЛСЯ', syncRestoredFlow: 'Автоматическая синхронизация',
  syncDialogTitle: 'Что синхронизировать?', syncDialogHint: 'Выберите данные, которые нужно сохранить на телефоне и сверять с StructOS Cloud.', syncChooseData: 'Данные для синхронизации',
  syncCategoryProjects: 'Объекты и проекты', syncCategoryProjectsHint: 'Карточки объектов, проекты и порядок', syncCategoryStaff: 'Сотрудники и табели', syncCategoryStaffHint: 'Люди, смены, переработки и выплаты', syncCategoryFinance: 'Финансы', syncCategoryFinanceHint: 'Доходы, расходы, договоры и расчёты', syncCategoryWarehouse: 'Склад и материалы', syncCategoryWarehouseHint: 'Материалы, оборудование и остатки', syncCategoryDocuments: 'Документы и отчёты', syncCategoryDocumentsHint: 'Документы, акты, отчёты и локальные файлы', syncCategoryProfile: 'Профиль и настройки', syncCategoryProfileHint: 'Паспорт, связи и рабочее пространство',
  syncSelected: 'Синхронизировать выбранное', syncAll: 'Синхронизировать всё', syncSelectOne: 'Выберите хотя бы один раздел.',
  syncPendingTotal: 'ИТОГО НЕ СИНХРОНИЗИРОВАНО', syncSectionOne: 'раздел', syncSectionFew: 'раздела', syncSectionMany: 'разделов', syncSubsectionOne: 'подраздел', syncSubsectionFew: 'подраздела', syncSubsectionMany: 'подразделов',
  syncServerOnlyNote: 'Только при наличии интернета: новый ИИ-анализ, внешние сообщения, актуальные предложения поставщиков и другие серверные функции.',
  syncServerRole: 'SERVER', syncServerMain: 'Главный источник данных', syncDeviceRole: 'DEVICE', syncDeviceCopy: 'Рабочая локальная копия', syncEngineRole: 'SYNC ENGINE', syncEngineCopy: 'Постоянно сводит данные',
  syncOnlineTitle: 'Интернет доступен', syncOnlineCopy: 'Данные сохранятся на телефоне и будут отправлены в облако.', syncOfflineTitle: 'Работа без интернета', syncOfflineCopy: 'Данные сохранятся на телефоне и встанут в очередь до появления сети.',
  syncStatePreparingTitle: 'Подготовка локальной копии', syncStatePreparingCopy: 'Данные сохраняются на устройстве', syncStateOfflineTitle: 'Готово к работе офлайн', syncStateOfflineCopy: 'Изменения сохраняются на телефоне до появления сети', syncStateReadyTitle: 'Локальная копия готова', syncStateReadyCopy: 'Облачная отправка ожидает подключения сервера', syncStateSyncedTitle: 'Данные синхронизированы', syncStateSyncedCopy: 'Телефон и StructOS Cloud сверены', syncStateErrorTitle: 'Нужна повторная синхронизация', syncStateErrorCopy: 'Локальные данные сохранены и не потеряны', syncOpen: 'Открыть', syncLastSaved: 'Сохранено на телефоне',
  syncProgressSaving: 'Записываем выбранные данные на телефон…', syncProgressCloud: 'Сверяем изменения с StructOS Cloud…', syncToastOffline: 'Данные сохранены на телефоне и готовы к работе офлайн', syncToastDevice: 'Локальная копия обновлена; отправка в облако стоит в очереди', syncToastCloud: 'Телефон и StructOS Cloud синхронизированы'
});
Object.assign(copy.EN, {
  syncTitle: 'SYNC', syncSubtitle: 'Sync your data by saving it to your phone for offline work without internet access.',
  syncInternetAvailable: 'INTERNET AVAILABLE', syncOnlineFlow: 'Phone ↔ StructOS Cloud', syncInternetLost: 'INTERNET LOST', syncOfflineFlow: 'The phone keeps working', syncInternetRestored: 'INTERNET RESTORED', syncRestoredFlow: 'Automatic synchronization',
  syncDialogTitle: 'What should be synced?', syncDialogHint: 'Choose the data to save on this phone and reconcile with StructOS Cloud.', syncChooseData: 'Data to synchronize',
  syncCategoryProjects: 'Objects and projects', syncCategoryProjectsHint: 'Object cards, projects and order', syncCategoryStaff: 'Staff and timesheets', syncCategoryStaffHint: 'People, shifts, overtime and payroll', syncCategoryFinance: 'Finance', syncCategoryFinanceHint: 'Income, expenses, contracts and calculations', syncCategoryWarehouse: 'Inventory and materials', syncCategoryWarehouseHint: 'Materials, equipment and stock', syncCategoryDocuments: 'Documents and reports', syncCategoryDocumentsHint: 'Documents, acts, reports and local files', syncCategoryProfile: 'Profile and settings', syncCategoryProfileHint: 'Passport, connections and workspace',
  syncSelected: 'Sync selected', syncAll: 'Sync everything', syncSelectOne: 'Select at least one section.',
  syncPendingTotal: 'TOTAL NOT SYNCHRONIZED', syncSectionOne: 'section', syncSectionFew: 'sections', syncSectionMany: 'sections', syncSubsectionOne: 'subsection', syncSubsectionFew: 'subsections', syncSubsectionMany: 'subsections',
  syncServerOnlyNote: 'Internet required: new AI analysis, external messages, current supplier offers and other server-only functions.',
  syncServerRole: 'SERVER', syncServerMain: 'Primary data source', syncDeviceRole: 'DEVICE', syncDeviceCopy: 'Working local copy', syncEngineRole: 'SYNC ENGINE', syncEngineCopy: 'Continuously reconciles data',
  syncOnlineTitle: 'Internet is available', syncOnlineCopy: 'Data will be saved on the phone and sent to the cloud.', syncOfflineTitle: 'Offline mode', syncOfflineCopy: 'Data will be saved on the phone and queued until the network returns.',
  syncStatePreparingTitle: 'Preparing the local copy', syncStatePreparingCopy: 'Saving data on this device', syncStateOfflineTitle: 'Ready to work offline', syncStateOfflineCopy: 'Changes stay on the phone until the network returns', syncStateReadyTitle: 'Local copy is ready', syncStateReadyCopy: 'Cloud delivery is waiting for the server connection', syncStateSyncedTitle: 'Data synchronized', syncStateSyncedCopy: 'Phone and StructOS Cloud are reconciled', syncStateErrorTitle: 'Synchronization needs retrying', syncStateErrorCopy: 'Local data is saved and has not been lost', syncOpen: 'Open', syncLastSaved: 'Saved on phone',
  syncProgressSaving: 'Saving selected data on the phone…', syncProgressCloud: 'Reconciling changes with StructOS Cloud…', syncToastOffline: 'Data is saved on the phone and ready for offline work', syncToastDevice: 'Local copy updated; cloud delivery is queued', syncToastCloud: 'Phone and StructOS Cloud are synchronized'
});
Object.assign(copy.KY, {
  syncTitle: 'СИНХРОНДОШТУРУУ', syncSubtitle: 'Интернетсиз офлайн иштөө үчүн маалыматтарды телефонго сактап синхрондоштуруңуз.',
  syncInternetAvailable: 'ИНТЕРНЕТ БАР', syncOnlineFlow: 'Телефон ↔ StructOS Cloud', syncInternetLost: 'ИНТЕРНЕТ ЖОГОЛДУ', syncOfflineFlow: 'Телефон ишин улантат', syncInternetRestored: 'ИНТЕРНЕТ КАЙТТЫ', syncRestoredFlow: 'Автоматтык синхрондоштуруу',
  syncDialogTitle: 'Эмнени синхрондоштуруу керек?', syncDialogHint: 'Телефонго сакталуучу жана StructOS Cloud менен салыштырылуучу маалыматтарды тандаңыз.', syncChooseData: 'Синхрондоштуруучу маалыматтар',
  syncCategoryProjects: 'Объекттер жана долбоорлор', syncCategoryProjectsHint: 'Объект карталары, долбоорлор жана тартип', syncCategoryStaff: 'Кызматкерлер жана табелдер', syncCategoryStaffHint: 'Адамдар, сменалар, ашыкча иш жана төлөмдөр', syncCategoryFinance: 'Каржы', syncCategoryFinanceHint: 'Киреше, чыгаша, келишим жана эсептер', syncCategoryWarehouse: 'Кампа жана материалдар', syncCategoryWarehouseHint: 'Материалдар, жабдуу жана калдыктар', syncCategoryDocuments: 'Документтер жана отчёттор', syncCategoryDocumentsHint: 'Документтер, актылар, отчёттор жана файлдар', syncCategoryProfile: 'Профиль жана жөндөөлөр', syncCategoryProfileHint: 'Паспорт, байланыштар жана иш мейкиндиги',
  syncSelected: 'Тандалганды синхрондоштуруу', syncAll: 'Баарын синхрондоштуруу', syncSelectOne: 'Жок дегенде бир бөлүмдү тандаңыз.',
  syncPendingTotal: 'БАРДЫГЫ СИНХРОНДОШТУРУЛГАН ЭМЕС', syncSectionOne: 'бөлүм', syncSectionFew: 'бөлүм', syncSectionMany: 'бөлүм', syncSubsectionOne: 'бөлүмчө', syncSubsectionFew: 'бөлүмчө', syncSubsectionMany: 'бөлүмчө',
  syncServerOnlyNote: 'Интернет менен гана: жаңы AI талдоосу, тышкы билдирүүлөр, жеткирүүчүлөрдүн учурдагы сунуштары жана башка сервердик функциялар.',
  syncServerRole: 'SERVER', syncServerMain: 'Негизги маалымат булагы', syncDeviceRole: 'DEVICE', syncDeviceCopy: 'Жумушчу жергиликтүү көчүрмө', syncEngineRole: 'SYNC ENGINE', syncEngineCopy: 'Маалыматтарды туруктуу салыштырат',
  syncOnlineTitle: 'Интернет жеткиликтүү', syncOnlineCopy: 'Маалымат телефонго сакталат жана булутка жөнөтүлөт.', syncOfflineTitle: 'Интернетсиз иштөө', syncOfflineCopy: 'Маалымат телефонго сакталат жана тармак келгенге чейин кезекте турат.',
  syncStatePreparingTitle: 'Жергиликтүү көчүрмө даярдалууда', syncStatePreparingCopy: 'Маалымат түзмөккө сакталууда', syncStateOfflineTitle: 'Офлайн иштөөгө даяр', syncStateOfflineCopy: 'Өзгөртүүлөр тармак келгенге чейин телефондо сакталат', syncStateReadyTitle: 'Жергиликтүү көчүрмө даяр', syncStateReadyCopy: 'Булутка жөнөтүү сервер байланышын күтөт', syncStateSyncedTitle: 'Маалымат синхрондошту', syncStateSyncedCopy: 'Телефон менен StructOS Cloud салыштырылды', syncStateErrorTitle: 'Кайра синхрондоштуруу керек', syncStateErrorCopy: 'Жергиликтүү маалымат сакталды жана жоголгон жок', syncOpen: 'Ачуу', syncLastSaved: 'Телефонго сакталды',
  syncProgressSaving: 'Тандалган маалымат телефонго сакталууда…', syncProgressCloud: 'Өзгөртүүлөр StructOS Cloud менен салыштырылууда…', syncToastOffline: 'Маалымат телефонго сакталды жана офлайн иштөөгө даяр', syncToastDevice: 'Жергиликтүү көчүрмө жаңырды; булутка жөнөтүү кезекте', syncToastCloud: 'Телефон жана StructOS Cloud синхрондошту'
});
Object.assign(copy.TJ, {
  syncTitle: 'ҲАМОҲАНГСОЗӢ', syncSubtitle: 'Барои кори офлайн бе интернет маълумотро дар телефон нигоҳ дошта, ҳамоҳанг созед.',
  syncInternetAvailable: 'ИНТЕРНЕТ ҲАСТ', syncOnlineFlow: 'Телефон ↔ StructOS Cloud', syncInternetLost: 'ИНТЕРНЕТ ҚАТЪ ШУД', syncOfflineFlow: 'Телефон корро идома медиҳад', syncInternetRestored: 'ИНТЕРНЕТ БАРҚАРОР ШУД', syncRestoredFlow: 'Ҳамоҳангсозии автоматӣ',
  syncDialogTitle: 'Чиро ҳамоҳанг созем?', syncDialogHint: 'Маълумотеро интихоб кунед, ки дар телефон нигоҳ дошта ва бо StructOS Cloud муқоиса мешавад.', syncChooseData: 'Маълумот барои ҳамоҳангсозӣ',
  syncCategoryProjects: 'Объектҳо ва лоиҳаҳо', syncCategoryProjectsHint: 'Кортҳои объект, лоиҳаҳо ва тартиб', syncCategoryStaff: 'Кормандон ва табелҳо', syncCategoryStaffHint: 'Одамон, бастҳо, изофакорӣ ва пардохт', syncCategoryFinance: 'Молия', syncCategoryFinanceHint: 'Даромад, хароҷот, шартнома ва ҳисобҳо', syncCategoryWarehouse: 'Анбор ва мавод', syncCategoryWarehouseHint: 'Мавод, таҷҳизот ва бақия', syncCategoryDocuments: 'Ҳуҷҷатҳо ва ҳисоботҳо', syncCategoryDocumentsHint: 'Ҳуҷҷатҳо, санадҳо, ҳисобот ва файлҳо', syncCategoryProfile: 'Профил ва танзимот', syncCategoryProfileHint: 'Шиноснома, алоқаҳо ва фазои корӣ',
  syncSelected: 'Ҳамоҳангсозии интихобшуда', syncAll: 'Ҳамоҳангсозии ҳама', syncSelectOne: 'Камаш як бахшро интихоб кунед.',
  syncPendingTotal: 'ҲАМАИ ҲАМОҲАНГНАШУДА', syncSectionOne: 'бахш', syncSectionFew: 'бахш', syncSectionMany: 'бахш', syncSubsectionOne: 'зербахш', syncSubsectionFew: 'зербахш', syncSubsectionMany: 'зербахш',
  syncServerOnlyNote: 'Танҳо бо интернет: таҳлили нави AI, паёмҳои беруна, пешниҳодҳои ҷории таъминкунандагон ва дигар вазифаҳои серверӣ.',
  syncServerRole: 'SERVER', syncServerMain: 'Манбаи асосии маълумот', syncDeviceRole: 'DEVICE', syncDeviceCopy: 'Нусхаи маҳаллии корӣ', syncEngineRole: 'SYNC ENGINE', syncEngineCopy: 'Маълумотро пайваста муқоиса мекунад',
  syncOnlineTitle: 'Интернет дастрас аст', syncOnlineCopy: 'Маълумот дар телефон нигоҳ дошта ва ба абр фиристода мешавад.', syncOfflineTitle: 'Кор бе интернет', syncOfflineCopy: 'Маълумот дар телефон нигоҳ дошта, то барқарории шабака дар навбат мемонад.',
  syncStatePreparingTitle: 'Омодасозии нусхаи маҳаллӣ', syncStatePreparingCopy: 'Маълумот дар дастгоҳ нигоҳ дошта мешавад', syncStateOfflineTitle: 'Барои кори офлайн омода', syncStateOfflineCopy: 'Тағйирот то барқарории шабака дар телефон мемонад', syncStateReadyTitle: 'Нусхаи маҳаллӣ омода аст', syncStateReadyCopy: 'Фиристодан ба абр пайвасти серверро интизор аст', syncStateSyncedTitle: 'Маълумот ҳамоҳанг шуд', syncStateSyncedCopy: 'Телефон ва StructOS Cloud муқоиса шуданд', syncStateErrorTitle: 'Ҳамоҳангсозиро такрор кунед', syncStateErrorCopy: 'Маълумоти маҳаллӣ нигоҳ дошта шудааст', syncOpen: 'Кушодан', syncLastSaved: 'Дар телефон нигоҳ дошта шуд',
  syncProgressSaving: 'Маълумоти интихобшуда дар телефон нигоҳ дошта мешавад…', syncProgressCloud: 'Тағйирот бо StructOS Cloud муқоиса мешавад…', syncToastOffline: 'Маълумот дар телефон нигоҳ дошта шуд ва барои офлайн омода аст', syncToastDevice: 'Нусхаи маҳаллӣ нав шуд; фиристодан ба абр дар навбат аст', syncToastCloud: 'Телефон ва StructOS Cloud ҳамоҳанг шуданд'
});

Object.assign(copy.RU, {
  games: 'Игры', gamesDescription: 'Настоящие мини-игры для короткого перерыва. Сетевая игра появится позже.', gameBonusBalance: 'Бонусы',
  gameSnake: 'Змейка', gameSnakeHint: 'Наберите 10 очков и получите бонус', gameTetris: 'Тетрис', gameTetrisHint: 'Собирайте линии', gameBlaster: 'Взрыватель', gameBlasterHint: 'Найдите безопасные клетки', gameBattleship: 'Морской бой', gameBattleshipHint: 'Потопите флот компьютера', gamePoker: 'Покер', gamePokerHint: 'Партия против компьютера', gameChess: 'Шахматы', gameCheckers: 'Шашки', gameBackgammon: 'Нарды', gameLocalTwo: 'Игра вдвоём на одном устройстве', chooseGame: 'Выберите игру', chooseGameHint: 'Игра откроется здесь и сохранит оформление StructOS.',
  earnWithStructos: 'Заработай со StructOS', earnWithStructosHint: 'Получайте бонусы за полезные действия и активность в приложении.', activityAccrual: 'Начислено за активность', fillBuilderPassport: 'Заполнить Паспорт строителя', linkSocialNetworks: 'Привязать соцсети и контакты', inviteFriend: 'Пригласить по личной ссылке', winBonus: 'Бонус за победу', playGames: 'Играть в StructOS', dailyLoginBonus: 'Ежедневный бонус за вход', monthlyActivityBonus: 'До 750 ₽ в месяц начисляется во время использования приложения', accruesEverySecond: 'Начисляются каждую секунду',
  dailyLoginReward: 'Ежедневный вход', dailyBonusTitle: 'Ежедневный бонус StructOS', dailyBonusCopy: 'Вам начислено 25 ₽ за непрерывный вход в приложение. Начисление выполняется один раз в день.', dailyBonusButton: 'Отлично', activityMonthlyAccrual: 'Активность в StructOS', gameWinReward: 'Победа в «Змейке»', gameRewardToast: 'За победу начислено 10 ₽',
  pushPermissionQuestion: 'Разрешить уведомления?', pushPermissionLoginHint: 'Получайте приглашения и важные события, даже когда StructOS закрыт.', yes: 'Да', no: 'Нет',
  connectionsWarningTitle: 'Вы теряете предложения', connectionsWarningCopy: 'Привяжите соцсети и мессенджеры, чтобы получать все приглашения и предложения.', linkNow: 'Привязать', later: 'Позже', byInvitation: 'По приглашению'
});
Object.assign(copy.EN, {
  games: 'Games', gamesDescription: 'Real mini-games for a short break. Online play is coming later.', gameBonusBalance: 'Bonuses', gameSnake: 'Snake', gameSnakeHint: 'Score 10 points to earn a bonus', gameTetris: 'Tetris', gameTetrisHint: 'Complete lines', gameBlaster: 'Minesweeper', gameBlasterHint: 'Find the safe cells', gameBattleship: 'Battleship', gameBattleshipHint: 'Sink the computer fleet', gamePoker: 'Poker', gamePokerHint: 'Play against the computer', gameChess: 'Chess', gameCheckers: 'Checkers', gameBackgammon: 'Backgammon', gameLocalTwo: 'Two players on one device', chooseGame: 'Choose a game', chooseGameHint: 'The game will open here in the StructOS style.',
  earnWithStructos: 'Earn with StructOS', earnWithStructosHint: 'Earn bonuses for useful actions and activity in the app.', activityAccrual: 'Activity earned', fillBuilderPassport: 'Complete Builder Passport', linkSocialNetworks: 'Link social networks and contacts', inviteFriend: 'Invite with your personal link', winBonus: 'Win bonus', playGames: 'Play in StructOS', dailyLoginBonus: 'Daily sign-in bonus', monthlyActivityBonus: 'Earn up to ₽750 per month while using the app', accruesEverySecond: 'Earned every second', dailyLoginReward: 'Daily sign-in', dailyBonusTitle: 'Daily StructOS bonus', dailyBonusCopy: 'You received ₽25 for signing in today.', dailyBonusButton: 'Great', activityMonthlyAccrual: 'StructOS activity', gameWinReward: 'Snake win', gameRewardToast: 'You earned ₽10 for winning', pushPermissionQuestion: 'Allow notifications?', pushPermissionLoginHint: 'Receive invitations and important updates even when StructOS is closed.', yes: 'Yes', no: 'No', connectionsWarningTitle: 'You are missing offers', connectionsWarningCopy: 'Link social networks and messengers to receive every invitation and offer.', linkNow: 'Link now', later: 'Later', byInvitation: 'By invitation'
});
Object.assign(copy.KY, {
  games: 'Оюндар', gamesDescription: 'Кыска тыныгуу үчүн чыныгы мини-оюндар. Тармактык оюн кийин кошулат.', gameBonusBalance: 'Бонустар', gameSnake: 'Жылан', gameSnakeHint: '10 упай топтоп бонус алыңыз', gameTetris: 'Тетрис', gameTetrisHint: 'Саптарды толтуруңуз', gameBlaster: 'Мина талаасы', gameBlasterHint: 'Коопсуз уячаларды табыңыз', gameBattleship: 'Деңиз согушу', gameBattleshipHint: 'Компьютердин флотун чөктүрүңүз', gamePoker: 'Покер', gamePokerHint: 'Компьютерге каршы оюн', gameChess: 'Шахмат', gameCheckers: 'Дойбу', gameBackgammon: 'Нарды', gameLocalTwo: 'Бир түзмөктө эки оюнчу', chooseGame: 'Оюнду тандаңыз', chooseGameHint: 'Оюн ушул жерде StructOS стилинде ачылат.', earnWithStructos: 'StructOS менен тап', earnWithStructosHint: 'Пайдалуу аракеттер жана активдүүлүк үчүн бонус алыңыз.', activityAccrual: 'Активдүүлүк үчүн', fillBuilderPassport: 'Куруучунун паспортун толтуруу', linkSocialNetworks: 'Соцтармактарды жана байланыштарды кошуу', inviteFriend: 'Жеке шилтеме менен чакыруу', winBonus: 'Жеңиш бонусу', playGames: 'StructOS оюндарын ойноо', dailyLoginBonus: 'Күнүмдүк кирүү бонусу', monthlyActivityBonus: 'Тиркемени колдонууда айына 750 ₽ чейин', accruesEverySecond: 'Ар секунд сайын эсептелет', dailyLoginReward: 'Күнүмдүк кирүү', dailyBonusTitle: 'StructOS күнүмдүк бонусу', dailyBonusCopy: 'Бүгүн киргениңиз үчүн 25 ₽ кошулду.', dailyBonusButton: 'Жакшы', activityMonthlyAccrual: 'StructOS активдүүлүгү', gameWinReward: '«Жылан» оюнунда жеңиш', gameRewardToast: 'Жеңиш үчүн 10 ₽ кошулду', pushPermissionQuestion: 'Билдирмелерге уруксат бересизби?', pushPermissionLoginHint: 'StructOS жабык болсо да чакырууларды жана маанилүү окуяларды алыңыз.', yes: 'Ооба', no: 'Жок', connectionsWarningTitle: 'Сиз сунуштарды жоготуп жатасыз', connectionsWarningCopy: 'Бардык чакыруулар үчүн соцтармактарды жана мессенжерлерди кошуңуз.', linkNow: 'Кошуу', later: 'Кийин', byInvitation: 'Чакыруу боюнча'
});
Object.assign(copy.TJ, {
  games: 'Бозиҳо', gamesDescription: 'Мини-бозиҳои воқеӣ барои танаффуси кӯтоҳ. Бозии шабакавӣ баъдтар илова мешавад.', gameBonusBalance: 'Бонусҳо', gameSnake: 'Морча', gameSnakeHint: '10 хол гиред ва бонус ба даст оред', gameTetris: 'Тетрис', gameTetrisHint: 'Қаторҳоро пур кунед', gameBlaster: 'Минаҷӯй', gameBlasterHint: 'Ҳуҷайраҳои бехатарро ёбед', gameBattleship: 'Ҷанги баҳрӣ', gameBattleshipHint: 'Флоти компютерро ғарқ кунед', gamePoker: 'Покер', gamePokerHint: 'Бозӣ бар зидди компютер', gameChess: 'Шоҳмот', gameCheckers: 'Шашка', gameBackgammon: 'Нард', gameLocalTwo: 'Ду бозигар дар як дастгоҳ', chooseGame: 'Бозиро интихоб кунед', chooseGameHint: 'Бозӣ дар ин ҷо бо услуби StructOS кушода мешавад.', earnWithStructos: 'Бо StructOS даромад гиред', earnWithStructosHint: 'Барои амалҳои муфид ва фаъолият бонус гиред.', activityAccrual: 'Барои фаъолият', fillBuilderPassport: 'Шиносномаи бинокорро пур кунед', linkSocialNetworks: 'Шабакаҳо ва алоқаҳоро пайваст кунед', inviteFriend: 'Бо пайванди шахсӣ даъват кунед', winBonus: 'Бонус барои ғалаба', playGames: 'Дар StructOS бозӣ кунед', dailyLoginBonus: 'Бонуси ҳаррӯзаи воридшавӣ', monthlyActivityBonus: 'Ҳангоми истифода то 750 ₽ дар як моҳ', accruesEverySecond: 'Ҳар сония ҳисоб мешавад', dailyLoginReward: 'Воридшавии ҳаррӯза', dailyBonusTitle: 'Бонуси ҳаррӯзаи StructOS', dailyBonusCopy: 'Барои воридшавии имрӯз 25 ₽ илова шуд.', dailyBonusButton: 'Олиҷаноб', activityMonthlyAccrual: 'Фаъолият дар StructOS', gameWinReward: 'Ғалаба дар «Морча»', gameRewardToast: 'Барои ғалаба 10 ₽ илова шуд', pushPermissionQuestion: 'Ба огоҳиномаҳо иҷозат медиҳед?', pushPermissionLoginHint: 'Ҳатто ҳангоми баста будани StructOS даъватҳо ва рӯйдодҳои муҳимро гиред.', yes: 'Ҳа', no: 'Не', connectionsWarningTitle: 'Шумо пешниҳодҳоро аз даст медиҳед', connectionsWarningCopy: 'Барои гирифтани ҳамаи даъватҳо шабакаҳо ва мессенҷерҳоро пайваст кунед.', linkNow: 'Пайваст кардан', later: 'Баъдтар', byInvitation: 'Бо даъват'
});

const CABINET_WELCOME_PROFILES = Object.freeze({
  user: { roleKey: 'cabinetWelcomeUserRole', phraseKeys: ['cabinetWelcomeUserOne', 'cabinetWelcomeUserTwo', 'cabinetWelcomeUserThree'] },
  executor: { roleKey: 'cabinetWelcomeExecutorRole', phraseKeys: ['cabinetWelcomeUserOne', 'cabinetWelcomeUserTwo', 'cabinetWelcomeUserThree'] },
  supplier: { roleKey: 'cabinetWelcomeSupplierRole', phraseKeys: ['cabinetWelcomeUserOne', 'cabinetWelcomeUserTwo', 'cabinetWelcomeUserThree'] },
  aggregator: { roleKey: 'cabinetWelcomeAggregatorRole', phraseKeys: ['cabinetWelcomeUserOne', 'cabinetWelcomeUserTwo', 'cabinetWelcomeUserThree'] }
});

let language = copy[localStorage.getItem('structos-language')] ? localStorage.getItem('structos-language') : 'RU';
let currentId = '4 820 197';
let authClient = null;
let toastTimer;
const STATISTICS_USERS_BASE = 1324;
const STATISTICS_USERS_EPOCH = Date.parse('2026-08-29T07:42:00Z');
const STATISTICS_USERS_STEP = 45 * 60 * 1000;
const STATISTICS_ONLINE_STEP = 2000;
const STATISTICS_HOUR_FORMATTER = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Moscow', hour: '2-digit', hourCycle: 'h23' });
let serverReferralCount = 0;
const DEMO_SESSION_KEY = 'structos-demo-session';
const FINANCE_KEY = 'structos-finance-v1';
const PUSH_REMINDER_KEY = 'structos-push-reminder-next-v1';
const ACTIVE_BONUS_MONTHLY = 750;
const ACTIVE_BONUS_RATE = ACTIVE_BONUS_MONTHLY / (30 * 24 * 60 * 60);
const DAILY_LOGIN_REWARD = 25;
const SNAKE_WIN_REWARD = 10;
const PROFILE_PLAN_KEY = 'structos-profile-plan-v1';
const UPLOADS_KEY = 'structos-analysis-uploads-v1';
const OBJECT_NAME_KEY = 'structos-analysis-object-name';
const OBJECTS_KEY = 'structos-objects-v1';
const COMMERCIAL_PROPOSALS_KEY = 'structos-commercial-proposals-v2';
const OBJECT_ORDER_KEY = 'structos-object-order-v1';
const INVITED_OBJECTS_KEY = 'structos-invited-objects-v1';
const HOME_NOTIFICATION_READ_KEY = 'structos-home-notification-read-v1';
const PROFILE_COMPLETION_KEY = 'structos-profile-completion';
const PERSON_DATA_KEY = 'structos-person-data-v1';
const PROFILE_DATA_KEY = 'structos-profile-data-v1';
const BUILDER_PASSPORT_KEY = 'structos-builder-passport-v1';
const STRUCTOS_CONNECTIONS_KEY = 'structos-connections-v1';
const STRUCTOS_DOCUMENT_BRAND = Object.freeze({ name: 'StructOS', made: 'Сделано на StructOS', site: 'www.structOS.ru', slogan: 'Единый Строительный Интеллект в России №1' });
const BOTTOM_MENU_STATE_KEY = 'structos-bottom-menu-open-v1';
const PROJECT_CARD_STATE_KEY = 'structos-project-card-state-v1';
const ACTIVITY_KEY = 'structos-construction-activity-v1';
const FIRST_ACTIVITY_KEY = 'structos-first-activity-v1';
const PENDING_TRANSFER_KEY = 'structos-pending-transfer-v1';
const AUTH_RETURN_KEY = 'structos-auth-return-v1';
const WIDGET_STYLES_KEY = 'structos-space-widget-styles-v1';
const TODO_KEY = 'structos-space-todo-v1';
const CASHFLOW_KEY = 'structos-cashflow-v1';
const CASHFLOW_FILE_DB = 'structos-cashflow-files-db';
const CASHFLOW_FILE_STORE = 'files';
const CASH_ATTACHMENT_KINDS = ['project', 'contract', 'estimate'];
const CASH_SOURCE_DOCUMENT_KINDS = ['project', 'estimate'];
const CASH_ORGANIZATION_ROLES = ['contractor', 'customer'];
const LEGACY_STATEMENT_TITLES = new Set(['Ведомость выполненных работ', 'Completed works statement', 'Аткарылган иштердин ведомосту', 'Ведомости корҳои иҷрошуда']);
const ACTIVE_OBJECT_LIMIT = 1;
const uploadRules = {
  project: { accept: '.pdf,.dwg,.rvt,.jpg,.jpeg,.png,.webp,.heic,image/*', extensions: ['pdf', 'dwg', 'rvt', 'jpg', 'jpeg', 'png', 'webp', 'heic'], formats: 'PDF, DWG, RVT, JPG, PNG, WEBP, HEIC', maxMb: 500 },
  contract: { accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,image/*', extensions: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'heic'], formats: 'PDF, DOC, DOCX, JPG, PNG, WEBP, HEIC', maxMb: 100 },
  estimate: { accept: '.xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png,.webp,.heic,image/*', extensions: ['xlsx', 'xls', 'csv', 'pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic'], formats: 'XLSX, XLS, CSV, PDF, JPG, PNG, WEBP, HEIC', maxMb: 100 }
};
let selectedAnalysis = 'project';
let analysisTimer;
let activeUploadKind = 'project';
let activeUploadMode = 'standard';
let pendingFile = null;
let pendingUploadSourceFile = null;
let activeUploadObjectId = null;
let newObjectNameDraft = '';
let projectObjectWizardDraft = null;
let revisionAnalysisTimer;
let activeRevisionComparisonId = null;
let activeAnalysisDocument = { objectId: null, kind: 'project', versionId: null };
let activeProjectAnalysisTab = 'proposal';
let activeCommercialProposalResultTab = 'smr';
let activeCommercialProposalId = null;
let activeCommercialProposalColumn = 'smr';
let activeCommercialProposalGroup = 'specificationWorks';
let commercialProposalAnalysisTimer;
const commercialProposalDrafts = {
  project: { objectName: '', sectionName: '', file: null, sourceFile: null, busy: false },
  estimate: { objectName: '', sectionName: '', file: null, sourceFile: null, busy: false }
};
const COMMERCIAL_PROPOSAL_PRICE_MODES = Object.freeze({
  cash: { label: 'priceCash', direction: 'none', rate: 0 },
  includedVat22: { label: 'priceIncludesVat22', direction: 'subtract', rate: .22 },
  includedTax6: { label: 'priceIncludesTax6', direction: 'subtract', rate: .06 },
  includedVat5: { label: 'priceIncludesVat5', direction: 'subtract', rate: .05 }
});
const COMMERCIAL_PROPOSAL_CUSTOM_TAX_ID = 'customTax';
const widgetColors = ['#0b63ce', '#00a9df', '#04a77b', '#41a447', '#d5a800', '#e87919', '#d64254', '#7957d5', '#c04ea3', '#44546a'];

function loadFinance() {
  try {
    const saved = JSON.parse(localStorage.getItem(FINANCE_KEY) || 'null');
    if (saved && Number.isFinite(saved.balance) && Number.isFinite(saved.bonuses)) {
      saved.balanceHistory = Array.isArray(saved.balanceHistory) ? saved.balanceHistory : [];
      saved.bonusHistory = Array.isArray(saved.bonusHistory) ? saved.bonusHistory : [];
      saved.rewards ||= {};
      saved.rewards.passportFirst = Boolean(saved.rewards.passportFirst);
      saved.rewards.passport65 = Boolean(saved.rewards.passport65 || saved.rewards.passportFull);
      saved.rewards.profileFull = Boolean(saved.rewards.profileFull);
      saved.rewards.accountLinks = saved.rewards.accountLinks && typeof saved.rewards.accountLinks === 'object' ? saved.rewards.accountLinks : {};
      saved.rewards.dailyLoginDate = String(saved.rewards.dailyLoginDate || '');
      saved.rewards.gameWins = saved.rewards.gameWins && typeof saved.rewards.gameWins === 'object' ? saved.rewards.gameWins : {};
      return saved;
    }
  } catch {}
  return {
    balance: 0,
    bonuses: 200,
    balanceHistory: [],
    bonusHistory: [{ key: 'passportFirstReward', amount: 200, date: new Date().toISOString() }],
    rewards: { passportFirst: true, passport65: false, profileFull: false, accountLinks: {}, dailyLoginDate: '', gameWins: {} }
  };
}

const finance = loadFinance();

const profilePlans = [
  { key: 'demo', labelKey: 'demoVersion' },
  { key: 'user', labelKey: 'userTariff' },
  { key: 'executor', labelKey: 'executorPlan' },
  { key: 'supplier', labelKey: 'supplierPlan' },
  { key: 'aggregator', labelKey: 'aggregatorPlan' }
];
let profilePlan = profilePlans.some((plan) => plan.key === localStorage.getItem(PROFILE_PLAN_KEY)) ? localStorage.getItem(PROFILE_PLAN_KEY) : 'user';

const structosConnectionProviders = [
  { key: 'yandex', labelKey: 'yandexAccount', icon: 'Я', className: 'is-yandex' },
  { key: 'vk', labelKey: 'vkAccount', icon: 'VK', className: 'is-vk' },
  { key: 'telegram', labelKey: 'telegramAccount', icon: '✈', className: 'is-telegram' },
  { key: 'whatsapp', labelKey: 'whatsappAccount', icon: 'W', className: 'is-whatsapp' },
  { key: 'max', labelKey: 'maxAccount', icon: 'M', className: 'is-max' },
  { key: 'phone', labelKey: 'phoneAccount', icon: '☎', className: 'is-phone', profileField: 'phone' },
  { key: 'email', labelKey: 'emailAccount', icon: '@', className: 'is-email', profileField: 'email' }
];

function loadStructosConnections() {
  const saved = readStoredJSON(STRUCTOS_CONNECTIONS_KEY, {});
  return Object.fromEntries(structosConnectionProviders.map(({ key }) => [key, Boolean(saved?.[key]?.linked)]));
}

let structosConnections = loadStructosConnections();

function loadActivityLog() {
  const stored = readStoredJSON(ACTIVITY_KEY, []);
  if (!Array.isArray(stored)) return [];
  return stored.filter((entry) => entry && ['cabinet', 'project'].includes(entry.type) && entry.date)
    .map((entry) => ({ type: entry.type, action: String(entry.action || 'action').slice(0, 80), date: entry.date }))
    .filter((entry) => Number.isFinite(new Date(entry.date).getTime()))
    .slice(-1200);
}

let activityLog = loadActivityLog();

function ensureFirstActivityDate() {
  const saved = localStorage.getItem(FIRST_ACTIVITY_KEY);
  if (saved && Number.isFinite(new Date(saved).getTime())) return saved;
  const knownDates = [
    ...(finance.balanceHistory || []).map((entry) => entry.date),
    ...(finance.bonusHistory || []).map((entry) => entry.date),
    ...objectRegistry.flatMap((object) => [object.uploadedAt, object.analyzedAt, object.startedAt, object.completedAt]),
    ...activityLog.map((entry) => entry.date)
  ].filter((value) => Number.isFinite(new Date(value).getTime()));
  const first = knownDates.length ? knownDates.sort((a, b) => new Date(a) - new Date(b))[0] : new Date().toISOString();
  localStorage.setItem(FIRST_ACTIVITY_KEY, first);
  return first;
}

function recordActivity(type, action, options = {}) {
  if (!['cabinet', 'project'].includes(type)) return;
  const now = new Date();
  const actionKey = String(action || 'action').slice(0, 80);
  const sameDay = options.daily && activityLog.some((entry) => entry.type === type && entry.action === actionKey && new Date(entry.date).toDateString() === now.toDateString());
  const recentlyRecorded = !options.daily && activityLog.some((entry) => entry.type === type && entry.action === actionKey && now - new Date(entry.date) < 60000);
  if (sameDay || recentlyRecorded) return;
  activityLog.push({ type, action: actionKey, date: now.toISOString() });
  activityLog = activityLog.slice(-1200);
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activityLog));
  renderConstructionActivity();
}

function constructionActivityData() {
  const now = new Date();
  const periodStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const recent = activityLog.filter((entry) => new Date(entry.date) >= periodStart);
  const cabinet = recent.filter((entry) => entry.type === 'cabinet').length;
  const project = recent.filter((entry) => entry.type === 'project').length;
  const activeDays = new Set(recent.map((entry) => new Date(entry.date).toISOString().slice(0, 10))).size;
  const invited = (finance.bonusHistory || []).filter((entry) => entry.key === 'referralReward').length;
  const first = new Date(ensureFirstActivityDate());
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstStart = new Date(first.getFullYear(), first.getMonth(), first.getDate());
  const days = Math.max(1, Math.floor((todayStart - firstStart) / 86400000) + 1);
  const score = Math.min(100, cabinet * 2 + project * 5 + activeDays * 3 + invited * 8);
  return { cabinet, project, total: cabinet + project, days, invited, score };
}

function renderConstructionActivity() {
  const data = constructionActivityData();
  $$('[data-construction-activity]').forEach((card) => {
    const value = $('[data-business-activity]', card);
    const progress = $('[data-activity-progress]', card);
    if (value) value.textContent = `${data.score}%`;
    if (progress) {
      progress.style.setProperty('--activity-progress', `${data.score}%`);
      progress.setAttribute('aria-label', tr('profileActivity'));
      progress.setAttribute('aria-valuenow', String(data.score));
    }
  });
}

function activityActionFromElement(element) {
  const ignored = '[data-bottom-menu-toggle],[data-tab],[data-menu-open],[data-menu-close],[data-refresh-page],[data-force-refresh],[data-theme-toggle],[data-language]';
  if (element.matches(ignored)) return null;
  const projectAction = element.matches('[data-analysis-type],[data-run-analysis],[data-open-object],[data-my-project],[data-open-object-analysis],[data-view-object-report],[data-object-upload],[data-start-ready],[data-open-report-document],[data-project-analysis-tab]')
    || ['projects', 'analysis-detail', 'objects', 'cashflow'].includes(element.closest('[data-panel]')?.dataset.panel);
  const datasetKey = Object.entries(element.dataset).find(([key]) => !['i18n'].includes(key));
  const action = datasetKey ? `${datasetKey[0]}:${datasetKey[1] || 'click'}` : (element.getAttribute('aria-label') || element.textContent || element.tagName).trim().slice(0, 80);
  return { type: projectAction ? 'project' : 'cabinet', action };
}

function trackConstructionActivity(event) {
  if (!event.isTrusted) return;
  const element = event.target.closest('button,a,select');
  if (!element) return;
  const activity = activityActionFromElement(element);
  if (activity) recordActivity(activity.type, activity.action);
}

function fileVersionSnapshot(file) {
  const addedAt = file?.addedAt || new Date().toISOString();
  const name = String(file?.name || tr('selectFile'));
  const size = Number(file?.size) || 0;
  const lastModified = Number(file?.lastModified) || Number(new Date(addedAt)) || Date.now();
  const structuredFields = {};
  ['analysisData', 'analysisResult', 'result', 'extractedData', 'extraction', 'estimateBreakdown', 'commercialProposal', 'proposalBreakdown', 'boq', 'items', 'positions', 'rows', 'works', 'materials', 'services', 'equipment', 'specification'].forEach((key) => {
    if (file?.[key] != null) structuredFields[key] = file[key];
  });
  return {
    id: String(file?.versionId || file?.id || `version-${lastModified}-${size}-${name}`),
    name,
    size,
    type: String(file?.type || ''),
    lastModified,
    addedAt,
    analyzedAt: file?.analyzedAt || null,
    analysisPending: Boolean(file?.analysisPending === true || !file?.analyzedAt),
    ...(Object.prototype.hasOwnProperty.call(file || {}, 'contractNumber') ? { contractNumber: String(file.contractNumber || '').slice(0, 60) } : {}),
    ...(Object.prototype.hasOwnProperty.call(file || {}, 'projectSection') ? { projectSection: String(file.projectSection || '').slice(0, 140) } : {}),
    ...(Array.isArray(file?.sourceCatalog) ? { sourceCatalog: file.sourceCatalog.slice(0, 2000) } : {}),
    ...(Object.prototype.hasOwnProperty.call(file || {}, 'sourceCatalogScanned') ? { sourceCatalogScanned: Boolean(file.sourceCatalogScanned) } : {}),
    ...structuredFields
  };
}

function sameFileMetadata(first, second) {
  if (!first || !second) return false;
  return String(first.name || '') === String(second.name || '')
    && Number(first.size || 0) === Number(second.size || 0)
    && Number(first.lastModified || 0) === Number(second.lastModified || 0);
}

function fileVersions(file) {
  const saved = Array.isArray(file?.versions) ? file.versions.filter((version) => version?.name).map(fileVersionSnapshot) : [];
  const current = fileVersionSnapshot(file);
  if (!saved.length) return [current];
  if (!sameFileMetadata(saved[saved.length - 1], current)) saved.push(current);
  else saved[saved.length - 1] = { ...saved[saved.length - 1], ...current, id: saved[saved.length - 1].id || current.id };
  return saved;
}

function normalizeFileRecord(file) {
  if (!file?.name) return file;
  const current = fileVersionSnapshot(file);
  let comparison = file.comparison?.previous && file.comparison?.current ? {
    ...file.comparison,
    previous: fileVersionSnapshot(file.comparison.previous),
    current: fileVersionSnapshot(file.comparison.current)
  } : null;
  const recoveredComparison = comparison?.status === 'pending';
  if (recoveredComparison) {
    const analyzedAt = comparison.analyzedAt || new Date().toISOString();
    comparison = { ...comparison, status: 'ready', analyzedAt, current: { ...comparison.current, analyzedAt } };
  }
  return { ...file, ...current, kind: file.kind, versions: fileVersions(file), comparison, analysisPending: recoveredComparison ? false : file.analysisPending, analyzedAt: recoveredComparison ? comparison.analyzedAt : file.analyzedAt };
}

function fileVersionCount(file) {
  return file ? fileVersions(file).length : 0;
}

function latestDocumentVersion(file) {
  const versions = file ? fileVersions(file) : [];
  return versions[versions.length - 1] || null;
}

function documentVersionById(file, versionId) {
  const versions = file ? fileVersions(file) : [];
  return versions.find((version) => version.id === versionId) || versions[versions.length - 1] || null;
}

function isDocumentVersionAnalyzed(version) {
  return Boolean(version?.analyzedAt && version.analysisPending !== true);
}

function syncLatestDocumentVersion(file, versions) {
  if (!file || !Array.isArray(versions) || !versions.length) return file;
  const latest = fileVersionSnapshot(versions[versions.length - 1]);
  const syncedFields = ['id', 'name', 'size', 'type', 'lastModified', 'addedAt', 'analyzedAt', 'analysisPending', 'contractNumber', 'projectSection', 'sourceCatalog', 'sourceCatalogScanned', 'analysisData', 'analysisResult', 'result', 'extractedData', 'extraction', 'estimateBreakdown', 'commercialProposal', 'proposalBreakdown', 'boq', 'items', 'positions', 'rows', 'works', 'materials', 'services', 'equipment', 'specification'];
  syncedFields.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(latest, key)) file[key] = latest[key];
    else if (key !== 'projectSection') delete file[key];
  });
  file.versions = versions.map(fileVersionSnapshot);
  return file;
}

function updateDocumentVersion(file, versionId, patch) {
  if (!file) return null;
  let updated = null;
  const versions = fileVersions(file).map((version) => {
    if (version.id !== versionId) return version;
    updated = fileVersionSnapshot({ ...version, ...patch, id: version.id });
    return updated;
  });
  if (!updated) return null;
  file.versions = versions;
  if (versions[versions.length - 1]?.id === versionId) syncLatestDocumentVersion(file, versions);
  return updated;
}

function fileFormatLabel(file) {
  const extension = String(file?.name || '').split('.').pop()?.toUpperCase();
  return extension && extension !== String(file?.name || '').toUpperCase() ? extension : (String(file?.type || '').split('/').pop()?.toUpperCase() || '—');
}

function versionComparisonChanges(previous, current) {
  return [
    { key: 'fileNameLabel', before: previous.name, after: current.name, changed: previous.name !== current.name },
    { key: 'fileSizeLabel', before: formatStorage(previous.size), after: formatStorage(current.size), changed: Number(previous.size) !== Number(current.size) },
    { key: 'fileFormatLabel', before: fileFormatLabel(previous), after: fileFormatLabel(current), changed: fileFormatLabel(previous) !== fileFormatLabel(current) },
    { key: 'fileModifiedLabel', before: formatObjectDateTime(previous.lastModified), after: formatObjectDateTime(current.lastModified), changed: Number(previous.lastModified) !== Number(current.lastModified) }
  ];
}

function loadUploads() {
  try {
    const saved = JSON.parse(localStorage.getItem(UPLOADS_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      return {
        project: saved.project?.name ? normalizeFileRecord(saved.project) : null,
        contract: saved.contract?.name ? normalizeFileRecord(saved.contract) : null,
        estimate: saved.estimate?.name ? normalizeFileRecord(saved.estimate) : null
      };
    }
  } catch {}
  return { project: null, contract: null, estimate: null };
}

const selectedFiles = loadUploads();

function normalizeProjectDocumentTitles(value) {
  const titles = value && typeof value === 'object' ? value : {};
  return {
    contract: String(titles.contract || '').trim().slice(0, 160),
    estimate: String(titles.estimate || '').trim().slice(0, 160)
  };
}

function commercialProposalWorkspaceNumber(value) {
  const normalized = String(value ?? '').replace(/\s+/g, '').replace(',', '.').replace(/[^\d.-]+/g, '');
  const number = Number(normalized);
  return Number.isFinite(number) ? Math.max(0, Math.min(number, 1_000_000_000)) : 0;
}

function normalizeCommercialProposalTaxModes(value, legacyMode = 'cash') {
  const rawModes = Array.isArray(value) ? value : [legacyMode];
  const normalized = [];
  rawModes.forEach((id) => {
    const mode = COMMERCIAL_PROPOSAL_PRICE_MODES[id];
    if (!mode || mode.direction !== 'subtract' || normalized.includes(id)) return;
    normalized.push(id);
  });
  return normalized;
}

function normalizeCommercialProposalCustomTax(value) {
  const customTax = value && typeof value === 'object' ? value : {};
  return {
    enabled: Boolean(customTax.enabled),
    name: String(customTax.name || '').trim().slice(0, 80),
    rate: Math.min(100, commercialProposalWorkspaceNumber(customTax.rate))
  };
}

const COMMERCIAL_PROPOSAL_LABOR_SOURCE_IDS = Object.freeze([
  'specificationWorks',
  'outsideSpecificationWorks',
  'possibleWorks',
  'associatedWorks',
  'my'
]);

function normalizeCommercialProposalWorkspace(value) {
  const workspace = value && typeof value === 'object' ? value : {};
  const sourceGroups = new Set(['specificationWorks', 'outsideSpecificationWorks', 'possibleWorks', 'associatedWorks', 'equipment', 'materials', 'possibleEquipment', 'possibleMaterials', 'toolsAndConsumables', 'consumableMaterials', 'laborHours']);
  const validGroups = new Set([...sourceGroups, 'my', 'materialsMy']);
  const itemValues = {};
  Object.entries(workspace.itemValues && typeof workspace.itemValues === 'object' ? workspace.itemValues : {}).slice(0, 2000).forEach(([id, item]) => {
    const safeId = String(id || '').slice(0, 160);
    if (!safeId) return;
    itemValues[safeId] = {
      quantity: commercialProposalWorkspaceNumber(item?.quantity),
      price: commercialProposalWorkspaceNumber(item?.price),
      projectSource: item?.projectSource === 'spec' ? 'spec' : item?.projectSource === 'project' ? 'project' : '',
      associatedFor: String(item?.associatedFor || '').trim().slice(0, 240)
    };
  });
  const savedLaborSettings = workspace.laborSettings && typeof workspace.laborSettings === 'object' ? workspace.laborSettings : {};
  const savedContacts = workspace.contacts && typeof workspace.contacts === 'object' ? workspace.contacts : {};
  const customTax = normalizeCommercialProposalCustomTax(workspace.customTax);
  const laborItemHours = {};
  Object.entries(savedLaborSettings.itemHours && typeof savedLaborSettings.itemHours === 'object' ? savedLaborSettings.itemHours : {}).slice(0, 2000).forEach(([id, hours]) => {
    const safeId = String(id || '').slice(0, 160);
    if (safeId) laborItemHours[safeId] = commercialProposalWorkspaceNumber(hours);
  });
  const selectedLaborSources = Array.isArray(savedLaborSettings.sourceGroups)
    ? COMMERCIAL_PROPOSAL_LABOR_SOURCE_IDS.filter((id) => savedLaborSettings.sourceGroups.includes(id))
    : ['specificationWorks', 'my'];
  const normalizeWorkspaceItem = (item, allowMy = false) => {
    const id = String(item?.id || '').slice(0, 160);
    const name = String(item?.name || '').trim().slice(0, 240);
    const sourceGroup = validGroups.has(item?.sourceGroup) && (allowMy || sourceGroups.has(item?.sourceGroup)) ? item.sourceGroup : 'specificationWorks';
    if (!id || !name) return null;
    return {
      id,
      sourceGroup,
      name,
      unit: String(item?.unit || '').trim().slice(0, 40),
      quantity: commercialProposalWorkspaceNumber(item?.quantity),
      price: commercialProposalWorkspaceNumber(item?.price),
      sourceName: String(item?.sourceName || '').trim().slice(0, 240),
      sourceSheet: String(item?.sourceSheet || '').trim().slice(0, 120),
      projectSource: item?.projectSource === 'spec' ? 'spec' : item?.projectSource === 'project' ? 'project' : '',
      associatedFor: String(item?.associatedFor || '').trim().slice(0, 240),
      custom: Boolean(item?.custom)
    };
  };
  const customItems = Array.isArray(workspace.customItems) ? workspace.customItems.slice(0, 1000).map((item) => normalizeWorkspaceItem(item)).filter(Boolean) : [];
  const myItems = Array.isArray(workspace.myItems) ? workspace.myItems.slice(0, 1000).map((item) => normalizeWorkspaceItem(item, true)).filter(Boolean) : [];
  return {
    taxModes: normalizeCommercialProposalTaxModes(workspace.taxModes, workspace.taxMode),
    customTax,
    itemValues,
    customItems,
    myItems,
    contacts: {
      senderName: String(savedContacts.senderName || '').trim().slice(0, 160),
      senderOrganization: String(savedContacts.senderOrganization || '').trim().slice(0, 200),
      senderPhone: String(savedContacts.senderPhone || '').trim().slice(0, 60),
      recipientName: String(savedContacts.recipientName || '').trim().slice(0, 160),
      recipientOrganization: String(savedContacts.recipientOrganization || '').trim().slice(0, 200)
    },
    laborSettings: {
      dailyCost: commercialProposalWorkspaceNumber(savedLaborSettings.dailyCost),
      workdayHours: commercialProposalWorkspaceNumber(savedLaborSettings.workdayHours),
      sourceGroups: selectedLaborSources.length ? selectedLaborSources : ['specificationWorks'],
      peopleCount: Math.max(1, Math.round(commercialProposalWorkspaceNumber(savedLaborSettings.peopleCount)) || 1),
      foremanCount: Math.max(0, Math.round(commercialProposalWorkspaceNumber(savedLaborSettings.foremanCount))),
      foremanDailyCost: commercialProposalWorkspaceNumber(savedLaborSettings.foremanDailyCost),
      projectManagerCount: Math.max(0, Math.round(commercialProposalWorkspaceNumber(savedLaborSettings.projectManagerCount))),
      projectManagerDailyCost: commercialProposalWorkspaceNumber(savedLaborSettings.projectManagerDailyCost),
      itemHours: laborItemHours
    }
  };
}

function normalizeCommercialProposalRecord(record) {
  if (!record || typeof record !== 'object') return null;
  const kind = record.kind === 'estimate' ? 'estimate' : 'project';
  const objectName = String(record.objectName || '').trim().slice(0, 100);
  const sectionName = String(record.sectionName || '').trim().slice(0, 140);
  if (!objectName || !sectionName || !record.file?.name) return null;
  const file = normalizeFileRecord({ ...record.file, kind });
  const latest = latestDocumentVersion(file);
  const recoveredAt = record.analyzedAt || record.updatedAt || new Date().toISOString();
  if (latest && !isDocumentVersionAnalyzed(latest)) {
    updateDocumentVersion(file, latest.id, { analysisPending: false, analyzedAt: recoveredAt });
  }
  return {
    id: String(record.id || `proposal-${createObjectId()}`),
    objectName,
    sectionName,
    kind,
    status: 'ready',
    createdAt: record.createdAt || record.updatedAt || recoveredAt,
    updatedAt: record.updatedAt || recoveredAt,
    analyzedAt: record.analyzedAt || recoveredAt,
    file: normalizeFileRecord(file),
    workspace: normalizeCommercialProposalWorkspace(record.workspace)
  };
}

function loadCommercialProposalRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(COMMERCIAL_PROPOSALS_KEY) || '[]');
    if (Array.isArray(saved)) return saved.map(normalizeCommercialProposalRecord).filter(Boolean);
  } catch {}
  return [];
}

function saveCommercialProposalRecords() {
  localStorage.setItem(COMMERCIAL_PROPOSALS_KEY, JSON.stringify(commercialProposalRecords));
}

function loadObjectRegistry() {
  try {
    const saved = JSON.parse(localStorage.getItem(OBJECTS_KEY) || '[]');
    if (Array.isArray(saved)) {
      return saved
        .filter((object) => object && typeof object.name === 'string' && ['uploaded', 'ready', 'active', 'completed'].includes(object.status))
        .map((object) => ({
          id: String(object.id || `object-${Date.now()}-${Math.random().toString(16).slice(2)}`),
          name: object.name.trim().slice(0, 100) || 'Объект',
          projectTitle: String(object.projectTitle || object.name || '').trim().slice(0, 140),
          projectSection: String(object.projectSection || object.projectTitle || object.name || '').trim().slice(0, 140),
          documentTitles: normalizeProjectDocumentTitles(object.documentTitles),
          contractNumber: String(object.contractNumber || '').trim().slice(0, 60),
          workspaceOrigin: object.workspaceOrigin === 'turnkey' ? 'turnkey' : 'manual',
          status: object.status,
          createdAt: object.createdAt || object.uploadedAt || object.analyzedAt || new Date().toISOString(),
          updatedAt: object.updatedAt || null,
          analyzedAt: object.analyzedAt || (object.status === 'uploaded' ? null : new Date().toISOString()),
          uploadedAt: object.uploadedAt || object.analyzedAt || new Date().toISOString(),
          startedAt: object.startedAt || null,
          completedAt: object.completedAt || null,
          files: Array.isArray(object.files) ? object.files.slice(0, 3).map(normalizeFileRecord) : []
        }));
    }
  } catch {}
  return [];
}

let objectRegistry = loadObjectRegistry();
let commercialProposalRecords = loadCommercialProposalRecords();
let collapsedProjectIds = new Set((() => {
  const stored = readStoredJSON(PROJECT_CARD_STATE_KEY, []);
  return Array.isArray(stored) ? stored.map(String) : [];
})());
const selectedProjectVersionIds = new Map();
const visibleProjectComparisons = new Set();
const expandedProjectComparisons = new Set();
const selectedProjectVersionTabs = new Map();

function demoInvitedObject() {
  return {
    id: 'demo-invited-severny-kvartal',
    nameKey: 'demoInvitedObjectName',
    name: '',
    status: 'pending',
    invitedAt: '2026-08-25T06:45:00.000Z',
    completedAt: null,
    acceptedAt: null,
    invitedBy: 'StructOS Demo',
    roleKey: 'objectParticipant',
    files: []
  };
}

function loadInvitedObjects() {
  const stored = readStoredJSON(INVITED_OBJECTS_KEY, []);
  const objects = Array.isArray(stored) ? stored.filter((object) => object && object.id).map((object) => ({
    id: String(object.id),
    nameKey: String(object.nameKey || ''),
    name: String(object.name || '').trim().slice(0, 120),
    status: ['pending', 'active', 'completed', 'declined'].includes(object.status) ? object.status : 'pending',
    invitedAt: object.invitedAt || new Date().toISOString(),
    completedAt: object.completedAt || null,
    acceptedAt: object.acceptedAt || null,
    declinedAt: object.declinedAt || null,
    invitedBy: String(object.invitedBy || 'StructOS').slice(0, 120),
    roleKey: String(object.roleKey || 'objectParticipant'),
    files: Array.isArray(object.files) ? object.files.slice(0, 3) : []
  })) : [];
  const demo = demoInvitedObject();
  if (!objects.some((object) => object.id === demo.id)) objects.unshift(demo);
  const storedDemo = objects.find((object) => object.id === demo.id);
  if (storedDemo?.status === 'active' && !storedDemo.acceptedAt) storedDemo.status = 'pending';
  localStorage.setItem(INVITED_OBJECTS_KEY, JSON.stringify(objects));
  return objects;
}

let invitedObjects = loadInvitedObjects();
let homeReadNotificationKeys = new Set((() => {
  const stored = readStoredJSON(HOME_NOTIFICATION_READ_KEY, []);
  return Array.isArray(stored) ? stored.map(String).slice(-500) : [];
})());

function saveInvitedObjects() {
  localStorage.setItem(INVITED_OBJECTS_KEY, JSON.stringify(invitedObjects));
}

function saveHomeReadNotifications() {
  const keys = [...homeReadNotificationKeys].slice(-500);
  homeReadNotificationKeys = new Set(keys);
  localStorage.setItem(HOME_NOTIFICATION_READ_KEY, JSON.stringify(keys));
}

function invitedObjectName(object) {
  return object.nameKey ? tr(object.nameKey) : object.name || tr('invitedObject');
}

function tr(key) { return copy[language]?.[key] ?? copy.RU[key] ?? key; }

function cabinetWelcomeProfile(role) {
  const normalized = String(role || '').trim().toLocaleLowerCase('ru-RU');
  if (/поставщик|supplier|жеткир|таъмин/.test(normalized)) return CABINET_WELCOME_PROFILES.supplier;
  if (/агрегатор|aggregator|арacı|araci/.test(normalized)) return CABINET_WELCOME_PROFILES.aggregator;
  if (/исполн|executor|contractor|worker|аткар|иҷро|uygulayıcı|uygulayici/.test(normalized)) return CABINET_WELCOME_PROFILES.executor;
  return CABINET_WELCOME_PROFILES.user;
}

function playCabinetWelcome(role) {
  const entry = $('[data-cabinet-entry]');
  if (!entry) {
    document.body.classList.remove('is-cabinet-entering', 'is-cabinet-ready');
    return;
  }

  const profile = cabinetWelcomeProfile(role);
  const roleLabel = tr(profile.roleKey);
  const roleElement = $('[data-cabinet-entry-role]', entry);
  const phraseElement = $('[data-cabinet-entry-phrase]', entry);
  const messageElement = $('[data-cabinet-entry-message]', entry);

  roleElement.textContent = roleLabel;
  phraseElement.replaceChildren(...profile.phraseKeys.map((key, index) => {
    const line = document.createElement('span');
    line.className = 'cabinet-entry-line';
    line.style.setProperty('--entry-line', index);
    line.textContent = tr(key);
    return line;
  }));
  messageElement.setAttribute('aria-hidden', 'false');
  entry.setAttribute('aria-label', `${tr('cabinetWelcomeA11y')}: ${roleLabel}`);
  entry.classList.remove('is-leaving');
  requestAnimationFrame(() => entry.classList.add('is-ready'));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const displayDuration = reducedMotion ? 900 : 2850;
  const exitDuration = reducedMotion ? 80 : 720;
  window.setTimeout(() => {
    document.body.classList.add('is-cabinet-ready');
    entry.classList.add('is-leaving');
    window.setTimeout(() => {
      entry.hidden = true;
      entry.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('is-cabinet-entering', 'is-cabinet-ready');
    }, exitDuration);
  }, displayDuration);
}

function applyLanguage(next) {
  language = copy[next] ? next : 'RU';
  localStorage.setItem('structos-language', language);
  root.lang = { RU: 'ru', KY: 'ky', TJ: 'tg', EN: 'en' }[language];
  $('[data-language]').value = language;
  $('[data-refresh-page]')?.setAttribute('aria-label', tr('refreshPage'));
  $('[data-force-refresh]')?.setAttribute('aria-label', tr('forceRefresh'));
  $('[data-force-refresh]')?.setAttribute('title', tr('forceRefresh'));
  $$('[data-i18n]').forEach((element) => { element.textContent = tr(element.dataset.i18n); });
  renderFinance();
  renderProfilePlan();
  renderReferral();
  renderHomeStatistics();
  renderOfflineSyncState();
  renderAnalysisCards();
  renderObjects();
  renderWidgets();
  renderWidgetPicker();
  renderCashflow();
  renderPersonIdentity();
  renderProfilePersonalData();
  renderConnectionsSummary();
  renderPassportEditor();
  renderPassportProgress();
  renderConstructionActivity();
  updateBottomMenuAccessibility();
  if ($('[data-panel="proposals"]')?.classList.contains('is-active')) renderCommercialProposals();
  if ($('[data-panel="proposal-detail"]')?.classList.contains('is-active')) renderCommercialProposalWorkspace();
  if ($('[data-panel="analysis-detail"]')?.classList.contains('is-active')) renderAnalysisDetail();
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

function passportPublicEntries() {
  const locations = builderPassport.workLocations.filter((item) => item.country.trim() || item.city.trim()).map((item) => [item.country, item.city].filter(Boolean).join(', ')).join(' · ');
  const messengerNames = Object.entries(builderPassport.messengers).filter(([, active]) => active).map(([kind]) => tr(`${kind}Messenger`)).join(', ');
  const professions = builderPassport.professions.filter((item) => item.name).map((item) => `${item.name}${item.experience ? ` · ${item.experience} ${tr('experienceYears')}` : ''}`).join(' · ');
  const preferredSchedule = builderPassport.anySchedule || builderPassport.scheduleDays.length ? scheduleSummary() : '';
  const schedule = [preferredSchedule, builderPassport.nightShifts ? tr('nightShifts') : '', builderPassport.callFrom || builderPassport.callTo ? `${tr('bestCallTime')}: ${builderPassport.callFrom || '—'}–${builderPassport.callTo || '—'}` : ''].filter(Boolean).join(' · ');
  const values = {
    id: currentId,
    lastName: personData.lastName,
    firstName: personData.firstName,
    patronymic: personData.patronymic,
    birthDate: personData.birthDate,
    maritalStatus: personData.maritalStatus ? tr(`${personData.maritalStatus}Status`) : '',
    nationality: personData.nationality,
    citizenship: personData.citizenship,
    businessTrips: typeof builderPassport.businessTrips === 'boolean' ? tr(builderPassport.businessTrips ? 'yes' : 'no') : '',
    patent: builderPassport.patent ? tr('yes') : tr('no'),
    workPermit: builderPassport.workPermit ? tr('yes') : tr('no'),
    residenceCountry: personData.residenceCountry,
    residenceCity: profileData.city,
    nearestMetro: profileData.metro,
    phone: profileData.phone,
    email: profileData.email,
    messengers: messengerNames || (typeof builderPassport.messengerLinked === 'boolean' ? tr(builderPassport.messengerLinked ? 'yes' : 'no') : ''),
    schedule,
    professions,
    skills: builderPassport.skills.join(', '),
    workLocations: locations
  };
  const labels = { id: 'structosId', lastName: 'surname', firstName: 'givenName', patronymic: 'patronymic', birthDate: 'birthDate', maritalStatus: 'maritalStatus', nationality: 'nationality', citizenship: 'citizenship', businessTrips: 'businessTrips', patent: 'patentAvailable', workPermit: 'workPermitAvailable', residenceCountry: 'permanentResidence', residenceCity: 'residenceCity', nearestMetro: 'nearestMetro', phone: 'contactPhone', email: 'contactEmail', messengers: 'activeMessengers', schedule: 'preferredSchedule', professions: 'professions', skills: 'skills', workLocations: 'workGeography' };
  return Object.entries(labels).filter(([key]) => builderPassport.visibleFields[key] && values[key]).map(([key, label]) => ({ label: tr(label), value: String(values[key]) }));
}

function encodePassportPayload(payload) {
  const bytes = new TextEncoder().encode(JSON.stringify(payload));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/g, '');
}

function publicPassportUrl() {
  const url = new URL('./passport.html', window.location.href);
  const compactPhoto = builderPassport.visibleFields.photo && personData.photo.length < 60000 ? personData.photo : '';
  const payload = { version: 1, name: personFullName(), id: currentId, photo: compactPhoto, entries: passportPublicEntries(), updatedAt: new Date().toISOString() };
  url.hash = `p=${encodePassportPayload(payload)}`;
  return url.href;
}

async function sharePassport() {
  if (!builderPassport.important.passportAvailable) {
    passportImportantExpanded = true;
    renderPassportEditor();
    showToast(tr('passportAccessRequired'));
    return;
  }
  const url = publicPassportUrl();
  if (navigator.share) {
    try { await navigator.share({ title: `${tr('builderPassport')} · ${personFullName()}`, text: `StructOS ID ${currentId}`, url }); return; }
    catch (error) { if (error?.name === 'AbortError') return; }
  }
  try { await navigator.clipboard.writeText(url); }
  catch { const input = document.createElement('input'); input.value = url; document.body.append(input); input.select(); document.execCommand('copy'); input.remove(); }
  showToast(tr('passportLinkCopied'));
}

function resumeInformationRows() {
  const messengerNames = Object.entries(builderPassport.messengers).filter(([, active]) => active).map(([kind]) => tr(`${kind}Messenger`)).join(', ');
  const professionNames = builderPassport.professions.filter((item) => item.name).map((item) => `${item.name}${item.experience ? ` — ${item.experience} ${tr('experienceYears')}` : ''}`).join(' · ');
  const rows = [[tr('structosId'), currentId], [tr('birthDate'), personData.birthDate ? `${personData.birthDate} · ${fullYears(personData.birthDate)} ${tr('fullYears').toLocaleLowerCase()}` : ''], [tr('nationality'), personData.nationality], [tr('citizenship'), personData.citizenship], [tr('permanentResidence'), personData.residenceCountry], [tr('residenceCity'), profileData.city], [tr('nearestMetro'), profileData.metro], [tr('businessTrips'), typeof builderPassport.businessTrips === 'boolean' ? tr(builderPassport.businessTrips ? 'yes' : 'no') : '—'], [tr('professions'), professionNames || profileData.profession], [tr('skills'), builderPassport.skills.join(', ')], [tr('contactPhone'), profileData.phone], [tr('contactEmail'), profileData.email], [tr('activeMessengers'), messengerNames], [tr('preferredSchedule'), builderPassport.anySchedule || builderPassport.scheduleDays.length ? scheduleSummary() : ''], [tr('workGeography'), builderPassport.workLocations.filter((item) => item.country || item.city).map((item) => [item.country, item.city].filter(Boolean).join(', ')).join(' · ')]];
  return rows.filter(([, value]) => value).map(([label, value]) => [{ text: label, bold: true, color: '#075cd3', margin: [0, 5] }, { text: String(value), margin: [0, 5] }]);
}

async function createResumePdf() {
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([import('pdfmake/build/pdfmake.js'), import('pdfmake/build/vfs_fonts.js')]);
  const logo = await loadReportLogo();
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs || pdfFonts?.vfs || pdfFonts;
  const name = personFullName();
  const headerColumns = [{ width: 64, image: personData.photo || logo, fit: [58, 58], margin: [0, 0, 12, 0] }, { width: '*', stack: [{ text: name, fontSize: 21, bold: true, color: '#075cd3' }, { text: profileData.profession || tr('builderPassport'), fontSize: 11, color: '#43546a', margin: [0, 5, 0, 2] }, { text: `StructOS ID ${currentId}`, fontSize: 10, color: '#0b2e59' }] }];
  const definition = {
    pageSize: 'A4', pageMargins: [40, 42, 40, 92], defaultStyle: { font: 'Roboto', fontSize: 10, color: '#14213d' },
    content: [{ columns: headerColumns, columnGap: 12, margin: [0, 0, 0, 20] }, { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineColor: '#75aee9', lineWidth: 1 }] }, { text: tr('personalData'), fontSize: 14, bold: true, color: '#075cd3', margin: [0, 18, 0, 8] }, { table: { widths: [170, '*'], body: resumeInformationRows() }, layout: { hLineColor: '#d7e2ef', vLineColor: '#d7e2ef', paddingLeft: () => 9, paddingRight: () => 9, paddingTop: () => 5, paddingBottom: () => 5 } }],
    footer: () => ({ columns: [{ image: logo, width: 34 }, { width: '*', stack: [{ text: STRUCTOS_DOCUMENT_BRAND.made, bold: true, color: '#075cd3', fontSize: 9 }, { text: STRUCTOS_DOCUMENT_BRAND.site, color: '#64748b', fontSize: 7 }, { text: STRUCTOS_DOCUMENT_BRAND.slogan, color: '#64748b', fontSize: 7 }] }], columnGap: 8, margin: [40, 8, 40, 18] })
  };
  return new Promise((resolve) => pdfMake.createPdf(definition).getBlob(resolve));
}

async function shareResume() {
  try {
    const blob = await createResumePdf();
    const safeName = personFullName().replace(/[^\p{L}\p{N}_-]+/gu, '_').slice(0, 70) || 'StructOS';
    const file = new File([blob], `StructOS_Резюме_${safeName}.pdf`, { type: 'application/pdf' });
    const data = { title: `${tr('resume')} · ${personFullName()}`, text: `StructOS ID ${currentId}`, files: [file] };
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      try { await navigator.share(data); showToast(tr('resumeReady')); return; }
      catch (error) { if (error?.name === 'AbortError') return; }
    }
    downloadReportBlob(blob, file.name);
    showToast(tr('resumeReady'));
  } catch (error) { console.warn('StructOS resume export failed:', error); showToast(tr('comingSoon')); }
}

function saveFinance() {
  localStorage.setItem(FINANCE_KEY, JSON.stringify(finance));
  renderFinance();
  renderHomeStatistics();
}

function saveStructosConnections() {
  const saved = Object.fromEntries(Object.entries(structosConnections).map(([key, linked]) => [key, { linked: Boolean(linked) }]));
  localStorage.setItem(STRUCTOS_CONNECTIONS_KEY, JSON.stringify(saved));
  renderConnectionsSummary();
}

function applyPassportRewards(progress) {
  finance.rewards ||= { passportFirst: false, passport65: false };
  finance.rewards.passport65 = Boolean(finance.rewards.passport65 || finance.rewards.passportFull);
  const now = new Date().toISOString();
  let changed = false;
  if (progress > 0 && !finance.rewards.passportFirst) {
    finance.rewards.passportFirst = true;
    finance.bonuses += 200;
    finance.bonusHistory.unshift({ key: 'passportFirstReward', amount: 200, date: now });
    changed = true;
  }
  if (progress > 65 && !finance.rewards.passport65) {
    finance.rewards.passport65 = true;
    finance.bonuses += 300;
    finance.bonusHistory.unshift({ key: 'passport65Reward', amount: 300, date: now });
    changed = true;
  }
  if (changed) saveFinance();
}

function splitAuthName(fullName) {
  const parts = String(fullName || '').trim().split(/\s+/).filter(Boolean).slice(0, 3);
  if (parts.length >= 3) return { lastName: parts[0], firstName: parts[1], patronymic: parts.slice(2).join(' ') };
  if (parts.length === 2) return { firstName: parts[0], lastName: parts[1], patronymic: '' };
  return { firstName: parts[0] || '', lastName: '', patronymic: '' };
}

function seedIdentityFromAuth(fullName, metadata = {}) {
  authSeedName = String(fullName || '').trim();
  if (!personData.firstName && !personData.lastName && authSeedName) Object.assign(personData, splitAuthName(authSeedName));
  if (!profileData.phone && metadata.phone) profileData.phone = String(metadata.phone).slice(0, 60);
  if (!profileData.email && metadata.email) profileData.email = String(metadata.email).slice(0, 120);
  if (!profileData.city && metadata.city) profileData.city = String(metadata.city).slice(0, 100);
  if (!profileData.profession && metadata.primary_profession) profileData.profession = String(metadata.primary_profession).slice(0, 140);
  if (!builderPassport.professions.some((item) => item.name) && profileData.profession) builderPassport.professions[0].name = profileData.profession;
  saveIdentityState(false);
  renderPassportEditor();
}

function persistIdentityLocal() {
  localStorage.setItem(PERSON_DATA_KEY, JSON.stringify(personData));
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profileData));
  localStorage.setItem(BUILDER_PASSPORT_KEY, JSON.stringify(builderPassport));
}

let identityAutosaveTimer;

function queueIdentityAutosave() {
  clearTimeout(identityAutosaveTimer);
  identityAutosaveTimer = setTimeout(() => saveIdentityState(false), 120);
}

function saveIdentityState(syncRemote = true) {
  persistIdentityLocal();
  const passportProgress = passportCompletion();
  const profileProgress = calculatedProfileCompletion();
  localStorage.setItem(PROFILE_COMPLETION_KEY, String(profileProgress));
  applyPassportRewards(passportProgress);
  renderPersonIdentity();
  renderPassportProgress();
  renderWidgets();
  renderProfilePersonalData();
  renderConnectionsSummary();
  if (syncRemote) syncIdentityToAccount();
}

async function syncIdentityToAccount() {
  const demoSession = readStoredJSON(DEMO_SESSION_KEY, null);
  if (demoSession?.email === 'str@str.com') {
    demoSession.name = personFullName();
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(demoSession));
  }
  if (!authClient) return;
  const data = { full_name: personFullName() };
  if (profileData.phone) data.phone = profileData.phone;
  if (profileData.city) data.city = profileData.city;
  if (profileData.profession) data.primary_profession = profileData.profession;
  try { await authClient.auth.updateUser({ data }); }
  catch (error) { console.warn('StructOS profile sync is unavailable:', error); }
}

function renderPersonIdentity() {
  const name = personFullName();
  $$('[data-user-name]').forEach((item) => { item.textContent = name; });
  $$('[data-person-avatar]').forEach((avatar) => {
    avatar.innerHTML = personData.photo
      ? `<img src="${escapeHtml(personData.photo)}" alt="${escapeHtml(name)}" />`
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
  });
}

function renderPassportProgress() {
  const progress = passportCompletion();
  $$('[data-passport-progress]').forEach((item) => { item.textContent = `${progress}%`; });
  $$('[data-passport-progressbar]').forEach((bar) => {
    bar.setAttribute('aria-valuenow', String(progress));
    const fill = bar.querySelector('span, i');
    if (fill) fill.style.setProperty('--progress', `${progress}%`);
  });
}

let passportSmartSelectSerial = 0;

function passportSmartSelectMarkup({ kind, value = '', placeholder, personField = '', profileField = '', locationField = '', professionId = '', country = '', city = '' }) {
  passportSmartSelectSerial += 1;
  const listId = `passport-smart-options-${passportSmartSelectSerial}`;
  const extraAttributes = `${personField ? ` data-smart-person-field="${escapeHtml(personField)}"` : ''}${profileField ? ` data-smart-profile-field="${escapeHtml(profileField)}"` : ''}${locationField ? ` data-smart-location-field="${escapeHtml(locationField)}"` : ''}${professionId ? ` data-smart-profession-id="${escapeHtml(professionId)}"` : ''}`;
  return `<div class="passport-smart-select" data-passport-smart-select data-smart-kind="${escapeHtml(kind)}" data-smart-value="${escapeHtml(value)}" data-smart-country="${escapeHtml(country)}" data-smart-city="${escapeHtml(city)}"${extraAttributes}><input type="text" maxlength="140" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${listId}" data-smart-input value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" /><button type="button" data-smart-toggle tabindex="-1" aria-label="${escapeHtml(tr('chooseFromList'))}">⌄</button><div class="passport-smart-options" id="${listId}" role="listbox" data-smart-options hidden></div></div>`;
}

function smartSelectOptions(control) {
  const kind = control.dataset.smartKind;
  if (kind === 'country') return passportCountryDirectory.map((country) => ({ value: localizedCountryName(country), keywords: [country.code, ...Object.values(country.names), ...(countryDirectoryAliases[country.code] || [])] }));
  if (kind === 'nationality') return passportNationalityDirectory.map((nationality) => ({ value: localizedNationalityName(nationality), keywords: [nationality.code, ...Object.values(nationality.names), ...(nationalityDirectoryAliases[nationality.code] || [])] }));
  if (kind === 'city') {
    const country = countryByValue(control.dataset.smartCountry);
    return (country?.cities || []).map((city) => ({ value: city, keywords: [city, ...(cityDirectoryAliases[city] || [])] }));
  }
  if (kind === 'metro') {
    const cityKey = metroCityByValue(control.dataset.smartCity);
    return (metroDirectory[cityKey] || []).map((station) => ({ value: station, keywords: metroStationSearchKeywords(station) }));
  }
  if (kind === 'profession') return professions.map((profession) => ({ value: profession.ru, keywords: [profession.ru, profession.aliases] }));
  return [];
}

function bindPassportSmartSelects(scope, onPersonChange = null) {
  $$('[data-passport-smart-select]', scope).forEach((control) => {
    const input = $('[data-smart-input]', control);
    const optionsRoot = $('[data-smart-options]', control);
    const toggle = $('[data-smart-toggle]', control);
    let committedValue = control.dataset.smartValue || '';
    let highlightedIndex = -1;

    const close = (restore = false) => {
      if (restore) {
        committedValue = control.dataset.smartValue || '';
        input.value = committedValue;
      }
      optionsRoot.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      control.classList.remove('is-open');
      highlightedIndex = -1;
    };

    const commit = (value) => {
      committedValue = value;
      control.dataset.smartValue = value;
      input.value = value;
      const personField = control.dataset.smartPersonField;
      const profileField = control.dataset.smartProfileField;
      const locationField = control.dataset.smartLocationField;
      const professionId = control.dataset.smartProfessionId;
      if (personField) {
        personData[personField] = value;
        onPersonChange?.(personField);
      }
      if (profileField) {
        profileData[profileField] = value;
        if (profileField === 'city') profileData.metro = '';
        if (profileField === 'profession') {
          builderPassport.professions[0] ||= { id: `profession-${Date.now()}`, name: '', experience: 0 };
          builderPassport.professions[0].name = value;
        }
        onPersonChange?.(profileField);
      }
      if (professionId) {
        const profession = builderPassport.professions.find((item) => item.id === professionId);
        if (profession) profession.name = value;
        const primary = builderPassport.professions.find((item) => item.name);
        profileData.profession = primary?.name || '';
        onPersonChange?.('profession');
      }
      if (locationField) {
        const row = control.closest('[data-passport-location]');
        const item = builderPassport.workLocations.find((entry) => entry.id === row?.dataset.passportLocation);
        if (item) {
          item[locationField] = value;
          if (locationField === 'country') {
            item.city = '';
            const cityControl = $('[data-smart-kind="city"]', row);
            if (cityControl) {
              cityControl.dataset.smartCountry = value;
              cityControl.dataset.smartValue = '';
              const cityInput = $('[data-smart-input]', cityControl);
              cityInput.value = '';
              cityInput.placeholder = tr('enterCity');
            }
          }
        }
      }
      queueIdentityAutosave();
      close();
    };

    const renderOptions = (showAll = false) => {
      const allOptions = smartSelectOptions(control);
      const query = normalizeDirectoryValue(input.value);
      if (!query && !showAll) { close(false); return; }
      if (!allOptions.length) {
        const emptyKey = control.dataset.smartKind === 'city' ? 'selectCountryFirst' : control.dataset.smartKind === 'metro' ? 'noMetroMatches' : 'noMatches';
        optionsRoot.innerHTML = `<p>${tr(emptyKey)}</p>`;
      } else {
        const matches = (showAll
          ? allOptions
          : allOptions.map((option) => ({ option, score: directoryMatchScore(option.keywords, input.value) })).filter((entry) => entry.score >= 0).sort((left, right) => left.score - right.score || left.option.value.localeCompare(right.option.value, root.lang || 'ru')).map((entry) => entry.option)
        ).slice(0, showAll ? 500 : 40);
        optionsRoot.innerHTML = matches.length ? matches.map((option, index) => `<button type="button" role="option" data-smart-option="${escapeHtml(option.value)}" data-smart-index="${index}">${escapeHtml(option.value)}</button>`).join('') : `<p>${tr('noMatches')}</p>`;
      }
      optionsRoot.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      control.classList.add('is-open');
      highlightedIndex = -1;
      $$('[data-smart-option]', optionsRoot).forEach((button) => {
        button.addEventListener('pointerdown', (event) => event.preventDefault());
        button.addEventListener('click', () => commit(button.dataset.smartOption));
      });
    };

    const highlight = (direction) => {
      const buttons = $$('[data-smart-option]', optionsRoot);
      if (!buttons.length) return;
      highlightedIndex = (highlightedIndex + direction + buttons.length) % buttons.length;
      buttons.forEach((button, index) => button.classList.toggle('is-highlighted', index === highlightedIndex));
      buttons[highlightedIndex].scrollIntoView({ block: 'nearest' });
    };

    input.addEventListener('input', () => renderOptions(false));
    input.addEventListener('focus', () => { if (input.value && input.value !== committedValue) renderOptions(false); });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') { event.preventDefault(); if (optionsRoot.hidden) renderOptions(!input.value); highlight(1); }
      if (event.key === 'ArrowUp') { event.preventDefault(); if (optionsRoot.hidden) renderOptions(!input.value); highlight(-1); }
      if (event.key === 'Enter' && !optionsRoot.hidden) {
        event.preventDefault();
        const buttons = $$('[data-smart-option]', optionsRoot);
        const exact = buttons.find((button) => normalizeDirectoryValue(button.dataset.smartOption) === normalizeDirectoryValue(input.value));
        const selected = buttons[highlightedIndex] || exact || buttons[0];
        if (selected) commit(selected.dataset.smartOption);
      }
      if (event.key === 'Escape') close(true);
    });
    input.addEventListener('blur', () => setTimeout(() => close(true), 120));
    toggle?.addEventListener('click', () => {
      if (control.classList.contains('is-open')) close(true);
      else { input.focus(); renderOptions(true); }
    });
  });
}

function validatePassportSmartSelects(scope) {
  const invalid = $$('[data-passport-smart-select]', scope).find((control) => normalizeDirectoryValue($('[data-smart-input]', control)?.value) !== normalizeDirectoryValue(control.dataset.smartValue));
  if (!invalid) return true;
  const input = $('[data-smart-input]', invalid);
  showToast(tr('chooseFromList'));
  input?.focus();
  input?.dispatchEvent(new Event('input', { bubbles: true }));
  return false;
}

function passportPhotoMarkup() {
  const picture = personData.photo ? `<img src="${escapeHtml(personData.photo)}" alt="${escapeHtml(personFullName())}" />` : '<span aria-hidden="true">＋</span>';
  return `<section class="passport-photo-card"><div class="passport-photo-preview" data-passport-photo-preview>${picture}</div><div class="passport-photo-copy"><span class="passport-field-label">${tr('photo')}</span><div><button class="outline-button" type="button" data-person-photo-select>${tr(personData.photo ? 'changePhoto' : 'addPhoto')}</button>${personData.photo ? `<button class="passport-remove-photo" type="button" data-person-photo-remove>${tr('removePhoto')}</button>` : ''}</div><input type="file" accept="image/*" data-person-photo-input hidden /></div></section>`;
}

function passportInputCard(key, label, inputMarkup) {
  return `<section class="passport-field-card"><label><span class="passport-field-label">${label}</span>${inputMarkup}</label></section>`;
}

function passportIdActionsMarkup() {
  return `<section class="passport-id-actions" aria-label="${escapeHtml(tr('structosId'))}"><button type="button" class="passport-id-value" data-copy-passport-id title="${escapeHtml(tr('copyIdLabel'))}"><span>StructOS ID</span><strong>${escapeHtml(currentId)}</strong><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h2"/></svg></button><button type="button" data-share-resume title="${escapeHtml(tr('shareResume'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/><path d="M12 5v5m0 0 2-2m-2 2-2-2"/></svg><span>${tr('shareResume')}</span></button><button type="button" data-share-passport title="${escapeHtml(tr('sharePassport'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg><span>${tr('sharePassport')}</span></button></section>`;
}

function passportBusinessTripsMarkup() {
  return `<section class="passport-field-card passport-business-trips"><span class="passport-field-label">${tr('businessTrips')}</span><div><label><input type="radio" name="business-trips" value="yes" data-passport-business-trips${builderPassport.businessTrips === true ? ' checked' : ''} /><span>${tr('yes')}</span></label><label><input type="radio" name="business-trips" value="no" data-passport-business-trips${builderPassport.businessTrips === false ? ' checked' : ''} /><span>${tr('no')}</span></label></div></section>`;
}

function fullYears(birthDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(birthDate || ''))) return '';
  const birth = new Date(`${birthDate}T12:00:00`);
  if (Number.isNaN(birth.getTime()) || birth > new Date()) return '';
  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) years -= 1;
  return years >= 0 ? String(years) : '';
}

function passportBirthAgeMarkup() {
  return `<div class="passport-birth-age"><span><input type="date" max="${localDateKey()}" autocomplete="bday" data-person-field="birthDate" value="${escapeHtml(personData.birthDate)}" /></span><span class="passport-age-box"><small>${tr('fullYears')}</small><input type="text" maxlength="3" value="${escapeHtml(fullYears(personData.birthDate))}" data-person-age readonly aria-readonly="true" tabindex="-1" /></span></div>`;
}

function messengerLogoMarkup(kind) {
  if (kind === 'telegram') return '<span class="passport-messenger-logo is-telegram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 3 3.8 9.7c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.1c.2.7.1 1 .8 1 .5 0 .8-.2 1-.4l2.1-2 4.5 3.3c.8.5 1.4.3 1.6-.8L22.5 5c.3-1.4-.5-2.2-1.5-2zM9 12.2l9.9-6.3c.5-.3.9-.1.6.2l-8.2 7.4-.3 3.2-2-4.5z"/></svg></span>';
  if (kind === 'whatsapp') return '<span class="passport-messenger-logo is-whatsapp"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.7 11.7 0 0 0 12.1 0C5.7 0 .5 5.2.5 11.6c0 2 .5 4 1.5 5.7L.4 23.2l6-1.6c1.7.9 3.7 1.4 5.7 1.4 6.4 0 11.6-5.2 11.6-11.6 0-3-1.2-5.8-3.2-7.9zM12.1 21c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.6 1 1-3.5-.2-.4A9.5 9.5 0 1 1 12.1 21zm5.2-7.1c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-.9-2.1c-.2-.6-.5-.5-.7-.5H8c-.3 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3.1 1 4.2.8.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z"/></svg></span>';
  return '<span class="passport-messenger-logo is-max">M</span>';
}

function passportMessengerMarkup() {
  const missing = builderPassport.messengerLinked === false;
  const messengers = [['max', 'maxMessenger'], ['telegram', 'telegramMessenger'], ['whatsapp', 'whatsappMessenger']];
  return `<section class="passport-messenger-card${missing ? ' is-missing' : ''}"><header><div><span class="passport-field-label">${tr('messengerLinked')}</span><div class="passport-messenger-answer"><label><input type="radio" name="messenger-linked" value="yes" data-messenger-linked${builderPassport.messengerLinked === true ? ' checked' : ''} /><span>${tr('yes')}</span></label><label><input type="radio" name="messenger-linked" value="no" data-messenger-linked${missing ? ' checked' : ''} /><span>${tr('no')}</span></label></div></div></header><p class="passport-messenger-warning"${missing ? '' : ' hidden'}><strong>!</strong><span>${tr('messengerMissingHint')}</span></p><div class="passport-active-messengers"><small>${tr('activeMessengers')}</small><div>${messengers.map(([kind, label]) => `<label><input type="checkbox" data-passport-messenger="${kind}"${builderPassport.messengers[kind] ? ' checked' : ''} />${messengerLogoMarkup(kind)}<strong>${tr(label)}</strong><i>✓</i></label>`).join('')}</div></div></section>`;
}

const passportWeekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

function scheduleSummary() {
  if (builderPassport.anySchedule) return tr('anySchedule');
  if (!builderPassport.scheduleDays.length) return tr('chooseWeekdays');
  return passportWeekdays.filter((day) => builderPassport.scheduleDays.includes(day)).map((day) => tr(`weekday${day[0].toUpperCase()}${day.slice(1)}`)).join(', ');
}

function passportWorkSettingsMarkup() {
  return `<div class="passport-work-settings">${passportBusinessTripsMarkup()}<section class="passport-field-card passport-schedule-card"><span class="passport-field-label">${tr('preferredSchedule')}</span><button type="button" data-open-schedule-days${builderPassport.anySchedule ? ' disabled' : ''}><span>${escapeHtml(scheduleSummary())}</span><i>⌄</i></button><label class="passport-check-line"><input type="checkbox" data-passport-any-schedule${builderPassport.anySchedule ? ' checked' : ''} /><span>✓</span><strong>${tr('anySchedule')}</strong></label></section><section class="passport-field-card passport-business-trips passport-night-shifts"><span class="passport-field-label">${tr('nightShifts')}</span><div><label><input type="radio" name="night-shifts" value="yes" data-passport-night-shifts${builderPassport.nightShifts ? ' checked' : ''} /><span>${tr('yes')}</span></label><label><input type="radio" name="night-shifts" value="no" data-passport-night-shifts${!builderPassport.nightShifts ? ' checked' : ''} /><span>${tr('no')}</span></label></div></section><section class="passport-field-card passport-call-time"><span class="passport-field-label">${tr('bestCallTime')}</span><div><label><small>${tr('timeFrom')}</small><input type="time" data-passport-call="from" value="${escapeHtml(builderPassport.callFrom)}" /></label><label><small>${tr('timeTo')}</small><input type="time" data-passport-call="to" value="${escapeHtml(builderPassport.callTo)}" /></label></div></section></div>`;
}

function passportProfessionMarkup(item, index) {
  return `<article class="passport-profession-row" data-passport-profession="${escapeHtml(item.id)}"><span>${index + 1}</span><label><small>${tr('profession')}</small>${passportSmartSelectMarkup({ kind: 'profession', value: item.name, placeholder: tr('selectProfession'), professionId: item.id })}</label><label><small>${tr('workExperience')}</small><span class="passport-experience-input"><input type="number" min="0" max="70" step="0.5" inputmode="decimal" data-profession-experience value="${item.experience || ''}" /><em>${tr('experienceYears')}</em></span></label><button type="button" data-remove-profession aria-label="${escapeHtml(tr('removeProfession'))}" title="${escapeHtml(tr('removeProfession'))}">×</button></article>`;
}

function passportSkillsMarkup() {
  const chips = builderPassport.skills.map((skill, index) => `<span class="passport-skill-chip"><strong>${escapeHtml(skill)}</strong><button type="button" data-remove-skill="${index}" aria-label="${escapeHtml(tr('removeSkill'))}">×</button></span>`).join('');
  return `<section class="passport-form-section passport-skills-section"><header><div><span class="eyebrow">STRUCTOS SKILLS</span><h2>${tr('skills')}</h2><p>${tr('skillsHint')}</p></div></header><div class="passport-skill-entry"><input type="text" maxlength="120" data-new-skill placeholder="${escapeHtml(tr('skillPlaceholder'))}" /><button class="outline-button" type="button" data-add-skill aria-label="${escapeHtml(tr('addSkill'))}">＋ ${tr('addSkill')}</button></div><div class="passport-skill-list">${chips}</div></section>`;
}

function maritalOptionsMarkup() {
  return `<option value="">${tr('selectStatus')}</option>${['single', 'married', 'divorced', 'widowed'].map((value) => `<option value="${value}"${personData.maritalStatus === value ? ' selected' : ''}>${tr(`${value}Status`)}</option>`).join('')}`;
}

function passportLocationMarkup(item, index) {
  return `<article class="passport-location-row" data-passport-location="${escapeHtml(item.id)}"><span>${index + 1}</span><label><small>${tr('workCountry')}</small>${passportSmartSelectMarkup({ kind: 'country', value: item.country, placeholder: tr('selectCountry'), locationField: 'country' })}</label><label><small>${tr('workCity')}</small>${passportSmartSelectMarkup({ kind: 'city', value: item.city, placeholder: countryByValue(item.country) ? tr('enterCity') : tr('selectCountryFirst'), locationField: 'city', country: item.country })}</label><button type="button" data-remove-location aria-label="${escapeHtml(tr('removeLocation'))}" title="${escapeHtml(tr('removeLocation'))}">×</button></article>`;
}

function passportYesNoMarkup(key, label) {
  return `<label class="passport-important-option"><strong>${tr(label)}</strong><span class="passport-yes-no"><em>${tr('no')}</em><input type="checkbox" data-passport-important="${key}"${builderPassport.important[key] ? ' checked' : ''} /><i aria-hidden="true"></i><em>${tr('yes')}</em></span></label>`;
}

function passportVisibilityMarkup() {
  const labels = { photo: 'photo', id: 'structosId', lastName: 'surname', firstName: 'givenName', patronymic: 'patronymic', birthDate: 'birthDate', maritalStatus: 'maritalStatus', nationality: 'nationality', citizenship: 'citizenship', businessTrips: 'businessTrips', patent: 'patentAvailable', workPermit: 'workPermitAvailable', residenceCountry: 'permanentResidence', residenceCity: 'residenceCity', nearestMetro: 'nearestMetro', phone: 'contactPhone', email: 'contactEmail', messengers: 'activeMessengers', schedule: 'preferredSchedule', professions: 'professions', skills: 'skills', workLocations: 'workGeography' };
  return passportVisibilityKeys.map((key) => `<label class="passport-visible-field"><input type="checkbox" data-passport-visible="${key}"${builderPassport.visibleFields[key] ? ' checked' : ''} /><span>✓</span><strong>${tr(labels[key])}</strong></label>`).join('');
}

function passportImportantMarkup() {
  const options = [['contractorSearch', 'contractorSearch'], ['employeeSearch', 'employeeSearch'], ['tenderParticipation', 'tenderParticipation'], ['employmentOffers', 'employmentOffers'], ['objectOffers', 'objectOffers']];
  const available = builderPassport.important.passportAvailable;
  return `<section class="passport-important${passportImportantExpanded ? ' is-open' : ''}"><button class="passport-important-head" type="button" data-passport-important-toggle aria-expanded="${passportImportantExpanded}"><span class="passport-important-mark">!</span><span><small>STRUCTOS PRIVACY</small><strong>${tr('mostImportantPassport')}</strong><em>${tr('mostImportantHint')}</em></span><i aria-hidden="true">⌄</i></button><div class="passport-important-body"${passportImportantExpanded ? '' : ' hidden'}>${options.map(([key, label]) => passportYesNoMarkup(key, label)).join('')}${passportYesNoMarkup('passportAvailable', 'makePassportAvailable')}<div class="passport-access-picker"${available ? '' : ' hidden'}><button type="button" data-passport-access-toggle aria-expanded="${passportAccessListExpanded}"><span>${tr('chooseVisibleData')}</span><i aria-hidden="true">⌄</i></button><p>${tr('visibleDataHint')}</p><div class="passport-visible-fields"${passportAccessListExpanded ? '' : ' hidden'}>${passportVisibilityMarkup()}</div></div></div></section>`;
}

function passportEditorMarkup() {
  const foreign = isForeignCitizen();
  return `<form class="builder-passport-form" data-passport-form>
    <section class="passport-sync-note"><span>↔</span><p>${tr('sharedDataHint')}</p></section>
    ${passportImportantMarkup()}
    <section class="passport-form-section">
      <header><div><span class="eyebrow">STRUCTOS IDENTITY</span><h2>${tr('personalData')}</h2></div></header>
      ${passportPhotoMarkup()}
      ${passportIdActionsMarkup()}
      <div class="passport-fields-grid">
        ${passportInputCard('lastName', tr('surname'), `<input type="text" maxlength="80" autocomplete="family-name" data-person-field="lastName" value="${escapeHtml(personData.lastName)}" />`)}
        ${passportInputCard('firstName', tr('givenName'), `<input type="text" maxlength="80" autocomplete="given-name" data-person-field="firstName" value="${escapeHtml(personData.firstName)}" />`)}
        ${passportInputCard('patronymic', tr('patronymic'), `<input type="text" maxlength="80" data-person-field="patronymic" value="${escapeHtml(personData.patronymic)}" />`)}
        ${passportInputCard('birthDate', tr('birthDate'), passportBirthAgeMarkup())}
        ${passportInputCard('maritalStatus', tr('maritalStatus'), `<select data-person-field="maritalStatus">${maritalOptionsMarkup()}</select>`)}
        ${passportInputCard('nationality', tr('nationality'), passportSmartSelectMarkup({ kind: 'nationality', value: personData.nationality, placeholder: tr('selectNationality'), personField: 'nationality' }))}
        ${passportInputCard('citizenship', tr('citizenship'), passportSmartSelectMarkup({ kind: 'country', value: personData.citizenship, placeholder: tr('selectCountry'), personField: 'citizenship' }))}
        ${passportInputCard('residenceCountry', tr('permanentResidence'), passportSmartSelectMarkup({ kind: 'country', value: personData.residenceCountry, placeholder: tr('selectCountry'), personField: 'residenceCountry' }))}
        ${passportInputCard('residenceCity', tr('residenceCity'), passportSmartSelectMarkup({ kind: 'city', value: profileData.city, placeholder: countryByValue(personData.residenceCountry) ? tr('enterCity') : tr('selectCountryFirst'), profileField: 'city', country: personData.residenceCountry }))}
        ${passportInputCard('nearestMetro', tr('nearestMetro'), passportSmartSelectMarkup({ kind: 'metro', value: profileData.metro, placeholder: tr('selectMetro'), profileField: 'metro', city: profileData.city }))}
        ${passportInputCard('phone', tr('contactPhone'), `<input type="tel" maxlength="60" autocomplete="tel" data-profile-field="phone" value="${escapeHtml(profileData.phone)}" />`)}
        ${passportInputCard('email', tr('contactEmail'), `<input type="email" maxlength="120" autocomplete="email" data-profile-field="email" value="${escapeHtml(profileData.email)}" />`)}
      </div>
      ${passportMessengerMarkup()}
      <section class="passport-foreign-documents" data-foreign-documents${foreign ? '' : ' hidden'}><h3>${tr('foreignDocuments')}</h3><div>${passportInputCard('patent', tr('patentAvailable'), `<span class="passport-document-check"><input type="checkbox" data-passport-field="patent"${builderPassport.patent ? ' checked' : ''} /><span>✓</span></span>`)}${passportInputCard('workPermit', tr('workPermitAvailable'), `<span class="passport-document-check"><input type="checkbox" data-passport-field="workPermit"${builderPassport.workPermit ? ' checked' : ''} /><span>✓</span></span>`)}</div></section>
    </section>
    <section class="passport-form-section passport-geography-section"><header><div><span class="eyebrow">STRUCTOS GEO</span><h2>${tr('workGeography')}</h2><p>${tr('workGeographyHint')}</p></div></header><div class="passport-locations" data-passport-locations>${builderPassport.workLocations.map(passportLocationMarkup).join('')}</div><button class="outline-button passport-add-location" type="button" data-add-passport-location>＋ ${tr('addCountryCity')}</button>${passportWorkSettingsMarkup()}</section>
    <section class="passport-form-section passport-professions-section"><header><div><span class="eyebrow">STRUCTOS PROFESSION</span><h2>${tr('professions')}</h2><p>${tr('professionDirectoryHint')}</p></div></header><div class="passport-professions">${builderPassport.professions.map(passportProfessionMarkup).join('')}</div><button class="outline-button" type="button" data-add-profession>＋ ${tr('addProfession')}</button></section>
    ${passportSkillsMarkup()}
    <button class="primary-button passport-save-button" type="submit">${tr('savePassport')}</button>
  </form>`;
}

function updateForeignDocumentVisibility(scope) {
  const block = $('[data-foreign-documents]', scope);
  if (block) block.hidden = !isForeignCitizen();
}

async function resizePersonPhoto(file) {
  if (!file?.type.startsWith('image/') || file.size > 8 * 1024 * 1024) throw new Error('invalid-photo');
  const source = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
  const image = await new Promise((resolve, reject) => { const value = new Image(); value.onload = () => resolve(value); value.onerror = reject; value.src = source; });
  const size = Math.min(720, Math.max(image.naturalWidth, image.naturalHeight));
  const scale = Math.min(1, size / Math.max(image.naturalWidth, image.naturalHeight));
  const canvas = document.createElement('canvas'); canvas.width = Math.max(1, Math.round(image.naturalWidth * scale)); canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', .84);
}

function bindPersonPhotoControls(scope, onUpdate) {
  const input = $('[data-person-photo-input]', scope);
  $('[data-person-photo-select]', scope)?.addEventListener('click', () => input?.click());
  input?.addEventListener('change', async () => {
    try { personData.photo = await resizePersonPhoto(input.files?.[0]); saveIdentityState(); onUpdate?.(); }
    catch { showToast(tr('photoError')); }
    input.value = '';
  });
  $('[data-person-photo-remove]', scope)?.addEventListener('click', () => { personData.photo = ''; saveIdentityState(); onUpdate?.(); });
}

function openPassportScheduleDialog() {
  const selected = new Set(builderPassport.scheduleDays);
  const buttons = passportWeekdays.map((day) => `<button type="button" data-schedule-day="${day}" class="${selected.has(day) ? 'is-selected' : ''}"><span>✓</span><strong>${tr(`weekday${day[0].toUpperCase()}${day.slice(1)}`)}</strong></button>`).join('');
  showDialog(tr('scheduleDaysTitle'), tr('scheduleDaysHint'), `<div class="passport-weekday-picker">${buttons}</div><button class="primary-button" type="button" data-save-schedule-days>${tr('done')}</button>`);
  const scope = $('[data-dialog-content]');
  $$('[data-schedule-day]', scope).forEach((button) => button.addEventListener('click', () => {
    const day = button.dataset.scheduleDay;
    if (selected.has(day)) selected.delete(day); else selected.add(day);
    button.classList.toggle('is-selected', selected.has(day));
  }));
  $('[data-save-schedule-days]', scope)?.addEventListener('click', () => {
    builderPassport.scheduleDays = passportWeekdays.filter((day) => selected.has(day));
    saveIdentityState(false);
    $('[data-dialog]')?.close();
    renderPassportEditor();
  });
}

function renderPassportEditor() {
  const rootElement = $('[data-passport-editor]');
  if (!rootElement) return;
  rootElement.innerHTML = passportEditorMarkup();
  const form = $('[data-passport-form]', rootElement);
  $$('[data-person-field]', form).forEach((input) => input.addEventListener('input', () => {
    personData[input.dataset.personField] = input.value.slice(0, 100);
    if (input.dataset.personField === 'citizenship') updateForeignDocumentVisibility(form);
    if (input.dataset.personField === 'birthDate') $('[data-person-age]', form).value = fullYears(input.value);
    queueIdentityAutosave();
  }));
  $$('[data-profile-field]', form).forEach((input) => input.addEventListener('input', () => { profileData[input.dataset.profileField] = input.value.slice(0, 140); queueIdentityAutosave(); }));
  bindPassportSmartSelects(form, (field) => {
    if (field === 'citizenship') updateForeignDocumentVisibility(form);
    if (field === 'residenceCountry') { profileData.city = ''; profileData.metro = ''; renderPassportEditor(); }
    if (field === 'city') renderPassportEditor();
  });
  $$('[data-passport-field]', form).forEach((input) => input.addEventListener('change', () => { builderPassport[input.dataset.passportField] = input.checked; queueIdentityAutosave(); }));
  $$('[data-passport-business-trips]', form).forEach((input) => input.addEventListener('change', () => { if (input.checked) { builderPassport.businessTrips = input.value === 'yes'; queueIdentityAutosave(); } }));
  $$('[data-messenger-linked]', form).forEach((input) => input.addEventListener('change', () => {
    if (!input.checked) return;
    builderPassport.messengerLinked = input.value === 'yes';
    saveIdentityState(false);
    renderPassportEditor();
  }));
  $$('[data-passport-messenger]', form).forEach((input) => input.addEventListener('change', () => {
    builderPassport.messengers[input.dataset.passportMessenger] = input.checked;
    saveIdentityState(false);
    renderPassportEditor();
  }));
  $('[data-passport-any-schedule]', form)?.addEventListener('change', (event) => { builderPassport.anySchedule = event.currentTarget.checked; saveIdentityState(false); renderPassportEditor(); });
  $$('[data-passport-night-shifts]', form).forEach((input) => input.addEventListener('change', () => { if (input.checked) { builderPassport.nightShifts = input.value === 'yes'; saveIdentityState(false); renderPassportEditor(); } }));
  $$('[data-passport-call]', form).forEach((input) => input.addEventListener('input', () => { builderPassport[input.dataset.passportCall === 'from' ? 'callFrom' : 'callTo'] = input.value; queueIdentityAutosave(); }));
  $('[data-open-schedule-days]', form)?.addEventListener('click', openPassportScheduleDialog);
  $$('[data-passport-profession]', form).forEach((row) => {
    const item = builderPassport.professions.find((profession) => profession.id === row.dataset.passportProfession);
    if (!item) return;
    $('[data-profession-experience]', row)?.addEventListener('input', (event) => { item.experience = Math.max(0, Math.min(70, Number(event.currentTarget.value) || 0)); queueIdentityAutosave(); });
    $('[data-remove-profession]', row)?.addEventListener('click', () => {
      builderPassport.professions = builderPassport.professions.filter((profession) => profession.id !== item.id);
      if (!builderPassport.professions.length) builderPassport.professions.push({ id: `profession-${Date.now()}`, name: '', experience: 0 });
      profileData.profession = builderPassport.professions.find((profession) => profession.name)?.name || '';
      saveIdentityState(false);
      renderPassportEditor();
    });
  });
  $('[data-add-profession]', form)?.addEventListener('click', () => {
    if (builderPassport.professions.length >= 50) return;
    builderPassport.professions.push({ id: `profession-${Date.now()}-${Math.random().toString(16).slice(2)}`, name: '', experience: 0 });
    saveIdentityState(false);
    renderPassportEditor();
  });
  const addSkill = () => {
    const input = $('[data-new-skill]', form);
    const value = input?.value.trim().slice(0, 120);
    if (!value) { input?.focus(); return; }
    if (builderPassport.skills.some((skill) => normalizeDirectoryValue(skill) === normalizeDirectoryValue(value))) { showToast(tr('duplicateSkill')); return; }
    if (builderPassport.skills.length >= 80) return;
    builderPassport.skills.push(value);
    saveIdentityState(false);
    renderPassportEditor();
  };
  $('[data-add-skill]', form)?.addEventListener('click', addSkill);
  $('[data-new-skill]', form)?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addSkill(); } });
  $$('[data-remove-skill]', form).forEach((button) => button.addEventListener('click', () => { builderPassport.skills.splice(Number(button.dataset.removeSkill), 1); saveIdentityState(false); renderPassportEditor(); }));
  $('[data-copy-passport-id]', form)?.addEventListener('click', copyId);
  $('[data-share-resume]', form)?.addEventListener('click', shareResume);
  $('[data-share-passport]', form)?.addEventListener('click', sharePassport);
  $('[data-passport-important-toggle]', form)?.addEventListener('click', () => { passportImportantExpanded = !passportImportantExpanded; renderPassportEditor(); });
  $$('[data-passport-important]', form).forEach((input) => input.addEventListener('change', () => {
    builderPassport.important[input.dataset.passportImportant] = input.checked;
    saveIdentityState(false);
    if (input.dataset.passportImportant === 'passportAvailable') {
      passportAccessListExpanded = input.checked;
      renderPassportEditor();
    }
  }));
  $('[data-passport-access-toggle]', form)?.addEventListener('click', () => { passportAccessListExpanded = !passportAccessListExpanded; renderPassportEditor(); });
  $$('[data-passport-visible]', form).forEach((input) => input.addEventListener('change', () => { builderPassport.visibleFields[input.dataset.passportVisible] = input.checked; saveIdentityState(false); }));
  $$('[data-passport-location]', form).forEach((row) => {
    const item = builderPassport.workLocations.find((entry) => entry.id === row.dataset.passportLocation);
    if (!item) return;
    $('[data-remove-location]', row)?.addEventListener('click', () => {
      builderPassport.workLocations = builderPassport.workLocations.filter((entry) => entry.id !== item.id);
      if (!builderPassport.workLocations.length) builderPassport.workLocations.push({ id: `place-${Date.now()}`, country: '', city: '' });
      saveIdentityState(false);
      renderPassportEditor();
    });
  });
  $('[data-add-passport-location]', form)?.addEventListener('click', () => {
    if (builderPassport.workLocations.length >= 12) return;
    builderPassport.workLocations.push({ id: `place-${Date.now()}-${Math.random().toString(16).slice(2)}`, country: '', city: '' });
    saveIdentityState(false);
    renderPassportEditor();
  });
  bindPersonPhotoControls(form, renderPassportEditor);
  form.addEventListener('submit', (event) => { event.preventDefault(); if (!validatePassportSmartSelects(form)) return; saveIdentityState(); renderPassportEditor(); showToast(tr('passportSaved')); });
  renderPassportProgress();
}

function profileEditorMarkup() {
  return `<div class="profile-edit-form" data-profile-edit-form>
    ${passportPhotoMarkup(false)}
    <section><h3>${tr('personalData')}</h3><p>${tr('personalDataMirrorHint')}</p><div class="profile-edit-grid">
      <label><span>${tr('surname')}</span><input type="text" maxlength="80" data-person-field="lastName" value="${escapeHtml(personData.lastName)}" /></label>
      <label><span>${tr('givenName')}</span><input type="text" maxlength="80" data-person-field="firstName" value="${escapeHtml(personData.firstName)}" /></label>
      <label><span>${tr('patronymic')}</span><input type="text" maxlength="80" data-person-field="patronymic" value="${escapeHtml(personData.patronymic)}" /></label>
      <label><span>${tr('birthDate')}</span>${passportBirthAgeMarkup()}</label>
      <label><span>${tr('maritalStatus')}</span><select data-person-field="maritalStatus">${maritalOptionsMarkup()}</select></label>
      <label><span>${tr('nationality')}</span>${passportSmartSelectMarkup({ kind: 'nationality', value: personData.nationality, placeholder: tr('selectNationality'), personField: 'nationality' })}</label>
      <label><span>${tr('citizenship')}</span>${passportSmartSelectMarkup({ kind: 'country', value: personData.citizenship, placeholder: tr('selectCountry'), personField: 'citizenship' })}</label>
      <label><span>${tr('permanentResidence')}</span>${passportSmartSelectMarkup({ kind: 'country', value: personData.residenceCountry, placeholder: tr('selectCountry'), personField: 'residenceCountry' })}</label>
      <label><span>${tr('residenceCity')}</span>${passportSmartSelectMarkup({ kind: 'city', value: profileData.city, placeholder: countryByValue(personData.residenceCountry) ? tr('enterCity') : tr('selectCountryFirst'), profileField: 'city', country: personData.residenceCountry })}</label>
      <label><span>${tr('nearestMetro')}</span>${passportSmartSelectMarkup({ kind: 'metro', value: profileData.metro, placeholder: tr('selectMetro'), profileField: 'metro', city: profileData.city })}</label>
      <label><span>${tr('contactPhone')}</span><input type="tel" maxlength="60" autocomplete="tel" data-profile-field="phone" value="${escapeHtml(profileData.phone)}" /></label>
      <label><span>${tr('contactEmail')}</span><input type="email" maxlength="120" autocomplete="email" data-profile-field="email" value="${escapeHtml(profileData.email)}" /></label>
    </div></section>
    <section><h3>${tr('professionalData')}</h3><div class="profile-edit-grid"><label><span>${tr('profession')}</span>${passportSmartSelectMarkup({ kind: 'profession', value: profileData.profession, placeholder: tr('selectProfession'), profileField: 'profession' })}</label></div></section>
    <button class="primary-button" type="button" data-save-profile>${tr('saveChanges')}</button>
  </div>`;
}

function openProfileEditor() {
  showDialog(tr('profileEditorTitle'), tr('profileEditorHint'), profileEditorMarkup());
  const scope = $('[data-dialog-content]');
  $$('[data-person-field]', scope).forEach((input) => input.addEventListener('input', () => {
    personData[input.dataset.personField] = input.value.slice(0, 100);
    if (input.dataset.personField === 'birthDate') $('[data-person-age]', scope).value = fullYears(input.value);
    queueIdentityAutosave();
  }));
  bindPassportSmartSelects(scope, (field) => {
    if (field === 'residenceCountry') {
      profileData.city = '';
      profileData.metro = '';
      const cityControl = $('[data-smart-profile-field="city"]', scope);
      const metroControl = $('[data-smart-profile-field="metro"]', scope);
      if (cityControl) { cityControl.dataset.smartCountry = personData.residenceCountry; cityControl.dataset.smartValue = ''; $('[data-smart-input]', cityControl).value = ''; }
      if (metroControl) { metroControl.dataset.smartCity = ''; metroControl.dataset.smartValue = ''; $('[data-smart-input]', metroControl).value = ''; }
    }
    if (field === 'city') {
      const metroControl = $('[data-smart-profile-field="metro"]', scope);
      if (metroControl) { metroControl.dataset.smartCity = profileData.city; metroControl.dataset.smartValue = ''; $('[data-smart-input]', metroControl).value = ''; }
    }
  });
  $$('[data-profile-field]', scope).forEach((input) => input.addEventListener('input', () => { profileData[input.dataset.profileField] = input.value.slice(0, 140); queueIdentityAutosave(); }));
  bindPersonPhotoControls(scope, () => { $('[data-dialog]').close(); openProfileEditor(); });
  $('[data-save-profile]', scope)?.addEventListener('click', () => { if (!validatePassportSmartSelects(scope)) return; builderPassport.professions[0] ||= { id: `profession-${Date.now()}`, name: '', experience: 0 }; builderPassport.professions[0].name = profileData.profession; saveIdentityState(); renderPassportEditor(); $('[data-dialog]').close(); showToast(tr('profileSaved')); });
}

function profileDateOfBirthValue() {
  if (!personData.birthDate) return '';
  const date = new Date(`${personData.birthDate}T12:00:00`);
  const formatted = Number.isNaN(date.getTime()) ? personData.birthDate : new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  const age = fullYears(personData.birthDate);
  return age ? `${formatted} · ${age}` : formatted;
}

function renderProfilePersonalData() {
  const container = $('[data-profile-personal]');
  if (!container) return;
  const rows = [
    [tr('fullName'), [personData.lastName, personData.firstName, personData.patronymic].filter(Boolean).join(' ')],
    [tr('birthDate'), profileDateOfBirthValue()],
    [tr('maritalStatus'), personData.maritalStatus ? tr(`${personData.maritalStatus}Status`) : ''],
    [tr('nationality'), personData.nationality],
    [tr('citizenship'), personData.citizenship],
    [tr('permanentResidence'), personData.residenceCountry],
    [tr('residenceCity'), profileData.city],
    [tr('nearestMetro'), profileData.metro],
    [tr('contactPhone'), profileData.phone],
    [tr('contactEmail'), profileData.email],
    [tr('profession'), profileData.profession]
  ];
  container.innerHTML = rows.map(([label, value]) => `<article><span>${escapeHtml(label)}</span><strong class="${value ? '' : 'is-empty'}">${escapeHtml(value || tr('notSpecified'))}</strong></article>`).join('');
}

function renderConnectionsSummary() {
  const linked = structosConnectionProviders.filter(({ key }) => structosConnections[key]).length;
  $$('[data-connections-summary]').forEach((item) => { item.textContent = `${tr('linkedCount')}: ${linked} / ${structosConnectionProviders.length}`; });
}

function connectionProviderMarkup(provider) {
  const linked = Boolean(structosConnections[provider.key]);
  const profileValue = provider.profileField ? profileData[provider.profileField] : '';
  return `<article class="structos-connection-row${linked ? ' is-linked' : ''}"><span class="structos-connection-logo ${provider.className}" aria-hidden="true">${escapeHtml(provider.icon)}</span><div><strong>${tr(provider.labelKey)}</strong>${profileValue ? `<small>${escapeHtml(profileValue)}</small>` : ''}<em>${tr('accountReward')} · ${tr('rewardOnce')}</em></div><button type="button" data-link-structos-account="${provider.key}"${linked ? ' disabled' : ''}><span>${tr(linked ? 'linkedAccount' : 'linkAccount')}</span>${linked ? '<i>✓</i>' : ''}</button></article>`;
}

function connectionsDialogMarkup() {
  const linked = structosConnectionProviders.filter(({ key }) => structosConnections[key]).length;
  const available = (structosConnectionProviders.length - linked) * 150;
  return `<section class="structos-connections"><header><span>${tr('linkedCount')}</span><strong>${linked} / ${structosConnectionProviders.length}</strong><small>${tr('availableAccountBonus')}: +${available}</small></header><div class="structos-connection-list">${structosConnectionProviders.map(connectionProviderMarkup).join('')}</div><section class="merge-accounts-card"><div><span>STRUCTOS ID</span><h3>${tr('mergeAccounts')}</h3><p>${tr('mergeAccountsHint')}</p></div><button type="button" disabled aria-disabled="true"><span>${tr('mergeAccounts')}</span><small>${tr('inDevelopment')}</small></button></section></section>`;
}

function openConnectionsDialog() {
  showDialog(tr('connections'), tr('connectionsHint'), connectionsDialogMarkup());
  const scope = $('[data-dialog-content]');
  $$('[data-link-structos-account]', scope).forEach((button) => button.addEventListener('click', () => requestStructosConnection(button.dataset.linkStructosAccount)));
}

function completeStructosConnection(provider) {
  if (structosConnections[provider.key]) { showToast(tr('accountAlreadyLinked')); return; }
  structosConnections[provider.key] = true;
  finance.rewards ||= {};
  finance.rewards.accountLinks ||= {};
  const firstReward = !finance.rewards.accountLinks[provider.key];
  if (firstReward) {
    finance.rewards.accountLinks[provider.key] = true;
    finance.bonuses += 150;
    finance.bonusHistory.unshift({ key: 'accountLinkReward', detail: tr(provider.labelKey), amount: 150, date: new Date().toISOString() });
    saveFinance();
    renderFinance();
  }
  saveStructosConnections();
  openConnectionsDialog();
  showToast(firstReward ? tr('accountLinked') : tr('accountAlreadyLinked'));
}

function requestStructosConnection(key) {
  const provider = structosConnectionProviders.find((item) => item.key === key);
  if (!provider) return;
  if (structosConnections[key]) { showToast(tr('accountAlreadyLinked')); return; }
  if (provider.profileField && !profileData[provider.profileField]) {
    showDialog(`${tr('connections')}: ${tr(provider.labelKey)}`, tr('missingConnectionData'), `<button class="primary-button structos-connection-action" type="button" data-fill-connection-data>${tr('fillPersonalData')}</button>`);
    $('[data-fill-connection-data]')?.addEventListener('click', () => { $('[data-dialog]')?.close(); openProfileEditor(); });
    return;
  }
  showDialog(`${tr('testConnectionTitle')}: ${tr(provider.labelKey)}`, tr('testConnectionHint'), `<div class="connection-confirm"><span class="structos-connection-logo ${provider.className}" aria-hidden="true">${escapeHtml(provider.icon)}</span><div><strong>${tr(provider.labelKey)}</strong><small>${tr('accountReward')} · ${tr('rewardOnce')}</small></div></div><button class="primary-button structos-connection-action" type="button" data-confirm-structos-connection>${tr('confirmTestConnection')}</button>`);
  $('[data-confirm-structos-connection]')?.addEventListener('click', () => completeStructosConnection(provider));
}

function formatMoney(value) {
  return `${new Intl.NumberFormat(root.lang || 'ru-RU', { maximumFractionDigits: 2 }).format(value)} ₽`;
}

function renderFinance() {
  $$('[data-balance-value]').forEach((item) => { item.textContent = formatMoney(finance.balance); });
  const bonusValue = new Intl.NumberFormat(root.lang || 'ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(finance.bonuses);
  $$('[data-bonus-value]').forEach((item) => { item.textContent = bonusValue; });
  $$('[data-finance-summary]').forEach((item) => { item.textContent = `${formatMoney(finance.balance)} · ${bonusValue}`; });
  renderLiveBonusState();
}

function localRewardDate(date = new Date()) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function currentActivityBonus() {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return (finance.bonusHistory || [])
    .filter((entry) => entry.key === 'activityMonthlyAccrual' && String(entry.detail || '').startsWith(month))
    .reduce((total, entry) => total + (Number(entry.amount) || 0), 0);
}

function renderLiveBonusState() {
  const value = new Intl.NumberFormat(root.lang || 'ru-RU', { minimumFractionDigits: 5, maximumFractionDigits: 5 }).format(currentActivityBonus());
  $$('[data-bonus-accrual-value]').forEach((item) => { item.textContent = `${value} ₽`; });
}

function awardDailyLoginReward() {
  finance.rewards ||= {};
  const today = localRewardDate();
  if (finance.rewards.dailyLoginDate === today) return false;
  finance.rewards.dailyLoginDate = today;
  finance.bonuses += DAILY_LOGIN_REWARD;
  finance.bonusHistory.unshift({ key: 'dailyLoginReward', amount: DAILY_LOGIN_REWARD, date: new Date().toISOString() });
  saveFinance();
  return true;
}

let activeBonusTimer = null;
let activeBonusLastTick = performance.now();
let activeBonusUnsavedSeconds = 0;

function accrueActiveBonus() {
  const now = performance.now();
  const elapsedSeconds = Math.min(2, Math.max(0, (now - activeBonusLastTick) / 1000));
  activeBonusLastTick = now;
  if (document.hidden || elapsedSeconds <= 0) return;
  const amount = Math.min(elapsedSeconds * ACTIVE_BONUS_RATE, Math.max(0, ACTIVE_BONUS_MONTHLY - currentActivityBonus()));
  if (amount <= 0) return;
  const today = localRewardDate();
  finance.bonuses += amount;
  let entry = finance.bonusHistory.find((item) => item.key === 'activityMonthlyAccrual' && item.detail === today);
  if (!entry) {
    entry = { key: 'activityMonthlyAccrual', detail: today, amount: 0, date: new Date().toISOString() };
    finance.bonusHistory.unshift(entry);
  }
  entry.amount += amount;
  activeBonusUnsavedSeconds += elapsedSeconds;
  renderFinance();
  if (activeBonusUnsavedSeconds >= 15) {
    activeBonusUnsavedSeconds = 0;
    localStorage.setItem(FINANCE_KEY, JSON.stringify(finance));
  }
}

function startActiveBonusAccrual() {
  if (activeBonusTimer) return;
  activeBonusLastTick = performance.now();
  activeBonusTimer = window.setInterval(accrueActiveBonus, 1000);
  document.addEventListener('visibilitychange', () => { activeBonusLastTick = performance.now(); });
  window.addEventListener('pagehide', () => localStorage.setItem(FINANCE_KEY, JSON.stringify(finance)));
  renderFinance();
}

function awardGameWin(game) {
  if (game !== 'snake') return;
  finance.rewards ||= {};
  finance.rewards.gameWins ||= {};
  const rewardKey = `${game}:${localRewardDate()}`;
  if (finance.rewards.gameWins[rewardKey]) return;
  finance.rewards.gameWins[rewardKey] = true;
  finance.bonuses += SNAKE_WIN_REWARD;
  finance.bonusHistory.unshift({ key: 'gameWinReward', amount: SNAKE_WIN_REWARD, date: new Date().toISOString() });
  saveFinance();
  showToast(tr('gameRewardToast'));
}

function currentProfilePlan() {
  return profilePlans.find((plan) => plan.key === profilePlan) || profilePlans[1];
}

function renderProfilePlan() {
  const label = tr(currentProfilePlan().labelKey);
  $$('[data-plan-summary]').forEach((item) => { item.textContent = label; });
}

function profilePlansMarkup() {
  return `<section class="profile-plan-list">${profilePlans.map((plan) => {
    const selected = plan.key === profilePlan;
    return `<button class="profile-plan-option${selected ? ' is-selected' : ''}" type="button" data-select-profile-plan="${plan.key}" aria-pressed="${selected}"><span><small>STRUCTOS</small><strong>${escapeHtml(tr(plan.labelKey))}</strong></span><i>${selected ? `✓ ${escapeHtml(tr('currentPlan'))}` : '›'}</i></button>`;
  }).join('')}</section>`;
}

function openSubscriptionDialog() {
  showDialog(tr('tariffSubscription'), tr('planSelectionHint'), profilePlansMarkup());
  const scope = $('[data-dialog-content]');
  $$('[data-select-profile-plan]', scope).forEach((button) => button.addEventListener('click', () => {
    profilePlan = profilePlans.some((plan) => plan.key === button.dataset.selectProfilePlan) ? button.dataset.selectProfilePlan : 'user';
    localStorage.setItem(PROFILE_PLAN_KEY, profilePlan);
    renderProfilePlan();
    openSubscriptionDialog();
    showToast(tr('planSelected'));
  }));
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

function onlineRangeForHour(hour) {
  if (hour >= 22 || hour < 8) return [70, 120];
  if (hour < 19) return [310, 450];
  return [100, 130];
}

function statisticsSeed(bucket) {
  let value = bucket | 0;
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
  return (value ^ (value >>> 16)) >>> 0;
}

function sharedOnlineCount(now = Date.now()) {
  const hour = Number(STATISTICS_HOUR_FORMATTER.format(new Date(now)));
  const [minimum, maximum] = onlineRangeForHour(hour);
  const span = maximum - minimum + 1;
  const bucket = Math.floor(now / STATISTICS_ONLINE_STEP);
  let count = minimum + (statisticsSeed(bucket) % span);
  const previous = minimum + (statisticsSeed(bucket - 1) % span);
  if (count === previous) count = minimum + ((count - minimum + 1) % span);
  return count;
}

function statisticsUsersCount(now = Date.now()) {
  const elapsed = Math.max(0, now - STATISTICS_USERS_EPOCH);
  return STATISTICS_USERS_BASE + Math.floor(elapsed / STATISTICS_USERS_STEP);
}

function referralContributionCount() {
  const localCount = (finance.bonusHistory || []).filter((entry) => entry.key === 'referralReward').length;
  return Math.max(serverReferralCount, localCount);
}

function renderHomeStatistics() {
  const online = $('[data-stat-online]');
  const users = $('[data-stat-users]');
  const referrals = $('[data-stat-referrals]');
  if (online) online.textContent = new Intl.NumberFormat(root.lang || 'ru-RU').format(sharedOnlineCount());
  if (users) users.textContent = new Intl.NumberFormat(root.lang || 'ru-RU').format(statisticsUsersCount());
  if (referrals) referrals.textContent = new Intl.NumberFormat(root.lang || 'ru-RU').format(referralContributionCount());
}

function startHomeStatisticsClock() {
  renderHomeStatistics();
  const delay = STATISTICS_ONLINE_STEP - (Date.now() % STATISTICS_ONLINE_STEP) + 20;
  setTimeout(() => {
    renderHomeStatistics();
    setInterval(renderHomeStatistics, STATISTICS_ONLINE_STEP);
  }, delay);
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
    const role = demoSession.role || tr('userTariff');
    currentId = formattedId(demoSession.id || '4820197');
    serverReferralCount = Math.max(0, Math.floor(Number(demoSession.referralCount) || 0));
    $$('[data-user-role]').forEach((item) => { item.textContent = role; });
    $$('[data-user-id]').forEach((item) => { item.textContent = currentId; });
    seedIdentityFromAuth(demoSession.name || 'StructOS', {});
    renderReferral();
    renderHomeStatistics();
    return role;
  }
  const supabaseUrl = supabaseConfig.url || import.meta.env?.VITE_SUPABASE_URL;
  const supabaseKey = supabaseConfig.publishableKey || import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) { window.location.replace('login.html#login'); return null; }
  try {
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.112.3/+esm');
    authClient = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
    const { data, error } = await authClient.auth.getUser();
    if (error || !data?.user) { window.location.replace('login.html#login'); return null; }
    const user = data.user;
    const meta = user.user_metadata || {};
    const fullName = String(meta.full_name || user.email?.split('@')[0] || 'Пользователь').trim();
    const role = String(meta.primary_role || tr('userTariff'));
    serverReferralCount = Math.max(0, Math.floor(Number(user.app_metadata?.referral_count) || 0));
    currentId = formattedId(meta.structos_id || idFromUuid(user.id));
    $$('[data-user-role]').forEach((item) => { item.textContent = role; });
    $$('[data-user-id]').forEach((item) => { item.textContent = currentId; });
    seedIdentityFromAuth(fullName, { ...meta, email: user.email || '' });
    renderReferral();
    renderHomeStatistics();
    return role;
  } catch (error) {
    console.warn('StructOS auth is unavailable:', error);
    return tr('userTariff');
  }
}

function setPanel(name) {
  const requested = String(name || 'home');
  const [requestedPanel, ...pathParts] = requested.split('/');
  if (requestedPanel === 'proposal-detail' && pathParts.length) {
    try { activeCommercialProposalId = decodeURIComponent(pathParts.join('/')); }
    catch { activeCommercialProposalId = pathParts.join('/'); }
  }
  const projectPanels = ['proposals', 'proposal-detail', 'project-analysis', 'contract-review', 'estimate-analysis', 'analysis-detail'];
  const next = ['home', 'projects', ...projectPanels, 'space', 'games', 'objects', 'cashflow', 'profile', 'passport'].includes(requestedPanel) ? requestedPanel : 'home';
  $('[data-dashboard]').classList.toggle('is-space-mode', next === 'space');
  if (next !== 'space') {
    $('[data-space-toolbar]').hidden = true;
    $('[data-space-settings]').setAttribute('aria-expanded', 'false');
  }
  $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== next; panel.classList.toggle('is-active', panel.dataset.panel === next); });
  $$('[data-tab]').forEach((button) => { button.classList.toggle('is-active', button.dataset.tab === next || (projectPanels.includes(next) && button.dataset.tab === 'projects') || (next === 'passport' && button.dataset.tab === 'profile')); });
  const panelHash = next === 'proposal-detail' && activeCommercialProposalId
    ? `#proposal-detail/${encodeURIComponent(activeCommercialProposalId)}`
    : `#${next}`;
  history.replaceState(null, '', panelHash);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (next === 'space') requestAnimationFrame(renderWidgets);
  if (next === 'games') window.dispatchEvent(new CustomEvent('structos:games-visible'));
  if (next === 'projects') renderMyProjects();
  if (next === 'proposals') renderCommercialProposals();
  if (next === 'proposal-detail') renderCommercialProposalWorkspace();
  if (next === 'analysis-detail') renderAnalysisDetail();
  if (next === 'objects') renderObjects();
  if (next === 'cashflow') renderCashflow();
  if (next === 'profile') { renderProfilePersonalData(); renderConnectionsSummary(); }
  if (next === 'passport') renderPassportEditor();
  closeMenu();
}

let bottomMenuAnimationTimer = null;

function updateBottomMenuAccessibility() {
  const menu = $('[data-bottom-menu]');
  const toggle = $('[data-bottom-menu-toggle]');
  if (!menu || !toggle) return;
  const open = menu.classList.contains('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', tr(open ? 'collapseMenu' : 'menu'));
  toggle.setAttribute('title', tr(open ? 'collapseMenu' : 'menu'));
}

function setBottomMenu(open, options = {}) {
  const menu = $('[data-bottom-menu]');
  const nav = $('[data-bottom-nav]');
  const items = nav ? $('.bottom-nav-items', nav) : null;
  if (!menu || !nav || !items) return;
  const shouldAnimate = options.animate !== false;
  menu.classList.toggle('is-open', open);
  menu.classList.toggle('is-collapsed', !open);
  nav.hidden = false;
  items.setAttribute('aria-hidden', String(!open));
  $$('[data-tab]', items).forEach((button) => { button.tabIndex = open ? 0 : -1; });
  updateBottomMenuAccessibility();
  if (options.persist !== false) localStorage.setItem(BOTTOM_MENU_STATE_KEY, String(open));
  clearTimeout(bottomMenuAnimationTimer);
  menu.classList.remove('is-building');
  if (open && shouldAnimate) {
    requestAnimationFrame(() => {
      if (!menu.classList.contains('is-open')) return;
      menu.classList.add('is-building');
      bottomMenuAnimationTimer = setTimeout(() => menu.classList.remove('is-building'), 1250);
    });
  }
}

function restoreBottomMenuState() {
  const saved = localStorage.getItem(BOTTOM_MENU_STATE_KEY);
  setBottomMenu(saved !== 'false', { animate: false, persist: false });
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
  passport: { label: 'widgetPassport', icon: '◇', hint: '40%' },
  project: { label: 'project', icon: '▱', hint: '1' },
  contract: { label: 'contract', icon: '§', hint: '1' },
  estimate: { label: 'estimate', icon: '₽', hint: '1' },
  tasks: { label: 'widgetTasks', icon: '☑', hint: '0' },
  team: { label: 'widgetTeam', icon: '◎', hint: '0' },
  finance: { label: 'widgetFinance', icon: '₽', hint: '0 ₽' },
  drawing: { label: 'widgetDrawing', icon: '✎', hint: '∞' },
  calendar: { label: 'widgetCalendar', icon: '▦', hint: '' }
};
const defaultWidgets = Object.keys(widgetDefinitions);
const WIDGETS_VERSION_KEY = 'structos-space-widgets-version';

function readStoredJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}

const passportCountryDirectory = [
  { code: 'RU', names: { RU: 'Россия', EN: 'Russia', KY: 'Россия', TJ: 'Русия' }, cities: ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск', 'Нижний Новгород', 'Самара', 'Краснодар', 'Сочи', 'Тюмень', 'Владивосток'] },
  { code: 'KG', names: { RU: 'Кыргызстан', EN: 'Kyrgyzstan', KY: 'Кыргызстан', TJ: 'Қирғизистон' }, cities: ['Бишкек', 'Ош', 'Джалал-Абад', 'Каракол'] },
  { code: 'TJ', names: { RU: 'Таджикистан', EN: 'Tajikistan', KY: 'Тажикстан', TJ: 'Тоҷикистон' }, cities: ['Душанбе', 'Худжанд', 'Бохтар', 'Куляб'] },
  { code: 'UZ', names: { RU: 'Узбекистан', EN: 'Uzbekistan', KY: 'Өзбекстан', TJ: 'Ӯзбекистон' }, cities: ['Ташкент', 'Самарканд', 'Бухара', 'Наманган', 'Андижан'] },
  { code: 'KZ', names: { RU: 'Казахстан', EN: 'Kazakhstan', KY: 'Казакстан', TJ: 'Қазоқистон' }, cities: ['Астана', 'Алматы', 'Шымкент', 'Караганда', 'Атырау'] },
  { code: 'BY', names: { RU: 'Беларусь', EN: 'Belarus', KY: 'Беларусь', TJ: 'Беларус' }, cities: ['Минск', 'Брест', 'Гомель', 'Гродно'] },
  { code: 'AM', names: { RU: 'Армения', EN: 'Armenia', KY: 'Армения', TJ: 'Арманистон' }, cities: ['Ереван', 'Гюмри', 'Ванадзор'] },
  { code: 'AZ', names: { RU: 'Азербайджан', EN: 'Azerbaijan', KY: 'Азербайжан', TJ: 'Озарбойҷон' }, cities: ['Баку', 'Гянджа', 'Сумгаит'] },
  { code: 'GE', names: { RU: 'Грузия', EN: 'Georgia', KY: 'Грузия', TJ: 'Гурҷистон' }, cities: ['Тбилиси', 'Батуми', 'Кутаиси'] },
  { code: 'MD', names: { RU: 'Молдова', EN: 'Moldova', KY: 'Молдова', TJ: 'Молдова' }, cities: ['Кишинёв', 'Бельцы', 'Тирасполь'] },
  { code: 'TM', names: { RU: 'Туркменистан', EN: 'Turkmenistan', KY: 'Түркмөнстан', TJ: 'Туркманистон' }, cities: ['Ашхабад', 'Туркменабад', 'Дашогуз'] },
  { code: 'TR', names: { RU: 'Турция', EN: 'Türkiye', KY: 'Түркия', TJ: 'Туркия' }, cities: ['Стамбул', 'Анкара', 'Анталья', 'Измир'] },
  { code: 'NL', names: { RU: 'Нидерланды', EN: 'Netherlands', KY: 'Нидерланддар', TJ: 'Нидерланд' }, cities: ['Амстердам', 'Роттердам', 'Гаага', 'Утрехт'] },
  { code: 'DE', names: { RU: 'Германия', EN: 'Germany', KY: 'Германия', TJ: 'Олмон' }, cities: ['Берлин', 'Мюнхен', 'Гамбург', 'Франкфурт'] },
  { code: 'UA', names: { RU: 'Украина', EN: 'Ukraine', KY: 'Украина', TJ: 'Украина' }, cities: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Львов'] },
  { code: 'PL', names: { RU: 'Польша', EN: 'Poland', KY: 'Польша', TJ: 'Лаҳистон' }, cities: ['Варшава', 'Краков', 'Вроцлав', 'Гданьск'] },
  { code: 'CZ', names: { RU: 'Чехия', EN: 'Czechia', KY: 'Чехия', TJ: 'Чехия' }, cities: ['Прага', 'Брно', 'Острава'] },
  { code: 'GB', names: { RU: 'Великобритания', EN: 'United Kingdom', KY: 'Улуу Британия', TJ: 'Британияи Кабир' }, cities: ['Лондон', 'Манчестер', 'Бирмингем', 'Ливерпуль'] },
  { code: 'FR', names: { RU: 'Франция', EN: 'France', KY: 'Франция', TJ: 'Фаронса' }, cities: ['Париж', 'Марсель', 'Лион', 'Тулуза'] },
  { code: 'IT', names: { RU: 'Италия', EN: 'Italy', KY: 'Италия', TJ: 'Италия' }, cities: ['Рим', 'Милан', 'Неаполь', 'Турин'] },
  { code: 'ES', names: { RU: 'Испания', EN: 'Spain', KY: 'Испания', TJ: 'Испания' }, cities: ['Мадрид', 'Барселона', 'Валенсия', 'Севилья'] },
  { code: 'US', names: { RU: 'США', EN: 'United States', KY: 'АКШ', TJ: 'ИМА' }, cities: ['Нью-Йорк', 'Лос-Анджелес', 'Чикаго', 'Хьюстон'] },
  { code: 'AE', names: { RU: 'ОАЭ', EN: 'United Arab Emirates', KY: 'БАЭ', TJ: 'АМА' }, cities: ['Дубай', 'Абу-Даби', 'Шарджа'] },
  { code: 'CN', names: { RU: 'Китай', EN: 'China', KY: 'Кытай', TJ: 'Чин' }, cities: ['Пекин', 'Шанхай', 'Гуанчжоу', 'Шэньчжэнь'] },
  { code: 'IN', names: { RU: 'Индия', EN: 'India', KY: 'Индия', TJ: 'Ҳиндустон' }, cities: ['Дели', 'Мумбаи', 'Бангалор', 'Хайдарабад'] },
  { code: 'AF', names: { RU: 'Афганистан', EN: 'Afghanistan', KY: 'Ооганстан', TJ: 'Афғонистон' }, cities: ['Кабул', 'Герат', 'Кандагар', 'Мазари-Шариф'] },
  { code: 'PK', names: { RU: 'Пакистан', EN: 'Pakistan', KY: 'Пакистан', TJ: 'Покистон' }, cities: ['Исламабад', 'Карачи', 'Лахор', 'Пешавар'] },
  { code: 'MN', names: { RU: 'Монголия', EN: 'Mongolia', KY: 'Монголия', TJ: 'Муғулистон' }, cities: ['Улан-Батор', 'Эрдэнэт', 'Дархан'] }
];

const passportNationalityDirectory = [
  { code: 'RU', names: { RU: 'Русский', EN: 'Russian', KY: 'Орус', TJ: 'Рус' } },
  { code: 'KG', names: { RU: 'Кыргыз', EN: 'Kyrgyz', KY: 'Кыргыз', TJ: 'Қирғиз' } },
  { code: 'TJ', names: { RU: 'Таджик', EN: 'Tajik', KY: 'Тажик', TJ: 'Тоҷик' } },
  { code: 'UZ', names: { RU: 'Узбек', EN: 'Uzbek', KY: 'Өзбек', TJ: 'Ӯзбек' } },
  { code: 'KZ', names: { RU: 'Казах', EN: 'Kazakh', KY: 'Казак', TJ: 'Қазоқ' } },
  { code: 'BY', names: { RU: 'Белорус', EN: 'Belarusian', KY: 'Беларус', TJ: 'Белорус' } },
  { code: 'AM', names: { RU: 'Армянин', EN: 'Armenian', KY: 'Армян', TJ: 'Арманӣ' } },
  { code: 'AZ', names: { RU: 'Азербайджанец', EN: 'Azerbaijani', KY: 'Азербайжан', TJ: 'Озарбойҷонӣ' } },
  { code: 'GE', names: { RU: 'Грузин', EN: 'Georgian', KY: 'Грузин', TJ: 'Гурҷӣ' } },
  { code: 'MD', names: { RU: 'Молдаванин', EN: 'Moldovan', KY: 'Молдован', TJ: 'Молдаван' } },
  { code: 'TM', names: { RU: 'Туркмен', EN: 'Turkmen', KY: 'Түркмөн', TJ: 'Туркман' } },
  { code: 'TR', names: { RU: 'Турок', EN: 'Turkish', KY: 'Түрк', TJ: 'Турк' } },
  { code: 'NL', names: { RU: 'Нидерландец', EN: 'Dutch', KY: 'Нидерланд', TJ: 'Нидерландӣ' } },
  { code: 'DE', names: { RU: 'Немец', EN: 'German', KY: 'Немис', TJ: 'Олмонӣ' } },
  { code: 'UA', names: { RU: 'Украинец', EN: 'Ukrainian', KY: 'Украин', TJ: 'Украинӣ' } },
  { code: 'PL', names: { RU: 'Поляк', EN: 'Polish', KY: 'Поляк', TJ: 'Лаҳистонӣ' } },
  { code: 'CZ', names: { RU: 'Чех', EN: 'Czech', KY: 'Чех', TJ: 'Чех' } },
  { code: 'GB', names: { RU: 'Британец', EN: 'British', KY: 'Британ', TJ: 'Бритониёӣ' } },
  { code: 'FR', names: { RU: 'Француз', EN: 'French', KY: 'Француз', TJ: 'Фаронсавӣ' } },
  { code: 'IT', names: { RU: 'Итальянец', EN: 'Italian', KY: 'Италиялык', TJ: 'Итолиёӣ' } },
  { code: 'ES', names: { RU: 'Испанец', EN: 'Spanish', KY: 'Испан', TJ: 'Испанӣ' } },
  { code: 'US', names: { RU: 'Американец', EN: 'American', KY: 'Америкалык', TJ: 'Амрикоӣ' } },
  { code: 'AE', names: { RU: 'Араб', EN: 'Arab', KY: 'Араб', TJ: 'Араб' } },
  { code: 'CN', names: { RU: 'Китаец', EN: 'Chinese', KY: 'Кытай', TJ: 'Чинӣ' } },
  { code: 'IN', names: { RU: 'Индиец', EN: 'Indian', KY: 'Индиялык', TJ: 'Ҳинду' } },
  { code: 'AF', names: { RU: 'Афганец', EN: 'Afghan', KY: 'Ооган', TJ: 'Афғон' } },
  { code: 'PK', names: { RU: 'Пакистанец', EN: 'Pakistani', KY: 'Пакистандык', TJ: 'Покистонӣ' } },
  { code: 'MN', names: { RU: 'Монгол', EN: 'Mongolian', KY: 'Монгол', TJ: 'Муғул' } }
];

const countryDirectoryAliases = {
  RU: ['РФ', 'Российская Федерация', 'Russia', 'Russian Federation'], KG: ['Киргизия', 'Кыргызская Республика', 'Kyrgyzstan'], TJ: ['Республика Таджикистан', 'Tajikistan'], UZ: ['Республика Узбекистан', 'Uzbekistan'], KZ: ['Республика Казахстан', 'Kazakhstan'], BY: ['Республика Беларусь', 'Белоруссия', 'Belarus'], AE: ['Эмираты', 'United Arab Emirates', 'UAE'], US: ['Соединённые Штаты', 'Соединённые Штаты Америки', 'United States', 'USA'], GB: ['Великобритания', 'Англия', 'United Kingdom', 'UK']
};
const cityDirectoryAliases = {
  'Москва': ['МСК', 'Moscow', 'Moskva'], 'Санкт-Петербург': ['СПб', 'Питер', 'Петербург', 'Saint Petersburg', 'St Petersburg', 'Sankt Peterburg'], 'Нижний Новгород': ['Нижний', 'НН', 'Nizhny Novgorod'], 'Екатеринбург': ['Екб', 'Yekaterinburg', 'Ekaterinburg'], 'Новосибирск': ['Нск', 'Novosibirsk'], 'Казань': ['Kazan'], 'Самара': ['Samara'], 'Алматы': ['Алма-Ата', 'Almaty'], 'Астана': ['Нур-Султан', 'Nur-Sultan', 'Astana'], 'Кишинёв': ['Кишинев', 'Chisinau'], 'Днепр': ['Днепропетровск', 'Dnipro', 'Dnepropetrovsk']
};
const nationalityDirectoryAliases = { RU: ['Россиянин', 'Россиянка', 'Русская'], KG: ['Киргиз', 'Киргизка', 'Кыргызка'], TJ: ['Таджичка'], UZ: ['Узбечка'], KZ: ['Казашка'], BY: ['Белоруска', 'Белорусский'], UA: ['Украинка'] };

const passportVisibilityKeys = ['photo', 'id', 'lastName', 'firstName', 'patronymic', 'birthDate', 'maritalStatus', 'nationality', 'citizenship', 'businessTrips', 'patent', 'workPermit', 'residenceCountry', 'residenceCity', 'nearestMetro', 'phone', 'email', 'messengers', 'schedule', 'professions', 'skills', 'workLocations'];

function defaultPassportVisibility() {
  return Object.fromEntries(passportVisibilityKeys.map((key) => [key, true]));
}

function loadPersonData() {
  const saved = readStoredJSON(PERSON_DATA_KEY, {});
  return {
    photo: typeof saved.photo === 'string' ? saved.photo : '',
    lastName: String(saved.lastName || '').slice(0, 80),
    firstName: String(saved.firstName || '').slice(0, 80),
    patronymic: String(saved.patronymic || '').slice(0, 80),
    birthDate: /^\d{4}-\d{2}-\d{2}$/.test(String(saved.birthDate || '')) ? saved.birthDate : '',
    maritalStatus: ['single', 'married', 'divorced', 'widowed'].includes(saved.maritalStatus) ? saved.maritalStatus : '',
    nationality: String(saved.nationality || '').slice(0, 100),
    citizenship: String(saved.citizenship || '').slice(0, 100),
    residenceCountry: String(saved.residenceCountry || '').slice(0, 100)
  };
}

function loadProfileData() {
  const saved = readStoredJSON(PROFILE_DATA_KEY, {});
  return { phone: String(saved.phone || '').slice(0, 60), email: String(saved.email || '').slice(0, 120), city: String(saved.city || '').slice(0, 100), metro: String(saved.metro || '').slice(0, 100), profession: String(saved.profession || '').slice(0, 140) };
}

function loadBuilderPassport() {
  const saved = readStoredJSON(BUILDER_PASSPORT_KEY, {});
  const defaults = defaultPassportVisibility();
  const visibleFields = Object.fromEntries(passportVisibilityKeys.map((key) => [key,
    typeof saved.visibleFields?.[key] === 'boolean'
      ? saved.visibleFields[key]
      : saved.privacy?.[key]?.public !== false && saved.privacy?.[key]?.link !== false
  ]));
  const workLocations = Array.isArray(saved.workLocations) ? saved.workLocations.filter(Boolean).slice(0, 12).map((item) => ({ id: String(item.id || `place-${Date.now()}-${Math.random().toString(16).slice(2)}`), country: String(item.country || '').slice(0, 100), city: String(item.city || '').slice(0, 100) })) : [];
  const professions = Array.isArray(saved.professions) ? saved.professions.filter(Boolean).slice(0, 50).map((item) => ({ id: String(item.id || `profession-${Date.now()}-${Math.random().toString(16).slice(2)}`), name: String(item.name || '').slice(0, 140), experience: Math.max(0, Math.min(70, Number(item.experience) || 0)) })) : [];
  const scheduleDays = Array.isArray(saved.scheduleDays) ? saved.scheduleDays.filter((day) => ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].includes(day)) : [];
  const skills = Array.isArray(saved.skills) ? saved.skills.filter((value) => typeof value === 'string' && value.trim()).slice(0, 80).map((value) => value.trim().slice(0, 120)) : [];
  return {
    patent: Boolean(saved.patent),
    workPermit: Boolean(saved.workPermit),
    businessTrips: typeof saved.businessTrips === 'boolean' ? saved.businessTrips : null,
    messengerLinked: typeof saved.messengerLinked === 'boolean' ? saved.messengerLinked : null,
    messengers: { max: Boolean(saved.messengers?.max), telegram: Boolean(saved.messengers?.telegram), whatsapp: Boolean(saved.messengers?.whatsapp) },
    anySchedule: Boolean(saved.anySchedule),
    scheduleDays,
    nightShifts: Boolean(saved.nightShifts),
    callFrom: /^\d{2}:\d{2}$/.test(String(saved.callFrom || '')) ? saved.callFrom : '',
    callTo: /^\d{2}:\d{2}$/.test(String(saved.callTo || '')) ? saved.callTo : '',
    professions: professions.length ? professions : [{ id: `profession-${Date.now()}`, name: '', experience: 0 }],
    skills,
    workLocations: workLocations.length ? workLocations : [{ id: `place-${Date.now()}`, country: '', city: '' }],
    important: {
      contractorSearch: Boolean(saved.important?.contractorSearch ?? saved.preferences?.participateSearch),
      employeeSearch: Boolean(saved.important?.employeeSearch),
      tenderParticipation: Boolean(saved.important?.tenderParticipation),
      employmentOffers: Boolean(saved.important?.employmentOffers ?? saved.preferences?.receiveJobOffers),
      objectOffers: Boolean(saved.important?.objectOffers ?? saved.preferences?.receiveVolumeOffers),
      passportAvailable: Boolean(saved.important?.passportAvailable ?? saved.preferences?.passportAvailable)
    },
    visibleFields: { ...defaults, ...visibleFields }
  };
}

let personData = loadPersonData();
let profileData = loadProfileData();
let builderPassport = loadBuilderPassport();
if (!builderPassport.professions.some((item) => item.name) && profileData.profession) builderPassport.professions[0].name = profileData.profession;
let authSeedName = '';
let passportImportantExpanded = false;
let passportAccessListExpanded = false;

function localizedCountryName(country) { return country.names[language] || country.names.RU; }

function localizedNationalityName(nationality) { return nationality.names[language] || nationality.names.RU; }

function normalizeDirectoryValue(value) {
  return String(value || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase(root.lang || 'ru')
    .replace(/ё/g, 'е')
    .replace(/№/g, ' номер ')
    .replace(/&/g, ' и ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const russianKeyboardCharacters = Object.freeze({ q: 'й', w: 'ц', e: 'у', r: 'к', t: 'е', y: 'н', u: 'г', i: 'ш', o: 'щ', p: 'з', '[': 'х', ']': 'ъ', a: 'ф', s: 'ы', d: 'в', f: 'а', g: 'п', h: 'р', j: 'о', k: 'л', l: 'д', ';': 'ж', "'": 'э', z: 'я', x: 'ч', c: 'с', v: 'м', b: 'и', n: 'т', m: 'ь', ',': 'б', '.': 'ю' });

function russianKeyboardValue(value) {
  return String(value || '').toLocaleLowerCase('en').replace(/[qwertyuiop\[\]asdfghjkl;'zxcvbnm,.]/g, (character) => russianKeyboardCharacters[character] || character);
}

function latinTransliterationValue(value) {
  let result = String(value || '').toLocaleLowerCase('en');
  const combinations = [['shch', 'щ'], ['sch', 'щ'], ['yo', 'ё'], ['jo', 'ё'], ['zh', 'ж'], ['kh', 'х'], ['ts', 'ц'], ['ch', 'ч'], ['sh', 'ш'], ['yu', 'ю'], ['ju', 'ю'], ['ya', 'я'], ['ja', 'я'], ['ye', 'е']];
  combinations.forEach(([latin, cyrillic]) => { result = result.replaceAll(latin, cyrillic); });
  const characters = { a: 'а', b: 'б', c: 'к', d: 'д', e: 'е', f: 'ф', g: 'г', h: 'х', i: 'и', j: 'й', k: 'к', l: 'л', m: 'м', n: 'н', o: 'о', p: 'п', q: 'к', r: 'р', s: 'с', t: 'т', u: 'у', v: 'в', w: 'в', x: 'кс', y: 'ы', z: 'з' };
  return result.replace(/[a-z]/g, (character) => characters[character] || character);
}

function directorySearchForms(value) {
  const source = String(value || '').trim();
  if (!source) return [];
  const rawVariants = [source, source.replace(/\(([^)]+)\)/g, ' $1 '), source.replace(/\([^)]*\)/g, ' '), russianKeyboardValue(source), latinTransliterationValue(source)];
  const forms = new Set();
  rawVariants.forEach((variant) => {
    const normalized = normalizeDirectoryValue(variant);
    if (!normalized) return;
    forms.add(normalized);
    forms.add(normalized.replace(/^(?:станция\s+)?(?:метро|м)\s+/, '').trim());
    forms.add(normalized.replace(/\bим\b/g, 'имени').trim());
    forms.add(normalized.replace(/\s+[12]$/, '').trim());
  });
  return [...forms].filter(Boolean);
}

function directoryValuesEquivalent(left, right) {
  const rightForms = new Set(directorySearchForms(right));
  return directorySearchForms(left).some((form) => rightForms.has(form));
}

function boundedEditDistance(left, right, limit) {
  if (Math.abs(left.length - right.length) > limit) return limit + 1;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row += 1) {
    const current = [row];
    let rowMinimum = current[0];
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(current[column - 1] + 1, previous[column] + 1, previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1));
      rowMinimum = Math.min(rowMinimum, current[column]);
    }
    if (rowMinimum > limit) return limit + 1;
    previous = current;
  }
  return previous[right.length];
}

function directoryTokenStemMatch(candidate, query) {
  if (candidate.startsWith(query) || query.startsWith(candidate)) return true;
  const minimumLength = Math.min(candidate.length, query.length);
  if (minimumLength < 6) return false;
  let common = 0;
  while (common < minimumLength && candidate[common] === query[common]) common += 1;
  return common >= Math.max(5, Math.floor(minimumLength * .68));
}

function directoryMatchScore(keywords, query) {
  const queryForms = directorySearchForms(query);
  if (!queryForms.length) return 0;
  const candidateForms = [...new Set(keywords.flatMap(directorySearchForms))];
  let best = -1;
  queryForms.forEach((queryForm) => {
    const queryTokens = queryForm.split(' ').filter(Boolean);
    candidateForms.forEach((candidate) => {
      let score = -1;
      if (candidate === queryForm) score = 0;
      else if (candidate.startsWith(queryForm)) score = 1;
      else {
        const candidateTokens = candidate.split(' ').filter(Boolean);
        if (queryTokens.every((queryToken) => candidateTokens.some((token) => directoryTokenStemMatch(token, queryToken)))) score = 2;
        else if (candidate.includes(queryForm)) score = 3;
        else if (queryTokens.every((queryToken) => queryToken.length >= 4 && candidateTokens.some((token) => boundedEditDistance(token, queryToken, queryToken.length >= 6 ? 2 : 1) <= (queryToken.length >= 6 ? 2 : 1)))) score = 4;
      }
      if (score >= 0 && (best < 0 || score < best)) best = score;
    });
  });
  return best;
}

function metroStationSearchKeywords(station) {
  const parenthetical = [...String(station).matchAll(/\(([^)]+)\)/g)].map((match) => match[1]);
  return [...new Set([station, station.replace(/\([^)]*\)/g, '').trim(), station.replace(/\bим\.?\s*/i, 'имени '), station.replace(/\s+[12]$/, '').trim(), ...parenthetical])].filter(Boolean);
}

function metroCityByValue(value) {
  return Object.keys(metroDirectory).find((city) => [city, ...(cityDirectoryAliases[city] || [])].some((alias) => directoryValuesEquivalent(alias, value)));
}

function countryByValue(value) {
  return passportCountryDirectory.find((country) => [country.code, ...Object.values(country.names), ...(countryDirectoryAliases[country.code] || [])].some((name) => directoryValuesEquivalent(name, value)));
}

function nationalityByValue(value) {
  return passportNationalityDirectory.find((nationality) => [nationality.code, ...Object.values(nationality.names), ...(nationalityDirectoryAliases[nationality.code] || [])].some((name) => directoryValuesEquivalent(name, value)));
}

function personFullName() {
  return [personData.lastName, personData.firstName, personData.patronymic].filter(Boolean).join(' ').trim() || authSeedName || tr('userTariff');
}

function isForeignCitizen() {
  const value = personData.citizenship.trim();
  if (!value) return false;
  const country = countryByValue(value);
  if (country) return country.code !== 'RU';
  const normalized = value.toLocaleLowerCase(root.lang || 'ru');
  const russia = passportCountryDirectory.find((country) => country.code === 'RU');
  return !['рф', 'российская федерация', 'russian federation'].includes(normalized) && !Object.values(russia.names).some((name) => name.toLocaleLowerCase(root.lang || 'ru') === normalized);
}

function passportCompletion() {
  const values = [true, personData.photo, personData.lastName, personData.firstName, personData.patronymic, personData.birthDate, personData.maritalStatus, personData.nationality, personData.citizenship, personData.residenceCountry, profileData.city, profileData.metro, profileData.phone, profileData.email, typeof builderPassport.messengerLinked === 'boolean', typeof builderPassport.businessTrips === 'boolean', builderPassport.professions.some((item) => item.name), builderPassport.skills.length > 0, builderPassport.workLocations.some((item) => item.country.trim() && item.city.trim())];
  return Math.round(values.filter(Boolean).length / values.length * 100);
}

function calculatedProfileCompletion() {
  const values = [personData.photo, personData.lastName, personData.firstName, personData.patronymic, personData.birthDate, personData.maritalStatus, personData.nationality, personData.citizenship, personData.residenceCountry, profileData.phone, profileData.email, profileData.city, profileData.metro, profileData.profession];
  return Math.round(values.filter(Boolean).length / values.length * 100);
}

function localDateKey(value = new Date()) {
  let date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function validTodoDate(value, fallback = localDateKey()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return fallback;
  return Number.isNaN(new Date(`${value}T12:00:00`).getTime()) ? fallback : value;
}

const storedWidgets = readStoredJSON('structos-space-widgets', defaultWidgets);
let selectedWidgets = (Array.isArray(storedWidgets) ? storedWidgets : defaultWidgets).filter((id) => widgetDefinitions[id]);
if (localStorage.getItem(WIDGETS_VERSION_KEY) !== '4') {
  if (!selectedWidgets.includes('calendar')) selectedWidgets.push('calendar');
  localStorage.setItem('structos-space-widgets', JSON.stringify(selectedWidgets));
  localStorage.setItem(WIDGETS_VERSION_KEY, '4');
}
let widgetPositions = readStoredJSON('structos-space-positions', {});
let widgetSizes = readStoredJSON('structos-space-sizes', {});
let widgetStyles = readStoredJSON(WIDGET_STYLES_KEY, {});
let todoItems = readStoredJSON(TODO_KEY, []);
if (!todoItems || !Array.isArray(todoItems)) todoItems = [];
todoItems = todoItems
  .filter((item) => item && typeof item.text === 'string')
  .map((item) => {
    const createdAt = item.createdAt || new Date().toISOString();
    const done = Boolean(item.done);
    return {
      id: String(item.id || `task-${Date.now()}-${Math.random().toString(16).slice(2)}`),
      text: item.text.slice(0, 160),
      done,
      dueDate: validTodoDate(item.dueDate, localDateKey(createdAt)),
      createdAt,
      completedAt: done ? (item.completedAt || createdAt) : null
    };
  });

function defaultPosition(index) {
  const cols = window.innerWidth >= 900 ? 4 : window.innerWidth >= 620 ? 3 : 2;
  return { x: 16 + (index % cols) * (window.innerWidth >= 620 ? 160 : 148), y: 70 + Math.floor(index / cols) * 108 };
}

function constrainedWidgetSize(width, height, canvas) {
  const maxWidth = Math.max(108, Math.min(320, canvas.clientWidth - 16));
  const maxHeight = Math.max(82, Math.min(260, canvas.clientHeight - 110));
  return {
    width: Math.max(108, Math.min(maxWidth, Number(width) || 138)),
    height: Math.max(82, Math.min(maxHeight, Number(height) || 96))
  };
}

function applyWidgetDimensions(card, width, height, canvas) {
  const size = constrainedWidgetSize(width, height, canvas);
  const scale = Math.max(.72, Math.min(1.7, Math.min(size.width / 138, size.height / 96)));
  card.style.width = `${size.width}px`;
  card.style.height = `${size.height}px`;
  card.style.setProperty('--widget-scale', scale.toFixed(3));
  return size;
}

function keepWidgetInsideCanvas(card, canvas) {
  const bottomClearance = $('[data-dashboard]').classList.contains('is-space-mode') ? 96 : 28;
  const x = Math.max(0, Math.min(canvas.clientWidth - card.offsetWidth, card.offsetLeft));
  const y = Math.max(0, Math.min(canvas.clientHeight - card.offsetHeight - bottomClearance, card.offsetTop));
  card.style.left = `${x}px`;
  card.style.top = `${y}px`;
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
    const style = widgetStyles[id] || {};
    if (widgetColors.includes(style.color)) card.style.setProperty('--widget-color', style.color);
    card.classList.toggle('is-pulsing', Boolean(style.pulse));
    const size = widgetSizes[id] || { width: 138, height: 96 };
    applyWidgetDimensions(card, size.width, size.height, canvas);
    const hint = id === 'objects'
      ? `${combinedManagedObjects().filter((object) => !object.completed).length}`
      : id === 'tasks' ? `${todoItems.filter((item) => !item.done).length} / ${todoItems.length}`
        : id === 'finance' ? `${cashflowObjects.length}`
          : id === 'passport' ? `${passportCompletion()}%`
          : id === 'calendar' ? new Intl.DateTimeFormat(root.lang || 'ru', { day: 'numeric', month: 'short' }).format(new Date()) : definition.hint;
    card.innerHTML = `<span class="space-widget-icon">${definition.icon}</span><strong>${tr(definition.label)}</strong><small>${hint} · ${tr('quickFunction')}</small><i class="widget-resize-handle" aria-hidden="true"></i>`;
    let tapTimer = 0;
    let lastTap = 0;
    card.addEventListener('click', (event) => {
      if (Date.now() < Number(card.dataset.suppressClickUntil || 0) || event.target.closest('.widget-resize-handle')) return;
      const now = Date.now();
      if (now - lastTap < 330) {
        clearTimeout(tapTimer);
        lastTap = 0;
        openWidgetAppearance(id);
        return;
      }
      lastTap = now;
      tapTimer = window.setTimeout(() => {
        lastTap = 0;
        openView(id === 'analysis' ? 'project' : id);
      }, 330);
    });
    enableWidgetInteraction(card, canvas);
    canvas.append(card);
    keepWidgetInsideCanvas(card, canvas);
  });
}

function enableWidgetInteraction(card, canvas) {
  const pointers = new Map();
  let mode = 'idle';
  let startX = 0, startY = 0, originX = 0, originY = 0;
  let startWidth = 0, startHeight = 0, pinchDistance = 1;
  let moved = false;

  const beginPinch = () => {
    const points = [...pointers.values()];
    if (points.length < 2) return;
    mode = 'pinch';
    pinchDistance = Math.max(1, Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y));
    startWidth = card.offsetWidth;
    startHeight = card.offsetHeight;
    moved = true;
    card.classList.remove('is-dragging');
    card.classList.add('is-resizing');
  };

  card.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    card.setPointerCapture(event.pointerId);
    if (pointers.size >= 2) { beginPinch(); return; }
    startX = event.clientX; startY = event.clientY;
    startWidth = card.offsetWidth; startHeight = card.offsetHeight;
    moved = false;
    if (event.target.closest('.widget-resize-handle')) {
      mode = 'resize';
      card.classList.add('is-resizing');
    } else {
      mode = 'drag';
      originX = card.offsetLeft; originY = card.offsetTop;
      card.classList.add('is-dragging');
    }
  });

  card.addEventListener('pointermove', (event) => {
    if (!pointers.has(event.pointerId)) return;
    event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2) {
      if (mode !== 'pinch') beginPinch();
      const points = [...pointers.values()];
      const distance = Math.max(1, Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y));
      const scale = distance / pinchDistance;
      applyWidgetDimensions(card, startWidth * scale, startHeight * scale, canvas);
      keepWidgetInsideCanvas(card, canvas);
      return;
    }
    const dx = event.clientX - startX, dy = event.clientY - startY;
    moved ||= Math.abs(dx) + Math.abs(dy) > 5;
    if (mode === 'resize') {
      applyWidgetDimensions(card, startWidth + dx, startHeight + dy, canvas);
      keepWidgetInsideCanvas(card, canvas);
      return;
    }
    if (mode === 'drag') {
      card.style.left = `${originX + dx}px`;
      card.style.top = `${originY + dy}px`;
      keepWidgetInsideCanvas(card, canvas);
    }
  });

  const finishPointer = (event) => {
    pointers.delete(event.pointerId);
    if (card.hasPointerCapture(event.pointerId)) card.releasePointerCapture(event.pointerId);
    if (pointers.size) { mode = 'idle'; return; }
    card.classList.remove('is-dragging'); card.dataset.moved = moved ? 'true' : '';
    card.classList.remove('is-resizing');
    if (moved) card.dataset.suppressClickUntil = String(Date.now() + 450);
    widgetPositions[card.dataset.widget] = { x: card.offsetLeft, y: card.offsetTop };
    widgetSizes[card.dataset.widget] = { width: card.offsetWidth, height: card.offsetHeight };
    localStorage.setItem('structos-space-positions', JSON.stringify(widgetPositions));
    localStorage.setItem('structos-space-sizes', JSON.stringify(widgetSizes));
    mode = 'idle';
    setTimeout(() => { delete card.dataset.moved; }, 0);
  };
  card.addEventListener('pointerup', finishPointer);
  card.addEventListener('pointercancel', finishPointer);
}

function renderWidgetPicker() {
  const picker = $('[data-widget-picker]'); if (!picker) return;
  picker.replaceChildren(...Object.entries(widgetDefinitions).map(([id, definition]) => {
    const selected = selectedWidgets.includes(id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `widget-choice${selected ? ' is-selected' : ''}`;
    button.innerHTML = `<span class="widget-choice-icon">${definition.icon}</span><span class="widget-choice-copy"><strong>${tr(definition.label)}</strong><small>${tr(selected ? 'onField' : 'addToField')}</small></span><b class="widget-choice-state">${selected ? '✓' : '+'}</b>`;
    button.addEventListener('click', () => { selectedWidgets = selectedWidgets.includes(id) ? selectedWidgets.filter((item) => item !== id) : [...selectedWidgets, id]; localStorage.setItem('structos-space-widgets', JSON.stringify(selectedWidgets)); renderWidgetPicker(); renderWidgets(); });
    return button;
  }));
}

function saveWidgetStyles() {
  localStorage.setItem(WIDGET_STYLES_KEY, JSON.stringify(widgetStyles));
}

function openWidgetAppearance(id) {
  const definition = widgetDefinitions[id];
  if (!definition) return;
  const current = widgetStyles[id] || {};
  const hasColor = widgetColors.includes(current.color);
  const colors = widgetColors.map((color, index) => `<button class="widget-color-swatch${current.color === color ? ' is-selected' : ''}" type="button" data-widget-color="${color}" style="--swatch:${color}" aria-label="${tr('blockColor')} ${index + 1}"></button>`).join('');
  const noColor = `<button class="widget-color-swatch is-none${hasColor ? '' : ' is-selected'}" type="button" data-widget-no-color aria-label="${tr('noColor')}" title="${tr('noColor')}"><span>${tr('noColor')}</span></button>`;
  showDialog(tr('widgetAppearance'), tr('doubleTapHint'), `<section class="widget-appearance"><h3>${tr(definition.label)} · ${tr('blockColor')}</h3><div class="widget-color-grid">${noColor}${colors}</div><button class="widget-pulse-toggle${current.pulse ? ' is-on' : ''}" type="button" data-widget-pulse aria-pressed="${Boolean(current.pulse)}"><span>${tr('pulseBlock')}</span><i aria-hidden="true"></i></button></section>`);

  $$('[data-widget-color]', $('[data-dialog-content]')).forEach((button) => button.addEventListener('click', () => {
    widgetStyles[id] = { ...(widgetStyles[id] || {}), color: button.dataset.widgetColor };
    saveWidgetStyles();
    $$('.widget-color-swatch', $('[data-dialog-content]')).forEach((swatch) => swatch.classList.toggle('is-selected', swatch === button));
    const card = $(`.space-widget[data-widget="${id}"]`);
    card?.style.setProperty('--widget-color', button.dataset.widgetColor);
  }));
  $('[data-widget-no-color]', $('[data-dialog-content]'))?.addEventListener('click', (event) => {
    widgetStyles[id] = { ...(widgetStyles[id] || {}) };
    delete widgetStyles[id].color;
    saveWidgetStyles();
    $$('.widget-color-swatch', $('[data-dialog-content]')).forEach((swatch) => swatch.classList.toggle('is-selected', swatch === event.currentTarget));
    $(`.space-widget[data-widget="${id}"]`)?.style.removeProperty('--widget-color');
  });
  $('[data-widget-pulse]', $('[data-dialog-content]'))?.addEventListener('click', (event) => {
    const pulse = !Boolean(widgetStyles[id]?.pulse);
    widgetStyles[id] = { ...(widgetStyles[id] || {}), pulse };
    saveWidgetStyles();
    event.currentTarget.classList.toggle('is-on', pulse);
    event.currentTarget.setAttribute('aria-pressed', String(pulse));
    $(`.space-widget[data-widget="${id}"]`)?.classList.toggle('is-pulsing', pulse);
  });
}

function saveTodoItems() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todoItems));
}

function todoDateLabel(value) {
  try { return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T12:00:00`)); }
  catch { return value; }
}

function sortedTodoItems() {
  const today = localDateKey();
  const byDueDate = (left, right) => left.dueDate.localeCompare(right.dueDate) || String(left.createdAt).localeCompare(String(right.createdAt));
  const active = todoItems.filter((item) => !item.done).sort(byDueDate);
  const overdue = active.filter((item) => item.dueDate < today);
  const current = active.filter((item) => item.dueDate === today);
  const future = active.filter((item) => item.dueDate > today);
  const completed = todoItems
    .filter((item) => item.done)
    .sort((left, right) => String(right.completedAt || '').localeCompare(String(left.completedAt || '')));
  return { items: [...overdue, ...current, ...future, ...completed], today, nextFutureId: future[0]?.id || null };
}

function renderTodoList() {
  const list = $('[data-todo-list]', $('[data-dialog-content]'));
  if (!list) return;
  if (!todoItems.length) {
    list.innerHTML = `<div class="todo-empty">${tr('todoEmpty')}</div>`;
    return;
  }
  const { items, today, nextFutureId } = sortedTodoItems();
  list.innerHTML = items.map((item) => {
    const state = item.done ? 'done' : item.dueDate < today ? 'overdue' : item.dueDate === today ? 'today' : item.id === nextFutureId ? 'next' : 'future';
    const statusKey = { done: 'completedTask', overdue: 'overdueTask', today: 'todayTask', next: 'nextTask', future: 'futureTask' }[state];
    return `<article class="todo-row is-${state}" data-todo-row="${escapeHtml(item.id)}"><input class="todo-check" type="checkbox" data-todo-id="${escapeHtml(item.id)}" aria-label="${tr('completedTask')}"${item.done ? ' checked' : ''} /><div class="todo-copy"><strong>${escapeHtml(item.text)}</strong><small>${tr(statusKey)} · ${todoDateLabel(item.dueDate)}</small><input class="todo-date" type="date" value="${item.dueDate}" data-todo-date="${escapeHtml(item.id)}" aria-label="${tr('dueDate')}" /></div><button class="todo-delete" type="button" data-todo-delete="${escapeHtml(item.id)}" aria-label="${tr('deleteTask')}">×</button></article>`;
  }).join('');
  $$('[data-todo-id]', list).forEach((checkbox) => checkbox.addEventListener('change', () => {
    const task = todoItems.find((item) => item.id === checkbox.dataset.todoId);
    if (!task) return;
    task.done = checkbox.checked;
    task.completedAt = task.done ? new Date().toISOString() : null;
    saveTodoItems();
    renderTodoList();
    renderWidgets();
  }));
  $$('[data-todo-date]', list).forEach((input) => input.addEventListener('change', () => {
    const task = todoItems.find((item) => item.id === input.dataset.todoDate);
    if (!task) return;
    task.dueDate = validTodoDate(input.value);
    saveTodoItems();
    renderTodoList();
  }));
  $$('[data-todo-delete]', list).forEach((button) => button.addEventListener('click', () => {
    if (!window.confirm(tr('deleteTaskConfirm'))) return;
    todoItems = todoItems.filter((item) => item.id !== button.dataset.todoDelete);
    saveTodoItems();
    renderTodoList();
    renderWidgets();
    showToast(tr('taskDeleted'));
  }));
}

function openTodoDialog() {
  const today = localDateKey();
  showDialog(tr('todoList'), tr('todoEmpty'), `<div class="todo-create"><input data-todo-input maxlength="160" placeholder="${tr('newTask')}" /><input class="todo-new-date" type="date" value="${today}" data-todo-new-date aria-label="${tr('dueDate')}" /><button class="primary-button todo-add-button" type="button" data-todo-add aria-label="${tr('addTask')}">+</button></div><div class="todo-list" data-todo-list></div>`);
  renderTodoList();
  const input = $('[data-todo-input]', $('[data-dialog-content]'));
  const dateInput = $('[data-todo-new-date]', $('[data-dialog-content]'));
  const addTask = () => {
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    todoItems.unshift({ id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`, text: text.slice(0, 160), done: false, dueDate: validTodoDate(dateInput.value), createdAt: new Date().toISOString(), completedAt: null });
    saveTodoItems();
    input.value = '';
    dateInput.value = localDateKey();
    renderTodoList();
    renderWidgets();
    showToast(tr('taskAdded'));
  };
  $('[data-todo-add]', $('[data-dialog-content]'))?.addEventListener('click', addTask);
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addTask(); } });
  setTimeout(() => input?.focus(), 40);
}

let selectedCalendarDate = localDateKey();
let calendarMonthCursor = new Date(`${selectedCalendarDate}T12:00:00`);

function calendarMonthTitle(date) {
  return new Intl.DateTimeFormat(root.lang || 'ru', { month: 'long', year: 'numeric' }).format(date);
}

function calendarWeekdays() {
  const monday = new Date(2026, 0, 5, 12);
  return Array.from({ length: 7 }, (_, index) => new Intl.DateTimeFormat(root.lang || 'ru', { weekday: 'short' }).format(new Date(2026, 0, 5 + index, 12)).replace('.', ''));
}

function calendarDayTasks(dateKey) {
  return todoItems.filter((item) => item.dueDate === dateKey);
}

function calendarGridMarkup() {
  const year = calendarMonthCursor.getFullYear();
  const month = calendarMonthCursor.getMonth();
  const firstDay = new Date(year, month, 1, 12);
  const offset = (firstDay.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - offset, 12);
  const today = localDateKey();
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index, 12);
    const dateKey = localDateKey(date);
    const tasks = calendarDayTasks(dateKey);
    const activeCount = tasks.filter((item) => !item.done).length;
    const completedCount = tasks.length - activeCount;
    const classes = [date.getMonth() !== month ? 'is-outside' : '', dateKey === today ? 'is-today' : '', dateKey === selectedCalendarDate ? 'is-selected' : '', tasks.length ? 'has-tasks' : ''].filter(Boolean).join(' ');
    return `<button class="calendar-day ${classes}" type="button" data-calendar-date="${dateKey}" aria-label="${escapeHtml(todoDateLabel(dateKey))}"><span>${date.getDate()}</span>${tasks.length ? `<i aria-hidden="true">${activeCount ? `<b>${activeCount}</b>` : ''}${completedCount ? '<em></em>' : ''}</i>` : ''}</button>`;
  }).join('');
}

function calendarTasksMarkup() {
  const items = calendarDayTasks(selectedCalendarDate).sort((left, right) => Number(left.done) - Number(right.done) || String(left.createdAt).localeCompare(String(right.createdAt)));
  if (!items.length) return `<div class="calendar-empty">${tr('noCalendarEvents')}</div>`;
  return items.map((item) => `<label class="calendar-task${item.done ? ' is-done' : ''}"><input type="checkbox" data-calendar-task="${escapeHtml(item.id)}"${item.done ? ' checked' : ''} /><span>${escapeHtml(item.text)}</span></label>`).join('');
}

function renderCalendarDialog() {
  const rootElement = $('[data-calendar-root]', $('[data-dialog-content]'));
  if (!rootElement) return;
  rootElement.innerHTML = `<div class="calendar-toolbar"><button type="button" data-calendar-previous aria-label="${tr('previousMonth')}">‹</button><strong>${escapeHtml(calendarMonthTitle(calendarMonthCursor))}</strong><button type="button" data-calendar-next aria-label="${tr('nextMonth')}">›</button></div><button class="calendar-today" type="button" data-calendar-today>${tr('today')}</button><div class="calendar-weekdays">${calendarWeekdays().map((day) => `<span>${escapeHtml(day)}</span>`).join('')}</div><div class="calendar-grid">${calendarGridMarkup()}</div><section class="calendar-selected"><header><span>${tr('selectedDate')}</span><strong>${escapeHtml(todoDateLabel(selectedCalendarDate))}</strong></header><div class="calendar-task-list">${calendarTasksMarkup()}</div><div class="calendar-add"><input type="text" maxlength="160" data-calendar-task-input placeholder="${tr('addTaskForDate')}" /><button class="primary-button" type="button" data-calendar-task-add aria-label="${tr('addTask')}">+</button></div></section>`;
  $('[data-calendar-previous]', rootElement)?.addEventListener('click', () => { calendarMonthCursor = new Date(calendarMonthCursor.getFullYear(), calendarMonthCursor.getMonth() - 1, 1, 12); renderCalendarDialog(); });
  $('[data-calendar-next]', rootElement)?.addEventListener('click', () => { calendarMonthCursor = new Date(calendarMonthCursor.getFullYear(), calendarMonthCursor.getMonth() + 1, 1, 12); renderCalendarDialog(); });
  $('[data-calendar-today]', rootElement)?.addEventListener('click', () => { selectedCalendarDate = localDateKey(); calendarMonthCursor = new Date(`${selectedCalendarDate}T12:00:00`); renderCalendarDialog(); });
  $$('[data-calendar-date]', rootElement).forEach((button) => button.addEventListener('click', () => {
    selectedCalendarDate = button.dataset.calendarDate;
    const selected = new Date(`${selectedCalendarDate}T12:00:00`);
    if (selected.getMonth() !== calendarMonthCursor.getMonth() || selected.getFullYear() !== calendarMonthCursor.getFullYear()) calendarMonthCursor = new Date(selected.getFullYear(), selected.getMonth(), 1, 12);
    renderCalendarDialog();
  }));
  $$('[data-calendar-task]', rootElement).forEach((checkbox) => checkbox.addEventListener('change', () => {
    const task = todoItems.find((item) => item.id === checkbox.dataset.calendarTask);
    if (!task) return;
    task.done = checkbox.checked;
    task.completedAt = task.done ? new Date().toISOString() : null;
    saveTodoItems(); renderCalendarDialog(); renderWidgets();
  }));
  const input = $('[data-calendar-task-input]', rootElement);
  const addTask = () => {
    const text = input?.value.trim();
    if (!text) { input?.focus(); return; }
    todoItems.unshift({ id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`, text: text.slice(0, 160), done: false, dueDate: selectedCalendarDate, createdAt: new Date().toISOString(), completedAt: null });
    saveTodoItems(); renderCalendarDialog(); renderWidgets(); showToast(tr('taskAdded'));
  };
  $('[data-calendar-task-add]', rootElement)?.addEventListener('click', addTask);
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); addTask(); } });
}

function openCalendarDialog() {
  const selected = new Date(`${selectedCalendarDate}T12:00:00`);
  calendarMonthCursor = new Date(selected.getFullYear(), selected.getMonth(), 1, 12);
  showDialog(tr('calendar'), tr('calendarHint'), '<div data-calendar-root></div>');
  $('[data-dialog]')?.classList.add('calendar-dialog');
  renderCalendarDialog();
}

function showDialog(title, copyText, extra = '') {
  const dialog = $('[data-dialog]');
  dialog.classList.remove('cash-document-dialog', 'cash-export-dialog', 'calendar-dialog', 'invited-object-dialog', 'sync-dialog', 'session-prompt-dialog');
  $('[data-dialog-content]').innerHTML = `<div class="dialog-content"><h2>${title}</h2><p>${copyText}</p>${extra}</div>`;
  if (!dialog.open) dialog.showModal();
}

function waitForDialogToClose() {
  const dialog = $('[data-dialog]');
  if (!dialog?.open) return Promise.resolve();
  return new Promise((resolve) => dialog.addEventListener('close', resolve, { once: true }));
}

async function sessionPrompt(title, copyText, actions, tone = '') {
  await waitForDialogToClose();
  const buttons = actions.map((action) => `<button class="${action.primary ? 'primary-button' : 'outline-button'}" type="button" data-session-prompt-action="${escapeHtml(action.value)}">${escapeHtml(action.label)}</button>`).join('');
  showDialog(escapeHtml(title), escapeHtml(copyText), `<div class="session-prompt-visual ${escapeHtml(tone)}" aria-hidden="true"><span></span><i></i></div><div class="session-prompt-actions">${buttons}</div>`);
  const dialog = $('[data-dialog]');
  dialog.classList.add('session-prompt-dialog');
  return new Promise((resolve) => {
    let selection = 'dismiss';
    $$('[data-session-prompt-action]', dialog).forEach((button) => button.addEventListener('click', () => {
      selection = button.dataset.sessionPromptAction;
      dialog.close();
    }));
    dialog.addEventListener('close', () => resolve(selection), { once: true });
  });
}

function shouldOfferPushPermission() {
  if (!supportsPushNotifications() || Notification.permission === 'granted') return false;
  return Date.now() >= Number(localStorage.getItem(PUSH_REMINDER_KEY) || 0);
}

function schedulePushReminder() {
  localStorage.setItem(PUSH_REMINDER_KEY, String(Date.now() + (7 * 24 * 60 * 60 * 1000)));
}

function missingSocialConnections() {
  return ['vk', 'telegram', 'whatsapp', 'max'].filter((key) => !structosConnections[key]);
}

async function runLoginPrompts(dailyRewarded) {
  if (dailyRewarded) {
    await sessionPrompt(tr('dailyBonusTitle'), tr('dailyBonusCopy'), [{ value: 'ok', label: tr('dailyBonusButton'), primary: true }], 'is-bonus');
  }
  if (shouldOfferPushPermission()) {
    const permissionChoice = await sessionPrompt(tr('pushPermissionQuestion'), tr('pushPermissionLoginHint'), [
      { value: 'yes', label: tr('yes'), primary: true },
      { value: 'no', label: tr('no') }
    ], 'is-push');
    if (permissionChoice === 'yes') {
      await enablePushNotifications({ reopenCenter: false });
      if (Notification.permission === 'granted') localStorage.removeItem(PUSH_REMINDER_KEY);
      else schedulePushReminder();
    } else {
      schedulePushReminder();
    }
  }
  if (missingSocialConnections().length) {
    const connectionChoice = await sessionPrompt(tr('connectionsWarningTitle'), tr('connectionsWarningCopy'), [
      { value: 'link', label: tr('linkNow'), primary: true },
      { value: 'later', label: tr('later') }
    ], 'is-connections');
    if (connectionChoice === 'link') openConnectionsDialog();
  }
}

function historyMarkup(items, bonus = false) {
  if (!items.length) return `<div class="history-empty">${tr('noOperations')}</div>`;
  const formatter = new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric' });
  const bonusFormatter = new Intl.NumberFormat(root.lang || 'ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 5 });
  return `<div class="transaction-list">${items.map((item) => `<div class="transaction-row"><span><strong>${tr(item.key)}${item.detail ? ` · ${escapeHtml(item.detail)}` : ''}</strong><small>${formatter.format(new Date(item.date))}</small></span><b>+${bonus ? bonusFormatter.format(item.amount) : formatMoney(item.amount)}</b></div>`).join('')}</div>`;
}

function bonusRulesMarkup() {
  return `<section class="finance-bonus-rules"><header><h3>${tr('bonusRules')}</h3><p>${tr('newBonusRulesHint')}</p></header><div class="bonus-rules"><div><b>+25 ₽</b><span>${tr('dailyLoginReward')}</span></div><div><b>+750 ₽</b><span>${tr('activityMonthlyAccrual')}</span></div><div><b>10%</b><span>${tr('topUpHint')}</span></div><div><b>+200</b><span>${tr('passportFirstReward')}</span></div><div><b>+300</b><span>${tr('passport65Reward')}</span></div><div><b>+150 ₽</b><span>${tr('referralReward')}</span></div><div><b>+150</b><span>${tr('accountLinkReward')} · ${tr('rewardOnce')}</span></div><div><b>+10 ₽</b><span>${tr('gameWinReward')}</span></div></div></section>`;
}

function processBalanceTopUp(input, reopen) {
  const amount = Math.round(Number(input?.value) * 100) / 100;
  if (!Number.isFinite(amount) || amount <= 0) { input?.focus(); showToast(tr('invalidAmount')); return; }
  const bonus = Math.round(amount * 10) / 100;
  const date = new Date().toISOString();
  finance.balance += amount;
  finance.bonuses = Math.round((finance.bonuses + bonus) * 100) / 100;
  finance.balanceHistory.unshift({ key: 'balanceTopUp', amount, date });
  finance.bonusHistory.unshift({ key: 'topUpBonus', amount: bonus, date });
  saveFinance();
  renderFinance();
  $('[data-dialog]')?.close();
  showToast(tr('credited'));
  reopen();
}

function openBalanceDialog() {
  showDialog(tr('balance'), tr('topUpHint'), `<div class="topup-form"><label><span>${tr('topUpAmount')}</span><input data-topup-amount type="number" inputmode="decimal" min="1" step="1" placeholder="1000" /></label><button class="primary-button" type="button" data-topup>${tr('topUp')}</button></div><section class="history-section"><h3>${tr('balanceHistory')}</h3>${historyMarkup(finance.balanceHistory)}</section>`);
  $('[data-topup]')?.addEventListener('click', () => processBalanceTopUp($('[data-topup-amount]'), openBalanceDialog));
}

function openBonusDialog() {
  showDialog(tr('bonuses'), tr('bonusRules'), `${bonusRulesMarkup()}<section class="history-section"><h3>${tr('bonusHistory')}</h3>${historyMarkup(finance.bonusHistory, true)}</section>`);
}

function setFinanceHubTab(tab) {
  const next = tab === 'bonuses' ? 'bonuses' : 'balance';
  $$('[data-finance-hub-tab]').forEach((button) => {
    const active = button.dataset.financeHubTab === next;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  $$('[data-finance-hub-pane]').forEach((pane) => { pane.hidden = pane.dataset.financeHubPane !== next; });
}

function openFinanceHubDialog(activeTab = 'balance') {
  const balanceValue = formatMoney(finance.balance);
  const bonusValue = new Intl.NumberFormat(root.lang || 'ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(finance.bonuses);
  const markup = `<section class="finance-hub"><div class="finance-hub-balances"><button type="button" data-finance-hub-tab="balance"><span>${tr('moneyBalance')}</span><strong>${balanceValue}</strong><small>${tr('balanceHistory')}</small></button><button type="button" data-finance-hub-tab="bonuses"><span>${tr('bonusBalance')}</span><strong>${bonusValue}</strong><small>${tr('bonusHistory')}</small></button></div>${bonusRulesMarkup()}<div class="finance-hub-pane" data-finance-hub-pane="balance"><div class="topup-form"><label><span>${tr('topUpAmount')}</span><input data-topup-amount type="number" inputmode="decimal" min="1" step="1" placeholder="1000" /></label><button class="primary-button" type="button" data-topup>${tr('topUp')}</button></div><section class="history-section"><h3>${tr('balanceHistory')}</h3>${historyMarkup(finance.balanceHistory)}</section></div><div class="finance-hub-pane" data-finance-hub-pane="bonuses" hidden><section class="history-section"><h3>${tr('bonusHistory')}</h3>${historyMarkup(finance.bonusHistory, true)}</section></div></section>`;
  showDialog(tr('balanceBonuses'), tr('financeHubHint'), markup);
  const scope = $('[data-dialog-content]');
  $$('[data-finance-hub-tab]', scope).forEach((button) => button.addEventListener('click', () => setFinanceHubTab(button.dataset.financeHubTab)));
  $('[data-topup]', scope)?.addEventListener('click', () => processBalanceTopUp($('[data-topup-amount]', scope), () => openFinanceHubDialog('balance')));
  setFinanceHubTab(activeTab);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function openRenameDialog(title, currentName, maxLength, onSave) {
  showDialog(title, tr('enterNewName'), `<div class="object-form"><label><span class="sr-only">${escapeHtml(title)}</span><input data-rename-input maxlength="${maxLength}" value="${escapeHtml(currentName)}" /></label><button class="primary-button" type="button" data-confirm-rename>${tr('save')}</button></div>`);
  const scope = $('[data-dialog-content]');
  const input = $('[data-rename-input]', scope);
  const saveName = () => {
    const name = input?.value.trim().slice(0, maxLength) || '';
    if (!name) { input?.focus(); return; }
    onSave(name);
    $('[data-dialog]')?.close();
    showToast(tr('nameUpdated'));
  };
  $('[data-confirm-rename]', scope)?.addEventListener('click', saveName);
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); saveName(); } });
  setTimeout(() => { input?.focus(); input?.select(); }, 40);
}

function normalizeCashEntries(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((entry) => entry && Number.isFinite(Number(entry.amount)) && Number(entry.amount) > 0)
    .map((entry) => ({
      id: String(entry.id || `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`),
      amount: Math.round(Number(entry.amount) * 100) / 100,
      comment: String(entry.comment || '').slice(0, 240),
      date: entry.date || new Date().toISOString()
    }));
}

function cashDocumentParties(value) {
  const normalizeParty = (party) => ({
    name: String(party?.name || '').slice(0, 160),
    signature: String(party?.signature || '').slice(0, 160),
    seal: String(party?.seal || '').slice(0, 160)
  });
  return {
    prepared: normalizeParty(value?.prepared),
    confirmed: normalizeParty(value?.confirmed),
    performed: normalizeParty(value?.performed),
    accepted: normalizeParty(value?.accepted),
    date: /^\d{4}-\d{2}-\d{2}$/.test(value?.date || '') ? value.date : localDateKey()
  };
}

function cashSourceKey(value) {
  return String(value || '').trim().toLocaleLowerCase('ru').replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/giu, '');
}

function cashSourceCellText(value) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim();
  if (typeof value !== 'object') return '';
  if (typeof value.text === 'string') return value.text.trim();
  if (value.result != null) return cashSourceCellText(value.result);
  if (Array.isArray(value.richText)) return value.richText.map((part) => part?.text || '').join('').trim();
  return '';
}

function cashSourceProperty(record, aliases) {
  if (!record || typeof record !== 'object') return '';
  const wanted = new Set(aliases.map(cashSourceKey));
  const found = Object.entries(record).find(([key]) => wanted.has(cashSourceKey(key)));
  return found ? found[1] : '';
}

function cashSourceNumber(value) {
  if (Number.isFinite(Number(value))) return Math.max(0, Number(value));
  const normalized = cashSourceCellText(value).replace(/\s+/g, '').replace(',', '.').replace(/[^\d.-]+/g, '');
  const number = Number(normalized);
  return Number.isFinite(number) ? Math.max(0, number) : 0;
}

function cashSourceCategoryFromKey(value) {
  const key = cashSourceKey(value);
  if (/(material|материал|оборуд|equipment)/u.test(key)) return 'material';
  if (/(work|работ|service|услуг)/u.test(key)) return 'work';
  return 'position';
}

function normalizeCashSourceCatalogEntry(value, defaults = {}) {
  const record = value && typeof value === 'object' ? value : null;
  const nameValue = record
    ? cashSourceProperty(record, ['name', 'title', 'description', 'item', 'itemName', 'position', 'workName', 'materialName', 'serviceName', 'наименование', 'наименование работ', 'наименование материала', 'работа', 'материал', 'услуга', 'позиция', 'описание'])
    : value;
  const name = cashSourceCellText(nameValue).replace(/\s+/g, ' ').trim().slice(0, 240);
  if (!name || /^(итого|всего|total|subtotal)$/iu.test(name)) return null;
  const unit = cashSourceCellText(record && cashSourceProperty(record, ['unit', 'measure', 'unitName', 'uom', 'ед', 'ед. изм.', 'единица измерения'])).replace(/\s+/g, ' ').trim().slice(0, 40);
  const quantity = cashSourceNumber(record && cashSourceProperty(record, ['quantity', 'qty', 'volume', 'amount', 'количество', 'объем', 'объём', 'кол-во']));
  const price = cashSourceNumber(record && cashSourceProperty(record, ['price', 'unitPrice', 'rate', 'cost', 'цена', 'стоимость единицы', 'расценка']));
  const sourceKind = CASH_SOURCE_DOCUMENT_KINDS.includes(defaults.sourceKind) ? defaults.sourceKind : 'project';
  return {
    name,
    unit,
    quantity,
    price,
    category: ['work', 'material', 'position'].includes(defaults.category) ? defaults.category : 'position',
    sourceKind,
    sourceName: String(defaults.sourceName || tr(sourceKind)).trim().slice(0, 240),
    sourceSheet: String(defaults.sourceSheet || '').trim().slice(0, 120)
  };
}

function mergeCashSourceCatalog(entries) {
  const priority = (entry) => (entry.sourceKind === 'estimate' ? 10 : 0) + Boolean(entry.unit) * 2 + Boolean(entry.price) * 2 + Boolean(entry.quantity);
  const ordered = (Array.isArray(entries) ? entries : []).filter(Boolean).sort((left, right) => priority(right) - priority(left));
  const merged = new Map();
  ordered.forEach((entry) => {
    const normalized = normalizeCashSourceCatalogEntry(entry, entry);
    if (!normalized) return;
    const key = cashSourceKey(normalized.name);
    const current = merged.get(key);
    if (!current) merged.set(key, normalized);
    else merged.set(key, { ...current, unit: current.unit || normalized.unit, quantity: current.quantity || normalized.quantity, price: current.price || normalized.price });
  });
  return [...merged.values()].sort((left, right) => left.name.localeCompare(right.name, root.lang || 'ru')).slice(0, 2000);
}

function normalizeCashSourceCatalog(value, defaults = {}) {
  if (!Array.isArray(value)) return [];
  return mergeCashSourceCatalog(value.map((entry) => normalizeCashSourceCatalogEntry(entry, defaults)));
}

function cashSourceCatalogFromStructuredData(value, defaults = {}) {
  const collected = [];
  const collectionKeys = new Set(['rows', 'items', 'positions', 'works', 'workitems', 'materials', 'materialitems', 'services', 'equipment', 'specification', 'specifications', 'boq', 'estimerows', 'projectrows', 'data', 'result', 'results', 'analysis', 'analysisdata', 'extracted', 'extracteddata', 'таблица', 'строки', 'позиции', 'работы', 'материалы', 'услуги', 'оборудование', 'спецификация', 'ведомостьобъемовработ']);
  const walk = (node, context, depth = 0, collection = false) => {
    if (node == null || depth > 7 || collected.length >= 2000) return;
    if (Array.isArray(node)) {
      node.forEach((item) => {
        const entry = normalizeCashSourceCatalogEntry(item, context);
        if (entry) collected.push(entry);
        if (item && typeof item === 'object') walk(item, context, depth + 1, false);
      });
      return;
    }
    if (typeof node !== 'object') {
      if (collection) {
        const entry = normalizeCashSourceCatalogEntry(node, context);
        if (entry) collected.push(entry);
      }
      return;
    }
    Object.entries(node).forEach(([key, child]) => {
      const normalizedKey = cashSourceKey(key);
      if (!collectionKeys.has(normalizedKey)) return;
      walk(child, { ...context, category: cashSourceCategoryFromKey(key) }, depth + 1, true);
    });
  };
  walk(value, defaults, 0, Array.isArray(value));
  return mergeCashSourceCatalog(collected);
}

function cashSourceCatalogFromFileRecord(file, kind) {
  if (!file || !CASH_SOURCE_DOCUMENT_KINDS.includes(kind)) return [];
  const defaults = { sourceKind: kind, sourceName: file.name || tr(kind) };
  const entries = [...normalizeCashSourceCatalog(file.sourceCatalog, defaults)];
  ['analysisData', 'analysisResult', 'result', 'extractedData', 'extraction', 'estimateBreakdown', 'boq', 'items', 'positions', 'rows', 'works', 'materials', 'services', 'equipment', 'specification'].forEach((key) => {
    if (file[key] != null) entries.push(...cashSourceCatalogFromStructuredData(file[key], { ...defaults, category: cashSourceCategoryFromKey(key) }));
  });
  return mergeCashSourceCatalog(entries);
}

function cashSourceHeaderIndex(headers, patterns) {
  const keys = headers.map(cashSourceKey);
  return keys.findIndex((key) => patterns.some((pattern) => key.includes(pattern)));
}

function cashSourceCatalogFromTabularRows(rows, defaults = {}) {
  const safeRows = Array.isArray(rows) ? rows : [];
  let headerIndex = -1;
  let columns = null;
  let bestScore = -1;
  safeRows.slice(0, 40).forEach((row, index) => {
    const headers = (Array.isArray(row) ? row : []).map(cashSourceCellText);
    const candidate = {
      name: cashSourceHeaderIndex(headers, ['наименован', 'описан', 'workname', 'materialname', 'servicename', 'description', 'position', 'позици', 'работ', 'материал', 'услуг']),
      unit: cashSourceHeaderIndex(headers, ['едизм', 'единицаизмер', 'unit', 'measure', 'uom']),
      quantity: cashSourceHeaderIndex(headers, ['колич', 'колво', 'объем', 'объём', 'quantity', 'qty', 'volume']),
      price: cashSourceHeaderIndex(headers, ['цена', 'стоимостьед', 'расцен', 'unitprice', 'price', 'rate'])
    };
    const score = (candidate.name >= 0 ? 5 : 0) + (candidate.unit >= 0 ? 1 : 0) + (candidate.quantity >= 0 ? 1 : 0) + (candidate.price >= 0 ? 1 : 0);
    if (candidate.name >= 0 && score > bestScore) { headerIndex = index; columns = candidate; bestScore = score; }
  });
  if (headerIndex < 0 || !columns) return [];
  const headerName = cashSourceCellText(safeRows[headerIndex]?.[columns.name]);
  const category = cashSourceCategoryFromKey(headerName);
  const collected = [];
  let blankRows = 0;
  for (let index = headerIndex + 1; index < safeRows.length && collected.length < 2000; index += 1) {
    const row = Array.isArray(safeRows[index]) ? safeRows[index] : [];
    const name = cashSourceCellText(row[columns.name]);
    if (!name) { blankRows += 1; if (blankRows > 30) break; continue; }
    blankRows = 0;
    const entry = normalizeCashSourceCatalogEntry({
      name,
      unit: columns.unit >= 0 ? row[columns.unit] : '',
      quantity: columns.quantity >= 0 ? row[columns.quantity] : 0,
      price: columns.price >= 0 ? row[columns.price] : 0
    }, { ...defaults, category });
    if (entry) collected.push(entry);
  }
  return mergeCashSourceCatalog(collected);
}

function parseCashDelimitedLine(line, delimiter) {
  const cells = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === delimiter && !quoted) { cells.push(value.trim()); value = ''; }
    else value += character;
  }
  cells.push(value.trim());
  return cells;
}

async function extractCashSourceCatalogFromFile(file, kind) {
  if (!file || !CASH_SOURCE_DOCUMENT_KINDS.includes(kind)) return [];
  const extension = String(file.name || '').split('.').pop()?.toLowerCase();
  const defaults = { sourceKind: kind, sourceName: file.name || tr(kind) };
  try {
    if (extension === 'csv') {
      const lines = (await file.text()).replace(/^\uFEFF/, '').split(/\r?\n/);
      const delimiters = [';', ',', '\t'];
      const delimiter = delimiters.map((value) => ({ value, score: lines.slice(0, 12).reduce((sum, line) => sum + Math.max(0, parseCashDelimitedLine(line, value).length - 1), 0) })).sort((left, right) => right.score - left.score)[0].value;
      return cashSourceCatalogFromTabularRows(lines.map((line) => parseCashDelimitedLine(line, delimiter)), defaults);
    }
    if (extension === 'xlsx' || extension === 'xls') {
      const { default: ExcelJS } = await import('exceljs');
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(await file.arrayBuffer());
      const entries = [];
      workbook.worksheets.forEach((worksheet) => {
        const rows = [];
        worksheet.eachRow({ includeEmpty: false }, (row) => {
          if (rows.length < 6000) rows.push(Array.from({ length: row.cellCount }, (_, index) => row.getCell(index + 1).text));
        });
        entries.push(...cashSourceCatalogFromTabularRows(rows, { ...defaults, sourceSheet: worksheet.name }));
      });
      return mergeCashSourceCatalog(entries);
    }
  } catch (error) {
    console.warn('StructOS source catalog extraction failed:', error);
  }
  return [];
}

function normalizeCashWorkRows(value, priced = false) {
  const rows = Array.isArray(value) ? value : [];
  const normalized = rows.map((row) => ({
    id: String(row?.id || `work-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    name: String(row?.name || '').slice(0, 240),
    unit: String(row?.unit || '').slice(0, 40),
    quantity: Math.max(0, Number(row?.quantity) || 0),
    sourceKind: CASH_SOURCE_DOCUMENT_KINDS.includes(row?.sourceKind) ? row.sourceKind : null,
    sourceName: String(row?.sourceName || '').slice(0, 240),
    ...(priced ? { price: Math.max(0, Number(row?.price) || 0) } : { basis: String(row?.basis || '').slice(0, 240) })
  }));
  return normalized.length ? normalized : [{ id: `work-${Date.now()}-${Math.random().toString(16).slice(2)}`, name: '', unit: '', quantity: 0, ...(priced ? { price: 0 } : { basis: '' }) }];
}

function cashPassportParts(value = {}) {
  const legacy = String(value?.passport || '').trim();
  let series = String(value?.passportSeries || '').trim();
  let number = String(value?.passportNumber || '').trim();
  if (!series && !number && legacy) {
    const digits = legacy.replace(/\D+/g, '');
    const spaced = legacy.match(/^(.{1,20}?)[\s-]+(.+)$/u);
    if (digits.length === 10) {
      series = digits.slice(0, 4);
      number = digits.slice(4);
    } else if (spaced) {
      series = spaced[1].trim();
      number = spaced[2].trim();
    } else number = legacy;
  }
  series = series.slice(0, 20);
  number = number.slice(0, 40);
  return { series, number, combined: [series, number].filter(Boolean).join(' ').slice(0, 80) };
}

function normalizeCashDocumentOrganizations(value) {
  return Object.fromEntries(CASH_ORGANIZATION_ROLES.map((role) => {
    const card = value?.[role] || {};
    const passport = cashPassportParts(card);
    return [role, {
      type: card.type === 'individual' ? 'individual' : 'organization',
      company: String(card.company || '').trim().slice(0, 200),
      inn: String(card.inn || '').replace(/\D+/g, '').slice(0, 12),
      kpp: String(card.kpp || '').replace(/\D+/g, '').slice(0, 9),
      fullName: String(card.fullName || '').trim().slice(0, 200),
      passportSeries: passport.series,
      passportNumber: passport.number,
      passport: passport.combined,
      fileName: String(card.fileName || '').slice(0, 240)
    }];
  }));
}

function normalizeCashDocument(value, priced = false, defaultTitle = '') {
  const savedTitle = String(value?.title || '').trim();
  return {
    title: String(!priced && LEGACY_STATEMENT_TITLES.has(savedTitle) ? defaultTitle : savedTitle || defaultTitle).trim().slice(0, 160),
    number: String(value?.number || '').trim().slice(0, 80),
    objectName: String(value?.objectName || '').trim().slice(0, 160),
    sectionName: String(value?.sectionName || '').trim().slice(0, 160),
    rows: normalizeCashWorkRows(value?.rows, priced),
    parties: cashDocumentParties(value?.parties),
    organizations: normalizeCashDocumentOrganizations(value?.organizations),
    updatedAt: value?.updatedAt || null
  };
}

function normalizeCashReportHistory(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => item?.report?.title).slice(0, 50).map((item) => ({
    id: String(item.id || `report-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    type: ['statement', 'act', 'finance'].includes(item.type) ? item.type : 'finance',
    title: String(item.title || item.report.title).slice(0, 160),
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
    report: item.report
  }));
}

function normalizeCashAttachmentVersion(value, kind) {
  if (!value?.name) return null;
  return {
    id: String(value.id || value.storageKey || `cash-file-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    kind,
    name: String(value.name).slice(0, 240),
    size: Math.max(0, Number(value.size) || 0),
    type: String(value.type || ''),
    lastModified: Number(value.lastModified) || Date.now(),
    addedAt: value.addedAt || new Date().toISOString(),
    sourceObjectId: value.sourceObjectId ? String(value.sourceObjectId) : null,
    sourceDocumentKind: CASH_ATTACHMENT_KINDS.includes(value.sourceDocumentKind) ? value.sourceDocumentKind : null,
    sourceDocumentTitle: String(value.sourceDocumentTitle || '').trim().slice(0, 180),
    linkedFromProject: Boolean(value.linkedFromProject || value.sourceObjectId),
    sourceCatalog: normalizeCashSourceCatalog(value.sourceCatalog, { sourceKind: kind, sourceName: value.name }),
    sourceCatalogScanned: Boolean(value.sourceCatalogScanned || Array.isArray(value.sourceCatalog))
  };
}

function normalizeCashAttachment(value, kind) {
  const source = Array.isArray(value?.versions) ? value.versions : value?.name ? [value] : [];
  const versions = source.map((version) => normalizeCashAttachmentVersion(version, kind)).filter(Boolean);
  return versions.length ? { kind, versions } : null;
}

function normalizeCashOrganizationCard(value, role) {
  const type = value?.type === 'individual' ? 'individual' : 'organization';
  const passport = cashPassportParts(value);
  return {
    role,
    type,
    company: String(value?.company || '').trim().slice(0, 200),
    inn: String(value?.inn || '').replace(/\D+/g, '').slice(0, 12),
    kpp: String(value?.kpp || '').replace(/\D+/g, '').slice(0, 9),
    fullName: String(value?.fullName || '').trim().slice(0, 200),
    passportSeries: passport.series,
    passportNumber: passport.number,
    passport: passport.combined,
    attachment: normalizeCashAttachment(value?.attachment, `organization-${role}`),
    updatedAt: value?.updatedAt || null
  };
}

function normalizeCashOrganizationDocuments(value) {
  return Object.fromEntries(CASH_ORGANIZATION_ROLES.map((role) => [role, normalizeCashOrganizationCard(value?.[role], role)]));
}

function normalizeCashStaffingShift(value = {}) {
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(value.date || '')) ? String(value.date) : localDateKey();
  const cleanTime = (time) => /^\d{2}:\d{2}$/.test(String(time || '')) ? String(time) : '';
  const cleanTimestamp = (timestamp) => {
    if (!timestamp || Number.isNaN(new Date(timestamp).getTime())) return null;
    return new Date(timestamp).toISOString();
  };
  return {
    id: String(value.id || `staffing-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    date,
    fullName: String(value.fullName || '').trim().slice(0, 160),
    structosId: String(value.structosId || '').replace(/\D+/g, '').slice(0, 7),
    plannedFrom: cleanTime(value.plannedFrom),
    plannedTo: cleanTime(value.plannedTo),
    openedAt: cleanTimestamp(value.openedAt),
    closedAt: cleanTimestamp(value.closedAt),
    shiftRate: Math.max(0, Math.round((Number(value.shiftRate) || 0) * 100) / 100),
    penalty: Math.max(0, Math.round((Number(value.penalty) || 0) * 100) / 100),
    penaltyComment: String(value.penaltyComment || '').trim().slice(0, 240),
    createdAt: value.createdAt || new Date().toISOString(),
    updatedAt: value.updatedAt || value.createdAt || new Date().toISOString()
  };
}

function normalizeCashStaffingShifts(value) {
  return Array.isArray(value) ? value.slice(0, 500).map((shift) => normalizeCashStaffingShift(shift)) : [];
}

function cashStaffingPlannedHours(shift) {
  const minutes = (time) => {
    if (!/^\d{2}:\d{2}$/.test(String(time || ''))) return null;
    const [hours, mins] = time.split(':').map(Number);
    if (hours > 23 || mins > 59) return null;
    return hours * 60 + mins;
  };
  const from = minutes(shift?.plannedFrom);
  let to = minutes(shift?.plannedTo);
  if (from === null || to === null || from === to) return 0;
  if (to < from) to += 24 * 60;
  return Math.round(((to - from) / 60) * 100) / 100;
}

function cashStaffingCalculation(shift, now = Date.now()) {
  const plannedHours = cashStaffingPlannedHours(shift);
  const openedAt = shift?.openedAt ? new Date(shift.openedAt).getTime() : 0;
  const closedAt = shift?.closedAt ? new Date(shift.closedAt).getTime() : now;
  const actualHours = openedAt && closedAt >= openedAt ? Math.max(0, (closedAt - openedAt) / 3600000) : 0;
  const overtimeHours = plannedHours > 0 ? Math.max(0, actualHours - plannedHours) : 0;
  const hourlyRate = plannedHours > 0 ? shift.shiftRate / plannedHours : 0;
  const overtimePay = Math.round(hourlyRate * overtimeHours * 100) / 100;
  const salary = shift.openedAt ? Math.max(0, Math.round((shift.shiftRate + overtimePay - shift.penalty) * 100) / 100) : 0;
  return {
    plannedHours,
    actualHours: Math.round(actualHours * 100) / 100,
    overtimeHours: Math.round(overtimeHours * 100) / 100,
    overtimePay,
    salary
  };
}

function cashStaffingWeekday(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(date || ''))) return '—';
  try { return new Intl.DateTimeFormat(String(root.lang || 'ru').toLowerCase(), { weekday: 'long' }).format(new Date(`${date}T12:00:00`)); }
  catch { return '—'; }
}

function cashStaffingTimestamp(value) {
  if (!value) return '—';
  try { return new Intl.DateTimeFormat(String(root.lang || 'ru').toLowerCase(), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(value)); }
  catch { return '—'; }
}

function cashStaffingTotalsForShifts(shifts = []) {
  return shifts.reduce((totals, shift) => {
    const calculation = cashStaffingCalculation(shift);
    totals.shiftRates += shift.shiftRate;
    totals.overtimeHours += calculation.overtimeHours;
    totals.overtimePay += calculation.overtimePay;
    totals.penalties += shift.penalty;
    totals.payroll += calculation.salary;
    if (shift.openedAt && !shift.closedAt) totals.active += 1;
    return totals;
  }, { people: shifts.length, active: 0, shiftRates: 0, overtimeHours: 0, overtimePay: 0, penalties: 0, payroll: 0 });
}

function cashStaffingTotals(section) {
  return cashStaffingTotalsForShifts(section?.staffingShifts || []);
}

function cashStaffingDayGroups(section) {
  const groups = new Map();
  (section?.staffingShifts || []).forEach((shift) => {
    if (!groups.has(shift.date)) groups.set(shift.date, []);
    groups.get(shift.date).push(shift);
  });
  return [...groups.entries()]
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .map(([date, shifts]) => ({ date, shifts }));
}

function cashStaffingLatestDate(section) {
  const dates = cashStaffingDayGroups(section).map((group) => group.date);
  return dates[dates.length - 1] || localDateKey();
}

function cashStaffingNextDate(section) {
  const groups = cashStaffingDayGroups(section);
  if (!groups.length) return localDateKey();
  const date = new Date(`${groups[groups.length - 1].date}T12:00:00`);
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function cashAttachmentCurrent(section, kind) {
  const versions = section?.attachments?.[kind]?.versions;
  return Array.isArray(versions) && versions.length ? versions[versions.length - 1] : null;
}

function cashSectionHasSourceDocuments(section) {
  if (CASH_SOURCE_DOCUMENT_KINDS.some((kind) => cashAttachmentCurrent(section, kind))) return true;
  if (CASH_ATTACHMENT_KINDS.some((kind) => cashAttachmentCurrent(section, kind))) return false;
  const sourceObject = section?.sourceProjectId && objectRegistry.find((object) => object.id === section.sourceProjectId);
  return Boolean(sourceObject && CASH_SOURCE_DOCUMENT_KINDS.some((kind) => objectFile(sourceObject, kind)));
}

function cashSectionSourceCatalog(section) {
  if (!section) return [];
  const entries = [...normalizeCashSourceCatalog(section.sourceCatalog)];
  const hasAttachmentVersions = CASH_ATTACHMENT_KINDS.some((kind) => (section.attachments?.[kind]?.versions || []).length);
  CASH_SOURCE_DOCUMENT_KINDS.forEach((kind) => {
    const versions = section.attachments?.[kind]?.versions || [];
    versions.forEach((version) => {
      entries.push(...normalizeCashSourceCatalog(version.sourceCatalog, { sourceKind: kind, sourceName: version.name }));
      const sourceObject = version.sourceObjectId && objectRegistry.find((object) => object.id === version.sourceObjectId);
      if (sourceObject) entries.push(...cashSourceCatalogFromFileRecord(objectFile(sourceObject, kind), kind));
    });
  });
  if (!hasAttachmentVersions && section.sourceProjectId) {
    const sourceObject = objectRegistry.find((object) => object.id === section.sourceProjectId);
    if (sourceObject) {
    CASH_SOURCE_DOCUMENT_KINDS.forEach((kind) => entries.push(...cashSourceCatalogFromFileRecord(objectFile(sourceObject, kind), kind)));
    }
  }
  return mergeCashSourceCatalog(entries);
}

async function hydrateCashSectionSourceCatalog(section) {
  if (!section) return [];
  let changed = false;
  for (const kind of CASH_SOURCE_DOCUMENT_KINDS) {
    const version = cashAttachmentCurrent(section, kind);
    if (!version || version.linkedFromProject || version.sourceCatalogScanned) continue;
    let catalog = [];
    try {
      const blob = await readCashflowFile(version.id);
      if (blob) {
        const file = new File([blob], version.name, { type: version.type || blob.type, lastModified: version.lastModified });
        catalog = await extractCashSourceCatalogFromFile(file, kind);
      }
    } catch (error) {
      console.warn('StructOS source document could not be checked:', error);
    }
    version.sourceCatalog = catalog;
    version.sourceCatalogScanned = true;
    changed = true;
  }
  if (changed) saveCashflow();
  return cashSectionSourceCatalog(section);
}

function cashSectionHasData(section) {
  const entries = ['advances', 'expenses', 'ownInvestments', 'ownReturns', 'factIncome', 'factExpenses', 'factOwnInvestments', 'factOwnReturns', 'staffingShifts'].some((key) => section[key]?.length);
  const documents = Boolean(section.statement?.updatedAt || section.act?.updatedAt || section.reportHistory?.length || CASH_ATTACHMENT_KINDS.some((kind) => cashAttachmentCurrent(section, kind)));
  return entries || documents || section.contractAmount > 0 || section.staffingMode;
}

function normalizeCashSection(section, legacyObject = {}) {
  const contractAmount = Math.max(0, Number(section?.contractAmount ?? legacyObject.cost) || 0);
  const normalized = {
    id: String(section?.id || `section-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    sourceProjectId: section?.sourceProjectId ? String(section.sourceProjectId) : null,
    name: String(section?.name || tr('sectionName')).trim().slice(0, 120) || tr('sectionName'),
    createdAt: section?.createdAt || new Date().toISOString(),
    createdManually: Boolean(section?.createdManually),
    contractMode: Boolean(section?.contractMode ?? (contractAmount > 0 || section?.received?.length || section?.advances?.length || section?.expenses?.length)),
    factMode: Boolean(section?.factMode ?? legacyObject.factMode),
    staffingMode: Boolean(section?.staffingMode),
    staffingShifts: normalizeCashStaffingShifts(section?.staffingShifts),
    contractAmount,
    advances: normalizeCashEntries(section?.advances || section?.received),
    expenses: normalizeCashEntries(section?.expenses),
    ownInvestments: normalizeCashEntries(section?.ownInvestments),
    ownReturns: normalizeCashEntries(section?.ownReturns),
    factIncome: normalizeCashEntries(section?.factIncome),
    factExpenses: normalizeCashEntries(section?.factExpenses),
    factOwnInvestments: normalizeCashEntries(section?.factOwnInvestments),
    factOwnReturns: normalizeCashEntries(section?.factOwnReturns),
    sourceCatalog: normalizeCashSourceCatalog(section?.sourceCatalog),
    attachments: Object.fromEntries(CASH_ATTACHMENT_KINDS.map((kind) => [kind, normalizeCashAttachment(section?.attachments?.[kind], kind)])),
    statement: normalizeCashDocument(section?.statement, false, tr('workStatement')),
    act: normalizeCashDocument(section?.act, true, tr('workAct')),
    reportHistory: normalizeCashReportHistory(section?.reportHistory)
  };
  return normalized;
}

function loadCashflow() {
  const saved = readStoredJSON(CASHFLOW_KEY, []);
  if (!Array.isArray(saved)) return [];
  return saved.filter((object) => object && typeof object.name === 'string').map((object) => {
    let sections = Array.isArray(object.sections) ? object.sections.map((section) => normalizeCashSection(section, object)) : [];
    if (!object.sections && [object.received, object.expenses, object.factIncome, object.factExpenses].some((entries) => Array.isArray(entries) && entries.length)) {
      sections = [normalizeCashSection({ name: tr('mainSection'), received: object.received, expenses: object.expenses, factIncome: object.factIncome, factExpenses: object.factExpenses }, object)];
    }
    const automaticSectionNames = new Set(Object.values(copy).map((dictionary) => dictionary.mainSection).filter(Boolean));
    sections = sections.filter((section) => section.createdManually || !automaticSectionNames.has(section.name) || cashSectionHasData(section));
    return {
      id: String(object.id || `cash-${Date.now()}-${Math.random().toString(16).slice(2)}`),
      sourceProjectId: object.sourceProjectId ? String(object.sourceProjectId) : null,
      name: object.name.trim().slice(0, 100) || tr('objects'),
      createdAt: object.createdAt || new Date().toISOString(),
      completed: Boolean(object.completed),
      completedAt: object.completedAt || null,
      organizationDocumentsCollapsed: Boolean(object.organizationDocumentsCollapsed),
      organizationDocuments: normalizeCashOrganizationDocuments(object.organizationDocuments),
      sections
    };
  });
}

let cashflowObjects = loadCashflow();
let unifiedObjectOrder = readStoredJSON(OBJECT_ORDER_KEY, []);
if (!Array.isArray(unifiedObjectOrder)) unifiedObjectOrder = [];
unifiedObjectOrder = unifiedObjectOrder.filter((key) => typeof key === 'string');
let activeCashObjectId = null;
const expandedCashSections = new Set();
const expandedCashReportHistory = new Set();
const expandedCashEntryHistories = new Set();
let cashflowFileDbPromise;
let reportLogoDataUrl = '';
const reportPreviewLogoUrl = new URL('./assets/favicon-192.png', import.meta.url).hre