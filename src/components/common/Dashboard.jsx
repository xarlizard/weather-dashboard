import DashboardLayout from "@/components/layout/DashboardLayout";
import WeatherDataCard from "@/components/features/weather/WeatherDataCard";
import { useWeather } from "@/hooks/useWeather";
import { useParams } from "react-router";

function Dashboard() {
  const params = useParams();
  let latlon = [41.3534, 2.1211];
  if (params.location) {
    const parts = params.location.split(",");
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      latlon = [parseFloat(parts[0]), parseFloat(parts[1])];
    }
  }
  const { data, loading, error } = useWeather(latlon[0], latlon[1]);

  return (
    <DashboardLayout>
      <div className="w-full flex justify-center px-2 md:px-4">
        <div className="w-full max-w-2xl">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-destructive">{error}</p>}
          <WeatherDataCard data={data} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
