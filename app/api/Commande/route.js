import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  const commandes = await prisma.commande.findMany();
  return Response.json(commandes);
}

export async function POST(req) {
  const data = await req.json();
  const commande = await prisma.commande.create({
    data: {
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service,
      message: data.message || null,
      address: data.address,
      date: data.date ? new Date(data.date) : null,
      time: data.time || null,
    },
  });
  return Response.json(commande);
}
