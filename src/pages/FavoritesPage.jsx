import { Typography, Box, Paper, Stack } from '@mui/material';
import { useFavorites } from '../hooks/useFavorites';
import { useEffect, useState } from 'react';
import { PokemonCardList } from '../components';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      if (!favorites.length) {
        setFavoritePokemons([]);
        return;
      }
      // Fetch data for all favorite pokemons
      const results = await Promise.all(
        favorites.map(async (name) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            if (!res.ok) return null;
            const data = await res.json();
            // Adapt to expected shape for PokemonCardList
            return {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`,
            };
          } catch {
            return null;
          }
        })
      );
      setFavoritePokemons(results.filter(Boolean));
    }
    fetchFavorites();
  }, [favorites]);

  return (
    <Box sx={{ mt: 4, minHeight: '60vh' }}>
      <Typography variant="h2" align="center" gutterBottom className="pokemon-title-bg">Favoritos</Typography>
      {favorites.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center', backgroundColor: 'var(--color-lightgray)' }}>
          <Stack spacing={2} alignItems="center">
            <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Favoritos" width={80} />
            <Typography variant="h5" color="secondary" gutterBottom>
              No tienes Pokémon favoritos aún
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 500 }}>
              Haz clic en el corazón de cualquier Pokémon para guardarlo aquí.
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <Box sx={{ mt: 4 }}>
          <PokemonCardList pokemons={favoritePokemons} />
        </Box>
      )}
    </Box>
  );
}

export default FavoritesPage;
