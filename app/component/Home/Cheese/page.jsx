"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRef } from "react";

// All content in a single object
const cheeseContent = {
  hero: {
    title: "Traditional Cheese",
    description: `Discover the authentic taste of our traditional cheese,
crafted with passion and expertise from the finest local milk.
Our cheese is aged to perfection, offering a rich flavor and
creamy texture that reflects our region’s heritage.`,
    button: "Discover Our Farm",
    image: {
      src: "/images/cheese-hero.jpg",
      alt: "Traditional Cheese",
      width: 340,
      height: 220,
    },
  },
  products: [
    {
      title: "Goat Cheese",
      description: `Soft, tangy, and perfect for salads or as a spread.
Our goat cheese is made from the freshest milk and is a
favorite among cheese lovers for its creamy texture and
distinctive flavor.
Try it with honey or fresh herbs for a delightful snack.`,
      image: {
        src: "/images/cheese1.jpg",
        alt: "Goat Cheese",
        width: 350,
        height: 220,
      },
    },
    {
      title: "Aged Tomme",
      description: `Firm and nutty, aged for a deep, complex flavor.
Our Tomme is matured for several months, developing a robust
character and a subtle aroma that pairs well with rustic
bread and wine.`,
      image: {
        src: "/images/cheese2.jpg",
        alt: "Aged Tomme",
        width: 350,
        height: 220,
      },
    },
    {
      title: "Fresh Ricotta",
      description: `Creamy and delicate, ideal for desserts and pastries.
Our ricotta is made daily and is perfect for both sweet and
savory recipes, from cheesecakes to stuffed pasta.`,
      image: {
        src: "/images/cheese3.jpg",
        alt: "Fresh Ricotta",
        width: 350,
        height: 220,
      },
    },
  ],
  catering: {
    title: "Catering Services",
    description: `Enjoy our authentic catering services for your events and
gatherings.

We offer a variety of traditional dishes, fresh cheeses, and
local specialties, all prepared with care and delivered to your
venue.

Whether it's a wedding, corporate event, or family celebration,
our team ensures a memorable culinary experience with the best
of our region's flavors.`,
    button: "Contact Catering",
    image: {
      src: "/images/catering.jpg",
      alt: "Catering",
      width: 500,
      height: 350,
    },
  },
  bungalow: {
    title: "Stay in Our Bungalows",
    description: `Experience comfort and tranquility in our cozy bungalows,
surrounded by nature.

Perfect for families, couples, or solo travelers looking for a
peaceful retreat with a taste of rural life.

Each bungalow is fully equipped and offers stunning views of the
countryside, ensuring a relaxing and memorable stay.`,
    button: "Book a Bungalow",
    image: {
      src: "/images/bungalow.jpg",
      alt: "Bungalow",
      width: 500,
      height: 350,
    },
  },
};

export default function CheesePage() {
  const scrollerRef = useRef(null);

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
        className="w-full max-w-3xl snap-start min-h-screen flex items-center justify-center"
      >
        <Card className="shadow-2xl min-h-[70vh] flex items-center justify-center bg-white w-full">
          <div className="flex flex-row items-center justify-center w-full h-full gap-8 p-8">
            <div className="flex-1 flex flex-col items-center md:items-start justify-center">
              <CardHeader className="p-0 mb-4 w-full">
                <CardTitle className="text-5xl font-extrabold text-center md:text-left mb-4 leading-tight">
                  {cheeseContent.hero.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 w-full">
                <p
                  className="text-gray-700 text-2xl mb-6 text-center md:text-left max-w-xl"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {cheeseContent.hero.description}
                </p>
                <div className="flex justify-center md:justify-start">
                  <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 text-xl rounded-full shadow-lg">
                    {cheeseContent.hero.button}
                  </Button>
                </div>
              </CardContent>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <Image
                src={cheeseContent.hero.image.src}
                alt={cheeseContent.hero.image.alt}
                width={cheeseContent.hero.image.width}
                height={cheeseContent.hero.image.height}
                className="rounded-2xl shadow-xl object-cover w-full h-[220px] max-w-[340px]"
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
        className="w-full max-w-6xl snap-start min-h-screen flex flex-col items-center justify-center"
      >
        <Card className="w-full shadow-lg min-h-[60vh] flex flex-col items-center justify-center bg-white p-10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center mb-8">
              Cheese Varieties
            </CardTitle>
          </CardHeader>
          <div className="relative w-full">
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
              className="flex overflow-x-auto gap-8 w-full pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {cheeseContent.products.map((product, idx) => (
                <div
                  key={product.title}
                  className="product-card snap-center min-w-[350px] max-w-[350px] bg-gray-50 rounded-xl shadow-md flex flex-col items-center"
                >
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    width={product.image.width}
                    height={product.image.height}
                    className="rounded-t-xl object-cover w-full h-[220px]"
                  />
                  <CardContent className="p-6 text-center">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p
                      className="text-gray-500 text-base"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {product.description}
                    </p>
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
          <div className="flex-1 flex flex-col justify-center p-8">
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
          <div className="flex-1 min-w-[320px] flex items-center justify-center">
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
    </div>
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
