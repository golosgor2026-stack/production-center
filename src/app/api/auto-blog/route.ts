import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ZAI from 'z-ai-web-dev-sdk';
import { 
  ALL_KEYWORDS, 
  HIGH_FREQUENCY_KEYWORDS, 
  MEDIUM_FREQUENCY_KEYWORDS, 
  LOW_FREQUENCY_KEYWORDS,
  SEOKeyword 
} from '@/lib/seo-keywords';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  const transliteration: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
  };
  
  return title
    .toLowerCase()
    .split('')
    .map(char => transliteration[char] || char)
    .join('')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80);
}

// Изображения для разных категорий
const COVER_IMAGES: Record<string, string[]> = {
  federal: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  ],
  business: [
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  ],
  corporate: [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  ],
  concerts: [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  ],
  festivals: [
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
  ],
  technical: [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  ],
};

function getCoverImage(category: string): string {
  const images = COVER_IMAGES[category] || COVER_IMAGES.default;
  return images[Math.floor(Math.random() * images.length)];
}

// Стратегия выбора ключевых слов: чередуем частотность
function selectKeywordsForArticle(): { primary: SEOKeyword; secondary: SEOKeyword[] } {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const frequencyType = dayOfYear % 3; // 0, 1, 2 - high, medium, low
  
  let primaryPool: SEOKeyword[];
  switch (frequencyType) {
    case 0: primaryPool = HIGH_FREQUENCY_KEYWORDS; break;
    case 1: primaryPool = MEDIUM_FREQUENCY_KEYWORDS; break;
    default: primaryPool = LOW_FREQUENCY_KEYWORDS;
  }
  
  // Основное ключевое слово
  const primary = primaryPool[Math.floor(Math.random() * primaryPool.length)];
  
  // Дополнительные ключевые слова (смешанные)
  const secondary: SEOKeyword[] = [];
  
  // Добавляем 2-4 связанных ключевых слова
  const relatedCount = 2 + Math.floor(Math.random() * 3);
  const usedKeywords = new Set([primary.keyword]);
  
  // Пытаемся найти ключевые слова той же категории
  const sameCategory = ALL_KEYWORDS.filter(k => k.category === primary.category && k.keyword !== primary.keyword);
  const shuffledSame = sameCategory.sort(() => Math.random() - 0.5);
  
  for (const kw of shuffledSame) {
    if (secondary.length >= relatedCount) break;
    if (!usedKeywords.has(kw.keyword)) {
      secondary.push(kw);
      usedKeywords.add(kw.keyword);
    }
  }
  
  // Если не хватает, добираем из общего пула
  const shuffled = ALL_KEYWORDS.sort(() => Math.random() - 0.5);
  for (const kw of shuffled) {
    if (secondary.length >= relatedCount) break;
    if (!usedKeywords.has(kw.keyword)) {
      secondary.push(kw);
      usedKeywords.add(kw.keyword);
    }
  }
  
  return { primary, secondary };
}

async function generateArticle() {
  // Выбираем ключевые слова по стратегии
  const { primary, secondary } = selectKeywordsForArticle();
  const allKeywords = [primary, ...secondary];
  
  const zai = await ZAI.create();
  
  // Генерируем статью через AI
  const completion = await zai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Ты профессиональный SEO-копирайтер для продюсерского центра Евгения Усачева. Пиши на русском языке.

Продюсерский центр организует мероприятия федерального уровня: форумы с участием первых лиц государства, B2B-события, фестивали, концерты, корпоративы.

ЗАДАЧА: Написать SEO-оптимизированную статью.

ГЛАВНОЕ КЛЮЧЕВОЕ СЛОВО: "${primary.keyword}"
ДОПОЛНИТЕЛЬНЫЕ КЛЮЧЕВЫЕ СЛОВА: ${secondary.map(k => k.keyword).join(', ')}

ТРЕБОВАНИЯ К СТАТЬЕ:
1. Заголовок: включает главное ключевое слово, цепляющий, 60-80 символов
2. Вступление: 2-3 предложения, содержит главное ключевое слово
3. Основной текст: 5-7 разделов с подзаголовками H2
4. Каждый раздел: 2-3 абзаца по 2-4 предложения
5. Ключевые слова использовать естественно в тексте
6. Практические советы и полезная информация
7. Призыв к действию в конце

ФОРМАТ ОТВЕТА (строго JSON):
{
  "title": "Заголовок статьи с ключевым словом",
  "excerpt": "Краткое описание 150-200 символов с ключевым словом",
  "content": "<p>Вступление...</p><h2>Раздел 1</h2><p>Текст...</p>...",
  "keywords": ["ключевое слово 1", "ключевое слово 2"],
  "readTime": "X мин",
  "category": "название категории"
}`
      },
      {
        role: 'user',
        content: `Напиши уникальную SEO-оптимизированную статью для блога продюсерского центра.

Главное ключевое слово: "${primary.keyword}"
Дополнительные: ${secondary.map(k => k.keyword).join(', ')}
Категория: ${primary.category}
Дата: ${new Date().toLocaleDateString('ru-RU')}

Сделай статью практичной, полезной и ориентированной на ${primary.intent === 'commercial' ? 'потенциальных клиентов' : 'информационный поиск'}.`
      }
    ],
    temperature: 0.8,
    max_tokens: 4000,
  });

  const response = completion.choices[0]?.message?.content || '';
  
  // Парсим JSON из ответа
  let article;
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      article = JSON.parse(jsonMatch[0]);
    } else {
      throw new Error('No JSON found');
    }
  } catch (e) {
    console.error('Failed to parse AI response:', response);
    return null;
  }

  return {
    title: article.title,
    slug: generateSlug(article.title),
    excerpt: article.excerpt,
    content: article.content,
    keywords: article.keywords || allKeywords.map(k => k.keyword),
    readTime: article.readTime || '10 мин',
    coverImage: getCoverImage(primary.category),
    category: primary.category,
    primaryKeyword: primary.keyword,
    frequency: primary.frequency,
  };
}

export async function GET(request: NextRequest) {
  // Проверка секретного ключа для авторизации cron задачи
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || 'auto-blog-secret-2024';
  
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Проверяем, не публиковали ли уже сегодня
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingPost = await prisma.blogPost.findFirst({
      where: {
        createdAt: {
          gte: today
        }
      }
    });

    if (existingPost) {
      return NextResponse.json({ 
        message: 'Статья сегодня уже опубликована',
        post: existingPost 
      });
    }

    // Генерируем новую статью
    const articleData = await generateArticle();
    
    if (!articleData) {
      return NextResponse.json({ error: 'Failed to generate article' }, { status: 500 });
    }

    // Проверяем уникальность slug
    let slug = articleData.slug;
    let counter = 1;
    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${articleData.slug}-${counter}`;
      counter++;
    }

    // Сохраняем в базу
    const post = await prisma.blogPost.create({
      data: {
        title: articleData.title,
        slug: slug,
        excerpt: articleData.excerpt,
        content: articleData.content,
        coverImage: articleData.coverImage,
        authorName: 'Редакция',
        category: articleData.category === 'federal' ? 'cases' : 'articles',
        published: true,
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Статья успешно опубликована',
      seo: {
        primaryKeyword: articleData.primaryKeyword,
        frequency: articleData.frequency,
        keywords: articleData.keywords,
      },
      post: {
        id: post.id,
        title: post.title,
        slug: post.slug,
        createdAt: post.createdAt
      }
    });

  } catch (error: any) {
    console.error('Auto-blog error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error.message 
    }, { status: 500 });
  }
}

// Для ручного запуска через POST
export async function POST(request: NextRequest) {
  return GET(request);
}
