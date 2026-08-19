const root = document.documentElement;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const translations = {
  RU: {
    tagline: 'ЕДИНЫЙ СТРОИТЕЛЬНЫЙ ИНТЕЛЛЕКТ', login: 'Войти', register: 'Регистрация', installPhone: 'Установить StructOS на телефон',
    hero1: 'Единый', hero2: 'строительный', hero3: 'интеллект России', subtitle1: 'Операционная система для запуска', subtitle2: 'объекта', subtitle3: 'в один клик.',
    benefit1: 'Анализирует проект,<br>смету, договор', benefit2: 'Находит ошибки и риски<br>до начала работ', benefit3: 'Экономит время,<br>деньги и ресурсы',
    click: 'КЛИК', easyStart: 'ДЛЯ ЛЁГКОГО СТАРТА', startDescription: 'Загрузите проект, смету<br>или договор и получите<br>результат за минуты',
    project: 'ПРОЕКТ', contract: 'ДОГОВОР', estimate: 'СМЕТА', upload: 'Загрузить', uploaded: 'Файл загружен ✓',
    projectFormats: 'PDF, DWG, RVT, изображения<br>до 500 МБ', contractFormats: 'PDF, DOCX, DOC, изображения<br>до 100 МБ', estimateFormats: 'XLSX, CSV, PDF, изображения<br>до 100 МБ',
    companies: 'компаний<br>уже с нами', projectsAnalyzed: 'проектов<br>проанализировано', saved: 'сэкономлено<br>нашим клиентам', accuracy: 'точность<br>анализа', trustTitle: 'Нам доверяют лидеры строительной отрасли',
    startAnalysis: 'Начать анализ', oneFilePerCategory: 'Один файл в каждой категории', objectName: 'Название объекта', objectNameHint: 'Объединим проект, договор и смету в одном объекте',
    selectFile: 'Выберите файл', dropFile: 'или перетащите его сюда', replace: 'Заменить', deviceFile: 'Файл с устройства', photoOrCamera: 'Фото / камера', notSelected: 'не выбран', notSelectedFemale: 'не выбрана', selected: 'выбран', selectedFemale: 'выбрана',
    structosProcessing: 'StructOS обрабатывает документы', analysisInProgress: 'Идёт анализ', overallProgress: 'Общий прогресс', analysisBackground: 'Можно свернуть окно — анализ продолжится в фоне.', viewResult: 'Смотреть результат', analysisContinues: 'Анализ продолжается',
    stage0: 'Документ загружен', stage1: 'Анализируем текст', stage2: 'Анализируем файл', stage3: 'Ищем несоответствия', stage4: 'Ищем риски', stage5: 'Ищем материалы', stage6: 'Ищем оборудование', stage7: 'Анализ завершён',
    objects: 'Объекты', analysisResult: 'Результат анализа', launchReadiness: 'Готовность к запуску', needsFixes: 'Требуются исправления', readinessCopy: 'Объект готов к запуску с условием устранения выявленных проблем.',
    criticalRisks: 'Критических<br>рисков', mismatches: 'Несоответствия', moneyAtRisk: 'Под риском', missingItems: 'Отсутствующих<br>позиций', mainConclusion: 'Главный вывод StructOS', conclusionCopy: 'Объект условно готов к запуску. До начала работ устраните 4 критических несоответствия.',
    remarks: 'замечаний', remarksContract: 'замечания', readyDetails: 'Готов к детальному просмотру', system: 'Система:', sections: 'Разделы:', specification: 'Спецификация:', extrasFound: 'Найдено допов:', commercialOffer: 'Ком. предложение:', created: 'создано ✓',
    sectionsFound: 'Найдено разделов:', remarksLabel: 'Замечаний:', attentionClauses: 'Внимание к пунктам:', notIncluded: 'Не учтено:', risks: 'Риски:', totalItems: 'Всего позиций:', needClarification: 'Требует уточнений:', possiblyMissed: 'Возможно пропустили:',
    documentMismatches: 'Несоответствия документов', doNow: 'Что сделать сейчас', action1: 'Устраните 4 критических несоответствия', action2: 'Проверьте 24 несоответствия', action3: 'Добавьте 18 отсутствующих позиций', highPriority: 'Высокий приоритет', mediumPriority: 'Средний приоритет', lowPriority: 'Низкий приоритет', fullReport: 'Сформировать полный отчёт', resultsLanguages: 'Результаты: RU + выбранный язык',
    installTitle: 'Установить StructOS', appLike: 'Открывается как обычное приложение', safariStep1: 'Нажмите «Поделиться» в Safari.', safariStep2: 'Выберите «На экран Домой».', safariStep3: 'Включите «Открывать как веб-приложение».', safariStep4: 'Нажмите «Добавить».', chromeStep1: 'Откройте меню ⋮.', chromeStep2: 'Выберите «Установить приложение» или «Добавить на главный экран».', chromeStep3: 'Подтвердите установку.', yandexStep1: 'Откройте меню Яндекс Браузера.', yandexStep2: 'Выберите «Добавить ярлык».', yandexStep3: 'Нажмите «Добавить».', yandexNote: 'Ярлык будет открывать StructOS через Яндекс Браузер.', installApp: 'Установить приложение'
  },
  EN: {
    tagline: 'UNIFIED CONSTRUCTION INTELLIGENCE', login: 'Sign in', register: 'Register', installPhone: 'Install StructOS on your phone', hero1: 'Unified', hero2: 'construction', hero3: 'intelligence for Russia', subtitle1: 'An operating system for launching', subtitle2: 'a project', subtitle3: 'in one click.', benefit1: 'Analyses the project,<br>estimate and contract', benefit2: 'Finds errors and risks<br>before work begins', benefit3: 'Saves time,<br>money and resources', click: 'CLICK', easyStart: 'FOR AN EASY START', startDescription: 'Upload a project, estimate<br>or contract and get<br>results in minutes', project: 'PROJECT', contract: 'CONTRACT', estimate: 'ESTIMATE', upload: 'Upload', uploaded: 'File uploaded ✓', companies: 'companies<br>already with us', projectsAnalyzed: 'projects<br>analysed', saved: 'saved for<br>our clients', accuracy: 'analysis<br>accuracy', trustTitle: 'Trusted by construction industry leaders', startAnalysis: 'Start analysis', oneFilePerCategory: 'One file per category', objectName: 'Object name', objectNameHint: 'We will group the project, contract and estimate into one object', selectFile: 'Choose a file', dropFile: 'or drag it here', replace: 'Replace', deviceFile: 'File from device', photoOrCamera: 'Photo / camera', notSelected: 'not selected', notSelectedFemale: 'not selected', selected: 'selected', selectedFemale: 'selected', structosProcessing: 'StructOS is processing documents', analysisInProgress: 'Analysis in progress', overallProgress: 'Overall progress', analysisBackground: 'You can minimize this window — analysis will continue in the background.', viewResult: 'View result', analysisContinues: 'Analysis continues', stage0: 'Document uploaded', stage1: 'Analysing text', stage2: 'Analysing file', stage3: 'Finding inconsistencies', stage4: 'Finding risks', stage5: 'Finding materials', stage6: 'Finding equipment', stage7: 'Analysis complete', objects: 'Objects', analysisResult: 'Analysis result', launchReadiness: 'Launch readiness', needsFixes: 'Corrections required', readinessCopy: 'The object can be launched once identified issues are resolved.', criticalRisks: 'Critical<br>risks', mismatches: 'Inconsistencies', moneyAtRisk: 'At risk', missingItems: 'Missing<br>items', mainConclusion: 'StructOS main conclusion', conclusionCopy: 'The object is conditionally ready. Resolve 4 critical inconsistencies before work begins.', remarks: 'remarks', remarksContract: 'remarks', readyDetails: 'Ready for detailed review', system: 'System:', sections: 'Sections:', specification: 'Specification:', extrasFound: 'Extras found:', commercialOffer: 'Commercial offer:', created: 'created ✓', sectionsFound: 'Sections found:', remarksLabel: 'Remarks:', attentionClauses: 'Clauses to review:', notIncluded: 'Not included:', risks: 'Risks:', totalItems: 'Total items:', needClarification: 'Need clarification:', possiblyMissed: 'Possibly missed:', documentMismatches: 'Document inconsistencies', doNow: 'What to do now', action1: 'Resolve 4 critical inconsistencies', action2: 'Review 24 inconsistencies', action3: 'Add 18 missing items', highPriority: 'High priority', mediumPriority: 'Medium priority', lowPriority: 'Low priority', fullReport: 'Generate full report', resultsLanguages: 'Results: RU + selected language', installTitle: 'Install StructOS', appLike: 'Opens like a regular app', installApp: 'Install app'
  },
  TJ: {
    tagline: 'ЗЕҲНИ ЯГОНАИ СОХТМОНӢ', login: 'Ворид шудан', register: 'Бақайдгирӣ', installPhone: 'StructOS-ро дар телефон насб кунед', hero1: 'Зеҳни ягонаи', hero2: 'сохтмонӣ', hero3: 'барои Русия', subtitle1: 'Системаи амалиётӣ барои оғози', subtitle2: 'объект', subtitle3: 'бо як клик.', benefit1: 'Лоиҳа, смета ва<br>шартномаро таҳлил мекунад', benefit2: 'Хатоҳо ва хатарҳоро<br>пеш аз кор меёбад', benefit3: 'Вақт, маблағ ва<br>захираҳоро сарфа мекунад', click: 'КЛИК', easyStart: 'БАРОИ ОҒОЗИ ОСОН', project: 'ЛОИҲА', contract: 'ШАРТНОМА', estimate: 'СМЕТА', upload: 'Бор кардан', uploaded: 'Файл бор шуд ✓', trustTitle: 'Пешвоёни соҳаи сохтмон ба мо бовар мекунанд', startAnalysis: 'Оғози таҳлил', objectName: 'Номи объект', selectFile: 'Файлро интихоб кунед', replace: 'Иваз кардан', deviceFile: 'Файл аз дастгоҳ', photoOrCamera: 'Акс / камера', analysisInProgress: 'Таҳлил идома дорад', overallProgress: 'Раванди умумӣ', viewResult: 'Натиҷаро дидан', analysisResult: 'Натиҷаи таҳлил', launchReadiness: 'Омодагӣ ба оғоз', needsFixes: 'Ислоҳ талаб мешавад', criticalRisks: 'Хатарҳои<br>ҷиддӣ', mismatches: 'Номувофиқатӣ', moneyAtRisk: 'Зери хатар', missingItems: 'Мавқеъҳои<br>нарасида', readyDetails: 'Барои баррасии муфассал омода', fullReport: 'Ҳисоботи пурра тартиб диҳед', resultsLanguages: 'Натиҷаҳо: RU + забони интихобшуда', installTitle: 'Насби StructOS', installApp: 'Насби барнома'
  },
  KG: {
    tagline: 'БИРДИКТҮҮ КУРУЛУШ ИНТЕЛЛЕКТИ', login: 'Кирүү', register: 'Катталуу', installPhone: 'StructOSту телефонго орнотуу', hero1: 'Бирдиктүү', hero2: 'курулуш', hero3: 'интеллекти', subtitle1: 'Объектти бир чыкылдатуу менен', subtitle2: 'ишке киргизүүчү', subtitle3: 'операциялык система.', benefit1: 'Долбоорду, сметаны жана<br>келишимди талдайт', benefit2: 'Иш башталганга чейин<br>каталарды табат', benefit3: 'Убакытты, акчаны жана<br>ресурстарды үнөмдөйт', click: 'ЧЫКЫЛДАТУУ', easyStart: 'ЖЕҢИЛ БАШТОО ҮЧҮН', project: 'ДОЛБООР', contract: 'КЕЛИШИМ', estimate: 'СМЕТА', upload: 'Жүктөө', uploaded: 'Файл жүктөлдү ✓', trustTitle: 'Курулуш тармагынын лидерлери бизге ишенет', startAnalysis: 'Талдоону баштоо', objectName: 'Объекттин аталышы', selectFile: 'Файлды тандаңыз', replace: 'Алмаштыруу', deviceFile: 'Түзмөктөн файл', photoOrCamera: 'Сүрөт / камера', analysisInProgress: 'Талдоо жүрүп жатат', overallProgress: 'Жалпы прогресс', viewResult: 'Натыйжаны көрүү', analysisResult: 'Талдоонун натыйжасы', launchReadiness: 'Ишке даярдык', needsFixes: 'Оңдоо талап кылынат', criticalRisks: 'Критикалык<br>тобокелдиктер', mismatches: 'Дал келбестиктер', moneyAtRisk: 'Тобокелдикте', missingItems: 'Жок<br>позициялар', readyDetails: 'Толук көрүүгө даяр', fullReport: 'Толук отчет түзүү', resultsLanguages: 'Натыйжалар: RU + тандалган тил', installTitle: 'StructOSту орнотуу', installApp: 'Тиркемени орнотуу'
  },
  TR: {
    tagline: 'BİRLEŞİK İNŞAAT ZEKÂSI', login: 'Giriş', register: 'Kayıt', installPhone: "StructOS'u telefona yükle", hero1: 'Birleşik', hero2: 'inşaat', hero3: 'zekâsı', subtitle1: 'Projeyi tek tıkla başlatan', subtitle2: 'işletim', subtitle3: 'sistemi.', benefit1: 'Projeyi, keşfi ve<br>sözleşmeyi analiz eder', benefit2: 'İş başlamadan önce<br>hata ve riskleri bulur', benefit3: 'Zaman, para ve<br>kaynak tasarrufu sağlar', click: 'TIK', easyStart: 'KOLAY BAŞLANGIÇ', project: 'PROJE', contract: 'SÖZLEŞME', estimate: 'KEŞİF', upload: 'Yükle', uploaded: 'Dosya yüklendi ✓', companies: 'şirket<br>bizimle', projectsAnalyzed: 'proje<br>analiz edildi', saved: 'müşterilerimiz için<br>tasarruf', accuracy: 'analiz<br>doğruluğu', trustTitle: 'İnşaat sektörünün liderleri bize güveniyor', startAnalysis: 'Analizi başlat', oneFilePerCategory: 'Her kategoride bir dosya', objectName: 'Proje adı', objectNameHint: 'Proje, sözleşme ve keşfi aynı nesnede birleştireceğiz', selectFile: 'Dosya seçin', dropFile: 'veya buraya sürükleyin', replace: 'Değiştir', deviceFile: 'Cihazdan dosya', photoOrCamera: 'Fotoğraf / kamera', notSelected: 'seçilmedi', notSelectedFemale: 'seçilmedi', selected: 'seçildi', selectedFemale: 'seçildi', structosProcessing: 'StructOS belgeleri işliyor', analysisInProgress: 'Analiz devam ediyor', overallProgress: 'Genel ilerleme', analysisBackground: 'Pencereyi küçültebilirsiniz — analiz arka planda devam eder.', viewResult: 'Sonucu görüntüle', analysisContinues: 'Analiz devam ediyor', stage0: 'Belge yüklendi', stage1: 'Metin analiz ediliyor', stage2: 'Dosya analiz ediliyor', stage3: 'Uyumsuzluklar aranıyor', stage4: 'Riskler aranıyor', stage5: 'Malzemeler aranıyor', stage6: 'Ekipman aranıyor', stage7: 'Analiz tamamlandı', objects: 'Nesneler', analysisResult: 'Analiz sonucu', launchReadiness: 'Başlatma hazırlığı', needsFixes: 'Düzeltme gerekli', readinessCopy: 'Belirlenen sorunlar giderildiğinde nesne başlatılabilir.', criticalRisks: 'Kritik<br>risk', mismatches: 'Uyumsuzluk', moneyAtRisk: 'Risk altında', missingItems: 'Eksik<br>kalem', mainConclusion: 'StructOS ana sonucu', conclusionCopy: 'Nesne şartlı olarak hazır. İşe başlamadan önce 4 kritik uyumsuzluğu giderin.', remarks: 'not', remarksContract: 'not', readyDetails: 'Detaylı incelemeye hazır', system: 'Sistem:', sections: 'Bölümler:', specification: 'Şartname:', extrasFound: 'Ek bulunan:', commercialOffer: 'Ticari teklif:', created: 'oluşturuldu ✓', sectionsFound: 'Bulunan bölümler:', remarksLabel: 'Notlar:', attentionClauses: 'Dikkat edilecek maddeler:', notIncluded: 'Dahil değil:', risks: 'Riskler:', totalItems: 'Toplam kalem:', needClarification: 'Açıklama gerekli:', possiblyMissed: 'Muhtemel eksik:', documentMismatches: 'Belge uyumsuzlukları', doNow: 'Şimdi ne yapılmalı', action1: '4 kritik uyumsuzluğu giderin', action2: '24 uyumsuzluğu kontrol edin', action3: '18 eksik kalemi ekleyin', highPriority: 'Yüksek öncelik', mediumPriority: 'Orta öncelik', lowPriority: 'Düşük öncelik', fullReport: 'Tam rapor oluştur', resultsLanguages: 'Sonuçlar: RU + seçilen dil', installTitle: "StructOS'u yükle", appLike: 'Normal bir uygulama gibi açılır', installApp: 'Uygulamayı yükle'
  }
};

