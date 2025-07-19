"use client";
import { useState } from "react";
import Header from "@/app/component/admin/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import CommandesPage from "@/app/component/admin/commandes/page";
import ParametrePage from "@/app/component/admin/parametre/page";

export default function Admin() {
  const [currentPage, setCurrentPage] = useState("Commandes");

  return (
    <>
      <Header onNavChange={setCurrentPage} currentPage={currentPage} />

      {currentPage === "Commandes" && <CommandesPage />}
      {currentPage === "Paramètre" && <ParametrePage />}
      <Footer />
    </>
  );
}
