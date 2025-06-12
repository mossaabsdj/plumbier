"use client";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Button } from "@headlessui/react";
export default async function Admin() {
  const handleAdd = async () => {
    try {
      const r = await fetch("/api/Product/Add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Titel: "Miel",
          Desc: "bon quality",
          Prix: 30,
        }),
      });
      console.log("Product added:", r);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handelDelete = async () => {
    console.log("here");
    const r = await prisma.admin
      .create({
        data: {
          User: "mossaabsdj",
          Password: "sdj123",
        },
      })
      .catch((e) => {
        throw e;
      });
  };
  const handelModify = () => {};
  return (
    <>
      <Button
        style={{ background: "black", width: 200, height: 200 }}
        onClick={handleAdd}
      ></Button>
    </>
  );
}
