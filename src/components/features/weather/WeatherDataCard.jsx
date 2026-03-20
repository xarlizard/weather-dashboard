import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PropTypes from "prop-types";
import {
  Thermometer,
  Droplets,
  Wind,
  Cloud,
  Gauge,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const detailIcons = {
  "Feels Like": Thermometer,
  Humidity: Droplets,
  Wind: Wind,
  "Cloud Cover": Cloud,
  Pressure: Gauge,
};

function DetailItem({ icon, label, value, unit }) {
  const Icon = detailIcons[label] || Thermometer;
  return (
    <Card className="h-full bg-[var(--color-card-bg)] border-[var(--color-card-shadow)] hover:-translate-y-0.5 transition-transform">
      <CardContent className="flex items-center p-4">
        <div className="flex items-center justify-center w-10 h-10 text-[var(--color-weather-main)]">
          <Icon className="size-6" />
        </div>
        <div className="ms-3">
          <div className="text-sm text-[var(--color-weather-desc)]">{label}</div>
          <div className="text-lg font-semibold text-[var(--color-weather-main)]">
            {value}
            <span className="text-sm text-[var(--color-weather-desc)] ms-1">
              {unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

DetailItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string.isRequired,
};

function WeatherDataCard({ data }) {
  if (!data) return null;

  const details = [
    {
      label: "Feels Like",
      value: Math.round(data.main.feels_like),
      unit: "°C",
    },
    {
      label: "Humidity",
      value: data.main.humidity,
      unit: "%",
    },
    {
      label: "Wind",
      value: Math.round(data.wind.speed * 10) / 10,
      unit: "m/s",
    },
    {
      label: "Cloud Cover",
      value: data.clouds.all,
      unit: "%",
    },
    {
      label: "Pressure",
      value: data.main.pressure,
      unit: "hPa",
    },
  ];

  return (
    <Card className="bg-[var(--color-card-bg)] border-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all overflow-hidden">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-weather-main)] m-0 flex items-center justify-center gap-2 flex-wrap">
            {data.name}
            <Badge variant="secondary" className="text-sm">
              {data.sys.country}
            </Badge>
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-around gap-8 mb-10">
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].main}
              className="w-28 h-28 md:w-32 md:h-32 drop-shadow-lg"
            />
            <div className="mt-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-weather-main)] m-0">
                {data.weather[0].main}
              </h3>
              <p className="text-[var(--color-weather-desc)] text-lg mt-1 capitalize">
                {data.weather[0].description}
              </p>
            </div>
          </div>

          <div className="text-center">
            <span className="text-5xl md:text-7xl font-bold text-[var(--color-weather-temp)] leading-none">
              {Math.round(data.main.temp)}
            </span>
            <span className="text-2xl md:text-3xl font-medium text-[var(--color-weather-desc)] ml-1">
              °C
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {details.map((detail, index) => (
            <DetailItem key={index} {...detail} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Badge variant="outline" className="px-4 py-2 text-sm">
            <MapPin className="size-4 inline mr-1" />
            {Math.abs(data.coord.lat).toFixed(4)}°
            {data.coord.lat >= 0 ? "N" : "S"},{" "}
            {Math.abs(data.coord.lon).toFixed(4)}°
            {data.coord.lon >= 0 ? "E" : "W"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

WeatherDataCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sys: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    clouds: PropTypes.shape({
      all: PropTypes.number.isRequired,
    }).isRequired,
    coord: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }),
};

export default WeatherDataCard;
