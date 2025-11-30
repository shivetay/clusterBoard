'use client';
import { Stack, styled } from '@mui/material';

const FOOTER_FONT_SIZE = 1;
const FOOTER_PADDING = 1;
const FOOTER_HEIGHT = 12;

export const FooterContainer = styled('footer')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: theme.spacing(FOOTER_HEIGHT),
  backdropFilter: 'blur(16px)',
  width: '100%',
  borderTop: `1px solid ${theme.palette.border.secondary}`,
  backgroundColor: theme.palette.background.transparent,

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    paddingRight: theme.spacing(2),
  },
}));

export const FooterContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  justifySelf: 'flex-end',
  flex: '0 0 75%',
  '& span': {
    fontSize: theme.spacing(FOOTER_FONT_SIZE),
    padding: theme.spacing(FOOTER_PADDING),
  },
}));

export const FooterContact = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  flex: '0 0 25%',
  '& span': {
    fontSize: theme.spacing(FOOTER_FONT_SIZE),
  },
}));
