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

Object.assign(copy.RU, { myProjects: 'Мои проекты', myProjectsDescription: 'Все загруженные проекты и их путь до завершения', projectPackages: 'Проектов', uploadProject: 'Загрузить проект', noMyProjects: 'Проектов пока нет', noMyProjectsCopy: 'Загрузите проект, договор или смету — карточка проекта появится здесь автоматически.', projectDocuments: 'Документы проекта', lastProjectUpdate: 'Обновлён' });
Object.assign(copy.EN, { myProjects: 'My projects', myProjectsDescription: 'All uploaded projects from upload to completion', projectPackages: 'Projects', uploadProject: 'Upload project', noMyProjects: 'No projects yet', noMyProjectsCopy: 'Upload a project, contract, or estimate and its project card will appear here automatically.', projectDocuments: 'Project documents', lastProjectUpdate: 'Updated' });
Object.assign(copy.KY, { myProjects: 'Менин долбоорлорум', myProjectsDescription: 'Жүктөөдөн аяктаганга чейинки бардык долбоорлор', projectPackages: 'Долбоорлор', uploadProject: 'Долбоор жүктөө', noMyProjects: 'Азырынча долбоор жок', noMyProjectsCopy: 'Долбоорду, келишимди же сметаны жүктөңүз — долбоор картасы бул жерде автоматтык пайда болот.', projectDocuments: 'Долбоордун документтери', lastProjectUpdate: 'Жаңыртылды' });
Object.assign(copy.TJ, { myProjects: 'Лоиҳаҳои ман', myProjectsDescription: 'Ҳамаи лоиҳаҳо аз боркунӣ то анҷом', projectPackages: 'Лоиҳаҳо', uploadProject: 'Бор кардани лоиҳа', noMyProjects: 'Ҳоло лоиҳа нест', noMyProjectsCopy: 'Лоиҳа, шартнома ё сметаро бор кунед — корти лоиҳа худкор дар ин ҷо пайдо мешавад.', projectDocuments: 'Ҳуҷҷатҳои лоиҳа', lastProjectUpdate: 'Нав шуд' });

Object.assign(copy.RU, { openDocument: 'Открыть', replaceDocument: 'Заменить', chooseReportDocument: 'Что открыть?', chooseReportDocumentHint: 'Выберите результат по одному из загруженных документов.', analysisNotReady: 'Документ ещё не проанализирован', analysisNotReadyHint: 'Сначала запустите анализ этого объекта, после чего откроется детальная страница.', runAnalysisNow: 'Анализировать сейчас', projectAnalysis: 'Детальный анализ проекта', backToProjects: 'К моим проектам', sourceFile: 'Источник', analyzedDataOnly: 'StructOS показывает только данные, извлечённые из загруженного файла. Недостающие значения не додумываются.', commercialProposal: 'Коммерческое предложение', projectBySheets: 'Проект по листам', projectBySystems: 'Проект по системам', projectMaterials: 'Материалы проекта', billOfQuantities: 'Ведомость объёмов работ', section: 'Раздел', sheetNumber: 'Лист', sheetName: 'Наименование листа', system: 'Система', sheets: 'Листы', materials: 'Материалы', materialName: 'Наименование материала', works: 'Работы', markType: 'Марка / тип', source: 'Источник', statusLabel: 'Статус', extractionPending: 'Данные ожидают извлечения', extractionPendingCopy: 'Структура вкладки подготовлена. Строки появятся после подключения серверного анализа файла.', analyzedDocumentPage: 'Страница анализа подготовлена', analyzedDocumentPageCopy: 'Файл сохранён и выбран. Детальную структуру этого документа разберём следующим этапом.' });
Object.assign(copy.EN, { openDocument: 'Open', replaceDocument: 'Replace', chooseReportDocument: 'What would you like to open?', chooseReportDocumentHint: 'Choose a result for one of the uploaded documents.', analysisNotReady: 'Document has not been analyzed yet', analysisNotReadyHint: 'Run the object analysis first to unlock its detailed page.', runAnalysisNow: 'Analyze now', projectAnalysis: 'Detailed project analysis', backToProjects: 'Back to my projects', sourceFile: 'Source', analyzedDataOnly: 'StructOS shows only data extracted from the uploaded file. Missing values are not invented.', commercialProposal: 'Commercial proposal', projectBySheets: 'Project by sheets', projectBySystems: 'Project by systems', projectMaterials: 'Project materials', billOfQuantities: 'Bill of quantities', section: 'Section', sheetNumber: 'Sheet', sheetName: 'Sheet name', system: 'System', sheets: 'Sheets', materials: 'Materials', materialName: 'Material name', works: 'Works', markType: 'Mark / type', source: 'Source', statusLabel: 'Status', extractionPending: 'Data extraction pending', extractionPendingCopy: 'The tab structure is ready. Rows will appear after server-side file analysis is connected.', analyzedDocumentPage: 'Analysis page is ready', analyzedDocumentPageCopy: 'The file is saved and selected. We will define this document’s detailed structure next.' });
Object.assign(copy.KY, { openDocument: 'Ачуу', replaceDocument: 'Алмаштыруу', chooseReportDocument: 'Эмнени ачуу керек?', chooseReportDocumentHint: 'Жүктөлгөн документтердин биринин жыйынтыгын тандаңыз.', analysisNotReady: 'Документ али талдана элек', analysisNotReadyHint: 'Деталдуу баракты ачуу үчүн адегенде объектти талдаңыз.', runAnalysisNow: 'Азыр талдоо', projectAnalysis: 'Долбоорду деталдуу талдоо', backToProjects: 'Менин долбоорлорума', sourceFile: 'Булак', analyzedDataOnly: 'StructOS жүктөлгөн файлдан алынган маалыматты гана көрсөтөт. Жетишпеген маанилер ойлоп табылбайт.', commercialProposal: 'Коммерциялык сунуш', projectBySheets: 'Долбоор барактар боюнча', projectBySystems: 'Долбоор системалар боюнча', projectMaterials: 'Долбоордун материалдары', billOfQuantities: 'Иш көлөмдөрүнүн ведомосту', section: 'Бөлүм', sheetNumber: 'Барак', sheetName: 'Барактын аталышы', system: 'Система', sheets: 'Барактар', materials: 'Материалдар', materialName: 'Материалдын аталышы', works: 'Иштер', markType: 'Марка / түрү', source: 'Булак', statusLabel: 'Статус', extractionPending: 'Маалымат чыгарылышын күтүп жатат', extractionPendingCopy: 'Бөлүмдүн түзүмү даяр. Сервердик талдоо кошулгандан кийин саптар пайда болот.', analyzedDocumentPage: 'Талдоо барагы даяр', analyzedDocumentPageCopy: 'Файл сакталды жана тандалды. Бул документтин деталдуу түзүмүн кийинки этапта талкуулайбыз.' });
Object.assign(copy.TJ, { openDocument: 'Кушодан', replaceDocument: 'Иваз кардан', chooseReportDocument: 'Чиро кушоем?', chooseReportDocumentHint: 'Натиҷаи яке аз ҳуҷҷатҳои боршударо интихоб кунед.', analysisNotReady: 'Ҳуҷҷат ҳанӯз таҳлил нашудааст', analysisNotReadyHint: 'Барои кушодани саҳифаи муфассал аввал таҳлили объектро оғоз кунед.', runAnalysisNow: 'Ҳозир таҳлил кардан', projectAnalysis: 'Таҳлили муфассали лоиҳа', backToProjects: 'Ба лоиҳаҳои ман', sourceFile: 'Манбаъ', analyzedDataOnly: 'StructOS танҳо маълумоти аз файли боршуда гирифташударо нишон медиҳад. Маълумоти набуда сохта намешавад.', commercialProposal: 'Пешниҳоди тиҷоратӣ', projectBySheets: 'Лоиҳа аз рӯи варақҳо', projectBySystems: 'Лоиҳа аз рӯи системаҳо', projectMaterials: 'Маводи лоиҳа', billOfQuantities: 'Рӯйхати ҳаҷми корҳо', section: 'Бахш', sheetNumber: 'Варақ', sheetName: 'Номи варақ', system: 'Система', sheets: 'Варақҳо', materials: 'Мавод', materialName: 'Номи мавод', works: 'Корҳо', markType: 'Тамға / навъ', source: 'Манбаъ', statusLabel: 'Ҳолат', extractionPending: 'Интизори гирифтани маълумот', extractionPendingCopy: 'Сохтори ҷадвал омода аст. Пас аз пайвасти таҳлили серверӣ сатрҳо пайдо мешаванд.', analyzedDocumentPage: 'Саҳифаи таҳлил омода аст', analyzedDocumentPageCopy: 'Файл нигоҳ дошта ва интихоб шуд. Сохтори муфассали ин ҳуҷҷатро дар марҳилаи навбатӣ муайян мекунем.' });

let language = copy[localStorage.getItem('structos-language')] ? localStorage.getItem('structos-language') : 'RU';
let currentId = '4 820 197';
let authClient = null;
let toastTimer;
const DEMO_SESSION_KEY = 'structos-demo-session';
const FINANCE_KEY = 'structos-finance-v1';
const UPLOADS_KEY = 'structos-analysis-uploads-v1';
const OBJECT_NAME_KEY = 'structos-analysis-object-name';
const OBJECTS_KEY = 'structos-objects-v1';
const OBJECT_ORDER_KEY = 'structos-object-order-v1';
const INVITED_OBJECTS_KEY = 'structos-invited-objects-v1';
const PROFILE_COMPLETION_KEY = 'structos-profile-completion';
const PERSON_DATA_KEY = 'structos-person-data-v1';
const PROFILE_DATA_KEY = 'structos-profile-data-v1';
const BUILDER_PASSPORT_KEY = 'structos-builder-passport-v1';
const STRUCTOS_DOCUMENT_BRAND = Object.freeze({ made: 'Сделано на StructOS', site: 'www.structOS.ru', slogan: 'Единый Строительный Интеллект в России №1' });
const BOTTOM_MENU_POSITION_KEY = 'structos-bottom-menu-position-v1';
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
let activeAnalysisDocument = { objectId: null, kind: 'project' };
let activeProjectAnalysisTab = 'proposal';
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
        .filter((object) => object && typeof object.name === 'string' && ['uploaded', 'ready', 'active', 'completed'].includes(object.status))
        .map((object) => ({
          id: String(object.id || `object-${Date.now()}-${Math.random().toString(16).slice(2)}`),
          name: object.name.trim().slice(0, 100) || 'Объект',
          status: object.status,
          analyzedAt: object.analyzedAt || new Date().toISOString(),
          uploadedAt: object.uploadedAt || object.analyzedAt || new Date().toISOString(),
          startedAt: object.startedAt || null,
          completedAt: object.completedAt || null,
          files: Array.isArray(object.files) ? object.files.slice(0, 3) : []
        }));
    }
  } catch {}
  return [];
}

