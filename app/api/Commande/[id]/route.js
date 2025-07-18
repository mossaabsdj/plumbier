import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 👉 Get one commande
export async function GET(_, { params }) {
  const commande = await prisma.commande.findUnique({
    where: { id: params.id },
  });
  return commande
    ? NextResponse.json(commande)
    : NextResponse.json({ error: "Not found" }, { status: 404 });
}

// 👉 Update one commande
export async function PUT(req, { params }) {
  const data = await req.json();
  const updated = await prisma.commande.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
}

// 👉 Delete one commande
export async function DELETE(_, { params }) {
  await prisma.commande.delete({
    where: { id: params.id },
  });
  return NextResponse.json({ success: true });
}
