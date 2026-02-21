import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - получить все секции или одну по slug
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const section = await prisma.contentSection.findUnique({
        where: { slug }
      });
      return NextResponse.json(section);
    }

    const sections = await prisma.contentSection.findMany({
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching content sections:', error);
    return NextResponse.json({ error: 'Failed to fetch content sections' }, { status: 500 });
  }
}

// POST - создать новую секцию
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, title, subtitle, content, imageUrl, videoUrl, buttonText, buttonLink, layout, order } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 });
    }

    const section = await prisma.contentSection.create({
      data: {
        slug,
        title,
        subtitle,
        content: content || '',
        imageUrl,
        videoUrl,
        buttonText,
        buttonLink,
        layout: layout || 'default',
        order: order || 0
      }
    });

    return NextResponse.json(section);
  } catch (error: any) {
    console.error('Error creating content section:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Section with this slug already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create content section' }, { status: 500 });
  }
}

// PUT - обновить секцию
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const section = await prisma.contentSection.update({
      where: { id },
      data
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating content section:', error);
    return NextResponse.json({ error: 'Failed to update content section' }, { status: 500 });
  }
}

// DELETE - удалить секцию
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.contentSection.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content section:', error);
    return NextResponse.json({ error: 'Failed to delete content section' }, { status: 500 });
  }
}
