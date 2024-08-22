import { ThemeProvider } from "./components/ui/theme-provider"
import { Graph } from "./Layout/Graph"
import { Hero } from "./Layout/Hero"
import Navbar from "./Layout/Navbar"
import { Welcome } from "./Layout/Welcome"


const App = () => {
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Navbar/>
    <div className="selection:bg-purple-600 selection:text-black">
      <Welcome/>
      <Hero/>
      <Graph />
      <Welcome/>

    </div>
    </ThemeProvider>
  )
}
export default App