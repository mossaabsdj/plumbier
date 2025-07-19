"use client";
import Image from "next/image";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { User, LogOut } from "lucide-react"; // Icons
import { useSession, signOut, signIn } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";

import Progression from "@/app/component/Proogression/page";

export default function Header({ select }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectPage, setPage] = useState("الرئيسية");
  const siteTitle = "السباك العصري";

  const navLinks = [
    { label: "الرئيسية", href: "" },
    { label: "الخدمات", href: "" },
    { label: "اتصل بنا", href: "" },
  ];

  const adminButton = {
    label: "لوحة الإدارة",
    href: "/DashBoard",
  };
  const loginButton = {
    label: "تسجيل الدخول",
    href: "/Login",
  };
  const logoutButton = {
    label: "تسجيل االخروج",
    href: "/",
  };
  const DashBoardButton = { label: "لوحة التحكم", href: "/DashBoard" };
  const colors = {
    background: "bg-orange-600",
    text: "text-white",
    highlight: "bg-white text-orange-600",
    button: "bg-white text-orange-600 hover:bg-orange-100",
  };

  // Prevent scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);
  const handleLogout = () => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم تسجيل خروجك.",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoading(true);

        signOut({ callbackUrl: "/" });
        setIsLoading(false);
      }
    });
  };
  return (
    <>
      {isLoading && <Progression isVisible={true} />}

      <header
        className={` overflow-x-hidden ${colors.background} ${colors.text} py-4 px-4 md:px-6 shadow-md`}
      >
        <div className="container mx-auto flex items-center justify-between">
          {/* 🧱 Site Logo */}
          <div className="flex">
            <h1 className="text-2xl font-bold tracking-wide">{siteTitle}</h1>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={60}
              height={40}
              className=" rounded-4xl mr-2 lg:scale-140"
            />
          </div>

          {/* 🧭 Navigation - Desktop Only */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => {
                  select(link.label);
                }}
              >
                <span
                  className={`p-2 rounded-3xl font-semibold transition ${
                    link.label === selectPage
                      ? colors.highlight
                      : "hover:scale-110"
                  }`}
                >
                  {link.label}
                </span>
              </button>
            ))}
          </nav>

          {/* 🧮 Admin Button - Desktop */}
          <div className="hidden lg:block">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="font-semibold bg-white text-orange-600 border-0 hover:bg-orange-400 hover:text-white transition"
                  >
                    {"Admin"}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white shadow-lg rounded-xl border border-gray-200"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      setIsLoading(true); // Start loading
                    }}
                    className="flex items-center gap-2 text-black font-medium hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <User className="w-4 h-4 text-black" />
                    <span>{DashBoardButton.label}</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 font-semibold hover:bg-red-100 px-3 py-2 rounded-lg cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>{logoutButton.مشلاثم}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                onClick={() => {
                  setIsLoading(true);
                }}
                href={loginButton.href}
              >
                <Button
                  className={`${colors.button} font-semibold hidden lg:inline-flex`}
                >
                  {loginButton.label}
                </Button>
              </Link>
            )}
          </div>

          {/* 📱 Mobile Menu Icon */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* 🌒 Backdrop overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 📋 Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
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
      </header>
    </>
  );
}
