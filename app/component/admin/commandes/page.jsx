"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table_Com/table";
import objects from "@/app/Texts/content.json";
import addmodal from "@/app/component/admin/commandes/AddCommande/modal";
import { fetchData } from "@/lib/FetchData/page";
import LoadingPage from "@/app/component/loading/page";

export default function ProductTable() {
  const [isloading, setloading] = useState(false);

  const [object, setObject] = useState([]);
  const data = objects.Commande;

  // Fetch on initial load
  const loadData = async () => {
    setloading(true);
    const C = await fetchData({ method: "GET", url: "/api/Commande" });
    setObject(C);
    setloading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Pass loadData to child so it can refresh when needed
  return (
    <>
      {isloading && <LoadingPage isVisible={true} />}

      <Table objects={object} data={data} AddModel={addmodal} />
    </>
  );
}
