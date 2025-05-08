import { Typography, Box, Paper, Stack, Link } from '@mui/material';

function AboutPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', backgroundColor: 'var(--color-lightgray)' }}>
        <Stack spacing={2} alignItems="center">
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokédex Logo" width={120} />
          <Typography variant="h4" color="primary" gutterBottom>
            Sobre la Pokédex
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 500 }}>
            Esta aplicación es una Pokédex interactiva construida con React, Vite y Material UI. Aquí puedes explorar, buscar y conocer detalles de todos los Pokémon usando la <Link href="https://pokeapi.co/" target="_blank" rel="noopener">PokeAPI</Link>.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Proyecto realizado como ejercicio de buenas prácticas de React, hooks personalizados y diseño responsivo.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} Pokédex Demo - No oficial
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AboutPage;
