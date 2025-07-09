"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import data from "@/app/Texts/content.json";
import { useEffect, useState } from "react";

const pageContent = {
  title: "Discover Our Farms",
  description:
    "Discover our fresh, sustainable farms producing the finest fruits, golden honey, creamy dairy, premium aquaculture, and much more—carefully crafted with love, tradition, and respect for nature, just for you.",
  footer: "uiuxmossaab",
  navLinks: [],
  mainImage: { src: "/images/AnimalsHero.png", alt: "Smoothie Bowl" },
  brand: "Ski agrotour luxe",
};

export default function SmoothiePage({ setselectedfarm }) {
  const Farms = data.Farms;
  const farmImages = Object.values(Farms).map((farm) => farm.hero.image);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentimage = farmImages[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === farmImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [farmImages.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        className="w-full max-w-8xl rounded-3xl bg-white shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center p-6 md:p-12 gap-8 flex-wrap">
          {/* Left Section */}
          <motion.div
            className="flex-1 text-left space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className="text-2xl mb-15 md:text-5xl font-bold text-black">
              {pageContent.title}
            </h1>
            <p className="text-black max-w-md mb-10 text-base md:text-lg leading-relaxed">
              {pageContent.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-4 mb-20">
              {farmImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`rounded-full p-1 shadow-md cursor-pointer ${
                      currentimage === image ? "bg-black" : "bg-white"
                    }`}
                    onClick={() => {
                      setCurrentIndex(index);
                      setselectedfarm(image.alt);
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-[-35px] opacity-0 group-hover:opacity-100 z-10 transition-opacity duration-300 bg-black text-white px-3 py-1 rounded-full text-xs shadow-md"
                    onClick={() => {
                      setCurrentIndex(index);
                      setselectedfarm(image.alt);
                    }}
                  >
                    Discover
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex-1 flex justify-center items-center mt-8 md:mt-0 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div
              key={currentIndex}
              whileHover={{ scale: 1.08, rotate: 2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 12 }}
              viewport={{ once: false, amount: 0.3 }}
              className="relative group rounded-full overflow-hidden shadow-2xl bg-white"
            >
              <Image
                src={currentimage.src}
                alt={currentimage.alt}
                width={300}
                height={300}
                className="rounded-full w-[250px] h-[250px] md:w-[350px] md:h-[350px] border-4 border-amber-50 object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-white text-black font-semibold px-5 py-2 rounded-full shadow-lg"
                  onClick={() => setselectedfarm(currentimage.alt)}
                >
                  Discover
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.p
          className="text-lg md:text-2xl text-center mb-6 font-semibold text-black"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {currentimage.alt}
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-3 text-center text-xs md:text-sm text-gray-600"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <span className="inline-flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          {pageContent.brand}
        </span>
      </motion.div>
    </div>
  );
}
