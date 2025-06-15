"use client";

import { useState, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const mockProducts = [
  { id: 1, title: "Produit A", desc: "Desc A", prix: 10.5, emballage: "Box" },
  { id: 2, title: "Produit B", desc: "Desc B", prix: 5.2, emballage: "Bag" },
];

export default function ProductTable() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [filtered, setFiltered] = useState(products);

  // Filter products
  useEffect(() => {
    setFiltered(
      products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  // Sort by price
  const handleSort = () => {
    const sorted = [...filtered].sort((a, b) =>
      sortAsc ? a.prix - b.prix : b.prix - a.prix
    );
    setFiltered(sorted);
    setSortAsc(!sortAsc);
  };

  // Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ?",
      text: "Êtes-vous sûr de vouloir supprimer ce produit ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        Swal.fire("Supprimé!", "Le produit a été supprimé.", "success");
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">Produits</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
          <PlusIcon className="w-5 h-5 mr-1" />
          Ajouter
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-1 w-full"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto border rounded-lg shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2 cursor-pointer" onClick={handleSort}>
                Prix
                {sortAsc ? (
                  <ChevronUpIcon className="w-4 h-4 inline ml-1" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4 inline ml-1" />
                )}
              </th>
              <th className="px-4 py-2">Emballage</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-400 italic"
                >
                  Aucun produit trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((product, index) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 border-t border-gray-200"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{product.title}</td>
                  <td className="px-4 py-2">{product.desc}</td>
                  <td className="px-4 py-2 text-blue-700 font-medium">
                    {product.prix.toFixed(2)} DA
                  </td>
                  <td className="px-4 py-2">{product.emballage}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-green-600 hover:underline mr-2">
                      <PencilIcon className="w-5 h-5 inline" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      <TrashIcon className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
