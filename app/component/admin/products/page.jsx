"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table/page";
import addmodal from "@/app/component/admin/products/AddProduct/page";
import objects from "@/app/Texts/content.json";
import Viewmodal from "@/app/component/admin/products/ViewProduct/page";
const products = [
  {
    id: 1,
    title: "Tomatoes",
    desc: "Fresh organic tomatoes from local farm",
    prix: 2.5,
    emballage: "Box of 1kg",
    image: "https://example.com/images/tomatoes.jpg", // 🔴 Replace with your actual URL
    farmId: 1,
    farm: "Green Valley Farm",
    commandes: [],
    Date: "2025-06-23",
  },
  {
    id: 2,
    title: "Olive Oil",
    desc: "Cold-pressed extra virgin olive oil",
    prix: 10.0,
    emballage: "Bottle of 750ml",
    image: "https://example.com/images/olive-oil.jpg", // 🔴 Replace with your actual URL
    farmId: 2,
    farm: "Green Valley Farm",
    commandes: [],
    Date: "2025-06-10",
  },
  {
    id: 3,
    title: "Eggs",
    desc: "Free-range eggs",
    prix: 1.8,
    emballage: "Box of 12",
    image: "https://example.com/images/eggs.jpg", // 🔴 Replace with your actual URL
    farm: "Green Valley Farm",
    commandes: [],
    Date: "2025-06-20",
  },
];

const data = objects.Product;

export default function ProductTable() {
  return (
    <>
      <Table
        AddModel={addmodal}
        object={products}
        data={data}
        ViewModel={Viewmodal}
      />
    </>
  );
}
