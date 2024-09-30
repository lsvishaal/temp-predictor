"use client";

import { useQuery } from 'react-query';
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from "recharts";
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
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface WeatherModelItem {
  Date: string;
  Actual: number;
  Prediction: number;
}

interface PerformanceMeasures {
  mean_absolute_error: number;
  r2_score: number;
}

interface TemperatureLinear {
  variance: number;
  Performance_measures?: PerformanceMeasures;
}

// Fetch temperature data for the graph
const fetchTemperatureData = async () => {
  const response = await fetch("https://project-weather-n4ay.onrender.com/data/temp/linear");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.temperature_linear.weather_model.map((item: WeatherModelItem) => ({
    month: item.Date,
    desktop: item.Actual,
    mobile: item.Prediction,
  }));
};

// Fetch performance measures and variance for the description
const fetchPerformanceData = async () => {
  const response = await fetch('https://project-weather-n4ay.onrender.com/data/temp/linear');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  const performanceMeasures = result.temperature_linear.Performance_measures || result.temperature_linear.Performace_measures;
  return {
    variance: result.temperature_linear.variance,
    Performance_measures: performanceMeasures,
  };
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

export default function TempLR() {
  const { data: temperatureData, error: graphError, isLoading: graphLoading } = useQuery<WeatherModelItem[], Error>('temperatureData', fetchTemperatureData);
  const [performanceData, setPerformanceData] = useState<TemperatureLinear | null>(null);
  const [performanceError, setPerformanceError] = useState<string | null>(null);

  // Fetch performance data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPerformanceData();
        setPerformanceData(result);
      } catch (err) {
        if (err instanceof Error) {
          setPerformanceError(err.message);
        } else {
          setPerformanceError('An unknown error occurred');
        }
      }
    };
    fetchData();
  }, []);

  if (graphLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <div>Model Initiation underdue...</div>
        </div>
      </div>
    );
  }

  if (graphError) {
    return <div>Error: {graphError.message}</div>;
  }

  if (!Array.isArray(temperatureData)) {
    return <div className='text-4xl text-red-500 font-thin flex justify-center border-2 bg-red-400'>Error: Data format is incorrect</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 mx-1 max-w-full p-2 sm:p-4 md:p-6">

      {/* Left side: Graph */}
      <Card className="w-full drop-shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <span className='text-red-400'>Temperature</span> in <span className='text-blue-400'>Linear Regression</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
            Showing temperature predictions using Linear Regression model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig} className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperatureData}
                margin={{ left: 12, right: 12 }}  
                className="w-full h-full"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={31}
                  tickFormatter={(_value, index) => {
                    const hardcodedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    return hardcodedMonths[index % 12];
                  }}
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
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm sm:text-base md:text-lg lg:text-xl">
          <div className="flex items-center gap-2 text-slate-500 leading-none">
            Showing temperature predictions for the Year <strong>2023</strong>
          </div>
        </CardFooter>
      </Card>

      {/* Right side: Description and Performance Metrics */}
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-1 md:gap-6 md:mt-0">

        {/* Upper half: Description */}
        <motion.div
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-justify"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Since temperature typically exhibits{" "}
          <span className="font-bold text-red-400">less variance</span>,{" "}
          <span className="font-bold">linear regression </span>is more suitable
          for predicting temperature trends due to its ability to model linear
          relationships effectively.
        </motion.div>

        {/* Lower half: Performance Metrics */}
        {performanceError && (
          <div className="text-red-500">Error fetching data: {performanceError}</div>
        )}

        {performanceData && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Table>
              <TableHeader>
                <TableRow className='font-bold md:text-3xl sm:text-base'>
                  <TableHead>Metric</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className='text-lg md:text-2xl font-bold'>Variance</TableCell>
                  <TableCell className='text-base md:text-xl font-bold tracking-wider'>{performanceData.variance}</TableCell>
                </TableRow>
                {performanceData.Performance_measures && (
                  <>
                    <TableRow>
                      <TableCell className='text-lg md:text-2xl font-bold'>Mean Absolute Error</TableCell>
                      <TableCell className='text-base md:text-xl font-bold tracking-wider'>{performanceData.Performance_measures.mean_absolute_error}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='text-lg md:text-2xl font-bold'>R² Score</TableCell>
                      <TableCell className='text-base md:text-xl font-bold tracking-wider'>{performanceData.Performance_measures.r2_score}</TableCell>
                    </TableRow>
                  </>
                )}
              </TableBody>
            </Table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
