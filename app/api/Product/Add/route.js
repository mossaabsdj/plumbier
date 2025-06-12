import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { Title, Desc, Prix } = await request.json();

    const product = await prisma.product.create({
      data: {
        Title,
        Desc,
        Prix: Number(Prix),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
