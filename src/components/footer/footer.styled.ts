'use client';
import { Stack, styled } from '@mui/material';

const FOOTER_FONT_SIZE = 1;
const FOOTER_PADDING = 1;
const FOOTER_HEIGHT = 12;

export const FooterContainer = styled('footer')(({ theme }) => ({
  gridArea: 'footer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: theme.spacing(FOOTER_HEIGHT),
  width: '100%',
  minWidth: '100%',
  borderTop: `1px solid ${theme.palette.border.main}`,
}));

export const FooterContent = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& span': {
    fontSize: theme.spacing(FOOTER_FONT_SIZE),
    padding: theme.spacing(FOOTER_PADDING),
  },
}));

export const FooterContact = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  position: 'absolute',
  right: '1rem',
  '& span': {
    fontSize: theme.spacing(FOOTER_FONT_SIZE),
  },
}));
