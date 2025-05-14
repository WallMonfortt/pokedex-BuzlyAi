import { Stack, Typography } from '@mui/material';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonCardList, SearchBar, Loader, NotFound, PaginationBar, PageSizeSelector } from '../components';
import ErrorMessage from '../components/common/ErrorMessage';

function PokemonListPage() {
  const {
    pokemonList,
    page,
    setPage,
    loading,
    error,
    search,
    handleSearchChange,
    searchResults,
    totalPages,
    limit,
    setLimit,
    searchLoading,
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
        <PageSizeSelector
          value={limit}
          onChange={e => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          options={pageSizeOptions}
          sx={{ minWidth: 120 }}
        />

      </Stack>

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => {
            window.location.reload();
          }}
          retryLabel="Reintentar"
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <PaginationBar
            count={search.length >= 3 ? Math.ceil(searchResults.length / limit) : totalPages}
            page={page}
            onChange={(_, val) => setPage(val)}
            ariaLabel="Paginador de Pokémon"
          />
          {search.length >= 3 ? (
            searchLoading ? (
              <Loader size={32} sx={{ my: 3 }} />
            ) : (
              searchResults.length > 0 ? (
                <PokemonCardList pokemons={searchResults.slice((page - 1) * limit, page * limit)} />
              ) : (
                <NotFound msg="No se encontraron resultados" />
              )
            )
          ) : (
            <PokemonCardList pokemons={pokemonList} />
          )}
          <PaginationBar
            count={search.length >= 3 ? Math.ceil(searchResults.length / limit) : totalPages}
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