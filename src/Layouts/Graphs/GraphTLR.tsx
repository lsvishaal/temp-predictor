"use client";

import { useQuery } from 'react-query';
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface WeatherModelItem {
  Date: string;
  Actual: number;
  Prediction: number;
}

const fetchTemperatureData = async () => {
  const response = await fetch("https://project-weather-n4ay.onrender.com/data/temp/linear");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Fetched data:', data); 

  return data.temperature_linear.weather_model.map((item: WeatherModelItem) => ({
    month: item.Date,
    desktop: item.Actual,
    mobile: item.Prediction,
  }));
};

const lineChartConfig = {
  desktop: {
    label: "Actual",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Prediction",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export default function GraphTLR() {
  const { data, error, isLoading } = useQuery<WeatherModelItem[], Error>('temperatureData', fetchTemperatureData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <div>Model Initiation underdue...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(data)) {
    return <div className='text-4xl text-red-500 font-thin flex justify-center border-2 bg-red-400'>Error: Data format is incorrect</div>;
  }

  return (
    <Card className="p-4 sm:p-6 md:p-8 lg:p-10 w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          <span className='text-red-400'>Temperature</span> in <span className='text-blue-400'>Linear Regression</span>
        </CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
          Showing temperature predictions using Linear Regression model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <ChartContainer config={lineChartConfig} className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem]">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
              className="w-full h-full"
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="text-sm sm:text-base md:text-lg lg:text-xl">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 font-medium leading-none">
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing temperature predictions for the Year <strong>2023</strong>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
