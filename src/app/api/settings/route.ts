import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - получить все настройки или по категории
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const key = searchParams.get('key');

    if (key) {
      const setting = await prisma.siteSettings.findUnique({
        where: { key }
      });
      return NextResponse.json(setting);
    }

    const settings = category 
      ? await prisma.siteSettings.findMany({ where: { category } })
      : await prisma.siteSettings.findMany();

    // Преобразуем в объект ключ-значение
    const result: Record<string, string> = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// POST - создать или обновить настройку
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, category = 'general' } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and value are required' }, { status: 400 });
    }

    const setting = await prisma.siteSettings.upsert({
      where: { key },
      update: { value, category },
      create: { key, value, category }
    });

    return NextResponse.json(setting);
  } catch (error) {
    console.error('Error saving setting:', error);
    return NextResponse.json({ error: 'Failed to save setting' }, { status: 500 });
  }
}

// DELETE - удалить настройку
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (!key) {
      return NextResponse.json({ error: 'Key is required' }, { status: 400 });
    }

    await prisma.siteSettings.delete({
      where: { key }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting setting:', error);
    return NextResponse.json({ error: 'Failed to delete setting' }, { status: 500 });
  }
}
