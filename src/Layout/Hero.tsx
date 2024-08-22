import { Badge } from "@/components/ui/badge";

export const Hero = () => (
  <div className="w-full py-10 sm:py-20 lg:py-40">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col-reverse lg:flex-row gap-6 sm:gap-10 lg:items-center">
        <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
        <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
          <div>
            <Badge>ML</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-lg sm:text-xl md:text-3xl lg:text-5xl lg:max-w-xl font-regular text-left">
              Visualize Temperature Predictions with Machine Learning
            </h2>
            <p className="text-base sm:text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);