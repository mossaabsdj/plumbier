"use client";
import { useState } from "react";
import { AppSidebar } from "@/app/component/sidebar/page";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ProductPage from "@/app/component/admin/products/page";
import CommandesPage from "@/app/component/admin/commandes/page";
export default function Home({}) {
  const [pagesVisibility, setPagesVisibility] = useState({
    Products: false,
    Commandes: true,
  });
  return (
    <>
      <SidebarProvider>
        <AppSidebar setpagesVisibility={setPagesVisibility} />
        <main>
          <SidebarTrigger />
        </main>
        {pagesVisibility.Products && <ProductPage />}
        {pagesVisibility.Commandes && <CommandesPage />}
      </SidebarProvider>
    </>
  );
}
