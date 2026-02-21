import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// PATCH /api/requests/[id] - обновление статуса заявки
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, notes } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updatedRequest = await db.request.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении заявки" },
      { status: 500 }
    );
  }
}

// DELETE /api/requests/[id] - удаление заявки
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.request.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting request:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении заявки" },
      { status: 500 }
    );
  }
}
