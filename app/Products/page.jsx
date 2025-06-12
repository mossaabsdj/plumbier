import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function () {
  const products = await prisma.product.findMany();
  console.log(products);
  return (
    <>
      {products.map((p) => {
        <h1>{p.Title}</h1>;
      })}
    </>
  );
}
