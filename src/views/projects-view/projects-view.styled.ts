/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Stack, styled } from '@mui/material';

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: theme.spacing(4, 0, 2, 0),
  paddingRight: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    marginTop: 0,
  },
}));

export const ProjectsContainer = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  paddingRight: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(auto-fill, 1fr)',
    padding: theme.spacing(0, 2),
  },
}));