let objectRegistry = loadObjectRegistry();

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
    status: object.status === 'completed' ? 'completed' : 'active',
    invitedAt: object.invitedAt || new Date().toISOString(),
    completedAt: object.completedAt || null,
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

function invitedObjectName(object) {
  return object.nameKey ? tr(object.nameKey) : object.name || tr('invitedObject');
}

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
  renderPersonIdentity();
  renderPassportEditor();
  renderPassportProgress();
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
    workLocations: locations
  };
  const labels = { id: 'structosId', lastName: 'surname', firstName: 'givenName', patronymic: 'patronymic', birthDate: 'birthDate', maritalStatus: 'maritalStatus', nationality: 'nationality', citizenship: 'citizenship', businessTrips: 'businessTrips', patent: 'patentAvailable', workPermit: 'workPermitAvailable', residenceCountry: 'permanentResidence', workLocations: 'workGeography' };
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
  const rows = [[tr('structosId'), currentId], [tr('birthDate'), personData.birthDate], [tr('nationality'), personData.nationality], [tr('citizenship'), personData.citizenship], [tr('permanentResidence'), personData.residenceCountry], [tr('businessTrips'), typeof builderPassport.businessTrips === 'boolean' ? tr(builderPassport.businessTrips ? 'yes' : 'no') : '—'], [tr('profession'), profileData.profession], [tr('phone'), profileData.phone], ['Email', profileData.email], [tr('workGeography'), builderPassport.workLocations.filter((item) => item.country || item.city).map((item) => [item.country, item.city].filter(Boolean).join(', ')).join(' · ')]];
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
  saveIdentityState(false);
  renderPassportEditor();
}

function saveIdentityState(syncRemote = true) {
  localStorage.setItem(PERSON_DATA_KEY, JSON.stringify(personData));
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(profileData));
  localStorage.setItem(BUILDER_PASSPORT_KEY, JSON.stringify(builderPassport));
  const passportProgress = passportCompletion();
  const profileProgress = calculatedProfileCompletion();
  localStorage.setItem(PROFILE_COMPLETION_KEY, String(profileProgress));
  applyPassportRewards(passportProgress);
  applyProfileReward(profileProgress);
  renderPersonIdentity();
  renderPassportProgress();
  renderWidgets();
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

function passportSmartSelectMarkup({ kind, value = '', placeholder, personField = '', locationField = '', country = '' }) {
  passportSmartSelectSerial += 1;
  const listId = `passport-smart-options-${passportSmartSelectSerial}`;
  return `<div class="passport-smart-select" data-passport-smart-select data-smart-kind="${escapeHtml(kind)}" data-smart-value="${escapeHtml(value)}" data-smart-country="${escapeHtml(country)}"${personField ? ` data-smart-person-field="${escapeHtml(personField)}"` : ''}${locationField ? ` data-smart-location-field="${escapeHtml(locationField)}"` : ''}><input type="text" maxlength="100" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${listId}" data-smart-input value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" /><button type="button" data-smart-toggle tabindex="-1" aria-label="${escapeHtml(tr('chooseFromList'))}">⌄</button><div class="passport-smart-options" id="${listId}" role="listbox" data-smart-options hidden></div></div>`;
}

