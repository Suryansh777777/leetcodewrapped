"use client";

import { motion } from "framer-motion";

export function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((dot) => (
        <motion.div
          key={dot}
          className="h-2 w-2 rounded-full bg-[#00ffbf]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: dot * 0.2,
          }}
        />
      ))}
    </div>
  );
}
