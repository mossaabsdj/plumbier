import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const total = await prisma.commande.count();

  const commandesByRegion = await prisma.commande.groupBy({
    by: ["region"],
    _count: true,
  });

  const commandesByProduct = await prisma.commande.groupBy({
    by: ["productId"],
    _count: true,
  });

  return Response.json({
    totalCommandes: total,
    commandesByRegion,
    commandesByProduct,
  });
}
