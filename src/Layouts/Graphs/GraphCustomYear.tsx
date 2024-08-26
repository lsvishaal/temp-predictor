"use client";

import React, { useState } from 'react';
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

const GraphCustomYear = () => {
  const [year, setYear] = useState('');
  const [chartData, setChartData] = useState({
    linear_temp: [],
    linear_precip: [],
    rf_temp: [],
    rf_precip: [],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
    return <div>Initiating Model</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year"
          className="px-4 py-2 bg-black border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      {['linear_temp', 'linear_precip', 'rf_temp', 'rf_precip'].map((key) => (
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