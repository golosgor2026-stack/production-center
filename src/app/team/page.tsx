"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TeamMemberCard from "@/components/TeamMemberCard";
import ContactForm from "@/components/ContactForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    name: "Евгений Усачев",
    role: "Основатель, генеральный продюсер",
    bio: "Более 15 лет опыта в организации мероприятий федерального уровня. Автор концепций крупнейших форумов и фестивалей страны. Эксперт в области event-менеджмента и продюсирования, член жюри профессиональных премий.",
  },
  {
    name: "Ирина Лысак",
    role: "Исполнительный директор",
    bio: "Специалист по операционному управлению сложными проектами. Координирует работу всех подразделений центра, обеспечивает безупречное качество реализации проектов. Опыт работы в event-индустрии — более 12 лет.",
  },
  {
    name: "Светлана Бойченко",
    role: "Креативный директор",
    bio: "Автор концепций крупнейших проектов центра. Отвечает за творческое наполнение и визуальную составляющую мероприятий. Призер профессиональных конкурсов в области event-дизайна и сценографии.",
  },
  {
    name: "Виталий Носов",
    role: "Руководитель продакшна",
    bio: "Технический директор с опытом работы более 10 лет. Отвечает за техническое оснащение мероприятий любого масштаба — от конференц-залов до стадионов.",
  },
  {
    name: "Джун Ли",
    role: "Арт-директор",
    bio: "Визуальный стратег проектов. Разрабатывает дизайн-концепции, координирует работу художников и декораторов. Создает неповторимый визуальный стиль каждого мероприятия.",
  },
  {
    name: "Вячеслав Думчев",
    role: "Руководитель медиа-отдела",
    bio: "Курирует медиасопровождение проектов: фото- и видеосъемку, трансляции, SMM. Опыт работы в федеральных СМИ и на крупнейших мероприятиях страны.",
  },
];

export default function TeamPage() {
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
            Наша команда
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">
            Люди, которые делают невозможное возможным. Команда профессионалов 
            с уникальным опытом и страстью к своему делу.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Leadership */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#1A1E24] mb-8">
              Руководство
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.slice(0, 3).map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>

          {/* Media Team */}
          <div>
            <h2 className="text-2xl font-bold text-[#1A1E24] mb-8">
              Медиа-команда
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.slice(3).map((member, index) => (
                <TeamMemberCard key={index} {...member} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[#F5F7FA] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-4">
              Хотите присоединиться к команде?
            </h2>
            <p className="text-[#6B7280] mb-8 max-w-xl mx-auto">
              Мы всегда рады талантливым людям. Отправьте резюме и расскажите 
              о своем опыте в организации мероприятий.
            </p>
            <Button
              onClick={() => setShowContactForm(true)}
              className="bg-[#9A2A2A] hover:bg-[#7A2222] text-white px-8 py-6 text-lg"
            >
              Связаться с нами
            </Button>
          </div>
        </div>
      </section>

      {showContactForm && (
        <ContactForm
          onClose={() => setShowContactForm(false)}
          source="team"
        />
      )}
    </div>
  );
}
