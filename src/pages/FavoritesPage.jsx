import { Typography, Box, Paper, Stack } from '@mui/material';
import { useFavorites } from '../hooks/useFavorites';
import { PokemonCardList } from '../components';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoritePokemons = favorites;

  return (
    <Box sx={{ minHeight: '60vh' }}>
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
        <PokemonCardList pokemons={favoritePokemons} />
      )}
    </Box>
  );
}

export default FavoritesPage;
