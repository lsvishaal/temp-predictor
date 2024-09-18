import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import GraphTLR from "../Graphs/GraphTLR";
import GraphTRF from "../Graphs/GraphTRF";
import GraphPLR from "../Graphs/GraphPLR";
import GraphPRF from "../Graphs/GraphPRF";
import TLRDesc from "../TextParagraphs/TLRDesc";
import TRFDesc from "../TextParagraphs/TRFDesc";
import PLRDesc from "../TextParagraphs/PLRDesc";
import PRFDesc from "../TextParagraphs/PRFDesc";
import HeroSection from "./About/HeroSection";
import DoubleScroll from "./About/ModelDescription";
import DataOutputOutcome from "./About/DataOutputOutcome";

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
        
      </LazyComponent>

      {/* Graph & Desc Section */}
      <div className="mx-20 grid grid-flow-row mb-20 relative ">
        <LazyComponent>
          <GraphTLR />
        </LazyComponent>
        <LazyComponent>
          <TLRDesc />
        </LazyComponent>

        <LazyComponent>
          <GraphTRF />
        </LazyComponent>
        <LazyComponent>
          <TRFDesc />
        </LazyComponent>


        <LazyComponent>
          <GraphPLR />
        </LazyComponent>
        <LazyComponent>
          <PLRDesc />
        </LazyComponent>
        
        <LazyComponent>
          <GraphPRF />
        </LazyComponent>
        <LazyComponent>
          <PRFDesc />
        </LazyComponent>
      </div>

      {/* Data-output-outcome */}
      <DataOutputOutcome />
      
      </div>
  );
};

export default About;
