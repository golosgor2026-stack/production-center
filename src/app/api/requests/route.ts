import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/requests - получение списка заявок (для админки)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const source = searchParams.get("source");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (source) where.source = source;

    const [requests, total] = await Promise.all([
      db.request.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      db.request.count({ where }),
    ]);

    return NextResponse.json({
      data: requests,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Ошибка при получении заявок" },
      { status: 500 }
    );
  }
}

// POST /api/requests - создание новой заявки
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, position, organization, phone, email, description, meetingType, source } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Обязательные поля не заполнены" },
        { status: 400 }
      );
    }

    const newRequest = await db.request.create({
      data: {
        name,
        position: position || null,
        organization: organization || null,
        phone: phone || null,
        email,
        description: description || null,
        meetingType: meetingType || null,
        source: source || "main",
        status: "new",
      },
    });

    return NextResponse.json({
      success: true,
      data: newRequest,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Ошибка при создании заявки" },
      { status: 500 }
    );
  }
}
