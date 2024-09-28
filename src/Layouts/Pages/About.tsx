import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import PRFDesc from "./About/PrecipRF";
import HeroSection from "./About/HeroSection";
import DoubleScroll from "./About/ModelDescription";
import TempRF from "./About/TempRF";
import TempLR from "./About/TempLR";
import PrecipLR from "./About/PrecipLR";

const About: React.FC = () => {
  interface LazyComponentProps {
    children: ReactNode;
  }

  const LazyComponent: React.FC<LazyComponentProps> = ({ children }) => {
    const { ref, inView } = useInView({
      triggerOnce: true, // Load only once
      threshold: 0.1, // Trigger when 10% of the component is in view
    });

    return <div ref={ref}>{inView ? children : null}</div>;
  };
  

  return (
    <div className="">
      <LazyComponent>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Double Card Scroll */}
        <DoubleScroll />

      {/* Data-output-outcome */}
      {/* <DataOutputOutcome /> */}
        
      </LazyComponent>

      
      {/* Graph & Desc Section */}
      <div className="px-4 md:px-8 lg:px-16 space-y-10">
        <LazyComponent>
          <div className="mb-80">
        <TempLR />
          </div>
        </LazyComponent>

        <LazyComponent>
          <div className="mb-80">
        <TempRF />
          </div>
        </LazyComponent>

        <LazyComponent>
          <div className="mb-80">
        <PrecipLR />
          </div>
        </LazyComponent>



        <LazyComponent>
          <div className="mb-80">
        <PRFDesc />
          </div>
        </LazyComponent>
      </div>

     
      
      </div>
  );
};

export default About;