function smartSelectOptions(control) {
  const kind = control.dataset.smartKind;
  if (kind === 'country') return passportCountryDirectory.map((country) => ({ value: localizedCountryName(country), keywords: [country.code, ...Object.values(country.names)] }));
  if (kind === 'nationality') return passportNationalityDirectory.map((nationality) => ({ value: localizedNationalityName(nationality), keywords: [nationality.code, ...Object.values(nationality.names)] }));
  if (kind === 'city') {
    const country = countryByValue(control.dataset.smartCountry);
    return (country?.cities || []).map((city) => ({ value: city, keywords: [city] }));
  }
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
      const locationField = control.dataset.smartLocationField;
      if (personField) {
        personData[personField] = value;
        onPersonChange?.(personField);
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
      close();
    };

    const renderOptions = (showAll = false) => {
      const allOptions = smartSelectOptions(control);
      const query = normalizeDirectoryValue(input.value);
      if (!query && !showAll) { close(false); return; }
      if (!allOptions.length) {
        optionsRoot.innerHTML = `<p>${tr(control.dataset.smartKind === 'city' ? 'selectCountryFirst' : 'noMatches')}</p>`;
      } else {
        const matches = allOptions.filter((option) => showAll || option.keywords.some((keyword) => normalizeDirectoryValue(keyword).startsWith(query))).slice(0, 10);
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
  const labels = { photo: 'photo', id: 'structosId', lastName: 'surname', firstName: 'givenName', patronymic: 'patronymic', birthDate: 'birthDate', maritalStatus: 'maritalStatus', nationality: 'nationality', citizenship: 'citizenship', businessTrips: 'businessTrips', patent: 'patentAvailable', workPermit: 'workPermitAvailable', residenceCountry: 'permanentResidence', workLocations: 'workGeography' };
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
        ${passportInputCard('birthDate', tr('birthDate'), `<input type="date" max="${localDateKey()}" autocomplete="bday" data-person-field="birthDate" value="${escapeHtml(personData.birthDate)}" />`)}
        ${passportInputCard('maritalStatus', tr('maritalStatus'), `<select data-person-field="maritalStatus">${maritalOptionsMarkup()}</select>`)}
        ${passportInputCard('nationality', tr('nationality'), passportSmartSelectMarkup({ kind: 'nationality', value: personData.nationality, placeholder: tr('selectNationality'), personField: 'nationality' }))}
        ${passportInputCard('citizenship', tr('citizenship'), passportSmartSelectMarkup({ kind: 'country', value: personData.citizenship, placeholder: tr('selectCountry'), personField: 'citizenship' }))}
        ${passportInputCard('residenceCountry', tr('permanentResidence'), passportSmartSelectMarkup({ kind: 'country', value: personData.residenceCountry, placeholder: tr('selectCountry'), personField: 'residenceCountry' }))}
        ${passportBusinessTripsMarkup()}
      </div>
      <section class="passport-foreign-documents" data-foreign-documents${foreign ? '' : ' hidden'}><h3>${tr('foreignDocuments')}</h3><div>${passportInputCard('patent', tr('patentAvailable'), `<span class="passport-document-check"><input type="checkbox" data-passport-field="patent"${builderPassport.patent ? ' checked' : ''} /><span>✓</span></span>`)}${passportInputCard('workPermit', tr('workPermitAvailable'), `<span class="passport-document-check"><input type="checkbox" data-passport-field="workPermit"${builderPassport.workPermit ? ' checked' : ''} /><span>✓</span></span>`)}</div></section>
    </section>
    <section class="passport-form-section passport-geography-section"><header><div><span class="eyebrow">STRUCTOS GEO</span><h2>${tr('workGeography')}</h2><p>${tr('workGeographyHint')}</p></div></header><div class="passport-locations" data-passport-locations>${builderPassport.workLocations.map(passportLocationMarkup).join('')}</div><button class="outline-button passport-add-location" type="button" data-add-passport-location>＋ ${tr('addCountryCity')}</button></section>
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

function renderPassportEditor() {
  const rootElement = $('[data-passport-editor]');
  if (!rootElement) return;
  rootElement.innerHTML = passportEditorMarkup();
  const form = $('[data-passport-form]', rootElement);
  $$('[data-person-field]', form).forEach((input) => input.addEventListener('input', () => {
    personData[input.dataset.personField] = input.value.slice(0, 100);
    if (input.dataset.personField === 'citizenship') updateForeignDocumentVisibility(form);
  }));
  bindPassportSmartSelects(form, (field) => { if (field === 'citizenship') updateForeignDocumentVisibility(form); });
  $$('[data-passport-field]', form).forEach((input) => input.addEventListener('change', () => { builderPassport[input.dataset.passportField] = input.checked; }));
  $$('[data-passport-business-trips]', form).forEach((input) => input.addEventListener('change', () => { if (input.checked) builderPassport.businessTrips = input.value === 'yes'; }));
  $('[data-copy-passport-id]', form)?.addEventListener('click', copyId);
  $('[data-share-resume]', form)?.addEventListener('click', shareResume);
  $('[data-share-passport]', form)?.addEventListener('click', sharePassport);
  $('[data-passport-important-toggle]', form)?.addEventListener('click', () => { passportImportantExpanded = !passportImportantExpanded; renderPassportEditor(); });
  $$('[data-passport-important]', form).forEach((input) => input.addEventListener('change', () => {
    builderPassport.important[input.dataset.passportImportant] = input.checked;
    if (input.dataset.passportImportant === 'passportAvailable') {
      passportAccessListExpanded = input.checked;
      renderPassportEditor();
    }
  }));
  $('[data-passport-access-toggle]', form)?.addEventListener('click', () => { passportAccessListExpanded = !passportAccessListExpanded; renderPassportEditor(); });
  $$('[data-passport-visible]', form).forEach((input) => input.addEventListener('change', () => { builderPassport.visibleFields[input.dataset.passportVisible] = input.checked; }));
  $$('[data-passport-location]', form).forEach((row) => {
    const item = builderPassport.workLocations.find((entry) => entry.id === row.dataset.passportLocation);
    if (!item) return;
    $('[data-remove-location]', row)?.addEventListener('click', () => {
      builderPassport.workLocations = builderPassport.workLocations.filter((entry) => entry.id !== item.id);
      if (!builderPassport.workLocations.length) builderPassport.workLocations.push({ id: `place-${Date.now()}`, country: '', city: '' });
      renderPassportEditor();
    });
  });
  $('[data-add-passport-location]', form)?.addEventListener('click', () => {
    if (builderPassport.workLocations.length >= 12) return;
    builderPassport.workLocations.push({ id: `place-${Date.now()}-${Math.random().toString(16).slice(2)}`, country: '', city: '' });
    renderPassportEditor();
  });
  bindPersonPhotoControls(form, renderPassportEditor);
  form.addEventListener('submit', (event) => { event.preventDefault(); if (!validatePassportSmartSelects(form)) return; saveIdentityState(); renderPassportEditor(); showToast(tr('passportSaved')); });
  renderPassportProgress();
}

function profileEditorMarkup() {
  return `<div class="profile-edit-form" data-profile-edit-form>
    ${passportPhotoMarkup(false)}
    <section><h3>${tr('personalData')}</h3><p>${tr('sharedDataHint')}</p><div class="profile-edit-grid">
      <label><span>${tr('surname')}</span><input type="text" maxlength="80" data-person-field="lastName" value="${escapeHtml(personData.lastName)}" /></label>
      <label><span>${tr('givenName')}</span><input type="text" maxlength="80" data-person-field="firstName" value="${escapeHtml(personData.firstName)}" /></label>
      <label><span>${tr('patronymic')}</span><input type="text" maxlength="80" data-person-field="patronymic" value="${escapeHtml(personData.patronymic)}" /></label>
      <label><span>${tr('birthDate')}</span><input type="date" max="${localDateKey()}" data-person-field="birthDate" value="${escapeHtml(personData.birthDate)}" /></label>
      <label><span>${tr('nationality')}</span>${passportSmartSelectMarkup({ kind: 'nationality', value: personData.nationality, placeholder: tr('selectNationality'), personField: 'nationality' })}</label>
      <label><span>${tr('citizenship')}</span>${passportSmartSelectMarkup({ kind: 'country', value: personData.citizenship, placeholder: tr('selectCountry'), personField: 'citizenship' })}</label>
      <label><span>${tr('permanentResidence')}</span>${passportSmartSelectMarkup({ kind: 'country', value: personData.residenceCountry, placeholder: tr('selectCountry'), personField: 'residenceCountry' })}</label>
      <label><span>${tr('maritalStatus')}</span><select data-person-field="maritalStatus">${maritalOptionsMarkup()}</select></label>
    </div></section>
    <section><h3>${tr('profileOnlyFields')}</h3><div class="profile-edit-grid"><label><span>${tr('phone')}</span><input type="tel" maxlength="60" data-profile-field="phone" value="${escapeHtml(profileData.phone)}" /></label><label><span>Email</span><input type="email" maxlength="120" data-profile-field="email" value="${escapeHtml(profileData.email)}" /></label><label><span>${tr('profileCity')}</span><input type="text" maxlength="100" data-profile-field="city" value="${escapeHtml(profileData.city)}" /></label><label><span>${tr('profession')}</span><input type="text" maxlength="140" data-profile-field="profession" value="${escapeHtml(profileData.profession)}" /></label></div></section>
    <button class="primary-button" type="button" data-save-profile>${tr('saveChanges')}</button>
  </div>`;
}

function openProfileEditor() {
  showDialog(tr('profileEditorTitle'), tr('profileEditorHint'), profileEditorMarkup());
  const scope = $('[data-dialog-content]');
  $$('[data-person-field]', scope).forEach((input) => input.addEventListener('input', () => { personData[input.dataset.personField] = input.value.slice(0, 100); }));
  bindPassportSmartSelects(scope);
  $$('[data-profile-field]', scope).forEach((input) => input.addEventListener('input', () => { profileData[input.dataset.profileField] = input.value.slice(0, 140); }));
  bindPersonPhotoControls(scope, () => { $('[data-dialog]').close(); openProfileEditor(); });
  $('[data-save-profile]', scope)?.addEventListener('click', () => { if (!validatePassportSmartSelects(scope)) return; saveIdentityState(); renderPassportEditor(); $('[data-dialog]').close(); showToast(tr('profileSaved')); });
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
    $$('[data-user-role]').forEach((item) => { item.textContent = demoSession.role || tr('userTariff'); });
    $$('[data-user-id]').forEach((item) => { item.textContent = currentId; });
    seedIdentityFromAuth(demoSession.name || 'StructOS', {});
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
    $$('[data-user-role]').forEach((item) => { item.textContent = role; });
    $$('[data-user-id]').forEach((item) => { item.textContent = currentId; });
    seedIdentityFromAuth(fullName, { ...meta, email: user.email || '' });
    renderReferral();
  } catch (error) {
    console.warn('StructOS auth is unavailable:', error);
  }
}

function setPanel(name) {
  const next = ['home', 'projects', 'analysis-detail', 'space', 'objects', 'cashflow', 'profile', 'passport'].includes(name) ? name : 'home';
  $('[data-dashboard]').classList.toggle('is-space-mode', next === 'space');
  if (next !== 'space') {
    $('[data-space-toolbar]').hidden = true;
    $('[data-space-settings]').setAttribute('aria-expanded', 'false');
  }
  $$('[data-panel]').forEach((panel) => { panel.hidden = panel.dataset.panel !== next; panel.classList.toggle('is-active', panel.dataset.panel === next); });
  $$('[data-tab]').forEach((button) => { button.classList.toggle('is-active', button.dataset.tab === next || (next === 'analysis-detail' && button.dataset.tab === 'projects') || (next === 'passport' && button.dataset.tab === 'profile')); });
  history.replaceState(null, '', `#${next}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (next === 'space') requestAnimationFrame(renderWidgets);
  if (next === 'projects') renderMyProjects();
  if (next === 'analysis-detail') renderAnalysisDetail();
  if (next === 'objects') renderObjects();
  if (next === 'cashflow') renderCashflow();
  if (next === 'passport') renderPassportEditor();
  setBottomMenu(false);
  closeMenu();
}

let bottomMenuPosition = null;
let bottomMenuDrag = null;
let bottomMenuSuppressClick = false;

function bottomMenuViewport() {
  const viewport = window.visualViewport;
  return { left: viewport?.offsetLeft || 0, top: viewport?.offsetTop || 0, width: viewport?.width || window.innerWidth, height: viewport?.height || window.innerHeight };
}

function placeBottomMenu(x, y, persist = false) {
  const menu = $('[data-bottom-menu]');
  const toggle = $('[data-bottom-menu-toggle]');
  if (!menu || !toggle) return;
  const viewport = bottomMenuViewport();
  const width = toggle.offsetWidth || 190;
  const height = toggle.offsetHeight || 54;
  const margin = 8;
  const left = Math.max(viewport.left + margin, Math.min(viewport.left + viewport.width - width - margin, Number(x) || 0));
  const top = Math.max(viewport.top + margin, Math.min(viewport.top + viewport.height - height - margin, Number(y) || 0));
  bottomMenuPosition = { x: Math.round(left), y: Math.round(top) };
  menu.style.left = `${bottomMenuPosition.x}px`;
  menu.style.top = `${bottomMenuPosition.y}px`;
  menu.style.right = 'auto'; menu.style.bottom = 'auto'; menu.style.transform = 'none';
  if (persist) localStorage.setItem(BOTTOM_MENU_POSITION_KEY, JSON.stringify(bottomMenuPosition));
  if (menu.classList.contains('is-open')) updateBottomMenuDirection();
}

function restoreBottomMenuPosition() {
  const toggle = $('[data-bottom-menu-toggle]');
  if (!toggle) return;
  const saved = readStoredJSON(BOTTOM_MENU_POSITION_KEY, null);
  const viewport = bottomMenuViewport();
  const width = toggle.offsetWidth || 190;
  const height = toggle.offsetHeight || 54;
  const x = Number.isFinite(saved?.x) ? saved.x : viewport.left + (viewport.width - width) / 2;
  const y = Number.isFinite(saved?.y) ? saved.y : viewport.top + viewport.height - height - 8;
  placeBottomMenu(x, y);
}

function updateBottomMenuDirection() {
  const menu = $('[data-bottom-menu]');
  const nav = $('[data-bottom-nav]');
  const toggle = $('[data-bottom-menu-toggle]');
  if (!menu || !nav || !toggle || nav.hidden) return;
  const viewport = bottomMenuViewport();
  const rect = toggle.getBoundingClientRect();
  const spaceAbove = Math.max(0, rect.top - viewport.top - 10);
  const spaceBelow = Math.max(0, viewport.top + viewport.height - rect.bottom - 10);
  const opensUp = spaceAbove >= spaceBelow;
  menu.classList.toggle('opens-up', opensUp);
  menu.classList.toggle('opens-down', !opensUp);
  menu.classList.toggle('menu-align-right', rect.left + 260 > viewport.left + viewport.width - 8);
  nav.style.setProperty('--bottom-menu-max-height', `${Math.max(150, Math.floor(opensUp ? spaceAbove : spaceBelow))}px`);
}

function setBottomMenu(open) {
  const menu = $('[data-bottom-menu]');
  const nav = $('[data-bottom-nav]');
  const toggle = $('[data-bottom-menu-toggle]');
  if (!menu || !nav || !toggle) return;
  menu.classList.toggle('is-open', open);
  nav.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  if (open) requestAnimationFrame(updateBottomMenuDirection);
}

function startBottomMenuDrag(event) {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  const menu = $('[data-bottom-menu]');
  const toggle = $('[data-bottom-menu-toggle]');
  if (!menu || !toggle) return;
  const rect = toggle.getBoundingClientRect();
  bottomMenuDrag = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, originX: rect.left, originY: rect.top, moved: false };
  toggle.setPointerCapture?.(event.pointerId);
}

function moveBottomMenu(event) {
  if (!bottomMenuDrag || event.pointerId !== bottomMenuDrag.pointerId) return;
  const dx = event.clientX - bottomMenuDrag.startX;
  const dy = event.clientY - bottomMenuDrag.startY;
  if (!bottomMenuDrag.moved && Math.hypot(dx, dy) < 6) return;
  if (!bottomMenuDrag.moved) {
    bottomMenuDrag.moved = true;
    setBottomMenu(false);
    $('[data-bottom-menu]')?.classList.add('is-dragging');
  }
  event.preventDefault();
  placeBottomMenu(bottomMenuDrag.originX + dx, bottomMenuDrag.originY + dy);
}

function finishBottomMenuDrag(event) {
  if (!bottomMenuDrag || event.pointerId !== bottomMenuDrag.pointerId) return;
  const moved = bottomMenuDrag.moved;
  bottomMenuDrag = null;
  $('[data-bottom-menu]')?.classList.remove('is-dragging');
  if (!moved) return;
  if (bottomMenuPosition) localStorage.setItem(BOTTOM_MENU_POSITION_KEY, JSON.stringify(bottomMenuPosition));
  bottomMenuSuppressClick = true;
  setTimeout(() => { bottomMenuSuppressClick = false; }, 0);
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
  { code: 'RU', names: { RU: 'Россия', EN: 'Russia', KY: 'Россия', TJ: 'Русия' }, cities: ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск', 'Краснодар', 'Сочи', 'Тюмень', 'Владивосток'] },
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

const passportVisibilityKeys = ['photo', 'id', 'lastName', 'firstName', 'patronymic', 'birthDate', 'maritalStatus', 'nationality', 'citizenship', 'businessTrips', 'patent', 'workPermit', 'residenceCountry', 'workLocations'];

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
  return { phone: String(saved.phone || '').slice(0, 60), email: String(saved.email || '').slice(0, 120), city: String(saved.city || '').slice(0, 100), profession: String(saved.profession || '').slice(0, 140) };
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
  return {
    patent: Boolean(saved.patent),
    workPermit: Boolean(saved.workPermit),
    businessTrips: typeof saved.businessTrips === 'boolean' ? saved.businessTrips : null,
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
let authSeedName = '';
let passportImportantExpanded = false;
let passportAccessListExpanded = false;

function localizedCountryName(country) { return country.names[language] || country.names.RU; }

function localizedNationalityName(nationality) { return nationality.names[language] || nationality.names.RU; }

function normalizeDirectoryValue(value) {
  return String(value || '').trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase(root.lang || 'ru');
}

function countryByValue(value) {
  const normalized = normalizeDirectoryValue(value);
  return passportCountryDirectory.find((country) => country.code.toLowerCase() === normalized || Object.values(country.names).some((name) => normalizeDirectoryValue(name) === normalized));
}

function nationalityByValue(value) {
  const normalized = normalizeDirectoryValue(value);
  return passportNationalityDirectory.find((nationality) => nationality.code.toLowerCase() === normalized || Object.values(nationality.names).some((name) => normalizeDirectoryValue(name) === normalized));
}

function personFullName() {
  return [personData.lastName, personData.firstName, personData.patronymic].filter(Boolean).join(' ').trim() || authSeedName || tr('userTariff');
}

function isForeignCitizen() {
  const value = personData.citizenship.trim();
  if (!value) return false;
  const normalized = value.toLocaleLowerCase(root.lang || 'ru');
  const russia = passportCountryDirectory.find((country) => country.code === 'RU');
  return !['рф', 'российская федерация', 'russian federation'].includes(normalized) && !Object.values(russia.names).some((name) => name.toLocaleLowerCase(root.lang || 'ru') === normalized);
}

function passportCompletion() {
  const values = [true, personData.photo, personData.lastName, personData.firstName, personData.patronymic, personData.birthDate, personData.maritalStatus, personData.nationality, personData.citizenship, personData.residenceCountry, typeof builderPassport.businessTrips === 'boolean', builderPassport.workLocations.some((item) => item.country.trim() && item.city.trim())];
  return Math.round(values.filter(Boolean).length / values.length * 100);
}

function calculatedProfileCompletion() {
  const values = [personData.photo, personData.lastName, personData.firstName, personData.patronymic, personData.birthDate, personData.maritalStatus, personData.nationality, personData.citizenship, personData.residenceCountry, profileData.phone, profileData.email, profileData.city, profileData.profession];
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
  dialog.classList.remove('cash-document-dialog', 'cash-export-dialog', 'calendar-dialog', 'invited-object-dialog');
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
  const entries = ['advances', 'expenses', 'ownInvestments', 'ownReturns', 'factIncome', 'factExpenses', 'factOwnInvestments', 'factOwnReturns'].some((key) => section[key]?.length);
  const documents = Boolean(section.statement?.updatedAt || section.act?.updatedAt || section.reportHistory?.length);
  return entries || documents || section.contractAmount > 0 || section.staffingMode;
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
    staffingMode: Boolean(section?.staffingMode),
    contractAmount,
    advances: normalizeCashEntries(section?.advances || section?.received),
    expenses: normalizeCashEntries(section?.expenses),
    ownInvestments: normalizeCashEntries(section?.ownInvestments),
    ownReturns: normalizeCashEntries(section?.ownReturns),
    factIncome: normalizeCashEntries(section?.factIncome),
    factExpenses: normalizeCashEntries(section?.factExpenses),
    factOwnInvestments: normalizeCashEntries(section?.factOwnInvestments),
    factOwnReturns: normalizeCashEntries(section?.factOwnReturns),
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
let unifiedObjectOrder = readStoredJSON(OBJECT_ORDER_KEY, []);
if (!Array.isArray(unifiedObjectOrder)) unifiedObjectOrder = [];
unifiedObjectOrder = unifiedObjectOrder.filter((key) => typeof key === 'string');
let activeCashObjectId = null;
const expandedCashSections = new Set();
const expandedCashReportHistory = new Set();
const expandedCashEntryHistories = new Set();
let reportLogoDataUrl = '';
const reportPreviewLogoUrl = new URL('./assets/favicon-192.png', import.meta.url).href;

function saveCashflow() {
  localStorage.setItem(CASHFLOW_KEY, JSON.stringify(cashflowObjects));
  renderObjects();
  renderWidgets();
}

function cashTotal(entries) {
  return Math.round(entries.reduce((sum, entry) => sum + entry.amount, 0) * 100) / 100;
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
  const totals = object.sections.reduce((total, section) => {
    const values = cashSectionFinancials(section);
    total.contractBalance += values.contractBalance;
    total.factBalance += values.factBalance;
    total.balance += values.balance;
    return total;
  }, { contractBalance: 0, factBalance: 0, balance: 0 });
  Object.keys(totals).forEach((key) => { totals[key] = Math.round(totals[key] * 100) / 100; });
  return totals;
}

function formatSignedMoney(value) {
  const rounded = Math.round((Number(value) || 0) * 100) / 100;
  return `${rounded > 0 ? '+' : ''}${formatMoney(rounded)}`;
}

function cashBalanceClass(value) {
  return value < 0 ? 'is-negative' : value > 0 ? 'is-positive' : 'is-zero';
}

function cashReportSummary(label, value, colored = false) {
  return { text: `${label}: ${formatMoney(value)}`, tone: colored ? cashBalanceClass(value) : '' };
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
  const total = cashTotal(entries);
  const historyKey = `${sectionId}:${kind}`;
  const rows = entries.length
    ? entries.map((entry) => `<div class="cash-history-row" data-cash-history-entry="${escapeHtml(entry.id)}"><span>${escapeHtml(entry.comment)}<small>${cashDate(entry.date)}</small></span><b>${formatMoney(entry.amount)}</b><button type="button" data-edit-cash-entry="${escapeHtml(entry.id)}" data-cash-entry-kind="${escapeHtml(kind)}" aria-label="${escapeHtml(tr('editCashEntry'))}" title="${escapeHtml(tr('editCashEntry'))}">✎ <em>${tr('edit')}</em></button></div>`).join('')
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
  const rows = section.reportHistory.length ? section.reportHistory.map((item) => `<article class="cash-report-history-row" data-report-history-id="${escapeHtml(item.id)}"><span><strong>${escapeHtml(item.title)}</strong><small>${cashDate(item.createdAt)}</small></span><div><button type="button" data-history-preview aria-label="${escapeHtml(tr('viewReport'))}" title="${escapeHtml(tr('viewReport'))}">◉</button><button type="button" data-history-download="pdf">PDF</button><button type="button" data-history-download="xlsx">Excel</button><button type="button" data-history-share="pdf">↗ PDF</button><button type="button" data-history-share="xlsx">↗ Excel</button></div></article>`).join('') : `<div class="cash-history-empty">${tr('noReports')}</div>`;
  return `<div class="cash-report-history"${isOpen ? '' : ' hidden'}><div class="cash-report-history-list">${rows}</div></div>`;
}

function cashOwnFundsMarkup(section, investments, returns, investmentKind, returnKind) {
  const invested = cashTotal(investments);
  const closed = cashTotal(returns);
  const remaining = Math.round((invested - closed) * 100) / 100;
  return `<section class="cash-own-funds"><h4>${tr('ownFundsAccounting')}</h4><div class="cash-own-summary"><article><span>${tr('totalOwnInvested')}</span><strong>${formatMoney(invested)}</strong></article><article><span>${tr('totalOwnReturned')}</span><strong>${formatMoney(closed)}</strong></article><article class="${cashBalanceClass(remaining)}"><span>${tr('ownFundsRemaining')}</span><strong>${formatSignedMoney(remaining)}</strong></article></div><div class="cash-entry-grid">${cashEntryForm(investmentKind, 'ownInvested', 'addOwnFunds')}${cashEntryForm(returnKind, 'returnedFromAdvance', 'addOwnReturn')}</div>${cashHistoryMarkup(investments, 'ownInvested', investmentKind, section.id)}${cashHistoryMarkup(returns, 'returnedFromAdvance', returnKind, section.id)}</section>`;
}

function cashSectionMarkup(object, section) {
  const advances = cashTotal(section.advances);
  const expenses = cashTotal(section.expenses);
  const remainingContract = Math.round((section.contractAmount - advances) * 100) / 100;
  const advanceBalance = Math.round((advances - expenses) * 100) / 100;
  const factIncome = cashTotal(section.factIncome);
  const factExpenses = cashTotal(section.factExpenses);
  const factBalance = Math.round((factIncome - factExpenses) * 100) / 100;
  const isOpen = expandedCashSections.has(section.id);
  const modeBadges = `${section.contractMode ? `<span>${tr('workByContract')}</span>` : ''}${section.factMode ? `<span>${tr('actualAccounting')}</span>` : ''}${section.staffingMode ? `<span>${tr('peopleAssigned')}</span>` : ''}`;
  const contractMarkup = section.contractMode ? `<section class="cash-accounting-block cash-contract-accounting"><h4>${tr('contractAccounting')}</h4><div class="cash-contract-head"><article><span>${tr('contractAmount')}</span><strong>${formatMoney(section.contractAmount)}</strong></article><article><span>${tr('receivedAdvances')}</span><strong>${formatMoney(advances)}</strong></article><article class="${cashBalanceClass(remainingContract)}"><span>${tr('remainingContract')}</span><strong>${formatSignedMoney(remainingContract)}</strong></article></div><div class="cash-summary"><article><span>${tr('totalAdvances')}</span><strong>${formatMoney(advances)}</strong></article><article><span>${tr('totalExpenses')}</span><strong>${formatMoney(expenses)}</strong></article><article class="is-remaining ${cashBalanceClass(advanceBalance)}"><span>${tr('advanceBalance')}</span><strong>${formatSignedMoney(advanceBalance)}</strong></article></div><div class="cash-entry-grid">${cashEntryForm('advances', 'received', 'addAdvance')}${cashEntryForm('expenses', 'expense', 'add')}</div>${cashHistoryMarkup(section.advances, 'totalAdvances', 'advances', section.id)}${cashHistoryMarkup(section.expenses, 'totalExpenses', 'expenses', section.id)}${cashOwnFundsMarkup(section, section.ownInvestments, section.ownReturns, 'ownInvestments', 'ownReturns')}</section>` : '';
  const factMarkup = section.factMode ? `<section class="cash-fact-table cash-accounting-block"><h4 class="cash-fact-title">${tr('actualAccounting')}</h4><div class="cash-entry-grid">${cashEntryForm('factIncome', 'income', 'addIncome')}${cashEntryForm('factExpenses', 'expense', 'addExpense')}</div>${cashHistoryMarkup(section.factIncome, 'income', 'factIncome', section.id)}${cashHistoryMarkup(section.factExpenses, 'expense', 'factExpenses', section.id)}<div class="cash-balance ${cashBalanceClass(factBalance)}"><span>${tr('balanceResult')}</span><strong>${formatSignedMoney(factBalance)}</strong></div>${cashOwnFundsMarkup(section, section.factOwnInvestments, section.factOwnReturns, 'factOwnInvestments', 'factOwnReturns')}</section>` : '';
  const staffingMarkup = section.staffingMode ? `<section class="cash-staffing-block"><header><h4>${tr('peopleAssigned')}</h4><span>${tr('settings')}</span></header><div aria-hidden="true"></div></section>` : '';
  return `<section class="cash-section" data-cash-section="${escapeHtml(section.id)}">
    <header class="cash-section-head">
      <button class="cash-section-toggle" type="button" data-cash-section-toggle aria-expanded="${isOpen}"><span>${isOpen ? '⌄' : '›'}</span><strong>${escapeHtml(section.name)}</strong><i>${modeBadges}</i></button>
      <div class="cash-section-head-actions"><button class="cash-mini-button" type="button" data-rename-cash-section>${tr('rename')}</button><button class="cash-mini-button is-danger" type="button" data-delete-cash-section>${tr('deleteSection')}</button></div>
    </header>
    <div class="cash-section-body"${isOpen ? '' : ' hidden'}>
      <div class="cash-section-document-actions"><button type="button" data-open-cash-document="statement">${tr('workStatement')}</button><button type="button" data-open-cash-document="act">${tr('workAct')}</button><button type="button" data-export-section>${tr('sectionReport')}</button><button type="button" data-toggle-report-history>${tr('reportHistory')} · ${section.reportHistory.length}</button></div>${cashReportHistoryMarkup(section)}${contractMarkup}${factMarkup}${staffingMarkup}
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
  list.innerHTML = orderedObjects.map((object) => {
    const financials = cashObjectFinancials(object);
    return `<article class="cash-object${object.completed ? ' is-completed' : ''}" data-cash-object="${escapeHtml(object.id)}" role="button" tabindex="0" aria-label="${escapeHtml(`${tr('openObjectAction')}: ${object.name}`)}"><header><div class="cash-object-heading"><div class="cash-object-name-line"><h2>${escapeHtml(object.name)}</h2><strong class="cash-card-balance ${cashBalanceClass(financials.balance)}">${formatSignedMoney(financials.balance)}</strong></div><small>${cashDate(object.createdAt)} · ${object.sections.length} ${tr('sectionCalculations')}${object.completed ? ` · ${tr('completedObject')}` : ''}</small><div class="cash-object-actions"><button class="cash-mini-button" type="button" data-rename-cash-object>${tr('rename')}</button><button class="cash-mini-button is-danger" type="button" data-delete-cash-object>${tr('deleteObject')}</button><label class="cash-mini-button is-complete"><input type="checkbox" data-complete-cash-object${object.completed ? ' checked' : ''} /><span>${object.completed ? tr('reopenObject') : tr('finishObject')}</span></label></div></div></header></article>`;
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
      $('[data-rename-cash-section]', sectionCard)?.addEventListener('click', () => renameCashSection(object.id, section.id));
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
      $$('[data-cash-history]', sectionCard).forEach((history) => history.addEventListener('toggle', () => {
        if (history.open) expandedCashEntryHistories.add(history.dataset.cashHistory); else expandedCashEntryHistories.delete(history.dataset.cashHistory);
      }));
      $$('[data-edit-cash-entry]', sectionCard).forEach((button) => button.addEventListener('click', () => openCashEntryEditDialog(object.id, section.id, button.dataset.cashEntryKind, button.dataset.editCashEntry)));
      $$('[data-open-cash-document]', sectionCard).forEach((button) => button.addEventListener('click', () => openCashDocumentDialog(object.id, section.id, button.dataset.openCashDocument)));
      $('[data-export-section]', sectionCard)?.addEventListener('click', () => openSectionExportDialog(object.id, section.id));
      $$('[data-report-history-id]', sectionCard).forEach((historyRow) => {
        const item = section.reportHistory.find((record) => record.id === historyRow.dataset.reportHistoryId);
        if (!item) return;
        $('[data-history-preview]', historyRow)?.addEventListener('click', () => openCashReportPreview(item.report, () => item.report));
        $$('[data-history-download]', historyRow).forEach((button) => button.addEventListener('click', () => deliverCashReport(item.report, button.dataset.historyDownload, false).catch((error) => { console.error(error); showToast(tr('comingSoon')); })));
        $$('[data-history-share]', historyRow).forEach((button) => button.addEventListener('click', () => deliverCashReport(item.report, button.dataset.historyShare, true).catch((error) => { if (error?.name !== 'AbortError') { console.error(error); showToast(tr('comingSoon')); } })));
      });
    });
}

function renderCashObjectDetail(object, detail) {
  const financials = cashObjectFinancials(object);
  const overall = `<section class="cash-object-total"><header><div><span class="eyebrow">STRUCTOS TOTAL</span><h2>${tr('overallSectionsBalance')}</h2></div><strong class="${cashBalanceClass(financials.balance)}">${formatSignedMoney(financials.balance)}</strong></header><div class="cash-object-total-breakdown"><article><span>${tr('contractBalancesTotal')}</span><strong class="${cashBalanceClass(financials.contractBalance)}">${formatSignedMoney(financials.contractBalance)}</strong></article><article><span>${tr('factBalancesTotal')}</span><strong class="${cashBalanceClass(financials.factBalance)}">${formatSignedMoney(financials.factBalance)}</strong></article></div><button class="primary-button" type="button" data-export-cash-object>${tr('downloadOverallReport')}</button></section>`;
  detail.innerHTML = `<div class="cash-object-detail-head"><button class="outline-button" type="button" data-close-cash-object>‹ ${tr('backToMoneyObjects')}</button><div><span class="eyebrow">STRUCTOS MONEY</span><div class="cash-object-title-line"><h1>${escapeHtml(object.name)}</h1><button type="button" data-rename-cash-object aria-label="${escapeHtml(tr('renameObject'))}" title="${escapeHtml(tr('renameObject'))}">✎</button></div><p>${object.completed ? tr('completedObject') : tr('objectSections')}</p></div><button class="primary-button" type="button" data-add-cash-section><span>＋</span>${tr('addSection')}</button></div>${object.sections.length ? `<div class="cash-sections">${object.sections.map((section) => cashSectionMarkup(object, section)).join('')}</div>` : `<div class="cash-sections-empty"><span>＋</span><h2>${tr('noSections')}</h2><p>${tr('noSectionsCopy')}</p><button class="primary-button" type="button" data-add-cash-section>${tr('addSection')}</button></div>`}${overall}`;
  $('[data-close-cash-object]', detail)?.addEventListener('click', () => { activeCashObjectId = null; renderCashflow(); });
  $('[data-rename-cash-object]', detail)?.addEventListener('click', () => renameCashObject(object.id));
  $$('[data-add-cash-section]', detail).forEach((button) => button.addEventListener('click', () => openCashSectionDialog(object.id)));
  $('[data-export-cash-object]', detail)?.addEventListener('click', () => openCashObjectExportDialog(object.id));
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
  const ownRowsFor = (investments, returns) => [
    ...investments.map((entry, index) => ({ number: index + 1, type: tr('ownFundsEntry'), comment: entry.comment, date: cashDate(entry.date), amount: entry.amount })),
    ...returns.map((entry, index) => ({ number: investments.length + index + 1, type: tr('ownReturnEntry'), comment: entry.comment, date: cashDate(entry.date), amount: entry.amount }))
  ];
  const tables = [];
  if (section.contractMode) {
    const advances = cashTotal(section.advances); const expenses = cashTotal(section.expenses);
    tables.push({ title: tr('contractAccounting'), columns, rows: rowsFor(section.advances, section.expenses, tr('advance')), summaries: [cashReportSummary(tr('contractAmount'), section.contractAmount), cashReportSummary(tr('totalAdvances'), advances), cashReportSummary(tr('remainingContract'), section.contractAmount - advances, true), cashReportSummary(tr('totalExpenses'), expenses), cashReportSummary(tr('advanceBalance'), advances - expenses, true)] });
    const ownInvested = cashTotal(section.ownInvestments); const ownReturned = cashTotal(section.ownReturns);
    tables.push({ title: `${tr('ownFundsAccounting')} · ${tr('contractAccounting')}`, columns, rows: ownRowsFor(section.ownInvestments, section.ownReturns), summaries: [cashReportSummary(tr('totalOwnInvested'), ownInvested), cashReportSummary(tr('totalOwnReturned'), ownReturned), cashReportSummary(tr('ownFundsRemaining'), ownInvested - ownReturned, true)] });
  }
  if (section.factMode) {
    const factIncome = cashTotal(section.factIncome); const factExpenses = cashTotal(section.factExpenses);
    tables.push({ title: tr('actualAccounting'), columns, rows: rowsFor(section.factIncome, section.factExpenses, tr('income')), summaries: [cashReportSummary(tr('income'), factIncome), cashReportSummary(tr('totalExpense'), factExpenses), cashReportSummary(tr('balanceResult'), factIncome - factExpenses, true)] });
    const factOwnInvested = cashTotal(section.factOwnInvestments); const factOwnReturned = cashTotal(section.factOwnReturns);
    tables.push({ title: `${tr('ownFundsAccounting')} · ${tr('actualAccounting')}`, columns, rows: ownRowsFor(section.factOwnInvestments, section.factOwnReturns), summaries: [cashReportSummary(tr('totalOwnInvested'), factOwnInvested), cashReportSummary(tr('totalOwnReturned'), factOwnReturned), cashReportSummary(tr('ownFundsRemaining'), factOwnInvested - factOwnReturned, true)] });
  }
  return {
    title: tr('sectionFinanceReport'), objectName: object.name, sectionName: section.name,
    tables, parties: cashDocumentParties(section.statement?.parties)
  };
}

function cashObjectDetailedReport(object) {
  const columns = [
    { label: tr('sectionName'), key: 'section', width: '*' },
    { label: tr('sectionMode'), key: 'mode', width: 105 },
    { label: tr('reportIncome'), key: 'income', width: 82, money: true },
    { label: tr('reportExpense'), key: 'expense', width: 82, money: true },
    { label: tr('sectionBalance'), key: 'balance', width: 82, money: true, signed: true, tone: true }
  ];
  const summaryRows = [];
  object.sections.forEach((section) => {
    const values = cashSectionFinancials(section);
    if (section.contractMode) summaryRows.push({ section: section.name, mode: tr('workByContract'), income: values.advances, expense: values.expenses, balance: values.contractBalance });
    if (section.factMode) summaryRows.push({ section: section.name, mode: tr('actualAccounting'), income: values.factIncome, expense: values.factExpenses, balance: values.factBalance });
    if (!section.contractMode && !section.factMode && section.staffingMode) summaryRows.push({ section: section.name, mode: tr('peopleAssigned'), income: 0, expense: 0, balance: 0 });
  });
  const totals = cashObjectFinancials(object);
  const tables = [{ title: tr('overallSectionsBalance'), columns, rows: summaryRows, summaries: [cashReportSummary(tr('contractBalancesTotal'), totals.contractBalance, true), cashReportSummary(tr('factBalancesTotal'), totals.factBalance, true), cashReportSummary(tr('overallSectionsBalance'), totals.balance, true)] }];
  object.sections.forEach((section) => {
    sectionFinanceReport(object, section).tables.forEach((table) => tables.push({ ...table, title: `${section.name} · ${table.title}` }));
  });
  return { title: tr('overallDetailedReport'), objectName: object.name, sectionName: tr('allObjectSections'), tables, parties: null };
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
  if (column.money) return column.signed ? formatSignedMoney(Number(value) || 0) : formatMoney(Number(value) || 0);
  return String(value ?? '');
}

function reportPreviewTableMarkup(table) {
  const headers = table.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('');
  const rows = table.rows.length ? table.rows.map((row) => `<tr>${table.columns.map((column) => {
    const tone = column.tone ? cashBalanceClass(Number(row[column.key]) || 0) : '';
    return `<td class="${column.number || column.money ? 'is-number ' : ''}${tone}">${escapeHtml(reportCellValue(column, row))}</td>`;
  }).join('')}</tr>`).join('') : `<tr><td class="report-preview-empty" colspan="${table.columns.length}">${tr('noEntries')}</td></tr>`;
  const total = Number.isFinite(table.total) ? `<div class="report-preview-total"><span>${tr('rowTotal')}</span><strong>${formatMoney(table.total)}</strong></div>` : '';
  const summaries = table.summaries?.length ? `<div class="report-preview-summaries">${table.summaries.map((summary) => `<div class="${escapeHtml(summary?.tone || '')}"><strong>${escapeHtml(cashReportSummaryText(summary))}</strong></div>`).join('')}</div>` : '';
  return `<section class="report-preview-section"><h3>${escapeHtml(table.title)}</h3><div class="report-preview-table-wrap"><table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table></div>${total}${summaries}</section>`;
}

function reportPreviewPartiesMarkup(parties) {
  if (!parties) return '';
  const rows = [[tr('preparedBy'), parties.prepared], [tr('performedBy'), parties.performed], [tr('acceptedBy'), parties.accepted]];
  return `<section class="report-preview-parties"><h3>${tr('fillDate')}: ${escapeHtml(parties.date || localDateKey())}</h3><div>${rows.map(([label, party]) => `<article><strong>${escapeHtml(label)}</strong><span>${tr('fullName')}: ${escapeHtml(party?.name || '—')}</span><span>${tr('signature')}: ${escapeHtml(party?.signature || '—')}</span></article>`).join('')}</div></section>`;
}

function reportPreviewMarkup(report) {
  return `<article class="report-preview-sheet"><header><div><span>STRUCTOS REPORT</span><h2>${escapeHtml(report.title)}</h2>${report.documentNumber ? `<p>${escapeHtml(report.numberLabel || tr('documentNumber'))}: ${escapeHtml(report.documentNumber)}</p>` : ''}</div><img src="${reportPreviewLogoUrl}" alt="StructOS" /></header><div class="report-preview-meta"><p><strong>${tr('objects')}:</strong> ${escapeHtml(report.objectName)}</p><p><strong>${tr('sectionName')}:</strong> ${escapeHtml(report.sectionName)}</p></div>${report.tables.map(reportPreviewTableMarkup).join('')}${reportPreviewPartiesMarkup(report.parties)}<footer><img src="${reportPreviewLogoUrl}" alt="" /><div><strong>${STRUCTOS_DOCUMENT_BRAND.made}</strong><span>${STRUCTOS_DOCUMENT_BRAND.site}</span><span>${STRUCTOS_DOCUMENT_BRAND.slogan}</span></div></footer></article>`;
}

function openCashReportPreview(report, getDeliveryReport = () => report, onSuccess = null) {
  const dialog = $('[data-report-preview-dialog]');
  if (!dialog) return;
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
  const content = [
    { text: report.title, style: 'title' },
    ...(report.documentNumber ? [{ text: `${report.numberLabel || tr('documentNumber')}: ${report.documentNumber}`, style: 'meta' }] : []),
    { text: `${tr('objects')}: ${report.objectName}`, style: 'meta' },
    { text: `${tr('sectionName')}: ${report.sectionName}`, style: 'meta', margin: [0, 0, 0, 14] }
  ];
  report.tables.forEach((table) => {
    const body = [table.columns.map((column) => ({ text: column.label, style: 'tableHeader' })), ...(table.rows.length ? table.rows.map((row) => table.columns.map((column) => {
      const tone = column.tone ? cashBalanceClass(Number(row[column.key]) || 0) : '';
      return { text: reportCellValue(column, row), alignment: column.number || column.money ? 'right' : 'left', ...(tone === 'is-negative' ? { color: '#d9384b', bold: true } : tone === 'is-positive' ? { color: '#138a5b', bold: true } : {}) };
    })) : [[{ text: tr('noEntries'), colSpan: table.columns.length, alignment: 'center', color: '#64748b', margin: [0, 8] }, ...Array.from({ length: table.columns.length - 1 }, () => ({}))]])];
    content.push({ text: table.title, style: 'sectionTitle', margin: [0, 10, 0, 6] }, { table: { headerRows: 1, widths: table.columns.map((column) => column.width), body }, layout: { fillColor: (rowIndex) => rowIndex === 0 ? '#eaf3ff' : null, hLineColor: '#b8c9dc', vLineColor: '#b8c9dc' }, fontSize: 8 });
    if (Number.isFinite(table.total)) content.push({ text: `${tr('rowTotal')}: ${formatMoney(table.total)}`, bold: true, alignment: 'right', margin: [0, 7, 0, 4] });
    if (table.summaries?.length) content.push({ ul: table.summaries.map((summary) => ({ text: cashReportSummaryText(summary), bold: Boolean(summary?.tone), color: summary?.tone === 'is-negative' ? '#d9384b' : summary?.tone === 'is-positive' ? '#138a5b' : '#14213d' })), margin: [10, 7, 0, 5], fontSize: 9 });
  });
  if (report.parties) {
    const partyRows = [['', tr('fullName'), tr('signature')], [tr('preparedBy'), report.parties.prepared.name, report.parties.prepared.signature], [tr('performedBy'), report.parties.performed.name, report.parties.performed.signature], [tr('acceptedBy'), report.parties.accepted.name, report.parties.accepted.signature]];
    content.push({ text: tr('fillDate'), style: 'sectionTitle', margin: [0, 16, 0, 6] }, { text: report.parties.date || localDateKey(), margin: [0, 0, 0, 8] }, { table: { widths: [90, '*', '*'], body: partyRows }, layout: 'lightHorizontalLines', fontSize: 9 });
  }
  const definition = {
    pageSize: 'A4', pageMargins: [34, 38, 34, 88], defaultStyle: { font: 'Roboto', fontSize: 9, color: '#14213d' },
    styles: { title: { fontSize: 18, bold: true, color: '#075cd3', margin: [0, 0, 0, 10] }, meta: { fontSize: 10, color: '#43546a', margin: [0, 0, 0, 3] }, sectionTitle: { fontSize: 12, bold: true, color: '#075cd3' }, tableHeader: { bold: true, color: '#0b2e59', fontSize: 8 } },
    content,
    footer: () => ({ columns: [{ text: '' }, { width: 230, stack: [{ image: logo, width: 30, alignment: 'right' }, { text: STRUCTOS_DOCUMENT_BRAND.made, bold: true, fontSize: 9, color: '#075cd3', alignment: 'right' }, { text: STRUCTOS_DOCUMENT_BRAND.site, fontSize: 7, color: '#64748b', alignment: 'right' }, { text: STRUCTOS_DOCUMENT_BRAND.slogan, fontSize: 7, color: '#64748b', alignment: 'right' }] }], margin: [34, 6, 34, 15] })
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
  if (report.parties) {
    worksheet.getCell(cursor, 1).value = tr('fillDate'); worksheet.getCell(cursor, 2).value = report.parties.date || localDateKey(); cursor += 2;
    [[tr('preparedBy'), report.parties.prepared], [tr('performedBy'), report.parties.performed], [tr('acceptedBy'), report.parties.accepted]].forEach(([label, party]) => { worksheet.getCell(cursor, 1).value = label; worksheet.getCell(cursor, 1).font = { bold: true }; worksheet.getCell(cursor, 2).value = `${tr('fullName')}: ${party.name}`; worksheet.getCell(cursor, 4).value = `${tr('signature')}: ${party.signature}`; cursor += 1; }); cursor += 2;
  }
  const logo = await loadReportLogo();
  const imageId = workbook.addImage({ base64: logo, extension: 'png' });
  worksheet.addImage(imageId, { tl: { col: maxColumns - 3, row: cursor - 1 }, ext: { width: 46, height: 46 } });
  worksheet.mergeCells(cursor, maxColumns - 2, cursor + 2, maxColumns); const brandCell = worksheet.getCell(cursor, maxColumns - 2); brandCell.value = `${STRUCTOS_DOCUMENT_BRAND.made}\n${STRUCTOS_DOCUMENT_BRAND.site}\n${STRUCTOS_DOCUMENT_BRAND.slogan}`; brandCell.font = { bold: true, color: { argb: 'FF075CD3' }, size: 10 }; brandCell.alignment = { horizontal: 'right', vertical: 'middle', wrapText: true }; worksheet.getRow(cursor).height = 32; worksheet.getRow(cursor + 1).height = 20; worksheet.getRow(cursor + 2).height = 20;
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

function bindCashReportActions(scope, getReport, onSuccess = null, getPreviewReport = getReport) {
  $('[data-report-preview]', scope)?.addEventListener('click', () => {
    try { openCashReportPreview(getPreviewReport(), getReport, onSuccess); }
    catch (error) { console.error(error); showToast(tr('comingSoon')); }
  });
  bindCashDeliveryActions(scope, getReport, onSuccess);
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
  const previewDocument = () => cashDocumentReport(object, section, kind, { ...draft, title: draft.title.trim() || defaultTitle, number: draft.number.trim() });
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
      .map(([kind, file]) => ({ kind, name: String(file.name), size: Number(file.size) || 0, type: String(file.type || ''), lastModified: Number(file.lastModified) || Date.now(), addedAt: file.addedAt || new Date().toISOString(), analysisPending: !pending.analysisComplete, analyzedAt: pending.analysisComplete ? (pending.updatedAt || new Date().toISOString()) : null }));
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

function myProjectObjects() {
  const projects = objectRegistry.filter((object) => Array.isArray(object.files) && object.files.length > 0);
  return projects.sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    const aDate = a.completedAt || a.startedAt || a.analyzedAt || a.uploadedAt || 0;
    const bDate = b.completedAt || b.startedAt || b.analyzedAt || b.uploadedAt || 0;
    return new Date(bDate) - new Date(aDate);
  });
}

function myProjectStatusKey(object) {
  if (object.status === 'ready') return 'readyStatus';
  if (object.status === 'active') return 'inWork';
  if (object.status === 'completed') return 'completedListObject';
  return 'uploaded';
}

function myProjectMarkup(object) {
  const usedBytes = (object.files || []).reduce((total, file) => total + (Number(file.size) || 0), 0);
  const updatedAt = object.completedAt || object.startedAt || object.analyzedAt || object.uploadedAt;
  const statusKey = myProjectStatusKey(object);
  const documents = Object.keys(uploadRules).map((kind) => {
    const file = objectFile(object, kind);
    return `<span class="my-project-document${file ? ' has-file' : ''}"><i>${file ? '✓' : '+'}</i><b>${escapeHtml(tr(kind))}</b><small>${escapeHtml(file?.name || tr('notUploaded'))}</small></span>`;
  }).join('');
  return `<article class="my-project-card is-${escapeHtml(object.status)}" data-my-project="${escapeHtml(object.id)}" role="button" tabindex="0" aria-label="${escapeHtml(`${tr('openObjectAction')}: ${object.name}`)}"><header><span class="my-project-mark" aria-hidden="true">▰</span><div><small>STRUCTOS PROJECT</small><h2>${escapeHtml(object.name)}</h2><span class="my-project-badges"><b>${escapeHtml(tr('fullCycleObject'))}</b><b class="is-${escapeHtml(object.status)}">${escapeHtml(tr(statusKey))}</b></span></div><i aria-hidden="true">›</i></header><div class="my-project-documents">${documents}</div><footer><span>${escapeHtml(tr('lastProjectUpdate'))}: ${escapeHtml(formatObjectDate(updatedAt))}</span><span>${escapeHtml(tr('memoryUsed'))}: ${escapeHtml(formatStorage(usedBytes))}</span></footer></article>`;
}

function renderMyProjects() {
  const projects = myProjectObjects();
  $$('[data-my-projects-list]').forEach((list) => {
    list.innerHTML = projects.map(myProjectMarkup).join('');
    $$('[data-my-project]', list).forEach((card) => {
      const open = () => openObjectCard(card.dataset.myProject);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (event) => { if (!['Enter', ' '].includes(event.key)) return; event.preventDefault(); open(); });
    });
  });
  $$('[data-my-projects-count]').forEach((count) => { count.textContent = String(projects.length); });
  $$('[data-my-projects-empty]').forEach((empty) => { empty.hidden = projects.length > 0; });
}

const projectAnalysisTabs = [
  { id: 'proposal', label: 'commercialProposal', icon: '₽' },
  { id: 'sheets', label: 'projectBySheets', icon: '▤' },
  { id: 'systems', label: 'projectBySystems', icon: '⌘' },
  { id: 'materials', label: 'projectMaterials', icon: '◇' },
  { id: 'boq', label: 'billOfQuantities', icon: '≡' }
];

function isObjectDocumentAnalyzed(object, file) {
  if (!object || !file || file.analysisPending === true) return false;
  return Boolean(file.analyzedAt || (object.analyzedAt && object.status !== 'uploaded'));
}

function analysisEmptyTable(columns) {
  return `<div class="analysis-detail-table-scroll"><table class="analysis-detail-table"><thead><tr>${columns.map((key) => `<th>${escapeHtml(tr(key))}</th>`).join('')}</tr></thead><tbody><tr class="analysis-detail-empty-row"><td colspan="${columns.length}"><span>◇</span><strong>${escapeHtml(tr('extractionPending'))}</strong><small>${escapeHtml(tr('extractionPendingCopy'))}</small></td></tr></tbody></table></div>`;
}

function projectAnalysisTabContent(tab) {
  if (tab === 'proposal') return analysisEmptyTable(['section', 'workName', 'unit', 'quantity', 'price', 'rowTotal']);
  if (tab === 'sheets') return analysisEmptyTable(['sheetNumber', 'sheetName', 'system', 'statusLabel']);
  if (tab === 'systems') return analysisEmptyTable(['system', 'sheets', 'materials', 'works', 'statusLabel']);
  if (tab === 'materials') return analysisEmptyTable(['recordNumber', 'materialName', 'markType', 'unit', 'quantity', 'source']);
  return analysisEmptyTable(['recordNumber', 'workName', 'unit', 'quantity', 'source']);
}

function analysisDetailHeader(object, kind, file) {
  const typeLabel = kind === 'project' ? tr('projectAnalysis') : tr(kind);
  return `<header class="analysis-detail-head"><button class="outline-button" type="button" data-analysis-back>← ${escapeHtml(tr('backToProjects'))}</button><div><span class="eyebrow">STRUCTOS ANALYTICS</span><h1>${escapeHtml(typeLabel)}</h1><p>${escapeHtml(object.name)}</p></div><span class="analysis-detail-status">${escapeHtml(tr('analyzed'))}</span></header><section class="analysis-detail-source"><span>${kind === 'project' ? '▤' : kind === 'contract' ? '≡' : '₽'}</span><div><small>${escapeHtml(tr('sourceFile'))}</small><strong>${escapeHtml(file.name)}</strong><em>${escapeHtml(formatStorage(file.size))}</em></div><button class="outline-button" type="button" data-analysis-replace="${escapeHtml(kind)}">${escapeHtml(tr('replaceDocument'))}</button></section>`;
}

function renderAnalysisDetail() {
  const rootElement = $('[data-analysis-detail]');
  if (!rootElement) return;
  const object = objectRegistry.find((item) => item.id === activeAnalysisDocument.objectId);
  const kind = activeAnalysisDocument.kind;
  const file = objectFile(object, kind);
  if (!object || !file) {
    rootElement.innerHTML = `<div class="empty-state"><h2>${escapeHtml(tr('noMyProjects'))}</h2><button class="primary-button" type="button" data-analysis-back>${escapeHtml(tr('backToProjects'))}</button></div>`;
  } else if (kind === 'project') {
    const tabs = projectAnalysisTabs.map((tab) => `<button class="${tab.id === activeProjectAnalysisTab ? 'is-active' : ''}" type="button" data-project-analysis-tab="${tab.id}" aria-selected="${tab.id === activeProjectAnalysisTab}"><span>${tab.icon}</span><strong>${escapeHtml(tr(tab.label))}</strong></button>`).join('');
    rootElement.innerHTML = `${analysisDetailHeader(object, kind, file)}<section class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></section><nav class="project-analysis-tabs" aria-label="${escapeHtml(tr('projectAnalysis'))}">${tabs}</nav><section class="project-analysis-content"><header><span class="eyebrow">STRUCTOS DETAIL</span><h2>${escapeHtml(tr(projectAnalysisTabs.find((tab) => tab.id === activeProjectAnalysisTab)?.label || 'commercialProposal'))}</h2></header>${projectAnalysisTabContent(activeProjectAnalysisTab)}</section>`;
  } else {
    rootElement.innerHTML = `${analysisDetailHeader(object, kind, file)}<section class="analysis-truth-note"><span>!</span><p>${escapeHtml(tr('analyzedDataOnly'))}</p></section><section class="analysis-document-placeholder"><span>${kind === 'contract' ? '≡' : '₽'}</span><h2>${escapeHtml(tr('analyzedDocumentPage'))}</h2><p>${escapeHtml(tr('analyzedDocumentPageCopy'))}</p></section>`;
  }
  $$('[data-analysis-back]', rootElement).forEach((button) => button.addEventListener('click', () => setPanel('projects')));
  $('[data-analysis-replace]', rootElement)?.addEventListener('click', (event) => openUploadDialog(event.currentTarget.dataset.analysisReplace, object?.id));
  $$('[data-project-analysis-tab]', rootElement).forEach((button) => button.addEventListener('click', () => { activeProjectAnalysisTab = button.dataset.projectAnalysisTab; renderAnalysisDetail(); }));
}

function promptDocumentAnalysis(object) {
  showDialog(tr('analysisNotReady'), tr('analysisNotReadyHint'), `<div class="dialog-options"><button class="primary-button" type="button" data-run-analysis-now>${escapeHtml(tr('runAnalysisNow'))}</button></div>`);
  $('[data-run-analysis-now]')?.addEventListener('click', () => {
    selectObjectForAnalysis(object);
    $('[data-dialog]')?.close();
    runAnalysis();
  });
}

function openAnalyzedDocument(objectId, kind) {
  const object = objectRegistry.find((item) => item.id === objectId);
  const file = objectFile(object, kind);
  if (!object || !file) return;
  if (!isObjectDocumentAnalyzed(object, file)) { promptDocumentAnalysis(object); return; }
  activeAnalysisDocument = { objectId: object.id, kind };
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
  const invitedManagedObjects = invitedObjects.map((object) => ({
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

function openInvitedObjectCard(id) {
  const object = invitedObjects.find((item) => item.id === id);
  if (!object) return;
  const name = invitedObjectName(object);
  const documents = Object.keys(uploadRules).map((kind) => {
    const file = object.files.find((item) => item.kind === kind);
    return `<button class="object-document-choice${file ? ' has-file' : ''}" type="button" data-invited-document><span>${file ? '✓' : '+'}</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file?.name || tr('ownerWillShare'))}</small></button>`;
  }).join('');
  showDialog(escapeHtml(name), tr('invitedToObject'), `<section class="invited-object-card"><div class="invited-object-status"><span>↗</span><div><b>${tr('invitedObject')}</b><small>${tr('inWork')}</small></div></div><dl><div><dt>${tr('invitedRole')}</dt><dd>${tr(object.roleKey || 'objectParticipant')}</dd></div><div><dt>${tr('invitedBy')}</dt><dd>${escapeHtml(object.invitedBy)}</dd></div><div><dt>${tr('invitedAt')}</dt><dd>${escapeHtml(formatObjectDate(object.invitedAt))}</dd></div></dl><p>${tr('invitedDocumentsHint')}</p><div class="object-document-chooser">${documents}</div></section>`);
  $('[data-dialog]')?.classList.add('invited-object-dialog');
  $$('[data-invited-document]', $('[data-dialog-content]')).forEach((button) => button.addEventListener('click', () => showToast(tr('ownerWillShare'))));
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
}

function openObjectCard(id) {
  const object = objectRegistry.find((item) => item.id === id);
  if (!object) return;
  const documentChoices = Object.keys(uploadRules).map((kind) => {
    const file = objectFile(object, kind);
    const actions = file
      ? `<button class="primary-button" type="button" data-open-object-analysis="${kind}">${escapeHtml(tr('openDocument'))}</button><button class="outline-button" type="button" data-object-upload="${kind}">${escapeHtml(tr('replaceDocument'))}</button>`
      : `<button class="outline-button" type="button" data-object-upload="${kind}">${escapeHtml(tr('upload'))}</button>`;
    return `<article class="object-document-choice ${file ? 'has-file' : ''}"><span>${file ? '✓' : '+'}</span><strong>${escapeHtml(tr(kind))}</strong><small>${escapeHtml(file?.name || tr('notUploaded'))}</small><div class="object-document-choice-actions">${actions}</div></article>`;
  }).join('');
  const lifecycleAction = ['active', 'completed'].includes(object.status)
    ? `<button class="outline-button object-lifecycle-button${object.status === 'active' ? ' is-danger' : ''}" type="button" data-toggle-core-object>${escapeHtml(tr(object.status === 'active' ? 'finishObject' : 'reopenObject'))}</button>`
    : object.status === 'ready'
      ? `<button class="outline-button object-start-project" type="button" data-start-core-object>${escapeHtml(tr('startObject'))}</button>`
      : '';
  const reportAction = object.files?.length ? `<button class="outline-button object-view-report" type="button" data-view-object-report>${escapeHtml(tr('viewReport'))}</button>` : '';
  showDialog(escapeHtml(object.name), tr('chooseObjectDocument'), `<div class="object-document-chooser">${documentChoices}</div><div class="object-card-actions"><button class="primary-button object-analyze-button" type="button" data-analyze-object>${escapeHtml(tr('analyzeObject'))}</button>${reportAction}<button class="outline-button object-rename-button" type="button" data-rename-core-object>${escapeHtml(tr('rename'))}</button>${lifecycleAction}</div>`);
  $$('[data-object-upload]').forEach((button) => button.addEventListener('click', () => openUploadDialog(button.dataset.objectUpload, object.id)));
  $$('[data-open-object-analysis]').forEach((button) => button.addEventListener('click', () => openAnalyzedDocument(object.id, button.dataset.openObjectAnalysis)));
  $('[data-analyze-object]')?.addEventListener('click', () => {
    selectObjectForAnalysis(object);
    $('[data-dialog]').close();
    runAnalysis();
  });
  $('[data-view-object-report]')?.addEventListener('click', () => openReportChooser(object));
  $('[data-rename-core-object]')?.addEventListener('click', () => renameCoreObject(object.id));
  $('[data-start-core-object]')?.addEventListener('click', () => startReadyObject(object.id));
  $('[data-toggle-core-object]')?.addEventListener('click', () => toggleCoreObjectCompletion(object.id));
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
  const files = readyFiles.map(([kind, file]) => ({ ...file, kind, name: file.name, size: file.size || 0, analysisPending: false, analyzedAt }));
  if (existing) {
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
  const object = { id: createObjectId(), name: String(name).trim(), status: 'ready', uploadedAt: analyzedAt, analyzedAt, startedAt: null, files };
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
  const uploadedFile = { ...pendingFile, kind: activeUploadKind, addedAt: new Date().toISOString(), analysisPending: true, analyzedAt: null };
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
    $('[data-view-report]')?.addEventListener('click', () => openReportChooser(analyzedObject));
    $('[data-start-object]')?.addEventListener('click', () => startReadyObject(analyzedObject.id));
  }, 1100);
}

function openView(view) {
  if (view === 'profile') { setPanel('profile'); return; }
  if (view === 'passport') { setPanel('passport'); return; }
  if (view === 'projects') { setPanel('projects'); return; }
  if (view === 'objects') { setPanel('objects'); return; }
  if (view === 'tasks') { openTodoDialog(); return; }
  if (view === 'calendar') { openCalendarDialog(); return; }
  if (view === 'drawing') { openDrawingStudio(); return; }
  if (view === 'project' || view === 'contract' || view === 'estimate' || view === 'analysis') {
    openUploadDialog(view === 'analysis' ? 'project' : view);
    return;
  }
  if (view === 'balance') { openBalanceDialog(); return; }
  if (view === 'finance') { setPanel('cashflow'); return; }
  if (view === 'bonuses') { openBonusDialog(); return; }
  const labels = { subscription: 'tariffSubscription', invitations: 'invitations', invite: 'invite', notifications: 'notifications', documents: 'documents', connections: 'connections', settings: 'settings', acts: 'widgetActs', attention: 'attention', tasks: 'widgetTasks', team: 'widgetTeam' };
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
    objectRegistry.unshift({ id: createObjectId(), name, status: 'active', uploadedAt: now, analyzedAt: now, startedAt: now, completedAt: null, files: [] });
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
bottomMenuToggle?.addEventListener('click', (event) => {
  if (bottomMenuSuppressClick) { event.preventDefault(); return; }
  setBottomMenu(!$('[data-bottom-menu]').classList.contains('is-open'));
});
bottomMenuToggle?.addEventListener('pointerdown', startBottomMenuDrag);
bottomMenuToggle?.addEventListener('pointermove', moveBottomMenu);
bottomMenuToggle?.addEventListener('pointerup', finishBottomMenuDrag);
bottomMenuToggle?.addEventListener('pointercancel', finishBottomMenuDrag);
$('[data-bottom-menu-close]')?.addEventListener('click', () => setBottomMenu(false));
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
$('[data-edit-profile]').addEventListener('click', openProfileEditor);
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
window.addEventListener('resize', () => { renderWidgets(); if (bottomMenuPosition) placeBottomMenu(bottomMenuPosition.x, bottomMenuPosition.y); else restoreBottomMenuPosition(); });
window.visualViewport?.addEventListener('resize', () => { if (bottomMenuPosition) placeBottomMenu(bottomMenuPosition.x, bottomMenuPosition.y); });

importPendingTransfer();
applyPassportRewards(passportCompletion());
applyProfileReward(calculatedProfileCompletion());
applyTheme(localStorage.getItem('structos-theme') === 'light' ? 'light' : 'dark');
applyLanguage(language);
renderWidgetPicker();
renderWidgets();
selectAnalysis(selectedAnalysis);
renderAnalysisCards();
renderObjects();
renderCashflow();
setPanel(location.hash.slice(1) || 'home');
requestAnimationFrame(restoreBottomMenuPosition);
await initAuth();

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