Object.assign(translations.EN, {
  projectFormats: 'PDF, DWG, RVT, images<br>up to 500 MB', contractFormats: 'PDF, DOCX, DOC, images<br>up to 100 MB', estimateFormats: 'XLSX, CSV, PDF, images<br>up to 100 MB',
  safariStep1: 'Tap “Share” in Safari.', safariStep2: 'Choose “Add to Home Screen”.', safariStep3: 'Enable “Open as Web App”.', safariStep4: 'Tap “Add”.',
  chromeStep1: 'Open the ⋮ menu.', chromeStep2: 'Choose “Install app” or “Add to Home screen”.', chromeStep3: 'Confirm installation.',
  yandexStep1: 'Open the Yandex Browser menu.', yandexStep2: 'Choose “Add shortcut”.', yandexStep3: 'Tap “Add”.', yandexNote: 'The shortcut will open StructOS through Yandex Browser.'
});

Object.assign(translations.TJ, {
  startDescription: 'Лоиҳа, смета ё шартномаро<br>бор кунед ва натиҷаро<br>дар чанд дақиқа гиред', projectFormats: 'PDF, DWG, RVT, тасвирҳо<br>то 500 МБ', contractFormats: 'PDF, DOCX, DOC, тасвирҳо<br>то 100 МБ', estimateFormats: 'XLSX, CSV, PDF, тасвирҳо<br>то 100 МБ',
  companies: 'ширкат<br>бо мост', projectsAnalyzed: 'лоиҳа<br>таҳлил шуд', saved: 'барои мизоҷон<br>сарфа шуд', accuracy: 'дақиқии<br>таҳлил', oneFilePerCategory: 'Дар ҳар гурӯҳ як файл', objectNameHint: 'Лоиҳа, шартнома ва сметаро дар як объект муттаҳид мекунем', dropFile: 'ё онро ба ин ҷо кашед', photoOrCamera: 'Акс / камера', notSelected: 'интихоб нашудааст', notSelectedFemale: 'интихоб нашудааст', selected: 'интихоб шуд', selectedFemale: 'интихоб шуд', structosProcessing: 'StructOS ҳуҷҷатҳоро коркард мекунад', analysisBackground: 'Тирезаро хурд кардан мумкин аст — таҳлил дар замина идома меёбад.', analysisContinues: 'Таҳлил идома дорад',
  stage0: 'Ҳуҷҷат бор шуд', stage1: 'Матнро таҳлил мекунем', stage2: 'Файлро таҳлил мекунем', stage3: 'Номувофиқиро меҷӯем', stage4: 'Хатарҳоро меҷӯем', stage5: 'Маводҳоро меҷӯем', stage6: 'Таҷҳизотро меҷӯем', stage7: 'Таҳлил анҷом ёфт',
  objects: 'Объектҳо', readinessCopy: 'Объект пас аз бартараф кардани мушкилоти ошкоршуда ба оғоз омода аст.', mainConclusion: 'Хулосаи асосии StructOS', conclusionCopy: 'Объект шартан омода аст. Пеш аз кор 4 номувофиқии ҷиддиро бартараф кунед.', remarks: 'эрод', remarksContract: 'эрод', system: 'Система:', sections: 'Қисмҳо:', specification: 'Мушаххасот:', extrasFound: 'Иловаҳо ёфт шуданд:', commercialOffer: 'Пешниҳоди тиҷоратӣ:', created: 'сохта шуд ✓', sectionsFound: 'Қисмҳо ёфт шуданд:', remarksLabel: 'Эродҳо:', attentionClauses: 'Диққат ба бандҳо:', notIncluded: 'Ба ҳисоб гирифта нашудааст:', risks: 'Хатарҳо:', totalItems: 'Ҳамаи мавқеъҳо:', needClarification: 'Шарҳ мехоҳад:', possiblyMissed: 'Эҳтимол аз даст рафтааст:', documentMismatches: 'Номувофиқии ҳуҷҷатҳо', doNow: 'Ҳоло чӣ бояд кард', action1: '4 номувофиқии ҷиддиро бартараф кунед', action2: '24 номувофиқиро санҷед', action3: '18 мавқеи намерасидаро илова кунед', highPriority: 'Афзалияти баланд', mediumPriority: 'Афзалияти миёна', lowPriority: 'Афзалияти паст', resultsLanguages: 'Натиҷаҳо: RU + забони интихобшуда', appLike: 'Мисли барномаи оддӣ кушода мешавад',
  safariStep1: 'Дар Safari «Мубодила»-ро пахш кунед.', safariStep2: '«Ба экрани асосӣ»-ро интихоб кунед.', safariStep3: '«Ҳамчун веб-барнома кушодан»-ро фаъол кунед.', safariStep4: '«Илова кардан»-ро пахш кунед.', chromeStep1: 'Менюи ⋮-ро кушоед.', chromeStep2: '«Насби барнома» ё «Ба экрани асосӣ»-ро интихоб кунед.', chromeStep3: 'Насбро тасдиқ кунед.', yandexStep1: 'Менюи Яндекс Браузерро кушоед.', yandexStep2: '«Илова кардани миёнабур»-ро интихоб кунед.', yandexStep3: '«Илова кардан»-ро пахш кунед.', yandexNote: 'Миёнабур StructOS-ро тавассути Яндекс Браузер мекушояд.'
});

