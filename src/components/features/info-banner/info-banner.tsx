'use client';
import { Box, Typography } from '@mui/material';

export function InfoBanner() {
  return (
    <Box
      role="status"
      sx={{
        backgroundColor: 'background.primaryTransparent',
        px: 2,
        py: 2,
        textAlign: 'center',
        marginBottom: 2,
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        component="p"
        sx={{ maxWidth: 720, mx: 'auto' }}
      >
        To aplikacja testowa w wersji alfa z ograniczoną funkcjonalnością.
        Niektóre funkcje mogą ulec zmianie w miarę dalszego rozwoju.
      </Typography>
    </Box>
  );
}

export default InfoBanner;
