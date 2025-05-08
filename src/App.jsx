import { Routes, Route } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/favoritos" element={<FavoritesPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;