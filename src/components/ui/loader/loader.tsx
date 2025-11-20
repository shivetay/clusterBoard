import { Box, CircularProgress } from '@mui/material';
import './loader.css';

export function Loader() {
  return (
    <Box className="loader-container">
      <CircularProgress sx={{ color: '#f8e0e0' }} />
    </Box>
  );
}

export default Loader;
