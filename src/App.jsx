import { BrowserRouter, Routes, Route } from "react-router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Search from "@/components/features/search/Search";
import LocationDashboard from "@/components/features/weather/LocationDashboard";
import MapSelector from "@/components/features/map/MapSelector";
import { WeatherProvider } from "@/contexts/WeatherContext";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="mb-4 text-3xl font-bold">Welcome to the Weather Dashboard</h1>
      <p className="text-lg text-muted-foreground text-center max-w-xl">
        Search for a location or use the URL to view weather data for specific
        coordinates.
      </p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="search">
            <Route index element={<Search.Latitude />} />
            <Route path="coordinates" element={<Search.Latitude />} />
            <Route path="city" element={<Search.CityName />} />
          </Route>
          <Route path="map" element={<MapSelector />} />
          <Route
            path=":location"
            element={
              <WeatherProvider>
                <LocationDashboard />
              </WeatherProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
