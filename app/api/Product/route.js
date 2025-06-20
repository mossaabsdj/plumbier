import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        farm: true, // Include related farm
      },
    });
    return Response.json(products);
  } catch (error) {
    console.error("GET error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        title: body.title,
        desc: body.desc,
        prix: parseFloat(body.prix), // ✅ convert string to float
        emballage: body.emballage,
        image: body.image,
        farmId: parseFloat(body.farm),
      },
    });
    return Response.json(product);
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
