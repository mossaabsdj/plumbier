"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table/page";
import addmodal from "@/app/component/admin/products/AddProduct/page";
import objects from "@/app/Texts/content.json";
import Viewmodal from "@/app/component/admin/products/ViewProduct/page";
import { fetchData } from "@/lib/FetchData/page"; // Adjust path if needed

const p = await fetchData({ method: "GET", url: "/api/Product" });
console.log("products" + JSON.stringify(p));

const data = objects.Product;

export default function ProductTable() {
  return (
    <>
      <Table AddModel={addmodal} object={p} data={data} ViewModel={Viewmodal} />
    </>
  );
}
