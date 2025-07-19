"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Progression from "@/app/component/Proogression/page";

export default function NavbarAdmin({ onNavChange, currentPage }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const siteTitle = "السباك العصري";

  const navItems = [
    { label: "الطلبيات", value: "Commandes" },
    { label: "الخدمات", value: "Products" },
    { label: "العملاء", value: "Clients" },
    { label: "الإعدادات", value: "Paramètre" },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "هل تريد تسجيل الخروج؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        signOut({ callbackUrl: "/" });
      }
    });
  };

  return (
    <>
      {isLoading && <Progression isVisible={true} />}
      <header className="bg-orange-600 shadow px-6 py-4 text-white">
        <div className="flex justify-between items-center">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-wide">{siteTitle}</h1>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={40}
              className=" rounded-4xl mr-2 lg:scale-140"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-4">
            {navItems.map((item) => (
              <Button
                key={item.value}
                variant={currentPage === item.value ? "default" : "ghost"}
                onClick={() => onNavChange(item.value)}
                className={`rounded-full ${
                  currentPage === item.value
                    ? "bg-white text-orange-600 font-bold"
                    : "text-white hover:bg-orange-700"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          <div>
            {status === "loading" ? (
              <div className="w-24 h-8 bg-orange-300 animate-pulse rounded" />
            ) : (
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="ml-4 bg-white text-red-600 hover:bg-red-100"
              >
                تسجيل الخروج
              </Button>
            )}
          </div>
          {/* Mobile Menu... remains unchanged */}

          {/* Mobile Menu */}
          <div className="sm:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  {open ? "✕" : "≡"}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[70%] p-6">
                <div className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.value}
                      variant={currentPage === item.value ? "default" : "ghost"}
                      onClick={() => {
                        onNavChange(item.value);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}

                  {session ? (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setOpen(false);
                        handleLogout();
                      }}
                      className="mt-4"
                    >
                      تسجيل الخروج
                    </Button>
                  ) : (
                    <Button
                      asChild
                      onClick={() => setOpen(false)}
                      className="bg-orange-600 text-white mt-4"
                    >
                      <Link href="/Login">تسجيل الدخول</Link>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
