"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white py-10 mt-1">
      <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
        {/* 👨‍🔧 Brand Description */}
        <div className="text-center md:text-right md:w-1/3 space-y-2">
          <h3 className="text-2xl font-bold">السباك العصري</h3>
          <p className="text-sm text-orange-100 leading-relaxed">
            نقدم خدمات سباكة موثوقة وسريعة على مدار الساعة بجودة عالية.
          </p>
        </div>

        {/* 🌐 Navigation Links */}
        <div className="flex flex-col md:w-1/3 items-center md:items-center gap-2 text-sm">
          <Link href="/services" className="hover:underline">
            الخدمات
          </Link>
          <Link href="/contact" className="hover:underline">
            اتصل بنا
          </Link>
          <Link href="/about" className="hover:underline">
            من نحن
          </Link>
        </div>

        {/* 📱 Social & Contact Icons */}
        <div className="flex md:w-1/3 justify-center md:justify-end items-center gap-5">
          <a
            href="https://web.facebook.com/yacine.saad.djaballh.2025"
            target="_blank"
            className="hover:text-orange-200"
          >
            <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-orange-200"
          >
            <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="mailto:plumber@gmail.com" className="hover:text-orange-200">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a href="tel:+213542924995" className="hover:text-orange-200">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </div>
      </div>

      {/* 🧾 Copyright */}
      <div className="text-center mt-6 text-orange-100 text-xs px-4">
        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة - السباك العصري
      </div>
    </footer>
  );
}
