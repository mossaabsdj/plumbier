"use client";
import { useState } from "react";
import Header from "@/app/component/navbar/page";
import Footer from "@/app/Footer/page";
import FirstPAge from "@/app/FirstPage/page";
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
      <Footer />
    </>
  );
}
