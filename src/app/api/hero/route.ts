import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - получить hero секцию
export async function GET() {
  try {
    let hero = await prisma.heroSection.findFirst({
      where: { active: true }
    });

    // Если нет hero секции, создаём дефолтную
    if (!hero) {
      hero = await prisma.heroSection.create({
        data: {
          title: 'Продюсерский центр Евгения Усачева',
          subtitle: 'Создаём события федерального уровня',
          backgroundImage: '/hero-bg.jpg',
          buttonText: 'Наши услуги',
          buttonLink: '#expertise',
          stats: JSON.stringify([
            { value: '50+', label: 'проектов' },
            { value: '15', label: 'лет опыта' },
            { value: '50+', label: 'регионов' },
            { value: '50K', label: 'участников' }
          ])
        }
      });
    }

    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return NextResponse.json({ error: 'Failed to fetch hero section' }, { status: 500 });
  }
}

// PUT - обновить hero секцию
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      // Если нет ID, обновляем первую активную секцию
      const hero = await prisma.heroSection.findFirst({
        where: { active: true }
      });
      
      if (hero) {
        const updated = await prisma.heroSection.update({
          where: { id: hero.id },
          data
        });
        return NextResponse.json(updated);
      } else {
        // Создаём новую
        const created = await prisma.heroSection.create({
          data: {
            title: data.title || 'Продюсерский центр',
            ...data
          }
        });
        return NextResponse.json(created);
      }
    }

    const section = await prisma.heroSection.update({
      where: { id },
      data
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error('Error updating hero section:', error);
    return NextResponse.json({ error: 'Failed to update hero section' }, { status: 500 });
  }
}
