import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';

/**
 * Reusable favorite button component
 */
export default function FavoriteButton({ isFavorite, onClick, sx = {}, size = 'medium', ...props }) {
  return (
    <Button
      variant={isFavorite ? 'contained' : 'outlined'}
      onClick={onClick}
      sx={{
        borderRadius: 999,
        minWidth: 54,
        minHeight: 54,
        px: 2,
        background: 'none',
        color: isFavorite ? 'var(--color-pokeball)' : 'var(--color-poison)',
        border: 'none',
        boxShadow: 'none',
        '&:hover': {
          background: 'none',
          color: 'var(--color-pokeball)',
        },
        ...sx,
      }}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      size={size}
      {...props}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </Button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
  size: PropTypes.oneOf(['small','medium','large']),
};
