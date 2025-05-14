import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function ErrorMessage({ message = 'Ocurrió un error inesperado', onRetry, retryLabel = 'Reintentar', sx = {} }) {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4, ...sx
    }}>
      <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
      <Typography variant="h6" color="error" gutterBottom align="center">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry} sx={{ mt: 2 }}>
          {retryLabel}
        </Button>
      )}
    </Box>
  );
}

export default ErrorMessage;
