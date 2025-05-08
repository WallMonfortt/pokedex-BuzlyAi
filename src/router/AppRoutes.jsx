import { Routes, Route } from 'react-router-dom';
import PokemonListPage from '../pages/PokemonListPage';
import PokemonDetailPage from '../pages/PokemonDetailPage';
import AboutPage from '../pages/AboutPage';
import FavoritesPage from '../pages/FavoritesPage';

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