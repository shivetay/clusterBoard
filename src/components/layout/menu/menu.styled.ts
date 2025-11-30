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
  [theme.breakpoints.down('sm')]: {
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

export const MobileMenuContainer = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'min-content',
  justifyContent: 'center',
}));
