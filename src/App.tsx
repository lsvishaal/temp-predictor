import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";
import { LampDemo } from "./components/ui/lamp";
import { ThemeProvider } from "./components/ui/theme-provider";
import Footer from "@/components/ui/Footer";
import { FloatingNav } from "./components/ui/floating-navbar";
import About from "./Layouts/Pages/About";
import GraphCustomYear from "./Layouts/Graphs/GraphCustomYear";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import ScrollToTop from "./components/ui/ScrollToTop";
import { Hero } from "./components/ui/Hero";

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

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="selection:bg-violet-500 selection:text-violet-950 ">
      <Router>
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <FloatingNav
              navItems={[
                { name: "Home", link: "/" },
                { name: "About", link: "/about" },
              ]}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <LampDemo />
                    {/* <Hero /> */}
                    <LazyComponent>
                      <GraphCustomYear />
                    </LazyComponent>
                  </>
                }
              />
              
              <Route path="/about" element={<About />} />
              {/* Add other routes here */}
            </Routes>
            <Footer />
          </ThemeProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
