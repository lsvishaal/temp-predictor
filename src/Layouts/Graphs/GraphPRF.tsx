"use client";

import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
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

const GraphPRF = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  interface WeatherModelItem {
    Date: string;
    Actual: number;
    Prediction: number;
  }

  useEffect(() => {
    fetch("https://project-weather-n4ay.onrender.com/data/precip/rf")
      .then(response => response.json())
      .then(data => {
        const formattedData = data.precipitation_rf.weather_model.map((item: WeatherModelItem) => ({
          month: item.Date,
          Actual: item.Actual,
          Prediction: item.Prediction,
        }));
        setChartData(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
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
    return <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center justify-center space-x-2">
      <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      <div>Initiating Model</div>
    </div>
  </div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle><span className='text-blue-800'>Precipitation</span> in <span className='text-green-400'>Random Forest</span></CardTitle>
        <CardDescription>Precipitation Predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
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
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing precipitation predictions for the last period
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GraphPRF;