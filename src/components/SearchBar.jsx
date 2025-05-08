import { TextField, InputAdornment } from '@mui/material';

function SearchBar({ value, onChange }) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar Pokémon por nombre..."
            value={value}
            onChange={onChange}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="end">
                        </InputAdornment>
                    ),
                }
            }}
            sx={{ mb: 3 }}
        />
    );
}

export default SearchBar;