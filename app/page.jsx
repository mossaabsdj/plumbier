"use client";
import { useState } from "react";
import Header from "@/app/header/page";
import Footer from "@/app/Footer/page";

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
      <h1>home</h1>
      <Footer />
    </>
  );
}
