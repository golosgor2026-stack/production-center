"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Проверяем, было ли дано согласие ранее
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Небольшая задержка для плавного появления
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Icon */}
            <div className="hidden sm:flex flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl items-center justify-center">
              <Cookie className="w-6 h-6 text-gray-600" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-start sm:items-center gap-2 mb-2">
                <div className="sm:hidden flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Cookie className="w-4 h-4 text-gray-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  Использование cookies
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed sm:ml-0">
                Мы используем cookies для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с{" "}
                <Link 
                  href="/privacy" 
                  className="text-gray-900 underline underline-offset-2 hover:text-gray-700 transition-colors"
                >
                  Политикой конфиденциальности
                </Link>
                .
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:flex-shrink-0">
              <Button
                onClick={handleAccept}
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5"
              >
                Принять
              </Button>
              <Link href="/privacy">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  Подробнее
                </Button>
              </Link>
              <button
                onClick={handleClose}
                className="hidden sm:flex p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
