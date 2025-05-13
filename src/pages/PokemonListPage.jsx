import { Stack, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCardList, SearchBar, Loader, NotFound } from '../components';
import PaginationBar from '../components/PaginationBar';

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
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
        sx={{
          mb: 3,
          width: '100%',
          background: 'var(--color-lightgray)',
          borderRadius: 4,
          boxShadow: '0 1px 8px 0 var(--color-black)',
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 2 },
          gap: 2,
        }}
      >
        <SearchBar value={search} onChange={handleSearchChange} sx={{ flex: 1, minWidth: 200, maxWidth: 320 }} />
        <FormControl size="small" sx={{ minWidth: 120 }}>
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

      </Stack>

      {loading ? (
        <Loader />
      ) : (
        <>
          <PaginationBar
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            ariaLabel="Paginador de Pokémon"
          />
          {search.length >= 3 ? (
            searchResults.length > 0 ? (
              <PokemonCardList pokemons={searchResults} />
            ) : (
              <NotFound msg="No se encontraron resultados" />
            )
          ) : (
            <PokemonCardList pokemons={pokemonList} />
          )}
          <PaginationBar
            count={totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            ariaLabel="Paginador de Pokémon"
          />
        </>
      )}
    </>
  );
}

export default PokemonListPage;