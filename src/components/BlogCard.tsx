import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  createdAt: Date | string;
  featured?: boolean;
}

const categoryLabels: Record<string, string> = {
  news: "Новости",
  articles: "Статьи",
  cases: "Кейсы",
  press: "Пресса",
};

const categoryColors: Record<string, string> = {
  news: "bg-blue-50 text-blue-700",
  articles: "bg-purple-50 text-purple-700",
  cases: "bg-green-50 text-green-700",
  press: "bg-orange-50 text-orange-700",
};

export default function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  createdAt,
  featured = false,
}: BlogCardProps) {
  const date = typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  
  return (
    <Link href={`/blog/${slug}`}>
      <article
        className={`group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 h-full ${
          featured ? "md:flex" : ""
        }`}
      >
        {/* Изображение */}
        <div
          className={`relative overflow-hidden bg-[#F5F7FA] ${
            featured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"
          }`}
        >
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#9A2A2A]/10 to-[#F5F7FA]">
              <span className="text-4xl font-bold text-[#9A2A2A]/20">ЕУ</span>
            </div>
          )}
          <div
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
              categoryColors[category] || "bg-gray-100 text-gray-700"
            }`}
          >
            {categoryLabels[category] || category}
          </div>
        </div>

        {/* Контент */}
        <div className={`p-5 md:p-6 flex flex-col ${featured ? "md:w-1/2" : ""}`}>
          <div className="flex items-center text-[#6B7280] text-sm mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            {format(date, "d MMMM yyyy", { locale: ru })}
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-[#1A1E24] mb-2 line-clamp-2 group-hover:text-[#9A2A2A] transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-[#6B7280] text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
              {excerpt}
            </p>
          )}
          <div className="flex items-center text-[#9A2A2A] text-sm font-medium mt-auto">
            Читать далее
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
