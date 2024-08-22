"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useQuery, QueryClient, QueryClientProvider } from 'react-query'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const queryClient = new QueryClient();

const fetchTemperatureData = async () => {
  const response = await fetch("/api/data/temp/linear");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const chartConfig = {
  desktop: {
    label: "Actual",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Predicted",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const GraphComponent = () => {
  const { data, error, isLoading, isError } = useQuery('temperatureData', fetchTemperatureData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  const chartData = data?.temperature_linear.weather_model.map((entry) => ({
    month: entry.Date,
    desktop: entry.Actual,
    mobile: entry.Prediction,
  }));

  return (
    <Card className="m-3 py-10">
      <CardHeader>
        <CardTitle>Temperature - Linear Regression</CardTitle>
        <CardDescription>January - December 2023</CardDescription>
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="natural"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

const Graph = () => (
  <QueryClientProvider client={queryClient}>
    <GraphComponent />
  </QueryClientProvider>
);

export { Graph };