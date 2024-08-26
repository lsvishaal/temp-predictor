"use client"

import { useQuery } from 'react-query';
import { TrendingUp } from "lucide-react";
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

const chartConfig = {
  desktop: {
    label: "Actual",
    color: "hsl(var(--chart-4))",
  },
  mobile: {
    label: "Prediction",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const fetchTemperatureData = async () => {
  const response = await fetch('/api/data/temp/linear');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  console.log('Fetched data:', data); // Log the fetched data

  // Map the data to the format expected by the chart
  return data.temperature_linear.weather_model.map(item => ({
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

export function GraphTLR() {
  const { data, error, isLoading } = useQuery('temperatureData', fetchTemperatureData);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <div>Loading...</div>
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
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linear Regression</CardTitle>
        <CardDescription>
          Showing temperature predictions using Linear Regression model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={lineChartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
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
      </CardContent>
      <CardFooter>
      <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Accuracy: 98.98% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing temperature predictions for the last period
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}

