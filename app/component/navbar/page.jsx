"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useSession, signOut, signIn } from "next-auth/react";

const TEXTS = {
  brandName: "Ski agrotour luxe",
  navItems: [
    "About",
    "traditional cheese",
    "animal husbandry",
    "Rates & Fees",
    "order",
  ],
  login: "Login",
  logout: "Logout",
};

export default function AppNavbar({ select }) {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut({ callbackUrl: "/Login" });
      }
    });
  };

  return (
    <header className="bg-white text-black shadow-sm px-6 py-4 z-50 ">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="ACME Logo"
            width={42}
            height={42}
            className="bg-black rounded-lg shadow-md"
          />
          <span className="text-lg font-bold">{TEXTS.brandName}</span>
        </div>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden sm:flex">
          <NavigationMenuList className="flex gap-4">
            {TEXTS.navItems.map((item) => (
              <NavigationMenuItem key={item}>
                <Link
                  href="#"
                  onClick={() => {
                    select(item);
                  }}
                  className="text-sm font-medium text-black hover:text-gray-700"
                >
                  {item}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Login */}
        <div className="hidden sm:block">
          {status === "loading" ? (
            <div className="w-24 h-8 bg-gray-200 rounded animate-pulse" />
          ) : session ? (
            <Button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {TEXTS.logout}
            </Button>
          ) : (
            <Button
              asChild
              variant="default"
              className="bg-black hover:bg-gray-700"
            >
              <Link href="/Login">{TEXTS.login}</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                {open ? "✕" : "≡"}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[70%] p-6">
              <div className="space-y-4">
                {TEXTS.navItems.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <Button
                  asChild
                  className="w-full bg-black hover:bg-gray-700 mt-4"
                >
                  <Link href="#">{TEXTS.login}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
