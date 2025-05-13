import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'pokedex_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (name) => !!favorites[name];

  const addFavorite = (name, url) => {
    setFavorites((prev) => {
      if (prev[name]) return prev;
      return { ...prev, [name]: { name, url } };
    });
  };

  const removeFavorite = (name) => {
    setFavorites((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const toggleFavorite = (name, url) => {
    isFavorite(name) ? removeFavorite(name) : addFavorite(name, url);
  };


  const favoritesArray = Object.values(favorites);

  return { favorites, favoritesArray, isFavorite, addFavorite, removeFavorite, toggleFavorite };
}
