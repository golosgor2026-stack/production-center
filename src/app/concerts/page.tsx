"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import PhotoGallery from "@/components/PhotoGallery";
import { CheckCircle, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";

const competencies = [
  "Работа со звездами эстрады и театра",
  "Разработка сценографии и декораций",
  "Световое и звуковое оборудование премиум-класса",
  "Спецэффекты и пиротехника",
  "Координация гастрольных графиков",
  "Безопасность на массовых мероприятиях",
  "Трансляция и онлайн-вещание",
  "Мерчандайзинг и билетные системы",
];

const galleryImages = [
  { id: "1", url: "/gallery/concert-1.jpg", caption: "Сценическая площадка" },
  { id: "2", url: "/gallery/concert-2.jpg", caption: "Световое шоу" },
  { id: "3", url: "/gallery/concert-3.jpg", caption: "Выступление артиста" },
  { id: "4", url: "/gallery/concert-4.jpg", caption: "Зрительный зал" },
  { id: "5", url: "/gallery/concert-5.jpg", caption: "За кулисами" },
  { id: "6", url: "/gallery/concert-6.jpg", caption: "Финал концерта" },
];

export default function ConcertsPage() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F5F7FA] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#6B7280] hover:text-[#9A2A2A] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1E24] mb-4">
            Концерты и шоу-программы
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">
            Яркие концертные программы и шоу с участием звезд эстрады, 
            театрализованными постановками и масштабными декорациями.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-6">
                Зрелища, которые запоминаются навсегда
              </h2>
              <div className="prose prose-lg text-[#6B7280]">
                <p className="mb-4">
                  Мы создаем концерты и шоу, которые остаются в памяти зрителей 
                  надолго. От камерных вечеров до стадионных шоу — каждое 
                  мероприятие уникально и неповторимо.
                </p>
                <p className="mb-4">
                  Собственная производственная база позволяет нам реализовывать 
                  самые смелые сценарные решения: сложные сценографии, 
                  мультимедийные инсталляции, пиротехнические эффекты.
                </p>
                <p>
                  Работаем с ведущими артистами страны и обеспечиваем 
                  полный цикл продакшена — от идеи до финального аккорда.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1A1E24] mb-6">
                Ключевые компетенции
              </h3>
              <ul className="space-y-3">
                {competencies.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#9A2A2A] mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[#2C3E50]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Video */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-6">
              Видео о проектах
            </h2>
            <div className="relative aspect-video bg-[#1A1E24] rounded-2xl overflow-hidden cursor-pointer group">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#9A2A2A]/30 to-transparent">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#9A2A2A] ml-1" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-end p-6">
                <p className="text-white text-sm">Смотреть видео о концертах</p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-6">
              Фотогалерея
            </h2>
            <PhotoGallery images={galleryImages} columns={3} />
          </div>

          {/* CTA */}
          <div className="bg-[#F5F7FA] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-4">
              Готовы обсудить ваш проект?
            </h2>
            <p className="text-[#6B7280] mb-8 max-w-xl mx-auto">
              Свяжитесь с нами, чтобы узнать, как мы можем помочь 
              в организации вашего концерта или шоу-программы.
            </p>
            <Button
              onClick={() => setShowContactForm(true)}
              className="bg-[#9A2A2A] hover:bg-[#7A2222] text-white px-8 py-6 text-lg"
            >
              Обсудить проект
            </Button>
          </div>
        </div>
      </section>

      {showContactForm && (
        <ContactForm
          onClose={() => setShowContactForm(false)}
          source="concerts"
        />
      )}
    </div>
  );
}
