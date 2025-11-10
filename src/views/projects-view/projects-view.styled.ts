/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Stack, styled } from '@mui/material';

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginRight: theme.spacing(3),
}));

export const ProjectsContainer = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  width: '100%',
}));
