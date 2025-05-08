import { useState, useEffect } from 'react';
import { fetchPokemosList, fetchAllPokemonNames } from '../services/pokeapi';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import PokemonCardList from '../components/PokemonCardList';

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
    ).slice(0, 10);
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
          {search.length >= 3 ? (
            searchResults.length > 0 ? (
              <PokemonCardList pokemons={searchResults} />
            ) : (
              <Typography variant="h6">No se encontraron resultados</Typography>
            )
          ) : (
            <>
              <PokemonCardList pokemons={pokemonList} />
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