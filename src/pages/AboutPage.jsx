import { Typography, Box, Paper, Stack, Link, Avatar, Chip, Divider, Tooltip, Grid } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebIcon from '@mui/icons-material/Web';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function AboutPage() {
  return (
    <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 5 }, maxWidth: 700, width: '100%', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Stack spacing={3} alignItems="center">
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="Pokédex Logo" width={120} style={{ marginBottom: 8 }} />
          <Typography variant="h3" color="primary" fontWeight={700} gutterBottom>
            Pokédex Demo
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600 }}>
            Bienvenido a la Pokédex interactiva: una app moderna para explorar y buscar Pokémon de manera sencilla y visual, usando la <Link href="https://pokeapi.co/" target="_blank" rel="noopener">PokeAPI</Link>.
          </Typography>

          <Divider flexItem sx={{ my: 2 }}>
            <Chip label="Tecnologías Usadas" color="primary" />
          </Divider>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Tooltip title="React">
                <Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Vite">
                <Avatar src="https://vitejs.dev/logo.svg" alt="Vite" />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Material UI">
                <Avatar src="https://mui.com/static/logo.png" alt="Material UI" />
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="PokeAPI">
                <Avatar src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokeAPI" />
              </Tooltip>
            </Grid>
          </Grid>

          <Divider flexItem sx={{ my: 2 }}>
            <Chip label="Sobre el Proyecto" color="secondary" />
          </Divider>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600 }}>
            Esta Pokédex fue desarrollada como ejercicio para practicar buenas prácticas en React, uso de hooks personalizados, consumo de APIs REST y diseño responsive con Material UI. No es una app oficial, sino un proyecto educativo y de demostración.
          </Typography>

          <Divider flexItem sx={{ my: 2 }}>
            <Chip label="Desarrollador" color="info" />
          </Divider>
          <Stack direction="row" spacing={2} alignItems="center">
  <Avatar src="https://avatars.githubusercontent.com/WallMonfortt" alt="Wall Monfortt" />
  <Typography variant="subtitle1">Wall Monfortt</Typography>
  <Link href="https://github.com/WallMonfortt" target="_blank" rel="noopener" underline="hover">
    <GitHubIcon color="action" />
  </Link>
  <Link href="https://www.linkedin.com/in/jose-gualberto-monfortte-flores/" target="_blank" rel="noopener" underline="hover">
    <LinkedInIcon color="action" />
  </Link>
</Stack>

{/* Logo personal como link a tu web */}
<Stack alignItems="center" sx={{ mt: 1, mb: 2 }}>
  <Link href="https://walmonfortt.com" target="_blank" rel="noopener" underline="none">
    <img src="/WM2.svg" alt="Logo WM2" style={{ width: 56, height: 56, transition: 'transform 0.2s', borderRadius: 12 }}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    />
  </Link>
  <Typography variant="caption" color="text.secondary">Visita mi sitio personal</Typography>
</Stack>

          <Divider flexItem sx={{ my: 2 }}>
            <Chip label="Enlaces útiles" color="success" />
          </Divider>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Link href="https://github.com/WallMonfortt/pokedex-BuzlyAi" target="_blank" rel="noopener" underline="hover">
              <GitHubIcon sx={{ mr: 0.5 }} /> Repositorio
            </Link>
            <Link href="https://pokeapi.co/docs/v2" target="_blank" rel="noopener" underline="hover">
              <WebIcon sx={{ mr: 0.5 }} /> PokeAPI Docs
            </Link>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 3 }}>
            © {new Date().getFullYear()} Pokédex Demo — Proyecto educativo, sin fines de lucro.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default AboutPage;
