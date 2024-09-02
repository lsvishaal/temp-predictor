import { QueryClient, QueryClientProvider } from "react-query";
import { ContainerScroll } from "./components/ui/container-scroll-animation";
import { LampDemo } from "./components/ui/lamp";
import { ThemeProvider } from "./components/ui/theme-provider";
import Footer from "@/components/ui/Footer";
import { Hero } from "@/components/ui/Hero";
import { useInView } from 'react-intersection-observer';
import GraphTRF from "./Layouts/Graphs/GraphTRF";
import GraphPLR from "./Layouts/Graphs/GraphPLR";
import GraphTLR  from "./Layouts/Graphs/GraphTLR";
import GraphPRF from "./Layouts/Graphs/GraphPRF";
import GraphCustomYear from "./Layouts/Graphs/GraphCustomYear";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { FloatingNav } from "./components/ui/floating-navbar";

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
  


  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <FloatingNav navItems={[{name: 'Home', link: '/'}, {name: 'About', link: '/about'}, {name: 'Contact', link: '/contact'}]} />
          <LampDemo />
          
          <Hero />
          <LazyComponent>
            <ContainerScroll titleComponent={<div>
              <h1 className="text-5xl font-bold text-center scroll-smooth"><span className="text-red-400">Temperature</span> in <span className="text-blue-400">Linear Regression</span></h1>
            </div>} children={<GraphTLR />}>
            </ContainerScroll>
          </LazyComponent>

          <div className="mx-5 grid grid-flow-row mb-20">
            
            <LazyComponent><GraphTLR /></LazyComponent>
            <LazyComponent><GraphTRF /></LazyComponent>
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