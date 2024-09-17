import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

interface ModelDescriptionProps {
  title: string;
  color: string;
  description: string;
}

const ModelDescription: React.FC<ModelDescriptionProps> = ({ title, color, description }) => {
  return (
    <ContainerScroll
      titleComponent={
        <div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-center scroll-smooth text-${color}`}>
            {title}
          </h1>
        </div>
      }
      children={
        <div className="pb-10 sm:pb-32">
          <div className="mb-10 sm:mb-16 mt-10 text-xl sm:text-3xl font-normal text-justify-center">
            <p>{description}</p>
          </div>
        </div>
      }
    />
  );
};

export default ModelDescription;