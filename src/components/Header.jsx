import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { POKEBALL_IMG_URL } from '../constants/urls';

const pages = [
  { label: 'Inicio', path: '/' },
  { label: 'Favoritos', path: '/favoritos' },
  { label: 'Acerca de', path: '/about' },
];

function Header() {
  const imgUrl = POKEBALL_IMG_URL;
  const [anchorElNav, setAnchorElNav] = useState(null);
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {pages.map((page) => {
              const isActive = location.pathname === page.path;
              return (
                <MenuItem
                  key={page.label}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  selected={isActive}
                  sx={isActive ? {
                    bgcolor: 'rgba(255,255,255,0.10)',
                    fontWeight: 'bold',
                  } : {}}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Typography textAlign="center" color={isActive ? 'primary.main' : 'inherit'}>
                    {page.label}
                  </Typography>
                </MenuItem>
              );
            })}
          </Menu>
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