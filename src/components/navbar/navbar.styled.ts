'use client';
import { Avatar, Box, Paper, styled } from '@mui/material';

export const NavbarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  paddingRight: theme.spacing(4),
}));

export const UserAvatar = styled(Avatar)(() => ({
  width: '32px',
  height: '32px',
  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  borderRadius: 0,
}));

export const DrawerContainer = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.transparent,
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(7px)',
  WebkitBackdropFilter: 'blur(7px)',

  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
}));
