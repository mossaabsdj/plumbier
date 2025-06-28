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
    // Update the product fields
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
    // body.emballageNames should be an array of emballage ID
    if (body.emballageNames && body.emballageNames.length > 0) {
      // First, delete existing emballage relations
      await prisma.emballageOnProduct.deleteMany({
        where: { productId: id },
      });
      // Then, create new relations for each emballage ID
      for (const emballageId of body.emballageNames) {
        await prisma.emballageOnProduct.create({
          data: {
            productId: id,
            emballageId,
          },
        });
      }
    }
    return Response.json(updatedProduct);
  } catch (error) {
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
