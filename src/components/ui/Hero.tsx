import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Hero = () => (
  <div className="w-full py-10 sm:py-20 lg:py-40">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row gap-6 sm:gap-10 lg:items-center">
        <div className="bg-muted rounded-md w-full aspect-video h-full flex-1 ">
        <video 
            src="https://cdn.pixabay.com/video/2023/10/15/185092-874643408_large.mp4" 
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
          ></video>

        </div>
        <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
          <div>
            <Badge>ML</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-5xl lg:max-w-xl font-regular text-left">
              
              <ModeToggle />
            </h2>
            <p className="text-base sm:text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
            Try clicking this toggle button to change the theme!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);