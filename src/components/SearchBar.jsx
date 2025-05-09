import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
                            <SearchIcon sx={{ color: 'var(--color-water)', mr: 2 }} />
                        </InputAdornment>
                    ),
                }
            }}
            sx={{ mb: 3 }}
        />
    );
}

export default SearchBar;