Object.assign(translations.KG, {
  startDescription: 'Долбоорду, сметаны же<br>келишимди жүктөп,<br>натыйжаны мүнөттө алыңыз', projectFormats: 'PDF, DWG, RVT, сүрөттөр<br>500 МБ чейин', contractFormats: 'PDF, DOCX, DOC, сүрөттөр<br>100 МБ чейин', estimateFormats: 'XLSX, CSV, PDF, сүрөттөр<br>100 МБ чейин', companies: 'компания<br>биз менен', projectsAnalyzed: 'долбоор<br>талданды', saved: 'кардарлар үчүн<br>үнөмдөлдү', accuracy: 'талдоонун<br>тактыгы', oneFilePerCategory: 'Ар бир категорияда бир файл', objectNameHint: 'Долбоорду, келишимди жана сметаны бир объектке бириктиребиз', dropFile: 'же бул жерге сүйрөңүз', photoOrCamera: 'Сүрөт / камера', notSelected: 'тандалган жок', notSelectedFemale: 'тандалган жок', selected: 'тандалды', selectedFemale: 'тандалды', structosProcessing: 'StructOS документтерди иштетүүдө', analysisBackground: 'Терезени жыйноого болот — талдоо фондо уланат.', analysisContinues: 'Талдоо уланууда',
  stage0: 'Документ жүктөлдү', stage1: 'Текст талданууда', stage2: 'Файл талданууда', stage3: 'Дал келбестиктер изделүүдө', stage4: 'Тобокелдиктер изделүүдө', stage5: 'Материалдар изделүүдө', stage6: 'Жабдуулар изделүүдө', stage7: 'Талдоо аяктады', objects: 'Объекттер', readinessCopy: 'Табылган көйгөйлөр оңдолгондон кийин объектти ишке киргизүүгө болот.', mainConclusion: 'StructOS негизги корутундусу', conclusionCopy: 'Объект шарттуу даяр. Иш башталганга чейин 4 критикалык дал келбестикти оңдоңуз.', remarks: 'эскертүү', remarksContract: 'эскертүү', system: 'Система:', sections: 'Бөлүмдөр:', specification: 'Спецификация:', extrasFound: 'Кошумча табылды:', commercialOffer: 'Коммерциялык сунуш:', created: 'түзүлдү ✓', sectionsFound: 'Бөлүм табылды:', remarksLabel: 'Эскертүүлөр:', attentionClauses: 'Көңүл буруучу пункттар:', notIncluded: 'Эске алынган жок:', risks: 'Тобокелдиктер:', totalItems: 'Бардык позициялар:', needClarification: 'Тактоо талап кылынат:', possiblyMissed: 'Өткөрүлүп кетиши мүмкүн:', documentMismatches: 'Документтердин дал келбестиги', doNow: 'Азыр эмне кылуу керек', action1: '4 критикалык дал келбестикти оңдоңуз', action2: '24 дал келбестикти текшериңиз', action3: '18 жетишпеген позицияны кошуңуз', highPriority: 'Жогорку артыкчылык', mediumPriority: 'Орточо артыкчылык', lowPriority: 'Төмөн артыкчылык', resultsLanguages: 'Натыйжалар: RU + тандалган тил', appLike: 'Кадимки тиркеме сыяктуу ачылат',
  safariStep1: 'Safariде «Бөлүшүү» баскычын басыңыз.', safariStep2: '«Башкы экранга» тандаңыз.', safariStep3: '«Веб-тиркеме катары ачуу» күйгүзүңүз.', safariStep4: '«Кошуу» баскычын басыңыз.', chromeStep1: '⋮ менюсун ачыңыз.', chromeStep2: '«Тиркемени орнотуу» же «Башкы экранга кошуу» тандаңыз.', chromeStep3: 'Орнотууну ырастаңыз.', yandexStep1: 'Яндекс Браузер менюсун ачыңыз.', yandexStep2: '«Жарлык кошуу» тандаңыз.', yandexStep3: '«Кошуу» баскычын басыңыз.', yandexNote: 'Жарлык StructOSту Яндекс Браузер аркылуу ачат.'
});

