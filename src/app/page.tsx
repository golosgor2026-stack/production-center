"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import {
  Building2,
  Users,
  Music,
  Star,
  Lightbulb,
  Coffee,
  ArrowRight,
  Play,
  Trophy,
  Medal,
  Calendar,
  ChevronRight,
} from "lucide-react";

// Направления с изображениями
const expertiseData = [
  {
    title: "Федеральные мероприятия",
    description: "Организация крупномасштабных мероприятий с участием первых лиц государства.",
    href: "/federal",
    icon: <Building2 className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  },
  {
    title: "B2B-события и форумы",
    description: "Профессиональные деловые мероприятия с продуманной программой.",
    href: "/b2b",
    icon: <Users className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
  },
  {
    title: "Фестивали и проекты",
    description: "Массовые культурные проекты, объединяющие тысячи участников.",
    href: "/festivals",
    icon: <Star className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
  },
  {
    title: "Концерты и шоу",
    description: "Яркие концертные программы с масштабными декорациями.",
    href: "/concerts",
    icon: <Music className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
  },
  {
    title: "Экспертное сопровождение",
    description: "Консалтинг и методическая поддержка организаторов.",
    href: "/expert",
    icon: <Lightbulb className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    title: "Медиапродакшн",
    description: "Съёмка рекламных роликов, фильмов, клипов и подкастов профессионального уровня.",
    href: "/media",
    icon: <Play className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80",
  },
];

