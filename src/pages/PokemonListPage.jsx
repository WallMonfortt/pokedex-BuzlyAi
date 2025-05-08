import { Button, CircularProgress, Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
    totalPages,
    limit,
    setLimit
  } = usePokemonList();

  const pageSizeOptions = [12, 16, 20, 32];

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom className="pokemon-title-bg">Descubre el Mundo Pokémon</Typography>
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <SearchBar value={search} onChange={handleSearchChange} sx={{ flex: 1 }} />
      <FormControl size="small" sx={{ minWidth: 100 }}>
        <InputLabel id="select-limit-label">Por página</InputLabel>
        <Select
          labelId="select-limit-label"
          value={limit}
          label="Por página"
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); 
          }}
        >
          {pageSizeOptions.map(opt => (
            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="contained"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </Button>
        <Typography variant="body2">
          {page} / {totalPages}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Siguiente
        </Button>
      </Stack>
    </Stack>

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
          <PokemonCardList pokemons={pokemonList} />
        )}
      </>
    )}
    </>
  );
}

export default PokemonListPage;