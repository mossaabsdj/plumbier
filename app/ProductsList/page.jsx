"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const products = [
  { name: "Classic Shirt", price: 29.99, image: "/products/shirt.jpg" },
  { name: "Sport Shoes", price: 59.99, image: "/products/shoes.jpg" },
  { name: "Leather Watch", price: 149.99, image: "/products/watch.jpg" },
  { name: "Backpack", price: 89.99, image: "/products/bag.jpg" },
  { name: "Sunglasses", price: 39.99, image: "/products/sunglasses.jpg" },
];

const CARD_WIDTH = 300;
const ITEMS_PER_PAGE = 3;

export default function HomePage() {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const isManualScroll = useRef(false);
  const timeoutRef = useRef(null);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const scrollToPage = (pageIndex) => {
    if (!scrollRef.current) return;

    isManualScroll.current = true;
    scrollRef.current.scrollTo({
      left: pageIndex * CARD_WIDTH * ITEMS_PER_PAGE,
      behavior: "smooth",
    });
    setCurrentPage(pageIndex);

    // Unlock after animation ends (~400ms)
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 400);
  };

  const scrollLeft = () => {
    if (currentPage > 0) scrollToPage(currentPage - 1);
  };

  const scrollRight = () => {
    if (currentPage < totalPages - 1) scrollToPage(currentPage + 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isManualScroll.current) return;

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const newPage = Math.round(scrollLeft / (CARD_WIDTH * ITEMS_PER_PAGE));
        if (newPage !== currentPage) {
          setCurrentPage(newPage);
        }
      }, 100); // Debounce delay
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Carousel</h1>

      <div className="relative w-full max-w-6xl">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-200 text-gray-800 p-3 rounded-full shadow-md transition duration-200"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Scrollable Product List */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-hidden scroll-smooth px-10"
        >
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-72 bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-200 text-gray-800 p-3 rounded-full shadow-md transition duration-200"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToPage(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentPage === index ? "bg-gray-800" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </main>
  );
}
