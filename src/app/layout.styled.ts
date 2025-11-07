'use client';
import { Box, styled } from '@mui/material';

export const LayoutContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateAreas: `
    "header header header"
    "menu   main   main"
    "footer footer footer"
  `,
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '250px 1fr',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
}));
