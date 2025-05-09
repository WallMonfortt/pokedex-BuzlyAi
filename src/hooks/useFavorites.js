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

  const isFavorite = (name) => favorites.some(fav => fav.name === name);

  const addFavorite = (name, url) => {
    if (!isFavorite(name)) {
      setFavorites((prev) => [...prev, { name, url }]);
    }
  };

  const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter(fav => fav.name !== name));
  };

  const toggleFavorite = (name, url) => {
    isFavorite(name) ? removeFavorite(name) : addFavorite(name, url);
  };

  useEffect(() => {
    const cleaned = favorites.filter(fav => fav && fav.name && fav.url);
    if (cleaned.length !== favorites.length) {
      setFavorites(cleaned);
    }
  }, []);

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
