import { Routes, Route } from 'react-router-dom';
import PokemonListPage from './pages/PokemonListPage';
import PokemonDetailPage from './pages/PokemonDetailPage';
import { CssBaseline, Container } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<PokemonListPage />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;