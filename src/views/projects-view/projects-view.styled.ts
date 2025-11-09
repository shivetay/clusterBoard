/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Stack, styled } from '@mui/material';

export const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(3.75, 1),
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginRight: theme.spacing(6.5),
}));

export const ProjectsContainer = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(3),
  width: '100%',
}));
