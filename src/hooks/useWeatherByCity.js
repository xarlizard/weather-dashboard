import { useState, useEffect } from "react";
import axios from "axios";

const APP_KEY = import.meta.env.VITE_APP_Key;
const client = axios.create({
  baseURL: "https://api.openweathermap.org",
});

export function useWeatherByCity(cityName) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    setLoading(true);
    setError(null);
    client
      .get(
        `/data/2.5/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${APP_KEY}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {
        setError("Failed to fetch weather.");
      })
      .finally(() => setLoading(false));
  }, [cityName]);

  return { data, loading, error };
}
