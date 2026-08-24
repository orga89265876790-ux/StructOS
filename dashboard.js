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
  money: 'Деньги', quickCashflow: 'Быстрые доходы/расходы', cashflowDescription: 'Короткий финансовый учёт по каждому объекту', noCashObjects: 'Объектов для учёта пока нет', noCashObjectsCopy: 'Добавьте объект, укажите его стоимость и ведите полученные суммы и расходы.',
  objectCost: 'Стоимость объекта', workByFact: 'Работаю от факта выполнения', paymentByFact: 'Оплата по факту', received: 'Получено', expense: 'Расход', totalReceived: 'Итого получено', totalExpense: 'Итого расход', remainingFromCost: 'Осталось от стоимости объекта', income: 'Доход', balanceResult: 'Баланс: доход − расход', comment: 'Комментарий', addIncome: 'Добавить доход', addExpense: 'Добавить расход', createCashObject: 'Создать финансовый объект', cashObjectCreated: 'Объект добавлен в быстрый учёт', amountRequired: 'Укажите сумму и комментарий', noEntries: 'Записей пока нет',
  widgetAppearance: 'Оформление блока', doubleTapHint: 'Двойное касание открывает оформление', blockColor: 'Внутренний цвет', pulseBlock: 'Пульсация блока',
  widgetDrawing: 'Рисование', drawing: 'Рисование', lineColor: 'Цвет', lineWidth: 'Толщина', undo: 'Отменить', clearDrawing: 'Очистить', stylusHint: 'Рисуйте пальцем, стилусом или Apple Pencil', uploadBackground: 'Загрузить файл', save: 'Сохранить', viewSaved: 'Сохранённое', format: 'Формат', shareDrawing: 'Отправить', savedDrawings: 'Сохранённые рисунки', noSavedDrawings: 'Сохранённых рисунков пока нет', loadDrawing: 'Открыть', drawingSaved: 'Рисунок сохранён', backgroundLoaded: 'Страница загружена для рисования', drawingShareReady: 'Файл подготовлен', newSketch: 'Новый эскиз',
  todoList: 'Список дел', todoEmpty: 'Добавьте первое дело', newTask: 'Новое дело', addTask: 'Добавить дело', taskAdded: 'Дело добавлено', taskDeleted: 'Дело удалено', deleteTask: 'Удалить дело', deleteTaskConfirm: 'Удалить это дело?', dueDate: 'Дата выполнения', overdueTask: 'Просрочено', todayTask: 'Сегодня', nextTask: 'Следующее дело', futureTask: 'Запланировано', completedTask: 'Выполнено'
});
Object.assign(copy.EN, {
  money: 'Money', quickCashflow: 'Quick income/expenses', cashflowDescription: 'Simple financial tracking for each object', noCashObjects: 'No tracked objects yet', noCashObjectsCopy: 'Add an object, set its value, and record received amounts and expenses.',
  objectCost: 'Object value', workByFact: 'Work by actual completion', paymentByFact: 'Payment by actual completion', received: 'Received', expense: 'Expense', totalReceived: 'Total received', totalExpense: 'Total expense', remainingFromCost: 'Remaining from object value', income: 'Income', balanceResult: 'Balance: income − expense', comment: 'Comment', addIncome: 'Add income', addExpense: 'Add expense', createCashObject: 'Create financial object', cashObjectCreated: 'Object added to quick tracking', amountRequired: 'Enter an amount and comment', noEntries: 'No entries yet',
  widgetAppearance: 'Block appearance', doubleTapHint: 'Double tap opens appearance settings', blockColor: 'Inner color', pulseBlock: 'Pulse block',
  widgetDrawing: 'Drawing', drawing: 'Drawing', lineColor: 'Color', lineWidth: 'Width', undo: 'Undo', clearDrawing: 'Clear', stylusHint: 'Draw with a finger, stylus, or Apple Pencil', uploadBackground: 'Upload file', save: 'Save', viewSaved: 'Saved', format: 'Format', shareDrawing: 'Share', savedDrawings: 'Saved drawings', noSavedDrawings: 'No saved drawings yet', loadDrawing: 'Open', drawingSaved: 'Drawing saved', backgroundLoaded: 'Page loaded for drawing', drawingShareReady: 'File prepared', newSketch: 'New sketch',
  todoList: 'To-do list', todoEmpty: 'Add your first task', newTask: 'New task', addTask: 'Add task', taskAdded: 'Task added', taskDeleted: 'Task deleted', deleteTask: 'Delete task', deleteTaskConfirm: 'Delete this task?', dueDate: 'Due date', overdueTask: 'Overdue', todayTask: 'Today', nextTask: 'Next task', futureTask: 'Scheduled', completedTask: 'Completed'
});
Object.assign(copy.KY, {
  money: 'Акча', quickCashflow: 'Тез киреше/чыгаша', cashflowDescription: 'Ар бир объект боюнча кыска каржы эсеби', noCashObjects: 'Эсеп үчүн объект жок', noCashObjectsCopy: 'Объект кошуп, баасын, түшкөн акчаны жана чыгашаны жазыңыз.',
  objectCost: 'Объекттин баасы', workByFact: 'Аткарылган иш боюнча иштейм', paymentByFact: 'Факт боюнча төлөм', received: 'Алынды', expense: 'Чыгаша', totalReceived: 'Бардыгы алынды', totalExpense: 'Бардык чыгаша', remainingFromCost: 'Объекттин баасынан калды', income: 'Киреше', balanceResult: 'Баланс: киреше − чыгаша', comment: 'Комментарий', addIncome: 'Киреше кошуу', addExpense: 'Чыгаша кошуу', createCashObject: 'Каржы объектисин түзүү', cashObjectCreated: 'Объект тез эсепке кошулду', amountRequired: 'Сумманы жана комментарийди жазыңыз', noEntries: 'Жазуу жок',
  widgetAppearance: 'Блоктун көрүнүшү', doubleTapHint: 'Эки жолу тийүү көрүнүштү ачат', blockColor: 'Ички түс', pulseBlock: 'Блоктун пульсациясы',
  widgetDrawing: 'Сүрөт тартуу', drawing: 'Сүрөт тартуу', lineColor: 'Түс', lineWidth: 'Калыңдык', undo: 'Артка кайтаруу', clearDrawing: 'Тазалоо', stylusHint: 'Манжа, стилус же Apple Pencil менен тартыңыз', uploadBackground: 'Файл жүктөө', save: 'Сактоо', viewSaved: 'Сакталгандар', format: 'Формат', shareDrawing: 'Жөнөтүү', savedDrawings: 'Сакталган сүрөттөр', noSavedDrawings: 'Сүрөттөр жок', loadDrawing: 'Ачуу', drawingSaved: 'Сүрөт сакталды', backgroundLoaded: 'Барак сүрөт тартууга жүктөлдү', drawingShareReady: 'Файл даяр', newSketch: 'Жаңы эскиз',
  todoList: 'Иштер тизмеси', todoEmpty: 'Биринчи ишти кошуңуз', newTask: 'Жаңы иш', addTask: 'Иш кошуу', taskAdded: 'Иш кошулду', taskDeleted: 'Иш өчүрүлдү', deleteTask: 'Ишти өчүрүү', deleteTaskConfirm: 'Бул ишти өчүрөсүзбү?', dueDate: 'Аткаруу күнү', overdueTask: 'Мөөнөтү өттү', todayTask: 'Бүгүн', nextTask: 'Кийинки иш', futureTask: 'Пландаштырылган', completedTask: 'Аткарылды'
});
Object.assign(copy.TJ, {
  money: 'Пул', quickCashflow: 'Даромад/хароҷоти зуд', cashflowDescription: 'Ҳисоби кӯтоҳи молиявӣ барои ҳар объект', noCashObjects: 'Объект барои ҳисоб нест', noCashObjectsCopy: 'Объектро илова карда, арзиш, маблағи гирифташуда ва хароҷотро ворид кунед.',
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

let language = copy[localStorage.getItem('structos-language')] ? localStorage.getItem('structos-language') : 'RU';
let currentId = '4 820 197';
let authClient = null;
let toastTimer;
const DEMO_SESSION_KEY = 'structos-demo-session';
const FINANCE_KEY = 'structos-finance-v1';
const UPLOADS_KEY = 'structos-analysis-uploads-v1';
const OBJECT_NAME_KEY = 'structos-analysis-object-name';
const OBJECTS_KEY = 'structos-objects-v1';
const PROFILE_COMPLETION_KEY = 'structos-profile-completion';
const PENDING_TRANSFER_KEY = 'structos-pending-transfer-v1';
const WIDGET_STYLES_KEY = 'structos-space-widget-styles-v1';
const TODO_KEY = 'structos-space-todo-v1';
const CASHFLOW_KEY = 'structos-cashflow-v1';
const ACTIVE_OBJECT_LIMIT = 1;
const uploadRules = {
  project: { accept: '.pdf,.dwg,.rvt,.jpg,.jpeg,.png,.webp,.heic,image/*', extensions: ['pdf', 'dwg', 'rvt', 'jpg', 'jpeg', 'png', 'webp', 'heic'], formats: 'PDF, DWG, RVT, JPG, PNG, WEBP, HEIC', maxMb: 500 },
  contract: { accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,image/*', extensions: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'webp', 'heic'], formats: 'PDF, DOC, DOCX, JPG, PNG, WEBP, HEIC', maxMb: 100 },
  estimate: { accept: '.xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png,.webp,.heic,image/*', extensions: ['xlsx', 'xls', 'csv', 'pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic'], formats: 'XLSX, XLS, CSV, PDF, JPG, PNG, WEBP, HEIC', maxMb: 100 }
};
let selectedAnalysis = 'project';
let analysisTimer;
let activeUploadKind = 'project';
let pendingFile = null;
let activeUploadObjectId = null;
let newObjectNameDraft = '';
const widgetColors = ['#0b63ce', '#00a9df', '#04a77b', '#41a447', '#d5a800', '#e87919', '#d64254', '#7957d5', '#c04ea3', '#44546a'];

function loadFinance() {
  try {
    const saved = JSON.parse(localStorage.getItem(FINANCE_KEY) || 'null');
    if (saved && Number.isFinite(saved.balance) && Number.isFinite(saved.bonuses)) {
      saved.rewards ||= {};
      saved.rewards.passportFirst = Boolean(saved.rewards.passportFirst);
      saved.rewards.passport65 = Boolean(saved.rewards.passport65 || saved.rewards.passportFull);
      saved.rewards.profileFull = Boolean(saved.rewards.profileFull);
      return saved;
    }
  } catch {}
  return {
    balance: 0,
    bonuses: 200,
    balanceHistory: [],
    bonusHistory: [{ key: 'passportFirstReward', amount: 200, date: new Date().toISOString() }],
    rewards: { passportFirst: true, passport65: false, profileFull: false }
  };
}

const finance = loadFinance();

function loadUploads() {
  try {
    const saved = JSON.parse(localStorage.getItem(UPLOADS_KEY) || 'null');
    if (saved && typeof saved === 'object') {
      return {
        project: saved.project?.name ? saved.project : null,
        contract: saved.contract?.name ? saved.contract : null,
        estimate: saved.estimate?.name ? saved.estimate : null
      };
    }
  } catch {}
  return { project: null, contract: null, estimate: null };
}

const selectedFiles = loadUploads();

function loadObjectRegistry() {
  try {
    const saved = JSON.parse(localStorage.getItem(OBJECTS_KEY) || '[]');
    if (Array.isArray(saved)) {
      return saved
        .filter((object) => object && typeof object.name === 'string' && ['uploaded', 'ready', 'active'].includes(object.status))
        .map((object) => ({
          id: String(object.id || `object-${Date.now()}-${Math.random().toString(16).slice(2)}`),
          name: object.name.trim().slice(0, 100) || 'Объект',
          status: object.status,
          analyzedAt: object.analyzedAt || new Date().toISOString(),
          uploadedAt: object.uploadedAt || object.analyzedAt || new Date().toISOString(),
          startedAt: object.startedAt || null,
          files: Array.isArray(object.files) ? object.files.slice(0, 3) : []
        }));
    }
  } catch {}
  return [];
}

let objectRegistry = loadObjectRegistry();

function tr(key) { return copy[language]?.[key] ?? copy.RU[key] ?? key; }

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
  renderReferral();
  renderAnalysisCards();
  renderObjects();
  renderWidgets();
  renderWidgetPicker();
  renderCashflow();
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

function applyProfileReward(progress) {
  finance.rewards ||= {};
  finance.rewards.profileFull = Boolean(finance.rewards.profileFull);
  if (progress < 100 || finance.rewards.profileFull) return;
  finance.rewards.profileFull = true;
  finance.bonuses += 500;
  finance.bonusHistory.unshift({ key: 'profileFullReward', amount: 500, date: new Date().toISOString() });
  saveFinance();
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
  const next = ['home', 'space', 'objects', 'cashflow', 'profile'].includes(name) ? name : 'home';
  $('[data-dashboard]').classList.toggle('is-space-mode', next === 'space');
  if (next !== 'space') {
    $('[data-space-toolbar]').hidden = true;
    $('[data-space-settings]').setAttribute('aria-expanded', 'false');
  }
  $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== next; panel.classList.toggle('is-active', panel.dataset.panel === next); });
  $$('[data-tab]').forEach((button) => { button.classList.toggle('is-active', button.dataset.tab === next); });
  history.replaceState(null, '', `#${next}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (next === 'space') requestAnimationFrame(renderWidgets);
  if (next === 'cashflow') renderCashflow();
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
  passport: { label: 'widgetPassport', icon: '◇', hint: '40%' },
  project: { label: 'project', icon: '▱', hint: '1' },
  contract: { label: 'contract', icon: '§', hint: '1' },
  estimate: { label: 'estimate', icon: '₽', hint: '1' },
  tasks: { label: 'widgetTasks', icon: '☑', hint: '0' },
  team: { label: 'widgetTeam', icon: '◎', hint: '0' },
  finance: { label: 'widgetFinance', icon: '₽', hint: '0 ₽' },
  drawing: { label: 'widgetDrawing', icon: '✎', hint: '∞' }
};
const defaultWidgets = Object.keys(widgetDefinitions);
const WIDGETS_VERSION_KEY = 'structos-space-widgets-version';

function readStoredJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
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
if (localStorage.getItem(WIDGETS_VERSION_KEY) !== '3') {
  selectedWidgets = [...defaultWidgets];
  localStorage.setItem('structos-space-widgets', JSON.stringify(selectedWidgets));
  localStorage.setItem(WIDGETS_VERSION_KEY, '3');
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
      ? `${objectRegistry.filter((object) => object.status === 'active').length} / ${ACTIVE_OBJECT_LIMIT}`
      : id === 'tasks' ? `${todoItems.filter((item) => !item.done).length} / ${todoItems.length}`
        : id === 'finance' ? `${cashflowObjects.length}` : definition.hint;
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
  const colors = widgetColors.map((color, index) => `<button class="widget-color-swatch${current.color === color ? ' is-selected' : ''}" type="button" data-widget-color="${color}" style="--swatch:${color}" aria-label="${tr('blockColor')} ${index + 1}"></button>`).join('');
  showDialog(tr('widgetAppearance'), tr('doubleTapHint'), `<section class="widget-appearance"><h3>${tr(definition.label)} · ${tr('blockColor')}</h3><div class="widget-color-grid">${colors}</div><button class="widget-pulse-toggle${current.pulse ? ' is-on' : ''}" type="button" data-widget-pulse aria-pressed="${Boolean(current.pulse)}"><span>${tr('pulseBlock')}</span><i aria-hidden="true"></i></button></section>`);

  $$('[data-widget-color]', $('[data-dialog-content]')).forEach((button) => button.addEventListener('click', () => {
    widgetStyles[id] = { ...(widgetStyles[id] || {}), color: button.dataset.widgetColor };
    saveWidgetStyles();
    $$('[data-widget-color]', $('[data-dialog-content]')).forEach((swatch) => swatch.classList.toggle('is-selected', swatch === button));
    const card = $(`.space-widget[data-widget="${id}"]`);
    card?.style.setProperty('--widget-color', button.dataset.widgetColor);
  }));
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

function showDialog(title, copyText, extra = '') {
  const dialog = $('[data-dialog]');
  dialog.classList.remove('cash-document-dialog', 'cash-export-dialog');
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
  const rules = `<div class="bonus-rules"><div><b>10%</b><span>${tr('topUpHint')}</span></div><div><b>+200</b><span>${tr('passportFirstReward')}</span></div><div><b>+300</b><span>${tr('passport65Reward')}</span></div><div><b>+200</b><span>${tr('referralReward')}</span></div><div><b>+500</b><span>${tr('profileFullReward')}</span></div></div>`;
  showDialog(tr('bonuses'), tr('bonusRules'), `${rules}<section class="history-section"><h3>${tr('bonusHistory')}</h3>${historyMarkup(finance.bonusHistory, true)}</section>`);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
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
  const normalizeParty = (party) => ({ name: String(party?.name || '').slice(0, 160), signature: String(party?.signature || '').slice(0, 160) });
  return {
    prepared: normalizeParty(value?.prepared),
    performed: normalizeParty(value?.performed),
    accepted: normalizeParty(value?.accepted),
    date: /^\d{4}-\d{2}-\d{2}$/.test(value?.date || '') ? value.date : localDateKey()
  };
}

function normalizeCashWorkRows(value, priced = false) {
  const rows = Array.isArray(value) ? value : [];
  const normalized = rows.map((row) => ({
    id: String(row?.id || `work-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    name: String(row?.name || '').slice(0, 240),
    unit: String(row?.unit || '').slice(0, 40),
    quantity: Math.max(0, Number(row?.quantity) || 0),
    ...(priced ? { price: Math.max(0, Number(row?.price) || 0) } : {})
  }));
  return normalized.length ? normalized : [{ id: `work-${Date.now()}-${Math.random().toString(16).slice(2)}`, name: '', unit: '', quantity: 0, ...(priced ? { price: 0 } : {}) }];
}

function normalizeCashDocument(value, priced = false, defaultTitle = '') {
  return {
    title: String(value?.title || defaultTitle).trim().slice(0, 160),
    number: String(value?.number || '').trim().slice(0, 80),
    rows: normalizeCashWorkRows(value?.rows, priced),
    parties: cashDocumentParties(value?.parties),
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
    report: item.report
  }));
}

function cashSectionHasData(section) {
  const entries = ['advances', 'expenses', 'ownInvestments', 'ownReturns', 'factIncome', 'factExpenses'].some((key) => section[key]?.length);
  const documents = Boolean(section.statement?.updatedAt || section.act?.updatedAt || section.reportHistory?.length);
  return entries || documents || section.contractAmount > 0;
}

function normalizeCashSection(section, legacyObject = {}) {
  const contractAmount = Math.max(0, Number(section?.contractAmount ?? legacyObject.cost) || 0);
  const normalized = {
    id: String(section?.id || `section-${Date.now()}-${Math.random().toString(16).slice(2)}`),
    name: String(section?.name || tr('sectionName')).trim().slice(0, 120) || tr('sectionName'),
    createdAt: section?.createdAt || new Date().toISOString(),
    createdManually: Boolean(section?.createdManually),
    contractMode: Boolean(section?.contractMode ?? (contractAmount > 0 || section?.received?.length || section?.advances?.length || section?.expenses?.length)),
    factMode: Boolean(section?.factMode ?? legacyObject.factMode),
    contractAmount,
    advances: normalizeCashEntries(section?.advances || section?.received),
    expenses: normalizeCashEntries(section?.expenses),
    ownInvestments: normalizeCashEntries(section?.ownInvestments),
    ownReturns: normalizeCashEntries(section?.ownReturns),
    factIncome: normalizeCashEntries(section?.factIncome),
    factExpenses: normalizeCashEntries(section?.factExpenses),
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
      name: object.name.trim().slice(0, 100) || tr('objects'),
      createdAt: object.createdAt || new Date().toISOString(),
      completed: Boolean(object.completed),
      completedAt: object.completedAt || null,
      sections
    };
  });
}

let cashflowObjects = loadCashflow();
let activeCashObjectId = null;
const expandedCashSections = new Set();
const expandedCashReportHistory = new Set();
let reportLogoDataUrl = '';

function saveCashflow() {
  localStorage.setItem(CASHFLOW_KEY, JSON.stringify(cashflowObjects));
}

function cashTotal(entries) {
  return Math.round(entries.reduce((sum, entry) => sum + entry.amount, 0) * 100) / 100;
}

function cashDate(value) {
  try { return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value)); }
  catch { return ''; }
}

function cashHistoryMarkup(entries, labelKey) {
  const total = cashTotal(entries);
  const rows = entries.length
    ? entries.map((entry) => `<div class="cash-history-row"><span>${escapeHtml(entry.comment)}<small>${cashDate(entry.date)}</small></span><b>${formatMoney(entry.amount)}</b></div>`).join('')
    : `<div class="cash-history-empty">${tr('noEntries')}</div>`;
  return `<details class="cash-history"><summary><span>${tr(labelKey)}</span><b>${formatMoney(total)}</b></summary><div class="cash-history-list">${rows}</div></details>`;
}

function cashEntryForm(kind, titleKey, buttonKey) {
  return `<section class="cash-entry-form" data-cash-entry="${kind}"><h3>${tr(titleKey)}</h3><input type="number" min="0.01" step="0.01" inputmode="decimal" data-cash-amount placeholder="0 ₽" /><input maxlength="240" data-cash-comment placeholder="${tr('comment')}" /><button class="primary-button" type="button" data-cash-submit>${tr(buttonKey)} · ${tr(titleKey)}</button></section>`;
}

function findCashSection(objectId, sectionId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  return { object, section: object?.sections.find((item) => item.id === sectionId) };
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
  const target = { advances: section.advances, expenses: section.expenses, ownInvestments: section.ownInvestments, ownReturns: section.ownReturns, factIncome: section.factIncome, factExpenses: section.factExpenses }[kind];
  if (!target) return;
  target.unshift({ id: `entry-${Date.now()}-${Math.random().toString(16).slice(2)}`, amount, comment: comment.slice(0, 240), date: new Date().toISOString() });
  saveCashflow();
  renderCashflow();
}

function cashReportHistoryMarkup(section) {
  const isOpen = expandedCashReportHistory.has(section.id);
  const rows = section.reportHistory.length ? section.reportHistory.map((item) => `<article class="cash-report-history-row" data-report-history-id="${escapeHtml(item.id)}"><span><strong>${escapeHtml(item.title)}</strong><small>${cashDate(item.createdAt)}</small></span><div><button type="button" data-history-download="pdf">PDF</button><button type="button" data-history-download="xlsx">Excel</button><button type="button" data-history-share="pdf">↗ PDF</button><button type="button" data-history-share="xlsx">↗ Excel</button></div></article>`).join('') : `<div class="cash-history-empty">${tr('noReports')}</div>`;
  return `<div class="cash-report-history"${isOpen ? '' : ' hidden'}><div class="cash-report-history-list">${rows}</div></div>`;
}

function cashSectionMarkup(object, section) {
  const advances = cashTotal(section.advances);
  const expenses = cashTotal(section.expenses);
  const remainingContract = Math.round((section.contractAmount - advances) * 100) / 100;
  const advanceBalance = Math.round((advances - expenses) * 100) / 100;
  const ownInvested = cashTotal(section.ownInvestments);
  const ownReturned = cashTotal(section.ownReturns);
  const ownRemaining = Math.round((ownInvested - ownReturned) * 100) / 100;
  const factIncome = cashTotal(section.factIncome);
  const factExpenses = cashTotal(section.factExpenses);
  const factBalance = Math.round((factIncome - factExpenses) * 100) / 100;
  const isOpen = expandedCashSections.has(section.id);
  const modeBadges = `${section.contractMode ? `<span>${tr('workByContract')}</span>` : ''}${section.factMode ? `<span>${tr('actualAccounting')}</span>` : ''}`;
  const contractMarkup = section.contractMode ? `<section class="cash-accounting-block cash-contract-accounting"><h4>${tr('contractAccounting')}</h4><div class="cash-contract-head"><article><span>${tr('contractAmount')}</span><strong>${formatMoney(section.contractAmount)}</strong></article><article><span>${tr('receivedAdvances')}</span><strong>${formatMoney(advances)}</strong></article><article><span>${tr('remainingContract')}</span><strong>${formatMoney(remainingContract)}</strong></article></div><div class="cash-summary"><article><span>${tr('totalAdvances')}</span><strong>${formatMoney(advances)}</strong></article><article><span>${tr('totalExpenses')}</span><strong>${formatMoney(expenses)}</strong></article><article class="is-remaining"><span>${tr('advanceBalance')}</span><strong>${formatMoney(advanceBalance)}</strong></article></div><div class="cash-entry-grid">${cashEntryForm('advances', 'received', 'addAdvance')}${cashEntryForm('expenses', 'expense', 'add')}</div>${cashHistoryMarkup(section.advances, 'totalAdvances')}${cashHistoryMarkup(section.expenses, 'totalExpenses')}<section class="cash-own-funds"><h4>${tr('ownFundsAccounting')}</h4><div class="cash-own-summary"><article><span>${tr('totalOwnInvested')}</span><strong>${formatMoney(ownInvested)}</strong></article><article><span>${tr('totalOwnReturned')}</span><strong>${formatMoney(ownReturned)}</strong></article><article><span>${tr('ownFundsRemaining')}</span><strong>${formatMoney(ownRemaining)}</strong></article></div><div class="cash-entry-grid">${cashEntryForm('ownInvestments', 'ownInvested', 'addOwnFunds')}${cashEntryForm('ownReturns', 'returnedFromAdvance', 'addOwnReturn')}</div>${cashHistoryMarkup(section.ownInvestments, 'ownInvested')}${cashHistoryMarkup(section.ownReturns, 'returnedFromAdvance')}</section></section>` : '';
  const factMarkup = section.factMode ? `<section class="cash-fact-table cash-accounting-block"><h4 class="cash-fact-title">${tr('actualAccounting')}</h4><div class="cash-entry-grid">${cashEntryForm('factIncome', 'income', 'addIncome')}${cashEntryForm('factExpenses', 'expense', 'addExpense')}</div>${cashHistoryMarkup(section.factIncome, 'income')}${cashHistoryMarkup(section.factExpenses, 'expense')}<div class="cash-balance"><span>${tr('balanceResult')}</span><strong>${formatMoney(factBalance)}</strong></div></section>` : '';
  return `<section class="cash-section" data-cash-section="${escapeHtml(section.id)}">
    <header class="cash-section-head">
      <button class="cash-section-toggle" type="button" data-cash-section-toggle aria-expanded="${isOpen}"><span>${isOpen ? '⌄' : '›'}</span><strong>${escapeHtml(section.name)}</strong><i>${modeBadges}</i></button>
      <button class="cash-mini-button is-danger" type="button" data-delete-cash-section>${tr('deleteSection')}</button>
    </header>
    <div class="cash-section-body"${isOpen ? '' : ' hidden'}>
      <div class="cash-section-document-actions"><button type="button" data-open-cash-document="statement">${tr('workStatement')}</button><button type="button" data-open-cash-document="act">${tr('workAct')}</button><button type="button" data-export-section>${tr('sectionReport')}</button><button type="button" data-toggle-report-history>${tr('reportHistory')} · ${section.reportHistory.length}</button></div>${cashReportHistoryMarkup(section)}${contractMarkup}${factMarkup}
    </div>
  </section>`;
}

function renderCashflow() {
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
  const orderedObjects = [...cashflowObjects].sort((a, b) => Number(a.completed) - Number(b.completed) || new Date(b.createdAt) - new Date(a.createdAt));
  list.innerHTML = orderedObjects.map((object) => `<article class="cash-object${object.completed ? ' is-completed' : ''}" data-cash-object="${escapeHtml(object.id)}"><header><div class="cash-object-heading"><h2>${escapeHtml(object.name)}</h2><small>${cashDate(object.createdAt)} · ${object.sections.length} ${tr('sectionCalculations')}${object.completed ? ` · ${tr('completedObject')}` : ''}</small><div class="cash-object-actions"><button class="cash-mini-button cash-open-object" type="button" data-open-cash-object>${tr('openMoneyObject')}</button><button class="cash-mini-button is-danger" type="button" data-delete-cash-object>${tr('deleteObject')}</button><label class="cash-mini-button is-complete"><input type="checkbox" data-complete-cash-object${object.completed ? ' checked' : ''} /><span>${object.completed ? tr('reopenObject') : tr('finishObject')}</span></label></div></div></header></article>`).join('');

  $$('[data-cash-object]', list).forEach((card) => {
    const object = cashflowObjects.find((item) => item.id === card.dataset.cashObject);
    if (!object) return;
    $('[data-open-cash-object]', card)?.addEventListener('click', () => { activeCashObjectId = object.id; renderCashflow(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    $('[data-delete-cash-object]', card)?.addEventListener('click', () => {
      if (!window.confirm(tr('deleteCashObjectConfirm'))) return;
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

function bindCashSectionEvents(object, scope) {
  $$('[data-cash-section]', scope).forEach((sectionCard) => {
      const section = object.sections.find((item) => item.id === sectionCard.dataset.cashSection);
      if (!section) return;
      $('[data-cash-section-toggle]', sectionCard)?.addEventListener('click', () => {
        if (expandedCashSections.has(section.id)) expandedCashSections.delete(section.id); else expandedCashSections.add(section.id);
        renderCashflow();
      });
      $('[data-delete-cash-section]', sectionCard)?.addEventListener('click', () => {
        if (!window.confirm(tr('deleteSectionConfirm'))) return;
        object.sections = object.sections.filter((item) => item.id !== section.id);
        expandedCashSections.delete(section.id);
        saveCashflow(); renderCashflow(); showToast(tr('sectionDeleted'));
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
      $$('[data-open-cash-document]', sectionCard).forEach((button) => button.addEventListener('click', () => openCashDocumentDialog(object.id, section.id, button.dataset.openCashDocument)));
      $('[data-export-section]', sectionCard)?.addEventListener('click', () => openSectionExportDialog(object.id, section.id));
      $$('[data-report-history-id]', sectionCard).forEach((historyRow) => {
        const item = section.reportHistory.find((record) => record.id === historyRow.dataset.reportHistoryId);
        if (!item) return;
        $$('[data-history-download]', historyRow).forEach((button) => button.addEventListener('click', () => deliverCashReport(item.report, button.dataset.historyDownload, false).catch((error) => { console.error(error); showToast(tr('comingSoon')); })));
        $$('[data-history-share]', historyRow).forEach((button) => button.addEventListener('click', () => deliverCashReport(item.report, button.dataset.historyShare, true).catch((error) => { if (error?.name !== 'AbortError') { console.error(error); showToast(tr('comingSoon')); } })));
      });
    });
}

function renderCashObjectDetail(object, detail) {
  detail.innerHTML = `<div class="cash-object-detail-head"><button class="outline-button" type="button" data-close-cash-object>‹ ${tr('backToMoneyObjects')}</button><div><span class="eyebrow">STRUCTOS MONEY</span><h1>${escapeHtml(object.name)}</h1><p>${object.completed ? tr('completedObject') : tr('objectSections')}</p></div><button class="primary-button" type="button" data-add-cash-section><span>＋</span>${tr('addSection')}</button></div>${object.sections.length ? `<div class="cash-sections">${object.sections.map((section) => cashSectionMarkup(object, section)).join('')}</div>` : `<div class="cash-sections-empty"><span>＋</span><h2>${tr('noSections')}</h2><p>${tr('noSectionsCopy')}</p><button class="primary-button" type="button" data-add-cash-section>${tr('addSection')}</button></div>`}`;
  $('[data-close-cash-object]', detail)?.addEventListener('click', () => { activeCashObjectId = null; renderCashflow(); });
  $$('[data-add-cash-section]', detail).forEach((button) => button.addEventListener('click', () => openCashSectionDialog(object.id)));
  bindCashSectionEvents(object, detail);
}

function openCashSectionDialog(objectId) {
  const object = cashflowObjects.find((item) => item.id === objectId);
  if (!object) return;
  showDialog(tr('createSection'), object.name, `<div class="cash-create-form cash-section-create"><label><span>${tr('sectionName')}</span><input type="text" maxlength="120" data-cash-section-name placeholder="${tr('sectionPlaceholder')}" /></label><label class="cash-create-fact"><input type="checkbox" data-section-contract /><span>${tr('workByContract')}</span></label><div class="cash-contract-amount-field" data-contract-amount-field hidden><label><span>${tr('contractAmount')}</span><input type="number" min="0.01" step="0.01" inputmode="decimal" data-section-contract-amount placeholder="0 ₽" /></label></div><label class="cash-create-fact"><input type="checkbox" data-section-fact /><span>${tr('workByFact')}</span></label><button class="primary-button" type="button" data-create-cash-section>${tr('create')}</button></div>`);
  const input = $('[data-cash-section-name]', $('[data-dialog-content]'));
  const contractToggle = $('[data-section-contract]', $('[data-dialog-content]'));
  const contractAmountField = $('[data-contract-amount-field]', $('[data-dialog-content]'));
  contractToggle?.addEventListener('change', () => { contractAmountField.hidden = !contractToggle.checked; if (contractToggle.checked) $('[data-section-contract-amount]', contractAmountField)?.focus(); });
  const createSection = () => {
    const name = input?.value.trim();
    if (!name) { input?.focus(); return; }
    const contractMode = Boolean(contractToggle?.checked);
    const factMode = Boolean($('[data-section-fact]', $('[data-dialog-content]'))?.checked);
    if (!contractMode && !factMode) { showToast(tr('chooseSectionMode')); return; }
    const contractAmountInput = $('[data-section-contract-amount]', $('[data-dialog-content]'));
    const contractAmount = Math.max(0, Math.round((Number(contractAmountInput?.value) || 0) * 100) / 100);
    if (contractMode && contractAmount <= 0) { showToast(tr('enterContractAmount')); contractAmountInput?.focus(); return; }
    const section = normalizeCashSection({ name, createdAt: new Date().toISOString(), createdManually: true, contractMode, factMode, contractAmount });
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

function cashWorkRowsMarkup(rows, priced) {
  return rows.map((row, index) => `<tr data-cash-work-row="${escapeHtml(row.id)}"><td>${index + 1}</td><td><input data-work-field="name" maxlength="240" value="${escapeHtml(row.name)}" placeholder="${tr('workName')}" /></td><td><input data-work-field="unit" maxlength="40" value="${escapeHtml(row.unit)}" placeholder="${tr('unit')}" /></td><td><input data-work-field="quantity" type="number" min="0" step="0.001" inputmode="decimal" value="${row.quantity || ''}" placeholder="0" /></td>${priced ? `<td><input data-work-field="price" type="number" min="0" step="0.01" inputmode="decimal" value="${row.price || ''}" placeholder="0 ₽" /></td><td data-work-total>${formatMoney(row.quantity * row.price)}</td>` : ''}<td><button type="button" data-remove-work-row aria-label="${tr('removeRow')}">×</button></td></tr>`).join('');
}

function cashPartyMarkup(key, label, party) {
  return `<div class="cash-party-row"><strong>${label}</strong><label><span>${tr('fullName')}</span><input data-party="${key}" data-party-field="name" maxlength="160" value="${escapeHtml(party.name)}" /></label><label><span>${tr('signature')}</span><input data-party="${key}" data-party-field="signature" maxlength="160" value="${escapeHtml(party.signature)}" /></label></div>`;
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

function bindCashDocumentRows(scope, draft, priced) {
  const body = $('[data-cash-work-rows]', scope);
  body.innerHTML = cashWorkRowsMarkup(draft.rows, priced);
  $$('[data-cash-work-row]', body).forEach((rowElement, index) => {
    const row = draft.rows[index];
    $$('[data-work-field]', rowElement).forEach((input) => input.addEventListener('input', () => {
      const field = input.dataset.workField;
      row[field] = ['quantity', 'price'].includes(field) ? Math.max(0, Number(input.value) || 0) : input.value.slice(0, field === 'name' ? 240 : 40);
      updateCashDocumentTotal(scope, draft, priced);
    }));
    $('[data-remove-work-row]', rowElement)?.addEventListener('click', () => {
      draft.rows.splice(index, 1);
      if (!draft.rows.length) draft.rows.push(...normalizeCashWorkRows([], priced));
      bindCashDocumentRows(scope, draft, priced);
      updateCashDocumentTotal(scope, draft, priced);
    });
  });
  updateCashDocumentTotal(scope, draft, priced);
}

function cashDocumentReport(object, section, kind, documentData) {
  const priced = kind === 'act';
  const defaultTitle = tr(priced ? 'workAct' : 'workStatement');
  const documentTitle = String(documentData.title || defaultTitle).trim().slice(0, 160) || defaultTitle;
  const documentNumber = String(documentData.number || '').trim().slice(0, 80);
  const columns = [
    { label: tr('recordNumber'), key: 'number', width: 42 },
    { label: tr('workName'), key: 'name', width: '*' },
    { label: tr('unit'), key: 'unit', width: 62 },
    { label: tr('quantity'), key: 'quantity', width: 64, number: true },
    ...(priced ? [{ label: tr('price'), key: 'price', width: 72, money: true }, { label: tr('rowTotal'), key: 'total', width: 78, money: true }] : [])
  ];
  return {
    title: documentTitle, documentNumber, numberLabel: tr(priced ? 'actNumber' : 'statementNumber'), objectName: object.name, sectionName: section.name,
    tables: [{ title: documentTitle, columns, rows: documentData.rows.map((row, index) => ({ number: index + 1, name: row.name, unit: row.unit, quantity: row.quantity, ...(priced ? { price: row.price, total: Math.round(row.quantity * row.price * 100) / 100 } : {}) })), ...(priced ? { total: documentData.rows.reduce((sum, row) => sum + row.quantity * row.price, 0) } : {}) }],
    parties: documentData.parties
  };
}

function sectionFinanceReport(object, section) {
  const rowsFor = (incomeEntries, expenseEntries, incomeLabel = tr('reportIncome')) => [
    ...incomeEntries.map((entry, index) => ({ number: index + 1, type: incomeLabel, comment: entry.comment, date: cashDate(entry.date), amount: entry.amount })),
    ...expenseEntries.map((entry, index) => ({ number: incomeEntries.length + index + 1, type: tr('reportExpense'), comment: entry.comment, date: cashDate(entry.date), amount: entry.amount }))
  ];
  const columns = [{ label: tr('recordNumber'), key: 'number', width: 42 }, { label: tr('entryType'), key: 'type', width: 88 }, { label: tr('comment'), key: 'comment', width: '*' }, { label: tr('date'), key: 'date', width: 100 }, { label: tr('amount'), key: 'amount', width: 76, money: true }];
  const tables = [];
  if (section.contractMode) {
    const advances = cashTotal(section.advances); const expenses = cashTotal(section.expenses);
    tables.push({ title: tr('contractAccounting'), columns, rows: rowsFor(section.advances, section.expenses, tr('advance')), summaries: [`${tr('contractAmount')}: ${formatMoney(section.contractAmount)}`, `${tr('totalAdvances')}: ${formatMoney(advances)}`, `${tr('remainingContract')}: ${formatMoney(section.contractAmount - advances)}`, `${tr('totalExpenses')}: ${formatMoney(expenses)}`, `${tr('advanceBalance')}: ${formatMoney(advances - expenses)}`] });
    const ownInvested = cashTotal(section.ownInvestments); const ownReturned = cashTotal(section.ownReturns);
    tables.push({ title: tr('ownFundsAccounting'), columns, rows: rowsFor(section.ownInvestments, section.ownReturns, tr('ownFundsEntry')).map((row) => ({ ...row, type: row.type === tr('reportExpense') ? tr('ownReturnEntry') : row.type })), summaries: [`${tr('totalOwnInvested')}: ${formatMoney(ownInvested)}`, `${tr('totalOwnReturned')}: ${formatMoney(ownReturned)}`, `${tr('ownFundsRemaining')}: ${formatMoney(ownInvested - ownReturned)}`] });
  }
  if (section.factMode) {
    tables.push({ title: tr('actualAccounting'), columns, rows: rowsFor(section.factIncome, section.factExpenses, tr('income')), summaries: [`${tr('income')}: ${formatMoney(cashTotal(section.factIncome))}`, `${tr('totalExpense')}: ${formatMoney(cashTotal(section.factExpenses))}`, `${tr('balanceResult')}: ${formatMoney(cashTotal(section.factIncome) - cashTotal(section.factExpenses))}`] });
  }
  return {
    title: tr('sectionFinanceReport'), objectName: object.name, sectionName: section.name,
    tables, parties: cashDocumentParties(section.statement?.parties)
  };
}

function saveCashReportHistory(section, type, report) {
  const snapshot = JSON.parse(JSON.stringify(report));
  const latest = section.reportHistory[0];
  if (latest?.type === type && JSON.stringify(latest.report) === JSON.stringify(snapshot)) return latest;
  const historyTitle = snapshot.documentNumber ? `${snapshot.title} · № ${snapshot.documentNumber.replace(/^№\s*/u, '')}` : snapshot.title;
  const item = { id: `report-${Date.now()}-${Math.random().toString(16).slice(2)}`, type, title: historyTitle, createdAt: new Date().toISOString(), report: snapshot };
  section.reportHistory.unshift(item);
  section.reportHistory = section.reportHistory.slice(0, 50);
  saveCashflow();
  return item;
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
  if (column.money) return formatMoney(Number(value) || 0);
  return String(value ?? '');
}

async function createPdfReport(report) {
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([import('pdfmake/build/pdfmake.js'), import('pdfmake/build/vfs_fonts.js')]);
  const logo = await loadReportLogo();
  pdfMake.vfs = pdfFonts?.pdfMake?.vfs || pdfFonts?.vfs || pdfFonts;
  const content = [
    { text: report.title, style: 'title' },
    ...(report.documentNumber ? [{ text: `${report.numberLabel || tr('documentNumber')}: ${report.documentNumber}`, style: 'meta' }] : []),
    { text: `${tr('objects')}: ${report.objectName}`, style: 'meta' },
    { text: `${tr('sectionName')}: ${report.sectionName}`, style: 'meta', margin: [0, 0, 0, 14] }
  ];
  report.tables.forEach((table) => {
    const body = [table.columns.map((column) => ({ text: column.label, style: 'tableHeader' })), ...(table.rows.length ? table.rows.map((row) => table.columns.map((column) => ({ text: reportCellValue(column, row), alignment: column.number || column.money ? 'right' : 'left' }))) : [[{ text: tr('noEntries'), colSpan: table.columns.length, alignment: 'center', color: '#64748b', margin: [0, 8] }, ...Array.from({ length: table.columns.length - 1 }, () => ({}))]])];
    content.push({ text: table.title, style: 'sectionTitle', margin: [0, 10, 0, 6] }, { table: { headerRows: 1, widths: table.columns.map((column) => column.width), body }, layout: { fillColor: (rowIndex) => rowIndex === 0 ? '#eaf3ff' : null, hLineColor: '#b8c9dc', vLineColor: '#b8c9dc' }, fontSize: 8 });
    if (Number.isFinite(table.total)) content.push({ text: `${tr('rowTotal')}: ${formatMoney(table.total)}`, bold: true, alignment: 'right', margin: [0, 7, 0, 4] });
    if (table.summaries?.length) content.push({ ul: table.summaries, margin: [10, 7, 0, 5], fontSize: 9 });
  });
  if (report.parties) {
    const partyRows = [['', tr('fullName'), tr('signature')], [tr('preparedBy'), report.parties.prepared.name, report.parties.prepared.signature], [tr('performedBy'), report.parties.performed.name, report.parties.performed.signature], [tr('acceptedBy'), report.parties.accepted.name, report.parties.accepted.signature]];
    content.push({ text: tr('fillDate'), style: 'sectionTitle', margin: [0, 16, 0, 6] }, { text: report.parties.date || localDateKey(), margin: [0, 0, 0, 8] }, { table: { widths: [90, '*', '*'], body: partyRows }, layout: 'lightHorizontalLines', fontSize: 9 });
  }
  const definition = {
    pageSize: 'A4', pageMargins: [34, 38, 34, 88], defaultStyle: { font: 'Roboto', fontSize: 9, color: '#14213d' },
    styles: { title: { fontSize: 18, bold: true, color: '#075cd3', margin: [0, 0, 0, 10] }, meta: { fontSize: 10, color: '#43546a', margin: [0, 0, 0, 3] }, sectionTitle: { fontSize: 12, bold: true, color: '#075cd3' }, tableHeader: { bold: true, color: '#0b2e59', fontSize: 8 } },
    content,
    footer: () => ({ columns: [{ text: '' }, { width: 155, stack: [{ image: logo, width: 30, alignment: 'right' }, { text: 'StructOS', bold: true, fontSize: 11, color: '#075cd3', alignment: 'right' }, { text: `${tr('madeInStructos')} · ${tr('website')}`, fontSize: 7, color: '#64748b', alignment: 'right' }] }], margin: [34, 8, 34, 18] })
  };
  return new Promise((resolve) => pdfMake.createPdf(definition).getBlob(resolve));
}

async function createExcelReport(report) {
  const { default: ExcelJS } = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'StructOS'; workbook.created = new Date();
  const worksheet = workbook.addWorksheet(report.sectionName.slice(0, 31) || 'StructOS', { pageSetup: { orientation: 'landscape', fitToPage: true, fitToWidth: 1, fitToHeight: 0, margins: { left: 0.3, right: 0.3, top: 0.5, bottom: 0.8, header: 0.2, footer: 0.2 } } });
  const maxColumns = Math.max(6, ...report.tables.map((table) => table.columns.length));
  worksheet.mergeCells(1, 1, 1, maxColumns); worksheet.getCell(1, 1).value = report.title; worksheet.getCell(1, 1).font = { size: 17, bold: true, color: { argb: 'FF075CD3' } };
  let metaRow = 2;
  if (report.documentNumber) { worksheet.mergeCells(metaRow, 1, metaRow, maxColumns); worksheet.getCell(metaRow, 1).value = `${report.numberLabel || tr('documentNumber')}: ${report.documentNumber}`; metaRow += 1; }
  worksheet.mergeCells(metaRow, 1, metaRow, maxColumns); worksheet.getCell(metaRow, 1).value = `${tr('objects')}: ${report.objectName}`; metaRow += 1;
  worksheet.mergeCells(metaRow, 1, metaRow, maxColumns); worksheet.getCell(metaRow, 1).value = `${tr('sectionName')}: ${report.sectionName}`;
  let cursor = metaRow + 2;
  report.tables.forEach((table) => {
    worksheet.mergeCells(cursor, 1, cursor, maxColumns); worksheet.getCell(cursor, 1).value = table.title; worksheet.getCell(cursor, 1).font = { bold: true, size: 12, color: { argb: 'FF075CD3' } }; cursor += 1;
    const header = worksheet.getRow(cursor); table.columns.forEach((column, index) => { const cell = header.getCell(index + 1); cell.value = column.label; cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }; cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF075CD3' } }; cell.alignment = { vertical: 'middle', wrapText: true }; cell.border = { top: { style: 'thin', color: { argb: 'FF9EB6D0' } }, left: { style: 'thin', color: { argb: 'FF9EB6D0' } }, bottom: { style: 'thin', color: { argb: 'FF9EB6D0' } }, right: { style: 'thin', color: { argb: 'FF9EB6D0' } } }; }); header.height = 28; cursor += 1;
    const rows = table.rows.length ? table.rows : [{ [table.columns[0].key]: tr('noEntries') }];
    rows.forEach((row) => { const excelRow = worksheet.getRow(cursor); table.columns.forEach((column, index) => { const cell = excelRow.getCell(index + 1); cell.value = column.number || column.money ? (Number(row[column.key]) || 0) : String(row[column.key] ?? ''); if (column.money) cell.numFmt = '#,##0.00 "₽"'; cell.alignment = { vertical: 'top', wrapText: true, horizontal: column.number || column.money ? 'right' : 'left' }; cell.border = { top: { style: 'thin', color: { argb: 'FFD4DFEB' } }, left: { style: 'thin', color: { argb: 'FFD4DFEB' } }, bottom: { style: 'thin', color: { argb: 'FFD4DFEB' } }, right: { style: 'thin', color: { argb: 'FFD4DFEB' } } }; }); cursor += 1; });
    if (Number.isFinite(table.total)) { worksheet.mergeCells(cursor, 1, cursor, maxColumns - 1); worksheet.getCell(cursor, 1).value = tr('rowTotal'); worksheet.getCell(cursor, 1).font = { bold: true }; worksheet.getCell(cursor, maxColumns).value = table.total; worksheet.getCell(cursor, maxColumns).numFmt = '#,##0.00 "₽"'; worksheet.getCell(cursor, maxColumns).font = { bold: true }; cursor += 1; }
    (table.summaries || []).forEach((summary) => { worksheet.mergeCells(cursor, 1, cursor, maxColumns); worksheet.getCell(cursor, 1).value = summary; worksheet.getCell(cursor, 1).font = { bold: true }; cursor += 1; });
    cursor += 2;
  });
  if (report.parties) {
    worksheet.getCell(cursor, 1).value = tr('fillDate'); worksheet.getCell(cursor, 2).value = report.parties.date || localDateKey(); cursor += 2;
    [[tr('preparedBy'), report.parties.prepared], [tr('performedBy'), report.parties.performed], [tr('acceptedBy'), report.parties.accepted]].forEach(([label, party]) => { worksheet.getCell(cursor, 1).value = label; worksheet.getCell(cursor, 1).font = { bold: true }; worksheet.getCell(cursor, 2).value = `${tr('fullName')}: ${party.name}`; worksheet.getCell(cursor, 4).value = `${tr('signature')}: ${party.signature}`; cursor += 1; }); cursor += 2;
  }
  const logo = await loadReportLogo();
  const imageId = workbook.addImage({ base64: logo, extension: 'png' });
  worksheet.addImage(imageId, { tl: { col: maxColumns - 3, row: cursor - 1 }, ext: { width: 46, height: 46 } });
  worksheet.mergeCells(cursor, maxColumns - 2, cursor + 1, maxColumns); const brandCell = worksheet.getCell(cursor, maxColumns - 2); brandCell.value = `StructOS\n${tr('madeInStructos')}\n${tr('website')}`; brandCell.font = { bold: true, color: { argb: 'FF075CD3' }, size: 10 }; brandCell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true }; worksheet.getRow(cursor).height = 32; worksheet.getRow(cursor + 1).height = 20;
  const widths = [12, 36, 18, 22, 18, 18]; for (let index = 1; index <= maxColumns; index += 1) worksheet.getColumn(index).width = widths[index - 1] || 18;
  worksheet.views = [{ state: 'frozen', ySplit: metaRow + 2 }];
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

function cashReportActionsMarkup() {
  return `<div class="cash-report-actions"><button class="primary-button" type="button" data-report-format="pdf">${tr('downloadPdf')}</button><button class="primary-button" type="button" data-report-format="xlsx">${tr('downloadExcel')}</button><button class="outline-button" type="button" data-report-share="pdf">${tr('sharePdf')}</button><button class="outline-button" type="button" data-report-share="xlsx">${tr('shareExcel')}</button></div>`;
}

function bindCashReportActions(scope, getReport, onSuccess = null) {
  $$('[data-report-format]', scope).forEach((button) => button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      const report = getReport();
      await deliverCashReport(report, button.dataset.reportFormat, false);
      onSuccess?.(report);
    } catch (error) { console.error(error); showToast(tr('comingSoon')); }
    finally { button.disabled = false; }
  }));
  $$('[data-report-share]', scope).forEach((button) => button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      const report = getReport();
      await deliverCashReport(report, button.dataset.reportShare, true);
      onSuccess?.(report);
    } catch (error) { if (error?.name !== 'AbortError') { console.error(error); showToast(tr('comingSoon')); } }
    finally { button.disabled = false; }
  }));
}

function openCashDocumentDialog(objectId, sectionId, kind) {
  const { object, section } = findCashSection(objectId, sectionId);
  if (!object || !section) return;
  const priced = kind === 'act';
  const defaultTitle = tr(priced ? 'workAct' : 'workStatement');
  const draft = normalizeCashDocument(JSON.parse(JSON.stringify(section[priced ? 'act' : 'statement'])), priced, defaultTitle);
  const headCells = `<th>${tr('recordNumber')}</th><th>${tr('workName')}</th><th>${tr('unit')}</th><th>${tr('quantity')}</th>${priced ? `<th>${tr('price')}</th><th>${tr('rowTotal')}</th>` : ''}<th></th>`;
  showDialog(defaultTitle, `${object.name} · ${section.name}`, `<div class="cash-document-editor"><div class="cash-document-meta"><label><span>${tr(priced ? 'actName' : 'statementName')}</span><input type="text" maxlength="160" data-document-title value="${escapeHtml(draft.title)}" /></label><label><span>${tr(priced ? 'actNumber' : 'statementNumber')}</span><input type="text" maxlength="80" data-document-number value="${escapeHtml(draft.number)}" placeholder="1" /></label></div><div class="cash-work-table-wrap"><table class="cash-work-table"><thead><tr>${headCells}</tr></thead><tbody data-cash-work-rows></tbody>${priced ? `<tfoot><tr><td colspan="${priced ? 5 : 3}">${tr('rowTotal')}</td><td data-document-grand-total>0 ₽</td><td></td></tr></tfoot>` : ''}</table></div><button class="outline-button cash-add-row" type="button" data-add-work-row>＋ ${tr('addRow')}</button><div class="cash-parties">${cashPartyMarkup('prepared', tr('preparedBy'), draft.parties.prepared)}${cashPartyMarkup('performed', tr('performedBy'), draft.parties.performed)}${cashPartyMarkup('accepted', tr('acceptedBy'), draft.parties.accepted)}<label class="cash-document-date"><span>${tr('fillDate')}</span><input type="date" data-document-date value="${draft.parties.date}" /></label></div><div class="cash-document-save"><button class="primary-button" type="button" data-save-cash-document>${tr('saveInSection')}</button></div>${cashReportActionsMarkup()}</div>`);
  const dialog = $('[data-dialog]'); dialog.classList.add('cash-document-dialog');
  const scope = $('[data-dialog-content]'); bindCashDocumentRows(scope, draft, priced);
  $('[data-document-title]', scope)?.addEventListener('input', (event) => { draft.title = event.currentTarget.value.slice(0, 160); });
  $('[data-document-number]', scope)?.addEventListener('input', (event) => { draft.number = event.currentTarget.value.slice(0, 80); });
  $('[data-add-work-row]', scope)?.addEventListener('click', () => { draft.rows.push(...normalizeCashWorkRows([], priced)); bindCashDocumentRows(scope, draft, priced); });
  $$('[data-party-field]', scope).forEach((input) => input.addEventListener('input', () => { draft.parties[input.dataset.party][input.dataset.partyField] = input.value.slice(0, 160); }));
  $('[data-document-date]', scope)?.addEventListener('change', (event) => { draft.parties.date = event.currentTarget.value || localDateKey(); });
  const persistDocument = () => {
    draft.title = draft.title.trim() || defaultTitle;
    draft.number = draft.number.trim();
    draft.updatedAt = new Date().toISOString();
    section[priced ? 'act' : 'statement'] = normalizeCashDocument(draft, priced, defaultTitle);
    saveCashflow();
    return cashDocumentReport(object, section, kind, draft);
  };
  $('[data-save-cash-document]', scope)?.addEventListener('click', () => {
    const report = persistDocument();
    saveCashReportHistory(section, kind, report);
    renderCashflow();
    showToast(tr('documentSaved'));
  });
  bindCashReportActions(scope, persistDocument, (report) => {
    saveCashReportHistory(section, kind, report);
    renderCashflow();
  });
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
  if (snapshot) restoreDrawingImage(snapshot);
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

async function saveDrawingRecord() {
  initializeDrawingCanvas();
  const id = currentDrawingId || `drawing-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const record = {
    id,
    title: ($('[data-drawing-title]').value.trim() || tr('newSketch')).slice(0, 80),
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
    $('[data-drawing-title]').value = file.name.replace(/\.[^.]+$/, '').slice(0, 80) || tr('newSketch');
    showToast(tr('backgroundLoaded'));
  };
  image.onerror = () => { URL.revokeObjectURL(objectUrl); showToast(tr('unsupportedFormat')); };
  image.src = objectUrl;
}

function drawingCanvasBlob(type, quality) {
  return new Promise((resolve, reject) => drawingCanvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error('Canvas export failed')), type, quality));
}

