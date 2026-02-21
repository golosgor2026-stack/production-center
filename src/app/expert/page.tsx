"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { CheckCircle, ArrowLeft, BookOpen, Users, Settings, FileText } from "lucide-react";
import Link from "next/link";

const competencies = [
  "Аудит существующих event-процессов",
  "Разработка стандартов и регламентов",
  "Обучение команд организаторов",
  "Методическая поддержка мероприятий",
  "Консалтинг по работе с подрядчиками",
  "Разработка тендерной документации",
  "Экспертиза бюджетов и смет",
  "Кризис-менеджмент и антикризисные меры",
];

const services = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Обучение",
    description: "Корпоративные тренинги и мастер-классы для команд организаторов мероприятий",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Консалтинг",
    description: "Экспертное сопровождение проектов на всех этапах реализации",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Аудит",
    description: "Анализ текущих процессов и рекомендации по оптимизации",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Документация",
    description: "Разработка стандартов, регламентов и чек-листов",
  },
];

export default function ExpertPage() {
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
            Экспертное сопровождение
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">
            Консалтинг и методическая поддержка организаторов мероприятий, 
            обучение команд и разработка стандартов качества.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-6">
                Делимся экспертизой
              </h2>
              <div className="prose prose-lg text-[#6B7280]">
                <p className="mb-4">
                  За 15 лет работы мы накопили уникальный опыт организации 
                  мероприятий самого разного масштаба и формата. Теперь мы 
                  готовы делиться этой экспертизой с вами.
                </p>
                <p className="mb-4">
                  Наше экспертное сопровождение — это не просто консультации, 
                  а партнерство, направленное на развитие ваших компетенций 
                  и повышение качества мероприятий.
                </p>
                <p>
                  Мы помогаем выстраивать системы, которые работают без сбоев, 
                  и обучаем команды, способные реализовывать проекты любой 
                  сложности.
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

          {/* Services Grid */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-8 text-center">
              Форматы работы
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#9A2A2A]/30 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-[#F5F7FA] rounded-xl flex items-center justify-center mb-4 text-[#9A2A2A]">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1A1E24] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#6B7280] text-sm">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#F5F7FA] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-4">
              Нужна экспертная поддержка?
            </h2>
            <p className="text-[#6B7280] mb-8 max-w-xl mx-auto">
              Свяжитесь с нами, чтобы обсудить, как мы можем помочь 
              в развитии вашей event-компетенции.
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
          source="expert"
        />
      )}
    </div>
  );
}
