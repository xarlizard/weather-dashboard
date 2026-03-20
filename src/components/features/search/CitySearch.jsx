import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

function CitySearch() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const results = await response.json();

      if (results && results.length > 0) {
        const { lat, lon } = results[0];
        navigate(`/${lat},${lon}`);
      } else {
        setError("City not found. Please try a different name.");
      }
    } catch (err) {
      setError("Error searching for city. Please try again later.");
      console.error("Geocoding error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] p-4">
      <Card className="w-full max-w-[600px] bg-[var(--color-card-bg)] border-none shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-center text-[var(--color-dashboard-title)] text-2xl">
            Search Weather by City Name
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="city">City Name</Label>
              <Input
                id="city"
                type="text"
                placeholder="Enter city name..."
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Searching..." : "Get Weather"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CitySearch;
