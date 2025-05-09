import { Grid, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function PokemonCardList({ pokemons }) {
  return (
    <Grid container spacing={3} sx={{ maxWidth: 1040, margin: '0 auto' }} justifyContent="center">
      {pokemons.map((pokemon) => {
        const number = pokemon.url.split('/').filter(Boolean).pop();
        const dreamWorldUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${number}.svg`;
        const defaultSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;

        console.log(pokemon)
        return (
          <Grid item xs={12} sm={6} md={3} key={pokemon.name}>
            <Card
              component={Link}
              to={`/pokemon/${pokemon.name}`}
              sx={{
                textDecoration: 'none',
                bgcolor: '#fff',
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  boxShadow: 8,
                  transform: 'scale(1.04)',
                },
                minWidth: 240,
                maxWidth: 340,
              }}
            >
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
              <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: 16 }}>
                {pokemon.name}
              </Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PokemonCardList;