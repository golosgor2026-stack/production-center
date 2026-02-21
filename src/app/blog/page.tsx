"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Search, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";

// Полный список статей блога - 32 статьи, SEO-оптимизированные
const blogPosts = [
  // ИЗБРАННЫЕ
  {
    id: "1",
    slug: "organizatsiya-forumov-rossiya",
    title: "Организация форумов федерального уровня в России: полное руководство",
    excerpt: "Как организовать форум с участием первых лиц государства. Все этапы: от концепции до реализации. Требования к площадкам, безопасность, аккредитация СМИ.",
    category: "Статьи",
    author: "Евгений Усачев",
    date: "2024-06-20",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    featured: true,
    readTime: "15 мин",
    keywords: ["организация форумов", "форум Россия", "федеральные мероприятия"],
  },
  {
    id: "2",
    slug: "event-agency-moscow",
    title: "Как выбрать event-агентство в Москве: 10 критериев",
    excerpt: "Чек-лист для выбора надёжного event-агентства. На что обратить внимание: портфолио, кейсы, отзывы, сертификация, опыт работы с госзаказами.",
    category: "Статьи",
    author: "Светлана Бойченко",
    date: "2024-06-15",
    coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    featured: true,
    readTime: "10 мин",
    keywords: ["event агентство Москва", "выбрать event агентство", "event компания"],
  },
  {
    id: "3",
    slug: "korporativnye-meropriyatiya-2024",
    title: "Корпоративные мероприятия 2024: тренды и идеи",
    excerpt: "Главные тренды корпоративных событий: гибридные форматы, геймификация, sustainability. Примеры успешных реализаций от ведущих компаний.",
    category: "Статьи",
    author: "Анна Петрова",
    date: "2024-06-10",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    featured: true,
    readTime: "12 мин",
    keywords: ["корпоративные мероприятия", "корпоратив 2024", "тренды event"],
  },
  {
    id: "4",
    slug: "peterburgskiy-forum-2024",
    title: "Петербургский международный экономический форум 2024: итоги",
    excerpt: "Подводим результаты участия команды в ПМЭФ-2024. 50+ мероприятий за 4 дня, делегации из 140 стран. Опыт и выводы.",
    category: "Кейсы",
    author: "Евгений Усачев",
    date: "2024-06-08",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    featured: true,
    readTime: "8 мин",
    keywords: ["ПМЭФ 2024", "Петербургский форум", "экономический форум"],
  },
  
  // СТАТЬИ - SEO оптимизированные
  {
    id: "5",
    slug: "skolko-stoit-organizatsiya-meropriyatiya",
    title: "Сколько стоит организация мероприятия: цены 2024",
    excerpt: "Полный разбор бюджета на организацию мероприятий разных масштабов. От корпоратива на 100 человек до форума на 5000 участников. Примеры смет.",
    category: "Статьи",
    author: "Елена Козлова",
    date: "2024-06-05",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    readTime: "14 мин",
    keywords: ["стоимость организации мероприятия", "цена event", "бюджет мероприятия"],
  },
  {
    id: "6",
    slug: "tehnicheskoe-osnashchenie-meropriyatiy",
    title: "Техническое оснащение мероприятий: оборудование и требования",
    excerpt: "Полный гайд по техническому оборудованию: звук, свет, видео, сцена. Требования к площадкам, расчёт мощности, подбор подрядчиков.",
    category: "Статьи",
    author: "Михаил Сидоров",
    date: "2024-05-28",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    featured: false,
    readTime: "18 мин",
    keywords: ["техническое оснащение", "оборудование для мероприятий", "звук свет"],
  },
  {
    id: "7",
    slug: "sverochnaya-deyatelnost-forumov",
    title: "Сверочная деятельность на форумах: нормативные требования",
    excerpt: "Правовые аспекты организации форумов с участием должностных лиц. Сверочные мероприятия, согласования, требования ФСО.",
    category: "Статьи",
    author: "Евгений Усачев",
    date: "2024-05-25",
    coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    featured: false,
    readTime: "11 мин",
    keywords: ["сверочная деятельность", "требования к форумам", "ФСО"],
  },
  {
    id: "8",
    slug: "event-producer-obucheniye",
    title: "Как стать event-продюсером: обучение и карьера",
    excerpt: "Путь в профессию event-продюсера: образование, навыки, сертификация. Интервью с экспертами рынка, советы начинающим.",
    category: "Статьи",
    author: "Ирина Лысак",
    date: "2024-05-20",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: false,
    readTime: "9 мин",
    keywords: ["event продюсер", "обучение event", "карьера в event"],
  },
  {
    id: "9",
    slug: "zapusk-podkasta-kompanii",
    title: "Запуск корпоративного подкаста: пошаговое руководство",
    excerpt: "Как создать подкаст для компании: выбор формата, оборудование, площадка, продвижение. Кейсы успешных корпоративных подкастов.",
    category: "Статьи",
    author: "Анна Петрова",
    date: "2024-05-15",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80",
    featured: false,
    readTime: "13 мин",
    keywords: ["корпоративный подкаст", "запуск подкаста", "подкаст для бизнеса"],
  },
  {
    id: "10",
    slug: "bezopasnost-massovyh-meropriyatiy",
    title: "Обеспечение безопасности массовых мероприятий: требования 2024",
    excerpt: "Нормативные требования к безопасности мероприятий. Системы контроля доступа, эвакуация, взаимодействие с МВД и МЧС.",
    category: "Статьи",
    author: "Евгений Усачев",
    date: "2024-05-10",
    coverImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    featured: false,
    readTime: "16 мин",
    keywords: ["безопасность мероприятий", "требования безопасности", "массовые мероприятия"],
  },
  
  // КЕЙСЫ
  {
    id: "11",
    slug: "festival-50000-uchastnikov",
    title: "Организация фестиваля на 50 000 участников: кейс",
    excerpt: "Как мы организовали масштабный музыкальный фестиваль. Логистика, безопасность, техническое оснащение, работа с артистами.",
    category: "Кейсы",
    author: "Евгений Усачев",
    date: "2024-05-05",
    coverImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    featured: false,
    readTime: "15 мин",
    keywords: ["организация фестиваля", "массовое мероприятие", "фестиваль кейс"],
  },
  {
    id: "12",
    slug: "koncert-krasnaya-ploshchad",
    title: "Концерт на Красной площади: организация и согласования",
    excerpt: "Эксклюзивный взгляд на организацию концерта в сердце Москвы. Согласования, технические решения, работа с артистами мирового уровня.",
    category: "Кейсы",
    author: "Евгений Усачев",
    date: "2024-04-28",
    coverImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    featured: false,
    readTime: "12 мин",
    keywords: ["концерт Красная площадь", "организация концерта", "согласование мероприятия"],
  },
  {
    id: "13",
    slug: "goszakaz-event",
    title: "Госзаказ в event: как выиграть тендер",
    excerpt: "Особенности работы с государственными заказчиками. Подготовка документации, требования, типичные ошибки новичков.",
    category: "Статьи",
    author: "Светлана Бойченко",
    date: "2024-04-20",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    readTime: "11 мин",
    keywords: ["госзаказ event", "тендер мероприятие", "государственный заказ"],
  },
  {
    id: "14",
    slug: "video-production-corporate",
    title: "Съёмка корпоративного видео: 10 советов профессионалов",
    excerpt: "Рекомендации по производству корпоративного контента. Сценарий, локации, работа с непрофессиональными актёрами, постпродакшн.",
    category: "Статьи",
    author: "Михаил Сидоров",
    date: "2024-04-15",
    coverImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    featured: false,
    readTime: "10 мин",
    keywords: ["корпоративное видео", "съёмка видео", "видеопродакшн"],
  },
  {
    id: "15",
    slug: "national-center-russia",
    title: "Мероприятия в Национальном центре России: специфика",
    excerpt: "Особенности работы на главной площадке страны. Техническое оснащение, требования к подрядчикам, работа с VIP-гостями.",
    category: "Кейсы",
    author: "Евгений Усачев",
    date: "2024-04-10",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    featured: false,
    readTime: "9 мин",
    keywords: ["Национальный центр России", "площадка мероприятие", "конгресс-центр"],
  },
  {
    id: "16",
    slug: "b2b-forum-checklist",
    title: "Чек-лист: подготовка B2B-форума на 1000 участников",
    excerpt: "Полный список задач для организации делового форума. От выбора площадки до сбора обратной связи. Скачать PDF.",
    category: "Статьи",
    author: "Елена Козлова",
    date: "2024-04-05",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    readTime: "8 мин",
    keywords: ["B2B форум", "подготовка форума", "чек-лист мероприятие"],
  },
  
  // НОВОСТИ
  {
    id: "17",
    slug: "nagradnie-premii-event-2024",
    title: "Итоги Event-премии России 2024: лауреаты и тренды",
    excerpt: "Обзор церемонии награждения лучших представителей event-индустрии. Номинации, победители, прогнозы на следующий год.",
    category: "Новости",
    author: "Редакция",
    date: "2024-03-28",
    coverImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    featured: false,
    readTime: "6 мин",
    keywords: ["Event-премия", "награды event", "лучшая event компания"],
  },
  {
    id: "18",
    slug: "novye-chleny-komandy",
    title: "Команда пополняется: новые эксперты присоединились к центру",
    excerpt: "Расширяем компетенции в digital-маркетинге и B2B-направлениях. Знакомство с новыми членами команды.",
    category: "Новости",
    author: "Ирина Лысак",
    date: "2024-03-20",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    featured: false,
    readTime: "4 мин",
    keywords: ["команда", "вакансии event", "карьера"],
  },
  {
    id: "19",
    slug: "partnership-mincultury",
    title: "Партнёрство с Минкультуры: новые проекты",
    excerpt: "Подписано соглашение о сотрудничестве с Министерством культуры РФ. Планы на совместные проекты в 2024-2025 годах.",
    category: "Новости",
    author: "Редакция",
    date: "2024-03-15",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    readTime: "5 мин",
    keywords: ["Минкультуры", "партнёрство", "государственные проекты"],
  },
  
  // ЕЩЁ СТАТЬИ
  {
    id: "20",
    slug: "formaty-meropriyatiy",
    title: "Форматы мероприятий 2024: гибридные и онлайн-события",
    excerpt: "Обзор актуальных форматов: от классических офлайн до гибридных и полностью онлайн-мероприятий. Платформы, технологии, кейсы.",
    category: "Статьи",
    author: "Анна Петрова",
    date: "2024-03-10",
    coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    featured: false,
    readTime: "11 мин",
    keywords: ["форматы мероприятий", "гибридные мероприятия", "онлайн события"],
  },
  {
    id: "21",
    slug: "catering-meropriyatiya",
    title: "Кейтеринг для мероприятий: как выбрать и организовать",
    excerpt: "Всё о питании на мероприятиях: форматы, расчёт порций, диетические меню, работа с подрядчиками. Типичные ошибки.",
    category: "Статьи",
    author: "Елена Козлова",
    date: "2024-03-05",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    featured: false,
    readTime: "9 мин",
    keywords: ["кейтеринг", "питание на мероприятии", "банкет организация"],
  },
  {
    id: "22",
    slug: "event-marketing-strategies",
    title: "Event-маркетинг: стратегии продвижения мероприятий",
    excerpt: "Как привлечь участников на мероприятие. Digital-маркетинг, контент-стратегия, работа с СМИ, партнёрства.",
    category: "Статьи",
    author: "Светлана Бойченко",
    date: "2024-02-28",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    featured: false,
    readTime: "14 мин",
    keywords: ["event маркетинг", "продвижение мероприятия", "маркетинг событий"],
  },
  {
    id: "23",
    slug: "sponsorship-events",
    title: "Привлечение спонсоров на мероприятие: полное руководство",
    excerpt: "Как подготовить спонсорский пакет, найти партнёров, правильно оформить отношения. Примеры успешных коллабораций.",
    category: "Статьи",
    author: "Евгений Усачев",
    date: "2024-02-20",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    readTime: "13 мин",
    keywords: ["спонсоры мероприятия", "спонсорский пакет", "партнёрство"],
  },
  {
    id: "24",
    slug: "volunteers-management",
    title: "Организация работы волонтёров на крупных мероприятиях",
    excerpt: "Как набрать, обучить и координировать волонтёров. Мотивация, униформа, питание, поощрения. Опыт ПМЭФ и Олимпиады.",
    category: "Статьи",
    author: "Ирина Лысак",
    date: "2024-02-15",
    coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    featured: false,
    readTime: "10 мин",
    keywords: ["волонтёры", "волонтёры на мероприятии", "управление волонтёрами"],
  },
  {
    id: "25",
    slug: "media-coverage-events",
    title: "Медиа-покрытие мероприятий: работа со СМИ и блогерами",
    excerpt: "Как организовать аккредитацию, пресс-центр, работать с инфоповодами. Привлечение блогеров и инфлюенсеров.",
    category: "Статьи",
    author: "Анна Петрова",
    date: "2024-02-10",
    coverImage: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    featured: false,
    readTime: "11 мин",
    keywords: ["работа со СМИ", "медиа-покрытие", "аккредитация СМИ"],
  },
  {
    id: "26",
    slug: "outdoor-events",
    title: "Аутдор-мероприятия: особенности организации на открытом воздухе",
    excerpt: "Специфика open-air событий: погодные риски, инфраструктура, разрешения, безопасность. Кейсы фестивалей и концертов.",
    category: "Статьи",
    author: "Евгений Усачев",
    date: "2024-02-05",
    coverImage: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    featured: false,
    readTime: "12 мин",
    keywords: ["аутдор мероприятие", "open-air", "мероприятие на открытом воздухе"],
  },
  {
    id: "27",
    slug: "event-design-trends",
    title: "Event-дизайн 2024: тренды в оформлении мероприятий",
    excerpt: "Актуальные направления в визуальном оформлении: sustainability, технологии, иммерсивные форматы. Примеры и поставщики.",
    category: "Статьи",
    author: "Михаил Сидоров",
    date: "2024-01-28",
    coverImage: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80",
    featured: false,
    readTime: "9 мин",
    keywords: ["event дизайн", "оформление мероприятий", "декор мероприятия"],
  },
  {
    id: "28",
    slug: "registration-system",
    title: "Системы регистрации на мероприятия: сравнение платформ",
    excerpt: "Обзор популярных платформ для регистрации участников. Функционал, ценообразование, интеграции. Рекомендации по выбору.",
    category: "Статьи",
    author: "Елена Козлова",
    date: "2024-01-20",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    featured: false,
    readTime: "14 мин",
    keywords: ["регистрация на мероприятие", "билетная система", "платформа регистрации"],
  },
  {
    id: "29",
    slug: "year-results-2023",
    title: "Итоги 2023 года: рекордные показатели продюсерского центра",
    excerpt: "Подводим итоги года — 87 проектов, 12 новых клиентов, экспансия в 3 новых региона. Истории успеха и планы на будущее.",
    category: "Новости",
    author: "Евгений Усачев",
    date: "2023-12-28",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    featured: false,
    readTime: "7 мин",
    keywords: ["итоги года", "отчёт", "достижения"],
  },
  {
    id: "30",
    slug: "award-best-producer",
    title: "Евгений Усачев — «Лучший продюсер года» по версии Event-премии",
    excerpt: "Награждение в номинации «Лучший продюсер года». История успеха и планы на будущее.",
    category: "Новости",
    author: "Редакция",
    date: "2023-12-15",
    coverImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80",
    featured: false,
    readTime: "4 мин",
    keywords: ["награда", "лучший продюсер", "Event-премия"],
  },
  {
    id: "31",
    slug: "event-insurance",
    title: "Страхование мероприятий: какие риски нужно покрыть",
    excerpt: "Виды страхования для event-индустрии: ответственность перед третьими лицами, отмена мероприятия, погодные риски.",
    category: "Статьи",
    author: "Светлана Бойченко",
    date: "2023-12-10",
    coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    featured: false,
    readTime: "10 мин",
    keywords: ["страхование мероприятий", "риски event", "ответственность"],
  },
  {
    id: "32",
    slug: "international-events",
    title: "Международные мероприятия в России: правовые аспекты",
    excerpt: "Особенности организации мероприятий с иностранными участниками. Визы, аккредитация, валютное регулирование.",
    category: "Статьи",
    author: "Евгений Усачев",
    date: "2023-12-05",
    coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    featured: false,
    readTime: "15 мин",
    keywords: ["международные мероприятия", "иностранные участники", "визы"],
  },
];

const categories = ["Все", "Новости", "Статьи", "Кейсы"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Все" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Блог
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Экспертные статьи об организации мероприятий, кейсы и новости event-индустрии
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-gray-100 sticky top-20 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gray-900 hover:bg-gray-800" : "border-gray-200 text-gray-600"}
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Поиск статей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "Все" && !searchQuery && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Избранное</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                    <div className="relative aspect-video">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === "Все" ? "Все статьи" : selectedCategory}
          </h2>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Статьи не найдены</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <div className="relative aspect-video">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Хотите быть в курсе последних новостей?
          </h2>
          <p className="text-gray-400 mb-8">
            Подписывайтесь на наши обновления и получайте полезные материалы первыми
          </p>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl">
            Подписаться на рассылку
          </Button>
        </div>
      </section>
    </div>
  );
}
