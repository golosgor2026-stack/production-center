/**
 * SEO Keywords Database for Event Industry
 * База ключевых слов для SEO-оптимизации
 * 
 * Категории:
 * - HIGH: Высокочастотные (100-1000+ запросов в день)
 * - MEDIUM: Среднечастотные (10-100 запросов в день)
 * - LOW: Низкочастотные (1-10 запросов в день)
 */

export type KeywordFrequency = 'high' | 'medium' | 'low';

export interface SEOKeyword {
  keyword: string;
  frequency: KeywordFrequency;
  category: string;
  intent: 'informational' | 'commercial' | 'navigational';
  difficulty: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// ВЫСОКОЧАСТОТНЫЕ КЛЮЧЕВЫЕ СЛОВА (100 шт)
// ============================================================================
export const HIGH_FREQUENCY_KEYWORDS: SEOKeyword[] = [
  // Организация мероприятий - самые популярные
  { keyword: "организация мероприятий", frequency: "high", category: "general", intent: "commercial", difficulty: "hard" },
  { keyword: "ивент агентство", frequency: "high", category: "agency", intent: "commercial", difficulty: "hard" },
  { keyword: "event агентство москва", frequency: "high", category: "agency", intent: "commercial", difficulty: "hard" },
  { keyword: "организация корпоративов", frequency: "high", category: "corporate", intent: "commercial", difficulty: "hard" },
  { keyword: "корпоратив на новый год", frequency: "high", category: "corporate", intent: "commercial", difficulty: "hard" },
  { keyword: "тимбилдинг", frequency: "high", category: "corporate", intent: "commercial", difficulty: "hard" },
  { keyword: "организация конференций", frequency: "high", category: "business", intent: "commercial", difficulty: "hard" },
  { keyword: "форум мероприятие", frequency: "high", category: "business", intent: "commercial", difficulty: "medium" },
  { keyword: "продюсерский центр", frequency: "high", category: "agency", intent: "commercial", difficulty: "medium" },
  { keyword: "event компания", frequency: "high", category: "agency", intent: "commercial", difficulty: "hard" },
  
  // Концерты и шоу
  { keyword: "организация концертов", frequency: "high", category: "concerts", intent: "commercial", difficulty: "medium" },
  { keyword: "концерт под ключ", frequency: "high", category: "concerts", intent: "commercial", difficulty: "medium" },
  { keyword: "шоу программа", frequency: "high", category: "concerts", intent: "commercial", difficulty: "medium" },
  { keyword: "организация фестивалей", frequency: "high", category: "festivals", intent: "commercial", difficulty: "medium" },
  { keyword: "музыкальный фестиваль организация", frequency: "high", category: "festivals", intent: "commercial", difficulty: "medium" },
  
  // Бизнес-мероприятия
  { keyword: "деловое мероприятие", frequency: "high", category: "business", intent: "commercial", difficulty: "medium" },
  { keyword: "бизнес форум", frequency: "high", category: "business", intent: "commercial", difficulty: "medium" },
  { keyword: "b2b мероприятие", frequency: "high", category: "business", intent: "commercial", difficulty: "medium" },
  { keyword: "семинар организация", frequency: "high", category: "business", intent: "commercial", difficulty: "medium" },
  { keyword: "круглый стол организация", frequency: "high", category: "business", intent: "commercial", difficulty: "easy" },
  
  // Презентации и открытия
  { keyword: "презентация продукта", frequency: "high", category: "presentations", intent: "commercial", difficulty: "medium" },
  { keyword: "церемония открытия", frequency: "high", category: "presentations", intent: "commercial", difficulty: "medium" },
  { keyword: "гала ужин", frequency: "high", category: "presentations", intent: "commercial", difficulty: "medium" },
  
  // Юбилеи и праздники
  { keyword: "юбилей компании", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "medium" },
  { keyword: "организация праздников", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "hard" },
  { keyword: "корпоративный праздник", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "medium" },
  
  // Event услуги
  { keyword: "event услуги", frequency: "high", category: "services", intent: "commercial", difficulty: "medium" },
  { keyword: "организация событий", frequency: "high", category: "general", intent: "commercial", difficulty: "hard" },
  { keyword: "мероприятие под ключ", frequency: "high", category: "general", intent: "commercial", difficulty: "medium" },
  
  // Техническое оснащение
  { keyword: "техническое оснащение мероприятий", frequency: "high", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "звук и свет", frequency: "high", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "сценическое оборудование", frequency: "high", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "аренда звука", frequency: "high", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "световое оборудование", frequency: "high", category: "technical", intent: "commercial", difficulty: "medium" },
  
  // Ведущие и артисты
  { keyword: "ведущий на корпоратив", frequency: "high", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "ведущий мероприятие", frequency: "high", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "заказать артиста", frequency: "high", category: "personnel", intent: "commercial", difficulty: "medium" },
  
  // Локации
  { keyword: "площадка для мероприятия", frequency: "high", category: "venues", intent: "commercial", difficulty: "medium" },
  { keyword: "зал для конференции", frequency: "high", category: "venues", intent: "commercial", difficulty: "medium" },
  { keyword: "площадка для концерта", frequency: "high", category: "venues", intent: "commercial", difficulty: "medium" },
  
  // Кейтеринг
  { keyword: "кейтеринг мероприятие", frequency: "high", category: "catering", intent: "commercial", difficulty: "medium" },
  { keyword: "банкет организация", frequency: "high", category: "catering", intent: "commercial", difficulty: "medium" },
  { keyword: "фуршет мероприятие", frequency: "high", category: "catering", intent: "commercial", difficulty: "medium" },
  
  // Дополнительные высокочастотные
  { keyword: "event менеджер", frequency: "high", category: "personnel", intent: "informational", difficulty: "medium" },
  { keyword: "ивент менеджер", frequency: "high", category: "personnel", intent: "informational", difficulty: "medium" },
  { keyword: "event продюсер", frequency: "high", category: "personnel", intent: "informational", difficulty: "medium" },
  { keyword: "организатор мероприятий", frequency: "high", category: "personnel", intent: "informational", difficulty: "hard" },
  { keyword: "event агентство спб", frequency: "high", category: "agency", intent: "commercial", difficulty: "hard" },
  { keyword: "event агентство россия", frequency: "high", category: "agency", intent: "commercial", difficulty: "hard" },
  { keyword: "организация мероприятий москва", frequency: "high", category: "general", intent: "commercial", difficulty: "hard" },
  { keyword: "организация мероприятий спб", frequency: "high", category: "general", intent: "commercial", difficulty: "hard" },
  { keyword: "корпоратив москва", frequency: "high", category: "corporate", intent: "commercial", difficulty: "hard" },
  { keyword: "конференция москва", frequency: "high", category: "business", intent: "commercial", difficulty: "hard" },
  { keyword: "форум москва", frequency: "high", category: "business", intent: "commercial", difficulty: "medium" },
  { keyword: "как организовать мероприятие", frequency: "high", category: "general", intent: "informational", difficulty: "medium" },
  { keyword: "как организовать корпоратив", frequency: "high", category: "corporate", intent: "informational", difficulty: "medium" },
  { keyword: "сколько стоит мероприятие", frequency: "high", category: "general", intent: "informational", difficulty: "medium" },
  { keyword: "бюджет мероприятия", frequency: "high", category: "general", intent: "informational", difficulty: "medium" },
  { keyword: "декор мероприятия", frequency: "high", category: "design", intent: "commercial", difficulty: "medium" },
  { keyword: "оформление мероприятия", frequency: "high", category: "design", intent: "commercial", difficulty: "medium" },
  { keyword: "цветы на мероприятие", frequency: "high", category: "design", intent: "commercial", difficulty: "easy" },
  { keyword: "фотозона на мероприятие", frequency: "high", category: "design", intent: "commercial", difficulty: "medium" },
  { keyword: "фотограф на корпоратив", frequency: "high", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "видеосъемка мероприятия", frequency: "high", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "репортажная съемка", frequency: "high", category: "media", intent: "commercial", difficulty: "easy" },
  { keyword: "трансляция мероприятия", frequency: "high", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "онлайн трансляция конференции", frequency: "high", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "event маркетинг", frequency: "high", category: "marketing", intent: "informational", difficulty: "medium" },
  { keyword: "продвижение мероприятия", frequency: "high", category: "marketing", intent: "informational", difficulty: "medium" },
  { keyword: "анонс мероприятия", frequency: "high", category: "marketing", intent: "informational", difficulty: "easy" },
  { keyword: "безопасность мероприятий", frequency: "high", category: "security", intent: "informational", difficulty: "medium" },
  { keyword: "охрана мероприятия", frequency: "high", category: "security", intent: "commercial", difficulty: "medium" },
  { keyword: "контроль доступа мероприятие", frequency: "high", category: "security", intent: "commercial", difficulty: "medium" },
  { keyword: "регистрация участников", frequency: "high", category: "registration", intent: "commercial", difficulty: "medium" },
  { keyword: "билетная система", frequency: "high", category: "registration", intent: "commercial", difficulty: "medium" },
  { keyword: "qr код мероприятие", frequency: "high", category: "registration", intent: "commercial", difficulty: "easy" },
  { keyword: "event образование", frequency: "high", category: "education", intent: "informational", difficulty: "medium" },
  { keyword: "курсы event менеджера", frequency: "high", category: "education", intent: "informational", difficulty: "medium" },
  { keyword: "обучение event", frequency: "high", category: "education", intent: "informational", difficulty: "medium" },
  { keyword: "праздничное агентство", frequency: "high", category: "agency", intent: "commercial", difficulty: "medium" },
  { keyword: "свадебный распорядитель", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "medium" },
  { keyword: "организация свадьбы", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "hard" },
  { keyword: "день рождения организация", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "medium" },
  { keyword: "детский праздник", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "medium" },
  { keyword: "выпускной организация", frequency: "high", category: "celebrations", intent: "commercial", difficulty: "medium" },
  { keyword: "городской праздник", frequency: "high", category: "public", intent: "commercial", difficulty: "medium" },
  { keyword: "государственный праздник", frequency: "high", category: "public", intent: "commercial", difficulty: "medium" },
  { keyword: "народное гуляние", frequency: "high", category: "public", intent: "commercial", difficulty: "medium" },
  { keyword: "концерт на площади", frequency: "high", category: "public", intent: "commercial", difficulty: "medium" },
  { keyword: "спортивное мероприятие", frequency: "high", category: "sports", intent: "commercial", difficulty: "medium" },
  { keyword: "марафон организация", frequency: "high", category: "sports", intent: "commercial", difficulty: "medium" },
  { keyword: "автопробег организация", frequency: "high", category: "sports", intent: "commercial", difficulty: "medium" },
  { keyword: "велопробег", frequency: "high", category: "sports", intent: "commercial", difficulty: "easy" },
  { keyword: "экскурсия организация", frequency: "high", category: "tours", intent: "commercial", difficulty: "medium" },
  { keyword: "team building игры", frequency: "high", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "квест для компании", frequency: "high", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "веревочный курс", frequency: "high", category: "corporate", intent: "commercial", difficulty: "easy" },
  { keyword: "сплочение коллектива", frequency: "high", category: "corporate", intent: "informational", difficulty: "medium" },
  { keyword: "мотивация сотрудников", frequency: "high", category: "corporate", intent: "informational", difficulty: "medium" },
  { keyword: "интеграция сотрудников", frequency: "high", category: "corporate", intent: "informational", difficulty: "easy" },
];

// ============================================================================
// СРЕДНЕЧАСТОТНЫЕ КЛЮЧЕВЫЕ СЛОВА (100 шт)
// ============================================================================
export const MEDIUM_FREQUENCY_KEYWORDS: SEOKeyword[] = [
  // Федеральные и государственные мероприятия
  { keyword: "организация федеральных мероприятий", frequency: "medium", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "форум с участием первых лиц", frequency: "medium", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "президентский форум", frequency: "medium", category: "federal", intent: "informational", difficulty: "easy" },
  { keyword: "правительственное мероприятие", frequency: "medium", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "министерское совещание", frequency: "medium", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "государственный форум", frequency: "medium", category: "federal", intent: "informational", difficulty: "medium" },
  { keyword: "протокольное мероприятие", frequency: "medium", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "встреча на высшем уровне", frequency: "medium", category: "federal", intent: "informational", difficulty: "medium" },
  
  // Петербургский форум и ВЭФ
  { keyword: "петербургский форум организация", frequency: "medium", category: "major", intent: "informational", difficulty: "easy" },
  { keyword: "пмэф участие", frequency: "medium", category: "major", intent: "informational", difficulty: "easy" },
  { keyword: "восточный экономический форум", frequency: "medium", category: "major", intent: "informational", difficulty: "easy" },
  { keyword: "вэф организация", frequency: "medium", category: "major", intent: "informational", difficulty: "easy" },
  { keyword: "инвестиционный форум", frequency: "medium", category: "major", intent: "commercial", difficulty: "medium" },
  
  // Отраслевые мероприятия
  { keyword: "отраслевой форум", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "профессиональная конференция", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "деловая программа", frequency: "medium", category: "industry", intent: "informational", difficulty: "medium" },
  { keyword: "нетворкинг мероприятие", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "b2b конференция", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "дилерская конференция", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "партнерская конференция", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "клиентская конференция", frequency: "medium", category: "industry", intent: "commercial", difficulty: "medium" },
  
  // Образовательные мероприятия
  { keyword: "образовательный форум", frequency: "medium", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "молодежный форум", frequency: "medium", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "студенческий форум", frequency: "medium", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "научная конференция", frequency: "medium", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "лекция организация", frequency: "medium", category: "education", intent: "commercial", difficulty: "easy" },
  { keyword: "мастер класс организация", frequency: "medium", category: "education", intent: "commercial", difficulty: "easy" },
  { keyword: "воркшоп организация", frequency: "medium", category: "education", intent: "commercial", difficulty: "easy" },
  { keyword: "тренинг для компании", frequency: "medium", category: "education", intent: "commercial", difficulty: "medium" },
  
  // Медиапродакшн
  { keyword: "медиапродакшн мероприятие", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "корпоративное видео", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "рекламный ролик съемка", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "промо видео", frequency: "medium", category: "media", intent: "commercial", difficulty: "easy" },
  { keyword: "корпоративный фильм", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "документальный фильм", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "клип съемка", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  { keyword: "подкаст запись", frequency: "medium", category: "media", intent: "commercial", difficulty: "easy" },
  { keyword: "корпоративный подкаст", frequency: "medium", category: "media", intent: "commercial", difficulty: "medium" },
  
  // Специфические услуги
  { keyword: "экспертное сопровождение", frequency: "medium", category: "consulting", intent: "commercial", difficulty: "medium" },
  { keyword: "консалтинг мероприятий", frequency: "medium", category: "consulting", intent: "commercial", difficulty: "medium" },
  { keyword: "event консультации", frequency: "medium", category: "consulting", intent: "commercial", difficulty: "medium" },
  { keyword: "аудит мероприятия", frequency: "medium", category: "consulting", intent: "commercial", difficulty: "medium" },
  { keyword: "методическая поддержка", frequency: "medium", category: "consulting", intent: "commercial", difficulty: "medium" },
  
  // Гибридные и онлайн мероприятия
  { keyword: "гибридное мероприятие", frequency: "medium", category: "online", intent: "commercial", difficulty: "medium" },
  { keyword: "онлайн конференция", frequency: "medium", category: "online", intent: "commercial", difficulty: "medium" },
  { keyword: "вебинар организация", frequency: "medium", category: "online", intent: "commercial", difficulty: "easy" },
  { keyword: "zoom конференция", frequency: "medium", category: "online", intent: "commercial", difficulty: "easy" },
  { keyword: "дистанционное мероприятие", frequency: "medium", category: "online", intent: "commercial", difficulty: "medium" },
  
  // Технические детали
  { keyword: "синхронный перевод", frequency: "medium", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "переводческая будка", frequency: "medium", category: "technical", intent: "commercial", difficulty: "easy" },
  { keyword: "аудиосистема для конференции", frequency: "medium", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "видеостена аренда", frequency: "medium", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "светодиодный экран", frequency: "medium", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "проектор аренда", frequency: "medium", category: "technical", intent: "commercial", difficulty: "easy" },
  { keyword: "микрофон конференция", frequency: "medium", category: "technical", intent: "commercial", difficulty: "easy" },
  
  // Персонал
  { keyword: "волонтеры на мероприятие", frequency: "medium", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "хостес на мероприятие", frequency: "medium", category: "personnel", intent: "commercial", difficulty: "easy" },
  { keyword: "промоутеры на мероприятие", frequency: "medium", category: "personnel", intent: "commercial", difficulty: "easy" },
  { keyword: "координатор мероприятия", frequency: "medium", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "администратор мероприятия", frequency: "medium", category: "personnel", intent: "commercial", difficulty: "easy" },
  
  // Документация и согласования
  { keyword: "согласование мероприятия", frequency: "medium", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "разрешение на мероприятие", frequency: "medium", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "уведомление о мероприятии", frequency: "medium", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "аккредитация смм", frequency: "medium", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "паспорт мероприятия", frequency: "medium", category: "legal", intent: "informational", difficulty: "medium" },
  
  // Госзаказ
  { keyword: "госзаказ мероприятие", frequency: "medium", category: "tender", intent: "informational", difficulty: "medium" },
  { keyword: "тендер на мероприятие", frequency: "medium", category: "tender", intent: "informational", difficulty: "medium" },
  { keyword: "44 фз мероприятие", frequency: "medium", category: "tender", intent: "informational", difficulty: "medium" },
  { keyword: "223 фз мероприятие", frequency: "medium", category: "tender", intent: "informational", difficulty: "medium" },
  { keyword: "государственный контракт", frequency: "medium", category: "tender", intent: "informational", difficulty: "medium" },
  
  // Спонсорство
  { keyword: "спонсор мероприятия", frequency: "medium", category: "sponsorship", intent: "commercial", difficulty: "medium" },
  { keyword: "спонсорский пакет", frequency: "medium", category: "sponsorship", intent: "informational", difficulty: "medium" },
  { keyword: "генеральный партнер", frequency: "medium", category: "sponsorship", intent: "commercial", difficulty: "easy" },
  { keyword: "партнер конференции", frequency: "medium", category: "sponsorship", intent: "commercial", difficulty: "medium" },
  
  // Специфические форматы
  { keyword: "outdoor мероприятие", frequency: "medium", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: "open air организация", frequency: "medium", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: "аутдор ивент", frequency: "medium", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: " indoor мероприятие", frequency: "medium", category: "format", intent: "commercial", difficulty: "easy" },
  { keyword: "иммерсивное шоу", frequency: "medium", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: "интерактивное мероприятие", frequency: "medium", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: "геймификация мероприятия", frequency: "medium", category: "format", intent: "informational", difficulty: "medium" },
  
  // Безопасность
  { keyword: "антитеррор мероприятие", frequency: "medium", category: "security", intent: "informational", difficulty: "medium" },
  { keyword: "эвакуация мероприятие", frequency: "medium", category: "security", intent: "informational", difficulty: "medium" },
  { keyword: "план эвакуации", frequency: "medium", category: "security", intent: "informational", difficulty: "easy" },
  { keyword: "рамка металлодетектор", frequency: "medium", category: "security", intent: "commercial", difficulty: "easy" },
  
  // Дополнительные
  { keyword: "трансфер мероприятие", frequency: "medium", category: "logistics", intent: "commercial", difficulty: "easy" },
  { keyword: "логистика участников", frequency: "medium", category: "logistics", intent: "commercial", difficulty: "medium" },
  { keyword: "рассадка гостей", frequency: "medium", category: "logistics", intent: "commercial", difficulty: "easy" },
  { keyword: "бейдж участника", frequency: "medium", category: "registration", intent: "commercial", difficulty: "easy" },
  { keyword: "пакет участника", frequency: "medium", category: "registration", intent: "commercial", difficulty: "easy" },
  { keyword: "сувениры для участников", frequency: "medium", category: "merch", intent: "commercial", difficulty: "easy" },
  { keyword: "мерч для мероприятия", frequency: "medium", category: "merch", intent: "commercial", difficulty: "easy" },
];

// ============================================================================
// НИЗКОЧАСТОТНЫЕ КЛЮЧЕВЫЕ СЛОВА (100 шт)
// ============================================================================
export const LOW_FREQUENCY_KEYWORDS: SEOKeyword[] = [
  // Узкоспециализированные форматы
  { keyword: "форум с участием губернатора", frequency: "low", category: "federal", intent: "commercial", difficulty: "easy" },
  { keyword: "мероприятие с фсо", frequency: "low", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "сверочная деятельность форум", frequency: "low", category: "federal", intent: "informational", difficulty: "easy" },
  { keyword: "протокол мероприятия президент", frequency: "low", category: "federal", intent: "informational", difficulty: "medium" },
  { keyword: "меры безопасности визит президента", frequency: "low", category: "federal", intent: "informational", difficulty: "easy" },
  { keyword: "аккредитация фсо", frequency: "low", category: "federal", intent: "informational", difficulty: "medium" },
  { keyword: "подготовка визита делегации", frequency: "low", category: "federal", intent: "commercial", difficulty: "medium" },
  { keyword: "прием иностранных делегаций", frequency: "low", category: "federal", intent: "commercial", difficulty: "medium" },
  
  // Специфические площадки
  { keyword: "мероприятие в национальном центре", frequency: "low", category: "venues", intent: "commercial", difficulty: "medium" },
  { keyword: "мероприятие в кремле", frequency: "low", category: "venues", intent: "commercial", difficulty: "hard" },
  { keyword: "концерт на красной площади", frequency: "low", category: "venues", intent: "commercial", difficulty: "hard" },
  { keyword: "мероприятие в государственной думе", frequency: "low", category: "venues", intent: "commercial", difficulty: "hard" },
  { keyword: "форум в экспоцентре", frequency: "low", category: "venues", intent: "commercial", difficulty: "medium" },
  { keyword: "конференция в крокус сити", frequency: "low", category: "venues", intent: "commercial", difficulty: "medium" },
  { keyword: "мероприятие в гостином дворе", frequency: "low", category: "venues", intent: "commercial", difficulty: "medium" },
  
  // Узкие ниши
  { keyword: "агропромышленный форум", frequency: "low", category: "industry", intent: "commercial", difficulty: "easy" },
  { keyword: "нефтегазовая конференция", frequency: "low", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "фармацевтический форум", frequency: "low", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "it форум организация", frequency: "low", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "финансовая конференция", frequency: "low", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "банковский форум", frequency: "low", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "строительная конференция", frequency: "low", category: "industry", intent: "commercial", difficulty: "medium" },
  { keyword: "транспортный форум", frequency: "low", category: "industry", intent: "commercial", difficulty: "easy" },
  
  // Образовательные детали
  { keyword: "форум руководителей", frequency: "low", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "конференция директоров", frequency: "low", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "форум ректоров вузов", frequency: "low", category: "education", intent: "informational", difficulty: "easy" },
  { keyword: "педагогическая конференция", frequency: "low", category: "education", intent: "commercial", difficulty: "easy" },
  { keyword: "форум молодых лидеров", frequency: "low", category: "education", intent: "commercial", difficulty: "medium" },
  { keyword: "форум россии страна возможностей", frequency: "low", category: "education", intent: "informational", difficulty: "easy" },
  
  // Редкие форматы
  { keyword: "инклюзивное мероприятие", frequency: "low", category: "format", intent: "commercial", difficulty: "easy" },
  { keyword: "эко мероприятие", frequency: "low", category: "format", intent: "commercial", difficulty: "easy" },
  { keyword: "sustainability конференция", frequency: "low", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: "esg форум", frequency: "low", category: "format", intent: "commercial", difficulty: "medium" },
  { keyword: "carbon neutral мероприятие", frequency: "low", category: "format", intent: "informational", difficulty: "easy" },
  { keyword: "безбумажная конференция", frequency: "low", category: "format", intent: "informational", difficulty: "easy" },
  
  // Технические детали
  { keyword: "риговая конструкция", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "линейный массив звук", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "мощность звука для зала", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "расчет освещения мероприятия", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "схема расстановки оборудования", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "план площадки мероприятия", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  
  // Юридические аспекты
  { keyword: "договор с event агентством", frequency: "low", category: "legal", intent: "informational", difficulty: "easy" },
  { keyword: "страховка мероприятия", frequency: "low", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "страхование гражданской ответственности", frequency: "low", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "юридические риски мероприятия", frequency: "low", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "отмена мероприятия юридические", frequency: "low", category: "legal", intent: "informational", difficulty: "medium" },
  { keyword: "форс мажор мероприятие", frequency: "low", category: "legal", intent: "informational", difficulty: "easy" },
  
  // Бюджетирование
  { keyword: "смета мероприятия образец", frequency: "low", category: "budget", intent: "informational", difficulty: "easy" },
  { keyword: "калькуляция расходов мероприятие", frequency: "low", category: "budget", intent: "informational", difficulty: "easy" },
  { keyword: "оптимизация бюджета мероприятия", frequency: "low", category: "budget", intent: "informational", difficulty: "medium" },
  { keyword: "скрытые расходы мероприятия", frequency: "low", category: "budget", intent: "informational", difficulty: "medium" },
  { keyword: "резервный фонд мероприятия", frequency: "low", category: "budget", intent: "informational", difficulty: "easy" },
  
  // Узкие темы
  { keyword: "вайфу для конференции", frequency: "low", category: "technical", intent: "commercial", difficulty: "easy" },
  { keyword: "мобильное приложение конференции", frequency: "low", category: "technical", intent: "commercial", difficulty: "medium" },
  { keyword: "навигация на мероприятии", frequency: "low", category: "logistics", intent: "commercial", difficulty: "easy" },
  { keyword: "указатели для мероприятия", frequency: "low", category: "logistics", intent: "commercial", difficulty: "easy" },
  { keyword: "распечатка материалов", frequency: "low", category: "logistics", intent: "commercial", difficulty: "easy" },
  { keyword: "печатная продукция форум", frequency: "low", category: "logistics", intent: "commercial", difficulty: "easy" },
  
  // Персонал узкий
  { keyword: "переводчик на форум", frequency: "low", category: "personnel", intent: "commercial", difficulty: "easy" },
  { keyword: "синхронный переводчик", frequency: "low", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "звукооператор на мероприятие", frequency: "low", category: "personnel", intent: "commercial", difficulty: "easy" },
  { keyword: "светооператор на концерт", frequency: "low", category: "personnel", intent: "commercial", difficulty: "easy" },
  { keyword: "оператор камеры мероприятие", frequency: "low", category: "personnel", intent: "commercial", difficulty: "easy" },
  { keyword: "диджей на корпоратив", frequency: "low", category: "personnel", intent: "commercial", difficulty: "easy" },
  
  // Тренды
  { keyword: "тренды event индустрии 2024", frequency: "low", category: "trends", intent: "informational", difficulty: "medium" },
  { keyword: "тенденции event маркетинга", frequency: "low", category: "trends", intent: "informational", difficulty: "medium" },
  { keyword: "инновации в мероприятиях", frequency: "low", category: "trends", intent: "informational", difficulty: "medium" },
  { keyword: "ai в event", frequency: "low", category: "trends", intent: "informational", difficulty: "medium" },
  { keyword: "vr на мероприятии", frequency: "low", category: "trends", intent: "commercial", difficulty: "medium" },
  { keyword: "ar на конференции", frequency: "low", category: "trends", intent: "commercial", difficulty: "medium" },
  { keyword: "метавселенная мероприятие", frequency: "low", category: "trends", intent: "informational", difficulty: "medium" },
  
  // Рейтинги и награды
  { keyword: "event премия россии", frequency: "low", category: "awards", intent: "informational", difficulty: "easy" },
  { keyword: "лучшее event агентство", frequency: "low", category: "awards", intent: "informational", difficulty: "medium" },
  { keyword: "рейтинг event компаний", frequency: "low", category: "awards", intent: "informational", difficulty: "medium" },
  { keyword: "конкурс event проектов", frequency: "low", category: "awards", intent: "informational", difficulty: "easy" },
  { keyword: "награда за мероприятие", frequency: "low", category: "awards", intent: "informational", difficulty: "easy" },
  
  // Документация
  { keyword: "техническое задание мероприятие", frequency: "low", category: "docs", intent: "informational", difficulty: "easy" },
  { keyword: "бриф на организацию мероприятия", frequency: "low", category: "docs", intent: "informational", difficulty: "easy" },
  { keyword: "отчет о мероприятии образец", frequency: "low", category: "docs", intent: "informational", difficulty: "easy" },
  { keyword: "пост релиз мероприятия", frequency: "low", category: "docs", intent: "informational", difficulty: "easy" },
  { keyword: "пресс релиз форума", frequency: "low", category: "docs", intent: "informational", difficulty: "medium" },
  { keyword: "медиа кит мероприятия", frequency: "low", category: "docs", intent: "informational", difficulty: "easy" },
  
  // Дополнительные
  { keyword: "встреча акционеров", frequency: "low", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "годовое собрание акционеров", frequency: "low", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "заседание совета директоров", frequency: "low", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "стратегическая сессия", frequency: "low", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "стратсессия организация", frequency: "low", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "брейншторм организация", frequency: "low", category: "corporate", intent: "commercial", difficulty: "easy" },
  { keyword: "фасилитация сессии", frequency: "low", category: "corporate", intent: "commercial", difficulty: "medium" },
  { keyword: "модератор конференции", frequency: "low", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "спикер на конференцию", frequency: "low", category: "personnel", intent: "commercial", difficulty: "medium" },
  { keyword: "райдер артиста", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "технический райдер", frequency: "low", category: "technical", intent: "informational", difficulty: "easy" },
  { keyword: "бытовое обслуживание артистов", frequency: "low", category: "logistics", intent: "commercial", difficulty: "easy" },
];

// ============================================================================
// ЭКСПОРТ ВСЕХ КЛЮЧЕЙ
// ============================================================================
export const ALL_KEYWORDS: SEOKeyword[] = [
  ...HIGH_FREQUENCY_KEYWORDS,
  ...MEDIUM_FREQUENCY_KEYWORDS,
  ...LOW_FREQUENCY_KEYWORDS,
];

// Функция для получения случайного ключевого слова
export function getRandomKeyword(frequency?: KeywordFrequency): SEOKeyword {
  if (frequency === 'high') {
    return HIGH_FREQUENCY_KEYWORDS[Math.floor(Math.random() * HIGH_FREQUENCY_KEYWORDS.length)];
  }
  if (frequency === 'medium') {
    return MEDIUM_FREQUENCY_KEYWORDS[Math.floor(Math.random() * MEDIUM_FREQUENCY_KEYWORDS.length)];
  }
  if (frequency === 'low') {
    return LOW_FREQUENCY_KEYWORDS[Math.floor(Math.random() * LOW_FREQUENCY_KEYWORDS.length)];
  }
  return ALL_KEYWORDS[Math.floor(Math.random() * ALL_KEYWORDS.length)];
}

// Функция для получения ключевых слов по категории
export function getKeywordsByCategory(category: string): SEOKeyword[] {
  return ALL_KEYWORDS.filter(k => k.category === category);
}

// Функция для получения случайного набора ключевых слов для статьи
export function getKeywordsForArticle(count: number = 5): SEOKeyword[] {
  const shuffled = [...ALL_KEYWORDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
