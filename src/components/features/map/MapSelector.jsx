import { useNavigate } from "react-router";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapEvents() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`/${lat.toFixed(4)},${lng.toFixed(4)}`);
    },
  });

  return null;
}

function MapSelector() {
  return (
    <div className="relative w-full h-[calc(100vh-2rem)] rounded-lg overflow-hidden bg-[var(--color-card-bg)] shadow-[0_0_10px_var(--color-card-shadow)]">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
      </MapContainer>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[var(--color-card-bg)] px-4 py-2 rounded-lg shadow-md text-sm text-[var(--color-text)] z-[1000]">
        Click anywhere on the map to get weather data for that location
      </div>
    </div>
  );
}

export default MapSelector;
