"use client";
import { Skeleton } from "@/components/ui/skeleton"; // if you use shadcn/ui

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef, forwardRef } from "react";
import objects from "@/app/Texts/content.json";
import Footer from "@/app/component/Home/Footer/page";
import Commande from "@/app/component/Home/AddCommande/page";
import React from "react";

const CheesePage = forwardRef(({ FarmData }, refCommande) => {
  const scrollerRef = useRef(null);
  const data = objects.Commande;
  const cheeseVarietiesRef = useRef(null);

  const scrollByCard = (direction = 1) => {
    const container = scrollerRef.current;
    if (!container) return;
    const card = container.querySelector(".product-card");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 32; // gap-8
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };
  const scrollToCheeseVarieties = () => {
    cheeseVarietiesRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  if (!FarmData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-0 px-0">
        {/* Hero Skeleton */}
        <div className="w-full flex justify-center items-center px-4 py-10">
          <div className="w-full max-w-7xl bg-white shadow-2xl rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 w-full">
              <div className="mb-6">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-5/6 mb-2" />
                <Skeleton className="h-6 w-2/3 mb-6" />
              </div>
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
            <div className="flex-shrink-0">
              <Skeleton className="w-40 h-40 md:w-72 md:h-72 rounded-xl" />
            </div>
          </div>
        </div>
        {/* Cheese Varieties Skeleton */}
        <div className="w-full max-w-6xl min-h-[60vh] p-10 flex flex-col items-center justify-center">
          <div className="w-full shadow-lg min-h-[40vh] flex flex-col items-center bg-white p-10">
            <Skeleton className="h-10 w-60 mb-8" />
            <div className="flex gap-8 w-full justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="min-w-[300px] max-w-[350px] bg-gray-50 rounded-xl shadow-md flex flex-col items-center overflow-hidden"
                >
                  <Skeleton className="w-full h-[220px]" />
                  <div className="p-4 w-full">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-5 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-0 px-0  snap-y snap-mandatory">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }} // <-- add this line
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full flex snap-center justify-center items-center px-4 py-10"
      >
        <Card className="w-full max-w-7xl bg-white shadow-2xl rounded-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 w-full">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center md:text-left leading-tight mb-6">
                {FarmData.hero.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 text-justify whitespace-pre-line">
                {FarmData.hero.description}
              </p>
              <div className="flex justify-center md:justify-start">
                <Button
                  onClick={scrollToCheeseVarieties} // 3. Add onClick here
                  className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full shadow-md"
                >
                  {FarmData.hero.button}
                </Button>
              </div>
            </CardContent>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={FarmData.hero.image.src}
              alt={FarmData.hero.image.alt}
              width={FarmData.hero.image.width}
              height={FarmData.hero.image.height}
              className="w-40 h-40 md:w-72 md:h-72 object-cover rounded-xl shadow-lg"
              priority
            />
          </div>
        </Card>
      </motion.div>

      {/* Cheese Varieties Section */}
      <motion.div
        ref={cheeseVarietiesRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }} // <-- add this line
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-6xl snap-start min-h-screen p-10 flex flex-col items-center justify-center"
      >
        <Card className="w-full shadow-lg min-h-[80vh] flex flex-col items-center bg-white p-10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              Cheese Varieties
            </CardTitle>
          </CardHeader>
          <div className="relative w-full">
            {/* Scroll Arrows */}
            <button
              onClick={() => scrollByCard(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full shadow p-2 hidden md:block"
            >
              <svg width="28" height="28" stroke="currentColor" strokeWidth="2">
                <path d="M17 21l-6-7 6-7" />
              </svg>
            </button>

            <div
              ref={scrollerRef}
              className="flex overflow-x-auto gap-8 w-full pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {FarmData.products.map((product) => (
                <div
                  key={product.title}
                  className="product-card group snap-center min-w-[300px] max-w-[350px] bg-gray-50 rounded-xl shadow-md flex flex-col items-center overflow-hidden"
                >
                  <div className="w-full h-[220px] relative">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt}
                      width={product.image.width}
                      height={product.image.height}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-4">
                      <span className="text-white text-sm text-center">
                        {product.description}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center w-full">
                    <h3 className="text-2xl font-bold mb-1">{product.title}</h3>
                    <span className="text-green-700 font-semibold text-lg">
                      {product.prix}
                    </span>
                  </CardContent>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollByCard(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full shadow p-2 hidden md:block"
            >
              <svg width="28" height="28" stroke="currentColor" strokeWidth="2">
                <path d="M11 21l6-7-6-7" />
              </svg>
            </button>
          </div>
          <div className="mt-4 text-gray-400 text-sm">
            ← Scroll for more products →
          </div>
        </Card>
      </motion.div>

      {/* Catering Section */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 80 }} // <-- add this line
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-5xl snap-start min-h-screen flex items-center justify-center"
      >
        <Card className="shadow-lg min-h-[80vh] flex flex-col md:flex-row items-center bg-white p-10 w-full">
          <div className="flex-1 p-8 order-2 md:order-1">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-4xl font-bold mb-4">
                {FarmData.catering.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">
                {FarmData.catering.description}
              </p>
              <Button className="bg-green-700 hover:bg-green-800 text-white">
                {FarmData.catering.button}
              </Button>
            </CardContent>
          </div>
          <div className="flex-1 order-1 md:order-2 flex justify-center items-center">
            <Image
              src={FarmData.catering.image.src}
              alt={FarmData.catering.image.alt}
              width={FarmData.catering.image.width}
              height={FarmData.catering.image.height}
              className="rounded-lg object-cover w-full h-full max-h-[70vh]"
            />
          </div>
        </Card>
      </motion.div>

      {/* Bungalow Section */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }} // <-- add this line
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-5xl snap-end min-h-screen flex items-center justify-center"
      >
        <Card className="shadow-lg min-h-[80vh] flex flex-col md:flex-row items-center bg-white p-10 w-full">
          <div className="flex-1 order-2 md:order-1 flex justify-center items-center">
            <Image
              src={FarmData.bungalow.image.src}
              alt={FarmData.bungalow.image.alt}
              width={FarmData.bungalow.image.width}
              height={FarmData.bungalow.image.height}
              className="rounded-lg object-cover w-full h-full max-h-[70vh]"
            />
          </div>
          <div className="flex-1 p-8 order-1 md:order-2">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-4xl font-bold mb-4">
                {FarmData.bungalow.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">
                {FarmData.bungalow.description}
              </p>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                {FarmData.bungalow.button}
              </Button>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      {/* Commande Section */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }} // <-- add this line
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-5xl snap-start min-h-screen flex items-center justify-center"
      >
        <div
          ref={refCommande}
          className="scroll-mt-34" // Tailwind utility
        >
          <Commande data={data} />
        </div>
      </motion.div>
    </div>
  );
});

export default CheesePage;
