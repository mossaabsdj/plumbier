// pages/api/addProduct.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      const result = await prisma.product.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json(result);
    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ error: "Failed to Delete product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