function createPdfBlob(jpegBytes) {
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
  offsets[3] = length; append(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${drawingCanvas.width} ${drawingCanvas.height}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);
  offsets[4] = length; append(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${drawingCanvas.width} /Height ${drawingCanvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`); append(jpegBytes); append('\nendstream\nendobj\n');
  const content = `q\n${drawingCanvas.width} 0 0 ${drawingCanvas.height} 0 0 cm\n/Im0 Do\nQ\n`;
  offsets[5] = length; append(`5 0 obj\n<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream\nendobj\n`);
  const xrefOffset = length;
  append(`xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, '0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return new Blob(chunks, { type: 'application/pdf' });
}

async function createDrawingFile(format) {
  initializeDrawingCanvas();
  const safeTitle = ($('[data-drawing-title]').value.trim() || 'structos-sketch').replace(/[^\p{L}\p{N}_-]+/gu, '-').replace(/^-+|-+$/g, '') || 'structos-sketch';
  if (format === 'pdf') {
    const jpeg = await drawingCanvasBlob('image/jpeg', .92);
    const blob = createPdfBlob(new Uint8Array(await jpeg.arrayBuffer()));
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
    const files = Object.entries(pending?.files || {})
      .filter(([kind, file]) => uploadRules[kind] && file?.name)
      .map(([kind, file]) => ({ kind, name: String(file.name), size: Number(file.size) || 0, type: String(file.type || ''), lastModified: Number(file.lastModified) || Date.now(), addedAt: file.addedAt || new Date().toISOString() }));
    if (!objectName || !files.length) return;
    let object = objectRegistry.find((item) => item.name.trim().toLocaleLowerCase() === objectName.toLocaleLowerCase());
    if (!object) {
      object = { id: createObjectId(), name: objectName, status: pending.analysisComplete ? 'ready' : 'uploaded', uploadedAt: pending.updatedAt || new Date().toISOString(), analyzedAt: pending.analysisComplete ? (pending.updatedAt || new Date().toISOString()) : null, startedAt: null, files: [] };
      objectRegistry.unshift(object);
    } else if (pending.analysisComplete && object.status === 'uploaded') {
      object.status = 'ready';
      object.analyzedAt = pending.updatedAt || new Date().toISOString();
    }
    files.forEach((file) => { object.files = [...(object.files || []).filter((item) => item.kind !== file.kind), file]; });
    object.uploadedAt ||= pending.updatedAt || new Date().toISOString();
    selectObjectForAnalysis(object);
    saveObjects();
    localStorage.removeItem(PENDING_TRANSFER_KEY);
  } catch {}
}

function createObjectId() {
  return globalThis.crypto?.randomUUID?.() || `object-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatObjectDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(root.lang || 'ru', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

function formatStorage(bytes) {
  const value = Math.max(0, Number(bytes) || 0);
  if (value < 1024) return `${Math.round(value)} ${tr('storageB')}`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(value < 10 * 1024 ? 1 : 0)} ${tr('storageKb')}`;
  if (value < 1024 * 1024 * 1024) return `${(value / 1024 / 1024).toFixed(value < 10 * 1024 * 1024 ? 1 : 0)} ${tr('storageMb')}`;
  return `${(value / 1024 / 1024 / 1024).toFixed(2)} ${tr('storageGb')}`;
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

function renderObjects() {
  const uploaded = objectRegistry.filter((object) => object.status === 'uploaded');
  const ready = objectRegistry.filter((object) => object.status === 'ready');
  const active = objectRegistry.filter((object) => object.status === 'active');
  $$('[data-uploaded-objects-list]').forEach((list) => { list.innerHTML = uploaded.map(objectRowMarkup).join(''); });
  $$('[data-ready-objects-list]').forEach((list) => { list.innerHTML = ready.map(objectRowMarkup).join(''); });
  $$('[data-active-objects-list]').forEach((list) => { list.innerHTML = active.map(objectRowMarkup).join(''); });
  $$('[data-uploaded-count]').forEach((count) => { count.textContent = String(uploaded.length); });
  $$('[data-ready-count]').forEach((count) => { count.textContent = String(ready.length); });
  $$('[data-active-count]').forEach((count) => { count.textContent = String(active.length); });
  $$('[data-active-available]').forEach((count) => { count.textContent = String(Math.max(0, ACTIVE_OBJECT_LIMIT - active.length)); });
  $$('[data-uploaded-empty]').forEach((empty) => { empty.hidden = uploaded.length > 0; });
  $$('[data-ready-empty]').forEach((empty) => { empty.hidden = ready.length > 0; });
  $$('[data-active-empty]').forEach((empty) => { empty.hidden = active.length > 0; });
  $$('[data-start-ready]').forEach((button) => button.addEventListener('click', () => startReadyObject(button.dataset.startReady)));
  $$('[data-delete-ready]').forEach((button) => button.addEventListener('click', () => deleteReadyObject(button.dataset.deleteReady)));
  $$('[data-open-object]').forEach((button) => button.addEventListener('click', () => openObjectCard(button.dataset.openObject)));
}

function openObjectCard(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object) return;
  const documentChoices = Object.keys(uploadRules).map((kind) => {
    const file = objectFile(object, kind);
    return `<button class="object-document-choice ${file ? 'has-file' : ''}" type="button" data-object-document="${kind}"><span>${file ? '✓' : '+'}</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file?.name || tr('notUploaded'))}</small></button>`;
  }).join('');
  showDialog(escapeHtml(object.name), tr('chooseObjectDocument'), `<div class="object-document-chooser">${documentChoices}</div><button class="primary-button object-analyze-button" type="button" data-analyze-object>${escapeHtml(tr('analyzeObject'))}</button>`);
  $$('[data-object-document]').forEach((button) => button.addEventListener('click', () => openUploadDialog(button.dataset.objectDocument, object.id)));
  $('[data-analyze-object]')?.addEventListener('click', () => {
    selectObjectForAnalysis(object);
    $('[data-dialog]').close();
    runAnalysis();
  });
}

function registerAnalyzedObject(name, readyFiles) {
  const normalizedName = String(name).trim().toLocaleLowerCase();
  const existing = objectRegistry.find((object) => object.name.trim().toLocaleLowerCase() === normalizedName);
  if (existing?.status === 'active') return existing;
  const files = readyFiles.map(([kind, file]) => ({ kind, name: file.name, size: file.size || 0 }));
  if (existing) {
    existing.analyzedAt = new Date().toISOString();
    existing.files = files;
    existing.status = 'ready';
    existing.startedAt = null;
    saveObjects();
    renderObjects();
    renderWidgets();
    return existing;
  }
  const now = new Date().toISOString();
  const object = { id: createObjectId(), name: String(name).trim(), status: 'ready', uploadedAt: now, analyzedAt: now, startedAt: null, files };
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
  renderUploadFile();
  showToast(`${tr('fileSelected')}: ${file.name}`);
}

function removeUploadFile() {
  pendingFile = null;
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

function confirmUpload() {
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
  const uploadedFile = { ...pendingFile, kind: activeUploadKind, addedAt: new Date().toISOString() };
  if (!destination) destination = objectRegistry.find((object) => object.name.trim().toLocaleLowerCase() === objectName.toLocaleLowerCase());
  if (!destination) {
    destination = { id: createObjectId(), name: objectName, status: 'uploaded', uploadedAt: new Date().toISOString(), analyzedAt: null, startedAt: null, files: [] };
    objectRegistry.unshift(destination);
  }
  destination.files = [...(destination.files || []).filter((file) => file.kind !== activeUploadKind), uploadedFile];
  destination.uploadedAt ||= new Date().toISOString();
  activeUploadObjectId = destination.id;
  selectObjectForAnalysis(destination);
  saveObjects();
  renderAnalysisCards();
  renderObjects();
  renderWidgets();
  $('[data-dialog]').close();
  showToast(tr('uploadComplete'));
}

function openUploadDialog(kind, objectId = null) {
  activeUploadKind = uploadRules[kind] ? kind : 'project';
  selectAnalysis(activeUploadKind);
  activeUploadObjectId = objectRegistry.some((object) => object.id === objectId) ? objectId : null;
  const selectedObject = objectRegistry.find((object) => object.id === activeUploadObjectId);
  pendingFile = selectedObject ? (objectFile(selectedObject, activeUploadKind) ? { ...objectFile(selectedObject, activeUploadKind) } : null) : (selectedFiles[activeUploadKind] ? { ...selectedFiles[activeUploadKind] } : null);
  const rule = uploadRules[activeUploadKind];
  newObjectNameDraft = selectedObject ? '' : (localStorage.getItem(OBJECT_NAME_KEY) || '');
  const targetOptions = objectRegistry.map((object) => `<option value="${escapeHtml(object.id)}" ${object.id === activeUploadObjectId ? 'selected' : ''}>${escapeHtml(object.name)} · ${escapeHtml(tr(object.status === 'active' ? 'inWork' : object.status === 'ready' ? 'readyStatus' : 'uploaded'))}</option>`).join('');
  const markup = `
    <div class="upload-limits" aria-label="${escapeHtml(tr('userUploadPlan'))}">
      <span><b>${escapeHtml(tr('maxFileSize'))}</b>${rule.maxMb} МБ</span>
      <span><b>${escapeHtml(tr('allowedFormats'))}</b>${rule.formats}</span>
      <small>${escapeHtml(tr('userUploadPlan'))}</small>
    </div>
    <label class="upload-target-field">
      <span>${escapeHtml(tr('addToObject'))}</span>
      <select data-upload-object-target><option value="">${escapeHtml(tr('newObject'))}</option>${targetOptions}</select>
    </label>
    <label class="upload-object-field">
      <span>${escapeHtml(tr('objectName'))} <em>*</em></span>
      <input data-analysis-object-name maxlength="100" autocomplete="organization" placeholder="${escapeHtml(tr('objectPlaceholder'))}" value="${escapeHtml(selectedObject?.name || newObjectNameDraft)}" ${selectedObject ? 'readonly' : ''} />
      <small>${escapeHtml(tr('objectNameHint'))}</small>
    </label>
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
    <button class="primary-button dashboard-upload-confirm" type="button" data-confirm-upload>${escapeHtml(tr('upload'))}</button>`;
  showDialog(uploadTitle(activeUploadKind), tr('oneFilePerCategory'), markup);

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
    const target = objectRegistry.find((object) => object.id === targetSelect.value);
    activeUploadObjectId = target?.id || null;
    objectNameInput.readOnly = Boolean(target);
    objectNameInput.value = target?.name || newObjectNameDraft;
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
    $('[data-view-report]')?.addEventListener('click', () => showDialog(`${tr('report')}: ${title}`, tr('comingSoon'), `<div class="dialog-options"><div class="dialog-option"><span>StructOS ${title}</span><span>→</span></div></div>`));
    $('[data-start-object]')?.addEventListener('click', () => startReadyObject(analyzedObject.id));
  }, 1100);
}

function openView(view) {
  if (view === 'profile') { setPanel('profile'); return; }
  if (view === 'objects') { setPanel('objects'); return; }
  if (view === 'tasks') { openTodoDialog(); return; }
  if (view === 'drawing') { openDrawingStudio(); return; }
  if (view === 'project' || view === 'contract' || view === 'estimate' || view === 'analysis') {
    openUploadDialog(view === 'analysis' ? 'project' : view);
    return;
  }
  if (view === 'balance') { openBalanceDialog(); return; }
  if (view === 'finance') { setPanel('cashflow'); return; }
  if (view === 'bonuses') { openBonusDialog(); return; }
  const labels = { subscription: 'tariffSubscription', invitations: 'invitations', invite: 'invite', notifications: 'notifications', documents: 'documents', connections: 'connections', settings: 'settings', acts: 'widgetActs', attention: 'attention', passport: 'builderPassport', tasks: 'widgetTasks', team: 'widgetTeam' };
  showDialog(tr(labels[view] || 'settings'), tr('comingSoon'), `<div class="dialog-options"><div class="dialog-option"><span>StructOS</span><span>→</span></div></div>`);
}

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
    objectRegistry.unshift({ id: createObjectId(), name, status: 'active', uploadedAt: now, analyzedAt: now, startedAt: now, files: [] });
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
$$('[data-tab]').forEach((button) => button.addEventListener('click', () => setPanel(button.dataset.tab)));
$$('[data-open-panel]').forEach((button) => button.addEventListener('click', () => setPanel(button.dataset.openPanel)));
$$('[data-open-view]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.openView)));
$$('[data-action]').forEach((button) => button.addEventListener('click', () => openView(button.dataset.action)));
$$('[data-analysis-type]').forEach((button) => button.addEventListener('click', () => openUploadDialog(button.dataset.analysisType)));
$('[data-run-analysis]').addEventListener('click', runAnalysis);
$$('[data-add-object]').forEach((button) => button.addEventListener('click', openObjectDialog));
$$('[data-add-cash-object]').forEach((button) => button.addEventListener('click', openCashObjectDialog));
$('[data-profile-menu]').addEventListener('click', () => $('.drawer-group').classList.toggle('is-open'));
$('[data-logout]').addEventListener('click', logout);
$('[data-space-settings]').addEventListener('click', () => {
  const toolbar = $('[data-space-toolbar]');
  toolbar.hidden = !toolbar.hidden;
  $('[data-space-settings]').setAttribute('aria-expanded', String(!toolbar.hidden));
});
$('[data-space-done]').addEventListener('click', () => { $('[data-space-toolbar]').hidden = true; $('[data-space-settings]').setAttribute('aria-expanded', 'false'); });
$('[data-edit-profile]').addEventListener('click', () => showDialog(tr('edit'), tr('comingSoon')));
$('[data-drawing-close]')?.addEventListener('click', closeDrawingStudio);
$('[data-drawing-minimize]')?.addEventListener('click', minimizeDrawingStudio);
$('[data-drawing-restore]')?.addEventListener('click', openDrawingStudio);
$('[data-drawing-undo]')?.addEventListener('click', undoDrawing);
$('[data-drawing-clear]')?.addEventListener('click', () => { clearDrawingCanvas(); currentDrawingId = null; });
$('[data-drawing-upload]')?.addEventListener('click', () => $('[data-drawing-file]').click());
$('[data-drawing-file]')?.addEventListener('change', (event) => {
  loadDrawingBackground(event.currentTarget.files?.[0]);
  event.currentTarget.value = '';
});
$('[data-drawing-save]')?.addEventListener('click', saveDrawingRecord);
$('[data-drawing-saved]')?.addEventListener('click', renderDrawingGallery);
$('[data-drawing-gallery-close]')?.addEventListener('click', () => { $('[data-drawing-gallery]').hidden = true; });
$('[data-drawing-share]')?.addEventListener('click', shareDrawingFile);
drawingDialog?.addEventListener('cancel', () => {
  drawingMinimized = false;
  $('[data-drawing-restore]').hidden = true;
});
drawingDialog?.addEventListener('close', () => {
  if (!drawingMinimized) $('[data-drawing-restore]').hidden = true;
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { renderWidgets(); });

importPendingTransfer();
applyPassportRewards(40);
const savedProfileCompletion = localStorage.getItem(PROFILE_COMPLETION_KEY);
const profileCompletion = savedProfileCompletion === null || !Number.isFinite(Number(savedProfileCompletion)) ? 40 : Math.min(100, Math.max(0, Number(savedProfileCompletion)));
applyProfileReward(profileCompletion);
applyTheme(localStorage.getItem('structos-theme') === 'light' ? 'light' : 'dark');
applyLanguage(language);
renderWidgetPicker();
renderWidgets();
selectAnalysis(selectedAnalysis);
renderAnalysisCards();
renderObjects();
renderCashflow();
setPanel(location.hash.slice(1) || 'home');
await initAuth();

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
