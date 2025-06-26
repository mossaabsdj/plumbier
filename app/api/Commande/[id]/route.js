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
  const body = await req.json();
  const updated = await prisma.commande.update({
    where: { id: Number(params.id) },
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
      status: body.status,
    },
  });
  return Response.json(updated);
}

export async function DELETE(req, { params }) {
  await prisma.commande.delete({
    where: { id: Number(params.id) },
  });
  return Response.json({ success: true });
}
