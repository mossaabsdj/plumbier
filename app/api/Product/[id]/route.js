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
  const r = await request.json();
  const body = r.editValues;
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
    // body.emballageNames should be an array of emballage IDs to link to this product
    if (Array.isArray(body.emballageNames)) {
      // First, disconnect all emballages from this product
      await prisma.emballage.deleteMany({
        where: { productId: id },
      });
      // Then, connect the selected emballages
      await prisma.emballage.createMany({
        data: body.emballageNames.map((name) => ({ name, productId: id })),
      });
    }
    const productWithEmballages = await prisma.product.findUnique({
      where: { id },
      include: { emballages: true },
    });

    return NextResponse.json(productWithEmballages);
  } catch (error) {
    console.error("Update error:", error);

    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return Response.json({ success: true });
}
