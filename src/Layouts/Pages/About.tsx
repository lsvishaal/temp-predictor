import React, { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import GraphTLR from '../Graphs/GraphTLR';
import GraphTRF from '../Graphs/GraphTRF';
import GraphPLR from '../Graphs/GraphPLR';
import GraphPRF from '../Graphs/GraphPRF';

const About: React.FC = () => {

  interface LazyComponentProps {
    children: ReactNode;
  }

  const LazyComponent: React.FC<LazyComponentProps> = ({ children }) => {
    const { ref, inView } = useInView({
      triggerOnce: true, // Load only once
      threshold: 0.1, // Trigger when 10% of the component is in view
    });

    return (
      <div ref={ref}>
        {inView ? children : null}
      </div>
    );
  };

  return (
    <>
      <LazyComponent>
        <ContainerScroll titleComponent={
          <div>
            <h1 className="text-5xl font-bold text-center scroll-smooth">
              <span className="text-red-400">Temperature</span> in <span className="text-blue-400">Linear Regression</span>
            </h1>
          </div>
        } children={<GraphTLR />} />
      </LazyComponent>

      <div className="mx-5 grid grid-flow-row mb-20">
        <LazyComponent><GraphTLR /></LazyComponent>
        <LazyComponent><GraphTRF /></LazyComponent>
        <LazyComponent><GraphPLR /></LazyComponent>
        <LazyComponent><GraphPRF /></LazyComponent>
      </div>
    </>
  );
};

export default About;