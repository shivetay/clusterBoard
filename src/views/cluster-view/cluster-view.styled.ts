'use client';
import { Box, styled } from '@mui/material';

export const ClusterCardContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  justifyItems: 'center',
  alignItems: 'center',
}));
