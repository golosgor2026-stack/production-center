"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import PhotoGallery from "@/components/PhotoGallery";
import { CheckCircle, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";

const competencies = [
  "Разработка концепций масштабных фестивалей",
  "Работа с сообществами и целевыми аудиториями",
  "Организация интерактивных зон и активностей",
  "Координация работы сотен волонтеров",
  "Интеграция грантовых и социальных программ",
  "Партнерство с региональными администрациями",
  "Экологические и социальные инициативы",
  "Медиапродвижение и работа с блогерами",
];

const galleryImages = [
  { id: "1", url: "/gallery/festival-1.jpg", caption: "Главный вход" },
  { id: "2", url: "/gallery/festival-2.jpg", caption: "Зона активностей" },
  { id: "3", url: "/gallery/festival-3.jpg", caption: "Главная сцена" },
  { id: "4", url: "/gallery/festival-4.jpg", caption: "Гости фестиваля" },
  { id: "5", url: "/gallery/festival-5.jpg", caption: "Фудкорт" },
  { id: "6", url: "/gallery/festival-6.jpg", caption: "Вечерняя программа" },
];

export default function FestivalsPage() {
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
            Фестивали и социальные проекты
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">
            Массовые культурные и социальные проекты, объединяющие тысячи участников 
            и создающие новые традиции для сообществ.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-6">
                События, объединяющие людей
              </h2>
              <div className="prose prose-lg text-[#6B7280]">
                <p className="mb-4">
                  Мы создаем фестивали, которые становятся точками притяжения для 
                  тысяч людей. Каждый проект — это не просто мероприятие, а платформа 
                  для общения, творчества и развития сообществ.
                </p>
                <p className="mb-4">
                  Особое внимание уделяем социальным инициативам: экологическим 
                  акциям, благотворительным программам, проектам для людей с 
                  ограниченными возможностями.
                </p>
                <p>
                  Наши фестивали получают поддержку государственных фондов и 
                  становятся примерами успешных социальных проектов.
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
                <p className="text-white text-sm">Смотреть видео о фестивалях</p>
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
              в организации вашего фестиваля или социального проекта.
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
          source="festivals"
        />
      )}
    </div>
  );
}
