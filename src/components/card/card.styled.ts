/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { Box, Card, styled, Typography } from '@mui/material';

export const CardWrapper = styled(Box)(({ theme }) => ({
  width: '500px',
  maxHeight: '150px',
  background: 'transparent',
  backdropFilter: 'blur(7px)',
  WebkitBackdropFilter: 'blur(7px)',

  [theme.breakpoints.down('sm')]: {
    width: '400px',
  },
}));

export const CardContainer = styled(Card)(({ theme }) => ({
  background: theme.palette.background.bgSecondaryTransparent,
  backdropFilter: 'blur(7px)',
  WebkitBackdropFilter: 'blur(7px)',
}));

export const CardHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(4),
  fontWeight: 600,
  color: theme.palette.text.secondary,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2.75),
  },
}));

export const DescriptionHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.text.secondary,
  margin: theme.spacing(1, 0),
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2.5),
  },
}));

export const CountHeader = styled(Typography)(({ theme }) => ({
  fontSize: theme.spacing(3),
  fontWeight: 600,
  color: theme.palette.text.secondary,
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(2.5),
  },
}));
