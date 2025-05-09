import { Routes, Route } from 'react-router-dom';
import { PokemonListPage, PokemonDetailPage, FavoritesPage, AboutPage } from '../pages';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PokemonListPage />} />
      <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/favoritos" element={<FavoritesPage />} />
    </Routes>
  );
}