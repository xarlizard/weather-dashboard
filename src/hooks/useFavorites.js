import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "weather-dashboard-favorites";

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

function favoriteId(lat, lon) {
  return `${lat.toFixed(4)},${lon.toFixed(4)}`;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const addFavorite = useCallback((lat, lon, name) => {
    const id = favoriteId(lat, lon);
    setFavorites((prev) => {
      if (prev.some((f) => f.id === id)) return prev;
      return [...prev, { id, lat, lon, name }];
    });
  }, []);

  const removeFavorite = useCallback((lat, lon) => {
    const id = favoriteId(lat, lon);
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback(
    (lat, lon) => favorites.some((f) => f.id === favoriteId(lat, lon)),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (lat, lon, name) => {
      if (isFavorite(lat, lon)) {
        removeFavorite(lat, lon);
      } else {
        addFavorite(lat, lon, name);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
