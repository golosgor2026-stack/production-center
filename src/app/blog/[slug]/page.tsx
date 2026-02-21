"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock, Heart, Send } from "lucide-react";
import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string;
  authorName: string | null;
  views: number;
  createdAt: string;
}

// Статичные статьи как fallback
const staticPosts: Record<string, BlogPost> = {
  "organizatsiya-forumov-rossiya": {
    id: "1",
    slug: "organizatsiya-forumov-rossiya",
    title: "Организация форумов федерального уровня в России: полное руководство",
    excerpt: "Как организовать форум с участием первых лиц государства.",
    content: `<p>Организация форумов федерального уровня — это сложный многоступенчатый процесс, требующий профессионального подхода.</p><h2>Этапы организации форума</h2><p>Первый этап — разработка концепции. Второй этап — выбор площадки. Третий этап — формирование программы.</p>`,
    category: "Статьи",
    authorName: "Евгений Усачев",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    views: 0,
    createdAt: "2024-06-20T00:00:00.000Z"
  },
  "event-agency-moscow": {
    id: "2",
    slug: "event-agency-moscow",
    title: "Как выбрать event-агентство в Москве: 10 критериев",
    excerpt: "Чек-лист для выбора надёжного event-агентства.",
    content: `<p>Выбор event-агентства — ключевой шаг к успешному мероприятию.</p><h2>1. Портфолио и кейсы</h2><p>Изучите реализованные проекты агентства.</p>`,
    category: "Статьи",
    authorName: "Светлана Бойченко",
    coverImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    views: 0,
    createdAt: "2024-06-15T00:00:00.000Z"
  },
  "peterburgskiy-forum-2024": {
    id: "4",
    slug: "peterburgskiy-forum-2024",
    title: "Петербургский международный экономический форум 2024: итоги",
    excerpt: "Подводим результаты участия команды в ПМЭФ-2024.",
    content: `<p>Петербургский международный экономический форум 2024 года стал знаковым событием для нашей команды.</p><h2>Масштаб проекта</h2><p>ПМЭФ-2024 побил рекорды посещаемости: более 20 000 участников.</p>`,
    category: "Кейсы",
    authorName: "Евгений Усачев",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    views: 0,
    createdAt: "2024-06-08T00:00:00.000Z"
  },
  "korporativnye-meropriyatiya-2024": {
    id: "3",
    slug: "korporativnye-meropriyatiya-2024",
    title: "Корпоративные мероприятия 2024: тренды и идеи",
    excerpt: "Главные тренды корпоративных событий.",
    content: `<p>Корпоративные мероприятия в 2024 году претерпевают значительные изменения.</p><h2>Гибридные форматы</h2><p>Гибридные мероприятия стали нормой.</p>`,
    category: "Статьи",
    authorName: "Анна Петрова",
    coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    views: 0,
    createdAt: "2024-06-10T00:00:00.000Z"
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        // Пытаемся загрузить из API
        const res = await fetch(`/api/blog?limit=100`);
        if (res.ok) {
          const data = await res.json();
          const found = data.data?.find((p: BlogPost) => p.slug === slug);
          if (found) {
            setPost(found);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to fetch post:', e);
      }
      
      // Fallback на статичные статьи
      if (staticPosts[slug]) {
        setPost(staticPosts[slug]);
      }
      setLoading(false);
    }
    
    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-500">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <Link href="/blog" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Все статьи
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
          <p className="text-gray-600">Запрашиваемая статья не существует или была удалена.</p>
        </div>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    articles: "Статьи",
    news: "Новости",
    cases: "Кейсы",
    press: "Пресса",
  };

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Hero */}
      <section className="relative">
        <div className="h-[400px] relative overflow-hidden">
          <Image
            src={post.coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Все статьи
          </Link>
          
          <Badge className="mb-4 bg-white text-gray-900">
            {categoryLabels[post.category] || post.category}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-8">
            {post.authorName && (
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.authorName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {Math.ceil((post.content?.length || 0) / 2000) * 5 + 5} мин чтения
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          
          <article 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Понравилась статья?
          </h2>
          <p className="text-gray-600 mb-6">
            Подпишитесь на рассылку и получайте новые статьи первыми
          </p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-xl">
            <Send className="w-4 h-4 mr-2" />
            Подписаться
          </Button>
        </div>
      </section>
    </div>
  );
}
