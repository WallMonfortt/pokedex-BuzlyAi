import { useState, useEffect } from 'react';
import { fetchPokemosList, fetchAllPokemonNames } from '../services/pokeapi';
import { Button, CircularProgress, Stack, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

function PokemonListPage() {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [allNames, setAllNames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearch(value);
  
    if (value.length >= 3) {
      if (allNames.length === 0) {
        // Descarga solo la primera vez
        const all = await fetchAllPokemonNames();
        setAllNames(all);
        filterAndSetResults(all, value);
      } else {
        filterAndSetResults(allNames, value);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  function filterAndSetResults(list, value) {
    const filtered = list.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    ).slice(0, 10); // Limita a 10 resultados
    setSearchResults(filtered);
  }

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
      <SearchBar value={search} onChange={handleSearchChange} />
      {loading ? (
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <>
          {search.length >= 3 && searchResults.length > 0 ? (
            <Stack spacing={2}>
              {searchResults.map((pokemon) => {
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
      )}
    </>
  );
}

export default PokemonListPage;