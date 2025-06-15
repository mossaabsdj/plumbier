"use client";
import React, { useState } from "react";

const AddProductModal = ({ open, onClose, onSubmit }) => {
  const initialValues = {
    title: "",
    desc: "",
    prix: 0,
    emballage: "",
  };

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded shadow-lg border border-white max-w-xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Ajouter un Produit
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Titre
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
              required
              placeholder="Nom du produit"
              className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="desc"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <input
              id="desc"
              name="desc"
              type="text"
              value={values.desc}
              onChange={handleChange}
              placeholder="Description du produit"
              className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Prix */}
          <div className="mb-4">
            <label
              htmlFor="prix"
              className="block text-gray-700 font-medium mb-2"
            >
              Prix (DA)
            </label>
            <input
              id="prix"
              name="prix"
              type="number"
              value={values.prix}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="Prix du produit"
              className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Emballage */}
          <div className="mb-4">
            <label
              htmlFor="emballage"
              className="block text-gray-700 font-medium mb-2"
            >
              Emballage
            </label>
            <input
              id="emballage"
              name="emballage"
              type="text"
              value={values.emballage}
              onChange={handleChange}
              placeholder="Type d'emballage"
              className="w-full px-3 py-2 border border-white rounded shadow focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-black text-white py-2 px-4 rounded shadow hover:bg-white hover:text-black border border-black transition"
          >
            Ajouter Produit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
