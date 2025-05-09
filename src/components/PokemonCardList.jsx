import { Link } from 'react-router-dom';
import { Card, Typography, Tooltip } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteButton } from '../components';
import { getDreamWorldSprite, getDefaultSprite } from '../constants/urls';

function PokemonCardList({ pokemons }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <Grid container spacing={3} sx={{ maxWidth: 1040, margin: '0 auto' }} justifyContent="center">
      {pokemons.map((pokemon) => {
        if (!pokemon || !pokemon.url) return null;
        let number = pokemon.url.split('/').filter(Boolean).pop();
        if (isNaN(Number(number))) number = pokemon.name;
        const dreamWorldUrl = getDreamWorldSprite(number);
        const defaultSpriteUrl = getDefaultSprite(number);
        const fav = isFavorite(pokemon.name);
        return (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} justifyContent="center" display="flex" key={pokemon.name}>
            <Card
              sx={{
                textDecoration: 'none',
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: 3,
                pt: 0,
                pb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '2px solid transparent',
                transition: 'border 0.2s, box-shadow 0.2s, transform 0.2s',
                minWidth: { xs: 220, sm: 240 },
                maxWidth: { xs: 300, sm: 340 },
                position: 'relative',
                '&:hover': {
                  border: '2px solid var(--color-water)',
                  boxShadow: 12,
                  transform: 'scale(1.08) translateY(-5px)',
                  bgcolor: 'rgba(0, 0, 0, 0.06)',
                },
                '&:hover img': {
                  transform: 'scale(1.15) rotate(-3deg)',
                  transition: 'transform 0.3s',
                },
              }}
            >
              {/* Fav button */}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minHeight: 40, marginBottom: 2 }}>
                <Tooltip title={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}>
                  <FavoriteButton
                    isFavorite={fav}
                    onClick={e => { e.stopPropagation(); toggleFavorite(pokemon.name, pokemon.url); }}
                    aria-label={fav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                    size="small"
                  />
                </Tooltip>
              </div>
              <Link to={`/pokemon/${pokemon.name}`} state={{ url: pokemon.url }} style={{ textDecoration: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                  src={dreamWorldUrl}
                  alt={pokemon.name}
                  width={180}
                  height={180}
                  style={{ marginBottom: 12, objectFit: 'contain' }}
                  loading='lazy'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultSpriteUrl;
                  }}
                />
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{`#${number}`}</Typography>
                <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 18, color: 'var(--color-black)' }}>
                  {pokemon.name}
                </Typography>
              </Link>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PokemonCardList;