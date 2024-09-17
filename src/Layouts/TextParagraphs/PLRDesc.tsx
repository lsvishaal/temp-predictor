import { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'; // Adjust the import path as necessary

interface PerformanceMeasures {
  mean_absolute_error: number;
  r2_score: number;
}

interface PrecipitationLinear {
  variance: number;
  Performance_measures: PerformanceMeasures;
}

const PLRDesc = () => {
  const [data, setData] = useState<PrecipitationLinear | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-weather-n4ay.onrender.com/data/precip/linear');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Fetched data:', result); // Debugging log
        setData({
          variance: result.variance,
          Performance_measures: result.Performance_measures,
        });
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
      <h1 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-center">
      <span className='text-blue-800'>Precipitation</span> in <span className='text-blue-400'>Linear Regression</span>
      </h1>

      <div className="text-lg sm:text-xl md:text-2xl mt-8 sm:mt-10 md:mt-12 text-justify mx-4 sm:mx-8 md:mx-16 lg:mx-48">
        Since <span className='text-blue-800 font-bold'>Precipitation</span> typically exhibits{" "}
        <span className="font-bold text-red-400">High Variance</span>,{" "}
        <span className="font-bold text-blue-400">Linear Regression </span>is <strong>NOT</strong> the most suitable for predicting Precipitation trends.<br/> <p className='mt-2 text-violet-400 font-semibold'>However, it can still provide valuable insights at less variance datapoints.</p>
      </div>

      {error && (
        <div className="mt-8 text-red-500">
          <span>Error fetching data: {error}</span>
        </div>
      )}

      {data ? (
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
              <TableCell className='text-xl font-bold tracking-wider'>{data.Performance_measures.mean_absolute_error}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='text-2xl font-bold'>R² Score</TableCell>
              <TableCell className='text-xl font-bold tracking-wider'>{data.Performance_measures.r2_score}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <div className="mt-8 text-red-500">
          <span>Loading data...</span>
        </div>
      )}
    </div>
  );
};

export default PLRDesc;