Object.assign(translations.TR, {
  startDescription: 'Proje, keşif veya sözleşmeyi<br>yükleyin, sonucu<br>dakikalar içinde alın', projectFormats: 'PDF, DWG, RVT, görseller<br>500 MB’a kadar', contractFormats: 'PDF, DOCX, DOC, görseller<br>100 MB’a kadar', estimateFormats: 'XLSX, CSV, PDF, görseller<br>100 MB’a kadar',
  safariStep1: 'Safari’de “Paylaş”a dokunun.', safariStep2: '“Ana Ekrana Ekle”yi seçin.', safariStep3: '“Web Uygulaması Olarak Aç”ı etkinleştirin.', safariStep4: '“Ekle”ye dokunun.', chromeStep1: '⋮ menüsünü açın.', chromeStep2: '“Uygulamayı yükle” veya “Ana ekrana ekle”yi seçin.', chromeStep3: 'Yüklemeyi onaylayın.', yandexStep1: 'Yandex Browser menüsünü açın.', yandexStep2: '“Kısayol ekle”yi seçin.', yandexStep3: '“Ekle”ye dokunun.', yandexNote: 'Kısayol StructOS’u Yandex Browser üzerinden açar.'
});

Object.assign(translations.RU, {
  menuLogin: 'Вход в StructOS',
  menuFeatures: 'Возможности',
  menuPricing: 'Тарифы',
  menuVideo: 'Видео презентация',
  menuDemo: 'Демо версия',
  objectRequired: 'Укажите название объекта'
});

