import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

function PageSizeSelector({ label = 'Por página', value, onChange, options = [8, 12, 20, 32], sx = {} }) {
  return (
    <FormControl size="small" sx={{ minWidth: 120, ...sx }}>
      <InputLabel id="select-limit-label">{label}</InputLabel>
      <Select
        labelId="select-limit-label"
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PageSizeSelector;
