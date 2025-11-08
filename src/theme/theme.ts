'use client';
import { createTheme } from '@mui/material';

// Define custom colors based on your globals.css
const colors = {
  background: '#344285',
  backgroundTransparent: 'rgba(52, 66, 133, 0.28)',
  backgroundTransparentSecondary: '#CEA71624',
  backgroundLight: '#dfe4e9',
  textSecondary: '#aaaabc',
  textMain: '#FCFCFA',
  gray: '#767587',
  error: '#812730',
  errorSecondary: '#bb5a5e',
  borders: '#cea716',
  warning: '#cea716',
};

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: colors.textMain,
    },
    border: {
      main: colors.borders,
    },
    background: {
      default: colors.background,
      transparent: colors.backgroundTransparent,
      buttonBg: colors.backgroundTransparentSecondary,
    },
    text: {
      primary: colors.textMain,
    },
    error: {
      main: colors.error,
    },
    warning: {
      main: colors.warning,
    },
  },
  typography: {
    htmlFontSize: 16, // Set 1 rem = 16px
    fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
    h1: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h2: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '2rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h3: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.75rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h4: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.5rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h5: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1.25rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    h6: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      color: colors.textMain,
    },
    body1: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      color: colors.textMain,
    },
    body2: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      color: colors.textMain,
    },
    button: {
      fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
      textTransform: 'none', // Disable uppercase transformation
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontSize: '16px', // Ensure 1 rem = 16px
        },
        a: {
          textDecoration: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: '"Poppins", Arial, Helvetica, sans-serif',
          textTransform: 'none',
          fontWeight: 400,
          borderRadius: '16px',
          background: colors.backgroundTransparentSecondary,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(7px)',
          WebkitBackdropFilter: 'blur(7px)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:active': {
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
});

export default mainTheme;
