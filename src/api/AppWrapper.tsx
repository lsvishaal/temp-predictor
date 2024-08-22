import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const fetchTemperatureData = async () => {
  const response = await fetch("/api/data/temp/linear");
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const TemperatureComponent = () => {
  const { data, error, isLoading, isError } = useQuery('temperatureData', fetchTemperatureData);

  const newPostMutation = useMutation({
    mutationFn: title => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ id: crypto.randomUUID(), title });
        }, 1000);
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <div>
      {data?.temperature_linear.weather_model.map((entry, index) => (
        <div key={index}>
          <p>Date: {entry.Date}</p>
          <p>Actual: {entry.Actual.toFixed(1)}</p>
          <p>Prediction: {entry.Prediction.toFixed(1)}</p>
          <p>Difference: {entry.diff}</p>
        </div>
      ))}
      <button onClick={() => newPostMutation.mutate("New Post")}>
        Add New
      </button>
    </div>
  );
};

const AppWrapper = () => (
  <QueryClientProvider client={queryClient}>
    <TemperatureComponent />
  </QueryClientProvider>
);

export { TemperatureComponent, AppWrapper };