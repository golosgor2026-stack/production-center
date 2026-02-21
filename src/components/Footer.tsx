import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, MessageCircle } from "lucide-react";

const footerLinks = {
  directions: [
    { name: "Федеральные мероприятия", href: "/federal" },
    { name: "B2B-события", href: "/b2b" },
    { name: "Фестивали", href: "/festivals" },
    { name: "Концерты", href: "/concerts" },
    { name: "Экспертное сопровождение", href: "/expert" },
  ],
  company: [
    { name: "О центре", href: "/#about" },
    { name: "Команда", href: "/team" },
    { name: "Блог", href: "/blog" },
    { name: "Контакты", href: "/contacts" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* О компании */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">ЕУ</span>
              </div>
              <div>
                <span className="text-white font-bold block">Евгений Усачев</span>
                <span className="text-gray-400 text-sm">Продюсерский центр</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Организация мероприятий федерального уровня с 2010 года. 
              Форумы, фестивали, концерты — от концепции до реализации.
            </p>
            <div className="flex gap-3">
              {[Instagram, Youtube, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-[#D4AF37] hover:to-[#B8860B] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Направления */}
          <div>
            <h3 className="text-white font-bold mb-4">Направления</h3>
            <ul className="space-y-3">
              {footerLinks.directions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-white font-bold mb-4">Компания</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#D4AF37] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-white font-bold mb-4">Контакты</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+79001234567" className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  +7 (900) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@usachev.pro" className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  info@usachev.pro
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>Москва, ул. Примерная, д. 1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Продюсерский центр Евгения Усачева
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/offer" className="text-gray-500 hover:text-[#D4AF37] transition-colors">
              Публичная оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
