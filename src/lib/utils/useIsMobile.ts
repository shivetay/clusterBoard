'use client';

import { useMediaQuery, useTheme } from '@mui/material';

/**
 * Matches MUI `theme.breakpoints.down('md')` so layout JS (nav, cluster cards)
 * stays consistent with grid and spacing breakpoints (desktop-first).
 */
export const useIsMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
};

export default useIsMobile;
