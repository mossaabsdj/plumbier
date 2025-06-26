"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table_Com/page";
import objects from "@/app/Texts/content.json";
import addmodal from "@/app/component/admin/commandes/AddCommande/page";
import Viewmodal from "@/app/component/admin/commandes/ViewCommande/page";
import { fetchData } from "@/lib/FetchData/page";

export default function ProductTable() {
  const [object, setObject] = useState([]);
  const data = objects.Commande;

  // Fetch on initial load
  const loadData = async () => {
    const C = await fetchData({ method: "GET", url: "/api/Commande" });
    setObject(C);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Pass loadData to child so it can refresh when needed
  return (
    <>
      <Table
        objects={object}
        data={data}
        ViewModel={Viewmodal}
        AddModel={addmodal}
      />
    </>
  );
}
