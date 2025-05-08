import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import { PokemonCardList, SearchBar } from '../components';
import { usePokemonList } from '../hooks/usePokemonList';

function PokemonListPage() {
  const {
    pokemonList,
    page,
    setPage,
    loading,
    search,
    handleSearchChange,
    searchResults,
    totalPages
  } = usePokemonList();

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom> Descubre el Mundo Pokémon</Typography>
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