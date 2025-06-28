import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.farm.findMany();
    return Response.json(products);
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  const { name } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const farm = await prisma.farm.create({
    data: { name },
  });
  return NextResponse.json(farm);
}

export async function PUT(req) {
  const { id, name } = await req.json();
  if (!id || !name) {
    return NextResponse.json(
      { error: "ID and name are required" },
      { status: 400 }
    );
  }
  const farm = await prisma.farm.update({
    where: { id },
    data: { name },
  });
  return NextResponse.json(farm);
}

export async function DELETE(req) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  await prisma.farm.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
