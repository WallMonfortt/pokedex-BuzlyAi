import { IconButton, Stack, Typography, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { usePokemonList } from '../hooks/usePokemonList';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PokemonCardList, SearchBar, Loader, NotFound } from '../components';

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
          background: 'rgba(255,255,255,0.96)',
          borderRadius: 4,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.07)',
          border: '1.5px solid var(--color-lightgray)',
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
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
          <IconButton
            sx={{ color: 'var(--color-water)', borderRadius: 2, border: '1.5px solid var(--color-water)', bgcolor: 'white', '&:hover': { bgcolor: 'var(--color-water)', color: 'white' } }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            aria-label="Página anterior"
          >
            <ArrowBackIosNewIcon fontSize="medium" />
          </IconButton>
          <Box sx={{ minWidth: 50, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', fontWeight: 'bold', color: 'var(--color-water)' }}>
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
        <Loader />
      ) : (
        <>
          {search.length >= 3 ? (
            searchResults.length > 0 ? (
              <PokemonCardList pokemons={searchResults} />
            ) : (
              <NotFound msg="No se encontraron resultados" />
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