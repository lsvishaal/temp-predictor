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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/submit-year/', {
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
    return <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center justify-center space-x-2">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <div>Model Initiating</div>
    </div>
  </div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={year}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
          placeholder="Enter year"
          className="mt-20 px-2 py-2 bg-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Generate
        </button>
  
        
      
      </form>

      {(['linear_temp', 'linear_precip', 'rf_temp', 'rf_precip'] as const).map((key) => (
        <div key={key} className="my-12 w-full max-w-4xl">
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
      ))}
    </div>
  );
};

export default GraphCustomYear;