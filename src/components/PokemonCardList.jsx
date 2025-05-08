import { Stack, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function PokemonCardList({ pokemons }) {
  return (
    <Stack spacing={2}>
      {pokemons.map((pokemon) => {
        const number = pokemon.url.split('/').filter(Boolean).pop();
        const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
        return (
          <Card key={pokemon.name} component={Link} to={`/pokemon/${pokemon.name}`} sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={spriteUrl}
                alt={pokemon.name}
                width="full"
                height="full"
                style={{margin: 16}}
                loading='lazy'
              />
              <Typography variant="h6">{`${number}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
}

export default PokemonCardList;