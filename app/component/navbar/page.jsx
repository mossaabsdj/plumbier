"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import Image from "next/image";

// === Constants ===
const TEXTS = {
  brandName: "ACME",
  menuButtonOpen: "≡",
  menuButtonClose: "✕",
  menuButtonAriaOpen: "Open menu",
  menuButtonAriaClose: "Close menu",
  navItems: ["About", "Products", "International", "Rates & Fees", "Contact"],

  login: "Login",
};

const COLORS = {
  navbarBg: "bg-white",
  navbarText: "text-black",
  hoverText: "hover:text-gray-700",
  loginBg: "bg-black",
  loginHover: "hover:bg-gray-700",
  menuBg: "bg-white",
  menuText: "text-black",
  menuShadow: "shadow-lg",
};

// === Logo Component ===
export const AcmeLogo = () => {
  return (
    <div className="flex items-center gap-02 ">
      <Image
        src="/images/logo.jpg"
        width={42}
        height={42}
        alt="ACME Logo"
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

// === Main Component ===
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        aria-label={
          isMenuOpen ? TEXTS.menuButtonAriaClose : TEXTS.menuButtonAriaOpen
        }
        className="absolute top-2 left-0 sm:hidden flex items-center justify-center  w-10 h-10 bg-white text-black rounded-xl transition-all duration-300 "
      >
        <span className="text-2xl font-bold">
          {isMenuOpen ? TEXTS.menuButtonClose : TEXTS.menuButtonOpen}
        </span>
      </button>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className={`${COLORS.navbarBg} ${COLORS.navbarText} px-8 mx-0   mt-2 w-full z-10000000 `}
      >
        <NavbarContent>
          <NavbarBrand>
            <AcmeLogo />
            <p className="ml-2 font-bold text-lg text-black">
              {TEXTS.brandName}
            </p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {TEXTS.navItems.map((text, idx) => (
            <NavbarItem key={text} isActive={text === "Products"}>
              <Link
                href="#"
                className={`text-black ${
                  text !== "Products" ? COLORS.hoverText : ""
                }`}
              >
                {text}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="">
            <Link
              href="#"
              className={`text-white ${COLORS.loginBg} ${COLORS.loginHover} rounded-md px-3 py-2 text-sm font-semibold`}
            >
              {TEXTS.login}
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu
          className={`
           absolute top-13.5 right-4 z-0
    ${COLORS.menuBg} ${COLORS.menuText}
    px-4 py-7 rounded-b-2xl  shadow-2xl
    max-w-[60%] max-h-[90%] overflow-y-auto
            transition-all duration-300 ease-out
    ${
      isMenuOpen
        ? "scale-100 opacity-100"
        : "scale-95 opacity-0 pointer-events-none"
    }
  `}
        >
          {TEXTS.navItems.map((item, index) => (
            <NavbarMenuItem className="mb-2 last:mb-0" key={`${item}-${index}`}>
              <Link
                href="#"
                className="block w-full px-4 py-4 rounded-xl bg-gray-100 hover:bg-gray-300 hover:text-black  font-medium"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
