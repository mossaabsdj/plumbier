"use client";

import React, { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button, Input } from "@heroui/react";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [commandes, setCommandes] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    emballage: "",
    prix: 0.0,
  });

  const fetchAll = async () => {
    const prod = await fetch("/api/Product").then((res) => res.json());
    const comm = await fetch("/api/Commande").then((res) => res.json());
    const stat = await fetch("/api/Commande/stats").then((res) => res.json());
    setProducts(prod);
    setCommandes(comm);
    setStats(stat);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteItem = async (type, id) => {
    const confirmed = await Swal.fire({
      title: "Confirm delete?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirmed.isConfirmed) return;
    await fetch(`/api/${type}/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      prix: parseFloat(form.prix),
    };

    await fetch("/api/Product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setForm({ title: "", desc: "", emballage: "", prix: 0.0 });
    setShowModal(false);
    fetchAll();
  };
  const [commandeSearch, setCommandeSearch] = useState("");
  const [commandeSortColumn, setCommandeSortColumn] = useState("nom");
  const [commandeSortDirection, setCommandeSortDirection] = useState("asc");

  const sortedFilteredCommandes = commandes
    .filter((c) =>
      `${c.nom} ${c.prenom} ${c.region}`
        .toLowerCase()
        .includes(commandeSearch.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[commandeSortColumn] ?? "";
      const valB = b[commandeSortColumn] ?? "";
      if (valA < valB) return commandeSortDirection === "asc" ? -1 : 1;
      if (valA > valB) return commandeSortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const toggleCommandeSort = (column) => {
    if (commandeSortColumn === column) {
      setCommandeSortDirection(
        commandeSortDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setCommandeSortColumn(column);
      setCommandeSortDirection("asc");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧾 Dashboard</h1>
      <div className="flex gap-4 mb-6 border-b pb-2">
        <Button
          onClick={() => setActiveTab("products")}
          className={`${
            activeTab === "products"
              ? "bg-green-500 text-white"
              : "bg-green-100 text-green-800"
          }`}
        >
          🛒 Products
        </Button>
        <Button
          onClick={() => setActiveTab("commandes")}
          className={`${
            activeTab === "commandes"
              ? "bg-blue-500 text-white"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          📦 Commandes
        </Button>
        <Button
          onClick={() => setActiveTab("stats")}
          className={`${
            activeTab === "stats"
              ? "bg-purple-500 text-white"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          📊 Stats
        </Button>
      </div>

      {activeTab === "products" && (
        <>
          <div className="mb-4 flex justify-end">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-green-600 text-white hover:bg-green-700"
              startContent={<PlusIcon className="h-4 w-4" />}
            >
              Add Product
            </Button>
          </div>
          {products.length === 0 ? (
            <p className="text-gray-500">No products to display.</p>
          ) : (
            <Table aria-label="Product Table">
              <TableHeader>
                <TableColumn>Title</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Emballage</TableColumn>
                <TableColumn>Prix</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.title}</TableCell>
                    <TableCell>{p.desc}</TableCell>
                    <TableCell>{p.emballage}</TableCell>
                    <TableCell>{p.prix.toFixed(2)} DZD</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          color="warning"
                          variant="light"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          color="danger"
                          variant="light"
                          onClick={() => deleteItem("products", p.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}

      {activeTab === "commandes" && (
        <>
          {commandes.length === 0 ? (
            <p className="text-gray-500">No commandes to display.</p>
          ) : (
            <Table aria-label="Commandes Table">
              <TableHeader>
                <TableColumn>Nom</TableColumn>
                <TableColumn>Prénom</TableColumn>
                <TableColumn>Région</TableColumn>
                <TableColumn>Téléphone</TableColumn>
                <TableColumn>Produit</TableColumn>
                <TableColumn>Emballage</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {commandes.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.nom}</TableCell>
                    <TableCell>{c.prenom}</TableCell>
                    <TableCell>{c.region}</TableCell>
                    <TableCell>{c.num}</TableCell>
                    <TableCell>{c.product?.title}</TableCell>
                    <TableCell>{c.emballage}</TableCell>
                    <TableCell>
                      <Button
                        isIconOnly
                        size="sm"
                        color="danger"
                        variant="light"
                        onClick={() => deleteItem("commandes", c.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      )}

      {activeTab === "stats" && (
        <div className="bg-purple-50 border border-purple-200 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-purple-800">
            <ChartBarIcon className="h-5 w-5" /> Commande Stats
          </h2>
          <p>
            Total Commandes:{" "}
            <strong className="text-purple-700">
              {stats?.totalCommandes || 0}
            </strong>
          </p>
          <div className="mt-4">
            <h3 className="font-semibold text-purple-600">By Region:</h3>
            <ul className="text-sm">
              {stats?.commandesByRegion.map((r, i) => (
                <li key={i}>
                  {r.region}: {r._count}
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mt-2 text-purple-600">By Product:</h3>
            <ul className="text-sm">
              {stats?.commandesByProduct.map((p, i) => (
                <li key={i}>
                  Product #{p.productId}: {p._count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-50 p-6 rounded shadow-xl w-[90%] max-w-md relative">
            <Button
              isIconOnly
              variant="light"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </Button>
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              Add New Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <Input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <Input
                type="text"
                placeholder="Description"
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
              <Input
                type="text"
                placeholder="Emballage"
                value={form.emballage}
                onChange={(e) =>
                  setForm({ ...form, emballage: e.target.value })
                }
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Prix"
                value={form.prix}
                onChange={(e) => setForm({ ...form, prix: e.target.value })}
              />
              <Button type="submit" className="bg-green-600 text-white w-full">
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
