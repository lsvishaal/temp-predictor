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

interface PrecipitationLinear {
  variance: number;
  Performance_measures: PerformanceMeasures;
}

const PrecipLR = () => {
  const [chartData, setChartData] = useState<WeatherModelItem[]>([]);
  const [performanceData, setPerformanceData] = useState<PrecipitationLinear | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-weather-n4ay.onrender.com/data/precip/linear');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const formattedData = result.weather_model.map((item: WeatherModelItem) => ({
          month: item.Date,
          Actual: item.Actual,
          Prediction: item.Prediction,
        }));
        setChartData(formattedData);
        setPerformanceData({
          variance: result.variance,
          Performance_measures: result.Performance_measures,
        });
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
    <div className="grid grid-cols-[70%_30%] gap-4 mx-1 max-w-full p-1 sm:p-2 md:p-4 lg:p-6">
      
      {/* Left side: Graph */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            <span className='text-blue-800'>Precipitation</span> in <span className='text-blue-400'>Linear Regression</span>
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
                  tickFormatter={(value = '') => value.slice(0, 3)}
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
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Showing precipitation predictions for the last period
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Right side: Description and Performance Metrics */}
      <div className="grid grid-rows-2 gap-4">
        
        {/* Upper half: Description */}
        <motion.div
          className="text-lg sm:text-xl md:text-2xl text-justify"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Since <span className='text-blue-800 font-bold'>Precipitation</span> typically exhibits{" "}
          <span className="font-bold text-red-400">High Variance</span>,{" "}
          <span className="font-bold text-blue-400">Linear Regression </span>is <strong>NOT</strong> the most suitable for predicting Precipitation trends.<br/> <p className='mt-2 text-violet-400 font-semibold'>However, it can still provide valuable insights at less variance datapoints.</p>
        </motion.div>

        {/* Lower half: Performance Metrics */}
        {performanceData && (
          <motion.div
            className="mt-20"
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
                  <TableCell className='text-2xl font-bold'>Variance</TableCell>
                  <TableCell className='text-xl font-bold tracking-wider'>{performanceData.variance}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-2xl font-bold'>Mean Absolute Error</TableCell>
                  <TableCell className='text-xl font-bold tracking-wider'>{performanceData.Performance_measures.mean_absolute_error}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className='text-2xl font-bold'>R² Score</TableCell>
                  <TableCell className='text-xl font-bold tracking-wider'>{performanceData.Performance_measures.r2_score}</TableCell>
                </TableRow>
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

export default PrecipLR;