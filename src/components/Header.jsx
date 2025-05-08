import AppBar from '@mui/material/AppBar';
import '../styles/header-bg.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

const pages = [
  { label: 'Inicio', path: '/' },
  { label: 'Favoritos', path: '/favoritos' },
  { label: 'Acerca de', path: '/about' },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

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
          <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' alt="Pokeball" width={50} height={50} style={{ marginRight: 12 }} />
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              color: 'white',
              textDecoration: 'none',
              fontWeight: 'bold',
              letterSpacing: 2,
            }}
          >
            Pokédex
          </Typography>
        </Box>
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
            {pages.map((page) => (
              <MenuItem
                key={page.label}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {pages.map((page) => (
            <Typography
              key={page.label}
              component={RouterLink}
              to={page.path}
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 500,
                mx: 2,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              {page.label}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;