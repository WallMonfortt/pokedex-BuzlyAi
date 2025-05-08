import React, { useState, useEffect } from 'react';
import { fetchPokemosList } from '../services/pokeapi';
import { Button, CircularProgress, Stack, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemosList(page)
      .then(data => {
        setPokemonList(data.results);
        setCount(data.count);
        setLoading(false);
      }).catch(error => {
        setLoading(false);

        // TODO:  Replace the alert with a prettier component
        alert(error);
      });
  }, [page]);

  const totalPages = Math.ceil(count / 20);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>Pokédex</Typography>
      {loading ? (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          <Stack spacing={2}>
            {pokemonList.map((pokemon, _) => {
              const number = pokemon.url.split('/').filter(Boolean).pop();
              return (
                <Card key={pokemon.name} component={Link} to={`/pokemon/${pokemon.name}`} sx={{ textDecoration: 'none' }}>
                  <CardContent>
                    <Typography variant="h6">{`${number}. ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <Typography variant="body1" sx={{ alignSelf: 'center' }}>
              Página {page} de {totalPages}
            </Typography>
            <Button
              variant="contained"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Siguiente
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}

export default PokemonListPage;