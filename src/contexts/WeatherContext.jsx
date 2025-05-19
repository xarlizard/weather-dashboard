import { createContext, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useWeather } from "@/hooks/useWeather";

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const params = useParams();
  const navigate = useNavigate();
  let latlon = [null, null];

  // Parse location from URL params
  if (params.location) {
    const parts = params.location.split(",");
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      latlon = [parseFloat(parts[0]), parseFloat(parts[1])];
    }
  }

  const { data, loading, error } = useWeather(latlon[0], latlon[1]);

  // Navigate to home if coordinates are invalid
  if (params.location && (!latlon[0] || !latlon[1])) {
    navigate("/");
  }

  const value = {
    data,
    loading,
    error,
    coordinates: latlon,
    setLocation: (lat, lon) => {
      navigate(`/${lat},${lon}`);
    },
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export function useWeatherContext() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
}
