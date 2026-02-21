import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ExpertiseCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  index?: number;
}

export default function ExpertiseCard({
  title,
  description,
  href,
  icon,
  index = 0,
}: ExpertiseCardProps) {
  return (
    <Link href={href} className="block h-full">
      <div className="group relative bg-white rounded-2xl p-6 md:p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 h-full hover:-translate-y-2">
        {/* Иконка */}
        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-50 to-slate-50 group-hover:from-[#1E40AF] group-hover:to-blue-600 rounded-2xl flex items-center justify-center mb-5 md:mb-6 transition-all duration-500 shadow-sm group-hover:shadow-lg">
          <div className="text-[#1E40AF] group-hover:text-white transition-colors duration-500">
            {icon}
          </div>
        </div>

        {/* Контент */}
        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-[#1E40AF] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-5">
          {description}
        </p>

        {/* Стрелка */}
        <div className="flex items-center text-[#1E40AF] text-sm font-semibold group-hover:text-blue-600 transition-colors">
          Подробнее
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
        </div>

        {/* Декоративная линия */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#1E40AF] to-blue-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
      </div>
    </Link>
  );
}
