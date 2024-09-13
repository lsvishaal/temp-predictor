"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ChartData {
  linear_temp: Array<{ Date: string; predicted_value: number }>;
  linear_precip: Array<{ Date: string; predicted_value: number }>;
  rf_temp: Array<{ Date: string; predicted_value: number }>;
  rf_precip: Array<{ Date: string; predicted_value: number }>;
}

const GraphCustomYear = () => {
  const [year, setYear] = useState<string>('');
  const [chartData, setChartData] = useState<ChartData>({
    linear_temp: [],
    linear_precip: [],
    rf_temp: [],
    rf_precip: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [predictionsGenerated, setPredictionsGenerated] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://project-weather-n4ay.onrender.com/submit-year/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ year }),
      });
      const data = await response.json();
      setChartData({
        linear_temp: data.linear_temp,
        linear_precip: data.linear_precip,
        rf_temp: data.rf_temp,
        rf_precip: data.rf_precip,
      });
      setPredictionsGenerated(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartConfig = {
    predicted_value: {
      label: 'Predicted Value',
      color: 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-3 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          <div>Model Initiating</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mb-40 mt-5">
      <form onSubmit={handleSubmit} className="mb-1">
        <h1 className=' flex text-center text-5xl tracking-wider font-bold bg-gradient-to-r from-blue-600 via-green-500 to-purple-400 text-transparent bg-clip-text'>
        </h1>
        <input
  type="text"
  value={year}
  onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
  placeholder="Year"
  className="mt-10 px-2 py-2 dark:bg-black dark:text-purple-600 light:bg-white light:text-red-400 text-center text-slate-950 font-bold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-700"
/>
        <button className="inline-flex h-11 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 ml-5 font-bold text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Go! 
        </button>
      </form>

      {predictionsGenerated && (
        (['linear_temperature', 'linear_precip', 'rf_temp', 'rf_precip'] as const).map((key) => (
          <div key={key} className="my-1 w-full max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle>{key.replace('_', ' ').toUpperCase()}</CardTitle>
                <CardDescription>Year: {year}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <LineChart
                    accessibilityLayer
                    data={chartData[key]}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="Date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value = '') => value.slice(0, 5)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                      dataKey="predicted_value"
                      type="monotone"
                      stroke="var(--color-predicted_value)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

export default GraphCustomYear;