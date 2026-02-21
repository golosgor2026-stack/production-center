import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/team - получение списка команды
export async function GET() {
  try {
    const team = await db.teamMember.findMany({
      where: { active: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({
      data: team,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json(
      { error: "Ошибка при получении списка команды" },
      { status: 500 }
    );
  }
}

// POST /api/team - добавление члена команды
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, bio, photo, email, phone, order } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Обязательные поля не заполнены" },
        { status: 400 }
      );
    }

    const newMember = await db.teamMember.create({
      data: {
        name,
        role,
        bio: bio || null,
        photo: photo || null,
        email: email || null,
        phone: phone || null,
        order: order || 0,
      },
    });

    return NextResponse.json({
      success: true,
      data: newMember,
    });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Ошибка при добавлении члена команды" },
      { status: 500 }
    );
  }
}
