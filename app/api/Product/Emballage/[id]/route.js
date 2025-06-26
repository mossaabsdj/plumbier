import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const emballage = await prisma.emballage.findUnique({
      where: { id: Number(params.id) },
      include: { products: true },
    });
    if (!emballage) {
      return new Response(JSON.stringify({ error: "Emballage not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return Response.json(emballage);
  } catch (error) {
    console.error("GET error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch emballage" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await prisma.emballage.delete({
      where: { id: Number(params.id) },
    });
    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete emballage" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
