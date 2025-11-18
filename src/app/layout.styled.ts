'use client';
import { Box, styled } from '@mui/material';

export const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateAreas: `
    "header header header"
    "menu   main   main"
    "footer footer footer"
  `,
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateColumns: '196px 1fr',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    overflow: 'auto',
    padding: theme.spacing(2, 0),
    gridTemplateAreas: `
      "header header header"
      "main main main"
      "footer footer footer"
    `,
  },
}));
