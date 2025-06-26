import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const commandes = await prisma.commande.findMany({
    include: { product: true },
  });
  return Response.json(commandes);
}

export async function POST(req) {
  const body = await req.json();
  const commande = await prisma.commande.create({
    data: {
      adresse: body.adresse,
      emballage: body.emballage,
      num: parseFloat(body.num), // ✅ convert string to float
      mail: body.mail,
      nom: body.nom,
      quantite: parseFloat(body.quantite),
      prenom: body.prenom,
      region: body.region,

      productId: parseFloat(body.productId),
    },
  });
  return Response.json(commande);
}
