'use client';
import { createTheme } from '@mui/material';

// Define custom colors based on your globals.css
const colors = {
  background: '#343D47',
  backgroundSecondary: '#F8E0E0',
  backgroundTransparent: '#343D47B5',
  backgroundTransparentSecondary: '#F8E0E0D1',
  backgroundLight: '#6F7579',
  textSecondary: '#343D47',
  textMain: '#A7A9AC',
  gray: '#767587',
  error: '#FF453A',
  errorSecondary: '#FF453A',
  borders: '#6F7579',
  warning: '#FF9500',
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
      bgSecondary: colors.backgroundSecondary,
      bgSecondaryTransparent: colors.backgroundTransparentSecondary,
    },
    text: {
      primary: colors.textMain,
      secondary: colors.textSecondary,
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
          transition:
            'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-3px)',
            background: '#404A54',
            boxShadow:
              '0 8px 16px rgba(0, 0, 0, 0.25), 0 4px 8px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(7px)',
            WebkitBackdropFilter: 'blur(7px)',
          },
          '&:active': {
            transform: 'translateY(3px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        focusHighlight: {
          background: 'transparent',
        },
      },
    },
  },
});

export default mainTheme;
