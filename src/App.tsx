import { QueryClient, QueryClientProvider } from "react-query";
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import { LampDemo } from "./components/ui/lamp";
import { ThemeProvider } from "./components/ui/theme-provider";
import Footer from "./Layouts/Footer";
import { Hero } from "./Layouts/Hero";
import { useInView } from 'react-intersection-observer';
import GraphRF from "./Layouts/Graphs/GraphTRF";
import GraphPLR from "./Layouts/Graphs/GraphPLR";
import { GraphTLR } from "./Layouts/Graphs/GraphTLR";
import GraphPRF from "./Layouts/Graphs/GraphPRF";
import GraphCustomYear from "./Layouts/Graphs/GraphCustomYear";
import { ReactNode, useState } from "react";
import { FloatingDock } from "./components/ui/floating-dock";
import { BrowserRouter } from "react-router-dom";
import { IconHierarchy3, IconLine } from "@tabler/icons-react";

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

function App() {
  const queryClient = new QueryClient();
  const [selectedComponent, setSelectedComponent] = useState<React.ReactNode>(null);

  const dockItems = [
    { title: 'Temperature in Linear Regression', icon: <IconLine />, component: <GraphTLR /> },
    { title: 'Precipitation in Random Forest', icon: <IconHierarchy3 />, component: <GraphPRF /> },
  ];

  const handleItemClick = (component: React.ReactNode) => {
    console.log("Item clicked:", component);
    setSelectedComponent(component);
  };

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <LampDemo />
          <div className="flex justify-center items-center">
            <FloatingDock desktopClassName="justify-center" items={dockItems} onItemClick={handleItemClick} />
          </div>
          <Hero />
          <LazyComponent>
            <ContainerScroll titleComponent={<div>
              <h1 className="text-5xl font-bold text-center scroll-smooth"><span className="text-red-400">Temperature</span> in <span className="text-blue-400">Linear Regression</span></h1>
            </div>} children={<GraphTLR />}>
            </ContainerScroll>
          </LazyComponent>

          <div className="mx-5 grid grid-flow-row mb-20">
            {selectedComponent && (
              <div className="selected-component-container">
                {selectedComponent}
              </div>
            )}
            <LazyComponent><GraphTLR /></LazyComponent>
            <LazyComponent><GraphRF /></LazyComponent>
            <LazyComponent><GraphPLR /></LazyComponent>
            <LazyComponent><GraphPRF /></LazyComponent>
          </div>

          <LazyComponent><GraphCustomYear /></LazyComponent>
          <Footer />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;