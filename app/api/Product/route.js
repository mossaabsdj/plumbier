import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
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
    const data = await req.json();
    const product = await prisma.product.create({ data });
    return Response.json(product);
  } catch (error) {
    console.error("POST error:", error);
    return new Response(JSON.stringify({ error: "Failed to create product" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