Object.assign(translations.EN, {
  menuLogin: 'Sign in to StructOS',
  menuFeatures: 'Features',
  menuPricing: 'Pricing',
  menuVideo: 'Video presentation',
  menuDemo: 'Demo version',
  objectRequired: 'Enter the object name'
});

Object.assign(translations.TJ, {
  menuLogin: 'Воридшавӣ ба StructOS',
  menuFeatures: 'Имкониятҳо',
  menuPricing: 'Тарифҳо',
  menuVideo: 'Муаррифии видеоӣ',
  menuDemo: 'Нусхаи намоишӣ',
  objectRequired: 'Номи объектро ворид кунед'
});

Object.assign(translations.KG, {
  menuLogin: 'StructOSко кирүү',
  menuFeatures: 'Мүмкүнчүлүктөр',
  menuPricing: 'Тарифтер',
  menuVideo: 'Видео презентация',
  menuDemo: 'Демо версия',
  objectRequired: 'Объекттин аталышын жазыңыз'
});

Object.assign(translations.TR, {
  menuLogin: "StructOS'a giriş",
  menuFeatures: 'Özellikler',
  menuPricing: 'Fiyatlandırma',
  menuVideo: 'Video sunumu',
  menuDemo: 'Demo sürümü',
  objectRequired: 'Proje adını girin'
});

