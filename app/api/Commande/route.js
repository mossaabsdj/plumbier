import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const commandes = await prisma.commande.findMany({
    include: { product: true },
  });
  return Response.json(commandes);
}

export async function POST(req) {
  const data = await req.json();
  const commande = await prisma.commande.create({ data });
  return Response.json(commande);
}
