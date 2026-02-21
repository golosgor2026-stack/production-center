"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { 
  ArrowLeft, 
  Video, 
  Film, 
  Mic, 
  Play, 
  ArrowRight,
  CheckCircle,
  Camera,
  Clapperboard,
} from "lucide-react";

const services = [
  {
    icon: <Video className="w-8 h-8" />,
    title: "Рекламные ролики",
    description: "Производство рекламных видеороликов для ТВ и digital-платформ. От идеи до готового продукта.",
    features: ["Сценарий и сториборд", "Подбор локаций", "Кастинг актёров", "Цветокоррекция"],
  },
  {
    icon: <Film className="w-8 h-8" />,
    title: "Корпоративные фильмы",
    description: "Имиджевые и документальные фильмы о компании для инвесторов и партнёров.",
    features: ["Интервью", "Аэросъёмка", "Анимация", "Озвучивание"],
  },
  {
    icon: <Clapperboard className="w-8 h-8" />,
    title: "Музыкальные клипы",
    description: "Производство музыкальных клипов для артистов с креативными концепциями.",
    features: ["Креатив", "Постановка", "VFX эффекты", "Стилизация"],
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Подкасты",
    description: "Полный цикл производства подкастов от записи до дистрибуции.",
    features: ["Студийная запись", "Удалённые интервью", "Монтаж", "Дизайн обложек"],
  },
];

const portfolio = [
  { title: "Рекламный ролик «Год культурного наследия»", type: "Реклама", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&q=80" },
  { title: "Имиджевый фильм для Минкультуры РФ", type: "Фильм", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80" },
  { title: "Клип «Ритмы России»", type: "Клип", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80" },
  { title: "Подкаст «За кулисами событий»", type: "Подкаст", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80" },
];

export default function MediaPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&q=80"
            alt="Медиапродакшн"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Link>
          
          <div className="max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full border border-white/20 mb-6">
              <Play className="w-4 h-4 text-white" />
              <span className="text-white/90 text-sm font-medium">Медиапродакшн</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Снимаем истории,<br />
              <span className="text-gray-300">которые запоминаются</span>
            </h1>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl">
              Производство рекламных роликов, корпоративных фильмов, музыкальных клипов и подкастов. 
              Полный цикл от идеи до готового продукта.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl"
              >
                Обсудить проект
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">Услуги</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Что мы создаём</h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-gray-500 font-semibold mb-3 uppercase tracking-wider text-sm">Портфолио</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Наши работы</h2>
            <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolio.map((item, index) => (
              <div 
                key={index}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700">
                    {item.type}
                  </span>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-900 ml-1" />
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Camera className="w-8 h-8 text-gray-900" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Готовы обсудить ваш проект?
          </h2>
          <p className="text-gray-400 mb-8">
            Расскажите о вашей задаче, и мы предложим оптимальное решение
          </p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-7 text-lg rounded-xl"
          >
            Оставить заявку
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {showForm && <ContactForm onClose={() => setShowForm(false)} source="media" />}
    </div>
  );
}
