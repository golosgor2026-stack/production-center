import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { writeFile, unlink } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// GET - получить все медиафайлы
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const files = category 
      ? await prisma.mediaFile.findMany({ 
          where: { category },
          orderBy: { createdAt: 'desc' }
        })
      : await prisma.mediaFile.findMany({
          orderBy: { createdAt: 'desc' }
        });

    return NextResponse.json(files);
  } catch (error) {
    console.error('Error fetching media files:', error);
    return NextResponse.json({ error: 'Failed to fetch media files' }, { status: 500 });
  }
}

// POST - загрузить файл
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string;
    const category = formData.get('category') as string || 'general';

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Создаём директорию для загрузок если её нет
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Генерируем уникальное имя файла
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}_${originalName}`;
    const filepath = path.join(uploadDir, filename);

    // Сохраняем файл
    await writeFile(filepath, buffer);

    // Сохраняем информацию в БД
    const mediaFile = await prisma.mediaFile.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        url: `/uploads/${filename}`,
        alt: alt || file.name,
        category
      }
    });

    return NextResponse.json(mediaFile);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}

// DELETE - удалить файл
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Получаем информацию о файле
    const file = await prisma.mediaFile.findUnique({
      where: { id }
    });

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Удаляем файл с диска
    const filepath = path.join(process.cwd(), 'public', file.url);
    try {
      await unlink(filepath);
    } catch {
      // Файл может не существовать
    }

    // Удаляем запись из БД
    await prisma.mediaFile.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