// Достижения для 3D галереи
const achievementsData = [
  { title: "Петербургский форум", year: "2024", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80", type: "event" },
  { title: "Благодарность Минкультуры", year: "2024", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&q=80", type: "letter" },
  { title: "Форум «Россия»", year: "2024", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80", type: "event" },
  { title: "Премия «Лучший продюсер»", year: "2023", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80", type: "award" },
  { title: "Фестиваль «Золотая Маска»", year: "2023", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80", type: "event" },
  { title: "Концерт на Красной площади", year: "2023", image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80", type: "event" },
  { title: "Благодарность Президента", year: "2022", image: "https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=400&q=80", type: "letter" },
  { title: "ВЭФ-2022", year: "2022", image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&q=80", type: "event" },
];

// Статистика
const stats = [
  { value: "50+", label: "проектов" },
  { value: "15", label: "лет опыта" },
  { value: "50+", label: "регионов" },
  { value: "50K", label: "участников" },
];

// Последние новости
const latestNews = [
  {
    id: 1,
    title: "Петербургский международный экономический форум 2024",
    excerpt: "Успешная организация ключевых мероприятий форума с участием делегаций из 140 стран.",
    date: "15 июня 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
    slug: "spb-forum-2024",
  },
  {
    id: 2,
    title: "Новый проект: Форум «Россия — страна возможностей»",
    excerpt: "Запущен масштабный образовательный форум для молодёжных лидеров со всей страны.",
    date: "28 мая 2024",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&q=80",
    slug: "russia-forum-2024",
  },
  {
    id: 3,
    title: "Благодарность от Министерства культуры РФ",
    excerpt: "Продюсерский центр получил официальную благодарность за вклад в развитие культуры.",
    date: "10 мая 2024",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&q=80",
    slug: "thanks-minculture-2024",
  },
];

// Компонент 3D вращающейся галереи
function Gallery3D() {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setRotation((prev) => prev + 0.3);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const radius = 280;
  const items = achievementsData;

  return (
    <div 
      className="relative w-full h-[500px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute w-32 h-32 bg-gradient-to-br from-gray-200/40 to-transparent rounded-full blur-3xl" />
      
      <div 
        className="relative w-full h-full"
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: isHovered ? 'transform 0.1s linear' : 'none',
          }}
        >
          {items.map((item, index) => {
            const angle = (index / items.length) * 360;
            const radian = (angle * Math.PI) / 180;
            const x = Math.sin(radian) * radius;
            const z = Math.cos(radian) * radius;
            
            return (
              <div
                key={index}
                className="absolute w-36 h-48 cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg)`,
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="relative w-full h-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute top-2 right-2">
                    {item.type === 'award' && (
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {item.type === 'letter' && (
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <Medal className="w-4 h-4 text-gray-700" />
                      </div>
                    )}
                    {item.type === 'event' && (
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white/70 text-xs">{item.year}</p>
                    <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm flex items-center gap-2">
        <span className="animate-pulse w-2 h-2 bg-gray-400 rounded-full" />
        Наведите для паузы
      </div>
    </div>
  );
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {/* Hero - Полнокрановое изображение */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/hero-bg.jpg"
            alt="Продюсерский центр Евгения Усачева"
            fill
            className="object-cover animate-kenburns"
            priority
            quality={95}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>

        {/* Контент - по центру экрана */}
        <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            {/* Бейдж */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/80 font-medium tracking-wider uppercase">Федеральный уровень</span>
            </div>

            {/* Заголовок */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-tight mb-8" style={{ fontFamily: "var(--font-jost), 'Jost', 'Futura', system-ui, sans-serif", letterSpacing: "0.02em" }}>
              <span className="font-medium bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                Продюсерский центр Евгения Усачева
              </span>
            </h1>

            {/* Подзаголовок */}
            <p className="text-xl sm:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Создаём события федерального уровня. Форумы, фестивали, концерты — от концепции до реализации.
            </p>

            {/* Кнопки */}
            <div className="flex flex-wrap justify-center gap-5 mb-14">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-7 text-lg rounded-2xl font-medium shadow-2xl"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Обсудить проект
              </Button>
              <Button
                className="px-10 py-7 text-lg rounded-2xl border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900 font-medium shadow-lg transition-all duration-300"
                asChild
              >
                <Link href="#expertise">
                  Наши услуги
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Статистика */}
            <div className="flex justify-center gap-12 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Блок новостей */}
      <section className="py-16 lg:py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">Новости</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Последние события
              </h2>
            </div>
            <Link 
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Все новости
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map((news, index) => (
              <Link 
                key={news.id}
                href={`/blog/${news.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-medium text-gray-700">
                      {news.date}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {news.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Видео промоушен */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">О нас</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Как мы работаем
            </h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
              Мы проектируем события, которые определяют повестку. Полный цикл продюсирования: от государственной стратегии до технического совершенства.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group">
                  <Play className="w-8 h-8 text-gray-900 ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              <div className="absolute top-4 left-4 text-white/60 text-sm">Премьера 2024</div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white/80 text-lg">Смотрите видео о продюсерском центре</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Сферы экспертизы */}
      <section id="expertise" className="py-20 lg:py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">Услуги</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Сферы экспертизы
            </h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {expertiseData.map((item, index) => (
              <Link 
                key={item.title} 
                href={item.href}
                className="group"
              >
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-gray-700">
                      {item.icon}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      Подробнее
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">Люди</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Наша команда
            </h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом в организации мероприятий федерального уровня
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Евгений Усачев", role: "Основатель, Генеральный продюсер", image: "/hero-portrait.jpg" },
              { name: "Анна Петрова", role: "Директор по развитию", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
              { name: "Михаил Сидоров", role: "Арт-директор", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
              { name: "Елена Козлова", role: "Руководитель проектов", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
            ].map((member, index) => (
              <div 
                key={index}
                className="group bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-white shadow-lg group-hover:ring-gray-200 transition-all">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-sm text-gray-500 text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши достижения - 3D галерея */}
      <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">Портфолио</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Наши достижения
            </h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мероприятия федерального уровня, награды и благодарственные письма от партнёров
            </p>
          </div>

          <Gallery3D />

          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <Trophy className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-600">Награды</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                <Medal className="w-3 h-3 text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">Благодарности</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm text-gray-600">Мероприятия</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ секция */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {[
              { q: "Какие услуги вы предоставляете?", a: "Мы специализируемся на организации мероприятий федерального уровня: форумы, фестивали, концерты, B2B-события, а также предоставляем экспертное сопровождение и медиапродакшн полного цикла." },
              { q: "В каких регионах вы работаете?", a: "Мы работаем по всей России — от Калининграда до Владивостока. Наш опыт включает проекты в более чем 50 регионах страны." },
              { q: "Сколько стоит организация мероприятия?", a: "Стоимость зависит от масштаба, формата и специфики проекта. Мы разрабатываем индивидуальное коммерческое предложение после обсуждения ваших задач и целей." },
              { q: "Какие сроки организации мероприятия?", a: "Сроки зависят от сложности проекта. Крупные форумы требуют 3-6 месяцев подготовки, концерты и фестивали — 1-3 месяца. Возможно срочное выполнение в сокращённые сроки." },
              { q: "Работаете ли вы с государственными заказчиками?", a: "Да, мы имеем большой опыт работы с государственными структурами, министерствами и ведомствами. Все необходимые документы и сертификаты в наличии." },
              { q: "Как подать заявку на сотрудничество?", a: "Заполните форму на сайте или напишите нам на email. Мы свяжемся с вами в течение 24 часов для обсуждения деталей." },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 pattern-grid opacity-10" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Coffee className="w-10 h-10 text-gray-800" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Обсудим ваш проект?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            Приглашаем на кофе-брейк. Расскажем о возможностях, поделимся кейсами и наметим план действий.
          </p>

          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-7 text-lg rounded-2xl shadow-xl"
          >
            Оставить заявку
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {showForm && <ContactForm onClose={() => setShowForm(false)} />}
    </>
  );
}
