import { BrowserRouter, Routes, Route } from "react-router";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Search from "@/components/features/search/Search";
import LocationDashboard from "@/components/features/weather/LocationDashboard";
import MapSelector from "@/components/features/map/MapSelector";
import WeatherCardCompact from "@/components/features/weather/WeatherCardCompact";
import FavoriteCard from "@/components/features/weather/FavoriteCard";
import FavoriteCardCompact from "@/components/features/weather/FavoriteCardCompact";
import { WeatherProvider } from "@/contexts/WeatherContext";
import { useWeatherByCity } from "@/hooks/useWeatherByCity";
import { useFavorites } from "@/hooks/useFavorites";

const HOME_CITIES = ["Milan", "Barcelona", "Bristol", "Amsterdam", "Tokyo"];

function Home() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-dashboard-title)] mb-2">
          Weather Overview
        </h1>
        <p className="text-muted-foreground">
          Click a city for detailed weather information
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {HOME_CITIES.map((city) => (
          <HomeCityCard key={city} cityName={city} />
        ))}
      </div>
      {favorites.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-dashboard-title)]">
            My Favorites
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {favorites.map((fav) => (
              <FavoriteCardCompact
                key={fav.id}
                favorite={fav}
                onRemove={removeFavorite}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold text-[var(--color-dashboard-title)] mb-2">
          My Favorites
        </h1>
        <p className="text-muted-foreground max-w-md">
          No favorites yet. Visit a location and click the star to add it here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-dashboard-title)] mb-2">
          My Favorites
        </h1>
        <p className="text-muted-foreground">
          Click a card for full details, or remove with the star
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {favorites.map((fav) => (
          <FavoriteCard
            key={fav.id}
            favorite={fav}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
}

function HomeCityCard({ cityName }) {
  const { data, loading, error } = useWeatherByCity(cityName);
  return (
    <WeatherCardCompact
      data={data}
      loading={loading}
      error={error}
      cityName={cityName}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<FavoritesPage />} />
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
