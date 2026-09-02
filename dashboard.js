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
Object.assign(copy.RU, { declineInvitation: 'Отклонить приглашение', declineInvitationTitle: 'Отклонить приглашение?', declineInvitationHint: 'Приглашение будет удалено из входящих и объект больше не будет показываться в списке.', invitationDeclined: 'Приглашение отклонено' });
Object.assign(copy.EN, { declineInvitation: 'Decline invitation', declineInvitationTitle: 'Decline this invitation?', declineInvitationHint: 'The invitation will be removed from your inbox and the object will no longer appear in the list.', invitationDeclined: 'Invitation declined' });
Object.assign(copy.KY, { declineInvitation: 'Чакырууну четке кагуу', declineInvitationTitle: 'Чакыруу четке кагылсынбы?', declineInvitationHint: 'Чакыруу киргендерден өчүрүлөт жана объект тизмеде мындан ары көрүнбөйт.', invitationDeclined: 'Чакыруу четке кагылды' });
Object.assign(copy.TJ, { declineInvitation: 'Рад кардани даъват', declineInvitationTitle: 'Даъват рад карда шавад?', declineInvitationHint: 'Даъват аз воридот хориҷ мешавад ва объект дигар дар рӯйхат намоиш дода намешавад.', invitationDeclined: 'Даъват рад карда шуд' });

Object.assign(copy.RU, {
  cabinetWelcomeTagline: 'ЕДИНЫЙ СТРОИТЕЛЬНЫЙ ИНТЕЛЛЕКТ', cabinetWelcomeA11y: 'Вход в личный кабинет',
  cabinetWelcomeUserRole: 'Пользователь', cabinetWelcomeExecutorRole: 'Исполнитель', cabinetWelcomeSupplierRole: 'Поставщик', cabinetWelcomeAggregatorRole: 'Агрегатор',
  cabinetWelcomeUserOne: 'Всё понятно.', cabinetWelcomeUserTwo: 'Всё доступно.', cabinetWelcomeUserThree: 'Любая задача будет Вами решена.',
  cabinetWelcomeExecutorOne: 'Создавайте КП первым.', cabinetWelcomeExecutorTwo: 'Запускайте проект в один клик.', cabinetWelcomeExecutorThree: 'Создавайте свою репутацию.',
  cabinetWelcomeSupplierOne: 'Предлагайте быстрее.', cabinetWelcomeSupplierTwo: 'Будьте там, где есть реальная потребность.',
  cabinetWelcomeAggregatorOne: 'Собирайте команды быстрее.', cabinetWelcomeAggregatorTwo: 'Управляйте людьми точнее.'
});
Object.assign(copy.EN, {
  cabinetWelcomeTagline: 'UNIFIED CONSTRUCTION INTELLIGENCE', cabinetWelcomeA11y: 'Entering your account',
  cabinetWelcomeUserRole: 'User', cabinetWelcomeExecutorRole: 'Contractor', cabinetWelcomeSupplierRole: 'Supplier', cabinetWelcomeAggregatorRole: 'Aggregator',
  cabinetWelcomeUserOne: 'Everything is clear.', cabinetWelcomeUserTwo: 'Everything is accessible.', cabinetWelcomeUserThree: 'You can solve any task.',
  cabinetWelcomeExecutorOne: 'Create proposals first.', cabinetWelcomeExecutorTwo: 'Launch a project in one click.', cabinetWelcomeExecutorThree: 'Build your reputation.',
  cabinetWelcomeSupplierOne: 'Make offers faster.', cabinetWelcomeSupplierTwo: 'Be where there is real demand.',
  cabinetWelcomeAggregatorOne: 'Build teams faster.', cabinetWelcomeAggregatorTwo: 'Manage people with greater precision.'
});
Object.assign(copy.KY, {
  cabinetWelcomeTagline: 'БИРДИКТҮҮ КУРУЛУШ ИНТЕЛЛЕКТИ', cabinetWelcomeA11y: 'Жеке кабинетке кирүү',
  cabinetWelcomeUserRole: 'Колдонуучу', cabinetWelcomeExecutorRole: 'Аткаруучу', cabinetWelcomeSupplierRole: 'Жеткирүүчү', cabinetWelcomeAggregatorRole: 'Агрегатор',
  cabinetWelcomeUserOne: 'Баары түшүнүктүү.', cabinetWelcomeUserTwo: 'Баары жеткиликтүү.', cabinetWelcomeUserThree: 'Ар кандай милдетти Сиз чече аласыз.',
  cabinetWelcomeExecutorOne: 'КПны биринчи түзүңүз.', cabinetWelcomeExecutorTwo: 'Долбоорду бир баскыч менен ишке киргизиңиз.', cabinetWelcomeExecutorThree: 'Өз аброюңузду түзүңүз.',
  cabinetWelcomeSupplierOne: 'Сунуштарды тезирээк бериңиз.', cabinetWelcomeSupplierTwo: 'Чыныгы муктаждык бар жерде болуңуз.',
  cabinetWelcomeAggregatorOne: 'Командаларды тезирээк чогултуңуз.', cabinetWelcomeAggregatorTwo: 'Адамдарды так башкарыңыз.'
});
Object.assign(copy.TJ, {
  cabinetWelcomeTagline: 'ЗЕҲНИ ЯГОНАИ СОХТМОНӢ', cabinetWelcomeA11y: 'Воридшавӣ ба кабинети шахсӣ',
  cabinetWelcomeUserRole: 'Истифодабаранда', cabinetWelcomeExecutorRole: 'Иҷрокунанда', cabinetWelcomeSupplierRole: 'Таъминкунанда', cabinetWelcomeAggregatorRole: 'Агрегатор',
  cabinetWelcomeUserOne: 'Ҳама чиз фаҳмо.', cabinetWelcomeUserTwo: 'Ҳама чиз дастрас.', cabinetWelcomeUserThree: 'Шумо метавонед ҳар вазифаро ҳал кунед.',
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

const CABINET_WELCOME_PROFILES = Object.freeze({
  user: { roleKey: 'cabinetWelcomeUserRole', phraseKeys: ['cabinetWelcomeUserOne', 'cabinetWelcomeUserTwo', 'cabinetWelcomeUserThree'] },
  executor: { roleKey: 'cabinetWelcomeExecutorRole', phraseKeys: ['cabinetWelcomeExecutorOne', 'cabinetWelcomeExecutorTwo', 'cabinetWelcomeExecutorThree'] },
  supplier: { roleKey: 'cabinetWelcomeSupplierRole', phraseKeys: ['cabinetWelcomeSupplierOne', 'cabinetWelcomeSupplierTwo'] },
  aggregator: { roleKey: 'cabinetWelcomeAggregatorRole', phraseKeys: ['cabinetWelcomeAggregatorOne', 'cabinetWelcomeAggregatorTwo'] }
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
let commercialProposalAnalysisTimer;
const commercialProposalDrafts = {
  project: { objectName: '', sectionName: '', file: null, sourceFile: null, busy: false },
  estimate: { objectName: '', sectionName: '', file: null, sourceFile: null, busy: false }
};
const widgetColors = ['#0b63ce', '#00a9df', '#04a77b', '#41a447', '#d5a800', '#e87919', '#d64254', '#7957d5', '#c04ea3', '#44546a'];

function loadFinance() {
  try {
    const saved = JSON.parse(localStorage.getItem(FINANCE_KEY) || 'null');
    if (saved && Number.isFinite(saved.balance) && Number.isFinite(saved.bonuses)) {
      saved.rewards ||= {};
      saved.rewards.passportFirst = Boolean(saved.rewards.passportFirst);
      saved.rewards.passport65 = Boolean(saved.rewards.passport65 || saved.rewards.passportFull);
      saved.rewards.profileFull = Boolean(saved.rewards.profileFull);
      saved.rewards.accountLinks = saved.rewards.accountLinks && typeof saved.rewards.accountLinks === 'object' ? saved.rewards.accountLinks : {};
      return saved;
    }
  } catch {}
  return {
    balance: 0,
    bonuses: 200,
    balanceHistory: [],
    bonusHistory: [{ key: 'passportFirstReward', amount: 200, date: new Date().toISOString() }],
    rewards: { passportFirst: true, passport65: false, profileFull: false, accountLinks: {} }
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
    file: normalizeFileRecord(file)
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
    status: 'active',
    invitedAt: '2026-08-25T06:45:00.000Z',
    completedAt: null,
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
    status: ['completed', 'declined'].includes(object.status) ? object.status : 'active',
    invitedAt: object.invitedAt || new Date().toISOString(),
    completedAt: object.completedAt || null,
    declinedAt: object.declinedAt || null,
    invitedBy: String(object.invitedBy || 'StructOS').slice(0, 120),
    roleKey: String(object.roleKey || 'objectParticipant'),
    files: Array.isArray(object.files) ? object.files.slice(0, 3) : []
  })) : [];
  const demo = demoInvitedObject();
  if (!objects.some((object) => object.id === demo.id)) objects.unshift(demo);
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
  $$('[data-bonus-value]').forEach((item) => { item.textContent = new Intl.NumberFormat(root.lang || 'ru-RU').format(finance.bonuses); });
  $$('[data-finance-summary]').forEach((item) => { item.textContent = `${formatMoney(finance.balance)} · ${finance.bonuses}`; });
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
  const projectPanels = ['proposals', 'project-analysis', 'contract-review', 'estimate-analysis', 'analysis-detail'];
  const next = ['home', 'projects', ...projectPanels, 'space', 'objects', 'cashflow', 'profile', 'passport'].includes(name) ? name : 'home';
  $('[data-dashboard]').classList.toggle('is-space-mode', next === 'space');
  if (next !== 'space') {
    $('[data-space-toolbar]').hidden = true;
    $('[data-space-settings]').setAttribute('aria-expanded', 'false');
  }
  $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== next; panel.classList.toggle('is-active', panel.dataset.panel === next); });
  $$('[data-tab]').forEach((button) => { button.classList.toggle('is-active', button.dataset.tab === next || (projectPanels.includes(next) && button.dataset.tab === 'projects') || (next === 'passport' && button.dataset.tab === 'profile')); });
  history.replaceState(null, '', `#${next}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (next === 'space') requestAnimationFrame(renderWidgets);
  if (next === 'projects') renderMyProjects();
  if (next === 'proposals') renderCommercialProposals();
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
  dialog.classList.remove('cash-document-dialog', 'cash-export-dialog', 'calendar-dialog', 'invited-object-dialog', 'sync-dialog');
  $('[data-dialog-content]').innerHTML = `<div class="dialog-content"><h2>${title}</h2><p>${copyText}</p>${extra}</div>`;
  if (!dialog.open) dialog.showModal();
}

function historyMarkup(items, bonus = false) {
  if (!items.length) return `<div class="history-empty">${tr('noOperations')}</div>`;
  const formatter = new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric' });
  return `<div class="transaction-list">${items.map((item) => `<div class="transaction-row"><span><strong>${tr(item.key)}${item.detail ? ` · ${escapeHtml(item.detail)}` : ''}</strong><small>${formatter.format(new Date(item.date))}</small></span><b>+${bonus ? item.amount : formatMoney(item.amount)}</b></div>`).join('')}</div>`;
}

function bonusRulesMarkup() {
  return `<section class="finance-bonus-rules"><header><h3>${tr('bonusRules')}</h3><p>${tr('newBonusRulesHint')}</p></header><div class="bonus-rules"><div><b>10%</b><span>${tr('topUpHint')}</span></div><div><b>+200</b><span>${tr('passportFirstReward')}</span></div><div><b>+300</b><span>${tr('passport65Reward')}</span></div><div><b>+150 ₽</b><span>${tr('referralReward')}</span></div><div><b>+150</b><span>${tr('accountLinkReward')} · ${tr('rewardOnce')}</span></div></div></section>`;
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
  const bonusValue = new Intl.NumberFormat(root.lang || 'ru-RU').format(finance.bonuses);
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
const reportPreviewLogoUrl = new URL('./assets/favicon-192.png', import.meta.url).href;
let activeCashOrganizationPreview = null;

function saveCashflow() {
  localStorage.setItem(CASHFLOW_KEY, JSON.stringify(cashflowObjects));
  renderObjects();
  renderWidgets();
}

function openCashflowFileDb() {
  if (cashflowFileDbPromise) return cashflowFileDbPromise;
  cashflowFileDbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('IndexedDB unavailable')); return; }
    const request = indexedDB.open(CASHFLOW_FILE_DB, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CASHFLOW_FILE_STORE)) db.createObjectStore(CASHFLOW_FILE_STORE, { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Cashflow file database unavailable'));
  });
  return cashflowFileDbPromise;
}

async function storeCashflowFile(id, file) {
  const db = await openCashflowFileDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CASHFLOW_FILE_STORE, 'readwrite');
    transaction.objectStore(CASHFLOW_FILE_STORE).put({ id, blob: file });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('Cashflow file save failed'));
    transaction.onabort = () => reject(transaction.error || new Error('Cashflow file save aborted'));
  });
}

async function readCashflowFile(id) {
  const db = await openCashflowFileDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CASHFLOW_FILE_STORE, 'readonly');
    const request = transaction.objectStore(CASHFLOW_FILE_STORE).get(id);
    request.onsuccess = () => resolve(request.result?.blob || null);
    request.onerror = () => reject(request.error || new Error('Cashflow file read failed'));
  });
}

async function deleteCashflowFileVersions(versions) {
  const ids = (Array.isArray(versions) ? versions : []).filter((version) => !version?.linkedFromProject).map((version) => version?.id).filter(Boolean);
  if (!ids.length) return;
  const db = await openCashflowFileDb();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(CASHFLOW_FILE_STORE, 'readwrite');
    const store = transaction.objectStore(CASHFLOW_FILE_STORE);
    ids.forEach((id) => store.delete(id));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error || new Error('Cashflow file deletion failed'));
    transaction.onabort = () => reject(transaction.error || new Error('Cashflow file deletion aborted'));
  });
}

async function deleteCashflowFiles(sectionOrSections) {
  const sections = Array.isArray(sectionOrSections) ? sectionOrSections : [sectionOrSections];
  const versions = sections.flatMap((section) => [
    ...CASH_ATTACHMENT_KINDS.flatMap((kind) => section?.attachments?.[kind]?.versions || []),
    ...CASH_ORGANIZATION_ROLES.flatMap((role) => section?.organizationDocuments?.[role]?.attachment?.versions || [])
  ]);
  await deleteCashflowFileVersions(versions);
}

function cashTotal(entries) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  return Math.round(safeEntries.reduce((sum, entry) => sum + (Number(entry?.amount) || 0), 0) * 100) / 100;
}

function cashSectionFinancials(section) {
  const advances = cashTotal(section.advances);
  const expenses = cashTotal(section.expenses);
  const factIncome = cashTotal(section.factIncome);
  const factExpenses = cashTotal(section.factExpenses);
  const contractBalance = section.contractMode ? Math.round((advances - expenses) * 100) / 100 : 0;
  const factBalance = section.factMode ? Math.round((factIncome - factExpenses) * 100) / 100 : 0;
  return { advances, expenses, factIncome, factExpenses, contractBalance, factBalance, balance: Math.round((contractBalance + factBalance) * 100) / 100 };
}

function cashObjectFinancials(object) {
  const sections = Array.isArray(object?.sections) ? object.sections : [];
  const totals = sections.reduce((total, section) => {
    const values = cashSectionFinancials(section);
    total.contractBalance += values.contractBalance;
    total.factBalance += values.factBalance;
    total.balance += values.balance;
    return total;
  }, { contractBalance: 0, factBalance: 0, balance: 0 });
  Object.keys(totals).forEach((key) => { totals[key] = Math.round(totals[key] * 100) / 100; });
  return totals;
}

function cashObjectReportTotals(object) {
  const sections = Array.isArray(object?.sections) ? object.sections : [];
  const totals = sections.reduce((total, section) => {
    if (section.contractMode) {
      total.contractAmount += section.contractAmount;
      total.contractProduction += cashTotal(section.expenses);
      total.contractReceived += cashTotal(section.advances);
      total.contractOwnInvested += cashTotal(section.ownInvestments);
    }
    if (section.factMode) {
      total.factIncome += cashTotal(section.factIncome);
      total.factExpense += cashTotal(section.factExpenses);
      total.factOwnInvested += cashTotal(section.factOwnInvestments);
    }
    return total;
  }, {
    contractAmount: 0,
    contractProduction: 0,
    contractReceived: 0,
    contractOwnInvested: 0,
    factIncome: 0,
    factExpense: 0,
    factOwnInvested: 0
  });
  Object.keys(totals).forEach((key) => { totals[key] = Math.round(totals[key] * 100) / 100; });
  totals.contractRemaining = Math.round((totals.contractAmount - totals.contractProduction) * 100) / 100;
  totals.paidProductionRemaining = Math.round((totals.contractProduction - totals.contractReceived) * 100) / 100;
  totals.factRemaining = Math.round((totals.factIncome - totals.factExpense) * 100) / 100;
  return totals;
}

function formatSignedMoney(value) {
  const rounded = Math.round((Number(value) || 0) * 100) / 100;
  return `${rounded > 0 ? '+' : ''}${formatMoney(rounded)}`;
}

function cashBalanceClass(value) {
  return value < 0 ? 'is-negative' : value > 0 ? 'is-positive' : 'is-zero';
}

function cashReportSummary(label, value, colored = false, toneValue = value) {
  return { text: `${label}: ${formatMoney(value)}`, tone: colored ? cashBalanceClass(toneValue) : '' };
}

function cashReportSummaryText(summary) {
  return typeof summary === 'string' ? summary : String(summary?.text || '');
}

function cashDate(value) {
  try { return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)); }
  catch { return ''; }
}

function cashDateInputValue(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return localDateKey();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function cashEntryDateWithNewDay(currentValue, dayValue) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dayValue || '')) return null;
  const [year, month, day] = dayValue.split('-').map(Number);
  const current = new Date(currentValue);
  const hours = Number.isNaN(current.getTime()) ? 12 : current.getHours();
  const minutes = Number.isNaN(current.getTime()) ? 0 : current.getMinutes();
  const seconds = Number.isNaN(current.getTime()) ? 0 : current.getSeconds();
  const milliseconds = Number.isNaN(current.getTime()) ? 0 : current.getMilliseconds();
  const next = new Date(year, month - 1, day, hours, minutes, seconds, milliseconds);
  if (next.getFullYear() !== year || next.getMonth() !== month - 1 || next.getDate() !== day) return null;
  return next.toISOString();
}

function cashEntryCollection(section, kind) {
  return { advances: section.advances, expenses: section.expenses, ownInvestments: section.ownInvestments, ownReturns: section.ownReturns, factIncome: section.factIncome, factExpenses: section.factExpenses, factOwnInvestments: section.factOwnInvestments, factOwnReturns: section.factOwnReturns }[kind];
}

function cashHistoryMarkup(entries, labelKey, kind, sectionId) {
  const safeEntries = Array.isArray(entries) ? entries : [];
  const total = cashTotal(safeEntries);
  const historyKey = `${sectionId}:${kind}`;
  const rows = safeEntries.length
    ? safeEntries.map((entry) => `<div class="cash-history-row" data-cash-history-entry="${escapeHtml(entry.id)}"><span>${escapeHtml(entry.comment)}<small>${cashDate(entry.date)}</small></span><b>${formatMoney(entry.amount)}</b><button type="button" data-edit-cash-entry="${escapeHtml(entry.id)}" data-cash-entry-kind="${escapeHtml(kind)}" aria-label="${escapeHtml(tr('editCashEntry'))}" title="${escapeHtml(tr('editCashEntry'))}">✎ <em>${tr('edit')}</em></button></div>`).join('')
    : `<div class="cash-history-empty">${tr('noEntries')}</div>`;
  return `<details class="cash-history" data-cash-history="${escapeHtml(historyKey)}"${expandedCashEntryHistories.has(historyKey) ? ' open' : ''}><summary><span>${tr(labelKey)}</span><b>${formatMoney(total)}</b></summary><div class="cash-history-list">${rows}</div></details>`;
}

function cashEntryForm(kind, titleKey, buttonKey) {
  return `<section class="cash-entry-form" data-cash-entry="${kind}"><h3>${tr(titleKey)}</h3><input type="number" min="0.01" step="0.01" inputmode="decimal" data-cash-amount placeholder="0 ₽" /><input maxlength="240" data-cash-comment placeholder="${tr('comment')}" /><button class="primary-button" type="button" data-cash-submit>${tr(buttonKey)} · ${tr(titleKey)}</button></section>`;
}

function findCashSection(objectId, sectionId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  return { object, section: object?.sections.find((item) => item.id === sectionId) };
}

function renameCashObject(objectId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  if (!object) return;
  openRenameDialog(tr('renameObject'), object.name, 100, (name) => {
    object.name = name;
    saveCashflow();
    renderCashflow();
  });
}

function renameCashSection(objectId, sectionId) {
  const { section } = findCashSection(objectId, sectionId);
  if (!section) return;
  openRenameDialog(tr('renameSection'), section.name, 120, (name) => {
    section.name = name;
    saveCashflow();
    renderCashflow();
  });
}

function openCashContractAmountDialog(objectId, sectionId) {
  const { object, section } = findCashSection(objectId, sectionId);
  if (!object || !section?.contractMode) return;
  showDialog(tr('editContractAmount'), `${object.name} · ${section.name}`, `<div class="cash-create-form cash-contract-amount-edit"><label><span>${tr('contractAmount')}</span><input type="number" min="0.01" step="0.01" inputmode="decimal" data-edit-contract-amount value="${section.contractAmount}" /></label><button class="primary-button" type="button" data-save-contract-amount>${tr('saveChanges')}</button></div>`);
  const scope = $('[data-dialog-content]');
  const input = $('[data-edit-contract-amount]', scope);
  const saveAmount = () => {
    const amount = Math.max(0, Math.round((Number(input?.value) || 0) * 100) / 100);
    if (amount <= 0) { showToast(tr('enterContractAmount')); input?.focus(); return; }
    section.contractAmount = amount;
    saveCashflow();
    renderCashflow();
    $('[data-dialog]')?.close();
    showToast(tr('contractAmountSaved'));
  };
  $('[data-save-contract-amount]', scope)?.addEventListener('click', saveAmount);
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); saveAmount(); } });
  setTimeout(() => { input?.focus(); input?.select(); }, 40);
}

async function addCashSectionAttachment(objectId, sectionId, kind, file) {
  const { section } = findCashSection(objectId, sectionId);
  const rule = uploadRules[kind];
  if (!section || !rule || !file) return;
  if (file.size > rule.maxMb * 1024 * 1024) { showToast(`${tr('fileTooLarge')}: ${rule.maxMb} МБ`); return; }
  if (!isAllowedFile(file, rule)) { showToast(`${tr('unsupportedFormat')}: ${rule.formats}`); return; }
  const current = cashAttachmentCurrent(section, kind);
  if (current && sameFileMetadata(current, file)) { showToast(tr('sameFileSelected')); return; }
  const id = `cash-file-${createObjectId()}`;
  try {
    await storeCashflowFile(id, file);
    const sourceCatalog = CASH_SOURCE_DOCUMENT_KINDS.includes(kind) ? await extractCashSourceCatalogFromFile(file, kind) : [];
    const version = normalizeCashAttachmentVersion({ ...fileMetadata(file), id, sourceCatalog, sourceCatalogScanned: CASH_SOURCE_DOCUMENT_KINDS.includes(kind) }, kind);
    const versions = [...(section.attachments?.[kind]?.versions || []), version];
    section.attachments ||= Object.fromEntries(CASH_ATTACHMENT_KINDS.map((attachmentKind) => [attachmentKind, null]));
    section.attachments[kind] = { kind, versions };
    saveCashflow();
    renderCashflow();
    showToast(tr('sectionAttachmentSaved'));
  } catch (error) {
    console.error(error);
    showToast(tr('sectionAttachmentSaveFailed'));
  }
}

function deleteCashSectionAttachment(objectId, sectionId, kind) {
  const { section } = findCashSection(objectId, sectionId);
  const versions = section?.attachments?.[kind]?.versions || [];
  const current = versions[versions.length - 1];
  if (!section || !uploadRules[kind] || !current) return;
  const icon = { project: '▤', contract: '≡', estimate: '₽' }[kind];
  showDialog(tr('deleteSectionAttachmentTitle'), tr('deleteSectionAttachmentHint'), `<section class="revision-upload-source"><span>${icon}</span><div><small>${escapeHtml(tr(kind))}</small><strong>${escapeHtml(current.sourceDocumentTitle || current.name)}</strong><em>${versions.length} ${escapeHtml(tr('versions'))} · ${escapeHtml(formatStorage(versions.reduce((total, version) => total + (Number(version.size) || 0), 0)))}</em></div></section><div class="result-actions"><button class="outline-button" type="button" data-cancel-section-attachment-delete>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-section-attachment-delete>${escapeHtml(tr('deleteSectionAttachment'))}</button></div>`);
  const scope = $('[data-dialog-content]');
  $('[data-cancel-section-attachment-delete]', scope)?.addEventListener('click', () => $('[data-dialog]')?.close());
  $('[data-confirm-section-attachment-delete]', scope)?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      await deleteCashflowFileVersions(versions);
      section.attachments[kind] = null;
      const hasLinkedDocuments = CASH_ATTACHMENT_KINDS.some((attachmentKind) => (section.attachments?.[attachmentKind]?.versions || []).some((version) => version.linkedFromProject));
      if (!hasLinkedDocuments) section.sourceProjectId = null;
      saveCashflow();
      renderCashflow();
      $('[data-dialog]')?.close();
      showToast(tr('sectionAttachmentDeleted'));
    } catch (error) {
      console.error(error);
      button.disabled = false;
      showToast(tr('sectionAttachmentDeleteFailed'));
    }
  });
}

async function openCashSectionAttachment(objectId, sectionId, kind, versionId) {
  const { section } = findCashSection(objectId, sectionId);
  const versions = section?.attachments?.[kind]?.versions || [];
  const version = versions.find((item) => item.id === versionId) || versions[versions.length - 1];
  if (!version) return;
  if (version.linkedFromProject && version.sourceObjectId) {
    openAnalyzedDocument(version.sourceObjectId, version.sourceDocumentKind || kind);
    return;
  }
  const previewWindow = window.open('', '_blank');
  if (previewWindow) {
    previewWindow.opener = null;
    previewWindow.document.title = version.name;
    previewWindow.document.body.textContent = `${tr('openDocument')}: ${version.name}`;
  }
  try {
    const blob = await readCashflowFile(version.id);
    if (!blob) throw new Error('Cashflow attachment is missing');
    const url = URL.createObjectURL(blob);
    const extension = version.name.split('.').pop()?.toLowerCase();
    const canPreview = String(version.type || blob.type).startsWith('image/') || String(version.type || blob.type) === 'application/pdf' || extension === 'pdf';
    if (previewWindow && !previewWindow.closed) {
      previewWindow.location.replace(url);
    } else {
      const link = document.createElement('a');
      link.href = url;
      if (canPreview) { link.target = '_blank'; link.rel = 'noopener'; }
      else link.download = version.name;
      document.body.append(link); link.click(); link.remove();
    }
    setTimeout(() => URL.revokeObjectURL(url), 300000);
  } catch (error) {
    console.error(error);
    previewWindow?.close();
    showToast(tr('sectionAttachmentOpenFailed'));
  }
}

async function addCashOrganizationFile(objectId, role, file) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  const card = object?.organizationDocuments?.[role];
  if (!object || !card || !file) return;
  const current = card.attachment?.versions?.at(-1);
  if (current && sameFileMetadata(current, file)) { showToast(tr('sameFileSelected')); return; }
  const id = `cash-organization-${createObjectId()}`;
  try {
    await storeCashflowFile(id, file);
    const version = normalizeCashAttachmentVersion({ ...fileMetadata(file), id }, `organization-${role}`);
    card.attachment = { kind: `organization-${role}`, versions: [...(card.attachment?.versions || []), version] };
    card.updatedAt = new Date().toISOString();
    saveCashflow();
    renderCashflow();
    showToast(tr('organizationFileSaved'));
  } catch (error) {
    console.error(error);
    showToast(tr('sectionAttachmentSaveFailed'));
  }
}

function releaseCashOrganizationPreview() {
  if (activeCashOrganizationPreview?.url) URL.revokeObjectURL(activeCashOrganizationPreview.url);
  activeCashOrganizationPreview = null;
  $('[data-report-preview-content]')?.classList.remove('is-organization-file-preview');
}

function downloadCashOrganizationPreview() {
  const preview = activeCashOrganizationPreview;
  if (!preview) return;
  downloadReportBlob(preview.blob, preview.version.name);
}

async function shareCashOrganizationPreview() {
  const preview = activeCashOrganizationPreview;
  if (!preview) return;
  const file = new File([preview.blob], preview.version.name, { type: preview.version.type || preview.blob.type || 'application/octet-stream', lastModified: preview.version.lastModified || Date.now() });
  let canShare = Boolean(navigator.share);
  try { if (canShare && navigator.canShare) canShare = navigator.canShare({ files: [file] }); }
  catch { canShare = false; }
  if (canShare) {
    try {
      await navigator.share({ title: preview.version.name, text: `${tr(preview.role)} · StructOS`, files: [file] });
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }
  }
  downloadReportBlob(preview.blob, preview.version.name);
  showToast(tr('shareFileFallback'));
}

async function openCashOrganizationFile(objectId, role, versionId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  const card = object?.organizationDocuments?.[role];
  const versions = card?.attachment?.versions || [];
  const version = versions.find((item) => item.id === versionId) || versions.at(-1);
  const dialog = $('[data-report-preview-dialog]');
  if (!version || !dialog) return;
  try {
    const blob = await readCashflowFile(version.id);
    if (!blob) throw new Error('Organization document is missing');
    releaseCashOrganizationPreview();
    const url = URL.createObjectURL(blob);
    const mime = String(version.type || blob.type || '').toLowerCase();
    const extension = version.name.split('.').pop()?.toLowerCase();
    const image = mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp', 'gif', 'heic'].includes(extension);
    const pdf = mime === 'application/pdf' || extension === 'pdf';
    activeCashOrganizationPreview = { objectId, role, cardType: card.type, version, blob, url };
    $('[data-report-preview-title]', dialog).textContent = tr('organizationPreviewTitle');
    $('[data-report-preview-hint]', dialog).textContent = `${tr(role)} · ${tr(card.type === 'individual' ? 'passportFile' : 'organizationCardFile')} · ${version.name}`;
    const content = $('[data-report-preview-content]', dialog);
    content.classList.add('is-organization-file-preview');
    content.innerHTML = `<section class="cash-organization-preview">${image
      ? `<img src="${escapeHtml(url)}" alt="${escapeHtml(version.name)}" />`
      : pdf
        ? `<iframe src="${escapeHtml(url)}" title="${escapeHtml(version.name)}"></iframe>`
        : `<div class="cash-organization-preview-fallback"><span aria-hidden="true">▤</span><strong>${escapeHtml(version.name)}</strong><p>${escapeHtml(tr('previewUnavailable'))}</p></div>`}</section>`;
    const actions = $('[data-report-preview-actions]', dialog);
    actions.innerHTML = `<div class="cash-report-actions cash-organization-preview-actions"><button class="outline-button" type="button" data-download-organization-preview>↓ ${tr('downloadDocument')}</button><button class="primary-button" type="button" data-share-organization-preview>${tr('sendDocument')} ↗</button></div>`;
    $('[data-download-organization-preview]', actions)?.addEventListener('click', downloadCashOrganizationPreview);
    $('[data-share-organization-preview]', actions)?.addEventListener('click', shareCashOrganizationPreview);
    if (!dialog.open) dialog.showModal();
  } catch (error) {
    console.error(error);
    releaseCashOrganizationPreview();
    showToast(tr('organizationFileOpenFailed'));
  }
}

async function removeCashOrganizationAttachment(object, role) {
  const card = object?.organizationDocuments?.[role];
  const versions = card?.attachment?.versions || [];
  if (!card || !versions.length) return false;
  await deleteCashflowFileVersions(versions);
  card.attachment = null;
  card.updatedAt = new Date().toISOString();
  return true;
}

function deleteCashOrganizationFile(objectId, role) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  const card = object?.organizationDocuments?.[role];
  const versions = card?.attachment?.versions || [];
  const current = versions.at(-1);
  if (!object || !card || !current) return;
  showDialog(tr('deleteOrganizationFileTitle'), tr('deleteOrganizationFileHint'), `<section class="revision-upload-source"><span>${card.type === 'individual' ? '▣' : '▤'}</span><div><small>${escapeHtml(tr(card.type === 'individual' ? 'passportFile' : 'organizationCardFile'))}</small><strong>${escapeHtml(current.name)}</strong><em>${escapeHtml(formatStorage(current.size))}</em></div></section><div class="result-actions"><button class="outline-button" type="button" data-cancel-organization-file-delete>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-organization-file-delete>${escapeHtml(tr('deleteDocument'))}</button></div>`);
  const scope = $('[data-dialog-content]');
  $('[data-cancel-organization-file-delete]', scope)?.addEventListener('click', () => $('[data-dialog]')?.close());
  $('[data-confirm-organization-file-delete]', scope)?.addEventListener('click', async (event) => {
    event.currentTarget.disabled = true;
    try {
      await removeCashOrganizationAttachment(object, role);
      saveCashflow();
      renderCashflow();
      $('[data-dialog]')?.close();
      showToast(tr('organizationFileDeleted'));
    } catch (error) {
      console.error(error);
      event.currentTarget.disabled = false;
      showToast(tr('organizationFileDeleteFailed'));
    }
  });
}

function cashOrganizationCardMarkup(card, role) {
  const versions = card?.attachment?.versions || [];
  const current = versions.at(-1);
  const individual = card.type === 'individual';
  const documentLabelKey = individual ? 'passportFile' : 'organizationCardFile';
  const emptyLabelKey = individual ? 'noPassportFile' : 'noOrganizationFile';
  const uploadLabelKey = current ? (individual ? 'replacePassport' : 'replaceOrganizationCard') : (individual ? 'uploadPassport' : 'uploadOrganizationCard');
  const eyeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg>';
  const history = versions.length > 1 ? `<details class="cash-organization-file-history"><summary>${tr('versionHistory')} · ${versions.length}</summary>${[...versions].reverse().map((version, reverseIndex) => `<button type="button" data-open-organization-file="${escapeHtml(version.id)}"><b>v${versions.length - reverseIndex}</b><span><strong>${escapeHtml(version.name)}</strong><small>${escapeHtml(formatObjectDateTime(version.addedAt))} · ${escapeHtml(formatStorage(version.size))}</small></span></button>`).join('')}</details>` : '';
  return `<article class="cash-organization-card" data-organization-role="${role}">
    <header><span>${role === 'contractor' ? 'И' : 'З'}</span><div><h3>${tr(role)}</h3><small>${tr('organizationDocuments')}</small></div></header>
    <div class="cash-organization-type"><label><span>${tr('partyType')}</span><select data-organization-type><option value="organization"${card.type === 'organization' ? ' selected' : ''}>${tr('legalEntity')}</option><option value="individual"${card.type === 'individual' ? ' selected' : ''}>${tr('individual')}</option></select></label></div>
    <div class="cash-organization-file${current ? ' has-file' : ' is-empty'}">
      <div class="cash-organization-file-main"><span class="cash-organization-file-mark" aria-hidden="true">${individual ? '▣' : '▤'}</span><div class="cash-organization-file-copy"><small>${tr(documentLabelKey)}</small><strong title="${escapeHtml(current?.name || tr(emptyLabelKey))}">${escapeHtml(current?.name || tr(emptyLabelKey))}</strong>${current ? `<em>v${versions.length} · ${escapeHtml(formatObjectDateTime(current.addedAt))} · ${escapeHtml(formatStorage(current.size))}</em>` : ''}</div>${current ? `<div class="cash-organization-file-icons"><button class="cash-organization-file-icon is-view" type="button" data-open-organization-file="${escapeHtml(current.id)}" aria-label="${escapeHtml(tr('previewUploadedDocument'))}" title="${escapeHtml(tr('previewUploadedDocument'))}">${eyeIcon}</button><button class="cash-organization-file-icon is-delete" type="button" data-delete-organization-file aria-label="${escapeHtml(tr('removeUploadedDocument'))}" title="${escapeHtml(tr('removeUploadedDocument'))}">×</button></div>` : ''}</div>
      <button class="outline-button cash-organization-upload" type="button" data-select-organization-file>${tr(uploadLabelKey)}</button>
      <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,image/*" data-organization-file hidden />${history}
    </div>
    <div class="cash-organization-manual"><h4>${tr('manualDetails')}</h4><div class="cash-organization-fields is-legal" data-organization-legal${card.type === 'organization' ? '' : ' hidden'}><label><span>${tr('inn')}</span><input data-organization-field="inn" inputmode="numeric" maxlength="12" value="${escapeHtml(card.inn)}" /></label><label><span>${tr('kpp')}</span><input data-organization-field="kpp" inputmode="numeric" maxlength="9" value="${escapeHtml(card.kpp)}" /></label><label class="is-wide"><span>${tr('companyName')}</span><input data-organization-field="company" maxlength="200" value="${escapeHtml(card.company)}" /></label></div><div class="cash-organization-fields is-individual" data-organization-individual${card.type === 'individual' ? '' : ' hidden'}><label class="is-wide"><span>${tr('fullName')}</span><input data-organization-field="fullName" maxlength="200" value="${escapeHtml(card.fullName)}" /></label><label><span>${tr('passportSeries')}</span><input data-organization-field="passportSeries" inputmode="numeric" maxlength="20" value="${escapeHtml(card.passportSeries)}" /></label><label><span>${tr('passportNumber')}</span><input data-organization-field="passportNumber" inputmode="numeric" maxlength="40" value="${escapeHtml(card.passportNumber)}" /></label></div><button class="primary-button" type="button" data-save-organization-card>${tr('saveOrganizationDetails')}</button></div>
  </article>`;
}

function cashOrganizationDocumentsMarkup(object) {
  const documents = normalizeCashOrganizationDocuments(object?.organizationDocuments);
  const collapsed = Boolean(object?.organizationDocumentsCollapsed);
  return `<details class="cash-organization-documents" data-organization-documents${collapsed ? '' : ' open'}><summary><div><span class="eyebrow">STRUCTOS DOCUMENTS</span><h2>${tr('organizationDocuments')}</h2><p>${tr('organizationDocumentsHint')}</p></div><span class="cash-organization-toggle-label" data-organization-toggle-label>${tr(collapsed ? 'expandOrganizationDocuments' : 'collapseOrganizationDocuments')}</span><b aria-hidden="true">⌄</b></summary><div class="cash-organization-grid">${CASH_ORGANIZATION_ROLES.map((role) => cashOrganizationCardMarkup(documents[role], role)).join('')}</div></details>`;
}

function bindCashOrganizationDocuments(object, scope) {
  const documentsSection = $('[data-organization-documents]', scope);
  documentsSection?.addEventListener('toggle', () => {
    object.organizationDocumentsCollapsed = !documentsSection.open;
    const label = $('[data-organization-toggle-label]', documentsSection);
    if (label) label.textContent = tr(documentsSection.open ? 'collapseOrganizationDocuments' : 'expandOrganizationDocuments');
    saveCashflow();
  });
  $$('[data-organization-role]', scope).forEach((cardElement) => {
    const role = cardElement.dataset.organizationRole;
    const card = object.organizationDocuments[role];
    const typeSelect = $('[data-organization-type]', cardElement);
    typeSelect?.addEventListener('change', () => {
      $$('[data-organization-field]', cardElement).forEach((input) => { card[input.dataset.organizationField] = input.value; });
      card.passport = [card.passportSeries, card.passportNumber].map((value) => String(value || '').trim()).filter(Boolean).join(' ');
      const nextType = typeSelect.value === 'individual' ? 'individual' : 'organization';
      if (nextType === card.type) return;
      const applyType = async (removeAttachment = false) => {
        if (removeAttachment) await removeCashOrganizationAttachment(object, role);
        card.type = nextType;
        card.updatedAt = new Date().toISOString();
        object.organizationDocuments[role] = normalizeCashOrganizationCard(card, role);
        saveCashflow();
        renderCashflow();
      };
      const versions = card.attachment?.versions || [];
      if (!versions.length) { applyType().catch((error) => console.error(error)); return; }
      showDialog(tr('changePartyTypeTitle'), tr('changePartyTypeHint'), `<div class="result-actions"><button class="outline-button" type="button" data-cancel-party-type>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-party-type>${escapeHtml(tr('changePartyType'))}</button></div>`);
      const dialogScope = $('[data-dialog-content]');
      $('[data-cancel-party-type]', dialogScope)?.addEventListener('click', () => { typeSelect.value = card.type; $('[data-dialog]')?.close(); });
      $('[data-confirm-party-type]', dialogScope)?.addEventListener('click', async (event) => {
        event.currentTarget.disabled = true;
        try { await applyType(true); $('[data-dialog]')?.close(); }
        catch (error) { console.error(error); typeSelect.value = card.type; event.currentTarget.disabled = false; showToast(tr('organizationFileDeleteFailed')); }
      });
    });
    $('[data-save-organization-card]', cardElement)?.addEventListener('click', () => {
      const values = { ...card, type: typeSelect?.value === 'individual' ? 'individual' : 'organization', updatedAt: new Date().toISOString() };
      $$('[data-organization-field]', cardElement).forEach((input) => { values[input.dataset.organizationField] = input.value; });
      values.passport = [values.passportSeries, values.passportNumber].map((value) => String(value || '').trim()).filter(Boolean).join(' ');
      object.organizationDocuments[role] = normalizeCashOrganizationCard(values, role);
      saveCashflow(); renderCashflow(); showToast(tr('organizationCardSaved'));
    });
    $('[data-select-organization-file]', cardElement)?.addEventListener('click', () => $('[data-organization-file]', cardElement)?.click());
    $('[data-delete-organization-file]', cardElement)?.addEventListener('click', () => deleteCashOrganizationFile(object.id, role));
    $('[data-organization-file]', cardElement)?.addEventListener('change', async (event) => {
      const file = event.currentTarget.files?.[0]; if (!file) return;
      event.currentTarget.disabled = true; await addCashOrganizationFile(object.id, role, file); event.currentTarget.value = ''; event.currentTarget.disabled = false;
    });
    $$('[data-open-organization-file]', cardElement).forEach((button) => button.addEventListener('click', () => openCashOrganizationFile(object.id, role, button.dataset.openOrganizationFile)));
  });
}

function cashSectionAttachmentMarkup(section, kind) {
  const attachment = section.attachments?.[kind];
  const versions = attachment?.versions || [];
  const current = versions[versions.length - 1];
  const icon = { project: '▤', contract: '≡', estimate: '₽' }[kind];
  const eyeIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/></svg>';
  const history = versions.length > 1 ? `<details class="cash-source-file-history"><summary>${tr('versionHistory')} · ${versions.length}</summary><div>${[...versions].reverse().map((version, reverseIndex) => `<button type="button" data-open-cash-attachment-version="${escapeHtml(version.id)}" data-cash-attachment-kind="${escapeHtml(kind)}"><b>v${versions.length - reverseIndex}</b><span><strong>${escapeHtml(version.sourceDocumentTitle || version.name)}</strong><small>${version.linkedFromProject ? `${escapeHtml(tr('linkedFromProject'))} · ` : ''}${escapeHtml(formatObjectDateTime(version.addedAt))} · ${escapeHtml(formatStorage(version.size))}</small></span><i>${tr('openDocument')}</i></button>`).join('')}</div></details>` : '';
  return `<article class="cash-source-file${current ? ' has-file' : ''}">
    <header><span aria-hidden="true">${icon}</span><div><strong>${tr(kind)}</strong><small>${escapeHtml(current?.sourceDocumentTitle || current?.name || tr('notUploaded'))}</small>${current ? `<em>${current.linkedFromProject ? `${escapeHtml(tr('linkedFromProject'))} · ` : ''}${escapeHtml(current.name)} · v${versions.length} · ${escapeHtml(formatStorage(current.size))}</em>` : ''}</div>${current ? `<div class="cash-source-file-icons"><button class="cash-source-file-icon is-view" type="button" data-open-cash-attachment-version="${escapeHtml(current.id)}" data-cash-attachment-kind="${escapeHtml(kind)}" aria-label="${escapeHtml(tr('previewUploadedDocument'))}" title="${escapeHtml(tr('previewUploadedDocument'))}">${eyeIcon}</button><button class="cash-source-file-icon is-delete" type="button" data-delete-cash-attachment="${escapeHtml(kind)}" aria-label="${escapeHtml(tr('removeUploadedDocument'))}" title="${escapeHtml(tr('removeUploadedDocument'))}">×</button></div>` : ''}</header>
    <div class="cash-source-file-actions"><button class="primary-button" type="button" data-select-cash-attachment="${escapeHtml(kind)}">${tr(current ? 'replaceDocument' : 'upload')}</button></div>
    <input type="file" accept="${uploadRules[kind].accept}" data-cash-attachment-input="${escapeHtml(kind)}" hidden />${history}
  </article>`;
}

function cashSectionAttachmentsMarkup(section) {
  return `<section class="cash-source-documents"><header><div><h4>${tr('sectionSourceDocuments')}</h4><p>${tr('sectionSourceDocumentsHint')}</p></div><span aria-hidden="true">◉</span></header><div class="cash-source-files">${CASH_ATTACHMENT_KINDS.map((kind) => cashSectionAttachmentMarkup(section, kind)).join('')}</div></section>`;
}

function addCashEntry(objectId, sectionId, kind, form) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  const section = object?.sections.find((item) => item.id === sectionId);
  const amountInput = $('[data-cash-amount]', form);
  const commentInput = $('[data-cash-comment]', form);
  const amount = Math.round(Number(amountInput?.value) * 100) / 100;
  const comment = commentInput?.value.trim() || '';
  if (!object || !section || !Number.isFinite(amount) || amount <= 0 || !comment) {
    showToast(tr('amountRequired'));
    (!Number.isFinite(amount) || amount <= 0 ? amountInput : commentInput)?.focus();
    return;
  }
  const target = cashEntryCollection(section, kind);
  if (!target) return;
  target.unshift({ id: `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`, amount, comment: comment.slice(0, 240), date: new Date().toISOString() });
  saveCashflow();
  renderCashflow();
}

function openCashEntryEditDialog(objectId, sectionId, kind, entryId) {
  const { object, section } = findCashSection(objectId, sectionId);
  const target = section && cashEntryCollection(section, kind);
  const entry = target?.find((item) => item.id === entryId);
  if (!object || !section || !entry) return;
  expandedCashEntryHistories.add(`${section.id}:${kind}`);
  showDialog(tr('editCashEntry'), `${object.name} · ${section.name}`, `<div class="cash-edit-form"><label><span>${tr('amount')}</span><input type="number" min="0.01" step="0.01" inputmode="decimal" data-edit-cash-amount value="${entry.amount}" /></label><label><span>${tr('date')}</span><input type="date" data-edit-cash-date value="${cashDateInputValue(entry.date)}" /></label><label><span>${tr('comment')}</span><input maxlength="240" data-edit-cash-comment value="${escapeHtml(entry.comment)}" /></label><button class="primary-button" type="button" data-save-cash-entry>${tr('saveChanges')}</button></div>`);
  const scope = $('[data-dialog-content]');
  const amountInput = $('[data-edit-cash-amount]', scope);
  const dateInput = $('[data-edit-cash-date]', scope);
  const commentInput = $('[data-edit-cash-comment]', scope);
  const saveEntry = () => {
    const amount = Math.round(Number(amountInput?.value) * 100) / 100;
    const comment = commentInput?.value.trim() || '';
    const date = cashEntryDateWithNewDay(entry.date, dateInput?.value || '');
    if (!Number.isFinite(amount) || amount <= 0 || !comment || !date) {
      showToast(tr('entryFieldsRequired'));
      (!Number.isFinite(amount) || amount <= 0 ? amountInput : !date ? dateInput : commentInput)?.focus();
      return;
    }
    entry.amount = amount;
    entry.comment = comment.slice(0, 240);
    entry.date = date;
    target.sort((a, b) => new Date(b.date) - new Date(a.date));
    saveCashflow();
    renderCashflow();
    $('[data-dialog]')?.close();
    showToast(tr('entryUpdated'));
  };
  $('[data-save-cash-entry]', scope)?.addEventListener('click', saveEntry);
  $$('input', scope).forEach((input) => input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); saveEntry(); }
  }));
  setTimeout(() => { amountInput?.focus(); amountInput?.select(); }, 40);
}

function cashReportHistoryMarkup(section) {
  const isOpen = expandedCashReportHistory.has(section.id);
  const reportHistory = Array.isArray(section?.reportHistory) ? section.reportHistory : [];
  const rows = reportHistory.length ? reportHistory.map((item) => {
    const typeClass = item.type === 'statement' ? 'is-statement' : item.type === 'act' ? 'is-act' : 'is-report';
    const typeLabel = item.type === 'statement' ? 'ВОР' : item.type === 'act' ? 'АКТ' : tr('report');
    const documentActions = ['statement', 'act'].includes(item.type) ? `<button type="button" data-history-edit>${tr('editDocument')}</button><button class="is-danger" type="button" data-history-delete>${tr('deleteDocument')}</button>` : '';
    return `<article class="cash-report-history-row" data-report-history-id="${escapeHtml(item.id)}"><span><span class="cash-report-history-title"><b class="cash-report-type-badge ${typeClass}">${escapeHtml(typeLabel)}</b><strong>${escapeHtml(item.title)}</strong></span><small>${tr('changeSavedAt')}: ${cashDate(item.updatedAt || item.createdAt)}${item.report?.parties?.date ? ` · ${tr('documentDate')}: ${escapeHtml(item.report.parties.date)}` : ''}</small></span><div>${documentActions}<button type="button" data-history-preview aria-label="${escapeHtml(tr('viewReport'))}" title="${escapeHtml(tr('viewReport'))}">◉</button><button type="button" data-history-download="pdf">PDF</button><button type="button" data-history-download="xlsx">Excel</button><button type="button" data-history-share="pdf">↗ PDF</button><button type="button" data-history-share="xlsx">↗ Excel</button></div></article>`;
  }).join('') : `<div class="cash-history-empty">${tr('noReports')}</div>`;
  return `<div class="cash-report-history"${isOpen ? '' : ' hidden'}><div class="cash-report-history-list">${rows}</div></div>`;
}

function cashOwnFundsMarkup(section, investments, returns, investmentKind, returnKind) {
  const invested = cashTotal(investments);
  const closed = cashTotal(returns);
  const remaining = Math.round((invested - closed) * 100) / 100;
  return `<section class="cash-own-funds"><h4>${tr('ownFundsAccounting')}</h4><div class="cash-own-summary"><article><span>${tr('totalOwnInvested')}</span><strong>${formatMoney(invested)}</strong></article><article><span>${tr('totalOwnReturned')}</span><strong>${formatMoney(closed)}</strong></article><article class="${cashBalanceClass(remaining)}"><span>${tr('ownFundsRemaining')}</span><strong>${formatSignedMoney(remaining)}</strong></article></div><div class="cash-entry-grid">${cashEntryForm(investmentKind, 'ownInvested', 'addOwnFunds')}${cashEntryForm(returnKind, 'returnedFromAdvance', 'addOwnReturn')}</div>${cashHistoryMarkup(investments, 'ownInvested', investmentKind, section.id)}${cashHistoryMarkup(returns, 'returnedFromAdvance', returnKind, section.id)}</section>`;
}

function cashStaffingMarkup(section) {
  const shifts = section.staffingShifts || [];
  const totals = cashStaffingTotals(section);
  const tableHeader = `<div class="cash-staffing-table-head" aria-hidden="true"><span>${tr('staffingNumber')}</span><span>${tr('workerFullName')} / ${tr('structosWorkerId')}</span><span>${tr('plannedShift')}</span><span>${tr('actualShift')}</span><span>${tr('shiftRate')}</span><span>${tr('overtimeHours')} / ${tr('overtimePay')}</span><span>${tr('salaryPay')}</span><span>${tr('penalty')}</span><span></span></div>`;
  const days = cashStaffingDayGroups(section).map(({ date, shifts: dayShifts }) => {
    const dayTotals = cashStaffingTotalsForShifts(dayShifts);
    const rows = dayShifts.map((shift, index) => {
      const calculation = cashStaffingCalculation(shift);
      const statusClass = shift.closedAt ? ' is-closed' : shift.openedAt ? ' is-open' : '';
      const shiftAction = !shift.openedAt
        ? `<button class="cash-staffing-shift-button" type="button" data-open-staffing-shift>${tr('openShift')}</button>`
        : !shift.closedAt
          ? `<button class="cash-staffing-shift-button is-close" type="button" data-close-staffing-shift>${tr('closeShift')}</button>`
          : `<span class="cash-staffing-closed-badge">✓ ${tr('shiftClosed')}</span>`;
      return `<article class="cash-staffing-row${statusClass}" data-staffing-shift="${escapeHtml(shift.id)}">
        <span class="cash-staffing-number" aria-label="${escapeHtml(`${tr('staffingNumber')} ${index + 1}`)}">${index + 1}</span>
        <div class="cash-staffing-cell is-person" data-label="${escapeHtml(tr('workerFullName'))}"><input type="text" maxlength="160" data-staffing-field="fullName" value="${escapeHtml(shift.fullName)}" placeholder="${escapeHtml(tr('workerFullName'))}" /><input type="text" inputmode="numeric" maxlength="7" data-staffing-field="structosId" value="${escapeHtml(shift.structosId)}" placeholder="${escapeHtml(tr('structosWorkerId'))}" /></div>
        <div class="cash-staffing-cell is-plan" data-label="${escapeHtml(tr('plannedShift'))}"><label><small>${tr('shiftFrom')}</small><input type="time" data-staffing-field="plannedFrom" value="${escapeHtml(shift.plannedFrom)}" /></label><label><small>${tr('shiftTo')}</small><input type="time" data-staffing-field="plannedTo" value="${escapeHtml(shift.plannedTo)}" /></label><em><span data-staffing-planned-hours>${calculation.plannedHours}</span> ч</em></div>
        <div class="cash-staffing-cell is-actual" data-label="${escapeHtml(tr('actualShift'))}"><small>${tr('shiftOpenedAt')}: <b>${escapeHtml(cashStaffingTimestamp(shift.openedAt))}</b></small><small>${tr('shiftClosedAt')}: <b>${escapeHtml(cashStaffingTimestamp(shift.closedAt))}</b></small>${shiftAction}</div>
        <div class="cash-staffing-cell is-money" data-label="${escapeHtml(tr('shiftRate'))}"><input type="number" min="0" step="0.01" inputmode="decimal" data-staffing-field="shiftRate" value="${shift.shiftRate || ''}" placeholder="0" /></div>
        <div class="cash-staffing-cell is-calculation" data-label="${escapeHtml(tr('overtimeHours'))}"><strong><span data-staffing-overtime-hours>${calculation.overtimeHours}</span> ч</strong><small data-staffing-overtime-pay>${formatMoney(calculation.overtimePay)}</small></div>
        <div class="cash-staffing-cell is-salary" data-label="${escapeHtml(tr('salaryPay'))}"><strong data-staffing-salary>${formatMoney(calculation.salary)}</strong></div>
        <div class="cash-staffing-cell is-penalty" data-label="${escapeHtml(tr('penalty'))}"><input type="number" min="0" step="0.01" inputmode="decimal" data-staffing-field="penalty" value="${shift.penalty || ''}" placeholder="0" /><input type="text" maxlength="240" data-staffing-field="penaltyComment" value="${escapeHtml(shift.penaltyComment)}" placeholder="${escapeHtml(tr('penaltyComment'))}" /></div>
        <button class="cash-staffing-delete" type="button" data-delete-staffing-shift aria-label="${escapeHtml(tr('deleteShift'))}" title="${escapeHtml(tr('deleteShift'))}">×</button>
      </article>`;
    }).join('');
    return `<section class="cash-staffing-day" data-staffing-day="${escapeHtml(date)}">
      <header class="cash-staffing-day-head">
        <div class="cash-staffing-day-date"><label><span>${tr('shiftDate')}</span><input type="date" data-staffing-day-date value="${escapeHtml(date)}" /></label><strong><span>${tr('weekday')}</span><b data-staffing-day-weekday>${escapeHtml(cashStaffingWeekday(date))}</b></strong></div>
        <span class="cash-staffing-day-people"><b data-staffing-day-people>${dayTotals.people}</b> ${tr('staffingPeopleShort')}</span>
        <button class="outline-button" type="button" data-add-staffing-person-date="${escapeHtml(date)}">＋ ${tr('addStaffingPerson')}</button>
      </header>
      <div class="cash-staffing-day-table">${tableHeader}<div class="cash-staffing-rows">${rows}</div></div>
      <footer class="cash-staffing-day-total"><strong>${tr('staffingDayTotal')}</strong><div>
        <span><small>${tr('staffingPeopleShort')}</small><b data-staffing-day-summary="people">${dayTotals.people}</b></span>
        <span><small>${tr('staffingShiftRatesTotal')}</small><b data-staffing-day-summary="rates">${formatMoney(dayTotals.shiftRates)}</b></span>
        <span><small>${tr('totalOvertime')}</small><b><i data-staffing-day-summary="overtime">${Math.round(dayTotals.overtimeHours * 100) / 100} ч</i><i data-staffing-day-summary="overtimePay">${formatMoney(dayTotals.overtimePay)}</i></b></span>
        <span><small>${tr('staffingPenaltiesTotal')}</small><b data-staffing-day-summary="penalties">${formatMoney(dayTotals.penalties)}</b></span>
        <span class="is-payroll"><small>${tr('totalPayroll')}</small><b data-staffing-day-summary="payroll">${formatMoney(dayTotals.payroll)}</b></span>
      </div></footer>
    </section>`;
  }).join('');
  const grandTotal = shifts.length ? `<footer class="cash-staffing-grand-total"><strong>${tr('staffingRegisterTotal')}</strong><div>
    <span><small>${tr('staffingPeopleShort')}</small><b data-staffing-grand-summary="people">${totals.people}</b></span>
    <span><small>${tr('staffingShiftRatesTotal')}</small><b data-staffing-grand-summary="rates">${formatMoney(totals.shiftRates)}</b></span>
    <span><small>${tr('totalOvertime')}</small><b><i data-staffing-grand-summary="overtime">${Math.round(totals.overtimeHours * 100) / 100} ч</i><i data-staffing-grand-summary="overtimePay">${formatMoney(totals.overtimePay)}</i></b></span>
    <span><small>${tr('staffingPenaltiesTotal')}</small><b data-staffing-grand-summary="penalties">${formatMoney(totals.penalties)}</b></span>
    <span class="is-payroll"><small>${tr('totalPayroll')}</small><b data-staffing-grand-summary="payroll">${formatMoney(totals.payroll)}</b></span>
  </div></footer>` : '';
  return `<section class="cash-staffing-block">
    <header><div><span class="eyebrow">STRUCTOS STAFF</span><h4>${tr('aggregatorWindow')}</h4><p>${tr('aggregatorWindowHint')}</p></div><div class="cash-staffing-actions"><button class="outline-button" type="button" data-add-staffing-shift>＋ ${tr('addStaffingPerson')}</button><button class="primary-button" type="button" data-add-staffing-day>＋ ${tr('startStaffingDay')}</button></div></header>
    <div class="cash-staffing-summary"><article><span>${tr('staffingPeople')}</span><strong data-staffing-summary="people">${totals.people}</strong></article><article><span>${tr('activeShifts')}</span><strong data-staffing-summary="active">${totals.active}</strong></article><article><span>${tr('totalOvertime')}</span><strong data-staffing-summary="overtime">${Math.round(totals.overtimeHours * 100) / 100} ч</strong></article><article><span>${tr('totalPayroll')}</span><strong data-staffing-summary="payroll">${formatMoney(totals.payroll)}</strong></article></div>
    <p class="cash-staffing-formula"><span>ƒ</span>${tr('overtimeFormula')}</p>
    <div class="cash-staffing-table">${days || `<div class="cash-staffing-empty"><span>＋</span><p>${tr('noStaffingShifts')}</p></div>`}</div>${grandTotal}
  </section>`;
}

function findCashStaffingShift(objectId, sectionId, shiftId) {
  const { object, section } = findCashSection(objectId, sectionId);
  const shift = section?.staffingShifts?.find((item) => item.id === shiftId);
  return { object, section, shift };
}

function addCashStaffingShift(objectId, sectionId, requestedDate = '') {
  const { section } = findCashSection(objectId, sectionId);
  if (!section) return;
  section.staffingShifts ||= [];
  const date = /^\d{4}-\d{2}-\d{2}$/.test(String(requestedDate || '')) ? requestedDate : cashStaffingLatestDate(section);
  section.staffingShifts.push(normalizeCashStaffingShift({ date }));
  saveCashflow();
  renderCashflow();
}

function addCashStaffingDay(objectId, sectionId) {
  const { section } = findCashSection(objectId, sectionId);
  if (!section) return;
  section.staffingShifts ||= [];
  section.staffingShifts.push(normalizeCashStaffingShift({ date: cashStaffingNextDate(section) }));
  saveCashflow();
  renderCashflow();
  showToast(tr('staffingDayCreated'));
}

function updateCashStaffingDayDate(objectId, sectionId, previousDate, nextDate) {
  const { section } = findCashSection(objectId, sectionId);
  if (!section || !/^\d{4}-\d{2}-\d{2}$/.test(String(nextDate || ''))) return;
  const updatedAt = new Date().toISOString();
  section.staffingShifts.forEach((shift) => {
    if (shift.date !== previousDate) return;
    shift.date = nextDate;
    shift.updatedAt = updatedAt;
  });
  saveCashflow();
  renderCashflow();
}

function updateCashStaffingTotalsDisplay(section, sectionCard, date) {
  const totals = cashStaffingTotals(section);
  const summaryValues = { people: totals.people, active: totals.active, overtime: `${Math.round(totals.overtimeHours * 100) / 100} ч`, payroll: formatMoney(totals.payroll) };
  Object.entries(summaryValues).forEach(([key, value]) => {
    const target = $(`[data-staffing-summary="${key}"]`, sectionCard);
    if (target) target.textContent = value;
  });
  const grandValues = { people: totals.people, rates: formatMoney(totals.shiftRates), overtime: `${Math.round(totals.overtimeHours * 100) / 100} ч`, overtimePay: formatMoney(totals.overtimePay), penalties: formatMoney(totals.penalties), payroll: formatMoney(totals.payroll) };
  Object.entries(grandValues).forEach(([key, value]) => {
    const target = $(`[data-staffing-grand-summary="${key}"]`, sectionCard);
    if (target) target.textContent = value;
  });
  const day = $$('[data-staffing-day]', sectionCard).find((item) => item.dataset.staffingDay === date);
  if (!day) return;
  const dayTotals = cashStaffingTotalsForShifts(section.staffingShifts.filter((shift) => shift.date === date));
  const people = $('[data-staffing-day-people]', day);
  if (people) people.textContent = dayTotals.people;
  const dayValues = { people: dayTotals.people, rates: formatMoney(dayTotals.shiftRates), overtime: `${Math.round(dayTotals.overtimeHours * 100) / 100} ч`, overtimePay: formatMoney(dayTotals.overtimePay), penalties: formatMoney(dayTotals.penalties), payroll: formatMoney(dayTotals.payroll) };
  Object.entries(dayValues).forEach(([key, value]) => {
    const target = $(`[data-staffing-day-summary="${key}"]`, day);
    if (target) target.textContent = value;
  });
}

function updateCashStaffingShift(objectId, sectionId, shiftId, field, value, row, sectionCard) {
  const { section, shift } = findCashStaffingShift(objectId, sectionId, shiftId);
  if (!section || !shift) return;
  if (field === 'structosId') shift.structosId = String(value || '').replace(/\D+/g, '').slice(0, 7);
  else if (['shiftRate', 'penalty'].includes(field)) shift[field] = Math.max(0, Math.round((Number(value) || 0) * 100) / 100);
  else if (field === 'date') shift.date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : localDateKey();
  else if (['plannedFrom', 'plannedTo'].includes(field)) shift[field] = /^\d{2}:\d{2}$/.test(value) ? value : '';
  else if (field === 'fullName') shift.fullName = String(value || '').slice(0, 160);
  else if (field === 'penaltyComment') shift.penaltyComment = String(value || '').slice(0, 240);
  shift.updatedAt = new Date().toISOString();
  saveCashflow();
  const calculation = cashStaffingCalculation(shift);
  const weekday = $('[data-staffing-weekday]', row);
  if (weekday) weekday.textContent = cashStaffingWeekday(shift.date);
  $('[data-staffing-planned-hours]', row).textContent = calculation.plannedHours;
  $('[data-staffing-overtime-hours]', row).textContent = calculation.overtimeHours;
  $('[data-staffing-overtime-pay]', row).textContent = formatMoney(calculation.overtimePay);
  $('[data-staffing-salary]', row).textContent = formatMoney(calculation.salary);
  updateCashStaffingTotalsDisplay(section, sectionCard, shift.date);
}

function openCashStaffingShift(objectId, sectionId, shiftId) {
  const { shift } = findCashStaffingShift(objectId, sectionId, shiftId);
  if (!shift) return;
  const valid = shift.fullName.trim() && shift.structosId.length === 7 && shift.date && cashStaffingPlannedHours(shift) > 0 && shift.shiftRate > 0;
  if (!valid) { showToast(tr('staffingRequiredFields')); return; }
  shift.openedAt = new Date().toISOString();
  shift.closedAt = null;
  shift.updatedAt = shift.openedAt;
  saveCashflow(); renderCashflow(); showToast(tr('shiftOpened'));
}

function closeCashStaffingShift(objectId, sectionId, shiftId) {
  const { shift } = findCashStaffingShift(objectId, sectionId, shiftId);
  if (!shift?.openedAt || shift.closedAt) return;
  shift.closedAt = new Date().toISOString();
  shift.updatedAt = shift.closedAt;
  saveCashflow(); renderCashflow(); showToast(tr('shiftClosedToast'));
}

function deleteCashStaffingShift(objectId, sectionId, shiftId) {
  const { section, shift } = findCashStaffingShift(objectId, sectionId, shiftId);
  if (!section || !shift || !window.confirm(tr('deleteShiftConfirm'))) return;
  section.staffingShifts = section.staffingShifts.filter((item) => item.id !== shift.id);
  saveCashflow(); renderCashflow(); showToast(tr('shiftDeleted'));
}

function cashSectionMarkup(object, section) {
  const reportHistory = Array.isArray(section?.reportHistory) ? section.reportHistory : [];
  const advances = cashTotal(section.advances);
  const expenses = cashTotal(section.expenses);
  const remainingContract = Math.round((section.contractAmount - expenses) * 100) / 100;
  const paidProductionRemaining = Math.round((expenses - advances) * 100) / 100;
  const factIncome = cashTotal(section.factIncome);
  const factExpenses = cashTotal(section.factExpenses);
  const factBalance = Math.round((factIncome - factExpenses) * 100) / 100;
  const sectionBalance = cashSectionFinancials(section).balance;
  const isOpen = expandedCashSections.has(section.id);
  const modeBadges = `${section.contractMode ? `<span>${tr('workByContract')}</span>` : ''}${section.factMode ? `<span>${tr('actualAccounting')}</span>` : ''}${section.staffingMode ? `<span>${tr('peopleAssigned')}</span>` : ''}`;
  const contractMarkup = section.contractMode ? `<section class="cash-accounting-block cash-contract-accounting"><h4>${tr('contractAccounting')}</h4><div class="cash-contract-head"><article class="cash-contract-value"><span>${tr('contractAmount')}</span><div><strong>${formatMoney(section.contractAmount)}</strong><button type="button" data-edit-contract-amount aria-label="${escapeHtml(tr('editContractAmount'))}" title="${escapeHtml(tr('editContractAmount'))}">✎</button></div></article><article><span>${tr('receivedFromCustomer')}</span><strong>${formatMoney(advances)}</strong></article><article class="${cashBalanceClass(remainingContract)}"><span>${tr('contractProductionRemaining')}</span><strong>${formatSignedMoney(remainingContract)}</strong></article></div><div class="cash-summary"><article><span>${tr('totalReceivedAdvanceClosure')}</span><strong>${formatMoney(advances)}</strong></article><article><span>${tr('totalCompletedWorkVolume')}</span><strong>${formatMoney(expenses)}</strong></article><article class="is-remaining ${cashBalanceClass(-paidProductionRemaining)}"><span>${tr('paidProductionRemaining')}</span><strong>${formatSignedMoney(paidProductionRemaining)}</strong></article></div><div class="cash-entry-grid">${cashEntryForm('advances', 'receivedAdvanceClosure', 'addReceivedAdvanceClosure')}${cashEntryForm('expenses', 'completedWorkVolume', 'addCompletedWorkVolume')}</div>${cashHistoryMarkup(section.advances, 'totalReceivedAdvanceClosure', 'advances', section.id)}${cashHistoryMarkup(section.expenses, 'totalCompletedWorkVolume', 'expenses', section.id)}${cashOwnFundsMarkup(section, section.ownInvestments, section.ownReturns, 'ownInvestments', 'ownReturns')}</section>` : '';
  const factMarkup = section.factMode ? `<section class="cash-fact-table cash-accounting-block"><h4 class="cash-fact-title">${tr('actualAccounting')}</h4><div class="cash-entry-grid">${cashEntryForm('factIncome', 'factAdvanceCompletion', 'addFactAdvanceCompletion')}${cashEntryForm('factExpenses', 'actuallyCompleted', 'addActuallyCompleted')}</div>${cashHistoryMarkup(section.factIncome, 'totalFactAdvanceCompletion', 'factIncome', section.id)}${cashHistoryMarkup(section.factExpenses, 'totalActuallyCompleted', 'factExpenses', section.id)}<div class="cash-balance ${cashBalanceClass(factBalance)}"><span>${tr('executionRemaining')}</span><strong>${formatSignedMoney(factBalance)}</strong></div>${cashOwnFundsMarkup(section, section.factOwnInvestments, section.factOwnReturns, 'factOwnInvestments', 'factOwnReturns')}</section>` : '';
  const staffingMarkup = section.staffingMode ? cashStaffingMarkup(section) : '';
  return `<section class="cash-section" data-cash-section="${escapeHtml(section.id)}">
    <header class="cash-section-head">
      <button class="cash-section-toggle" type="button" data-cash-section-toggle aria-expanded="${isOpen}"><span>${isOpen ? '⌄' : '›'}</span><strong>${escapeHtml(section.name)}</strong><b class="cash-section-balance ${cashBalanceClass(sectionBalance)}" aria-label="${escapeHtml(tr('sectionBalance'))}">${formatSignedMoney(sectionBalance)}</b><i>${modeBadges}</i></button>
      <div class="cash-section-head-actions"><button class="cash-mini-button" type="button" data-rename-cash-section>${tr('rename')}</button><button class="cash-mini-button is-danger" type="button" data-delete-cash-section>${tr('deleteSection')}</button></div>
    </header>
    <div class="cash-section-body"${isOpen ? '' : ' hidden'}>
      ${cashSectionAttachmentsMarkup(section)}<div class="cash-section-document-actions"><button type="button" data-open-cash-document="statement">${tr('workStatement')}</button><button type="button" data-open-cash-document="act">${tr('workAct')}</button><button type="button" data-export-section>${tr('sectionReport')}</button><button type="button" data-toggle-report-history>${tr('reportHistory')} · ${reportHistory.length}</button></div>${cashReportHistoryMarkup(section)}${contractMarkup}${factMarkup}${staffingMarkup}
    </div>
  </section>`;
}

function renderCashflowContent() {
  const browser = $('[data-cashflow-browser]');
  const detail = $('[data-cashflow-detail]');
  const list = $('[data-cashflow-list]');
  const empty = $('[data-cashflow-empty]');
  if (!browser || !detail || !list || !empty) return;
  const activeObject = cashflowObjects.find((item) => item.id === activeCashObjectId);
  if (activeObject) {
    browser.hidden = true; detail.hidden = false; renderCashObjectDetail(activeObject, detail); return;
  }
  activeCashObjectId = null; browser.hidden = false; detail.hidden = true; detail.innerHTML = '';
  empty.hidden = cashflowObjects.length > 0;
  list.hidden = cashflowObjects.length === 0;
  const exportAllButton = $('[data-export-all-cashflow]', browser);
  if (exportAllButton) exportAllButton.hidden = cashflowObjects.length === 0;
  const orderedObjects = [...(Array.isArray(cashflowObjects) ? cashflowObjects : [])].sort((a, b) => Number(a.completed) - Number(b.completed) || new Date(b.createdAt) - new Date(a.createdAt));
  list.innerHTML = orderedObjects.map((object) => {
    const financials = cashObjectFinancials(object);
    const sectionCount = Array.isArray(object?.sections) ? object.sections.length : 0;
    return `<article class="cash-object${object.completed ? ' is-completed' : ''}" data-cash-object="${escapeHtml(object.id)}" role="button" tabindex="0" aria-label="${escapeHtml(`${tr('openObjectAction')}: ${object.name}`)}"><header><div class="cash-object-heading"><div class="cash-object-name-line"><h2>${escapeHtml(object.name)}</h2><strong class="cash-card-balance ${cashBalanceClass(financials.balance)}">${formatSignedMoney(financials.balance)}</strong></div><small>${cashDate(object.createdAt)} · ${sectionCount} ${tr('sectionCalculations')}${object.completed ? ` · ${tr('completedObject')}` : ''}</small><div class="cash-object-actions"><button class="cash-mini-button" type="button" data-rename-cash-object>${tr('rename')}</button><button class="cash-mini-button is-danger" type="button" data-delete-cash-object>${tr('deleteObject')}</button><label class="cash-mini-button is-complete"><input type="checkbox" data-complete-cash-object${object.completed ? ' checked' : ''} /><span>${object.completed ? tr('reopenObject') : tr('finishObject')}</span></label></div></div></header></article>`;
  }).join('');

  $$('[data-cash-object]', list).forEach((card) => {
    const object = cashflowObjects.find((item) => item.id === card.dataset.cashObject);
    if (!object) return;
    const openObject = () => { activeCashObjectId = object.id; renderCashflow(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    card.addEventListener('click', (event) => { if (!event.target.closest('.cash-object-actions')) openObject(); });
    card.addEventListener('keydown', (event) => { if (event.target !== card || !['Enter', ' '].includes(event.key)) return; event.preventDefault(); openObject(); });
    $('[data-rename-cash-object]', card)?.addEventListener('click', () => renameCashObject(object.id));
    $('[data-delete-cash-object]', card)?.addEventListener('click', () => {
      if (!window.confirm(tr('deleteCashObjectConfirm'))) return;
      deleteCashflowFiles([object, ...object.sections]).catch((error) => console.error(error));
      cashflowObjects = cashflowObjects.filter((item) => item.id !== object.id);
      saveCashflow();
      renderCashflow();
      showToast(tr('cashObjectDeleted'));
    });
    $('[data-complete-cash-object]', card)?.addEventListener('change', (event) => {
      object.completed = event.currentTarget.checked;
      object.completedAt = object.completed ? new Date().toISOString() : null;
      saveCashflow(); renderCashflow(); showToast(tr(object.completed ? 'completedObject' : 'objectReopened'));
    });
  });
}

let cashflowRecoveryInProgress = false;

function renderCashflow() {
  try {
    renderCashflowContent();
  } catch (error) {
    console.error('StructOS short contracts render failed:', error);
    if (!cashflowRecoveryInProgress) {
      cashflowRecoveryInProgress = true;
      try {
        cashflowObjects = loadCashflow();
        if (activeCashObjectId && !cashflowObjects.some((object) => object.id === activeCashObjectId)) activeCashObjectId = null;
        renderCashflowContent();
        return;
      } catch (retryError) {
        console.error('StructOS short contracts recovery failed:', retryError);
      } finally {
        cashflowRecoveryInProgress = false;
      }
    }
    const browser = $('[data-cashflow-browser]');
    const detail = $('[data-cashflow-detail]');
    const list = $('[data-cashflow-list]');
    const empty = $('[data-cashflow-empty]');
    if (browser) browser.hidden = false;
    if (detail) { detail.hidden = true; detail.innerHTML = ''; }
    if (empty) empty.hidden = true;
    if (list) {
      list.hidden = false;
      list.innerHTML = `<div class="cashflow-empty"><span>↻</span><h2>${escapeHtml(tr('quickCashflow'))}</h2><p>${escapeHtml(tr('cashflowDescription'))}</p><button class="primary-button" type="button" data-retry-cashflow>${escapeHtml(tr('refreshPage'))}</button></div>`;
      $('[data-retry-cashflow]', list)?.addEventListener('click', () => window.location.reload());
    }
  }
}

function bindCashSectionEvents(object, scope) {
  $$('[data-cash-section]', scope).forEach((sectionCard) => {
      const section = object.sections.find((item) => item.id === sectionCard.dataset.cashSection);
      if (!section) return;
      $('[data-cash-section-toggle]', sectionCard)?.addEventListener('click', () => {
        if (expandedCashSections.has(section.id)) expandedCashSections.delete(section.id); else expandedCashSections.add(section.id);
        renderCashflow();
      });
      $('[data-rename-cash-section]', sectionCard)?.addEventListener('click', () => renameCashSection(object.id, section.id));
      $('[data-delete-cash-section]', sectionCard)?.addEventListener('click', () => {
        if (!window.confirm(tr('deleteSectionConfirm'))) return;
        deleteCashflowFiles(section).catch((error) => console.error(error));
        object.sections = object.sections.filter((item) => item.id !== section.id);
        expandedCashSections.delete(section.id);
        saveCashflow(); renderCashflow(); showToast(tr('sectionDeleted'));
      });
      $('[data-edit-contract-amount]', sectionCard)?.addEventListener('click', () => openCashContractAmountDialog(object.id, section.id));
      $$('[data-select-cash-attachment]', sectionCard).forEach((button) => button.addEventListener('click', () => {
        const input = $$('[data-cash-attachment-input]', sectionCard).find((item) => item.dataset.cashAttachmentInput === button.dataset.selectCashAttachment);
        input?.click();
      }));
      $$('[data-cash-attachment-input]', sectionCard).forEach((input) => input.addEventListener('change', async () => {
        const file = input.files?.[0];
        if (!file) return;
        input.disabled = true;
        await addCashSectionAttachment(object.id, section.id, input.dataset.cashAttachmentInput, file);
        input.value = '';
        input.disabled = false;
      }));
      $$('[data-open-cash-attachment-version]', sectionCard).forEach((button) => button.addEventListener('click', () => openCashSectionAttachment(object.id, section.id, button.dataset.cashAttachmentKind, button.dataset.openCashAttachmentVersion)));
      $$('[data-delete-cash-attachment]', sectionCard).forEach((button) => button.addEventListener('click', () => deleteCashSectionAttachment(object.id, section.id, button.dataset.deleteCashAttachment)));
      $('[data-add-staffing-shift]', sectionCard)?.addEventListener('click', () => addCashStaffingShift(object.id, section.id));
      $('[data-add-staffing-day]', sectionCard)?.addEventListener('click', () => addCashStaffingDay(object.id, section.id));
      $$('[data-add-staffing-person-date]', sectionCard).forEach((button) => button.addEventListener('click', () => addCashStaffingShift(object.id, section.id, button.dataset.addStaffingPersonDate)));
      $$('[data-staffing-day-date]', sectionCard).forEach((input) => input.addEventListener('change', () => {
        const day = input.closest('[data-staffing-day]');
        if (day) updateCashStaffingDayDate(object.id, section.id, day.dataset.staffingDay, input.value);
      }));
      $$('[data-staffing-shift]', sectionCard).forEach((row) => {
        const shiftId = row.dataset.staffingShift;
        $$('[data-staffing-field]', row).forEach((input) => input.addEventListener('input', () => {
          updateCashStaffingShift(object.id, section.id, shiftId, input.dataset.staffingField, input.value, row, sectionCard);
          if (input.dataset.staffingField === 'structosId') input.value = input.value.replace(/\D+/g, '').slice(0, 7);
        }));
        $('[data-open-staffing-shift]', row)?.addEventListener('click', () => openCashStaffingShift(object.id, section.id, shiftId));
        $('[data-close-staffing-shift]', row)?.addEventListener('click', () => closeCashStaffingShift(object.id, section.id, shiftId));
        $('[data-delete-staffing-shift]', row)?.addEventListener('click', () => deleteCashStaffingShift(object.id, section.id, shiftId));
      });
      $('[data-toggle-report-history]', sectionCard)?.addEventListener('click', () => {
        if (expandedCashReportHistory.has(section.id)) expandedCashReportHistory.delete(section.id); else expandedCashReportHistory.add(section.id);
        renderCashflow();
      });
      $$('[data-cash-entry]', sectionCard).forEach((form) => {
        $('[data-cash-submit]', form)?.addEventListener('click', () => addCashEntry(object.id, section.id, form.dataset.cashEntry, form));
        $$('input', form).forEach((input) => input.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') { event.preventDefault(); addCashEntry(object.id, section.id, form.dataset.cashEntry, form); }
        }));
      });
      $$('[data-cash-history]', sectionCard).forEach((history) => history.addEventListener('toggle', () => {
        if (history.open) expandedCashEntryHistories.add(history.dataset.cashHistory); else expandedCashEntryHistories.delete(history.dataset.cashHistory);
      }));
      $$('[data-edit-cash-entry]', sectionCard).forEach((button) => button.addEventListener('click', () => openCashEntryEditDialog(object.id, section.id, button.dataset.cashEntryKind, button.dataset.editCashEntry)));
      $$('[data-open-cash-document]', sectionCard).forEach((button) => button.addEventListener('click', () => openCashDocumentDialog(object.id, section.id, button.dataset.openCashDocument)));
      $('[data-export-section]', sectionCard)?.addEventListener('click', () => openSectionExportDialog(object.id, section.id));
      $$('[data-report-history-id]', sectionCard).forEach((historyRow) => {
        const item = section.reportHistory.find((record) => record.id === historyRow.dataset.reportHistoryId);
        if (!item) return;
        $('[data-history-edit]', historyRow)?.addEventListener('click', () => openCashDocumentDialog(object.id, section.id, item.type, { sourceReport: item.report, historyId: item.id }));
        $('[data-history-delete]', historyRow)?.addEventListener('click', () => {
          if (!window.confirm(tr('deleteDocumentConfirm'))) return;
          section.reportHistory = section.reportHistory.filter((record) => record.id !== item.id);
          saveCashflow(); renderCashflow(); showToast(tr('documentDeleted'));
        });
        $('[data-history-preview]', historyRow)?.addEventListener('click', () => openCashReportPreview(item.report, () => item.report));
        $$('[data-history-download]', historyRow).forEach((button) => button.addEventListener('click', () => deliverCashReport(item.report, button.dataset.historyDownload, false).catch((error) => { console.error(error); showToast(tr('comingSoon')); })));
        $$('[data-history-share]', historyRow).forEach((button) => button.addEventListener('click', () => deliverCashReport(item.report, button.dataset.historyShare, true).catch((error) => { if (error?.name !== 'AbortError') { console.error(error); showToast(tr('comingSoon')); } })));
      });
    });
}

function renderCashObjectDetail(object, detail) {
  const financials = cashObjectFinancials(object);
  const sections = Array.isArray(object?.sections) ? object.sections : [];
  object.organizationDocuments = normalizeCashOrganizationDocuments(object.organizationDocuments);
  const overall = `<section class="cash-object-total"><header><div><span class="eyebrow">STRUCTOS TOTAL</span><h2>${tr('overallSectionsBalance')}</h2></div><strong class="${cashBalanceClass(financials.balance)}">${formatSignedMoney(financials.balance)}</strong></header><div class="cash-object-total-breakdown"><article><span>${tr('contractBalancesTotal')}</span><strong class="${cashBalanceClass(financials.contractBalance)}">${formatSignedMoney(financials.contractBalance)}</strong></article><article><span>${tr('factBalancesTotal')}</span><strong class="${cashBalanceClass(financials.factBalance)}">${formatSignedMoney(financials.factBalance)}</strong></article></div><button class="primary-button" type="button" data-export-cash-object>${tr('downloadOverallReport')}</button></section>`;
  detail.innerHTML = `<div class="cash-object-detail-head"><button class="outline-button" type="button" data-close-cash-object>‹ ${tr('backToMoneyObjects')}</button><div><span class="eyebrow">STRUCTOS MONEY</span><div class="cash-object-title-line"><h1>${escapeHtml(object.name)}</h1><button type="button" data-rename-cash-object aria-label="${escapeHtml(tr('renameObject'))}" title="${escapeHtml(tr('renameObject'))}">✎</button></div><p>${object.completed ? tr('completedObject') : tr('objectSections')}</p></div><button class="primary-button" type="button" data-add-cash-section><span>＋</span>${tr('addSection')}</button></div>${cashOrganizationDocumentsMarkup(object)}${sections.length ? `<div class="cash-sections">${sections.map((section) => cashSectionMarkup(object, section)).join('')}</div>` : `<div class="cash-sections-empty"><span>＋</span><h2>${tr('noSections')}</h2><p>${tr('noSectionsCopy')}</p><button class="primary-button" type="button" data-add-cash-section>${tr('addSection')}</button></div>`}${overall}`;
  $('[data-close-cash-object]', detail)?.addEventListener('click', () => { activeCashObjectId = null; renderCashflow(); });
  $('[data-rename-cash-object]', detail)?.addEventListener('click', () => renameCashObject(object.id));
  $$('[data-add-cash-section]', detail).forEach((button) => button.addEventListener('click', () => openCashSectionDialog(object.id)));
  $('[data-export-cash-object]', detail)?.addEventListener('click', () => openCashObjectExportDialog(object.id));
  bindCashOrganizationDocuments(object, detail);
  bindCashSectionEvents(object, detail);
}

function openCashSectionDialog(objectId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  if (!object) return;
  showDialog(tr('createSection'), object.name, `<div class="cash-create-form cash-section-create"><label><span>${tr('sectionName')}</span><input type="text" maxlength="120" data-cash-section-name placeholder="${tr('sectionPlaceholder')}" /></label><label class="cash-create-fact"><input type="checkbox" data-section-contract /><span>${tr('workByContract')}</span></label><div class="cash-contract-amount-field" data-contract-amount-field hidden><label><span>${tr('contractAmount')}</span><input type="number" min="0.01" step="0.01" inputmode="decimal" data-section-contract-amount placeholder="0 ₽" /></label></div><label class="cash-create-fact"><input type="checkbox" data-section-fact /><span>${tr('workByFact')}</span></label><label class="cash-create-fact"><input type="checkbox" data-section-staffing /><span>${tr('peopleAssigned')}</span></label><button class="primary-button" type="button" data-create-cash-section>${tr('create')}</button></div>`);
  const input = $('[data-cash-section-name]', $('[data-dialog-content]'));
  const contractToggle = $('[data-section-contract]', $('[data-dialog-content]'));
  const contractAmountField = $('[data-contract-amount-field]', $('[data-dialog-content]'));
  contractToggle?.addEventListener('change', () => { contractAmountField.hidden = !contractToggle.checked; if (contractToggle.checked) $('[data-section-contract-amount]', contractAmountField)?.focus(); });
  const createSection = () => {
    const name = input?.value.trim();
    if (!name) { input?.focus(); return; }
    const contractMode = Boolean(contractToggle?.checked);
    const factMode = Boolean($('[data-section-fact]', $('[data-dialog-content]'))?.checked);
    const staffingMode = Boolean($('[data-section-staffing]', $('[data-dialog-content]'))?.checked);
    if (!contractMode && !factMode && !staffingMode) { showToast(tr('chooseSectionMode')); return; }
    const contractAmountInput = $('[data-section-contract-amount]', $('[data-dialog-content]'));
    const contractAmount = Math.max(0, Math.round((Number(contractAmountInput?.value) || 0) * 100) / 100);
    if (contractMode && contractAmount <= 0) { showToast(tr('enterContractAmount')); contractAmountInput?.focus(); return; }
    const section = normalizeCashSection({ name, createdAt: new Date().toISOString(), createdManually: true, contractMode, factMode, staffingMode, contractAmount });
    object.sections.push(section);
    expandedCashSections.add(section.id);
    saveCashflow(); renderCashflow(); $('[data-dialog]').close(); showToast(tr('sectionCreated'));
  };
  $('[data-create-cash-section]')?.addEventListener('click', createSection);
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); createSection(); } });
  setTimeout(() => input?.focus(), 40);
}

function openCashObjectDialog() {
  showDialog(tr('createCashObject'), tr('cashflowDescription'), `<div class="cash-create-form"><label><span>${tr('objectName')}</span><input type="text" maxlength="100" data-cash-name placeholder="${tr('objectPlaceholder')}" /></label><button class="primary-button" type="button" data-cash-create>${tr('create')}</button></div>`);
  const nameInput = $('[data-cash-name]', $('[data-dialog-content]'));
  const createCashObject = () => {
    const name = nameInput.value.trim();
    if (!name) { nameInput.focus(); return; }
    cashflowObjects.unshift({
      id: `cash-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: name.slice(0, 100),
      createdAt: new Date().toISOString(),
      completed: false, completedAt: null,
      organizationDocumentsCollapsed: false,
      organizationDocuments: normalizeCashOrganizationDocuments(),
      sections: []
    });
    saveCashflow();
    renderCashflow();
    $('[data-dialog]').close();
    setPanel('cashflow');
    showToast(tr('cashObjectCreated'));
  };
  $('[data-cash-create]', $('[data-dialog-content]'))?.addEventListener('click', createCashObject);
  nameInput?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); createCashObject(); } });
  setTimeout(() => nameInput?.focus(), 40);
}

function cashSourceOptionLabel(entry) {
  return [tr(entry.sourceKind), entry.sourceName, entry.sourceSheet, entry.unit].filter(Boolean).join(' · ');
}

function renderCashDocumentSourceCatalog(scope, catalog, section, loading = false) {
  const banner = $('[data-cash-source-catalog]', scope);
  const dataList = $('[data-cash-source-options]', scope);
  if (!banner || !dataList) return;
  const hasSources = cashSectionHasSourceDocuments(section);
  const message = loading
    ? tr('sourceCatalogLoading')
    : catalog.length
      ? `${catalog.length} ${tr('sourceCatalogReady')}`
      : tr(hasSources ? 'sourceCatalogPending' : 'sourceCatalogEmpty');
  banner.className = `cash-source-catalog${catalog.length ? ' is-ready' : hasSources ? ' is-pending' : ''}`;
  banner.innerHTML = `<span aria-hidden="true">⌕</span><div><strong>${escapeHtml(tr('sourceCatalogTitle'))}</strong><p>${escapeHtml(message)}</p><small>${escapeHtml(tr('sourceCatalogFreeInput'))}</small></div>${catalog.length ? `<b>${catalog.length}</b>` : ''}`;
  dataList.innerHTML = catalog.slice(0, 1200).map((entry) => `<option value="${escapeHtml(entry.name)}" label="${escapeHtml(cashSourceOptionLabel(entry))}"></option>`).join('');
}

function cashWorkRowsMarkup(rows, priced, sourceListId = '') {
  const listAttribute = sourceListId ? ` list="${escapeHtml(sourceListId)}" autocomplete="off"` : '';
  return rows.map((row, index) => `<tr data-cash-work-row="${escapeHtml(row.id)}"><td>${index + 1}</td><td><input data-work-field="name" maxlength="240" value="${escapeHtml(row.name)}" placeholder="${tr('workOrMaterialName')}"${listAttribute} /></td><td><input data-work-field="unit" maxlength="40" value="${escapeHtml(row.unit)}" placeholder="${tr('unit')}" /></td><td><input data-work-field="quantity" type="number" min="0" step="0.001" inputmode="decimal" value="${row.quantity || ''}" placeholder="0" /></td>${priced ? `<td><input data-work-field="price" type="number" min="0" step="0.01" inputmode="decimal" value="${row.price || ''}" placeholder="0 ₽" /></td><td data-work-total>${formatMoney(row.quantity * row.price)}</td>` : `<td><input data-work-field="basis" maxlength="240" value="${escapeHtml(row.basis)}" placeholder="${tr('justification')}" /></td>`}<td><button type="button" data-remove-work-row aria-label="${tr('removeRow')}">×</button></td></tr>`).join('');
}

function cashPartyMarkup(key, label, party) {
  return `<div class="cash-party-row"><strong>${label}</strong><label><span>${tr('fullName')}</span><input data-party="${key}" data-party-field="name" maxlength="160" value="${escapeHtml(party.name)}" /></label><label><span>${tr('signature')}</span><input data-party="${key}" data-party-field="signature" maxlength="160" value="${escapeHtml(party.signature)}" /></label><label><span>${tr('seal')}</span><input data-party="${key}" data-party-field="seal" maxlength="160" value="${escapeHtml(party.seal)}" /></label></div>`;
}

function updateCashDocumentTotal(scope, draft, priced) {
  if (!priced) return;
  $$('[data-cash-work-row]', scope).forEach((rowElement, index) => {
    const row = draft.rows[index];
    $('[data-work-total]', rowElement).textContent = formatMoney((row?.quantity || 0) * (row?.price || 0));
  });
  const total = draft.rows.reduce((sum, row) => sum + row.quantity * row.price, 0);
  $('[data-document-grand-total]', scope).textContent = formatMoney(total);
}

function bindCashDocumentRows(scope, draft, priced, sourceCatalog = [], sourceListId = '') {
  const body = $('[data-cash-work-rows]', scope);
  body.innerHTML = cashWorkRowsMarkup(draft.rows, priced, sourceListId);
  $$('[data-cash-work-row]', body).forEach((rowElement, index) => {
    const row = draft.rows[index];
    $$('[data-work-field]', rowElement).forEach((input) => input.addEventListener('input', () => {
      const field = input.dataset.workField;
      row[field] = ['quantity', 'price'].includes(field) ? Math.max(0, Number(input.value) || 0) : input.value.slice(0, ['name', 'basis'].includes(field) ? 240 : 40);
      if (field === 'name') {
        const previousSource = Boolean(row.sourceKind);
        const match = sourceCatalog.find((entry) => cashSourceKey(entry.name) === cashSourceKey(row.name));
        if (match) {
          row.sourceKind = match.sourceKind;
          row.sourceName = match.sourceName;
          if (match.unit && (!row.unit || previousSource)) {
            row.unit = match.unit;
            $('[data-work-field="unit"]', rowElement).value = match.unit;
          }
          if (priced && match.price > 0 && (!row.price || previousSource)) {
            row.price = match.price;
            $('[data-work-field="price"]', rowElement).value = String(match.price);
          }
          if (!priced && (!row.basis || previousSource)) {
            row.basis = cashSourceOptionLabel(match).slice(0, 240);
            $('[data-work-field="basis"]', rowElement).value = row.basis;
          }
        } else {
          row.sourceKind = null;
          row.sourceName = '';
        }
      }
      updateCashDocumentTotal(scope, draft, priced);
    }));
    $('[data-remove-work-row]', rowElement)?.addEventListener('click', () => {
      draft.rows.splice(index, 1);
      if (!draft.rows.length) draft.rows.push(...normalizeCashWorkRows([], priced));
      bindCashDocumentRows(scope, draft, priced, sourceCatalog, sourceListId);
      updateCashDocumentTotal(scope, draft, priced);
    });
  });
  updateCashDocumentTotal(scope, draft, priced);
}

function cashOrganizationReportData(object) {
  const documents = normalizeCashOrganizationDocuments(object?.organizationDocuments);
  return Object.fromEntries(CASH_ORGANIZATION_ROLES.map((role) => {
    const card = documents[role];
    return [role, {
      type: card.type,
      company: card.company,
      inn: card.inn,
      kpp: card.kpp,
      fullName: card.fullName,
      passportSeries: card.passportSeries,
      passportNumber: card.passportNumber,
      passport: card.passport,
      fileName: card.attachment?.versions?.at(-1)?.name || '',
      updatedAt: card.updatedAt
    }];
  }));
}

function cashDocumentOrganizationsSummaryMarkup(object) {
  const organizations = cashOrganizationReportData(object);
  return `<section class="cash-document-organizations"><h3>${tr('organizationDocuments')}</h3><div>${CASH_ORGANIZATION_ROLES.map((role) => {
    const card = organizations[role];
    const details = card.type === 'individual'
      ? [card.fullName, card.passportSeries && `${tr('passportSeries')}: ${card.passportSeries}`, card.passportNumber && `${tr('passportNumber')}: ${card.passportNumber}`]
      : [card.company, card.inn && `${tr('inn')}: ${card.inn}`, card.kpp && `${tr('kpp')}: ${card.kpp}`];
    return `<article><strong>${tr(role)}</strong><span>${escapeHtml(details.filter(Boolean).join(' · ') || tr('notSpecified'))}</span>${card.fileName ? `<small>${escapeHtml(card.fileName)}</small>` : ''}</article>`;
  }).join('')}</div></section>`;
}

function cashDocumentOrganizationsEditorMarkup(organizations) {
  return `<section class="cash-document-party-editor"><h3>${tr('documentParties')}</h3><div>${CASH_ORGANIZATION_ROLES.map((role) => {
    const card = organizations[role];
    return `<article data-document-organization-role="${role}"><header><strong>${tr(role)}</strong><select data-document-organization-type><option value="organization"${card.type === 'organization' ? ' selected' : ''}>${tr('legalEntity')}</option><option value="individual"${card.type === 'individual' ? ' selected' : ''}>${tr('individual')}</option></select></header><p data-document-organization-summary>${escapeHtml(cashDocumentOrganizationSummary(card))}</p>${card.fileName ? `<small>${tr('uploadedDocuments')}: ${escapeHtml(card.fileName)}</small>` : ''}</article>`;
  }).join('')}</div></section>`;
}

function cashDocumentOrganizationSummary(card) {
  const details = card.type === 'individual'
    ? [card.fullName, card.passportSeries && `${tr('passportSeries')}: ${card.passportSeries}`, card.passportNumber && `${tr('passportNumber')}: ${card.passportNumber}`]
    : [card.company, card.inn && `${tr('inn')}: ${card.inn}`, card.kpp && `${tr('kpp')}: ${card.kpp}`];
  return details.filter(Boolean).join(' · ') || tr('notSpecified');
}

function bindCashDocumentOrganizations(scope, draft) {
  $$('[data-document-organization-role]', scope).forEach((cardElement) => {
    const role = cardElement.dataset.documentOrganizationRole;
    const card = draft.organizations[role];
    const typeSelect = $('[data-document-organization-type]', cardElement);
    typeSelect?.addEventListener('change', () => {
      card.type = typeSelect.value === 'individual' ? 'individual' : 'organization';
      const summary = $('[data-document-organization-summary]', cardElement);
      if (summary) summary.textContent = cashDocumentOrganizationSummary(card);
    });
  });
}

function cashDocumentReport(object, section, kind, documentData) {
  const priced = kind === 'act';
  const defaultTitle = tr(priced ? 'workAct' : 'workStatement');
  const documentTitle = String(documentData.title || defaultTitle).trim().slice(0, 160) || defaultTitle;
  const documentNumber = String(documentData.number || '').trim().slice(0, 80);
  const documentObjectName = String(documentData.objectName || object.name).trim().slice(0, 160) || object.name;
  const documentSectionName = String(documentData.sectionName || section.name).trim().slice(0, 160) || section.name;
  const columns = [
    { label: tr('recordNumber'), key: 'number', width: 34 },
    { label: tr('workOrMaterialName'), key: 'name', width: '*' },
    { label: tr('unit'), key: 'unit', width: 48 },
    { label: tr('quantity'), key: 'quantity', width: 48, number: true },
    ...(priced ? [{ label: tr('price'), key: 'price', width: 66, money: true }, { label: tr('rowTotal'), key: 'total', width: 72, money: true }] : [{ label: tr('justification'), key: 'basis', width: '*' }])
  ];
  return {
    documentKind: kind,
    title: priced ? documentTitle : defaultTitle, documentName: documentTitle, documentNumber, numberLabel: tr(priced ? 'actNumber' : 'statementNumber'), objectName: documentObjectName, sectionName: documentSectionName, objectLabel: tr('documentObject'), sectionLabel: tr('documentSection'),
    tables: [{ title: documentTitle, columns, rows: documentData.rows.map((row, index) => ({ number: index + 1, name: row.name, unit: row.unit, quantity: row.quantity, ...(priced ? { price: row.price, total: Math.round(row.quantity * row.price * 100) / 100 } : { basis: row.basis }) })), ...(priced ? { total: documentData.rows.reduce((sum, row) => sum + row.quantity * row.price, 0) } : {}) }],
    parties: documentData.parties,
    partyRoles: priced ? ['performed', 'accepted'] : ['prepared', 'confirmed'],
    organizations: normalizeCashDocumentOrganizations(documentData.organizations || cashOrganizationReportData(object))
  };
}

function cashDocumentDataFromReport(report, kind) {
  const priced = kind === 'act';
  const table = report?.tables?.[0] || { rows: [] };
  return normalizeCashDocument({
    title: report?.documentName || table.title || '',
    number: report?.documentNumber || '',
    objectName: report?.objectName || '',
    sectionName: report?.sectionName || '',
    rows: (table.rows || []).map((row) => ({ name: row.name, unit: row.unit, quantity: row.quantity, ...(priced ? { price: row.price } : { basis: row.basis }) })),
    parties: report?.parties,
    organizations: report?.organizations,
    updatedAt: new Date().toISOString()
  }, priced, tr(priced ? 'workAct' : 'workStatement'));
}

function sectionFinanceReport(object, section) {
  const rowsFor = (incomeEntries, expenseEntries, incomeLabel = tr('reportIncome'), expenseLabel = tr('reportExpense')) => [
    ...incomeEntries.map((entry, index) => ({ number: index + 1, type: incomeLabel, comment: entry.comment, date: cashDate(entry.date), amount: entry.amount })),
    ...expenseEntries.map((entry, index) => ({ number: incomeEntries.length + index + 1, type: expenseLabel, comment: entry.comment, date: cashDate(entry.date), amount: entry.amount }))
  ];
  const columns = [{ label: tr('recordNumber'), key: 'number', width: 42 }, { label: tr('entryType'), key: 'type', width: 88 }, { label: tr('comment'), key: 'comment', width: '*' }, { label: tr('date'), key: 'date', width: 100 }, { label: tr('amount'), key: 'amount', width: 76, money: true }];
  const ownRowsFor = (investments, returns) => [
    ...investments.map((entry, index) => ({ number: index + 1, type: tr('ownFundsEntry'), comment: entry.comment, date: cashDate(entry.date), amount: entry.amount })),
    ...returns.map((entry, index) => ({ number: investments.length + index + 1, type: tr('ownReturnEntry'), comment: entry.comment, date: cashDate(entry.date), amount: entry.amount }))
  ];
  const tables = [];
  if (section.contractMode) {
    const advances = cashTotal(section.advances); const expenses = cashTotal(section.expenses);
    tables.push({ title: tr('contractAccounting'), columns, rows: rowsFor(section.advances, section.expenses, tr('receivedAdvanceClosure'), tr('completedWorkVolume')), summaries: [cashReportSummary(tr('contractAmount'), section.contractAmount), cashReportSummary(tr('contractProduction'), expenses), cashReportSummary(tr('receivedFromCustomer'), advances), cashReportSummary(tr('contractProductionRemaining'), section.contractAmount - expenses, true), cashReportSummary(tr('paidProductionRemaining'), expenses - advances, true, advances - expenses)] });
    const ownInvested = cashTotal(section.ownInvestments); const ownReturned = cashTotal(section.ownReturns);
    tables.push({ title: `${tr('ownFundsAccounting')} · ${tr('contractAccounting')}`, columns, rows: ownRowsFor(section.ownInvestments, section.ownReturns), summaries: [cashReportSummary(tr('totalOwnInvested'), ownInvested), cashReportSummary(tr('totalOwnReturned'), ownReturned), cashReportSummary(tr('ownFundsRemaining'), ownInvested - ownReturned, true)] });
  }
  if (section.factMode) {
    const factIncome = cashTotal(section.factIncome); const factExpenses = cashTotal(section.factExpenses);
    tables.push({ title: tr('actualAccounting'), columns, rows: rowsFor(section.factIncome, section.factExpenses, tr('factAdvanceCompletion'), tr('actuallyCompleted')), summaries: [cashReportSummary(tr('overallIncome'), factIncome), cashReportSummary(tr('overallExpense'), factExpenses), cashReportSummary(tr('executionRemaining'), factIncome - factExpenses, true)] });
    const factOwnInvested = cashTotal(section.factOwnInvestments); const factOwnReturned = cashTotal(section.factOwnReturns);
    tables.push({ title: `${tr('ownFundsAccounting')} · ${tr('actualAccounting')}`, columns, rows: ownRowsFor(section.factOwnInvestments, section.factOwnReturns), summaries: [cashReportSummary(tr('totalOwnInvested'), factOwnInvested), cashReportSummary(tr('totalOwnReturned'), factOwnReturned), cashReportSummary(tr('ownFundsRemaining'), factOwnInvested - factOwnReturned, true)] });
  }
  return {
    title: tr('sectionFinanceReport'), objectName: object.name, sectionName: section.name,
    tables, parties: cashDocumentParties(section.statement?.parties)
  };
}

function cashObjectOverviewReportPage(object, title = tr('objectReport')) {
  const sectionColumns = [
    { label: tr('sectionName'), key: 'section', width: '*' },
    { label: tr('sectionMode'), key: 'mode', width: 105 },
    { label: tr('incomingFunds'), key: 'income', width: 82, money: true },
    { label: tr('completedWorks'), key: 'expense', width: 82, money: true },
    { label: tr('sectionBalance'), key: 'balance', width: 82, money: true, signed: true, tone: true }
  ];
  const summaryRows = [];
  object.sections.forEach((section) => {
    const values = cashSectionFinancials(section);
    if (section.contractMode) summaryRows.push({ section: section.name, mode: tr('workByContract'), income: values.advances, expense: values.expenses, balance: values.contractBalance });
    if (section.factMode) summaryRows.push({ section: section.name, mode: tr('actualAccounting'), income: values.factIncome, expense: values.factExpenses, balance: values.factBalance });
    if (!section.contractMode && !section.factMode && section.staffingMode) summaryRows.push({ section: section.name, mode: tr('peopleAssigned'), income: 0, expense: 0, balance: 0 });
  });
  const reportTotals = cashObjectReportTotals(object);
  const incomingTotal = Math.round(summaryRows.reduce((sum, row) => sum + row.income, 0) * 100) / 100;
  const completedTotal = Math.round(summaryRows.reduce((sum, row) => sum + row.expense, 0) * 100) / 100;
  const balanceTotal = Math.round((incomingTotal - completedTotal) * 100) / 100;
  const balanceColumns = [
    { label: tr('reportIndicator'), key: 'indicator', width: '*' },
    { label: tr('amount'), key: 'value', width: 110, money: true }
  ];
  const contractBalanceRows = [
    { indicator: tr('totalContractsAmount'), value: reportTotals.contractAmount },
    { indicator: tr('contractProduction'), value: reportTotals.contractProduction },
    { indicator: tr('receivedFromCustomer'), value: reportTotals.contractReceived },
    { indicator: tr('totalOwnFundsInvested'), value: reportTotals.contractOwnInvested },
    { indicator: tr('contractProductionRemaining'), value: reportTotals.contractRemaining },
    { indicator: tr('paidProductionRemaining'), value: reportTotals.paidProductionRemaining }
  ];
  const factBalanceRows = [
    { indicator: tr('overallIncome'), value: reportTotals.factIncome },
    { indicator: tr('overallExpense'), value: reportTotals.factExpense },
    { indicator: tr('executionRemaining'), value: reportTotals.factRemaining },
    { indicator: tr('allOwnFundsInvested'), value: reportTotals.factOwnInvested }
  ];
  const tables = [
    { title: tr('overallContractBalance'), columns: balanceColumns, rows: contractBalanceRows },
    { title: tr('overallFactExecutionBalance'), columns: balanceColumns, rows: factBalanceRows },
    { title: tr('sectionsBreakdown'), columns: sectionColumns, rows: summaryRows, summaries: [cashReportSummary(tr('totalIncomingFunds'), incomingTotal), cashReportSummary(tr('totalCompletedWorks'), completedTotal), cashReportSummary(tr('totalBalance'), balanceTotal, true)] }
  ];
  return { title, objectName: object.name, sectionName: tr('allObjectSections'), tables, parties: null };
}

function cashObjectDetailedReport(object) {
  const overview = cashObjectOverviewReportPage(object, tr('overallDetailedReport'));
  const sectionPages = object.sections.map((section) => sectionFinanceReport(object, section));
  return { ...overview, pages: [overview, ...sectionPages] };
}

function allCashflowDetailedReport(objects) {
  const objectColumns = [
    { label: tr('objects'), key: 'object', width: '*' },
    { label: tr('incomingFunds'), key: 'income', width: 100, money: true },
    { label: tr('completedWorks'), key: 'expense', width: 100, money: true },
    { label: tr('sectionBalance'), key: 'balance', width: 100, money: true, signed: true, tone: true }
  ];
  const rows = objects.map((object) => {
    const reportTotals = cashObjectReportTotals(object);
    const income = Math.round((reportTotals.contractReceived + reportTotals.factIncome) * 100) / 100;
    const expense = Math.round((reportTotals.contractProduction + reportTotals.factExpense) * 100) / 100;
    return { object: object.name, income, expense, balance: Math.round((income - expense) * 100) / 100 };
  });
  const incomeTotal = Math.round(rows.reduce((sum, row) => sum + row.income, 0) * 100) / 100;
  const expenseTotal = Math.round(rows.reduce((sum, row) => sum + row.expense, 0) * 100) / 100;
  const balanceTotal = Math.round((incomeTotal - expenseTotal) * 100) / 100;
  const generalPage = {
    title: tr('generalReport'), objectName: tr('allCashObjects'), sectionName: tr('allObjectSections'),
    tables: [{ title: tr('generalReport'), columns: objectColumns, rows, summaries: [cashReportSummary(tr('totalIncomingFunds'), incomeTotal), cashReportSummary(tr('totalCompletedWorks'), expenseTotal), cashReportSummary(tr('totalBalance'), balanceTotal, true)] }],
    parties: null
  };
  const objectPages = objects.map((object) => cashObjectOverviewReportPage(object, `${tr('objectReport')}: ${object.name}`));
  return { title: tr('fullCashflowReport'), objectName: tr('allCashObjects'), sectionName: tr('allObjectSections'), tables: generalPage.tables, parties: null, pages: [generalPage, ...objectPages] };
}

function saveCashReportHistory(section, type, report, historyId = null, forceNew = false) {
  const snapshot = JSON.parse(JSON.stringify(report));
  const visibleTitle = snapshot.documentName || snapshot.title;
  const historyTitle = snapshot.documentNumber ? `${visibleTitle} · № ${snapshot.documentNumber.replace(/^№\s*/u, '')}` : visibleTitle;
  const changedAt = new Date().toISOString();
  if (historyId) {
    const existing = section.reportHistory.find((item) => item.id === historyId);
    if (existing) {
      existing.type = type;
      existing.title = historyTitle;
      existing.updatedAt = changedAt;
      existing.report = snapshot;
      saveCashflow();
      return existing;
    }
  }
  const latest = section.reportHistory[0];
  if (!forceNew && latest?.type === type && JSON.stringify(latest.report) === JSON.stringify(snapshot)) return latest;
  const item = { id: `report-${Date.now()}-${Math.random().toString(16).slice(2)}`, type, title: historyTitle, createdAt: changedAt, updatedAt: changedAt, report: snapshot };
  section.reportHistory.unshift(item);
  section.reportHistory = section.reportHistory.slice(0, forceNew ? 100 : 50);
  saveCashflow();
  return item;
}

function saveEditedCashReportRevision(section, type, report, previousHistoryId = null) {
  const previousExists = Boolean(previousHistoryId && section.reportHistory.some((item) => item.id === previousHistoryId));
  const savedReport = saveCashReportHistory(section, type, report, null, previousExists);
  return { savedReport, previousHistoryId: previousExists ? previousHistoryId : null };
}

function askEditedReportHistoryChoice(section, previousHistoryId, dialog, reportLabel, onComplete = null) {
  if (!previousHistoryId || !section.reportHistory.some((item) => item.id === previousHistoryId)) {
    renderCashflow();
    dialog.close();
    showToast(tr('documentSaved'));
    onComplete?.();
    return;
  }
  showDialog(`${tr('editedReportSaved')} · ${escapeHtml(reportLabel)}`, tr('deletePreviousReportQuestion'), `<div class="edited-document-choice"><button class="outline-button" type="button" data-keep-both-reports>${tr('keepBothReports')}</button><button class="primary-button is-danger" type="button" data-delete-previous-report>${tr('deletePreviousReport')}</button></div>`);
  const finish = (deletePrevious) => {
    if (deletePrevious) section.reportHistory = section.reportHistory.filter((item) => item.id !== previousHistoryId);
    saveCashflow();
    renderCashflow();
    dialog.close();
    showToast(tr(deletePrevious ? 'previousReportDeleted' : 'bothReportVersionsSaved'));
    onComplete?.();
  };
  $('[data-keep-both-reports]')?.addEventListener('click', () => finish(false));
  $('[data-delete-previous-report]')?.addEventListener('click', () => finish(true));
}

async function loadReportLogo() {
  if (reportLogoDataUrl) return reportLogoDataUrl;
  const response = await fetch(new URL('./assets/favicon-192.png', import.meta.url));
  const blob = await response.blob();
  reportLogoDataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(blob); });
  return reportLogoDataUrl;
}

function reportCellValue(column, row) {
  const value = row[column.key];
  if (column.money) return column.signed ? formatSignedMoney(Number(value) || 0) : formatMoney(Number(value) || 0);
  return String(value ?? '');
}

function reportPreviewTableMarkup(table) {
  const headers = table.columns.map((column) => `<th class="report-col-${escapeHtml(column.key)}">${escapeHtml(column.label)}</th>`).join('');
  const rows = table.rows.length ? table.rows.map((row) => `<tr>${table.columns.map((column) => {
    const tone = column.tone ? cashBalanceClass(Number(row[column.key]) || 0) : '';
    return `<td class="report-col-${escapeHtml(column.key)} ${column.number || column.money ? 'is-number ' : ''}${tone}">${escapeHtml(reportCellValue(column, row))}</td>`;
  }).join('')}</tr>`).join('') : `<tr><td class="report-preview-empty" colspan="${table.columns.length}">${tr('noEntries')}</td></tr>`;
  const total = Number.isFinite(table.total) ? `<div class="report-preview-total"><span>${tr('rowTotal')}</span><strong>${formatMoney(table.total)}</strong></div>` : '';
  const summaries = table.summaries?.length ? `<div class="report-preview-summaries">${table.summaries.map((summary) => `<div class="${escapeHtml(summary?.tone || '')}"><strong>${escapeHtml(cashReportSummaryText(summary))}</strong></div>`).join('')}</div>` : '';
  return `<section class="report-preview-section"><h3>${escapeHtml(table.title)}</h3><div class="report-preview-table-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>${total}${summaries}</section>`;
}

function cashPartyRoleLabel(role) {
  return tr({ prepared: 'preparedBy', confirmed: 'confirmedBy', performed: 'performedBy', accepted: 'acceptedBy' }[role] || role);
}

function cashReportPartyRoles(page) {
  return Array.isArray(page?.partyRoles) && page.partyRoles.length ? page.partyRoles : ['prepared', 'performed', 'accepted'];
}

function reportPreviewOrganizationsMarkup(organizations) {
  if (!organizations) return '';
  return `<section class="report-preview-organizations"><h3>${tr('organizationDocuments')}</h3><div>${CASH_ORGANIZATION_ROLES.map((role) => {
    const card = organizations[role] || {};
    const fields = card.type === 'individual'
      ? [[tr('fullName'), card.fullName], [tr('passportSeries'), card.passportSeries], [tr('passportNumber'), card.passportNumber]]
      : [[tr('companyName'), card.company], [tr('inn'), card.inn], [tr('kpp'), card.kpp]];
    return `<article><strong>${tr(role)} · ${tr(card.type === 'individual' ? 'individual' : 'legalEntity')}</strong>${fields.map(([label, value]) => `<span>${escapeHtml(label)}: ${escapeHtml(value || '—')}</span>`).join('')}${card.fileName ? `<small>${escapeHtml(card.fileName)}</small>` : ''}</article>`;
  }).join('')}</div></section>`;
}

function reportPreviewPartiesMarkup(parties, partyRoles) {
  if (!parties) return '';
  const rows = partyRoles.map((role) => [cashPartyRoleLabel(role), parties[role]]);
  return `<section class="report-preview-parties"><div>${rows.map(([label, party]) => `<article><strong>${escapeHtml(label)}</strong><span>${tr('fullName')}: ${escapeHtml(party?.name || '—')}</span><span>${tr('signature')}: ${escapeHtml(party?.signature || '—')}</span><span>${tr('seal')}: ${escapeHtml(party?.seal || '—')}<small>${tr('documentDate')}: ${escapeHtml(parties.date || localDateKey())}</small></span></article>`).join('')}</div></section>`;
}

function cashReportPages(report) {
  const pages = Array.isArray(report?.pages) && report.pages.length ? report.pages : [report];
  return pages.map((page) => ({
    documentKind: page.documentKind || report.documentKind || null,
    title: page.title || report.title,
    documentNumber: page.documentNumber || '',
    numberLabel: page.numberLabel || report.numberLabel,
    objectName: page.objectName || report.objectName,
    sectionName: page.sectionName || report.sectionName,
    objectLabel: page.objectLabel || report.objectLabel || tr('objects'),
    sectionLabel: page.sectionLabel || report.sectionLabel || tr('sectionName'),
    tables: Array.isArray(page.tables) ? page.tables : [],
    parties: page.parties || null,
    partyRoles: cashReportPartyRoles(page),
    organizations: page.organizations || null
  }));
}

function reportPreviewPageMarkup(report) {
  return `<article class="report-preview-sheet"><header><div><span>STRUCTOS REPORT</span><h2>${escapeHtml(report.title)}</h2>${report.documentNumber ? `<p>${escapeHtml(report.numberLabel || tr('documentNumber'))}: ${escapeHtml(report.documentNumber)}</p>` : ''}</div><img src="${reportPreviewLogoUrl}" alt="StructOS" /></header><div class="report-preview-meta"><p><strong>${escapeHtml(report.objectLabel)}:</strong> ${escapeHtml(report.objectName)}</p><p><strong>${escapeHtml(report.sectionLabel)}:</strong> ${escapeHtml(report.sectionName)}</p></div>${reportPreviewOrganizationsMarkup(report.organizations)}${report.tables.map(reportPreviewTableMarkup).join('')}${reportPreviewPartiesMarkup(report.parties, report.partyRoles)}<footer><img src="${reportPreviewLogoUrl}" alt="" /><div><strong>${STRUCTOS_DOCUMENT_BRAND.name}</strong><span>${STRUCTOS_DOCUMENT_BRAND.made}</span><span>${STRUCTOS_DOCUMENT_BRAND.site}</span><span>${STRUCTOS_DOCUMENT_BRAND.slogan}</span></div></footer></article>`;
}

function reportPreviewMarkup(report) {
  return `<div class="report-preview-pages">${cashReportPages(report).map(reportPreviewPageMarkup).join('')}</div>`;
}

function openCashReportPreview(report, getDeliveryReport = () => report, onSuccess = null) {
  const dialog = $('[data-report-preview-dialog]');
  if (!dialog) return;
  releaseCashOrganizationPreview();
  $('[data-report-preview-title]', dialog).textContent = tr('reportPreviewTitle');
  $('[data-report-preview-hint]', dialog).textContent = tr('reportPreviewHint');
  $('[data-report-preview-content]', dialog).innerHTML = reportPreviewMarkup(report);
  const actions = $('[data-report-preview-actions]', dialog);
  actions.innerHTML = cashDeliveryActionsMarkup();
  bindCashDeliveryActions(actions, getDeliveryReport, onSuccess);
  if (!dialog.open) dialog.showModal();
}

async function createPdfReport(report) {
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([import('pdfmake/build/pdfmake.js'), import('pdfmake/build/vfs_fonts.js')]);
  const logo = await loadReportLogo();
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs || pdfFonts?.vfs || pdfFonts;
  const content = [];
  const reportPages = cashReportPages(report);
  const repeatingPartyPage = reportPages.length === 1
    && ['statement', 'act'].includes(reportPages[0].documentKind)
    && reportPages[0].parties
    ? reportPages[0]
    : null;
  reportPages.forEach((page, pageIndex) => {
    content.push({ text: page.title, style: 'title', ...(pageIndex ? { pageBreak: 'before' } : {}) });
    if (page.documentNumber) content.push({ text: `${page.numberLabel || tr('documentNumber')}: ${page.documentNumber}`, style: 'meta' });
    content.push(
      { text: `${page.objectLabel}: ${page.objectName}`, style: 'meta' },
      { text: `${page.sectionLabel}: ${page.sectionName}`, style: 'meta', margin: [0, 0, 0, 14] }
    );
    if (page.organizations) {
      const organizationRows = [[tr('reportType'), tr('partyType'), tr('manualDetails'), tr('uploadedDocuments')], ...CASH_ORGANIZATION_ROLES.map((role) => {
        const card = page.organizations[role] || {};
        const details = card.type === 'individual'
          ? `${tr('fullName')}: ${card.fullName || '—'}; ${tr('passportSeries')}: ${card.passportSeries || '—'}; ${tr('passportNumber')}: ${card.passportNumber || '—'}`
          : `${tr('companyName')}: ${card.company || '—'}; ${tr('inn')}: ${card.inn || '—'}; ${tr('kpp')}: ${card.kpp || '—'}`;
        return [tr(role), tr(card.type === 'individual' ? 'individual' : 'legalEntity'), details, card.fileName || '—'];
      })];
      content.push({ text: tr('organizationDocuments'), style: 'sectionTitle', margin: [0, 4, 0, 6] }, { table: { headerRows: 1, widths: [65, 72, '*', 88], body: organizationRows }, layout: 'lightHorizontalLines', fontSize: 8, margin: [0, 0, 0, 8] });
    }
    page.tables.forEach((table) => {
      const body = [table.columns.map((column) => ({ text: column.label, style: 'tableHeader' })), ...(table.rows.length ? table.rows.map((row) => table.columns.map((column) => {
        const tone = column.tone ? cashBalanceClass(Number(row[column.key]) || 0) : '';
        return { text: reportCellValue(column, row), alignment: column.number || column.money ? 'right' : 'left', ...(tone === 'is-negative' ? { color: '#d9384b', bold: true } : tone === 'is-positive' ? { color: '#138a5b', bold: true } : {}) };
      })) : [[{ text: tr('noEntries'), colSpan: table.columns.length, alignment: 'center', color: '#64748b', margin: [0, 8] }, ...Array.from({ length: table.columns.length - 1 }, () => ({}))]])];
      content.push({ text: table.title, style: 'sectionTitle', margin: [0, 10, 0, 6] }, { table: { headerRows: 1, widths: table.columns.map((column) => column.width), body }, layout: { fillColor: (rowIndex) => rowIndex === 0 ? '#eaf3ff' : null, hLineColor: '#b8c9dc', vLineColor: '#b8c9dc' }, fontSize: 8 });
      if (Number.isFinite(table.total)) content.push({ text: `${tr('rowTotal')}: ${formatMoney(table.total)}`, bold: true, alignment: 'right', margin: [0, 7, 0, 4] });
      if (table.summaries?.length) content.push({ ul: table.summaries.map((summary) => ({ text: cashReportSummaryText(summary), bold: Boolean(summary?.tone), color: summary?.tone === 'is-negative' ? '#d9384b' : summary?.tone === 'is-positive' ? '#138a5b' : '#14213d' })), margin: [10, 7, 0, 5], fontSize: 9 });
    });
    if (page.parties && !repeatingPartyPage) {
      const partyRows = [['', tr('fullName'), tr('signature'), tr('seal')], ...page.partyRoles.map((role) => [cashPartyRoleLabel(role), page.parties[role]?.name || '', page.parties[role]?.signature || '', page.parties[role]?.seal || ''])];
      content.push({ text: tr('documentDate'), style: 'sectionTitle', margin: [0, 16, 0, 6] }, { text: page.parties.date || localDateKey(), margin: [0, 0, 0, 8] }, { table: { widths: [80, '*', '*', '*'], body: partyRows }, layout: 'lightHorizontalLines', fontSize: 9 });
    }
  });
  const footerBrand = (currentPage, pageCount) => ({
    columns: [
      { width: 175, text: '' },
      { width: '*', text: `${currentPage}/${pageCount}`, alignment: 'center', bold: true, color: '#43546a', fontSize: 8, margin: [0, 9, 0, 0] },
      { width: 175, columns: [{ image: logo, width: 25 }, { width: '*', stack: [{ text: STRUCTOS_DOCUMENT_BRAND.name, bold: true, fontSize: 10, color: '#075cd3', alignment: 'right' }, { text: STRUCTOS_DOCUMENT_BRAND.site, fontSize: 6, color: '#64748b', alignment: 'right' }, { text: STRUCTOS_DOCUMENT_BRAND.slogan, fontSize: 6, color: '#64748b', alignment: 'right' }] }], columnGap: 6 }
    ]
  });
  const footer = (currentPage, pageCount) => {
    const brand = footerBrand(currentPage, pageCount);
    if (!repeatingPartyPage) return { ...brand, margin: [34, 6, 34, 15] };
    const documentDate = repeatingPartyPage.parties.date || localDateKey();
    const partyRows = repeatingPartyPage.partyRoles.map((role) => {
      const party = repeatingPartyPage.parties[role] || {};
      return [
        { text: cashPartyRoleLabel(role), bold: true, color: '#075cd3' },
        { text: `${tr('fullName')}: ${party.name || ''}` },
        { text: `${tr('signature')}: ${party.signature || ''}` },
        { stack: [{ text: `${tr('seal')}: ${party.seal || ''}` }, { text: `${tr('documentDate')}: ${documentDate}`, color: '#64748b', fontSize: 6, margin: [0, 3, 0, 0] }] }
      ];
    });
    return {
      margin: [34, 0, 34, 10],
      stack: [
        { table: { widths: [68, '*', '*', '*'], body: partyRows }, layout: { hLineColor: '#c7d5e5', vLineColor: '#c7d5e5', paddingLeft: () => 4, paddingRight: () => 4, paddingTop: () => 3, paddingBottom: () => 3 }, fontSize: 7 },
        { ...brand, margin: [0, 5, 0, 0] }
      ]
    };
  };
  const definition = {
    pageSize: 'A4', pageMargins: [34, 38, 34, repeatingPartyPage ? 138 : 88], defaultStyle: { font: 'Roboto', fontSize: 9, color: '#14213d' },
    styles: { title: { fontSize: 18, bold: true, color: '#075cd3', margin: [0, 0, 0, 10] }, meta: { fontSize: 10, color: '#43546a', margin: [0, 0, 0, 3] }, sectionTitle: { fontSize: 12, bold: true, color: '#075cd3' }, tableHeader: { bold: true, color: '#0b2e59', fontSize: 8 } },
    content,
    footer
  };
  return new Promise((resolve) => pdfMake.createPdf(definition).getBlob(resolve));
}

async function createExcelReport(report) {
  const { default: ExcelJS } = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'StructOS'; workbook.created = new Date();
  const logo = await loadReportLogo();
  const imageId = workbook.addImage({ base64: logo, extension: 'png' });
  const usedSheetNames = new Set();
  const sheetNameFor = (page, pageIndex) => {
    const cleaned = `${pageIndex + 1} ${page.sectionName || page.objectName || page.title}`.replace(/[\\/*?:\[\]]+/g, ' ').replace(/\s+/g, ' ').trim() || `StructOS ${pageIndex + 1}`;
    let name = cleaned.slice(0, 31);
    let suffix = 2;
    while (usedSheetNames.has(name)) { const ending = ` ${suffix}`; name = `${cleaned.slice(0, 31 - ending.length)}${ending}`; suffix += 1; }
    usedSheetNames.add(name);
    return name;
  };
  cashReportPages(report).forEach((page, pageIndex) => {
    const worksheet = workbook.addWorksheet(sheetNameFor(page, pageIndex), { pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0, horizontalCentered: true, margins: { left: 0.3, right: 0.3, top: 0.5, bottom: 0.8, header: 0.2, footer: 0.2 } } });
    const maxColumns = Math.max(6, ...page.tables.map((table) => table.columns.length));
    worksheet.mergeCells(1, 1, 1, maxColumns); worksheet.getCell(1, 1).value = page.title; worksheet.getCell(1, 1).font = { size: 17, bold: true, color: { argb: 'FF075CD3' } };
    let metaRow = 2;
    if (page.documentNumber) { worksheet.mergeCells(metaRow, 1, metaRow, maxColumns); worksheet.getCell(metaRow, 1).value = `${page.numberLabel || tr('documentNumber')}: ${page.documentNumber}`; metaRow += 1; }
    worksheet.mergeCells(metaRow, 1, metaRow, maxColumns); worksheet.getCell(metaRow, 1).value = `${page.objectLabel}: ${page.objectName}`; metaRow += 1;
    worksheet.mergeCells(metaRow, 1, metaRow, maxColumns); worksheet.getCell(metaRow, 1).value = `${page.sectionLabel}: ${page.sectionName}`;
    let cursor = metaRow + 2;
    if (page.organizations) {
      worksheet.mergeCells(cursor, 1, cursor, maxColumns); worksheet.getCell(cursor, 1).value = tr('organizationDocuments'); worksheet.getCell(cursor, 1).font = { bold: true, size: 12, color: { argb: 'FF075CD3' } }; cursor += 1;
      CASH_ORGANIZATION_ROLES.forEach((role) => {
        const card = page.organizations[role] || {};
        const details = card.type === 'individual'
          ? `${tr('fullName')}: ${card.fullName || '—'}; ${tr('passportSeries')}: ${card.passportSeries || '—'}; ${tr('passportNumber')}: ${card.passportNumber || '—'}`
          : `${tr('companyName')}: ${card.company || '—'}; ${tr('inn')}: ${card.inn || '—'}; ${tr('kpp')}: ${card.kpp || '—'}`;
        worksheet.getCell(cursor, 1).value = `${tr(role)} · ${tr(card.type === 'individual' ? 'individual' : 'legalEntity')}`; worksheet.getCell(cursor, 1).font = { bold: true };
        worksheet.getCell(cursor, 2).value = details;
        worksheet.getCell(cursor, Math.min(5, maxColumns)).value = card.fileName || '—';
        cursor += 1;
      });
      cursor += 1;
    }
    page.tables.forEach((table) => {
      worksheet.mergeCells(cursor, 1, cursor, maxColumns); worksheet.getCell(cursor, 1).value = table.title; worksheet.getCell(cursor, 1).font = { bold: true, size: 12, color: { argb: 'FF075CD3' } }; cursor += 1;
      const header = worksheet.getRow(cursor); table.columns.forEach((column, index) => { const cell = header.getCell(index + 1); cell.value = column.label; cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF075CD3' } }; cell.alignment = { vertical: 'middle', wrapText: true }; cell.border = { top: { style: 'thin', color: { argb: 'FF9EB6D0' } }, left: { style: 'thin', color: { argb: 'FF9EB6D0' } }, bottom: { style: 'thin', color: { argb: 'FF9EB6D0' } }, right: { style: 'thin', color: { argb: 'FF9EB6D0' } } }; }); header.height = 28; cursor += 1;
      const rows = table.rows.length ? table.rows : [{ [table.columns[0].key]: tr('noEntries') }];
      rows.forEach((row) => { const excelRow = worksheet.getRow(cursor); table.columns.forEach((column, index) => { const cell = excelRow.getCell(index + 1); cell.value = column.number || column.money ? (Number(row[column.key]) || 0) : String(row[column.key] ?? ''); if (column.money) cell.numFmt = `${column.signed ? '+' : ''}#,##0.00 "₽";[Red]-#,##0.00 "₽";0.00 "₽"`; if (column.tone) { const tone = cashBalanceClass(Number(row[column.key]) || 0); if (tone !== 'is-zero') cell.font = { bold: true, color: { argb: tone === 'is-negative' ? 'FFD9384B' : 'FF138A5B' } }; } cell.alignment = { vertical: 'top', wrapText: true, horizontal: column.number || column.money ? 'right' : 'left' }; cell.border = { top: { style: 'thin', color: { argb: 'FFD4DFEB' } }, left: { style: 'thin', color: { argb: 'FFD4DFEB' } }, bottom: { style: 'thin', color: { argb: 'FFD4DFEB' } }, right: { style: 'thin', color: { argb: 'FFD4DFEB' } } }; }); cursor += 1; });
      if (Number.isFinite(table.total)) { worksheet.mergeCells(cursor, 1, cursor, maxColumns - 1); worksheet.getCell(cursor, 1).value = tr('rowTotal'); worksheet.getCell(cursor, 1).font = { bold: true }; worksheet.getCell(cursor, maxColumns).value = table.total; worksheet.getCell(cursor, maxColumns).numFmt = '#,##0.00 "₽"'; worksheet.getCell(cursor, maxColumns).font = { bold: true }; cursor += 1; }
      (table.summaries || []).forEach((summary) => {
        worksheet.mergeCells(cursor, 1, cursor, maxColumns);
        const cell = worksheet.getCell(cursor, 1);
        cell.value = cashReportSummaryText(summary);
        cell.font = { bold: true, ...(summary?.tone === 'is-negative' ? { color: { argb: 'FFD9384B' } } : summary?.tone === 'is-positive' ? { color: { argb: 'FF138A5B' } } : {}) };
        cursor += 1;
      });
      cursor += 2;
    });
    if (page.parties) {
      const documentDate = page.parties.date || localDateKey();
      page.partyRoles.forEach((role) => { const party = page.parties[role] || {}; worksheet.getCell(cursor, 1).value = cashPartyRoleLabel(role); worksheet.getCell(cursor, 1).font = { bold: true }; worksheet.getCell(cursor, 2).value = `${tr('fullName')}: ${party.name || ''}`; worksheet.getCell(cursor, 4).value = `${tr('signature')}: ${party.signature || ''}`; worksheet.getCell(cursor, 6).value = `${tr('seal')}: ${party.seal || ''}\n${tr('documentDate')}: ${documentDate}`; worksheet.getCell(cursor, 6).alignment = { wrapText: true, vertical: 'top' }; cursor += 1; }); cursor += 2;
    }
    worksheet.addImage(imageId, { tl: { col: maxColumns - 3, row: cursor - 1 }, ext: { width: 46, height: 46 } });
    worksheet.mergeCells(cursor, maxColumns - 2, cursor + 2, maxColumns); const brandCell = worksheet.getCell(cursor, maxColumns - 2); brandCell.value = `${STRUCTOS_DOCUMENT_BRAND.name}\n${STRUCTOS_DOCUMENT_BRAND.made}\n${STRUCTOS_DOCUMENT_BRAND.site}\n${STRUCTOS_DOCUMENT_BRAND.slogan}`; brandCell.font = { bold: true, color: { argb: 'FF075CD3' }, size: 10 }; brandCell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true }; worksheet.getRow(cursor).height = 32; worksheet.getRow(cursor + 1).height = 20; worksheet.getRow(cursor + 2).height = 20;
    worksheet.headerFooter.oddFooter = `&C&P/&N&R${STRUCTOS_DOCUMENT_BRAND.name}`;
    worksheet.headerFooter.evenFooter = `&C&P/&N&R${STRUCTOS_DOCUMENT_BRAND.name}`;
    const widths = [12, 36, 18, 22, 18, 18]; for (let index = 1; index <= maxColumns; index += 1) worksheet.getColumn(index).width = widths[index - 1] || 18;
    worksheet.views = [{ state: 'frozen', ySplit: metaRow + 2 }];
  });
  const buffer = await workbook.xlsx.writeBuffer();
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}

function reportFileName(report, extension) {
  const safe = `${report.title}${report.documentNumber ? `_№_${report.documentNumber.replace(/^№\s*/u, '')}` : ''}_${report.objectName}_${report.sectionName}`.replace(/[\\/:*?"<>|]+/g, '_').replace(/\s+/g, '_').slice(0, 110);
  return `${safe || 'StructOS'}.${extension}`;
}

function downloadReportBlob(blob, filename) {
  const link = document.createElement('a'); const url = URL.createObjectURL(blob); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500);
}

async function deliverCashReport(report, format, share = false) {
  const isPdf = format === 'pdf';
  const blob = isPdf ? await createPdfReport(report) : await createExcelReport(report);
  const file = new File([blob], reportFileName(report, isPdf ? 'pdf' : 'xlsx'), { type: blob.type });
  if (share && navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
    await navigator.share({ title: report.title, text: `${report.objectName} · ${report.sectionName}`, files: [file] });
    return;
  }
  downloadReportBlob(blob, file.name);
  showToast(tr(share ? 'shareUnavailable' : 'reportReady'));
}

function cashDeliveryActionsMarkup() {
  return `<div class="cash-report-actions"><button class="primary-button" type="button" data-report-format="pdf">${tr('downloadPdf')}</button><button class="primary-button" type="button" data-report-format="xlsx">${tr('downloadExcel')}</button><button class="outline-button" type="button" data-report-share="pdf">${tr('sharePdf')}</button><button class="outline-button" type="button" data-report-share="xlsx">${tr('shareExcel')}</button></div>`;
}

function cashReportActionsMarkup() {
  return `<div class="cash-report-preview-start"><button class="outline-button" type="button" data-report-preview><span aria-hidden="true">◉</span>${tr('viewReport')}</button><small>${tr('reportPreviewHint')}</small></div>${cashDeliveryActionsMarkup()}`;
}

function bindCashDeliveryActions(scope, getReport, onSuccess = null) {
  $$('[data-report-format]', scope).forEach((button) => button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      const report = getReport();
      await deliverCashReport(report, button.dataset.reportFormat, false);
      onSuccess?.(report);
    } catch (error) { if (error?.code !== 'DOCUMENT_REQUIRED') { console.error(error); showToast(tr('comingSoon')); } }
    finally { button.disabled = false; }
  }));
  $$('[data-report-share]', scope).forEach((button) => button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      const report = getReport();
      await deliverCashReport(report, button.dataset.reportShare, true);
      onSuccess?.(report);
    } catch (error) { if (error?.name !== 'AbortError' && error?.code !== 'DOCUMENT_REQUIRED') { console.error(error); showToast(tr('comingSoon')); } }
    finally { button.disabled = false; }
  }));
}

function bindCashReportActions(scope, getReport, onSuccess = null, getPreviewReport = getReport) {
  $('[data-report-preview]', scope)?.addEventListener('click', () => {
    try { openCashReportPreview(getPreviewReport(), getReport, onSuccess); }
    catch (error) { if (error?.code !== 'DOCUMENT_REQUIRED') { console.error(error); showToast(tr('comingSoon')); } }
  });
  bindCashDeliveryActions(scope, getReport, onSuccess);
}

function openCashDocumentDialog(objectId, sectionId, kind, options = {}) {
  const { object, section } = findCashSection(objectId, sectionId);
  if (!object || !section) return;
  const priced = kind === 'act';
  const defaultTitle = tr(priced ? 'workAct' : 'workStatement');
  const sourceReport = options?.sourceReport || null;
  const generatedDocument = options?.generatedDocument || null;
  const historyId = options?.historyId || null;
  const draft = sourceReport
    ? cashDocumentDataFromReport(sourceReport, kind)
    : normalizeCashDocument(generatedDocument, priced, defaultTitle);
  if (!sourceReport && !generatedDocument) {
    draft.title = '';
    draft.number = '';
    draft.objectName = '';
    draft.sectionName = '';
    draft.parties = cashDocumentParties(null);
    draft.updatedAt = null;
  }
  draft.organizations = normalizeCashDocumentOrganizations((sourceReport || generatedDocument)?.organizations || cashOrganizationReportData(object));
  const headCells = `<th>${tr('recordNumber')}</th><th>${tr('workOrMaterialName')}</th><th>${tr('unit')}</th><th>${tr('quantity')}</th>${priced ? `<th>${tr('price')}</th><th>${tr('rowTotal')}</th>` : `<th>${tr('justification')}</th>`}<th></th>`;
  const columnLayout = `<colgroup><col class="work-col-number" /><col class="work-col-name" /><col class="work-col-unit" /><col class="work-col-quantity" />${priced ? '<col class="work-col-price" /><col class="work-col-total" />' : '<col class="work-col-basis" />'}<col class="work-col-actions" /></colgroup>`;
  const responsibleMarkup = priced
    ? `${cashPartyMarkup('performed', tr('performedBy'), draft.parties.performed)}${cashPartyMarkup('accepted', tr('acceptedBy'), draft.parties.accepted)}`
    : `${cashPartyMarkup('prepared', tr('preparedBy'), draft.parties.prepared)}${cashPartyMarkup('confirmed', tr('confirmedBy'), draft.parties.confirmed)}`;
  const sourceListId = `cash-source-options-${createObjectId().replace(/[^a-z0-9-]+/gi, '')}`;
  let sourceCatalog = cashSectionSourceCatalog(section);
  const sourceCatalogNeedsHydration = CASH_SOURCE_DOCUMENT_KINDS.some((sourceKind) => {
    const version = cashAttachmentCurrent(section, sourceKind);
    return version && !version.linkedFromProject && !version.sourceCatalogScanned;
  });
  showDialog(defaultTitle, `${object.name} · ${section.name}`, `<div class="cash-document-editor">${cashDocumentOrganizationsEditorMarkup(draft.organizations)}<div class="cash-document-meta"><label><span>${tr(priced ? 'actName' : 'statementName')}</span><input type="text" maxlength="160" data-document-title value="${escapeHtml(draft.title)}" /></label><label><span>${tr(priced ? 'actNumber' : 'statementNumber')}</span><input type="text" maxlength="80" data-document-number value="${escapeHtml(draft.number)}" placeholder="1" /></label><label><span>${tr('documentObject')}</span><input type="text" maxlength="160" data-document-object value="${escapeHtml(draft.objectName)}" placeholder="${escapeHtml(tr('objectPlaceholderDocument'))}" /></label><label><span>${tr('documentSection')}</span><input type="text" maxlength="160" data-document-section value="${escapeHtml(draft.sectionName)}" placeholder="${escapeHtml(tr('sectionPlaceholderDocument'))}" /></label></div><section data-cash-source-catalog></section><datalist id="${escapeHtml(sourceListId)}" data-cash-source-options></datalist><div class="cash-work-table-wrap"><table class="cash-work-table ${priced ? 'is-act' : 'is-statement'}">${columnLayout}<thead><tr>${headCells}</tr></thead><tbody data-cash-work-rows></tbody>${priced ? `<tfoot><tr><td colspan="5">${tr('rowTotal')}</td><td data-document-grand-total>0 ₽</td><td></td></tr></tfoot>` : ''}</table></div><button class="outline-button cash-add-row" type="button" data-add-work-row>＋ ${tr('addRow')}</button><div class="cash-parties">${responsibleMarkup}<label class="cash-document-date"><span>${tr('documentDate')}</span><input type="date" data-document-date value="${draft.parties.date}" /></label></div><div class="cash-document-save"><button class="primary-button" type="button" data-save-cash-document>${tr('saveInSection')}</button><button class="${priced ? 'outline-button' : 'primary-button'}" type="button" data-generate-related-document>${tr(priced ? 'generateStatement' : 'generateAct')}</button></div>${cashReportActionsMarkup()}</div>`);
  const dialog = $('[data-dialog]'); dialog.classList.add('cash-document-dialog');
  const scope = $('[data-dialog-content]');
  renderCashDocumentSourceCatalog(scope, sourceCatalog, section, sourceCatalogNeedsHydration);
  bindCashDocumentRows(scope, draft, priced, sourceCatalog, sourceListId);
  bindCashDocumentOrganizations(scope, draft);
  if (sourceCatalogNeedsHydration) hydrateCashSectionSourceCatalog(section).then((catalog) => {
    if (!scope.isConnected) return;
    sourceCatalog = catalog;
    renderCashDocumentSourceCatalog(scope, sourceCatalog, section, false);
    bindCashDocumentRows(scope, draft, priced, sourceCatalog, sourceListId);
  });
  const requiredFields = [
    { selector: '[data-document-title]', key: 'title' },
    { selector: '[data-document-object]', key: 'objectName' },
    { selector: '[data-document-section]', key: 'sectionName' }
  ];
  const validateDocument = () => {
    const missing = requiredFields.find(({ selector, key }) => !String(draft[key] || '').trim() && $(selector, scope));
    requiredFields.forEach(({ selector, key }) => $(selector, scope)?.setAttribute('aria-invalid', String(!String(draft[key] || '').trim())));
    if (!missing) return;
    showToast(tr('documentRequiredFields'));
    $(missing.selector, scope)?.focus();
    const error = new Error(tr('documentRequiredFields'));
    error.code = 'DOCUMENT_REQUIRED';
    throw error;
  };
  $('[data-document-title]', scope)?.addEventListener('input', (event) => { draft.title = event.currentTarget.value.slice(0, 160); event.currentTarget.removeAttribute('aria-invalid'); });
  $('[data-document-number]', scope)?.addEventListener('input', (event) => { draft.number = event.currentTarget.value.slice(0, 80); });
  $('[data-document-object]', scope)?.addEventListener('input', (event) => { draft.objectName = event.currentTarget.value.slice(0, 160); event.currentTarget.removeAttribute('aria-invalid'); });
  $('[data-document-section]', scope)?.addEventListener('input', (event) => { draft.sectionName = event.currentTarget.value.slice(0, 160); event.currentTarget.removeAttribute('aria-invalid'); });
  $('[data-add-work-row]', scope)?.addEventListener('click', () => { draft.rows.push(...normalizeCashWorkRows([], priced)); bindCashDocumentRows(scope, draft, priced, sourceCatalog, sourceListId); });
  $$('[data-party-field]', scope).forEach((input) => input.addEventListener('input', () => { draft.parties[input.dataset.party][input.dataset.partyField] = input.value.slice(0, 160); }));
  $('[data-document-date]', scope)?.addEventListener('change', (event) => { draft.parties.date = event.currentTarget.value || localDateKey(); });
  const previewDocument = () => {
    validateDocument();
    return cashDocumentReport(object, section, kind, { ...draft, title: draft.title.trim(), number: draft.number.trim(), objectName: draft.objectName.trim(), sectionName: draft.sectionName.trim() });
  };
  const persistDocument = () => {
    validateDocument();
    draft.title = draft.title.trim();
    draft.number = draft.number.trim();
    draft.objectName = draft.objectName.trim();
    draft.sectionName = draft.sectionName.trim();
    draft.updatedAt = new Date().toISOString();
    section[priced ? 'act' : 'statement'] = normalizeCashDocument(draft, priced, defaultTitle);
    saveCashflow();
    return cashDocumentReport(object, section, kind, draft);
  };
  const clearCurrentForm = () => {
    section[priced ? 'act' : 'statement'] = normalizeCashDocument(null, priced, defaultTitle);
    saveCashflow();
  };
  $('[data-save-cash-document]', scope)?.addEventListener('click', () => {
    try {
      const report = persistDocument();
      const revision = saveEditedCashReportRevision(section, kind, report, historyId);
      clearCurrentForm();
      if (revision.previousHistoryId) askEditedReportHistoryChoice(section, revision.previousHistoryId, dialog, defaultTitle);
      else { renderCashflow(); dialog.close(); showToast(tr('documentSaved')); }
    } catch (error) { if (error?.code !== 'DOCUMENT_REQUIRED') { console.error(error); showToast(tr('comingSoon')); } }
  });
  $('[data-generate-related-document]', scope)?.addEventListener('click', () => {
    try {
      const report = persistDocument();
      const revision = saveEditedCashReportRevision(section, kind, report, historyId);
      const relatedKind = priced ? 'statement' : 'act';
      const relatedRows = draft.rows.map((row) => ({ name: row.name, unit: row.unit, quantity: row.quantity, ...(priced ? { basis: '' } : { price: 0 }) }));
      const relatedDocument = { title: draft.title, number: draft.number, objectName: draft.objectName, sectionName: draft.sectionName, rows: relatedRows, organizations: draft.organizations, parties: cashDocumentParties(null) };
      clearCurrentForm();
      const openRelatedDocument = () => openCashDocumentDialog(objectId, sectionId, relatedKind, { generatedDocument: relatedDocument });
      if (revision.previousHistoryId) askEditedReportHistoryChoice(section, revision.previousHistoryId, dialog, defaultTitle, openRelatedDocument);
      else { renderCashflow(); dialog.close(); showToast(tr('documentSaved')); openRelatedDocument(); }
    } catch (error) { if (error?.code !== 'DOCUMENT_REQUIRED') { console.error(error); showToast(tr('comingSoon')); } }
  });
  bindCashReportActions(scope, persistDocument, (report) => {
    const revision = saveEditedCashReportRevision(section, kind, report, historyId);
    if (revision.previousHistoryId) {
      const previewDialog = $('[data-report-preview-dialog]');
      if (previewDialog?.open) previewDialog.close();
      askEditedReportHistoryChoice(section, revision.previousHistoryId, dialog, defaultTitle);
    } else renderCashflow();
  }, previewDocument);
}

function openSectionExportDialog(objectId, sectionId) {
  const { object, section } = findCashSection(objectId, sectionId);
  if (!object || !section) return;
  showDialog(tr('sectionFinanceReport'), `${object.name} · ${section.name}`, cashReportActionsMarkup());
  const dialog = $('[data-dialog]'); dialog.classList.add('cash-export-dialog');
  bindCashReportActions($('[data-dialog-content]'), () => sectionFinanceReport(object, section), (report) => {
    saveCashReportHistory(section, 'finance', report);
    renderCashflow();
  });
}

function openCashObjectExportDialog(objectId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  if (!object) return;
  showDialog(tr('overallDetailedReport'), object.name, cashReportActionsMarkup());
  const dialog = $('[data-dialog]'); dialog.classList.add('cash-export-dialog');
  bindCashReportActions($('[data-dialog-content]'), () => cashObjectDetailedReport(object));
}

function openAllCashflowExportDialog() {
  if (!cashflowObjects.length) return;
  showDialog(tr('fullCashflowReport'), tr('allCashObjects'), cashReportActionsMarkup());
  const dialog = $('[data-dialog]'); dialog.classList.add('cash-export-dialog');
  bindCashReportActions($('[data-dialog-content]'), () => allCashflowDetailedReport(cashflowObjects));
}

const drawingDialog = $('[data-drawing-dialog]');
const drawingCanvas = $('[data-drawing-canvas]');
const drawingContext = drawingCanvas?.getContext('2d', { willReadFrequently: false });
let drawingInitialized = false;
let drawingActive = false;
let drawingPointerId = null;
let drawingLastPoint = null;
let drawingUndoStack = [];
let drawingMinimized = false;
let currentDrawingId = null;
let drawingDirty = false;
let drawingDbPromise;

function clearDrawingCanvas(trackUndo = true) {
  if (!drawingContext) return;
  if (trackUndo) pushDrawingUndo();
  drawingContext.save();
  drawingContext.setTransform(1, 0, 0, 1, 0, 0);
  drawingContext.fillStyle = '#ffffff';
  drawingContext.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
  drawingContext.restore();
}

function initializeDrawingCanvas() {
  if (drawingInitialized || !drawingContext) return;
  clearDrawingCanvas(false);
  drawingContext.lineCap = 'round';
  drawingContext.lineJoin = 'round';
  $('[data-drawing-title]').value = tr('newSketch');
  drawingInitialized = true;
}

function pushDrawingUndo() {
  if (!drawingCanvas || !drawingInitialized) return;
  try {
    drawingUndoStack.push(drawingCanvas.toDataURL('image/png'));
    if (drawingUndoStack.length > 12) drawingUndoStack.shift();
  } catch {}
}

function restoreDrawingImage(source, afterLoad) {
  if (!drawingContext || !source) return;
  const image = new Image();
  image.onload = () => {
    clearDrawingCanvas(false);
    drawingContext.drawImage(image, 0, 0, drawingCanvas.width, drawingCanvas.height);
    afterLoad?.();
  };
  image.src = source;
}

function undoDrawing() {
  const snapshot = drawingUndoStack.pop();
  if (snapshot) restoreDrawingImage(snapshot, () => { drawingDirty = true; });
}

function drawingPoint(event) {
  const rect = drawingCanvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * drawingCanvas.width / rect.width,
    y: (event.clientY - rect.top) * drawingCanvas.height / rect.height,
    pressure: event.pointerType === 'pen' && event.pressure > 0 ? event.pressure : .6
  };
}

function drawPointerSegment(event) {
  const point = drawingPoint(event);
  if (!drawingLastPoint) drawingLastPoint = point;
  const baseWidth = Number($('[data-drawing-width]').value) || 5;
  const pressureScale = event.pointerType === 'pen' ? .45 + point.pressure * 1.1 : 1;
  drawingContext.beginPath();
  drawingContext.moveTo(drawingLastPoint.x, drawingLastPoint.y);
  drawingContext.lineTo(point.x, point.y);
  drawingContext.strokeStyle = $('[data-drawing-color]').value || '#0868e8';
  drawingContext.lineWidth = baseWidth * pressureScale;
  drawingContext.stroke();
  drawingLastPoint = point;
}

function openDrawingStudio() {
  initializeDrawingCanvas();
  drawingMinimized = false;
  $('[data-drawing-restore]').hidden = true;
  $('[data-drawing-gallery]').hidden = true;
  if (!drawingDialog.open) drawingDialog.showModal();
}

function closeDrawingStudio() {
  drawingMinimized = false;
  $('[data-drawing-restore]').hidden = true;
  if (drawingDialog.open) drawingDialog.close();
}

function minimizeDrawingStudio() {
  drawingMinimized = true;
  if (drawingDialog.open) drawingDialog.close();
  $('[data-drawing-restore]').hidden = false;
}

function drawingDatabase() {
  if (drawingDbPromise) return drawingDbPromise;
  drawingDbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) { reject(new Error('IndexedDB unavailable')); return; }
    const request = indexedDB.open('structos-drawings-db', 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains('drawings')) request.result.createObjectStore('drawings', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return drawingDbPromise;
}

async function saveDrawingRecord(options = {}) {
  initializeDrawingCanvas();
  const requestedTitle = String(options.title ?? $('[data-drawing-title]').value).trim();
  if (options.requireTitle && !requestedTitle) {
    showToast(tr('drawingNameRequired'));
    return null;
  }
  const id = currentDrawingId || `drawing-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const record = {
    id,
    title: (requestedTitle || tr('newSketch')).slice(0, 80),
    dataUrl: drawingCanvas.toDataURL('image/png'),
    updatedAt: new Date().toISOString()
  };
  try {
    const database = await drawingDatabase();
    await new Promise((resolve, reject) => {
      const transaction = database.transaction('drawings', 'readwrite');
      transaction.objectStore('drawings').put(record);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
    });
    currentDrawingId = id;
    drawingDirty = false;
    $('[data-drawing-title]').value = record.title;
    showToast(tr('drawingSaved'));
    return record;
  } catch (error) {
    console.warn('StructOS drawing could not be saved:', error);
    showToast(tr('comingSoon'));
    return null;
  }
}

async function getSavedDrawings() {
  try {
    const database = await drawingDatabase();
    const records = await new Promise((resolve, reject) => {
      const request = database.transaction('drawings', 'readonly').objectStore('drawings').getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
    return records.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  } catch { return []; }
}

async function renderDrawingGallery() {
  const gallery = $('[data-drawing-gallery]');
  const list = $('[data-drawing-saved-list]');
  gallery.hidden = false;
  const records = await getSavedDrawings();
  list.innerHTML = records.length ? records.map((record) => `<article class="saved-drawing-card"><img src="${record.dataUrl}" alt="" /><strong>${escapeHtml(record.title)}</strong><small>${cashDate(record.updatedAt)}</small><button type="button" data-load-drawing="${escapeHtml(record.id)}">${tr('loadDrawing')}</button></article>`).join('') : `<div class="todo-empty">${tr('noSavedDrawings')}</div>`;
  $$('[data-load-drawing]', list).forEach((button) => button.addEventListener('click', () => {
    const record = records.find((item) => item.id === button.dataset.loadDrawing);
    if (!record) return;
    pushDrawingUndo();
    restoreDrawingImage(record.dataUrl, () => {
      currentDrawingId = record.id;
      $('[data-drawing-title]').value = record.title;
      drawingDirty = false;
      gallery.hidden = true;
    });
  }));
}

function loadDrawingBackground(file) {
  if (!file || !file.type.startsWith('image/')) { showToast(tr('unsupportedFormat')); return; }
  initializeDrawingCanvas();
  pushDrawingUndo();
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    clearDrawingCanvas(false);
    const scale = Math.min(drawingCanvas.width / image.naturalWidth, drawingCanvas.height / image.naturalHeight);
    const width = image.naturalWidth * scale;
    const height = image.naturalHeight * scale;
    drawingContext.drawImage(image, (drawingCanvas.width - width) / 2, (drawingCanvas.height - height) / 2, width, height);
    URL.revokeObjectURL(objectUrl);
    currentDrawingId = null;
    drawingDirty = true;
    $('[data-drawing-title]').value = file.name.replace(/\.[^.]+$/, '').slice(0, 80) || tr('newSketch');
    showToast(tr('backgroundLoaded'));
  };
  image.onerror = () => { URL.revokeObjectURL(objectUrl); showToast(tr('unsupportedFormat')); };
  image.src = objectUrl;
}

function resetDrawingCanvas() {
  initializeDrawingCanvas();
  clearDrawingCanvas(false);
  drawingUndoStack = [];
  currentDrawingId = null;
  drawingDirty = false;
  $('[data-drawing-title]').value = tr('newSketch');
  $('[data-drawing-gallery]').hidden = true;
}

function startFreshDrawing() {
  resetDrawingCanvas();
  $('[data-dialog]')?.close();
  if (!drawingDialog.open) drawingDialog.showModal();
  showToast(tr('newDrawingReady'));
}

function askDrawingNameBeforeReset() {
  const suggestedTitle = ($('[data-drawing-title]').value.trim() || '').slice(0, 80);
  showDialog(tr('nameDrawing'), tr('drawingUnsavedCopy'), `<div class="object-form"><label><span class="sr-only">${tr('nameDrawing')}</span><input data-new-drawing-name maxlength="80" value="${escapeHtml(suggestedTitle)}" placeholder="${tr('nameDrawing')}" /></label><button class="primary-button" type="button" data-save-before-new>${tr('saveCurrentDrawing')}</button></div>`);
  const input = $('[data-new-drawing-name]', $('[data-dialog-content]'));
  const saveAndReset = async () => {
    const title = input?.value.trim() || '';
    if (!title) { showToast(tr('drawingNameRequired')); input?.focus(); return; }
    const button = $('[data-save-before-new]', $('[data-dialog-content]'));
    if (button) button.disabled = true;
    const record = await saveDrawingRecord({ title, requireTitle: true });
    if (record) startFreshDrawing();
    else if (button) button.disabled = false;
  };
  $('[data-save-before-new]', $('[data-dialog-content]'))?.addEventListener('click', saveAndReset);
  input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); saveAndReset(); } });
  setTimeout(() => { input?.focus(); input?.select(); }, 40);
}

function newDrawingFlow() {
  initializeDrawingCanvas();
  if (!drawingDirty && !currentDrawingId) { startFreshDrawing(); return; }
  showDialog(tr('drawingUnsavedTitle'), tr('drawingUnsavedCopy'), `<div class="result-actions drawing-new-actions"><button class="primary-button" type="button" data-drawing-save-current>${tr('saveCurrentDrawing')}</button><button class="outline-button" type="button" data-drawing-discard-current>${tr('discardCurrentDrawing')}</button></div>`);
  $('[data-drawing-save-current]', $('[data-dialog-content]'))?.addEventListener('click', askDrawingNameBeforeReset);
  $('[data-drawing-discard-current]', $('[data-dialog-content]'))?.addEventListener('click', startFreshDrawing);
}

function drawingCanvasBlob(type, quality) {
  return new Promise((resolve, reject) => drawingCanvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Canvas export failed')), type, quality));
}

function createPdfBlob(jpegBytes, width = drawingCanvas.width, height = drawingCanvas.height) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const append = (value) => {
    const bytes = typeof value === 'string' ? encoder.encode(value) : value;
    chunks.push(bytes);
    length += bytes.length;
  };
  append('%PDF-1.4\n%StructOS\n');
  offsets[1] = length; append('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  offsets[2] = length; append('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  offsets[3] = length; append(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);
  offsets[4] = length; append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`); append(jpegBytes); append('\nendstream\nendobj\n');
  const content = `q\n${width} 0 0 ${height} 0 0 cm\n/Im0 Do\nQ\n`;
  offsets[5] = length; append(`5 0 obj\n<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream\nendobj\n`);
  const xrefOffset = length;
  append(`xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: 'application/pdf' });
}

async function brandedDrawingJpeg() {
  const footerHeight = 112;
  const canvas = document.createElement('canvas');
  canvas.width = drawingCanvas.width; canvas.height = drawingCanvas.height + footerHeight;
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(drawingCanvas, 0, 0);
  context.strokeStyle = '#b8c9dc'; context.beginPath(); context.moveTo(22, drawingCanvas.height + 12); context.lineTo(canvas.width - 22, drawingCanvas.height + 12); context.stroke();
  const logoSource = await loadReportLogo();
  const logo = await new Promise((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = logoSource; });
  context.drawImage(logo, 24, drawingCanvas.height + 27, 58, 58);
  context.fillStyle = '#075cd3'; context.font = '700 17px Inter, Arial, sans-serif'; context.fillText(STRUCTOS_DOCUMENT_BRAND.made, 94, drawingCanvas.height + 43);
  context.fillStyle = '#64748b'; context.font = '12px Inter, Arial, sans-serif'; context.fillText(STRUCTOS_DOCUMENT_BRAND.site, 94, drawingCanvas.height + 63);
  context.fillText(STRUCTOS_DOCUMENT_BRAND.slogan, 94, drawingCanvas.height + 83);
  const blob = await new Promise((resolve, reject) => canvas.toBlob((value) => value ? resolve(value) : reject(new Error('Canvas export failed')), 'image/jpeg', .92));
  return { bytes: new Uint8Array(await blob.arrayBuffer()), width: canvas.width, height: canvas.height };
}

async function createDrawingFile(format) {
  initializeDrawingCanvas();
  const safeTitle = ($('[data-drawing-title]').value.trim() || 'structos-sketch').replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '') || 'structos-sketch';
  if (format === 'pdf') {
    const branded = await brandedDrawingJpeg();
    const blob = createPdfBlob(branded.bytes, branded.width, branded.height);
    return new File([blob], `${safeTitle}.pdf`, { type: 'application/pdf' });
  }
  const isJpeg = format === 'jpg';
  const blob = await drawingCanvasBlob(isJpeg ? 'image/jpeg' : 'image/png', isJpeg ? .92 : undefined);
  return new File([blob], `${safeTitle}.${isJpeg ? 'jpg' : 'png'}`, { type: blob.type });
}

function downloadDrawingFile(file) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

async function shareDrawingFile() {
  const format = $('[data-drawing-format]').value || 'png';
  try {
    const file = await createDrawingFile(format);
    const data = { title: $('[data-drawing-title]').value.trim() || 'StructOS', files: [file] };
    if (navigator.share && (!navigator.canShare || navigator.canShare(data))) {
      try { await navigator.share(data); showToast(tr('drawingShareReady')); return; }
      catch (error) { if (error?.name === 'AbortError') return; }
    }
    downloadDrawingFile(file);
    showToast(tr('drawingShareReady'));
  } catch (error) {
    console.warn('StructOS drawing export failed:', error);
    showToast(tr('comingSoon'));
  }
}

if (drawingCanvas) {
  drawingCanvas.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    initializeDrawingCanvas();
    pushDrawingUndo();
    drawingActive = true;
    drawingDirty = true;
    drawingPointerId = event.pointerId;
    drawingLastPoint = drawingPoint(event);
    drawingCanvas.setPointerCapture(event.pointerId);
    drawPointerSegment(event);
  });
  drawingCanvas.addEventListener('pointermove', (event) => {
    if (!drawingActive || event.pointerId !== drawingPointerId) return;
    event.preventDefault();
    const events = event.getCoalescedEvents?.() || [event];
    events.forEach(drawPointerSegment);
  });
  const finishDrawingPointer = (event) => {
    if (event.pointerId !== drawingPointerId) return;
    drawingActive = false;
    drawingPointerId = null;
    drawingLastPoint = null;
    if (drawingCanvas.hasPointerCapture(event.pointerId)) drawingCanvas.releasePointerCapture(event.pointerId);
  };
  drawingCanvas.addEventListener('pointerup', finishDrawingPointer);
  drawingCanvas.addEventListener('pointercancel', finishDrawingPointer);
}

function fileSize(bytes) {
  const value = Number(bytes) || 0;
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} КБ`;
  return `${(value / 1024 / 1024).toFixed(1)} МБ`;
}

function uploadTitle(kind) {
  return tr({ project: 'uploadProject', contract: 'uploadContract', estimate: 'uploadEstimate' }[kind]);
}

function saveUploads() {
  localStorage.setItem(UPLOADS_KEY, JSON.stringify(selectedFiles));
}

function renderAnalysisCards() {
  Object.keys(uploadRules).forEach((kind) => {
    const file = selectedFiles[kind];
    const card = $(`[data-analysis-type="${kind}"]`);
    const status = $(`[data-analysis-status="${kind}"]`);
    const fileName = $(`[data-analysis-file="${kind}"]`);
    if (!card || !status || !fileName) return;
    card.classList.toggle('has-file', Boolean(file));
    status.textContent = `${file ? 1 : 0} ${tr('of')} 1`;
    fileName.hidden = !file;
    fileName.textContent = file?.name || '';
    card.setAttribute('aria-label', `${tr(kind)}. ${file ? file.name : `0 ${tr('of')} 1`}`);
  });
}

function homePendingNotifications() {
  return objectRegistry.flatMap((object) => (object.files || [])
    .filter((file) => file?.kind && !isObjectDocumentAnalyzed(object, file))
    .map((file) => ({ object, file })));
}

function homeNotificationKey({ object, file }) {
  const fileKey = file?.id || file?.versionId || [file?.kind, file?.name, file?.lastModified, file?.addedAt].filter(Boolean).join(':');
  return `${object?.id || 'object'}:${fileKey || 'notification'}`;
}

function homePendingInvitations() {
  return invitedObjects.filter((object) => object.status === 'active');
}

function homeUnreadNotifications() {
  return homePendingNotifications().filter((notification) => !homeReadNotificationKeys.has(homeNotificationKey(notification)));
}

function markHomeNotificationsRead(notifications) {
  let changed = false;
  (Array.isArray(notifications) ? notifications : []).forEach((notification) => {
    const key = homeNotificationKey(notification);
    if (homeReadNotificationKeys.has(key)) return;
    homeReadNotificationKeys.add(key);
    changed = true;
  });
  if (!changed) return;
  saveHomeReadNotifications();
  renderHomeInbox();
}

function renderHomeInbox() {
  const invitationCount = homePendingInvitations().length;
  const notificationCount = homeUnreadNotifications().length;
  const renderCount = (selector, count, labelKey) => {
    $$(selector).forEach((element) => {
      element.textContent = String(count);
      const card = element.closest('.home-inbox-card');
      card?.classList.toggle('has-activity', count > 0);
      card?.setAttribute('aria-label', `${tr(labelKey)}: ${count}`);
    });
  };
  renderCount('[data-home-invitations-count]', invitationCount, 'invitations');
  renderCount('[data-home-notifications-count]', notificationCount, 'notifications');
}

function saveObjects() {
  localStorage.setItem(OBJECTS_KEY, JSON.stringify(objectRegistry));
}

function objectFile(object, kind) {
  return (object?.files || []).find((file) => file.kind === kind) || null;
}

function selectObjectForAnalysis(object) {
  Object.keys(uploadRules).forEach((kind) => { selectedFiles[kind] = objectFile(object, kind); });
  localStorage.setItem(OBJECT_NAME_KEY, object.name);
  saveUploads();
  renderAnalysisCards();
}

function importPendingTransfer() {
  try {
    const pending = JSON.parse(localStorage.getItem(PENDING_TRANSFER_KEY) || 'null');
    const objectName = String(pending?.objectName || '').trim();
    const sectionName = String(pending?.sectionName || pending?.projectSection || '').trim();
    const files = Object.entries(pending?.files || {})
      .filter(([kind, file]) => uploadRules[kind] && file?.name)
      .map(([kind, file]) => ({ kind, name: String(file.name), size: Number(file.size) || 0, type: String(file.type || ''), lastModified: Number(file.lastModified) || Date.now(), localFileId: String(file.localFileId || ''), addedAt: file.addedAt || new Date().toISOString(), analysisPending: !pending.analysisComplete, analyzedAt: pending.analysisComplete ? (pending.updatedAt || new Date().toISOString()) : null }));
    if (!objectName || !files.length) return null;
    let object = objectRegistry.find((item) => item.name.trim().toLocaleLowerCase() === objectName.toLocaleLowerCase());
    if (!object) {
      object = { id: createObjectId(), name: objectName, projectTitle: objectName, projectSection: sectionName || objectName, documentTitles: normalizeProjectDocumentTitles(), contractNumber: '', status: pending.analysisComplete ? 'ready' : 'uploaded', createdAt: pending.updatedAt || new Date().toISOString(), updatedAt: pending.updatedAt || new Date().toISOString(), uploadedAt: pending.updatedAt || new Date().toISOString(), analyzedAt: pending.analysisComplete ? (pending.updatedAt || new Date().toISOString()) : null, startedAt: null, files: [] };
      objectRegistry.unshift(object);
    } else if (pending.analysisComplete && object.status === 'uploaded') {
      object.status = 'ready';
      object.analyzedAt = pending.updatedAt || new Date().toISOString();
    }
    files.forEach((file) => {
      object.files = [...(object.files || []).filter((item) => item.kind !== file.kind), file];
      if (file.kind === 'contract' && !object.contractNumber) object.contractNumber = extractContractNumberFromName(file.name);
    });
    if (sectionName) object.projectSection = sectionName;
    object.projectSection ||= object.projectTitle || object.name;
    object.documentTitles = normalizeProjectDocumentTitles(object.documentTitles);
    object.updatedAt = pending.updatedAt || new Date().toISOString();
    object.uploadedAt ||= pending.updatedAt || new Date().toISOString();
    selectObjectForAnalysis(object);
    saveObjects();
    localStorage.removeItem(PENDING_TRANSFER_KEY);
    return { objectId: object.id, intent: String(pending.intent || ''), source: String(pending.source || '') };
  } catch { return null; }
}

function createObjectId() {
  return globalThis.crypto?.randomUUID?.() || `object-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatObjectDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function formatObjectDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
}

function formatStorage(bytes) {
  const value = Math.max(0, Number(bytes) || 0);
  if (value < 1024) return `${Math.round(value)} ${tr('storageB')}`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(value < 10 * 1024 ? 1 : 0)} ${tr('storageKb')}`;
  if (value < 1024 * 1024 * 1024) return `${(value / 1024 / 1024).toFixed(value < 10 * 1024 * 1024 ? 1 : 0)} ${tr('storageMb')}`;
  return `${(value / 1024 / 1024 / 1024).toFixed(2)} ${tr('storageGb')}`;
}

function extractContractNumberFromName(name) {
  const baseName = String(name || '').replace(/\.[^.]+$/, '').trim();
  const patterns = [
    /(?:договор|contract|келишим|шартнома)\s*(?:№|n(?:o)?\.?\s*)?([\p{L}\d][\p{L}\d._/-]{1,40})/iu,
    /№\s*([\p{L}\d][\p{L}\d._/-]{1,40})/u
  ];
  for (const pattern of patterns) {
    const match = baseName.match(pattern);
    const candidate = String(match?.[1] || '').replace(/^[№#\s]+|[\s._-]+$/g, '');
    if (candidate && !/^(договор|contract|келишим|шартнома)$/iu.test(candidate)) return candidate.slice(0, 60);
  }
  return '';
}

function wizardProgressMarkup(step) {
  const labels = ['objectNameStep', 'projectNameStep', 'documentsStep'];
  return `<ol class="project-wizard-progress">${labels.map((key, index) => `<li class="${index + 1 === step ? 'is-current' : index + 1 < step ? 'is-complete' : ''}"><span>${index + 1 < step ? '✓' : index + 1}</span><b>${escapeHtml(tr(key))}</b></li>`).join('')}</ol>`;
}

function projectWizardTitle() {
  return projectObjectWizardDraft?.quickProjectOnly ? tr('quickProjectAnalysis') : tr('projectObjectWizard');
}

function openProjectObjectWizard(options = {}) {
  projectObjectWizardDraft = {
    step: 1,
    quickProjectOnly: Boolean(options.quickProjectOnly),
    workspaceOrigin: options.workspaceOrigin === 'turnkey' ? 'turnkey' : 'manual',
    objectName: '',
    projectSection: '',
    files: { project: null, contract: null, estimate: null },
    sourceFiles: { project: null, contract: null, estimate: null },
    finishing: false
  };
  renderProjectObjectWizard();
}

function renderProjectObjectWizard() {
  const draft = projectObjectWizardDraft;
  if (!draft) return;
  const step = Math.max(1, Math.min(3, Number(draft.step) || 1));
  draft.step = step;
  if (step === 1) {
    showDialog(escapeHtml(projectWizardTitle()), `${escapeHtml(tr('stepOf'))} 1 / 3 · ${escapeHtml(tr('objectNameStep'))}`, `${wizardProgressMarkup(step)}<section class="project-wizard-step"><label class="project-wizard-field"><span>${escapeHtml(tr('objectName'))}</span><input data-wizard-object-name maxlength="100" autocomplete="organization" placeholder="${escapeHtml(tr('objectPlaceholder'))}" value="${escapeHtml(draft.objectName)}" /></label><button class="primary-button project-wizard-main-action" type="button" data-wizard-next>${escapeHtml(tr('continueAction'))} →</button></section>`);
    const input = $('[data-wizard-object-name]');
    const next = () => {
      const value = input?.value.trim().slice(0, 100) || '';
      if (!value) { input?.focus(); showToast(tr('objectRequired')); return; }
      draft.objectName = value;
      draft.step = 2;
      renderProjectObjectWizard();
    };
    $('[data-wizard-next]')?.addEventListener('click', next);
    input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); next(); } });
    setTimeout(() => input?.focus(), 40);
    return;
  }
  if (step === 2) {
    showDialog(escapeHtml(projectWizardTitle()), `${escapeHtml(tr('stepOf'))} 2 / 3 · ${escapeHtml(tr('projectNameStep'))}`, `${wizardProgressMarkup(step)}<section class="project-wizard-step"><div class="project-wizard-object-chip"><small>${escapeHtml(tr('objectName'))}</small><strong>${escapeHtml(draft.objectName)}</strong></div><label class="project-wizard-field"><span>${escapeHtml(tr('giveProjectName'))}</span><input data-wizard-project-name maxlength="140" placeholder="${escapeHtml(tr('projectNamePlaceholder'))}" value="${escapeHtml(draft.projectSection)}" /><small>${escapeHtml(tr('projectNameHint'))}</small></label><div class="project-wizard-navigation"><button class="outline-button" type="button" data-wizard-back>← ${escapeHtml(tr('backAction'))}</button><button class="primary-button" type="button" data-wizard-next>${escapeHtml(tr('continueAction'))} →</button></div></section>`);
    const input = $('[data-wizard-project-name]');
    const next = () => {
      const value = input?.value.trim().slice(0, 140) || '';
      if (!value) { input?.focus(); showToast(tr('projectNameRequired')); return; }
      draft.projectSection = value;
      draft.step = 3;
      renderProjectObjectWizard();
    };
    $('[data-wizard-back]')?.addEventListener('click', () => { draft.projectSection = input?.value.trim().slice(0, 140) || draft.projectSection; draft.step = 1; renderProjectObjectWizard(); });
    $('[data-wizard-next]')?.addEventListener('click', next);
    input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); next(); } });
    setTimeout(() => { input?.focus(); input?.select(); }, 40);
    return;
  }

  const kinds = Object.keys(uploadRules);
  const documentCards = kinds.map((kind) => {
    const file = draft.files[kind];
    const rule = uploadRules[kind];
    const requirement = tr('documentOptional');
    const analyzeAction = file ? `<button class="primary-button" type="button" data-wizard-analyze-kind="${escapeHtml(kind)}">${escapeHtml(tr('analyze'))} →</button>` : '';
    const deleteAction = file ? `<button class="project-wizard-delete-document" type="button" data-wizard-delete-document="${escapeHtml(kind)}" aria-label="${escapeHtml(tr('deleteFile'))}">× <span>${escapeHtml(tr('deleteDocument'))}</span></button>` : '';
    return `<article class="project-wizard-document${file ? ' has-file' : ''}"><header><span>${file ? '✓' : kind === 'project' ? '▤' : kind === 'contract' ? '≡' : '₽'}</span><div><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(requirement)}</small></div></header><div class="project-wizard-file-state"><b>${escapeHtml(file?.name || tr('documentNotLoaded'))}</b><small>${file ? `${escapeHtml(formatStorage(file.size))} · ${escapeHtml(fileFormatLabel(file))}` : escapeHtml(rule.formats)}</small></div><input class="hidden-file-input" data-wizard-document-input="${escapeHtml(kind)}" type="file" accept="${rule.accept}" /><div class="project-wizard-document-actions${file ? ' has-file' : ''}"><button class="${file ? 'outline-button' : 'primary-button'}" type="button" data-wizard-choose-document="${escapeHtml(kind)}">${escapeHtml(tr(file ? 'changeDocument' : 'chooseDocument'))}</button>${analyzeAction}${deleteAction}</div></article>`;
  }).join('');
  const documentsHint = draft.quickProjectOnly ? tr('quickDocumentChoiceHint') : tr('uploadDocumentsHint');
  const loadedCount = Object.values(draft.files).filter(Boolean).length;
  const analyzeAllAction = loadedCount > 1 ? `<button class="primary-button project-wizard-main-action" type="button" data-wizard-analyze-all>${escapeHtml(tr('analyzeAll'))} →</button>` : '';
  showDialog(escapeHtml(projectWizardTitle()), `${escapeHtml(tr('stepOf'))} 3 / 3 · ${escapeHtml(tr('uploadDocuments'))}`, `${wizardProgressMarkup(step)}<section class="project-wizard-step"><div class="project-wizard-summary"><span><small>${escapeHtml(tr('objectName'))}</small><strong>${escapeHtml(draft.objectName)}</strong></span><span><small>${escapeHtml(tr('projectNameStep'))}</small><strong>${escapeHtml(draft.projectSection)}</strong></span></div><p class="project-wizard-documents-hint">${escapeHtml(documentsHint)}</p><div class="project-wizard-documents">${documentCards}</div>${analyzeAllAction}<div class="project-wizard-navigation is-back-only"><button class="outline-button" type="button" data-wizard-back>← ${escapeHtml(tr('backAction'))}</button></div></section>`);
  $('[data-wizard-back]')?.addEventListener('click', () => { draft.step = 2; renderProjectObjectWizard(); });
  $$('[data-wizard-choose-document]').forEach((button) => button.addEventListener('click', () => $(`[data-wizard-document-input="${button.dataset.wizardChooseDocument}"]`)?.click()));
  $$('[data-wizard-document-input]').forEach((input) => input.addEventListener('change', () => chooseProjectWizardDocument(input.dataset.wizardDocumentInput, input.files?.[0])));
  $$('[data-wizard-delete-document]').forEach((button) => button.addEventListener('click', () => deleteProjectWizardDocument(button.dataset.wizardDeleteDocument)));
  $$('[data-wizard-analyze-kind]').forEach((button) => button.addEventListener('click', () => finishProjectObjectWizard(button.dataset.wizardAnalyzeKind)));
  $('[data-wizard-analyze-all]')?.addEventListener('click', () => finishProjectObjectWizard('all'));
}

function chooseProjectWizardDocument(kind, file) {
  const draft = projectObjectWizardDraft;
  const rule = uploadRules[kind];
  if (!draft || !rule || !file) return;
  if (file.size > rule.maxMb * 1024 * 1024) { showToast(`${tr('fileTooLarge')}: ${rule.maxMb} МБ`); return; }
  if (!isAllowedFile(file, rule)) { showToast(`${tr('unsupportedFormat')}: ${rule.formats}`); return; }
  const metadata = fileMetadata(file);
  if (kind === 'contract') metadata.contractNumber = extractContractNumberFromName(file.name);
  draft.files[kind] = metadata;
  draft.sourceFiles[kind] = file;
  renderProjectObjectWizard();
}

function deleteProjectWizardDocument(kind) {
  const draft = projectObjectWizardDraft;
  if (!draft || !uploadRules[kind]) return;
  draft.files[kind] = null;
  draft.sourceFiles[kind] = null;
  renderProjectObjectWizard();
}

async function finishProjectObjectWizard(analyzeKind) {
  const draft = projectObjectWizardDraft;
  if (!draft || draft.finishing) return;
  const readyFiles = Object.entries(draft.files).filter(([, file]) => file);
  if (!readyFiles.length) { showToast(tr('documentsRequired')); return; }
  const analyzeKinds = analyzeKind === 'all' ? readyFiles.map(([kind]) => kind) : [analyzeKind].filter((kind) => draft.files[kind]);
  if (!analyzeKinds.length) return;
  draft.finishing = true;
  $$('[data-wizard-analyze-kind]').forEach((button) => { button.disabled = true; });
  if ($('[data-wizard-analyze-all]')) $('[data-wizard-analyze-all]').disabled = true;
  const sourceCatalogByKind = Object.fromEntries(await Promise.all(readyFiles.map(async ([kind]) => [
    kind,
    await extractCashSourceCatalogFromFile(draft.sourceFiles[kind], kind)
  ])));
  const now = new Date().toISOString();
  const files = readyFiles.map(([kind, file]) => {
    const record = { ...file, kind, projectSection: draft.projectSection, addedAt: file.addedAt || now, analysisPending: true, analyzedAt: null, sourceCatalog: sourceCatalogByKind[kind] || [], sourceCatalogScanned: Boolean(draft.sourceFiles[kind] && CASH_SOURCE_DOCUMENT_KINDS.includes(kind)) };
    return { ...record, versions: [fileVersionSnapshot(record)], comparison: null };
  });
  const object = {
    id: createObjectId(),
    name: draft.objectName,
    projectTitle: draft.objectName,
    projectSection: draft.projectSection,
    documentTitles: normalizeProjectDocumentTitles(),
    contractNumber: String(draft.files.contract?.contractNumber || ''),
    workspaceOrigin: draft.workspaceOrigin,
    status: 'uploaded',
    createdAt: now,
    updatedAt: now,
    uploadedAt: now,
    analyzedAt: null,
    startedAt: null,
    completedAt: null,
    files
  };
  objectRegistry.unshift(object);
  selectObjectForAnalysis(object);
  saveObjects();
  renderObjects();
  renderWidgets();
  projectObjectWizardDraft = null;
  $('[data-dialog]')?.close();
  showToast(tr('objectSaved'));
  if (analyzeKinds.length > 1) analyzeObjectDocuments(object.id, analyzeKinds);
  else analyzeObjectDocument(object.id, analyzeKinds[0]);
}

function objectRowMarkup(object) {
  const isReady = object.status === 'ready';
  const isActive = object.status === 'active';
  const fileCount = Array.isArray(object.files) ? object.files.length : 0;
  const storage = formatStorage((object.files || []).reduce((total, file) => total + (Number(file.size) || 0), 0));
  const meta = isReady
    ? `${tr('analyzed')}: ${formatObjectDate(object.analyzedAt)} · ${fileCount} ${tr('attachedDocuments')} · ${tr('memoryUsed')}: ${storage}`
    : isActive
      ? `${tr('started')}: ${formatObjectDate(object.startedAt || object.analyzedAt)} · ${fileCount} ${tr('attachedDocuments')} · ${tr('memoryUsed')}: ${storage}`
      : `${tr('uploadedAt')}: ${formatObjectDate(object.uploadedAt || object.analyzedAt)} · ${fileCount} ${tr('attachedDocuments')} · ${tr('memoryUsed')}: ${storage}`;
  const actions = isReady
    ? `<div class="object-row-actions"><button class="object-start-button" type="button" data-start-ready="${escapeHtml(object.id)}">${escapeHtml(tr('start'))}</button><button class="object-delete-button" type="button" data-delete-ready="${escapeHtml(object.id)}" aria-label="${escapeHtml(tr('deleteObject'))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg></button></div>`
    : `<span class="object-status-chip ${isActive ? '' : 'is-uploaded'}">${escapeHtml(tr(isActive ? 'inWork' : 'uploaded'))}</span>`;
  return `<article class="status-object-row ${isReady ? 'is-ready' : isActive ? 'is-active' : 'is-uploaded'}"><span class="object-row-icon" aria-hidden="true">${isReady ? '◇' : isActive ? '⌂' : '▤'}</span><div class="object-row-copy"><button class="object-open-button" type="button" data-open-object="${escapeHtml(object.id)}" aria-label="${escapeHtml(`${tr('openObject')}: ${object.name}`)}">${escapeHtml(object.name)}</button><small>${escapeHtml(meta)}</small></div>${actions}</article>`;
}

function projectTitleFor(object) {
  return String(object?.projectTitle || object?.name || '').trim().slice(0, 140) || tr('project');
}

function projectSectionFor(object) {
  return String(object?.projectSection || object?.projectTitle || object?.name || '').trim().slice(0, 140) || tr('projectNameStep');
}

function projectDocumentBaseTitle(object, kind) {
  if (kind === 'project') return projectTitleFor(object);
  const titles = normalizeProjectDocumentTitles(object?.documentTitles);
  return titles[kind] || `${projectTitleFor(object)} · ${tr(kind)}`;
}

function projectDocumentTitle(object, kind) {
  const baseTitle = projectDocumentBaseTitle(object, kind);
  if (kind !== 'contract' || !object?.contractNumber) return baseTitle;
  const hasCustomTitle = Boolean(normalizeProjectDocumentTitles(object.documentTitles).contract);
  return hasCustomTitle
    ? `${baseTitle} · № ${object.contractNumber}`
    : `${projectTitleFor(object)} · ${tr('contractNumberLabel')} ${object.contractNumber}`;
}

function linkedCashAttachmentFromProject(object, kind) {
  const file = objectFile(object, kind);
  if (!file) return null;
  const versions = fileVersions(file).map((version, index) => normalizeCashAttachmentVersion({
    ...version,
    id: `project-link-${object.id}-${kind}-${index}-${version.lastModified}`,
    sourceObjectId: object.id,
    sourceDocumentKind: kind,
    sourceDocumentTitle: projectDocumentTitle(object, kind),
    linkedFromProject: true
  }, kind)).filter(Boolean);
  return versions.length ? { kind, versions } : null;
}

function cashAttachmentsFromProject(object, currentAttachments = {}) {
  return Object.fromEntries(CASH_ATTACHMENT_KINDS.map((kind) => {
    const linked = linkedCashAttachmentFromProject(object, kind);
    const localVersions = (currentAttachments?.[kind]?.versions || []).filter((version) => !version.linkedFromProject);
    const versions = [...(linked?.versions || []), ...localVersions];
    return [kind, versions.length ? { kind, versions } : null];
  }));
}

function openProjectLaunchDialog(objectId) {
  const object = objectRegistry.find((item) => item.id === objectId);
  if (!object) return;
  showDialog(escapeHtml(tr('startObjectQuestion')), `${escapeHtml(tr('project'))}: ${escapeHtml(projectTitleFor(object))}`, `<div class="project-launch-choice-grid">
    <button class="project-launch-choice is-development" type="button" disabled aria-disabled="true"><span class="project-launch-choice-icon" aria-hidden="true">◎</span><span><strong>${escapeHtml(tr('fullCycleChoice'))}</strong><small>${escapeHtml(tr('fullCycleChoiceHint'))}</small></span><b>${escapeHtml(tr('inDevelopment'))}</b></button>
    <button class="project-launch-choice is-quick" type="button" data-launch-quick-object><span class="project-launch-choice-icon" aria-hidden="true">↗</span><span><strong>${escapeHtml(tr('quickObjectChoice'))}</strong><small>${escapeHtml(tr('quickObjectChoiceHint'))}</small></span><i aria-hidden="true">›</i></button>
  </div>`);
  $('[data-launch-quick-object]', $('[data-dialog-content]'))?.addEventListener('click', () => openQuickObjectFromProjectDialog(object.id));
}

function openQuickObjectFromProjectDialog(objectId) {
  const object = objectRegistry.find((item) => item.id === objectId);
  if (!object) return;
  const uploadedDocuments = CASH_ATTACHMENT_KINDS.map((kind) => ({ kind, file: objectFile(object, kind) })).filter((item) => item.file);
  const documents = uploadedDocuments.length
    ? uploadedDocuments.map(({ kind, file }) => `<article class="project-linked-document"><span aria-hidden="true">${kind === 'project' ? '▤' : kind === 'contract' ? '≡' : '₽'}</span><div><strong>${escapeHtml(projectDocumentTitle(object, kind))}</strong><small>${escapeHtml(file.name)} · ${escapeHtml(formatStorage(file.size))}</small></div><b>✓ ${escapeHtml(tr('linkedFromProject'))}</b></article>`).join('')
    : `<div class="project-linked-documents-empty">${escapeHtml(tr('notUploaded'))}</div>`;
  showDialog(escapeHtml(tr('quickObjectSetup')), escapeHtml(tr('quickObjectSetupHint')), `<div class="project-quick-start-form">
    <div class="project-quick-start-fields"><label><span>${escapeHtml(tr('quickObjectName'))}</span><input type="text" maxlength="100" data-project-quick-name value="${escapeHtml(object.name)}" /></label><label><span>${escapeHtml(tr('sectionName'))}</span><input type="text" maxlength="120" data-project-quick-section value="${escapeHtml(projectSectionFor(object))}" /></label></div>
    <fieldset class="project-quick-modes"><legend>${escapeHtml(tr('chooseOneWorkMode'))}</legend><div><label><input type="radio" name="project-quick-mode" value="contract" /><span><b>${escapeHtml(tr('workByContract'))}</b></span></label><label><input type="radio" name="project-quick-mode" value="fact" /><span><b>${escapeHtml(tr('workByFact'))}</b></span></label><label><input type="radio" name="project-quick-mode" value="staffing" /><span><b>${escapeHtml(tr('peopleAssigned'))}</b></span></label></div></fieldset>
    <div class="project-quick-contract-amount" data-project-quick-contract-amount hidden><label><span>${escapeHtml(tr('contractAmount'))}</span><input type="number" min="0.01" step="0.01" inputmode="decimal" data-project-quick-contract-value placeholder="0 ₽" /></label></div>
    <section class="project-linked-documents"><header><div><h3>${escapeHtml(tr('linkedProjectDocuments'))}</h3><p>${escapeHtml(tr('linkedProjectDocumentsHint'))}</p></div><b>${uploadedDocuments.length}</b></header><div>${documents}</div></section>
    <button class="primary-button project-quick-start-submit" type="button" data-confirm-project-quick-start>${escapeHtml(tr('launchQuickObject'))}</button>
  </div>`);
  const scope = $('[data-dialog-content]');
  const nameInput = $('[data-project-quick-name]', scope);
  const sectionInput = $('[data-project-quick-section]', scope);
  const contractAmountField = $('[data-project-quick-contract-amount]', scope);
  const syncMode = () => {
    const mode = $('input[name="project-quick-mode"]:checked', scope)?.value;
    contractAmountField.hidden = mode !== 'contract';
    if (mode === 'contract') $('[data-project-quick-contract-value]', contractAmountField)?.focus();
  };
  $$('input[name="project-quick-mode"]', scope).forEach((input) => input.addEventListener('change', syncMode));
  const launchQuickObject = () => {
    const name = nameInput?.value.trim().slice(0, 100) || '';
    const sectionName = sectionInput?.value.trim().slice(0, 120) || '';
    const mode = $('input[name="project-quick-mode"]:checked', scope)?.value || '';
    if (!name) { nameInput?.focus(); return; }
    if (!sectionName) { sectionInput?.focus(); return; }
    if (!mode) { showToast(tr('chooseOneWorkMode')); return; }
    const contractAmountInput = $('[data-project-quick-contract-value]', scope);
    const contractAmount = mode === 'contract' ? Math.max(0, Math.round((Number(contractAmountInput?.value) || 0) * 100) / 100) : 0;
    if (mode === 'contract' && contractAmount <= 0) { showToast(tr('enterContractAmount')); contractAmountInput?.focus(); return; }
    const now = new Date().toISOString();
    let cashObject = cashflowObjects.find((item) => item.sourceProjectId === object.id);
    const existed = Boolean(cashObject);
    if (!cashObject) {
      cashObject = {
        id: `cash-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        sourceProjectId: object.id,
        name,
        createdAt: now,
        completed: false,
        completedAt: null,
        organizationDocumentsCollapsed: false,
        organizationDocuments: normalizeCashOrganizationDocuments(),
        sections: []
      };
      cashflowObjects.unshift(cashObject);
    }
    cashObject.name = name;
    cashObject.completed = false;
    cashObject.completedAt = null;
    let sectionIndex = cashObject.sections.findIndex((section) => section.sourceProjectId === object.id);
    const currentSection = sectionIndex >= 0 ? cashObject.sections[sectionIndex] : null;
    const section = normalizeCashSection({
      ...(currentSection || {}),
      sourceProjectId: object.id,
      name: sectionName,
      createdAt: currentSection?.createdAt || now,
      createdManually: true,
      contractMode: mode === 'contract',
      factMode: mode === 'fact',
      staffingMode: mode === 'staffing',
      contractAmount,
      attachments: cashAttachmentsFromProject(object, currentSection?.attachments)
    });
    if (sectionIndex >= 0) cashObject.sections[sectionIndex] = section;
    else cashObject.sections.push(section);
    expandedCashSections.add(section.id);
    activeCashObjectId = cashObject.id;
    object.updatedAt = now;
    saveObjects();
    saveCashflow();
    $('[data-dialog]')?.close();
    setPanel('cashflow');
    showToast(tr(existed ? 'quickObjectFromProjectUpdated' : 'quickObjectFromProjectCreated'));
  };
  $('[data-confirm-project-quick-start]', scope)?.addEventListener('click', launchQuickObject);
  [nameInput, sectionInput].forEach((input) => input?.addEventListener('keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); launchQuickObject(); } }));
  setTimeout(() => { nameInput?.focus(); nameInput?.select(); }, 40);
}

function projectLastUpdatedAt(object) {
  const dates = [object?.createdAt, object?.uploadedAt, object?.analyzedAt, object?.startedAt, object?.completedAt, object?.updatedAt]
    .map((value) => new Date(value || 0))
    .filter((date) => Number.isFinite(date.getTime()));
  return dates.length ? new Date(Math.max(...dates.map((date) => date.getTime()))).toISOString() : new Date().toISOString();
}

function renameProjectSection(objectId) {
  const object = objectRegistry.find((item) => item.id === objectId);
  if (!object) return;
  openRenameDialog(tr('renameSection'), projectSectionFor(object), 140, (name) => {
    object.projectSection = name;
    object.updatedAt = new Date().toISOString();
    object.files = (object.files || []).map((file) => ({ ...file, projectSection: name }));
    saveObjects();
    renderObjects();
    renderWidgets();
  });
}

function renameProjectDocument(objectId, kind) {
  const object = objectRegistry.find((item) => item.id === objectId);
  if (!object || !uploadRules[kind]) return;
  const titleKey = kind === 'project' ? 'renameProject' : kind === 'contract' ? 'renameContract' : 'renameEstimate';
  openRenameDialog(tr(titleKey), projectDocumentBaseTitle(object, kind), 160, (name) => {
    if (kind === 'project') object.projectTitle = name;
    else object.documentTitles = { ...normalizeProjectDocumentTitles(object.documentTitles), [kind]: name };
    object.updatedAt = new Date().toISOString();
    saveObjects();
    renderObjects();
    renderWidgets();
  });
}

function myProjectObjects() {
  const projects = objectRegistry.slice();
  return projects.sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    const aDate = projectLastUpdatedAt(a);
    const bDate = projectLastUpdatedAt(b);
    return new Date(bDate) - new Date(aDate);
  });
}

function myProjectStatusKey(object) {
  if (object.status === 'ready') return 'readyStatus';
  if (object.status === 'active') return 'inWork';
  if (object.status === 'completed') return 'completedListObject';
  return 'uploaded';
}

function saveCollapsedProjectIds() {
  localStorage.setItem(PROJECT_CARD_STATE_KEY, JSON.stringify([...collapsedProjectIds]));
}

function toggleMyProjectCard(id) {
  if (collapsedProjectIds.has(id)) collapsedProjectIds.delete(id);
  else collapsedProjectIds.add(id);
  saveCollapsedProjectIds();
  renderMyProjects();
}

function deleteProjectObject(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object) return;
  showDialog(escapeHtml(tr('deleteProjectTitle')), escapeHtml(tr('deleteProjectHint')), `<div class="result-actions"><button class="outline-button" type="button" data-cancel-project-delete>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-project-delete>${escapeHtml(tr('deleteProject'))}</button></div>`);
  $('[data-cancel-project-delete]')?.addEventListener('click', () => $('[data-dialog]')?.close());
  $('[data-confirm-project-delete]')?.addEventListener('click', () => {
    Object.keys(uploadRules).forEach((kind) => {
      const file = objectFile(object, kind);
      if (file && selectedFiles[kind] && sameFileMetadata(selectedFiles[kind], file)) selectedFiles[kind] = null;
    });
    objectRegistry = objectRegistry.filter((item) => item.id !== id);
    collapsedProjectIds.delete(id);
    saveCollapsedProjectIds();
    saveObjects();
    saveUploads();
    renderAnalysisCards();
    renderObjects();
    renderWidgets();
    $('[data-dialog]')?.close();
    showToast(tr('projectDeleted'));
  });
}

function projectDocumentGroupKey(objectId, kind) {
  return `${objectId}:${kind}`;
}

function projectComparisonActionKey(kind) {
  return { project: 'compareProjects', contract: 'compareContracts', estimate: 'compareEstimates' }[kind] || 'versionComparison';
}

function projectComparisonTitleKey(kind) {
  return { project: 'projectComparison', contract: 'contractComparison', estimate: 'estimateComparison' }[kind] || 'versionComparison';
}

function projectVersionAnalysisMarkup(object, kind, version) {
  const analyzed = isDocumentVersionAnalyzed(version);
  if (!analyzed) return `<section class="my-project-version-result is-pending"><header><span>…</span><div><small>${escapeHtml(tr('fileAnalysisResult'))}</small><strong>${escapeHtml(version.name)}</strong></div></header><div class="my-project-version-waiting"><span>⌛</span><div><strong>${escapeHtml(tr('fileAwaitingAnalysis'))}</strong><p>${escapeHtml(tr('fileAwaitingAnalysisCopy'))}</p></div><button class="primary-button" type="button" data-analyze-project-version="${escapeHtml(version.id)}" data-object-id="${escapeHtml(object.id)}" data-kind="${escapeHtml(kind)}">${escapeHtml(tr('analyze'))}</button></div></section>`;
  const key = `${projectDocumentGroupKey(object.id, kind)}:${version.id}`;
  const selectedTab = selectedProjectVersionTabs.get(key) || 'proposal';
  const facts = `<div class="my-project-version-facts"><article><span>${escapeHtml(tr('fileFormatLabel'))}</span><b>${escapeHtml(fileFormatLabel(version))}</b></article><article><span>${escapeHtml(tr('fileSizeLabel'))}</span><b>${escapeHtml(formatStorage(version.size))}</b></article><article><span>${escapeHtml(tr('uploadDate'))}</span><b>${escapeHtml(formatObjectDate(version.addedAt))}</b></article>${kind === 'contract' ? `<article><span>${escapeHtml(tr('contractNumberLabel'))}</span><b>${escapeHtml(version.contractNumber || tr('contractNumberPending'))}</b></article>` : ''}</div>`;
  let resultBody = '';
  if (kind === 'project') {
    const tabs = projectAnalysisTabs.map((tab) => `<button class="${tab.id === selectedTab ? 'is-active' : ''}" type="button" data-project-version-tab="${escapeHtml(tab.id)}" data-object-id="${escapeHtml(object.id)}" data-kind="${escapeHtml(kind)}" data-version-id="${escapeHtml(version.id)}" aria-selected="${tab.id === selectedTab}"><span>${tab.icon}</span><strong>${escapeHtml(tr(tab.label))}</strong></button>`).join('');
    resultBody = `<nav class="project-analysis-tabs is-inline" aria-label="${escapeHtml(tr('projectAnalysis'))}">${tabs}</nav><section class="project-analysis-content is-inline"><header><span class="eyebrow">STRUCTOS DETAIL</span><h2>${escapeHtml(tr(projectAnalysisTabs.find((tab) => tab.id === selectedTab)?.label || 'projectEstimate'))}</h2></header>${projectAnalysisTabContent(selectedTab, version, kind)}</section>`;
  } else if (kind === 'estimate') {
    resultBody = `<section class="project-analysis-content is-inline"><header><span class="eyebrow">STRUCTOS ESTIMATE</span><h2>${escapeHtml(tr('estimate'))}</h2></header>${projectAnalysisTabContent('proposal', version, kind)}</section>`;
  } else {
    resultBody = `<section class="analysis-document-placeholder is-inline"><span>≡</span><h2>${escapeHtml(tr('analyzedDocumentPage'))}</h2><p>${escapeHtml(tr('analyzedDocumentPageCopy'))}</p></section>`;
  }
  return `<section class="my-project-version-result is-ready"><header><span>✓</span><div><small>${escapeHtml(tr('fileAnalysisResult'))}</small><strong>${escapeHtml(version.name)}</strong></div><b>${escapeHtml(tr('analyzed'))}</b></header>${facts}<section class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></section>${resultBody}</section>`;
}

function projectVersionComparisonBlock(object, kind, file) {
  const versions = fileVersions(file);
  if (versions.length < 2) return '';
  const key = projectDocumentGroupKey(object.id, kind);
  const previous = versions[versions.length - 2];
  const current = versions[versions.length - 1];
  const expanded = expandedProjectComparisons.has(key);
  return `<section class="my-project-comparison-block${expanded ? ' is-expanded' : ''}"><button type="button" data-toggle-project-comparison="${escapeHtml(kind)}" data-object-id="${escapeHtml(object.id)}" aria-expanded="${String(expanded)}"><span aria-hidden="true">⇄</span><div><small>${escapeHtml(tr(projectComparisonTitleKey(kind)))}</small><strong>${escapeHtml(previous.name)} <i>↔</i> ${escapeHtml(current.name)}</strong><em>${escapeHtml(tr('comparedFiles'))} · v${versions.length - 1} / v${versions.length}</em></div><b>${escapeHtml(tr(expanded ? 'hideDifferences' : 'showDifferences'))}</b><i aria-hidden="true">⌄</i></button><div class="my-project-comparison-details"${expanded ? '' : ' hidden'}>${revisionComparisonMarkup(file, { previous, current, kind })}</div></section>`;
}

function myProjectDocumentGroupMarkup(object, kind) {
  const file = objectFile(object, kind);
  const versions = file ? fileVersions(file) : [];
  const groupKey = projectDocumentGroupKey(object.id, kind);
  const selectedVersionId = selectedProjectVersionIds.get(groupKey);
  const selectedVersion = versions.find((version) => version.id === selectedVersionId) || null;
  const icon = { project: '▤', contract: '≡', estimate: '₽' }[kind];
  const title = projectDocumentTitle(object, kind);
  const launchAction = kind === 'project' && versions.length ? `<button class="my-project-document-launch" type="button" data-launch-project="${escapeHtml(object.id)}">▶ ${escapeHtml(tr('launchProject'))}</button>` : '';
  const uploadLabel = versions.length ? tr('uploadAdditionalFile') : tr('upload');
  const versionCards = versions.map((version, index) => {
    const analyzed = isDocumentVersionAnalyzed(version);
    const selected = selectedVersion?.id === version.id;
    const isLatest = index === versions.length - 1;
    const contractNumber = kind === 'contract' && version.contractNumber ? ` · ${tr('contractNumberLabel')} ${version.contractNumber}` : '';
    return `<article class="my-project-version-card ${analyzed ? 'is-analyzed' : 'is-pending'}${selected ? ' is-selected' : ''}"><button class="my-project-version-main" type="button" data-toggle-project-version="${escapeHtml(version.id)}" data-object-id="${escapeHtml(object.id)}" data-kind="${escapeHtml(kind)}" aria-expanded="${String(selected)}"><span>${analyzed ? '✓' : '…'}</span><span><small>${escapeHtml(tr(kind))} · v${index + 1}${isLatest ? ` · ${escapeHtml(tr('latestFile'))}` : ''}</small><strong>${escapeHtml(version.name)}</strong><em>${escapeHtml(formatStorage(version.size))} · ${escapeHtml(formatObjectDate(version.addedAt))}${escapeHtml(contractNumber)}</em></span><i aria-hidden="true">⌄</i></button><div class="my-project-version-actions">${analyzed ? `<button class="outline-button" type="button" data-open-project-version="${escapeHtml(version.id)}" data-object-id="${escapeHtml(object.id)}" data-kind="${escapeHtml(kind)}">${escapeHtml(tr('openAnalysisResult'))}</button>` : `<button class="primary-button" type="button" data-analyze-project-version="${escapeHtml(version.id)}" data-object-id="${escapeHtml(object.id)}" data-kind="${escapeHtml(kind)}">${escapeHtml(tr('analyze'))}</button>`}<button class="my-project-version-delete" type="button" data-delete-project-version="${escapeHtml(version.id)}" data-object-id="${escapeHtml(object.id)}" data-kind="${escapeHtml(kind)}" aria-label="${escapeHtml(tr('deleteDocument'))}">×</button></div></article>`;
  }).join('');
  const comparisonAction = versions.length > 1 ? `<button class="outline-button my-project-compare-button" type="button" data-show-project-comparison="${escapeHtml(kind)}" data-object-id="${escapeHtml(object.id)}"><span>⇄</span>${escapeHtml(tr(projectComparisonActionKey(kind)))}</button>` : '';
  const comparison = visibleProjectComparisons.has(groupKey) ? projectVersionComparisonBlock(object, kind, file) : '';
  const selectedResult = selectedVersion ? projectVersionAnalysisMarkup(object, kind, selectedVersion) : '';
  return `<section class="my-project-document-group${versions.length ? ' has-files' : ''}" data-project-document-group="${escapeHtml(groupKey)}"><header><span class="my-project-document-icon" aria-hidden="true">${icon}</span><div><small>${escapeHtml(tr(kind))}</small><strong>${escapeHtml(title)}</strong><em>${versions.length ? `${versions.length} ${escapeHtml(tr('versions'))} · ${escapeHtml(tr('fileBlockHint'))}` : escapeHtml(tr('documentNotLoaded'))}</em></div><b>${versions.length}</b><div class="my-project-document-group-actions"><button class="outline-button my-project-document-rename" type="button" data-my-project-rename-document="${escapeHtml(kind)}" data-object-id="${escapeHtml(object.id)}">✎ ${escapeHtml(tr('rename'))}</button>${launchAction}<button class="primary-button" type="button" data-my-project-upload="${escapeHtml(kind)}" data-object-id="${escapeHtml(object.id)}" data-version-mode="${versions.length ? 'revision' : 'standard'}">＋ ${escapeHtml(uploadLabel)}</button></div></header>${versions.length ? `<div class="my-project-version-grid">${versionCards}</div>` : `<div class="my-project-version-empty"><span>＋</span><p>${escapeHtml(tr('documentNotLoaded'))}</p></div>`}<div class="my-project-document-group-footer">${comparisonAction}</div>${comparison}${selectedResult}</section>`;
}

function rerenderProjectVersions() {
  renderMyProjects();
}

function toggleProjectVersionResult(objectId, kind, versionId) {
  const key = projectDocumentGroupKey(objectId, kind);
  if (selectedProjectVersionIds.get(key) === versionId) selectedProjectVersionIds.delete(key);
  else selectedProjectVersionIds.set(key, versionId);
  rerenderProjectVersions();
}

function showProjectComparison(objectId, kind) {
  const key = projectDocumentGroupKey(objectId, kind);
  visibleProjectComparisons.add(key);
  expandedProjectComparisons.delete(key);
  rerenderProjectVersions();
}

function toggleProjectComparison(objectId, kind) {
  const key = projectDocumentGroupKey(objectId, kind);
  if (expandedProjectComparisons.has(key)) expandedProjectComparisons.delete(key);
  else expandedProjectComparisons.add(key);
  rerenderProjectVersions();
}

function selectProjectVersionTab(objectId, kind, versionId, tab) {
  selectedProjectVersionTabs.set(`${projectDocumentGroupKey(objectId, kind)}:${versionId}`, tab);
  rerenderProjectVersions();
}

function myProjectMarkup(object) {
  const usedBytes = (object.files || []).reduce((total, file) => total + fileVersions(file).reduce((sum, version) => sum + (Number(version.size) || 0), 0), 0);
  const updatedAt = projectLastUpdatedAt(object);
  const statusKey = myProjectStatusKey(object);
  const projectSection = projectSectionFor(object);
  const collapsed = collapsedProjectIds.has(object.id);
  const documents = Object.keys(uploadRules).map((kind) => myProjectDocumentGroupMarkup(object, kind)).join('');
  const toggleLabel = tr(collapsed ? 'expandProject' : 'collapseProject');
  return `<article class="my-project-card is-${escapeHtml(object.status)}${collapsed ? ' is-collapsed' : ''}" data-my-project="${escapeHtml(object.id)}"><header><button class="my-project-object-open" type="button" data-toggle-my-project="${escapeHtml(object.id)}" aria-expanded="${String(!collapsed)}" aria-label="${escapeHtml(toggleLabel)}"><span class="my-project-mark" aria-hidden="true">▰</span><span><small>STRUCTOS OBJECT</small><h2>${escapeHtml(object.name)}</h2><em class="my-project-section-name">${escapeHtml(tr('projectNameStep'))}: ${escapeHtml(projectSection)}</em><span class="my-project-badges"><b>${escapeHtml(tr('fullCycleObject'))}</b><b class="is-${escapeHtml(object.status)}">${escapeHtml(tr(statusKey))}</b></span></span><i aria-hidden="true">⌄</i></button><div class="my-project-card-actions"><button class="outline-button" type="button" data-open-project-object="${escapeHtml(object.id)}">${escapeHtml(tr('openDocument'))}</button><button class="outline-button my-project-rename-section-button" type="button" data-my-project-rename-section="${escapeHtml(object.id)}">✎ ${escapeHtml(tr('projectNameStep'))}</button><button class="my-project-delete-button" type="button" data-delete-project="${escapeHtml(object.id)}">${escapeHtml(tr('deleteProject'))}</button></div></header><div class="my-project-card-content"${collapsed ? ' hidden' : ''}><div class="my-project-documents">${documents}</div><footer><span>${escapeHtml(tr('lastProjectUpdate'))}: ${escapeHtml(formatObjectDate(updatedAt))}</span><span>${escapeHtml(tr('memoryUsed'))}: ${escapeHtml(formatStorage(usedBytes))}</span></footer></div></article>`;
}

function renderMyProjects() {
  const projects = myProjectObjects();
  $$('[data-my-projects-list]').forEach((list) => {
    list.innerHTML = projects.map(myProjectMarkup).join('');
    $$('[data-my-project]', list).forEach((card) => {
      $('[data-toggle-my-project]', card)?.addEventListener('click', (event) => toggleMyProjectCard(event.currentTarget.dataset.toggleMyProject));
      $('[data-launch-project]', card)?.addEventListener('click', (event) => { event.stopPropagation(); openProjectLaunchDialog(event.currentTarget.dataset.launchProject); });
      $('[data-open-project-object]', card)?.addEventListener('click', (event) => { event.stopPropagation(); openObjectCard(event.currentTarget.dataset.openProjectObject); });
      $('[data-my-project-rename-section]', card)?.addEventListener('click', (event) => { event.stopPropagation(); renameProjectSection(event.currentTarget.dataset.myProjectRenameSection); });
      $('[data-delete-project]', card)?.addEventListener('click', (event) => { event.stopPropagation(); deleteProjectObject(event.currentTarget.dataset.deleteProject); });
      $$('[data-my-project-rename-document]', card).forEach((button) => button.addEventListener('click', () => renameProjectDocument(button.dataset.objectId, button.dataset.myProjectRenameDocument)));
      $$('[data-my-project-upload]', card).forEach((button) => button.addEventListener('click', () => openUploadDialog(button.dataset.myProjectUpload, button.dataset.objectId, button.dataset.versionMode)));
      $$('[data-toggle-project-version]', card).forEach((button) => button.addEventListener('click', () => toggleProjectVersionResult(button.dataset.objectId, button.dataset.kind, button.dataset.toggleProjectVersion)));
      $$('[data-analyze-project-version]', card).forEach((button) => button.addEventListener('click', () => analyzeObjectDocument(button.dataset.objectId, button.dataset.kind, button.dataset.analyzeProjectVersion, { inline: true })));
      $$('[data-open-project-version]', card).forEach((button) => button.addEventListener('click', () => openAnalyzedDocument(button.dataset.objectId, button.dataset.kind, button.dataset.openProjectVersion)));
      $$('[data-delete-project-version]', card).forEach((button) => button.addEventListener('click', () => deleteObjectDocumentVersion(button.dataset.objectId, button.dataset.kind, button.dataset.deleteProjectVersion)));
      $$('[data-show-project-comparison]', card).forEach((button) => button.addEventListener('click', () => showProjectComparison(button.dataset.objectId, button.dataset.showProjectComparison)));
      $$('[data-toggle-project-comparison]', card).forEach((button) => button.addEventListener('click', () => toggleProjectComparison(button.dataset.objectId, button.dataset.toggleProjectComparison)));
      $$('[data-project-version-tab]', card).forEach((button) => button.addEventListener('click', () => selectProjectVersionTab(button.dataset.objectId, button.dataset.kind, button.dataset.versionId, button.dataset.projectVersionTab)));
    });
  });
  $$('[data-my-projects-count]').forEach((count) => { count.textContent = String(projects.length); });
  $$('[data-my-projects-empty]').forEach((empty) => { empty.hidden = projects.length > 0; });
}

function commercialProposalCreationCardMarkup(kind) {
  const draft = commercialProposalDrafts[kind];
  const rule = uploadRules[kind];
  const isProject = kind === 'project';
  const titleKey = isProject ? 'createProposalByProject' : 'createProposalByEstimate';
  const hintKey = isProject ? 'proposalCreateProjectHint' : 'proposalCreateEstimateHint';
  const selectedFile = draft.file
    ? `<div class="proposal-create-selected-file"><span aria-hidden="true">${isProject ? '▤' : 'Σ'}</span><div><strong>${escapeHtml(draft.file.name)}</strong><small>${escapeHtml(fileFormatLabel(draft.file))} · ${escapeHtml(fileSize(draft.file.size))}</small></div><button type="button" data-proposal-replace-file="${kind}">${escapeHtml(tr('replace'))}</button><button class="proposal-create-delete-file" type="button" data-proposal-delete-file="${kind}" aria-label="${escapeHtml(tr('deleteFile'))}" title="${escapeHtml(tr('deleteFile'))}">×</button></div>`
    : `<div class="proposal-create-dropzone" data-proposal-dropzone="${kind}" role="button" tabindex="0"><span aria-hidden="true">↑</span><div><strong>${escapeHtml(tr('selectFile'))}</strong><small>${escapeHtml(tr('dropFile'))} · ${escapeHtml(rule.formats)} · ${rule.maxMb} МБ</small></div></div>`;
  const createAction = draft.file
    ? `<button class="primary-button proposal-create-submit" type="button" data-create-commercial-proposal="${kind}"${draft.busy || !draft.objectName.trim() || !draft.sectionName.trim() ? ' disabled' : ''}>${escapeHtml(tr(draft.busy ? 'creatingCommercialProposal' : 'createCommercialProposal'))}</button>`
    : '';
  return `<article class="proposal-create-card is-${kind}${draft.busy ? ' is-busy' : ''}" data-commercial-proposal-create-card="${kind}"><header><span aria-hidden="true">${isProject ? '▤' : 'Σ'}</span><div><h2>${escapeHtml(tr(titleKey))}</h2><p>${escapeHtml(tr(hintKey))}</p></div></header><div class="proposal-create-fields"><label><span>${escapeHtml(tr('objectName'))} <em>*</em></span><input type="text" maxlength="100" data-proposal-object-name="${kind}" value="${escapeHtml(draft.objectName)}" placeholder="${escapeHtml(tr('objectPlaceholder'))}" autocomplete="organization" /></label><label><span>${escapeHtml(tr('proposalSectionField'))} <em>*</em></span><input type="text" maxlength="140" data-proposal-section-name="${kind}" value="${escapeHtml(draft.sectionName)}" placeholder="${escapeHtml(tr('proposalSectionPlaceholder'))}" /></label></div><input class="hidden-file-input" type="file" data-proposal-file-input="${kind}" accept="${escapeHtml(rule.accept)}" />${selectedFile}<small class="proposal-create-file-hint">${escapeHtml(tr('proposalFileHint'))}</small>${createAction}</article>`;
}

function updateCommercialProposalCreateButton(card, kind) {
  const draft = commercialProposalDrafts[kind];
  const button = $('[data-create-commercial-proposal]', card);
  if (button) button.disabled = draft.busy || !draft.file || !draft.objectName.trim() || !draft.sectionName.trim();
}

function chooseCommercialProposalFile(kind, file) {
  if (!file || !commercialProposalDrafts[kind]) return;
  const rule = uploadRules[kind];
  if (file.size > rule.maxMb * 1024 * 1024) { showToast(`${tr('fileTooLarge')}: ${rule.maxMb} МБ`); return; }
  if (!isAllowedFile(file, rule)) { showToast(`${tr('unsupportedFormat')}: ${rule.formats}`); return; }
  const draft = commercialProposalDrafts[kind];
  draft.file = fileMetadata(file);
  draft.sourceFile = file;
  renderCommercialProposalCreators();
  showToast(`${tr('fileSelected')}: ${file.name}`);
}

function renderCommercialProposalCreators() {
  $$('[data-proposal-create-actions]').forEach((rootElement) => {
    rootElement.innerHTML = ['project', 'estimate'].map(commercialProposalCreationCardMarkup).join('');
    $$('[data-commercial-proposal-create-card]', rootElement).forEach((card) => {
      const kind = card.dataset.commercialProposalCreateCard;
      const draft = commercialProposalDrafts[kind];
      const objectInput = $('[data-proposal-object-name]', card);
      const sectionInput = $('[data-proposal-section-name]', card);
      const fileInput = $('[data-proposal-file-input]', card);
      objectInput?.addEventListener('input', () => { draft.objectName = objectInput.value.slice(0, 100); objectInput.removeAttribute('aria-invalid'); updateCommercialProposalCreateButton(card, kind); });
      sectionInput?.addEventListener('input', () => { draft.sectionName = sectionInput.value.slice(0, 140); sectionInput.removeAttribute('aria-invalid'); updateCommercialProposalCreateButton(card, kind); });
      fileInput?.addEventListener('change', () => { chooseCommercialProposalFile(kind, fileInput.files?.[0]); fileInput.value = ''; });
      $('[data-proposal-replace-file]', card)?.addEventListener('click', () => fileInput?.click());
      $('[data-proposal-delete-file]', card)?.addEventListener('click', () => {
        draft.file = null;
        draft.sourceFile = null;
        renderCommercialProposalCreators();
        showToast(tr('fileDeleted'));
      });
      const dropzone = $('[data-proposal-dropzone]', card);
      dropzone?.addEventListener('click', () => fileInput?.click());
      dropzone?.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); fileInput?.click(); } });
      ['dragenter', 'dragover'].forEach((type) => dropzone?.addEventListener(type, (event) => { event.preventDefault(); dropzone.classList.add('is-dragging'); }));
      ['dragleave', 'drop'].forEach((type) => dropzone?.addEventListener(type, (event) => { event.preventDefault(); dropzone.classList.remove('is-dragging'); }));
      dropzone?.addEventListener('drop', (event) => {
        if (event.dataTransfer.files.length > 1) showToast(tr('onlyOneFile'));
        chooseCommercialProposalFile(kind, event.dataTransfer.files?.[0]);
      });
      $('[data-create-commercial-proposal]', card)?.addEventListener('click', () => createCommercialProposalFromDraft(kind));
    });
  });
}

async function createCommercialProposalFromDraft(kind) {
  const draft = commercialProposalDrafts[kind];
  const card = $(`[data-commercial-proposal-create-card="${kind}"]`);
  const objectInput = $('[data-proposal-object-name]', card);
  const sectionInput = $('[data-proposal-section-name]', card);
  draft.objectName = objectInput?.value.trim().slice(0, 100) || draft.objectName.trim().slice(0, 100);
  draft.sectionName = sectionInput?.value.trim().slice(0, 140) || draft.sectionName.trim().slice(0, 140);
  if (!draft.objectName) { objectInput?.setAttribute('aria-invalid', 'true'); objectInput?.focus(); showToast(tr('objectRequired')); return; }
  if (!draft.sectionName) { sectionInput?.setAttribute('aria-invalid', 'true'); sectionInput?.focus(); showToast(tr('projectNameRequired')); return; }
  if (!draft.file) { showToast(tr('selectFile')); return; }
  draft.busy = true;
  renderCommercialProposalCreators();
  try {
    const uploadedAt = new Date().toISOString();
    const sourceCatalog = draft.sourceFile ? await extractCashSourceCatalogFromFile(draft.sourceFile, kind) : [];
    const sourceFile = {
      ...draft.file,
      kind,
      projectSection: draft.sectionName,
      addedAt: uploadedAt,
      analysisPending: true,
      analyzedAt: null,
      sourceCatalog,
      sourceCatalogScanned: Boolean(draft.sourceFile)
    };
    const storedFile = normalizeFileRecord({ ...sourceFile, versions: [fileVersionSnapshot(sourceFile)], comparison: null });
    const proposal = {
      id: `proposal-${createObjectId()}`,
      objectName: draft.objectName,
      sectionName: draft.sectionName,
      kind,
      status: 'analyzing',
      createdAt: uploadedAt,
      updatedAt: uploadedAt,
      analyzedAt: null,
      file: storedFile
    };
    commercialProposalRecords.unshift(proposal);
    activeCommercialProposalResultTab = 'smr';
    saveCommercialProposalRecords();
    commercialProposalDrafts[kind] = { objectName: '', sectionName: '', file: null, sourceFile: null, busy: false };
    renderCommercialProposals();
    clearTimeout(commercialProposalAnalysisTimer);
    showDialog(escapeHtml(tr('creatingCommercialProposal')), escapeHtml(tr('proposalSectionStorage')), `<div class="analysis-loader" data-proposal-analysis-id="${escapeHtml(proposal.id)}"><span></span><span></span><span></span></div>`);
    commercialProposalAnalysisTimer = setTimeout(() => {
      const storedProposal = commercialProposalRecords.find((item) => item.id === proposal.id);
      const version = latestDocumentVersion(storedProposal?.file);
      if (!storedProposal || !version) return;
      const analyzedAt = new Date().toISOString();
      const patch = { analysisPending: false, analyzedAt };
      if (storedProposal.kind === 'project') patch.estimateBreakdown = projectEstimateSnapshot(version);
      updateDocumentVersion(storedProposal.file, version.id, patch);
      storedProposal.file = normalizeFileRecord(storedProposal.file);
      storedProposal.status = 'ready';
      storedProposal.analyzedAt = analyzedAt;
      storedProposal.updatedAt = analyzedAt;
      saveCommercialProposalRecords();
      renderCommercialProposals();
      if ($(`[data-proposal-analysis-id="${proposal.id}"]`)) $('[data-dialog]')?.close();
      setPanel('proposals');
      showToast(tr('commercialProposalCreated'));
    }, 1100);
  } catch (error) {
    console.warn('StructOS commercial proposal creation failed:', error);
    draft.busy = false;
    renderCommercialProposalCreators();
    showToast(tr('proposalCreateFailed'));
  }
}

function commercialProposalCardMarkup(proposal) {
  const version = latestDocumentVersion(proposal.file);
  const ready = proposal.status === 'ready' && isDocumentVersionAnalyzed(version);
  const sourceLabel = tr(proposal.kind === 'project' ? 'proposalByProject' : 'proposalByEstimate');
  return `<article class="commercial-proposal-card${ready ? ' is-ready' : ' is-pending'}"><header><span aria-hidden="true">₽</span><div><small>${escapeHtml(proposal.sectionName)}</small><h2>${escapeHtml(proposal.objectName)}</h2><p>${escapeHtml(sourceLabel)} · ${escapeHtml(version?.name || '')}</p></div><b>${escapeHtml(tr(ready ? 'proposalReady' : 'proposalAwaitingAnalysis'))}</b></header><footer><span>${escapeHtml(formatObjectDate(proposal.createdAt))} · ${escapeHtml(tr('proposalSectionStorage'))}</span><button class="${ready ? 'outline-button' : 'primary-button'}" type="button" data-open-commercial-proposal="${escapeHtml(proposal.id)}">${escapeHtml(tr(ready ? 'openCommercialProposal' : 'proposalAwaitingAnalysis'))} →</button></footer></article>`;
}

function openCommercialProposalCard(proposalId, preserveTab = false) {
  const proposal = commercialProposalRecords.find((item) => item.id === proposalId);
  const version = latestDocumentVersion(proposal?.file);
  if (!proposal || !version) return;
  if (!preserveTab) activeCommercialProposalResultTab = 'smr';
  const ready = proposal.status === 'ready' && isDocumentVersionAnalyzed(version);
  const sourceLabel = tr(proposal.kind === 'project' ? 'proposalByProject' : 'proposalByEstimate');
  const result = ready
    ? `<section class="object-proposal-result"><div class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></div>${commercialProposalResultMarkup(version, proposal.kind)}</section>`
    : `<section class="object-proposal-pending"><span aria-hidden="true">⌛</span><div><strong>${escapeHtml(tr('proposalAwaitingAnalysis'))}</strong><p>${escapeHtml(tr('creatingCommercialProposal'))}</p></div></section>`;
  const markup = `<section class="object-proposal-workspace"><header><span aria-hidden="true">₽</span><div><small>${escapeHtml(proposal.sectionName)}</small><h2>${escapeHtml(sourceLabel)}</h2><p>${escapeHtml(tr('proposalSource'))}: ${escapeHtml(version.name)}</p></div><b class="${ready ? 'is-ready' : 'is-pending'}">${escapeHtml(tr(ready ? 'proposalReady' : 'proposalAwaitingAnalysis'))}</b></header><div class="analysis-truth-note"><span>i</span><p>${escapeHtml(tr('proposalSectionStorage'))}</p></div>${result}</section>`;
  showDialog(escapeHtml(proposal.objectName), escapeHtml(proposal.sectionName), markup);
  $$('[data-commercial-proposal-result-tab]', $('[data-dialog-content]')).forEach((button) => button.addEventListener('click', () => {
    activeCommercialProposalResultTab = button.dataset.commercialProposalResultTab;
    openCommercialProposalCard(proposal.id, true);
  }));
}

function renderCommercialProposals() {
  renderCommercialProposalCreators();
  const proposals = commercialProposalRecords.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const markup = proposals.map(commercialProposalCardMarkup).join('');
  $$('[data-commercial-proposals-list]').forEach((list) => {
    list.innerHTML = markup;
    $$('[data-open-commercial-proposal]', list).forEach((button) => button.addEventListener('click', () => openCommercialProposalCard(button.dataset.openCommercialProposal)));
  });
  $$('[data-commercial-proposals-count]').forEach((count) => { count.textContent = String(proposals.length); });
  $$('[data-commercial-proposals-empty]').forEach((empty) => { empty.hidden = proposals.length > 0; });
}

const projectAnalysisTabs = [
  { id: 'proposal', label: 'commercialProposal', icon: '₽' },
  { id: 'sheets', label: 'projectBySheets', icon: '▤' },
  { id: 'systems', label: 'projectBySystems', icon: '⌘' },
  { id: 'materials', label: 'projectMaterials', icon: '◇' },
  { id: 'boq', label: 'billOfQuantities', icon: '≡' }
];

function isObjectDocumentAnalyzed(object, file) {
  if (!object || !file) return false;
  return isDocumentVersionAnalyzed(latestDocumentVersion(file));
}

function analysisEmptyTable(columns) {
  return `<div class="analysis-detail-table-scroll"><table class="analysis-detail-table"><thead><tr>${columns.map((key) => `<th>${escapeHtml(tr(key))}</th>`).join('')}</tr></thead><tbody><tr class="analysis-detail-empty-row"><td colspan="${columns.length}"><span>◇</span><strong>${escapeHtml(tr('extractionPending'))}</strong><small>${escapeHtml(tr('extractionPendingCopy'))}</small></td></tr></tbody></table></div>`;
}

const PROJECT_ESTIMATE_GROUP_ALIASES = Object.freeze({
  installationWorks: new Set(['installationworks', 'mountingworks', 'works', 'workitems', 'services', 'монтажныеработы', 'работы', 'услуги']),
  associatedWorks: new Set(['associatedworks', 'companionworks', 'additionalworks', 'relatedworks', 'hiddenworks', 'auxiliaryworks', 'сопутствующиеработы', 'дополнительныеработы', 'скрытыеработы']),
  projectMaterials: new Set(['projectmaterials', 'materials', 'materialitems', 'equipment', 'specification', 'specifications', 'материалы', 'оборудование', 'спецификация']),
  associatedMaterials: new Set(['associatedmaterials', 'companionmaterials', 'mountingmaterials', 'consumables', 'auxiliarymaterials', 'relatedmaterials', 'сопутствующиематериалы', 'монтажныематериалы', 'расходныематериалы'])
});

function mergeProjectEstimateItems(entries) {
  const merged = new Map();
  (Array.isArray(entries) ? entries : []).filter(Boolean).forEach((entry) => {
    const normalized = normalizeCashSourceCatalogEntry(entry, entry);
    if (!normalized) return;
    const item = { ...normalized, origin: entry.origin === 'analysis' ? 'analysis' : 'project' };
    const key = cashSourceKey(item.name);
    const current = merged.get(key);
    if (!current) merged.set(key, item);
    else merged.set(key, {
      ...current,
      unit: current.unit || item.unit,
      quantity: current.quantity || item.quantity,
      price: current.price || item.price,
      sourceSheet: current.sourceSheet || item.sourceSheet,
      sourceName: current.sourceName || item.sourceName,
      origin: current.origin === 'project' || item.origin === 'project' ? 'project' : 'analysis'
    });
  });
  return [...merged.values()].sort((left, right) => left.name.localeCompare(right.name, root.lang || 'ru')).slice(0, 500);
}

function projectEstimateEntriesFromValue(value, defaults = {}) {
  const values = Array.isArray(value)
    ? value
    : value && typeof value === 'object'
      ? [value, ...cashSourceCatalogFromStructuredData(value, defaults)]
      : [];
  return mergeProjectEstimateItems(values.map((entry) => {
    const normalized = normalizeCashSourceCatalogEntry(entry, defaults);
    return normalized ? { ...normalized, origin: defaults.origin || entry?.origin } : null;
  }));
}

function collectProjectEstimateGroups(rootValue, groups, depth = 0) {
  if (!rootValue || typeof rootValue !== 'object' || depth > 6) return;
  Object.entries(rootValue).forEach(([key, child]) => {
    const normalizedKey = cashSourceKey(key);
    const groupKey = Object.entries(PROJECT_ESTIMATE_GROUP_ALIASES).find(([, aliases]) => aliases.has(normalizedKey))?.[0];
    if (groupKey) {
      groups[groupKey].push(...projectEstimateEntriesFromValue(child, {
        sourceKind: 'project',
        sourceName: tr(groupKey === 'projectMaterials' || groupKey === 'installationWorks' ? 'extractedFromProject' : 'identifiedByAnalysis'),
        category: groupKey.includes('Works') ? 'work' : 'material',
        origin: groupKey === 'projectMaterials' || groupKey === 'installationWorks' ? 'project' : 'analysis'
      }));
    }
    if (child && typeof child === 'object') collectProjectEstimateGroups(child, groups, depth + 1);
  });
}

function projectEstimateCatalogGroup(entry) {
  if (entry.category === 'work') return 'installationWorks';
  if (entry.category === 'material') return 'projectMaterials';
  const key = cashSourceKey(entry.name);
  if (/(монтаж|установ|проклад|демонтаж|пусконалад|испытан|настрой|подключ|работ|услуг|install|mount|laying|testing|commission|service)/u.test(key)) return 'installationWorks';
  return 'projectMaterials';
}

function derivedProjectEstimateItem(entry, groupKey) {
  const prefix = groupKey === 'installationWorks' ? tr('installationWorks') : groupKey === 'associatedWorks' ? tr('associatedWorks') : tr('associatedInstallationMaterials');
  return {
    name: `${prefix}: ${entry.name}`,
    unit: groupKey === 'installationWorks' ? entry.unit : '',
    quantity: groupKey === 'installationWorks' ? entry.quantity : 0,
    price: 0,
    category: groupKey.includes('Works') ? 'work' : 'material',
    sourceKind: 'project',
    sourceName: tr('identifiedByAnalysis'),
    sourceSheet: entry.sourceSheet || '',
    origin: 'analysis'
  };
}

function projectEstimateBreakdown(version, kind = 'project', options = {}) {
  const groups = { installationWorks: [], associatedWorks: [], projectMaterials: [], associatedMaterials: [] };
  const roots = [
    version?.estimateBreakdown,
    version?.analysisData,
    version?.analysisResult,
    version?.result,
    version?.extractedData,
    version?.extraction,
    { works: version?.works, services: version?.services, materials: version?.materials, equipment: version?.equipment, specification: version?.specification }
  ];
  roots.forEach((rootValue) => collectProjectEstimateGroups(rootValue, groups));
  cashSourceCatalogFromFileRecord(version, kind).forEach((entry) => {
    groups[projectEstimateCatalogGroup(entry)].push({ ...entry, origin: 'project' });
  });
  Object.keys(groups).forEach((groupKey) => { groups[groupKey] = mergeProjectEstimateItems(groups[groupKey]); });
  if (options.derive === false || !groups.projectMaterials.length) return groups;
  if (!groups.installationWorks.length) groups.installationWorks = mergeProjectEstimateItems(groups.projectMaterials.map((entry) => derivedProjectEstimateItem(entry, 'installationWorks')));
  if (!groups.associatedWorks.length) groups.associatedWorks = mergeProjectEstimateItems(groups.projectMaterials.map((entry) => derivedProjectEstimateItem(entry, 'associatedWorks')));
  if (!groups.associatedMaterials.length) groups.associatedMaterials = mergeProjectEstimateItems(groups.projectMaterials.map((entry) => derivedProjectEstimateItem(entry, 'associatedMaterials')));
  return groups;
}

function projectEstimateSnapshot(version) {
  const groups = projectEstimateBreakdown(version, 'project', { derive: false });
  return { generatedAt: new Date().toISOString(), ...groups };
}

function projectEstimateGroupMarkup(groupKey, entries, icon) {
  const sourceKey = groupKey === 'installationWorks' || groupKey === 'projectMaterials' ? 'extractedFromProject' : 'identifiedByAnalysis';
  const labelKey = groupKey === 'associatedMaterials' ? 'associatedInstallationMaterials' : groupKey;
  const body = entries.length
    ? `<div class="project-estimate-list">${entries.slice(0, 200).map((entry) => `<article><span>${escapeHtml(icon)}</span><div><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.sourceSheet || entry.sourceName || tr(sourceKey))}</small></div><b>${entry.quantity ? escapeHtml(String(entry.quantity)) : '—'}${entry.unit ? ` ${escapeHtml(entry.unit)}` : ''}</b></article>`).join('')}</div>`
    : `<div class="project-estimate-empty"><span>◇</span><p>${escapeHtml(tr('estimateGroupPending'))}</p></div>`;
  return `<section class="project-estimate-group"><header><span>${escapeHtml(icon)}</span><div><h4>${escapeHtml(tr(labelKey))}</h4><small>${escapeHtml(tr(sourceKey))}</small></div><b>${entries.length}</b></header>${body}</section>`;
}

function projectEstimateBreakdownMarkup(version, kind = 'project') {
  const groups = projectEstimateBreakdown(version, kind);
  const worksCount = groups.installationWorks.length + groups.associatedWorks.length;
  const materialsCount = groups.projectMaterials.length + groups.associatedMaterials.length;
  return `<section class="project-estimate-breakdown"><header><div><span class="eyebrow">STRUCTOS ESTIMATE</span><h3>${escapeHtml(tr('projectEstimate'))}</h3><p>${escapeHtml(tr('estimateAnalysisSummary'))}</p></div><div><b>${worksCount}</b><small>${escapeHtml(tr('works'))}</small><b>${materialsCount}</b><small>${escapeHtml(tr('materials'))}</small></div></header><div class="project-estimate-columns"><article class="project-estimate-column is-works"><header><span>⚒</span><div><h3>${escapeHtml(tr('installationEstimate'))}</h3><small>${worksCount} · ${escapeHtml(tr('works'))}</small></div></header>${projectEstimateGroupMarkup('installationWorks', groups.installationWorks, 'W')}${projectEstimateGroupMarkup('associatedWorks', groups.associatedWorks, '+')}</article><article class="project-estimate-column is-materials"><header><span>◇</span><div><h3>${escapeHtml(tr('projectMaterialsEquipment'))}</h3><small>${materialsCount} · ${escapeHtml(tr('materials'))}</small></div></header>${projectEstimateGroupMarkup('projectMaterials', groups.projectMaterials, 'M')}${projectEstimateGroupMarkup('associatedMaterials', groups.associatedMaterials, '+')}</article></div></section>`;
}

const COMMERCIAL_PROPOSAL_GROUP_ALIASES = Object.freeze({
  specificationWorks: new Set(['specificationWorks', 'worksBySpecification', 'projectSpecificationWorks', 'installationWorks', 'mountingWorks', 'works', 'workItems', 'services', 'по спецификации проекта', 'работы по спецификации', 'монтажные работы', 'работы', 'услуги'].map(cashSourceKey)),
  outsideSpecificationWorks: new Set(['outsideSpecificationWorks', 'nonSpecificationWorks', 'unlistedWorks', 'unaccountedWorks', 'additionalProjectWorks', 'вне спецификации по проекту', 'вне спецификации', 'неучтенные работы', 'неучтённые работы'].map(cashSourceKey)),
  possibleWorks: new Set(['possibleWorks', 'potentialWorks', 'projectPossibleWorks', 'optionalWorks', 'worksPossibleByProject', 'работы возможные по проекту', 'возможные работы', 'предполагаемые работы'].map(cashSourceKey)),
  associatedWorks: new Set(['associatedWorks', 'companionWorks', 'relatedWorks', 'hiddenWorks', 'auxiliaryWorks', 'сопутствующие работы', 'дополнительные работы', 'скрытые работы'].map(cashSourceKey)),
  equipment: new Set(['equipment', 'equipmentItems', 'devices', 'projectEquipment', 'оборудование', 'приборы', 'устройства'].map(cashSourceKey)),
  materials: new Set(['materials', 'materialItems', 'projectMaterials', 'specification', 'specifications', 'материалы', 'спецификация'].map(cashSourceKey)),
  toolsAndConsumables: new Set(['toolsAndConsumables', 'tools', 'tooling', 'instruments', 'инструмент и расходник', 'инструменты', 'оснастка'].map(cashSourceKey)),
  consumableMaterials: new Set(['consumableMaterials', 'consumables', 'associatedMaterials', 'mountingMaterials', 'расходные материалы', 'сопутствующие материалы', 'монтажные материалы'].map(cashSourceKey)),
  laborHours: new Set(['laborHours', 'labourHours', 'manHours', 'personHours', 'workHours', 'laborCosts', 'человеко часы', 'человеко-часы', 'трудозатраты'].map(cashSourceKey))
});

const COMMERCIAL_PROPOSAL_GROUPS = Object.freeze({
  specificationWorks: { label: 'specificationProjectWorks', icon: '01', count: 'quantityCount' },
  outsideSpecificationWorks: { label: 'outsideSpecificationProjectWorks', icon: '02', count: 'quantityCount' },
  possibleWorks: { label: 'possibleProjectWorks', icon: '03', count: 'quantityCount' },
  associatedWorks: { label: 'proposalAssociatedWorks', icon: '04', count: 'quantityCount' },
  equipment: { label: 'proposalEquipment', icon: 'E', count: 'quantityCount' },
  materials: { label: 'proposalMaterialItems', icon: 'M', count: 'quantityCount' },
  toolsAndConsumables: { label: 'toolsAndConsumables', icon: 'T', count: 'positionsCount' },
  consumableMaterials: { label: 'consumableMaterials', icon: 'R', count: 'quantityCount' },
  laborHours: { label: 'laborHourCosts', icon: 'H', count: 'quantityCount' }
});

const COMMERCIAL_PROPOSAL_RESULT_TABS = Object.freeze([
  { id: 'smr', label: 'proposalSmr', icon: '⚒', groups: ['specificationWorks', 'outsideSpecificationWorks', 'possibleWorks', 'associatedWorks'] },
  { id: 'materials', label: 'proposalMaterials', icon: '◇', groups: ['equipment', 'materials'] },
  { id: 'required', label: 'proposalRequired', icon: '＋', groups: ['toolsAndConsumables', 'consumableMaterials', 'laborHours'] }
]);

function commercialProposalEntriesFromValue(value, groupKey, kind = 'project') {
  const isWork = ['specificationWorks', 'outsideSpecificationWorks', 'possibleWorks', 'associatedWorks', 'laborHours'].includes(groupKey);
  const isProjectSource = ['specificationWorks', 'equipment', 'materials'].includes(groupKey);
  const defaults = {
    sourceKind: kind,
    sourceName: tr(isProjectSource ? 'proposalSource' : 'identifiedByAnalysis'),
    category: isWork ? 'work' : 'material',
    origin: isProjectSource ? 'project' : 'analysis'
  };
  if (groupKey === 'laborHours') {
    const rawTotal = typeof value === 'number' || typeof value === 'string'
      ? value
      : cashSourceProperty(value, ['total', 'hours', 'quantity', 'amount', 'часы', 'количество', 'трудозатраты']);
    const total = cashSourceNumber(rawTotal);
    if (total > 0) {
      const entry = normalizeCashSourceCatalogEntry({ name: tr('laborHourCosts'), quantity: total, unit: tr('personHoursUnit') }, defaults);
      return entry ? [{ ...entry, origin: 'analysis' }] : [];
    }
  }
  return projectEstimateEntriesFromValue(value, defaults);
}

function collectCommercialProposalGroups(rootValue, groups, kind = 'project', depth = 0) {
  if (!rootValue || typeof rootValue !== 'object' || depth > 7) return;
  Object.entries(rootValue).forEach(([key, child]) => {
    const normalizedKey = cashSourceKey(key);
    const groupKey = Object.entries(COMMERCIAL_PROPOSAL_GROUP_ALIASES).find(([, aliases]) => aliases.has(normalizedKey))?.[0];
    if (groupKey) groups[groupKey].push(...commercialProposalEntriesFromValue(child, groupKey, kind));
    if (child && typeof child === 'object') collectCommercialProposalGroups(child, groups, kind, depth + 1);
  });
}

function commercialProposalCatalogGroup(entry) {
  const key = cashSourceKey(entry.name);
  if (/(человекочас|трудозатрат|laborhours?|labourhours?|manhours?|personhours?)/u.test(key)) return 'laborHours';
  if (/(внеспецификац|неучтен|неучтён|outsidespecification|nonspecification|unlisted|unaccounted)/u.test(key)) return 'outsideSpecificationWorks';
  if (/(возможн|предполагаем|possiblework|potentialwork|optionalwork)/u.test(key)) return 'possibleWorks';
  if (/(сопутств|скрыт.*работ|associatedwork|companionwork|relatedwork|auxiliarywork|hiddenwork)/u.test(key)) return 'associatedWorks';
  if (/(инструмент|оснаст|tooling|tools?)/u.test(key)) return 'toolsAndConsumables';
  if (/(расходн|крепеж|крепёж|герметик|изолент|consumable)/u.test(key)) return 'consumableMaterials';
  if (/(оборудован|прибор|устройств|светильник|шкаф|щит|насос|вентилятор|equipment|device|fixture|panel|pump|fan)/u.test(key)) return 'equipment';
  if (entry.category === 'work' || /(монтаж|установ|проклад|демонтаж|пусконалад|испытан|настрой|подключ|работ|услуг|install|mount|laying|testing|commission|service)/u.test(key)) return 'specificationWorks';
  return 'materials';
}

function commercialProposalBreakdown(version, kind = 'project') {
  const groups = Object.fromEntries(Object.keys(COMMERCIAL_PROPOSAL_GROUPS).map((key) => [key, []]));
  const roots = [
    version?.commercialProposal,
    version?.proposalBreakdown,
    version?.estimateBreakdown,
    version?.analysisData,
    version?.analysisResult,
    version?.result,
    version?.extractedData,
    version?.extraction,
    { works: version?.works, services: version?.services, materials: version?.materials, equipment: version?.equipment, specification: version?.specification }
  ];
  roots.forEach((rootValue) => collectCommercialProposalGroups(rootValue, groups, kind));
  const claimedEntries = new Set(Object.values(groups).flat().map((entry) => cashSourceKey(entry.name)));
  cashSourceCatalogFromFileRecord(version, kind).forEach((entry) => {
    const entryKey = cashSourceKey(entry.name);
    if (claimedEntries.has(entryKey)) return;
    groups[commercialProposalCatalogGroup(entry)].push(entry);
    claimedEntries.add(entryKey);
  });
  Object.keys(groups).forEach((groupKey) => { groups[groupKey] = mergeProjectEstimateItems(groups[groupKey]); });
  return groups;
}

function commercialProposalGroupMetric(groupKey, entries) {
  if (groupKey !== 'laborHours') return entries.length;
  const hours = entries.reduce((total, entry) => total + (Number(entry.quantity) || 0), 0);
  return hours > 0 ? Math.round(hours * 100) / 100 : entries.length;
}

function commercialProposalGroupMarkup(groupKey, entries) {
  const config = COMMERCIAL_PROPOSAL_GROUPS[groupKey];
  const count = commercialProposalGroupMetric(groupKey, entries);
  const body = entries.length
    ? `<div class="project-estimate-list">${entries.slice(0, 200).map((entry) => `<article><span>${escapeHtml(config.icon)}</span><div><strong>${escapeHtml(entry.name)}</strong><small>${escapeHtml(entry.sourceSheet || entry.sourceName || tr('identifiedByAnalysis'))}</small></div><b>${entry.quantity ? escapeHtml(String(entry.quantity)) : '—'}${entry.unit ? ` ${escapeHtml(entry.unit)}` : ''}</b></article>`).join('')}</div>`
    : `<div class="project-estimate-empty"><span>◇</span><p>${escapeHtml(tr('estimateGroupPending'))}</p></div>`;
  return `<section class="project-estimate-group commercial-proposal-result-group"><header><span>${escapeHtml(config.icon)}</span><div><h4>${escapeHtml(tr(config.label))}</h4><small>${escapeHtml(tr(config.count))}: ${escapeHtml(String(count))}</small></div><b>${escapeHtml(String(count))}</b></header>${body}</section>`;
}

function commercialProposalResultMarkup(version, kind = 'project') {
  const groups = commercialProposalBreakdown(version, kind);
  const activeTab = COMMERCIAL_PROPOSAL_RESULT_TABS.find((tab) => tab.id === activeCommercialProposalResultTab) || COMMERCIAL_PROPOSAL_RESULT_TABS[0];
  const summary = {
    smr: COMMERCIAL_PROPOSAL_RESULT_TABS[0].groups.reduce((total, key) => total + groups[key].length, 0),
    materials: COMMERCIAL_PROPOSAL_RESULT_TABS[1].groups.reduce((total, key) => total + groups[key].length, 0),
    required: COMMERCIAL_PROPOSAL_RESULT_TABS[2].groups.reduce((total, key) => total + groups[key].length, 0)
  };
  const tabs = COMMERCIAL_PROPOSAL_RESULT_TABS.map((tab) => `<button class="${tab.id === activeTab.id ? 'is-active' : ''}" type="button" data-commercial-proposal-result-tab="${tab.id}" aria-selected="${String(tab.id === activeTab.id)}"><span>${tab.icon}</span><strong>${escapeHtml(tr(tab.label))}</strong><b>${summary[tab.id]}</b></button>`).join('');
  const totals = COMMERCIAL_PROPOSAL_RESULT_TABS.map((tab) => `<span><b>${summary[tab.id]}</b><small>${escapeHtml(tr(tab.label))}</small></span>`).join('');
  return `<section class="commercial-proposal-intelligence"><header><div><span class="eyebrow">STRUCTOS INTELLIGENCE</span><h3>${escapeHtml(tr('foundByIntelligence'))}</h3><p>${escapeHtml(tr('proposalFoundSummary'))}</p></div><div>${totals}</div></header><nav class="commercial-proposal-result-tabs" aria-label="${escapeHtml(tr('commercialProposal'))}">${tabs}</nav><div class="commercial-proposal-result-groups is-${activeTab.id}">${activeTab.groups.map((groupKey) => commercialProposalGroupMarkup(groupKey, groups[groupKey])).join('')}</div></section>`;
}

function projectAnalysisTabContent(tab, version = null, kind = 'project') {
  if (tab === 'proposal' && kind === 'project') return projectEstimateBreakdownMarkup(version, kind);
  const catalog = version ? cashSourceCatalogFromFileRecord(version, kind) : [];
  if (catalog.length) {
    if (tab === 'sheets') {
      const sheets = [...new Set(catalog.map((entry) => entry.sourceSheet).filter(Boolean))];
      if (sheets.length) return `<div class="analysis-detail-table-scroll"><table class="analysis-detail-table"><thead><tr>${['sheetNumber', 'sheetName', 'system', 'statusLabel'].map((key) => `<th>${escapeHtml(tr(key))}</th>`).join('')}</tr></thead><tbody>${sheets.map((sheet, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(sheet)}</td><td>—</td><td>${escapeHtml(tr('analyzed'))}</td></tr>`).join('')}</tbody></table></div>`;
    }
    if (tab === 'proposal') {
      const rows = catalog.slice(0, 160).map((entry) => `<tr><td>${escapeHtml(entry.sourceSheet || tr(entry.sourceKind))}</td><td>${escapeHtml(entry.name)}</td><td>${escapeHtml(entry.unit || '—')}</td><td>${entry.quantity || '—'}</td><td>${entry.price ? escapeHtml(formatMoney(entry.price)) : '—'}</td><td>${entry.price && entry.quantity ? escapeHtml(formatMoney(entry.price * entry.quantity)) : '—'}</td></tr>`).join('');
      return `<div class="analysis-detail-table-scroll"><table class="analysis-detail-table"><thead><tr>${['section', 'workName', 'unit', 'quantity', 'price', 'rowTotal'].map((key) => `<th>${escapeHtml(tr(key))}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    if (tab === 'materials') {
      const selected = catalog.filter((entry) => entry.category === 'material');
      const rows = (selected.length ? selected : catalog).slice(0, 160).map((entry, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(entry.name)}</td><td>—</td><td>${escapeHtml(entry.unit || '—')}</td><td>${entry.quantity || '—'}</td><td>${escapeHtml(entry.sourceSheet || entry.sourceName || tr(entry.sourceKind))}</td></tr>`).join('');
      return `<div class="analysis-detail-table-scroll"><table class="analysis-detail-table"><thead><tr>${['recordNumber', 'materialName', 'markType', 'unit', 'quantity', 'source'].map((key) => `<th>${escapeHtml(tr(key))}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
    if (tab === 'boq') {
      const selected = catalog.filter((entry) => entry.category === 'work');
      const rows = (selected.length ? selected : catalog).slice(0, 160).map((entry, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(entry.name)}</td><td>${escapeHtml(entry.unit || '—')}</td><td>${entry.quantity || '—'}</td><td>${escapeHtml(entry.sourceSheet || entry.sourceName || tr(entry.sourceKind))}</td></tr>`).join('');
      return `<div class="analysis-detail-table-scroll"><table class="analysis-detail-table"><thead><tr>${['recordNumber', 'workName', 'unit', 'quantity', 'source'].map((key) => `<th>${escapeHtml(tr(key))}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
  }
  if (tab === 'proposal') return analysisEmptyTable(['section', 'workName', 'unit', 'quantity', 'price', 'rowTotal']);
  if (tab === 'sheets') return analysisEmptyTable(['sheetNumber', 'sheetName', 'system', 'statusLabel']);
  if (tab === 'systems') return analysisEmptyTable(['system', 'sheets', 'materials', 'works', 'statusLabel']);
  if (tab === 'materials') return analysisEmptyTable(['recordNumber', 'materialName', 'markType', 'unit', 'quantity', 'source']);
  return analysisEmptyTable(['recordNumber', 'workName', 'unit', 'quantity', 'source']);
}

function versionCatalogDifferences(previous, current, kind) {
  const beforeCatalog = cashSourceCatalogFromFileRecord(previous, kind);
  const afterCatalog = cashSourceCatalogFromFileRecord(current, kind);
  const before = new Map(beforeCatalog.map((entry) => [cashSourceKey(entry.name), entry]));
  const after = new Map(afterCatalog.map((entry) => [cashSourceKey(entry.name), entry]));
  const added = afterCatalog.filter((entry) => !before.has(cashSourceKey(entry.name)));
  const removed = beforeCatalog.filter((entry) => !after.has(cashSourceKey(entry.name)));
  const changed = afterCatalog.flatMap((entry) => {
    const old = before.get(cashSourceKey(entry.name));
    if (!old) return [];
    return old.unit !== entry.unit || Number(old.quantity) !== Number(entry.quantity) || Number(old.price) !== Number(entry.price) ? [{ before: old, after: entry }] : [];
  });
  return { beforeCatalog, afterCatalog, added, removed, changed };
}

function versionCatalogValue(entry) {
  if (!entry) return '—';
  return [entry.unit, entry.quantity ? String(entry.quantity) : '', entry.price ? formatMoney(entry.price) : ''].filter(Boolean).join(' · ') || '—';
}

function revisionComparisonMarkup(file, options = {}) {
  const versions = fileVersions(file);
  if (versions.length < 2) return '';
  const comparison = file.comparison || {};
  const previous = fileVersionSnapshot(options.previous || comparison.previous || versions[versions.length - 2]);
  const current = fileVersionSnapshot(options.current || comparison.current || versions[versions.length - 1]);
  const kind = options.kind || file.kind || 'project';
  const changes = versionComparisonChanges(previous, current);
  if (Object.prototype.hasOwnProperty.call(previous, 'contractNumber') || Object.prototype.hasOwnProperty.call(current, 'contractNumber')) {
    changes.push({ key: 'contractNumberLabel', before: previous.contractNumber || '—', after: current.contractNumber || '—', changed: previous.contractNumber !== current.contractNumber });
  }
  const catalogDifferences = versionCatalogDifferences(previous, current, kind);
  const contentChangedCount = catalogDifferences.added.length + catalogDifferences.removed.length + catalogDifferences.changed.length;
  const changedCount = changes.filter((item) => item.changed).length + contentChangedCount;
  const isPending = !isDocumentVersionAnalyzed(previous) || !isDocumentVersionAnalyzed(current);
  const rows = changes.map((item) => `<tr><th>${escapeHtml(tr(item.key))}</th><td>${escapeHtml(item.before)}</td><td>${escapeHtml(item.after)}</td><td><span class="revision-change-status ${item.changed ? 'is-changed' : 'is-unchanged'}">${escapeHtml(tr(item.changed ? 'changed' : 'unchanged'))}</span></td></tr>`).join('');
  const contentRows = [
    ...catalogDifferences.added.map((entry) => ({ name: entry.name, before: null, after: entry, status: 'positionAdded' })),
    ...catalogDifferences.removed.map((entry) => ({ name: entry.name, before: entry, after: null, status: 'positionRemoved' })),
    ...catalogDifferences.changed.map((entry) => ({ name: entry.after.name, before: entry.before, after: entry.after, status: 'positionChanged' }))
  ].slice(0, 120).map((entry) => `<tr><th>${escapeHtml(entry.name)}</th><td>${escapeHtml(versionCatalogValue(entry.before))}</td><td>${escapeHtml(versionCatalogValue(entry.after))}</td><td><span class="revision-change-status is-changed">${escapeHtml(tr(entry.status))}</span></td></tr>`).join('');
  const contentMarkup = isPending
    ? `<section class="revision-content-status"><span>!</span><div><strong>${escapeHtml(tr('comparisonNeedsAnalysis'))}</strong><p>${escapeHtml(tr('comparisonNeedsAnalysisCopy'))}</p></div></section>`
    : catalogDifferences.beforeCatalog.length || catalogDifferences.afterCatalog.length
      ? `<section class="revision-catalog-differences"><div class="revision-content-summary"><article><span>${escapeHtml(tr('positionsAdded'))}</span><b>${catalogDifferences.added.length}</b></article><article><span>${escapeHtml(tr('positionsRemoved'))}</span><b>${catalogDifferences.removed.length}</b></article><article><span>${escapeHtml(tr('positionsChanged'))}</span><b>${catalogDifferences.changed.length}</b></article></div>${contentRows ? `<div class="revision-difference-scroll"><table><thead><tr><th>${escapeHtml(tr('workOrMaterialName'))}</th><th>${escapeHtml(tr('before'))}</th><th>${escapeHtml(tr('after'))}</th><th>${escapeHtml(tr('statusLabel'))}</th></tr></thead><tbody>${contentRows}</tbody></table></div>` : `<p class="revision-no-content-differences">${escapeHtml(tr('noExtractedDifferences'))}</p>`}</section>`
      : `<section class="revision-content-status"><span>◇</span><div><strong>${escapeHtml(tr('contentDifferences'))}: ${escapeHtml(tr('contentComparisonPending'))}</strong><p>${escapeHtml(tr('contentComparisonPendingCopy'))}</p></div></section>`;
  const history = versions.slice().reverse().map((version, reverseIndex) => {
    const number = versions.length - reverseIndex;
    return `<li><b>v${number}</b><span><strong>${escapeHtml(version.name)}</strong><small>${escapeHtml(formatStorage(version.size))} · ${escapeHtml(formatObjectDate(version.addedAt))}</small></span></li>`;
  }).join('');
  return `<section class="revision-comparison ${isPending ? 'is-pending' : 'is-ready'}"><header><div><span class="eyebrow">STRUCTOS VERSION CONTROL</span><h2>${escapeHtml(tr('versionComparison'))}</h2><p>${changedCount} ${escapeHtml(tr('changesFound'))}</p></div><span class="revision-comparison-chip">${escapeHtml(tr(isPending ? 'comparisonInProgress' : 'comparisonComplete'))}</span></header><div class="revision-version-pair"><article><small>${escapeHtml(tr('previousVersion'))}</small><b>${escapeHtml(previous.name)}</b><span>${escapeHtml(formatStorage(previous.size))} · ${escapeHtml(formatObjectDate(previous.addedAt))}</span></article><i aria-hidden="true">→</i><article><small>${escapeHtml(tr('currentVersion'))}</small><b>${escapeHtml(current.name)}</b><span>${escapeHtml(formatStorage(current.size))} · ${escapeHtml(formatObjectDate(current.addedAt))}</span></article></div><section class="revision-differences"><h3>${escapeHtml(tr('metadataDifferences'))}</h3><div class="revision-difference-scroll"><table><thead><tr><th></th><th>${escapeHtml(tr('before'))}</th><th>${escapeHtml(tr('after'))}</th><th>${escapeHtml(tr('statusLabel'))}</th></tr></thead><tbody>${rows}</tbody></table></div></section>${contentMarkup}<details class="revision-history"><summary>${escapeHtml(tr('versionHistory'))} · ${versions.length}</summary><ol>${history}</ol></details></section>`;
}

function analysisDetailHeader(object, kind, file, version) {
  const typeLabel = kind === 'project' ? tr('projectAnalysis') : tr(kind);
  const versions = fileVersions(file);
  const versionNumber = Math.max(1, versions.findIndex((item) => item.id === version.id) + 1);
  return `<header class="analysis-detail-head"><button class="outline-button" type="button" data-analysis-back>← ${escapeHtml(tr('backToProjects'))}</button><div><span class="eyebrow">STRUCTOS ANALYTICS</span><h1>${escapeHtml(typeLabel)}</h1><p>${escapeHtml(object.name)}</p></div><span class="analysis-detail-status">${escapeHtml(tr(isDocumentVersionAnalyzed(version) ? 'analyzed' : 'pendingAnalysis'))}</span></header><section class="analysis-detail-source"><span>${kind === 'project' ? '▤' : kind === 'contract' ? '≡' : '₽'}</span><div><small>${escapeHtml(tr('sourceFile'))} · v${versionNumber}</small><strong>${escapeHtml(version.name)}</strong><em>${escapeHtml(formatStorage(version.size))} · ${escapeHtml(formatObjectDate(version.addedAt))}</em></div><button class="outline-button" type="button" data-analysis-revision="${escapeHtml(kind)}">+ ${escapeHtml(tr('uploadAdditionalFile'))}</button></section>`;
}

function renderAnalysisDetail() {
  const rootElement = $('[data-analysis-detail]');
  if (!rootElement) return;
  const object = objectRegistry.find((item) => item.id === activeAnalysisDocument.objectId);
  const kind = activeAnalysisDocument.kind;
  const file = objectFile(object, kind);
  const version = documentVersionById(file, activeAnalysisDocument.versionId);
  if (!object || !file) {
    rootElement.innerHTML = `<div class="empty-state"><h2>${escapeHtml(tr('noMyProjects'))}</h2><button class="primary-button" type="button" data-analysis-back>${escapeHtml(tr('backToProjects'))}</button></div>`;
  } else if (!version || !isDocumentVersionAnalyzed(version)) {
    rootElement.innerHTML = `${version ? analysisDetailHeader(object, kind, file, version) : ''}<section class="analysis-document-placeholder"><span>⌛</span><h2>${escapeHtml(tr('fileAwaitingAnalysis'))}</h2><p>${escapeHtml(tr('fileAwaitingAnalysisCopy'))}</p>${version ? `<button class="primary-button" type="button" data-analyze-active-version>${escapeHtml(tr('analyze'))}</button>` : ''}</section>`;
  } else if (kind === 'project') {
    const tabs = projectAnalysisTabs.map((tab) => `<button class="${tab.id === activeProjectAnalysisTab ? 'is-active' : ''}" type="button" data-project-analysis-tab="${tab.id}" aria-selected="${tab.id === activeProjectAnalysisTab}"><span>${tab.icon}</span><strong>${escapeHtml(tr(tab.label))}</strong></button>`).join('');
    rootElement.innerHTML = `${analysisDetailHeader(object, kind, file, version)}<section class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></section><nav class="project-analysis-tabs" aria-label="${escapeHtml(tr('projectAnalysis'))}">${tabs}</nav><section class="project-analysis-content"><header><span class="eyebrow">STRUCTOS DETAIL</span><h2>${escapeHtml(tr(projectAnalysisTabs.find((tab) => tab.id === activeProjectAnalysisTab)?.label || 'projectEstimate'))}</h2></header>${projectAnalysisTabContent(activeProjectAnalysisTab, version, kind)}</section>`;
  } else if (kind === 'estimate') {
    rootElement.innerHTML = `${analysisDetailHeader(object, kind, file, version)}<section class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></section><section class="project-analysis-content"><header><span class="eyebrow">STRUCTOS ESTIMATE</span><h2>${escapeHtml(tr('estimate'))}</h2></header>${projectAnalysisTabContent('proposal', version, kind)}</section>`;
  } else {
    rootElement.innerHTML = `${analysisDetailHeader(object, kind, file, version)}<section class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></section><section class="analysis-document-placeholder"><span>≡</span><h2>${escapeHtml(tr('analyzedDocumentPage'))}</h2><p>${escapeHtml(tr('analyzedDocumentPageCopy'))}</p></section>`;
  }
  $$('[data-analysis-back]', rootElement).forEach((button) => button.addEventListener('click', () => setPanel('projects')));
  $('[data-analysis-revision]', rootElement)?.addEventListener('click', (event) => openUploadDialog(event.currentTarget.dataset.analysisRevision, object?.id, 'revision'));
  $('[data-analyze-active-version]', rootElement)?.addEventListener('click', () => analyzeObjectDocument(object?.id, kind, version?.id));
  $$('[data-project-analysis-tab]', rootElement).forEach((button) => button.addEventListener('click', () => { activeProjectAnalysisTab = button.dataset.projectAnalysisTab; renderAnalysisDetail(); }));
}

function promptDocumentAnalysis(object, kind, versionId = null) {
  const file = objectFile(object, kind);
  const version = documentVersionById(file, versionId);
  showDialog(tr('analysisNotReady'), tr('analysisNotReadyHint'), `<div class="dialog-options"><button class="primary-button" type="button" data-run-analysis-now>${escapeHtml(tr('runAnalysisNow'))}</button></div>`);
  $('[data-run-analysis-now]')?.addEventListener('click', () => {
    if (file && version) analyzeObjectDocument(object.id, kind, version.id);
  });
}

function analyzeObjectDocument(objectId, kind, versionId = null, options = {}) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  const version = documentVersionById(file, versionId);
  if (!object || !file || !version) return;
  if (isDocumentVersionAnalyzed(version)) {
    if (options.inline || options.dialog) {
      selectedProjectVersionIds.set(projectDocumentGroupKey(objectId, kind), version.id);
      if (options.dialog) openObjectCard(objectId);
      else renderMyProjects();
    } else openAnalyzedDocument(objectId, kind, version.id);
    return;
  }
  clearTimeout(analysisTimer);
  showDialog(tr('analyzingDocument'), tr('analyzingDocumentHint'), `<div class="analysis-ready-files"><div><span>✓</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(version.name)}</small></div></div><div class="analysis-loader"><span></span><span></span><span></span></div>`);
  analysisTimer = setTimeout(() => {
    const currentObject = objectRegistry.find((item) => item.id === objectId);
    const currentFile = objectFile(currentObject, kind);
    const currentVersion = documentVersionById(currentFile, version.id);
    if (!currentObject || !currentFile || !currentVersion) return;
    const analyzedAt = new Date().toISOString();
    const analysisPatch = { analysisPending: false, analyzedAt };
    if (kind === 'project') analysisPatch.estimateBreakdown = projectEstimateSnapshot(currentVersion);
    const analyzedVersion = updateDocumentVersion(currentFile, currentVersion.id, analysisPatch);
    if (kind === 'contract' && latestDocumentVersion(currentFile)?.id === analyzedVersion?.id) currentObject.contractNumber = String(analyzedVersion.contractNumber || extractContractNumberFromName(analyzedVersion.name) || currentObject.contractNumber || '');
    currentObject.analyzedAt = analyzedAt;
    if (currentObject.status === 'uploaded' && currentObject.files?.length && currentObject.files.every((item) => isObjectDocumentAnalyzed(currentObject, item))) currentObject.status = 'ready';
    selectObjectForAnalysis(currentObject);
    saveObjects();
    saveUploads();
    renderWidgets();
    activeAnalysisDocument = { objectId, kind, versionId: currentVersion.id };
    activeProjectAnalysisTab = 'proposal';
    $('[data-dialog]')?.close();
    if (options.inline || options.dialog) {
      selectedProjectVersionIds.set(projectDocumentGroupKey(objectId, kind), currentVersion.id);
      renderObjects();
      if (options.dialog) openObjectCard(objectId);
      else setPanel('projects');
    } else {
      renderObjects();
      setPanel('analysis-detail');
    }
  }, 1100);
}

function analyzeObjectDocuments(objectId, requestedKinds = []) {
  const object = objectRegistry.find((item) => item.id === objectId);
  if (!object) return;
  const kinds = [...new Set(requestedKinds)]
    .filter((kind) => uploadRules[kind])
    .filter((kind) => {
      const file = objectFile(object, kind);
      return file && !isObjectDocumentAnalyzed(object, file);
    });
  if (!kinds.length) { openReportChooser(object); return; }
  if (kinds.length === 1) { analyzeObjectDocument(objectId, kinds[0]); return; }
  const filesMarkup = `<div class="analysis-ready-files">${kinds.map((kind) => { const file = objectFile(object, kind); return `<div><span>✓</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file.name)}</small></div>`; }).join('')}</div>`;
  clearTimeout(analysisTimer);
  showDialog(escapeHtml(tr('analyzingDocuments')), escapeHtml(tr('analyzingDocumentsHint')), `${filesMarkup}<div class="analysis-loader"><span></span><span></span><span></span></div>`);
  analysisTimer = setTimeout(() => {
    const currentObject = objectRegistry.find((item) => item.id === objectId);
    if (!currentObject) return;
    const analyzedAt = new Date().toISOString();
    kinds.forEach((kind) => {
      const file = objectFile(currentObject, kind);
      if (!file) return;
      const latestVersion = latestDocumentVersion(file);
      if (!latestVersion) return;
      const analysisPatch = { analysisPending: false, analyzedAt };
      if (kind === 'project') analysisPatch.estimateBreakdown = projectEstimateSnapshot(latestVersion);
      updateDocumentVersion(file, latestVersion.id, analysisPatch);
      if (kind === 'contract') currentObject.contractNumber = String(file.contractNumber || extractContractNumberFromName(file.name) || currentObject.contractNumber || '');
    });
    currentObject.analyzedAt = analyzedAt;
    if (currentObject.status === 'uploaded' && currentObject.files?.length && currentObject.files.every((item) => isObjectDocumentAnalyzed(currentObject, item))) currentObject.status = 'ready';
    selectObjectForAnalysis(currentObject);
    saveObjects();
    saveUploads();
    renderObjects();
    renderWidgets();
    showDialog(escapeHtml(tr('allDocumentsAnalyzed')), escapeHtml(tr('allDocumentsAnalyzedCopy')), `<div class="result-actions"><button class="outline-button" type="button" data-view-report>${escapeHtml(tr('viewReport'))}</button><button class="primary-button" type="button" data-start-object>${escapeHtml(tr('startObject'))}</button></div>`);
    $('[data-view-report]')?.addEventListener('click', () => openReportChooser(currentObject));
    $('[data-start-object]')?.addEventListener('click', () => startReadyObject(currentObject.id));
  }, 1100);
}

function analyzePendingObjectDocuments(objectId) {
  const object = objectRegistry.find((item) => item.id === objectId);
  if (!object) return;
  const pendingKinds = Object.keys(uploadRules).filter((kind) => {
    const file = objectFile(object, kind);
    return file && !isObjectDocumentAnalyzed(object, file);
  });
  if (pendingKinds.length) analyzeObjectDocuments(objectId, pendingKinds);
  else openReportChooser(object);
}

function deleteObjectDocument(objectId, kind) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  if (!object || !file) return;
  showDialog(tr('deleteDocumentTitle'), tr('deleteDocumentHint'), `<div class="result-actions"><button class="outline-button" type="button" data-cancel-document-delete>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-document-delete>${escapeHtml(tr('deleteDocument'))}</button></div>`);
  $('[data-cancel-document-delete]')?.addEventListener('click', () => $('[data-dialog]')?.close());
  $('[data-confirm-document-delete]')?.addEventListener('click', () => {
    object.files = (object.files || []).filter((item) => item.kind !== kind);
    if (kind === 'contract') object.contractNumber = '';
    if (selectedFiles[kind] && sameFileMetadata(selectedFiles[kind], file)) selectedFiles[kind] = null;
    if (!object.files.length && object.status === 'ready') { object.status = 'uploaded'; object.analyzedAt = null; }
    saveObjects();
    saveUploads();
    renderAnalysisCards();
    renderObjects();
    renderWidgets();
    $('[data-dialog]')?.close();
    showToast(tr('documentDeleted'));
  });
}

function deleteObjectDocumentVersion(objectId, kind, versionId) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  const version = documentVersionById(file, versionId);
  if (!object || !file || !version) return;
  showDialog(tr('deleteFileVersion'), tr('deleteFileVersionCopy'), `<section class="revision-upload-source"><span>×</span><div><small>${escapeHtml(tr(kind))}</small><strong>${escapeHtml(version.name)}</strong><em>${escapeHtml(formatStorage(version.size))} · ${escapeHtml(formatObjectDate(version.addedAt))}</em></div></section><div class="result-actions"><button class="outline-button" type="button" data-cancel-version-delete>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-version-delete>${escapeHtml(tr('deleteDocument'))}</button></div>`);
  $('[data-cancel-version-delete]')?.addEventListener('click', () => $('[data-dialog]')?.close());
  $('[data-confirm-version-delete]')?.addEventListener('click', () => {
    const versions = fileVersions(file).filter((item) => item.id !== version.id);
    if (!versions.length) object.files = (object.files || []).filter((item) => item.kind !== kind);
    else {
      file.comparison = null;
      syncLatestDocumentVersion(file, versions);
    }
    if (kind === 'contract') object.contractNumber = String(latestDocumentVersion(objectFile(object, kind))?.contractNumber || '');
    const groupKey = projectDocumentGroupKey(objectId, kind);
    if (selectedProjectVersionIds.get(groupKey) === version.id) selectedProjectVersionIds.delete(groupKey);
    selectedProjectVersionTabs.delete(`${groupKey}:${version.id}`);
    if (versions.length < 2) {
      visibleProjectComparisons.delete(groupKey);
      expandedProjectComparisons.delete(groupKey);
    }
    if (object.status === 'uploaded' && object.files?.length && object.files.every((item) => isObjectDocumentAnalyzed(object, item))) object.status = 'ready';
    object.updatedAt = new Date().toISOString();
    selectObjectForAnalysis(object);
    saveObjects();
    saveUploads();
    renderObjects();
    renderWidgets();
    $('[data-dialog]')?.close();
    showToast(tr('fileVersionDeleted'));
  });
}

function openAnalyzedDocument(objectId, kind, versionId = null) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  const version = documentVersionById(file, versionId);
  if (!object || !file || !version) return;
  if (!isDocumentVersionAnalyzed(version)) { promptDocumentAnalysis(object, kind, version.id); return; }
  activeAnalysisDocument = { objectId: object.id, kind, versionId: version.id };
  activeProjectAnalysisTab = 'proposal';
  $('[data-dialog]')?.close();
  setPanel('analysis-detail');
}

function openReportChooser(objectOrId) {
  const object = typeof objectOrId === 'string' ? objectRegistry.find((item) => item.id === objectOrId) : objectOrId;
  if (!object) return;
  const available = Object.keys(uploadRules).map((kind) => [kind, objectFile(object, kind)]).filter(([, file]) => file);
  if (!available.length) { showToast(tr('uploadFirst')); return; }
  const choices = available.map(([kind, file]) => `<button class="report-document-choice" type="button" data-open-report-document="${escapeHtml(kind)}"><span>${kind === 'project' ? '▤' : kind === 'contract' ? '≡' : '₽'}</span><div><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file.name)}</small></div><i>›</i></button>`).join('');
  showDialog(tr('chooseReportDocument'), tr('chooseReportDocumentHint'), `<div class="report-document-list">${choices}</div>`);
  $$('[data-open-report-document]').forEach((button) => button.addEventListener('click', () => openAnalyzedDocument(object.id, button.dataset.openReportDocument)));
}

function combinedManagedObjects() {
  const coreObjects = objectRegistry
    .filter((object) => object.status === 'active' || object.status === 'completed')
    .map((object) => ({
      key: `core:${object.id}`,
      id: object.id,
      source: 'core',
      name: object.name,
      typeLabel: tr('fullCycleObject'),
      completed: object.status === 'completed',
      date: object.startedAt || object.analyzedAt || object.uploadedAt,
      completedAt: object.completedAt || null,
      details: `${(object.files || []).length} ${tr('attachedDocuments')} · ${tr('memoryUsed')}: ${formatStorage((object.files || []).reduce((total, file) => total + (Number(file.size) || 0), 0))}`
    }));
  const quickObjects = cashflowObjects.map((object) => ({
    key: `quick:${object.id}`,
    id: object.id,
    source: 'quick',
    name: object.name,
    typeLabel: tr('quickObject'),
    completed: Boolean(object.completed),
    date: object.createdAt,
    completedAt: object.completedAt || null,
    details: `${object.sections.length} ${tr('sectionCalculations')}`
  }));
  const invitedManagedObjects = invitedObjects.filter((object) => object.status !== 'declined').map((object) => ({
    key: `invited:${object.id}`,
    id: object.id,
    source: 'invited',
    name: invitedObjectName(object),
    typeLabel: tr('invitedObject'),
    completed: object.status === 'completed',
    date: object.invitedAt,
    completedAt: object.completedAt || null,
    details: `${tr('invitedRole')}: ${tr(object.roleKey || 'objectParticipant')} · ${tr('invitedBy')}: ${object.invitedBy}`
  }));
  const objects = [...coreObjects, ...quickObjects, ...invitedManagedObjects];
  const orderIndex = new Map(unifiedObjectOrder.map((key, index) => [key, index]));
  const active = objects.filter((object) => !object.completed).sort((a, b) => {
    const aOrder = orderIndex.get(a.key);
    const bOrder = orderIndex.get(b.key);
    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return 1;
    if (bOrder !== undefined) return -1;
    return new Date(b.date || 0) - new Date(a.date || 0);
  });
  const completed = objects.filter((object) => object.completed).sort((a, b) => new Date(b.completedAt || b.date || 0) - new Date(a.completedAt || a.date || 0));
  return [...active, ...completed];
}

function unifiedObjectRowMarkup(object) {
  const dateValue = object.completed ? object.completedAt || object.date : object.date;
  const status = tr(object.completed ? 'completedListObject' : 'inWork');
  const meta = `${status}: ${formatObjectDate(dateValue)} · ${object.details}`;
  const handle = object.completed
    ? '<span class="unified-drag-placeholder" aria-hidden="true">✓</span>'
    : `<button class="unified-drag-handle" type="button" data-unified-drag aria-label="${escapeHtml(`${tr('dragObject')}: ${object.name}`)}" title="${escapeHtml(tr('dragObject'))}"><span></span><span></span><span></span></button>`;
  return `<article class="unified-object-row is-${object.source}${object.completed ? ' is-completed' : ''}" data-unified-object="${escapeHtml(object.key)}" data-open-unified="${escapeHtml(object.key)}" role="button" tabindex="0" aria-label="${escapeHtml(`${tr('openObjectAction')}: ${object.name}`)}">${handle}<div class="unified-object-open"><span class="unified-object-icon" aria-hidden="true">${object.source === 'quick' ? '+₽−' : object.source === 'invited' ? '↗' : '⌂'}</span><span class="unified-object-copy"><strong>${escapeHtml(object.name)}</strong><span class="unified-object-badges"><b class="is-${object.source}">${escapeHtml(object.typeLabel)}</b><b class="is-status">${escapeHtml(status)}</b></span><small>${escapeHtml(meta)}</small></span><span class="unified-object-arrow" aria-hidden="true">›</span></div></article>`;
}

function openUnifiedObject(key) {
  if (key.startsWith('quick:')) {
    const id = key.slice('quick:'.length);
    if (!cashflowObjects.some((object) => object.id === id)) return;
    activeCashObjectId = id;
    setPanel('cashflow');
    return;
  }
  if (key.startsWith('invited:')) { openInvitedObjectCard(key.slice('invited:'.length)); return; }
  if (key.startsWith('core:')) openObjectCard(key.slice('core:'.length));
}

function confirmDeclineInvitation(id) {
  const object = invitedObjects.find((item) => item.id === id && item.status === 'active');
  if (!object) return;
  showDialog(escapeHtml(tr('declineInvitationTitle')), tr('declineInvitationHint'), `<div class="result-actions"><button class="outline-button" type="button" data-cancel-invitation-decline>${escapeHtml(tr('cancel'))}</button><button class="primary-button is-danger" type="button" data-confirm-invitation-decline>${escapeHtml(tr('declineInvitation'))}</button></div>`);
  $('[data-cancel-invitation-decline]')?.addEventListener('click', () => $('[data-dialog]')?.close());
  $('[data-confirm-invitation-decline]')?.addEventListener('click', () => {
    object.status = 'declined';
    object.declinedAt = new Date().toISOString();
    saveInvitedObjects();
    renderHomeInbox();
    renderObjects();
    $('[data-dialog]')?.close();
    showToast(tr('invitationDeclined'));
  });
}

function openInvitedObjectCard(id) {
  const object = invitedObjects.find((item) => item.id === id);
  if (!object) return;
  const name = invitedObjectName(object);
  const documents = Object.keys(uploadRules).map((kind) => {
    const file = object.files.find((item) => item.kind === kind);
    return `<button class="object-document-choice${file ? ' has-file' : ''}" type="button" data-invited-document><span>${file ? '✓' : '+'}</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file?.name || tr('ownerWillShare'))}</small></button>`;
  }).join('');
  const declineAction = object.status === 'active' ? `<div class="result-actions"><button class="outline-button is-danger" type="button" data-decline-invitation>${escapeHtml(tr('declineInvitation'))}</button></div>` : '';
  showDialog(escapeHtml(name), tr('invitedToObject'), `<section class="invited-object-card"><div class="invited-object-status"><span>↗</span><div><b>${tr('invitedObject')}</b><small>${tr('inWork')}</small></div></div><dl><div><dt>${tr('invitedRole')}</dt><dd>${tr(object.roleKey || 'objectParticipant')}</dd></div><div><dt>${tr('invitedBy')}</dt><dd>${escapeHtml(object.invitedBy)}</dd></div><div><dt>${tr('invitedAt')}</dt><dd>${escapeHtml(formatObjectDate(object.invitedAt))}</dd></div></dl><p>${tr('invitedDocumentsHint')}</p><div class="object-document-chooser">${documents}</div>${declineAction}</section>`);
  $('[data-dialog]')?.classList.add('invited-object-dialog');
  $$('[data-invited-document]', $('[data-dialog-content]')).forEach((button) => button.addEventListener('click', () => showToast(tr('ownerWillShare'))));
  $('[data-decline-invitation]')?.addEventListener('click', () => confirmDeclineInvitation(object.id));
}

function persistUnifiedObjectOrder(list) {
  unifiedObjectOrder = $$('[data-unified-object]:not(.is-completed)', list).map((card) => card.dataset.unifiedObject);
  localStorage.setItem(OBJECT_ORDER_KEY, JSON.stringify(unifiedObjectOrder));
}

function enableUnifiedObjectSorting(handle, card, list) {
  let pointerId = null;
  let moved = false;
  let startY = 0;
  const moveCard = (direction) => {
    const activeCards = $$('[data-unified-object]:not(.is-completed)', list);
    const index = activeCards.indexOf(card);
    const nextIndex = Math.max(0, Math.min(activeCards.length - 1, index + direction));
    const target = activeCards[nextIndex];
    if (!target || target === card) return;
    if (direction < 0) list.insertBefore(card, target);
    else list.insertBefore(card, target.nextSibling);
    persistUnifiedObjectOrder(list);
    showToast(tr('orderSaved'));
  };
  handle.addEventListener('keydown', (event) => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    moveCard(event.key === 'ArrowUp' ? -1 : 1);
  });
  handle.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    pointerId = event.pointerId;
    startY = event.clientY;
    moved = false;
    card.classList.add('is-dragging');
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', (event) => {
    if (event.pointerId !== pointerId) return;
    event.preventDefault();
    moved ||= Math.abs(event.clientY - startY) > 5;
    const activeCards = $$('[data-unified-object]:not(.is-completed)', list).filter((item) => item !== card);
    const next = activeCards.find((item) => event.clientY < item.getBoundingClientRect().top + item.offsetHeight / 2);
    const firstCompleted = $('[data-unified-object].is-completed', list);
    if (next) list.insertBefore(card, next);
    else if (firstCompleted) list.insertBefore(card, firstCompleted);
    else list.append(card);
  });
  const finish = (event) => {
    if (event.pointerId !== pointerId) return;
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    pointerId = null;
    card.classList.remove('is-dragging');
    if (moved) { persistUnifiedObjectOrder(list); showToast(tr('orderSaved')); }
  };
  handle.addEventListener('pointerup', finish);
  handle.addEventListener('pointercancel', finish);
}

function renderObjects() {
  const uploaded = objectRegistry.filter((object) => object.status === 'uploaded');
  const ready = objectRegistry.filter((object) => object.status === 'ready');
  const active = objectRegistry.filter((object) => object.status === 'active');
  const combined = combinedManagedObjects();
  $$('[data-uploaded-objects-list]').forEach((list) => { list.innerHTML = uploaded.map(objectRowMarkup).join(''); });
  $$('[data-ready-objects-list]').forEach((list) => { list.innerHTML = ready.map(objectRowMarkup).join(''); });
  $$('[data-active-objects-list]').forEach((list) => { list.innerHTML = active.map(objectRowMarkup).join(''); });
  $$('[data-all-objects-list]').forEach((list) => {
    list.innerHTML = combined.map(unifiedObjectRowMarkup).join('');
    $$('[data-open-unified]', list).forEach((card) => {
      card.addEventListener('click', (event) => { if (!event.target.closest('[data-unified-drag]')) openUnifiedObject(card.dataset.openUnified); });
      card.addEventListener('keydown', (event) => { if (event.target !== card || !['Enter', ' '].includes(event.key)) return; event.preventDefault(); openUnifiedObject(card.dataset.openUnified); });
    });
    $$('[data-unified-drag]', list).forEach((handle) => enableUnifiedObjectSorting(handle, handle.closest('[data-unified-object]'), list));
  });
  $$('[data-uploaded-count]').forEach((count) => { count.textContent = String(uploaded.length); });
  $$('[data-ready-count]').forEach((count) => { count.textContent = String(ready.length); });
  $$('[data-active-count]').forEach((count) => { count.textContent = String(active.length); });
  $$('[data-all-active-count]').forEach((count) => { count.textContent = String(combined.filter((object) => !object.completed).length); });
  $$('[data-active-available]').forEach((count) => { count.textContent = String(Math.max(0, ACTIVE_OBJECT_LIMIT - active.length)); });
  $$('[data-uploaded-empty]').forEach((empty) => { empty.hidden = uploaded.length > 0; });
  $$('[data-ready-empty]').forEach((empty) => { empty.hidden = ready.length > 0; });
  $$('[data-active-empty]').forEach((empty) => { empty.hidden = active.length > 0; });
  $$('[data-all-objects-empty]').forEach((empty) => { empty.hidden = combined.length > 0; });
  $$('[data-start-ready]').forEach((button) => button.addEventListener('click', () => startReadyObject(button.dataset.startReady)));
  $$('[data-delete-ready]').forEach((button) => button.addEventListener('click', () => deleteReadyObject(button.dataset.deleteReady)));
  $$('[data-open-object]').forEach((button) => button.addEventListener('click', () => openObjectCard(button.dataset.openObject)));
  renderMyProjects();
  renderCommercialProposals();
  renderHomeInbox();
}

function openObjectCard(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object) return;
  const documentChoices = Object.keys(uploadRules).map((kind) => myProjectDocumentGroupMarkup(object, kind)).join('');
  const lifecycleAction = ['active', 'completed'].includes(object.status)
    ? `<button class="outline-button object-lifecycle-button${object.status === 'active' ? ' is-danger' : ''}" type="button" data-toggle-core-object>${escapeHtml(tr(object.status === 'active' ? 'finishObject' : 'reopenObject'))}</button>`
    : object.status === 'ready'
      ? `<button class="outline-button object-start-project" type="button" data-start-core-object>${escapeHtml(tr('startObject'))}</button>`
      : '';
  const reportAction = object.files?.length ? `<button class="outline-button object-view-report" type="button" data-view-object-report>${escapeHtml(tr('viewReport'))}</button>` : '';
  const documentsContent = `<div class="object-document-chooser is-versioned my-project-documents">${documentChoices}</div><div class="object-card-actions">${reportAction}<button class="outline-button object-rename-button" type="button" data-rename-core-object>${escapeHtml(tr('rename'))}</button>${lifecycleAction}</div>`;
  showDialog(escapeHtml(object.name), escapeHtml(tr('chooseObjectDocument')), documentsContent);
  const scope = $('[data-dialog-content]');
  $('[data-launch-project]', scope)?.addEventListener('click', () => openProjectLaunchDialog(object.id));
  $$('[data-my-project-rename-document]', scope).forEach((button) => button.addEventListener('click', () => renameProjectDocument(button.dataset.objectId, button.dataset.myProjectRenameDocument)));
  $$('[data-my-project-upload]', scope).forEach((button) => button.addEventListener('click', () => openUploadDialog(button.dataset.myProjectUpload, button.dataset.objectId, button.dataset.versionMode)));
  $$('[data-toggle-project-version]', scope).forEach((button) => button.addEventListener('click', () => {
    const key = projectDocumentGroupKey(button.dataset.objectId, button.dataset.kind);
    if (selectedProjectVersionIds.get(key) === button.dataset.toggleProjectVersion) selectedProjectVersionIds.delete(key);
    else selectedProjectVersionIds.set(key, button.dataset.toggleProjectVersion);
    openObjectCard(object.id);
  }));
  $$('[data-analyze-project-version]', scope).forEach((button) => button.addEventListener('click', () => analyzeObjectDocument(button.dataset.objectId, button.dataset.kind, button.dataset.analyzeProjectVersion, { dialog: true })));
  $$('[data-open-project-version]', scope).forEach((button) => button.addEventListener('click', () => openAnalyzedDocument(button.dataset.objectId, button.dataset.kind, button.dataset.openProjectVersion)));
  $$('[data-delete-project-version]', scope).forEach((button) => button.addEventListener('click', () => deleteObjectDocumentVersion(button.dataset.objectId, button.dataset.kind, button.dataset.deleteProjectVersion)));
  $$('[data-show-project-comparison]', scope).forEach((button) => button.addEventListener('click', () => {
    const key = projectDocumentGroupKey(button.dataset.objectId, button.dataset.showProjectComparison);
    visibleProjectComparisons.add(key); expandedProjectComparisons.delete(key); openObjectCard(object.id);
  }));
  $$('[data-toggle-project-comparison]', scope).forEach((button) => button.addEventListener('click', () => {
    const key = projectDocumentGroupKey(button.dataset.objectId, button.dataset.toggleProjectComparison);
    if (expandedProjectComparisons.has(key)) expandedProjectComparisons.delete(key); else expandedProjectComparisons.add(key);
    openObjectCard(object.id);
  }));
  $$('[data-project-version-tab]', scope).forEach((button) => button.addEventListener('click', () => {
    selectedProjectVersionTabs.set(`${projectDocumentGroupKey(button.dataset.objectId, button.dataset.kind)}:${button.dataset.versionId}`, button.dataset.projectVersionTab);
    openObjectCard(object.id);
  }));
  $('[data-view-object-report]', scope)?.addEventListener('click', () => openReportChooser(object));
  $('[data-rename-core-object]', scope)?.addEventListener('click', () => renameCoreObject(object.id));
  $('[data-start-core-object]', scope)?.addEventListener('click', () => startReadyObject(object.id));
  $('[data-toggle-core-object]', scope)?.addEventListener('click', () => toggleCoreObjectCompletion(object.id));
}

function renameCoreObject(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object) return;
  const previousName = object.name;
  openRenameDialog(tr('renameObject'), object.name, 100, (name) => {
    object.name = name;
    if (localStorage.getItem(OBJECT_NAME_KEY) === previousName) localStorage.setItem(OBJECT_NAME_KEY, name);
    saveObjects();
    renderObjects();
    renderWidgets();
  });
}

function toggleCoreObjectCompletion(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object || !['active', 'completed'].includes(object.status)) return;
  if (object.status === 'completed') {
    if (objectRegistry.filter((item) => item.status === 'active').length >= ACTIVE_OBJECT_LIMIT) { showActiveLimit(); return; }
    object.status = 'active';
    object.completedAt = null;
    object.startedAt ||= new Date().toISOString();
    showToast(tr('objectReopened'));
  } else {
    object.status = 'completed';
    object.completedAt = new Date().toISOString();
    showToast(tr('completedObject'));
  }
  saveObjects();
  renderObjects();
  renderWidgets();
  $('[data-dialog]')?.close();
}

function registerAnalyzedObject(name, readyFiles) {
  const normalizedName = String(name).trim().toLocaleLowerCase();
  const existing = objectRegistry.find((object) => object.name.trim().toLocaleLowerCase() === normalizedName);
  const analyzedAt = new Date().toISOString();
  const files = readyFiles.map(([kind, file]) => {
    const record = { ...file, kind, name: file.name, size: file.size || 0, analysisPending: false, analyzedAt };
    if (kind === 'project') record.estimateBreakdown = projectEstimateSnapshot(record);
    return { ...record, versions: [fileVersionSnapshot(record)] };
  });
  if (existing) {
    existing.projectTitle ||= String(name).trim();
    existing.projectSection ||= existing.projectTitle;
    existing.documentTitles = normalizeProjectDocumentTitles(existing.documentTitles);
    existing.updatedAt = analyzedAt;
    existing.analyzedAt = analyzedAt;
    existing.files = files;
    if (!['active', 'completed'].includes(existing.status)) {
      existing.status = 'ready';
      existing.startedAt = null;
      existing.completedAt = null;
    }
    saveObjects();
    renderObjects();
    renderWidgets();
    return existing;
  }
  const object = { id: createObjectId(), name: String(name).trim(), projectTitle: String(name).trim(), projectSection: String(name).trim(), documentTitles: normalizeProjectDocumentTitles(), contractNumber: '', status: 'ready', createdAt: analyzedAt, updatedAt: analyzedAt, uploadedAt: analyzedAt, analyzedAt, startedAt: null, files };
  objectRegistry.unshift(object);
  saveObjects();
  renderObjects();
  renderWidgets();
  return object;
}

function showActiveLimit() {
  showDialog(tr('activeLimitTitle'), tr('activeLimitCopy'));
}

function startReadyObject(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object) return;
  if (object.status === 'active') {
    $('[data-dialog]')?.close();
    setPanel('objects');
    return;
  }
  const activeCount = objectRegistry.filter((item) => item.status === 'active').length;
  if (activeCount >= ACTIVE_OBJECT_LIMIT) {
    showActiveLimit();
    return;
  }
  object.status = 'active';
  object.startedAt = new Date().toISOString();
  object.completedAt = null;
  saveObjects();
  renderObjects();
  renderWidgets();
  $('[data-dialog]')?.close();
  showToast(tr('objectStarted'));
}

function deleteReadyObject(id) {
  const nextRegistry = objectRegistry.filter((object) => object.id !== id || object.status !== 'ready');
  if (nextRegistry.length === objectRegistry.length) return;
  objectRegistry = nextRegistry;
  saveObjects();
  renderObjects();
  renderWidgets();
  showToast(tr('objectDeleted'));
}

function isAllowedFile(file, rule) {
  const extension = String(file.name || '').split('.').pop()?.toLowerCase();
  return rule.extensions.includes(extension) || String(file.type || '').startsWith('image/');
}

function fileMetadata(file) {
  return {
    name: String(file.name || tr('selectFile')),
    size: Number(file.size) || 0,
    type: String(file.type || ''),
    lastModified: Number(file.lastModified) || Date.now(),
    addedAt: new Date().toISOString()
  };
}

function renderUploadFile() {
  const selected = $('[data-upload-selected]');
  const dropzone = $('[data-upload-dropzone]');
  const actions = $('[data-upload-device-actions]');
  if (!selected || !dropzone || !actions) return;
  selected.hidden = !pendingFile;
  dropzone.hidden = Boolean(pendingFile);
  actions.hidden = Boolean(pendingFile);
  if (pendingFile) {
    $('[data-upload-file-name]').textContent = pendingFile.name;
    $('[data-upload-file-meta]').textContent = `${pendingFile.type || 'Файл'} · ${fileSize(pendingFile.size)}`;
  }
  const objectName = $('[data-analysis-object-name]');
  const confirm = $('[data-confirm-upload]');
  if (confirm) confirm.disabled = !(pendingFile && objectName?.value.trim());
}

function chooseUploadFile(file) {
  if (!file) return;
  const rule = uploadRules[activeUploadKind];
  if (file.size > rule.maxMb * 1024 * 1024) {
    showToast(`${tr('fileTooLarge')}: ${rule.maxMb} МБ`);
    return;
  }
  if (!isAllowedFile(file, rule)) {
    showToast(`${tr('unsupportedFormat')}: ${rule.formats}`);
    return;
  }
  pendingFile = fileMetadata(file);
  pendingUploadSourceFile = file;
  renderUploadFile();
  showToast(`${tr('fileSelected')}: ${file.name}`);
}

function removeUploadFile() {
  pendingFile = null;
  pendingUploadSourceFile = null;
  if (activeUploadMode === 'revision') {
    renderUploadFile();
    return;
  }
  if (selectedFiles[activeUploadKind]) {
    selectedFiles[activeUploadKind] = null;
    saveUploads();
    renderAnalysisCards();
    showToast(tr('fileDeleted'));
  }
  const object = objectRegistry.find((item) => item.id === activeUploadObjectId);
  if (object && objectFile(object, activeUploadKind)) {
    object.files = object.files.filter((file) => file.kind !== activeUploadKind);
    saveObjects();
    renderObjects();
  }
  renderUploadFile();
}

function openVersionComparison(objectId, kind) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  if (!object || !file) return;
  activeAnalysisDocument = { objectId, kind, versionId: latestDocumentVersion(file)?.id || null };
  activeProjectAnalysisTab = 'proposal';
  $('[data-dialog]')?.close();
  setPanel('analysis-detail');
}

function startRevisionComparison(objectId, kind, comparisonId) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  if (!object || !file || file.comparison?.id !== comparisonId) return;
  activeRevisionComparisonId = comparisonId;
  showDialog(tr('comparisonInProgress'), tr('comparisonInProgressCopy'), `<div data-revision-analysis="${escapeHtml(comparisonId)}">${revisionComparisonMarkup(file)}<div class="analysis-loader"><span></span><span></span><span></span></div></div>`);
  revisionAnalysisTimer = setTimeout(() => {
    const currentObject = objectRegistry.find((item) => item.id === objectId);
    const currentFile = objectFile(currentObject, kind);
    if (!currentObject || !currentFile || currentFile.comparison?.id !== comparisonId) return;
    const analyzedAt = new Date().toISOString();
    currentFile.comparison.status = 'ready';
    currentFile.comparison.analyzedAt = analyzedAt;
    currentFile.comparison.current.analyzedAt = analyzedAt;
    currentFile.analysisPending = false;
    currentFile.analyzedAt = analyzedAt;
    currentFile.versions = fileVersions(currentFile).map((version, index, versions) => index === versions.length - 1 ? { ...version, analyzedAt } : version);
    currentObject.analyzedAt = analyzedAt;
    if (currentObject.status === 'uploaded' && currentObject.files?.length && currentObject.files.every((item) => isObjectDocumentAnalyzed(currentObject, item))) currentObject.status = 'ready';
    selectObjectForAnalysis(currentObject);
    saveObjects();
    saveUploads();
    renderObjects();
    renderWidgets();
    if (activeRevisionComparisonId === comparisonId && $('[data-dialog]')?.open && $(`[data-revision-analysis="${comparisonId}"]`)) {
      showDialog(tr('comparisonComplete'), tr('comparisonCompleteCopy'), `${revisionComparisonMarkup(currentFile)}<div class="result-actions"><button class="primary-button" type="button" data-view-version-comparison>${escapeHtml(tr('viewComparison'))}</button></div>`);
      $('[data-view-version-comparison]')?.addEventListener('click', () => openVersionComparison(objectId, kind));
    } else {
      showToast(tr('versionSaved'));
    }
  }, 1100);
}

async function confirmUpload() {
  const objectNameInput = $('[data-analysis-object-name]');
  const selectedTargetId = $('[data-upload-object-target]')?.value || activeUploadObjectId;
  let destination = objectRegistry.find((object) => object.id === selectedTargetId);
  const objectName = destination?.name || objectNameInput?.value.trim();
  if (!objectName) {
    objectNameInput?.classList.add('field-error');
    objectNameInput?.focus();
    showToast(tr('objectRequired'));
    return;
  }
  if (!pendingFile) {
    showToast(tr('selectFile'));
    return;
  }
  objectNameInput.classList.remove('field-error');
  const uploadedAt = new Date().toISOString();
  if (!destination) destination = objectRegistry.find((object) => object.name.trim().toLocaleLowerCase() === objectName.toLocaleLowerCase());
  const previousFile = objectFile(destination, activeUploadKind);
  if (activeUploadMode === 'revision' && !previousFile) {
    showToast(tr('uploadFirst'));
    return;
  }
  if (previousFile && sameFileMetadata(previousFile, pendingFile)) {
    if (activeUploadMode === 'revision') {
      showToast(tr('sameFileSelected'));
      return;
    }
    pendingUploadSourceFile = null;
    $('[data-dialog]').close();
    showToast(tr('uploadComplete'));
    return;
  }
  const sourceFile = pendingUploadSourceFile;
  const shouldExtractSourceCatalog = Boolean(sourceFile && CASH_SOURCE_DOCUMENT_KINDS.includes(activeUploadKind));
  const confirmButton = $('[data-confirm-upload]');
  if (confirmButton) confirmButton.disabled = true;
  const sourceCatalog = shouldExtractSourceCatalog ? await extractCashSourceCatalogFromFile(sourceFile, activeUploadKind) : [];
  if (confirmButton?.isConnected) confirmButton.disabled = false;
  let uploadedFile = { ...pendingFile, kind: activeUploadKind, addedAt: uploadedAt, analysisPending: true, analyzedAt: null, sourceCatalog, sourceCatalogScanned: shouldExtractSourceCatalog };
  if (activeUploadKind === 'contract') uploadedFile.contractNumber = String(pendingFile.contractNumber || extractContractNumberFromName(pendingFile.name) || '');
  if (!destination) {
    destination = { id: createObjectId(), name: objectName, projectTitle: objectName, projectSection: objectName, documentTitles: normalizeProjectDocumentTitles(), contractNumber: '', status: 'uploaded', createdAt: uploadedAt, updatedAt: uploadedAt, uploadedAt, analyzedAt: null, startedAt: null, files: [] };
    objectRegistry.unshift(destination);
  }
  if (previousFile) {
    const normalizedPrevious = normalizeFileRecord(previousFile);
    const current = fileVersionSnapshot(uploadedFile);
    const versions = fileVersions(normalizedPrevious);
    if (!sameFileMetadata(versions[versions.length - 1], current)) versions.push(current);
    uploadedFile = {
      ...uploadedFile,
      versions,
      comparison: null
    };
  } else {
    uploadedFile = { ...uploadedFile, versions: [fileVersionSnapshot(uploadedFile)], comparison: null };
  }
  destination.files = [...(destination.files || []).filter((file) => file.kind !== activeUploadKind), uploadedFile];
  destination.projectTitle ||= destination.name;
  destination.projectSection ||= destination.projectTitle;
  destination.documentTitles = normalizeProjectDocumentTitles(destination.documentTitles);
  if (activeUploadKind === 'contract') destination.contractNumber = String(uploadedFile.contractNumber || extractContractNumberFromName(uploadedFile.name) || '');
  destination.updatedAt = uploadedAt;
  destination.uploadedAt = uploadedAt;
  if (destination.status === 'ready') destination.status = 'uploaded';
  activeUploadObjectId = destination.id;
  selectObjectForAnalysis(destination);
  saveObjects();
  renderAnalysisCards();
  renderObjects();
  renderWidgets();
  pendingUploadSourceFile = null;
  $('[data-dialog]').close();
  showToast(tr(previousFile ? 'versionSaved' : 'uploadComplete'));
}

function openUploadDialog(kind, objectId = null, mode = 'standard') {
  activeUploadKind = uploadRules[kind] ? kind : 'project';
  activeUploadMode = mode === 'revision' ? 'revision' : 'standard';
  selectAnalysis(activeUploadKind);
  activeUploadObjectId = objectRegistry.some((object) => object.id === objectId) ? objectId : null;
  const selectedObject = objectRegistry.find((object) => object.id === activeUploadObjectId);
  const storedFile = objectFile(selectedObject, activeUploadKind);
  if (activeUploadMode === 'revision' && !storedFile) activeUploadMode = 'standard';
  pendingUploadSourceFile = null;
  pendingFile = activeUploadMode === 'revision' ? null : (selectedObject ? (storedFile ? { ...storedFile } : null) : (selectedFiles[activeUploadKind] ? { ...selectedFiles[activeUploadKind] } : null));
  const rule = uploadRules[activeUploadKind];
  newObjectNameDraft = selectedObject ? '' : (localStorage.getItem(OBJECT_NAME_KEY) || '');
  const targetOptions = objectRegistry.map((object) => `<option value="${escapeHtml(object.id)}" ${object.id === activeUploadObjectId ? 'selected' : ''}>${escapeHtml(object.name)} · ${escapeHtml(tr(object.status === 'active' ? 'inWork' : object.status === 'ready' ? 'readyStatus' : 'uploaded'))}</option>`).join('');
  const revisionSource = activeUploadMode === 'revision' && storedFile ? `<section class="revision-upload-source"><span>v${fileVersionCount(storedFile)}</span><div><small>${escapeHtml(tr('currentStoredVersion'))}</small><strong>${escapeHtml(storedFile.name)}</strong><em>${escapeHtml(formatStorage(storedFile.size))} · ${escapeHtml(formatObjectDate(storedFile.addedAt))}</em></div></section>` : '';
  const markup = `
    <div class="upload-limits" aria-label="${escapeHtml(tr('userUploadPlan'))}">
      <span><b>${escapeHtml(tr('maxFileSize'))}</b>${rule.maxMb} МБ</span>
      <span><b>${escapeHtml(tr('allowedFormats'))}</b>${rule.formats}</span>
      <small>${escapeHtml(tr('userUploadPlan'))}</small>
    </div>
    <label class="upload-target-field${activeUploadMode === 'revision' ? ' is-fixed' : ''}">
      <span>${escapeHtml(tr('addToObject'))}</span>
      <select data-upload-object-target ${activeUploadMode === 'revision' ? 'disabled' : ''}><option value="">${escapeHtml(tr('newObject'))}</option>${targetOptions}</select>
    </label>
    <label class="upload-object-field">
      <span>${escapeHtml(tr('objectName'))} <em>*</em></span>
      <input data-analysis-object-name maxlength="100" autocomplete="organization" placeholder="${escapeHtml(tr('objectPlaceholder'))}" value="${escapeHtml(selectedObject?.name || newObjectNameDraft)}" ${selectedObject ? 'readonly' : ''} />
      <small>${escapeHtml(tr('objectNameHint'))}</small>
    </label>
    ${revisionSource}
    <div class="analysis-dropzone" data-upload-dropzone role="button" tabindex="0">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M5 15v5h14v-5"/></svg>
      <strong>${escapeHtml(tr('selectFile'))}</strong>
      <span>${escapeHtml(tr('dropFile'))}</span>
      <small>${rule.formats} · ${rule.maxMb} МБ</small>
    </div>
    <input class="hidden-file-input" data-upload-file-input type="file" accept="${rule.accept}" />
    <input class="hidden-file-input" data-upload-photo-input type="file" accept="image/*" capture="environment" />
    <div class="upload-device-actions" data-upload-device-actions>
      <button type="button" data-choose-device>${escapeHtml(tr('deviceFile'))}</button>
      <button type="button" data-choose-photo>${escapeHtml(tr('photoOrCamera'))}</button>
    </div>
    <div class="dashboard-selected-file" data-upload-selected hidden>
      <span class="dashboard-file-icon">▤</span>
      <div><strong data-upload-file-name></strong><small data-upload-file-meta></small></div>
      <button type="button" data-replace-file>${escapeHtml(tr('replace'))}</button>
      <button class="dashboard-delete-file" type="button" data-delete-file aria-label="${escapeHtml(tr('deleteFile'))}">×</button>
    </div>
    <button class="primary-button dashboard-upload-confirm" type="button" data-confirm-upload>${escapeHtml(tr(activeUploadMode === 'revision' ? 'uploadAndCompare' : 'upload'))}</button>`;
  showDialog(activeUploadMode === 'revision' ? `${escapeHtml(tr('newVersion'))}: ${escapeHtml(tr(activeUploadKind))}` : uploadTitle(activeUploadKind), tr(activeUploadMode === 'revision' ? 'revisionUploadHint' : 'oneFilePerCategory'), markup);

  const fileInput = $('[data-upload-file-input]');
  const photoInput = $('[data-upload-photo-input]');
  const dropzone = $('[data-upload-dropzone]');
  const objectNameInput = $('[data-analysis-object-name]');
  const targetSelect = $('[data-upload-object-target]');
  fileInput.addEventListener('change', () => chooseUploadFile(fileInput.files?.[0]));
  photoInput.addEventListener('change', () => chooseUploadFile(photoInput.files?.[0]));
  $('[data-choose-device]').addEventListener('click', () => fileInput.click());
  $('[data-choose-photo]').addEventListener('click', () => photoInput.click());
  $('[data-replace-file]').addEventListener('click', () => fileInput.click());
  $('[data-delete-file]').addEventListener('click', removeUploadFile);
  $('[data-confirm-upload]').addEventListener('click', confirmUpload);
  objectNameInput.addEventListener('input', () => { objectNameInput.classList.remove('field-error'); newObjectNameDraft = objectNameInput.value; renderUploadFile(); });
  targetSelect.addEventListener('change', () => {
    if (activeUploadMode === 'revision') return;
    const target = objectRegistry.find((object) => object.id === targetSelect.value);
    activeUploadObjectId = target?.id || null;
    objectNameInput.readOnly = Boolean(target);
    objectNameInput.value = target?.name || newObjectNameDraft;
    pendingUploadSourceFile = null;
    pendingFile = target && objectFile(target, activeUploadKind) ? { ...objectFile(target, activeUploadKind) } : null;
    renderUploadFile();
  });
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); fileInput.click(); } });
  ['dragenter', 'dragover'].forEach((type) => dropzone.addEventListener(type, (event) => { event.preventDefault(); dropzone.classList.add('is-dragging'); }));
  ['dragleave', 'drop'].forEach((type) => dropzone.addEventListener(type, (event) => { event.preventDefault(); dropzone.classList.remove('is-dragging'); }));
  dropzone.addEventListener('drop', (event) => {
    if (event.dataTransfer.files.length > 1) showToast(tr('onlyOneFile'));
    chooseUploadFile(event.dataTransfer.files?.[0]);
  });
  renderUploadFile();
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
  const readyFiles = Object.entries(selectedFiles).filter(([, file]) => file);
  if (!readyFiles.length) {
    showToast(tr('uploadFirst'));
    openUploadDialog(selectedAnalysis);
    return;
  }
  const objectName = localStorage.getItem(OBJECT_NAME_KEY) || tr('analysis');
  const title = escapeHtml(objectName);
  const filesMarkup = `<div class="analysis-ready-files">${readyFiles.map(([kind, file]) => `<div><span>✓</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file.name)}</small></div>`).join('')}</div>`;
  clearTimeout(analysisTimer);
  showDialog(`${tr('analysis')}: ${title}`, `${tr('filesReady')}: ${readyFiles.length} ${tr('analysisFilesCount')}`, `${filesMarkup}<div class="analysis-loader"><span></span><span></span><span></span></div>`);
  analysisTimer = setTimeout(() => {
    if (!$('[data-dialog]').open) return;
    const analyzedObject = registerAnalyzedObject(objectName, readyFiles);
    showDialog(tr('analysisComplete'), tr('analysisCompleteCopy'), `<div class="result-actions"><button class="outline-button" type="button" data-view-report>${tr('viewReport')}</button><button class="primary-button" type="button" data-start-object>${tr('startObject')}</button></div>`);
    $('[data-view-report]')?.addEventListener('click', () => openReportChooser(analyzedObject));
    $('[data-start-object]')?.addEventListener('click', () => startReadyObject(analyzedObject.id));
  }, 1100);
}

function openInvitationsCenter() {
  const active = homePendingInvitations();
  const markup = active.length
    ? `<div class="home-invitation-list">${active.map((object) => `<button type="button" data-open-home-invitation="${escapeHtml(object.id)}"><span>↗</span><span><strong>${escapeHtml(invitedObjectName(object))}</strong><small>${escapeHtml(tr(object.roleKey || 'objectParticipant'))} · ${escapeHtml(formatObjectDate(object.invitedAt))}</small></span><i>›</i></button>`).join('')}</div>`
    : `<div class="history-empty">${escapeHtml(tr('noObjects'))}</div>`;
  showDialog(escapeHtml(tr('invitationsCenter')), `${active.length} · ${escapeHtml(tr('invitations'))}`, markup);
  $$('[data-open-home-invitation]').forEach((button) => button.addEventListener('click', () => openInvitedObjectCard(button.dataset.openHomeInvitation)));
}

function isAppleMobileDevice() {
  return /iPad|iPhone|iPod/i.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isInstalledWebApp() {
  return window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
}

function supportsPushNotifications() {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
}

function isDemoAccount() {
  try { return JSON.parse(localStorage.getItem(DEMO_SESSION_KEY) || 'null')?.email === 'str@str.com'; }
  catch { return false; }
}

async function pushRegistration() {
  const current = await navigator.serviceWorker.getRegistration();
  if (current) return current;
  return navigator.serviceWorker.register('./sw.js');
}

async function pushNotificationState() {
  if (!supportsPushNotifications()) return 'unsupported';
  if (isAppleMobileDevice() && !isInstalledWebApp()) return 'install';
  if (Notification.permission === 'denied') return 'denied';
  const registration = await pushRegistration();
  const subscription = await registration.pushManager.getSubscription();
  if (Notification.permission === 'granted' && subscription) return 'enabled';
  if (Notification.permission === 'granted') return 'local';
  return 'disabled';
}

function base64UrlBytes(value) {
  const padding = '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob((value + padding).replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function invokePushApi(body) {
  if (!authClient) throw new Error('StructOS account required');
  const { data, error } = await authClient.functions.invoke('structos-push', { body });
  if (error) throw error;
  if (!data?.ok) throw new Error(data?.error || tr('pushError'));
  return data;
}

function pushDeviceName() {
  if (isAppleMobileDevice()) return navigator.maxTouchPoints > 1 && !/iPhone/i.test(navigator.userAgent) ? 'iPad' : 'iPhone';
  if (/Android/i.test(navigator.userAgent)) return 'Android';
  return 'Web';
}

async function enablePushNotifications() {
  if (!supportsPushNotifications()) { showToast(tr('pushUnsupported')); return; }
  if (isAppleMobileDevice() && !isInstalledWebApp()) { showToast(tr('pushInstallRequired')); return; }
  try {
    const permission = Notification.permission === 'default' ? await Notification.requestPermission() : Notification.permission;
    if (permission !== 'granted') { await openNotificationsCenter(); return; }
    const registration = await pushRegistration();
    await registration.update().catch(() => {});
    if (!authClient || isDemoAccount()) {
      showToast(tr('pushLocalOnly'));
      await openNotificationsCenter();
      return;
    }
    const { publicKey } = await invokePushApi({ action: 'public-key' });
    let subscription = await registration.pushManager.getSubscription();
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: base64UrlBytes(publicKey) });
    }
    try {
      await invokePushApi({ action: 'subscribe', subscription: subscription.toJSON(), deviceName: pushDeviceName(), language });
    } catch (error) {
      await subscription.unsubscribe().catch(() => {});
      throw error;
    }
    showToast(tr('pushEnabledToast'));
    await openNotificationsCenter();
  } catch (error) {
    console.error('StructOS push setup failed:', error);
    showToast(tr('pushError'));
  }
}

async function disablePushNotifications() {
  try {
    const registration = await pushRegistration();
    const subscription = await registration.pushManager.getSubscription();
    if (subscription && authClient && !isDemoAccount()) {
      await invokePushApi({ action: 'unsubscribe', endpoint: subscription.endpoint }).catch(() => {});
    }
    await subscription?.unsubscribe();
    showToast(tr('pushDisabledToast'));
    await openNotificationsCenter();
  } catch (error) {
    console.error('StructOS push disable failed:', error);
    showToast(tr('pushError'));
  }
}

async function testPushNotification() {
  try {
    const registration = await pushRegistration();
    const subscription = await registration.pushManager.getSubscription();
    if (subscription && authClient && !isDemoAccount()) {
      await invokePushApi({ action: 'send-test', language });
    } else {
      if (Notification.permission !== 'granted') { await enablePushNotifications(); return; }
      await registration.showNotification(tr('pushTestTitle'), { body: tr('pushTestBody'), icon: './assets/favicon-192.png', badge: './assets/favicon-192.png', tag: 'structos-test', renotify: true, vibrate: [90, 40, 90], data: { url: new URL('./dashboard.html#notifications', location.href).href } });
    }
    showToast(tr('pushTestSent'));
  } catch (error) {
    console.error('StructOS push test failed:', error);
    showToast(tr('pushError'));
  }
}

function pushSettingsMarkup(state) {
  const labels = { enabled: 'pushEnabled', local: 'pushLocalOnly', disabled: 'pushDisabled', denied: 'pushDenied', install: 'pushInstallRequired', unsupported: 'pushUnsupported' };
  const hints = state === 'install' ? tr('pushInstallHint') : state === 'denied' ? tr('pushDeniedHint') : state === 'local' && (!authClient || isDemoAccount()) ? tr('pushAccountHint') : tr('pushNotificationsHint');
  const enable = state === 'disabled' || (state === 'local' && authClient && !isDemoAccount());
  const test = state === 'enabled' || state === 'local';
  return `<section class="push-settings-card is-${state}"><header><span aria-hidden="true">${state === 'enabled' || state === 'local' ? '✓' : '!'}</span><div><small>STRUCTOS PUSH</small><strong>${escapeHtml(tr('pushNotificationsTitle'))}</strong><em>${escapeHtml(tr(labels[state]))}</em></div></header><p>${escapeHtml(hints)}</p><div class="push-settings-actions">${enable ? `<button class="primary-button" type="button" data-enable-push>${escapeHtml(tr('enablePush'))}</button>` : ''}${test ? `<button class="outline-button" type="button" data-test-push>${escapeHtml(tr('testPush'))}</button>` : ''}${state === 'enabled' ? `<button class="outline-button is-danger" type="button" data-disable-push>${escapeHtml(tr('disablePush'))}</button>` : ''}</div></section>`;
}

async function openNotificationsCenter() {
  const notifications = homePendingNotifications();
  let pushState = 'unsupported';
  try { pushState = await pushNotificationState(); }
  catch (error) { console.warn('StructOS push state unavailable:', error); }
  const markup = notifications.length
    ? `<div class="home-invitation-list home-notification-list">${notifications.map(({ object, file }) => `<button type="button" data-open-home-notification="${escapeHtml(object.id)}"><span>!</span><span><strong>${escapeHtml(object.projectTitle || object.name)}</strong><small>${escapeHtml(tr(file.kind))} · ${escapeHtml(tr('pendingAnalysis'))}</small></span><i>›</i></button>`).join('')}</div>`
    : `<section class="home-notifications-empty"><span>✓</span><strong>${escapeHtml(tr('noNewNotifications'))}</strong><small>${escapeHtml(tr('noNewNotificationsHint'))}</small></section>`;
  showDialog(escapeHtml(tr('notifications')), `${notifications.length} · ${escapeHtml(tr('notifications'))}`, `${pushSettingsMarkup(pushState)}${markup}`);
  $('[data-enable-push]')?.addEventListener('click', enablePushNotifications);
  $('[data-disable-push]')?.addEventListener('click', disablePushNotifications);
  $('[data-test-push]')?.addEventListener('click', testPushNotification);
  $$('[data-open-home-notification]').forEach((button) => button.addEventListener('click', () => openObjectCard(button.dataset.openHomeNotification)));
  markHomeNotificationsRead(notifications);
}

function openView(view) {
  if (view === 'profile') { setPanel('profile'); return; }
  if (view === 'passport') { setPanel('passport'); return; }
  if (view === 'projects') { setPanel('projects'); return; }
  if (view === 'proposals') { setPanel('proposals'); return; }
  if (view === 'objects') { setPanel('objects'); return; }
  if (view === 'invitations') { openInvitationsCenter(); return; }
  if (view === 'notifications') { openNotificationsCenter(); return; }
  if (view === 'tasks') { openTodoDialog(); return; }
  if (view === 'calendar') { openCalendarDialog(); return; }
  if (view === 'drawing') { openDrawingStudio(); return; }
  if (view === 'project' || view === 'analysis') {
    openProjectObjectWizard({ quickProjectOnly: true });
    return;
  }
  if (view === 'contract' || view === 'estimate') {
    openUploadDialog(view);
    return;
  }
  if (view === 'balance') { openBalanceDialog(); return; }
  if (view === 'balanceBonuses') { openFinanceHubDialog(); return; }
  if (view === 'finance') { setPanel('cashflow'); return; }
  if (view === 'bonuses') { openBonusDialog(); return; }
  if (view === 'subscription') { openSubscriptionDialog(); return; }
  if (view === 'connections') { openConnectionsDialog(); return; }
  const labels = { subscription: 'tariffSubscription', invitations: 'invitations', invite: 'invite', notifications: 'notifications', documents: 'documents', connections: 'connections', settings: 'settings', acts: 'widgetActs', attention: 'attention', tasks: 'widgetTasks', team: 'widgetTeam' };
  showDialog(tr(labels[view] || 'settings'), tr('comingSoon'), `<div class="dialog-options"><div class="dialog-option"><span>StructOS</span><span>→</span></div></div>`);
}

const OFFLINE_SYNC_CATEGORIES = Object.freeze([
  { id: 'projects', labelKey: 'syncCategoryProjects', hintKey: 'syncCategoryProjectsHint', icon: '▣' },
  { id: 'staff', labelKey: 'syncCategoryStaff', hintKey: 'syncCategoryStaffHint', icon: '人' },
  { id: 'finance', labelKey: 'syncCategoryFinance', hintKey: 'syncCategoryFinanceHint', icon: '₽' },
  { id: 'warehouse', labelKey: 'syncCategoryWarehouse', hintKey: 'syncCategoryWarehouseHint', icon: '◇' },
  { id: 'documents', labelKey: 'syncCategoryDocuments', hintKey: 'syncCategoryDocumentsHint', icon: '▤' },
  { id: 'profile', labelKey: 'syncCategoryProfile', hintKey: 'syncCategoryProfileHint', icon: 'ID' }
]);

function offlineJsonCopy(value) {
  return JSON.parse(JSON.stringify(value));
}

function cashObjectIdentitySnapshot(object) {
  return {
    id: object.id,
    sourceProjectId: object.sourceProjectId,
    name: object.name,
    createdAt: object.createdAt,
    completed: object.completed,
    completedAt: object.completedAt
  };
}

function cashFinanceSectionSnapshot(section) {
  return {
    id: section.id,
    sourceProjectId: section.sourceProjectId,
    name: section.name,
    createdAt: section.createdAt,
    createdManually: section.createdManually,
    contractMode: section.contractMode,
    factMode: section.factMode,
    contractAmount: section.contractAmount,
    advances: section.advances,
    expenses: section.expenses,
    ownInvestments: section.ownInvestments,
    ownReturns: section.ownReturns,
    factIncome: section.factIncome,
    factExpenses: section.factExpenses,
    factOwnInvestments: section.factOwnInvestments,
    factOwnReturns: section.factOwnReturns
  };
}

function cashDocumentSectionSnapshot(section) {
  return {
    id: section.id,
    sourceProjectId: section.sourceProjectId,
    name: section.name,
    attachments: section.attachments,
    statement: section.statement,
    act: section.act,
    reportHistory: section.reportHistory
  };
}

async function indexedStoreKeys(databaseFactory, storeName) {
  try {
    const database = await databaseFactory();
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(storeName, 'readonly');
      const request = transaction.objectStore(storeName).getAllKeys();
      request.onsuccess = () => resolve(request.result.map(String).sort());
      request.onerror = () => reject(request.error || new Error('Local file inventory failed'));
    });
  } catch {
    return [];
  }
}

async function collectOfflineSyncCategory(category) {
  if (category === 'projects') {
    return offlineJsonCopy({
      schemaVersion: 1,
      objects: objectRegistry,
      commercialProposals: commercialProposalRecords,
      invitedObjects,
      objectOrder: unifiedObjectOrder,
      currentUploads: selectedFiles,
      collapsedProjectIds: [...collapsedProjectIds].sort()
    });
  }

  if (category === 'staff') {
    return offlineJsonCopy({
      schemaVersion: 1,
      objects: cashflowObjects.map((object) => ({
        ...cashObjectIdentitySnapshot(object),
        sections: object.sections
          .filter((section) => section.staffingMode || section.staffingShifts?.length)
          .map((section) => ({ id: section.id, name: section.name, staffingMode: section.staffingMode, staffingShifts: section.staffingShifts }))
      })).filter((object) => object.sections.length)
    });
  }

  if (category === 'finance') {
    return offlineJsonCopy({
      schemaVersion: 1,
      account: finance,
      objects: cashflowObjects.map((object) => ({
        ...cashObjectIdentitySnapshot(object),
        sections: object.sections.map(cashFinanceSectionSnapshot)
      }))
    });
  }

  if (category === 'warehouse') {
    return offlineJsonCopy({
      schemaVersion: 1,
      projects: objectRegistry.map((object) => ({
        id: object.id,
        name: object.name,
        files: object.files.map((file) => ({
          id: file.id,
          kind: file.kind,
          name: file.name,
          sourceCatalog: file.sourceCatalog,
          materials: file.materials,
          equipment: file.equipment,
          specification: file.specification,
          versions: fileVersions(file).map((version) => ({
            id: version.id,
            sourceCatalog: version.sourceCatalog,
            materials: version.materials,
            equipment: version.equipment,
            specification: version.specification
          }))
        }))
      })),
      cashflow: cashflowObjects.map((object) => ({
        id: object.id,
        sections: object.sections.map((section) => ({ id: section.id, name: section.name, sourceCatalog: section.sourceCatalog }))
      }))
    });
  }

  if (category === 'documents') {
    const [cashflowFileIds, drawingIds] = await Promise.all([
      indexedStoreKeys(openCashflowFileDb, CASHFLOW_FILE_STORE),
      indexedStoreKeys(drawingDatabase, 'drawings')
    ]);
    return offlineJsonCopy({
      schemaVersion: 1,
      projects: objectRegistry.map((object) => ({ id: object.id, name: object.name, files: object.files })),
      commercialProposals: commercialProposalRecords,
      cashflow: cashflowObjects.map((object) => ({
        ...cashObjectIdentitySnapshot(object),
        organizationDocuments: object.organizationDocuments,
        sections: object.sections.map(cashDocumentSectionSnapshot)
      })),
      localFileInventory: { cashflowFileIds, drawingIds }
    });
  }

  if (category === 'profile') {
    return offlineJsonCopy({
      schemaVersion: 1,
      person: personData,
      profile: profileData,
      builderPassport,
      plan: profilePlan,
      connections: structosConnections,
      preferences: {
        language,
        theme: root.dataset.theme || 'dark',
        selectedWidgets,
        widgetPositions,
        widgetSizes,
        widgetStyles,
        todoItems,
        activityLog
      }
    });
  }

  return { schemaVersion: 1 };
}

function offlineSyncHasValue(value) {
  if (value == null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.values(value).some(offlineSyncHasValue);
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
}

function countOfflineSyncSubsections(category, payload = {}) {
  if (category === 'projects') {
    const objectIds = new Set([...(payload.objects || []), ...(payload.invitedObjects || [])].map((object) => object?.id).filter(Boolean));
    const activeUploads = Object.values(payload.currentUploads || {}).filter(offlineSyncHasValue).length;
    return objectIds.size + activeUploads;
  }

  if (category === 'staff') {
    return (payload.objects || []).reduce((total, object) => total + (object.sections || []).length, 0);
  }

  if (category === 'finance') {
    const financeSections = (payload.objects || []).reduce((total, object) => total + (object.sections || []).length, 0);
    return financeSections + (offlineSyncHasValue(payload.account) ? 1 : 0);
  }

  if (category === 'warehouse') {
    const projectFiles = (payload.projects || []).reduce((total, project) => total + (project.files || []).filter((file) =>
      offlineSyncHasValue(file.sourceCatalog) || offlineSyncHasValue(file.materials) || offlineSyncHasValue(file.equipment) || offlineSyncHasValue(file.specification)
    ).length, 0);
    const cashflowSections = (payload.cashflow || []).reduce((total, object) => total + (object.sections || []).filter((section) => offlineSyncHasValue(section.sourceCatalog)).length, 0);
    return projectFiles + cashflowSections;
  }

  if (category === 'documents') {
    const projectFiles = (payload.projects || []).reduce((total, project) => total + (project.files || []).length, 0);
    const cashflowDocuments = (payload.cashflow || []).reduce((total, object) => {
      const organizationDocuments = offlineSyncHasValue(object.organizationDocuments) ? 1 : 0;
      const sectionDocuments = (object.sections || []).filter((section) =>
        offlineSyncHasValue(section.attachments) || offlineSyncHasValue(section.statement) || offlineSyncHasValue(section.act) || offlineSyncHasValue(section.reportHistory)
      ).length;
      return total + organizationDocuments + sectionDocuments;
    }, 0);
    const localFiles = (payload.localFileInventory?.cashflowFileIds || []).length + (payload.localFileInventory?.drawingIds || []).length;
    return projectFiles + cashflowDocuments + localFiles;
  }

  if (category === 'profile') {
    return ['person', 'profile', 'builderPassport', 'plan', 'connections', 'preferences']
      .filter((key) => offlineSyncHasValue(payload[key])).length;
  }

  return 0;
}

const offlineSync = createOfflineSyncEngine({
  categories: OFFLINE_SYNC_CATEGORIES.map((category) => category.id),
  collectCategory: collectOfflineSyncCategory,
  countSubsections: countOfflineSyncSubsections
});
let offlineSyncState = offlineSync.getState();
let offlineSyncNetworkMode = navigator.onLine ? 'online' : 'offline';
let offlineSyncRestoredTimer;

function offlineSyncDate(value) {
  if (!value) return '';
  try {
    return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(value));
  } catch {
    return '';
  }
}

function offlineSyncCountWord(prefix, count) {
  if (language === 'RU') {
    const lastTwo = count % 100;
    const last = count % 10;
    if (last === 1 && lastTwo !== 11) return tr(`${prefix}One`);
    if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) return tr(`${prefix}Few`);
  } else if (language === 'EN' && count === 1) {
    return tr(`${prefix}One`);
  }
  return tr(`${prefix}Many`);
}

function renderOfflineSyncState(state = offlineSyncState) {
  const section = $('.home-sync-section');
  const status = $('[data-sync-live-status]');
  if (!section || !status) return;
  section.dataset.syncNetwork = state.online ? offlineSyncNetworkMode : 'offline';
  const pendingSummary = $('[data-sync-pending-summary]', section);
  const pendingSections = Math.max(0, Number(state.pendingCount) || 0);
  const pendingSubsections = Math.max(0, Number(state.pendingSubsectionCount) || 0);
  if (pendingSummary) {
    pendingSummary.classList.toggle('is-synced', pendingSections === 0 && pendingSubsections === 0);
    $('[data-sync-pending-sections]', pendingSummary).textContent = String(pendingSections);
    $('[data-sync-pending-section-label]', pendingSummary).textContent = offlineSyncCountWord('syncSection', pendingSections);
    $('[data-sync-pending-subsections]', pendingSummary).textContent = String(pendingSubsections);
    $('[data-sync-pending-subsection-label]', pendingSummary).textContent = offlineSyncCountWord('syncSubsection', pendingSubsections);
  }
  status.classList.remove('is-ready', 'is-synced', 'is-offline', 'is-syncing', 'is-error');

  let title = tr('syncStatePreparingTitle');
  let copyText = tr('syncStatePreparingCopy');
  let statusClass = 'is-syncing';
  if (!state.online) {
    title = tr('syncStateOfflineTitle');
    copyText = tr('syncStateOfflineCopy');
    statusClass = 'is-offline';
  } else if (state.phase === 'error') {
    title = tr('syncStateErrorTitle');
    copyText = tr('syncStateErrorCopy');
    statusClass = 'is-error';
  } else if (state.syncing) {
    title = tr('syncStatePreparingTitle');
    copyText = state.phase === 'pushing' || state.phase === 'pulling' ? tr('syncProgressCloud') : tr('syncProgressSaving');
    statusClass = 'is-syncing';
  } else if (state.phase === 'synced') {
    title = tr('syncStateSyncedTitle');
    copyText = tr('syncStateSyncedCopy');
    statusClass = 'is-synced';
  } else if (state.deviceReady) {
    title = tr('syncStateReadyTitle');
    copyText = tr('syncStateReadyCopy');
    statusClass = 'is-ready';
  }

  const savedAt = offlineSyncDate(state.lastLocalSaveAt);
  if (savedAt && !state.syncing) copyText = `${copyText} · ${tr('syncLastSaved')}: ${savedAt}`;
  status.classList.add(statusClass);
  $('[data-sync-live-title]', status).textContent = title;
  $('[data-sync-live-copy]', status).textContent = copyText;
  $('[data-sync-live-action]', status).textContent = tr('syncOpen');
}

function handleOfflineSyncState(nextState) {
  const wasOnline = offlineSyncState.online;
  offlineSyncState = nextState;
  clearTimeout(offlineSyncRestoredTimer);
  if (!wasOnline && nextState.online) {
    offlineSyncNetworkMode = 'restored';
    offlineSyncRestoredTimer = setTimeout(() => {
      offlineSyncNetworkMode = navigator.onLine ? 'online' : 'offline';
      renderOfflineSyncState();
    }, 4200);
  } else if (!nextState.online) {
    offlineSyncNetworkMode = 'offline';
  } else if (offlineSyncNetworkMode !== 'restored') {
    offlineSyncNetworkMode = 'online';
  }
  renderOfflineSyncState(nextState);
}

function syncCategoryMarkup(category) {
  return `<label class="sync-category-option"><input type="checkbox" value="${category.id}" data-sync-category /><span><b>${category.icon}</b><span><strong>${escapeHtml(tr(category.labelKey))}</strong><small>${escapeHtml(tr(category.hintKey))}</small></span><b class="sync-category-check">✓</b></span></label>`;
}

function openOfflineSyncDialog() {
  const online = navigator.onLine;
  const architecture = `<div class="sync-architecture"><div><small>${escapeHtml(tr('syncServerRole'))}</small><strong>${escapeHtml(tr('syncServerMain'))}</strong></div><div><small>${escapeHtml(tr('syncDeviceRole'))}</small><strong>${escapeHtml(tr('syncDeviceCopy'))}</strong></div><div><small>${escapeHtml(tr('syncEngineRole'))}</small><strong>${escapeHtml(tr('syncEngineCopy'))}</strong></div></div>`;
  const extra = `<div class="sync-dialog-intro${online ? '' : ' is-offline'}"><i></i><span><strong>${escapeHtml(tr(online ? 'syncOnlineTitle' : 'syncOfflineTitle'))}</strong><small>${escapeHtml(tr(online ? 'syncOnlineCopy' : 'syncOfflineCopy'))}</small></span></div>
    <fieldset class="sync-category-fieldset"><legend>${escapeHtml(tr('syncChooseData'))}</legend><div class="sync-category-grid">${OFFLINE_SYNC_CATEGORIES.map(syncCategoryMarkup).join('')}</div></fieldset>
    <div class="sync-server-only-note"><b>!</b><span>${escapeHtml(tr('syncServerOnlyNote'))}</span></div>
    ${architecture}
    <div class="sync-dialog-progress" data-sync-progress hidden><span><i></i></span><small data-sync-progress-copy>${escapeHtml(tr('syncProgressSaving'))}</small></div>
    <div class="sync-dialog-actions"><button class="outline-button" type="button" data-sync-selected disabled>${escapeHtml(tr('syncSelected'))}</button><button class="primary-button" type="button" data-sync-all>${escapeHtml(tr('syncAll'))}</button></div>`;
  showDialog(escapeHtml(tr('syncDialogTitle')), escapeHtml(tr('syncDialogHint')), extra);
  const dialog = $('[data-dialog]');
  dialog.classList.add('sync-dialog');
  const scope = $('[data-dialog-content]');
  const selectedButton = $('[data-sync-selected]', scope);
  const allButton = $('[data-sync-all]', scope);
  const progress = $('[data-sync-progress]', scope);
  const progressCopy = $('[data-sync-progress-copy]', scope);

  const selection = () => $$('[data-sync-category]:checked', scope).map((input) => input.value);
  const updateSelection = () => { selectedButton.disabled = selection().length === 0; };
  $$('[data-sync-category]', scope).forEach((input) => input.addEventListener('change', updateSelection));

  const synchronize = async (categories) => {
    if (!categories.length) { showToast(tr('syncSelectOne')); return; }
    selectedButton.disabled = true;
    allButton.disabled = true;
    $$('[data-sync-category]', scope).forEach((input) => { input.disabled = true; });
    progress.hidden = false;
    progressCopy.textContent = tr('syncProgressSaving');
    const cloudPhaseTimer = setTimeout(() => { if (navigator.onLine) progressCopy.textContent = tr('syncProgressCloud'); }, 320);
    const result = await offlineSync.prepare(categories);
    clearTimeout(cloudPhaseTimer);
    if (result?.cloud) showToast(tr('syncToastCloud'));
    else if (result?.offline) showToast(tr('syncToastOffline'));
    else showToast(tr('syncToastDevice'));
    setTimeout(() => { if (dialog.open) dialog.close(); }, 260);
  };

  selectedButton.addEventListener('click', () => synchronize(selection()));
  allButton.addEventListener('click', () => synchronize(OFFLINE_SYNC_CATEGORIES.map((category) => category.id)));
}

offlineSync.subscribe(handleOfflineSyncState);

function openObjectDialog() {
  if (objectRegistry.filter((object) => object.status === 'active').length >= ACTIVE_OBJECT_LIMIT) {
    showActiveLimit();
    return;
  }
  showDialog(tr('addObject'), tr('noObjectsCopy'), `<div class="object-form"><label><span class="sr-only">${tr('objectName')}</span><input data-object-name maxlength="80" placeholder="${tr('objectPlaceholder')}" /></label><button class="primary-button" type="button" data-create-object>${tr('create')}</button></div>`);
  setTimeout(() => $('[data-object-name]')?.focus(), 40);
  $('[data-create-object]')?.addEventListener('click', () => {
    const name = $('[data-object-name]').value.trim();
    if (!name) { $('[data-object-name]').focus(); return; }
    const now = new Date().toISOString();
    objectRegistry.unshift({ id: createObjectId(), name, projectTitle: name, projectSection: name, documentTitles: normalizeProjectDocumentTitles(), contractNumber: '', status: 'active', createdAt: now, updatedAt: now, uploadedAt: now, analyzedAt: now, startedAt: now, completedAt: null, files: [] });
    saveObjects();
    renderObjects();
    renderWidgets();
    $('[data-dialog]').close();
    showToast(tr('objectCreated'));
  });
}

async function logout() {
  localStorage.removeItem(DEMO_SESSION_KEY);
  if (authClient) await authClient.auth.signOut();
  window.location.replace('login.html#login');
}

async function forceRefresh() {
  const button = $('[data-force-refresh]');
  button.classList.add('is-refreshing');
  button.disabled = true;
  try {
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key.startsWith('structos-')).map((key) => caches.delete(key)));
    }
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      await registration?.update();
    }
  } catch {}
  const url = new URL(window.location.href);
  url.searchParams.set('refresh', Date.now().toString());
  url.hash = 'space';
  window.location.replace(url);
}

$('[data-language]').addEventListener('change', (event) => applyLanguage(event.target.value));
$('[data-refresh-page]').addEventListener('click', (event) => {
  event.currentTarget.classList.add('is-refreshing');
  setTimeout(() => window.location.reload(), 180);
});
$('[data-force-refresh]').addEventListener('click', forceRefresh);
$('[data-theme-toggle]').addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
$('[data-menu-open]').addEventListener('click', openMenu);
$$('[data-menu-close]').forEach((button) => button.addEventListener('click', closeMenu));
$$('[data-copy-id]').forEach((button) => button.addEventListener('click', copyId));
$$('[data-copy-referral]').forEach((button) => button.addEventListener('click', copyReferral));
$$('[data-share-referral]').forEach((button) => button.addEventListener('click', shareReferral));
const bottomMenuToggle = $('[data-bottom-menu-toggle]');
bottomMenuToggle?.addEventListener('click', () => setBottomMenu(!$('[data-bottom-menu]').classList.contains('is-open')));
$$('[data-tab]').forEach((button) => button.addEventListener('click', () => setPanel(button.dataset.tab)));
$$('[data-open-panel]').forEach((button) => button.addEventListener('click', () => setPanel(button.dataset.openPanel)));
$$('[data-project-menu-placeholder]').forEach((button) => button.addEventListener('click', () => {
  const label = tr(button.dataset.projectMenuPlaceholder);
  showToast(tr('projectMenuPrepared').replace('{name}', label));
}));
$$('[data-launch-turnkey-object]').forEach((button) => button.addEventListener('click', () => openProjectObjectWizard({ workspaceOrigin: 'turnkey' })));
$$('[data-open-view]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.openView)));
$$('[data-action]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.action)));
$$('[data-analysis-type]').forEach((button) => button.addEventListener('click', () => openUploadDialog(button.dataset.analysisType)));
$('[data-run-analysis]')?.addEventListener('click', runAnalysis);
$$('[data-create-project-object]').forEach((button) => button.addEventListener('click', () => openProjectObjectWizard()));
$('[data-quick-project-analysis]')?.addEventListener('click', () => openProjectObjectWizard({ quickProjectOnly: true }));
$('[data-quick-object-start]')?.addEventListener('click', openCashObjectDialog);
$('[data-open-sync-dialog]')?.addEventListener('click', openOfflineSyncDialog);
$$('[data-add-object]').forEach((button) => button.addEventListener('click', openObjectDialog));
$$('[data-add-cash-object]').forEach((button) => button.addEventListener('click', openCashObjectDialog));
$('[data-export-all-cashflow]')?.addEventListener('click', openAllCashflowExportDialog);
$('[data-profile-menu]').addEventListener('click', () => $('.drawer-group').classList.toggle('is-open'));
$('[data-logout]').addEventListener('click', logout);
$('[data-space-settings]').addEventListener('click', () => {
  const toolbar = $('[data-space-toolbar]');
  toolbar.hidden = !toolbar.hidden;
  $('[data-space-settings]').setAttribute('aria-expanded', String(!toolbar.hidden));
});
$('[data-space-done]').addEventListener('click', () => { $('[data-space-toolbar]').hidden = true; $('[data-space-settings]').setAttribute('aria-expanded', 'false'); });
$('[data-edit-profile]').addEventListener('click', openProfileEditor);
$('[data-edit-profile-personal]')?.addEventListener('click', openProfileEditor);
$('[data-drawing-close]')?.addEventListener('click', closeDrawingStudio);
$('[data-drawing-minimize]')?.addEventListener('click', minimizeDrawingStudio);
$('[data-drawing-restore]')?.addEventListener('click', openDrawingStudio);
$('[data-drawing-new]')?.addEventListener('click', newDrawingFlow);
$('[data-drawing-undo]')?.addEventListener('click', undoDrawing);
$('[data-drawing-clear]')?.addEventListener('click', () => { clearDrawingCanvas(); currentDrawingId = null; drawingDirty = true; });
$('[data-drawing-title]')?.addEventListener('input', () => { if (drawingInitialized) drawingDirty = true; });
$('[data-drawing-upload]')?.addEventListener('click', () => $('[data-drawing-file]').click());
$('[data-drawing-file]')?.addEventListener('change', (event) => {
  loadDrawingBackground(event.currentTarget.files?.[0]);
  event.currentTarget.value = '';
});
$('[data-drawing-save]')?.addEventListener('click', saveDrawingRecord);
$('[data-drawing-saved]')?.addEventListener('click', renderDrawingGallery);
$('[data-drawing-gallery-close]')?.addEventListener('click', () => { $('[data-drawing-gallery]').hidden = true; });
$('[data-drawing-share]')?.addEventListener('click', shareDrawingFile);
$$('[data-report-preview-close]').forEach((button) => button.addEventListener('click', () => $('[data-report-preview-dialog]')?.close()));
$('[data-report-preview-dialog]')?.addEventListener('close', () => {
  releaseCashOrganizationPreview();
  const content = $('[data-report-preview-content]');
  const actions = $('[data-report-preview-actions]');
  if (content) content.innerHTML = '';
  if (actions) actions.innerHTML = '';
});
drawingDialog?.addEventListener('cancel', () => {
  drawingMinimized = false;
  $('[data-drawing-restore]').hidden = true;
});
drawingDialog?.addEventListener('close', () => {
  if (!drawingMinimized) $('[data-drawing-restore]').hidden = true;
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', renderWidgets);
window.addEventListener('pagehide', persistIdentityLocal);

const pendingTransferImport = importPendingTransfer();
applyPassportRewards(passportCompletion());
applyTheme(localStorage.getItem('structos-theme') === 'light' ? 'light' : 'dark');
applyLanguage(language);
startHomeStatisticsClock();
renderWidgetPicker();
renderWidgets();
selectAnalysis(selectedAnalysis);
renderAnalysisCards();
renderObjects();
renderCashflow();
renderProfilePersonalData();
renderConnectionsSummary();
offlineSync.initialize();
recordActivity('cabinet', 'daily-session', { daily: true });
document.addEventListener('click', trackConstructionActivity, true);
setPanel(pendingTransferImport?.intent === 'commercial-proposal' ? 'proposals' : (location.hash.slice(1) || 'home'));
restoreBottomMenuState();
const cabinetRole = await initAuth();
if (cabinetRole) playCabinetWelcome(cabinetRole);
if (pendingTransferImport?.intent === 'commercial-proposal' || location.hash === '#proposals') localStorage.removeItem(AUTH_RETURN_KEY);

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
