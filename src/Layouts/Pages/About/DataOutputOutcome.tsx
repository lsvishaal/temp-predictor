import React from "react";
import { Badge } from "@/components/ui/badge";

const DataOutputOutcome: React.FC = () => {
  return (
    <div className="mx-20 mb-32">
      <h2 className="font-bold text-4xl mb-10">
        <span className="text-red-400">Temperature</span> Prediction
      </h2>

      <div className="mb-10">
        <span className="text-2xl font-bold">Models Used</span>{" "}
        <Badge className="ml-2 bg-yellow-400 text-black font-bold" variant="outline">
          Linear Regression
        </Badge>{" "}
        <Badge className="ml-2 bg-green-400 text-black font-bold" variant="outline">
          Random Forest
        </Badge>
      </div>

      <div className="mb-20">
        <h3 className="text-3xl font-bold text-purple-400">Features</h3>
        <ul className="list-disc ml-32 text-xl">
          <li className="ml-10 py-3 font-normal text-slate-400">Date</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Precipitation</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Wind Speed</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Wind Direction</li>
          <li className="ml-10 py-3 font-normal text-slate-400">Evapotranspiration</li>
        </ul>
      </div>

      <h2 className="font-bold text-4xl mb-10">
        <span className="text-blue-400">Precipitation</span> Prediction
      </h2>
      <div className="mb-10">
        <span className="text-2xl font-bold">Models Used</span>{" "}
        <Badge className="ml-2 bg-yellow-400 text-black font-bold" variant="outline">
          Linear Regression
        </Badge>{" "}
        <Badge className="ml-2 bg-green-400 text-black font-bold" variant="outline">
          Random Forest
        </Badge>
      </div>

      <h3 className="text-3xl font-bold text-purple-400">Features</h3>
      <ul className="list-disc ml-32 text-xl">
        <li className="ml-10 py-3 font-bold text-slate-400">Date</li>
        <li className="ml-10 py-3 font-bold text-slate-400">Min Temperature</li>
        <li className="ml-10 py-3 font-bold text-slate-400">Max Temperature</li>
        <li className="ml-10 py-3 font-bold text-slate-400">Wind Speed</li>
        <li className="ml-10 py-3 font-bold text-slate-400">Wind Direction</li>
        <li className="ml-10 py-3 font-bold text-slate-400">EvapoTranspiration</li>
      </ul>
    </div>
  );
};

export default DataOutputOutcome;