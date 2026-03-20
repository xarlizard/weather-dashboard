import { useWeatherContext } from "@/contexts/WeatherContext";
import WeatherDataCard from "./WeatherDataCard";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription } from "@/components/ui/alert";

function LocationDashboard() {
  const { data, loading, error } = useWeatherContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="size-12 text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <WeatherDataCard data={data} />
    </div>
  );
}

export default LocationDashboard;
