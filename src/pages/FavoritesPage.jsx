import { Typography, Box, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { PokemonCardList, SearchBar, PaginationBar, NotFound } from '../components';

const PAGE_SIZE_OPTIONS = [8, 12, 20];

function FavoritesPage() {
  const { favoritesArray } = useFavorites();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const filtered = favoritesArray.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Box sx={{ minHeight: '60vh' }}>
      <Typography variant="h2" align="center" gutterBottom className="pokemon-title-bg">Favoritos</Typography>
      {favoritesArray.length === 0 ? (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center', backgroundColor: 'var(--color-lightgray)' }}>
          <Stack spacing={2} alignItems="center">
            <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Favoritos" width={80} />
            <Typography variant="h5" color="secondary" gutterBottom>
              No tienes Pokémon favoritos aún
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 500 }}>
              Haz clic en el corazón de cualquier Pokémon para guardarlo aquí.
            </Typography>
          </Stack>
        </Paper>
      ) : (
        <>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'stretch', md: 'center' }}
            justifyContent="space-between"
            sx={{
              width: '100%',
              gap: 2,
              mb: 1.5,
              background: 'var(--color-lightgray)',
              borderRadius: 4,
              boxShadow: '0 1px 8px 0 var(--color-black)',
              px: { xs: 2, md: 4 },
              py: { xs: 2, md: 2 }
            }}
          >
            <SearchBar value={search} onChange={handleSearchChange} sx={{ flex: 1, minWidth: 200, maxWidth: 320 }} />
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2">Por página:</Typography>
              <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} style={{ padding: 2, borderRadius: 4 }}>
                {PAGE_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </Stack>
          </Stack>
          {totalPages > 1 && (
            <Stack alignItems="center" mt={1} mb={1}>
              <PaginationBar
                count={totalPages}
                page={page}
                onChange={(_, val) => setPage(val)}
                ariaLabel="Paginador de favoritos"
              />
            </Stack>
          )}
          {filtered.length === 0 ? (
            <NotFound msg={search.length > 0 ? `No hay favoritos que coincidan con "${search}"` : "No tienes Pokémon favoritos aún"} />
          ) : (
            <>
              <PokemonCardList pokemons={paginated} />
              {totalPages > 1 && (
                <Stack alignItems="center" mt={2}>
                  <PaginationBar
                    count={totalPages}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    ariaLabel="Paginador de favoritos"
                  />
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
}

export default FavoritesPage;
