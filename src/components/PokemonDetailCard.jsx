import { Link as RouterLink } from 'react-router-dom';
import {
    Card, Typography, Stack, Chip, Button, CardMedia, Box, Divider
} from '@mui/material';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';


function PokemonDetailCard({ pokemon, description }) {
    const type1 = pokemon.types[0]?.type.name || 'normal';
    const type2 = pokemon.types[1]?.type.name;
    const color1 = `var(--color-${type1})`;
    const color2 = type2 ? `var(--color-${type2})` : '#fff';
    const artworkUrl = pokemon.sprites?.other?.['official-artwork']?.front_default;
    const gifUrl = `https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`;

    return (
        <>
            <Button component={RouterLink} to="/" variant="outlined" sx={{ mt: 2, bgcolor: '#fff', boxShadow: 1 }}>
                Volver
            </Button>
            <Card
                sx={{
                    mt: 4,
                    mx: 'auto',
                    maxWidth: 500,
                    minHeight: 620,
                    borderRadius: 6,
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
                    position: 'relative',
                    overflow: 'visible',
                    p: 3,
                    border: '2px solid rgba(255,255,255,0.28)',
                    background: `linear-gradient(135deg, ${color1} 60%, ${color2} 100%)`,
                }}
            >
                {/* BG artwork */}
                <Box sx={{
                    position: 'absolute',
                    top: 100,
                    width: 320,
                    height: 320,
                    opacity: 0.13,
                    filter: 'blur(2px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}>
                    <CardMedia
                        component="img"
                        image={artworkUrl}
                        alt={pokemon.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Box>
                <Stack alignItems="center" spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
                    {/* GIF */}
                    <Box sx={{
                        bgcolor: 'rgba(255,255,255,0.75)',
                        borderRadius: '50%',
                        width: 150,
                        height: 150,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 32px 8px rgba(0,0,0,0.12), 0 0 0 8px var(--color-' + type1 + ',0.12)',
                        mt: 4,
                        mb: 2,
                        border: `4px solid var(--color-${type1})`,
                    }}>
                        <img
                            src={gifUrl}
                            alt={pokemon.name + ' gif'}
                            style={{ objectFit: 'contain', filter: 'drop-shadow(0 0 8px var(--color-' + type1 + ',0.45))' }}
                        />
                    </Box>

                    {/* Name */}
                    <Typography variant="h4" sx={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#222', textShadow: '0 2px 8px #fff' }}>
                        {pokemon.name}
                    </Typography>

                    {/* Type chips */}
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                        {pokemon.types.map((typeObj) => (
                            <Chip
                                key={typeObj.type.name}
                                label={typeObj.type.name}
                                sx={{
                                    bgcolor: `var(--color-${typeObj.type.name})`,
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    textTransform: 'capitalize',
                                    px: 2,
                                    boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                                    border: '2px solid #fff',
                                    letterSpacing: 1,
                                    textShadow: '0 1px 4px rgba(0,0,0,0.10)',
                                }}
                            />
                        ))}
                    </Stack>
                    <Divider flexItem sx={{ my: 2, bgcolor: 'rgba(0,0,0,0.08)' }} />

                    {/* Descripción */}
                    <Box sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2, p: 2, width: '100%', minHeight: 56 }}>
                        <Typography variant="subtitle1" sx={{ color: '#444', fontStyle: 'italic' }}>
                            {description ? description : 'No hay descripción disponible para este Pokémon.'}
                        </Typography>
                    </Box>


                    {/* Weight and height */}
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.88)', px: 2, py: 1.5, borderRadius: 2, minWidth: 90, textAlign: 'center', boxShadow: 1 }}>
                            <ScaleIcon fontSize="small" color="primary" sx={{ mb: '-4px', mr: 0.5 }} />
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>Peso</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{pokemon.weight / 10} kg</Typography>
                        </Box>
                        <Box sx={{ bgcolor: 'rgba(255,255,255,0.88)', px: 2, py: 1.5, borderRadius: 2, minWidth: 90, textAlign: 'center', boxShadow: 1 }}>
                            <HeightIcon fontSize="small" color="primary" sx={{ mb: '-4px', mr: 0.5 }} />
                            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>Altura</Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{pokemon.height / 10} m</Typography>
                        </Box>
                    </Stack>
                </Stack>

                {/* Artwork */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        zIndex: 3,
                        filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.25))',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={artworkUrl}
                        alt={pokemon.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Box>

                {/* Number */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 18,
                        width: 160,
                        height: 90,
                        zIndex: 1,
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'flex-end',
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontSize={82}
                        color="text.secondary"
                        sx={{
                            fontWeight: 700,
                            opacity: 0.13,
                            lineHeight: 1,
                            textShadow: '0 2px 12px #fff',
                            userSelect: 'none',
                        }}
                    >
                        #{pokemon.id}
                    </Typography>
                </Box>
            </Card>
        </>
    );
}

export default PokemonDetailCard;