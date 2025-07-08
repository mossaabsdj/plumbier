"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const data = [
  { name: "Product A", commandes: 12 },
  { name: "Product B", commandes: 8 },
  { name: "Product C", commandes: 5 },
  { name: "Product D", commandes: 15 },
];
import { fetchData } from "@/lib/FetchData/page";

import LoadingPage from "@/app/component/loading/page";
export default function CommandeStats({
  Display,
  onClose, // Pass a function to control modal visibility
}) {
  const [totalCommandes, setTotalCommandes] = useState(0);
  const [loading, setloading] = useState(false);
  const [commandesParProduit, setcommandesParProduit] = useState([]);
  const [commandesParRegion, setcommandesParRegion] = useState([]);

  const fetchTotalCommande = async () => {
    const C = await fetchData({ method: "GET", url: "/api/Commande/stats" });
    setTotalCommandes(C.totalCommandes);
    setcommandesParProduit(C.commandesByProduct);
    setcommandesParRegion(C.commandesByRegion);
    console.log(JSON.stringify(C));
  };

  useEffect(() => {
    setloading(true);
    fetchTotalCommande();
    setloading(false);
  }, []);
  if (!Display) return null;

  return (
    <>
      {loading && <LoadingPage isVisible={true} />}{" "}
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30 p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Title */}
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Statistiques des Commandes
          </h2>

          {/* Total Commandes */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-2xl shadow-md mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Total Commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-blue-600 text-center">
                  {totalCommandes}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commandes par Produit */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-700">
                  Commandes par Produit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={commandesParProduit}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="commandes"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
