import React, { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import GraphTLR from "../Graphs/GraphTLR";
import GraphTRF from "../Graphs/GraphTRF";
import GraphPLR from "../Graphs/GraphPLR";
import GraphPRF from "../Graphs/GraphPRF";
import TLRDesc from "../TextParagraphs/TLRDesc";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Badge } from "@/components/ui/badge";
import { FlipWords } from "@/components/ui/flip-words";


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
    const wordsalpha = [
     "Random Forest",
     "Linear Regression",
     "Error Percentage",
     "Performance Metrics",
     "Comparison of Performance"
  ];

  return (
    <div className="">
      <LazyComponent>
        {/* Hero Section */}
        <BackgroundBeamsWithCollision>
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-400 to-red-50 bg-clip-text text-transparent">
            <span className="text-violet-400">Let's Analyze</span>{" "}
            <span className="text-red-400">
              
              <FlipWords
                words={wordsalpha}
                className="text-center font-bold tracking-wider text-xl sm:text-2xl md:text-3xl lg:text-5xl"
              />
              
            </span>
          </h1>
        </BackgroundBeamsWithCollision>

        {/* Double Card Scroll */}
        <div className="grid grid-cols-2">
          <ContainerScroll
            titleComponent={
              <div>
                <h1 className="text-5xl font-bold text-center scroll-smooth">
                  <span className="text-blue-400">Linear Regression</span>
                </h1>
              </div>
            }
            children={
              <div className="pb-32">
                <div className="mb-16 mt-10 text-3xl font-bold text-justify-center">
                  Linear regression is a statistical method used to model the
                  relationship between a dependent variable and one or more
                  independent variables. The goal is to find the best-fitting
                  straight line (called the regression line) that predicts the
                  dependent variable based on the independent variables. This
                  line minimizes the difference between the actual data points
                  and the predicted values.
                  <span></span>
                </div>
              </div>
            }
          />
          <ContainerScroll
            titleComponent={
              <div>
                <h1 className="text-5xl font-bold text-center scroll-smooth">
                  <span className="text-green-400">Random Forest</span>
                </h1>
              </div>
            }
            children={
              <div className="mb-16 mt-10 text-3xl font-normal text-justify-center text-slate-300">
                <p>
                  Random forest is a algorithm that{" "}
                  <span className="text-green-400 font-extrabold">
                    combines the predictions of multiple decision trees
                  </span>{" "}
                  to improve accuracy and reduce overfitting.
                  <span></span>
                </p>
                <p className="mt-20">
                  Each decision tree in the forest is trained on a random subset
                  of the data and uses a random subset of features to make
                  decisions.
                </p>
              </div>
            }
          />
        </div>
      </LazyComponent>

      {/* Graph & Desc Section */}
      <div className="mx-20 grid grid-flow-row mb-20 ">
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
          <TLRDesc />
        </LazyComponent>
        <LazyComponent>
          <GraphPLR />
        </LazyComponent>
        <LazyComponent>
          <GraphPRF />
        </LazyComponent>
      </div>

      {/* Data-output-outcome */}
      <div className="mx-20 mb-32 ">
        <h2 className="font-bold text-4xl mb-10">
          <span className="text-red-400 ">Temperature</span> Prediction
        </h2>

        <div className="mb-10">
        <span className="text-2xl font-bold ">Models Used</span>{" "}
        
        <Badge
          className="ml-2  bg-yellow-400 text-black font-bold"
          variant="outline"
        >
          Linear Regression{" "}
        </Badge>{" "}

        <Badge
          className="ml-2 bg-green-400 text-black font-bold"
          variant="outline"
        >
          Random Forest{" "}
        </Badge>
        </div>

        <div className="mb-20">
        <h3 className="text-3xl font-bold text-purple-400">Features</h3>
        <ul className="list-disc ml-32 text-xl">
          <li className="ml-10 py-3 font-normal text-slate-400">Date</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Precipitation</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Wind Speed</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Wind Direction</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Evapotranspiration</li>
        </ul>
        </div>

        <h2 className="font-bold text-4xl mb-10">
          <span className="text-blue-400">Precipitation</span> Prediction
        </h2>
        <div className="mb-10">
        <span className="text-2xl font-bold">Models Used</span>{" "}
        <Badge
          className="ml-2  bg-yellow-400 text-black font-bold"
          variant="outline"
        >
          Linear Regression{" "}
        </Badge>{" "}

        <Badge
          className="ml-2 bg-green-400 text-black font-bold"
          variant="outline"
        >
          Random Forest{" "}
        </Badge>
        </div>

        <h3 className="text-3xl font-bold text-purple-400">Features</h3>
        <ul className="list-disc ml-32 text-xl">
          <li className="ml-10 py-3 font-bold text-slate-400">Date</li>
          <li className="ml-10 py-3 font-bold text-slate-400">
            Min Temperature
          </li>
          <li className="ml-10 py-3 font-bold text-slate-400">
            Max Temperature
          </li>
          <li className="ml-10 py-3 font-bold text-slate-400">Wind Speed</li>
          <li className="ml-10 py-3 font-bold text-slate-400">
            Wind Direction
          </li>
          <li className="ml-10 py-3 font-bold text-slate-400">
            EvapoTranspiration
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
