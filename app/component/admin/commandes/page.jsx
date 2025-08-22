"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table_Com/table";
import objects from "@/app/Texts/content.json";
import addmodal from "@/app/component/admin/commandes/AddCommande/modal";
import { fetchData } from "@/lib/FetchData/page";
import LoadingPage from "@/app/component/loading/page";
import { RotateCcw } from "lucide-react"; // Icon
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { motion } from "framer-motion"; // For animation

export default function ProductTable() {
  const [isloading, setloading] = useState(false);
  const [object, setObject] = useState([]);
  const data = objects.Commande;

  const loadData = async () => {
    setloading(true);
    try {
      const C = await fetchData({ method: "GET", url: "/api/Commande" });
      setObject(C);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setloading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="relative w-full">
      {isloading && <LoadingPage isVisible={true} />}

      {/* Absolute Positioned Refresh Button */}
      <Button
        onClick={loadData}
        disabled={isloading}
        className="absolute top-15 right-10 flex items-center justify-center bg-orange-500 hover:bg-orange-700 text-white shadow-lg rounded-full p-3 transition"
      >
        <motion.div
          animate={isloading ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            repeat: isloading ? Infinity : 0,
            duration: 1,
            ease: "linear",
          }}
        >
          <RotateCcw size={22} />
        </motion.div>
      </Button>

      <Table objects={object} data={data} AddModel={addmodal} />
    </div>
  );
}
