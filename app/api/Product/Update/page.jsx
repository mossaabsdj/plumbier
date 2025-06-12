// pages/api/addProduct.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, Title, Desc, Prix } = req.body;

    try {
      const product = await prisma.product.update({
        where: {
          id: id,
        },
        data: {
          Title,
          Desc,
          Prix: Number(Prix),
        },
      });

      res.status(200).json(product);
    } catch (error) {
      console.error("API error:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
