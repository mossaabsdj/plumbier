import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const commande = await prisma.commande.findUnique({
    where: { id: Number(params.id) },
    include: { product: true },
  });
  return Response.json(commande);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const updated = await prisma.commande.update({
    where: { id: Number(params.id) },
    data,
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await prisma.commande.delete({
    where: { id: Number(params.id) },
  });
  return Response.json({ success: true });
}
