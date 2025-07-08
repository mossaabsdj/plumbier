"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table/table";
import addmodal from "@/app/component/admin/products/AddProduct/modal";
import objects from "@/app/Texts/content.json";
import Viewmodal from "@/app/component/admin/products/ViewProduct/page";
import { fetchData } from "@/lib/FetchData/page"; // Adjust path if needed
import LoadingPage from "@/app/component/loading/page";

const data = objects.Product;

export default function ProductTable() {
  const [isloading, setloading] = useState(false);
  const [products, setproduct] = useState([]);

  const Getdata = async () => {
    setloading(true);
    const p = await fetchData({ method: "GET", url: "/api/Product" });
    setproduct(p);
    setloading(false);
  };
  useEffect(() => {
    Getdata();
  }, []);

  return (
    <>
      {isloading && <LoadingPage isVisible={true} />}

      <Table
        AddModel={addmodal}
        object={products}
        data={data}
        ViewModel={Viewmodal}
      />
    </>
  );
}
