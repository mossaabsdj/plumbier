"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PageTransition({ isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-lg bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Logo animation */}
          <motion.div
            className="w-44 h-44"
            animate={{ y: [0, -10, 0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={180}
              height={180}
              className="rounded-3xl"
            />
          </motion.div>

          {/* Loading Text */}
          <div className="mt-4 text-white text-xl font-semibold flex items-center gap-1">
            <span>جارٍ التحميل</span>
            {/* Animated Dots */}
            <motion.span
              className="inline-block"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              .
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.3 }}
            >
              .
            </motion.span>
            <motion.span
              className="inline-block"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.6 }}
            >
              .
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
