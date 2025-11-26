'use client';
import { Box, styled, type Theme } from '@mui/material';

const bgRender = (theme: Theme) => {
  return `linear-gradient(
    30deg,
    ${theme.palette.background.transparent} 12%,
    transparent 12.5%,
    transparent 87%,
    ${theme.palette.background.transparent} 87.5%,
    ${theme.palette.background.transparent}
  ), linear-gradient(
    150deg,
    ${theme.palette.background.transparent} 12%,
    transparent 12.5%,
    transparent 87%,
    ${theme.palette.background.transparent} 87.5%,
    ${theme.palette.background.transparent}
  ), linear-gradient(
    30deg,
    ${theme.palette.background.transparent} 12%,
    transparent 12.5%,
    transparent 87%,
    ${theme.palette.background.transparent} 87.5%,
    ${theme.palette.background.transparent}
  ), linear-gradient(
    150deg,
    ${theme.palette.background.transparent} 12%,
    transparent 12.5%,
    transparent 87%,
    ${theme.palette.background.transparent} 87.5%,
    ${theme.palette.background.transparent}
  ), linear-gradient(
    60deg,
    ${theme.palette.background.transparent} 25%,
    transparent 25.5%,
    transparent 75%,
    ${theme.palette.background.transparent} 75%,
    ${theme.palette.background.transparent}
  ), linear-gradient(
    60deg,
    ${theme.palette.background.transparent} 25%,
    transparent 25.5%,
    transparent 75%,
    ${theme.palette.background.transparent} 75%,
    ${theme.palette.background.transparent}
  )`;
};

export const LayoutContainer = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundImage: bgRender(theme),
  backgroundSize: '80px 140px',
  backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',

  [theme.breakpoints.down('sm')]: {},
}));
