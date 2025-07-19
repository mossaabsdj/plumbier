"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { select } from "@heroui/theme";

export default function PlumberLandingPage({ Select }) {
  const title = "خدمات سباكة موثوقة وسريعة";
  const description =
    "نحن نقدم حلول سباكة احترافية تشمل إصلاح التسربات، تركيب الأدوات الصحية، وخدمات الطوارئ 24/7. فريقنا مؤهل وجاهز لخدمتك بكل احترافية.";

  const services = [
    "تركيب الغاز",
    "تركيب المياه",
    "إصلاح التسربات",
    "تسليك المجاري",
  ];

  const features = [
    { icon: "✅", label: "جودة عالية" },
    { icon: "⚡", label: "استجابة سريعة" },
    { icon: "👷‍♂️", label: "خبرة عالية" },
    { icon: "🕐", label: "خدمة في الوقت" },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white px-6 py-12 overflow-x-hidden"
    >
      {/* قسم البطل */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* ✅ النصوص + الأزرار */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-right space-y-6 flex flex-col justify-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600">
            {title}
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">{description}</p>

          <button
            onClick={() => {
              Select("Form");
            }}
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition w-fit self-start"
          >
            احجز الخدمة الآن
          </button>

          {/* أزرار الخدمات */}
          <div className="mt-9 flex flex-wrap gap-4 justify-center">
            {services.map((field, idx) => (
              <button
                key={idx}
                disabled
                className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed text-sm"
              >
                {field}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ✅ صورة السباك واللوجو المتحرك خلفها */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative w-full md:w-1/2 flex justify-center items-center min-h-[500px]"
        >
          {/* 🔁 Logo Behind with Infinite Animation */}
          <motion.div
            animate={{ y: [0, -20, 0] }} // 👈 Up and down animation
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-5 top-[20%] right-[15%]  sm:top-[20%] sm:left-[10%]"
          >
            <Image
              src="/images/logo.png"
              alt="Logo Behind"
              width={150}
              height={150}
              className="opacity-100"
            />
          </motion.div>

          {/* زخرفة SVG خلفية */}
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] z-0"
            viewBox="0 0 700 700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFE0B2"
              d="M482,369Q453,488,336.5,470.5Q220,453,169.5,364Q119,275,180.5,194.5Q242,114,343.5,111Q445,108,478,179Q511,250,482,369Z"
            />
          </svg>

          {/* صورة السباك */}
          <Image
            src="/plumber.png"
            alt="سباك محترف"
            width={480}
            height={480}
            className="relative z-10"
            priority
          />
        </motion.div>
      </div>

      {/* ✅ شريط المزايا في الأسفل */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        {features.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <span className="text-3xl">{item.icon}</span>
            <span className="text-sm text-gray-700 font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </main>
  );
}
