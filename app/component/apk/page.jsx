"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AppMobile from "@/public/images/mobile.PNG"; // Mobile screenshot
import AppTablet from "@/public/images/mobile.PNG"; // Tablet screenshot

export default function PlumberLanding() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-orange-500 overflow-hidden px-4 md:px-12">
      {/* Background animated shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-orange-400 rounded-full opacity-50 top-10 left-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-60 h-60 bg-orange-600 rounded-full opacity-40 bottom-20 right-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col p-10 md:flex-row items-center justify-between max-w-6xl w-full gap-12"
      >
        {/* Text section */}
        <div className="flex flex-col items-end text-right max-w-md space-y-4">
          <h1 className="text-white text-5xl md:text-6xl font-bold drop-shadow-lg">
            اكتشف تطبيق السباك الجديد
          </h1>
          <p className="text-white text-lg drop-shadow-md">
            احجز خدمات السباكة بسرعة وسهولة. سهل، سريع، وموثوق!
          </p>

          <ul className="text-white list-disc list-inside space-y-1 drop-shadow-md">
            <li>طلب خدمة سباكة في دقائق</li>
            <li>تتبع حالة الطلب مباشرة</li>
            <li>حل مشاكل السباكة فوراً</li>
            <li>متوفر على جميع أجهزة الأندرويد</li>
          </ul>

          {/* Download badges */}
          <div className="flex gap-4 mt-4"></div>

          {/* CTA button */}
          <motion.a
            href="https://drive.google.com/file/d/1W9_6aIOSzbUSmz8VD8OHgg5CYRShbv3u/view?usp=drive_link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-orange-500 font-bold px-8 py-3 rounded-full shadow-lg mt-6"
          >
            حمل الآن
          </motion.a>
        </div>

        {/* Image section */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center md:items-start gap-6"
        >
          {/* Mobile */}
          <div className="block md:hidden">
            <Image
              src={AppMobile}
              alt="تطبيق السباك - موبايل"
              width={400}
              height={400}
              className="rounded-xl "
            />
          </div>
          {/* Tablet/Desktop */}
          <div className="hidden md:block">
            <Image
              src={AppTablet}
              alt="تطبيق السباك - تابلت"
              width={400}
              height={600}
              className="rounded-xl l"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
