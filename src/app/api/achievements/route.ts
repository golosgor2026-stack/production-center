import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - получить все достижения
export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

// POST - создать достижение
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, year, type, imageUrl, description, order } = body;

    if (!title || !year) {
      return NextResponse.json({ error: 'Title and year are required' }, { status: 400 });
    }

    const achievement = await prisma.achievement.create({
      data: {
        title,
        year,
        type: type || 'event',
        imageUrl,
        description,
        order: order || 0
      }
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Error creating achievement:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}

// PUT - обновить достижение
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const achievement = await prisma.achievement.update({
      where: { id },
      data
    });

    return NextResponse.json(achievement);
  } catch (error) {
    console.error('Error updating achievement:', error);
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
  }
}

// DELETE - удалить достижение
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.achievement.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}
