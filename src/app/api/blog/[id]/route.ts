import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/blog/[id] - получение поста по ID или slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Проверяем, это ID или slug
    const isId = id.length > 10; //.slug обычно короче

    let post;
    if (isId) {
      post = await db.blogPost.findUnique({
        where: { id },
      });
    } else {
      post = await db.blogPost.findUnique({
        where: { slug: id },
      });
    }

    if (!post) {
      return NextResponse.json({ error: "Пост не найден" }, { status: 404 });
    }

    // Увеличиваем счетчик просмотров
    await db.blogPost.update({
      where: { id: post.id },
      data: { views: post.views + 1 },
    });

    return NextResponse.json({
      data: post,
    });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Ошибка при получении поста" },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - обновление поста
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const updateData: Record<string, unknown> = {};
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (content) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverImage !== undefined) updateData.coverImage = coverImage;
    if (category) updateData.category = category;
    if (featured !== undefined) updateData.featured = featured;
    if (published !== undefined) updateData.published = published;
    if (authorName !== undefined) updateData.authorName = authorName;

    const updatedPost = await db.blogPost.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении поста" },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - удаление поста
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении поста" },
      { status: 500 }
    );
  }
}
