import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Stack, CircularProgress, Typography } from "@mui/material";

function Loader() {
    return (
        <Stack alignItems="center" sx={{ mt: 4 }}>
            <CircularProgress />
        </Stack>
    );
}

function NotFound({ msg }) {
    return <Stack alignItems="center" spacing={2} sx={{ mt: 8 }}>
    <CatchingPokemonIcon sx={{ fontSize: 80, color: 'var(--color-pokeball)' }} />
    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--color-pokeball)' }}>
        ¡No encontrado!
    </Typography>
    <Typography variant="body1" color="text.secondary" align="center">
        {msg || "No pudimos encontrar lo que buscabas."}
    </Typography>
    <Typography variant="body2" color="text.secondary" align="center">
        Intenta volver al inicio o revisar tu búsqueda.
    </Typography>
</Stack>
}


export {
    Loader,
    NotFound
}