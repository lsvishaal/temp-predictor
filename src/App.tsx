import { QueryClient, QueryClientProvider } from "react-query";
import { ContainerScroll} from "./components/ui/container-scroll-animation";
import {LampDemo } from "./components/ui/lamp";
import { ThemeProvider } from "./components/ui/theme-provider";
import Footer from "./Layouts/Footer";
import { Hero } from "./Layouts/Hero";
import { useInView } from 'react-intersection-observer';
import GraphRF  from "./Layouts/Graphs/GraphTRF";
import GraphPLR from "./Layouts/Graphs/GraphPLR";
import { GraphTLR } from "./Layouts/Graphs/GraphTLR";
import GraphPRF from "./Layouts/Graphs/GraphPRF";
import GraphCustomYear from "./Layouts/Graphs/GraphCustomYear";
import { ReactNode } from "react";
import { FloatingDock } from "./components/ui/floating-dock";
import { BrowserRouter } from "react-router-dom";

// Create a client
const dockItems = [
  { title: 'TLR', icon: "", href: '/' },
  { title: 'PLR', icon: "", href: '/about' },
  { title: 'TRF', icon: "", href: '/contact' },
  { title: 'PRF', icon: "", href: '/contact' },
];
const queryClient = new QueryClient();
// const placeholderContent = [
//   {
//     title: <span className="space-y-10 justify-center">GraphLR1 Description</span>,
//     description: <span>The GraphLR1 component displays an area chart that visualizes the total number of visitors over the last six months. The chart is stacked, showing two data series: "Actual" and "Prediction". The "Actual" series represents the real visitor data, while the "Prediction" series represents the forecasted visitor data. The chart is designed to be accessible and includes a tooltip for detailed information on each data point. The data is fetched from an API endpoint and filtered to include only one entry per week. The chart is styled with custom colors and includes a footer indicating a 5.2% increase in visitors for the current month.</span>,
//     content: <GraphLR2 />,
//   },
//   {
//     title: <span>GraphLR2 Description</span>,
//     description: <span className="space-y-10 justify-center">The GraphLR2 component presents a line chart that tracks the number of visitors from January to December 2023.
//      Similar to GraphLR1, this chart includes two data series: <span className="text-red-400 text-bold text-2xl">Actual</span> and <span>"Prediction"</span>. The "Actual" series shows the real visitor data, while the "Prediction" series shows the forecasted data. </span>,
//     content: <GraphLR1 />,
//   },
//   {
//     title: <span className="space-y-10 justify-center">Section 3</span>,
//     description: <span>This is the description for section 3.</span>,
//     content: <div>Additional content for section 3</div>,
//   },
// ];
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
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <LampDemo />
          <div className="flex justify-center items-center ">
          <FloatingDock items={dockItems} />
          </div>
          <Hero />
          <LazyComponent>
          <ContainerScroll titleComponent={<div>
            <h1 className="text-5xl font-bold text-center scroll-smooth"><span className="text-red-400">Temperature</span> in <span className="text-blue-400">Linear Regression</span></h1>
          </div>} children={<GraphTLR />}>
          
          </ContainerScroll>

          <div className="mx-5 grid grid-flow-row mb-20">

          <LazyComponent><GraphTLR /></LazyComponent>
          <LazyComponent> <GraphRF /> </LazyComponent>
          <LazyComponent><GraphPLR /></LazyComponent>
          <LazyComponent><GraphPRF /></LazyComponent>

          </div>
          
          <LazyComponent><GraphCustomYear /></LazyComponent>

          </LazyComponent>
          {/* <StickyScroll content={placeholderContent} /> */}
          <Footer />
          

      </ThemeProvider>
    </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
