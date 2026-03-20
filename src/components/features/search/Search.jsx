import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CitySearch from "./CitySearch";

function CoordinateSearch() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState({ lat: "", lon: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const { lat, lon } = coordinates;

    if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
      setError("Please enter valid coordinates");
      return;
    }

    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError(
        "Coordinates out of range. Latitude: -90 to 90, Longitude: -180 to 180"
      );
      return;
    }

    navigate(`/${lat},${lon}`);
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="w-full max-w-[600px] bg-[var(--color-card-bg)] border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-center text-[var(--color-dashboard-title)] text-2xl">
            Search Weather by Coordinates
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="lat">Latitude</Label>
                <div className="flex">
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    placeholder="e.g. 41.3534"
                    value={coordinates.lat}
                    onChange={(e) =>
                      setCoordinates((prev) => ({ ...prev, lat: e.target.value }))
                    }
                    className="rounded-r-none"
                  />
                  <span className="inline-flex items-center px-3 bg-primary text-primary-foreground rounded-r-md text-sm">
                    °N/S
                  </span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="lon">Longitude</Label>
                <div className="flex">
                  <Input
                    id="lon"
                    type="number"
                    step="any"
                    placeholder="e.g. 2.1211"
                    value={coordinates.lon}
                    onChange={(e) =>
                      setCoordinates((prev) => ({ ...prev, lon: e.target.value }))
                    }
                    className="rounded-r-none"
                  />
                  <span className="inline-flex items-center px-3 bg-primary text-primary-foreground rounded-r-md text-sm">
                    °E/W
                  </span>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Get Weather
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const Search = {
  Latitude: CoordinateSearch,
  CityName: CitySearch,
};

export default Search;
