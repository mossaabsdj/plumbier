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

  const productTitles = await prisma.product.findMany({
    where: {
      id: { in: commandesByProduct.map((c) => c.productId) },
    },
    select: {
      id: true,
      title: true,
    },
  });

  const commandesWithTitles = commandesByProduct.map((item) => {
    const product = productTitles.find((p) => p.id === item.productId);
    return {
      title: product.title || "Unknown",
      count: item._count, // or item._count.productId
    };
  });

  return Response.json({
    totalCommandes: total,
    commandesByRegion,
    commandesWithTitles,
  });
}
