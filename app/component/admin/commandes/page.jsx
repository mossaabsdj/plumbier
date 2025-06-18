"use client";

import { useState, useEffect } from "react";
import Table from "@/app/component/Table_Com/page";
import objects from "@/app/Texts/content.json";
import addmodal from "@/app/component/admin/products/AddProduct/page";
import Viewmodal from "@/app/component/admin/products/ViewProduct/page";

const commandes = [
  {
    id: 1,
    emballage: "Carton",
    nom: "Benali",
    prenom: "Yasmine",
    region: "Alger",
    adresse: "23 Rue Didouche Mourad",
    mail: "yasmine.benali@example.com",
    num: "+213661234567",
    productId: 1,
    product: {
      id: 1,
      title: "Caméra de Surveillance",
      desc: "HD 1080p avec vision nocturne",
      prix: 12999.99,
      emballage: "Boîte rigide",
      createdAt: new Date(),
    },
    Date: "2025-06-23",
    status: "valider",
  },
  {
    id: 2,
    emballage: "Plastique",
    nom: "Khelifa",
    prenom: "Adel",
    region: "Oran",
    adresse: "Zone industrielle USTO",
    mail: "adel.khelifa@example.com",
    num: "+213779654321",
    productId: 2,
    product: {
      id: 2,
      title: "Ordinateur Portable",
      desc: "Core i7, 16GB RAM, SSD 512GB",
      prix: 165000.0,
      emballage: "Carton",
      createdAt: new Date(),
    },
    Date: "2025-06-23",
    status: "waiting",
  },
  {
    id: 3,
    emballage: "Sachet",
    nom: "Touati",
    prenom: "Sara",
    region: "Tizi Ouzou",
    adresse: "Cité des Oliviers",
    mail: "sara.touati@example.com",
    num: "+213550987654",
    productId: 3,
    product: {
      id: 3,
      title: "Casque Audio",
      desc: "Bluetooth, réduction de bruit",
      prix: 5500.0,
      emballage: "Boîte plastique",
      createdAt: new Date(),
    },
    Date: "2025-06-23",
    status: "valider",
  },
  {
    id: 4,
    emballage: "Carton",
    nom: "Zerrouki",
    prenom: "Walid",
    region: "Annaba",
    adresse: "Quartier Sidi Amar",
    mail: "walid.zerrouki@example.com",
    num: "+213661112233",
    productId: 4,
    product: {
      id: 4,
      title: "Imprimante Laser",
      desc: "Noir et blanc, connectivité Wi-Fi",
      prix: 29900.0,
      emballage: "Carton renforcé",
      createdAt: new Date(),
    },
    Date: "2025-06-23",
    status: "rejeter",
  },
  {
    id: 5,
    emballage: "Boîte",
    nom: "Bouchareb",
    prenom: "Nadia",
    region: "Sétif",
    adresse: "Rue 1er Novembre",
    mail: "nadia.bouchareb@example.com",
    num: "+213699443322",
    productId: 5,
    product: {
      id: 5,
      title: "Chargeur Solaire",
      desc: "Portable, 20000mAh",
      prix: 8700.0,
      emballage: "Boîte éco",
      createdAt: new Date(),
    },
    Date: "2025-06-23",
    status: "valider",
  },
];

const data = objects.Commande;
console.log(JSON.stringify(data.table.columns));
export default function ProductTable() {
  return (
    <>
      <Table
        object={commandes}
        data={data}
        ViewModel={Viewmodal}
        AddModel={addmodal}
      />
    </>
  );
}
