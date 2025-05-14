import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { POKEBALL_IMG_URL } from '../constants/urls';

const pages = [
  { label: 'Inicio', path: '/' },
  { label: 'Favoritos', path: '/favoritos' },
  { label: 'Acerca de', path: '/about' },
];

function Header() {
  const imgUrl = POKEBALL_IMG_URL;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'var(--color-pokeball)' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={imgUrl} alt="Pokeball" width={50} height={50} style={{ marginRight: 12 }} />
          <Typography
            variant="h4"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              letterSpacing: 5,
              ':hover': {
                letterSpacing: 10
              }
            }}
          >
            Pokédex
          </Typography>
        </Box>

        {/* Mobile menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleCloseNavMenu}
            sx={{
              '& .MuiDrawer-paper': {
                width: 220,
                bgcolor: 'var(--color-pokeball)',
              },
            }}
          >
            <Box sx={{ width: 220 }} role="presentation" onClick={handleCloseNavMenu} onKeyDown={handleCloseNavMenu}>
              <List>
                {pages.map((page) => {
                  const isActive = location.pathname === page.path;
                  return (
                    <ListItem key={page.label} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={page.path}
                        selected={isActive}
                        sx={isActive ? {
                          bgcolor: 'rgba(255,255,255,0.13)',
                          fontWeight: 'bold',
                        } : {}}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <ListItemText
                          primary={page.label}
                          sx={{
                            color: isActive ? 'yellow' : 'white',
                            fontWeight: isActive ? 'bold' : 500,
                            fontSize: 18
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
          </Drawer>
        </Box>
        {/* Desktop menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {pages.map((page) => {
            const isActive = location.pathname === page.path;
            return (
              <Typography
                key={page.label}
                fontSize={20}
                component={RouterLink}
                to={page.path}
                sx={{
                  color: isActive ? 'yellow' : 'white',
                  textDecoration: 'none',
                  fontWeight: isActive ? 'bold' : 500,
                  mx: 2,
                  borderRadius: 2,
                  background: isActive ? 'rgba(255,255,0,0.10)' : 'transparent',
                  px: 2,
                  py: 0.5,
                  transition: 'background 0.2s',
                  '&:hover': { background: 'rgba(255,255,255,0.10)' },
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {page.label}
              </Typography>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;