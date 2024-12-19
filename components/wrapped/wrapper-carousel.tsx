"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingDots } from "@/components/ui/loading-dots";
import { ConcentricCircles } from "@/components/ui/coincentric-circle";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

type WrappedData = {
  totalProblems: number;
  hardProblems: number;
  streak: number;
  ranking: number;
};

interface WrappedCarouselProps {
  isLoading?: boolean;
  error?: string;
  data?: WrappedData;
  onRetry?: () => void;
}

export function WrappedCarousel({
  isLoading,
  error,
  data,
  onRetry,
}: WrappedCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#00ffbf]/5 blur-3xl rounded-3xl" />
        <Card className="relative bg-gradient-to-b from-[#001a14] to-[#000a08] border-0 rounded-3xl p-16 flex flex-col items-center gap-8 overflow-hidden">
          {children}
        </Card>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <CardWrapper>
        <LoadingDots />
        <h2 className="text-3xl font-bold text-white tracking-tight">
          WRAPPED '24
        </h2>
        <p className="text-gray-400 text-lg">Just doing some math...</p>
      </CardWrapper>
    );
  }

  if (error) {
    return (
      <CardWrapper>
        <div className="relative">
          <ConcentricCircles />
          <AlertCircle className="absolute inset-0 m-auto w-12 h-12 text-[#00ffbf]" />
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Please try again later.
        </h2>
        <Button
          onClick={onRetry}
          className="bg-[#00ffbf] text-black hover:bg-[#00ffbf]/90 px-8 py-6 text-lg rounded-full transition-all duration-300"
        >
          Go Home
        </Button>
      </CardWrapper>
    );
  }

  const slides = [
    {
      title: "Total Problems Solved",
      value: data?.totalProblems || 0,
      description: "You've crushed it this year! 🚀",
    },
    {
      title: "Hard Problems",
      value: data?.hardProblems || 0,
      description: "Taking on the tough ones! 💪",
    },
    {
      title: "Longest Streak",
      value: data?.streak || 0,
      description: "Days of consistent coding! 🔥",
    },
    {
      title: "Global Ranking",
      value: data?.ranking || 0,
      description: "Among millions of users! 🌟",
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <CardWrapper>
          <div className="absolute top-8 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className="h-1 w-16 rounded-full overflow-hidden bg-white/10"
              >
                <motion.div
                  className="h-full bg-[#00ffbf]"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: index === currentSlide ? 1 : 0,
                    transition: { duration: 5, ease: "linear" },
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-6 pt-8"
          >
            <div className="relative">
              <ConcentricCircles />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#00ffbf]"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {slides[currentSlide].value}
              </motion.div>
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {slides[currentSlide].title}
            </h3>
            <p className="text-gray-400 text-lg">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </CardWrapper>
      </AnimatePresence>

      <div className="absolute top-1/2 -translate-y-1/2 -left-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
          className="text-white hover:bg-white/10 w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="text-white hover:bg-white/10 w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
