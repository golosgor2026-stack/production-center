import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ZAI from 'z-ai-web-dev-sdk';

const prisma = new PrismaClient();

// Темы для SEO статей
const TOPICS = [
  { topic: "организация форумов", keywords: ["форум", "мероприятие", "организация", "конференция", "деловое событие"] },
  { topic: "event-маркетинг", keywords: ["event маркетинг", "продвижение", "мероприятие", "участники", "аудитория"] },
  { topic: "корпоративные мероприятия", keywords: ["корпоратив", "тимбилдинг", "сотрудники", "компания", "мероприятие"] },
  { topic: "техническое оснащение мероприятий", keywords: ["звук", "свет", "оборудование", "сцена", "техническое оснащение"] },
  { topic: "безопасность мероприятий", keywords: ["безопасность", "охрана", "мероприятие", "массовое событие", "контроль"] },
  { topic: "B2B события", keywords: ["B2B", "деловое мероприятие", "нетворкинг", "бизнес", "конференция"] },
  { topic: "фестивали и концерты", keywords: ["фестиваль", "концерт", "музыка", "open-air", "мероприятие"] },
  { topic: "медиапродакшн", keywords: ["видео", "съемка", "контент", "медиа", "продакшн"] },
  { topic: "подкастинг", keywords: ["подкаст", "аудио", "контент", "корпоративный", "запись"] },
  { topic: "кейтеринг на мероприятиях", keywords: ["кейтеринг", "питание", "банкет", "фуршет", "мероприятие"] },
  { topic: "волонтеры на мероприятиях", keywords: ["волонтеры", "волонтер", "мероприятие", "организация", "команда"] },
  { topic: "спонсорство мероприятий", keywords: ["спонсор", "партнер", "мероприятие", "финансирование", "бюджет"] },
];

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

async function generateArticle() {
  // Выбираем случайную тему
  const topicData = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  
  const zai = await ZAI.create();
  
  // Генерируем статью через AI
  const completion = await zai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Ты профессиональный SEO-копирайтер для event-агентства. Пиши на русском языке.
        
Создай статью на тему "${topicData.topic}" для продюсерского центра Евгения Усачева.

Требования:
1. Заголовок: цепляющий, содержит ключевые слова, 60-80 символов
2. Вступление: 2-3 предложения с основной мыслью
3. Основной текст: 5-7 разделов с подзаголовками H2
4. Каждый раздел: 2-3 абзаца по 2-4 предложения
5. Заключение: 2-3 предложения с призывом к действию
6. Ключевые слова: ${topicData.keywords.join(', ')}

Формат ответа (строго JSON):
{
  "title": "Заголовок статьи",
  "excerpt": "Краткое описание 150-200 символов",
  "content": "<p>Вступление...</p><h2>Раздел 1</h2><p>Текст...</p>...",
  "keywords": ["ключевое слово 1", "ключевое слово 2"],
  "readTime": "X мин"
}`
      },
      {
        role: 'user',
        content: `Напиши уникальную SEO-оптимизированную статью на тему "${topicData.topic}" для блога продюсерского центра. Дата: ${new Date().toLocaleDateString('ru-RU')}. Сделай статью практичной и полезной.`
      }
    ],
    temperature: 0.8,
    max_tokens: 3000,
  });

  const response = completion.choices[0]?.message?.content || '';
  
  // Парсим JSON из ответа
  let article;
  try {
    // Извлекаем JSON из ответа
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
    keywords: article.keywords || topicData.keywords,
    readTime: article.readTime || '10 мин',
    coverImage: `https://images.unsplash.com/photo-1500000000000?w=800&q=80`,
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
        category: 'articles',
        published: true,
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Статья успешно опубликована',
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
