import { ModeToggle } from "@/components/ui/mode-toggle";

const Navbar = () => {
  return (
    <div className="fixed rounded-full flex mt-1 top-0 left-0 right-0 bg-inherit bg-opacity-75 shadow-lg backdrop-blur-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold"></div>
        <nav className="space-x-4">
          <ModeToggle />
          
        </nav>
      </div>
    </div>
  );
};
export default Navbar