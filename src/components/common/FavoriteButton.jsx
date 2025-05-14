import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PropTypes from 'prop-types';

/**
 * Reusable favorite button component
 */
import { useRef, useState } from 'react';

export default function FavoriteButton({ isFavorite, onClick, sx = {}, size = 'medium', ...props }) {
  const [animating, setAnimating] = useState(false);
  const iconRef = useRef(null);

  const handleClick = (e) => {
    if (iconRef.current) {
      iconRef.current.classList.remove('favorite-animate');
      // Forzar reflow para reiniciar animación
      void iconRef.current.offsetWidth;
      iconRef.current.classList.add('favorite-animate');
    }
    setAnimating(true);
    if (onClick) onClick(e);
  };

  const handleAnimationEnd = () => {
    setAnimating(false);
    if (iconRef.current) {
      iconRef.current.classList.remove('favorite-animate');
    }
  };

  return (
    <Button
      variant={isFavorite ? 'contained' : 'outlined'}
      onClick={handleClick}
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
      {isFavorite ? (
        <FavoriteIcon ref={iconRef} onAnimationEnd={handleAnimationEnd} />
      ) : (
        <FavoriteBorderIcon ref={iconRef} onAnimationEnd={handleAnimationEnd} />
      )}
    </Button>
  );
}

FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  sx: PropTypes.object,
  size: PropTypes.oneOf(['small','medium','large']),
};
