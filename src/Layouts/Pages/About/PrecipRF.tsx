"use client";

import { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
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

interface PrecipitationRandomForest {
  variance: number;
  Performance_measures: PerformanceMeasures;
}

const PrecipRF = () => {
  const [chartData, setChartData] = useState<WeatherModelItem[]>([]);
  const [performanceData, setPerformanceData] = useState<PrecipitationRandomForest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-weather-n4ay.onrender.com/data/precip/rf');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        const formattedData = result.precipitation_rf.weather_model.map((item: WeatherModelItem) => ({
          Date: item.Date,
          Actual: item.Actual,
          Prediction: item.Prediction,
        }));

        setChartData(formattedData);
        setPerformanceData(result.precipitation_rf);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error fetching data: ${err.message}`);
          console.error('Error fetching data:', err);
        } else {
          setError('An unknown error occurred');
          console.error('Unknown error fetching data:', err);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const chartConfig = {
    Actual: {
      label: 'Actual',
      color: 'hsl(var(--chart-1))',
    },
    Prediction: {
      label: 'Prediction',
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <div>Initiating Model</div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-4 mx-1 max-w-full p-2 sm:p-4 md:p-6">
      
      {/* Left side: Graph */}
      <Card className="w-full drop-shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <span className='text-blue-800'>Precipitation</span> in <span className='text-green-400'>Random Forest</span>
          </CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
            Precipitation Predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ left: 12, right: 12 }}
                className="w-full h-full"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="Date"
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
                  dataKey="Actual"
                  type="monotone"
                  stroke="var(--color-Actual)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="Prediction"
                  type="monotone"
                  stroke="var(--color-Prediction)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-sm sm:text-base md:text-lg lg:text-xl">
          <div className="flex items-center gap-2 text-slate-500 leading-none">
            Showing <span className='font-medium'>precipitation</span> predictions for the Year <strong>2023</strong>
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
          Since precipitation typically exhibits{" "}
          <span className="font-bold text-red-400">less variance</span>,{" "}
          <span className="font-bold text-green-400">Random Forest </span>is more suitable for predicting precipitation trends due to its ability to <strong>model complex relationships effectively.</strong>
        </motion.div>

        {/* Lower half: Performance Metrics */}
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

        {error && (
          <motion.div
            className="mt-8 text-red-500"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span>{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PrecipRF;
