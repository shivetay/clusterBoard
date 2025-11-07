'use client';
import { Box, styled } from '@mui/material';

export const ClusterCardContainer = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  padding: '32px',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gap: '24px',
  justifyItems: 'center',
  alignItems: 'center',
}));
