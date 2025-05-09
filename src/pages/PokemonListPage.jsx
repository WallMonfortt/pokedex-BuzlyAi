import { IconButton, CircularProgress, Stack, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { PokemonCardList, SearchBar } from '../components';
import { usePokemonList } from '../hooks/usePokemonList';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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
      <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between" sx={{ mb: 3, width: '100%' }}>
        <SearchBar value={search} onChange={handleSearchChange} sx={{ flex: 1 }} />
        <FormControl size="small" sx={{ minWidth: 100 }} >
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
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            sx={{ color: 'var(--color-water)' }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            <ArrowBackIosNewIcon fontSize="large" />
          </IconButton>
          <Box sx={{ width: 54, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
            <Typography
              component="span"
              sx={{
                color: 'var(--color-water)',
                fontWeight: 'bold',
                fontSize: 16,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }}
            >
              {page}
            </Typography>
            <Typography
              component="span"
              sx={{
                color: 'var(--color-pokeball)',
                fontWeight: 500,
                fontSize: 16,
                ml: 0.5,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%'
              }}
            >
              / {totalPages}
            </Typography>
          </Box>
          <IconButton
            sx={{ color: 'var(--color-water)' }}
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            aria-label="Página siguiente"
          >
            <ArrowForwardIosIcon fontSize="large" />
          </IconButton>
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