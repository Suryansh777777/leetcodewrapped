"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface AnimatedCTAInputProps {
  onSubmit: (username: string) => void;
}

export function AnimatedCTAInput({ onSubmit }: AnimatedCTAInputProps) {
  const [username, setUsername] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setIsLoading(true);
    await onSubmit(username);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!isSubmitted ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="flex items-center"
        >
          <Input
            type="text"
            placeholder="Enter LeetCode username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-l-full py-6 px-6 text-lg bg-white/10 border-white/20 text-white placeholder-white/50"
          />
          <Button
            type="submit"
            className="rounded-r-full py-6 px-6 bg-gradient-to-br from-[#ffa116] to-[#ff6b6b] text-black hover:bg-[#ffa116]/90"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              <path d="M15 12l-6 4V8l6 4z" />
            </svg>
          </Button>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Button className="bg-gradient-to-br from-[#ffa116] to-[#ff6b6b] text-black hover:bg-[#ffa116]/90 px-8 py-6 text-lg rounded-full">
            {isLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path d="M15 12l-6 4V8l6 4z" />
              </svg>
            )}
            View Wrapped
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
