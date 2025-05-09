import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'pokedex_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (name) => favorites.includes(name);

  const addFavorite = (name) => {
    if (!isFavorite(name)) setFavorites((prev) => [...prev, name]);
  };

  const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter((n) => n !== name));
  };

  const toggleFavorite = (name) => {
    isFavorite(name) ? removeFavorite(name) : addFavorite(name);
  };

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
