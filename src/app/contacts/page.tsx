"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function ContactsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "contacts",
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки");
      }

      setIsSuccess(true);
      toast({
        title: "Сообщение отправлено!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить сообщение. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Контакты
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl">
            Свяжитесь с нами любым удобным способом или оставьте заявку — 
            мы ответим в течение 24 часов.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A1E24] mb-8">
                Как с нами связаться
              </h2>

              <div className="space-y-6 mb-12">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#9A2A2A]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#9A2A2A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1E24] mb-1">Телефон</h3>
                    <a
                      href="tel:+79001234567"
                      className="text-[#6B7280] hover:text-[#9A2A2A] transition-colors"
                    >
                      +7 (900) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#9A2A2A]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#9A2A2A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1E24] mb-1">Email</h3>
                    <a
                      href="mailto:info@usachev.pro"
                      className="text-[#6B7280] hover:text-[#9A2A2A] transition-colors"
                    >
                      info@usachev.pro
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#9A2A2A]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#9A2A2A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1E24] mb-1">Адрес</h3>
                    <p className="text-[#6B7280]">
                      Москва, ул. Примерная, д. 1, офис 100
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#9A2A2A]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#9A2A2A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1A1E24] mb-1">Часы работы</h3>
                    <p className="text-[#6B7280]">
                      Пн-Пт: 9:00 - 18:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video bg-[#F5F7FA] rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9A2A2A]/5 to-[#F5F7FA]">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-[#9A2A2A]/30 mx-auto mb-2" />
                    <p className="text-[#6B7280] text-sm">Карта загружается...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-[#1A1E24] mb-6">
                  Напишите нам
                </h2>

                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-lg font-semibold text-[#1A1E24] mb-2">
                      Сообщение отправлено!
                    </h3>
                    <p className="text-[#6B7280] text-sm text-center">
                      Мы свяжемся с вами в ближайшее время.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Ваше имя"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+7 (999) 123-45-67"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea
                        id="message"
                        placeholder="Ваше сообщение..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="mt-1 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9A2A2A] hover:bg-[#7A2222] text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Отправить сообщение
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-[#6B7280] text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