const themeButton = $('.theme-switch');
const themeMeta = $('meta[name="theme-color"]');
const languageButton = $('.language-button');
const languageMenu = $('.language-menu');
const currentLanguage = $('#current-language');
const menuButton = $('.menu-button');
const mainMenu = $('.main-menu');
const uploadDialog = $('#upload-dialog');
const analysisDialog = $('#analysis-dialog');
const installDialog = $('#install-dialog');
const modalInput = $('#modal-file-input');
const objectNameInput = $('#object-name');
const selectedFiles = { project: null, contract: null, estimate: null };
let pendingFile = null;
const acceptMap = {
  project: '.pdf,.dwg,.rvt,.jpg,.jpeg,.png,.webp,.heic,image/*',
  contract: '.pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.heic,image/*',
  estimate: '.xlsx,.xls,.csv,.pdf,.jpg,.jpeg,.png,.webp,.heic,image/*'
};
const sizeLimits = { project: 500, contract: 100, estimate: 100 };
let activeKind = 'project';
let selectedLanguage = localStorage.getItem('structos-language') || 'RU';
let toastTimer;
let analysisTimer;
let deferredInstallPrompt;

function t(key) {
  return translations[selectedLanguage]?.[key] ?? translations.RU[key] ?? key;
}

function applyLanguage(language) {
  selectedLanguage = translations[language] ? language : 'RU';
  root.lang = { RU: 'ru', EN: 'en', TJ: 'tg', KG: 'ky', TR: 'tr' }[selectedLanguage];
  currentLanguage.textContent = selectedLanguage;
  localStorage.setItem('structos-language', selectedLanguage);
  $$('[data-i18n]').forEach((element) => {
    const value = t(element.dataset.i18n);
    if (value) element.innerHTML = value;
  });
  renderUploadCards();
  renderSlots();
}

function applyTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(isDark));
  themeButton.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему');
  themeMeta.setAttribute('content', isDark ? '#07111e' : '#f7fbff');
  localStorage.setItem('structos-theme', theme);
}

