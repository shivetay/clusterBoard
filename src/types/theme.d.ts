// Global type declarations for MUI theme extensions
declare module '@mui/material/styles' {
  interface TypeBackground {
    default?: string;
    transparent?: string;
    buttonBg?: string;
  }

  interface PaletteOptions {
    border?: {
      main: string;
    };
    background?: {
      default?: string;
      transparent?: string;
      buttonBg?: string;
    };
  }

  interface Palette {
    border: {
      main: string;
    };
    background: {
      default?: string;
      transparent?: string;
      buttonBg?: string;
    };
  }
}

export {};
