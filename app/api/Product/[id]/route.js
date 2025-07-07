import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
  });
  return Response.json(product);
}
export async function PUT(request, { params }) {
  const id = Number(params.id);
  const body = await request.json();

  try {
    // 1. Update the product fields
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title: body.title,
        desc: body.desc,
        prix: parseFloat(body.prix),
        farmId: body.farmId,
        image: body.image,
        Date: new Date(body.Date).toISOString(),
      },
    });

    // 2. If emballages are provided
    if (body.emballages && body.emballages.length > 0) {
      // a) Delete old Emballages linked to this product
      await prisma.emballage.deleteMany({
        where: { productId: id },
      });

      // b) Create new Emballages with the given names
      const createPromises = body.emballages.map((emballageName) =>
        prisma.emballage.create({
          data: {
            name: emballageName,
            productId: id, // ✅ link to product
          },
        })
      );

      await Promise.all(createPromises);
    }

    return Response.json(updatedProduct);
  } catch (error) {
    console.error("PUT Error:", error);
    return new Response("Could not update product", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const id = Number(params.id);
  // First, delete all commandes related to this product
  await prisma.commande.deleteMany({
    where: { productId: id },
  });
  await prisma.emballage.deleteMany({
    where: { productId: id },
  });
  // Then, delete the product itself
  await prisma.product.delete({
    where: { id },
  });
  return Response.json({ success: true });
}
