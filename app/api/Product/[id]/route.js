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
    console.log("apidata" + JSON.stringify(body));
    const updatedProduct = await prisma.product.update({
      where: { id },

      data: {
        title: body.title,
        desc: body.desc,
        prix: parseFloat(body.prix),
        emballage: body.emballage,
        farmId: body.farmId,
        image: body.image,
        Date: new Date(body.Date).toISOString(),
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);

    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error.message, // 👈 send error message back to frontend
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
