"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef } from "react";
import objects from "@/app/Texts/content.json";
import Footer from "@/app/component/Home/Footer/page";
import Commande from "@/app/component/Home/AddCommande/page"; // All content in a single object
const cheeseContent = objects.Farms.TraditionalCheese;
export default function CheesePage() {
  const scrollerRef = useRef(null);
  const data = objects.Commande;

  // Scroll handler for arrows
  const scrollByCard = (direction = 1) => {
    const container = scrollerRef.current;
    if (!container) return;
    const card = container.querySelector(".product-card");
    if (!card) return;
    const scrollAmount = card.offsetWidth + 32; // 32px gap-8
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <>
      <div
        className="min-h-screen bg-gray-50 flex flex-col items-center py-0 px-0 overflow-y-scroll snap-y snap-mandatory"
        style={{ height: "100vh" }}
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, exit: { duration: 0.3 } }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-5xl  snap-start min-h-full flex items-center justify-center"
        >
          <Card className="shadow-2xl min-h-[90vh] flex items-center justify-center bg-white w-full">
            <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-8 p-4 md:p-8">
              <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full">
                <CardHeader className="p-0 mb-4 w-full">
                  <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center md:text-left mb-4 leading-tight">
                    {cheeseContent.hero.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 w-full">
                  <p
                    className="text-gray-700 text-lg sm:text-xl md:text-2xl mb-6 text-center md:text-left max-w-xl"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {cheeseContent.hero.description}
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 sm:px-8 sm:py-3 text-base sm:text-xl rounded-full shadow-lg">
                      {cheeseContent.hero.button}
                    </Button>
                  </div>
                </CardContent>
              </div>
              <div className="flex-1 flex items-center justify-center w-full mt-6 md:mt-0">
                <Image
                  src={cheeseContent.hero.image.src}
                  alt={cheeseContent.hero.image.alt}
                  width={cheeseContent.hero.image.width}
                  height={cheeseContent.hero.image.height}
                  className="rounded-2xl shadow-xl object-cover w-full max-w-[340px] h-[180px] sm:h-[220px]"
                  priority
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Gallery Section as Product Scroller */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2, exit: { duration: 0.3 } }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-6xl snap-start min-h-screen p-10 flex flex-col items-center justify-center"
        >
          <Card className=" w-full shadow-lg min-h-[80vh] flex flex-col items-center justify-center bg-white p-10">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-center ">
                Cheese Varieties
              </CardTitle>
            </CardHeader>
            <div className="relative w-full ">
              {/* Left Arrow */}
              <button
                aria-label="Scroll left"
                onClick={() => scrollByCard(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition hidden md:block"
                style={{ border: "1px solid #e5e7eb" }}
              >
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21l-6-7 6-7" />
                </svg>
              </button>
              {/* Product Scroller */}
              <div
                ref={scrollerRef}
                className="flex  overflow-x-auto gap-8 w-full pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {cheeseContent.products.map((product, idx) => (
                  <div
                    key={product.title}
                    className="product-card group snap-center min-w-[350px] max-h-80 max-w-[350px] bg-gray-50 rounded-xl shadow-md flex flex-col items-center relative overflow-hidden"
                  >
                    <div className="w-full h-[220px] overflow-hidden">
                      <Image
                        src={product.image.src}
                        alt={product.image.alt}
                        width={product.image.width}
                        height={product.image.height}
                        className="rounded-t-xl object-cover w-full h-[220px] transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Description overlay on hover */}
                      <div className="absolute left-0 top-0 w-full h-[220px] bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-4">
                        <span className="text-white text-base text-center">
                          {product.description}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 text-center flex flex-col flex-1 w-full">
                      <h3 className="text-2xl font-bold mb-1">
                        {product.title}
                      </h3>
                      {/* Show description only on mobile (no hover) */}

                      <div className="mt-0 pt-0">
                        <span className="text-green-700 font-semibold text-lg">
                          {product.prix}
                        </span>
                      </div>
                    </CardContent>
                  </div>
                ))}
              </div>
              {/* Right Arrow */}
              <button
                aria-label="Scroll right"
                onClick={() => scrollByCard(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full shadow p-2 transition hidden md:block"
                style={{ border: "1px solid #e5e7eb" }}
              >
                <svg
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 21l6-7-6-7" />
                </svg>
              </button>
            </div>
            <div className="w-full flex justify-center mt-4">
              <span className="text-gray-400 text-sm">
                ← Scroll for more products →
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Catering Section - Full Height */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2, exit: { duration: 0.3 } }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-5xl snap-start min-h-screen flex items-center justify-center"
        >
          <Card className="shadow-lg min-h-[80vh] flex flex-col md:flex-row items-center md:items-stretch flex-1 bg-white p-10">
            {/* Text Left */}
            <div className="flex-1 flex flex-col justify-center p-8 order-2 md:order-1">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-4xl font-bold text-left mb-4">
                  {cheeseContent.catering.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p
                  className="text-gray-700 text-lg mb-6"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {cheeseContent.catering.description}
                </p>
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  {cheeseContent.catering.button}
                </Button>
              </CardContent>
            </div>
            {/* Image Right */}
            <div className="flex-1 min-w-[320px] flex items-center justify-center order-1 md:order-2">
              <Image
                src={cheeseContent.catering.image.src}
                alt={cheeseContent.catering.image.alt}
                width={cheeseContent.catering.image.width}
                height={cheeseContent.catering.image.height}
                className="rounded-r-lg object-cover w-full h-full max-h-[70vh]"
                style={{ objectPosition: "center" }}
              />
            </div>
          </Card>
        </motion.div>

        {/* Bungalows Section - Full Height */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2, exit: { duration: 0.3 } }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-5xl snap-start min-h-screen flex items-center justify-center"
        >
          <Card className="shadow-lg min-h-[80vh] flex flex-col md:flex-row items-center md:items-stretch flex-1 bg-white p-10">
            {/* Image Left */}
            <div className="flex-1 min-w-[320px] flex items-center justify-center order-2 md:order-1">
              <Image
                src={cheeseContent.bungalow.image.src}
                alt={cheeseContent.bungalow.image.alt}
                width={cheeseContent.bungalow.image.width}
                height={cheeseContent.bungalow.image.height}
                className="rounded-l-lg object-cover w-full h-full max-h-[70vh]"
                style={{ objectPosition: "center" }}
              />
            </div>
            {/* Text Right */}
            <div className="flex-1 flex flex-col justify-center p-8 order-1 md:order-2">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-4xl font-bold text-left mb-4">
                  {cheeseContent.bungalow.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p
                  className="text-gray-700 text-lg mb-6"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {cheeseContent.bungalow.description}
                </p>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  {cheeseContent.bungalow.button}
                </Button>
              </CardContent>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.8, delay: 0.2, exit: { duration: 0.3 } }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full max-w-5xl snap-start min-h-screen flex items-center justify-center"
        >
          <Commande data={data} />
        </motion.div>
        {/* Order Form Section */}
      </div>
    </>
  );
}

// Add this to your global CSS (e.g., globals.css) for scrollbar hiding:
/*
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
*/
