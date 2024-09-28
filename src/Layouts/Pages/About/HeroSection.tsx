import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { FlipWords } from "@/components/ui/flip-words";

const HeroSection: React.FC = () => {
  const wordsalpha = [
    "Random Forest",
    "Linear Regression",
    "Error Percentage",
    "Performance Metrics",
    "Comparison of Performance",
  ];

  return (
    <BackgroundBeamsWithCollision>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-red-50 bg-clip-text text-transparent">
        <span className="text-violet-400 mb-4 block">Let's Analyze</span>{" "}
        <span className="text-red-400">
          <FlipWords
            words={wordsalpha}
            className="text-center font-bold tracking-wider text-xl sm:text-2xl md:text-3xl lg:text-5xl"
          />
        </span>
      </h1>
    </BackgroundBeamsWithCollision>
  );
};

export default HeroSection;