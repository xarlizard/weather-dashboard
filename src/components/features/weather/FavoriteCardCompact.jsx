import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useWeather } from "@/hooks/useWeather";
import { MapPin, Star, X } from "lucide-react";

function FavoriteCardCompact({ favorite, onRemove }) {
  const { lat, lon, name } = favorite;
  const { data, loading, error } = useWeather(lat, lon);
  const to = `/${lat.toFixed(4)},${lon.toFixed(4)}`;

  if (loading) {
    return (
      <Card className="bg-[var(--color-card-bg)] border-[var(--color-card-shadow)] overflow-hidden">
        <CardContent className="p-4 flex items-center justify-center min-h-[120px]">
          <Spinner className="size-6 text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[var(--color-card-bg)] border-[var(--color-card-shadow)] overflow-hidden hover:shadow-md transition-all group relative">
      <Button
        variant="ghost"
        size="icon-xs"
        className="group/btn absolute top-1 right-1 size-7 opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive z-10"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(lat, lon);
        }}
        aria-label="Remove from favorites"
      >
        <Star className="size-4 fill-current transition-opacity group-hover/btn:opacity-0" />
        <X className="size-4 absolute inset-0 m-auto transition-opacity opacity-0 group-hover/btn:opacity-100" />
      </Button>
      <Link to={to} className="block no-underline">
        <CardContent className="p-4 pr-10">
          {error ? (
            <p className="text-destructive text-xs">{name}</p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-[var(--color-weather-main)] m-0 truncate group-hover:text-[var(--color-primary)] transition-colors">
                  {data?.name ?? name}
                </h4>
                {data && (
                  <img
                    src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt=""
                    className="w-10 h-10 shrink-0"
                  />
                )}
              </div>
              {data && (
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[var(--color-weather-temp)]">
                    {Math.round(data.main.temp)}
                  </span>
                  <span className="text-sm text-[var(--color-weather-desc)]">°C</span>
                </div>
              )}
              <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--color-weather-desc)]">
                <MapPin className="size-3.5" />
                View details →
              </div>
            </>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}

export default FavoriteCardCompact;
