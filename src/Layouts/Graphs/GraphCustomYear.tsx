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

// ChartData interface with additional calculated statistics.
interface ChartData {
  linear_temp: Array<{ Date: string; predicted_value: number }>;
  linear_precip: Array<{ Date: string; predicted_value: number }>;
  rf_temp: Array<{ Date: string; predicted_value: number }>;
  rf_precip: Array<{ Date: string; predicted_value: number }>;
}

interface Statistics {
  mean: number;
  median: number;
  mode: number;
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
  const [statistics, setStatistics] = useState<{ [key: string]: Statistics }>({});

  // Helper functions to calculate mean, median, and mode
  const calculateStatistics = (data: Array<{ predicted_value: number }>): Statistics => {
    const values = data.map(item => item.predicted_value);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    
    // Calculate median
    values.sort((a, b) => a - b);
    const mid = Math.floor(values.length / 2);
    const median = values.length % 2 !== 0 ? values[mid] : (values[mid - 1] + values[mid]) / 2;

    // Calculate mode
    const frequency: { [key: number]: number } = {};
    values.forEach(val => frequency[val] = (frequency[val] || 0) + 1);
    const mode = Object.keys(frequency).reduce((a, b) => frequency[Number(a)] > frequency[Number(b)] ? a : b, 0);

    return {
      mean,
      median,
      mode: Number(mode),
    };
  };

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

      // Calculate statistics for each dataset
      setStatistics({
        linear_temp: calculateStatistics(data.linear_temp),
        linear_precip: calculateStatistics(data.linear_precip),
        rf_temp: calculateStatistics(data.rf_temp),
        rf_precip: calculateStatistics(data.rf_precip),
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
      color: 'hsl(var(--chart-3))',
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
    <div className="flex flex-col items-center justify-center mb-96">
      <form onSubmit={handleSubmit} className="mb-1">
        <h1 className=' flex text-center text-5xl tracking-wider font-bold bg-gradient-to-r from-blue-600 via-green-500 to-purple-400 text-transparent bg-clip-text'>
        </h1>
        <input
          type="text"
          value={year}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setYear(e.target.value)}
          placeholder="Year"
          className="mt-10 px-2 py-2 mb-10 dark:bg-black dark:text-purple-600 light:bg-white light:text-red-400 text-center text-slate-950 font-bold border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-700"
        />
        <button className="inline-flex h-11 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 ml-5 font-bold text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          Go! 
        </button>
      </form>

      {predictionsGenerated && (
        (['linear_temp', 'linear_precip', 'rf_temp', 'rf_precip'] as const).map((key) => (
          <div key={key} className="flex flex-col lg:flex-row my-6 w-full max-w-7xl">
            <Card className="flex-1">
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
                      tickMargin={12}
                      interval={32} // Ensure all ticks are shown
                      tickFormatter={(_value, index) => {
                        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        return months[index % 12];
                      }}
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
            <div className="mt-4 lg:mt-0 lg:ml-4 flex-shrink-0">
              <Card className="shadow-sm border rounded-lg p-4 bg-white dark:bg-slate-950">
                <CardHeader>
                  <CardTitle></CardTitle>
                  <CardDescription>{key.replace('_', ' ').toUpperCase()} Stats</CardDescription>
                </CardHeader>
                <CardContent>
                  <table className="min-w-full bg-white dark:bg-slate-950 border">
                    <thead>
                      <tr className='text-orange-200'>
                        <th className="px-4 py-2 border">Statistic</th>
                        <th className="px-4 py-2 border">Value</th>
                      </tr>
                    </thead>
                    <tbody className='text-orange-400'>
                      <tr>
                        <td className="px-4 py-2 border">Mean</td>
                        <td className="px-4 py-2 border font-bold">{statistics[key]?.mean.toFixed(2) || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Median</td>
                        <td className="px-4 py-2 border font-bold">{statistics[key]?.median.toFixed(2) || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border">Mode</td>
                        <td className="px-4 py-2 border font-bold">{statistics[key]?.mode.toFixed(2) || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GraphCustomYear;
