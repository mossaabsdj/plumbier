import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return new Response(JSON.stringify({ error: "رقم الهاتف مطلوب" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const commande = await prisma.commande.findFirst({
      where: { phone },
    });

    if (!commande) {
      return new Response(
        JSON.stringify({ message: "لم يتم العثور على أي طلب بهذا الرقم" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ commande }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "حدث خطأ أثناء البحث عن الطلب" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
