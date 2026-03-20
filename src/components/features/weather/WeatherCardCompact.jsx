import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { MapPin, Thermometer, Droplets, Wind, Gauge } from "lucide-react";

function WeatherCardCompact({ data, loading, error, cityName }) {
  if (loading) {
    return (
      <Card className="bg-[var(--color-card-bg)] border-[var(--color-card-shadow)] overflow-hidden">
        <CardContent className="p-6 flex items-center justify-center min-h-[320px]">
          <Spinner className="size-8 text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-[var(--color-card-bg)] border-[var(--color-card-shadow)] overflow-hidden">
        <CardContent className="p-6 min-h-[320px] flex items-center justify-center">
          <p className="text-destructive text-sm text-center">{cityName}: {error || "Unable to load"}</p>
        </CardContent>
      </Card>
    );
  }

  const { lat, lon } = data.coord;
  const to = `/${lat.toFixed(4)},${lon.toFixed(4)}`;

  const details = [
    { icon: Thermometer, label: "Feels like", value: `${Math.round(data.main.feels_like)}°C` },
    { icon: Droplets, label: "Humidity", value: `${data.main.humidity}%` },
    { icon: Wind, label: "Wind", value: `${Math.round(data.wind.speed * 10) / 10} m/s` },
    { icon: Gauge, label: "Pressure", value: `${data.main.pressure} hPa` },
  ];

  return (
    <Link to={to} className="block no-underline">
      <Card className="bg-[var(--color-card-bg)] border-[var(--color-card-shadow)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all h-full min-h-[320px] group">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-[var(--color-weather-main)] m-0 group-hover:text-[var(--color-primary)] transition-colors">
                {data.name}
              </h3>
              <p className="text-sm text-[var(--color-weather-desc)] mt-0.5">
                {data.sys.country}
              </p>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].main}
              className="w-14 h-14 shrink-0"
            />
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-[var(--color-weather-temp)]">
              {Math.round(data.main.temp)}
            </span>
            <span className="text-lg text-[var(--color-weather-desc)]">°C</span>
          </div>
          <p className="text-sm text-[var(--color-weather-desc)] capitalize mt-1">
            {data.weather[0].description}
          </p>
          <div className="mt-5 pt-4 border-t border-[var(--color-card-shadow)] space-y-2 flex-1">
            {details.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-[var(--color-weather-desc)]">
                  <Icon className="size-4 shrink-0" />
                  {label}
                </span>
                <span className="font-medium text-[var(--color-weather-main)]">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[var(--color-weather-desc)]">
            <MapPin className="size-3.5" />
            View full details →
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default WeatherCardCompact;
