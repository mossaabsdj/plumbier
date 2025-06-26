import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Get all emballages
export async function GET() {
  try {
    const emballages = await prisma.emballage.findMany({
      include: { products: true }, // Include related products if needed
    });
    return Response.json(emballages);
  } catch (error) {
    console.error("GET error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch emballages" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Create a new emballage
export async function POST(req) {
  try {
    const body = await req.json();
    const emballage = await prisma.emballage.create({
      data: {
        name: body.name,
      },
    });
    return Response.json(emballage);
  } catch (error) {
    console.error("POST error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create emballage" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
