"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import ContactForm from "./ContactForm";

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Направления", href: "#expertise" },
  { name: "Команда", href: "/team" },
  { name: "Блог", href: "/blog" },
  { name: "Контакты", href: "/contacts" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change - using layout effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100" 
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Логотип */}
            <Link href="/" className="flex items-center gap-3 group relative z-50">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                isScrolled 
                  ? "bg-gradient-to-br from-gray-900 to-gray-700 shadow-gray-900/20 group-hover:shadow-gray-900/40" 
                  : "bg-white/20 backdrop-blur-sm border border-white/30"
              }`}>
                <span className={`font-bold text-lg ${isScrolled ? "text-white" : "text-white"}`}>ЕУ</span>
              </div>
              <div className="hidden sm:block">
                <span className={`font-bold text-base block transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  Евгений Усачев
                </span>
                <span className={`text-xs transition-colors ${isScrolled ? "text-gray-500" : "text-white/70"}`}>
                  Продюсерский центр
                </span>
              </div>
            </Link>

            {/* Десктоп меню */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium relative group transition-colors ${
                    isScrolled 
                      ? "text-gray-600 hover:text-gray-900" 
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                    isScrolled ? "bg-gray-900" : "bg-white"
                  }`} />
                </Link>
              ))}
            </div>

            {/* Правая часть */}
            <div className="flex items-center gap-4">
              <a
                href="tel:+79001234567"
                className={`hidden md:flex items-center gap-2 text-sm transition-colors ${
                  isScrolled 
                    ? "text-gray-600 hover:text-gray-900" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                <Phone className="w-4 h-4" />
                +7 (900) 123-45-67
              </a>
              <Button
                onClick={() => setShowForm(true)}
                className={`hidden sm:flex rounded-xl transition-all ${
                  isScrolled
                    ? "bg-gray-900 hover:bg-gray-800 text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                Связаться
              </Button>

              {/* Точечное меню (Dot Menu) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-50 w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all ${
                  isScrolled 
                    ? "bg-gray-100 hover:bg-gray-200" 
                    : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
                }`}
                aria-label="Открыть меню"
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isOpen 
                    ? "rotate-45 translate-y-[6px]" 
                    : ""
                } ${isScrolled ? "bg-gray-700" : "bg-white"}`} />
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isOpen ? "opacity-0 scale-0" : ""
                } ${isScrolled ? "bg-gray-700" : "bg-white"}`} />
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isOpen 
                    ? "-rotate-45 -translate-y-[6px]" 
                    : ""
                } ${isScrolled ? "bg-gray-700" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Полноэкранное выдвижное меню */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Затемнённый фон */}
        <div 
          className={`absolute inset-0 bg-gray-900/95 backdrop-blur-xl transition-all duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Контент меню */}
        <div className="absolute inset-0 flex items-center justify-center">
          <nav className={`text-center transition-all duration-700 delay-100 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-3xl sm:text-4xl lg:text-5xl font-light text-white/80 hover:text-white transition-all duration-300 py-4 ${
                  isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ 
                  transitionDelay: isOpen ? `${150 + index * 50}ms` : "0ms",
                  fontWeight: 300
                }}
              >
                {item.name}
              </Link>
            ))}
            
            <div 
              className={`mt-12 pt-8 border-t border-white/20 transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
            >
              <a 
                href="tel:+79001234567"
                className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-colors text-lg mb-6"
              >
                <Phone className="w-5 h-5" />
                +7 (900) 123-45-67
              </a>
              
              <div className="flex justify-center">
                <Button
                  onClick={() => { setIsOpen(false); setShowForm(true); }}
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-xl"
                >
                  Обсудить проект
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {showForm && <ContactForm onClose={() => setShowForm(false)} />}
    </>
  );
}
