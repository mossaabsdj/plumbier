"use client";
import { useState } from "react";
import { AppSidebar } from "@/app/component/sidebar/page";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/app/component/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import ProductPage from "@/app/component/admin/products/page";
import CommandesPage from "@/app/component/admin/commandes/page";
export default function Admin() {
  const [pagesVisibility, setPagesVisibility] = useState({
    Products: true,
    Commandes: false,
  });
  return (
    <>
      <Header />

      <SidebarProvider>
        <AppSidebar setpagesVisibility={setPagesVisibility} />
        <main>
          <SidebarTrigger />
        </main>
        {pagesVisibility.Products && <ProductPage />}
        {pagesVisibility.Commandes && <CommandesPage />}
      </SidebarProvider>
      <Footer />
    </>
  );
}
