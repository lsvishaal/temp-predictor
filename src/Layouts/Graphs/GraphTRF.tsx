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

interface WeatherModelItem {
  Date: string;
  Actual: number;
  Prediction: number;
}

const GraphTRF = () => {
  const [chartData, setChartData] = useState<WeatherModelItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://project-weather-n4ay.onrender.com/data/temp/rf`)
      .then(response => response.json())
      .then(data => {
        const formattedData = data.temperature_rf.weather_model.map((item: WeatherModelItem) => ({
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
      color: 'hsl(var(--chart-3))',
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

  return (
    <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl"> <span className='text-red-400'>Temperature</span> in <span className='text-green-400'>Random Forest</span></CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg lg:text-xl">
          Temperature Predictions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-64 sm:h-80 md:h-96 lg:h-[30rem]">
          <LineChart
            accessibilityLayer
            data={chartData}
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
      <CardFooter className="text-sm sm:text-base md:text-lg lg:text-xl">
        <div className="flex w-full items-start gap-2">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing temperature predictions for the last period
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GraphTRF;