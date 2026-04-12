/** biome-ignore-all lint/style/noMagicNumbers: <styling> */
'use client';
import { styled } from '@mui/material';
import Link from 'next/link';
import { CustomButton } from '@/components/ui';
import { glassEffects } from '@/theme';

export const MenuContainer = styled('nav')(({ theme }) => ({
  width: theme.spacing(151.75),
  maxHeight: '60px',
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(1),
  ...glassEffects.medium,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

/**
 * Project sub-nav on small screens: two-row grid (3 columns → 6 items in 2 rows;
 * extra items wrap to a third row).
 */
export const MobileProjectMenuStrip = styled('nav')(({ theme }) => ({
  display: 'none',
  width: '100%',
  maxWidth: '100%',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  ...glassEffects.medium,

  [theme.breakpoints.down('md')]: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gridAutoRows: 'auto',
    alignItems: 'stretch',
  },

  [theme.breakpoints.between('sm', 'md')]: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  },

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const NavLinkContainer = styled(Link)(({ theme }) => ({
  padding: theme.spacing(1.25, 0.75),
  maxHeight: '60px',
}));

export const MenuButton = styled(CustomButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ theme, active }) => ({
  width: '100%',
  minWidth: '64px',
  backgroundColor: active
    ? theme.palette.primary.main
    : theme.palette.background.default,
  color: active
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,

  '&:hover': {
    backgroundColor: active
      ? `${theme.palette.primary.main}AA`
      : `${theme.palette.background.default}AA`,

    color: active ? theme.palette.text.primary : theme.palette.text.primary,
  },
}));

export const MobileMenuContainer = styled('nav')(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'min-content',
  justifyContent: 'center',
}));
