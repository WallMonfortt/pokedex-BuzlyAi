import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchPokemonDetail } from '../services/pokeapi';
import {
  Card, CardContent, Typography, Stack, Chip, Button, CircularProgress, CardMedia
} from '@mui/material';

function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemonDetail(name)
      .then(data => {
        setPokemon(data);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <Stack alignItems="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!pokemon) {
    return <Typography variant="h6">Pokémon no encontrado</Typography>;
  }

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent>
        <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>
          Volver
        </Button>
        <Stack alignItems="center" spacing={2}>
          <CardMedia
            component="img"
            image={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant="h4" gutterBottom>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </Typography>
          <Typography variant="body1">Peso: {pokemon.weight / 10} kg</Typography>
          <Typography variant="body1">Altura: {pokemon.height / 10} m</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            {pokemon.types.map((typeObj) => (
              <Chip
                key={typeObj.type.name}
                label={typeObj.type.name}
                color="primary"
                variant="outlined"
              />
            ))}
          </Stack>
          <img 
              src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`}
              alt="gif"
            />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PokemonDetailPage;