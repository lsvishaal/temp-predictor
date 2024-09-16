import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'; // Adjust the import path as necessary

interface WeatherModel {
  index: number;
  Date: string;
  Actual: number;
  Prediction: number;
  diff: number;
}

interface TemperatureLinear {
  variance: number;
  Performace_measures: {
    mean_absolute_error: number;
    r2_score: number;
  };
  prediction: number;
  weather_model: WeatherModel[];
}

const TLRDesc = () => {
  const [data, setData] = useState<TemperatureLinear | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-weather-n4ay.onrender.com/data/temp/linear');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.temperature_linear);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          console.error('Error fetching data:', err);
        } else {
          setError('An unknown error occurred');
          console.error('Unknown error fetching data:', err);
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="my-24 mx-4 sm:my-32 sm:mx-8 md:my-48 md:mx-16 lg:my-64 lg:mx-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-red-400 font-bold text-center">
        Linear Regression for Temperature
      </h1>

      <div className="text-lg sm:text-xl md:text-2xl mt-8 sm:mt-10 md:mt-12 text-justify mx-4 sm:mx-8 md:mx-16 lg:mx-48">
        Since temperature typically exhibits{" "}
        <span className="font-bold text-red-400">less variance</span>,{" "}
        <span className="font-bold">linear regression </span>is more suitable
        for predicting temperature trends due to its ability to model linear
        relationships effectively.
      </div>

      {error && (
        <div className="mt-8 text-red-500">
          <p>Error fetching data: {error}</p>
        </div>
      )}

      {data && (
        <Table className="mt-20">
          <TableHeader>
            <TableRow className='font-bold md:text-3xl sm:text-base'>
              <TableHead>Metric</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='text-2xl font-bold'>Variance</TableCell>
              <TableCell className='text-xl font-bold tracking-wider'>{data.variance}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='text-2xl font-bold'>Mean Absolute Error</TableCell>
              <TableCell className='text-xl font-bold tracking-wider'>{data.Performace_measures.mean_absolute_error}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='text-2xl font-bold'>R² Score</TableCell>
              <TableCell className='text-xl font-bold tracking-wider'>{data.Performace_measures.r2_score}</TableCell>
            </TableRow>
            <TableRow>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default TLRDesc;