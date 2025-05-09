import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchPokemonDetail } from '../services/pokeapi';
import {
  Card, Typography, Stack, Chip, Button, CircularProgress, CardMedia, Box
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

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const bgColor = `var(--color-${mainType})`;
  const artworkUrl = pokemon.sprites.other['official-artwork'].front_default;
  const gifUrl = `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`;

  return (
    <>
    <Button component={RouterLink} to="/" variant="outlined" sx={{ mt: 2, bgcolor: '#fff', boxShadow: 1 }}>
        Volver
      </Button>
    <Card
      sx={{
        mt: 4,
        mx: 'auto',
        maxWidth: 500,
        minHeight: 620,
        borderRadius: 4,
        boxShadow: 8,
        position: 'relative',
        overflow: 'visible',
        bgcolor: bgColor,
        p: 3,
      }}
    >
      <Stack alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>

        <Box sx={{
          bgcolor: 'rgba(255,255,255,0.55)',
          borderRadius: '50%',
          width: 150,
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 3,
          mt: 4,
          mb: 2,
        }}>
          <img
            src={gifUrl}
            alt={pokemon.name + ' gif'}
            style={{ width: 90, height: 90, objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#333', textShadow: '1px 1px 5px rgba(255,255,255,0.3)' }}>
          {pokemon.name}
          <Typography component="span" variant="subtitle1" color="text.secondary" sx={{ ml: 1, fontWeight: 400 }}>#{pokemon.id}</Typography>
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 1 }}>
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.8)', px: 2, py: 1, borderRadius: 2, minWidth: 80, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">Peso</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{pokemon.weight / 10} kg</Typography>
          </Box>
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.8)', px: 2, py: 1, borderRadius: 2, minWidth: 80, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">Altura</Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{pokemon.height / 10} m</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          {pokemon.types.map((typeObj) => (
            <Chip
              key={typeObj.type.name}
              label={typeObj.type.name}
              sx={{
                bgcolor: `var(--color-${typeObj.type.name})`,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 16,
                textTransform: 'capitalize',
                px: 2,
                boxShadow: 1,
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          right: -100,
          width: 300,
          height: 300,
          zIndex: 3,
          filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.25))',
        }}
      >
        <CardMedia
          component="img"
          image={artworkUrl}
          alt={pokemon.name}
          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </Box>
    </Card>
    </>
  );
}

export default PokemonDetailPage;