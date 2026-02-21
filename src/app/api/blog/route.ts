import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blog - получение списка постов
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (featured === "true") where.featured = true;
    if (published !== "false") where.published = true;

    const [posts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      data: posts,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Ошибка при получении постов" },
      { status: 500 }
    );
  }
}

// POST /api/blog - создание нового поста
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      category,
      featured,
      published,
      authorName,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Обязательные поля не заполнены" },
        { status: 400 }
      );
    }

    // Проверка уникальности slug
    const existingPost = await db.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "Пост с таким slug уже существует" },
        { status: 400 }
      );
    }

    const newPost = await db.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        category: category || "news",
        featured: featured || false,
        published: published || false,
        authorName: authorName || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Ошибка при создании поста" },
      { status: 500 }
    );
  }
}
