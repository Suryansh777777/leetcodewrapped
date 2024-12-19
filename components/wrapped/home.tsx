"use client";

import { useState } from "react";
import { Background } from "@/components/ui/background";
import { NavBar } from "@/components/ui/navbar";
import { UserCount } from "@/components/ui/user-count";
import { Hero } from "@/components/ui/hero";
import { CTAButton } from "@/components/ui/cta-button";
import { WrappedCarousel } from "@/components/wrapped/wrapper-carousel";

export default function Home() {
  const [showWrapped, setShowWrapped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<any>(undefined);

  const handleSubmit = async (username: string) => {
    setShowWrapped(true);
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 20000));
      setData({
        username,
        totalProblems: 324,
        hardProblems: 42,
        streak: 65,
        ranking: 15023,
      });
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(undefined);
    setShowWrapped(false);
  };

  return (
    <Background>
      <NavBar />
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] relative z-10">
        {!showWrapped ? (
          <div className="flex flex-col items-center text-center gap-8 max-w-4xl">
            <UserCount />
            <Hero />
            <CTAButton onSubmit={handleSubmit} />
          </div>
        ) : (
          <WrappedCarousel
            isLoading={isLoading}
            error={error}
            data={data}
            onRetry={handleRetry}
          />
        )}
      </main>
    </Background>
  );
}
