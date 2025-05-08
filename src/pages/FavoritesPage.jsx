import { Typography, Box, Paper, Stack } from '@mui/material';

function FavoritesPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={2} sx={{ p: 4, textAlign: 'center', backgroundColor: 'var(--color-lightgray)' }}>
        <Stack spacing={2} alignItems="center">
          <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Favoritos" width={80} />
          <Typography variant="h4" color="secondary" gutterBottom>
            Favoritos
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 500 }}>
            Aquí aparecerán tus Pokémon favoritos.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ¡Pronto podrás guardar y ver aquí tus Pokémon preferidos!
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default FavoritesPage;
