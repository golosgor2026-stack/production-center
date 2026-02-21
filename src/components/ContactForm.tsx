"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactFormProps {
  onClose: () => void;
  source?: string;
}

export default function ContactForm({ onClose, source = "main" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    organization: "",
    phone: "",
    email: "",
    description: "",
    meetingType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source }),
      });

      if (!response.ok) throw new Error("Ошибка");

      setIsSuccess(true);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });

      setTimeout(() => onClose(), 2000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-xl text-gray-900">
            <span>Кофе-брейк</span>
            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </DialogTitle>
          <p className="text-gray-600 text-sm mt-2">
            Обсудим ваш проект за чашкой кофе? Оставьте заявку.
          </p>
        </DialogHeader>

        {isSuccess ? (
          <div className="flex flex-col items-center py-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[#B8860B]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
            <p className="text-gray-600 text-sm text-center">Мы свяжемся с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">Имя *</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 bg-white border-gray-200 focus:border-[#B8860B] focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <Label htmlFor="position" className="text-gray-700">Должность</Label>
                <Input
                  id="position"
                  placeholder="Директор"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="mt-1 bg-white border-gray-200 focus:border-[#B8860B] focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="organization" className="text-gray-700">Организация</Label>
              <Input
                id="organization"
                placeholder="Название компании"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="mt-1 bg-white border-gray-200 focus:border-[#B8860B] focus:ring-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-gray-700">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="mt-1 bg-white border-gray-200 focus:border-[#B8860B] focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 bg-white border-gray-200 focus:border-[#B8860B] focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-gray-700">Описание проекта</Label>
              <Textarea
                id="description"
                placeholder="Расскажите о вашем проекте..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1 bg-white border-gray-200 focus:border-[#B8860B] focus:ring-[#D4AF37] resize-none"
              />
            </div>

            <div>
              <Label className="text-gray-700">Формат встречи</Label>
              <Select
                value={formData.meetingType}
                onValueChange={(value) => setFormData({ ...formData, meetingType: value })}
              >
                <SelectTrigger className="mt-1 bg-white border-gray-200 focus:border-[#B8860B]">
                  <SelectValue placeholder="Выберите формат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Онлайн (Zoom/Telegram)</SelectItem>
                  <SelectItem value="offline">Офлайн (в офисе)</SelectItem>
                  <SelectItem value="phone">Телефонный звонок</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#8B6914] text-white py-6 rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Отправить заявку
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
