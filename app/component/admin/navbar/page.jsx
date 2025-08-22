"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // ✅ FIXED
import { Button } from "@/components/ui/button";
import Progression from "@/app/component/Proogression/page";

export default function NavbarAdmin({ onNavChange, currentPage }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ FIXED
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

  const navLinks = [
    { label: "الطلبيات", href: "#", highlight: currentPage === "Commandes" },
    { label: "الخدمات", href: "#", highlight: currentPage === "Products" },
    { label: "العملاء", href: "#", highlight: currentPage === "Clients" },
    { label: "الإعدادات", href: "#", highlight: currentPage === "Paramètre" },
  ];

  const adminButton = { label: "لوحة التحكم", href: "/dashboard" };
  const loginButton = { label: "تسجيل الدخول", href: "/login" };

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
              className="rounded-3xl mr-2"
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
                    ? "bg-white text-orange-600 font-bold hover:bg-white text-orange-600 "
                    : "text-white hover:bg-orange-700"
                }`}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Desktop Logout */}
          <div className="hidden sm:block">
            {status === "loading" ? (
              <div className="w-24 h-8 bg-orange-300 animate-pulse rounded" />
            ) : (
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="ml-4 font-semibold bg-white text-red-600 hover:bg-red-100"
              >
                تسجيل الخروج
              </Button>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transition-transform duration-300 transform ${
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
            dir="rtl"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-orange-600 font-bold text-lg">القائمة</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} className="text-orange-600" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 p-4">
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span
                    className={`block w-full text-right p-2 rounded-xl font-semibold ${
                      link.highlight
                        ? "bg-orange-600 text-white"
                        : "text-orange-600 hover:bg-orange-100"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              {session ? (
                <Link
                  href={adminButton.href}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold">
                    {adminButton.label}
                  </Button>
                </Link>
              ) : (
                <Link
                  href={loginButton.href}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Button className="w-full bg-orange-600 text-white hover:bg-orange-700 font-semibold">
                    {loginButton.label}
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
