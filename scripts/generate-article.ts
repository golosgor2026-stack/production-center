import ZAI from 'z-ai-web-dev-sdk';

const API_URL = 'http://178.212.13.25';
const CRON_SECRET = 'auto-blog-secret-2024';

// База ключевых слов
const SEO_KEYWORDS = {
  high: [
    "организация мероприятий", "ивент агентство", "event агентство москва", 
    "организация корпоративов", "тимбилдинг", "организация конференций",
    "форум мероприятие", "продюсерский центр", "event компания",
    "организация концертов", "организация фестивалей", "деловое мероприятие"
  ],
  medium: [
    "организация федеральных мероприятий", "форум с участием первых лиц",
    "петербургский форум организация", "отраслевой форум", "b2b конференция",
    "образовательный форум", "медиапродакшн мероприятие", "гибридное мероприятие",
    "экспертное сопровождение", "синхронный перевод"
  ],
  low: [
    "форум с участием губернатора", "мероприятие с фсо", 
    "мероприятие в национальном центре", "концерт на красной площади",
    "форум руководителей", "инклюзивное мероприятие", "esg форум"
  ]
};

const COVER_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
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

function selectKeywords(): { primary: string; secondary: string[] } {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const frequencyType = dayOfYear % 3;
  
  let pool: string[];
  switch (frequencyType) {
    case 0: pool = SEO_KEYWORDS.high; break;
    case 1: pool = SEO_KEYWORDS.medium; break;
    default: pool = SEO_KEYWORDS.low;
  }
  
  const primary = pool[Math.floor(Math.random() * pool.length)];
  const allKeywords = [...SEO_KEYWORDS.high, ...SEO_KEYWORDS.medium, ...SEO_KEYWORDS.low];
  const secondary = allKeywords
    .filter(k => k !== primary)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  return { primary, secondary };
}

async function generateArticle() {
  const { primary, secondary } = selectKeywords();
  const allKeywords = [primary, ...secondary];
  
  const zai = await ZAI.create();
  
  const completion = await zai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Ты профессиональный SEO-копирайтер для продюсерского центра Евгения Усачева. Пиши на русском языке.

Продюсерский центр организует мероприятия федерального уровня: форумы с участием первых лиц государства, B2B-события, фестивали, концерты, корпоративы.

ГЛАВНОЕ КЛЮЧЕВОЕ СЛОВО: "${primary}"
ДОПОЛНИТЕЛЬНЫЕ: ${secondary.join(', ')}

ТРЕБОВАНИЯ:
1. Заголовок: включает главное ключевое слово, 60-80 символов
2. Вступление: 2-3 предложения с ключевым словом
3. 5-7 разделов с подзаголовками H2
4. Каждый раздел: 2-3 абзаца по 2-4 предложения
5. Призыв к действию в конце

ФОРМАТ ОТВЕТА (строго JSON):
{
  "title": "Заголовок",
  "excerpt": "Описание 150-200 символов",
  "content": "<p>Вступление</p><h2>Раздел 1</h2><p>Текст</p>...",
  "keywords": ["ключ1", "ключ2"],
  "readTime": "X мин"
}`
      },
      {
        role: 'user',
        content: `Напиши статью для блога продюсерского центра.

Главное ключевое слово: "${primary}"
Дополнительные: ${secondary.join(', ')}
Дата: ${new Date().toLocaleDateString('ru-RU')}`
      }
    ],
    temperature: 0.8,
    max_tokens: 4000,
  });

  const response = completion.choices[0]?.message?.content || '';
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('Failed to parse AI response');
  }
  
  const article = JSON.parse(jsonMatch[0]);
  
  return {
    title: article.title,
    slug: generateSlug(article.title),
    excerpt: article.excerpt,
    content: article.content,
    keywords: article.keywords || allKeywords,
    readTime: article.readTime || '10 мин',
    coverImage: COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)],
    primaryKeyword: primary,
  };
}

async function sendToServer(article: any) {
  // Отправляем статью на сервер через API
  const response = await fetch(`${API_URL}/api/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: article.title,
      slug: article.slug,
      content: article.content,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      category: 'articles',
      published: true,
      authorName: 'Редакция',
    }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Server error: ${error}`);
  }
  
  return response.json();
}

async function main() {
  console.log('🚀 Starting article generation...\n');
  
  try {
    // Генерируем статью локально
    console.log('📝 Generating article with AI...');
    const article = await generateArticle();
    
    console.log(`\n✅ Article generated!`);
    console.log(`   Title: ${article.title}`);
    console.log(`   Primary keyword: ${article.primaryKeyword}`);
    console.log(`   Keywords: ${article.keywords.join(', ')}`);
    
    // Отправляем на сервер
    console.log('\n📤 Sending to server...');
    const result = await sendToServer(article);
    
    console.log('\n🎉 SUCCESS!');
    console.log(`   Article URL: ${API_URL}/blog/${article.slug}`);
    console.log(`\n🌐 Check homepage: ${API_URL}`);
    
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();
