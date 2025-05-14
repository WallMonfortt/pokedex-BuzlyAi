import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

/**
 * Reusable PaginationBar component
 * @param {number} count
 * @param {number} page
 * @param {function} onChange
 * @param {object} sx
 * @param {string} ariaLabel
 */
export default function PaginationBar({ count, page, onChange, sx = {}, ariaLabel = 'Paginador' }) {
  if (count <= 1) return null;
  return (
    <Stack alignItems="center" justifyContent="center" mt={2} mb={2} sx={sx}>
      <Pagination
        count={count}
        page={page}
        onChange={onChange}
        color="primary"
        shape="rounded"
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
        sx={{ my: 1 }}
        aria-label={ariaLabel}
      />
    </Stack>
  );
}
