"use client";

import { motion } from "framer-motion";

export function ConcentricCircles() {
  return (
    <div className="relative w-24 h-24">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-[#00ffbf]/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