function showToast(message) {
  const toast = $('.toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2800);
}

function closeMenu() {
  mainMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.classList.remove('is-open');
}

function fileSize(file) {
  if (file.size < 1024 * 1024) return `${Math.max(1, Math.round(file.size / 1024))} КБ`;
  return `${(file.size / 1024 / 1024).toFixed(1)} МБ`;
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function openUpload(kind) {
  activeKind = kind;
  pendingFile = selectedFiles[kind];
  modalInput.accept = acceptMap[kind];
  modalInput.value = '';
  const names = { project: t('project'), contract: t('contract'), estimate: t('estimate') };
  $('#upload-dialog-title').textContent = `${t('upload')} ${names[kind].toLowerCase()}`;
  $('.dropzone-formats').textContent = `${acceptMap[kind].replaceAll(',', ', ')} · до ${sizeLimits[kind]} МБ`;
  renderModalFile();
  setObjectNameError(false);
  updateUploadButton();
  if (!uploadDialog.open) uploadDialog.showModal();
  uploadDialog.classList.remove('is-constructing');
  requestAnimationFrame(() => uploadDialog.classList.add('is-constructing'));
}

function setFile(file) {
  if (!file) return;
  if (file.size > sizeLimits[activeKind] * 1024 * 1024) {
    showToast(`Файл превышает ${sizeLimits[activeKind]} МБ`);
    return;
  }
  pendingFile = file;
  renderModalFile();
  showToast(`Файл «${file.name}» выбран`);
}

function renderModalFile() {
  const file = pendingFile;
  $('.selected-file').hidden = !file;
  $('.dropzone').hidden = Boolean(file);
  $('.device-file-actions').hidden = Boolean(file);
  if (file) {
    $('.selected-file strong').textContent = file.name;
    $('.selected-file small').textContent = `${file.type || 'Файл'} · ${fileSize(file)}`;
  }
  updateUploadButton();
}

function setObjectNameError(show) {
  objectNameInput.classList.toggle('field-error', show);
  $('#object-name-error').hidden = !show;
  objectNameInput.setAttribute('aria-invalid', String(show));
}

function updateUploadButton() {
  $('.modal-upload-button').disabled = !(pendingFile && objectNameInput.value.trim());
}

function confirmUpload() {
  const objectName = objectNameInput.value.trim();
  if (!objectName) {
    setObjectNameError(true);
    objectNameInput.focus();
    showToast(t('objectRequired'));
    return;
  }
  if (!pendingFile) {
    showToast(t('selectFile'));
    return;
  }
  setObjectNameError(false);
  selectedFiles[activeKind] = pendingFile;
  renderUploadCards();
  renderSlots();
  uploadDialog.close();
  uploadDialog.classList.remove('is-constructing');
  showToast(t('uploaded'));
}

function renderUploadCards() {
  $$('.upload-card').forEach((card) => {
    const kind = card.dataset.kind;
    const file = selectedFiles[kind];
    card.classList.toggle('file-selected', Boolean(file));
    $('.file-name', card).textContent = file?.name || '';
    $('.upload-button span', card).textContent = file ? t('uploaded') : t('upload');
  });
}

function renderSlots() {
  $$('.upload-slots [data-slot]').forEach((slot) => {
    const kind = slot.dataset.slot;
    const file = selectedFiles[kind];
    slot.classList.toggle('has-file', Boolean(file));
    $('small', slot).textContent = file ? file.name : t(kind === 'estimate' ? 'notSelectedFemale' : 'notSelected');
  });
}

function validateBeforeAnalysis() {
  if (!Object.values(selectedFiles).some(Boolean)) {
    showToast('Сначала загрузите проект, договор или смету');
    openUpload('project');
    return false;
  }
  if (!objectNameInput.value.trim()) {
    uploadDialog.open || openUpload(Object.keys(selectedFiles).find((key) => selectedFiles[key]) || 'project');
    objectNameInput.classList.add('field-error');
    objectNameInput.focus();
    showToast('Укажите название объекта');
    return false;
  }
  objectNameInput.classList.remove('field-error');
  return true;
}

function startAnalysis() {
  if (!validateBeforeAnalysis()) return;
  if (uploadDialog.open) uploadDialog.close();
  const kinds = Object.keys(selectedFiles).filter((kind) => selectedFiles[kind]);
  const progress = Object.fromEntries(kinds.map((kind) => [kind, 0]));
  const labels = { project: t('project'), contract: t('contract'), estimate: t('estimate') };
  $('.analysis-files').innerHTML = kinds.map((kind) => `<article class="analysis-file ${kind}" data-analysis-kind="${kind}"><header><span class="analysis-file-icon">▤</span><div><strong>${labels[kind]}</strong><small>${escapeHtml(selectedFiles[kind].name)}</small></div><b>0%</b></header><progress value="0" max="100"></progress><p>${t('stage0')}</p></article>`).join('');
  $('.view-results-button').disabled = true;
  $('.overall-progress progress').value = 0;
  $('.overall-progress span').textContent = '0%';
  $('.analysis-dock').hidden = true;
  analysisDialog.showModal();
  clearInterval(analysisTimer);
  analysisTimer = setInterval(() => {
    kinds.forEach((kind, index) => {
      if (progress[kind] >= 100) return;
      progress[kind] = Math.min(100, progress[kind] + 3 + ((index + Math.floor(progress[kind] / 10)) % 5));
      const card = $(`[data-analysis-kind="${kind}"]`);
      $('progress', card).value = progress[kind];
      $('b', card).textContent = `${progress[kind]}%`;
      const stage = progress[kind] >= 100 ? 7 : Math.min(6, Math.floor(progress[kind] / 15));
      $('p', card).textContent = t(`stage${stage}`);
      card.classList.toggle('complete', progress[kind] >= 100);
    });
    const overall = Math.round(kinds.reduce((sum, kind) => sum + progress[kind], 0) / kinds.length);
    $('.overall-progress progress').value = overall;
    $('.overall-progress span').textContent = `${overall}%`;
    $('.dock-progress').textContent = `${overall}%`;
    if (overall >= 100) {
      clearInterval(analysisTimer);
      $('.view-results-button').disabled = false;
      $('.analysis-dock').hidden = true;
    }
  }, 420);
}

function showResults() {
  analysisDialog.open && analysisDialog.close();
  $('.analysis-dock').hidden = true;
  $('#landing-view').hidden = true;
  $('#result-screen').hidden = false;
  $$('.result-object-name').forEach((element) => { element.textContent = objectNameInput.value.trim(); });
  const kinds = Object.keys(selectedFiles).filter((kind) => selectedFiles[kind]);
  $$('.document-result').forEach((card) => { card.hidden = !selectedFiles[card.dataset.resultKind]; });
  $('.comparison-card').hidden = kinds.length < 2;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openInstall() {
  closeMenu();
  const ua = navigator.userAgent.toLowerCase();
  const isYandex = ua.includes('yabrowser');
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isSafari = isIOS && ua.includes('safari') && !ua.includes('crios') && !isYandex;
  const browser = isYandex ? 'yandex' : isSafari ? 'safari' : 'chrome';
  selectBrowserTab(browser);
  $('.install-device-note').textContent = isIOS && !isSafari ? 'Для установки как приложения откройте StructOS в Safari.' : '';
  $('.native-install-button').hidden = !deferredInstallPrompt;
  installDialog.showModal();
}

function selectBrowserTab(browser) {
  $$('.browser-tabs button').forEach((button) => button.classList.toggle('active', button.dataset.browser === browser));
  $$('.browser-instruction').forEach((panel) => { panel.hidden = panel.dataset.panel !== browser; });
}

applyTheme(localStorage.getItem('structos-theme') === 'dark' ? 'dark' : 'light');
applyLanguage(selectedLanguage);

themeButton.addEventListener('click', () => applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
languageButton.addEventListener('click', () => { const open = languageMenu.hidden; languageMenu.hidden = !open; languageButton.setAttribute('aria-expanded', String(open)); });
languageMenu.addEventListener('click', (event) => { const option = event.target.closest('[data-language]'); if (!option) return; applyLanguage(option.dataset.language); languageMenu.hidden = true; languageButton.setAttribute('aria-expanded', 'false'); });
menuButton.addEventListener('click', () => {
  const open = mainMenu.hidden;
  mainMenu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.classList.toggle('is-open', open);
  if (open) {
    mainMenu.classList.remove('is-building');
    requestAnimationFrame(() => mainMenu.classList.add('is-building'));
  } else {
    mainMenu.classList.remove('is-building');
  }
});
document.addEventListener('click', (event) => { if (!event.target.closest('.language-wrap')) languageMenu.hidden = true; if (!event.target.closest('.topbar')) closeMenu(); });

function goToUploads() { $('#uploads').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
$('#start').addEventListener('click', goToUploads);
$('#start').addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); goToUploads(); } });
$$('.upload-card').forEach((card) => { card.addEventListener('click', () => openUpload(card.dataset.kind)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') openUpload(card.dataset.kind); }); });
modalInput.addEventListener('change', () => setFile(modalInput.files?.[0]));
objectNameInput.addEventListener('input', () => { setObjectNameError(false); updateUploadButton(); });
objectNameInput.addEventListener('blur', () => { if (!objectNameInput.value.trim()) setObjectNameError(true); });
$('.choose-device').addEventListener('click', () => { modalInput.removeAttribute('capture'); modalInput.accept = acceptMap[activeKind]; modalInput.click(); });
$('.choose-photo').addEventListener('click', () => { modalInput.accept = 'image/*'; modalInput.setAttribute('capture', 'environment'); modalInput.click(); });
$('.dropzone').addEventListener('click', () => $('.choose-device').click());
$('.dropzone').addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') $('.choose-device').click(); });
['dragenter', 'dragover'].forEach((type) => $('.dropzone').addEventListener(type, (event) => { event.preventDefault(); $('.dropzone').classList.add('dragging'); }));
['dragleave', 'drop'].forEach((type) => $('.dropzone').addEventListener(type, (event) => { event.preventDefault(); $('.dropzone').classList.remove('dragging'); }));
$('.dropzone').addEventListener('drop', (event) => { if (event.dataTransfer.files.length > 1) showToast('Можно добавить только один файл в эту категорию'); setFile(event.dataTransfer.files[0]); });
$('.replace-file').addEventListener('click', () => $('.choose-device').click());
$('.delete-file').addEventListener('click', () => { pendingFile = null; modalInput.value = ''; renderModalFile(); });
$('.upload-close').addEventListener('click', () => { uploadDialog.close(); uploadDialog.classList.remove('is-constructing'); });
$('.modal-upload-button').addEventListener('click', confirmUpload);
$('.landing-analysis-button').addEventListener('click', () => { if (Object.values(selectedFiles).some(Boolean)) startAnalysis(); else openUpload('project'); });
$('.minimize-analysis').addEventListener('click', () => { analysisDialog.close(); $('.analysis-dock').hidden = false; });
$('.analysis-dock').addEventListener('click', () => { $('.analysis-dock').hidden = true; analysisDialog.showModal(); });
$('.view-results-button').addEventListener('click', showResults);
$('.result-back').addEventListener('click', () => { $('#result-screen').hidden = true; $('#landing-view').hidden = false; window.scrollTo({ top: 0, behavior: 'smooth' }); });
$('.report-button').addEventListener('click', () => showToast(`Отчёт будет сохранён: RU + ${selectedLanguage}`));
$$('.document-result > button').forEach((button) => button.addEventListener('click', () => showToast('Детальный просмотр подключим на следующем этапе')));

$$('.login-link, .register-button, .account-button').forEach((button) => button.addEventListener('click', () => { closeMenu(); showToast('Личный кабинет будет подключён на следующем этапе'); }));
$$('.install-app-button').forEach((button) => button.addEventListener('click', openInstall));
$('.install-close').addEventListener('click', () => installDialog.close());
$$('.browser-tabs button').forEach((button) => button.addEventListener('click', () => selectBrowserTab(button.dataset.browser)));
$('.native-install-button').addEventListener('click', async () => { if (!deferredInstallPrompt) return; deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice; deferredInstallPrompt = null; installDialog.close(); });
window.addEventListener('beforeinstallprompt', (event) => { event.preventDefault(); deferredInstallPrompt = event; });
window.addEventListener('appinstalled', () => { localStorage.setItem('structos-installed', 'true'); $$('.install-app-button').forEach((button) => { button.hidden = true; }); showToast('StructOS установлен ✓'); });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
