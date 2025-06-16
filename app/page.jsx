"use client";
import { useState } from "react";
import Header from "@/app/component/navbar/page";
import Footer from "@/app/component/Home/Footer/page";
import FirstPAge from "@/app/component/Home/FirstPage/page";
import ProductList from "@/app/component/Home/ProductsList/page";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <>
      <Header />
      <FirstPAge />
      <ProductList />
      <Footer />
    </>
  );
}
