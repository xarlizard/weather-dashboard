// Mock response for OpenWeatherMap API (for use in tests)
export const mockWeatherResponse = {
  coord: { lon: 2.1211, lat: 41.3534 },
  weather: [
    { id: 803, main: "Clouds", description: "broken clouds", icon: "04d" },
  ],
  base: "stations",
  main: {
    temp: 21.58,
    feels_like: 21.54,
    temp_min: 21.08,
    temp_max: 22.8,
    pressure: 1012,
    humidity: 67,
    sea_level: 1012,
    grnd_level: 1005,
  },
  visibility: 10000,
  wind: { speed: 8.18, deg: 298, gust: 11.42 },
  clouds: { all: 54 },
  dt: 1747677255,
  sys: {
    type: 2,
    id: 2032131,
    country: "ES",
    sunrise: 1747628954,
    sunset: 1747681621,
  },
  timezone: 7200,
  id: 8063149,
  name: "Barri de Santa Eulàlia",
  cod: 200,
};
