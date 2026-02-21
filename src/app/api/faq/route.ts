import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - получить все FAQ
export async function GET() {
  try {
    const faqs = await prisma.fAQItem.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    // Если нет FAQ, создаём дефолтные
    if (faqs.length === 0) {
      const defaultFaqs = await Promise.all([
        prisma.fAQItem.create({
          data: {
            question: 'Сколько стоит организация форума федерального уровня?',
            answer: 'Стоимость зависит от множества факторов: масштаб мероприятия, количество участников, техническое оснащение, локация и длительность. Бюджет форума на 500 участников начинается от 5 млн рублей.',
            order: 1
          }
        }),
        prisma.fAQItem.create({
          data: {
            question: 'Какие сроки организации масштабного мероприятия?',
            answer: 'Минимальный срок подготовки форума федерального уровня — 3 месяца, оптимальный — 6-12 месяцев.',
            order: 2
          }
        }),
        prisma.fAQItem.create({
          data: {
            question: 'Работаете ли вы с государственными заказчиками?',
            answer: 'Да, у нас большой опыт работы с государственными структурами: министерствами, ведомствами, администрациями регионов.',
            order: 3
          }
        })
      ]);
      
      return NextResponse.json(defaultFaqs);
    }

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
  }
}

// POST - создать FAQ
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, order } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const faq = await prisma.fAQItem.create({
      data: { question, answer, order: order || 0 }
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

// PUT - обновить FAQ
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const faq = await prisma.fAQItem.update({
      where: { id },
      data
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// DELETE - удалить FAQ
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.fAQItem.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
