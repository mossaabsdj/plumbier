"use client";

import { Button } from "@headlessui/react";

export default function Admin() {
  const handleAdd = async () => {
    try {
      const r = await fetch("/api/Product/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          Titel: "Miel",
          Desc: "bon quality",
          Prix: 30.0,
        }),
      });
      console.log("Product added:", await r.json());
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const r = await fetch("/api/Product/add", {
        method: "POST",
      });
      console.log("Admin created:", await r.json());
    } catch (err) {
      console.error("Error creating admin:", err);
    }
  };

  return (
    <>
      <Button
        style={{ background: "black", width: 200, height: 200 }}
        onClick={handleAdd}
      >
        Add Product
      </Button>
      <Button
        style={{ background: "red", width: 200, height: 200 }}
        onClick={handleDelete}
      >
        Add Admin
      </Button>
    </>
  );
}
