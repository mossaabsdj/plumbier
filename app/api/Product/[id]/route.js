import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return Response.json(product);
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const updated = await prisma.product.update({
    where: { id: Number(params.id) },
    data,
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return Response.json({ success: true });
}
