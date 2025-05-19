import { useNavigate } from "react-router";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./MapSelector.module.css";

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
    <div className={styles.mapContainer}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className={styles.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents />
      </MapContainer>
      <div className={styles.instructions}>
        Click anywhere on the map to get weather data for that location
      </div>
    </div>
  );
}

export default MapSelector;
